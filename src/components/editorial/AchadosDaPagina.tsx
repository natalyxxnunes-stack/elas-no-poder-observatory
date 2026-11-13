import { Link } from "@tanstack/react-router";
import { ACHADOS, type TemaAchado } from "@/data/achados";
import { Secao } from "@/components/editorial/Secao";

/**
 * Achados da página (12/11/2026): no topo das páginas longas, os achados que
 * a página sustenta, em versão curta (número, frase, link). A ficha completa
 * de cada um fica em /achados/{id}; a página vira a fonte de consulta.
 */
export function AchadosDaPagina({
  temas,
  ids,
  max = 4,
}: {
  temas?: TemaAchado[];
  ids?: string[];
  max?: number;
}) {
  const lista = (
    ids
      ? ids.map((id) => ACHADOS.find((a) => a.id === id))
      : [...ACHADOS].reverse().filter((a) => a.tema && temas?.includes(a.tema))
  )
    .filter((a): a is NonNullable<typeof a> => Boolean(a))
    .slice(0, max);
  if (!lista.length) return null;
  return (
    <section className="py-8">
      <Secao nome="O que esta página mostra" tipo={`${lista.length} achados`} />
      <ol className="mt-5 grid gap-px bg-rule md:grid-cols-2">
        {lista.map((a) => (
          <li key={a.id} className="bg-paper">
            <Link
              to="/achados/$id"
              params={{ id: a.id }}
              className="group grid h-full grid-cols-[auto_1fr] items-baseline gap-x-5 p-5 hover:bg-cream"
            >
              <span className="poster-figure text-4xl text-plum md:text-5xl">
                {a.ancora?.valor ?? a.numero}
              </span>
              <span>
                <span className="block font-display text-lg leading-snug text-ink group-hover:underline group-hover:underline-offset-4">
                  {a.titulo}
                </span>
                {a.ancora ? (
                  <span className="mt-1 block text-[14px] leading-snug text-ink/70">
                    {a.ancora.rotulo}
                  </span>
                ) : null}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
