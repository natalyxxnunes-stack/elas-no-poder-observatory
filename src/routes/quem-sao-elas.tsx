import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { EditorialOpening } from "@/components/editorial/EditorialOpening";
import { SectionBlock } from "@/components/editorial/SectionBlock";
import { InBrief } from "@/components/editorial/InBrief";
import { ContextBox } from "@/components/editorial/ContextBox";
import { RaceBreakdown } from "@/components/editorial/RaceBreakdown";
import { RaceFinding2026 } from "@/components/editorial/RaceFinding2026";
import { RaceExplorer } from "@/components/editorial/RaceExplorer";
import { RaceByStateTable } from "@/components/editorial/RaceByStateTable";
import { PartyGenderTable } from "@/components/editorial/PartyGenderTable";
import { StateExplorer } from "@/components/editorial/StateExplorer";
import { OfficeTable } from "@/components/editorial/OfficeTable";
import { OfficePairChart } from "@/components/editorial/OfficePairChart";


import { IntersectionPlan } from "@/components/editorial/IntersectionPlan";
import { NextAxes } from "@/components/editorial/NextAxes";
import { axis, CENTRAL_PRINCIPLE } from "@/data/architecture";
import { getLatestTseSnapshot } from "@/lib/tse/snapshot.functions";
import { GlossaryTerm } from "@/components/editorial/GlossaryTerm";


/**
 * ROTA REPUBLICADA.
 * O conteúdo, o loader e o componente permanecem intactos; o redirecionamento
 * foi removido para que o eixo volte a ser acessível publicamente.
 */
export const Route = createFileRoute("/quem-sao-elas")({
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
  // Carimbo da mesma fotografia que alimenta todas as visualizações da página.
  const baseIso = snapshot?.baseGeneratedAt ?? snapshot?.collectedAt ?? null;
  const baseStamp = baseIso
    ? (() => {
        const d = new Date(baseIso);
        return Number.isNaN(d.getTime())
          ? null
          : d.toLocaleDateString("pt-BR", { timeZone: "UTC" });
      })()
    : null;

  return (
    <PageShell breadcrumb={[{ label: "Dados 2026", to: "/" }, { label: "Quem são elas?" }]}>
      <EditorialOpening
        variant="race"
        kicker="Quem são elas?"
        question={a.question}
        lead={<p>{CENTRAL_PRINCIPLE}</p>}
        snapshot={snapshot}
      />

      <div className="pb-4">
        <InBrief
          found={
            <>
              As candidaturas de mulheres registradas em 2026 se distribuem de
              forma desigual entre as categorias de cor/raça declaradas ao TSE.
              Essa distribuição também muda entre o universo{" "}
              <GlossaryTerm term="proporcional">proporcional</GlossaryTerm> e o{" "}
              <GlossaryTerm term="majoritaria">majoritário</GlossaryTerm>.
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
              Em aberto para 2026: recursos, votos, eleitas e posições de poder
              por cor/raça. Identidade trans ou travesti e deficiência ficam
              fora da leitura, porque a base não as registra de modo comparável.
            </>
          }
        />
      </div>

      <SectionBlock
        kicker="Censo 2022 × candidaturas 2026"
        question="Pardas e brancas são quase do mesmo tamanho no país. Nas candidaturas, não são."
        align="wide"
        source={
          <>
            Fontes: IBGE · Censo 2022; TSE · Candidaturas 2026
            {baseStamp ? ` · fotografia da base de ${baseStamp}` : ""} ·{" "}
            <Link to="/metodo" className="text-plum underline underline-offset-4">
              ver o método
            </Link>
          </>
        }
      >
        <RaceFinding2026 snapshot={snapshot} />
      </SectionBlock>

      <SectionBlock
        kicker="Categorias originais"
        question="Cor/raça declarada nas candidaturas de mulheres"
        align="wide"
        lead={
          <div className="space-y-3">
            <p>
              Entre as candidaturas proporcionais de mulheres, branca é a
               categoria de cor/raça mais declarada, com 46,8%, seguida por
               parda, com 34,2%, e preta, com 17,2%.
            </p>
            <p>
              A distribuição das candidaturas de mulheres entre as categorias de
              cor/raça que o próprio registro publica, um universo por vez.
            </p>
          </div>
        }

        source={
          <>
            Fonte: TSE · Candidaturas 2026
            {baseStamp ? ` · fotografia da base de ${baseStamp}` : ""} ·{" "}
            <Link to="/metodo" className="text-plum underline underline-offset-4">
              ver o método
            </Link>
          </>
        }
      >
        <RaceBreakdown snapshot={snapshot} />
      </SectionBlock>

      <SectionBlock
        id="cargos"
        kicker="Cargos"
        question="Nos mesmos páreos, mulheres aparecem mais entre vices e suplentes"
        align="wide"
        lead={
          <p>
            A presença é maior nas candidaturas a vice do que aos cargos titulares:
            42,9% entre vices à Presidência, contra 14,3% entre candidaturas à
            Presidência; e 41,7% entre vices aos governos, contra 17,4% entre
            candidaturas a governadora.
          </p>
        }
        source={
          <>
            Fonte: TSE · Candidaturas 2026 · fotografia da base de 22/09/2026 ·{" "}
            <Link to="/metodo" className="text-plum underline underline-offset-4">ver o método</Link>
          </>
        }
      >
        <div className="space-y-8">
          <OfficePairChart snapshot={snapshot} />

          <div className="grid gap-5 md:grid-cols-3">
            <article className="poster-frame p-5">
              <p className="poster-eyebrow border-plum text-plum">Fato</p>
              <p className="mt-3 leading-relaxed text-ink/70">
                Nos comandos únicos mais altos — Presidência e Governo —, a presença de mulheres cai para os menores números do levantamento: 14,3% nas candidaturas à Presidência e 17,4% às candidaturas a governadora. Nas candidaturas a vice desses mesmos pleitos, a proporção mais que dobra: 42,9% e 41,7%.
              </p>
            </article>

            <article className="poster-frame p-5">
              <p className="poster-eyebrow border-coral text-coral-ink">Interpretação editorial</p>
              <p className="mt-3 leading-relaxed text-ink/70">
                A vice-presidência e a vice-governadoria não exercem o comando direto enquanto o titular estiver no cargo — são posições de composição de chapa, historicamente usadas para equilibrar coligações e a composição política da chapa, sem disputar o centro do poder. Quando o cargo é o de comando único, a presença de mulheres cai.
              </p>
            </article>

            <article className="poster-frame p-5">
              <p className="poster-eyebrow border-ink text-ink">Hipótese em investigação</p>
              <p className="mt-3 leading-relaxed text-ink/70">
                Esse padrão se repete em eleições anteriores ou é particular a 2026? Comparar 2014, 2018 e 2022 pode indicar se mulheres são sistematicamente mais aceitas em posições de apoio à chapa do que no comando direto — ou se a distância deste ano é uma anomalia.
              </p>
            </article>
          </div>

          <div>
            <p className="poster-eyebrow mb-4 text-ink">Tabela completa de referência</p>
            <OfficeTable snapshot={snapshot} />
          </div>
        </div>
      </SectionBlock>

      <SectionBlock
        id="estados"
        kicker="Panorama por estado"
        question="Cor/raça das candidaturas proporcionais, estado por estado"
        align="wide"
        lead={
          <p>
            Aqui todos os estados aparecem lado a lado para comparação. O
            explorador acima serve para aprofundar um recorte por vez.
          </p>
        }

        source={
          <>
            Fonte: TSE · Candidaturas 2026
            {baseStamp ? ` · fotografia da base de ${baseStamp}` : ""} ·{" "}
            <Link to="/metodo" className="text-plum underline underline-offset-4">
              ver o método
            </Link>
          </>
        }
      >
        <RaceByStateTable snapshot={snapshot} />
      </SectionBlock>



      <SectionBlock
        id="partidos"
        kicker="Partidos"
        question="Quem lança mulheres?"
        align="wide"
        lead={
          <p>
            Quem decide o registro é o partido ou a federação. Aqui está a
            composição de cada lista: quantas das candidaturas registradas são de
            mulheres, com o número absoluto ao lado do percentual. Ligando o
            recorte de cor/raça, a mesma tabela mostra quais mulheres cada
            partido registrou.
          </p>
        }

        source={
          <>
            Fonte: TSE · Candidaturas 2026
            {baseStamp ? ` · fotografia da base de ${baseStamp}` : ""} ·{" "}
            <Link to="/metodo" className="text-plum underline underline-offset-4">
              ver o método
            </Link>
          </>
        }
      >
        <PartyGenderTable snapshot={snapshot} />
        <ContextBox variant="significa" title="Como ler">
          <p>
            A tabela não sustenta frases como “partido melhor para mulheres”:
            ela descreve a entrada, e a entrada é apenas a primeira etapa —
            dinheiro, posição na lista e eleição só existem em bases posteriores
            à campanha.
          </p>
        </ContextBox>

      </SectionBlock>

      <SectionBlock
        kicker="Explorador"
        question="Escolha o cargo, o estado e o partido — e veja quem são elas ali"
        align="wide"
        tone="solar"
        lead={
          <p>
            Cada combinação recalcula a distribuição por cor/raça daquela fatia,
            com a base à vista.
          </p>
        }

        source={
          <>
            Fonte: TSE · Candidaturas 2026
            {baseStamp ? ` · fotografia da base de ${baseStamp}` : ""} ·{" "}
            <Link to="/metodo" className="text-plum underline underline-offset-4">
              ver o método
            </Link>
          </>
        }
      >
        <RaceExplorer snapshot={snapshot} />
      </SectionBlock>

      <SectionBlock
        kicker="Por estado"
        question="E no seu estado?"
        align="wide"
        tone="solar"
        lead={
          <p>
            Escolha um estado e leia a realidade daquela região: quantas
            candidaturas foram registradas, quantas são de mulheres, como isso se
            compara com o Brasil no mesmo universo, quais mulheres estão ali e
            quais partidos as registraram. Dá para voltar ao Brasil ou trocar de
            estado a qualquer momento.
          </p>
        }
        source={
          <>
            Fonte: TSE · Candidaturas 2026
            {baseStamp ? ` · fotografia da base de ${baseStamp}` : ""} ·{" "}
            <Link to="/metodo" className="text-plum underline underline-offset-4">
              ver o método
            </Link>
          </>
        }
      >
        <StateExplorer snapshot={snapshot} />
      </SectionBlock>

      <SectionBlock
        kicker="Limites da fonte"
        question="O que a base registra — e o que ela não registra"
      >

        <div className="grid gap-4 md:grid-cols-2">
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
        </div>

      </SectionBlock>

      <SectionBlock
        kicker="Plano de cruzamentos"
        question="O que já é possível cruzar e o que depende de nova fonte"
        align="wide"
      >
        <IntersectionPlan />
      </SectionBlock>


      <NextAxes ids={["quem-controla", "funil", "direitos", "metodo"]} />
    </PageShell>
  );
}
