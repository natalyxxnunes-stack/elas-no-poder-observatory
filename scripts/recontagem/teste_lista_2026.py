#!/usr/bin/env python3
"""
Teste da hipótese registrada em 30/10/2026 (perfil de Lélia Gonzalez): "a
posição de uma mulher negra dentro da lista do partido pode pesar tanto
quanto o total de votos que ela recebe".

REGRA FIXADA EM 04/11/2026, ANTES DE RODAR (não mudar depois de ver o número):
- Universo: candidaturas a deputado federal, estadual e distrital, 1º turno de
  2026, com resultado de totalização (eleito, suplente ou não eleito).
- Votos: QT_VOTOS_NOMINAIS_VALIDOS somados por SQ_CANDIDATO.
- Piso de cada disputa (UF × cargo): a menor votação nominal entre as pessoas
  eleitas naquela disputa.
- "Com votos de eleita": candidatura com votos >= piso da sua disputa.
- Indicador: entre as candidaturas com votos de eleita, a fatia que ficou de
  fora (não eleita), por grupo: homens brancos, mulheres brancas, pardas,
  pretas (pretas e pardas sempre separadas; homens pardos e pretos também).
- Leitura combinada antes:
  * confirmada se a fatia de fora de mulheres pretas E de pardas for 5 pontos
    ou mais acima da dos homens brancos, com 20 ou mais casos em cada grupo;
  * não confirmada se as duas ficarem a menos de 5 pontos ou abaixo;
  * inconclusiva se algum grupo tiver menos de 20 casos ou se os dois grupos
    apontarem em sentidos diferentes.
- O que o teste mede: se, com a mesma votação de quem se elegeu, o partido em
  que a candidatura está (a força da lista) deixou o grupo de fora mais vezes.
  Não mede por que a candidatura está naquele partido.

Uso:
    python3 -I scripts/recontagem/teste_lista_2026.py votacao_candidato_munzona_2026.zip consulta_cand_2026_BRASIL.csv
"""
import csv
import hashlib
import io
import json
import sys
import zipfile
from collections import Counter, defaultdict

CARGOS = {"DEPUTADO FEDERAL", "DEPUTADO ESTADUAL", "DEPUTADO DISTRITAL"}
MIN_N = 20
LIMIAR = 5.0


def grupo(genero, raca):
    g = "mulheres" if genero == "FEMININO" else "homens"
    r = {"BRANCA": "brancas" if g == "mulheres" else "brancos", "PARDA": "pardas" if g == "mulheres" else "pardos", "PRETA": "pretas" if g == "mulheres" else "pretos"}.get(raca)
    return f"{g} {r}" if r else None


def sha(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for b in iter(lambda: f.read(1 << 20), b""):
            h.update(b)
    return h.hexdigest()


def main(zip_path, cand_path):
    cand = {}
    for r in csv.DictReader(open(cand_path, encoding="latin1"), delimiter=";"):
        if r["NR_TURNO"] == "1" and r["DS_CARGO"] in CARGOS:
            sit = r["DS_SIT_TOT_TURNO"]
            if sit.startswith("ELEITO") or sit in ("SUPLENTE", "NÃO ELEITO"):
                cand[r["SQ_CANDIDATO"]] = (r["SG_UF"], r["DS_CARGO"], r["DS_GENERO"], r["DS_COR_RACA"], sit.startswith("ELEITO"))
    votos = Counter()
    gerado = None
    with zipfile.ZipFile(zip_path) as z:
        nome = next(n for n in z.namelist() if n.endswith("_BRASIL.csv"))
        with z.open(nome) as fh:
            for r in csv.DictReader(io.TextIOWrapper(fh, encoding="latin1"), delimiter=";"):
                gerado = gerado or f'{r["DT_GERACAO"]} {r["HH_GERACAO"]}'
                if r["NR_TURNO"] == "1" and r["SQ_CANDIDATO"] in cand:
                    votos[r["SQ_CANDIDATO"]] += int(r["QT_VOTOS_NOMINAIS_VALIDOS"] or 0)

    piso = {}
    for sq, (uf, cargo, *_rest, eleito) in cand.items():
        if eleito:
            k = (uf, cargo)
            piso[k] = min(piso.get(k, 10**12), votos[sq])

    total_grupo = Counter()
    com_voto = defaultdict(lambda: [0, 0])  # grupo -> [com votos de eleita, ficaram de fora]
    for sq, (uf, cargo, genero, raca, eleito) in cand.items():
        g = grupo(genero, raca)
        if not g or (uf, cargo) not in piso:
            continue
        total_grupo[g] += 1  # descritivo: candidaturas do grupo no universo do teste
        if votos[sq] >= piso[(uf, cargo)]:
            com_voto[g][0] += 1
            com_voto[g][1] += not eleito

    res = {g: {"candidaturas": total_grupo[g], "comVotosDeEleita": a, "deFora": b, "pctDeFora": round(100 * b / a, 1) if a else None} for g, (a, b) in sorted(com_voto.items())}
    hb = res.get("homens brancos", {}).get("pctDeFora")
    pr, pa = res.get("mulheres pretas", {}), res.get("mulheres pardas", {})
    if min(pr.get("comVotosDeEleita", 0), pa.get("comVotosDeEleita", 0), res.get("homens brancos", {}).get("comVotosDeEleita", 0)) < MIN_N:
        desfecho = "inconclusiva"
    else:
        dpr, dpa = pr["pctDeFora"] - hb, pa["pctDeFora"] - hb
        if dpr >= LIMIAR and dpa >= LIMIAR:
            desfecho = "confirmada"
        elif dpr < LIMIAR and dpa < LIMIAR:
            desfecho = "nao-confirmada"
        else:
            desfecho = "inconclusiva"
    out = {
        "regraFixadaEm": "04/11/2026",
        "baseVotos": gerado,
        "zipVotosSha256": sha(zip_path),
        "candCsvSha256": sha(cand_path),
        "disputas": len(piso),
        "grupos": res,
        "desfecho": desfecho,
    }
    print(json.dumps(out, ensure_ascii=False, indent=1))


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
