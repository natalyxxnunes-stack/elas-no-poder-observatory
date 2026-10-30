import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PerfilCard } from "@/components/editorial/Pioneiras";
import { EM_APURACAO, PERFIS_PIONEIRAS, PIONEIRAS_CRITERIO } from "@/data/perfis-pioneiras";
import { PIONEIRAS } from "@/data/pioneiras";

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
  const publicados = PERFIS_PIONEIRAS.filter((p) => p.to);
  const emApuracao = PERFIS_PIONEIRAS.filter((p) => !p.to);
  const comPerfil = new Set(PERFIS_PIONEIRAS.map((p) => p.id));
  const naLinha = PIONEIRAS.filter((p) => !comPerfil.has(p.id));

  return (
    <PageShell breadcrumb={[{ label: "Pioneiras" }]}>
      <header className="py-10 md:py-14">
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-plum">
          Série · {publicados.length} perfis publicados
        </p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] text-ink md:text-7xl">
          Quem abriu o caminho
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/80">
          {PIONEIRAS_CRITERIO} Quando ela disputou uma eleição, o perfil traz a votação oficial,
          recontada, e separa o que tem documento do que é reputação.
        </p>
      </header>

      <section aria-labelledby="perfis" className="relative left-1/2 -ml-[50vw] w-screen bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
          <h2 id="perfis" className="sr-only">
            Perfis publicados
          </h2>
          <ul className="grid gap-5 md:grid-cols-2">
            {publicados.map((p, i) => (
              <PerfilCard key={p.id} p={p} n={i + 1} />
            ))}
          </ul>

          {emApuracao.map((p) => (
            <div key={p.id} className="mt-5 border border-dashed border-plum/40 p-5 md:p-6">
              <p className="inline-block border border-muted-foreground/60 px-2 py-0.5 font-mono text-[13px] uppercase tracking-wider text-muted-foreground">
                Próximo perfil · em apuração
              </p>
              <p className="mt-3 font-display text-2xl leading-tight text-ink/75">
                {p.name} <span className="text-base text-muted-foreground">· {p.years}</span>
              </p>
              <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                {p.linhaFina} {EM_APURACAO[p.id]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {naLinha.length > 0 && (
        <section aria-labelledby="linha" className="relative left-1/2 -ml-[50vw] w-screen bg-lilac">
          <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-plum">Na linha do tempo dos direitos</p>
            <h2 id="linha" className="mt-3 max-w-3xl font-display text-3xl leading-tight text-ink">
              Outras mulheres que aparecem na história do voto
            </h2>
            <ul className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {naLinha.map((p) => (
                <li key={p.id} className="border-t border-plum/30 pt-3">
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {p.milestoneYear ?? p.years ?? ""}
                  </p>
                  <p className="mt-1 font-display text-xl leading-tight text-ink">{p.name}</p>
                  <p className="mt-1 text-[15px] leading-snug text-ink/80">{p.mark}</p>
                </li>
              ))}
            </ul>
            <Link
              to="/direitos"
              hash="pioneiras"
              className="mt-8 inline-flex min-h-11 items-center font-medium text-plum underline decoration-plum underline-offset-4"
            >
              Ver os cards na linha do tempo de Direitos →
            </Link>
          </div>
        </section>
      )}
    </PageShell>
  );
}
