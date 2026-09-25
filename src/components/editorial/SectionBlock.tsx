/**
 * SectionBlock — ritmo editorial de scroll: pergunta → elemento gráfico →
 * dado → visualização → contexto → fonte. O componente cuida da moldura;
 * o conteúdo entra como children.
 *
 * `tone` dá fundo em largura total (como na home), alternando papel, lavanda,
 * tinta e roxo. Só muda tratamento de fundo, nunca conteúdo.
 */
type Tone = "paper" | "plum" | "ink" | "lilac";

const TONE_WRAP: Record<Tone, string> = {
  paper: "",
  plum: "bg-plum text-cream",
  ink: "ink-panel",
  lilac: "bg-lilac text-ink",
};

const TONE_KICKER: Record<Tone, string> = {
  paper: "kicker",
  plum: "font-mono text-xs uppercase tracking-[0.18em] text-cream/80",
  ink: "font-mono text-xs uppercase tracking-[0.18em] text-cream/80",
  lilac: "font-mono text-xs uppercase tracking-[0.18em] text-plum",
};

const TONE_TITLE: Record<Tone, string> = {
  paper: "text-ink",
  plum: "text-cream",
  ink: "text-cream",
  lilac: "text-ink",
};

const TONE_LEAD: Record<Tone, string> = {
  paper: "text-muted-foreground",
  plum: "text-cream/85",
  ink: "text-cream/85",
  lilac: "text-ink/80",
};

export function SectionBlock({
  id,
  kicker,
  question,
  lead,
  align = "left",
  children,
  source,
  tone = "paper",
}: {
  id?: string;
  kicker: string;
  question: string;
  lead?: React.ReactNode;
  align?: "left" | "wide";
  children?: React.ReactNode;
  source?: React.ReactNode;
  tone?: Tone;
}) {
  const colored = tone !== "paper";

  const body = (
    <>
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
        <p className={`mt-6 font-mono text-xs ${TONE_LEAD[tone]}`}>{source}</p>
      )}
    </>
  );

  if (!colored) {
    return (
      <section id={id} className="rule-top scroll-mt-20 py-12 md:py-14">
        {body}
      </section>
    );
  }

  return (
    <section
      id={id}
      className={`${TONE_WRAP[tone]} relative left-1/2 -ml-[50vw] w-screen scroll-mt-20`}
    >
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">{body}</div>
    </section>
  );
}
