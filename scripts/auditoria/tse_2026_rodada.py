#!/usr/bin/env python3
"""Recontagem TSE 2026 para auditoria. Somente agregados, sem dados pessoais."""
import csv, hashlib, io, json, sys, zipfile
from pathlib import Path
from collections import defaultdict, Counter
from decimal import Decimal

CARGOS_PROP={"DEPUTADO FEDERAL","DEPUTADO ESTADUAL","DEPUTADO DISTRITAL"}
CARGOS_MAJ={"PRESIDENTE","GOVERNADOR","SENADOR"}
CARGOS=CARGOS_PROP|CARGOS_MAJ
RACAS={"BRANCA","PARDA","PRETA","AMARELA","INDÍGENA"}
NOMES={"receitas":"receitas_candidatos_2026_BRASIL.csv",
       "despesas_contratadas":"despesas_contratadas_candidatos_2026_BRASIL.csv",
       "despesas_pagas":"despesas_pagas_candidatos_2026_BRASIL.csv"}
CAMPOS={"receitas":["VR_RECEITA"],
        "despesas_contratadas":["VR_DESPESA_CONTRATADA","VR_DESPESA"],
        "despesas_pagas":["VR_PAGTO_DESPESA","VR_DESPESA_PAGA","VR_DESPESA"]}
ZERO=Decimal("0")

def sha_file(p):
 h=hashlib.sha256()
 with open(p,"rb") as f:
  for b in iter(lambda:f.read(1048576),b""):h.update(b)
 return h.hexdigest()

def sha_member(z,n):
 h=hashlib.sha256()
 with z.open(n) as f:
  for b in iter(lambda:f.read(1048576),b""):h.update(b)
 return h.hexdigest()

def member(z,name):
 found=[x for x in z.namelist() if Path(x).name.lower()==name.lower()]
 if len(found)!=1:raise ValueError("Arquivo ausente ou duplicado: "+name+" "+str(found))
 return found[0]

def rows(z,n):
 with z.open(n) as raw:
  f=io.TextIOWrapper(raw,encoding="latin1",newline="")
  yield from csv.DictReader(f,delimiter=";")

def num(s):
 return Decimal(str(s or "0").replace(".","").replace(",","."))

def rd(s):
 return float(s.quantize(Decimal(".01")))

def main(candidaturas,contas,output):
 out=Path(output);out.mkdir(parents=True,exist_ok=True)
 zc=zipfile.ZipFile(candidaturas)
 nf=member(zc,"consulta_cand_2026_BRASIL.csv")
 manifest={"candidaturas":{"zip_sha256":sha_file(candidaturas),"csv_sha256":sha_member(zc,nf)},
           "contas":{"zip_sha256":sha_file(contas)}}
 cand={};situ={};nlin=0
 for r in rows(zc,nf):
  nlin+=1
  if nlin==1:manifest["candidaturas"]["gerado_em"]=r.get("DT_GERACAO","")+" "+r.get("HH_GERACAO","")
  sq=r.get("SQ_CANDIDATO","");t=r.get("NR_TURNO","")
  if r.get("DS_CARGO") not in CARGOS or not sq or t not in ("1","2"):continue
  if t=="1" and sq not in cand:
   race=r.get("DS_COR_RACA","")
   cand[sq]={"genero":r.get("DS_GENERO",""),"raca":race if race in RACAS else "NÃO_CLASSIFICADA",
             "cargo":r["DS_CARGO"],"partido":r.get("SG_PARTIDO",""),"uf":r.get("SG_UF","")}
  if sq not in situ or t>situ[sq][0]:situ[sq]=(t,r.get("DS_SIT_TOT_TURNO",""))
 manifest["candidaturas"]["linhas"]=nlin
 manifest["candidaturas"]["titulares"]=len(cand)
 zc.close()
 zf=zipfile.ZipFile(contas)
 totais={k:defaultdict(lambda:ZERO) for k in NOMES}
 fe=defaultdict(lambda:ZERO);prest=defaultdict(set)
 for tipo,nome in NOMES.items():
  m=member(zf,nome)
  vistos=set();lin=0;dup=0;fora=0;geracao=None;campo=None
  for r in rows(zf,m):
   lin+=1
   if geracao is None:
    geracao=r.get("DT_GERACAO","")+" "+r.get("HH_GERACAO","")
    campo=next((k for k in CAMPOS[tipo] if k in r),None)
    if campo is None:raise ValueError("Coluna monetária não localizada: "+nome)
   # Deduplicação por todas as colunas e valores, com hash determinístico.
   key=hashlib.sha256(repr(tuple(r.items())).encode("utf-8")).digest()
   if key in vistos:dup+=1;continue
   vistos.add(key)
   sq=r.get("SQ_CANDIDATO","")
   if sq not in cand:fora+=1;continue
   v=num(r[campo]);totais[tipo][sq]+=v
   if tipo=="receitas":
    if r.get("DS_FONTE_RECEITA")=="FUNDO ESPECIAL":fe[sq]+=v
    if r.get("DS_TIPO_PRESTACAO"):prest[sq].add(r["DS_TIPO_PRESTACAO"])
  manifest["contas"][tipo]={"csv_sha256":sha_member(zf,m),"gerado_em":geracao,
      "linhas":lin,"duplicatas":dup,"sem_cadastro_titular":fora,"coluna_valor":campo}
 zf.close()
 def calc(ids):
  a=list(ids)
  def soma(x):return rd(sum((x[s] for s in a),ZERO))
  return {"candidaturas":len(a),"com_receita":sum(s in totais["receitas"] for s in a),
          "com_fefc":sum(fe[s]>0 for s in a),"receitas":soma(totais["receitas"]),
          "fefc":soma(fe),"despesas_contratadas":soma(totais["despesas_contratadas"]),
          "despesas_pagas":soma(totais["despesas_pagas"])}
 resultados={}
 for u,cargos in (("proporcional",CARGOS_PROP),("majoritario",CARGOS_MAJ),("titulares",CARGOS)):
  ids=[sq for sq,v in cand.items() if v["cargo"] in cargos]
  d=calc(ids)
  for dim,col in (("genero","genero"),("raca","raca"),("cargo","cargo"),("uf","uf"),("partido","partido")):
   d["por_"+dim]={k:calc(sq for sq in ids if cand[sq][col]==k)
      for k in sorted({cand[sq][col] for sq in ids})}
  d["mulheres_por_raca"]={k:calc(sq for sq in ids if cand[sq]["genero"]=="FEMININO" and cand[sq]["raca"]==k)
     for k in sorted(RACAS|{"NÃO_CLASSIFICADA"})}
  if u=="titulares":
   d["situacao_prestacao"]=dict(Counter("FINAL" if "FINAL" in prest[sq] else
     "PARCIAL" if "PARCIAL" in prest[sq] else
     "RELATÓRIO FINANCEIRO" if "RELATÓRIO FINANCEIRO" in prest[sq] else "OUTRA"
     for sq in ids if sq in totais["receitas"]))
  resultados[u]=d
 eleitos=[cand[sq] for sq,(t,sit) in situ.items() if sq in cand and sit.startswith("ELEITO")]
 resultados["eleicao"]={"eleitos_titulares":len(eleitos),"mulheres_eleitas":sum(v["genero"]=="FEMININO" for v in eleitos),
   "por_cargo":{cargo:{"eleitos":sum(v["cargo"]==cargo for v in eleitos),"mulheres":sum(v["cargo"]==cargo and v["genero"]=="FEMININO" for v in eleitos)} for cargo in sorted(CARGOS)}}
 base=Path("docs/auditorias/financiamento-2026-15nov")
 fin=json.loads((base/"receitas-agregadas.json").read_text(encoding="utf-8"))
 fefc_t=json.loads((base/"fefc-titulares.json").read_text(encoding="utf-8"))
 fefc_p=json.loads((base/"fefc-proporcional.json").read_text(encoding="utf-8"))
 delta={}
 for uni in ("proporcional","majoritario"):
  atual=resultados[uni];ant=fin["universes"][uni]
  campos={"candidaturas":ant["registeredCandidacies"],"com_receita":ant["candidaciesWithRevenue"],
   "receitas":ant["totalRevenue"],"receitas_mulheres":ant["feminineRevenue"]}
  novos={"candidaturas":atual["candidaturas"],"com_receita":atual["com_receita"],
   "receitas":atual["receitas"],"receitas_mulheres":atual["por_genero"].get("FEMININO",{}).get("receitas",0)}
  delta[uni+"_receitas"]={k:{"anterior":v,"atual":novos[k],"variacao":round(novos[k]-v,2)} for k,v in campos.items()}
 for uni,old in (("titulares",fefc_t),("proporcional",fefc_p)):
  ant=old["total"];atual=resultados[uni]
  campos={"fefc":ant["fefc"],"fefc_mulheres":ant["mulheres"]["fefc"],"com_fefc":ant["comFefc"]}
  novos={"fefc":atual["fefc"],"fefc_mulheres":atual["por_genero"].get("FEMININO",{}).get("fefc",0),
    "com_fefc":atual["com_fefc"]}
  delta[uni+"_fefc"]={k:{"anterior":v,"atual":novos[k],"variacao":round(novos[k]-v,2)} for k,v in campos.items()}
 manifest["status"]="APURADO_PENDENTE_HOMOLOGACAO"
 manifest["aviso"]="ZIPs brutos não foram incorporados ao repositório; verificar datas e origem antes de publicar."
 for path,obj in (("manifest.json",manifest),("indicadores.json",resultados),("deltas.json",delta)):
  (out/path).write_text(json.dumps(obj,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
 print("Candidaturas:",manifest["candidaturas"]["gerado_em"])
 print("Receitas:",manifest["contas"]["receitas"]["gerado_em"])
 print("Mulheres eleitas titulares:",resultados["eleicao"]["mulheres_eleitas"])
 print("Receita total:",resultados["titulares"]["receitas"])
 if "2026" not in manifest["contas"]["receitas"]["gerado_em"]:raise ValueError("Data inesperada no CSV financeiro")
if __name__=="__main__":
 if len(sys.argv)!=4:raise SystemExit("Uso: tse_2026_rodada.py candidatos.zip contas.zip saida")
 main(*sys.argv[1:])
