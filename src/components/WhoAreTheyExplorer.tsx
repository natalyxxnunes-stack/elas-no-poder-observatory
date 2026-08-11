import { useState } from "react";
import { RACE_BY_POWER_LEVEL } from "@/data/election-2026";
import { GapNote } from "./GapNote";

/**
 * WhoAreTheyExplorer — eixo central do observatório: raça × nível de poder.
 * O cruzamento não foi recuperado do snapshot publicado; a matriz é mantida
 * com as células vazias declaradas, para ser preenchida com extração do TSE.
 */
export function WhoAreTheyExplorer() {
  const [openLevel, setOpenLevel] = useState<string>(
    RACE_BY_POWER_LEVEL[0].level,
  );

  return (
    <section aria-labelledby="who-title" className="rule-top pt-8">
      <h2 className="kicker">Quem são elas?</h2>
      <h3
        id="who-title"
        className="mt-3 max-w-3xl font-display text-2xl leading-snug text-ink md:text-3xl"
      >
        Raça × nível de poder
      </h3>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Contar mulheres não basta. Quanto mais perto do poder de decisão, mais
        estreito tende a ser o filtro racial — e é esse cruzamento, não o total
        agregado, que organiza a leitura do observatório.
      </p>

      <div className="mt-8 divide-y divide-rule border-y border-rule">
        {RACE_BY_POWER_LEVEL.map((row) => {
          const open = openLevel === row.level;
          return (
            <div key={row.level}>
              <button
                type="button"
                onClick={() => setOpenLevel(open ? "" : row.level)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-4 py-4 text-left"
              >
                <span className="font-display text-lg text-ink">{row.level}</span>
                <span
                  className={`font-mono text-[11px] uppercase tracking-wider ${
                    row.breakdown.recovered ? "text-plum" : "text-coral"
                  }`}
                >
                  {row.breakdown.recovered ? "com dado" : "sem fonte"}
                </span>
              </button>
              {open && (
                <div className="pb-5">
                  <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                    {row.note}
                  </p>
                  {row.breakdown.value ? (
                    <dl className="grid gap-3 sm:grid-cols-3">
                      {Object.entries(row.breakdown.value).map(([k, v]) => (
                        <div key={k} className="editorial-card p-3">
                          <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                            {k}
                          </dt>
                          <dd className="data-figure mt-1 text-2xl text-plum">
                            {v}%
                          </dd>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    <GapNote>{row.breakdown.source}</GapNote>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
