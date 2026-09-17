import { FUNNEL_LAYERS, FUNNEL_READING_RULE } from "@/data/architecture";
import { formatPercent, formatRatio, type Indicator } from "@/data/election-2026";
import { GapNote } from "@/components/GapNote";
import { StatusTag } from "./StatusTag";

/**
 * FunnelLayers — o funil em três camadas (contexto, competição, poder).
 * Cada etapa exibe universo e fonte próprios. Nenhuma diferença entre etapas
 * é subtraída: elas têm denominadores distintos.
 *
 * A etapa "Candidaturas" é a única com números, e eles vêm da camada TSE já
 * validada, recebida por props.
 */
export function FunnelLayers({
  indicators = [],
}: {
  indicators?: readonly Indicator[];
}) {
  const withValue = indicators.filter(
    (i) => i.unit === "%" && i.value !== null && i.denominator !== null,
  );

  return (
    <div className="space-y-12">
      {FUNNEL_LAYERS.map((layer, li) => (
        <section key={layer.id} aria-labelledby={`layer-${layer.id}`}>
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="font-mono text-[12px] text-muted-foreground">
              camada 0{li + 1}
            </span>
            <h3
              id={`layer-${layer.id}`}
              className="font-display text-2xl text-ink md:text-3xl"
            >
              {layer.label}
            </h3>
          </div>
          <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
            {layer.lead}
          </p>

          <ol className="mt-6 space-y-3">
            {layer.steps.map((step) => {
              const isCandidaturas = step.id === "candidaturas";
              return (
                <li
                  key={step.id}
                  className={`editorial-card p-5 ${
                    isCandidaturas && withValue.length ? "border-plum" : ""
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h4 className="font-display text-lg text-ink">
                        {step.label}
                      </h4>
                      <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                        {step.question}
                      </p>
                    </div>
                    <StatusTag tone={step.pending ? "pending" : "ok"}>
                      {step.pending ? "sem dado publicável" : "dado disponível"}
                    </StatusTag>
                  </div>

                  {isCandidaturas && withValue.length > 0 && (
                    <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                      {withValue.map((i) => (
                        <div key={i.id} className="rounded-md bg-secondary p-4">
                          <dt className="font-mono text-[12px] uppercase tracking-wider text-muted-foreground">
                            {i.label}
                          </dt>
                          <dd className="data-figure mt-1 text-3xl text-plum">
                            {formatPercent(i.value)}
                          </dd>
                          <dd className="mt-1 font-mono text-[12px] text-muted-foreground">
                            {formatRatio(i)}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  <dl className="mt-4 space-y-1 font-mono text-[12px] text-muted-foreground">
                    <div>
                      <dt className="inline uppercase tracking-wider">
                        Universo:{" "}
                      </dt>
                      <dd className="inline">{step.universe}</dd>
                    </div>
                    <div>
                      <dt className="inline uppercase tracking-wider">
                        Fonte:{" "}
                      </dt>
                      <dd className="inline">{step.source}</dd>
                    </div>
                  </dl>

                  {step.pending && (
                    <div className="mt-3">
                      <GapNote label="Lacuna declarada">{step.pending}</GapNote>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </section>
      ))}

      <GapNote label="Regra de leitura">{FUNNEL_READING_RULE}</GapNote>
    </div>
  );
}
