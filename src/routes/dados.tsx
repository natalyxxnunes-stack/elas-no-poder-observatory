import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Secao } from "@/components/editorial/Secao";
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
      <header className="py-12 md:py-16">
        <h1 className="font-display text-5xl leading-[0.98] text-ink md:text-7xl">Dados para consultar</h1>
        <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-ink/80">
          Aqui ficam as tabelas, os filtros e os exploradores, para quem quer procurar o próprio
          estado, partido ou cargo. A leitura de cada assunto, com a tese, as provas e quem decide,
          está no tema.
        </p>
      </header>

      <div className="grid gap-px bg-rule md:grid-cols-2 xl:grid-cols-3">
        {TEMAS.map((t) => (
          <section key={t.slug} className="bg-paper p-6 md:p-8">
            <p className="font-mono text-[13px] text-coral-ink">Tema {t.ordem}</p>
            <h2 className="mt-2 font-display text-3xl text-ink">{t.nome}</h2>
            <a
              href={`/temas/${t.slug}`}
              className="mt-1 inline-flex min-h-11 items-center text-[15px] font-semibold text-plum underline decoration-plum underline-offset-4"
            >
              Ler o tema: {t.pergunta} →
            </a>
            <ul className="mt-3">
              {t.paginas.map((p) => (
                <li key={`${p.to}${p.hash ?? ""}`}>
                  <a
                    href={`${p.to}${p.hash ? `#${p.hash}` : ""}`}
                    className="flex min-h-14 items-center justify-between gap-4 border-t border-rule py-3 hover:text-plum"
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
          </section>
        ))}
      </div>

      <section className="py-12 md:py-16">
        <Secao nome="Para todos os temas" tipo="ferramentas gerais" />
        <ul className="mt-6 grid gap-x-10 md:grid-cols-2">
          {GERAIS.map((g) => (
            <li key={g.to}>
              <a
                href={g.to}
                className="flex min-h-14 items-center justify-between gap-4 border-b border-rule py-3 hover:text-plum"
              >
                <span>
                  <span className="block font-display text-xl text-ink">{g.label}</span>
                  <span className="block text-[14px] text-ink/70">{g.nota}</span>
                </span>
                <span aria-hidden="true">→</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
