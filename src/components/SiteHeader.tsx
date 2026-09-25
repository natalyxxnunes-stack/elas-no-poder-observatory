import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "./BrandLogo";
import { BrandWordmark } from "./BrandWordmark";
import { SITE } from "@/data/election-2026";
import { DATA_2026_NAV_ITEMS, NAV_ITEMS, UTILITY_NAV_ITEMS } from "@/data/architecture";

/**
 * SiteHeader — cinco entradas principais, submenu de Dados 2026 e utilitários.
 * Os eixos despublicados continuam fora da navegação principal.
 */
export function SiteHeader({ home = false }: { home?: boolean }) {
  const [open, setOpen] = useState(false);
  const [dataOpen, setDataOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/95 backdrop-blur">
      <div className={`mx-auto grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 md:px-8 ${home ? "max-w-none py-2" : "max-w-none py-1.5"}`}>
        <Link to="/" className="flex items-center gap-3" onClick={close}>
          <BrandLogo className={`${home ? "h-10 w-10" : "h-8 w-8"} shrink-0`} />
          <span className="leading-tight">
            <BrandWordmark className={`block font-display font-semibold text-ink ${home ? "text-lg" : "text-base"}`} />
            <span className={`${home ? "block" : "hidden xl:block"} text-[12px] uppercase tracking-[0.16em] text-muted-foreground`}>
              {SITE.tagline}
            </span>
          </span>
        </Link>

        <div className="ml-auto hidden items-center gap-3 lg:flex">
        <nav aria-label="Principal" className={`flex items-center ${home ? "gap-5" : "gap-3 xl:gap-4"}`}>
          {NAV_ITEMS.map((item) => item.to === "/" ? (
            <div key={item.to} className="relative" onKeyDown={(event) => { if (event.key === "Escape") { setDataOpen(false); (event.currentTarget.querySelector("button") as HTMLButtonElement | null)?.focus(); } }}>
              <Button
                variant="ghost"
                className={`h-auto rounded-none border-b-2 border-transparent px-0 pb-0.5 text-muted-foreground hover:bg-transparent hover:text-plum ${home ? "text-sm" : "text-xs xl:text-xs"}`}
                aria-expanded={dataOpen}
                aria-controls="submenu-dados"
                onClick={() => setDataOpen((value) => !value)}
              >
                {item.label}<ChevronDown className="size-3" aria-hidden="true" />
              </Button>
              {dataOpen && (
                <div id="submenu-dados" className="absolute left-0 top-full z-50 w-52 border border-rule bg-paper p-2 shadow-lg">
                  {DATA_2026_NAV_ITEMS.map((subitem) => {
                    const hashProps = subitem.hash ? { hash: subitem.hash } : {};
                    return <Link key={subitem.label} to={subitem.to} {...hashProps} onClick={() => setDataOpen(false)} className="block px-3 py-2 text-xs text-ink hover:bg-cream hover:text-plum">{subitem.label}</Link>;
                  })}
                </div>
              )}
            </div>
          ) : (
            <Link
              key={item.to}
              to={item.to}
              className={`border-b-2 border-transparent pb-0.5 text-muted-foreground transition-colors hover:text-plum ${home ? "text-sm" : "text-xs xl:text-xs"}`}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "border-coral font-semibold text-ink" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
          <div className="flex items-center gap-3 border-l border-rule pl-3 font-mono text-xs uppercase">
            {UTILITY_NAV_ITEMS.map((item) => <Link key={item.to} to={item.to} className="text-muted-foreground hover:text-plum">{item.label}</Link>)}
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
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
        </Button>
      </div>

      {open && (
        <nav
          id="menu-movel"
          aria-label="Principal (móvel)"
          className="max-h-[75vh] overflow-y-auto border-t border-rule bg-paper px-5 pb-6 lg:hidden"
        >
          <div className="border-b border-rule py-3">
            <p className="font-display text-base text-ink">Dados 2026</p>
            <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 pl-3">
              {DATA_2026_NAV_ITEMS.map((item) => {
                const hashProps = item.hash ? { hash: item.hash } : {};
                return <Link key={item.label} to={item.to} {...hashProps} onClick={close} className="text-sm text-muted-foreground hover:text-plum">{item.label}</Link>;
              })}
            </div>
          </div>
          {NAV_ITEMS.filter((item) => item.to !== "/").map((item) => (
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
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs uppercase">
            {UTILITY_NAV_ITEMS.map((item) => <Link key={item.to} to={item.to} onClick={close} className="text-plum">{item.label}</Link>)}
          </div>
        </nav>
      )}
    </header>
  );
}
