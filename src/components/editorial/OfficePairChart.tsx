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

const GROUPS: readonly OfficeGroup[] = [
  {
    label: "Presidência",
    titular: { label: "Presidente", total: 14, women: 2, share: 14.3 },
    apoio: [{ label: "Vice-presidente", total: 14, women: 6, share: 42.9 }],
  },
  {
    label: "Governos",
    titular: { label: "Governador", total: 201, women: 35, share: 17.4 },
    apoio: [{ label: "Vice-governador", total: 211, women: 88, share: 41.7 }],
  },
  {
    label: "Senado",
    titular: { label: "Senador", total: 319, women: 70, share: 21.9 },
    apoio: [
      { label: "1º suplente", total: 349, women: 106, share: 30.4 },
      { label: "2º suplente", total: 350, women: 107, share: 30.6 },
    ],
  },
] as const;

const formatInt = (value: number) => value.toLocaleString("pt-BR");
const formatPct = (value: number) => `${value.toFixed(1).replace(".", ",")}%`;
const formatPp = (value: number) => `+${value.toFixed(1).replace(".", ",")} p.p.`;

function OfficeBar({ datum, tone }: { datum: OfficeDatum; tone: "titular" | "apoio" }) {
  return (
    <div className="grid gap-2 sm:grid-cols-[9rem_minmax(0,1fr)_4rem] sm:items-center">
      <div>
        <p className="font-display text-base font-semibold text-ink">{datum.label}</p>
        <p className="font-mono text-[11px] text-muted-foreground">
          {formatInt(datum.women)} de {formatInt(datum.total)}
        </p>
      </div>
      <div className="h-5 overflow-hidden bg-secondary" aria-hidden="true">
        <div
          className={`h-full ${tone === "titular" ? "bg-plum" : "bg-coral"}`}
          style={{ width: `${datum.share * 2}%` }}
        />
      </div>
      <p className={`font-display text-xl font-semibold sm:text-right ${tone === "titular" ? "text-plum" : "text-coral-ink"}`}>
        {formatPct(datum.share)}
      </p>
    </div>
  );
}

export function OfficePairChart() {
  return (
    <figure className="poster-frame p-5 md:p-6">
      <figcaption className="flex flex-wrap items-end justify-between gap-4 border-b border-ink pb-4">
        <div>
          <p className="poster-eyebrow text-ink">Titular × vice ou suplência</p>
          <h3 className="mt-2 max-w-2xl font-display text-2xl leading-tight text-ink md:text-3xl">
            A presença de mulheres cresce nas posições de apoio à chapa
          </h3>
        </div>
        <div className="flex gap-4 font-mono text-[11px] uppercase text-muted-foreground" aria-label="Legenda">
          <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 bg-plum" aria-hidden="true" />Titular</span>
          <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 bg-coral" aria-hidden="true" />Vice ou suplência</span>
        </div>
      </figcaption>

      <div className="grid gap-px bg-rule lg:grid-cols-3">
        {GROUPS.map((group) => {
          const differences = group.apoio.map((item) => item.share - group.titular.share);
          const ariaComparison = group.apoio
            .map((item, index) => `${item.label}: ${formatPct(item.share)}, diferença de ${formatPp(differences[index] ?? 0)}`)
            .join("; ");

          return (
            <section
              key={group.label}
              className="bg-paper py-6 lg:px-5"
              role="img"
              aria-label={`${group.label}. ${group.titular.label}: ${formatPct(group.titular.share)}, ${formatInt(group.titular.women)} mulheres em ${formatInt(group.titular.total)} candidaturas. ${ariaComparison}.`}
            >
              <div className="flex items-center justify-between gap-3">
                <h4 className="font-mono text-[12px] uppercase tracking-wider text-muted-foreground">{group.label}</h4>
                <div className="flex flex-wrap justify-end gap-1.5">
                  {differences.map((difference, index) => (
                    <span key={group.apoio[index]?.label} className="border border-coral px-2 py-1 font-mono text-[11px] font-semibold text-coral-ink">
                      {formatPp(difference)}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-5 space-y-4" aria-hidden="true">
                <OfficeBar datum={group.titular} tone="titular" />
                {group.apoio.map((datum) => <OfficeBar key={datum.label} datum={datum} tone="apoio" />)}
              </div>
              <div className="mt-4 flex justify-between border-t border-rule pt-2 font-mono text-[10px] text-muted-foreground" aria-hidden="true">
                <span>0%</span><span>escala até 50%</span><span>50%</span>
              </div>
            </section>
          );
        })}
      </div>
    </figure>
  );
}
