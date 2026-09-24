import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { EditorialOpening } from "@/components/editorial/EditorialOpening";
import { SectionBlock } from "@/components/editorial/SectionBlock";
import { InBrief } from "@/components/editorial/InBrief";
import { ContextBox } from "@/components/editorial/ContextBox";
import { NextAxes } from "@/components/editorial/NextAxes";
import { ComoSabemos } from "@/components/editorial/ComoSabemos";
import { GapNote } from "@/components/GapNote";
import { SeriesChart } from "@/components/historical/SeriesChart";
import { HistoryFunnel } from "@/components/historical/HistoryFunnel";
import { HistoryTimeline } from "@/components/historical/HistoryTimeline";
import { getHistoricalSeries, type HistoricalSeriesPayload } from "@/lib/tse/historical.functions";
import { BLACK_AGGREGATION_NOTE } from "@/lib/tse/historical-compute";
import { GlossaryTerm } from "@/components/editorial/GlossaryTerm";
import { ELECTION_RATE_BY_GENDER, HISTORICAL_FUNNEL } from "@/data/historical-funnel";
import { formatPct, formatUmEmCada } from "@/lib/format-br";

/**
 * ROTA PUBLICADA — série histórica 2014–2026, com dado real e metodologia
 * declarada em cada ponto.
 */
export const Route = createFileRoute("/historico")({
  loader: () => getHistoricalSeries(),
  head: () => ({
    meta: [
      {
        title:
          "Candidatar-se não é eleger-se: mulheres nas eleições de 2014 a 2022 | Quem são elas?",
      },
      {
        name: "description",
        content:
          "Série histórica das eleições gerais de 2014, 2018 e 2022 e a fotografia de 2026: candidaturas de mulheres, cor/raça e eleitas, com universos e lacunas explícitos.",
      },
      {
        property: "og:title",
        content:
          "Candidatar-se não é eleger-se: mulheres nas eleições de 2014 a 2022",
      },
      {
        property: "og:description",
        content:
          "2014 → 2018 → 2022 → 2026: candidaturas de mulheres, gênero × cor/raça e resultado eleitoral, com denominador declarado em cada ponto.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HistoricoPage,
});

function HistoricoPage() {
  const data = Route.useLoaderData() as HistoricalSeriesPayload;
  const byId = (id: string) => data.series.find((s) => s.id === id);

  const feminine = byId("serie-mulheres-candidaturas");
  const currentBaseGeneratedAt =
    feminine?.points.find((p) => p.year === 2026)?.baseGeneratedAt ?? null;

  const firstProp = feminine?.points.find(
    (p) => p.universe === "proporcional" && p.year === 2014,
  );
  const lastProp = feminine?.points.find(
    (p) => p.universe === "proporcional" && p.year === 2026,
  );
  const latestElectionRate = ELECTION_RATE_BY_GENDER.at(-1);
  const historical2022 = HISTORICAL_FUNNEL.find((row) => row.year === 2022);
  const historyYear = latestElectionRate?.year ?? historical2022?.year;
  const feminineElectionRatio = latestElectionRate && latestElectionRate.feminine.elected > 0
    ? Math.round(latestElectionRate.feminine.candidacies / latestElectionRate.feminine.elected)
    : null;
  const masculineElectionRatio = latestElectionRate && latestElectionRate.masculine.elected > 0
    ? Math.round(latestElectionRate.masculine.candidacies / latestElectionRate.masculine.elected)
    : null;
  const candidacyFrequency = historical2022
    ? formatUmEmCada(historical2022.candidacy.femininePercent)
    : "—";
  const electedFrequency = historical2022?.elected
    ? formatUmEmCada(historical2022.elected.femininePercent)
    : "—";

  return (
    <PageShell breadcrumb={[{ label: "Dados 2026", to: "/" }, { label: "Histórico" }]}>
      <EditorialOpening
        variant="timeline"
        kicker="Como chegamos até aqui?"
        question={`Em ${historyYear ?? "—"}, 1 em cada ${feminineElectionRatio ?? "—"} candidatas a deputada se elegeu. Entre os homens, 1 em cada ${masculineElectionRatio ?? "—"}.`}
        lead={
          <p>
            Desde 2014, a presença de mulheres cresceu nas listas e nas cadeiras,
            mas a distância entre as duas continua. Em {historical2022?.year ?? "—"},
            mulheres eram {candidacyFrequency} candidaturas a deputada e {electedFrequency}
            eleitas. A série mostra também quem ficou com esse crescimento, por
            cor/raça.
          </p>
        }
        years={["2014", "2018", "2022", "2026"]}
      />

      <div className="pb-4">
        <InBrief
          foundLabel="O achado"
          mattersLabel="O que esse número não mostra"
          unknownLabel="Fora da curva"
          found={
            firstProp?.value != null && lastProp?.value != null ? (
              <>
                A participação feminina nas candidaturas{" "}
                <GlossaryTerm term="proporcional">proporcionais</GlossaryTerm> foi
                de {formatPct(firstProp.value)} em 2014 para{" "}
                {formatPct(lastProp.value)} na fotografia de 2026. Cada ano é
                calculado sobre o seu próprio total.
              </>
            ) : (
              <>
                A série é montada ponto a ponto, ano a ano; onde a fotografia não
                existe, o ponto fica vazio.
              </>
            )
          }
          matters={
            <>
              Mais mulher concorrendo não é o mesmo que mais mulher no poder:
              candidatura e cadeira são medidas diferentes, e cada uma se
              distribui de forma própria entre mulheres brancas, pretas, pardas,
              amarelas e indígenas. Quem decide essa distribuição está em{" "}
              <Link to="/quem-controla" className="text-plum underline underline-offset-4">
                Quem controla
              </Link>
              .
            </>
          }
          unknown={
            <>
              Em aberto nesta versão: o resultado de 2026, a cor/raça de todas
              as candidaturas de 2026 e as lacunas documentadas nos arquivos
              históricos oficiais.
            </>
          }
        />
      </div>

      <SectionBlock
        kicker="Gênero"
        question="Quantas candidaturas são de mulheres, em cada eleição?"
        align="wide"
        lead={
          <p>
            Proporcional e majoritária são universos separados e nunca são
            somados: as regras de composição das listas valem para as
            proporcionais.
          </p>
        }
        source="Fonte: TSE · Candidatos (DS_GENERO)"
      >
        <SeriesChart series={feminine} />
      </SectionBlock>

      <SectionBlock
        kicker="Cor e raça"
        question="E quando se olha para cor e raça?"
        align="wide"
        lead={
          <p>
            O TSE coleta cor/raça declarada desde 2014, nas categorias originais
            branca, preta, parda, amarela e indígena. A agregação “negra” só
            aparece aqui quando declarada.
          </p>
        }
        source="Fonte: TSE · Candidatos (DS_COR_RACA)"
      >
        <SeriesChart series={byId("serie-negras-negros-candidaturas")} />
        <div className="mt-6 space-y-4">
          <GapNote label="Limite de 2026">
            A fotografia atual de 2026 guarda cor/raça apenas das candidaturas de
            mulheres. Por isso a participação negra sobre o total de candidaturas
            de 2026 aparece vazia — não como zero.
          </GapNote>
        </div>
      </SectionBlock>

      <SectionBlock
        kicker="Gênero × cor/raça"
        question="A composição das candidaturas femininas mudou?"
        align="wide"
        lead={
          <p>
            Duas leituras diferentes da mesma pergunta: mulheres negras sobre o
            total de candidaturas e mulheres negras entre as candidaturas de
            mulheres. Os denominadores são distintos e não se substituem.
          </p>
        }
        source="Fonte: TSE · Candidatos (tabela cruzada gênero × cor/raça)"
      >
        <div className="space-y-6">
          <SeriesChart series={byId("serie-mulheres-negras-sobre-total")} />
          <SeriesChart series={byId("serie-mulheres-negras-entre-mulheres")} />
        </div>
        <div className="mt-6">
          <ContextBox variant="importa" title="Por que separar por cor muda a leitura">
            <p>
              Um mesmo aumento de candidaturas femininas pode se concentrar em um
              grupo racial e não em outro. Ler só o total de mulheres esconde essa
              diferença.
            </p>
          </ContextBox>
        </div>
      </SectionBlock>

      <SectionBlock
        kicker="Candidatas e eleitas"
        question="Entre candidatar-se e eleger-se, o que muda?"
        align="wide"
        lead={
          <p>
            Comparação entre a participação nas candidaturas e a participação
            entre eleitas e eleitos, ano a ano. 2026 não tem resultado: a eleição
            ainda não ocorreu.
          </p>
        }
        source="Fonte: TSE · Candidatos (DS_SIT_TOT_TURNO, 1º e 2º turno)"
      >
        <div className="space-y-6">
          <SeriesChart series={byId("serie-mulheres-eleitas")} />
          <SeriesChart series={byId("serie-mulheres-negras-eleitas")} />
        </div>
        <div className="mt-8">
          <HistoryFunnel />
        </div>
        <div className="mt-6 space-y-4">
          <GapNote label="Lacunas já documentadas">
            Em 2018, parte das linhas de Senado veio com resultado nulo no arquivo
            oficial; por isso uma cadeira de Mato Grosso fica fora da contagem de
            eleitos, e as senadoras eleitas aparecem como 6 (o Senado registra 7).
            A lacuna é da base publicada e não é preenchida por estimativa.
          </GapNote>
        </div>
      </SectionBlock>

      <SectionBlock
        kicker="Linha temporal"
        question="Quatro eleições gerais, quatro bases diferentes"
        align="wide"
        lead={
          <p>
            Anos encerrados trazem candidaturas e resultado. 2026 é base em
            curso: só candidaturas registradas.
          </p>
        }
        source="Fonte: TSE · Candidatos 2014, 2018, 2022 e 2026"
      >
        <HistoryTimeline
          snapshots={data.snapshots}
          missingYears={data.missingYears}
          currentBaseGeneratedAt={currentBaseGeneratedAt}
        />
        {data.missingYears.length > 0 && (
          <div className="mt-6">
            <GapNote label="Lacuna declarada">
              Anos sem fotografia gravada nesta versão:{" "}
              {data.missingYears.join(", ")}.
            </GapNote>
          </div>
        )}
      </SectionBlock>

      <ComoSabemos
        fonte="TSE, Candidatos 2014, 2018 e 2022 (candidaturas e resultado de 1º e 2º turno); TSE, Candidaturas 2026."
        universo="Proporcional (Câmara, assembleias e Câmara Legislativa do DF) e majoritário (Presidência, governos e Senado), nunca somados. Cada candidatura entra uma vez em cada ano."
        calculo={<>Candidaturas de mulheres divididas pelo total de candidaturas do mesmo universo e do mesmo ano. {BLACK_AGGREGATION_NOTE}</>}
        limites={[
          "2026 não tem resultado: a eleição ainda não ocorreu, e nenhuma eleita é projetada.",
          "Em 2026, a base guarda cor/raça só das candidaturas de mulheres.",
          "Os recortes históricos por cargo e por UF já foram coletados, mas ainda não têm indicador auditado publicado.",
          "Onde a base oficial não traz o dado, o ponto fica vazio. Nenhum ponto desta página é estimado.",
        ]}
      />

      <NextAxes ids={["quem-sao-elas", "funil", "metodo"]} />
    </PageShell>
  );
}
