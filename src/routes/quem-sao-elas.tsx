import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/editorial/PageHero";
import { SectionBlock } from "@/components/editorial/SectionBlock";
import { InBrief } from "@/components/editorial/InBrief";
import { ContextBox } from "@/components/editorial/ContextBox";
import { RaceBreakdown } from "@/components/editorial/RaceBreakdown";
import { IntersectionPlan } from "@/components/editorial/IntersectionPlan";
import { NextAxes } from "@/components/editorial/NextAxes";
import { axis, CENTRAL_PRINCIPLE } from "@/data/architecture";
import { getLatestTseSnapshot } from "@/lib/tse/snapshot.functions";
import spotStrength from "@/assets/spot-strength.png";

/**
 * ROTA DESPUBLICADA (lançamento de 5 páginas).
 * Arquivo preservado intencionalmente para republicação futura: o conteúdo e os
 * componentes seguem intactos, apenas o acesso público está redirecionado.
 */
export const Route = createFileRoute("/quem-sao-elas")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  head: () => ({
    meta: [
      {
        title:
          "Quem são elas? — gênero e raça | Quais mulheres atravessam o caminho",
      },
      {
        name: "description",
        content:
          "Gênero e cor/raça como eixo central: a distribuição das candidaturas de mulheres nas categorias originais do TSE, com denominador explícito e cruzamentos declarados.",
      },
      { property: "og:title", content: "Quais mulheres atravessam o caminho?" },
      {
        property: "og:description",
        content:
          "Não existe uma única experiência de ser mulher na política. Gênero e cor/raça estruturam a investigação.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: async () => ({ snapshot: await getLatestTseSnapshot() }),
  component: QuemSaoElasPage,
});

function QuemSaoElasPage() {
  const { snapshot } = Route.useLoaderData();
  const a = axis("quem-sao-elas");

  return (
    <PageShell>
      <PageHero
        kicker="Quem são elas?"
        question={a.question}
        lead={<p>{CENTRAL_PRINCIPLE}</p>}
        image={spotStrength}
      />

      <div className="pb-4">
        <InBrief
          found={
            <>
              As candidaturas de mulheres registradas em 2026 se distribuem de
              forma desigual entre as categorias de cor/raça declaradas ao TSE, e
              essa distribuição muda entre o universo proporcional e o
              majoritário.
            </>
          }
          matters={
            <>
              Contar mulheres em bloco esconde quem, entre elas, chega a cada
              nível. Gênero e cor/raça juntos mostram um caminho diferente do
              que cada dimensão isolada revela.
            </>
          }
          unknown={
            <>
              Recursos, votos, eleitas e posições de poder por cor/raça: as bases
              ainda não existem para 2026. A base também não capta de forma
              confiável identidade trans ou travesti, nem deficiência de modo
              comparável.
            </>
          }
        />
      </div>

      <SectionBlock
        kicker="Categorias originais"
        question="Cor/raça declarada nas candidaturas de mulheres"
        align="wide"
        lead={
          <p>
            Cada universo eleitoral é lido com seu próprio denominador. As
            categorias são exatamente as declaradas ao TSE, sem substituição.
          </p>
        }
        source={
          <>
            Fonte: TSE · Candidaturas 2026 ·{" "}
            <Link to="/metodo" className="text-plum underline underline-offset-4">
              ver o método
            </Link>
          </>
        }
      >
        <RaceBreakdown snapshot={snapshot} />
      </SectionBlock>

      <SectionBlock
        kicker="Limites da fonte"
        question="O que a base registra — e o que ela não registra"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <ContextBox variant="significa">
            <p>
              Cor/raça no registro é autodeclaração. Ela não identifica
              pertencimento étnico nem vínculo com povo ou território indígena:
              são coisas distintas e não devem ser tratadas como equivalentes.
            </p>
          </ContextBox>
          <ContextBox variant="importa">
            <p>
              Publicar um cruzamento que a fonte não sustenta produziria número
              com aparência de precisão e sem base. Preferimos declarar a lacuna.
            </p>
          </ContextBox>
          <ContextBox variant="calculamos">
            <p>
              Quando apresentamos leitura agregada, dizemos a agregação —
              “negra” = preta + parda — e mantemos as categorias originais
              visíveis na mesma tela.
            </p>
          </ContextBox>
        </div>
      </SectionBlock>

      <SectionBlock
        kicker="Plano de cruzamentos"
        question="O que já é possível cruzar e o que depende de nova fonte"
        align="wide"
      >
        <IntersectionPlan />
      </SectionBlock>

      <NextAxes ids={["quem-chega", "dinheiro", "barreiras"]} />
    </PageShell>
  );
}
