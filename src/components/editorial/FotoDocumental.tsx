import { FOTOS, LICENCA_ROTULO } from "@/data/fotos";

/**
 * Foto documental com crédito e licença sempre visíveis. Sem foto registrada
 * para o `id`, mostra o `fallback` (a peça gráfica da página) ou nada.
 */
export function FotoDocumental({ id, fallback = null }: { id: string; fallback?: React.ReactNode }) {
  const f = FOTOS[id];
  if (!f) return <>{fallback}</>;
  return (
    <figure>
      <img src={f.src} alt={f.alt} loading="lazy" className="block w-full object-cover" style={{ aspectRatio: f.proporcao }} />
      <figcaption className="mt-2 text-[13px] leading-snug text-muted-foreground">
        Foto: {f.credito} · {f.acervo}
        {f.data ? ` · ${f.data}` : ""} ·{" "}
        {f.licencaUrl ? (
          <a href={f.licencaUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2">
            {LICENCA_ROTULO[f.licenca]}
          </a>
        ) : (
          LICENCA_ROTULO[f.licenca]
        )}
      </figcaption>
    </figure>
  );
}
