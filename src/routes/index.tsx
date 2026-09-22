import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { ContextBox } from "@/components/editorial/ContextBox";
import { GlossaryTerm } from "@/components/editorial/GlossaryTerm";
import { RaceBreakdown } from "@/components/editorial/RaceBreakdown";
import { RaceFinding2026 } from "@/components/editorial/RaceFinding2026";
import { UfGrid } from "@/components/editorial/UfGrid";
import { ElectionRateByGender } from "@/components/historical/ElectionRateByGender";
import { HistoryFunnel } from "@/components/historical/HistoryFunnel";
import {
  HomeAboutBand,
  HomeFunnelFeature,
  HomeHeroEditorial,
  HomeInvestigationGrid,
  HomeStages,
} from "@/components/home/HomeEditorial";
import { CENTRAL_PRINCIPLE } from "@/data/architecture";
import { formatPercent } from "@/data/election-2026";
import { formatInt } from "@/lib/format-br";
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
    const [snapshot, pendingReviewBaseDate] = await Promise.all([
      getLatestTseSnapshot(),
      getPendingReviewBaseDate(),
    ]);
    return { snapshot, pendingReviewBaseDate };
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
  const proportional = snapshot?.universes.proporcional ?? null;
  const majoritarian = snapshot?.universes.majoritario ?? null;
  const highestUf = topUf(snapshot);
  const proportionalShare = proportional && proportional.total > 0
    ? (proportional.feminine / proportional.total) * 100
    : null;
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
            Tudo nesta parte da página é quem pediu registro para disputar 2026 — quem entrou na disputa. Não há resultado eleitoral aqui: a eleição acontece em novembro de 2026.
          </p>
          {snapshot && (
            <p className="mt-8 border-l-4 border-solar pl-4 font-display text-2xl leading-tight text-ink">
              {formatInt(snapshot.recordCount)} pedidos de registro nesta fotografia.
            </p>
          )}
        </div>

        <div className="grid border-y border-ink sm:grid-cols-3">
          <article className="border-b border-rule py-7 sm:border-b-0 sm:border-r sm:px-6">
            <p className="font-mono text-[10px] uppercase text-muted-foreground">Entrada proporcional</p>
            <p className="mt-3 font-display text-5xl font-semibold text-plum">{proportionalShare !== null ? formatPercent(proportionalShare) : "—"}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink">das candidaturas proporcionais são de mulheres</p>
            <p className="mt-2 font-mono text-[10px] text-muted-foreground">{proportional ? `${formatInt(proportional.feminine)} de ${formatInt(proportional.total)}` : "em atualização"}</p>
          </article>
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

      <UfGrid snapshot={snapshot} baseDate={baseDate} />
      <p className="mt-6 font-mono text-[11px] leading-relaxed text-muted-foreground">
        Dados de {baseDate ?? "data em atualização"}.{pendingDate ? ` Uma atualização (dados de ${pendingDate}) está em conferência.` : ""} Fonte: TSE · Candidaturas 2026 · <Link to="/metodo" className="text-plum underline underline-offset-4">ver o método</Link>
      </p>
    </section>
  );
}

function HistoricalEvidence({ snapshot }: { snapshot: PublicSnapshot | null }) {
  const proportional = snapshot?.universes.proporcional ?? null;
  return (
    <section className="border-t border-rule py-16 md:py-24">
      <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <p className="font-mono text-[11px] uppercase text-muted-foreground">Eleições encerradas · 2014 · 2018 · 2022</p>
          <h2 className="mt-4 font-display text-4xl leading-none text-ink">O que aconteceu depois da candidatura</h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">Em 2022, mulheres foram 34,1% das candidaturas proporcionais e 17,7% das eleitas no 1º turno. {proportional ? `Em 2026, são ${formatPercent((proportional.feminine / proportional.total) * 100)} das candidaturas proporcionais` : "Em 2026, o percentual está em atualização"} — a comparação possível é de entrada com entrada.</p>
        </div>
        <HistoryFunnel />
      </div>
      <div className="mt-14 border-t border-rule pt-10">
        <h3 className="max-w-3xl font-display text-3xl leading-tight text-ink">De cada 100 candidaturas, quantas chegaram à cadeira?</h3>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">Cada taxa é calculada dentro do próprio grupo. É uma descrição do que a base registra — não prova o que produziu a diferença.</p>
        <div className="mt-7"><ElectionRateByGender /></div>
      </div>
    </section>
  );
}

function RaceAndRules({ snapshot, baseDate }: { snapshot: PublicSnapshot | null; baseDate: string | null }) {
  return (
    <>
      <section className="border-t border-rule py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="font-mono text-[11px] uppercase text-muted-foreground">A segunda pergunta</p>
            <h2 className="mt-4 font-display text-5xl leading-none text-ink">Quais mulheres?</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">Até aqui a pergunta foi “quantas mulheres”. Ela é insuficiente: mulheres não formam um bloco homogêneo, e o caminho até o poder não é o mesmo para todas.</p>
          </div>
          <RaceFinding2026 snapshot={snapshot} />
        </div>
        <div className="mt-14 border-t border-rule pt-10">
          <h3 className="font-display text-3xl text-ink">Não existe uma candidata média.</h3>
          <p className="mt-3 max-w-2xl text-muted-foreground">{CENTRAL_PRINCIPLE}</p>
          <div className="mt-8"><RaceBreakdown snapshot={snapshot} /></div>
          <p className="mt-5 font-mono text-[10px] text-muted-foreground">Fonte: TSE · Candidaturas 2026{baseDate ? ` · fotografia da base de ${baseDate}` : ""}</p>
        </div>
      </section>

      <section className="relative left-1/2 -ml-[50vw] w-screen bg-plum text-cream">
        <div className="mx-auto grid max-w-6xl gap-9 px-5 py-14 md:grid-cols-2 md:px-8">
          <div>
            <p className="font-mono text-[10px] uppercase text-cream/70">Dois universos</p>
            <h2 className="mt-3 font-display text-4xl leading-none text-cream">A regra muda conforme o cargo.</h2>
            <p className="mt-4 leading-relaxed text-cream/80">Nas eleições proporcionais existe uma regra de composição de candidaturas por gênero, aplicada por partido ou <GlossaryTerm term="federacao">federação</GlossaryTerm>. Nas majoritárias, essa regra não se aplica.</p>
          </div>
          <ContextBox variant="significa" title="A cota de 30% (Lei 9.504/1997)">
            <p>A lei obriga cada partido ou federação a preencher no mínimo 30% das candidaturas proporcionais com cada gênero — daí a faixa de 30%–70%. É <GlossaryTerm term="cota">cota</GlossaryTerm> de candidatura, não de cadeira: trata de quem entra na disputa, não de quem é eleita.</p>
          </ContextBox>
        </div>
      </section>
    </>
  );
}

function DadosPage() {
  const { snapshot, pendingReviewBaseDate } = Route.useLoaderData();
  const baseDate = snapshotDate(snapshot?.baseGeneratedAt ?? null);
  const pendingDate = snapshotDate(pendingReviewBaseDate ?? null);

  return (
    <PageShell home>
      <HomeHeroEditorial snapshot={snapshot} baseDate={baseDate} />
      <HomeStages />
      <HomeFunnelFeature />
      <HomeInvestigationGrid />
      <CurrentSnapshot snapshot={snapshot} baseDate={baseDate} pendingDate={pendingDate} />
      <HistoricalEvidence snapshot={snapshot} />
      <RaceAndRules snapshot={snapshot} baseDate={baseDate} />
      <HomeAboutBand />
    </PageShell>
  );
}