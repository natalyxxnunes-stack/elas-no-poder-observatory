#!/usr/bin/env python3
"""
Recontagem de votos nominais válidos por gênero e cor/raça (deputado federal,
estadual e distrital), 1º turno de 2026.

Uso:
    python3 scripts/recontagem/votos_2026.py \
        caminho/votacao_candidato_munzona_2026.zip \
        caminho/consulta_cand_2026_BRASIL.csv

Lê o CSV BRASIL de dentro do zip de votação sem descompactar no disco
(latin1, separador ';'), soma QT_VOTOS_NOMINAIS_VALIDOS por SQ_CANDIDATO no
1º turno e cruza com gênero e cor/raça do arquivo de candidaturas.

O que este número é: voto nominal válido dado a candidaturas de cada grupo.
O que não é: voto de legenda (não tem gênero), nem "competitividade".
"""
import csv
import io
import json
import sys
import zipfile
from collections import Counter, defaultdict

PROP = {"DEPUTADO FEDERAL": "federal", "DEPUTADO ESTADUAL": "estadual", "DEPUTADO DISTRITAL": "distrital"}


def main(zip_path, cand_path):
    cand = {}
    for r in csv.DictReader(open(cand_path, encoding="latin1"), delimiter=";"):
        if r["NR_TURNO"] == "1" and r["DS_CARGO"] in PROP:
            cand[r["SQ_CANDIDATO"]] = (r["DS_GENERO"], r["DS_COR_RACA"], r["SG_UF"])
    votes = Counter()
    dest = Counter()
    gerado = None
    with zipfile.ZipFile(zip_path) as z:
        name = next(n for n in z.namelist() if n.endswith("_BRASIL.csv"))
        with z.open(name) as fh:
            for r in csv.DictReader(io.TextIOWrapper(fh, encoding="latin1"), delimiter=";"):
                if r["NR_TURNO"] != "1":
                    continue
                cargo = r["DS_CARGO"].upper()
                if cargo not in PROP:
                    continue
                gerado = gerado or f'{r["DT_GERACAO"]} {r["HH_GERACAO"]}'
                v = int(r["QT_VOTOS_NOMINAIS_VALIDOS"] or 0)
                votes[(PROP[cargo], r["SQ_CANDIDATO"])] += v
                dest[r["NM_TIPO_DESTINACAO_VOTOS"]] += int(r["QT_VOTOS_NOMINAIS"] or 0)

    out = {"baseGeneratedAt": gerado, "destinacao": dict(dest), "byCargo": {}, "missingCandidates": 0}
    agg = defaultdict(lambda: {"total": 0, "byGender": Counter(), "byGenderRace": defaultdict(Counter), "byUf": defaultdict(Counter)})
    for (cargo, sq), v in votes.items():
        if sq not in cand:
            out["missingCandidates"] += 1
            continue
        g, race, uf = cand[sq]
        for key in (cargo, "proporcional"):
            a = agg[key]
            a["total"] += v
            a["byGender"][g] += v
            a["byGenderRace"][g][race] += v
            a["byUf"][uf][g] += v
    for key, a in agg.items():
        out["byCargo"][key] = {
            "total": a["total"],
            "byGender": dict(a["byGender"]),
            "byGenderRace": {g: dict(c) for g, c in a["byGenderRace"].items()},
            "byUf": {uf: dict(c) for uf, c in sorted(a["byUf"].items())},
        }
    json.dump(out, sys.stdout, ensure_ascii=False, indent=1)
    print()


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
