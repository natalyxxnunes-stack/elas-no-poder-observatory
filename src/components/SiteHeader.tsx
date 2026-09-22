import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "./BrandLogo";
import { BrandWordmark } from "./BrandWordmark";
import { SITE } from "@/data/election-2026";
import { NAV_ITEMS } from "@/data/architecture";

/**
 * SiteHeader — menu plano de 5 itens do lançamento. Sem submenus e sem CTA:
 * os eixos despublicados continuam no projeto, mas fora da navegação.
 */
export function SiteHeader({ home = false }: { home?: boolean }) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/95 backdrop-blur">
      <div className={`mx-auto grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 md:px-8 ${home ? "max-w-none py-2" : "max-w-6xl py-3"}`}>
        <Link to="/" className="flex items-center gap-3" onClick={close}>
          <BrandLogo className="h-10 w-10 shrink-0" />
          <span className="leading-tight">
            <BrandWordmark className="block font-display text-lg font-semibold text-ink" />
            <span className="block text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
              {SITE.tagline}
            </span>
          </span>
        </Link>

        <div className="ml-auto hidden items-center gap-4 lg:flex">
        <nav aria-label="Principal" className="flex items-center gap-5">
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
        {home && (
          <>
            <Button variant="ghost" size="icon" aria-label="Abrir busca de páginas" onClick={() => setSearchOpen((value) => !value)} className="rounded-none text-ink">
              <Search className="size-4" aria-hidden="true" />
            </Button>
            <Button asChild className="h-10 rounded-none bg-plum px-5 font-mono text-[10px] uppercase tracking-[0.08em] text-primary-foreground hover:bg-coral hover:text-ink">
              <Link to="/sobre">Apoie o projeto <ArrowRight className="size-3.5" /></Link>
            </Button>
          </>
        )}
        </div>

        <button
          type="button"
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-none border border-rule text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum lg:hidden"
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

      {home && searchOpen && (
        <div className="border-t border-rule bg-paper px-5 py-4 md:px-8">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2">
            <span className="font-mono text-[10px] uppercase text-muted-foreground">Ir para</span>
            {NAV_ITEMS.map((item) => <Link key={item.to} to={item.to} onClick={() => setSearchOpen(false)} className="text-sm text-ink underline-offset-4 hover:text-plum hover:underline">{item.label}</Link>)}
          </div>
        </div>
      )}

      {open && (
        <nav
          id="menu-movel"
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
