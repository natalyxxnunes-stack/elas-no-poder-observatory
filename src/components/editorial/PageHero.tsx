/**
 * PageHero — abertura editorial oficial do projeto.
 *
 * MODO WIDE (`wide` + `image`) — PADRÃO DE ABERTURA DE PÁGINA:
 * espelha exatamente o hero da home. Ilustração full-bleed (ocupa toda a
 * largura da janela, sem moldura, borda ou cantos arredondados) com um painel
 * de texto emoldurado flutuando por cima, no canto inferior esquerdo.
 * Qualquer página nova só precisa passar `wide`, `kicker`, `question`, `lead`,
 * `image`, `imageAlt` — e, opcionalmente, `aside` (etiqueta discreta no topo
 * direito) e `actions` (botões dentro do painel) — para herdar o hero completo,
 * sem reescrever layout.
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
  imageAlt,
  aside,
  wide,
  actions,
  /** Ajuste fino do enquadramento da ilustração no formato panorâmico. */
  imagePosition = "50% 30%",
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
  if (wide && image) {
    return (
      /* full-bleed: escapa da largura do PageShell e encosta nas bordas da janela */
      <section className="relative left-1/2 -ml-[50vw] w-screen">
        <img
          src={image}
          alt={imageAlt ?? ""}
          aria-hidden={imageAlt ? undefined : true}
          style={{ objectPosition: imagePosition }}
          className="block h-[78vh] min-h-[520px] w-full object-cover md:h-[80vh]"
        />

        {/* etiqueta opcional da página, discreta, sobre a imagem */}
        {aside && (
          <div className="absolute right-4 top-4 rounded-md bg-paper/85 px-3 py-1.5 font-mono text-[12px] uppercase tracking-[0.14em] text-ink md:right-8 md:top-6">
            {aside}
          </div>
        )}

        {/* painel de texto flutuante */}
        <div className="absolute inset-x-4 bottom-6 md:inset-x-0 md:bottom-14">
          <div className="mx-auto max-w-6xl md:px-8">
            <div className="max-w-xl rounded-lg border-2 border-ink bg-paper/95 p-5 shadow-[9px_9px_0_0_var(--color-plum)] backdrop-blur-sm md:max-w-2xl md:p-8">
              <p className="poster-eyebrow border-coral text-coral">{kicker}</p>
              <h1 className="mt-4 font-display text-[clamp(1.6rem,5vw,3.1rem)] leading-[1.03] text-ink">
                {question}
              </h1>
              <div className="mt-4 leading-relaxed text-muted-foreground md:text-lg">
                {lead}
              </div>
              {actions && (
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  {actions}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* crédito de ilustração, discreto, sobre a imagem */}
        <p className="absolute left-3 top-16 max-w-[70%] rounded bg-ink/70 px-2 py-1 text-right font-mono text-[12px] leading-tight text-cream/80 md:bottom-2 md:left-auto md:right-3 md:top-auto md:text-[12px]">
          Ilustração original gerada com inteligência artificial sob direção
          editorial.
        </p>
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
