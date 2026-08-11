import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { SITE } from "@/data/election-2026";
import { NAV_CTA, NAV_DIRECT, NAV_GROUPS } from "@/data/architecture";

/**
 * SiteHeader — navegação agrupada. O menu principal nunca lista os 14 eixos:
 * "Investigue" e "Entenda" agrupam os eixos, "Dados 2026" e "Sobre" são
 * diretos e "Downloads" é CTA permanente.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [group, setGroup] = useState<string | null>(null);

  const close = () => {
    setOpen(false);
    setGroup(null);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-3" onClick={close}>
          <BrandLogo className="h-10 w-10 shrink-0" />
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold text-ink">
              {SITE.name}
            </span>
            <span className="block text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              {SITE.tagline}
            </span>
          </span>
        </Link>

        <nav aria-label="Principal" className="ml-auto hidden items-center gap-5 lg:flex">
          {NAV_DIRECT.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="border-b-2 border-transparent pb-0.5 text-sm text-muted-foreground transition-colors hover:text-plum"
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "border-solar font-semibold text-ink" }}
            >
              {item.label}
            </Link>
          ))}

          {NAV_GROUPS.map((g) => (
            <div
              key={g.label}
              className="relative"
              onMouseEnter={() => setGroup(g.label)}
              onMouseLeave={() => setGroup(null)}
            >
              <button
                type="button"
                aria-expanded={group === g.label}
                onClick={() => setGroup(group === g.label ? null : g.label)}
                className="inline-flex items-center gap-1 border-b-2 border-transparent pb-0.5 text-sm text-muted-foreground transition-colors hover:text-plum"
              >
                {g.label}
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {group === g.label && (
                <div className="absolute right-0 top-full z-50 w-80 pt-3">
                  <ul className="editorial-card divide-y divide-rule overflow-hidden">
                    {g.items.map((item) => (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          onClick={close}
                          className="block px-4 py-3 transition-colors hover:bg-secondary"
                          activeProps={{ className: "bg-secondary" }}
                        >
                          <span className="block font-display text-base text-ink">
                            {item.label}
                          </span>
                          <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                            {item.question}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          <Link
            to={NAV_CTA.to}
            className="rounded-md bg-plum px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-plum-soft"
          >
            {NAV_CTA.label}
          </Link>
        </nav>

        <button
          type="button"
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-md border border-rule text-ink lg:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav
          aria-label="Principal (móvel)"
          className="max-h-[75vh] overflow-y-auto border-t border-rule bg-paper px-5 pb-6 lg:hidden"
        >
          {NAV_DIRECT.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={close}
              className="block border-b border-rule py-3 font-display text-base text-ink"
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-plum" }}
            >
              {item.label}
            </Link>
          ))}
          {NAV_GROUPS.map((g) => (
            <div key={g.label} className="border-b border-rule py-3">
              <p className="kicker">{g.label}</p>
              <ul className="mt-2 space-y-2">
                {g.items.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={close}
                      className="block py-1 text-sm text-ink"
                      activeProps={{ className: "font-semibold text-plum" }}
                    >
                      {item.label}
                      <span className="block text-xs text-muted-foreground">
                        {item.question}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <Link
            to={NAV_CTA.to}
            onClick={close}
            className="mt-4 inline-flex rounded-md bg-plum px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            {NAV_CTA.label}
          </Link>
        </nav>
      )}
    </header>
  );
}
