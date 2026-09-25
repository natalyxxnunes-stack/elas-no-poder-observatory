import { Link } from "@tanstack/react-router";
import type { Achado } from "@/data/achados";
import { ChartSignature } from "@/components/editorial/ChartFrame";
import { formatDateBR, formatPct } from "@/lib/format-br";

/** Laranja marca o dado de 2026. Barra com ano no rótulo segue o ano; sem ano, segue a fonte. */
function isAtual(achado: Achado, rotulo: string): boolean {
  const year = rotulo.match(/(19|20)\d{2}/)?.[0];
  if (year) return year === "2026";
  const years = achado.fonte.match(/(19|20)\d{2}/g) ?? [];
  return years.length > 0 && years.every((y) => y === "2026");
}

export function AchadoCard({ achado }: { achado: Achado }) {
  return (
    <article className="border-t-2 border-ink pt-4">
      <p className="font-mono text-xs uppercase text-muted-foreground">
        Achado {achado.numero} · {formatDateBR(achado.data)}
      </p>
      <h3 className="mt-2 font-display text-xl leading-snug text-ink md:text-2xl">
        {achado.titulo}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-ink/80">{achado.texto}</p>
      <figure className="mt-4" aria-label={achado.legenda}>
        {achado.barras.map((barra) => (
          <div
            key={barra.rotulo}
            className="grid grid-cols-[8.5rem_minmax(0,1fr)_3.5rem] items-center gap-3 py-1"
          >
            <span className="font-mono text-xs text-ink">{barra.rotulo}</span>
            <span className="h-3 bg-muted" aria-hidden="true">
              <span
                className={`block h-full ${isAtual(achado, barra.rotulo) ? "bg-coral" : "bg-plum"}`}
                style={{ width: `${Math.min(Math.max(barra.valor, 0), 100)}%` }}
              />
            </span>
            <span className="text-right font-mono text-[12px] text-ink">
              {formatPct(barra.valor)}
            </span>
          </div>
        ))}
        <figcaption className="mt-2 font-mono text-xs text-muted-foreground">
          {achado.legenda}
        </figcaption>
      </figure>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-2">
        <p className="font-mono text-xs text-muted-foreground">{achado.fonte}</p>
        <ChartSignature />
      </div>
      <Link
        to={achado.to}
        className="mt-3 inline-block text-sm text-plum underline underline-offset-4"
      >
        {achado.linkLabel} →
      </Link>
    </article>
  );
}
