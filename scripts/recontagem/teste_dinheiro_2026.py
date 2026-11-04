#!/usr/bin/env python3
"""
Teste de três hipóteses registradas no site, com a prestação de contas final
do 1º turno de 2026.

REGRAS FIXADAS EM 04/11/2026, ANTES DE RODAR (não mudar depois de ver o
número). Regras comuns:
- universo proporcional: deputado federal, estadual e distrital, 1º turno,
  candidaturas com resultado de totalização (eleito, suplente, não eleito);
- receita: soma de VR_RECEITA por SQ_CANDIDATO, linhas idênticas contadas uma
  vez; fundo eleitoral: só DS_FONTE_RECEITA = "FUNDO ESPECIAL";
- votos: QT_VOTOS_NOMINAIS_VALIDOS por SQ_CANDIDATO, 1º turno;
- cor/raça: pretas e pardas sempre separadas.

H-QUEM-CHEGA (14/10): "parte da diferença entre candidatas e eleitas
acompanha a distribuição de dinheiro de campanha e de votos entre os grupos".
- Entre as mulheres do universo proporcional, para brancas, pardas e pretas:
  fatia das candidaturas (C), da receita (R), dos votos (V) e das eleitas (E).
- Confirmada se, nos três grupos, R e V se afastam de C no mesmo sentido em
  que E se afasta de C (acima para quem ganha fatia, abaixo para quem perde).
- Não confirmada se em nenhum grupo; inconclusiva nos demais casos.

H-FUNIL (14/10): "a queda da fatia de mulheres entre candidaturas e cadeiras
passa pelo voto, pelo quociente partidário e pelo dinheiro".
- Fatias de mulheres no universo proporcional: candidaturas (C), receita (R),
  votos (V), cadeiras (S).
- Três condições: (1) a maior queda é a do voto: C − V >= 2 × (V − S);
  (2) o dinheiro já cai antes do voto: R < C; (3) mulheres convertem dinheiro
  em voto como homens: (votos por real das mulheres) ÷ (votos por real dos
  homens) entre 0,85 e 1,15.
- Confirmada se as três; não confirmada se nenhuma; inconclusiva nos demais.

H-REELEICAO (27/10): "parte da relação entre receita e reeleição corre ao
contrário: quem já tinha base e chance de vencer atrai mais dinheiro".
- Universo: pessoas eleitas deputadas/os federais em 2022 com candidatura a
  deputado federal em 2026 (ligação pelo CPF, só em memória). Aproxima o
  universo de Como votaram (quem estava no mandato), que inclui suplentes.
- Força prévia F = votos de 2022 ÷ menor votação de eleito na mesma UF em 2022.
- (a) Spearman entre F e o fundo eleitoral recebido em 2026: sustenta
  "chance atrai dinheiro" se rho >= 0,30.
- (b) G0 = taxa de reeleição do terço de maior receita menos a do terço de
  menor receita (terços sobre o universo todo). G1 = média, ponderada pelo
  número de pessoas, da mesma diferença dentro de cada terço de F. Sustenta
  "parte corre ao contrário" se G1 <= 2/3 de G0.
- Confirmada se (a) e (b); não confirmada se nenhuma; inconclusiva se uma.

Uso:
    python3 -I scripts/recontagem/teste_dinheiro_2026.py \
      receitas_candidatos_2026_BRASIL.csv consulta_cand_2026_BRASIL.csv votacao_candidato_munzona_2026.zip \
      consulta_cand_2022_BRASIL.csv votacao_candidato_munzona_2022.zip
"""
import csv
import hashlib
import io
import json
import re
import sys
import zipfile
from collections import Counter, defaultdict

PROP = {"DEPUTADO FEDERAL", "DEPUTADO ESTADUAL", "DEPUTADO DISTRITAL"}
RACAS = ["BRANCA", "PARDA", "PRETA"]
cpf = lambda c: re.sub(r"\D", "", c or "").zfill(11)
money = lambda s: float(s.replace(".", "").replace(",", ".")) if s else 0.0


def sha(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for b in iter(lambda: f.read(1 << 20), b""):
            h.update(b)
    return h.hexdigest()


def candidaturas(path, cargos):
    out = {}
    for r in csv.DictReader(open(path, encoding="latin1"), delimiter=";"):
        if r["NR_TURNO"] != "1" or r["DS_CARGO"] not in cargos:
            continue
        sit = r["DS_SIT_TOT_TURNO"]
        if sit.startswith("ELEITO") or sit in ("SUPLENTE", "NÃO ELEITO"):
            out[r["SQ_CANDIDATO"]] = r
    return out


def votos_zip(path, sqs):
    v = Counter()
    gerado = None
    with zipfile.ZipFile(path) as z:
        nome = next(n for n in z.namelist() if n.endswith("_BRASIL.csv"))
        with z.open(nome) as fh:
            for r in csv.DictReader(io.TextIOWrapper(fh, encoding="latin1"), delimiter=";"):
                gerado = gerado or f'{r["DT_GERACAO"]} {r["HH_GERACAO"]}'
                if r["NR_TURNO"] == "1" and r["SQ_CANDIDATO"] in sqs:
                    v[r["SQ_CANDIDATO"]] += int(r["QT_VOTOS_NOMINAIS_VALIDOS"] or 0)
    return v, gerado


def receitas(path):
    rec, fefc, vistos = defaultdict(float), defaultdict(float), set()
    with open(path, encoding="latin1") as f:
        cab = next(csv.reader([f.readline()], delimiter=";"))
        for linha in f:
            if linha in vistos:
                continue
            vistos.add(linha)
            r = dict(zip(cab, next(csv.reader([linha], delimiter=";"))))
            val = money(r["VR_RECEITA"])
            rec[r["SQ_CANDIDATO"]] += val
            if r["DS_FONTE_RECEITA"] == "FUNDO ESPECIAL":
                fefc[r["SQ_CANDIDATO"]] += val
    return rec, fefc


def rank(xs):
    ordem = sorted(range(len(xs)), key=lambda i: xs[i])
    r = [0.0] * len(xs)
    i = 0
    while i < len(ordem):
        j = i
        while j + 1 < len(ordem) and xs[ordem[j + 1]] == xs[ordem[i]]:
            j += 1
        for k in range(i, j + 1):
            r[ordem[k]] = (i + j) / 2 + 1
        i = j + 1
    return r


def spearman(a, b):
    ra, rb = rank(a), rank(b)
    n = len(a)
    ma, mb = sum(ra) / n, sum(rb) / n
    cov = sum((x - ma) * (y - mb) for x, y in zip(ra, rb))
    va = sum((x - ma) ** 2 for x in ra) ** 0.5
    vb = sum((y - mb) ** 2 for y in rb) ** 0.5
    return cov / (va * vb)


def tercos(vals):
    s = sorted(vals)
    n = len(s)
    c1, c2 = s[n // 3], s[2 * n // 3]
    return lambda x: 0 if x < c1 else (1 if x < c2 else 2)


def desfecho(conds):
    return "confirmada" if all(conds) else ("nao-confirmada" if not any(conds) else "inconclusiva")


def main(rec_path, cand26, vot26, cand22, vot22):
    c26 = candidaturas(cand26, PROP)
    v26, base_v26 = votos_zip(vot26, set(c26))
    rec, fefc = receitas(rec_path)
    pct = lambda a, b: round(100 * a / b, 2) if b else None

    # ---- H-QUEM-CHEGA e H-FUNIL
    agg = defaultdict(lambda: Counter())
    for sq, r in c26.items():
        fem = r["DS_GENERO"] == "FEMININO"
        el = r["DS_SIT_TOT_TURNO"].startswith("ELEITO")
        for chave in (("todos",), ("fem" if fem else "masc",)) + ((("fem", r["DS_COR_RACA"]),) if fem else ()):
            a = agg[chave]
            a["c"] += 1
            a["r"] += rec.get(sq, 0.0)
            a["v"] += v26[sq]
            a["e"] += el
    F, T, M = agg[("fem",)], agg[("todos",)], agg[("masc",)]
    grupos = {}
    conds_qc = []
    for raca in RACAS:
        g = agg[("fem", raca)]
        C, R, V, E = (pct(g[k], F[k]) for k in ("c", "r", "v", "e"))
        sentido = (E > C) - (E < C)
        acompanha = ((R > C) - (R < C)) == sentido and ((V > C) - (V < C)) == sentido and sentido != 0
        grupos[raca] = {"candidaturas": C, "receita": R, "votos": V, "eleitas": E, "acompanha": acompanha}
        conds_qc.append(acompanha)
    quem_chega = {"fatiasEntreMulheres": grupos, "desfecho": desfecho(conds_qc)}

    C, R, V, S = (pct(F[k], T[k]) for k in ("c", "r", "v", "e"))
    vpr_f, vpr_m = F["v"] / F["r"], M["v"] / M["r"]
    razao = vpr_f / vpr_m
    c1 = (C - V) >= 2 * (V - S)
    c2 = R < C
    c3 = 0.85 <= razao <= 1.15
    funil = {
        "fatiasMulheres": {"candidaturas": C, "receita": R, "votos": V, "cadeiras": S},
        "votosPorMilReais": {"mulheres": round(1000 * vpr_f, 2), "homens": round(1000 * vpr_m, 2), "razao": round(razao, 3)},
        "condicoes": {"maiorQuedaNoVoto": c1, "dinheiroCaiAntes": c2, "conversaoParecida": c3},
        "desfecho": desfecho([c1, c2, c3]),
    }

    # ---- H-REELEICAO
    c22 = candidaturas(cand22, {"DEPUTADO FEDERAL"})
    v22, base_v22 = votos_zip(vot22, set(c22))
    piso22 = {}
    for sq, r in c22.items():
        if r["DS_SIT_TOT_TURNO"].startswith("ELEITO"):
            piso22[r["SG_UF"]] = min(piso22.get(r["SG_UF"], 10**12), v22[sq])
    forca = {}
    for sq, r in c22.items():
        if r["DS_SIT_TOT_TURNO"].startswith("ELEITO") and piso22.get(r["SG_UF"]):
            forca[cpf(r["NR_CPF_CANDIDATO"])] = v22[sq] / piso22[r["SG_UF"]]
    pessoas = []
    for sq, r in c26.items():
        if r["DS_CARGO"] != "DEPUTADO FEDERAL":
            continue
        k = cpf(r["NR_CPF_CANDIDATO"])
        if k in forca:
            pessoas.append({"f": forca[k], "fefc": fefc.get(sq, 0.0), "rec": rec.get(sq, 0.0), "el": r["DS_SIT_TOT_TURNO"].startswith("ELEITO"), "fem": r["DS_GENERO"] == "FEMININO"})
    rho = spearman([p["f"] for p in pessoas], [p["fefc"] for p in pessoas])
    t_rec = tercos([p["rec"] for p in pessoas])
    t_f = tercos([p["f"] for p in pessoas])

    def gap(ps):
        alto = [p["el"] for p in ps if t_rec(p["rec"]) == 2]
        baixo = [p["el"] for p in ps if t_rec(p["rec"]) == 0]
        if not alto or not baixo:
            return None, len(ps)
        return 100 * (sum(alto) / len(alto) - sum(baixo) / len(baixo)), len(ps)

    g0, _ = gap(pessoas)
    estratos = [gap([p for p in pessoas if t_f(p["f"]) == t]) for t in range(3)]
    validos = [(g, n) for g, n in estratos if g is not None]
    g1 = sum(g * n for g, n in validos) / sum(n for _, n in validos)
    ca, cb = rho >= 0.30, g1 <= (2 / 3) * g0
    reeleicao = {
        "pessoas": len(pessoas),
        "mulheres": sum(p["fem"] for p in pessoas),
        "spearmanForcaFundo": round(rho, 3),
        "gapBrutoPontos": round(g0, 1),
        "gapDentroDaForcaPontos": round(g1, 1),
        "gapPorTercoDeForca": [None if g is None else round(g, 1) for g, _ in estratos],
        "condicoes": {"chanceAtraiDinheiro": ca, "gapEncolhe": cb},
        "desfecho": desfecho([ca, cb]),
    }

    print(
        json.dumps(
            {
                "regraFixadaEm": "04/11/2026",
                "bases": {
                    "receitas": sha(rec_path),
                    "cand2026": sha(cand26),
                    "votos2026": {"sha256": sha(vot26), "gerado": base_v26},
                    "cand2022": sha(cand22),
                    "votos2022": {"sha256": sha(vot22), "gerado": base_v22},
                },
                "quemChega": quem_chega,
                "funil": funil,
                "reeleicao": reeleicao,
            },
            ensure_ascii=False,
            indent=1,
        )
    )


if __name__ == "__main__":
    main(*sys.argv[1:6])
