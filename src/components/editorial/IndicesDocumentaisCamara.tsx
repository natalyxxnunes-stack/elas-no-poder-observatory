import type { Fala } from "@/data/falas";
import { VOTACOES, VOTACOES_META } from "@/data/votacoes-camara";
import { formatDateBR } from "@/lib/format-br";

/**
 * Estas peças são índices jornalísticos para alcançar o DOCUMENTO ORIGINAL.
 * As fichas são tipografia editorial e não reproduções visuais de documentos.
 * Os links das votações seguem os identificadores preservados na base local
 * e os caminhos públicos da API v2 da Câmara.
 */
export function DossieVotacoesCamara() {
  return (
    <section id="fontes-nominais"
      aria-labelledby="fontes-nominais-titulo"
      className="relative left-1/2 -ml-[50vw] w-screen bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <div className="grid gap-7 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <p className="text-[13px] font-semibold text-[var(--art-gold)]">
              Caderno de evidências · Câmara dos Deputados
            </p>
            <h2 id="fontes-nominais-titulo"
              className="mt-4 max-w-lg font-display text-[clamp(2.1rem,4.2vw,4rem)] leading-[1.06]">
              Seis votações, seis identificadores oficiais
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-paper/85">
              Cada identificador leva à ficha da votação e à relação nominal de votos
              no sistema público da Câmara. O registro é a fonte da contagem;
              a presença na base não esclarece, isoladamente, a intenção de quem votou.
            </p>
            <p className="mt-5 border-l-4 border-[var(--art-gold)] pl-4 text-[13px] leading-relaxed text-paper/80">
              Links para respostas da API em formato de dados, não fac-símiles das
              atas. As datas são das votações; a coleta foi feita em
              {" "}{VOTACOES_META.coletaEm}.
            </p>
            <a href="https://dadosabertos.camara.leg.br/swagger/api.html"
              target="_blank" rel="noreferrer"
              className="mt-6 inline-flex min-h-11 items-center font-semibold text-paper underline underline-offset-4">
              Documentação da API da Câmara ↗
            </a>
          </div>
          <ol className="grid gap-3 sm:grid-cols-2">
            {VOTACOES.map((v, i) => {
              const id = encodeURIComponent(v.id);
              return (
                <li key={v.id}
                  className={"min-w-0 border-t-4 p-5 text-ink " +
                    (i % 3 === 0 ? "border-[#c53f22] bg-cream" : i % 3 === 1
                      ? "border-[var(--art-gold)] bg-paper" : "border-plum bg-[var(--art-gold)]")}>
                  <p className="font-mono text-[12px] font-semibold text-plum">
                    {String(i + 1).padStart(2, "0")} · {formatDateBR(v.data)}
                  </p>
                  <h3 className="mt-3 font-display text-xl leading-tight">{v.titulo}</h3>
                  <p className="mt-3 font-mono text-[13px] leading-relaxed">
                    ID {v.id} · {v.proposicao}
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink/75">{v.etapa}</p>
                  <div className="mt-5 flex flex-col gap-2 border-t border-ink/25 pt-3">
                    <a href={"https://dadosabertos.camara.leg.br/api/v2/votacoes/" + id}
                      target="_blank" rel="noreferrer"
                      className="inline-flex min-h-10 items-center text-[14px] font-semibold underline underline-offset-4">
                      Registro oficial da votação ↗
                    </a>
                    <a href={"https://dadosabertos.camara.leg.br/api/v2/votacoes/" + id + "/votos"}
                      target="_blank" rel="noreferrer"
                      className="inline-flex min-h-10 items-center text-[14px] font-semibold underline underline-offset-4">
                      Votos individuais no registro ↗
                    </a>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
        <p className="mt-6 max-w-4xl border-t border-paper/30 pt-5 text-[13px] leading-relaxed text-paper/80">
          Figura de indexação editorial. As relações nominais podem registrar ausência,
          abstenção e obstrução em categorias próprias; a informação relativa a
          deputadas em exercício é recontada pelo projeto segundo a metodologia
          publicada. Os documentos devem ser interpretados com o texto posto em votação.
        </p>
      </div>
    </section>
  );
}

export function IndiceDiariosCamara({ falas }: { falas: readonly Fala[] }) {
  const registradas = falas.filter((f) => f.publicar);
  return (
    <section id="arquivo-dos-diarios"
      aria-labelledby="arquivo-dos-diarios-titulo"
      className="relative left-1/2 -ml-[50vw] w-screen bg-[var(--art-gold)] text-ink">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <div className="grid gap-7 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <p className="text-[13px] font-semibold text-plum">
              Documentos consultáveis · Diário da Câmara
            </p>
            <h2 id="arquivo-dos-diarios-titulo"
              className="mt-4 max-w-xl font-display text-[clamp(2.1rem,4vw,3.9rem)] leading-[1.07]">
              A fala tem data. O Diário tem edição e página.
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed">
              A edição de publicação e a página apontam para o documento
              institucional. Muitas falas ocorreram no dia anterior à edição.
              Por isso preservamos duas datas e indicamos o registro exato, sem
              apresentar tipografia do site como imagem do Diário.
            </p>
            <p className="mt-4 text-[13px] leading-relaxed text-ink/80">
              Este catálogo reúne apenas declarações já autorizadas à publicação
              editorial na base da reportagem. O acervo original é da Câmara
              dos Deputados; a seleção e a organização são do observatório.
            </p>
            <a href="https://www2.camara.leg.br/a-camara/documentos-e-pesquisa/diariosdacamara"
              target="_blank" rel="noreferrer"
              className="mt-6 inline-flex min-h-11 items-center font-semibold text-ink underline underline-offset-4">
              Acessar o acervo oficial de Diários ↗
            </a>
          </div>
          <div className="min-w-0">
            <figure className="mb-5 border-t-[5px] border-ink bg-paper p-4 text-ink md:p-5">
              <p className="font-mono text-[12px] font-semibold text-plum">
                Recorte original · Índice de discursos da Câmara
              </p>
              <a href="/documentos/camara-sitaq-julia-zanatta-2026-03-10-p163.png"
                target="_blank" rel="noreferrer"
                className="mt-3 block border border-ink/20 bg-white focus-visible:outline-2"
                aria-label="Ampliar o recorte original da linha do catálogo da Câmara">
                <img src="/documentos/camara-sitaq-julia-zanatta-2026-03-10-p163.png"
                  loading="lazy" className="block h-auto w-full"
                  alt="Linha da tabela de discursos da Câmara: 10/03/2026, sessão 21.2026, Julia Zanatta, PL-SC, 19h20, DCD de 11/03/2026, página 163" />
              </a>
              <figcaption className="mt-3 text-[13px] leading-relaxed text-ink/85">
                Captura fiel de <strong>uma linha</strong> do resultado de pesquisa da Câmara
                (consulta de 16/11/2026). Localiza o discurso de Julia Zanatta de 10/03/2026
                na edição do Diário de 11/03/2026, p. 163. Este recorte <strong>não</strong> é
                reprodução da página do Diário nem comprova isoladamente o teor integral da fala.
                <a href="https://www.camara.leg.br/internet/SitaqWeb/ResultadoPesquisaDiscursos.asp?BasePesq=plenario&CampoOrdenacao=dtSessao&PageSize=50&TipoOrdenacao=DESC&btnPesqAvan=Pesquisar&dtFim=31%2F12%2F2026&dtInicio=01%2F01%2F2026&txOrador=Julia+Zanatta"
                  target="_blank" rel="noreferrer"
                  className="mt-2 block font-semibold text-plum underline underline-offset-4">
                  Abrir a pesquisa no portal da Câmara ↗
                </a>
              </figcaption>
            </figure>
            <ol className="grid gap-3 sm:grid-cols-2">
            {registradas.map((f, i) => (
              <li key={f.id}
                className={"min-w-0 border-t-[5px] px-5 py-5 " +
                  (i % 3 === 0
                    ? "border-[#c53f22] bg-paper"
                    : i % 3 === 1 ? "border-plum bg-cream" : "border-ink bg-paper")}>
                <p className="font-mono text-[12px] font-semibold text-plum">
                  {String(i + 1).padStart(2, "0")} · Discurso de {f.data}
                </p>
                <h3 className="mt-3 font-display text-xl leading-tight">{f.pessoa}</h3>
                <p className="mt-2 text-[13px] leading-relaxed">{f.onde}</p>
                <p className="mt-4 border-t border-ink/25 pt-3 font-mono text-[12px] leading-relaxed">
                  {f.fonteRotulo}
                </p>
                <a href={f.fonteUrl} target="_blank" rel="noreferrer"
                  className="mt-3 inline-flex min-h-11 items-center text-[14px] font-semibold text-plum underline underline-offset-4">
                  Abrir a publicação original ↗
                </a>
                <a href={"#" + f.id}
                  className="mt-1 block text-[13px] font-semibold underline underline-offset-4">
                  Ler a fala e seu contexto na reportagem ↓
                </a>
              </li>
            ))}
            </ol>
          </div>
        </div>
        <p className="mt-6 max-w-4xl border-t border-ink/30 pt-4 text-[13px] leading-relaxed text-ink/80">
          Fichas de localização produzidas pelo observatório. São links para
          publicações oficiais, não imagens das páginas dos Diários. Os textos
          citados no corpo da reportagem devem ser conferidos no contexto integral,
          e correções ou respostas são incorporadas com data quando recebidas.
        </p>
      </div>
    </section>
  );
}
