import { ChartBar, ChartFrame, ChartScale, LegendSwatch } from "@/components/editorial/ChartFrame";
import { SITUACAO_2026, SITUACAO_META, saiu, type SituacaoCount } from "@/data/situacao-candidaturas-2026";
import { formatInt, formatPct } from "@/lib/format-br";

const RACES = ["BRANCA", "PARDA", "PRETA", "INDÍGENA", "AMARELA"] as const;
const RACE_F: Record<string, string> = { BRANCA: "Brancas", PARDA: "Pardas", PRETA: "Pretas", "INDÍGENA": "Indígenas", AMARELA: "Amarelas" };
const RACE_M: Record<string, string> = { BRANCA: "Brancos", PARDA: "Pardos", PRETA: "Pretos", "INDÍGENA": "Indígenas", AMARELA: "Amarelos" };
const SMALL = 20;
const n = formatInt;
const show = (num: number, den: number) => (den >= SMALL ? formatPct((num / den) * 100) : `${n(num)} de ${n(den)}`);

/**
 * Quantos pedidos de registro saíram da disputa (indeferimento, cancelamento
 * ou renúncia), por gênero e cor/raça, no universo proporcional.
 */
export function SituacaoChart() {
  const u = SITUACAO_2026.proporcional;
  const row = (label: string, c: SituacaoCount | undefined, cls: string) =>
    c ? (
      <ChartBar
        key={label}
        label={label}
        base={`${n(saiu(c))} de ${n(c.total)} pedidos · ${n(c["indeferida com recurso"] ?? 0)} com recurso`}
        value={(saiu(c) / c.total) * 100}
        display={show(saiu(c), c.total)}
        barClass={cls}
        scaleMax={20}
        stacked
      />
    ) : null;
  return (
    <ChartFrame
      eyebrow="Pedidos de registro · deputada e deputado · 2026"
      title="Quantos pedidos saíram da disputa por indeferimento, cancelamento ou renúncia"
      legend={
        <>
          <LegendSwatch className="bg-coral">mulheres</LegendSwatch>
          <LegendSwatch className="bg-plum">homens</LegendSwatch>
        </>
      }
      note={`Régua de 0 a 20%. Indeferimentos ainda em recurso ficam fora da barra e aparecem à parte. Em 2022, ${formatPct(SITUACAO_META.inaptos2022.feminino)} dos pedidos de mulheres e ${formatPct(SITUACAO_META.inaptos2022.masculino)} dos de homens terminaram inaptos.`}
      source={`Fonte: TSE, Candidatos 2026 e arquivo complementar (situação do julgamento), base de ${SITUACAO_META.baseGeneratedAt}. Recontagem independente.`}
      ficha={{
        vendo: "A fatia dos pedidos de registro de cada grupo que saiu da disputa: indeferida, cancelada ou com renúncia.",
        contados: "Todos os pedidos de registro para deputada e deputado federal, estadual e distrital em 2026.",
        denominador: "Pedidos de registro do mesmo gênero e cor/raça.",
        data: `Base do TSE de ${SITUACAO_META.baseGeneratedAt}`,
        fonte: "TSE, Candidatos 2026 e Candidatos (informações complementares) 2026",
        limitacao:
          "Parte dos indeferimentos ainda está em recurso e pode mudar. O arquivo não informa o motivo da renúncia nem do indeferimento. A comparação com 2022 é aproximada: lá o TSE dá a classificação final de apto e inapto.",
      }}
    >
      <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
        <div className="space-y-3">
          {row("Mulheres, todas", u.FEMININO, "bg-coral")}
          {RACES.map((r) => row(RACE_F[r] ?? r, u.FEMININO_raca[r], "bg-coral/70"))}
        </div>
        <div className="space-y-3">
          {row("Homens, todos", u.MASCULINO, "bg-plum")}
          {RACES.map((r) => row(RACE_M[r] ?? r, u.MASCULINO_raca[r], "bg-plum/70"))}
        </div>
      </div>
      <ChartScale max={20} stacked />
    </ChartFrame>
  );
}
