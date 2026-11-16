# Quem são elas? — matriz editorial de fotografias, documentos e gráficos
**Auditoria:** 16 de novembro de 2026 · **base:** branch PR #24 e intervenção de evidências PR #25 (prévia)  
**Escopo:** 35 modelos de rotas de conteúdo; `index.tsx` (home aprovada) é controle, e `condicoes.tsx` é redirecionamento. As seis variantes de `temas.$slug` e as fichas individuais usam modelos comuns, mas exigem inspeção amostral específica.

## Critério de decisão

Fotografia entra quando registra uma pessoa, um acontecimento, um lugar ou um intervalo relevante para a apuração; não serve como preenchimento. A legenda deve indicar **o que a fotografia mostra e o que ela não prova**, data, autoria, acervo, licença e link de origem. Para Lélia Gonzalez e Pagu, os direitos sobre as imagens históricas ainda demandam confirmação suficiente; usar a ficha tipográfica identificada é preferível à reprodução arriscada.

Documento original deve ficar visualmente em primeiro plano quando **a afirmação depende da existência, redação ou data de um ato**: critério formal do FEFC, votação nominal, texto de lei, pronunciamento, prestação de contas e decisão judicial. Reproduções só entram com direitos e origem controlados; uma captura de portal não equivale ao conteúdo do CSV. Enquanto não houver fac-símile autorizado, mostrar link, identificador, situação, data e função do documento, sem fingir que uma cartela criada pelo site é documento original.

O gráfico é preferível à fotografia quando a pergunta trata de **proporção, evolução, comparação, concentração ou universo**. Sempre indicar numerador, denominador, período, fonte, eventuais exclusões e o que a figura não mede. Não agrupar PRETA e PARDA sem explicitar a soma; não representar percentuais para bases pequenas sem cautela. Texto claro em fundo coral profundo; evitar repetição de um mesmo retrato como ilustração genérica.

## Matriz por página

**Leitura:** **Feito** = elemento existente ou incorporado no PR #25; **Investigar** = oportunidade para fonte, direitos ou imagem específica; **Dispensa** = inserção inadequada ao objetivo da página. As observações dizem respeito ao conteúdo visível, inclusive componentes importados, e não apenas à existência de tags diretamente no arquivo de rota.

| Página (modelo) | Fotografia | Documento | Gráfico / figura | Decisão editorial e prioridade |
|---|---|---|---|---|
| Achado individual | Dispensa | Referência e método | Gráfico do achado | **P1:** ligar, quando possível, cada achado à fonte primária específica; não fotografar números |
| Índice de Achados | Dispensa | Via fichas | Cards de dados | **P2:** diferenciar visualmente as famílias temáticas sem representar documentos não anexados |
| Barreiras | Dispensa foto genérica de vítimas | Lei, painel TSE/MPF e representações | Séries e diagramas | **P1:** imagem de texto legal ou decisão só com referência correta; evitar imagem descontextualizada de violência |
| Busca | Dispensa | Nos resultados | Dispensa | **P2:** acessibilidade e diferenciação visual das categorias; nenhum banco de imagens |
| Calendário | Dispensa | Fontes em cada data | Linha temporal | **P2:** datas de eleição, diplomação e posse não são intercambiáveis |
| Coautoria | Feito: plenário 2026, contexto | Propostas e API Câmara | Matriz partido × partido | **Feito; P1:** ampliar documentos de pares específicos se trouxer ganho de verificação |
| Coleção antigênero | Foto só se vinculada a votação específica | Votos nominais e contraditório | Cartelas do recorte | **P1:** fac-símile de registro nominal em momento pertinente, sem imputar intenção por associação |
| Como votaram | Feito: plenário da igualdade salarial, contexto | Votações originais | Múltiplas figuras e matrizes | **Feito; P1:** ampliar provas documentais por proposição, sem confundir votação e posição política |
| Comparar | Dispensa | TSE Candidatos, resultado e FEFC | **Feito no PR #25: duas barras por recorte**, além de tabela | **Feito:** não confundir participação em candidaturas e cadeiras com taxa individual de eleição; com bases pequenas, só contagem |
| Dados (índice) | Dispensa | **Feito no PR #25: captura real do portal TSE** | Navegação visual | **Feito:** legenda diferencia interface, CSV e contas financeiras |
| Dinheiro | Dispensa imagem genérica de campanha | **Feito no PR #25: ficha gráfica de proveniência**, critérios FEFC, cotas e dados de receitas | Cobertura, cargo, raça, partidos, despesas | **Feito:** metadados próprios não são fac-símile; **P1:** documentos individuais de repasse por processo, quando verificados |
| Direitos | Foto dispensável | Textos legais, decisões, evolução normativa | Cronologia e peças tipográficas | **P1:** aproximar atos legais oficiais do argumento, com vigência, processo e limite de aplicação |
| Biblioteca/Downloads | Dispensa fotografia | Materiais publicados, arquivos e SHA | Miniaturas de materiais | **P1:** distinguir arte gráfica de capa/miniatura de uma prova documental |
| Ficha individual de eleita | Retrato individual só licenciado/fornecido | Cadastro TSE e documentos de mandato | Ficha e séries individuais | **P1:** foto oficial não significa licença automática de reprodução; manter registro tipográfico se necessário |
| Quem entrou (índice) | Retratos condicionais | Fichas e registros do TSE | Atlas e consulta | **P2:** evidência individual preferível a mosaico de imagens sem licença |
| Em disputa | Dispensa | Texto normativo e estado processual | Cartões de situação | **P1:** incorporar reprodução literal de decisão/lei só após verificação documental |
| Funil | **Dispensa** fotografia sem nexo factual | Feito: arquivos Candidatos e Vagas do TSE | Feito: diagramas e séries | **Suficiente nesta etapa:** imagem pessoal distrairia; priorizar explicitação de universos |
| Histórico | **Dispensa** foto de pioneira no recorte 2014–2026 | Feito: 4 conjuntos oficiais com links, metadados e lacunas | Feito: séries, mapas e comparações | **Suficiente nesta etapa:** fotografia de 1927 ou 1936 seria anacrônica aqui sem capítulo histórico específico |
| Investigações (índice) | Pauta específica, não genérica | Direcionamento para fontes em cada eixo | Índice editorial | **P2:** acervo só se houver acontecimento comprovado correspondente |
| Método | Feito: fotografia de contexto; captura de portal TSE em componente | Bases, capturas identificadas, correções e hash | Fluxo e exemplo de conta | **Feito:** conferir licença da interface de portal antes de uso público definitivo |
| Monitor | Feito: plenário 2026 | API da Câmara e ficha individual | Tabelas e indicadores | **Feito:** foto anterior à eleição não identifica mandatos futuros |
| Na voz delas | Não exige retratos | **Feito PR #27:** recorte real de uma linha do índice da Câmara com edição/página do Diário, não reprodução do Diário | Cartelas de citações | **Feito parcialmente; P1:** recuperar a página original do Diário quando possível e rever literalidade/contexto |
| Partidos | Feito: bancada feminina de 2026 | **Feito PR #27:** página original da Resolução CEN 043 do União Brasil e Resolução 14/2026 da Federação Brasil da Esperança; documentos/PJe e contas TSE | Votos, financiamento e representação | **Feito; P1:** confirmar direitos de reprodução e não confundir regra declarada com execução ou imputar descumprimento sem recontagem |
| Pioneiras (índice) | Feito: arquivo de Bertha Lutz | Fichas históricas | Régua de votos | **Feito; P1:** direitos das demais fotografias devem ser rastreados |
| Lélia Gonzalez | **Investigar** direitos de retrato | Feito: arquivos TSE 1982/1986 | Ficha nominal e réguas | **P1:** existem reproduções de autoria atribuída a Cezar Loureiro em Commons; classificação de domínio público não dispensa conferência jurídica da circulação no Brasil |
| Pagu | **Bloqueada:** direitos do retrato pendentes | Feito: base de votação 1950 | Ficha nominal e réguas | **P1:** manter bloqueio até prova jurídica suficiente; imagem não entra por urgência estética |
| Quem chega | Feito: bancada feminina 2026 (antes da eleição) | Base TSE e fichas | Hemiciclo, composição racial e estados | **Feito:** separar eleita, diplomada e ocupante efetiva |
| Quem controla | Não necessária | **Feito PR #27:** primeira página real do PJe do PL, com data, número e anexos; não equivale ao teor integral das regras | Estrutura de decisões | **Feito; P1:** distinguir capa, ato partidário, cota, recebimento e julgamento de contas |
| Quem são elas? / candidatas | Dispensa retrato individual em série | Feito: captura real do TSE | Raça, cargos e exploradores | **Feito:** separar PRETA e PARDA, titulares e vices |
| Relatório 2026 | **Feito no PR #25:** fotografia contextual de junho 2026 | **Feito:** caderno de quatro fontes oficiais | **Feito:** proporção de cadeiras com numerador e denominador | **Prioridade resolvida nesta rodada;** fotografia não representa eleitas em 2027; edição continua com data de corte de 04/11 |
| Reportagens (índice) | **Feito no PR #25:** foto de contexto ligada a igualdade salarial | Fontes da reportagem e pronunciamentos | Placar de seis votações | **Feito:** foto não retrata as seis votações; legenda explicita |
| Sobre | Dispensa | Documentação de método e projeto | Identidade editorial | **P2:** imagem institucional só se houver arquivo efetivo de bastidor/documento do observatório |
| Tema individual (6 variantes) | Feito somente em Memória e Agenda | Provas e fontes por tema | Cards e objetos de dados | **P1:** não forçar a mesma fotografia nos seis temas; os outros pedem evidências específicas |
| Temas (índice) | Feito: fotografias documentais localizadas | Fontes nas páginas | Capas editoriais | **P2:** preservar distinção entre fotografia histórica e ilustração |
| Votos | Dispensa foto genérica | Feito: arquivo de votação e cadastro | Barras por universo, gênero e cor/raça | **Feito:** incluir somente voto nominal válido; categorias de voto e eleita não são equivalentes |

## Documentos e licenças consultados para esta decisão

- **Fotografia da Câmara:** acervo institucional sob Creative Commons BY; atribuir nome do fotógrafo/Câmara dos Deputados. Fonte: https://www2.camara.leg.br/a-camara/documentos-e-pesquisa/arquivo/acervo-por-tipo/fotos .
- **Dados de contas 2026:** portal TSE, conjunto Prestação de Contas Eleitorais 2026, licença Creative Commons Attribution para os **dados**. Fonte: https://dadosabertos.tse.jus.br/pt_BR/dataset/prestacao-de-contas-eleitorais-2026 . A licença dos arquivos não autoriza presumir a licença do layout do portal.
- **Candidaturas 2026:** https://dadosabertos.tse.jus.br/dataset/candidatos-2026 . Captura de interface recuperada do PR #8 com nota de procedência de 15/11/2026.
- **Resultados 2026:** https://dadosabertos.tse.jus.br/dataset/resultados-2026 .
- **Foto da posse de Bertha Lutz (1936):** Arquivo Nacional / Commons, ficha identificada em src/data/fotos.ts.
- **Retrato de Lélia Gonzalez (Cezar Loureiro):** https://commons.wikimedia.org/wiki/File:L%C3%A9lia_Gonzalez_by_Cezar_Loureiro.jpg . Há uma indicação de domínio público na ficha; a aplicabilidade e a cadeia de direitos para publicação editorial no Brasil **não foram verificadas suficientemente**. Não baixar nem publicar esta imagem nesta rodada.
- **Retrato de Pagu:** https://commons.wikimedia.org/wiki/File:Patricia_Galvao.jpg . Cadastro local continua em verificacao-pendente, sem reprodução pública.

## Intervenção efetivamente realizada no PR #25

1. `comparar.tsx` — novo gráfico de duas etapas, atualizado pelos filtros existentes; bases inferiores a 20 aparecem como contagem sem barras.
2. `dados.tsx` — captura real do portal Candidatos 2026 no capítulo de proveniência, com legenda que distingue portal, CSV e prestação de contas.
3. `dinheiro.tsx` — ficha visual de metadados reais: data da extração, linhas processadas, duplicatas removidas e acesso ao conjunto oficial de contas; **rotulada como construção do observatório**.
4. `relatorio-2026.tsx` — síntese gráfica de mulheres eleitas para cargos de deputado, fotografia licenciada da Câmara com data e limites, e arquivo de fontes TSE/Câmara.
5. `reportagens.tsx` — fotografia contextual da tramitação da igualdade salarial em 2023, explicitamente não usada como prova dos seis votos.
6. `EvidenciasGrafadas2026.tsx` — módulo de figuras com rótulos, fontes e denominadores; nenhuma imagem gerada.

## Verificações obrigatórias antes de publicar

Testes automatizados de build, URLs, imagens e largura não substituem: revisão humana de captura integral, leitura em tamanho real da legenda, conferência de destino dos documentos, atribuição/licença da fotografia, navegação por teclado, semântica dos gráficos, contraste e auditoria de acessibilidade. Para publicação, registrar data de corte de cada base e situação do contraditório nas reportagens que nomeiam parlamentares.

**Estado:** PR #25 é prévia. Nada nesta matriz constitui autorização para incorporar à main, substituir arquivos originais ou publicar imagens com direitos pendentes.

---

### Correção factual transversal — Senado projetado para 2027 (16/11/2026)

**Achado na inspeção visual:** a manchete do Relatório 2026 e o gráfico de Senado já projetavam **29 das 81 cadeiras para o PL**, enquanto o texto de `quem-chega.tsx` ainda indicava **28**. A base local `src/data/senado-2027.ts` já registra Luís Felipe Cunha (PL), primeiro suplente de Sergio Moro, e Alex Diniz (PL), primeiro suplente de Cleitinho. A edição da rota ficou defasada em relação à própria base.

**Fonte institucional conferida:** Agência Senado, 25/10/2026, “Fim da eleição define composição do Senado em 2027, com 13 partidos” — https://www12.senado.leg.br/noticias/materias/2026/10/25/fim-da-eleicao-define-composicao-do-senado-em-2027-com-13-partidos . A Agência Senado projeta **29 cadeiras do PL** e identifica Luís Felipe Cunha como suplente do Paraná pelo PL e Alex Diniz em Minas. A filiação de Luís Felipe Cunha ao PL em **08/10/2026** está documentada também em https://www.cnnbrasil.com.br/eleicoes/senador-que-ocupara-cadeira-deixada-por-moro-se-filia-ao-pl/ . Número **projetado**, não fotografia de cadeiras já ocupadas em 2027.

**Ajuste feito na branch de prévia:** texto de `src/routes/quem-chega.tsx` reconciliado em **29 de 81**, com observação da correção, link oficial e a contagem de 19 eleitos em 2026 + 10 dos mandatos que se estendem a 2031. A ficha metodológica do gráfico em `src/components/editorial/Senado2027.tsx` passou a citar expressamente a Agência Senado e o uso da confirmação de partido do suplente, suprindo a lacuna da API. A estrutura da base e seus números **não foram alterados**. Incluído teste para evitar regressão do “29 das 81”. A informação segue sujeita a mudanças de filiação, judicialização ou substituições antes da posse.

**Lição da auditoria:** comparar manchetes, textos, gráficos e referências de data entre páginas é parte da verificação jornalística de um produto visual. Build e capturas não detectam inconsistências desse tipo sem conferência de conteúdo.


---

## 18. Cadernos de fontes primárias, PR #26 — 16 de novembro de 2026

**Branch técnica:** revista-documentos-originais-17nov2026 (nome de branch antecipado, intervenção realizada em 16/11/2026). **Base:** PR #25. PR de prévia, sem merge, deploy, alteração das bases eleitorais, troca de logo, CSS global ou mídias locais.

**Decisão editorial:** dar visibilidade aos documentos originais sem produzir simulações de páginas escaneadas. A peça criada pelo observatório deve declarar sua natureza de **ficha de identificação ou índice**, com link inequívoco ao documento público. Documentos mais sensíveis, com dados pessoais, não devem ser reproduzidos sem revisão. Cores da revista permanecem estruturais: tinta, roxo, dourado, creme e coral profundo com texto claro.

**Páginas efetivamente alteradas:**

1. **Partidos** e **Quem controla:** um caderno compartilhado `src/components/editorial/ArquivoDocumentalFEFC.tsx`, baseado no índice oficial do FEFC 2026, separa critério interno declarado, cota destinada pelo TSE e receitas declaradas por cada candidatura. Três registros individuais: **PL, PJe 0600974-71.2026.6.00.0000, liberação 20/08/2026; PT, PJe 0601252-72.2026.6.00.0000, 21/08/2026; União Brasil, PJe 0601251-87.2026.6.00.0000, 21/08/2026**. Os links foram extraídos da tabela oficial, não gerados como supostas cópias. Os identificadores ficam em `src/data/documentos-eleitorais-2026.ts`. A seleção é amostra de acesso, não julgamento comparativo de mérito. O TSE ressalva que não faz juízo de mérito dos critérios, exceto quanto aos destaques de cotas de gênero e raça. Nenhum registro comprova individualmente repasse, aprovação de contas ou irregularidade.
2. **Como votaram:** caderno `DossieVotacoesCamara`, baseado nos seis IDs preservados em `src/data/votacoes-camara.ts`, oferece acesso à ficha e aos votos individuais via caminhos documentados da API v2 da Câmara. Exibe proposição, etapa e data, mas **não interpreta uma resposta JSON como ata em PDF**. A existência dos endpoints foi documentada pela Câmara; a abertura efetiva dos links individuais no navegador ainda exige checagem em dispositivo final, pois as URLs da API não puderam ser abertas pelo buscador desta sessão.
3. **Na voz delas:** `IndiceDiariosCamara` organiza **sete falas com `publicar: true`** por nome, data do discurso, edição e página da publicação oficial, com o endereço de consulta já guardado na base e link de retorno à contextualização. A oitava fala (entrevista de Eduarda Campopiano), marcada `publicar: false` por verificação pendente do áudio e da resposta, permanece **fora da página**. O antigo mecanismo de Diários pode requerer compatibilidade específica; oferecer o portal geral como rota alternativa. Uma fala registrada literalmente não deve ser confundida com posicionamento atual da pessoa.
4. **Quem controla:** trecho legado que dizia faltar análise de despesas foi atualizado para reconhecer que a página Dinheiro já examina parte delas, enquanto a correspondência entre regras internas, decisões e recebimento individual ainda demanda investigação.

**Fotografias e documentos visuais:** nesta rodada, a fonte relevante é o ato, não uma foto de pessoas em plenário. Não foi adicionada imagem nova nem fac-símile sintético. A incorporação da *página real* de um processo em PNG/PDF, quando viável e útil, requer controle de licença, data, versão e eventual exposição de dados pessoais; só depois deve ser embutida no site. O mesmo vale para capturas de transcrição do Diário. Para voto nominal, são preferíveis figuras originais da contagem e links à API auditável.

**Verificação técnica:** workflow `.github/workflows/qa-documentos-originais-17nov.yml` compilando TypeScript/build e fotografando quatro páginas alteradas, Reportagens, Dinheiro e homepage de controle em 1440 e 390 px. Checa no DOM três PJe distintos, seis registros de votos e sete falas, além de imagem quebrada/erro JS/transbordamento. Consultar o resultado real antes de afirmar aprovação. Acessibilidade WCAG ampla, leitura das fontes na origem e validação legal das mídias seguem pendentes.

**Fontes:**
- TSE FEFC 2026: https://www.tse.jus.br/eleicoes/eleicoes-2026-content/prestacao-de-contas/fundo-especial-de-financiamento-de-campanha-fefc
- Câmara, API v2: https://dadosabertos.camara.leg.br/swagger/api.html
- Câmara, Diários: https://www2.camara.leg.br/a-camara/documentos-e-pesquisa/diariosdacamara

**Próximo passo:** conferir as capturas inteiras e o contraste das fichas, validar endpoints específicos e, apenas se justificável e autorizado, inserir imagens de **documentos autênticos** com crédito, identificação e tratamento de dados pessoais. Manter todo o histórico editorial; nenhuma publicação antecipada.

**Atualização documental (PR #27, 16/11/2026):** quatro imagens originais incorporadas como recortes identificados, após seleção e inspeção de informações pessoais. Inventário e hashes: `docs/acervo-facsimiles-tse-camara-16nov2026.md`. Direitos, contraste e apuração final precisam ser confirmados antes do merge.


## Nota de verificação de imagens — PR #31, 16/11/2026

A auditoria específica de Coautoria, Comparar, Direitos, Downloads, Em disputa, Pioneiras e Relatório 2026, com homepage/Método como controles, confirmou o carregamento das imagens presentes em 1440, 390 e 320 CSS px. Em Coautoria e Relatório, a fotografia de plenário funciona como contexto identificado; em Pioneiras, a imagem de Bertha Lutz é documento histórico; em Downloads, miniaturas de publicações não devem ser apresentadas como reproduções de atos eleitorais; em Método, a captura do TSE não equivale à extração integral de dados. A revisão de imagem e a comparação das páginas inteiras **não exigiram fotografia nova** em Direitos, Em disputa e Comparar. A autorização de reprodução continua dependendo de revisão específica; ausência de imagem quebrada não prova licença. Ver `docs/qa-acessibilidade-lote3-16nov2026.md` e as capturas de [#43940312286](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43940312286).


## Registro complementar do PR #32 — imagens nos seis modelos finais

Auditoria de nove URLs [#43942839897](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43942839897) e teste final [#43944282720](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43944282720): sem retratos de Lélia ou Pagu, ambos ainda bloqueados por direitos; ficha **tipográfica**, não foto do registro oficial. Quem chega conserva fotografia parlamentar contextual de março de 2026; Quem são elas? conserva captura de interface TSE com nota, pendente de revisão semântica e de reprodução; Sobre e Votos dispensam fotografia. **35/35 modelos agora tiveram ao menos uma amostra auditada; variantes e liberação documental pendentes.** Ver `docs/qa-acessibilidade-lote4-16nov2026.md`.


## PR #33 — recuperação de fotografias e tratamento integral de revista

A composição previamente escolhida para **Pagu** (retratro histórico em abertura de tinta, moldura coral, crédito e data aproximada) foi recuperada somente no build de **prévia explícita**. O arquivo `public/fotos/pagu-patricia-galvao-anos-1920.jpg` já existia; `FOTOS.pagu.licenca` permanece `verificacao-pendente` e o build normal **não** renderiza a imagem (teste automatizado aprovado em [#43950227435](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43950227435)). Para Lélia, a referência de retrato de Cezar Loureiro foi recuperada em [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:L%C3%A9lia_Gonzalez_by_Cezar_Loureiro.jpg), sem cópia no site ou licença consolidada. As fichas TSE continuam identificadas como **reprodução tipográfica**, não fac-símiles. O recolorido local das páginas respeita a paleta preexistente e dá respiro aos capítulos de evidências: Direitos, Quem chega, Votos, Materiais e Sobre, com cromia editorial e painéis de leitura adequados. Não adicionar fotografia às páginas em que o assunto é prova legislativa ou comparação estatística. Análise completa: `docs/revisao-de-ritmo-e-consolidacao-16nov2026.md`.


## 16/11/2026 — imagens e evidências nas páginas Achados, Barreiras e Histórico (PR #33)

A revisão completa de `/achados`, `/barreiras` e `/historico` preservou a matriz de pertinência e **não acrescentou fotografias ou fac-símiles não verificados**. Em **Achados**, gráficos e fichas citáveis já compõem a visualização pertinente; não se justifica fotografia decorativa em cada categoria. Em **Barreiras**, fontes primárias são três links identificados (Lei 14.192/2021, painel de processos TSE/MPF e representações do MPF), cuja natureza é explicitada; não criar imagem falsa da lei nem misturar registros judiciais com vítimas. Em **Histórico**, as bases TSE 2014–2026 e os gráficos ocupam o lugar da evidência, e retratos de outras épocas seriam anacrônicos. A intervenção foi de **hierarquia cromática e capítulos internos**, com `Achados` preservada, sem alterar a semântica das visualizações. Capturas integrais/testes: [GitHub Actions #43956945141](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43956945141). Relatório: `docs/revisao-integrada-achados-barreiras-historico-16nov2026.md`. Direitos pendentes dos retratos e documentos anteriores não foram liberados.
