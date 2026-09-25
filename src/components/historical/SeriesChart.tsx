import type { Series } from "@/lib/tse/historical-compute";
import type { UniverseId } from "@/lib/tse/compute";
import { GapNote } from "@/components/GapNote";
import { formatInt, formatDecimal } from "@/lib/format-br";
import { RACE_COLORS } from "@/data/historical-funnel";
import { ChartFrame, LegendSwatch } from "@/components/editorial/ChartFrame";

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
  formatDecimal(v);

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

  const scale = 100;

  const missing = points.filter((p) => p.value === null);
  const isSplitRace = series.id === "serie-negras-negros-candidaturas" ||
    series.id === "serie-mulheres-negras-sobre-total" ||
    series.id === "serie-mulheres-negras-entre-mulheres" ||
    series.id === "serie-mulheres-negras-eleitas";

  return (
    <div>
      <h3 className="font-mono text-[12px] uppercase tracking-[0.16em] text-plum">
        {UNIVERSE_LABEL[universe]}
      </h3>

      <div className="mt-4 flex items-end gap-3">
        {points.map((p) => (
          <div key={p.year} className="flex flex-1 flex-col items-center">
            <div className="flex h-40 w-full items-end justify-center">
              {p.value === null ? (
                <div
                  className="flex h-full w-full items-end justify-center rounded-t-sm border-x border-t border-dashed border-rule"
                  aria-hidden
                >
                  <span className="pb-2 font-mono text-[12px] text-muted-foreground">
                    sem dado
                  </span>
                </div>
              ) : isSplitRace && p.denominator && p.pretaNumerator !== undefined && p.pardaNumerator !== undefined ? (
                <div className="flex h-full w-full flex-col justify-end" aria-hidden>
                  <div className="flex w-full items-center justify-center font-mono text-xs text-paper" style={{ height: `${((p.pretaNumerator / p.denominator) * 100 / scale) * 100}%`, backgroundColor: RACE_COLORS.preta }}>
                    {fmt((p.pretaNumerator / p.denominator) * 100)}%
                  </div>
                  <div className="flex w-full items-center justify-center font-mono text-xs text-ink" style={{ height: `${((p.pardaNumerator / p.denominator) * 100 / scale) * 100}%`, backgroundColor: RACE_COLORS.parda }}>
                    {fmt((p.pardaNumerator / p.denominator) * 100)}%
                  </div>
                </div>
              ) : (
                <div
                  className={`w-full rounded-t-sm ${p.year === 2026 ? "bg-coral" : "bg-plum"}`}
                  style={{ height: `${(p.value / scale) * 100}%` }}
                  aria-hidden
                />
              )}
            </div>
            <p className={`mt-2 font-mono text-ink ${isSplitRace ? "text-xs" : "text-xs"}`}>
              {p.value === null ? "—" : isSplitRace ? `(${fmt(p.value)}%)` : `${fmt(p.value)}%`}
            </p>
            <p className={`font-mono text-[12px] ${p.year === 2026 ? "font-semibold text-coral-ink" : "text-muted-foreground"}`}>
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
            className="flex items-baseline justify-between gap-3 font-mono text-[12px] text-muted-foreground"
          >
            <dt>{p.year}</dt>
            <dd className="text-right">
              {p.numerator !== null && p.denominator !== null
                ? `${formatInt(p.numerator)} de ${formatInt(p.denominator)}`
                : (p.unavailableReason ?? "sem dado")}
            </dd>
          </div>
        ))}
      </dl>

      {missing.length > 0 && (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Pontos vazios: {missing.map((m) => m.year).join(", ")}. A fonte não
          trouxe o resultado desses anos.
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
    <ChartFrame
      eyebrow="Série histórica · 2014 a 2026"
      title={series.label}
      legend={<><LegendSwatch className="bg-plum">2014 a 2022</LegendSwatch><LegendSwatch className="bg-coral">2026</LegendSwatch></>}
      note={
        <>
          {series.formula}. {series.notes.join(" ")} 2026 (*) é base em curso: candidaturas registradas, sem resultado eleitoral.
        </>
      }
      source="Fonte: TSE, Candidatos 2014, 2018, 2022 e 2026"
    >
      <div className="grid gap-8 md:grid-cols-2">
        {universes.map((u) => (
          <UniverseColumn key={u} series={series} universe={u} />
        ))}
      </div>
    </ChartFrame>
  );
}
