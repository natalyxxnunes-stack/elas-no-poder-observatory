/**
 * historical.reads — leitura pública da série histórica (2014 → 2026).
 *
 * Junta as fotografias históricas gravadas (anos encerrados, calculadas dos
 * arquivos oficiais) com a fotografia atual de 2026 já existente no projeto.
 * Nenhum valor de 2026 relativo a resultado eleitoral é criado: a eleição não
 * ocorreu, e o ponto fica explicitamente vazio.
 *
 * Camada isomórfica: usa o cliente publicável (RLS de leitura pública) e roda
 * igual no navegador e no pré-render.
 */

import { supabase } from "@/integrations/supabase/client";
import type { HistoricalYear } from "./historical-data-dictionary";
import {
  buildAllSeries,
  yearSnapshotFromAggregates,
  type HistoricalAggregates,
  type Series,
  type YearSnapshot,
} from "./historical-compute";
import { getLatestTseSnapshot } from "./snapshot.reads";

export type HistoricalSnapshotMeta = {
  year: HistoricalYear;
  collectedAt: string;
  baseGeneratedAt: string | null;
  fileName: string;
  fileUrl: string;
  status: string;
  processingVersion: string;
  dictionaryVersion: string;
  recordCount: number;
  rawLineCount: number;
  duplicateRows: number;
  outOfScope: number;
  electedAvailable: boolean;
  filters: string[];
  anomalies: string[];
};

export type HistoricalSeriesPayload = {
  years: HistoricalYear[];
  snapshots: HistoricalSnapshotMeta[];
  /** anos sem fotografia gravada — a série mostra a lacuna, não estima */
  missingYears: HistoricalYear[];
  series: Series[];
};

const CLOSED_YEARS: HistoricalYear[] = [2014, 2018, 2022];

/**
 * Série histórica completa. Anos encerrados vêm das fotografias históricas;
 * 2026 vem da fotografia atual do projeto, marcada como base em curso.
 */
export async function getHistoricalSeries(): Promise<HistoricalSeriesPayload> {
  const { data } = await supabase
    .from("tse_historical_snapshots")
    .select("*")
    .in("status", ["ok", "anomalia"])
    .order("collected_at", { ascending: false });

  // Uma fotografia por ano: a coleta mais recente válida.
  const latestByYear = new Map<number, Record<string, unknown>>();
  for (const row of data ?? []) {
    const year = Number((row as { election_year: number }).election_year);
    if (!latestByYear.has(year)) latestByYear.set(year, row);
  }

  const snapshots: HistoricalSnapshotMeta[] = [];
  const yearSnapshots: YearSnapshot[] = [];

  for (const year of CLOSED_YEARS) {
    const row = latestByYear.get(year);
    if (!row) continue;
    const r = row as unknown as {
      collected_at: string;
      base_generated_at: string | null;
      file_name: string;
      file_url: string;
      status: string;
      processing_version: string;
      dictionary_version: string;
      record_count: number;
      raw_line_count: number;
      duplicate_rows: number;
      out_of_scope: number;
      filters: string[] | null;
      anomalies: string[] | null;
      aggregates: HistoricalAggregates;
    };
    snapshots.push({
      year,
      collectedAt: r.collected_at,
      baseGeneratedAt: r.base_generated_at,
      fileName: r.file_name,
      fileUrl: r.file_url,
      status: r.status,
      processingVersion: r.processing_version,
      dictionaryVersion: r.dictionary_version,
      recordCount: r.record_count,
      rawLineCount: r.raw_line_count,
      duplicateRows: r.duplicate_rows,
      outOfScope: r.out_of_scope,
      electedAvailable: Boolean(r.aggregates?.electedAvailable),
      filters: r.filters ?? [],
      anomalies: r.anomalies ?? [],
    });
    yearSnapshots.push(
      yearSnapshotFromAggregates(r.aggregates, r.base_generated_at),
    );
  }

  // 2026 — fotografia atual do projeto, sem resultado eleitoral.
  const current = await getLatestTseSnapshot();
  if (current) {
    yearSnapshots.push({
      year: 2026,
      baseGeneratedAt: current.baseGeneratedAt,
      stage: "em_curso",
      universes: {
        proporcional: {
          total: current.universes.proporcional.total,
          feminine: current.universes.proporcional.feminine,
          raceAll: null,
          raceFeminine: current.universes.proporcional.raceCounts,
          elected: null,
        },
        majoritario: {
          total: current.universes.majoritario.total,
          feminine: current.universes.majoritario.feminine,
          raceAll: null,
          raceFeminine: current.universes.majoritario.raceCounts,
          elected: null,
        },
      },
    });
  }

  const present = new Set(yearSnapshots.map((y) => y.year));
  const missingYears = ([2014, 2018, 2022, 2026] as HistoricalYear[]).filter(
    (y) => !present.has(y),
  );

  return {
    years: yearSnapshots.map((y) => y.year),
    snapshots,
    missingYears,
    series: buildAllSeries(yearSnapshots),
  };
}
