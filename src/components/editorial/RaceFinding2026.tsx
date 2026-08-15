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

/** Lê os dados de candidatura da fotografia conferida, se disponível; senão,
 *  mantém os valores curados contra o TSE. */
function getCandidateData(snapshot: PublicSnapshot | null) {
  const snap = snapshot?.universes.proporcional;
  const snapCounts = snap?.raceCounts;
  if (snapCounts) {
    const total = RACE_FINDING_CATEGORIES.reduce(
      (sum, key) => sum + (snapCounts[key] ?? 0),
      0,
    );
    if (total > 0) {
      const byRace = {} as Record<
        RaceFindingCategory,
        { count: number; percent: number }
      >;
      for (const key of RACE_FINDING_CATEGORIES) {
        const count = snapCounts[key] ?? 0;
        byRace[key] = { count, percent: (count / total) * 100 };
      }
      return { total, byRace, fromSnapshot: true };
    }
  }
  return {
    total: CANDIDACY_FEMININE_2026_TOTAL,
    byRace: CANDIDACY_FEMININE_RACE_2026,
    fromSnapshot: false,
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
      <span className="w-14 shrink-0 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
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
      <div className="font-mono text-[11px] uppercase tracking-wider text-ink">
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
        <p className="font-mono text-[11px] leading-tight text-muted-foreground">
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
        <p className="font-mono text-[11px] leading-tight text-ink">
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
  const { total, byRace, fromSnapshot } = getCandidateData(snapshot);

  const popMax = Math.max(
    ...RACE_FINDING_CATEGORIES.map((k) => POPULATION_RACE_FEMININE_2022[k].count),
    1,
  );
  const candMax = Math.max(
    ...RACE_FINDING_CATEGORIES.map((k) => byRace[k].count),
    1,
  );

  return (
    <div className="space-y-8">
      <p className="font-display text-xl leading-snug text-ink md:text-2xl">
        Olho:{" "}
        <span className="text-coral">
          Antes do primeiro voto, a política já filtra. E a mulher negra é a
          primeira a perder terreno.
        </span>
      </p>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="poster-frame p-5 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="poster-eyebrow text-ink">Cinco categorias, dois retratos</p>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              população feminina × candidatas 2026
            </span>
          </div>

          <div className="mt-5 hidden border-b border-ink pb-2 md:grid md:grid-cols-[7rem_1fr_1fr]">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Cor/raça
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              População feminina (Censo 2022)
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
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

        <div className="space-y-5">
          <article className="poster-frame p-5">
            <h3 className="font-display text-xl text-ink">O fato</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              A mulher negra — preta e parda somadas — é a maioria das brasileiras
              (54,5% das mulheres, Censo 2022). Entre as candidaturas de mulheres
              às proporcionais de 2026, deixa de ser maioria: cai para 52,4%. O
              maior grupo de mulheres do país encolhe já na largada, e a
              candidatura fica mais branca que o país (46% brancas).
            </p>
          </article>

          <article className="poster-frame p-5">
            <h3 className="font-display text-xl text-ink">
              A negritude não se divide
            </h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              A negritude não se divide, mas o apagamento se distribui: pretas e
              pardas formam a população negra, e é como população negra que a
              sub-representação se lê. Olhar as duas por dentro não parte essa
              identidade — mostra como o apagamento se distribui dentro dela.
            </p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              A parda, maior grupo de mulheres do país, é a que mais encolhe da
              população para a candidatura (quase 10 pontos). A preta aparece
              acima do seu tamanho na população. Não são histórias contrárias: o
              racismo não escolhe entre pretas e pardas — trata a mulher negra,
              nas suas duas formas de se declarar, de modo desigual em cada
              etapa.
            </p>
          </article>

          <article className="poster-frame p-5">
            <h3 className="font-display text-xl text-ink">
              O número que parece dizer o contrário
            </h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              A candidatura preta acima do peso populacional não é sinal de que o
              racismo afrouxou, e não deve ser lida assim. É o degrau mais baixo
              da disputa — estar na lista não é receber recursos, tempo de TV,
              voto, nem chegar ao poder. É no caminho da candidatura até a cadeira
              que essa presença se desfaz. A seção seguinte (o funil) mostra o
              que a urna faz com ela.
            </p>
          </article>
        </div>
      </div>

      <p className="font-mono text-[11px] leading-relaxed text-muted-foreground">
        Denominadores: {n(total)} candidaturas de mulheres nas eleições
        proporcionais de 2026
        {fromSnapshot ? " (lidas do snapshot conferido)" : ""}; população
        feminina 104,5 milhões (Censo 2022). Cor/raça autodeclarada, nas
        categorias do IBGE/TSE; "negra" = preta + parda (definição oficial). A
        comparação entre candidaturas (TSE proporcional 2026) e população
        feminina (Censo 2022) são dois retratos, cada um com seu denominador;
        leitura descritiva, não causal. Indígenas e amarelas: poucas
        candidaturas, ler pelo absoluto.
      </p>
    </div>
  );
}
