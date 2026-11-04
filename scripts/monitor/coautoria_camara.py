#!/usr/bin/env python3
"""
Rede documentada de coautoria entre deputadas federais: quem assina
proposição junto com quem. Cada ligação é um documento público (a lista de
autores da proposição na Câmara). Gera src/data/coautoria-camara.ts.

Uso:
    python3 -I scripts/monitor/coautoria_camara.py AAAA-MM-DD AAAA-MM-DD pasta_cache

Regras:
- universo de proposições: PL, PLP, PEC e PDL apresentados no período com ao
  menos uma deputada entre os autores (as mesmas consultas de
  mandato_camara.py);
- autores: /proposicoes/{id}/autores; só deputadas e deputados (tipo
  "Deputado(a)"), com a ordem de assinatura; primeira signatária =
  ordemAssinatura 1 (ou proponente = 1 quando a ordem não vem);
- ligação entre duas deputadas = ao menos uma proposição assinada pelas duas;
  peso = número de proposições;
- partido: o da deputada no cadastro da Câmara na data da coleta; ligação
  "entre partidos" = siglas diferentes;
- mede coautoria, não influência, alinhamento ou amizade. Proposições com
  dezenas de autores (frentes, manifestos) contam como as outras e são
  marcadas à parte (mais de 20 autores).
"""
import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request
from collections import Counter, defaultdict
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime

API = "https://dadosabertos.camara.leg.br/api/v2"
MUITOS = 20


def key(cache, url):
    return os.path.join(cache, urllib.parse.quote(url, safe="")[:240] + ".json")


def get(cache, url):
    k = key(cache, url)
    if os.path.exists(k):
        return json.load(open(k))
    for _ in range(5):
        try:
            req = urllib.request.Request(url, headers={"Accept": "application/json", "User-Agent": "quemsaoelas-monitor"})
            with urllib.request.urlopen(req, timeout=90) as r:
                d = json.load(r)
            json.dump(d, open(k + ".tmp", "w"))
            os.replace(k + ".tmp", k)
            return d
        except urllib.error.HTTPError as e:
            if e.code == 404:
                return None
        except Exception:  # noqa: BLE001
            pass
    raise RuntimeError(url)


def pag(cache, path, params):
    out, p = [], 1
    while True:
        d = get(cache, f"{API}/{path}?" + urllib.parse.urlencode({**params, "pagina": p, "itens": 100}, doseq=True))
        out += d["dados"]
        if not any(l["rel"] == "next" for l in d.get("links", [])):
            return out
        p += 1


def main(ini, fim, cache):
    fem = {x["id"]: x for x in pag(cache, "deputados", {"siglaSexo": "F", "dataInicio": ini, "dataFim": fim})}
    hoje = {x["id"]: x for x in pag(cache, "deputados", {"siglaSexo": "F"})}
    props = {}
    for did in fem:
        for ano in range(int(ini[:4]), int(fim[:4]) + 1):
            for p in pag(cache, "proposicoes", {"idDeputadoAutor": did, "ano": ano, "siglaTipo": ["PL", "PLP", "PEC", "PDL"]}):
                if ini <= (p.get("dataApresentacao") or "")[:10] <= fim:
                    props[p["id"]] = p
    print("proposições", len(props), file=sys.stderr)

    with ThreadPoolExecutor(8) as ex:
        autores = dict(zip(props, ex.map(lambda pid: get(cache, f"{API}/proposicoes/{pid}/autores?"), props)))

    def id_de(uri):
        return int(uri.rstrip("/").split("/")[-1]) if uri and "/deputados/" in uri else None

    partido = {did: (hoje.get(did) or x)["siglaPartido"] for did, x in fem.items()}
    pares = Counter()
    pares_peq = Counter()  # só proposições com até MUITOS autores
    pares_doc = defaultdict(list)
    primeira = Counter()
    assinou = Counter()
    sozinha = Counter()
    grandes = 0
    for pid, a in autores.items():
        lista = (a or {}).get("dados", [])
        deps = [x for x in lista if (x.get("tipo") or "").startswith("Deputad")]
        ids = [id_de(x.get("uri")) for x in deps]
        mulheres = sorted({i for i in ids if i in fem})
        if len(deps) > MUITOS:
            grandes += 1
        for x in deps:
            i = id_de(x.get("uri"))
            if i in fem and (x.get("ordemAssinatura") == 1 or (x.get("ordemAssinatura") is None and x.get("proponente") == 1)):
                primeira[i] += 1
        for i in mulheres:
            assinou[i] += 1
            if len(deps) == 1:
                sozinha[i] += 1
        for a_i in range(len(mulheres)):
            for b_i in range(a_i + 1, len(mulheres)):
                par = (mulheres[a_i], mulheres[b_i])
                pares[par] += 1
                if len(deps) <= MUITOS:
                    pares_peq[par] += 1
                if len(pares_doc[par]) < 3:
                    p = props[pid]
                    pares_doc[par].append(f'{p["siglaTipo"]} {p["numero"]}/{p["ano"]}|{pid}')

    nos = []
    for did, x in sorted(fem.items(), key=lambda kv: kv[1]["nome"]):
        vizinhas = {b if a == did else a: w for (a, b), w in pares.items() if did in (a, b)}
        fora = sum(1 for v in vizinhas if partido[v] != partido[did])
        nos.append(
            {
                "id": did,
                "nome": x["nome"],
                "partido": partido[did],
                "uf": x["siglaUf"],
                "proposicoes": assinou[did],
                "primeiraSignataria": primeira[did],
                "sozinha": sozinha[did],
                "coautoras": len(vizinhas),
                "coautorasOutroPartido": fora,
            }
        )
    arestas = [
        {"a": a, "b": b, "peso": w, "pesoAte20": pares_peq[(a, b)], "entrePartidos": partido[a] != partido[b], "exemplos": pares_doc[(a, b)]}
        for (a, b), w in sorted(pares.items(), key=lambda kv: -kv[1])
    ]
    meta = {
        "periodo": [ini, fim],
        "coletaEm": datetime.now().strftime("%d/%m/%Y"),
        "proposicoes": len(props),
        "proposicoesComMaisDe20Autores": grandes,
        "ligacoes": len(arestas),
        "ligacoesEntrePartidos": sum(1 for e in arestas if e["entrePartidos"]),
        "ligacoesAte20": sum(1 for e in arestas if e["pesoAte20"]),
        "ligacoesAte20EntrePartidos": sum(1 for e in arestas if e["pesoAte20"] and e["entrePartidos"]),
        "deputadas": len(nos),
    }
    with open("src/data/coautoria-camara.ts", "w", encoding="utf8") as f:
        f.write(
            "/**\n * coautoria-camara — quem assina proposição junto com quem, entre as\n"
            " * deputadas federais, pelos dados abertos da Câmara. GERADO por\n"
            " * scripts/monitor/coautoria_camara.py; não editar à mão. Mede coautoria,\n"
            " * não influência. `exemplos`: até 3 proposições por ligação, \"PL n/ano|id\".\n */\n"
            "export type NoCoautoria = { id: number; nome: string; partido: string; uf: string; proposicoes: number;"
            " primeiraSignataria: number; sozinha: number; coautoras: number; coautorasOutroPartido: number };\n"
            "export type LigacaoCoautoria = { a: number; b: number; peso: number; pesoAte20: number; entrePartidos: boolean; exemplos: string[] };\n"
            f"export const COAUTORIA_META = {json.dumps(meta, ensure_ascii=False)} as const;\n"
            f"export const COAUTORIA_NOS: readonly NoCoautoria[] = {json.dumps(nos, ensure_ascii=False)};\n"
            f"export const COAUTORIA_LIGACOES: readonly LigacaoCoautoria[] = {json.dumps(arestas, ensure_ascii=False)};\n"
        )
    print(json.dumps(meta, ensure_ascii=False))


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2], sys.argv[3])
