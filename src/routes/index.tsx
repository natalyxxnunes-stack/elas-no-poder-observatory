import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { AchadoCard } from "@/components/editorial/AchadoCard";
import {
  HomeAboutBand,
  HomeFunnelFeature,
  HomeHistoryHighlight,
  HomeHeroEditorial,
  HomeInvestigationGrid,
  HomeMapSection,
  HomeStages,
} from "@/components/home/HomeEditorial";
import { formatPercent } from "@/data/election-2026";
import { ACHADOS_RECENTES } from "@/data/achados";
import { formatInt } from "@/lib/format-br";
import {
  getHistoricalSeries,
  type HistoricalSeriesPayload,
} from "@/lib/tse/historical.functions";
import {
  getLatestTseSnapshot,
  getPendingReviewBaseDate,
  type PublicSnapshot,
} from "@/lib/tse/snapshot.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Quem são elas? — Mulheres, eleições e poder | Dados 2026" },
      {
        name: "description",
        content:
          "Observatório de dados sobre mulheres, eleições e poder em 2026: candidaturas proporcionais e majoritárias, gênero e raça, o funil até o poder e o método aberto.",
      },
      { property: "og:title", content: "Quem são elas? — Dados 2026" },
      {
        property: "og:description",
        content:
          "Entre se candidatar e chegar ao poder, onde elas desaparecem? Um observatório de dados sobre mulheres, eleições e poder.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: async () => {
    const [snapshot, pendingReviewBaseDate, historical] = await Promise.all([
      getLatestTseSnapshot(),
      getPendingReviewBaseDate(),
      getHistoricalSeries(),
    ]);
    return { snapshot, pendingReviewBaseDate, historical };
  },
  component: DadosPage,
});

function snapshotDate(iso: string | null): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

function ufRange(snapshot: PublicSnapshot | null) {
  const dimensions = snapshot?.universes.proporcional.dimensions;
  const feminine = dimensions?.feminineByUf;
  const total = dimensions?.totalByUf;
  if (!feminine || !total) return null;

  let min: { uf: string; share: number; feminine: number; total: number } | null = null;
  let max: { uf: string; share: number; feminine: number; total: number } | null = null;
  let runnerUp: { uf: string; share: number; feminine: number; total: number } | null = null;
  for (const [uf, denominator] of Object.entries(total)) {
    if (!denominator || denominator <= 0) continue;
    const numerator = feminine[uf] ?? 0;
    const share = (numerator / denominator) * 100;
    const datum = { uf, share, feminine: numerator, total: denominator };
    if (!min || share < min.share) min = datum;
    if (!max || share > max.share) {
      runnerUp = max;
      max = datum;
    } else if (!runnerUp || share > runnerUp.share) {
      runnerUp = datum;
    }
  }
  return min && max ? { min, max, runnerUp } : null;
}

const UF_NAMES: Record<string, string> = {
  AC: "Acre", AL: "Alagoas", AP: "Amapá", AM: "Amazonas", BA: "Bahia", CE: "Ceará",
  DF: "Distrito Federal", ES: "Espírito Santo", GO: "Goiás", MA: "Maranhão", MT: "Mato Grosso",
  MS: "Mato Grosso do Sul", MG: "Minas Gerais", PA: "Pará", PB: "Paraíba", PR: "Paraná",
  PE: "Pernambuco", PI: "Piauí", RJ: "Rio de Janeiro", RN: "Rio Grande do Norte",
  RS: "Rio Grande do Sul", RO: "Rondônia", RR: "Roraima", SC: "Santa Catarina",
  SP: "São Paulo", SE: "Sergipe", TO: "Tocantins",
};

function CurrentSnapshot({ snapshot, baseDate, pendingDate }: {
  snapshot: PublicSnapshot | null;
  baseDate: string | null;
  pendingDate: string | null;
}) {
  const majoritarian = snapshot?.universes.majoritario ?? null;
  const territory = ufRange(snapshot);
  const majoritarianShare = majoritarian && majoritarian.total > 0
    ? (majoritarian.feminine / majoritarian.total) * 100
    : null;

  return (
    <section className="border-t border-rule py-12 md:py-16">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-stretch lg:gap-16">
        <div className="flex min-w-0 flex-col">
          <p className="font-mono text-xs uppercase text-muted-foreground">2026 · fotografia em andamento</p>
          <h2 className="mt-4 font-display text-4xl leading-none text-ink md:text-5xl">O que os registros permitem dizer agora</h2>
          <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
            Tudo nesta parte da página é quem pediu registro para disputar 2026 — quem entrou na disputa. Não há resultado eleitoral aqui: o 1º turno é em 4 de outubro de 2026 e o eventual 2º turno em 25 de outubro de 2026.
          </p>
          {snapshot && (
            <div className="mt-8 border-l-4 border-coral pl-4">
              <p className="font-display text-2xl leading-tight text-ink">
                {formatInt(snapshot.recordCount)} candidaturas nos universos proporcional e majoritário.
              </p>
              {snapshot.outOfUniverse && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Outras {formatInt(snapshot.outOfUniverse.total)}, de vices e suplentes, ficam fora da conta.
                </p>
              )}
            </div>
          )}
          <p className="mt-7 max-w-xl font-mono text-xs leading-relaxed text-muted-foreground lg:mt-auto lg:pt-7">
            Dados de {baseDate ?? "data em atualização"}.{pendingDate ? ` Uma atualização (dados de ${pendingDate}) está em conferência.` : ""} Fonte: TSE · Candidaturas 2026 · <Link to="/metodo" className="text-plum underline underline-offset-4">ver o método</Link>
          </p>
        </div>

        <div className="flex min-w-0 flex-col justify-center lg:border-l lg:border-rule lg:pl-12">
          <article className="pb-7">
            <p className="font-mono text-xs uppercase text-muted-foreground">Presidência, governos e Senado</p>
            <p className="mt-2 font-display text-5xl font-semibold leading-none text-plum md:text-6xl">{majoritarianShare !== null ? formatPercent(majoritarianShare) : "—"}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink">das candidaturas majoritárias são de mulheres</p>
            <p className="mt-2 font-mono text-xs text-muted-foreground">{majoritarian ? `${formatInt(majoritarian.feminine)} de ${formatInt(majoritarian.total)}` : "em atualização"}</p>
          </article>
          <article className="border-t border-rule pt-7">
            <p className="font-mono text-xs uppercase text-muted-foreground">Território</p>
            <p className="mt-2 font-display text-5xl font-semibold leading-none text-plum md:text-6xl">{territory ? formatPercent(territory.max.share) : "—"}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink">
              {territory
                ? `${UF_NAMES[territory.max.uf] ?? territory.max.uf} tem a maior proporção de candidatas a deputada (${formatPercent(territory.max.share)}) e ${UF_NAMES[territory.min.uf] ?? territory.min.uf}, a menor (${formatPercent(territory.min.share)}). Em todos os estados a proporção fica acima de 30%, o mínimo que a lei exige de cada lista partidária.`
                : "em atualização"}
            </p>
            <p className="mt-2 font-mono text-xs text-muted-foreground">
              {territory
                ? `de ${formatPercent(territory.min.share)} em ${territory.min.uf} (${formatInt(territory.min.feminine)} de ${formatInt(territory.min.total)}) a ${formatPercent(territory.max.share)} em ${territory.max.uf} (${formatInt(territory.max.feminine)} de ${formatInt(territory.max.total)})${territory.runnerUp && territory.max.share - territory.runnerUp.share < 0.1 ? ` e ${formatPercent(territory.runnerUp.share)} em ${territory.runnerUp.uf} (${formatInt(territory.runnerUp.feminine)} de ${formatInt(territory.runnerUp.total)}), praticamente empatados` : ""}`
                : "em atualização"}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

function DadosPage() {
  const { snapshot, pendingReviewBaseDate, historical } = Route.useLoaderData() as {
    snapshot: PublicSnapshot | null;
    pendingReviewBaseDate: string | null;
    historical: HistoricalSeriesPayload | null;
  };
  const baseDate = snapshotDate(snapshot?.baseGeneratedAt ?? null);
  const pendingDate = snapshotDate(pendingReviewBaseDate ?? null);

  return (
    <PageShell home>
      <HomeHeroEditorial snapshot={snapshot} baseDate={baseDate} />
      <CurrentSnapshot snapshot={snapshot} baseDate={baseDate} pendingDate={pendingDate} />
      <section className="border-t border-rule py-12 md:py-16">
        <p className="kicker">Achados</p>
        <h2 className="mt-3 font-display text-3xl leading-tight text-ink md:text-4xl">O que encontramos</h2>
        <div className="mt-8 grid gap-10 md:grid-cols-3">
          {ACHADOS_RECENTES.map((achado) => <AchadoCard key={achado.id} achado={achado} />)}
        </div>
        <p className="mt-8"><Link to="/achados" className="text-sm text-plum underline underline-offset-4">Todos os achados →</Link></p>
      </section>
      <HomeInvestigationGrid snapshot={snapshot} />
      <HomeMapSection snapshot={snapshot} />
      <HomeHistoryHighlight historical={historical} />
      <HomeStages />
      <HomeFunnelFeature />
      <HomeAboutBand />
    </PageShell>
  );
}