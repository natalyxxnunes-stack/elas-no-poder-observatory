# Quem são elas? — Auditoria editorial e direção de intervenção integral

**Data de referência:** 15/11/2026  
**Objetivo:** avaliar e preparar intervenções de *todo o site*, respeitando a voz e a decisão editorial do observatório.  
**Código examinado:** branch \`prepublicacao-redesign-integral-15nov\`, baseada no redesign de novembro e nas finanças TSE de 15/11.  
**Ambiente de visualização:** build estático executado em navegador Chromium, sem edição do domínio público.  
**Escopo da amostra automatizada:** 44 rotas e exemplos de páginas individuais, 88 passagens (1440 × 900 e 390 × 844). Fonte: [RELATORIO-ROTAS.md](./design-integral-2026-11-15/RELATORIO-ROTAS.md).

## Síntese da avaliação

O redesign já tem elementos estruturais consistentes: logo original, Fraunces + Work Sans, roxo como eixo cromático, fotografias reais documentadas, seis perguntas editoriais e aberturas com gráficos/contextos próprios. O salto qualitativo pendente é **o ritmo visual e a inteligência de apresentação de cada conteúdo**. O mesmo repertório (faixas de fundo, linhas divisórias, destaques numéricos, pequenas fontes de apoio, fichas) reaparece tantas vezes que reportagens, bancos de dados, ensaios explicativos e arquivos deixam de parecer tipos editoriais distintos.

**Separar três categorias durante a implementação:**
1. **Fato verificado**: estrutura do código, capturas, textos e rotas. 
2. **Julgamento de design**: leitura visual e editorial, sujeita a teste comparativo de propostas.
3. **Hipótese de usabilidade**: exige observação no dispositivo e teste com pessoas leitoras; não afirmar como defeito provado sem evidência.

### Dados objetivos da varredura

| Verificação | Resultado | Interpretação |
| --- | ---: | --- |
| Arquivos de rota no redesign | 38 | Inclui rotas dinâmicas e o shell raiz; não equivale a 38 URLs apenas |
| Componentes em \`src/components/editorial\` e \`src/components/home\` | 57 | Auditoria de componentes compartilhados é necessária |
| Rotas/exemplos examinados em navegador | 44 | 88 passagens em desktop/celular |
| Erros de carregamento/JS e overflow global na amostra | 0 | Estabilidade básica confirmada, não auditoria integral de acessibilidade |
| Páginas individuais de Achados sem H1 | 2 da amostra | Defeito semântico confirmado; correção isolada na branch de auditoria |
| \`/metodo/\`: caracteres visíveis medidos | aproximadamente 23,9 mil | Texto mais extenso da amostra; 19 \`section\`, 4 tabelas, nenhum \`figure\` |
| \`/eleitas/\`: caracteres visíveis medidos | aproximadamente 18,7 mil | Diretório de 342 registros; índice extenso com 1 \`section\` e sem gráficos no HTML |
| \`/direitos/\`: caracteres visíveis medidos | aproximadamente 18,3 mil | 14 painéis \`details\`; rever leitura contínua e referências documentais |
| \`/achados/\`: caracteres visíveis medidos | aproximadamente 15,8 mil | 16 \`figure\`, com padrões repetidos de mini-gráficos; hierarquia deve variar |
| \`/como-votaram/\`: painéis \`details\` em DOM | 28 | Muitos se devem a componentes aninhados; checar progressão narrativa e expansão |

*Os caracteres visíveis incluem conteúdo de navegação e rodapé. São métricas comparativas de extensão, não métricas diretas de legibilidade.*

## Decisões visuais preservadas

- **Logo original** e escrita correta de “Quem são elas?”.
- **Roxo estrutural**, com contraste verdadeiro; creme de papel é apoio e não deve dominar. Preto/tinta, magenta e vinho podem criar diferenciação editorial. Evitar aparência pastel e infantil.
- **Fotografia documental e documentos reais** com fonte/licença/legenda. Nada de imagens geradas por IA apresentadas como fotografia ou de falsas capas/documentos.
- **Aberturas distintas por página**; não aplicar um grande retângulo roxo idêntico em todas. Menos riscos puramente decorativos, tarjas, caixinhas e frases soltas.
- **Fraunces + sans** como eixo tipográfico, com uma escala coerente. Preferir legibilidade a microtipografia decorativa.
- **Todas as afirmações quantitativas** exigem fonte, período, data de corte, universo e denominador. Manter pretas e pardas distintas; somar apenas de maneira explícita.
- **Não atualizar retroativamente estudos e reportagens** que usaram extrações anteriores sem reprocessar suas análises. Diferenciar eleitas, diplomadas e ocupantes efetivas.

## Intervenções por famílias — cobrem todas as páginas

| Família | Rotas existentes | Leitura atual, sustentada pela inspeção | Intervenção editorial/visual proposta |
| --- | --- | --- | --- |
| **Capa e navegação** | \`/\`, \`/temas/\`, seis \`/temas/$slug/\`, \`/busca/\` | Capa editorial e imagem documental são pontos fortes. Menus e atalhos concentram níveis de informação distintos. As seis páginas temáticas alternam textos longos e recortes curtos | Dar ritmo à capa por edição/atualização, separar descoberta de investigação de consulta; criar mapa de navegação entre pergunta, reportagem, dado e fonte; redesenhar seis temas com hierarquia comum e aberturas semanticamente distintas |
| **Candidatura → urna → poder** | \`/quem-sao-elas/\`, \`/votos/\`, \`/funil/\`, \`/quem-chega/\`, \`/historico/\`, \`/relatorio-2026/\`, \`/partidos/\` | Já existem gráficos, resultados por cargo/estado e aberturas específicas, mas os recortes são longos e as passagens entre páginas dependem de links textuais | Articular um percurso narrativo e gráfico entre entrada, votos, cadeiras e poder; diferenciar denominadores e universos em cada etapa; criar visões-síntese por cargo/UF/partido e depois permitir mergulho nos dados |
| **Quem entrou** | \`/eleitas/\`, \`/eleitas/$slug/\` | A base oferece 342 fichas, filtros, links compartilháveis e trajetória de 2022; o índice principal é uma sequência textual extensa | Abertura analítica por cargo, distribuição racial e trajetória; resultados por filtro em tabela editorial compacta; fichas com origem do mandato, eleição, diplomação/posse e atuação separadas; fotos oficiais só com verificação |
| **Dinheiro e ferramentas** | \`/dinheiro/\`, \`/comparar/\`, \`/dados/\`, \`/downloads/\` | Apuração e documentação robustas. A página Dinheiro usa longa abertura e múltiplos módulos. Dados é um índice de navegação, sem visualizações próprias | Separar manchete do explorador e do método; destacar comparações com denominador; transformar Dados em uma central de consulta com amostras das ferramentas reais; melhorar a relação entre CSVs, tabela e gráfico, sem esconder o corte de cada arquivo |
| **Reportagens e acervos de declaração** | \`/reportagens/\`, \`/como-votaram/\`, \`/na-voz-delas/\`, \`/colecoes/antigenero-no-poder/\` | Como votaram reúne narrativa e material extenso; o bloco das 42 se torna listagem/promessa. Reportagens é um índice curto; a coleção tem leitura própria | Projetar template de matéria com título, linha fina, autoria, evidência protagonista, largura de leitura, módulos de apuração e documentação; matrizes e documentos em planos de leitura separados; índice com hierarquia editorial por pauta, sem inventar material |
| **Achados** | \`/achados/\`, \`/achados/$id/\` | Arquivo muito extenso com muitos cartões e mini-gráficos repetindo apresentação. H1 ausente nas páginas individuais da amostra | Um destaque principal, achados secundários e arquivo filtrável por tema e data; cartões de 2–3 tipos reais conforme conteúdo; fonte/data legíveis, sem selos decorativos; H1 semântico nas páginas próprias |
| **Agenda e exercício do poder** | \`/monitor/\`, \`/coautoria/\`, \`/quem-controla/\`, \`/condicoes/\` | Tabelas e explicações institucionais úteis, mas com funções diferentes e visualmente pouco distinguíveis | Painéis de mandato como registros verificáveis com status; coautoria como rede auditável, sem sugerir aliança pessoal; institucional em formato explicativo com organograma de decisões e competência; marcar horizonte 2027 |
| **Direitos, violência e memória** | \`/direitos/\`, \`/em-disputa/\`, \`/barreiras/\`, \`/pioneiras/\` e perfis Pagu/Lélia | Direitos é um dos textos mais longos, dividido em numerosos painéis; Pioneiras tem documentação e conteúdo que favorecem leitura de revista; Barreiras mistura bases e conceitos diferentes | Linha do tempo editorial de leis e decisões com documentos, filtros por período e tratamento coerente; perfis com imagem/documento e narrativa própria; diferenciar processo, caso, denúncia, decisão e desfecho; marcar situação de cada projeto |
| **Transparência e serviços** | \`/metodo/\`, \`/sobre/\`, \`/investigacoes/\`, \`/calendario/\` | Método é a página mais extensa, sem figuras na amostra; Sobre e Investigações são legíveis mas majoritariamente textuais; Calendário é cronológico | Método em três níveis: exemplo visual do cálculo, mapa de bases/cortes, documentação técnica. Sobre: manifesto factual e ficha editorial. Investigações: status sem aparência de kanban corporativo. Calendário: acontecimentos e efeitos eleitorais, não somente datas |

## Regras de linguagem visual a implementar

1. **Escala em vez de repetição:** três tipos de composição (matéria, investigação de dados, consulta/documentação), com variações justificadas; não uniformizar todas as páginas por template.
2. **Hierarquia tipográfica:** definir tamanhos de corpo, legenda, metadados, subtítulo e títulos responsivos; evitar textos explicativos comprimidos e datas quebradas em pequenas etiquetas.
3. **Respiro com função:** largura de coluna para leitura, largura total apenas para gráficos e fotografias que precisam dela. Substituir divisórias decorativas por ritmo de espaço e alinhamento.
4. **Cor editorial:** roxo como base identitária, preto para densidade, papel para leitura, magenta/vinho em momentos editoriais específicos; respeitar acessibilidade e distinção cromática.
5. **Exploração de dados:** cada gráfico com pergunta explícita, eixo/denominador/escala, legenda e data, tabelas alternativas e indicação do que não se pode inferir.
6. **Mediação entre páginas:** vínculos contextuais naturais entre candidatura, eleita, financiamento, mandato, votos e fonte. Preservar filtros no endereço quando cabível.
7. **Fotografia e documentos:** todas as imagens com descrição e atribuição; preservar versões integrais e comunicar recorte editorial quando houver.
8. **Mobile primeiro na leitura:** reduzir ocupação da primeira tela por intertítulos e notas; tornar grades, tabelas e menus realmente compreensíveis no celular.
9. **Semântica e acessibilidade:** um H1 por página, ordem coerente de títulos, navegação por teclado, nomes acessíveis, foco, contraste, redução de movimento e leitura por tecnologia assistiva.
10. **Metadados e proveniência:** distinguir datas de extração de candidaturas, resultados, finanças e fichas das eleitas. Não usar “fotografia vigente” sem especificar o conjunto.

## Sequência de intervenção proposta

| Ordem | Dependência | Entrega verificável |
| --- | --- | --- |
| 0 — Repositório e publicação | \`main\` ainda não reflete necessariamente o ZIP manualmente publicado da branch de redesign; PR #3 segue em revisão | Sincronizar código aprovado com versão publicada, salvar backup e estabelecer rastreabilidade de deploy |
| 1 — Design system + critérios | Revisão tipográfica e cromática transversal, diretrizes de fotografia, grades, componentes semânticos | Guia técnico e 3 composições de referência verificáveis em desktop e celular, preservando logo |
| 2 — Capa, navegação e hubs | Depende das decisões de design system | Home, Temas, Dados, Reportagens, Achados, Busca, Downloads; coerência global da descoberta |
| 3 — Dados eleitorais e eleitas | Depende dos padrões de gráficos, tabelas e fichas | Quem são elas, Quem chega, Quem entrou, fichas, Votos, Funil, Histórico, Partidos, Comparar, Relatório |
| 4 — Investigação e exercício do poder | Depende do template de reportagem e documentação | Como votaram, Na voz delas, Coleção, Monitor, Coautoria, Quem controla |
| 5 — História, direitos e transparência | Depende dos padrões de leitura longa e documentos | Direitos, Em disputa, Barreiras, Pioneiras e perfis, Método, Sobre, Calendário, Investigações |
| 6 — QA integrado e publicação | Todas as famílias revisadas | Capturas comparativas em desktop/mobile, testes de navegação e acessibilidade, revisão de fontes, SEO, links, hashes e pacote HostGator |

Essa ordem é **de dependência técnica**, não de prioridade editorial entre temas. A implantação deve ser versionada, revisável e reversível. Simulações precedem mudanças substanciais de identidade/composição.

## Pendências específicas

**P0 técnico/editorial:** o site foi publicado manualmente a partir de um ZIP contendo o redesign, mas a \`main\` consultada ainda corresponde à atualização financeira isolada e o PR #3 não estava mesclado na consulta. Antes de novos builds de produção, alinhar a origem do deploy para não repetir a perda do redesign.

**Correção efetivamente feita nesta branch:** título H1 nas páginas individuais de Achados, antes ausente. O cartão do índice preserva H3; a página individual usa H1 sem link no próprio título, deixando o link para dados completos em seu lugar apropriado. Não foi publicado nem alterou o site ao vivo.

**P1 de desenho já confirmado:** índice das 342 eleitas como lista longa; Método com 23,9 mil caracteres visíveis, sem figuras; Achados com 16 figuras e padrões repetidos; Direitos com 14 painéis expansíveis; uniformização excessiva de grandes faixas roxas nas primeiras dobras de algumas páginas; metadados com peso visual insuficiente em telas pequenas.

**Pendências de avaliação, ainda não classificadas como falhas:** contraste WCAG por pares de cor reais, navegação de teclado e leitor de tela, compreensão dos controles por usuárias, política de fotografias nas fichas e coerência editorial de todos os textos históricos.

## Próxima validação

Depois de revisar as composições de referência, aplicar a mesma gramática editorial às demais páginas **por função**, sem apagar as diferenças entre reportagem, atlas eleitoral, catálogo e documentação. Todo PR deve trazer capturas desktop/mobile da página anterior e da nova; nenhuma atualização financeira pode ser perdida durante o trabalho visual. 
