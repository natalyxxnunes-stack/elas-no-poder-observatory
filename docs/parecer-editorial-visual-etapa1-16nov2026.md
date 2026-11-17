# Etapa 1 — parecer editorial e visual de conjunto (PR #33)

**Data da revisão:** 16/11/2026. **Escopo real:** 43 rotas em desktop (1440 CSS px) e celular (390 CSS px), equivalentes aos 35 modelos editoriais com variações de tema, ficha individual e estado de busca. **Status:** parecer técnico-editorial favorável com uma correção objetiva; **a aprovação visual final pertence à editora**. PR #33 continua em rascunho, sem merge ou publicação.

## Base de comparação e método

1. Âncora de direção de arte aprovada: docs/design/ANCORA-EDITORIAL-PILOTOS-16NOV2026.md, especialmente Quem entrou?, Método e Reportagens; manual de identidade editorial (capítulos 1–33) e matriz visual de fotografias/documentos/gráficos.
2. Revisão de **páginas inteiras**, não apenas abertura, com [86 capturas completas](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43993887153) da compilação da branch 3122479a06c028fcc759e71c686a607502f5cb77. Imagens originais de cada rota disponíveis no artefato de Actions (prazo de retenção 14 dias).
3. Resultados da coleta: **43 rotas × dois tamanhos = 86 capturas, zero erros listados**, incluindo carregamento de imagens, JS, H1 e transbordamento horizontal. Os dados estruturados do diagnóstico registram altura, imagens e textos alternativos, legendas em figure, títulos, tipo de mídia e massas cromáticas; essas medições não substituem o juízo estético.
4. A revisão cruzou a página fotografada com o uso jornalístico pretendido: foto de arquivo versus fato atual, fac-símile versus reprodução tipográfica, gráfico com denominador versus imagem decorativa. O capítulo editorial em roxo/tinta/coral/dourado foi preservado; os fundos claros continuam presentes onde documentos e tabelas exigem leitura.

## Veredito visual geral

**Direção preservada e recomendável para aceite editorial**, sem redesenho em bloco. Os três pilotos estão reconhecíveis, mas as outras páginas mantêm estruturas próprias. Há variação cromática nas aberturas e no miolo, com fotos documentais nos contextos pertinentes e gráficos em páginas de séries/contagens. A extensão maior de Achados, Direitos, Em disputa, Histórico, Quem chega e Votos tem fundamento na densidade de informação, não foi resolvida artificialmente com foto inventada ou recoloração.

**Única falha de composição que exigiu código nesta rodada:** em Memória e Violência política, apenas um achado ocupava um terço da largura no desktop, formando uma coluna muito longa e deixando o restante da página vazio. O componente src/routes/temas.$slug.tsx agora aplica **destaque de até 1024 CSS px** ao achado único, mantém duas colunas para dois achados e três colunas no desktop grande para três ou mais. Não modifica dados, fontes, denominadores, fotografia, paleta nem textos. [QA posterior de seis Temas e fichas](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43994685648) aprovado no commit 90ef2649836e3cbdc81ba9a4662de49be7c7f272, incluindo dimensões e quatro capturas de prova (desktop/celular). O controle automatizado exige que um achado único ocupe ao menos 72% da largura da seção no desktop e 92% no celular.

**Observações sem proposta de alteração:** páginas de serviço, busca e arquivos parlamentares são necessariamente mais textuais; algumas exigem rolagem extensa no celular. Isso não constitui motivo para criar imagens de IA, usar ícones decorativos ou recriar fotografias. Para o aceite editorial, conferir legibilidade de detalhes e filtros no tamanho nativo do arquivo, pois contatos reduzidos não mostram texto com precisão.

## Matriz individual das 43 rotas

**Legenda:** Conforme = parecer visual favorável dentro do escopo das capturas; Corrigido = falha encontrada e alterada com teste; Preservar = piloto ou identidade já aprovada; ressalva de direitos = encaminhar à etapa 2, sem publicar imagem por inferência. Esses rótulos **não equivalem a autorização de merge/deploy**.

| Rota | Parecer | Evidência ou limite editorial |
| --- | --- | --- |
| / | Preservar | Homepage fotográfica e hierarquia de cadernos já aprovadas; não modificar logo nem capa. |
| /achados | Conforme com densidade | Cadernos escuros e claros com cartões de dados; extensão decorre do índice completo de achados. |
| /achados/quanto-mais-alto-mais-brancas | Conforme | Número, gráfico, fonte e limite da inferência dominam o percurso; foto pessoal não acrescentaria prova. |
| /barreiras | Conforme, com acervo contextual | Fotografia real no capítulo legislativo, documentos e comparações; foto não documenta vítima nem julgamento. |
| /busca?q=mulheres | Conforme, serviço | Resultados textuais longos por natureza da busca; categorias distinguíveis, sem fotografia genérica. |
| /busca?q=qsezzzinexistente | Conforme, serviço | Estado vazio conserva hierarquia e orienta navegação; não fabricar resultado. |
| /calendario | Conforme, serviço | Linha do tempo e marcos organizados por data; cor de intervenção usada pontualmente. |
| /coautoria | Conforme | Imagem do plenário identificada como contexto e matriz de coautoria; prevalecem registros. |
| /colecoes/antigenero-no-poder | Conforme | Recorte editorial de agenda e documentação de votações; sem insinuar que imagem representa todos os votos. |
| /como-votaram | Conforme com densidade | Fotografia parlamentar contextual e capítulos de votos com gráfico; longa leitura pede conferência atenta da tabela no celular. |
| /comparar | Conforme, interativo | Filtros, barras proporcionais e tabela; significado das cores acompanha os dados. |
| /dados | Conforme, documental | Captura real da página de dados do TSE e índice de bases; interface não é o arquivo CSV. |
| /dinheiro | Conforme, com ressalva de direitos | Fundos roxo/tinta/coral e reproduções de resoluções partidárias; direitos dessas páginas ficam na etapa 2. |
| /direitos | Conforme com densidade | Cronologia longa e reprodução tipográfica de atos, explicitamente diferenciada de fac-símile; prioridade à leitura. |
| /downloads | Conforme | Miniaturas de materiais realmente produzidos, com função de capa/índice, não prova externa. |
| /eleitas | Preservar piloto | Abertura coral com texto claro, indicadores em tinta e fichas consultáveis; identidade da referência aprovada. |
| /eleitas/perpetua-almeida-ac | Conforme, ficha | Registro eleitoral e documentação com dados específicos, sem retrato cujo direito não está assegurado. |
| /eleitas/raquel-lyra-pe | Conforme, ficha | Mesma família editorial com conteúdo individual; sem pressupor equivalência entre eleita e titular em exercício. |
| /em-disputa | Conforme com densidade | Cartões sucessivos e explicações processuais com capítulo dourado; altura deriva da documentação, sem imagem decorativa. |
| /funil | Conforme | Cor como estrutura e diagramas como prova; universos de candidatura, voto e cadeira não apresentados como painel de retratos. |
| /historico | Conforme com densidade | Gráficos entre capítulos fortes; foto do local de votação de 2026 rotulada como contexto, não prova de 2014/2018/2022. |
| /investigacoes | Conforme | Índice jornalístico com hierarquia de frentes, sem usar fotos genéricas como preenchimento. |
| /metodo | Preservar piloto | Interface real do TSE, fotografia contextual, demonstrativos e respiro; fundos fortes com documentação clara. |
| /monitor | Conforme | Fotografia institucional datada, API, tabelas e ficha de acompanhamento; sem atribuir representação a exercício futuro. |
| /na-voz-delas | Conforme, com ressalva de direitos | Falas com contexto e recorte de uma linha do índice SITAQ, não reprodução da página do Diário. |
| /partidos | Conforme, com ressalva de direitos | Alternância de capítulos, fotografia parlamentar e resoluções do União Brasil e Federação; critérios não são repasses. |
| /pioneiras | Conforme | Fotografia histórica de Bertha Lutz, fichas e barras documentais; abertura em tinta. |
| /pioneiras/lelia-gonzalez | Conforme sob bloqueio de retrato | Ficha tipográfica de arquivo eleitoral; retrato bloqueado por direitos, prévia fotográfica é só para avaliação. |
| /pioneiras/pagu | Conforme sob bloqueio de retrato | Ficha eleitoral e tese biográfica; fotografia de autoria incerta excluída do pacote normal. |
| /quem-chega | Conforme com densidade | Bancada fotografada em março de 2026 como arquivo; capítulos de composição, Senado e recortes territoriais. |
| /quem-controla | Conforme, com ressalva de direitos | Capa autêntica do PJe do PL indicada como capa processual, não prova de repasses ou critérios integrais. |
| /quem-sao-elas | Conforme, com ressalva de direitos | Captura real da interface do TSE, gráficos e comparação; direitos da captura precisam de decisão. |
| /relatorio-2026 | Conforme | Capítulos numerados de análise, fotografia contextual da Câmara e síntese de cadeiras com denominadores. |
| /reportagens | Preservar piloto | Manchete editorial, faixa roxa, gráfico de seis votações e fotografia de arquivo explicitamente contextualizada. |
| /sobre | Conforme | Página institucional com identidade tipográfica e transparência de método; fotografia de bastidores inventada seria inadequada. |
| /temas | Conforme | Seis entradas com cores e escalas diferentes, fotografia histórica em Memória, sem uniformizar capas. |
| /temas/agenda | Conforme | Fotografia de plenário datada, achados e votações; não inferir voto individual pela imagem. |
| /temas/dinheiro | Conforme | Três achados equilibram a grade, com representação das receitas e caderno de fontes. |
| /temas/memoria | Corrigido | Achado único saiu da grade de três colunas e virou destaque de largura editorial; fotografia de Bertha mantida. |
| /temas/poder | Conforme | Abertura com imagem contextual e três achados, além da explicação do Senado. |
| /temas/presenca | Conforme | Abertura com hemiciclo e vários achados; grade mantém ritmo sem transformar cada número em foto. |
| /temas/violencia | Corrigido | Achado único deixou a coluna estreita; texto, gráfico e números ganharam largura e reduziram altura no desktop. |
| /votos | Conforme com densidade | Gráficos e tabelas de universos distintos em capítulos contrastantes; sem fotografia substituindo dado. |

## O que ainda depende do aceite da editora

- Conferir a composição em escala original, especialmente **achado único de Memória e Violência política após a correção**, e ritmo da grande reportagem de dados: Direitos, Histórico, Quem chega, Em disputa, Achados e Votos.
- A editora pode reprovar trechos concretos por hierarquia ou respiro; esses trechos devem ser corrigidos **pontualmente**, no mesmo PR #33 e com nova captura comparativa, sem redesenhar outras páginas por padrão.
- **Direitos de reprodução não estão encerrados por esta etapa.** Permanecem individualmente pendentes retratos Pagu e Lélia (bloqueados no pacote normal), captura da interface TSE, resoluções União Brasil/Federação, capa do processo PJe do PL e linha SITAQ da Câmara. Fonte e classificação: docs/triagem-direitos-e-a11y-final-16nov2026.md.
- Teste humano de zoom nativo/leitor de tela/teclado até o fim e decisão final de integração/publicação ficam nas etapas seguintes.

## Governança

A alteração de desenho desta etapa ficou concentrada em src/routes/temas.$slug.tsx, reforçada por teste de largura e screenshots em .github/workflows/qa-revista-variantes-16nov.yml. Nenhuma página foi publicada, nenhuma imagem adicional foi incorporada, nenhum número eleitoral alterado e nenhuma identidade reiniciada. As capturas anteriores permanecem relevantes nas outras 41 rotas, que não tiveram composição modificada pela correção.
