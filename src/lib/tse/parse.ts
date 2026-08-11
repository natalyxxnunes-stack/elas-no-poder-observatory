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
import {
  DICTIONARY_VERSION,
  auditHeader,
  type HeaderAudit,
} from "./data-dictionary";

/**
 * Versão do processamento — muda quando a lógica de cálculo muda.
 * Inclui a versão do dicionário de dados usada na leitura do arquivo.
 */
export const PROCESSING_VERSION = `2026.08.11-b4+${DICTIONARY_VERSION}`;

/**
 * Colunas analíticas e os nomes REAIS aceitos, conforme o dicionário de dados
 * (`data-dictionary.ts`) — confirmados no cabeçalho do recurso `Candidatos`.
 * O mapeamento é feito a partir do cabeçalho real: coluna ausente é registrada
 * como anomalia, nunca suposta.
 */
export const COLUMN_ALIASES = {
  sqCandidato: ["SQ_CANDIDATO"],
  cargo: ["DS_CARGO"],
  codCargo: ["CD_CARGO"],
  genero: ["DS_GENERO"],
  corRaca: ["DS_COR_RACA"],
  situacaoCandidatura: ["DS_SITUACAO_CANDIDATURA"],
  /** só existe no recurso complementar; ausente em `Candidatos` */
  detalheSituacao: ["DS_DETALHE_SITUACAO_CAND"],
  uf: ["SG_UF"],
  ue: ["SG_UE"],
  partido: ["SG_PARTIDO"],
  agremiacao: ["TP_AGREMIACAO"],
  federacao: ["SG_FEDERACAO"],
  sqColigacao: ["SQ_COLIGACAO"],
} as const;

export type ColumnKey = keyof typeof COLUMN_ALIASES;

/** Colunas sem as quais nenhum indicador pode ser calculado. */
export const REQUIRED_COLUMNS: ColumnKey[] = [
  "sqCandidato",
  "cargo",
  "genero",
];


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
    sqCandidato: at("sqCandidato"),
    cargo: at("cargo"),
    codCargo: at("codCargo"),
    genero: at("genero"),
    corRaca: at("corRaca"),
    situacaoCandidatura: at("situacaoCandidatura"),
    detalheSituacao: at("detalheSituacao"),
    uf: at("uf"),
    ue: at("ue"),
    partido: at("partido"),
    agremiacao: at("agremiacao"),
    federacao: at("federacao"),
    sqColigacao: at("sqColigacao"),
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
  /**
   * Dimensões adicionais preparadas pelo dicionário (campos confirmados).
   * São contagens brutas, sem indicador derivado: nenhum número novo é
   * publicado a partir daqui sem método declarado.
   */
  dimensions: {
    /** candidaturas de mulheres por UF (SG_UF) */
    feminineByUf: Record<string, number>;
    /** total de candidaturas por UF */
    totalByUf: Record<string, number>;
    /** candidaturas de mulheres por partido (SG_PARTIDO) */
    feminineByParty: Record<string, number>;
    /** total de candidaturas por partido */
    totalByParty: Record<string, number>;
    /** candidaturas de mulheres por forma de agremiação (TP_AGREMIACAO) */
    feminineByAgremiacao: Record<string, number>;
    /** total de candidaturas por forma de agremiação */
    totalByAgremiacao: Record<string, number>;
  };
};

export type ParseResult = {
  /** cabeçalho real encontrado */
  headerNames: string[];
  /** colunas esperadas ausentes no arquivo */
  missingColumns: ColumnKey[];
  /** comparação do cabeçalho real com o dicionário vigente */
  headerAudit: HeaderAudit | null;
  /** linhas lidas (excluindo cabeçalhos) */
  recordCount: number;
  /** candidaturas distintas por SQ_CANDIDATO */
  distinctCandidacies: number;
  /** linhas fora dos dois universos analisados (ex.: vice, suplente) */
  outOfScope: number;
  universes: Record<UniverseId, UniverseTally>;
  /** valores originais de situação encontrados no arquivo, com contagem */
  situationValues: Record<string, number>;
  /** chaves SQ_CANDIDATO vistas (uso interno da coleta, não publicado) */
  seenKeys: Set<string>;
};

function emptyTally(): UniverseTally {
  return {
    feminine: 0,
    total: 0,
    raceCounts: {},
    situationCounts: {},
    dimensions: {
      feminineByUf: {},
      totalByUf: {},
      feminineByParty: {},
      totalByParty: {},
      feminineByAgremiacao: {},
      totalByAgremiacao: {},
    },
  };
}

/**
 * Acumulador de contagens: permite processar vários arquivos CSV (o pacote do
 * TSE traz um arquivo por UF) somando no mesmo resultado.
 */
export function createTally(): ParseResult {
  return {
    headerNames: [],
    missingColumns: [],
    headerAudit: null,
    recordCount: 0,
    distinctCandidacies: 0,
    outOfScope: 0,
    universes: { proporcional: emptyTally(), majoritario: emptyTally() },
    situationValues: {},
    seenKeys: new Set<string>(),
  };
}

const bump = (map: Record<string, number>, key: string) => {
  const k = key || "NÃO INFORMADO";
  map[k] = (map[k] ?? 0) + 1;
};

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
        acc.headerAudit = auditHeader(mapped.headerNames);
      }
      continue;
    }
    const row = toRow(cells, header);
    if (!row.cargo && !row.genero) continue;
    acc.recordCount += 1;
    if (row.sqCandidato && !acc.seenKeys.has(row.sqCandidato)) {
      acc.seenKeys.add(row.sqCandidato);
      acc.distinctCandidacies += 1;
    }

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
    bump(tally.dimensions.totalByUf, row.uf);
    bump(tally.dimensions.totalByParty, row.partido);
    bump(tally.dimensions.totalByAgremiacao, row.agremiacao);
    if (isFeminine(row.genero)) {
      tally.feminine += 1;
      const race = row.corRaca || "NÃO INFORMADO";
      tally.raceCounts[race] = (tally.raceCounts[race] ?? 0) + 1;
      bump(tally.dimensions.feminineByUf, row.uf);
      bump(tally.dimensions.feminineByParty, row.partido);
      bump(tally.dimensions.feminineByAgremiacao, row.agremiacao);
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
  "Unidade de análise: candidatura registrada (uma linha do arquivo, identificada por SQ_CANDIDATO), não pessoa",
  "Gênero conforme a coluna original de gênero do TSE (DS_GENERO), autodeclarado no registro; sem inferência por nome ou nome social",
  "Universo proporcional: deputado federal, deputado estadual e deputado distrital",
  "Universo majoritário: presidente, governador e senador",
  "Universos calculados separadamente, com denominadores próprios, e nunca somados",
  "Sem filtro por situação de candidatura: o denominador é o total de candidaturas registradas no arquivo. A distribuição pelos valores originais de situação é gravada no snapshot para permitir recortes posteriores documentados",
  "Cor/raça mantida nas categorias originais do TSE (DS_COR_RACA), sem agregação; preta + parda = negra só como transformação analítica declarada na apresentação",
  `Leitura de colunas conforme o dicionário de dados versionado ${DICTIONARY_VERSION}, mapeado a partir do cabeçalho real do arquivo`,
  "Dimensões adicionais gravadas apenas como contagens brutas (UF, partido e forma de agremiação); nenhum indicador novo é derivado delas nesta fotografia",
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

  // Guarda de estrutura: mudança de cabeçalho do TSE não pode gerar publicação
  // silenciosa. Coluna estrutural ausente bloqueia a fotografia; coluna nova ou
  // removida fora do núcleo estrutural é sinalizada para revisão do dicionário.
  const audit = result.headerAudit;
  if (!audit) {
    anomalies.push(
      "Cabeçalho do arquivo não pôde ser auditado contra o dicionário de dados",
    );
    publishable = false;
  } else {
    for (const col of audit.missingStructural) {
      anomalies.push(
        `Estrutura do arquivo mudou: coluna estrutural ausente (${col}) segundo o dicionário ${DICTIONARY_VERSION} — publicação bloqueada`,
      );
      publishable = false;
    }
    const removedNonStructural = audit.removedColumns.filter(
      (c) => !audit.missingStructural.includes(c),
    );
    if (removedNonStructural.length > 0) {
      anomalies.push(
        `Colunas do arquivo desapareceram em relação ao dicionário ${DICTIONARY_VERSION}: ${removedNonStructural.join(", ")} — revisar dicionário`,
      );
    }
    if (audit.newColumns.length > 0) {
      anomalies.push(
        `Colunas novas no arquivo do TSE, ainda não documentadas no dicionário ${DICTIONARY_VERSION}: ${audit.newColumns.join(", ")} — revisar dicionário antes de usar`,
      );
    }
  }

  if (result.recordCount === 0) {
    anomalies.push("Arquivo lido sem nenhum registro");
    publishable = false;
  }
  if (result.distinctCandidacies > 0) {
    const duplicates = result.recordCount - result.distinctCandidacies;
    if (duplicates > 0) {
      anomalies.push(
        `${duplicates} linhas com SQ_CANDIDATO repetido — chave de candidatura não é única nesta fotografia`,
      );
    }
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
