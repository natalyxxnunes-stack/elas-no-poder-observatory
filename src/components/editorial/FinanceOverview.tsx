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
      ficha={{
        vendo: "Para cada cargo, a fatia de mulheres entre as candidaturas com receita e a fatia delas no dinheiro declarado.",
        contados: "Candidaturas que já declararam alguma receita na prestação de contas.",
        denominador: "Presença: candidaturas com receita no cargo. Receita: total declarado no cargo.",
        data: `Prestação de contas de ${FINANCE_BASE_LABEL}, contas em andamento`,
        fonte: "TSE, Prestação de Contas Eleitorais 2026, cruzada com TSE, Candidaturas 2026",
        limitacao: "Contas em andamento: os valores mudam até a prestação final. Mede receita declarada, não despesa.",
      }}
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
            ficha={{
        vendo: "Como o dinheiro declarado por candidatas se divide entre os grupos de cor/raça.",
        contados: universe === "proporcional" ? "Candidatas a deputada com receita declarada." : "Candidatas à Presidência, aos governos e ao Senado com receita declarada.",
        denominador: "Receita total declarada pelas candidatas do mesmo universo.",
        data: `Prestação de contas de ${FINANCE_BASE_LABEL}, contas em andamento`,
        fonte: "TSE, Prestação de Contas Eleitorais 2026, cruzada com TSE, Candidaturas 2026",
        limitacao: "Contas em andamento: os valores mudam até a prestação final. Mede receita declarada, não despesa.",
      }}
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
      ficha={{
        vendo: "Nos cinco partidos com mais receita, a fatia do dinheiro do partido que foi para candidatas.",
        contados: "Candidaturas a deputada e deputado com receita declarada, pelo partido do registro.",
        denominador: "Receita total declarada pelas candidaturas do próprio partido.",
        data: `Prestação de contas de ${FINANCE_BASE_LABEL}, contas em andamento`,
        fonte: "TSE, Prestação de Contas Eleitorais 2026, cruzada com TSE, Candidaturas 2026",
        limitacao: "Receita registrada na candidatura, de qualquer origem, além do repasse do partido. Contas em andamento.",
      }}
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
      ficha={{
        vendo: "Em cada estado, a fatia das candidatas no dinheiro declarado para deputado.",
        contados: "Candidaturas a deputada e deputado com receita declarada, por UF.",
        denominador: "Receita total declarada pelas candidaturas do estado.",
        data: `Prestação de contas de ${FINANCE_BASE_LABEL}, contas em andamento`,
        fonte: "TSE, Prestação de Contas Eleitorais 2026, cruzada com TSE, Candidaturas 2026",
        limitacao: "Contas em andamento: os valores mudam até a prestação final. Mede receita declarada, não despesa.",
      }}
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
