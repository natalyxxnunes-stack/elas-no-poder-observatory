import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { TEMAS } from "@/data/temas";
import { CapturaPortalDados } from "@/components/editorial/EvidenciasGrafadas2026";

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
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-12 md:px-8 md:py-16 lg:grid-cols-[.95fr_1.05fr] lg:items-end lg:gap-12">
          <div>
            <p className="text-[13px] font-semibold">Arquivo público · Ferramentas de consulta</p>
            <h1 className="mt-4 font-display text-[clamp(3.3rem,6.2vw,6rem)] leading-[.99]">Dados para consultar</h1>
          </div>
          <div>
            <p className="max-w-xl text-lg leading-relaxed">
              As tabelas, os filtros e os exploradores do observatório, reunidos por assunto.
              Aqui você consulta as bases. A interpretação jornalística fica nas páginas dos temas,
              com seus argumentos, fontes e limites.
            </p>
            <a href="#indice-ferramentas" className="mt-6 inline-flex min-h-11 items-center border-b-2 border-ink font-semibold text-ink focus-visible:outline-2 focus-visible:outline-offset-4">
              Encontrar uma ferramenta <span className="ml-3" aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </header>

      <section aria-labelledby="dados-rotas-titulo" className="relative left-1/2 -ml-[50vw] w-screen bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-5 py-9 md:px-8 md:py-12">
          <h2 id="dados-rotas-titulo" className="font-display text-2xl md:text-3xl">Três portas para a informação</h2>
          <div className="mt-6 grid gap-x-10 gap-y-7 border-t border-paper/25 pt-6 md:grid-cols-3">
            <div>
              <p className="font-mono text-[13px] text-[var(--art-gold)]">01 · Ler</p>
              <p className="mt-2 text-[15px] leading-relaxed text-paper/90">Abra a apuração de cada tema para entender o contexto e a interpretação dos números.</p>
              <a href="#indice-ferramentas" className="mt-3 inline-flex min-h-10 font-semibold text-paper underline underline-offset-4">Navegar pelos temas ↗</a>
            </div>
            <div>
              <p className="font-mono text-[13px] text-[var(--art-gold)]">02 · Comparar</p>
              <p className="mt-2 text-[15px] leading-relaxed text-paper/90">Escolha partidos ou estados e veja proporções, contagens e fundos declarados no mesmo recorte.</p>
              <a href="/comparar" className="mt-3 inline-flex min-h-10 font-semibold text-paper underline underline-offset-4">Abrir o comparador ↗</a>
            </div>
            <div>
              <p className="font-mono text-[13px] text-[var(--art-gold)]">03 · Verificar</p>
              <p className="mt-2 text-[15px] leading-relaxed text-paper/90">Baixe as bases e consulte a metodologia, as datas de corte e os registros de correção.</p>
              <a href="/downloads" className="mt-3 inline-flex min-h-10 font-semibold text-paper underline underline-offset-4">Acessar arquivos abertos ↗</a>
            </div>
          </div>
        </div>
      </section>

      <nav id="indice-ferramentas" aria-label="Índice dos seis assuntos de dados" className="scroll-mt-24 py-7">
        <p className="text-[13px] font-semibold text-plum">A consulta por assunto</p>
        <ol className="mt-3 flex flex-wrap gap-x-7 gap-y-3">
          {TEMAS.map((t) => (
            <li key={t.slug}>
              <a href={"#dados-tema-" + t.slug} className="inline-flex min-h-10 items-center gap-2 font-semibold text-ink underline-offset-4 hover:text-plum hover:underline focus-visible:outline-2 focus-visible:outline-offset-2">
                <span className="font-mono text-coral-ink">{t.ordem}</span>{t.nome}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="relative left-1/2 -ml-[50vw] w-screen">
        {TEMAS.map((t, i) => {
          const evidencia = i === 0 || i === 4;
          const temaFundo = i === 4 ? "bg-[#c53f22]" : i % 2 === 0 ? "bg-ink" : "bg-[var(--art-plum)]";
          const inverter = !evidencia && i % 2 === 1;
          return (
            <section
              key={t.slug}
              id={"dados-tema-" + t.slug}
              aria-labelledby={"dados-titulo-" + t.slug}
              className={"scroll-mt-24 grid " + (evidencia ? "lg:grid-cols-[.53fr_.47fr]" : "lg:grid-cols-[.42fr_.58fr]")}
            >
              <div className={"min-w-0 px-5 py-9 text-paper md:px-8 md:py-12 lg:pl-[max(2rem,calc((100vw-80rem)/2))] " + (inverter ? "lg:order-2 lg:pl-12 lg:pr-[max(2rem,calc((100vw-80rem)/2))] " : "lg:pr-12 ") + temaFundo}>
                <p className="font-mono text-[13px] text-paper">Caderno {t.ordem} · {t.pergunta}</p>
                <h2 id={"dados-titulo-" + t.slug} className={"mt-4 font-display leading-tight " + (evidencia ? "text-[clamp(2.8rem,4.5vw,4.6rem)]" : "text-[clamp(2.25rem,3.3vw,3.4rem)]")}>
                  {t.nome}
                </h2>
                <p className="mt-5 max-w-lg font-display text-xl leading-snug text-paper">{t.linha}</p>
                <a
                  href={"/temas/" + t.slug}
                  className="mt-6 inline-flex min-h-11 items-center border-b-2 border-paper text-sm font-semibold text-paper focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  Ler a apuração e seus limites ↗
                </a>
              </div>
              <div className={"min-w-0 bg-paper px-5 py-9 text-ink md:px-8 md:py-12 " + (inverter ? "lg:order-1 lg:pl-[max(2rem,calc((100vw-80rem)/2))] lg:pr-12" : "lg:pr-[max(2rem,calc((100vw-80rem)/2))] lg:pl-12")}>
                <p className="text-[13px] font-semibold text-plum">Ferramentas disponíveis · {t.paginas.length} {t.paginas.length === 1 ? "acesso" : "acessos"}</p>
                <ul className="mt-4 divide-y divide-rule border-y border-rule">
                  {t.paginas.map((p) => (
                    <li key={p.to + (p.hash ?? "")}>
                      <a
                        href={p.to + (p.hash ? "#" + p.hash : "")}
                        className="group flex min-h-16 items-center justify-between gap-5 py-4 focus-visible:outline-2 focus-visible:outline-plum"
                      >
                        <span className="min-w-0">
                          <span className="block font-display text-xl leading-tight text-ink group-hover:text-plum">{p.label}</span>
                          <span className="mt-1 block text-[14px] leading-relaxed text-ink/80">{p.nota}</span>
                        </span>
                        <span aria-hidden="true" className="text-xl text-plum">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
                {i === 0 && (
                  <p className="mt-5 max-w-lg text-[13px] leading-relaxed text-ink/75">
                    Candidatura, eleição e exercício do mandato são situações distintas. Consulte os denominadores e as datas de cada ferramenta.
                  </p>
                )}
                {i === 4 && (
                  <p className="mt-5 max-w-lg text-[13px] leading-relaxed text-ink/75">
                    Processos, representações e decisões judiciais têm naturezas diferentes; cada fonte precisa ser lida no seu contexto.
                  </p>
                )}
              </div>
            </section>
          );
        })}
      </div>

      <section aria-labelledby="dados-origem-titulo" className="relative left-1/2 -ml-[50vw] w-screen bg-[var(--art-gold)] text-ink">
        <div className="mx-auto grid max-w-7xl gap-7 px-5 py-10 md:grid-cols-[.72fr_1.28fr] md:px-8 md:py-14">
          <div>
            <p className="text-[13px] font-semibold">Documento de origem · Transparência</p>
            <h2 id="dados-origem-titulo" className="mt-3 font-display text-3xl leading-tight md:text-4xl">A consulta começa nas fontes</h2>
            <CapturaPortalDados />
          </div>
          <div>
            <p className="max-w-2xl text-[15px] leading-relaxed">
              Os arquivos eleitorais, as fichas e os registros parlamentares têm períodos de atualização próprios.
              A relação pública de bases do observatório apresenta proveniência, recortes e arquivos para baixar.
              Nenhum número é recalculado nesta página de índice.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
              <a href="https://dadosabertos.tse.jus.br/dataset/candidatos-2026" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center font-semibold text-ink underline underline-offset-4">TSE · Candidatos 2026 ↗</a>
              <a href="/downloads" className="inline-flex min-h-11 items-center font-semibold text-ink underline underline-offset-4">Base pública do observatório ↗</a>
              <a href="/metodo" className="inline-flex min-h-11 items-center font-semibold text-ink underline underline-offset-4">Método e correções ↗</a>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="dados-gerais-titulo" className="relative left-1/2 -ml-[50vw] w-screen bg-plum-deep text-paper">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <p className="text-[13px] font-semibold text-[var(--art-gold)]">Além das seis editorias</p>
          <h2 id="dados-gerais-titulo" className="mt-3 font-display text-3xl md:text-4xl">Para todos os temas</h2>
          <p className="mt-3 max-w-2xl text-[14px] text-paper/85">Índices, séries, fichas, calendário, downloads e métodos para consultar a investigação de outros ângulos.</p>
          <ul className="mt-7 grid gap-x-12 md:grid-cols-2">
            {GERAIS.map((g) => (
              <li key={g.to}>
                <a href={g.to} className="flex min-h-16 items-center justify-between gap-4 border-b border-paper/25 py-4 hover:text-[var(--art-gold)] focus-visible:outline-2">
                  <span>
                    <span className="block font-display text-xl text-paper">{g.label}</span>
                    <span className="mt-1 block text-[14px] text-paper/85">{g.nota}</span>
                  </span>
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
