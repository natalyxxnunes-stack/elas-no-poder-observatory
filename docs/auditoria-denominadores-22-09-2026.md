# Auditoria de denominadores — fotografia de 22/09/2026

Segunda conferência independente do pipeline, feita a pedido da editora, a partir do arquivo oficial baixado por ela e fornecido para reprocessamento.

## Verificação de integridade

Arquivo: `consulta_cand_2026_BRASIL.csv`, extraído de `consulta_cand_2026.zip` (TSE / Dados Abertos / Candidatos 2026).

SHA-256 do CSV: `1e08c5fa76d1af94723dbeffb6c1c5da7db5ce069732a05a5e2c7fdef6505c13` — **idêntico** ao hash cravado em `src/data/tse-snapshot.ts` para a fotografia vigente. Confirma que o arquivo reprocessado é byte a byte o mesmo que gerou a fotografia publicada.

## Metodologia da recontagem

Recontagem independente em Python (pandas), replicando a regra de `src/lib/tse/compute.ts`: deduplicação por `SQ_CANDIDATO` (0 duplicatas encontradas em 20.985 linhas), classificação de universo por `DS_CARGO` (proporcional: Deputado Federal, Estadual, Distrital; majoritário: Presidente, Governador, Senador), contagem de `DS_GENERO` = FEMININO, distribuição de `DS_COR_RACA` sem agregação.

## Resultado

**Proporcional:** 19.527 candidaturas, 6.950 femininas (35,59%). Cor/raça das candidaturas femininas: branca 3.252, parda 2.378, preta 1.197, indígena 82, amarela 41. As 27 UFs foram conferidas uma a uma (total e feminino) e batem com `dimensions.totalByUf`/`feminineByUf` publicados.

**Majoritário:** 534 candidaturas, 107 femininas (20,04%). Cor/raça: branca 65, parda 24, preta 17, amarela 1.

**Fora dos dois universos:** 924 registros — 2º suplente (350), 1º suplente (349), vice-governador (211), vice-presidente (14). Consistente com a distinção já documentada em `/quem-sao-elas` entre candidaturas de vice e de titular.

## Conclusão

Nenhuma divergência encontrada entre o pipeline publicado e a recontagem independente. Hash idêntico, todos os totais, proporções e cortes por raça e UF batem exatamente com a fotografia vigente.
