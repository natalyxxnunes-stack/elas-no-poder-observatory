#!/usr/bin/env python3
"""
Passo 4: dinheiro de campanha × reeleição, para quem estava no mandato de
deputado federal em alguma das seis votações de Como votaram e tentou
voltar à Câmara em 2026.

Uso:
    python3 -I 4_dinheiro_reeleicao.py deputados.json cruzamento.json \
        consulta_cand_2026_BRASIL.csv receitas_candidatos_2026_BRASIL.csv

Regras:
- universo: pessoas da lista de exercício (passo 2) com candidatura a
  DEPUTADO FEDERAL em 2026 (junção por CPF);
- receita: soma de VR_RECEITA por SQ_CANDIDATO, linhas idênticas uma vez só;
- faixas de receita: terços calculados sobre o universo inteiro (mulheres e
  homens juntos), para que a régua seja a mesma para os dois grupos;
- reeleita/reeleito: DS_SIT_TOT_TURNO começando com ELEITO.
"""
import csv
import json
import re
import statistics
import sys
from collections import Counter, defaultdict

norm = lambda c: re.sub(r"\D", "", c or "").zfill(11)
money = lambda s: float(s.replace(".", "").replace(",", ".")) if s else 0.0


def main(dep_path, cruz_path, cand_path, rec_path):
    deps = json.load(open(dep_path))["deputados"]
    cruz = json.load(open(cruz_path))["votacoes"]
    votos = defaultdict(dict)
    for v, rows in cruz.items():
        for r in rows:
            votos[str(r["id"])][v] = r["voto"]

    cand = {}
    for r in csv.DictReader(open(cand_path, encoding="latin1"), delimiter=";"):
        if r["NR_TURNO"] == "1" and r["DS_CARGO"] == "DEPUTADO FEDERAL":
            cand[norm(r["NR_CPF_CANDIDATO"])] = r

    seen, rev, tipo = set(), defaultdict(float), {}
    lines = open(rec_path, "rb").read().decode("latin1").splitlines()
    header = next(csv.reader([lines[0]], delimiter=";"))
    for line in lines[1:]:
        if line in seen:
            continue
        seen.add(line)
        r = dict(zip(header, next(csv.reader([line], delimiter=";"))))
        rev[r["SQ_CANDIDATO"]] += money(r["VR_RECEITA"])
        tipo[r["SQ_CANDIDATO"]] = r["TP_PRESTACAO_CONTAS"]

    people = []
    for i, d in deps.items():
        c = cand.get(norm(d["cpf"]))
        if not c:
            continue
        sq = c["SQ_CANDIDATO"]
        people.append({
            "id": i,
            "sexo": d["sexo"],
            "receita": rev.get(sq, 0.0),
            "prestacao": tipo.get(sq, "sem receita declarada"),
            "eleito": c["DS_SIT_TOT_TURNO"].startswith("ELEITO"),
            "votos": votos.get(i, {}),
        })

    vals = sorted(p["receita"] for p in people)
    t1 = vals[len(vals) // 3]
    t2 = vals[2 * len(vals) // 3]
    faixa = lambda x: "terço de menor receita" if x < t1 else "terço do meio" if x < t2 else "terço de maior receita"

    out = {"universo": len(people), "cortes": {"t1": round(t1, 2), "t2": round(t2, 2)}, "porSexo": {}}
    for sx in ("F", "M"):
        g = [p for p in people if p["sexo"] == sx]
        el = [p for p in g if p["eleito"]]
        ne = [p for p in g if not p["eleito"]]
        fx = defaultdict(lambda: {"total": 0, "eleitos": 0})
        for p in g:
            f = faixa(p["receita"])
            fx[f]["total"] += 1
            fx[f]["eleitos"] += p["eleito"]
        out["porSexo"][sx] = {
            "tentaram": len(g),
            "reeleitos": len(el),
            "medianaReeleitos": round(statistics.median(p["receita"] for p in el), 2) if el else None,
            "medianaNaoReeleitos": round(statistics.median(p["receita"] for p in ne), 2) if ne else None,
            "porFaixa": dict(fx),
            "prestacao": dict(Counter(p["prestacao"] for p in g)),
        }
    json.dump(out, sys.stdout, ensure_ascii=False, indent=1)
    print()


if __name__ == "__main__":
    main(*sys.argv[1:5])
