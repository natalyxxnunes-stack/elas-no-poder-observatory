import { Link } from "@tanstack/react-router";
import { BrandLogo } from "./BrandLogo";
import { BrandWordmark } from "./BrandWordmark";
import { SITE } from "@/data/election-2026";
import { CENTRAL_THESIS, COVER_QUESTION, NAV_ITEMS } from "@/data/architecture";

export function SiteFooter() {
  return (
    <footer className="ink-panel mt-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.5fr_1fr] md:px-8">
        <div>
          <div className="flex items-center gap-3">
            <BrandLogo className="h-11 w-11" />
            <BrandWordmark tone="cream" className="font-display text-xl font-semibold" />
          </div>
          <p className="mt-5 max-w-md font-display text-xl leading-snug text-cream/90">
            “{COVER_QUESTION}”
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/60">
            {CENTRAL_THESIS}
          </p>
        </div>

        <div>
          <h2 className="font-mono text-[12px] uppercase tracking-[0.18em] text-solar">
            Navegue
          </h2>
          <ul className="mt-4 space-y-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-sm text-cream/75 underline-offset-4 hover:text-solar hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/15">
        <p className="mx-auto max-w-6xl px-5 py-5 font-mono text-[12px] leading-relaxed text-cream/45 md:px-8">
          Indicadores de candidatura calculados a partir de TSE / Dados Abertos /
          Candidatos 2026. Lacunas e limitações estão declaradas ao longo do site,
          com a data da fotografia usada em cada número.
        </p>
      </div>
    </footer>
  );
}
