import type { ReactNode } from "react";

/**
 * Faixa — bloco de largura total dentro do PageShell, para o ritmo de fundos
 * da revista (branco-papel, cinza-lilás frio, roxo e roxo-tinta).
 */
export function Faixa({
  fundo,
  children,
  className = "",
  id,
}: {
  fundo: string;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`relative left-1/2 -ml-[50vw] w-screen ${fundo} ${className}`}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">{children}</div>
    </section>
  );
}
