import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { EditorialOpening } from "@/components/editorial/EditorialOpening";
import { SectionBlock } from "@/components/editorial/SectionBlock";
import { InBrief } from "@/components/editorial/InBrief";
import { ContextBox } from "@/components/editorial/ContextBox";
import { NextAxes } from "@/components/editorial/NextAxes";
import { ComoSabemos } from "@/components/editorial/ComoSabemos";
import { QUOTA_RULE } from "@/data/election-2026";
import { financeSnapshot } from "@/data/tse-finance-snapshot";
import { snapshot } from "@/data/tse-snapshot";
import { FinanceByOffice, FinanceByUf, FinanceCoverage, FinanceParties, FinanceRace } from "@/components/editorial/FinanceOverview";
import { formatInt, formatPct } from "@/lib/format-br";

/**
 * Fase 1 publicada: receitas declaradas por gênero, cor/raça, cargo, partido e UF.
 */
export const Route = createFileRoute("/dinheiro")({
  head: () => ({
    meta: [
      {
        title:
          "Nos cargos majoritários, elas recebem fatia menor da receita | Quem são elas?",
      },
      {
        name: "description",
        content:
          "Receitas declaradas nas campanhas de 2026 por gênero, cor/raça, cargo, partido e UF, com cobertura, denominadores e limites da base em andamento.",
      },
      {
        property: "og:title",
        content:
          "Nos cargos majoritários, elas recebem fatia menor da receita",
      },
      {
        property: "og:description",
        content:
          "Quanto foi declarado como receita pelas candidaturas de mulheres na prestação de contas parcial, por cargo, cor/raça, partido e UF.",
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
  const revenueShare = (feminine: number | undefined, total: number | undefined) =>
    feminine !== undefined && total !== undefined && total > 0
      ? formatPct((feminine / total) * 100)
      : "—";
  const proportional = financeSnapshot.universes.proporcional;
  const majoritarian = financeSnapshot.universes.majoritario;
  const prop = revenueShare(proportional.feminineRevenue, proportional.totalRevenue);
  const maj = revenueShare(majoritarian.feminineRevenue, majoritarian.totalRevenue);
  const presidente = revenueShare(
    majoritarian.byOffice["PRESIDENTE"]?.feminine,
    majoritarian.byOffice["PRESIDENTE"]?.total,
  );
  const governador = revenueShare(
    majoritarian.byOffice["GOVERNADOR"]?.feminine,
    majoritarian.byOffice["GOVERNADOR"]?.total,
  );
  const senador = revenueShare(
    majoritarian.byOffice["SENADOR"]?.feminine,
    majoritarian.byOffice["SENADOR"]?.total,
  );
  const deputadoFederal = revenueShare(
    proportional.byOffice["DEPUTADO FEDERAL"]?.feminine,
    proportional.byOffice["DEPUTADO FEDERAL"]?.total,
  );
  const deputadoDistrital = revenueShare(
    proportional.byOffice["DEPUTADO DISTRITAL"]?.feminine,
    proportional.byOffice["DEPUTADO DISTRITAL"]?.total,
  );
  const deputadoEstadual = revenueShare(
    proportional.byOffice["DEPUTADO ESTADUAL"]?.feminine,
    proportional.byOffice["DEPUTADO ESTADUAL"]?.total,
  );
  const presidentialFeminine = snapshot?.universes.majoritario.dimensions?.feminineByCargo?.["PRESIDENTE"];
  const presidentialTotal = snapshot?.universes.majoritario.dimensions?.totalByCargo?.["PRESIDENTE"];
  return (
    <PageShell breadcrumb={[{ label: "Investigação", to: "/investigacoes" }, { label: "Dinheiro" }]}>
      <EditorialOpening
        variant="financial"
        kicker="Dinheiro"
        question="Nos cargos majoritários, elas recebem fatia menor da receita"
        lead={<p>Na corrida à Presidência, mulheres são {presidentialFeminine !== undefined ? formatInt(presidentialFeminine) : "—"} das {presidentialTotal !== undefined ? formatInt(presidentialTotal) : "—"} candidaturas e recebem {presidente} da receita declarada. No universo proporcional, mulheres têm {prop} da receita declarada; no majoritário, {maj}.</p>}
        layers={MONEY_LAYERS.map((layer) => layer.label)}
        gap="Prestação de contas em andamento · receita, não despesa · valores sujeitos a atualização"
        snapshot={financeSnapshot}
      />

      <div className="pb-4">
        <InBrief
          found={
            <>
              Na receita declarada até agora, mulheres recebem {prop} do total no universo proporcional e {maj} no majoritário. Na Presidência, a fatia é de {presidente}.
            </>
          }
          matters={
            <>
              A presença nas listas e a participação no dinheiro não são a mesma medida. O recorte por cargo mostra onde a distância se amplia, sem afirmar que o recurso, sozinho, causa o resultado eleitoral.
            </>
          }
          unknown={
            <>
              Despesas contratadas ou pagas, doador originário, titularidade e suplência e a relação entre recursos e competitividade. Essas etapas ficam fora desta fase.
            </>
          }
        />
      </div>

      <SectionBlock kicker="Fotografia da receita" question="Quanto foi declarado como receita, e por quantas candidaturas" align="wide" lead={<p>Quantas candidaturas já declararam receita e quanto elas somam, em cada universo.</p>} source={<>Fonte: TSE · Prestação de Contas Eleitorais 2026 · base gerada em 23/09/2026 · {formatInt(financeSnapshot.revenueRowsProcessed)} linhas de receita</>}>
        <FinanceCoverage snapshot={financeSnapshot} />
      </SectionBlock>

      <SectionBlock kicker="Por cargo" question="A fatia da receita declarada, cargo a cargo" align="wide" tone="solar" lead={<p>Na fotografia atual, mulheres recebem {presidente} da receita declarada para a Presidência, {governador} para governos, {senador} para o Senado, {deputadoFederal} para a Câmara dos Deputados, {deputadoDistrital} para a Câmara Legislativa do DF e {deputadoEstadual} para assembleias legislativas.</p>}>
        <FinanceByOffice snapshot={financeSnapshot} />
      </SectionBlock>

      <SectionBlock kicker="Gênero × cor/raça × receita" question="Entre as mulheres, para quais categorias declaradas o dinheiro chegou?" align="wide" lead={<p>Os valores mostram a distribuição da receita declarada por candidaturas de mulheres. Cor/raça permanece nas categorias originais do TSE, sem agregar preta e parda.</p>}>
        <FinanceRace snapshot={financeSnapshot} />
      </SectionBlock>

      <SectionBlock kicker="Partidos" question="Os cinco partidos com maior receita no universo proporcional" align="wide" lead={<p>O recorte ordena os partidos pelo total de receita declarada e mostra, dentro de cada um, quanto foi declarado por candidaturas de mulheres. Não é ranking de equidade.</p>}>
        <FinanceParties snapshot={financeSnapshot} />
      </SectionBlock>

      <SectionBlock kicker="Território" question="A receita declarada por UF" align="wide" lead={<p>Valores do universo proporcional, com total de receita declarada, parcela de mulheres e a fatia correspondente em cada unidade da Federação.</p>}>
        <FinanceByUf snapshot={financeSnapshot} />
      </SectionBlock>

      <SectionBlock
        kicker="A regra"
        question="Financiamento não é a mesma coisa que cota de candidaturas"
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
        base="23/09/2026"
        calculo={<>Receita é o dinheiro informado como recebido. Cobertura, total, mediana, universo e data da base ficam à vista em cada recorte. As {formatInt(financeSnapshot.tipoPrestacaoContas["PARCIAL"] ?? 0)} linhas de prestação parcial e as {formatInt(financeSnapshot.tipoPrestacaoContas["RELATÓRIO FINANCEIRO"] ?? 0)} de relatório financeiro entram na soma.</>}
        limites={[
          "Despesa contratada ou paga ainda não entra: esta fase lê só receita.",
          "A prestação de contas está em andamento, e os valores mudam até o fim da apuração.",
          "Doador originário, titularidade e suplência e a relação entre recursos e competitividade ficam para as próximas fases.",
        ]}
      />

      <NextAxes ids={["quem-controla", "funil", "quem-sao-elas"]} />
    </PageShell>
  );
}
