#!/usr/bin/env python3
"""Coleção Antigênero no poder (12/11/2026). Ver src/data/colecoes.ts."""
import json, re, sys, time, urllib.request
B="https://dadosabertos.camara.leg.br/api/v2"
def get(p):
    for i in range(6):
        try:
            return json.load(urllib.request.urlopen(urllib.request.Request(B+p,headers={"Accept":"application/json"}),timeout=90))
        except Exception as e:
            time.sleep(3+3*i)
    raise SystemExit("falhou "+p)
IG,CO="2351179-51","2482078-57"
ids={}
for vid,contra in ((IG,"Não"),(CO,"Sim")):
    for v in get(f"/votacoes/{vid}/votos")["dados"]:
        if v["tipoVoto"]==contra:
            d=v["deputado_"]; ids[d["id"]]=d["nome"]
# keep only women
fem={}
for i,n in ids.items():
    dd=get(f"/deputados/{i}")["dados"]
    if dd["sexo"]=="F": fem[i]={"nome":n,"cpf":dd["cpf"],"nomeCivil":dd["nomeCivil"]}
print("mulheres",len(fem),file=sys.stderr)
AUTO=re.compile(r"antifeminis|n[ãa]o sou feminista|n[ãa]o somos feministas",re.I)
FEM=re.compile(r"feminis",re.I)
achados=[]
for i,info in fem.items():
    page=1
    while True:
        r=get(f"/deputados/{i}/discursos?dataInicio=2023-02-01&dataFim=2026-11-12&itens=100&pagina={page}")
        for d in r["dados"]:
            t=d.get("transcricao") or ""
            if FEM.search(t):
                achados.append({"id":i,"nome":info["nome"],"data":d["dataHoraInicio"],"fase":(d.get("faseEvento") or {}).get("titulo"),"url":d.get("urlTexto"),"auto":bool(AUTO.search(t)),"transcricao":t})
        if not any(l["rel"]=="next" for l in r.get("links",[])): break
        page+=1
json.dump({"deputadas":fem,"discursos":achados},open("/home/claude/work/falas.json","w"),ensure_ascii=False,indent=1)
print("discursos com feminis",len(achados),"autodeclaracao",sum(a["auto"] for a in achados),file=sys.stderr)
