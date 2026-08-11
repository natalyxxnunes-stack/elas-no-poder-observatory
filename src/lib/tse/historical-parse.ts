/**
 * historical-parse — leitura dos arquivos oficiais `consulta_cand_<ano>` das
 * eleições gerais de 2014, 2018 e 2022 (TSE / Dados Abertos).
 *
 * Módulo puro: recebe o texto CSV já decodificado (Latin-1) e devolve um
 * acumulador de contagens. Nenhum número é hardcoded, nenhum campo é suposto —
 * as colunas lidas são exatamente as confirmadas em
 * `historical-data-dictionary.ts` (Bloco 5).
 *
 * Regras aplicadas aqui e devolvidas em `HISTORICAL_FILTERS` para auditoria:
 *  - unidade de análise: CANDIDATURA, deduplicada por
 *    (ANO_ELEICAO, CD_ELEICAO, SQ_CANDIDATO);
 *  - apenas 1º turno (NR_TURNO = 1), para não contar duas vezes quem foi a 2º;
 *  - apenas eleição ordinária (CD_TIPO_ELEICAO = 2) — suplementares fora;
 *  - universos proporcional e majoritário separados, com denominadores próprios;
 *  - gênero e cor/raça sempre nas categorias originais do TSE, sem conversão.
 */

import { classifyUniverse, type UniverseId } from "./compute";
import {
  CANDIDATOS_HEADER_BY_YEAR,
  HISTORICAL_DICTIONARY_VERSION,
  type HistoricalYear,
} from "./historical-data-dictionary";
import { generationStampToIso, splitCsvLine } from "./parse";

/** Versão do processamento histórico — muda quando o cálculo muda. */
export const HISTORICAL_PROCESSING_VERSION = `2026.08.11-b5.1+${HISTORICAL_DICTIONARY_VERSION}`;

/** Colunas usadas na série histórica, com o nome REAL do arquivo do TSE. */
export const HISTORICAL_COLUMNS = {
  anoEleicao: "ANO_ELEICAO",
  cdTipoEleicao: "CD_TIPO_ELEICAO",
  nmTipoEleicao: "NM_TIPO_ELEICAO",
  cdEleicao: "CD_ELEICAO",
  dsEleicao: "DS_ELEICAO",
  nrTurno: "NR_TURNO",
  uf: "SG_UF",
  ue: "SG_UE",
  nmUe: "NM_UE",
  cdCargo: "CD_CARGO",
  dsCargo: "DS_CARGO",
  sqCandidato: "SQ_CANDIDATO",
  cdGenero: "CD_GENERO",
  dsGenero: "DS_GENERO",
  cdCorRaca: "CD_COR_RACA",
  dsCorRaca: "DS_COR_RACA",
  dsSituacaoCandidatura: "DS_SITUACAO_CANDIDATURA",
  dsSitTotTurno: "DS_SIT_TOT_TURNO",
  dtGeracao: "DT_GERACAO",
  hhGeracao: "HH_GERACAO",
} as const;

export type HistoricalColumnKey = keyof typeof HISTORICAL_COLUMNS;

/** Colunas sem as quais nenhum indicador histórico pode ser calculado. */
export const HISTORICAL_REQUIRED_COLUMNS: HistoricalColumnKey[] = [
  "anoEleicao",
  "cdEleicao",
  "sqCandidato",
  "dsCargo",
  "dsGenero",
  "nrTurno",
];

const clean = (v: string) => v.replace(/^"+|"+$/g, "").trim();

const norm = (v: string) =>
  v
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toUpperCase();

/** Valores do TSE que significam "sem informação" e não são categoria. */
const NULL_TOKENS = new Set(["", "#NULO", "#NULO#", "#NE", "#NE#", "-1", "-3"]);

/** Preserva a categoria original; só normaliza ausência para rótulo único. */
export function categoryOrUnknown(value: string): string {
  const v = clean(value);
  return NULL_TOKENS.has(norm(v)) ? "NÃO INFORMADO" : v;
}

/** Situações de resultado que caracterizam candidatura eleita (1º turno). */
export const ELECTED_SITUATIONS = [
  "ELEITO",
  "ELEITO POR QP",
  "ELEITO POR MEDIA",
  "MEDIA",
  "ELEITO POR QUOCIENTE PARTIDARIO",
] as const;

export function isElected(dsSitTotTurno: string): boolean {
  return (ELECTED_SITUATIONS as readonly string[]).includes(
    norm(dsSitTotTurno),
  );
}

/** Região do IBGE por UF — usada apenas para agrupar territórios. */
export const REGION_BY_UF: Record<string, string> = {
  AC: "Norte",
  AP: "Norte",
  AM: "Norte",
  PA: "Norte",
  RO: "Norte",
  RR: "Norte",
  TO: "Norte",
  AL: "Nordeste",
  BA: "Nordeste",
  CE: "Nordeste",
  MA: "Nordeste",
  PB: "Nordeste",
  PE: "Nordeste",
  PI: "Nordeste",
  RN: "Nordeste",
  SE: "Nordeste",
  DF: "Centro-Oeste",
  GO: "Centro-Oeste",
  MT: "Centro-Oeste",
  MS: "Centro-Oeste",
  ES: "Sudeste",
  MG: "Sudeste",
  RJ: "Sudeste",
  SP: "Sudeste",
  PR: "Sul",
  RS: "Sul",
  SC: "Sul",
};

export function regionOf(uf: string): string {
  return REGION_BY_UF[clean(uf).toUpperCase()] ?? "NÃO INFORMADO";
}

export type HistoricalRow = {
  anoEleicao: string;
  cdEleicao: string;
  cdTipoEleicao: string;
  nrTurno: string;
  sqCandidato: string;
  cargo: string;
  uf: string;
  genero: string;
  corRaca: string;
  situacaoCandidatura: string;
  sitTotTurno: string;
};

type Counter = Record<string, number>;

const bump = (map: Counter, key: string, by = 1) => {
  map[key] = (map[key] ?? 0) + by;
};

/** Bloco de contagens de um recorte (universo, cargo, UF, região...). */
export type CrossTally = {
  total: number;
  /** contagem por categoria original de DS_GENERO */
  byGender: Counter;
  /** contagem por categoria original de DS_COR_RACA (todas as candidaturas) */
  byRace: Counter;
  /** gênero × raça: cada candidatura entra em exatamente uma célula */
  byGenderRace: Record<string, Counter>;
};

export function emptyCross(): CrossTally {
  return { total: 0, byGender: {}, byRace: {}, byGenderRace: {} };
}

function addToCross(t: CrossTally, gender: string, race: string) {
  t.total += 1;
  bump(t.byGender, gender);
  bump(t.byRace, race);
  const cell = (t.byGenderRace[gender] ??= {});
  bump(cell, race);
}

export type UniverseHistorical = {
  /** candidaturas registradas (todas, sem filtro de situação) */
  candidacies: CrossTally;
  /** candidaturas por cargo (DS_CARGO original) */
  byCargo: Record<string, CrossTally>;
  /** candidaturas por UF (SG_UF original) */
  byUf: Record<string, CrossTally>;
  /** candidaturas por região do IBGE (agrupamento analítico declarado) */
  byRegion: Record<string, CrossTally>;
  /** eleitas/eleitos, quando o resultado oficial existe no arquivo do ano */
  elected: {
    /** total de candidaturas com resultado de eleito no 1º turno */
    all: CrossTally;
    byCargo: Record<string, CrossTally>;
    byUf: Record<string, CrossTally>;
    byRegion: Record<string, CrossTally>;
  };
};

function emptyUniverse(): UniverseHistorical {
  return {
    candidacies: emptyCross(),
    byCargo: {},
    byUf: {},
    byRegion: {},
    elected: {
      all: emptyCross(),
      byCargo: {},
      byUf: {},
      byRegion: {},
    },
  };
}

export type HistoricalTally = {
  year: HistoricalYear;
  headerNames: string[];
  missingColumns: HistoricalColumnKey[];
  /** colunas do dicionário do ano que não apareceram no arquivo */
  unexpectedHeaderDiff: { missing: string[]; extra: string[] };
  rawLineCount: number;
  /** candidaturas distintas efetivamente contadas */
  recordCount: number;
  duplicateRows: number;
  rowsWithoutKey: number;
  /** linhas descartadas por não serem 1º turno */
  otherRounds: number;
  /** linhas descartadas por não serem eleição ordinária */
  otherElectionTypes: number;
  /** candidaturas fora dos dois universos (vice, suplente, prefeito etc.) */
  outOfScope: number;
  universes: Record<UniverseId, UniverseHistorical>;
  /** valores originais de DS_SIT_TOT_TURNO encontrados, com contagem */
  resultValues: Counter;
  /** valores originais de DS_SITUACAO_CANDIDATURA encontrados */
  situationValues: Counter;
  /** valores originais de DS_ELEICAO encontrados (checagem geral × municipal) */
  electionValues: Counter;
  /** marcas DT_GERACAO+HH_GERACAO em ISO, com contagem de linhas */
  generationStamps: Counter;
  seenKeys: Set<string>;
};

export function createHistoricalTally(year: HistoricalYear): HistoricalTally {
  return {
    year,
    headerNames: [],
    missingColumns: [],
    unexpectedHeaderDiff: { missing: [], extra: [] },
    rawLineCount: 0,
    recordCount: 0,
    duplicateRows: 0,
    rowsWithoutKey: 0,
    otherRounds: 0,
    otherElectionTypes: 0,
    outOfScope: 0,
    universes: { proporcional: emptyUniverse(), majoritario: emptyUniverse() },
    resultValues: {},
    situationValues: {},
    electionValues: {},
    generationStamps: {},
    seenKeys: new Set<string>(),
  };
}

type IndexMap = Partial<Record<HistoricalColumnKey, number>>;

export function mapHistoricalColumns(header: readonly string[]): {
  map: IndexMap;
  headerNames: string[];
  missing: HistoricalColumnKey[];
} {
  const headerNames = header.map((h) => clean(h).toUpperCase());
  const map: IndexMap = {};
  const missing: HistoricalColumnKey[] = [];
  for (const key of Object.keys(HISTORICAL_COLUMNS) as HistoricalColumnKey[]) {
    const idx = headerNames.indexOf(HISTORICAL_COLUMNS[key]);
    if (idx >= 0) map[key] = idx;
    else missing.push(key);
  }
  return { map, headerNames, missing };
}

/** Compara o cabeçalho real com o cabeçalho documentado para aquele ano. */
export function diffAgainstDictionary(
  year: HistoricalYear,
  headerNames: readonly string[],
): { missing: string[]; extra: string[] } {
  const expected = CANDIDATOS_HEADER_BY_YEAR[year] ?? [];
  const found = new Set(headerNames);
  return {
    missing: expected.filter((c) => !found.has(c)),
    extra: headerNames.filter((c) => !expected.includes(c)),
  };
}

function crossFor(bucket: Record<string, CrossTally>, key: string): CrossTally {
  return (bucket[key] ??= emptyCross());
}

/**
 * Lê um CSV do pacote histórico e acumula as contagens em `acc`.
 * Um pacote traz vários arquivos (por UF, mais BR/BRASIL): a deduplicação por
 * (ANO_ELEICAO, CD_ELEICAO, SQ_CANDIDATO) impede dupla contagem entre eles.
 */
export function ingestHistoricalCsv(
  csv: string,
  acc: HistoricalTally,
): HistoricalTally {
  const lines = csv.split(/\r?\n/);
  let map: IndexMap | null = null;

  for (const line of lines) {
    if (!line.trim()) continue;
    const cells = splitCsvLine(line);
    if (!map) {
      const mapped = mapHistoricalColumns(cells);
      map = mapped.map;
      if (acc.headerNames.length === 0) {
        acc.headerNames = mapped.headerNames;
        acc.missingColumns = mapped.missing;
        acc.unexpectedHeaderDiff = diffAgainstDictionary(
          acc.year,
          mapped.headerNames,
        );
      }
      continue;
    }

    const at = (key: HistoricalColumnKey) => {
      const i = map![key];
      return i === undefined ? "" : clean(cells[i] ?? "");
    };

    const row: HistoricalRow = {
      anoEleicao: at("anoEleicao"),
      cdEleicao: at("cdEleicao"),
      cdTipoEleicao: at("cdTipoEleicao"),
      nrTurno: at("nrTurno"),
      sqCandidato: at("sqCandidato"),
      cargo: at("dsCargo"),
      uf: at("uf"),
      genero: at("dsGenero"),
      corRaca: at("dsCorRaca"),
      situacaoCandidatura: at("dsSituacaoCandidatura"),
      sitTotTurno: at("dsSitTotTurno"),
    };
    if (!row.cargo && !row.genero && !row.sqCandidato) continue;
    acc.rawLineCount += 1;

    const stamp = generationStampToIso(at("dtGeracao"), at("hhGeracao"));
    bump(acc.generationStamps, stamp ?? "INVÁLIDA");

    // Eleição ordinária apenas (suplementares têm outro universo).
    if (row.cdTipoEleicao && row.cdTipoEleicao !== "2") {
      acc.otherElectionTypes += 1;
      continue;
    }
    // Somente 1º turno: evita contar duas vezes quem disputou o 2º.
    if (row.nrTurno && row.nrTurno !== "1") {
      acc.otherRounds += 1;
      continue;
    }

    if (!row.sqCandidato) {
      acc.rowsWithoutKey += 1;
      continue;
    }
    const key = `${row.anoEleicao}|${row.cdEleicao}|${row.sqCandidato}`;
    if (acc.seenKeys.has(key)) {
      acc.duplicateRows += 1;
      continue;
    }
    acc.seenKeys.add(key);
    acc.recordCount += 1;

    bump(acc.electionValues, categoryOrUnknown(at("dsEleicao")));
    bump(acc.situationValues, categoryOrUnknown(row.situacaoCandidatura));
    bump(acc.resultValues, categoryOrUnknown(row.sitTotTurno));

    const universe = classifyUniverse(row.cargo);
    if (!universe) {
      acc.outOfScope += 1;
      continue;
    }

    const gender = categoryOrUnknown(row.genero);
    const race = categoryOrUnknown(row.corRaca);
    const cargo = categoryOrUnknown(row.cargo);
    const uf = categoryOrUnknown(row.uf);
    const region = regionOf(row.uf);

    const u = acc.universes[universe];
    addToCross(u.candidacies, gender, race);
    addToCross(crossFor(u.byCargo, cargo), gender, race);
    addToCross(crossFor(u.byUf, uf), gender, race);
    addToCross(crossFor(u.byRegion, region), gender, race);

    if (isElected(row.sitTotTurno)) {
      addToCross(u.elected.all, gender, race);
      addToCross(crossFor(u.elected.byCargo, cargo), gender, race);
      addToCross(crossFor(u.elected.byUf, uf), gender, race);
      addToCross(crossFor(u.elected.byRegion, region), gender, race);
    }
  }
  return acc;
}

/** Data oficial da base histórica, lida do próprio arquivo. */
export function resolveHistoricalGeneratedAt(acc: HistoricalTally): {
  value: string | null;
  problem: string | null;
} {
  const stamps = Object.keys(acc.generationStamps);
  if (stamps.length === 0) {
    return { value: null, problem: "Nenhuma data de geração lida do arquivo" };
  }
  if (stamps.includes("INVÁLIDA")) {
    return {
      value: null,
      problem:
        "DT_GERACAO/HH_GERACAO ausente ou em formato inesperado em parte das linhas",
    };
  }
  return { value: stamps.sort().at(-1)!, problem: null };
}

/** Filtros efetivamente aplicados na série histórica, gravados no snapshot. */
export const HISTORICAL_FILTERS = [
  "Fonte: arquivos oficiais `consulta_cand_<ano>` do TSE / Dados Abertos, um pacote por eleição geral",
  "Apenas eleições gerais: nenhum arquivo municipal é lido, e linhas com CD_TIPO_ELEICAO diferente de 2 (eleição ordinária) são descartadas",
  "Unidade de análise: candidatura, deduplicada pela chave (ANO_ELEICAO, CD_ELEICAO, SQ_CANDIDATO)",
  "Somente NR_TURNO = 1, para não contar duas vezes candidaturas que foram a segundo turno",
  "Universo proporcional: deputado federal, deputado estadual e deputado distrital",
  "Universo majoritário: presidente, governador e senador",
  "Cada eleição mantém universo e denominador próprios; anos e universos nunca são somados",
  "Gênero conforme DS_GENERO e cor/raça conforme DS_COR_RACA, sempre nas categorias originais do TSE, sem conversão e sem inferência por nome",
  "Gênero × raça: cada candidatura entra em exatamente uma célula da tabela cruzada, sem duplicação",
  "Eleitas/eleitos identificados por DS_SIT_TOT_TURNO (ELEITO, ELEITO POR QP, ELEITO POR MÉDIA, MÉDIA) no 1º turno; anos sem resultado publicado ficam sem indicador, nunca estimados",
  "Data da fotografia lida de DT_GERACAO + HH_GERACAO do próprio arquivo, separada da data da coleta",
  `Colunas lidas conforme o dicionário histórico versionado ${HISTORICAL_DICTIONARY_VERSION}`,
];
