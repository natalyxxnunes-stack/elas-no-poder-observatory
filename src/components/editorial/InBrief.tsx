/**
 * InBrief — bloco "Em poucas linhas": o que encontramos, por que importa e o
 * que ainda não sabemos. Obrigatório em páginas de texto longo.
 */
export function InBrief({
  found,
  matters,
  unknown,
}: {
  found: React.ReactNode;
  matters: React.ReactNode;
  unknown: React.ReactNode;
}) {
  const rows = [
    { label: "O que encontramos", body: found },
    { label: "Por que importa", body: matters },
    { label: "O que ainda não sabemos", body: unknown },
  ];
  return (
    <section
      aria-label="Em poucas linhas"
      className="editorial-card overflow-hidden"
    >
      <h2 className="border-b border-rule bg-secondary px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-plum">
        Em poucas linhas
      </h2>
      <dl className="divide-y divide-rule">
        {rows.map((r) => (
          <div key={r.label} className="px-5 py-4 sm:flex sm:gap-6">
            <dt className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-muted-foreground sm:w-48">
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
