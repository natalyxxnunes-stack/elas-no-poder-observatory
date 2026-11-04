#!/usr/bin/env python3
"""
Liga cada deputada do monitor ao resultado de 2026 no TSE, pelo CPF (só em
memória; o CPF não é gravado em lugar nenhum). Acrescenta a
src/data/monitor-camara.ts os campos `em2026` (cargo disputado e resultado)
e `ficha` (slug da ficha em /eleitas, quando ela se elegeu).

Uso:
    python3 -I scripts/monitor/cruzar_2026.py caminho/consulta_cand_2026_BRASIL.csv pasta_cache

Regras:
- CPF da deputada: /deputados/{id} da API da Câmara;
- candidatura de 2026: linha do TSE com o mesmo CPF (titular, vice ou suplente de senador);
  quando há 1º e 2º turno, vale o 2º (governo), como em resultado_2026.py;
- eleita = DS_SIT_TOT_TURNO começando com "ELEITO";
- slug da ficha: o mesmo de src/data/eleitas-2026.ts (nome de urna + UF);
  conferido contra a lista publicada; se não bater, a ficha fica sem link.
"""
import csv
import json
import re
import sys
import urllib.request
import os
import urllib.parse

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "recontagem"))
TITULARES = {"DEPUTADO FEDERAL", "DEPUTADO ESTADUAL", "DEPUTADO DISTRITAL", "SENADOR", "GOVERNADOR", "PRESIDENTE",
             "VICE-GOVERNADOR", "VICE-PRESIDENTE", "1º SUPLENTE", "2º SUPLENTE"}
ROTULO = {
    "DEPUTADO FEDERAL": "deputada federal",
    "DEPUTADO ESTADUAL": "deputada estadual",
    "DEPUTADO DISTRITAL": "deputada distrital",
    "SENADOR": "senadora",
    "GOVERNADOR": "governadora",
    "PRESIDENTE": "presidenta",
    "VICE-GOVERNADOR": "vice-governadora",
    "VICE-PRESIDENTE": "vice-presidenta",
    "1º SUPLENTE": "1ª suplente de senador",
    "2º SUPLENTE": "2ª suplente de senador",
}


def get(url, cache):
    key = os.path.join(cache, urllib.parse.quote(url, safe="")[:240] + ".json")
    if os.path.exists(key):
        return json.load(open(key))
    req = urllib.request.Request(url, headers={"Accept": "application/json", "User-Agent": "quemsaoelas-monitor"})
    with urllib.request.urlopen(req, timeout=90) as r:
        d = json.load(r)
    json.dump(d, open(key, "w"))
    return d


def main(csv_path, cache):
    ts = open("src/data/monitor-camara.ts", encoding="utf8").read()
    m = re.search(r"(export const MONITOR_CAMARA: readonly LinhaMonitor\[\] = )(\[.*\]);\n", ts, re.S)
    linhas = json.loads(m.group(2))
    slugs = set(re.findall(r'"slug": "([^"]+)"', open("src/data/eleitas-2026.ts", encoding="utf8").read()))
    from eleitas_2026 import slug as fazer_slug, titulo  # mesma regra das fichas

    por_cpf = {}
    with open(csv_path, encoding="latin1") as f:
        for r in csv.DictReader(f, delimiter=";"):
            if r["DS_CARGO"] not in TITULARES:
                continue
            atual = por_cpf.get(r["NR_CPF_CANDIDATO"])
            if atual is None or int(r["NR_TURNO"]) > int(atual["NR_TURNO"]):
                por_cpf[r["NR_CPF_CANDIDATO"]] = r

    sem_cpf = 0
    for l in linhas:
        dados = get(f"https://dadosabertos.camara.leg.br/api/v2/deputados/{l['id']}", cache)["dados"]
        cpf = (dados.get("cpf") or "").strip()
        if not cpf:
            sem_cpf += 1
        r = por_cpf.get(cpf)
        if not r:
            l["em2026"] = None
            l["ficha"] = None
            continue
        eleita = r["DS_SIT_TOT_TURNO"].startswith("ELEITO")
        sit = r["DS_SIT_TOT_TURNO"]
        resultado = "eleita" if eleita else ("suplente" if sit == "SUPLENTE" else "não eleita" if sit.startswith("NÃO ELEITO") else sit.lower())
        l["em2026"] = {"cargo": ROTULO[r["DS_CARGO"]], "uf": r["SG_UF"] if r["SG_UF"] != "BR" else "", "partido": r["SG_PARTIDO"], "resultado": resultado}
        s = fazer_slug(f'{titulo(r["NM_URNA_CANDIDATO"])}-{r["SG_UF"]}') if eleita else None
        cargo_slug = ROTULO[r["DS_CARGO"]].replace(" ", "-")
        l["ficha"] = s if s in slugs else (f"{s}-{cargo_slug}" if s and f"{s}-{cargo_slug}" in slugs else None)
        if eleita and not l["ficha"]:
            print("eleita sem ficha casada:", l["nome"], s, file=sys.stderr)
    ts = ts.replace(m.group(2), json.dumps(linhas, ensure_ascii=False, indent=0))
    ts = ts.replace(
        " proposicoesPorTipo: Record<string, number>; discursos: number };",
        " proposicoesPorTipo: Record<string, number>; discursos: number;"
        " em2026: { cargo: string; uf: string; partido: string; resultado: string } | null; ficha: string | null };",
    )
    open("src/data/monitor-camara.ts", "w", encoding="utf8").write(ts)
    from collections import Counter

    print("sem cpf", sem_cpf, Counter((l["em2026"] or {}).get("resultado", "não concorreu") for l in linhas))


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
