#!/usr/bin/env python3
"""
Recortes por partido e por estado no universo proporcional de 2026
(deputado federal, estadual e distrital): candidaturas e eleitos, por gênero
e cor/raça declarada. Gera src/data/partido-uf-2026.ts, que alimenta o
comparador e o recorte interseccional por partido.

Uso:
    python3 -I scripts/recontagem/partido_uf_2026.py caminho/consulta_cand_2026_BRASIL.csv

Regras (as mesmas de resultado_2026.py):
- universo proporcional: DS_CARGO em DEPUTADO FEDERAL, ESTADUAL, DISTRITAL;
- 1º turno; deduplica por SQ_CANDIDATO (linhas repetidas contam uma vez);
- candidatura = toda linha do universo no arquivo, como no denominador já
  publicado (19.531 em 27/10);
- eleito = DS_SIT_TOT_TURNO começando com "ELEITO";
- cor/raça: as cinco categorias do TSE, nunca somadas sem decomposição; "SEM
  INFORMAÇÃO"/"NÃO DIVULGÁVEL" ficam em "outra".
- só contagens; nenhum dado individual sai deste script.
"""
import csv
import hashlib
import json
import sys
from collections import defaultdict

CARGOS = {"DEPUTADO FEDERAL", "DEPUTADO ESTADUAL", "DEPUTADO DISTRITAL"}
RACAS = ["BRANCA", "PARDA", "PRETA", "INDÍGENA", "AMARELA"]


def vazio():
    return {
        "candidaturas": 0,
        "candidatas": 0,
        "eleitos": 0,
        "eleitas": 0,
        "candidaturasRaca": defaultdict(int),
        "candidatasRaca": defaultdict(int),
        "eleitasRaca": defaultdict(int),
        "eleitosRaca": defaultdict(int),
    }


def somar(d, fem, raca, eleito):
    r = raca if raca in RACAS else "outra"
    d["candidaturas"] += 1
    d["candidaturasRaca"][r] += 1
    if fem:
        d["candidatas"] += 1
        d["candidatasRaca"][r] += 1
    if eleito:
        d["eleitos"] += 1
        d["eleitosRaca"][r] += 1
        if fem:
            d["eleitas"] += 1
            d["eleitasRaca"][r] += 1


def limpo(d):
    out = dict(d)
    for k in ("candidaturasRaca", "candidatasRaca", "eleitasRaca", "eleitosRaca"):
        out[k] = {r: d[k][r] for r in RACAS + ["outra"] if d[k].get(r)}
    return out


def main(path, out):
    raw = open(path, "rb").read()
    sha = hashlib.sha256(raw).hexdigest()
    rows = csv.DictReader(raw.decode("latin1").splitlines(), delimiter=";")
    total, partidos, ufs = vazio(), defaultdict(vazio), defaultdict(vazio)
    vistos, gerado = set(), None
    for r in rows:
        gerado = gerado or f'{r["DT_GERACAO"]} {r["HH_GERACAO"]}'
        if r["DS_CARGO"] not in CARGOS or r["NR_TURNO"] != "1":
            continue
        if r["SQ_CANDIDATO"] in vistos:
            continue
        vistos.add(r["SQ_CANDIDATO"])
        fem = r["DS_GENERO"] == "FEMININO"
        eleito = r["DS_SIT_TOT_TURNO"].startswith("ELEITO")
        raca = r["DS_COR_RACA"]
        for d in (total, partidos[r["SG_PARTIDO"]], ufs[r["SG_UF"]]):
            somar(d, fem, raca, eleito)

    meta = {"baseGeneratedAt": gerado, "csvSha256": sha}
    print("total", total["candidaturas"], total["candidatas"], total["eleitos"], total["eleitas"], dict(total["eleitasRaca"]))
    with open(out, "w", encoding="utf8") as f:
        f.write(
            "/**\n * partido-uf-2026 — universo proporcional de 2026 (deputado federal,\n"
            " * estadual e distrital), por partido e por estado: candidaturas e eleitos,\n"
            " * por gênero e cor/raça declarada. GERADO por\n"
            " * scripts/recontagem/partido_uf_2026.py; não editar à mão.\n"
            f" * Fonte: TSE, consulta_cand_2026_BRASIL.csv gerado em {gerado},\n"
            f" * SHA-256 {sha}.\n"
            " * Só contagens. \"outra\" = sem informação ou não divulgável.\n */\n"
            "export type Recorte = { candidaturas: number; candidatas: number; eleitos: number; eleitas: number;"
            " candidaturasRaca: Record<string, number>; candidatasRaca: Record<string, number>; eleitasRaca: Record<string, number>; eleitosRaca: Record<string, number> };\n"
            f"export const RECORTE_META = {json.dumps(meta, ensure_ascii=False)} as const;\n"
            f"export const RECORTE_TOTAL: Recorte = {json.dumps(limpo(total), ensure_ascii=False)};\n"
            "export const RECORTE_PARTIDOS: Record<string, Recorte> = "
            + json.dumps({p: limpo(d) for p, d in sorted(partidos.items())}, ensure_ascii=False)
            + ";\n"
            "export const RECORTE_UFS: Record<string, Recorte> = "
            + json.dumps({u: limpo(d) for u, d in sorted(ufs.items())}, ensure_ascii=False)
            + ";\n"
        )


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else "src/data/partido-uf-2026.ts")
