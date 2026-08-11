/**
 * ingest.server — rotina de coleta diária da base oficial do TSE.
 *
 * Fluxo:
 *  1. lê os metadados oficiais do dataset em dadosabertos.tse.jus.br (CKAN);
 *  2. identifica o recurso `Candidatos` e sua data de geração informada pelo TSE;
 *  3. baixa o arquivo .zip do endereço oficial publicado nesses metadados;
 *  4. descompacta, mapeia as colunas reais e conta as candidaturas;
 *  5. valida e grava um NOVO snapshot (nada é sobrescrito).
 *
 * Não há scraping de página visual e não há fonte de terceiros. Se o download
 * falhar, o snapshot é gravado com status de falha e a fotografia anterior
 * permanece intacta — nenhum número antigo é reapresentado como atual.
 */

import { unzipSync } from "fflate";
import {
  APPLIED_FILTERS,
  PROCESSING_VERSION,
  computeIndicators,
  createTally,
  ingestCsv,
  validate,
} from "./parse";

const DATASET_API =
  "https://dadosabertos.tse.jus.br/api/3/action/package_show?id=candidatos-2026";
const RESOURCE_NAME = "Candidatos";
const DATASET_PAGE = "https://dadosabertos.tse.jus.br/dataset/candidatos-2026";

type CkanResource = {
  name?: string;
  url?: string;
  format?: string;
  created?: string;
  last_modified?: string | null;
  metadata_modified?: string;
};

export type IngestOutcome = {
  ok: boolean;
  snapshotId: string | null;
  status: string;
  fileName: string;
  fileUrl: string;
  baseGeneratedAt: string | null;
  recordCount: number;
  anomalies: string[];
  message: string;
};

/** Decodifica bytes ISO-8859-1 (Latin-1), encoding usado nos arquivos do TSE. */
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

async function fetchResourceMetadata(): Promise<CkanResource> {
  const res = await fetch(DATASET_API, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(
      `metadados do dataset indisponíveis (HTTP ${res.status})`,
    );
  }
  const json = (await res.json()) as {
    result?: { resources?: CkanResource[] };
  };
  const resources = json.result?.resources ?? [];
  const resource =
    resources.find((r) => (r.name ?? "").trim() === RESOURCE_NAME) ??
    resources.find((r) => (r.url ?? "").includes("consulta_cand_2026.zip"));
  if (!resource?.url) {
    throw new Error("recurso 'Candidatos' não encontrado nos metadados do TSE");
  }
  return resource;
}

async function downloadZip(url: string): Promise<Uint8Array> {
  const res = await fetch(url, {
    headers: {
      Accept: "application/zip,application/octet-stream,*/*",
      Referer: DATASET_PAGE,
      "User-Agent":
        "quem-sao-elas-observatorio/1.0 (coleta diaria de dados abertos do TSE)",
    },
  });
  if (!res.ok) {
    throw new Error(`download do arquivo oficial recusado (HTTP ${res.status})`);
  }
  return new Uint8Array(await res.arrayBuffer());
}

/**
 * Executa uma coleta completa e grava o snapshot resultante.
 * Recebe o client administrativo já carregado pelo chamador.
 */
export async function runIngest(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabaseAdmin: any,
): Promise<IngestOutcome> {
  const collectedAt = new Date().toISOString();
  let fileName = "consulta_cand_2026.zip";
  let fileUrl = "";
  let baseGeneratedAt: string | null = null;

  const fail = async (message: string): Promise<IngestOutcome> => {
    const { data } = await supabaseAdmin
      .from("tse_snapshots")
      .insert({
        collected_at: collectedAt,
        base_generated_at: baseGeneratedAt,
        file_name: fileName,
        file_url: fileUrl || DATASET_PAGE,
        record_count: 0,
        status: "falha_coleta",
        processing_version: PROCESSING_VERSION,
        filters: APPLIED_FILTERS,
        anomalies: [message],
        notes: "Coleta sem sucesso. Fotografia anterior preservada.",
      })
      .select("id")
      .single();
    return {
      ok: false,
      snapshotId: data?.id ?? null,
      status: "falha_coleta",
      fileName,
      fileUrl,
      baseGeneratedAt,
      recordCount: 0,
      anomalies: [message],
      message,
    };
  };

  let bytes: Uint8Array;
  try {
    const resource = await fetchResourceMetadata();
    fileUrl = resource.url!;
    fileName = fileUrl.split("/").pop() || fileName;
    baseGeneratedAt =
      resource.last_modified ?? resource.created ?? resource.metadata_modified ?? null;
    bytes = await downloadZip(fileUrl);
  } catch (error) {
    return fail(error instanceof Error ? error.message : String(error));
  }

  // Descompactação e leitura de todos os CSVs do pacote (um por UF).
  const acc = createTally();
  try {
    const files = unzipSync(bytes);
    const csvNames = Object.keys(files).filter((n) => /\.csv$/i.test(n));
    if (csvNames.length === 0) throw new Error("pacote sem arquivos .csv");
    for (const name of csvNames) {
      ingestCsv(decodeLatin1(files[name]!), acc);
    }
  } catch (error) {
    return fail(
      `arquivo baixado não pôde ser processado: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }

  const indicators = computeIndicators(acc);

  const { data: previous } = await supabaseAdmin
    .from("tse_snapshots")
    .select("record_count")
    .in("status", ["ok", "anomalia"])
    .order("collected_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const validation = validate(acc, indicators, previous?.record_count ?? null);

  const { data, error } = await supabaseAdmin
    .from("tse_snapshots")
    .insert({
      collected_at: collectedAt,
      base_generated_at: baseGeneratedAt,
      file_name: fileName,
      file_url: fileUrl,
      record_count: acc.recordCount,
      status: validation.status,
      processing_version: PROCESSING_VERSION,
      columns_found: acc.headerNames,
      filters: APPLIED_FILTERS,
      situation_values: acc.situationValues,
      universes: acc.universes,
      indicators,
      anomalies: validation.anomalies,
      notes: `Dicionário de dados ${DICTIONARY_VERSION} (inspeção de cabeçalho real em ${INSPECTED_AT}). Candidaturas distintas por SQ_CANDIDATO: ${acc.distinctCandidacies}. Linhas fora dos universos analisados: ${acc.outOfScope}.`,
    })
    .select("id")
    .single();

  if (error) {
    return {
      ok: false,
      snapshotId: null,
      status: "erro_gravacao",
      fileName,
      fileUrl,
      baseGeneratedAt,
      recordCount: acc.recordCount,
      anomalies: [error.message],
      message: "Snapshot processado, mas não gravado.",
    };
  }

  return {
    ok: validation.publishable,
    snapshotId: data?.id ?? null,
    status: validation.status,
    fileName,
    fileUrl,
    baseGeneratedAt,
    recordCount: acc.recordCount,
    anomalies: validation.anomalies,
    message: validation.publishable
      ? "Nova fotografia gravada."
      : "Fotografia gravada como inválida; a anterior segue sendo a fotografia atual.",
  };
}
