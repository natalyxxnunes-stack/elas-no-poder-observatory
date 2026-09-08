import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BrandLogo } from "./BrandLogo";
import { BrandWordmark } from "./BrandWordmark";
import { SITE } from "@/data/election-2026";
import { CENTRAL_THESIS, COVER_QUESTION, NAV_ITEMS } from "@/data/architecture";
import { getSnapshotStamp } from "@/lib/tse/snapshot.functions";

function br(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("pt-BR", { timeZone: "UTC" });
}


export function SiteFooter() {
  const { data: stamp } = useQuery({
    queryKey: ["tse-snapshot-stamp"],
    queryFn: () => getSnapshotStamp(),
    staleTime: 5 * 60 * 1000,
  });

  const generated = br(stamp?.baseGeneratedAt);
  const collected = br(stamp?.collectedAt);

  return (
    <footer className="ink-panel mt-24 border-t-8 border-solar">

      <div className="mx-auto grid max-w-[82rem] gap-12 px-5 py-16 md:grid-cols-[1.6fr_1fr] md:px-8 lg:px-12 lg:py-20">
        <div>
          <div className="flex items-center gap-3">
            <BrandLogo className="h-11 w-11" />
            <BrandWordmark tone="cream" className="font-display text-xl font-semibold" />
          </div>
          <p className="mt-8 max-w-2xl font-display text-3xl leading-tight text-cream md:text-5xl">
            “{COVER_QUESTION}”
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/75">
            {CENTRAL_THESIS}
          </p>
        </div>

        <div>
          <h2 className="font-mono text-[12px] uppercase tracking-[0.18em] text-solar">
            Navegue
          </h2>
          <ul className="mt-4 border-t border-cream/20">
            {NAV_ITEMS.map((item, index) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="flex justify-between border-b border-cream/20 py-3 text-sm text-cream/75 hover:text-solar"
                >
                  <span>{item.label}</span><span className="font-mono text-[10px]">0{index + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/15">
        <div className="mx-auto max-w-[82rem] px-5 py-6 font-mono text-[11px] leading-relaxed text-cream/70 md:px-8 lg:px-12">
          {generated && (
            <p className="text-cream/75">
              Última fotografia publicada: base gerada pelo TSE em {generated}
              {collected ? ` · coletada pelo observatório em ${collected}` : ""}.
            </p>
          )}
          <p className={generated ? "mt-1" : undefined}>
            Indicadores de candidatura calculados a partir de TSE / Dados Abertos
            / Candidatos 2026. A data da base usada aparece junto de cada número.
          </p>
        </div>
      </div>

    </footer>
  );
}
