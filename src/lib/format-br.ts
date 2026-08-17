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
