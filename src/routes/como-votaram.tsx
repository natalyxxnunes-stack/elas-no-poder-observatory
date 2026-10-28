import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/editorial/PageHero";
import { SectionBlock } from "@/components/editorial/SectionBlock";
import { InBrief } from "@/components/editorial/InBrief";
import { ContextBox } from "@/components/editorial/ContextBox";
import { ComoSabemos } from "@/components/editorial/ComoSabemos";
import { NextAxes } from "@/components/editorial/NextAxes";
import { ChartBar, ChartFrame, ChartScale, LegendSwatch } from "@/components/editorial/ChartFrame";
import { GapNote } from "@/components/GapNote";
import { axis } from "@/data/architecture";
import { DEPUTADAS, DINHEIRO_REELEICAO, VOTACOES, VOTACOES_META, type Votacao } from "@/data/votacoes-camara";
import { formatBRLCompact, formatInt, formatPct } from "@/lib/format-br";

/**
 * Como votaram — investigação assinada: o voto das deputadas federais em cinco
 * votações nominais de mérito (2023–2025), com a posição da maioria da própria
 * bancada, a cor/raça declarada ao TSE em 2022 e o resultado de 2026.
 *
 * Regras desta página:
 *  - critério de seleção publicado e fixado antes do cruzamento com 2026;
 *  - ausência conta à parte, nunca como "não";
 *  - o cruzamento com a reeleição descreve; não mede efeito do voto;
 *  - bases abaixo de 20 aparecem como "X de Y".
 */

export const Route = createFileRoute("/como-votaram")({
  head: () => ({
    meta: [
      { title: "Como votaram · Quem são elas? | Deputadas em cinco votações da Câmara" },
      {
        name: "description",
        content:
          "Como votaram as deputadas federais em igualdade salarial, anistia às cotas, marco temporal, dosimetria do 8 de janeiro e PEC das prerrogativas, e quem voltou em 2026.",
      },
      { property: "og:title", content: "Como votaram as deputadas, e quem voltou" },
      {
        property: "og:description",
        content: "Cinco votações de mérito na Câmara, deputada por deputada, cruzadas com o resultado de 2026.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ComoVotaramPage,
});

const n = formatInt;
const pct = (num: number, den: number) => formatPct(den > 0 ? (num / den) * 100 : 0);
const SMALL = 20;
const show = (num: number, den: number) => (den >= SMALL ? pct(num, den) : `${n(num)} de ${n(den)}`);
const fmtDate = (iso: string) => iso.split("-").reverse().join("/");
const RACES = ["BRANCA", "PARDA", "PRETA", "INDÍGENA", "AMARELA"] as const;
const RACE_LABEL: Record<string, string> = {
  BRANCA: "Brancas",
  PARDA: "Pardas",
  PRETA: "Pretas",
  "INDÍGENA": "Indígenas",
  AMARELA: "Amarelas",
};
const SHORT: Record<string, string> = {
  "2351179-51": "Igualdade salarial",
  "2352476-149": "Anistia às cotas",
  "345311-270": "Marco temporal",
  "2358548-89": "Dosimetria 8/1",
  "2270800-160": "PEC prerrogativas",
};
const VOTO_CLASS: Record<string, string> = {
  Sim: "bg-plum text-cream",
  Não: "bg-coral text-ink",
  Ausente: "bg-secondary text-muted-foreground",
  Abstenção: "bg-lilac text-ink",
  Obstrução: "bg-lilac text-ink",
};

function byId(id: string) {
  const v = VOTACOES.find((x) => x.id === id);
  if (!v) throw new Error(`votação desconhecida: ${id}`);
  return v;
}

function reeleicao(v: Votacao, sexo: "F" | "M", voto: "Sim" | "Não") {
  const d = v.porSexo[sexo].desfechoPorVoto[voto];
  const total = d ? Object.values(d).reduce((a, b) => a + b, 0) : 0;
  return { reeleitas: d?.reeleita ?? 0, total };
}

function reelectionRange() {
  const rates = VOTACOES.flatMap((v) =>
    (["Sim", "Não"] as const).map((voto) => {
      const r = reeleicao(v, "F", voto);
      return (r.reeleitas / r.total) * 100;
    }),
  );
  return { min: Math.min(...rates), max: Math.max(...rates) };
}

const FICHA_BASE = {
  data: `Votações de ${VOTACOES.map((v) => fmtDate(v.data)).join(", ")}; coleta em ${VOTACOES_META.coletaEm}`,
  fonte: "Câmara dos Deputados, Dados Abertos (votos nominais e deputados em exercício na data)",
};

function VoteSplit({ v }: { v: Votacao }) {
  const f = v.porSexo.F;
  const m = v.porSexo.M;
  const rows = [
    { label: "Deputadas", d: f, cls: "bg-coral" },
    { label: "Deputados", d: m, cls: "bg-plum" },
  ];
  return (
    <ChartFrame
      eyebrow={`${v.proposicao} · ${fmtDate(v.data)}`}
      title={v.titulo}
      legend={<LegendSwatch className="bg-coral">votou Sim</LegendSwatch>}
      note={`Votar Sim: ${v.sim}. Placar oficial: ${n(v.placar.sim)} a ${n(v.placar.nao)}, ${n(v.placar.abstencao)} abstenções.`}
      source="Fonte: Câmara dos Deputados, Dados Abertos. Recontagem igual ao placar oficial."
      ficha={{
        vendo: "A fatia de quem votou Sim, entre deputadas e entre deputados em exercício na data.",
        contados: `Todas as pessoas em exercício no dia (${n(v.emExercicio)}), separadas pelo sexo registrado na Câmara. Quem presidia a sessão fica fora.`,
        denominador: `Deputadas em exercício (${n(f.total)}) e deputados em exercício (${n(m.total - (m.votos["Presidência da sessão"] ?? 0))}). Ausentes ficam no denominador e aparecem à parte.`,
        data: `Votação de ${fmtDate(v.data)}; coleta em ${VOTACOES_META.coletaEm}`,
        fonte: FICHA_BASE.fonte,
        limitacao: "O sexo vem do cadastro da Câmara. Ausência pode ter motivo regimental (licença, missão oficial) que o dado não informa.",
      }}
    >
      <div className="space-y-4">
        {rows.map((r) => {
          const total = r.d.total - (r.d.votos["Presidência da sessão"] ?? 0);
          const sim = r.d.votos["Sim"] ?? 0;
          return (
            <ChartBar
              key={r.label}
              label={r.label}
              base={`${n(sim)} Sim · ${n(r.d.votos["Não"] ?? 0)} Não · ${n(r.d.votos["Ausente"] ?? 0)} ausentes · de ${n(total)}`}
              value={(sim / total) * 100}
              display={pct(sim, total)}
              barClass={r.cls}
            />
          );
        })}
      </div>
      <ChartScale max={100} />
    </ChartFrame>
  );
}

function RaceVoteTable() {
  return (
    <ChartFrame
      eyebrow="Deputadas · cor/raça declarada ao TSE em 2022"
      title="Como votou cada grupo de deputadas, nas cinco votações"
      note="Cada célula mostra Sim / Não entre as deputadas daquele grupo presentes na votação. Bases pequenas: leia pelo número absoluto."
      source="Fonte: Câmara dos Deputados, Dados Abertos; TSE, Candidatos 2022. Junção por CPF. Categorias originais, sem agregação."
      ficha={{
        vendo: "Quantas deputadas de cada cor/raça votaram Sim e Não em cada votação.",
        contados: "Deputadas em exercício que votaram Sim ou Não. Ausentes e abstenções ficam fora desta tabela.",
        denominador: "Nenhum: a tabela mostra contagens absolutas, porque todas as bases por grupo ficam abaixo de 20 ou perto disso.",
        data: FICHA_BASE.data,
        fonte: "Câmara dos Deputados, Dados Abertos; TSE, Candidatos 2022 (cor/raça), junção por CPF",
        limitacao:
          "Cor/raça é a autodeclaração ao TSE na eleição de 2022. Nenhuma deputada se declarou amarela; a linha fica visível para manter as cinco categorias.",
      }}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[36rem] text-sm">
          <thead>
            <tr className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              <th className="pb-2 text-left font-normal">Grupo</th>
              {VOTACOES.map((v) => (
                <th key={v.id} className="pb-2 text-right font-normal">
                  {SHORT[v.id]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RACES.map((race) => (
              <tr key={race} className="border-t border-rule">
                <th scope="row" className="py-2 text-left font-normal text-ink">
                  {RACE_LABEL[race]}
                </th>
                {VOTACOES.map((v) => {
                  const c = v.racaDeputadas[race] ?? {};
                  return (
                    <td key={v.id} className="py-2 text-right font-mono text-xs text-ink">
                      {n(c["Sim"] ?? 0)} / {n(c["Não"] ?? 0)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ChartFrame>
  );
}

function ReelectionChart() {
  return (
    <ChartFrame
      eyebrow="Votação × resultado de 2026"
      title="De quem votou Sim e de quem votou Não, quantas deputadas se reelegeram"
      legend={
        <>
          <LegendSwatch className="bg-plum">votaram Sim</LegendSwatch>
          <LegendSwatch className="bg-coral">votaram Não</LegendSwatch>
        </>
      }
      note="Reeleita = eleita deputada federal de novo em 2026. Quem foi eleita para outro cargo, ficou suplente, não se elegeu ou não concorreu entra no total e fora das reeleitas."
      source="Fonte: Câmara dos Deputados, Dados Abertos; TSE, Candidatos 2026, base de 27/10/2026. Junção por CPF."
      ficha={{
        vendo: "A taxa de reeleição das deputadas, separada pelo voto que deram em cada votação.",
        contados: "Deputadas em exercício na data que votaram Sim ou Não naquela votação.",
        denominador: "Deputadas que votaram Sim (barra roxa) e deputadas que votaram Não (barra laranja), em cada votação.",
        data: `Votações de 2023 a 2025; resultado do TSE de 27/10/2026`,
        fonte: "Câmara dos Deputados, Dados Abertos; TSE, Candidatos 2026",
        limitacao:
          "Descreve; não mede efeito. A reeleição depende de partido, dinheiro, base local e da decisão de concorrer, e nada disso está controlado aqui.",
      }}
    >
      <div className="space-y-6">
        {VOTACOES.map((v) => {
          const s = reeleicao(v, "F", "Sim");
          const no = reeleicao(v, "F", "Não");
          return (
            <div key={v.id} className="space-y-1.5">
              <ChartBar
                label={SHORT[v.id]}
                base={`${n(s.reeleitas)} de ${n(s.total)} que votaram Sim`}
                value={(s.reeleitas / s.total) * 100}
                display={show(s.reeleitas, s.total)}
                barClass="bg-plum"
              />
              <ChartBar
                label=""
                base={`${n(no.reeleitas)} de ${n(no.total)} que votaram Não`}
                value={(no.reeleitas / no.total) * 100}
                display={show(no.reeleitas, no.total)}
                barClass="bg-coral"
              />
            </div>
          );
        })}
      </div>
      <ChartScale max={100} />
    </ChartFrame>
  );
}

function MoneyReelectionChart() {
  const d = DINHEIRO_REELEICAO;
  return (
    <ChartFrame
      eyebrow="Dinheiro de campanha × resultado de 2026"
      title="Quanto mais receita, mais reeleição, entre as deputadas e os deputados que tentaram voltar"
      legend={
        <>
          <LegendSwatch className="bg-coral">deputadas</LegendSwatch>
          <LegendSwatch className="bg-plum">deputados</LegendSwatch>
        </>
      }
      note={`Terços de receita calculados sobre as ${n(d.universo)} pessoas, com a mesma régua para mulheres e homens: até ${formatBRLCompact(d.cortes.t1)}, de ${formatBRLCompact(d.cortes.t1)} a ${formatBRLCompact(d.cortes.t2)} e acima disso.`}
      source="Fonte: Câmara dos Deputados, Dados Abertos; TSE, Candidatos 2026 e Prestação de Contas 2026 (bases de 27/10/2026). Junção por CPF."
      ficha={{
        vendo: "A taxa de reeleição em cada terço de receita de campanha, para mulheres e para homens.",
        contados: `Quem estava no mandato de deputado federal em alguma das cinco votações e se candidatou de novo à Câmara em 2026: ${n(d.F.tentaram)} mulheres e ${n(d.M.tentaram)} homens.`,
        denominador: "Pessoas do mesmo sexo dentro de cada terço de receita.",
        data: "Prestação de contas e resultado do TSE de 27/10/2026",
        fonte: "Câmara dos Deputados, Dados Abertos; TSE, Candidatos 2026 e Prestação de Contas 2026",
        limitacao:
          "Contas em andamento: parte das candidaturas só entregou a prestação parcial (receita até 08/09). Sem elas, o padrão se mantém. Mostra associação: quem já era forte pode ter atraído mais dinheiro.",
      }}
    >
      <div className="space-y-6">
        {d.faixas.map((f) => {
          const fe = d.F.porFaixa[f];
          const ma = d.M.porFaixa[f];
          return (
            <div key={f} className="space-y-1.5">
              <ChartBar
                label={f.charAt(0).toUpperCase() + f.slice(1)}
                base={`${n(fe.eleitos)} de ${n(fe.total)} deputadas`}
                value={(fe.eleitos / fe.total) * 100}
                display={show(fe.eleitos, fe.total)}
                barClass="bg-coral"
              />
              <ChartBar
                label=""
                base={`${n(ma.eleitos)} de ${n(ma.total)} deputados`}
                value={(ma.eleitos / ma.total) * 100}
                display={show(ma.eleitos, ma.total)}
                barClass="bg-plum"
              />
            </div>
          );
        })}
      </div>
      <ChartScale max={100} />
    </ChartFrame>
  );
}

function DeputadasTable() {
  const OUT_LABEL: Record<string, string> = {
    reeleita: "reeleita",
    "eleita para outro cargo": "outro cargo",
    suplente: "suplente",
    "não eleita": "não eleita",
    "não concorreu": "não concorreu",
  };
  return (
    <div className="overflow-x-auto border border-rule bg-card">
      <table className="w-full min-w-[56rem] text-sm">
        <thead>
          <tr className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            <th className="px-3 pb-2 pt-3 text-left font-normal">Deputada</th>
            <th className="px-3 pb-2 pt-3 text-left font-normal">Cor/raça (2022)</th>
            {VOTACOES.map((v) => (
              <th key={v.id} className="px-2 pb-2 pt-3 text-center font-normal">
                {SHORT[v.id]}
              </th>
            ))}
            <th className="px-3 pb-2 pt-3 text-left font-normal">Em 2026</th>
          </tr>
        </thead>
        <tbody>
          {DEPUTADAS.map((d) => {
            const last = VOTACOES.map((v) => d.votos[v.id]).filter(Boolean).at(-1);
            return (
              <tr key={d.nome} className="border-t border-rule align-top">
                <th scope="row" className="px-3 py-2 text-left font-normal">
                  <span className="text-ink">{d.nome}</span>
                  <span className="block font-mono text-[11px] text-muted-foreground">
                    {last?.partido}-{d.uf}
                  </span>
                </th>
                <td className="px-3 py-2 font-mono text-xs text-muted-foreground">{d.raca2022.toLowerCase()}</td>
                {VOTACOES.map((v) => {
                  const x = d.votos[v.id];
                  if (!x)
                    return (
                      <td key={v.id} className="px-2 py-2 text-center font-mono text-[11px] text-muted-foreground">
                        fora do mandato
                      </td>
                    );
                  return (
                    <td key={v.id} className="px-2 py-2 text-center">
                      <span
                        className={`inline-block min-w-14 px-1.5 py-0.5 font-mono text-[11px] ${VOTO_CLASS[x.voto] ?? "bg-secondary"}`}
                        title={x.alinhamento ? `${x.alinhamento} (maioria do ${x.partido}: ${x.bancada})` : undefined}
                      >
                        {x.voto}
                        {x.alinhamento === "contra a bancada" ? " *" : ""}
                      </span>
                    </td>
                  );
                })}
                <td className="px-3 py-2 font-mono text-xs text-ink">
                  {OUT_LABEL[d.desfecho2026] ?? d.desfecho2026}
                  {d.desfecho2026 === "eleita para outro cargo" && d.cargo2026 ? (
                    <span className="block text-[11px] text-muted-foreground">{d.cargo2026.toLowerCase()}</span>
                  ) : null}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="border-t border-rule px-3 py-3 text-xs leading-relaxed text-muted-foreground">
        * votou contra a maioria do próprio partido naquela votação. Partido e UF da última votação em que a deputada
        estava no mandato. “Fora do mandato”: não estava em exercício na data. Fonte: Câmara dos Deputados, Dados
        Abertos; TSE, Candidatos 2022 e 2026 (base de 27/10/2026).
      </p>
    </div>
  );
}

function ComoVotaramPage() {
  const a = axis("como-votaram");
  const igual = byId("2351179-51");
  const cotas = byId("2352476-149");
  const marco = byId("345311-270");
  const range = reelectionRange();
  const igualContra = igual.deputadasContraBancada.filter((d) => d.voto === "Não");
  const pretasMarco = marco.racaDeputadas["PRETA"] ?? {};
  return (
    <PageShell breadcrumb={[{ label: "Investigação", to: "/investigacoes" }, { label: "Como votaram" }]}>
      <PageHero
        kicker="Investigação"
        question={a.question}
        lead={
          <p>
            Cinco votações de mérito no plenário da Câmara, de 2023 a 2025, deputada por deputada. Na igualdade
            salarial, {n(igual.porSexo.F.votos["Não"] ?? 0)} deputadas votaram contra, e {n(igualContra.length)} delas
            votaram contra a maioria do próprio partido. Na anistia aos partidos que descumpriram a cota de mulheres e
            de pessoas negras, {n(cotas.porSexo.F.votos["Sim"] ?? 0)} votaram a favor.
          </p>
        }
        aside={
          <div className="editorial-card p-5">
            <p className="kicker">Assinatura</p>
            <p className="mt-2 font-display text-lg leading-snug text-ink">Apuração e texto: Nataly Nunes Pinto</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Publicada em 27/10/2026. Os números são recontagem própria dos dados abertos da Câmara e do TSE; a seleção
              das votações e a leitura são escolhas editoriais, declaradas abaixo.
            </p>
          </div>
        }
      />

      <div className="pb-4">
        <InBrief
          found={
            <>
              Entre as deputadas que votaram, a taxa de reeleição em 2026 ficou entre {formatPct(range.min)} e{" "}
              {formatPct(range.max)}, dos dois lados das cinco votações. O dinheiro separa muito mais: entre as que
              tentaram voltar, {n(DINHEIRO_REELEICAO.F.porFaixa["terço de maior receita"].eleitos)} de{" "}
              {n(DINHEIRO_REELEICAO.F.porFaixa["terço de maior receita"].total)} no terço de maior receita se reelegeram,
              contra {n(DINHEIRO_REELEICAO.F.porFaixa["terço de menor receita"].eleitos)} de{" "}
              {n(DINHEIRO_REELEICAO.F.porFaixa["terço de menor receita"].total)} no de menor. Os votos que mais dividiram as deputadas por
              cor/raça foram os do marco temporal e da dosimetria: entre as deputadas pretas, {n(pretasMarco["Não"] ?? 0)}{" "}
              votaram contra o marco temporal e {n(pretasMarco["Sim"] ?? 0)} a favor.
            </>
          }
          matters={
            <>
              Ser mulher no plenário diz pouco sobre o voto. As deputadas se dividiram em todas as cinco votações, inclusive
              nas duas que tratam diretamente de direitos das mulheres, e o partido pesou mais que o gênero.
            </>
          }
          unknown={
            <>
              Por que algumas votaram contra a própria bancada, e quanto da relação entre dinheiro e reeleição vem de
              quem já era forte antes da campanha.
            </>
          }
        />
      </div>

      <SectionBlock
        id="criterio"
        kicker="Critério"
        question="Quais votações entram, e por quê"
        align="wide"
        lead={<p>{VOTACOES_META.criterio} O critério foi fixado antes de cruzar os votos com o resultado de 2026.</p>}
      >
        <ul className="divide-y divide-rule border-y border-rule">
          {VOTACOES.map((v) => (
            <li key={v.id} className="grid gap-2 py-4 md:grid-cols-[10rem_1fr]">
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {v.bloco}
                <span className="block normal-case tracking-normal">{fmtDate(v.data)}</span>
              </p>
              <div>
                <h3 className="font-display text-lg text-ink">
                  {v.titulo} <span className="font-mono text-xs text-muted-foreground">· {v.proposicao}, {v.etapa}</span>
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Votar Sim: {v.sim}.</p>
              </div>
            </li>
          ))}
        </ul>
        <details className="group mt-6">
          <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-plum underline underline-offset-4 [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">Ver o que ficou de fora</span>
            <span className="hidden group-open:inline">Recolher</span>
          </summary>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
            {VOTACOES_META.foraDaSelecao.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </details>
      </SectionBlock>

      <SectionBlock
        id="votos"
        tone="lilac"
        kicker="O voto"
        question="Deputadas e deputados, votação por votação"
        align="wide"
      >
        <div className="grid gap-6 lg:grid-cols-2 [&>*]:min-w-0">
          {VOTACOES.map((v) => (
            <VoteSplit key={v.id} v={v} />
          ))}
        </div>
      </SectionBlock>

      <SectionBlock id="raca" kicker="Gênero e cor/raça" question="Quais deputadas votaram como" align="wide">
        <RaceVoteTable />
      </SectionBlock>

      <SectionBlock
        id="bancada"
        tone="butter"
        kicker="Partido"
        question="Quem votou contra o próprio partido"
        align="wide"
        lead={
          <p>
            Na Câmara, a maior parte do voto acompanha a bancada. Por isso o voto contra a maioria do próprio partido é
            o mais informativo sobre a posição individual de cada deputada.
          </p>
        }
      >
        <ul className="grid gap-4 md:grid-cols-2">
          {VOTACOES.map((v) => (
            <li key={v.id} className="editorial-card p-5">
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{SHORT[v.id]}</p>
              <p className="mt-1 font-display text-2xl text-ink">
                {n(v.deputadasContraBancada.length)} deputadas
              </p>
              <ul className="mt-3 space-y-1 text-sm leading-relaxed text-ink/85">
                {v.deputadasContraBancada.map((d) => (
                  <li key={d.nome}>
                    {d.nome} <span className="font-mono text-xs text-muted-foreground">({d.partido}-{d.uf})</span>: votou{" "}
                    {d.voto}; a maioria do partido votou {d.maioriaBancada}.
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <ContextBox variant="calculamos">
            <p>
              Maioria da bancada = o lado (Sim ou Não) que teve mais votos do partido da deputada naquela votação. A
              Câmara publica a orientação oficial por bloco, e a composição dos blocos de 2023 a 2025 não está disponível
              na API; por isso usamos a posição da maioria, medida padrão em estudos de disciplina partidária.
            </p>
          </ContextBox>
        </div>
      </SectionBlock>

      <SectionBlock
        id="quem-voltou"
        kicker="Votação × urna"
        question="Quem voltou em 2026: o voto e o dinheiro"
        align="wide"
      >
        <ReelectionChart />
        <div className="mt-6">
          <MoneyReelectionChart />
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <article className="poster-frame-accent p-5">
            <p className="record-label border-plum text-plum">Fato</p>
            <p className="mt-3 leading-relaxed text-ink/80">
              Pelo voto, a reeleição das deputadas variou entre {formatPct(range.min)} e {formatPct(range.max)}. Pela
              receita, variou de {show(DINHEIRO_REELEICAO.F.porFaixa["terço de menor receita"].eleitos, DINHEIRO_REELEICAO.F.porFaixa["terço de menor receita"].total)} no
              terço de menor receita a {show(DINHEIRO_REELEICAO.F.porFaixa["terço de maior receita"].eleitos, DINHEIRO_REELEICAO.F.porFaixa["terço de maior receita"].total)} no de maior.
            </p>
          </article>
          <article className="poster-frame-accent p-5">
            <p className="record-label border-ink text-ink [border-style:dashed]">Interpretação editorial</p>
            <p className="mt-3 leading-relaxed text-ink/80">
              Para quem tentou voltar à Câmara, o dinheiro de campanha acompanha a reeleição muito mais de perto que o
              voto nessas cinco pautas. A diferença é maior entre as mulheres do que entre os homens.
            </p>
          </article>
          <article className="poster-frame-accent p-5">
            <p className="record-label border-ink text-ink">Hipótese em investigação</p>
            <p className="mt-3 leading-relaxed text-ink/80">
              Parte da relação corre ao contrário: quem já tinha base e chance de vencer atrai mais dinheiro do partido e
              de doadores. Separar as duas coisas exige saber quanto veio do partido e em que momento, o que entra com a
              prestação final.
            </p>
          </article>
        </div>
      </SectionBlock>

      <SectionBlock
        id="deputadas"
        tone="lilac"
        kicker="Deputada por deputada"
        question={`As ${n(DEPUTADAS.length)} deputadas que estavam no mandato em alguma das cinco datas`}
        align="wide"
      >
        <DeputadasTable />
      </SectionBlock>

      <div className="pb-6">
        <GapNote label="Lacuna declarada">
          Votações simbólicas não registram voto individual e ficam fora, inclusive a urgência do PL 1904/2024. A
          cor/raça das deputadas é a declarada ao TSE em 2022; a Câmara não publica cor/raça. O sexo vem do cadastro da
          Câmara, que não distingue mulheres trans; a base não permite esse recorte.
        </GapNote>
      </div>

      <ComoSabemos
        fonte={VOTACOES_META.fonte}
        universo="Deputadas e deputados federais em exercício em cada uma das cinco datas, segundo a Câmara. Quem votou sem constar na lista de exercício do dia (1 caso, no marco temporal) entra pelo voto registrado."
        base={`Coleta em ${VOTACOES_META.coletaEm}`}
        calculo={
          <>
            Voto: lido de cada registro nominal. Ausente: em exercício e sem voto. Reeleita: eleita deputada federal em
            2026 pelo arquivo do TSE de 27/10/2026, junção por CPF. Placar recontado igual ao oficial nas cinco votações.
            Scripts em scripts/investigacao.
          </>
        }
        limites={[
          "A seleção das votações é escolha editorial; o critério está publicado acima e foi fixado antes do cruzamento com 2026.",
          "O cruzamento com a reeleição descreve. Não mede efeito do voto nem do dinheiro sobre a eleição.",
          "Receita da prestação de contas em andamento (27/10/2026); a prestação final do 1º turno vence em 3/11.",
          "Orientação oficial de bloco fica fora: a composição histórica dos blocos não está disponível na API.",
        ]}
      />

      <p className="pb-6 font-mono text-[12px] text-muted-foreground">
        Votos de 2026 na urna em{" "}
        <Link to="/votos" className="text-plum underline underline-offset-4">
          Votos
        </Link>
        ; eleitas de 2026 em{" "}
        <Link to="/quem-chega" className="text-plum underline underline-offset-4">
          Quem chega
        </Link>
        .
      </p>

      <NextAxes ids={["quem-chega", "votos", "metodo"]} />
    </PageShell>
  );
}
