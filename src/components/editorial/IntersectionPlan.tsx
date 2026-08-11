import { INTERSECTION_PLAN, RACE_CATEGORY_RULE } from "@/data/architecture";
import { GapNote } from "@/components/GapNote";
import { StatusTag } from "./StatusTag";

/**
 * IntersectionPlan — o mapa de cruzamentos gênero × raça previstos, com o que
 * cada um exige para poder ser publicado. Nada aqui produz número: é o desenho
 * da investigação e a declaração explícita do que ainda não pode ser sustentado
 * pela fonte.
 */
export function IntersectionPlan() {
  return (
    <div>
      <ul className="divide-y divide-rule border-y border-rule">
        {INTERSECTION_PLAN.map((row) => {
          const ready = row.state.startsWith("possível");
          return (
            <li
              key={row.crossing}
              className="flex flex-wrap items-baseline justify-between gap-3 py-4"
            >
              <div>
                <p className="font-display text-lg text-ink">{row.crossing}</p>
                <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                  Exige: {row.requires}
                </p>
              </div>
              <StatusTag tone={ready ? "ok" : "pending"}>{row.state}</StatusTag>
            </li>
          );
        })}
      </ul>
      <div className="mt-6">
        <GapNote label="Categorias de cor/raça">{RACE_CATEGORY_RULE}</GapNote>
      </div>
    </div>
  );
}
