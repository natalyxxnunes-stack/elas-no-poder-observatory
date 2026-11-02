import type { ReactNode } from "react";
import { Secao } from "@/components/editorial/Secao";
import { Link } from "@tanstack/react-router";
import { FotoDocumental } from "@/components/editorial/FotoDocumental";
import { ACHADOS } from "@/data/achados";
import { CAPA_MANCHETE } from "@/data/capa";
import { FALAS } from "@/data/falas";
import { FOTOS } from "@/data/fotos";
import { M_BRANCAS, M_CADEIRAS, M_PL_PRETAS } from "@/data/manchetes";
import { ANCORAS_PIONEIRAS, PERFIS_PIONEIRAS } from "@/data/perfis-pioneiras";

/**
 * Capa da página inicial, direção B (02/11/2026): fundos claros alternados
 * (papel e creme) com blocos de roxo para a citação e para explorar os dados.
 * Laranja só marca o dado de 2026. Pastel fica em detalhes.
 */

function Faixa({
  fundo,
  children,
  className = "",
}: {
  fundo: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`relative left-1/2 -ml-[50vw] w-screen ${fundo} ${className}`}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">{children}</div>
    </section>
  );
}

const achado = (id: string) => ACHADOS.find((a) => a.id === id);

export function CapaManchete() {
  const m = CAPA_MANCHETE;
  const temFoto = Boolean(FOTOS[m.fotoId]);
  return (
    <Faixa fundo="bg-cream">
      <div
        className={`grid gap-8 py-10 md:items-end md:gap-12 md:py-16 ${temFoto ? "md:grid-cols-[1.15fr_1fr]" : ""}`}
      >
        <div className={temFoto ? "" : "max-w-5xl"}>
          <Secao nome={m.secao} tipo={m.tipo} />
          <h1 className="mt-4 font-display text-[2.4rem] font-semibold leading-[1.05] tracking-[-0.01em] text-plum md:text-6xl">
            <Link to={m.to} className="hover:underline hover:underline-offset-4">
              {m.titulo}
            </Link>
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink/80 md:text-lg">
            {m.linhaFina}
          </p>
        </div>
        <FotoDocumental id={m.fotoId} />
      </div>
    </Faixa>
  );
}

export function CapaCitacao() {
  const falas = CAPA_MANCHETE.falas
    .map((id) => FALAS.find((f) => f.id === id))
    .filter((f): f is NonNullable<typeof f> => Boolean(f && f.publicar));
  const [principal, ...outras] = falas;
  if (!principal) return null;
  const trecho = (t: string) => t.split(" [...]")[0];

  return (
    <Faixa fundo="bg-plum" className="text-paper">
      <div className="grid gap-10 py-10 md:grid-cols-[1.4fr_1fr] md:gap-14 md:py-14">
        <blockquote>
          <span
            aria-hidden="true"
            className="block h-8 font-display text-7xl leading-[0.6] text-lilac"
          >
            “
          </span>
          <p className="mt-3 font-display text-[1.65rem] italic leading-tight md:text-4xl">
            {trecho(principal.fala)}
          </p>
          <footer className="mt-4 text-[15px] leading-relaxed text-paper/85">
            <strong className="font-semibold text-paper">{principal.pessoa}</strong> (
            {principal.partido}), {principal.cargo}. {principal.onde}, {principal.data} ·{" "}
            <a
              href={principal.fonteUrl}
              target="_blank"
              rel="noreferrer"
              className="text-paper underline underline-offset-2"
            >
              {principal.fonteRotulo}
            </a>
          </footer>
        </blockquote>
        <div className="flex flex-col justify-end gap-6">
          {outras.map((f) => (
            <blockquote key={f.id} className="border-l-4 border-solid border-lilac pl-4">
              <p className="font-display text-xl italic leading-snug">“{trecho(f.fala)}”</p>
              <footer className="mt-2 text-[14px] leading-relaxed text-paper/85">
                <strong className="font-semibold text-paper">{f.pessoa}</strong> ({f.partido}),{" "}
                {f.cargo}. {f.data} ·{" "}
                <a
                  href={f.fonteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-paper underline underline-offset-2"
                >
                  {f.fonteRotulo}
                </a>
              </footer>
            </blockquote>
          ))}
          <Link
            to={CAPA_MANCHETE.to}
            className="inline-flex min-h-11 items-center gap-2 self-start bg-paper px-5 text-[15px] font-semibold text-plum hover:bg-cream"
          >
            Ler a reportagem <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </Faixa>
  );
}

export function CapaChamadas() {
  const reeleicao = achado("dinheiro-reeleicao");
  return (
    <Faixa fundo="bg-paper">
      <div className="grid gap-8 py-10 md:grid-cols-[1.4fr_1fr] md:gap-12 md:py-14">
        <article className="border-b border-rule pb-8 md:border-b-0 md:border-r md:pb-0 md:pr-12">
          <Secao nome="No plenário" tipo="reportagem" />
          <h2 className="mt-3 font-display text-[1.7rem] font-semibold leading-tight text-ink md:text-4xl">
            <Link to="/como-votaram" className="hover:underline hover:underline-offset-4">
              Entre as deputadas que tentaram voltar, as de maior receita voltaram mais
            </Link>
          </h2>
          {reeleicao?.ancora ? (
            <div className="mt-5 flex flex-wrap items-end gap-x-6 gap-y-2">
              <span className="font-display text-5xl font-semibold leading-none text-plum">
                {reeleicao.ancora.valor}
              </span>
              <span className="max-w-xs text-[15px] leading-snug text-ink/70">
                {reeleicao.ancora.rotulo}
              </span>
            </div>
          ) : null}
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink/80">
            Seis votações na Câmara, deputada por deputada, cruzadas com o resultado de 2026 e o
            dinheiro de campanha.
          </p>
        </article>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
          <article className="bg-lilac p-5">
            <Secao nome="Dinheiro" pequeno />
            <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-ink">
              <Link to="/dinheiro" className="hover:underline hover:underline-offset-4">
                Mediana da candidata a deputada: branca, R$ 144 mil; parda, R$ 98 mil; preta, R$ 79
                mil
              </Link>
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-ink/75">
              Nos 12 partidos com mais receita. Receitas declaradas até 27/10.
            </p>
          </article>
          <article className="bg-cream p-5">
            <Secao nome="Direitos" pequeno />
            <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-ink">
              <Link to="/direitos" className="hover:underline hover:underline-offset-4">
                Treze marcos, de 1932 a 2026
              </Link>
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-ink/75">
              Cada lei, decisão e emenda que mudou o acesso das mulheres às urnas e ao dinheiro de
              campanha.
            </p>
          </article>
        </div>
      </div>
    </Faixa>
  );
}

export function CapaNumeros() {
  const gov = achado("governadoras-brancas");
  const itens = [
    {
      valor: M_CADEIRAS.ancora?.valor,
      rotulo: M_CADEIRAS.ancora?.rotulo,
      to: "/quem-chega" as const,
    },
    {
      valor: M_BRANCAS.ancora?.valor,
      rotulo: M_BRANCAS.ancora?.rotulo,
      to: "/quem-chega" as const,
    },
    {
      valor: M_PL_PRETAS.ancora?.valor,
      rotulo: M_PL_PRETAS.ancora?.rotulo,
      to: "/partidos" as const,
    },
    { valor: gov?.ancora?.valor, rotulo: gov?.ancora?.rotulo, to: "/quem-chega" as const },
  ].filter((i) => i.valor && i.rotulo);

  return (
    <Faixa fundo="bg-paper">
      <div className="py-10 md:py-14">
        <Secao nome="Os números de 2026" tipo="achados" />
        <ul className="mt-6 grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-4 md:gap-x-10">
          {itens.map((i) => (
            <li key={i.rotulo}>
              <Link to={i.to} className="group block">
                <span aria-hidden="true" className="block h-1 w-7 bg-coral" />
                <span className="mt-3 block font-display text-[2.6rem] font-semibold leading-none text-plum md:text-5xl">
                  {i.valor}
                </span>
                <span className="mt-2 block text-[14px] leading-snug text-ink/80 group-hover:underline group-hover:underline-offset-2">
                  {i.rotulo}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-[13px] text-muted-foreground">
          TSE, base de 27/10/2026 · recontagem própria
        </p>
        <Link
          to="/achados"
          className="mt-2 inline-flex min-h-11 items-center text-[15px] font-semibold text-plum"
        >
          Todos os achados →
        </Link>
      </div>
    </Faixa>
  );
}

export function CapaPioneiras() {
  const perfis = PERFIS_PIONEIRAS.filter((p) => p.to);
  const [destaque, ...outras] = perfis;
  if (!destaque?.to) return null;
  const ancora = ANCORAS_PIONEIRAS[destaque.id];

  return (
    <Faixa fundo="bg-cream">
      <div className="py-10 md:py-14">
        <Secao nome="Pioneiras" tipo="perfis" />
        <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink md:text-4xl">
          Antes delas
        </h2>
        <div
          className={`mt-8 grid gap-8 md:gap-12 ${FOTOS[destaque.id] ? "md:grid-cols-[1fr_1.2fr] md:items-start" : ""}`}
        >
          <FotoDocumental id={destaque.id} />
          <div
            className={FOTOS[destaque.id] ? "" : "grid gap-8 md:grid-cols-[1.2fr_1fr] md:gap-12"}
          >
            <div>
              <p className="font-mono text-[13px] text-ink/70">{destaque.years}</p>
              <h3 className="mt-2 font-display text-[1.75rem] font-semibold leading-tight text-ink md:text-4xl">
                <Link to={destaque.to} className="hover:underline hover:underline-offset-4">
                  {destaque.name}
                </Link>
              </h3>
              {ancora ? (
                <p className="mt-4 flex flex-wrap items-baseline gap-x-3">
                  <span className="font-display text-5xl font-semibold leading-none text-plum">
                    {ancora.valor}
                  </span>
                  <span className="text-[15px] text-ink/75">{ancora.rotulo}</span>
                </p>
              ) : null}
              <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink/80">
                {destaque.linhaFina}
              </p>
              <Link
                to={destaque.to}
                className="mt-2 inline-flex min-h-11 items-center text-[15px] font-semibold text-plum"
              >
                Ler o perfil →
              </Link>
            </div>
            <div>
              {outras.map((p) =>
                p.to ? (
                  <div
                    key={p.id}
                    className={`border-t border-[#DCD3C3] pt-5 ${FOTOS[destaque.id] ? "mt-6" : "md:border-t-0 md:pt-0"}`}
                  >
                    <p className="font-mono text-[13px] text-ink/70">{p.years}</p>
                    <h3 className="mt-1 font-display text-2xl font-semibold text-ink">
                      <Link to={p.to} className="hover:underline hover:underline-offset-4">
                        {p.name}
                      </Link>
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink/75">{p.linhaFina}</p>
                  </div>
                ) : null,
              )}
              <Link
                to="/pioneiras"
                className="mt-4 inline-flex min-h-11 items-center text-[15px] font-semibold text-plum"
              >
                Todas as pioneiras →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Faixa>
  );
}

const EXPLORE = [
  { to: "/eleitas" as const, label: "Quem entrou: as eleitas, uma a uma" },
  { to: "/funil" as const, label: "O funil, da candidatura ao poder" },
  { to: "/quem-sao-elas" as const, hash: "estados", label: "E no seu estado?" },
  { to: "/partidos" as const, label: "Partido por partido" },
  { to: "/historico" as const, label: "A série desde 2014" },
  { to: "/metodo" as const, label: "Como sabemos: o método" },
];

export function CapaExplore() {
  return (
    <Faixa fundo="bg-plum" className="text-paper">
      <div className="py-10 md:py-14">
        <Secao nome="Explore os dados" claro />
        <ul className="mt-4 grid md:grid-cols-2 md:gap-x-12">
          {EXPLORE.map((e) => (
            <li key={e.label} className="border-b border-plum-soft">
              <Link
                to={e.to}
                {...(e.hash ? { hash: e.hash } : {})}
                className="flex min-h-14 items-center justify-between gap-4 font-display text-[1.3rem] text-paper hover:underline hover:underline-offset-4"
              >
                {e.label} <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Faixa>
  );
}
