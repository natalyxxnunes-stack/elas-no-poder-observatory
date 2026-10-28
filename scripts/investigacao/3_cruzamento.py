#!/usr/bin/env python3
# Uso: python3 3_cruzamento.py consulta_cand_2022_BRASIL.csv consulta_cand_2026_BRASIL.csv
# Lê votacoes.json e deputados.json (passos 1 e 2) e grava cruzamento.json.
import json, csv, sys, re
from collections import Counter, defaultdict
vs=json.load(open("votacoes.json")); dp=json.load(open("deputados.json"))
deps=dp["deputados"]; ex=dp["exercicio"]
norm=lambda c: re.sub(r"\D","",c or "").zfill(11)
# raça 2022 por CPF
r22={}
for r in csv.DictReader(open(sys.argv[1],encoding="latin1"),delimiter=";"):
    c=norm(r["NR_CPF_CANDIDATO"])
    if r["DS_CARGO"]=="DEPUTADO FEDERAL" or c not in r22:
        r22[c]=(r["DS_COR_RACA"],r["DS_GENERO"],r["DS_CARGO"])
# resultado 2026 por CPF (turno final)
res={}
rows26=list(csv.DictReader(open(sys.argv[2],encoding="latin1"),delimiter=";"))
for t in ("1","2"):
    for r in rows26:
        if r["NR_TURNO"]!=t: continue
        c=norm(r["NR_CPF_CANDIDATO"])
        if c=="00000000000": continue
        if t=="2" and c not in res: continue
        if t=="1" and c in res and res[c]["cargo"].startswith("DEPUTADO") : continue
        res[c]={"cargo":r["DS_CARGO"],"sit":r["DS_SIT_TOT_TURNO"],"cand":r["DS_SITUACAO_CANDIDATURA"],"partido26":r["SG_PARTIDO"]}
def desfecho(c):
    x=res.get(c)
    if not x: return "não concorreu"
    cg,s=x["cargo"],x["sit"]
    if s.startswith("ELEITO"):
        return "reeleita" if cg=="DEPUTADO FEDERAL" else "eleita para outro cargo"
    if s=="SUPLENTE": return "suplente" if cg=="DEPUTADO FEDERAL" else "não eleita"
    if s in ("NÃO ELEITO",): return "não eleita"
    return "candidatura sem resultado"  # #NULO etc: indeferida, renúncia
VOTO={"Sim":"Sim","Não":"Não","Abstenção":"Abstenção","Obstrução":"Obstrução","Artigo 17":"Presidência da sessão"}
out={"votacoes":{},"deputadas":{}, "sinteses":{}}
for v,x in vs.items():
    voto={r["deputado_"]["id"]:r for r in x["votos"]}
    # maioria da bancada (partido no momento do voto)
    pv=defaultdict(Counter)
    for r in x["votos"]:
        if r["tipoVoto"] in ("Sim","Não"): pv[r["deputado_"]["siglaPartido"]][r["tipoVoto"]]+=1
    maj={}
    for p,c in pv.items():
        maj[p]="Sim" if c["Sim"]>c["Não"] else "Não" if c["Não"]>c["Sim"] else "dividida"
    rows=[]
    lista=list(ex[v])
    ids_ex={d["id"] for d in lista}
    for i,r in voto.items():
        if i not in ids_ex:
            dd=r["deputado_"]; lista.append({"id":i,"nome":dd["nome"],"siglaPartido":dd["siglaPartido"],"siglaUf":dd["siglaUf"]})
            print("incluído (votou, fora da lista de exercício)",v,dd["nome"],dd["siglaPartido"],file=sys.stderr)
    for d in lista:
        i=d["id"]; info=deps[str(i)]; c=norm(info["cpf"])
        r=voto.get(i)
        t=VOTO.get(r["tipoVoto"],r["tipoVoto"]) if r else "Ausente"
        part=r["deputado_"]["siglaPartido"] if r else d["siglaPartido"]
        m=maj.get(part,"sem votos da bancada")
        alin=None
        if t in ("Sim","Não") and m in ("Sim","Não"): alin= "com a bancada" if t==m else "contra a bancada"
        rows.append({"id":i,"nome":info["nome"] or d["nome"],"sexo":info["sexo"],"partido":part,"uf":d["siglaUf"],"voto":t,"maioriaBancada":m,"alinhamento":alin,"raca2022":r22.get(c,("SEM REGISTRO",))[0],"desfecho2026":desfecho(c),"cargo2026":res.get(c,{}).get("cargo")})
    out["votacoes"][v]=rows
    # voters not in exercicio list?
    cnt=Counter(r["voto"] for r in rows)
    print("placar recontado",v,cnt["Sim"],cnt["Não"],cnt["Abstenção"],file=sys.stderr)
json.dump(out,open("cruzamento.json","w"),ensure_ascii=False)
for v,rows in out["votacoes"].items():
    print("\n",v,"em exercício",len(rows))
    for sx in ("F","M"):
        g=[r for r in rows if r["sexo"]==sx]
        print(" ",sx,len(g),dict(Counter(r["voto"] for r in g)), "contra bancada:",sum(r["alinhamento"]=="contra a bancada" for r in g))
    f=[r for r in rows if r["sexo"]=="F"]
    print("  raça F:",dict(Counter(r["raca2022"] for r in f)))
