import { useState } from "react";
import {
  CYCLE_STAGES,
  FUNNEL_STEPS,
  THESIS,
  formatPercent,
  formatRatio,
} from "@/data/election-2026";
import { GapNote } from "./GapNote";

/**
 * FunnelExplorer — funil candidatura → poder.
 * Degraus sem indicador calculado a partir da base oficial são renderizados
 * como vazios declarados, com o status padronizado. É proibido interpolar
 * valores entre degraus.
 */
export function FunnelExplorer() {
  const first = FUNNEL_STEPS[0]!;
  const [selected, setSelected] = useState<string>(first.id);
  const step = FUNNEL_STEPS.find((s) => s.id === selected) ?? first;
  const stage = CYCLE_STAGES.find((s) => s.id === step.stage);
  const ind = step.indicator;

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
            const value = s.indicator?.value ?? null;
            const known = value !== null && s.indicator?.denominator !== null;
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
                      className={`font-mono text-[12px] uppercase tracking-wider ${
                        known ? "text-plum" : "text-coral"
                      }`}
                    >
                      {known ? formatPercent(value) : s.status}
                    </span>
                  </div>
                  <div
                    className="mt-2 h-3 w-full overflow-hidden rounded-sm bg-muted"
                    role="img"
                    aria-label={
                      known
                        ? `Participação feminina de ${formatPercent(value)}`
                        : `Etapa sem indicador calculado: ${s.status}`
                    }
                  >
                    {known ? (
                      <div
                        className="h-full bg-plum transition-all"
                        style={{ width: `${value}%` }}
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
              <dt className="font-mono text-[12px] uppercase tracking-wider text-muted-foreground">
                Participação
              </dt>
              <dd className="data-figure mt-1 text-3xl text-plum">
                {ind && ind.denominator !== null
                  ? formatPercent(ind.value)
                  : "—"}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[12px] uppercase tracking-wider text-muted-foreground">
                Numerador / denominador
              </dt>
              <dd className="mt-1 font-mono text-sm text-ink">
                {ind ? (formatRatio(ind) ?? "—") : "—"}
              </dd>
            </div>
          </dl>

          <p className="mt-4 font-mono text-[12px] uppercase tracking-wider text-coral">
            {step.status}
          </p>

          {step.pending && (
            <div className="mt-3">
              <GapNote label="Lacuna declarada">{step.pending}</GapNote>
            </div>
          )}

          {ind && (
            <dl className="mt-4 space-y-2 border-t border-rule pt-4 font-mono text-[12px] leading-relaxed text-muted-foreground">
              <div>
                <dt className="inline uppercase tracking-wider">Fonte: </dt>
                <dd className="inline">{ind.source}</dd>
              </div>
              <div>
                <dt className="inline uppercase tracking-wider">Cargos: </dt>
                <dd className="inline">{ind.positions.join(", ")}</dd>
              </div>
              <div>
                <dt className="inline uppercase tracking-wider">Fórmula: </dt>
                <dd className="inline">{ind.formula}</dd>
              </div>
              <div>
                <dt className="inline uppercase tracking-wider">
                  Geração da base:{" "}
                </dt>
                <dd className="inline">{ind.baseGeneratedAt ?? "—"}</dd>
              </div>
              <div>
                <dt className="inline uppercase tracking-wider">
                  Processamento:{" "}
                </dt>
                <dd className="inline">{ind.processedAt ?? "—"}</dd>
              </div>
              <div>
                <dt className="inline uppercase tracking-wider">Observação: </dt>
                <dd className="inline">{ind.caveat}</dd>
              </div>
            </dl>
          )}
        </aside>
      </div>
    </section>
  );
}
