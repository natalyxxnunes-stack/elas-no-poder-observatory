import { useState } from "react";
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

const fmt = (v: number) => formatDecimal(v);

function UniverseColumn({
  series, universe, compactMobile = false,
}: { series: Series; universe: UniverseId; compactMobile?: boolean }) {
  const points = series.points
    .filter((p) => p.universe === universe)
    .sort((a, b) => a.year - b.year);

  const scale = 100;

  const missing = points.filter((p) => p.value === null);
  const isSplitRace =
    series.id === "serie-negras-negros-candidaturas" ||
    series.id === "serie-mulheres-negras-sobre-total" ||
    series.id === "serie-mulheres-negras-entre-mulheres" ||
    series.id === "serie-mulheres-negras-eleitas";

  return (
    <div>
      <h3 className="font-sans text-[13px] text-plum font-semibold">
        {UNIVERSE_LABEL[universe]}
      </h3>

      <div className="mt-4 flex items-end gap-3">
        {points.map((p) => (
          <div key={p.year} className="flex flex-1 flex-col items-center">
            <div className={`flex w-full items-end justify-center ${compactMobile && !isSplitRace ? "h-28 md:h-40" : "h-40"}`}>
              {p.value === null ? (
                <div
                  className="flex h-full w-full items-end justify-center rounded-t-sm border-x border-t border-dashed border-rule"
                  aria-hidden
                >
                  <span className="pb-2 font-mono text-[13px] text-muted-foreground">sem dado</span>
                </div>
              ) : isSplitRace &&
                p.denominator &&
                p.pretaNumerator !== undefined &&
                p.pardaNumerator !== undefined ? (
                <div className="flex h-full w-full flex-col justify-end" aria-hidden>
                  <div
                    className="flex w-full items-center justify-center font-mono text-xs text-paper"
                    style={{
                      height: `${(((p.pretaNumerator / p.denominator) * 100) / scale) * 100}%`,
                      backgroundColor: RACE_COLORS.preta,
                    }}
                  >
                    {fmt((p.pretaNumerator / p.denominator) * 100)}%
                  </div>
                  <div
                    className="flex w-full items-center justify-center font-mono text-xs text-ink"
                    style={{
                      height: `${(((p.pardaNumerator / p.denominator) * 100) / scale) * 100}%`,
                      backgroundColor: RACE_COLORS.parda,
                    }}
                  >
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
            <p
              className={`font-mono text-[13px] ${p.year === 2026 ? "font-semibold text-coral-ink" : "text-muted-foreground"}`}
            >
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
            className="flex items-baseline justify-between gap-3 font-mono text-[13px] text-muted-foreground"
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
          Pontos vazios: {missing.map((m) => m.year).join(", ")}. Nenhum valor é estimado; o motivo
          aparece em cada ponto.
        </p>
      )}
    </div>
  );
}

export function SeriesChart({
  series,
  universes = ["proporcional", "majoritario"],
  mobileSelectable = false,
}: {
  series: Series | undefined;
  universes?: readonly UniverseId[];
  /** Em Histórico, escolha de universo no celular; desktop exibe ambos lado a lado. */
  mobileSelectable?: boolean;
}) {
  const [activeMobileUniverse, setActiveMobileUniverse] = useState<UniverseId>(
    universes[0] ?? "proporcional",
  );
  if (!series) {
    return (
      <GapNote label="Lacuna declarada">
        Esta série ainda não foi gravada pela coleta histórica. Nenhum valor é estimado no lugar.
      </GapNote>
    );
  }
  return (
    <ChartFrame
      ficha={{
        vendo: `${series.label}, nos universos proporcional e majoritário, eleição a eleição.`,
        contados:
          "Candidaturas ou eleitas e eleitos, conforme a série, em cada eleição geral de 2014 a 2026.",
        denominador: series.formula,
        data: "2014, 2018 e 2022: bases fechadas do TSE; 2026: candidaturas e resultado da base de 27/10/2026",
        fonte: "TSE, Candidatos 2014, 2018, 2022 e 2026",
        limitacao: series.notes.join(" "),
      }}
      eyebrow="Série histórica · 2014 a 2026"
      title={series.label}
      legend={
        <>
          <LegendSwatch className="bg-plum">2014 a 2022</LegendSwatch>
          <LegendSwatch className="bg-coral">2026</LegendSwatch>
        </>
      }
      note={
        <>
          {series.formula}. {series.notes.join(" ")} 2026 (*): candidaturas e eleitas pela base TSE
          de 27/10/2026.
        </>
      }
      source="Fonte: TSE, Candidatos 2014, 2018, 2022 e 2026"
    >
      {mobileSelectable && universes.length > 1 && (
        <div
          role="group"
          aria-label={`Universo eleitoral do gráfico: ${series.label}`}
          className="mb-5 grid grid-cols-2 gap-1 border border-plum p-1 md:hidden"
        >
          {universes.map((u) => (
            <button
              type="button"
              key={u}
              aria-pressed={activeMobileUniverse === u}
              onClick={() => setActiveMobileUniverse(u)}
              className={`min-h-11 px-2 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum ${
                activeMobileUniverse === u
                  ? "bg-plum text-cream"
                  : "bg-paper text-plum"
              }`}
            >
              {UNIVERSE_LABEL[u]}
            </button>
          ))}
        </div>
      )}
      <div className="grid gap-8 md:grid-cols-2">
        {universes.map((u) => (
          <div
            key={u}
            className={
              mobileSelectable && universes.length > 1 && activeMobileUniverse !== u
                ? "hidden md:block"
                : "block"
            }
          >
            <UniverseColumn series={series} universe={u} compactMobile={mobileSelectable} />
          </div>
        ))}
      </div>
      {mobileSelectable && universes.length > 1 && (
        <p className="mt-5 border-t border-rule pt-3 text-[13px] leading-relaxed text-ink/75 md:hidden">
          Os dois universos têm denominadores próprios. Selecione
          “Majoritária” para consultar a outra série; nenhuma informação foi excluída.
        </p>
      )}
    </ChartFrame>
  );
}
