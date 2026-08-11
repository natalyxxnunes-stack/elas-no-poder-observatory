import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CycleStrip } from "@/components/CycleStrip";
import { GapNote } from "@/components/GapNote";
import {
  FUNNEL_STEPS,
  METHOD_NOTES,
  RACE_BY_POWER_LEVEL,
} from "@/data/election-2026";

export const Route = createFileRoute("/metodo")({
  head: () => ({
    meta: [
      { title: "Método — Quem são elas? | Fontes, limites e lacunas" },
      {
        name: "description",
        content:
          "Como o observatório lê os dados de 2026: unidade de análise, autodeclaração de sexo e raça, universos pequenos e as etapas que seguem em aberto.",
      },
      { property: "og:title", content: "Método — Quem são elas?" },
      {
        property: "og:description",
        content:
          "Fontes, limites e lacunas declaradas do observatório sobre mulheres, eleições e poder.",
      },
    ],
  }),
  component: MetodoPage,
});

function MetodoPage() {
  const openSteps = FUNNEL_STEPS.filter((s) => !s.share.recovered);
  const openRace = RACE_BY_POWER_LEVEL.filter((r) => !r.breakdown.recovered);

  return (
    <div className="paper-grain min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 md:px-8">
        <header className="py-14">
          <p className="kicker">Método</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.08] text-ink md:text-5xl">
            O que sustenta cada número — e o que ainda não existe
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
            Este observatório prefere a lacuna explícita à estimativa
            conveniente. Onde não há fonte, o espaço fica vazio e sinalizado.
          </p>
        </header>

        <section aria-label="Notas metodológicas" className="space-y-4 pb-14">
          {METHOD_NOTES.map((n, i) => (
            <article key={n.title} className="editorial-card p-5 md:p-6">
              <span className="font-mono text-[11px] text-muted-foreground">
                0{i + 1}
              </span>
              <h2 className="mt-1 font-display text-xl text-ink">{n.title}</h2>
              <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">
                {n.body}
              </p>
            </article>
          ))}
        </section>

        <section className="rule-top pt-8">
          <h2 className="kicker">Inventário de lacunas</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Lista gerada diretamente do módulo de dados: toda célula sem fonte
            recuperada aparece aqui automaticamente.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[540px] border-collapse text-left">
              <thead>
                <tr className="border-b border-rule">
                  <th className="py-3 pr-4 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    Item
                  </th>
                  <th className="py-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    Falta
                  </th>
                </tr>
              </thead>
              <tbody>
                {openSteps.map((s) => (
                  <tr key={s.id} className="border-b border-rule align-top">
                    <td className="py-3 pr-4 font-display text-base text-ink">
                      {s.label}
                    </td>
                    <td className="py-3 text-sm text-muted-foreground">
                      {s.share.source}
                    </td>
                  </tr>
                ))}
                {openRace.map((r) => (
                  <tr key={r.level} className="border-b border-rule align-top">
                    <td className="py-3 pr-4 font-display text-base text-ink">
                      Raça × {r.level}
                    </td>
                    <td className="py-3 text-sm text-muted-foreground">
                      {r.breakdown.source}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rule-top mt-16 pt-8">
          <h2 className="kicker">Sobre esta reconstrução</h2>
          <div className="mt-5 space-y-3">
            <GapNote label="Fonte visual">
              A página publicada /direitos, indicada como referência visual
              primária, responde com uma tela de autenticação ("Continue with
              ChatGPT"). Layout, tipografia e cores foram reconstruídos a partir
              da logo original e da linguagem editorial dos artefatos
              recuperados, não do HTML publicado.
            </GapNote>
            <GapNote label="Conteúdo">
              Textos corridos das rotas Condições, Em disputa e Método não
              constavam nos artefatos recuperados. A estrutura editorial foi
              preservada e cada ausência está marcada no código em
              src/data/election-2026.ts.
            </GapNote>
          </div>
        </section>

        <div className="mt-16 pb-10">
          <CycleStrip activeId="poder-decisoes" />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
