import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { AchadoCard } from "@/components/editorial/AchadoCard";
import { NextAxes } from "@/components/editorial/NextAxes";
import { SectionBlock } from "@/components/editorial/SectionBlock";
import { ACHADOS } from "@/data/achados";

const description =
  "Achados do observatório Quem são elas?: notas curtas e datadas sobre mulheres, eleições e poder em 2026, cada uma com número, fonte e caminho para os dados.";

export const Route = createFileRoute("/achados")({
  head: () => ({
    meta: [
      { title: "O que encontramos | Quem são elas?" },
      { name: "description", content: description },
      { property: "og:title", content: "O que encontramos" },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AchadosPage,
});

function AchadosPage() {
  return (
    <PageShell breadcrumb={[{ label: "Achados" }]}>
      <SectionBlock
        kicker="Achados"
        question="O que encontramos"
        align="wide"
        lead={
          <p>
            Notas curtas e datadas, cada uma com o número, a fonte e o caminho
            para a página de dado. Novos achados entram a cada atualização da base.
          </p>
        }
      >
        <div className="grid gap-10 md:grid-cols-2">
          {[...ACHADOS].reverse().map((achado) => (
            <AchadoCard key={achado.id} achado={achado} />
          ))}
        </div>
      </SectionBlock>
      <NextAxes ids={["quem-sao-elas", "dinheiro", "historico"]} />
    </PageShell>
  );
}