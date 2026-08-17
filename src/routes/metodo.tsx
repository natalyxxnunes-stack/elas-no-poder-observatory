import { createFileRoute, Link } from "@tanstack/react-router";
import { buildSnapshotCsv } from "@/lib/tse/snapshot-csv";
import { formatInt } from "@/lib/format-br";

import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/editorial/PageHero";
import checagemAsset from "@/assets/checagem.webp.asset.json";
import { SectionBlock } from "@/components/editorial/SectionBlock";
import { ContextBox } from "@/components/editorial/ContextBox";
import { StatusTag } from "@/components/editorial/StatusTag";
import { NextAxes } from "@/components/editorial/NextAxes";
import { GapNote } from "@/components/GapNote";
import { GlossaryTerm } from "@/components/editorial/GlossaryTerm";
import {
  CURRENT_INDICATORS,
  DATA_STATUS,
  METHOD_NOTES,
  TSE_SOURCE,
  formatPercent,
  formatPoints,
  formatRatio,
} from "@/data/election-2026";
import {
  COMPETITION_DEFINITION,
  FINANCE_AVAILABILITY,
} from "@/data/competitividade";
import { VAGAS_SOURCE } from "@/data/vagas-2026";
import { applySnapshot } from "@/lib/tse/indicators";
import {
  getLatestTseSnapshot,
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

/**
 * Situação de cada fotografia. A conferência manual (`conferido = true`) é a
 * única coisa que libera uma fotografia para uso público: `status = ok` sozinho
 * não basta. Fotografias coletadas e ainda não conferidas ficam retidas.
 */
function statusLabel(s: PublicSnapshot): string {
  if (s.status === "falha_coleta") return "falha na coleta";
  if (s.status === "invalido") return "não publicada";
  return s.conferido ? "conferida" : "retida para conferência";
}




const PLAIN_STEPS: { step: string; body: React.ReactNode }[] = [
  {
    step: "1. Pegamos a base oficial",
    body: "Usamos o arquivo de candidaturas publicado pelo TSE em Dados Abertos. Guardamos a data em que o TSE gerou o arquivo e a data em que o observatório o processou.",
  },
  {
    step: "2. Separamos dois universos",
    body: (
      <>
        Eleições{" "}
        <GlossaryTerm term="proporcional" method={false}>
          proporcionais
        </GlossaryTerm>{" "}
        (Câmara dos Deputados, assembleias legislativas e Câmara Legislativa do
        Distrito Federal) e eleições{" "}
        <GlossaryTerm term="majoritaria" method={false}>
          majoritárias
        </GlossaryTerm>{" "}
        (Presidência, governos e Senado). Nunca somamos os dois em uma conta só.
      </>
    ),
  },
  {
    step: "3. Contamos candidaturas, não pessoas",
    body: "A unidade de análise é a candidatura registrada. Gênero e cor/raça vêm da autodeclaração feita no registro.",
  },
  {
    step: "4. Dividimos pelo total do próprio universo",
    body: "Candidaturas de mulheres divididas pelo total de candidaturas daquele mesmo universo. Nenhum percentual aparece sem esse total visível.",
  },
  {
    step: "5. Diferenças em pontos percentuais",
    body: (
      <>
        Quando comparamos dois percentuais, a diferença aparece em{" "}
        <GlossaryTerm term="pontos-percentuais" method={false}>
          p.p.
        </GlossaryTerm>{" "}
        — uma leitura descritiva, que não prova que uma regra causou o resultado.
      </>
    ),
  },
  {
    step: "6. O que falta fica declarado",
    body: "Onde falta dado, aparece a lacuna, com o motivo e a fonte que ainda falta — nunca um número provisório no lugar.",
  },
];

function MetodoPage() {
  const { snapshot, history } = Route.useLoaderData() as {
    snapshot: PublicSnapshot | null;
    history: PublicSnapshot[];
  };
  const indicators = applySnapshot(CURRENT_INDICATORS, snapshot);

  // O CSV é montado no navegador a partir da mesma fotografia já carregada
  // nesta página: nenhum número novo, nenhum cálculo adicional.
  const handleDownload = () => {
    if (!snapshot) return;
    const result = buildSnapshotCsv(snapshot);
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
                {formatInt(snapshot.recordCount)} candidaturas na
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
              Na proporcional, o voto conta também para o partido, não só para a
              pessoa. A soma dos votos do partido — o{" "}
              <GlossaryTerm term="quociente-eleitoral" method={false}>
                quociente eleitoral
              </GlossaryTerm>{" "}
              — define quantas cadeiras ele conquista. Só depois, dentro do
              partido, a ordem dos mais votados define quem ocupa essas cadeiras.
            </p>
            <p className="mt-2">
              Por isso uma candidata pode ter muitos votos e não ser eleita, e
              outra com menos votos entrar: “mais votos” não é o mesmo que
              “eleita”.
            </p>
          </ContextBox>
        </div>

        <div className="mt-6">
          <ContextBox variant="significa" title="Como este site usa a palavra “mulheres”">
            <p>
              Nos indicadores eleitorais, “mulheres” corresponde às candidaturas
              registradas como FEMININO no campo DS_GENERO da base pública do
              TSE. É a classificação do dataset — não uma definição sociológica
              de identidade de gênero.
            </p>
            <p className="mt-2">
              O mesmo vale para cor/raça: os grupos vêm da autodeclaração no
              registro, com as categorias que o TSE publica.
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
          <dl className="grid gap-3 break-words font-mono text-[12px] leading-relaxed text-muted-foreground md:grid-cols-2">
            <div>
              <dt className="uppercase tracking-wider">Fonte</dt>
              <dd className="text-ink">{TSE_SOURCE.name}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-wider">Dataset</dt>
              <dd>
                <a
                  href={TSE_SOURCE.datasetUrl}
                  className="break-all underline"
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
              <dd>{snapshot ? formatInt(snapshot.recordCount) : "—"}</dd>
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
              <p className="kicker">Procedência do arquivo</p>
              {snapshot.zipSha256 || snapshot.brasilCsvSha256 ? (
                <>
                  <dl className="mt-3 space-y-2 font-mono text-[12px] text-muted-foreground">
                    {snapshot.zipSha256 && (
                      <div>
                        <dt className="uppercase tracking-wider">
                          SHA-256 do pacote baixado do TSE
                        </dt>
                        <dd className="break-all text-ink">
                          {snapshot.zipSha256}
                        </dd>
                      </div>
                    )}
                    {snapshot.brasilCsvSha256 && (
                      <div>
                        <dt className="uppercase tracking-wider">
                          SHA-256 do arquivo de onde os números saem
                        </dt>
                        <dd className="break-all text-ink">
                          {snapshot.brasilCsvSha256}
                        </dd>
                      </div>
                    )}
                    <div>
                      <dt className="uppercase tracking-wider">
                        Versão de processamento
                      </dt>
                      <dd>{snapshot.processingVersion}</dd>
                    </div>
                  </dl>
                  <p className="mt-2 font-mono text-[12px] text-muted-foreground">
                    O código identifica o arquivo processado: quem baixar o mesmo
                    arquivo do TSE chega ao mesmo código. Ele comprova a
                    procedência do arquivo, não a correção dos cálculos feitos
                    sobre ele.
                  </p>
                </>
              ) : (
                <p className="mt-3 font-mono text-[12px] leading-relaxed text-muted-foreground">
                  Esta fotografia foi coletada antes de o registro de SHA-256
                  entrar no pipeline, então não tem código de procedência
                  gravado. A partir da versão {snapshot.processingVersion} em
                  diante, cada coleta guarda o código do pacote baixado e do
                  arquivo de onde os números saem.
                </p>
              )}

              <div className="mt-4 border-t border-rule pt-4">
                <p className="kicker">Baixar os dados</p>
                <h3 className="mt-2 font-display text-xl text-ink">
                  Planilha da fotografia vigente (CSV)
                </h3>
                <dl className="mt-3 grid gap-2 font-mono text-[12px] leading-relaxed text-muted-foreground md:grid-cols-2">
                  <div>
                    <dt className="inline uppercase tracking-wider">
                      O que é:{" "}
                    </dt>
                    <dd className="inline">
                      exportação dos números já processados pelo observatório —
                      contagens de candidaturas por universo, gênero e cor/raça,
                      não o arquivo bruto do TSE
                    </dd>
                  </div>
                  <div>
                    <dt className="inline uppercase tracking-wider">
                      Fotografia:{" "}
                    </dt>
                    <dd className="inline">
                      base do TSE gerada em{" "}
                      {br(snapshot.baseGeneratedAt)}, processada em{" "}
                      {br(snapshot.collectedAt)}
                    </dd>
                  </div>
                  <div>
                    <dt className="inline uppercase tracking-wider">
                      Universos:{" "}
                    </dt>
                    <dd className="inline">
                      proporcional e majoritário, sempre separados, com o total
                      de cada um na própria linha
                    </dd>
                  </div>
                  <div>
                    <dt className="inline uppercase tracking-wider">
                      Filtros:{" "}
                    </dt>
                    <dd className="inline">
                      {snapshot.filters.length
                        ? snapshot.filters.join(" · ")
                        : "os mesmos filtros descritos na ficha técnica acima"}
                    </dd>
                  </div>
                  <div className="md:col-span-2">
                    <dt className="inline uppercase tracking-wider">
                      Cabeçalho do arquivo:{" "}
                    </dt>
                    <dd className="inline">
                      traz fonte, datas, filtros, versão de processamento e o
                      SHA-256 quando disponível, para o arquivo continuar
                      identificável fora do site
                    </dd>
                  </div>
                </dl>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="mt-4 inline-flex rounded-md bg-plum px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-plum-soft"
                >
                  Baixar a planilha (CSV)
                </button>
                <p className="mt-2 font-mono text-[12px] text-muted-foreground">
                  O arquivo bruto original continua disponível direto no TSE, no
                  endereço citado na ficha técnica.
                </p>
              </div>
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

      {/* Nota técnica reproduzível */}
      <SectionBlock
        kicker="Nota técnica"
        question="Como refazer estas contas do zero"
        align="wide"
        lead={
          <p>
            Roteiro completo do que o observatório faz com o arquivo do TSE, na
            ordem em que faz. Quem baixar o mesmo arquivo e seguir estes passos
            deve chegar aos mesmos números da fotografia vigente.
          </p>
        }
      >
        <ol className="space-y-4">
          <li className="poster-frame p-5">
            <h3 className="font-display text-lg text-ink">
              1. Arquivo e origem
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Recurso “Candidatos” do dataset{" "}
              <a
                href={TSE_SOURCE.datasetUrl}
                className="break-all text-plum underline underline-offset-4"
                target="_blank"
                rel="noreferrer"
              >
                Candidatos 2026 · TSE Dados Abertos
              </a>
              . Pacote:{" "}
              <span className="break-all font-mono text-[12px]">
                {TSE_SOURCE.resourceUrl}
              </span>
              . Dentro dele, o arquivo processado é{" "}
              <span className="break-all font-mono text-[12px]">
                {snapshot?.fileName ?? TSE_SOURCE.resourceName}
              </span>
              , com codificação ISO-8859-1 e separador “;”. A fotografia vigente
              usa a base gerada pelo TSE em{" "}
              {br(snapshot?.baseGeneratedAt ?? TSE_SOURCE.baseGeneratedAt)} e
              processada em {br(snapshot?.collectedAt ?? null)}.
            </p>
          </li>

          <li className="poster-frame p-5">
            <h3 className="font-display text-lg text-ink">
              2. Unidade de análise e deduplicação
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Cada linha lida é uma candidatura registrada. A chave é
              SQ_CANDIDATO: linhas repetidas com a mesma chave entram uma única
              vez, e linhas sem chave são descartadas e contadas à parte na
              auditoria da coleta. A contagem é de candidaturas, não de pessoas —
              a mesma pessoa em ciclos diferentes são registros diferentes.
            </p>
          </li>

          <li className="poster-frame p-5">
            <h3 className="font-display text-lg text-ink">
              3. Universos (critério de inclusão e exclusão)
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              A classificação usa o cargo (DS_CARGO / CD_CARGO). Entram no
              universo proporcional: deputado federal, deputado estadual e
              deputado distrital. Entram no majoritário: presidente, governador e
              senador. Fica fora do cálculo todo cargo que não seja um desses —
              inclusive vice-presidente, vice-governador e suplente de senador.
              Nada é somado entre os dois universos.
            </p>
          </li>

          <li className="poster-frame p-5">
            <h3 className="font-display text-lg text-ink">
              4. Situação do registro
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              O projeto <strong>não</strong> filtra por situação: candidaturas
              aptas, inaptas, com registro indeferido, sub judice ou renunciadas
              entram todas na contagem, porque a situação muda até a decisão final
              da Justiça Eleitoral e um filtro tornaria as fotografias
              incomparáveis. As situações presentes na base aparecem contadas na
              seção seguinte. O detalhe do estágio processual está em outro
              recurso do TSE, ainda não integrado.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              A base pública também não permite identificar candidaturas
              fictícias (as chamadas “laranjas”): isso depende de investigação e
              de decisão judicial caso a caso. Nenhum registro é excluído por
              suspeita, e o projeto não estima quantas seriam.
            </p>
          </li>

          <li className="poster-frame p-5">
            <h3 className="font-display text-lg text-ink">
              5. Fórmulas e denominadores
            </h3>
            <ul className="mt-2 space-y-2 font-mono text-[12px] leading-relaxed text-muted-foreground">
              <li>
                participação feminina = candidaturas com DS_GENERO = FEMININO no
                universo ÷ total de candidaturas do mesmo universo × 100
              </li>
              <li>
                distância entre universos = participação proporcional −
                participação majoritária, expressa em p.p.
              </li>
              <li>
                composição por cor/raça = candidaturas de mulheres de uma
                categoria de DS_COR_RACA ÷ total de candidaturas de mulheres do
                mesmo universo × 100
              </li>
              <li>
                por partido = candidaturas femininas do partido ÷ total de
                candidaturas do mesmo partido e universo × 100 (não exibido
                abaixo de 20 candidaturas)
              </li>
              <li>
                por UF = candidaturas femininas na UF ÷ total de candidaturas da
                mesma UF e universo × 100
              </li>
              <li>
                taxa de eleição (anos encerrados) = eleitas de um gênero ÷
                candidaturas do mesmo gênero, ano e universo × 100, com resultado
                de 1º turno lido em DS_SIT_TOT_TURNO
              </li>
            </ul>
          </li>

          <li className="poster-frame p-5">
            <h3 className="font-display text-lg text-ink">
              6. Fotografias e verificação
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Cada coleta gera uma fotografia datada, listada no histórico ao fim
              desta página com o respectivo SHA-256 quando disponível. Para
              conferir: recalcule as contagens do passo 5 sobre o arquivo
              indicado no passo 1 e compare com a planilha exportada.
            </p>

          </li>
        </ol>
      </SectionBlock>

      {/* Representação descritiva × substantiva */}
      <SectionBlock
        tone="solar"
        kicker="O que estes números medem"
        question="Presença não é a mesma coisa que poder de decidir"
        lead={
          <p>
            Duas perguntas diferentes costumam aparecer misturadas quando se fala
            de mulheres na política. Este projeto começa pela primeira, e isso
            delimita o que ele pode afirmar.
          </p>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <ContextBox variant="significa" title="Representação descritiva">
            <p>
              É a presença numérica: quantas mulheres se candidatam, quantas são
              eleitas, quem elas são por cor/raça, em que cargos e partidos.
              Todos os indicadores publicados aqui são deste tipo.
            </p>
          </ContextBox>
          <ContextBox variant="importa" title="Representação substantiva">
            <p>
              É a atuação: que agendas são defendidas, quem relata projetos,
              quem preside comissões, quem ocupa ministérios, mesas diretoras e
              lideranças — os espaços onde a decisão acontece. Isso depende de
              outras fontes, que o projeto ainda não integrou.
            </p>
          </ContextBox>
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Por isso um número maior de candidaturas femininas não autoriza dizer
          que houve mais poder para mulheres, nem o contrário. São perguntas
          encadeadas, e esta edição responde a primeira.
        </p>
      </SectionBlock>


      {/* Situação de candidatura */}
      {snapshot && Object.keys(snapshot.situationValues).length > 0 && (
        <SectionBlock
          kicker="Situação de candidatura"
          question="Que estágios a base contém"
          lead={
            <p>
              As situações presentes na fotografia vigente, contadas. O critério
              de não filtrar por situação está no passo 4 da ficha técnica.
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
                    {formatInt(v)}
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
            é possível saber qual base sustentava um número em determinada data. Só
            a fotografia conferida manualmente vai ao ar — a mais recente pode estar
            coletada e ainda retida.
          </p>
        }

      >
        {history.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
                <caption className="sr-only">
                  Fotografias da base do TSE já processadas, com data de coleta,
                  data de geração da base, número de registros e situação.
                </caption>
              <thead>
                <tr className="border-b border-rule">
                  {["Coleta", "Geração da base", "Registros", "Situação"].map(
                    (h) => (
                      <th
                        key={h}
                        scope="col"
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
                      {formatInt(s.recordCount)}
                    </td>
                    <td className="py-3 font-mono text-xs text-muted-foreground">
                      {statusLabel(s)}
                      {snapshot && s.id === snapshot.id ? (
                        <span className="text-ink"> · no ar</span>
                      ) : null}
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

      {/* Fato, interpretação e hipótese */}
      <SectionBlock
        kicker="Como ler o site"
        question="Três registros diferentes, sempre marcados"
        lead={
          <p>
            Nada aqui mistura o que o dado mostra com o que nós achamos que ele
            significa. Os três registros aparecem separados em cada página, e o
            bloco racial em{" "}
            <Link
              to="/quem-sao-elas"
              className="text-plum underline underline-offset-4"
            >
              Quem são elas?
            </Link>{" "}
            é o exemplo mais completo.
          </p>
        }
      >
        <dl className="grid gap-4 md:grid-cols-3">
          <div className="poster-frame p-5">
            <dt className="poster-eyebrow border-plum text-plum">Fato</dt>
            <dd className="mt-3 text-sm leading-relaxed text-ink/70">
              Contagem que sai direto da base, com numerador, denominador e data.
              É verificável: recalcule e confira.
            </dd>
          </div>
          <div className="poster-frame p-5">
            <dt className="poster-eyebrow border-coral text-coral-ink">
              Interpretação editorial
            </dt>
            <dd className="mt-3 text-sm leading-relaxed text-ink/70">
              Nossa leitura do fato: qual comparação importa, o que um total
              esconde, por que um recorte fica separado. Assinada, discutível — e
              nunca apresentada como resultado do cálculo.
            </dd>
          </div>
          <div className="poster-frame p-5">
            <dt className="poster-eyebrow border-ink text-ink">
              Hipótese em investigação
            </dt>
            <dd className="mt-3 text-sm leading-relaxed text-ink/70">
              Explicação possível que os dados atuais não testam. Fica marcada
              como pergunta aberta; nenhuma delas é publicada como causa.
            </dd>
          </div>
        </dl>
      </SectionBlock>

      {/* Competitividade */}
      <SectionBlock
        kicker="Competitividade"
        question="O que chamamos — e o que não chamamos — de competitividade"
        align="wide"
        lead={
          <p>
            Não existe índice de competitividade neste site. Com uma fotografia
            de registro de candidaturas, sem voto e sem resultado, uma só leitura
            é possível e reproduzível:{" "}
            <strong className="text-ink">
              {COMPETITION_DEFINITION.label.toLowerCase()}
            </strong>
            . Ela está publicada em{" "}
            <Link to="/funil" className="text-plum underline underline-offset-4">
              O funil
            </Link>
            .
          </p>
        }
      >
        <div className="space-y-4">
          <div className="poster-frame p-5 md:p-6">
            <h3 className="font-display text-xl text-ink">
              {COMPETITION_DEFINITION.question}
            </h3>
            <dl className="mt-3 space-y-2 break-words font-mono text-[12px] leading-relaxed text-ink/80">
              <div>
                <dt className="inline text-muted-foreground">Fórmula: </dt>
                <dd className="inline">{COMPETITION_DEFINITION.formula}</dd>
              </div>
              <div>
                <dt className="inline text-muted-foreground">Unidade: </dt>
                <dd className="inline">
                  {COMPETITION_DEFINITION.unit} · unidade de análise:{" "}
                  {COMPETITION_DEFINITION.unitOfAnalysis}
                </dd>
              </div>
              <div>
                <dt className="inline text-muted-foreground">Numerador: </dt>
                <dd className="inline">
                  {COMPETITION_DEFINITION.numeratorSource}
                </dd>
              </div>
              <div>
                <dt className="inline text-muted-foreground">Denominador: </dt>
                <dd className="inline">
                  {COMPETITION_DEFINITION.denominatorSource} · arquivo gerado em
                  15/08/2026 · SHA-256 do pacote{" "}
                  <span className="break-all">{VAGAS_SOURCE.zipSha256}</span>
                </dd>
              </div>
            </dl>

          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <ContextBox variant="significa" title="O que este número mede">
              <ul className="list-disc space-y-1 pl-5">
                {COMPETITION_DEFINITION.measures.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </ContextBox>
            <ContextBox variant="importa" title="O que ele não mede">
              <ul className="list-disc space-y-1 pl-5">
                {COMPETITION_DEFINITION.doesNotMeasure.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </ContextBox>
          </div>

          <div className="space-y-3">
            {COMPETITION_DEFINITION.limitations.map((l) => (
              <GapNote key={l} label="Limite declarado">
                {l}
              </GapNote>
            ))}
          </div>
        </div>
      </SectionBlock>

      {/* Financiamento de campanha */}
      <SectionBlock
        kicker="Financiamento de campanha"
        question="Por que este site ainda não publica dinheiro de campanha"
        align="wide"
        lead={
          <p>
            Verificamos os Dados Abertos do TSE em{" "}
            {br(FINANCE_AVAILABILITY.checkedAt)}, conjunto por conjunto.{" "}
            {FINANCE_AVAILABILITY.verdict}
          </p>
        }
      >
        <div className="space-y-4">
          {FINANCE_AVAILABILITY.checked.map((c) => (
            <article key={c.id} className="editorial-card p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="font-display text-lg text-ink">{c.label}</h3>
                <StatusTag tone="limit">{c.status}</StatusTag>
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                {c.note}
              </p>
              <p className="mt-2 font-mono text-[12px] break-words text-ink/60">
                {c.url}
              </p>
            </article>
          ))}

          <ContextBox variant="calculamos" title="O que entra quando a base existir">
            <ul className="list-disc space-y-1 pl-5">
              {FINANCE_AVAILABILITY.plannedWhenAvailable.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </ContextBox>

          <GapNote label="Lacuna declarada">
            Até a prestação de contas de campanha de 2026 existir, nenhuma célula
            financeira recebe valor neste site — e a regra de destinação mínima
            de recursos e de tempo de propaganda a candidaturas de mulheres não
            se confunde com a regra de composição de candidaturas de 30% a 70%
            por gênero: são regras distintas, com alcances distintos.
          </GapNote>
        </div>
      </SectionBlock>


      {/* Limitações */}
      <SectionBlock
        kicker="Limitações"
        question="O que este método não faz"
      >
        <div className="space-y-3">
          <GapNote label="Não disponível não é zero">
            Recursos de campanha, votos, eleitas, posições de poder e barreiras à
            permanência não têm base disponível para 2026. Onde não há fonte, não
            há número — nem estimativa.
          </GapNote>
          <GapNote label="Correlação não é causalidade">
            Contrastes entre universos, partidos, territórios ou grupos são
            descritivos. Este método não isola o efeito de nenhuma regra sobre a
            presença de mulheres.
          </GapNote>
          <GapNote label="Deficiência, povos indígenas e quilombolas">
            Verificamos coluna por coluna o que a base de 2026 permite. Não há
            nenhuma coluna de deficiência no arquivo público de Candidatos nem no
            de Informações complementares: esse recorte é impossível hoje, e não
            será inferido. Pertencimento quilombola (ST_QUILOMBOLA) e etnia
            indígena (DS_ETNIA_INDIGENA) existem, mas apenas no recurso
            complementar, que o observatório ainda não ingere — enquanto ele não
            for processado e auditado como a base principal, nenhum percentual
            desses dois grupos é publicado. Atenção a uma confusão comum: a
            categoria “indígena” de cor/raça é cor declarada, não pertencimento a
            um povo, e uma não substitui a outra.
          </GapNote>
          <GapNote label="Identidade de gênero">
            A base traz um único campo de gênero, com valores masculino e
            feminino. Ele não identifica candidaturas trans ou travestis, e por
            isso este site não afirma nada sobre elas — nem por nome social, nem
            por qualquer outra inferência.
          </GapNote>
          <GapNote label="Campo político: eixo em apuração">
            A base do TSE traz partido e forma de agremiação, não campo
            ideológico. Agrupar partidos por campo é classificação editorial, e
            só entra no ar com três passos cumpridos: dicionário fechado de
            partidos e federações de 2026; critério de classificação publicado
            com fonte externa citável; e só então o cruzamento por campo, com o
            denominador de cada universo eleitoral. Até lá, nenhum percentual por
            campo político é publicado.
          </GapNote>
          <GapNote label="Cruzamento por partido: o que ele mede">
            A tabela por partido em{" "}
            <Link
              to="/quem-sao-elas"
              className="text-plum underline underline-offset-4"
            >
              Quem são elas?
            </Link>{" "}
            divide, dentro de cada universo, as candidaturas registradas como
            femininas pelo total de candidaturas do mesmo partido. Nada é somado
            entre universos. Abaixo de 20 candidaturas o percentual não é
            exibido, só os absolutos. O recorte de cor/raça descreve apenas as
            candidaturas de mulheres daquele partido e usa as categorias
            declaradas ao TSE. A tabela mede composição de lista: não mede
            recursos, posição na lista, votos nem eleitas — e a ordenação é
            descritiva, não classificação de mérito.
          </GapNote>
          <GapNote label="Leitura por estado: até onde a fotografia vai">
            Por estado, a fotografia sustenta candidaturas registradas,
            candidaturas de mulheres e cor/raça declarada, cada estado com seu
            próprio denominador e dentro de um único universo. A combinação
            estado × partido está gravada apenas para as candidaturas de
            mulheres; o total de candidaturas de cada partido dentro de cada
            estado — denominador necessário para um percentual de gênero nessa
            célula — passou a ser contado nesta versão do processamento e
            aparecerá nas próximas coletas. Enquanto não estiver na fotografia
            vigente, a leitura por estado mostra os absolutos e não exibe esse
            percentual.
          </GapNote>
        </div>

        <p className="mt-6 font-mono text-[12px] text-muted-foreground">
          Como citar e política de correções em{" "}
          <Link to="/sobre" className="text-plum underline underline-offset-4">
            Sobre
          </Link>
        </p>
      </SectionBlock>

      <NextAxes ids={["dados-2026", "sobre", "downloads"]} />
    </PageShell>
  );
}
