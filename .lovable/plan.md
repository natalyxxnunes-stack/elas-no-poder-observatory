# Redesign editorial da página inicial

## Objetivo

Reconstruir exclusivamente a página inicial como uma reprodução fiel da composição da referência anexada: veículo profissional de jornalismo de dados, com contraste alto, grandes campos de cor, tipografia editorial e o dado funcionando como imagem. Preservar integralmente textos factuais, números, fontes, cálculos, consultas, links, rotas e páginas internas.

## Estrutura visual

1. **Cabeçalho compacto:** manter a marca original; navegação horizontal discreta; busca por ícone; apoio ao projeto como ação compacta. No celular, manter o menu existente e a hierarquia editorial.
2. **Abertura em duas áreas:** campo plum profundo à esquerda (cerca de 54%) e painel paper à direita. A headline terá quatro linhas, com “onde elas desaparecem?” em coral e itálico. CTAs baixos, sem sombra e sem aparência de aplicativo.
3. **Corte arquitetônico sem imagem:** criar entre as duas áreas uma composição geométrica própria em CSS, sem pessoas, fotografia falsa ou geração por IA. Sua função será apenas marcar a divisão vertical, como na referência.
4. **Dado principal e mapa:** usar o percentual proporcional, numerador, denominador, data e amplitude por UF já derivados do snapshot vigente. A visualização territorial será uma silhueta vetorial limpa do Brasil, colorida por intensidade a partir dos 27 valores reais, sem moldura de card.
5. **Índice do funil:** faixa contínua de cinco etapas, separadas por fios finos, com número, título, pergunta existente e link para o eixo correspondente.
6. **Destaque do funil:** composição única em três colunas — explicação, funil gráfico e texto editorial — sem cards. O visual deixa explícito que as etapas têm universos próprios e não representa uma falsa conversão numérica.
7. **Investigações:** três colunas editoriais para Histórico, Direitos e Dinheiro, usando somente títulos e descrições já existentes. Dinheiro mantém sua lacuna declarada. Um bloco solar contém uma frase factual já publicada no projeto.
8. **Faixa sobre o projeto:** banda full-bleed em ink/plum, com texto existente e links reais para Método, base vigente, glossário e downloads.
9. **Rodapé:** preservar o rodapé funcional, ajustando apenas sua relação visual com a nova faixa final quando necessário.

## Conteúdo atual preservado

- Os blocos detalhados de dados, histórico, raça, regra 30%–70%, método e continuidade permanecem na página após a abertura editorial redesenhada.
- O “Diário da entrada” não será removido; seus dados continuam visíveis, porém integrados ao ritmo editorial sem card flutuante.
- Nenhum dado será criado para reproduzir elementos da referência. Onde a eleição de 2026 ainda não produziu resultado, a lacuna continuará explícita.

## Direção de arte

- Usar apenas os tokens atuais: plum, plum-soft, coral, solar, paper/cream, ink e forest quando já codifica dado.
- Grandes áreas estruturais em plum/ink; paper como respiro, não como cor dominante.
- Fraunces nas manchetes; Work Sans no corpo; IBM Plex Mono nos metadados; Archivo nos números quando já fizer sentido.
- Sem gradientes, imagens de IA, sombras deslocadas, excesso de arredondamento ou coleção de cards.
- Espaçamento editorial amplo e grid consistente de 12 colunas no desktop.

## Implementação técnica

- Extrair os novos blocos visuais da home em componentes locais focados, sem duplicar componentes de dados nem alterar suas regras.
- Reaproveitar o snapshot e os cálculos atuais; o mapa e o dado principal recebem valores por propriedades.
- Adicionar somente utilitários de apresentação necessários aos tokens globais, mantendo Tailwind v4 e acessibilidade AA.
- Preservar a ordem móvel: headline, dado principal, mapa, funil e investigações.

## Validação

- Comparar lado a lado a captura final em desktop com a referência anexada, verificando proporções, hierarquia, distribuição de cor e ritmo vertical.
- Conferir também tablet e celular para evitar sobreposição, corte de texto ou sequência de cards.
- Rodar o typecheck e validar resposta 200 da home, links principais, console e ausência de regressões nas páginas internas.
