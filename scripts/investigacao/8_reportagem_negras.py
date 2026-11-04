#!/usr/bin/env python3
"""
Apuração da reportagem de 20/11/2026 (mulheres negras e o voto): por grupo de
gênero × cor/raça, no universo proporcional de 2026 (deputado federal,
estadual e distrital, 1º turno, candidaturas com resultado de totalização):
candidaturas, receita (soma e mediana), votos, votos por mil reais, quem chegou
a votos de eleita (piso = menor votação eleita da mesma disputa) e eleitas.
Também por partido: taxa de eleição de mulheres pretas e pardas.

Mesmas regras de teste_dinheiro_2026.py e teste_lista_2026.py (linhas
idênticas de receita contadas uma vez; votos nominais válidos; pretas e
pardas separadas). Só contagens; nenhum dado individual sai daqui.

Checagens da leitura de editora (04/11): o mesmo recorte com limite relativo
à disputa (2%, 5% e 10% da menor votação eleita) e o perfil de gasto do fundo
(despesas pagas com fonte FEFC, por origem) das candidaturas de baixa votação.

Uso:
    python3 -I scripts/investigacao/8_reportagem_negras.py receitas_candidatos_2026_BRASIL.csv \
        consulta_cand_2026_BRASIL.csv votacao_candidato_munzona_2026.zip [despesas_pagas_candidatos_2026_BRASIL.csv]
"""
import csv
import json
import os
import statistics
import sys
from collections import Counter, defaultdict

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "recontagem"))
from teste_dinheiro_2026 import PROP, candidaturas, money, receitas, votos_zip  # noqa: E402

GRUPOS = {
    ("MASCULINO", "BRANCA"): "homens brancos",
    ("MASCULINO", "PARDA"): "homens pardos",
    ("MASCULINO", "PRETA"): "homens pretos",
    ("FEMININO", "BRANCA"): "mulheres brancas",
    ("FEMININO", "PARDA"): "mulheres pardas",
    ("FEMININO", "PRETA"): "mulheres pretas",
}


def main(rec_path, cand_path, vot_path, desp_path=None):
    c = candidaturas(cand_path, PROP)
    v, gerado = votos_zip(vot_path, set(c))
    rec, fefc = receitas(rec_path)
    piso = {}
    for sq, r in c.items():
        if r["DS_SIT_TOT_TURNO"].startswith("ELEITO"):
            k = (r["SG_UF"], r["DS_CARGO"])
            piso[k] = min(piso.get(k, 10**12), v[sq])
    g = defaultdict(lambda: {"c": 0, "r": 0.0, "f": 0.0, "v": 0, "piso": 0, "e": 0, "rs": []})
    part = defaultdict(lambda: Counter())
    for sq, r in c.items():
        nome = GRUPOS.get((r["DS_GENERO"], r["DS_COR_RACA"]))
        if not nome:
            continue
        x = g[nome]
        el = r["DS_SIT_TOT_TURNO"].startswith("ELEITO")
        x["c"] += 1
        x["r"] += rec.get(sq, 0.0)
        x["f"] += fefc.get(sq, 0.0)
        x["v"] += v[sq]
        x["piso"] += v[sq] >= piso.get((r["SG_UF"], r["DS_CARGO"]), 10**12)
        x["e"] += el
        x["rs"].append(rec.get(sq, 0.0))
        if nome in ("mulheres pretas", "mulheres pardas", "homens brancos"):
            part[r["SG_PARTIDO"]][nome + "|c"] += 1
            part[r["SG_PARTIDO"]][nome + "|e"] += el
    out = {}
    for nome, x in g.items():
        out[nome] = {
            "candidaturas": x["c"],
            "receita": round(x["r"]),
            "fundo": round(x["f"]),
            "medianaReceita": round(statistics.median(x["rs"])),
            "votos": x["v"],
            "votosPorMilReais": round(1000 * x["v"] / x["r"], 1) if x["r"] else None,
            "chegaramAVotosDeEleita": x["piso"],
            "pctChegaram": round(100 * x["piso"] / x["c"], 1),
            "eleitas": x["e"],
            "taxaEleicao": round(100 * x["e"] / x["c"], 1),
        }
    partidos = {}
    for p, k in part.items():
        if k["mulheres pretas|c"] + k["mulheres pardas|c"] >= 40:
            partidos[p] = {
                n: {"candidaturas": k[n + "|c"], "eleitas": k[n + "|e"]} for n in ("mulheres pretas", "mulheres pardas", "homens brancos")
            }
    # fundo eleitoral que foi para candidaturas com pouca votação (limites fixos: 100, 500 e 1.000 votos)
    baixo = {}
    for lim in (100, 500, 1000):
        baixo[lim] = {}
        for nome in GRUPOS.values():
            sqs = [sq for sq, r in c.items() if GRUPOS.get((r["DS_GENERO"], r["DS_COR_RACA"])) == nome]
            tot = sum(fefc.get(sq, 0.0) for sq in sqs)
            low = sum(fefc.get(sq, 0.0) for sq in sqs if v[sq] < lim)
            baixo[lim][nome] = {"fundo": round(tot), "fundoAbaixo": round(low), "pct": round(100 * low / tot, 1) if tot else None}
    por_partido = defaultdict(lambda: Counter())
    for sq, r in c.items():
        f = fefc.get(sq, 0.0)
        if not f:
            continue
        x = por_partido[r["SG_PARTIDO"]]
        if r["DS_GENERO"] == "FEMININO" and r["DS_COR_RACA"] in ("PRETA", "PARDA"):
            x["negras"] += f
            if v[sq] < 500:
                x["negras500"] += f
                x["n500"] += 1
        if r["DS_GENERO"] == "MASCULINO" and r["DS_COR_RACA"] == "BRANCA":
            x["hb"] += f
            if v[sq] < 500:
                x["hb500"] += f
    fundo_partidos = {
        p: {
            "fundoMulheresNegras": round(x["negras"]),
            "abaixo500": round(x["negras500"]),
            "candidaturasAbaixo500": x["n500"],
            "pct": round(100 * x["negras500"] / x["negras"], 1) if x["negras"] else None,
            "pctHomensBrancos": round(100 * x["hb500"] / x["hb"], 1) if x["hb"] else None,
        }
        for p, x in por_partido.items()
    }
    relativo = {}
    for frac in (0.02, 0.05, 0.10):
        relativo[frac] = {}
        for nome in GRUPOS.values():
            sqs = [sq for sq, r in c.items() if GRUPOS.get((r["DS_GENERO"], r["DS_COR_RACA"])) == nome]
            tot = sum(fefc.get(sq, 0.0) for sq in sqs)
            low = sum(fefc.get(sq, 0.0) for sq in sqs if v[sq] < frac * piso.get((c[sq]["SG_UF"], c[sq]["DS_CARGO"]), 0))
            relativo[frac][nome] = round(100 * low / tot, 1) if tot else None
    gasto = None
    if desp_path:
        negra = lambda r: r["DS_GENERO"] == "FEMININO" and r["DS_COR_RACA"] in ("PRETA", "PARDA")
        grupos_g = {
            "negras abaixo de 500 votos": {sq for sq, r in c.items() if negra(r) and v[sq] < 500 and fefc.get(sq, 0)},
            "negras com 500 votos ou mais": {sq for sq, r in c.items() if negra(r) and v[sq] >= 500 and fefc.get(sq, 0)},
            "homens brancos": {sq for sq, r in c.items() if r["DS_GENERO"] == "MASCULINO" and r["DS_COR_RACA"] == "BRANCA" and fefc.get(sq, 0)},
        }
        pmap = {}
        with open(rec_path, encoding="latin1", newline="") as f:
            for r in csv.DictReader(f, delimiter=";"):
                pmap[r["SQ_PRESTADOR_CONTAS"]] = r["SQ_CANDIDATO"]
        soma = {g: Counter() for g in grupos_g}
        vistos = set()
        with open(desp_path, encoding="latin1", newline="") as f:
            rd = csv.reader(f, delimiter=";")
            cab = next(rd)
            ix = {k: i for i, k in enumerate(cab)}
            for row in rd:
                t = tuple(row)
                if t in vistos or len(row) != len(cab):
                    continue
                vistos.add(t)
                if "ESPECIAL" not in row[ix["DS_FONTE_DESPESA"]].upper():
                    continue
                sq = pmap.get(row[ix["SQ_PRESTADOR_CONTAS"]])
                for g, sqs in grupos_g.items():
                    if sq in sqs:
                        soma[g][row[ix["DS_ORIGEM_DESPESA"]]] += money(row[ix["VR_PAGTO_DESPESA"]])
        gasto = {}
        for g, sqs in grupos_g.items():
            tot = sum(soma[g].values())
            gasto[g] = {
                "candidaturas": len(sqs),
                "fundoRecebido": round(sum(fefc[sq] for sq in sqs)),
                "fundoPago": round(tot),
                "porOrigem": {k: round(100 * val / tot, 1) for k, val in soma[g].most_common(8)},
            }
    print(json.dumps({"baseVotos": gerado, "grupos": out, "partidos": partidos, "fundoBaixaVotacao": baixo, "fundoBaixaVotacaoRelativo": relativo, "fundoBaixaVotacaoPorPartido": fundo_partidos, "gastoDoFundo": gasto}, ensure_ascii=False, indent=1))


if __name__ == "__main__":
    main(*sys.argv[1:5])
