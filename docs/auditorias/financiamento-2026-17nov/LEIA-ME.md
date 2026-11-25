# Prestação de contas TSE 2026 — fotografia de 17/11/2026

**Status: atualização preparada em PR de revisão. Os arquivos deste diretório não implicam publicação ou julgamento das contas.**

## Arquivos e cortes oficiais

| Conjunto | Gerado em 17/11/2026 (horário do arquivo TSE) | SHA-256 do CSV |
|---|---|---|
| Candidaturas | 19:31:29 | `51a7b2d098e6d3712b75dc6364faad8183bad16c72b63298a0a6e41403e538cf` |
| Receitas | 09:03:49 | `5c9b1e0456a8aa75bdecc5ac7ffc2bb52d4bbaa0099ec675a13b6ab73c0e04ba` |
| Despesas contratadas | 04:05:11 | `f185717ac6ffba0b04dfa5be56435e75a6071b19f570999232a5e49548bcfe9c` |
| Despesas pagas | 04:05:24 | `f57eddcdbf270f4d03a8dce53e95aefff1e9d1900cf3c1d76f209eeddb820b6d` |

O arquivo `manifest.json` guarda ainda os hashes dos ZIPs originais e a advertência sobre o resultado eleitoral incompleto. Arquivos CSV brutos e identificadores de pessoas não são versionados.

Fontes: [Candidaturas TSE](https://dadosabertos.tse.jus.br/dataset/candidatos-2026) e [Prestação de Contas TSE](https://dadosabertos.tse.jus.br/pt_BR/dataset/prestacao-de-contas-eleitorais-2026).

## Universo, método e validação

Unidade de análise: candidatura titular, identificada por `SQ_CANDIDATO`. Proporcionais: deputado federal, estadual e distrital. Majoritárias: presidente, governador e senador. Vices e suplentes ficam fora. Valores de receitas somados por candidatura em todos os turnos; linhas integralmente idênticas entram uma única vez, mantendo lançamentos diferentes do mesmo recibo. Cor/raça é declarada, com PRETA e PARDA separadas. Cálculos de FEFC consideram somente lançamentos com `DS_FONTE_RECEITA=FUNDO ESPECIAL`. Despesas contratadas e pagas não devem ser somadas como se fossem a mesma medida; pagamentos vinculados pelo `SQ_PRESTADOR_CONTAS`. Doador originário é unido à candidatura por `SQ_RECEITA`. CPF não é armazenado aqui.

Os números foram recontados de duas formas: scripts publicados em `scripts/recontagem/` e conferência independente no PR de auditoria #34. Foram conciliados **14 totais financeiros**, todos com diferença R$ 0,00, e realizados 105 controles de soma das agregações.

## Principais alterações em comparação com 15/11/2026

| Indicador (titulares) | 15/11 | 17/11 | Diferença |
|---|---:|---:|---:|
| Candidaturas com receita declarada | 19.660 | 19.665 | +5 |
| Prestação FINAL | 19.363 | 19.383 | +20 |
| Prestação PARCIAL | 195 | 186 | -9 |
| RELATÓRIO FINANCEIRO | 102 | 96 | -6 |
| Receitas totais declaradas | R$ 7.020.242.106,44 | R$ 7.021.570.001,15 | +R$ 1.327.894,71 |
| Receitas declaradas por mulheres | R$ 2.038.152.482,43 | R$ 2.038.564.843,63 | +R$ 412.361,20 |
| FEFC recebido | R$ 5.031.966.889,00 | R$ 5.032.571.764,23 | +R$ 604.875,23 |
| FEFC recebido por mulheres | R$ 1.672.035.872,98 | R$ 1.672.271.447,53 | +R$ 235.574,55 |

Receitas proporcionais das mulheres brancas representam 56,1115% do total recebido pelas candidaturas femininas proporcionais; com uma casa decimal, **56,1%**. Dados de 17/11.

O prazo de apresentação das contas finais relativas ao segundo turno foi prorrogado de 14 para **16/11/2026**, nos termos da Portaria TSE nº 741/2026 e [comunicação oficial](https://www.tse.jus.br/comunicacao/noticias/2026/Novembro/prazo-para-prestar-contas-relativas-ao-2-turno-e-adiado-para-16-de-novembro). Ainda existem contas parciais e relatórios financeiros; mesmo quando o tipo é `FINAL`, isso **não significa aprovação** da prestação.

## Separação deliberada dos cortes

- **Financiamento**: dados de 17/11/2026, conforme horário registrado individualmente em cada CSV.
- **Candidaturas para cruzamento financeiro**: 17/11/2026, às 19:31:29.
- **Eleitas e eleitos para cargos titulares**: resultados consolidados da base íntegra de 27/10/2026. O arquivo de 17/11 apresentava déficit de 8 cadeiras federais e 24 estaduais, o que reduziria artificialmente o total de mulheres eleitas de 342 para 333. Retificação em 25/11/2026: a atribuição anterior a Rondônia não foi comprovada, e o arquivo daquele corte não está disponível para nova conferência. Em 25/11, a lacuna foi localizada no Amapá. Não utilizar a fotografia incompleta na contagem eleitoral.
- **Análises históricas de reeleição e votação**: conservar cortes próprios, inclusive 04/11, até reexecutar as metodologias específicas. Uma atualização financeira agregada não reproduz automaticamente essas análises.
- **Senado em 2027**: projeção de 29 cadeiras do PL, sujeita às substituições e mudanças partidárias.
- Uma candidatura no universo majoritário está sem classificação racial nas cinco categorias; sua receita e FEFC são zero, e não há imputação.

## Preparação para publicação

- [x] Arquivos JSON agregados importados, com hashes, sem arquivos pessoais.
- [x] Camadas de receita, FEFC e despesas apontam para 17/11.
- [x] Textos correntes de Dinheiro, Partidos, Achados, Método e Calendário revisados.
- [x] Dados de resultado eleitoral íntegro preservados.
- [x] Testes de integridade, build estático HostGator e lint do escopo alterado aprovados no GitHub Actions, execução [44217755988](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/44217755988). O lint global, pré-existente, acusa problemas de formatação fora do escopo e não foi usado como bloqueio desta revisão.
- [ ] Homologação visual das páginas efetivamente afetadas e conferência editorial final.
- [ ] Aprovação explícita para integrar na branch `main`.
- [ ] Gerar pacote estático e publicar na HostGator por procedimento habitual, após backup.

**Nenhuma mudança do desenho editorial, da identidade ou das fotografias integra esta proposta.**
