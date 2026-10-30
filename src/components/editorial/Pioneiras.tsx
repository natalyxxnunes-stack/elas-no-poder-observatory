import { Link } from "@tanstack/react-router";
import {
  ANCORAS_PIONEIRAS,
  PERFIS_PIONEIRAS,
  type AncoraPerfil,
  type PerfilPioneira,
} from "@/data/perfis-pioneiras";
import { formatInt } from "@/lib/format-br";

/**
 * Peças visuais da série Pioneiras (30/10/2026, a partir da avaliação de
 * design e UX). Dado histórico em roxo: laranja fica reservado ao dado de
 * 2026, e aqui aparece só como campo de cor sem texto.
 */

/** Régua: a votação dela contra os cortes da disputa, em votos absolutos. */
export function Regua({ a, alta }: { a: AncoraPerfil; alta?: boolean }) {
  const max = Math.max(a.valor, ...a.cortes.map((c) => c.valor)) * 1.04;
  const pos = (v: number) => `${(v / max) * 100}%`;
  return (
    <div aria-hidden="true">
      <div className={`relative ${alta ? "h-4" : "h-3"} bg-plum/15`}>
        <span className="absolute inset-y-0 left-0 bg-plum" style={{ width: pos(a.valor) }} />
        {a.cortes.map((c) => (
          <span key={c.rotulo} className="absolute -inset-y-1.5 w-0.5 bg-ink" style={{ left: pos(c.valor) }} />
        ))}
      </div>
      <ul className="mt-2 space-y-0.5 text-[13px] text-ink/75">
        {a.cortes.map((c) => (
          <li key={c.rotulo} className="flex items-center gap-2">
            <span className="inline-block h-3 w-0.5 bg-ink" />
            <span className="whitespace-nowrap font-mono tabular-nums text-ink">{formatInt(c.valor)}</span>
            {c.rotulo}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Topo do perfil: nome à esquerda, o número dela à direita (no celular, logo abaixo do nome). */
export function PerfilHero({
  years,
  nome,
  quemFoi,
  ancora,
}: {
  years: string;
  nome: string;
  quemFoi: string;
  ancora: AncoraPerfil;
}) {
  return (
    <header className="grid gap-8 border-b border-ink py-10 md:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-12">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-plum">Pioneiras · {years}</p>
        <h1 className="mt-4 font-display text-5xl leading-[0.98] text-ink md:text-7xl">{nome}</h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/80">{quemFoi}</p>
      </div>
      <div className="relative bg-cream p-6 pt-8 md:p-8 md:pl-10">
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-2 bg-coral md:inset-y-0 md:left-0 md:h-auto md:w-2" />
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">{ancora.eleicao}</p>
        <p className="poster-figure mt-3 text-[5rem] text-plum md:text-[6.5rem]">{formatInt(ancora.valor)}</p>
        <p className="mt-2 max-w-[30ch] font-medium text-ink">{ancora.rotulo}</p>
        <div className="mt-5">
          <Regua a={ancora} alta />
        </div>
        <p className="mt-5 font-display text-xl leading-snug text-ink">{ancora.tensao}</p>
        <p className="mt-4 text-[13px] text-muted-foreground">{ancora.fonte}</p>
      </div>
    </header>
  );
}

/** Card de perfil publicado: índice e navegação entre perfis. Card inteiro clicável. */
export function PerfilCard({ p, n, compacto }: { p: PerfilPioneira; n: number; compacto?: boolean }) {
  const a = ANCORAS_PIONEIRAS[p.id];
  if (!p.to) return null;
  return (
    <li className="group relative flex flex-col border-t-4 border-plum bg-paper p-6 outline-offset-4 outline-plum focus-within:outline-2 md:p-8">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
        {String(n).padStart(2, "0")} · {p.years}
      </p>
      <h3 className={`mt-3 font-display leading-tight text-ink ${compacto ? "text-2xl" : "text-3xl md:text-4xl"}`}>
        <Link
          to={p.to}
          className="after:absolute after:inset-0 focus-visible:outline-none group-hover:underline group-hover:decoration-plum group-hover:underline-offset-4"
        >
          {p.name}
        </Link>
      </h3>
      {a && (
        <>
          <p className={`poster-figure mt-5 text-plum ${compacto ? "text-5xl" : "text-6xl md:text-7xl"}`}>
            {formatInt(a.valor)}
          </p>
          <p className="mt-2 max-w-[32ch] font-medium leading-snug text-ink">{a.rotulo}</p>
          <div className="mt-5">
            <Regua a={a} />
          </div>
          {!compacto && <p className="mt-4 font-display text-lg leading-snug text-ink">{a.tensao}</p>}
        </>
      )}
      <div className="mt-auto pt-5" />
      <div className="flex items-center justify-between gap-4 border-t border-rule pt-2 text-[13px] text-muted-foreground">
        <span>{a?.fonte}</span>
        <span aria-hidden="true" className="inline-flex min-h-11 items-center font-medium text-plum">
          Ler o perfil
          <span className="ml-1.5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none">→</span>
        </span>
      </div>
    </li>
  );
}

/** Fim de cada perfil: as outras pioneiras publicadas e o caminho de volta ao índice. */
export function PerfilNav({ atual }: { atual: string }) {
  const publicados = PERFIS_PIONEIRAS.filter((p) => p.to);
  const outros = publicados.filter((p) => p.id !== atual);
  if (outros.length === 0) return null;
  return (
    <nav aria-label="Outras pioneiras" className="relative left-1/2 -ml-[50vw] w-screen bg-cream">
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-plum">Continue a série</p>
        <h2 className="mt-3 font-display text-3xl leading-tight text-ink">Outras pioneiras</h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {outros.map((p) => (
            <PerfilCard key={p.id} p={p} n={publicados.indexOf(p) + 1} compacto />
          ))}
        </ul>
        <Link
          to="/pioneiras"
          className="mt-5 inline-flex min-h-11 items-center font-medium text-plum underline decoration-plum underline-offset-4"
        >
          Todas as pioneiras →
        </Link>
      </div>
    </nav>
  );
}

/** Linha do tempo de um perfil: ano grande à esquerda, fato à direita. */
export function LinhaDoTempo({
  itens,
}: {
  itens: { ano: string; titulo: string; texto: React.ReactNode; to?: string }[];
}) {
  return (
    <ol className="max-w-3xl border-l-2 border-plum/30">
      {itens.map((it) => (
        <li key={it.ano + it.titulo} className="grid grid-cols-[3.75rem_minmax(0,1fr)] gap-x-3 pb-7 pl-4 md:pl-5 last:pb-0 md:grid-cols-[6.5rem_minmax(0,1fr)] md:gap-x-6">
          <p className="poster-figure text-2xl text-plum md:text-3xl">{it.ano}</p>
          <div>
            <p className="font-semibold text-ink">{it.titulo}</p>
            <p className="mt-1 text-[15px] leading-relaxed text-ink/85 md:text-base">{it.texto}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** "O que se sabe e o que é reputação" como conferência: o que circula × o que o documento mostra. */
export function Conferencia({
  itens,
}: {
  itens: { status: string; circula: React.ReactNode; documento: React.ReactNode }[];
}) {
  return (
    <ul className="divide-y divide-plum/20 border-y border-plum/20">
      {itens.map((it, i) => (
        <li key={i} className="grid gap-3 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-8">
          <div>
            <p className="inline-block border border-plum px-2 py-0.5 font-mono text-[12px] uppercase tracking-wider text-plum">
              {it.status}
            </p>
            <p className="mt-3 font-display text-lg leading-snug text-ink">{it.circula}</p>
          </div>
          <p className="text-base leading-relaxed text-ink/90 md:pt-9">{it.documento}</p>
        </li>
      ))}
    </ul>
  );
}
