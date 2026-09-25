import { RACE_CATEGORY_RULE } from "@/data/architecture";
import { GapNote } from "@/components/GapNote";
import { snapshotRaceCounts } from "@/lib/tse/indicators";
import type { PublicSnapshot } from "@/lib/tse/snapshot.functions";
import type { UniverseId } from "@/lib/tse/compute";
import { ContextBox } from "./ContextBox";
import { ChartBar, ChartFrame, ChartScale } from "./ChartFrame";
import { RACE_BAR } from "./FinanceOverview";
import { formatInt, formatPct } from "@/lib/format-br";

/**
 * RaceBreakdown — distribuição por categoria original de cor/raça das
 * candidaturas de mulheres, lida diretamente da fotografia gravada pela coleta
 * do TSE. Nenhum número é calculado aqui além da razão sobre o denominador
 * exibido; nenhuma categoria é criada ou substituída.
 */
const UNIVERSE_TITLE: Record<UniverseId, string> = {
  proporcional: "Candidaturas proporcionais",
  majoritario: "Candidaturas majoritárias",
};

const UNIVERSE_NOTE: Record<UniverseId, string> = {
  proporcional:
    "Câmara dos Deputados, assembleias legislativas e Câmara Legislativa do Distrito Federal.",
  majoritario:
    "Presidência, governos estaduais e do Distrito Federal e Senado. Universo pequeno: leia em contagens absolutas.",
};

function Table({
  snapshot,
  universe,
}: {
  snapshot: PublicSnapshot | null;
  universe: UniverseId;
}) {
  const counts = snapshotRaceCounts(snapshot, universe);
  const denominator = counts
    ? Object.values(counts).reduce((a, b) => a + b, 0)
    : null;

  return (
    <ChartFrame
      eyebrow={`Candidatas por cor/raça · ${universe === "proporcional" ? "proporcional" : "majoritário"}`}
      title={UNIVERSE_TITLE[universe]}
      note={<>{UNIVERSE_NOTE[universe]}{denominator ? ` Denominador: ${formatInt(denominator)} candidaturas de mulheres. Régua de 0 a 100%.` : ""}</>}
      source="Fonte: TSE, Candidaturas 2026"
    >
      {counts && denominator ? (
        <>
          <div className="space-y-3">
            {Object.entries(counts)
              .sort((a, b) => b[1] - a[1])
              .map(([category, value]) => {
                const pct = (value / denominator) * 100;
                const label = category.charAt(0) + category.slice(1).toLocaleLowerCase("pt-BR");
                return (
                  <ChartBar
                    key={category}
                    label={label}
                    base={`${formatInt(value)} ${value === 1 ? "candidata" : "candidatas"}`}
                    value={pct}
                    scaleMax={100}
                    display={formatPct(pct)}
                    barClass={RACE_BAR[category] ?? "bg-[var(--race-na)]"}
                  />
                );
              })}
          </div>
          <ChartScale max={100} />
        </>
      ) : (
        <GapNote label="Lacuna declarada">
          A fotografia atual do TSE ainda não trouxe a distribuição por
          categoria de cor/raça para este universo.
        </GapNote>
      )}
    </ChartFrame>
  );
}

export function RaceBreakdown({ snapshot }: { snapshot: PublicSnapshot | null }) {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <Table snapshot={snapshot} universe="proporcional" />
        <Table snapshot={snapshot} universe="majoritario" />
      </div>
      <ContextBox variant="calculamos">
        <p>
          Contagem de candidaturas de mulheres por categoria original de cor/raça
          declarada no registro, dividida pelo total de candidaturas de mulheres
          no mesmo universo. Os universos proporcional e majoritário nunca são
          somados.
        </p>
      </ContextBox>
      <GapNote label="Categorias de cor/raça">{RACE_CATEGORY_RULE}</GapNote>
    </div>
  );
}
