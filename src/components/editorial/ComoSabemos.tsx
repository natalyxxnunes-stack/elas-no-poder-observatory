import { Link } from "@tanstack/react-router";

/** Camada 2 da página: fonte, universo, base, cálculo e limites, num lugar só, no fim. */
export function ComoSabemos({
  fonte,
  universo,
  base,
  calculo,
  limites,
  children,
}: {
  fonte: React.ReactNode;
  universo: React.ReactNode;
  base?: string | null;
  calculo?: React.ReactNode;
  limites: React.ReactNode[];
  children?: React.ReactNode;
}) {
  const rows: { label: string; body: React.ReactNode }[] = [
    { label: "Fonte", body: fonte },
    { label: "Universo", body: universo },
  ];
  if (base) rows.push({ label: "Base", body: base });
  if (calculo) rows.push({ label: "Como calculamos", body: calculo });
  rows.push({
    label: "Limites",
    body: (
      <ul className="list-disc space-y-1 pl-4">
        {limites.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    ),
  });
  return (
    <section id="como-sabemos" aria-labelledby="como-sabemos-titulo" className="rule-top scroll-mt-20 py-12">
      <p className="kicker">Como sabemos</p>
      <h2 id="como-sabemos-titulo" className="mt-3 max-w-2xl font-display text-xl leading-snug text-ink md:text-2xl">
        Fonte, conta e limites desta página
      </h2>
      <dl className="mt-6 max-w-4xl divide-y divide-rule border-y border-rule">
        {rows.map((row) => (
          <div key={row.label} className="py-3 sm:grid sm:grid-cols-[11rem_1fr] sm:gap-6">
            <dt className="font-mono text-[12px] uppercase tracking-wider text-muted-foreground">{row.label}</dt>
            <dd className="mt-1 text-sm leading-relaxed text-ink/80 sm:mt-0">{row.body}</dd>
          </div>
        ))}
      </dl>
      {children && <div className="mt-6 max-w-4xl">{children}</div>}
      <p className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[12px] text-muted-foreground">
        <Link to="/metodo" className="text-plum underline underline-offset-4">
          Fórmulas, filtros e versões no Método
        </Link>
        <Link to="/investigacoes" className="text-plum underline underline-offset-4">
          Ver o índice da investigação
        </Link>
      </p>
    </section>
  );
}