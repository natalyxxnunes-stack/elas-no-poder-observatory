import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { AchadoCard } from "@/components/editorial/AchadoCard";
import { Faixa } from "@/components/editorial/Faixa";
import { TemaOpening, ObjetoComplementar } from "@/components/editorial/TemaOpening";
import { FotografiaEmContexto } from "@/components/editorial/CadernoDocumentalRevista";
import { Secao } from "@/components/editorial/Secao";
import { ACHADOS } from "@/data/achados";
import { FALAS } from "@/data/falas";
import { TEMAS, TEMAS_ANTIGOS } from "@/data/temas";
import { VOTACOES } from "@/data/votacoes-camara";
import { formatInt as n } from "@/lib/format-br";

/**
 * Página de tema (12/11/2026). Ordem fixa, de revista:
 *  1. abertura em roxo-tinta com o número-objeto do tema;
 *  2. a tese, em uma ou duas frases com número (13/11/2026);
 *  3. achados, como provas da tese (um dado, um gráfico, o que significa);
 *  4. quem decide: atores e relações por trás dos números (13/11/2026);
 *  5. no plenário e na voz delas, quando o tema tem;
 *  6. o que ainda não sabemos (13/11/2026);
 *  7. para ler e para consultar: reportagens e ferramentas de dados;
 *  8. o próximo tema.
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
  const achados = [...ACHADOS].reverse().filter((a) => a.tema && tema.achados.includes(a.tema));
  const votacoes = VOTACOES.filter((v) => tema.votacoes.includes(v.bloco));
  const falas = tema.falas
    .map((id) => FALAS.find((f) => f.id === id))
    .filter((f): f is NonNullable<typeof f> => Boolean(f?.publicar));

  return (
    <PageShell breadcrumb={[{ label: "Temas", to: "/temas" }, { label: tema.nome }]}>
      <TemaOpening tema={tema} />

      <nav aria-label="Nesta página temática"
        className="relative left-1/2 -ml-[50vw] w-screen border-b border-rule bg-paper">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-1 px-5 py-3 text-sm md:px-8">
          <span className="font-semibold text-plum">Neste tema</span>
          <a href="#tese" className="inline-flex min-h-10 items-center text-ink hover:text-plum">O essencial</a>
          {achados.length > 0 ? (
            <a href="#provas" className="inline-flex min-h-10 items-center text-ink hover:text-plum">Os achados</a>
          ) : null}
          <a href="#quem-decide" className="inline-flex min-h-10 items-center text-ink hover:text-plum">Quem decide</a>
          <a href="#lacunas" className="inline-flex min-h-10 items-center text-ink hover:text-plum">Lacunas</a>
          <a href="#leitura-e-consulta" className="inline-flex min-h-10 items-center text-ink hover:text-plum">Ler e consultar</a>
        </div>
      </nav>

      <section id="tese" className="scroll-mt-24 py-12 md:py-16">
        <Secao nome="O essencial" tipo="o que o observatório encontrou neste tema" semFio />
        {/* Duas colunas no desktop para a tese não deixar meia tela vazia (13/11/2026). */}
        <div className="mt-6 grid gap-8 md:grid-cols-12 md:gap-10">
          <p className="font-display text-[1.9rem] leading-[1.15] text-ink md:col-span-8 md:text-[2.5rem]">
            {tema.tese}
          </p>
          <p className="border-l-4 border-plum bg-muted px-5 py-4 text-[16px] leading-relaxed text-ink/80 md:col-span-4 md:self-end">
            {tema.linha} Cor/raça atravessa todos os temas: pretas, pardas, brancas, indígenas e
            amarelas aparecem sempre separadas, e qualquer soma vem declarada.
          </p>
        </div>
        <ObjetoComplementar tema={tema} />
      </section>

      {tema.slug === "memoria" ? (
        <FotografiaEmContexto
          fotoId="posse-bertha-lutz-1936"
          editoria="Fotografia histórica · Arquivo Nacional"
          titulo="1936: a posse também deixou uma imagem."
          contexto="Registro da posse de Bertha Lutz na Câmara, em 28 de julho de 1936. A fotografia documenta aquele acontecimento, sem representar todas as mulheres que disputaram ou exerceram poder político no período. Fonte e atribuição identificadas no acervo."
          tom="ink"
        />
      ) : tema.slug === "agenda" ? (
        <FotografiaEmContexto
          fotoId="plenario-igualdade-salarial-2023"
          editoria="Fotografia parlamentar · 2023"
          titulo="O voto precisa do registro nominal."
          contexto="Imagem de arquivo do plenário em maio de 2023, no contexto da igualdade salarial. Ela não identifica, por si, o voto de cada parlamentar; a conferência depende das votações nominais e das fontes indicadas nas reportagens."
          tom="plum"
        />
      ) : null}

      {achados.length ? (
        <Faixa fundo="bg-cream">
          <div id="provas" className="scroll-mt-24 py-12 md:py-16">
            <Secao
              nome="As provas"
              tipo={`${n(achados.length)} achados · cada um tem endereço próprio`}
            />
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {achados.map((a) => (
                <AchadoCard key={a.id} achado={a} />
              ))}
            </div>
          </div>
        </Faixa>
      ) : null}

      <section id="quem-decide" className="relative left-1/2 -ml-[50vw] w-screen scroll-mt-24 bg-ink text-paper"><div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <Secao nome="Quem decide" tipo="os atores e as relações por trás dos números" claro />
        <ol className="mt-8 grid gap-px bg-rule md:grid-cols-3">
          {tema.quemDecide.map((q, k) => (
            <li key={q.ator} className="bg-paper p-6 md:p-8">
              <span className="font-mono text-[13px] text-coral-ink">{String(k + 1).padStart(2, "0")}</span>
              <p className="mt-3 font-display text-2xl leading-snug text-ink">{q.ator}</p>
              <p className="mt-2 text-[16px] leading-relaxed text-ink/80">decide {q.decide}.</p>
            </li>
          ))}
        </ol>
        </div></section>

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

      <section id="lacunas" className="relative left-1/2 -ml-[50vw] w-screen scroll-mt-24 bg-[#c53f22] text-paper"><div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <Secao nome="O que ainda não sabemos" tipo="lacunas declaradas" claro />
        <ul className="mt-6 grid gap-6 md:grid-cols-2 md:gap-10">
          {tema.naoSabemos.map((x) => (
            <li key={x} className="border-l-[3px] border-paper pl-5 text-[16px] leading-relaxed text-paper">
              {x}
            </li>
          ))}
        </ul>
        </div></section>

      <section id="leitura-e-consulta" className="scroll-mt-24 grid gap-10 py-12 md:grid-cols-2 md:py-16">
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
          <Secao nome="Para consultar" tipo="as ferramentas de dados deste tema" />
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
