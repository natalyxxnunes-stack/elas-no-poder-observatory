import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/editorial/PageHero";
import aberturaAsset from "@/assets/aberturasobre.webp.asset.json";
import { SectionBlock } from "@/components/editorial/SectionBlock";
import { ContextBox } from "@/components/editorial/ContextBox";
import { NextAxes } from "@/components/editorial/NextAxes";
import { PullQuote } from "@/components/editorial/PullQuote";
import { SITE } from "@/data/election-2026";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — Quem são elas? | Quem faz e por que existe" },
      {
        name: "description",
        content:
          "Nataly Nunes, jornalista, sobre o Quem são elas?: projeto independente de jornalismo de dados sobre mulheres na política, com método aberto, transparência e correções.",
      },
      { property: "og:title", content: "Sobre o Quem são elas?" },
      {
        property: "og:description",
        content:
          "Um projeto independente de jornalismo de dados sobre mulheres, eleições e poder: quem faz, por que existe e como conferir os números.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SobrePage,
});

const COMMITMENTS = [
  "Fato, interpretação e hipótese são coisas diferentes.",
  "Nenhum percentual aparece sem que você saiba qual é o universo daquele cálculo.",
  "Contraste entre grupos é descrição, não explicação de causa.",
  "Todo dado tem uma fonte, e toda fonte precisa de contexto.",
  "A metodologia precisa poder ser entendida e conferida.",
  "Erros são corrigidos de forma transparente.",
] as const;

function SobrePage() {
  return (
    <PageShell>
      <PageHero
        wide
        kicker="Sobre"
        question="Quem faz?"
        lead={
          <p>
            Eu sou Nataly Nunes, jornalista. Criei o {SITE.name} porque me
            incomodo com ter poucas mulheres na política — e com a quantidade de
            números sobre elas que circulam por aí sem que a gente consiga
            entender direito o que estão dizendo.
          </p>
        }
        image={aberturaAsset.url}
        imageAlt="Ilustração editorial: mesa de trabalho jornalística com caderno de metodologia, gráficos e recortes"
        aside={
          <div className="editorial-card p-5">
            <p className="kicker">O projeto</p>
            <p className="mt-2 font-display text-lg leading-snug text-ink">
              {SITE.name}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{SITE.tagline}</p>
            <p className="mt-3 font-mono text-[12px] text-muted-foreground">
              {SITE.cycle}
            </p>
          </div>
        }
      />

      {/* Ficha do projeto — cartão institucional escaneável no topo da página */}
      <section className="py-8 md:py-10">
        <div className="poster-frame p-5 md:p-7">
          <p className="kicker">Ficha do projeto</p>
          <dl className="mt-5 grid gap-6 md:grid-cols-2 md:gap-x-8 md:gap-y-6">
            <div>
              <dt className="font-mono text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
                Responsável editorial
              </dt>
              <dd className="mt-1 text-ink">Nataly Nunes, jornalista</dd>
            </div>
            <div>
              <dt className="font-mono text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
                O que é
              </dt>
              <dd className="mt-1 text-ink">
                Observatório independente de jornalismo de dados sobre mulheres,
                eleições e poder no Brasil
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
                Fontes primárias
              </dt>
              <dd className="mt-1 text-ink">
                Dados abertos do TSE (candidaturas e resultados); Censo 2022 /
                IBGE (referência populacional)
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
                Atualização
              </dt>
              <dd className="mt-1 text-ink">
                Por fotografias datadas, ao longo do ciclo eleitoral de 2026
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
                Método
              </dt>
              <dd className="mt-1 text-ink">
                Aberto e conferível: cada número tem fonte, denominador e data
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
                Uso de IA
              </dt>
              <dd className="mt-1 text-ink">
                Ferramenta de apoio (pesquisa, código, análise), sob direção
                editorial humana; sem geração de dados
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
                Correções
              </dt>
              <dd className="mt-1 text-ink">
                Registradas de forma transparente, com data
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
                Contato
              </dt>
              <dd className="mt-1 text-ink">
                <a
                  href="mailto:contato@quemsaoelas.com.br"
                  className="text-plum underline underline-offset-4"
                >
                  contato@quemsaoelas.com.br
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>


      <SectionBlock
        kicker="Quem faz"
        question="Um projeto independente, feito por mim"
        lead={
          <p>
            Um percentual aparece. Um gráfico aparece. Uma manchete aparece. E,
            muitas vezes, ninguém conta de onde aquele número veio, quem está
            sendo considerado, quem ficou de fora ou o que aconteceu antes de ele
            chegar até ali. Foi daí que nasceu o projeto.
          </p>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <ContextBox variant="significa">
            <p>
              O {SITE.name} é um projeto independente, feito por mim, com o apoio
              de ferramentas de inteligência artificial. Eu faço as perguntas,
              defino os caminhos da apuração, escolho as fontes, tomo as decisões
              editoriais e sou responsável pelo que é publicado. Uso inteligência
              artificial como ferramenta de trabalho — para pesquisar, organizar e
              analisar dados, escrever e revisar código, testar possibilidades e
              construir algumas das soluções que você encontra aqui.
            </p>
          </ContextBox>
          <ContextBox variant="importa">
            <p>
              A IA ajuda a fazer o trabalho. A responsabilidade pelo trabalho é
              minha. Por isso, sempre que ela participa de alguma etapa
              importante, isso é registrado como parte da transparência do
              projeto.
            </p>
          </ContextBox>
        </div>
      </SectionBlock>

      <SectionBlock
        kicker="Por que existe"
        question="Existe uma história inteira entre um número e outro"
        lead={
          <p>
            A presença das mulheres na política costuma ser apresentada como um
            número: quantas se candidataram, quantas foram eleitas, qual
            porcentagem representam. Mas existe uma história inteira entre uma
            coisa e outra.
          </p>
        }
      >
        <div className="max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
          <p>
            Quero olhar para esse caminho. Quem se candidata? Quem consegue chegar
            à urna? Quem é eleita? O que muda entre partidos, estados, cargos e
            eleições? E o que os dados realmente conseguem nos contar sobre tudo
            isso?
          </p>
          <p>
            O {SITE.name} nasceu para transformar esses números em perguntas e
            tentar respondê-las com jornalismo, dados públicos e transparência
            sobre como cada resultado foi construído. Os dados têm fonte. Os
            cálculos podem ser conferidos. As escolhas são explicadas. E fato,
            interpretação e hipótese aparecem separados.
          </p>
          <p>
            A ideia é simples: você pode discordar da minha leitura, questionar
            uma escolha metodológica, até chegar a outra conclusão — mas precisa
            conseguir olhar para os mesmos dados e entender como eu cheguei até
            aqui.
          </p>
        </div>
      </SectionBlock>

      <PullQuote>
        Você pode discordar da minha leitura, mas precisa conseguir ver como
        cheguei até aqui.
      </PullQuote>



      <SectionBlock
        tone="plum"
        kicker="Um projeto independente"
        question="Sem financiamento e sem apoio institucional"
        lead={
          <p>
            O {SITE.name} é independente e, atualmente, não recebe financiamento
            nem apoio institucional. Isso também faz parte da história do
            projeto. Ele existe porque eu quis fazer esse trabalho — e porque
            acredito que jornalismo de dados não precisa ser complicado, distante
            ou feito apenas para quem já entende de estatística.
          </p>
        }
      />

      <SectionBlock
        kicker="Transparência"
        question="Nada aqui é definitivo demais para ser corrigido"
        lead={
          <p>
            Não existe pesquisa perfeita, banco de dados perfeito ou análise que
            não possa ser melhorada. Por isso, as fontes, os critérios e a
            metodologia estão disponíveis. Quando uma escolha precisar ser
            explicada, ela será explicada. Quando um dado precisar ser corrigido,
            será corrigido.
          </p>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="poster-frame p-5 md:p-6">
            <h3 className="font-display text-xl text-ink">Fale comigo</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Se você encontrar um erro, discordar de uma análise ou perceber que
              alguma coisa ficou de fora, me escreva. É assim que o projeto
              melhora.
            </p>
            <p className="mt-3 font-mono text-[12px] text-ink">
              Contato:{" "}
              <a
                href="mailto:contato@quemsaoelas.com.br"
                className="text-plum underline underline-offset-4"
              >
                contato@quemsaoelas.com.br
              </a>
            </p>
          </div>
          <div className="poster-frame p-5 md:p-6">
            <h3 className="font-display text-xl text-ink">Como citar</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Os dados e análises do {SITE.name} podem ser utilizados e citados.
              Só peço que a fonte seja identificada e que o contexto da
              informação seja preservado.
            </p>
            <p className="mt-3 rounded-md bg-muted p-3 font-mono text-[12px] leading-relaxed text-ink">
              Fonte: {SITE.name} — Observatório independente sobre mulheres na
              política brasileira.
            </p>
          </div>
        </div>
      </SectionBlock>

      <SectionBlock
        tone="solar"
        kicker="O compromisso"
        question="Os princípios editoriais que valem para toda página"
        align="wide"
      >
        <ul className="grid gap-5 md:grid-cols-2">
          {COMMITMENTS.map((c, i) => (
            <li key={c} className="poster-frame p-5">
              <span
                aria-hidden
                className="poster-figure block text-3xl text-coral-ink md:text-4xl"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 font-display text-lg leading-snug text-ink">
                {c}
              </p>
            </li>
          ))}
        </ul>
      </SectionBlock>

      <SectionBlock
        kicker="Correções"
        question="O que corrigimos e como"
      >
        <ul className="max-w-3xl space-y-3 text-sm leading-relaxed text-muted-foreground">
          <li>
            Erro de dado: corrigimos o valor e registramos a correção na página
            do indicador, com data.
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
      </SectionBlock>

      <NextAxes ids={["dados-2026", "metodo", "downloads"]} />
    </PageShell>
  );
}
