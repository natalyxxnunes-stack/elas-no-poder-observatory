# Auditoria das bases TSE 2026 — rodada de 17/11/2026

**Status: PARCIAL. Nenhuma recontagem com os ZIPs oficiais posteriores a 16/11 foi executada. Nenhum dado publicado deve ser substituído por esta nota.**

## Fontes oficiais
- Candidaturas: https://dadosabertos.tse.jus.br/dataset/candidatos-2026
- Prestação de contas: https://dadosabertos.tse.jus.br/pt_BR/dataset/prestacao-de-contas-eleitorais-2026
- Prazo do segundo turno: **16/11/2026**, segundo Portaria TSE nº 741/2026. https://www.tse.jus.br/comunicacao/noticias/2026/Novembro/prazo-para-prestar-contas-relativas-ao-2-turno-e-adiado-para-16-de-novembro

## Resultado verificável com a fotografia já versionada de 15/11
- Receitas: 269.003 linhas originais; 982 duplicatas integrais eliminadas; 268.021 linhas remanescentes.
- Titulares com receita: 19.660, das quais 19.363 têm situação FINAL, 195 PARCIAL e 102 RELATÓRIO FINANCEIRO no agregado arquivado (FINAL não significa contas aprovadas).
- Candidaturas titulares: 20.065, sendo 7.060 de mulheres.
- Receitas declaradas: R$ 7.020.242.106,44, das quais R$ 2.038.152.482,43 para mulheres. Soma dos universos proporcional e majoritário.
- FEFC recebido: R$ 5.031.966.889,00, dos quais R$ 1.672.035.872,98 para mulheres.
- No universo proporcional, brancas receberam 56,1036% das **receitas declaradas a mulheres**: 56,1% após arredondamento.
- Total racial do FEFC (titulares): 20.065 candidaturas, 20.064 identificadas entre BRANCA/PARDA/PRETA/AMARELA/INDÍGENA. A diferença de uma candidatura está no PSDB; nenhuma diferença monetária do FEFC.
- Diferença de saldo racial entre 27/10 e 15/11 para mulheres proporcionais: PRETA 1.197→1.196, PARDA 2.379→2.380, mantendo 6.953 mulheres. É necessária comparação por SQ_CANDIDATO para determinar os registros concretos alterados.

**Datas/hashes acima são relativos apenas aos arquivos antigos versionados; esta rodada não obteve ZIP novo.**

## Bloqueio operacional registrado
O recurso HTML do TSE não expõe a data atual de geração; o portal informa que está contida no arquivo. A tentativa de baixar ZIP oficial pela web e pelo ambiente de processamento falhou (ferramenta web não expõe binário ZIP; contêiner sem resolução DNS do CDN). Não declarar dados atualizados sem nova extração e SHA-256 calculado.

## Para concluir a Prioridade 1
- [ ] Obter os ZIPs oficiais `consulta_cand_2026.zip` e `prestacao_de_contas_eleitorais_candidatos_2026.zip` (gerados após o prazo de 16/11).
- [ ] Computar SHA-256 dos ZIPs e CSVs Brasil, registrar data de geração interna.
- [ ] Recontar candidaturas/resultados e receitas, FEFC, despesas contratadas/pagas por gênero, raça separada, UF, cargo e partido.
- [ ] Comparar com fotografia 15/11 e investigar mudanças por SQ_CANDIDATO, sem divulgar identificadores sensíveis.
- [ ] Validar as diferenças e registrar aprovação editorial antes de alterar indicadores do site.

**Repositório em produção (`main`) preservado.**
## Continuação de 17/11 — tentativa de execução automatizada

- O download direto de arquivos ZIP pelo contêiner falhou por DNS. O Portal de Dados Abertos do TSE foi consultado; a data oficial da base só pode ser extraída de dentro dos arquivos.
- Criado o script \`scripts/auditoria/tse_2026_rodada.py\`: prepara agregado de candidaturas/resultados/receitas/FEFC/despesas contratadas e pagas por gênero, cor/raça, cargo, UF e partido. Compara receita e FEFC com as fotografias de 15/11/2026.
- Criado o workflow \`.github/workflows/auditoria-tse-2026.yml\` restrito à branch \`auditoria-tse-2026-11-17\`; ele deve obter diretamente os ZIPs oficiais em runner GitHub, registrar hashes, datas, agregados e deltas, e não incorporar arquivos com CPF.
- **Status da execução não verificado.** A presença do script e workflow não prova sucesso do processamento. Não foi localizado ainda o arquivo \`execucao-github/manifest.json\`.
- Quando houver \`execucao-github/manifest.json\`, conferir datas de geração, hashes, recontagem por universo e diferenças antes de aplicar qualquer alteração ao \`main\` ou à HostGator.

## Resultado da recontagem com novas bases — 17/11/2026

**FINANCIAMENTO: RECONTADO E CONCILIADO. RESULTADO ELEITORAL: BLOQUEADO POR TOTALIZAÇÃO INCOMPLETA. NÃO PUBLICADO.**

- Candidaturas CSV: 17/11/2026 19:31:29, SHA-256 `51a7b2d098e6d3712b75dc6364faad8183bad16c72b63298a0a6e41403e538cf`.
- Receitas CSV: 17/11/2026 09:03:49, SHA-256 `5c9b1e0456a8aa75bdecc5ac7ffc2bb52d4bbaa0099ec675a13b6ab73c0e04ba`.
- Despesas contratadas CSV: 17/11/2026 04:05:11, SHA-256 `f185717ac6ffba0b04dfa5be56435e75a6071b19f570999232a5e49548bcfe9c`.
- Despesas pagas CSV: 17/11/2026 04:05:24, SHA-256 `f57eddcdbf270f4d03a8dce53e95aefff1e9d1900cf3c1d76f209eeddb820b6d`.
- **20.065 candidaturas titulares**; **19.665 com receitas declaradas**, contra 19.660 na foto de 15/11 (mais cinco, todas masculinas). Tipos de prestação: 19.383 FINAL, 186 PARCIAL, 96 RELATÓRIO FINANCEIRO, sem inferência sobre julgamento das contas.
- **Receitas declaradas titulares:** R$ 7.021.570.001,15 (mais R$ 1.327.894,71 frente a 15/11). Mulheres: R$ 2.038.564.843,63 (mais R$ 412.361,20).
- **FEFC titulares:** R$ 5.032.571.764,23 (mais R$ 604.875,23). Mulheres: R$ 1.672.271.447,53 (mais R$ 235.574,55).
- **Despesas contratadas titulares:** R$ 6.638.617.636,91. **Pagas:** R$ 6.483.722.612,69. As variáveis são distintas e não devem ser somadas.
- 981 linhas de receita integralmente duplicadas removidas; nenhuma receita sem cadastro, nenhuma divergência de gênero por linha, nenhuma despesa paga sem prestador correspondente.
- **105 verificações aritméticas** por gênero, raça, cargo, UF e partido fecharam. O reprocessamento independente foi confrontado com os scripts originais `dinheiro_2026.py`, `fefc_partidos_2026.py` e `despesas_doadores_2026.py`: **14 valores de referência, divergência R$ 0,00**.
- **Alerta eleitoral:** a fotografia de 17/11 registra 505 deputados federais eleitos (esperado: 513) e 1.011 estaduais (esperado: 1.035), faltando 32 cadeiras, situação compatível com as ausências anteriores de totalização de Rondônia. Não substituir o número validado de 342 mulheres titulares eleitas pelo resultado incompleto de 333.
- A tabela racial contém uma candidatura não classificada nas cinco categorias (sem valores financeiros registrados), mantida como lacuna, sem imputação.
- A nova base das receitas mantém **56,1%** para a participação das brancas nas receitas das candidaturas femininas proporcionais (arredondamento de uma casa decimal).

**Evidência automatizada:** execução GitHub Actions [44208584389](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/44208584389), com artefatos `auditoria-tse-2026-agregados` e `auditoria-tse-2026-metodo-publicado`. O segundo contém os quatro JSONs de recontagem original e `reconciliacao.json`.

**Próximas ações:** integrar somente os dados financeiros após revisão editorial de fontes, datas e universos em PR separado; manter os resultados eleitorais válidos de 27/10 até nova fotografia íntegra. `main`/HostGator inalterados.
