#!/usr/bin/env python3
"""
Recontagem independente do resultado de 2026 a partir do arquivo oficial do TSE.

Uso:
    python3 scripts/recontagem/resultado_2026.py caminho/consulta_cand_2026_BRASIL.csv [--turno 1|2]

Lê o CSV (latin1, separador ';'), deduplica por SQ_CANDIDATO dentro do turno
pedido e imprime um JSON com os números usados em src/data/resultado-2026.ts.
Nada é estimado: tudo sai da contagem das linhas do arquivo.

Regras (as mesmas do site):
- Eleitas/eleitos = DS_SIT_TOT_TURNO começando com "ELEITO"
  (ELEITO, ELEITO POR QP, ELEITO POR MÉDIA). "2º TURNO" não conta como eleita.
- Proporcional = Deputado Federal + Deputado Estadual + Deputado Distrital.
- Cor/raça sempre nas categorias originais de DS_COR_RACA, sem somar grupos.
- Vices e suplentes ficam fora: são eleitos na chapa, não por voto próprio.

Para o 2º turno (25/10), rode com --turno 2: o arquivo traz linhas com
NR_TURNO = 2 para Governador e Presidente.
"""
import csv
import hashlib
import json
import sys
from collections import Counter, defaultdict

PROP = {"DEPUTADO FEDERAL": "federal", "DEPUTADO ESTADUAL": "estadual", "DEPUTADO DISTRITAL": "distrital"}


def is_elected(r):
    return r["DS_SIT_TOT_TURNO"].startswith("ELEITO")


def main(path, turno="1"):
    raw = open(path, "rb").read()
    sha = hashlib.sha256(raw).hexdigest()
    rows = list(csv.DictReader(raw.decode("latin1").splitlines(), delimiter=";"))
    gerado = f'{rows[0]["DT_GERACAO"]} {rows[0]["HH_GERACAO"]}'
    seen, data = set(), []
    for r in rows:
        if r["NR_TURNO"] != turno or r["SQ_CANDIDATO"] in seen:
            continue
        seen.add(r["SQ_CANDIDATO"])
        data.append(r)

    fem = lambda r: r["DS_GENERO"] == "FEMININO"
    out = {"brasilCsvSha256": sha, "baseGeneratedAt": gerado, "turno": turno, "linhasNoTurno": len(data)}

    # Proporcional
    prop = [r for r in data if r["DS_CARGO"] in PROP]
    if prop:
        el = [r for r in prop if is_elected(r)]
        byc = {}
        for cargo, key in PROP.items():
            c = [r for r in prop if r["DS_CARGO"] == cargo]
            e = [r for r in c if is_elected(r)]
            byc[key] = {
                "seats": len(e),
                "feminine": sum(map(fem, e)),
                "candidacies": len(c),
                "feminineCandidacies": sum(map(fem, c)),
                "electedRaceFeminine": dict(Counter(r["DS_COR_RACA"] for r in e if fem(r))),
            }
        fed = [r for r in el if r["DS_CARGO"] == "DEPUTADO FEDERAL"]
        party_el = Counter(r["SG_PARTIDO"] for r in el)
        party_el_f = Counter(r["SG_PARTIDO"] for r in el if fem(r))
        party_race_f = defaultdict(Counter)
        for r in el:
            if fem(r):
                party_race_f[r["SG_PARTIDO"]][r["DS_COR_RACA"]] += 1
        uf_el = Counter(r["SG_UF"] for r in el)
        uf_el_f = Counter(r["SG_UF"] for r in el if fem(r))
        out["proporcional"] = {
            "candidacies": {"total": len(prop), "feminine": sum(map(fem, prop)), "masculine": sum(r["DS_GENERO"] == "MASCULINO" for r in prop)},
            "candidacyRaceFeminine": dict(Counter(r["DS_COR_RACA"] for r in prop if fem(r))),
            "candidacyRaceAll": dict(Counter(r["DS_COR_RACA"] for r in prop)),
            "seats": len(el),
            "elected": {"feminine": sum(map(fem, el)), "masculine": sum(r["DS_GENERO"] == "MASCULINO" for r in el)},
            "electedRaceFeminine": dict(Counter(r["DS_COR_RACA"] for r in el if fem(r))),
            "electedRaceAll": dict(Counter(r["DS_COR_RACA"] for r in el)),
            "byCargo": byc,
            "federalFeminineByUf": dict(sorted(Counter(r["SG_UF"] for r in fed if fem(r)).items())),
            "federalSeatsByUf": dict(sorted(Counter(r["SG_UF"] for r in fed).items())),
            "electedByUf": dict(sorted(uf_el.items())),
            "electedFeminineByUf": {uf: uf_el_f.get(uf, 0) for uf in sorted(uf_el)},
            "electedByParty": dict(party_el.most_common()),
            "electedFeminineByParty": {p: party_el_f.get(p, 0) for p, _ in party_el.most_common()},
            "electedRaceFeminineByParty": {p: dict(c) for p, c in sorted(party_race_f.items())},
        }

    # Senado
    sen = [r for r in data if r["DS_CARGO"] == "SENADOR"]
    if sen:
        e = [r for r in sen if is_elected(r)]
        out["senado"] = {
            "seats": len(e),
            "electedFeminine": sum(map(fem, e)),
            "candidacies": len(sen),
            "feminineCandidacies": sum(map(fem, sen)),
            "electedRaceFeminine": dict(Counter(r["DS_COR_RACA"] for r in e if fem(r))),
            "candidacyRaceFeminine": dict(Counter(r["DS_COR_RACA"] for r in sen if fem(r))),
            "electedFeminineByParty": dict(Counter(r["SG_PARTIDO"] for r in e if fem(r)).most_common()),
        }

    # Governo
    gov = [r for r in data if r["DS_CARGO"] == "GOVERNADOR"]
    if gov:
        e = [r for r in gov if is_elected(r)]
        run = [r for r in gov if r["DS_SIT_TOT_TURNO"] == "2º TURNO"]
        out["governo"] = {
            "candidacies": len(gov),
            "feminineCandidacies": sum(map(fem, gov)),
            "decided": len(e),
            "electedFeminine": sum(map(fem, e)),
            "electedFeminineUfs": sorted(r["SG_UF"] for r in e if fem(r)),
            "runoffUfs": sorted({r["SG_UF"] for r in run}),
            "runoffCandidacies": len(run),
            "runoffFeminine": sum(map(fem, run)),
            "runoffFeminineUfs": sorted({r["SG_UF"] for r in run if fem(r)}),
        }

    # Presidência (sempre em número absoluto, nunca percentual: base < 20)
    pre = [r for r in data if r["DS_CARGO"] == "PRESIDENTE"]
    if pre:
        out["presidencia"] = {
            "registros": len(pre),
            "mulheres": sum(map(fem, pre)),
            "mulheresCorRaca": dict(Counter(r["DS_COR_RACA"] for r in pre if fem(r))),
            "eleitos": sum(map(is_elected, pre)),
            "segundoTurno": sum(r["DS_SIT_TOT_TURNO"] == "2º TURNO" for r in pre),
            "mulheresNoSegundoTurno": sum(fem(r) and r["DS_SIT_TOT_TURNO"] == "2º TURNO" for r in pre),
            "mulheresEleitas": sum(fem(r) and is_elected(r) for r in pre),
        }

    # Fora do universo (vices e suplentes)
    out["foraDoUniverso"] = {
        "byCargo": dict(Counter(r["DS_CARGO"] for r in data if r["DS_CARGO"] not in PROP and r["DS_CARGO"] not in ("SENADOR", "GOVERNADOR", "PRESIDENTE"))),
    }
    json.dump(out, sys.stdout, ensure_ascii=False, indent=1)
    print()


if __name__ == "__main__":
    args = sys.argv[1:]
    turno = "1"
    if "--turno" in args:
        i = args.index("--turno")
        turno = args[i + 1]
        del args[i : i + 2]
    main(args[0], turno)
