import { HistoryByOffice, HistoryByUf } from "@/components/historical/HistoryByOffice";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { formatInt } from "@/lib/format-br";
import { PILOT_CORAL } from "@/lib/editorial-pilot-colors";
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
          "Candidatar-se não é eleger-se: mulheres nas eleições de 2014 a 2026 | Quem são elas?",
      },
      {
        name: "description",
        content:
          "Série histórica das eleições gerais de 2014, 2018 e 2022 e a fotografia de 2026: candidaturas de mulheres, cor/raça e eleitas, com universos e lacunas explícitos.",
      },
      {
        property: "og:title",
        content:
          "Candidatar-se não é eleger-se: mulheres nas eleições de 2014 a 2026",
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
  const historicalLatest = HISTORICAL_FUNNEL.find((row) => row.year === 2026);
  const historyYear = latestElectionRate?.year ?? historicalLatest?.year;
  const feminineElectionRatio = latestElectionRate && latestElectionRate.feminine.elected > 0
    ? Math.round(latestElectionRate.feminine.candidacies / latestElectionRate.feminine.elected)
    : null;
  const masculineElectionRatio = latestElectionRate && latestElectionRate.masculine.elected > 0
    ? Math.round(latestElectionRate.masculine.candidacies / latestElectionRate.masculine.elected)
    : null;
  const candidacyFrequency = historicalLatest
    ? formatUmEmCada(historicalLatest.candidacy.femininePercent)
    : "—";
  const electedFrequency = historicalLatest?.elected
    ? formatUmEmCada(historicalLatest.elected.femininePercent)
    : "—";

  return (
    <PageShell breadcrumb={[{ label: "Dados", to: "/dados" }, { label: "Histórico" }]}>
      <header className="relative left-1/2 -ml-[50vw] w-screen bg-plum text-cream">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <p className="font-display text-xl italic text-[var(--art-gold)]">Arquivo eleitoral · 2014 a 2026</p>
          <div className="mt-4 grid gap-6 lg:grid-cols-[1.2fr_.8fr] lg:gap-14">
            <h1 className="max-w-4xl text-balance font-display text-[clamp(2rem,4.1vw,3.8rem)] font-semibold leading-[1.07] text-cream">
              Em {historyYear ?? "2026"}, 1 em cada {feminineElectionRatio ?? "—"} candidatas a deputada se elegeu; entre os homens, 1 em cada {masculineElectionRatio ?? "—"}
            </h1>
            <div className="max-w-xl self-end space-y-4 text-base leading-relaxed text-cream/85">
              <p>
                De 2014 a 2026, mais mulheres concorreram e conquistaram cadeiras. As
                taxas de eleição também mudaram com o tamanho das listas. Para ler essa
                trajetória, precisamos comparar candidaturas e cadeiras em seus
                respectivos universos, sem atribuir as diferenças a uma causa única.
              </p>
              <p>
                Em {historicalLatest?.year ?? "—"}, mulheres eram {candidacyFrequency}
                {" "}candidaturas proporcionais e {electedFrequency} pessoas eleitas
                no mesmo tipo de disputa.
              </p>
            </div>
          </div>
          <div className="mt-9 grid gap-px bg-cream/20 sm:grid-cols-2 lg:grid-cols-4" role="group"
            aria-label="Quatro eleições gerais: presença de mulheres nas candidaturas e entre eleitos">
            {HISTORICAL_FUNNEL.map((ano) => (
              <div key={ano.year} className="bg-[var(--art-ink)] px-4 py-5 md:px-5">
                <p className="font-display text-4xl text-[var(--art-gold)]">{ano.year}</p>
                <dl className="mt-3 space-y-2 text-sm">
                  <div>
                    <dt className="text-cream/75">Nas candidaturas a deputado</dt>
                    <dd className="font-mono font-semibold text-cream">{formatPct(ano.candidacy.femininePercent)}
                      <span className="ml-2 font-normal text-cream/70">({formatInt(ano.candidacy.feminine)} de {formatInt(ano.candidacy.total)})</span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-cream/75">Entre as pessoas eleitas</dt>
                    <dd className="font-mono font-semibold text-cream">
                      {ano.elected ? formatPct(ano.elected.femininePercent) : "sem dado"}
                      {ano.elected && <span className="ml-2 font-normal text-cream/70">
                        ({formatInt(ano.elected.feminine)} de {formatInt(ano.elected.total)})
                      </span>}
                    </dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
          <p className="mt-3 max-w-3xl font-mono text-[12px] leading-relaxed text-cream/75">
            TSE · eleições gerais · deputado federal, estadual e distrital.
            Cada percentual tem o denominador do mesmo ano e da mesma situação.
            A série completa e suas limitações estão documentadas abaixo.
          </p>
        </div>
      </header>

      <nav aria-label="Navegar pelas séries históricas" className="my-6 border-y border-rule py-5">
        <p className="font-mono text-xs font-semibold uppercase tracking-wide text-plum">
          Índice das séries · cada gráfico informa seu próprio universo
        </p>
        <div className="mt-3 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold">
          <a href="#genero" className="text-plum underline decoration-plum/40 underline-offset-4 hover:decoration-plum">Candidaturas</a>
          <a href="#raca" className="text-plum underline decoration-plum/40 underline-offset-4 hover:decoration-plum">Cor e raça</a>
          <a href="#genero-raca" className="text-plum underline decoration-plum/40 underline-offset-4 hover:decoration-plum">Gênero × cor/raça</a>
          <a href="#eleitas" className="text-plum underline decoration-plum/40 underline-offset-4 hover:decoration-plum">Eleitas</a>
          <a href="#cargo-uf" className="text-plum underline decoration-plum/40 underline-offset-4 hover:decoration-plum">Cargos e estados</a>
          <a href="#bases" className="text-plum underline decoration-plum/40 underline-offset-4 hover:decoration-plum">Bases e lacunas</a>
        </div>
      </nav>

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
              Em aberto: as lacunas documentadas nos arquivos históricos
              oficiais, listadas no fim da página.
            </>
          }
        />
      </div>

      <SectionBlock id="genero"
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
        <SeriesChart series={feminine} mobileSelectable />
      </SectionBlock>

      <SectionBlock id="raca" tone="plum"
        kicker="Cor e raça"
        question="E quando se olha para cor e raça?"
        align="wide"
        lead={
          <p>
            O TSE coleta cor/raça declarada desde 2014, nas categorias originais
            branca, preta, parda, amarela e indígena. Preta e parda aparecem
            separadas nas barras, com a soma declarada em texto menor.
          </p>
        }
        source="Fonte: TSE · Candidatos (DS_COR_RACA)"
      >
        <SeriesChart series={byId("serie-negras-negros-candidaturas")} mobileSelectable />
      </SectionBlock>

      <SectionBlock id="genero-raca" tone="butter"
        kicker="Gênero × cor/raça"
        question="A composição das candidaturas femininas mudou?"
        align="wide"
        lead={
          <p>
            Duas leituras diferentes da mesma pergunta: mulheres pretas e pardas
            sobre o total de candidaturas e entre as candidaturas de mulheres.
            Os denominadores são distintos e não se substituem.
          </p>
        }
        source="Fonte: TSE · Candidatos (tabela cruzada gênero × cor/raça)"
      >
        <div className="space-y-6">
          <SeriesChart series={byId("serie-mulheres-negras-sobre-total")} mobileSelectable />
          <SeriesChart series={byId("serie-mulheres-negras-entre-mulheres")} mobileSelectable />
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

      {firstProp?.value != null && lastProp?.value != null && (
        <section aria-label="Contraste histórico das candidaturas proporcionais" className="relative left-1/2 -ml-[50vw] w-screen bg-coral-ink text-white" style={{ backgroundColor: PILOT_CORAL }}>
          <div className="mx-auto grid max-w-7xl gap-6 px-5 py-10 md:grid-cols-[.9fr_1.1fr] md:px-8 md:py-14">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-wide text-white">Uma série · dois pontos</p>
              <h2 className="mt-3 max-w-lg font-display text-3xl leading-tight text-white md:text-4xl">
                A presença cresceu nas listas. A distribuição das cadeiras pede outra conta.
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-5 self-end border-t border-white/40 pt-5">
              <div>
                <p className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none text-white">{formatPct(firstProp.value)}</p>
                <p className="mt-3 font-mono text-sm text-white">2014 · candidaturas proporcionais de mulheres</p>
              </div>
              <div>
                <p className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none text-white">{formatPct(lastProp.value)}</p>
                <p className="mt-3 font-mono text-sm text-white">2026 · mesmo universo, outra eleição</p>
              </div>
              <p className="col-span-2 border-t border-white/30 pt-3 text-sm leading-relaxed text-white">
                Cada percentual divide mulheres candidatas pelo total de candidaturas do seu ano.
                Não informa a taxa de eleição dessas pessoas nem a causa da mudança.
              </p>
            </div>
          </div>
        </section>
      )}

      <SectionBlock id="eleitas" tone="ink"
        kicker="Candidatas e eleitas"
        question="Entre candidatar-se e eleger-se, o que muda?"
        align="wide"
        lead={
          <p>
            Comparação entre a participação nas candidaturas e a participação
            entre eleitas e eleitos, ano a ano. 2026 entra com o resultado final:
            o 1º turno de 4/10 no proporcional e, no majoritário, o 2º turno de
            25/10 onde houve.
          </p>
        }
        source="Fonte: TSE · Candidatos (DS_SIT_TOT_TURNO). Proporcional: resultado do 1º turno, o único da eleição proporcional. Majoritário: resultado final, com 2º turno onde houve."
      >
        <div className="bg-paper p-4 text-ink md:p-7">
        {historicalLatest?.elected && (
          <aside className="mb-7 grid gap-5 bg-[var(--art-ink)] px-5 py-7 text-cream md:grid-cols-2 md:px-8"
            aria-label="Dois denominadores da eleição de 2026">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-wide text-cream/75">2026 · candidaturas proporcionais</p>
              <p className="mt-3 font-display text-5xl text-cream">{formatPct(historicalLatest.candidacy.femininePercent)}</p>
              <p className="mt-2 font-mono text-[13px] leading-relaxed text-cream/85">
                {formatInt(historicalLatest.candidacy.feminine)} mulheres entre
                {" "}{formatInt(historicalLatest.candidacy.total)} candidaturas.
              </p>
            </div>
            <div className="border-t border-cream/30 pt-5 md:border-l md:border-t-0 md:pl-7 md:pt-0">
              <p className="font-mono text-[12px] font-semibold uppercase tracking-wide text-cream/75">2026 · cadeiras proporcionais</p>
              <p className="mt-3 font-display text-5xl text-[var(--art-gold)]">{formatPct(historicalLatest.elected.femininePercent)}</p>
              <p className="mt-2 font-mono text-[13px] leading-relaxed text-cream/85">
                {formatInt(historicalLatest.elected.feminine)} mulheres entre
                {" "}{formatInt(historicalLatest.elected.total)} pessoas eleitas.
              </p>
            </div>
            <p className="md:col-span-2 border-t border-cream/30 pt-4 text-[13px] leading-relaxed text-cream/85">
              A diferença entre percentuais descreve representações em duas populações
              distintas. Não é uma taxa individual de conversão de candidatas em eleitas.
            </p>
          </aside>
        )}
        <div className="space-y-6">
          <SeriesChart series={byId("serie-mulheres-eleitas")} mobileSelectable />
          <SeriesChart series={byId("serie-mulheres-negras-eleitas")} mobileSelectable />
        </div>
        <details className="group mt-8 border border-plum bg-cream px-4 py-3 md:px-5">
          <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-3 text-base font-semibold text-plum">
            Abrir os quatro cadernos de candidatas e eleitas, por ano
            <span aria-hidden="true" className="group-open:rotate-180">↓</span>
          </summary>
          <div className="mt-5"><HistoryFunnel /></div>
        </details>
        <div className="mt-6 space-y-4">
          <GapNote label="Lacunas já documentadas">
            Em 2018, parte das linhas de Senado veio com resultado nulo no arquivo
            oficial; por isso uma cadeira de Mato Grosso fica fora da contagem de
            eleitos, e as senadoras eleitas aparecem como 6 (o Senado registra 7).
            A lacuna é da base publicada e não é preenchida por estimativa.
          </GapNote>
        </div>
        </div>
      </SectionBlock>

      <SectionBlock
        id="cargo-uf"
        tone="butter"
        kicker="Por cargo e por estado"
        question="Em que cargos e em que estados a presença de mulheres mudou"
        align="wide"
        lead={
          <p>
            Na Câmara, as deputadas eleitas passaram de 51 em 2014 para 109 em 2026. No Senado, de 5 senadoras eleitas
            em 2014 para 12 em 2026, com o dobro de vagas em disputa. Nos governos, de 1 para 3. Na Presidência, uma
            mulher eleita em 2014 e nenhuma desde então.
          </p>
        }
      >
        <div className="space-y-6">
          <HistoryByOffice />
          <HistoryByUf />
        </div>
      </SectionBlock>

      <SectionBlock id="bases" tone="ink"
        kicker="Arquivo eleitoral"
        question="Quatro eleições gerais, quatro bases diferentes"
        align="wide"
        lead={
          <p>
            As quatro eleições trazem candidaturas e resultado. Em 2026, as
            candidaturas e o resultado vêm do arquivo do TSE de 27/10, já com o
            2º turno.
          </p>
        }
        source="Fonte: TSE · Candidatos 2014, 2018, 2022 e 2026"
      >
        <div className="bg-paper p-4 text-ink md:p-7">
          <div className="mb-6 border-b-2 border-ink bg-[var(--art-gold)] px-5 py-5 text-ink">
            <p className="font-mono text-xs font-semibold uppercase tracking-wide">Fonte primária · Tribunal Superior Eleitoral</p>
            <p className="mt-2 max-w-3xl font-display text-2xl leading-tight md:text-3xl">
              Quatro arquivos, quatro eleições, nenhum documento reconstruído.
            </p>
          </div>
          <HistoryTimeline
            snapshots={data.snapshots}
            missingYears={data.missingYears}
            currentBaseGeneratedAt={currentBaseGeneratedAt}
          />
        </div>
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
        fonte="TSE, Candidatos 2014, 2018 e 2022 (resultado do 1º turno no proporcional; resultado final, com 2º turno, no majoritário); TSE, Candidaturas 2026 (fotografia de 27/10) e resultado final de 2026 (mesma base de 27/10, com o 2º turno)."
        universo="Proporcional (Câmara, assembleias e Câmara Legislativa do DF) e majoritário (Presidência, governos e Senado), nunca somados. Cada candidatura entra uma vez em cada ano."
        calculo={<>Candidaturas de mulheres divididas pelo total de candidaturas do mesmo universo e do mesmo ano. {BLACK_AGGREGATION_NOTE}</>}
        limites={[
          "2026: candidaturas e resultado do mesmo arquivo do TSE, de 27/10/2026.",
          "Por UF, só a Câmara dos Deputados: as cadeiras por estado são fixas e comparáveis entre as eleições.",
          "Onde a base oficial não traz o dado, o ponto fica vazio. Nenhum ponto desta página é estimado.",
        ]}
      />

      <NextAxes ids={["quem-sao-elas", "funil", "metodo"]} />
    </PageShell>
  );
}
