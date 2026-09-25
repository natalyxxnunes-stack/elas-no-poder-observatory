import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { EditorialOpening } from "@/components/editorial/EditorialOpening";
import { SectionBlock } from "@/components/editorial/SectionBlock";
import { InBrief } from "@/components/editorial/InBrief";
import { ContextBox } from "@/components/editorial/ContextBox";
import { NextAxes } from "@/components/editorial/NextAxes";
import { ComoSabemos } from "@/components/editorial/ComoSabemos";
import { QUOTA_RULE } from "@/data/election-2026";
import {
  DUPLICATE_ROWS_REMOVED,
  FINANCE_BASE_LABEL,
  financeSnapshot,
} from "@/data/tse-finance-snapshot";
import { FinanceByOffice, FinanceByUf, FinanceCoverage, FinanceParties, FinanceRace } from "@/components/editorial/FinanceOverview";
import { formatInt } from "@/lib/format-br";

/**
 * Fase 1 publicada: receitas declaradas por gênero, cor/raça, cargo, partido e UF.
 */
export const Route = createFileRoute("/dinheiro")({
  head: () => ({
    meta: [
      {
        title:
          "Entre as candidatas a deputada, as brancas recebem mais, até nos maiores partidos | Quem são elas?",
      },
      {
        name: "description",
        content:
          "Receitas declaradas nas campanhas de 2026 por gênero, cor/raça, cargo, partido e UF, com cobertura, denominadores e limites da base em andamento.",
      },
      {
        property: "og:title",
        content:
          "Entre as candidatas a deputada, as brancas recebem mais, até nos maiores partidos",
      },
      {
        property: "og:description",
        content: `Receitas declaradas pelas candidaturas de mulheres nas contas de campanha em andamento, por cargo, cor/raça, partido e UF. Fotografia de ${FINANCE_BASE_LABEL}.`,
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DinheiroPage,
});

/** Camadas de apuração financeira previstas, na ordem em que serão abertas. */
const MONEY_LAYERS = [
  {
    id: "genero-raca",
    label: "Gênero × cor/raça × recursos",
    question: "O dinheiro chega às mesmas mulheres que aparecem nas listas?",
    needs:
      "Receita agregada por candidatura, com gênero e cor/raça do próprio arquivo de receitas",
    ready: true,
  },
  {
    id: "partido",
    label: "Recursos por partido ou federação",
    question: "Como cada partido distribui internamente o que recebe?",
    needs: "Repasses partidários por candidatura, com denominador do próprio partido",
    ready: true,
  },
  {
    id: "cargo",
    label: "Recursos por cargo",
    question: "A distribuição muda entre disputas proporcionais e majoritárias?",
    needs: "Cargo do registro cruzado com valores declarados, universos separados",
    ready: true,
  },
  {
    id: "uf",
    label: "Recursos por UF",
    question: "Onde o financiamento se concentra?",
    needs: "UF do registro cruzada com valores declarados",
    ready: true,
  },
  {
    id: "titularidade",
    label: "Titularidade e suplência",
    question: "Quem recebe dinheiro entre titulares e suplentes?",
    needs: "Campo de titularidade/suplência do registro",
    ready: false,
  },
  {
    id: "competitividade",
    label: "Recursos e competitividade",
    question: "Recursos acompanham as candidaturas com mais chance de disputar?",
    needs: "Indicador de competitividade previamente definido e publicado no método",
    ready: false,
  },
] as const;

function DinheiroPage() {
  return (
    <PageShell breadcrumb={[{ label: "Investigação", to: "/investigacoes" }, { label: "Dinheiro" }]}>
      <EditorialOpening
        variant="financial"
        kicker="Dinheiro"
        question="Entre as candidatas a deputada, as brancas recebem mais, até nos maiores partidos"
        lead={<p>Nas disputas para deputada, mulheres são 36,0% das candidaturas com receita declarada até 25/09 e ficam com 34,9% do dinheiro, fatia próxima da presença delas. A diferença aparece dentro do grupo. Nos 12 partidos com mais receita, que concentram 90% do dinheiro, a mediana das candidatas brancas é R$ 130 mil; a das pardas, R$ 87 mil; a das pretas, R$ 75 mil. Nas disputas por governo, Senado e Presidência, pesa sobretudo quem lança a candidata: 13 das 17 candidatas pretas são de partidos menores, com pouca receita.</p>}
        layers={MONEY_LAYERS.map((layer) => layer.label)}
        gap="Prestação de contas em andamento · receita, não despesa · valores sujeitos a atualização"
        snapshot={financeSnapshot}
      />

      <div className="pb-4">
        <InBrief
          found={
            <>
              Nas listas para deputada, a fatia das mulheres no dinheiro (34,9%) fica perto da presença delas entre as candidaturas com receita (36,0%). Nas disputas majoritárias, elas ficam com 16,5% do dinheiro e são 20,5% das candidaturas com receita.
            </>
          }
          matters={
            <>
              Contar mulheres em bloco esconde onde o dinheiro se concentra. Nas listas para deputada, as candidatas brancas recebem uma fatia maior do que o peso delas entre as candidatas com receita, também dentro dos maiores partidos.
            </>
          }
          unknown={
            <>
              Despesas, doador originário e a relação entre dinheiro e voto. As contas seguem abertas e os valores mudam até a prestação final.
            </>
          }
        />
      </div>

      <SectionBlock kicker="Fotografia da receita" question="Quanto foi declarado como receita, e por quantas candidaturas" align="wide" lead={<p>Quantas candidaturas já declararam receita e quanto elas somam, em cada universo.</p>} source={<>Fonte: TSE · Prestação de Contas Eleitorais 2026 · base gerada em {FINANCE_BASE_LABEL} · {formatInt(financeSnapshot.revenueRowsProcessed)} linhas de receita</>}>
        <FinanceCoverage snapshot={financeSnapshot} />
      </SectionBlock>

      <SectionBlock kicker="Por cargo" question="Presença e receita, cargo a cargo" align="wide" tone="solar" lead={<p>Em duas disputas as mulheres recebem mais do que a presença delas: assembleias legislativas (38,7% da receita, 35,2% das candidaturas com receita) e Senado (26,3% e 22,4%). Nas outras, recebem menos: Câmara dos Deputados (33,1% e 37,1%), Câmara Legislativa do DF (30,0% e 35,9%) e governos estaduais (12,0% e 17,9%). Na Presidência, as mulheres são 2 das 13 candidaturas com receita e ficam com 1,3% do dinheiro declarado.</p>}>
        <FinanceByOffice snapshot={financeSnapshot} />
      </SectionBlock>

      <SectionBlock kicker="Gênero × cor/raça × receita" question="Entre as mulheres, para quais categorias declaradas o dinheiro chegou?" align="wide" lead={<p>Os valores mostram a distribuição da receita declarada por candidaturas de mulheres. Cor/raça permanece nas categorias originais do TSE, sem agregar preta e parda.</p>}>
        <FinanceRace snapshot={financeSnapshot} />
        <div className="mt-5 space-y-2 text-sm leading-relaxed text-muted-foreground">
          <p>Mediana é o valor do meio: metade das candidatas declarou mais, metade declarou menos. Ela resiste melhor do que a soma a poucas campanhas muito grandes.</p>
          <p className="font-mono text-[10px]">Maiores partidos = os 12 com mais receita declarada até 25/09 (MDB, PDT, PL, PODE, PP, PSB, PSD, PSDB, PSOL, PT, Republicanos e União), que somam 89,8% do dinheiro.</p>
        </div>
      </SectionBlock>

      <SectionBlock kicker="Partidos" question="Os cinco partidos com maior receita no universo proporcional" align="wide" lead={<p>O recorte ordena os partidos pelo total de receita declarada e mostra, dentro de cada um, quanto foi declarado por candidaturas de mulheres. Não é ranking de equidade.</p>}>
        <FinanceParties snapshot={financeSnapshot} />
      </SectionBlock>

      <SectionBlock kicker="Território" question="A receita declarada por UF" align="wide" lead={<p>Valores do universo proporcional, com total de receita declarada, parcela de mulheres e a fatia correspondente em cada unidade da Federação.</p>}>
        <FinanceByUf snapshot={financeSnapshot} />
      </SectionBlock>

      <SectionBlock
        kicker="A regra"
        question="Cota de candidaturas e cota de dinheiro são regras diferentes"
        lead={<p>{QUOTA_RULE.financingNote}</p>}
      >
        <div className="grid gap-4">
          <ContextBox variant="significa">
            <p>
              A regra de composição de candidaturas de {QUOTA_RULE.floor}% a {QUOTA_RULE.ceiling}%
              por gênero incide sobre quem é registrada nas eleições proporcionais, por partido ou
              federação.
            </p>
          </ContextBox>
        </div>
      </SectionBlock>

      <ComoSabemos
        fonte={<>TSE, Prestação de Contas Eleitorais 2026 · {formatInt(financeSnapshot.revenueRowsProcessed)} linhas de receita.</>}
        universo="Candidaturas de 2026 que já declararam receita, com proporcional e majoritário separados. A unidade de análise é a candidatura: todas as linhas de receita de cada uma são somadas."
        base={FINANCE_BASE_LABEL}
        calculo={<>Receita é o dinheiro informado como recebido. O arquivo do TSE traz, para cada candidatura, uma única entrega: a prestação parcial ou o relatório financeiro mais recente. Conferimos que nenhuma candidatura aparece nos dois tipos, então somar as linhas não conta a mesma receita duas vezes. Linhas idênticas em todas as colunas entram uma única vez ({DUPLICATE_ROWS_REMOVED} removidas nesta base); linhas que dividem um mesmo recibo em partes são somadas. Gênero e cor/raça do arquivo de receitas foram conferidos, candidatura por candidatura, contra o registro de candidaturas.</>}
        limites={[
          "Despesa contratada ou paga ainda não entra: esta fase lê só receita.",
          "A data de corte varia por candidatura: para cerca de 2 em cada 3, os valores vão até a prestação parcial, que registra a movimentação até 08/09/2026; para as demais, até o relatório financeiro mais recente.",
          "As contas de campanha estão em andamento, e os valores mudam até a prestação final.",
          "Os percentuais que o TSE usa para distribuir o Fundo Partidário e o FEFC (divulgados em 21/08/2026) partem de outro universo: 20.560 candidaturas com pedido aceito até 18/08/2026, fixado para esse fim. Por isso diferem dos números deste site, que acompanham o registro atualizado.",
          "Doador originário, titularidade e suplência e a relação entre recursos e competitividade ficam para as próximas fases.",
        ]}
      />

      <NextAxes ids={["quem-controla", "funil", "quem-sao-elas"]} />
    </PageShell>
  );
}
