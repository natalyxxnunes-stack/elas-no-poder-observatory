#!/usr/bin/env python3
"""Coleção Antigênero no poder (12/11/2026). Ver src/data/colecoes.ts."""
import csv, json, re
from collections import defaultdict
money=lambda s: float(s.replace(".","").replace(",",".")) if s else 0.0
sq_grp={}
for r in csv.DictReader(open('/home/claude/tse/cand/consulta_cand_2026_BRASIL.csv',encoding='latin1'),delimiter=';'):
    if r['NR_TURNO']=='1' and r['DS_CARGO']=='DEPUTADO FEDERAL' and r['DS_SIT_TOT_TURNO'].startswith('ELEITO'):
        sq_grp[r['SQ_CANDIDATO']]=r['DS_GENERO']
lines=open('/home/claude/tse/receitas_candidatos_2026_BRASIL.csv','rb').read().decode('latin1').splitlines()
h=next(csv.reader([lines[0]],delimiter=';'))
seen=set(); tot=defaultdict(float); fe=defaultdict(float)
for line in lines[1:]:
    if line in seen: continue
    seen.add(line)
    r=dict(zip(h,next(csv.reader([line],delimiter=';'))))
    g=sq_grp.get(r['SQ_CANDIDATO'])
    if not g: continue
    v=money(r['VR_RECEITA']); tot[g]+=v
    if r['DS_FONTE_RECEITA'].upper().startswith('FUNDO ESPECIAL'): fe[g]+=v
from collections import Counter
print(Counter(sq_grp.values()))
for g in tot: print(g, round(tot[g]), round(fe[g]), round(100*fe[g]/tot[g],1))
