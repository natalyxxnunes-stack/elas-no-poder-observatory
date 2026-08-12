import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/editorial/PageHero";
import { SectionBlock } from "@/components/editorial/SectionBlock";
import { InBrief } from "@/components/editorial/InBrief";
import { ContextBox } from "@/components/editorial/ContextBox";
import { NextAxes } from "@/components/editorial/NextAxes";
import { GapNote } from "@/components/GapNote";
import { FunnelStages2026 } from "@/components/funnel/FunnelStages2026";
import { PastStrip } from "@/components/funnel/PastStrip";
import { FUNNEL_READING_RULE } from "@/data/architecture";
import { getLatestTseSnapshot } from "@/lib/tse/snapshot.functions";
import { getHistoricalSeries } from "@/lib/tse/historical.functions";
import type { Series } from "@/lib/tse/historical-compute";
import spotStrength from "@/assets/spot-strength.png";

export const Route = createFileRoute("/funil")({
  head: () => ({
    meta: [
      { title: "Onde elas ficam pelo caminho? — Quem são elas?" },
      {
        name: "description",
        content:
          "O funil de 2026: quantas mulheres nas candidaturas proporcionais e majoritárias, quem são elas por cor/raça e por que o resultado eleitoral ainda não existe.",
      },
      { property: "og:title", content: "Onde elas ficam pelo caminho?" },
      {
        property: "og:description",
        content:
          "Etapa por etapa, com denominador explícito: a presença de mulheres na disputa de 2026, segundo o registro de candidaturas do TSE.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: async () => {
    const [snapshot, historical] = await Promise.all([
      getLatestTseSnapshot(),
      getHistoricalSeries(),
    ]);
    return { snapshot, historical };
  },
  errorComponent: () => (
    <PageShell>
      <div className="py-24">
        <GapNote label="Dados em atualização">
          Não foi possível ler a fotografia do registro de candidaturas agora.
          Nenhum número é exibido no lugar dela.
        </GapNote>
      </div>
    </PageShell>
  ),
  notFoundComponent: () => (
    <PageShell>
      <div className="py-24">
        <p className="text-muted-foreground">Página não encontrada.</p>
      </div>
    </PageShell>
  ),
  component: FunilPage,
});

function FunilPage() {
  const { snapshot, historical } = Route.useLoaderData();
  const feminineSeries =
    (historical.series as Series[]).find(
      (s) => s.id === "serie-mulheres-candidaturas",
    ) ??
    null;

  const stamp = snapshot?.baseGeneratedAt ?? snapshot?.collectedAt ?? null;
  const stampLabel = stamp
    ? new Date(stamp).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <PageShell>
      <PageHero
        kicker="O funil de 2026"
        question="Onde elas ficam pelo caminho?"
        lead={
          <p>
            O funil acompanha a presença das mulheres na disputa de 2026, etapa
            por etapa, e mostra onde essa presença diminui. Cada etapa tem
            denominador próprio: nada é subtraído de uma para a outra.
          </p>
        }
        image={spotStrength}
        imageAlt="Ilustração editorial de mulheres em movimento"
      />

      <div className="pb-4">
        <InBrief
          found={
            <>
              Nas candidaturas proporcionais de 2026, a participação de mulheres
              é bem maior do que nas majoritárias — os dois universos seguem
              regras diferentes e são contados separadamente.
            </>
          }
          matters={
            <>
              O cargo em disputa muda o tamanho da porta. Entrar numa lista
              proporcional é diferente de ser a única candidata de um partido ou
              federação a um governo, ao Senado ou à Presidência.
            </>
          }
          unknown={
            <>
              Quem se elege em 2026: a eleição não ocorreu e não há resultado. E
              a distribuição por cor/raça do total de candidaturas, que a
              fotografia atual não grava.
            </>
          }
        />
      </div>

      <SectionBlock
        kicker="Etapa por etapa"
        question="Quantas são, em cada porta de entrada"
        align="wide"
        lead={
          <p>
            Comece pelo número que organiza a página: a participação de mulheres
            nas candidaturas proporcionais. Depois compare com as majoritárias,
            que têm outro denominador, e veja quem são essas mulheres por
            cor/raça declarada.
          </p>
        }
        source={
          <>
            Fonte: TSE · Candidaturas 2026
            {stampLabel ? ` · base gerada em ${stampLabel}` : ""} ·{" "}
            <Link to="/metodo" className="text-plum underline underline-offset-4">
              ver o método
            </Link>{" "}
            ·{" "}
            <Link
              to="/condicoes"
              className="text-plum underline underline-offset-4"
            >
              as condições da disputa
            </Link>
          </>
        }
      >
        <FunnelStages2026 snapshot={snapshot} />
      </SectionBlock>

      <SectionBlock
        kicker="Regra de leitura"
        question="Por que as etapas não se somam nem se subtraem"
        lead={<p>{FUNNEL_READING_RULE}</p>}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <ContextBox variant="significa">
            <p>
              “Universo” é o conjunto de registros que entra na conta.
              Proporcional e majoritário são universos distintos: um elege por
              lista e quociente, o outro elege quem tem mais votos para um cargo
              único. Percentuais de universos diferentes não se somam.
            </p>
          </ContextBox>
          <ContextBox variant="importa">
            <p>
              A unidade contada é a candidatura registrada, deduplicada pelo
              identificador oficial de cada candidatura. Vices e suplentes não
              entram em nenhum dos dois denominadores.
            </p>
          </ContextBox>
        </div>
      </SectionBlock>

      <SectionBlock
        kicker="Contexto"
        question="Como isso se compara ao passado?"
        lead={
          <p>
            Referência curta, com os percentuais já auditados das eleições
            gerais anteriores. Nenhum número novo é calculado aqui, e a
            comparação é descritiva.
          </p>
        }
        source={
          <>
            Fonte: TSE · Candidatos 2014, 2018, 2022 e 2026 ·{" "}
            <Link
              to="/historico"
              className="text-plum underline underline-offset-4"
            >
              ver a série histórica completa
            </Link>
          </>
        }
      >
        <div className="space-y-4">
          <PastStrip series={feminineSeries} />
          <GapNote label="Transparência">
            2026 é fotografia em andamento: o registro de candidaturas ainda
            pode mudar por decisão da Justiça Eleitoral, e o resultado eleitoral
            ainda não existe. Os anos anteriores são bases fechadas.
          </GapNote>
        </div>
      </SectionBlock>

      <NextAxes ids={["quem-sao-elas", "dinheiro", "quem-chega"]} />
    </PageShell>
  );
}
