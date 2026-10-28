#!/usr/bin/env python3
"""
Monta o objeto VOTOS_2026 de src/data/votos-2026.ts a partir da saída de
votos_2026.py e do CSV de candidaturas (mesmo recorte para candidaturas,
eleitas e votos).

Uso:
    python3 scripts/recontagem/votos_2026.py ZIP CSV > votos.json
    python3 scripts/recontagem/votos_2026_site.py votos.json CSV [UFS_EXCLUIDAS]
"""
import csv, json, sys
from collections import Counter, defaultdict
PROP={"DEPUTADO FEDERAL":"federal","DEPUTADO ESTADUAL":"estadual","DEPUTADO DISTRITAL":"distrital"}
v=json.load(open(sys.argv[1])); excl=set(sys.argv[3].split(',')) if len(sys.argv)>3 and sys.argv[3] else set()
rows=[r for r in csv.DictReader(open(sys.argv[2],encoding='latin1'),delimiter=';') if r['NR_TURNO']=='1' and r['DS_CARGO'] in PROP and r['SG_UF'] not in excl]
seen=set();out={}
cand=defaultdict(lambda:defaultdict(Counter));el=defaultdict(lambda:defaultdict(Counter))
for r in rows:
    if r['SQ_CANDIDATO'] in seen: continue
    seen.add(r['SQ_CANDIDATO']);k=PROP[r['DS_CARGO']]
    cand[k][r['DS_GENERO']][r['DS_COR_RACA']]+=1
    if r['DS_SIT_TOT_TURNO'].startswith('ELEITO'): el[k][r['DS_GENERO']][r['DS_COR_RACA']]+=1
for k in PROP.values():
    b=v['byCargo'][k]
    byuf={u:{'FEMININO':c.get('FEMININO',0),'MASCULINO':c.get('MASCULINO',0)} for u,c in b['byUf'].items() if u not in excl}
    gr={g:{rc:x for rc,x in d.items()} for g,d in b['byGenderRace'].items()}
    out[k]={'candidacies':{g:dict(c) for g,c in cand[k].items()},'elected':{g:dict(c) for g,c in el[k].items()},'votes':gr,'votesTotal':b['total'],'votesByUf':byuf}
print(json.dumps(out,ensure_ascii=False))
