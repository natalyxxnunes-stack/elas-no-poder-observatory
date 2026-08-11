/**
 * compute — funções puras de cálculo dos indicadores a partir da base oficial
 * TSE / Dados Abertos / Candidatos 2026 (arquivo `consulta_cand_2026`).
 *
 * Este módulo NÃO busca dados. Ele recebe linhas já lidas da base e devolve
 * indicadores com numerador, denominador, universo, cargos e fórmula.
 * A coleta (download + descompactação + parsing) é o próximo bloco do projeto.
 *
 * Nenhuma função aqui inventa filtro: todo recorte aplicado é devolvido no
 * campo `filters` do indicador, para auditoria.
 */

/** Linha da base de candidaturas, com os campos usados no cálculo. */
export type TseCandidateRow = {
  /** DS_CARGO */
  cargo: string;
  /** DS_GENERO */
  genero: string;
  /** DS_COR_RACA — categoria original da base, sem agregação */
  corRaca: string;
  /** DS_SITUACAO_CANDIDATURA (ex.: APTO, INAPTO) */
  situacaoCandidatura: string;
  /** DS_DETALHE_SITUACAO_CAND — estágio processual do registro */
  detalheSituacao: string;
  /** SG_UF */
  uf: string;
};

/** Cargos que compõem o universo proporcional (eleições proporcionais). */
export const PROPORTIONAL_POSITIONS = [
  "DEPUTADO FEDERAL",
  "DEPUTADO ESTADUAL",
  "DEPUTADO DISTRITAL",
] as const;

/** Cargos que compõem o universo majoritário (cargo único). */
export const MAJORITARIAN_POSITIONS = [
  "PRESIDENTE",
  "GOVERNADOR",
  "SENADOR",
] as const;

export type UniverseId = "proporcional" | "majoritario";

const norm = (v: string) =>
  v
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toUpperCase();

/** Classifica uma linha em um dos dois universos, ou em nenhum. */
export function classifyUniverse(cargo: string): UniverseId | null {
  const c = norm(cargo);
  if ((PROPORTIONAL_POSITIONS as readonly string[]).includes(c)) {
    return "proporcional";
  }
  if ((MAJORITARIAN_POSITIONS as readonly string[]).includes(c)) {
    return "majoritario";
  }
  return null;
}

/** Reconhece o gênero feminino conforme a categoria da base (DS_GENERO). */
export function isFeminine(genero: string): boolean {
  return norm(genero) === "FEMININO";
}

export type ShareResult = {
  /** candidaturas de mulheres no universo */
  numerator: number;
  /** total de candidaturas no universo */
  denominator: number;
  /** valor bruto, sem arredondamento: numerator / denominator * 100 */
  value: number | null;
};

/**
 * Participação feminina em um universo.
 * Fórmula: (candidaturas de gênero feminino no universo ÷ total de
 * candidaturas no universo) × 100. Unidade de análise: candidatura registrada.
 * Os universos são calculados separadamente e nunca somados.
 */
export function computeFeminineShare(
  rows: readonly TseCandidateRow[],
  universe: UniverseId,
): ShareResult {
  let numerator = 0;
  let denominator = 0;
  for (const row of rows) {
    if (classifyUniverse(row.cargo) !== universe) continue;
    denominator += 1;
    if (isFeminine(row.genero)) numerator += 1;
  }
  return {
    numerator,
    denominator,
    value: denominator > 0 ? (numerator / denominator) * 100 : null,
  };
}

/**
 * Distribuição de cor/raça das candidaturas de mulheres em um universo,
 * preservando as categorias originais declaradas na base (branca, preta,
 * parda, amarela, indígena, não informado etc.). Nenhuma agregação é aplicada.
 */
export function computeRaceBreakdown(
  rows: readonly TseCandidateRow[],
  universe: UniverseId,
): { denominator: number; counts: Record<string, number> } {
  const counts: Record<string, number> = {};
  let denominator = 0;
  for (const row of rows) {
    if (classifyUniverse(row.cargo) !== universe) continue;
    if (!isFeminine(row.genero)) continue;
    denominator += 1;
    const key = row.corRaca?.trim() || "NÃO INFORMADO";
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return { denominator, counts };
}

/**
 * Agregação opcional preta + parda = negra. Só deve ser usada quando a
 * apresentação declarar explicitamente a agregação, e sempre ao lado das
 * categorias originais — nunca em substituição a elas.
 */
export function aggregateBlack(counts: Record<string, number>): {
  negra: number;
  componentes: string[];
} {
  const componentes: string[] = [];
  let negra = 0;
  for (const [k, v] of Object.entries(counts)) {
    const n = norm(k);
    if (n === "PRETA" || n === "PARDA") {
      negra += v;
      componentes.push(k);
    }
  }
  return { negra, componentes };
}

/** Diferença entre duas participações, em pontos percentuais (p.p.). */
export function differenceInPercentagePoints(
  a: number | null,
  b: number | null,
): number | null {
  if (a === null || b === null) return null;
  return a - b;
}
