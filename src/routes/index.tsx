import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { SectionBlock } from "@/components/editorial/SectionBlock";
import { ContextBox } from "@/components/editorial/ContextBox";
import { RaceBreakdown } from "@/components/editorial/RaceBreakdown";
import { NextAxes } from "@/components/editorial/NextAxes";
import { StatusTag } from "@/components/editorial/StatusTag";
import {
  CENTRAL_PRINCIPLE,
  CENTRAL_THESIS,
  COVER_QUESTION,
  FUNNEL_LAYERS,
} from "@/data/architecture";
import {
  CURRENT_INDICATORS,
  SITE,
  formatPercent,
  formatPoints,
  type Indicator,
} from "@/data/election-2026";
import { applySnapshot } from "@/lib/tse/indicators";
import { getLatestTseSnapshot } from "@/lib/tse/snapshot.functions";
import { getHistoricalSeries } from "@/lib/tse/historical.functions";
import type { Series } from "@/lib/tse/historical-compute";
import { PastStrip } from "@/components/funnel/PastStrip";
import { GapNote } from "@/components/GapNote";
import { PageHero } from "@/components/editorial/PageHero";
import { HeroNumber } from "@/components/editorial/HeroNumber";
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
    const [snapshot, historical] = await Promise.all([
      getLatestTseSnapshot(),
      getHistoricalSeries(),
    ]);
    return { snapshot, historical };
  },
  component: DadosPage,
});

function snapshotDate(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

const PLAIN_MEANING: Record<string, string> = {
  "participacao-feminina-proporcional":
    "Mulheres entre as candidaturas proporcionais",
  "participacao-feminina-majoritario":
    "Mulheres entre as candidaturas majoritárias",
  "diferenca-universos":
    "Distância entre os dois universos, em pontos percentuais",
};

function IndicatorCard({
  indicator,
  featured,
}: {
  indicator: Indicator;
  featured?: boolean;
}) {
  const isPoints = indicator.unit === "p.p.";
  const hasValue =
    indicator.value !== null && (isPoints || indicator.denominator !== null);
  const date = snapshotDate(indicator.baseGeneratedAt);

  return (
    <article className={`editorial-card p-6 ${featured ? "border-plum" : ""}`}>
      {hasValue ? (
        <>
          <p
            className={`data-figure text-plum ${featured ? "text-6xl md:text-7xl" : "text-5xl"}`}
          >
            {isPoints
              ? formatPoints(indicator.value)
              : formatPercent(indicator.value)}
          </p>
          <p className="mt-3 font-display text-lg leading-snug text-ink">
            {PLAIN_MEANING[indicator.id] ?? indicator.label}
          </p>
          {indicator.numerator !== null && indicator.denominator !== null && (
            <p className="mt-2 font-mono text-[11px] text-muted-foreground">
              {indicator.numerator.toLocaleString("pt-BR")} de{" "}
              {indicator.denominator.toLocaleString("pt-BR")} candidaturas
            </p>
          )}
          {date && (
            <p className="mt-1 font-mono text-[11px] text-muted-foreground">
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
  const { snapshot, historical } = Route.useLoaderData();
  const indicators = applySnapshot(CURRENT_INDICATORS, snapshot);
  const feminineSeries =
    (historical.series as Series[]).find(
      (s) => s.id === "serie-mulheres-candidaturas",
    ) ?? null;
  const [first, ...rest] = indicators;

  return (
    <PageShell>
      {/* ABERTURA — ilustração larga protagonista + título editorial */}
      <PageHero
        wide
        kicker={SITE.cycle}
        question="Quem entra, quem avança e onde a presença diminui."
        lead={
          <>
            <p>{CENTRAL_THESIS}</p>
            <p className="mt-3 font-display text-lg text-ink md:text-xl">
              {COVER_QUESTION}
            </p>
          </>
        }
        image={topoAsset.url}
        imageAlt="Ilustração editorial: mulheres sobem rampas e escadas em direção a uma urna eleitoral"
        actions={
          <>
            <Link
              to="/funil"
              className="rounded-md bg-plum px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-plum-soft"
            >
              Ver o funil
            </Link>
            <Link
              to="/metodo"
              className="rounded-md border border-plum px-5 py-2.5 text-sm font-semibold text-plum transition-colors hover:bg-secondary"
            >
              Como lemos os dados
            </Link>
          </>
        }
      />

      {/* NÚMERO-HERÓI — etiqueta → número → significado → ressalva */}
      {first && <HeroNumber indicator={first} />}

      {/* A FOTOGRAFIA DE AGORA */}
      <SectionBlock
        kicker="A fotografia de agora"
        question="O que está acontecendo agora?"
        align="wide"
        lead={
          <p>
            As candidaturas de 2026 seguem sendo registradas e analisadas pela
            Justiça Eleitoral. Esta fotografia muda — e por isso ela sempre vem
            com a data da base que a originou.
          </p>
        }
        source={
          <>
            Fonte: TSE · Candidaturas 2026 ·{" "}
            <Link to="/metodo" className="text-plum underline underline-offset-4">
              ver o método
            </Link>
          </>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          {rest.map((indicator) => (
            <IndicatorCard key={indicator.id} indicator={indicator} />
          ))}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <ContextBox variant="significa">
            <p>
              Cada percentual tem numerador e denominador próprios: candidaturas
              de mulheres dentro do total de candidaturas do mesmo universo
              eleitoral.
            </p>
          </ContextBox>
          <ContextBox variant="importa">
            <p>
              A diferença entre os dois universos é medida em pontos percentuais
              (p.p.) e é descritiva. Ela abre uma investigação; não prova causa.
            </p>
          </ContextBox>
        </div>
      </SectionBlock>

      <PullQuote>Dado não disponível não é zero.</PullQuote>


      {/* CONTEXTO HISTÓRICO — série já auditada, leitura descritiva */}
      <SectionBlock
        kicker="Como chegamos até aqui"
        question="Uma fotografia mostra a desigualdade. A série mostra o movimento."
        lead={
          <p>
            Contexto curto para o número atual: a participação de mulheres nas
            candidaturas proporcionais das eleições gerais de 2014, 2018 e 2022,
            e a fotografia em curso de 2026. Cada ano tem denominador próprio e a
            comparação é descritiva.
          </p>
        }
        source="Fonte: TSE · Candidatos 2014, 2018, 2022 e 2026"
      >
        <div className="space-y-4">
          <PastStrip series={feminineSeries} />
          <GapNote label="Transparência">
            Anos anteriores são bases fechadas; 2026 ainda pode mudar por decisão
            da Justiça Eleitoral. Resultado eleitoral de 2026 não existe e nada é
            projetado.
          </GapNote>
        </div>
      </SectionBlock>

      {/* DOIS UNIVERSOS — bloco colorido, ritmo */}
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
          <article className="editorial-card p-6">
            <h3 className="font-display text-xl text-ink">Proporcional</h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              Câmara dos Deputados, assembleias legislativas e Câmara Legislativa
              do Distrito Federal.
            </p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-plum">
              com a regra de composição de 30%–70% por gênero
            </p>
          </article>
          <article className="editorial-card p-6">
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
        <ol className="grid gap-3 md:grid-cols-3">
          {FUNNEL_LAYERS.map((layer, i) => (
            <li key={layer.id} className="editorial-card p-5">
              <span className="font-mono text-[11px] text-muted-foreground">
                camada 0{i + 1}
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
          className="mt-8 inline-flex rounded-md bg-plum px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-plum-soft"
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
          className="inline-flex rounded-md border border-plum px-5 py-2.5 text-sm font-semibold text-plum transition-colors hover:bg-secondary"
        >
          Conheça o método →
        </Link>
      </SectionBlock>

      <NextAxes ids={["funil", "direitos", "metodo"]} />
    </PageShell>
  );
}
