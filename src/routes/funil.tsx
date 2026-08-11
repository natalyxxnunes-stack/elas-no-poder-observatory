import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/editorial/PageHero";
import { SectionBlock } from "@/components/editorial/SectionBlock";
import { InBrief } from "@/components/editorial/InBrief";
import { ContextBox } from "@/components/editorial/ContextBox";
import { FunnelLayers } from "@/components/editorial/FunnelLayers";
import { NextAxes } from "@/components/editorial/NextAxes";
import { axis, COVER_QUESTION, FUNNEL_READING_RULE } from "@/data/architecture";
import { CURRENT_INDICATORS } from "@/data/election-2026";
import { applySnapshot } from "@/lib/tse/indicators";
import { getLatestTseSnapshot } from "@/lib/tse/snapshot.functions";
import spotStrength from "@/assets/spot-strength.png";

export const Route = createFileRoute("/funil")({
  head: () => ({
    meta: [
      { title: "O funil — Quem são elas? | Onde elas desaparecem?" },
      {
        name: "description",
        content:
          "Contexto, competição e poder: o funil entre candidatura e poder em 2026, com universo, denominador e fonte próprios em cada etapa.",
      },
      { property: "og:title", content: "O funil — onde elas desaparecem?" },
      {
        property: "og:description",
        content:
          "Cada etapa do caminho entre candidatura e poder tem seu próprio universo. O funil organiza perguntas, não uma subtração.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: async () => ({ snapshot: await getLatestTseSnapshot() }),
  component: FunilPage,
});

function FunilPage() {
  const { snapshot } = Route.useLoaderData();
  const indicators = applySnapshot(CURRENT_INDICATORS, snapshot);
  const a = axis("funil");

  return (
    <PageShell>
      <PageHero
        kicker="O funil"
        question={COVER_QUESTION}
        lead={
          <p>
            O funil é uma metáfora jornalística para organizar a investigação —
            não uma única conta. Ele mostra em que ponto do caminho a presença de
            mulheres muda, sem misturar universos diferentes numa subtração.
          </p>
        }
        image={spotStrength}
      />

      <div className="pb-4">
        <InBrief
          found={
            <>
              Na fotografia atual do registro de candidaturas, a participação de
              mulheres é diferente nos dois universos eleitorais. As etapas
              seguintes — recursos, votos, eleitas e poder — ainda não têm dado
              publicável.
            </>
          }
          matters={
            <>
              O gargalo pode estar em qualquer degrau: entrar na lista, ter
              condições de competir, receber votos, eleger-se e, depois, ocupar
              posição de decisão. Tratar tudo como um número só esconde onde a
              barreira está.
            </>
          }
          unknown={
            <>
              Quanto dinheiro e tempo de propaganda chegam a cada candidatura,
              qual é o desempenho eleitoral e quem ocupa comissões, mesas e
              lideranças. Nada disso é estimado aqui.
            </>
          }
        />
      </div>

      <SectionBlock
        kicker="Regra de leitura"
        question="Por que não somamos as etapas"
        lead={<p>{FUNNEL_READING_RULE}</p>}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <ContextBox variant="significa">
            <p>
              “Universo” é o conjunto de registros que entra na conta. Cada etapa
              do funil tem um universo próprio: candidaturas, prestações de
              contas, votos apurados, cadeiras, cargos de direção.
            </p>
          </ContextBox>
          <ContextBox variant="importa">
            <p>
              Sem essa separação, qualquer queda entre etapas pareceria uma perda
              de mulheres — quando pode ser apenas a troca do conjunto que está
              sendo contado.
            </p>
          </ContextBox>
        </div>
      </SectionBlock>

      <SectionBlock
        kicker="Três camadas"
        question={a.question}
        align="wide"
        lead={
          <p>
            Contexto (população e eleitorado), competição (candidaturas,
            recursos, competitividade, votos e resultado) e poder (eleitas,
            posições institucionais e poder de decisão).
          </p>
        }
        source={
          <>
            Fonte dos dados de candidatura: TSE · Candidaturas 2026 ·{" "}
            <Link to="/metodo" className="text-plum underline underline-offset-4">
              ver o método
            </Link>
          </>
        }
      >
        <FunnelLayers indicators={indicators} />
      </SectionBlock>

      <NextAxes ids={["quem-sao-elas", "dinheiro", "quem-chega"]} />
    </PageShell>
  );
}
