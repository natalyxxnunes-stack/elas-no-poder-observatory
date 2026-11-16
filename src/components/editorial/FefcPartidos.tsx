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
  { key: "soma", label: "Candidaturas negras (pretas + pardas)", get: (p) => p.pretasPardasSoma },
  { key: "INDÍGENA", label: "Indígenas", get: (p) => p.raca["INDÍGENA"] ?? ZERO },
  { key: "AMARELA", label: "Amarelas e amarelos", get: (p) => p.raca["AMARELA"] ?? ZERO },
];

function Cell({ g, p, k }: { g: FefcGrupo; p: FefcPartido; k: string }) {
  if (p.candidaturas < SMALL || p.comFefc < SMALL) {
    return (
      <span className="font-mono text-[13px] text-muted-foreground">
        {n(g.candidaturas)} de {n(p.candidaturas)}
      </span>
    );
  }
  const cand = (g.candidaturas / p.candidaturas) * 100;
  const fundo = p.fefc > 0 ? (g.fefc / p.fefc) * 100 : 0;
  const diff = fundo - cand;
  return (
    <span className="block font-mono text-[13px] leading-tight">
      <span className="text-muted-foreground">{formatPct(cand)}</span>
      <span className="text-muted-foreground"> → </span>
      <span className="font-semibold text-ink">{formatPct(fundo)}</span>
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
          apresentado neste quadro, sem sinalização de infração. O piso constitucional de financiamento
          exige exame do conjunto dos recursos partidários e das campanhas abrangidas pelas normas,
          inclusive disputas majoritárias; percentuais inferiores a 30% neste recorte proporcional
          não demonstram, por si, descumprimento. Partidos com menos de 20 candidaturas, ou com fundo em menos de
          20 delas, mostram só o número absoluto de candidaturas do grupo: ali uma única campanha
          muda o percentual inteiro. Ordem pelo total de FEFC, sem classificar mérito.
          {FEFC_PARTIDOS_SEM_FUNDO.length > 0
            ? ` Sem FEFC declarado: ${FEFC_PARTIDOS_SEM_FUNDO.join(", ")}.`
            : ""}
        </>
      }
      source={`Fonte: TSE, Prestação de Contas Eleitorais 2026 (base de ${FEFC_META.baseGeneratedAt}, declarações disponíveis até a geração da base) e Candidatos 2026. Recontagem independente.`}
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
          "O piso de financiamento incide sobre o universo partidário pertinente, que também abrange disputas majoritárias; esta tabela restringe-se a candidaturas a deputado. A atribuição de recursos às chapas majoritárias exige exame próprio da prestação de contas, da legislação e das decisões aplicáveis. A tabela contabiliza o FEFC declarado recebido até a geração da base, sujeita a retificações e julgamento, sem demonstrar cumprimento ou infração legal. Pretas e pardas são somadas apenas no campo identificado como candidaturas negras, preservando as categorias separadas nas demais colunas.",
      }}
    >
      <p className="mb-3 text-[13px] leading-relaxed text-muted-foreground md:hidden">
        Deslize a tabela para o lado para comparar as colunas. O título de cada coluna indica o grupo.
      </p>
      <div tabIndex={0} role="region" aria-label="Tabela do fundo eleitoral por partido, rolável na horizontal" className="overflow-x-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-plum">
        <table className="w-full min-w-[64rem] text-sm">
          <thead>
            <tr className="align-bottom text-[13px] text-muted-foreground font-semibold">
              <th className="sticky left-0 z-10 bg-paper pb-2 pr-3 text-left font-normal">Partido</th>
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
              <th scope="row" className="sticky left-0 z-10 bg-paper py-2 pr-3 text-left font-display text-base text-ink">
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
                  className="sticky left-0 z-10 bg-paper py-2 pr-3 text-left font-mono text-xs font-semibold text-ink"
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
