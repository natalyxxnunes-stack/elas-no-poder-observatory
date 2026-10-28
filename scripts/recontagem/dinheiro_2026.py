#!/usr/bin/env python3
"""
Recontagem independente das receitas de campanha de 2026.

Uso:
    python3 -I scripts/recontagem/dinheiro_2026.py \
        caminho/receitas_candidatos_2026_BRASIL.csv \
        caminho/consulta_cand_2026_BRASIL.csv > dinheiro.json

Regras (as mesmas da fotografia publicada em Dinheiro):
- unidade de análise: candidatura (SQ_CANDIDATO); receita = soma de VR_RECEITA,
  todos os turnos;
- linhas idênticas em todas as colunas entram uma única vez;
- gênero, cor/raça, cargo, UF e partido vêm do registro de candidaturas
  (NR_TURNO = 1, SQ_CANDIDATO único);
- universos: proporcional (deputado federal, estadual e distrital) e
  majoritário (presidente, governador e senador, só titulares);
- cor/raça nas categorias originais do TSE, sem agregação;
- "candidatura com receita" = candidatura que aparece no arquivo de receitas.
"""
import csv
import hashlib
import json
import statistics
import sys
from collections import Counter, defaultdict

PROP = ("DEPUTADO FEDERAL", "DEPUTADO ESTADUAL", "DEPUTADO DISTRITAL")
MAJ = ("PRESIDENTE", "GOVERNADOR", "SENADOR")


def universe(cargo):
    c = cargo.upper()
    return "proporcional" if c in PROP else "majoritario" if c in MAJ else None


def money(s):
    return float(s.replace(".", "").replace(",", ".")) if s else 0.0


def main(rec_path, cand_path):
    raw = open(rec_path, "rb").read()
    sha = hashlib.sha256(raw).hexdigest()
    lines = raw.decode("latin1").splitlines()
    header = next(csv.reader([lines[0]], delimiter=";"))
    seen, dup, dup_value, rows = set(), 0, 0.0, []
    for line in lines[1:]:
        r = dict(zip(header, next(csv.reader([line], delimiter=";"))))
        if line in seen:
            dup += 1
            dup_value += money(r["VR_RECEITA"])
            continue
        seen.add(line)
        rows.append(r)
    gerado = f'{rows[0]["DT_GERACAO"]} {rows[0]["HH_GERACAO"]}'

    reg = {}
    for r in csv.DictReader(open(cand_path, encoding="latin1"), delimiter=";"):
        if r["NR_TURNO"] != "1" or r["SQ_CANDIDATO"] in reg:
            continue
        reg[r["SQ_CANDIDATO"]] = r

    rev = defaultdict(float)
    tipos = defaultdict(set)
    for r in rows:
        rev[r["SQ_CANDIDATO"]] += money(r["VR_RECEITA"])
        tipos[r["SQ_CANDIDATO"]].add(r["TP_PRESTACAO_CONTAS"])
    unmatched = [sq for sq in rev if sq not in reg]
    gender_mismatch = sum(
        1 for r in rows if r["SQ_CANDIDATO"] in reg and r["DS_GENERO"].upper() != reg[r["SQ_CANDIDATO"]]["DS_GENERO"].upper()
    )

    fem = lambda r: r["DS_GENERO"] == "FEMININO"
    out = {
        "baseGeneratedAt": gerado,
        "csvSha256": sha,
        "rawRows": len(lines) - 1,
        "duplicateRows": dup,
        "duplicateValue": round(dup_value, 2),
        "rowsProcessed": len(rows),
        "candidaciesWithRevenue": len(rev),
        "unmatchedCandidacies": len(unmatched),
        "genderMismatchRows": gender_mismatch,
        "tiposPrestacao": dict(Counter(t for s in tipos.values() for t in s)),
        "universes": {},
        "extras": {},
    }
    for uid in ("proporcional", "majoritario"):
        regu = [r for r in reg.values() if universe(r["DS_CARGO"]) == uid]
        withr = [r for r in regu if r["SQ_CANDIDATO"] in rev]
        f = [r for r in withr if fem(r)]
        m = [r for r in withr if r["DS_GENERO"] == "MASCULINO"]
        v = lambda r: rev[r["SQ_CANDIDATO"]]
        byrace = defaultdict(lambda: {"value": 0.0, "candidacies": 0})
        med_race = defaultdict(list)
        for r in f:
            byrace[r["DS_COR_RACA"]]["value"] += v(r)
            byrace[r["DS_COR_RACA"]]["candidacies"] += 1
            med_race[r["DS_COR_RACA"]].append(v(r))
        office = defaultdict(lambda: {"total": 0.0, "feminine": 0.0, "candidacies": 0, "feminineCandidacies": 0})
        party = defaultdict(lambda: {"total": 0.0, "feminine": 0.0})
        uf = defaultdict(lambda: {"total": 0.0, "feminine": 0.0})
        for r in withr:
            o = office[r["DS_CARGO"]]
            o["total"] += v(r)
            o["candidacies"] += 1
            party[r["SG_PARTIDO"]]["total"] += v(r)
            uf[r["SG_UF"]]["total"] += v(r)
            if fem(r):
                o["feminine"] += v(r)
                o["feminineCandidacies"] += 1
                party[r["SG_PARTIDO"]]["feminine"] += v(r)
                uf[r["SG_UF"]]["feminine"] += v(r)
        rnd = lambda d: {k: (round(x, 2) if isinstance(x, float) else x) for k, x in d.items()}
        u = {
            "registeredCandidacies": len(regu),
            "candidaciesWithRevenue": len(withr),
            "registeredFeminineCandidacies": sum(map(fem, regu)),
            "feminineCandidaciesWithRevenue": len(f),
            "totalRevenue": round(sum(map(v, withr)), 2),
            "feminineRevenue": round(sum(map(v, f)), 2),
            "feminineMedian": round(statistics.median(map(v, f)), 2) if f else 0,
            "masculineMedian": round(statistics.median(map(v, m)), 2) if m else 0,
            "feminineRevenueByRace": {k: rnd(x) for k, x in sorted(byrace.items(), key=lambda kv: -kv[1]["value"])},
            "byOffice": {k: rnd(x) for k, x in office.items()},
            "feminineMedianByRace": {k: round(statistics.median(x), 2) for k, x in med_race.items()},
        }
        top = sorted(party.items(), key=lambda kv: -kv[1]["total"])
        if uid == "proporcional":
            u["topParties"] = {k: rnd(x) for k, x in top[:5]}
            u["byUf"] = {k: rnd(x) for k, x in sorted(uf.items(), key=lambda kv: -kv[1]["total"])}
        out["universes"][uid] = u

        top12 = [k for k, _ in top[:12]]
        f12 = [r for r in f if r["SG_PARTIDO"] in top12]
        med12 = defaultdict(list)
        for r in f12:
            med12[r["DS_COR_RACA"]].append(v(r))
        out["extras"][uid] = {
            "top12Parties": sorted(top12),
            "top12Share": round(100 * sum(x["total"] for _, x in top[:12]) / u["totalRevenue"], 1),
            "top12FeminineMedianByRace": {k: round(statistics.median(x), 2) for k, x in med12.items()},
            "top12FeminineByRace": dict(Counter(r["DS_COR_RACA"] for r in f12)),
            "feminineByRace": dict(Counter(r["DS_COR_RACA"] for r in f)),
        }
    # receita por candidatura de mulher no majoritário (tabela das candidatas)
    out["candidatasMajoritarias"] = {
        r["SQ_CANDIDATO"]: {"nome": r["NM_URNA_CANDIDATO"], "cargo": r["DS_CARGO"], "uf": r["SG_UF"], "receita": round(rev.get(r["SQ_CANDIDATO"], 0.0))}
        for r in reg.values()
        if universe(r["DS_CARGO"]) == "majoritario" and fem(r)
    }
    json.dump(out, sys.stdout, ensure_ascii=False, indent=1)
    print()


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
