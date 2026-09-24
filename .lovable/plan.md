# Lote H — resultado de 2º turno na série histórica

## Implementação
1. Guardar separadamente as linhas de `NR_TURNO = 2`, sem alterar candidaturas, eleitos ou deduplicação do 1º turno.
2. Após ler todos os CSVs, incorporar somente eleitos majoritários do 2º turno cuja candidatura já exista no universo contado do 1º turno.
3. Atualizar versão, filtros, fórmula, notas e texto da página histórica conforme o pedido fechado.
4. Rodar a checagem de tipos e a coleta existente para 2014, 2018 e 2022.
5. Ler as três novas fotografias, conferir todos os totais proporcionais e as cadeiras majoritárias por cargo; se qualquer trava falhar, marcar as três novas como `invalido`.

## Verificação e entrega
- Confirmar que candidaturas e eleitos proporcionais permanecem exatamente nos valores de referência.
- Entregar as tabelas completas de candidaturas proporcionais, eleitos proporcionais e eleitos majoritários por cargo, além de `secondRoundElected` por ano.
- Listar todos os arquivos alterados.

## Limites
- Nenhum número externo será recalculado ou preenchido por estimativa.
- A lacuna conhecida de Maranhão em 2022 será mantida explícita.
- A Home, os snapshots de 2026, `FunnelStages2026` e `RaceBreakdown` não serão alterados.
