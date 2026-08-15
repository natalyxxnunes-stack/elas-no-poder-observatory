import { useId, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GLOSSARY, type GlossaryKey } from "@/data/glossary";

/**
 * Termo com definição inline, acessível por clique, toque e teclado.
 *
 * O termo continua fazendo parte da frase: recebe apenas um sublinhado
 * pontilhado. A definição abre num popover (Radix) que fecha com Esc,
 * clique fora ou toque fora — sem depender de hover.
 *
 * Uso: aplicar na PRIMEIRA ocorrência relevante do termo em cada página.
 */
export function GlossaryTerm({
  term,
  children,
  method = true,
}: {
  term: GlossaryKey;
  children: React.ReactNode;
  /** Exibe o link para o Método na definição. */
  method?: boolean;
}) {
  const entry = GLOSSARY[term];
  const [open, setOpen] = useState(false);
  const id = useId();
  const contentId = `glossario-${term}-${id}`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={open ? contentId : undefined}
          aria-label={`${
            typeof children === "string" ? children : entry.title
          } — ver definição`}
          className="cursor-help rounded-sm border-b border-dashed border-plum/70 bg-transparent p-0 font-[inherit] text-[inherit] leading-[inherit] text-inherit underline-offset-4 transition-colors hover:border-solid hover:text-plum focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum"
        >
          {children}
        </button>
      </PopoverTrigger>
      <PopoverContent
        id={contentId}
        role="dialog"
        aria-label={entry.title}
        align="start"
        sideOffset={8}
        collisionPadding={12}
        className="w-[min(20rem,calc(100vw-2rem))] rounded-md border-2 border-ink bg-paper p-4 text-left shadow-[5px_5px_0_0_var(--color-plum)]"
      >
        <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-plum">
          {entry.title}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink">{entry.body}</p>
        {entry.example && (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {entry.example}
          </p>
        )}
        {method && (
          <Link
            to="/metodo"
            className="mt-3 inline-block font-mono text-[12px] text-plum underline underline-offset-4"
            onClick={() => setOpen(false)}
          >
            ver o método →
          </Link>
        )}
      </PopoverContent>
    </Popover>
  );
}
