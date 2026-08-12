/**
 * PastStrip — faixa comparativa com o passado.
 *
 * Reutiliza exclusivamente os percentuais já auditados da série histórica
 * (Bloco 5.1). Nenhum cálculo novo, nenhuma coleta nova, nenhuma leitura
 * causal: a faixa é descritiva e serve de contexto para 2026.
 */

import type { Series } from "@/lib/tse/historical-compute";

const pct = (v: number) =>
  `${v.toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })}%`;

export function PastStrip({ series }: { series: Series | null }) {
  const points = (series?.points ?? [])
    .filter((p) => p.universe === "proporcional" && p.value !== null)
    .sort((a, b) => a.year - b.year);

  if (points.length === 0) return null;

  return (
    <div className="poster-frame p-5 md:p-6">
      <p className="poster-eyebrow border-plum text-plum">
        Mulheres nas candidaturas proporcionais · eleições gerais
      </p>
      <ol className="mt-4 flex flex-wrap items-end gap-x-6 gap-y-4">
        {points.map((p, i) => (
          <li key={p.year} className="flex items-end gap-6">
            <div>
              <p className="poster-figure text-3xl leading-none text-plum md:text-4xl">
                {pct(p.value as number)}
              </p>
              <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                {p.year}
                {p.stage === "em_curso" ? " · base em curso" : ""}
              </p>
            </div>
            {i < points.length - 1 && (
              <span aria-hidden className="pb-4 text-lg text-muted-foreground">
                →
              </span>
            )}
          </li>
        ))}
      </ol>
      <p className="mt-4 border-t border-rule pt-3 text-sm leading-relaxed text-muted-foreground">
        Cada ano tem denominador próprio e não é somado aos outros. 2026 é
        fotografia em andamento: comparar percentuais exige a ressalva de
        estágio, e nenhuma causa é atribuída à variação.
      </p>
    </div>
  );
}
