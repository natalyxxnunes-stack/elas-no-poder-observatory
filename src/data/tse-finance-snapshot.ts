/**
 * Fotografia financeira oficial de 25/11/2026 (04:05:30, conforme CSV do TSE).
 * Cruzada com Candidatos 2026 gerados em 25/11/2026 às 16:30:55.
 *
 * Dados agregados recontados pelos scripts existentes, não digitados à mão.
 * Fonte versionada: docs/auditorias/financiamento-2026-25nov/receitas-agregadas.json.
 * Os hashes, critérios, duplicatas e a conciliação independente com o método
 * original estão em docs/auditorias/financiamento-2026-25nov/.
 *
 * IMPORTANTE: a base foi gerada em 25/11, após o prazo do 2º turno (16/11),
 * mas ainda inclui contas parciais e relatórios financeiros. Continua sujeita
 * a complementações, retificações e julgamento da Justiça Eleitoral.
 *
 * Universo: candidaturas titulares, com receitas declaradas, classificadas
 * pelas informações de gênero e cor/raça do registro mais recente. Mulheres
 * pretas e pardas permanecem categorias separadas; não há imputação de dados.
 */
import { classifyUniverse, type UniverseId } from "@/lib/tse/compute";
import receitas from "../../docs/auditorias/financiamento-2026-25nov/receitas-agregadas.json";

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
  "7cbbb11fb8004591e42ebb1ec1432585740c5b2436cd5f3ff65765e921247f29";
export const FINANCE_SOURCE_FILE = "receitas_candidatos_2026_BRASIL.csv";
export const FINANCE_BASE_LABEL = "25/11/2026";
export const DUPLICATE_ROWS_REMOVED = 978;
export const classifyFinanceUniverse = classifyUniverse;

export const financeSnapshot: TseFinanceSnapshot = {
  datasetUrl: "https://dadosabertos.tse.jus.br/pt_BR/dataset/prestacao-de-contas-eleitorais-2026",
  resourceUrl: "https://cdn.tse.jus.br/estatistica/sead/odsele/prestacao_contas/prestacao_de_contas_eleitorais_candidatos_2026.zip",
  sourceFile: FINANCE_SOURCE_FILE,
  csvSha256: FINANCE_CSV_SHA256,
  baseGeneratedAt: "2026-11-25T04:05:30-03:00",
  revenueRowsProcessed: receitas.rowsProcessed,
  candidaciesWithRevenue: receitas.candidaciesWithRevenue,
  filters: [
    "Unidade de análise: candidatura (SQ_CANDIDATO); receita = soma de VR_RECEITA",
    "Linhas idênticas em todas as colunas entram uma única vez (978 removidas; R$ 770.684,00)",
    "Gênero, cor/raça, cargo, UF e partido do registro de candidaturas de 25/11/2026 às 16:30:55",
    "Todos os turnos: 19.454 candidaturas com prestação FINAL; 164 PARCIAL e 74 RELATÓRIO FINANCEIRO. Base de 25/11, após o prazo final do segundo turno (16/11), ainda sujeita a retificações e julgamento; tipo de prestação não significa aprovação das contas",
    "Cor/raça nas categorias originais do TSE, com pretas e pardas separadas",
    "O cadastro de 25/11 preserva 19.531 candidaturas proporcionais e 6.953 mulheres; a classificação racial foi atualizada entre 27/10 e 15/11. A totalização nacional de 25/11 permanece incompleta; a lacuna está nos registros proporcionais do Amapá: os resultados de eleitas continuam no corte íntegro de 27/10",
  ],
  universes: {
    proporcional: receitas.universes.proporcional,
    majoritario: receitas.universes.majoritario,
  },
};
