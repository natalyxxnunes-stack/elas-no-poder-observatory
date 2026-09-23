import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
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

function topUf(snapshot: PublicSnapshot | null) {
  const dimensions = snapshot?.universes.proporcional.dimensions;
  const feminine = dimensions?.feminineByUf;
  const total = dimensions?.totalByUf;
  if (!feminine || !total) return null;

  let best: { uf: string; share: number; feminine: number; total: number } | null = null;
  for (const [uf, denominator] of Object.entries(total)) {
    if (!denominator || denominator <= 0) continue;
    const numerator = feminine[uf] ?? 0;
    const share = (numerator / denominator) * 100;
    if (!best || share > best.share) best = { uf, share, feminine: numerator, total: denominator };
  }
  return best;
}

function CurrentSnapshot({ snapshot, baseDate, pendingDate }: {
  snapshot: PublicSnapshot | null;
  baseDate: string | null;
  pendingDate: string | null;
}) {
  const majoritarian = snapshot?.universes.majoritario ?? null;
  const highestUf = topUf(snapshot);
  const majoritarianShare = majoritarian && majoritarian.total > 0
    ? (majoritarian.feminine / majoritarian.total) * 100
    : null;

  return (
    <section className="border-t border-rule py-16 md:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="font-mono text-[11px] uppercase text-muted-foreground">2026 · fotografia em andamento</p>
          <h2 className="mt-4 font-display text-4xl leading-none text-ink md:text-5xl">O que os registros permitem dizer agora</h2>
          <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
            Tudo nesta parte da página é quem pediu registro para disputar 2026 — quem entrou na disputa. Não há resultado eleitoral aqui: o 1º turno é em 4 de outubro de 2026 e o eventual 2º turno em 25 de outubro de 2026.
          </p>
          {snapshot && (
            <p className="mt-8 border-l-4 border-solar pl-4 font-display text-2xl leading-tight text-ink">
              {formatInt(snapshot.recordCount)} pedidos de registro nesta fotografia.
            </p>
          )}
        </div>

        <div className="grid border-y border-ink sm:grid-cols-2">
          <article className="border-b border-rule py-7 sm:border-b-0 sm:border-r sm:px-6">
            <p className="font-mono text-[10px] uppercase text-muted-foreground">Comando majoritário</p>
            <p className="mt-3 font-display text-5xl font-semibold text-coral-ink">{majoritarianShare !== null ? formatPercent(majoritarianShare) : "—"}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink">das candidaturas majoritárias, de cargo único, são de mulheres</p>
            <p className="mt-2 font-mono text-[10px] text-muted-foreground">{majoritarian ? `${formatInt(majoritarian.feminine)} de ${formatInt(majoritarian.total)}` : "em atualização"}</p>
          </article>
          <article className="py-7 sm:px-6">
            <p className="font-mono text-[10px] uppercase text-muted-foreground">Território</p>
            <p className="mt-3 font-display text-5xl font-semibold text-forest">{highestUf ? formatPercent(highestUf.share) : "—"}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink">maior proporção entre as UFs: {highestUf?.uf ?? "em atualização"}</p>
            <p className="mt-2 font-mono text-[10px] text-muted-foreground">{highestUf ? `${formatInt(highestUf.feminine)} de ${formatInt(highestUf.total)}` : "em atualização"}</p>
          </article>
        </div>
      </div>

      <p className="mt-6 font-mono text-[11px] leading-relaxed text-muted-foreground">
        Dados de {baseDate ?? "data em atualização"}.{pendingDate ? ` Uma atualização (dados de ${pendingDate}) está em conferência.` : ""} Fonte: TSE · Candidaturas 2026 · <Link to="/metodo" className="text-plum underline underline-offset-4">ver o método</Link>
      </p>
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
      <HomeInvestigationGrid />
      <HomeMapSection snapshot={snapshot} />
      <HomeHistoryHighlight historical={historical} />
      <HomeStages />
      <HomeFunnelFeature />
      <HomeAboutBand />
    </PageShell>
  );
}