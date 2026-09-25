import {
  FINANCE_BASE_LABEL,
  type FinanceUniverseSnapshot,
  type TseFinanceSnapshot,
} from "@/data/tse-finance-snapshot";
import type { UniverseId } from "@/lib/tse/compute";
import { formatBRLCompact, formatInt, formatPct } from "@/lib/format-br";

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
      <p className="mt-4 font-display text-3xl text-ink">{formatBRLCompact(data.totalRevenue)}</p>
      <p className="mt-1 text-sm text-muted-foreground">receita declarada no universo</p>
      <dl className="mt-5 divide-y divide-rule border-y border-rule text-sm">
        <div className="flex justify-between gap-4 py-3"><dt>Receita de mulheres</dt><dd className="text-right font-mono">{formatBRLCompact(data.feminineRevenue)} · {formatPct(share(data.feminineRevenue, data.totalRevenue))}</dd></div>
        <div className="flex justify-between gap-4 py-3"><dt>Cobertura total</dt><dd className="text-right font-mono">{formatInt(data.candidaciesWithRevenue)} de {formatInt(data.registeredCandidacies)} · {formatPct(totalCoverage)}</dd></div>
        <div className="flex justify-between gap-4 py-3"><dt>Cobertura entre mulheres</dt><dd className="text-right font-mono">{formatInt(data.feminineCandidaciesWithRevenue)} de {formatInt(data.registeredFeminineCandidacies)} · {formatPct(feminineCoverage)}</dd></div>
        <div className="flex justify-between gap-4 py-3"><dt>Mediana · mulheres</dt><dd className="text-right font-mono">{formatBRLCompact(data.feminineMedian)}</dd></div>
        <div className="flex justify-between gap-4 py-3"><dt>Mediana · homens</dt><dd className="text-right font-mono">{formatBRLCompact(data.masculineMedian)}</dd></div>
      </dl>
    </article>
  );
}

export function FinanceCoverage({ snapshot }: { snapshot: TseFinanceSnapshot }) {
  return <div className="grid gap-5 md:grid-cols-2">{(["proporcional", "majoritario"] as const).map((universe) => <CoverageCard key={universe} universe={universe} data={snapshot.universes[universe]} />)}</div>;
}

export function FinanceByOffice({ snapshot }: { snapshot: TseFinanceSnapshot }) {
  const rows = (["majoritario", "proporcional"] as const).flatMap((universe) =>
    Object.entries(snapshot.universes[universe].byOffice).map(([office, datum]) => ({
      office,
      ...datum,
      revenueShare: share(datum.feminine, datum.total),
      presenceShare: share(datum.feminineCandidacies, datum.candidacies),
    })),
  );
  const labels: Record<string, string> = { PRESIDENTE: "Presidente", GOVERNADOR: "Governador", SENADOR: "Senador", "DEPUTADO FEDERAL": "Deputado federal", "DEPUTADO DISTRITAL": "Deputado distrital", "DEPUTADO ESTADUAL": "Deputado estadual" };
  return (
    <figure className="poster-frame overflow-hidden" aria-label="Presença das mulheres e participação na receita declarada, por cargo">
      <div className="flex gap-5 border-b border-rule px-5 py-3 font-mono text-xs text-muted-foreground">
        <span className="flex items-center gap-2"><span className="size-2 bg-plum" aria-hidden="true" />Presença</span>
        <span className="flex items-center gap-2"><span className="size-2 bg-coral" aria-hidden="true" />Receita</span>
      </div>
      <div className="divide-y divide-rule">
        {rows.map((row) => row.office === "PRESIDENTE" ? (
          <div key={row.office} className="px-5 py-4">
            <p className="font-display text-lg text-ink">Presidente</p>
            <p className="mt-2 font-mono text-xs text-muted-foreground">2 de 13 candidaturas com receita · 1,3% da receita</p>
          </div>
        ) : (
          <div key={row.office} className="grid gap-3 px-5 py-4 sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-center">
            <div><p className="font-display text-lg text-ink">{labels[row.office] ?? row.office}</p><p className="font-mono text-xs text-muted-foreground">{formatInt(row.feminineCandidacies)} de {formatInt(row.candidacies)} candidaturas com receita</p></div>
            <div className="space-y-2">
              <div className="grid grid-cols-[minmax(0,1fr)_3.5rem] items-center gap-3"><div className="h-3 bg-secondary"><div className="h-full bg-plum" style={{ width: `${Math.min(row.presenceShare * 2, 100)}%` }} /></div><span className="font-mono text-xs text-ink">{formatPct(row.presenceShare)}</span></div>
              <div className="grid grid-cols-[minmax(0,1fr)_3.5rem] items-center gap-3"><div className="h-3 bg-secondary"><div className="h-full bg-coral" style={{ width: `${Math.min(row.revenueShare * 2, 100)}%` }} /></div><span className="font-mono text-xs text-ink">{formatPct(row.revenueShare)}</span></div>
            </div>
          </div>
        ))}
      </div>
      <figcaption className="border-t border-rule px-5 py-3 font-mono text-xs leading-relaxed text-muted-foreground">Presença entre candidaturas com receita e fatia da receita declarada do cargo. Régua de 0 a 50%. Contas de campanha em andamento, fotografia de {FINANCE_BASE_LABEL}. Receita, não despesa.</figcaption>
    </figure>
  );
}

export function FinanceRace({ snapshot }: { snapshot: TseFinanceSnapshot }) {
  const raceOrder = ["BRANCA", "PARDA", "PRETA", "INDÍGENA", "AMARELA"];
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {(["proporcional", "majoritario"] as const).map((universe) => {
        const data = snapshot.universes[universe];
        return <article key={universe} className="poster-frame overflow-hidden"><header className="border-b border-rule px-5 py-4"><h3 className="font-display text-xl text-ink">{UNIVERSE_LABEL[universe]}</h3><p className="mt-1 font-mono text-xs text-muted-foreground">Denominador: {formatBRLCompact(data.feminineRevenue)} de receita declarada por candidaturas de mulheres</p></header><dl className="divide-y divide-rule">{raceOrder.flatMap((race) => {
          const datum = data.feminineRevenueByRace[race];
          if (!datum) return [];
          return [<div key={race} className="grid grid-cols-[5rem_minmax(0,1fr)_8.5rem] items-center gap-3 px-5 py-3"><dt className="font-mono text-xs text-muted-foreground">{race.toLocaleLowerCase("pt-BR")}</dt><dd className="h-2 bg-secondary"><div className="h-full bg-plum" style={{ width: `${share(datum.value, data.feminineRevenue)}%` }} /></dd><dd className="text-right font-mono text-xs text-ink">{formatPct(share(datum.value, data.feminineRevenue))}<span className="block text-muted-foreground">{formatInt(datum.candidacies)} candidaturas</span>{universe === "proporcional" && <span className="block text-muted-foreground">mediana {formatBRLCompact(data.feminineMedianByRace[race] ?? 0)}</span>}</dd></div>];
        })}</dl><p className="border-t border-rule px-5 py-4 text-sm leading-relaxed text-muted-foreground">{universe === "proporcional" ? "Nos 12 partidos com mais receita: mediana de R$ 130.427 para brancas (2.094 candidatas), R$ 86.500 para pardas (1.469) e R$ 75.000 para pretas (789)." : "Nas disputas por governo, Senado e Presidência, a diferença de dinheiro acompanha o partido que lança a candidata. Nos 12 partidos com mais receita estão 37 das 65 candidatas brancas, 12 das 24 pardas e 4 das 17 pretas. Dentro desses partidos, a mediana das candidatas passa de R$ 1 milhão; fora deles, fica abaixo de R$ 30 mil."}</p></article>;
      })}
    </div>
  );
}

export function FinanceParties({ snapshot }: { snapshot: TseFinanceSnapshot }) {
  const parties = snapshot.universes.proporcional.topParties ?? {};
  return <div className="overflow-x-auto"><table className="w-full min-w-[560px] border-collapse text-left"><thead><tr className="border-b-2 border-ink"><th className="py-2 pr-4 font-mono text-xs uppercase text-muted-foreground">Partido</th><th className="py-2 pr-4 text-right font-mono text-xs uppercase text-muted-foreground">Receita total</th><th className="py-2 pr-4 text-right font-mono text-xs uppercase text-muted-foreground">Mulheres</th><th className="py-2 text-right font-mono text-xs uppercase text-muted-foreground">Fatia</th></tr></thead><tbody>{Object.entries(parties).map(([party, datum]) => <tr key={party} className="border-b border-rule"><th className="py-3 pr-4 font-display text-lg text-ink">{party}</th><td className="py-3 pr-4 text-right font-mono text-xs">{formatBRLCompact(datum.total)}</td><td className="py-3 pr-4 text-right font-mono text-xs">{formatBRLCompact(datum.feminine)}</td><td className="py-3 text-right font-mono text-xs">{formatPct(share(datum.feminine, datum.total))}</td></tr>)}</tbody></table></div>;
}

export function FinanceByUf({ snapshot }: { snapshot: TseFinanceSnapshot }) {
  const rows = Object.entries(snapshot.universes.proporcional.byUf ?? {}).sort((a, b) => b[1].total - a[1].total);
  return <div className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">{rows.map(([uf, datum]) => <article key={uf} className="bg-paper p-4"><div className="flex items-baseline justify-between"><h3 className="font-display text-xl text-ink">{uf}</h3><span className="font-mono text-xs text-plum">{formatPct(share(datum.feminine, datum.total))}</span></div><p className="mt-2 font-mono text-xs text-ink">{formatBRLCompact(datum.total)}</p><p className="mt-1 text-xs text-muted-foreground">Mulheres: {formatBRLCompact(datum.feminine)}</p></article>)}</div>;
}