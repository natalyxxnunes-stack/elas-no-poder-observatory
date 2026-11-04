/**
 * tse-finance-snapshot — fotografia fixa das receitas de campanha de 2026.
 *
 * Recontagem independente de `receitas_candidatos_2026_BRASIL.csv` (latin1, `;`),
 * base gerada pelo TSE em 04/11/2026 às 04:05:12 (prestação final do 1º turno), SHA-256
 * 8695ae1e66a5d4f60bb26ecac5cee70ff4c2a892f19b7292026c13cc6c378e27, dentro de
 * prestacao_de_contas_eleitorais_candidatos_2026.zip (SHA-256
 * 65de2e2708349f619cdf6679571784e7847b500878f828fe0d6ad65351a1fc17), cruzada por
 * SQ_CANDIDATO com `consulta_cand_2026_BRASIL.csv` de 27/10/2026 às 19:30:36
 * (SHA-256 3a60b9a996590b60b39b3a9cca68d2207b89a2a0cf3b235fd6452459be9c0c3e), o
 * mesmo registro da fotografia anterior, para que a diferença venha só das contas.
 * Script: scripts/recontagem/dinheiro_2026.py.
 *
 * Auditoria: 254.558 linhas brutas; 948 linhas idênticas em todas as colunas
 * removidas (R$ 737.421,83); 253.610 linhas somadas. As 19.607 candidaturas com
 * receita têm par no registro, com gênero idêntico em 100% das linhas. Cada
 * candidatura aparece com um só tipo de prestação: 19.034 finais, 343 parciais e
 * 230 relatórios financeiros: quem não entregou a prestação final aparece com o
 * último valor declarado. Fotografias anteriores, no histórico do repositório:
 * 27/10/2026 (SHA-256 4f149814…) e 25/09/2026 (SHA-256 dcef6b81…).
 */

import { classifyUniverse, type UniverseId } from "@/lib/tse/compute";

export type FinanceRaceDatum = { value: number; candidacies: number };
export type FinanceOfficeDatum = {
  total: number;
  feminine: number;
  candidacies: number;
  feminineCandidacies: number;
};
export type FinanceValueDatum = { total: number; feminine: number };
export type FinanceUniverseSnapshot = {
  registeredCandidacies: number;
  candidaciesWithRevenue: number;
  registeredFeminineCandidacies: number;
  feminineCandidaciesWithRevenue: number;
  totalRevenue: number;
  feminineRevenue: number;
  feminineMedian: number;
  masculineMedian: number;
  /** mediana da receita por candidatura de mulher, por cor/raça (categorias originais) */
  feminineMedianByRace: Record<string, number>;
  feminineRevenueByRace: Record<string, FinanceRaceDatum>;
  byOffice: Record<string, FinanceOfficeDatum>;
  topParties?: Record<string, FinanceValueDatum>;
  byUf?: Record<string, FinanceValueDatum>;
};
export type TseFinanceSnapshot = {
  datasetUrl: string;
  resourceUrl: string;
  sourceFile: string;
  csvSha256: string;
  baseGeneratedAt: string;
  revenueRowsProcessed: number;
  candidaciesWithRevenue: number;
  filters: string[];
  universes: Record<UniverseId, FinanceUniverseSnapshot>;
};

export const FINANCE_CSV_SHA256 =
  "8695ae1e66a5d4f60bb26ecac5cee70ff4c2a892f19b7292026c13cc6c378e27";
export const FINANCE_SOURCE_FILE = "receitas_candidatos_2026_BRASIL.csv";
export const FINANCE_BASE_LABEL = "04/11/2026";
export const DUPLICATE_ROWS_REMOVED = 948;
export const classifyFinanceUniverse = classifyUniverse;

const UNIVERSES = {
  proporcional: {
    registeredCandidacies: 19531,
    candidaciesWithRevenue: 19082,
    registeredFeminineCandidacies: 6953,
    feminineCandidaciesWithRevenue: 6823,
    totalRevenue: 5528977659.67,
    feminineRevenue: 1817663647.93,
    feminineMedian: 64020.0,
    masculineMedian: 57700.0,
    feminineRevenueByRace: {
      BRANCA: { value: 1020050781.54, candidacies: 3198 },
      PARDA: { value: 503681451.55, candidacies: 2326 },
      PRETA: { value: 258437228.97, candidacies: 1179 },
      INDÍGENA: { value: 27550239.85, candidacies: 81 },
      AMARELA: { value: 7943946.02, candidacies: 39 },
    },
    byOffice: {
      "DEPUTADO ESTADUAL": {
        total: 1951011614.38,
        feminine: 679553674.09,
        candidacies: 11030,
        feminineCandidacies: 3857,
      },
      "DEPUTADO FEDERAL": {
        total: 3524641710.48,
        feminine: 1122160621.87,
        candidacies: 7626,
        feminineCandidacies: 2815,
      },
      "DEPUTADO DISTRITAL": {
        total: 53324334.81,
        feminine: 15949351.97,
        candidacies: 426,
        feminineCandidacies: 151,
      },
    },
    topParties: {
      PL: { total: 896235552.6, feminine: 253266362.7 },
      UNIÃO: { total: 594292305.77, feminine: 217294895.48 },
      PSD: { total: 503065539.04, feminine: 148768883.4 },
      REPUBLICANOS: { total: 498096840.78, feminine: 162632051.73 },
      PT: { total: 488559926.66, feminine: 221136216.02 },
    },
    byUf: {
      SP: { total: 888860706.03, feminine: 277102097.61 },
      MG: { total: 475005292.94, feminine: 137637732.74 },
      RJ: { total: 443313645.22, feminine: 150913446.15 },
      BA: { total: 322482345.42, feminine: 104242129.74 },
      PR: { total: 315241108.43, feminine: 93862478.41 },
      RS: { total: 271160206.56, feminine: 89100576.24 },
      PE: { total: 224019612.21, feminine: 70793585.44 },
      CE: { total: 215605828.2, feminine: 77267547.71 },
      MA: { total: 201464139.76, feminine: 65652851.09 },
      GO: { total: 193787177.16, feminine: 68990858.92 },
      SC: { total: 189747882.75, feminine: 59000443.61 },
      PA: { total: 173954410.81, feminine: 63699113.99 },
      MT: { total: 137575399.47, feminine: 45101197.66 },
      DF: { total: 134261525.21, feminine: 37496681.77 },
      AM: { total: 129266890.57, feminine: 39940972.81 },
      PI: { total: 121578827.51, feminine: 39578390.79 },
      RO: { total: 117849560.79, feminine: 40585790.36 },
      PB: { total: 117451319.54, feminine: 35753514.48 },
      ES: { total: 114563251.41, feminine: 35389484.15 },
      MS: { total: 103475877.18, feminine: 38233329.97 },
      AP: { total: 101581692.0, feminine: 42851727.64 },
      SE: { total: 96450556.83, feminine: 36908573.23 },
      AL: { total: 95620652.99, feminine: 31596303.78 },
      RR: { total: 91736630.42, feminine: 40063754.36 },
      TO: { total: 86459044.31, feminine: 27329462.4 },
      AC: { total: 85981829.21, feminine: 34414713.96 },
      RN: { total: 80482246.74, feminine: 34156888.92 },
    },
  },
  majoritario: {
    registeredCandidacies: 534,
    candidaciesWithRevenue: 525,
    registeredFeminineCandidacies: 107,
    feminineCandidaciesWithRevenue: 107,
    totalRevenue: 1456280851.17,
    feminineRevenue: 217372180.31,
    feminineMedian: 207500.0,
    masculineMedian: 391318.34,
    feminineRevenueByRace: {
      BRANCA: { value: 176697943.07, candidacies: 65 },
      PARDA: { value: 24023381.49, candidacies: 24 },
      PRETA: { value: 16614895.24, candidacies: 17 },
      AMARELA: { value: 35960.51, candidacies: 1 },
    },
    byOffice: {
      SENADOR: {
        total: 538672166.25,
        feminine: 137783440.49,
        candidacies: 315,
        feminineCandidacies: 70,
      },
      GOVERNADOR: {
        total: 632438616.14,
        feminine: 77069437.82,
        candidacies: 197,
        feminineCandidacies: 35,
      },
      PRESIDENTE: {
        total: 285170068.78,
        feminine: 2519302.0,
        candidacies: 13,
        feminineCandidacies: 2,
      },
    },
  },
};
const MEDIAN_BY_RACE = {
  proporcional: {
    BRANCA: 84247.9,
    PARDA: 51770.17,
    INDÍGENA: 113500.0,
    PRETA: 52804.0,
    AMARELA: 33628.5,
  },
  majoritario: { BRANCA: 2478357.13, PRETA: 59393.67, PARDA: 73413.33, AMARELA: 35960.51 },
};

export const financeSnapshot: TseFinanceSnapshot = {
  datasetUrl: "https://dadosabertos.tse.jus.br/dataset/prestacao-de-contas-eleitorais-2026",
  resourceUrl:
    "https://cdn.tse.jus.br/estatistica/sead/odsele/prestacao_contas/prestacao_de_contas_eleitorais_candidatos_2026.zip",
  sourceFile: FINANCE_SOURCE_FILE,
  csvSha256: FINANCE_CSV_SHA256,
  baseGeneratedAt: "2026-11-04T04:05:12-03:00",
  revenueRowsProcessed: 253610,
  candidaciesWithRevenue: 19607,
  filters: [
    "Unidade de análise: candidatura (SQ_CANDIDATO), receita = soma de VR_RECEITA",
    "Linhas idênticas em todas as colunas entram uma única vez (948 removidas)",
    "Gênero, cor/raça, cargo, UF e partido lidos do registro de candidaturas (base de 27/10/2026)",
    "Receitas dos dois turnos somadas; prestação final do 1º turno (19.034 finais, 343 parciais e 230 relatórios financeiros); o 2º turno ainda entrega contas",
    "Cor/raça nas categorias originais do TSE, sem agregação",
  ],
  universes: {
    proporcional: { ...UNIVERSES.proporcional, feminineMedianByRace: MEDIAN_BY_RACE.proporcional },
    majoritario: { ...UNIVERSES.majoritario, feminineMedianByRace: MEDIAN_BY_RACE.majoritario },
  } as TseFinanceSnapshot["universes"],
};
