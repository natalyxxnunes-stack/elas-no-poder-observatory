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

/** Pisos constitucionais: mulheres (EC 117/2022) e pretas e pardos somados (EC 133/2024). */
const PISO: Record<string, number> = { mulheres: 30, soma: 30 };

function Cell({ g, p, k }: { g: FefcGrupo; p: FefcPartido; k: string }) {
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
  const piso = PISO[k];
  const abaixoDoPiso = piso !== undefined && fundo < piso;
  return (
    <span className="block font-mono text-[11px] leading-tight">
      <span className="text-muted-foreground">{formatPct(cand)}</span>
      <span className="text-muted-foreground"> → </span>
      <span className={abaixoDoPiso ? "bg-coral px-0.5 font-semibold text-ink" : "text-ink"}>
        {formatPct(fundo)}
      </span>
      <span className="block text-muted-foreground">
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
      eyebrow="Fundo eleitoral (FEFC) por partido · deputada e deputado · 2026"
      title="Em cada partido, a fatia de cada grupo nas candidaturas a deputado e no fundo eleitoral que chegou a elas"
      note={
        <>
          Cada célula: fatia do grupo entre as candidaturas do partido → fatia do grupo no FEFC
          recebido pelas candidaturas do partido, e a diferença em pontos percentuais. Fundo em
          laranja: abaixo de 30% nas candidaturas a deputado, a referência dos pisos constitucionais
          para mulheres (EC 117/2022) e para candidaturas pretas e pardas somadas (EC 133/2024). O
          piso vale para o total do partido em todos os cargos, por isso o laranja marca o que merece
          apuração. Partidos com menos de 20 candidaturas, ou com fundo em menos de
          20 delas, mostram só o número absoluto de candidaturas do grupo: ali uma única campanha
          muda o percentual inteiro. Ordem pelo total de FEFC, sem classificar mérito.
          {FEFC_PARTIDOS_SEM_FUNDO.length > 0
            ? ` Sem FEFC declarado: ${FEFC_PARTIDOS_SEM_FUNDO.join(", ")}.`
            : ""}
        </>
      }
      source={`Fonte: TSE, Prestação de Contas Eleitorais 2026 (base de ${FEFC_META.baseGeneratedAt}, contas em andamento) e Candidatos 2026. Recontagem independente.`}
      ficha={{
        vendo:
          "Para cada partido, se o fundo eleitoral que chegou às candidaturas acompanhou a presença de mulheres e de cada grupo de cor/raça entre elas.",
        contados: `Pedidos de registro para deputada e deputado federal, estadual e distrital em 2026: ${n(FEFC_TOTAL.candidaturas)} candidaturas. Governo, Senado e Presidência ficam fora desta tabela.`,
        denominador:
          "Candidaturas do próprio partido (primeiro número) e FEFC recebido pelas candidaturas do próprio partido (segundo número).",
        data: `Prestação de contas e registro do TSE de ${FEFC_META.baseGeneratedAt}`,
        fonte:
          "TSE, Prestação de Contas Eleitorais 2026 (receitas, fonte Fundo Especial) e Candidatos 2026",
        limitacao:
          "O piso de 30% vale para o total que cada partido distribui, somando todos os cargos; esta tabela mostra só as candidaturas a deputado, onde não há vice nem suplente. Nas chapas de governo e Senado, partidos e procuradorias eleitorais divergem sobre contar o dinheiro de chapas com vice ou suplente mulher. Mede o fundo que chegou às candidaturas, com contas em andamento até a prestação final. Por isso a tabela descreve a distribuição e não verifica cumprimento da lei. A soma pretas e pardos segue o critério legal de candidaturas negras e aparece ao lado das categorias separadas.",
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
              <td className="py-2 pr-3 text-right font-mono text-xs text-ink">
                {formatBRLCompact(FEFC_TOTAL.fefc)}
              </td>
              {GRUPOS.map((g) => (
                <td key={g.key} className="py-2 pr-3">
                  <Cell g={g.get(FEFC_TOTAL)} p={FEFC_TOTAL} k={g.key} />
                </td>
              ))}
            </tr>
            {rows.map(([party, p]) => (
              <tr key={party} className="border-t border-rule align-top">
                <th
                  scope="row"
                  className="py-2 pr-3 text-left font-mono text-xs font-semibold text-ink"
                >
                  {party}
                  <span className="block font-normal text-muted-foreground">
                    {n(p.candidaturas)} cand. · {n(p.comFefc)} com fundo
                  </span>
                </th>
                <td className="py-2 pr-3 text-right font-mono text-xs text-ink">
                  {formatBRLCompact(p.fefc)}
                </td>
                {GRUPOS.map((g) => (
                  <td key={g.key} className="py-2 pr-3">
                    <Cell g={g.get(p)} p={p} k={g.key} />
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
