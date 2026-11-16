import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Faixa } from "@/components/editorial/Faixa";
import { CadernoDeFontes } from "@/components/editorial/CadernoDocumentalRevista";
import {
  ANTIGENERO_CRITERIO,
  ANTIGENERO_DEPUTADAS,
  ANTIGENERO_DINHEIRO,
  ANTIGENERO_FALAS,
  ANTIGENERO_LISTA_LIBERADA,
  ANTIGENERO_PEDIDO_ENVIADO_EM,
  ANTIGENERO_VOTACOES,
} from "@/data/colecoes";
import { VOTACOES_META } from "@/data/votacoes-camara";
import { formatInt as n, formatPct } from "@/lib/format-br";

/**
 * Coleção "A agenda antigênero no poder" (versão curta, 12/11/2026): uma frase, um
 * objeto, quatro números com uma linha cada. Nomes e critério ficam abertos
 * sob demanda.
 */
const titulo = "A agenda antigênero no poder";
const description =
  "42 deputadas votaram contra a lei de igualdade salarial ou a favor de sustar a norma do Conanda. 29 terão mandato em 2027.";

export const Route = createFileRoute("/colecoes/antigenero-no-poder")({
  head: () => ({
    meta: [
      { title: `${titulo} | Coleção | Quem são elas?` },
      { name: "description", content: description },
      { property: "og:title", content: `${titulo} | Quem são elas?` },
      { property: "og:description", content: description },
    ],
  }),
  component: ColecaoPage,
});

type Dep = (typeof ANTIGENERO_DEPUTADAS)[number];
const ONDE: { chave: string; rotulo: string; filtro: (d: Dep) => boolean }[] = [
  { chave: "camara", rotulo: "De volta à Câmara", filtro: (d) => d.desfecho === "reeleita" },
  {
    chave: "outro",
    rotulo: "Em outro cargo",
    filtro: (d) => d.desfecho === "eleita para outro cargo",
  },
  {
    chave: "fora",
    rotulo: "Fora do mandato em 2027",
    filtro: (d) => d.desfecho !== "reeleita" && d.desfecho !== "eleita para outro cargo",
  },
];
const cargoBR = (c: string | null) =>
  c ? c.toLowerCase().replace("senador", "senadora").replace("deputado", "deputada") : "";

function ColecaoPage() {
  const total = ANTIGENERO_DEPUTADAS.length;
  const reeleitas = ANTIGENERO_DEPUTADAS.filter((d) => d.desfecho === "reeleita").length;
  const outroCargo = ANTIGENERO_DEPUTADAS.filter(
    (d) => d.desfecho === "eleita para outro cargo",
  ).length;
  const voltaram = reeleitas + outroCargo;
  const ordem = ["reeleita", "eleita para outro cargo", "suplente", "não eleita", "não concorreu"];
  const ordenadas = [...ANTIGENERO_DEPUTADAS].sort(
    (a, b) => ordem.indexOf(a.desfecho) - ordem.indexOf(b.desfecho),
  );
  const [ig, co] = ANTIGENERO_VOTACOES;
  const nIg = ig ? (ig.votacao.porSexo.F.votos[ig.contra] ?? 0) : 0;
  const nCo = co ? (co.votacao.porSexo.F.votos[co.contra] ?? 0) : 0;
  const D = ANTIGENERO_DINHEIRO;
  const F = ANTIGENERO_FALAS;

  const ambas = ANTIGENERO_DEPUTADAS.filter((d) => d.votos.length === 2).length;
  const numeros = [
    {
      valor: n(nIg),
      rotulo: "votaram Não à lei de igualdade salarial",
      linha:
        "PL 1.085/2023, em 04/05/2023: a lei que obriga salário igual para mulheres e homens na mesma função.",
    },
    {
      valor: n(nCo),
      rotulo: "votaram Sim ao PDL 3/2025",
      linha:
        "Em 05/11/2025: sustou a norma do Conanda sobre o atendimento a crianças e adolescentes vítimas de violência sexual.",
    },
    {
      valor: n(voltaram),
      rotulo: "das 42 terão mandato em 2027",
      linha: `${n(reeleitas)} reeleitas à Câmara, ${n(outroCargo)} eleitas para outro cargo. ${n(ambas)} votaram assim nas duas votações.`,
    },
    {
      valor: n(F.deputadas),
      rotulo: "das 42 falaram de feminismo em plenário",
      linha: `Em ${n(F.discursos)} discursos, de 2023 a 2026, quase sempre para criticar. Nenhuma usou a palavra antifeminista; ${n(F.disseramNaoSerFeministas)} se declarou não feminista.`,
    },
  ];

  return (
    <PageShell breadcrumb={[{ label: "Reportagens", to: "/reportagens" }, { label: titulo }]}>
      <Faixa fundo="bg-ink text-paper">
        <div className="grid gap-9 py-12 md:grid-cols-[1.1fr_.9fr] md:items-center md:gap-12 md:py-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--art-gold)]">Coleção · Investigações e dados</p>
            <h1 className="mt-4 max-w-2xl font-display text-[clamp(2.6rem,5vw,4.8rem)] font-semibold leading-[1.04] text-paper">
              {titulo}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/85">
              {n(total)} deputadas votaram contra a lei de igualdade salarial ou a favor de sustar a
              norma do Conanda. {n(voltaram)} terão mandato em 2027.
            </p>
            <a href="#evidencias-colecao"
              className="mt-5 inline-flex min-h-11 items-center font-semibold text-paper underline underline-offset-4">
              Consultar as evidências ↘
            </a>
          </div>
          <aside className="bg-paper p-6 text-ink md:p-8" aria-label="Documentos legislativos que definem o recorte">
            <p className="text-xs font-semibold uppercase tracking-wide text-plum">Duas votações documentadas</p>
            <p className="mt-3 text-sm leading-relaxed text-ink/80">
              O recorte parte de registros nominais da Câmara dos Deputados.
              A identificação da proposição não substitui o voto individual.
            </p>
            <dl className="mt-6 divide-y divide-ink/25 border-y border-ink/25">
              {ANTIGENERO_VOTACOES.map((x) => (
                <div key={x.votacao.id} className="py-4">
                  <dt className="text-xs uppercase tracking-wide text-plum">{x.votacao.proposicao}</dt>
                  <dd className="mt-2 font-display text-lg leading-snug text-ink">{x.votacao.titulo}</dd>
                </div>
              ))}
            </dl>
            <Link to="/como-votaram" className="mt-5 inline-flex min-h-11 items-center font-semibold text-ink underline underline-offset-4">
              Ver votos e contexto ↗
            </Link>
          </aside>
        </div>
      </Faixa>


      <section id="evidencias-colecao" className="scroll-mt-24 grid gap-px border-y border-rule bg-rule md:grid-cols-2">
        {numeros.map((x, i) => (
          <div key={x.rotulo} className={`px-5 py-7 md:px-8 md:py-9 ${i % 4 === 1 ? "bg-[var(--art-gold)] text-ink" : i % 4 === 2 ? "bg-plum text-paper" : "bg-paper text-ink"}`}>
            <p className={`font-display text-4xl font-semibold ${i % 4 === 2 ? "text-[var(--art-gold)]" : "text-plum"}`}>{x.valor}</p>
            <p className={`mt-2 font-display text-xl leading-snug ${i % 4 === 2 ? "text-paper" : "text-ink"}`}>{x.rotulo}</p>
            <p className={`mt-3 text-[15px] leading-relaxed ${i % 4 === 2 ? "text-paper/85" : "text-ink/75"}`}>{x.linha}</p>
          </div>
        ))}
      </section>

      <details className="group border-b border-rule">
        <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-3 py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum [&::-webkit-details-marker]:hidden">
          <span className="font-display text-xl font-semibold text-ink">Explorar a distribuição dos mandatos</span>
          <span className="shrink-0 text-sm font-semibold text-plum">
            <span className="group-open:hidden">Abrir +</span>
            <span className="hidden group-open:inline">Recolher −</span>
          </span>
        </summary>
        <figure className="bg-plum-deep p-6 text-paper md:p-8">
          <div role="img"
            aria-label={`${n(total)} deputadas: ${n(reeleitas)} reeleitas, ${n(outroCargo)} em outro cargo, ${n(total - voltaram)} fora do mandato`}
            className="grid max-w-xl grid-cols-7 gap-1.5 sm:grid-cols-14">
            {ordenadas.map((d) => (
              <span key={d.nome} className={`aspect-square ${
                d.desfecho === "reeleita" ? "bg-coral"
                : d.desfecho === "eleita para outro cargo" ? "bg-paper"
                : "border border-cream/50"
              }`} />
            ))}
          </div>
          <figcaption className="mt-4 max-w-xl text-sm leading-relaxed text-paper/85">
            Cada quadrado é uma deputada. Laranja: reeleita à Câmara.
            Branco: eleita para outro cargo. Vazio: sem mandato em 2027.
          </figcaption>
        </figure>
      </details>

      <section className="space-y-3 py-10">
        {ANTIGENERO_LISTA_LIBERADA ? (
          <details className="group border-b border-rule">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between font-display text-2xl text-ink">
              Quem são as {n(total)}
              <span className="text-plum transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="pb-4 text-[14px] text-ink/70">Partido na data da votação mais recente.</p>
            <div className="grid gap-8 pb-8 md:grid-cols-3">
              {ONDE.map((g) => {
                const lista = ANTIGENERO_DEPUTADAS.filter(g.filtro);
                return (
                  <div key={g.chave}>
                    <p className="font-display text-lg italic text-plum">
                      {g.rotulo} · {n(lista.length)}
                    </p>
                    <ul className="mt-2 space-y-1.5 text-[15px] text-ink">
                      {lista.map((d) => (
                        <li key={d.nome}>
                          {d.nome}{" "}
                          <span className="text-ink/60">
                            ({d.partido}-{d.uf})
                            {g.chave === "outro" ? `, ${cargoBR(d.cargo2026)}` : ""}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </details>
        ) : (
          <div className="border-b border-rule py-5">
            <p className="font-display text-2xl text-ink">Quem são as {n(total)}</p>
            <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-ink/75">
              {ANTIGENERO_PEDIDO_ENVIADO_EM
                ? `Pedidos de posicionamento enviados em ${ANTIGENERO_PEDIDO_ENVIADO_EM}. A lista, com o voto de cada deputada, entra quando o prazo de resposta vencer, com as respostas.`
                : "A lista, com o voto de cada deputada, entra depois dos pedidos de posicionamento e do prazo de resposta. Os votos individuais já estão em Como votaram."}
            </p>
          </div>
        )}
        <details className="group border-b border-rule">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between font-display text-2xl text-ink">
            Como escolhemos
            <span className="text-plum transition-transform group-open:rotate-45">+</span>
          </summary>
          <div className="max-w-3xl space-y-3 pb-8 text-[15px] leading-relaxed text-ink/80">
            <p>
              <strong className="text-ink">Fato.</strong> {ANTIGENERO_CRITERIO.fato}
            </p>
            <p>
              <strong className="text-ink">Interpretação.</strong>{" "}
              {ANTIGENERO_CRITERIO.interpretacao}
            </p>
            <p>
              <strong className="text-ink">Fora.</strong> {ANTIGENERO_CRITERIO.fora}
            </p>
            <p>
              <strong className="text-ink">Dinheiro.</strong> Das {n(total)}, {n(D.concorreram)}{" "}
              concorreram em 2026. Entre as {n(D.deputadaFederal.candidatas)} que disputaram vaga de
              deputada federal, {formatPct(D.deputadaFederal.pct)} da receita veio do fundo
              eleitoral; entre todas as eleitas a deputada federal,{" "}
              {formatPct(D.eleitasDeputadaPct)}. É a mesma ordem de grandeza: o fundo financia quase
              toda campanha de mulher eleita. TSE, prestação de contas final do 1º turno, base de{" "}
              {D.base}, que ainda não traz a totalização dos deputados do Amapá.
            </p>
            <p>
              <strong className="text-ink">Falas.</strong> Discursos em plenário de {F.periodo}, nas
              notas taquigráficas da Câmara, com as palavras feminismo, feminista e antifeminista. A
              busca cobre só o plenário. Os trechos, com nome, entram depois dos pedidos de
              posicionamento.
            </p>
            <p className="text-[13px] text-ink/65">
              {VOTACOES_META.fonte}. Votos coletados em {VOTACOES_META.coletaEm}.
            </p>
          </div>
        </details>
      </section>


      <CadernoDeFontes
        editoria="Caderno documental · Votações e contraditório"
        titulo="O voto individual é o registro verificável."
        nota="O recorte de duas votações é uma escolha editorial explícita. As atas e os dados abertos permitem conferir as posições nominais. A participação nessas votações não demonstra intenção individual nem adesão a todas as posições associadas ao termo antigênero."
        documentos={[
          { rotulo: "Câmara dos Deputados · Registros oficiais", titulo: "Dados Abertos da Câmara", url: "https://dadosabertos.camara.leg.br/", descricao: "Fonte da recontagem das votações nominais, com período e critérios definidos na reportagem." },
          { rotulo: "Quem são elas? · Reportagem", titulo: "Seis votações e contexto", url: "/como-votaram", descricao: "Matriz de votos, posição das bancadas, critérios de seleção e alterações registradas." },
          { rotulo: "Quem são elas? · Falas", titulo: "Declarações com origem", url: "/na-voz-delas", descricao: "Reúne pronunciamentos acompanhados de data, autoria e ligação à fonte original." },
        ]}
      />

      <p className="max-w-3xl text-[14px] leading-relaxed text-ink/70">
        Correções e pedidos de resposta:{" "}
        <a href="mailto:contato@quemsaoelas.com.br" className="text-plum underline">
          contato@quemsaoelas.com.br
        </a>
        . Toda resposta recebida entra nesta página, com data.
      </p>

      <section className="flex flex-wrap gap-x-10 gap-y-2 pb-16 pt-6">
        <Link
          to="/como-votaram"
          className="inline-flex min-h-11 items-center text-[15px] font-semibold text-plum"
        >
          As votações, deputada por deputada →
        </Link>
        <Link
          to="/na-voz-delas"
          className="inline-flex min-h-11 items-center text-[15px] font-semibold text-plum"
        >
          Na voz delas: falas com o dado ao lado →
        </Link>
      </section>
    </PageShell>
  );
}
