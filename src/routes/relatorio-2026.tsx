import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Secao } from "@/components/editorial/Secao";
import { ProporcaoCadeirasRelatorio, FotoPlenarioRelatorio } from "@/components/editorial/EvidenciasGrafadas2026";
import { CadernoDeFontes } from "@/components/editorial/CadernoDocumentalRevista";
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
  const planos = [
    { fundo: "bg-ink", claro: true, numero: "text-[var(--art-gold)]", rotulo: "O resultado das urnas" },
    { fundo: "bg-paper", claro: false, numero: "text-plum", rotulo: "Cor, raça e desigualdade" },
    { fundo: "bg-[var(--art-gold)]", claro: false, numero: "text-ink", rotulo: "Financiamento declarado" },
    { fundo: "bg-[var(--art-plum)]", claro: true, numero: "text-[var(--art-gold)]", rotulo: "Mandatos em exercício" },
    { fundo: "bg-[#c53f22]", claro: true, numero: "text-paper", rotulo: "Violência e participação" },
  ];

  return (
    <PageShell breadcrumb={[{ label: "Histórias", to: "/reportagens" }, { label: "Relatório 2026" }]}>
      <header className="relative left-1/2 -ml-[50vw] w-screen bg-[var(--art-plum)] text-paper">
        <div className="mx-auto max-w-7xl px-5 py-11 md:px-8 md:py-16">
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 text-[13px]">
            <p className="font-semibold text-[var(--art-gold)]">Relatório 2026 · Edição preliminar</p>
            <p className="font-mono text-paper/85">{EDICAO}</p>
          </div>
          <h1 className="mt-5 max-w-6xl font-display text-[clamp(3rem,6.4vw,6.2rem)] leading-[1.01]">
            2026 em dados: quantas mulheres chegaram, quais, quem pagou e o que fizeram
          </h1>
          <div className="mt-8 grid gap-7 border-t border-paper/30 pt-6 md:grid-cols-[1.2fr_.8fr]">
            <p className="max-w-2xl text-lg leading-relaxed text-paper/90">
              Uma leitura dos resultados de 2026 e dos registros disponíveis sobre quem já exercia mandato.
              Cada achado encaminha para a análise, a fonte e o respectivo recorte. Esta edição
              registra o que estava disponível em 4 de novembro de 2026.
            </p>
            <aside className="border-l-4 border-[var(--art-gold)] pl-5 text-[14px] leading-relaxed text-paper/85">
              Eleição, diplomação e exercício efetivo do mandato têm datas e universos diferentes.
              Os dados de atuação parlamentar de 2026 referem-se às deputadas observadas naquele período,
              e não necessariamente às recém-eleitas.
            </aside>
          </div>
        </div>
      </header>

      <nav aria-label="Navegar pelos cinco capítulos do relatório" className="border-b border-rule py-6">
        <p className="text-[13px] font-semibold text-plum">Neste relatório</p>
        <ol className="mt-3 flex flex-wrap gap-x-7 gap-y-3">
          {CAPITULOS.map((c, i) => (
            <li key={c.titulo}>
              <a href={"#relatorio-cap-" + i} className="inline-flex min-h-10 items-center gap-2 text-[14px] font-semibold text-ink underline-offset-4 hover:text-plum hover:underline focus-visible:outline-2 focus-visible:outline-offset-2">
                <span className="font-mono text-coral-ink">{String(i + 1).padStart(2, "0")}</span>
                {c.titulo}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="relative left-1/2 -ml-[50vw] w-screen">
        {CAPITULOS.map((c, i) => {
          const plano = planos[i]!;
          const texto = plano.claro ? "text-paper" : "text-ink";
          const secundario = plano.claro ? "text-paper" : "text-ink/75";
          const divisoria = plano.claro ? "border-paper/30" : "border-ink/25";
          return (
            <section
              key={c.titulo}
              id={"relatorio-cap-" + i}
              aria-labelledby={"relatorio-titulo-" + i}
              className={"scroll-mt-24 " + plano.fundo + " " + texto}
            >
              <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
                <div className={i === 0 || i === 3 ? "grid gap-5 md:grid-cols-[.28fr_.72fr] md:gap-12" : "grid gap-5 md:grid-cols-[.4fr_.6fr] md:gap-12"}>
                  <div>
                    <p aria-hidden="true" className={"font-display text-[clamp(4.5rem,9vw,8rem)] leading-[.85] tabular-nums " + plano.numero}>
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className={"mt-4 text-[13px] font-semibold " + secundario}>{plano.rotulo}</p>
                  </div>
                  <div>
                    <h2 id={"relatorio-titulo-" + i} className="max-w-3xl font-display text-[clamp(2.35rem,4.3vw,4.4rem)] leading-tight">
                      {c.titulo}
                    </h2>
                    <p className={"mt-4 max-w-3xl text-[14px] leading-relaxed " + secundario}>
                      {i === 0
                        ? "Resultados da eleição totalizados pelo TSE, separados por cargo e universo."
                        : i === 1
                          ? "Os grupos de cor/raça são apresentados conforme o registro de autodeclaração; pretas e pardas permanecem separadas."
                          : i === 2
                            ? "Os recursos declarados exigem leitura do período, da fonte de receita e do universo de candidaturas."
                            : i === 3
                              ? "Registros parlamentares de deputadas em exercício no período observado, anteriores à posse do novo mandato."
                              : "Indicadores de naturezas diferentes, cada um com fonte, período e limites próprios."}
                    </p>
                  </div>
                </div>
                <ol className={"mt-8 grid gap-x-12 border-t " + divisoria + " " + (i === 0 || i === 3 ? "md:grid-cols-2" : "md:grid-cols-[1fr]")}>
                  {c.achados.map((a, j) => (
                    <li key={a.texto} className={"min-w-0 border-b py-6 " + divisoria + (i === 0 && j === 0 ? " md:col-span-2" : "")}>
                      <p className={"max-w-5xl font-display leading-snug " + (i === 0 && j === 0 ? "text-[clamp(1.8rem,3.3vw,3.1rem)]" : "text-[clamp(1.4rem,2.35vw,2.2rem)]")}>
                        {a.texto}
                      </p>
                      <div className={"mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-1 text-[13px] leading-relaxed " + secundario}>
                        <a href={a.to} className={"inline-flex min-h-9 items-center font-semibold underline underline-offset-4 focus-visible:outline-2 " + texto}>
                          Conferir em {a.pagina} ↗
                        </a>
                        <span>{a.fonte}</span>
                      </div>
                      {a.parcial && <p className={"mt-2 text-[13px] font-semibold " + texto}>Dado sujeito a atualização.</p>}
                    </li>
                  ))}
                </ol>
                {i === 0 ? <ProporcaoCadeirasRelatorio /> : null}
                {i === 3 ? <FotoPlenarioRelatorio /> : null}
              </div>
            </section>
          );
        })}
      </div>

      <CadernoDeFontes
        editoria="Transparência da edição · Fontes primárias"
        titulo="As cinco partes vêm de arquivos diferentes."
        nota="Esta edição foi fechada em 4 de novembro de 2026. Os registros eleitorais, as contas de campanha e os atos da Câmara são conjuntos distintos, com datas de geração e universos próprios. O caderno documental aponta suas fontes; não reproduz documentos alterados ou simulados."
        documentos={[
          { rotulo: "Tribunal Superior Eleitoral · Candidaturas", titulo: "Candidatos 2026", url: "https://dadosabertos.tse.jus.br/dataset/candidatos-2026", descricao: "Registro de candidaturas, situação eleitoral e categorias declaradas. Confira a geração dos arquivos usados na edição." },
          { rotulo: "Tribunal Superior Eleitoral · Resultado", titulo: "Resultados 2026", url: "https://dadosabertos.tse.jus.br/dataset/resultados-2026", descricao: "Votação e totalização, consultadas por cargo e data de corte." },
          { rotulo: "Tribunal Superior Eleitoral · Contas", titulo: "Prestação de Contas Eleitorais 2026", url: "https://dadosabertos.tse.jus.br/pt_BR/dataset/prestacao-de-contas-eleitorais-2026", descricao: "Recursos declarados pelas campanhas, distintos dos critérios de distribuição do FEFC." },
          { rotulo: "Câmara dos Deputados · Atuação parlamentar", titulo: "Dados Abertos da Câmara", url: "https://dadosabertos.camara.leg.br/", descricao: "Votações e autoria de proposições de quem estava em exercício no período observado, e não das eleitas ainda sem posse." },
        ]}
      />

      <section aria-label="Questões abertas e calendário" className="relative left-1/2 -ml-[50vw] w-screen">
        <div className="grid lg:grid-cols-2">
          <div className="bg-ink px-5 py-11 text-paper md:px-8 md:py-14 lg:pl-[max(2rem,calc((100vw-80rem)/2))] lg:pr-12">
            <p className="text-[13px] font-semibold text-[var(--art-gold)]">Questões em aberto</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">O que ainda não sabemos</h2>
            <ul className="mt-6 divide-y divide-paper/25 border-y border-paper/25 text-[15px] leading-relaxed text-paper/90">
              {AINDA_NAO.map((t) => <li key={t} className="py-4">{t}</li>)}
            </ul>
          </div>
          <div className="bg-paper px-5 py-11 text-ink md:px-8 md:py-14 lg:pl-12 lg:pr-[max(2rem,calc((100vw-80rem)/2))]">
            <p className="text-[13px] font-semibold text-plum">Agenda da edição preliminar</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">O que vem</h2>
            <p className="mt-2 text-[13px] leading-relaxed text-ink/75">Datas previstas a partir do corte de 04/11/2026; confira o calendário para atualizações.</p>
            <ul className="mt-5 divide-y divide-rule border-y border-rule text-[15px] leading-relaxed">
              {proximas.map((c) => (
                <li key={c.data} className="py-4">
                  <span className="font-mono text-[13px] font-semibold text-plum">{c.data.split("-").reverse().join("/")}</span>
                  <span className="block mt-1">{c.pauta}</span>
                </li>
              ))}
            </ul>
            <Link to="/calendario" className="mt-4 inline-flex min-h-11 items-center font-semibold text-plum underline underline-offset-4">Calendário completo ↗</Link>
          </div>
        </div>
      </section>

      <section id="relatorio-metodo" className="scroll-mt-24 py-12 md:py-16" aria-label="Como foi feito">
        <Secao nome="Transparência" tipo="fontes e métodos" semFio />
        <div className="mt-4 grid gap-6 md:grid-cols-[.45fr_.55fr] md:gap-10">
          <h2 className="font-display text-3xl text-ink md:text-4xl">Como foi feito</h2>
          <div>
            <p className="max-w-3xl text-[15px] leading-relaxed text-ink/80">
              Todos os números foram recontados pelo observatório a partir dos arquivos oficiais do TSE e dos dados abertos da
              Câmara e do Senado, com a impressão digital (SHA-256) de cada base. São {n(BASE_PUBLICA.length)} arquivos abertos para
              baixar em{" "}
              <Link to="/downloads" hash="dados" className="text-plum underline underline-offset-4">
                Base aberta
              </Link>
              , e as correções do ano estão no{" "}
              <Link to="/metodo" hash="correcoes" className="text-plum underline underline-offset-4">
                registro de correções
              </Link>.
            </p>
            <p className="mt-4 text-[13px] leading-relaxed text-ink/70">
              Edição preliminar fechada em 04/11/2026. O calendário, as bases e a situação das candidatas podem receber atualizações
              em datas diferentes; a presente página não substitui a consulta aos registros de origem.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
