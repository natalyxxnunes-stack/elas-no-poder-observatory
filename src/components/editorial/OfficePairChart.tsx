import { ChartBar, ChartFrame, ChartScale, LegendSwatch } from "@/components/editorial/ChartFrame";
import { GapNote } from "@/components/GapNote";
import type { PublicSnapshot } from "@/lib/tse/snapshot.functions";
import { formatInt, formatPct } from "@/lib/format-br";

type OfficeDatum = {
  label: string;
  total: number;
  women: number;
  share: number;
};

type OfficeGroup = {
  label: string;
  titular: OfficeDatum;
  apoio: readonly OfficeDatum[];
};

function datum(label: string, total?: number, women?: number): OfficeDatum | null {
  if (total === undefined || women === undefined || total === 0) return null;
  return { label, total, women, share: (women / total) * 100 };
}

function buildGroups(snapshot: PublicSnapshot | null): OfficeGroup[] | null {
  if (!snapshot) return null;
  const maj = snapshot.universes.majoritario.dimensions;
  const out = snapshot.outOfUniverse;
  if (!maj?.totalByCargo || !maj?.feminineByCargo || !out) return null;

  const presidente = datum("Presidente", maj.totalByCargo["PRESIDENTE"], maj.feminineByCargo["PRESIDENTE"]);
  const vicePresidente = datum("Vice-presidente", out.byCargo["VICE-PRESIDENTE"], out.feminineByCargo["VICE-PRESIDENTE"]);
  const governador = datum("Governador", maj.totalByCargo["GOVERNADOR"], maj.feminineByCargo["GOVERNADOR"]);
  const viceGovernador = datum("Vice-governador", out.byCargo["VICE-GOVERNADOR"], out.feminineByCargo["VICE-GOVERNADOR"]);
  const senador = datum("Senador", maj.totalByCargo["SENADOR"], maj.feminineByCargo["SENADOR"]);
  const suplente1 = datum("1º suplente", out.byCargo["1º SUPLENTE"], out.feminineByCargo["1º SUPLENTE"]);
  const suplente2 = datum("2º suplente", out.byCargo["2º SUPLENTE"], out.feminineByCargo["2º SUPLENTE"]);

  if (!presidente || !vicePresidente || !governador || !viceGovernador || !senador || !suplente1 || !suplente2) return null;

  return [
    { label: "Presidência", titular: presidente, apoio: [vicePresidente] },
    { label: "Governos", titular: governador, apoio: [viceGovernador] },
    { label: "Senado", titular: senador, apoio: [suplente1, suplente2] },
  ];
}

const formatPp = (value: number) => `+${value.toFixed(1).replace(".", ",")} p.p.`;

function OfficeUnits({ datum, tone }: { datum: OfficeDatum; tone: "titular" | "apoio" }) {
  return (
    <div>
      <p className="text-sm font-medium leading-tight text-ink">{datum.label}</p>
      <div className="mt-1.5 grid grid-cols-[minmax(0,1fr)_4.25rem] items-center gap-3">
        <div className="flex flex-wrap gap-1" aria-hidden="true">
          {Array.from({ length: datum.total }, (_, index) => (
            <span
              key={index}
              className={`size-3 border ${index < datum.women ? (tone === "titular" ? "border-plum bg-plum" : "border-plum-soft bg-plum-soft") : "border-rule bg-card"}`}
            />
          ))}
        </div>
        <p className={`whitespace-nowrap text-right font-display text-lg font-semibold leading-none ${tone === "titular" ? "text-plum" : "text-plum-soft"}`}>
          {formatInt(datum.women)} de {formatInt(datum.total)}
        </p>
      </div>
    </div>
  );
}

function OfficeBar({ datum, tone }: { datum: OfficeDatum; tone: "titular" | "apoio" }) {
  return (
    <ChartBar
      label={datum.label}
      base={`${formatInt(datum.women)} de ${formatInt(datum.total)}`}
      value={datum.share}
      scaleMax={50}
      display={formatPct(datum.share)}
      barClass={tone === "titular" ? "bg-plum" : "bg-plum-soft"}
      valueClass={tone === "titular" ? "text-plum" : "text-plum-soft"}
      stacked
    />
  );
}

export function OfficePairChart({ snapshot }: { snapshot: PublicSnapshot | null }) {
  const groups = buildGroups(snapshot);

  if (!groups) {
    return (
      <GapNote label="Dado não disponível">
        A fotografia vigente não trouxe a contagem por cargo individual (Presidente, Governador, Senador e as posições de apoio à chapa) necessária para este gráfico. Nenhum valor é estimado no lugar dela.
      </GapNote>
    );
  }

  return (
    <ChartFrame
      eyebrow="Titular × vice ou suplência · 2026"
      title="A presença de mulheres cresce nas posições de apoio à chapa"
      legend={<><LegendSwatch className="bg-plum">Titular</LegendSwatch><LegendSwatch className="bg-plum-soft">Vice ou suplência</LegendSwatch></>}
      note="Percentual de mulheres entre as candidaturas de cada cargo, na régua de 0 a 50%. Na Presidência, com menos de 20 candidaturas, só o número absoluto."
      source="Fonte: TSE, Candidaturas 2026"
    >
      <div className="grid gap-px bg-rule lg:grid-cols-3">
        {groups.map((group) => {
          const isPresidency = group.label === "Presidência";
          const differences = group.apoio.map((item) => item.share - group.titular.share);
          const ariaComparison = group.apoio.map((item, index) =>
            isPresidency
              ? `${item.label}: ${formatInt(item.women)} em ${formatInt(item.total)}`
              : `${item.label}: ${formatPct(item.share)}, diferença de ${formatPp(differences[index] ?? 0)}`,
          ).join("; ");

          return (
            <section
              key={group.label}
              className="bg-card py-6 first:pt-0 lg:px-5 lg:first:pl-0 lg:first:pt-6 lg:last:pr-0"
              role="img"
              aria-label={`${group.label}. ${group.titular.label}: ${formatInt(group.titular.women)} mulheres em ${formatInt(group.titular.total)} candidaturas. ${ariaComparison}.`}
            >
              <div className="flex items-center justify-between gap-3">
                <h4 className="font-mono text-[12px] uppercase tracking-wider text-muted-foreground">{group.label}</h4>
                {!isPresidency && <div className="flex flex-wrap justify-end gap-1.5">
                  {differences.map((difference, index) => (
                    <span key={group.apoio[index]?.label} className="border border-plum-soft px-2 py-1 font-mono text-xs font-semibold text-plum-soft">
                      {formatPp(difference)}
                    </span>
                  ))}
                </div>}
              </div>
              <div className="mt-5 space-y-4" aria-hidden="true">
                {isPresidency ? (
                  <>
                    <OfficeUnits datum={group.titular} tone="titular" />
                    {group.apoio.map((datum) => <OfficeUnits key={datum.label} datum={datum} tone="apoio" />)}
                  </>
                ) : (
                  <>
                    <OfficeBar datum={group.titular} tone="titular" />
                    {group.apoio.map((datum) => <OfficeBar key={datum.label} datum={datum} tone="apoio" />)}
                  </>
                )}
              </div>
              {isPresidency ? (
                <p className="mt-4 border-t border-rule pt-2 font-mono text-xs text-muted-foreground">Menos de 20 candidaturas: mostramos o número absoluto.</p>
              ) : (
                <ChartScale max={50} stacked />
              )}
            </section>
          );
        })}
      </div>
    </ChartFrame>
  );
}
