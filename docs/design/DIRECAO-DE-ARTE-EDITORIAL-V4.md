# Quem são elas? — Direção de arte editorial V4 (estudo)

**Situação:** documento de trabalho; nenhuma mudança visual aprovada ou aplicada ao site público.  
**Data:** 15/11/2026. **Base:** redesign integrado à `main` pelo PR #3, incluindo TSE 15/11.  
**Apoio:** auditoria integral no PR #4 e protótipos HTML/PNG entregues na conversa correspondente.

## Diagnóstico

A identidade já dispõe de logo original, Fraunces, Work Sans, roxo estrutural, fotografia documental e aberturas diferentes. O problema restante é de **ritmo editorial e arquitetura da informação**: certos componentes visuais se repetem em funções muito diferentes; páginas densas (Método, Eleitas, Direitos, Histórico, Achados) não têm sempre um caminho proporcional à complexidade; páginas curtas (Dados, Busca e Reportagens) podem funcionar melhor como pontos de descoberta.

## Três famílias e quatro páginas de demonstração

1. **Revista e reportagem — Capa:** fotografia documental, título e linha fina, autoria e escolha dos desdobramentos; não impor a mesma estrutura aos outros conteúdos.
2. **Investigação de dados — Dinheiro:** um resultado por unidade de leitura, explicação do denominador e do universo ao lado do gráfico, acesso ao explorador e ao registro metodológico.
3. **Consulta e documentação — Quem entrou:** catálogo legível, filtros, ficha por eleita e transição futura para acompanhamento de mandato, sem confundir eleita, diplomada e ocupante.
4. **Consulta e documentação — Método:** sequência real da apuração, cálculo aberto com valores integrais, bases, dicionário e correções em camadas de consulta.

## Regras preservadas

- Logo original e marca “Quem são elas?” inalteradas.
- Roxo institucional `#5B2A86`, roxo profundo `#341736` e tinta `#231C28` como referências sRGB do estudo; papel quase branco `#FFFEFD` na leitura, lilás `#F0E9F5` apenas em agrupamentos. Magenta `#AD236E` e vinho `#742449` são acentos **editoriais** e não categorias raciais/partidárias.
- Os tokens OKLCH atuais continuam válidos. Nenhuma nova cor deve ser aplicada a gráficos sem verificar o significado da cor, contraste e legenda. O coral existente mantém a convenção temporal onde já se aplica.
- Fraunces / Work Sans / IBM Plex Mono preservadas; escala, largura e espaçamento avaliados em computador e celular.
- Documentos e fotografias reais, com procedência, data, crédito e direitos verificados. Sem imagens sintéticas com aparência documental.
- Evitar repetição de grandes faixas roxas, micropílulas de datas quebradas, linhas decorativas e mini-gráficos sem leitura autônoma.
- Toda visualização deve ter pergunta, valores, fonte, corte, universo, denominador, método e limites. Preservar preta e parda separadas; agregação declarada quando usada.

## Cobertura integral — a aprovação precisa contemplar o site inteiro

| Família | Rotas representativas | Critério editorial |
| --- | --- | --- |
| Capa e descoberta | `/`, `/temas/`, `/temas/$slug/`, `/busca/` | A pessoa encontra uma investigação ou um dado sem passar por menus excessivos |
| Candidatura, eleição e cadeiras | `/quem-sao-elas/`, `/votos/`, `/funil/`, `/quem-chega/`, `/historico/`, `/partidos/`, `/relatorio-2026/` | Etapas eleitorais e denominadores não são misturados |
| Consulta e arquivo | `/eleitas/`, fichas, `/dados/`, `/comparar/`, `/downloads/`, `/achados/` | Busca/filtros acessíveis, resultado explorável e fontes recuperáveis |
| Reportagens e atuação | `/reportagens/`, `/como-votaram/`, `/na-voz-delas/`, coleção antigênero, `/monitor/`, `/coautoria/`, `/quem-controla/`, `/condicoes/` | A forma favorece leitura de evidências, contraditório e distinção entre registro/interpretação |
| História e direitos | `/direitos/`, `/em-disputa/`, `/barreiras/`, `/pioneiras/`, perfis | Documento, cronologia e fotografia cumprem função informativa |
| Transparência | `/metodo/`, `/sobre/`, `/investigacoes/`, `/calendario/` | Explicação acessível com documentação integral disponível |

## Critérios antes de executar novo redesign

1. Aprovar a direção visual por comparação de composições, inclusive celular.
2. Auditar contraste, foco visível, ordem de tabulação, H1/H2, imagens e textos.
3. Fazer alterações por componentes compartilhados e famílias editoriais, mantendo screenshots antes/depois.
4. Testar dados, fontes, números, links e importação/exportação; não reprocessar investigações de cortes anteriores sem nova apuração.
5. Criar PR(s) distintos de publicação; executar CI e validar o pacote HostGator **antes de qualquer upload**.

**O conteúdo desta branch registra apenas o estudo.** Os protótipos HTML complementares foram preparados como arquivos independentes, sem substituir páginas do produto.