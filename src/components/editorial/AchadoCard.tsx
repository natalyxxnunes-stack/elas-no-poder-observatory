import { Link } from "@tanstack/react-router";
import type { Achado } from "@/data/achados";
import { formatDateBR, formatPct } from "@/lib/format-br";

/**
 * Ficha de achado (redesenho de 30/10/2026): número-âncora, rótulo, gráfico,
 * título como frase de tensão, texto e uma linha de rodapé. O card inteiro é
 * clicável. Laranja só na barra marcada em `foco`; o resto em roxo.
 */
export function AchadoCard({ achado, grande = false }: { achado: Achado; grande?: boolean }) {
  const max = achado.escala ?? 100;
  return (
    <article
      className={`group relative flex h-full flex-col bg-paper outline-offset-4 outline-plum focus-within:outline-2 ${grande ? "p-6 pt-8 md:p-9 md:pl-11" : "border-t-4 border-plum p-5 md:p-7"}`}
    >
      {grande && (
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-2 bg-coral md:inset-y-0 md:left-0 md:h-auto md:w-2" />
      )}
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
        Achado {achado.numero} · {formatDateBR(achado.data)}
        {achado.atualizadoEm && (
          <span className="ml-2 border border-muted-foreground/50 px-1.5 py-0.5 normal-case tracking-normal">
            atualizado em {formatDateBR(achado.atualizadoEm)}
          </span>
        )}
      </p>
      {achado.ancora && (
        <>
          <p className={`poster-figure mt-4 text-plum ${grande ? "text-[4.5rem] md:text-[6.5rem]" : "text-5xl md:text-6xl"}`}>
            {achado.ancora.valor}
          </p>
          <p className="mt-2 max-w-[36ch] font-medium leading-snug text-ink">{achado.ancora.rotulo}</p>
        </>
      )}
      {achado.barras.length > 0 && (
        <figure className={grande ? "mt-7 max-w-xl" : "mt-5"} aria-label={achado.legenda}>
          <div className="space-y-2">
            {achado.barras.map((barra) => {
              const foco = barra.rotulo === achado.foco;
              return (
                <div key={barra.rotulo} className="grid grid-cols-[minmax(0,9.5rem)_minmax(0,1fr)_3.5rem] items-center gap-3">
                  <span className={`text-[13px] leading-tight ${foco ? "font-semibold text-ink" : "text-ink/75"}`}>
                    {barra.rotulo}
                  </span>
                  <span className="h-3.5 bg-plum/10" aria-hidden="true">
                    <span
                      className={`block h-full ${foco ? "bg-coral" : "bg-plum/45"}`}
                      style={{ width: `${Math.min(Math.max(barra.valor / max, 0), 1) * 100}%` }}
                    />
                  </span>
                  <span className="text-right font-mono text-[13px] tabular-nums text-ink">{formatPct(barra.valor)}</span>
                </div>
              );
            })}
          </div>
          <figcaption className="mt-2 text-[13px] leading-snug text-muted-foreground">
            {achado.legenda}
            {achado.escala ? ` · escala de 0 a ${achado.escala}%` : ""}
          </figcaption>
        </figure>
      )}
      <h3 className={`mt-5 font-display leading-snug text-ink ${grande ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"}`}>
        <Link
          to={achado.to}
          className="after:absolute after:inset-0 focus-visible:outline-none group-hover:underline group-hover:decoration-plum group-hover:underline-offset-4"
        >
          {achado.titulo}
        </Link>
      </h3>
      <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-ink/80">{achado.texto}</p>
      <div className="mt-auto pt-5" />
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-rule pt-2 text-[13px] text-muted-foreground">
        <span className="max-w-[40ch]">{achado.fonte}</span>
        <span aria-hidden="true" className="inline-flex min-h-11 items-center font-medium text-plum">
          {achado.linkLabel}
          <span className="ml-1.5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none">→</span>
        </span>
      </div>
    </article>
  );
}
