import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CycleStrip } from "@/components/CycleStrip";
import { FunnelExplorer } from "@/components/FunnelExplorer";
import { RepresentationExplorer } from "@/components/RepresentationExplorer";
import { WhoAreTheyExplorer } from "@/components/WhoAreTheyExplorer";
import { GapNote } from "@/components/GapNote";

export const Route = createFileRoute("/em-disputa")({
  head: () => ({
    meta: [
      { title: "Em disputa — Quem são elas? | O funil candidatura → poder" },
      {
        name: "description",
        content:
          "O funil da candidatura ao poder em 2026: registros, recursos, votos e eleitas, poder e decisões — com as etapas ainda abertas marcadas como tal.",
      },
      { property: "og:title", content: "Em disputa — o funil candidatura → poder" },
      {
        property: "og:description",
        content:
          "Registros → recursos → votos e eleitas → poder e decisões. Onde elas desaparecem entre uma etapa e a seguinte.",
      },
    ],
  }),
  component: EmDisputaPage,
});

function EmDisputaPage() {
  return (
    <div className="paper-grain min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 md:px-8">
        <header className="py-14">
          <p className="kicker">Em disputa</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.08] text-ink md:text-5xl">
            Da candidatura ao poder, degrau por degrau
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
            Cada etapa do ciclo eleitoral filtra. O funil abaixo mostra a
            participação feminina em cada degrau — e deixa visivelmente vazios os
            degraus que só podem ser preenchidos depois da apuração e da posse.
          </p>
        </header>

        <div className="space-y-16 pb-10">
          <FunnelExplorer />
          <RepresentationExplorer />
          <WhoAreTheyExplorer />

          <section className="rule-top pt-8">
            <h2 className="kicker">Etapas posteriores</h2>
            <h3 className="mt-3 font-display text-2xl text-ink">
              Votos → eleitas → poder
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              A sequência final do observatório entra em três momentos distintos:
              votação nominal apurada, cadeiras efetivamente conquistadas e, por
              último, a distribuição de comandos — mesas, comissões, lideranças e
              secretarias.
            </p>
            <div className="mt-5 space-y-3">
              <GapNote label="Etapa em aberto">
                Votos e eleitas: dependem da apuração da eleição de 2026. Nenhum
                valor projetado é exibido aqui.
              </GapNote>
              <GapNote label="Etapa em aberto">
                Poder e decisões: levantamento próprio a ser feito após a
                diplomação e a formação das mesas diretoras.
              </GapNote>
            </div>
          </section>

          <CycleStrip activeId="votos-eleitas" />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
