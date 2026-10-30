import { useState } from "react";
import { useLocation } from "@tanstack/react-router";
import type { Manchete, Visual } from "@/data/manchetes";
import { formatInt, formatPct } from "@/lib/format-br";

/**
 * Manchetes secundárias logo abaixo da abertura de uma página, em cards
 * compactos: número-âncora quando houver, frase, fonte e destino. O card
 * inteiro é clicável. Quando a manchete aponta para a própria página, o
 * destino vira "Mais abaixo nesta página".
 */
export function ManchetesStrip({
  items,
  label = "Também nesta apuração",
}: {
  items: Manchete[];
  label?: string;
}) {
  const { pathname } = useLocation();
  const aqui = (to: string) => (to.split("#")[0] ?? "").replace(/\/$/, "") === pathname.replace(/\/$/, "");
  return (
    <section aria-label={label} className="mb-10">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-plum">{label}</p>
      <ul
        className={`mt-3 grid gap-3 ${items.length === 1 ? "md:max-w-2xl" : items.length === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"}`}
      >
        {items.map((m) => (
          <li
            key={m.id}
            className="group relative flex flex-col border-t-4 border-plum bg-cream p-5 outline-offset-4 outline-plum focus-within:outline-2"
          >
            {m.ancora ? (
              <>
                <p className="poster-figure text-5xl text-plum">{m.ancora.valor}</p>
                <p className="mt-2 font-medium leading-snug text-ink">
                  <a
                    href={m.to}
                    className="after:absolute after:inset-0 focus-visible:outline-none group-hover:underline group-hover:decoration-plum group-hover:underline-offset-4"
                  >
                    {m.ancora.rotulo}
                  </a>
                </p>
                <p className="mt-2 font-display text-lg leading-snug text-ink/90">{m.ancora.tensao}</p>
              </>
            ) : (
              <p className="font-display text-lg leading-snug text-ink">
                <a
                  href={m.to}
                  className="after:absolute after:inset-0 focus-visible:outline-none group-hover:underline group-hover:decoration-plum group-hover:underline-offset-4"
                >
                  {m.texto}.
                </a>
              </p>
            )}
            <div className="mt-auto pt-4" />
            <div className="flex flex-wrap items-center justify-between gap-x-4 border-t border-rule pt-2 text-[13px] text-muted-foreground">
              <span>
                {m.fonteCurta ?? m.fonte}
                {m.parcial && (
                  <span className="ml-2 border border-muted-foreground/50 px-1.5 py-0.5 font-mono text-[13px] uppercase tracking-wider">
                    parcial
                  </span>
                )}
              </span>
              <span aria-hidden="true" className="inline-flex min-h-11 items-center font-medium text-plum">
                {aqui(m.to) ? "Mais abaixo nesta página ↓" : `Ver em ${m.pagina} →`}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Capa da página inicial: as manchetes do site, numeradas, cada uma com o caminho da prova. */
export function CapaManchetes({ items }: { items: Manchete[] }) {
  return (
    <section aria-labelledby="capa-manchetes" className="border-y-2 border-ink py-6">
      <h2
        id="capa-manchetes"
        className="font-mono text-xs uppercase tracking-[0.14em] text-coral-ink"
      >
        O que os dados de 2026 mostram
      </h2>
      <ol className="mt-4 divide-y divide-rule">
        {items.map((m, i) => (
          <li
            key={m.id}
            className="grid gap-2 py-4 sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-5"
          >
            <span className="font-mono text-sm text-plum">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <p className="font-display text-xl leading-snug text-ink md:text-2xl">{m.texto}.</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {m.fonte}
                {m.parcial ? ". Prestação de contas em andamento; o número pode mudar." : "."}
              </p>
            </div>
            <a
              href={m.to}
              className="font-mono text-xs uppercase tracking-wider text-plum underline decoration-plum underline-offset-4 sm:whitespace-nowrap"
            >
              {m.pagina} →
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ------------------------------------------------------------------------
 * Cards da capa (30/10/2026): número-âncora primeiro, frase de tensão,
 * mini-gráfico e fonte curta. O card inteiro é clicável (link esticado).
 * Laranja só marca o dado de agora; nenhum texto vai sobre laranja.
 * ---------------------------------------------------------------------- */

const RACA_COR: Record<string, string> = {
  BRANCA: "bg-[var(--race-branca)]",
  PARDA: "bg-[var(--race-parda)]",
  PRETA: "bg-plum",
  "INDÍGENA": "bg-forest",
  AMARELA: "bg-[var(--race-amarela)]",
};

function MiniVisual({ v, grande }: { v: Visual; grande?: boolean }) {
  if (v.tipo === "barras") {
    const max = v.escala === "contagem" ? Math.max(...v.dados.map((d) => d.valor)) : 100;
    return (
      <div aria-hidden="true" className="relative space-y-2.5">
        {v.dados.map((d) => (
          <div key={d.rotulo} className="grid grid-cols-[6rem_minmax(0,1fr)_3.5rem] items-center gap-3 text-sm">
            <span className="text-ink/75">{d.rotulo}</span>
            <span className="relative block h-3 bg-rule/60">
              <span
                className={`absolute inset-y-0 left-0 ${d.atual ? "bg-coral" : "bg-plum-soft"}`}
                style={{ width: `${(d.valor / max) * 100}%` }}
              />
              {v.piso !== undefined && (
                <span className="absolute -inset-y-1.5 w-0.5 bg-ink" style={{ left: `${v.piso}%` }} />
              )}
            </span>
            <span className="text-right font-mono text-xs tabular-nums text-ink">
              {v.escala === "contagem" ? formatInt(d.valor) : formatPct(d.valor)}
            </span>
          </div>
        ))}
        {v.piso !== undefined && (
          <p className="pl-[6.75rem] text-xs text-muted-foreground">Traço preto: piso de {v.piso}%</p>
        )}
      </div>
    );
  }
  if (v.tipo === "pontos") {
    const cheio = v.atual ? "bg-coral" : "bg-plum";
    return (
      <div aria-hidden="true">
        <div className={`flex flex-wrap ${v.total > 30 ? "gap-1" : "gap-1.5"}`}>
          {Array.from({ length: v.total }, (_, i) => (
            <span
              key={i}
              className={`block rounded-full ${v.total > 30 ? "size-2.5" : grande ? "size-6" : "size-4"} ${i < v.cheios ? cheio : "border border-plum/50"}`}
            />
          ))}
        </div>
        <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink/75">
          <span className="inline-flex items-center gap-1.5">
            <span className={`size-2.5 rounded-full ${cheio}`} />
            {formatInt(v.cheios)} {v.legendaCheios}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded-full border border-plum/50" />
            {formatInt(v.total - v.cheios)} {v.legendaVazios}
          </span>
        </p>
      </div>
    );
  }
  const cells = v.partes.flatMap((p) => Array.from({ length: p.n }, () => p.raca));
  return (
    <div aria-hidden="true">
      {v.titulo && <p className="mb-2 text-sm text-ink/75">{v.titulo}</p>}
      <div
        className={`grid ${v.colunas && v.colunas > 13 ? "gap-[2px]" : "max-w-xs gap-[3px]"}`}
        style={{ gridTemplateColumns: `repeat(${v.colunas ?? 13}, minmax(0, 1fr))` }}
      >
        {cells.map((r, i) => (
          <span key={i} className={`block aspect-square ${RACA_COR[r] ?? "bg-rule"}`} />
        ))}
      </div>
      <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink/75">
        {v.partes.map((p) => (
          <span
            key={p.raca}
            className={`inline-flex items-center gap-1.5 ${p.n === 0 ? "font-semibold text-ink" : ""}`}
          >
            <span className={`size-2.5 ${p.n === 0 ? "border border-ink bg-transparent" : RACA_COR[p.raca]}`} />
            {p.rotulo}: {formatInt(p.n)}
          </span>
        ))}
      </p>
    </div>
  );
}

type Tamanho = "grande" | "medio" | "pequeno";

const GRID: Record<Tamanho, string> = {
  grande: "md:col-span-2 lg:col-span-7 lg:row-span-2",
  medio: "lg:col-span-5",
  pequeno: "lg:col-span-4",
};

const FIGURA: Record<Tamanho, string> = {
  grande: "text-[4.5rem] md:text-[7rem]",
  medio: "text-6xl md:text-7xl",
  pequeno: "text-5xl md:text-6xl",
};

function CardManchete({
  m,
  i,
  tamanho,
  oculto,
}: {
  m: Manchete;
  i: number;
  tamanho: Tamanho;
  /** escondido no celular até a pessoa pedir "ver mais" */
  oculto?: boolean;
}) {
  const a = m.ancora;
  if (!a) return null;
  const grande = tamanho === "grande";
  return (
    <li
      className={`group relative flex flex-col bg-paper ${grande ? "p-6 pt-8 md:p-9 md:pl-11" : "border-t-4 border-plum p-5 md:p-6"} outline-offset-4 outline-plum focus-within:outline-2 ${GRID[tamanho]} ${oculto ? "max-md:hidden" : ""}`}
    >
      {grande && (
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-2 bg-coral md:inset-y-0 md:left-0 md:h-auto md:w-2" />
      )}
      <p className="font-mono text-xs tracking-[0.12em] text-muted-foreground">
        {String(i + 1).padStart(2, "0")}
      </p>
      <p className={`poster-figure mt-2 text-plum ${FIGURA[tamanho]}`}>{a.valor}</p>
      <h3 className={`mt-2 font-sans font-medium leading-snug text-ink ${grande ? "max-w-md text-lg md:text-xl" : "text-base"}`}>
        <a
          href={m.to}
          className="after:absolute after:inset-0 focus-visible:outline-none group-hover:underline group-hover:decoration-plum group-hover:underline-offset-4"
        >
          {a.rotulo}
        </a>
      </h3>
      {a.visual && (
        <div className={grande ? "mt-7 max-w-lg" : "mt-5 hidden md:block"}>
          <MiniVisual v={a.visual} grande={grande} />
        </div>
      )}
      {grande && a.visualExtra && (
        <div className="mt-8 hidden max-w-lg md:block">
          <MiniVisual v={a.visualExtra} grande />
        </div>
      )}
      <p className={`mt-5 font-display leading-snug text-ink ${grande ? "text-xl md:text-2xl" : "text-lg"}`}>
        {a.tensao}
      </p>
      <div className="mt-auto pt-6" />
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-rule pt-3 text-[13px] text-muted-foreground">
        <span>
          {m.fonteCurta ?? m.fonte}
          {m.parcial && (
            <span className="ml-2 border border-muted-foreground/50 px-1.5 py-0.5 font-mono text-[13px] uppercase tracking-wider">
              parcial
            </span>
          )}
        </span>
        <span aria-hidden="true" className="inline-flex min-h-11 items-center font-medium text-plum">
          Ver em {m.pagina}
          <span className="ml-1.5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none">→</span>
        </span>
      </div>
    </li>
  );
}

/** Capa da página inicial em cards: 1 destaque, 2 médios, 3 pequenos. */
export function CapaCards({ items, baseLabel }: { items: Manchete[]; baseLabel: string }) {
  const tamanho = (i: number): Tamanho => (i === 0 ? "grande" : i < 3 ? "medio" : "pequeno");
  const [todos, setTodos] = useState(false);
  const VISIVEIS_CELULAR = 3;
  const restantes = items.length - VISIVEIS_CELULAR;
  return (
    <section aria-labelledby="capa-manchetes" className="relative left-1/2 -ml-[50vw] w-screen bg-cream">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-plum">{baseLabel}</p>
        <h2 id="capa-manchetes" className="mt-3 max-w-3xl font-display text-3xl leading-tight text-ink md:text-5xl">
          O que os dados de 2026 mostram
        </h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          {items.map((m, i) => (
            <CardManchete
              key={m.id}
              m={m}
              i={i}
              tamanho={tamanho(i)}
              oculto={!todos && i >= VISIVEIS_CELULAR}
            />
          ))}
        </ol>
        {!todos && restantes > 0 && (
          <button
            type="button"
            onClick={() => setTodos(true)}
            className="mt-4 flex min-h-12 w-full items-center justify-center border border-plum bg-paper font-medium text-plum md:hidden"
          >
            Ver mais {restantes} números de 2026
          </button>
        )}
        <p className="mt-6 max-w-3xl text-[13px] leading-relaxed text-muted-foreground">
          Cada card leva à página com a conta completa: denominador, fonte e data de cada número.
        </p>
      </div>
    </section>
  );
}
