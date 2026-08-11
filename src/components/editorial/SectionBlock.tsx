/**
 * SectionBlock — ritmo editorial de scroll: pergunta → elemento gráfico →
 * dado → visualização → contexto → fonte. O componente cuida da moldura;
 * o conteúdo entra como children.
 */
export function SectionBlock({
  kicker,
  question,
  lead,
  align = "left",
  children,
  source,
}: {
  kicker: string;
  question: string;
  lead?: React.ReactNode;
  align?: "left" | "wide";
  children?: React.ReactNode;
  source?: React.ReactNode;
}) {
  return (
    <section className="rule-top py-12 md:py-14">
      <p className="kicker">{kicker}</p>
      <h2
        className={`mt-3 font-display text-2xl leading-snug text-ink md:text-4xl ${
          align === "wide" ? "max-w-4xl" : "max-w-2xl"
        }`}
      >
        {question}
      </h2>
      {lead && (
        <div className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
          {lead}
        </div>
      )}
      {children && <div className="mt-8">{children}</div>}
      {source && (
        <p className="mt-6 font-mono text-[11px] text-muted-foreground">
          {source}
        </p>
      )}
    </section>
  );
}
