import type { FinanceUniverseSnapshot, TseFinanceSnapshot } from "@/data/tse-finance-snapshot";
import type { UniverseId } from "@/lib/tse/compute";
import { formatBRL, formatInt, formatPct } from "@/lib/format-br";

const UNIVERSE_LABEL: Record<UniverseId, string> = {
  proporcional: "Proporcional",
  majoritario: "Majoritário",
};

function share(part: number, total: number) {
  return total > 0 ? (part / total) * 100 : 0;
}

function CoverageCard({ universe, data }: { universe: UniverseId; data: FinanceUniverseSnapshot }) {
  const totalCoverage = share(data.candidaciesWithRevenue, data.registeredCandidacies);
  const feminineCoverage = share(data.feminineCandidaciesWithRevenue, data.registeredFeminineCandidacies);
  return (
    <article className="poster-frame p-5">
      <p className="poster-eyebrow text-plum">{UNIVERSE_LABEL[universe]}</p>
      <p className="mt-4 font-display text-3xl text-ink">{formatBRL(data.totalRevenue)}</p>
      <p className="mt-1 text-sm text-muted-foreground">receita declarada no universo</p>
      <dl className="mt-5 divide-y divide-rule border-y border-rule text-sm">
        <div className="flex justify-between gap-4 py-3"><dt>Receita de mulheres</dt><dd className="text-right font-mono">{formatBRL(data.feminineRevenue)} · {formatPct(share(data.feminineRevenue, data.totalRevenue))}</dd></div>
        <div className="flex justify-between gap-4 py-3"><dt>Cobertura total</dt><dd className="text-right font-mono">{formatInt(data.candidaciesWithRevenue)} de {formatInt(data.registeredCandidacies)} · {formatPct(totalCoverage)}</dd></div>
        <div className="flex justify-between gap-4 py-3"><dt>Cobertura entre mulheres</dt><dd className="text-right font-mono">{formatInt(data.feminineCandidaciesWithRevenue)} de {formatInt(data.registeredFeminineCandidacies)} · {formatPct(feminineCoverage)}</dd></div>
        <div className="flex justify-between gap-4 py-3"><dt>Mediana · mulheres</dt><dd className="text-right font-mono">{formatBRL(data.feminineMedian)}</dd></div>
        <div className="flex justify-between gap-4 py-3"><dt>Mediana · homens</dt><dd className="text-right font-mono">{formatBRL(data.masculineMedian)}</dd></div>
      </dl>
    </article>
  );
}

export function FinanceCoverage({ snapshot }: { snapshot: TseFinanceSnapshot }) {
  return <div className="grid gap-5 md:grid-cols-2">{(["proporcional", "majoritario"] as const).map((universe) => <CoverageCard key={universe} universe={universe} data={snapshot.universes[universe]} />)}</div>;
}

export function FinanceByOffice({ snapshot }: { snapshot: TseFinanceSnapshot }) {
  const rows = (["majoritario", "proporcional"] as const).flatMap((universe) =>
    Object.entries(snapshot.universes[universe].byOffice).map(([office, datum]) => ({ office, ...datum, share: share(datum.feminine, datum.total) })),
  );
  const labels: Record<string, string> = { PRESIDENTE: "Presidente", GOVERNADOR: "Governador", SENADOR: "Senador", "DEPUTADO FEDERAL": "Deputado federal", "DEPUTADO DISTRITAL": "Deputado distrital", "DEPUTADO ESTADUAL": "Deputado estadual" };
  return (
    <figure className="poster-frame overflow-hidden" aria-label="Participação das mulheres na receita declarada, por cargo">
      <div className="divide-y divide-rule">
        {rows.map((row) => (
          <div key={row.office} className="grid gap-3 px-5 py-4 sm:grid-cols-[10rem_minmax(0,1fr)_8rem] sm:items-center">
            <div><p className="font-display text-lg text-ink">{labels[row.office] ?? row.office}</p><p className="font-mono text-[10px] text-muted-foreground">{formatInt(row.feminineCandidacies)} de {formatInt(row.candidacies)} candidaturas com receita</p></div>
            <div className="h-5 bg-secondary"><div className="h-full bg-coral" style={{ width: `${row.share}%` }} /></div>
            <div className="font-mono text-sm text-ink sm:text-right"><strong>{formatPct(row.share)}</strong><span className="block text-[10px] text-muted-foreground">{formatBRL(row.feminine)}</span></div>
          </div>
        ))}
      </div>
      <figcaption className="border-t border-rule px-5 py-3 font-mono text-[10px] leading-relaxed text-muted-foreground">Fatia da receita total do cargo destinada a candidaturas de mulheres. Receita, não despesa.</figcaption>
    </figure>
  );
}

export function FinanceRace({ snapshot }: { snapshot: TseFinanceSnapshot }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {(["proporcional", "majoritario"] as const).map((universe) => {
        const data = snapshot.universes[universe];
        return <article key={universe} className="poster-frame overflow-hidden"><header className="border-b border-rule px-5 py-4"><h3 className="font-display text-xl text-ink">{UNIVERSE_LABEL[universe]}</h3><p className="mt-1 font-mono text-[10px] text-muted-foreground">Denominador: {formatBRL(data.feminineRevenue)} arrecadados por mulheres</p></header><dl className="divide-y divide-rule">{Object.entries(data.feminineRevenueByRace).sort((a, b) => b[1].value - a[1].value).map(([race, datum]) => <div key={race} className="grid grid-cols-[5rem_minmax(0,1fr)_7rem] items-center gap-3 px-5 py-3"><dt className="font-mono text-[10px] text-muted-foreground">{race}</dt><dd className="h-2 bg-secondary"><div className="h-full bg-plum" style={{ width: `${share(datum.value, data.feminineRevenue)}%` }} /></dd><dd className="text-right font-mono text-[10px] text-ink">{formatPct(share(datum.value, data.feminineRevenue))}<span className="block text-muted-foreground">{formatInt(datum.candidacies)} candidaturas</span></dd></div>)}</dl></article>;
      })}
    </div>
  );
}

export function FinanceParties({ snapshot }: { snapshot: TseFinanceSnapshot }) {
  const parties = snapshot.universes.proporcional.topParties ?? {};
  return <div className="overflow-x-auto"><table className="w-full min-w-[560px] border-collapse text-left"><thead><tr className="border-b-2 border-ink"><th className="py-2 pr-4 font-mono text-[11px] uppercase text-muted-foreground">Partido</th><th className="py-2 pr-4 text-right font-mono text-[11px] uppercase text-muted-foreground">Receita total</th><th className="py-2 pr-4 text-right font-mono text-[11px] uppercase text-muted-foreground">Mulheres</th><th className="py-2 text-right font-mono text-[11px] uppercase text-muted-foreground">Fatia</th></tr></thead><tbody>{Object.entries(parties).map(([party, datum]) => <tr key={party} className="border-b border-rule"><th className="py-3 pr-4 font-display text-lg text-ink">{party}</th><td className="py-3 pr-4 text-right font-mono text-xs">{formatBRL(datum.total)}</td><td className="py-3 pr-4 text-right font-mono text-xs">{formatBRL(datum.feminine)}</td><td className="py-3 text-right font-mono text-xs">{formatPct(share(datum.feminine, datum.total))}</td></tr>)}</tbody></table></div>;
}

export function FinanceByUf({ snapshot }: { snapshot: TseFinanceSnapshot }) {
  const rows = Object.entries(snapshot.universes.proporcional.byUf ?? {}).sort((a, b) => b[1].total - a[1].total);
  return <div className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">{rows.map(([uf, datum]) => <article key={uf} className="bg-paper p-4"><div className="flex items-baseline justify-between"><h3 className="font-display text-xl text-ink">{uf}</h3><span className="font-mono text-xs text-plum">{formatPct(share(datum.feminine, datum.total))}</span></div><p className="mt-2 font-mono text-[11px] text-ink">{formatBRL(datum.total)}</p><p className="mt-1 text-xs text-muted-foreground">Mulheres: {formatBRL(datum.feminine)}</p></article>)}</div>;
}