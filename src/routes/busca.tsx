import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useId, useMemo, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { Secao } from "@/components/editorial/Secao";
import { busca, type ItemBusca, type TipoResultado } from "@/data/busca";
import { TEMAS } from "@/data/temas";

const description = "Busque no Quem são elas? por nome, partido, estado, tema, votação, fala ou achado.";

export const Route = createFileRoute("/busca")({
  head: () => ({
    meta: [
      { title: "Buscar | Quem são elas?" },
      { name: "description", content: description },
      { property: "og:title", content: "Buscar | Quem são elas?" },
      { property: "og:description", content: description },
    ],
  }),
  component: BuscaPage,
});

const ORDEM: TipoResultado[] = ["Pessoa", "Tema", "Reportagem", "Achado", "Fala", "Votação", "Partido", "Estado", "Página"];
const ROTULO: Record<TipoResultado, string> = {
  Pessoa: "Pessoas",
  Tema: "Temas",
  Reportagem: "Reportagens",
  Achado: "Achados",
  Fala: "Falas",
  Votação: "Votações",
  Partido: "Partidos",
  Estado: "Estados",
  Página: "Páginas",
};

const href = (it: ItemBusca) => `${it.to}${it.hash ? `#${it.hash}` : ""}`;

function BuscaPage() {
  const [q, setQ] = useState("");
  const id = useId();
  useEffect(() => {
    try {
      const inicial = new URLSearchParams(window.location.search).get("q");
      if (inicial) setQ(inicial);
    } catch {
      /* sem parâmetro */
    }
  }, []);
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      if (q) url.searchParams.set("q", q);
      else url.searchParams.delete("q");
      window.history.replaceState(null, "", url);
    } catch {
      /* navegador sem history */
    }
  }, [q]);

  const resultados = useMemo(() => busca(q), [q]);
  const grupos = ORDEM.map((t) => ({ tipo: t, itens: resultados.filter((r) => r.tipo === t) })).filter((g) => g.itens.length);

  return (
    <PageShell breadcrumb={[{ label: "Buscar" }]}>
      <header className="relative left-1/2 -ml-[50vw] w-screen bg-ink text-paper"><div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <p className="text-[13px] font-semibold text-[var(--art-gold)]">Arquivo público · Consulta transversal</p>
        <h1 className="mt-4 font-display text-[clamp(2.8rem,5.5vw,5.2rem)] leading-[1.06] text-paper">O que você procura?</h1>
        <form role="search" className="mt-10 max-w-3xl bg-paper p-5 text-ink md:p-7" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor={id} className="text-[14px] font-semibold text-ink">
            Nome, partido, estado, tema, votação ou palavra
          </label>
          <input
            id={id}
            type="search"
            value={q}
            autoComplete="off"
            onChange={(e) => setQ(e.target.value)}
            placeholder="Ex.: Lélia, PL, Bahia, feminicídio, igualdade salarial"
            className="mt-2 block min-h-12 w-full border-2 border-ink bg-paper px-4 text-[17px] text-ink placeholder:text-ink/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum"
          />
        </form>
        <p className="mt-5 text-[14px] text-paper/85" aria-live="polite">
          {q.trim().length > 1
            ? resultados.length
              ? `${resultados.length} ${resultados.length === 1 ? "resultado" : "resultados"}`
              : "Nada encontrado. Tente outra palavra, um partido ou um estado."
            : "Busca em pessoas, temas, reportagens, achados, falas, votações, partidos e estados."}
        </p>
      </div></header>

      {grupos.length ? (
        <div className="pb-10">
          {grupos.map((g, i) => (
            <section key={g.tipo} aria-label={ROTULO[g.tipo]} className={`relative left-1/2 -ml-[50vw] w-screen ${i % 2 === 0 ? "bg-paper" : "bg-cream"}`}><div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
              <Secao nome={ROTULO[g.tipo]} tipo={`${g.itens.length}`} pequeno />
              <ul className="mt-3 divide-y divide-rule border-b border-rule">
                {g.itens.map((it) => (
                  <li key={`${it.tipo}-${it.titulo}-${href(it)}`}>
                    <a href={href(it)} className="group block py-3">
                      <span className="font-display text-lg leading-snug text-ink group-hover:underline group-hover:underline-offset-4">
                        {it.titulo}
                      </span>
                      <span className="mt-1 line-clamp-2 block text-[14px] leading-relaxed text-ink/70">{it.sub}</span>
                    </a>
                  </li>
                ))}
              </ul>
              </div></section>
          ))}
        </div>
      ) : (
        <section className="pb-16 pt-12">
          <Secao nome="Comece por um tema" pequeno />
          <ul className="mt-4 grid gap-3 md:grid-cols-3">
            {TEMAS.map((t) => (
              <li key={t.slug}>
                <a href={`/temas/${t.slug}`} className="block h-full border border-rule bg-card p-4 hover:border-plum">
                  <span className="font-display text-lg text-ink">{t.nome}</span>
                  <span className="mt-1 block text-[14px] leading-relaxed text-ink/70">{t.linha}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
      <section className="relative left-1/2 -ml-[50vw] w-screen bg-[#c53f22] text-paper">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-9 md:grid-cols-[1fr_1fr] md:items-center md:px-8 md:py-12">
          <h2 className="font-display text-2xl leading-tight md:text-3xl">Um resultado aponta para a página de origem.</h2>
          <p className="text-[15px] leading-relaxed text-paper">
            A busca localiza registros já publicados no observatório. Para conferir um número ou uma fala, abra o resultado, identifique a data de corte e consulte a fonte indicada na página.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
