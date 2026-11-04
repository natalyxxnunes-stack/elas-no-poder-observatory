import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Secao } from "@/components/editorial/Secao";
import {
  M_BRANCAS,
  M_CADEIRAS,
  M_FEMINICIDIO,
  M_GOVERNOS,
  M_IGUALDADE,
  M_PISO,
  M_PL_PRETAS,
  M_SENADO,
  M_VOTOS,
  M_VPG,
  type Manchete,
} from "@/data/manchetes";
import { RECORTE_TOTAL } from "@/data/partido-uf-2026";
import { MONITOR_META } from "@/data/monitor-camara";
import { PRESENCA_DEPUTADAS } from "@/lib/monitor";
import { COAUTORIA_META, COAUTORIA_NOS } from "@/data/coautoria-camara";
import { CALENDARIO } from "@/data/calendario";
import { BASE_PUBLICA } from "@/data/base-publica";
import { formatInt as n, formatPct } from "@/lib/format-br";

const EDICAO = "Edição preliminar, 04/11/2026";

export const Route = createFileRoute("/relatorio-2026")({
  head: () => ({
    meta: [
      { title: "Relatório 2026 | Quem são elas?" },
      {
        name: "description",
        content:
          "O ano de 2026 em dados: quantas mulheres se candidataram, quantas se elegeram, quais mulheres chegaram, quem pagou e o que elas fizeram no plenário.",
      },
      { property: "og:title", content: "Relatório 2026: as mulheres na eleição, do registro à posse" },
    ],
  }),
  component: RelatorioPage,
});

const taxa = (e: number, c: number) => (100 * e) / c;
const r = RECORTE_TOTAL.candidaturasRaca;
const hb = taxa((RECORTE_TOTAL.eleitosRaca["BRANCA"] ?? 0) - (RECORTE_TOTAL.eleitasRaca["BRANCA"] ?? 0), (r["BRANCA"] ?? 0) - (RECORTE_TOTAL.candidatasRaca["BRANCA"] ?? 0));
const pretas = taxa(RECORTE_TOTAL.eleitasRaca["PRETA"] ?? 0, RECORTE_TOTAL.candidatasRaca["PRETA"] ?? 0);
const pardas = taxa(RECORTE_TOTAL.eleitasRaca["PARDA"] ?? 0, RECORTE_TOTAL.candidatasRaca["PARDA"] ?? 0);
const sozinha = (100 * COAUTORIA_NOS.reduce((a, x) => a + x.sozinha, 0)) / COAUTORIA_META.proposicoes;

type Capitulo = { titulo: string; achados: { texto: string; to: string; pagina: string; fonte: string; parcial?: boolean | undefined }[] };
const m = (x: Manchete) => ({ texto: x.texto, to: x.to, pagina: x.pagina, fonte: x.fonte, parcial: x.parcial });

const CAPITULOS: Capitulo[] = [
  {
    titulo: "Quantas chegaram",
    achados: [m(M_CADEIRAS), m(M_VOTOS), m(M_GOVERNOS), m(M_SENADO)],
  },
  {
    titulo: "Quais mulheres chegaram",
    achados: [
      m(M_BRANCAS),
      m(M_PL_PRETAS),
      {
        texto: `A taxa de eleição dos homens brancos candidatos a deputado foi de ${formatPct(hb)}; a das mulheres pretas, ${formatPct(pretas)}, e a das pardas, ${formatPct(pardas)}`,
        to: "/partidos#lanca-elege",
        pagina: "Partido por partido",
        fonte: "TSE, Candidatos 2026",
      },
    ],
  },
  { titulo: "Quem pagou", achados: [m(M_PISO)] },
  {
    titulo: "O que fizeram no plenário",
    achados: [
      m(M_IGUALDADE),
      {
        texto: `As deputadas registraram voto em ${formatPct(PRESENCA_DEPUTADAS)} das votações nominais de 2026 em que estavam em exercício (${n(MONITOR_META.votacoesNominais)} no ano); a Câmara inteira, em ${formatPct(MONITOR_META.casaPresencaPct ?? 0)}`,
        to: "/monitor",
        pagina: "Monitor de mandato",
        fonte: `Câmara dos Deputados, Dados Abertos (coleta em ${MONITOR_META.coletaEm})`,
      },
      {
        texto: `${formatPct(sozinha)} dos projetos apresentados por deputadas em 2026 têm uma só autora`,
        to: "/coautoria",
        pagina: "Quem assina junto",
        fonte: `Câmara dos Deputados, Dados Abertos (coleta em ${COAUTORIA_META.coletaEm})`,
      },
    ],
  },
  { titulo: "O preço de participar", achados: [m(M_VPG), m(M_FEMINICIDIO)] },
];

const AINDA_NAO = [
  "As contas das eleitas só são julgadas até 15/12; até lá, nenhuma conta aparece como aprovada ou desaprovada.",
  "A lista de eleitas vira definitiva com a diplomação, até 18/12. Esta edição usa o resultado totalizado pelo TSE.",
  "Quem vai ocupar Mesas, comissões e lideranças só se sabe a partir de 1º/02/2027.",
  "Os pedidos de posicionamento às parlamentares citadas nas reportagens ainda não têm resposta registrada.",
];

function RelatorioPage() {
  const proximas = CALENDARIO.filter((c) => c.data > "2026-11-04" && c.pauta).slice(0, 5);
  return (
    <PageShell breadcrumb={[{ label: "Histórias", to: "/reportagens" }, { label: "Relatório 2026" }]}>
      <header className="py-10 md:py-14">
        <Secao nome="Relatório 2026" tipo={EDICAO} />
        <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-tight text-plum md:text-6xl">
          2026 em dados: quantas mulheres chegaram, quais, quem pagou e o que fizeram
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
          O ano do observatório em uma página, com cada número ligado à página que o prova. Esta é a edição preliminar. A
          edição final sai depois da diplomação, em dezembro, e o que mudar entre as duas fica registrado aqui.
        </p>
      </header>

      <div className="space-y-14 pb-12">
        {CAPITULOS.map((c, i) => (
          <section key={c.titulo} aria-labelledby={`cap-${i}`}>
            <p className="font-display text-5xl leading-none text-coral" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h2 id={`cap-${i}`} className="mt-2 border-b-[3px] border-plum pb-2 font-display text-3xl italic text-plum">
              {c.titulo}
            </h2>
            <ol className="mt-2 divide-y divide-rule">
              {c.achados.map((a) => (
                <li key={a.texto} className="grid gap-2 py-5 md:grid-cols-[1fr_14rem] md:gap-8">
                  <p className="font-display text-xl leading-snug text-ink md:text-2xl">{a.texto}</p>
                  <div className="text-[13px] leading-relaxed text-ink/70">
                    <a href={a.to} className="font-semibold text-plum underline underline-offset-4">
                      {a.pagina} →
                    </a>
                    <p className="mt-1">{a.fonte}</p>
                    {a.parcial && <p className="mt-1 font-semibold text-ink">Dado ainda pode mudar.</p>}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>

      <section className="grid gap-10 border-t border-rule py-12 md:grid-cols-2" aria-label="O que falta e o que vem">
        <div>
          <h2 className="font-display text-2xl text-ink">O que ainda não sabemos</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-ink/80">
            {AINDA_NAO.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-2xl text-ink">O que vem</h2>
          <ul className="mt-3 space-y-3 text-[15px] leading-relaxed text-ink/80">
            {proximas.map((c) => (
              <li key={c.data}>
                <span className="font-semibold text-ink">{c.data.split("-").reverse().join("/")}</span> · {c.pauta}
              </li>
            ))}
          </ul>
          <Link to="/calendario" className="mt-3 inline-flex min-h-11 items-center font-semibold text-plum">
            Calendário completo →
          </Link>
        </div>
      </section>

      <section className="border-t border-rule py-10 text-[15px] leading-relaxed text-ink/80" aria-label="Como foi feito">
        <h2 className="font-display text-2xl text-ink">Como foi feito</h2>
        <p className="mt-2 max-w-3xl">
          Todos os números foram recontados pelo observatório a partir dos arquivos oficiais do TSE e dos dados abertos da
          Câmara e do Senado, com a impressão digital (SHA-256) de cada base. São {n(BASE_PUBLICA.length)} arquivos abertos para
          baixar em{" "}
          <Link to="/downloads" hash="dados" className="text-plum underline underline-offset-4">
            Base aberta
          </Link>
          , e as correções do ano estão no{" "}
          <Link to="/metodo" hash="correcoes" className="text-plum underline underline-offset-4">
            registro de correções
          </Link>
          .
        </p>
      </section>
    </PageShell>
  );
}
