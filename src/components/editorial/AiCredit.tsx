/**
 * AiCredit — crédito discreto de ilustração, sem faixa nem alto contraste.
 * Usado apenas nas aberturas ilustradas grandes.
 */
export function AiCredit({ className = "" }: { className?: string }) {
  return (
    <figcaption
      className={`pointer-events-none absolute bottom-1.5 right-2 max-w-[85%] text-right font-mono text-[9px] leading-tight text-cream/70 mix-blend-luminosity md:text-[10px] ${className}`}
    >
      Ilustração gerada com inteligência artificial sob direção editorial.
    </figcaption>
  );
}
