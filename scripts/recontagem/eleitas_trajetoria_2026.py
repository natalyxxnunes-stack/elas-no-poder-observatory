#!/usr/bin/env python3
"""
Trajetória registrada no TSE de cada eleita de 2026: ocupação e escolaridade
declaradas no registro de 2026 e o que aconteceu com ela na eleição geral de
2022. Gera src/data/eleitas-trajetoria-2026.ts, com a mesma chave (slug) de
src/data/eleitas-2026.ts.

Uso:
    python3 -I scripts/recontagem/eleitas_trajetoria_2026.py \
        caminho/consulta_cand_2026_BRASIL.csv caminho/consulta_cand_2022_BRASIL.csv

Regras:
- a lista de eleitas e os slugs saem da mesma seleção de eleitas_2026.py
  (importada daqui, não copiada), sobre o mesmo arquivo de 2026;
- 2022: junção pelo CPF, só em memória. O CPF não é gravado em lugar nenhum;
- em 2022, vale a última situação registrada da candidatura (2º turno quando
  houve); quando a mesma pessoa tem mais de um registro no mesmo turno (um
  inapto e outro apto, por exemplo), vale o de resultado válido; candidaturas a
  vice e suplente contam pelo próprio cargo;
- quem não aparece no arquivo de 2022 recebe `null`: não disputou a eleição
  geral de 2022. Eleições municipais (2020, 2024) não estão nesta base;
- ocupação na forma feminina do rótulo do próprio TSE, que grava o par
  ("ADVOGADA/ADVOGADO" vira "Advogada");
- só dado público de registro. Sem CPF, e-mail, título, data de nascimento,
  estado civil ou foto.
"""
import csv
import hashlib
import importlib.util
import json
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
_spec = importlib.util.spec_from_file_location("eleitas_2026", os.path.join(AQUI, "eleitas_2026.py"))
E = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(E)

CARGO_2022 = {
    "PRESIDENTE": "presidente",
    "VICE-PRESIDENTE": "vice-presidente",
    "GOVERNADOR": "governadora",
    "VICE-GOVERNADOR": "vice-governadora",
    "SENADOR": "senadora",
    "1º SUPLENTE": "1ª suplente de senador",
    "2º SUPLENTE": "2ª suplente de senador",
    "DEPUTADO FEDERAL": "deputada federal",
    "DEPUTADO ESTADUAL": "deputada estadual",
    "DEPUTADO DISTRITAL": "deputada distrital",
}


def ler(path):
    raw = open(path, "rb").read()
    rows = list(csv.DictReader(raw.decode("latin1").splitlines(), delimiter=";"))
    return rows, hashlib.sha256(raw).hexdigest(), f'{rows[0]["DT_GERACAO"]} {rows[0]["HH_GERACAO"]}'


def ocupacao(ds):
    """Rótulo do TSE na forma feminina (o TSE grava o par, "ADVOGADA/ADVOGADO")."""
    if not ds or ds == "#NULO#":
        return None
    return E.titulo(ds.split("/")[0]).capitalize() if "/" in ds else E.titulo(ds).capitalize()


ORDEM_RESULTADO = ["candidatura sem votação válida", "não eleita", "suplente", "foi ao 2º turno", "eleita"]


def peso(r):
    """Turno mais alto primeiro; no mesmo turno, o registro com resultado válido
    (a mesma pessoa pode ter um registro inapto e outro apto no arquivo)."""
    return (int(r["NR_TURNO"]), ORDEM_RESULTADO.index(resultado_2022(r["DS_SIT_TOT_TURNO"])))


def resultado_2022(sit):
    if sit.startswith("ELEITO"):
        return "eleita"
    if sit == "SUPLENTE":
        return "suplente"
    if sit == "NÃO ELEITO":
        return "não eleita"
    if sit == "2º TURNO":
        return "foi ao 2º turno"
    return "candidatura sem votação válida"  # indeferida, renúncia, cancelada, #NULO


def main(path26, path22):
    rows26, sha26, ger26 = ler(path26)
    rows22, sha22, ger22 = ler(path22)

    # mesma seleção e mesmos slugs de eleitas_2026.py
    vistos, eleitas = set(), []
    for r in rows26:
        chave = (r["NR_TURNO"], r["SQ_CANDIDATO"])
        if chave in vistos:
            continue
        vistos.add(chave)
        if r["DS_GENERO"] != "FEMININO" or r["DS_CARGO"] not in E.CARGOS:
            continue
        if not r["DS_SIT_TOT_TURNO"].startswith("ELEITO"):
            continue
        if r["DS_CARGO"] != "GOVERNADOR" and r["NR_TURNO"] != "1":
            continue
        eleitas.append(r)

    # 2022: última situação de cada candidatura, por CPF (só em memória)
    por_cpf = {}
    for r in rows22:
        cpf = r["NR_CPF_CANDIDATO"]
        if not cpf or set(cpf) <= {"0", "-"}:
            continue
        atual = por_cpf.get(cpf)
        if atual is None or peso(r) > peso(atual):
            por_cpf[cpf] = r

    out, usados = {}, set()
    cont = {"eleita": 0, "suplente": 0, "não eleita": 0, "foi ao 2º turno": 0, "candidatura sem votação válida": 0, "não disputou": 0}
    for r in sorted(eleitas, key=lambda r: (list(E.CARGOS).index(r["DS_CARGO"]), r["SG_UF"], r["NM_URNA_CANDIDATO"])):
        cargo = E.CARGOS[r["DS_CARGO"]]
        nome = E.titulo(r["NM_URNA_CANDIDATO"])
        base = E.slug(f'{nome}-{r["SG_UF"]}')
        s = base if base not in usados else E.slug(f"{base}-{cargo}")
        usados.add(s)
        p = por_cpf.get(r["NR_CPF_CANDIDATO"])
        em2022 = None
        if p is not None:
            em2022 = {
                "cargo": CARGO_2022.get(p["DS_CARGO"], p["DS_CARGO"].lower()),
                "uf": p["SG_UF"] if p["SG_UF"] != "BR" else "Brasil",
                "partido": p["SG_PARTIDO"],
                "resultado": resultado_2022(p["DS_SIT_TOT_TURNO"]),
            }
            cont[em2022["resultado"]] += 1
        else:
            cont["não disputou"] += 1
        out[s] = {
            "ocupacao": ocupacao(r["DS_OCUPACAO"]),
            "instrucao": r["DS_GRAU_INSTRUCAO"].capitalize() if r["DS_GRAU_INSTRUCAO"] and r["DS_GRAU_INSTRUCAO"] != "#NULO#" else None,
            "em2022": em2022,
        }

    ts = [
        "/**",
        " * eleitas-trajetoria-2026 — trajetória registrada no TSE de cada eleita de",
        " * 2026: ocupação e escolaridade declaradas em 2026 e o resultado na eleição",
        " * geral de 2022. GERADO por scripts/recontagem/eleitas_trajetoria_2026.py;",
        " * não editar à mão.",
        f" * Fontes: TSE, consulta_cand_2026_BRASIL.csv gerado em {ger26}, SHA-256 {sha26};",
        f" * TSE, consulta_cand_2022_BRASIL.csv gerado em {ger22}, SHA-256 {sha22}.",
        " * Junção por CPF feita só em memória; o CPF não é gravado. `em2022: null` =",
        " * não aparece entre as candidaturas da eleição geral de 2022 (eleições",
        " * municipais não estão nesta base).",
        " */",
        "export type Trajetoria2022 = { cargo: string; uf: string; partido: string; resultado: string };",
        "export type TrajetoriaEleita = { ocupacao: string | null; instrucao: string | null; em2022: Trajetoria2022 | null };",
        f'export const TRAJETORIA_META = {{ base2026: "{ger26}", sha2026: "{sha26}", base2022: "{ger22}", sha2022: "{sha22}", contagem2022: {json.dumps(cont, ensure_ascii=False)} }} as const;',
        "export const TRAJETORIA_ELEITAS: Readonly<Record<string, TrajetoriaEleita>> = "
        + json.dumps(out, ensure_ascii=False, indent=0)
        + ";",
        "",
    ]
    open("src/data/eleitas-trajetoria-2026.ts", "w", encoding="utf-8").write("\n".join(ts))
    print(json.dumps({"total": len(out), "contagem2022": cont, "base2022": ger22}, ensure_ascii=False))


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
