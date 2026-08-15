import {
  MAJORITARIAN_SHARE,
  PROPORTIONAL_SHARE,
  QUOTA_RULE,
  UNIVERSE_DIFFERENCE,
  formatPercent,
  formatPoints,
  formatRatio,
  type Indicator,
} from "@/data/election-2026";
import { GapNote } from "./GapNote";
import spotQuota from "@/assets/spot-quota.png";

/**
 * RepresentationExplorer — participação feminina nos dois universos de
 * candidatura (proporcional e majoritário), cada um com seu denominador.
 * A diferença entre eles é apresentada em p.p. e de forma descritiva:
 * nenhuma causalidade é atribuída à regra de composição de candidaturas.
 */
function UniverseCard({
  indicator,
  quotaApplies,
  note,
}: {
  indicator: Indicator;
  quotaApplies: boolean;
  note: string;
}) {
  const ratio = formatRatio(indicator);
  const hasValue = indicator.value !== null && indicator.denominator !== null;

  return (
    <article className="editorial-card p-5">
      <div className="flex items-baseline justify-between gap-3">
        <h4 className="font-display text-lg text-ink">
          {quotaApplies ? "Proporcionais" : "Majoritárias"}
        </h4>
        <span
          className={`font-mono text-[12px] uppercase tracking-wider ${
            quotaApplies ? "text-plum" : "text-coral"
          }`}
        >
          {quotaApplies
            ? "com regra de composição 30%–70%"
            : "sem a regra de composição 30%–70%"}
        </span>
      </div>

      <p className="data-figure mt-4 text-6xl text-plum">
        {hasValue ? formatPercent(indicator.value) : "—"}
      </p>
      <p className="mt-1 font-mono text-[12px] text-muted-foreground">
        {ratio ?? "sem denominador processado — indicador não exibido"}
      </p>

      <div className="relative mt-4 h-6 w-full overflow-hidden rounded-sm bg-muted">
        {hasValue ? (
          <div
            className={`h-full transition-all ${
              quotaApplies ? "bg-plum" : "bg-coral"
            }`}
            style={{ width: `${indicator.value}%` }}
          />
        ) : (
          <div className="h-full w-full bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,var(--color-rule)_5px,var(--color-rule)_10px)]" />
        )}
      </div>

      <p className="mt-3 font-mono text-[12px] uppercase tracking-wider text-coral">
        {indicator.status}
      </p>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{note}</p>

      <dl className="mt-4 space-y-2 border-t border-rule pt-4 font-mono text-[12px] leading-relaxed text-muted-foreground">
        <div>
          <dt className="inline uppercase tracking-wider">Universo: </dt>
          <dd className="inline">{indicator.universe}</dd>
        </div>
        <div>
          <dt className="inline uppercase tracking-wider">Cargos: </dt>
          <dd className="inline">{indicator.positions.join(", ")}</dd>
        </div>
        <div>
          <dt className="inline uppercase tracking-wider">Fórmula: </dt>
          <dd className="inline">{indicator.formula}</dd>
        </div>
        <div>
          <dt className="inline uppercase tracking-wider">Fonte: </dt>
          <dd className="inline">
            {indicator.sourceUrl ? (
              <a
                href={indicator.sourceUrl}
                className="underline"
                target="_blank"
                rel="noreferrer"
              >
                {indicator.source}
              </a>
            ) : (
              indicator.source
            )}
          </dd>
        </div>
      </dl>

      {!hasValue && (
        <div className="mt-4">
          <GapNote label="Lacuna declarada">{indicator.caveat}</GapNote>
        </div>
      )}
    </article>
  );
}

export function RepresentationExplorer() {
  return (
    <section aria-labelledby="rep-title" className="rule-top pt-8">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="max-w-2xl">
          <h2 className="kicker">Dois universos, duas regras</h2>
          <h3
            id="rep-title"
            className="mt-3 font-display text-2xl leading-snug text-ink md:text-3xl"
          >
            Participação feminina nas candidaturas proporcionais e majoritárias
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {QUOTA_RULE.scope} {QUOTA_RULE.outOfScope}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Diferença entre os universos:{" "}
            <span className="font-mono">
              {formatPoints(UNIVERSE_DIFFERENCE.value)}
            </span>{" "}
            — {UNIVERSE_DIFFERENCE.status}.
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

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <UniverseCard
          indicator={PROPORTIONAL_SHARE}
          quotaApplies
          note={`Eleições proporcionais, submetidas à ${QUOTA_RULE.shortName}, aplicada a cada partido ou federação.`}
        />
        <UniverseCard
          indicator={MAJORITARIAN_SHARE}
          quotaApplies={false}
          note="Disputas de cargo único, sem a regra de composição de candidaturas de 30%–70% por gênero. A escolha da candidatura segue processos internos de partidos e federações."
        />
      </div>

      <div className="mt-6 space-y-3">
        <GapNote label="Leitura descritiva">
          {QUOTA_RULE.descriptiveReading}
        </GapNote>
        <GapNote label="Cuidado metodológico">
          {UNIVERSE_DIFFERENCE.caveat} O universo majoritário é pequeno: leia
          contagens absolutas junto do percentual, e nunca a casa decimal
          isoladamente.
        </GapNote>
        <GapNote label="Financiamento">{QUOTA_RULE.financingNote}</GapNote>
      </div>
    </section>
  );
}
