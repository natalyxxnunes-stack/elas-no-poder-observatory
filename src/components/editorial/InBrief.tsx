/**
 * InBrief — bloco "Em poucas linhas": o que encontramos, por que importa e o
 * que ainda não sabemos. Obrigatório em páginas de texto longo. Os três
 * rótulos têm um valor padrão, mas cada página pode substituí-los por um
 * rótulo específico ao achado que está sendo apresentado.
 */
export function InBrief({
  found,
  matters,
  unknown,
  foundLabel = "O que encontramos",
  mattersLabel = "Por que importa",
  unknownLabel = "O que ainda não sabemos",
  aberto = false,
}: {
  found: React.ReactNode;
  matters: React.ReactNode;
  unknown: React.ReactNode;
  foundLabel?: string;
  mattersLabel?: string;
  unknownLabel?: string;
  /** reportagens longas mantêm o resumo aberto; páginas de dado, recolhido */
  aberto?: boolean;
}) {
  const rows = [
    { label: foundLabel, body: found },
    { label: mattersLabel, body: matters },
    { label: unknownLabel, body: unknown },
  ];
  const lista = (
    <dl className="divide-y divide-rule">
      {rows.map((r) => (
        <div key={r.label} className="py-3 sm:flex sm:gap-6">
          <dt className="shrink-0 text-[13px] font-semibold text-ink sm:w-48">{r.label}</dt>
          <dd className="mt-1 text-[15px] leading-relaxed text-ink/85 sm:mt-0">{r.body}</dd>
        </div>
      ))}
    </dl>
  );
  if (aberto) {
    return (
      <section aria-label="Em poucas linhas" className="border-y-2 border-ink py-2">
        <h2 className="pt-2 font-mono text-[13px] uppercase tracking-[0.12em] text-plum">Em poucas linhas</h2>
        {lista}
      </section>
    );
  }
  /* Decisão de 30/10/2026 (auditoria editorial): nas páginas de dado o resumo
   * fica recolhido, para o primeiro gráfico subir; o conteúdo continua à mão. */
  return (
    <details className="group border-y border-rule">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-medium text-plum">
        <span>Em poucas linhas: o que encontramos, por que importa e o que falta</span>
        <span aria-hidden="true" className="transition-transform group-open:rotate-180">↓</span>
      </summary>
      <div className="pb-3">{lista}</div>
    </details>
  );
}
