/**
 * tse-snapshot — ponto único de entrada dos números do site.
 *
 * Enquanto o bloco de coleta automática não existir, este arquivo é o slot onde
 * o resultado do processamento da base oficial será gravado. Com `snapshot`
 * nulo, o site não exibe nenhum percentual: exibe a lacuna e o status.
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

/**
 * Estado atual: os números da fotografia vigente não vivem mais neste arquivo.
 *
 * A coleta diária da base oficial (TSE / Dados Abertos / Candidatos 2026) grava
 * cada fotografia no banco do projeto, com data de geração do arquivo, número
 * de registros, filtros, contagens por universo e indicadores. A leitura é
 * feita em `src/lib/tse/snapshot.functions.ts` e projetada sobre os
 * indicadores por `src/lib/tse/indicators.ts`.
 *
 * Este slot permanece nulo de propósito: nenhum número é fixado em código.
 */
export const snapshot: TseSnapshot | null = null;

/** Origem da fotografia vigente. */
export const LAST_FETCH_ATTEMPT = {
  at: null,
  outcome:
    "Fotografia obtida pela coleta diária do arquivo oficial de candidaturas do TSE e armazenada no histórico de fotografias do projeto.",
} as const;
