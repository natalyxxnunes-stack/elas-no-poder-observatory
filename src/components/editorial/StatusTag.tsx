/**
 * StatusTag — nota de margem: mono pequeno, filete curto, sem moldura.
 */
export function StatusTag({ children, tone = "pending" }: { children: React.ReactNode; tone?: "ok" | "pending" | "limit" }) {
  const color = tone === "ok" ? "text-plum" : tone === "limit" ? "text-muted-foreground" : "text-coral-ink";
  return (
    <span className={`inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] ${color}`}>
      <span aria-hidden className="h-px w-3 bg-current" />
      {children}
    </span>
  );
}
