import { createFileRoute, Link } from "@tanstack/react-router";
import { UnpublishedAxis } from "@/components/editorial/UnpublishedAxis";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/editorial/PageHero";
import { SectionBlock } from "@/components/editorial/SectionBlock";
import { InBrief } from "@/components/editorial/InBrief";
import { ContextBox } from "@/components/editorial/ContextBox";
import { StatusTag } from "@/components/editorial/StatusTag";
import { NextAxes } from "@/components/editorial/NextAxes";
import { GapNote } from "@/components/GapNote";
import { QUOTA_RULE, TSE_SOURCE } from "@/data/election-2026";
import { axis } from "@/data/architecture";
import spotStrength from "@/assets/spot-strength.png";
import spotQuota from "@/assets/spot-quota.png";

/**
 * ROTA DESPUBLICADA (lançamento de 5 páginas).
 * Arquivo preservado intencionalmente para republicação futura: o conteúdo e os
 * componentes seguem intactos, apenas o acesso público está redirecionado.
 */
export const Route = createFileRoute("/condicoes")({
  head: () => ({
    meta: [
      { title: "Condições — Quem são elas? | Quem consegue entrar na disputa" },
      {
        name: "description",
        content:
          "As condições anteriores à urna em 2026: regra de composição de candidaturas por gênero, recursos, propaganda, partido ou federação, cargo e território.",
      },
      { property: "og:title", content: "Quem consegue entrar na disputa?" },
      {
        property: "og:description",
        content:
          "Uma candidatura não nasce igual à outra. As condições da disputa começam antes da campanha.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <UnpublishedAxis axisId="condicoes" />,
});

/* Conteúdo preservado para publicação futura deste eixo (não referenciado pela rota). */

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
    note: "Ainda não disponível: valores por partido, federação e candidatura serão integrados a partir das bases de prestação de contas do TSE.",
  },
  {
    title: "Tempo de propaganda",
    body: "A destinação mínima de tempo de propaganda em rádio e televisão a candidaturas de mulheres segue regra própria, com a distribuição das inserções operada por partidos e federações.",
    status: "lacuna" as const,
    note: "Ainda não disponível: a distribuição efetiva de inserções por candidatura não foi apurada.",
  },
  {
    title: "Partido ou federação e posição da candidatura",
    body: "Posição em chapa majoritária, titularidade, suplência e acesso a diretórios locais integram as condições materiais de uma candidatura — e são decididos internamente.",
    status: "lacuna" as const,
    note: "Ainda não disponível: exige classificação documentada das chapas de 2026 e definição declarada de posição estratégica.",
  },
  {
    title: "Território",
    body: "A mesma candidatura enfrenta disputas muito diferentes conforme a unidade da federação e o município: número de vagas, concorrência e estrutura partidária local mudam a chance real de competir.",
    status: "regra" as const,
    note: "Investigável na fotografia atual: UF e cargo constam do registro de candidaturas, e as leituras territoriais usam sempre o denominador da própria circunscrição.",
  },
  {
    title: "Apuração de fraude à regra de composição",
    body: "Casos de fraude à regra de composição de candidaturas por gênero podem ser apurados pela Justiça Eleitoral e são analisados individualmente, conforme as circunstâncias e as provas de cada processo. O observatório não classifica candidaturas concretas sem decisão específica.",
    status: "lacuna" as const,
    note: "Ainda não disponível: um levantamento de decisões exigiria consulta processual documentada, com identificação de cada caso e do respectivo estágio.",
  },
  {
    title: "Violência política de gênero",
    body: "Condição de disputa que não aparece no registro de candidatura e que incide sobre a permanência na campanha e no mandato.",
    status: "lacuna" as const,
    note: "Ainda não disponível: sem base pública consolidada e comparável para 2026.",
  },
];

function CondicoesPage() {
  const a = axis("condicoes");
  return (
    <PageShell>
      <PageHero
        kicker="Condições"
        question={a.question}
        lead={
          <p>
            Uma candidatura não nasce igual à outra. Regras de composição, recursos públicos, tempo
            de propaganda, posição na chapa e território formam as condições da disputa — e cada uma
            tem base de dados própria.
          </p>
        }
        image={spotStrength}
      />

      <div className="pb-4">
        <InBrief
          found={
            <>
              As condições de entrada são reguladas em camadas diferentes: uma regra alcança o
              registro de candidaturas, outra alcança dinheiro e propaganda, e várias decisões ficam
              inteiramente com o partido.
            </>
          }
          matters={
            <>
              Tratar “estar na lista” como equivalente a “disputar em igualdade” apaga exatamente o
              ponto em que a desigualdade se organiza.
            </>
          }
          unknown={
            <>
              Recursos e propaganda efetivamente recebidos em 2026, posição das candidaturas nas
              chapas e casos de fraude à regra de composição.
            </>
          }
        />
      </div>

      <SectionBlock
        kicker="Sete condições"
        question="O que já dá para investigar e o que ainda falta"
        align="wide"
      >
        <div className="space-y-4">
          {CONDITIONS.map((c) => (
            <article key={c.title} className="editorial-card p-5 md:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="font-display text-xl text-ink">{c.title}</h3>
                <StatusTag tone={c.status === "regra" ? "ok" : "pending"}>
                  {c.status === "regra" ? "investigável agora" : "ainda não disponível"}
                </StatusTag>
              </div>
              <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">{c.body}</p>
              <div className="mt-4">
                {c.status === "regra" ? (
                  <p className="border-l-[3px] border-plum bg-secondary px-4 py-3 text-sm leading-relaxed text-ink">
                    {c.note}
                  </p>
                ) : (
                  <GapNote label="Lacuna declarada">{c.note}</GapNote>
                )}
              </div>
            </article>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        kicker="O alcance da regra"
        question={`A regra de ${QUOTA_RULE.floor}% a ${QUOTA_RULE.ceiling}% trata de quem entra na lista — e só disso.`}
        lead={
          <p>
            Ela incide sobre a composição das candidaturas proporcionais de cada partido ou
            federação. Não trata de recursos, tempo de propaganda, apoio de diretório nem de posição
            em chapa majoritária: essas condições seguem regras e bases de dados distintas.
          </p>
        }
        source={
          <>
            Base legal:{" "}
            <a href={QUOTA_RULE.sourceUrl} className="underline" target="_blank" rel="noreferrer">
              Lei 9.504/1997, art. 10, §3º
            </a>{" "}
            · Indicadores de candidatura: {TSE_SOURCE.name} ·{" "}
            <Link to="/metodo" className="text-plum underline underline-offset-4">
              ver o método
            </Link>
          </>
        }
      >
        <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-start">
          <img
            src={spotQuota}
            alt=""
            aria-hidden
            loading="lazy"
            width={640}
            height={640}
            className="h-28 w-28 md:h-36 md:w-36"
          />
          <div className="grid gap-4">
            <ContextBox variant="significa">
              <p>{QUOTA_RULE.financingNote}</p>
            </ContextBox>
            <ContextBox variant="importa">
              <p>
                Quem decide a distribuição concreta de condições é o partido ou a federação. Por
                isso as condições de entrada e o controle partidário são investigados como eixos
                separados.
              </p>
            </ContextBox>
            <ContextBox variant="calculamos">
              <p>
                Nas leituras por partido ou federação, o denominador é sempre o total de
                candidaturas daquele partido no mesmo universo eleitoral — nunca o total nacional.
              </p>
            </ContextBox>
          </div>
        </div>
      </SectionBlock>

      <NextAxes ids={["quem-controla", "dinheiro", "funil"]} />
    </PageShell>
  );
}
