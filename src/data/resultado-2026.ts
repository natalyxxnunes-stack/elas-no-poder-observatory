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

/** Governos: decididos no 1º turno e disputas que seguem para 25/10. */
export const RESULT_2026_GOVERNO = {
  totalUfs: 27,
  decidedFirstRound: 20,
  electedFeminine: 1,
  runoffUfs: ["AC", "AM", "DF", "ES", "RJ", "RN", "TO"],
  runoffCandidacies: 14,
  runoffFeminine: 4,
  runoffFeminineUfs: ["AC", "AM", "DF", "TO"],
} as const;

/** Presidência: o arquivo ainda não traz situação de totalização. */
export const RESULT_2026_PRESIDENCIA_PENDING =
  "O arquivo de 05/10 ainda não traz a situação de totalização dos 14 registros à Presidência. Nada é exibido no lugar.";

export const RESULT_2026_SOURCE =
  "TSE, Dados Abertos, Candidatos 2026 (base gerada em 05/10/2026 10:14:11), recontagem independente";
