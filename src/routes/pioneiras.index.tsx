import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PERFIS_PIONEIRAS, PIONEIRAS_CRITERIO } from "@/data/perfis-pioneiras";

export const Route = createFileRoute("/pioneiras/")({
  head: () => ({
    meta: [
      { title: "Pioneiras · Quem são elas?" },
      { name: "description", content: PIONEIRAS_CRITERIO },
      { property: "og:title", content: "Pioneiras · Quem são elas?" },
      { property: "og:description", content: PIONEIRAS_CRITERIO },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PioneirasPage,
});

function PioneirasPage() {
  return (
    <PageShell breadcrumb={[{ label: "Pioneiras" }]}>
      <header className="border-b border-ink py-12 md:py-16">
        <p className="kicker">Pioneiras</p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl leading-none text-ink md:text-6xl">
          Quem abriu o caminho
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {PIONEIRAS_CRITERIO}
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Cada perfil separa o que tem documento do que é reputação, e traz a votação oficial quando
          ela disputou uma eleição.
        </p>
      </header>
      <ol className="divide-y divide-rule py-6">
        {PERFIS_PIONEIRAS.map((p, i) => (
          <li key={p.id} className="py-8">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
              {String(i + 1).padStart(2, "0")} · {p.years}
              {p.to ? "" : " · perfil em apuração"}
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-2xl leading-tight text-ink md:text-4xl">
              {p.to ? (
                <Link to={p.to} className="hover:text-plum">
                  {p.name}
                </Link>
              ) : (
                p.name
              )}
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{p.linhaFina}</p>
            {p.to && (
              <Link to={p.to} className="mt-4 inline-block text-sm text-plum underline underline-offset-4">
                Ler o perfil →
              </Link>
            )}
          </li>
        ))}
      </ol>
    </PageShell>
  );
}
