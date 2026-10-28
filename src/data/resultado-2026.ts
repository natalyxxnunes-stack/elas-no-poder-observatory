/**
 * resultado-2026 — resultado final de 2026 (1º turno de 4/10 e 2º turno de
 * 25/10), CRAVADO em código.
 *
 * Recontagem independente de `consulta_cand_2026_BRASIL.csv` (latin1, `;`,
 * SQ_CANDIDATO único), base gerada pelo TSE em 27/10/2026 19:30:36,
 * baixada em 27/10/2026 às 21:56 (horário de Brasília).
 * SHA-256 do CSV: 3a60b9a996590b60b39b3a9cca68d2207b89a2a0cf3b235fd6452459be9c0c3e.
 * SHA-256 do zip: fc047f98cda9f6c837f4e5a1bddb97f9a546a68eb2469c080e83db80e453cb0d.
 * Script: scripts/recontagem/resultado_2026.py (--turno 1 e --turno 2).
 *
 * Esta é a primeira base com os 27 estados completos depois do 1º turno:
 * Rondônia voltou com a situação de totalização de deputado. O resultado
 * proporcional é idêntico, número por número, ao da base de 05/10.
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
  baseGeneratedAt: "27/10/2026 19:30:36",
  downloadedAt: "2026-10-27T21:56:00-03:00",
  brasilCsvSha256: "3a60b9a996590b60b39b3a9cca68d2207b89a2a0cf3b235fd6452459be9c0c3e",
  zipSha256: "fc047f98cda9f6c837f4e5a1bddb97f9a546a68eb2469c080e83db80e453cb0d",
  round: "1º turno (4/10/2026) e 2º turno (25/10/2026)",
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
 * Majoritário (governos, Senado e Presidência): mesma base de 27/10/2026, com
 * o resultado do 2º turno (linhas NR_TURNO = 2). Mantido como constante
 * própria porque as páginas citam as duas bases separadamente.
 * Histórico: a base de 14/10 já incorporava a retotalização do Rio de
 * Janeiro (governo decidido no 1º turno depois da anulação dos votos de
 * Garotinho). Senado não mudou entre 05/10, 14/10 e 27/10.
 */
export const RESULT_2026_MAJ_META = {
  baseGeneratedAt: RESULT_2026_META.baseGeneratedAt,
  downloadedAt: RESULT_2026_META.downloadedAt,
  brasilCsvSha256: RESULT_2026_META.brasilCsvSha256,
  zipSha256: RESULT_2026_META.zipSha256,
} as const;

/** Governos: resultado final, com o 2º turno de 25/10 (base de 27/10). */
export const RESULT_2026_GOVERNO = {
  totalUfs: 27,
  candidacies: 201,
  feminineCandidacies: 35,
  /** decididos no 1º turno */
  decidedFirstRound: 21,
  electedFeminineFirstRound: 1,
  /** resultado final: 27 governos */
  electedFeminine: 3,
  electedFeminineUfs: ["AC", "DF", "PE"],
  /** nomes de urna e partido das eleitas, como no arquivo do TSE */
  electedFeminineNames: [
    { uf: "PE", nome: "Raquel Lyra", partido: "PSD", turno: 1 },
    { uf: "AC", nome: "Mailza Assis", partido: "PP", turno: 2 },
    { uf: "DF", nome: "Celina Leão", partido: "PP", turno: 2 },
  ],
  electedRaceFeminine: { BRANCA: 3 } as Record<string, number>,
  electedRaceAll: { BRANCA: 20, PARDA: 6, "INDÍGENA": 1 } as Record<string, number>,
  /** 2º turno */
  runoffUfs: ["AC", "AM", "DF", "ES", "RN", "TO"],
  runoffCandidacies: 12,
  runoffFeminine: 4,
  runoffFeminineUfs: ["AC", "AM", "DF", "TO"],
  runoffElectedFeminine: 2,
  runoffElectedFeminineUfs: ["AC", "DF"],
  runoffLostFeminineUfs: ["AM", "TO"],
} as const;

/**
 * Presidência (base de 27/10). Sempre em número absoluto ("X de 14"), nunca
 * em percentual: a base é menor que 20 registros.
 */
export const RESULT_2026_PRESIDENCIA = {
  registros: 14,
  mulheres: 2,
  /** cor/raça das duas candidatas, categorias originais */
  mulheresCorRaca: { BRANCA: 1, PRETA: 1 } as Record<string, number>,
  segundoTurno: 2,
  mulheresNoSegundoTurno: 0,
  /** resultado final do 2º turno de 25/10 */
  decidido: true,
  mulheresEleitas: 0,
} as const;

/**
 * Majoritário completo (Presidência + 27 governos + 54 vagas do Senado), com
 * o 2º turno incorporado. Mesma regra da série histórica de 2014, 2018 e 2022:
 * para cargo decidido em 2º turno vale a linha NR_TURNO = 2; vices e
 * suplentes ficam fora.
 */
export const RESULT_2026_MAJORITARIO_FINAL = {
  total: 82,
  feminine: 15,
  byCargo: { PRESIDENTE: 1, GOVERNADOR: 27, SENADOR: 54 } as Record<string, number>,
  feminineByCargo: { PRESIDENTE: 0, GOVERNADOR: 3, SENADOR: 12 } as Record<string, number>,
  raceAll: { BRANCA: 59, PARDA: 22, "INDÍGENA": 1 } as Record<string, number>,
  raceFeminine: { BRANCA: 13, PARDA: 2 } as Record<string, number>,
} as const;

export const RESULT_2026_SOURCE =
  "TSE, Dados Abertos, Candidatos 2026 (base gerada em 27/10/2026 19:30:36, com o resultado do 1º e do 2º turno), recontagem independente";

/**
 * Rondônia: os arquivos do TSE de 14/10 traziam os 394 registros de deputado
 * do estado sem situação de totalização. A base de 27/10 trouxe o estado de
 * volta, e o resultado de deputadas e deputados (1.572 cadeiras, 327
 * mulheres) ficou igual ao da base de 05/10. Nota mantida para o Método.
 */
export const RESULT_2026_RO_NOTE =
  "Rondônia ficou de fora dos recortes por partido e de votos entre 14/10 e 27/10, porque o arquivo do TSE trazia os registros de deputado do estado sem resultado. Na base de 27/10 o estado voltou, e todos os gráficos passaram a somar os 27 estados.";

/**
 * Eleitas e eleitos por partido (deputado federal, estadual e distrital).
 * Base de 27/10/2026, com os 27 estados (1.572 cadeiras, 327 mulheres).
 * Entre 14/10 e 27/10 esta tabela foi publicada sem Rondônia (1.540 e 321).
 */
export const RESULT_2026_PARTIDOS = {
  baseGeneratedAt: "27/10/2026 19:30:36",
  seats: 1572,
  feminine: 327,
  note: "Os 27 estados: 1.572 cadeiras e 327 mulheres eleitas.",
  electedByParty: {"PL": 333, "PT": 211, "MDB": 148, "PSD": 146, "PP": 122, "REPUBLICANOS": 119, "UNIÃO": 119, "PODE": 74, "PSB": 57, "PSOL": 40, "PSDB": 37, "PDT": 30, "PV": 26, "NOVO": 25, "AVANTE": 22, "PCDOB": 20, "PRD": 18, "AGIR": 7, "SOLIDARIEDADE": 6, "REDE": 4, "MOBILIZA": 3, "MISSÃO": 2, "DEMOCRATA": 1, "DC": 1, "CIDADANIA": 1} as Record<string, number>,
  electedFeminineByParty: {"PL": 65, "PT": 70, "MDB": 24, "PSD": 24, "PP": 18, "REPUBLICANOS": 21, "UNIÃO": 20, "PODE": 12, "PSB": 16, "PSOL": 25, "PSDB": 5, "PDT": 4, "PV": 6, "NOVO": 2, "AVANTE": 1, "PCDOB": 9, "PRD": 1, "AGIR": 3, "SOLIDARIEDADE": 1, "REDE": 0, "MOBILIZA": 0, "MISSÃO": 0, "DEMOCRATA": 0, "DC": 0, "CIDADANIA": 0} as Record<string, number>,
  electedRaceFeminineByParty: {"AGIR": {"BRANCA": 1, "PARDA": 2}, "AVANTE": {"BRANCA": 1}, "MDB": {"BRANCA": 18, "PARDA": 6}, "NOVO": {"BRANCA": 2}, "PCDOB": {"PARDA": 2, "PRETA": 4, "BRANCA": 3}, "PDT": {"BRANCA": 3, "PARDA": 1}, "PL": {"BRANCA": 58, "PARDA": 6, "INDÍGENA": 1}, "PODE": {"PARDA": 3, "BRANCA": 9}, "PP": {"BRANCA": 14, "PARDA": 3, "PRETA": 1}, "PRD": {"BRANCA": 1}, "PSB": {"BRANCA": 11, "PARDA": 5}, "PSD": {"BRANCA": 17, "PRETA": 1, "PARDA": 6}, "PSDB": {"BRANCA": 5}, "PSOL": {"PRETA": 14, "BRANCA": 9, "INDÍGENA": 1, "AMARELA": 1}, "PT": {"PARDA": 14, "BRANCA": 33, "PRETA": 21, "AMARELA": 1, "INDÍGENA": 1}, "PV": {"BRANCA": 4, "PARDA": 2}, "REPUBLICANOS": {"BRANCA": 16, "PARDA": 5}, "SOLIDARIEDADE": {"BRANCA": 1}, "UNIÃO": {"PARDA": 12, "BRANCA": 8}} as Record<string, Record<string, number>>,
} as const;
