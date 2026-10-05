import type { HistoricalSnapshotMeta } from "@/lib/tse/historical.functions";
import type { HistoricalYear } from "@/lib/tse/historical-data-dictionary";
import { formatInt } from "@/lib/format-br";

/**
 * HistoryTimeline — linha temporal 2014 → 2018 → 2022 → 2026 com a situação
 * da base de cada ano. Só exibe metadados já gravados pela coleta.
 */
const YEARS: HistoricalYear[] = [2014, 2018, 2022, 2026];

function fmtDate(iso: string | null) {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("pt-BR");
}

export function HistoryTimeline({
  snapshots,
  missingYears,
  currentBaseGeneratedAt,
}: {
  snapshots: readonly HistoricalSnapshotMeta[];
  missingYears: readonly HistoricalYear[];
  currentBaseGeneratedAt: string | null;
}) {
  return (
    <ol className="grid gap-4 md:grid-cols-4">
      {YEARS.map((year) => {
        const snap = snapshots.find((s) => s.year === year);
        const current = year === 2026;
        const missing = missingYears.includes(year);
        const date = fmtDate(current ? currentBaseGeneratedAt : (snap?.baseGeneratedAt ?? null));
        return (
          <li key={year} className="editorial-card p-5">
            <p className="font-display text-3xl text-ink">{year}</p>
            <div className="mt-2">
              {missing ? (
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">fotografia não coletada</p>
              ) : current ? (
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">1º turno apurado</p>
              ) : (
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">eleição encerrada</p>
              )}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {missing
                ? "Sem fotografia gravada: nada é exibido nem estimado para este ano."
                : current
                  ? "Candidaturas e resultado do 1º turno (4/10) lidos do arquivo oficial do TSE de 05/10/2026. Governos de 7 UFs seguem para o 2º turno, em 25/10."
                  : "Candidaturas e resultado de 1º turno lidos do arquivo oficial do TSE."}
            </p>
            {date && (
              <p className="mt-3 font-mono text-[12px] text-muted-foreground">
                Base gerada em {date}
              </p>
            )}
            {snap && snap.recordCount > 0 && (
              <p className="mt-1 font-mono text-[12px] text-muted-foreground">
                {formatInt(snap.recordCount)} candidaturas
                deduplicadas
              </p>
            )}
            {snap && snap.anomalies.length > 0 && (
              <p className="mt-2 text-sm leading-relaxed text-coral-ink">
                {snap.anomalies.join(" · ")}
              </p>
            )}
          </li>
        );
      })}
    </ol>
  );
}
