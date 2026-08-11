import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/editorial/PageHero";
import { SectionBlock } from "@/components/editorial/SectionBlock";
import { InBrief } from "@/components/editorial/InBrief";
import { ContextBox } from "@/components/editorial/ContextBox";
import { StatusTag } from "@/components/editorial/StatusTag";
import { NextAxes } from "@/components/editorial/NextAxes";
import { GapNote } from "@/components/GapNote";
import { axis } from "@/data/architecture";
import spotStrength from "@/assets/spot-strength.png";

export const Route = createFileRoute("/quem-chega")({
  head: () => ({
    meta: [
      { title: "Quem chega? — Quem são elas? | Eleitas e posições de poder" },
      {
        name: "description",
        content:
          "Resultado eleitoral por gênero, cor/raça, cargo, UF e partido — e, depois, as posições institucionais. Ser eleita não é o mesmo que ocupar poder.",
      },
      { property: "og:title", content: "Quais mulheres chegam a quais lugares?" },
      {
        property: "og:description",
        content:
          "Eleger-se é uma etapa. Presidir comissões, mesas e lideranças é outra — e é onde as decisões acontecem.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: QuemChegaPage,
});

const RESULT_LAYERS = [
  {
    label: "Eleitas por cargo",
    detail:
      "Cadeiras e cargos obtidos, com universo separado por cargo e circunscrição.",
    pending: "Depende da apuração da eleição de 2026.",
  },
  {
    label: "Eleitas por gênero e cor/raça",
    detail:
      "O cruzamento central do observatório aplicado ao resultado, nas categorias originais do TSE.",
    pending: "Depende da apuração da eleição de 2026.",
  },
  {
    label: "Eleitas por UF",
    detail: "Distribuição territorial do resultado, por unidade da federação.",
    pending: "Depende da apuração da eleição de 2026.",
  },
  {
    label: "Eleitas por partido ou federação",
    detail:
      "Resultado com denominador do próprio partido ou federação, não do total nacional.",
    pending: "Depende da apuração da eleição de 2026.",
  },
] as const;

const POWER_LAYERS = [
  {
    label: "Mesas diretoras",
    detail: "Presidência e demais cargos das mesas das casas legislativas.",
    pending: "Levantamento próprio, após a posse e a eleição das mesas.",
  },
  {
    label: "Presidências de comissão",
    detail:
      "Comissões permanentes e temporárias, onde a pauta legislativa é filtrada.",
    pending: "Levantamento próprio, após a instalação das comissões.",
  },
  {
    label: "Lideranças",
    detail: "Lideranças de partido, de bloco e de governo.",
    pending: "Levantamento próprio, após a posse.",
  },
  {
    label: "Executivo e secretarias",
    detail: "Chefia do Executivo e composição do primeiro escalão.",
    pending: "Levantamento próprio, após a posse.",
  },
] as const;

function QuemChegaPage() {
  const a = axis("quem-chega");
  return (
    <PageShell>
      <PageHero
        kicker="Quem chega?"
        question={a.question}
        lead={
          <p>
            Ser eleita não equivale automaticamente a ocupar posição de poder
            institucional. Este eixo separa resultado eleitoral de controle sobre
            decisões.
          </p>
        }
        image={spotStrength}
      />

      <div className="pb-4">
        <InBrief
          found={
            <>
              Nada ainda para 2026: o resultado depende da apuração e as posições
              institucionais dependem da posse, em 2027.
            </>
          }
          matters={
            <>
              A pergunta pública costuma parar em “quantas foram eleitas”. O poder
              de decidir pauta, orçamento e nomeações está em cargos de direção
              que raramente são contados.
            </>
          }
          unknown={
            <>
              Quem foi eleita, por gênero e cor/raça, e quem ocupou presidências,
              mesas, comissões e lideranças.
            </>
          }
        />
      </div>

      <SectionBlock
        kicker="Camada 1 — resultado"
        question="Quem se elegeu"
        align="wide"
      >
        <ul className="grid gap-4 md:grid-cols-2">
          {RESULT_LAYERS.map((l) => (
            <li key={l.label} className="editorial-card p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-lg text-ink">{l.label}</h3>
                <StatusTag tone="pending">em apuração futura</StatusTag>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {l.detail}
              </p>
              <p className="mt-3 font-mono text-[11px] text-muted-foreground">
                {l.pending}
              </p>
            </li>
          ))}
        </ul>
      </SectionBlock>

      <SectionBlock
        kicker="Camada 2 — poder"
        question="Quem passou a decidir"
        align="wide"
        lead={
          <p>
            Cada posição institucional será contada em relação ao total de
            posições daquele tipo — e não ao total de eleitas.
          </p>
        }
      >
        <ul className="grid gap-4 md:grid-cols-2">
          {POWER_LAYERS.map((l) => (
            <li key={l.label} className="editorial-card p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-lg text-ink">{l.label}</h3>
                <StatusTag tone="pending">levantamento futuro</StatusTag>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {l.detail}
              </p>
              <p className="mt-3 font-mono text-[11px] text-muted-foreground">
                {l.pending}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <ContextBox variant="significa">
            <p>
              “Posição institucional” é um cargo com poder de decisão sobre pauta,
              orçamento, relatoria ou nomeação — não apenas um assento.
            </p>
          </ContextBox>
          <ContextBox variant="calculamos">
            <p>
              Número de mulheres em determinado tipo de cargo dividido pelo total
              de cargos daquele tipo, na mesma casa e no mesmo período. Universos
              de casas diferentes não são somados.
            </p>
          </ContextBox>
        </div>
        <div className="mt-6">
          <GapNote label="Lacuna declarada">
            Nenhuma projeção de eleitas ou de composição de mesas é publicada
            antes das fontes oficiais correspondentes.
          </GapNote>
        </div>
        <p className="mt-6 font-mono text-[11px] text-muted-foreground">
          Critérios e fórmulas em{" "}
          <Link to="/metodo" className="text-plum underline underline-offset-4">
            Método
          </Link>
        </p>
      </SectionBlock>

      <NextAxes ids={["votos", "barreiras", "quem-sao-elas"]} />
    </PageShell>
  );
}
