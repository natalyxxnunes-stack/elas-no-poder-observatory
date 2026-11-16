import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PerfilCard } from "@/components/editorial/Pioneiras";
import { EM_APURACAO, PERFIS_PIONEIRAS, PIONEIRAS_CRITERIO } from "@/data/perfis-pioneiras";
import { PIONEIRAS } from "@/data/pioneiras";
import { FOTOS } from "@/data/fotos";

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
      <header className="relative left-1/2 -ml-[50vw] w-screen bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl gap-x-12 gap-y-9 px-5 py-12 md:px-8 md:py-16 lg:grid-cols-[.84fr_1.16fr] lg:items-center">
          <div>
            <p className="text-[13px] font-semibold text-[var(--art-gold)]">
              Série Pioneiras · {publicados.length} perfis publicados
            </p>
            <h1 className="mt-5 max-w-3xl font-display text-[clamp(3rem,5.6vw,5.5rem)] leading-[1.04]">
              Quem abriu o caminho
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-paper/85">
              {PIONEIRAS_CRITERIO} Quando uma mulher disputou uma eleição, o
              perfil distingue a votação oficial de relatos e interpretações
              posteriores.
            </p>
            <a href="#perfis" className="mt-6 inline-flex min-h-11 items-center border-b-2 border-[var(--art-gold)] text-sm font-semibold text-paper focus-visible:outline-2">
              Conhecer as trajetórias <span aria-hidden="true" className="ml-2">↓</span>
            </a>
          </div>
          <figure className="min-w-0">
            <img
              src={FOTOS["posse-bertha-lutz-1936"]!.src}
              alt={FOTOS["posse-bertha-lutz-1936"]!.alt}
              width={2880}
              height={2116}
              loading="eager"
              className="aspect-[4/3] w-full object-cover"
            />
            <figcaption className="mt-3 max-w-2xl text-[13px] leading-relaxed text-paper/85">
              <strong className="font-semibold text-paper">Fotografia documental · 28 de julho de 1936.</strong>{" "}
              Bertha Lutz após sua posse na Câmara, no Rio de Janeiro, entre
              familiares, feministas e outras pessoas. Domínio público /
              Acervo Arquivo Nacional, fundo Federação Brasileira pelo Progresso
              Feminino. O registro retrata aquela ocasião histórica.
              {" "}<a
                href={FOTOS["posse-bertha-lutz-1936"]!.licencaUrl}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-paper underline underline-offset-4"
              >
                Consultar origem e condições de uso ↗
              </a>
            </figcaption>
          </figure>
        </div>
      </header>

      <section aria-labelledby="perfis" className="relative left-1/2 -ml-[50vw] w-screen bg-cream">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
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
              <p className="inline-block border border-muted-foreground/60 px-2 py-0.5 text-[13px] text-muted-foreground font-semibold">
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
        <section aria-labelledby="linha" className="relative left-1/2 -ml-[50vw] w-screen bg-muted">
          <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
            <p className="text-[13px] text-plum font-semibold">Na linha do tempo dos direitos</p>
            <h2 id="linha" className="mt-3 max-w-3xl font-display text-3xl leading-tight text-ink">
              Outras mulheres que aparecem na história do voto
            </h2>
            <ul className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {naLinha.map((p) => (
                <li key={p.id} className="border-t border-plum/30 pt-3">
                  <p className="text-[13px] text-muted-foreground font-semibold">
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
