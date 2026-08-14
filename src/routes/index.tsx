import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { SectionBlock } from "@/components/editorial/SectionBlock";
import { ContextBox } from "@/components/editorial/ContextBox";
import { RaceBreakdown } from "@/components/editorial/RaceBreakdown";
import { NextAxes } from "@/components/editorial/NextAxes";
import { StatusTag } from "@/components/editorial/StatusTag";
import { UfGrid } from "@/components/editorial/UfGrid";


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
import { PullQuote } from "@/components/editorial/PullQuote";
import topoAsset from "@/assets/mulheresnotopo.webp.asset.json";

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

const nf = (n: number) => n.toLocaleString("pt-BR");

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
          <p className="poster-figure mt-4 text-[clamp(2.6rem,7vw,4rem)] text-coral">
            {value}
          </p>
          <p className="mt-3 font-display text-lg leading-snug text-ink">
            {meaning}
          </p>
          {denominator && (
            <p className="mt-2 font-mono text-[11px] text-muted-foreground">
              {denominator}
            </p>
          )}
          {date && (
            <p className="font-mono text-[11px] text-muted-foreground">
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
            <p className="mt-2 font-mono text-[11px] text-muted-foreground">
              {nf(indicator.numerator)} de {nf(indicator.denominator)}{" "}
              candidaturas
            </p>
          )}
          {date && (
            <p className="font-mono text-[11px] text-muted-foreground">
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

const INVESTIGATION_PLAN = [
  {
    n: "01",
    text: "Fechar o dicionário de partidos e federações da base de 2026 antes de qualquer agrupamento por campo político.",
  },
  {
    n: "02",
    text: "Publicar o critério de classificação com fonte externa citável, e não uma leitura própria de conveniência.",
  },
  {
    n: "03",
    text: "Só então cruzar candidaturas de mulheres por campo, sempre com denominador por universo eleitoral.",
  },
];

function DadosPage() {
  const { snapshot, historical, pendingReviewBaseDate } =
    Route.useLoaderData();
  const pendingDate = snapshotDate(pendingReviewBaseDate ?? null);

  const indicators = applySnapshot(CURRENT_INDICATORS, snapshot);
  const feminineSeries =
    (historical.series as Series[]).find(
      (s) => s.id === "serie-mulheres-candidaturas",
    ) ?? null;
  const [first, ...rest] = indicators;

  const baseDate = snapshotDate(snapshot?.baseGeneratedAt ?? null);
  const prop = snapshot?.universes.proporcional ?? null;
  const maj = snapshot?.universes.majoritario ?? null;
  const uf = topUf(snapshot);
  const propShare = prop && prop.total > 0 ? (prop.feminine / prop.total) * 100 : null;
  const majShare = maj && maj.total > 0 ? (maj.feminine / maj.total) * 100 : null;

  return (
    <PageShell>
      {/* 1. HERO — ilustração full-bleed + painel de texto flutuante */}
      <section className="relative left-1/2 -ml-[50vw] w-screen">
        <img
          src={topoAsset.url}
          alt="Ilustração editorial: mulheres sobem rampas e escadas em direção a uma urna eleitoral"
          className="block h-[78vh] min-h-[520px] w-full object-cover md:h-[80vh]"
        />

        <span className="absolute right-4 top-4 rounded-md bg-paper/85 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink md:right-8 md:top-6">
          Dados parciais · Base do TSE · {baseDate ?? "base em atualização"}
        </span>

        <div className="absolute inset-x-4 bottom-6 md:inset-x-0 md:bottom-14">
          <div className="mx-auto max-w-6xl md:px-8">
            <div className="max-w-xl rounded-lg border-2 border-ink bg-paper/95 p-5 shadow-[9px_9px_0_0_var(--color-plum)] backdrop-blur-sm md:max-w-2xl md:p-8">
              <p className="poster-eyebrow border-coral text-coral">
                Edição atual · Eleições 2026 · Brasil
              </p>
              <h1 className="mt-4 font-display text-[clamp(1.6rem,5vw,3.1rem)] leading-[1.03] text-ink">
                Entre se candidatar e chegar ao poder,{" "}
                <span className="text-plum italic">onde elas desaparecem?</span>
              </h1>
              <p className="mt-4 leading-relaxed text-muted-foreground md:text-lg">
                {CENTRAL_THESIS}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link
                  to="/funil"
                  className="rounded-md border-2 border-ink bg-plum px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-plum-soft"
                >
                  Ver o funil
                </Link>
                <Link
                  to="/metodo"
                  className="rounded-md border-2 border-ink bg-paper px-5 py-2.5 text-sm font-semibold text-plum transition-colors hover:bg-secondary"
                >
                  Como lemos os dados
                </Link>
              </div>
            </div>
          </div>
        </div>

        <p className="absolute left-3 top-16 max-w-[70%] md:left-auto md:top-auto md:bottom-2 md:right-3 rounded bg-ink/70 px-2 py-1 text-right font-mono text-[9px] leading-tight text-cream/80 md:text-[10px]">
          Ilustração original gerada com inteligência artificial sob direção
          editorial.
        </p>
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
            A hipótese que orienta esta edição é de distribuição, não de
            ausência: quanto mais concentrado o cargo, menor a presença. É uma
            hipótese a testar etapa por etapa — registro, recursos, votos,
            cadeiras e comando — com denominador próprio em cada uma. Nenhum
            contraste desta página, isolado, prova causa.
          </p>
        </div>

        <aside className="poster-frame-solar p-6 md:p-7">
          <p className="poster-eyebrow text-ink">Diário da entrada</p>
          {snapshot ? (
            <>
              <p className="poster-figure mt-5 text-[clamp(2.9rem,10vw,4.75rem)] text-ink">
                {nf(snapshot.recordCount)}
              </p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
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
                  <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                    {propShare !== null && prop
                      ? `${formatPercent(propShare)} · ${nf(prop.feminine)} de ${nf(prop.total)}`
                      : "em atualização"}
                  </p>
                </div>
                <div>
                  <p className="poster-figure text-3xl text-coral">
                    {maj ? nf(maj.feminine) : "—"}
                  </p>
                  <p className="mt-1 font-display text-base leading-snug text-ink">
                    mulheres nas majoritárias
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                    {majShare !== null && maj
                      ? `${formatPercent(majShare)} · ${nf(maj.feminine)} de ${nf(maj.total)}`
                      : "em atualização"}
                  </p>
                </div>
              </div>

              <div className="mt-6 border-2 border-ink bg-ink px-4 py-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-solar">
                  Primeiro marco
                </p>
                <p className="mt-1 text-sm leading-relaxed text-cream/85">
                  Esta é a primeira fotografia comparável do ciclo de 2026.
                  Fotografia da base de {baseDate ?? "data em atualização"} —
                  provisória: o registro ainda pode mudar por decisão da Justiça
                  Eleitoral. Os dois universos têm denominadores próprios e não
                  são somados.
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="mt-5 font-display text-2xl text-plum">
                Em atualização
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink/80">
                Aguardando a nova fotografia da base do TSE. Dado não disponível
                não é zero.
              </p>
            </>
          )}
        </aside>
      </section>

      {/* 3. TRÊS ACHADOS */}
      <section className="rule-top py-12 md:py-14">
        <p className="kicker">Três achados desta fotografia</p>
        <h2 className="mt-3 max-w-3xl font-display text-[clamp(1.6rem,4.2vw,2.5rem)] leading-tight text-ink">
          O que os registros{" "}
          <span className="text-plum italic">permitem dizer agora</span>
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
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
                ? `maior presença feminina proporcional entre as unidades da federação: ${uf.uf}`
                : "maior presença feminina proporcional entre as unidades da federação"
            }
            denominator={
              uf ? `${nf(uf.f)} de ${nf(uf.t)} candidaturas em ${uf.uf}` : null
            }
            date={baseDate}
          />
        </div>
        <UfGrid snapshot={snapshot} baseDate={baseDate} />

        <p className="mt-6 font-mono text-[11px] text-muted-foreground">
          Dados de {baseDate ?? "data em atualização"}.
          {pendingDate
            ? ` Uma atualização (dados de ${pendingDate}) está em conferência.`
            : ""}
        </p>
        <p className="mt-2 font-mono text-[11px] text-muted-foreground">
          Fonte: TSE · Candidaturas 2026 ·{" "}
          <Link to="/metodo" className="text-plum underline underline-offset-4">
            ver o método
          </Link>
        </p>

      </section>

      {/* 4. INVESTIGAÇÃO CENTRAL — bloco amarelo chapado */}
      <section className="my-10 rounded-lg border-2 border-ink bg-solar px-5 py-12 text-ink shadow-[7px_7px_0_0_var(--color-ink)] md:px-10 md:py-14">
        <div className="flex flex-wrap items-center gap-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-plum">
            Investigação central
          </p>
          <span className="poster-eyebrow bg-ink text-cream">
            Em apuração metodológica
          </span>
        </div>
        <h2 className="mt-4 max-w-3xl font-display text-[clamp(1.6rem,4.4vw,2.6rem)] leading-tight">
          As candidaturas de mulheres não se distribuem igualmente entre os
          campos políticos —{" "}
          <span className="text-plum italic">
            mas isso só será publicado com critério auditável.
          </span>
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-ink/80">
          A base do TSE traz partido e forma de agremiação, não campo
          ideológico. Qualquer agrupamento por campo é uma classificação
          editorial, e por isso ela precisa de critério declarado antes de
          qualquer número. Até lá, não publicamos percentual por campo.
        </p>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {INVESTIGATION_PLAN.map((item) => (
            <li key={item.n} className="border-t-2 border-ink pt-3">
              <span className="poster-figure text-2xl text-plum">{item.n}</span>
              <p className="mt-2 text-sm leading-relaxed text-ink/85">
                {item.text}
              </p>
            </li>
          ))}
        </ol>
      </section>
      <PullQuote>Dado não disponível não é zero.</PullQuote>


      {/* CONTEXTO HISTÓRICO */}
      <SectionBlock
        kicker="Como isso se compara ao passado"
        question="O funil se repete: mais mulheres entram do que chegam."
        lead={
          <p>
            Candidatura e eleição não são a mesma coisa. Para cada ano fechado,
            o funil mostra a participação feminina no registro e a participação
            feminina entre as eleitas — com o recorte de raça por dentro. Cada
            etapa tem denominador próprio; os percentuais não se somam.
          </p>
        }
        source="Fonte: TSE — candidatos e resultados 2014/2018/2022/2026"
      >
        <HistoryFunnel />
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
            gênero, aplicada por partido ou federação. Nas majoritárias, de cargo
            único, essa regra não se aplica.
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
            <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-plum">
              com a regra de composição de 30%–70% por gênero
            </p>
          </article>
          <article className="poster-frame p-6">
            <h3 className="font-display text-xl text-ink">Majoritária</h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              Presidência, governos estaduais e do Distrito Federal e Senado.
            </p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-coral">
              sem a regra de composição de 30%–70% por gênero
            </p>
          </article>
        </div>
      </SectionBlock>

      {/* O FUNIL */}
      <SectionBlock
        kicker="O funil"
        question="Entre entrar na disputa e chegar ao poder, há um caminho — e ele filtra."
        align="wide"
        lead={
          <p>
            Contexto, competição e poder. Cada etapa tem universo, denominador e
            fonte próprios: o funil organiza perguntas, não uma subtração.
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
                    className="flex items-center justify-between gap-2 border-t border-rule pt-1 font-mono text-[11px] text-muted-foreground"
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

      {/* QUEM SÃO ELAS */}
      <SectionBlock
        kicker="Quem são elas?"
        question="Não existe uma candidata média."
        align="wide"
        lead={<p>{CENTRAL_PRINCIPLE}</p>}
        source={
          <>
            Fonte: TSE · Candidaturas 2026 ·{" "}
            <Link to="/metodo" className="text-plum underline underline-offset-4">
              ver o método
            </Link>
          </>
        }
      >
        <RaceBreakdown snapshot={snapshot} />
      </SectionBlock>

      {/* COMO SABEMOS */}
      <SectionBlock
        tone="ink"
        kicker="Como sabemos?"
        question="Dados para perguntar. Método para conferir."
        lead={
          <p>
            Todo indicador aparece com fonte, universo, denominador, fórmula e
            data. Quando um dado ainda não existe, dizemos exatamente o que falta:
            dado não disponível não é zero.
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
