/**
 * tse-finance-snapshot — fotografia fixa das receitas de campanha de 2026.
 *
 * A fotografia vigente está CRAVADA neste arquivo: o site estático exibe
 * sempre estes números, sem consultar o banco em tempo de execução. Os valores
 * vêm de recontagem independente do arquivo oficial
 * `receitas_candidatos_2026_BRASIL.csv` (encoding latin1, separador `;`),
 * SHA-256 9ee710ae089a53515e2fc3e9f85ef37ed384fb97b5c0af624c9c62387773ed7e,
 * base gerada pelo TSE em 24/09/2026 às 04:05:21, cruzado por SQ_CANDIDATO com
 * `consulta_cand_2026_BRASIL.csv` gerado em 24/09/2026 às 16:30:45
 * (SHA-256 519cf90eb30ca876b2451e0f500249206a3238abd010dd96f27982f065035215).
 *
 * Auditoria desta fotografia: 128.121 linhas brutas; 176 linhas idênticas em
 * todas as colunas removidas (R$ 215.775,58); 127.945 linhas somadas. As 19.092
 * candidaturas com receita têm par no registro, com gênero, cor/raça, cargo e UF
 * idênticos. Nenhuma candidatura aparece com prestação parcial e relatório
 * financeiro ao mesmo tempo: o arquivo traz uma entrega por candidatura.
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
  "9ee710ae089a53515e2fc3e9f85ef37ed384fb97b5c0af624c9c62387773ed7e";

export const FINANCE_SOURCE_FILE = "receitas_candidatos_2026_BRASIL.csv";

/** Data da base financeira, para texto (DD/MM/AAAA). */
export const FINANCE_BASE_LABEL = "24/09/2026";

/** Linhas idênticas em todas as colunas removidas nesta base (auditoria). */
export const DUPLICATE_ROWS_REMOVED = 176;

/** A mesma classificação de cargos usada na fotografia de candidaturas. */
export const classifyFinanceUniverse = classifyUniverse;

export const APPLIED_FILTERS = [
  "Unidade de análise: candidatura (SQ_CANDIDATO), com receita agregada pela soma de todas as linhas de VR_RECEITA da candidatura",
  "Gênero e cor/raça lidos de DS_GENERO e DS_COR_RACA no arquivo de receitas; conferidos por SQ_CANDIDATO contra o registro de candidaturas de 24/09/2026, com 100% de coincidência",
  "Universos proporcional e majoritário classificados por DS_CARGO com a mesma função classifyUniverse usada na fotografia de candidaturas",
  "Deduplicação: linhas idênticas em todas as colunas entram uma única vez (176 linhas removidas nesta base). Linhas com o mesmo SQ_RECEITA e descrição ou valor diferentes são rateio de um mesmo recibo e são somadas",
  "Prestação parcial e relatório financeiro: cada candidatura aparece no arquivo com uma única entrega, a mais recente; nenhuma aparece nos dois tipos, então a soma não conta a mesma receita duas vezes. A data de corte varia por candidatura",
  "Contas de campanha em andamento: os valores não representam o resultado final pós-eleição e mudam até o fim da apuração",
  "Cor/raça preservada nas categorias originais do TSE, sem agregação",
] as const;

export const financeSnapshot: TseFinanceSnapshot = {
  datasetUrl: "https://dadosabertos.tse.jus.br/dataset/prestacao-de-contas-eleitorais-2026",
  resourceUrl:
    "https://cdn.tse.jus.br/estatistica/sead/odsele/prestacao_contas/prestacao_de_contas_eleitorais_candidatos_2026.zip",
  sourceFile: FINANCE_SOURCE_FILE,
  csvSha256: FINANCE_CSV_SHA256,
  baseGeneratedAt: "2026-09-24T04:05:21-03:00",
  revenueRowsProcessed: 127945,
  candidaciesWithRevenue: 19092,
  tipoPrestacaoContas: { PARCIAL: 47957, "RELATÓRIO FINANCEIRO": 79988 },
  filters: [...APPLIED_FILTERS],
  universes: {
    proporcional: {
      registeredCandidacies: 19528,
      candidaciesWithRevenue: 18571,
      registeredFeminineCandidacies: 6951,
      feminineCandidaciesWithRevenue: 6686,
      totalRevenue: 4710460488.32,
      feminineRevenue: 1652595257.81,
      feminineMedian: 53000.0,
      masculineMedian: 50000.0,
      feminineRevenueByRace: {
        "BRANCA": { value: 919492810.84, candidacies: 3143 },
        "PARDA": { value: 459838283.3, candidacies: 2267 },
        "PRETA": { value: 239788595.21, candidacies: 1157 },
        "INDÍGENA": { value: 26402938.4, candidacies: 80 },
        "AMARELA": { value: 7072630.06, candidacies: 39 },
      },
      byOffice: {
        "DEPUTADO ESTADUAL": { total: 1526494094.51, feminine: 593155068.99, candidacies: 10735, feminineCandidacies: 3784 },
        "DEPUTADO FEDERAL": { total: 3145544163.89, feminine: 1047855568.39, candidacies: 7424, feminineCandidacies: 2754 },
        "DEPUTADO DISTRITAL": { total: 38422229.92, feminine: 11584620.43, candidacies: 412, feminineCandidacies: 148 },
      },
      topParties: {
        "PL": { total: 783803293.86, feminine: 230248604.5 },
        "UNIÃO": { total: 520561102.91, feminine: 204033224.02 },
        "REPUBLICANOS": { total: 431198976.97, feminine: 147542767.23 },
        "PT": { total: 429110314.94, feminine: 208607949.57 },
        "PP": { total: 422215197.35, feminine: 143358744.02 },
      },
      byUf: {
        "SP": { total: 755716258.91, feminine: 254884258.86 },
        "MG": { total: 395818075.33, feminine: 122710735.84 },
        "RJ": { total: 393704961.23, feminine: 142108884.59 },
        "BA": { total: 280466514.39, feminine: 93523954.32 },
        "PR": { total: 253253806.24, feminine: 84279532.26 },
        "RS": { total: 238384967.62, feminine: 81203238.78 },
        "PE": { total: 195055421.11, feminine: 65320619.22 },
        "CE": { total: 184558558.99, feminine: 69769587.61 },
        "MA": { total: 172271399.24, feminine: 58588367.5 },
        "SC": { total: 161400830.5, feminine: 53641551.23 },
        "GO": { total: 156629119.09, feminine: 61229329.98 },
        "PA": { total: 146400365.92, feminine: 56368623.49 },
        "PI": { total: 110218963.77, feminine: 37606900.48 },
        "DF": { total: 109247284.74, feminine: 30318906.65 },
        "AM": { total: 105339832.47, feminine: 34599395.3 },
        "PB": { total: 104292894.65, feminine: 32985657.86 },
        "MT": { total: 101508654.88, feminine: 38976060.56 },
        "ES": { total: 95544775.88, feminine: 31913211.82 },
        "RO": { total: 94587715.17, feminine: 35904293.64 },
        "MS": { total: 93073990.93, feminine: 35607268.26 },
        "AP": { total: 87428714.99, feminine: 39707290.09 },
        "AL": { total: 85481163.32, feminine: 29294722.83 },
        "RR": { total: 85382659.21, feminine: 38768849.27 },
        "SE": { total: 84107642.19, feminine: 33926731.2 },
        "TO": { total: 75610982.61, feminine: 25457057.45 },
        "AC": { total: 74864049.78, feminine: 31884486.05 },
        "RN": { total: 70110885.16, feminine: 32015742.67 },
      },
    },
    majoritario: {
      registeredCandidacies: 534,
      candidaciesWithRevenue: 521,
      registeredFeminineCandidacies: 107,
      feminineCandidaciesWithRevenue: 107,
      totalRevenue: 1153957982.71,
      feminineRevenue: 190991666.11,
      feminineMedian: 130855.49,
      masculineMedian: 255000.0,
      feminineRevenueByRace: {
        "BRANCA": { value: 153368631.1, candidacies: 65 },
        "PARDA": { value: 23042748.23, candidacies: 24 },
        "PRETA": { value: 14555971.78, candidacies: 17 },
        "AMARELA": { value: 24315.0, candidacies: 1 },
      },
      byOffice: {
        "GOVERNADOR": { total: 531269212.68, feminine: 64011903.83, candidacies: 195, feminineCandidacies: 35 },
        "SENADOR": { total: 474415904.92, feminine: 125184042.28, candidacies: 313, feminineCandidacies: 70 },
        "PRESIDENTE": { total: 148272865.11, feminine: 1795720.0, candidacies: 13, feminineCandidacies: 2 },
      },
    },
  },
};
