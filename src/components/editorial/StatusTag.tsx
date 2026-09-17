/**
 * StatusTag — etiqueta de status padronizada. Usa apenas os status já
 * definidos na camada de dados/arquitetura; não cria categorias novas.
 */
export function StatusTag({
  children,
  tone = "pending",
}: {
  children: React.ReactNode;
  tone?: "ok" | "pending" | "limit";
}) {
  const color =
    tone === "ok"
      ? "border-plum text-plum"
      : tone === "limit"
        ? "border-muted-foreground text-muted-foreground"
        : "border-coral text-coral-ink";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[12px] uppercase tracking-[0.14em] ${color}`}
    >
      {children}
    </span>
  );
}
