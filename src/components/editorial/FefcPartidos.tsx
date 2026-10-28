import { ChartFrame } from "@/components/editorial/ChartFrame";
import {
  FEFC_META,
  FEFC_PARTIDOS,
  FEFC_PARTIDOS_SEM_FUNDO,
  FEFC_TOTAL,
  type FefcGrupo,
  type FefcPartido,
} from "@/data/fefc-partidos-2026";
import { formatBRLCompact, formatDecimal, formatInt, formatPct } from "@/lib/format-br";

const SMALL = 20;
const ZERO: FefcGrupo = { candidaturas: 0, fefc: 0 };
const n = formatInt;

/** Grupos mostrados, sempre nesta ordem; pretas + pardas é soma declarada. */
const GRUPOS: { key: string; label: string; get: (p: FefcPartido) => FefcGrupo }[] = [
  { key: "mulheres", label: "Mulheres", get: (p) => p.mulheres },
  { key: "BRANCA", label: "Brancas e brancos", get: (p) => p.raca["BRANCA"] ?? ZERO },
  { key: "PARDA", label: "Pardas e pardos", get: (p) => p.raca["PARDA"] ?? ZERO },
  { key: "PRETA", label: "Pretas e pretos", get: (p) => p.raca["PRETA"] ?? ZERO },
  { key: "soma", label: "Pretas e pardos (soma)", get: (p) => p.pretasPardasSoma },
  { key: "INDÍGENA", label: "Indígenas", get: (p) => p.raca["INDÍGENA"] ?? ZERO },
  { key: "AMARELA", label: "Amarelas e amarelos", get: (p) => p.raca["AMARELA"] ?? ZERO },
];

function Cell({ g, p }: { g: FefcGrupo; p: FefcPartido }) {
  if (p.candidaturas < SMALL || p.comFefc < SMALL) {
    return (
      <span className="font-mono text-[11px] text-muted-foreground">
        {n(g.candidaturas)} de {n(p.candidaturas)}
      </span>
    );
  }
  const cand = (g.candidaturas / p.candidaturas) * 100;
  const fundo = p.fefc > 0 ? (g.fefc / p.fefc) * 100 : 0;
  const diff = fundo - cand;
  return (
    <span className="block font-mono text-[11px] leading-tight">
      <span className="text-muted-foreground">{formatPct(cand)}</span>
      <span className="text-muted-foreground"> → </span>
      <span className="text-ink">{formatPct(fundo)}</span>
      <span className={`block ${diff <= -5 ? "font-semibold text-coral-ink" : "text-muted-foreground"}`}>
        {diff >= 0 ? "+" : "−"}
        {formatDecimal(Math.abs(diff))} p.p.
      </span>
    </span>
  );
}

export function FefcPartidos() {
  const rows = Object.entries(FEFC_PARTIDOS);
  return (
    <ChartFrame
      eyebrow="Fundo eleitoral (FEFC) por partido · 2026"
      title="Em cada partido, a fatia de cada grupo nas candidaturas e no fundo eleitoral que chegou a elas"
      note={
        <>
          Cada célula: fatia do grupo entre as candidaturas do partido → fatia do grupo no FEFC recebido pelas
          candidaturas do partido, e a diferença em pontos percentuais. Em laranja, diferenças de 5 p.p. ou mais
          abaixo. Partidos com menos de 20 candidaturas, ou com fundo em menos de 20 delas, mostram só o número absoluto de candidaturas do grupo: ali uma única campanha muda o percentual inteiro. Ordem pelo total de FEFC, sem
          classificar mérito.
          {FEFC_PARTIDOS_SEM_FUNDO.length > 0 ? ` Sem FEFC declarado: ${FEFC_PARTIDOS_SEM_FUNDO.join(", ")}.` : ""}
        </>
      }
      source={`Fonte: TSE, Prestação de Contas Eleitorais 2026 (base de ${FEFC_META.baseGeneratedAt}, contas em andamento) e Candidatos 2026. Recontagem independente.`}
      ficha={{
        vendo:
          "Para cada partido, se o fundo eleitoral que chegou às candidaturas acompanhou a presença de mulheres e de cada grupo de cor/raça entre elas.",
        contados: `Todos os pedidos de registro titulares de 2026 (deputada e deputado, governo, Senado e Presidência): ${n(FEFC_TOTAL.candidaturas)} candidaturas.`,
        denominador:
          "Candidaturas do próprio partido (primeiro número) e FEFC recebido pelas candidaturas do próprio partido (segundo número).",
        data: `Prestação de contas e registro do TSE de ${FEFC_META.baseGeneratedAt}`,
        fonte: "TSE, Prestação de Contas Eleitorais 2026 (receitas, fonte Fundo Especial) e Candidatos 2026",
        limitacao:
          "Mede o fundo que chegou às candidaturas, não o total do partido. Contas em andamento até a prestação final. A regra do TSE usa outro universo (20.560 pedidos aceitos até 18/08/2026). Não é verificação de cumprimento da lei. A soma pretas e pardos segue o critério legal de candidaturas negras e aparece ao lado das categorias separadas.",
      }}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[64rem] text-sm">
          <thead>
            <tr className="align-bottom font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              <th className="pb-2 pr-3 text-left font-normal">Partido</th>
              <th className="pb-2 pr-3 text-right font-normal">FEFC</th>
              {GRUPOS.map((g) => (
                <th key={g.key} className="pb-2 pr-3 text-left font-normal">
                  {g.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-t-2 border-ink align-top">
              <th scope="row" className="py-2 pr-3 text-left font-display text-base text-ink">
                Todos
              </th>
              <td className="py-2 pr-3 text-right font-mono text-xs text-ink">{formatBRLCompact(FEFC_TOTAL.fefc)}</td>
              {GRUPOS.map((g) => (
                <td key={g.key} className="py-2 pr-3">
                  <Cell g={g.get(FEFC_TOTAL)} p={FEFC_TOTAL} />
                </td>
              ))}
            </tr>
            {rows.map(([party, p]) => (
              <tr key={party} className="border-t border-rule align-top">
                <th scope="row" className="py-2 pr-3 text-left font-mono text-xs font-semibold text-ink">
                  {party}
                  <span className="block font-normal text-muted-foreground">
                    {n(p.candidaturas)} cand. · {n(p.comFefc)} com fundo
                  </span>
                </th>
                <td className="py-2 pr-3 text-right font-mono text-xs text-ink">{formatBRLCompact(p.fefc)}</td>
                {GRUPOS.map((g) => (
                  <td key={g.key} className="py-2 pr-3">
                    <Cell g={g.get(p)} p={p} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ChartFrame>
  );
}
