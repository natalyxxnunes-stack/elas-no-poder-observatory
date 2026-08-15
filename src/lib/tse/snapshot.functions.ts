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

/**
 * Regra única de vigência: uma fotografia só é pública se tiver passado por
 * conferência manual explícita (`conferido = true`) e não estiver marcada como
 * inválida. `status = ok` por si só NÃO publica.
 */
const PUBLISHABLE_STATUSES = ["ok", "requer_conferencia"] as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function publishedQuery(db: ReturnType<typeof client>, columns: string): any {
  return (db.from("tse_snapshots") as any)
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
 * Fotografia mais recente publicável: apenas fotografias conferidas
 * manualmente (`conferido = true`) com status `ok` ou `requer_conferencia`.
 * Uma coleta com `status = ok` e sem conferência fica retida, não vigente.
 */
export const getLatestTseSnapshot = createServerFn({ method: "GET" }).handler(
  async (): Promise<PublicSnapshot | null> => {
    const { data } = await publishedQuery(client(), "*").maybeSingle();
    return data ? toPublic(data) : null;
  },
);

/**
 * Data da fotografia retida aguardando conferência, quando ela for mais
 * recente que a fotografia vigente. Serve apenas para informar, de forma
 * factual, que há atualização em conferência. Sem pendência, devolve null.
 */
export const getPendingReviewBaseDate = createServerFn({ method: "GET" }).handler(
  async (): Promise<string | null> => {
    const db = client();
    const [{ data: published }, { data: pending }] = await Promise.all([
      publishedQuery(db, "base_generated_at").maybeSingle(),
      db
        .from("tse_snapshots")
        .select("base_generated_at")
        .in("status", ["ok", "requer_conferencia"])
        .eq("conferido", false)
        .order("collected_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
    ]);
    const pendingDate = pending?.base_generated_at ?? null;
    if (!pendingDate) return null;
    const publishedDate = published?.base_generated_at ?? null;
    if (publishedDate && new Date(pendingDate) <= new Date(publishedDate)) {
      return null;
    }
    return pendingDate;
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

/** Escapa um campo para CSV com delimitador vírgula. */
function csvField(value: string | number): string {
  const s = String(value);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

/**
 * CSV da fotografia vigente, gerado na hora a partir do snapshot publicado.
 * Nenhum cálculo novo: apenas serializa as contagens já gravadas.
 * Devolve null quando não há fotografia publicável.
 */
export const getLatestTseSnapshotCsv = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ fileName: string; content: string } | null> => {
    const { data } = await client()
      .from("tse_snapshots")
      .select("*")
      .or("status.eq.ok,and(status.eq.requer_conferencia,conferido.eq.true)")
      .order("collected_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (!data) return null;
    const snap = toPublic(data);

    const lines: string[] = [
      "# Fonte: TSE / Dados Abertos / Candidatos 2026",
      `# Geracao da base (TSE): ${snap.baseGeneratedAt ?? "nao informada"}`,
      `# Coleta pelo observatorio: ${snap.collectedAt}`,
      `# Arquivo processado: ${snap.fileName}`,
      `# SHA-256 do arquivo processado (procedencia, nao validacao de calculo): ${snap.brasilCsvSha256 ?? snap.zipSha256 ?? "nao registrado nesta fotografia"}`,
      `# Filtros aplicados: ${snap.filters.length > 0 ? snap.filters.join(" | ") : "nenhum"}`,
      "# Unidade de analise: candidatura registrada (nao pessoa)",
      "universo,categoria,quantidade,total_mulheres_universo,total_candidaturas_universo",
    ];

    const universes: Array<[string, PublicUniverseTally]> = [
      ["proporcional", snap.universes.proporcional],
      ["majoritario", snap.universes.majoritario],
    ];

    for (const [name, tally] of universes) {
      lines.push(
        [name, "TOTAL", tally.feminine, tally.feminine, tally.total]
          .map(csvField)
          .join(","),
      );
      for (const [category, count] of Object.entries(tally.raceCounts ?? {}).sort(
        (a, b) => b[1] - a[1],
      )) {
        lines.push(
          [name, category, count, tally.feminine, tally.total]
            .map(csvField)
            .join(","),
        );
      }
    }

    const base = (snap.baseGeneratedAt ?? snap.collectedAt).slice(0, 10);
    return {
      fileName: `quem-sao-elas-fotografia-tse-${base}.csv`,
      content: `\uFEFF${lines.join("\n")}\n`,
    };
  },
);

/**
 * Carimbo global da última fotografia publicada. Payload mínimo, para o
 * rodapé do site: as duas datas são nomeadas separadamente (geração do
 * arquivo pelo TSE e coleta pelo observatório) e nada é inferido.
 */
export const getSnapshotStamp = createServerFn({ method: "GET" }).handler(
  async (): Promise<{
    baseGeneratedAt: string | null;
    collectedAt: string;
  } | null> => {
    const { data } = await client()
      .from("tse_snapshots")
      .select("base_generated_at, collected_at")
      .or("status.eq.ok,and(status.eq.requer_conferencia,conferido.eq.true)")
      .order("collected_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (!data) return null;
    return {
      baseGeneratedAt: data.base_generated_at ?? null,
      collectedAt: data.collected_at,
    };
  },
);
