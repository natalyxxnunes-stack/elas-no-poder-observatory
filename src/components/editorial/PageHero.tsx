import { AiCredit } from "./AiCredit";

/**
 * PageHero — abertura editorial de cada eixo.
 * Gramática: kicker → pergunta grande → linha de apoio → ilustração.
 * Com `wide`, a ilustração é protagonista horizontal e o painel de texto
 * assenta sobre ela (assimétrico), como na home.
 */
export function PageHero({
  kicker,
  question,
  lead,
  image,
  imageAlt,
  aside,
  wide,
  actions,
}: {
  kicker: string;
  question: string;
  lead: React.ReactNode;
  image?: string;
  imageAlt?: string;
  aside?: React.ReactNode;
  wide?: boolean;
  actions?: React.ReactNode;
}) {
  if (wide && image) {
    return (
      <section className="py-8 md:py-12">
        <figure>
          <div className="overflow-hidden rounded-lg border border-rule">
            <img
              src={image}
              alt={imageAlt ?? ""}
              aria-hidden={imageAlt ? undefined : true}
              className="h-[220px] w-full object-cover sm:h-[300px] md:h-[420px]"
            />
          </div>
          <AiCredit />
        </figure>


        <div className="relative z-10 mx-auto -mt-10 max-w-3xl px-1 md:-mt-24 md:mr-auto md:ml-0 md:px-0">
          <div className="rounded-lg border-2 border-ink bg-paper/95 p-6 shadow-[9px_9px_0_0_var(--color-plum)] md:p-9">
            <p className="kicker">{kicker}</p>
            <h1 className="mt-3 font-display text-3xl leading-[1.05] text-ink md:text-5xl">
              {question}
            </h1>
            <div className="mt-5 max-w-2xl leading-relaxed text-muted-foreground md:text-lg">
              {lead}
            </div>
            {actions && <div className="mt-7 flex flex-wrap gap-3">{actions}</div>}
          </div>
        </div>

        {aside && <div className="mt-6 max-w-xl">{aside}</div>}
      </section>
    );
  }

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
        {actions && <div className="mt-7 flex flex-wrap gap-3">{actions}</div>}
      </div>
      <div className="lg:pb-2">
        {image && (
          <img
            src={image}
            alt={imageAlt ?? ""}
            aria-hidden={imageAlt ? undefined : true}
            loading="lazy"
            className="mx-auto h-auto w-full max-w-md lg:mx-0"
          />
        )}
        {aside}
      </div>
    </section>
  );
}
