import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Secao } from "@/components/editorial/Secao";
import { TEMAS } from "@/data/temas";

const description = "Os temas do Quem são elas?: achados, votações, falas e páginas reunidos por assunto.";

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
      <header className="py-10 md:py-14">
        <Secao nome="Temas" />
        <h1 className="mt-4 font-display text-4xl leading-tight text-ink md:text-5xl">Por assunto</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/80">
          Cada tema junta, num só lugar, os achados, as votações, as falas e as páginas do site sobre o mesmo assunto.
        </p>
      </header>
      <ul className="grid gap-5 pb-16 md:grid-cols-2">
        {TEMAS.map((t) => (
          <li key={t.slug}>
            <a href={`/temas/${t.slug}`} className="group block h-full border-t-[5px] border-plum bg-card p-6 hover:bg-cream">
              <span className="font-display text-2xl font-semibold leading-tight text-ink group-hover:underline group-hover:underline-offset-4">
                {t.nome}
              </span>
              <span className="mt-2 block text-[15px] leading-relaxed text-ink/75">{t.linha}</span>
            </a>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
