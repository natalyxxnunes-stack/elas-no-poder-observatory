/**
 * tse-finance-snapshot — fotografia fixa das receitas de campanha de 2026.
 *
 * A fotografia vigente está CRAVADA neste arquivo: o site estático exibe
 * sempre estes números, sem consultar o banco em tempo de execução. Os valores
 * vêm de recontagem independente do arquivo oficial
 * `receitas_candidatos_2026_BRASIL.csv` (encoding latin1, separador `;`),
 * SHA-256 ef4dbd6e93eb99ffcb7597e79fde42ab5009b8625cd3250c3b8b876c0c2ce0be,
 * base gerada em 23/09/2026 às 04:05:59, horário de Brasília.
 *
 * Regra: nada aqui pode ser preenchido à mão com número plausível. Apenas
 * saída verificável do processamento de TSE / Dados Abertos / Prestação de
 * Contas Eleitorais 2026 fornecida pela apuração editorial.
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
  tipoPrestacaoContas: Record<string, number>;
  filters: string[];
  universes: Record<UniverseId, FinanceUniverseSnapshot>;
};

export const FINANCE_CSV_SHA256 =
  "ef4dbd6e93eb99ffcb7597e79fde42ab5009b8625cd3250c3b8b876c0c2ce0be";

export const FINANCE_SOURCE_FILE = "receitas_candidatos_2026_BRASIL.csv";

/** A mesma classificação de cargos usada na fotografia de candidaturas. */
export const classifyFinanceUniverse = classifyUniverse;

export const financeSnapshot: TseFinanceSnapshot = {
  datasetUrl: "https://dadosabertos.tse.jus.br/dataset/prestacao-de-contas-eleitorais-2026",
  resourceUrl:
    "https://cdn.tse.jus.br/estatistica/sead/odsele/prestacao_contas/prestacao_de_contas_eleitorais_candidatos_2026.zip",
  sourceFile: FINANCE_SOURCE_FILE,
  csvSha256: FINANCE_CSV_SHA256,
  baseGeneratedAt: "2026-09-23T04:05:59-03:00",
  revenueRowsProcessed: 125149,
  candidaciesWithRevenue: 19069,
  tipoPrestacaoContas: { PARCIAL: 50098, "RELATÓRIO FINANCEIRO": 75051 },
  filters: [
    "Unidade de análise: candidatura (SQ_CANDIDATO), com receita agregada pela soma de todas as linhas de VR_RECEITA da candidatura",
    "Gênero e cor/raça lidos diretamente de DS_GENERO e DS_COR_RACA no arquivo de receitas, sem cruzamento com o arquivo de candidaturas",
    "Universos proporcional e majoritário classificados por DS_CARGO com a mesma função classifyUniverse usada na fotografia de candidaturas",
    "Sem filtro por TP_PRESTACAO_CONTAS: receitas de Parcial e Relatório Financeiro são somadas; a distribuição das linhas é preservada para transparência",
    "Prestação de contas em andamento: os valores não representam o resultado final pós-eleição e mudam até o fim da apuração",
    "Cor/raça preservada nas categorias originais do TSE, sem agregação",
  ],
  universes: {
    proporcional: {
      registeredCandidacies: 19527,
      candidaciesWithRevenue: 18548,
      registeredFeminineCandidacies: 6950,
      feminineCandidaciesWithRevenue: 6678,
      totalRevenue: 4669595752.32,
      feminineRevenue: 1645449830.33,
      feminineMedian: 52529.42,
      masculineMedian: 47639.82,
      feminineRevenueByRace: {
        BRANCA: { value: 915206585.22, candidacies: 3140 },
        PARDA: { value: 457686638.71, candidacies: 2263 },
        PRETA: { value: 239133482.94, candidacies: 1156 },
        "INDÍGENA": { value: 26367493.4, candidacies: 80 },
        AMARELA: { value: 7055630.06, candidacies: 39 },
      },
      byOffice: {
        "DEPUTADO FEDERAL": { total: 3124543875.63, feminine: 1044825126.05, candidacies: 7417, feminineCandidacies: 2753 },
        "DEPUTADO ESTADUAL": { total: 1507459676.46, feminine: 589340075.55, candidacies: 10719, feminineCandidacies: 3777 },
        "DEPUTADO DISTRITAL": { total: 37592200.23, feminine: 11284628.73, candidacies: 412, feminineCandidacies: 148 },
      },
      topParties: {
        PL: { total: 779178927.57, feminine: 229086735.76 },
        "UNIÃO": { total: 515228838.36, feminine: 202860579.8 },
        REPUBLICANOS: { total: 428442849.47, feminine: 147009989.77 },
        PT: { total: 426489540.26, feminine: 208147732.79 },
        PP: { total: 420325747.35, feminine: 142639034.02 },
      },
      byUf: {
        SP: { total: 747189388.37, feminine: 253722732.54 }, MG: { total: 392134150.2, feminine: 121888944.95 }, RJ: { total: 391466301.65, feminine: 141843254.25 },
        BA: { total: 278976391.13, feminine: 93208010.99 }, PR: { total: 249507181.3, feminine: 84178402.02 }, RS: { total: 236744502.53, feminine: 81128556.3 },
        PE: { total: 194109526.1, feminine: 65249972.72 }, CE: { total: 183671968.53, feminine: 69599777.61 }, MA: { total: 171092244.24, feminine: 58562037.5 },
        SC: { total: 160095746.95, feminine: 53486489.93 }, GO: { total: 154620613.14, feminine: 60836112.49 }, PA: { total: 144766451.92, feminine: 55516523.49 },
        PI: { total: 110030611.4, feminine: 37506900.48 }, DF: { total: 107141785.05, feminine: 29620714.95 }, AM: { total: 104256090.97, feminine: 33927400.3 },
        PB: { total: 103509509.65, feminine: 32866467.86 }, MT: { total: 100703099.98, feminine: 38735382.4 }, ES: { total: 95011977.78, feminine: 31818648.82 },
        RO: { total: 93788777.68, feminine: 35839856.14 }, MS: { total: 92119105.08, feminine: 35304443.26 }, AL: { total: 85415529.32, feminine: 29286522.83 },
        RR: { total: 85184759.21, feminine: 38768849.27 }, AP: { total: 85098794.99, feminine: 39702790.09 }, SE: { total: 83482200.86, feminine: 33655085.87 },
        TO: { total: 75364042.68, feminine: 25332724.55 }, AC: { total: 74545549.78, feminine: 31849486.05 }, RN: { total: 69569451.83, feminine: 32013742.67 },
      },
    },
    majoritario: {
      registeredCandidacies: 534,
      candidaciesWithRevenue: 521,
      registeredFeminineCandidacies: 107,
      feminineCandidaciesWithRevenue: 107,
      totalRevenue: 1135925425.1,
      feminineRevenue: 190764332.93,
      feminineMedian: 130419.49,
      masculineMedian: 255000,
      feminineRevenueByRace: {
        BRANCA: { value: 153265564.6, candidacies: 65 },
        PARDA: { value: 23038841.55, candidacies: 24 },
        PRETA: { value: 14435611.78, candidacies: 17 },
        AMARELA: { value: 24315, candidacies: 1 },
      },
      byOffice: {
        PRESIDENTE: { total: 137949190.58, feminine: 1795720, candidacies: 13, feminineCandidacies: 2 },
        GOVERNADOR: { total: 526733584.75, feminine: 63899477.33, candidacies: 195, feminineCandidacies: 35 },
        SENADOR: { total: 471242649.77, feminine: 125069135.6, candidacies: 313, feminineCandidacies: 70 },
      },
    },
  },
};