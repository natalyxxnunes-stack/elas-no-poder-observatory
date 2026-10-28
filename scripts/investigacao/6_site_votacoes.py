#!/usr/bin/env python3
"""
Passo 4: monta os dados de /como-votaram (site_votacoes.json) a partir de
cruzamento.json (passo 3). Os textos de cada votação (bloco, título, o que
significa votar Sim) ficam em META, fixados à mão e conferidos com a
descrição oficial da Câmara.

Uso (na pasta com votacoes.json e cruzamento.json):
    python3 -I 6_site_votacoes.py site_votacoes.json
"""
import json
import sys
from collections import Counter, defaultdict

DESF = ["reeleita", "eleita para outro cargo", "suplente", "não eleita", "não concorreu"]
META = {
    "2351179-51": ("Mulheres", "Igualdade salarial entre mulheres e homens", "PL 1.085/2023",
                   "texto principal (subemenda substitutiva global)",
                   "a favor da lei de igualdade salarial e remuneratória entre mulheres e homens na mesma função"),
    "2352476-149": None, "345311-270": None, "2358548-89": None, "2270800-160": None,
    "2482078-57": ("Mulheres", "Derrubada da norma do Conanda sobre vítimas de violência sexual", "PDL 3/2025",
                   "texto principal",
                   "a favor de sustar a Resolução 258/2024 do Conanda, que regulamentava o atendimento a crianças e adolescentes vítimas de violência sexual, inclusive o acesso ao aborto nos casos previstos em lei"),
}


def build(vs, cz, old):
    oldv = {v["id"]: v for v in old["votacoes"]}
    out_v = []
    for vid in META:
        rows = cz["votacoes"][vid]
        det = vs[vid]["detalhe"]
        if META[vid] is None:
            o = oldv[vid]
            bloco, titulo, prop, etapa, sim = o["bloco"], o["titulo"], o["proposicao"], o["etapa"], o["sim"]
        else:
            bloco, titulo, prop, etapa, sim = META[vid]
        c = Counter(r["voto"] for r in rows)
        por = {}
        for sx in ("F", "M"):
            g = [r for r in rows if r["sexo"] == sx]
            dpv = defaultdict(lambda: {k: 0 for k in DESF})
            for r in g:
                if r["desfecho2026"] in DESF:
                    dpv[r["voto"]][r["desfecho2026"]] += 1
            votos = Counter(r["voto"] for r in g)
            por[sx] = {
                "total": len(g),
                "votos": dict(votos),
                "contraBancada": sum(r["alinhamento"] == "contra a bancada" for r in g),
                "comBancada": sum(r["alinhamento"] == "com a bancada" for r in g),
                "desfechoPorVoto": {k: dpv[k] for k in votos if k in dpv and k in ("Sim", "Não", "Ausente")},
            }
        raca = defaultdict(Counter)
        for r in rows:
            if r["sexo"] == "F":
                raca[r["raca2022"]][r["voto"]] += 1
        contra = sorted(
            ({"nome": r["nome"], "partido": r["partido"], "uf": r["uf"], "voto": r["voto"], "maioriaBancada": r["maioriaBancada"]}
             for r in rows if r["sexo"] == "F" and r["alinhamento"] == "contra a bancada"),
            key=lambda x: x["nome"])
        out_v.append({
            "id": vid, "bloco": bloco, "titulo": titulo, "proposicao": prop, "etapa": etapa, "sim": sim,
            "data": det["dataHoraRegistro"][:10], "descricaoOficial": det["descricao"],
            "placar": {"sim": c["Sim"], "nao": c["Não"], "abstencao": c["Abstenção"]},
            "emExercicio": len(rows), "porSexo": por,
            "racaDeputadas": {k: dict(v) for k, v in raca.items()},
            "deputadasContraBancada": contra,
        })
    deps = {}
    for vid in META:
        for r in cz["votacoes"][vid]:
            if r["sexo"] != "F":
                continue
            d = deps.setdefault(r["id"], {"nome": r["nome"], "uf": r["uf"], "raca2022": r["raca2022"],
                                          "desfecho2026": r["desfecho2026"], "cargo2026": r["cargo2026"], "votos": {}})
            d["votos"][vid] = {"voto": r["voto"], "partido": r["partido"], "bancada": r["maioriaBancada"], "alinhamento": r["alinhamento"]}
    return {"votacoes": out_v, "deputadas": sorted(deps.values(), key=lambda x: x["nome"])}


if __name__ == "__main__":
    vs = json.load(open("votacoes.json"))
    cz = json.load(open("cruzamento.json"))
    old = json.load(open(sys.argv[1]))
    new = build(vs, cz, old)
    json.dump(new, open(sys.argv[1] + ".novo", "w"), ensure_ascii=False, indent=1)
    print(len(new["votacoes"]), "votações,", len(new["deputadas"]), "deputadas")
