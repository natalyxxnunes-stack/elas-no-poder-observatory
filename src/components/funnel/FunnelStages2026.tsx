/**
 * FunnelStages2026 — visualização do funil de 2026.
 *
 * Regras que esta camada de apresentação nunca quebra:
 *  - cada etapa exibe o próprio denominador; nada é subtraído entre etapas;
 *  - proporcional e majoritário nunca se misturam num percentual;
 *  - nenhum índice novo é criado (não há taxa de conversão nem competitividade);
 *  - resultado eleitoral de 2026 tem denominador próprio: cadeiras, não candidaturas;
 *  - raça só é exibida DENTRO das candidaturas de mulheres, porque o
 *    denominador racial do universo total não existe na fotografia atual.
 *
 * Todos os números vêm da fotografia já auditada (Bloco 4/5.1), recebida por
 * props. Nenhum valor é fixado em código aqui.
 */

import { GapNote } from "@/components/GapNote";
import { BLACK_AGGREGATION_NOTE } from "@/lib/tse/historical-compute";
import type { PublicSnapshot } from "@/lib/tse/snapshot.functions";
import type { UniverseId } from "@/lib/tse/compute";
import { formatInt, formatPct } from "@/lib/format-br";
import { RACE_COLORS, type RaceCategory } from "@/data/historical-funnel";
import {
  RESULT_2026_GOVERNO,
  RESULT_2026_META,
  RESULT_2026_PROPORCIONAL,
  RESULT_2026_SENADO,
} from "@/data/resultado-2026";

const n = (v: number) => formatInt(v);
const pct = (v: number) => formatPct(v);

const UNIVERSE_LABEL: Record<UniverseId, string> = {
  proporcional: "Candidaturas proporcionais",
  majoritario: "Candidaturas majoritárias",
};

const UNIVERSE_POSITIONS: Record<UniverseId, string> = {
  proporcional:
    "Câmara dos Deputados, assembleias legislativas e Câmara Legislativa do DF",
  majoritario:
    "Presidência, governos estaduais e do DF e Senado: cargo único por disputa",
};

/** Faixa de uma etapa: barra preenchida pela participação feminina do universo. */
function StageBar({
  step,
  universe,
  feminine,
  total,
}: {
  step: number;
  universe: UniverseId;
  feminine: number;
  total: number;
}) {
  const share = (feminine / total) * 100;
  return (
    <li className="poster-frame overflow-hidden">
      <div className="flex flex-wrap items-baseline justify-between gap-3 px-5 pt-5">
        <div>
          <span className="block font-mono text-[12px] uppercase tracking-wider text-muted-foreground">
            etapa{" "}
            <span className="poster-figure align-middle text-3xl text-plum md:text-4xl">
              0{step}
            </span>
          </span>
          <h3 className="font-display text-xl text-ink md:text-2xl">
            {UNIVERSE_LABEL[universe]}
          </h3>
        </div>
      </div>

      <div className="px-5 pt-4">
        <div className="flex items-end justify-between gap-4">
          <p className="poster-figure text-5xl leading-none text-plum md:text-6xl">
            {pct(share)}
          </p>
          <p className="text-right text-sm leading-relaxed text-muted-foreground">
            {n(feminine)} candidaturas de mulheres
            <br />
            em {n(total)} candidaturas registradas
          </p>
        </div>

        <div
          className="mt-3 h-6 w-full overflow-hidden rounded-sm bg-secondary"
          role="img"
          aria-label={`${pct(share)} de mulheres entre ${n(total)} candidaturas ${
            universe === "proporcional" ? "proporcionais" : "majoritárias"
          }`}
        >
          <div
            className="h-full bg-plum"
            style={{ width: `${Math.max(share, 1.5)}%` }}
          />
        </div>
        <p className="mt-2 font-mono text-[12px] uppercase tracking-wider text-muted-foreground">
          barra lida dentro desta etapa · denominador próprio
        </p>
      </div>

      <p className="mt-4 border-t border-rule px-5 py-3 text-sm leading-relaxed text-muted-foreground">
        {UNIVERSE_POSITIONS[universe]}
      </p>
    </li>
  );
}

/** Recorte da etapa 1: cor/raça DENTRO das candidaturas de mulheres (não é etapa). */
function RaceStage({
  step,
  counts,
  universeLabel,
}: {
  step: number;
  counts: Record<string, number>;
  universeLabel: string;
}) {
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const denominator = entries.reduce((a, [, v]) => a + v, 0);
  const black = entries
    .filter(([k]) => ["PRETA", "PARDA"].includes(k.trim().toUpperCase()))
    .reduce((a, [, v]) => a + v, 0);
  const color = (label: string) => {
    const key = label.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() as RaceCategory;
    return RACE_COLORS[key] ?? "var(--color-muted-foreground)";
  };

  return (
    <li className="poster-frame overflow-hidden">
      <div className="flex flex-wrap items-baseline justify-between gap-3 px-5 pt-5">
        <div>
          <span className="block font-mono text-[12px] uppercase tracking-wider text-muted-foreground">
            recorte da etapa 0{step} · quem são as candidatas a deputada
          </span>
          <h3 className="font-display text-xl text-ink md:text-2xl">
            Quem são essas mulheres
          </h3>
        </div>
      </div>

      <p className="px-5 pt-2 text-sm leading-relaxed text-muted-foreground">
        Cor/raça autodeclarada no registro, dentro das {n(denominator)}{" "}
        candidaturas de mulheres {universeLabel}. Categorias originais do TSE,
        preservadas como estão na base.
      </p>

      <div className="px-5 pt-4">
        <div
          className="flex h-6 w-full overflow-hidden rounded-sm bg-secondary"
          aria-hidden
        >
          {entries.map(([label, value]) => (
            <div
              key={label}
              title={`${label}: ${n(value)}`}
              style={{ width: `${(value / denominator) * 100}%`, backgroundColor: color(label) }}
            />
          ))}
        </div>
        <dl className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
          {entries.map(([label, value]) => (
            <div key={label} className="flex items-baseline gap-2">
              <span
                aria-hidden
                className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: color(label) }}
              />
              <dt className="font-mono text-[12px] uppercase tracking-wider text-muted-foreground">
                {label}
              </dt>
              <dd className="ml-auto font-mono text-xs text-ink">
                {n(value)} · {pct((value / denominator) * 100)}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-4 border-t border-rule px-5 py-4">
        <p className="text-sm leading-relaxed text-ink">
          Agregação analítica declarada:{" "}
          NEGRA = PRETA + PARDA · {n(black)} candidaturas · {pct((black / denominator) * 100)}{" "}
          das candidaturas de mulheres deste universo.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {BLACK_AGGREGATION_NOTE}
        </p>
      </div>
    </li>
  );
}

/** Etapa 3: resultado do 1º turno. Denominador = cadeiras, não candidaturas. */
function ResultStage({ step }: { step: number }) {
  const r = RESULT_2026_PROPORCIONAL;
  const share = (r.elected.feminine / r.seats) * 100;
  const race = Object.entries(r.electedRaceFeminine).sort((a, b) => b[1] - a[1]);
  const color = (label: string) => {
    const key = label.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() as RaceCategory;
    return RACE_COLORS[key] ?? "var(--color-muted-foreground)";
  };
  const sen = RESULT_2026_SENADO;
  const gov = RESULT_2026_GOVERNO;
  return (
    <li className="poster-frame overflow-hidden">
      <div className="flex flex-wrap items-baseline justify-between gap-3 px-5 pt-5">
        <div>
          <span className="block font-mono text-[12px] uppercase tracking-wider text-muted-foreground">
            etapa{" "}
            <span className="poster-figure align-middle text-3xl text-plum md:text-4xl">
              0{step}
            </span>
          </span>
          <h3 className="font-display text-xl text-ink md:text-2xl">
            Eleitas e eleitos · 1º turno
          </h3>
        </div>
      </div>

      <div className="px-5 pt-4">
        <div className="flex items-end justify-between gap-4">
          <p className="poster-figure text-5xl leading-none text-plum md:text-6xl">
            {pct(share)}
          </p>
          <p className="text-right text-sm leading-relaxed text-muted-foreground">
            {n(r.elected.feminine)} mulheres eleitas
            <br />
            em {n(r.seats)} cadeiras de deputado(a)
          </p>
        </div>
        <div
          className="mt-3 h-6 w-full overflow-hidden rounded-sm bg-secondary"
          role="img"
          aria-label={`${pct(share)} de mulheres entre ${n(r.seats)} cadeiras de deputado(a) federal, estadual e distrital`}
        >
          <div className="h-full bg-coral" style={{ width: `${share}%` }} />
        </div>
        <p className="mt-2 font-mono text-[12px] uppercase tracking-wider text-muted-foreground">
          denominador: cadeiras em disputa, não candidaturas
        </p>
      </div>

      <div className="px-5 pt-5">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Cor/raça das {n(r.elected.feminine)} deputadas eleitas, nas categorias
          originais do TSE:
        </p>
        <div className="mt-3 flex h-6 w-full overflow-hidden rounded-sm bg-secondary" aria-hidden>
          {race.map(([label, value]) => (
            <div
              key={label}
              title={`${label}: ${n(value)}`}
              style={{ width: `${(value / r.elected.feminine) * 100}%`, backgroundColor: color(label) }}
            />
          ))}
        </div>
        <dl className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
          {race.map(([label, value]) => (
            <div key={label} className="flex items-baseline gap-2">
              <span
                aria-hidden
                className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: color(label) }}
              />
              <dt className="font-mono text-[12px] uppercase tracking-wider text-muted-foreground">
                {label}
              </dt>
              <dd className="ml-auto font-mono text-xs text-ink">
                {n(value)} · {pct((value / r.elected.feminine) * 100)}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Indígenas e amarelas têm base pequena: leia pelo número absoluto.
        </p>
      </div>

      <div className="mt-4 grid gap-4 border-t border-rule px-5 py-4 sm:grid-cols-2">
        <p className="text-sm leading-relaxed text-ink">
          <span className="block font-mono text-[12px] uppercase tracking-wider text-muted-foreground">Senado</span>
          {n(sen.electedFeminine)} mulheres em {n(sen.seats)} cadeiras em disputa (
          {pct((sen.electedFeminine / sen.seats) * 100)}). Eleitas por cor/raça:{" "}
          {Object.keys(sen.candidacyRaceFeminine)
            .map((k) => `${k.toLowerCase()} ${n((sen.electedRaceFeminine as Record<string, number>)[k] ?? 0)}`)
            .join(", ")}
          . Candidatas pretas ao Senado: {n(sen.candidacyRaceFeminine["PRETA"] ?? 0)}.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          <span className="block font-mono text-[12px] uppercase tracking-wider text-muted-foreground">Governos</span>
          {n(gov.electedFeminine)} mulher eleita nas {n(gov.decidedFirstRound)} disputas decididas no 1º turno
          (26 estados e DF). Nas {n(gov.runoffUfs.length)} que vão ao 2º turno em 25/10 ({gov.runoffUfs.join(", ")}),{" "}
          {n(gov.runoffFeminine)} das {n(gov.runoffCandidacies)} candidaturas são de mulheres, em{" "}
          {gov.runoffFeminineUfs.join(", ")}.
        </p>
      </div>

      <p className="border-t border-rule px-5 py-3 text-sm leading-relaxed text-muted-foreground">
        Resultado do 1º turno de 4/10/2026, lido do arquivo oficial do TSE gerado
        em {RESULT_2026_META.baseGeneratedAt} e recontado de forma independente.
        Presidência fora desta etapa: o arquivo ainda não traz a situação de
        totalização.
      </p>
    </li>
  );
}

export function FunnelStages2026({
  snapshot,
}: {
  snapshot: PublicSnapshot | null;
}) {
  if (!snapshot) {
    return (
      <GapNote label="Dados em atualização">
        A fotografia mais recente do registro de candidaturas do TSE não está
        disponível neste momento. Nenhum número é exibido no lugar dela.
      </GapNote>
    );
  }

  const prop = snapshot.universes.proporcional;
  const maj = snapshot.universes.majoritario;
  const raceCounts = prop.raceCounts ?? {};
  const hasRace = Object.keys(raceCounts).length > 0;
  const propShare = prop.total > 0 ? (prop.feminine / prop.total) * 100 : null;
  const majShare = maj.total > 0 ? (maj.feminine / maj.total) * 100 : null;

  return (
    <>
      <p className="mb-5 border-l-2 border-plum pl-3">
        <span className="block font-mono text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
          leitura do funil
        </span>
        <span className="mt-1 block font-display text-base italic leading-snug text-ink">
          O tamanho de cada etapa não representa as mesmas pessoas. Representa
          universos diferentes da disputa.
        </span>
      </p>
      <ol className="space-y-4">

      {prop.total > 0 && (
        <StageBar
          step={1}
          universe="proporcional"
          feminine={prop.feminine}
          total={prop.total}
        />
      )}
      {hasRace ? (
        <RaceStage
          step={1}
          counts={raceCounts}
          universeLabel="nas eleições proporcionais"
        />
      ) : (
        <li className="poster-frame p-5">
          <GapNote label="Lacuna declarada">
            A fotografia atual não trouxe cor/raça das candidaturas de mulheres
            neste universo. Sem esse dado, a distribuição por cor/raça fica de fora desta etapa.
          </GapNote>
        </li>
      )}
      {maj.total > 0 && (
        <StageBar
          step={2}
          universe="majoritario"
          feminine={maj.feminine}
          total={maj.total}
        />
      )}
      <ResultStage step={3} />
      </ol>

      {propShare !== null && majShare !== null && (
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <article className="poster-frame-accent p-5">
            <p className="record-label border-plum text-plum">Fato</p>
            <h3 className="mt-3 font-display text-xl text-ink">
              O que o dado mostra
            </h3>
            <p className="mt-3 leading-relaxed text-ink/70">
              Nas candidaturas proporcionais, mulheres são {pct(propShare)} de{" "}
              {n(prop.total)} registros. Nas majoritárias, {pct(majShare)} de{" "}
              {n(maj.total)}. Os dois percentuais saem da mesma fotografia, e
              cada etapa guarda o próprio denominador.
            </p>
          </article>

          <article className="poster-frame-accent p-5">
            <p className="record-label border-ink text-ink [border-style:dashed]">
              Interpretação editorial
            </p>
            <h3 className="mt-3 font-display text-xl text-ink">
              Como lemos esse contraste
            </h3>
            <p className="mt-3 leading-relaxed text-ink/70">
              A porta de entrada muda de tamanho de um universo para o outro:
              nas proporcionais, a regra de candidaturas de cada gênero incide
              sobre a lista inteira do partido; nas majoritárias, cada partido
              escolhe um único nome por cargo. A diferença entre os dois
              percentuais é um contraste descritivo entre contextos, não uma
              perda de pontos de uma etapa para a outra.
            </p>
          </article>

          <article className="poster-frame-accent p-5">
            <p className="record-label border-ink text-ink">
              Hipótese em investigação
            </p>
            <h3 className="mt-3 font-display text-xl text-ink">
              O que ainda precisa ser apurado
            </h3>
            <p className="mt-3 leading-relaxed text-ink/70">
              Por que a fatia de mulheres cai de {pct(propShare)} nas
              candidaturas proporcionais para{" "}
              {pct((RESULT_2026_PROPORCIONAL.elected.feminine / RESULT_2026_PROPORCIONAL.seats) * 100)}{" "}
              nas cadeiras. Votos por candidatura, quociente partidário e
              dinheiro de campanha são as próximas camadas a cruzar com o
              resultado.
            </p>
          </article>
        </div>
      )}
    </>
  );
}

