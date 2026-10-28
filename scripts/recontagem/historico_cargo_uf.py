#!/usr/bin/env python3
"""
Série histórica por cargo e por UF: mulheres entre as candidaturas e entre as
eleitas e eleitos, 2014, 2018, 2022 e 2026.

Uso:
    python3 -I scripts/recontagem/historico_cargo_uf.py \
        2014=consulta_cand_2014_BRASIL.csv 2018=... 2022=... 2026=...

Regras (as mesmas da série histórica publicada):
- candidaturas: linha do 1º turno (NR_TURNO = 1), dedup por SQ_CANDIDATO,
  todos os pedidos de registro;
- eleitas e eleitos: DS_SIT_TOT_TURNO começando com ELEITO (ou "MÉDIA", grafia
  de 2014); para governo e Presidência decididos em 2º turno, vale a linha do
  2º turno (NR_TURNO = 2), sem contar a mesma pessoa duas vezes;
- eleições suplementares que vêm no mesmo arquivo (AM e TO, em 2014) ficam
  fora: a série compara eleições gerais;
- cargos titulares: deputado federal, estadual e distrital, senador,
  governador e presidente; vices e suplentes ficam fora;
- por UF: só deputado federal (cadeiras fixas por estado e comparáveis entre
  anos).
"""
import csv
import hashlib
import json
import sys
from collections import Counter, defaultdict

CARGOS = ("DEPUTADO FEDERAL", "DEPUTADO ESTADUAL", "DEPUTADO DISTRITAL", "SENADOR", "GOVERNADOR", "PRESIDENTE")


def eleito(sit):
    s = sit.upper()
    return s.startswith("ELEITO") or s == "MÉDIA"


def year_counts(path):
    raw = open(path, "rb").read()
    sha = hashlib.sha256(raw).hexdigest()
    first, second = {}, {}
    for r in csv.DictReader(raw.decode("latin1").splitlines(), delimiter=";"):
        cargo = r["DS_CARGO"].upper()
        if cargo not in CARGOS or "SUPLEMENTAR" in r["DS_ELEICAO"].upper():
            continue
        r["DS_CARGO"] = cargo
        if r["NR_TURNO"] == "1":
            first.setdefault(r["SQ_CANDIDATO"], r)
        elif r["NR_TURNO"] == "2":
            second[r["SQ_CANDIDATO"]] = r
    fem = lambda r: r["DS_GENERO"].upper() == "FEMININO"
    final = {}
    for sq, r in first.items():
        s = second.get(sq)
        final[sq] = eleito(s["DS_SIT_TOT_TURNO"]) if s else eleito(r["DS_SIT_TOT_TURNO"])
    by_cargo = {}
    for cargo in CARGOS:
        c = [r for r in first.values() if r["DS_CARGO"] == cargo]
        e = [r for r in c if final[r["SQ_CANDIDATO"]]]
        by_cargo[cargo] = {
            "candidaturas": len(c),
            "candidatas": sum(map(fem, c)),
            "eleitos": len(e),
            "eleitas": sum(map(fem, e)),
            "eleitasRaca": dict(Counter(r["DS_COR_RACA"].upper() for r in e if fem(r))),
        }
    by_uf = {}
    fed = [r for r in first.values() if r["DS_CARGO"] == "DEPUTADO FEDERAL"]
    for uf in sorted({r["SG_UF"] for r in fed}):
        c = [r for r in fed if r["SG_UF"] == uf]
        e = [r for r in c if final[r["SQ_CANDIDATO"]]]
        by_uf[uf] = {"candidaturas": len(c), "candidatas": sum(map(fem, c)), "cadeiras": len(e), "eleitas": sum(map(fem, e))}
    return {"sha256": sha, "byCargo": by_cargo, "deputadoFederalByUf": by_uf}


def main(args):
    out = {}
    for a in args:
        y, p = a.split("=", 1)
        out[y] = year_counts(p)
    json.dump(out, sys.stdout, ensure_ascii=False)
    print()


if __name__ == "__main__":
    main(sys.argv[1:])
