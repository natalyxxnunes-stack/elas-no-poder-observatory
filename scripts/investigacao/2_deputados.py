#!/usr/bin/env python3
# Passo 2: quem estava em exercício em cada data, com sexo e CPF (grava deputados.json).
import json, urllib.request, time, sys
from concurrent.futures import ThreadPoolExecutor
B="https://dadosabertos.camara.leg.br/api/v2"
def get(path):
    for i in range(5):
        try:
            req=urllib.request.Request(B+path,headers={"Accept":"application/json"})
            return json.load(urllib.request.urlopen(req,timeout=60))
        except Exception as e:
            time.sleep(2+i*3)
    raise SystemExit("fail "+path)
vs=json.load(open("votacoes.json"))
exercicio={}
for v,x in vs.items():
    day=x["detalhe"]["dataHoraRegistro"][:10]
    deps=get(f"/deputados?dataInicio={day}&dataFim={day}&itens=1000")["dados"]
    exercicio[v]=[{"id":d["id"],"nome":d["nome"],"siglaPartido":d["siglaPartido"],"siglaUf":d["siglaUf"]} for d in deps]
    print(v,day,len(deps))
ids=set()
for v,x in vs.items():
    ids|={r["deputado_"]["id"] for r in x["votos"]}
for v in exercicio: ids|={d["id"] for d in exercicio[v]}
print("ids",len(ids))
def det(i):
    d=get(f"/deputados/{i}")["dados"]
    return i,{"cpf":d.get("cpf"),"sexo":d.get("sexo"),"nomeCivil":d.get("nomeCivil"),"nome":d["ultimoStatus"].get("nomeEleitoral")}
with ThreadPoolExecutor(6) as ex:
    dets=dict(ex.map(det,sorted(ids)))
json.dump({"exercicio":exercicio,"deputados":dets},open("deputados.json","w"),ensure_ascii=False)
from collections import Counter
print(Counter(d["sexo"] for d in dets.values()), sum(1 for d in dets.values() if not d["cpf"]))
