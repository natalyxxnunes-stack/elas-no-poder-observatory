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
      className="editorial-ledger overflow-hidden border-y border-ink"
    >
      <h2 className="border-b border-ink bg-solar px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink">
        Em poucas linhas
      </h2>
      <dl className="divide-y divide-rule">
        {rows.map((r) => (
          <div key={r.label} className="grid px-5 py-5 sm:grid-cols-[12rem_1fr] sm:gap-6">
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
