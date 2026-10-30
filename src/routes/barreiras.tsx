import { createFileRoute, Link } from "@tanstack/react-router";
import { ChartBar, ChartFrame, ChartScale } from "@/components/editorial/ChartFrame";
import { ManchetesStrip } from "@/components/editorial/Manchetes";
import { M_FEMINICIDIO, M_VPG } from "@/data/manchetes";
import { FEMINICIDIO_2025, FEMINICIDIO_META, VPG, VPG_META } from "@/data/violencia-2026";
import { formatInt, formatPct } from "@/lib/format-br";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/editorial/PageHero";
import { SectionBlock } from "@/components/editorial/SectionBlock";
import { InBrief } from "@/components/editorial/InBrief";
import { ContextBox } from "@/components/editorial/ContextBox";
import { StatusTag } from "@/components/editorial/StatusTag";
import { NextAxes } from "@/components/editorial/NextAxes";
import { GapNote } from "@/components/GapNote";

/**
 * ROTA PUBLICADA EM PARTE (28/10/2026): violência política de gênero com o
 * dado agregado do painel do TSE e MPF, e feminicídio com o Anuário do FBSP.
 * O caso a caso e a cor/raça das vítimas aguardam o pedido via LAI.
 */
export const Route = createFileRoute("/barreiras")({
  head: () => ({
    meta: [
      {
        title: "Barreiras à permanência — Quem são elas? | Violência política e exclusão",
      },
      {
        name: "description",
        content:
          "Eixo transversal sobre violência política de gênero, racismo, transfobia, ameaças, assédio e ataques digitais — com critérios explícitos antes de qualquer indicador.",
      },
      { property: "og:title", content: M_VPG.texto },
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

const n = formatInt;

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
    sourceNeed: "Fonte que registre simultaneamente o caso e a cor/raça da pessoa atingida",
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
        question={M_VPG.texto}
        lead={
          <p>
            Violência política de gênero é crime desde 2021 (art. 326-B do Código Eleitoral):
            assediar, constranger, humilhar, perseguir ou ameaçar candidata ou eleita por ela ser
            mulher. O painel público do TSE e do MPF mostra quantos processos chegaram à Justiça
            Eleitoral. Quem são as vítimas, por cargo e cor/raça, o painel não mostra; pedimos esses
            dados pela Lei de Acesso à Informação.
          </p>
        }
        aside={
          <div className="editorial-card p-5">
            <p className="kicker">Compromisso</p>
            <p className="mt-2 font-display text-lg leading-snug text-ink">
              Processo não é caso, e caso não é vítima.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Publicamos o que o registro oficial conta, com o nome certo: processos autuados.
              Subnotificação é a regra neste tema.
            </p>
          </div>
        }
      />

      <ManchetesStrip items={[M_FEMINICIDIO]} label="Violência contra mulheres" />

      <SectionBlock
        id="violencia-politica"
        kicker="Violência política de gênero"
        question="Quantos processos chegaram à Justiça Eleitoral, ano a ano"
        align="wide"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <ChartFrame
            eyebrow="Processos autuados por ano · todas as instâncias"
            title="De 15 processos em 2022 a 224 em 2026"
            note={`Acervo total: ${n(VPG.acervo)} processos, ${n(VPG.tramitando)} ainda tramitando (${formatPct((VPG.tramitando / VPG.acervo) * 100)}), de ${n(VPG.ufs)} estados e ${n(VPG.municipios)} municípios. O painel não mostra 2020 e 2021. Régua de 0 a 250.`}
            source={`Fonte: ${VPG_META.fonte}; dados extraídos em ${VPG_META.extraidoEm}, lidos em ${VPG_META.lidoEm}.`}
            ficha={{
              vendo:
                "Quantos processos de violência política de gênero foram autuados na Justiça Eleitoral em cada ano.",
              contados:
                "Processos de todas as classes (inquérito, representação, ação penal, recurso e outras), em todas as instâncias.",
              denominador:
                "Nenhum: contagem absoluta. Não há universo conhecido de casos para calcular taxa.",
              data: `Dados extraídos pelo TSE em ${VPG_META.extraidoEm}`,
              fonte: VPG_META.fonte,
              limitacao:
                "Um mesmo episódio pode gerar mais de um processo. A soma por ano (460) difere do acervo total (436) no próprio painel, sem explicação; a pergunta está no pedido via LAI. O aumento acompanha também a lei nova e mais denúncias, e o painel não permite separar uma coisa da outra.",
            }}
          >
            <div className="space-y-3">
              {VPG.porAno.map((a) => (
                <ChartBar
                  key={a.ano}
                  label={a.ano}
                  base={`${n(a.processos)} processos`}
                  value={(a.processos / 250) * 100}
                  display={n(a.processos)}
                  barClass="bg-coral"
                />
              ))}
            </div>
            <ChartScale max={250} unit="processos" />
          </ChartFrame>
          <ChartFrame
            eyebrow="Acervo por região de origem"
            title="Sudeste concentra 160 dos 436 processos"
            note="Régua de 0 a 200. A soma das regiões confere com o acervo total."
            source={`Fonte: ${VPG_META.fonte}; dados extraídos em ${VPG_META.extraidoEm}.`}
            ficha={{
              vendo: "Quantos processos do acervo vieram de cada região.",
              contados: "Todos os processos do acervo, pela UF de origem.",
              denominador:
                "Nenhum: contagem absoluta. Regiões têm populações e números de candidatas diferentes.",
              data: `Dados extraídos pelo TSE em ${VPG_META.extraidoEm}`,
              fonte: VPG_META.fonte,
              limitacao:
                "Mais processos numa região pode indicar mais violência ou mais denúncia e estrutura de apuração.",
            }}
          >
            <div className="space-y-3">
              {VPG.porRegiao.map((r) => (
                <ChartBar
                  key={r.regiao}
                  label={r.regiao}
                  base={`${n(r.processos)} processos`}
                  value={(r.processos / 200) * 100}
                  display={n(r.processos)}
                  barClass="bg-plum"
                />
              ))}
            </div>
            <ChartScale max={200} unit="processos" />
          </ChartFrame>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Classes mais comuns no acervo:{" "}
          {VPG.porClasse.map((c) => `${c.classe.toLowerCase()} (${n(c.processos)})`).join(", ")}.{" "}
          <a
            href={VPG_META.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-plum underline-offset-4"
          >
            Abrir o painel do TSE
          </a>
          .
        </p>
      </SectionBlock>

      <SectionBlock
        id="feminicidio"
        tone="butter"
        kicker="Feminicídio"
        question="O que o Anuário de 2026 registra"
        align="wide"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <div className="border-t-2 border-ink pt-3">
            <p className="font-display text-4xl text-ink">{n(FEMINICIDIO_2025.vitimas)}</p>
            <p className="mt-1 text-sm leading-relaxed text-ink/80">
              vítimas de feminicídio em 2025, {FEMINICIDIO_2025.variacao}. Taxa de{" "}
              {FEMINICIDIO_2025.taxa}.
            </p>
          </div>
          <div className="border-t-2 border-ink pt-3">
            <p className="font-display text-4xl text-ink">
              {formatPct(FEMINICIDIO_2025.razoesDeGeneroPct)}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-ink/80">
              das mulheres assassinadas em 2025 foram mortas por razões de gênero, o maior
              percentual desde 2015, quando o crime entrou no Código Penal.
            </p>
          </div>
          <div className="border-t-2 border-ink pt-3">
            <p className="font-display text-4xl text-ink">
              {formatPct(FEMINICIDIO_2025.negrasPct)}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-ink/80">
              das vítimas de feminicídio eram negras (pretas e pardas, somadas pelo próprio
              Anuário).
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Fonte: {FEMINICIDIO_META.fonte}, publicado em {FEMINICIDIO_META.publicadoEm}, pp. 16, 32 e
          160.{" "}
          <a
            href={FEMINICIDIO_META.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-plum underline-offset-4"
          >
            Abrir o Anuário
          </a>
          . O que eleitas dizem sobre o tema, com fonte, está em{" "}
          <Link to="/na-voz-delas" className="underline decoration-plum underline-offset-4">
            Na voz delas
          </Link>
          .
        </p>
      </SectionBlock>

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
                <StatusTag tone="pending">
                  {b.form === "Violência política de gênero"
                    ? "processos agregados publicados; caso a caso via LAI"
                    : "sem indicador publicável"}
                </StatusTag>
              </div>
              <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">{b.note}</p>
              <p className="mt-2 font-mono text-[13px] text-muted-foreground">
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
            Antes de publicar qualquer contagem, precisamos poder responder: qual é o universo, quem
            registrou, em que período e sob qual definição.
          </p>
        }
      >
        <div className="grid gap-4 md:grid-cols-3">
          <ContextBox variant="significa">
            <p>
              Caso relatado, caso denunciado e caso julgado são coisas diferentes. Somá-los cria um
              número que não corresponde a nenhuma realidade.
            </p>
          </ContextBox>
          <ContextBox variant="importa">
            <p>
              Subnotificação é a regra neste tema. Um número baixo pode significar ausência de
              registro, não ausência de violência.
            </p>
          </ContextBox>
          <ContextBox variant="calculamos">
            <p>
              Quando houver base, apresentaremos contagens absolutas com fonte, definição e período
              — e só usaremos percentual se o universo for conhecido.
            </p>
          </ContextBox>
        </div>
        <div className="mt-6">
          <GapNote label="Lacuna declarada">
            Fora a violência política de gênero, em processos agregados, e o feminicídio, pelo
            Anuário, este eixo segue sem indicador até que exista fonte comparável. Nenhum relato
            individual é transformado em estatística.
          </GapNote>
        </div>
      </SectionBlock>

      <NextAxes ids={["quem-chega", "direitos", "metodo"]} />
    </PageShell>
  );
}
