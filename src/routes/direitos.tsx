import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { EditorialOpening } from "@/components/editorial/EditorialOpening";
import { SectionBlock } from "@/components/editorial/SectionBlock";
import { InBrief } from "@/components/editorial/InBrief";
import { ContextBox } from "@/components/editorial/ContextBox";
import { StatusTag } from "@/components/editorial/StatusTag";
import { NextAxes } from "@/components/editorial/NextAxes";
import { GapNote } from "@/components/GapNote";
import { RIGHTS_TIMELINE, RIGHTS_TIMELINE_RULE } from "@/data/rights-timeline";
import { RIGHTS_OPEN_QUESTIONS } from "@/data/election-2026";
import { DISPUTE_ITEMS, DISPUTE_RULE } from "@/data/rules-in-dispute";
import { PullQuote } from "@/components/editorial/PullQuote";
import { GlossaryTerm } from "@/components/editorial/GlossaryTerm";

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
    <PageShell breadcrumb={[{ label: "Investigação", to: "/investigacoes" }, { label: "Direitos" }]}>
      <EditorialOpening
        variant="milestones"
        kicker="Direitos"
        question="Cada direito político das mulheres tem uma data e uma disputa por trás."
        lead={
          <p>
            A presença de mulheres nas eleições brasileiras é resultado de
            normas conquistadas em momentos distintos — cada uma com alcance
            próprio e uma disputa para sair do papel.
          </p>
        }
        milestones={RIGHTS_TIMELINE.slice(0, 6).map(({ year, title }) => ({ year, title }))}
      />

      <div className="pb-4">
        <InBrief
          foundLabel="Onze marcos, uma linha"
          mattersLabel="Onde cada regra para"
          unknownLabel="O que a linha não mede"
          found={
            <>
              Onze marcos entre 1932 e 2026. Cada um criou uma regra nova e, com
              ela, uma nova disputa sobre implementação.
            </>
          }
          matters={
            <>
              Cada regra alcança uma parte do caminho: a de registro de
              candidaturas, por exemplo, é uma coisa; a distribuição de dinheiro
              de campanha, outra. Ler cada marco no seu escopo mostra onde a
              disputa acontece hoje.
            </>
          }
          unknown={
            <>
              Em aberto: o efeito isolado de cada norma sobre a presença de
              mulheres, que só um desenho metodológico próprio permitiria medir.
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
              <div className="poster-frame p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <p className="poster-figure text-[2rem] text-plum md:text-[2.6rem]">
                    {m.year}
                  </p>
                </div>
                <h3 className="mt-1 max-w-2xl font-display text-xl leading-snug text-ink">
                  {m.title}
                </h3>
                <dl className="mt-4 space-y-3">
                  {FIELDS.map((f) => (
                    <div key={f.key} className="sm:flex sm:gap-5">
                      <dt className="shrink-0 font-mono text-[12px] uppercase tracking-wider text-muted-foreground sm:w-36 sm:pt-0.5">
                        {f.label}
                      </dt>
                      <dd className="mt-1 text-sm leading-relaxed text-ink sm:mt-0">
                        {m[f.key]}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 font-mono text-[12px] text-muted-foreground">
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

      {/* EM DISPUTA — presente das regras, na sequência da linha do tempo */}
      <SectionBlock
        tone="ink"
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
        <ul className="space-y-3">
          {DISPUTE_ITEMS.map((item) => (
            <li key={item.id} className="poster-frame p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="max-w-2xl font-display text-lg leading-snug text-ink">
                  {item.title}
                </h3>
                <StatusTag tone={item.status === "EM VIGOR" ? "ok" : "pending"}>
                  {item.status}
                </StatusTag>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.proposal}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.14em]">
          <Link to="/em-disputa" className="text-plum underline underline-offset-4">
            Ver todos os casos em disputa →
          </Link>
        </p>

        <div className="poster-frame mt-6 p-4">
          <GapNote label="Regra editorial">{DISPUTE_RULE}</GapNote>
        </div>
      </SectionBlock>

      <SectionBlock
        kicker="Limites em aberto"
        question="O que as regras ainda não alcançam"
      >
        <ul className="grid gap-4 md:grid-cols-2">
          {RIGHTS_OPEN_QUESTIONS.map((q) => (
            <li
              key={q}
              className="poster-frame p-5 text-sm leading-relaxed text-muted-foreground"
            >
              {q}
            </li>
          ))}
        </ul>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <ContextBox variant="significa" title="Conquista não é igual a efeito">
            <p>
              Uma regra pode existir e não ser implementada. Conquista, vigência e
              efeito prático são três coisas diferentes.
            </p>
          </ContextBox>
          <ContextBox variant="importa" title="Entre “já resolvido” e “não serve pra nada”">
            <p>
              Sem essa distinção, a leitura pública oscila entre “já existe{" "}
              <GlossaryTerm term="cota">cota</GlossaryTerm>, então está
              resolvido” e “a cota não serve para nada”. Nenhuma das duas
              descreve o que os dados mostram.
            </p>
          </ContextBox>
        </div>
      </SectionBlock>

      <SectionBlock
        tone="solar"
        kicker="Como ler uma regra em tramitação"
        question="Três distinções que evitam erro"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <ContextBox variant="significa" title="Estágios de uma proposta">
            <p>
              Apresentado, aprovado em comissão, aprovado em plenário, sancionado
              ou promulgado são estágios e situações jurídicas distintas. A
              existência de um projeto não significa que uma nova regra já esteja
              em vigor.
            </p>
          </ContextBox>
          <ContextBox variant="importa" title="O que uma resolução do TSE pode e não pode">
            <p>
              Nesta linha do tempo, tratamos como marco só o que já virou lei,
              resolução ou decisão publicada. Resolução do TSE organiza a
              aplicação de uma regra dentro de um ciclo eleitoral; não cria
              direito novo além do que a lei e a Constituição já autorizam.
            </p>
          </ContextBox>
          <ContextBox variant="calculamos" title="Por que não atribuímos causa">
            <p>
              Nenhum marco desta página é lido como causa isolada de uma mudança
              nos números. Contraste antes e depois de uma lei não é prova de
              causa — para isso seria preciso um desenho metodológico dedicado,
              que esta página não tem.
            </p>
          </ContextBox>
        </div>
        <p className="mt-6 font-mono text-[12px] text-muted-foreground">
          Fórmulas, filtros e limitações em{" "}
          <Link to="/metodo" className="text-plum underline underline-offset-4">
            Método
          </Link>
        </p>
      </SectionBlock>

      <NextAxes ids={["quem-controla", "em-disputa", "funil", "metodo"]} />
    </PageShell>
  );
}
