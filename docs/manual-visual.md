# Manual visual do Quem são elas? (v3 — decisões consolidadas em 15/11/2026)

Esta versão consolida o manual v2 e as decisões editoriais posteriores de novembro de 2026. O histórico da v2 permanece no GitHub. O projeto gráfico aprovado orienta as mudanças na interface; a existência de um estilo ou componente no código não implica aprovação automática de seu uso em todas as páginas.

**Estado de implementação:** este manual consolida as decisões editoriais aprovadas e é versionado separadamente das propostas de redesign. Suas regras não implicam que todas as páginas já estejam adequadas. As composições internas dependem de comparação com a homepage e de validação editorial em computador e celular antes de qualquer publicação.

**Ordem de precedência:** decisões editoriais mais recentes e explícitas prevalecem sobre orientações antigas do manual, especialmente no uso de fios ornamentais, superfícies brancas/lilases e ilustrações vetoriais. Divergências entre decisão e código devem ser registradas, testadas e resolvidas na branch de revisão, sem alterar silenciosamente a `main`.

## Conceito

**Revista jornalística contemporânea, independente, feminista, de jornalismo de dados e investigação política.** Manchetes, reportagens, coleções, perfis, fotografias documentais, fontes primárias e visualizações integram a mesma linguagem editorial. A apresentação deve comunicar a investigação sobre o caminho entre candidatura, financiamento, eleição e exercício efetivo do poder.

Fotografia ou documento real tem prioridade quando constitui evidência pertinente à pauta. Arte vetorial original e visualização devem responder a uma necessidade editorial específica, sem virar uma fórmula repetida. Organização, alinhamento, respiro e legibilidade permanecem essenciais; força visual não é acúmulo de elementos.

A identidade é própria: o projeto recusa virar cópia visual de outro veículo e recusa a saída genérica de preto, branco e roxo "sofisticado".

## O que fica fixo

- A logo atual e o símbolo do olho. A logo é a âncora entre a identidade antiga e a nova; a reforma é no sistema em volta dela.
- O olho aparece discreto: favicon, assinatura de gráfico (quemsaoelas.com.br no rodapé de cada ficha), marca d'água. Nunca grande e repetido em toda página.
- Roxo como cor estrutural, com tinta, violeta, coral, dourado e creme quente em composições editoriais criteriosas. O **vinho não é uma nova cor estrutural aprovada**.
- Tipografia com funções distintas: Fraunces em manchetes e títulos; Work Sans para leitura e interface; IBM Plex Mono para fontes, datas, identificadores e tabelas.
- **Homepage aprovada preservada:** `src/components/home/CapaEditorialV3.tsx`, abertura com fotografia documental do plenário, logo original e a hierarquia existente. Refina-se o ritmo da revista sem reconstruir a capa.

## Paleta

A paleta estrutural é a do projeto. A substituição integral da identidade pela paleta coral, amarelo e verde sugerida na auditoria externa de novembro de 2026 foi recusada. Em 15/11, foi aprovada uma ampliação para **capas, chamadas, coleções, imagens autorais e composições jornalísticas** com tinta, ameixa, violeta, creme quente, coral e dourado. Isso não altera a semântica dos gráficos, nem autoriza substituir o roxo estrutural ou acrescentar uma nova cor de marca.

| Token                          | Valor                                   | Papel                                                                                      |
| ------------------------------ | --------------------------------------- | ------------------------------------------------------------------------------------------ |
| `--plum`                       | oklch(0.39 0.16 305)                    | Cor protagonista: títulos, fios de seção, blocos fortes em largura total, links            |
| `--ink`                        | oklch(0.19 0.035 310)                   | Texto, rodapé, blocos fortes escuros                                                       |
| `--paper`                      | oklch(0.992 0.002 300)                  | Fundo atual quase branco da leitura: **não deve dominar visualmente** todas as páginas     |
| `--cream`                      | oklch(0.955 0.012 300)                  | Fundo claro atual, de tonalidade fria, **diferente do creme quente editorial**             |
| `--muted`                      | oklch(0.955 0.008 305)                  | Fundo claro alternado (cinza-lilás quase neutro)                                           |
| `--coral` / `--coral-ink`      | oklch(0.63 0.2 34) / oklch(0.5 0.19 32) | Laranja com função: marca o dado de 2026 nos gráficos; `coral-ink` para texto              |
| `--plum-soft`, `--plum-bright` |                                         | Variações do roxo em gráficos e sobre fundo escuro                                         |
| `--lilac`, `--butter`          |                                         | Só detalhe: marcador, faixa de escala de mapa, caixa pequena de dado. Nunca fundo de seção |
| `--rule`                       | oklch(0.87 0.014 305)                   | Fios finos e bordas                                                                        |

### Fundos (direção B, aprovada em 02/11/2026)

- Áreas claras servem à **leitura e à consulta**, sem transformar a página inteira em uma sequência de fundos quase brancos e lilases.
- A composição editorial alterna, com intenção, superfícies de roxo estrutural e tinta, fotografia documental, recortes de documentos, dados e áreas de respiro. A alternância não deve ser mecânica.
- O creme quente de `--art-cream` pertence ao repertório das composições; o `--cream` da interface está hoje configurado como tom frio. **Não confundir os dois** nem converter um em paleta estrutural nova sem aprovação.
- Tons pastel saturados não ocupam grandes áreas. No `SectionBlock`, `lilac` e `butter` são aliases de compatibilidade para tons claros; seu uso reiterado deve ser revisto.
- Evitar gradientes decorativos, páginas inteiramente brancas, tarjas roxas repetidas em toda rota e fundos escolhidos sem relação com a função jornalística.

### Imagens autorais: repertório cromático (15/11/2026)

A prancha de seis painéis enviada pela editora é uma **referência de relação entre cores**, não um modelo estilístico a copiar. Seus tons aproximados ficaram em tokens próprios no `src/styles.css`: `--art-ink` (#341738), `--art-plum` (#602f6a), `--art-violet` (#915fa5), `--art-cream` (#f7e5d8), `--art-coral` (#eb5d39) e `--art-gold` (#f2ac37).

- Aplicar estes tokens em **composições interpretativas, capas de reportagens/coleções, chamadas e imagens autorais**. O fundo de leitura pode utilizar `--paper` ou outros tons legíveis, mas a composição geral não pode voltar à predominância visual de `--paper`/`--muted`.
- As artes são vetoriais e originais; não simular documentos oficiais, votos, pessoas ou estatísticas. Título fora da imagem. Identificar como arte editorial.
- Manter a grade: sem elementos inclinados, sobreposição decorativa, gradiente ou textos fictícios.
- **Não usar** `--art-coral` ou `--art-gold` para codificar dados. A regra `--coral` = dados eleitorais atuais (2026), assim como as cores por cor/raça, permanece inalterada.
- Alternar **fotografia documental, documento real, visualização de dados e composição autoral**, conforme a pauta. Não preencher espaço por obrigação, nem transformar o mesmo SVG em imagem de toda a revista.
- Não duplicar a manchete dentro da imagem apenas porque existe um card de chamada. O título e a peça devem cumprir funções complementares.

### Laranja com função

Em gráficos, tabelas e marcadores de resultado, o laranja `--coral` marca o dado atual (2026) e datas de destaque. Nas composições ilustrativas, somente o token isolado `--art-coral` pode ser usado como elemento expressivo, sem sugerir codificação numérica.

### Combinações proibidas

- Texto laranja sobre roxo escuro (ruim de ler).
- Qualquer texto (roxo, preto) sobre fundo laranja. Laranja pode ser bloco de cor com o texto ao lado, sobre creme.
- Duas cores fortes sobrepostas.

## Cor de cor/raça nos gráficos

Paleta própria, igual em todos os gráficos, sempre com rótulo escrito (a cor nunca é a única pista):

| Categoria      | Cor                          |
| -------------- | ---------------------------- |
| Branca         | `--race-branca` (cinza-roxo) |
| Parda          | `--race-parda` (ocre)        |
| Preta          | `--plum`                     |
| Indígena       | `--forest` (verde)           |
| Amarela        | `--race-amarela` (azul)      |
| Sem informação | `--race-na`                  |

Pretas e pardas aparecem sempre separadas. Quando somadas como população negra, a soma é declarada.

Cor não carrega julgamento: nada de cor partidária, moral ou de alerta aplicada a grupos.

## Tipografia

| Família                   | Uso                                                                    |
| ------------------------- | ---------------------------------------------------------------------- |
| Fraunces (400, 600, 700)  | Títulos, grandes números, citações, chamadas, nome de seção em itálico |
| Work Sans (400, 500, 600) | Texto corrido, legendas, filtros, menus, rótulos de interface          |
| IBM Plex Mono (400, 500)  | Só fontes, datas, hashes e números de tabela                           |

- Tamanho mínimo de letra: 13px. Nada de 10px ou 11px.
- Nada de frase longa em caixa-alta mono.
- Usar número em posição de manchete quando sustenta a informação central, com universo e fonte identificáveis; não impor um número-herói como fórmula a cada abertura.

## Abertura de seção

O componente `Secao` oferece o nome da seção em Fraunces itálico e, quando pertinente, o tipo de matéria ao lado ("reportagem", "perfis"). Substitui etiquetas em mono caixa-alta. **Não há aprovação para repetir fios roxos grossos em todas as seções.** Um fio fino pode marcar uma divisão real; quando a composição já tem hierarquia suficiente, omiti-lo. Na branch de revisão, `Secao` aceita `semFio`, mas ainda mantém `border-t-2` como padrão técnico: **essa diferença entre intenção e implementação requer revisão contextual**, não mudança global automática.

Numeração de capítulos (01, 02, 03) só onde há sequência real.

## Registro editorial

Componente `Registro`: fato (fio roxo), interpretação (fio tinta), hipótese (fio tracejado, com data de registro). É a única marcação com moldura própria e funciona como assinatura do site.

## Gráficos

- Todo gráfico responde a uma pergunta e tem título que diz o achado.
- Ficha do gráfico junto dele: o que estou vendo, quem é contado, denominador, data, fonte, limitação.
- Rótulos escritos além da cor; alternativa em texto ou tabela para os dados essenciais.
- Sem barras ilustrativas que pareçam dado: etapa sem número fica vazia, marcada como pergunta em aberto.

## Imagem

- Nenhuma imagem gerada por inteligência artificial como ilustração editorial (regra do `AGENTS.md`). As ilustrações de personagens do manual v1.0 foram aposentadas.
- Fotografia só documental, pertinente, licenciada e com crédito, registrada em `src/data/fotos.ts`. Respeitar **evento, data, pessoa retratada e contexto**; não usar imagem de plenário para representar votação diferente.
- A fotografia da homepage, de uma pauta da Câmara, deve manter a legenda contextual que esclarece não retratar as seis votações analisadas.
- Documentos reais como imagem: fac-símile de jornal, diário oficial, ficha do TSE. **Transcrição recomposta, índice de referências e montagem editorial não são fac-símiles** e devem ser identificados como tal.
- O retrato de **Pagu** continua com direitos/procedência de publicação não totalmente verificados; não interpretar a indicação de domínio público no Commons como autorização automaticamente consolidada.
- Não criar retratos, cenas políticas, votações ou documentos artificiais por inteligência artificial.

## Instagram

- Capa do carrossel é o card mais chamativo; carrosséis enxutos.
- Frases didáticas, com a comparação explícita (com o quê, quando).
- Pedido de compartilhamento vai na legenda, nunca no card.
- Card final destaca a marca: olho, "Quem são elas?" e o site.

## Acessibilidade

- Contraste WCAG 2.1 AA (auditoria axe zerada em 27 páginas em 02/11/2026).
- Link "Pular para o conteúdo", foco visível, navegação por teclado.
- Informação nunca depende só da cor.

## Diferenciação entre famílias editoriais

| Família | Tratamento que cumpre função jornalística | Evitar |
| --- | --- | --- |
| Homepage e chamadas | Capa fotográfica já aprovada; alternância entre manchete, visualização eleitoral, reportagens, coleções e materiais, com contraste cromático expressivo | Reconstruir o cabeçalho; repetir a mesma arte em todas as chamadas |
| Quem entrou? / Presença | Dados eleitorais exploráveis, UF, filtros e fichas, com percentuais e denominadores por cargo | Listagem infinita sem hierarquia; retratos inventados; foto pré-eleitoral apresentada como eleita |
| Método | Conta aberta, documentação real, procedimentos de extração e recontagem, dicionário dos campos e limites | Texto sem hierarquia; papéis falsamente apresentados como documentos do TSE |
| Reportagens / Agenda | Fotografia relacionada ao evento, documento primário, achado principal e gráficos quando necessários | Longas sequências indiferenciadas de gráficos/textos, fotografia genérica de plenário |
| Temas / Investigações | Identidades de abertura variáveis conforme evidência e pergunta; diversidade de tratamentos cromáticos e documentais | Mesma faixa roxa, mesmo vetor ou mesma grade de cartões em todas as rotas |
| Pioneiras / Memória / Direitos | Retratos de época com direitos conferidos, fontes normativas, arquivos e fichas eleitorais; distinção entre documento e transcrição | Transformar toda história em cartões; simular documentos históricos |
| Biblioteca / Dados | Materiais apresentados como publicações reais; rotas de consulta legíveis, links e metadados | Estética de dashboard e catálogo corporativo sem ritmo editorial |
| Sobre / Transparência | Texto autoral, compromissos, ficha institucional e documentos com apresentação de revista; autoria individual preservada | Fundo predominantemente branco, aparência de manual corporativo, inventar equipe |

**A referência Gênero e Número é a variedade de soluções jornalísticas por pauta, não a reprodução de uma identidade alheia.** A aparência precisa revelar a especificidade das evidências do Quem são elas?.

## Critério de revisão e autorização

1. **Comparar ao conjunto aprovado:** a homepage fotográfica é a referência de linguagem, não um template de cabeçalho para copiar.
2. **Exigir pertinência visual:** cada fotografia ou documento com fonte, contexto, crédito e direitos; cada visualização com método e universo; cada arte autoral com função própria.
3. **Verificar ritmo cromático da página completa**, não apenas a primeira dobra. Áreas claras são legítimas, mas sua predominância e repetição com lilás foram rejeitadas.
4. **Conferir renderizações reais em desktop e celular**, incluindo acessibilidade e legibilidade. Build e ausência de erros JavaScript não aprovam direção de arte.
5. **Preservar a `main` e a publicação até aprovação editorial específica.** O PR #1 contém o histórico da etapa v3; o PR #6 permanece uma prévia de melhorias funcionais e composições internas, **não aprovada para merge como redesign**.

### Documentos e referência de versão

- `docs/acervo-visual-etapa2.md` no branch `redesign-editorial-v3-teste` (curadoria original de ativos, relações entre pautas e licença de Pagu).
- `docs/design/CAPA-APROVADA-CONTINUIDADE-EDITORIAL-15NOV2026.md` (preservação da homepage e limites do PR #6).
- `docs/design/REPERTORIO-DOCUMENTAL-E-USO-DE-VETORES-15NOV2026.md` (auditoria das substituições pontuais na prévia).
- `src/styles.css`, `src/data/fotos.ts` e componentes editoriais (estado efetivo do produto, a ser conferido contra as decisões acima).

**Este manual registra decisões consolidadas. Não representa autorização para integrar ou publicar alterações visuais pendentes.**


## Registro vivo de decisões e auditoria integrada de 15/11/2026

### Regra de atualização do manual — determinação editorial

A cada decisão sobre identidade visual, direção de arte, paleta, composição, tipografia, fotografia, documentos, infografias ou navegação editorial, **atualizar o mesmo arquivo editável de continuidade** `Quem_sao_elas_Manual_Identidade_Editorial_Continuidade_2026-11-15.md`, preservando o nome e registrando data, página afetada, decisão, motivo, evidência visual, arquivos/PRs e estado (aprovado, proposto, rejeitado ou pendente). Entregar novamente a versão editável à editora. **Esta seção e o manual `docs/manual-visual.md` da `main` devem refletir a mesma orientação normativa**, sem criar uma nova identidade ou manuais concorrentes.

Não confundir: parecer técnico ou avaliação visual preliminar não equivale à aprovação editorial. Não atualizar uma diretriz aprovada apenas porque uma branch contém uma versão diferente.

### Avaliação comparativa dos três pilotos no PR #8 — 15/11/2026

**Evidências:** capturas de página completa em desktop 1440 px e celular 390 px, realizadas no GitHub Actions [#43771862025](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43771862025). Referência: homepage aprovada na `main`. Páginas de teste: `/eleitas/`, `/metodo/`, `/reportagens/` da branch `pilotos-revista-visual-15nov2026`.

| Página | O que avançou | Ainda precisa avaliação / não aprovar automaticamente |
| --- | --- | --- |
| **Homepage** | Fotografia documental, hierarquia de revista, alternância de temas. | **Preservar como aprovada**. As miniaturas claras dos materiais devem ser conferidas; a captura não prova se são placeholders intencionais ou falha de carregamento. |
| **Quem entrou?** | Proporções por cargo com denominadores, filtros, atlas de **contagens absolutas** por UF e consulta nominal paginada. | Em celular, caminho longo entre filtros, atlas e fichas; avaliar acesso rápido aos nomes e equilíbrio entre informação e navegação. Atlas não é mapa geográfico e não mede proporção de vagas. |
| **Método** | Captura real do portal TSE, esquema metodológico vetorial, fotografia institucional contextualizada, conta financeira verificável e 16 capítulos técnicos em caderno recolhível. | Conferir legibilidade do documento em celular, pertinência da foto e acesso direto a procedimentos/âncoras; **não considerar a proposta aprovada**. |
| **Reportagens** | Placar de seis votações em vez da fotografia repetida da homepage, referências textuais ao Diário da Câmara e contraste coral/tinta. | As legendas devem explicitar que “Sim/Não” se referem ao texto votado e que outras situações compõem a categoria residual; conferir leitura móvel e contraste da seção documental. |

**Achado transversal:** as três páginas-piloto variaram os tipos de evidência, mas continuam repetindo a lógica de grandes fundos escuros e aberturas repartidas em duas colunas. A identidade aprovada exige **diversidade de soluções por pauta**, não o mesmo cabeçalho com outra imagem. **Recomendação em avaliação:** variar escala, localização e sequência da evidência nas aberturas, mantendo roxo estrutural e paleta original. Isso **não** autoriza trocar a capa, adicionar imagem sem pertinência, criar cores novas, impor foto/vetor a todas as páginas ou fixar percentuais de área por cor.

**Situação:** diagnóstico registrado, **nenhuma nova composição aprovada** e PR #8 ainda em rascunho. Mostrar alternativas justificadas e capturas completas antes de qualquer integração. A versão editável de continuidade recebeu estes achados e o protocolo de atualização em 15/11/2026.


### Alternativas em prévia para distinguir as aberturas — 15/11/2026

**Estado:** propostas implementadas **somente** na branch `pilotos-revista-visual-15nov2026` do [PR #8](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/pull/8), ainda **não aprovadas editorialmente**, sem merge nem publicação. Referência visual: auditoria integrada de página inteira em desktop e celular.

- **Quem entrou?** alternativa transversal em `--art-coral` com total das mulheres eleitas em destaque; proporções por cargo passam à faixa separada em `--ink`, com universos e denominadores preservados. Os filtros ganham link direto à lista nominal. Testar especialmente se a área coral em larga escala respeita a linguagem adulta e mantém legibilidade; **não torná-la padrão automático**.
- **Reportagens:** alternativa com manchete de investigação em largura total, sobre `--art-plum`, seguida do placar das seis votações em largura total sobre tinta, em duas colunas no desktop. Preservar contagens, datas, fonte, contexto do voto literal e ressalvas. **Não é fac-símile nem substitui a reportagem completa.**
- **Método:** abertura documental com captura real do TSE mantida inalterada nesta rodada; a variedade deve resultar da função da evidência, não da aplicação da mesma grade em todas as páginas.

**Critério de decisão:** conferir capturas reais das páginas completas e sua primeira dobra em desktop e celular, legibilidade, contraste, navegação, e depois aprovar/rejeitar **cada proposta**. O fato de as cores já pertencerem à paleta aprovada **não autoriza** sua aplicação nesta escala sem avaliação.

O arquivo editável permanente `Quem_sao_elas_Manual_Identidade_Editorial_Continuidade_2026-11-15.md` foi atualizado, na seção 14.4/14.5, com os mesmos estados e critérios. **Nenhuma nova composição foi incorporada como regra aprovada deste manual.**


**Verificação técnica das alternativas (15/11/2026):** [GitHub Actions #43774175278](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43774175278) concluído com sucesso no commit `42a550e906388d8df94cb068fce7768d6020f8da`. Foram verificados build, TypeScript, cálculos financeiros, cinco proporções por cargo, seis votações, acesso direto às fichas e capturas reais de desktop 1440 px/celular 390 px (primeira dobra e página completa). O arquivo editável de continuidade registra esta mesma evidência. **Permanece pendente o aceite editorial das duas propostas; teste técnico não valida automaticamente proporção cromática, legibilidade ou identidade.**


### 15/11/2026 — Legibilidade do texto na abertura coral de *Quem entrou?*

**Decisão aprovada pela editora:** manter o **coral** como linguagem expressiva de `/eleitas/`, mas substituir o texto escuro/preto da abertura por **texto claro**. A combinação anterior cansava a leitura. Esta decisão fixa o **princípio de legibilidade**, mas não constitui aprovação integral do layout de `Quem entrou?`.

**Aplicação em prévia:** na branch `pilotos-revista-visual-15nov2026` (PR #8), a abertura passou de `--art-coral: #eb5d39` com texto em tinta para uma **variante tonal coral mais profunda `#c53f22` com texto `--paper`**, inclusive na manchete, no número, na legenda e no CTA. O token `--art-coral` **não foi alterado**, não surgiu uma cor estrutural nova nem se modificou a semântica cromática dos gráficos.

**Razão técnica:** texto branco sobre o coral original tem contraste aproximado de **3,4:1**, insuficiente para corpo de texto WCAG AA (4,5:1); `#c53f22` com papel claro permite contraste superior a 4,5:1. A verificação automatizada do navegador usa amostragem sRGB para suportar valores CSS em `oklch` e exige contraste de **4,5:1** para títulos, textos e links da abertura em computador e celular. [GitHub Actions #43776806314](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43776806314) **passou**, incluindo o teste de contraste WCAG AA em computador e celular. A aceitação visual integral continua pendente.

**Decisão pendente:** aceitar ou ajustar a **escala da área coral** na composição geral depois de conferir as capturas de página inteira, sem voltar a texto preto nessa abertura.

**Registro complementar:** arquivo editável único `Quem_sao_elas_Manual_Identidade_Editorial_Continuidade_2026-11-15.md`, seção 14.6. Toda nova decisão deve atualizar este mesmo arquivo e o manual da `main`, sem criar documentos concorrentes.


### Parecer de aceitação integrada das páginas-piloto — 15/11/2026

**Estado:** avaliação visual concluída, **sem aprovação final das composições**. Confrontaram-se capturas reais da primeira dobra e de páginas completas, em desktop (1440 px) e celular (390 px), com o código do PR [#8](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/pull/8) e a homepage fotográfica aprovada. Referência: [Actions #43776806314](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43776806314).

**Achado:** as páginas agora apresentam tratamentos distintos, com finalidade jornalística. `Quem entrou?` usa manchete transversal coral com texto claro, dados por cargo, atlas absoluto por UF e arquivo nominal; `Método` usa página real do portal TSE, esquema original do processo, foto da bancada devidamente identificada e conta financeira, preservando 16 capítulos no arquivo técnico; `Reportagens` usa manchete em ameixa e placar das seis votações, com fontes literais do Diário da Câmara. Não há mais a repetição da mesma hero bipartida nos três pilotos; o branco fica principalmente nos trechos de leitura/consulta. Isso **não significa aprovação editorial automática**.

| Página | Recomendação para deliberação | Pendências de aceitação |
| --- | --- | --- |
| **Quem entrou?** | Conservar **coral profundo com letras claras**, princípio aprovado pela editora, e a estrutura de consulta com denominadores por cargo e atlas das UFs. | Testar navegação por leitor de tela/teclado e reconciliação de bases eleitorais quando aplicável; as barras do atlas representam números absolutos, não proporções de vagas. |
| **Método** | Conservar a abertura documental e o caderno técnico recolhível com acesso por âncoras. | Garantir leitura de fonte/caption e acesso ao TSE em telas pequenas; conferir anúncio e descobribilidade da documentação recolhida. |
| **Reportagens** | Conservar manchete transversal, o placar dos votos e o contraste entre coral e tinta. | Aproximar da legenda a ressalva de que **Sim/Não** se referem ao texto votado; rever rótulos de **11 px** do placar em telas pequenas. |

**Correção objetiva incorporada apenas ao PR #8:** a seção coral `Na voz delas` tinha textos em `text-plum`, `text-ink/85` e `text-ink/70`, combinações de contraste insuficiente para texto comum sobre `--art-coral`. Foram substituídas por `text-ink` e `text-ink/95`, mantendo a composição e o mesmo coral. A [execução de QA #43780301901](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43780301901), no commit `82be2036a9ecdad810ae95fad9842090affd07bb`, **passou**: Chromium verificou contraste composto de **pelo menos 4,5:1** dos textos sobre coral no desktop/celular, além de build, TypeScript e testes funcionais. A combinação aprovada **coral mais profundo e tipografia clara** de `Quem entrou?` continua intacta.

**Homepage:** não alterada nem reaberta. As miniaturas muito claras de `Materiais` na captura exigem verificação separada antes de atribuir causa técnica ou estética.

**Critério de conclusão:** a editora aprova ou solicita ajustes **por página**; só após esse aceite e a auditoria jornalística/técnica haverá integração à `main` e publicação. O documento editável `Quem_sao_elas_Manual_Identidade_Editorial_Continuidade_2026-11-15.md` foi atualizado na seção **14.7**, com estes mesmos estados. Não tratar parecer, conformidade de contraste ou sucesso de CI como autorização de merge.


### Refinamentos objetivos de leitura e acesso — 15/11/2026 (PR #8)

**Situação:** correções restritas de legibilidade e navegação nos três pilotos, ainda **sem aprovação estética final**. Não constitui uma nova paleta ou template. O arquivo editável único `Quem_sao_elas_Manual_Identidade_Editorial_Continuidade_2026-11-15.md` recebeu a mesma decisão na seção **14.8**.

- **Quem entrou?:** o atlas conserva contagens **absolutas** por UF e a abertura em coral profundo com texto claro já aprovada. Botões de UF passaram a indicar `aria-controls` e a seleção leva foco ao título **Nomes e fichas**; campos de busca ganharam foco visível. Bases e denominadores inalterados.
- **Método:** a chamada principal leva diretamente ao conjunto **Candidatos 2026** no TSE; a captura real do portal pode ser **ampliada**; legenda documental passou a **13 px** e ganhou contraste; acesso ao caderno técnico disponível na abertura, com recolhimento nativo e âncoras. A captura não é o CSV nem estabelece licença automática da interface.
- **Reportagens:** nota contextual sobre **Sim/Não** e a categoria residual imediatamente após a legenda das seis votações, com `aria-describedby`; rótulos numéricos ampliados de **11 para 13 px** e datas de **12 para 13 px**. Nenhum voto ou universo foi alterado.
- **Validação concluída:** [GitHub Actions #43782725785](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43782725785), commit `3034e721e085a42832aa18de455862caddfb8880`, **success**: compilação, TypeScript, verificação financeira, foco após seleção de UF, filtros com rótulos acessíveis, link e ampliação da fonte TSE, abertura/fechamento do caderno por teclado, âncora `#correcoes`, nota da legenda, fonte 13 px e capturas completas em desktop e celular. Esse resultado **não substitui testes com leitores de tela ou revisão editorial humana**.
- **Preservado:** `main` visual, homepage fotográfica, logo, CSS global, `src/data/`, fotografias e fontes originais. As alterações de interface seguem **somente no PR #8 em rascunho**, sem publicação HostGator.

**Próxima decisão:** aprovação ou pedidos de ajustes **por página**, após examinar as capturas mais recentes. Nenhum resultado de QA autoriza integração automática.


### Decisão consolidada — texto claro nas grandes superfícies coral (15/11/2026)

**Decisão expressa da editora:** evitar texto preto/tinta sobre coral nas grandes composições editoriais, mesmo quando o contraste calculado satisfaz um limite técnico. A combinação foi considerada ruim para a leitura. Esta decisão **substitui a orientação anterior de texto escuro no coral original na seção “Na voz delas”**; não reutilizar a solução rejeitada em outros pilotos.

**Solução aplicada no PR #8, sem alterar a paleta global:**
- **Quem entrou?:** a abertura já adotava `#c53f22` com tipografia clara `text-paper` (aprovado anteriormente).
- **Reportagens, “Na voz delas”:** substituído o fundo `--art-coral` com letras em tinta/ameixa por **coral profundo `#c53f22`, com título, corpo, créditos e link em `text-paper`**.
- **Método, fotografia documental:** mesmo fundo `#c53f22` e legenda/link claros; a legenda foi ampliada de 12 para 13 px.
- **Coral original `--art-coral: #eb5d39`:** continua reservado a acentos, gráficos e composições menores, com semântica jornalística preservada. Não aplicar indiscriminadamente texto branco sobre o coral original: o contraste desse par é insuficiente para texto comum.

**Critério de validação:** superfície coral profunda com textos visivelmente claros **e** contraste WCAG AA mínimo de 4,5:1 para tipografia corrente; validar cor computada no navegador e inspecionar capturas desktop/celular. [GitHub Actions #43785757894](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43785757894) **success**, head `939df87c70222e6e987a9b9937dc0f862aaab8e4`. Mantidos homepage, logo, CSS global, bases TSE e imagens originais.

**Governança:** decisão cromática de legibilidade aprovada. As composições completas das páginas-piloto **seguem em avaliação**, apenas no PR #8, sem merge nem publicação. Registrar também no arquivo editável permanente `Quem_sao_elas_Manual_Identidade_Editorial_Continuidade_2026-11-15.md` (seção 14.9).


### Lote 2: índices de Temas, Investigações, Dados e Achados — 15/11/2026 (propostas)

**Estado: testado em prévia, NÃO aprovado editorialmente e NÃO publicado.** A editora determinou avançar pelas muitas páginas restantes, sem prolongar indefinidamente a aprovação dos três pilotos anteriores. O segundo lote foi criado diretamente da `main` no [PR #9](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/pull/9), branch `revista-lote2-indices-15nov2026`. O PR #8 continua separado e em rascunho.

- **Temas**: índice de leitura das seis perguntas, com composição tipográfica, cromatismo motivado pelo assunto e **fotografia histórica existente de Bertha Lutz exclusivamente na entrada Memória**. O posicionamento inicial da foto saiu incorreto no desktop e foi corrigido para a última coluna, com legenda legível.
- **Investigações**: índices por frente e situação editorial, em lugar de grade de cards; os termos “publicado”, “parcial” e “aguardando dado” permanecem explícitos e **não equivalem a graus de confiabilidade das afirmações**. A nota de 04/11/2026 presente em `src/data/architecture.ts` requer revisão de fontes/cortes em trabalho separado, sem substituição silenciosa.
- **Dados**: diretório temático em faixas distintas para leitura e ferramentas, preservando todos os links e tipos de consulta.
- **Achados**: abertura e vitrine jornalística com tratamentos cromáticos diferentes, preservando resultados, fontes, escalas, datas e páginas citáveis.

Os quatro tratamentos são **propostas específicas por função**, não um novo template obrigatório. Continuam vigentes: logo original, fotografia documental pertinente e creditada, roxo estrutural, repertório cromático aprovado, **coral profundo com texto claro nas grandes superfícies**, gráficos com categorias e denominadores corretos, nada de vetores ou cartões repetidos automaticamente. Nenhuma base, fotografia original, token de `src/styles.css` ou homepage foi alterada.

**QA:** [GitHub Actions #43787402665](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43787402665) concluiu com **success** no head `604ff587e825a7faf432cf807bc012918a47254a`, verificando TypeScript, compilação, cinco rotas (inclui homepage) em desktop 1440px e celular 390px, links principais, estrutura dos índices e ausência de transbordamento horizontal. A foto em Memória passou no teste específico de posicionamento. Capturas completas arquivadas no artefato `qse-indices-revista-lote2`.

**Governança:** as propostas foram registradas no **mesmo manual editável permanente**, seção **14.10**, arquivo `Quem_sao_elas_Manual_Identidade_Editorial_Continuidade_2026-11-15.md`. Não interpretar sucesso do QA como aceite visual; nenhuma integração ou publicação foi autorizada.


### Lote 3: fotografias, publicações e documentos reais — 15/11/2026 (prévia)

**Status:** [PR #10](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/pull/10), branch `revista-lote3-acervo-documental-15nov2026`, criada a partir da `main`; **não aprovado editorialmente, sem merge nem publicação**. A direção visual continua orientada pela função jornalística e pela decisão da editora de não substituir material documental por cor ou vetor ornamental.

- **Biblioteca (`/downloads`):** tornar as publicações verdadeiras visíveis como objetos editoriais. A abertura usa miniaturas e páginas **efetivamente existentes** em `public/materiais/` (cartilha de cota, roteiro de oficina e infográfico vertical), preservando downloads, fontes, bases CSV e SHA-256. Na primeira rodada de QA, a área de campos CSV ampliava a página móvel para 503 px; corrigida a quebra de nomes longos e o conteúdo passou a caber na largura móvel de 390 px, **sem esconder conteúdo**.
- **Pioneiras (`/pioneiras/`):** usar, além da foto de Bertha Lutz em 1927 que já pertence à homepage/Temas, **outra fotografia documental**, de sua posse em 28/07/1936 nas escadarias da Câmara no Rio de Janeiro. Original local `public/fotos/posse-bertha-lutz-camara-1936.jpg`, catálogo `src/data/fotos.ts`, registro `BR_RJANRIO_Q0_BLZ_DEU_CLE_FOT_0001`, crédito **Domínio público / Acervo Arquivo Nacional**. Origem e condições: https://commons.wikimedia.org/wiki/File:Posse_de_Bertha_Lutz_como_Deputada_na_C%C3%A2mara_Federal.jpg. Fotografia contextualizada como **aquele evento**, não ilustração genérica de todas as pioneiras. **Pagu continua com direitos pendentes**, não ampliar uso.
- **Direitos (`/direitos`):** inserir transcrição literal do **art. 2º do Decreto 21.076/1932** junto à abertura, com metadados e links para o [texto informatizado original da Câmara](https://www2.camara.leg.br/legin/fed/decret/1930-1939/decreto-21076-24-fevereiro-1932-507583-publicacaooriginal-1-pe.html) e o [registro normativo](https://www2.camara.leg.br/legin/fed/decret/1930-1939/decreto-21076-24-fevereiro-1932-507583-norma-pe.html). Identificar que o decreto é histórico e revogado e que a **transcrição da página oficial não é imagem do Diário Oficial**. Preservar outros fac-símiles tipográficos como peças de transcrição explicitamente rotuladas.
- **Sobre (`/sobre`):** optar por **documentação rastreável** (acesso direto ao conjunto Candidatos 2026 do TSE, ao Método e às correções), mantendo autoria e texto do projeto. Não inserir foto genérica, de plenário ou retrato da autora sem decisão e fonte apropriadas.

**QA técnico:** [GitHub Actions #43791893284](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43791893284) **success**: build, TypeScript, integridade das bases e da homepage, carregamento de três imagens de publicações e foto histórica original, origem e legenda, links para a norma de 1932 e para documentação do projeto, sem overflow ou erros JS em 1440 e 390 px. Capturas completas no artefato `qse-lote3-fotografias-documentos`. O fluxo temporário que obteve a foto foi removido; a foto original e seus metadados permaneceram na branch.

**Regra editorial reforçada:** integrar fotografia e documento **quando fazem parte da prova ou da história narrada**, com crédito, data, licença/condição e distinção entre original, transcrição e visualização. Não repetir imagens nem preencher lacunas com fotos genéricas, capturas artificiais ou documentos simulados. **Nenhuma das quatro composições do PR #10 está automaticamente aprovada.** O arquivo editável único `Quem_sao_elas_Manual_Identidade_Editorial_Continuidade_2026-11-15.md` recebe este registro na seção **14.11**.


### Lote 4: fontes primárias nas investigações — 15/11/2026 (prévia)

**Estado:** três composições em **prévia não aprovada**, no [PR #11](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/pull/11), branch `revista-lote4-fontes-primarias-15nov2026`. Não mesclar nem publicar sem decisão editorial. A versão editável permanente `Quem_sao_elas_Manual_Identidade_Editorial_Continuidade_2026-11-15.md` recebeu exatamente o mesmo direcionamento na seção **14.12**.

- **Quem controla?** Inserir documentos realmente publicados pelo TSE sobre os [critérios formais de distribuição do FEFC de 2026](https://www.tse.jus.br/eleicoes/eleicoes-2026-content/prestacao-de-contas/fundo-especial-de-financiamento-de-campanha-fefc), com processos PJe e íntegra por sigla quando disponível, além da tabela oficial de repartição entre partidos. Tratar em faixa **dourada com texto tinta**. **Critério formal publicizado ≠ valor recebido por candidatura ≠ intenção ou favorecimento**; os últimos requerem apuração própria.
- **Barreiras:** faixa **coral profundo `#c53f22` com letra clara**, relacionando três **fontes de natureza diferente**: Lei 14.192/2021, painel TSE/MPF de processos autuados e [representações do MPF](https://www.mpf.mp.br/atuacao/fiscalizacao-do-processo-eleitoral/atuacao/gt-violencia-de-genero/representacoes-editadas). Nenhum processo ou representação é prova de condenação; a contagem não mede vítimas. Preservar corte do painel de 23/10/2026, consulta de 28/10/2026 e divergência interna entre total e soma por ano.
- **Na voz delas:** transcrição **literal do acervo de falas já conferidas**, com data, pessoa, contexto, link à página original do Diário da Câmara. A reprodução textual não é **imagem do documento** nem permite tomar a fala como comprovação automática de fatos afirmados. Não inserir fotografia genérica da pessoa ou do plenário como suposto registro do discurso.
- **Correção factual associada:** `src/data/temas.ts` continha a afirmação genérica de que critérios do FEFC não são públicos. Foi corrigida **uma frase editorial** da editoria Dinheiro: o TSE publica os critérios formais por partido, mas a aplicação concreta a cada candidatura e a motivação dos repasses ainda devem ser investigadas. Nenhum indicador, valor numérico ou base eleitoral foi modificado.

**Validação:** [GitHub Actions #43794329151](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43794329151), commit `74d1c234a23ce626e1611e251803fdd4d642da84`, **success**. TypeScript, build, proteção das bases numéricas, links documentais, explicitação de limites probatórios, medição de contraste real a partir de cores renderizadas (inclusive OKLCH) e capturas da homepage e três investigações em desktop 1440 px e celular 390 px. Sem overflow horizontal nem erros de JavaScript no roteiro automatizado.

**Nota cromática:** o coral original continua destinado a acentos e gráficos. Nas grandes áreas com texto claro, usar o **coral profundo aprovado** e confirmar contraste. Cores não substituem material factual; cada página necessita linguagem própria. **Teste concluído não significa aprovação visual**, ainda pendente.

## Registro de prévia — lote 5 de páginas de dados (16/11/2026)

**Situação:** proposta isolada na branch `revista-lote5-dados-16nov2026`, ainda **sem aprovação editorial, merge ou deploy**. O arquivo editável de continuidade `Quem_sao_elas_Manual_Identidade_Editorial_Continuidade_2026-11-15.md` recebeu o registro detalhado na seção 14.13; preserva as decisões normativas anteriores.

- **Partidos:** índice para eleitas, candidaturas/eleição, FEFC e votação. A marcação coral de percentuais abaixo de 30% refere-se apenas às candidaturas a deputado e não permite concluir descumprimento dos pisos constitucionais, que cobrem universo maior. Referência: Constituição Federal, art. 17, §§ 8º e 9º.
- **Funil:** seção de contexto histórico no roxo estrutural, com microedição para retirar rótulo temporal anacrônico; os universos das etapas permanecem separados.
- **Histórico:** índice textual de seis áreas da série, sem mexer nos pontos e denominadores. **Corrigida** a menção a “27/09” para “27/10/2026”, com base em `historical.reads.ts` e `resultado-2026.ts`, onde consta a geração TSE de 27/10/2026 19:30:36. Nenhum número foi alterado.
- **Monitor:** abertura em tinta com período de 01/01 a 03/11/2026 e coleta de 04/11/2026; substituir a indicação “fora do exercício hoje” por “na coleta”; reduzir a manchete no celular e identificar com precisão o numerador como **voto ou presidência de sessão**. Sem alteração dos dados de atividade parlamentar.

**QA:** workflow próprio do lote 5 em `.github/workflows/qa-lote5-dados.yml`, com capturas integrais (1440 px e 390 px). A aprovação técnica não valida automaticamente cor, ritmo ou leitura e nenhuma versão foi publicada.

**Escopo protegido:** `main`, homepage, logo, `src/data`, arquivos de base, fotos, documentos e `src/styles.css`. As quatro soluções não se tornam templates obrigatórios para outras rotas.

**QA confirmado em 16/11/2026:** [execução #43798365553](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43798365553), concluída com sucesso após os últimos ajustes. Compilação, tipos, proteção de arquivos, 10 renderizações (cinco rotas × desktop/celular), sem erro de JavaScript nem transbordamento horizontal. Artefato `qse-lote5-dados-previsuais`, com capturas de primeira dobra e páginas completas. **As composições seguem pendentes de aceite editorial.**

## Auditoria de páginas completas — lote 5 (16/11/2026)

**Estado:** [diagnóstico em `docs/design/AUDITORIA-PAGINAS-INTEIRAS-LOTE5-16NOV2026.md`](design/AUDITORIA-PAGINAS-INTEIRAS-LOTE5-16NOV2026.md), **sem aprovação visual, merge nem publicação**. A editora apontou corretamente que a regressão atinge as páginas **inteiras**, não apenas suas aberturas. Foram inspecionadas as capturas integrais de desktop (1440 px) e celular (390 px) da execução [QA #43798365553](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43798365553).

**Partidos:** índice, gráfico e metodologia permanecem úteis, mas a sequência de cartões e tabelas torna a leitura longa, sobretudo no celular. O recorte de FEFC exclusivamente para deputadas e deputados não pode ser lido como teste suficiente de cumprimento da cota constitucional. Proposta: documento formal FEFC do TSE junto da leitura do dinheiro, acesso a consulta integral por partido, resumo contextual e destaque do limite antes da tabela.

**Funil:** manter a abertura roxa e os denominadores separados; as “etapas” são fotografias de **universos diferentes**, não trânsito longitudinal das mesmas candidaturas. Proposta: leitura por problema, UF selecionável, tabela integral acessível e ritmo visual entre evidências.

**Histórico:** o lilás e gráficos semelhantes repetidos criam aparência de relatório. Proposta: contraste narrativo e documental ao longo de todas as séries, seleção de cargos/UF e caderno de quatro arquivos TSE com origem identificada. Não usar fotografia de 1927 como imagem de referência das eleições 2014–2026.

**Monitor:** preservar coleta de 04/11 e período 01/01–03/11/2026, bem como distinção entre voto registrado e presidência de sessão, proposições com coautoria e discursos. Proposta: experiência móvel de consulta individual progressiva, pré-registro de 2027 como documento metodológico e possível foto real do plenário de 30/06/2026 **com legenda que a dissocie do conjunto das votações**.

**Direção preservada:** fontes, créditos, licenças, fotografia/documento apenas com pertinência; paleta editorial adulta e roxo estrutural; convenções das categorias raciais e das barras de dados; homepage e logo protegidas. **Nenhum novo desenho aprovado por este registro**. O procedimento próximo é revisão **por página integral**, na ordem proposta Partidos → Histórico → Monitor → Funil, com aprovação explícita posterior.

## Partidos — prévia da página completa (16/11/2026)

**Estado:** implementação **não aprovada** no [PR #13](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/pull/13), branch `revista-partidos-pagina-integral-16nov2026`, dependente do PR #12. Não houve publicação/merge. A auditoria de páginas completas anterior continua a fundamentação da intervenção.

- **Abertura:** composição própria em tinta e roxo, tipografia clara e universo do TSE, sem alterar a homepage ou o componente global de abertura.
- **Eleitas:** manter o gráfico por cor/raça e as cinco categorias originais, incluindo coluna específica para amarelas; tabela completa em painel sob demanda no desktop e consulta por sigla no celular.
- **Candidaturas/eleição:** dar protagonismo às taxas nacionais e permitir seleção de partido sem eliminar a tabela auditável; bases inferiores a 20 em contagens absolutas.
- **Fotografia documental:** acervo registrado `bancada-feminina-camara-marco-2026.jpg`, Vinicius Loures/Câmara, 04/03/2026, CC BY. Legenda explícita: arquivo anterior à eleição, não retrato de eleitas em 2026. **Verificar duplicidade** com fotografia da proposta Método, antes de aprovar.
- **Documento primário:** no capítulo FEFC, documentos reais publicados pelo TSE, identificados por processo PJe e link ao inteiro teor quando disponível. Amostra de PL, PT e União Brasil apenas para dar acesso ao acervo, sem alegar análise de mérito dos critérios.
- **FEFC:** distinguir critérios publicados, verba destinada a siglas e receitas declaradas a candidaturas; o recorte é exclusivamente deputado federal/estadual/distrital. **Não realçar percentuais abaixo de 30% como infração.** Fundo na base de **15/11/2026**, conforme código do projeto; removida menção antiga a 04/11 e a 343 contas ainda parciais.
- **Votações:** seletor por deliberação e bancada, voto literal Sim/Não, maioria observada e tabela integral. A maioria do partido não é orientação formal de bancada.

**Critério de aceite:** captura **integral** das seções no desktop e celular, tabela expansível testada, contraste e QA. Nenhum arquivo em `src/data`, `public/fotos`, homepage, logo ou CSS global alterado. O manual editável de continuidade recebeu o registro na **seção 14.15**. A proposta não se torna padrão reutilizável para as demais páginas.

**Verificação técnica do PR #13:** [GitHub Actions #43802960429](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43802960429), concluída com sucesso após a revisão do desktop. Compilação, tipos, arquivos protegidos, navegação da homepage e da rota Partidos, interações de seleção e tabelas, fotografia local carregada, ausência de transbordamento horizontal e erros de JavaScript em 1440 px e 390 px. Capturas de abertura e páginas completas no artefato `qse-partidos-pagina-integral`. Resultados: desktop 1440 × 7332 px; celular 390 × 12445 px. **QA aprovado não equivale a aprovação editorial/estética**.

## Histórico — prévia de página inteira (16/11/2026)

**Estado:** [PR #14](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/pull/14) em rascunho, empilhado sobre o PR #13 e o PR #12. **Sem publicação ou aceite editorial final.** A versão editável de continuidade foi atualizada até a seção **14.16**.

- Abertura em tinta, cronologia 2014/2018/2022/2026 com percentuais, **numeradores e denominadores próprios**. A série não segue pessoas entre etapas.
- Cor/raça com superfície roxa, mas gráficos mantêm cores metodológicas, pretas e pardas separadas. Gênero × raça usa outra superfície, mantendo ressalvas de denominadores.
- Capítulo de eleição confronta participação nas candidaturas com participação nas cadeiras, mantendo séries completas; os quatro cadernos de detalhamento podem ser expandidos.
- Exploração por UF com seleção, quatro eleições, cadeiras e proporção, além de **tabela integral das 27 UFs** em expansão. Não converter ausências de dados em zeros.
- **Caderno documental aberto:** fichas com metadados e links para arquivos oficiais do TSE dos quatro anos. A fotografia de Bertha Lutz de 1927 **não foi reutilizada**, por ausência de relação temporal com a série.
- Preservados números, snapshots, scripts, lacuna de 2018 no Senado, dados raciais, datas e metadados de extração. Nenhuma alteração no CSS global, fotos, dados, logo ou homepage.

**Validação:** workflow independente com TypeScript, build, proteção de arquivos, consultas e capturas integrais em desktop 1440 px/celular 390 px. Capturas ainda exigem inspeção humana antes de aceite.

**QA confirmado para Histórico:** [execução #43803631665](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43803631665), concluída com sucesso. Renderizações desktop 1440 px e celular 390 px, navegação pelas séries, quatro links a conjuntos TSE, consulta por UF, tabela integral, proteção dos dados e da homepage; sem overflow ou erros de JavaScript. Capturas integrais arquivadas como `qse-historico-pagina-integral`. **Ressalva editorial:** a página continua extensa no celular (cerca de 19,5 mil px de altura na captura); o êxito técnico não a aprova em termos de ritmo e densidade de leitura.

## Monitor de mandato — prévia integral (16/11/2026)

**Estado:** [PR #15](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/pull/15), **em rascunho**, dependente dos PRs #14, #13 e #12. Não publicado nem aprovado visualmente. A continuidade foi registrada na seção 14.17 do manual editável.

- Abertura de atividade parlamentar de **01/01 a 03/11/2026**, coleta em **04/11/2026**, com navegação direta para registros individuais, tabela integral e pré-registro de 2027. Numeradores e denominadores do recorte original permanecem.
- Fotografia histórica catalogada de **30/06/2026** da Câmara (Thiago Cristino/Câmara, CC BY). Legenda deixa inequívoco que **não é reprodução das votações que compõem a série** nem evidência individual das deputadas analisadas.
- Consulta de deputada com filtros por nome, partido, UF e resultado eleitoral de 2026; ficha individual reconstitui as contagens originais sem alterar dados. Indicador de votação inclui votos registrados **ou presidência da sessão**; percentual apenas se a base tem no mínimo o patamar já fixado. Assinatura de proposição inclui coautoria, discurso é registro administrativo.
- A tabela com todas as deputadas é mantida, mas acessível sob expansão e sem sobrecarregar o percurso móvel. A consulta aponta diretamente para a API de Dados Abertos da Câmara.
- Pré-registro de indicadores de 2027 em destaque dourado, datado de 04/11/2026 e diferenciado dos resultados da legislatura observada em 2026. Não apresentar critérios a partir de fevereiro de 2027 como dados já coletados.

**Proteções:** valores, fontes, datas, classificação de candidaturas, homepage, logo, CSS global, acervo e arquivos de dados preservados. QA específico em desktop/celular, com fonte fotográfica real, filtros, tabela, acessibilidade de leitura e revisão visual de página completa. Aceite editorial pendente.

## Funil — prévia integral (16/11/2026)

**Estado:** [PR #16](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/pull/16) em rascunho, baseado no PR #15, que depende dos PRs #14, #13 e #12. Sem merge, publicação ou aceite visual final. Seção 14.18 do manual editável de continuidade.

**Questão metodológica central:** o nome histórico da editoria é “Funil”, mas os registros de candidaturas proporcionais, majoritárias e cadeiras preenchidas têm universos **diferentes**. A apresentação não deve simular uma sequência longitudinal de pessoas. Por isso, os quadros perderam sua numeração e ordem aparente de etapas, mantendo percentuais, numeradores e denominadores originais.

**Intervenção em toda a página:**
- Preservado o roxo da abertura e o gráfico central, com revisão do título do capítulo e das instruções de leitura.
- Em candidaturas por vaga: fonte documental real dos arquivos **Candidatos 2026** (numerador) e **Vagas 2026** (denominador) do TSE, cada qual com link ao original e seu corte temporal. Não há fotografia genérica para insinuar exclusão.
- Consulta territorial por unidade eleitoral, com contagens de candidaturas, vagas, candidaturas por vaga e candidaturas de mulheres no território selecionado; tabela integral com ordenação e filtros existentes preservada em expansão. Não usar essa razão como chance individual de eleição.
- Alternância de planos cromáticos e preservação da comparação histórica e da explicação do quociente eleitoral, sem introduzir hipóteses novas nem alterar dados.
- Preta e parda continuam distintas; agregação somente explicitada em texto e com denominador correto.

**Restrições:** `main`, homepage, logo, `src/data`, fotos, scripts e CSS global permanecem protegidos. Proposta sujeita ao QA de desktop/celular, inspeção de página inteira e decisão editorial.

**QA integral do Funil confirmado:** [execução #43804651700](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43804651700) concluída com sucesso. Tipos, compilação, proteção de arquivos, fontes oficiais Candidatos/Vagas, navegação, seleção de UF, tabela completa e dezena de testes em dois tamanhos; capturas de homepage e Funil inteiros em 1440 px e 390 px. Sem transbordamento horizontal ou erro JS. Altura da versão móvel da página: aproximadamente 11,5 mil px, ainda exigindo avaliação editorial do percurso de leitura. Artefato `qse-funil-pagina-integral`. Nenhum aceite de direção de arte foi inferido do QA.

**QA integral do Monitor confirmado:** [execução #43804158199](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43804158199), concluída com sucesso. A ficha individual, filtros, tabela integral expansível, foto contextualizada e pré-registro foram verificados no desktop e no celular. O comprimento móvel padrão diminuiu para aproximadamente 6,6 mil px com a tabela disponível em segundo nível. Artefato `qse-monitor-pagina-integral`, ainda sem aprovação editorial.

## Recuperação da direção de arte das páginas-piloto — 16/11/2026

**Referência vinculante:** screenshot fornecido pela editora da comparação “Quem entrou? / Método / Reportagens”. A formalização visual completa, a diferença entre as três soluções e as decisões para as páginas de dados estão em [`docs/design/ANCORA-EDITORIAL-PILOTOS-16NOV2026.md`](design/ANCORA-EDITORIAL-PILOTOS-16NOV2026.md). Atualizado também no arquivo editável de continuidade, seção **14.19**.

**Diagnóstico:** as páginas Partidos, Histórico, Monitor e Funil haviam ganho clareza e consulta de dados, mas o corpo inteiro perdeu a alternância de planos cromáticos, intensidade de títulos/números, registro visual de documentos e ritmo jornalístico presente nas páginas-piloto. A correção adota a **direção de arte já aprovada como âncora**, sem transformar os pilotos em templates.

**PR #17 (prévia):**
- **Partidos:** capa coral profunda com texto claro; painel roxo/tinta com universo e fonte; eleitas sobre tinta com gráfico em papel; pausa violeta distinguindo quatro bases; FEFC documental em dourado; votação em tinta. Preservadas as ressalvas legais, as contas e as categorias raciais.
- **Histórico:** abertura roxa com cronologia, interlúdio coral de 2014/2026 com denominador declarado, quatro bases TSE em caderno de tinta/dourado; cor/raça no roxo. Não usar fotografia anacrônica.
- **Monitor:** capa roxa, resultados de eleição em coral profundo, fotografia do plenário datada e creditada, consulta em creme e tinta e pré-registro de 2027 dourado. Sem transformar registros em mérito parlamentar.
- **Funil:** início roxo preservado; explicação coral “três universos, não três degraus”, dados em tinta com painel claro; documentos TSE e filtros mantidos, regras eleitorais em tinta; nunca sugerir coorte longitudinal.

**Acessibilidade:** texto claro (branco ou creme) sobre coral profundo. **Nunca preto sobre coral.** Contraste mínimo AA verificado por QA; não mudar as cores semânticas das visualizações. Escolhas cromáticas autorais não se confundem com codificações de dados.

**Restrições:** PR rascunho baseado no PR #16 e dependente da cadeia #12→#16; sem mudança de homepage, marca, arquivos de dados, fotografias, scripts ou CSS global; sem publicação na HostGator. Avaliar **página integral** em desktop e celular, incluindo consulta e rodapés. Sucesso técnico **não é aprovação estética**.

**QA final confirmado:** [GitHub Actions #43806308738](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43806308738), concluído com sucesso após o ajuste de contraste e o novo capítulo escuro de Histórico. Compilação/tipos, proteção de arquivos, dez renderizações (cinco rotas × 1440/390 px), ausência de erros JS e overflow, contraste AA ≥ 4,5:1 para texto claro sobre coral medido por cores convertidas do navegador em sRGB. Capturas completas em `qse-ancora-pilotos-quatro-paginas`. Ressalva: Histórico ainda alcança 20.520 px de altura no celular, e Funil 12.486 px, nas capturas com consultas longas recolhidas. O registro é aprovação técnica, **não aceite visual**.

**Ajuste cromático pós-inspeção:** o coral `bg-coral-ink` aparecia vermelho demais nas capturas. Para recuperar o matiz mais quente da página-piloto e conservar contraste AA com branco, a prévia adotou `PILOT_CORAL = color-mix(in srgb, var(--art-coral) 78%, var(--art-ink) 22%)`, definido uma vez em `src/lib/editorial-pilot-colors.ts` e aplicado **somente** nas quatro páginas revisadas. `src/styles.css` continua intocado. Registrar a mudança também na seção 14.19 do manual editável. A versão final de QA precisa ser revalidada após esse ajuste.

**QA após ajuste cromático, versão vigente:** [GitHub Actions #43806697217](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43806697217), **sucesso** para a última revisão de código, commit `9a1327ef25497085ca8720120be19cc3a7f0fe66`. TypeScript e build, proteção de dados/home/logo/fotos/CSS, 10 renderizações (cinco rotas × dois dispositivos), texto claro sobre o novo coral com contraste AA ≥ 4,5:1, ausência de transbordamento e erros JS. Fotografias e tabelas conferidas nas capturas completas. **Ainda não há aprovação visual, merge ou deploy.**

## Histórico — leitura móvel das seis séries (16/11/2026)

**Motivo:** na prévia de referência do PR #17, Histórico tinha 20.520 px de altura em 390 px de largura, com dois universos repetidos em coluna e barras de quatro anos estreitas. O problema era de legibilidade, ritmo e navegação **no corpo inteiro**, além da abertura.

**Intervenção do [PR #18](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/pull/18), em rascunho, derivado do #17:**
- Somente na rota Histórico, as seis visualizações `SeriesChart` recebem `mobileSelectable`; celulares mostram **Proporcional / Majoritária**, um universo por vez, com botões acessíveis e estado `aria-pressed`. O outro universo está sempre a um toque, sem exclusão nem filtragem dos dados.
- Os pontos de 2014, 2018, 2022 e 2026 são apresentados em **linhas por ano no celular**, com percentual, numerador/denominador, barra horizontal na escala original de 0 a 100% e indicação de ausência quando aplicável. Séries de cor/raça preservam **preta e parda separadas**, com identificação explícita de cada componente.
- O desktop continua exibindo os universos **lado a lado**, com o mesmo gráfico anterior; nenhuma cor, cálculo, fonte, categoria, data ou regra metodológica foi alterada.
- A apresentação mantém capa roxa, contraste coral com letras brancas, capítulos de tinta e arquivo documental TSE recuperados das três páginas-piloto. Não aplicar o seletor a outras rotas automaticamente.
- A ficha do gráfico e as fontes continuam acessíveis no rodapé de cada visualização; as 27 UFs e os quatro arquivos TSE permanecem disponíveis.

**Escopo protegido:** `main`, homepage, logo, `src/data`, arquivos oficiais, acervo de fotos, `src/styles.css` e páginas-piloto. Acesso por teclado, altura da página, presença de metadados e valores de ambas as séries devem integrar o QA. **Sem merge/deploy antes do aceite editorial.** A versão editável de continuidade incorpora este registro na seção **14.20**.

**QA final desta prévia:** [GitHub Actions #43808776621](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43808776621), concluído com sucesso. TypeScript, build HostGator, homepage e dados protegidos, séries de 2014–2026 preservadas, acesso Proporcional/Majoritária, quatro linhas anuais, pretas/pardas separadas, quatro bases TSE, seleção de 27 UFs, ausência de overflow horizontal e de erros JavaScript em 1440/390 px. **Altura padrão de Histórico no celular:** 20.520 px na prévia de referência do PR #17 → **19.159 px na prévia do PR #18**, redução de 1.361 px (6,6%), mantendo os dados e as fichas consultáveis. A melhoria principal é a legibilidade dos gráficos, não uma promessa de página curta. Artefato: `qse-historico-compactacao-movel`. **Sem aprovação estética nem merge/deploy.**

## Dinheiro — correção factual do FEFC e composição integral (16/11/2026)

**Estado:** [PR #19](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/pull/19) em rascunho, dependente dos PRs #18 e #17 e de suas bases anteriores, ainda sem publicação. **Âncora visual:** Quem entrou?, Método e Reportagens, conforme screenshot aprovado pela editora e `docs/design/ANCORA-EDITORIAL-PILOTOS-16NOV2026.md`.

**Verificação em fonte primária:** [TSE — critérios formais do FEFC 2026](https://www.tse.jus.br/eleicoes/eleicoes-2026-content/prestacao-de-contas/fundo-especial-de-financiamento-de-campanha-fefc) lista os processos PJe dos partidos e documentos quando disponibilizados; [TSE — cota de FEFC por sigla](https://www.tse.jus.br/eleicoes/eleicoes-2026-content/prestacao-de-contas/distribuicao-dos-recursos-do-fundo-especial-de-financiamento-de-campanha-fefc-eleicoes-2026) apresenta a distribuição pública entre agremiações. A afirmação editorial anterior, em `src/data/temas.ts`, de que os critérios “não são públicos” estava incorreta e foi corrigida. **Questão de apuração remanescente:** como regras formais se traduzem em decisões de repasse concretas e quais justificativas documentais existem para diferenças entre candidaturas. As contas não demonstram intenções por si.

**FEFC e cotas:** em `src/components/editorial/FefcPartidos.tsx`, retirada a marcação que sugeria infração a partir de percentuais inferiores a 30% num recorte que exclui candidaturas majoritárias. O quadro permanece **descritivo**, com contagens, grupos raciais separados e agregado preta+parda explicitamente identificado; nenhum valor recalculado. **Infringência legal exige análise do universo pertinente, lançamentos, legislação e situação processual.**

**Nota de leitura numérica:** a manchete de Dinheiro tem denominador monetário restrito ao FEFC recebido por candidaturas de mulheres, enquanto os achados de receita total consideram outras fontes. O novo aviso editorial no corpo evita a aparência de divergência entre percentuais que medem objetos diferentes. Nenhum indicador foi recalculado.

**Design de página completa:** abertura existente preservada; cargo em capítulo roxo com gráficos legíveis, cor/raça em creme, **caderno documental dourado no corpo da página** com links TSE, FEFC em fundo tinta com tabela integral acessível em papel, regra eleitoral em roxo e consulta territorial em creme. Fotografia só quando documentalmente pertinente; nenhum fac-símile simulado ou imagem artificial. Evitar excesso de painéis brancos/lilases e repetição mecânica.

**Escopo protegido:** arquivos numéricos e scripts de `src/data`, fotos, homepage, logo, CSS global e HostGator. A única alteração em `src/data` foi o texto editorial de `temas.ts`. Verificação por QA específico em desktop/celular, com a rota temática e a rota de dados; resultado ainda exige aprovação editorial.

**QA final de Dinheiro:** [GitHub Actions #43809995591](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43809995591), concluído com sucesso após os ajustes de texto e critérios. Builds/tipos, homepage e bases protegidas, rotas `/dinheiro` e `/temas/dinheiro` em desktop 1440 px/celular 390 px, acesso a critérios e cotas TSE, mensagem corrigida na editoria, tabela integral expansível, sem erros JS nem overflow. Capturas completas: `qse-dinheiro-pagina-integral`. Altura padrão no celular: 10.195 px na prévia, não tomada como indicador isolado de qualidade visual. **QA técnico sem aceite editorial, merge ou deploy.**


## Comparar — composição editorial de página inteira (16/11/2026)

**Situação:** [PR #20](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/pull/20), rascunho derivado do PR #19. Nenhum merge ou publicação. [GitHub Actions #43811771014](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43811771014) — sucesso técnico, com capturas integrais em computador e celular; aprovação estética pendente.

**Diagnóstico:** a informação estava concentrada em tabela extensa, sem capítulo de leitura e sem documento primário em destaque. A linha “Pretas e pardas somadas (régua da lei)” podia sugerir que o subconjunto de candidaturas a deputado verificasse a cota legal do FEFC.

**Intervenção:** abertura de tinta; índice; capítulo roxo de proporções de eleitas por total de pessoas eleitas em cada recorte, sempre com numerador, denominador e escala de 0–100%; faixa coral profundo com texto claro sobre o limite jurídico do FEFC; tabela integral acessível em papel; caderno documental dourado com links do TSE. Seleções duplicadas evitadas. Pretas e pardas continuam separadas nas linhas de origem. Sem alteração em bases, fotografia, homepage, marca ou CSS global.

## Relatório 2026 — cinco capítulos distintos (16/11/2026)

**Situação:** [PR #21](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/pull/21), rascunho derivado de #20. [GitHub Actions #43811953250](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43811953250) — sucesso técnico, não aceite visual.

**Diagnóstico:** cinco capítulos repetiam número, título e lista, sem progressão visual por natureza de evidência. **Intervenção:** capa roxa datada da edição preliminar de 04/11; navegação; resultados em tinta, cor/raça em papel, financiamento em dourado, mandato em roxo e violência em coral profundo, sempre com texto claro nos fundos escuros. Todas as manchetes, fontes, links e limites preservados. Registro explícito de que atuações das deputadas em exercício em 2026 não equivalem às ações das recém-eleitas. Encerramento com lacunas, agenda conforme corte de 04/11 e método. As afirmações sobre datas de julgamento e diplomação preservadas em `AINDA_NAO` precisam de verificação documental na atualização editorial. Sem mudança nos dados, foto, logo, homepage ou CSS global.

## Dados — seis editorias, índice completo (16/11/2026)

**Situação:** [PR #22](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/pull/22), rascunho derivado de #21. [GitHub Actions #43812144098](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43812144098) — sucesso técnico, aceite visual pendente.

**Diagnóstico:** o código herdado do PR #19 era uma grade de diretórios sem ritmo editorial. O PR #9, independente e ainda pendente, já continha a abertura dourada e os capítulos de tinta e roxo; suas decisões foram reaproveitadas e refinadas, **sem integração do PR #9**. **Intervenção:** abertura dourada, rotas claras entre leitura, comparação e verificação; índice temático; seis capítulos com variações de escala, ordem de colunas e superfície em tinta, roxo e coral profundo (para violência, com letra clara); caderno documental dourado com referência TSE, base pública e método; ferramentas gerais em roxo. Todos os links e temas mantidos; nenhum número novo, foto decorativa ou documento simulado. Bases, logo, homepage e CSS global preservados.

**Governança transversal:** PRs #20, #21 e #22 são prévias encadeadas após o PR #19; o resultado do GitHub Actions indica funcionamento técnico e capturas produzidas, não inspeção estética nem aprovação editorial. A direção de arte continua ancorada nos pilotos do PR #8 e em `docs/design/ANCORA-EDITORIAL-PILOTOS-16NOV2026.md`. A cópia editável do manual de continuidade localizada na Biblioteca alcança 14.12; os registros equivalentes a 14.13–14.21 estão neste arquivo GitHub. A reconstrução do manual sob o nome original deve distinguir transcrição recuperada e cópia anterior não localizada.


## Conferência visual de páginas completas e publicação (16/11/2026)

**Evidência:** artefato do GitHub Actions `qse-comparar-relatorio-dados-integrais`, execução [#43812144098](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43812144098). Capturas de abertura e **páginas completas** inspecionadas em desktop de 1440 × 900 e celular de 390 × 844, incluindo trechos abaixo da primeira dobra. Tamanhos reais das páginas na prévia: Comparar 4.288 px (desktop), 5.905 px (celular); Relatório 6.912/9.470 px; Dados 5.028/8.257 px. Todas as oito renderizações (incluindo a homepage de controle) reportaram largura de documento igual ao viewport e zero erros de JavaScript. Os gráficos do Comparador ficam acima da tabela íntegra, preservada com rolagem horizontal na sua região específica no celular.

**Leitura da direção de arte:** conferidas as alternâncias de tinta, roxo, papel, dourado e coral em todas as três páginas. O Relatório distingue os cinco capítulos e o índice Dados utiliza hierarquia temática própria; Comparar mantém o foco na tabela, com interpretação anterior e documentação posterior. As composições não são templates idênticos e não mostram imagens artificiais. A inspeção é preliminar, em capturas reduzidas/integrais; não substitui avaliação editorial da editora nem uma auditoria WCAG automatizada completa. O workflow atual verifica principalmente montagem, estado interativo básico, largura, erros e capturas; análise de contraste e acesso por teclado em todos os controles continua pendente.

**Publicação:** as páginas efetivamente acessíveis em `https://quemsaoelas.com.br/comparar/` e `https://quemsaoelas.com.br/dados/` ainda apresentam os arranjos anteriores ao PR #20 e PR #22, respectivamente, conforme consulta pública feita em 16/11/2026. Na página publicada de Comparar permanece a expressão antiga “Pretas e pardas somadas (régua da lei)”. Portanto, **não há evidência de publicação das novas prévias**. Não se obteve nesta inspeção uma resposta confiável da rota pública de Relatório 2026. Nenhum PR foi integrado à `main` nem houve procedimento de deploy à HostGator nesta sessão.

**Documentação pendente:** o arquivo editável original `Quem_sao_elas_Manual_Identidade_Editorial_Continuidade_2026-11-15.md` não foi encontrado no repositório na branch de referência; a cópia localizada na Biblioteca alcançava 14.12, enquanto este manual normativo tinha os registros posteriores. O pacote ZIP de continuidade não pôde ser recuperado. A tentativa de materializar a cópia da Biblioteca falhou, de modo que **não foi possível atualizar o arquivo original preservando seu conteúdo completo**. Para não fabricar histórico nem criar manual concorrente, as decisões e resultados desta etapa foram registrados **neste documento normativo já existente**; a sincronização do editável original permanece pendente de acesso à cópia-fonte integral.
