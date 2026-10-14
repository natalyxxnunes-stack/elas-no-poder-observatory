/**
 * resultado-2026 — resultado do 1º turno de 4/10/2026, CRAVADO em código.
 *
 * Recontagem independente de `consulta_cand_2026_BRASIL.csv` (latin1, `;`,
 * SQ_CANDIDATO único), base gerada pelo TSE em 05/10/2026 10:14:11,
 * baixada em 05/10/2026 às 18:26 (horário de Brasília).
 * SHA-256 do CSV: 4c4f6682422a3afa36e8bd156d53ecc3e00fcb5e2dda93a70ccec118db3d78da.
 *
 * Eleitas/eleitos = DS_SIT_TOT_TURNO iniciando em "ELEITO" (ELEITO, ELEITO POR
 * QP, ELEITO POR MÉDIA). "2º TURNO" fica fora das eleitas. Mesma regra usada
 * em historical-funnel para 2014, 2018 e 2022.
 *
 * Este arquivo é separado da fotografia de candidaturas (tse-snapshot, 25/09):
 * o resultado tem denominador próprio (cadeiras) e lê as candidaturas do MESMO
 * arquivo em que o resultado foi publicado, para que taxa de eleição use
 * numerador e denominador da mesma base.
 *
 * Regra: nada aqui é preenchido à mão. Apenas saída verificável do CSV acima.
 */

export const RESULT_2026_META = {
  fileName: "consulta_cand_2026.zip",
  resourceUrl:
    "https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_cand/consulta_cand_2026.zip",
  baseGeneratedAt: "05/10/2026 10:14:11",
  downloadedAt: "2026-10-05T18:26:00-03:00",
  brasilCsvSha256: "4c4f6682422a3afa36e8bd156d53ecc3e00fcb5e2dda93a70ccec118db3d78da",
  round: "1º turno · 4 de outubro de 2026",
} as const;

/** Universo proporcional: Câmara dos Deputados + assembleias + Câmara Legislativa do DF. */
export const RESULT_2026_PROPORCIONAL = {
  /** candidaturas no mesmo arquivo do resultado (todas as linhas do universo) */
  candidacies: { total: 19531, feminine: 6953, masculine: 12578 },
  candidacyRaceFeminine: {"BRANCA": 3254, "PARDA": 2379, "PRETA": 1197, "INDÍGENA": 82, "AMARELA": 41} as Record<string, number>,
  candidacyRaceAll: {"BRANCA": 9726, "PARDA": 6858, "PRETA": 2666, "INDÍGENA": 180, "AMARELA": 101} as Record<string, number>,
  /** cadeiras preenchidas = pessoas eleitas */
  seats: 1572,
  elected: { feminine: 327, masculine: 1245 },
  electedRaceFeminine: {"BRANCA": 214, "PARDA": 67, "PRETA": 41, "INDÍGENA": 3, "AMARELA": 2} as Record<string, number>,
  electedRaceAll: {"BRANCA": 1093, "PARDA": 377, "PRETA": 90, "INDÍGENA": 7, "AMARELA": 5} as Record<string, number>,
  byCargo: {"distrital": {"seats": 24, "feminine": 5, "candidacies": 433, "feminineCandidacies": 152, "electedRaceFeminine": {"BRANCA": 4, "PRETA": 1}}, "estadual": {"seats": 1035, "feminine": 213, "candidacies": 11295, "feminineCandidacies": 3930, "electedRaceFeminine": {"BRANCA": 137, "PARDA": 46, "PRETA": 27, "AMARELA": 2, "INDÍGENA": 1}}, "federal": {"seats": 513, "feminine": 109, "candidacies": 7803, "feminineCandidacies": 2871, "electedRaceFeminine": {"BRANCA": 73, "PARDA": 21, "PRETA": 13, "INDÍGENA": 2}}},
  /** deputadas federais eleitas por UF e cadeiras da UF na Câmara */
  federalFeminineByUf: {"AC": 2, "AL": 1, "AM": 1, "AP": 3, "BA": 6, "CE": 5, "DF": 0, "ES": 2, "GO": 5, "MA": 5, "MG": 11, "MS": 4, "MT": 3, "PA": 4, "PB": 1, "PE": 6, "PI": 0, "PR": 4, "RJ": 10, "RN": 3, "RO": 3, "RR": 0, "RS": 5, "SC": 6, "SE": 2, "SP": 16, "TO": 1} as Record<string, number>,
  federalSeatsByUf: {"AC": 8, "AL": 9, "AM": 8, "AP": 8, "BA": 39, "CE": 22, "DF": 8, "ES": 10, "GO": 17, "MA": 18, "MG": 53, "MS": 8, "MT": 8, "PA": 17, "PB": 12, "PE": 25, "PI": 10, "PR": 30, "RJ": 46, "RN": 8, "RO": 8, "RR": 8, "RS": 31, "SC": 16, "SE": 8, "SP": 70, "TO": 8} as Record<string, number>,
} as const;

/** Senado: 54 cadeiras em disputa (dois terços da Casa). */
export const RESULT_2026_SENADO = {
  seats: 54,
  electedFeminine: 12,
  candidacies: 319,
  feminineCandidacies: 70,
  electedRaceFeminine: {"BRANCA": 10, "PARDA": 2} as Record<string, number>,
  candidacyRaceFeminine: {"BRANCA": 44, "PARDA": 18, "PRETA": 8} as Record<string, number>,
} as const;

/**
 * Majoritário (governos, Senado e Presidência): base do TSE de 14/10/2026.
 * A base de 14/10 incorpora a retotalização do Rio de Janeiro: com a anulação
 * dos votos de Garotinho pelo TSE e a retotalização confirmada pelo TRE-RJ,
 * o governo do RJ foi decidido no 1º turno e saiu da lista do 2º turno.
 * Senado não mudou entre 05/10 e 14/10.
 */
export const RESULT_2026_MAJ_META = {
  baseGeneratedAt: "14/10/2026 12:30:43",
  downloadedAt: "2026-10-14T13:11:00-03:00",
  brasilCsvSha256: "886bba0f04c781211458d7214a714d5e865c7aea1dbc671d33a27d112fd9ac09",
  zipSha256: "900f2efe9c3aa6495dcafd41824539cc51331f97406990bc0eed711d2e907142",
} as const;

/** Governos: decididos no 1º turno e disputas que seguem para 25/10 (base de 14/10). */
export const RESULT_2026_GOVERNO = {
  totalUfs: 27,
  candidacies: 201,
  feminineCandidacies: 35,
  decidedFirstRound: 21,
  electedFeminine: 1,
  electedFeminineUfs: ["PE"],
  runoffUfs: ["AC", "AM", "DF", "ES", "RN", "TO"],
  runoffCandidacies: 12,
  runoffFeminine: 4,
  runoffFeminineUfs: ["AC", "AM", "DF", "TO"],
} as const;

/**
 * Presidência (base de 14/10). Sempre em número absoluto ("X de 14"), nunca
 * em percentual: a base é menor que 20 registros.
 */
export const RESULT_2026_PRESIDENCIA = {
  registros: 14,
  mulheres: 2,
  /** cor/raça das duas candidatas, categorias originais */
  mulheresCorRaca: { BRANCA: 1, PRETA: 1 } as Record<string, number>,
  segundoTurno: 2,
  mulheresNoSegundoTurno: 0,
} as const;

export const RESULT_2026_SOURCE =
  "TSE, Dados Abertos, Candidatos 2026 (deputadas e deputados: base gerada em 05/10/2026 10:14:11; governos, Senado e Presidência: base gerada em 14/10/2026 12:30:43), recontagem independente";

/**
 * Por que o proporcional segue na base de 05/10: o arquivo de 14/10 traz os
 * 394 registros de deputado de Rondônia (134 federais, 260 estaduais) sem
 * situação de totalização ("#NULO"), e as 32 cadeiras do estado deixam de
 * aparecer como eleitas. Fora de Rondônia, as contagens de 14/10 são iguais
 * às de 05/10 (1.540 cadeiras, 321 mulheres). A base sobe quando o TSE
 * republicar o resultado de Rondônia.
 */
export const RESULT_2026_RO_NOTE =
  "O arquivo do TSE de 14/10 traz os registros de deputado de Rondônia sem situação de totalização. Por isso o resultado de deputadas e deputados continua na base de 05/10, a última com os 27 estados. Fora de Rondônia, os números de 14/10 são iguais aos de 05/10.";

/**
 * Eleitas e eleitos por partido (deputado federal, estadual e distrital).
 * Base de 14/10/2026, a primeira em que o recorte por partido foi recontado.
 * Rondônia fica fora: o arquivo de 14/10 traz os registros de deputado do
 * estado sem situação de totalização (ver RESULT_2026_RO_NOTE). Por isso os
 * totais aqui são 1.540 cadeiras e 321 mulheres, e não 1.572 e 327.
 */
export const RESULT_2026_PARTIDOS = {
  baseGeneratedAt: "14/10/2026 12:30:43",
  seats: 1540,
  feminine: 321,
  note: "Sem Rondônia: o arquivo de 14/10 traz as 32 cadeiras de deputado do estado sem resultado, por isso esta tabela soma 1.540 cadeiras e 321 mulheres.",
  electedByParty: {"PL": 323, "PT": 209, "MDB": 148, "PSD": 142, "PP": 120, "REPUBLICANOS": 117, "UNIÃO": 117, "PODE": 71, "PSB": 57, "PSOL": 40, "PSDB": 37, "PDT": 30, "PV": 26, "NOVO": 23, "PCDOB": 20, "AVANTE": 20, "PRD": 15, "AGIR": 7, "SOLIDARIEDADE": 6, "REDE": 4, "MOBILIZA": 3, "MISSÃO": 2, "DEMOCRATA": 1, "CIDADANIA": 1, "DC": 1} as Record<string, number>,
  electedFeminineByParty: {"PL": 63, "PT": 68, "MDB": 24, "PSD": 23, "PP": 18, "REPUBLICANOS": 21, "UNIÃO": 20, "PODE": 11, "PSB": 16, "PSOL": 25, "PSDB": 5, "PDT": 4, "PV": 6, "NOVO": 2, "PCDOB": 9, "AVANTE": 1, "PRD": 1, "AGIR": 3, "SOLIDARIEDADE": 1, "REDE": 0, "MOBILIZA": 0, "MISSÃO": 0, "DEMOCRATA": 0, "CIDADANIA": 0, "DC": 0} as Record<string, number>,
  electedRaceFeminineByParty: {"AGIR": {"BRANCA": 1, "PARDA": 2}, "AVANTE": {"BRANCA": 1}, "MDB": {"BRANCA": 18, "PARDA": 6}, "NOVO": {"BRANCA": 2}, "PCDOB": {"PARDA": 2, "BRANCA": 3, "PRETA": 4}, "PDT": {"PARDA": 1, "BRANCA": 3}, "PL": {"BRANCA": 57, "PARDA": 5, "INDÍGENA": 1}, "PODE": {"BRANCA": 9, "PARDA": 2}, "PP": {"BRANCA": 14, "PARDA": 3, "PRETA": 1}, "PRD": {"BRANCA": 1}, "PSB": {"BRANCA": 11, "PARDA": 5}, "PSD": {"PARDA": 6, "BRANCA": 16, "PRETA": 1}, "PSDB": {"BRANCA": 5}, "PSOL": {"AMARELA": 1, "PRETA": 14, "BRANCA": 9, "INDÍGENA": 1}, "PT": {"BRANCA": 32, "PARDA": 14, "PRETA": 20, "INDÍGENA": 1, "AMARELA": 1}, "PV": {"PARDA": 2, "BRANCA": 4}, "REPUBLICANOS": {"PARDA": 5, "BRANCA": 16}, "SOLIDARIEDADE": {"BRANCA": 1}, "UNIÃO": {"PARDA": 12, "BRANCA": 8}} as Record<string, Record<string, number>>,
} as const;
