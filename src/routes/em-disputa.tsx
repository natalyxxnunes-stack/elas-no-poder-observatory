import { createFileRoute, Link } from "@tanstack/react-router";
import { UnpublishedAxis } from "@/components/editorial/UnpublishedAxis";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/editorial/PageHero";
import { SectionBlock } from "@/components/editorial/SectionBlock";
import { InBrief } from "@/components/editorial/InBrief";
import { ContextBox } from "@/components/editorial/ContextBox";
import { StatusTag } from "@/components/editorial/StatusTag";
import { NextAxes } from "@/components/editorial/NextAxes";
import { GapNote } from "@/components/GapNote";
import {
  DISPUTE_GAP,
  DISPUTE_ITEMS,
  DISPUTE_RULE,
} from "@/data/rules-in-dispute";

/**
 * ROTA DESPUBLICADA (lançamento de 5 páginas).
 * Arquivo preservado intencionalmente para republicação futura: o conteúdo e os
 * componentes seguem intactos, apenas o acesso público está redirecionado.
 */
export const Route = createFileRoute("/em-disputa")({
  head: () => ({
    meta: [
      { title: "Em disputa — Quem são elas? | As regras também estão em disputa" },
      {
        name: "description",
        content:
          "Projetos, resoluções e decisões que podem mudar as regras da participação de mulheres nas eleições — com situação verificada e a regra de que projeto apresentado não é projeto aprovado.",
      },
      { property: "og:title", content: "As regras também estão em disputa" },
      {
        property: "og:description",
        content:
          "O que propõe, quem seria afetado, em que situação está e qual é a fonte de cada regra em discussão.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <UnpublishedAxis axisId="em-disputa" />,
});

/* Conteúdo preservado para publicação futura deste eixo (não referenciado pela rota). */
/* eslint-disable @typescript-eslint/no-unused-vars */

function EmDisputaPage() {
  return (
    <PageShell>
      <PageHero
        kicker="Em disputa"
        question="As regras também estão em disputa"
        lead={
          <p>
            As normas que organizam a participação de mulheres nas eleições não
            são estáveis: mudam por lei, por resolução e por decisão judicial —
            muitas vezes no meio do ciclo eleitoral.
          </p>
        }
        aside={
          <div className="editorial-card p-5">
            <p className="kicker">Regra editorial</p>
            <p className="mt-2 font-display text-lg leading-snug text-ink">
              Projeto apresentado não é projeto aprovado.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Situação em tramitação não antecipa resultado.
            </p>
          </div>
        }
      />

      <div className="pb-4">
        <InBrief
          found={
            <>
              As regras em vigor no ciclo de 2026 combinam composição de
              candidaturas, destinação de recursos e incentivos de distribuição
              partidária — cada uma com alcance diferente.
            </>
          }
          matters={
            <>
              Uma mudança de regra altera a leitura de qualquer série histórica:
              comparar ciclos sem considerar a regra vigente produz conclusão
              falsa.
            </>
          }
          unknown={
            <>
              O desfecho das proposições em tramitação e o efeito concreto das
              normas de 2026, que só poderá ser avaliado com as prestações de
              contas e o resultado da eleição.
            </>
          }
        />
      </div>

      <SectionBlock
        kicker="Acompanhamento"
        question="O que está em vigor e o que segue em discussão"
        align="wide"
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
          Histórico das regras em{" "}
          <Link to="/direitos" className="text-plum underline underline-offset-4">
            Direitos
          </Link>
        </p>
      </SectionBlock>

      <NextAxes ids={["direitos", "metodo", "quem-controla"]} />
    </PageShell>
  );
}
