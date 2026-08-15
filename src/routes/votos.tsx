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
import { axis } from "@/data/architecture";

/**
 * ROTA DESPUBLICADA (lançamento de 5 páginas).
 * Arquivo preservado intencionalmente para republicação futura: o conteúdo e os
 * componentes seguem intactos, apenas o acesso público está redirecionado.
 */
export const Route = createFileRoute("/votos")({
  head: () => ({
    meta: [
      { title: "Votos — Quem são elas? | Candidatura, competição e desempenho" },
      {
        name: "description",
        content:
          "Candidatura, competitividade, desempenho e resultado são coisas distintas. Como o observatório vai medir votos por gênero, cor/raça, cargo e território em 2026.",
      },
      {
        property: "og:title",
        content: "Quem consegue transformar candidatura em competição?",
      },
      {
        property: "og:description",
        content:
          "Antes de chamar algo de competitividade, é preciso definir o indicador. Aqui está a definição em construção.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <UnpublishedAxis axisId="votos" />,
});

/* Conteúdo preservado para publicação futura deste eixo (não referenciado pela rota). */
/* eslint-disable @typescript-eslint/no-unused-vars */

/** Quatro conceitos que não podem ser confundidos. */
const CONCEPTS = [
  {
    term: "Candidatura",
    meaning:
      "Registro deferido ou em análise pela Justiça Eleitoral. É existência formal na disputa.",
    measurable: "Já mensurável na base de candidaturas de 2026.",
    ready: true,
  },
  {
    term: "Competitividade",
    meaning:
      "Condição real de disputar: posição na chapa, recursos, propaganda e inserção territorial.",
    measurable:
      "Ainda não mensurável: exige indicador declarado antes de qualquer cálculo.",
    ready: false,
  },
  {
    term: "Desempenho",
    meaning:
      "Votação nominal obtida, lida sempre sobre um denominador explícito (votos válidos do cargo e da circunscrição).",
    measurable: "Depende da apuração de 2026.",
    ready: false,
  },
  {
    term: "Resultado",
    meaning:
      "Eleita, suplente ou não eleita. Depende do sistema eleitoral do cargo, não só do total de votos.",
    measurable: "Depende da apuração e da diplomação de 2026.",
    ready: false,
  },
] as const;

function VotosPage() {
  const a = axis("votos");
  return (
    <PageShell>
      <PageHero
        kicker="Votos"
        question={a.question}
        lead={
          <p>
            Ter candidatura não é competir, competir não é ir bem e ir bem não é
            eleger-se. Este eixo separa os quatro conceitos antes de publicar
            qualquer número.
          </p>
        }
        aside={
          <div className="editorial-card p-5">
            <p className="kicker">Regra</p>
            <p className="mt-2 font-display text-lg leading-snug text-ink">
              Definir o indicador antes de usar a palavra.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              “Competitividade” só aparece no site depois de publicada sua
              definição no método.
            </p>
          </div>
        }
      />

      <div className="pb-4">
        <InBrief
          found={
            <>
              Nada ainda: a votação de 2026 não foi apurada. O que existe hoje é a
              definição dos conceitos e dos denominadores que serão usados.
            </>
          }
          matters={
            <>
              A confusão entre candidatura e competitividade é a principal fonte
              de leitura equivocada sobre mulheres na política: uma lista cheia
              pode conviver com pouquíssima competição real.
            </>
          }
          unknown={
            <>
              Votação nominal por gênero e cor/raça, relação entre recursos e
              votos e resultado por cargo e território.
            </>
          }
        />
      </div>

      <SectionBlock
        kicker="Quatro conceitos"
        question="Candidatura, competitividade, desempenho e resultado"
        align="wide"
      >
        <ul className="divide-y divide-rule border-y border-rule">
          {CONCEPTS.map((c) => (
            <li key={c.term} className="py-5">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="font-display text-xl text-ink">{c.term}</h3>
                <StatusTag tone={c.ready ? "ok" : "pending"}>
                  {c.ready ? "mensurável agora" : "aguardando fonte"}
                </StatusTag>
              </div>
              <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">
                {c.meaning}
              </p>
              <p className="mt-2 font-mono text-[11px] text-muted-foreground">
                {c.measurable}
              </p>
            </li>
          ))}
        </ul>
      </SectionBlock>

      <SectionBlock
        kicker="Cruzamentos previstos"
        question="Votos por gênero, cor/raça, cargo e território"
        lead={
          <p>
            Quando a apuração existir, cada leitura terá cargo e circunscrição
            declarados, porque a comparação entre cargos diferentes não faz
            sentido: o denominador muda.
          </p>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <ContextBox variant="calculamos">
            <p>
              Votação nominal de candidaturas de mulheres dividida pelo total de
              votos nominais válidos do mesmo cargo e da mesma circunscrição.
              Nunca somamos votos de cargos distintos em um único percentual.
            </p>
          </ContextBox>
          <ContextBox variant="importa">
            <p>
              Recursos e votos podem aparecer juntos, mas a relação entre eles é
              descritiva: mais dinheiro coincidir com mais votos não prova que o
              dinheiro produziu os votos.
            </p>
          </ContextBox>
        </div>
        <div className="mt-6">
          <GapNote label="Lacuna declarada">
            Nenhum número de votos de 2026 é exibido antes da apuração oficial.
            Projeções, pesquisas e séries de ciclos anteriores não substituem o
            dado desta eleição.
          </GapNote>
        </div>
        <p className="mt-6 font-mono text-[11px] text-muted-foreground">
          Definições e fórmulas em{" "}
          <Link to="/metodo" className="text-plum underline underline-offset-4">
            Método
          </Link>
        </p>
      </SectionBlock>

      <NextAxes ids={["dinheiro", "quem-chega", "funil"]} />
    </PageShell>
  );
}
