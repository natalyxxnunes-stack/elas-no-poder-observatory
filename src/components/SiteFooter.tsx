import { Link } from "@tanstack/react-router";
import { BrandLogo } from "./BrandLogo";
import { SECTIONS, SITE, THESIS } from "@/data/election-2026";

export function SiteFooter() {
  return (
    <footer className="ink-panel mt-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr] md:px-8">
        <div>
          <div className="flex items-center gap-3">
            <BrandLogo className="h-11 w-11" />
            <span className="font-display text-xl font-semibold">{SITE.name}</span>
          </div>
          <p className="mt-5 max-w-md font-display text-xl leading-snug text-cream/90">
            “{THESIS}”
          </p>
          <p className="mt-4 max-w-md text-sm text-cream/60">
            Observatório editorial sobre {SITE.tagline.toLowerCase()} no ciclo de{" "}
            {SITE.cycle}. Dados de candidatura do TSE; etapas de votos, eleitas e
            poder permanecem abertas até a apuração.
          </p>
        </div>
        <div>
          <h2 className="kicker">Seções</h2>
          <ul className="mt-4 space-y-2">
            {SECTIONS.map((s) => (
              <li key={s.to}>
                <Link
                  to={s.to}
                  className="text-sm text-cream/75 underline-offset-4 hover:text-solar hover:underline"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/15">
        <p className="mx-auto max-w-6xl px-5 py-5 font-mono text-[11px] text-cream/45 md:px-8">
          Reconstrução do projeto a partir dos artefatos recuperados. Lacunas de
          fonte estão marcadas explicitamente ao longo do site.
        </p>
      </div>
    </footer>
  );
}
