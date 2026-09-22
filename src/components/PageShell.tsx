import { Fragment, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

export type BreadcrumbTrail = readonly [
  { label: string; to: string },
  ...{ label: string; to?: string }[],
];

/** Moldura comum das páginas do observatório. */
export function PageShell({ children, home = false, breadcrumb }: { children: ReactNode; home?: boolean; breadcrumb?: BreadcrumbTrail }) {
  return (
    <div className="paper-grain min-h-screen">
      <SiteHeader home={home} />
      <main className="mx-auto max-w-6xl px-5 md:px-8">
        {!home && breadcrumb && (
          <Breadcrumb className="py-3 font-mono text-[10px] uppercase tracking-[0.12em]">
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
      <SiteFooter />
    </div>
  );
}
