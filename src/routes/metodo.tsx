import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/editorial/PageHero";
import checagemAsset from "@/assets/checagem.webp.asset.json";
import { SectionBlock } from "@/components/editorial/SectionBlock";
import { ContextBox } from "@/components/editorial/ContextBox";
import { StatusTag } from "@/components/editorial/StatusTag";
import { NextAxes } from "@/components/editorial/NextAxes";
import { GapNote } from "@/components/GapNote";
import {
  CURRENT_INDICATORS,
  DATA_STATUS,
  METHOD_NOTES,
  TSE_SOURCE,
  formatPercent,
  formatPoints,
  formatRatio,
} from "@/data/election-2026";
import { applySnapshot } from "@/lib/tse/indicators";
import {
  getLatestTseSnapshot,
  getLatestTseSnapshotCsv,
  listTseSnapshots,
} from "@/lib/tse/snapshot.functions";
import type { PublicSnapshot } from "@/lib/tse/snapshot.functions";


export const Route = createFileRoute("/metodo")({
  head: () => ({
    meta: [
      { title: "Método — Quem são elas? | Como sabemos" },
      {
        name: "description",
        content:
          "Duas camadas: explicação simples de como calculamos e ficha técnica auditável com fonte, universo, filtros, fórmulas, fotografias da base e limitações.",
      },
      { property: "og:title", content: "Método — como sabemos?" },
      {
        property: "og:description",
        content:
          "Fonte, universo, denominador, fórmula, data da base e limitações de cada indicador do observatório.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: async () => ({
    snapshot: await getLatestTseSnapshot(),
    history: await listTseSnapshots(),
  }),
  component: MetodoPage,
});

function br(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

function statusLabel(s: PublicSnapshot): string {
  switch (s.status) {
    case "ok":
      return "validada";
    case "requer_conferencia":
      return s.conferido ? "validada" : "em conferência";
    case "invalido":
      return "não publicada";
    case "falha_coleta":
      return "falha na coleta";
    default:
      return s.status;
  }
}



const PLAIN_STEPS = [
  {
    step: "1. Pegamos a base oficial",
    body: "Usamos o arquivo de candidaturas publicado pelo TSE em Dados Abertos. Guardamos a data em que o TSE gerou o arquivo e a data em que o observatório o processou.",
  },
  {
    step: "2. Separamos dois universos",
    body: "Eleições proporcionais (Câmara dos Deputados, assembleias legislativas e Câmara Legislativa do Distrito Federal) e eleições majoritárias (Presidência, governos e Senado). Nunca somamos os dois em uma conta só.",
  },
  {
    step: "3. Contamos candidaturas, não pessoas",
    body: "A unidade de análise é a candidatura registrada. Gênero e cor/raça vêm da autodeclaração feita no registro.",
  },
  {
    step: "4. Dividimos pelo denominador do próprio universo",
    body: "Candidaturas de mulheres divididas pelo total de candidaturas daquele mesmo universo. Nenhum percentual aparece sem esse denominador visível.",
  },
  {
    step: "5. Diferenças em pontos percentuais",
    body: "Quando comparamos dois percentuais, a diferença é expressa em p.p. — e é descritiva: não prova que uma regra causou o resultado.",
  },
  {
    step: "6. O que falta fica declarado",
    body: "Recursos, votos, eleitas e poder ainda não têm base disponível para 2026. Onde falta dado, aparece a lacuna. Dado não disponível não é zero.",
  },
] as const;

function MetodoPage() {
  const { snapshot, history } = Route.useLoaderData() as {
    snapshot: PublicSnapshot | null;
    history: PublicSnapshot[];
  };
  const indicators = applySnapshot(CURRENT_INDICATORS, snapshot);

  const getCsv = useServerFn(getLatestTseSnapshotCsv);
  const handleDownload = async () => {
    const result = await getCsv();
    if (!result) return;
    const blob = new Blob([result.content], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = result.fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };




  return (
    <PageShell>
      <PageHero
        wide
        kicker="Método"
        question="Todo número precisa mostrar de onde veio."
        lead={
          <p>
            Esta página tem duas camadas. A primeira explica em linguagem simples
            como cada número é calculado. A segunda é a ficha técnica auditável,
            gerada a partir da mesma camada de dados que alimenta o site.
          </p>
        }
        image={checagemAsset.url}
        imageAlt="Ilustração editorial: mãos conferindo gráficos e documentos com uma lupa"
        aside={
          <div className="editorial-card p-5">
            <p className="kicker">Fotografia vigente</p>
            <p className="mt-2 font-display text-lg leading-snug text-ink">
              Base do TSE gerada em{" "}
              {br(snapshot?.baseGeneratedAt ?? TSE_SOURCE.baseGeneratedAt)}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Processada pelo observatório em {br(snapshot?.collectedAt ?? null)}
            </p>
            {snapshot && (
              <p className="mt-3 font-mono text-[12px] text-muted-foreground">
                {snapshot.recordCount.toLocaleString("pt-BR")} candidaturas na
                fotografia
              </p>
            )}
          </div>
        }
      />

      {/* CAMADA 1 — linguagem simples */}
      <SectionBlock
        kicker="Camada 1 · linguagem simples"
        question="Como calculamos?"
        align="wide"
      >
        <ol className="grid gap-4 md:grid-cols-2">
          {PLAIN_STEPS.map((s) => (
            <li key={s.step} className="poster-frame p-5">
              <h3 className="font-display text-lg text-ink">{s.step}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-6">
          <ContextBox variant="significa" title="Como uma cadeira proporcional é preenchida">
            <p>
              Na proporcional você vota também no partido, não só na pessoa. A
              soma dos votos do partido — o quociente eleitoral — define quantas
              cadeiras ele conquista; só depois, dentro do partido, a ordem dos
              mais votados define quem as ocupa. Por isso uma candidata pode ter
              muitos votos e não ser eleita, e outra com menos entrar: depende de
              quanto o partido inteiro somou. É o que torna a proporcional menos
              intuitiva — e explica por que "mais votos" não é o mesmo que
              "eleita".
            </p>
          </ContextBox>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <ContextBox variant="significa">
            <p>
              “Fotografia” é o estado da base num momento específico. O registro de
              candidaturas muda enquanto a Justiça Eleitoral analisa pedidos, então
              cada número tem data.
            </p>
          </ContextBox>
          <ContextBox variant="importa">
            <p>
              Sem a data, um número antigo circula como se fosse atual. Com a data,
              qualquer pessoa pode conferir e reproduzir a conta.
            </p>
          </ContextBox>
        </div>
      </SectionBlock>

      {/* CAMADA 2 — ficha técnica */}
      <SectionBlock
        tone="solar"
        kicker="Camada 2 · ficha técnica"
        question="Fonte e processamento"
      >
        <div className="editorial-card p-5 md:p-6">
          <dl className="grid gap-3 font-mono text-[12px] leading-relaxed text-muted-foreground md:grid-cols-2">
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
              <dt className="uppercase tracking-wider">Recurso processado</dt>
              <dd>{snapshot?.fileName ?? TSE_SOURCE.resourceName}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-wider">Geração da base (TSE)</dt>
              <dd>
                {br(snapshot?.baseGeneratedAt ?? TSE_SOURCE.baseGeneratedAt)}
              </dd>
            </div>
            <div>
              <dt className="uppercase tracking-wider">
                Coleta pelo observatório
              </dt>
              <dd>{br(snapshot?.collectedAt ?? null)}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-wider">Registros lidos</dt>
              <dd>{snapshot?.recordCount.toLocaleString("pt-BR") ?? "—"}</dd>
            </div>
            <div className="md:col-span-2">
              <dt className="uppercase tracking-wider">Unidade de análise</dt>
              <dd>Candidatura registrada (não pessoa)</dd>
            </div>
            {snapshot && snapshot.filters.length > 0 && (
              <div className="md:col-span-2">
                <dt className="uppercase tracking-wider">Filtros aplicados</dt>
                <dd>{snapshot.filters.join(" · ")}</dd>
              </div>
            )}
          </dl>
          {snapshot && (
            <div className="mt-5 border-t border-rule pt-4">
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex rounded-md bg-plum px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-plum-soft"
              >
                Baixar esta fotografia (CSV)
              </button>
              <p className="mt-2 font-mono text-[12px] text-muted-foreground">
                CSV gerado a partir da fotografia vigente, com data e filtros no
                cabeçalho do arquivo.
              </p>
            </div>
          )}
          {!snapshot && (
            <div className="mt-4">
              <GapNote label="Fotografia indisponível">
                Nenhuma fotografia publicável da base está disponível neste
                momento. Enquanto isso, o site não exibe percentuais: exibe a
                lacuna.
              </GapNote>
            </div>
          )}

        </div>
      </SectionBlock>

      {/* Situação de candidatura */}
      {snapshot && Object.keys(snapshot.situationValues).length > 0 && (
        <SectionBlock
          kicker="Situação de candidatura"
          question="Que estágios a base contém"
          lead={
            <p>
              Nenhum filtro de situação é aplicado aos indicadores: um registro
              pode mudar de situação até a decisão final da Justiça Eleitoral.
              Abaixo, as situações presentes na fotografia vigente.
            </p>
          }
        >
          <dl className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {Object.entries(snapshot.situationValues)
              .sort((a, b) => b[1] - a[1])
              .map(([k, v]) => (
                <div key={k} className="poster-frame p-4">
                  <dt className="font-mono text-[12px] uppercase tracking-wider text-muted-foreground">
                    {k}
                  </dt>
                  <dd className="poster-figure mt-2 text-3xl text-plum md:text-4xl">
                    {v.toLocaleString("pt-BR")}
                  </dd>
                </div>
              ))}
          </dl>
        </SectionBlock>
      )}

      {/* Notas metodológicas */}
      <SectionBlock
        kicker="Notas metodológicas"
        question="As decisões que valem para todo o site"
        align="wide"
      >
        <div className="space-y-4">
          {METHOD_NOTES.map((n, i) => (
            <article key={n.title} className="poster-frame p-5 md:p-6">
              <span className="poster-figure block text-3xl text-plum md:text-4xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-1 font-display text-xl text-ink">{n.title}</h3>
              <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">
                {n.body}
              </p>
            </article>
          ))}
        </div>
      </SectionBlock>

      {/* Metadados por indicador */}
      <SectionBlock
        kicker="Metadados por indicador"
        question="Cada número, com sua conta aberta"
        align="wide"
        lead={
          <p>
            Valor, unidade, numerador, denominador, universo, cargos, filtros,
            fonte, datas, fórmula, status e limitação. A lista é gerada a partir da
            camada de dados.
          </p>
        }
      >
        <div className="space-y-4">
          {indicators.map((i) => (
            <article key={i.id} className="editorial-card p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="font-display text-lg text-ink">{i.label}</h3>
                <StatusTag
                  tone={
                    i.status === DATA_STATUS.validado
                      ? "ok"
                      : i.status === DATA_STATUS.provisorio
                        ? "limit"
                        : "pending"
                  }
                >
                  {i.status}
                </StatusTag>
              </div>
              <dl className="mt-4 grid gap-2 font-mono text-[12px] leading-relaxed text-muted-foreground md:grid-cols-2">
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
                    Geração da base / coleta:{" "}
                  </dt>
                  <dd className="inline">
                    {br(i.baseGeneratedAt)} / {br(i.processedAt)}
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
      </SectionBlock>

      {/* Histórico de fotografias */}
      <SectionBlock
        kicker="Histórico"
        question="Fotografias já processadas"
        lead={
          <p>
            Cada atualização gera uma fotografia nova; nenhuma é sobrescrita. Assim
            é possível saber qual base sustentava um número em determinada data.
          </p>
        }
      >
        {history.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b border-rule">
                  {["Coleta", "Geração da base", "Registros", "Situação"].map(
                    (h) => (
                      <th
                        key={h}
                        className="py-3 pr-4 font-mono text-[12px] uppercase tracking-wider text-muted-foreground"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {history.map((s) => (
                  <tr key={s.id} className="border-b border-rule align-top">
                    <td className="py-3 pr-4 font-mono text-xs text-ink">
                      {br(s.collectedAt)}
                    </td>
                    <td className="py-3 pr-4 font-mono text-xs text-muted-foreground">
                      {br(s.baseGeneratedAt)}
                    </td>
                    <td className="py-3 pr-4 font-mono text-xs text-muted-foreground">
                      {s.recordCount.toLocaleString("pt-BR")}
                    </td>
                    <td className="py-3 font-mono text-xs text-muted-foreground">
                      {statusLabel(s)}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <GapNote label="Histórico">
            Nenhuma fotografia registrada até o momento.
          </GapNote>
        )}
      </SectionBlock>

      {/* Limitações */}
      <SectionBlock
        kicker="Limitações"
        question="O que este método não faz"
      >
        <div className="space-y-3">
          <GapNote label="Não disponível não é zero">
            Recursos de campanha, votos, eleitas, posições de poder, deficiência e
            barreiras à permanência não têm base disponível para 2026. Onde não há
            fonte, não há número — nem estimativa.
          </GapNote>
          <GapNote label="Correlação não é causalidade">
            Contrastes entre universos, partidos, territórios ou grupos são
            descritivos. Este método não isola o efeito de nenhuma regra sobre a
            presença de mulheres.
          </GapNote>
          <GapNote label="Limitação da base">
            O registro não capta de forma confiável identidade trans ou travesti, e
            a categoria de cor/raça não identifica pertencimento étnico indígena.
          </GapNote>
        </div>
        <p className="mt-6 font-mono text-[12px] text-muted-foreground">
          Como citar e política de correções em{" "}
          <Link to="/sobre" className="text-plum underline underline-offset-4">
            Sobre
          </Link>
        </p>
      </SectionBlock>

      <NextAxes ids={["dados-2026", "funil", "sobre"]} />
    </PageShell>
  );
}
