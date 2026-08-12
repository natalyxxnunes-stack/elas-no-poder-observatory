/**
 * FunnelStages2026 — visualização do funil de 2026.
 *
 * Regras que esta camada de apresentação nunca quebra:
 *  - cada etapa exibe o próprio denominador; nada é subtraído entre etapas;
 *  - proporcional e majoritário nunca se misturam num percentual;
 *  - nenhum índice novo é criado (não há taxa de conversão nem competitividade);
 *  - resultado eleitoral de 2026 aparece como etapa futura, nunca como zero;
 *  - raça só é exibida DENTRO das candidaturas de mulheres, porque o
 *    denominador racial do universo total não existe na fotografia atual.
 *
 * Todos os números vêm da fotografia já auditada (Bloco 4/5.1), recebida por
 * props. Nenhum valor é fixado em código aqui.
 */

import { GapNote } from "@/components/GapNote";
import { StatusTag } from "@/components/editorial/StatusTag";
import { BLACK_AGGREGATION_NOTE } from "@/lib/tse/historical-compute";
import type { PublicSnapshot } from "@/lib/tse/snapshot.functions";
import type { UniverseId } from "@/lib/tse/compute";

const n = (v: number) => v.toLocaleString("pt-BR");
const pct = (v: number) =>
  `${v.toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })}%`;

const UNIVERSE_LABEL: Record<UniverseId, string> = {
  proporcional: "Candidaturas proporcionais",
  majoritario: "Candidaturas majoritárias",
};

const UNIVERSE_POSITIONS: Record<UniverseId, string> = {
  proporcional:
    "Câmara dos Deputados, assembleias legislativas e Câmara Legislativa do DF",
  majoritario:
    "Presidência, governos estaduais e do DF e Senado — cargo único por disputa",
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
    <li className="editorial-card overflow-hidden">
      <div className="flex flex-wrap items-baseline justify-between gap-3 px-5 pt-5">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            etapa 0{step}
          </span>
          <h3 className="font-display text-xl text-ink md:text-2xl">
            {UNIVERSE_LABEL[universe]}
          </h3>
        </div>
        <StatusTag tone="ok">fotografia em andamento</StatusTag>
      </div>

      <div className="px-5 pt-4">
        <div className="flex items-end justify-between gap-4">
          <p className="data-figure text-4xl leading-none text-plum md:text-5xl">
            {pct(share)}
          </p>
          <p className="text-right font-mono text-[11px] leading-relaxed text-muted-foreground">
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
        <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          barra lida dentro desta etapa · denominador próprio
        </p>
      </div>

      <p className="mt-4 border-t border-rule px-5 py-3 text-sm leading-relaxed text-muted-foreground">
        {UNIVERSE_POSITIONS[universe]}
      </p>
    </li>
  );
}

/** Etapa 3: cor/raça DENTRO das candidaturas de mulheres. */
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

  return (
    <li className="editorial-card overflow-hidden">
      <div className="flex flex-wrap items-baseline justify-between gap-3 px-5 pt-5">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            etapa 0{step}
          </span>
          <h3 className="font-display text-xl text-ink md:text-2xl">
            Quem são essas mulheres
          </h3>
        </div>
        <StatusTag tone="limit">denominador restrito</StatusTag>
      </div>

      <p className="px-5 pt-2 text-sm leading-relaxed text-muted-foreground">
        Cor/raça autodeclarada no registro, dentro das {n(denominator)}{" "}
        candidaturas de mulheres {universeLabel}. Categorias originais do TSE,
        preservadas como estão na base.
      </p>

      <div className="px-5 pt-4">
        <div className="flex h-6 w-full overflow-hidden rounded-sm bg-secondary">
          {entries.map(([label, value], i) => (
            <div
              key={label}
              title={`${label}: ${n(value)}`}
              className={
                ["bg-plum", "bg-coral", "bg-yellow", "bg-ink"][i % 4] ??
                "bg-plum"
              }
              style={{ width: `${(value / denominator) * 100}%` }}
            />
          ))}
        </div>
        <dl className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
          {entries.map(([label, value], i) => (
            <div key={label} className="flex items-baseline gap-2">
              <span
                aria-hidden
                className={`mt-1 inline-block h-2 w-2 shrink-0 rounded-full ${
                  ["bg-plum", "bg-coral", "bg-yellow", "bg-ink"][i % 4] ??
                  "bg-plum"
                }`}
              />
              <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
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
          <strong className="font-semibold">
            NEGRA = PRETA + PARDA · {n(black)} candidaturas ·{" "}
            {pct((black / denominator) * 100)}
          </strong>{" "}
          das candidaturas de mulheres deste universo.
        </p>
        <p className="mt-2 font-mono text-[11px] leading-relaxed text-muted-foreground">
          {BLACK_AGGREGATION_NOTE}
        </p>
        <div className="mt-3">
          <GapNote label="Limitação declarada">
            A fotografia atual de 2026 grava cor/raça apenas das candidaturas de
            mulheres. Por isso não existe aqui percentual de candidaturas negras
            sobre o total de candidaturas de 2026: esse denominador não está no
            snapshot e não é estimado.
          </GapNote>
        </div>
      </div>
    </li>
  );
}

/** Etapa 4: resultado eleitoral — futura, nunca zero. */
function FutureStage({ step }: { step: number }) {
  return (
    <li className="editorial-card border-dashed bg-secondary/40 overflow-hidden">
      <div className="flex flex-wrap items-baseline justify-between gap-3 px-5 pt-5">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            etapa 0{step}
          </span>
          <h3 className="font-display text-xl text-ink md:text-2xl">
            Eleitas e eleitos
          </h3>
        </div>
        <StatusTag tone="pending">ainda não disponível</StatusTag>
      </div>

      <div className="px-5 pt-4">
        <p
          className="data-figure text-4xl leading-none text-muted-foreground md:text-5xl"
          aria-hidden
        >
          —
        </p>
        <div className="mt-3 h-6 w-full rounded-sm border border-dashed border-rule bg-[repeating-linear-gradient(135deg,transparent,transparent_6px,var(--color-rule,#ddd)_6px,var(--color-rule,#ddd)_7px)]" />
      </div>

      <div className="mt-4 border-t border-rule px-5 py-4">
        <p className="text-sm leading-relaxed text-muted-foreground">
          A eleição de 2026 ainda não ocorreu. Não há voto apurado nem cadeira
          atribuída: nenhum valor é exibido, nem como zero. Quando o resultado
          for publicado, o denominador desta etapa será o número de cadeiras em
          disputa — não o número de candidaturas.
        </p>
      </div>
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

  return (
    <ol className="space-y-4">
      {prop.total > 0 && (
        <StageBar
          step={1}
          universe="proporcional"
          feminine={prop.feminine}
          total={prop.total}
        />
      )}
      {maj.total > 0 && (
        <StageBar
          step={2}
          universe="majoritario"
          feminine={maj.feminine}
          total={maj.total}
        />
      )}
      {hasRace ? (
        <RaceStage
          step={3}
          counts={raceCounts}
          universeLabel="nas eleições proporcionais"
        />
      ) : (
        <li className="editorial-card p-5">
          <GapNote label="Lacuna declarada">
            A fotografia atual não trouxe cor/raça das candidaturas de mulheres
            neste universo. Ausência de dado não é ausência de mulheres negras.
          </GapNote>
        </li>
      )}
      <FutureStage step={4} />
    </ol>
  );
}
