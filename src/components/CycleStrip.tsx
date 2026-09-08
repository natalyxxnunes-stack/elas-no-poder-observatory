import { CYCLE_STAGES, THESIS } from "@/data/election-2026";
import { Link } from "@tanstack/react-router";

/**
 * Ciclo analítico: Registros → Recursos → Votos e eleitas → Poder e decisões.
 */
export function CycleStrip({ activeId }: { activeId?: string }) {
  return (
    <section aria-label="Ciclo analítico" className="rule-top pt-8">
      <h2 className="editorial-index">O ciclo</h2>
      <p className="mt-3 max-w-2xl font-display text-2xl leading-snug text-ink md:text-3xl">
        “{THESIS}”
      </p>
      <ol className="mt-8 grid border-y border-ink md:grid-cols-4">
        {CYCLE_STAGES.map((stage, i) => {
          const active = stage.id === activeId;
          return (
            <li
              key={stage.id}
              className={`relative border-b border-rule p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 ${
                active ? "border-plum bg-secondary" : ""
              }`}
            >
              <span className="font-mono text-[12px] text-muted-foreground">
                0{i + 1}
              </span>
              <h3 className="mt-1 font-display text-lg text-ink">{stage.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {stage.question}
              </p>
            </li>
          );
        })}
      </ol>
      <p className="mt-4 text-sm text-muted-foreground">
        As duas primeiras etapas já têm dado de registro.{" "}
        <Link to="/metodo" className="text-plum underline underline-offset-4">
          Votos → eleitas → poder
        </Link>{" "}
        entram posteriormente, após a apuração e a posse.
      </p>
    </section>
  );
}
