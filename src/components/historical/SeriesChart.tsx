import type { Series } from "@/lib/tse/historical-compute";
import type { UniverseId } from "@/lib/tse/compute";
import { GapNote } from "@/components/GapNote";

/**
 * SeriesChart — leitura visual de uma série histórica já calculada.
 * NÃO calcula indicador algum: apenas desenha os pontos que vêm de
 * `historical-compute`. Pontos sem dado ficam explicitamente vazios, com o
 * motivo declarado — ausência nunca é desenhada como zero.
 */

const UNIVERSE_LABEL: Record<UniverseId, string> = {
  proporcional: "Proporcional",
  majoritario: "Majoritária",
};

const fmt = (v: number) =>
  v.toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

function UniverseColumn({
  series,
  universe,
}: {
  series: Series;
  universe: UniverseId;
}) {
  const points = series.points
    .filter((p) => p.universe === universe)
    .sort((a, b) => a.year - b.year);

  const values = points
    .map((p) => p.value)
    .filter((v): v is number => v !== null);
  const max = values.length ? Math.max(...values) : 0;
  const scale = max > 0 ? max * 1.25 : 1;

  const missing = points.filter((p) => p.value === null);

  return (
    <div>
      <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-plum">
        {UNIVERSE_LABEL[universe]}
      </h4>

      <div className="mt-4 flex items-end gap-3">
        {points.map((p) => (
          <div key={p.year} className="flex flex-1 flex-col items-center">
            <div className="flex h-40 w-full items-end justify-center">
              {p.value === null ? (
                <div
                  className="flex h-full w-full items-end justify-center rounded-t-sm border-x border-t border-dashed border-rule"
                  aria-hidden
                >
                  <span className="pb-2 font-mono text-[10px] text-muted-foreground">
                    sem dado
                  </span>
                </div>
              ) : (
                <div
                  className="w-full rounded-t-sm bg-plum"
                  style={{ height: `${(p.value / scale) * 100}%` }}
                  aria-hidden
                />
              )}
            </div>
            <p className="mt-2 font-mono text-xs text-ink">
              {p.value === null ? "—" : `${fmt(p.value)}%`}
            </p>
            <p className="font-mono text-[11px] text-muted-foreground">
              {p.year}
              {p.stage === "em_curso" ? "*" : ""}
            </p>
          </div>
        ))}
      </div>

      <dl className="mt-4 space-y-1">
        {points.map((p) => (
          <div
            key={p.year}
            className="flex items-baseline justify-between gap-3 font-mono text-[11px] text-muted-foreground"
          >
            <dt>{p.year}</dt>
            <dd className="text-right">
              {p.numerator !== null && p.denominator !== null
                ? `${p.numerator.toLocaleString("pt-BR")} de ${p.denominator.toLocaleString("pt-BR")}`
                : (p.unavailableReason ?? "sem dado")}
            </dd>
          </div>
        ))}
      </dl>

      {missing.length > 0 && (
        <p className="mt-3 font-mono text-[10px] leading-relaxed text-muted-foreground">
          Pontos vazios: {missing.map((m) => m.year).join(", ")}. Ausência de
          dado não é zero.
        </p>
      )}
    </div>
  );
}

export function SeriesChart({
  series,
  universes = ["proporcional", "majoritario"],
}: {
  series: Series | undefined;
  universes?: readonly UniverseId[];
}) {
  if (!series) {
    return (
      <GapNote label="Lacuna declarada">
        Esta série ainda não foi gravada pela coleta histórica. Nenhum valor é
        estimado no lugar.
      </GapNote>
    );
  }
  return (
    <figure className="editorial-card p-5 md:p-6">
      <figcaption>
        <h3 className="font-display text-xl leading-snug text-ink">
          {series.label}
        </h3>
        <p className="mt-1 font-mono text-[11px] leading-relaxed text-muted-foreground">
          {series.formula}
        </p>
      </figcaption>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        {universes.map((u) => (
          <UniverseColumn key={u} series={series} universe={u} />
        ))}
      </div>

      <ul className="mt-6 space-y-1 border-t border-rule pt-4">
        {series.notes.map((n) => (
          <li
            key={n}
            className="font-mono text-[10px] leading-relaxed text-muted-foreground"
          >
            {n}
          </li>
        ))}
        <li className="font-mono text-[10px] leading-relaxed text-muted-foreground">
          * 2026 é base em curso: candidaturas registradas, sem resultado
          eleitoral.
        </li>
      </ul>
    </figure>
  );
}
