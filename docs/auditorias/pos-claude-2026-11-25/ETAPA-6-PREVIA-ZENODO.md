# Etapa 6 — prévia restrita do acervo Zenodo
Data de preparação: 25/11/2026. Versão proposta 1.0.0. Não é autorização de depósito.

O pacote para revisão editorial foi gerado fora do repositório, em diretório isolado, por lista positiva. Título proposto: Quem são elas? — Financiamento eleitoral de 2026: indicadores nacionais e metodologia. Tipo proposto: Dataset.

Arquivo: Quem_sao_elas_Zenodo_previa_1.0.0.zip. SHA-256: 7293017a7d4d39efdf831fd370e33fffc25ef2a0d18883b4063ea631480580aa. 9 arquivos de texto, sem diretórios internos, anexos ou metadados pessoais de arquivo.
 
| Arquivo | SHA-256 |
| --- | --- |
| README.md | 0bb4f09e830a78e2095ceec18d7e05a346e8050929fde723dce43a7a708f4e04 |
| METODOLOGIA.md | 71c27026af9a391cb1abb81d116844be492028f16f5b9a30725d6594d5dee7e7 |
| DICIONARIO.md | 6ed25f8ed946fc093aa68ea29a91d7169900dda0a89afcd16e93ecc965e45ffe |
| receitas-nacionais-2026.csv | 684c192944eec9e0255bd77e2e45453abe16a6c9e1ff3818f060593e5e3b280d |
| medianas-proporcionais-2026.csv | d6031b9165e9d8dbdae4c52aaaf384e9eed8f103f9106b35d95f6a2e383d32c5 |
| gerar_agregados.py | 70bc966df51c6c200a8369bc36a1a3d43044126a1c1566c619f462d5d84e0ef5 |
| PROVENIENCIA.json | a0b7cad3596a5827499f5ce0de33dbf4be235a9e61b97081409bd258e8d7f9ce |
| VERSAO.md | 48ebe56fcfaf26bbc02880e35991d010a2cd47c25fc8ee10f369b45c0d36679d |

SHA256SUMS.txt contém os oito hashes acima. O ZIP foi reaberto e os bytes de todos os membros conferidos. O roteiro de metadados para aprovação é separado e não integra o ZIP.

## Seleção e verificações
- Um registro de totais nacionais, seis cargos titulares; cinco linhas de medianas proporcionais (mulheres, homens, mulheres brancas, pardas e pretas). Não incluir cruzamentos partidários ou estaduais, resultados eleitorais ou disputas majoritárias separadas.
- Para esta prévia, adotar mínimo conservador de 100 candidaturas com receita positiva por grupo e arredondamento de medianas ao múltiplo de R$ 1.000 mais próximo. Grupos indígenas e amarelos não entram nas medianas desta versão por esse critério, não foram agregados a outras categorias nem retirados do site. Não se declara anonimização absoluta.
- Os dois CSVs de entrada foram reconstruídos a partir do artefato 15064109761, com hash ZIP confirmado, e seus bytes coincidiram com os hashes do manifesto da versão integrada 8cabe11. A seleção foi reproduzida duas vezes com saídas idênticas. O script auxiliar lê exclusivamente os dois agregados com hashes fixos, não microdados.
- Conferidos conteúdo textual, cabeçalhos, linhas e ausência de arquivos extras, contatos e padrões de CPF. Apenas a identificação profissional proposta da autora consta da documentação; não há registros de pessoas pesquisadas. Documentação redigida para revisão editorial, sem aprovação autoral final.
- Não houve nova leitura dos ZIPs brutos; reprodução exata futura a partir do TSE depende da disponibilidade do corte original. Referências e hashes preservados. 
- A homologação consolidada 45709923633 foi aprovada nos testes automatizados; ressalvas da matriz anterior continuam válidas. A main e o site público não foram alterados.

## Antes de publicar
Aprovação do conteúdo, autoria, metadados, licença aplicável e escopo pela responsável editorial; eliminar marcas de prévia e atualizar citação e manifesto; reservar DOI apenas em rascunho real se necessário. Não há DOI reservado nem upload ao Zenodo. Não publicar o roteiro de metadados, arquivos de entrada, artefato original, repositório completo ou materiais de terceiros. Não incluir e-mail pessoal. A proposta de CC BY 4.0 é condicionada à aprovação e aos direitos efetivos.
