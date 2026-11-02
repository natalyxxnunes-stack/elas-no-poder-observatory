import type { ReactNode } from "react";
import { Secao } from "@/components/editorial/Secao";

/**
 * Camadas da página (02/11/2026): a história fica à vista; tabelas de
 * referência e o método ficam recolhidos atrás de um botão.
 */
export function Desdobra({ rotulo, children, className = "" }: { rotulo: string; children: ReactNode; className?: string }) {
  return (
    <details className={`group ${className}`}>
      <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 border border-plum px-4 py-2 text-[14px] font-semibold text-plum hover:bg-lilac/40 [&::-webkit-details-marker]:hidden">
        <span className="group-open:hidden">{rotulo}</span>
        <span className="hidden group-open:inline">Recolher</span>
        <span aria-hidden="true" className="transition-transform group-open:rotate-180">
          ▾
        </span>
      </summary>
      <div className="mt-6">{children}</div>
    </details>
  );
}

/** Divisa entre a história da página e as ferramentas de consulta. */
export function ExploreDivisa({ lead }: { lead: ReactNode }) {
  return (
    <div className="pb-2 pt-14">
      <Secao nome="Explore os dados" tipo="consulta" />
      <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-ink/75">{lead}</p>
    </div>
  );
}
