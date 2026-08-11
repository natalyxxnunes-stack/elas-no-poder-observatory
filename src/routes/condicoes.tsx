import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CycleStrip } from "@/components/CycleStrip";
import { GapNote } from "@/components/GapNote";
import { QUOTA_RULE, TSE_SOURCE } from "@/data/election-2026";
import spotStrength from "@/assets/spot-strength.png";
import spotQuota from "@/assets/spot-quota.png";

export const Route = createFileRoute("/condicoes")({
  head: () => ({
    meta: [
      { title: "Condições — Quem são elas? | Regras, recursos e mídia" },
      {
        name: "description",
        content:
          "As condições da disputa em 2026: regra de composição de candidaturas de 30%–70% por gênero, recursos públicos de campanha, tempo de propaganda e estrutura partidária.",
      },
      { property: "og:title", content: "Condições da disputa — Quem são elas?" },
      {
        property: "og:description",
        content:
          "Regra de composição de candidaturas, recursos públicos de campanha e tempo de propaganda: o que sustenta ou trava uma candidatura de mulher.",
      },
    ],
  }),
  component: CondicoesPage,
});

const CONDITIONS = [
  {
    title: "Composição de candidaturas: 30% a 70% por gênero",
    body: `${QUOTA_RULE.scope} ${QUOTA_RULE.outOfScope}`,
    status: "regra" as const,
    note: QUOTA_RULE.descriptiveReading,
  },
  {
    title: "Recursos públicos de campanha",
    body: "Desde 2018, recursos públicos de campanha devem observar percentual mínimo destinado a candidaturas de mulheres. Essas regras de financiamento são distintas da regra de composição de candidaturas e podem alcançar disputas proporcionais e majoritárias.",
    status: "lacuna" as const,
    note: "Ainda não disponível: valores por partido, federação e candidatura serão integrados em módulo próprio, a partir das bases de prestação de contas do TSE.",
  },
  {
    title: "Tempo de propaganda",
    body: "A destinação mínima de tempo de propaganda em rádio e televisão a candidaturas de mulheres segue regra própria, com a distribuição das inserções operada por partidos e federações.",
    status: "lacuna" as const,
    note: "Ainda não disponível: distribuição efetiva de inserções por candidatura não foi apurada nesta etapa.",
  },
  {
    title: "Estrutura partidária e posição na chapa",
    body: "Posição em chapa majoritária, condição de suplência e acesso a diretórios locais integram as condições materiais de uma candidatura.",
    status: "lacuna" as const,
    note: "Ainda não disponível: exige classificação documentada das chapas de 2026, não realizada nesta etapa.",
  },
  {
    title: "Apuração de fraude à regra de composição",
    body: "Casos de fraude à regra de composição de candidaturas por gênero podem ser apurados pela Justiça Eleitoral e são analisados individualmente, conforme as circunstâncias e as provas de cada processo. O observatório não classifica candidaturas concretas sem decisão específica.",
    status: "lacuna" as const,
    note: "Ainda não disponível: um levantamento de decisões exigiria consulta processual documentada, com identificação de cada caso e do respectivo estágio.",
  },
  {
    title: "Violência política de gênero",
    body: "Condição de disputa que não aparece no registro de candidatura e que incide sobre a permanência na campanha.",
    status: "lacuna" as const,
    note: "Ainda não disponível: sem base pública consolidada e comparável para 2026 nesta etapa do projeto.",
  },
];

function CondicoesPage() {
  return (
    <div className="paper-grain min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 md:px-8">
        <header className="grid gap-8 py-14 md:grid-cols-[1.3fr_auto] md:items-center">
          <div>
            <p className="kicker">Condições</p>
            <h1 className="mt-4 max-w-2xl font-display text-4xl leading-[1.08] text-ink md:text-5xl">
              A regra do jogo antes do primeiro voto
            </h1>
            <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
              Uma candidatura não nasce igual à outra. Regras de composição,
              recursos públicos, tempo de propaganda e posição na chapa formam as
              condições da disputa — e cada uma delas tem base de dados própria.
            </p>
          </div>
          <img
            src={spotStrength}
            alt=""
            aria-hidden
            loading="lazy"
            width={640}
            height={640}
            className="h-32 w-32 justify-self-start md:h-44 md:w-44"
          />
        </header>

        <section aria-label="Condições da disputa" className="space-y-4 pb-14">
          {CONDITIONS.map((c) => (
            <article key={c.title} className="editorial-card p-5 md:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="font-display text-xl text-ink">{c.title}</h2>
                <span
                  className={`font-mono text-[11px] uppercase tracking-wider ${
                    c.status === "regra" ? "text-plum" : "text-coral"
                  }`}
                >
                  {c.status === "regra"
                    ? "Regra vigente"
                    : "AINDA NÃO DISPONÍVEL"}
                </span>
              </div>
              <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
                {c.body}
              </p>
              <div className="mt-4">
                {c.status === "regra" ? (
                  <p className="border-l-[3px] border-plum bg-secondary px-4 py-3 text-sm text-ink">
                    {c.note}
                  </p>
                ) : (
                  <GapNote label="Lacuna declarada">{c.note}</GapNote>
                )}
              </div>
            </article>
          ))}
        </section>

        <section className="rule-top grid gap-8 pt-10 pb-14 md:grid-cols-[auto_1fr] md:items-center">
          <img
            src={spotQuota}
            alt=""
            aria-hidden
            loading="lazy"
            width={640}
            height={640}
            className="h-28 w-28 md:h-36 md:w-36"
          />
          <div>
            <h2 className="kicker">O alcance da regra de composição</h2>
            <p className="mt-3 max-w-2xl font-display text-2xl leading-snug text-ink">
              A regra de {QUOTA_RULE.floor}% a {QUOTA_RULE.ceiling}% incide sobre
              a composição das candidaturas proporcionais de cada partido ou
              federação.
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Ela trata de quem consta do conjunto de candidaturas registradas.
              Não trata de recursos, tempo de propaganda, apoio de diretório nem
              de posição em chapa majoritária — essas condições seguem regras e
              bases de dados distintas. {QUOTA_RULE.financingNote}
            </p>
            <p className="mt-3 font-mono text-[11px] text-muted-foreground">
              Base legal:{" "}
              <a
                href={QUOTA_RULE.sourceUrl}
                className="underline"
                target="_blank"
                rel="noreferrer"
              >
                Lei 9.504/1997, art. 10, §3º
              </a>{" "}
              · Indicadores de candidatura: {TSE_SOURCE.name}
            </p>
          </div>
        </section>

        <div className="pb-10">
          <CycleStrip activeId="recursos" />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
