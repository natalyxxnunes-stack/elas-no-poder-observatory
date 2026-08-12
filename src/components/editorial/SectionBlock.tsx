/**
 * SectionBlock — ritmo editorial de scroll: pergunta → elemento gráfico →
 * dado → visualização → contexto → fonte. O componente cuida da moldura;
 * o conteúdo entra como children.
 *
 * `tone` dá fundo colorido chapado a seções-chave (ritmo claro → colorido →
 * respiro). Só muda tratamento de fundo, nunca conteúdo.
 */
type Tone = "paper" | "plum" | "ink" | "solar";

const TONE_WRAP: Record<Tone, string> = {
  paper: "",
  plum: "bg-plum text-cream",
  ink: "ink-panel",
  solar: "bg-solar text-ink",
};

const TONE_KICKER: Record<Tone, string> = {
  paper: "kicker",
  plum: "font-mono text-[11px] uppercase tracking-[0.18em] text-solar",
  ink: "font-mono text-[11px] uppercase tracking-[0.18em] text-solar",
  solar: "font-mono text-[11px] uppercase tracking-[0.18em] text-plum",
};

const TONE_TITLE: Record<Tone, string> = {
  paper: "text-ink",
  plum: "text-cream",
  ink: "text-cream",
  solar: "text-ink",
};

const TONE_LEAD: Record<Tone, string> = {
  paper: "text-muted-foreground",
  plum: "text-cream/85",
  ink: "text-cream/85",
  solar: "text-ink/80",
};

export function SectionBlock({
  kicker,
  question,
  lead,
  align = "left",
  children,
  source,
  tone = "paper",
}: {
  kicker: string;
  question: string;
  lead?: React.ReactNode;
  align?: "left" | "wide";
  children?: React.ReactNode;
  source?: React.ReactNode;
  tone?: Tone;
}) {
  const colored = tone !== "paper";

  return (
    <section
      className={
        colored
          ? `${TONE_WRAP[tone]} my-10 rounded-lg px-5 py-12 md:px-10 md:py-14`
          : "rule-top py-12 md:py-14"
      }
    >
      <p className={TONE_KICKER[tone]}>{kicker}</p>
      <h2
        className={`mt-3 font-display text-2xl leading-snug md:text-4xl ${TONE_TITLE[tone]} ${
          align === "wide" ? "max-w-4xl" : "max-w-2xl"
        }`}
      >
        {question}
      </h2>
      {lead && (
        <div className={`mt-4 max-w-2xl leading-relaxed ${TONE_LEAD[tone]}`}>
          {lead}
        </div>
      )}
      {children && <div className="mt-8">{children}</div>}
      {source && (
        <p className={`mt-6 font-mono text-[11px] ${TONE_LEAD[tone]}`}>{source}</p>
      )}
    </section>
  );
}
