import { Link } from "@tanstack/react-router";
import { Secao } from "@/components/editorial/Secao";
import { AXES, type Axis } from "@/data/architecture";

/**
 * NextAxes — navegação editorial no fim de cada página: para onde a leitura
 * continua. Recebe os ids dos eixos relacionados.
 */
export function NextAxes({ ids }: { ids: readonly string[] }) {
  const items: Axis[] = ids
    .map((id) => AXES.find((a) => a.id === id))
    .filter((a): a is Axis => !!a);

  return (
    <section aria-label="Continue a investigação" className="py-12">
      <Secao nome="Continue a leitura" />
      <ul className="-mx-5 mt-6 flex snap-x gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
        {items.map((a) => (
          <li key={a.id} className="w-[78%] shrink-0 snap-start md:w-auto">
            <Link
              to={a.to}
              className="editorial-card block h-full p-5 transition-colors hover:border-plum"
            >
              <p className="text-[13px] text-muted-foreground font-semibold">{a.label}</p>
              <p className="mt-2 font-display text-lg leading-snug text-ink">{a.question}</p>
              {a.publication === "unpublished" && (
                <p className="mt-3 text-[13px] text-muted-foreground font-semibold">
                  ainda não publicado
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
