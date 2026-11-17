# Auditoria das bases TSE 2026 — rodada de 17/11/2026

**Status: PARCIAL. Nenhuma recontagem com os ZIPs oficiais posteriores a 16/11 foi executada. Nenhum dado publicado deve ser substituído por esta nota.**

## Fontes oficiais
- Candidaturas: https://dadosabertos.tse.jus.br/dataset/candidatos-2026
- Prestação de contas: https://dadosabertos.tse.jus.br/pt_BR/dataset/prestacao-de-contas-eleitorais-2026
- Prazo do segundo turno: **16/11/2026**, segundo Portaria TSE nº 741/2026. https://www.tse.jus.br/comunicacao/noticias/2026/Novembro/prazo-para-prestar-contas-relativas-ao-2-turno-e-adiado-para-16-de-novembro

## Resultado verificável com a fotografia já versionada de 15/11
- Receitas: 269.003 linhas originais; 982 duplicatas integrais eliminadas; 268.021 linhas remanescentes.
- Titulares com receita: 19.660, das quais 19.363 têm situação FINAL, 195 PARCIAL e 102 RELATÓRIO FINANCEIRO no agregado arquivado (FINAL não significa contas aprovadas).
- Candidaturas titulares: 20.065, sendo 7.060 de mulheres.
- Receitas declaradas: R$ 7.020.242.106,44, das quais R$ 2.038.152.482,43 para mulheres. Soma dos universos proporcional e majoritário.
- FEFC recebido: R$ 5.031.966.889,00, dos quais R$ 1.672.035.872,98 para mulheres.
- No universo proporcional, brancas receberam 56,1036% das **receitas declaradas a mulheres**: 56,1% após arredondamento.
- Total racial do FEFC (titulares): 20.065 candidaturas, 20.064 identificadas entre BRANCA/PARDA/PRETA/AMARELA/INDÍGENA. A diferença de uma candidatura está no PSDB; nenhuma diferença monetária do FEFC.
- Diferença de saldo racial entre 27/10 e 15/11 para mulheres proporcionais: PRETA 1.197→1.196, PARDA 2.379→2.380, mantendo 6.953 mulheres. É necessária comparação por SQ_CANDIDATO para determinar os registros concretos alterados.

**Datas/hashes acima são relativos apenas aos arquivos antigos versionados; esta rodada não obteve ZIP novo.**

## Bloqueio operacional registrado
O recurso HTML do TSE não expõe a data atual de geração; o portal informa que está contida no arquivo. A tentativa de baixar ZIP oficial pela web e pelo ambiente de processamento falhou (ferramenta web não expõe binário ZIP; contêiner sem resolução DNS do CDN). Não declarar dados atualizados sem nova extração e SHA-256 calculado.

## Para concluir a Prioridade 1
- [ ] Obter os ZIPs oficiais `consulta_cand_2026.zip` e `prestacao_de_contas_eleitorais_candidatos_2026.zip` (gerados após o prazo de 16/11).
- [ ] Computar SHA-256 dos ZIPs e CSVs Brasil, registrar data de geração interna.
- [ ] Recontar candidaturas/resultados e receitas, FEFC, despesas contratadas/pagas por gênero, raça separada, UF, cargo e partido.
- [ ] Comparar com fotografia 15/11 e investigar mudanças por SQ_CANDIDATO, sem divulgar identificadores sensíveis.
- [ ] Validar as diferenças e registrar aprovação editorial antes de alterar indicadores do site.

**Repositório em produção (`main`) preservado.**