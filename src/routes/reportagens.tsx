import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PROXIMAS, REPORTAGENS, REPORTAGENS_REGRA } from "@/data/reportagens";
import { PERFIS_PIONEIRAS } from "@/data/perfis-pioneiras";
import { VOTACOES, VOTACOES_META } from "@/data/votacoes-camara";
import { FALAS } from "@/data/falas";
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
        content: "Apuração assinada sobre mulheres, eleições e poder, com critério e fonte declarados.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReportagensPage,
});

const DESTAQUE = REPORTAGENS.find((r) => r.to === "/como-votaram");
const FALAS_REPORTAGEM = REPORTAGENS.find((r) => r.to === "/na-voz-delas");


/**
 * As referências são metadados reais de falas com publicação autorizada no
 * próprio projeto. Não são imagens do Diário e não imitam fac-símiles.
 */
const FONTES_DOCUMENTAIS = FALAS
  .filter((fala) => fala.publicar && fala.fonteRotulo.startsWith("Diário da Câmara"))
  .sort((a, b) => {
    const iso = (valor: string) => valor.split("/").reverse().join("-");
    return iso(b.data).localeCompare(iso(a.data));
  })
  .slice(0, 3);

/** 
 * Recorte gráfico da reportagem: os votos de deputadas que estavam em exercício
 * nas seis votações nominais selecionadas (2023–2025).
 * "Sim" e "Não" referem-se ao texto submetido em cada votação: não são
 * classificados como voto favorável/contrário a direitos das mulheres.
 */
function PlacarSeisVotacoes() {
  const totalVotacoes = VOTACOES.length;
  return (
    <figure
      aria-label="Visualização documental dos votos de deputadas nas seis votações"
      className="min-w-0 bg-ink p-5 text-paper md:p-7 lg:p-9"
    >
      <figcaption className="flex flex-wrap items-end justify-between gap-5 border-b border-paper/25 pb-5">
        <div>
          <p className="text-[13px] font-semibold text-[var(--art-gold)]">
            Câmara dos Deputados · Dados oficiais
          </p>
          <h3 className="mt-2 max-w-lg font-display text-2xl leading-tight md:text-3xl">
            O voto das deputadas, em seis decisões
          </h3>
        </div>
        <span className="font-display text-[clamp(3.5rem,6vw,5rem)] leading-none tabular-nums text-[var(--art-gold)]" aria-label={`${totalVotacoes} votações`}>
          {totalVotacoes.toString().padStart(2, "0")}
        </span>
      </figcaption>
      <div aria-label="Legenda da visualização" className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[13px]">
        <span className="inline-flex items-center gap-2"><span className="h-3 w-3 bg-[var(--art-violet)]" />Sim</span>
        <span className="inline-flex items-center gap-2"><span className="h-3 w-3 bg-[var(--art-coral)]" />Não</span>
        <span className="inline-flex items-center gap-2"><span className="h-3 w-3 bg-paper/35" />Ausências e outros registros</span>
      </div>
      <ol className="mt-5 grid gap-x-9 border-t border-paper/20 md:grid-cols-2">
        {VOTACOES.map((v) => {
          const base = v.porSexo.F.total;
          const sim = v.porSexo.F.votos["Sim"] ?? 0;
          const nao = v.porSexo.F.votos["Não"] ?? 0;
          const demais = base - sim - nao;
          const largura = (n: number) => `${(n / base) * 100}%`;
          return (
            <li key={v.id} className="min-w-0 border-b border-paper/20 py-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className="max-w-[30ch] text-[14px] font-semibold leading-snug">
                  {v.titulo}
                </span>
                <span className="shrink-0 font-mono text-[12px] tabular-nums text-paper/70">
                  {formatDateBR(v.data)}
                </span>
              </div>
              <div
                role="img"
                aria-label={`${v.titulo}, ${formatDateBR(v.data)}: ${sim} votos Sim, ${nao} votos Não, ${demais} ausências e outros registros, de ${base} deputadas em exercício`}
                className="mt-2.5 flex h-3 w-full overflow-hidden bg-paper/20"
              >
                <span className="h-full bg-[var(--art-violet)]" style={{ width: largura(sim) }} />
                <span className="h-full bg-[var(--art-coral)]" style={{ width: largura(nao) }} />
                <span className="h-full bg-paper/35" style={{ width: largura(demais) }} />
              </div>
              <p className="mt-1.5 font-mono text-[11px] leading-relaxed text-paper/80">
                {sim} Sim · {nao} Não · {demais} outros/ausentes · {base} em exercício
              </p>
            </li>
          );
        })}
      </ol>
      <p className="mt-4 text-[12px] leading-relaxed text-paper/70">
        Fonte: Câmara dos Deputados, Dados Abertos, votação nominal e
        deputadas em exercício. Coleta em {VOTACOES_META.coletaEm}.
        Contagens reprocessadas pela investigação. A categoria residual
        inclui ausências, abstenções e outros registros. “Sim” e “Não”
        referem-se ao texto votado e não indicam, isoladamente, posição
        favorável ou contrária aos direitos das mulheres.
      </p>
    </figure>
  );
}

function ReportagensPage() {
  return (
    <PageShell breadcrumb={[{ label: "Reportagens" }]}>
      <header className="pb-7 pt-6 md:pb-8 md:pt-9">
        <div className="grid items-end gap-4 md:grid-cols-[.9fr_1.1fr] md:gap-10">
          <div>
            <p className="text-[13px] font-semibold text-plum">Jornalismo de dados · Edição 2026</p>
            <h1 className="mt-2 font-display text-[clamp(2.8rem,5.2vw,5.1rem)] leading-[1.02] text-ink">
              Reportagens
            </h1>
          </div>
          <p className="max-w-xl border-l-4 border-[var(--art-coral)] pl-5 text-[15px] leading-relaxed text-ink/80">
            Apuração assinada, com a conta aberta. As histórias reúnem
            documentos, critérios e fontes que podem ser conferidos.
          </p>
        </div>
      </header>

      {/*
        Alternativa editorial em avaliação: em vez de duas colunas gêmeas
        (manchete/gráfico), a reportagem entra como manchete transversal,
        seguida de uma figura documental de largura total.
      */}
      <section
        aria-labelledby="reportagem-destaque"
        className="relative left-1/2 -ml-[50vw] w-screen bg-[var(--art-plum)] text-paper"
      >
        <article className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14 lg:py-16">
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
            <p className="text-[13px] font-semibold text-[var(--art-gold)]">
              Reportagem em destaque · Câmara dos Deputados
            </p>
            <p className="font-mono text-[13px] text-paper/80">
              Dados de seis votações nominais
            </p>
          </div>
          <h2
            id="reportagem-destaque"
            className="mt-5 max-w-6xl font-display text-[clamp(2.8rem,6.1vw,6rem)] leading-[1.04]"
          >
            {DESTAQUE?.titulo ?? "Como votaram as deputadas, e quem voltou"}
          </h2>
          <div className="mt-6 grid items-end gap-x-12 gap-y-5 border-t border-paper/35 pt-6 md:grid-cols-[1.4fr_.6fr]">
            <p className="max-w-2xl text-[16px] leading-relaxed text-paper/90">
              {DESTAQUE?.linhaFina}
            </p>
            <div className="md:text-right">
              <Link
                to="/como-votaram"
                className="inline-flex min-h-11 items-center border-b-2 border-[var(--art-gold)] text-sm font-semibold text-paper"
              >
                Ler a investigação completa <span className="ml-3" aria-hidden="true">↗</span>
              </Link>
              {DESTAQUE && (
                <p className="mt-4 text-[13px] text-paper/75">
                  {DESTAQUE.autora} · {formatDateBR(DESTAQUE.data)}
                </p>
              )}
            </div>
          </div>
        </article>
        <div className="bg-ink">
          <div className="mx-auto max-w-7xl px-5 pb-10 md:px-8 md:pb-14">
            <PlacarSeisVotacoes />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="reportagem-falas"
        className="relative left-1/2 -ml-[50vw] w-screen"
      >
        <div className="grid lg:grid-cols-2">
          <article className="bg-[var(--art-coral)] px-5 py-10 text-ink md:px-8 md:py-12 lg:pl-[max(2rem,calc((100vw-80rem)/2))] lg:pr-12">
            <p className="text-[13px] font-semibold text-plum">Falas públicas · Apuração</p>
            <h2 id="reportagem-falas" className="mt-4 font-display text-[clamp(2.3rem,4vw,4rem)] leading-tight text-plum-deep">
              {FALAS_REPORTAGEM?.titulo ?? "Na voz delas"}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/85">
              {FALAS_REPORTAGEM?.linhaFina}
            </p>
            <Link
              to="/na-voz-delas"
              className="mt-6 inline-flex min-h-11 items-center font-semibold text-plum underline underline-offset-4"
            >
              Ler a reportagem ↗
            </Link>
            {FALAS_REPORTAGEM && (
              <p className="mt-5 text-[13px] text-ink/70">
                {FALAS_REPORTAGEM.autora} · {formatDateBR(FALAS_REPORTAGEM.data)}
              </p>
            )}
          </article>
          <aside className="bg-ink px-5 py-10 text-paper md:px-8 md:py-12 lg:pl-10 lg:pr-[max(2rem,calc((100vw-80rem)/2))]">
            <p className="text-[13px] font-semibold text-[var(--art-gold)]">Fontes documentais</p>
            <h3 className="mt-3 font-display text-2xl leading-tight md:text-3xl">
              Registros da Câmara
            </h3>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-paper/80">
              Referências oficiais citadas na apuração. Esta relação é textual,
              não uma reprodução dos documentos originais.
            </p>
            <ol className="mt-5 divide-y divide-paper/25 border-y border-paper/25">
              {FONTES_DOCUMENTAIS.map((fala) => (
                <li key={fala.id} className="py-4">
                  <p className="text-sm font-semibold text-paper">{fala.pessoa} · {fala.data}</p>
                  <a
                    href={fala.fonteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex min-h-9 items-center text-[13px] leading-snug text-[var(--art-gold)] underline underline-offset-4"
                  >
                    {fala.fonteRotulo} ↗
                  </a>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      <section
        aria-labelledby="reportagem-colecao"
        className="relative left-1/2 -ml-[50vw] w-screen bg-[var(--art-plum)] text-paper"
      >
        <div className="mx-auto grid gap-6 px-5 py-10 md:px-8 md:py-12 lg:max-w-7xl lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-[13px] font-semibold text-[var(--art-gold)]">Coleção · Investigação continuada</p>
            <h2 id="reportagem-colecao" className="mt-3 font-display text-3xl leading-tight md:text-4xl">
              A agenda antigênero no poder
            </h2>
          </div>
          <div>
            <p className="max-w-2xl text-base leading-relaxed text-paper/90">
              Votos, mandatos e declarações públicas reunidos numa coleção com
              documentação, contextos e fontes primárias.
            </p>
            <Link
              to="/colecoes/antigenero-no-poder"
              className="mt-5 inline-flex min-h-11 items-center font-semibold text-paper underline underline-offset-4"
            >
              Explorar a coleção ↗
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-10 py-11 md:grid-cols-[1fr_1fr] md:gap-16 md:py-14">
        <div>
          <h2 className="font-display text-3xl leading-tight text-ink">Perfis · Pioneiras</h2>
          <ul className="mt-5 divide-y divide-rule border-y border-rule">
            {PERFIS_PIONEIRAS.filter((p) => p.to).map((p) => (
              <li key={p.id} className="py-4">
                <Link to={p.to!} className="font-display text-xl text-plum hover:underline hover:underline-offset-4">
                  {p.name}
                </Link>
                <p className="mt-1 font-mono text-[13px] text-ink/70">{p.years}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-3xl leading-tight text-ink">Na próxima edição</h2>
          <ul className="mt-5 divide-y divide-rule border-y border-rule">
            {PROXIMAS.map((p) => (
              <li key={p.data} className="py-4">
                <p className="font-mono text-[13px] text-ink/70">{formatDateBR(p.data)} · {p.nota}</p>
                <p className="mt-2 font-display text-xl leading-snug text-ink">{p.titulo}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <p className="border-t border-rule pb-9 pt-5 text-[13px] leading-relaxed text-ink/75">
        {REPORTAGENS_REGRA}
      </p>
    </PageShell>
  );
}
