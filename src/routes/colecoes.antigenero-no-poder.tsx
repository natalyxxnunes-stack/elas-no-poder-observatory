import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Faixa } from "@/components/editorial/Faixa";
import { Secao } from "@/components/editorial/Secao";
import {
  ANTIGENERO_CRITERIO,
  ANTIGENERO_DEPUTADAS,
  ANTIGENERO_EM_APURACAO,
  ANTIGENERO_VOTACOES,
} from "@/data/colecoes";
import { VOTACOES_META } from "@/data/votacoes-camara";
import { formatInt as n } from "@/lib/format-br";

/**
 * Coleção "Antigênero no poder" (12/11/2026). Ordem: abertura com objeto,
 * critério antes dos resultados, as votações, quem são e onde estão em 2026,
 * o que disseram, o que está em apuração.
 */
const titulo = "Antigênero no poder";
const description =
  "Coleção do Quem são elas?: as deputadas que votaram contra a igualdade salarial ou para derrubar a norma do Conanda, e onde estão depois de 2026.";

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

const VOLTARAM = new Set(["reeleita", "eleita para outro cargo"]);
const ROTULO_DESFECHO: Record<string, string> = {
  reeleita: "reeleita deputada federal",
  "eleita para outro cargo": "eleita para outro cargo",
  suplente: "suplente",
  "não eleita": "não eleita",
  "não concorreu": "não concorreu",
};
const cargoBR = (c: string | null) =>
  c ? c.toLowerCase().replace("senador", "senadora").replace("deputado", "deputada") : "";
const dataBR = (iso: string) => iso.split("-").reverse().join("/");

function ColecaoPage() {
  const total = ANTIGENERO_DEPUTADAS.length;
  const voltaram = ANTIGENERO_DEPUTADAS.filter((d) => VOLTARAM.has(d.desfecho));
  const reeleitas = ANTIGENERO_DEPUTADAS.filter((d) => d.desfecho === "reeleita").length;
  const outroCargo = voltaram.length - reeleitas;
  const ordem = ["reeleita", "eleita para outro cargo", "suplente", "não eleita", "não concorreu"];
  const ordenadas = [...ANTIGENERO_DEPUTADAS].sort((a, b) => ordem.indexOf(a.desfecho) - ordem.indexOf(b.desfecho));

  return (
    <PageShell
      breadcrumb={[
        { label: "Reportagens", to: "/reportagens" },
        { label: "Coleção" },
        { label: titulo },
      ]}
    >
      <Faixa fundo="bg-plum-deep text-paper">
        <div className="grid gap-10 py-12 md:grid-cols-[1fr_1.1fr] md:gap-16 md:py-20">
          <div>
            <p className="font-mono text-[14px] text-lilac">Coleção · atualizada em 12/11/2026</p>
            <h1 className="mt-3 font-display text-5xl font-semibold leading-none md:text-7xl">
              {titulo}
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-paper/85">
              A agenda contra direitos das mulheres no plenário, e quem a votou: o que decidiram, se
              voltaram ao poder em 2026, o que disseram e com que dinheiro.
            </p>
            <p className="mt-10 border-t-[5px] border-coral pt-5 font-display text-[1.7rem] leading-tight md:text-[2.2rem]">
              {n(total)} deputadas votaram contra a igualdade salarial ou para derrubar a norma do
              Conanda. {n(voltaram.length)} foram eleitas de novo em 2026.
            </p>
          </div>
          <figure className="md:pt-6">
            <div
              role="img"
              aria-label={`${n(total)} deputadas: ${n(reeleitas)} reeleitas, ${n(outroCargo)} eleitas para outro cargo, ${n(total - voltaram.length)} fora`}
              className="grid max-w-xl grid-cols-7 gap-1.5 sm:grid-cols-14"
            >
              {ordenadas.map((d) => (
                <span
                  key={d.nome}
                  title={d.nome}
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
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-cream/90">
              <li className="flex items-center gap-2">
                <span aria-hidden="true" className="size-3.5 bg-coral" /> reeleitas à Câmara:{" "}
                {n(reeleitas)}
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true" className="size-3.5 bg-paper" /> eleitas para outro cargo:{" "}
                {n(outroCargo)}
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true" className="size-3.5 border border-cream/50" /> suplentes,
                não eleitas ou fora da disputa: {n(total - voltaram.length)}
              </li>
            </ul>
            <figcaption className="mt-4 text-[14px] leading-relaxed text-cream/85">
              Cada quadrado é uma deputada federal que votou no sentido contrário ao direito em jogo
              em pelo menos uma das duas votações.
              <span className="mt-2 block text-[13px] text-cream/70">
                {VOTACOES_META.fonte}. Coleta em {VOTACOES_META.coletaEm}.
              </span>
            </figcaption>
          </figure>
        </div>
      </Faixa>

      <section className="grid gap-8 py-12 md:grid-cols-3 md:py-16">
        <div>
          <Secao nome="Critério" tipo="fato" pequeno />
          <p className="mt-3 text-[16px] leading-relaxed text-ink/85">{ANTIGENERO_CRITERIO.fato}</p>
        </div>
        <div>
          <Secao nome="O nome da coleção" tipo="interpretação" pequeno />
          <p className="mt-3 text-[16px] leading-relaxed text-ink/85">
            {ANTIGENERO_CRITERIO.interpretacao}
          </p>
        </div>
        <div>
          <Secao nome="O que ficou fora" pequeno />
          <p className="mt-3 text-[16px] leading-relaxed text-ink/85">{ANTIGENERO_CRITERIO.fora}</p>
        </div>
      </section>

      <Faixa fundo="bg-cream">
        <div className="py-12 md:py-16">
          <Secao nome="As duas votações" />
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {ANTIGENERO_VOTACOES.map(({ votacao: v, contra, porque }) => {
              const F = v.porSexo.F;
              const nContra = F.votos[contra] ?? 0;
              return (
                <article key={v.id} className="border-t-[5px] border-plum bg-paper p-6 md:p-8">
                  <p className="font-mono text-[13px] text-ink/70">
                    {v.proposicao} · {dataBR(v.data)}
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-semibold leading-snug text-ink md:text-3xl">
                    {v.titulo}
                  </h2>
                  <p className="poster-figure mt-5 text-6xl text-plum">{n(nContra)}</p>
                  <p className="mt-2 text-[15px] leading-snug text-ink">
                    das {n(F.total)} deputadas em exercício votaram {contra}
                  </p>
                  <p className="mt-4 text-[15px] leading-relaxed text-ink/75">{porque}</p>
                </article>
              );
            })}
          </div>
        </div>
      </Faixa>

      <section className="py-12 md:py-16">
        <Secao nome="Quem são e onde estão" tipo={`${n(total)} deputadas, em ordem alfabética`} />
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-ink/75">
          Partido na data da votação mais recente. Onde estão: resultado da eleição de 2026, pelo
          TSE.
        </p>
        <ul className="mt-6 grid gap-x-10 md:grid-cols-2">
          {ANTIGENERO_DEPUTADAS.map((d) => (
            <li
              key={d.nome}
              className="grid grid-cols-[1fr_auto] gap-x-4 border-b border-rule py-3"
            >
              <span>
                <span className="block font-display text-lg text-ink">
                  {d.nome}{" "}
                  <span className="text-[14px] text-ink/65">
                    ({d.partido}-{d.uf})
                  </span>
                </span>
                <span className="block text-[14px] text-ink/75">{d.votos.join("; ")}</span>
              </span>
              <span
                className={`self-center text-right text-[14px] ${VOLTARAM.has(d.desfecho) ? "font-semibold text-coral-ink" : "text-ink/65"}`}
              >
                {d.desfecho === "eleita para outro cargo"
                  ? `eleita ${cargoBR(d.cargo2026)}`
                  : ROTULO_DESFECHO[d.desfecho]}
              </span>
            </li>
          ))}
        </ul>
        <Link
          to="/como-votaram"
          className="mt-6 inline-flex min-h-11 items-center text-[15px] font-semibold text-plum"
        >
          Todas as votações, deputada por deputada →
        </Link>
      </section>

      <Faixa fundo="bg-plum text-paper">
        <Link
          to="/na-voz-delas"
          className="group grid gap-4 py-12 md:grid-cols-[1fr_auto] md:items-end md:py-14"
        >
          <span>
            <Secao nome="O que disseram" tipo="reportagem" claro />
            <span className="mt-4 block max-w-3xl font-display text-3xl leading-tight group-hover:underline group-hover:underline-offset-4 md:text-4xl">
              Na voz delas: falas públicas de deputadas e eleitas, com data, fonte primária e o dado
              oficial ao lado
            </span>
          </span>
          <span aria-hidden="true" className="font-display text-3xl">
            →
          </span>
        </Link>
      </Faixa>

      <section className="py-12 md:py-16">
        <Secao nome="Em apuração" tipo="o que entra nesta coleção" />
        <ul className="mt-6 grid gap-6 md:grid-cols-2">
          {ANTIGENERO_EM_APURACAO.map((p) => (
            <li key={p.titulo} className="border border-dashed border-plum/50 p-6">
              <p className="font-display text-2xl text-ink">{p.titulo}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/75">{p.nota}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-3xl text-[14px] leading-relaxed text-ink/70">
          Toda deputada citada recebe pedido de posicionamento antes de cada nova peça da coleção.
          As respostas entram na página, com data.
        </p>
      </section>
    </PageShell>
  );
}
