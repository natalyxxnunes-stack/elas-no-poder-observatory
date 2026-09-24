# Publicação do eixo Dinheiro — fase 1

## Objetivo
Publicar `/dinheiro` com a fotografia fixa de receitas de campanha fornecida, cobrindo gênero, cor/raça, cargo, partido e UF, sem recalcular dados externos e sem incluir despesas.

## Implementação
1. Criar `src/data/tse-finance-snapshot.ts` com tipos, metadados, filtros, integridade e todos os valores fornecidos para os universos proporcional e majoritário.
2. Adicionar ao formatador brasileiro uma função determinística para reais.
3. Atualizar a matriz editorial para marcar Dinheiro como publicado, com aviso de que a prestação de contas está em andamento.
4. Criar componentes financeiros focados para:
   - cobertura, totais e medianas por universo;
   - participação das mulheres na receita por cargo;
   - distribuição da receita de mulheres por cor/raça;
   - cinco maiores partidos por arrecadação no proporcional;
   - valores por UF no proporcional.
5. Ativar `DinheiroPage`, reorganizar o texto em achado → leitura → cautela, mostrar denominadores e manter titularidade/suplência e competitividade como lacunas declaradas.
6. Atualizar metadados da rota e o card da home para refletir o eixo publicado.
7. Validar tipos e, no navegador, a abertura, os números principais e o card da home.

## Limites
- Nenhum dado será recalculado, estimado ou buscado externamente.
- Não serão publicados dados de despesa nem de doador originário.
- A fotografia ficará cravada no código e identificada como base parcial de 23/09/2026.
