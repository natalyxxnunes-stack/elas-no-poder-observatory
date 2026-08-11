/**
 * historical-ingest.server — coleta das fotografias históricas das eleições
 * gerais de 2014, 2018 e 2022 a partir dos arquivos oficiais do TSE.
 *
 * Cada ano gera uma fotografia própria, com sua data oficial de geração
 * (DT_GERACAO + HH_GERACAO), sua contagem e seus denominadores. Nada é
 * hardcoded: todos os números vêm da leitura do arquivo baixado.
 *
 * Rodada única / sob demanda: as eleições passadas estão encerradas, então a
 * fotografia só precisa ser refeita se o TSE republicar o pacote.
 */

import { unzipSync } from "fflate";
import {
  HISTORICAL_DICTIONARY_VERSION,
  OFFICIAL_SOURCES,
  type HistoricalYear,
} from "./historical-data-dictionary";
import {
  HISTORICAL_FILTERS,
  HISTORICAL_PROCESSING_VERSION,
  HISTORICAL_REQUIRED_COLUMNS,
  createHistoricalTally,
  ingestHistoricalCsv,
  resolveHistoricalGeneratedAt,
} from "./historical-parse";
import { toHistoricalAggregates } from "./historical-compute";

/** Anos com eleição encerrada que compõem a série histórica. */
export const CLOSED_YEARS: HistoricalYear[] = [2014, 2018, 2022];

const DATASET_PAGE = (year: number) =>
  `https://dadosabertos.tse.jus.br/dataset/candidatos-${year}`;

function candidatosUrl(year: HistoricalYear): string {
  const source = OFFICIAL_SOURCES.find((s) => s.year === year);
  const resource = source?.resources.find((r) =>
    r.url.includes("/consulta_cand/"),
  );
  if (!resource) {
    throw new Error(
      `endereço oficial do recurso Candidatos de ${year} não está no dicionário histórico`,
    );
  }
  return resource.url;
}

function decodeLatin1(bytes: Uint8Array): string {
  let out = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    out += String.fromCharCode(
      ...(bytes.subarray(i, i + chunk) as unknown as number[]),
    );
  }
  return out;
}

async function downloadZip(url: string, year: number): Promise<Uint8Array> {
  const res = await fetch(url, {
    headers: {
      Accept: "application/zip,application/octet-stream,*/*",
      Referer: DATASET_PAGE(year),
      "User-Agent":
        "quem-sao-elas-observatorio/1.0 (serie historica de dados abertos do TSE)",
    },
  });
  if (!res.ok) {
    throw new Error(
      `download do arquivo oficial de ${year} recusado (HTTP ${res.status})`,
    );
  }
  return new Uint8Array(await res.arrayBuffer());
}

export type HistoricalIngestOutcome = {
  year: HistoricalYear;
  ok: boolean;
  snapshotId: string | null;
  status: string;
  fileName: string;
  fileUrl: string;
  baseGeneratedAt: string | null;
  recordCount: number;
  electedAvailable: boolean;
  anomalies: string[];
  message: string;
};

/** Coleta e grava a fotografia histórica de um ano encerrado. */
export async function runHistoricalIngest(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabaseAdmin: any,
  year: HistoricalYear,
): Promise<HistoricalIngestOutcome> {
  const collectedAt = new Date().toISOString();
  let fileUrl = "";
  let fileName = `consulta_cand_${year}.zip`;
  const anomalies: string[] = [];

  const fail = async (message: string): Promise<HistoricalIngestOutcome> => {
    const { data } = await supabaseAdmin
      .from("tse_historical_snapshots")
      .insert({
        election_year: year,
        collected_at: collectedAt,
        base_generated_at: null,
        file_name: fileName,
        file_url: fileUrl || DATASET_PAGE(year),
        status: "falha_coleta",
        processing_version: HISTORICAL_PROCESSING_VERSION,
        dictionary_version: HISTORICAL_DICTIONARY_VERSION,
        filters: HISTORICAL_FILTERS,
        anomalies: [message],
        notes:
          "Coleta histórica sem sucesso. Nenhuma fotografia anterior foi alterada.",
      })
      .select("id")
      .single();
    return {
      year,
      ok: false,
      snapshotId: data?.id ?? null,
      status: "falha_coleta",
      fileName,
      fileUrl,
      baseGeneratedAt: null,
      recordCount: 0,
      electedAvailable: false,
      anomalies: [message],
      message,
    };
  };

  let bytes: Uint8Array;
  try {
    fileUrl = candidatosUrl(year);
    fileName = fileUrl.split("/").pop() || fileName;
    bytes = await downloadZip(fileUrl, year);
  } catch (error) {
    return fail(error instanceof Error ? error.message : String(error));
  }

  const acc = createHistoricalTally(year);
  try {
    const files = unzipSync(bytes);
    const csvNames = Object.keys(files).filter((n) => /\.csv$/i.test(n));
    if (csvNames.length === 0) throw new Error("pacote sem arquivos .csv");
    for (const name of csvNames) {
      ingestHistoricalCsv(decodeLatin1(files[name]!), acc);
    }
  } catch (error) {
    return fail(
      `arquivo de ${year} não pôde ser processado: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }

  const missingRequired = HISTORICAL_REQUIRED_COLUMNS.filter((c) =>
    acc.missingColumns.includes(c),
  );
  if (missingRequired.length > 0) {
    anomalies.push(
      `colunas estruturais ausentes no arquivo de ${year}: ${missingRequired.join(", ")}`,
    );
  }
  if (acc.unexpectedHeaderDiff.missing.length > 0) {
    anomalies.push(
      `colunas documentadas que não apareceram: ${acc.unexpectedHeaderDiff.missing.join(", ")}`,
    );
  }
  if (acc.unexpectedHeaderDiff.extra.length > 0) {
    anomalies.push(
      `colunas novas não documentadas: ${acc.unexpectedHeaderDiff.extra.join(", ")}`,
    );
  }
  if (acc.recordCount === 0) {
    anomalies.push("nenhuma candidatura contada");
  }

  const generated = resolveHistoricalGeneratedAt(acc);
  if (generated.problem) anomalies.push(generated.problem);

  const aggregates = toHistoricalAggregates(acc);
  if (!aggregates.electedAvailable) {
    anomalies.push(
      "resultado eleitoral (DS_SIT_TOT_TURNO) sem valores de eleito neste pacote: indicadores de eleitas ficam indisponíveis para o ano",
    );
  }

  const status =
    missingRequired.length > 0 || acc.recordCount === 0
      ? "invalido"
      : anomalies.length > 0
        ? "anomalia"
        : "ok";

  const { data, error } = await supabaseAdmin
    .from("tse_historical_snapshots")
    .insert({
      election_year: year,
      collected_at: collectedAt,
      base_generated_at: generated.value,
      file_name: fileName,
      file_url: fileUrl,
      status,
      processing_version: HISTORICAL_PROCESSING_VERSION,
      dictionary_version: HISTORICAL_DICTIONARY_VERSION,
      raw_line_count: acc.rawLineCount,
      record_count: acc.recordCount,
      duplicate_rows: acc.duplicateRows,
      rows_without_key: acc.rowsWithoutKey,
      out_of_scope: acc.outOfScope,
      columns_found: acc.headerNames,
      filters: HISTORICAL_FILTERS,
      aggregates,
      anomalies,
      notes: `Fotografia histórica de ${year}. ${acc.recordCount} candidaturas distintas a partir de ${acc.rawLineCount} linhas brutas (${acc.duplicateRows} duplicadas, ${acc.rowsWithoutKey} sem chave, ${acc.otherRounds} de outro turno, ${acc.otherElectionTypes} de eleição não ordinária). Fora dos universos analisados: ${acc.outOfScope}.`,
    })
    .select("id")
    .single();

  if (error) {
    return {
      year,
      ok: false,
      snapshotId: null,
      status: "erro_gravacao",
      fileName,
      fileUrl,
      baseGeneratedAt: generated.value,
      recordCount: acc.recordCount,
      electedAvailable: aggregates.electedAvailable,
      anomalies: [error.message],
      message: "Fotografia histórica processada, mas não gravada.",
    };
  }

  return {
    year,
    ok: status !== "invalido",
    snapshotId: data?.id ?? null,
    status,
    fileName,
    fileUrl,
    baseGeneratedAt: generated.value,
    recordCount: acc.recordCount,
    electedAvailable: aggregates.electedAvailable,
    anomalies,
    message:
      status === "invalido"
        ? "Fotografia gravada como inválida; não alimenta a série histórica."
        : "Fotografia histórica gravada.",
  };
}

/** Coleta os anos encerrados, um por vez. */
export async function runHistoricalIngestAll(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabaseAdmin: any,
  years: HistoricalYear[] = CLOSED_YEARS,
): Promise<HistoricalIngestOutcome[]> {
  const out: HistoricalIngestOutcome[] = [];
  for (const year of years) {
    out.push(await runHistoricalIngest(supabaseAdmin, year));
  }
  return out;
}
