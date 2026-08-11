/**
 * PageHero — abertura editorial assimétrica de cada eixo.
 * Gramática: kicker → pergunta grande → linha de apoio → ilustração/elemento
 * gráfico. Nunca título + parágrafo neutro.
 */
export function PageHero({
  kicker,
  question,
  lead,
  image,
  imageAlt,
  aside,
}: {
  kicker: string;
  question: string;
  lead: React.ReactNode;
  image?: string;
  imageAlt?: string;
  aside?: React.ReactNode;
}) {
  return (
    <section className="grid gap-8 py-12 md:py-16 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
      <div>
        <p className="kicker">{kicker}</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.03] text-ink md:text-6xl">
          {question}
        </h1>
        <div className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {lead}
        </div>
      </div>
      <div className="lg:pb-2">
        {image && (
          <img
            src={image}
            alt={imageAlt ?? ""}
            aria-hidden={imageAlt ? undefined : true}
            loading="lazy"
            width={640}
            height={640}
            className="mx-auto h-36 w-36 md:h-52 md:w-52 lg:mx-0"
          />
        )}
        {aside}
      </div>
    </section>
  );
}
