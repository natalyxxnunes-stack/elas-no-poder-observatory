/**
 * snapshot.reads — leitura pública da fotografia mais recente do TSE.
 *
 * Camada isomórfica: usa o cliente publicável do projeto (RLS: leitura pública
 * da tabela de fotografias) e roda igual no navegador e no pré-render. Devolve
 * apenas o que a camada editorial precisa: contagens, indicadores, data da
 * fotografia e identificação do arquivo. Nenhum segredo, nenhum log de
 * pipeline.
 */

import { supabase } from "@/integrations/supabase/client";
import {
  snapshot as pinnedSnapshot,
  PINNED_BRASIL_CSV_SHA256,
  PINNED_FILE_NAME,
} from "@/data/tse-snapshot";
import { buildSnapshotCsv } from "./snapshot-csv";


export type PublicUniverseTally = {
  feminine: number;
  total: number;
  raceCounts: Record<string, number>;
  situationCounts?: Record<string, number>;
  /**
   * Contagens brutas por dimensões confirmadas no dicionário de dados
   * (UF, partido, forma de agremiação). Nenhum indicador é derivado delas
   * automaticamente: existem para permitir recortes futuros documentados.
   */
  dimensions?: {
    feminineByUf?: Record<string, number>;
    totalByUf?: Record<string, number>;
    feminineByParty?: Record<string, number>;
    totalByParty?: Record<string, number>;
    feminineByAgremiacao?: Record<string, number>;
    totalByAgremiacao?: Record<string, number>;
    /** SG_PARTIDO → DS_COR_RACA → candidaturas de mulheres */
    raceByParty?: Record<string, Record<string, number>>;
    /** SG_UF → DS_COR_RACA → candidaturas de mulheres */
    raceByUf?: Record<string, Record<string, number>>;
    /** `SG_UF|SG_PARTIDO` → DS_COR_RACA → candidaturas de mulheres */
    raceByUfParty?: Record<string, Record<string, number>>;
    /**
     * `SG_UF|SG_PARTIDO` → total de candidaturas / candidaturas de mulheres.
     * Ausente nas fotografias gravadas antes desta versão do processamento:
     * sem essas células, nenhum percentual de gênero por UF × partido é exibido.
     */
    totalByUfParty?: Record<string, number>;
    feminineByUfParty?: Record<string, number>;
  };
};

export type PublicSnapshot = {
  id: string;
  collectedAt: string;
  baseGeneratedAt: string | null;
  fileName: string;
  fileUrl: string;
  recordCount: number;
  status: string;
  conferido: boolean;
  /** SHA-256 do arquivo ZIP como baixado do TSE */
  zipSha256: string | null;
  /** SHA-256 do CSV BRASIL, arquivo de onde os indicadores são calculados */
  brasilCsvSha256: string | null;
  processingVersion: string;
  filters: string[];
  situationValues: Record<string, number>;
  /**
   * Candidaturas fora dos dois universos analisados, desagregadas pelo valor
   * literal de cargo do arquivo. Nulo nas fotografias anteriores ao campo.
   */
  outOfUniverse: {
    total: number;
    byCargo: Record<string, number>;
    feminineByCargo: Record<string, number>;
  } | null;
  universes: {
    proporcional: PublicUniverseTally;
    majoritario: PublicUniverseTally;
  };
};

/**
 * Regra única de vigência: uma fotografia só é pública se tiver passado por
 * conferência manual explícita (`conferido = true`) e não estiver marcada como
 * inválida. `status = ok` por si só NÃO publica.
 */
const PUBLISHABLE_STATUSES = ["ok", "requer_conferencia"] as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function publishedQuery(columns: string): any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (supabase.from("tse_snapshots") as any)
    .select(columns)
    .eq("conferido", true)
    .in("status", PUBLISHABLE_STATUSES as unknown as string[])
    .order("collected_at", { ascending: false })
    .limit(1);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toPublic(row: any): PublicSnapshot {
  return {
    id: row.id,
    collectedAt: row.collected_at,
    baseGeneratedAt: row.base_generated_at ?? null,
    fileName: row.file_name,
    fileUrl: row.file_url,
    recordCount: row.record_count ?? 0,
    status: row.status,
    conferido: row.conferido === true,
    zipSha256: row.zip_sha256 ?? null,
    brasilCsvSha256: row.brasil_csv_sha256 ?? null,
    processingVersion: row.processing_version,
    filters: Array.isArray(row.filters) ? row.filters : [],
    situationValues: row.situation_values ?? {},
    outOfUniverse: row.out_of_universe ?? null,
    universes: {
      proporcional: row.universes?.proporcional ?? {
        feminine: 0,
        total: 0,
        raceCounts: {},
      },
      majoritario: row.universes?.majoritario ?? {
        feminine: 0,
        total: 0,
        raceCounts: {},
      },
    },
  };
}

/**
 * Fotografia cravada em código, projetada no formato público. Enquanto ela
 * existir, nenhuma leitura de banco acontece em tempo de execução.
 */
function pinnedPublic(): PublicSnapshot | null {
  if (!pinnedSnapshot) return null;
  const { proporcional, majoritario } = pinnedSnapshot.universes;
  return {
    id: "pinned-" + pinnedSnapshot.baseGeneratedAt,
    collectedAt: pinnedSnapshot.processedAt,
    baseGeneratedAt: pinnedSnapshot.baseGeneratedAt,
    fileName: PINNED_FILE_NAME,
    fileUrl: pinnedSnapshot.resourceUrl,
    recordCount: proporcional.total + majoritario.total,
    status: "ok",
    conferido: true,
    zipSha256: null,
    brasilCsvSha256: PINNED_BRASIL_CSV_SHA256,
    processingVersion: "cravado-em-codigo",
    filters: [...pinnedSnapshot.filters],
    situationValues: {},
    outOfUniverse: null,
    universes: { proporcional, majoritario },
  };
}

/**
 * Fotografia vigente. Com a fotografia cravada em código, ela é a resposta.
 * Sem ela, cai na fotografia conferida mais recente do banco (`conferido =
 * true`) com status `ok` ou `requer_conferencia`.
 */
export async function getLatestTseSnapshot(): Promise<PublicSnapshot | null> {
  const pinned = pinnedPublic();
  if (pinned) return pinned;
  const { data } = await publishedQuery("*").maybeSingle();
  return data ? toPublic(data) : null;
}

/**
 * Data da fotografia retida aguardando conferência, quando ela for mais
 * recente que a fotografia vigente. Com a fotografia cravada em código não
 * existe pendência a informar.
 */
export async function getPendingReviewBaseDate(): Promise<string | null> {
  if (pinnedSnapshot) return null;
  const [{ data: published }, { data: pending }] = await Promise.all([
    publishedQuery("base_generated_at").maybeSingle(),
    supabase
      .from("tse_snapshots")
      .select("base_generated_at")
      .in("status", ["ok", "requer_conferencia"])
      .eq("conferido", false)
      .order("collected_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
  ]);
  const pendingDate =
    (pending as { base_generated_at: string | null } | null)
      ?.base_generated_at ?? null;
  if (!pendingDate) return null;
  const publishedDate = published?.base_generated_at ?? null;
  if (publishedDate && new Date(pendingDate) <= new Date(publishedDate)) {
    return null;
  }
  return pendingDate;
}

/** Histórico de fotografias, do mais recente para o mais antigo. */
export async function listTseSnapshots(): Promise<PublicSnapshot[]> {
  const pinned = pinnedPublic();
  if (pinned) return [pinned];
  const { data } = await supabase
    .from("tse_snapshots")
    .select("*")
    .order("collected_at", { ascending: false })
    .limit(60);
  return (data ?? []).map(toPublic);
}

/**
 * CSV da fotografia vigente, montado na hora a partir da fotografia publicada.
 * Devolve null quando não há fotografia publicável.
 */
export async function getLatestTseSnapshotCsv(): Promise<{
  fileName: string;
  content: string;
} | null> {
  const snap = await getLatestTseSnapshot();
  return snap ? buildSnapshotCsv(snap) : null;
}

/**
 * Carimbo global da última fotografia publicada. Payload mínimo, para o
 * rodapé do site: as duas datas são nomeadas separadamente (geração do
 * arquivo pelo TSE e coleta pelo observatório) e nada é inferido.
 */
export async function getSnapshotStamp(): Promise<{
  baseGeneratedAt: string | null;
  collectedAt: string;
} | null> {
  const pinned = pinnedPublic();
  if (pinned) {
    return {
      baseGeneratedAt: pinned.baseGeneratedAt,
      collectedAt: pinned.collectedAt,
    };
  }
  const { data } = await publishedQuery(
    "base_generated_at, collected_at",
  ).maybeSingle();
  if (!data) return null;
  return {
    baseGeneratedAt: data.base_generated_at ?? null,
    collectedAt: data.collected_at,
  };
}

