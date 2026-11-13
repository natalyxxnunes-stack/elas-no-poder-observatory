import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PROXIMAS, REPORTAGENS, REPORTAGENS_REGRA } from "@/data/reportagens";
import { PERFIS_PIONEIRAS } from "@/data/perfis-pioneiras";
import { Secao } from "@/components/editorial/Secao";
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
      <header className="border-b border-ink py-12 md:py-16">
        <p className="kicker">Reportagens</p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl leading-none text-ink md:text-6xl">
          Apuração assinada, com a conta aberta
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          As páginas de dados mostram o que as bases oficiais dizem. Aqui ficam as reportagens:
          textos com escolha de pauta, cruzamento de fontes e leitura editorial, assinados.
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {REPORTAGENS_REGRA}
        </p>
      </header>
      <ol className="divide-y divide-rule py-6">
        {[...REPORTAGENS]
          .sort((a, b) => b.data.localeCompare(a.data))
          .map((r) => (
            <li key={r.to} className="py-8">
              <p className="text-[13px] text-muted-foreground font-semibold">
                {r.tema} · {formatDateBR(r.data)} · {r.autora}
              </p>
              <h2 className="mt-3 max-w-3xl font-display text-2xl leading-tight text-ink md:text-4xl">
                <Link to={r.to} className="hover:text-plum">
                  {r.titulo}
                </Link>
              </h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{r.linhaFina}</p>
              <Link
                to={r.to}
                className="mt-4 inline-block text-sm text-plum underline underline-offset-4"
              >
                Ler a reportagem →
              </Link>
            </li>
          ))}
      </ol>

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
