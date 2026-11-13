import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { AchadoCard } from "@/components/editorial/AchadoCard";
import { Secao } from "@/components/editorial/Secao";
import { ACHADOS } from "@/data/achados";
import { TEMAS } from "@/data/temas";
import { formatDateBR } from "@/lib/format-br";

/**
 * Página do achado (12/11/2026): a unidade citável do observatório. Um dado,
 * o gráfico, o que significa, fonte e data, com endereço permanente, um jeito
 * pronto de citar e o caminho para a página de dados e para o tema.
 */
export const Route = createFileRoute("/achados/$id")({
  loader: ({ params }) => {
    const a = ACHADOS.find((x) => x.id === params.id);
    if (!a) throw notFound();
    return { id: a.id };
  },
  head: ({ params }) => {
    const a = ACHADOS.find((x) => x.id === params.id);
    const title = a ? `${a.titulo} | Achados | Quem são elas?` : "Achado | Quem são elas?";
    const desc = a ? `${a.ancora ? `${a.ancora.valor} ${a.ancora.rotulo}. ` : ""}${a.texto}` : "";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: AchadoPage,
});

function AchadoPage() {
  const { id } = Route.useLoaderData();
  const a = ACHADOS.find((x) => x.id === id)!;
  const tema = a.tema ? TEMAS.find((t) => t.achados.includes(a.tema!)) : undefined;
  const vizinhos = ACHADOS.filter((x) => x.id !== a.id && x.tema && x.tema === a.tema).slice(0, 3);
  const citacao = `Quem são elas? Achado ${a.numero}: ${a.titulo}. Publicado em ${formatDateBR(a.data)}${
    a.atualizadoEm ? `, atualizado em ${formatDateBR(a.atualizadoEm)}` : ""
  }. Disponível em https://quemsaoelas.com.br/achados/${a.id}. Fonte dos dados: ${a.fonte}.`;

  return (
    <PageShell
      breadcrumb={[
        { label: "Achados", to: "/achados" },
        ...(tema ? [{ label: tema.nome, to: `/temas/${tema.slug}` }] : []),
        { label: `Achado ${a.numero}` },
      ]}
    >
      <div className="grid gap-10 py-8 md:grid-cols-[1.6fr_1fr] md:gap-14 md:py-12">
        <div className="border border-rule">
          <AchadoCard achado={a} grande pagina />
        </div>
        <aside className="space-y-10">
          {tema ? (
            <div>
              <Secao nome="Tema" pequeno />
              <Link to="/temas/$slug" params={{ slug: tema.slug }} className="group mt-2 block">
                <span className="font-display text-2xl font-semibold text-ink group-hover:text-plum">
                  {tema.nome}
                </span>
                <span className="block font-display text-lg italic text-plum">{tema.pergunta}</span>
              </Link>
            </div>
          ) : null}
          <div>
            <Secao nome="Como citar" pequeno />
            <p className="mt-3 bg-cream p-4 font-mono text-[13px] leading-relaxed text-ink/85">
              {citacao}
            </p>
          </div>
          <div>
            <Secao nome="Os dados completos" pequeno />
            <Link
              to={a.to}
              className="mt-2 inline-flex min-h-11 items-center text-[15px] font-semibold text-plum"
            >
              {a.linkLabel} →
            </Link>
            <Link to="/metodo" className="block text-[15px] font-semibold text-plum">
              Como contamos: o método →
            </Link>
          </div>
        </aside>
      </div>

      {vizinhos.length ? (
        <section className="pb-16">
          <Secao nome="Outros achados do tema" />
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {vizinhos.map((v) => (
              <AchadoCard key={v.id} achado={v} />
            ))}
          </div>
        </section>
      ) : null}
    </PageShell>
  );
}
