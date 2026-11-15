import { Link } from "@tanstack/react-router";
import { OBJETOS, ObjetoFigura } from "@/components/editorial/ObjetoTema";
import { FOTOS } from "@/data/fotos";
import type { Tema } from "@/data/temas";

/**
 * Seis aberturas editoriais diferenciadas, sem alterar as observações e
 * universos numéricos mantidos em ObjetoTema.tsx.
 *
 * Presença e Dinheiro: objeto estatístico na abertura.
 * Agenda e Poder: registro fotográfico/contextual com crédito.
 * Violência: enquadramento documental da lei, sem fingir fac-símile.
 * Memória: fotografia histórica de domínio público.
 * Quando o objeto não está na abertura, ele continua acessível abaixo da tese.
 */
export const TEMAS_COM_OBJETO_NA_ABERTURA = ["presenca", "dinheiro"] as const;

const temaSuperficie: Record<Tema["slug"], string> = {
  presenca: "bg-plum-deep text-paper",
  dinheiro: "bg-cream text-ink",
  agenda: "bg-ink text-paper",
  poder: "bg-plum-deep text-paper",
  violencia: "bg-ink text-paper",
  memoria: "bg-cream text-ink",
};

function FotoTema({ tipo }: { tipo: "agenda" | "poder" | "memoria" }) {
  const id = tipo === "agenda" ? "plenario-camara-junho-2026"
    : tipo === "poder" ? "bancada-feminina-camara-marco-2026"
    : "bertha-lutz-1927";
  const foto = FOTOS[id];
  if (!foto) return null;
  const contexto = {
    agenda: "Sessão deliberativa da Câmara em 30 de junho de 2026. Fotografia de arquivo sobre o trabalho legislativo; não documenta as pautas reunidas neste tema.",
    poder: "Bancada feminina da Câmara, março de 2026. Registro anterior às eleições de outubro; não representa as eleitas para 2027.",
    memoria: "Bertha Lutz na campanha pelo voto feminino, 1927. Arquivo Nacional, fundo da Federação Brasileira pelo Progresso Feminino.",
  }[tipo];
  const moldura = tipo === "agenda" ? "bg-[var(--art-coral)]"
    : tipo === "poder" ? "bg-[var(--art-gold)]"
    : "bg-[var(--art-violet)]";
  return (
    <figure className="min-w-0">
      <div className={`${moldura} p-3 md:p-4`}>
        <img src={foto.src} alt={foto.alt} loading="eager" fetchPriority="high"
          className="block h-64 w-full object-cover object-center md:h-[342px]" />
      </div>
      <figcaption className={tipo === "memoria" ? "mt-3 text-xs leading-relaxed text-ink/75" : "mt-3 text-xs leading-relaxed text-paper/85"}>
        {contexto}{" "}
        <a href={foto.licencaUrl} target="_blank" rel="noreferrer"
          className="font-semibold underline underline-offset-2">
          {foto.credito}
        </a>
      </figcaption>
    </figure>
  );
}

function DocumentoLei() {
  return (
    <div className="flex min-h-64 flex-col justify-between bg-paper px-7 py-7 text-ink md:px-10 md:py-9"
      aria-label="Referência editorial à Lei 14.192, de 2021">
      <div>
        <p className="text-xs font-semibold tracking-wide text-plum">REFERÊNCIA LEGISLATIVA · BRASIL</p>
        <p className="mt-7 font-display text-4xl font-semibold leading-none text-plum md:text-5xl">
          Lei 14.192
        </p>
        <p className="mt-2 font-mono text-sm text-ink/70">4 de agosto de 2021</p>
      </div>
      <div>
        <p className="max-w-sm text-base leading-relaxed">Violência política contra a mulher</p>
        <a href="https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14192.htm"
          rel="noreferrer" target="_blank"
          className="mt-4 inline-flex min-h-11 items-center font-semibold text-plum underline underline-offset-4">
          Consultar a lei original ↗
        </a>
        <p className="mt-2 text-xs text-ink/65">Referência tipográfica, não reprodução do documento.</p>
      </div>
    </div>
  );
}

export function TemaOpening({ tema }: { tema: Tema }) {
  const slug = tema.slug;
  const escuro = slug === "presenca" || slug === "agenda" || slug === "poder" || slug === "violencia";
  const objeto = OBJETOS[slug]();
  const figuraDados = slug === "presenca" || slug === "dinheiro";
  return (
    <section className={`relative left-1/2 -ml-[50vw] w-screen overflow-hidden ${temaSuperficie[slug]}`}>
      <div className={`mx-auto grid max-w-7xl gap-8 px-5 py-11 md:px-8 md:py-16 lg:items-center lg:gap-12 ${slug === "memoria" ? "lg:grid-cols-[.85fr_1.15fr]" : "lg:grid-cols-[1.03fr_.97fr]"}`}>
        <div className={slug === "memoria" ? "lg:col-start-2 lg:row-start-1" : ""}>
          <p className={`text-xs font-semibold uppercase tracking-wide ${escuro ? "text-lilac" : "text-plum"}`}>
            Tema {tema.ordem} de 06 · Observatório
          </p>
          <h1 className={`mt-4 font-display text-[clamp(3.1rem,6vw,5.25rem)] font-semibold leading-[.98] ${escuro ? "text-paper" : "text-ink"}`}>
            {tema.nome}
          </h1>
          <p className={`mt-3 font-display text-2xl italic leading-tight md:text-3xl ${escuro ? "text-lilac" : "text-plum"}`}>
            {tema.pergunta}
          </p>
          <p className={`mt-6 max-w-[56ch] text-base leading-relaxed md:text-lg ${escuro ? "text-paper/85" : "text-ink/80"}`}>
            {tema.linha}
          </p>
          <Link to="/temas" className={`mt-6 inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4 ${escuro ? "text-paper" : "text-plum"}`}>
            Explorar os seis temas ↗
          </Link>
        </div>

        <div className={slug === "memoria" ? "lg:col-start-1 lg:row-start-1" : ""}>
          {figuraDados ? (
            <div className="bg-plum-deep p-6 text-paper md:p-8">
              <p className="mb-5 text-xs font-semibold uppercase tracking-wide text-lilac">O dado que abre o tema</p>
              <ObjetoFigura slug={slug} />
              <p className="mt-5 text-sm leading-relaxed text-paper/90">{objeto.frase}</p>
            </div>
          ) : slug === "agenda" || slug === "poder" || slug === "memoria" ? (
            <FotoTema tipo={slug} />
          ) : <DocumentoLei />}
        </div>
      </div>
    </section>
  );
}

export function ObjetoComplementar({ tema }: { tema: Tema }) {
  if (TEMAS_COM_OBJETO_NA_ABERTURA.some((s) => s === tema.slug)) return null;
  const objeto = OBJETOS[tema.slug]();
  return (
    <details id="grafico-tema" className="group mt-8 border-y border-rule scroll-mt-24">
      <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum [&::-webkit-details-marker]:hidden">
        <span>
          <span className="block text-xs font-semibold uppercase tracking-wide text-plum">Dados do tema</span>
          <span className="mt-1 block font-display text-xl font-semibold">Explorar a visualização e sua fonte</span>
        </span>
        <span className="shrink-0 text-sm font-semibold text-plum">
          <span className="group-open:hidden">Abrir +</span>
          <span className="hidden group-open:inline">Recolher −</span>
        </span>
      </summary>
      <div className="bg-plum-deep p-6 text-paper md:p-8">
        <ObjetoFigura slug={tema.slug} />
        <p className="mt-5 text-base leading-relaxed">{objeto.frase}</p>
        <a href={`${objeto.link.to}${objeto.link.hash ? "#" + objeto.link.hash : ""}`}
          className="mt-4 inline-flex min-h-11 items-center font-semibold text-lilac underline underline-offset-4">
          {objeto.link.label} ↗
        </a>
      </div>
    </details>
  );
}
