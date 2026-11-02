# Manual visual do Quem são elas? (v2, novembro de 2026)

Substitui o manual v1.0 de agosto de 2026. Reúne as decisões tomadas pela editora entre setembro e novembro de 2026 e o que está implementado no código (`src/styles.css` e `src/components/editorial/`). Quando este documento e o código divergirem, corrija um dos dois no mesmo commit.

## Conceito

Revista jornalística contemporânea sobre mulheres, política e poder. Dados, gráficos, números e tipografia constroem a identidade. A imagem entra quando acrescenta informação (fotografia documental, documento, retrato de época), nunca como enfeite.

A identidade é própria: o projeto recusa virar cópia visual de outro veículo e recusa a saída genérica de preto, branco e roxo "sofisticado".

## O que fica fixo

- A logo atual e o símbolo do olho. A logo é a âncora entre a identidade antiga e a nova; a reforma é no sistema em volta dela.
- O olho aparece discreto: favicon, assinatura de gráfico (quemsaoelas.com.br no rodapé de cada ficha), marca d'água. Nunca grande e repetido em toda página.
- Roxo como cor principal, laranja como contraste, Fraunces nos títulos.

## Paleta

A paleta é a do projeto. A paleta coral, amarelo e verde proposta pela auditoria externa de novembro de 2026 foi recusada.

| Token                          | Valor                                   | Papel                                                                                      |
| ------------------------------ | --------------------------------------- | ------------------------------------------------------------------------------------------ |
| `--plum`                       | oklch(0.39 0.16 305)                    | Cor protagonista: títulos, fios de seção, blocos fortes em largura total, links            |
| `--ink`                        | oklch(0.19 0.035 310)                   | Texto, rodapé, blocos fortes escuros                                                       |
| `--paper`                      | oklch(0.985 0.004 305)                  | Fundo base                                                                                 |
| `--cream`                      | oklch(0.965 0.014 85)                   | Fundo claro alternado                                                                      |
| `--muted`                      | oklch(0.955 0.008 305)                  | Fundo claro alternado (cinza-lilás quase neutro)                                           |
| `--coral` / `--coral-ink`      | oklch(0.63 0.2 34) / oklch(0.5 0.19 32) | Laranja com função: marca o dado de 2026 nos gráficos; `coral-ink` para texto              |
| `--plum-soft`, `--plum-bright` |                                         | Variações do roxo em gráficos e sobre fundo escuro                                         |
| `--lilac`, `--butter`          |                                         | Só detalhe: marcador, faixa de escala de mapa, caixa pequena de dado. Nunca fundo de seção |
| `--rule`                       | oklch(0.87 0.014 305)                   | Fios finos e bordas                                                                        |

### Fundos (direção B, aprovada em 02/11/2026)

- Fundos claros próximos se alternam ao longo da página: papel, creme e o cinza-lilás quase neutro.
- Blocos fortes em roxo ou tinta, em largura total, dão o ritmo: citação grande, abertura de página, chamada de destaque.
- Pastel saturado (lavanda, manteiga) não ocupa área grande. No `SectionBlock`, os tons `lilac` e `butter` foram mantidos por compatibilidade e caem em `muted` e `cream`.
- Sem gradiente de cor. Sem fundo inteiramente branco.

### Laranja com função

O laranja marca o dado de agora (2026) nos gráficos e as datas de destaque. Não é enfeite e não aparece só para colorir.

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
- Um número-herói por tela.

## Abertura de seção

Componente `Secao`: fio roxo grosso em cima e nome da seção em Fraunces itálico, com o tipo de matéria ao lado quando houver ("reportagem", "perfis"). Substitui as etiquetas em mono caixa-alta ("badges"), aposentadas em 02/11/2026. Em chamadas menores, fio fino (`pequeno`). Sobre roxo ou tinta, versão clara (`claro`).

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
- Fotografia só documental, licenciada e com crédito, registrada em `src/data/fotos.ts` e exibida por `FotoDocumental`. Nunca como banco de imagens de candidatas.
- Documentos como imagem: fac-símile de jornal, diário oficial, ficha do TSE.

## Instagram

- Capa do carrossel é o card mais chamativo; carrosséis enxutos.
- Frases didáticas, com a comparação explícita (com o quê, quando).
- Pedido de compartilhamento vai na legenda, nunca no card.
- Card final destaca a marca: olho, "Quem são elas?" e o site.

## Acessibilidade

- Contraste WCAG 2.1 AA (auditoria axe zerada em 27 páginas em 02/11/2026).
- Link "Pular para o conteúdo", foco visível, navegação por teclado.
- Informação nunca depende só da cor.
