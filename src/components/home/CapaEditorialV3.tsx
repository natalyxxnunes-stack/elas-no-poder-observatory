import { Link } from "@tanstack/react-router";
import { Faixa } from "@/components/editorial/Faixa";
import { TEMAS } from "@/data/temas";
import { REPORTAGENS } from "@/data/reportagens";
import { CAPA_MANCHETE } from "@/data/capa";
import { FOTOS } from "@/data/fotos";
import { RESULT_2026_PROPORCIONAL, RESULT_2026_META } from "@/data/resultado-2026";
import { formatInt, formatPct } from "@/lib/format-br";

/**
 * Capa editorial v3, em branch de teste.
 * Sem dependências de imagens remotas, fotografias não licenciadas ou artes de IA.
 * Fotografia documental: só inserir quando o arquivo e a ficha de direitos
 * estiverem registrados em public/fotos e data/fotos.ts.
 */
const DESTAQUE = REPORTAGENS.find((r) => r.to === "/como-votaram");
const NUM = RESULT_2026_PROPORCIONAL.byCargo.federal;
const PERCENTUAL = (NUM.feminine / NUM.seats) * 100;
const FOTO_BERTHA = FOTOS["bertha-lutz-1927"]!; // ativo local registrado e verificado

/** Imagem documental publicada pela Agência Câmara durante a tramitação do PL 1.085/2023.
 * A legenda explicita que esta fotografia NÃO representa o conjunto das seis votações.
 */
function ArteVotacoes() {
  const foto = FOTOS["plenario-igualdade-salarial-2023"]!;
  return (
    <figure className="flex h-full flex-col overflow-hidden bg-plum">
      <img
        src={foto.src}
        alt={foto.alt}
        loading="eager"
        fetchPriority="high"
        className="block h-[270px] w-full object-cover object-center sm:h-[360px] lg:h-[435px]"
      />
      <figcaption className="bg-ink px-4 py-3 text-xs leading-relaxed text-paper/85">
        Plenário da Câmara, maio de 2023. Foto de arquivo publicada durante a tramitação do PL 1.085/2023.
        Não representa as seis votações analisadas.{" "}
        <a
          href="https://www.camara.leg.br/noticias/957955-camara-pode-votar-nesta-quarta-feira-projeto-que-equipara-salario-entre-homens-e-mulheres/"
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-paper underline underline-offset-2"
        >
          {foto.credito}
        </a>
      </figcaption>
    </figure>
  );
}

function Abertura() {
  return (
    <Faixa fundo="bg-plum-deep text-paper">
      <div className="grid gap-0 lg:grid-cols-[1.03fr_.97fr]">
        <div className="flex flex-col justify-center py-12 pr-0 lg:py-20 lg:pr-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-lilac">Na Câmara · Investigação</p>
          <h1 className="mt-5 max-w-xl font-display text-[2.7rem] font-semibold leading-[1.06] md:text-[3.6rem]">
            {DESTAQUE?.titulo ?? CAPA_MANCHETE.titulo}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-paper/85">
            {DESTAQUE?.linhaFina ?? CAPA_MANCHETE.linhaFina}
          </p>
          <Link to={DESTAQUE?.to ?? CAPA_MANCHETE.to}
            className="mt-7 inline-flex min-h-11 items-center self-start text-base font-semibold underline decoration-lilac decoration-2 underline-offset-8">
            Ler a investigação <span className="ml-2" aria-hidden="true">↗</span>
          </Link>
          <p className="mt-7 text-xs text-paper/65">
            {DESTAQUE ? DESTAQUE.autora + " · " + DESTAQUE.data.split("-").reverse().join("/") : "TSE · dados de 2026"}
          </p>
        </div>
        <div className="pb-9 lg:py-10"><ArteVotacoes /></div>
      </div>
    </Faixa>
  );
}

function ChamadaEditorial({tipo,titulo,linha,to,variant}:{
  tipo:string;titulo:string;linha:string;to:"/pioneiras"|"/como-votaram"|"/na-voz-delas"|"/eleitas";variant:"foto"|"arquivo"|"documento"|"consulta";
}) {
  return (
    <article className="group flex min-w-0 flex-col">
      <Link to={to} className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-plum">
        <div className="relative flex aspect-[5/3] items-center justify-center overflow-hidden bg-cream">
          {variant==="foto" ? (
            <img src={FOTO_BERTHA.src} alt={FOTO_BERTHA.alt}
              loading="lazy" className="h-full w-full object-cover" />
          ) : variant==="arquivo" ? (
            <svg className="h-full w-full" viewBox="0 0 500 300" role="img" aria-label="Composição original de fichas de arquivo, sem reprodução de documentos">
              <rect width="500" height="300" fill="var(--cream)"/>
              <rect x="65" y="40" width="175" height="217" fill="var(--lilac)" stroke="var(--plum)" strokeWidth="2"/>
              <rect x="159" y="57" width="255" height="198" fill="var(--paper)" stroke="var(--plum-deep)" strokeWidth="2"/>
              <rect x="184" y="86" width="195" height="5" fill="var(--plum)"/>
              <rect x="184" y="106" width="151" height="5" fill="var(--plum-soft)"/>
              <rect x="184" y="156" width="170" height="2" fill="var(--rule)"/>
              <rect x="184" y="179" width="170" height="2" fill="var(--rule)"/>
              <rect x="184" y="202" width="120" height="2" fill="var(--rule)"/>
              <circle cx="122" cy="202" r="30" fill="var(--plum)"/>
            </svg>
          ) : variant==="documento" ? (
            <svg className="h-full w-full" viewBox="0 0 500 300" role="img" aria-label="Composição original de páginas e pauta, sem fac-símile documental">
              <rect width="500" height="300" fill="var(--plum)"/>
              <rect x="73" y="40" width="356" height="219" fill="var(--paper)"/>
              <rect x="101" y="70" width="245" height="8" fill="var(--plum-deep)"/>
              <rect x="101" y="93" width="306" height="3" fill="var(--rule)"/>
              <rect x="101" y="108" width="296" height="3" fill="var(--rule)"/>
              <rect x="101" y="123" width="268" height="3" fill="var(--rule)"/>
              <rect x="101" y="165" width="110" height="54" fill="var(--lilac)"/>
              <rect x="224" y="165" width="183" height="54" fill="var(--cream)"/>
              <rect x="101" y="234" width="306" height="2" fill="var(--rule)"/>
            </svg>
          ) : (
            <svg className="h-full w-full" viewBox="0 0 500 300" role="img" aria-label="Composição editorial original de cadeiras parlamentares">
              <rect width="500" height="300" fill="var(--plum-deep)"/>
              {Array.from({length:7},(_,i)=>Array.from({length:4},(_,j)=>(
                <rect key={i+"-"+j} x={42+i*62} y={38+j*56} width="42" height="34"
                  fill={(i+j)%4===0?"var(--lilac)":"var(--plum-soft)"} />
              )))}
            </svg>
          )}
          {variant !== "foto" ? (
            <span className="absolute bottom-2 left-3 bg-paper px-2 py-1 text-[11px] font-semibold text-plum">
              Composição gráfica original
            </span>
          ) : null}
        </div>
        {variant === "foto" ? (
          <p className="mt-2 text-xs text-ink/65">{FOTO_BERTHA.credito}, {FOTO_BERTHA.data}</p>
        ) : null}
        <p className="mt-4 text-xs font-semibold text-plum">{tipo}</p>
        <h3 className="mt-1 font-display text-2xl font-semibold leading-tight text-ink group-hover:underline group-hover:underline-offset-4">{titulo}</h3>
      </Link>
      <p className="mt-2 text-sm leading-relaxed text-ink/75">{linha}</p>
    </article>
  );
}

function Vitrine() {
  return (
    <Faixa fundo="bg-paper">
      <div className="py-14 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">Histórias, decisões e arquivos</h2>
          <Link to="/reportagens" className="text-sm font-semibold text-plum underline-offset-4 hover:underline">Ver reportagens ↗</Link>
        </div>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          <ChamadaEditorial variant="foto" tipo="Memória · Perfis"
            titulo="Quem abriu o caminho" linha="Trajetórias e documentos para compreender a presença das mulheres na política."
            to="/pioneiras"/>
          <ChamadaEditorial variant="documento" tipo="Reportagem · Falas públicas"
            titulo="Na voz delas" linha="Declarações públicas com data, fonte original e contexto político."
            to="/na-voz-delas"/>
          <ChamadaEditorial variant="consulta" tipo="Poder · Dados"
            titulo="Quem chega às cadeiras" linha="As eleitas de 2026 e as informações disponíveis sobre seus mandatos."
            to="/eleitas"/>
        </div>
      </div>
    </Faixa>
  );
}

function Temas() {
  return (
    <Faixa fundo="bg-cream">
      <div className="py-12 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">Seis temas, muitas entradas</h2>
          <p className="max-w-sm text-sm text-ink/70">As questões que organizam as investigações e os dados do observatório.</p>
        </div>
        <ol className="mt-8 grid grid-cols-1 border-l border-t border-rule sm:grid-cols-2 lg:grid-cols-3">
          {TEMAS.map((t)=>(
            <li key={t.slug} className="border-b border-r border-rule bg-paper">
              <Link to="/temas/$slug" params={{slug:t.slug}} className="group flex min-h-32 flex-col justify-between p-6 hover:bg-lilac/35">
                <span className="text-xs font-semibold text-plum/75">{t.ordem} · {t.pergunta}</span>
                <span className="flex items-end justify-between gap-4">
                  <span className="font-display text-[1.8rem] font-semibold text-ink">{t.nome}</span>
                  <span aria-hidden="true" className="text-xl text-plum">↗</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </Faixa>
  );
}

function Dado() {
  return (
    <Faixa fundo="bg-plum-deep text-paper">
      <div className="grid gap-10 py-12 md:grid-cols-[1fr_1fr] md:items-center md:gap-16 md:py-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-lilac">Na urna · 2026</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight md:text-4xl">A presença nas listas não se repete nas cadeiras.</h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-paper/80">
            Entre as {formatInt(NUM.seats)} cadeiras da Câmara, {formatInt(NUM.feminine)} foram conquistadas por mulheres na eleição de 2026.
          </p>
          <Link to="/votos" className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4">Conhecer o funil de candidaturas, votos e cadeiras ↗</Link>
        </div>
        <figure className="bg-paper px-7 py-9 text-ink">
          <p className="font-display text-6xl font-semibold text-plum">{formatPct(PERCENTUAL)}</p>
          <p className="mt-3 text-base leading-snug">das cadeiras da Câmara para mulheres eleitas em 2026</p>
          <div role="img" aria-label={formatInt(NUM.feminine)+" de "+formatInt(NUM.seats)+" cadeiras"}
            className="mt-8 h-5 w-full bg-cream">
            <div className="h-full bg-plum" style={{width: String(PERCENTUAL)+"%"}} />
          </div>
          <figcaption className="mt-4 text-xs leading-relaxed text-ink/70">
            Fonte: TSE, Candidatos 2026 · resultado eleitoral · base gerada em {RESULT_2026_META.baseGeneratedAt}.
            Universo: {formatInt(NUM.seats)} cadeiras de deputado federal. Recontagem do QSE.
          </figcaption>
        </figure>
      </div>
    </Faixa>
  );
}

function Biblioteca() {
  return (
    <Faixa fundo="bg-paper">
      <div className="py-14 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-plum">Biblioteca do observatório</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink md:text-4xl">Materiais para consultar e compartilhar</h2>
          </div>
          <Link to="/downloads" className="text-sm font-semibold text-plum underline-offset-4 hover:underline">Ver a biblioteca ↗</Link>
        </div>
        <div className="mt-8 grid gap-7 md:grid-cols-3">
          <article className="flex flex-col">
            <Link to="/downloads" className="group">
              <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-cream">
                <img src="/materiais/infografico-universos-quadrado.png"
                  alt="Miniatura do infográfico real do QSE sobre universos proporcionais e majoritários"
                  loading="lazy" className="h-full w-full object-contain" />
              </div>
              <p className="mt-3 text-xs font-semibold text-plum">Infográfico · PNG</p>
              <h3 className="mt-1 font-display text-xl font-semibold text-ink group-hover:underline">Dois universos eleitorais</h3>
            </Link>
            <p className="mt-2 text-sm text-ink/70">Uma peça para compreender por que as disputas não devem ser somadas.</p>
          </article>
          {[
            {href:"/materiais/cartilha-cota.pdf",tipo:"Cartilha · PDF",titulo:"O que a cota de gênero faz e o que ela não faz",descricao:"Material educativo de quatro páginas."},
            {href:"/materiais/oficina-funil.pdf",tipo:"Oficina · PDF",titulo:"O funil: candidatura, competição e poder",descricao:"Roteiro de trabalho em grupo."},
          ].map((m)=>(
            <article key={m.href} className="flex flex-col">
              <a href={m.href} className="group">
                <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-cream">
                  <img src={m.href.includes("cartilha-cota") ? "/materiais/cartilha-cota-miniatura.png" : "/materiais/oficina-funil-miniatura.png"}
                    alt="Prévia fiel da primeira página do PDF original"
                    loading="lazy" className="h-full w-full object-contain" />
                </div>
                <p className="mt-3 text-xs font-semibold text-plum">{m.tipo}</p>
                <h3 className="mt-1 font-display text-xl font-semibold text-ink group-hover:underline">{m.titulo}</h3>
              </a>
              <p className="mt-2 text-sm text-ink/70">{m.descricao}</p>
            </article>
          ))}
        </div>
      </div>
    </Faixa>
  );
}

function Consulta() {
  return (
    <Faixa fundo="bg-plum text-paper">
      <div className="grid gap-8 py-12 md:grid-cols-[.9fr_1.1fr] md:py-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-lilac">Dados abertos</p>
          <h2 className="mt-3 font-display text-3xl font-semibold">A pesquisa continua nos dados</h2>
          <p className="mt-3 max-w-md text-base text-paper/80">Busque pessoas e partidos, compare resultados e consulte a metodologia de cada levantamento.</p>
        </div>
        <nav aria-label="Explorar dados" className="grid gap-3 sm:grid-cols-2">
          {[
            {to:"/eleitas" as const,label:"Eleitas"},
            {to:"/dados" as const,label:"Explorar dados"},
            {to:"/comparar" as const,label:"Comparar"},
            {to:"/metodo" as const,label:"Método e fontes"},
          ].map(x=>(
            <Link key={x.to} to={x.to} className="flex min-h-14 items-center justify-between border-b border-paper/40 text-base font-semibold text-paper hover:bg-paper/10">
              {x.label} <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>
      </div>
    </Faixa>
  );
}

/** Versão visual em revisão: não substituir a produção publicada sem avaliação. */
export function CapaEditorialV3() {
  return (
    <>
      <Abertura />
      <Vitrine />
      <Temas />
      <Dado />
      <Biblioteca />
      <Consulta />
    </>
  );
}
