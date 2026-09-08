import { EditorialArtwork } from "./EditorialArtwork";

/**
 * PageHero — abertura editorial oficial do projeto.
 *
 * MODO WIDE (`wide`) — abertura em duas áreas: pergunta e composição abstrata.
 * A arte é construída no próprio design system, sem fotografias ou imagens de
 * pessoas. `aside` e `actions` continuam opcionais.
 *
 * MODO PADRÃO (sem `wide`): abertura em duas colunas, mantida como estava.
 *
 * Gramática editorial em ambos: kicker → pergunta grande → linha de apoio.
 */
export function PageHero({
  kicker,
  question,
  lead,
  image,
  aside,
  wide,
  actions,
}: {
  kicker: string;
  question: string | React.ReactNode;
  lead: React.ReactNode;
  image?: string;
  imageAlt?: string;
  aside?: React.ReactNode;
  wide?: boolean;
  actions?: React.ReactNode;
  imagePosition?: string;
}) {
  if (wide) {
    return (
      <section className="page-hero-wide relative left-1/2 -ml-[50vw] w-screen border-b border-ink bg-cream">
        <div className="mx-auto grid min-h-[40rem] max-w-[90rem] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative z-10 flex flex-col justify-end px-5 pb-12 pt-28 md:px-10 md:pb-16 lg:px-16 lg:pb-20">
            <p className="editorial-index">Dossiê / {kicker}</p>
            <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.8rem,7vw,6.6rem)] leading-[0.9] text-ink">
              {question}
            </h1>
            <div className="mt-7 max-w-2xl border-l-2 border-coral pl-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              {lead}
            </div>
            {actions && <div className="mt-7 flex flex-wrap gap-3">{actions}</div>}
          </div>
          <EditorialArtwork variant="territory" className="min-h-[28rem] lg:min-h-full" />
        </div>

        {aside && (
          <div className="absolute right-5 top-5 z-20 border border-ink bg-solar px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink md:right-8 md:top-7">
            {aside}
          </div>
        )}
      </section>
    );
  }

  return (
    <section className="grid gap-10 border-b border-ink py-14 md:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
      <div>
        <p className="editorial-index">Dossiê / {kicker}</p>
        <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[0.94] text-ink md:text-7xl">
          {question}
        </h1>
        <div className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {lead}
        </div>
        {actions && <div className="mt-7 flex flex-wrap gap-3">{actions}</div>}
      </div>
      <div className="lg:pb-2">
        {image && (
          <EditorialArtwork variant="archive" className="min-h-72" />
        )}
        {aside}
      </div>
    </section>
  );
}
