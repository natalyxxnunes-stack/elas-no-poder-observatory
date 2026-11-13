import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BrandLogo } from "./BrandLogo";
import { BrandWordmark } from "./BrandWordmark";
import { SITE } from "@/data/election-2026";
import { CENTRAL_THESIS, COVER_QUESTION } from "@/data/architecture";
import { MENU } from "./SiteHeader";
import { getSnapshotStamp } from "@/lib/tse/snapshot.functions";

function br(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

export function SiteFooter({ flush = false }: { flush?: boolean }) {
  const { data: stamp } = useQuery({
    queryKey: ["tse-snapshot-stamp"],
    queryFn: () => getSnapshotStamp(),
    staleTime: 5 * 60 * 1000,
  });

  const generated = br(stamp?.baseGeneratedAt);
  const collected = br(stamp?.collectedAt);

  return (
    <footer className={`ink-panel ${flush ? "border-t border-cream/15" : "mt-24"}`}>
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.2fr_2fr] md:px-8">
        <div>
          <div className="flex items-center gap-3">
            <BrandLogo className="h-11 w-11" />
            <BrandWordmark tone="cream" className="font-display text-xl font-semibold" />
          </div>
          <p className="mt-5 max-w-md font-display text-xl leading-snug text-cream/90">
            {COVER_QUESTION}
          </p>
          <p className="mt-4 hidden max-w-md text-sm leading-relaxed text-cream/75 sm:block">
            {CENTRAL_THESIS}
          </p>
        </div>

        <nav aria-label="Rodapé" className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-wrap gap-x-6 gap-y-3 sm:hidden">
            {[
              { label: "Temas", to: "/temas" },
              { label: "Reportagens", to: "/reportagens" },
              { label: "Achados", to: "/achados" },
              { label: "Baixar os dados", to: "/downloads" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="font-display text-lg text-cream underline-offset-4 hover:underline"
              >
                {item.label}
              </Link>
            ))}
          </div>
          {MENU.filter((sec) => sec.itens).map((sec) => (
            <div key={sec.label} className="hidden sm:block">
              <h2 className="font-display text-lg italic text-cream">{sec.label}</h2>
              <ul className="mt-4 space-y-2">
                {sec.itens!.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-sm text-cream/75 underline-offset-4 hover:text-cream hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="flex flex-col gap-2 sm:col-span-2 md:col-span-3 md:flex-row md:gap-8">
            {[
              { label: "Quem entrou", to: "/eleitas" },
              { label: "Método", to: "/metodo" },
              { label: "Buscar", to: "/busca" },
              { label: "Sobre", to: "/sobre" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="font-display text-lg text-cream underline-offset-4 hover:underline"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
      <div className="border-t border-cream/15">
        <div className="mx-auto max-w-7xl px-5 py-5 text-sm leading-relaxed text-cream/70 md:px-8">
          {generated && (
            <p className="text-cream/75">
              Última fotografia publicada: base gerada pelo TSE em {generated}
              {collected ? ` · coletada pelo observatório em ${collected}` : ""}.
            </p>
          )}
          <p className={generated ? "mt-1" : undefined}>
            Indicadores de candidatura calculados a partir de TSE / Dados Abertos / Candidatos 2026.
            A data da base usada aparece junto de cada número.
          </p>
        </div>
      </div>
    </footer>
  );
}
