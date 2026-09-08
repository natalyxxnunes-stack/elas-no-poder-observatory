// Formatação numérica determinística no padrão pt-BR.
// Não usa Intl/toLocaleString: evita divergência build (Node) × navegador
// que causava hydration mismatch (React #418).

export function formatInt(value: number): string {
  const r = Math.round(value);
  const sign = r < 0 ? "-" : "";
  const digits = Math.abs(r).toString();
  return sign + digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function formatDecimal(value: number, fractionDigits = 1): string {
  const sign = value < 0 ? "-" : "";
  const fixed = Math.abs(value).toFixed(fractionDigits);
  const parts = fixed.split(".");
  const intPart = parts[0] ?? "0";
  const fracPart = parts[1];
  const intT = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return sign + intT + (fracPart ? "," + fracPart : "");
}

export function formatPct(value: number, fractionDigits = 1): string {
  return `${formatDecimal(value, fractionDigits)}%`;
}

/** Formata apenas a parte civil da data ISO, sem depender do fuso do ambiente. */
export function formatDateBR(value: string | null | undefined): string | null {
  if (!value) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  if (!match) return null;
  const [, year, month, day] = match;
  return `${day}/${month}/${year}`;
}

export function formatLongDateBR(value: string | null | undefined): string | null {
  if (!value) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  if (!match) return null;
  const [, year, month, day] = match;
  const months = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
  ];
  const monthName = months[Number(month) - 1];
  return monthName ? `${day} de ${monthName} de ${year}` : null;
}
