/**
 * historical.reads — leitura pública da série histórica (2014 → 2026).
 *
 * Junta as fotografias históricas gravadas (anos encerrados, calculadas dos
 * arquivos oficiais) com a fotografia atual de 2026 já existente no projeto.
 * Para 2026, as eleitas vêm do resultado final cravado em `resultado-2026.ts`
 * (base TSE de 27/10/2026): proporcional pelo 1º turno, o único; majoritário
 * com o 2º turno de 25/10, pela mesma regra de 2014, 2018 e 2022.
 *
 * Desde 28/10/2026 a série fechada é cravada em código (historical-series.ts):
 * nada é lido do banco, e o HTML pré-renderizado já traz todos os anos.
 */

import type { HistoricalYear } from "./historical-data-dictionary";
import { buildAllSeries, type Series, type YearSnapshot } from "./historical-compute";
import { HISTORICAL_SERIES_COLLECTED_AT, HISTORICAL_YEARS_FIXED } from "@/data/historical-series";
import { getLatestTseSnapshot } from "./snapshot.reads";
import { RESULT_2026_MAJORITARIO_FINAL, RESULT_2026_PROPORCIONAL } from "@/data/resultado-2026";

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

/**
 * Série histórica completa. Anos encerrados vêm das fotografias históricas;
 * 2026 vem da fotografia atual do projeto, marcada como base em curso.
 */
export async function getHistoricalSeries(): Promise<HistoricalSeriesPayload> {
  // Anos encerrados: série cravada em código (historical-series.ts), recontada
  // dos arquivos oficiais do TSE. Nenhuma leitura de banco.
  const snapshots: HistoricalSnapshotMeta[] = [];
  const yearSnapshots: YearSnapshot[] = [];
  for (const y of HISTORICAL_YEARS_FIXED) {
    snapshots.push({
      year: y.year,
      collectedAt: HISTORICAL_SERIES_COLLECTED_AT,
      baseGeneratedAt: y.baseGeneratedAt,
      fileName: y.fileName,
      fileUrl: y.fileUrl,
      status: "ok",
      processingVersion: "recontagem-2026-10-28",
      dictionaryVersion: "recontagem-2026-10-28",
      recordCount: y.recordCount,
      rawLineCount: y.recordCount,
      duplicateRows: 0,
      outOfScope: 0,
      electedAvailable: true,
      filters: [
        "NR_TURNO = 1, dedup por SQ_CANDIDATO",
        "Só eleições gerais: suplementares do mesmo arquivo ficam fora",
        "Cargo decidido em 2º turno vale pela linha do 2º turno",
      ],
      anomalies: y.anomalies,
    });
    yearSnapshots.push({
      year: y.year,
      baseGeneratedAt: y.baseGeneratedAt,
      stage: "fechada",
      universes: {
        proporcional: { ...y.universes.proporcional },
        majoritario: { ...y.universes.majoritario },
      },
    });
  }

  // 2026 — candidaturas da fotografia atual (27/10); eleitas proporcionais do
  // resultado final (base TSE de 27/10); majoritário com o 2º turno de 25/10.
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
          raceAll: current.universes.proporcional.raceAllCounts ?? null,
          raceFeminine: current.universes.proporcional.raceCounts,
          elected: {
            total: RESULT_2026_PROPORCIONAL.seats,
            feminine: RESULT_2026_PROPORCIONAL.elected.feminine,
            raceFeminine: { ...RESULT_2026_PROPORCIONAL.electedRaceFeminine },
          },
        },
        majoritario: {
          total: current.universes.majoritario.total,
          feminine: current.universes.majoritario.feminine,
          raceAll: current.universes.majoritario.raceAllCounts ?? null,
          raceFeminine: current.universes.majoritario.raceCounts,
          elected: {
            total: RESULT_2026_MAJORITARIO_FINAL.total,
            feminine: RESULT_2026_MAJORITARIO_FINAL.feminine,
            raceFeminine: { ...RESULT_2026_MAJORITARIO_FINAL.raceFeminine },
          },
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
