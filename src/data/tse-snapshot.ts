/**
 * tse-snapshot — ponto único de entrada dos números do site.
 *
 * A fotografia vigente está CRAVADA neste arquivo: o site estático exibe
 * sempre estes números, sem consultar o banco em tempo de execução. Os valores
 * vêm de recontagem independente do arquivo oficial
 * `consulta_cand_2026_BRASIL.csv` (dedup por SQ_CANDIDATO, encoding latin1,
 * separador `;`), SHA-256 do CSV
 * 1e08c5fa76d1af94723dbeffb6c1c5da7db5ce069732a05a5e2c7fdef6505c13,
 * base de 22/09/2026.
 *
 * Regra: nada aqui pode ser preenchido à mão com número plausível. Apenas
 * saída verificável do processamento de TSE / Dados Abertos / Candidatos 2026.
 */

import type { UniverseId } from "@/lib/tse/compute";

export type UniverseSnapshot = {
  /** candidaturas de mulheres no universo */
  feminine: number;
  /** total de candidaturas no universo */
  total: number;
  /** contagem por categoria original de cor/raça (candidaturas de mulheres) */
  raceCounts: Record<string, number>;
  /**
   * Contagens brutas por dimensões confirmadas no dicionário de dados.
   * Opcional: quando ausente, os recortes correspondentes exibem "sem dado".
   */
  dimensions?: {
    feminineByUf?: Record<string, number>;
    totalByUf?: Record<string, number>;
  };
};

export type TseSnapshot = {
  /** dataset e recurso processados */
  datasetUrl: string;
  resourceUrl: string;
  /** data de geração da base informada pelo TSE (ISO 8601) */
  baseGeneratedAt: string;
  /** data/hora em que a base foi consultada e processada (ISO 8601, UTC) */
  processedAt: string;
  /** filtros efetivamente aplicados na leitura das linhas */
  filters: string[];
  universes: Record<UniverseId, UniverseSnapshot>;
};

/** SHA-256 do CSV BRASIL recontado de forma independente. */
export const PINNED_BRASIL_CSV_SHA256 =
  "1e08c5fa76d1af94723dbeffb6c1c5da7db5ce069732a05a5e2c7fdef6505c13";

/** Nome do arquivo processado pelo TSE. */
export const PINNED_FILE_NAME = "consulta_cand_2026.zip";

/** Fotografia vigente, cravada em código. */
export const snapshot: TseSnapshot | null = {
  datasetUrl: "https://dadosabertos.tse.jus.br/dataset/candidatos-2026",
  resourceUrl: "https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_cand/consulta_cand_2026.zip",
  baseGeneratedAt: "2026-09-22",
  processedAt: "2026-09-22T23:21:36Z",
  filters: [
    "Dedup por SQ_CANDIDATO",
    "Universos proporcional e majoritário separados",
    "Cor/raça em categorias originais DS_COR_RACA, sem agregação",
  ],
  universes: {
    proporcional: {
      total: 19527,
      feminine: 6950,
      raceCounts: { BRANCA: 3252, PARDA: 2378, PRETA: 1197, "INDÍGENA": 82, AMARELA: 41 },
      dimensions: {
        feminineByUf: {
          AC: 131, AL: 100, AM: 158, AP: 113, BA: 406, CE: 246, DF: 219, ES: 190,
          GO: 337, MA: 204, MG: 626, MS: 138, MT: 142, PA: 251, PB: 149, PE: 317,
          PI: 116, PR: 366, RJ: 667, RN: 103, RO: 141, RR: 134, RS: 343, SC: 240,
          SE: 144, SP: 856, TO: 113,
        },
        totalByUf: {
          AC: 349, AL: 262, AM: 433, AP: 285, BA: 1178, CE: 671, DF: 605, ES: 547,
          GO: 859, MA: 567, MG: 1754, MS: 377, MT: 406, PA: 685, PB: 403, PE: 909,
          PI: 317, PR: 1045, RJ: 1981, RN: 265, RO: 394, RR: 358, RS: 1000, SC: 645,
          SE: 363, SP: 2562, TO: 307,
        },
      },
    },
    majoritario: {
      total: 534,
      feminine: 107,
      raceCounts: { BRANCA: 65, PARDA: 24, PRETA: 17, AMARELA: 1 },
    },
  },
};

/** Origem da fotografia vigente. */
export const LAST_FETCH_ATTEMPT = {
  at: "2026-09-22T23:21:36Z",
  outcome:
    "Fotografia de 22/09/2026 recontada de forma independente a partir do arquivo oficial de candidaturas do TSE (consulta_cand_2026_BRASIL.csv) e cravada em código, sem consulta ao banco em tempo de execução.",
} as const;
