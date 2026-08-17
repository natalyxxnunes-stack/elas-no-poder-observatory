import type { HistoricalSnapshotMeta } from "@/lib/tse/historical.functions";
import type { HistoricalYear } from "@/lib/tse/historical-data-dictionary";
import { StatusTag } from "@/components/editorial/StatusTag";

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
                <StatusTag tone="pending">fotografia não coletada</StatusTag>
              ) : current ? (
                <StatusTag tone="pending">base em curso</StatusTag>
              ) : (
                <StatusTag tone="ok">eleição encerrada</StatusTag>
              )}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {missing
                ? "Sem fotografia gravada: nada é exibido nem estimado para este ano."
                : current
                  ? "Candidaturas registradas para 2026. Não há resultado eleitoral: nenhuma eleita é exibida."
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
              <p className="mt-2 font-mono text-[12px] leading-relaxed text-coral-ink">
                {snap.anomalies.join(" · ")}
              </p>
            )}
          </li>
        );
      })}
    </ol>
  );
}
