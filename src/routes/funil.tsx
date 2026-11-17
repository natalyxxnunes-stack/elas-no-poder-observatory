import { M_GOVERNOS } from "@/data/manchetes";
import { PILOT_CORAL } from "@/lib/editorial-pilot-colors";
import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { EditorialOpening } from "@/components/editorial/EditorialOpening";
import { SectionBlock } from "@/components/editorial/SectionBlock";
import { InBrief } from "@/components/editorial/InBrief";
import { ContextBox } from "@/components/editorial/ContextBox";
import { NextAxes } from "@/components/editorial/NextAxes";
import { GapNote } from "@/components/GapNote";
import { GlossaryTerm } from "@/components/editorial/GlossaryTerm";
import { FunnelStages2026 } from "@/components/funnel/FunnelStages2026";
import { PastStrip } from "@/components/funnel/PastStrip";
import { CompetitionByUf } from "@/components/editorial/CompetitionByUf";
import { FunnelSourceFiles } from "@/components/funnel/FunnelSourceFiles";
import { ComoSabemos } from "@/components/editorial/ComoSabemos";
import { FUNNEL_READING_RULE } from "@/data/architecture";
import { getLatestTseSnapshot } from "@/lib/tse/snapshot.functions";
import { getHistoricalSeries } from "@/lib/tse/historical.functions";
import type { Series } from "@/lib/tse/historical-compute";
import { formatInt, formatPct, formatUmEmCada } from "@/lib/format-br";
import { RESULT_2026_PROPORCIONAL } from "@/data/resultado-2026";

export const Route = createFileRoute("/funil")({
  head: () => ({
    meta: [
      { title: "Onde elas ficam pelo caminho? · Quem são elas?" },
      {
        name: "description",
        content:
          "O funil de 2026: quantas mulheres nas candidaturas proporcionais e majoritárias, quem são elas por cor/raça e quantas chegaram às cadeiras, com o resultado final de 2026.",
      },
      { property: "og:title", content: M_GOVERNOS.texto },
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
        question={M_GOVERNOS.texto}
        lead={
          <p>
            Mulheres são {proportionalFrequency} candidaturas a deputada e {majoritarianFrequency} nas disputas por Presidência, governos e Senado. Nas candidaturas majoritárias, a presença cai. Na Presidência, {/* n=14, número absoluto */}2 das 14 candidaturas eram de mulheres.
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
              2026, as que elegem vários nomes para um mesmo parlamento, a
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
              Em aberto: quem ocupa as posições de poder depois da posse, em
              2027 (mesas, comissões, lideranças e secretariados).
            </>
          }
        />
      </div>

      <section aria-label="Como ler os três universos da eleição" className="relative left-1/2 -ml-[50vw] w-screen bg-coral-ink text-white" style={{ backgroundColor: PILOT_CORAL }}>
        <div className="mx-auto grid max-w-7xl gap-7 px-5 py-9 md:grid-cols-[.85fr_1.15fr] md:px-8 md:py-12">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wide text-white">Chave de leitura · TSE 2026</p>
            <h2 className="mt-3 font-display text-[clamp(2rem,3.4vw,3.4rem)] leading-[1.08] text-white">
              Três universos. Não são três degraus.
            </h2>
          </div>
          <div className="grid gap-3 border-t border-white/35 pt-5 text-base leading-relaxed md:grid-cols-3">
            <div><strong className="block font-display text-2xl text-white">01</strong><p className="mt-2 text-white">Candidaturas proporcionais</p></div>
            <div><strong className="block font-display text-2xl text-white">02</strong><p className="mt-2 text-white">Candidaturas majoritárias</p></div>
            <div><strong className="block font-display text-2xl text-white">03</strong><p className="mt-2 text-white">Cadeiras proporcionais</p></div>
            <p className="border-t border-white/30 pt-3 text-sm text-white md:col-span-3">
              Cada conjunto tem o próprio total. Eles não acompanham as mesmas pessoas
              ao longo de uma trajetória individual.
            </p>
          </div>
        </div>
      </section>

      <SectionBlock id="etapas" tone="ink"
        kicker="Universos da eleição"
        question="A presença feminina muda conforme o universo observado"
        align="wide"
        lead={
          <p>
            Compare as candidaturas proporcionais e majoritárias, que têm
            denominadores separados. As cadeiras preenchidas formam um
            terceiro universo. Dentro das candidaturas de mulheres,
            preserve as categorias de cor/raça declaradas.
          </p>
        }
        source={
          <>
            Fonte: TSE · Candidaturas 2026
            {stampLabel ? ` · base gerada em ${stampLabel}` : ""}
          </>
        }
      >
        <div className="bg-paper p-4 text-ink md:p-7">
          <FunnelStages2026 snapshot={snapshot} />
        </div>
      </SectionBlock>

      <SectionBlock id="disputa" tone="butter"
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
        <FunnelSourceFiles />
        <CompetitionByUf snapshot={snapshot} />
      </SectionBlock>


      <SectionBlock id="contexto" tone="plum"
        kicker="Contexto"
        question="Como isso se compara ao passado?"
        lead={
          <p>A mesma medida nas três eleições gerais anteriores.</p>
        }
        source="Fonte: TSE · Candidatos 2014, 2018, 2022 e 2026"
      >
        <PastStrip series={feminineSeries} />
      </SectionBlock>

      <SectionBlock id="chapas" tone="ink"
        kicker="Como funcionam as cadeiras"
        question="Na disputa proporcional, ninguém concorre isoladamente"
      >
        <div className="grid gap-4 bg-paper p-5 text-ink md:grid-cols-2 md:p-7">
          <ContextBox variant="significa" title="Na proporcional, a candidatura faz parte de uma disputa partidária">
            <p>
              Uma candidata a deputada disputa junto com o partido ou{" "}
              <GlossaryTerm term="federacao">federação</GlossaryTerm>: os votos
              dela entram na votação do grupo, e é essa votação, comparada ao{" "}
              <GlossaryTerm term="quociente-eleitoral">
                quociente eleitoral
              </GlossaryTerm>, que define quantas cadeiras o grupo conquista. Só depois, dentro do grupo, a ordem dos mais votados decide quem
              ocupa essas cadeiras. Por isso uma candidata com muitos votos pode
              ficar de fora e outra, com menos votos, entrar.
            </p>
          </ContextBox>
        </div>
      </SectionBlock>

      <ComoSabemos
        fonte="TSE, Candidaturas 2026, resultado final de 2026 (base de 27/10, com o 2º turno) e Vagas 2026; TSE, Candidatos 2014, 2018 e 2022."
        universo="Candidaturas registradas, cada uma contada uma vez pelo identificador oficial. Proporcional (Câmara, assembleias e Câmara Legislativa do DF) e majoritário (Presidência, governos e Senado) são contados separadamente. Vices e suplentes ficam fora."
        base={stampLabel}
        calculo={FUNNEL_READING_RULE}
        limites={[
          "Candidaturas e resultado de 2026 vêm do mesmo arquivo do TSE, de 27/10/2026; o resultado é lido sobre o total de cadeiras.",
          "Governos e Presidência decididos em 2º turno valem pelo resultado de 25/10 (linha do 2º turno no arquivo do TSE); deputadas, deputados e Senado têm turno único.",
          "Proporcionais, majoritárias e cadeiras preenchidas são universos diferentes, não uma sequência de pessoas que passam entre degraus.",
        ]}
      />

      <NextAxes ids={["historico", "direitos", "metodo"]} />
    </PageShell>
  );
}
