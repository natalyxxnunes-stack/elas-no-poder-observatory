import { ChartBar, ChartFrame, ChartScale, LegendSwatch } from "@/components/editorial/ChartFrame";
import {
  DESPESAS_2026,
  DESPESAS_META,
  type DespesaGrupo,
  type DespesaRaca,
} from "@/data/despesas-2026";
import { formatBRLCompact, formatInt, formatPct } from "@/lib/format-br";

const RACES = ["BRANCA", "PARDA", "PRETA", "INDÍGENA", "AMARELA"] as const;
const RF: Record<string, string> = {
  BRANCA: "Brancas",
  PARDA: "Pardas",
  PRETA: "Pretas",
  INDÍGENA: "Indígenas",
  AMARELA: "Amarelas",
};
const RM: Record<string, string> = {
  BRANCA: "Brancos",
  PARDA: "Pardos",
  PRETA: "Pretos",
  INDÍGENA: "Indígenas",
  AMARELA: "Amarelos",
};
const SMALL = 20;
const n = formatInt;
const sum = (o: Record<string, number>) => Object.values(o).reduce((a, b) => a + b, 0);
const fefcShare = (o: Record<string, number>) => {
  const t = sum(o);
  return t > 0 ? ((o[DESPESAS_META.fefcLabel] ?? 0) / t) * 100 : 0;
};
const FONTE = `Fonte: TSE, Prestação de Contas Eleitorais 2026 (despesas pagas, despesas contratadas e doador originário) e Candidatos 2026, base de ${DESPESAS_META.baseGeneratedAt}, contas em andamento. Recontagem independente.`;

/** Quanto do que cada grupo pagou saiu do fundo eleitoral público. */
export function FundoNoGasto() {
  const p = DESPESAS_2026.proporcional;
  const bar = (label: string, g: DespesaGrupo | DespesaRaca, cls: string) => {
    const t = sum(g.pagoPorFonte);
    if (!t) return null;
    const v = fefcShare(g.pagoPorFonte);
    return (
      <ChartBar
        key={label}
        label={label}
        base={`${formatBRLCompact(g.pagoPorFonte[DESPESAS_META.fefcLabel] ?? 0)} de ${formatBRLCompact(t)} pagos · ${n(g.candidaturas)} candidaturas`}
        value={v}
        display={g.candidaturas >= SMALL ? formatPct(v) : `${n(g.candidaturas)} cand.`}
        barClass={cls}
        stacked
      />
    );
  };
  return (
    <ChartFrame
      eyebrow="Despesas pagas · deputada e deputado · 2026"
      title="Quanto do que cada grupo pagou na campanha saiu do fundo eleitoral público"
      legend={
        <>
          <LegendSwatch className="bg-coral">mulheres</LegendSwatch>
          <LegendSwatch className="bg-plum">homens</LegendSwatch>
        </>
      }
      note="O restante veio de doações de pessoas, recursos próprios, financiamento coletivo e Fundo Partidário. Régua de 0 a 100%."
      source={FONTE}
      ficha={{
        vendo:
          "A fatia das despesas pagas por cada grupo que teve como fonte o Fundo Especial de Financiamento de Campanha.",
        contados:
          "Candidaturas a deputada e deputado federal, estadual e distrital com despesa paga declarada.",
        denominador: "Total das despesas pagas pelo mesmo grupo de gênero e cor/raça.",
        data: `Prestação de contas do TSE de ${DESPESAS_META.baseGeneratedAt}`,
        fonte:
          "TSE, Prestação de Contas Eleitorais 2026 (despesas pagas, campo DS_FONTE_DESPESA) e Candidatos 2026",
        limitacao:
          "Contas em andamento: parte das candidaturas só entregou a prestação parcial. Despesa paga é diferente de despesa contratada; dívidas de campanha ainda não pagas ficam fora.",
      }}
    >
      <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
        <div className="space-y-3">
          {bar("Mulheres, todas", p.FEMININO, "bg-coral")}
          {RACES.map((r) => bar(RF[r] ?? r, p.FEMININO.porRaca[r] as DespesaRaca, "bg-coral/70"))}
        </div>
        <div className="space-y-3">
          {bar("Homens, todos", p.MASCULINO, "bg-plum")}
          {RACES.map((r) => bar(RM[r] ?? r, p.MASCULINO.porRaca[r] as DespesaRaca, "bg-plum/70"))}
        </div>
      </div>
      <ChartScale max={100} stacked />
    </ChartFrame>
  );
}

/** Onde o dinheiro foi gasto: os maiores tipos de despesa contratada, mulheres × homens. */
export function TiposDeGasto() {
  const f = DESPESAS_2026.proporcional.FEMININO;
  const m = DESPESAS_2026.proporcional.MASCULINO;
  const tipos = Object.keys(f.contratadoPorTipo).slice(0, 8);
  return (
    <ChartFrame
      eyebrow="Despesas contratadas · deputada e deputado · 2026"
      title="Em que as campanhas gastaram: a fatia de cada tipo de despesa no gasto de mulheres e de homens"
      legend={
        <>
          <LegendSwatch className="bg-coral">mulheres</LegendSwatch>
          <LegendSwatch className="bg-plum">homens</LegendSwatch>
        </>
      }
      note={`Os oito maiores tipos de despesa das candidatas. Total contratado: ${formatBRLCompact(f.contratadoTotal)} pelas mulheres e ${formatBRLCompact(m.contratadoTotal)} pelos homens. Régua de 0 a 25%.`}
      source={FONTE}
      ficha={{
        vendo:
          "Como o gasto contratado de mulheres e de homens se divide entre os tipos de despesa declarados ao TSE.",
        contados:
          "Despesas contratadas por candidaturas a deputada e deputado federal, estadual e distrital.",
        denominador: "Total contratado pelo mesmo gênero.",
        data: `Prestação de contas do TSE de ${DESPESAS_META.baseGeneratedAt}`,
        fonte:
          "TSE, Prestação de Contas Eleitorais 2026 (despesas contratadas, campo DS_ORIGEM_DESPESA)",
        limitacao:
          "A classificação do tipo de despesa é feita pela própria campanha. “Serviços prestados por terceiros” é uma categoria ampla, que junta coisas diferentes.",
      }}
    >
      <div className="space-y-5">
        {tipos.map((t) => {
          const vf = ((f.contratadoPorTipo[t] ?? 0) / f.contratadoTotal) * 100;
          const vm = ((m.contratadoPorTipo[t] ?? 0) / m.contratadoTotal) * 100;
          return (
            <div key={t} className="space-y-1.5">
              <ChartBar
                label={t}
                base={formatBRLCompact(f.contratadoPorTipo[t] ?? 0)}
                value={vf}
                display={formatPct(vf)}
                barClass="bg-coral"
                scaleMax={25}
              />
              <ChartBar
                label=""
                base={formatBRLCompact(m.contratadoPorTipo[t] ?? 0)}
                value={vm}
                display={formatPct(vm)}
                barClass="bg-plum"
                scaleMax={25}
              />
            </div>
          );
        })}
      </div>
      <ChartScale max={25} />
    </ChartFrame>
  );
}

/** Financiamento coletivo: quantas candidaturas usaram, quanto arrecadaram e de quantas pessoas. */
export function Vaquinhas() {
  const p = DESPESAS_2026.proporcional;
  const rows: { label: string; g: DespesaGrupo | DespesaRaca; cls: string }[] = [
    { label: "Mulheres, todas", g: p.FEMININO, cls: "bg-coral" },
    ...RACES.map((r) => ({
      label: RF[r] ?? r,
      g: p.FEMININO.porRaca[r] as DespesaRaca,
      cls: "bg-coral/70",
    })),
    { label: "Homens, todos", g: p.MASCULINO, cls: "bg-plum" },
    ...RACES.map((r) => ({
      label: RM[r] ?? r,
      g: p.MASCULINO.porRaca[r] as DespesaRaca,
      cls: "bg-plum/70",
    })),
  ];
  return (
    <ChartFrame
      eyebrow="Financiamento coletivo · deputada e deputado · 2026"
      title="Quem usou vaquinha virtual, quanto arrecadou e de quantas pessoas"
      note="Fatia das candidaturas do grupo que declarou receita de financiamento coletivo. Abaixo de cada barra: o total arrecadado, a mediana por candidatura e a mediana de doadoras e doadores distintos. Régua de 0 a 25%."
      source={FONTE}
      ficha={{
        vendo:
          "Quantas candidaturas de cada grupo arrecadaram por financiamento coletivo e quanto.",
        contados: "Candidaturas a deputada e deputado federal, estadual e distrital.",
        denominador: "Candidaturas do mesmo grupo de gênero e cor/raça.",
        data: `Prestação de contas do TSE de ${DESPESAS_META.baseGeneratedAt}`,
        fonte:
          "TSE, Prestação de Contas Eleitorais 2026 (receitas de financiamento coletivo e arquivo de doador originário)",
        limitacao:
          "Mostra só o que foi declarado como financiamento coletivo. Pix e doações diretas de pessoas entram em outra categoria e ficam fora daqui.",
      }}
    >
      <div className="grid gap-x-8 gap-y-3 md:grid-cols-2">
        {rows.map(({ label, g, cls }) =>
          g ? (
            <ChartBar
              key={label}
              label={label}
              base={`${n(g.comVaquinha)} de ${n(g.candidaturas)} · ${formatBRLCompact(g.vaquinhaTotal)} · mediana ${formatBRLCompact(g.vaquinhaMediana)} e ${n(g.doadoresMediana)} pessoas`}
              value={(g.comVaquinha / g.candidaturas) * 100}
              display={
                g.candidaturas >= SMALL
                  ? formatPct((g.comVaquinha / g.candidaturas) * 100)
                  : `${n(g.comVaquinha)} de ${n(g.candidaturas)}`
              }
              barClass={cls}
              scaleMax={25}
              stacked
            />
          ) : null,
        )}
      </div>
      <ChartScale max={25} stacked />
    </ChartFrame>
  );
}
