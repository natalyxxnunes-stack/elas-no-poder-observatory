import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { BrandWordmark } from "./BrandWordmark";
import { SITE } from "@/data/election-2026";

/**
 * SiteHeader — menu de revista em cinco seções (30/10/2026, avaliação de
 * UX): Dados 2026, Investigações e Histórias abrem um submenu; Achados e
 * Direitos vão direto. Método e Sobre ficam no canto.
 */
type Item = { label: string; to: string; nota?: string };
type Secao = { label: string; to?: string; itens?: Item[] };

const SECOES: Secao[] = [
  {
    label: "Dados 2026",
    itens: [
      { label: "Quem chega", to: "/quem-chega", nota: "As eleitas, casa por casa" },
      { label: "Quem são elas?", to: "/quem-sao-elas", nota: "As candidatas, por cor/raça e cargo" },
      { label: "Partido por partido", to: "/partidos", nota: "Eleitas, fundo e votações por sigla" },
      { label: "Na urna", to: "/votos", nota: "Candidatura, voto e cadeira" },
      { label: "Dinheiro", to: "/dinheiro", nota: "Quem recebe o dinheiro da campanha" },
      { label: "Histórico", to: "/historico", nota: "De 2014 a 2026" },
    ],
  },
  {
    label: "Investigações",
    itens: [
      { label: "O funil", to: "/funil", nota: "Da candidatura ao poder" },
      { label: "Quem controla?", to: "/quem-controla", nota: "As decisões dos partidos" },
      { label: "Barreiras", to: "/barreiras", nota: "Violência política e contra mulheres" },
      { label: "No plenário", to: "/como-votaram", nota: "Como votaram as deputadas" },
      { label: "Todas as investigações", to: "/investigacoes" },
    ],
  },
  {
    label: "Histórias",
    itens: [
      { label: "Reportagens", to: "/reportagens", nota: "Textos assinados" },
      { label: "Na voz delas", to: "/na-voz-delas", nota: "O que disseram, com o dado ao lado" },
      { label: "Pioneiras", to: "/pioneiras", nota: "Quem abriu o caminho" },
    ],
  },
  { label: "Achados", to: "/achados" },
  { label: "Direitos", to: "/direitos" },
];
const CANTO: Item[] = [
  { label: "Método", to: "/metodo" },
  { label: "Sobre", to: "/sobre" },
];

export function SiteHeader({ home = false }: { home?: boolean }) {
  const [open, setOpen] = useState(false);
  const [aberta, setAberta] = useState<string | null>(null);
  const close = () => {
    setOpen(false);
    setAberta(null);
  };

  useEffect(() => {
    if (!aberta) return;
    const fechar = () => setAberta(null);
    document.addEventListener("click", fechar);
    return () => document.removeEventListener("click", fechar);
  }, [aberta]);

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/95 backdrop-blur">
      <div className={`mx-auto grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 md:px-8 ${home ? "max-w-none py-2" : "max-w-none py-1.5"}`}>
        <Link to="/" className="flex shrink-0 items-center gap-3" onClick={close}>
          <BrandLogo className={`${home ? "h-10 w-10" : "h-8 w-8"} shrink-0`} />
          <span className="whitespace-nowrap leading-tight">
            <BrandWordmark className={`block font-display font-semibold text-ink ${home ? "text-lg" : "text-base"}`} />
            <span className="hidden text-[13px] uppercase tracking-[0.12em] text-muted-foreground 2lg:block">
              {SITE.tagline}
            </span>
          </span>
        </Link>

        <div className="ml-auto hidden items-center gap-5 lg:flex">
          <nav aria-label="Principal" className="flex items-center gap-1">
            {SECOES.map((sec) =>
              sec.itens ? (
                <div
                  key={sec.label}
                  className="relative"
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setAberta(null);
                  }}
                >
                  <button
                    type="button"
                    className="inline-flex min-h-11 items-center gap-1 px-3 text-[15px] text-ink hover:text-plum"
                    aria-expanded={aberta === sec.label}
                    onClick={(e) => {
                      e.stopPropagation();
                      setAberta((v) => (v === sec.label ? null : sec.label));
                    }}
                  >
                    {sec.label}
                    <ChevronDown className="size-4" aria-hidden="true" />
                  </button>
                  {aberta === sec.label && (
                    <div className="absolute left-0 top-full z-50 w-80 border border-rule border-t-4 border-t-plum bg-paper p-2 shadow-lg">
                      {sec.itens.map((it) => (
                        <Link
                          key={it.to}
                          to={it.to}
                          onClick={close}
                          className="block px-3 py-2.5 hover:bg-cream"
                        >
                          <span className="block font-display text-lg leading-tight text-ink">{it.label}</span>
                          {it.nota && <span className="block text-[13px] text-muted-foreground">{it.nota}</span>}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={sec.label}
                  to={sec.to!}
                  className="inline-flex min-h-11 items-center px-3 text-[15px] text-ink hover:text-plum"
                  activeProps={{ className: "font-semibold text-plum" }}
                >
                  {sec.label}
                </Link>
              ),
            )}
          </nav>
          <div className="flex items-center gap-4 border-l border-rule pl-4 font-mono text-[13px] uppercase tracking-[0.08em]">
            {CANTO.map((it) => (
              <Link key={it.to} to={it.to} className="text-muted-foreground hover:text-plum">
                {it.label}
              </Link>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="ml-auto inline-flex size-11 items-center justify-center border border-rule text-ink lg:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="menu-movel"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <nav
          id="menu-movel"
          aria-label="Principal (celular)"
          className="absolute inset-x-0 top-full z-50 h-[calc(100dvh-100%)] overflow-y-auto border-t border-rule bg-paper px-5 pb-10 lg:hidden"
        >
          {SECOES.map((sec) =>
            sec.itens ? (
              <details key={sec.label} className="group border-b border-rule">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between font-display text-2xl text-ink">
                  {sec.label}
                  <ChevronDown className="size-5 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <div className="pb-3">
                  {sec.itens.map((it) => (
                    <Link key={it.to} to={it.to} onClick={close} className="block py-2.5 pl-3">
                      <span className="block text-[17px] text-ink">{it.label}</span>
                      {it.nota && <span className="block text-[13px] text-muted-foreground">{it.nota}</span>}
                    </Link>
                  ))}
                </div>
              </details>
            ) : (
              <Link
                key={sec.label}
                to={sec.to!}
                onClick={close}
                className="flex min-h-14 items-center border-b border-rule font-display text-2xl text-ink"
              >
                {sec.label}
              </Link>
            ),
          )}
          <div className="mt-5 flex gap-6 font-mono text-[13px] uppercase tracking-[0.08em]">
            {CANTO.map((it) => (
              <Link key={it.to} to={it.to} onClick={close} className="inline-flex min-h-11 items-center text-plum">
                {it.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
