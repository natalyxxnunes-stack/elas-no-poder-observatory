# Auditoria dos denominadores da série histórica (2014 · 2018 · 2022 · 2026)

Rodada de auditoria — sem redesign, sem mudança de metodologia. Todos os números
abaixo foram reconferidos linha a linha nos pacotes oficiais
`consulta_cand_<ano>.zip` (TSE / Dados Abertos), com o mesmo código do projeto.

## 1. O que cada número representa

| Ano | Universo | Filtro aplicado | Linhas brutas | Após deduplicação | Número exibido | Explicação da diferença |
| --- | --- | --- | --- | --- | --- | --- |
| 2014 | base inteira | CD_TIPO_ELEICAO=2, NR_TURNO=1, chave (ANO, CD_ELEICAO, SQ_CANDIDATO) | 52.526 | 26.161 | 26.161 candidaturas | 84 linhas de eleição não ordinária + 120 de 2º turno + 26.161 linhas repetidas (o arquivo `..._BRASIL.csv` republica todas as linhas das UFs) |
| 2014 | proporcional (dep. federal, estadual, distrital) | idem | — | — | 25.167 (F 7.930 = 31,5% · M 17.237) | — |
| 2014 | majoritário (presidente, governador, senador) | idem | — | — | 373 (F 58 = 15,5% · M 315) | — |
| 2014 | fora dos universos | vice-presidente, vice-governador, 1º/2º suplente | — | — | 621 | 25.167 + 373 + 621 = 26.161 ✔ |
| 2014 | eleitos (1º turno) | DS_SIT_TOT_TURNO ∈ {ELEITO, ELEITO POR QP, ELEITO POR MÉDIA} | — | — | prop. 1.572 (F 170) · maj. 41 (F 5) | prop. = 513 federais + 1.035 estaduais + 24 distritais ✔; maj. = 27 senadores + 14 governadores eleitos no 1º turno |
| 2018 | base inteira | idem | 58.574 | 29.153 | 29.153 candidaturas | 148 não ordinárias + 120 de 2º turno + 29.153 linhas repetidas (BRASIL) |
| 2018 | proporcional | idem | — | — | 27.561 (F 8.820 = 32,0% · M 18.690 · Não divulgável 51) | — |
| 2018 | majoritário | idem | — | — | 579 (F 95 = 16,4% · M 478 · Não divulgável 6) | — |
| 2018 | fora dos universos | vices e suplentes | — | — | 1.013 | 27.561 + 579 + 1.013 = 29.153 ✔ |
| 2018 | eleitos (1º turno) | idem | — | — | prop. 1.572 (F 240) · maj. 66 (F 6) | prop. fecha ✔; maj. = 53 senadores + 13 governadores. Faltou 1 senador: 22 linhas de SENADOR vêm com `#NULO#` em DS_SIT_TOT_TURNO no arquivo publicado (lacuna da fonte, não do cálculo) |
| 2022 | base inteira | idem | 58.644 | 29.262 | 29.262 candidaturas | 16 não ordinárias + 104 de 2º turno + 29.262 linhas repetidas (BRASIL = 29.322 linhas = 29.292 das UFs + 30 do BR) |
| 2022 | proporcional | idem | — | — | 27.977 (F 9.532 = 34,1% · M 18.422 · Não divulgável 23) | — |
| 2022 | majoritário | idem | — | — | 480 (F 100 = 20,8% · M 379 · Não divulgável 1) | — |
| 2022 | fora dos universos | vices e suplentes | — | — | 805 | 27.977 + 480 + 805 = 29.262 ✔ |
| 2022 | eleitos (1º turno) | idem | — | — | prop. 1.512 (F 267) · maj. 42 (F 5) | prop. está 60 abaixo do total de cadeiras: **o Maranhão não tem resultado no arquivo** — as 926 candidaturas de MA vêm com `#NULO` em DS_SIT_TOT_TURNO, e MA elege 18 federais + 42 estaduais = 60. Lacuna da fonte; não corrigida nesta rodada. Maj. = 27 senadores + 15 governadores no 1º turno |
| 2026 | base inteira | NR_TURNO=1 (única existente), chave SQ_CANDIDATO | 26.678 | 13.339 | 13.339 candidaturas | 13.339 linhas repetidas (BRASIL). **Erro comprovado e corrigido nesta rodada**: a fotografia publicada antes usava o processamento `2026.08.11-b2`, anterior à deduplicação, e exibia 26.678 |
| 2026 | proporcional | idem | — | — | 12.754 (F 4.488 = 35,2%) | antes exibia 25.508 e 8.976 — exatamente o dobro |
| 2026 | majoritário | idem | — | — | 227 (F 41 = 18,1%) | antes exibia 454 e 82 — exatamente o dobro |
| 2026 | fora dos universos | vices e suplentes | — | — | 358 | 12.754 + 227 + 358 = 13.339 ✔ |
| 2026 | eleitas | — | — | — | **bloqueado** | eleição não realizada; nenhum valor é criado ou estimado |
| 2026 | raça sobre o total de candidaturas | — | — | — | **bloqueado** | a fotografia atual grava cor/raça apenas das candidaturas de mulheres; o denominador racial total não existe no snapshot |

Aritmética conferida: em todos os anos, `proporcional + majoritário + fora dos
universos = candidaturas após deduplicação`, e `brutas = ordinárias descartadas
+ 2º turno descartado + repetidas + contadas`.

## 2. Comparabilidade dos universos

Comparáveis entre si, com denominador próprio por ano:

- percentual de mulheres nas candidaturas proporcionais (2014 → 2026);
- percentual de mulheres nas candidaturas majoritárias (2014 → 2026);
- distribuição por cor/raça das candidaturas (cor/raça existe desde 2014).

Universos diferentes — documentados, nunca somados nem "fechados" à força:

1. **Estágio processual.** 2014, 2018 e 2022 são bases fechadas, com registro
   julgado (APTO/INAPTO) e resultado publicado. 2026 é base em curso: todas as
   13.339 linhas vêm com `#NE` em DS_SITUACAO_CANDIDATURA. O total de 2026 pode
   subir ou descer até o fim do prazo judicial; comparar níveis absolutos entre
   2026 e anos fechados é indevido, só os percentuais são comparáveis com
   ressalva de estágio.
2. **Candidaturas × eleitos.** São universos distintos: o denominador de
   eleitos é o número de cadeiras, não o de candidaturas. Nenhum percentual
   mistura os dois.
3. **Proporcional × majoritário.** Denominadores separados sempre; a regra de
   composição de 30%–70% se aplica só às proporcionais. A comparação entre os
   dois percentuais é descritiva, sem inferência causal.
4. **Fora dos universos.** Vice-presidente, vice-governador e suplentes de
   senador não entram em nenhum dos dois denominadores, em nenhum ano.

## 3. Eleitos: o cálculo é de 1º turno (não corrigido nesta rodada)

`isElected()` em `src/lib/tse/historical-parse.ts` lê DS_SIT_TOT_TURNO apenas
nas linhas de `NR_TURNO = 1`. Consequência, identificada e **não** corrigida
agora, conforme o escopo desta auditoria:

- quem venceu no 2º turno (presidência e parte dos governos) aparece como
  `2º TURNO` na linha de 1º turno e **não** é contado como eleito. Linhas com
  esse valor: 56 (2014), 60 (2018), 52 (2022);
- por isso o total majoritário de eleitos é sempre parcial: 41 (2014), 66
  (2018) e 42 (2022) — só senadores e governadores decididos no 1º turno;
- o universo proporcional não é afetado, porque não há 2º turno para deputados.

Nenhuma nova fonte de resultado foi implementada nesta rodada.

## 4. Onde cada número é determinado

| Número | Arquivo / função |
| --- | --- |
| Filtros, deduplicação e contagens históricas | `src/lib/tse/historical-parse.ts` → `ingestHistoricalCsv`, `HISTORICAL_FILTERS` |
| Classificação proporcional × majoritário (todos os anos) | `src/lib/tse/compute.ts` → `classifyUniverse` |
| Identificação de eleitos (1º turno) | `src/lib/tse/historical-parse.ts` → `isElected`, `ELECTED_SITUATIONS` |
| Payload gravado por ano | `src/lib/tse/historical-compute.ts` → `toHistoricalAggregates` |
| Séries e percentuais exibidos | `src/lib/tse/historical-compute.ts` → `feminineCandidacySeries`, `blackCandidacySeries`, `buildAllSeries` |
| Junção histórico + 2026 | `src/lib/tse/historical.functions.ts` → `getHistoricalSeries` |
| Coleta histórica | `src/lib/tse/historical-ingest.server.ts`, `src/routes/api/public/tse/ingest-history.ts` |
| Deduplicação e contagens de 2026 | `src/lib/tse/parse.ts` → `ingestCsv`, `computeIndicators` |
| Fotografia atual de 2026 lida pelo site | `src/lib/tse/snapshot.functions.ts` → `getLatestTseSnapshot` |
| Coleta diária de 2026 | `src/lib/tse/ingest.server.ts`, `src/routes/api/public/tse/ingest.ts` |

## 5. Pendências abertas (não tocadas nesta rodada)

- eleitos no 2º turno não contabilizados (item 3);
- resultado ausente na fonte para MA/2022 (60 cadeiras) e para 1 vaga de
  senador em 2018;
- cor/raça do total de candidaturas em 2026 não gravada no snapshot atual;
- a coleta diária de 2026 está sendo recusada pelo CDN do TSE (HTTP 403) quando
  disparada pelo servidor; a fotografia corrigida desta auditoria foi calculada
  com o mesmo código do projeto sobre o pacote oficial baixado.
