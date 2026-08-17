// Formatação numérica determinística no padrão pt-BR.
// NÃO usa Intl/toLocaleString para evitar divergência entre build (Node) e
// navegador, que causava hydration mismatch (React #418).

/** Inteiro com ponto como separador de milhar: 6728 -> "6.728". */
export function formatInt(value: number): string {
  const rounded = Math.round(value);
  const sign = rounded < 0 ? "-" : "";
  const digits = Math.abs(rounded).toString();
  const withThousands = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return sign + withThousands;
}

/** Número com N casas decimais, vírgula decimal e ponto de milhar: 34.9 -> "34,9". */
export function formatDecimal(value: number, fractionDigits = 1): string {
  const sign = value < 0 ? "-" : "";
  const fixed = Math.abs(value).toFixed(fractionDigits); // "34.9"
  const [intPart, fracPart] = fixed.split(".");
  const intWithThousands = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return sign + intWithThousands + (fracPart ? "," + fracPart : "");
}

/** Percentual com 1 casa: 34.9 -> "34,9%". */
export function formatPct(value: number, fractionDigits = 1): string {
  return `${formatDecimal(value, fractionDigits)}%`;
}
