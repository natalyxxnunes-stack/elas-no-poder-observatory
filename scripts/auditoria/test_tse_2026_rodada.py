#!/usr/bin/env python3
"""Teste sintético de regressão do pipeline. Não contém registros eleitorais reais."""
import csv, json, subprocess, sys, tempfile, zipfile
from pathlib import Path

ROOT=Path(__file__).resolve().parents[2]
HEAD_C=["DT_GERACAO","HH_GERACAO","NR_TURNO","SQ_CANDIDATO","DS_CARGO",
        "DS_GENERO","DS_COR_RACA","SG_PARTIDO","SG_UF","DS_SIT_TOT_TURNO"]
HEAD_R=["DT_GERACAO","HH_GERACAO","SQ_CANDIDATO","SQ_PRESTADOR_CONTAS",
        "VR_RECEITA","DS_FONTE_RECEITA","DS_TIPO_PRESTACAO"]
HEAD_CTR=["DT_GERACAO","HH_GERACAO","SQ_CANDIDATO","SQ_PRESTADOR_CONTAS","VR_DESPESA_CONTRATADA"]
HEAD_PAG=["DT_GERACAO","HH_GERACAO","SQ_PRESTADOR_CONTAS","VR_PAGTO_DESPESA"]

def zipcsv(path,documents):
 with zipfile.ZipFile(path,"w") as z:
  for name,(header,rows) in documents.items():
   from io import StringIO
   buf=StringIO()
   writer=csv.writer(buf,delimiter=";",lineterminator="\n")
   writer.writerow(header);writer.writerows(rows)
   z.writestr(name,buf.getvalue().encode("latin1"))

def test():
 with tempfile.TemporaryDirectory() as td:
  root=Path(td)
  arq_c=root/"cand.zip";arq_f=root/"contas.zip";out=root/"out"
  zipcsv(arq_c,{"consulta_cand_2026_BRASIL.csv":(HEAD_C,[
   ["17/11/2026","09:00:00","1","A","DEPUTADO FEDERAL","FEMININO","PRETA","X","SP","ELEITO POR QP"],
   ["17/11/2026","09:00:00","1","B","DEPUTADO FEDERAL","MASCULINO","BRANCA","Y","RJ","NÃO ELEITO"]
  ])})
  # Uma linha de receita duplicada deve ser contada uma única vez.
  zipcsv(arq_f,{
   "receitas_candidatos_2026_BRASIL.csv":(HEAD_R,[
    ["17/11/2026","09:10:00","A","PA","100,00","FUNDO ESPECIAL","FINAL"],
    ["17/11/2026","09:10:00","A","PA","100,00","FUNDO ESPECIAL","FINAL"],
    ["17/11/2026","09:10:00","B","PB","50,00","Outros Recursos","PARCIAL"]
   ]),
   "despesas_contratadas_candidatos_2026_BRASIL.csv":(HEAD_CTR,[
    ["17/11/2026","09:10:00","A","PA","40,00"],
    ["17/11/2026","09:10:00","B","PB","20,00"]
   ]),
   # O arquivo de pagamentos não tem SQ_CANDIDATO.
   "despesas_pagas_candidatos_2026_BRASIL.csv":(HEAD_PAG,[
    ["17/11/2026","09:10:00","PA","30,00"],
    ["17/11/2026","09:10:00","PB","15,00"],
    ["17/11/2026","09:10:00","DESCONHECIDO","5,00"]
   ])
  })
  s=subprocess.run([sys.executable,str(ROOT/"scripts/auditoria/tse_2026_rodada.py"),
       str(arq_c),str(arq_f),str(out)],cwd=ROOT,capture_output=True,text=True,check=True)
  j=json.loads((out/"indicadores.json").read_text())
  mf=json.loads((out/"manifest.json").read_text())
  assert j["proporcional"]["receitas"]==150.0,j
  assert j["titulares"]["com_receita"]==2,j
  assert j["titulares"]["situacao_prestacao"]=={"FINAL":1,"PARCIAL":1},j
  assert j["titulares"]["candidaturas_com_varios_tipos_prestacao"]==0,j
  assert "DEPUTADO FEDERAL" in mf["divergencias_totalizacao"],mf
  assert j["proporcional"]["fefc"]==100.0,j
  assert j["proporcional"]["despesas_contratadas"]==60.0,j
  assert j["proporcional"]["despesas_pagas"]==45.0,j
  assert j["proporcional"]["por_genero"]["FEMININO"]["despesas_pagas"]==30.0,j
  assert j["eleicao"]["mulheres_eleitas"]==1,j
  assert mf["contas"]["receitas"]["duplicatas"]==1,mf
  assert mf["contas"]["despesas_pagas"]["linhas_sem_vinculo"]==1,mf
  assert mf["contas"]["despesas_pagas"]["valor_sem_vinculo"]==5.0,mf
  assert "alerta_desembolso" in mf,mf
  assert "SQ_CANDIDATO" not in (out/"indicadores.json").read_text()
  print("OK — teste sintético da vinculação, duplicatas, grupos e alertas.")

if __name__=="__main__":
 test()
