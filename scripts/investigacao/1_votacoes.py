#!/usr/bin/env python3
# Passo 1: baixa detalhe, votos e orientações das seis votações (grava votacoes.json).
import json, urllib.request, time, sys
B="https://dadosabertos.camara.leg.br/api/v2"
def get(path):
    for i in range(4):
        try:
            req=urllib.request.Request(B+path,headers={"Accept":"application/json"})
            return json.load(urllib.request.urlopen(req,timeout=60))
        except Exception as e:
            print("retry",path,e,file=sys.stderr); time.sleep(2+i*3)
    raise SystemExit("fail "+path)
VOTS=["2351179-51","2352476-149","345311-270","2358548-89","2270800-160","2482078-57"]
out={}
for v in VOTS:
    d=get(f"/votacoes/{v}")["dados"]
    votos=get(f"/votacoes/{v}/votos")["dados"]
    ori=get(f"/votacoes/{v}/orientacoes")["dados"]
    out[v]={"detalhe":d,"votos":votos,"orientacoes":ori}
    print(v,d.get("dataHoraRegistro"),d.get("descricao","")[:90],len(votos),len(ori))
json.dump(out,open("votacoes.json","w"),ensure_ascii=False)
