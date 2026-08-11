import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CycleStrip } from "@/components/CycleStrip";
import { GapNote } from "@/components/GapNote";
import {
  CURRENT_INDICATORS,
  DATA_STATUS,
  FUNNEL_STEPS,
  METHOD_NOTES,
  RACE_BY_POWER_LEVEL,
  RACE_INDICATORS,
  TSE_SOURCE,
  formatPercent,
  formatPoints,
  formatRatio,
} from "@/data/election-2026";

export const Route = createFileRoute("/metodo")({
  head: () => ({
    meta: [
      { title: "Método — Quem são elas? | Fonte, fórmulas e lacunas" },
      {
        name: "description",
        content:
          "Como o observatório calcula cada indicador de 2026: fonte oficial do TSE, universos, numeradores, denominadores, fórmulas, status de validação e lacunas declaradas.",
      },
      { property: "og:title", content: "Método — Quem são elas?" },
      {
        property: "og:description",
        content:
          "Fonte, fórmulas, denominadores e status de validação de cada indicador do observatório sobre mulheres, eleições e poder.",
      },
    ],
  }),
  component: MetodoPage,
});

const ALL_INDICATORS = [...CURRENT_INDICATORS, ...RACE_INDICATORS];

function MetodoPage() {
  const openSteps = FUNNEL_STEPS.filter((s) => s.pending !== null);
  const openRace = RACE_BY_POWER_LEVEL.filter((r) => r.pending !== null);

  return (
    <div className="paper-grain min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 md:px-8">
        <header className="py-14">
          <p className="kicker">Método</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.08] text-ink md:text-5xl">
            O que sustenta cada número — e o que ainda não existe
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
            Este observatório prefere a lacuna explícita à estimativa
            conveniente. Todo indicador vem da base oficial do TSE, com
            denominador, fórmula e status de validação declarados.
          </p>
        </header>

        <section
          aria-labelledby="ficha"
          className="editorial-card mb-14 p-5 md:p-6"
        >
          <h2 id="ficha" className="kicker">
            Ficha da fonte
          </h2>
          <dl className="mt-4 grid gap-3 font-mono text-[12px] leading-relaxed text-muted-foreground md:grid-cols-2">
            <div>
              <dt className="uppercase tracking-wider">Fonte</dt>
              <dd className="text-ink">{TSE_SOURCE.name}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-wider">Dataset</dt>
              <dd>
                <a
                  href={TSE_SOURCE.datasetUrl}
                  className="underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {TSE_SOURCE.datasetUrl}
                </a>
              </dd>
            </div>
            <div>
              <dt className="uppercase tracking-wider">Recurso</dt>
              <dd>{TSE_SOURCE.resourceName}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-wider">
                Geração da base (informada pelo TSE)
              </dt>
              <dd>{TSE_SOURCE.baseGeneratedAt}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-wider">
                Metadados do dataset atualizados em
              </dt>
              <dd>{TSE_SOURCE.datasetMetadataModified}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-wider">
                Data/hora de processamento
              </dt>
              <dd>{TSE_SOURCE.processedAt ?? "ainda não processada"}</dd>
            </div>
            <div className="md:col-span-2">
              <dt className="uppercase tracking-wider">
                Última tentativa de obtenção
              </dt>
              <dd>
                {TSE_SOURCE.lastFetchAttempt.at} —{" "}
                {TSE_SOURCE.lastFetchAttempt.outcome}
              </dd>
            </div>
          </dl>
          <div className="mt-4">
            <GapNote label="Status geral">
              Sem o arquivo da base, nenhum indicador de 2026 é exibido com
              valor. Os números da fotografia anterior (09/08/2026) foram
              retirados da apresentação por não terem denominador nem metadados
              auditáveis. A coleta automática diária é o próximo bloco do
              projeto.
            </GapNote>
          </div>
        </section>

        <section aria-label="Notas metodológicas" className="space-y-4 pb-14">
          {METHOD_NOTES.map((n, i) => (
            <article key={n.title} className="editorial-card p-5 md:p-6">
              <span className="font-mono text-[11px] text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-1 font-display text-xl text-ink">{n.title}</h2>
              <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">
                {n.body}
              </p>
            </article>
          ))}
        </section>

        <section className="rule-top pt-8">
          <h2 className="kicker">Metadados por indicador</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Cada indicador do site carrega valor, unidade, numerador,
            denominador, universo, cargos, filtros, fonte, datas, fórmula, status
            e limitação. A tabela abaixo é gerada diretamente do módulo de dados.
          </p>
          <div className="mt-6 space-y-4">
            {ALL_INDICATORS.map((i) => (
              <article key={i.id} className="editorial-card p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="font-display text-lg text-ink">{i.label}</h3>
                  <span
                    className={`font-mono text-[11px] uppercase tracking-wider ${
                      i.status === DATA_STATUS.validado
                        ? "text-plum"
                        : "text-coral"
                    }`}
                  >
                    {i.status}
                  </span>
                </div>
                <dl className="mt-4 grid gap-2 font-mono text-[11px] leading-relaxed text-muted-foreground md:grid-cols-2">
                  <div>
                    <dt className="inline uppercase tracking-wider">Valor: </dt>
                    <dd className="inline">
                      {i.unit === "p.p."
                        ? formatPoints(i.value)
                        : i.unit === "%"
                          ? formatPercent(i.value)
                          : (i.value ?? "—")}
                    </dd>
                  </div>
                  <div>
                    <dt className="inline uppercase tracking-wider">Unidade: </dt>
                    <dd className="inline">{i.unit}</dd>
                  </div>
                  <div>
                    <dt className="inline uppercase tracking-wider">
                      Numerador / denominador:{" "}
                    </dt>
                    <dd className="inline">{formatRatio(i) ?? "—"}</dd>
                  </div>
                  <div>
                    <dt className="inline uppercase tracking-wider">Cargos: </dt>
                    <dd className="inline">{i.positions.join(", ")}</dd>
                  </div>
                  <div className="md:col-span-2">
                    <dt className="inline uppercase tracking-wider">Universo: </dt>
                    <dd className="inline">{i.universe}</dd>
                  </div>
                  <div className="md:col-span-2">
                    <dt className="inline uppercase tracking-wider">Filtros: </dt>
                    <dd className="inline">{i.filters.join(" · ")}</dd>
                  </div>
                  <div className="md:col-span-2">
                    <dt className="inline uppercase tracking-wider">Fórmula: </dt>
                    <dd className="inline">{i.formula}</dd>
                  </div>
                  <div>
                    <dt className="inline uppercase tracking-wider">Fonte: </dt>
                    <dd className="inline">
                      {i.sourceUrl ? (
                        <a
                          href={i.sourceUrl}
                          className="underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {i.source}
                        </a>
                      ) : (
                        i.source
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt className="inline uppercase tracking-wider">
                      Geração da base / processamento:{" "}
                    </dt>
                    <dd className="inline">
                      {i.baseGeneratedAt ?? "—"} / {i.processedAt ?? "—"}
                    </dd>
                  </div>
                  <div className="md:col-span-2">
                    <dt className="inline uppercase tracking-wider">
                      Observação:{" "}
                    </dt>
                    <dd className="inline">{i.caveat}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section className="rule-top mt-16 pt-8">
          <h2 className="kicker">Inventário de lacunas</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Lista gerada diretamente do módulo de dados: toda etapa sem
            indicador calculado aparece aqui automaticamente, com o status
            padronizado.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-rule">
                  <th className="py-3 pr-4 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    Item
                  </th>
                  <th className="py-3 pr-4 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    Status
                  </th>
                  <th className="py-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    Falta
                  </th>
                </tr>
              </thead>
              <tbody>
                {openSteps.map((s) => (
                  <tr key={s.id} className="border-b border-rule align-top">
                    <td className="py-3 pr-4 font-display text-base text-ink">
                      {s.label}
                    </td>
                    <td className="py-3 pr-4 font-mono text-[11px] uppercase tracking-wider text-coral">
                      {s.status}
                    </td>
                    <td className="py-3 text-sm text-muted-foreground">
                      {s.pending}
                    </td>
                  </tr>
                ))}
                {openRace.map((r) => (
                  <tr key={r.level} className="border-b border-rule align-top">
                    <td className="py-3 pr-4 font-display text-base text-ink">
                      Cor/raça × {r.level}
                    </td>
                    <td className="py-3 pr-4 font-mono text-[11px] uppercase tracking-wider text-coral">
                      {r.status}
                    </td>
                    <td className="py-3 text-sm text-muted-foreground">
                      {r.pending}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rule-top mt-16 pt-8">
          <h2 className="kicker">Próximo bloco</h2>
          <div className="mt-5 space-y-3">
            <GapNote label="Coleta">
              O módulo de cálculo já está implementado em src/lib/tse/compute.ts,
              com universos, fórmulas e categorias de cor/raça definidos. Falta a
              rotina de obtenção e atualização da base, prevista para o próximo
              bloco: enquanto ela não existir, o slot src/data/tse-snapshot.ts
              permanece vazio e o site não exibe percentuais.
            </GapNote>
            <GapNote label="Módulos posteriores">
              Recursos de campanha, votos e resultados, e poder e decisões entram
              em módulos próprios, cada um com sua base oficial e sua ficha de
              metadados.
            </GapNote>
          </div>
        </section>

        <div className="mt-16 pb-10">
          <CycleStrip activeId="poder-decisoes" />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
