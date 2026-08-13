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
export const PROCESSING_VERSION = `2026.08.11-b4.1+${DICTIONARY_VERSION}`;

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
  /** data de geração do arquivo informada pelo TSE — data da fotografia */
  dtGeracao: ["DT_GERACAO"],
  /** hora de geração do arquivo informada pelo TSE */
  hhGeracao: ["HH_GERACAO"],
} as const;

export type ColumnKey = keyof typeof COLUMN_ALIASES;

/** Colunas sem as quais nenhum indicador pode ser calculado. */
export const REQUIRED_COLUMNS: ColumnKey[] = [
  "sqCandidato",
  "cargo",
  "genero",
  "dtGeracao",
  "hhGeracao",
];


/**
 * Colunas que, conforme o dicionário, NÃO pertencem ao recurso `Candidatos`
 * e sim ao recurso complementar (ligado por SQ_CANDIDATO). A ausência delas no
 * arquivo principal é esperada e não é anomalia.
 */
export const COLUMNS_FROM_OTHER_RESOURCE: ColumnKey[] = ["detalheSituacao"];


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
    /**
     * Distribuição de cor/raça (categorias originais do TSE) das candidaturas
     * de mulheres dentro de cada partido: SG_PARTIDO → DS_COR_RACA → contagem.
     */
    raceByParty: Record<string, Record<string, number>>;
    /** o mesmo por UF: SG_UF → DS_COR_RACA → contagem */
    raceByUf: Record<string, Record<string, number>>;
    /**
     * Tabela conjunta esparsa para permitir filtros combinados de UF e partido
     * sem recompor a base: chave `SG_UF|SG_PARTIDO` → DS_COR_RACA → contagem
     * de candidaturas de mulheres. Só células não-nulas são gravadas. O cargo
     * não entra na chave: cada universo já tem sua própria tabela.
     */
    raceByUfParty: Record<string, Record<string, number>>;
  };

};

export type ParseResult = {
  /** cabeçalho real encontrado */
  headerNames: string[];
  /** colunas esperadas ausentes no arquivo */
  missingColumns: ColumnKey[];
  /** comparação do cabeçalho real com o dicionário vigente */
  headerAudit: HeaderAudit | null;
  /** linhas brutas lidas do pacote (excluindo cabeçalhos), antes da deduplicação */
  rawLineCount: number;
  /**
   * Linhas efetivamente contadas nos indicadores — candidaturas distintas por
   * SQ_CANDIDATO. É este o número publicado como `record_count`.
   */
  recordCount: number;
  /** candidaturas distintas por SQ_CANDIDATO */
  distinctCandidacies: number;
  /** linhas ignoradas por SQ_CANDIDATO já processado */
  duplicateRows: number;
  /** linhas sem SQ_CANDIDATO — não podem ser deduplicadas e são ignoradas */
  rowsWithoutKey: number;
  /** linhas fora dos dois universos analisados (ex.: vice, suplente) */
  outOfScope: number;
  universes: Record<UniverseId, UniverseTally>;
  /** valores originais de situação encontrados no arquivo, com contagem */
  situationValues: Record<string, number>;
  /** chaves SQ_CANDIDATO vistas (uso interno da coleta, não publicado) */
  seenKeys: Set<string>;
  /**
   * Marcas de geração (DT_GERACAO + HH_GERACAO) encontradas nos arquivos, já
   * normalizadas em ISO, com contagem de linhas por marca. Serve para checar
   * consistência entre os arquivos do pacote.
   */
  generationStamps: Record<string, number>;
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
      raceByParty: {},
      raceByUf: {},
      raceByUfParty: {},
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
    rawLineCount: 0,
    recordCount: 0,
    distinctCandidacies: 0,
    duplicateRows: 0,
    rowsWithoutKey: 0,
    outOfScope: 0,
    universes: { proporcional: emptyTally(), majoritario: emptyTally() },
    situationValues: {},
    seenKeys: new Set<string>(),
    generationStamps: {},
  };
}

const bump = (map: Record<string, number>, key: string) => {
  const k = key || "NÃO INFORMADO";
  map[k] = (map[k] ?? 0) + 1;
};

/**
 * Acumula uma contagem em tabela de dois níveis (dimensão → cor/raça),
 * criando a célula só quando ela existe de fato no arquivo.
 */
const bump2 = (
  map: Record<string, Record<string, number>>,
  key: string,
  race: string,
) => {
  const k = key || "NÃO INFORMADO";
  const inner = (map[k] ??= {});
  bump(inner, race);
};


/**
 * Converte DT_GERACAO (dd/mm/aaaa) + HH_GERACAO (hh:mm:ss) em ISO.
 * O TSE gera os arquivos no horário de Brasília (UTC-03:00).
 * Devolve null se qualquer uma das partes não vier no formato esperado —
 * nunca há substituição por metadado ou data aproximada.
 */
export function generationStampToIso(
  dt: string,
  hh: string,
): string | null {
  const d = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(dt.trim());
  const t = /^(\d{2}):(\d{2}):(\d{2})$/.exec(hh.trim());
  if (!d || !t) return null;
  const iso = `${d[3]}-${d[2]}-${d[1]}T${t[1]}:${t[2]}:${t[3]}-03:00`;
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toISOString();
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
        acc.headerAudit = auditHeader(mapped.headerNames);
      }
      continue;
    }
    const row = toRow(cells, header);
    if (!row.cargo && !row.genero) continue;
    acc.rawLineCount += 1;

    // Data da fotografia: lida das próprias linhas do arquivo Candidatos.
    const idxDt = header.dtGeracao;
    const idxHh = header.hhGeracao;
    if (idxDt !== undefined && idxHh !== undefined) {
      const stamp = generationStampToIso(
        clean(cells[idxDt] ?? ""),
        clean(cells[idxHh] ?? ""),
      );
      bump(acc.generationStamps, stamp ?? "INVÁLIDA");
    } else {
      bump(acc.generationStamps, "AUSENTE");
    }

    // Deduplicação pela chave da unidade de análise: uma linha cujo
    // SQ_CANDIDATO já foi processado NÃO entra em nenhuma contagem analítica.
    if (!row.sqCandidato) {
      acc.rowsWithoutKey += 1;
      continue;
    }
    if (acc.seenKeys.has(row.sqCandidato)) {
      acc.duplicateRows += 1;
      continue;
    }
    acc.seenKeys.add(row.sqCandidato);
    acc.distinctCandidacies += 1;
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

/**
 * Data da fotografia segundo o próprio arquivo do TSE.
 * Só devolve valor se TODAS as linhas trouxerem a mesma data de geração
 * (a hora pode variar entre arquivos do pacote; nesse caso usa-se a mais
 * recente). Qualquer inconsistência devolve null e bloqueia a publicação.
 */
export function resolveBaseGeneratedAt(result: ParseResult): {
  value: string | null;
  problem: string | null;
} {
  const stamps = Object.keys(result.generationStamps);
  if (stamps.length === 0) {
    return { value: null, problem: "Nenhuma data de geração lida do arquivo" };
  }
  const invalid = stamps.filter((s) => s === "INVÁLIDA" || s === "AUSENTE");
  if (invalid.length > 0) {
    return {
      value: null,
      problem:
        "DT_GERACAO/HH_GERACAO ausente ou em formato inesperado em parte das linhas",
    };
  }
  const days = new Set(stamps.map((s) => s.slice(0, 10)));
  if (days.size > 1) {
    return {
      value: null,
      problem: `Datas de geração divergentes entre os arquivos do pacote: ${[...days].sort().join(", ")}`,
    };
  }
  const latest = stamps.sort().at(-1)!;
  return { value: latest, problem: null };
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
  "Deduplicação por SQ_CANDIDATO antes de qualquer contagem: linha com chave já processada é descartada dos numeradores, denominadores, cor/raça e dimensões; o total de linhas brutas e a quantidade de duplicidades ficam registrados separadamente",
  "Data da fotografia lida de DT_GERACAO + HH_GERACAO nas linhas do próprio arquivo Candidatos (horário de Brasília); metadados do portal não substituem essa data",
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
    if (COLUMNS_FROM_OTHER_RESOURCE.includes(col)) continue;
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
  if (result.duplicateRows > 0) {
    anomalies.push(
      `${result.duplicateRows} linhas com SQ_CANDIDATO repetido foram descartadas das contagens (${result.rawLineCount} linhas brutas → ${result.recordCount} candidaturas distintas) — anomalia informativa, sem efeito sobre os indicadores`,
    );
  }
  if (result.rowsWithoutKey > 0) {
    anomalies.push(
      `${result.rowsWithoutKey} linhas sem SQ_CANDIDATO foram descartadas por não permitirem deduplicação`,
    );
  }
  if (result.recordCount !== result.distinctCandidacies) {
    anomalies.push(
      "Contagem analítica divergente do número de candidaturas distintas — publicação bloqueada",
    );
    publishable = false;
  }
  const generated = resolveBaseGeneratedAt(result);
  if (!generated.value) {
    anomalies.push(
      `Data da fotografia não obtida de DT_GERACAO/HH_GERACAO: ${generated.problem} — publicação bloqueada (metadado do portal não é usado como substituto)`,
    );
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
