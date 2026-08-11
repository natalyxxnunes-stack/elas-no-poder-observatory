/**
 * snapshot.functions — leitura pública da fotografia mais recente do TSE.
 *
 * Usa a chave publicável (RLS: leitura pública da tabela de snapshots) e
 * devolve apenas o que a camada editorial precisa: contagens, indicadores,
 * data da fotografia e identificação do arquivo. Nenhum log ou detalhe de
 * pipeline é exposto aqui.
 */

import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

export type PublicUniverseTally = {
  feminine: number;
  total: number;
  raceCounts: Record<string, number>;
  situationCounts?: Record<string, number>;
};

export type PublicSnapshot = {
  id: string;
  collectedAt: string;
  baseGeneratedAt: string | null;
  fileName: string;
  fileUrl: string;
  recordCount: number;
  status: string;
  processingVersion: string;
  filters: string[];
  situationValues: Record<string, number>;
  universes: {
    proporcional: PublicUniverseTally;
    majoritario: PublicUniverseTally;
  };
};

function client() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false },
    global: {
      fetch: (input: RequestInfo | URL, init?: RequestInit) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
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
    processingVersion: row.processing_version,
    filters: Array.isArray(row.filters) ? row.filters : [],
    situationValues: row.situation_values ?? {},
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

/** Fotografia mais recente publicável (status ok ou com anomalia sinalizada). */
export const getLatestTseSnapshot = createServerFn({ method: "GET" }).handler(
  async (): Promise<PublicSnapshot | null> => {
    const { data } = await client()
      .from("tse_snapshots")
      .select("*")
      .in("status", ["ok", "anomalia"])
      .order("collected_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    return data ? toPublic(data) : null;
  },
);

/** Histórico de fotografias, do mais recente para o mais antigo. */
export const listTseSnapshots = createServerFn({ method: "GET" }).handler(
  async (): Promise<PublicSnapshot[]> => {
    const { data } = await client()
      .from("tse_snapshots")
      .select("*")
      .order("collected_at", { ascending: false })
      .limit(60);
    return (data ?? []).map(toPublic);
  },
);
