import { RACE_CATEGORY_RULE } from "@/data/architecture";
import mulheresAsset from "@/assets/mulheres-Photoroom.png.asset.json";
import { GapNote } from "@/components/GapNote";
import { snapshotRaceCounts } from "@/lib/tse/indicators";
import type { PublicSnapshot } from "@/lib/tse/snapshot.functions";
import type { UniverseId } from "@/lib/tse/compute";
import { ContextBox } from "./ContextBox";

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
    <article className="editorial-card overflow-hidden">
      <header className="border-b border-rule px-5 py-4">
        <h3 className="font-display text-xl text-ink">
          {UNIVERSE_TITLE[universe]}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {UNIVERSE_NOTE[universe]}
        </p>
      </header>

      {counts && denominator ? (
        <>
          <p className="border-b border-rule px-5 py-3 font-mono text-[12px] text-muted-foreground">
            Denominador: {denominator.toLocaleString("pt-BR")} candidaturas de
            mulheres neste universo
          </p>
          <dl className="divide-y divide-rule">
            {Object.entries(counts)
              .sort((a, b) => b[1] - a[1])
              .map(([category, value]) => (
                <div
                  key={category}
                  className="flex items-baseline gap-4 px-5 py-3"
                >
                  <dt className="w-32 shrink-0 font-mono text-[12px] uppercase tracking-wider text-muted-foreground">
                    {category}
                  </dt>
                  <dd className="flex-1">
                    <div
                      className="h-2 rounded-full bg-plum"
                      style={{ width: `${(value / denominator) * 100}%` }}
                      aria-hidden
                    />
                  </dd>
                  <dd className="w-36 shrink-0 text-right font-mono text-xs text-ink">
                    {value.toLocaleString("pt-BR")} ·{" "}
                    {((value / denominator) * 100).toLocaleString("pt-BR", {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    })}
                    %
                  </dd>
                </div>
              ))}
          </dl>
        </>
      ) : (
        <div className="p-5">
          <GapNote label="Lacuna declarada">
            A fotografia atual do TSE ainda não trouxe a distribuição por
            categoria de cor/raça para este universo. Ausência de dado não é
            zero.
          </GapNote>
        </div>
      )}
    </article>
  );
}

export function RaceBreakdown({ snapshot }: { snapshot: PublicSnapshot | null }) {
  return (
    <div className="space-y-8">
      <figure className="overflow-hidden rounded-lg border border-rule bg-paper leading-none">
        <img
          src={mulheresAsset.url}
          alt="Ilustração editorial: fileira de mulheres de perfil, de diferentes idades, origens e trajetórias"
          loading="lazy"
          className="block h-auto w-full object-contain"
        />
      </figure>

      <div className="grid gap-6 md:grid-cols-2">
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
