# Quem são elas? — auditoria de acessibilidade, segundo lote (PR #30)

**Data:** 16/11/2026. **Branch:** `revista-acessibilidade-lote2-16nov2026`; base direta: PR #29 (`revista-acessibilidade-lote1-16nov2026`). **Status:** prévia pública no GitHub, sem merge na main e sem deploy.

## Universo e método da verificação

**Sete novos modelos de conteúdo:** índice de Achados (`/achados`), Achado individual (`/achados/quanto-mais-alto-mais-brancas`), Busca (`/busca`), Calendário (`/calendario`), Coleção Antigênero no Poder (`/colecoes/antigenero-no-poder`), Investigações (`/investigacoes`) e Barreiras (`/barreiras`). **Duas variações:** segundo Achado (`/achados/pretas-sozinhas`) e Busca com termo (`/busca?q=igualdade`).

**Total: 9 URLs × 3 larguras = 27 verificações:** 1440 × 900 px, 390 × 844 px e reflow 320 × 720 px CSS. O workflow `.github/workflows/qa-acessibilidade-lote2-16nov.yml` compila o TypeScript e a versão HostGator, injeta axe-core 4.10.3 (tags WCAG 2 A/AA, 2.1 AA, 2.2 AA), registra as 12 primeiras paradas por Tab, títulos, imagens e legendas, erros JS, HTTP e largura da página, e arquiva 18 capturas de página inteira em desktop/celular. Esses exames cobrem regras automáticas selecionadas, não toda a acessibilidade.

## Diagnóstico inicial antes das correções

**[Execução inicial #43936946379](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43936946379)**: 27 verificações, **11 grupos de violações** (a mesma falha se repete entre larguras): nove grupos de contraste e dois de tamanho de alvo. Nenhum erro de JavaScript ou transbordamento horizontal foi registrado.

| Modelo | Falha comprovada | Diagnóstico e ajuste preciso |
|---|---|---|
| Busca, com e sem termo | Contraste de **4,32:1** de texto 15 px sobre coral, aquém de 4,5:1 | Troca de `text-paper/90` por `text-paper` no texto do capítulo coral; fundo, fonte e conteúdo mantidos |
| Investigações | Contraste de **4,02:1** do contador 13 px sobre coral | Remoção da opacidade `opacity-85` no contador do componente `InvestigationIndex`; hierarquia e cores mantidas |
| Achado individual, celular e reflow | Link “Como contamos: o método” com altura de **22,5 px**, abaixo dos 24 px do teste | Alvo com `block min-h-11 py-2`; preservada a quebra de linha original dos links e o texto |

O segundo Achado e as demais páginas do lote não apresentaram essas violações nas regras selecionadas.

**Arquivos de código alterados:** `src/routes/busca.tsx`, `src/components/editorial/InvestigationIndex.tsx`, `src/routes/achados.$id.tsx`. Nenhuma alteração no CSS global, homepage, logo, bases eleitorais, fotografias, imagens documentais ou gráficos.

## Validação posterior e teste de interação

**[Execução de correção #43937543405](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43937543405)**: 27 verificações, **zero violações nas regras axe selecionadas, zero erros de execução**.

**[Execução complementar #43938114266](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43938114266)**: 27 verificações com zero violações automáticas e zero erros, além de **6 testes de interação aprovados** (Busca, abertura de caderno `details` via Enter e navegação por âncoras dos Achados, cada um testado em desktop e celular). A Busca mantém a consulta no URL e atualiza a contagem de resultados; o `summary` recebeu foco e abriu/fechou por Enter; as âncoras dos temas apontaram para destinos existentes.

**Capturas e arquivos de validação:** [artefato final #14262451215](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43938114266/artifacts/14262451215), com `diagnostico.json`, `resumo.json`, `interacoes.json` e **18 screenshots integrais**. Capturas antes/depois foram inspecionadas também por comparação de dimensões e diferenças de pixels. Achados, Calendário, Coleção e Barreiras não apresentaram alterações nas capturas; Busca e Investigações mudaram em regiões textuais; a ficha de Achado no celular ganhou **21 px de altura**, por conta da ampliação do link. A composição de fundo, o ritmo editorial e os elementos gráficos foram preservados.

## Fotografias, documentos e representação de dados

O lote não exigiu inserir novas fotografias: Achados são baseados em indicadores e referências; Busca é consulta; Calendário organiza datas e fontes; a Coleção utiliza uma figura de distribuição com descrição textual; Investigações é índice editorial; Barreiras reúne links para legislação, painel TSE/MPF e representações, sem usar fotografia genérica de vítimas nem simular documentos. Nenhum `img` apareceu nas nove páginas auditadas; isso **não indica falta automática de imagem**, conforme as decisões prévias em `docs/matriz-fotografias-documentos-graficos-16nov2026.md`.

A figura de quadrados da Coleção informa a distribuição também em `aria-label` e legenda textual. O teste automático não equivale a verificação de compreensão com leitores de tela. A auditoria não recontou indicadores de violência, resultados eleitorais, discursos ou votações; não certifica dados jornalísticos. Os documentos originais foram mantidos como links, sem fac-símiles novos e sem ampliar a exposição de dados pessoais.

## Limites, pendências e governança

- Sem certificação WCAG 2.2 AA global; faltam NVDA/VoiceOver, zoom **real** de 200%, espaçamento personalizado, testes de teclado em todos os fluxos e avaliação humana.
- Os dois Achados testados e as duas condições da Busca são amostras; todas as variantes e mudanças de dados ainda podem exigir verificação própria.
- Outros **15 modelos** dos 35 modelos de conteúdo permanecem sem esta auditoria específica, depois da rodada inicial (6), do PR #29 (7) e do PR #30 (7). Homepage é controle e `condicoes` é redirecionamento; esses não compõem o denominador de 35.
- Os limites de direitos de reproduções dos PRs #27–#29 seguem vigentes; este lote não resolve nem altera autorizações jurídicas ou editoriais.
- **Não mesclar, não publicar, não usar créditos do Lovable.** A branch é pública no GitHub; rascunho não significa sigilo.
