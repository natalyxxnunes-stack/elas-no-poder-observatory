import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { EditorialOpening } from "@/components/editorial/EditorialOpening";
import subindoAsset from "@/assets/subindo.webp.asset.json";
import { SectionBlock } from "@/components/editorial/SectionBlock";
import { InBrief } from "@/components/editorial/InBrief";
import { ContextBox } from "@/components/editorial/ContextBox";
import { NextAxes } from "@/components/editorial/NextAxes";
import { GapNote } from "@/components/GapNote";
import { GlossaryTerm } from "@/components/editorial/GlossaryTerm";
import { FunnelStages2026 } from "@/components/funnel/FunnelStages2026";
import { PastStrip } from "@/components/funnel/PastStrip";
import { CompetitionByUf } from "@/components/editorial/CompetitionByUf";
import { ComoSabemos } from "@/components/editorial/ComoSabemos";
import { FUNNEL_READING_RULE } from "@/data/architecture";
import { getLatestTseSnapshot } from "@/lib/tse/snapshot.functions";
import { getHistoricalSeries } from "@/lib/tse/historical.functions";
import type { Series } from "@/lib/tse/historical-compute";
import { formatUmEmCada } from "@/lib/format-br";

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
      { property: "og:image", content: `https://quemsaoelas.com.br${subindoAsset.url}` },
      {
        property: "og:image:alt",
        content: "Ilustração editorial: mulher subindo degraus sob arcos coloridos",
      },
      { name: "twitter:image", content: `https://quemsaoelas.com.br${subindoAsset.url}` },
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
    <PageShell breadcrumb={[{ label: "Investigação", to: "/investigacoes" }, { label: "O funil" }]}>
      <div className="py-24">
        <GapNote label="Dados em atualização">
          Não foi possível ler a fotografia do registro de candidaturas agora.
          Nenhum número é exibido no lugar dela.
        </GapNote>
      </div>
    </PageShell>
  ),
  notFoundComponent: () => (
    <PageShell breadcrumb={[{ label: "Investigação", to: "/investigacoes" }, { label: "O funil" }]}>
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
  const frequency = (feminine: number | undefined, total: number | undefined) =>
    feminine !== undefined && total !== undefined && total > 0
      ? formatUmEmCada((feminine / total) * 100)
      : "—";
  const proportionalFrequency = frequency(
    snapshot?.universes.proporcional.feminine,
    snapshot?.universes.proporcional.total,
  );
  const majoritarianFrequency = frequency(
    snapshot?.universes.majoritario.feminine,
    snapshot?.universes.majoritario.total,
  );

  return (
    <PageShell breadcrumb={[{ label: "Investigação", to: "/investigacoes" }, { label: "O funil" }]}>
      <EditorialOpening
        variant="funnel"
        kicker="O funil de 2026"
        question="Onde elas ficam pelo caminho?"
        lead={
          <p>
            Mulheres são {proportionalFrequency} candidaturas a deputada e {majoritarianFrequency} nas disputas por Presidência, governos e Senado. Nas candidaturas majoritárias, a presença cai. A partir de outubro, o funil ganha as etapas de voto e cadeira.
          </p>
        }
        snapshot={snapshot}
        baseDate={stampLabel}
      />

      <div className="pb-4">
        <InBrief
          found={
            <>
              Nas candidaturas{" "}
              <GlossaryTerm term="proporcional">proporcionais</GlossaryTerm> de
              2026 — as que elegem vários nomes para um mesmo parlamento — a
              participação de mulheres é bem maior do que nas{" "}
              <GlossaryTerm term="majoritaria">majoritárias</GlossaryTerm> (Presidência, governos e Senado). Os dois grupos são contados
              separadamente.
            </>
          }
          matters={
            <>
              O cargo em disputa muda o tamanho da porta. Entrar numa lista
              proporcional é diferente de disputar um governo, o Senado ou a Presidência, em que cada partido ou{" "}
              <GlossaryTerm term="federacao">federação</GlossaryTerm> lança poucos nomes.
            </>
          }
          unknown={
            <>
              Em aberto: quem se elege em 2026 — a eleição acontece em outubro e
              o resultado entra depois — e a distribuição por cor/raça do total
              de candidaturas, dimensão que a fotografia atual não grava.
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
            {stampLabel ? ` · base gerada em ${stampLabel}` : ""}
          </>
        }
      >
        <FunnelStages2026 snapshot={snapshot} />
      </SectionBlock>

      <SectionBlock
        kicker="Tamanho da disputa"
        question="Quantas candidaturas existem para cada vaga?"
        align="wide"
        lead={
          <p>
            Antes de qualquer resultado, é possível medir uma coisa só com os
            registros: o tamanho da disputa. Dividimos as candidaturas
            registradas pelas vagas efetivamente em disputa, dentro de um mesmo
            universo.
          </p>

        }
        source={
          <>
            Fonte: TSE · Candidaturas 2026 (numerador) e TSE · recurso Vagas de
            2026 (denominador)
          </>
        }
      >
        <CompetitionByUf snapshot={snapshot} />
      </SectionBlock>


      <SectionBlock
        kicker="Contexto"
        question="Como isso se compara ao passado?"
        lead={
          <p>A mesma medida nas três eleições gerais anteriores.</p>
        }
        source="Fonte: TSE · Candidatos 2014, 2018, 2022 e 2026"
      >
        <PastStrip series={feminineSeries} />
      </SectionBlock>

      <SectionBlock
        tone="solar"
        kicker="Antes do resultado"
        question="Ninguém disputa uma cadeira sozinha"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <ContextBox variant="significa" title="Na proporcional, o voto é do partido também">
            <p>
              Uma candidata a deputada disputa junto com o partido ou{" "}
              <GlossaryTerm term="federacao">federação</GlossaryTerm>: os votos
              dela entram na votação do grupo, e é essa votação, comparada ao{" "}
              <GlossaryTerm term="quociente-eleitoral">
                quociente eleitoral
              </GlossaryTerm>
              , que define quantas cadeiras o grupo conquista. Só depois, dentro do grupo, a ordem dos mais votados decide quem
              ocupa essas cadeiras — por isso uma candidata com muitos votos pode
              ficar de fora e outra, com menos votos, entrar.
            </p>
          </ContextBox>
        </div>
      </SectionBlock>

      <ComoSabemos
        fonte="TSE, Candidaturas 2026 e Vagas 2026; TSE, Candidatos 2014, 2018 e 2022."
        universo="Candidaturas registradas, cada uma contada uma vez pelo identificador oficial. Proporcional (Câmara, assembleias e Câmara Legislativa do DF) e majoritário (Presidência, governos e Senado) são contados separadamente. Vices e suplentes ficam fora."
        base={stampLabel}
        calculo={FUNNEL_READING_RULE}
        limites={[
          "2026 é fotografia em andamento: o registro ainda pode mudar por decisão da Justiça Eleitoral.",
          "O resultado de 2026 ainda não existe. As etapas de voto e cadeira entram depois da apuração.",
          "Cada etapa é o retrato de um universo, e não o rastro das mesmas pessoas de um degrau para o outro.",
        ]}
      />

      <NextAxes ids={["historico", "direitos", "metodo"]} />
    </PageShell>
  );
}
