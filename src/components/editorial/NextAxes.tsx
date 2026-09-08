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
      <p className="editorial-index">Próximos capítulos</p>
      <ul className="mt-7 grid border-y border-ink md:grid-cols-3">
        {items.map((a, index) => (
          <li key={a.id}>
            <Link
              to={a.to}
              className="group block h-full border-b border-rule p-6 transition-colors hover:bg-secondary md:border-b-0 md:border-r md:last:border-r-0"
            >
              <p className="font-mono text-[10px] uppercase tracking-wider text-coral-ink">
                0{index + 1} / {a.label}
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
