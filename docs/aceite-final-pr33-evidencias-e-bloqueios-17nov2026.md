# Quem são elas? — PR #33 · parecer de fechamento técnico-editorial
**Data:** 17/11/2026 · **Status:** para revisão final, não liberado para merge/deploy
**Branch:** `revista-consolidada-ajustes-de-ritmo-16nov2026` · **Base:** `main`
**Regra:** edição publicada somente após autorização expressa da editora. Este parecer não é aprovação jurídica.

## 1. Resultado da revisão da documentação e fontes primárias

| Item | Conferência desta rodada | Estado de direitos e destino | Crédito / legenda na prévia |
| --- | --- | --- | --- |
| Pagu (retrato) | Referência e restrição em `src/data/fotos.ts` e na matriz de direitos; arquivo retirado da árvore atual do PR | **NÃO REPRODUZIR**; perfil sem imagens por decisão editorial | Sem foto e sem crédito fotográfico na página; ficha tipográfica preservada |
| Lélia Gonzalez (retrato) | Mesma decisão; retrato retirado da árvore atual do PR | **NÃO REPRODUZIR**; perfil sem imagens | Sem foto e sem crédito fotográfico; ficha tipográfica preservada |
| Interface Dados Abertos TSE | Página oficial `Candidatos - 2026` acessível e identificada em 17/11/2026 | **SUBSTITUÍDA** por quadro de fonte + link em Método, Dados e outros cadernos | Referência expressa ao TSE; dados são distintos da interface, sem licença para sua captura |
| Resolução CEN nº 043/2026, União Brasil | PDF oficial TSE acessível (33 páginas); conferida visualmente a página **24/33**, com Resolução de 1º/07/2026, art. 1º (20% majoritárias/80% proporcionais, passível de ajuste) e art. 2º. Número PJe e data de liberação registrados na tabela TSE | **REPRODUÇÃO PARCIAL CONTEXTUAL**, ainda com risco autoral residual: ato partidário privado, sem cessão comprovada; manter restrição a uma página sem anexos pessoais | `FacsimilesFEFC2026.tsx`: identifica União Brasil, nome da resolução, página 24/33, diferença entre critério declarado e repasse efetivo |
| Resolução nº 14/2026, Federação Brasil da Esperança | Processo e data para PT confirmados no índice oficial TSE. Documento e página 10/64 constam do inventário com hash já registrado; PDF excedeu limite da consulta web desta rodada, sem nova inspeção visual independente | **REPRODUÇÃO PARCIAL CONTEXTUAL** com a mesma reserva jurídica; não atribuir o ato exclusivamente ao PT | `FacsimilesFEFC2026.tsx`: identifica autoria da Federação e vínculo processual com o PT |
| Capa PJe do PL | Processo PJe nº 0600974-71.2026.6.00.0000 e data FEFC 20/08/2026 confirmados no índice oficial; a capa 1/34 consta de acervo com hash documentado, mas PDF excedeu limite da consulta web nesta rodada | **REPRODUÇÃO LIMITADA** à capa, sem anexos contendo dados de terceiros | `FacsimilesFEFC2026.tsx`: identifica página, número do PJe, data de geração e caráter meramente identificador da capa |
| Linha SITAQ, Câmara | Consulta oficial acessível; resultado de Julia Zanatta (PL-SC), 10/03/2026 19h20, Diário de 11/03/2026, p. 163, confirmado em 17/11/2026. Índice apresenta um **sumário institucional**, que não é transcrição integral da fala | **REPRODUÇÃO PARCIAL CONTEXTUAL** de metadados, com atribuição à Câmara. Orientação de livre divulgação do *Arquivo Histórico* pode não ser automaticamente aplicável à interface SITAQ; manter verificação específica | Crédito conforme matriz; não chamar de página do Diário nem de transcrição literal |

**Fontes oficiais abertas nesta rodada:**
- [TSE, FEFC 2026, critérios e tabela de processos e datas](https://www.tse.jus.br/eleicoes/eleicoes-2026-content/prestacao-de-contas/fundo-especial-de-financiamento-de-campanha-fefc), conferida em 17/11/2026. O TSE informa que as definições de critérios são decisões `interna corporis` e não são examinadas em seu mérito, ressalvadas cotas de gênero/raça.
- [TSE, PDF oficial União Brasil, PJe 0601251-87.2026.6.00.0000](https://www.tse.jus.br/eleicoes/eleicoes-2026-content/prestacao-de-contas/arquivos/petciv_0601251_87-2026-6-00-0000___uniao_brasil_nacional___criterios_fefc), p. 24/33 examinada visualmente.
- [TSE, Candidatos 2026](https://dadosabertos.tse.jus.br/dataset/candidatos-2026), conferido em 17/11/2026; licença do **dataset** não comprova licenciamento de layout/captura.
- [Câmara dos Deputados, consulta SITAQ](https://www.camara.leg.br/internet/SitaqWeb/ResultadoPesquisaDiscursos.asp?BasePesq=plenario&CampoOrdenacao=dtSessao&PageSize=50&TipoOrdenacao=DESC&btnPesqAvan=Pesquisar&dtFim=31%2F12%2F2026&dtInicio=01%2F01%2F2026&txOrador=Julia+Zanatta).
- [Câmara dos Deputados, orientações de uso do Arquivo Histórico](https://www2.camara.leg.br/a-camara/documentos-e-pesquisa/arquivo/servicos/veja-as-perguntas-frequentes), item 7.
- Inventário de procedência e SHA-256 em `docs/acervo-facsimiles-tse-camara-16nov2026.md`. **Esta rodada não repetiu a comparação binária local dos PDFs grandes**, nem inspeção integral de anexos.

## 2. Verificações do código e pacote (evidências já executadas)

- [QA de perfis sem imagem, run 44013232674](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/44013232674): 27 páginas/cenários em três larguras, zero violações axe selecionadas, zero erros, com confirmação da ficha e ausência de imagens nas aberturas.
- [QA integral, run 44013150870](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/44013150870): 43 rotas, 86 capturas, zero falhas objetivas.
- [QA de integridade, run 44013150951](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/44013150951): 399 páginas HTML, 19.841 ocorrências de links internos válidas, 34 arquivos de mídia locais válidos, zero links locais quebrados, três mídias restritas ausentes.
- [QA de reflow e teclado, run 44012943826](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/44012943826): 33 cenários, três interações por teclado, nenhuma falha.
- Quatro workflows de áreas editoriais no `HEAD` 293fb59 concluídos com sucesso; o código permaneceu em PR draft.
- Alterações pontuais posteriores à última auditoria integral: correção de transparência no cabeçalho do inventário, e **metadados sociais** das rotas Pagu e Lélia alterados de `summary_large_image` para `summary`, pois não há imagem. Aguardar a execução no novo HEAD.

## 3. Bloqueios que impedem aprovação final
1. **Histórico público do GitHub:** remover os dois retratos do HEAD não elimina arquivos de commits anteriores ou da `main`. É necessário definir estratégia de saneamento sem interromper o trabalho de outras branches. Não reescrever histórico, fazer merge nem publicar sem deliberação específica.
2. **Direitos de quatro fac-símiles:** os fundamentos jornalísticos e a proporcionalidade estão documentados, mas não existe cessão expressa; a orientação do Arquivo Histórico não se estende automaticamente ao SITAQ. A publicação deve contar com revisão jurídica ou uma decisão editorial expressa que assuma de modo fundamentado o uso restrito, após avaliação de risco.
3. **Acessibilidade humana:** navegação completa com teclado, menus, tabelas e filtros, zoom **nativo** 200% em navegador e leitura NVDA/VoiceOver não foram executados; o QA automatizado não substitui esse aceite.
4. **Destinos externos:** 597 ocorrências foram detectadas no HTML publicado pela ferramenta, mas o teste de integridade só validou links internos; nem todos os endereços externos foram reabertos. Os principais links de TSE e Câmara acima foram rechecados.
5. **Design:** Pagu e Lélia **permanecem sem imagem** por decisão da editora. A aprovação estética do conjunto e a autorização de publicar continuam exclusivas da editora.

## 4. Condição para etapa 5
**Nenhuma ação de merge, deploy HostGator ou modificação do site público nesta rodada.** Após decisões sobre os bloqueios e aceite expresso, conferir a versão integrada no domínio público com navegação, rotas, mídia/documentos, adaptação ao celular, dados e plano de rollback.

Este registro substitui declarações pretéritas de `QA pendente` ou `peças gráficas candidatas à aprovação` no PR sem apagar o histórico de trabalho e suas datas.


## 5. Reconciliação do indicador de financiamento (conferência do código, 17/11)

No material versionado efetivamente utilizado pela aplicação, `src/data/tse-finance-snapshot.ts` importa `docs/auditorias/financiamento-2026-15nov/receitas-agregadas.json`, com fotografia financeira **gerada em 15/11/2026, 04h05min10s** e cadastro eleitoral gerado às 05h30min40s do mesmo dia; a proveniência e os hashes são identificados no [relatório de recontagem](auditorias/financiamento-2026-15nov/RELATORIO.md).

Para **candidatas proporcionais com receitas declaradas** (deputadas federais, estaduais e distritais, sem suplentes ou vices): **3.203 candidatas autodeclaradas brancas com receita** somaram R$ 1.020.920.855,30; o total de receita das **6.836 candidatas proporcionais com receita**, de todas as categorias raciais, foi de R$ 1.819.706.552,93; resultado documentado **56,1036% = 56,1% com uma casa**. O denominador **não** é a receita de candidaturas de todos os gêneros, nem exclusivamente FEFC, nem gasto declarado. Cor/raça preta e parda permanecem separadas no relatório: 14,2% e 27,7%, respectivamente, no mesmo universo e período. Valores extraídos do relatório versionado; nesta rodada não foi feito novo download do TSE nem reprocessamento integral do CSV.

A antiga divergência editorial **56,1% vs. 56,2%** não autoriza usar os dois números indistintamente. Para o recorte **atualmente integrado de 15/11** a forma sustentada é **56,1%**. Qualquer menção histórica a **56,2%** deve explicitar base, corte, universo e método distintos ou ser retirada; a origem exata do valor antigo não foi demonstrada nesta conferência.
