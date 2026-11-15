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

function TemasPage() {
  return (
    <PageShell breadcrumb={[{ label: "Temas" }]}>
      <header className="relative left-1/2 -ml-[50vw] w-screen bg-plum-deep text-paper">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:px-8 md:py-16 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-lilac">Guia do observatório</p>
            <h1 className="mt-4 max-w-xl font-display text-5xl font-semibold leading-tight md:text-6xl">Seis perguntas</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-paper/85">
              O observatório acompanha o caminho das mulheres na política em seis camadas:
              quem chega, com que dinheiro, o que faz com o mandato, quem decide, o que barra
              o caminho e quem abriu as portas. Cor/raça atravessa todas.
            </p>
          </div>
          <figure>
            <img src={FOTOS["bertha-lutz-1927"]!.src}
              alt={FOTOS["bertha-lutz-1927"]!.alt}
              className="block h-56 w-full object-cover object-center md:h-72" loading="eager" />
            <figcaption className="mt-2 text-xs leading-relaxed text-paper/75">
              Bertha Lutz, campanha pelo voto feminino, 1927.
              Domínio público / Acervo Arquivo Nacional. Fotografia histórica vinculada ao tema Memória.
            </figcaption>
          </figure>
        </div>
      </header>
      <section className="py-12 md:py-16" aria-label="Escolher um tema">
        <p className="mb-5 text-xs font-semibold uppercase tracking-wide text-plum">Entradas de leitura e consulta</p>
        <ol className="border-t border-rule">
          {TEMAS.map((t) => (
            <li key={t.slug} className="border-b border-rule">
              <a href={`/temas/${t.slug}`}
                className="group grid gap-3 py-6 hover:bg-cream/65 md:grid-cols-[4.5rem_14rem_1fr_auto] md:items-start md:gap-8 md:px-4 md:py-8">
                <span className="font-mono text-sm font-semibold text-plum">{t.ordem}</span>
                <span>
                  <span className="block font-display text-3xl font-semibold leading-tight text-ink group-hover:text-plum">{t.nome}</span>
                  <span className="mt-2 block font-display text-lg italic text-plum">{t.pergunta}</span>
                </span>
                <span className="max-w-xl text-base leading-relaxed text-ink/80">{t.linha}</span>
                <span className="font-display text-2xl text-plum" aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ol>
      </section>
    </PageShell>
  );
}
