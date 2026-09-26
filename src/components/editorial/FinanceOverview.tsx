import {
  FINANCE_BASE_LABEL,
  type FinanceUniverseSnapshot,
  type TseFinanceSnapshot,
} from "@/data/tse-finance-snapshot";
import type { UniverseId } from "@/lib/tse/compute";
import { ChartBar, ChartFrame, ChartScale, LegendSwatch } from "@/components/editorial/ChartFrame";
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

const SOURCE = `Fonte: TSE, Prestação de Contas Eleitorais 2026 · base de ${FINANCE_BASE_LABEL}, contas em andamento`;
const MIN_BASE = 20;

export const RACE_BAR: Record<string, string> = {
  BRANCA: "bg-[var(--race-branca)]",
  PARDA: "bg-[var(--race-parda)]",
  PRETA: "bg-plum",
  "INDÍGENA": "bg-forest",
  AMARELA: "bg-[var(--race-amarela)]",
};

const OFFICE_LABELS: Record<string, string> = { PRESIDENTE: "Presidente", GOVERNADOR: "Governador", SENADOR: "Senador", "DEPUTADO FEDERAL": "Deputado federal", "DEPUTADO DISTRITAL": "Deputado distrital", "DEPUTADO ESTADUAL": "Deputado estadual" };

export function FinanceByOffice({ snapshot }: { snapshot: TseFinanceSnapshot }) {
  const rows = (["majoritario", "proporcional"] as const).flatMap((universe) =>
    Object.entries(snapshot.universes[universe].byOffice).map(([office, datum]) => ({
      office,
      ...datum,
      revenueShare: share(datum.feminine, datum.total),
      presenceShare: share(datum.feminineCandidacies, datum.candidacies),
    })),
  );
  return (
    <ChartFrame
      eyebrow="Presença × receita, por cargo · 2026"
      title="Fatia das mulheres entre as candidaturas e no dinheiro de cada cargo"
      legend={<><LegendSwatch className="bg-plum">Presença</LegendSwatch><LegendSwatch className="bg-plum-soft">Receita</LegendSwatch></>}
      note="Presença: mulheres entre as candidaturas que já declararam receita. Receita: fatia do dinheiro declarado no cargo. Régua de 0 a 50%. Receita, não despesa."
      source={SOURCE}
      ariaLabel="Presença das mulheres e participação na receita declarada, por cargo"
    >
      <div className="divide-y divide-rule">
        {rows.map((row) => row.candidacies < MIN_BASE ? (
          <div key={row.office} className="py-4 first:pt-0">
            <p className="font-display text-lg text-ink">{OFFICE_LABELS[row.office] ?? row.office}</p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">{formatInt(row.feminineCandidacies)} de {formatInt(row.candidacies)} candidaturas com receita · {formatBRLCompact(row.feminine)} de {formatBRLCompact(row.total)}. Menos de 20 candidaturas: só números absolutos.</p>
          </div>
        ) : (
          <div key={row.office} className="space-y-2 py-4 first:pt-0">
            <p className="font-display text-lg text-ink">{OFFICE_LABELS[row.office] ?? row.office}</p>
            <ChartBar label="Presença" base={`${formatInt(row.feminineCandidacies)} de ${formatInt(row.candidacies)}`} value={row.presenceShare} scaleMax={50} display={formatPct(row.presenceShare)} barClass="bg-plum" valueClass="text-plum" />
            <ChartBar label="Receita" base={`${formatBRLCompact(row.feminine)} de ${formatBRLCompact(row.total)}`} value={row.revenueShare} scaleMax={50} display={formatPct(row.revenueShare)} barClass="bg-plum-soft" valueClass="text-plum-soft" />
          </div>
        ))}
      </div>
      <ChartScale max={50} />
    </ChartFrame>
  );
}

export function FinanceRace({ snapshot }: { snapshot: TseFinanceSnapshot }) {
  const raceOrder = ["BRANCA", "PARDA", "PRETA", "INDÍGENA", "AMARELA"];
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {(["proporcional", "majoritario"] as const).map((universe) => {
        const data = snapshot.universes[universe];
        return (
          <ChartFrame
            key={universe}
            eyebrow={`Receita de mulheres por cor/raça · ${UNIVERSE_LABEL[universe].toLocaleLowerCase("pt-BR")}`}
            title={universe === "proporcional" ? "Candidatas a deputada" : "Presidência, governos e Senado"}
            note={
              <>
                Fatia de {formatBRLCompact(data.feminineRevenue)} declarados por candidaturas de mulheres, na régua de 0 a 100%.{" "}
                {universe === "proporcional"
                  ? "Nos 12 partidos com mais receita: mediana de R$ 130.427 para brancas (2.094 candidatas), R$ 86.500 para pardas (1.469) e R$ 75.000 para pretas (789)."
                  : "Aqui a distribuição da receita também varia conforme o partido que lança a candidata: nos 12 partidos com mais receita estão 37 das 65 candidatas brancas, 12 das 24 pardas e 4 das 17 pretas."}
              </>
            }
            source={SOURCE}
          >
            <div className="space-y-3">
              {raceOrder.flatMap((race) => {
                const datum = data.feminineRevenueByRace[race];
                if (!datum) return [];
                const label = race.charAt(0) + race.slice(1).toLocaleLowerCase("pt-BR");
                const median = universe === "proporcional" ? ` · mediana ${formatBRLCompact(data.feminineMedianByRace[race] ?? 0)}` : "";
                const pct = share(datum.value, data.feminineRevenue);
                return [
                  <ChartBar
                    key={race}
                    label={label}
                    base={`${formatInt(datum.candidacies)} ${datum.candidacies === 1 ? "candidatura" : "candidaturas"}${median}`}
                    value={pct}
                    scaleMax={100}
                    display={formatPct(pct)}
                    barClass={RACE_BAR[race] ?? "bg-plum"}
                  />,
                ];
              })}
            </div>
            <ChartScale max={100} />
          </ChartFrame>
        );
      })}
    </div>
  );
}

export function FinanceParties({ snapshot }: { snapshot: TseFinanceSnapshot }) {
  const parties = Object.entries(snapshot.universes.proporcional.topParties ?? {});
  return (
    <ChartFrame
      eyebrow="Cinco partidos com mais receita · proporcional"
      title="Quanto do dinheiro de cada partido foi para candidatas"
      note="Ordem pela receita total declarada, do maior para o menor. Fatia das mulheres na régua de 0 a 50%. Ordem descritiva, sem classificar mérito."
      source={SOURCE}
    >
      <div className="space-y-4">
        {parties.map(([party, datum]) => {
          const pct = share(datum.feminine, datum.total);
          return (
            <ChartBar
              key={party}
              label={<span className="font-display text-lg">{party}</span>}
              base={`${formatBRLCompact(datum.feminine)} de ${formatBRLCompact(datum.total)}`}
              value={pct}
              scaleMax={50}
              display={formatPct(pct)}
            />
          );
        })}
      </div>
      <ChartScale max={50} />
    </ChartFrame>
  );
}

export function FinanceByUf({ snapshot }: { snapshot: TseFinanceSnapshot }) {
  const rows = Object.entries(snapshot.universes.proporcional.byUf ?? {})
    .map(([uf, datum]) => ({ uf, ...datum, pct: share(datum.feminine, datum.total) }))
    .sort((a, b) => b.pct - a.pct);
  return (
    <ChartFrame
      eyebrow="Receita das mulheres por estado · proporcional"
      title="Fatia das candidatas no dinheiro declarado em cada UF"
      note="Da maior para a menor fatia. Régua de 0 a 50%. Embaixo de cada UF, a receita das mulheres e o total declarado no estado."
      source={SOURCE}
    >
      <div className="grid gap-x-10 gap-y-3 lg:grid-cols-2">
        {rows.map((row) => (
          <ChartBar
            key={row.uf}
            label={row.uf}
            base={`${formatBRLCompact(row.feminine)} de ${formatBRLCompact(row.total)}`}
            value={row.pct}
            scaleMax={50}
            display={formatPct(row.pct)}
          />
        ))}
      </div>
    </ChartFrame>
  );
}
