import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { EditorialOpening } from "@/components/editorial/EditorialOpening";
import { SectionBlock } from "@/components/editorial/SectionBlock";
import { InBrief } from "@/components/editorial/InBrief";
import { RaceBreakdown } from "@/components/editorial/RaceBreakdown";
import { RaceFinding2026 } from "@/components/editorial/RaceFinding2026";
import { RaceExplorer } from "@/components/editorial/RaceExplorer";
import { StateExplorer } from "@/components/editorial/StateExplorer";
import { OfficeTable } from "@/components/editorial/OfficeTable";
import { OfficePairChart } from "@/components/editorial/OfficePairChart";


import { IntersectionPlan } from "@/components/editorial/IntersectionPlan";
import { NextAxes } from "@/components/editorial/NextAxes";
import { ComoSabemos } from "@/components/editorial/ComoSabemos";
import { getLatestTseSnapshot } from "@/lib/tse/snapshot.functions";
import { GlossaryTerm } from "@/components/editorial/GlossaryTerm";
import { formatInt, formatPct, formatUmEmCada } from "@/lib/format-br";


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
          "A cor das candidatas muda com o cargo em disputa | Quem são elas?",
      },
      {
        name: "description",
        content:
          "Gênero e cor/raça como eixo central: a distribuição das candidaturas de mulheres nas categorias originais do TSE, com denominador explícito e cruzamentos declarados.",
      },
      {
        property: "og:title",
        content: "A cor das candidatas muda com o cargo em disputa",
      },
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
  const proportionalRaceCounts = snapshot?.universes.proporcional.raceCounts;
  const proportionalRaceTotal = proportionalRaceCounts
    ? Object.values(proportionalRaceCounts).reduce((sum, count) => sum + count, 0)
    : 0;
  const rankedRaces = proportionalRaceCounts
    ? Object.entries(proportionalRaceCounts).sort(([, a], [, b]) => b - a)
    : [];
  const raceAt = (index: number) => {
    const entry = rankedRaces[index];
    return {
      label: entry?.[0].toLocaleLowerCase("pt-BR") ?? "—",
      share:
        entry && proportionalRaceTotal > 0
          ? formatPct((entry[1] / proportionalRaceTotal) * 100)
          : "—",
    };
  };
  const firstRace = raceAt(0);
  const secondRace = raceAt(1);
  const thirdRace = raceAt(2);
  const majoritarianRaceCounts = snapshot?.universes.majoritario.raceCounts;
  const majoritarianRaceTotal = majoritarianRaceCounts
    ? Object.values(majoritarianRaceCounts).reduce((sum, count) => sum + count, 0)
    : 0;
  const raceShare = (counts: Record<string, number> | undefined, category: string, total: number) =>
    counts && total > 0 ? (counts[category] ?? 0) / total * 100 : Number.NaN;
  const blackShare = (counts: Record<string, number> | undefined, total: number) =>
    counts && total > 0
      ? ((counts["PRETA"] ?? 0) + (counts["PARDA"] ?? 0)) / total * 100
      : Number.NaN;
  const formattedRaceShare = (value: number) => Number.isFinite(value) ? formatPct(value) : "—";
  const proportionalWhite = formattedRaceShare(raceShare(proportionalRaceCounts, "BRANCA", proportionalRaceTotal));
  const majoritarianWhite = formattedRaceShare(raceShare(majoritarianRaceCounts, "BRANCA", majoritarianRaceTotal));
  const majoritarianBlackCount = majoritarianRaceCounts
    ? (majoritarianRaceCounts["PRETA"] ?? 0) + (majoritarianRaceCounts["PARDA"] ?? 0)
    : null;
  const proportionalPardaFrequency = formatUmEmCada(raceShare(proportionalRaceCounts, "PARDA", proportionalRaceTotal));
  const majoritarianPardaFrequency = formatUmEmCada(raceShare(majoritarianRaceCounts, "PARDA", majoritarianRaceTotal));
  const share = (feminine: number | undefined, total: number | undefined) =>
    feminine !== undefined && total !== undefined && total > 0
      ? formatPct((feminine / total) * 100)
      : "—";
  const majoritarianDimensions = snapshot?.universes.majoritario.dimensions;
  const outOfUniverse = snapshot?.outOfUniverse;
  const p = share(
    majoritarianDimensions?.feminineByCargo?.["PRESIDENTE"],
    majoritarianDimensions?.totalByCargo?.["PRESIDENTE"],
  );
  const g = share(
    majoritarianDimensions?.feminineByCargo?.["GOVERNADOR"],
    majoritarianDimensions?.totalByCargo?.["GOVERNADOR"],
  );
  const vp = share(
    outOfUniverse?.feminineByCargo?.["VICE-PRESIDENTE"],
    outOfUniverse?.byCargo?.["VICE-PRESIDENTE"],
  );
  const vg = share(
    outOfUniverse?.feminineByCargo?.["VICE-GOVERNADOR"],
    outOfUniverse?.byCargo?.["VICE-GOVERNADOR"],
  );

  return (
    <PageShell breadcrumb={[{ label: "Dados 2026", to: "/" }, { label: "Quem são elas?" }]}>
      <EditorialOpening
        variant="race"
        kicker="Quem são elas?"
        question="A cor das candidatas muda com o cargo em disputa"
        lead={
          <p>
            Brancas são {proportionalWhite} das candidatas a deputada e {majoritarianWhite} das que disputam Presidência, governos e Senado. Nessas disputas majoritárias, das {majoritarianRaceTotal > 0 ? formatInt(majoritarianRaceTotal) : "—"} mulheres, {majoritarianRaceCounts ? formatInt(majoritarianRaceCounts["BRANCA"] ?? 0) : "—"} são brancas e {majoritarianBlackCount !== null ? formatInt(majoritarianBlackCount) : "—"} são negras, somando pretas e pardas. A queda está sobretudo nas pardas: eram {proportionalPardaFrequency} candidatas a deputada e viram {majoritarianPardaFrequency} nas candidaturas majoritárias.
          </p>
        }
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
        id="raca"
        kicker="Categorias originais"
        question="Deputada × disputas majoritárias: quais mulheres estão em cada disputa"
        align="wide"
        lead={
          <p>
            Entre as candidaturas proporcionais de mulheres, {firstRace.label} é a
            categoria de cor/raça mais declarada, com {firstRace.share}, seguida por{" "}
            {secondRace.label}, com {secondRace.share}, e {thirdRace.label}, com{" "}
            {thirdRace.share}. Neste levantamento, “mulheres” são as candidaturas registradas como FEMININO no campo de gênero do TSE, e “negras” soma pretas e pardas, com as categorias originais sempre à vista.
          </p>
        }

        source={
          <>
            Fonte: TSE · Candidaturas 2026
            {baseStamp ? ` · fotografia da base de ${baseStamp}` : ""}
          </>
        }
      >
        <RaceBreakdown snapshot={snapshot} />
      </SectionBlock>

      <SectionBlock
        kicker="Censo 2022 × candidaturas 2026"
        question="Pardas e brancas são quase do mesmo tamanho no país. Nas candidaturas, não são."
        align="wide"
        source={
          <>
            Fontes: IBGE · Censo 2022; TSE · Candidaturas 2026
            {baseStamp ? ` · fotografia da base de ${baseStamp}` : ""}
          </>
        }
      >
        <RaceFinding2026 snapshot={snapshot} />
      </SectionBlock>

      <SectionBlock
        id="cargos"
        kicker="Cargos"
        question="Nos mesmos páreos, mulheres aparecem mais entre vices e suplentes"
        align="wide"
        lead={
          <p>
            A presença é maior nas candidaturas a vice do que aos cargos titulares:
            {" "}{vp} entre vices à Presidência, contra {p} entre candidaturas à
            Presidência; e {vg} entre vices aos governos, contra {g} entre
            candidaturas a governadora.
          </p>
        }
        source={
          <>
            Fonte: TSE · Candidaturas 2026
            {baseStamp ? ` · fotografia da base de ${baseStamp}` : ""}
          </>
        }
      >
        <div className="space-y-8">
          <OfficePairChart snapshot={snapshot} />

          <div className="grid gap-5 md:grid-cols-3">
            <article className="poster-frame-accent p-5">
              <p className="record-label border-plum text-plum">Fato</p>
              <p className="mt-3 leading-relaxed text-ink/70">
                Na Presidência e nos governos, a presença de mulheres fica nos menores números do levantamento: {p} nas candidaturas à Presidência e {g} nas candidaturas a governadora. Nas candidaturas a vice desses mesmos pleitos, a proporção sobe para {vp} e {vg}.
              </p>
            </article>

            <article className="poster-frame-accent p-5">
              <p className="record-label border-coral text-coral-ink">Interpretação editorial</p>
              <p className="mt-3 leading-relaxed text-ink/70">
                A vice-presidência e a vice-governadoria não exercem o comando direto enquanto o titular estiver no cargo — são posições de composição de chapa, historicamente usadas para equilibrar coligações e a composição política da chapa, sem disputar o centro do poder. Quando a candidatura é à titularidade do Executivo, a presença de mulheres cai.
              </p>
            </article>

            <article className="poster-frame-accent p-5">
              <p className="record-label border-ink text-ink">Hipótese em investigação</p>
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
        tone="ink"
        kicker="Explore os dados"
        question="Daqui pra baixo, a consulta é sua"
        lead={<p>Filtre por cargo, estado e partido. Cada recorte mostra o próprio denominador, e abaixo de 20 candidaturas aparecem só os números absolutos.</p>}
      />

      <SectionBlock
        id="partidos"
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
            {baseStamp ? ` · fotografia da base de ${baseStamp}` : ""}
          </>
        }
      >
        <RaceExplorer snapshot={snapshot} />
      </SectionBlock>

      <SectionBlock
        id="estados"
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
            {baseStamp ? ` · fotografia da base de ${baseStamp}` : ""}
          </>
        }
      >
        <StateExplorer snapshot={snapshot} />
      </SectionBlock>

      <ComoSabemos
        fonte="TSE, Candidaturas 2026; IBGE, Censo Demográfico 2022 (SIDRA, tabela 9606)."
        universo="Candidaturas de mulheres registradas em 2026, com proporcional e majoritário lidos separadamente. Vices e suplentes entram só na comparação por cargo."
        base={baseStamp}
        calculo="Cada recorte é dividido pelo seu próprio total, dentro de um único universo. Abaixo de 20 candidaturas, aparecem só os números absolutos. No recorte por partido, a fatia de mulheres usa o total de candidaturas daquele partido; a distribuição por cor/raça usa as candidaturas de mulheres do partido. A ordem dos partidos é descritiva e não classifica mérito."
        limites={[
          "Cor/raça é autodeclaração ao TSE e não identifica pertencimento étnico nem vínculo com povo ou território indígena.",
          "Por estado, a fatia de mulheres dentro de cada partido ainda não aparece: o total de candidaturas por partido em cada estado passou a ser contado nesta versão e entra nas próximas coletas. Até lá, só números absolutos.",
          "Recursos, votos, eleitas e posições de poder por cor/raça dependem de fontes de 2026 ainda não disponíveis.",
          "Identidade trans ou travesti e deficiência ficam fora, porque a base não as registra de modo comparável.",
        ]}
      >
        <details className="border-b border-rule pb-4">
          <summary className="cursor-pointer font-mono text-[12px] uppercase tracking-wider text-plum">
            O que já é possível cruzar
          </summary>
          <div className="mt-4">
            <IntersectionPlan />
          </div>
        </details>
      </ComoSabemos>

      <NextAxes ids={["quem-controla", "funil", "direitos", "metodo"]} />
    </PageShell>
  );
}
