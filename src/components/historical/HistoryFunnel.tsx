/**
 * HistoryFunnel — funil candidatura → eleição nos anos fechados, com recorte de
 * raça por dentro. Usa apenas a constante curada `HISTORICAL_FUNNEL`; não toca em
 * banco nem pipeline.
 *
 * Regras de leitura mantidas:
 *  - cada ano e cada etapa têm denominador próprio;
 *  - nenhum percentual é subtraído de outro;
 *  - 2026 exibe só a candidatura; a eleição fica vazia/hachurada;
 *  - raça é autodeclarada e preservada nas categorias originais (parda, branca).
 */

import { HISTORICAL_FUNNEL, HISTORICAL_FUNNEL_SOURCE } from "@/data/historical-funnel";
import { StatusTag } from "@/components/editorial/StatusTag";

const n = (v: number) => v.toLocaleString("pt-BR");
const pct = (v: number) =>
  `${v.toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })}%`;

function RaceMiniBars({
  parda,
  branca,
}: {
  parda: { percent: number; count: number };
  branca: { percent: number; count: number };
}) {
  const total = parda.count + branca.count;
  if (total <= 0) return null;
  return (
    <div className="mt-2 space-y-1">
      <div className="flex h-2 w-full overflow-hidden rounded-sm bg-secondary">
        <div className="h-full bg-coral" style={{ width: `${parda.percent}%` }} />
        <div className="h-full bg-cream" style={{ width: `${branca.percent}%` }} />
      </div>
      <dl className="grid grid-cols-2 gap-2 font-mono text-[10px] leading-tight">
        <div className="flex items-center gap-1.5">
          <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-coral" />
          <span className="text-muted-foreground">Parda</span>
          <span className="ml-auto text-ink">{pct(parda.percent)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span aria-hidden className="inline-block h-2 w-2 rounded-full border border-ink bg-cream" />
          <span className="text-muted-foreground">Branca</span>
          <span className="ml-auto text-ink">{pct(branca.percent)}</span>
        </div>
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
  race: { parda: { percent: number; count: number }; branca: { percent: number; count: number } } | null;
  empty?: boolean;
  emptyLabel?: string;
}) {
  return (
    <div className="flex flex-col">
      <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <div className="mt-2 flex items-end justify-between gap-3">
        <p className={`poster-figure text-4xl leading-none ${empty ? "text-muted-foreground" : "text-plum"} md:text-5xl`}>
          {empty ? "—" : pct(femininePercent)}
        </p>
        {!empty && (
          <p className="text-right font-mono text-[11px] leading-relaxed text-muted-foreground">
            {n(feminine)} de {n(total)} {label === "Candidatura" ? "candidaturas" : "eleitas"}
          </p>
        )}
      </div>
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
      {!empty && race && <RaceMiniBars parda={race.parda} branca={race.branca} />}
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
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <StageColumn
          label="Candidatura"
          femininePercent={year.candidacy.femininePercent}
          feminine={year.candidacy.feminine}
          total={year.candidacy.total}
          race={year.year === 2026 ? null : year.candidacy.race}
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

      <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
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
            A urna não filtra por igual. Em 2022, a fatia parda entre as mulheres caiu
            de 35,1% na candidatura para 23,4% na eleição, enquanto a branca subiu de
            45% para 61%. Quanto mais perto da cadeira, mais branca fica a representação
            feminina — e isso se repete nos três ciclos.
          </p>
        </article>
      </div>

      <p className="font-mono text-[11px] leading-relaxed text-muted-foreground">
        Ressalva: cada ano e cada etapa têm denominador próprio; percentuais não se
        somam. Cor/raça é autodeclarada (o TSE coleta desde 2014). 2026 é fotografia
        em andamento, sem eleição. Comparação descritiva, sem atribuir causa. Fonte:{" "}
        {HISTORICAL_FUNNEL_SOURCE}.
      </p>
    </div>
  );
}
