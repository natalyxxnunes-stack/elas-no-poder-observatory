# Verificação da atualização do TSE — prestação de contas 2026

**Consulta realizada:** 15/11/2026, 01h45 (Brasília), por GitHub Actions, sem alterar a base do site.

## Fonte e método

- Conjunto oficial: https://dadosabertos.tse.jus.br/pt_BR/dataset/prestacao-de-contas-eleitorais-2026
- Arquivo: https://cdn.tse.jus.br/estatistica/sead/odsele/prestacao_contas/prestacao_de_contas_eleitorais_candidatos_2026.zip
- CSV inspecionado dentro do ZIP: `receitas_candidatos_2026_BRASIL.csv`.
- Verificação: download integral, SHA-256 do ZIP e leitura apenas dos campos `DT_GERACAO` e `HH_GERACAO` da primeira linha de dados, sem registrar dados pessoais.
- Evidência reprodutível: https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43678153098

## Resultado comprovado

| Versão | Data de geração | SHA-256 do ZIP |
| --- | --- | --- |
| Usada nas recontagens publicadas | 04/11/2026, 04:05:12 | `65de2e2708349f619cdf6679571784e7847b500878f828fe0d6ad65351a1fc17` |
| Atual no CDN na consulta de 15/11 | **13/11/2026, 15:07:34** | `40e6cb23a26090411249274d6b474375acbc0b12f126bf35b49150c7a08da0f5` |

O arquivo de 13/11 tem 381.787.972 bytes. O servidor reportou última modificação em 13/11/2026, 18:30:12 UTC.

## Consequência editorial

- A recontagem anterior de **56,1%** (R$ 1.020.050.781,54 para brancas / R$ 1.817.663.647,93 para candidaturas femininas proporcionais) **corresponde à base de 04/11/2026**.
- A correção de **56,2%** para **56,1%** no destaque de `src/data/achados.ts` resolve a inconsistência *dentro dessa base antiga*, **não valida o número para 13/11**.
- **Executado em 15/11:** recontagem dos três conjuntos financeiros e arquivamento dos agregados, hashes, universos e critérios na pasta `docs/auditorias/financiamento-2026-13nov/`, com testes automatizados de coerência.
- O prazo para as contas finais do 2º turno foi 14/11/2026 (TSE). Como o ZIP inspecionado foi gerado em 13/11, **não é possível afirmar que ele já incorpora todas as entregas do prazo final**.
- A branch de teste passou a referenciar os agregados de 13/11/2026 nas três séries financeiras; a versão publicada continua intacta. Não fazer merge até haver conferência do arquivo posterior ao prazo do segundo turno e aprovação editorial.

**Estado atualizado em 15/11/2026:** recontagem de receitas, FEFC e despesas **concluída** e registrada em [Relatório de reconciliação](./auditorias/financiamento-2026-13nov/RELATORIO.md). Ambos os cortes arredondam o percentual das candidatas brancas para **56,1%**, apesar de aumentos nos valores absolutos. Os módulos financeiros foram atualizados somente na branch de teste. **Pendente apenas:** verificar a próxima geração oficial do arquivo financeiro posterior ao prazo do segundo turno (14/11) e obter aprovação editorial antes do merge/publicação.
