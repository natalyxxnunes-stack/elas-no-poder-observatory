/** base-publica — manifesto dos CSVs de public/dados. GERADO por scripts/base-publica/gerar.ts; não editar à mão. */
export type ArquivoBase = { arquivo: string; titulo: string; descricao: string; fonte: string; linhas: number; colunas: string[]; bytes: number; sha256: string };
export const BASE_PUBLICA_GERADA_EM = "25/11/2026";
export const BASE_PUBLICA: readonly ArquivoBase[] = [
 {
  "arquivo": "eleitas-2026.csv",
  "titulo": "As eleitas de 2026",
  "descricao": "Uma linha por mulher eleita em 2026 (deputada federal, estadual e distrital, senadora e governadora), com o registro no TSE e a trajetória declarada.",
  "fonte": "TSE, Candidatos 2026, base de 02/11/2026 08:30:34 (SHA-256 0e44c739c75fe3c6e5fa306de797a8fdba81342ae464abc0e4ac79d07570a83f); TSE, Candidatos 2022, base de 01/11/2026 03:16:07",
  "linhas": 342,
  "colunas": [
   "slug",
   "nome_urna",
   "cargo",
   "uf",
   "partido",
   "cor_raca",
   "situacao",
   "turno",
   "ocupacao_2026",
   "escolaridade_2026",
   "cargo_2022",
   "resultado_2022",
   "ficha"
  ],
  "bytes": 63268,
  "sha256": "a3d4380d8243d8b4bf82d5c90564f30a7b924bb81bfd7d39edc7109d8e28fff1"
 },
 {
  "arquivo": "deputado-2026-por-partido.csv",
  "titulo": "Deputado 2026, por partido, gênero e cor/raça",
  "descricao": "Candidaturas e eleitos a deputado federal, estadual e distrital, 1º turno, por partido e cor/raça declarada. Uma linha por partido e categoria.",
  "fonte": "TSE, Candidatos 2026, base de 04/11/2026 12:30:19 (SHA-256 032bdea15c0dfd5f029674faeb7e9314198dba4a4302d0a44e09acb9d5a85f10)",
  "linhas": 180,
  "colunas": [
   "partido",
   "cor_raca",
   "candidaturas",
   "candidatas",
   "eleitos_homens",
   "eleitas"
  ],
  "bytes": 4156,
  "sha256": "c15c7ca5a17626be5ceb708ea74c1372cab69606f8e5657f4ae1b2706c3fc918"
 },
 {
  "arquivo": "deputado-2026-por-estado.csv",
  "titulo": "Deputado 2026, por estado, gênero e cor/raça",
  "descricao": "O mesmo recorte, por unidade da federação.",
  "fonte": "TSE, Candidatos 2026, base de 04/11/2026 12:30:19 (SHA-256 032bdea15c0dfd5f029674faeb7e9314198dba4a4302d0a44e09acb9d5a85f10)",
  "linhas": 168,
  "colunas": [
   "uf",
   "cor_raca",
   "candidaturas",
   "candidatas",
   "eleitos_homens",
   "eleitas"
  ],
  "bytes": 3466,
  "sha256": "7f493534e898dedd8c98ef0bd10ad3cb29e4c24443dd6883b8e49d0459121d04"
 },
 {
  "arquivo": "serie-historica-por-cargo.csv",
  "titulo": "Série histórica 2014 a 2026, por cargo",
  "descricao": "Candidaturas, candidatas, eleitos e eleitas em cada cargo nas eleições gerais de 2014, 2018, 2022 e 2026, com as eleitas por cor/raça.",
  "fonte": "TSE, Candidatos 2014, 2018, 2022 e 2026 (scripts/recontagem/historico_cargo_uf.py)",
  "linhas": 24,
  "colunas": [
   "ano",
   "cargo",
   "candidaturas",
   "candidatas",
   "eleitos",
   "eleitas",
   "eleitas_branca",
   "eleitas_parda",
   "eleitas_preta",
   "eleitas_indígena",
   "eleitas_amarela"
  ],
  "bytes": 1185,
  "sha256": "7d34766a47ecebcafa24dc60361e546feb2adc4e37f2c26c32d8b7b8153be336"
 },
 {
  "arquivo": "serie-historica-deputado-federal-por-estado.csv",
  "titulo": "Série histórica de deputado federal, por estado",
  "descricao": "Candidaturas, candidatas, cadeiras e eleitas a deputado federal por estado, 2014 a 2026.",
  "fonte": "TSE, Candidatos 2014, 2018, 2022 e 2026 (scripts/recontagem/historico_cargo_uf.py)",
  "linhas": 108,
  "colunas": [
   "ano",
   "uf",
   "candidaturas",
   "candidatas",
   "cadeiras",
   "eleitas"
  ],
  "bytes": 2202,
  "sha256": "8e26da40b56108235e8bdbb46bde6c054e94a51926ff8ac70335180735b1f42e"
 },
 {
  "arquivo": "camara-seis-votacoes.csv",
  "titulo": "Como votaram as deputadas: seis votações",
  "descricao": "Uma linha por deputada e votação nominal de mérito acompanhada pelo observatório, com o voto, o partido na data e o alinhamento com a maioria da bancada.",
  "fonte": "Câmara dos Deputados, Dados Abertos; TSE, Candidatos 2022 e 2026 (base de 27/10/2026); coleta em 27/10/2026 (PDL 3/2025: 28/10/2026)",
  "linhas": 531,
  "colunas": [
   "deputada",
   "uf",
   "cor_raca_2022",
   "resultado_2026",
   "votacao_id",
   "proposicao",
   "data",
   "voto",
   "partido_na_data",
   "alinhamento"
  ],
  "bytes": 49195,
  "sha256": "5be78a178a75df104ddff5a551fd713e698650f199e5f470030d92e43fe0d478"
 },
 {
  "arquivo": "camara-monitor-2026.csv",
  "titulo": "Monitor de mandato, Câmara, 2026",
  "descricao": "Uma linha por deputada federal que passou pela Câmara no período: votos registrados nas votações nominais do plenário, proposições assinadas (autora ou coautora) e discursos.",
  "fonte": "Câmara dos Deputados, Dados Abertos; coleta em 04/11/2026; período 2026-01-01 a 2026-11-03",
  "linhas": 99,
  "colunas": [
   "id_camara",
   "nome",
   "partido",
   "uf",
   "em_exercicio_na_coleta",
   "votacoes_em_exercicio",
   "votos_registrados",
   "proposicoes",
   "discursos",
   "cargo_2026",
   "resultado_2026"
  ],
  "bytes": 7112,
  "sha256": "0ec4c773f32cc9fdabe92b20e399298f96fb29bef05031cf1135fe71577b251b"
 },
 {
  "arquivo": "camara-coautoria-2026.csv",
  "titulo": "Quem assina junto: coautoria entre deputadas, 2026",
  "descricao": "Uma linha por par de deputadas que assinaram ao menos um projeto juntas, com o número de projetos (todos e só os com até 20 autores) e até três exemplos.",
  "fonte": "Câmara dos Deputados, Dados Abertos; coleta em 04/11/2026; período 2026-01-01 a 2026-11-03",
  "linhas": 2307,
  "colunas": [
   "deputada_a",
   "partido_a",
   "uf_a",
   "deputada_b",
   "partido_b",
   "uf_b",
   "projetos",
   "projetos_ate_20_autores",
   "partidos_diferentes",
   "exemplos"
  ],
  "bytes": 180305,
  "sha256": "f71a652803edabc50c7ddcb7bc3832467977ce53465dc0e68a98e01d73e6a717"
 },
 {
  "arquivo": "fundo-eleitoral-deputado-por-partido.csv",
  "titulo": "Fundo eleitoral a deputado, por partido",
  "descricao": "Soma dos recebimentos declarados de FEFC pelas candidaturas proporcionais de cada sigla, inclusive repasses de outras candidaturas, por gênero e cor/raça, em reais.",
  "fonte": "TSE, Prestação de Contas 2026, base de 25/11/2026 (SHA-256 7cbbb11fb8004591e42ebb1ec1432585740c5b2436cd5f3ff65765e921247f29)",
  "linhas": 336,
  "colunas": [
   "partido",
   "grupo",
   "candidaturas",
   "fefc_reais"
  ],
  "bytes": 11451,
  "sha256": "7b546881af11bf92a92b0d5622a892d9e991cfb15f36b97ac1b858b62e24e9b7"
 },
 {
  "arquivo": "fundo-eleitoral-origem-partidaria-deputado-por-partido.csv",
  "titulo": "FEFC declarado de origem partidária, por partido da candidatura",
  "descricao": "Receitas de fonte Fundo Especial e origem Recursos de partido político, excluídos repasses de outras candidaturas; agrupadas pela sigla do registro da candidatura receptora, não pelo doador. Cargos proporcionais.",
  "fonte": "TSE, Prestação de Contas 2026, base de 25/11/2026 (SHA-256 7cbbb11fb8004591e42ebb1ec1432585740c5b2436cd5f3ff65765e921247f29)",
  "linhas": 348,
  "colunas": [
   "partido",
   "grupo",
   "candidaturas",
   "fefc_origem_partidaria_reais"
  ],
  "bytes": 11775,
  "sha256": "693934207c143e632175ec82a4976bfb349078a42a70d1686bd17a72ae7c7edf"
 },
 {
  "arquivo": "receitas-2026-universos.csv",
  "titulo": "Receitas declaradas e cobertura por universo",
  "descricao": "Contagens e valores agregados. Registros zero e ausências separados. Recebimentos sem repasses não constituem fluxo líquido conciliado. Estimáveis incluídos nos recebimentos.",
  "fonte": "TSE, receitas 25/11/2026, 04h05min30s, candidaturas 25/11/2026, 16h30min55s; SHA-256 7cbbb11fb8004591e42ebb1ec1432585740c5b2436cd5f3ff65765e921247f29",
  "linhas": 3,
  "colunas": [
   "universo",
   "titulares",
   "no_arquivo",
   "receita_positiva",
   "registro_zero",
   "ausentes",
   "recebimentos_reais",
   "repasses_reais",
   "sem_repasses_reais",
   "fefc_recebimentos_reais",
   "fefc_origem_partidaria_reais"
  ],
  "bytes": 491,
  "sha256": "0356d938ff331bb98b5e07df9f70a0f3ef3cbbb27ca5788d26440d10be2c0761"
 },
 {
  "arquivo": "receitas-2026-medianas.csv",
  "titulo": "Medianas de receita declarada com e sem zeros",
  "descricao": "Receita por candidatura, medianas do arquivo (inclusive zero) e das candidaturas com soma positiva; ausentes não imputados. Gênero por universo e categorias raciais das mulheres proporcionais.",
  "fonte": "TSE, receitas 25/11/2026, 04h05min30s, candidaturas 25/11/2026, 16h30min55s; SHA-256 7cbbb11fb8004591e42ebb1ec1432585740c5b2436cd5f3ff65765e921247f29",
  "linhas": 9,
  "colunas": [
   "universo",
   "grupo",
   "titulares",
   "no_arquivo",
   "receita_positiva",
   "mediana_no_arquivo_reais",
   "mediana_positiva_reais"
  ],
  "bytes": 622,
  "sha256": "5bf1faf9371e6f229abb161e6ed81161ee8dfe8bf7478be25f6ef78dad01ae2e"
 }
];
