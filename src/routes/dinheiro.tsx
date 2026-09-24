import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { EditorialOpening } from "@/components/editorial/EditorialOpening";
import { SectionBlock } from "@/components/editorial/SectionBlock";
import { InBrief } from "@/components/editorial/InBrief";
import { ContextBox } from "@/components/editorial/ContextBox";
import { StatusTag } from "@/components/editorial/StatusTag";
import { NextAxes } from "@/components/editorial/NextAxes";
import { GapNote } from "@/components/GapNote";
import { axis } from "@/data/architecture";
import { QUOTA_RULE } from "@/data/election-2026";
import { financeSnapshot } from "@/data/tse-finance-snapshot";
import { FinanceByOffice, FinanceByUf, FinanceCoverage, FinanceParties, FinanceRace } from "@/components/editorial/FinanceOverview";
import { formatInt } from "@/lib/format-br";

/**
 * Fase 1 publicada: receitas declaradas por gênero, cor/raça, cargo, partido e UF.
 */
export const Route = createFileRoute("/dinheiro")({
  head: () => ({
    meta: [
      { title: "Dinheiro — Quem são elas? | Quem recebe condições para competir" },
      {
        name: "description",
        content:
          "Receitas declaradas nas campanhas de 2026 por gênero, cor/raça, cargo, partido e UF, com cobertura, denominadores e limites da base em andamento.",
      },
      { property: "og:title", content: "Dinheiro nas eleições de 2026: quem recebe?" },
      {
        property: "og:description",
        content:
          "Quanto já chegou às candidaturas de mulheres na prestação de contas em andamento, por cargo, cor/raça, partido e UF.",
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
  const a = axis("dinheiro");
  return (
    <PageShell breadcrumb={[{ label: "Investigação", to: "/investigacoes" }, { label: "Dinheiro" }]}>
      <EditorialOpening
        variant="financial"
        kicker="Dinheiro"
        question="O dinheiro chega às mesmas mulheres que aparecem nas candidaturas?"
        lead={<p>{a.summary}</p>}
        layers={MONEY_LAYERS.map((layer) => layer.label)}
        gap="Prestação de contas em andamento · receita, não despesa · valores sujeitos a atualização"
        snapshot={financeSnapshot}
      />

      <div className="pb-4">
        <InBrief
          found={
            <>
              Entre as receitas já informadas, mulheres recebem 35,2% do total no universo proporcional e 16,8% no majoritário. Por cargo, a fatia cai nos postos de comando mais altos: chega a 1,3% na Presidência.
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

      <SectionBlock kicker="Fotografia da receita" question="Quanto já entrou — e quantas candidaturas aparecem nesta base" align="wide" lead={<p>A unidade de análise é a candidatura. Todas as linhas de receita de cada SQ_CANDIDATO são somadas; os universos proporcional e majoritário permanecem separados.</p>} source={<>Fonte: TSE · Prestação de Contas Eleitorais 2026 · base gerada em 23/09/2026 · {formatInt(financeSnapshot.revenueRowsProcessed)} linhas de receita</>}>
        <FinanceCoverage snapshot={financeSnapshot} />
      </SectionBlock>

      <SectionBlock kicker="Por cargo" question="Quanto mais alto o cargo, menor a fatia da receita que chega às mulheres" align="wide" tone="solar" lead={<p>Na fotografia atual, mulheres recebem 1,3% da receita declarada para a Presidência, 12,1% para governos, 26,5% para o Senado, 33,4% para a Câmara dos Deputados, 30,0% para a Câmara Legislativa do DF e 39,1% para assembleias legislativas.</p>}>
        <FinanceByOffice snapshot={financeSnapshot} />
      </SectionBlock>

      <SectionBlock kicker="Gênero × cor/raça × receita" question="Entre as mulheres, para quais categorias declaradas o dinheiro chegou?" align="wide" lead={<p>Os valores mostram a distribuição da receita arrecadada por candidaturas de mulheres. Cor/raça permanece nas categorias originais do TSE, sem agregar preta e parda.</p>}>
        <FinanceRace snapshot={financeSnapshot} />
      </SectionBlock>

      <SectionBlock kicker="Partidos" question="Os cinco partidos com maior receita no universo proporcional" align="wide" lead={<p>O recorte ordena os partidos pelo total arrecadado e mostra, dentro de cada um, quanto foi declarado por candidaturas de mulheres. Não é ranking de equidade.</p>}>
        <FinanceParties snapshot={financeSnapshot} />
      </SectionBlock>

      <SectionBlock kicker="Território" question="A receita declarada por UF" align="wide" lead={<p>Valores do universo proporcional, com total arrecadado, parcela de mulheres e a fatia correspondente em cada unidade da Federação.</p>}>
        <FinanceByUf snapshot={financeSnapshot} />
      </SectionBlock>

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
            <p>Confundir as duas leva a conclusões erradas.</p>
          </ContextBox>
        </div>
      </SectionBlock>

      <SectionBlock
        kicker="Andamento da investigação"
        question="Quatro camadas abertas; duas continuam aguardando dado e método"
        align="wide"
      >
        <ul className="grid gap-4 md:grid-cols-2">
          {MONEY_LAYERS.map((l) => (
            <li key={l.id} className="editorial-card p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-lg text-ink">{l.label}</h3>
                <StatusTag tone={l.ready ? "ok" : "pending"}>{l.ready ? "publicado" : "aguardando dado"}</StatusTag>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{l.question}</p>
              <p className="mt-3 font-mono text-[12px] text-muted-foreground">Exige: {l.needs}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <GapNote label="O que ainda falta">
            Esta fase não inclui despesas, doador originário, titularidade ou suplência nem relação entre receita e competitividade. Nenhum desses valores é estimado.
          </GapNote>
        </div>
      </SectionBlock>

      <SectionBlock
        kicker="Como calculamos"
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
            Esta página lê receita: dinheiro informado como recebido, não despesa contratada ou paga. A receita é somada por candidatura; cobertura, total, mediana, universo e data da base ficam à vista. “Parcial” e “Relatório Financeiro” não são usados como filtro: as {formatInt(financeSnapshot.tipoPrestacaoContas["PARCIAL"] ?? 0)} linhas parciais e as {formatInt(financeSnapshot.tipoPrestacaoContas["RELATÓRIO FINANCEIRO"] ?? 0)} linhas de relatório financeiro entram na soma.
          </p>
        </ContextBox>
      </SectionBlock>

      <NextAxes ids={["quem-controla", "votos", "quem-sao-elas"]} />
    </PageShell>
  );
}
