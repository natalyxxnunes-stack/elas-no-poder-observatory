/**
 * Fotografia financeira oficial de 17/11/2026 (09:03:49, conforme CSV do TSE).
 * Cruzada com Candidatos 2026 gerados em 17/11/2026 às 19:31:29.
 *
 * Dados agregados recontados pelos scripts existentes, não digitados à mão.
 * Fonte versionada: docs/auditorias/financiamento-2026-17nov/receitas-agregadas.json.
 * Os hashes, critérios, duplicatas e a conciliação independente com o método
 * original estão em docs/auditorias/financiamento-2026-17nov/.
 *
 * IMPORTANTE: a base foi gerada em 17/11, após o prazo do 2º turno (16/11),
 * mas ainda inclui contas parciais e relatórios financeiros. Continua sujeita
 * a complementações, retificações e julgamento da Justiça Eleitoral.
 *
 * Universo: candidaturas titulares, com receitas declaradas, classificadas
 * pelas informações de gênero e cor/raça do registro mais recente. Mulheres
 * pretas e pardas permanecem categorias separadas; não há imputação de dados.
 */
import { classifyUniverse, type UniverseId } from "@/lib/tse/compute";
import receitas from "../../docs/auditorias/financiamento-2026-17nov/receitas-agregadas.json";

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
  "5c9b1e0456a8aa75bdecc5ac7ffc2bb52d4bbaa0099ec675a13b6ab73c0e04ba";
export const FINANCE_SOURCE_FILE = "receitas_candidatos_2026_BRASIL.csv";
export const FINANCE_BASE_LABEL = "17/11/2026";
export const DUPLICATE_ROWS_REMOVED = 981;
export const classifyFinanceUniverse = classifyUniverse;

export const financeSnapshot: TseFinanceSnapshot = {
  datasetUrl: "https://dadosabertos.tse.jus.br/pt_BR/dataset/prestacao-de-contas-eleitorais-2026",
  resourceUrl: "https://cdn.tse.jus.br/estatistica/sead/odsele/prestacao_contas/prestacao_de_contas_eleitorais_candidatos_2026.zip",
  sourceFile: FINANCE_SOURCE_FILE,
  csvSha256: FINANCE_CSV_SHA256,
  baseGeneratedAt: "2026-11-17T09:03:49-03:00",
  revenueRowsProcessed: receitas.rowsProcessed,
  candidaciesWithRevenue: receitas.candidaciesWithRevenue,
  filters: [
    "Unidade de análise: candidatura (SQ_CANDIDATO); receita = soma de VR_RECEITA",
    "Linhas idênticas em todas as colunas entram uma única vez (981 removidas; R$ 773.961,81)",
    "Gênero, cor/raça, cargo, UF e partido do registro de candidaturas de 17/11/2026 às 19:31:29",
    "Todos os turnos: 19.383 candidaturas com prestação FINAL; 186 PARCIAL e 96 RELATÓRIO FINANCEIRO. Base de 17/11, após o prazo final do segundo turno (16/11), ainda sujeita a retificações e julgamento; tipo de prestação não significa aprovação das contas",
    "Cor/raça nas categorias originais do TSE, com pretas e pardas separadas",
    "O cadastro de 17/11 preserva 19.531 candidaturas proporcionais e 6.953 mulheres; a classificação racial foi atualizada entre 27/10 e 15/11. A totalização eleitoral de Rondônia aparece incompleta em 17/11: os resultados de eleitas continuam no corte íntegro de 27/10",
  ],
  universes: {
    proporcional: receitas.universes.proporcional,
    majoritario: receitas.universes.majoritario,
  },
};
