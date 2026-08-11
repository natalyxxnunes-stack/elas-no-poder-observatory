/**
 * historical-compute — indicadores da série histórica (2014 → 2018 → 2022 → 2026).
 *
 * Puro: recebe as contagens já lidas dos arquivos oficiais (via
 * `historical-parse`) ou já gravadas como fotografia histórica, e devolve
 * indicadores com numerador, denominador e universo explícitos.
 *
 * Regras que este módulo NUNCA quebra:
 *  - cada eleição tem denominador próprio; nada é somado entre anos;
 *  - universos proporcional e majoritário nunca se misturam num percentual;
 *  - categorias de raça do TSE são preservadas; a agregação NEGRA = PRETA +
 *    PARDA é sempre marcada como agregação analítica;
 *  - onde o dado não é comparável ou não existe, o ponto da série é null com
 *    motivo — nunca estimativa.
 */

import type { UniverseId } from "./compute";
import type { HistoricalYear } from "./historical-data-dictionary";
import {
  HISTORICAL_FILTERS,
  HISTORICAL_PROCESSING_VERSION,
  type CrossTally,
  type HistoricalTally,
  type UniverseHistorical,
} from "./historical-parse";

const norm = (v: string) =>
  v
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toUpperCase();

/** Rótulos originais do TSE que compõem a agregação analítica "negra". */
export const BLACK_AGGREGATION_COMPONENTS = ["PRETA", "PARDA"] as const;

export const BLACK_AGGREGATION_NOTE =
  "NEGRA = PRETA + PARDA. Agregação analítica declarada, aplicada sobre as categorias originais de DS_COR_RACA, que continuam publicadas separadamente.";

export const FEMININE_LABEL = "FEMININO";

/** Soma as categorias originais que compõem a agregação analítica "negra". */
export function sumBlack(counts: Record<string, number>): number {
  let total = 0;
  for (const [k, v] of Object.entries(counts)) {
    if ((BLACK_AGGREGATION_COMPONENTS as readonly string[]).includes(norm(k))) {
      total += v;
    }
  }
  return total;
}

export function countByGender(t: CrossTally, gender: string): number {
  let total = 0;
  for (const [k, v] of Object.entries(t.byGender)) {
    if (norm(k) === norm(gender)) total += v;
  }
  return total;
}

/** Contagens de raça dentro de um gênero (tabela cruzada, sem duplicação). */
export function raceCountsOfGender(
  t: CrossTally,
  gender: string,
): Record<string, number> {
  const out: Record<string, number> = {};
  for (const [g, races] of Object.entries(t.byGenderRace)) {
    if (norm(g) !== norm(gender)) continue;
    for (const [race, v] of Object.entries(races)) {
      out[race] = (out[race] ?? 0) + v;
    }
  }
  return out;
}

/* ------------------------------------------------------------------ *
 * Payload gravado como fotografia histórica (JSON puro, auditável)
 * ------------------------------------------------------------------ */

export type HistoricalAggregates = {
  year: HistoricalYear;
  processingVersion: string;
  filters: string[];
  /** contagens por universo: candidaturas e eleitas, com cortes por cargo/UF/região */
  universes: Record<UniverseId, UniverseHistorical>;
  /** o ano tem resultado eleitoral publicado no arquivo? */
  electedAvailable: boolean;
  /** valores originais encontrados, para auditoria */
  resultValues: Record<string, number>;
  situationValues: Record<string, number>;
  electionValues: Record<string, number>;
  counts: {
    rawLineCount: number;
    recordCount: number;
    duplicateRows: number;
    rowsWithoutKey: number;
    otherRounds: number;
    otherElectionTypes: number;
    outOfScope: number;
  };
};

/** Converte o acumulador de leitura no payload publicável da fotografia. */
export function toHistoricalAggregates(
  acc: HistoricalTally,
): HistoricalAggregates {
  const electedAvailable =
    acc.universes.proporcional.elected.all.total > 0 ||
    acc.universes.majoritario.elected.all.total > 0;
  return {
    year: acc.year,
    processingVersion: HISTORICAL_PROCESSING_VERSION,
    filters: HISTORICAL_FILTERS,
    universes: acc.universes,
    electedAvailable,
    resultValues: acc.resultValues,
    situationValues: acc.situationValues,
    electionValues: acc.electionValues,
    counts: {
      rawLineCount: acc.rawLineCount,
      recordCount: acc.recordCount,
      duplicateRows: acc.duplicateRows,
      rowsWithoutKey: acc.rowsWithoutKey,
      otherRounds: acc.otherRounds,
      otherElectionTypes: acc.otherElectionTypes,
      outOfScope: acc.outOfScope,
    },
  };
}

/* ------------------------------------------------------------------ *
 * Indicadores
 * ------------------------------------------------------------------ */

export type Point = {
  year: HistoricalYear;
  universe: UniverseId;
  numerator: number | null;
  denominator: number | null;
  /** percentual bruto; null quando o dado não existe ou não é comparável */
  value: number | null;
  /** por que o ponto está vazio, quando estiver */
  unavailableReason?: string;
  /** data oficial de geração da base daquele ano */
  baseGeneratedAt: string | null;
  /** situação da base: fechada (anos passados) ou em curso (2026) */
  stage: "fechada" | "em_curso";
  /** true quando envolve a agregação analítica NEGRA = PRETA + PARDA */
  usesBlackAggregation?: boolean;
};

export type Series = {
  id: string;
  label: string;
  /** o que é numerador e denominador, em uma frase */
  formula: string;
  points: Point[];
  notes: string[];
};

const share = (n: number, d: number): number | null =>
  d > 0 ? (n / d) * 100 : null;

/** Fotografia de um ano, no formato mínimo que os indicadores precisam. */
export type YearSnapshot = {
  year: HistoricalYear;
  baseGeneratedAt: string | null;
  stage: "fechada" | "em_curso";
  universes: Partial<
    Record<
      UniverseId,
      {
        total: number;
        feminine: number;
        /** raça de TODAS as candidaturas (categorias originais) — se disponível */
        raceAll: Record<string, number> | null;
        /** raça das candidaturas de mulheres (categorias originais) */
        raceFeminine: Record<string, number> | null;
        /** eleitas/eleitos, quando o ano tem resultado publicado */
        elected: {
          total: number;
          feminine: number;
          raceFeminine: Record<string, number> | null;
        } | null;
      }
    >
  >;
};

/** Projeta uma fotografia histórica completa no formato mínimo da série. */
export function yearSnapshotFromAggregates(
  aggregates: HistoricalAggregates,
  baseGeneratedAt: string | null,
): YearSnapshot {
  const project = (u: UniverseHistorical) => ({
    total: u.candidacies.total,
    feminine: countByGender(u.candidacies, FEMININE_LABEL),
    raceAll: u.candidacies.byRace,
    raceFeminine: raceCountsOfGender(u.candidacies, FEMININE_LABEL),
    elected: aggregates.electedAvailable
      ? {
          total: u.elected.all.total,
          feminine: countByGender(u.elected.all, FEMININE_LABEL),
          raceFeminine: raceCountsOfGender(u.elected.all, FEMININE_LABEL),
        }
      : null,
  });
  return {
    year: aggregates.year,
    baseGeneratedAt,
    stage: "fechada",
    universes: {
      proporcional: project(aggregates.universes.proporcional),
      majoritario: project(aggregates.universes.majoritario),
    },
  };
}

const UNIVERSES: UniverseId[] = ["proporcional", "majoritario"];

function point(
  snapshot: YearSnapshot,
  universe: UniverseId,
  compute: (u: NonNullable<YearSnapshot["universes"][UniverseId]>) =>
    | { numerator: number; denominator: number }
    | { unavailableReason: string },
  usesBlackAggregation = false,
): Point {
  const base = {
    year: snapshot.year,
    universe,
    baseGeneratedAt: snapshot.baseGeneratedAt,
    stage: snapshot.stage,
    ...(usesBlackAggregation ? { usesBlackAggregation: true } : {}),
  };
  const u = snapshot.universes[universe];
  if (!u) {
    return {
      ...base,
      numerator: null,
      denominator: null,
      value: null,
      unavailableReason: "Fotografia deste ano ainda não coletada.",
    };
  }
  const result = compute(u);
  if ("unavailableReason" in result) {
    return {
      ...base,
      numerator: null,
      denominator: null,
      value: null,
      unavailableReason: result.unavailableReason,
    };
  }
  return {
    ...base,
    numerator: result.numerator,
    denominator: result.denominator,
    value: share(result.numerator, result.denominator),
  };
}

/**
 * Série 1 — participação feminina nas candidaturas, por universo e ano.
 * Numerador: candidaturas com DS_GENERO = FEMININO.
 * Denominador: total de candidaturas registradas naquele universo e ano.
 */
export function feminineCandidacySeries(years: YearSnapshot[]): Series {
  return {
    id: "serie-mulheres-candidaturas",
    label: "Participação feminina nas candidaturas",
    formula:
      "candidaturas de mulheres ÷ total de candidaturas do mesmo universo e ano × 100",
    notes: [
      "Gênero conforme DS_GENERO, categoria original e binária na base do TSE em todos os anos.",
      "Cada ano e cada universo têm denominador próprio; os valores não são somados.",
    ],
    points: UNIVERSES.flatMap((universe) =>
      years.map((y) =>
        point(y, universe, (u) => ({
          numerator: u.feminine,
          denominator: u.total,
        })),
      ),
    ),
  };
}

/**
 * Série 2 — participação de candidaturas negras (agregação analítica) sobre o
 * total de candidaturas do universo. Depende de raça de TODAS as candidaturas.
 */
export function blackCandidacySeries(years: YearSnapshot[]): Series {
  return {
    id: "serie-negras-negros-candidaturas",
    label: "Participação negra nas candidaturas (agregação PRETA + PARDA)",
    formula:
      "candidaturas declaradas pretas + pardas ÷ total de candidaturas do mesmo universo e ano × 100",
    notes: [
      BLACK_AGGREGATION_NOTE,
      "Cor/raça só é coletada pelo TSE a partir de 2014; anos anteriores não entram na série.",
      "A cota racial de recursos e propaganda passou a existir em 2020: comparações entre anos são descritivas, sem inferência de causa.",
    ],
    points: UNIVERSES.flatMap((universe) =>
      years.map((y) =>
        point(
          y,
          universe,
          (u) =>
            u.raceAll
              ? { numerator: sumBlack(u.raceAll), denominator: u.total }
              : {
                  unavailableReason:
                    "A fotografia deste ano não guarda cor/raça de todas as candidaturas, apenas das candidaturas de mulheres.",
                },
          true,
        ),
      ),
    ),
  };
}

/**
 * Série 3 — mulheres negras: duas leituras, ambas explícitas.
 *  (a) sobre o total de candidaturas do universo;
 *  (b) sobre o total de candidaturas de mulheres do universo.
 */
export function blackWomenSeries(years: YearSnapshot[]): {
  ofAll: Series;
  ofWomen: Series;
} {
  const mk = (
    id: string,
    label: string,
    formula: string,
    denominator: (u: NonNullable<YearSnapshot["universes"][UniverseId]>) => number,
  ): Series => ({
    id,
    label,
    formula,
    notes: [
      BLACK_AGGREGATION_NOTE,
      "Gênero × raça vem da tabela cruzada: cada candidatura entra em uma única célula, sem dupla contagem.",
    ],
    points: UNIVERSES.flatMap((universe) =>
      years.map((y) =>
        point(
          y,
          universe,
          (u) =>
            u.raceFeminine
              ? {
                  numerator: sumBlack(u.raceFeminine),
                  denominator: denominator(u),
                }
              : {
                  unavailableReason:
                    "A fotografia deste ano não guarda cor/raça das candidaturas de mulheres.",
                },
          true,
        ),
      ),
    ),
  });

  return {
    ofAll: mk(
      "serie-mulheres-negras-sobre-total",
      "Mulheres negras sobre o total de candidaturas",
      "candidaturas de mulheres pretas + pardas ÷ total de candidaturas do mesmo universo e ano × 100",
      (u) => u.total,
    ),
    ofWomen: mk(
      "serie-mulheres-negras-entre-mulheres",
      "Mulheres negras entre as candidaturas de mulheres",
      "candidaturas de mulheres pretas + pardas ÷ total de candidaturas de mulheres do mesmo universo e ano × 100",
      (u) => u.feminine,
    ),
  };
}

/**
 * Série 4 — candidaturas × eleitas. Só existe para eleições encerradas com
 * resultado publicado no arquivo do TSE. Para 2026 o ponto fica vazio: não há
 * resultado eleitoral, e nada é estimado.
 */
export function electedWomenSeries(years: YearSnapshot[]): Series {
  return {
    id: "serie-mulheres-eleitas",
    label: "Mulheres entre as eleitas e eleitos",
    formula:
      "eleitas mulheres ÷ total de eleitas e eleitos do mesmo universo e ano × 100 (resultado de 1º turno, DS_SIT_TOT_TURNO)",
    notes: [
      "Somente anos com resultado eleitoral publicado. 2026 não tem resultado: o ponto fica vazio, sem estimativa.",
      "Resultado lido de DS_SIT_TOT_TURNO no 1º turno; cargos majoritários decididos em 2º turno aparecem na base do 1º turno como não eleitos e por isso o universo majoritário deve ser lido com essa ressalva.",
    ],
    points: UNIVERSES.flatMap((universe) =>
      years.map((y) =>
        point(y, universe, (u) =>
          u.elected
            ? { numerator: u.elected.feminine, denominator: u.elected.total }
            : {
                unavailableReason:
                  y.stage === "em_curso"
                    ? "Eleição ainda não ocorreu: não há resultado oficial e nenhum número é projetado."
                    : "Resultado eleitoral não disponível na fotografia deste ano.",
              },
        ),
      ),
    ),
  };
}

/** Série 5 — mulheres negras entre as eleitas (mesma restrição de resultado). */
export function electedBlackWomenSeries(years: YearSnapshot[]): Series {
  return {
    id: "serie-mulheres-negras-eleitas",
    label: "Mulheres negras entre as eleitas (agregação PRETA + PARDA)",
    formula:
      "eleitas mulheres pretas + pardas ÷ total de eleitas mulheres do mesmo universo e ano × 100",
    notes: [
      BLACK_AGGREGATION_NOTE,
      "Somente anos com resultado eleitoral publicado; 2026 fica vazio.",
    ],
    points: UNIVERSES.flatMap((universe) =>
      years.map((y) =>
        point(
          y,
          universe,
          (u) => {
            if (!u.elected || !u.elected.raceFeminine) {
              return {
                unavailableReason:
                  y.stage === "em_curso"
                    ? "Eleição ainda não ocorreu: não há resultado oficial."
                    : "Resultado eleitoral por cor/raça não disponível na fotografia deste ano.",
              };
            }
            return {
              numerator: sumBlack(u.elected.raceFeminine),
              denominator: u.elected.feminine,
            };
          },
          true,
        ),
      ),
    ),
  };
}

/** Todas as séries de uma vez, na ordem editorial. */
export function buildAllSeries(years: YearSnapshot[]): Series[] {
  const blackWomen = blackWomenSeries(years);
  return [
    feminineCandidacySeries(years),
    blackCandidacySeries(years),
    blackWomen.ofAll,
    blackWomen.ofWomen,
    electedWomenSeries(years),
    electedBlackWomenSeries(years),
  ];
}
