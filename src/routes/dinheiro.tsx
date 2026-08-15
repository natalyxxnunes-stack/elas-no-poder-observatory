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
import { axis } from "@/data/architecture";
import { QUOTA_RULE } from "@/data/election-2026";
import spotQuota from "@/assets/spot-quota.png";

/**
 * ROTA DESPUBLICADA (lançamento de 5 páginas).
 * Arquivo preservado intencionalmente para republicação futura: o conteúdo e os
 * componentes seguem intactos, apenas o acesso público está redirecionado.
 */
export const Route = createFileRoute("/dinheiro")({
  head: () => ({
    meta: [
      { title: "Dinheiro — Quem são elas? | Quem recebe condições para competir" },
      {
        name: "description",
        content:
          "O dinheiro chega às mesmas mulheres que aparecem nas candidaturas? A arquitetura de investigação de recursos por gênero, cor/raça, partido, cargo e território.",
      },
      { property: "og:title", content: "Quem recebe condições para competir?" },
      {
        property: "og:description",
        content:
          "Recursos públicos de campanha e tempo de propaganda: a distância entre estar na lista e ter condições de disputar.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <UnpublishedAxis axisId="dinheiro" />,
});

/* Conteúdo preservado para publicação futura deste eixo (não referenciado pela rota). */

/** Camadas de apuração financeira previstas, na ordem em que serão abertas. */
const MONEY_LAYERS = [
  {
    id: "genero-raca",
    label: "Gênero × cor/raça × recursos",
    question: "O dinheiro chega às mesmas mulheres que aparecem nas listas?",
    needs:
      "Receitas e despesas por candidatura na prestação de contas de 2026, cruzadas com gênero e cor/raça do registro",
  },
  {
    id: "partido",
    label: "Recursos por partido ou federação",
    question: "Como cada partido distribui internamente o que recebe?",
    needs: "Repasses partidários por candidatura, com denominador do próprio partido",
  },
  {
    id: "cargo",
    label: "Recursos por cargo",
    question: "A distribuição muda entre disputas proporcionais e majoritárias?",
    needs: "Cargo do registro cruzado com valores declarados, universos separados",
  },
  {
    id: "uf",
    label: "Recursos por UF",
    question: "Onde o financiamento se concentra?",
    needs: "UF do registro cruzada com valores declarados",
  },
  {
    id: "titularidade",
    label: "Titularidade e suplência",
    question: "Quem recebe dinheiro entre titulares e suplentes?",
    needs: "Campo de titularidade/suplência do registro",
  },
  {
    id: "competitividade",
    label: "Recursos e competitividade",
    question: "Recursos acompanham as candidaturas com mais chance de disputar?",
    needs: "Indicador de competitividade previamente definido e publicado no método",
  },
] as const;

function DinheiroPage() {
  const a = axis("dinheiro");
  return (
    <PageShell>
      <PageHero
        kicker="Dinheiro"
        question="O dinheiro chega às mesmas mulheres que aparecem nas candidaturas?"
        lead={<p>{a.summary}</p>}
        image={spotQuota}
      />

      <div className="pb-4">
        <InBrief
          found={
            <>
              Nada ainda. A base financeira de 2026 não está disponível, e este observatório não
              publica número estimado, projetado ou herdado de ciclos anteriores.
            </>
          }
          matters={
            <>
              Existir na lista e ter condições de competir são coisas diferentes. A regra de
              composição de candidaturas alcança o registro; a distribuição de dinheiro e propaganda
              tem regras próprias.
            </>
          }
          unknown={
            <>
              Quanto foi repassado a cada candidatura em 2026, por gênero, cor/raça, partido, cargo,
              UF e titularidade.
            </>
          }
        />
      </div>

      <SectionBlock
        kicker="A regra"
        question="Financiamento não é a mesma coisa que cota de candidaturas"
        lead={<p>{QUOTA_RULE.financingNote}</p>}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <ContextBox variant="significa">
            <p>
              A regra de composição de candidaturas de {QUOTA_RULE.floor}% a {QUOTA_RULE.ceiling}%
              por gênero incide sobre quem é registrada nas eleições proporcionais, por partido ou
              federação.
            </p>
          </ContextBox>
          <ContextBox variant="importa">
            <p>
              As regras de destinação mínima de recursos públicos de campanha e de tempo de
              propaganda são distintas e podem alcançar disputas majoritárias e proporcionais.
              Confundir as duas leva a conclusões erradas.
            </p>
          </ContextBox>
        </div>
      </SectionBlock>

      <SectionBlock
        kicker="Arquitetura preparada"
        question="As seis camadas que abrirão quando a fonte existir"
        align="wide"
      >
        <ul className="grid gap-4 md:grid-cols-2">
          {MONEY_LAYERS.map((l) => (
            <li key={l.id} className="editorial-card p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-lg text-ink">{l.label}</h3>
                <StatusTag tone="pending">aguardando fonte</StatusTag>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{l.question}</p>
              <p className="mt-3 font-mono text-[12px] text-muted-foreground">Exige: {l.needs}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <GapNote label="Lacuna declarada">
            Enquanto a prestação de contas de 2026 não estiver disponível, nenhuma célula deste eixo
            recebe valor.
          </GapNote>
        </div>
      </SectionBlock>

      <SectionBlock
        kicker="Como vamos calcular"
        question="Denominador antes do número"
        source={
          <>
            Método completo em{" "}
            <Link to="/metodo" className="text-plum underline underline-offset-4">
              Como sabemos?
            </Link>
          </>
        }
      >
        <ContextBox variant="calculamos">
          <p>
            Toda leitura financeira será apresentada com valor total, universo de candidaturas
            consideradas, denominador e data da base. Valores por candidatura serão lidos em
            medianas, não apenas em médias, porque poucos repasses muito altos distorcem a média.
            Recursos e votos serão relacionados sem afirmar causalidade.
          </p>
        </ContextBox>
      </SectionBlock>

      <NextAxes ids={["quem-controla", "votos", "quem-sao-elas"]} />
    </PageShell>
  );
}
