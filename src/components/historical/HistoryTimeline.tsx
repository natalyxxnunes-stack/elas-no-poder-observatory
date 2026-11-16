import type { HistoricalSnapshotMeta } from "@/lib/tse/historical.functions";
import type { HistoricalYear } from "@/lib/tse/historical-data-dictionary";
import { RESULT_2026_META } from "@/data/resultado-2026";
import { formatInt } from "@/lib/format-br";

/** Caderno documental com arquivos TSE efetivos. Nenhum documento é simulado. */
const YEARS: HistoricalYear[] = [2014, 2018, 2022, 2026];

function fmtDate(value: string | null) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? value : d.toLocaleDateString("pt-BR");
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
    <div>
      <p className="mb-5 max-w-3xl text-sm leading-relaxed text-ink/80">
        Cada entrada abaixo corresponde a um conjunto oficial de candidaturas de uma
        eleição geral. Os quatro arquivos são consultados separadamente; nenhum
        registro antigo é reproduzido como fac-símile de jornal.
      </p>
      <ol className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {YEARS.map((year) => {
          const snap = snapshots.find((s) => s.year === year);
          const current = year === 2026;
          const missing = missingYears.includes(year);
          const date = fmtDate(current ? currentBaseGeneratedAt : (snap?.baseGeneratedAt ?? null));
          const href = current ? RESULT_2026_META.resourceUrl : snap?.fileUrl;
          const filename = current ? RESULT_2026_META.fileName : snap?.fileName;
          return (
            <li key={year} className={`flex min-w-0 flex-col px-5 py-6 ${current ? "bg-plum text-cream" : "border border-rule bg-cream text-ink"}`}>
              <p className={`font-mono text-[12px] font-semibold uppercase tracking-wide ${current ? "text-cream/75" : "text-plum"}`}>
                TSE · recurso Candidatos
              </p>
              <p className="mt-3 font-display text-[3.75rem] leading-none">{year}</p>
              <p className={`mt-4 text-sm leading-relaxed ${current ? "text-cream/85" : "text-ink/75"}`}>
                {missing
                  ? "Fotografia não coletada: sem estimativas."
                  : current
                    ? "Candidaturas e resultado final, incluindo os cargos decididos em 2º turno."
                    : "Candidaturas e resultado da eleição geral; os turnos são tratados segundo a regra de cada cargo."}
              </p>
              {date && <p className={`mt-3 font-mono text-[12px] ${current ? "text-cream/75" : "text-ink/70"}`}>
                Base: {date}
              </p>}
              {snap?.recordCount && !missing ? (
                <p className={`mt-1 font-mono text-[12px] ${current ? "text-cream/75" : "text-ink/70"}`}>
                  {formatInt(snap.recordCount)} candidaturas deduplicadas
                </p>
              ) : null}
              {filename && !missing && (
                <p className={`mt-4 break-words font-mono text-[12px] ${current ? "text-cream/85" : "text-ink/75"}`}>
                  Arquivo: {filename}
                </p>
              )}
              {href && !missing && (
                <a href={href} target="_blank" rel="noreferrer"
                  className={`mt-5 inline-flex min-h-11 items-center self-start font-semibold underline underline-offset-4 ${current ? "text-cream" : "text-plum"}`}>
                  Consultar o arquivo oficial ↗
                </a>
              )}
              {snap?.anomalies.length ? (
                <div className={`mt-auto border-t pt-3 text-[13px] leading-relaxed ${current ? "border-cream/30 text-cream/80" : "border-ink/20 text-ink/80"}`}>
                  <strong>Lacuna documentada:</strong> {snap.anomalies.join(" · ")}
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
      <p className="mt-5 border-t border-rule pt-3 text-[13px] leading-relaxed text-ink/75">
        Os links abrem conjuntos oficiais do TSE, não imagens extraídas deles.
        O universo e a metodologia de recontagem constam das fichas de cada série
        e da página Método.
      </p>
    </div>
  );
}
