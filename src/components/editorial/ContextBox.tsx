/**
 * ContextBox — caixas contextuais didáticas usadas em todas as páginas.
 * Três tipos fixos: "O que significa?", "Por que isso importa?" e
 * "Como calculamos?". Sem infantilizar: explicação curta e direta.
 */

const VARIANTS = {
  significa: {
    title: "O que significa?",
    accent: "border-l-plum",
    tint: "bg-secondary/70",
  },
  importa: {
    title: "Por que isso importa?",
    accent: "border-l-solar",
    tint: "bg-accent/10",
  },
  calculamos: {
    title: "Como calculamos?",
    accent: "border-l-muted-foreground",
    tint: "bg-muted",
  },
} as const;

export type ContextVariant = keyof typeof VARIANTS;

export function ContextBox({
  variant,
  title,
  children,
}: {
  variant: ContextVariant;
  title?: string;
  children: React.ReactNode;
}) {
  const v = VARIANTS[variant];
  return (
    <aside
      className={`border-l-4 ${v.accent} ${v.tint} rounded-r-md px-5 py-4`}
    >
      <h3 className="font-mono text-[12px] uppercase tracking-[0.16em] text-ink">
        {title ?? v.title}
      </h3>
      <div className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </aside>
  );
}
