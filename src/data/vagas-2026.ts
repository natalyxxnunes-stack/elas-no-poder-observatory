/**
 * vagas-2026 — vagas efetivamente em disputa nas eleições gerais de 2026.
 *
 * FONTE: TSE / Dados Abertos / Candidatos 2026, recurso "Vagas"
 * (consulta_vagas_2026.zip), arquivo consulta_vagas_2026_BRASIL.csv.
 * Este é um arquivo oficial, pequeno e estável (191 linhas), lido uma única vez
 * e transcrito aqui como constante curada — nenhum número é estimado.
 *
 * O que foi somado, cargo por cargo, a partir da coluna QT_VAGA:
 * - universo proporcional: Deputado Federal + Deputado Estadual + Deputado
 *   Distrital → 1.572 cadeiras (513 na Câmara dos Deputados e 1.059 nas
 *   assembleias legislativas e na Câmara Legislativa do DF);
 * - universo majoritário: Presidente + Governador + Senador → 82 cargos
 *   (1 Presidência, 27 governos e 54 cadeiras do Senado, 2 por unidade da
 *   federação nesta renovação).
 *
 * O que foi deliberadamente EXCLUÍDO, para que os universos aqui sejam os
 * mesmos usados em todo o site: Vice-presidente, Vice-governador e as linhas
 * "1. Suplente" e "2. Suplente" do Senado. São registros do mesmo pleito, mas
 * não são cargos disputados de forma autônoma no recorte do observatório.
 */

import type { UniverseId } from "@/lib/tse/compute";

/** Metadados de rastreabilidade do arquivo lido. */
export const VAGAS_SOURCE = {
  name: "TSE / Dados Abertos / Candidatos 2026 — recurso “Vagas”",
  datasetUrl: "https://dadosabertos.tse.jus.br/dataset/candidatos-2026",
  resourceUrl:
    "https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_vagas/consulta_vagas_2026.zip",
  fileName: "consulta_vagas_2026_BRASIL.csv",
  /** DT_GERACAO + HH_GERACAO informados dentro do próprio arquivo */
  generatedAt: "2026-08-15T12:30:30-03:00",
  /** data em que o arquivo foi baixado e transcrito */
  readAt: "2026-08-15T17:44:00Z",
  /** SHA-256 do ZIP como baixado do TSE */
  zipSha256:
    "880dbdbdd5da3d817c5b1b03c6951621078f56491044a483c05e0ec04a64fbbf",
  /** data do primeiro turno informada no arquivo (DT_ELEICAO) */
  electionDate: "2026-10-04",
} as const;

/** Cargos somados em cada universo, para exibição junto do número. */
export const VAGAS_POSITIONS: Record<UniverseId, readonly string[]> = {
  proporcional: ["Deputado Federal", "Deputado Estadual", "Deputado Distrital"],
  majoritario: ["Presidente", "Governador", "Senador"],
};

/**
 * Vagas por unidade eleitoral no universo proporcional. Chave = SG_UF do TSE.
 * Soma de Deputado Federal + Deputado Estadual/Distrital.
 */
export const VAGAS_PROPORCIONAL: Record<string, number> = {
  AC: 32,
  AL: 36,
  AM: 32,
  AP: 32,
  BA: 102,
  CE: 68,
  DF: 32,
  ES: 40,
  GO: 58,
  MA: 60,
  MG: 130,
  MS: 32,
  MT: 32,
  PA: 58,
  PB: 48,
  PE: 74,
  PI: 40,
  PR: 84,
  RJ: 116,
  RN: 32,
  RO: 32,
  RR: 32,
  RS: 86,
  SC: 56,
  SE: 32,
  SP: 164,
  TO: 32,
};

/**
 * Vagas por unidade eleitoral no universo majoritário. Chave = SG_UF do TSE,
 * com "BR" para a Presidência (unidade eleitoral nacional, como na base de
 * candidaturas). Governador (1) + Senador (2) em cada UF; 1 na Presidência.
 */
export const VAGAS_MAJORITARIO: Record<string, number> = {
  BR: 1,
  AC: 3,
  AL: 3,
  AM: 3,
  AP: 3,
  BA: 3,
  CE: 3,
  DF: 3,
  ES: 3,
  GO: 3,
  MA: 3,
  MG: 3,
  MS: 3,
  MT: 3,
  PA: 3,
  PB: 3,
  PE: 3,
  PI: 3,
  PR: 3,
  RJ: 3,
  RN: 3,
  RO: 3,
  RR: 3,
  RS: 3,
  SC: 3,
  SE: 3,
  SP: 3,
  TO: 3,
};

export const VAGAS_BY_UNIVERSE: Record<UniverseId, Record<string, number>> = {
  proporcional: VAGAS_PROPORCIONAL,
  majoritario: VAGAS_MAJORITARIO,
};

/** Total de vagas em disputa em cada universo. */
export function totalVagas(universe: UniverseId): number {
  return Object.values(VAGAS_BY_UNIVERSE[universe]).reduce((a, b) => a + b, 0);
}

/** Vagas de uma unidade eleitoral. Nulo quando a chave não existe no arquivo. */
export function vagasOf(universe: UniverseId, uf: string): number | null {
  return VAGAS_BY_UNIVERSE[universe][uf] ?? null;
}
