# Quem são elas? — auditoria das páginas completas (lote 5)

**Data:** 16/11/2026 · **Estado:** diagnóstico **não aprovado como composição visual final**, em [PR #12](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/pull/12). Sem deploy ou merge. **Referências:** captura integral das cinco rotas no [QA #43798365553](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43798365553) (1440 e 390 px), código da branch, `docs/manual-visual.md`, registro de fotografias `src/data/fotos.ts`.

## Diagnóstico transversal

O lote 5 organizou a consulta, preservou bases eleitorais e corrigiu rótulos importantes, mas **as páginas completas continuam excessivamente claras, repetitivas e próximas de um portal de consulta**. As seções longas são apresentadas como tabelas e gráficos quase ininterruptos, com pouca evidência documental e poucas mediações editoriais. Inserir foto apenas na primeira dobra **não corrigiria o problema**.

- **Partidos:** captura móvel 390 × 14825 px; sequência de cartões por sigla, duas tabelas de candidaturas/dinheiro e matriz extensa de votações.
- **Funil:** 390 × 11423 px; abertura forte, porém os três universos visualizados como “etapas” podem sugerir falsa transição individual; consulta por UF predomina sobre o miolo.
- **Histórico:** 390 × 20652 px; repetição de séries e painéis lilás de cor/raça; o caderno das quatro fontes oficiais é pouco valorizado como material documental.
- **Monitor:** 390 × 11000 px; ampla abertura em tinta e tabela contínua de deputadas, com pouca presença dos registros primários e acesso móvel limitado a rolagem.

## Mapa de intervenção por página inteira

### Partidos — `src/routes/partidos.tsx`

**Preservar:** manchete, gráfico por cor/raça (pretas e pardas separadas), índice das quatro áreas, recortes de eleitas, taxa de eleição, FEFC, votos de bancada, limites e fontes.

1. Em `#eleitas`: manter gráfico como argumento principal, com leitura sucinta e tabela integral em camada consultável. No celular, seleção de partido antes da lista longa de cartões.
2. Em `#lanca-elege`: diferenciar visualmente a taxa de eleição da composição das cadeiras, com numerador e denominador visíveis.
3. Em `#fundo`: introduzir **documento primário real do TSE** com critérios formais de FEFC (PJe, data, inteiro teor quando disponível), distinguindo critério declarado de recebimento efetivo, antes do detalhamento financeiro.
4. **P0 editorial:** retirar o risco de que a faixa coral abaixo de 30% no **recorte só de deputados** funcione como carimbo de infração à cota legal do partido. A ressalva jurídica deve acompanhar o dado na leitura principal, não apenas no rodapé. Não alterar números nem inferir irregularidade.
5. Em `#votos`: oferecer matriz interpretativa sintética das seis votações e depois tabela completa; maioria da bancada não significa unanimidade.

### Funil — `src/routes/funil.tsx`

**Preservar:** roxo de abertura, recortes separados, total de candidaturas por universo, proporção de cadeiras, distinção entre candidatura e vaga.

1. Em `#etapas`: não apresentar três universos diferentes como se fossem a mesma população reduzida progressivamente; rótulos e desenho devem impedir confusão.
2. Em `#disputa`: seleção de UF/recorte e visualização focalizada antes da tabela completa, preservando o acesso integral.
3. Em `#contexto` e `#chapas`: desenvolver a explicação das regras eleitorais como pausa de reportagem, evitando outra faixa de caixas equivalentes.
4. Material de origem: registros TSE Candidatos e Vagas. **Não inserir foto genérica de urna/fila/porta apenas para sugerir exclusão.** Preferir visualização original e documentação.

### Histórico — `src/routes/historico.tsx`

**Preservar:** quatro anos e datas, gráficos de gênero × raça, categorias separadas, pontos sem informação como “sem dado”, nota da lacuna de 2018 no Senado, data de 2026 verificada como 27/10.

1. Retirar dominância de lilás claro e as sucessões de painéis gráficos indistintos; dividir leitura por perguntas com intervenções editoriais e contrastes de formato.
2. Em `#genero`, `#raca`, `#genero-raca`: destacar achados sem confundir denominadores das diferentes séries; nenhuma cor ou agregado racial novo.
3. Em `#eleitas`: separar candidaturas e assentos; manter série completa consultável.
4. Em `#cargo-uf`: filtro por cargo/UF antes do quadro completo, sobretudo no celular.
5. Em `#bases`: organizar verdadeiro **caderno documental TSE**, com identificação e links para arquivos de 2014, 2018, 2022 e 2026; não inventar imagem antiga.
6. Foto de Bertha Lutz (1927) já catalogada **não documenta** a série 2014–2026; não usar como imagem substituta.

### Monitor — `src/routes/monitor.tsx`

**Preservar:** corte 01/01–03/11/2026, coleta 04/11/2026, 99 parlamentares no universo do arquivo (verificar a cada nova base), métricas de voto **ou presidência de sessão**, coautorias e falas, pré-registro 2027.

1. Em abertura e índice, reduzir o paredão de texto no celular e dar acesso rápido à consulta e ao pré-registro.
2. Inserir junto ao corpo **fotografia verdadeira com legenda histórica específica** quando documentar a atividade parlamentar (candidato: `/fotos/plenario-camara-junho-2026.jpg`, sessão 30/06/2026, Thiago Cristino/Câmara, licença CC BY registrada). **Não representa as votações do período.**
3. No celular, seleção/pesquisa e ficha expansível antes da tabela longa, mas com acesso à tabela integral.
4. Diferenciar votos registrados ou presidência, assinaturas de proposições incluindo coautoria e discursos registrados; não tratar contagens como qualidade de mandato.
5. Destacar o pré-registro 2027 como **compromisso metodológico datado** distinto dos resultados de 2026, e aumentar links para registros oficiais quando verificáveis.

## Repertório documental já disponível

- [TSE — critérios formais por partido e respectivos documentos FEFC 2026](https://www.tse.jus.br/eleicoes/eleicoes-2026-content/prestacao-de-contas/fundo-especial-de-financiamento-de-campanha-fefc). Critérios publicados não demonstram destinação individual ou qualidade das escolhas internas.
- [TSE — valores da distribuição do FEFC entre partidos](https://www.tse.jus.br/eleicoes/eleicoes-2026-content/prestacao-de-contas/distribuicao-dos-recursos-do-fundo-especial-de-financiamento-de-campanha-fefc-eleicoes-2026).
- [Banco de Imagens da Câmara](https://www.camara.leg.br/banco-imagens/): condições CC BY e formato do crédito. O repositório já contém fotografias registradas em `src/data/fotos.ts`; não reutilizar a imagem principal da homepage por inércia nem usar a foto de Pagu com licença pendente.
- Série e registros de origem do TSE que o projeto já usa: `src/data/historical-series.ts`, `src/lib/tse/historical.reads.ts`, `src/data/resultado-2026.ts`.

## Governança e prioridade

**Ordem proposta:** Partidos → Histórico → Monitor → Funil. Cada rota é unidade editorial **integral**: abertura, narrativa, consultas, documentação, enceramento, desktop e celular. Proteger `main`, homepage, logo, `src/data`, fotos e métodos até decisões específicas. Preservar acertos anteriores. Realizar nova prévia visual para página completa, com revisão editorial explícita **antes** de merge/deploy; QA técnico sozinho não equivale a aprovação estética.

A versão integral desta auditoria, incluindo matriz de seções e capturas montadas, foi entregue à editora em arquivo Markdown e pacote de continuidade na conversa de 16/11/2026.
