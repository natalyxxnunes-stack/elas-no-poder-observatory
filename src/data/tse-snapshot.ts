/**
 * tse-snapshot — ponto único de entrada dos números do site.
 *
 * A fotografia vigente está CRAVADA neste arquivo: o site estático exibe
 * sempre estes números, sem consultar o banco em tempo de execução. Os valores
 * vêm de recontagem independente do arquivo oficial
 * `consulta_cand_2026_BRASIL.csv` (dedup por SQ_CANDIDATO, encoding latin1,
 * separador `;`), SHA-256 do CSV
 * 021ea104dc491665895e79374e677a4688d877f29e8164f3c446462afe363f91,
 * base de 18/08/2026.
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
  "021ea104dc491665895e79374e677a4688d877f29e8164f3c446462afe363f91";

/** Nome do arquivo processado pelo TSE. */
export const PINNED_FILE_NAME = "consulta_cand_2026.zip";

/** Fotografia vigente, cravada em código. */
export const snapshot: TseSnapshot | null = {
  datasetUrl: "https://dadosabertos.tse.jus.br/dataset/candidatos-2026",
  resourceUrl: "https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_cand/consulta_cand_2026.zip",
  baseGeneratedAt: "2026-08-18",
  processedAt: "2026-08-18T00:00:00Z",
  filters: [
    "Dedup por SQ_CANDIDATO",
    "Universos proporcional e majoritário separados",
    "Cor/raça em categorias originais DS_COR_RACA, sem agregação",
  ],
  universes: {
    proporcional: {
      total: 19142,
      feminine: 6756,
      raceCounts: { BRANCA: 3092, PARDA: 2378, PRETA: 1167, "INDÍGENA": 79, AMARELA: 40 },
    },
    majoritario: {
      total: 523,
      feminine: 103,
      raceCounts: { BRANCA: 64, PARDA: 23, PRETA: 15, AMARELA: 1 },
    },
  },
};

/** Origem da fotografia vigente. */
export const LAST_FETCH_ATTEMPT = {
  at: "2026-08-18T00:00:00Z",
  outcome:
    "Fotografia recontada de forma independente a partir do arquivo oficial de candidaturas do TSE (consulta_cand_2026_BRASIL.csv) e cravada em código, sem consulta ao banco em tempo de execução.",
} as const;
