import { useMemo, useState } from "react";
import { GapNote } from "@/components/GapNote";
import { StatusTag } from "./StatusTag";
import { RACE_COLORS, RACE_LABELS } from "@/data/historical-funnel";
import type { PublicSnapshot } from "@/lib/tse/snapshot.functions";
import { formatInt, formatDecimal } from "@/lib/format-br";

/**
 * PartyGenderTable — "Quem lança mulheres?"
 *
 * Leitura direta de dimensões já gravadas na fotografia vigente:
 *   universes[universo].dimensions.feminineByParty  → numerador
 *   universes[universo].dimensions.totalByParty     → denominador
 *   universes[universo].dimensions.raceByParty      → cor/raça entre as
 *                                                     candidaturas de mulheres
 *
 * Nenhum indicador novo entra no pipeline: aqui só dividimos células já
 * contadas na coleta. Os dois universos NUNCA são somados nem comparados na
 * mesma linha — a troca de universo troca a tabela inteira, com denominador
 * próprio.
 *
 * Limiar declarado: com menos de 20 candidaturas no partido dentro daquele
 * universo, o percentual não é exibido — só os absolutos, que continuam à
 * vista. Nenhuma linha é ocultada.
 */

const MIN_BASE = 20;

type UniverseId = "proporcional" | "majoritario";

const UNIVERSE_LABEL: Record<UniverseId, string> = {
  proporcional: "proporcional (deputadas federais, estaduais e distritais)",
  majoritario: "majoritário (governo, senado e presidência)",
};

const ORDER = ["branca", "parda", "preta", "indigena", "amarela"] as const;
const RESIDUAL = "nao_informado" as const;
type Cat = (typeof ORDER)[number] | typeof RESIDUAL;
const ALL_CATS: Cat[] = [...ORDER, RESIDUAL];

function normalizeRaceKey(raw: string): Cat {
  const k = raw
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
  return ORDER.find((c) => c === k) ?? RESIDUAL;
}

function brDate(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? null
    : d.toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

function pct(n: number, d: number): string {
  return formatDecimal((n / d) * 100).replace(/,0$/, "");
}

type Row = {
  party: string;
  feminine: number;
  total: number;
  race: Record<Cat, number> | null;
  raceSum: number;
};

type SortKey = "share" | "total" | "party";

export function PartyGenderTable({
  snapshot,
}: {
  snapshot: PublicSnapshot | null;
}) {
  const [universe, setUniverse] = useState<UniverseId>("proporcional");
  const [sortBy, setSortBy] = useState<SortKey>("share");
  const [showRace, setShowRace] = useState(false);

  const rows = useMemo<Row[] | null>(() => {
    const dims = snapshot?.universes[universe]?.dimensions;
    const totalByParty = dims?.totalByParty;
    if (!totalByParty || Object.keys(totalByParty).length === 0) return null;
    const feminineByParty = dims?.feminineByParty ?? {};
    const raceByParty = dims?.raceByParty;

    return Object.entries(totalByParty).map(([party, total]) => {
      const cells = raceByParty?.[party];
      let race: Record<Cat, number> | null = null;
      let raceSum = 0;
      if (cells) {
        race = ALL_CATS.reduce(
          (acc, c) => ({ ...acc, [c]: 0 }),
          {} as Record<Cat, number>,
        );
        for (const [raw, n] of Object.entries(cells)) {
          race[normalizeRaceKey(raw)] += n;
          raceSum += n;
        }
      }
      return {
        party,
        feminine: feminineByParty[party] ?? 0,
        total,
        race,
        raceSum,
      };
    });
  }, [snapshot, universe]);

  if (!rows || rows.length === 0) {
    return (
      <GapNote label="Dado não disponível">
        As contagens por partido não foram gravadas nesta fotografia do TSE.
        Enquanto a coleta não trouxer essas células, nenhuma linha é exibida.
      </GapNote>
    );
  }

  const raceAvailable = rows.some((r) => r.raceSum > 0);

  const sorted = [...rows].sort((a, b) => {
    if (sortBy === "party") return a.party.localeCompare(b.party, "pt-BR");
    if (sortBy === "total")
      return b.total - a.total || a.party.localeCompare(b.party, "pt-BR");
    return (
      b.feminine / b.total - a.feminine / a.total ||
      b.total - a.total ||
      a.party.localeCompare(b.party, "pt-BR")
    );
  });

  const universeTally = snapshot?.universes[universe];
  const generated = brDate(snapshot?.baseGeneratedAt ?? null);
  const smallBases = sorted.filter((r) => r.total < MIN_BASE).length;

  const btn = (active: boolean) =>
    `border-2 border-ink px-2.5 py-1 font-mono text-[12px] uppercase tracking-wider ${
      active ? "bg-ink text-paper" : "bg-paper text-ink"
    }`;

  return (
    <div className="space-y-4">
      <div className="poster-frame p-4 md:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="poster-eyebrow text-muted-foreground">Universo</span>
          {(["proporcional", "majoritario"] as UniverseId[]).map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => setUniverse(u)}
              aria-pressed={universe === u}
              className={btn(universe === u)}
            >
              {u === "proporcional" ? "Proporcional" : "Majoritário"}
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="poster-eyebrow text-muted-foreground">
            Ordenar por
          </span>
          <button
            type="button"
            onClick={() => setSortBy("share")}
            aria-pressed={sortBy === "share"}
            className={btn(sortBy === "share")}
          >
            % de mulheres
          </button>
          <button
            type="button"
            onClick={() => setSortBy("total")}
            aria-pressed={sortBy === "total"}
            className={btn(sortBy === "total")}
          >
            tamanho da lista
          </button>
          <button
            type="button"
            onClick={() => setSortBy("party")}
            aria-pressed={sortBy === "party"}
            className={btn(sortBy === "party")}
          >
            sigla
          </button>
          {raceAvailable && (
            <button
              type="button"
              onClick={() => setShowRace((v) => !v)}
              aria-pressed={showRace}
              className={`${btn(showRace)} ml-auto`}
            >
              {showRace ? "ocultar cor/raça" : "mostrar cor/raça"}
            </button>
          )}
        </div>

        <p className="mt-3 font-mono text-[12px] leading-relaxed text-ink/70">
          A ordem é descritiva: serve para leitura, não é classificação de
          mérito. Cada linha é a composição das candidaturas registradas naquele
          partido — não mede eleição, dinheiro de campanha nem desempenho nas
          urnas.
        </p>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <caption className="sr-only">
              Candidaturas de mulheres por partido no universo{" "}
              {UNIVERSE_LABEL[universe]}, com numerador, denominador e
              percentual.
            </caption>
            <thead>
              <tr className="border-b-2 border-ink">
                <th
                  scope="col"
                  className="py-2 pr-3 font-mono text-[12px] uppercase tracking-wider text-muted-foreground"
                >
                  Partido
                </th>
                <th
                  scope="col"
                  className="py-2 pr-3 font-mono text-[12px] uppercase tracking-wider text-muted-foreground"
                >
                  Mulheres / total
                </th>
                <th
                  scope="col"
                  className="py-2 pr-3 font-mono text-[12px] uppercase tracking-wider text-muted-foreground"
                >
                  % de mulheres na lista
                </th>
                {showRace && (
                  <th
                    scope="col"
                    className="py-2 pr-1 font-mono text-[12px] uppercase tracking-wider text-muted-foreground"
                  >
                    Cor/raça entre as candidaturas de mulheres
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {sorted.map((r) => {
                const showPercent = r.total >= MIN_BASE;
                const showRacePercent = r.raceSum >= MIN_BASE;
                return (
                  <tr key={r.party} className="border-b border-ink/20 align-top">
                    <th
                      scope="row"
                      className="py-3 pr-3 font-mono text-sm font-bold text-ink"
                    >
                      {r.party}
                    </th>
                    <td className="py-3 pr-3 font-mono text-sm text-ink">
                      {formatInt(r.feminine)} /{" "}
                      {formatInt(r.total)}
                    </td>
                    <td className="py-3 pr-3">
                      {showPercent ? (
                        <>
                          <span className="font-mono text-sm font-bold text-ink">
                            {pct(r.feminine, r.total)}%
                          </span>
                          <span
                            className="mt-1 flex h-3 w-full max-w-[220px] overflow-hidden border-2 border-ink"
                            role="img"
                            aria-label={`${formatInt(r.feminine)} de ${formatInt(r.total)} candidaturas do ${r.party} são de mulheres`}
                          >

                            <span
                              style={{
                                width: `${(r.feminine / r.total) * 100}%`,
                                background: "var(--plum, currentColor)",
                              }}
                            />
                          </span>
                        </>
                      ) : (
                        <StatusTag tone="limit">base pequena</StatusTag>
                      )}
                    </td>
                    {showRace && (
                      <td className="py-3 pr-1">
                        {r.race && r.raceSum > 0 ? (
                          <>
                            {showRacePercent && <span
                              className="flex h-3 w-full min-w-[160px] overflow-hidden border-2 border-ink"
                              role="img"
                              aria-label={`Cor/raça das ${r.raceSum} candidaturas de mulheres do ${r.party}`}
                            >
                              {ALL_CATS.map((c) => {
                                const n = r.race![c];
                                if (!n) return null;
                                return (
                                  <span
                                    key={c}
                                    style={{
                                      width: `${(n / r.raceSum) * 100}%`,
                                      background:
                                        c === RESIDUAL
                                          ? "var(--muted, transparent)"
                                          : RACE_COLORS[c],
                                    }}
                                  />
                                );
                              })}
                            </span>}
                            <span className="flex flex-wrap gap-x-3 gap-y-1">
                              {ALL_CATS.filter((c) => r.race![c] > 0).map((c) => (
                                <span
                                  key={c}
                                  className="font-mono text-[12px] text-muted-foreground"
                                >
                                  {RACE_LABELS[c]}:{" "}
                                  <span className="text-ink">{r.race![c]}</span>
                                  {showRacePercent && (
                                    <> ({pct(r.race![c], r.raceSum)}%)</>
                                  )}
                                </span>
                              ))}
                            </span>
                          </>
                        ) : (
                          <span className="font-mono text-[12px] text-muted-foreground">
                            sem células gravadas
                          </span>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p className="font-mono text-[12px] leading-relaxed text-ink/70">
        Fonte: TSE / Candidaturas 2026
        {generated ? `, base gerada em ${generated}` : ""}. Universo:{" "}
        {UNIVERSE_LABEL[universe]}
        {universeTally
          ? `, ${formatInt(universeTally.total)} candidaturas`
          : ""}
        . Numerador: candidaturas registradas como femininas no partido.
        Denominador: todas as candidaturas do mesmo partido no mesmo universo.
        Fórmula: numerador ÷ denominador × 100. Limiar declarado: abaixo de{" "}
        {MIN_BASE} candidaturas o percentual não aparece — os absolutos
        continuam à vista ({smallBases}{" "}
        {smallBases === 1 ? "partido" : "partidos"} nesta tabela). Cor/raça usa
        as categorias declaradas ao TSE, sem agrupar preta e parda, e descreve
        apenas as candidaturas de mulheres — não é comparação com a população.
      </p>
    </div>
  );
}
