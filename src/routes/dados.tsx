import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { TEMAS } from "@/data/temas";

/**
 * Dados — ponto de entrada para as ferramentas reais do observatório.
 * A orientação por pergunta complementa o índice por tema.
 * Sem cartões ilustrativos, imagens sintéticas ou números decorativos.
 */
const description =
  "Explore os dados do Quem são elas?: consulte candidaturas e eleitas, compare partidos e estados e encontre bases, fontes e metodologia de 2026.";

export const Route = createFileRoute("/dados")({
  head: () => ({
    meta: [
      { title: "Dados para consultar | Quem são elas?" },
      { name: "description", content: description },
      { property: "og:title", content: "Dados para consultar" },
      { property: "og:description", content: description },
    ],
  }),
  component: DadosPage,
});

const ENTRADAS = [
  {
    to: "/quem-sao-elas",
    rotulo: "Candidaturas",
    pergunta: "Quem se candidatou?",
    descricao: "Explore candidatas por cargo, estado e cor/raça declarada ao TSE.",
  },
  {
    to: "/eleitas",
    rotulo: "Resultado",
    pergunta: "Quem foi eleita?",
    descricao: "Encontre as fichas das mulheres eleitas em 2026 e seus recortes.",
  },
  {
    to: "/comparar",
    rotulo: "Comparações",
    pergunta: "O que muda entre partidos e estados?",
    descricao: "Coloque resultados eleitorais e distribuição de recursos lado a lado.",
  },
] as const;

const APOIO = [
  {
    to: "/achados",
    titulo: "Achados",
    descricao: "Resultados curtos com fonte, data e endereço próprio.",
  },
  {
    to: "/historico",
    titulo: "Série histórica",
    descricao: "Compare as eleições de 2026 com os ciclos anteriores.",
  },
  {
    to: "/calendario",
    titulo: "Calendário",
    descricao: "Consulte os marcos entre a eleição e a posse.",
  },
  {
    to: "/downloads",
    titulo: "Arquivos e materiais",
    descricao: "Acesse bases, planilhas e materiais disponíveis.",
  },
  {
    to: "/metodo",
    titulo: "Método e fontes",
    descricao: "Confira as extrações, os universos e como os números são calculados.",
  },
] as const;

function DadosPage() {
  return (
    <PageShell breadcrumb={[{ label: "Dados" }]}>
      <header className="py-11 md:py-16">
        <p className="text-[13px] font-semibold text-plum">Dados abertos · eleições de 2026</p>
        <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.8rem,5.2vw,5rem)] leading-[1.02] text-ink">
          Dados para consultar
        </h1>
        <p className="mt-5 max-w-[67ch] text-lg leading-relaxed text-ink/80">
          Procure candidaturas, resultados, partidos e estados nas ferramentas do observatório.
          Cada análise informa suas fontes e seu recorte. Para ler as investigações e o contexto
          dos dados, acompanhe os temas.
        </p>
      </header>

      <section
        aria-labelledby="dados-entradas"
        className="relative left-1/2 -ml-[50vw] w-screen bg-plum-deep text-paper"
      >
        <div className="mx-auto grid max-w-7xl gap-7 px-5 py-10 md:px-8 md:py-12 lg:grid-cols-[.65fr_1.7fr] lg:gap-12">
          <div>
            <p className="text-[13px] font-semibold text-lilac">Acesso direto</p>
            <h2 id="dados-entradas" className="mt-3 max-w-sm font-display text-3xl leading-tight md:text-4xl">
              Por onde começar?
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-paper/80">
              Três caminhos para explorar registros já publicados.
            </p>
          </div>
          <ol className="grid border-t border-paper/30 md:grid-cols-3 md:border-t-0">
            {ENTRADAS.map((item, index) => (
              <li
                key={item.to}
                className="border-b border-paper/30 py-5 md:border-b-0 md:border-l md:px-5 md:py-1"
              >
                <a href={item.to} className="group block min-h-36 focus-visible:outline-2">
                  <span className="font-mono text-[13px] text-lilac">
                    {String(index + 1).padStart(2, "0")} · {item.rotulo}
                  </span>
                  <span className="mt-3 block font-display text-[1.5rem] leading-[1.15] text-paper group-hover:underline group-hover:underline-offset-4">
                    {item.pergunta}
                  </span>
                  <span className="mt-3 block max-w-[34ch] text-sm leading-relaxed text-paper/80">
                    {item.descricao}
                  </span>
                  <span className="mt-4 inline-block text-sm font-semibold text-paper" aria-hidden="true">
                    Consultar ↗
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="dados-por-tema" className="py-14 md:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-[13px] font-semibold text-plum">Acervo de consulta</p>
            <h2 id="dados-por-tema" className="mt-2 font-display text-3xl leading-tight text-ink md:text-4xl">
              Explore por tema
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink/70">
            Os seis temas organizam as investigações. Aqui estão seus caminhos de consulta e as ferramentas correspondentes.
          </p>
        </div>

        <ol className="border-t border-ink">
          {TEMAS.map((tema) => (
            <li key={tema.slug} className="border-b border-rule">
              <section
                aria-labelledby={`dados-tema-${tema.slug}`}
                className="grid gap-x-8 gap-y-4 py-7 md:grid-cols-[3.25rem_15rem_minmax(0,1fr)] md:py-9"
              >
                <span className="font-mono text-[13px] font-semibold text-coral-ink" aria-hidden="true">
                  {tema.ordem}
                </span>
                <div>
                  <h3 id={`dados-tema-${tema.slug}`} className="font-display text-2xl leading-tight text-ink md:text-3xl">
                    <a
                      href={`/temas/${tema.slug}`}
                      className="hover:text-plum hover:underline hover:underline-offset-4"
                    >
                      {tema.nome}
                    </a>
                  </h3>
                  <p className="mt-2 font-display text-base italic leading-snug text-plum">
                    {tema.pergunta}
                  </p>
                </div>
                <div>
                  <p className="max-w-3xl text-sm leading-relaxed text-ink/75">
                    {tema.linha}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
                    {tema.paginas.map((pagina) => (
                      <li key={`${pagina.to}${pagina.hash ?? ""}`}>
                        <a
                          href={`${pagina.to}${pagina.hash ? `#${pagina.hash}` : ""}`}
                          title={pagina.nota}
                          className="inline-flex min-h-10 items-center gap-1 text-[15px] font-semibold text-plum underline-offset-4 hover:underline"
                        >
                          {pagina.label} <span aria-hidden="true">↗</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="dados-verificar" className="border-t border-ink pb-16 pt-11 md:pb-20 md:pt-14">
        <div className="grid gap-8 md:grid-cols-[.75fr_1.65fr] md:gap-14">
          <div>
            <p className="text-[13px] font-semibold text-plum">Verificação e reuso</p>
            <h2 id="dados-verificar" className="mt-2 font-display text-3xl leading-tight text-ink">
              Continue a pesquisa
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/75">
              Consulte os resultados já apurados, recupere os arquivos e confira os critérios usados em cada levantamento.
            </p>
          </div>
          <ul className="grid gap-x-10 sm:grid-cols-2">
            {APOIO.map((item) => (
              <li key={item.to} className="border-b border-rule">
                <a
                  href={item.to}
                  className="group flex min-h-24 flex-col justify-center py-4 focus-visible:outline-2"
                >
                  <span className="font-display text-xl leading-tight text-ink group-hover:text-plum group-hover:underline group-hover:underline-offset-4">
                    {item.titulo}
                  </span>
                  <span className="mt-2 text-sm leading-snug text-ink/75">
                    {item.descricao}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
