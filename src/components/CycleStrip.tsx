import { CYCLE_STAGES, THESIS } from "@/data/election-2026";
import { Link } from "@tanstack/react-router";

/**
 * Ciclo analítico: Registros → Recursos → Votos e eleitas → Poder e decisões.
 */
export function CycleStrip({ activeId }: { activeId?: string }) {
  return (
    <section aria-label="Ciclo analítico" className="rule-top pt-8">
      <h2 className="kicker">O ciclo</h2>
      <p className="mt-3 max-w-2xl font-display text-2xl leading-snug text-ink md:text-3xl">
        “{THESIS}”
      </p>
      <ol className="mt-8 grid gap-3 md:grid-cols-4">
        {CYCLE_STAGES.map((stage, i) => {
          const active = stage.id === activeId;
          return (
            <li
              key={stage.id}
              className={`editorial-card relative p-4 ${
                active ? "border-plum bg-secondary" : ""
              }`}
            >
              <span className="font-mono text-[11px] text-muted-foreground">
                0{i + 1}
              </span>
              <h3 className="mt-1 font-display text-lg text-ink">{stage.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {stage.question}
              </p>
              {i < CYCLE_STAGES.length - 1 && (
                <span
                  aria-hidden
                  className="absolute -right-2 top-1/2 hidden h-3 w-3 -translate-y-1/2 rotate-45 border-r border-t border-rule bg-card md:block"
                />
              )}
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
