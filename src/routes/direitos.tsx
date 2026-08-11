import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/editorial/PageHero";
import { SectionBlock } from "@/components/editorial/SectionBlock";
import { InBrief } from "@/components/editorial/InBrief";
import { ContextBox } from "@/components/editorial/ContextBox";
import { StatusTag } from "@/components/editorial/StatusTag";
import { NextAxes } from "@/components/editorial/NextAxes";
import { GapNote } from "@/components/GapNote";
import { RIGHTS_TIMELINE, RIGHTS_TIMELINE_RULE } from "@/data/rights-timeline";
import { RIGHTS_OPEN_QUESTIONS } from "@/data/election-2026";
import timelineImage from "@/assets/timeline-editorial.png";

export const Route = createFileRoute("/direitos")({
  head: () => ({
    meta: [
      { title: "Direitos — Quem são elas? | Como chegamos até aqui" },
      {
        name: "description",
        content:
          "De 1932 a 2026: cada marco jurídico dos direitos políticos das mulheres em conquista, regra, disputa, implementação e consequência, com fonte normativa específica.",
      },
      { property: "og:title", content: "Direitos — como chegamos até aqui" },
      {
        property: "og:description",
        content:
          "As regras que abriram a disputa às mulheres, marco por marco — e o que cada uma delas ainda não alcança.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DireitosPage,
});

const FIELDS = [
  { key: "achievement", label: "Conquista" },
  { key: "rule", label: "Regra" },
  { key: "dispute", label: "Disputa" },
  { key: "implementation", label: "Implementação" },
  { key: "consequence", label: "Consequência" },
] as const;

function DireitosPage() {
  return (
    <PageShell>
      <PageHero
        kicker="Direitos"
        question="Como chegamos até aqui?"
        lead={
          <p>
            A presença de mulheres nas eleições brasileiras não é espontânea: é
            resultado de normas conquistadas em momentos distintos, cada uma com
            alcance limitado e disputa própria.
          </p>
        }
        image={timelineImage}
        imageAlt="Ilustração editorial: linha do tempo dos direitos políticos das mulheres"
      />

      <div className="pb-4">
        <InBrief
          found={
            <>
              Onze marcos entre 1932 e 2026. Nenhum deles produziu igualdade
              imediata: cada um criou uma regra nova e, com ela, uma nova disputa
              sobre implementação.
            </>
          }
          matters={
            <>
              Saber o que cada regra alcança evita atribuir a ela efeitos que não
              estão no seu escopo — como esperar que uma regra sobre registro de
              candidaturas resolva a distribuição de dinheiro.
            </>
          }
          unknown={
            <>
              O efeito isolado de cada norma sobre a presença de mulheres. Medir
              isso exigiria desenho metodológico próprio, que este eixo não faz.
            </>
          }
        />
      </div>

      <SectionBlock
        kicker="Linha do tempo"
        question="Cada marco em cinco perguntas"
        align="wide"
        lead={<p>{RIGHTS_TIMELINE_RULE}</p>}
      >
        <ol className="space-y-6 border-l-2 border-plum pl-6">
          {RIGHTS_TIMELINE.map((m) => (
            <li key={m.year} className="relative">
              <span
                aria-hidden
                className="absolute -left-[31px] top-2 h-3.5 w-3.5 rounded-full border-2 border-plum bg-paper"
              />
              <div className="editorial-card p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <p className="data-figure text-3xl text-plum">{m.year}</p>
                  {m.needsReview && (
                    <StatusTag tone="limit">redação a conferir</StatusTag>
                  )}
                </div>
                <h3 className="mt-1 max-w-2xl font-display text-xl leading-snug text-ink">
                  {m.title}
                </h3>
                <dl className="mt-4 space-y-3">
                  {FIELDS.map((f) => (
                    <div key={f.key} className="sm:flex sm:gap-5">
                      <dt className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-muted-foreground sm:w-36 sm:pt-0.5">
                        {f.label}
                      </dt>
                      <dd className="mt-1 text-sm leading-relaxed text-ink sm:mt-0">
                        {m[f.key]}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 font-mono text-[11px] text-muted-foreground">
                  Fonte:{" "}
                  <a
                    href={m.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    {m.sourceLabel}
                  </a>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </SectionBlock>

      <SectionBlock
        kicker="Limites em aberto"
        question="O que as regras ainda não alcançam"
      >
        <ul className="grid gap-4 md:grid-cols-2">
          {RIGHTS_OPEN_QUESTIONS.map((q) => (
            <li
              key={q}
              className="editorial-card p-5 text-sm leading-relaxed text-muted-foreground"
            >
              {q}
            </li>
          ))}
        </ul>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <ContextBox variant="significa">
            <p>
              Uma regra pode existir e não ser implementada. Conquista, vigência e
              efeito prático são três coisas diferentes.
            </p>
          </ContextBox>
          <ContextBox variant="importa">
            <p>
              Sem essa distinção, a leitura pública oscila entre “já existe cota,
              então está resolvido” e “a cota não serve para nada”. Nenhuma das
              duas descreve o que os dados mostram.
            </p>
          </ContextBox>
        </div>
        <div className="mt-6">
          <GapNote label="Limite desta versão">
            Marcos sinalizados como “redação a conferir” precisam de checagem
            final contra o texto normativo antes de circularem como definitivos.
            Nenhum marco sem fonte identificável é exibido.
          </GapNote>
        </div>
        <p className="mt-6 font-mono text-[11px] text-muted-foreground">
          Regras em discussão agora em{" "}
          <Link to="/em-disputa" className="text-plum underline underline-offset-4">
            Em disputa
          </Link>
        </p>
      </SectionBlock>

      <NextAxes ids={["em-disputa", "condicoes", "metodo"]} />
    </PageShell>
  );
}
