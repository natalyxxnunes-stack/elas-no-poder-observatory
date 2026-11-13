import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Faixa } from "@/components/editorial/Faixa";
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
      <Faixa fundo="bg-plum-deep text-paper">
        <div className="grid gap-10 py-12 md:grid-cols-2 md:items-center md:gap-16 md:py-16">
          <div>
            <p className="font-mono text-[14px] text-lilac">Coleção</p>
            <h1 className="mt-3 font-display text-5xl font-semibold leading-none md:text-7xl">
              {titulo}
            </h1>
            <p className="mt-8 border-t-[5px] border-coral pt-5 font-display text-[1.6rem] leading-tight md:text-[2rem]">
              {n(total)} deputadas votaram contra a lei de igualdade salarial ou a favor de sustar a
              norma do Conanda. {n(voltaram)} terão mandato em 2027.
            </p>
          </div>
          <figure>
            <div
              role="img"
              aria-label={`${n(total)} deputadas: ${n(reeleitas)} reeleitas, ${n(outroCargo)} em outro cargo, ${n(total - voltaram)} fora do mandato`}
              className="grid max-w-xl grid-cols-7 gap-1.5 sm:grid-cols-14"
            >
              {ordenadas.map((d) => (
                <span
                  key={d.nome}
                  className={`aspect-square ${
                    d.desfecho === "reeleita"
                      ? "bg-coral"
                      : d.desfecho === "eleita para outro cargo"
                        ? "bg-paper"
                        : "border border-cream/50"
                  }`}
                />
              ))}
            </div>
            <figcaption className="mt-3 text-[14px] text-cream/85">
              Cada quadrado é uma deputada. Laranja: reeleita à Câmara. Branco: eleita para outro
              cargo. Vazio: sem mandato em 2027.
            </figcaption>
          </figure>
        </div>
      </Faixa>

      <section className="grid gap-px border-b border-rule bg-rule md:grid-cols-2 xl:grid-cols-4">
        {numeros.map((x) => (
          <div key={x.rotulo} className="bg-paper py-8 md:p-8">
            <p className="poster-figure text-6xl text-plum">{x.valor}</p>
            <p className="mt-2 font-display text-xl leading-snug text-ink">{x.rotulo}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-ink/75">{x.linha}</p>
          </div>
        ))}
      </section>

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
