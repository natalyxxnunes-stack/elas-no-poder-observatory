import { Link } from "@tanstack/react-router";
import { AXES, type Axis } from "@/data/architecture";
import { StatusTag } from "./StatusTag";

/**
 * NextAxes — navegação editorial no fim de cada página: para onde a leitura
 * continua. Recebe os ids dos eixos relacionados.
 */
export function NextAxes({ ids }: { ids: readonly string[] }) {
  const items: Axis[] = ids
    .map((id) => AXES.find((a) => a.id === id))
    .filter((a): a is Axis => !!a);

  return (
    <section aria-label="Continue a investigação" className="rule-top py-12">
      <p className="kicker">Continue</p>
      <ul className="mt-6 grid gap-4 md:grid-cols-3">
        {items.map((a) => (
          <li key={a.id}>
            <Link
              to={a.to}
              className="editorial-card block h-full p-5 transition-colors hover:border-plum"
            >
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                {a.label}
              </p>
              <p className="mt-2 font-display text-lg leading-snug text-ink">
                {a.question}
              </p>
              <div className="mt-3">
                <StatusTag
                  tone={
                    a.state === "com dados de candidatura"
                      ? "ok"
                      : a.state === "conteúdo editorial"
                        ? "limit"
                        : "pending"
                  }
                >
                  {a.state}
                </StatusTag>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
