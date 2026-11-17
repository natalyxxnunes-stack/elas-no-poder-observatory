# Histórico da descrição anterior do PR #33

**Data do registro:** 17/11/2026. **Motivo:** consolidar a descrição principal do PR para o aceite final sem apagar o histórico editorial e tecnológico da versão de prévia.

**Advertência:** o conteúdo a seguir é uma transcrição documental da descrição anterior, com etapas e decisões superadas. Pode conter referências a fotografias e colagens removidas; não usar como especificação vigente. Para a decisão atual, consultar `docs/aceite-final-pr33-evidencias-e-bloqueios-17nov2026.md` e os capítulos mais recentes dos manuais.

---

## ESTADO ATUAL — 17/11/2026 (decisão editorial prevalente)

**Pagu e Lélia Gonzalez: SEM IMAGENS.** A editora rejeitou as colagens e decidiu adiar qualquer solução visual nessas duas páginas. As peças SVG foram retiradas da árvore, as duas rotas exibem somente biografia, indicadores, fichas eleitorais e fontes; o modo de prévia com fotografias foi removido e os dois binários fotográficos sem direitos esclarecidos foram retirados da árvore atual do PR. **Não recolocar imagem nem retomar o redesign dessas páginas sem nova decisão editorial.**

**Atenção:** textos abaixo são histórico acumulado do PR e descrevem estados anteriores, inclusive fotografias de prévia que **não estão mais no HEAD**. A versão vigente está documentada no capítulo 36 dos manuais e em `docs/fechamento-etapas-2-a-5-pr33-16nov2026.md`. Arquivos antigos podem seguir acessíveis no histórico público do GitHub e na `main`; o PR não autoriza reescrita de histórico, merge ou publicação.

**Etapas restantes:** conferir CI no HEAD, revisão final de direitos/créditos/fontes e testes humanos de acessibilidade. **PR permanece draft, sem merge/deploy.**

---

## Consolidação de todas as etapas da revista em um único PR de prévia

**Este PR está baseado em `main`, mas foi criado exatamente a partir do head do PR #32**, sem recomeçar o desenho e sem fechar/deletar os PRs empilhados. O diff mostra todo o trabalho acumulado e as correções finais de ritmo no miolo das páginas. A âncora **vinculante** é `docs/design/ANCORA-EDITORIAL-PILOTOS-16NOV2026.md` (Quem entrou? / Método / Reportagens).

### O que foi recuperado no desenho

- **Lélia Gonzalez:** capa roxa com caderno eleitoral real em reprodução tipográfica, bloco documental dourado, biografia como plano de leitura sobre tinta e intervalo em tinta com as duas eleições; **sem foto não licenciada**.
- **Pagu:** capa de tinta e **fotografia histórica dentro da moldura coral somente no build de prévia**, com legenda e aviso de direitos pendentes; no build normal a foto continua bloqueada e o registro tipográfico permanece. Biografia e intervalo de votação em capítulos diferenciados.
- **Direitos:** cronologia com faixa roxa para os anos e campo de leitura claro; capítulo Pioneiras em tinta; sem simulação documental.
- **Quem chega?:** capítulos de Senado, cor/raça, território e poder em superfícies distintas, painéis de leitura em papel, fotografia da bancada anterior à eleição com contexto explícito.
- **Votos:** consulta territorial em tinta com dados sobre papel; conceitos e três denominadores preservados.
- **Downloads/Materiais:** catálogo em creme quente e base CSV em plano de tinta, metadados e arquivo verificáveis.
- **Sobre:** seções institucionais com ritmo de creme/tinta e política de correções destacada, sem fotografia fictícia.

Nenhuma nova identidade: **logo e homepage intocados; roxo estrutural, tinta, coral profundo com letra clara, dourado e creme original; sem vinho, ilustração de IA, CSS global ou mudança de dados/denominadores.**

### Fotografia: diferenciação entre revisão e publicação

- A fotografia de Pagu **já existia** em `public/fotos/pagu-patricia-galvao-anos-1920.jpg`. `src/data/fotos.ts` continua com `verificacao-pendente`. A compilação da foto exige flag explícita `VITE_QSE_PREVIEW_PAGU_FOTO=true`; **build normal NÃO inclui esse retrato**.
- A referência do Commons para Lélia (atribuída a Cezar Loureiro) foi recuperada documentalmente, mas não incluída no site por ausência de liberação de direitos. Não atribuir a ausência da foto a uma decisão estética.
- Quatro fac-símiles do PR #27 e a interface capturada do TSE permanecem sujeitos à revisão editorial/jurídica individual.

### Verificação e memória

- [GitHub Actions #43950227435](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43950227435): **sucesso** — build normal com retratos pendentes bloqueados, build especial de prévia de Pagu, 9 URLs × 3 larguras = 27 verificações axe selecionadas, zero violações ou erros de execução, 18 screenshots.
- Manuais original e normativo atualizados no **capítulo 25**. Matriz de fotografia/documentos/gráficos atualizada.
- [Diagnóstico visual e registro de consolidação](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/blob/revista-consolidada-ajustes-de-ritmo-16nov2026/docs/revisao-de-ritmo-e-consolidacao-16nov2026.md), com comparação quantitativa *indicativa* das capturas e ressalvas editoriais.

**Resta avaliação visual humana de páginas completas, zoom real 200%, leitor de tela e revisão jurídica das reproduções.** Não transformar teste automático em aceite estético. **Manter o PR em draft; sem merge, deploy, atualização HostGator ou Lovable sem aprovação expressa.**

### Fechamento do percurso: Achados, Barreiras e Histórico (16/11/2026)

- **Achados preservada sem alteração**: abertura em tinta, temas alternados, fichas com gráficos/fonte e links individuais já atendem à identidade editorial.
- **Barreiras ajustada no miolo**: processos TSE/MPF em capítulo de tinta com dois gráficos intactos; feminicídio em creme quente; formas documentadas em roxo com leitura em papel; critérios em creme. Lei 14.192/2021, painel e arquivo MPF continuam como **três fontes de natureza distinta**, sem falsa reprodução.
- **Histórico ajustado no percurso**: primeira série em creme quente, interlúdio editorial de tinta entre comparações por cargo e por UF, preservados gráficos, anos, as cinco categorias raciais, denominadores próprios e quatro fontes TSE. Sem foto anacrônica.
- **QA aprovado:** [#43956945141](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43956945141) — 5 URLs (incluindo homepage/Método) × 3 tamanhos = **15 verificações**, sem violações automáticas selecionadas; **6 interações em desktop/celular** e dez capturas integrais. [Revisão integral e relatório de fontes/imagens](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/blob/revista-consolidada-ajustes-de-ritmo-16nov2026/docs/revisao-integrada-achados-barreiras-historico-16nov2026.md).
- **Manuais original e normativo atualizados no capítulo 26**, matriz de fotografias/documentos/gráficos atualizada; todas as decisões anteriores permanecem.
- A rodada **não altera** homepage, logo, CSS global, dados, textos de apuração, fotos, fac-símiles e condições de licença. Não iniciar novo redesign. Continuação e aceite apenas por este PR #33; **sem merge/deploy**.


### Correção de imagens e cor — capítulo 27

**Motivo:** a editora rejeitou novamente a predominância de creme e branco e a apresentação das páginas sem fotografias já pesquisadas. A mudança foi aplicada **na própria PR #33**, sem criar outra identidade, sem afetar a homepage, o logo, bases/denominadores ou o CSS global.

- **Pagu e Lélia Gonzalez:** fotografias reais recuperadas nos perfis, com molduras editorialmente distintas, crédito e ressalva de direitos. A foto de Pagu já existia no acervo; a de Lélia foi catalogada no [Commons](https://commons.wikimedia.org/wiki/File:L%C3%A9lia_Gonzalez_by_Cezar_Loureiro.jpg), autoria atribuída a Cezar Loureiro, e arquivada **fora da pasta pública**, em `docs/acervo-em-revisao/`. **Nenhuma das duas aparece no build normal**; ambas exigem flags de prévia e cópia temporária apenas no workflow, até decisão jurídica individual.
- **Barreiras:** fotografia documental da Câmara, Kayo Magalhães, utilizada em [notícia sobre o PL 1446/25, de julho de 2026](https://www.camara.leg.br/noticias/1286346-PROJETO-AMPLIA-PROTECAO-CONTRA-VIOLENCIA-POLITICA-DE-GENERO-NA-PRE-CANDIDATURA). Foto de arquivo não registra crime nem votação. Classificação de direitos **uso-livre-com-credito** segundo [guia da Câmara](https://www2.camara.leg.br/comunicacao/assessoria-de-imprensa/guia-para-jornalistas/noticias-e-fotografias), sem reivindicar CC BY não indicada; fundo e capítulos em tinta/roxo, painéis claros só para leitura.
- **Histórico:** fotografia de Saulo Cruz/Agência Senado de **04/10/2026**, primeiro turno em Brasília, [CC BY-SA 4.0 no Commons](https://commons.wikimedia.org/wiki/File:Elei%C3%A7%C3%B5es_2026_-_Primeiro_turno_(55567948757).jpg). A foto contextualiza apenas 2026; não ilustra retroativamente os pleitos anteriores. Revisto o uso reiterado do creme, mantidas séries, categorias raciais, universos e cores semânticas. Painel localizado resolve contraste do quadro de leitura.
- **Achados:** capas temáticas em tinta, ameixa profunda e papel. Violeta claro foi testado e rejeitado por contraste insuficiente; a versão final usa o roxo do sistema, preservando fichas e gráficos. 
- **Evidência:** [#43963428655](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43963428655) aprovado em 15 verificações e 6 interações; [#43963428712](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43963428712) aprovado no teste de build normal vs. foto especial. Capturas desktop e celular em ambos. Os números não comprovam aceite editorial ou direitos de publicação.
- **Manual original e `docs/manual-visual.md` atualizados no capítulo 27**, matriz de imagens complementada, com [relatório de proveniência e SHA-256](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/blob/revista-consolidada-ajustes-de-ritmo-16nov2026/docs/recuperacao-fotografias-e-contraste-16nov2026.md).

**Governança:** Esta PR permanece **draft, sem merge, deploy nem Lovable**. Não liberar os retratos de Lélia e Pagu para produção antes da verificação individual; a editora mantém o aceite final da direção visual.


### Nova rodada: investigações, falas e documentos reais — capítulo 28

**Continuação da identidade aprovada, sem refazer o projeto.** No PR #33 foram realizados **três ajustes de páginas completas** e uma página de controle preservada:

- **Quem controla?**: cinco alavancas agora em fichas numeradas sobre roxo, com estados de evidência intactos; capítulo jurídico em tinta com leitura clara; capa de processo PJe **real** do PL e catálogo FEFC anteriormente presentes permanecem no corpo da página.
- **Dinheiro**: capítulo Gênero × cor/raça em tinta, gráficos sobre papel; **duas páginas originais** já auditadas do FEFC agora aparecem na própria rota, imediatamente após o capítulo de critérios. Resoluções União Brasil 043/2026 e Federação Brasil da Esperança 14/2026 (esta última **anexa ao processo do PT, não exclusiva do PT**). Critérios publicados não demonstram repasses a candidaturas ou infração legal. Licença dos recortes pendente como no PR #27.
- **Na voz delas**: alternância tinta/roxo/papel entre as falas, dado oficial em dourado; preservados trechos literais, fontes, contexto e recorte **autêntico** do índice de discursos da Câmara. Não foram incluídas fotografias de parlamentares meramente ilustrativas.
- **Reportagens**: permaneceu intacta como referência, inclusive fotografia de plenário de 2023 com legenda que explica não registrar as seis votações.

**QA [#43971435624](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43971435624) sucesso:** 15 auditorias de 5 rotas × 3 larguras, zero violação automática selecionada, 6 interações/documentos verificados em computador e celular; 10 capturas integrais no [artefato](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43971435624/artifacts/14279395493). Os manuais originais foram atualizados no **capítulo 28**, junto com a matriz e o [relatório integral](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/blob/revista-consolidada-ajustes-de-ritmo-16nov2026/docs/revisao-investigacoes-documentos-16nov2026.md).

**Critério de encerramento:** conservar a âncora dos pilotos e a logo, não substituir fotos/documents por IA, verificar direitos antes de publicação e realizar aceite visual de página inteira. Este PR segue draft, sem deploy ou merge. 


### Visibilidade de imagens e fontes em tamanho real — capítulo 29

Revisão motivada por feedback da editora: a prancha anterior **não permitia enxergar as imagens** por comprimir páginas longas demais. As capturas integrais continuam arquivadas para a leitura do ritmo, mas as fotografias/documentos passam a ser apresentados também em **recortes legíveis na proporção original**, com legenda e identificação do que se vê.

**Verificação de presença efetiva nas quatro páginas:**
- `/quem-controla`: imagem da capa original do PJe do PL/TSE, no capítulo coral — **capa**, não critérios ou repasses.
- `/dinheiro`: duas páginas autênticas de resoluções FEFC (União Brasil e Federação Brasil da Esperança, anexa ao PJe do PT), no capítulo roxo.
- `/reportagens`: fotografia de maio de 2023 do plenário da Câmara contextualizada como arquivo, **não** registro das seis votações.
- `/na-voz-delas`: captura literal **de uma linha do índice** de discursos da Câmara, anteriormente pequena e no fim da página. A imagem agora aparece, ampliável e contextualizada, em caderno próprio roxo imediatamente após a abertura; o número **163** funciona como referência de página do Diário e a legenda esclarece que o recorte **não é** a página do Diário nem prova isolada da fala. A imagem duplicada no final foi retirada.

Arquivos alterados: `src/routes/na-voz-delas.tsx`, `src/components/editorial/IndicesDocumentaisCamara.tsx`. Manual de continuidade e manual visual atualizados no capítulo **29**, matriz revisada. [Relatório de comprovação](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/blob/revista-consolidada-ajustes-de-ritmo-16nov2026/docs/visibilidade-real-de-imagens-documentos-16nov2026.md).

[Validação visual/técnica #43973899797](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43973899797): sucesso, cinco páginas em três larguras, seis verificações funcionais, zero erros selecionados; continuam necessários aceite visual final e revisão dos direitos de publicação. Sem merge/deploy.


### Quadro de fechamento — 35 modelos, 342 fichas e 6 Temas (16/11/2026)

A matriz registra **35/35 modelos com ao menos uma amostra auditada** (não aprovação individual de todas as páginas). Na rodada de fechamento, o teste de variantes encontrou falha concreta de publicação: a ficha `/eleitas/raquel-lyra-pe` retornava 404 no pacote estático, pois a listagem de eleitas exibe inicialmente só 18 nomes e a pré-renderização dependia de `crawlLinks`. `vite.config.static.ts` passa a enumerar **todas as 342 fichas** e **seis Temas** explicitamente, além dos achados.

**QA [#43976601483](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43976601483) success:** 342 fichas + seis Temas com HTML próprio e registrados no sitemap (**zero ausências**); 27 testes axe-core selecionados (nove páginas × 1440/390/320 CSS px), 18 verificações funcionais em desktop/celular, zero falhas. O PR também associa a captura da interface TSE em `/quem-sao-elas` ao `figcaption` correspondente, sem equipará-la à base CSV nem liberar direitos.

**Pendências antes do merge/deploy:** aceite visual das páginas inteiras e suas variantes, solução individual de direitos de **Pagu, Lélia, interface TSE e quatro reproduções documentais** (sete decisões), testes humanos de zoom/leitor de tela/teclado, revisão do diff completo e autorização editorial. O projeto **não foi publicado**.

Os dois manuais receberam o capítulo **30**, matriz atualizada e [quadro documental das pendências](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/blob/revista-consolidada-ajustes-de-ritmo-16nov2026/docs/fechamento-redesign-pendencias-16nov2026.md). Não abrir outro redesign nem alterar a identidade já escolhida.


### Fechamento de acessibilidade e triagem autoral — capítulo 31

**Acessibilidade em prévia:** novo QA [#43980902610](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43980902610) com **27 cenários** sobre nove rotas (desktop, reflow 640 CSS px/DPR2 e espaçamento de texto elevado em celular), sem falhas; **3 controles por teclado** aprovados. É simulação de reflow equivalente, **não zoom nativo 200% nem certificação WCAG**, leitor de tela ou teste humano.

**Direitos:** as fotografias do Banco da Câmara têm orientação oficial de uso CC BY com crédito; isso não libera as imagens de terceiros nem páginas partidárias de processos. **Sete decisões individuais seguem abertas**: Pagu e Lélia (continuam bloqueadas no build normal), captura da interface TSE, resolução União Brasil, resolução Federação Brasil da Esperança, capa PJe PL e linha do índice SITAQ da Câmara. Proveniência, distinções e alternativas editoriais registradas em [triagem final](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/blob/revista-consolidada-ajustes-de-ritmo-16nov2026/docs/triagem-direitos-e-a11y-final-16nov2026.md).

Manual completo e manual visual atualizados no **capítulo 31**, além de matriz e quadro de fechamento. Este PR **continua draft, sem merge/deploy**. Próximos bloqueios: aceite visual, decisões jurídicas dos sete itens, validação humana de teclado/zoom/NVDA, diff e publicação autorizada.


### Proteção da fotografia de Pagu no pacote HostGator — capítulo 32

Na conferência de **screenshots integrais** de Barreiras, Histórico, Achados, Direitos, Quem chega, Sobre, Votos, Materiais e Pioneiras, preservamos a composição aprovada, sem nova repintura genérica. Fotografia real de Renilce Nicodemos (Barreiras) e do local de votação de 2026 (Histórico) foram localizadas com contexto correto. Direitos utiliza transcrição e cronologia identificadas, não fac-símile inventado.

**Falha concreta corrigida:** a foto histórica de Pagu estava oculta na interface normal, mas o arquivo original ainda era fisicamente distribuído no pacote `dist/client/fotos`. O script `scripts/hostgator-public-binaries.mjs` exclui esse arquivo no build normal e inclui também **proteção preventiva para Lélia**; ambas ficam no pacote apenas em builds com flags explícitas de prévia. Teste específico `.github/workflows/qa-ritmo-revista-integrada-16nov.yml` confere arquivos ausentes em build normal, presentes em prévia e a ficha tipográfica preservada. [QA #43983013191](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43983013191), sucesso no commit anterior de código. **Os arquivos continuam no repositório público e requerem governança editorial separada.**

Manuais editáveis atualizados no **capítulo 32** e matriz de imagens/pendências atualizada. PR #33 segue draft, sem merge nem deploy; direitos dos cinco recortes/interface ainda precisam de decisão e testes humanos/aceite final seguem pendentes.


**Validação final da proteção (a56dad1781):** quatro workflows de QA do PR #33 com conclusão **success** no commit `a56dad178175daa67fca3abe0ef97a53d8618bbc`: [fotografias e prévia, inclusive ausência/presença de binários](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43983601950), [Achados/Barreiras/Histórico](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43983601920), [Investigações e documentos](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43983602090), [variantes temáticas e fichas](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43983601911). Sem merge/deploy.


### Fechamento da integridade do pacote — 399 páginas e pré-aceite visual

Nova rotina `scripts/qa/integridade-links-pacote.py` e workflow `.github/workflows/qa-integridade-links-16nov.yml` conferem todas as páginas HTML pré-renderizadas e referências internas; após o diagnóstico inicial sem falso positivo, o QA agora **falha** se houver links, âncoras, mídias locais ou fotos historicamente bloqueadas no pacote. [Execução em modo estrito #43986261537](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43986261537) aprovada: **399 HTMLs; 19.845 ocorrências de links internos válidos; zero links, fragmentos ou mídias locais quebrados; ausência dos dois retratos em revisão autoral**. Os **596 links externos** foram contados, não testados por HTTP. A varredura não abrange todas as mídias injetadas pelo JavaScript.

A revisão dos **120 arquivos** no diff contra `main` não identificou alterações às bases centrais de votos/resultados/finanças, home, logo ou CSS global; `src/data/temas.ts` registra uma correção objetiva sobre a publicação dos critérios formais FEFC no TSE, mantendo sua execução como objeto de apuração. Foram separadas **capturas integrais desktop/celular de Direitos, Quem chega, Sobre e Votos** para aceite visual sem modificar a composição. Manuais atualizados no **capítulo 33** e relatório [QA integridade e visual](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/blob/revista-consolidada-ajustes-de-ritmo-16nov2026/docs/qa-integridade-links-e-aceite-visual-16nov2026.md).

**Não publicado.** Pendem decisão jurídica por material, aprovação visual da editora, testes humanos de acessibilidade, revisão final de integração e autorização expressa para merge/deploy.


### Etapa 1 — avaliação editorial/visual integral (43 rotas)

**Parecer editorial de conjunto:** captura integral de **43 rotas em desktop e celular**, 86 evidências visuais, 0 falhas detectadas de status/JS/mídia/H1/overflow na compilação ([Actions #43993887153](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43993887153)). Foram revisados os 35 modelos com amostras das seis variantes temáticas, fichas de Perpétua Almeida e Raquel Lyra e dois estados de busca. O parecer por rota e respectivos limites foram consolidados em [docs/parecer-editorial-visual-etapa1-16nov2026.md](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/blob/revista-consolidada-ajustes-de-ritmo-16nov2026/docs/parecer-editorial-visual-etapa1-16nov2026.md).

**Correção feita:** os Temas **Memória e Violência política** exibiam um único AchadoCard espremido numa coluna de 1/3 do desktop. Um achado único agora recebe tratamento de **destaque** (até 1024 px), dois achados usam duas colunas, três ou mais permanecem em grade. Título, dado, fonte, método, fotografia e paleta não foram alterados. [QA de variantes posterior #43994685648](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43994685648), sucesso, inclui testes geométricos e capturas em desktop/celular.

**Diretriz preservada:** revista jornalística contemporânea, roxo estrutural, tinta, coral profundo com texto claro, ouro e papel por função, fotografia real e evidência contextual, sem páginas uniformizadas nem imagens inventadas. Manual principal, espelho e matriz atualizados no **capítulo 34**. A editora conserva **o aceite visual final**; retratos históricos e cinco reproduções documentais ainda dependem de triagem de direitos; testes humanos de acessibilidade vêm na próxima etapa. **PR permanece draft, sem merge/deploy.**

