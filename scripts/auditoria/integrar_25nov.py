#!/usr/bin/env python3
"""Importa exclusivamente artefatos reconciliados da execução 45690095847."""
import json
from pathlib import Path
from decimal import Decimal

root=Path("docs/auditorias/financiamento-2026-25nov")
def load(n):return json.loads((root/n).read_text())
r=load("receitas-agregadas.json"); m=load("independente/manifest.json")
f=load("fefc-titulares.json"); fp=load("fefc-proporcional.json"); d=load("despesas-agregadas.json")
assert r["csvSha256"]==m["contas"]["receitas"]["csv_sha256"]=="7cbbb11fb8004591e42ebb1ec1432585740c5b2436cd5f3ff65765e921247f29"
assert m["candidaturas"]["csv_sha256"]=="36c9ee052a30981feb83dcbb546e5e5048b222a4fb4ae1071ae47b8e4f04409b"
assert r["baseGeneratedAt"]=="25/11/2026 04:05:30"
assert len(load("reconciliacao.json")["comparacoes"])==14
assert all(x["dif"]==0 for x in load("reconciliacao.json")["comparacoes"].values())
(root/"manifest.json").write_text(json.dumps(m,ensure_ascii=False,indent=2)+"\n")
def edit(p,changes):
    p=Path(p); s=p.read_text()
    for a,b in changes:
        if a not in s:raise ValueError(f"Trecho ausente em {p}: {a}")
        s=s.replace(a,b)
    p.write_text(s)
def pct(a,b):return f"{100*a/b:.1f}".replace(".",",")
p=r["universes"]["proporcional"]
assert pct(p["feminineRevenueByRace"]["BRANCA"]["value"],p["feminineRevenue"])=="56,1"
for key,pc,pr in (("BRANCA","46,9","56,1"),("PARDA","34,1","27,7"),("PRETA","17,3","14,2")):
    q=p["feminineRevenueByRace"][key]
    assert pct(q["candidacies"],p["feminineCandidaciesWithRevenue"])==pc
    assert pct(q["value"],p["feminineRevenue"])==pr
oldsha="5c9b1e0456a8aa75bdecc5ac7ffc2bb52d4bbaa0099ec675a13b6ab73c0e04ba"
newsha=r["csvSha256"]
folder=("financiamento-2026-17nov","financiamento-2026-25nov")
date=("17/11/2026","25/11/2026")
time=("09:03:49","04:05:30")
candtime=("19:31:29","16:30:55")
status=[("19.665","19.692"),("19.383","19.454"),("186","164"),("96 RELATÓRIO","74 RELATÓRIO")]
edit("src/data/tse-finance-snapshot.ts",[folder,date,time,candtime,(oldsha,newsha),("2026-11-17T","2026-11-25T"),("gerada em 17/11","gerada em 25/11"),("981","978"),("773.961,81","770.684,00"),*status,("96 RELATÓRIO","74 RELATÓRIO")] if False else [folder,date,time,candtime,(oldsha,newsha),("2026-11-17T","2026-11-25T"),("gerada em 17/11","gerada em 25/11"),("981","978"),("773.961,81","770.684,00"),("19.383","19.454"),("186 PARCIAL","164 PARCIAL"),("96 RELATÓRIO","74 RELATÓRIO"),("Base de 17/11","Base de 25/11"),("O cadastro de 17/11","O cadastro de 25/11"),("A totalização eleitoral de Rondônia aparece incompleta em 17/11","A totalização nacional de 25/11 permanece incompleta; a origem da divergência por UF está em investigação")])
edit("src/data/despesas-2026.ts",[folder,date,candtime,("04:05:11; pagas 04:05:24","04:05:12; pagas 04:05:12")])
edit("src/data/fefc-partidos-2026.ts",[folder,date,time,candtime,(oldsha,newsha)])
edit("src/data/competitividade.ts",[date,("2026-11-17","2026-11-25"),("totalização incompleta de Rondônia na extração de 17/11","totalização nacional incompleta na extração de 25/11, com origem em investigação")])
edit("src/routes/partidos.tsx",[date])
edit("src/components/editorial/DespesasCharts.tsx",[("Base de 17/11","Base de 25/11"),("186 candidaturas","164 candidaturas"),("96 com relatório","74 com relatório")])
# Alterar apenas os dois achados financeiros correntes.
ap=Path("src/data/achados.ts");s=ap.read_text()
for key in ("dinheiro-brancas-peso","fundo-eleitoral-cor"):
    start=s.index('id: "'+key+'"');end=s.index('\n  },',start)
    b=s[start:end]
    b=b.replace("17/11","25/11").replace("2026-11-17","2026-11-25").replace("09h03","04h05").replace("19h31","16h30").replace("981 duplicatas","978 duplicatas")
    s=s[:start]+b+s[end:]
ap.write_text(s)
edit("src/routes/dinheiro.tsx",[date,("declarações de 17/11","declarações de 25/11"),("TSE em 17/11","TSE em 25/11"),("extração de 17/11;","extração de 25/11;"),("186 candidaturas","164 candidaturas"),("96 com relatório","74 com relatório"),("19.665","19.692"),("19.383","19.454"),("186 PARCIAL","164 PARCIAL"),("96 RELATÓRIO","74 RELATÓRIO"),("88,2%","88,1%")])
# Não reescrever correções históricas; acrescentar nova nota e corrigir atribuição a RO.
mp=Path("src/data/metodo-publico.ts");s=mp.read_text()
s=s.replace("Declarações da base financeira de 17/11/2026, posterior ao prazo de 16/11, cruzadas com cadastro de candidaturas de 17/11.","Declarações da base financeira de 25/11/2026, posterior ao prazo de 16/11, cruzadas com cadastro de candidaturas de 25/11.")
anchor='export const CORRECOES: readonly Correcao[] = ['
note='''\n  {
    data: "25/11/2026",
    pagina: "Dinheiro, Partido por partido, Achados e Método",
    to: "/dinheiro",
    tipo: "dado",
    oQueMudou:
      "Receitas, FEFC e despesas recontados com a base financeira de 25/11/2026 (receitas às 04h05min30s, despesas às 04h05min12s) e cadastro do mesmo dia às 16h30min55s. 19.692 candidaturas titulares com receita: 19.454 FINAL, 164 PARCIAL e 74 RELATÓRIO FINANCEIRO. Receitas totais: R$ 7.026.864.553,75; mulheres: R$ 2.039.869.234,05. FEFC total: R$ 5.035.316.334,04; mulheres: R$ 1.672.964.894,43. A fatia das brancas na receita feminina proporcional segue em 56,1%. A totalização nacional de 25/11 permanece incompleta; a contagem específica de Rondônia não confirma que o déficit esteja ali. Resultados eleitorais de 27/10 mantidos. Artefatos e hashes em financiamento-2026-25nov. Tipo de prestação não significa contas aprovadas.",
  },'''
assert anchor in s
s=s.replace(anchor,anchor+note)
mp.write_text(s)
edit("scripts/recontagem/validar_snapshot_financeiro.mjs",[folder,date,time,candtime,(oldsha,newsha),("981","978"),("19665","19692"),("19383","19454"),("PARCIAL: 186","PARCIAL: 164"),('"RELATÓRIO FINANCEIRO": 96','"RELATÓRIO FINANCEIRO": 74'),("7021570001.15","7026864553.75"),("2038564843.63","2039869234.05"),("5032571764.23","5035316334.04"),("1672271447.53","1672964894.43"),("FINANCEIRO_POS_16_11","FINANCEIRO_POS_17_11"),("alerta de Rondônia","alerta de totalização")])
(root/"LEIA-ME.md").write_text("""# Fotografia financeira de 25/11/2026

Fonte: TSE, Candidatos 2026 e Prestação de Contas Eleitorais 2026. Execução auditada: https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/45690095847.

Agregados originais dos dois artefatos; ver manifesto, recontagem independente e reconciliação de 14 controles. Os ZIPs brutos não são versionados. Receitas e FEFC por candidatura titular (SQ_CANDIDATO), deduplicação integral, pretas e pardas separadas; despesas contratadas e pagas não se somam. Ver também metodologia de 17/11 preservada.

Resultados eleitorais de 27/10 mantidos: contagens nacionais incompletas em 25/11. Atribuição territorial ainda em investigação. Contas sujeitas a retificação e julgamento. Este registro não implica publicação.
""")
print("Agregados importados; revisão de valores estáticos e fontes aplicada.")
