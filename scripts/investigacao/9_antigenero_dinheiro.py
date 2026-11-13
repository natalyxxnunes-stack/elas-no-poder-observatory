#!/usr/bin/env python3
"""Coleção Antigênero no poder (12/11/2026). Ver src/data/colecoes.ts."""
import csv, json, re, sys
from collections import defaultdict, Counter
norm=lambda c: re.sub(r"\D","",c or "").zfill(11)
money=lambda s: float(s.replace(".","").replace(",",".")) if s else 0.0
fem=json.load(open('/home/claude/work/falas.json'))['deputadas']
cpfs={norm(v['cpf']):v['nome'] for v in fem.values()}
# candidaturas 2026 (1º turno) dessas CPFs
cand={}
for r in csv.DictReader(open('/home/claude/tse/cand/consulta_cand_2026_BRASIL.csv',encoding='latin1'),delimiter=';'):
    c=norm(r['NR_CPF_CANDIDATO'])
    if c in cpfs and r['NR_TURNO']=='1':
        cand[c]={'sq':r['SQ_CANDIDATO'],'cargo':r['DS_CARGO'],'partido':r['SG_PARTIDO'],'uf':r['SG_UF'],'sit':r['DS_SIT_TOT_TURNO']}
lines=open('/home/claude/tse/receitas_candidatos_2026_BRASIL.csv','rb').read().decode('latin1').splitlines()
h=next(csv.reader([lines[0]],delimiter=';'))
alvo={v['sq'] for v in cand.values()}
seen=set(); tot=defaultdict(float); fefc=defaultdict(float); tipo={}; fontes=Counter()
for line in lines[1:]:
    if line in seen: continue
    seen.add(line)
    r=dict(zip(h,next(csv.reader([line],delimiter=';'))))
    sq=r['SQ_CANDIDATO']
    if sq not in alvo: continue
    v=money(r['VR_RECEITA']); tot[sq]+=v; fontes[r['DS_FONTE_RECEITA']]+=v
    if r['DS_FONTE_RECEITA'].upper().startswith('FUNDO ESPECIAL'): fefc[sq]+=v
    tipo[sq]=r['TP_PRESTACAO_CONTAS']
out=[]
for c,nome in sorted(cpfs.items(), key=lambda x:x[1]):
    k=cand.get(c)
    if not k: out.append({'nome':nome,'concorreu':False}); continue
    sq=k['sq']; out.append({'nome':nome,'concorreu':True,**k,'receita':round(tot[sq],2),'fefc':round(fefc[sq],2),'pct':round(100*fefc[sq]/tot[sq],1) if tot[sq] else None,'prestacao':tipo.get(sq)})
c=[o for o in out if o['concorreu']]
R=sum(o['receita'] for o in c); F=sum(o['fefc'] for o in c)
res={'concorreram':len(c),'nao':[o['nome'] for o in out if not o['concorreu']],'receita':round(R,2),'fefc':round(F,2),'pct':round(100*F/R,1),
 'pctMediana':sorted([o['pct'] for o in c if o['pct'] is not None])[len(c)//2] if c else None,
 'acima75':sum(1 for o in c if (o['pct'] or 0)>=75),'semFefc':[o['nome'] for o in c if o['fefc']==0],
 'fontes':{k:round(v,2) for k,v in fontes.items()},'prestacoes':Counter(o['prestacao'] for o in c),'deputadas':out}
json.dump(res,open('/home/claude/work/dinheiro.json','w'),ensure_ascii=False,indent=1)
print({k:v for k,v in res.items() if k!='deputadas'})
for o in c: print(o['nome'],o['cargo'],o['partido'],o['receita'],o['fefc'],o['pct'],o['prestacao'])
