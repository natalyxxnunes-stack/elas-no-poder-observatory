# Revisão integrada — Quem controla?, Dinheiro e Na voz delas

**Data:** 16 de novembro de 2026. **Ambiente:** [PR #33](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/pull/33), branch `revista-consolidada-ajustes-de-ritmo-16nov2026`, comparada diretamente com `main`. **Prévia, não publicado, sem merge ou deploy.**

## Ponto de partida

A editora indicou que a sequência de fundos brancos/cremes e a ausência de fotografias/documentos comprometiam a revista construída nos pilotos. Antes de alterar, foram examinadas as rotas `/quem-controla`, `/dinheiro`, `/na-voz-delas` e `/reportagens`, componentes de documentos e registros em `docs/acervo-facsimiles-tse-camara-16nov2026.md`, os manuais e a matriz vinculante. A análise confirmou que **nem toda página precisa de fotografia de pessoa**: em investigação de decisões partidárias, distribuição de FEFC e discursos públicos, a **prova real** muitas vezes é uma página de documento oficial, um gráfico verificável ou o índice da publicação original. A ausência desse material no lugar certo da página prejudica a linguagem de revista.

## Mudanças efetivamente aplicadas

| Rota | O que já existia | O que foi aplicado | O que NÃO foi modificado |
|---|---|---|---|
| `/quem-controla` | Abertura roxa, arquivo dos processos FEFC em tinta e **reprodução literal** da capa PJe do PL em coral profundo | Cinco alavancas numeradas em plano roxo com papel para leitura e estado de evidência; capítulo da Lei 9.504/1997 em tinta com painel local e link de fonte claro | Texto jurídico, ressalvas, identificação de processo, lista das cinco decisões, estados e dados |
| `/dinheiro` | Abertura roxa, gráficos de dados fiscais, FEFC em dourado, mas sem as duas páginas originais de resoluções na própria rota | Inclusão de `DuasResolucoesFEFC` **entre critérios e discussão da execução**, exibindo duas reproduções de PDFs do TSE, cada uma com legenda e link; capítulo gênero × cor/raça em tinta com os gráficos sobre papel | Valores, universo, declarantes, data de corte, componentes de cálculo, categorias pretas e pardas |
| `/na-voz-delas` | Citações contextualizadas; recorte de catálogo autêntico da Câmara no caderno de fontes; repetição de fundos quase brancos | Alternância planejada de tinta, roxo e papel; destaques dos **dados oficiais** em dourado e manutenção da proveniência de todos os discursos | Citações literais, nome das pessoas, posição, fonte original, versão delas, critérios, dados, links |
| `/reportagens` | Alternância madura: fotografia da Câmara corretamente contextualizada, seis gráficos de votos, capítulos de tinta/coral/roxo, fonte verificável | **Sem alteração**; referência para comparação | Todo o conteúdo |

## Proteção da evidência documental

- **FEFC União Brasil:** reprodução literal da primeira página da Resolução CEN nº 043/2026 (página 24/33 do arquivo PJe), conforme `docs/acervo-facsimiles-tse-camara-16nov2026.md`.
- **FEFC Federação Brasil da Esperança:** página 10/64 no processo encaminhado pelo PT, que registra a Resolução nº 14/2026 da Federação; **não é declaração de critério exclusivo do PT**.
- **PJe PL:** a capa identifica processo e anexos, não os valores distribuídos a candidaturas.
- **Discursos Câmara:** `camara-sitaq-julia-zanatta-2026-03-10-p163.png` é um recorte da **linha de índice da pesquisa**, não uma reprodução da página 163 do Diário nem prova suficiente do teor da fala. A reportagem mantém o link do Diário.
- **Fotografia do plenário em Reportagens:** mostra sessão de maio de 2023 e não as seis votações documentadas.
- Direitos dos fac-símiles e eventual exposição de dados pessoais devem ser reavaliados **antes de publicar**; esta rodada não constitui autorização jurídica. As imagens TSE renderizadas foram selecionadas previamente para evitar anexos contendo dados pessoais desnecessários.

## Testes e observação das páginas inteiras

[GitHub Actions #43971435624](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43971435624): build TypeScript e HostGator aprovados, **15 verificações** em cinco rotas × desktop 1440 px / celular 390 px / reflow 320 px, sem falhas axe-core selecionadas, erros de JS ou overflow de página; **seis interações e validações de documentos** aprovadas em computador/celular. Foram verificados cinco mecanismos e seu campo de evidência, link à lei, capa PJe, as **duas imagens de resolução FEFC** com alt/figcaption/carregamento e o **recorte do índice da Câmara** com navegação à fala armazenada. Arquivo [com dez capturas integrais e JSON](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43971435624/artifacts/14279395493), sujeito à retenção do Github.

**Revisão visual manual indicativa:** capturas integrais exibem `Quem controla` com sequência roxo → tinta → coral documental → roxo nas alavancas → tinta na lei; `Dinheiro` apresenta roxo → tinta → dourado → resoluções originais no roxo → consulta escura; `Na voz delas` mostra capítulos de citações sobre tinta e roxo com os dados oficiais em dourado e caderno documental no mesmo dourado; `Reportagens` permanece referência com fotografia real/contexto. Áreas de papel permanecem para tabelas e citações legíveis; não são o único plano da página. Esse registro **não equivale a aceite editorial**.

## Limites

A ferramenta automatizada **não testa** NVDA/VoiceOver, reflow a zoom real de 200–400% nem a relevância estética de cada escolha; capturas são apenas da página em estado inicial. Não foram verificadas juridicamente nesta rodada as licenças de Lélia, Pagu e todos os fac-símiles. Nenhum dado foi reextraído do TSE. **A publicação depende da decisão expressa da editora.** Continuar no mesmo PR #33 e no mesmo manual.
