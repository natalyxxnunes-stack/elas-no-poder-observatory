import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/editorial/PageHero";
import { SectionBlock } from "@/components/editorial/SectionBlock";
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

function FalaCard({ f, i }: { f: Fala; i: number }) {
  const posicionamento = f.posicionamento
    ? `${f.posicionamento.texto} (${f.posicionamento.data})`
    : FALAS_PEDIDO_ENVIADO_EM
      ? `Pedido enviado em ${FALAS_PEDIDO_ENVIADO_EM}; sem resposta até a última atualização`
      : "Aguardando resposta";
  return (
    <article className={`relative left-1/2 -ml-[50vw] w-screen ${i % 2 === 0 ? "bg-cream" : "bg-lilac/60"}`}>
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:px-8 md:py-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="font-mono text-[13px] uppercase tracking-[0.1em] text-muted-foreground">
            {f.data} · {f.onde}
          </p>
          <blockquote className="relative mt-5 border-l-4 border-plum pl-5 md:pl-7">
            <span aria-hidden="true" className="pointer-events-none absolute -left-1 -top-10 select-none font-display text-[6rem] leading-none text-plum/20">
              “
            </span>
            <p className="font-display text-2xl leading-snug text-ink md:text-3xl">{f.fala}</p>
          </blockquote>
          <p className="mt-5 pl-6 md:pl-8">
            <span className="font-display text-xl text-ink">{f.pessoa}</span>{" "}
            <span className="font-mono text-[15px] text-plum">{f.partido}</span>
            <span className="block text-[13px] text-muted-foreground">{f.cargo}</span>
          </p>
        </div>
        <div className="space-y-4 lg:col-span-5 lg:pt-10">
          {f.dado && (
            <div className="bg-butter px-5 py-4">
              <p className="text-[13px] font-semibold text-ink">O dado oficial</p>
              <p className="mt-1 text-[15px] leading-relaxed text-ink">{f.dado.texto}</p>
              <p className="mt-1 text-[13px] text-ink/70">{f.dado.fonte}</p>
            </div>
          )}
          <p className="text-[15px] leading-relaxed text-ink/85">
            <span className="font-semibold text-ink">Contexto. </span>
            {f.contexto}
          </p>
          {f.versao && (
            <p className="text-[15px] leading-relaxed text-ink/85">
              <span className="font-semibold text-ink">A versão dela. </span>
              {f.versao.texto} ({f.versao.fonte}, {f.versao.data})
            </p>
          )}
          <p className="inline-block border border-ink/40 px-2 py-1 text-[13px] text-ink/80">
            Posicionamento: {posicionamento}
          </p>
          <a
            href={f.fonteUrl}
            className="flex min-h-11 items-center font-medium text-plum underline decoration-plum underline-offset-4"
            rel="noopener noreferrer"
            target="_blank"
          >
            Fonte: {f.fonteRotulo} →
          </a>
        </div>
      </div>
    </article>
  );
}

function NaVozDelasPage() {
  const key = (d: string) => d.split("/").reverse().join("");
  const pub = FALAS.filter((f) => f.publicar).sort((a, b) =>
    key(b.data).localeCompare(key(a.data)),
  );
  return (
    <PageShell
      breadcrumb={[{ label: "Reportagens", to: "/reportagens" }, { label: "Na voz delas" }]}
    >
      <PageHero
        kicker="Na voz delas"
        question="O que as eleitas dizem sobre mulheres, com data, fonte e o dado oficial ao lado"
        lead={
          <p>
            Falas públicas de deputadas e eleitas sobre feminismo, direitos e violência contra
            mulheres. Cada uma vem entre aspas, com a data, o lugar e o link para o registro
            original. Quando a fala afirma um fato, o dado oficial vai ao lado. Quando a pessoa
            explicou a fala depois, a versão dela entra também.
          </p>
        }
      />

      <div className="pb-6">
        <GapNote label="Como escolhemos">
          Começamos pelas dez deputadas que votaram contra a lei de igualdade salarial, em{" "}
          <Link to="/como-votaram" className="underline decoration-plum underline-offset-4">
            Como votaram
          </Link>
          , buscando nas transcrições oficiais de todos os discursos delas em plenário, de 2023 a
          2026, os termos feminismo, ideologia de gênero e igualdade salarial. Só entra fala com
          fonte primária localizada. Nenhuma das dez se declarou antifeminista em plenário; por isso
          o site não usa esse rótulo para elas.
        </GapNote>
      </div>

      <SectionBlock
        id="falas"
        kicker="As falas"
        question={`${pub.length} falas, da mais recente para a mais antiga`}
        align="wide"
      >
        <div>
          {pub.map((f, i) => (
            <FalaCard key={f.id} f={f} i={i} />
          ))}
        </div>
      </SectionBlock>

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
