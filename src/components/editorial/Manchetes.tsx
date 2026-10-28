import type { Manchete } from "@/data/manchetes";

/**
 * Manchetes secundárias logo abaixo da abertura de uma página: frases curtas,
 * com fonte, para quem lê só o topo. Cada uma aponta para a seção ou página
 * que a prova.
 */
export function ManchetesStrip({
  items,
  label = "Também nesta apuração",
}: {
  items: Manchete[];
  label?: string;
}) {
  return (
    <section aria-label={label} className="mb-8 border-y-2 border-ink">
      <p className="pt-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <ul className="grid gap-px bg-rule md:grid-cols-2 lg:grid-cols-3">
        {items.map((m) => (
          <li key={m.id} className="bg-paper py-4 pr-5">
            <p className="font-display text-lg leading-snug text-ink">{m.texto}.</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {m.fonte}
              {m.parcial ? ". Prestação de contas em andamento; o número pode mudar." : "."}
            </p>
            <a
              href={m.to}
              className="mt-2 inline-block font-mono text-xs uppercase tracking-wider text-plum underline decoration-plum underline-offset-4"
            >
              Ver em {m.pagina} →
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Capa da página inicial: as manchetes do site, numeradas, cada uma com o caminho da prova. */
export function CapaManchetes({ items }: { items: Manchete[] }) {
  return (
    <section aria-labelledby="capa-manchetes" className="border-y-2 border-ink py-6">
      <h2
        id="capa-manchetes"
        className="font-mono text-xs uppercase tracking-[0.14em] text-coral-ink"
      >
        O que os dados de 2026 mostram
      </h2>
      <ol className="mt-4 divide-y divide-rule">
        {items.map((m, i) => (
          <li
            key={m.id}
            className="grid gap-2 py-4 sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-5"
          >
            <span className="font-mono text-sm text-plum">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <p className="font-display text-xl leading-snug text-ink md:text-2xl">{m.texto}.</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {m.fonte}
                {m.parcial ? ". Prestação de contas em andamento; o número pode mudar." : "."}
              </p>
            </div>
            <a
              href={m.to}
              className="font-mono text-xs uppercase tracking-wider text-plum underline decoration-plum underline-offset-4 sm:whitespace-nowrap"
            >
              {m.pagina} →
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
