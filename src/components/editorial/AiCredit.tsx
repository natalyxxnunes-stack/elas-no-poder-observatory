/**
 * AiCredit — crédito discreto de ilustração, sem faixa nem alto contraste.
 * Usado apenas nas aberturas ilustradas grandes.
 */
export function AiCredit({ className = "" }: { className?: string }) {
  return (
    <figcaption
      className={`mt-1.5 text-right font-mono text-[11px] leading-tight text-muted-foreground/60 md:text-[12px] ${className}`}
    >
      Ilustração gerada com inteligência artificial sob direção editorial.
    </figcaption>
  );
}

