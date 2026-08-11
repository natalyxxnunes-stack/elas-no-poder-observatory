/**
 * parse — leitura e validação do arquivo oficial de candidaturas do TSE
 * (TSE / Dados Abertos / Candidatos 2026, recurso `consulta_cand_2026`).
 *
 * Este módulo é puro: recebe texto CSV já decodificado e devolve linhas
 * normalizadas, o mapa de colunas realmente encontrado no arquivo e as
 * contagens por universo. Nenhum número é inventado e nenhum filtro é
 * aplicado sem ser devolvido em `filters`, para auditoria.
 */

import {
  classifyUniverse,
  isFeminine,
  type TseCandidateRow,
  type UniverseId,
} from "./compute";

/** Versão do processamento — muda quando a lógica de cálculo muda. */
export const PROCESSING_VERSION = "2026.08.11-b2";

/**
 * Colunas esperadas no arquivo 2026 e os sinônimos aceitos.
 * O mapeamento é feito a partir do cabeçalho real do arquivo: se uma coluna
 * não existir, isso é registrado como anomalia em vez de ser suposto.
 */
export const COLUMN_ALIASES = {
  cargo: ["DS_CARGO", "NM_CARGO", "DESCRICAO_CARGO"],
  genero: ["DS_GENERO", "DESCRICAO_GENERO"],
  corRaca: ["DS_COR_RACA", "DESCRICAO_COR_RACA"],
  situacaoCandidatura: [
    "DS_SITUACAO_CANDIDATURA",
    "DESC_SIT_TOT_TURNO",
    "DESCRICAO_SITUACAO_CANDIDATURA",
  ],
  detalheSituacao: [
    "DS_DETALHE_SITUACAO_CAND",
    "DESCRICAO_DETALHE_SITUACAO_CAND",
  ],
  uf: ["SG_UF", "SIGLA_UF"],
} as const;

export type ColumnKey = keyof typeof COLUMN_ALIASES;

/** Colunas sem as quais nenhum indicador pode ser calculado. */
export const REQUIRED_COLUMNS: ColumnKey[] = ["cargo", "genero"];

const clean = (v: string) => v.replace(/^"+|"+$/g, "").trim();

/** Divide uma linha CSV do TSE (delimitador ';', campos entre aspas). */
export function splitCsvLine(line: string, delimiter = ";"): string[] {
  const out: string[] = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i]!;
    if (ch === '"') {
      if (quoted && line[i + 1] === '"') {
        field += '"';
        i += 1;
      } else {
        quoted = !quoted;
      }
    } else if (ch === delimiter && !quoted) {
      out.push(field.trim());
      field = "";
    } else {
      field += ch;
    }
  }
  out.push(field.trim());
  return out;
}

export type ColumnMap = Partial<Record<ColumnKey, number>>;

/** Mapeia o cabeçalho real do arquivo para as colunas analíticas. */
export function mapColumns(header: readonly string[]): {
  map: ColumnMap;
  headerNames: string[];
  missing: ColumnKey[];
} {
  const headerNames = header.map((h) => clean(h).toUpperCase());
  const map: ColumnMap = {};
  const missing: ColumnKey[] = [];
  for (const key of Object.keys(COLUMN_ALIASES) as ColumnKey[]) {
    const idx = headerNames.findIndex((name) =>
      (COLUMN_ALIASES[key] as readonly string[]).includes(name),
    );
    if (idx >= 0) map[key] = idx;
    else missing.push(key);
  }
  return { map, headerNames, missing };
}

/** Converte uma linha bruta em linha analítica, preservando o valor do TSE. */
export function toRow(cells: readonly string[], map: ColumnMap): TseCandidateRow {
  const at = (key: ColumnKey) => {
    const i = map[key];
    return i === undefined ? "" : clean(cells[i] ?? "");
  };
  return {
    cargo: at("cargo"),
    genero: at("genero"),
    corRaca: at("corRaca"),
    situacaoCandidatura: at("situacaoCandidatura"),
    detalheSituacao: at("detalheSituacao"),
    uf: at("uf"),
  };
}

export type UniverseTally = {
  /** candidaturas de mulheres no universo */
  feminine: number;
  /** total de candidaturas registradas no universo */
  total: number;
  /** contagem por categoria original de cor/raça (candidaturas de mulheres) */
  raceCounts: Record<string, number>;
  /** contagem por valor original de situação de candidatura (todas as linhas) */
  situationCounts: Record<string, number>;
};

export type ParseResult = {
  /** cabeçalho real encontrado */
  headerNames: string[];
  /** colunas esperadas ausentes no arquivo */
  missingColumns: ColumnKey[];
  /** linhas lidas (excluindo cabeçalhos) */
  recordCount: number;
  /** linhas fora dos dois universos analisados (ex.: vice, suplente) */
  outOfScope: number;
  universes: Record<UniverseId, UniverseTally>;
  /** valores originais de situação encontrados no arquivo, com contagem */
  situationValues: Record<string, number>;
};

function emptyTally(): UniverseTally {
  return { feminine: 0, total: 0, raceCounts: {}, situationCounts: {} };
}

/**
 * Acumulador de contagens: permite processar vários arquivos CSV (o pacote do
 * TSE traz um arquivo por UF) somando no mesmo resultado.
 */
export function createTally(): ParseResult {
  return {
    headerNames: [],
    missingColumns: [],
    recordCount: 0,
    outOfScope: 0,
    universes: { proporcional: emptyTally(), majoritario: emptyTally() },
    situationValues: {},
  };
}

/** Lê um CSV completo do pacote do TSE e acumula as contagens em `acc`. */
export function ingestCsv(csv: string, acc: ParseResult): ParseResult {
  const lines = csv.split(/\r?\n/);
  let header: ColumnMap | null = null;
  for (const line of lines) {
    if (!line.trim()) continue;
    const cells = splitCsvLine(line);
    if (!header) {
      const mapped = mapColumns(cells);
      header = mapped.map;
      if (acc.headerNames.length === 0) {
        acc.headerNames = mapped.headerNames;
        acc.missingColumns = mapped.missing;
      }
      continue;
    }
    const row = toRow(cells, header);
    if (!row.cargo && !row.genero) continue;
    acc.recordCount += 1;

    const situation = row.situacaoCandidatura || "NÃO INFORMADO";
    acc.situationValues[situation] = (acc.situationValues[situation] ?? 0) + 1;

    const universe = classifyUniverse(row.cargo);
    if (!universe) {
      acc.outOfScope += 1;
      continue;
    }
    const tally = acc.universes[universe];
    tally.total += 1;
    tally.situationCounts[situation] =
      (tally.situationCounts[situation] ?? 0) + 1;
    if (isFeminine(row.genero)) {
      tally.feminine += 1;
      const race = row.corRaca || "NÃO INFORMADO";
      tally.raceCounts[race] = (tally.raceCounts[race] ?? 0) + 1;
    }
  }
  return acc;
}

export type ComputedIndicator = {
  numerator: number;
  denominator: number;
  /** valor bruto, sem arredondamento */
  raw: number | null;
  /** valor exibido, arredondado em uma casa decimal */
  display: number | null;
};

export type ComputedIndicators = {
  proporcional: ComputedIndicator;
  majoritario: ComputedIndicator;
  /** diferença entre os dois percentuais, em pontos percentuais (p.p.) */
  differencePp: { raw: number | null; display: number | null };
};

const round1 = (v: number | null) =>
  v === null ? null : Math.round(v * 10) / 10;

function share(t: UniverseTally): ComputedIndicator {
  const raw = t.total > 0 ? (t.feminine / t.total) * 100 : null;
  return {
    numerator: t.feminine,
    denominator: t.total,
    raw,
    display: round1(raw),
  };
}

/** Indicadores mínimos exigidos, calculados por universo separadamente. */
export function computeIndicators(result: ParseResult): ComputedIndicators {
  const p = share(result.universes.proporcional);
  const m = share(result.universes.majoritario);
  const diff =
    p.raw !== null && m.raw !== null ? p.raw - m.raw : null;
  return {
    proporcional: p,
    majoritario: m,
    differencePp: { raw: diff, display: round1(diff) },
  };
}

/** Filtros efetivamente aplicados — sempre gravados junto do snapshot. */
export const APPLIED_FILTERS = [
  "Unidade de análise: candidatura registrada (uma linha do arquivo), não pessoa",
  "Gênero conforme a coluna original de gênero do TSE, autodeclarado no registro",
  "Universo proporcional: deputado federal, deputado estadual e deputado distrital",
  "Universo majoritário: presidente, governador e senador",
  "Universos calculados separadamente, com denominadores próprios, e nunca somados",
  "Sem filtro por situação de candidatura: o denominador é o total de candidaturas registradas no arquivo. A distribuição pelos valores originais de situação é gravada no snapshot para permitir recortes posteriores documentados",
  "Cor/raça mantida nas categorias originais do TSE, sem agregação",
];

export type ValidationOutcome = {
  /** se o snapshot pode ser publicado como fotografia atual */
  publishable: boolean;
  status: "ok" | "anomalia" | "invalido";
  anomalies: string[];
};

/**
 * Validação antes de publicar uma nova fotografia. Variação normal do volume
 * de candidaturas não bloqueia a atualização; mudança estruturalmente anormal
 * é sinalizada. O snapshot anterior nunca é apagado.
 */
export function validate(
  result: ParseResult,
  indicators: ComputedIndicators,
  previousRecordCount: number | null,
): ValidationOutcome {
  const anomalies: string[] = [];
  let publishable = true;

  for (const col of REQUIRED_COLUMNS) {
    if (result.missingColumns.includes(col)) {
      anomalies.push(`Coluna obrigatória ausente no arquivo: ${col}`);
      publishable = false;
    }
  }
  for (const col of result.missingColumns) {
    if (!REQUIRED_COLUMNS.includes(col)) {
      anomalies.push(
        `Coluna opcional ausente no arquivo: ${col} — indicadores que dependem dela não são calculados`,
      );
    }
  }
  if (result.recordCount === 0) {
    anomalies.push("Arquivo lido sem nenhum registro");
    publishable = false;
  }
  for (const universe of ["proporcional", "majoritario"] as UniverseId[]) {
    const t = result.universes[universe];
    if (t.total === 0) {
      anomalies.push(`Universo ${universe} sem candidaturas no arquivo`);
      publishable = false;
    } else if (t.feminine > t.total) {
      anomalies.push(`Universo ${universe}: numerador maior que denominador`);
      publishable = false;
    }
  }
  for (const [key, ind] of [
    ["proporcional", indicators.proporcional],
    ["majoritario", indicators.majoritario],
  ] as const) {
    if (ind.raw !== null && (ind.raw < 0 || ind.raw > 100)) {
      anomalies.push(`Percentual fora do intervalo válido em ${key}`);
      publishable = false;
    }
  }
  if (previousRecordCount && previousRecordCount > 0) {
    const variation =
      (result.recordCount - previousRecordCount) / previousRecordCount;
    if (Math.abs(variation) > 0.25) {
      anomalies.push(
        `Variação de ${(variation * 100).toFixed(1)}% no número de registros em relação à fotografia anterior (${previousRecordCount} → ${result.recordCount}) — verificar antes de usar editorialmente`,
      );
    }
  }

  return {
    publishable,
    status: !publishable ? "invalido" : anomalies.length > 0 ? "anomalia" : "ok",
    anomalies,
  };
}
