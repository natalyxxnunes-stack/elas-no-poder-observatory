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
          "Antes do voto, muito se decide no partido | Quem são elas?",
      },
      {
        name: "description",
        content:
          "Partidos e federações têm papel central na escolha das candidaturas e na distribuição de recursos, propaganda e posição, dentro das regras eleitorais. Investigamos padrões e estruturas, não rankings.",
      },
      {
        property: "og:title",
        content:
          "Antes do voto, muito se decide no partido",
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
    what: "Partidos e federações escolhem em convenção e registram as candidaturas de cada circunscrição, respeitando a faixa de composição por gênero nas eleições proporcionais. Quem foi escolhida em convenção e não teve o registro pedido pelo partido pode requerê-lo individualmente.",
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
    what: "Os partidos distribuem recursos de campanha entre suas candidaturas, dentro das regras de destinação mínima. A receita declarada por partido já está publicada para os 5 maiores partidos, cruzada com gênero. Faltam a despesa e os demais partidos.",
    needs: "Receita já disponível para os 5 maiores partidos em /dinheiro; despesa contratada e paga, e os partidos fora do top 5, seguem pendentes",
    ready: "partial",
  },
  {
    lever: "Quem aparece na propaganda",
    what: "A regulamentação de 2026 manda distribuir o tempo de propaganda gratuita no rádio e na TV na proporção das candidaturas de mulheres, de pessoas negras e, agora, também de indígenas, com piso de 30% para mulheres (EC 117/2022; Res. TSE 23.610, art. 77, alterado pela Res. 23.755/2026). A divisão entre as candidaturas fica com o partido. Os tribunais eleitorais passaram a ter de publicar o tempo destinado a cada grupo; o projeto ainda não integrou esses dados.",
    needs: "Tempo destinado a mulheres, pessoas negras e indígenas, publicado pelos tribunais eleitorais (Res. 23.610, art. 77, §9º)",
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
        question="Antes do voto, muito se decide no partido"
        lead={
          <p>
            A lei e a Constituição fixam pisos de candidaturas, de recursos e de tempo de propaganda para mulheres. Dentro desses pisos, a divisão concreta fica com o partido ou a federação. A Justiça Eleitoral julga os registros, confere a cota e analisa as contas. Das {numberWords[leverTotal] ?? leverTotal} decisões mapeadas aqui, {numberWords[readyTotal] ?? readyTotal} já podem ser medidas com dado público e {numberWords[partialTotal] ?? partialTotal}, em parte.
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
              Partidos e federações têm papel central na escolha, no registro e na distribuição de recursos, dentro das regras eleitorais. A lei fixa pisos; a divisão concreta acontece dentro de cada partido ou federação.
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
              Como cada partido distribuiu recursos e propaganda em 2026, e a quais mulheres (por
              cor/raça, cargo e território): pendente da base de prestação de contas e propaganda.
            </>
          }
        />
      </div>

      <SectionBlock id="alavancas"
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

      <SectionBlock id="regras" tone="lilac"
        kicker="As regras que incidem"
        question="O que a regra alcança e o que ela deixa para o partido decidir"
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
          "Os dados mostram decisões e distribuições; não permitem inferir intenção ou estratégia política de cada partido.",
        ]}
      />

      <NextAxes ids={["quem-sao-elas", "dinheiro", "funil"]} />
    </PageShell>
  );
}
