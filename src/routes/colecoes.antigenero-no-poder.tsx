import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Faixa } from "@/components/editorial/Faixa";
import {
  ANTIGENERO_CRITERIO,
  ANTIGENERO_DEPUTADAS,
  ANTIGENERO_DINHEIRO,
  ANTIGENERO_FALAS,
  ANTIGENERO_VOTACOES,
} from "@/data/colecoes";
import { VOTACOES_META } from "@/data/votacoes-camara";
import { formatInt as n, formatPct } from "@/lib/format-br";

/**
 * Coleção "Antigênero no poder" (versão curta, 12/11/2026): uma frase, um
 * objeto, quatro números com uma linha cada. Nomes e critério ficam abertos
 * sob demanda.
 */
const titulo = "Antigênero no poder";
const description =
  "42 deputadas votaram contra a igualdade salarial ou para derrubar a norma do Conanda. 29 voltaram ao poder em 2026.";

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

  const numeros = [
    {
      valor: n(total),
      rotulo: "deputadas votaram contra direitos das mulheres",
      linha: `${n(nIg)} contra a igualdade salarial (2023); ${n(nCo)} para derrubar a norma do Conanda sobre vítimas de violência sexual (2025).`,
    },
    {
      valor: n(voltaram),
      rotulo: "voltaram ao poder em 2026",
      linha: `${n(reeleitas)} de volta à Câmara, ${n(outroCargo)} em outro cargo.`,
    },
    {
      valor: formatPct(D.pct),
      rotulo: "da receita de campanha veio do fundo eleitoral",
      linha: `A mesma fatia das deputadas eleitas em geral (${formatPct(D.eleitasDeputadaPct)}). Entre os homens eleitos, ${formatPct(D.eleitosDeputadoPct)}.`,
    },
    {
      valor: n(F.seDeclararamAntifeministas),
      rotulo: "se declararam antifeministas em plenário",
      linha: `${n(F.deputadas)} falaram de feminismo em ${n(F.discursos)} discursos; ${n(F.disseramNaoSerFeministas)} disseram não ser feministas.`,
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
              {n(total)} deputadas votaram contra direitos das mulheres. {n(voltaram)} voltaram ao
              poder.
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
              Cada quadrado é uma deputada. Laranja: de volta à Câmara. Branco: outro cargo. Vazio:
              fora.
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
        <details className="group border-b border-rule">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between font-display text-2xl text-ink">
            Quem são as {n(total)}
            <span className="text-plum transition-transform group-open:rotate-45">+</span>
          </summary>
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
              <strong className="text-ink">Dinheiro.</strong> TSE, prestação de contas final do 1º
              turno, base de {D.base}. Fundo eleitoral é o Fundo Especial de Financiamento de
              Campanha. {n(D.concorreram)} das {n(total)} concorreram em 2026; {n(D.semFefc)} não
              declararam receita do fundo.
            </p>
            <p>
              <strong className="text-ink">Falas.</strong> Discursos em plenário de {F.periodo}, nas
              notas taquigráficas da Câmara. Os trechos, com nome, entram depois dos pedidos de
              posicionamento.
            </p>
            <p className="text-[13px] text-ink/65">
              {VOTACOES_META.fonte}. Votos coletados em {VOTACOES_META.coletaEm}.
            </p>
          </div>
        </details>
      </section>

      <section className="flex flex-wrap gap-x-10 gap-y-2 pb-16">
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
