import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CycleStrip } from "@/components/CycleStrip";
import { FunnelExplorer } from "@/components/FunnelExplorer";
import { RepresentationExplorer } from "@/components/RepresentationExplorer";
import { WhoAreTheyExplorer } from "@/components/WhoAreTheyExplorer";
import { REPRESENTATION_CONTRAST, SITE, THESIS } from "@/data/election-2026";
import heroImage from "@/assets/elections-editorial.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Quem são elas? — Mulheres, eleições e poder | Dados 2026" },
      {
        name: "description",
        content:
          "Observatório das candidaturas de mulheres em 2026: 35,2% nas proporcionais contra 16,9% nas majoritárias, e o funil da candidatura ao poder.",
      },
      { property: "og:title", content: "Quem são elas? — Dados 2026" },
      {
        property: "og:description",
        content:
          "Entre se candidatar e chegar ao poder, onde elas desaparecem? Dados de registro, cota de gênero e raça × nível de poder.",
      },
    ],
  }),
  component: DadosPage,
});

function DadosPage() {
  return (
    <div className="paper-grain min-h-screen">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-5 md:px-8">
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
              Um observatório editorial sobre mulheres, eleições e poder. Começa
              nos registros de candidatura e acompanha cada estreitamento até as
              posições que efetivamente decidem.
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

        <section className="grid gap-4 pb-14 sm:grid-cols-3">
          {[
            {
              figure: `${R.proportional.share.toString().replace(".", ",")}%`,
              label: "das candidaturas proporcionais",
              note: `Disputas de lista, onde a cota de ${R.quotaFloor}% incide.`,
            },
            {
              figure: `${R.majoritarian.share.toString().replace(".", ",")}%`,
              label: "das candidaturas majoritárias",
              note: "Cargo único, sem cota de gênero.",
            },
            {
              figure: "33",
              label: "mulheres nas majoritárias",
              note: "Universo pequeno: leia a direção, não a casa decimal.",
            },
          ].map((k) => (
            <div key={k.label} className="editorial-card p-5">
              <p className="data-figure text-4xl text-plum">{k.figure}</p>
              <p className="mt-2 font-display text-base text-ink">{k.label}</p>
              <p className="mt-1 text-sm text-muted-foreground">{k.note}</p>
            </div>
          ))}
        </section>

        <div className="space-y-16 pb-10">
          <CycleStrip activeId="registros" />
          <RepresentationExplorer />
          <FunnelExplorer />
          <WhoAreTheyExplorer />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
