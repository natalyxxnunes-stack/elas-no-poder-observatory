#!/usr/bin/env python3
"""
Recontagem da fotografia de candidaturas (src/data/tse-snapshot.ts).

Uso:
    python3 -I scripts/recontagem/snapshot_candidaturas_2026.py consulta_cand_2026_BRASIL.csv

Imprime um JSON com BASE, PACKED e OUT_OF_UNIVERSE no mesmo formato do
arquivo do site, mais o SHA-256 e a data de geração do CSV.

Regras (as mesmas da fotografia publicada):
- linhas do 1º turno (NR_TURNO = 1), dedup por SQ_CANDIDATO; nenhum filtro
  por situação: a fotografia conta pedidos de registro;
- proporcional: deputado federal, estadual e distrital; majoritário:
  presidente, governador e senador; vices e suplentes ficam fora (OUT_OF_UNIVERSE);
- cor/raça nas categorias originais de DS_COR_RACA;
- PACKED: UF → partido → [total, mulheres por cor/raça na ordem RACE_ORDER],
  zeros finais omitidos; a Presidência (SG_UF = BR) fica fora dos recortes por UF.
"""
import csv
import hashlib
import json
import sys
from collections import Counter, defaultdict

PROP = ("DEPUTADO FEDERAL", "DEPUTADO ESTADUAL", "DEPUTADO DISTRITAL")
MAJ = ("PRESIDENTE", "GOVERNADOR", "SENADOR")
RACE_ORDER = ["BRANCA", "PARDA", "PRETA", "INDÍGENA", "AMARELA", "NÃO DIVULGÁVEL", "NÃO INFORMADO"]


def main(path):
    raw = open(path, "rb").read()
    sha = hashlib.sha256(raw).hexdigest()
    rows, seen = [], set()
    for r in csv.DictReader(raw.decode("latin1").splitlines(), delimiter=";"):
        if r["NR_TURNO"] != "1" or r["SQ_CANDIDATO"] in seen:
            continue
        seen.add(r["SQ_CANDIDATO"])
        rows.append(r)
    fem = lambda r: r["DS_GENERO"] == "FEMININO"
    base, packed = {}, {}
    for uid, cargos in (("proporcional", PROP), ("majoritario", MAJ)):
        u = [r for r in rows if r["DS_CARGO"] in cargos]
        f = [r for r in u if fem(r)]
        base[uid] = {
            "total": len(u),
            "feminine": len(f),
            "raceCounts": dict(Counter(r["DS_COR_RACA"] for r in f)),
            "raceAllCounts": dict(Counter(r["DS_COR_RACA"] for r in u)),
            "totalByCargo": dict(Counter(r["DS_CARGO"] for r in u)),
            "feminineByCargo": dict(Counter(r["DS_CARGO"] for r in f)),
        }
        cells = defaultdict(lambda: defaultdict(lambda: [0] * (1 + len(RACE_ORDER))))
        for r in u:
            if r["SG_UF"] == "BR":
                continue
            c = cells[r["SG_UF"]][r["SG_PARTIDO"]]
            c[0] += 1
            if fem(r) and r["DS_COR_RACA"] in RACE_ORDER:
                c[1 + RACE_ORDER.index(r["DS_COR_RACA"])] += 1
        out = {}
        for uf, parties in cells.items():
            out[uf] = {}
            for p, v in parties.items():
                while len(v) > 1 and v[-1] == 0:
                    v = v[:-1]
                out[uf][p] = v
        packed[uid] = out
    oo = [r for r in rows if r["DS_CARGO"] not in PROP + MAJ]
    print(
        json.dumps(
            {
                "sha256": sha,
                "baseGeneratedAt": f'{rows[0]["DT_GERACAO"]} {rows[0]["HH_GERACAO"]}',
                "BASE": base,
                "PACKED": packed,
                "OUT_OF_UNIVERSE": {
                    "total": len(oo),
                    "byCargo": dict(Counter(r["DS_CARGO"] for r in oo)),
                    "feminineByCargo": dict(Counter(r["DS_CARGO"] for r in oo if fem(r))),
                },
            },
            ensure_ascii=False,
        )
    )


if __name__ == "__main__":
    main(sys.argv[1])
