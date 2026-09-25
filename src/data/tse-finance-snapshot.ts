/**
 * tse-finance-snapshot — fotografia fixa das receitas de campanha de 2026.
 *
 * Recontagem independente de `receitas_candidatos_2026_BRASIL.csv` (latin1, `;`),
 * base gerada pelo TSE em 25/09/2026 às 04:05:48, SHA-256
 * dcef6b81fe3dd044afdeb952a671c6fab0d11561b14bfd35e03ae5e0fc147e28, cruzada por
 * SQ_CANDIDATO com `consulta_cand_2026_BRASIL.csv` de 25/09/2026 às 12:31:26
 * (SHA-256 0327ca7868179bd780249a3529f5d3b0bbe5218067a159372f2b89c372a5fe54).
 *
 * Auditoria: 131.469 linhas brutas; 238 linhas idênticas em todas as colunas
 * removidas (R$ 342.773,78); 131.231 linhas somadas. As 19.105 candidaturas com
 * receita têm par no registro, com gênero e cor/raça idênticos em 100% das linhas.
 * Nenhuma candidatura aparece com prestação parcial e relatório financeiro ao mesmo tempo.
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

export const FINANCE_CSV_SHA256 = "dcef6b81fe3dd044afdeb952a671c6fab0d11561b14bfd35e03ae5e0fc147e28";
export const FINANCE_SOURCE_FILE = "receitas_candidatos_2026_BRASIL.csv";
export const FINANCE_BASE_LABEL = "25/09/2026";
export const DUPLICATE_ROWS_REMOVED = 238;
export const classifyFinanceUniverse = classifyUniverse;

const UNIVERSES = {"proporcional":{"registeredCandidacies":19528,"candidaciesWithRevenue":18584,"registeredFeminineCandidacies":6951,"feminineCandidaciesWithRevenue":6691,"totalRevenue":4757620533.41,"feminineRevenue":1660618860.06,"feminineMedian":53470.04,"masculineMedian":50000.0,"feminineRevenueByRace":{"BRANCA":{"value":925086607.8,"candidacies":3145},"PARDA":{"value":461323841.67,"candidacies":2270},"PRETA":{"value":240730182.13,"candidacies":1157},"INDÍGENA":{"value":26405598.4,"candidacies":80},"AMARELA":{"value":7072630.06,"candidacies":39}},"byOffice":{"DEPUTADO FEDERAL":{"total":3171353262.87,"feminine":1050416428.07,"candidacies":7428,"feminineCandidacies":2756},"DEPUTADO ESTADUAL":{"total":1546925328.15,"feminine":598416098.55,"candidacies":10744,"feminineCandidacies":3787},"DEPUTADO DISTRITAL":{"total":39341942.39,"feminine":11786333.44,"candidacies":412,"feminineCandidacies":148}},"topParties":{"PL":{"total":791865254.59,"feminine":231083766.9},"UNIÃO":{"total":526764572.22,"feminine":204386614.02},"REPUBLICANOS":{"total":434772618.12,"feminine":148805557.23},"PT":{"total":431288843.16,"feminine":209282624.75},"PP":{"total":424632641.26,"feminine":143729626.93}},"byUf":{"SP":{"total":763118761.41,"feminine":256288325.93},"MG":{"total":399229955.47,"feminine":123306778.84},"RJ":{"total":396910946.59,"feminine":142492743.72},"BA":{"total":284122925.45,"feminine":93842532.99},"PR":{"total":257189256.01,"feminine":85523346.35},"RS":{"total":240585798.21,"feminine":81927566.09},"PE":{"total":196114783.33,"feminine":65662702.12},"CE":{"total":188218224.2,"feminine":70087446.23},"MA":{"total":173883264.24,"feminine":58869767.5},"SC":{"total":162898856.9,"feminine":53806151.63},"GO":{"total":158811660.81,"feminine":61602329.98},"PA":{"total":147829527.84,"feminine":56460783.49},"PI":{"total":110827081.03,"feminine":37721617.74},"DF":{"total":110217829.21,"feminine":30527139.66},"AM":{"total":106837171.11,"feminine":35055615.3},"PB":{"total":105308731.17,"feminine":33065157.86},"MT":{"total":103555890.16,"feminine":39289950.41},"ES":{"total":95957377.79,"feminine":32016932.23},"RO":{"total":95488618.7,"feminine":35970568.17},"MS":{"total":94271050.62,"feminine":35619668.26},"AP":{"total":88731241.21,"feminine":39709290.09},"AL":{"total":85940281.92,"feminine":29467722.83},"RR":{"total":85806670.84,"feminine":38898849.27},"SE":{"total":84238123.19,"feminine":33937731.2},"TO":{"total":75936278.06,"feminine":25567913.45},"AC":{"total":75125249.78,"feminine":31884486.05},"RN":{"total":70464978.16,"feminine":32015742.67}}},"majoritario":{"registeredCandidacies":534,"candidaciesWithRevenue":521,"registeredFeminineCandidacies":107,"feminineCandidaciesWithRevenue":107,"totalRevenue":1164782071.85,"feminineRevenue":192575644.96,"feminineMedian":130855.49,"masculineMedian":280808.75,"feminineRevenueByRace":{"BRANCA":{"value":154509364.75,"candidacies":65},"PARDA":{"value":23118520.67,"candidacies":24},"PRETA":{"value":14923444.54,"candidacies":17},"AMARELA":{"value":24315.0,"candidacies":1}},"byOffice":{"GOVERNADOR":{"total":536925924.7,"feminine":64398053.48,"candidacies":195,"feminineCandidacies":35},"SENADOR":{"total":479280017.97,"feminine":126220169.54,"candidacies":313,"feminineCandidacies":70},"PRESIDENTE":{"total":148576129.18,"feminine":1957421.94,"candidacies":13,"feminineCandidacies":2}}}} as const;
const MEDIAN_BY_RACE = {"proporcional":{"PRETA":50000.0,"PARDA":45993.49,"BRANCA":70000.0,"INDÍGENA":110150.75,"AMARELA":20000.0},"majoritario":{"BRANCA":1618095.17,"PRETA":35530.0,"PARDA":45126.0,"AMARELA":24315.0}} as const;

export const financeSnapshot: TseFinanceSnapshot = {
  datasetUrl: "https://dadosabertos.tse.jus.br/dataset/prestacao-de-contas-eleitorais-2026",
  resourceUrl: "https://cdn.tse.jus.br/estatistica/sead/odsele/prestacao_contas/prestacao_de_contas_eleitorais_candidatos_2026.zip",
  sourceFile: FINANCE_SOURCE_FILE,
  csvSha256: FINANCE_CSV_SHA256,
  baseGeneratedAt: "2026-09-25T04:05:48-03:00",
  revenueRowsProcessed: 131231,
  candidaciesWithRevenue: 19105,
  filters: [
    "Unidade de análise: candidatura (SQ_CANDIDATO), receita = soma de VR_RECEITA",
    "Linhas idênticas em todas as colunas entram uma única vez (238 removidas)",
    "Gênero, cor/raça, cargo, UF e partido lidos do registro de candidaturas de 25/09/2026",
    "Contas em andamento: valores mudam até a prestação final",
    "Cor/raça nas categorias originais do TSE, sem agregação",
  ],
  universes: {
    proporcional: { ...UNIVERSES.proporcional, feminineMedianByRace: MEDIAN_BY_RACE.proporcional },
    majoritario: { ...UNIVERSES.majoritario, feminineMedianByRace: MEDIAN_BY_RACE.majoritario },
  } as TseFinanceSnapshot["universes"],
};
