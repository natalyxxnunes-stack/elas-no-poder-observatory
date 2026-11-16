import { Link } from "@tanstack/react-router";
import {
  ANCORAS_PIONEIRAS,
  PERFIS_PIONEIRAS,
  type AncoraPerfil,
  type PerfilPioneira,
} from "@/data/perfis-pioneiras";
import { formatInt } from "@/lib/format-br";
import { FotoDocumental } from "@/components/editorial/FotoDocumental";
import { FOTOS } from "@/data/fotos";

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
  fotoId,
  ficha,
}: {
  years: string;
  nome: string;
  quemFoi: string;
  ancora: AncoraPerfil;
  fotoId?: string;
  /** Ficha extraída de dados oficiais; exibida quando não há foto licenciada. */
  ficha?: React.ReactNode;
}) {
  const pagu = fotoId === "pagu";
  const lelia = fotoId === "lelia-gonzalez";
  const fundoEscuro = pagu || lelia;
  // Somente para imagens de avaliação. O build normal mantém o bloqueio jurídico.
  const previaPagu = pagu && import.meta.env["VITE_QSE_PREVIEW_PAGU_FOTO"] === "true";
  const temFoto = Boolean(fotoId && FOTOS[fotoId] && (FOTOS[fotoId]?.licenca !== "verificacao-pendente" || previaPagu));
  return (
    <header className={`relative left-1/2 -ml-[50vw] w-screen ${pagu ? "bg-ink text-paper" : lelia ? "bg-[var(--art-plum)] text-paper" : "bg-cream text-ink"}`}>
      <div className="mx-auto max-w-7xl px-5 py-11 md:px-8 md:py-16">
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_.9fr] lg:gap-12">
          <div>
            <p className={`text-xs font-semibold uppercase tracking-wide ${fundoEscuro ? "text-[var(--art-gold)]" : "text-plum"}`}>Série Pioneiras · {years}</p>
            <h1 className={`mt-4 max-w-2xl font-display text-[clamp(2.7rem,5vw,4.7rem)] font-semibold leading-[1.03] ${fundoEscuro ? "text-paper" : "text-ink"}`}>
              {nome}
            </h1>
            <p className={`mt-6 max-w-xl text-lg leading-relaxed ${fundoEscuro ? "text-paper/90" : "text-ink/85"}`}>{quemFoi}</p>
            <p className={`mt-6 max-w-lg text-xs leading-relaxed ${fundoEscuro ? "text-paper/85" : "text-ink/75"}`}>
              Perfil documental: imagem histórica apenas com procedência e direitos identificados.
              Os resultados eleitorais são registrados na ficha do TSE.
            </p>
          </div>
          <div className="min-w-0">
            {pagu && temFoto && fotoId && FOTOS[fotoId] ? (
              <figure className="mx-auto max-w-[390px] bg-[var(--art-coral)] p-3 sm:p-4 lg:mx-0">
                <img src={FOTOS[fotoId]!.src} alt={FOTOS[fotoId]!.alt}
                  loading="eager" fetchPriority="high"
                  className="block aspect-[3/4] w-full object-cover object-center"/>
                <figcaption className="mt-3 bg-ink px-3 py-3 text-xs leading-relaxed text-paper/85">
                  Pagu, retrato atribuído ao fim dos anos 1920. Autoria não identificada.{" "}
                  <a href={FOTOS[fotoId]!.licencaUrl} target="_blank" rel="noreferrer"
                    className="font-semibold underline underline-offset-2">
                    Wikimedia Commons (domínio público indicado na ficha)
                  </a>. {previaPagu ? "Reprodução apenas na prévia editorial, com direitos ainda em verificação; não liberar para publicação." : ""}
                </figcaption>
              </figure>
            ) : temFoto && fotoId ? (
              <FotoDocumental id={fotoId} />
            ) : ficha ? (
              <div className="border border-rule bg-paper p-5 md:p-6">
                <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-plum">Arquivo eleitoral · Reprodução tipográfica</p>
                {ficha}
              </div>
            ) : (
              <p className="border border-rule bg-paper p-5 text-sm text-ink/75">
                Fotografia não disponível com procedência e direitos verificados.
              </p>
            )}
          </div>
        </div>
        <div className={`mt-9 grid gap-5 border-t pt-6 md:grid-cols-[.75fr_1fr_1.2fr] md:items-start md:gap-9 ${fundoEscuro ? "border-paper/35" : "border-plum/30"}`}>
          <div>
            <p className={`text-xs font-semibold uppercase tracking-wide ${fundoEscuro ? "text-[var(--art-gold)]" : "text-plum"}`}>O registro eleitoral</p>
            <p className={`mt-2 text-sm leading-relaxed ${fundoEscuro ? "text-paper" : "text-ink/75"}`}>{ancora.eleicao}</p>
          </div>
          <div>
            <p className={`font-display text-[3.3rem] font-semibold leading-none ${fundoEscuro ? "text-[var(--art-gold)]" : "text-plum"}`}>
              {formatInt(ancora.valor)}
            </p>
            <p className={`mt-2 max-w-[35ch] text-sm font-medium leading-relaxed ${fundoEscuro ? "text-paper" : "text-ink"}`}>
              {ancora.rotulo}
            </p>
            <p className={`mt-2 text-xs ${fundoEscuro ? "text-paper/85" : "text-ink/75"}`}>{ancora.fonte}</p>
          </div>
          <div>
            <p className={`font-display text-lg leading-snug ${fundoEscuro ? "text-paper" : "text-ink"}`}>{ancora.tensao}</p>
            <div className={fundoEscuro ? "mt-4 bg-paper p-4 text-ink" : "mt-4"}><Regua a={ancora} /></div>
          </div>
        </div>
      </div>
    </header>
  );
}

/** Card de perfil publicado: índice e navegação entre perfis. Card inteiro clicável. */
export function PerfilCard({ p, n, compacto }: { p: PerfilPioneira; n: number; compacto?: boolean }) {
  const a = ANCORAS_PIONEIRAS[p.id];
  if (!p.to) return null;
  return (
    <li className="group relative flex flex-col border border-rule bg-paper p-6 outline-offset-4 outline-plum focus-within:outline-2 md:p-8">
      <p className="text-[13px] text-muted-foreground font-semibold">
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
          <p className={`poster-figure mt-5 text-plum ${compacto ? "text-5xl" : "text-4xl md:text-5xl"}`}>
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
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <p className="text-[13px] text-plum font-semibold">Continue a série</p>
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
            <p className="inline-block border border-plum px-2 py-0.5 text-[13px] text-plum font-semibold">
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

/**
 * Ficha de votação: a linha do arquivo oficial do TSE recomposta como ficha
 * de arquivo. Reprodução tipográfica a partir do dado público; ocupa o lugar
 * da foto enquanto não houver fotografia documental registrada.
 */
export function FichaVotacao({
  ano,
  uf,
  cargo,
  registro,
  partido,
  votos,
  situacao,
  arquivo,
  sha,
}: {
  ano: string;
  uf: string;
  cargo: string;
  registro: string;
  partido: string;
  votos: number;
  situacao: string;
  arquivo: string;
  sha: string;
}) {
  const linhas: [string, string][] = [
    ["Eleição", ano],
    ["UF", uf],
    ["Cargo", cargo],
    ["Nome no registro", registro],
    ["Partido", partido],
    ["Votos nominais", formatInt(votos)],
    ["Situação", situacao],
  ];
  return (
    <figure className="max-w-sm">
      <div className="border-2 border-ink bg-cream p-4 font-mono text-[13px] text-ink">
        <p className="border-b border-ink pb-2 text-[13px] uppercase tracking-[0.1em]">
          Tribunal Superior Eleitoral · votação nominal
        </p>
        <dl className="mt-2 divide-y divide-ink/20">
          {linhas.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[8.5rem_minmax(0,1fr)] gap-2 py-1.5">
              <dt className="uppercase text-ink/60">{k}</dt>
              <dd className={k === "Votos nominais" ? "font-semibold text-plum" : ""}>{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-2 break-all border-t border-ink pt-2 text-[13px] leading-snug text-ink/60">
          {arquivo} · sha256 {sha.slice(0, 16)}…
        </p>
      </div>
      <figcaption className="mt-2 text-[13px] text-muted-foreground">
        Reprodução tipográfica da linha do arquivo oficial do TSE; não é imagem do documento.
      </figcaption>
    </figure>
  );
}


/**
 * Molde de perfil (Pioneiras), em ordem de revista: 1) abre pela pessoa
 * (PerfilHero + Lide), 2) a trajetória, 3) o dado eleitoral, 4) o que é
 * reputação e o que o documento mostra, 5) fontes. PerfilSumario mostra essa
 * ordem logo abaixo da abertura.
 */
export function PerfilSumario({ itens }: { itens: { id: string; rotulo: string }[] }) {
  return (
    <nav aria-label="Neste perfil" className="border-b border-rule py-4">
      <ol className="flex flex-wrap gap-x-6 gap-y-1 text-[15px]">
        {itens.map((i, k) => (
          <li key={i.id}>
            <a href={`#${i.id}`} className="inline-flex min-h-11 items-center gap-2 text-ink hover:text-plum">
              <span className="font-display text-lg italic text-plum">{String(k + 1).padStart(2, "0")}</span>
              {i.rotulo}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** primeiro parágrafo do perfil, com capitular, como abertura de matéria de revista */
export function Lide({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-10 max-w-3xl text-xl leading-relaxed text-ink first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-plum">
      {children}
    </p>
  );
}
