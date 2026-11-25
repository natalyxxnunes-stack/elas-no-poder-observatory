#!/usr/bin/env python3
"""Diagnóstico eleitoral por UF e despesas contratadas de segurança, sem dados individuais."""
import csv, json, hashlib, sys
from collections import Counter, defaultdict
from decimal import Decimal
from pathlib import Path

# Câmara: https://www2.camara.leg.br/a-camara/conheca/historia/numero-de-deputados-por-estado
# TSE Res. 23.677, art. 4, com redação 23.748/2026; CF art. 27; ADO 38.
FED=dict(AC=8,AL=9,AM=8,AP=8,BA=39,CE=22,DF=8,ES=10,GO=17,MA=18,MG=53,MS=8,MT=8,PA=17,PB=12,PE=25,PI=10,PR=30,RJ=46,RN=8,RO=8,RR=8,RS=31,SC=16,SE=8,SP=70,TO=8)
PROP={"DEPUTADO FEDERAL","DEPUTADO ESTADUAL","DEPUTADO DISTRITAL"}
MAJ={"PRESIDENTE","GOVERNADOR","SENADOR"}
TARGET="Segurança e prevenção, repressão e combate à violência política"
def rows(p):
    with p.open(encoding="latin1",newline="") as f:
        yield from csv.DictReader(f,delimiter=";")
def money(v):
    return Decimal(v.replace(".","").replace(",",".") or "0")
def main(folder, out):
    root=Path(folder); out=Path(out);out.mkdir(parents=True,exist_ok=True)
    cand={}; status={}; turn1=defaultdict(set); all_status=defaultdict(Counter)
    cpath=root/"consulta_cand_2026_BRASIL.csv"
    for r in rows(cpath):
        sq=r["SQ_CANDIDATO"]; turno=r["NR_TURNO"];cargo=r["DS_CARGO"]
        if cargo not in PROP|MAJ or turno not in ("1","2"):continue
        if turno=="1":
            cand.setdefault(sq, {k:r[k] for k in ("SG_UF","DS_CARGO","DS_GENERO","DS_COR_RACA","SG_PARTIDO")})
            turn1[sq].add(r["DS_SIT_TOT_TURNO"])
        if sq not in status or turno>status[sq][0]:status[sq]=(turno,r["DS_SIT_TOT_TURNO"])
    e=defaultdict(Counter)
    for sq,r in cand.items():
        s=status[sq][1]
        k=(r["SG_UF"],r["DS_CARGO"])
        all_status[k][s]+=1
        if s.startswith("ELEITO"):
            e[k]["eleitos"]+=1
            e[k]["mulheres"]+=r["DS_GENERO"]=="FEMININO"
    assert sum(FED.values())==513
    expected=[]
    for uf,n in sorted(FED.items()):
        for cargo,v in (("DEPUTADO FEDERAL",n),("DEPUTADO DISTRITAL" if uf=="DF" else "DEPUTADO ESTADUAL",3*n if n<=12 else n+24),("SENADOR",2),("GOVERNADOR",1)):
            k=(uf,cargo);x=e[k]
            expected.append({"uf":uf,"cargo":cargo,"esperado":v,"eleitos":x["eleitos"],"mulheres":x["mulheres"],"diferenca":x["eleitos"]-v,"situacoes":dict(all_status[k])})
    assert sum(x["esperado"] for x in expected if x["cargo"] in PROP)==1572
    # Reconciliação aritmética interna: não atribuir déficit a UF sem prova.
    nat={c:sum(v["eleitos"] for k,v in e.items() if k[1]==c) for c in sorted(PROP|MAJ)}
    assert all(sum(x["eleitos"] for x in expected if x["cargo"]==c)==nat[c] for c in PROP|{"SENADOR","GOVERNADOR"})
    election={"por_uf_cargo":expected,"nacional":nat,"divergencias":[x for x in expected if x["diferenca"]],"candidaturas_com_status_conflitante_no_1_turno":sum(len(v)>1 for v in turn1.values())}
    print("TOTALIZACAO_UF",json.dumps({"nacional":nat,"divergencias":election["divergencias"]},ensure_ascii=False))
    # Somente a classificação oficial exata; deduplicação integral e valores Decimal.
    totals=defaultdict(Decimal); lines=Counter(); seen=set(); date=None
    for r in rows(root/"despesas_contratadas_candidatos_2026_BRASIL.csv"):
        if r["DS_ORIGEM_DESPESA"]!=TARGET:continue
        date=date or r["DT_GERACAO"]+" "+r["HH_GERACAO"]
        h=hashlib.sha256(repr(tuple(r.items())).encode()).digest()
        if h in seen:continue
        seen.add(h)
        sq=r["SQ_CANDIDATO"];totals[sq]+=money(r["VR_DESPESA_CONTRATADA"]);lines[sq]+=1
    def aggregate(dim):
        group=defaultdict(list); denom=Counter()
        for sq,r in cand.items():
            u="proporcional" if r["DS_CARGO"] in PROP else "majoritario"
            k=(u,r["DS_GENERO"])+tuple(r[d] for d in dim)
            denom[k]+=1
            if sq in totals:group[k].append(sq)
        return [{"grupo":list(k),"candidaturas_universo":n,"com_lancamento":len(group[k]),"com_valor_liquido_positivo":sum(totals[s]>0 for s in group[k]),"linhas":sum(lines[s] for s in group[k]),"contratado":str(sum((totals[s] for s in group[k]),Decimal(0)).quantize(Decimal(".01")))} for k,n in sorted(denom.items())]
    security={"categoria":TARGET,"gerado_em":date,"por_universo_genero":aggregate([]),"por_raca":aggregate(["DS_COR_RACA"]),"por_partido":aggregate(["SG_PARTIDO"]),"por_uf":aggregate(["SG_UF"]),"por_cargo":aggregate(["DS_CARGO"]),"linhas_sem_vinculo_titular":sum(lines[s] for s in totals if s not in cand),"valor_sem_vinculo_titular":str(sum((totals[s] for s in totals if s not in cand),Decimal(0)))}
    print("SEGURANCA",json.dumps({"gerado_em":date,"por_universo_genero":security["por_universo_genero"],"linhas_sem_vinculo_titular":security["linhas_sem_vinculo_titular"]},ensure_ascii=False))
    for name,data in (("totalizacao-uf.json",election),("seguranca-politica.json",security)):
        (out/name).write_text(json.dumps(data,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
if __name__=="__main__":main(*sys.argv[1:])
