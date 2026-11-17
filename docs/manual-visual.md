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

**Leitura da direção de arte:** conferidas as alternâncias de tinta, roxo, papel, dourado e coral em todas as três páginas. O Relatório distingue os cinco capítulos e o índice Dados utiliza hierarquia temática própria; Comparar mantém o foco na tabela, com interpretação anterior e documentação posterior. As composições não são templates idênticos e não mostram imagens artificiais. A inspeção é preliminar, em capturas reduzidas/integrais; não substitui avaliação editorial da editora nem uma auditoria WCAG automatizada completa. O workflow atual verifica principalmente montagem, estado interativo básico, largura, erros e capturas; a checagem de contraste AA (≥ 4,5:1) das superfícies coral nos três destinos passou na [execução complementar #43813282721](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43813282721), após corrigir o seletor do teste para abranger os capítulos internos de Dados. Uma auditoria WCAG integral e a navegação por teclado em todos os controles continuam pendentes.

**Publicação:** as páginas efetivamente acessíveis em `https://quemsaoelas.com.br/comparar/` e `https://quemsaoelas.com.br/dados/` ainda apresentam os arranjos anteriores ao PR #20 e PR #22, respectivamente, conforme consulta pública feita em 16/11/2026. Na página publicada de Comparar permanece a expressão antiga “Pretas e pardas somadas (régua da lei)”. Portanto, **não há evidência de publicação das novas prévias**. Não se obteve nesta inspeção uma resposta confiável da rota pública de Relatório 2026. Nenhum PR foi integrado à `main` nem houve procedimento de deploy à HostGator nesta sessão.

**Documentação pendente:** o arquivo editável original `Quem_sao_elas_Manual_Identidade_Editorial_Continuidade_2026-11-15.md` não foi encontrado no repositório na branch de referência; a cópia localizada na Biblioteca alcançava 14.12, enquanto este manual normativo tinha os registros posteriores. O pacote ZIP de continuidade não pôde ser recuperado. A tentativa de materializar a cópia da Biblioteca falhou, de modo que **não foi possível atualizar o arquivo original preservando seu conteúdo completo**. Para não fabricar histórico nem criar manual concorrente, as decisões e resultados desta etapa foram registrados **neste documento normativo já existente**; a sincronização do editável original permanece pendente de acesso à cópia-fonte integral.


## Consolidação das prévias e acervo — PR #23, 16/11/2026

**Branch:** revista-consolidacao-previews-acervo-16nov2026; base no PR #22. Permanecem protegidas a homepage, a marca, o CSS global, as bases de resultados e os dados financeiros. Não houve publicação.

**Escopo efetivamente recuperado:** 13 rotas dos PRs #8–#11, que estavam fora da sequência #12–#22. PR #8: Eleitas (Quem entrou), Método e Reportagens, com seus componentes editoriais; PR #9: Achados, Investigações e Temas, com a reedição de InvestigationIndex; PR #10: Direitos, Biblioteca/Downloads, Pioneiras e Sobre; PR #11: Barreiras, Na voz delas e Quem controla. Preservada a versão de Dados do PR #22, em vez de recuperar a mais antiga do PR #9. O total de 37 arquivos de rota compreende 21 modelos de conteúdo com revisão em prévia, 14 a revisar, homepage protegida e redirecionamento Condições.

**Imagem histórica real adicionada:** posse de Bertha Lutz em 28/07/1936, acervo do Arquivo Nacional, registro BR_RJANRIO_Q0_BLZ_DEU_CLE_FOT_0001, indicada como domínio público em Wikimedia Commons, atribuição “Domínio público / Acervo Arquivo Nacional”. Binário preservado sem alterações na pasta public/fotos, registrado em src/data/fotos.ts e exibido na composição de Pioneiras. A imagem de Pagu ainda está assinalada como verificacao-pendente; não afirmar direitos assegurados.

**Documento real recuperado:** captura de tela da página Candidatos 2026 do portal de Dados Abertos do TSE em public/documentos/tse-candidatos-2026-portal.png, com documentação de procedência em public/documentos/tse-candidatos-2026-portal-fonte.txt. A imagem é do **portal**, não do CSV. Sua presença visual na página Método não dispensa link ao conjunto original, legenda, data e cuidado com direitos da própria interface.

**Correção contrastiva:** o algarismo do quarto passo da infografia de Método usa branco em fundo coral; não retomar preto sobre coral. Mesma regra vale para banners, rótulos e textos menores.

**QA:** workflow qa-consolidacao-revista-16nov.yml verifica TypeScript/build e integridade do acervo; navega as 13 rotas mais homepage e cria capturas completas para desktop 1440 × 900 e celular 390 × 844. Os primeiros testes sinalizaram imagens com carregamento lazy pendente **antes de qualquer espera pela requisição**; o script foi ajustado para carregar/decodificar as imagens antes de declarar falha. A conclusão da última execução deve ser consultada no Actions; não tratar esse ajuste de teste como comprovação de imagem correta até o resultado positivo.

**Revisão visual factual:** as folhas de contato reais de Comparar, Relatório e Dados do PR #22 foram abertas e examinadas em desktop e celular. A alternância cromática e a hierarquia estão presentes; o repertório fotográfico-documental dessas páginas é insuficiente. As capturas produzidas para a consolidação PR #23 ainda exigem inspeção direta antes da aprovação editorial. Uma auditoria WCAG integral e verificação de todos os links/documentos também estão pendentes.

**Cópia editável original:** recuperado integralmente o conteúdo de 609 linhas do arquivo Quem_sao_elas_Manual_Identidade_Editorial_Continuidade_2026-11-15.md na Biblioteca, e criado um Markdown **com o mesmo nome** na branch PR #23, acrescido do capítulo 15. Não se conseguiu alterar o próprio arquivo da Biblioteca, pois a materialização dos bytes originais foi negada. Este manual normativo e o original agora acessível na branch #23 devem ser mantidos coerentes; nenhum terceiro manual foi criado.

**Próximo trabalho:** após QA e conferência de capturas, revisar as 14 rotas restantes e reabrir a questão das evidências visuais nas páginas Inteiras de Dinheiro, Relatório, Histórico, Funil, Comparar e Dados. Documentos verdadeiros e fotografias pertinentes com procedência e licença devem ganhar presença visual. Não gerar imagens por IA ou simular fontes primárias.

---

## PR #24 — 14 rotas integrais, documentos e contrastes (16/11/2026)

**Escopo:** branch revista-14-rotas-integral-16nov2026, base PR #23, em rascunho, sem publicação. Revisa os 14 modelos de conteúdo antes não trabalhados: Achado individual, Busca, Calendário, Coautoria, Coleção antigênero, Como votaram, Ficha individual de eleita, Em disputa, Lélia Gonzalez, Pagu, Quem chega, Consultar candidatas, Tema individual (seis temas) e Votos. A homepage, logo, CSS global, dados, fotografias e materiais documentais existentes foram preservados.

**Linguagem:** páginas inteiras com alternância de tinta, roxo, papel, creme, coral de letra clara e dourado, conforme função informativa; não são apenas aberturas. A pesquisa de mídia continua restrita a documentos/fotos de fonte real com contexto, legenda e atribuição. O componente CadernoDocumentalRevista.tsx centraliza fotografias com licença cadastrada, a captura real do portal TSE e cadernos documentais de referência. Novos textos explicitam as distinções entre registro TSE, fotografia institucional, dado nominal, interpretação, limitação de fonte e situação posterior ao pleito.

**Fotografias:** arquivo institucional da Câmara 2026 em Coautoria e Quem chega, plenário histórico de 2023 em reportagens e Agenda, Bertha Lutz 1936 em Memória. Fotografias não provam por si autoria, voto ou participação individual; as legendas informam o papel contextual. **Pagu** tinha retrato local com direitos pendentes e passou a exibir somente ficha tipográfica até nova verificação, por alteração do filtro de licença em Pioneiras.tsx e ReportagemOpening.tsx. Nenhuma fotografia sintética.

**Recortes eleitorais:** na página Votos, candidatura, votação nominal válida e cadeiras são universos de contagem distintos; a tabela/fonte TSE mantém seus respectivos denominadores. Em Quem são elas e Temas, preta e parda permanecem categorias originais distintas, com agregações apenas quando declaradas. Dados numéricos não sofreram edição.

**QA:** .github/workflows/qa-14-rotas-revista-16nov.yml compila e fotografa as rotas completas nos dois viewports, incluindo as seis páginas temáticas; valida largura, carregamento das imagens, erros JS e presença do conteúdo. Em uma primeira execução, o teste especificou URL inexistente /achados/cor-raca (o identificador correto de um achado disponível é /achados/quanto-mais-alto-mais-brancas). A URL no roteiro foi corrigida; isso era falha do teste, não do aplicativo. A conclusão de execução deve ser verificada no Actions. Não equivale a aprovação estética ou auditoria WCAG completa.

**Próxima rodada:** conferir de fato as capturas e a consistência fotográfica/documental do conjunto de 35 modelos de conteúdo (37 rotas menos home e redirecionamento), reconciliar PRs e revisar pendências editoriais antes de publicar. O arquivo original Quem_sao_elas_Manual_Identidade_Editorial_Continuidade_2026-11-15.md, sob o mesmo nome, recebe capítulo 16 nesta branch, sem substituição automática da cópia de Biblioteca por limitação de permissão.


### Fechamento da QA das 14 rotas — 16/11/2026
**Resultado real:** execução GitHub Actions #43896345250 concluída com sucesso (commit 3ba5205af50fbebdae5f157341f201f3952f4f25). TypeScript, build HostGator, proteção de homepage, logo, fontes eleitorais e arquivos documentais aprovados. O script abriu 20 variações de URL, cobrindo 14 modelos de conteúdo, seis temas, perfil de eleita, busca e uma homepage de controle, em desktop 1440 × 900 e celular 390 × 844: **40 capturas completas, nenhuma falha registrada**. O teste conferiu respostas HTTP, título H1, largura, erros de execução e carregamento efetivo das imagens, inclusive as lazy. A imagem de Pagu com direitos pendentes não apareceu no DOM.

**Artefato de prova:** https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43896345250 (artefato qse-14-rotas-revista-integrais, ID 14239282143), incluindo capturas, relatório JSON e os dois manuais. Foram montadas e **visualmente examinadas folhas de contato** com o início, um ponto intermediário e o final das 20 páginas em cada viewport. Nesta leitura de conjunto, preservaram-se contrastes estruturais, bandas de revista e fontes destacadas; trata-se de uma inspeção de panorama, que não substitui revisão individual em escala real, de todas as imagens, links ou controles por teclado.

**Pendente antes de publicar:** revisão editorial final das 35 rotas de conteúdo no conjunto integrado, auditoria WCAG completa, direitos/licenças e verificação documental específica. Nenhum PR foi mesclado nem foi executado deploy.

---

## 17. Auditoria das evidências visuais — PR #25, 16 de novembro de 2026

**Branch e PR:** revista-evidencias-visuais-documentais-16nov2026, PR #25 rascunho com base no PR #24. Nenhum merge, deploy, exclusão de mídia ou alteração dos dados eleitorais. As 35 rotas de conteúdo foram avaliadas na matriz de auditoria em `docs/matriz-fotografias-documentos-graficos-16nov2026.md`, com decisões específicas sobre **fotografia**, **documento original** e **gráfico**. A homepage é protegida e `condicoes.tsx` é só redirecionamento.

### 17.1. Decisões de direção, com justificativa jornalística

- **Fotografia:** registrar o acontecimento e seu contexto, não preencher blocos vazios. Acervo da Câmara é CC BY, desde que constem fotógrafo, instituição e licença; fotografias de 2023 e junho de 2026 não retratam todos os votos analisados nem as eleitas de 2027. Atribuição e ressalva acompanhando cada uso. Retratos de Lélia Gonzalez e Pagu não foram publicados por falta de confirmação suficiente de direitos na realidade editorial brasileira. Para fontes Commons, indicação de domínio público na plataforma não dispensa conferência legal.
- **Documento:** o material documental só é reproduzido visualmente se houver origem verificável, data, identificação, natureza e direito de uso. A captura de 15/11/2026 mostra a página de disponibilização dos dados de Candidatos 2026, não o CSV, nem a Prestação de Contas; não estender automaticamente licença de dataset à interface. Enquanto um fac-símile verdadeiro não puder ser mostrado, usar uma cartela claramente rotulada como reconstrução/organização editorial, com link ao original. Diferenciar decisão judicial, lei, critério do partido e recebimento financeiro.
- **Gráfico:** privilegiar sempre que forem comparados universos, proporções e séries. Deixar numerador, denominador, período, base e exclusões visíveis. Manter PRETA e PARDA como categorias separadas. Não fazer barras percentuais para recortes de menos de 20 casos, quando a amostra torna comparações frágeis. O comparador indica pontos percentuais entre proporções, não a chance de uma mesma mulher chegar à cadeira.

### 17.2. Intervenções realizadas

1. **Relatório 2026:** dentro dos capítulos, gráfico da participação de mulheres entre todos os deputados eleitos (federal/estadual/distrital), com numerador e denominador da base de 2026; fotografia documental de 30/06/2026 (Thiago Cristino/Câmara, CC BY), acompanhada de ressalva temporal; caderno de fontes oficiais TSE e Câmara. A edição preliminar mantém sua data de corte editorial de 04/11.
2. **Comparar:** novo bloco gráfico interativo de duas etapas, que reage aos filtros de partido e estado. Candidaturas e cadeiras são medidas diferentes, representadas em barras que mostram a participação feminina dentro de cada universo; diferença em pontos percentuais. Recortes pequenos, apenas contagem.
3. **Dados:** captura real local do portal TSE no capítulo de origem, com fonte, imagem, data e link. Índice de consulta permanece índice, sem criar um número novo.
4. **Dinheiro:** ficha gráfica de metadados derivados do código de recontagem e dos dados existentes (data da extração, linhas de receita processadas, duplicatas removidas), explicitamente identificada como produto editorial, não como fac-símile de extrato ou recibo. Links reais de critérios do FEFC, cotas e contas declaradas preservados.
5. **Reportagens:** fotografia institucional de maio/2023 (Bruno Spada/Câmara, CC BY) na página de índice, legendada como contexto de tramitação da igualdade salarial, sem atribuir os votos analisados às pessoas da fotografia.
6. **Componente:** `src/components/editorial/EvidenciasGrafadas2026.tsx`. Não houve geração de imagens por IA, imagens fictícias ou edição de bases.

### 17.3. O que permanece deliberadamente sem fotografia

**Funil** (universos e diagramas) e **Histórico** (séries 2014–2026) já possuem visuais adequados e fontes documentais; fotografia de 1927/1936, se incluída sem novo capítulo, deslocaria o recorte histórico. **Barreiras** não receberá foto genérica de vítima nem imagem de violência como decoração. **Comparar** e **Dinheiro** priorizam dado e documento antes de fotografia. **Perfis de Lélia e Pagu** mantêm fichas documentais por direitos pendentes.

### 17.4. Pendências explícitas e validação

Os próximos pontos de pesquisa são: reprodução de documentos originais específicos do FEFC e PJe em Partidos/Quem controla, documentos legislativos e gravações de falas em Como votaram/Na voz delas, arquivo legal pertinente em Direitos/Em disputa/Barreiras, retratos individuais autorizados e eventual nova fotografia de reportagem com legenda situacional. Nenhum documento original será recriado como imagem sintética. A matriz de 35 páginas indica prioridade de cada um.

O workflow `qa-evidencias-visuais-revista-16nov.yml` prevê TypeScript, build HostGator, integridade dos arquivos originais e capturas de 41 URLs em desktop/celular (82 renderizações), abrangendo os modelos das 35 páginas, seis temas e homepage. A conclusão precisa ser conferida no GitHub Actions; testes automatizados **não validam, por si, acessibilidade integral, direitos, precisão de números ou aprovação da editora**. A leitura das capturas completas em tamanho real é uma etapa distinta.

**Referências documentais públicas:**
- Acervo fotográfico da Câmara e licença: https://www2.camara.leg.br/a-camara/documentos-e-pesquisa/arquivo/acervo-por-tipo/fotos
- Prestação de Contas 2026 no portal do TSE: https://dadosabertos.tse.jus.br/pt_BR/dataset/prestacao-de-contas-eleitorais-2026
- Candidatos 2026: https://dadosabertos.tse.jus.br/dataset/candidatos-2026
- Resultados 2026: https://dadosabertos.tse.jus.br/dataset/resultados-2026

**Continuidade:** preservar integralmente as decisões anteriores. A versão original do manual sob o mesmo nome permanece neste PR como arquivo editável; sua versão na Biblioteca não pode ser sobrescrita automaticamente pelas permissões do Projeto.

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

---

## 19. Documentos originais à vista — PR #27, 16/11/2026

**Branch:** `revista-facsimiles-verificados-16nov2026`, baseada no PR #26. Intervenção em prévia, sem merge/deploy. Os três PDFs do TSE foram baixados de links públicos literais, conferidos por SHA-256 e examinados em páginas selecionadas. O acervo original contém anexos com CPF, endereços pessoais e informações bancárias; **apenas três páginas sem esses dados foram incorporadas como PNG**, nunca o PDF inteiro. Registro completo de origem, SHA, páginas e limites de cada imagem em `docs/acervo-facsimiles-tse-camara-16nov2026.md`.

**Páginas de revista que ganharam prova visual autêntica:**

- **Partidos:** reprodução da Resolução CEN 043, de 01/07/2026, do União Brasil, **página 24 de 33** do PDF do PJe `0601251-87.2026.6.00.0000`. Nela, a Executiva declara 20% do FEFC às disputas majoritárias e 80% às proporcionais, com previsão de ajustes, além de piso para mulheres; **não demonstra a execução dos repasses**. Ao lado, reprodução da Resolução nº 14/2026 da **Federação Brasil da Esperança**, anexa ao processo do PT `0601252-72.2026.6.00.0000`, **página 10 de 64**; indica autonomia dos partidos integrantes e observância de pisos legais. Não chamar essa resolução de critério exclusivo do PT. As imagens originais ficam clicáveis, com legendas, páginas, data, fonte, crédito e links aos PDFs completos.
- **Quem controla:** reprodução da **capa**, página 1 de 34, do processo FEFC do PL `0600974-71.2026.6.00.0000`, gerada em 22/08/2026. A capa identifica processo, objeto e anexos, **não** prova aprovação de mérito ou valores transferidos às candidaturas. Fundo coral profundo com **toda a letra clara**, conforme decisão vinculante.
- **Na voz delas:** recorte fiel de **uma linha do catálogo de Discursos e Notas Taquigráficas da Câmara**, com Julia Zanatta, discurso de 10/03/2026 às 19h20, edição do Diário de 11/03/2026, p. 163. É imagem do **índice de busca**, não da página 163 do Diário, nem verificação autossuficiente da transcrição. O domínio de PDFs da Câmara respondeu HTTP 403 ao acesso automatizado; os links da fonte original permanecem à disposição. A oitava fala, não verificada, continua excluída.

**Interpretação:** documentos apresentados ao TSE e publicação dos critérios não equivalem a julgamento de mérito ou cumprimento de cotas. Manter distinção entre regras planejadas e contas executadas, registro e ocupação efetiva, documento autêntico e ficha editorial. Não criar documentos sintéticos. A reprodução de páginas públicas para finalidade de informação jornalística ainda deve passar por análise de direitos de uso e privacidade antes de publicação na main.

**Arquivos e componentes:** `src/components/editorial/FacsimilesFEFC2026.tsx` e atualização de `IndicesDocumentaisCamara.tsx`; imagens em `public/documentos/tse-uniao-brasil-resolucao-cen043-2026.png`, `tse-fe-brasil-resolucao-14-2026.png`, `tse-pl-processo-fefc-capa-2026.png` e `camara-sitaq-julia-zanatta-2026-03-10-p163.png`. Fotos históricas de Lélia e Pagu não foram alteradas, pois continuam com direitos pendentes.

**QA:** `.github/workflows/qa-facsimiles-originais-16nov.yml` testa TypeScript, build, identidade, integridade das 4 imagens e capturas de página inteira em desktop 1440 e celular 390 px, com checagem de imagens, largura, carga de documentos e texto claro no coral. Registrar resultado final real e revisar capturas antes de anunciar aprovação. A auditoria WCAG integral e o contraditório de eventuais imputações individuais continuam etapas distintas.

**Investigação técnica:** workflows de download e seleção de páginas convertidos em acionamento manual para evitar repetição automática de PDFs com dados pessoais e custos de CI. A captura de um documento com CPF em outro anexo **não autoriza sua reprodução**.

**Fontes originais:** https://www.tse.jus.br/eleicoes/eleicoes-2026-content/prestacao-de-contas/fundo-especial-de-financiamento-de-campanha-fefc e https://www.camara.leg.br/internet/SitaqWeb/ResultadoPesquisaDiscursos.asp?BasePesq=plenario&CampoOrdenacao=dtSessao&PageSize=50&TipoOrdenacao=DESC&btnPesqAvan=Pesquisar&dtFim=31%2F12%2F2026&dtInicio=01%2F01%2F2026&txOrador=Julia+Zanatta .

---

## 20. Acessibilidade, controle de publicação de documentos e limites do PR #28 — 16/11/2026

**Branch:** `revista-acessibilidade-e-licencas-16nov2026`, construída sobre PR #27; sem integração à main e sem deploy. Nenhuma mudança de fotografia, arquivo documental, base de dados, homepage, marca ou CSS global. A decisão visual aprovada permanece: página de revista com roxo estrutural, tinta, creme/papel, dourado e coral profundo. Letras e metadados sobre coral devem ser suficientemente claros e legíveis; branco com 85–90% de opacidade sobre o coral da revista **não** atende à razão mínima de 4,5:1 para textos comuns.

### 20.1. Auditoria automática e correções efetivas

Rodado axe-core 4.10.3 com marcadores WCAG 2 A/AA, 2.1 AA e 2.2 AA nas páginas **Homepage (controle), Partidos, Quem controla, Na voz delas, Como votaram, Reportagens e Dados**, em 1440 × 900, 390 × 844 e 320 × 720 px CSS. O diagnóstico inicial em dois viewports mostrou **18 ocorrências de contraste**, **duas ocorrências de estrutura de lista de definição** e **uma de item fora de lista** (somadas as duplicações por viewport).

Corrigido no código: (a) textos de abertura em Partidos sobre coral de `text-white/90` para `text-white`; (b) texto sobre violeta e algarismo decorativo 04 de dourado insuficientemente contrastado para branco; (c) no capítulo coral de Dados e na reprodução de capa PJe em Quem controla, texto agora em papel opaco, sem alterar a cor do fundo; (d) em Partidos, `<dl>` possui termo e definição sem `role=img` no `<dd>`, porcentagens legíveis como texto e barra decorativa `aria-hidden`; (e) ficha selecionada mobile passou a `<li>` dentro de `<ul>`, não mais item solto.

**Resultado posterior:** execução https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43925782716, **21 verificações e zero violações automáticas das regras selecionadas, sem erros JS ou transbordamento horizontal**, em desktop, 390 px e 320 px. A rotina `.github/workflows/qa-acessibilidade-documentos-16nov.yml` agora falha se detectar nova violação ou erro estrutural. O documento `docs/qa-acessibilidade-e-liberacao-documental-16nov2026.md` guarda relatório detalhado, limitações, metodologia e links.

A evidência de uma execução de axe **não é** certificação WCAG 2.2 AA. Ainda faltam leitor de telas, teste de ampliação real em 200%, foco profundo, rótulos de todos os filtros e controles, conteúdo alternativo de figuras complexas, revisão de todas as páginas restantes e avaliação com pessoas usuárias.

### 20.2. Ressalva editorial de publicação — GitHub é público

**Fato técnico verificado em 16/11/2026:** `natalyxxnunes-stack/elas-no-poder-observatory` possui `visibility: public`. Abrir PR como *draft* bloqueia merge automático, mas não oculta arquivos, imagens e commits da branch; **essas prévias são acessíveis no GitHub**, embora não estejam publicadas no site. Não afirmar que o material permanece privado ou inacessível. Não alterar a visibilidade do repositório sem aprovação da responsável editorial. O estado público agrava a urgência de avaliar reprodução de imagens e a triagem de dados pessoais antes de novas incorporações.

Os quatro recortes de documentos incluídos no PR #27 seguem **com pendência editorial/jurídica para a publicação no site**, apesar de sua procedência e ausência de CPFs/contas nas páginas selecionadas terem sido verificadas. A Lei nº 9.610/1998, art. 8º, IV, trata dos textos de atos oficiais; não concluir automaticamente que resoluções partidárias anexadas a processo público ou capturas de tela de sistemas sejam livres de proteção autoral. A LGPD, art. 4º, II, a, prevê tratamento jornalístico, mas a avaliação concreta continua necessária, especialmente sobre proporcionalidade e interesse público dos dados divulgados.

**Controle de liberação:** `docs/qa-acessibilidade-e-liberacao-documental-16nov2026.md` distingue situação das quatro imagens, fontes, eventuais dados pessoais, verificação factual, direitos de reprodução, aprovação editorial e bloqueios de deploy. Não executar merge dos PRs de acervo nem fazer deploy antes da decisão.

### 20.3. Precisão editorial em Na voz delas

A frase “declarações já autorizadas à publicação editorial” foi corrigida para “declarações selecionadas para publicação editorial”. A flag interna `publicar: true` não é sinônimo de autorização concedida pelas parlamentares. A oitava fala pendente continua fora do material publicado na prévia.

**Diretriz para continuidade:** preservar design, marca, fotografias e documentos já auditados; corrigir violações demonstradas, sem retomar o visual branco/lilás genérico. Continuar a auditoria de acessibilidade na revista inteira, com contrastes calculados e estrutura HTML semântica, e manter revisão de direitos separada da verificação técnica.


## 21. Auditoria de acessibilidade do primeiro lote restante — PR #29, 16/11/2026

O PR #29 continua a partir do **head efetivo do PR #28**, sem mesclar ou publicar. A rotina `.github/workflows/qa-acessibilidade-lote1-16nov.yml` acrescenta sete modelos de conteúdo (Método, Quem entrou?, Funil, Histórico, Dinheiro, Monitor, Temas) e duas variações dinâmicas (ficha de eleita e tema Dinheiro) em **1440, 390 e 320 px**, com **27 verificações** e 18 capturas integrais desktop/celular.

**Antes:** a execução [#43930579720](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43930579720) detectou contraste insuficiente em Funil, Histórico, Monitor, Temas e Tema Dinheiro, e uma lista de definições inválida em Monitor; foram 18 grupos de violações nos três viewports (repetições dos mesmos elementos, não 18 falhas independentes). O primeiro ensaio #43930178877 teve falha de gravação do relatório, corrigida e não computada como auditoria do site.

**Correções mínimas:** branco opaco sobre o coral profundo em Funil, Histórico e Monitor; papel opaco no capítulo Memória de Temas e nas lacunas de Tema Dinheiro; rótulos do componente `Secao` com opacidade adequada sobre fundos escuros/dourados; nota quantitativa de Monitor deslocada de `p` indevido como filho de `dl` para dentro do seu `dd`. O fundo coral, o roxo estrutural, o dourado, as fotografias, documentos, gráficos, números e estrutura de revista não foram substituídos.

**Depois:** execução [#43931907301](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43931907301) aprovada: **27 verificações, zero violações axe-core 4.10.3 nas regras selecionadas, zero erros JS/estruturais/transbordamentos**. Nove URLs com HTTP 200, `main` e `h1`. A comparação das capturas de páginas inteiras não mostrou alterações nas dimensões; as mudanças visuais são localizadas.

**Imagens:** a captura original do portal TSE e a foto da bancada em Método, a foto contextual do plenário em Monitor e a fotografia histórica de Bertha Lutz em Temas permanecem carregadas e legendadas. Não se acrescentaram documentos nem fotos decorativas; a matriz de evidências continua vigente. Direitos/privacidade e aprovação de fac-símiles do PR #27 seguem como pendência independente.

**Limites:** não se realizou teste efetivo de NVDA/VoiceOver, zoom real 200%, espaçamento de texto, operação exaustiva de filtros/teclado ou avaliação com pessoas usuárias. Uma ficha de eleita e um tema são amostras, não validação de todas as rotas dinâmicas. **Nenhuma certificação global de WCAG**. Relatório, metodologia, lista de arquivos, capturas e pendências em `docs/qa-acessibilidade-lote1-16nov2026.md`. Manter PR #29 como rascunho e não fazer merge nem deploy.


## 22. Acessibilidade da investigação, consulta e acervo — PR #30, 16/11/2026

**Continuidade:** branch `revista-acessibilidade-lote2-16nov2026`, criada a partir do head de PR #29. Foram analisados **sete novos modelos**: índice e página individual de Achados, Busca, Calendário, Coleção Antigênero no Poder, Investigações e Barreiras, com um segundo achado e uma busca preenchida. **Nove URLs em 1440, 390 e 320 CSS px: 27 verificações**, mais **18 capturas integrais** desktop/celular.

**Antes, [GitHub Actions #43936946379](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43936946379):** 11 grupos de violações (9 de contraste repetido por largura; 2 de alvo de toque em achado individual), sem JS/overflow. Busca: texto 15 px sobre coral com contraste 4,32:1; Investigações: contador 13 px sobre coral 4,02:1; Achado: link de método 22,5 px de altura no celular.

**Intervenções mínimas:** `text-paper` opaco no capítulo coral da Busca; remoção de `opacity-85` no contador do índice de Investigação; link do Método na página de Achado com `block min-h-11 py-2`, sem dispor os links lado a lado. Não se alteraram dados, conteúdo jornalístico, esquema de cores, fotografias, documentos, gráficos, CSS global, homepage ou logo.

**Depois, [#43937543405](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43937543405):** 27 verificações, nenhuma violação automática das regras WCAG 2 A/AA, 2.1 AA, 2.2 AA selecionadas pelo axe-core 4.10.3, nenhum erro de execução. **Teste complementar [#43938114266](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43938114266):** mesmo resultado e seis interações verificadas em dois tamanhos: busca com termo, teclado Enter para abrir/fechar `details`, âncoras de Achados.

**Fotografias e documentos:** nenhum `img` novo; a Coleção exibe distribuição por figura com descrição textual; Barreiras conserva os links distintos para lei, painel e representações, sem fac-símile inventado. Não se devem adicionar fotos genéricas para substituir prova documental. Revisão da matriz editorial mantida, sem mudança de decisão sobre licenças. A comparação de capturas de páginas inteiras confirma alterações localizadas (na ficha de Achado, 21 px a mais de altura no celular por causa do link).

**Limites e continuidade:** ausência de falhas automáticas não demonstra conformidade WCAG integral. NVDA/VoiceOver, zoom real 200%, espaçamento personalizado e operação completa por teclado permanecem pendentes. Restam **15 modelos de conteúdo** a auditar especificamente dos 35, além de ampliar amostragem dinâmica e revisão jurídica/editorial dos fac-símiles dos PRs anteriores. O diagnóstico detalhado, os arquivos, os artefatos e as pendências foram registrados em `docs/qa-acessibilidade-lote2-16nov2026.md`. Manter **PR #30 em rascunho, sem merge/deploy**.


## 23. Continuidade da auditoria e leitura visual — PR #31 (16/11/2026)

**Escopo e herança:** PR #31 deriva do head de PR #30 e auditou **Coautoria, Comparar, Direitos, Downloads, Em disputa, Pioneiras e Relatório 2026**. Homepage e Método foram controles da referência editorial. A automação do lote `.github/workflows/qa-acessibilidade-lote3-16nov.yml` inspeciona nove URLs, 1440, 390 e 320 CSS px, **27 verificações**, 18 capturas integrais e navegação inicial pelo teclado.

**Falha inicial verificada:** execução [#43939874034](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43939874034): quatro textos do capítulo coral do Relatório usavam papel com 80% de opacidade, contraste **3,72:1**, insuficiente para texto pequeno, repetido em cada viewport. **Correção localizada:** em `src/routes/relatorio-2026.tsx`, usar `text-paper` opaco nos textos secundários de capítulos claros. Fundo coral, paleta, gráficos, fotos, dados, links e composição preservados.

**Testes:** [#43940312286](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43940312286) aprovado em 27 verificações, zero violações de regras axe selecionadas, zero erros de execução. [#43941258951](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43941258951) também aprovado, acrescentando **8 interações** em desktop/celular: seleção de estados no Comparar, expansão por teclado dos detalhes de Downloads, cinco âncoras do Relatório e carregamento/legenda da foto de Pioneiras. Um seletor excessivamente estrito no primeiro teste de interação foi corrigido no workflow; não houve falha atribuída ao site.

**Observação visual por capturas reais:** a homepage fotográfica, o Método (documento do portal TSE + fotografia), Pioneiras (Bertha Lutz em 1936), Relatório (capítulos diferenciados), Coautoria (plenário e matriz) e Materiais (capas de PDF) mantêm o tratamento de revista. Pranchas desktop e celular preparadas para revisão editorial, sem simulação. Fotografia não se torna obrigatória onde o argumento pede série, lei, dados ou índice documental. Reavaliar o excesso de altura das manchetes móveis, especialmente do Relatório, após apreciação editorial; não modificar tipografia automaticamente.

**Reconciliação do universo:** são **35 modelos** na matriz, com **29 amostrados até o PR #31** e **6 pendentes** (Lélia Gonzalez, Pagu, Quem chega, Quem são elas? / candidatas, Sobre e Votos). O registro anterior de 20/15 não incluiu como modelos próprios os dois tipos de página dinâmica auditados no PR #29: ficha individual de eleita e tema individual. O número 29 é cobertura por *modelo amostrado*, não por todas as variantes publicadas.

**Pendências:** consulta real com NVDA/VoiceOver, zoom 200%, reespaçamento, navegação complexa e a análise jurídica de direitos do acervo dos PRs anteriores. Documentos e capturas da auditoria em `docs/qa-acessibilidade-lote3-16nov2026.md`. **Manter PR #31 em rascunho, sem merge nem deploy, sem alterar logo, homepage, CSS global ou bases eleitorais.**


## 24. Encerramento da cobertura por modelo — PR #32 (16/11/2026)

**Continuidade:** branch `revista-acessibilidade-lote4-16nov2026`, base PR #31. O lote reúne os seis modelos que faltavam: **Lélia Gonzalez, Pagu, Quem chega?, Quem são elas? / candidatas, Sobre e Votos**, com homepage, Relatório e Pioneiras como controles. **Nove URLs, três larguras (1440, 390 e 320 CSS px), 27 verificações axe, 18 capturas integrais**.

**Testes:** [#43942839897](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43942839897) passou 27 verificações, sem violações das regras WCAG selecionadas, erros de execução ou transbordamento. [#43944282720](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43944282720) repetiu o resultado e aprovou **12 verificações funcionais**, seis em desktop e celular: âncoras dos perfis, bloqueio dos retratos, explorador de candidatas com camadas externas/internas abertas por Enter, tabela de Votos por teclado, política de correções e link para fichas em Quem chega. Falhas intermediárias eram dos seletores do teste; o site não sofreu alteração.

**Política visual preservada:** Lélia Gonzalez não tem retrato liberado; Pagu está bloqueada por `verificacao-pendente`. As duas páginas usam ficha eleitoral **tipográfica** explicitada como tal, não um falso fac-símile. Quem chega traz fotografia de **março de 2026**, anterior ao pleito e legendada; a página de candidatas exibe captura do portal TSE, com nota e direitos ainda pendentes; Sobre e Votos não precisam de imagem genérica. As cores, documentos, fontes, dados, gráficos, homepage e logo originais foram preservados. Capturas desktop/mobile organizadas em duas pranchas para revisão editorial.

**Balanço:** **35/35 modelos da matriz com ao menos uma rota representativa auditada**, não 35/35 URLs certificadas. Ainda faltam inspeção humana com leitores de tela, zoom real de 200%, reespaçamento, menus móveis, outras variantes das fichas e temas, revisão de título/ritmo no celular e decisão jurídica sobre documentos de PRs anteriores. Documento de verificação: `docs/qa-acessibilidade-lote4-16nov2026.md`. **PR #32 permanece em rascunho, sem merge nem deploy.**


## 25. Correção de rumo e consolidação visual — PR #33 (16/11/2026)

**Motivo:** a editora apontou a regressão processual das rodadas de acessibilidade: aberturas de revista conviviam com miolos extensos em branco/lilás, e a fotografia histórica de Pagu, trabalhada antes, sumira do desenho apresentado. **As diretrizes já aprovadas não mudaram**; a resposta foi restaurar sua aplicação nas páginas, sem definir outra estética.

**PR de revisão consolidada:** [#33](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/pull/33), branch `revista-consolidada-ajustes-de-ritmo-16nov2026`, cópia da ponta do PR #32 com base direta em `main`. Reúne alterações acumuladas dos PRs anteriores para avaliação integral, preservando sua história e **sem merge/deploy**. Âncora vinculante: `docs/design/ANCORA-EDITORIAL-PILOTOS-16NOV2026.md` (Quem entrou? / Método / Reportagens). Nenhuma modificação de logo, homepage aprovada, CSS global, fontes de dados, contas, textos jornalísticos ou imagens da produção.

**Ritmo recuperado por página inteira:** aberturas de **Lélia** em roxo e **Pagu** em tinta, capítulo documental de Lélia em dourado, biografias em cadernos de leitura em papel sobre tinta, e intervalos de votos com dados já publicados; **Direitos** ganhou anos destacados em coluna roxa ao longo da linha temporal; **Quem chega** alterna capítulos de Senado, cor/raça, estados, partidos e poder; **Votos** destaca a consulta territorial; **Materiais** separa catálogo do arquivo CSV; **Sobre** individualiza acervo, princípios e política de correções. As mudanças foram localizadas no próprio arquivo de cada página, não impostas como template global.

**Fotografias preservadas e controle jurídico:** `public/fotos/pagu-patricia-galvao-anos-1920.jpg` sempre esteve no acervo. A composição de abertura em tinta com retrato e moldura coral, registrada na curadoria anterior, foi recuperada **somente para a prévia** mediante `VITE_QSE_PREVIEW_PAGU_FOTO=true`. Seu `src/data/fotos.ts` continua com `licenca: "verificacao-pendente"`; o build normal usa ficha do TSE e não reproduz a imagem. Para **Lélia**, foram recuperadas referências, inclusive retrato atribuído a Cezar Loureiro no Commons, mas continua sem retrato local autorizado e sem substituição por IA ou falsa prova documental. Novas fotos somente com procedência e decisão de licença específica.

**Validação:** [GitHub Actions #43950227435](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43950227435) aprovado: build normal sem foto pendente, compilação de prévia explícita com Pagu, 27 auditorias em 9 rotas e 3 larguras, zero violações automáticas nas regras selecionadas ou erros de execução. Capturas reais conferidas com os PRs #29–#32; comparação documentada em `docs/revisao-de-ritmo-e-consolidacao-16nov2026.md`. Os números do diagnóstico são indicadores aproximados de linhas claras em screenshots, não metas cromáticas nem prova de qualidade estética.

**Pendente antes de publicar:** revisão visual humana de todas as páginas e variantes em computador/celular, direitos de Pagu/Lélia e documentos do PR #27, zoom real 200%, leitor de tela e aceitação expressa da editora. **Não iniciar novo redesign, nova paleta ou outra sucessão de PRs; continuar no PR #33 até o fechamento.**


## 26. Pente-fino de páginas completas: Achados, Barreiras e Histórico — PR #33 (16/11/2026)

**Continuidade da mesma identidade, sem novo redesign:** seguir `docs/design/ANCORA-EDITORIAL-PILOTOS-16NOV2026.md`, logo e homepage originais, roxo estrutural, tinta, creme quente, coral profundo com texto claro e dourado. A avaliação desta rodada se refere a **seções internas e páginas inteiras**, não apenas à abertura. Alterações feitas **somente** em `src/routes/barreiras.tsx` e `src/routes/historico.tsx`; `src/routes/achados.index.tsx` foi **preservada sem mudanças** por já alternar fundos e formatos de fichas com fontes e visualização própria.

**Barreiras:** capítulo de processos TSE/MPF em tinta, mantendo os **dois gráficos originais** sobre painéis claros e a distinção processo/caso/vítima; feminicídio em creme quente, com Anuário, rótulos e agregado racial conforme o documento; formas documentadas como caderno roxo com conteúdo em papel; critérios metodológicos em creme. O índice coral da Lei 14.192/2021, painel TSE e representações MPF permanece com links oficiais; nenhuma fotografia de vítimas, ilustração fictícia ou falsa reprodução documental foi inserida.

**Histórico:** primeira série Gênero em creme quente; entre o quadro Cargo × ano e o explorador territorial, interlúdio em tinta explicitando que **cada percentual se refere às cadeiras da UF na própria eleição**. A consulta, as quatro eleições, os dados e categorias raciais, cores semânticas dos gráficos, lacunas e arquivos TSE permanecem exatamente como estavam. Sem usar retrato histórico de outra época para ilustrar a série de 2014–2026.

**Verificação real:** [GitHub Actions #43956945141](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43956945141) aprovado: **15 verificações** (cinco páginas/controles × 1440, 390, 320 CSS px), zero violações automáticas das regras axe-core selecionadas e zero erros de execução; **seis testes funcionais** em desktop e celular de âncoras, links e troca de UF; dez capturas de página inteira. QA consolidado do PR #33 também aprovado no mesmo commit. Documento analítico e critérios de avaliação: `docs/revisao-integrada-achados-barreiras-historico-16nov2026.md`, com imagens originais do CI. Teste automático não substitui leitura humana, zoom de 200%, leitores de tela ou revisão de licenças.

**Estado editorial:** proposta aplicada e testada **em prévia do PR #33, ainda sem aceite visual final nem publicação**. Manter todas as decisões anteriores no mesmo manual; trabalhar no **PR #33** até a avaliação conjunta, sem abrir outra sequência de PRs nem voltar ao branco/lilás predominante ou a um template uniforme. 


## 27. Recuperação das fotografias, fundos e páginas de revista — PR #33 (16/11/2026)

**Decisão editorial reafirmada após revisão crítica:** as rodadas anteriores continuaram introduzindo grandes fundos brancos, lilases quase neutros e o creme editorial `--art-cream` como solução recorrente, contrariando as decisões dos pilotos e a [âncora vinculante](docs/design/ANCORA-EDITORIAL-PILOTOS-16NOV2026.md). A classificação de um teste axe como aprovado **não valida a identidade revista**. O trabalho foi corrigido no **mesmo PR #33** sem redesenhar logo, homepage, paleta, CSS global, dados ou textos da apuração.

**Implementado na prévia:** 
- **Lélia Gonzalez:** retrato histórico atribuído a **Cezar Loureiro**, com referência do [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:L%C3%A9lia_Gonzalez_by_Cezar_Loureiro.jpg), enquadrado em dourado na abertura roxa. O JPEG está em `docs/acervo-em-revisao/lelia-gonzalez-cezar-loureiro-referencia.jpg`, **fora de `public/`**. A renderização exige a variável explícita `VITE_QSE_PREVIEW_LELIA_FOTO=true` e cópia temporária do arquivo apenas no job de prévia. No build normal, o retrato **não é exibido**. A ficha Commons aponta uma tese de domínio público que **não foi verificada juridicamente**; primeiro veículo, data e titularidade devem ser investigados antes de publicar.
- **Pagu:** resgatada a fotografia já existente em `public/fotos/pagu-patricia-galvao-anos-1920.jpg`, no desenho de capa preta com moldura coral anteriormente estudado. `FOTOS.pagu.licenca = "verificacao-pendente"` continua; só aparece com `VITE_QSE_PREVIEW_PAGU_FOTO=true`, no build de revisão, com crédito e ressalva. O arquivo do Commons não resolveu autoria e primeira divulgação.
- **Barreiras:** inserida seção fotográfica inteira, com foto de **Renilce Nicodemos** (Kayo Magalhães/Câmara dos Deputados), cuja utilização contextual está vinculada à reportagem de **01/07/2026 sobre o PL 1446/2025**. A imagem é de arquivo, **não registra violência, vítima ou votação** do PL. O [guia oficial da Câmara](https://www2.camara.leg.br/comunicacao/assessoria-de-imprensa/guia-para-jornalistas/noticias-e-fotografias) permite uso de fotografias com crédito; a foto foi classificada em `src/data/fotos.ts` como **`uso-livre-com-credito`**, sem atribuir incorretamente uma licença CC-BY a esta imagem. Fundo dos blocos de feminicídio e critérios deixou de ser creme e passou para ameixa/tinta, conservando áreas de leitura em papel e os mesmos gráficos.
- **Histórico:** criada pausa fotográfica em tinta para o **primeiro turno de 04/10/2026**, com imagem de local de votação no UniCEUB Asa Norte, Brasília, **Saulo Cruz/Agência Senado**, e legenda que não a confunde com as eleições 2014, 2018 e 2022. A [ficha do Commons](https://commons.wikimedia.org/wiki/File:Elei%C3%A7%C3%B5es_2026_-_Primeiro_turno_(55567948757).jpg) registra licença **CC BY-SA 4.0**, confirmada por FlickreviewR em 05/10/2026. Primeira série em plano de leitura; comparação por gênero/raça em tinta; cargo/UF em roxo. Corrigido contraste de `ContextBox` dentro de fundo escuro por painel claro localizado, sem retornar a longos fundos claros.
- **Achados:** capítulos temáticos passam a alternar `bg-ink`, `--art-plum` e papel, reservando a área clara à consulta de fichas. A tentativa intermediária em violeta claro provocou falha objetiva de contraste; foi revertida para a **ameixa profunda já existente**, sem criar cor nova, alterar barras ou manusear as bases.

**Proveniência das três imagens incorporadas nesta rodada:** script e hashes arquivados em GitHub Actions [#43959698093](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43959698093). Arquivos públicos: `public/fotos/renilce-nicodemos-pl1446-camara.jpg` e `public/fotos/local-votacao-2026-agencia-senado.jpg`; Lélia permanece fora da pasta pública. Os metadados de crédito, contexto e condição estão em `src/data/fotos.ts`. Os arquivos públicos de imprensa **não provam apuração individual dos números eleitorais**; têm função contextual identificada.

**Teste de separação de ambientes:** [GitHub Actions #43962425567](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43962425567) aprovado: build normal **sem** retratos históricos de autorização pendente, compilação especial com as duas fotografias e legendas, capturas reais em desktop/celular e verificação axe das páginas. A auditoria específica de Achados/Barreiras/Histórico também verifica loading, alt, caption e interações em 1440/390/320 CSS px; seguir o registro detalhado em `docs/recuperacao-fotografias-e-contraste-16nov2026.md`.

**Limite de aceite:** a prévia visual **não constitui licença de reprodução** nem aprovação da versão final. Estão pendentes direitos de Lélia/Pagu e dos recortes anteriores, conferência editorial de todas as páginas inteiras, validação em leitores de tela/zoom real e decisão expressa da editora antes de qualquer merge ou deploy. **Continuar somente no PR #33, sem nova paleta nem novo projeto.**


## 28. Investigação, dinheiro e falas: evidências no corpo da revista — PR #33 (16/11/2026)

**Motivo editorial:** a revisão de visual e fotografia mostrou que algumas páginas continuavam com miolos de texto em superfícies quase brancas, embora já tivessem fonte documental relevante. Aplicar a mesma **identidade consolidada** por assunto, sem nova paleta, sem outro PR, sem alterações na homepage, no logo, nas contas, datas de corte, classificações raciais, textos de investigação ou CSS global.

**Quem controla? (`src/routes/quem-controla.tsx`)** — a abertura em roxo, o caderno FEFC em tinta e a reprodução **real** da capa PJe do PL em coral profundo já cumpriam a direção e foram preservados. A listagem das **cinco alavancas** passou a composição de fichas numeradas sobre papel, enquadradas em capítulo roxo; cada ficha mantém exatamente sua descrição, indicador exigido e status disponível/parcial/pendente. O capítulo jurídico `As regras que incidem` deixou o lilás e passou para tinta, com caixas claras locais e link da Lei 9.504/1997 legível em papel. **A imagem da capa identifica apenas o processo e os anexos**, sem comprovar execução, regularidade ou distribuição dos valores a candidaturas.

**Dinheiro (`src/routes/dinheiro.tsx`)** — no percurso entre **critérios do FEFC** e **recursos efetivamente recebidos**, foram inseridas **duas páginas reais de resoluções** já existentes na branch e com proveniência registrada no acervo documental: `public/documentos/tse-uniao-brasil-resolucao-cen043-2026.png` e `public/documentos/tse-fe-brasil-resolucao-14-2026.png`. Renderizam em `DuasResolucoesFEFC` com identificação, página exata, fonte integral, legenda e ressalva. A Federação Brasil da Esperança consta como **documento anexo ao processo do PT, não resolução exclusiva do PT**. As imagens ilustram **critérios formais declarados** e não mostram quanto cada candidata recebeu ou eventual infração legal. A seção de gênero × cor/raça passou a plano de tinta com painel de papel para os gráficos e notas. Nenhum valor, cor de categoria racial, denominador, universo, filtro ou data de corte foi alterado. **Licença/publicação dos recortes continuam sujeitas ao controle jurídico específico do PR #27.**

**Na voz delas (`src/routes/na-voz-delas.tsx`)** — preservados os textos literais das falas, nomes, contextos, respostas, indicadores do Anuário, fontes, datas, regras de publicação e a captura **autêntica** de uma linha do catálogo de discursos da Câmara, que já estava no final da reportagem com legenda diferenciando índice de Diário. Os registros alternam tinta, roxo estrutural e papel em vez de uma sequência uniforme de branco/creme. Os quadros contendo **dado oficial** usam dourado com tipografia em tinta. Fotografia genérica de parlamentar não foi incluída: a evidência jornalística pertinente são a transcrição e os documentos de origem, e um retrato ilustrativo poderia induzir associação a outra sessão.

**Reportagens (`src/routes/reportagens.tsx`)** — **preservada e usada como controle de direção editorial**, com manchete em roxo, figura de votos em tinta, fotografia contextual da Câmara de maio de 2023, capítulo coral de falas e índice de documentos. A foto segue identificada como **contexto**, não registro fotográfico das seis votações da apuração.

**Validação técnica e visual** — [GitHub Actions #43971435624](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43971435624), commit `77759a3731676b9238671e67520f723ee3b3d05a`, **aprovado**: TypeScript/HostGator, **5 rotas × 3 larguras = 15 verificações** axe-core selecionadas (1440, 390, 320 CSS px), sem violações identificadas, sem erros JS/horizontal overflow; **6 testes funcionais** em desktop/celular de alavancas, link legal, documento TSE, duas resoluções do FEFC com legenda e imagem carregada, captura da Câmara e navegação às falas fechadas. **Dez capturas integrais** originais, inclusive páginas completas longas em desktop/celular: [artefato do workflow](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43971435624/artifacts/14279395493). Leituras de página inteira foram inspecionadas; a visualização serve como evidência de intervenção, **não como aceite estético da editora**.

**Resultado e limite:** este lote preserva as fotografias documentais já catalogadas e insere **documentos reais onde eram ausentes**, com capítulos escuros para organização e papel delimitado às áreas de leitura. Não confundir conclusão de teste com licença, verdade jurídica ou aprovação para publicação. Permanecem pendentes os direitos de Lélia, Pagu e de reproduções oficiais identificadas, a avaliação com zoom real e leitores de tela e o aceite editorial final do PR #33, que continua **draft sem merge nem deploy**. Detalhamento em `docs/revisao-investigacoes-documentos-16nov2026.md`. Não recompor uma nova identidade ao retomar esta conversa.


## 29. Visualização legível das fontes e reforço do documento em Na voz delas — PR #33 (16/11/2026)

**Problema constatado pela editora:** a prancha entregue para comparação das quatro páginas era uma montagem de miniaturas de páginas de **até aproximadamente 9,5 mil pixels de altura**. A redução para poucos centímetros ocultou as fotografias, os recortes e os fac-símiles, mesmo quando as imagens estavam tecnicamente presentes. **É um erro de apresentação e de verificação editorial:** screenshots integrais são arquivo técnico, **não** são, sozinhos, prova visual adequada para a revisão humana. É obrigatório fornecer **também recortes a aproximadamente 1:1, com largura próxima à original**, de cada fotografia, documento e visualização relevante, além da página inteira para ritmo e navegação.

**Verificação do material real no PR #33:**
- **Quem controla?** mostra a capa autêntica do PJe do PL/TSE no capítulo coral, legível na captura desktop sem redução extrema. É capa de processo, não critérios anexos e nem prestação de contas.
- **Dinheiro** mostra as páginas originais do FEFC **União Brasil (Resolução CEN 043/2026) e Federação Brasil da Esperança (Resolução 14/2026, anexa ao processo do PT)** em caderno documental roxo; no print inteiro estavam abaixo da metade da página, e a montagem tornava ambas quase invisíveis. Não são fotografias, mas reproduções documentais reais, com legendas, origens e PDF integral.
- **Reportagens** tem fotografia de plenário da Câmara, datada de maio de 2023, corretamente identificada como contexto, **não fotografia das seis votações**.
- **Na voz delas** tinha uma imagem verdadeira, porém **muito fina e concentrada no caderno de fontes ao fim da página**: captura de **uma única linha** do índice de discursos da Câmara, que aponta a fala de Julia Zanatta para o Diário de 11/03/2026, p. 163. Isso não é uma imagem da página 163 do Diário, nem comprova o teor da citação sem o original.

**Correção de composição aplicada:** Na voz delas ganhou **um interlúdio documental roxo imediatamente após a abertura**, com título de investigação, número **163** em dourado, recorte **original e ampliável**, legenda de natureza e limite da evidência, e link direto para a pesquisa da Câmara. O recorte anterior **foi retirado do caderno final**, que conserva as referências textuais de todas as falas, para evitar duplicação decorativa da mesma imagem. Arquivos alterados: `src/routes/na-voz-delas.tsx` e `src/components/editorial/IndicesDocumentaisCamara.tsx`, que passou a aceitar `incluirRecorte={false}` sem afetar o padrão dos outros usos.

**Segurança e limites:** nenhuma fala, estatística, pessoa ou fonte foi alterada; nenhum documento foi fabricado; sem fotografia fora de contexto. [GitHub Actions #43973899797](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43973899797) aprovado, com cinco páginas em três larguras e testes de autenticidade visual mínima do recorte (arquivo carrega, alt, figura e legenda) e navegação ao registro. **Contraste automático aprovado não equivale a aceite de direção de arte.** Todos os prints de apresentação de agora em diante devem incluir **detalhes ampliados**, apresentados no mesmo tamanho visual das imagens, com **indicação de qual página e do que se trata**. Reportar a ausência de imagens quando real e a natureza exata de cada fonte; não afirmar simplesmente que uma página "tem fotografia" quando ela apresenta apenas texto, gráfico ou índice de dados.

Esta decisão é aditiva e **não reinicia o redesign**. PR #33 permanece em rascunho, sem merge/publicação. Registro da etapa em `docs/visibilidade-real-de-imagens-documentos-16nov2026.md`.


## 30. Fechamento editorial: cobertura dos modelos, variantes e publicação estática — PR #33 (16/11/2026)

**Situação aferida (prévia):** a matriz de `docs/matriz-fotografias-documentos-graficos-16nov2026.md` relaciona **35 modelos editoriais**. Os relatórios PRs #28–#32 já haviam testado **ao menos uma amostra de cada modelo**: 35/35. **Cobertura de modelos não é aceite visual da página inteira, nem auditoria exaustiva de todos os estados e URLs.** O PR #33 consolidou e revisou capítulos, fotografias e documentos sem mudar a identidade. A prioridade agora é **fechar pendências reais**, e não reiniciar o redesign, abrir novo PR ou recolorir indiscriminadamente.

**Bloqueio de publicação encontrado e corrigido:** o build HostGator tinha `prerender.crawlLinks=true` e incluía explicitamente apenas achados. A listagem de eleitas mostra inicialmente 18 fichas, deixando outras URLs fora da malha de links rastreados; a URL real `/eleitas/raquel-lyra-pe`, cujo registro consta da base, retornou **HTTP 404 na versão estática de teste**. Corrigido em `vite.config.static.ts`, que agora inclui explicitamente todos os **342 slugs de `ELEITAS_2026`** e os **seis slugs de `TEMAS`**, além dos achados. Não foram alterados nomes, candidaturas, resultados, filtros ou informações das fichas.

**QA após a correção:** [GitHub Actions #43976601483](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43976601483), aprovado. **342 de 342 páginas de eleitas e seis de seis páginas de Temas presentes como `index.html` no pacote estático, sem ausências no sitemap.** Teste Playwright/axe-core selecionado de **nove páginas-amostra × três larguras = 27 verificações**, zero violações selecionadas e zero erros de execução; **18 verificações funcionais** em desktop e celular (seis variantes temáticas, uma ficha de deputada, uma de governadora e a captura documental da página Quem são elas?). Os testes não equivalem à leitura visual de cada uma das 342 fichas.

**Semântica de documento:** a captura real do portal TSE na rota `/quem-sao-elas` deixou de ser `div` + parágrafo solto e agora usa `figure` + `figcaption`; a legenda identifica a página **de disponibilização**, não uma captura do CSV ou da base completa, e lembra que **o direito sobre a interface não decorre automaticamente da licença dos dados**. Código: `src/components/editorial/CadernoDocumentalRevista.tsx`; arquivo fotográfico original preservado.

**Imagens conferidas na auditoria de variantes:** tema **Memória** tem fotografias documentais datadas de Bertha Lutz em 1927 e na posse de 1936; tema **Agenda** apresenta fotografia de contexto parlamentar, explicitando que ela não registra as votações recontadas. Os outros temas usam prioritariamente gráficos, número-objeto, citações e fontes; não acrescentar fotografia decorativa só por simetria. As fichas individuais não recebem retratos de pessoas sem direito documentalmente verificado. Capturas completas e inventário em [artefato #14279714782](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43976601483/artifacts/14279714782).

**Três frentes ainda abertas, antes de finalizar o redesign:**
1. **Aceite editorial de página inteira e estados de uso:** conferir composições e evidências em tamanho real, manchetes longas, páginas de dados extensas e combinações de filtros/celular. Revisar as variantes de fichas mais complexas por amostragem, sem presumir que 342 HTMLs entregues significam 342 fichas avaliadas humanamente.
2. **Direito de reprodução individual:** retratos históricos **Pagu e Lélia** permanecem bloqueados no build normal; decisão específica sobre a captura da interface **TSE** e quatro recortes públicos anteriores (**União Brasil, Federação Brasil da Esperança, capa PJe do PL e índice da Câmara**) antes do merge. A presença de arquivo em repositório público não constitui autorização; manter fontes, dados pessoais, origem, data, licença ou fundamento jurídico e alternativa textual.
3. **Acessibilidade humana e publicação:** navegação real por teclado, leitores de tela NVDA/VoiceOver, zoom de 200% e reespaçamento; revisão do diff integral do PR #33 contra `main`, aceite explícito da editora e integração/deploy supervisionado na HostGator. **Nenhuma mesclagem, publicação, mudança da homepage ou redefinição da paleta foi autorizada nesta rodada.**

Registro completo em `docs/fechamento-redesign-pendencias-16nov2026.md`. Decisões visuais anteriores (roxo estrutural, tinta, coral profundo com texto claro, dourado, imagem factual, leitura em papel pontual, logo original) seguem vinculantes.


## 31. Fechamento: reflow e direitos de reprodução — 16/11/2026

**Escopo:** PR #33, sem merge/deploy. Permanecem intactas a logo, a homepage, a paleta roxo estrutural/tinta/coral profundo com texto claro/dourado e os critérios de prova visual. Não recolorir páginas indiscriminadamente.

**Teste novo:** scripts/qa/reflow-teclado-fechamento.py e .github/workflows/qa-fechamento-reflow-teclado-16nov.yml. [GitHub Actions #43980902610](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43980902610) aprovado: 27 cenários de nove rotas (desktop, reflow com 640 CSS px/DPR2 e texto reespaçado no celular), nenhum transbordamento detectado e três interações por teclado funcionais. Esse reflow é **equivalente e simulado**, não zoom nativo 200% nem teste NVDA/VoiceOver. A avaliação humana continua necessária.

**Direitos com fonte institucional:** a Câmara permite uso de fotografias do Banco de Imagens com crédito, em regra CC BY; outras imagens e documentos não herdaram automaticamente essa licença. Fotos Pagu e Lélia continuam bloqueadas em produção, por incertezas de autoria, primeira publicação ou enquadramento da ficha Commons. A captura de interface TSE, a resolução interna do União Brasil, a resolução da Federação Brasil da Esperança, a capa PJe do PL e uma linha do catálogo de discursos da Câmara continuam **com avaliação individual pendente**. Lei 9.610/1998, arts. 8º e 46; nenhuma liberação tácita.

**Registro analítico:** docs/triagem-direitos-e-a11y-final-16nov2026.md, com fontes, sete decisões pendentes e limites metodológicos. O PR continua draft; o aceite visual de páginas inteiras e documentos em tamanho legível precede o encerramento.


## 32. Revisão de fotografias e distribuição do acervo (16/11/2026)

**Inspeção de páginas completas, sem mudança de identidade:** os screenshots originais de Barreiras, Histórico, Achados, Direitos, Quem chega, Votos, Sobre, Materiais e Pioneiras foram examinados. Barreiras apresenta fotografia real de Renilce Nicodemos na discussão do PL de proteção a pré-candidatura, não fotografia de vítima ou julgamento. Histórico contém registro do local de votação de 04/10/2026, com legenda de 2026, distinto das séries históricas de 2014, 2018 e 2022. Direitos utiliza transcrições identificadas e cronologia, sem fingir que cartelas são fac-símiles. Persistem áreas claras de leitura, sobretudo dados e documentos, mas não foram encontradas razões suficientes para repintura generalizada. **Nenhum redesign adicional foi feito nesta rodada**; logo original, homepage, paleta e fotografias atuais preservadas.

**Falha de publicação corrigida:** o componente de Pagu bloqueava a renderização da foto por direitos pendentes, mas o arquivo public/fotos/pagu-patricia-galvao-anos-1920.jpg ainda era copiado para dist/client/ pelo Vite e pelo restaurador de arquivos. Assim, permanecia acessível por URL mesmo oculto na interface. O script scripts/hostgator-public-binaries.mjs passa a **remover arquivos pendentes do pacote normal**, abrangendo Pagu e preventivamente Lélia; somente as flags VITE_QSE_PREVIEW_PAGU_FOTO=true e VITE_QSE_PREVIEW_LELIA_FOTO=true habilitam seus arquivos na compilação de prévia editorial. Não se alteram originais do GitHub público nem fichas tipográficas normais. Essa proteção se aplica ao pacote estático HostGator, não a outros serviços de distribuição.

**Teste verificável:** [Actions #43983013191](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43983013191), sucesso no commit 0d1c549305d11f0581ee9c2b0878b777476b2e44; workflow .github/workflows/qa-ritmo-revista-integrada-16nov.yml comprova ausência dos retratos em dist/client no build normal, presença na prévia, renderização da ficha no build normal e imagens válidas nos previews. As outras três rotinas gerais também passaram no mesmo commit. Se direitos vierem a ser confirmados, a retirada do bloqueio deve ser explicitamente autorizada e documentada.

**Pendências restantes:** avaliação jurídica individual dos materiais ainda pendentes; leitura humana de páginas longas e variantes com filtros e tabelas, zoom nativo, leitores de tela; aprovação editorial das composições e diff de PR #33 antes de qualquer integração e deploy. PR #33 permanece em rascunho.

## 33. Pente-fino do PR consolidado, integridade de 399 páginas e apresentação para aceite visual — 16/11/2026

**Escopo e governança:** PR #33, baseado em main, permanece rascunho e sem publicação. O diff completo tinha 120 arquivos no momento da conferência (incluindo documentação, testes, rotas e assets). O inventário de arquivos de maior risco identificou alterações nas fichas de fotografia, novo índice de fontes partidárias e uma atualização editorial pontual em src/data/temas.ts: os critérios formais do FEFC são públicos no TSE, mas sua aplicação a cada candidatura ainda exige apuração. **Não foram alteradas a home, a logo, as bases centrais de votação, candidaturas e resultados, nem os arquivos de estilos globais.** A alteração do empacotamento está restrita à HostGator e preserva o código publicado em main.

**QA integral do pacote estático:** script scripts/qa/integridade-links-pacote.py, workflow .github/workflows/qa-integridade-links-16nov.yml. [Execução inicial #43985935626](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43985935626): 399 páginas HTML pré-renderizadas; 19.845 ocorrências de links internos válidos; 596 ocorrências de links externos listadas, sem verificação HTTP; 37 referências locais de mídia válidas encontradas no HTML; zero erros de destino interno, fragmentos e mídia, zero placeholders. As duas fotografias históricas em análise autoral permanecem ausentes do pacote normal. Esses números descrevem **ocorrências de links no HTML**, não URLs únicas nem estados interativos. **Após revisão do diagnóstico sem falso positivo**, o teste deixou de ser apenas informativo e passou a FALHAR se houver links/mídias locais quebrados, fragmentos ausentes, retratos bloqueados no pacote ou queda anormal da contagem de páginas. [QA de regressão #43986261537](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43986261537), sucesso.

**Revisão da página inteira, não só da abertura:** capturas efetivas de Direitos, Quem chega, Sobre e Votos (desktop e celular) foram separadas para avaliação da editora; originais da [execução de prévia #43981679297](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43981679297) antecedem apenas testes e bloqueios de arquivos, sem modificação da composição dessas quatro páginas. Em Direitos, os cadernos de normas funcionam como reprodução tipográfica explicitamente rotulada, não simulação de fac-símile. Quem chega alterna abertura forte, fotografia contextual, capítulo do Senado e dados por estado/partido, com seções longas que precisam de leitura em tamanho nativo. Sobre é institucional e não requer fotografia genérica de bastidores. Votos usa os próprios gráficos e denominadores como peças visuais; fotografia de plenário seria inadequada se não registrasse a votação analisada. **Não se determina recoloração ou inclusão automática de fotos por simetria.** Aceite estético continua sendo decisão da editora.

**O que a auditoria não cobre:** links externos não foram requisitados; disponibilidade dos documentos públicos pode mudar. A extração HTML não cobre todas as alterações de DOM após filtros, leitor de tela ou navegação durante animação. O inventário de mídia inclui apenas tags explícitas do HTML pré-renderizado, não todos os recursos baixados pelo JavaScript. O sucesso dos testes de CI não confere autorização de reprodução a imagens nem substitui avaliação jurídica ou humana.

**Restante antes do encerramento:** revisão de direitos individual de Pagu, Lélia e cinco imagens de interface/processo; última leitura humana de páginas completas, filtros e tabelas, zoom nativo e tecnologia assistiva; aprovação do diff e autorização expressa para mesclar e publicar. Não iniciar outra identidade, não atualizar números eleitorais por inferência e não mesclar PR #33 automaticamente.


## 34. Etapa 1 do fechamento — parecer visual de 43 rotas completas (16/11/2026)

**Direção normativa preservada:** consulta da âncora dos três pilotos, capítulos anteriores do manual e matriz fotográfica. Foram registradas **86 capturas completas de 43 rotas** da versão PR #33, em 1440 e 390 CSS px, sem falhas detectadas na coleta ([Actions #43993887153](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43993887153)). A cobertura inclui as **35 famílias de página** da matriz, seis variantes temáticas, fichas individuais e dois estados de busca; não são 399 páginas aprovadas uma a uma nem avaliação humana de todos os estados.

**Achado visual e intervenção pontual:** nos Temas **Memória** e **Violência política**, o único achado ocupava só um terço da seção num grid de três colunas e gerava coluna excessivamente longa com vazio lateral. A rota src/routes/temas.$slug.tsx passou a destacar o único achado com largura de até 1024px e escala tipográfica de matéria; dois achados em duas colunas, três ou mais em até três colunas. Sem mexer em fotografia, gráfico, cor, número, título, texto ou fonte. QA específico com dimensão mínima em desktop/celular, [Actions #43994685648](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43994685648), aprovado; capturas posteriores desses dois Temas guardadas com as capturas anteriores dos demais.

**Parecer de conjunto:** favorável ao aceite editorial sem redesenho amplo. Manter roxo estrutural, tinta, coral profundo com **texto claro**, ouro pontual, materiais de leitura em papel, Fraunces + sans, fotografia documental verdadeira quando há acontecimento/personagem registrável e documentação/gráficos como protagonistas em séries. **Não é exigência pôr foto em toda página**; registros de votos, regras e dados agregados frequentemente pedem gráfico, cartela tipográfica corretamente rotulada ou fac-símile com direitos comprovados. As páginas mais longas (Direitos, Achados, Em disputa, Histórico, Quem chega, Votos) exigem leitura em tamanho real no celular, mas não foram recoloridas automaticamente.

**Relação individual de cada rota e critérios de decisão:** docs/parecer-editorial-visual-etapa1-16nov2026.md. A editora continua responsável pelo aceite final de cada objeção visual. O PR #33 permanece **draft, sem merge e sem deploy**. Direitos e acessibilidade humana continuam nas etapas seguintes.


## 32. Peça-piloto de colagem editorial — Pagu (16/11/2026)

Após a revisão jurídica das sete reproduções, foi aprovada a exploração de **colagem editorial** como alternativa provisória a fotografias sem licença comprovada, sem abandonar a busca por fotografias e documentos autênticos. Referência visual fornecida pela editora: composição de Pagu com textura de papel, gravura, recortes de imprensa, tinta escura e cores fortes. **Não considerar a referência gerada por IA como retrato documental, registro de época ou licença da fotografia original.**

**Implementação pontual no PR #33:** em `src/components/editorial/Pioneiras.tsx`, a abertura de Pagu no build normal apresenta uma **peça gráfica tipográfica original construída no próprio front-end** (nome PAGU, campos temáticos e formas em roxo, tinta, coral, dourado e papel). Legenda expressa que não se trata de retrato ou documento original. A ficha de votação de 1950 foi **preservada** ao lado/abaixo da composição. Não houve alteração nos dados, denominadores, homepage, logo, CSS global, nem nas regras de bloqueio dos dois retratos. A prévia especial com flag fotográfica mantém seu próprio comportamento para revisão, sem autorização para publicação.

**Regra de expansão, ainda sem aceite:** testar visualmente a página completa e a versão celular antes de criar peças em outras páginas. Usar colagem editorial apenas quando tiver função narrativa, com fontes documentais identificadas em separado. Elementos decorativos nunca devem simular conteúdo verificável (gráficos com valores inventados, jornais falsos, manchetes apócrifas, fac-símiles). Não uniformizar todas as páginas nem substituir automaticamente fotografias licenciáveis por ilustrações.

**Status:** alteração apenas na branch do PR #33, que continua em rascunho, sem merge ou publicação. Build, captura integral e aceite estético desta peça ainda precisam ser realizados.


## 33. Fechamento visual das pioneiras e controle das etapas finais — 16/11/2026

As peças editoriais de **Pagu** e **Lélia Gonzalez** foram incorporadas ao PR #33 como SVGs tipográficos distintos, com composição de papel, recortes abstratos, cromia institucional e referências à escrita e ao debate político. **Não são fotografias, nem retratos fiéis, nem documentos históricos.** Os respectivos arquivos são `public/arte-editorial/pagu-colagem-tipografica.svg` e `public/arte-editorial/lelia-colagem-tipografica.svg`; os dois usam legendas que identificam a natureza ilustrativa. As fichas de votação preservam dados e fontes. As fotografias históricas continuam bloqueadas por direitos pendentes.

A solução visual é candidata a aceite, **ainda não aprovada em captura integral**, e não determina que outras rotas recebam ilustrações. Mantêm-se a logo, a homepage, a paleta, os pilotos e a identidade original. Procedência, restrições e decisões jurídicas estão em `docs/etapa2-matriz-definitiva-direitos-imagens-16nov2026.md`. Estado verificável e pendências das etapas 3–5 em `docs/fechamento-etapas-2-a-5-pr33-16nov2026.md`.

Controle técnico: workflow de aceite integral adaptado para mudanças em `Pioneiras.tsx` e SVGs; verificações propostas de existência, XML íntegro e ausência dos retratos e screenshot TSE no build normal; QA de variantes alterado para exigir link ao dataset em vez da captura suspensa. **Não registrar execução positiva sem resultado de Actions.** Teste humano de teclado, zoom nativo 200% e leitor de tela permanece obrigatório, assim como revisão final do diff, aceite editorial e autorização expressa de publicação. PR #33 segue em rascunho, sem merge/deploy.
