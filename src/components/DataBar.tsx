import { formatPct } from "@/lib/format-br";

/**
 * DataBar — barra de progresso editorial compartilhada.
 *
 * Um único padrão de acessibilidade (role="img" + aria-label calculado) para
 * todas as barras de dado do site. O preenchimento normal e a hachura de
 * "sem dado" são decididos internamente a partir de pct: quando pct é null,
 * a barra nunca exibe número — só o estado vazio declarado.
 */

const HEIGHTS = {
  sm: "h-2",
  md: "h-3",
  lg: "h-6",
} as const;

const RADII = {
  sm: "rounded-sm",
  full: "rounded-full",
} as const;

const TONES = {
  plum: "bg-plum",
  coral: "bg-coral",
} as const;

const HATCH =
  "bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,var(--color-rule)_5px,var(--color-rule)_10px)]";

export type DataBarProps = {
  /** 0–100, ou null quando não há valor (renderiza a hachura de sem dado). */
  pct: number | null;
  /** Rótulo curto da medida, usado para gerar o aria-label. */
  label: string;
  /** aria-label completo; se omitido, é gerado a partir de label + pct/fallbackText. */
  ariaLabel?: string;
  /** Texto para o aria-label quando pct é null (ex: um status padronizado). */
  fallbackText?: string;
  height?: keyof typeof HEIGHTS;
  radius?: keyof typeof RADII;
  /** Se falso, não renderiza o trilho bg-muted por trás (barra solta na célula). */
  track?: boolean;
  tone?: keyof typeof TONES;
};

export function DataBar({
  pct,
  label,
  ariaLabel,
  fallbackText,
  height = "md",
  radius = "sm",
  track = true,
  tone = "plum",
}: DataBarProps) {
  const hasValue = pct !== null && Number.isFinite(pct);
  const computedAriaLabel =
    ariaLabel ??
    (hasValue
      ? `${label}: ${formatPct(pct)}`
      : fallbackText
        ? `${label}: ${fallbackText}`
        : label);

  return (
    <div
      role="img"
      aria-label={computedAriaLabel}
      className={`${HEIGHTS[height]} w-full overflow-hidden ${RADII[radius]}${
        track ? " bg-muted" : ""
      }`}
    >
      {hasValue ? (
        <div
          className={`h-full ${TONES[tone]} transition-all`}
          style={{ width: `${Math.min(Math.max(pct, 0), 100)}%` }}
        />
      ) : (
        <div className={`h-full w-full ${HATCH}`} />
      )}
    </div>
  );
}
