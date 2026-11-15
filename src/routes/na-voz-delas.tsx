import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { PageShell } from "@/components/PageShell";
import { ComoSabemos } from "@/components/editorial/ComoSabemos";
import { GapNote } from "@/components/GapNote";
import { FALAS, FALAS_PEDIDO_ENVIADO_EM, type Fala } from "@/data/falas";

export const Route = createFileRoute("/na-voz-delas")({
  head: () => ({
    meta: [
      { title: "Na voz delas | Quem são elas?" },
      {
        name: "description",
        content:
          "O que eleitas disseram em público sobre mulheres, feminismo e violência, com data, fonte primária e o dado oficial ao lado.",
      },
      {
        property: "og:title",
        content: "Na voz delas: o que as eleitas dizem sobre mulheres, com fonte e data",
      },
    ],
  }),
  component: NaVozDelasPage,
});

function AberturaFalas({ publicadas }: { publicadas: Fala[] }) {
  const fontes = publicadas.slice(0, 3);
  return (
    <section className="relative left-1/2 -ml-[50vw] w-screen bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:px-8 md:py-16 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-lilac">Reportagem · Discursos públicos</p>
          <h1 className="mt-4 font-display text-[clamp(2.65rem,4.5vw,4.4rem)] font-semibold leading-[1.02]">
            Na voz delas
          </h1>
          <p className="mt-5 font-display text-2xl leading-tight text-lilac md:text-3xl">
            O que as eleitas dizem sobre mulheres, com data, fonte e o dado oficial ao lado
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-paper/85">
            Falas públicas de deputadas e eleitas sobre feminismo, direitos e violência contra
            mulheres. Cada uma vem entre aspas, com a data, o lugar e o link para o registro
            original. Quando a fala afirma um fato, o dado oficial vai ao lado. Quando a pessoa
            explicou a fala depois, a versão dela entra também.
          </p>
          <a href="#falas" className="mt-6 inline-flex min-h-11 items-center font-semibold text-paper underline decoration-lilac decoration-2 underline-offset-4">
            Ler os registros ↘
          </a>
        </div>
        <aside aria-label="Referências documentais das declarações" className="bg-paper p-5 text-ink md:p-7">
          <p className="text-xs font-semibold uppercase tracking-wide text-plum">Fontes primárias · Seleção do acervo</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/75">
            As referências abaixo conduzem aos registros originais; são citações bibliográficas,
            não reproduções gráficas das páginas.
          </p>
          <ul className="mt-4 divide-y divide-rule border-y border-rule">
            {fontes.map((f) => (
              <li key={f.id}>
                <a href={f.fonteUrl} target="_blank" rel="noreferrer"
                  className="group flex min-h-16 items-center justify-between gap-3 py-3 hover:text-plum">
                  <span>
                    <span className="block text-xs text-ink/65">{f.data} · {f.onde}</span>
                    <span className="mt-1 block text-sm font-semibold">{f.fonteRotulo}</span>
                  </span>
                  <span className="shrink-0" aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-ink/70">{publicadas.length} registros conferidos e publicados no índice.</p>
        </aside>
      </div>
    </section>
  );
}

function FalaCard({ f, i }: { f: Fala; i: number }) {
  const escuro = i === 0;
  const posicionamento = f.posicionamento
    ? `Resposta de ${f.pessoa}: ${f.posicionamento.texto} (${f.posicionamento.data})`
    : FALAS_PEDIDO_ENVIADO_EM
      ? `Pedido enviado em ${FALAS_PEDIDO_ENVIADO_EM}; sem resposta até a última atualização`
      : "Registro público, publicado com data e link. Correção ou resposta: contato@quemsaoelas.com.br; entra aqui, com data";
  return (
    <article id={f.id} className={`scroll-mt-24 relative left-1/2 -ml-[50vw] w-screen ${escuro ? "bg-plum-deep text-paper" : i % 2 === 0 ? "bg-cream" : "bg-paper"}`}>
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-9 md:px-8 md:py-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-12">
        <div className="min-w-0">
          <p className={`text-xs font-semibold ${escuro ? "text-lilac" : "text-plum"}`}>{f.data} · {f.onde}</p>
          <blockquote className="mt-4">
            <p className={`font-display leading-[1.2] ${escuro ? "text-[1.65rem] text-paper md:text-[2.3rem]" : "text-[1.55rem] text-ink md:text-[1.95rem]"}`}>
              “{f.fala}”
            </p>
            <footer className={`mt-5 border-t pt-4 ${escuro ? "border-paper/25" : "border-rule"}`}>
              <span className={`block font-display text-xl ${escuro ? "text-paper" : "text-ink"}`}>{f.pessoa}</span>
              <span className={`mt-1 block text-sm ${escuro ? "text-paper/80" : "text-ink/75"}`}>
                {f.partido} · {f.cargo}
              </span>
            </footer>
          </blockquote>
        </div>
        <div className="min-w-0 space-y-4 lg:pt-1">
          {f.dado ? (
            <div className="bg-butter px-5 py-4 text-ink">
              <p className="text-xs font-semibold uppercase tracking-wide">O dado oficial</p>
              <p className="mt-2 text-base leading-relaxed">{f.dado.texto}</p>
              <p className="mt-2 text-xs text-ink/70">{f.dado.fonte}</p>
            </div>
          ) : null}
          <div className={escuro ? "bg-paper/10 p-5" : "bg-muted p-5"}>
            <p className={`text-xs font-semibold uppercase tracking-wide ${escuro ? "text-lilac" : "text-plum"}`}>Contexto documental</p>
            <p className={`mt-2 text-sm leading-relaxed ${escuro ? "text-paper/90" : "text-ink/85"}`}>{f.contexto}</p>
            {f.versao ? (
              <p className={`mt-3 text-sm leading-relaxed ${escuro ? "text-paper/90" : "text-ink/85"}`}>
                <span className="font-semibold">A versão dela. </span>
                {f.versao.texto} ({f.versao.fonte}, {f.versao.data})
              </p>
            ) : null}
          </div>
          <p className={`text-xs leading-relaxed ${escuro ? "text-paper/75" : "text-ink/70"}`}>{posicionamento}</p>
          <a href={f.fonteUrl} className={`inline-flex min-h-11 items-center font-semibold underline underline-offset-4 ${escuro ? "text-paper" : "text-plum"}`}
             rel="noopener noreferrer" target="_blank">Fonte primária: {f.fonteRotulo} ↗</a>
        </div>
      </div>
    </article>
  );
}

function NaVozDelasPage() {
  const demaisRef = useRef<HTMLDetailsElement>(null);
  const key = (d: string) => d.split("/").reverse().join("");
  const pub = FALAS.filter((f) => f.publicar).sort((a, b) =>
    key(b.data).localeCompare(key(a.data)),
  );
  useEffect(() => {
    const abrirDestino = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (id && pub.slice(3).some((f) => f.id === id) && demaisRef.current) {
        demaisRef.current.open = true;
      }
    };
    abrirDestino();
    window.addEventListener("hashchange", abrirDestino);
    return () => window.removeEventListener("hashchange", abrirDestino);
  }, [pub.map((f) => f.id).join("|")]);

  return (
    <PageShell
      breadcrumb={[{ label: "Reportagens", to: "/reportagens" }, { label: "Na voz delas" }]}
    >
      <AberturaFalas publicadas={pub} />

      <div className="py-5">
        <details className="group border-b border-rule">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 py-3 text-sm font-semibold text-plum focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum [&::-webkit-details-marker]:hidden">
            <span>Como selecionamos e conferimos as falas</span>
            <span className="group-open:hidden" aria-hidden="true">Abrir +</span>
            <span className="hidden group-open:inline" aria-hidden="true">Recolher −</span>
          </summary>
          <div className="pb-5">
        <GapNote label="Como escolhemos">
          Começamos pelas dez deputadas que votaram contra a lei de igualdade salarial, em{" "}
          <Link to="/como-votaram" className="underline decoration-plum underline-offset-4">
            Como votaram
          </Link>
          , buscando nas transcrições oficiais de todos os discursos delas em plenário, de 2023 a
          2026, os termos feminismo, ideologia de gênero e igualdade salarial. Só entra fala com
          fonte primária localizada. Nenhuma das dez se declarou antifeminista em plenário; por isso
          o site não usa esse rótulo para elas. Cada fala aparece como foi dita, sem rótulo para a
          pessoa: é registro público, com data e link, e por isso sai sem pedido prévio de
          posicionamento (
          <Link to="/metodo" className="underline decoration-plum underline-offset-4">
            regra de 13/11/2026
          </Link>
          ). Quem é citada pode pedir correção ou resposta pelo contato@quemsaoelas.com.br.
        </GapNote>
          </div>
        </details>
      </div>

      <section id="falas" className="scroll-mt-24">
        <header className="py-7 md:py-9">
          <p className="text-xs font-semibold uppercase tracking-wide text-plum">As falas · Fontes primárias</p>
          <h2 className="mt-2 font-display text-3xl font-semibold leading-tight text-ink md:text-4xl">
            {pub.length} registros, da mais recente para a mais antiga
          </h2>
          <nav aria-label="Ir diretamente a uma declaração" className="mt-5 flex flex-wrap gap-2">
            {pub.map((f, i) => (
              <a key={f.id} href={`#${f.id}`}
                onClick={() => { if (i >= 3 && demaisRef.current) demaisRef.current.open = true; }}
                className="inline-flex min-h-10 items-center border border-rule bg-paper px-3 text-xs font-semibold text-ink hover:border-plum hover:text-plum">
                {f.pessoa} · {f.data}
              </a>
            ))}
          </nav>
        </header>
        {pub.slice(0, 3).map((f, i) => <FalaCard key={f.id} f={f} i={i} />)}
        {pub.length > 3 ? (
          <details ref={demaisRef} className="group border-y border-rule">
            <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-4 py-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum [&::-webkit-details-marker]:hidden">
              <span>
                <span className="block text-xs font-semibold uppercase tracking-wide text-plum">Arquivo da reportagem</span>
                <span className="mt-1 block font-display text-xl font-semibold text-ink md:text-2xl">
                  Consultar as outras {pub.length - 3} falas e seus documentos
                </span>
              </span>
              <span className="shrink-0 text-sm font-semibold text-plum">
                <span className="group-open:hidden">Abrir +</span>
                <span className="hidden group-open:inline">Recolher −</span>
              </span>
            </summary>
            <div>{pub.slice(3).map((f, i) => <FalaCard key={f.id} f={f} i={i + 3} />)}</div>
          </details>
        ) : null}
      </section>

      <ComoSabemos
        fonte="Câmara dos Deputados, Dados Abertos (transcrição dos discursos) e Diário da Câmara; Fórum Brasileiro de Segurança Pública, Anuário 2026"
        universo="Discursos em plenário das dez deputadas do recorte de Como votaram, de fevereiro de 2023 a outubro de 2026; falas de eleitas em 2026 em entrevistas gravadas, quando conferidas no original."
        base="Busca feita em 28/10/2026"
        calculo={
          <>
            Busca por termos nas transcrições oficiais. Script em
            scripts/investigacao/5_pdl3_e_discursos.py.
          </>
        }
        limites={[
          "Uma fala é um recorte: o contexto vem junto, e o link leva ao registro completo.",
          "Falas fora do plenário só entram depois de conferidas no áudio ou vídeo original.",
          "A lista cresce com novas falas e com as respostas das pessoas citadas.",
        ]}
      />
    </PageShell>
  );
}
