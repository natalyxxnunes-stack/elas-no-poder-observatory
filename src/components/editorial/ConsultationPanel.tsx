import { useEffect, useRef, type ReactNode } from "react";

/**
 * Painel compacto de consulta: os dados completos permanecem acessíveis,
 * mas a página abre como reportagem, sem uma sequência de tabelas e gráficos.
 * <details> nativo permite teclado e dispensa JS de interação.
 *
 * O id fica na section (sempre visível), preservando links internos e PageIndex.
 */
export function ConsultationPanel({
  id,
  kicker,
  question,
  lead,
  children,
  tinted = false,
}: {
  id: string;
  kicker: string;
  question: string;
  lead?: ReactNode;
  children: ReactNode;
  /** pano de fundo lilás para módulos de consulta selecionados, sem alterar os dados */
  tinted?: boolean;
}) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    // Acesso direto por #deputadas, #votos etc. abre o conteúdo correspondente.
    const abrirAoNavegar = () => {
      if (decodeURIComponent(window.location.hash.slice(1)) === id && detailsRef.current) {
        detailsRef.current.open = true;
      }
    };
    abrirAoNavegar();
    window.addEventListener("hashchange", abrirAoNavegar);
    return () => window.removeEventListener("hashchange", abrirAoNavegar);
  }, [id]);

  return (
    <section id={id} className={tinted ? "relative left-1/2 -ml-[50vw] w-screen scroll-mt-24 bg-lilac/55" : "scroll-mt-24 border-t border-rule"}>
      <div className={tinted ? "mx-auto max-w-7xl px-5 md:px-8" : undefined}>
      <details ref={detailsRef} className="group">
        <summary className="flex min-h-28 cursor-pointer list-none items-center justify-between gap-4 py-5 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum [&::-webkit-details-marker]:hidden sm:py-6">
          <span className="min-w-0">
            <span className="block text-xs font-semibold uppercase tracking-wide text-plum">{kicker}</span>
            <h2 className="mt-2 font-display text-xl font-semibold leading-snug sm:text-2xl">{question}</h2>
          </span>
          <span className="shrink-0 self-center text-sm font-semibold text-plum">
            <span className="group-open:hidden">Explorar +</span>
            <span className="hidden group-open:inline">Recolher −</span>
          </span>
        </summary>
        <div className="border-t border-rule pb-10 pt-6">
          {lead ? <div className="mb-6 max-w-3xl text-base leading-relaxed text-ink/80">{lead}</div> : null}
          {children}
        </div>
      </details>
      </div>
    </section>
  );
}
