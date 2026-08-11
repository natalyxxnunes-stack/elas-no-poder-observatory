import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CycleStrip } from "@/components/CycleStrip";
import { FunnelExplorer } from "@/components/FunnelExplorer";
import { RepresentationExplorer } from "@/components/RepresentationExplorer";
import { WhoAreTheyExplorer } from "@/components/WhoAreTheyExplorer";
import {
  CURRENT_INDICATORS,
  SITE,
  THESIS,
  TSE_SOURCE,
  formatPercent,
  formatPoints,
  formatRatio,
} from "@/data/election-2026";
import heroImage from "@/assets/elections-editorial.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Quem são elas? — Mulheres, eleições e poder | Dados 2026" },
      {
        name: "description",
        content:
          "Observatório das candidaturas de mulheres em 2026: participação feminina nos universos proporcional e majoritário, calculada a partir da base oficial do TSE, com denominadores e metadados auditáveis.",
      },
      { property: "og:title", content: "Quem são elas? — Dados 2026" },
      {
        property: "og:description",
        content:
          "Entre se candidatar e chegar ao poder, onde elas desaparecem? Indicadores de registro, regra de composição de candidaturas e cor/raça × nível de poder.",
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

        {CURRENT_INDICATORS.some(
          (k) => k.value !== null && k.denominator !== null,
        ) ? (
          <section
            aria-label="Indicadores atuais"
            className="grid gap-4 pb-6 sm:grid-cols-3"
          >
            {CURRENT_INDICATORS.map((k) => (
              <div key={k.id} className="editorial-card p-5">
                <p className="data-figure text-4xl text-plum">
                  {k.unit === "p.p."
                    ? formatPoints(k.value)
                    : k.value !== null && k.denominator !== null
                      ? formatPercent(k.value)
                      : "—"}
                </p>
                <p className="mt-2 font-display text-base text-ink">{k.label}</p>
                <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                  {formatRatio(k) ?? ""}
                </p>
              </div>
            ))}
          </section>
        ) : (
          <section aria-label="Indicadores atuais" className="pb-6">
            <div className="editorial-card p-6">
              <p className="kicker">Dados em atualização</p>
              <p className="mt-3 max-w-2xl font-display text-xl leading-snug text-ink">
                Os indicadores de candidaturas estão sendo atualizados a partir
                da base oficial do TSE.
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Enquanto a atualização não é concluída, o site não exibe
                percentuais — nenhum número aparece aqui sem denominador e sem
                origem verificável.
              </p>
            </div>
          </section>
        )}

        <section className="pb-14">
          <p className="font-mono text-[11px] leading-relaxed text-muted-foreground">
            Fonte: TSE · Candidaturas 2026 ·{" "}
            <Link to="/metodo" className="text-plum underline underline-offset-4">
              ver o método
            </Link>
          </p>
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
