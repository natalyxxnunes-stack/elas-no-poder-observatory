/**
 * UfGrid — grade de estados (26 estados + DF) com a participação feminina
 * nas candidaturas proporcionais.
 *
 * Não calcula nada novo: consome `universes.proporcional.dimensions`
 * (`feminineByUf` / `totalByUf`) da fotografia pública do TSE. Cada célula usa
 * o denominador do próprio estado; UFs nunca são somadas entre si.
 */

import type { PublicSnapshot } from "@/lib/tse/snapshot.functions";
import { formatInt, formatPct } from "@/lib/format-br";
import { StatusTag } from "./StatusTag";

const UFS = [
  "AC","AL","AM","AP","BA","CE","DF","ES","GO","MA","MG","MS","MT","PA",
  "PB","PE","PI","PR","RJ","RN","RO","RR","RS","SC","SE","SP","TO",
] as const;

type Cell = {
  uf: string;
  share: number | null;
  feminine: number | null;
  total: number | null;
};

/** Faixas de percentual, da menor para a maior. */
const BANDS = [
  { max: 34, label: "abaixo de 34%", bg: "bg-coral", fg: "text-ink" },
  { max: 35.5, label: "34% a 35,5%", bg: "bg-solar", fg: "text-ink" },
  { max: 37, label: "35,5% a 37%", bg: "bg-plum-soft", fg: "text-cream" },
  { max: 39, label: "37% a 39%", bg: "bg-plum", fg: "text-cream" },
  { max: Infinity, label: "39% ou mais", bg: "bg-forest", fg: "text-cream" },
] as const;

const MIN_BASE = 20;

function band(share: number) {
  return BANDS.find((b) => share < b.max) ?? BANDS[BANDS.length - 1];
}

const nf = formatInt;
const pf = formatPct;

export function UfGrid({
  snapshot,
  baseDate,
}: {
  snapshot: PublicSnapshot | null;
  baseDate: string | null;
}) {
  const dims = snapshot?.universes.proporcional.dimensions;
  const fem = dims?.feminineByUf;
  const tot = dims?.totalByUf;

  const cells: Cell[] = UFS.map((uf) => {
    const total = tot?.[uf] ?? null;
    const feminine = fem?.[uf] ?? null;
    const share =
      total && total > 0 && feminine !== null ? (feminine / total) * 100 : null;
    return { uf, share, feminine, total };
  }).sort((a, b) => {
    if (a.share === null && b.share === null) return a.uf.localeCompare(b.uf);
    if (a.share === null) return 1;
    if (b.share === null) return -1;
    return b.share - a.share;
  });

  const hasData = cells.some((c) => c.share !== null);

  return (
    <div className="poster-frame mt-6 p-5 md:p-7">
      <p className="poster-eyebrow text-ink">
        Grade de estados · candidaturas proporcionais
      </p>
      <h3 className="mt-4 max-w-2xl font-display text-[clamp(1.3rem,3vw,1.9rem)] leading-tight text-ink">
        Onde a presença de mulheres é maior e{" "}
        <span className="text-plum italic">onde é menor</span>
      </h3>

      {!hasData ? (
        <p className="mt-5 text-sm leading-relaxed text-ink/70">
          Em atualização. Aguardando a nova fotografia da base do TSE.
        </p>
      ) : (
        <>
          {/* legenda de faixas */}
          <ul className="mt-5 flex flex-wrap gap-2">
            {BANDS.map((b) => (
              <li
                key={b.label}
                className={`rounded border-2 border-ink px-2 py-1 font-mono text-[12px] uppercase tracking-[0.1em] ${b.bg} ${b.fg}`}
              >
                {b.label}
              </li>
            ))}
            <li className="rounded border-2 border-ink bg-muted px-2 py-1 font-mono text-[12px] uppercase tracking-[0.1em] text-muted-foreground">
              sem dado
            </li>
          </ul>

          <ul className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7">
            {cells.map((c) => {
              const b =
                c.total !== null && c.total < MIN_BASE
                  ? null
                  : c.share !== null
                    ? band(c.share)
                    : null;
              return (
                <li
                  key={c.uf}
                  className={`rounded border-2 border-ink p-2 text-center ${
                    b ? `${b.bg} ${b.fg}` : "bg-muted text-muted-foreground"
                  }`}
                >
                  <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em]">
                    {c.uf}
                  </p>
                  {c.total !== null && c.total < MIN_BASE && c.feminine !== null ? (
                    <>
                      <p className="mt-1 font-mono text-[12px] leading-tight opacity-90">
                        {nf(c.feminine)} de {nf(c.total)}
                      </p>
                      <p className="mt-1">
                        <StatusTag tone="limit">base pequena</StatusTag>
                      </p>
                    </>
                  ) : c.share !== null && c.feminine !== null && c.total !== null ? (
                    <>
                      <p className="poster-figure mt-1 text-[clamp(1.05rem,4.4vw,1.35rem)]">
                        {pf(c.share)}
                      </p>
                      <p className="mt-1 font-mono text-[12px] leading-tight opacity-90">
                        {nf(c.feminine)} de {nf(c.total)}
                      </p>
                    </>
                  ) : (
                    <p className="mt-2 font-mono text-[12px] leading-tight">
                      sem dado
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </>
      )}

      <p className="mt-6 font-mono text-[12px] leading-relaxed text-ink/70">
        Universo: candidaturas proporcionais (Deputada Federal, Estadual e
        Distrital), contadas dentro de cada unidade da federação. Fonte:
        TSE · Candidaturas 2026
        {baseDate ? ` · fotografia da base de ${baseDate}` : ""}. Percentual e
        tamanho da base devem ser lidos juntos: um estado com poucas
        candidaturas pode ter percentual alto com pouquíssimos casos absolutos.
        Limiar declarado: abaixo de 20 candidaturas o percentual não aparece — o
        absoluto continua à vista.
      </p>
    </div>
  );
}
