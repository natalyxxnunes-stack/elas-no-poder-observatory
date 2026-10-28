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

function FalaCard({ f }: { f: Fala }) {
  return (
    <article className="border-t-2 border-ink bg-card p-5 sm:p-6">
      <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        {f.data} · {f.onde}
      </p>
      <h3 className="mt-2 font-display text-xl leading-snug text-ink">
        {f.pessoa} <span className="font-mono text-sm text-plum">{f.partido}</span>
      </h3>
      <p className="text-xs text-muted-foreground">{f.cargo}</p>
      <blockquote className="mt-4 border-l-4 border-coral pl-4 font-display text-lg leading-snug text-ink">
        “{f.fala}”
      </blockquote>
      <p className="mt-3 text-sm leading-relaxed text-ink/80">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          Contexto ·{" "}
        </span>
        {f.contexto}
      </p>
      {f.dado && (
        <div className="mt-3 bg-butter px-4 py-3">
          <p className="font-mono text-[11px] uppercase tracking-wider text-ink">O dado oficial</p>
          <p className="mt-1 text-sm leading-relaxed text-ink">{f.dado.texto}</p>
          <p className="mt-1 text-xs text-ink/70">{f.dado.fonte}</p>
        </div>
      )}
      {f.versao && (
        <p className="mt-3 text-sm leading-relaxed text-ink/80">
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            A versão dela ·{" "}
          </span>
          {f.versao.texto} ({f.versao.fonte}, {f.versao.data})
        </p>
      )}
      <p className="mt-3 text-sm leading-relaxed text-ink/80">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          Posicionamento ·{" "}
        </span>
        {f.posicionamento
          ? `${f.posicionamento.texto} (${f.posicionamento.data})`
          : FALAS_PEDIDO_ENVIADO_EM
            ? `Pedido enviado em ${FALAS_PEDIDO_ENVIADO_EM}; sem resposta até a última atualização.`
            : "Pedido de posicionamento em andamento; a resposta entra aqui com data."}
      </p>
      <a
        href={f.fonteUrl}
        className="mt-3 inline-block font-mono text-xs uppercase tracking-wider text-plum underline decoration-plum underline-offset-4"
        rel="noopener noreferrer"
        target="_blank"
      >
        Fonte: {f.fonteRotulo} →
      </a>
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
        <div className="grid gap-6 md:grid-cols-2">
          {pub.map((f) => (
            <FalaCard key={f.id} f={f} />
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
