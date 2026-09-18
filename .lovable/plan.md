# Direção visual "Dossiê" v2 — base escolhida, ajustes pendentes de mockup

Discussão/mockup apenas. Nada implementado. A paleta atual (plum, cream, coral, solar, ink — tokens de `src/styles.css`) é mantida. A dona do projeto escolheu a Direção B ("Dossiê") como base e pediu estes apertos antes da implementação:

## Regras v2 da direção Dossiê

1. **Rigor visível:** todo número-manchete carrega legenda de fonte/data em mono pequeno, colada e sempre visível (nunca tooltip).
2. **Hierarquia de números:** 1–3 números monumentais por página (o achado central); todo o resto em escala menor, claramente "de apoio".
3. **Abertura sem ilustração:** a ilustração figurativa foi rejeitada pela dona (geometria abstrata "feia"; foto gerada por IA nunca convincente). O elemento gráfico principal da abertura passa a ser o próprio dado, em duas variantes a decidir: (a) **v3-semilustração** — o gráfico do dado ampliado (funil, proporcional × majoritário) ocupando o espaço da ilustração dentro do painel ink, sem desenho decorativo; (b) **v3-texturadedado** — textura de fundo do painel ink gerada a partir do dado real (trama fina de pontos/barrinhas cuja densidade sugere candidaturas individuais), abstrato mas não decorativo.
4. **Sombra offset dosada:** efeito de recorte colado só no número-manchete e no card do achado principal; barras e tabelas de apoio ficam discretas (borda fina, sem sombra).
5. **Cor com regra semântica fixa:** coral só para lacuna/alerta declarada; solar só como marca-texto da frase-chave do achado; plum é a cor neutra de dado. Nada de cor decorativa fora disso.
6. **Duas velocidades:** tratamento monumental (painel ink full-bleed, tipografia gigante) só na abertura de cada eixo/página (capa de capítulo); o corpo de dado (tabelas por estado/partido etc.) rola em modo consulta sóbrio, mantendo a identidade.
7. **Cada eixo como capítulo:** rotas despublicadas (barreiras, dinheiro etc.) ganham a mesma capa de dossiê, com a lacuna já declarada como manchete de capítulo ("aguardando fonte oficial") no painel ink — estilização da mensagem existente, sem inventar dado.
8. **Acessibilidade:** contraste WCAG AA mínimo em painel ink + creme + marca-texto solar; escala tipográfica responsiva real no mobile (não só redução proporcional).
9. **Transição sutil entre painéis (opcional):** movimento discreto de "virada de capítulo" ao rolar, sempre respeitando `prefers-reduced-motion`.

## Histórico de decisão

- Direção B ("Dossiê") escolhida como base; ajustes v2 combinados (itens 1–9).
- v2: variantes de ilustração (foto documental duotone × formas geométricas) rejeitadas pela dona.
- v3: dado como protagonista (semilustração) × dado como textura de fundo — ainda sem veredito explícito.
- v4 (referência nova descrita pela dona): ela curtiu o estilo geral de duas colunas de referência — tipografia gráfica/pôster em blocos ("MESMAS PERGUNTAS. / NOVAS RESPOSTAS."), estatísticas grandes em fileira, painel de cor cheia "ONDE ELAS DESAPARECEM?" com etapas + mapa do Brasil, grade "Temas em destaque" com ícones simples de linha (gostou deles: plantinha, muro, megafone, pizza), faixa final de CTA com textura de papel rasgado. Rejeitou toda foto/colagem com figura humana (pessoa, rosto, corpo). A mistura das duas colunas é o layout base dos mockups v4; paleta do site (plum, cream, coral, solar, ink) substitui as cores da referência.

## Variantes v4 em decisão (diferem só no topo, onde a referência tinha foto)

1. **v4-icone:** pictograma simples de linha, grande (balança, prédio legislativo, urna), no mesmo estilo dos ícones de "Temas em destaque".
2. **v4-grafico:** o próprio gráfico de dado ampliado (funil, proporcional × majoritário) como protagonista do topo.
3. **v4-textura:** bloco de cor sólida com textura de papel rasgado/colagem, sem foto nem figura dentro — só cor e textura.

## Próximo passo

- v4: **header do v4-grafico confirmado pela dona** (gráfico de dado ampliado no topo).
- Correção pedida e entregue (v4-grafico-v2, `mockups/direcao-b-v4-grafico-v2.png`): a fileira de estatísticas agora são **3 blocos de cor sólida contíguos** (plum → coral → solar, encostados, sem fundo neutro entre eles); no bloco solar, o link "VER TODOS OS DADOS →" em ink dentro do próprio bloco. O bloco solar é exceção deliberada à regra semântica da cor (funciona como estrutura/estado), a regra original segue valendo em título, marca-texto e alerta de lacuna.
- Aguardando aprovação do v4-grafico-v2. Depois: plano de implementação detalhado (tokens, utilitários, componentes, capas para eixos despublicados), sem tocar em dados nem na fotografia TSE, e sem publicar. Mockups em Files em `mockups/` (v2 rejeitados mantidos como registro; v3 e v4 em decisão).

Mockups são ilustrativos: textos e números neles não são dados do projeto.
