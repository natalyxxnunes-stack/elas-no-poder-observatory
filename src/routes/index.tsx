import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhoAreTheyExplorer } from "@/components/WhoAreTheyExplorer";
import {
  CURRENT_INDICATORS,
  SITE,
  THESIS,
  formatPercent,
  formatPoints,
  type Indicator,
} from "@/data/election-2026";
import { applySnapshot } from "@/lib/tse/indicators";
import { getLatestTseSnapshot } from "@/lib/tse/snapshot.functions";
import heroImage from "@/assets/elections-editorial.png";
import spotQuota from "@/assets/spot-quota.png";
import spotStrength from "@/assets/spot-strength.png";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Quem são elas? — Mulheres, eleições e poder | Dados 2026" },
      {
        name: "description",
        content:
          "Observatório de dados sobre mulheres, eleições e poder em 2026: candidaturas proporcionais e majoritárias, o funil até o poder e quais mulheres chegam, sempre com fonte e método abertos.",
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
  loader: async () => ({ snapshot: await getLatestTseSnapshot() }),
  component: DadosPage,

});

/** Formata uma data ISO como fotografia legível (dd/mm/aaaa). */
function snapshotDate(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

/** Descrição em linguagem comum de cada indicador exibido na home. */
const PLAIN_MEANING: Record<string, string> = {
  "participacao-feminina-proporcional":
    "Mulheres entre as candidaturas proporcionais",
  "participacao-feminina-majoritario":
    "Mulheres entre as candidaturas majoritárias",
  "diferenca-universos":
    "Distância entre os dois universos, em pontos percentuais",
};

function IndicatorCard({ indicator }: { indicator: Indicator }) {
  const isPoints = indicator.unit === "p.p.";
  const hasValue =
    indicator.value !== null && (isPoints || indicator.denominator !== null);
  const date = snapshotDate(indicator.baseGeneratedAt);

  return (
    <article className="editorial-card p-6">
      {hasValue ? (
        <>
          <p className="data-figure text-5xl text-plum">
            {isPoints
              ? formatPoints(indicator.value)
              : formatPercent(indicator.value)}
          </p>
          <p className="mt-3 font-display text-lg leading-snug text-ink">
            {PLAIN_MEANING[indicator.id] ?? indicator.label}
          </p>
          {indicator.numerator !== null && indicator.denominator !== null && (
            <p className="mt-2 font-mono text-[11px] text-muted-foreground">
              {indicator.numerator.toLocaleString("pt-BR")} de{" "}
              {indicator.denominator.toLocaleString("pt-BR")}
            </p>
          )}
          {date && (
            <p className="mt-1 font-mono text-[11px] text-muted-foreground">
              TSE · fotografia de {date}
            </p>
          )}
        </>
      ) : (
        <>
          <p className="font-display text-2xl leading-snug text-plum">
            Em atualização
          </p>
          <p className="mt-3 font-display text-lg leading-snug text-ink">
            {PLAIN_MEANING[indicator.id] ?? indicator.label}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Aguardando a nova fotografia da base do TSE.
          </p>
        </>
      )}
    </article>
  );
}

const FUNNEL_LABELS = [
  "Candidaturas",
  "Recursos",
  "Votos",
  "Eleitas",
  "Poder",
] as const;

function DadosPage() {
  const { snapshot } = Route.useLoaderData();
  const indicators = applySnapshot(CURRENT_INDICATORS, snapshot);
  return (

    <div className="paper-grain min-h-screen">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-5 md:px-8">
        {/* HERO */}
        <section className="grid gap-10 py-14 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:py-20">
          <div>
            <p className="kicker">{SITE.cycle}</p>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] text-ink md:text-6xl">
              Quem são elas?
            </h1>
            <p className="mt-4 max-w-xl font-display text-2xl leading-snug text-plum md:text-3xl">
              {THESIS}
            </p>
            <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
              Um observatório de dados sobre mulheres, eleições e poder.
              Acompanhamos o caminho entre a candidatura e os espaços onde as
              decisões são tomadas.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/em-disputa"
                className="rounded-md bg-plum px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-plum-soft"
              >
                Ver o funil
              </Link>
              <Link
                to="/metodo"
                className="rounded-md border border-plum px-5 py-2.5 text-sm font-semibold text-plum transition-colors hover:bg-secondary"
              >
                Como lemos os dados
              </Link>
            </div>
          </div>

          <figure className="editorial-card overflow-hidden">
            <img
              src={heroImage}
              alt="Ilustração editorial: fila de mulheres diante de uma urna eleitoral"
              width={1280}
              height={800}
              className="w-full"
            />
            <figcaption className="border-t border-rule px-4 py-3 font-mono text-[11px] text-muted-foreground">
              elections-editorial · ilustração do projeto
            </figcaption>
          </figure>
        </section>

        {/* A FOTOGRAFIA DE AGORA */}
        <section aria-labelledby="foto-title" className="rule-top py-14">
          <h2 className="kicker">A fotografia de agora</h2>
          <p
            id="foto-title"
            className="mt-3 max-w-2xl font-display text-2xl leading-snug text-ink md:text-3xl"
          >
            As candidaturas de 2026 ainda estão sendo registradas e atualizadas
            pelo TSE. Por isso, esta fotografia muda diariamente.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {indicators.map((indicator) => (
              <IndicatorCard key={indicator.id} indicator={indicator} />
            ))}
          </div>
          <p className="mt-6 font-mono text-[11px] text-muted-foreground">
            Fonte: TSE · Candidaturas 2026 ·{" "}
            <Link to="/metodo" className="text-plum underline underline-offset-4">
              ver o método
            </Link>
          </p>
        </section>

        {/* DOIS UNIVERSOS */}
        <section aria-labelledby="universos-title" className="rule-top py-14">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="kicker">Dois universos</h2>
              <h3
                id="universos-title"
                className="mt-3 font-display text-2xl leading-snug text-ink md:text-3xl"
              >
                Duas formas de disputar uma eleição
              </h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                As regras não são iguais nos dois universos. Nas eleições
                proporcionais existe uma regra de composição de candidaturas por
                gênero. Nas majoritárias, essa regra não se aplica.
              </p>
            </div>
            <img
              src={spotQuota}
              alt=""
              aria-hidden
              loading="lazy"
              width={640}
              height={640}
              className="h-24 w-24 shrink-0 md:h-32 md:w-32"
            />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <article className="editorial-card p-6">
              <h4 className="font-display text-xl text-ink">Proporcional</h4>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                Deputadas federais, estaduais e distritais.
              </p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-plum">
                com regra de composição 30%–70% por gênero
              </p>
            </article>
            <article className="editorial-card p-6">
              <h4 className="font-display text-xl text-ink">Majoritária</h4>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                Presidente, governadoras e senadoras.
              </p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-coral">
                sem a regra de composição 30%–70% por gênero
              </p>
            </article>
          </div>

          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Os dois universos têm denominadores próprios e regras eleitorais
            diferentes. A comparação entre eles é descritiva: é um ponto de
            partida para investigação, não uma prova de causa.
          </p>
        </section>

        {/* O FUNIL */}
        <section aria-labelledby="funil-title" className="rule-top py-14">
          <h2 className="kicker">O funil</h2>
          <h3
            id="funil-title"
            className="mt-3 max-w-2xl font-display text-2xl leading-snug text-ink md:text-3xl"
          >
            Entre entrar na disputa e chegar ao poder, há um funil.
          </h3>

          <ol className="mt-8 flex flex-col gap-3 md:flex-row md:items-stretch">
            {FUNNEL_LABELS.map((label, i) => (
              <li
                key={label}
                className="editorial-card flex flex-1 items-center gap-3 p-4"
                style={{ opacity: 1 - i * 0.1 }}
              >
                <span className="font-mono text-[11px] text-muted-foreground">
                  0{i + 1}
                </span>
                <span className="font-display text-lg text-ink">{label}</span>
              </li>
            ))}
          </ol>

          <p className="mt-6 max-w-3xl leading-relaxed text-muted-foreground">
            Em cada etapa, o universo muda. O Quem são elas? acompanha onde a
            presença das mulheres diminui — e quem consegue atravessar cada
            barreira.
          </p>

          <Link
            to="/em-disputa"
            className="mt-6 inline-flex rounded-md bg-plum px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-plum-soft"
          >
            Explorar o funil →
          </Link>
        </section>

        {/* QUEM CHEGA? */}
        <section aria-labelledby="quem-chega-title" className="rule-top py-14">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="kicker">Quem chega?</h2>
              <h3
                id="quem-chega-title"
                className="mt-3 font-display text-2xl leading-snug text-ink md:text-3xl"
              >
                Não existe uma única experiência de ser mulher na política.
              </h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Raça, território, deficiência e partido também atravessam o
                caminho até o poder. Por isso, não basta perguntar quantas
                mulheres estão na disputa. Precisamos perguntar quais mulheres
                chegam — e onde.
              </p>
            </div>
            <img
              src={spotStrength}
              alt=""
              aria-hidden
              loading="lazy"
              width={640}
              height={640}
              className="h-24 w-24 shrink-0 md:h-32 md:w-32"
            />
          </div>

          <div className="mt-10">
            <WhoAreTheyExplorer />
          </div>
        </section>

        {/* COMO SABEMOS? */}
        <section aria-labelledby="metodo-title" className="rule-top py-14">
          <h2 className="kicker">Como sabemos?</h2>
          <h3
            id="metodo-title"
            className="mt-3 max-w-2xl font-display text-2xl leading-snug text-ink md:text-3xl"
          >
            Dados para perguntar. Método para conferir.
          </h3>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
            Os indicadores são calculados a partir de bases oficiais e
            identificados por fonte, data, universo e metodologia. Quando um dado
            ainda não existe ou não pode ser calculado com segurança, dizemos
            isso.
          </p>
          <Link
            to="/metodo"
            className="mt-6 inline-flex rounded-md border border-plum px-5 py-2.5 text-sm font-semibold text-plum transition-colors hover:bg-secondary"
          >
            Conheça o método →
          </Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
