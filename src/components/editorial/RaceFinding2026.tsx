import type { PublicSnapshot } from "@/lib/tse/snapshot.functions";
import {
  RACE_FINDING_CATEGORIES,
  POPULATION_FEMININE_2022,
  POPULATION_RACE_FEMININE_2022,
  CANDIDACY_FEMININE_RACE_2026,
  CANDIDACY_FEMININE_2026_TOTAL,
  type RaceFindingCategory,
} from "@/data/election-2026";
import { RACE_LABELS } from "@/data/historical-funnel";
import { ChartBar, ChartFrame, ChartScale, LegendSwatch } from "@/components/editorial/ChartFrame";
import { formatInt, formatPct, formatDecimal } from "@/lib/format-br";

const n = (v: number) => formatInt(v);
const pct = (v: number) => formatPct(v);

/** Normaliza o rótulo literal do TSE (ex.: "PARDA", "INDÍGENA") para a chave
 *  interna de categoria (parda, indigena). Sem agregações. */
function normalizeRaceKey(label: string): string {
  return label
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/** Lê os dados de candidatura da fotografia vigente, se disponível; senão,
 *  mantém os valores curados contra o TSE. Devolve também se a fotografia
 *  usada passou por conferência manual explícita (`conferido = true`), para
 *  que o rótulo nunca afirme conferência que não ocorreu. */
function getCandidateData(snapshot: PublicSnapshot | null) {
  const snapCounts = snapshot?.universes.proporcional?.raceCounts;
  if (snapCounts) {
    const normalized: Record<string, number> = {};
    for (const [label, count] of Object.entries(snapCounts)) {
      const key = normalizeRaceKey(label);
      normalized[key] = (normalized[key] ?? 0) + (count ?? 0);
    }
    const total = RACE_FINDING_CATEGORIES.reduce(
      (sum, key) => sum + (normalized[key] ?? 0),
      0,
    );
    if (total > 0) {
      const byRace = {} as Record<
        RaceFindingCategory,
        { count: number; percent: number }
      >;
      for (const key of RACE_FINDING_CATEGORIES) {
        const count = normalized[key] ?? 0;
        byRace[key] = { count, percent: (count / total) * 100 };
      }
      return {
        total,
        byRace,
        fromSnapshot: true,
        conferido: snapshot?.conferido === true,
      };
    }
  }
  return {
    total: CANDIDACY_FEMININE_2026_TOTAL,
    byRace: CANDIDACY_FEMININE_RACE_2026,
    fromSnapshot: false,
    conferido: false,
  };
}



const RACE_BAR_CLASS: Record<RaceFindingCategory, string> = {
  branca: "bg-[var(--race-branca)]",
  parda: "bg-[var(--race-parda)]",
  preta: "bg-plum",
  indigena: "bg-forest",
  amarela: "bg-[var(--race-amarela)]",
} as Record<RaceFindingCategory, string>;

function RacePair({
  category,
  pop,
  cand,
}: {
  category: RaceFindingCategory;
  pop: { count: number; percent: number };
  cand: { count: number; percent: number };
}) {
  const bar = RACE_BAR_CLASS[category] ?? "bg-plum";
  return (
    <li className="space-y-2 border-b border-rule py-4 first:pt-0 last:border-b-0">
      <p className="font-display text-lg text-ink">{RACE_LABELS[category]}</p>
      <ChartBar label="População" base={`${n(pop.count)} mulheres`} value={pop.percent} scaleMax={50} display={pct(pop.percent)} barClass={`${bar} opacity-45`} valueClass="text-muted-foreground" />
      <ChartBar label="Candidatas 2026" base={`${n(cand.count)} candidatas`} value={cand.percent} scaleMax={50} display={pct(cand.percent)} barClass={bar} />
    </li>
  );
}

/** Bloco editorial e visual: população feminina (Censo 2022) × candidaturas de
 *  mulheres nas proporcionais de 2026 (TSE), por cor/raça. */
export function RaceFinding2026({
  snapshot,
}: {
  snapshot: PublicSnapshot | null;
}) {
  const { total, byRace, fromSnapshot, conferido } = getCandidateData(snapshot);

  // Texto e gráfico leem os MESMOS valores: nada de número fixo no corpo.
  const popParda = POPULATION_RACE_FEMININE_2022.parda;
  const popBranca = POPULATION_RACE_FEMININE_2022.branca;
  const popPreta = POPULATION_RACE_FEMININE_2022.preta;
  const candParda = byRace.parda;
  const candBranca = byRace.branca;
  const candPreta = byRace.preta;
  const gapParda = candParda.percent - popParda.percent;
  const pp = (v: number) =>
    `${formatDecimal(Math.abs(v))} p.p.`;
  const sourceLabel = fromSnapshot
    ? conferido
      ? "fotografia vigente conferida"
      : "fotografia vigente"
    : "conferência manual dos valores curados contra o TSE";


  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <ChartFrame
          eyebrow="Cinco categorias, dois retratos"
          title="População feminina (Censo 2022) × candidatas a deputada (2026)"
          legend={<><LegendSwatch className="bg-plum opacity-45">População</LegendSwatch><LegendSwatch className="bg-plum">Candidatas</LegendSwatch></>}
          note="Cada categoria na sua cor; a barra clara é a população, a escura, as candidatas. Régua de 0 a 50%."
          source="Fontes: IBGE, Censo 2022; TSE, Candidaturas 2026"
        >
          <ul>
            {RACE_FINDING_CATEGORIES.map((category) => (
              <RacePair
                key={category}
                category={category}
                pop={POPULATION_RACE_FEMININE_2022[category]}
                cand={byRace[category]}
              />
            ))}
          </ul>
          <ChartScale max={50} />
        </ChartFrame>

        <div className="grid gap-5 md:grid-cols-3">
          <article className="poster-frame-accent p-5">
            <p className="record-label border-plum text-plum">Fato</p>
            <h3 className="mt-3 font-display text-xl text-ink">
              O que o dado mostra
            </h3>
            <div className="mt-3 space-y-3 leading-relaxed text-ink/70">
              <p>
                No Censo de 2022, mulheres pardas e brancas têm quase o mesmo
                tamanho: {pct(popParda.percent)} e {pct(popBranca.percent)} das
                brasileiras.
              </p>
              <p>
                Entre as candidaturas de mulheres às proporcionais de 2026,
                brancas são {pct(candBranca.percent)} e pardas{" "}
                {pct(candParda.percent)}. A candidatura parda fica {pp(gapParda)}{" "}
                {gapParda < 0 ? "abaixo" : "acima"} do tamanho da população
                parda feminina.
              </p>
              <p>
                A candidatura preta aparece no sentido oposto:{" "}
                {pct(candPreta.percent)} das candidatas, contra{" "}
                {pct(popPreta.percent)} da população feminina. Os percentuais
                deste parágrafo e as barras acima vêm da mesma fonte: a {sourceLabel}.
              </p>
            </div>

          </article>

          <article className="poster-frame-accent p-5">
            <p className="record-label border-ink text-ink [border-style:dashed]">
              Interpretação editorial
            </p>
            <h3 className="mt-3 font-display text-xl text-ink">
              Como lemos esse número
            </h3>
            <div className="mt-3 space-y-3 leading-relaxed text-ink/70">
              <p>
                Olhar só o total esconde a questão. Somadas, pretas e pardas são
                a maioria das mulheres do país, e esse total apaga que os dois
                grupos aparecem em direções opostas na disputa.
              </p>
              <p>
                É por isso que aqui as categorias ficam separadas. A distância
                parda só fica visível quando o número da candidatura é colocado
                ao lado do da população.
              </p>
            </div>
          </article>

          <article className="poster-frame-accent p-5">
            <p className="record-label border-ink text-ink">
              Hipótese em investigação
            </p>
            <h3 className="mt-3 font-display text-xl text-ink">
              O que ainda precisa ser apurado
            </h3>
            <div className="mt-3 space-y-3 leading-relaxed text-ink/70">
              <p>
                Por que a candidatura parda fica abaixo do peso populacional,
                esta comparação não responde — declaração de cor/raça, seleção
                partidária e composição de listas são hipóteses a testar com
                outras fontes, nenhuma delas demonstrada aqui.
              </p>
              <p>
                Também não sabemos o que acontece depois: estar na lista não é
                receber recursos, tempo de televisão, voto ou cadeira. Esses
                dados de 2026 ainda não existem.
              </p>
            </div>
          </article>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-ink/70">
        Denominadores: {n(total)} candidaturas de mulheres nas eleições
        proporcionais de 2026
        {fromSnapshot
          ? conferido
            ? " (lidas da fotografia vigente, conferida manualmente)"
            : " (lidas da fotografia vigente)"
          : ""}
        ; população

        feminina {n(POPULATION_FEMININE_2022)} (Censo 2022). Cor/raça autodeclarada, nas
        categorias do IBGE/TSE. Preta e parda são lidas separadamente; quando somadas como população negra, a soma é declarada. A
        comparação entre candidaturas (TSE proporcional 2026) e população
        feminina (Censo 2022) são dois retratos, cada um com seu denominador;
        leitura descritiva, não causal. Indígenas e amarelas: poucas
        candidaturas, ler pelo absoluto.
      </p>
    </div>
  );
}
