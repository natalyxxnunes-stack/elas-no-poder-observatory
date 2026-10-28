import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/editorial/PageHero";
import { SectionBlock } from "@/components/editorial/SectionBlock";
import { ComoSabemos } from "@/components/editorial/ComoSabemos";
import { ManchetesStrip } from "@/components/editorial/Manchetes";
import { GapNote } from "@/components/GapNote";
import { M_PISO, M_PL_PRETAS, M_PRETAS_PARTIDOS, M_SENADO } from "@/data/manchetes";
import { FEFC_META, FEFC_PARTIDOS } from "@/data/fefc-partidos-2026";
import { RESULT_2026_GOVERNO, RESULT_2026_META, RESULT_2026_PARTIDOS } from "@/data/resultado-2026";
import { SENADO_2027, SENADO_2027_META } from "@/data/senado-2027";
import { PARTIDOS_VOTOS } from "@/data/partidos-votos";
import { VOTACOES } from "@/data/votacoes-camara";
import { formatInt, formatPct } from "@/lib/format-br";

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
  "2351179-51",
  "2352476-149",
  "2482078-57",
  "345311-270",
  "2358548-89",
  "2270800-160",
];

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

function EleitasTable() {
  const rows = linhas();
  return (
    <div className="overflow-x-auto border border-rule bg-card">
      <table className="w-full min-w-[52rem] text-sm">
        <caption className="sr-only">Mulheres eleitas por partido em 2026</caption>
        <thead>
          <tr className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            <th className="px-3 pb-2 pt-3 text-left font-normal">Partido</th>
            <th className={th}>Cadeiras de deputado</th>
            <th className={th}>Mulheres eleitas</th>
            <th className={th}>Brancas</th>
            <th className={th}>Pardas</th>
            <th className={th}>Pretas</th>
            <th className={th}>Indígenas</th>
            <th className={th}>Senado 2027</th>
            <th className={th}>Governadoras</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.partido} className="border-t border-rule">
              <th
                scope="row"
                className="px-3 py-2 text-left font-mono text-xs font-normal text-ink"
              >
                {r.partido}
              </th>
              <td className={td}>{n(r.cadeiras)}</td>
              <td className={td}>
                {n(r.mulheres)}
                {r.cadeiras > 0 && (
                  <span className="block text-[11px] text-muted-foreground">
                    {share(r.mulheres, r.cadeiras)}
                  </span>
                )}
              </td>
              <td className={td}>{n(r.raca["BRANCA"] ?? 0)}</td>
              <td className={td}>{n(r.raca["PARDA"] ?? 0)}</td>
              <td
                className={`${td} ${r.mulheres >= 10 && !(r.raca["PRETA"] ?? 0) ? "bg-coral/30" : ""}`}
              >
                {n(r.raca["PRETA"] ?? 0)}
              </td>
              <td className={td}>{n(r.raca["INDÍGENA"] ?? 0)}</td>
              <td className={td}>{r.senado > 0 ? `${n(r.senadoras)} de ${n(r.senado)}` : "—"}</td>
              <td className={td}>{r.governadoras > 0 ? n(r.governadoras) : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-rule px-3 py-3 text-xs leading-relaxed text-muted-foreground">
        Cadeiras de deputado federal, estadual e distrital eleitas em 2026, pelo partido do
        registro. Cor/raça declarada ao TSE, categorias originais; amarelas aparecem no total de
        mulheres. Fundo coral: partido com 10 ou mais deputadas eleitas e nenhuma preta. Senado
        2027: senadoras sobre o total previsto de cadeiras do partido (eleitas em 2026 e mandatos
        até 2031). Base de {n(RESULT_2026_PARTIDOS.seats)} cadeiras e{" "}
        {n(RESULT_2026_PARTIDOS.feminine)} mulheres eleitas. Fonte: TSE, Candidatos 2026 (base de{" "}
        {RESULT_2026_META.baseGeneratedAt}); Senado Federal, Dados Abertos (consulta de{" "}
        {SENADO_2027_META.consultaSenado}).
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
    <div className="overflow-x-auto border border-rule bg-card">
      <table className="w-full min-w-[48rem] text-sm">
        <caption className="sr-only">Fundo eleitoral por partido, candidaturas a deputado</caption>
        <thead>
          <tr className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
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
                  R$ {(d.fefc / 1e6).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} mi
                </td>
                <td className={td}>{p(d.mulheres.candidaturas, d.candidaturas)}</td>
                <td className={`${td} ${mf < 30 ? "bg-coral/40" : ""}`}>{formatPct(mf)}</td>
                <td className={td}>{p(d.pretasPardasSoma.candidaturas, d.candidaturas)}</td>
                <td className={`${td} ${pf < 30 ? "bg-coral/40" : ""}`}>{formatPct(pf)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="border-t border-rule px-3 py-3 text-xs leading-relaxed text-muted-foreground">
        Fundo Especial de Financiamento de Campanha recebido pelas candidaturas a deputado federal,
        estadual e distrital de cada partido, partidos com R$ 10 milhões ou mais. Coral: abaixo de
        30%, o piso da Constituição para mulheres (EC 117/2022) e para candidaturas pretas e pardas
        (EC 133/2024). Pretas e pardas aparecem somadas porque é assim que a emenda define o piso. A
        regra vale para o fundo do partido inteiro, incluindo governo e Senado; aqui a conta é só
        das candidaturas a deputado, onde a divisão não depende de como contar vices e suplentes.
        Fonte: TSE, Prestação de Contas 2026, base de {FEFC_META.baseGeneratedAt}; a prestação ainda
        está aberta e os números podem mudar.
      </p>
    </div>
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
        ? "bg-coral text-ink"
        : "bg-secondary text-muted-foreground";
  return (
    <div className="overflow-x-auto border border-rule bg-card">
      <table className="w-full min-w-[56rem] text-sm">
        <caption className="sr-only">Voto de cada bancada nas seis votações</caption>
        <thead>
          <tr className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
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
                      className="px-2 py-2 text-center font-mono text-[11px] text-muted-foreground"
                    >
                      —
                    </td>
                  );
                return (
                  <td key={v} className="px-2 py-2 text-center">
                    <span
                      className={`inline-block min-w-16 px-1.5 py-0.5 font-mono text-[11px] ${cls(d.maioria)}`}
                    >
                      {d.maioria === "dividida" ? "dividida" : d.maioria}
                    </span>
                    <span className="mt-1 block font-mono text-[10px] text-muted-foreground">
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
      <PageHero
        kicker="Partido por partido"
        question={M_PL_PRETAS.texto}
        lead={
          <p>
            A lei fixa pisos; quem escolhe as candidatas, divide o dinheiro e orienta o voto é o
            partido. Esta página põe lado a lado, para cada partido, quantas mulheres elegeu e quem
            são elas, como dividiu o fundo eleitoral e como a bancada votou nas seis votações de
            Como votaram.
          </p>
        }
      />

      <ManchetesStrip items={[M_PRETAS_PARTIDOS, M_PISO, M_SENADO]} />

      <SectionBlock
        id="eleitas"
        kicker="Eleitas"
        question="Quantas mulheres cada partido elegeu, e quem são elas"
        align="wide"
      >
        <EleitasTable />
      </SectionBlock>

      <SectionBlock
        id="fundo"
        tone="butter"
        kicker="Dinheiro"
        question="Como cada partido dividiu o fundo eleitoral"
        align="wide"
      >
        <FundoTable />
      </SectionBlock>

      <SectionBlock
        id="votos"
        tone="lilac"
        kicker="Plenário"
        question="Como cada bancada votou"
        align="wide"
      >
        <VotosTable />
      </SectionBlock>

      <div className="pb-6">
        <GapNote label="Lacuna declarada">
          Partidos mudam de nome, se fundem e trocam de membros entre 2023 e 2026: o voto vale com a
          sigla da data, e as eleitas, com a sigla do registro em 2026. A comparação entre tabelas é
          por sigla, não por pessoa. O fundo ainda vai mudar com a prestação final do 1º turno.
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
          "A prestação de contas do 1º turno ainda está aberta; a tabela do fundo será refeita com a prestação final.",
          "O voto em plenário usa a sigla da data do voto; as eleitas, a sigla do registro em 2026.",
          "Cor/raça é autodeclarada ao TSE; o arquivo não registra identidade trans ou travesti.",
        ]}
      />
    </PageShell>
  );
}
