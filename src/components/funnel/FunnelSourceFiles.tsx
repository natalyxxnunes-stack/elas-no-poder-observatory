import { RESULT_2026_META } from "@/data/resultado-2026";
import { VAGAS_SOURCE } from "@/data/vagas-2026";

/** A origem real dos dois denominadores da consulta territorial. */
export function FunnelSourceFiles() {
  return (
    <aside aria-label="Arquivos oficiais de candidaturas e vagas" className="mb-8 grid border border-ink bg-[var(--art-gold)] text-ink md:grid-cols-2">
      <div className="border-b border-ink/30 p-5 md:border-b-0 md:border-r md:p-7">
        <p className="font-mono text-xs font-semibold uppercase tracking-wide text-ink/70">Arquivo oficial · numerador</p>
        <h3 className="mt-2 font-display text-2xl">Candidatos 2026</h3>
        <p className="mt-3 text-sm leading-relaxed">Candidaturas por gênero, cargo e território. A extração de referência foi gerada em {RESULT_2026_META.baseGeneratedAt}.</p>
        <a href={RESULT_2026_META.resourceUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 items-center font-semibold underline underline-offset-4">Arquivo de candidaturas do TSE ↗</a>
      </div>
      <div className="p-5 md:p-7">
        <p className="font-mono text-xs font-semibold uppercase tracking-wide text-ink/70">Arquivo oficial · denominador</p>
        <h3 className="mt-2 font-display text-2xl">Vagas 2026</h3>
        <p className="mt-3 text-sm leading-relaxed">O recurso {VAGAS_SOURCE.fileName} registra vagas por cargo. Extração de 15/08/2026. Vices e suplentes não entram como vagas autônomas neste recorte.</p>
        <a href={VAGAS_SOURCE.resourceUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 items-center font-semibold underline underline-offset-4">Arquivo de vagas do TSE ↗</a>
      </div>
    </aside>
  );
}
