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
import {
  DISPUTE_GAP,
  DISPUTE_ITEMS,
  DISPUTE_RULE,
} from "@/data/rules-in-dispute";
import feministasAsset from "@/assets/feministas.webp.asset.json";
import respiroFundoAsset from "@/assets/respirocomfundo.webp.asset.json";
import { PullQuote } from "@/components/editorial/PullQuote";

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
        wide
        kicker="Direitos"
        question="Nada foi dado. Tudo foi disputado."
        lead={
          <p>
            A presença de mulheres nas eleições brasileiras não é espontânea: é
            resultado de normas conquistadas em momentos distintos, cada uma com
            alcance limitado e disputa própria.
          </p>
        }
        image={feministasAsset.url}
        imageAlt="Ilustração editorial: marcha de mulheres com cartazes e urnas"
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
        lead={
          <>
            <p className="font-display text-xl leading-snug text-ink">
              Uma lei é um marco. Não é a linha de chegada.
            </p>
            <p className="mt-3">{RIGHTS_TIMELINE_RULE}</p>
          </>
        }
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
      </SectionBlock>

      {/* EM DISPUTA — presente das regras, na sequência da linha do tempo */}
      <SectionBlock
        kicker="Em disputa"
        question="As regras também estão em disputa"
        align="wide"
        lead={
          <p>
            As normas que organizam a participação de mulheres nas eleições não
            são estáveis: mudam por lei, por resolução e por decisão judicial —
            muitas vezes no meio do ciclo eleitoral. Projeto apresentado não é
            projeto aprovado, e situação em tramitação não antecipa resultado.
          </p>
        }
      >
        <ul className="space-y-4">
          {DISPUTE_ITEMS.map((item) => (
            <li key={item.id} className="editorial-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {item.kind}
                  </p>
                  <h3 className="mt-1 max-w-2xl font-display text-xl leading-snug text-ink">
                    {item.title}
                  </h3>
                </div>
                <StatusTag tone={item.status === "EM VIGOR" ? "ok" : "pending"}>
                  {item.status}
                </StatusTag>
              </div>

              <dl className="mt-4 space-y-3 text-sm leading-relaxed">
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    O que propõe
                  </dt>
                  <dd className="mt-1 text-ink">{item.proposal}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    Quem seria afetado
                  </dt>
                  <dd className="mt-1 text-muted-foreground">{item.affects}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    Situação
                  </dt>
                  <dd className="mt-1 text-muted-foreground">
                    {item.statusNote}
                  </dd>
                </div>
              </dl>

              <p className="mt-4 font-mono text-[11px] text-muted-foreground">
                Fonte:{" "}
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  {item.sourceLabel}
                </a>{" "}
                · Última verificação pelo observatório:{" "}
                {item.checkedAt ?? "a registrar"}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-6 space-y-3">
          <GapNote label="Lacuna declarada">{DISPUTE_GAP}</GapNote>
          <GapNote label="Regra editorial">{DISPUTE_RULE}</GapNote>
        </div>
      </SectionBlock>

      <SectionBlock
        kicker="Como ler uma regra em tramitação"
        question="Três distinções que evitam erro"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <ContextBox variant="significa">
            <p>
              Apresentado, aprovado em comissão, aprovado em plenário e
              sancionado são estágios distintos. Só o último produz norma.
            </p>
          </ContextBox>
          <ContextBox variant="importa">
            <p>
              Resolução do TSE organiza a aplicação das regras de um ciclo; não
              cria direito novo além do que a lei e a Constituição autorizam.
            </p>
          </ContextBox>
          <ContextBox variant="calculamos">
            <p>
              Não atribuímos efeito estatístico a uma regra sem desenho
              metodológico que permita isolar esse efeito. Contraste antes e
              depois não é prova de causa.
            </p>
          </ContextBox>
        </div>
        <p className="mt-6 font-mono text-[11px] text-muted-foreground">
          Fórmulas, filtros e limitações em{" "}
          <Link to="/metodo" className="text-plum underline underline-offset-4">
            Método
          </Link>
        </p>
      </SectionBlock>

      <NextAxes ids={["dados-2026", "funil", "metodo"]} />
    </PageShell>
  );
}
