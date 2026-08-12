import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/editorial/PageHero";
import { SectionBlock } from "@/components/editorial/SectionBlock";
import { InBrief } from "@/components/editorial/InBrief";
import { ContextBox } from "@/components/editorial/ContextBox";
import { NextAxes } from "@/components/editorial/NextAxes";
import { GapNote } from "@/components/GapNote";
import { SeriesChart } from "@/components/historical/SeriesChart";
import { HistoryTimeline } from "@/components/historical/HistoryTimeline";
import { getHistoricalSeries, type HistoricalSeriesPayload } from "@/lib/tse/historical.functions";
import { BLACK_AGGREGATION_NOTE } from "@/lib/tse/historical-compute";
import timelineEditorial from "@/assets/timeline-editorial.png";

export const Route = createFileRoute("/historico")({
  loader: () => getHistoricalSeries(),
  head: () => ({
    meta: [
      {
        title: "Como chegamos até aqui? — Quem são elas? | Série 2014–2026",
      },
      {
        name: "description",
        content:
          "Série histórica das eleições gerais de 2014, 2018 e 2022 e a fotografia de 2026: candidaturas de mulheres, cor/raça e eleitas, com universos e lacunas explícitos.",
      },
      {
        property: "og:title",
        content: "A presença das mulheres na política mudou. Mas mudou para quem?",
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

  return (
    <PageShell>
      <PageHero
        kicker="Como chegamos até aqui?"
        question="A presença das mulheres na política mudou. Mas mudou para quem?"
        lead={
          <p>
            Esta página acompanha a participação de mulheres nas eleições gerais
            ao longo do tempo — 2014, 2018, 2022 e a fotografia de 2026 — usando
            apenas os indicadores já calculados a partir dos arquivos oficiais do
            TSE.
          </p>
        }
        image={timelineEditorial}
        imageAlt="Ilustração editorial de uma linha do tempo eleitoral"
      />

      <div className="pb-4">
        <InBrief
          found={
            firstProp?.value != null && lastProp?.value != null ? (
              <>
                Nas eleições proporcionais, a participação feminina nas
                candidaturas passou de{" "}
                {firstProp.value.toLocaleString("pt-BR", {
                  maximumFractionDigits: 1,
                  minimumFractionDigits: 1,
                })}
                % em 2014 para{" "}
                {lastProp.value.toLocaleString("pt-BR", {
                  maximumFractionDigits: 1,
                  minimumFractionDigits: 1,
                })}
                % na fotografia de 2026. Cada ano tem denominador próprio.
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
              Crescer em candidaturas não é o mesmo que crescer em cadeiras, e
              nenhum dos dois se distribui igualmente entre mulheres brancas,
              pretas, pardas, amarelas e indígenas.
            </>
          }
          unknown={
            <>
              O resultado de 2026, a cor/raça de todas as candidaturas de 2026 e
              os eleitos de 2º turno dos anos anteriores — que esta versão ainda
              não contabiliza.
            </>
          }
        />
      </div>

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
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <ContextBox variant="significa">
            <p>
              Proporcional reúne Câmara dos Deputados, assembleias legislativas e
              Câmara Legislativa do DF. Majoritária reúne Presidência, governos e
              Senado — universo pequeno, que deve ser lido em contagens
              absolutas.
            </p>
          </ContextBox>
          <ContextBox variant="calculamos">
            <p>
              Candidaturas de mulheres divididas pelo total de candidaturas do
              mesmo universo e do mesmo ano. Cada candidatura entra uma única vez
              (deduplicação por candidatura).
            </p>
          </ContextBox>
        </div>
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
          <ContextBox variant="significa">
            <p>{BLACK_AGGREGATION_NOTE}</p>
          </ContextBox>
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
          <ContextBox variant="importa">
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
        source="Fonte: TSE · Candidatos (DS_SIT_TOT_TURNO, 1º turno)"
      >
        <div className="space-y-6">
          <SeriesChart series={byId("serie-mulheres-eleitas")} />
          <SeriesChart series={byId("serie-mulheres-negras-eleitas")} />
        </div>
        <div className="mt-6 space-y-4">
          <GapNote label="Limite desta versão">
            O resultado histórico considera apenas o 1º turno. Cargos majoritários
            decididos em 2º turno não entram na contagem de eleitas e eleitos
            desta versão; a correção está pendente e não foi feita nesta rodada.
          </GapNote>
          <GapNote label="Lacunas já documentadas">
            Em 2018 e 2022 há registros com resultado marcado como nulo no arquivo
            oficial — 22 linhas de Senado em 2018 e 926 linhas do Maranhão em
            2022, o que deixa cadeiras fora da contagem de eleitos. A lacuna é da
            base publicada e não é preenchida por estimativa.
          </GapNote>
          <GapNote label="2026">
            Nenhuma eleita de 2026 é exibida: não há resultado eleitoral e nada é
            projetado.
          </GapNote>
        </div>
      </SectionBlock>

      <SectionBlock
        kicker="Território e cargo"
        question="E a leitura por estado e por cargo?"
        align="wide"
        source="Pendência técnica declarada — sem novo cálculo nesta rodada"
      >
        <GapNote label="Pendência">
          A coleta histórica guarda cortes por cargo e por unidade da federação,
          mas nesta versão não existe indicador histórico auditado publicado para
          esses cortes. Nada é calculado aqui para preencher o espaço: o bloco
          fica declarado como pendência.
        </GapNote>
      </SectionBlock>

      <SectionBlock
        kicker="Síntese"
        question="O que os dados permitem dizer"
        align="wide"
        source="Fonte: TSE · Candidatos 2014, 2018, 2022 e 2026"
      >
        <ul className="max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
          <li>
            A participação feminina nas candidaturas proporcionais é maior em cada
            eleição da série do que na anterior. É uma descrição da série, não uma
            explicação de causa.
          </li>
          <li>
            Candidatura e resultado são universos distintos: a participação entre
            eleitas e eleitos é lida com denominador próprio e não pode ser
            subtraída da participação nas candidaturas.
          </li>
          <li>
            Onde a base não traz o dado — cor/raça de todas as candidaturas em
            2026, resultado de 2026, cadeiras decididas em 2º turno — o ponto fica
            vazio. Não há estimativa em nenhum ponto desta página.
          </li>
        </ul>
        <p className="mt-8 font-mono text-[11px] text-muted-foreground">
          Fórmulas, filtros e versões de processamento em{" "}
          <Link to="/metodo" className="text-plum underline underline-offset-4">
            Método
          </Link>{" "}
          · condições de entrada na disputa em{" "}
          <Link to="/condicoes" className="text-plum underline underline-offset-4">
            Condições
          </Link>
        </p>
      </SectionBlock>

      <NextAxes ids={["quem-sao-elas", "funil", "metodo"]} />
    </PageShell>
  );
}
