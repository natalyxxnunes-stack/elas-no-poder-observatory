import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { FOTOS } from "@/data/fotos";
import { ArquivoDocumentalFEFC } from "@/components/editorial/ArquivoDocumentalFEFC";
import { DuasResolucoesFEFC } from "@/components/editorial/FacsimilesFEFC2026";
import { PILOT_CORAL } from "@/lib/editorial-pilot-colors";
import { SectionBlock } from "@/components/editorial/SectionBlock";
import { ComoSabemos } from "@/components/editorial/ComoSabemos";
import { GapNote } from "@/components/GapNote";
import { LancaElege } from "@/components/editorial/LancaElege";
import { M_PL_PRETAS } from "@/data/manchetes";
import { FEFC_META, FEFC_PARTIDOS } from "@/data/fefc-partidos-2026";
import { RESULT_2026_GOVERNO, RESULT_2026_META, RESULT_2026_PARTIDOS } from "@/data/resultado-2026";
import { SENADO_2027, SENADO_2027_META } from "@/data/senado-2027";
import { PARTIDOS_VOTOS } from "@/data/partidos-votos";
import { VOTACOES } from "@/data/votacoes-camara";
import { formatDecimal, formatInt, formatPct } from "@/lib/format-br";

export const Route = createFileRoute("/partidos")({
  head: () => ({
    meta: [
      { title: "Partido por partido | Quem são elas?" },
      {
        name: "description",
        content:
          "Quantas mulheres cada partido elegeu, quem são elas por cor/raça, como cada partido dividiu o fundo eleitoral e como cada bancada votou.",
      },
      { property: "og:title", content: M_PL_PRETAS.texto },
      {
        property: "og:description",
        content:
          "Eleitas, fundo eleitoral e voto em plenário, partido por partido, com os dados do TSE e da Câmara.",
      },
    ],
  }),
  component: PartidosPage,
});

const n = formatInt;
const SMALL = 20;
/** percentual só com base de 20 ou mais; abaixo disso, "X de Y" */
const share = (a: number, b: number) =>
  b >= SMALL ? formatPct((a / b) * 100) : `${n(a)} de ${n(b)}`;

const SHORT: Record<string, string> = {
  "2351179-51": "Igualdade salarial",
  "2352476-149": "Anistia às cotas",
  "2482078-57": "Norma do Conanda",
  "345311-270": "Marco temporal",
  "2358548-89": "Dosimetria 8/1",
  "2270800-160": "PEC prerrogativas",
};
const VOTE_IDS = [
  "2351179-51", "2352476-149", "2482078-57",
  "345311-270", "2358548-89", "2270800-160",
];

const FOTO_BANCADA = FOTOS["bancada-feminina-camara-marco-2026"]!;


type Linha = {
  partido: string;
  cadeiras: number;
  mulheres: number;
  raca: Record<string, number>;
  senado: number;
  senadoras: number;
  governadoras: number;
};

function linhas(): Linha[] {
  const cad = RESULT_2026_PARTIDOS.electedByParty as Record<string, number>;
  const fem = RESULT_2026_PARTIDOS.electedFeminineByParty as Record<string, number>;
  const raca = RESULT_2026_PARTIDOS.electedRaceFeminineByParty as Record<
    string,
    Record<string, number>
  >;
  const sen = new Map<string, { t: number; f: number }>();
  for (const c of SENADO_2027) {
    const x = sen.get(c.partido) ?? { t: 0, f: 0 };
    x.t++;
    if (c.genero === "F") x.f++;
    sen.set(c.partido, x);
  }
  const gov = new Map<string, number>();
  for (const g of RESULT_2026_GOVERNO.electedFeminineNames)
    gov.set(g.partido, (gov.get(g.partido) ?? 0) + 1);
  const partidos = new Set([...Object.keys(cad), ...sen.keys()]);
  return [...partidos]
    .map((p) => ({
      partido: p,
      cadeiras: cad[p] ?? 0,
      mulheres: fem[p] ?? 0,
      raca: raca[p] ?? {},
      senado: sen.get(p)?.t ?? 0,
      senadoras: sen.get(p)?.f ?? 0,
      governadoras: gov.get(p) ?? 0,
    }))
    .sort(
      (a, b) =>
        b.cadeiras - a.cadeiras || b.senado - a.senado || a.partido.localeCompare(b.partido),
    );
}

const th = "px-3 pb-2 pt-3 text-right font-normal";
const td = "px-3 py-2 text-right font-mono text-xs text-ink";

const RACA_COR: Record<string, string> = {
  BRANCA: "bg-[var(--race-branca)]",
  PARDA: "bg-[var(--race-parda)]",
  PRETA: "bg-plum",
  "INDÍGENA": "bg-forest",
  AMARELA: "bg-[var(--race-amarela)]",
};
const RACAS = [
  ["BRANCA", "brancas"],
  ["PARDA", "pardas"],
  ["PRETA", "pretas"],
  ["INDÍGENA", "indígenas"],
  ["AMARELA", "amarelas"],
] as const;
const GRANDES = 10;

/**
 * Gráfico de abertura: partidos com 10 ou mais cadeiras. A barra inteira são
 * as cadeiras do partido; a parte pintada, as deputadas eleitas, por cor/raça.
 */
function EleitasGrafico() {
  const rows = linhas().filter((r) => r.cadeiras >= GRANDES);
  const max = Math.max(...rows.map((r) => r.cadeiras));
  return (
    <figure className="border border-rule bg-card p-4 md:p-6">
      <figcaption className="font-display text-xl leading-snug text-ink">
        Cadeiras de cada partido e, dentro delas, as deputadas eleitas por cor/raça
      </figcaption>
      <ul aria-hidden="true" className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-ink/80">
        {RACAS.map(([k, l]) => (
          <li key={k} className="inline-flex items-center gap-1.5">
            <span className={`size-3 ${RACA_COR[k]}`} />
            {l}
          </li>
        ))}
        <li className="inline-flex items-center gap-1.5">
          <span className="size-3 bg-plum/10 ring-1 ring-inset ring-plum/20" />
          homens
        </li>
      </ul>
      <ol className="mt-5 space-y-3">
        {rows.map((r) => {
          const pretas = r.raca["PRETA"] ?? 0;
          return (
            <li key={r.partido} className="grid grid-cols-1 items-center gap-x-3 md:grid-cols-[7.5rem_minmax(0,1fr)_15rem]">
              <span className="font-mono text-[13px] font-semibold text-ink">{r.partido}</span>
              <span className="relative mt-1 block h-5 md:mt-0 bg-plum/10 ring-1 ring-inset ring-plum/20" style={{ width: `${(r.cadeiras / max) * 100}%` }}>
                <span className="absolute inset-y-0 left-0 flex" style={{ width: `${(r.mulheres / r.cadeiras) * 100}%` }}>
                  {RACAS.map(([k]) =>
                    (r.raca[k] ?? 0) > 0 ? (
                      <span key={k} className={`h-full ${RACA_COR[k]}`} style={{ width: `${((r.raca[k] ?? 0) / r.mulheres) * 100}%` }} />
                    ) : null,
                  )}
                </span>
              </span>
              <span className="mt-1 text-[13px] text-ink/80 md:mt-0">
                {n(r.mulheres)} de {n(r.cadeiras)}
                {r.cadeiras >= SMALL ? ` (${formatPct((r.mulheres / r.cadeiras) * 100)})` : ""}
                {r.mulheres >= GRANDES && pretas === 0 && (
                  <strong className="ml-1 border-b-2 border-coral font-semibold text-ink">nenhuma preta</strong>
                )}
              </span>
            </li>
          );
        })}
      </ol>
      <p className="mt-5 text-[13px] leading-relaxed text-muted-foreground">
        Partidos com {GRANDES} ou mais cadeiras de deputado federal, estadual e distrital eleitas em
        2026. Cor/raça declarada ao TSE. Fonte: TSE, Candidatos 2026, base de{" "}
        {RESULT_2026_META.baseGeneratedAt}.
      </p>
    </figure>
  );
}

function LinhaPartido({ r }: { r: Linha }) {
  const pretas = r.raca["PRETA"] ?? 0;
  return (
    <tr className="border-t border-rule">
      <th scope="row" className="px-3 py-2 text-left font-mono text-xs font-normal text-ink">
        {r.partido}
      </th>
      <td className={td}>{n(r.cadeiras)}</td>
      <td className={td}>
        {n(r.mulheres)}
        {r.cadeiras > 0 && (
          <span className="block text-[13px] text-muted-foreground">{share(r.mulheres, r.cadeiras)}</span>
        )}
      </td>
      <td className={td}>{n(r.raca["BRANCA"] ?? 0)}</td>
      <td className={td}>{n(r.raca["PARDA"] ?? 0)}</td>
      <td className={`${td} ${r.mulheres >= GRANDES && !pretas ? "border-l-4 border-coral font-semibold" : ""}`}>
        {n(pretas)}
      </td>
      <td className={td}>{n(r.raca["INDÍGENA"] ?? 0)}</td>
      <td className={td}>{n(r.raca["AMARELA"] ?? 0)}</td>
      <td className={td}>{r.senado > 0 ? `${n(r.senadoras)} de ${n(r.senado)}` : "—"}</td>
      <td className={td}>{r.governadoras > 0 ? n(r.governadoras) : "—"}</td>
    </tr>
  );
}

function CardPartido({ r }: { r: Linha }) {
  const pretas = r.raca["PRETA"] ?? 0;
  return (
    <li className="border-t-4 border-plum bg-card p-4">
      <p className="flex items-baseline justify-between gap-3">
        <span className="font-mono text-base font-semibold text-ink">{r.partido}</span>
        <span className="text-[13px] text-muted-foreground">{n(r.cadeiras)} cadeiras de deputado</span>
      </p>
      <p className="mt-2 font-display text-2xl text-plum">
        {n(r.mulheres)} <span className="font-sans text-[15px] text-ink">mulheres eleitas ({share(r.mulheres, r.cadeiras)})</span>
      </p>
      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-[15px] text-ink">
        {RACAS.map(([k, l]) => (
          <div key={k} className={`flex justify-between ${k === "PRETA" && r.mulheres >= GRANDES && !pretas ? "border-b-2 border-coral font-semibold" : ""}`}>
            <dt>{l[0]?.toUpperCase() + l.slice(1)}</dt>
            <dd className="font-mono">{n(r.raca[k] ?? 0)}</dd>
          </div>
        ))}
        <div className="flex justify-between">
          <dt>Senado 2027</dt>
          <dd className="font-mono">{r.senado > 0 ? `${n(r.senadoras)} de ${n(r.senado)}` : "—"}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Governadoras</dt>
          <dd className="font-mono">{r.governadoras > 0 ? n(r.governadoras) : "—"}</dd>
        </div>
      </dl>
    </li>
  );
}

function TabelaPartidos({ rows }: { rows: Linha[] }) {
  return (
    <>
      <div className="hidden overflow-x-auto border border-rule bg-card md:block">
        <table className="w-full min-w-[52rem] text-sm">
          <caption className="sr-only">Mulheres eleitas por partido em 2026</caption>
          <thead>
            <tr className="text-[13px] text-muted-foreground">
              <th className="px-3 pb-2 pt-3 text-left font-normal">Partido</th>
              <th className={th}>Cadeiras de deputado</th>
              <th className={th}>Mulheres eleitas</th>
              <th className={th}>Brancas</th>
              <th className={th}>Pardas</th>
              <th className={th}>Pretas</th>
              <th className={th}>Indígenas</th>
              <th className={th}>Amarelas</th>
              <th className={th}>Senado 2027</th>
              <th className={th}>Governadoras</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <LinhaPartido key={r.partido} r={r} />
            ))}
          </tbody>
        </table>
      </div>
      <ul className="grid gap-3 md:hidden">
        {rows.map((r) => (
          <CardPartido key={r.partido} r={r} />
        ))}
      </ul>
    </>
  );
}

function EleitasTable() {
  const rows = linhas();
  const grandes = rows.filter((r) => r.cadeiras >= GRANDES);
  const outros = rows.filter((r) => r.cadeiras < GRANDES);
  const [partido, setPartido] = useState(rows[0]?.partido ?? "");
  const selecionado = rows.find((r) => r.partido === partido);
  return (
    <div className="space-y-6">
      <EleitasGrafico />

      <div className="md:hidden border border-plum bg-cream px-4 py-5">
        <label htmlFor="eleitas-escolha-partido" className="block text-sm font-semibold text-plum">
          Consultar uma sigla
        </label>
        <select
          id="eleitas-escolha-partido"
          value={partido}
          onChange={(e) => setPartido(e.target.value)}
          className="mt-2 min-h-12 w-full border border-ink bg-paper px-3 text-base text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-plum"
        >
          {rows.map((r) => <option key={r.partido} value={r.partido}>{r.partido}</option>)}
        </select>
        <p className="mt-3 text-[13px] leading-relaxed text-ink/70">
          A ficha reúne deputados federais, estaduais e distritais eleitos pelo partido em 2026.
        </p>
        {selecionado && <ul className="mt-4"><CardPartido r={selecionado} /></ul>}
        <details className="mt-5 border-t border-plum/40 pt-3">
          <summary className="min-h-11 cursor-pointer font-semibold text-plum underline underline-offset-4">
            Consultar todas as siglas e respectivas fichas
          </summary>
          <div className="mt-4"><TabelaPartidos rows={rows} /></div>
        </details>
      </div>

      <div className="hidden md:block">
        <details className="group border border-plum bg-card px-4 py-3 md:px-5">
          <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-4 text-base font-semibold text-plum">
            Abrir a tabela de eleitas por partido e cor/raça
            <span aria-hidden="true" className="group-open:rotate-180">↓</span>
          </summary>
          <div className="mt-5">
            <TabelaPartidos rows={grandes} />
            {outros.length > 0 && (
              <details className="group mt-5 border border-rule bg-card">
                <summary className="flex min-h-12 cursor-pointer items-center justify-between px-4 font-medium text-plum">
                  Ver os outros {n(outros.length)} partidos, com menos de {GRANDES} cadeiras
                  <span aria-hidden="true" className="transition-transform group-open:rotate-180">↓</span>
                </summary>
                <div className="border-t border-rule p-3 md:p-0">
                  <TabelaPartidos rows={outros} />
                </div>
              </details>
            )}
          </div>
        </details>
      </div>

      <p className="text-[13px] leading-relaxed text-muted-foreground">
        Cadeiras de deputado federal, estadual e distrital eleitas em 2026, pelo partido do registro.
        Cor/raça declarada ao TSE nas categorias originais, incluindo amarelas, agora
        identificadas nas fichas e no quadro de consulta. Fio
        laranja: partido com {GRANDES} ou mais deputadas eleitas e nenhuma preta. Senado 2027:
        senadoras sobre o total previsto de cadeiras do partido (eleitas em 2026 e mandatos até
        2031). Base de {n(RESULT_2026_PARTIDOS.seats)} cadeiras e {n(RESULT_2026_PARTIDOS.feminine)}{" "}
        mulheres eleitas. Fonte: TSE, Candidatos 2026 (base de {RESULT_2026_META.baseGeneratedAt});
        Senado Federal, Dados Abertos (consulta de {SENADO_2027_META.consultaSenado}).
      </p>
    </div>
  );
}

function FundoTable() {
  const rows = Object.entries(FEFC_PARTIDOS)
    .filter(([, d]) => d.fefc >= 10_000_000)
    .sort((a, b) => b[1].fefc - a[1].fefc);
  const p = (a: number, b: number) => formatPct(b > 0 ? (a / b) * 100 : 0);
  return (
    <>
    <p className="mb-2 text-[13px] text-muted-foreground md:hidden">Deslize a tabela para ver todas as colunas →</p>
    <div tabIndex={0} className="overflow-x-auto border border-rule bg-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-plum">
      <table className="w-full min-w-[48rem] text-sm">
        <caption className="sr-only">Fundo eleitoral por partido, candidaturas a deputado</caption>
        <thead>
          <tr className="text-[13px] text-muted-foreground font-semibold">
            <th className="px-3 pb-2 pt-3 text-left font-normal">Partido</th>
            <th className={th}>Fundo recebido</th>
            <th className={th}>Mulheres · candidaturas</th>
            <th className={th}>Mulheres · fundo</th>
            <th className={th}>Pretas e pardas · candidaturas</th>
            <th className={th}>Pretas e pardas · fundo</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([partido, d]) => {
            const mf = (d.mulheres.fefc / d.fefc) * 100;
            const pf = (d.pretasPardasSoma.fefc / d.fefc) * 100;
            return (
              <tr key={partido} className="border-t border-rule">
                <th
                  scope="row"
                  className="px-3 py-2 text-left font-mono text-xs font-normal text-ink"
                >
                  {partido}
                </th>
                <td className={td}>
                  R$ {formatDecimal(d.fefc / 1e6).replace(/,0$/, "")} mi
                </td>
                <td className={td}>{p(d.mulheres.candidaturas, d.candidaturas)}</td>
                <td className={td}>{formatPct(mf)}</td>
                <td className={td}>{p(d.pretasPardasSoma.candidaturas, d.candidaturas)}</td>
                <td className={td}>{formatPct(pf)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="border-t border-rule px-3 py-3 text-xs leading-relaxed text-muted-foreground">
        Este quadro inclui apenas candidaturas a deputado federal, estadual e distrital, entre
        as siglas com R$ 10 milhões ou mais de FEFC declarado nesse universo.
        <strong> Nenhum percentual isolado desta tabela comprova cumprimento ou infração às cotas constitucionais.</strong>
        Para essa avaliação, seria necessário considerar o conjunto dos recursos de campanha do partido,
        incluindo disputas majoritárias, a regra aplicável e os lançamentos pertinentes.
        Pretas e pardas foram somadas exclusivamente na coluna indicada; nas análises raciais permanecem separadas.
        Fonte: TSE, Prestação de Contas 2026, base de {FEFC_META.baseGeneratedAt}; valores sujeitos a retificações.
      </p>
    </div>
    </>
  );
}

function VotosTable() {
  const partidos = new Set<string>();
  for (const v of VOTE_IDS) for (const p of Object.keys(PARTIDOS_VOTOS[v] ?? {})) partidos.add(p);
  const total = (p: string) =>
    VOTE_IDS.reduce(
      (s, v) => s + ((PARTIDOS_VOTOS[v]?.[p]?.sim ?? 0) + (PARTIDOS_VOTOS[v]?.[p]?.nao ?? 0)),
      0,
    );
  const rows = [...partidos].sort((a, b) => total(b) - total(a));
  const cls = (m?: string) =>
    m === "Sim"
      ? "bg-plum text-cream"
      : m === "Não"
        ? "border-2 border-ink bg-paper text-ink"
        : "bg-secondary text-muted-foreground";
  return (
    <>
    <p className="mb-2 text-[13px] text-muted-foreground md:hidden">Deslize a tabela para ver todas as colunas →</p>
    <div tabIndex={0} className="overflow-x-auto border border-rule bg-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-plum">
      <table className="w-full min-w-[56rem] text-sm">
        <caption className="sr-only">Voto de cada bancada nas seis votações</caption>
        <thead>
          <tr className="text-[13px] text-muted-foreground font-semibold">
            <th className="px-3 pb-2 pt-3 text-left font-normal">Bancada</th>
            {VOTE_IDS.map((v) => (
              <th key={v} className="px-2 pb-2 pt-3 text-center font-normal">
                {SHORT[v]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <tr key={p} className="border-t border-rule">
              <th
                scope="row"
                className="px-3 py-2 text-left font-mono text-xs font-normal text-ink"
              >
                {p}
              </th>
              {VOTE_IDS.map((v) => {
                const d = PARTIDOS_VOTOS[v]?.[p];
                if (!d || d.sim + d.nao === 0)
                  return (
                    <td
                      key={v}
                      className="px-2 py-2 text-center font-mono text-[13px] text-muted-foreground"
                    >
                      —
                    </td>
                  );
                return (
                  <td key={v} className="px-2 py-2 text-center">
                    <span
                      className={`inline-block min-w-16 px-1.5 py-0.5 font-mono text-[13px] ${cls(d.maioria)}`}
                    >
                      {d.maioria === "dividida" ? "dividida" : d.maioria}
                    </span>
                    <span className="mt-1 block font-mono text-[13px] text-muted-foreground">
                      {n(d.sim)} a {n(d.nao)}
                      {d.simF + d.naoF > 0 ? ` · elas ${n(d.simF)} a ${n(d.naoF)}` : ""}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="border-t border-rule px-3 py-3 text-xs leading-relaxed text-muted-foreground">
        <p>
          Lado com mais votos da bancada; embaixo, o placar Sim a Não da bancada inteira e das
          deputadas. Partido na data do voto, como registrado pela Câmara. O que significa votar Sim
          em cada uma:
        </p>
        <ul className="mt-2 space-y-1">
          {VOTE_IDS.map((v) => {
            const x = VOTACOES.find((y) => y.id === v);
            return x ? (
              <li key={v}>
                <span className="text-ink">{SHORT[v]}</span> ({x.proposicao},{" "}
                {x.data.split("-").reverse().join("/")}): {x.sim}.
              </li>
            ) : null;
          })}
        </ul>
        <p className="mt-2">
          Fonte: Câmara dos Deputados, Dados Abertos, recontagem igual ao placar oficial.{" "}
          <Link to="/como-votaram" className="underline decoration-plum underline-offset-4">
            Deputada por deputada em Como votaram
          </Link>
          .
        </p>
      </div>
    </div>
    </>
  );
}


/** Material real, situado na data e sem fingir que retrata as eleitas de outubro. */
function RegistroBancada() {
  return (
    <figure className="relative left-1/2 -ml-[50vw] w-screen bg-[var(--art-ink)] text-cream">
      <div className="mx-auto grid max-w-7xl gap-0 lg:grid-cols-[1.05fr_.95fr]">
        <img
          src={FOTO_BANCADA.src}
          alt={FOTO_BANCADA.alt}
          loading="lazy"
          className="h-[260px] w-full object-cover object-center sm:h-[410px] lg:h-[450px]"
        />
        <figcaption className="flex flex-col justify-center px-5 py-8 md:px-8 lg:px-12">
          <p className="font-mono text-[12px] font-semibold uppercase tracking-wide text-cream/75">
            Registro documental · antes da eleição de 2026
          </p>
          <h2 className="mt-4 max-w-md font-display text-3xl leading-tight text-cream md:text-4xl">
            Mulheres no Parlamento, em outra fotografia do tempo
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-cream/90">
            A imagem registra integrantes da bancada feminina da Câmara em março de 2026,
            antes das eleições. Não mostra o conjunto de candidatas ou eleitas contabilizado
            nos gráficos desta página. A composição das bancadas e as filiações devem ser
            lidas conforme a data de cada base.
          </p>
          <p className="mt-6 border-t border-cream/30 pt-3 text-[13px] leading-relaxed text-cream/80">
            {FOTO_BANCADA.credito} · {FOTO_BANCADA.acervo} · {FOTO_BANCADA.data}.
            {" "}<a href={FOTO_BANCADA.licencaUrl} target="_blank" rel="noreferrer"
              className="font-semibold text-cream underline underline-offset-4">Fonte e licença CC BY</a>.
          </p>
        </figcaption>
      </div>
    </figure>
  );
}

/** Caderno de provas PJe reutilizado pela investigação Quem controla. */
function ArquivoFEFC() {
  return <ArquivoDocumentalFEFC id="partidos-documentos-fefc" variante="ouro" />;
}

/** Consulta de FEFC por sigla; a conta está no mesmo recorte da tabela auditável. */
function FundoEmFoco() {
  const rows = Object.entries(FEFC_PARTIDOS)
    .filter(([, d]) => d.fefc >= 10_000_000)
    .sort((a, b) => b[1].fefc - a[1].fefc);
  const [partido, setPartido] = useState(rows[0]?.[0] ?? "");
  const d = FEFC_PARTIDOS[partido];
  const pct = (a: number, b: number) => b > 0 ? (a / b) * 100 : 0;
  return (
    <section aria-label="Consultar financiamento por partido" className="bg-plum px-5 py-7 text-cream md:px-8">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="font-mono text-[12px] font-semibold uppercase text-cream/75">Receitas declaradas de candidaturas</p>
          <h3 className="mt-2 font-display text-2xl leading-tight text-cream md:text-3xl">Quanto chegou às candidaturas neste recorte?</h3>
        </div>
        <label className="block text-sm font-semibold text-cream">
          Partido
          <select value={partido} onChange={(e) => setPartido(e.target.value)}
            className="mt-1 block min-h-12 min-w-52 border border-cream bg-paper px-3 text-base text-ink">
            {rows.map(([sigla]) => <option key={sigla} value={sigla}>{sigla}</option>)}
          </select>
        </label>
      </div>
      {d && (
        <div className="mt-6 grid gap-6 border-t border-cream/35 pt-6 md:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="font-display text-[clamp(2.8rem,5vw,4.2rem)] leading-none text-cream">
              R$ {formatDecimal(d.fefc / 1e6).replace(/,0$/, "")} mi
            </p>
            <p className="mt-2 text-sm leading-relaxed text-cream/85">
              Recebidos por candidaturas a deputado federal, estadual e distrital
              da sigla, conforme prestação de contas na base de {FEFC_META.baseGeneratedAt}.
            </p>
          </div>
          <dl className="space-y-5">
            {[
              {label: "Participação de candidaturas de mulheres no FEFC deste recorte", count: d.mulheres.fefc, total: d.fefc},
              {label: "Participação de candidaturas pretas e pardas somadas no FEFC deste recorte", count: d.pretasPardasSoma.fefc, total: d.fefc},
            ].map((x) => {
              const valor = pct(x.count, x.total);
              return <div key={x.label}>
                <dt className="max-w-md text-sm text-cream">{x.label}</dt>
                <dd className="mt-2">
                  <strong className="font-mono text-sm text-cream">{formatPct(valor)}</strong>
                  <span className="mt-2 block h-2.5 w-full bg-cream/25" aria-hidden="true">
                    <span className="block h-full bg-[var(--art-gold)]"
                      style={{width: Math.max(0,Math.min(valor,100)) + "%"}} />
                  </span>
                </dd>
              </div>;
            })}
          </dl>
        </div>
      )}
      <p className="mt-6 max-w-3xl border-t border-cream/30 pt-4 text-[13px] leading-relaxed text-cream/85">
        Atenção ao universo: a consulta não inclui candidaturas majoritárias nem todos
        os gastos partidários. Esses percentuais não são teste de cumprimento de cotas
        constitucionais; a tabela completa abaixo permite conferir numeradores,
        denominadores e demais siglas.
      </p>
    </section>
  );
}

/** Exposição de uma votação por vez sem omitir a matriz integral. */
function VotacaoEmFoco() {
  const [votoId, setVotoId] = useState<string>(VOTE_IDS[0]!);
  const partidos = Object.keys(PARTIDOS_VOTOS[votoId] ?? {}).sort();
  const [sigla, setSigla] = useState("");
  const partido = partidos.includes(sigla) ? sigla : (partidos.includes("PL") ? "PL" : (partidos[0] ?? ""));
  const d = PARTIDOS_VOTOS[votoId]?.[partido];
  const fonte = VOTACOES.find((v) => v.id === votoId);
  return (
    <section aria-label="Votação nominal em foco" className="bg-paper p-5 text-ink md:p-8">
      <p className="font-mono text-[12px] font-semibold uppercase tracking-wide text-plum">
        Câmara dos Deputados · seis votações nominais selecionadas
      </p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="block text-sm font-semibold">Votação
          <select value={votoId} onChange={(e) => {setVotoId(e.target.value);setSigla("");}}
            className="mt-1 block min-h-12 w-full border border-ink bg-card px-3 text-base">
            {VOTE_IDS.map((id) => <option value={id} key={id}>{SHORT[id]}</option>)}
          </select>
        </label>
        <label className="block text-sm font-semibold">Bancada
          <select value={partido} onChange={(e) => setSigla(e.target.value)}
            className="mt-1 block min-h-12 w-full border border-ink bg-card px-3 text-base">
            {partidos.map((p) => <option value={p} key={p}>{p}</option>)}
          </select>
        </label>
      </div>
      {fonte && <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink/80">
        {fonte.proposicao} · {fonte.data.split("-").reverse().join("/")}:
        votar <strong>Sim</strong> nesta deliberação significava: {fonte.sim}.
      </p>}
      {d ? (
        <div className="mt-6 grid gap-4 border-t-2 border-ink pt-5 sm:grid-cols-[1fr_1fr_1.2fr]">
          <div><p className="font-display text-4xl text-plum">{n(d.sim)}</p><p className="mt-1 text-sm">votos Sim na bancada</p></div>
          <div><p className="font-display text-4xl text-plum">{n(d.nao)}</p><p className="mt-1 text-sm">votos Não na bancada</p></div>
          <div className="border-t border-rule pt-3 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
            <p className="font-display text-2xl text-ink">{d.maioria === "dividida" ? "Dividida" : "Maioria: " + d.maioria}</p>
            <p className="mt-2 font-mono text-[13px] text-ink/75">
              Deputadas da bancada: {n(d.simF)} Sim, {n(d.naoF)} Não
            </p>
          </div>
        </div>
      ) : <p className="mt-5 text-sm">Sem votos Sim/Não registrados para a sigla nesta votação.</p>}
      <p className="mt-5 border-t border-rule pt-4 text-[13px] leading-relaxed text-ink/75">
        A maioria observada na votação não equivale a orientação formal de liderança,
        nem a unanimidade da bancada. As siglas refletem a data da votação, entre 2023 e 2025,
        não necessariamente as filiações de 2026.
      </p>
    </section>
  );
}

function PartidosPage() {
  return (
    <PageShell
      breadcrumb={[
        { label: "Investigação", to: "/investigacoes" },
        { label: "Partido por partido" },
      ]}
    >
      <header className="relative left-1/2 -ml-[50vw] w-screen bg-coral-ink text-white" style={{ backgroundColor: PILOT_CORAL }}>
        <div className="mx-auto grid max-w-7xl gap-9 px-5 py-12 md:px-8 md:py-16 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
          <div>
            <p className="font-display text-xl italic text-white">Partido por partido</p>
            <h1 className="mt-5 max-w-3xl text-balance font-display text-[clamp(2.25rem,5vw,4.6rem)] font-semibold leading-[1.06] text-white">
              {M_PL_PRETAS.texto}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white md:text-lg">
              A lei estabelece pisos. Os partidos decidem candidaturas e distribuem
              recursos segundo regras próprias. Comparamos eleitas, financiamento
              declarado e votos efetivamente registrados pelas bancadas, sem
              confundir a eleição de 2026 com votações ocorridas em 2023–2025.
            </p>
          </div>
          <aside aria-label="Universo da investigação" className="self-end bg-[var(--art-ink)] px-6 py-7 text-[var(--art-cream)] md:px-8 md:py-9">
            <p className="font-mono text-[12px] uppercase tracking-wide text-[var(--art-cream)]/80">Eleições 2026 · TSE</p>
            <p className="mt-4 font-display text-[clamp(3rem,6vw,5rem)] leading-none text-[var(--art-gold)]">{n(RESULT_2026_PARTIDOS.feminine)}</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-[var(--art-cream)]">
              deputadas federais, estaduais e distritais eleitas entre
              {" "}{n(RESULT_2026_PARTIDOS.seats)} cadeiras.
            </p>
            <p className="mt-5 border-t border-[var(--art-cream)]/30 pt-4 font-mono text-[12px] leading-relaxed text-[var(--art-cream)]/85">
              Resultado: base TSE de {RESULT_2026_META.baseGeneratedAt}. Financiamento e votação
              usam outras fontes e datas, indicadas em cada capítulo.
            </p>
          </aside>
        </div>
      </header>

      <nav aria-label="Ir para os quatro recortes por partido" className="my-7 bg-[var(--art-plum)] px-5 py-5 text-cream md:px-7">
        <p className="font-mono text-[12px] font-semibold uppercase tracking-wide text-cream/80">
          Quatro comparações · bases e universos diferentes
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["#eleitas", "Eleitas e cor/raça"],
            ["#lanca-elege", "Quem se candidata e se elege"],
            ["#fundo", "Recursos de campanha"],
            ["#votos", "Votações das bancadas"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="flex min-h-12 items-center justify-between gap-3 border border-cream/40 px-3 py-2 text-sm font-semibold text-cream hover:bg-cream/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
            >
              {label} <span aria-hidden="true">↘</span>
            </a>
          ))}
        </div>
      </nav>

      <SectionBlock
        id="eleitas"
        kicker="Eleitas"
        question="Quantas mulheres cada partido elegeu, e quem são elas"
        tone="ink"
        align="wide"
      >
        <div className="bg-paper p-4 text-ink md:p-7">
          <EleitasTable />
        </div>
      </SectionBlock>
      
      <section aria-label="Como interpretar as comparações" className="relative left-1/2 -ml-[50vw] w-screen bg-[var(--art-violet)] text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-5 px-5 py-8 md:grid-cols-[.25fr_.75fr] md:gap-8 md:px-8 md:py-11">
          <p className="font-display text-7xl leading-none text-white" aria-hidden="true">04</p>
          <div>
            <h2 className="font-display text-2xl leading-tight text-white md:text-3xl">Quatro recortes. Quatro perguntas diferentes.</h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-white">
              Cadeiras conquistadas, candidaturas registradas, recursos recebidos e votos de bancada
              têm períodos e universos próprios. As tabelas se complementam, mas não permitem
              reconstituir sozinhas a trajetória de uma candidata.
            </p>
          </div>
        </div>
      </section>

      <SectionBlock
        id="lanca-elege"
        tone="butter"
        kicker="Quem o partido lança e quem ele elege"
        question="Dentro do mesmo partido, quem se elege: a taxa por gênero e cor/raça"
        align="wide"
      >
        <LancaElege />
      </SectionBlock>

      <RegistroBancada />

      <SectionBlock
        id="fundo"
        kicker="Dinheiro"
        question="Os critérios que os partidos publicaram e o fundo que chegou às candidaturas"
        align="wide"
        lead={<p>
          Critérios partidários formalizados no TSE, cotas destinadas aos partidos e
          repasses declarados pelas candidaturas são registros diferentes.
          Aqui a comparação financeira se restringe às disputas proporcionais de deputado.
        </p>}
      >
        <div className="space-y-6">
          <ArquivoFEFC />
          <DuasResolucoesFEFC />
          <FundoEmFoco />
          <details className="group border border-plum bg-paper px-4 py-3 md:px-5">
            <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-3 text-base font-semibold text-plum">
              Abrir tabela integral de receitas por partido
              <span aria-hidden="true" className="group-open:rotate-180">↓</span>
            </summary>
            <div className="mt-4"><FundoTable /></div>
          </details>
        </div>
      </SectionBlock>

      <SectionBlock
        id="votos"
        tone="ink"
        kicker="Plenário"
        question="Seis votações, diferentes composições de bancada"
        align="wide"
        lead={<p>
          O voto acompanha a filiação registrada na data da deliberação.
          Esta comparação não mede o comportamento das eleitas de 2026,
          nem substitui a apuração individual de cada votação.
        </p>}
      >
        <div className="space-y-6">
          <VotacaoEmFoco />
          <details className="group border border-cream/50 px-4 py-3 md:px-5">
            <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-3 text-base font-semibold text-cream">
              Abrir a matriz completa das seis votações
              <span aria-hidden="true" className="group-open:rotate-180">↓</span>
            </summary>
            <div className="mt-4 bg-paper p-2 text-ink md:p-4"><VotosTable /></div>
          </details>
        </div>
      </SectionBlock>

      <div className="pb-6">
        <GapNote label="Lacuna declarada">
          Partidos mudam de nome, se fundem e trocam de membros entre 2023 e 2026:
          o voto vale com a sigla da data, e as eleitas, com a sigla do registro em 2026.
          A comparação entre tabelas é por sigla, não por pessoa. O FEFC reflete
          as receitas declaradas pelas candidaturas na base de {FEFC_META.baseGeneratedAt},
          com prestações ainda sujeitas a retificação ou julgamento.
        </GapNote>
      </div>

      <ComoSabemos
        fonte="TSE, Candidatos 2026 e Prestação de Contas 2026; Câmara dos Deputados e Senado Federal, Dados Abertos"
        universo="Eleitas e eleitos para deputado federal, estadual e distrital em 2026; composição prevista do Senado em 2027; governadoras eleitas; candidaturas a deputado com fundo eleitoral; deputadas e deputados em exercício nas seis votações."
        base={`Resultado e candidaturas: base do TSE de ${RESULT_2026_META.baseGeneratedAt}; fundo: base de ${FEFC_META.baseGeneratedAt}; Senado: consulta de ${SENADO_2027_META.consultaSenado}`}
        calculo={
          <>
            Contagens próprias, sem estimativa. Percentual só com base de {SMALL} ou mais. Scripts
            em scripts/recontagem (fefc_partidos_2026.py) e scripts/investigacao
            (7_partidos_votos.py).
          </>
        }
        limites={[
          "O FEFC utiliza a base de 15/11/2026; parte das contas não estava em situação final. Os valores declarados podem ser retificados e precisam ser distinguidos dos gastos realizados pelo partido.",
          "O voto em plenário usa a sigla da data do voto; as eleitas, a sigla do registro em 2026.",
          "Cor/raça é autodeclarada ao TSE; o arquivo não registra identidade trans ou travesti.",
        ]}
      />
    </PageShell>
  );
}
