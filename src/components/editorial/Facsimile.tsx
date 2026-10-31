/**
 * Fac-símile tipográfico de um dispositivo legal: o texto oficial composto
 * como página de diário, com a palavra que mudou marcada. Reprodução a partir
 * do texto público; não é imagem do documento. A redação anterior aparece
 * riscada; a vigente, sublinhada em laranja (é a regra que vale em 2026).
 */
export type FacsimileLei = {
  cabecalho: string;
  dispositivo: string;
  antes: { prefixo: string; troca: string; sufixo: string };
  depois: { prefixo: string; troca: string; sufixo: string };
  notaDepois: string;
  fonte: string;
};

export function Facsimile({ f }: { f: FacsimileLei }) {
  return (
    <figure className="mt-5 max-w-2xl">
      <div className="border-2 border-ink bg-cream px-5 py-4">
        <p className="border-b border-ink pb-2 text-center font-display text-[13px] uppercase tracking-[0.14em] text-ink">
          {f.cabecalho}
        </p>
        <p className="mt-3 font-display text-[15px] font-semibold text-ink">{f.dispositivo}</p>
        <p className="mt-2 font-display text-[15px] leading-relaxed text-ink/55 line-through decoration-ink/50">
          {f.antes.prefixo}
          <span className="font-semibold">{f.antes.troca}</span>
          {f.antes.sufixo}
        </p>
        <p className="mt-3 font-display text-[16px] leading-relaxed text-ink">
          {f.depois.prefixo}
          <span className="font-semibold underline decoration-coral decoration-2 underline-offset-4">{f.depois.troca}</span>
          {f.depois.sufixo}
          <span className="ml-1 text-[13px] text-ink/60">({f.notaDepois})</span>
        </p>
      </div>
      <figcaption className="mt-2 text-[13px] leading-snug text-muted-foreground">
        Reprodução tipográfica do texto legal; não é imagem do documento. Riscado: redação anterior. Sublinhado: redação
        vigente. {f.fonte}
      </figcaption>
    </figure>
  );
}
