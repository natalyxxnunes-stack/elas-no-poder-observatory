import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

/** Moldura comum das páginas do observatório. */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="paper-grain min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 md:px-8">{children}</main>
      <SiteFooter />
    </div>
  );
}
