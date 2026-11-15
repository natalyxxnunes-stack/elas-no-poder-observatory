/**
 * Fotografia financeira oficial de 13/11/2026 (15:07:34, conforme CSV do TSE).
 * Cruza com Candidatos 2026 de 14/11/2026 (16:31:37).
 *
 * Dados agregados recontados pelos scripts existentes, não digitados à mão.
 * Fonte versionada: docs/auditorias/financiamento-2026-13nov/receitas-agregadas.json.
 * Os hashes, critérios, duplicatas e verificações cruzadas estão documentados
 * em docs/auditorias/financiamento-2026-13nov/ e na auditoria de 15/11/2026.
 *
 * IMPORTANTE: o arquivo de receitas é ANTERIOR ao prazo final do 2º turno
 * (14/11). Algumas candidaturas ainda possuem contas parciais ou relatórios
 * financeiros. Esta fotografia não equivale a julgamento definitivo de contas.
 *
 * Universo: candidaturas titulares, com receitas declaradas, classificadas
 * pelas informações de gênero e cor/raça do registro mais recente. Mulheres
 * pretas e pardas permanecem categorias separadas; não há imputação de dados.
 */
import { classifyUniverse, type UniverseId } from "@/lib/tse/compute";
import receitas from "../../docs/auditorias/financiamento-2026-13nov/receitas-agregadas.json";

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
  "722c27a3c71ed4ed2c268b4baae189e1231ae95be2f40bb2bd1edc4e2bc7f35b";
export const FINANCE_SOURCE_FILE = "receitas_candidatos_2026_BRASIL.csv";
export const FINANCE_BASE_LABEL = "13/11/2026";
export const DUPLICATE_ROWS_REMOVED = 977;
export const classifyFinanceUniverse = classifyUniverse;

export const financeSnapshot: TseFinanceSnapshot = {
  datasetUrl: "https://dadosabertos.tse.jus.br/pt_BR/dataset/prestacao-de-contas-eleitorais-2026",
  resourceUrl: "https://cdn.tse.jus.br/estatistica/sead/odsele/prestacao_contas/prestacao_de_contas_eleitorais_candidatos_2026.zip",
  sourceFile: FINANCE_SOURCE_FILE,
  csvSha256: FINANCE_CSV_SHA256,
  baseGeneratedAt: "2026-11-13T15:07:34-03:00",
  revenueRowsProcessed: receitas.rowsProcessed,
  candidaciesWithRevenue: receitas.candidaciesWithRevenue,
  filters: [
    "Unidade de análise: candidatura (SQ_CANDIDATO); receita = soma de VR_RECEITA",
    "Linhas idênticas em todas as colunas entram uma única vez (977 removidas; R$ 769.441,81)",
    "Gênero, cor/raça, cargo, UF e partido do registro de candidaturas de 14/11/2026 às 16:31:37",
    "Todos os turnos: 19.333 candidaturas com prestação FINAL; 203 PARCIAL e 119 RELATÓRIO FINANCEIRO. Base gerada em 13/11, antes do prazo final do segundo turno (14/11)",
    "Cor/raça nas categorias originais do TSE, com pretas e pardas separadas",
    "As bases de candidaturas de 27/10 e 14/11 não são idênticas: sem alteração no total proporcional ou no total feminino; uma classificação PRETA/PARDA foi revista",
  ],
  universes: {
    proporcional: receitas.universes.proporcional,
    majoritario: receitas.universes.majoritario,
  },
};
