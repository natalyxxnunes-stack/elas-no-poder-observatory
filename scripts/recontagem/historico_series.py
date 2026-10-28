#!/usr/bin/env python3
"""
Série histórica fixa (2014, 2018, 2022): candidaturas e eleitas e eleitos por
universo, gênero e cor/raça, para src/data/historical-series.ts.

Uso:
    python3 -I scripts/recontagem/historico_series.py \
        2014=consulta_cand_2014_BRASIL.csv 2018=... 2022=...

Regras:
- candidaturas: NR_TURNO = 1, dedup por SQ_CANDIDATO, todos os pedidos;
- eleições suplementares do mesmo arquivo ficam fora (só eleições gerais);
- proporcional: deputado federal, estadual e distrital; majoritário:
  presidente, governador e senador; vices e suplentes ficam fora;
- eleitas e eleitos: DS_SIT_TOT_TURNO começando com ELEITO (ou "MÉDIA" em
  2014); cargo decidido em 2º turno vale pela linha do 2º turno;
- gênero e cor/raça em maiúsculas, categorias originais.
"""
import csv
import hashlib
import json
import sys
from collections import Counter

PROP = ("DEPUTADO FEDERAL", "DEPUTADO ESTADUAL", "DEPUTADO DISTRITAL")
MAJ = ("PRESIDENTE", "GOVERNADOR", "SENADOR")


def eleito(s):
    s = s.upper()
    return s.startswith("ELEITO") or s == "MÉDIA"


def year(path):
    raw = open(path, "rb").read()
    first, second = {}, {}
    gerado = None
    for r in csv.DictReader(raw.decode("latin1").splitlines(), delimiter=";"):
        c = r["DS_CARGO"].upper()
        if c not in PROP + MAJ or "SUPLEMENTAR" in r["DS_ELEICAO"].upper():
            continue
        gerado = gerado or r["DT_GERACAO"]
        r["DS_CARGO"] = c
        if r["NR_TURNO"] == "1":
            first.setdefault(r["SQ_CANDIDATO"], r)
        elif r["NR_TURNO"] == "2":
            second[r["SQ_CANDIDATO"]] = r
    out = {"sha256": hashlib.sha256(raw).hexdigest(), "baseGeneratedAt": gerado, "universes": {}}
    for uid, cargos in (("proporcional", PROP), ("majoritario", MAJ)):
        c = [r for r in first.values() if r["DS_CARGO"] in cargos]
        e = [r for r in c if eleito((second.get(r["SQ_CANDIDATO"]) or r)["DS_SIT_TOT_TURNO"])]
        fem = lambda r: r["DS_GENERO"].upper() == "FEMININO"
        out["universes"][uid] = {
            "total": len(c),
            "feminine": sum(map(fem, c)),
            "raceAll": dict(Counter(r["DS_COR_RACA"].upper() for r in c)),
            "raceFeminine": dict(Counter(r["DS_COR_RACA"].upper() for r in c if fem(r))),
            "elected": {
                "total": len(e),
                "feminine": sum(map(fem, e)),
                "raceFeminine": dict(Counter(r["DS_COR_RACA"].upper() for r in e if fem(r))),
            },
        }
    return out


if __name__ == "__main__":
    res = {}
    for a in sys.argv[1:]:
        y, p = a.split("=", 1)
        res[y] = year(p)
    json.dump(res, sys.stdout, ensure_ascii=False)
    print()
