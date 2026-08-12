import { createFileRoute, redirect } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/editorial/PageHero";
import { SectionBlock } from "@/components/editorial/SectionBlock";
import { InBrief } from "@/components/editorial/InBrief";
import { ContextBox } from "@/components/editorial/ContextBox";
import { StatusTag } from "@/components/editorial/StatusTag";
import { NextAxes } from "@/components/editorial/NextAxes";
import { GapNote } from "@/components/GapNote";

/**
 * ROTA DESPUBLICADA (lançamento de 5 páginas).
 * Arquivo preservado intencionalmente para republicação futura: o conteúdo e os
 * componentes seguem intactos, apenas o acesso público está redirecionado.
 */
export const Route = createFileRoute("/barreiras")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  head: () => ({
    meta: [
      {
        title:
          "Barreiras à permanência — Quem são elas? | Violência política e exclusão",
      },
      {
        name: "description",
        content:
          "Eixo transversal sobre violência política de gênero, racismo, transfobia, ameaças, assédio e ataques digitais — com critérios explícitos antes de qualquer indicador.",
      },
      { property: "og:title", content: "O que impede permanecer?" },
      {
        property: "og:description",
        content:
          "Entrar na disputa é uma barreira. Permanecer é outra. O que é possível medir com fontes comparáveis.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BarreirasPage,
});

const BARRIER_FORMS = [
  {
    form: "Violência política de gênero",
    note: "Condutas que restringem o exercício de direitos políticos em razão do gênero, incluindo tipificação penal e eleitoral específica.",
    sourceNeed:
      "Registros processuais e administrativos comparáveis, com critério de contagem declarado",
  },
  {
    form: "Racismo na disputa política",
    note: "Ataques e barreiras dirigidos a candidatas e eleitas negras e indígenas.",
    sourceNeed:
      "Fonte que registre simultaneamente o caso e a cor/raça da pessoa atingida",
  },
  {
    form: "Transfobia",
    note: "Exclusão e violência contra candidaturas trans e travestis.",
    sourceNeed:
      "Fonte própria: o registro eleitoral não capta identidade trans ou travesti de forma confiável",
  },
  {
    form: "Ameaças e assédio",
    note: "Ameaças diretas, perseguição e assédio no exercício do mandato ou da campanha.",
    sourceNeed: "Denúncias com metodologia estável e universo conhecido",
  },
  {
    form: "Ataques digitais",
    note: "Campanhas coordenadas de desinformação e agressão em plataformas.",
    sourceNeed:
      "Coleta com metodologia auditável e recorte temporal declarado; amostras não representativas não geram percentual",
  },
] as const;

function BarreirasPage() {
  return (
    <PageShell>
      <PageHero
        kicker="Barreiras à permanência"
        question="O que impede permanecer?"
        lead={
          <p>
            Este é um eixo transversal: atravessa candidatura, campanha, mandato e
            poder. Ele só recebe indicador quando houver fonte comparável e
            metodologia defensável — e não antes.
          </p>
        }
        aside={
          <div className="editorial-card p-5">
            <p className="kicker">Compromisso</p>
            <p className="mt-2 font-display text-lg leading-snug text-ink">
              Não inventamos indicador de violência.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Número sem universo conhecido, em tema de violência, produz dano
              real. Preferimos a lacuna declarada.
            </p>
          </div>
        }
      />

      <div className="pb-4">
        <InBrief
          found={
            <>
              Um mapa das formas documentadas de exclusão e do tipo de fonte que
              cada uma exigiria para virar indicador publicável.
            </>
          }
          matters={
            <>
              A barreira não termina no registro da candidatura. Permanecer,
              exercer mandato e disputar espaços de decisão envolve custos que os
              dados eleitorais não mostram.
            </>
          }
          unknown={
            <>
              Frequência, distribuição e evolução dos casos. Não há, hoje, base
              nacional comparável que permita percentual confiável neste eixo.
            </>
          }
        />
      </div>

      <SectionBlock
        kicker="Formas documentadas"
        question="O que investigamos — e o que cada coisa exigiria"
        align="wide"
      >
        <ul className="divide-y divide-rule border-y border-rule">
          {BARRIER_FORMS.map((b) => (
            <li key={b.form} className="py-5">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="font-display text-xl text-ink">{b.form}</h3>
                <StatusTag tone="pending">sem indicador publicável</StatusTag>
              </div>
              <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">
                {b.note}
              </p>
              <p className="mt-2 font-mono text-[11px] text-muted-foreground">
                Exige: {b.sourceNeed}
              </p>
            </li>
          ))}
        </ul>
      </SectionBlock>

      <SectionBlock
        kicker="Critérios"
        question="Quando um caso vira dado"
        lead={
          <p>
            Antes de publicar qualquer contagem, precisamos poder responder: qual
            é o universo, quem registrou, em que período e sob qual definição.
          </p>
        }
      >
        <div className="grid gap-4 md:grid-cols-3">
          <ContextBox variant="significa">
            <p>
              Caso relatado, caso denunciado e caso julgado são coisas diferentes.
              Somá-los cria um número que não corresponde a nenhuma realidade.
            </p>
          </ContextBox>
          <ContextBox variant="importa">
            <p>
              Subnotificação é a regra neste tema. Um número baixo pode significar
              ausência de registro, não ausência de violência.
            </p>
          </ContextBox>
          <ContextBox variant="calculamos">
            <p>
              Quando houver base, apresentaremos contagens absolutas com fonte,
              definição e período — e só usaremos percentual se o universo for
              conhecido.
            </p>
          </ContextBox>
        </div>
        <div className="mt-6">
          <GapNote label="Lacuna declarada">
            Este eixo permanece sem indicador até que exista fonte comparável.
            Nenhum relato individual é transformado em estatística.
          </GapNote>
        </div>
      </SectionBlock>

      <NextAxes ids={["quem-chega", "direitos", "metodo"]} />
    </PageShell>
  );
}
