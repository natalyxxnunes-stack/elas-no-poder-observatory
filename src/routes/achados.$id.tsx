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

      <header className="relative left-1/2 -ml-[50vw] w-screen bg-plum text-paper">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-11 md:grid-cols-[1fr_auto] md:items-end md:px-8 md:py-16">
          <div>
            <p className="text-[13px] font-semibold text-[var(--art-gold)]">Caderno de achados · Registro verificável</p>
            <h1 className="mt-4 font-display text-[clamp(2.6rem,4.8vw,4.5rem)] leading-[1.03]">A evidência e sua origem</h1>
            <p className="mt-4 text-[15px] text-paper/85">
              Achado {a.numero} · Publicado em {formatDateBR(a.data)}
              {a.atualizadoEm ? ` · Atualizado em ${formatDateBR(a.atualizadoEm)}` : ""}
            </p>
          </div>
          <span className="font-display text-[clamp(4rem,9vw,8rem)] leading-none text-[var(--art-gold)]" aria-hidden="true">
            {a.numero}
          </span>
        </div>
      </header>
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
            <Link to="/metodo" className="inline-flex min-h-11 items-center py-2 text-[15px] font-semibold text-plum">
              Como contamos: o método →
            </Link>
          </div>
        </aside>
      </div>


      <section aria-label="Caderno de verificação do achado" className="relative left-1/2 -ml-[50vw] w-screen bg-[var(--art-gold)] text-ink">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[.95fr_1.05fr] md:px-8 md:py-14">
          <div>
            <p className="text-[13px] font-semibold">Arquivo de origem · Como conferir</p>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,3.4vw,3.15rem)] leading-tight">O número pode ser refeito.</h2>
            <p className="mt-4 text-[15px] leading-relaxed">Fonte declarada no achado: {a.fonte}. A data, o universo e o método devem ser considerados antes de usar o resultado em outra comparação.</p>
          </div>
          <div className="flex flex-col justify-center gap-4 border-y border-ink/25 py-5">
            <Link to={a.to} className="font-display text-xl font-semibold text-ink underline-offset-4 hover:underline">Abrir a página de dados: {a.linkLabel} ↗</Link>
            <Link to="/metodo" className="font-display text-xl font-semibold text-ink underline-offset-4 hover:underline">Conferir o método e os arquivos ↗</Link>
          </div>
        </div>
      </section>

      {vizinhos.length ? (
        <section className="pb-16 pt-10">
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
