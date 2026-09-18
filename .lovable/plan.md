# Direção visual "menos app fofo, mais jornal de dados" — duas propostas (decisão pendente)

Discussão apenas. Nada implementado. A paleta atual (plum, cream, coral, solar, ink — tokens de `src/styles.css`) é mantida em ambas; o que muda é tipografia, densidade, componentes de dado e uso da cor.

## Direção A — "Broadsheet" (página de jornal de dados impresso)

- Conceito: o site como página impressa de um diário de dados. Informação sobre papel; cor só como tinta de destaque.
- Referências de linguagem: Reuters Graphics, La Nación (equipe de dados), cadernos de dados impressos (Folha/Estadão), linguagem The Economist (sem copiar paleta).
- Tipografia: Fraunces mantida nos títulos (peso 600–700, escala contida); IBM Plex Mono promovida a protagonista de dados (números tabulares, kickers, tags, eixos); Work Sans menor e mais densa no corpo.
- Componentes: fim de cards flutuantes — dados em blocos e tabelas separados por fios de 1px (`--rule`); barras finas com tick marks; cantos retos (radius 0); zero sombras; StatusTag = caixinha mono uppercase com borda 1px sem preenchimento; hover por sublinhado.
- Espaçamento: mais denso, grid de colunas de jornal, divisórias horizontais entre seções no lugar de caixas.
- Cor: cream/paper domina; plum é a única cor de dado; coral reservada exclusivamente à semântica de lacuna/alerta; solar só como sublinhado fino; ink para texto e réguas. Sem blocos decorativos.
- Ilustração: ilustrações atuais saem ou viram duotone plum; foto documental P&B com legenda mono e crédito.

## Direção B — "Dossiê" (ensaio visual de revista)

- Conceito: o site como dossiê impresso de revista: painéis de tinta cheia, tipografia gigante, cor como arquitetura da página.
- Referências de linguagem: The Pudding, Bloomberg Businessweek impresso, features da ProPublica, The Markup.
- Tipografia: Fraunces em escala máxima (até ~7rem, peso 900), palavras-chave da tese em coral dentro do título; Work Sans no corpo; mono só em kickers/legendas.
- Componentes: cards creme com borda ink 2px e sombra sólida offset (sem blur); barras grossas com borda ink; StatusTag vira chip preenchido (plum/cream; "aguardando fonte" em solar/ink); números-hero enormes.
- Espaçamento: mais arejado, grid assimétrico com margens largas; seções alternam painéis ink full-bleed e fundo creme.
- Cor como estrutura: painéis ink com texto cream; coral como fio narrativo da tese ("desaparecem"); solar como marca-texto; plum preenche blocos e gráficos.

## Próximo passo

Aguardando a escolha de uma direção (A ou B — ou combinação pontual, ex.: densidade e componentes da A com painéis ink da B). Só depois da escolha sai um plano de implementação detalhado (tokens, utilitários CSS, componentes afetados), sem tocar em dados nem na fotografia TSE.

Os mockups em Files (`mockups/direcao-a-broadsheet.png`, `mockups/direcao-b-dossie.png`) são ilustrativos: os textos e números neles não são dados do projeto.
