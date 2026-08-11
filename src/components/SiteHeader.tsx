import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { SECTIONS, SITE } from "@/data/election-2026";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
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

        <nav className="ml-auto hidden items-center gap-6 md:flex">
          {SECTIONS.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="border-b-2 border-transparent pb-0.5 text-sm text-muted-foreground transition-colors hover:text-plum"
              activeOptions={{ exact: s.to === "/" }}
              activeProps={{
                className: "border-solar font-semibold text-ink",
              }}
            >
              {s.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-md border border-rule text-ink md:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-rule bg-paper px-5 pb-4 md:hidden">
          {SECTIONS.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              onClick={() => setOpen(false)}
              className="block border-b border-rule py-3 text-sm text-ink last:border-0"
              activeOptions={{ exact: s.to === "/" }}
              activeProps={{ className: "font-semibold text-plum" }}
            >
              {s.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
