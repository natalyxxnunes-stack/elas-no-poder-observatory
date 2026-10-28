import { FundoNoGasto, TiposDeGasto, Vaquinhas } from "@/components/editorial/DespesasCharts";
import { FefcPartidos } from "@/components/editorial/FefcPartidos";
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
          "Entre as candidatas a deputada, as brancas concentram uma fatia maior da receita declarada | Quem são elas?",
      },
      {
        name: "description",
        content:
          "Receitas declaradas nas campanhas de 2026 por gênero, cor/raça, cargo, partido e UF, com cobertura, denominadores e limites da base em andamento.",
      },
      {
        property: "og:title",
        content:
          "Entre as candidatas a deputada, as brancas concentram uma fatia maior da receita declarada",
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
    ready: "partial",
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
    label: "Recursos e reeleição",
    question: "Quem tinha mais dinheiro voltou mais à Câmara?",
    needs: "Publicado em Como votaram, para quem tentou a reeleição. Sem índice de competitividade, por decisão editorial.",
    ready: true,
  },
] as const;

function DinheiroPage() {
  return (
    <PageShell breadcrumb={[{ label: "Investigação", to: "/investigacoes" }, { label: "Dinheiro" }]}>
      <EditorialOpening
        variant="financial"
        kicker="Dinheiro"
        question="Entre as candidatas a deputada, as brancas concentram uma fatia maior da receita declarada"
        lead={<p>Nas disputas para deputada, mulheres são 35,9% das candidaturas com receita declarada e ficam com 33,2% do dinheiro, um pouco abaixo da presença delas. A diferença maior aparece dentro do grupo. Nos 12 partidos com mais receita declarada, que concentram 88,1% do dinheiro, a mediana das candidatas brancas é R$ 144 mil; a das pardas, R$ 98 mil; a das pretas, R$ 79 mil. Nas disputas por governo, Senado e Presidência, os valores também variam por cor/raça e pelos partidos que lançam as candidatas.</p>}
        layers={MONEY_LAYERS.map((layer) => layer.label)}
        gap="Prestação de contas em andamento · receita, não despesa · valores sujeitos a atualização"
        snapshot={financeSnapshot}
      />

      <div className="pb-4">
        <InBrief
          found={
            <>
              Nas listas para deputada, a fatia das mulheres no dinheiro (33,2%) fica abaixo da presença delas entre as candidaturas com receita (35,9%). Na base de 25/09, as duas fatias estavam quase empatadas (34,9% e 36,0%). Nas disputas majoritárias, elas ficam com 15,0% do dinheiro e são 20,5% das candidaturas com receita.
            </>
          }
          matters={
            <>
              Contar mulheres em bloco esconde onde o dinheiro se concentra. Nas listas para deputada, as candidatas brancas recebem uma fatia maior do que o peso delas entre as candidatas com receita, também dentro dos maiores partidos.
            </>
          }
          unknown={
            <>
              Por que o dinheiro privado chega mais aos homens brancos. As contas seguem abertas e os valores mudam até a prestação final do 1º turno, em 3/11.
            </>
          }
        />
      </div>

      <SectionBlock id="fotografia" kicker="Fotografia da receita" question="Quanto foi declarado como receita, e por quantas candidaturas" align="wide" lead={<p>Quantas candidaturas já declararam receita e quanto elas somam, em cada universo.</p>} source={<>Fonte: TSE · Prestação de Contas Eleitorais 2026 · base gerada em {FINANCE_BASE_LABEL} · {formatInt(financeSnapshot.revenueRowsProcessed)} linhas de receita</>}>
        <FinanceCoverage snapshot={financeSnapshot} />
      </SectionBlock>

      <SectionBlock id="cargo" kicker="Por cargo" question="Presença e receita, cargo a cargo" align="wide" tone="lilac" lead={<p>Em duas disputas as mulheres recebem mais do que a presença delas: Senado (25,7% da receita, 22,3% das candidaturas com receita) e, por pouco, assembleias legislativas (35,5% e 35,2%). Nas outras, recebem menos: Câmara dos Deputados (32,0% e 37,1%), Câmara Legislativa do DF (29,1% e 35,7%) e governos estaduais (12,2% e 17,9%). Na Presidência, as mulheres são 2 das 13 candidaturas com receita e ficam com 0,7% do dinheiro declarado.</p>}>
        <FinanceByOffice snapshot={financeSnapshot} />
      </SectionBlock>

      <SectionBlock id="cor-raca" tone="butter" kicker="Gênero × cor/raça × receita" question="Entre as mulheres, para quais categorias declaradas o dinheiro chegou?" align="wide" lead={<p>Os valores mostram a distribuição da receita declarada por candidaturas de mulheres. Cor/raça permanece nas categorias originais do TSE, sem agregar preta e parda.</p>}>
        <FinanceRace snapshot={financeSnapshot} />
        <div className="mt-5 max-w-3xl space-y-2 text-sm leading-relaxed text-ink/80">
          <p>Mediana é o valor do meio: metade das candidatas declarou mais, metade declarou menos. Ela resiste melhor do que a soma a poucas campanhas muito grandes.</p>
          <p className="font-mono text-xs">Maiores partidos = os 12 com mais receita declarada para deputada e deputado (MDB, PDT, PL, PODE, PP, PSB, PSD, PSDB, PSOL, PT, Republicanos e União), que somam 88,1% dessa receita.</p>
        </div>
      </SectionBlock>

      <SectionBlock id="partidos" kicker="Partidos" question="Os cinco partidos com maior receita no universo proporcional" align="wide" lead={<p>O recorte ordena os partidos pelo total de receita declarada e mostra, dentro de cada um, quanto foi declarado por candidaturas de mulheres. Não é ranking de equidade.</p>}>
        <FinanceParties snapshot={financeSnapshot} />
      </SectionBlock>

      <SectionBlock
        id="fundo-eleitoral"
        tone="butter"
        kicker="Fundo eleitoral por partido"
        question="O fundo público acompanhou a presença de mulheres e de pessoas negras nas candidaturas de cada partido?"
        align="wide"
        lead={
          <p>
            A Constituição manda os partidos aplicarem no fundo eleitoral um piso de 30% em candidaturas de mulheres,
            na proporção das candidatas (EC 117/2022), e um piso de 30% em candidaturas de pessoas pretas e pardas
            (EC 133/2024). No total, o fundo que chegou às candidaturas ficou perto da presença das mulheres (35,2% das
            candidaturas, 33,3% do fundo). Candidaturas pretas e pardas somadas ficaram com 33,4%: acima do piso e bem
            abaixo da presença delas (48,5%). Pardas são 34,9% das candidaturas e ficaram com 25,3%; pretas, 13,6% e
            8,1%; brancas, 50,1% e 65,4%. Por partido, PL, PSD, MDB e NOVO ficam abaixo de 30% para candidaturas pretas
            e pardas, e o PT fica no limite (30,0%). Para mulheres, PL, Solidariedade e Avante ficam abaixo de 30%.
          </p>
        }
      >
        <FefcPartidos />
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Números parciais: as contas de campanha ainda estão abertas, e esta tabela será refeita com a prestação final do
          1º turno, que vence em 3/11/2026.
        </p>
      </SectionBlock>

      <SectionBlock
        id="despesas"
        kicker="Fase 2 · gasto e vaquinhas"
        question="De onde saiu o dinheiro que as campanhas gastaram, e em quê"
        align="wide"
        lead={
          <p>
            As campanhas de candidatas a deputada dependem mais do fundo público que as de homens: 86,1% do que elas
            pagaram saiu do fundo eleitoral, contra 73,5% entre os homens. A dependência é maior entre as pretas (91,6%) e
            as pardas (87,4%) do que entre as brancas (84,1%). Os homens brancos são o grupo com mais dinheiro de outras
            fontes: só 70,9% do que pagaram veio do fundo. Dinheiro privado chega mais a eles.
          </p>
        }
      >
        <FundoNoGasto />
        <div className="mt-6 grid gap-6 lg:grid-cols-2 [&>*]:min-w-0">
          <TiposDeGasto />
          <Vaquinhas />
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Vaquinhas: candidatas brancas usaram mais (9,1% delas) do que pardas (3,8%) e pretas (7,9%). Somadas, as
          vaquinhas das candidatas a deputada arrecadaram R$ 3,1 milhões, 24% do total arrecadado assim para deputado,
          com as mulheres sendo 35,6% das candidaturas. Na mediana, quem usou vaquinha recebeu de 17 ou 18 pessoas.
        </p>
      </SectionBlock>

      <SectionBlock id="territorio" tone="lilac" kicker="Território" question="A receita declarada por UF" align="wide" lead={<p>Valores do universo proporcional, com total de receita declarada, parcela de mulheres e a fatia correspondente em cada unidade da Federação.</p>}>
        <FinanceByUf snapshot={financeSnapshot} />
      </SectionBlock>

      <SectionBlock
        id="regra"
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
        calculo={<>Receita é o dinheiro informado como recebido. O arquivo do TSE traz, para cada candidatura, uma única entrega: a prestação parcial, o relatório financeiro mais recente ou a prestação final. Conferimos que nenhuma candidatura aparece em mais de um tipo, então somar as linhas não conta a mesma receita duas vezes. Linhas idênticas em todas as colunas entram uma única vez ({DUPLICATE_ROWS_REMOVED} removidas nesta base); linhas que dividem um mesmo recibo em partes são somadas. Gênero e cor/raça do arquivo de receitas foram conferidos, candidatura por candidatura, contra o registro de candidaturas.</>}
        limites={[
          "Despesas contratadas e pagas e o doador originário do financiamento coletivo entram desde 28/10, na seção sobre gasto e vaquinhas.",
          "A data de corte varia por candidatura: 8.309 ainda estão na prestação parcial (movimentação até 08/09/2026), 7.892 no relatório financeiro mais recente e 3.069 já entregaram a prestação final.",
          "As contas de campanha estão em andamento: a prestação final do 1º turno vence em 3/11/2026, e a do 2º turno depois. Receitas dos dois turnos são somadas por candidatura.",
          "Os percentuais que o TSE usa para distribuir o Fundo Partidário e o FEFC (divulgados em 21/08/2026) partem de outro universo: 20.560 candidaturas com pedido aceito até 18/08/2026, fixado para esse fim. Por isso diferem dos números deste site, que acompanham o registro atualizado.",
          "Titularidade e suplência ficam para a próxima fase. A relação entre dinheiro e reeleição está em Como votaram; índice de competitividade não entra no site.",
        ]}
      />

      <NextAxes ids={["quem-controla", "funil", "quem-sao-elas"]} />
    </PageShell>
  );
}
