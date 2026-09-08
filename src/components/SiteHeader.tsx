import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { BrandWordmark } from "./BrandWordmark";
import { SITE } from "@/data/election-2026";
import { NAV_ITEMS } from "@/data/architecture";

/**
 * SiteHeader — menu plano de 5 itens do lançamento. Sem submenus e sem CTA:
 * os eixos despublicados continuam no projeto, mas fora da navegação.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="site-header sticky top-0 z-40 border-b border-ink bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-[82rem] items-center gap-4 px-5 py-3 md:px-8 lg:px-12">
        <Link to="/" className="group flex items-center gap-3" onClick={close}>
          <BrandLogo className="h-10 w-10 shrink-0" />
          <span className="leading-tight">
            <BrandWordmark className="block font-display text-lg font-semibold text-ink" />
            <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              {SITE.tagline}
            </span>
          </span>
        </Link>

        <nav aria-label="Principal" className="ml-auto hidden items-stretch border-x border-rule lg:flex">
          {NAV_ITEMS.map((item, index) => (
            <Link
              key={item.to}
              to={item.to}
              className="group relative flex min-h-14 items-center border-r border-rule px-4 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-ink"
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "bg-secondary font-semibold text-ink" }}
            >
              <span className="mr-2 font-mono text-[9px] text-coral-ink">0{index + 1}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="ml-auto inline-flex h-11 w-11 items-center justify-center border border-ink bg-paper text-ink transition-colors hover:bg-solar focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum lg:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="menu-movel"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {open && (
        <nav
          id="menu-movel"
          aria-label="Principal (móvel)"
          className="max-h-[75vh] overflow-y-auto border-t border-ink bg-paper px-5 pb-6 lg:hidden"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={close}
              className="block border-b border-rule py-4 font-display text-xl text-ink"
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-plum" }}
            >
              {item.label}
              <span className="block text-xs text-muted-foreground">
                {item.question}
              </span>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
