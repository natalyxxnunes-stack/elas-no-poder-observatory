import { TEMAS, type TemaSlug } from "@/data/temas";

/**
 * Leitura do tema (13/11/2026): no topo das páginas de consulta, o caminho
 * para a leitura do assunto (tese, provas, quem decide). A página de dados
 * fica como ferramenta; o tema é a porta de entrada.
 */
export function LeituraDoTema({ slug }: { slug: TemaSlug }) {
  const t = TEMAS.find((x) => x.slug === slug);
  if (!t) return null;
  return (
    <a
      href={`/temas/${t.slug}`}
      className="group mt-6 flex flex-wrap items-baseline justify-between gap-3 border-l-4 border-coral bg-paper px-5 py-4 hover:bg-cream"
    >
      <span className="max-w-[62ch]">
        <span className="block text-[13px] font-semibold text-coral-ink">
          Página de consulta · a leitura está no tema {t.ordem}
        </span>
        <span className="mt-1 block font-display text-xl leading-snug text-ink group-hover:underline group-hover:underline-offset-4">
          {t.nome}: {t.pergunta}
        </span>
        <span className="mt-1 block text-[15px] leading-snug text-ink/75">{t.tese}</span>
      </span>
      <span aria-hidden="true" className="font-display text-2xl text-plum">
        →
      </span>
    </a>
  );
}
