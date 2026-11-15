# Manual visual do Quem são elas? (v3 — decisões consolidadas em 15/11/2026)

Esta versão consolida o manual v2 e as decisões editoriais posteriores de novembro de 2026. O histórico da v2 permanece no GitHub. O projeto gráfico aprovado orienta as mudanças na interface; a existência de um estilo ou componente no código não implica aprovação automática de seu uso em todas as páginas.

**Estado de implementação:** este documento está atualizado **somente na branch de revisão do PR #6**, ainda sem merge/publicação. As decisões aqui descritas representam a direção editorial já aprovada; a execução visual das páginas internas segue sujeita à comparação com a homepage, revisão em computador e celular e decisão específica antes de publicação.

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

**Este manual consolida decisões; não representa execução ou publicação das alterações visuais pendentes.**
