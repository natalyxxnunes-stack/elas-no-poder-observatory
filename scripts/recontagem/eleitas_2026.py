#!/usr/bin/env python3
"""
Lista das mulheres eleitas em 2026, uma linha por pessoa, a partir do arquivo
oficial do TSE (consulta_cand_2026_BRASIL.csv). Gera src/data/eleitas-2026.ts.

Uso:
    python3 scripts/recontagem/eleitas_2026.py caminho/consulta_cand_2026_BRASIL.csv

Regras (as mesmas de resultado_2026.py):
- eleita = DS_SIT_TOT_TURNO começando com "ELEITO"; deduplica por SQ_CANDIDATO
  dentro do turno;
- deputadas federais, estaduais e distritais e senadoras: 1º turno;
- governadoras: eleitas no 1º turno ou no 2º turno;
- vices e suplentes ficam fora;
- só dado público de registro: nome de urna, cargo, UF, partido, cor/raça
  declarada e situação. Sem CPF, e-mail, data de nascimento ou foto.
"""
import csv
import hashlib
import json
import re
import sys
import unicodedata

CARGOS = {
    "DEPUTADO FEDERAL": "deputada-federal",
    "DEPUTADO ESTADUAL": "deputada-estadual",
    "DEPUTADO DISTRITAL": "deputada-distrital",
    "SENADOR": "senadora",
    "GOVERNADOR": "governadora",
}
MINUSCULAS = {"da", "de", "do", "das", "dos", "e"}


def titulo(nome):
    partes = nome.lower().split()
    return " ".join(p if (i and p in MINUSCULAS) else p[:1].upper() + p[1:] for i, p in enumerate(partes))


def slug(s):
    s = unicodedata.normalize("NFD", s).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")


def main(path):
    raw = open(path, "rb").read()
    sha = hashlib.sha256(raw).hexdigest()
    rows = list(csv.DictReader(raw.decode("latin1").splitlines(), delimiter=";"))
    gerado = f'{rows[0]["DT_GERACAO"]} {rows[0]["HH_GERACAO"]}'
    vistos, eleitas = set(), []
    for r in rows:
        chave = (r["NR_TURNO"], r["SQ_CANDIDATO"])
        if chave in vistos:
            continue
        vistos.add(chave)
        if r["DS_GENERO"] != "FEMININO" or r["DS_CARGO"] not in CARGOS:
            continue
        if not r["DS_SIT_TOT_TURNO"].startswith("ELEITO"):
            continue
        if r["DS_CARGO"] != "GOVERNADOR" and r["NR_TURNO"] != "1":
            continue
        eleitas.append(r)
    out, usados = [], set()
    for r in sorted(eleitas, key=lambda r: (list(CARGOS).index(r["DS_CARGO"]), r["SG_UF"], r["NM_URNA_CANDIDATO"])):
        cargo = CARGOS[r["DS_CARGO"]]
        nome = titulo(r["NM_URNA_CANDIDATO"])
        base = slug(f'{nome}-{r["SG_UF"]}')
        s = base if base not in usados else slug(f"{base}-{cargo}")
        usados.add(s)
        out.append(
            {
                "slug": s,
                "nome": nome,
                "cargo": cargo,
                "uf": r["SG_UF"],
                "partido": r["SG_PARTIDO"],
                "corRaca": r["DS_COR_RACA"],
                "situacao": r["DS_SIT_TOT_TURNO"],
                "turno": int(r["NR_TURNO"]),
            }
        )
    cont = {}
    for e in out:
        cont[e["cargo"]] = cont.get(e["cargo"], 0) + 1
    ts = [
        "/**",
        " * eleitas-2026 — as mulheres eleitas em 2026, uma por linha. GERADO por",
        " * scripts/recontagem/eleitas_2026.py; não editar à mão.",
        f" * Fonte: TSE, consulta_cand_2026_BRASIL.csv gerado em {gerado},",
        f" * SHA-256 {sha}.",
        " * Só dado público de registro. Sem CPF, e-mail, data de nascimento ou foto.",
        " */",
        "export type CargoEleita = " + " | ".join(f'"{c}"' for c in CARGOS.values()) + ";",
        "export type Eleita = { slug: string; nome: string; cargo: CargoEleita; uf: string; partido: string; corRaca: string; situacao: string; turno: number };",
        f'export const ELEITAS_META = {{ baseGeneratedAt: "{gerado}", csvSha256: "{sha}", porCargo: {json.dumps(cont, ensure_ascii=False)} }} as const;',
        "export const ELEITAS_2026: readonly Eleita[] = " + json.dumps(out, ensure_ascii=False, indent=0) + ";",
        "",
    ]
    open("src/data/eleitas-2026.ts", "w", encoding="utf-8").write("\n".join(ts))
    print(json.dumps({"total": len(out), "porCargo": cont, "gerado": gerado, "sha": sha}, ensure_ascii=False))


if __name__ == "__main__":
    main(sys.argv[1])
