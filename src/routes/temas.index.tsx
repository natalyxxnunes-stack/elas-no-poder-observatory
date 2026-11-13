import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { OBJETOS } from "@/components/editorial/ObjetoTema";
import { Recorte } from "@/components/editorial/Recorte";
import { TEMAS } from "@/data/temas";

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
      <header className="max-w-3xl py-10 md:py-14">
        <h1 className="font-display text-5xl font-semibold leading-none text-plum md:text-6xl">
          Seis perguntas
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink/80">
          O observatório acompanha o caminho das mulheres na política em seis camadas: quem chega,
          com que dinheiro, o que faz com o mandato, quem decide, o que barra o caminho e quem abriu
          as portas. Cor/raça atravessa todas.
        </p>
      </header>
      <ol className="border-t-[5px] border-plum pb-16">
        {TEMAS.map((t) => (
          <li key={t.slug} className="border-b border-rule">
            <a
              href={`/temas/${t.slug}`}
              className="group grid gap-3 py-7 md:grid-cols-[12rem_1fr_1.2fr] md:gap-8"
            >
              <span className="block">
                <Recorte slug={t.slug} className="aspect-[2/1]" />
                <span className="mt-2 block font-mono text-[15px] text-ink/60">{t.ordem}</span>
              </span>
              <span>
                <span className="block font-display text-3xl font-semibold leading-tight text-ink group-hover:text-plum md:text-4xl">
                  {t.nome}
                </span>
                <span className="mt-1 block font-display text-xl italic text-plum">
                  {t.pergunta}
                </span>
              </span>
              <span className="text-[16px] leading-relaxed text-ink/80 md:pt-2">
                {OBJETOS[t.slug]().frase}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </PageShell>
  );
}
