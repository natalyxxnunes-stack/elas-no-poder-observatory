import { Link } from "@tanstack/react-router";
import { BrandLogo } from "./BrandLogo";
import { SITE } from "@/data/election-2026";
import {
  CENTRAL_THESIS,
  COVER_QUESTION,
  NAV_CTA,
  NAV_DIRECT,
  NAV_GROUPS,
} from "@/data/architecture";

export function SiteFooter() {
  return (
    <footer className="ink-panel mt-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.3fr_1fr_1fr] md:px-8">
        <div>
          <div className="flex items-center gap-3">
            <BrandLogo className="h-11 w-11" />
            <span className="font-display text-xl font-semibold">{SITE.name}</span>
          </div>
          <p className="mt-5 max-w-md font-display text-xl leading-snug text-cream/90">
            “{COVER_QUESTION}”
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/60">
            {CENTRAL_THESIS}
          </p>
          <Link
            to={NAV_CTA.to}
            className="mt-6 inline-flex rounded-md border border-cream/30 px-4 py-2 text-sm font-semibold text-cream transition-colors hover:border-solar hover:text-solar"
          >
            {NAV_CTA.label}
          </Link>
        </div>

        {NAV_GROUPS.map((g) => (
          <div key={g.label}>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-solar">
              {g.label}
            </h2>
            <ul className="mt-4 space-y-2">
              {g.items.map((item) => (
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
            {g.label === "Entenda" && (
              <ul className="mt-6 space-y-2">
                {NAV_DIRECT.map((item) => (
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
            )}
          </div>
        ))}
      </div>
      <div className="border-t border-cream/15">
        <p className="mx-auto max-w-6xl px-5 py-5 font-mono text-[11px] leading-relaxed text-cream/45 md:px-8">
          Indicadores de candidatura calculados a partir de TSE / Dados Abertos /
          Candidatos 2026. Dado não disponível não é zero. Correlação não é
          causalidade. Lacunas e limitações estão declaradas ao longo do site.
        </p>
      </div>
    </footer>
  );
}
