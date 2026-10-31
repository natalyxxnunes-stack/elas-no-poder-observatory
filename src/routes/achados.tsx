import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { AchadoCard } from "@/components/editorial/AchadoCard";
import { NextAxes } from "@/components/editorial/NextAxes";
import { ACHADOS, TEMAS_ACHADOS } from "@/data/achados";
import { formatDateBR } from "@/lib/format-br";

const description =
  "Achados do observatório Quem são elas?: notas curtas e datadas sobre mulheres, eleições e poder em 2026, cada uma com número, fonte e caminho para os dados.";

export const Route = createFileRoute("/achados")({
  head: () => ({
    meta: [
      { title: "O que encontramos | Quem são elas?" },
      { name: "description", content: description },
      { property: "og:title", content: "O que encontramos" },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AchadosPage,
});

const FUNDOS = ["bg-paper", "bg-lilac", "bg-paper", "bg-cream", "bg-paper"] as const;

function AchadosPage() {
  const ordem = [...ACHADOS].reverse();
  const destaques = ordem.slice(0, 3);
  const ids = new Set(destaques.map((a) => a.id));
  const ultima = ordem.reduce((m, a) => {
    const d = a.atualizadoEm ?? a.data;
    return d > m ? d : m;
  }, "");
  const temas = TEMAS_ACHADOS.map((t) => ({
    ...t,
    itens: ordem.filter((a) => a.tema === t.id && !ids.has(a.id)),
  })).filter((t) => t.itens.length > 0);

  return (
    <PageShell breadcrumb={[{ label: "Achados" }]}>
      <header className="grid gap-8 py-10 md:py-14 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-plum">
            {ACHADOS.length} achados · atualizado em {formatDateBR(ultima)}
          </p>
          <h1 className="mt-4 font-display text-5xl leading-[0.98] text-ink md:text-7xl">O que encontramos</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/80">
            Notas curtas e datadas. Cada uma traz o número, a fonte e o caminho para a página com a conta completa.
          </p>
        </div>
        <nav aria-label="Temas dos achados">
          <p className="text-[13px] text-muted-foreground">Ir para o tema</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {temas.map((t) => (
              <li key={t.id}>
                <a
                  href={`#tema-${t.id}`}
                  className="inline-flex min-h-11 items-center border border-plum/40 bg-paper px-3 text-[15px] text-plum hover:border-plum"
                >
                  {t.titulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <section aria-labelledby="mais-recentes" className="relative left-1/2 -ml-[50vw] w-screen bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
          <h2 id="mais-recentes" className="font-mono text-xs uppercase tracking-[0.12em] text-plum">
            Mais recentes
          </h2>
          <div className="mt-5 grid gap-5 lg:grid-cols-12">
            {destaques.map((a, i) => (
              <div key={a.id} className={i === 0 ? "lg:col-span-7 lg:row-span-2" : "lg:col-span-5"}>
                <AchadoCard achado={a} grande={i === 0} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {temas.map((t, i) => (
        <section
          key={t.id}
          id={`tema-${t.id}`}
          aria-labelledby={`h-${t.id}`}
          className={`relative left-1/2 -ml-[50vw] w-screen scroll-mt-16 ${FUNDOS[i % FUNDOS.length]}`}
        >
          <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
            <div className="flex items-end gap-5 border-t-2 border-ink pt-5">
              <span aria-hidden="true" className="poster-figure text-5xl text-plum/60 md:text-6xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 id={`h-${t.id}`} className="font-display text-3xl leading-tight text-ink md:text-4xl">
                  {t.titulo}
                </h2>
                <p className="mt-1 text-[15px] text-ink/75">{t.linha}</p>
              </div>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {t.itens.map((a, j) => (
                <div key={a.id} className={t.itens.length % 2 === 1 && j === t.itens.length - 1 && t.itens.length > 1 ? "md:col-span-2" : ""}>
                  <AchadoCard achado={a} />
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <NextAxes ids={["quem-sao-elas", "dinheiro", "historico"]} />
    </PageShell>
  );
}
