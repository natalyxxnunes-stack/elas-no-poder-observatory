import { Fragment, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { PageIndex } from "./editorial/PageIndex";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

export type BreadcrumbTrail = readonly [
  { label: string; to?: string },
  ...{ label: string; to?: string }[],
];

/** Moldura comum das páginas do observatório. */
export function PageShell({ children, home = false, breadcrumb }: { children: ReactNode; home?: boolean; breadcrumb?: BreadcrumbTrail }) {
  return (
    <div className="min-h-screen bg-background">
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-plum focus:px-4 focus:py-2 focus:text-cream">Pular para o conteúdo</a>
      <SiteHeader home={home} />
      <main id="conteudo" className="mx-auto max-w-6xl px-5 md:px-8">
        {!home && breadcrumb && (
          <Breadcrumb className="py-3 font-mono text-xs uppercase tracking-[0.12em]">
            <BreadcrumbList>
              {breadcrumb.map((item, index) => (
                <Fragment key={`${item.label}-${index}`}>
                  {index > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    {index === breadcrumb.length - 1 || !item.to ? (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild><Link to={item.to}>{item.label}</Link></BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        )}
        {children}
      </main>
      {!home && <PageIndex />}
      <SiteFooter flush={home} />
    </div>
  );
}
