# Apuração: violência política de gênero antes da lei (13/11/2026)

Status: piloto. Nada daqui vai ao ar antes da leitura cerrada e da conferência da editora.

## Pergunta
A Lei 14.192 (agosto de 2021) criou o crime. A violência já existia. O que o registro público mostra sobre ela antes da lei, e o que o QSE pode acrescentar sem repetir quem já pesquisou?

## Quem já pesquisou (crédito obrigatório)
- Justiça Global e Terra de Direitos, "Violência política e eleitoral no Brasil": 1ª edição (2016 a 1º/09/2020, 327 casos noticiados) e 2ª edição (02/09/2020 a 31/10/2022, 542 casos, 497 vítimas). Na 2ª edição, mulheres cisgênero aparecem em 35% dos casos com 16% das cadeiras em disputa em 2018 e 2020; somadas mulheres trans e travestis, 41,3% (pp. 74 e 75). O relatório agrega pretos e pardos como negros: se citado, a soma é deles e vai declarada.
- Instituto Marielle Franco (com Justiça Global e Terra de Direitos): "A violência política contra mulheres negras: eleições 2020" (142 candidatas) e "Violência política de gênero e raça no Brasil 2021".
- MonitorA (AzMina, InternetLab, Núcleo): violência online contra candidatas, edições 2020, 2022 e 2024.
- Instituto Alziras: Monitor da Violência Política de Gênero e Raça (ações penais desde a lei).
- Gênero e Número: não encontramos estudo da GN sobre violência política antes da lei. A sobreposição conhecida é a comparação de eleitas pretas e pardas (reportagem de 20/11, com crédito) e o Radar Antigênero (discurso). Conferir o arquivo da GN de novo antes de publicar.

## O que só o QSE tem
Discursos de plenário de todas as deputadas, com data, cor/raça e partido na data, lidos com regra fixada antes.

## Piloto
- Fonte: API de Dados Abertos da Câmara, discursos das 122 deputadas das legislaturas 55 e 56, de 01/01/2015 a 03/08/2021 (véspera da lei). Coleta em 13/11/2026, por ano. 20.017 registros; SHA-256 (16 primeiros) do arquivo bruto: 4ece90a5f2a63fa4. Arquivo fora do repositório.
- Regra única, fixada antes da leitura: discurso cuja transcrição contém a expressão "violência política" (sem acento e sem caixa).
- Resultado bruto:

| Ano | Discursos | Com "violência política" | Deputadas |
|---|---|---|---|
| 2015 | 2.158 | 0 | 0 |
| 2016 | 2.330 | 0 | 0 |
| 2017 | 3.196 | 4 | 4 |
| 2018 | 1.904 | 7 | 5 |
| 2019 | 3.098 | 7 | 5 |
| 2020 | 3.414 | 56 | 22 |
| 2021 (até 03/08) | 2.978 | 28 | 12 |

Total: 102 discursos de 31 deputadas.

- Leitura possível (hipótese, não achado): a expressão quase não existia no plenário antes de 2017 e explode em 2020, ano da eleição municipal pós-Marielle e da tramitação do projeto que virou a lei.

## Limitações
- A expressão pode se referir a violência política em geral, sem gênero. Precisa de leitura cerrada.
- A API devolve o partido atual, não o da data: o partido na data vem do registro de cada legislatura.
- Quem fala de violência política sem usar a expressão fica fora; a regra é estreita de propósito, para ser verificável.
- Plenário apenas; comissões fora.

## Próximos passos
1. Leitura cerrada dos 102 discursos com categorias fixadas antes: (a) relata violência sofrida pela própria; (b) denuncia caso de outra mulher; (c) trata de projeto de lei ou do tema em geral; (d) violência política sem recorte de gênero.
2. Partido na data e cor/raça (TSE) de cada deputada.
3. Mesma regra para 2021 a 2026, para comparar antes e depois da lei.
4. Pedido de dados (com crédito) à Justiça Global e à Terra de Direitos sobre casos com vítimas mulheres em 2018.
5. Pauta possível: "Antes de ter nome", para a série Memória ou para 25/11 de 2027.
