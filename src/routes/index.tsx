import { CapaCards } from "@/components/editorial/Manchetes";
import { CAPA_CARDS } from "@/data/manchetes";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { AchadoCard } from "@/components/editorial/AchadoCard";
import { WhatChanged } from "@/components/home/WhatChanged";
import {
  ChapterKicker,
  HomeAboutBand,
  HomeFunnelFeature,
  HomeHistoryHighlight,
  HomeHeroEditorial,
  HomeInvestigationGrid,
  HomeMapSection,
} from "@/components/home/HomeEditorial";
import { formatPercent } from "@/data/election-2026";
import { ACHADOS } from "@/data/achados";

// O achado da queda de candidaturas já é a manchete do capítulo 05; fora da lista para não repetir.
const HOME_ACHADOS = [...ACHADOS].reverse().filter((a) => !["menos-candidatas-que-2022", "senado-pl-um-terco"].includes(a.id)).slice(0, 3);
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
      { title: "Quem são elas? · Mulheres, eleições e poder | Dados 2026" },
      {
        name: "description",
        content:
          "Observatório de dados sobre mulheres, eleições e poder em 2026: candidaturas proporcionais e majoritárias, gênero e raça, o funil até o poder e o método aberto.",
      },
      { property: "og:title", content: "Quem são elas? · Dados 2026" },
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
      <CapaCards items={CAPA_CARDS} baseLabel="Resultado da eleição · base do TSE de 27/10/2026" />
      <HomeFunnelFeature snapshot={snapshot} />
      <section className="relative left-1/2 -ml-[50vw] w-screen bg-lilac">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <ChapterKicker n="02" label="Achados" />
          <h2 className="mt-5 font-display text-3xl leading-tight text-ink md:text-4xl">O que encontramos</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {HOME_ACHADOS.map((achado) => <AchadoCard key={achado.id} achado={achado} />)}
          </div>
          <p className="mt-10"><Link to="/achados" className="font-mono text-xs font-semibold uppercase text-plum underline underline-offset-4">Todos os achados →</Link></p>
        </div>
      </section>
      <HomeHistoryHighlight historical={historical} />
      <HomeInvestigationGrid snapshot={snapshot} />
      <HomeAboutBand />
    </PageShell>
  );
}