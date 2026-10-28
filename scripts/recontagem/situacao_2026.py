#!/usr/bin/env python3
"""
Situação de julgamento dos pedidos de registro de 2026, por universo, gênero e
cor/raça, a partir do arquivo complementar do TSE.

Uso:
    python3 -I scripts/recontagem/situacao_2026.py \
        consulta_cand_complementar_2026_BRASIL.csv consulta_cand_2026_BRASIL.csv

Junção por SQ_CANDIDATO. Campo: DS_SITUACAO_JULGAMENTO, agrupado em
- apta: DEFERIDO, DEFERIDO EM PRAZO RECURSAL OU COM RECURSO;
- indeferida com recurso: INDEFERIDO EM PRAZO RECURSAL OU COM RECURSO (sub judice);
- renúncia: RENÚNCIA;
- indeferida ou cancelada: INDEFERIDO, CANCELADO, FALECIMENTO, PEDIDO NÃO CONHECIDO;
- pendente: PENDENTE DE JULGAMENTO.
"""
import csv
import json
import sys
from collections import Counter, defaultdict

PROP = ("DEPUTADO FEDERAL", "DEPUTADO ESTADUAL", "DEPUTADO DISTRITAL")
MAJ = ("PRESIDENTE", "GOVERNADOR", "SENADOR")


def grp(s):
    s = s.upper()
    if s in ("DEFERIDO", "DEFERIDO EM PRAZO RECURSAL OU COM RECURSO"):
        return "apta"
    if s == "INDEFERIDO EM PRAZO RECURSAL OU COM RECURSO":
        return "indeferida com recurso"
    if s == "RENÚNCIA":
        return "renúncia"
    if s == "PENDENTE DE JULGAMENTO":
        return "pendente"
    return "indeferida ou cancelada"


def main(comp_path, cand_path):
    comp = {r["SQ_CANDIDATO"]: r for r in csv.DictReader(open(comp_path, encoding="latin1"), delimiter=";")}
    reg = {}
    for r in csv.DictReader(open(cand_path, encoding="latin1"), delimiter=";"):
        if r["NR_TURNO"] == "1" and r["SQ_CANDIDATO"] not in reg:
            reg[r["SQ_CANDIDATO"]] = r
    out = {"semPar": sum(1 for s in reg if s not in comp)}
    for name, cg in (("proporcional", PROP), ("majoritario", MAJ)):
        u = {}
        for g in ("FEMININO", "MASCULINO"):
            x = [s for s, r in reg.items() if r["DS_CARGO"] in cg and r["DS_GENERO"] == g]
            u[g] = {"total": len(x), **Counter(grp(comp[s]["DS_SITUACAO_JULGAMENTO"]) for s in x)}
            byr = defaultdict(Counter)
            for s in x:
                byr[reg[s]["DS_COR_RACA"]][grp(comp[s]["DS_SITUACAO_JULGAMENTO"])] += 1
            u[g + "_raca"] = {k: {"total": sum(c.values()), **c} for k, c in byr.items()}
        out[name] = u
    out["candidatasMajoritarias"] = {
        f'{" ".join(r["NM_URNA_CANDIDATO"].upper().split())}|{r["DS_CARGO"]}|{r["SG_UF"]}': comp[s]["DS_SITUACAO_JULGAMENTO"]
        for s, r in reg.items()
        if r["DS_CARGO"] in MAJ and r["DS_GENERO"] == "FEMININO"
    }
    json.dump(out, sys.stdout, ensure_ascii=False, indent=1)
    print()


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
