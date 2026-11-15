/**
 * Fotografia financeira oficial de 15/11/2026 (04:05:10, conforme CSV do TSE).
 * Cruza com Candidatos 2026 de 15/11/2026 (05:30:40).
 *
 * Dados agregados recontados pelos scripts existentes, não digitados à mão.
 * Fonte versionada: docs/auditorias/financiamento-2026-15nov/receitas-agregadas.json.
 * Os hashes, critérios, duplicatas e verificações cruzadas estão documentados
 * em docs/auditorias/financiamento-2026-15nov/ e na auditoria de 15/11/2026.
 *
 * IMPORTANTE: a base foi gerada em 15/11, após o prazo do 2º turno (14/11),
 * mas ainda inclui contas parciais e relatórios financeiros. Continua sujeita
 * a complementações, retificações e julgamento da Justiça Eleitoral.
 *
 * Universo: candidaturas titulares, com receitas declaradas, classificadas
 * pelas informações de gênero e cor/raça do registro mais recente. Mulheres
 * pretas e pardas permanecem categorias separadas; não há imputação de dados.
 */
import { classifyUniverse, type UniverseId } from "@/lib/tse/compute";
import receitas from "../../docs/auditorias/financiamento-2026-15nov/receitas-agregadas.json";

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
  "73ec0cd7727edd6ef3f9b69e7158f0e9dbb02a772a47e01e01374d004f4bdd90";
export const FINANCE_SOURCE_FILE = "receitas_candidatos_2026_BRASIL.csv";
export const FINANCE_BASE_LABEL = "15/11/2026";
export const DUPLICATE_ROWS_REMOVED = 982;
export const classifyFinanceUniverse = classifyUniverse;

export const financeSnapshot: TseFinanceSnapshot = {
  datasetUrl: "https://dadosabertos.tse.jus.br/pt_BR/dataset/prestacao-de-contas-eleitorais-2026",
  resourceUrl: "https://cdn.tse.jus.br/estatistica/sead/odsele/prestacao_contas/prestacao_de_contas_eleitorais_candidatos_2026.zip",
  sourceFile: FINANCE_SOURCE_FILE,
  csvSha256: FINANCE_CSV_SHA256,
  baseGeneratedAt: "2026-11-15T04:05:10-03:00",
  revenueRowsProcessed: receitas.rowsProcessed,
  candidaciesWithRevenue: receitas.candidaciesWithRevenue,
  filters: [
    "Unidade de análise: candidatura (SQ_CANDIDATO); receita = soma de VR_RECEITA",
    "Linhas idênticas em todas as colunas entram uma única vez (982 removidas; R$ 778.961,81)",
    "Gênero, cor/raça, cargo, UF e partido do registro de candidaturas de 15/11/2026 às 05:30:40",
    "Todos os turnos: 19.363 candidaturas com prestação FINAL; 195 PARCIAL e 102 RELATÓRIO FINANCEIRO. Base gerada em 15/11, após o prazo final do segundo turno (14/11), ainda sujeita a retificações e julgamento",
    "Cor/raça nas categorias originais do TSE, com pretas e pardas separadas",
    "As bases de candidaturas de 27/10 e 15/11 não são idênticas: sem alteração no total proporcional ou no total feminino; uma classificação PRETA/PARDA foi revista",
  ],
  universes: {
    proporcional: receitas.universes.proporcional,
    majoritario: receitas.universes.majoritario,
  },
};
