import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { BrandWordmark } from "./BrandWordmark";
import { SITE } from "@/data/election-2026";

import { TEMAS } from "@/data/temas";

/**
 * SiteHeader — menu de revista (12/11/2026): os seis temas, as reportagens,
 * a ficha de cada eleita, os dados para consulta e o método. Busca e Sobre
 * ficam no canto. O rodapé usa a mesma estrutura (MENU, exportado aqui).
 */
type Item = { label: string; to: string; nota?: string };
type Secao = { label: string; to?: string; itens?: Item[] };

export const MENU: Secao[] = [
  {
    label: "Temas",
    itens: [
      ...TEMAS.map((t) => ({
        label: `${t.ordem} · ${t.nome}`,
        to: `/temas/${t.slug}`,
        nota: t.pergunta,
      })),
      { label: "Todos os temas", to: "/temas" },
    ],
  },
  {
    label: "Reportagens",
    itens: [
      { label: "Reportagens", to: "/reportagens", nota: "Textos assinados" },
      {
        label: "A agenda antigênero no poder",
        to: "/colecoes/antigenero-no-poder",
        nota: "Coleção: votos, mandatos e falas",
      },
      { label: "Pioneiras", to: "/pioneiras", nota: "Perfis de quem abriu o caminho" },
      { label: "Relatório 2026", to: "/relatorio-2026", nota: "O ano em dados, numa página" },
      { label: "Investigações", to: "/investigacoes", nota: "O que está em apuração" },
    ],
  },
  { label: "Quem entrou", to: "/eleitas" },
  {
    label: "Dados",
    itens: [
      { label: "Todos os dados", to: "/dados", nota: "As ferramentas de consulta, por tema" },
      { label: "Achados", to: "/achados", nota: "Um dado por vez, com endereço próprio" },
      {
        label: "Consultar candidatas",
        to: "/quem-sao-elas",
        nota: "Por cor/raça, cargo, partido e estado",
      },
      {
        label: "Consultar o dinheiro",
        to: "/dinheiro",
        nota: "Receita, fundo eleitoral e gasto, por cor/raça e partido",
      },
      { label: "Comparador", to: "/comparar", nota: "Partidos ou estados, lado a lado" },
      { label: "A série desde 2014", to: "/historico", nota: "Histórico por cargo e estado" },
      { label: "Calendário", to: "/calendario", nota: "Da urna à posse" },
      { label: "Baixar os dados", to: "/downloads", nota: "Planilhas e arquivos conferidos" },
    ],
  },
  { label: "Método", to: "/metodo" },
];
const SECOES = MENU;
const CANTO: Item[] = [
  { label: "Buscar", to: "/busca" },
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
      <div
        className={`mx-auto grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 md:px-8 ${home ? "max-w-7xl py-3" : "max-w-7xl py-2.5"}`}
      >
        <Link to="/" className="flex shrink-0 items-center gap-3" onClick={close}>
          <BrandLogo className={`${home ? "h-12 w-12" : "h-11 w-11"} shrink-0`} />
          <span className="whitespace-nowrap leading-tight">
            <BrandWordmark
              className={`block font-display font-semibold text-ink ${home ? "text-[1.4rem]" : "text-xl"}`}
            />
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
                    className="inline-flex min-h-11 items-center gap-1 px-2.5 text-[15px] font-medium text-ink xl:px-3 xl:text-base hover:text-plum"
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
                          <span className="block font-display text-lg leading-tight text-ink">
                            {it.label}
                          </span>
                          {it.nota && (
                            <span className="block text-[13px] text-muted-foreground">
                              {it.nota}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={sec.label}
                  to={sec.to!}
                  className="inline-flex min-h-11 items-center px-2.5 text-[15px] font-medium text-ink xl:px-3 xl:text-base hover:text-plum"
                  activeProps={{ className: "font-semibold text-plum" }}
                >
                  {sec.label}
                </Link>
              ),
            )}
          </nav>
          <div className="flex items-center gap-4 border-l border-rule pl-4 text-sm font-semibold">
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
          {open ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
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
                  <ChevronDown
                    className="size-5 transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <div className="pb-3">
                  {sec.itens.map((it) => (
                    <Link key={it.to} to={it.to} onClick={close} className="block py-2.5 pl-3">
                      <span className="block text-[17px] text-ink">{it.label}</span>
                      {it.nota && (
                        <span className="block text-[13px] text-muted-foreground">{it.nota}</span>
                      )}
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
          <div className="mt-5 flex gap-6 text-[13px] font-semibold">
            {CANTO.map((it) => (
              <Link
                key={it.to}
                to={it.to}
                onClick={close}
                className="inline-flex min-h-11 items-center text-plum"
              >
                {it.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
