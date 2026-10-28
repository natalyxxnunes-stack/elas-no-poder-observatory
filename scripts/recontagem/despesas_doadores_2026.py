#!/usr/bin/env python3
"""
Dinheiro, fase 2: despesas contratadas, despesas pagas e doador originário
(financiamento coletivo), por gênero e cor/raça.

Uso:
    python3 -I scripts/recontagem/despesas_doadores_2026.py PASTA consulta_cand_2026_BRASIL.csv

PASTA contém, extraídos de prestacao_de_contas_eleitorais_candidatos_2026.zip:
despesas_contratadas_candidatos_2026_BRASIL.csv,
despesas_pagas_candidatos_2026_BRASIL.csv,
receitas_candidatos_2026_BRASIL.csv e
receitas_candidatos_doador_originario_2026_BRASIL.csv.

Regras:
- linhas idênticas em todas as colunas entram uma vez;
- despesas contratadas: VR_DESPESA_CONTRATADA por SQ_CANDIDATO e DS_ORIGEM_DESPESA;
- despesas pagas: VR_PAGTO_DESPESA por DS_FONTE_DESPESA; ligadas à candidatura
  pelo SQ_PRESTADOR_CONTAS, que é o mesmo das despesas contratadas e das receitas;
- doador originário: cada linha é a pessoa que doou por financiamento coletivo,
  ligada à receita da candidatura por SQ_RECEITA;
- universos proporcional e majoritário (titulares), cor/raça nas categorias
  originais; nada é estimado.
"""
import csv
import hashlib
import json
import os
import statistics
import sys
from collections import Counter, defaultdict

PROP = ("DEPUTADO FEDERAL", "DEPUTADO ESTADUAL", "DEPUTADO DISTRITAL")
MAJ = ("PRESIDENTE", "GOVERNADOR", "SENADOR")


def rows(path):
    seen = set()
    with open(path, encoding="latin1", newline="") as fh:
        reader = csv.reader(fh, delimiter=";")
        header = next(reader)
        for vals in reader:
            key = hash(tuple(vals))
            if key in seen:
                continue
            seen.add(key)
            yield dict(zip(header, vals))


def sha(path):
    h = hashlib.sha256()
    with open(path, "rb") as fh:
        for chunk in iter(lambda: fh.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


money = lambda s: float(s.replace(".", "").replace(",", ".")) if s else 0.0


def main(folder, cand_path):
    reg = {}
    for r in csv.DictReader(open(cand_path, encoding="latin1"), delimiter=";"):
        if r["NR_TURNO"] == "1" and r["SQ_CANDIDATO"] not in reg:
            reg[r["SQ_CANDIDATO"]] = r
    uni = lambda c: "proporcional" if c in PROP else "majoritario" if c in MAJ else None
    files = {
        "contratadas": os.path.join(folder, "despesas_contratadas_candidatos_2026_BRASIL.csv"),
        "pagas": os.path.join(folder, "despesas_pagas_candidatos_2026_BRASIL.csv"),
        "receitas": os.path.join(folder, "receitas_candidatos_2026_BRASIL.csv"),
        "doador": os.path.join(folder, "receitas_candidatos_doador_originario_2026_BRASIL.csv"),
    }
    out = {"sha256": {k: sha(v) for k, v in files.items()}}

    prestador = {}
    contratado = defaultdict(lambda: defaultdict(float))
    for r in rows(files["contratadas"]):
        prestador[r["SQ_PRESTADOR_CONTAS"]] = r["SQ_CANDIDATO"]
        contratado[r["SQ_CANDIDATO"]][r["DS_ORIGEM_DESPESA"]] += money(r["VR_DESPESA_CONTRATADA"])

    receita_cand, crowd = {}, defaultdict(float)
    for r in rows(files["receitas"]):
        prestador.setdefault(r["SQ_PRESTADOR_CONTAS"], r["SQ_CANDIDATO"])
        receita_cand[r["SQ_RECEITA"]] = r["SQ_CANDIDATO"]
        if r["DS_ORIGEM_RECEITA"] == "Recursos de Financiamento Coletivo":
            crowd[r["SQ_CANDIDATO"]] += money(r["VR_RECEITA"])

    pago = defaultdict(lambda: defaultdict(float))
    sem_prestador = 0.0
    for r in rows(files["pagas"]):
        sq = prestador.get(r["SQ_PRESTADOR_CONTAS"])
        if not sq:
            sem_prestador += money(r["VR_PAGTO_DESPESA"])
            continue
        pago[sq][r["DS_FONTE_DESPESA"]] += money(r["VR_PAGTO_DESPESA"])

    doadores = defaultdict(set)
    doado = defaultdict(float)
    doador_sem_receita = 0
    for r in rows(files["doador"]):
        sq = receita_cand.get(r["SQ_RECEITA"])
        if not sq:
            doador_sem_receita += 1
            continue
        doadores[sq].add(r["NR_CPF_CNPJ_DOADOR_ORIGINARIO"])
        doado[sq] += money(r["VR_RECEITA"])

    for uid in ("proporcional", "majoritario"):
        cands = [r for r in reg.values() if uni(r["DS_CARGO"]) == uid]
        g = {}
        for gen in ("FEMININO", "MASCULINO"):
            cg = [r for r in cands if r["DS_GENERO"] == gen]
            cat = defaultdict(float)
            for r in cg:
                for k, v in contratado.get(r["SQ_CANDIDATO"], {}).items():
                    cat[k] += v
            fonte = defaultdict(float)
            for r in cg:
                for k, v in pago.get(r["SQ_CANDIDATO"], {}).items():
                    fonte[k] += v
            byrace = {}
            for race in ("BRANCA", "PARDA", "PRETA", "INDÍGENA", "AMARELA"):
                cr = [r for r in cg if r["DS_COR_RACA"] == race]
                usam = [r for r in cr if crowd.get(r["SQ_CANDIDATO"], 0) > 0]
                fr = defaultdict(float)
                for r in cr:
                    for k, v in pago.get(r["SQ_CANDIDATO"], {}).items():
                        fr[k] += v
                byrace[race] = {
                    "candidaturas": len(cr),
                    "pagoPorFonte": {k: round(v, 2) for k, v in fr.items()},
                    "comVaquinha": len(usam),
                    "vaquinhaTotal": round(sum(crowd[r["SQ_CANDIDATO"]] for r in usam), 2),
                    "vaquinhaMediana": round(statistics.median(crowd[r["SQ_CANDIDATO"]] for r in usam), 2) if usam else 0,
                    "doadoresMediana": statistics.median(len(doadores[r["SQ_CANDIDATO"]]) for r in usam) if usam else 0,
                }
            usam = [r for r in cg if crowd.get(r["SQ_CANDIDATO"], 0) > 0]
            g[gen] = {
                "candidaturas": len(cg),
                "contratadoTotal": round(sum(cat.values()), 2),
                "contratadoPorTipo": {k: round(v, 2) for k, v in sorted(cat.items(), key=lambda kv: -kv[1])},
                "pagoPorFonte": {k: round(v, 2) for k, v in sorted(fonte.items(), key=lambda kv: -kv[1])},
                "comVaquinha": len(usam),
                "vaquinhaTotal": round(sum(crowd[r["SQ_CANDIDATO"]] for r in usam), 2),
                "vaquinhaMediana": round(statistics.median(crowd[r["SQ_CANDIDATO"]] for r in usam), 2) if usam else 0,
                "doadoresMediana": statistics.median(len(doadores[r["SQ_CANDIDATO"]]) for r in usam) if usam else 0,
                "doadoresDistintos": len(set().union(*(doadores[r["SQ_CANDIDATO"]] for r in cg))) if cg else 0,
                "porRaca": byrace,
            }
        out[uid] = g
    out["auditoria"] = {"pagoSemPrestador": round(sem_prestador, 2), "doadorSemReceita": doador_sem_receita}
    json.dump(out, sys.stdout, ensure_ascii=False, indent=1)
    print()


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
