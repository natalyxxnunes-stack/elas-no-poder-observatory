#!/usr/bin/env python3
"""
Fundo Especial de Financiamento de Campanha (FEFC) recebido pelas
candidaturas de cada partido em 2026, por gênero e cor/raça.

Uso:
    python3 -I scripts/recontagem/fefc_partidos_2026.py \
        receitas_candidatos_2026_BRASIL.csv consulta_cand_2026_BRASIL.csv

Regras:
- FEFC = linhas com DS_FONTE_RECEITA = "FUNDO ESPECIAL" (linhas idênticas uma vez);
- universo: candidaturas titulares (deputado federal, estadual, distrital,
  presidente, governador e senador), todos os pedidos de registro, NR_TURNO = 1;
  com o 3º argumento "proporcional", só deputado federal, estadual e distrital
  (universo sem vices e suplentes, em que a conta não depende de como a chapa
  majoritária é atribuída);
- partido do registro (SG_PARTIDO); receita somada por SQ_CANDIDATO, todos os turnos;
- comFefc = candidaturas que receberam algum FEFC (base do segundo número);
- cor/raça nas categorias originais; a soma pretas + pardas sai em campo próprio,
  declarada, porque a regra legal de distribuição usa "candidaturas negras".
"""
import csv
import json
import sys
from collections import defaultdict

TIT = ("DEPUTADO FEDERAL", "DEPUTADO ESTADUAL", "DEPUTADO DISTRITAL", "PRESIDENTE", "GOVERNADOR", "SENADOR")
PROP = ("DEPUTADO FEDERAL", "DEPUTADO ESTADUAL", "DEPUTADO DISTRITAL")
RACES = ("BRANCA", "PARDA", "PRETA", "INDÍGENA", "AMARELA")


def main(rec_path, cand_path, universo="titulares"):
    cargos = PROP if universo == "proporcional" else TIT
    reg = {}
    for r in csv.DictReader(open(cand_path, encoding="latin1"), delimiter=";"):
        if r["NR_TURNO"] == "1" and r["SQ_CANDIDATO"] not in reg and r["DS_CARGO"] in cargos:
            reg[r["SQ_CANDIDATO"]] = r
    lines = open(rec_path, "rb").read().decode("latin1").splitlines()
    header = next(csv.reader([lines[0]], delimiter=";"))
    seen, fefc = set(), defaultdict(float)
    for line in lines[1:]:
        if line in seen:
            continue
        seen.add(line)
        r = dict(zip(header, next(csv.reader([line], delimiter=";"))))
        if r["DS_FONTE_RECEITA"] == "FUNDO ESPECIAL":
            fefc[r["SQ_CANDIDATO"]] += float(r["VR_RECEITA"].replace(".", "").replace(",", "."))

    def blank():
        return {
            "candidaturas": 0,
            "comFefc": 0,
            "fefc": 0.0,
            "mulheres": {"candidaturas": 0, "fefc": 0.0},
            "raca": {k: {"candidaturas": 0, "fefc": 0.0} for k in RACES},
            "mulheresRaca": {k: {"candidaturas": 0, "fefc": 0.0} for k in RACES},
        }

    parties = defaultdict(blank)
    total = blank()
    for sq, r in reg.items():
        v = fefc.get(sq, 0.0)
        for p in (parties[r["SG_PARTIDO"]], total):
            p["candidaturas"] += 1
            p["comFefc"] += v > 0
            p["fefc"] += v
            race = r["DS_COR_RACA"]
            if race in RACES:
                p["raca"][race]["candidaturas"] += 1
                p["raca"][race]["fefc"] += v
            if r["DS_GENERO"] == "FEMININO":
                p["mulheres"]["candidaturas"] += 1
                p["mulheres"]["fefc"] += v
                if race in RACES:
                    p["mulheresRaca"][race]["candidaturas"] += 1
                    p["mulheresRaca"][race]["fefc"] += v

    def clean(p):
        rnd = lambda d: {"candidaturas": d["candidaturas"], "fefc": round(d["fefc"], 2)}
        return {
            "candidaturas": p["candidaturas"],
            "comFefc": p["comFefc"],
            "fefc": round(p["fefc"], 2),
            "mulheres": rnd(p["mulheres"]),
            "raca": {k: rnd(x) for k, x in p["raca"].items()},
            "mulheresRaca": {k: rnd(x) for k, x in p["mulheresRaca"].items()},
            "pretasPardasSoma": {
                "candidaturas": p["raca"]["PRETA"]["candidaturas"] + p["raca"]["PARDA"]["candidaturas"],
                "fefc": round(p["raca"]["PRETA"]["fefc"] + p["raca"]["PARDA"]["fefc"], 2),
            },
        }

    out = {
        "total": clean(total),
        "partidos": {k: clean(p) for k, p in sorted(parties.items(), key=lambda kv: -kv[1]["fefc"]) if p["fefc"] > 0},
        "partidosSemFefc": sorted(k for k, p in parties.items() if p["fefc"] == 0),
    }
    json.dump(out, sys.stdout, ensure_ascii=False, indent=1)
    print()


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2], sys.argv[3] if len(sys.argv) > 3 else "titulares")
