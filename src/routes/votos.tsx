import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/editorial/PageHero";
import { SectionBlock } from "@/components/editorial/SectionBlock";
import { InBrief } from "@/components/editorial/InBrief";
import { ContextBox } from "@/components/editorial/ContextBox";
import { StatusTag } from "@/components/editorial/StatusTag";
import { NextAxes } from "@/components/editorial/NextAxes";
import { ChartBar, ChartFrame, ChartScale, LegendSwatch } from "@/components/editorial/ChartFrame";
import { GapNote } from "@/components/GapNote";
import { axis } from "@/data/architecture";
import { VOTOS_2026, VOTOS_2026_META, type VotosCargo } from "@/data/votos-2026";
import { formatInt, formatPct } from "@/lib/format-br";

/**
 * Votos — desempenho (voto nominal válido) do 1º turno de 2026, ao lado de
 * candidatura e resultado. Três etapas, três denominadores, mesmo recorte.
 * "Competitividade" continua fora: o indicador não foi definido antes do
 * resultado, e a regra do projeto é não usar a palavra sem definição prévia.
 */

export const Route = createFileRoute("/votos")({
  head: () => ({
    meta: [
      { title: "Votos · Quem são elas? | Candidatura, votos e cadeiras em 2026" },
      {
        name: "description",
        content:
          "Quanto dos votos para deputado foi para mulheres em 2026, por cor/raça e estado, ao lado da fatia de candidaturas e de cadeiras. Recontagem do arquivo oficial do TSE.",
      },
      { property: "og:title", content: "Quem consegue transformar candidatura em voto?" },
      {
        property: "og:description",
        content: "Candidaturas, votos e cadeiras de mulheres em 2026, cada etapa com o próprio denominador.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VotosPage,
});

const n = formatInt;
const pct = (num: number, den: number) => formatPct(den > 0 ? (num / den) * 100 : 0);
const sum = (o: Record<string, number> | undefined) => Object.values(o ?? {}).reduce((a, b) => a + b, 0);
const RACES = ["BRANCA", "PARDA", "PRETA", "INDÍGENA", "AMARELA"] as const;
const RACE_LABEL: Record<string, string> = {
  BRANCA: "brancas",
  PARDA: "pardas",
  PRETA: "pretas",
  "INDÍGENA": "indígenas",
  AMARELA: "amarelas",
};
const RACE_LABEL_M: Record<string, string> = {
  BRANCA: "brancos",
  PARDA: "pardos",
  PRETA: "pretos",
  "INDÍGENA": "indígenas",
  AMARELA: "amarelos",
};

const CARGO_LABEL = {
  federal: "Câmara dos Deputados",
  estadual: "Assembleias legislativas",
  distrital: "Câmara Legislativa do DF",
} as const;

function stages(c: VotosCargo) {
  const candT = sum(c.candidacies["FEMININO"]) + sum(c.candidacies["MASCULINO"]);
  const eleT = sum(c.elected["FEMININO"]) + sum(c.elected["MASCULINO"]);
  return {
    cand: { f: sum(c.candidacies["FEMININO"]), t: candT },
    votes: { f: sum(c.votes["FEMININO"]), t: c.votesTotal },
    seats: { f: sum(c.elected["FEMININO"]), t: eleT },
  };
}

const CONCEPTS = [
  {
    term: "Candidatura",
    meaning: "Registro na Justiça Eleitoral. É existência formal na disputa.",
    status: "publicado",
    ok: true,
  },
  {
    term: "Desempenho",
    meaning:
      "Voto nominal válido recebido, lido sobre o total de votos nominais válidos do mesmo cargo. Publicado nesta página.",
    status: "publicado",
    ok: true,
  },
  {
    term: "Resultado",
    meaning: "Eleita, suplente ou não eleita. Depende do sistema eleitoral do cargo, não só do total de votos.",
    status: "publicado",
    ok: true,
  },
  {
    term: "Competitividade",
    meaning:
      "Condição real de disputar: posição na chapa, recursos, propaganda e inserção territorial. O indicador não foi definido antes da apuração, e por isso a palavra segue fora do site.",
    status: "sem indicador",
    ok: false,
  },
] as const;

function StageChart({ cargo }: { cargo: keyof typeof VOTOS_2026 }) {
  const s = stages(VOTOS_2026[cargo]);
  const rows = [
    { label: "Candidaturas", d: s.cand, unit: "candidaturas", cls: "bg-plum/40" },
    { label: "Votos nominais válidos", d: s.votes, unit: "votos", cls: "bg-plum" },
    { label: "Cadeiras", d: s.seats, unit: "cadeiras", cls: "bg-coral" },
  ];
  return (
    <ChartFrame
      eyebrow={`${CARGO_LABEL[cargo]} · mulheres em cada etapa`}
      title={`Candidaturas, votos e cadeiras: ${pct(s.cand.f, s.cand.t)}, ${pct(s.votes.f, s.votes.t)} e ${pct(s.seats.f, s.seats.t)}`}
      note="Cada barra tem o próprio denominador. As três descrevem etapas diferentes e não se subtraem."
      source={`Fonte: TSE, Candidatos e Votação nominal 2026, bases de ${VOTOS_2026_META.baseGeneratedAt.slice(0, 10)}. Os 27 estados.`}
    >
      <div className="space-y-4">
        {rows.map((r) => (
          <ChartBar
            key={r.label}
            label={r.label}
            base={`${n(r.d.f)} de ${n(r.d.t)} ${r.unit}`}
            value={(r.d.f / r.d.t) * 100}
            display={pct(r.d.f, r.d.t)}
            barClass={r.cls}
            scaleMax={50}
          />
        ))}
      </div>
      <ChartScale max={50} />
    </ChartFrame>
  );
}

function RaceGenderTable({ cargo }: { cargo: keyof typeof VOTOS_2026 }) {
  const c = VOTOS_2026[cargo];
  const s = stages(c);
  const groups = (["FEMININO", "MASCULINO"] as const).flatMap((g) =>
    RACES.map((race) => ({
      key: `${g}-${race}`,
      label: g === "FEMININO" ? `Mulheres ${RACE_LABEL[race]}` : `Homens ${RACE_LABEL_M[race]}`,
      woman: g === "FEMININO",
      cand: c.candidacies[g]?.[race] ?? 0,
      votes: c.votes[g]?.[race] ?? 0,
      seats: c.elected[g]?.[race] ?? 0,
    })),
  );
  return (
    <ChartFrame
      eyebrow={`${CARGO_LABEL[cargo]} · gênero e cor/raça`}
      title="Fatia de cada grupo nas candidaturas, nos votos e nas cadeiras"
      legend={<LegendSwatch className="bg-coral">grupos de mulheres</LegendSwatch>}
      note={`Cada coluna soma 100%: ${n(s.cand.t)} candidaturas, ${n(s.votes.t)} votos nominais válidos e ${n(s.seats.t)} cadeiras. Indígenas e amarelas e amarelos têm base pequena: leia pelo número absoluto.`}
      source={`Fonte: TSE, Candidatos e Votação nominal 2026, bases de ${VOTOS_2026_META.baseGeneratedAt.slice(0, 10)}. Categorias originais de cor/raça, sem agregação. Os 27 estados.`}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[30rem] text-sm">
          <thead>
            <tr className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              <th className="pb-2 text-left font-normal">Grupo</th>
              <th className="pb-2 text-right font-normal">Candidaturas</th>
              <th className="pb-2 text-right font-normal">Votos</th>
              <th className="pb-2 text-right font-normal">Cadeiras</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((g) => (
              <tr key={g.key} className={`border-t border-rule ${g.woman ? "bg-coral/5" : ""}`}>
                <th scope="row" className="py-2 pl-1 text-left font-normal text-ink">{g.label}</th>
                <td className="py-2 text-right">
                  <span className="font-display text-base text-ink">{pct(g.cand, s.cand.t)}</span>
                  <span className="block font-mono text-[11px] text-muted-foreground">{n(g.cand)}</span>
                </td>
                <td className="py-2 text-right">
                  <span className="font-display text-base text-ink">{pct(g.votes, s.votes.t)}</span>
                  <span className="block font-mono text-[11px] text-muted-foreground">{n(g.votes)}</span>
                </td>
                <td className="py-2 text-right">
                  <span className="font-display text-base text-ink">{pct(g.seats, s.seats.t)}</span>
                  <span className="block font-mono text-[11px] text-muted-foreground">{n(g.seats)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ChartFrame>
  );
}

function UfVotes() {
  const byUf = VOTOS_2026.federal.votesByUf;
  const rows = Object.entries(byUf)
    .map(([uf, v]) => ({ uf, f: v.FEMININO, t: v.FEMININO + v.MASCULINO }))
    .sort((a, b) => b.f / b.t - a.f / a.t);
  return (
    <ChartFrame
      eyebrow="Câmara dos Deputados · votos nominais válidos por estado"
      title="Fatia dos votos para deputado federal que foi para candidatas, em cada estado"
      legend={<LegendSwatch className="bg-coral">votos em candidatas, 2026</LegendSwatch>}
      note="Cada estado é uma disputa própria: o denominador é o total de votos nominais válidos para deputado federal naquele estado."
      source={`Fonte: TSE, Votação nominal por município e zona 2026, base de ${VOTOS_2026_META.baseGeneratedAt.slice(0, 10)}.`}
    >
      <div className="grid gap-x-8 gap-y-3 md:grid-cols-2">
        {rows.map((r) => (
          <ChartBar
            key={r.uf}
            label={r.uf}
            base={`${n(r.f)} de ${n(r.t)}`}
            value={(r.f / r.t) * 100}
            display={pct(r.f, r.t)}
            barClass="bg-coral"
            scaleMax={50}
            stacked
          />
        ))}
      </div>
      <ChartScale max={50} stacked />
    </ChartFrame>
  );
}

function VotosPage() {
  const a = axis("votos");
  const fed = stages(VOTOS_2026.federal);
  const est = stages(VOTOS_2026.estadual);
  const vf = VOTOS_2026.federal.votes["FEMININO"] ?? {};
  const fedWomenVotes = sum(VOTOS_2026.federal.votes["FEMININO"]);
  return (
    <PageShell breadcrumb={[{ label: "Investigação", to: "/investigacoes" }, { label: "Votos" }]}>
      <PageHero
        kicker="Votos"
        question={a.question}
        lead={
          <p>
            Ter candidatura, receber votos e ganhar cadeira são três etapas diferentes. Em 2026, na Câmara, mulheres
            foram {pct(fed.cand.f, fed.cand.t)} das candidaturas, receberam {pct(fed.votes.f, fed.votes.t)} dos votos
            nominais válidos e ficaram com {pct(fed.seats.f, fed.seats.t)} das cadeiras.
          </p>
        }
        aside={
          <div className="editorial-card p-5">
            <p className="kicker">Regra</p>
            <p className="mt-2 font-display text-lg leading-snug text-ink">
              Definir o indicador antes de usar a palavra.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Esta página mede desempenho (voto recebido). “Competitividade” só entra no site com definição publicada no
              método.
            </p>
          </div>
        }
      />

      <div className="pb-4">
        <InBrief
          found={
            <>
              Para deputada federal, candidatas receberam {n(fed.votes.f)} dos {n(fed.votes.t)} votos nominais válidos (
              {pct(fed.votes.f, fed.votes.t)}). Para deputada estadual, {pct(est.votes.f, est.votes.t)}. Nos dois cargos,
              a fatia de votos fica abaixo da fatia de candidaturas e acima da fatia de cadeiras.
            </>
          }
          matters={
            <>
              Olhar só candidaturas e cadeiras esconde a etapa do meio. O voto mostra que a distância entre ter
              candidatas e eleger mulheres já aparece na urna, antes da distribuição das vagas.
            </>
          }
          unknown={
            <>
              Quanto da diferença acompanha dinheiro de campanha, posição no partido e tempo de propaganda. Esses
              cruzamentos são a próxima camada.
            </>
          }
        />
      </div>

      <SectionBlock id="etapas" kicker="Três etapas" question="Candidatura, voto e cadeira, lado a lado" align="wide">
        <div className="grid gap-6 lg:grid-cols-2 [&>*]:min-w-0">
          <StageChart cargo="federal" />
          <StageChart cargo="estadual" />
        </div>
        <p className="mt-4 font-mono text-[12px] text-muted-foreground">
          Câmara Legislativa do DF: mulheres foram {pct(stages(VOTOS_2026.distrital).cand.f, stages(VOTOS_2026.distrital).cand.t)} das
          candidaturas, receberam {pct(stages(VOTOS_2026.distrital).votes.f, stages(VOTOS_2026.distrital).votes.t)} dos votos e ficaram
          com {n(stages(VOTOS_2026.distrital).seats.f)} de {n(stages(VOTOS_2026.distrital).seats.t)} cadeiras.
        </p>
      </SectionBlock>

      <SectionBlock
        id="raca"
        tone="lilac"
        kicker="Gênero e cor/raça"
        question="Quais grupos recebem os votos"
        align="wide"
        lead={
          <p>
            Para a Câmara dos Deputados, a fatia de cada grupo de gênero e cor/raça nas três etapas. Dos{" "}
            {n(fedWomenVotes)} votos dados a candidatas, {pct(vf["BRANCA"] ?? 0, fedWomenVotes)} foram para mulheres
            brancas, {pct(vf["PARDA"] ?? 0, fedWomenVotes)} para pardas e {pct(vf["PRETA"] ?? 0, fedWomenVotes)} para pretas.
          </p>
        }
      >
        <RaceGenderTable cargo="federal" />
        <details className="group mt-6">
          <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-plum underline underline-offset-4 [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">Ver a mesma tabela para as assembleias legislativas</span>
            <span className="hidden group-open:inline">Recolher</span>
          </summary>
          <div className="mt-4">
            <RaceGenderTable cargo="estadual" />
          </div>
        </details>
      </SectionBlock>

      <SectionBlock id="estados" kicker="Território" question="Em quais estados as candidatas receberam mais votos" align="wide">
        <UfVotes />
      </SectionBlock>

      <SectionBlock kicker="Quatro conceitos" question="O que esta página mede e o que ainda não mede" align="wide">
        <ul className="divide-y divide-rule border-y border-rule">
          {CONCEPTS.map((c) => (
            <li key={c.term} className="py-5">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="font-display text-xl text-ink">{c.term}</h3>
                <StatusTag tone={c.ok ? "ok" : "pending"}>{c.status}</StatusTag>
              </div>
              <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">{c.meaning}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <ContextBox variant="calculamos">
            <p>
              Votos nominais válidos dados a candidaturas de um grupo, divididos pelo total de votos nominais válidos do
              mesmo cargo. Os totais nacionais somam as disputas dos estados de um mesmo cargo; nunca somamos votos de
              cargos diferentes. Voto de legenda não tem candidata nem candidato e fica fora.
            </p>
          </ContextBox>
          <ContextBox variant="importa">
            <p>
              Voto recebido descreve desempenho. Ele não mede, sozinho, as condições de disputa (dinheiro, propaganda,
              apoio do partido), e a relação entre essas coisas e o voto é descritiva, não prova de causa.
            </p>
          </ContextBox>
        </div>
        <div className="mt-6">
          <GapNote label="Lacuna declarada">
            Entre 14/10 e 27/10 esta página saiu sem Rondônia, porque o arquivo do TSE não trazia a votação do estado.
            Na base de 27/10 o estado voltou e os números passaram a somar os 27 estados. Votos anulados, inclusive os anulados sub
            judice, ficam fora por não serem válidos. O roteiro do projeto previa definir um indicador de
            competitividade antes do resultado; isso não foi feito a tempo, e qualquer indicador publicado depois virá
            com essa ressalva.
          </GapNote>
        </div>
        <p className="mt-6 font-mono text-[12px] text-muted-foreground">
          SHA-256 do arquivo de votação: <span className="break-all">{VOTOS_2026_META.zipSha256}</span>. Definições e
          fórmulas em{" "}
          <Link to="/metodo" className="text-plum underline underline-offset-4">
            Método
          </Link>
        </p>
      </SectionBlock>

      <NextAxes ids={["quem-chega", "dinheiro", "funil"]} />
    </PageShell>
  );
}
