import { M_BRANCAS } from "@/data/manchetes";
import { ManchetesStrip } from "@/components/editorial/Manchetes";
import { PartyStateMatrix } from "@/components/editorial/PartyStateMatrix";
import { SituacaoChart } from "@/components/editorial/SituacaoChart";
import { SITUACAO_2026 } from "@/data/situacao-candidaturas-2026";
import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { EditorialOpening } from "@/components/editorial/EditorialOpening";
import { CandidatasMajoritarias } from "@/components/editorial/CandidatasMajoritarias";
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
  const majoritarianPardaCount = majoritarianRaceCounts?.["PARDA"];
  const majoritarianPretaCount = majoritarianRaceCounts?.["PRETA"];
  const proportionalPardaFrequency = formatUmEmCada(raceShare(proportionalRaceCounts, "PARDA", proportionalRaceTotal));
  const majoritarianPardaFrequency = formatUmEmCada(raceShare(majoritarianRaceCounts, "PARDA", majoritarianRaceTotal));
  const share = (feminine: number | undefined, total: number | undefined) =>
    feminine !== undefined && total !== undefined && total > 0
      ? formatPct((feminine / total) * 100)
      : "—";
  const majoritarianDimensions = snapshot?.universes.majoritario.dimensions;
  const outOfUniverse = snapshot?.outOfUniverse;
  const g = share(
    majoritarianDimensions?.feminineByCargo?.["GOVERNADOR"],
    majoritarianDimensions?.totalByCargo?.["GOVERNADOR"],
  );
  const vg = share(
    outOfUniverse?.feminineByCargo?.["VICE-GOVERNADOR"],
    outOfUniverse?.byCargo?.["VICE-GOVERNADOR"],
  );
  const presidentialWomen = majoritarianDimensions?.feminineByCargo?.["PRESIDENTE"];
  const presidentialTotal = majoritarianDimensions?.totalByCargo?.["PRESIDENTE"];
  const vicePresidentialWomen = outOfUniverse?.feminineByCargo?.["VICE-PRESIDENTE"];
  const vicePresidentialTotal = outOfUniverse?.byCargo?.["VICE-PRESIDENTE"];
  const presidentialAbsolute = presidentialWomen !== undefined && presidentialTotal !== undefined
    ? `${formatInt(presidentialWomen)} das ${formatInt(presidentialTotal)}`
    : "—";
  const vicePresidentialAbsolute = vicePresidentialWomen !== undefined && vicePresidentialTotal !== undefined
    ? `${formatInt(vicePresidentialWomen)} das ${formatInt(vicePresidentialTotal)}`
    : "—";

  return (
    <PageShell breadcrumb={[{ label: "Dados 2026", to: "/" }, { label: "Quem são elas?" }]}>
      <EditorialOpening
        variant="race"
        kicker="Quem são elas?"
        question={`Brancas são ${proportionalWhite} das candidatas a deputada e ${majoritarianWhite} das que disputam Presidência, governos e Senado`}
        lead={
          <p>
            Brancas são {proportionalWhite} das candidatas a deputada e {majoritarianWhite} das que disputam Presidência, governos e Senado. Nessas disputas majoritárias, das {majoritarianRaceTotal > 0 ? formatInt(majoritarianRaceTotal) : "—"} mulheres, {majoritarianRaceCounts ? formatInt(majoritarianRaceCounts["BRANCA"] ?? 0) : "—"} são brancas, {majoritarianPardaCount !== undefined ? formatInt(majoritarianPardaCount) : "—"} pardas e {majoritarianPretaCount !== undefined ? formatInt(majoritarianPretaCount) : "—"} pretas. A queda está sobretudo nas pardas: eram {proportionalPardaFrequency} candidatas a deputada e viram {majoritarianPardaFrequency} nas candidaturas majoritárias.
          </p>
        }
        snapshot={snapshot}
      />

      <ManchetesStrip items={[M_BRANCAS]} label="Depois da urna" />

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
        id="censo"
        tone="butter"
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
            A presença é maior nas candidaturas a vice do que aos cargos titulares: {vicePresidentialAbsolute} candidaturas a vice-presidente são de mulheres, contra {presidentialAbsolute} à Presidência; e {vg} entre vices aos governos, contra {g} entre candidaturas a governadora.
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
                Na Presidência e nos governos, a presença de mulheres fica nos menores números do levantamento: {presidentialAbsolute} candidaturas à Presidência e {g} nas candidaturas a governadora. Nas candidaturas a vice desses mesmos pleitos, são {vicePresidentialAbsolute} na vice-presidência e {vg} nas vice-governadorias.
              </p>
            </article>

            <article className="poster-frame-accent p-5">
              <p className="record-label border-ink text-ink [border-style:dashed]">Interpretação editorial</p>
              <p className="mt-3 leading-relaxed text-ink/70">
                A vice-presidência e a vice-governadoria não exercem o comando enquanto o titular estiver no cargo. Quando a candidatura é ao comando, a presença de mulheres cai.
              </p>
            </article>

            <article className="poster-frame-accent p-5">
              <p className="record-label border-ink text-ink">Fato, em série</p>
              <p className="mt-3 leading-relaxed text-ink/70">
                Nos governos, o padrão se repete em todas as eleições desde 2014 e aumentou: mulheres passaram de 11,4% para 17,4% das candidaturas a titular e de 25,3% para 41,7% das candidaturas a vice. No Senado, a diferença oscila: em 2022, havia proporcionalmente mais mulheres entre as titulares (23,9%) do que entre as primeiras suplentes (23,4%).
              </p>
            </article>
          </div>

          <div>
            <p className="poster-eyebrow mb-4 text-ink">Titular e vice, de 2014 a 2026</p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[980px] border-collapse text-left text-sm">
                <caption className="sr-only">Participação de mulheres entre candidaturas titulares, vices e suplentes de 2014 a 2026</caption>
                <thead>
                  <tr className="border-b-2 border-ink">
                    {['Ano', 'Governadora', 'Vice-governadora', 'Senadora', '1ª suplente', '2ª suplente', 'Presidenta', 'Vice-presidenta'].map((label) => <th key={label} scope="col" className="py-2 pr-4 font-mono text-xs uppercase text-muted-foreground">{label}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['2014', '11,4% (20 de 176)', '25,3% (47 de 186)', '18,9% (35 de 185)', '20,6% (43 de 209)', '19,2% (41 de 214)', '3 de 12', '4 de 12'],
                    ['2018', '14,7% (30 de 204)', '36,0% (76 de 211)', '16,8% (63 de 374)', '22,7% (91 de 401)', '28,3% (117 de 413)', '2 de 14', '5 de 14'],
                    ['2022', '17,0% (38 de 224)', '38,8% (94 de 242)', '23,9% (58 de 243)', '23,4% (64 de 274)', '34,4% (95 de 276)', '4 de 13', '5 de 13'],
                    ['2026', '17,4% (35 de 201)', '41,7% (88 de 211)', '21,9% (70 de 319)', '30,4% (106 de 349)', '30,6% (107 de 350)', '2 de 14', '6 de 14'],
                  ].map(([year, ...cells]) => (
                    <tr key={year} className="border-b border-rule">
                      <th scope="row" className="py-3 pr-4 font-display text-lg text-ink">{year}</th>
                      {cells.map((cell, index) => <td key={`${year}-${index}`} className="whitespace-nowrap py-3 pr-4 font-mono text-xs text-ink">{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Pedidos de registro de cada eleição. O número de vices e suplentes pode diferir do de titulares por substituições e registros indeferidos que permanecem no arquivo. Fonte: TSE, Candidatos 2014, 2018, 2022 e 2026 (base de 27/10/2026, sem mudança em relação a 25/09 neste recorte). Só eleições gerais.</p>
            <p className="mt-2 border-l-2 border-coral pl-3 text-sm leading-relaxed text-ink/80"><strong>Correção em 28/10/2026:</strong> esta tabela e o Achado 03 incluíam, por erro nosso, candidaturas de eleições suplementares que o TSE publica no mesmo arquivo da eleição geral: o governo do Amazonas e o do Tocantins (arquivo de 2014), o Senado em Mato Grosso (arquivo de 2018) e o governo de Roraima (arquivo de 2022). Elas saíram, porque a série compara eleições gerais. Mudaram: governadora em 2014, de 12,0% para 11,4%; vice-governadora em 2014, de 24,0% para 25,3%; senadora em 2018, de 16,6% para 16,8%; primeira e segunda suplência em 2018, de 22,9% e 28,5% para 22,7% e 28,3%; governadora e vice-governadora em 2022, de 17,5% e 38,6% para 17,0% e 38,8%. A linha de 2026 ficou igual, e o padrão também: em todas as eleições há mais mulheres entre as vices do que entre as titulares.</p>
          </div>

          <div>
            <p className="poster-eyebrow mb-4 text-ink">Tabela completa de referência</p>
            <OfficeTable snapshot={snapshot} />
          </div>
        </div>
      </SectionBlock>

      <SectionBlock
        id="situacao"
        kicker="Pedidos de registro"
        question="Quantos pedidos ficaram de pé até a eleição"
        align="wide"
        lead={
          <p>
            Pedir registro é o primeiro passo; ser julgada apta é o segundo. Entre as mulheres, a saída da disputa por
            indeferimento, cancelamento ou renúncia fica parecida em todos os grupos de cor/raça. Entre os homens, pardos e
            pretos saem mais que brancos.
          </p>
        }
      >
        <SituacaoChart />
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Na Presidência, nos governos e no Senado, {formatInt(SITUACAO_2026.majoritario.FEMININO["indeferida ou cancelada"] ?? 0)} das{" "}
          {formatInt(SITUACAO_2026.majoritario.FEMININO.total)} candidaturas de mulheres foram indeferidas e{" "}
          {formatInt(SITUACAO_2026.majoritario.FEMININO["indeferida com recurso"] ?? 0)} seguem indeferidas com recurso. Entre as
          candidatas pardas, {formatInt(SITUACAO_2026.majoritario.FEMININO_raca["PARDA"]?.["indeferida ou cancelada"] ?? 0)} de{" "}
          {formatInt(SITUACAO_2026.majoritario.FEMININO_raca["PARDA"]?.total ?? 0)} foram indeferidas; entre as brancas,{" "}
          {formatInt(SITUACAO_2026.majoritario.FEMININO_raca["BRANCA"]?.["indeferida ou cancelada"] ?? 0)} de{" "}
          {formatInt(SITUACAO_2026.majoritario.FEMININO_raca["BRANCA"]?.total ?? 0)}. Base pequena: só números absolutos. A
          situação de cada uma está na lista abaixo.
        </p>
      </SectionBlock>

      <SectionBlock
        id="elas"
        kicker="Elas, cargo a cargo"
        question="Quem são as 107 mulheres que disputam a Presidência, os governos e o Senado"
        align="wide"
        lead={
          <p>
            Todas as candidaturas de mulheres aos cargos majoritários, com os dados públicos do registro: nome de urna, partido, estado, cor/raça declarada, quem está na chapa e quanto já declararam de receita. A lista segue a ordem de cargo e estado.
          </p>
        }
      >
        <CandidatasMajoritarias />
      </SectionBlock>

      <SectionBlock
        id="partidos"
        kicker="Explorador"
        question="Escolha o cargo, o estado e o partido e veja quem são elas ali"
        align="wide"
        tone="lilac"
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
        <div className="mt-8">
          <PartyStateMatrix snapshot={snapshot} />
        </div>
      </SectionBlock>

      <SectionBlock
        id="estados"
        kicker="Por estado"
        question="E no seu estado?"
        align="wide"
        tone="lilac"
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
        fonte="TSE, Candidaturas 2026; IBGE, Censo Demográfico 2022 (SIDRA, tabela 9606, mulheres de 18 anos ou mais)."
        universo="Candidaturas de mulheres registradas em 2026, com proporcional e majoritário lidos separadamente. Vices e suplentes entram só na comparação por cargo."
        base={baseStamp}
        calculo="Cada recorte é dividido pelo seu próprio total, dentro de um único universo. Abaixo de 20 candidaturas, aparecem só os números absolutos. No recorte por partido, a fatia de mulheres usa o total de candidaturas daquele partido; a distribuição por cor/raça usa as candidaturas de mulheres do partido. A ordem dos partidos é descritiva e não classifica mérito."
        limites={[
          "Cor/raça é autodeclaração ao TSE e não identifica pertencimento étnico nem vínculo com povo ou território indígena.",
          "Por estado, a fatia de mulheres dentro de cada partido aparece no explorador e no mapa partido × estado; com menos de 20 candidaturas na célula, só o número absoluto.",
          "Esta página trata das candidaturas. Dinheiro, votos e eleitas por cor/raça estão em Dinheiro, Votos e Quem chega; posições de poder entram a partir da posse, em 2027.",
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
