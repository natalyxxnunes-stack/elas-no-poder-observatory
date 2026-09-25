import { useEffect, useState } from "react";

type Entry = { id: string; label: string };

/**
 * "Nesta página": índice flutuante das seções (section[id] com h2) das páginas longas.
 * Aparece depois da abertura e marca a seção em leitura.
 */
export function PageIndex() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
    const found = sections.flatMap((section) => {
      const heading = section.querySelector("h2");
      const label = heading?.textContent?.trim();
      return label ? [{ id: section.id, label }] : [];
    });
    setEntries(found);
    if (found.length < 4) return;

    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
      let active: string | null = null;
      for (const entry of found) {
        const element = document.getElementById(entry.id);
        if (element && element.getBoundingClientRect().top < window.innerHeight * 0.35) active = entry.id;
      }
      setCurrent(active);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (entries.length < 4) return null;
  const currentIndex = entries.findIndex((entry) => entry.id === current);

  return (
    <nav
      aria-label="Nesta página"
      className={`fixed bottom-4 right-4 z-40 flex max-w-[calc(100vw-2rem)] flex-col items-end transition-opacity md:bottom-6 md:right-6 ${visible || open ? "opacity-100" : "pointer-events-none opacity-0"}`}
    >
      {open && (
        <ol className="mb-2 max-h-[65vh] w-80 max-w-full overflow-y-auto border border-rule bg-paper py-2 text-sm">
          {entries.map((entry, index) => (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                onClick={() => setOpen(false)}
                aria-current={entry.id === current ? "location" : undefined}
                className={`grid grid-cols-[2rem_minmax(0,1fr)] gap-2 px-4 py-2 leading-snug hover:bg-lilac ${entry.id === current ? "bg-lilac font-semibold text-plum" : "text-ink"}`}
              >
                <span className="font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                <span>{entry.label}</span>
              </a>
            </li>
          ))}
        </ol>
      )}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="inline-flex min-h-11 items-center gap-3 bg-plum px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] text-cream"
      >
        Nesta página
        <span className="text-cream/85">{currentIndex >= 0 ? `${currentIndex + 1}/${entries.length}` : `${entries.length} partes`}</span>
      </button>
    </nav>
  );
}
