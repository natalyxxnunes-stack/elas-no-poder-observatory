# Reforço visual/textual da metáfora do funil em /funil

## Contexto
A página /funil já explica, no ContextBox ("O funil é uma fotografia, etapa por etapa"), que as etapas não são o rastro das mesmas pessoas. Falta um reforço curto e direto, colado à visualização do funil, no espírito de: "O tamanho de cada etapa não representa as mesmas pessoas. Representa universos diferentes da disputa."

## O que mudar

### 1. Legenda de figura dentro de `FunnelStages2026`
Arquivo: `src/components/funnel/FunnelStages2026.tsx`

- Inserir, **acima do `<ol>` de etapas** (dentro do retorno do componente, quando `snapshot` está disponível), uma legenda curta de figura:
  - Linha de marca estilo `poster-eyebrow` (font-mono, maiúsculo, tracking), com o rótulo "leitura do funil".
  - Abaixo dela, em uma ou duas linhas curtas (font-display, tom editorial, sem parágrafo corrido):
    "O tamanho de cada etapa não representa as mesmas pessoas. Representa universos diferentes da disputa."
- Envelopar legenda + `<ol>` num fragmento para manter o espaçamento atual do `<ol>`.
- **Não aparece** quando `snapshot` é null (o componente mostra apenas a GapNote de dados indisponíveis).
- Sem números, sem dado novo, sem cálculo — somente texto de apresentação.

### 2. Nada mais muda
- `funil.tsx` não é alterado (o ContextBox e os textos existentes ficam intactos).
- Nenhuma outra página, rota, dado ou estilo global é tocado.

## Verificação
- Typecheck (`bunx tsgo --noEmit`).
- Rota /funil respondendo 200.
- Screenshot desktop confirmando a legenda visível acima do primeiro degrau, sem quebrar o espaçamento do SectionBlock.
