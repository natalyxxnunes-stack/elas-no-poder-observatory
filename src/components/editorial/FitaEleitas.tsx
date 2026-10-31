import { RESULT_2026_PROPORCIONAL as R } from "@/data/resultado-2026";
import { formatInt } from "@/lib/format-br";

/**
 * Fita das eleitas: um quadrado por deputada eleita em 2026 (federal,
 * estadual e distrital), na cor/raça declarada ao TSE. Assinatura visual do
 * site feita de dado: a contagem é a do resultado oficial recontado.
 */
const ORDEM = [
  ["BRANCA", "brancas", "bg-[var(--race-branca)]"],
  ["PARDA", "pardas", "bg-[var(--race-parda)]"],
  ["PRETA", "pretas", "bg-plum"],
  ["INDÍGENA", "indígenas", "bg-forest"],
  ["AMARELA", "amarelas", "bg-[var(--race-amarela)]"],
] as const;

export function FitaEleitas() {
  const raca = R.electedRaceFeminine as Record<string, number>;
  const celulas = ORDEM.flatMap(([k, , cor]) => Array.from({ length: raca[k] ?? 0 }, () => cor));
  return (
    <figure className="relative left-1/2 -ml-[50vw] w-screen bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
        <div aria-hidden="true" className="flex flex-wrap gap-[3px]">
          {celulas.map((c, i) => (
            <span key={i} className={`block size-[9px] md:size-[11px] ${c}`} />
          ))}
        </div>
        <figcaption className="mt-4 flex flex-wrap items-baseline gap-x-5 gap-y-1 text-[13px] text-ink/80">
          <span className="font-medium text-ink">
            Cada quadrado é uma das {formatInt(R.elected.feminine)} deputadas eleitas em 2026:
          </span>
          {ORDEM.map(([k, l, cor]) => (
            <span key={k} className="inline-flex items-center gap-1.5">
              <span className={`size-2.5 ${cor}`} />
              {formatInt(raca[k] ?? 0)} {l}
            </span>
          ))}
          <span className="text-muted-foreground">TSE, base de 27/10/2026; cor/raça declarada</span>
        </figcaption>
      </div>
    </figure>
  );
}
