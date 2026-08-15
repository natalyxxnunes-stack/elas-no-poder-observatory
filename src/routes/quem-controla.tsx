import { createFileRoute, Link } from "@tanstack/react-router";
import { UnpublishedAxis } from "@/components/editorial/UnpublishedAxis";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/editorial/PageHero";
import { SectionBlock } from "@/components/editorial/SectionBlock";
import { InBrief } from "@/components/editorial/InBrief";
import { ContextBox } from "@/components/editorial/ContextBox";
import { NextAxes } from "@/components/editorial/NextAxes";
import { StatusTag } from "@/components/editorial/StatusTag";
import { GapNote } from "@/components/GapNote";
import { axis } from "@/data/architecture";
import { QUOTA_RULE } from "@/data/election-2026";
import spotQuota from "@/assets/spot-quota.png";

/**
 * ROTA DESPUBLICADA (lançamento de 5 páginas).
 * Arquivo preservado intencionalmente para republicação futura: o conteúdo e os
 * componentes seguem intactos, apenas o acesso público está redirecionado.
 */
export const Route = createFileRoute("/quem-controla")({
  head: () => ({
    meta: [
      {
        title:
          "Quem controla? — Quem são elas? | Partidos, federações e condições de disputa",
      },
      {
        name: "description",
        content:
          "Partidos, federações e diretórios decidem quem entra nas listas e quem recebe recursos, propaganda e posição estratégica. Investigamos padrões e estruturas, não rankings.",
      },
      { property: "og:title", content: "Quem controla a porta de entrada?" },
      {
        property: "og:description",
        content:
          "Quem decide quem entra na disputa e quem recebe condições para competir de verdade.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <UnpublishedAxis axisId="quem-controla" />,
});

/* Conteúdo preservado para publicação futura deste eixo (não referenciado pela rota). */
/* eslint-disable @typescript-eslint/no-unused-vars */

/** Estruturas de controle investigadas, com o dado que cada uma exige. */
const CONTROL_LEVERS = [
  {
    lever: "Quem entra na lista",
    what:
      "O partido ou federação define quais candidaturas são registradas em cada circunscrição, respeitando a faixa de composição por gênero nas eleições proporcionais.",
    needs: "Registro de candidaturas por partido, federação, cargo e UF",
    ready: true,
  },
  {
    lever: "Quem recebe recursos",
    what:
      "A distribuição dos recursos públicos de campanha é feita pelo partido entre suas candidaturas, observando as regras de destinação mínima.",
    needs: "Prestação de contas de campanha de 2026",
    ready: false,
  },
  {
    lever: "Quem aparece na propaganda",
    what:
      "O tempo de rádio e TV e a inserção nas peças de campanha também são distribuídos internamente.",
    needs: "Registros de propaganda eleitoral e planos de mídia",
    ready: false,
  },
  {
    lever: "Que posição a candidatura ocupa",
    what:
      "Estar na lista não é o mesmo que ocupar posição estratégica: cabeça de chapa, titularidade, suplência e concentração territorial mudam a chance real de competir.",
    needs:
      "Campos de posição/titularidade do registro e definição declarada de posição estratégica",
    ready: false,
  },
  {
    lever: "Onde a candidatura é lançada",
    what:
      "A escolha do território altera a competição: uma mesma candidatura enfrenta concorrências muito diferentes conforme a UF e o município.",
    needs: "UF e município do registro, cruzados com gênero e cor/raça",
    ready: true,
  },
] as const;

function QuemControlaPage() {
  const a = axis("quem-controla");
  return (
    <PageShell>
      <PageHero
        kicker="Quem controla?"
        question={a.question}
        lead={
          <p>
            Antes de qualquer voto, existem decisões internas. Partidos,
            federações e diretórios definem quem é registrada, quem recebe
            dinheiro e propaganda e em que posição cada candidatura entra na
            disputa.
          </p>
        }
        image={spotQuota}
      />

      <div className="pb-4">
        <InBrief
          found={
            <>
              O controle da porta de entrada é partidário. As regras eleitorais
              fixam pisos, mas a distribuição concreta de condições acontece
              dentro de cada partido ou federação.
            </>
          }
          matters={
            <>
              Se a decisão sobre recursos e posição é interna, contar apenas
              quantas mulheres foram registradas descreve o resultado sem
              alcançar o mecanismo.
            </>
          }
          unknown={
            <>
              Como cada partido distribuiu recursos e propaganda em 2026 — e a
              quais mulheres, por cor/raça, cargo e território. Essa base ainda
              não está disponível.
            </>
          }
        />
      </div>

      <SectionBlock
        kicker="Alavancas de controle"
        question="Cinco decisões que acontecem antes da campanha"
        align="wide"
      >
        <ul className="divide-y divide-rule border-y border-rule">
          {CONTROL_LEVERS.map((l) => (
            <li key={l.lever} className="py-5">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="font-display text-xl text-ink">{l.lever}</h3>
                <StatusTag tone={l.ready ? "ok" : "pending"}>
                  {l.ready ? "investigável agora" : "aguardando fonte"}
                </StatusTag>
              </div>
              <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">
                {l.what}
              </p>
              <p className="mt-2 font-mono text-[11px] text-muted-foreground">
                Exige: {l.needs}
              </p>
            </li>
          ))}
        </ul>
      </SectionBlock>

      <SectionBlock
        kicker="As regras que incidem"
        question="O que a regra alcança — e o que ela deixa para o partido decidir"
        lead={<p>{QUOTA_RULE.scope}</p>}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <ContextBox variant="significa">
            <p>{QUOTA_RULE.outOfScope}</p>
          </ContextBox>
          <ContextBox variant="importa">
            <p>{QUOTA_RULE.financingNote}</p>
          </ContextBox>
        </div>
        <div className="mt-6">
          <GapNote label="Critério editorial">
            Não publicamos ranking de partidos com juízo moral. Investigamos
            padrões e estruturas de distribuição, sempre com denominador por
            partido ou federação declarado. Diferenças entre partidos não são
            lidas, por si, como intenção.
          </GapNote>
        </div>
      </SectionBlock>

      <SectionBlock
        kicker="Como vamos apurar"
        question="Do registro à distribuição de condições"
        lead={
          <p>
            A primeira camada usa a base de candidaturas já processada: composição
            por partido ou federação, cargo, UF, gênero e cor/raça. A segunda
            depende das contas de campanha de 2026.
          </p>
        }
        source={
          <>
            Fonte da primeira camada: TSE · Candidaturas 2026 ·{" "}
            <Link to="/metodo" className="text-plum underline underline-offset-4">
              ver o método
            </Link>
          </>
        }
      >
        <ContextBox variant="calculamos">
          <p>
            Para cada partido ou federação, calculamos a proporção de candidaturas
            de mulheres sobre o total de candidaturas daquele partido no mesmo
            universo eleitoral — nunca sobre o total do país. Percentuais entre
            partidos com número muito pequeno de candidaturas são apresentados em
            contagens absolutas.
          </p>
        </ContextBox>
      </SectionBlock>

      <NextAxes ids={["condicoes", "dinheiro", "funil"]} />
    </PageShell>
  );
}
