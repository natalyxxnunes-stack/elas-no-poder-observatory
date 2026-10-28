#!/usr/bin/env python3
"""
Passo 7: voto de cada bancada nas seis votações de Como votaram, para a página
Partido por partido. Lê cruzamento.json (passo 3) e grava um JSON com, por
votação e partido (sigla da Câmara na data do voto): votos Sim e Não de toda a
bancada, a maioria da bancada e os votos Sim e Não das deputadas.

Uso (na pasta com cruzamento.json):
    python3 -I 7_partidos_votos.py > partidos_votos.json
"""
import json
from collections import Counter, defaultdict

MAPA = {"PCdoB": "PCDOB"}  # siglas da Câmara que o TSE grafa de outro jeito

cz = json.load(open("cruzamento.json"))
out = {}
for vid, rows in cz["votacoes"].items():
    por = defaultdict(lambda: {"sim": 0, "nao": 0, "simF": 0, "naoF": 0})
    for r in rows:
        p = MAPA.get(r["partido"], r["partido"])
        if r["voto"] == "Sim":
            por[p]["sim"] += 1
            por[p]["simF"] += r["sexo"] == "F"
        elif r["voto"] == "Não":
            por[p]["nao"] += 1
            por[p]["naoF"] += r["sexo"] == "F"
    for p, d in por.items():
        d["maioria"] = "Sim" if d["sim"] > d["nao"] else "Não" if d["nao"] > d["sim"] else "dividida"
    out[vid] = dict(sorted(por.items()))
print(json.dumps(out, ensure_ascii=False))
