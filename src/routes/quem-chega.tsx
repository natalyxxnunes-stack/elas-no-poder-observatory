import { M_BRANCAS } from "@/data/manchetes";
import { Senado2027Chart, Senadoras2027 } from "@/components/editorial/Senado2027";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { EditorialOpening } from "@/components/editorial/EditorialOpening";
import { SectionBlock } from "@/components/editorial/SectionBlock";
import { InBrief } from "@/components/editorial/InBrief";
import { ContextBox } from "@/components/editorial/ContextBox";
import { StatusTag } from "@/components/editorial/StatusTag";
import { NextAxes } from "@/components/editorial/NextAxes";
import { ChartBar, ChartFrame, ChartScale, LegendSwatch } from "@/components/editorial/ChartFrame";
import { GapNote } from "@/components/GapNote";
import { axis } from "@/data/architecture";
import {
  RESULT_2026_GOVERNO,
  RESULT_2026_META,
  RESULT_2026_PARTIDOS,
  RESULT_2026_PRESIDENCIA,
  RESULT_2026_PROPORCIONAL,
  RESULT_2026_SENADO,
} from "@/data/resultado-2026";
import { formatInt, formatPct } from "@/lib/format-br";

/**
 * Quem chega? — resultado final de 2026, com o 2º turno de 25/10 (camada 1) e, a partir da posse
 * em 2027, as posições de poder (camada 2).
 *
 * Regras desta página:
 *  - cada cargo tem o próprio denominador (cadeiras daquele cargo); nada se soma
 *    entre casas diferentes, exceto o total proporcional já declarado no funil;
 *  - cor/raça nas categorias originais do TSE; nenhuma soma vira número principal;
 *  - bases menores que 20 aparecem como "X de Y", sem percentual;
 *  - "taxa de eleição do grupo" é eleitas ÷ candidatas do mesmo grupo. Descreve o
 *    grupo, não a chance de uma pessoa, e não explica a diferença.
 */

export const Route = createFileRoute("/quem-chega")({
  head: () => ({
    meta: [
      { title: "Quem chega? · Quem são elas? | Eleitas em 2026" },
      {
        name: "description",
        content:
          "Resultado final de 2026 por gênero, cor/raça, cargo, estado e partido, cada cargo lido sobre as próprias cadeiras. Ser eleita e ocupar poder são etapas diferentes.",
      },
      { property: "og:title", content: M_BRANCAS.texto },
      {
        property: "og:description",
        content:
          "Quantas mulheres se elegeram em 2026, de qual cor/raça, por quais estados e partidos. Recontagem independente do arquivo oficial do TSE.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: QuemChegaPage,
});

const RACES = ["BRANCA", "PARDA", "PRETA", "INDÍGENA", "AMARELA"] as const;
const RACE_LABEL: Record<string, string> = {
  BRANCA: "Branca",
  PARDA: "Parda",
  PRETA: "Preta",
  "INDÍGENA": "Indígena",
  AMARELA: "Amarela",
};
const SMALL = 20;

const n = formatInt;
const pct = (num: number, den: number) => formatPct((num / den) * 100);

const POWER_LAYERS = [
  {
    label: "Mesas diretoras",
    detail: "Presidência e demais cargos das mesas das casas legislativas.",
    pending: "Levantamento próprio, depois da posse e da eleição das mesas, em fevereiro de 2027.",
  },
  {
    label: "Presidências de comissão",
    detail: "Comissões permanentes e temporárias, onde a pauta legislativa é filtrada.",
    pending: "Levantamento próprio, depois da instalação das comissões.",
  },
  {
    label: "Lideranças",
    detail: "Lideranças de partido, de bloco e de governo.",
    pending: "Levantamento próprio, depois da posse.",
  },
  {
    label: "Executivo e secretarias",
    detail: "Chefia do Executivo e composição do primeiro escalão.",
    pending: "Levantamento próprio, depois da posse.",
  },
] as const;

function OfficeBars() {
  const r = RESULT_2026_PROPORCIONAL;
  const rows = [
    { label: "Câmara dos Deputados", f: r.byCargo.federal.feminine, t: r.byCargo.federal.seats },
    { label: "Assembleias legislativas", f: r.byCargo.estadual.feminine, t: r.byCargo.estadual.seats },
    { label: "Câmara Legislativa do DF", f: r.byCargo.distrital.feminine, t: r.byCargo.distrital.seats },
    { label: "Senado (54 cadeiras em disputa)", f: RESULT_2026_SENADO.electedFeminine, t: RESULT_2026_SENADO.seats },
  ];
  const gov = RESULT_2026_GOVERNO;
  const pres = RESULT_2026_PRESIDENCIA;
  return (
    <ChartFrame
      ficha={{
        vendo: "A fatia de cadeiras que ficou com mulheres em cada casa eleita em 2026.",
        contados: "Pessoas eleitas em 2026 para cada casa, sem vices nem suplentes.",
        denominador: "Cadeiras de cada casa: 513 na Câmara, 1.035 nas assembleias, 24 na CLDF e as 54 do Senado em disputa.",
        data: `Base do TSE de ${RESULT_2026_META.baseGeneratedAt}`,
        fonte: "TSE, Candidatos 2026, recontagem independente",
        limitacao: "No Senado entram só as 54 vagas de 2026; o terço eleito em 2022 fica fora. Governos e Presidência aparecem em número absoluto.",
      }}
      eyebrow="Eleitas por cargo · resultado final de 2026"
      title="Em cada casa, a fatia de cadeiras que ficou com mulheres"
      legend={<LegendSwatch className="bg-coral">mulheres eleitas, 2026</LegendSwatch>}
      note="Cada barra é lida dentro da própria casa: o denominador é o número de cadeiras daquele cargo. Câmaras diferentes não se somam."
      source={`Fonte: TSE, Candidatos 2026, base de ${RESULT_2026_META.baseGeneratedAt}, com o resultado do 1º e do 2º turno. Recontagem independente.`}
    >
      <div className="space-y-4">
        {rows.map((row) => (
          <ChartBar
            key={row.label}
            label={row.label}
            base={`${n(row.f)} de ${n(row.t)} cadeiras`}
            value={(row.f / row.t) * 100}
            display={row.t >= SMALL ? pct(row.f, row.t) : `${n(row.f)} de ${n(row.t)}`}
            barClass="bg-coral"
            scaleMax={50}
          />
        ))}
      </div>
      <ChartScale max={50} />
      <div className="mt-6 grid gap-4 border-t border-rule pt-5 sm:grid-cols-2">
        <div>
          <p className="font-mono text-[13px] uppercase tracking-wider text-muted-foreground">Governos estaduais e do DF</p>
          <p className="mt-1 font-display text-3xl leading-none text-ink">
            {n(gov.electedFeminine)} de {n(gov.totalUfs)}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {gov.electedFeminineNames
              .map((g) => `${g.nome} (${g.partido}-${g.uf})`)
              .join("; ")
              .replace(/; ([^;]*)$/, " e $1")}.
            Raquel Lyra venceu no 1º turno; as outras duas, no 2º turno de 25/10. Das {n(gov.runoffFeminine)} mulheres
            que chegaram ao 2º turno, {n(gov.runoffElectedFeminine)} venceram; perderam em{" "}
            {gov.runoffLostFeminineUfs.join(" e ")}. As três governadoras eleitas se declaram brancas.
          </p>
        </div>
        <div>
          <p className="font-mono text-[13px] uppercase tracking-wider text-muted-foreground">Presidência · 2º turno</p>
          <p className="mt-1 font-display text-3xl leading-none text-ink">
            {n(pres.mulheresNoSegundoTurno)} de {n(pres.segundoTurno)}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Nenhuma mulher no 2º turno, disputado por dois homens. Eram {n(pres.mulheres)} candidatas entre{" "}
            {n(pres.registros)} registros, uma branca e uma preta, e as duas pararam no 1º turno.
          </p>
        </div>
      </div>
    </ChartFrame>
  );
}

function RaceComposition() {
  const r = RESULT_2026_PROPORCIONAL;
  const candF = r.candidacyRaceFeminine as Record<string, number>;
  const eleF = r.electedRaceFeminine as Record<string, number>;
  const totalCand = r.candidacies.feminine;
  const totalEle = r.elected.feminine;
  return (
    <ChartFrame
      ficha={{
        vendo: "A composição por cor/raça das candidatas e das eleitas a deputada.",
        contados: "Candidaturas de mulheres e mulheres eleitas a deputada federal, estadual e distrital.",
        denominador: `Candidatas (${n(totalCand)}) e eleitas (${n(totalEle)}), cada barra na própria base.`,
        data: `Base do TSE de ${RESULT_2026_META.baseGeneratedAt}`,
        fonte: "TSE, Candidatos 2026, recontagem independente",
        limitacao: "Cor/raça autodeclarada. Indígenas e amarelas têm base pequena: leia pelo número absoluto.",
      }}
      eyebrow="Mulheres · deputadas federais, estaduais e distritais"
      title="Quem eram as candidatas e quem são as eleitas, por cor/raça"
      legend={
        <>
          <LegendSwatch className="bg-plum/40">entre as candidatas</LegendSwatch>
          <LegendSwatch className="bg-coral">entre as eleitas</LegendSwatch>
        </>
      }
      note={`As duas barras de cada grupo têm denominadores diferentes: ${n(totalCand)} candidaturas de mulheres e ${n(totalEle)} mulheres eleitas. Indígenas e amarelas têm base pequena: leia pelo número absoluto.`}
      source={`Fonte: TSE, Candidatos 2026, base de ${RESULT_2026_META.baseGeneratedAt}. Categorias originais de cor/raça, sem agregação.`}
    >
      <div className="space-y-5">
        {RACES.map((race) => (
          <div key={race} className="space-y-1.5">
            <ChartBar
              label={RACE_LABEL[race]}
              base={`${n(candF[race] ?? 0)} candidatas`}
              value={((candF[race] ?? 0) / totalCand) * 100}
              display={pct(candF[race] ?? 0, totalCand)}
              barClass="bg-plum/40"
              scaleMax={70}
            />
            <ChartBar
              label=""
              base={`${n(eleF[race] ?? 0)} eleitas`}
              value={((eleF[race] ?? 0) / totalEle) * 100}
              display={pct(eleF[race] ?? 0, totalEle)}
              barClass="bg-coral"
              scaleMax={70}
            />
          </div>
        ))}
      </div>
      <ChartScale max={70} />
    </ChartFrame>
  );
}

function ElectionRateTable() {
  const r = RESULT_2026_PROPORCIONAL;
  const candF = r.candidacyRaceFeminine as Record<string, number>;
  const eleF = r.electedRaceFeminine as Record<string, number>;
  const candAll = r.candidacyRaceAll as Record<string, number>;
  const eleAll = r.electedRaceAll as Record<string, number>;
  const rows = RACES.map((race) => {
    const cf = candF[race] ?? 0;
    const ef = eleF[race] ?? 0;
    const cm = (candAll[race] ?? 0) - cf;
    const em = (eleAll[race] ?? 0) - ef;
    return { race, cf, ef, cm, em };
  });
  const cell = (num: number, den: number) =>
    den >= SMALL ? (
      <>
        <span className="font-display text-lg text-ink">{pct(num, den)}</span>
        <span className="block font-mono text-[13px] text-muted-foreground">
          {n(num)} de {n(den)}
        </span>
      </>
    ) : (
      <span className="font-mono text-xs text-ink">
        {n(num)} de {n(den)}
      </span>
    );
  return (
    <ChartFrame
      ficha={{
        vendo: "De cada 100 candidaturas de um grupo de gênero e cor/raça, quantas se elegeram.",
        contados: "Candidaturas a deputada e deputado federal, estadual e distrital.",
        denominador: "Candidaturas do próprio grupo de gênero e cor/raça.",
        data: `Base do TSE de ${RESULT_2026_META.baseGeneratedAt}`,
        fonte: "TSE, Candidatos 2026, recontagem independente",
        limitacao: "Descreve o grupo, não a chance de uma pessoa. Grupos com menos de 20 candidaturas aparecem só em número absoluto.",
      }}
      eyebrow="Taxa de eleição do grupo · deputadas e deputados"
      title="De cada 100 candidaturas de um grupo, quantas se elegeram"
      note="Taxa de eleição do grupo = pessoas eleitas do grupo ÷ candidaturas do mesmo grupo. Descreve o resultado do grupo como um todo; não é a chance de uma candidata específica e não explica, sozinha, por que os grupos diferem. Votos, dinheiro de campanha e partido são as próximas camadas a cruzar."
      source={`Fonte: TSE, Candidatos 2026, base de ${RESULT_2026_META.baseGeneratedAt}. Homens = total do grupo menos mulheres do grupo.`}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[22rem] text-sm">
          <thead>
            <tr className="font-mono text-[13px] uppercase tracking-wider text-muted-foreground">
              <th className="pb-2 text-left font-normal">Cor/raça</th>
              <th className="pb-2 text-right font-normal">Mulheres</th>
              <th className="pb-2 text-right font-normal">Homens</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.race} className="border-t border-rule">
                <th scope="row" className="py-2.5 text-left font-normal text-ink">{RACE_LABEL[row.race]}</th>
                <td className="py-2.5 text-right">{cell(row.ef, row.cf)}</td>
                <td className="py-2.5 text-right">{cell(row.em, row.cm)}</td>
              </tr>
            ))}
            <tr className="border-t border-ink">
              <th scope="row" className="py-2.5 text-left font-semibold text-ink">Todas e todos</th>
              <td className="py-2.5 text-right">{cell(r.elected.feminine, r.candidacies.feminine)}</td>
              <td className="py-2.5 text-right">{cell(r.elected.masculine, r.candidacies.masculine)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </ChartFrame>
  );
}

function UfGrid() {
  const r = RESULT_2026_PROPORCIONAL;
  const fem = r.federalFeminineByUf as Record<string, number>;
  const seats = r.federalSeatsByUf as Record<string, number>;
  const rows = Object.entries(seats).map(([uf, t]) => ({ uf, t, f: fem[uf] ?? 0 }));
  rows.sort((a, b) => b.f / b.t - a.f / a.t || b.t - a.t);
  return (
    <ChartFrame
      ficha={{
        vendo: "Quantas cadeiras de cada estado na Câmara ficaram com mulheres.",
        contados: "Deputadas e deputados federais eleitos em 2026.",
        denominador: "Cadeiras do estado na Câmara, de 8 a 70.",
        data: `Base do TSE de ${RESULT_2026_META.baseGeneratedAt}`,
        fonte: "TSE, Candidatos 2026, recontagem independente",
        limitacao: "Estados com menos de 20 cadeiras aparecem só em número absoluto: uma eleita a mais muda muito o percentual.",
      }}
      eyebrow="Câmara dos Deputados · deputadas eleitas por estado"
      title="Quantas das cadeiras de cada estado ficaram com mulheres"
      legend={<LegendSwatch className="bg-coral">deputada eleita</LegendSwatch>}
      note="Cada ponto é uma cadeira do estado na Câmara. Estados com menos de 20 cadeiras aparecem só em número absoluto, porque um percentual sobre base tão pequena oscila demais com uma única eleita. Ordem: da maior para a menor fatia de mulheres."
      source={`Fonte: TSE, Candidatos 2026, base de ${RESULT_2026_META.baseGeneratedAt}. Recontagem independente.`}
    >
      <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map(({ uf, t, f }) => (
          <li key={uf} className="min-w-0">
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-mono text-xs font-semibold text-ink">{uf}</span>
              <span className="font-mono text-[13px] text-muted-foreground">
                {n(f)} de {n(t)}
                {t >= SMALL ? ` · ${pct(f, t)}` : ""}
              </span>
            </div>
            <div className="mt-1 flex flex-wrap gap-[3px]" aria-label={`${uf}: ${f} de ${t} cadeiras`}>
              {Array.from({ length: t }, (_, i) => (
                <span key={i} className={`size-2 rounded-full ${i < f ? "bg-coral" : "bg-muted"}`} />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </ChartFrame>
  );
}

function PartyTable() {
  const p = RESULT_2026_PARTIDOS;
  const rows = Object.entries(p.electedByParty).sort((a, b) => b[1] - a[1]);
  const fem = p.electedFeminineByParty as Record<string, number>;
  const race = p.electedRaceFeminineByParty as Record<string, Record<string, number>>;
  return (
    <ChartFrame
      ficha={{
        vendo: "Dentro de cada partido, a fatia de mulheres nas cadeiras que ele conquistou.",
        contados: "Eleitas e eleitos a deputado federal, estadual e distrital, pelo partido do registro.",
        denominador: "Cadeiras conquistadas pelo próprio partido, somando Câmara, assembleias e CLDF.",
        data: `Base do TSE de ${RESULT_2026_META.baseGeneratedAt}`,
        fonte: "TSE, Candidatos 2026, recontagem independente",
        limitacao: "Quem concorreu por federação aparece pelo próprio partido. Partidos com menos de 20 eleitos só em número absoluto.",
      }}
      eyebrow="Deputadas e deputados eleitos por partido · 2026"
      title="Dentro de cada partido, quantas das cadeiras conquistadas são de mulheres"
      legend={<LegendSwatch className="bg-coral">mulheres eleitas</LegendSwatch>}
      note={`Denominador: as cadeiras que o próprio partido conquistou somando Câmara, assembleias e CLDF, não o total nacional. Partidos com menos de 20 eleitos aparecem só em número absoluto. ${p.note}`}
      source={`Fonte: TSE, Candidatos 2026, base de ${p.baseGeneratedAt}. Partido do registro (SG_PARTIDO); quem concorreu por federação aparece pelo próprio partido.`}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[30rem] text-sm">
          <thead>
            <tr className="font-mono text-[13px] uppercase tracking-wider text-muted-foreground">
              <th className="pb-2 text-left font-normal">Partido</th>
              <th className="pb-2 text-right font-normal">Eleitos</th>
              <th className="pb-2 text-right font-normal">Mulheres</th>
              <th className="hidden pb-2 pl-4 text-left font-normal sm:table-cell">Cor/raça das eleitas</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([party, total]) => {
              const f = fem[party] ?? 0;
              const r = race[party] ?? {};
              return (
                <tr key={party} className="border-t border-rule align-top">
                  <th scope="row" className="py-2 text-left font-mono text-xs font-semibold text-ink">{party}</th>
                  <td className="py-2 text-right font-mono text-xs text-muted-foreground">{n(total)}</td>
                  <td className="py-2 text-right">
                    <span className="font-display text-base text-ink">
                      {total >= SMALL ? pct(f, total) : `${n(f)} de ${n(total)}`}
                    </span>
                    {total >= SMALL && <span className="block font-mono text-[13px] text-muted-foreground">{n(f)} de {n(total)}</span>}
                  </td>
                  <td className="hidden py-2 pl-4 text-xs leading-relaxed text-muted-foreground sm:table-cell">
                    {f === 0
                      ? "nenhuma mulher eleita"
                      : RACES.filter((k) => r[k]).map((k) => `${(RACE_LABEL[k] ?? k).toLowerCase()} ${r[k]}`).join(" · ")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </ChartFrame>
  );
}

function QuemChegaPage() {
  const a = axis("quem-chega");
  const r = RESULT_2026_PROPORCIONAL;
  const fed = r.byCargo.federal;
  return (
    <PageShell breadcrumb={[{ label: "Investigação", to: "/investigacoes" }, { label: "Quem chega?" }]}>
      <EditorialOpening
        variant="representation"
        kicker="Quem chega?"
        question={M_BRANCAS.texto}
        lead={
          <p>
            Em 2026, {n(fed.feminine)} das {n(fed.seats)} cadeiras da Câmara dos Deputados ficaram com mulheres.
            Esta página mostra quem são elas, por cor/raça, estado e partido. E separa duas coisas: ser eleita é uma
            etapa; ocupar uma posição de poder é outra.
          </p>
        }
        labels={["Mulheres", "Homens"]}
        seats={{ filled: fed.feminine, total: fed.seats, cols: 27 }}
        gap={`Câmara dos Deputados, eleição de 2026: ${n(fed.feminine)} de ${n(fed.seats)} cadeiras (${pct(fed.feminine, fed.seats)}). Cada ponto é uma cadeira.`}
      />


      <div className="pb-4">
        <InBrief
          found={
            <>
              Mulheres ficaram com {n(r.elected.feminine)} das {n(r.seats)} cadeiras de deputado federal, estadual e
              distrital ({pct(r.elected.feminine, r.seats)}), com {n(RESULT_2026_SENADO.electedFeminine)} das{" "}
              {n(RESULT_2026_SENADO.seats)} vagas do Senado em disputa e com {n(RESULT_2026_GOVERNO.electedFeminine)} dos{" "}
              {n(RESULT_2026_GOVERNO.totalUfs)} governos, depois do 2º turno. Entre as deputadas eleitas, {n(r.electedRaceFeminine["BRANCA"] ?? 0)} são brancas,{" "}
              {n(r.electedRaceFeminine["PARDA"] ?? 0)} pardas, {n(r.electedRaceFeminine["PRETA"] ?? 0)} pretas,{" "}
              {n(r.electedRaceFeminine["INDÍGENA"] ?? 0)} indígenas e {n(r.electedRaceFeminine["AMARELA"] ?? 0)} amarelas.
            </>
          }
          matters={
            <>
              A pergunta pública costuma parar em “quantas foram eleitas”. Olhar quem são elas mostra que a fatia de
              mulheres brancas é maior entre as eleitas do que entre as candidatas. E o poder de decidir pauta,
              orçamento e nomeações fica em cargos de direção que raramente entram na conta.
            </>
          }
          unknown={
            <>
              A diplomação em dezembro e, a partir da posse em 2027, quem ocupa presidências, mesas, comissões,
              lideranças e secretariados.
            </>
          }
        />
      </div>

      <SectionBlock id="cargos" kicker="Camada 1 · resultado" question="Quantas se elegeram, em cada cargo" align="wide">
        <OfficeBars />
      </SectionBlock>

      <SectionBlock
        id="senado"
        tone="lilac"
        kicker="Senado"
        question="O Senado de 2027: o PL vira um terço da Casa"
        align="wide"
        lead={
          <>
            <p>
              Das 54 vagas do Senado em disputa em 2026, o PL ganhou 19, quase o triplo do segundo colocado, o MDB, com
              7. Somadas às 8 cadeiras do partido com mandato até 2031, o PL deve começar 2027 com 27 das 81 cadeiras,
              contra 15 hoje. Um terço do Senado é exatamente o número de assinaturas que a Constituição exige para criar
              uma CPI e para apresentar uma proposta de emenda constitucional na Casa (arts. 58 e 60): o PL passa a poder
              fazer as duas coisas sozinho.
            </p>
            <p className="mt-3">
              As mulheres passam de 15 para 19 senadoras. Três delas são do PL: Michelle Bolsonaro, Bia Kicis e Carol de
              Toni. Bia Kicis e Carol de Toni, hoje deputadas, votaram contra a lei de igualdade salarial na Câmara, como
              mostra a reportagem Como votaram. Entre as 12 senadoras eleitas em 2026, 10 se declaram brancas e 2 pardas;
              nenhuma preta.
            </p>
          </>
        }
      >
        <Senado2027Chart />
        <div className="mt-6">
          <p className="poster-eyebrow mb-3 text-ink">As 19 senadoras previstas para 2027</p>
          <Senadoras2027 />
        </div>
      </SectionBlock>

      <SectionBlock
        id="raca"
        tone="lilac"
        kicker="Gênero e cor/raça"
        question="Quais mulheres se elegeram"
        align="wide"
        lead={
          <p>
            A comparação central do observatório aplicada ao resultado: a composição das candidatas, a composição das
            eleitas e, ao lado, quantas candidaturas de cada grupo viraram mandato.
          </p>
        }
      >
        <div className="grid gap-6 lg:grid-cols-2 [&>*]:min-w-0">
          <RaceComposition />
          <ElectionRateTable />
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <article className="poster-frame-accent p-5">
            <p className="record-label border-plum text-plum">Fato</p>
            <p className="mt-3 leading-relaxed text-ink/80">
              Mulheres brancas eram {pct(r.candidacyRaceFeminine["BRANCA"] ?? 0, r.candidacies.feminine)} das candidatas
              e são {pct(r.electedRaceFeminine["BRANCA"] ?? 0, r.elected.feminine)} das eleitas. Mulheres pardas eram{" "}
              {pct(r.candidacyRaceFeminine["PARDA"] ?? 0, r.candidacies.feminine)} e são{" "}
              {pct(r.electedRaceFeminine["PARDA"] ?? 0, r.elected.feminine)}.
            </p>
          </article>
          <article className="poster-frame-accent p-5">
            <p className="record-label border-ink text-ink [border-style:dashed]">Interpretação editorial</p>
            <p className="mt-3 leading-relaxed text-ink/80">
              A desigualdade de cor/raça aparece dentro do grupo das mulheres e também entre os homens. Ler só “mulheres
              eleitas” esconde quem, entre elas, chega.
            </p>
          </article>
          <article className="poster-frame-accent p-5">
            <p className="record-label border-ink text-ink">Hipótese em investigação</p>
            <p className="mt-3 leading-relaxed text-ink/80">
              Quanto da diferença acompanha a distribuição de dinheiro de campanha e de votos entre os grupos. As duas
              camadas ainda não estão cruzadas com o resultado.
            </p>
          </article>
        </div>
        <p className="mt-6 font-mono text-[13px] text-muted-foreground">
          Senado: as {n(RESULT_2026_SENADO.electedFeminine)} senadoras eleitas são{" "}
          {n((RESULT_2026_SENADO.electedRaceFeminine as Record<string, number>)["BRANCA"] ?? 0)} brancas e{" "}
          {n((RESULT_2026_SENADO.electedRaceFeminine as Record<string, number>)["PARDA"] ?? 0)} pardas. Nenhuma das{" "}
          {n(RESULT_2026_SENADO.candidacyRaceFeminine["PRETA"] ?? 0)} candidatas pretas ao Senado se elegeu.
        </p>
      </SectionBlock>

      <SectionBlock id="estados" kicker="Território" question="Por qual estado elas chegaram à Câmara" align="wide">
        <UfGrid />
      </SectionBlock>

      <SectionBlock id="partidos" tone="butter" kicker="Partido" question="Por quais partidos elas chegaram" align="wide">
        <PartyTable />
      </SectionBlock>

      <SectionBlock
        id="poder"
        kicker="Camada 2 · poder"
        question="Quem passou a decidir"
        align="wide"
        lead={
          <p>
            Cada posição institucional será contada em relação ao total de posições daquele tipo, e não ao total de
            eleitas. Essa camada começa com a posse, em 2027.
          </p>
        }
      >
        <ul className="grid gap-4 md:grid-cols-2">
          {POWER_LAYERS.map((l) => (
            <li key={l.label} className="editorial-card p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-lg text-ink">{l.label}</h3>
                <StatusTag tone="pending">a partir de 2027</StatusTag>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{l.detail}</p>
              <p className="mt-3 font-mono text-[13px] text-muted-foreground">{l.pending}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <ContextBox variant="significa">
            <p>
              “Posição institucional” é um cargo com poder de decisão sobre pauta, orçamento, relatoria ou nomeação, e
              não apenas um assento.
            </p>
          </ContextBox>
          <ContextBox variant="calculamos">
            <p>
              Número de mulheres em determinado tipo de cargo dividido pelo total de cargos daquele tipo, na mesma casa e
              no mesmo período. Universos de casas diferentes não são somados.
            </p>
          </ContextBox>
        </div>
        <div className="mt-6">
          <GapNote label="Lacuna declarada">
            Nenhuma projeção de composição de mesas é publicada antes das fontes oficiais.
          </GapNote>
        </div>
        <p className="mt-6 font-mono text-[13px] text-muted-foreground">
          Critérios e fórmulas em{" "}
          <Link to="/metodo" className="text-plum underline underline-offset-4">
            Método
          </Link>
        </p>
      </SectionBlock>

      <NextAxes ids={["votos", "funil", "quem-controla"]} />
    </PageShell>
  );
}
