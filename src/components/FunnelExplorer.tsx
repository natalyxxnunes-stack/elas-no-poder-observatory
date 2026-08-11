import { useState } from "react";
import { CYCLE_STAGES, FUNNEL_STEPS, THESIS } from "@/data/election-2026";
import { GapNote } from "./GapNote";

/**
 * FunnelExplorer — funil candidatura → poder.
 * Degraus sem fonte são renderizados como vazios declarados, com largura zero
 * e etiqueta de lacuna. É proibido interpolar valores entre degraus.
 */
export function FunnelExplorer() {
  const first = FUNNEL_STEPS[0]!;
  const [selected, setSelected] = useState<string>(first.id);
  const step = FUNNEL_STEPS.find((s) => s.id === selected) ?? first;
  const stage = CYCLE_STAGES.find((s) => s.id === step.stage);

  return (
    <section aria-labelledby="funnel-title" className="rule-top pt-8">
      <h2 className="kicker">Funil candidatura → poder</h2>
      <h3
        id="funnel-title"
        className="mt-3 max-w-3xl font-display text-2xl leading-snug text-ink md:text-3xl"
      >
        {THESIS}
      </h3>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.35fr_1fr]">
        <ol className="space-y-2">
          {FUNNEL_STEPS.map((s) => {
            const known = s.share.recovered && s.share.value !== null;
            const active = s.id === selected;
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => setSelected(s.id)}
                  aria-pressed={active}
                  className={`group w-full rounded-md border px-4 py-3 text-left transition-colors ${
                    active
                      ? "border-plum bg-secondary"
                      : "border-rule bg-card hover:border-plum-soft"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-display text-base text-ink">{s.label}</span>
                    <span
                      className={`font-mono text-sm ${
                        known ? "text-plum" : "text-coral"
                      }`}
                    >
                      {known
                        ? `${s.share.value!.toString().replace(".", ",")}%`
                        : "sem fonte"}
                    </span>
                  </div>
                  <div
                    className="mt-2 h-3 w-full overflow-hidden rounded-sm bg-muted"
                    role="img"
                    aria-label={
                      known
                        ? `Participação feminina de ${s.share.value}%`
                        : "Etapa sem dado disponível"
                    }
                  >
                    {known ? (
                      <div
                        className="h-full bg-plum transition-all"
                        style={{ width: `${s.share.value}%` }}
                      />
                    ) : (
                      <div className="h-full w-full bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,var(--color-rule)_5px,var(--color-rule)_10px)]" />
                    )}
                  </div>
                </button>
              </li>
            );
          })}
        </ol>

        <aside className="editorial-card h-fit p-5">
          <span className="kicker">{stage?.label}</span>
          <h4 className="mt-2 font-display text-xl text-ink">{step.label}</h4>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {step.description}
          </p>

          <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-rule pt-4">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Participação
              </dt>
              <dd className="data-figure mt-1 text-3xl text-plum">
                {step.share.value !== null
                  ? `${step.share.value.toString().replace(".", ",")}%`
                  : "—"}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Universo
              </dt>
              <dd className="data-figure mt-1 text-3xl text-ink">
                {step.universe.value !== null ? step.universe.value : "—"}
              </dd>
            </div>
          </dl>

          {(!step.share.recovered || !step.universe.recovered) && (
            <div className="mt-4 space-y-2">
              {!step.share.recovered && <GapNote>{step.share.source}</GapNote>}
              {!step.universe.recovered && <GapNote>{step.universe.source}</GapNote>}
            </div>
          )}
          {step.share.recovered && (
            <p className="mt-4 font-mono text-[11px] leading-relaxed text-muted-foreground">
              Fonte: {step.share.source}
            </p>
          )}
        </aside>
      </div>
    </section>
  );
}
