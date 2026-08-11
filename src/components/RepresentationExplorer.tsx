import { useState } from "react";
import { REPRESENTATION_CONTRAST as R } from "@/data/election-2026";
import { GapNote } from "./GapNote";
import spotQuota from "@/assets/spot-quota.png";

/**
 * RepresentationExplorer — o contraste 35,2% (proporcionais) × 16,9%
 * (majoritárias) e o papel da cota de gênero nessa diferença.
 */
export function RepresentationExplorer() {
  const [showQuota, setShowQuota] = useState(true);
  const bars = [R.proportional, R.majoritarian];

  return (
    <section aria-labelledby="rep-title" className="rule-top pt-8">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="max-w-2xl">
          <h2 className="kicker">Onde a queda acontece</h2>
          <h3
            id="rep-title"
            className="mt-3 font-display text-2xl leading-snug text-ink md:text-3xl"
          >
            35,2% nas proporcionais, 16,9% nas majoritárias
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            A diferença de {R.gapPoints.toString().replace(".", ",")} pontos não
            está distribuída ao acaso: a cota de gênero de {R.quotaFloor}% incide
            sobre as listas proporcionais e não alcança as disputas de cargo único.
          </p>
        </div>
        <img
          src={spotQuota}
          alt=""
          aria-hidden
          loading="lazy"
          width={640}
          height={640}
          className="h-24 w-24 shrink-0 md:h-32 md:w-32"
        />
      </div>

      <button
        type="button"
        onClick={() => setShowQuota((v) => !v)}
        aria-pressed={showQuota}
        className={`mt-6 rounded-full border px-4 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors ${
          showQuota
            ? "border-plum bg-plum text-primary-foreground"
            : "border-rule bg-card text-muted-foreground"
        }`}
      >
        {showQuota ? "Piso legal de 30% visível" : "Mostrar piso legal de 30%"}
      </button>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {bars.map((bar) => (
          <article key={bar.label} className="editorial-card p-5">
            <div className="flex items-baseline justify-between">
              <h4 className="font-display text-lg text-ink">{bar.label}</h4>
              <span
                className={`font-mono text-[11px] uppercase tracking-wider ${
                  bar.quotaApplies ? "text-plum" : "text-coral"
                }`}
              >
                {bar.quotaApplies ? "com cota" : "sem cota"}
              </span>
            </div>

            <p className="data-figure mt-4 text-6xl text-plum">
              {bar.share.toString().replace(".", ",")}
              <span className="text-3xl">%</span>
            </p>

            <div className="relative mt-4 h-6 w-full overflow-hidden rounded-sm bg-muted">
              <div
                className={`h-full transition-all ${
                  bar.quotaApplies ? "bg-plum" : "bg-coral"
                }`}
                style={{ width: `${bar.share}%` }}
              />
              {showQuota && (
                <span
                  className="absolute inset-y-0 border-l-2 border-dashed border-ink"
                  style={{ left: `${R.quotaFloor}%` }}
                  aria-hidden
                />
              )}
            </div>
            {showQuota && (
              <p className="mt-2 font-mono text-[11px] text-muted-foreground">
                Linha tracejada: piso de {R.quotaFloor}% previsto na Lei 9.504/97.
              </p>
            )}

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {bar.note}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-6">
        <GapNote label="Cuidado metodológico">{R.caution}</GapNote>
      </div>
    </section>
  );
}
