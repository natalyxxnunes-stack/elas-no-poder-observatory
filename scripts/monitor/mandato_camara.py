#!/usr/bin/env python3
"""
Monitor de mandato, Câmara dos Deputados: o que cada deputada federal em
exercício registrou no período, pelos dados abertos da Câmara. Gera
src/data/monitor-camara.ts.

Uso:
    python3 -I scripts/monitor/mandato_camara.py AAAA-MM-DD AAAA-MM-DD [pasta_cache]

Indicadores (definidos antes da coleta, ver Método > Monitor de mandato):
1. Votações nominais do plenário: em quantas a deputada estava em exercício
   e em quantas registrou voto (Sim, Não, Abstenção, Obstrução, Artigo 17).
   "Em exercício" = consta em /deputados?dataInicio=D&dataFim=D no dia da
   votação. Votação nominal = votação do órgão PLEN com lista de votos não
   vazia. A mesma conta é feita para a Casa inteira, como referência.
2. Proposições apresentadas (PL, PLP, PEC, PDL) em que ela aparece como
   autora ou coautora (/proposicoes?idDeputadoAutor). Primeira signatária e
   coautora não são separadas aqui.
3. Discursos registrados (/deputados/{id}/discursos), todas as fases.

Nada disso mede qualidade, efeito ou convicção. Ausência no registro de
votação não diz se foi justificada.
"""
import json
import os
import sys
import time
import urllib.parse
import urllib.error
import urllib.request
from collections import defaultdict
from datetime import date, datetime, timedelta

API = "https://dadosabertos.camara.leg.br/api/v2"


def get(path, params, cache):
    url = f"{API}/{path}?{urllib.parse.urlencode(params, doseq=True)}"
    key = os.path.join(cache, urllib.parse.quote(url, safe="")[:240] + ".json")
    if os.path.exists(key):
        return json.load(open(key))
    for tentativa in range(5):
        try:
            req = urllib.request.Request(url, headers={"Accept": "application/json", "User-Agent": "quemsaoelas-monitor"})
            with urllib.request.urlopen(req, timeout=90) as r:
                data = json.load(r)
            json.dump(data, open(key, "w"))
            return data
        except urllib.error.HTTPError as e:
            if e.code == 404:
                return None
            print("retry", tentativa, url, e, file=sys.stderr)
            time.sleep(3 * (tentativa + 1))
        except Exception as e:  # noqa: BLE001
            print("retry", tentativa, url, e, file=sys.stderr)
            time.sleep(3 * (tentativa + 1))
    raise RuntimeError(url)


def paginado(path, params, cache):
    out, pagina = [], 1
    while True:
        d = get(path, {**params, "pagina": pagina, "itens": 100}, cache)
        out += d["dados"]
        if not any(l["rel"] == "next" for l in d.get("links", [])):
            return out
        pagina += 1


def main(ini, fim, cache):
    os.makedirs(cache, exist_ok=True)
    # 1. votações do plenário no período (a API limita a janela; mês a mês)
    votacoes = []
    d0, dfim = date.fromisoformat(ini), date.fromisoformat(fim)
    while d0 <= dfim:
        prox = date(d0.year + (d0.month == 12), d0.month % 12 + 1, 1)
        b = min(prox - timedelta(days=1), dfim)
        votacoes += paginado("votacoes", {"idOrgao": 180, "dataInicio": d0.isoformat(), "dataFim": b.isoformat()}, cache)
        d0 = prox
    votacoes = {v["id"]: v for v in votacoes}
    nominais, sem_votos_api = {}, []
    for vid, v in sorted(votacoes.items()):
        resp = get(f"votacoes/{vid}/votos", {}, cache)
        if resp is None:  # a API não devolve a lista; a votação fica fora e é contada
            sem_votos_api.append(vid)
            continue
        votos = resp["dados"]
        if votos:
            nominais[vid] = (v["data"], {str(x["deputado_"]["id"]) for x in votos})
    print("votações do plenário", len(votacoes), "nominais", len(nominais), file=sys.stderr)

    exercicio = {}
    for data in sorted({d for d, _ in nominais.values()}):
        ds = paginado("deputados", {"dataInicio": data, "dataFim": data}, cache)
        exercicio[data] = {str(x["id"]): x for x in ds}

    # deputadas: todas as mulheres que estiveram em exercício em algum dia do período
    fem_hoje = {str(x["id"]): x for x in paginado("deputados", {"siglaSexo": "F"}, cache)}
    fem_periodo = {str(x["id"]): x for x in paginado("deputados", {"siglaSexo": "F", "dataInicio": ini, "dataFim": fim}, cache)}

    casa_em = casa_voto = 0
    pres = defaultdict(lambda: [0, 0])
    for vid, (data, votaram) in nominais.items():
        em = exercicio[data]
        casa_em += len(em)
        casa_voto += len(set(em) & votaram)
        for did in em:
            if did in fem_periodo:
                pres[did][0] += 1
                pres[did][1] += did in votaram

    linhas = []
    for did, x in sorted(fem_periodo.items(), key=lambda kv: kv[1]["nome"]):
        # a API limita janela de datas a 3 meses; consulta por ano e filtra a data de apresentação
        props = []
        for ano in range(int(ini[:4]), int(fim[:4]) + 1):
            props += paginado("proposicoes", {"idDeputadoAutor": did, "ano": ano, "siglaTipo": ["PL", "PLP", "PEC", "PDL"]}, cache)
        props = [p for p in props if ini <= (p.get("dataApresentacao") or "")[:10] <= fim]
        tipos = defaultdict(int)
        for p in props:
            tipos[p["siglaTipo"]] += 1
        disc = paginado(f"deputados/{did}/discursos", {"dataInicio": ini, "dataFim": fim}, cache)
        em, votou = pres.get(did, [0, 0])
        linhas.append(
            {
                "id": int(did),
                "nome": x["nome"],
                "partido": (fem_hoje.get(did) or x)["siglaPartido"],
                "uf": x["siglaUf"],
                "emExercicioHoje": did in fem_hoje,
                "votacoesEmExercicio": em,
                "votosRegistrados": votou,
                "proposicoes": len(props),
                "proposicoesPorTipo": dict(sorted(tipos.items())),
                "discursos": len(disc),
            }
        )
        print(x["nome"], em, votou, len(props), len(disc), file=sys.stderr)

    meta = {
        "periodo": [ini, fim],
        "coletaEm": datetime.now().strftime("%d/%m/%Y"),
        "votacoesPlenario": len(votacoes),
        "votacoesNominais": len(nominais),
        "votacoesSemListaNaApi": len(sem_votos_api),
        "casaPresencaPct": round(100 * casa_voto / casa_em, 1) if casa_em else None,
        "deputadasNoPeriodo": len(linhas),
        "deputadasHoje": len(fem_hoje),
    }
    with open("src/data/monitor-camara.ts", "w", encoding="utf8") as f:
        f.write(
            "/**\n * monitor-camara — o que cada deputada federal registrou no período, pelos\n"
            " * dados abertos da Câmara. GERADO por scripts/monitor/mandato_camara.py;\n"
            " * não editar à mão. Indicadores e limites descritos no script e no Método.\n */\n"
            "export type LinhaMonitor = { id: number; nome: string; partido: string; uf: string; emExercicioHoje: boolean;"
            " votacoesEmExercicio: number; votosRegistrados: number; proposicoes: number;"
            " proposicoesPorTipo: Record<string, number>; discursos: number };\n"
            f"export const MONITOR_META = {json.dumps(meta, ensure_ascii=False)} as const;\n"
            f"export const MONITOR_CAMARA: readonly LinhaMonitor[] = {json.dumps(linhas, ensure_ascii=False, indent=0)};\n"
        )
    print(json.dumps(meta, ensure_ascii=False))


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2], sys.argv[3] if len(sys.argv) > 3 else "/tmp/cache-camara")
