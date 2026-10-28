#!/usr/bin/env python3
"""
Apuração da reportagem das deputadas (rascunho, fora do site).

1. PDL 3/2025 (susta a Resolução 258/2024 do Conanda): voto nominal de
   05/11/2025 (votação 2482078-57) por sexo, e voto das 10 deputadas do recorte.
2. Discursos em plenário das 10 deputadas (fev/2023 a out/2026) que citam
   feminismo, "ideologia de gênero" ou a lei de igualdade salarial.

Fonte: Câmara dos Deputados, Dados Abertos (API v2). O sexo de cada deputado
vem de /deputados/{id}. Uso:
    python3 -I scripts/investigacao/5_pdl3_e_discursos.py saida.json
"""
import json
import re
import sys
import time
import urllib.request
from collections import Counter

B = "https://dadosabertos.camara.leg.br/api/v2"
TEN = {
    "Adriana Ventura": 204528, "Any Ortiz": 220549, "Bia Kicis": 204374,
    "Carla Zambelli": 204507, "Caroline de Toni": 204369, "Chris Tonietto": 204462,
    "Dani Cunha": 220603, "Julia Zanatta": 220559, "Rosangela Moro": 220644,
    "Silvia Waiãpi": 220579,
}
PADRAO = re.compile(r"feminis|ideologia de g[êe]nero|igualdade salarial|14\.611", re.I)


def get(path):
    for i in range(7):
        try:
            req = urllib.request.Request(B + path, headers={"Accept": "application/json"})
            return json.load(urllib.request.urlopen(req, timeout=90))
        except Exception:
            time.sleep(3 + i * 3)
    raise SystemExit("falhou: " + path)


def main(out_path):
    votos = get("/votacoes/2482078-57/votos")["dados"]
    sexo = {}
    for v in votos:
        i = v["deputado_"]["id"]
        sexo[i] = get(f"/deputados/{i}")["dados"]["sexo"]
    por_sexo = {s: Counter(v["tipoVoto"] for v in votos if sexo[v["deputado_"]["id"]] == s) for s in ("F", "M")}
    das_dez = {v["deputado_"]["nome"]: v["tipoVoto"] for v in votos if v["deputado_"]["id"] in TEN.values()}

    falas = []
    for nome, i in TEN.items():
        page = 1
        while True:
            r = get(f"/deputados/{i}/discursos?dataInicio=2023-02-01&dataFim=2026-10-27&itens=100&pagina={page}")
            for d in r["dados"]:
                t = d.get("transcricao") or ""
                if PADRAO.search(t):
                    falas.append({"nome": nome, "data": d["dataHoraInicio"], "fase": (d.get("faseEvento") or {}).get("titulo"),
                                  "url": d.get("urlTexto"), "transcricao": t})
            if not any(l["rel"] == "next" for l in r.get("links", [])):
                break
            page += 1

    json.dump({"pdl3_por_sexo": por_sexo, "pdl3_das_dez": das_dez, "falas": falas},
              open(out_path, "w"), ensure_ascii=False, indent=1)
    print(por_sexo, das_dez, len(falas))


if __name__ == "__main__":
    main(sys.argv[1])
