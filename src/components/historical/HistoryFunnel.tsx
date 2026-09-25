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
import { formatPoints } from "@/data/election-2026";
import { StatusTag } from "@/components/editorial/StatusTag";
import { formatInt, formatPct } from "@/lib/format-br";

const n = (v: number) => formatInt(v);
const pct = (v: number) => formatPct(v);

function RaceMiniBars({ race, stageLabel }: { race: RaceBreakdown; stageLabel: string }) {
  return (
    <div className="mt-4">
      <p className="mb-2.5 font-mono text-[12px] uppercase tracking-wider text-muted-foreground">
        Cor/raça: {stageLabel.toLowerCase()}
      </p>
      <ul className="space-y-2.5">
        {RACE_CATEGORIES.map((key) => {
          const item = race[key];
          const barWidth = item.percent;
          return (
            <li key={key} className="grid min-w-0 items-center gap-2" style={{ gridTemplateColumns: "5.5rem minmax(0,1fr) minmax(0,4.5rem)" }}>
              <span className="min-w-0 truncate font-mono text-[12px] leading-none text-muted-foreground">
                {RACE_LABELS[key]}
              </span>
              <div className="h-1.5 min-w-0 overflow-hidden rounded-sm bg-secondary" aria-hidden>
                <div
                  className="h-full rounded-sm"
                  style={{
                    width: item.count > 0 ? `${barWidth}%` : "0%",
                    background: RACE_COLORS[key],
                    minWidth: item.count > 0 ? "2px" : "0",
                  }}
                />
              </div>
              <span className="min-w-0 truncate text-right font-mono text-[12px] leading-none text-ink" title={`${n(item.count)} · ${pct(item.percent)}`}>
                {n(item.count)} · {pct(item.percent)}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function StageColumn({
  label,
  heading,
  femininePercent,
  feminine,
  total,
  race,
  empty,
  emptyLabel,
}: {
  label: string;
  heading: string;
  femininePercent: number;
  feminine: number;
  total: number;
  race: RaceBreakdown | null;
  empty?: boolean;
  emptyLabel?: string;
}) {
  return (
    <div className="flex flex-col">
      <p className="font-mono text-[12px] uppercase tracking-wider text-muted-foreground">
        {heading}
      </p>
      <p className={`poster-figure mt-1 text-3xl leading-none ${empty ? "text-muted-foreground" : "text-plum"} md:text-4xl`}>
        {empty ? "—" : pct(femininePercent)}
      </p>
      {!empty && (
        <p className="mt-1 font-mono text-[12px] leading-relaxed text-muted-foreground">
          {n(feminine)} de {n(total)} {label === "Candidatura" ? "candidaturas" : "eleitas"}
        </p>
      )}
      <div
        className="mt-2 h-6 w-full overflow-hidden rounded-sm"
        role="img"
        aria-label={
          empty
            ? `${heading} ainda não disponível`
            : `${pct(femininePercent)} de mulheres na ${label.toLowerCase()}: ${n(feminine)} de ${n(total)}`
        }
      >
        {empty ? (
          <div className="flex h-full w-full items-center justify-center rounded-sm border border-dashed border-rule bg-[repeating-linear-gradient(135deg,transparent,transparent_6px,var(--color-rule,#ddd)_6px,var(--color-rule,#ddd)_7px)]">
            <span className="font-mono text-[12px] uppercase tracking-wider text-muted-foreground">
              {emptyLabel ?? "não disponível"}
            </span>
          </div>
        ) : (
          <div className="h-full bg-plum" style={{ width: `${Math.max(femininePercent, 1.5)}%` }} />
        )}
      </div>
      {!empty && race && <RaceMiniBars race={race} stageLabel={label} />}
      {empty && (
        <p className="mt-2 font-mono text-[12px] leading-relaxed text-ink/70">
          Eleição de outubro de 2026 ainda não ocorreu. Nenhum valor é projetado.
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
          heading="Mulheres nas candidaturas"
          femininePercent={year.candidacy.femininePercent}
          feminine={year.candidacy.feminine}
          total={year.candidacy.total}
          race={year.candidacy.race}
        />
        {year.elected ? (
          <StageColumn
            label="Eleição"
            heading="Mulheres eleitas"
            femininePercent={year.elected.femininePercent}
            feminine={year.elected.feminine}
            total={year.elected.total}
            race={year.elected.race}
          />
        ) : (
          <StageColumn
            label="Eleição"
            heading="Mulheres eleitas"
            femininePercent={0}
            feminine={0}
            total={0}
            race={null}
            empty
            emptyLabel="eleição em out/2026"
          />
        )}
      </div>
    </li>
  );
}

export function HistoryFunnel() {
  const year2014 = HISTORICAL_FUNNEL.find((year) => year.year === 2014);
  const year2022 = HISTORICAL_FUNNEL.find((year) => year.year === 2022);
  const elected2022 = year2022?.elected;
  const candidacyRace2022 = year2022?.candidacy.race;
  const electedRace2022 = elected2022?.race;

  if (!year2014 || !year2022 || !elected2022 || !candidacyRace2022 || !electedRace2022) {
    return null;
  }

  return (
    <div className="space-y-8">
      <ol className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {HISTORICAL_FUNNEL.map((year) => (
          <YearCard key={year.year} year={year} />
        ))}
      </ol>

      <div className="grid gap-6 md:grid-cols-3">
        <article className="editorial-card p-5">
          <h3 className="font-display text-lg text-ink">Tamanho do funil</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink/70">
            Em 2022, mulheres foram {pct(year2022.candidacy.femininePercent)} das
            candidaturas proporcionais ({n(year2022.candidacy.feminine)} de {n(year2022.candidacy.total)}) e {pct(elected2022.femininePercent)} das eleitas ({n(elected2022.feminine)} de {n(elected2022.total)}).
          </p>
        </article>
        <article className="editorial-card p-5">
          <h3 className="font-display text-lg text-ink">No tempo</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink/70">
            A distância entre a participação nas candidaturas e entre as eleitas era
            de {formatPoints(year2014.candidacy.femininePercent - (year2014.elected?.femininePercent ?? 0))} em 2014 e de {formatPoints(year2022.candidacy.femininePercent - elected2022.femininePercent)} em 2022. Avanço real, longe da paridade.
          </p>
        </article>
        <article className="editorial-card p-5">
          <h3 className="font-display text-lg text-ink">A cor do funil</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink/70">
            A urna não filtra por igual. Em 2022, entre as mulheres, a fatia parda foi
            de {pct(candidacyRace2022.parda.percent)} ({n(candidacyRace2022.parda.count)}) na candidatura para {pct(electedRace2022.parda.percent)} ({n(electedRace2022.parda.count)}) na eleição; a preta, de {pct(candidacyRace2022.preta.percent)} ({n(candidacyRace2022.preta.count)}) para {pct(electedRace2022.preta.percent)} ({n(electedRace2022.preta.count)}); a branca, de {pct(candidacyRace2022.branca.percent)} ({n(candidacyRace2022.branca.count)}) para {pct(electedRace2022.branca.percent)} ({n(electedRace2022.branca.count)}). Indígenas ({n(candidacyRace2022.indigena.count)} → {n(electedRace2022.indigena.count)}) e amarelas ({n(candidacyRace2022.amarela.count)} → {n(electedRace2022.amarela.count)}) aparecem em números pequenos e devem ser lidas pelo absoluto.
          </p>
        </article>
      </div>

      <p className="font-mono text-[12px] leading-relaxed text-ink/70">
        Recorte: Câmara dos Deputados, Assembleias Legislativas e Câmara Legislativa do DF — eleições proporcionais. Não inclui Senado, governos estaduais ou Presidência. Por isso os totais podem diferir de estatísticas do TSE que somam o Legislativo inteiro: aqui se conta a cadeira proporcional, não a suplência nem o Senado. Eleitas: resultado do 1º turno, o único da eleição proporcional. Cada ano e cada etapa têm denominador próprio; percentuais não se
        somam. Cor/raça é autodeclarada, nas categorias do TSE, coletada desde 2014 — a
        qualidade do preenchimento varia entre ciclos e, em 2014, não há registros “não
        informado”. Categorias com poucas candidaturas ou eleitas devem ser lidas pelo
        número absoluto, não pelo percentual. Nenhuma categoria é omitida. 2026 é
        fotografia em andamento, sem eleição e sem recorte de raça publicado nesta peça.
        Fonte: {HISTORICAL_FUNNEL_SOURCE}.
      </p>
    </div>
  );
}
