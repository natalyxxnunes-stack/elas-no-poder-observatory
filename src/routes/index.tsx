import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { CapaEditorialV3 } from "@/components/home/CapaEditorialV3";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Quem são elas? · Mulheres, eleições e poder | Dados 2026" },
      {
        name: "description",
        content:
          "Observatório de dados sobre mulheres, eleições e poder em 2026: candidaturas proporcionais e majoritárias, gênero e raça, o funil até o poder e o método aberto.",
      },
      { property: "og:title", content: "Quem são elas? · Dados 2026" },
      {
        property: "og:description",
        content:
          "Entre se candidatar e chegar ao poder, onde elas desaparecem? Um observatório de dados sobre mulheres, eleições e poder.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CapaPage,
});

/** Capa editorial v3: teste isolado em branch, sem publicação automática. */
function CapaPage() {
  return (
    <PageShell home>
      <CapaEditorialV3 />
    </PageShell>
  );
}
