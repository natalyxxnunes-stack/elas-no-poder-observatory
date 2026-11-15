import { M_FUNDO_BRANCAS } from "@/data/manchetes";
import { Desdobra, ExploreDivisa } from "@/components/editorial/Desdobra";
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
import {
  FinanceByOffice,
  FinanceByUf,
  FinanceCoverage,
  FinanceParties,
  FinanceRace,
} from "@/components/editorial/FinanceOverview";
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
          "Receitas declaradas nas campanhas de 2026 por gênero, cor/raça, cargo, partido e UF, com cobertura, denominadores e limites da base gerada em 15/11, sujeita a retificação.",
      },
      {
        property: "og:title",
        content: M_FUNDO_BRANCAS.texto,
      },
      {
        property: "og:description",
        content: `Receitas declaradas pelas candidaturas de mulheres na base gerada após o prazo do 2º turno, por cargo, cor/raça, partido e UF. Fotografia de ${FINANCE_BASE_LABEL}.`,
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
    needs: "Receita agregada por candidatura, com gênero e cor/raça do próprio arquivo de receitas",
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
    needs:
      "Publicado em Como votaram, para quem tentou a reeleição. Sem índice de competitividade, por decisão editorial.",
    ready: true,
  },
] as const;

function DinheiroPage() {
  return (
    <PageShell
      breadcrumb={[{ label: "Investigação", to: "/investigacoes" }, { label: "Dinheiro" }]}
    >
      <EditorialOpening
        variant="financial"
        kicker="Dinheiro"
        question={M_FUNDO_BRANCAS.texto}
        lead={
          <p>
            Nas disputas para deputada, mulheres são 35,7% das candidaturas com receita declarada e
            ficam com 32,9% do dinheiro, abaixo da presença delas. A diferença maior aparece dentro
            do grupo. Nos 12 partidos com mais receita declarada, que concentram 87,9% do dinheiro,
            a mediana das candidatas brancas é R$ 151 mil; a das pardas, R$ 100 mil; a das pretas,
            R$ 81 mil. Nas disputas por governo, Senado e Presidência, os valores também variam por
            cor/raça e pelos partidos que lançam as candidatas.
          </p>
        }
        layers={MONEY_LAYERS.map((layer) => layer.label)}
        gap="TSE, base de 15/11 · receitas declaradas, não despesas · 195 candidaturas com prestação parcial e 102 com relatório financeiro"
        snapshot={financeSnapshot}
      />

      <div className="pb-4">
        <InBrief
          found={
            <>
              Nas listas para deputada, as mulheres receberam 32,9% das receitas declaradas e
              representam 35,7% das candidaturas com receita, na extração de 15/11. Em 25/09,
              eram 34,9% das receitas e 36,0% das candidaturas; em 27/10, 33,2% e 35,9%.
              Nas disputas majoritárias, elas receberam 14,7% da receita e são 20,3%
              das candidaturas com receita.
            </>
          }
          matters={
            <>
              Contar mulheres em bloco esconde onde o dinheiro se concentra. Nas listas para
              deputada, as candidatas brancas recebem uma fatia maior do que o peso delas entre as
              candidatas com receita, também dentro dos maiores partidos.
            </>
          }
          unknown={
            <>
              Por que fontes de recursos diferentes chegam de forma desigual às candidaturas.
              A base já é posterior ao prazo do segundo turno, mas ainda pode ser retificada.
            </>
          }
        />
      </div>

      <SectionBlock
        id="fotografia"
        kicker="Fotografia da receita"
        question="Quanto foi declarado como receita, e por quantas candidaturas"
        align="wide"
        lead={
          <p>Quantas candidaturas já declararam receita e quanto elas somam, em cada universo.</p>
        }
        source={
          <>
            Fonte: TSE · Prestação de Contas Eleitorais 2026 · base gerada em {FINANCE_BASE_LABEL} ·{" "}
            {formatInt(financeSnapshot.revenueRowsProcessed)} linhas de receita
          </>
        }
      >
        <FinanceCoverage snapshot={financeSnapshot} />
      </SectionBlock>

      <SectionBlock
        id="cargo"
        kicker="Por cargo"
        question="Presença e receita, cargo a cargo"
        align="wide"
        tone="lilac"
        lead={
          <p>
            Só no Senado as mulheres recebem mais do que a presença delas (25,6% da receita, 22,2%
            das candidaturas com receita). Nas assembleias legislativas, quase empatam (34,8% e
            34,9%). Nas outras, recebem menos: Câmara dos Deputados (31,8% e 36,9%), Câmara
            Legislativa do DF (29,9% e 35,4%) e governos estaduais (12,2% e 17,8%). Na Presidência,
            as mulheres são 2 das 14 candidaturas com receita; com base tão pequena, a fatia delas
            no dinheiro não vira percentual aqui.
          </p>
        }
      >
        <FinanceByOffice snapshot={financeSnapshot} />
      </SectionBlock>

      <SectionBlock
        id="cor-raca"
        tone="butter"
        kicker="Gênero × cor/raça × receita"
        question="Entre as mulheres, para quais categorias declaradas o dinheiro chegou?"
        align="wide"
        lead={
          <p>
            Os valores mostram a distribuição da receita declarada por candidaturas de mulheres.
            Cor/raça permanece nas categorias originais do TSE, sem agregar preta e parda.
          </p>
        }
      >
        <FinanceRace snapshot={financeSnapshot} />
        <div className="mt-5 max-w-3xl space-y-2 text-sm leading-relaxed text-ink/80">
          <p>
            Mediana é o valor do meio: metade das candidatas declarou mais, metade declarou menos.
            Ela resiste melhor do que a soma a poucas campanhas muito grandes.
          </p>
          <p className="font-mono text-xs">
            Maiores partidos = os 12 com mais receita declarada para deputada e deputado (MDB, PDT,
            PL, PODE, PP, PSB, PSD, PSDB, PSOL, PT, Republicanos e União), que somam 87,9% dessa
            receita.
          </p>
        </div>
      </SectionBlock>

      <SectionBlock
        id="fundo-eleitoral"
        tone="butter"
        kicker="Fundo eleitoral por partido"
        question="O fundo público acompanhou a presença de mulheres e de pessoas negras nas candidaturas de cada partido?"
        align="wide"
        lead={
          <>
            <p>
              A Constituição reserva pelo menos 30% do fundo eleitoral de cada partido para
              candidaturas de mulheres, na proporção das candidatas (EC 117/2022), e 30% para
              candidaturas de pessoas pretas e pardas (EC 133/2024). Nas candidaturas a deputada e
              deputado, o fundo acompanhou a presença das mulheres: elas são 35,6% das candidaturas
              e receberam 37,3% do dinheiro. Com pessoas pretas e pardas, a distância é grande:
              candidaturas de pessoas pardas são 35,1% e receberam 28,3%; de pessoas pretas, 13,7% e
              9,5%. Candidaturas de pessoas brancas são 49,8% e receberam 60,8%.
            </p>
            <p className="mt-3">
              No recorte de deputadas e deputados, três partidos registraram menos de 30%
               do FEFC recebido por candidaturas pretas e pardas somadas: PL (26,7%),
               NOVO (25,6%) e PCO (24,7%). Entre titulares dos seis cargos, são seis:
               PL (22,3%), NOVO (26,4%), MDB (28,2%), Cidadania (29,4%), PSD (29,4%) e
               PRTB (14,1%). O PRTB reúne somente seis candidaturas titulares, quatro
               com FEFC; seu percentual é sensível a poucos registros. Nas disputas
               majoritárias, as mulheres receberam 33,2% do FEFC entre titulares.
               Dados de 15/11/2026: medem o fundo recebido pelas candidaturas,
               não demonstram cumprimento ou descumprimento das cotas. A aferição legal
               utiliza outro universo e critérios próprios, inclusive para chapas.
             </p>
          </>
        }
      >
        <Desdobra rotulo="Ver o fundo partido por partido">
          <FefcPartidos />
        </Desdobra>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Base de 15/11/2026, após o prazo final do segundo turno: 195 candidaturas ainda constam com
          prestação parcial e 102 com relatório financeiro. Valores sujeitos a retificações.
        </p>
      </SectionBlock>

      <SectionBlock
        id="despesas"
        collapsible="Ver os gráficos de gasto e vaquinhas"
        kicker="Gasto e vaquinhas"
        question="De onde saiu o dinheiro que as campanhas gastaram, e em quê"
        align="wide"
        lead={
          <p>
            As campanhas de candidatas a deputada dependem mais do fundo público que as de homens:
            84,3% do que elas pagaram saiu do fundo eleitoral, contra 69,3% entre os homens. A
            dependência é maior entre as pretas (88,1%) e as pardas (85,8%) do que entre as brancas
            (82,3%). Os homens brancos são o grupo com mais dinheiro de outras fontes: só 66,5% do
            que pagaram veio do fundo. Dinheiro privado chega mais a eles.
          </p>
        }
      >
        <FundoNoGasto />
        <div className="mt-6 grid gap-6 lg:grid-cols-2 [&>*]:min-w-0">
          <TiposDeGasto />
          <Vaquinhas />
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Vaquinhas: candidatas brancas usaram mais (9,9% delas) do que pardas (4,2%) e pretas
          (8,4%). Somadas, as vaquinhas das candidatas a deputada arrecadaram R$ 3,2 milhões, 24% do
          total arrecadado assim para deputado, com as mulheres sendo 35,6% das candidaturas. Na
          mediana, quem usou vaquinha recebeu de 15 ou 16 pessoas.
        </p>
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
      <ExploreDivisa lead="Os cinco partidos com mais receita e a receita declarada em cada estado." />

      <SectionBlock
        id="partidos"
        kicker="Partidos"
        question="Os cinco partidos com maior receita no universo proporcional"
        align="wide"
        lead={
          <p>
            O recorte ordena os partidos pelo total de receita declarada e mostra, dentro de cada
            um, quanto foi declarado por candidaturas de mulheres. Não é ranking de equidade.
          </p>
        }
      >
        <FinanceParties snapshot={financeSnapshot} />
      </SectionBlock>

      <SectionBlock
        id="territorio"
        collapsible="Ver estado por estado"
        tone="lilac"
        kicker="Território"
        question="A receita declarada por UF"
        align="wide"
        lead={
          <p>
            Valores do universo proporcional, com total de receita declarada, parcela de mulheres e
            a fatia correspondente em cada unidade da Federação.
          </p>
        }
      >
        <FinanceByUf snapshot={financeSnapshot} />
      </SectionBlock>

      <ComoSabemos
        fonte={
          <>
            TSE, Prestação de Contas Eleitorais 2026 ·{" "}
            {formatInt(financeSnapshot.revenueRowsProcessed)} linhas de receita.
          </>
        }
        universo="Candidaturas de 2026 que já declararam receita, com proporcional e majoritário separados. A unidade de análise é a candidatura: todas as linhas de receita de cada uma são somadas."
        base={FINANCE_BASE_LABEL}
        calculo={
          <>
            Receita é o dinheiro informado como recebido. O arquivo do TSE traz, para cada
            candidatura, uma única entrega: a prestação parcial, o relatório financeiro mais recente
            ou a prestação final. Conferimos que nenhuma candidatura aparece em mais de um tipo,
            então somar as linhas não conta a mesma receita duas vezes. Linhas idênticas em todas as
            colunas entram uma única vez ({DUPLICATE_ROWS_REMOVED} removidas nesta base); linhas que
            dividem um mesmo recibo em partes são somadas. Gênero e cor/raça do arquivo de receitas
            foram conferidos, candidatura por candidatura, contra o registro de candidaturas.
          </>
        }
        limites={[
          "Despesas contratadas e pagas e o doador originário do financiamento coletivo entram desde 28/10, na seção sobre gasto e vaquinhas.",
          "Entre 19.660 candidaturas com receita nos seis cargos, 19.363 constam como FINAL, 195 PARCIAL e 102 RELATÓRIO FINANCEIRO na extração de 15/11; o tipo da prestação não equivale à aprovação de contas.",
          "Base financeira de 15/11/2026 (04h05) e cadastro de candidaturas do mesmo dia (05h30), após o prazo final do segundo turno em 14/11. Complementações, retificações e julgamentos ainda podem alterar o resultado. Fotografias anteriores de 13/11, 04/11, 27/10 e 25/09 são preservadas no histórico.",
          "Os percentuais que o TSE usa para distribuir o Fundo Partidário e o FEFC (divulgados em 21/08/2026) partem de outro universo: 20.560 candidaturas com pedido aceito até 18/08/2026, fixado para esse fim. Por isso diferem dos números deste site, que acompanham o registro atualizado.",
          "Titularidade e suplência ficam para a próxima fase. A relação entre dinheiro e reeleição está em Como votaram; índice de competitividade não entra no site.",
        ]}
      />

      <NextAxes ids={["quem-controla", "funil", "quem-sao-elas"]} />
    </PageShell>
  );
}
