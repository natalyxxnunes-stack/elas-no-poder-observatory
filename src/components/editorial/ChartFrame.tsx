import type { ReactNode } from "react";
import { BrandLogo } from "@/components/BrandLogo";

/**
 * Ficha do gráfico — regra do site (27/10/2026): todo gráfico leva a ficha,
 * junto do gráfico, com as seis perguntas de leitura.
 */
export type ChartFicha = {
  /** o que estou vendo */
  vendo: ReactNode;
  /** quem é contado */
  contados: ReactNode;
  /** sobre qual total cada valor é lido */
  denominador: ReactNode;
  /** data da base */
  data: ReactNode;
  fonte: ReactNode;
  limitacao: ReactNode;
};

const FICHA_ROWS: { key: keyof ChartFicha; label: string }[] = [
  { key: "vendo", label: "O que estou vendo" },
  { key: "contados", label: "Quem é contado" },
  { key: "denominador", label: "Denominador" },
  { key: "data", label: "Data" },
  { key: "fonte", label: "Fonte" },
  { key: "limitacao", label: "Limitação" },
];

export function FichaGrafico({ ficha }: { ficha: ChartFicha }) {
  return (
    <details className="group border-t border-rule px-5 py-3 md:px-6">
      <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-plum underline underline-offset-4 [&::-webkit-details-marker]:hidden">
        <span className="group-open:hidden">Ficha do gráfico</span>
        <span className="hidden group-open:inline">Fechar a ficha</span>
      </summary>
      <dl className="mt-3 grid gap-x-6 gap-y-3 text-sm leading-relaxed md:grid-cols-2">
        {FICHA_ROWS.map((row) => (
          <div key={row.key} className="min-w-0">
            <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{row.label}</dt>
            <dd className="mt-0.5 text-ink/85">{ficha[row.key]}</dd>
          </div>
        ))}
      </dl>
    </details>
  );
}

/**
 * Padrão único de gráfico do observatório.
 * Cabeçalho: rótulo (o que é) + título (o que mostra) + legenda à direita.
 * Corpo: o gráfico. Rodapé: nota de escala/base, fonte e a assinatura (olho + endereço),
 * para que um print compartilhado leve a origem junto.
 *
 * Regras de marca dentro do corpo (ver ChartBar):
 * - barra de 16 px (h-4) sobre trilho claro, régua declarada no rodapé;
 * - valor colado no fim da barra, em Fraunces;
 * - rótulo à esquerda, com "X de Y" logo abaixo em mono;
 * - laranja só para o dado de 2026 quando há comparação no tempo.
 */
export function ChartFrame({
  eyebrow,
  title,
  legend,
  note,
  source,
  children,
  className = "",
  ariaLabel,
  ficha,
}: {
  ficha?: ChartFicha;
  eyebrow: string;
  title?: ReactNode;
  legend?: ReactNode;
  note?: ReactNode;
  source?: ReactNode;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <figure className={`border border-rule bg-card ${className}`} aria-label={ariaLabel}>
      <figcaption className="flex flex-wrap items-end justify-between gap-4 border-b border-ink px-5 pb-4 pt-5 md:px-6">
        <div className="min-w-0">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-plum">{eyebrow}</p>
          {title && <h3 className="mt-2 max-w-2xl font-display text-xl leading-tight text-ink md:text-2xl">{title}</h3>}
        </div>
        {legend && <div className="flex flex-wrap gap-4 font-mono text-xs uppercase text-muted-foreground" aria-label="Legenda">{legend}</div>}
      </figcaption>
      <div className="px-5 py-5 md:px-6">{children}</div>
      {(note || source) && (
        <div className="flex flex-wrap items-end justify-between gap-3 border-t border-rule px-5 py-3 md:px-6">
          <div className="min-w-0 max-w-3xl space-y-1 text-xs leading-relaxed text-muted-foreground">
            {note && <p>{note}</p>}
            {source && <p className="font-mono">{source}</p>}
          </div>
          <ChartSignature />
        </div>
      )}
      {ficha && <FichaGrafico ficha={ficha} />}
    </figure>
  );
}

export function ChartSignature() {
  return (
    <p className="flex shrink-0 items-center gap-1.5 font-mono text-[0.75rem] text-muted-foreground">
      <BrandLogo className="size-4" />
      quemsaoelas.com.br
    </p>
  );
}

export function LegendSwatch({ className, children }: { className: string; children: ReactNode }) {
  return (
    <span className="flex items-center gap-2"><span className={`size-2.5 ${className}`} aria-hidden="true" />{children}</span>
  );
}

/** Barra padrão: rótulo e base à esquerda, barra no meio, valor no fim. */
export function ChartBar({
  label,
  base,
  value,
  display,
  scaleMax = 100,
  barClass = "bg-plum",
  valueClass = "text-ink",
  stacked = false,
}: {
  label: ReactNode;
  base?: ReactNode;
  value: number;
  display: ReactNode;
  scaleMax?: number;
  barClass?: string;
  valueClass?: string;
  /** rótulo em cima, barra e valor embaixo: para colunas estreitas */
  stacked?: boolean;
}) {
  const width = Math.max(0, Math.min((value / scaleMax) * 100, 100));
  if (stacked) {
    return (
      <div>
        <p className="text-sm font-medium leading-tight text-ink">
          {label}
          {base && <span className="ml-2 font-mono text-xs font-normal text-muted-foreground">{base}</span>}
        </p>
        <div className="mt-1.5 grid grid-cols-[minmax(0,1fr)_4.25rem] items-center gap-3">
          <div className="h-4 bg-muted" aria-hidden="true">
            <div className={`h-full ${barClass}`} style={{ width: `${width}%` }} />
          </div>
          <p className={`whitespace-nowrap text-right font-display text-lg font-semibold leading-none ${valueClass}`}>{display}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_4.25rem] items-center gap-x-3 gap-y-1.5 sm:grid-cols-[10rem_minmax(0,1fr)_4.5rem] sm:gap-y-0">
      <div className="col-span-2 min-w-0 sm:col-span-1">
        <p className="text-sm font-medium leading-tight text-ink">{label}</p>
        {base && <p className="font-mono text-xs text-muted-foreground">{base}</p>}
      </div>
      <div className="h-4 bg-muted" aria-hidden="true">
        <div className={`h-full ${barClass}`} style={{ width: `${width}%` }} />
      </div>
      <p className={`whitespace-nowrap text-right font-display text-lg font-semibold leading-none ${valueClass}`}>{display}</p>
    </div>
  );
}

/** Régua declarada, sempre embaixo das barras. */
export function ChartScale({ max = 50, stacked = false, unit = "%" }: { max?: number; stacked?: boolean; unit?: string }) {
  const z = unit === "%" ? "0%" : "0";
  const top = unit === "%" ? `${max}%` : `${max} ${unit}`;
  if (stacked) {
    return (
      <div className="mt-3 grid grid-cols-[minmax(0,1fr)_4.25rem] gap-3 font-mono text-xs text-muted-foreground" aria-hidden="true">
        <span className="flex justify-between border-t border-rule pt-1"><span>{z}</span><span>{top}</span></span>
        <span />
      </div>
    );
  }
  return (
    <div className="mt-3 grid grid-cols-[minmax(0,1fr)_4.25rem] gap-3 font-mono text-xs text-muted-foreground sm:grid-cols-[10rem_minmax(0,1fr)_4.5rem]" aria-hidden="true">
      <span className="hidden sm:block" />
      <span className="flex justify-between border-t border-rule pt-1"><span>{z}</span><span>{top}</span></span>
      <span />
    </div>
  );
}
