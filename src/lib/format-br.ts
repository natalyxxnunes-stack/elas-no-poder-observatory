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

export function formatBRL(value: number): string {
  return `R$ ${formatDecimal(value, 2)}`;
}

export function formatBRLCompact(value: number): string {
  const absolute = Math.abs(value);
  if (absolute >= 1_000_000_000) {
    return `R$ ${formatDecimal(value / 1_000_000_000, 2).replace(/,00$/, "")} bilhões`;
  }
  if (absolute >= 1_000_000) {
    const amount = formatDecimal(value / 1_000_000, 1).replace(/,0$/, "");
    return `R$ ${amount} ${Math.abs(value / 1_000_000) < 2 ? "milhão" : "milhões"}`;
  }
  if (absolute >= 1_000) return `R$ ${formatInt(value / 1_000)} mil`;
  return formatBRL(value);
}

/** Converte percentual em frequência legível: "metade", "1 em cada 3", "pouco mais de 1 em cada 3". */
export function formatUmEmCada(share: number): string {
  if (!Number.isFinite(share) || share <= 0) return "—";
  const ratio = 100 / share;
  const k = Math.round(ratio);
  if (k === 2 && Math.abs(ratio - 2) < 0.1) return "metade";
  if (k >= 10 || Math.abs(ratio - k) < 0.1) return `1 em cada ${k}`;
  return share > 100 / k ? `pouco mais de 1 em cada ${k}` : `pouco menos de 1 em cada ${k}`;
}

export function formatDateBR(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}
