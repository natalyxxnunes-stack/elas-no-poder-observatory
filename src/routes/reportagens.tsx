import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PROXIMAS, REPORTAGENS, REPORTAGENS_REGRA } from "@/data/reportagens";
import { PERFIS_PIONEIRAS } from "@/data/perfis-pioneiras";
import { Secao } from "@/components/editorial/Secao";
import { FOTOS } from "@/data/fotos";
import { ComposicaoEditorial } from "@/components/editorial/ComposicaoEditorial";
import { formatDateBR } from "@/lib/format-br";

export const Route = createFileRoute("/reportagens")({
  head: () => ({
    meta: [
      { title: "Reportagens · Quem são elas?" },
      {
        name: "description",
        content:
          "Reportagens assinadas do Quem são elas?: apuração com dados abertos sobre mulheres, eleições e poder.",
      },
      { property: "og:title", content: "Reportagens · Quem são elas?" },
      {
        property: "og:description",
        content:
          "Apuração assinada sobre mulheres, eleições e poder, com critério e fonte declarados.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReportagensPage,
});

function ReportagensPage() {
  return (
    <PageShell breadcrumb={[{ label: "Reportagens" }]}>
      <header className="relative left-1/2 -ml-[50vw] w-screen bg-cream">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-wide text-plum">Reportagens · Jornalismo de dados</p>
          <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.7rem,4.7vw,4.5rem)] font-semibold leading-[1.04] text-ink">
            Apuração assinada, com a conta aberta
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/85">
            As páginas de dados mostram o que as bases oficiais dizem. Aqui ficam as reportagens:
            textos com escolha de pauta, cruzamento de fontes e leitura editorial, assinados.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink/70">
            {REPORTAGENS_REGRA}
          </p>
        </div>
      </header>

      <section className="py-12 md:py-16" aria-labelledby="reportagens-publicadas">
        <h2 id="reportagens-publicadas" className="font-display text-3xl font-semibold text-ink">
          Reportagens publicadas
        </h2>
        <ol className="mt-7 grid gap-8 md:grid-cols-2">
          {[...REPORTAGENS].sort((a, b) => b.data.localeCompare(a.data)).map((r) => {
            const comFoto = r.to === "/como-votaram";
            const foto = comFoto ? FOTOS["plenario-igualdade-salarial-2023"]! : null;
            return (
              <li key={r.to} className="group min-w-0">
                <Link to={r.to} className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-plum">
                  <figure className="aspect-[5/3] overflow-hidden bg-plum-deep">
                    {foto ? (
                      <img src={foto.src} alt={foto.alt} loading="lazy" className="h-full w-full object-cover" />
                    ) : (
                      <ComposicaoEditorial tipo="voz" />
                    )}
                  </figure>
                  <p className="mt-2 text-xs text-ink/65">
                    {foto ? `${foto.credito} · foto de arquivo de maio de 2023, relacionada ao PL 1.085/2023` : "Arte editorial original · não documental"}
                  </p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-plum">
                    {r.tema} · {formatDateBR(r.data)} · {r.autora}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold leading-tight text-ink group-hover:text-plum md:text-3xl">
                    {r.titulo}
                  </h3>
                </Link>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-ink/80">{r.linhaFina}</p>
                <Link to={r.to} className="mt-4 inline-flex min-h-11 items-center font-semibold text-plum underline underline-offset-4">
                  Ler a reportagem ↗
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="grid gap-12 border-t border-rule py-12 md:grid-cols-3">
        <div>
          <Secao nome="Coleção" pequeno />
          <Link to="/colecoes/antigenero-no-poder" className="group mt-3 block">
            <span className="block font-display text-3xl font-semibold leading-tight text-ink group-hover:text-plum">
              A agenda antigênero no poder
            </span>
            <span className="mt-2 block text-[15px] leading-relaxed text-ink/75">
              Deputadas que votaram contra a lei de igualdade salarial ou a favor de sustar a norma do
              Conanda, e quem terá mandato em 2027.
            </span>
          </Link>
        </div>
        <div>
          <Secao nome="Perfis" tipo="Pioneiras" pequeno />
          <ul className="mt-3">
            {PERFIS_PIONEIRAS.filter((p) => p.to).map((p) => (
              <li key={p.id} className="border-b border-rule py-3">
                <Link to={p.to!} className="font-display text-xl text-ink hover:text-plum">
                  {p.name}
                </Link>
                <span className="block font-mono text-[13px] text-ink/65">{p.years}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Secao nome="Na próxima edição" pequeno />
          <ul className="mt-3">
            {PROXIMAS.map((p) => (
              <li key={p.data} className="border-b border-rule py-3">
                <span className="block font-mono text-[13px] text-ink/65">
                  {formatDateBR(p.data)} · {p.nota}
                </span>
                <span className="font-display text-xl text-ink">{p.titulo}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
