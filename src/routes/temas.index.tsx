import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { TEMAS } from "@/data/temas";
import { FOTOS } from "@/data/fotos";

const description =
  "Os seis temas do Quem são elas?: presença, dinheiro, agenda, poder, violência política e memória. Cada um com achados, reportagens e dados.";

export const Route = createFileRoute("/temas/")({
  head: () => ({
    meta: [
      { title: "Temas | Quem são elas?" },
      { name: "description", content: description },
      { property: "og:title", content: "Temas | Quem são elas?" },
      { property: "og:description", content: description },
    ],
  }),
  component: TemasPage,
});

/** Cor de composição editorial do tema, nunca codificação de indicadores. */
const TRATAMENTO = {
  presenca: "bg-[var(--art-plum)] text-paper",
  dinheiro: "bg-[var(--art-gold)] text-ink",
  agenda: "bg-paper text-ink",
  poder: "bg-ink text-paper",
  violencia: "bg-paper text-ink",
  memoria: "bg-[#c53f22] text-paper",
} as const;

function TemasPage() {
  return (
    <PageShell breadcrumb={[{ label: "Temas" }]}>
      <header className="relative left-1/2 -ml-[50vw] w-screen bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16 lg:py-20">
          <p className="text-[13px] font-semibold text-[var(--art-gold)]">Guia do observatório · Edição 2026</p>
          <div className="mt-6 flex flex-wrap items-end gap-x-10 gap-y-4">
            <h1 className="max-w-5xl font-display text-[clamp(3.6rem,8vw,7.5rem)] font-semibold leading-[.98]">
              Seis perguntas
            </h1>
            <span aria-label="Seis temas" className="font-display text-[clamp(4.5rem,10vw,8rem)] font-semibold leading-none text-[var(--art-gold)]">
              06
            </span>
          </div>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-paper/85 md:text-lg">
            O observatório acompanha quem chega, com que dinheiro, o que faz com
            o mandato, quem decide, o que barra o caminho e quem abriu as portas.
            O recorte de cor/raça atravessa as seis perguntas.
          </p>
          <p className="mt-6 max-w-xl text-[13px] leading-relaxed text-paper/65">
            Cada entrada reúne uma questão jornalística e dá acesso à apuração,
            aos dados e às fontes, sem confundir a identidade visual dos temas
            com a codificação metodológica dos indicadores.
          </p>
        </div>
      </header>

      <section aria-labelledby="temas-indice-titulo" className="relative left-1/2 -ml-[50vw] w-screen">
        <h2 id="temas-indice-titulo" className="sr-only">As seis frentes da revista</h2>
        <ol>
          {TEMAS.map((t) => {
            const isMemoria = t.slug === "memoria";
            const clareado = t.slug === "dinheiro" || t.slug === "agenda" || t.slug === "violencia";
            return (
              <li key={t.slug} className={TRATAMENTO[t.slug]}>
                <div className={`mx-auto grid max-w-7xl gap-x-10 gap-y-5 px-5 py-8 md:grid-cols-[5rem_minmax(0,.9fr)_minmax(0,1.1fr)] md:items-start md:px-8 md:py-11 ${isMemoria ? "lg:grid-cols-[5rem_.8fr_1fr_15rem]" : ""}`}>
                  <span aria-label={`Tema ${t.ordem}`} className={`font-mono text-lg font-semibold ${clareado ? "text-plum" : isMemoria ? "text-paper" : "text-paper/80"}`}>
                    {t.ordem}
                  </span>
                  <div>
                    <h3 className="font-display text-[clamp(2rem,3.4vw,3.3rem)] font-semibold leading-[1.07]">
                      <a
                        href={`/temas/${t.slug}`}
                        className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
                      >
                        {t.nome}
                      </a>
                    </h3>
                    <p className="mt-2 font-display text-[clamp(1.2rem,2vw,1.6rem)] italic leading-snug">
                      {t.pergunta}
                    </p>
                  </div>
                  <div className="md:pt-1">
                    <p className={`max-w-xl text-[15px] leading-relaxed ${clareado ? "text-ink/85" : isMemoria ? "text-paper" : "text-paper/85"}`}>
                      {t.linha}
                    </p>
                    <a
                      href={`/temas/${t.slug}`}
                      className="mt-4 inline-flex min-h-11 items-center gap-2 border-b border-current text-sm font-semibold focus-visible:outline-2"
                    >
                      Explorar o tema <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                  {isMemoria && (
                    <figure className="min-w-0 max-w-sm md:col-start-2 lg:col-start-4 lg:row-start-1 lg:row-span-2">
                      <img
                        src={FOTOS["bertha-lutz-1927"]!.src}
                        alt={FOTOS["bertha-lutz-1927"]!.alt}
                        loading="lazy"
                        className="aspect-[4/3] w-full object-cover"
                      />
                      <figcaption className="mt-2 max-w-xs text-[12px] leading-relaxed text-paper">
                        Bertha Lutz, 1927. Fotografia histórica do Arquivo Nacional,
                        associada ao tema Memória; não ilustra as eleições de 2026.
                      </figcaption>
                    </figure>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    </PageShell>
  );
}
