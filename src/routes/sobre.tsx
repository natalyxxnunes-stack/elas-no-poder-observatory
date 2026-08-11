import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/editorial/PageHero";
import { SectionBlock } from "@/components/editorial/SectionBlock";
import { ContextBox } from "@/components/editorial/ContextBox";
import { NextAxes } from "@/components/editorial/NextAxes";
import { GapNote } from "@/components/GapNote";
import { CENTRAL_PRINCIPLE, CENTRAL_THESIS } from "@/data/architecture";
import { SITE } from "@/data/election-2026";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — Quem são elas? | Proposta, princípios e correções" },
      {
        name: "description",
        content:
          "Quem faz o observatório Quem são elas?, com quais princípios editoriais, como citar os dados e como pedir correção.",
      },
      { property: "og:title", content: "Sobre o Quem são elas?" },
      {
        property: "og:description",
        content:
          "Jornalismo de dados sobre mulheres, eleições e poder: proposta, princípios, transparência e política de correções.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SobrePage,
});

const PRINCIPLES = [
  {
    title: "Fato, interpretação e hipótese são separados",
    body: "O que é dado aparece como dado. O que é leitura editorial aparece como leitura. O que é hipótese aparece como pergunta em aberto.",
  },
  {
    title: "Nenhum percentual sem denominador",
    body: "Todo indicador informa numerador, denominador, universo, fonte e data. Diferenças entre percentuais são expressas em pontos percentuais (p.p.).",
  },
  {
    title: "Correlação não é causalidade",
    body: "Contrastes entre universos e entre grupos são descritivos. Não afirmamos que uma regra causou um resultado sem prova metodológica dessa relação.",
  },
  {
    title: "Dado não disponível não é zero",
    body: "Quando falta fonte, dizemos exatamente o que falta e por quê. Não preenchemos lacuna com estimativa nem com número de ciclo anterior.",
  },
  {
    title: "Gênero e raça estruturam a investigação",
    body: CENTRAL_PRINCIPLE,
  },
  {
    title: "Categorias originais são preservadas",
    body: "Mantemos as categorias declaradas ao TSE. Toda agregação analítica do observatório é declarada como tal.",
  },
] as const;

function SobrePage() {
  return (
    <PageShell>
      <PageHero
        kicker="Sobre"
        question="Quem faz?"
        lead={<p>{CENTRAL_THESIS}</p>}
        aside={
          <div className="editorial-card p-5">
            <p className="kicker">O projeto</p>
            <p className="mt-2 font-display text-lg leading-snug text-ink">
              {SITE.name}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{SITE.tagline}</p>
            <p className="mt-3 font-mono text-[11px] text-muted-foreground">
              {SITE.cycle}
            </p>
          </div>
        }
      />

      <SectionBlock
        kicker="Proposta"
        question="Um observatório, não um placar"
        lead={
          <p>
            O {SITE.name} acompanha o caminho entre candidatura, competição
            eleitoral e poder, investigando como gênero e raça atravessam cada
            etapa — e quem controla cada uma delas. O objetivo é permitir que
            qualquer pessoa entenda o que os dados mostram e confira como foram
            calculados.
          </p>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <ContextBox variant="importa">
            <p>
              Números sobre mulheres na política circulam sem universo e sem data,
              e viram argumento. Um observatório com método aberto permite
              discordar do resultado sem discutir a origem do número.
            </p>
          </ContextBox>
          <ContextBox variant="significa">
            <p>
              Publicamos indicadores provisórios quando a própria base é
              provisória — e dizemos isso na mesma tela em que o número aparece.
            </p>
          </ContextBox>
        </div>
      </SectionBlock>

      <SectionBlock
        kicker="Princípios editoriais"
        question="Seis compromissos que valem para toda página"
        align="wide"
      >
        <ul className="grid gap-4 md:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <li key={p.title} className="editorial-card p-5">
              <h3 className="font-display text-lg text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </li>
          ))}
        </ul>
      </SectionBlock>

      <SectionBlock
        kicker="Metodologia resumida"
        question="De onde vêm os números"
        lead={
          <p>
            A fonte dos indicadores de candidatura é a base oficial do TSE (Dados
            Abertos / Candidatos 2026), processada periodicamente pelo
            observatório. Cada fotografia guarda a data de geração do arquivo, a
            data da coleta, os filtros aplicados e as contagens por universo.
          </p>
        }
        source={
          <>
            Ficha técnica completa em{" "}
            <Link to="/metodo" className="text-plum underline underline-offset-4">
              Método
            </Link>
          </>
        }
      />

      <SectionBlock
        kicker="Equipe e transparência"
        question="Quem assina e como o projeto se sustenta"
      >
        <div className="space-y-4">
          <GapNote label="Informação a completar">
            A composição da equipe, os créditos individuais e a informação sobre
            financiamento ou apoio institucional serão publicados nesta página.
            Enquanto não estiverem confirmados, a lacuna fica declarada em vez de
            preenchida com texto genérico.
          </GapNote>
          <GapNote label="Contato">
            O canal público de contato para dúvidas, pautas e pedidos de correção
            será publicado aqui.
          </GapNote>
        </div>
      </SectionBlock>

      <SectionBlock
        kicker="Uso e correções"
        question="Como citar e como pedir correção"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="editorial-card p-5">
            <h3 className="font-display text-lg text-ink">Como citar</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Cite o observatório, o indicador, a data da fotografia da base e o
              endereço da página. Exemplo de estrutura:
            </p>
            <p className="mt-3 rounded-md bg-muted p-3 font-mono text-[11px] leading-relaxed text-ink">
              {SITE.name} ({SITE.cycle}). [Nome do indicador], fotografia da base
              do TSE de [data]. Disponível em: [endereço da página]. Acesso em:
              [data].
            </p>
          </div>
          <div className="editorial-card p-5">
            <h3 className="font-display text-lg text-ink">
              Política de correções
            </h3>
            <ul className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">
              <li>
                Erro de dado: corrigimos o valor e registramos a correção na
                página do indicador, com data.
              </li>
              <li>
                Erro de método: revisamos a fórmula, recalculamos a série e
                explicamos o que mudou.
              </li>
              <li>
                Atualização de base: não é correção. A mudança de fotografia é
                identificada pela data da base, sem apagar o histórico.
              </li>
            </ul>
          </div>
        </div>
      </SectionBlock>

      <NextAxes ids={["metodo", "downloads", "dados-2026"]} />
    </PageShell>
  );
}
