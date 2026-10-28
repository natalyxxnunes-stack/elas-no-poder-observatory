/**
 * tse-finance-snapshot — fotografia fixa das receitas de campanha de 2026.
 *
 * Recontagem independente de `receitas_candidatos_2026_BRASIL.csv` (latin1, `;`),
 * base gerada pelo TSE em 27/10/2026 às 04:05:36, SHA-256
 * 4f149814d233df23e76aab22025778bbf233119f1912e4e13ceca9345bbfa588, dentro de
 * prestacao_de_contas_eleitorais_candidatos_2026.zip (SHA-256
 * 2ae14ad0a63e58c63cde024ad9f14a543af7156d9314c9ba2ce32a8909844e83), cruzada por
 * SQ_CANDIDATO com `consulta_cand_2026_BRASIL.csv` de 27/10/2026 às 19:30:36
 * (SHA-256 3a60b9a996590b60b39b3a9cca68d2207b89a2a0cf3b235fd6452459be9c0c3e).
 * Script: scripts/recontagem/dinheiro_2026.py.
 *
 * Auditoria: 192.581 linhas brutas; 513 linhas idênticas em todas as colunas
 * removidas (R$ 476.778,48); 192.068 linhas somadas. As 19.270 candidaturas com
 * receita têm par no registro, com gênero idêntico em 100% das linhas. Cada
 * candidatura aparece com um só tipo de prestação: 8.309 parciais, 7.892
 * relatórios financeiros e 3.069 finais. A prestação final do 1º turno vence
 * em 3/11/2026: os valores ainda mudam.
 *
 * Fotografia anterior: base de 25/09/2026 (SHA-256 dcef6b81…), no histórico
 * do repositório.
 */

import { classifyUniverse, type UniverseId } from "@/lib/tse/compute";

export type FinanceRaceDatum = { value: number; candidacies: number };
export type FinanceOfficeDatum = { total: number; feminine: number; candidacies: number; feminineCandidacies: number };
export type FinanceValueDatum = { total: number; feminine: number };
export type FinanceUniverseSnapshot = {
  registeredCandidacies: number; candidaciesWithRevenue: number; registeredFeminineCandidacies: number;
  feminineCandidaciesWithRevenue: number; totalRevenue: number; feminineRevenue: number;
  feminineMedian: number; masculineMedian: number;
  /** mediana da receita por candidatura de mulher, por cor/raça (categorias originais) */
  feminineMedianByRace: Record<string, number>;
  feminineRevenueByRace: Record<string, FinanceRaceDatum>; byOffice: Record<string, FinanceOfficeDatum>;
  topParties?: Record<string, FinanceValueDatum>; byUf?: Record<string, FinanceValueDatum>;
};
export type TseFinanceSnapshot = {
  datasetUrl: string; resourceUrl: string; sourceFile: string; csvSha256: string; baseGeneratedAt: string;
  revenueRowsProcessed: number; candidaciesWithRevenue: number; filters: string[];
  universes: Record<UniverseId, FinanceUniverseSnapshot>;
};

export const FINANCE_CSV_SHA256 = "4f149814d233df23e76aab22025778bbf233119f1912e4e13ceca9345bbfa588";
export const FINANCE_SOURCE_FILE = "receitas_candidatos_2026_BRASIL.csv";
export const FINANCE_BASE_LABEL = "27/10/2026";
export const DUPLICATE_ROWS_REMOVED = 513;
export const classifyFinanceUniverse = classifyUniverse;

const UNIVERSES = {"proporcional": {"registeredCandidacies": 19531, "candidaciesWithRevenue": 18748, "registeredFeminineCandidacies": 6953, "feminineCandidaciesWithRevenue": 6739, "totalRevenue": 5321114220.72, "feminineRevenue": 1765787794.06, "feminineMedian": 60021.78, "masculineMedian": 53842.25, "feminineRevenueByRace": {"BRANCA": {"value": 992868125.29, "candidacies": 3161}, "PARDA": {"value": 487223070.81, "candidacies": 2291}, "PRETA": {"value": 251134306.76, "candidacies": 1167}, "INDÍGENA": {"value": 27093908.48, "candidacies": 81}, "AMARELA": {"value": 7468382.72, "candidacies": 39}}, "byOffice": {"DEPUTADO ESTADUAL": {"total": 1838690124.31, "feminine": 652736519.41, "candidacies": 10850, "feminineCandidacies": 3816}, "DEPUTADO FEDERAL": {"total": 3433204438.33, "feminine": 1098714480.75, "candidacies": 7483, "feminineCandidacies": 2775}, "DEPUTADO DISTRITAL": {"total": 49219658.08, "feminine": 14336793.9, "candidacies": 415, "feminineCandidacies": 148}}, "topParties": {"PL": {"total": 870666998.5, "feminine": 245911455.74}, "UNIÃO": {"total": 578686595.57, "feminine": 212169418.3}, "PSD": {"total": 486371533.3, "feminine": 145160506.67}, "REPUBLICANOS": {"total": 483278024.58, "feminine": 157983594.03}, "PT": {"total": 471509527.86, "feminine": 217241931.71}}, "byUf": {"SP": {"total": 857698049.39, "feminine": 271258930.44}, "MG": {"total": 458347308.51, "feminine": 133177430.37}, "RJ": {"total": 430102279.85, "feminine": 147087788.41}, "BA": {"total": 309216837.38, "feminine": 99411527.6}, "PR": {"total": 296035067.15, "feminine": 89753455.37}, "RS": {"total": 262894998.25, "feminine": 86819817.95}, "PE": {"total": 216787890.66, "feminine": 69713410.5}, "CE": {"total": 210914527.3, "feminine": 76429345.38}, "MA": {"total": 191227126.02, "feminine": 62605771.88}, "SC": {"total": 185128615.78, "feminine": 57783262.32}, "GO": {"total": 184799686.34, "feminine": 66095511.38}, "PA": {"total": 164886430.97, "feminine": 61275090.27}, "MT": {"total": 129336171.23, "feminine": 43648799.45}, "DF": {"total": 126891645.41, "feminine": 35070265.02}, "AM": {"total": 122965511.57, "feminine": 38209473.69}, "PI": {"total": 118247275.81, "feminine": 39153367.94}, "PB": {"total": 114781357.33, "feminine": 35360175.82}, "RO": {"total": 111678006.89, "feminine": 39015924.19}, "ES": {"total": 110352940.52, "feminine": 34700062.15}, "MS": {"total": 101288351.91, "feminine": 37061859.97}, "AP": {"total": 98683446.77, "feminine": 42182897.74}, "SE": {"total": 92534230.59, "feminine": 35913810.71}, "AL": {"total": 91336675.93, "feminine": 30454209.99}, "RR": {"total": 89967362.62, "feminine": 39732641.84}, "TO": {"total": 83510758.98, "feminine": 26337541.75}, "AC": {"total": 83274374.84, "feminine": 33890866.53}, "RN": {"total": 78227292.72, "feminine": 33644555.4}}}, "majoritario": {"registeredCandidacies": 534, "candidaciesWithRevenue": 522, "registeredFeminineCandidacies": 107, "feminineCandidaciesWithRevenue": 107, "totalRevenue": 1418802266.0, "feminineRevenue": 212775276.86, "feminineMedian": 183000.0, "masculineMedian": 413340.83, "feminineRevenueByRace": {"BRANCA": {"value": 173348995.26, "candidacies": 65}, "PARDA": {"value": 23679379.79, "candidacies": 24}, "PRETA": {"value": 15710941.3, "candidacies": 17}, "AMARELA": {"value": 35960.51, "candidacies": 1}}, "byOffice": {"SENADOR": {"total": 525159115.2, "feminine": 135136757.6, "candidacies": 314, "feminineCandidacies": 70}, "GOVERNADOR": {"total": 620627614.85, "feminine": 75681097.32, "candidacies": 195, "feminineCandidacies": 35}, "PRESIDENTE": {"total": 273015535.95, "feminine": 1957421.94, "candidacies": 13, "feminineCandidacies": 2}}}} as const;
const MEDIAN_BY_RACE = {"proporcional": {"BRANCA": 80000.0, "PARDA": 50000.0, "INDÍGENA": 106902.5, "PRETA": 50000.0, "AMARELA": 29882.98}, "majoritario": {"BRANCA": 2478357.13, "PRETA": 47078.67, "PARDA": 45126.0, "AMARELA": 35960.51}} as const;

export const financeSnapshot: TseFinanceSnapshot = {
  datasetUrl: "https://dadosabertos.tse.jus.br/dataset/prestacao-de-contas-eleitorais-2026",
  resourceUrl: "https://cdn.tse.jus.br/estatistica/sead/odsele/prestacao_contas/prestacao_de_contas_eleitorais_candidatos_2026.zip",
  sourceFile: FINANCE_SOURCE_FILE,
  csvSha256: FINANCE_CSV_SHA256,
  baseGeneratedAt: "2026-10-27T04:05:36-03:00",
  revenueRowsProcessed: 192068,
  candidaciesWithRevenue: 19270,
  filters: [
    "Unidade de análise: candidatura (SQ_CANDIDATO), receita = soma de VR_RECEITA",
    "Linhas idênticas em todas as colunas entram uma única vez (513 removidas)",
    "Gênero, cor/raça, cargo, UF e partido lidos do registro de candidaturas (base de 27/10/2026)",
    "Receitas dos dois turnos somadas; contas em andamento: a prestação final do 1º turno vence em 3/11/2026",
    "Cor/raça nas categorias originais do TSE, sem agregação",
  ],
  universes: {
    proporcional: { ...UNIVERSES.proporcional, feminineMedianByRace: MEDIAN_BY_RACE.proporcional },
    majoritario: { ...UNIVERSES.majoritario, feminineMedianByRace: MEDIAN_BY_RACE.majoritario },
  } as TseFinanceSnapshot["universes"],
};
