# Da lógica de observatório para publicação jornalística de dados

Objetivo: em cada página, o leitor encontra primeiro a pergunta e a descoberta; só depois a evidência, a visualização, o contexto e a documentação. Nenhuma ressalva metodológica é apagada — todas descem de posição ou trocam de lugar. Nenhum dado, número, cálculo, fonte ou afirmação nova entra. Onde falta um achado escrito, o plano aponta o buraco em vez de inventá-lo.

Camadas usadas: **P** pergunta · **D** descoberta · **E** evidência · **V** visualização · **C** contexto/cautela · **Doc** documentação.

---

## 1. Home (`src/routes/index.tsx`)

Ordem atual: HeroEditorial → CurrentSnapshot → InvestigationGrid → MapSection → Stages → FunnelFeature → AboutBand.

A home já é P → D → E → V → Doc. Fica **fora do escopo** desta frente: zona protegida, e a única melhoria pendente (tratamento de três camadas no CurrentSnapshot) depende de confirmação separada.

---

## 2. `/quem-sao-elas`

Atual: abertura (race) → InBrief → "Pardas e brancas…" + RaceFinding2026 → "Cor/raça declarada" + RaceBreakdown → "Escolha o cargo…" + RaceExplorer → "Cor/raça estado por estado" + RaceByStateTable → "Quem lança mulheres?" + PartyGenderTable + ContextBox "Como ler" → "O que a base registra — e o que ela não registra" → "E no seu estado?" + StateExplorer → "O que já é possível cruzar".

Proposta:
1. **P/D** abertura + InBrief (mantém)
2. **D+E** "Pardas e brancas…" + RaceFinding2026 (o achado já formatado em três camadas)
3. **E** RaceBreakdown
4. **E/V** RaceByStateTable
5. **E/V** "Quem lança mulheres?" + PartyGenderTable + ContextBox "Como ler"
6. **V interativa** RaceExplorer e StateExplorer juntos, em bloco "explore você mesma"
7. **C** "O que a base registra — e o que ela não registra"
8. **Doc** "O que já é possível cruzar" + NextAxes

Muda de fato: mover o RaceExplorer de 4º para depois das tabelas, juntando as duas ferramentas interativas num só bloco. O resto é só reordenação já parcialmente feita.
Buraco: as seções 3, 4 e 5 abrem com título descritivo ("Cor/raça declarada nas candidaturas"), não com achado. Transformá-las em descoberta exigiria uma frase-achado nova por seção — só é honesto escrever essa frase onde o número atual já a sustenta; onde não sustentar, o título descritivo fica.

---

## 3. `/funil`

Atual: abertura → InBrief → "Quantas são, em cada porta de entrada" + FunnelStages2026 (com legenda e fechamento em três camadas) → "Ninguém disputa uma cadeira sozinha" + ContextBox proporcional → "Quantas candidaturas para cada vaga?" + CompetitionByUf → "Como isso se compara ao passado?" + ContextBox fotografia + PastStrip + GapNote.

Proposta:
1. **P/D** abertura + InBrief
2. **D/E/V** funil + legenda + fechamento Fato/Leitura/Pergunta (mantém)
3. **E/V** "Quantas candidaturas para cada vaga?" + CompetitionByUf
4. **E/V** "Como isso se compara ao passado?" + PastStrip
5. **C** "Ninguém disputa uma cadeira sozinha" (regra da proporcional) descendo para cá, junto com o ContextBox "fotografia" e a GapNote
6. **Doc** NextAxes

Muda de fato: mover a seção explicativa da proporcional de 3ª para penúltima, e o ContextBox "fotografia" para depois do PastStrip em vez de antes. Já é a página mais próxima do formato desejado.
Buraco: nenhum. Só reordenação.

---

## 4. `/historico`

Atual: abertura → InBrief → "Quatro eleições, quatro bases" + HistoryTimeline + GapNote → "Quantas candidaturas são de mulheres" + SeriesChart + 2 ContextBox → "E quando se olha para cor e raça?" + SeriesChart + ContextBox + GapNote → "A composição mudou?" + 2 SeriesChart + ContextBox → "Entre candidatar-se e eleger-se" + 2 SeriesChart + HistoryFunnel + 3 GapNote → "E a leitura por estado?" + GapNote → "O que os dados permitem dizer".

Proposta:
1. **P/D** abertura + InBrief
2. **D/E/V** "Quantas candidaturas são de mulheres" (série principal) — sobe para 1ª evidência
3. **E/V** "E quando se olha para cor e raça?"
4. **E/V** "A composição mudou?"
5. **E/V** "Entre candidatar-se e eleger-se" + HistoryFunnel (o achado mais forte da página)
6. **C** "Quatro eleições, quatro bases diferentes" + HistoryTimeline — desce de 1ª para cá: hoje é uma explicação de comparabilidade de bases servida antes de o leitor ver qualquer série
7. **C/Doc** "E a leitura por estado?" + GapNotes + "O que os dados permitem dizer" + NextAxes

Muda de fato: descer o bloco de comparabilidade de bases (com sua timeline) para depois das séries. Reordenação de blocos inteiros, sem editar gráficos nem notas.
Buraco: a página nunca afirma em uma frase o achado da série ("entre candidatar-se e eleger-se, a diferença é X"). Escrever essa frase exigiria comparar dois pontos das séries existentes — possível, mas é afirmação nova e deve ser aprovada separadamente.

---

## 5. `/direitos`

Atual: abertura → InBrief → "Cada marco em cinco perguntas" (timeline) → "O que as regras ainda não alcançam" (2 ContextBox + GapNote) → "As regras também estão em disputa" (proposições + GapNote) → "Três distinções que evitam erro".

Proposta:
1. **P/D** abertura + InBrief (mantém)
2. **E/V** "Cada marco em cinco perguntas" (mantém)
3. **E** "As regras também estão em disputa" — sobe de 4ª para 3ª: é evidência do presente, e hoje aparece depois de uma seção só de limites
4. **C** "O que as regras ainda não alcançam"
5. **Doc** "Três distinções que evitam erro" + NextAxes

Muda de fato: trocar a ordem das seções 3 e 4. Mudança pequena e de baixo risco.
Buraco: nenhum.

---

## 6. `/em-disputa`

Atual: abertura (process) → InBrief → card poster-frame + "O que está em vigor e o que segue em discussão" + GapNotes → "Três distinções para ler uma proposição".

Proposta: mantém exatamente essa ordem — P → E → C/Doc. Página curta, com três camadas apenas; já foi reordenada na frente anterior.
Muda de fato: nada. Sem buraco a apontar além do que a GapNote já declara (a base de tramitação).

---

## 7. `/quem-controla`

Atual: abertura (power-flow) → InBrief → "Cinco decisões antes da campanha" (CONTROL_LEVERS, 2 prontas + 3 aguardando fonte) → "O que a regra alcança" (2 ContextBox + GapNote) → "Do registro à distribuição" + ContextBox.

Proposta:
1. **P/D** abertura + InBrief
2. **E** "Cinco decisões antes da campanha" — reordenar internamente para as 2 alavancas prontas vierem antes das 3 com StatusTag "aguardando fonte", em vez de intercaladas
3. **C** "O que a regra alcança"
4. **Doc** "Do registro à distribuição" + NextAxes

Muda de fato: só a ordem interna das cinco alavancas (nenhuma some, nenhum texto muda, nenhum StatusTag muda).
Buraco: com 3 de 5 alavancas sem fonte, a página não tem descoberta publicável. Tentar escrever uma seria inventar. Fica como é até a base chegar — e a auditoria recomenda **não** forçar o padrão de três camadas aqui.

---

## 8. `/metodo`

Atual: abertura → "Como calculamos?" (+4 ContextBox) → "Fonte e processamento" → "Como refazer do zero" → "Presença não é poder de decidir" → "Que estágios a base contém" → "As decisões que valem para todo o site" → "Cada número, com sua conta aberta" → "Fotografias já processadas" → "Três registros diferentes" → "O que chamamos de competitividade" → "Por que ainda não publicamos dinheiro" → "Os limites declarados deste método".

O Método é documentação por definição — não recebe a inversão P → D. A proposta é só agrupar em quatro camadas explícitas, sem mover conteúdo entre elas além do necessário:
1. **Como ler** — "Como calculamos?", "Presença não é poder de decidir", "As decisões que valem para todo o site"
2. **Fontes** — "Fonte e processamento", "Que estágios a base contém", "Fotografias já processadas", "Três registros diferentes"
3. **Contas** — "Cada número, com sua conta aberta", "O que chamamos de competitividade", "Como refazer do zero"
4. **Limites** — "Por que ainda não publicamos dinheiro", "Os limites declarados deste método" (intacta, como combinado)

Muda de fato: mover "Como refazer do zero" de 3ª para o grupo de contas, e "Presença não é poder" para junto das regras de leitura; o resto é agrupamento visual. É o arquivo maior do projeto (~1.170 linhas) e o de maior risco de regressão — sugiro tratá-lo como etapa final e separada.
Buraco: nenhum conteúdo novo necessário.

---

## Ordem de execução sugerida (aprovar por partes)

1. `/direitos` (troca de duas seções — menor risco)
2. `/funil` (mover dois blocos de contexto)
3. `/quem-controla` (ordem interna das alavancas)
4. `/quem-sao-elas` (reagrupar as ferramentas interativas)
5. `/historico` (descer o bloco de comparabilidade de bases)
6. `/metodo` (agrupamento em quatro camadas — etapa separada)

Fora do escopo: home, FunnelStages2026, seção de limitações declaradas do Método, eixos despublicados (Condições, Dinheiro, Quem Chega).

## Decisões que preciso de você

- Aprovar as frases-achado novas (Histórico e seções descritivas de /quem-sao-elas) é um passo separado: sem elas, as páginas ficam reordenadas mas sem descoberta escrita no topo de cada seção.
- O Método pode ficar para depois, sem bloquear o resto.
