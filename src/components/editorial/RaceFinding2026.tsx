import type { PublicSnapshot } from "@/lib/tse/snapshot.functions";
import {
  RACE_FINDING_CATEGORIES,
  POPULATION_FEMININE_2022,
  POPULATION_RACE_FEMININE_2022,
  CANDIDACY_FEMININE_RACE_2026,
  CANDIDACY_FEMININE_2026_TOTAL,
  type RaceFindingCategory,
} from "@/data/election-2026";
import { RACE_COLORS, RACE_LABELS } from "@/data/historical-funnel";

const n = (v: number) => v.toLocaleString("pt-BR");
const pct = (v: number) =>
  `${v.toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })}%`;

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



function MiniBar({
  count,
  max,
  color,
  label,
  category,
}: {
  count: number;
  max: number;
  color: string;
  label: string;
  category: RaceFindingCategory;
}) {
  const width = max > 0 ? (count / max) * 100 : 0;
  const isBranca = category === "branca";
  return (
    <div className="flex items-center gap-2">
      <span className="w-14 shrink-0 font-mono text-[12px] uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <div className="h-2 flex-1 overflow-hidden rounded-sm bg-secondary" aria-hidden>
        <div
          className="h-full rounded-sm"
          style={{
            width: count > 0 ? `${width}%` : "0%",
            background: color,
            minWidth: count > 0 ? "2px" : "0",
            border: isBranca ? "1px solid var(--rule)" : "none",
          }}
        />
      </div>
    </div>
  );
}

function RacePair({
  category,
  pop,
  cand,
  popMax,
  candMax,
}: {
  category: RaceFindingCategory;
  pop: { count: number; percent: number };
  cand: { count: number; percent: number };
  popMax: number;
  candMax: number;
}) {
  const color = RACE_COLORS[category];
  return (
    <li className="grid items-start gap-3 border-b border-rule py-4 last:border-b-0 md:grid-cols-[7rem_1fr_1fr]">
      <div className="font-mono text-[12px] uppercase tracking-wider text-ink">
        {RACE_LABELS[category]}
      </div>

      <div className="space-y-1.5">
        <MiniBar
          count={pop.count}
          max={popMax}
          color={color}
          label="Pop."
          category={category}
        />
        <p className="font-mono text-[12px] leading-tight text-muted-foreground">
          {n(pop.count)} · {pct(pop.percent)}
        </p>
      </div>

      <div className="space-y-1.5">
        <MiniBar
          count={cand.count}
          max={candMax}
          color={color}
          label="Cand."
          category={category}
        />
        <p className="font-mono text-[12px] leading-tight text-ink">
          {n(cand.count)} · {pct(cand.percent)}
        </p>
      </div>
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

  const popMax = Math.max(
    ...RACE_FINDING_CATEGORIES.map((k) => POPULATION_RACE_FEMININE_2022[k].count),
    1,
  );
  const candMax = Math.max(
    ...RACE_FINDING_CATEGORIES.map((k) => byRace[k].count),
    1,
  );

  // Texto e gráfico leem os MESMOS valores: nada de número fixo no corpo.
  const popParda = POPULATION_RACE_FEMININE_2022.parda;
  const popBranca = POPULATION_RACE_FEMININE_2022.branca;
  const popPreta = POPULATION_RACE_FEMININE_2022.preta;
  const candParda = byRace.parda;
  const candBranca = byRace.branca;
  const candPreta = byRace.preta;
  const gapParda = candParda.percent - popParda.percent;
  const pp = (v: number) =>
    `${Math.abs(v).toLocaleString("pt-BR", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    })} p.p.`;
  const sourceLabel = fromSnapshot
    ? conferido
      ? "fotografia vigente conferida"
      : "fotografia vigente"
    : "conferência manual dos valores curados contra o TSE";


  return (
    <div className="space-y-8">
      <p className="font-display text-xl leading-snug text-ink md:text-2xl">
        Olho:{" "}
        <span className="text-coral-ink">
          Pardas e brancas são quase do mesmo tamanho no país. Nas candidaturas, não são.
        </span>
      </p>

      <div className="space-y-6">
        <article className="poster-frame p-5 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="poster-eyebrow text-ink">Cinco categorias, dois retratos</p>
            <span className="font-mono text-[12px] uppercase tracking-wider text-muted-foreground">
              população feminina × candidatas 2026
            </span>
          </div>

          <div className="mt-5 hidden border-b border-ink pb-2 md:grid md:grid-cols-[7rem_1fr_1fr]">
            <span className="font-mono text-[12px] uppercase tracking-wider text-muted-foreground">
              Cor/raça
            </span>
            <span className="font-mono text-[12px] uppercase tracking-wider text-muted-foreground">
              População feminina (Censo 2022)
            </span>
            <span className="font-mono text-[12px] uppercase tracking-wider text-muted-foreground">
              Candidaturas de mulheres 2026
            </span>
          </div>

          <ul>
            {RACE_FINDING_CATEGORIES.map((category) => (
              <RacePair
                key={category}
                category={category}
                pop={POPULATION_RACE_FEMININE_2022[category]}
                cand={byRace[category]}
                popMax={popMax}
                candMax={candMax}
              />
            ))}
          </ul>
        </article>

        <div className="grid gap-5 md:grid-cols-3">
          <article className="poster-frame p-5">
            <p className="poster-eyebrow border-plum text-plum">Fato</p>
            <h3 className="mt-3 font-display text-xl text-ink">
              O que o dado mostra
            </h3>
            <p className="mt-3 leading-relaxed text-ink/70">
              No Censo de 2022, mulheres pardas e brancas têm quase o mesmo
              tamanho: {pct(popParda.percent)} e {pct(popBranca.percent)} das
              brasileiras. Entre as candidaturas de mulheres às proporcionais de
              2026, brancas são {pct(candBranca.percent)} e pardas{" "}
              {pct(candParda.percent)}. A candidatura parda fica {pp(gapParda)}{" "}
              {gapParda < 0 ? "abaixo" : "acima"} do tamanho da população parda
              feminina. A candidatura preta aparece no sentido oposto:{" "}
              {pct(candPreta.percent)} das candidatas, contra{" "}
              {pct(popPreta.percent)} da população feminina. Os percentuais deste
              parágrafo e as barras acima vêm da mesma fonte: a {sourceLabel}.
            </p>

          </article>

          <article className="poster-frame p-5">
            <p className="poster-eyebrow border-coral text-coral-ink">
              Interpretação editorial
            </p>
            <h3 className="mt-3 font-display text-xl text-ink">
              Como lemos esse número
            </h3>
            <p className="mt-3 leading-relaxed text-ink/70">
              Olhar só o total esconde a questão. Somadas, pretas e pardas são a maioria das mulheres do país, e esse total apaga que os dois grupos aparecem em direções opostas na disputa. É por isso que aqui as categorias ficam separadas. A distância parda só fica visível quando o número da candidatura é colocado ao lado do da população.
            </p>
          </article>

          <article className="poster-frame p-5">
            <p className="poster-eyebrow border-ink text-ink">
              Hipótese em investigação
            </p>
            <h3 className="mt-3 font-display text-xl text-ink">
              O que ainda precisa ser apurado
            </h3>
            <p className="mt-3 leading-relaxed text-ink/70">
              Por que a candidatura parda fica abaixo do peso populacional, esta comparação não responde — declaração de cor/raça, seleção partidária e composição de listas são hipóteses a testar com outras fontes, nenhuma delas demonstrada aqui. Também não sabemos o que acontece depois: estar na lista não é receber recursos, tempo de televisão, voto ou cadeira. Esses dados de 2026 ainda não existem.
            </p>
          </article>
        </div>
      </div>

      <p className="font-mono text-[12px] leading-relaxed text-ink/70">
        Denominadores: {n(total)} candidaturas de mulheres nas eleições
        proporcionais de 2026
        {fromSnapshot
          ? conferido
            ? " (lidas da fotografia vigente, conferida manualmente)"
            : " (lidas da fotografia vigente)"
          : ""}
        ; população

        feminina 104,5 milhões (Censo 2022). Cor/raça autodeclarada, nas
        categorias do IBGE/TSE. Preta e parda são lidas separadamente; quando somadas como população negra, a soma é declarada. A
        comparação entre candidaturas (TSE proporcional 2026) e população
        feminina (Censo 2022) são dois retratos, cada um com seu denominador;
        leitura descritiva, não causal. Indígenas e amarelas: poucas
        candidaturas, ler pelo absoluto.
      </p>
    </div>
  );
}
