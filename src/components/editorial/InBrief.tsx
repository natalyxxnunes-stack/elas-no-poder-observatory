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
}: {
  found: React.ReactNode;
  matters: React.ReactNode;
  unknown: React.ReactNode;
  foundLabel?: string;
  mattersLabel?: string;
  unknownLabel?: string;
}) {
  const rows = [
    { label: foundLabel, body: found },
    { label: mattersLabel, body: matters },
    { label: unknownLabel, body: unknown },
  ];
  return (
    <section
      aria-label="Em poucas linhas"
      className="editorial-card overflow-hidden"
    >
      <h2 className="border-b border-rule bg-secondary px-5 py-3 font-mono text-[12px] uppercase tracking-[0.16em] text-plum">
        Em poucas linhas
      </h2>
      <dl className="divide-y divide-rule">
        {rows.map((r) => (
          <div key={r.label} className="px-5 py-4 sm:flex sm:gap-6">
            <dt className="shrink-0 font-mono text-[12px] uppercase tracking-wider text-muted-foreground sm:w-48">
              {r.label}
            </dt>
            <dd className="mt-1 text-sm leading-relaxed text-ink sm:mt-0">
              {r.body}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
