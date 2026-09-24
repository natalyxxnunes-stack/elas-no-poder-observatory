import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { EditorialOpening } from "@/components/editorial/EditorialOpening";
import { SectionBlock } from "@/components/editorial/SectionBlock";
import { InBrief } from "@/components/editorial/InBrief";
import { ContextBox } from "@/components/editorial/ContextBox";
import { StatusTag } from "@/components/editorial/StatusTag";
import { NextAxes } from "@/components/editorial/NextAxes";
import { GapNote } from "@/components/GapNote";
import { DISPUTE_GAP, DISPUTE_ITEMS, DISPUTE_RULE } from "@/data/rules-in-dispute";
import { formatDateBR } from "@/lib/format-br";

/** ROTA PUBLICADA — acompanhamento editorial das regras em disputa. */
export const Route = createFileRoute("/em-disputa")({
  head: () => ({
    meta: [
      { title: "As regras que valem em 2026 | Quem são elas?" },
      {
        name: "description",
        content:
          "As regras que organizam a participação de mulheres nas eleições de 2026, com fonte e data de verificação de cada uma, e o que ainda pode mudá-las.",
      },
      { property: "og:title", content: "As regras que valem em 2026, e o que pode mudá-las" },
      {
        property: "og:description",
        content:
          "O que cada regra determina, quem ela afeta, em que situação está e qual é a fonte.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EmDisputaPage,
});

function EmDisputaPage() {
  const PUBLISHED_ITEMS = DISPUTE_ITEMS.filter((item) => Boolean(item.checkedAt));

  return (
    <PageShell breadcrumb={[{ label: "Investigação", to: "/investigacoes" }, { label: "Em disputa" }]}>
      <EditorialOpening
        variant="process"
        kicker="Em disputa"
        question="As regras que valem em 2026, e o que pode mudá-las"
        lead={
          <p>
            As normas que organizam a participação de mulheres nas eleições mudam por lei, por
            resolução e por decisão judicial, muitas vezes no meio do ciclo eleitoral. Aqui ficam as
            que valem em 2026, cada uma com fonte e data de verificação.
          </p>
        }
        steps={PUBLISHED_ITEMS.map((item) => item.title)}
      />

      <div className="pb-4">
        <InBrief
          foundLabel="O que vale hoje"
          mattersLabel="Por que a data da regra importa"
          unknownLabel="O que pode mudar depois daqui"
          found={
            <>
              As regras em vigor no ciclo de 2026 combinam composição de candidaturas, destinação de
              recursos e incentivos de distribuição partidária — cada uma com alcance diferente.
            </>
          }
          matters={
            <>
              Uma mudança de regra altera a leitura de qualquer série histórica: cada ciclo precisa
              ser lido com a regra que estava em vigor no período.
            </>
          }
          unknown={
            <>
              Em aberto: o desfecho das proposições em tramitação e o efeito concreto das normas de
              2026, avaliável com as prestações de contas e o resultado da eleição.
            </>
          }
        />
      </div>

      <SectionBlock
        kicker="Acompanhamento"
        question="O que está em vigor em 2026"
        align="wide"
      >
        <ul className="space-y-4">
          {PUBLISHED_ITEMS.map((item) => (
            <li key={item.id} className="editorial-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[12px] uppercase tracking-wider text-muted-foreground">
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
                  <dt className="font-mono text-[12px] uppercase tracking-wider text-muted-foreground">
                    O que propõe
                  </dt>
                  <dd className="mt-1 text-ink">{item.proposal}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[12px] uppercase tracking-wider text-muted-foreground">
                    Quem seria afetado
                  </dt>
                  <dd className="mt-1 text-muted-foreground">{item.affects}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[12px] uppercase tracking-wider text-muted-foreground">
                    Situação
                  </dt>
                  <dd className="mt-1 text-muted-foreground">{item.statusNote}</dd>
                </div>
              </dl>

              <p className="mt-4 font-mono text-[12px] text-muted-foreground">
                Fonte:{" "}
                <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="underline">
                  {item.sourceLabel}
                </a>{" "}
                · Verificado em {formatDateBR(item.checkedAt)}
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
        question="Três distinções para ler uma proposição"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <ContextBox variant="significa" title="Estágios de uma proposta em andamento">
            <p>
              Apresentado, aprovado em comissão, aprovado em plenário e sancionado são estágios
              distintos. Só o último produz norma.
            </p>
          </ContextBox>
          <ContextBox variant="importa" title="Até onde uma resolução do TSE vai">
            <p>
              Aqui o alcance é o inverso: uma resolução do TSE só organiza a aplicação de regras já
              existentes dentro do ciclo de 2026, sem criar direito novo. Uma proposta que muda esse
              alcance depende de lei ou de decisão do próprio Judiciário.
            </p>
          </ContextBox>
          <ContextBox variant="calculamos" title="Por que não existe efeito pra medir ainda">
            <p>
              Enquanto uma proposição está em tramitação, não existe efeito para medir: não há antes
              e depois, só um “antes” e uma expectativa. Qualquer leitura de impacto aqui seria
              estimativa, e o site não publica estimativa.
            </p>
          </ContextBox>
        </div>
        <p className="mt-6 font-mono text-[12px] text-muted-foreground">
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
