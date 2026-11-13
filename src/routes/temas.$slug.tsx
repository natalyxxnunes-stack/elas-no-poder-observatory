import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { AchadoCard } from "@/components/editorial/AchadoCard";
import { Faixa } from "@/components/editorial/Faixa";
import { ObjetoFigura, OBJETOS } from "@/components/editorial/ObjetoTema";
import { Recorte } from "@/components/editorial/Recorte";
import { Secao } from "@/components/editorial/Secao";
import { ACHADOS } from "@/data/achados";
import { FALAS } from "@/data/falas";
import { TEMAS, TEMAS_ANTIGOS } from "@/data/temas";
import { VOTACOES } from "@/data/votacoes-camara";
import { formatInt as n } from "@/lib/format-br";

/**
 * Página de tema (12/11/2026). Ordem fixa, de revista:
 *  1. abertura em roxo-tinta com o número-objeto do tema;
 *  2. achados (a unidade do site: um dado, um gráfico, o que significa);
 *  3. no plenário e na voz delas, quando o tema tem;
 *  4. para ler: reportagens e perfis que aprofundam;
 *  5. para consultar: as páginas de dados;
 *  6. o próximo tema.
 */
export const Route = createFileRoute("/temas/$slug")({
  loader: ({ params }) => {
    const novo = TEMAS_ANTIGOS[params.slug];
    if (novo) throw redirect({ to: "/temas/$slug", params: { slug: novo } });
    const tema = TEMAS.find((t) => t.slug === params.slug);
    if (!tema) throw notFound();
    return { slug: tema.slug };
  },
  head: ({ params }) => {
    const tema = TEMAS.find((t) => t.slug === params.slug);
    const title = tema
      ? `${tema.nome}: ${tema.pergunta} | Quem são elas?`
      : "Tema | Quem são elas?";
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
  const i = TEMAS.findIndex((t) => t.slug === slug);
  const tema = TEMAS[i]!;
  const proximo = TEMAS[(i + 1) % TEMAS.length]!;
  const objeto = OBJETOS[tema.slug]();
  const achados = [...ACHADOS].reverse().filter((a) => a.tema && tema.achados.includes(a.tema));
  const votacoes = VOTACOES.filter((v) => tema.votacoes.includes(v.bloco));
  const falas = tema.falas
    .map((id) => FALAS.find((f) => f.id === id))
    .filter((f): f is NonNullable<typeof f> => Boolean(f?.publicar));

  return (
    <PageShell breadcrumb={[{ label: "Temas", to: "/temas" }, { label: tema.nome }]}>
      <Faixa fundo="bg-plum-deep text-paper">
        <div className="grid gap-10 py-12 md:grid-cols-[1fr_1.15fr] md:gap-16 md:py-20">
          <div>
            <p className="font-mono text-[14px] text-lilac">
              Tema {tema.ordem} de {TEMAS.length}
            </p>
            <h1 className="mt-3 font-display text-5xl font-semibold leading-none md:text-7xl">
              {tema.nome}
            </h1>
            <p className="mt-3 font-display text-2xl italic text-lilac md:text-3xl">
              {tema.pergunta}
            </p>
            <p className="mt-10 border-t-[5px] border-coral pt-5 font-display text-[1.7rem] leading-tight md:text-[2.2rem]">
              {objeto.frase}
            </p>
            <a
              href={`${objeto.link.to}${objeto.link.hash ? `#${objeto.link.hash}` : ""}`}
              className="mt-6 inline-flex min-h-11 items-center text-[15px] font-semibold text-paper underline decoration-coral decoration-2 underline-offset-4"
            >
              {objeto.link.label} →
            </a>
          </div>
          <div className="md:pt-6">
            <ObjetoFigura slug={tema.slug} />
          </div>
        </div>
      </Faixa>

      <section className="py-12 md:py-16">
        <p className="max-w-3xl font-display text-2xl leading-snug text-ink md:text-[1.75rem]">
          {tema.linha}
        </p>
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-ink/75">
          Cor/raça atravessa todos os temas: pretas, pardas, brancas, indígenas e amarelas aparecem
          sempre separadas, e qualquer soma vem declarada.
        </p>
      </section>

      {achados.length ? (
        <Faixa fundo="bg-cream">
          <div className="py-12 md:py-16">
            <Secao
              nome="Achados"
              tipo={`${n(achados.length)} neste tema · cada um tem endereço próprio`}
            />
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {achados.map((a) => (
                <AchadoCard key={a.id} achado={a} />
              ))}
            </div>
          </div>
        </Faixa>
      ) : null}

      {votacoes.length ? (
        <section className="py-12">
          <Secao nome="No plenário" tipo="votações na Câmara" />
          <ul className="mt-4 divide-y divide-rule border-b border-rule">
            {votacoes.map((v) => {
              const F = v.porSexo.F;
              return (
                <li key={v.id} className="py-5">
                  <a
                    href="/como-votaram"
                    className="group grid gap-2 md:grid-cols-[1fr_16rem] md:gap-8"
                  >
                    <span>
                      <span className="block font-display text-xl leading-snug text-ink group-hover:underline group-hover:underline-offset-4 md:text-2xl">
                        {v.titulo}
                      </span>
                      <span className="mt-1 block font-mono text-[13px] text-ink/70">
                        {v.proposicao} · {dataBR(v.data)}
                      </span>
                    </span>
                    <span className="text-[14px] leading-relaxed text-ink/80">
                      Deputadas: <strong className="text-ink">{n(F.votos["Sim"] ?? 0)} sim</strong>,{" "}
                      <strong className="text-ink">{n(F.votos["Não"] ?? 0)} não</strong>, de{" "}
                      {n(F.total)} em exercício.
                      <span className="block text-ink/65">Sim = {v.sim}.</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      {falas.length ? (
        <Faixa fundo="bg-plum text-paper">
          <div className="py-12 md:py-16">
            <Secao nome="Na voz delas" tipo="falas conferidas, com o dado oficial ao lado" claro />
            <ul className="mt-8 grid gap-8 md:grid-cols-2">
              {falas.map((f) => (
                <li key={f.id}>
                  <blockquote>
                    <p className="font-display text-xl italic leading-snug md:text-2xl">
                      “{f.fala.split(" [...]")[0]}”
                    </p>
                    <footer className="mt-3 text-[14px] leading-relaxed text-paper/85">
                      <strong className="font-semibold text-paper">{f.pessoa}</strong> ({f.partido}
                      ), {f.cargo}. {f.data} ·{" "}
                      <a
                        href={f.fonteUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="underline underline-offset-2"
                      >
                        {f.fonteRotulo}
                      </a>
                    </footer>
                  </blockquote>
                  <a
                    href={`/na-voz-delas#${f.id}`}
                    className="mt-2 inline-flex min-h-11 items-center text-[14px] font-semibold text-lilac"
                  >
                    Contexto e dado oficial →
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Faixa>
      ) : null}

      <section className="grid gap-12 py-12 md:grid-cols-2 md:py-16">
        {tema.leituras.length ? (
          <div>
            <Secao nome="Para ler" tipo="reportagens e perfis" />
            <ul className="mt-4">
              {tema.leituras.map((l) => (
                <li key={l.to}>
                  <a href={l.to} className="group block border-b border-rule py-4">
                    <span className="block text-[13px] font-semibold text-coral-ink">{l.nota}</span>
                    <span className="mt-1 block font-display text-2xl leading-snug text-ink group-hover:underline group-hover:underline-offset-4">
                      {l.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <div>
          <Secao nome="Para consultar" tipo="os dados completos" />
          <ul className="mt-4">
            {tema.paginas.map((p) => (
              <li key={`${p.to}${p.hash ?? ""}`}>
                <a
                  href={`${p.to}${p.hash ? `#${p.hash}` : ""}`}
                  className="flex min-h-14 items-center justify-between gap-4 border-b border-rule py-3 hover:text-plum"
                >
                  <span>
                    <span className="block font-display text-xl text-ink">{p.label}</span>
                    <span className="block text-[14px] text-ink/70">{p.nota}</span>
                  </span>
                  <span aria-hidden="true">→</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Recorte
        slug={proximo.slug}
        className="relative left-1/2 -ml-[50vw] aspect-[4/1] w-screen md:aspect-[8/1]"
      />
      <Faixa fundo="bg-cream">
        <a
          href={`/temas/${proximo.slug}`}
          className="group flex flex-wrap items-baseline justify-between gap-4 py-10"
        >
          <span>
            <span className="block font-mono text-[14px] text-ink/70">
              Próximo tema · {proximo.ordem}
            </span>
            <span className="mt-1 block font-display text-3xl text-plum group-hover:underline group-hover:underline-offset-4 md:text-4xl">
              {proximo.nome}: <span className="italic">{proximo.pergunta}</span>
            </span>
          </span>
          <span aria-hidden="true" className="font-display text-3xl text-plum">
            →
          </span>
        </a>
      </Faixa>
    </PageShell>
  );
}
