import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { AchadoCard } from "@/components/editorial/AchadoCard";
import { Secao } from "@/components/editorial/Secao";
import { ACHADOS } from "@/data/achados";
import { FALAS } from "@/data/falas";
import { TEMAS } from "@/data/temas";
import { VOTACOES } from "@/data/votacoes-camara";
import { formatInt as n } from "@/lib/format-br";

export const Route = createFileRoute("/temas/$slug")({
  loader: ({ params }) => {
    const tema = TEMAS.find((t) => t.slug === params.slug);
    if (!tema) throw notFound();
    return { slug: tema.slug };
  },
  head: ({ params }) => {
    const tema = TEMAS.find((t) => t.slug === params.slug);
    const title = tema ? `${tema.nome} | Temas | Quem são elas?` : "Tema | Quem são elas?";
    return {
      meta: [
        { title },
        { name: "description", content: tema?.linha ?? "" },
        { property: "og:title", content: title },
        { property: "og:description", content: tema?.linha ?? "" },
      ],
    };
  },
  component: TemaPage,
});

const dataBR = (iso: string) => iso.split("-").reverse().join("/");

function TemaPage() {
  const { slug } = Route.useLoaderData();
  const tema = TEMAS.find((t) => t.slug === slug)!;
  const achados = [...ACHADOS].reverse().filter((a) => a.tema && tema.achados.includes(a.tema));
  const votacoes = VOTACOES.filter((v) => tema.votacoes.includes(v.bloco));
  const falas = tema.falas.map((id) => FALAS.find((f) => f.id === id)).filter((f): f is NonNullable<typeof f> => Boolean(f?.publicar));

  return (
    <PageShell breadcrumb={[{ label: "Temas", to: "/temas" }, { label: tema.nome }]}>
      <header className="py-10 md:py-14">
        <Secao nome="Tema" />
        <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-plum md:text-6xl">{tema.nome}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">{tema.linha}</p>
      </header>

      {achados.length ? (
        <section className="py-8">
          <Secao nome="Achados" tipo={`${achados.length}`} />
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {achados.map((a) => (
              <AchadoCard key={a.id} achado={a} />
            ))}
          </div>
        </section>
      ) : null}

      {votacoes.length ? (
        <section className="py-8">
          <Secao nome="No plenário" tipo="votações na Câmara" />
          <ul className="mt-4 divide-y divide-rule border-b border-rule">
            {votacoes.map((v) => (
              <li key={v.id} className="py-4">
                <a href="/como-votaram" className="group block">
                  <span className="font-display text-xl leading-snug text-ink group-hover:underline group-hover:underline-offset-4">
                    {v.titulo}
                  </span>
                  <span className="mt-1 block font-mono text-[13px] text-ink/70">
                    {v.proposicao} · {dataBR(v.data)} · {n(v.placar.sim)} sim, {n(v.placar.nao)} não
                  </span>
                  <span className="mt-1 block text-[14px] leading-relaxed text-ink/75">Sim = {v.sim}.</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {falas.length ? (
        <section className="py-8">
          <Secao nome="Na voz delas" tipo="falas conferidas" />
          <ul className="mt-4 grid gap-5 md:grid-cols-2">
            {falas.map((f) => (
              <li key={f.id} className="bg-cream p-5">
                <blockquote>
                  <p className="font-display text-lg italic leading-snug text-ink">“{f.fala.split(" [...]")[0]}”</p>
                  <footer className="mt-3 text-[14px] leading-relaxed text-ink/75">
                    <strong className="font-semibold text-ink">{f.pessoa}</strong> ({f.partido}), {f.cargo}. {f.data} ·{" "}
                    <a href={f.fonteUrl} target="_blank" rel="noreferrer" className="text-plum underline underline-offset-2">
                      {f.fonteRotulo}
                    </a>
                  </footer>
                </blockquote>
                <a href={`/na-voz-delas#${f.id}`} className="mt-3 inline-flex min-h-11 items-center text-[14px] font-semibold text-plum">
                  Contexto e dado oficial →
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="py-8 pb-16">
        <Secao nome="No site" tipo="páginas sobre o tema" />
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {tema.paginas.map((p) => (
            <li key={`${p.to}${p.hash ?? ""}`}>
              <a href={`${p.to}${p.hash ? `#${p.hash}` : ""}`} className="flex min-h-14 items-center justify-between gap-4 border-b border-rule py-3 hover:text-plum">
                <span>
                  <span className="block font-display text-xl text-ink">{p.label}</span>
                  <span className="block text-[14px] text-ink/70">{p.nota}</span>
                </span>
                <span aria-hidden="true">→</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-8">
          <a href="/temas" className="text-[15px] font-semibold text-plum">
            Todos os temas →
          </a>
        </p>
      </section>
    </PageShell>
  );
}
