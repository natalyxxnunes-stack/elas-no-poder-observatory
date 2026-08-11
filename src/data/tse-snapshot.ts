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
 * Estado atual: sem snapshot processado.
 *
 * Tentativa registrada em 2026-08-11T20:19Z: a API de metadados do TSE
 * (dadosabertos.tse.jus.br) respondeu normalmente, mas o download do arquivo
 * `consulta_cand_2026.zip` em cdn.tse.jus.br retornou HTTP 403 (bloqueio de
 * acesso automatizado). Sem o arquivo, nenhum indicador foi recalculado.
 */
export const snapshot: TseSnapshot | null = null;

/** Registro da última tentativa de obtenção da base. */
export const LAST_FETCH_ATTEMPT = {
  at: "2026-08-11T20:19:00Z",
  outcome:
    "HTTP 403 no CDN do TSE ao baixar consulta_cand_2026.zip (bloqueio de acesso automatizado). Metadados do dataset acessíveis.",
} as const;
