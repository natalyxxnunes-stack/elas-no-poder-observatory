import { Secao } from "@/components/editorial/Secao";
import { Link } from "@tanstack/react-router";
import { FotoDocumental } from "@/components/editorial/FotoDocumental";
import { Faixa } from "@/components/editorial/Faixa";
import { ObjetoFigura, OBJETOS } from "@/components/editorial/ObjetoTema";
import { PROXIMAS, REPORTAGENS } from "@/data/reportagens";
import { ANTIGENERO_DEPUTADAS } from "@/data/colecoes";
import { TEMAS } from "@/data/temas";
import { ACHADOS } from "@/data/achados";
import { CAPA_MANCHETE } from "@/data/capa";
import { FALAS } from "@/data/falas";
import { FOTOS } from "@/data/fotos";
import { M_BRANCAS, M_CADEIRAS, M_PL_PRETAS } from "@/data/manchetes";
import { ANCORAS_PIONEIRAS, PERFIS_PIONEIRAS } from "@/data/perfis-pioneiras";

/**
 * Capa da página inicial (12/11/2026): manchete com número-objeto em roxo-tinta,
 * os seis temas como seis perguntas, reportagens, Pioneiras e o caminho para
 * os dados. Fundos alternam branco-papel e cinza-lilás frio; laranja só marca
 * o dado de agora.
 */

const achado = (id: string) => ACHADOS.find((a) => a.id === id);

const dataBRc = (iso: string) => iso.split("-").reverse().join("/");

/** a reportagem marcada como manchete, se houver (a mais recente vence) */
const REPORTAGEM_MANCHETE = [...REPORTAGENS]
  .filter((r) => r.manchete)
  .sort((a, b) => b.data.localeCompare(a.data))[0];

function MancheteDados({ comoManchete }: { comoManchete: boolean }) {
  const m = CAPA_MANCHETE;
  const temFoto = Boolean(FOTOS[m.fotoId]);
  const Titulo = comoManchete ? "h1" : "h2";
  return (
    <Faixa fundo={comoManchete ? "bg-plum-deep text-paper" : "bg-ink text-paper"}>
      <div className="grid gap-10 py-12 md:grid-cols-[1fr_1.1fr] md:items-center md:gap-16 md:py-20">
        <div>
          <Secao nome={m.secao} tipo={m.tipo} claro />
          <Titulo className="mt-5 font-display text-[2.3rem] font-semibold leading-[1.05] tracking-[-0.01em] md:text-[3.4rem]">
            <Link
              to={m.to}
              className="hover:underline hover:decoration-coral hover:underline-offset-4"
            >
              {m.titulo}
            </Link>
          </Titulo>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-paper/85 md:text-lg">
            {m.linhaFina}
          </p>
          <Link
            to={m.to}
            className="mt-6 inline-flex min-h-11 items-center text-[15px] font-semibold text-paper underline decoration-coral decoration-2 underline-offset-4"
          >
            Candidatura, voto e cadeira →
          </Link>
        </div>
        <div>{temFoto ? <FotoDocumental id={m.fotoId} /> : <ObjetoFigura slug="presenca" />}</div>
      </div>
    </Faixa>
  );
}

/**
 * Manchete da capa (12/11/2026): quando há reportagem marcada como manchete em
 * reportagens.ts, ela abre a capa; a manchete de dados desce logo abaixo.
 * Sem reportagem marcada, abre a manchete de dados.
 */
export function CapaManchete() {
  const r = REPORTAGEM_MANCHETE;
  if (!r) return <MancheteDados comoManchete />;
  return (
    <>
      <Faixa fundo="bg-plum-deep text-paper">
        <div className="max-w-5xl py-14 md:py-24">
          <Secao nome="Reportagem" tipo={r.tema} claro />
          <h1 className="mt-5 font-display text-[2.4rem] font-semibold leading-[1.03] tracking-[-0.01em] md:text-[4.2rem]">
            <Link
              to={r.to}
              className="hover:underline hover:decoration-coral hover:underline-offset-4"
            >
              {r.titulo}
            </Link>
          </h1>
          <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-paper/85 md:text-xl">
            {r.linhaFina}
          </p>
          <p className="mt-6 font-mono text-[14px] text-lilac">
            {r.autora} · {dataBRc(r.data)}
          </p>
        </div>
      </Faixa>
      <MancheteDados comoManchete={false} />
    </>
  );
}

/** Na próxima edição: reportagens com data marcada, sem adiantar conteúdo. */
export function CapaProxima() {
  if (!PROXIMAS.length) return null;
  return (
    <Faixa fundo="bg-cream">
      <ul className="divide-y divide-rule py-2">
        {PROXIMAS.map((p) => (
          <li key={p.data} className="flex flex-wrap items-baseline gap-x-5 gap-y-1 py-4">
            <span className="font-display text-lg italic text-plum">Na próxima edição</span>
            <span className="font-mono text-[14px] text-ink/75">
              {dataBRc(p.data)} · {p.nota}
            </span>
            <span className="font-display text-xl text-ink">{p.titulo}</span>
          </li>
        ))}
      </ul>
    </Faixa>
  );
}

/** Coleção Antigênero no poder: número agregado na capa, sem nomes. */
export function CapaColecao() {
  const total = ANTIGENERO_DEPUTADAS.length;
  const voltaram = ANTIGENERO_DEPUTADAS.filter(
    (d) => d.desfecho === "reeleita" || d.desfecho === "eleita para outro cargo",
  ).length;
  return (
    <Faixa fundo="bg-ink text-paper">
      <Link
        to="/colecoes/antigenero-no-poder"
        className="group grid gap-8 py-12 md:grid-cols-[1.3fr_1fr] md:items-end md:gap-14 md:py-16"
      >
        <span>
          <Secao nome="Coleção" tipo="votos, falas, reeleição e dinheiro" claro />
          <span className="mt-4 block font-display text-4xl font-semibold leading-none md:text-6xl">
            Antigênero no poder
          </span>
          <span className="mt-5 block max-w-xl text-[17px] leading-relaxed text-paper/85">
            {total} deputadas votaram contra a igualdade salarial ou para derrubar a norma do
            Conanda. {voltaram} foram eleitas de novo em 2026.
          </span>
          <span className="mt-5 inline-flex min-h-11 items-center text-[15px] font-semibold underline decoration-coral decoration-2 underline-offset-4">
            Abrir a coleção →
          </span>
        </span>
        <span aria-hidden="true" className="grid max-w-md grid-cols-7 gap-1.5 sm:grid-cols-14">
          {Array.from({ length: total }, (_, i) => (
            <span
              key={i}
              className={`aspect-square ${i < voltaram ? "bg-coral" : "border border-cream/50"}`}
            />
          ))}
        </span>
      </Link>
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

export function CapaTemas() {
  return (
    <Faixa fundo="bg-paper">
      <div className="py-12 md:py-16">
        <Secao nome="Seis perguntas" tipo="os temas do observatório" />
        <ol className="mt-8 grid gap-px bg-rule md:grid-cols-2 xl:grid-cols-3">
          {TEMAS.map((t) => (
            <li key={t.slug} className="bg-paper">
              <Link
                to="/temas/$slug"
                params={{ slug: t.slug }}
                className="group flex h-full flex-col p-6 hover:bg-cream md:p-8"
              >
                <span className="font-mono text-[14px] text-ink/60">{t.ordem}</span>
                <span className="mt-2 font-display text-3xl font-semibold leading-tight text-ink group-hover:text-plum">
                  {t.nome}
                </span>
                <span className="font-display text-xl italic text-plum">{t.pergunta}</span>
                <span className="mt-5 border-t-[3px] border-coral pt-3 text-[16px] leading-relaxed text-ink/85">
                  {OBJETOS[t.slug]().frase}
                </span>
                <span className="mt-auto pt-5 text-[14px] font-semibold text-plum">
                  Abrir o tema →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </Faixa>
  );
}

/**
 * Reportagens na capa. "Na voz delas" fica fora da capa até chegarem as
 * respostas aos pedidos de posicionamento (decisão de 09/11/2026, ver capa.ts);
 * a página segue no ar e aparece nos temas.
 */
const FORA_DA_CAPA = new Set<string>(["/na-voz-delas"]);

export function CapaReportagens() {
  const [principal, ...outras] = REPORTAGENS.filter((r) => !FORA_DA_CAPA.has(r.to));
  if (!principal) return null;
  const dataBR = (iso: string) => iso.split("-").reverse().join("/");
  return (
    <Faixa fundo="bg-cream">
      <div className="grid gap-10 py-12 md:grid-cols-[1.4fr_1fr] md:gap-14 md:py-16">
        <article>
          <Secao nome="Reportagem" tipo={principal.tema} />
          <h2 className="mt-4 font-display text-[2rem] font-semibold leading-tight text-ink md:text-5xl">
            <Link to={principal.to} className="hover:underline hover:underline-offset-4">
              {principal.titulo}
            </Link>
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink/80">
            {principal.linhaFina}
          </p>
          <p className="mt-4 font-mono text-[13px] text-ink/70">
            {principal.autora} · {dataBR(principal.data)}
          </p>
        </article>
        <div>
          {outras.map((r) => (
            <article key={r.to} className="border-t-[3px] border-plum pt-4">
              <p className="text-[13px] font-semibold text-coral-ink">{r.tema}</p>
              <h3 className="mt-1 font-display text-2xl font-semibold leading-snug text-ink">
                <Link to={r.to} className="hover:underline hover:underline-offset-4">
                  {r.titulo}
                </Link>
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/75">{r.linhaFina}</p>
            </article>
          ))}
          {outras.length === 0 ? (
            <div className="border-t-[3px] border-plum pt-4">
              <p className="text-[13px] font-semibold text-coral-ink">Em apuração</p>
              <p className="mt-1 font-display text-2xl leading-snug text-ink">
                As investigações abertas, com o que já se sabe e o que falta confirmar.
              </p>
              <Link
                to="/investigacoes"
                className="mt-2 inline-flex min-h-11 items-center text-[15px] font-semibold text-plum"
              >
                Ver as investigações →
              </Link>
            </div>
          ) : null}
          <Link
            to="/reportagens"
            className="mt-5 inline-flex min-h-11 items-center text-[15px] font-semibold text-plum"
          >
            Todas as reportagens →
          </Link>
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
    <Faixa fundo="bg-paper">
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
                    className={`border-t border-rule pt-5 ${FOTOS[destaque.id] ? "mt-6" : "md:border-t-0 md:pt-0"}`}
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
  { to: "/achados" as const, label: "Achados: um dado por vez" },
  { to: "/quem-sao-elas" as const, label: "Explorar candidatas por cor/raça e cargo" },
  { to: "/comparar" as const, label: "Comparar partidos ou estados" },
  { to: "/downloads" as const, label: "Baixar os dados" },
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
