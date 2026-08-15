import { useMemo, useState } from "react";
import { GapNote } from "@/components/GapNote";
import { StatusTag } from "./StatusTag";
import { RACE_COLORS, RACE_LABELS } from "@/data/historical-funnel";
import type { PublicSnapshot } from "@/lib/tse/snapshot.functions";

/**
 * RaceByStateTable — tabela panorâmica de cor/raça por UF.
 *
 * Leitura direta de `universes.proporcional.dimensions.raceByUf` (SG_UF →
 * categoria original de cor/raça → contagem de candidaturas de mulheres).
 * Nenhum cálculo novo entra no pipeline: aqui só somamos células já contadas
 * na fotografia e derivamos proporções.
 *
 * Regra de base mínima (20): com menos de 20 candidaturas de mulheres na UF,
 * nenhum percentual é exibido — apenas contagens absolutas — porque uma
 * candidatura a mais deslocaria muito o percentual.
 *
 * Preta e parda NUNCA são somadas: são categorias distintas na barra.
 */

const MIN_BASE = 20;

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
  const hit = ORDER.find((c) => c === k);
  return hit ?? RESIDUAL;
}

type Row = { uf: string; total: number; counts: Record<Cat, number> };

export function RaceByStateTable({ snapshot }: { snapshot: PublicSnapshot | null }) {
  const [sortBy, setSortBy] = useState<"uf" | Cat>("uf");

  const rows = useMemo<Row[] | null>(() => {
    const dims = snapshot?.universes.proporcional?.dimensions;
    const raceByUf = dims?.raceByUf;
    if (!raceByUf || Object.keys(raceByUf).length === 0) return null;
    const feminineByUf = dims?.feminineByUf;

    return Object.entries(raceByUf).map(([uf, races]) => {
      const counts = ALL_CATS.reduce(
        (acc, c) => ({ ...acc, [c]: 0 }),
        {} as Record<Cat, number>,
      );
      let sum = 0;
      for (const [raw, n] of Object.entries(races)) {
        counts[normalizeRaceKey(raw)] += n;
        sum += n;
      }
      return { uf, total: feminineByUf?.[uf] ?? sum, counts };
    });
  }, [snapshot]);

  if (!rows || rows.length === 0) {
    return (
      <GapNote label="Dado não disponível">
        O cruzamento de cor/raça por estado ainda não foi gravado nesta
        fotografia do TSE. Ausência de dado não é zero: enquanto a coleta não
        trouxer essas células, a tabela não exibe número algum.
      </GapNote>
    );
  }

  const sorted = [...rows].sort((a, b) => {
    if (sortBy === "uf") return a.uf.localeCompare(b.uf, "pt-BR");
    return (
      b.counts[sortBy] - a.counts[sortBy] || a.uf.localeCompare(b.uf, "pt-BR")
    );
  });

  return (
    <div className="space-y-4">
      <div className="poster-frame p-4 md:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="poster-eyebrow text-muted-foreground">Ordenar por</span>
          <button
            type="button"
            onClick={() => setSortBy("uf")}
            aria-pressed={sortBy === "uf"}
            className={`border-2 border-ink px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider ${
              sortBy === "uf" ? "bg-ink text-paper" : "bg-paper text-ink"
            }`}
          >
            UF
          </button>
          {ALL_CATS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setSortBy(c)}
              aria-pressed={sortBy === c}
              className={`inline-flex items-center gap-2 border-2 border-ink px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider ${
                sortBy === c ? "bg-ink text-paper" : "bg-paper text-ink"
              }`}
            >
              <span
                aria-hidden="true"
                className="inline-block h-2.5 w-2.5 border border-ink"
                style={{
                  background: c === RESIDUAL ? "transparent" : RACE_COLORS[c],
                }}
              />
              {RACE_LABELS[c]}
            </button>
          ))}
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-ink">
                <th className="py-2 pr-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  UF
                </th>
                <th className="py-2 pr-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Candidatas
                </th>
                <th className="py-2 pr-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Distribuição por cor/raça
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((r) => {
                const showPercent = r.total >= MIN_BASE;
                return (
                  <tr key={r.uf} className="border-b border-ink/20 align-top">
                    <td className="py-3 pr-3 font-mono text-sm font-bold text-ink">
                      {r.uf}
                    </td>
                    <td className="py-3 pr-3">
                      <span className="font-mono text-sm text-ink">{r.total}</span>
                      {!showPercent && (
                        <span className="mt-1 block">
                          <StatusTag tone="limit">base pequena</StatusTag>
                        </span>
                      )}
                    </td>
                    <td className="py-3 pr-1">
                      <div
                        className="flex h-4 w-full overflow-hidden border-2 border-ink"
                        role="img"
                        aria-label={`Distribuição por cor/raça das candidaturas de mulheres em ${r.uf}`}
                      >
                        {ALL_CATS.map((c) => {
                          const n = r.counts[c];
                          if (!n || r.total <= 0) return null;
                          const w = (n / r.total) * 100;
                          return (
                            <span
                              key={c}
                              style={{
                                width: `${w}%`,
                                background:
                                  c === RESIDUAL
                                    ? "var(--muted, transparent)"
                                    : RACE_COLORS[c],
                              }}
                            />
                          );
                        })}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                        {ALL_CATS.map((c) => (
                          <span
                            key={c}
                            className="font-mono text-[11px] text-muted-foreground"
                          >
                            {RACE_LABELS[c]}: <span className="text-ink">{r.counts[c]}</span>
                            {showPercent && r.total > 0 && (
                              <>
                                {" "}
                                (
                                {((r.counts[c] / r.total) * 100).toLocaleString(
                                  "pt-BR",
                                  { maximumFractionDigits: 1 },
                                )}
                                %)
                              </>
                            )}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p className="font-mono text-[11px] leading-relaxed text-muted-foreground">
        Estados com poucas candidaturas têm percentuais mais sensíveis: uma
        candidatura a mais desloca muito o percentual. Onde a base é menor que
        20, mostramos apenas contagens absolutas. Recorte: candidaturas
        proporcionais de mulheres. Fonte: TSE / Candidaturas 2026.
      </p>
    </div>
  );
}
