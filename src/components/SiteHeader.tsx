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
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-3" onClick={close}>
          <BrandLogo className="h-10 w-10 shrink-0" />
          <span className="leading-tight">
            <BrandWordmark className="block font-display text-lg font-semibold text-ink" />
            <span className="block text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
              {SITE.tagline}
            </span>
          </span>
        </Link>

        <nav aria-label="Principal" className="ml-auto hidden items-center gap-6 lg:flex">
          {NAV_ITEMS.map((item) => (
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
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={close}
              className="block border-b border-rule py-3 font-display text-base text-ink"
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
