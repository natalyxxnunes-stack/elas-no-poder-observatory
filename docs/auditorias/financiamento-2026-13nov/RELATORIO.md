# Quem são elas? — Recontagem do financiamento eleitoral de 2026

**Situação:** concluída a recontagem e a integração na **branch de teste** `redesign-editorial-v3-teste`; nenhuma publicação ou merge.  
**Consulta:** 15/11/2026. **Receitas e despesas:** CSV do TSE gerado em **13/11/2026 às 15:07**. **Candidaturas:** CSV do TSE gerado em **14/11/2026 às 16:31**.

## 1. Fonte, processamento e universo

- Fonte oficial: [TSE — prestação de contas eleitorais de 2026](https://dadosabertos.tse.jus.br/pt_BR/dataset/prestacao-de-contas-eleitorais-2026).
- ZIP de candidatos e contas: `prestacao_de_contas_eleitorais_candidatos_2026.zip`, SHA-256 `40e6cb23a26090411249274d6b474375acbc0b12f126bf35b49150c7a08da0f5`.
- CSV de receitas: `receitas_candidatos_2026_BRASIL.csv`, SHA-256 `722c27a3c71ed4ed2c268b4baae189e1231ae95be2f40bb2bd1edc4e2bc7f35b`.
- CSV do registro: `consulta_cand_2026_BRASIL.csv`, SHA-256 `29029414bed2708555af68545a63af6a765eed563e4b1274873ea8145f2a203b`.
- Os valores são somados por `SQ_CANDIDATO`, depois da remoção das linhas **integralmente idênticas**; gênero, cor/raça, UF, partido e cargo são do registro de candidaturas, primeiro turno, candidatura titular.
- O proporcional inclui deputado federal, estadual e distrital. O majoritário inclui presidente, governador e senador, sem vices nem suplentes. As categorias **preta e parda permanecem separadas** nas tabelas.
- **Não são contas julgadas pela Justiça Eleitoral.** Embora o prazo de entrega das contas do segundo turno tenha terminado em 14/11, os arquivos aqui analisados foram **gerados em 13/11**.

## 2. Reconciliação do principal achado: 56,1%

| Indicador no universo proporcional feminino | 04/11/2026 | 13/11/2026, com registro de 14/11 |
| --- | ---: | ---: |
| Candidatas com receita declarada | 6.823 | **6.836** |
| Receita feminina total (R$) | 1.817.663.647,93 | **1.818.708.171,29** |
| Receita de candidatas brancas (R$) | 1.020.050.781,54 | **1.020.354.219,41** |
| Brancas / receita feminina | 56,1188% | **56,1032%** |
| Publicação com uma casa decimal | 56,1% | **56,1%** |

A expressão “56,2%”, anteriormente usada no destaque de `src/data/achados.ts`, não era sustentada pelo arredondamento de nenhuma das duas fotografias; foi corrigida para **56,1%**. Não houve alteração no percentual publicado com uma casa decimal ao passar da extração de 04/11 para a de 13/11.

### Distribuição entre as candidatas com receita declarada — corte de 13/11

| Autodeclaração registrada | Candidatas | Receita feminina (R$) | Participação na receita feminina |
| --- | ---: | ---: | ---: |
| Branca | 3.203 | 1.020.354.219,41 | **56,1%** |
| Parda | 2.332 | 504.365.850,01 | **27,7%** |
| Preta | 1.180 | 258.486.884,20 | **14,2%** |
| Indígena | 81 | 27.557.271,15 | **1,5%** |
| Amarela | 40 | 7.943.946,52 | **0,4%** |
| **Total** | **6.836** | **1.818.708.171,29** | **100%, salvo arredondamento** |

**Denominador das participações:** receita total das candidatas proporcionais com receita declarada, R$ 1.818.708.171,29. Os percentuais **não** comparam mulheres com todos os candidatos. Não há inferência de intenção ou de cumprimento de obrigação legal com base nesses valores agregados.

## 3. Mudanças em receitas e fundo eleitoral

| Indicador | Extração 04/11 (R$) | Nova recontagem 13/11 (R$) | Diferença (R$) |
| --- | ---: | ---: | ---: |
| Receita de todas as candidaturas proporcionais | 5.528.977.659,67 | 5.535.477.655,44 | +6.499.995,77 |
| Receita de candidatas proporcionais | 1.817.663.647,93 | 1.818.708.171,29 | +1.044.523,36 |
| FEFC recebido por candidaturas proporcionais | 3.985.816.377,72 | 3.987.718.761,79 | +1.902.384,07 |
| FEFC recebido por mulheres proporcionais | 1.487.641.408,20 | 1.488.112.078,15 | +470.669,95 |

**FEFC recebido** corresponde às receitas de candidaturas classificadas como `DS_FONTE_RECEITA = FUNDO ESPECIAL`; não equivale automaticamente ao fundo destinado pelo partido, à despesa paga nem a uma aferição de cumprimento das cotas. O total de candidaturas titulares proporcionais com ou sem fundo permanece em **19.531**, sendo **6.953 mulheres**, segundo o registro de 14/11.

Na soma **de titulares dos seis cargos** (proporcionais e majoritários), o FEFC recebido é **R$ 5.031.126.803,95**, dos quais **R$ 1.671.490.753,51** recebidos por candidatas. O denominador dessa segunda soma é diferente e foi calculado separadamente.

## 4. Despesas e financiamento coletivo

| Indicador entre mulheres candidatas a cargos proporcionais | 04/11 (R$) | 13/11 (R$) |
| --- | ---: | ---: |
| Despesas contratadas | 1.658.799.026,22 | **1.668.509.671,93** |
| Despesas pagas com FEFC | 1.378.664.157,46 | **1.389.698.201,03** |
| Despesas pagas com fundo partidário | 124.994.229,29 | **125.921.456,93** |
| Despesas pagas com outros recursos | 130.977.845,00 | **132.316.254,83** |
| Receita de financiamento coletivo | 3.176.783,42 | **3.179.953,72** |

Havia **549** candidatas proporcionais com alguma receita de financiamento coletivo na nova base, ante 548 na anterior. Contratado, pago e arrecadado são medidas diferentes: não somar os valores como se fossem componentes de um mesmo total de gasto.

## 5. Integridade e limites da comparação

- Arquivo de receitas de 13/11: **267.314 linhas brutas**, **977 duplicatas removidas** (R$ 769.441,81 nas duplicatas), **266.337 linhas processadas**, **19.655 candidaturas com receita** entre os universos proporcional e majoritário.
- Tipo de prestação entre candidaturas com receita: **19.333 final**, **203 parcial** e **119 relatório financeiro**. Essas classificações não significam que as contas finais tenham sido aprovadas.
- O cruzamento das receitas retornou **zero candidaturas sem correspondência** no registro e **zero divergências de gênero** por linha.
- Nas despesas, **R$ 0,00 de pagamentos sem prestador identificado** e **zero registros de doador originário sem receita correspondente**, nos critérios do script.
- A base de candidaturas **também mudou**: registro de 27/10, SHA `3a60b9a9...`, para 14/11, SHA `29029414...`. **O universo de 19.531 candidaturas proporcionais e 6.953 mulheres se manteve**, mas, entre candidatas, a distribuição registrada de cor/raça passou de **1.197 pretas e 2.379 pardas** para **1.196 pretas e 2.380 pardas**. Isso documenta uma atualização da classificação na base; **não permite afirmar qual pessoa a solicitou ou por quê**.
- Como os dois arquivos de candidaturas são diferentes, uma parte das variações dos cruzamentos por cor/raça não pode ser atribuída isoladamente a novas receitas. O confronto utiliza os **mesmos scripts e universos**, mas duas fotografias de cadastro distintas.
- A extração financeira de **13/11 antecede o prazo final de 14/11 para o segundo turno**. É necessário consultar nova geração oficial antes de chamar os números de definitivos.

## 6. Arquivos duráveis e reprodutibilidade

Esta pasta conserva apenas **resultados agregados, hashes e metadados**: `receitas-agregadas.json`, `fefc-proporcional.json`, `fefc-titulares.json`, `despesas-agregadas.json`, `registro-agregado.json`, dois resumos e dois arquivos de proveniência. Os CSVs originais não foram incluídos no repositório.

Scripts utilizados, com suas regras documentadas:
- `scripts/recontagem/dinheiro_2026.py`
- `scripts/recontagem/fefc_partidos_2026.py`
- `scripts/recontagem/despesas_doadores_2026.py`
- `scripts/recontagem/snapshot_candidaturas_2026.py`

Execuções de auditoria:
- [Receitas e FEFC — GitHub Actions](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43678550070).
- [Despesas e registro — GitHub Actions](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43678713208).
- [Arquivamento com verificações cruzadas](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43678873294).

## 7. Estado da integração

Na **branch de teste**, os módulos `tse-finance-snapshot.ts`, `fefc-partidos-2026.ts` e `despesas-2026.ts` foram ligados aos resultados agregados, eliminando a duplicação de grandes objetos numéricos manuscritos. O achado dos **56,1%** recebeu data de corte e ressalva das contas não finais.

**Pendente antes de merge/publicação:** nova verificação após 14/11, revisão visual das páginas financeiras, testes manuais de acessibilidade e decisão editorial sobre a fotografia de corte a publicar. O restante dos indicadores eleitorais históricos e as candidaturas do site preservam seus próprios cortes declarados.
