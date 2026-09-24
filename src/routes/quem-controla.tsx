import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { EditorialOpening } from "@/components/editorial/EditorialOpening";
import { SectionBlock } from "@/components/editorial/SectionBlock";
import { InBrief } from "@/components/editorial/InBrief";
import { ContextBox } from "@/components/editorial/ContextBox";
import { NextAxes } from "@/components/editorial/NextAxes";
import { StatusTag } from "@/components/editorial/StatusTag";
import { ComoSabemos } from "@/components/editorial/ComoSabemos";
import { QUOTA_RULE } from "@/data/election-2026";

/**
 * ROTA PUBLICADA. Conteúdo completo: as cinco alavancas de controle, o que a
 * regra alcança e o que fica para o partido decidir, com critério de
 * denominador declarado. As etapas que dependem de prestação de contas e
 * apuração de 2026 seguem marcadas "aguardando fonte".
 */
export const Route = createFileRoute("/quem-controla")({
  head: () => ({
    meta: [
      {
        title:
          "Antes do voto, o partido decide quem entra, quem recebe e em que posição | Quem são elas?",
      },
      {
        name: "description",
        content:
          "Partidos, federações e diretórios decidem quem entra nas listas e quem recebe recursos, propaganda e posição estratégica. Investigamos padrões e estruturas, não rankings.",
      },
      {
        property: "og:title",
        content:
          "Antes do voto, o partido decide quem entra, quem recebe e em que posição",
      },
      {
        property: "og:description",
        content:
          "Quem decide quem entra na disputa e quem recebe condições para competir de verdade.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: QuemControlaPage,
});

/* Conteúdo da rota /quem-controla. */

/** Estruturas de controle investigadas, com o dado que cada uma exige. */
const CONTROL_LEVERS = [
  {
    lever: "Quem entra na lista",
    what: "O partido ou federação define quais candidaturas são registradas em cada circunscrição, respeitando a faixa de composição por gênero nas eleições proporcionais.",
    needs: "Registro de candidaturas por partido, federação, cargo e UF",
    ready: "yes",
  },
  {
    lever: "Onde a candidatura é lançada",
    what: "A escolha do território altera a competição: uma mesma candidatura enfrenta concorrências muito diferentes conforme a UF e o município.",
    needs: "UF e município do registro, cruzados com gênero e cor/raça",
    ready: "yes",
  },
  {
    lever: "Quem recebe recursos",
    what: "A distribuição dos recursos públicos de campanha é feita pelo partido entre suas candidaturas, observando as regras de destinação mínima. A receita por partido já está publicada para os 5 maiores partidos, cruzada com gênero — falta despesa e os demais partidos.",
    needs: "Receita já disponível para os 5 maiores partidos em /dinheiro; despesa contratada e paga, e os partidos fora do top 5, seguem pendentes",
    ready: "partial",
  },
  {
    lever: "Quem aparece na propaganda",
    what: "O tempo de rádio e TV e a inserção nas peças de campanha também são distribuídos internamente.",
    needs: "Registros de propaganda eleitoral e planos de mídia",
    ready: "no",
  },
  {
    lever: "Que posição a candidatura ocupa",
    what: "Estar na lista não é o mesmo que ocupar posição estratégica: cabeça de chapa, titularidade, suplência e concentração territorial mudam a chance real de competir.",
    needs:
      "Campos de posição/titularidade do registro e definição declarada de posição estratégica",
    ready: "no",
  },
] as const;

function QuemControlaPage() {
  const numberWords = ["zero", "uma", "duas", "três", "quatro", "cinco"] as const;
  const leverTotal = CONTROL_LEVERS.length;
  const readyTotal = CONTROL_LEVERS.filter((lever) => lever.ready === "yes").length;
  const partialTotal = CONTROL_LEVERS.filter((lever) => lever.ready === "partial").length;
  return (
    <PageShell breadcrumb={[{ label: "Investigação", to: "/investigacoes" }, { label: "Quem controla?" }]}>
      <EditorialOpening
        variant="power-flow"
        kicker="Quem controla?"
        question="Antes do voto, o partido decide quem entra na lista, quem recebe dinheiro e em que posição."
        lead={
          <p>
            A lei fixa pisos de candidaturas e de recursos para mulheres. Dentro desses pisos, a divisão do fundo, do tempo de TV e das posições de chapa fica com o partido ou a federação. Das {numberWords[leverTotal] ?? leverTotal} decisões mapeadas aqui, {numberWords[readyTotal] ?? readyTotal} já podem ser medidas com dado público e {numberWords[partialTotal] ?? partialTotal}, em parte.
          </p>
        }
        levers={CONTROL_LEVERS.map(({ lever, ready }) => ({ label: lever, ready }))}
      />

      <div className="pb-4">
        <InBrief
          foundLabel="Quem decide"
          mattersLabel="Por que contar não basta"
          unknownLabel="O que ainda não dá pra abrir"
          found={
            <>
              O controle da porta de entrada é partidário. As regras eleitorais fixam pisos, mas a
              distribuição concreta de condições acontece dentro de cada partido ou federação.
            </>
          }
          matters={
            <>
              Se a decisão sobre recursos e posição é interna, contar apenas quantas mulheres foram
              registradas descreve o resultado sem alcançar o mecanismo.
            </>
          }
          unknown={
            <>
              Como cada partido distribuiu recursos e propaganda em 2026 — e a quais mulheres, por
              cor/raça, cargo e território — pendente da base de prestação de contas e propaganda.
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
                <StatusTag tone={l.ready === "yes" ? "ok" : l.ready === "partial" ? "limit" : "pending"}>
                  {l.ready === "yes" ? "disponível" : l.ready === "partial" ? "parcial" : "aguardando dado"}
                </StatusTag>
              </div>
              <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">{l.what}</p>
              <p className="mt-2 font-mono text-[12px] text-muted-foreground">Exige: {l.needs}</p>
            </li>
          ))}
        </ul>
      </SectionBlock>

      <SectionBlock
        kicker="As regras que incidem"
        question="O que a regra alcança — e o que ela deixa para o partido decidir"
        lead={<p>{QUOTA_RULE.scope}</p>}
        source={
          <>
            Base legal:{" "}
            <a
              href={QUOTA_RULE.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="text-plum underline underline-offset-4"
            >
              Lei 9.504/1997, art. 10, §3º
            </a>
          </>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <ContextBox variant="significa" title="O que a cota não alcança">
            <p>{QUOTA_RULE.outOfScope}</p>
          </ContextBox>
          <ContextBox variant="importa" title="Onde entra o dinheiro">
            <p>{QUOTA_RULE.financingNote}</p>
          </ContextBox>
        </div>
      </SectionBlock>

      <ComoSabemos
        fonte="TSE, Candidaturas 2026; TSE, Prestação de Contas Eleitorais 2026; Lei 9.504/1997, art. 10, §3º."
        universo="Candidaturas registradas em 2026 por partido ou federação, cargo e UF."
        calculo="Para cada partido ou federação, dividimos as candidaturas de mulheres pelo total de candidaturas daquele partido no mesmo universo, nunca pelo total do país. Partidos com poucas candidaturas aparecem em números absolutos. Diferenças entre partidos descrevem padrões de distribuição: não publicamos ranking nem lemos diferença como intenção."
        limites={[
          "A primeira camada usa o registro de candidaturas. A distribuição de recursos e de propaganda depende das contas de campanha de 2026.",
          "Propaganda e posição estratégica na chapa ainda não têm fonte pública integrada.",
        ]}
      />

      <NextAxes ids={["quem-sao-elas", "dinheiro", "funil"]} />
    </PageShell>
  );
}
