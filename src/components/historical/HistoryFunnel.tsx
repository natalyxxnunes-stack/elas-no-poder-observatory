/**
 * HistoryFunnel — funil candidatura → eleição nos anos fechados, com recorte de
 * raça por dentro. Usa apenas a constante curada `HISTORICAL_FUNNEL`; não toca em
 * banco nem pipeline.
 *
 * Regras de leitura mantidas:
 *  - cada ano e cada etapa têm denominador próprio;
 *  - nenhum percentual é subtraído de outro;
 *  - 2026 exibe só a candidatura; a eleição fica vazia/hachurada;
 *  - cor/raça é autodeclarada e TODAS as categorias do TSE são exibidas, na
 *    ordem fixa, com número absoluto sempre visível.
 */

import {
  HISTORICAL_FUNNEL,
  HISTORICAL_FUNNEL_SOURCE,
  RACE_CATEGORIES,
  RACE_COLORS,
  RACE_LABELS,
  type RaceBreakdown,
} from "@/data/historical-funnel";
import { StatusTag } from "@/components/editorial/StatusTag";

const n = (v: number) => v.toLocaleString("pt-BR");
const pct = (v: number) =>
  `${v.toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })}%`;

function RaceMiniBars({ race, stageLabel }: { race: RaceBreakdown; stageLabel: string }) {
  const totalCount = RACE_CATEGORIES.reduce((acc, key) => acc + race[key].count, 0);
  if (totalCount <= 0) return null;

  return (
    <div className="mt-3 space-y-1.5">
      <div
        className="flex h-2.5 w-full overflow-hidden rounded-sm border border-ink/20 bg-secondary"
        role="img"
        aria-label={`Cor/raça na ${stageLabel.toLowerCase()}: ${RACE_CATEGORIES.map(
          (key) => `${RACE_LABELS[key]} ${n(race[key].count)} (${pct(race[key].percent)})`,
        ).join(", ")}`}
      >
        {RACE_CATEGORIES.map((key) =>
          race[key].count > 0 ? (
            <div
              key={key}
              className="h-full"
              style={{
                width: `${(race[key].count / totalCount) * 100}%`,
                minWidth: "2px",
                background: RACE_COLORS[key],
              }}
            />
          ) : null,
        )}
      </div>
      <dl className="grid grid-cols-1 gap-x-3 gap-y-0.5 font-mono text-[10px] leading-tight sm:grid-cols-2">
        {RACE_CATEGORIES.map((key) => (
          <div key={key} className="flex items-center gap-1.5">
            <span
              aria-hidden
              className="inline-block h-2 w-2 shrink-0 rounded-full border border-ink/40"
              style={{ background: RACE_COLORS[key] }}
            />
            <dt className="text-muted-foreground">{RACE_LABELS[key]}</dt>
            <dd className="ml-auto whitespace-nowrap text-ink">
              {n(race[key].count)} · {pct(race[key].percent)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function StageColumn({
  label,
  femininePercent,
  feminine,
  total,
  race,
  empty,
  emptyLabel,
}: {
  label: string;
  femininePercent: number;
  feminine: number;
  total: number;
  race: RaceBreakdown | null;
  empty?: boolean;
  emptyLabel?: string;
}) {
  return (
    <div className="flex flex-col">
      <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className={`poster-figure mt-1 text-3xl leading-none ${empty ? "text-muted-foreground" : "text-plum"} md:text-4xl`}>
        {empty ? "—" : pct(femininePercent)}
      </p>
      {!empty && (
        <p className="mt-1 font-mono text-[11px] leading-relaxed text-muted-foreground">
          {n(feminine)} de {n(total)} {label === "Candidatura" ? "candidaturas" : "eleitas"}
        </p>
      )}
      <div
        className="mt-2 h-6 w-full overflow-hidden rounded-sm"
        role="img"
        aria-label={
          empty
            ? `${label} ainda não disponível`
            : `${pct(femininePercent)} de mulheres na ${label.toLowerCase()}: ${n(feminine)} de ${n(total)}`
        }
      >
        {empty ? (
          <div className="flex h-full w-full items-center justify-center rounded-sm border border-dashed border-rule bg-[repeating-linear-gradient(135deg,transparent,transparent_6px,var(--color-rule,#ddd)_6px,var(--color-rule,#ddd)_7px)]">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {emptyLabel ?? "não disponível"}
            </span>
          </div>
        ) : (
          <div className="h-full bg-plum" style={{ width: `${Math.max(femininePercent, 1.5)}%` }} />
        )}
      </div>
      {!empty && race && <RaceMiniBars race={race} stageLabel={label} />}
      {empty && (
        <p className="mt-2 font-mono text-[10px] leading-relaxed text-muted-foreground">
          Eleição de novembro de 2026 ainda não ocorreu. Nenhum valor é projetado.
        </p>
      )}
    </div>
  );
}

function YearCard({ year }: { year: (typeof HISTORICAL_FUNNEL)[number] }) {
  return (
    <li className="poster-frame p-5 md:p-6">
      <div className="flex items-start justify-between gap-3">
        <p className="poster-figure text-4xl text-ink md:text-5xl">{year.year}</p>
        <StatusTag tone={year.stage === "em_curso" ? "pending" : "ok"}>
          {year.stage === "em_curso" ? "base em curso" : "eleição encerrada"}
        </StatusTag>
      </div>
      <div className="mt-6 grid gap-6">
        <StageColumn
          label="Candidatura"
          femininePercent={year.candidacy.femininePercent}
          feminine={year.candidacy.feminine}
          total={year.candidacy.total}
          race={year.candidacy.race}
        />
        {year.elected ? (
          <StageColumn
            label="Eleição"
            femininePercent={year.elected.femininePercent}
            feminine={year.elected.feminine}
            total={year.elected.total}
            race={year.elected.race}
          />
        ) : (
          <StageColumn
            label="Eleição"
            femininePercent={0}
            feminine={0}
            total={0}
            race={null}
            empty
            emptyLabel="eleição em nov/2026"
          />
        )}
      </div>
    </li>
  );
}

export function HistoryFunnel() {
  return (
    <div className="space-y-8">
      <p className="font-display text-xl leading-snug text-ink md:text-2xl">
        Olho: <span className="text-coral">Candidatar-se não é eleger-se.</span>
      </p>

      <ol className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {HISTORICAL_FUNNEL.map((year) => (
          <YearCard key={year.year} year={year} />
        ))}
      </ol>

      <div className="grid gap-6 md:grid-cols-3">
        <article className="editorial-card p-5">
          <h3 className="font-display text-lg text-ink">Tamanho do funil</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Em 2022, mulheres foram 34,1% das candidaturas proporcionais e 17,9% das
            eleitas — a urna cortou quase metade da participação.
          </p>
        </article>
        <article className="editorial-card p-5">
          <h3 className="font-display text-lg text-ink">No tempo</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            O funil se repete nos três ciclos, apertando um pouco menos com o tempo —
            a queda passou de 21 pontos (2014) para 16 (2022). Avanço real, longe da
            paridade.
          </p>
        </article>
        <article className="editorial-card p-5">
          <h3 className="font-display text-lg text-ink">A cor do funil</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            A urna não filtra por igual. Em 2022, entre as mulheres, a fatia parda caiu
            de 35,1% (3.341) na candidatura para 23,4% (66) na eleição e a preta caiu de
            18,3% (1.745) para 13,1% (37), enquanto a branca subiu de 45% (4.287) para
            61% (172). Indígenas (79 → 5) e amarelas (45 → 1) aparecem em números
            pequenos e devem ser lidas pelo absoluto.
          </p>
        </article>
      </div>

      <p className="font-mono text-[11px] leading-relaxed text-muted-foreground">
        Ressalva: cada ano e cada etapa têm denominador próprio; percentuais não se
        somam. Cor/raça é autodeclarada, nas categorias do TSE, coletada desde 2014 — a
        qualidade do preenchimento varia entre ciclos e, em 2014, não há registros “não
        informado”. Categorias com poucas candidaturas ou eleitas devem ser lidas pelo
        número absoluto, não pelo percentual. Nenhuma categoria é omitida. 2026 é
        fotografia em andamento, sem eleição e sem recorte de raça publicado nesta peça.
        Comparação descritiva, sem atribuir causa. Fonte: {HISTORICAL_FUNNEL_SOURCE}.
      </p>
    </div>
  );
}
