import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { SectionBlock } from "@/components/editorial/SectionBlock";
import { ContextBox } from "@/components/editorial/ContextBox";
import { RaceBreakdown } from "@/components/editorial/RaceBreakdown";
import { NextAxes } from "@/components/editorial/NextAxes";
import { StatusTag } from "@/components/editorial/StatusTag";
import { UfGrid } from "@/components/editorial/UfGrid";
import { GlossaryTerm } from "@/components/editorial/GlossaryTerm";
import { EditorialArtwork } from "@/components/editorial/EditorialArtwork";


import {
  CENTRAL_PRINCIPLE,
  CENTRAL_THESIS,
  FUNNEL_LAYERS,
} from "@/data/architecture";
import {
  CURRENT_INDICATORS,
  formatPercent,
  formatPoints,
  type Indicator,
} from "@/data/election-2026";
import { applySnapshot } from "@/lib/tse/indicators";
import {
  getLatestTseSnapshot,
  getPendingReviewBaseDate,
  type PublicSnapshot,
} from "@/lib/tse/snapshot.functions";

import { HistoryFunnel } from "@/components/historical/HistoryFunnel";
import { ElectionRateByGender } from "@/components/historical/ElectionRateByGender";

import { RaceFinding2026 } from "@/components/editorial/RaceFinding2026";
import { formatInt, formatPct } from "@/lib/format-br";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Quem são elas? — Mulheres, eleições e poder | Dados 2026" },
      {
        name: "description",
        content:
          "Observatório de dados sobre mulheres, eleições e poder em 2026: candidaturas proporcionais e majoritárias, gênero e raça, o funil até o poder e o método aberto.",
      },
      { property: "og:title", content: "Quem são elas? — Dados 2026" },
      {
        property: "og:description",
        content:
          "Entre se candidatar e chegar ao poder, onde elas desaparecem? Um observatório de dados sobre mulheres, eleições e poder.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: async () => {
    const [snapshot, pendingReviewBaseDate] = await Promise.all([
      getLatestTseSnapshot(),
      getPendingReviewBaseDate(),
    ]);
    return { snapshot, pendingReviewBaseDate };
  },

  component: DadosPage,
});

function snapshotDate(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

const nf = (n: number) => formatInt(n);

const PLAIN_MEANING: Record<string, string> = {
  "participacao-feminina-proporcional":
    "Mulheres entre as candidaturas proporcionais",
  "participacao-feminina-majoritario":
    "Mulheres entre as candidaturas majoritárias",
  "diferenca-universos":
    "Distância entre os dois universos, em pontos percentuais",
};

/** Maior participação feminina proporcional por UF, lida do snapshot. */
function topUf(snapshot: PublicSnapshot | null) {
  const dims = snapshot?.universes.proporcional.dimensions;
  const fem = dims?.feminineByUf;
  const tot = dims?.totalByUf;
  if (!fem || !tot) return null;
  let best: { uf: string; share: number; f: number; t: number } | null = null;
  for (const [uf, t] of Object.entries(tot)) {
    if (!t || t <= 0) continue;
    const f = fem[uf] ?? 0;
    const share = (f / t) * 100;
    if (!best || share > best.share) best = { uf, share, f, t };
  }
  return best;
}

/** Card de achado: etiqueta → número gigante coral → significado → denominador. */
function FindingCard({
  tag,
  value,
  meaning,
  denominator,
  date,
}: {
  tag: string;
  value: string | null;
  meaning: string;
  denominator: string | null;
  date: string | null;
}) {
  return (
    <article className="poster-frame p-6">
      <p className="poster-eyebrow text-ink">{tag}</p>
      {value ? (
        <>
          <p className="poster-figure mt-4 text-[clamp(2.6rem,7vw,4rem)] text-coral-ink">
            {value}
          </p>
          <p className="mt-3 font-display text-lg leading-snug text-ink">
            {meaning}
          </p>
          {denominator && (
            <p className="mt-2 font-mono text-[12px] text-muted-foreground">
              {denominator}
            </p>
          )}
          {date && (
            <p className="font-mono text-[12px] text-muted-foreground">
              Fotografia da base de {date}
            </p>
          )}
        </>
      ) : (
        <>
          <p className="poster-figure mt-4 text-3xl text-plum">
            em atualização
          </p>
          <p className="mt-3 font-display text-lg leading-snug text-ink">
            {meaning}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Aguardando a nova fotografia da base do TSE.
          </p>
        </>
      )}
    </article>
  );
}

function IndicatorCard({ indicator }: { indicator: Indicator }) {
  const isPoints = indicator.unit === "p.p.";
  const hasValue =
    indicator.value !== null && (isPoints || indicator.denominator !== null);
  const date = snapshotDate(indicator.baseGeneratedAt);

  return (
    <article className="poster-frame p-6">
      {hasValue ? (
        <>
          <p className="poster-figure text-[clamp(2.4rem,6vw,3.4rem)] text-plum">
            {isPoints
              ? formatPoints(indicator.value)
              : formatPercent(indicator.value)}
          </p>
          <p className="mt-3 font-display text-lg leading-snug text-ink">
            {PLAIN_MEANING[indicator.id] ?? indicator.label}
          </p>
          {indicator.numerator !== null && indicator.denominator !== null && (
            <p className="mt-2 font-mono text-[12px] text-muted-foreground">
              {nf(indicator.numerator)} de {nf(indicator.denominator)}{" "}
              candidaturas
            </p>
          )}
          {date && (
            <p className="font-mono text-[12px] text-muted-foreground">
              Fotografia da base de {date}
            </p>
          )}
        </>
      ) : (
        <>
          <p className="font-display text-2xl leading-snug text-plum">
            Em atualização
          </p>
          <p className="mt-3 font-display text-lg leading-snug text-ink">
            {PLAIN_MEANING[indicator.id] ?? indicator.label}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Aguardando a nova fotografia da base do TSE.
          </p>
        </>
      )}
    </article>
  );
}


function DadosPage() {
  const { snapshot, pendingReviewBaseDate } = Route.useLoaderData();
  const pendingDate = snapshotDate(pendingReviewBaseDate ?? null);

  const indicators = applySnapshot(CURRENT_INDICATORS, snapshot);
  const [first, ...rest] = indicators;

  const baseDate = snapshotDate(snapshot?.baseGeneratedAt ?? null);
  const prop = snapshot?.universes.proporcional ?? null;
  const maj = snapshot?.universes.majoritario ?? null;
  const uf = topUf(snapshot);
  const propShare = prop && prop.total > 0 ? (prop.feminine / prop.total) * 100 : null;
  const majShare = maj && maj.total > 0 ? (maj.feminine / maj.total) * 100 : null;

  return (
    <PageShell>
      {/* 1. CAPA — pergunta, dados e arquitetura abstrata */}
      <section className="relative left-1/2 -ml-[50vw] w-screen border-b border-ink bg-cream">
        <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-[90rem] lg:grid-cols-[1.08fr_0.92fr]">
          <div className="flex flex-col justify-between px-5 pb-10 pt-16 md:px-10 md:pb-14 md:pt-24 lg:px-16">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink pb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              <span>Edição 2026 / Brasil</span>
              <span>Base TSE / {baseDate ?? "em atualização"}</span>
            </div>
            <div className="py-12 md:py-16">
              <p className="editorial-index">Mulheres, eleições e poder</p>
              <h1 className="mt-6 max-w-4xl font-display text-[clamp(3.4rem,8vw,7.8rem)] leading-[0.84] text-ink">
                Mais mulheres na disputa. Mas até onde elas chegam?
              </h1>
              <p className="mt-8 max-w-2xl border-l-4 border-solar pl-5 font-display text-xl leading-snug text-plum md:text-3xl">
                Entre se candidatar e chegar ao poder, onde elas desaparecem?
              </p>
              <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
                {CENTRAL_THESIS}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link to="/funil" className="border-2 border-ink bg-plum px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">
                  Ver o funil →
                </Link>
                <Link to="/metodo" className="border-2 border-ink bg-paper px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-solar">
                  Como lemos os dados
                </Link>
              </div>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              Pergunta → dado → interpretação
            </p>
          </div>
          <EditorialArtwork variant="home" className="min-h-[34rem] lg:min-h-full" />
        </div>
      </section>


      {/* 2. TESE + DIÁRIO DA ENTRADA */}
      <section className="rule-top grid gap-8 py-12 md:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div>
          <p className="kicker">A tese que investigamos</p>
          <h2 className="mt-3 font-display text-[clamp(1.7rem,4.6vw,2.8rem)] leading-[1.08] text-ink">
            Mulheres não estão ausentes da política.{" "}
            <span className="text-plum italic">
              Sua presença encolhe quando o poder se concentra.
            </span>
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
            A hipótese desta edição é de distribuição, não de ausência: quanto
            mais concentrado o cargo, menor a presença de mulheres. É uma
            hipótese a testar etapa por etapa — registro, recursos, votos,
            cadeiras e comando. Cada etapa é contada sobre o seu próprio total.
          </p>
        </div>

        <aside className="poster-frame-solar p-6 md:p-7">
          <p className="poster-eyebrow text-ink">Diário da entrada</p>
          {snapshot ? (
            <>
              <p className="poster-figure mt-5 text-[clamp(2.9rem,10vw,4.75rem)] text-ink">
                {nf(snapshot.recordCount)}
              </p>
              <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.14em] text-muted-foreground">
                pedidos de registro na fotografia
              </p>

              <div className="mt-6 grid gap-4 border-t-2 border-ink pt-5 sm:grid-cols-2">
                <div>
                  <p className="poster-figure text-3xl text-plum">
                    {prop ? nf(prop.feminine) : "—"}
                  </p>
                  <p className="mt-1 font-display text-base leading-snug text-ink">
                    mulheres nas proporcionais
                  </p>
                  <p className="mt-1 font-mono text-[12px] text-muted-foreground">
                    {propShare !== null && prop
                      ? `${formatPercent(propShare)} · ${nf(prop.feminine)} de ${nf(prop.total)}`
                      : "em atualização"}
                  </p>
                </div>
                <div>
                  <p className="poster-figure text-3xl text-coral-ink">
                    {maj ? nf(maj.feminine) : "—"}
                  </p>
                  <p className="mt-1 font-display text-base leading-snug text-ink">
                    mulheres nas majoritárias
                  </p>
                  <p className="mt-1 font-mono text-[12px] text-muted-foreground">
                    {majShare !== null && maj
                      ? `${formatPercent(majShare)} · ${nf(maj.feminine)} de ${nf(maj.total)}`
                      : "em atualização"}
                  </p>
                </div>
              </div>

              <div className="mt-6 border-2 border-ink bg-ink px-4 py-3">
                <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-solar">
                  Primeiro marco
                </p>
                <p className="mt-1 text-sm leading-relaxed text-cream/85">
                  Esta é a primeira fotografia comparável do ciclo de 2026, com
                  a base de {baseDate ?? "data em atualização"}. Ela é
                  provisória: o registro ainda pode mudar por decisão da Justiça
                  Eleitoral. As eleições{" "}
                  <span className="text-solar">
                    <GlossaryTerm term="proporcional">
                      proporcionais
                    </GlossaryTerm>
                  </span>{" "}
                  e as{" "}
                  <span className="text-solar">
                    <GlossaryTerm term="majoritaria">majoritárias</GlossaryTerm>
                  </span>{" "}
                  são contadas separadamente.
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="mt-5 font-display text-2xl text-plum">
                Em atualização
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink/80">
                Aguardando a nova fotografia da base do TSE. Enquanto ela não
                entra, nenhum número é exibido aqui — a ausência de dado não é um
                zero.
              </p>
            </>
          )}
        </aside>
      </section>

      {/* 3. TRÊS ACHADOS */}
      <section className="rule-top py-14 md:py-20">
        <p className="kicker">2026 · fotografia em andamento</p>
        <h2 className="mt-3 max-w-3xl font-display text-[clamp(1.6rem,4.2vw,2.5rem)] leading-tight text-ink">
          O que os registros{" "}
          <span className="text-plum italic">permitem dizer agora</span>
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
          Tudo nesta parte da página é quem pediu registro para disputar 2026 —
          quem entrou na disputa. Não há resultado eleitoral aqui: a eleição
          acontece em novembro de 2026.
        </p>
        <div className="finding-strip mt-9 grid border-y-2 border-ink md:grid-cols-3">
          <FindingCard
            tag="Entrada proporcional"
            value={propShare !== null ? formatPercent(propShare) : null}
            meaning="das candidaturas proporcionais são de mulheres"
            denominator={
              prop ? `${nf(prop.feminine)} de ${nf(prop.total)} candidaturas` : null
            }
            date={baseDate}
          />
          <FindingCard
            tag="Comando majoritário"
            value={majShare !== null ? formatPercent(majShare) : null}
            meaning="das candidaturas majoritárias, de cargo único, são de mulheres"
            denominator={
              maj ? `${nf(maj.feminine)} de ${nf(maj.total)} candidaturas` : null
            }
            date={baseDate}
          />
          <FindingCard
            tag="Território"
            value={uf ? formatPercent(uf.share) : null}
            meaning={
              uf
                ? `maior proporção de candidaturas femininas nas proporcionais entre as unidades da federação: ${uf.uf}`
                : "maior proporção de candidaturas femininas nas proporcionais entre as unidades da federação"
            }
            denominator={
              uf
                ? `${nf(uf.f)} de ${nf(uf.t)} candidaturas em ${uf.uf} · composição das listas registradas, não desempenho eleitoral`
                : null
            }
            date={baseDate}
          />
        </div>
        <UfGrid snapshot={snapshot} baseDate={baseDate} />

        <p className="mt-6 font-mono text-[12px] text-muted-foreground">
          Dados de {baseDate ?? "data em atualização"}.
          {pendingDate
            ? ` Uma atualização (dados de ${pendingDate}) está em conferência.`
            : ""}
        </p>
        <p className="mt-2 font-mono text-[12px] text-muted-foreground">
          Fonte: TSE · Candidaturas 2026 ·{" "}
          <Link to="/metodo" className="text-plum underline underline-offset-4">
            ver o método
          </Link>
        </p>

      </section>

      

      {/* CONTEXTO HISTÓRICO — ELEIÇÕES FECHADAS */}
      <SectionBlock
        kicker="Eleições já encerradas · 2014 · 2018 · 2022"
        question="O que aconteceu depois da candidatura, nas eleições que já terminaram."
        lead={
          <>
            <p>
              Aqui não se trata de 2026. São três eleições concluídas, com
              resultado publicado, que mostram o que acontece entre entrar na
              disputa e ocupar a cadeira.
            </p>
            <p>
              Em 2022, mulheres foram 34,1% das candidaturas proporcionais e
              17,7% das eleitas no 1º turno.{" "}
              {prop
                ? `Em 2026, são ${formatPct((prop.feminine / prop.total) * 100)} das candidaturas proporcionais`
                : "Em 2026, o percentual de candidaturas proporcionais está em atualização"}{" "}
              — a comparação possível é de entrada com entrada: um ciclo já
              terminou, o outro está começando.
            </p>

          </>
        }
        source="Fonte: TSE — candidatos e resultados 2014/2018/2022/2026"
      >
        <HistoryFunnel />

        <div className="mt-12">
          <p className="kicker">Quantas candidaturas viraram cadeira</p>
          <h3 className="mt-3 max-w-3xl font-display text-[clamp(1.3rem,3.4vw,1.9rem)] leading-tight text-ink">
            A mesma pergunta, feita para os dois grupos:{" "}
            <span className="text-plum italic">
              de cada 100 candidaturas, quantas chegaram à cadeira?
            </span>
          </h3>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
            Cada taxa é calculada dentro do próprio grupo: eleitas mulheres sobre
            candidaturas de mulheres, eleitos homens sobre candidaturas de
            homens. É uma descrição do que a base registra — não mede qualidade
            de campanha, nem prova o que produziu a diferença.
          </p>
          <div className="mt-6">
            <ElectionRateByGender />
          </div>
        </div>
      </SectionBlock>

      {/* SEGUNDA PERGUNTA CENTRAL — QUAIS MULHERES? */}
      <SectionBlock
        kicker="A segunda pergunta desta investigação"
        question="Quais mulheres?"
        lead={
          <>
            <p>
              Até aqui a pergunta foi “quantas mulheres”. Ela é insuficiente:
              mulheres não formam um bloco homogêneo, e o caminho até o poder não
              é o mesmo para todas. A partir daqui a investigação passa a ter
              duas perguntas centrais, e a segunda é sobre cor/raça.
            </p>
            <p>
              De um lado, as mulheres brasileiras no Censo de 2022. Do outro, as
              candidaturas de mulheres às proporcionais de 2026 (TSE). São
              contagens distintas, colocadas lado a lado para comparar tamanhos.
            </p>
          </>
        }
      >
        <RaceFinding2026 snapshot={snapshot} />
      </SectionBlock>

      {/* QUEM SÃO ELAS */}
      <SectionBlock
        kicker="Quem são elas?"
        question="Não existe uma candidata média."
        align="wide"
        lead={<p>{CENTRAL_PRINCIPLE}</p>}
        source={
          <>
            Fonte: TSE · Candidaturas 2026
            {baseDate ? ` · fotografia da base de ${baseDate}` : ""} ·{" "}
            <Link to="/metodo" className="text-plum underline underline-offset-4">
              ver o método
            </Link>
          </>
        }
      >
        <RaceBreakdown snapshot={snapshot} />
      </SectionBlock>

      {/* DOIS UNIVERSOS — bloco colorido */}
      <SectionBlock
        tone="plum"
        kicker="Dois universos"
        question="A regra muda conforme o cargo."
        lead={
          <p>
            As regras não são as mesmas nos dois universos. Nas eleições
            proporcionais existe uma regra de composição de candidaturas por
            gênero, aplicada por partido ou{" "}
            <GlossaryTerm term="federacao">federação</GlossaryTerm>. Nas
            majoritárias, em que cada partido lança um nome por cargo, essa regra
            não se aplica.
          </p>
        }
      >
        <div className="grid gap-6 md:grid-cols-2">
          <article className="poster-frame p-6">
            <h3 className="font-display text-xl text-ink">Proporcional</h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              Câmara dos Deputados, assembleias legislativas e Câmara Legislativa
              do Distrito Federal.
            </p>
            <p className="mt-4 font-mono text-[12px] uppercase tracking-wider text-plum">
              com a regra de composição de 30%–70% por gênero
            </p>
          </article>
          <article className="poster-frame p-6">
            <h3 className="font-display text-xl text-ink">Majoritária</h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              Presidência, governos estaduais e do Distrito Federal e Senado.
            </p>
            <p className="mt-4 font-mono text-[12px] uppercase tracking-wider text-coral-ink">
              sem a regra de composição de 30%–70% por gênero
            </p>
          </article>
        </div>

        <div className="mt-6">
          <ContextBox variant="significa" title="A cota de 30% (Lei 9.504/1997)">
            <p>
              A lei obriga cada partido ou federação a preencher no mínimo 30%
              das candidaturas proporcionais com cada gênero — daí a faixa de
              30%–70%. É{" "}
              <GlossaryTerm term="cota">cota</GlossaryTerm> de candidatura, não
              de cadeira: trata de quem entra na disputa, não de quem é eleita.
            </p>
          </ContextBox>
        </div>
      </SectionBlock>

      {/* O FUNIL */}
      <SectionBlock
        kicker="O funil"
        question="Entre entrar na disputa e chegar ao poder, há um caminho — e ele filtra."
        align="wide"
        lead={
          <p>
            “Funil” aqui é o roteiro de perguntas que este observatório persegue
            — contexto, competição e poder —, não uma medição do que aconteceu em
            2026. Cada etapa tem sua própria fonte e será publicada quando essa
            fonte existir.

          </p>
        }
      >
        <ol className="grid gap-4 md:grid-cols-3">
          {FUNNEL_LAYERS.map((layer, i) => (
            <li key={layer.id} className="poster-frame p-5">
              <span className="poster-figure text-2xl text-plum">
                0{i + 1}
              </span>
              <h3 className="mt-1 font-display text-xl text-ink">
                {layer.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {layer.lead}
              </p>
              <ul className="mt-4 space-y-1">
                {layer.steps.map((s) => (
                  <li
                    key={s.id}
                    className="flex items-center justify-between gap-2 border-t border-rule pt-1 font-mono text-[12px] text-muted-foreground"
                  >
                    <span>{s.label}</span>
                    <StatusTag tone={s.pending ? "pending" : "ok"}>
                      {s.pending ? "sem dado" : "com dado"}
                    </StatusTag>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <Link
          to="/funil"
          className="mt-8 inline-flex rounded-md border-2 border-ink bg-plum px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-plum-soft"
        >
          Explorar o funil →
        </Link>
      </SectionBlock>


      {/* COMO SABEMOS */}
      <SectionBlock
        tone="ink"
        kicker="Como sabemos?"
        question="Dados para perguntar. Método para conferir."
        lead={
          <p>
            Todo indicador aparece com fonte, universo, denominador, fórmula e
            data. Quando um dado ainda não existe, dizemos exatamente o que falta.
          </p>
        }
      >
        <Link
          to="/metodo"
          className="inline-flex rounded-md border-2 border-solar px-5 py-2.5 text-sm font-semibold text-solar transition-colors hover:bg-solar hover:text-ink"
        >
          Conheça o método →
        </Link>
      </SectionBlock>

      <NextAxes ids={["funil", "direitos", "metodo"]} />
    </PageShell>
  );
}
