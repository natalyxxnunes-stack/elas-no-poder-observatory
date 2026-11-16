import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { TEMAS } from "@/data/temas";

/**
 * Dados (13/11/2026): a seção de consulta, separada da leitura.
 *
 * A leitura de cada assunto mora no tema (tese, provas, quem decide, lacunas).
 * As tabelas, filtros e exploradores ficam aqui, organizados pelo mesmo tema,
 * com os endereços de sempre. Nenhum número é calculado nesta página.
 */
const description =
  "As ferramentas de consulta do Quem são elas?: tabelas, filtros e exploradores de candidaturas, dinheiro, votos e eleitas em 2026, organizados por tema.";

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

const GERAIS = [
  { to: "/achados", label: "Achados", nota: "Um dado por vez, com endereço próprio e jeito pronto de citar" },
  { to: "/comparar", label: "Comparador", nota: "Partidos ou estados, lado a lado" },
  { to: "/historico", label: "A série desde 2014", nota: "Histórico por cargo e estado" },
  { to: "/eleitas", label: "Quem entrou", nota: "A ficha de cada eleita de 2026" },
  { to: "/calendario", label: "Calendário", nota: "Da urna à posse" },
  { to: "/downloads", label: "Baixar os dados", nota: "Planilhas e arquivos conferidos, com hash" },
  { to: "/metodo", label: "Método", nota: "Fontes, regras, recontagem e correções" },
];

function DadosPage() {
  return (
    <PageShell breadcrumb={[{ label: "Dados" }]}>
      <header className="relative left-1/2 -ml-[50vw] w-screen bg-[var(--art-gold)] text-ink">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-10 md:grid-cols-[.9fr_1.1fr] md:items-end md:gap-12 md:px-8 md:py-14">
          <div>
            <p className="text-[13px] font-semibold">Arquivo público · Ferramentas de consulta</p>
            <h1 className="mt-3 font-display text-[clamp(3rem,6vw,5.7rem)] leading-[1.01]">
              Dados para consultar
            </h1>
          </div>
          <p className="max-w-2xl text-base leading-relaxed md:pb-2">
            As tabelas, os filtros e os exploradores ficam aqui. Para ler a
            interpretação, as provas e o contexto de cada assunto, acesse o
            tema correspondente. Os números são conferidos nas bases de origem.
          </p>
        </div>
      </header>

      <section aria-labelledby="dados-por-tema" className="relative left-1/2 -ml-[50vw] w-screen">
        <h2 id="dados-por-tema" className="sr-only">Ferramentas organizadas pelos seis temas</h2>
        <div>
          {TEMAS.map((t, i) => (
            <section
              key={t.slug}
              aria-labelledby={`dados-tema-${t.slug}`}
              className="grid lg:grid-cols-[.38fr_.62fr]"
            >
              <div className={`min-w-0 px-5 py-8 text-paper md:px-8 md:py-10 lg:pl-[max(2rem,calc((100vw-80rem)/2))] ${i % 2 === 0 ? "bg-ink" : "bg-[var(--art-plum)]"}`}>
                <p className="font-mono text-[13px] text-[var(--art-gold)]">Tema {t.ordem}</p>
                <h3 id={`dados-tema-${t.slug}`} className="mt-3 font-display text-[clamp(1.9rem,3.3vw,3.1rem)] leading-tight">
                  {t.nome}
                </h3>
                <p className="mt-3 max-w-md font-display text-xl italic leading-snug text-paper/85">
                  {t.pergunta}
                </p>
                <a
                  href={`/temas/${t.slug}`}
                  className="mt-5 inline-flex min-h-11 items-center border-b border-paper/70 text-sm font-semibold text-paper underline-offset-4 hover:underline focus-visible:outline-2"
                >
                  Ler a apuração ↗
                </a>
              </div>
              <div className="min-w-0 bg-paper px-5 py-6 text-ink md:px-8 md:py-9 lg:pr-[max(2rem,calc((100vw-80rem)/2))]">
                <ul className="divide-y divide-rule border-y border-rule">
                  {t.paginas.map((p) => (
                    <li key={`${p.to}${p.hash ?? ""}`}>
                      <a
                        href={`${p.to}${p.hash ? `#${p.hash}` : ""}`}
                        className="group flex min-h-16 items-center justify-between gap-5 py-3 focus-visible:outline-2 focus-visible:outline-plum"
                      >
                        <span className="min-w-0">
                          <span className="block font-display text-xl text-ink group-hover:text-plum">{p.label}</span>
                          <span className="block text-[14px] leading-relaxed text-ink/80">{p.nota}</span>
                        </span>
                        <span aria-hidden="true" className="text-xl text-plum">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="relative left-1/2 -ml-[50vw] w-screen bg-plum-deep py-12 text-paper md:py-16"><div className="mx-auto max-w-7xl px-5 md:px-8">
        <h2 className="font-display text-3xl md:text-4xl">Para todos os temas</h2><p className="mt-2 text-[13px] text-paper/80">Ferramentas gerais · Consulta, arquivos e método</p>
        <ul className="mt-6 grid gap-x-10 md:grid-cols-2">
          {GERAIS.map((g) => (
            <li key={g.to}>
              <a
                href={g.to}
                className="flex min-h-14 items-center justify-between gap-4 border-b border-paper/25 py-3 hover:text-[var(--art-gold)] focus-visible:outline-2"
              >
                <span>
                  <span className="block font-display text-xl text-paper">{g.label}</span>
                  <span className="block text-[14px] text-paper/80">{g.nota}</span>
                </span>
                <span aria-hidden="true">→</span>
              </a>
            </li>
          ))}
        </ul>
        </div>
      </section>
    </PageShell>
  );
}
