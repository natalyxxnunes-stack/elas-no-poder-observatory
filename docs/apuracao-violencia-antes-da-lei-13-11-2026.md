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

---

## Rodada 2 (13/11/2026, madrugada)

### 1. Leitura cerrada dos 102 discursos de 2015 a 03/08/2021
Regra de categorias fixada antes da leitura (A sofrida pela própria; B contra outra mulher identificada; C mulheres em geral, projeto, dado; D sem recorte de gênero).

| Ano | Discursos de deputadas | Com recorte de gênero (A+B+C) | Dos quais A | Por mil discursos |
|---|---|---|---|---|
| 2015 | 2.158 | 0 | 0 | 0,0 |
| 2016 | 2.330 | 0 | 0 | 0,0 |
| 2017 | 3.196 | 1 | 0 | 0,3 |
| 2018 | 1.904 | 2 | 0 | 1,1 |
| 2019 | 3.098 | 3 | 0 | 1,0 |
| 2020 | 3.414 | 54 | 2 | 15,8 |
| 2021 (até 03/08) | 2.978 | 22 | 5 | 7,4 |

Totais: A 7, B 32, C 43, D 20. 82 discursos com recorte de gênero, de 27 deputadas.
- De 2015 a 2019: 6 discursos com recorte de gênero em 12.686. Nenhuma deputada usou a expressão para a violência que ela mesma sofreu antes de dezembro de 2020.
- 2018: Cristiane Brasil anuncia projeto para tornar crime a violência política contra mulheres (06/03/2018, oito dias antes do assassinato de Marielle Franco); Professora Dorinha chama o assassinato de Marielle de "feminicídio e violência política contra a mulher" (15/03/2018).
- Ceci Cunha (deputada federal assassinada em 1998) só aparece como vítima de violência política nos discursos de deputadas a partir de dezembro de 2019 (dado coletado desde 2015).
- Casos citados em B: Marielle Franco, Ceci Cunha, Manuela d'Ávila, Dilma Rousseff, Isa Penna, Talíria Petrone, Duda Salabert, Luisa Canziani, Eliana Gonzaga, Ana Lúcia Martins, Regina Duarte (Iracema Portella, 11/02/2020).
- Frase-chave (Jandira Feghali, 13/04/2021 e 23/06/2021): a violência política de gênero "com este nome, é um conceito novo, mas essas violências são antigas".
- Partido na data (discursos): PT 22, PCdoB 19, PSOL 13, PP 8, DEM 6, PSB 4, outros 10. Cor/raça (TSE, candidatura da legislatura): 21 brancas, 3 pretas, 2 pardas, 1 indígena.

### 2. Mesma regra de 04/08/2021 a 13/11/2026
167 deputadas (legislaturas 56 e 57), 15.794 discursos únicos (arquivo bruto: 6ed3d7f129fd214a). 166 com a expressão. Classificação AUTOMÁTICA de gênero (termos de gênero a até 300 caracteres da expressão), validada contra a leitura manual da rodada 1: pegou todos os 82 de gênero, mas classificou como gênero 12 dos 20 sem recorte (precisão de 87%). Leitura manual dos 166 pendente.

| Ano | Discursos | Com gênero (automático) | Por mil |
|---|---|---|---|
| 2021 (desde 04/08) | 2.025 | 5 | 2,5 |
| 2022 | 3.274 | 31 | 9,5 |
| 2023 | 3.165 | 39 | 12,3 |
| 2024 | 2.584 | 33 | 12,8 |
| 2025 | 3.159 | 31 | 9,8 |
| 2026 (até 13/11) | 1.587 | 20 | 12,6 |

- 159 discursos de 49 deputadas. Partido na data: PT 75, PL 20, PSOL 18, PCdoB 8, Republicanos 6, PSD 6, União 5, outros 21. Cor/raça: 30 brancas, 10 pretas, 6 pardas, 3 indígenas.
- Achado provável (a confirmar na leitura): depois da lei, a expressão deixa de ser só da esquerda. Deputadas do PL passam a usá-la para nomear ataques que dizem ter sofrido (Carla Zambelli, 12/04/2023; Caroline de Toni, 04/10/2023; Julia Zanatta, 21/03/2023 e 12/06/2024; Silvia Waiãpi, 11/04/2023), inclusive contra outra deputada mulher (Zanatta sobre Erika Hilton). Soraya Santos (PL), à frente da Procuradoria da Mulher, usa o termo de forma institucional em pelo menos 10 discursos. Cuidado: falas com nome entram só literais, com data e link; o trecho de Zanatta sobre Erika Hilton tem conteúdo transfóbico e não deve ser reproduzido como manchete.

### 3. Dados da Justiça Global e Terra de Direitos sem pedir
- Os relatórios são públicos (1ª, 2ª e 3ª edições), com números agregados e anexo de "casos ilustrativos". A base completa de casos não está publicada: nenhum link, anexo de dados ou menção a "disponível mediante solicitação" (2ª edição, metodologia, pp. 13 a 15).
- O que dá para usar sem pedir, com crédito: agregados publicados. 1ª edição (2016 a 2020), via infográfico oficial da Câmara: 9 mulheres assassinadas ou vítimas de atentado; mulheres sofreram 31% das ameaças. 2ª edição: mulheres cisgênero em 35% dos casos com 16% das cadeiras disputadas (pp. 74 e 75). Por ano e gênero para 2018, só com a base, que não é pública.
- A 1ª edição em PDF não abriu deste ambiente; conferir a página dela antes de citar número dela diretamente.

### Títulos em discussão
Ver resposta à editora em 13/11/2026.

---

## Rodada 3 (13/11/2026): como cada uma usa a palavra

Régua fixada antes da leitura em `docs/regua-usos-violencia-politica-13-11-2026.md`. Leitura manual dos 166 discursos pós-lei (04/08/2021 a 13/11/2026), trecho de cerca de 700 caracteres em torno da expressão. Uma leitora só (Claude); falta a segunda leitura da editora numa amostra, para medir concordância. A planilha com a classificação por discurso fica fora do repositório público: rótulo de uso colado a nome é interpretação sobre pessoa nomeada e, pela regra de 13/11, pede posicionamento antes de publicar.

Resultado: 160 discursos com recorte de gênero, de 48 deputadas; 6 sem recorte.

| Partido na data | Discursos | Testemunho | Solidariedade | Institucional | Geral | Acusa adversário identificado | Acusada é mulher | Responde a crítica (inversão) |
|---|---|---|---|---|---|---|---|---|
| PT | 75 | 11 | 23 | 24 | 17 | 9 | 0 | 1 |
| PSOL | 19 | 5 | 7 | 4 | 3 | 6 | 0 | 0 |
| PCdoB | 9 | 0 | 4 | 4 | 1 | 0 | 0 | 0 |
| PL | 20 | 5 | 3 | 10 | 2 | 7 | 3 | 3 |
| Outros 10 partidos | 37 | 8 | 3 | 13 | 13 | 4 | 0 | 0 |

Leituras (bases pequenas: contar, não percentualizar):
- O PL tem dois usos que quase não se tocam. Soraya Santos, como procuradora da mulher, responde por 11 dos 20 discursos, todos institucionais ou gerais. Nos outros 9, de 7 deputadas, 7 acusam um adversário identificado.
- Acusar adversário com a expressão é prática de vários partidos: PSOL 6 de 19, PT 9 de 75. Os alvos nesses partidos são homens, o governo Bolsonaro, a CPI do MST, milícias.
- Dois usos aparecem só em discursos de deputadas do PL: apontar outra mulher como autora da violência (3 discursos, 2 deputadas, alvos Gleisi Hoffmann, ministras presentes numa audiência e Erika Hilton) e usar a expressão para responder a uma crítica feita contra a própria oradora (3 discursos). Fora do PL, um caso de resposta a crítica: deputada do PT que pede desculpas por um gesto e, no mesmo discurso, fala da violência que enfrenta.
- Antes da lei (82 discursos com recorte de gênero), 4 acusam adversário identificado, todos de deputadas de PSOL e PT, e nenhum aponta mulher como autora nem usa a expressão para responder a crítica.
- Hipótese de trabalho para a reportagem: a lei deu nome à violência e, com o nome, criou um recurso de disputa. Uma parte das deputadas passou a usar o nome também para se defender de críticas e para acusar outras mulheres. Precisa da segunda leitura, do discurso inteiro (não só do trecho) e de comparação com falas fora do plenário antes de virar achado.

Cuidados de publicação:
- Nenhuma deputada é rotulada pelo uso; a contagem é por discurso e agregada.
- Falas citadas entram literais, com data e link para a taquigrafia.
- O discurso de 12/06/2024 que ataca a identidade de Erika Hilton não é reproduzido.
