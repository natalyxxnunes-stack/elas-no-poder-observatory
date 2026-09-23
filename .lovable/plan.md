# Extensão do pipeline por cargo

## Implementação
1. Ampliar a contagem do parser com total e candidaturas de mulheres por `DS_CARGO` dentro de cada universo.
2. Transportar essas dimensões e `outOfUniverse` pelos tipos e pela fotografia fixa auditada de 22/09/2026.
3. Substituir os números fixos do gráfico e da tabela de Cargos por valores derivados da fotografia, com lacuna explícita se faltar qualquer célula.
4. Passar a fotografia carregada pela rota aos dois componentes, sem mudar o visual ou os textos editoriais.

## Verificação
- Rodar o typecheck.
- Inspecionar o diff restrito aos seis arquivos solicitados.
- Abrir `/quem-sao-elas` e confirmar os dez percentuais esperados: 14,3%; 42,9%; 17,4%; 41,7%; 21,9%; 30,4%; 30,6%; 36,8%; 35,1%; 34,8%.
- Parar e informar antes de qualquer publicação se houver divergência. Nenhuma publicação será feita.
