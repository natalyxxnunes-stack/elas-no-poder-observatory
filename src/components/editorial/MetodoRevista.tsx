import { FOTOS } from "@/data/fotos";
import { FINANCE_BASE_LABEL, financeSnapshot } from "@/data/tse-finance-snapshot";
import { formatPct } from "@/lib/format-br";

/**
 * Linguagem de revista do Método: imagem real do portal TSE, infografia de
 * operações, fotografia documental pertinente e conta financeira aberta.
 * É um tratamento exclusivamente desta página, não um template de abertura.
 *
 * Os módulos de documentação técnica e suas âncoras continuam na rota.
 */
const TSE_DATASET = "https://dadosabertos.tse.jus.br/dataset/candidatos-2026";
const FOTO_BANCADA = FOTOS["bancada-feminina-camara-marco-2026"]!;
const REAIS = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export function MetodoCapaRevista({
  candidaturaGeradaEm,
}: {
  candidaturaGeradaEm: string;
}) {
  return (
    <header className="relative left-1/2 -ml-[50vw] w-screen bg-plum-deep text-paper">
      <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[52fr_48fr]">
        <div className="flex min-w-0 flex-col justify-center px-5 py-12 md:px-8 md:py-16 lg:py-20 lg:pl-[max(2rem,calc((100vw-80rem)/2))] lg:pr-12">
          <p className="text-[13px] font-semibold text-[var(--art-gold)]">
            Método · Edição 2026
          </p>
          <h1 className="mt-8 max-w-2xl font-display text-[clamp(3.8rem,8vw,8rem)] font-semibold leading-[.94] tracking-tight">
            Como sabemos<span className="text-[var(--art-gold)]">?</span>
          </h1>
          <p className="mt-7 max-w-2xl font-display text-[clamp(1.5rem,2.8vw,2.55rem)] leading-tight">
            Todo número precisa mostrar de onde veio.
          </p>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-paper/85">
            Os arquivos do TSE, as escolhas da apuração, as contas que podem ser
            refeitas e os limites do que conseguimos afirmar. Um número, uma conta verificável.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3">
            <a
              href={TSE_DATASET}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center border-b-2 border-[var(--art-gold)] text-sm font-semibold text-paper focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              Abrir a fonte original no TSE <span aria-hidden="true" className="ml-3">↗</span>
            </a>
            <a
              href="#metodo-arquivo-tecnico"
              className="inline-flex min-h-11 items-center border-b border-paper/70 text-sm font-semibold text-paper focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              Ir ao caderno técnico <span aria-hidden="true" className="ml-3">↓</span>
            </a>
          </div>
        </div>
        <div className="relative min-w-0 bg-ink px-5 py-10 md:px-8 md:py-14 lg:flex lg:items-center lg:pl-10 lg:pr-[max(2rem,calc((100vw-80rem)/2))]">
          <figure id="metodo-documento-original" className="relative min-w-0 w-full border border-ink/20 bg-paper text-ink shadow-[0_18px_45px_rgba(0,0,0,.25)]">
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 bg-[var(--art-gold)] px-4 py-3 text-[12px] font-semibold text-ink">
              <span>Documento de origem · 01</span>
              <span className="font-mono">TSE / 2026</span>
            </div>
            <a
              href="/documentos/tse-candidatos-2026-portal.png"
              target="_blank"
              rel="noreferrer"
              aria-label="Ampliar a captura documental da página Candidatos 2026 do TSE"
              className="block focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <img
                src="/documentos/tse-candidatos-2026-portal.png"
                alt="Captura fiel da página Candidatos - 2026 do Portal de Dados Abertos do TSE, com o título do conjunto e a informação de licença visíveis"
                width={1100}
                height={850}
                loading="eager"
                className="aspect-[11/8] w-full object-cover object-top"
              />
            </a>
            <figcaption className="px-4 py-5 md:px-5">
              <strong className="block font-display text-2xl leading-tight">Candidatos — 2026</strong>
              <p className="mt-2 text-[13px] leading-relaxed text-ink/80">
                Captura da página oficial que disponibiliza o conjunto de dados.
                O arquivo CSV não está reproduzido na imagem.
              </p>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                <a
                  href="/documentos/tse-candidatos-2026-portal.png"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-10 items-center text-[14px] font-semibold text-plum underline underline-offset-4"
                >
                  Ampliar a captura ↗
                </a>
                <a
                  href={TSE_DATASET}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-10 items-center text-[14px] font-semibold text-plum underline underline-offset-4"
                >
                  Consultar o conjunto original no TSE ↗
                </a>
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-ink/80">
                Fonte: Portal de Dados Abertos do TSE/AGEL; captura de 15/11/2026.
                A classificação da licença do conjunto não é, por si só,
                uma declaração de licença da interface reproduzida.
                Registro de candidaturas usado nesta página: arquivo gerado em {candidaturaGeradaEm}.
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </header>
  );
}

export function MetodoIntroducaoRevista() {
  return (
    <section aria-labelledby="metodo-documento-recusar" className="relative left-1/2 -ml-[50vw] w-screen bg-paper text-ink">
      <div className="mx-auto grid max-w-7xl gap-x-16 gap-y-6 px-5 py-14 md:grid-cols-2 md:px-8 md:py-20">
        <div>
          <p className="text-[13px] font-semibold text-plum">A explicação · Como ler</p>
          <h2 id="metodo-documento-recusar" className="mt-4 max-w-xl font-display text-[clamp(2.1rem,3.6vw,3.4rem)] leading-[1.07]">
            O documento, o recorte e a conclusão.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/80">
            As bases públicas são o ponto de partida. Cada indicador exige
            definir quais registros entram, qual cargo é observado e que
            comparação é permitida.
          </p>
        </div>
        <div className="md:pt-9">
          <p className="max-w-xl text-base leading-relaxed text-ink/80">
            A data em que o TSE gerou um arquivo é diferente da data em que
            o observatório o processou. Receitas e candidaturas também podem
            ter fotografias distintas.
          </p>
          <p className="mt-6 max-w-lg border-l-4 border-[var(--art-coral)] pl-5 font-display text-[clamp(1.4rem,2.4vw,2rem)] leading-snug">
            Uma conta verificável precisa revelar o seu denominador.
          </p>
        </div>
      </div>
    </section>
  );
}

const PASSOS = [
  {
    n: "01",
    titulo: "Obter a fonte",
    descricao: "Arquivos oficiais de candidaturas, resultados ou prestações de contas.",
    nota: "Fonte identificada",
  },
  {
    n: "02",
    titulo: "Definir o universo",
    descricao: "Cargo, tipo de disputa e categorias declaradas, sem misturar denominadores.",
    nota: "Recorte declarado",
  },
  {
    n: "03",
    titulo: "Conferir e cruzar",
    descricao: "Campos, identificadores, datas e compatibilidade entre os registros.",
    nota: "Base versionada",
  },
  {
    n: "04",
    titulo: "Publicar a conta",
    descricao: "Numerador, denominador, fonte, data e limites de interpretação.",
    nota: "Resultado auditável",
  },
] as const;

export function MetodoFluxoEditorial() {
  return (
    <section aria-labelledby="metodo-fluxo-titulo" className="relative left-1/2 -ml-[50vw] w-screen bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <div className="grid items-end gap-6 md:grid-cols-[1.7fr_1fr] md:gap-14">
          <div>
            <p className="text-[13px] font-semibold text-[var(--art-gold)]">
              Visualização autoral · Processo de apuração
            </p>
            <h2 id="metodo-fluxo-titulo" className="mt-4 max-w-3xl font-display text-[clamp(2.1rem,4.2vw,3.8rem)] leading-[1.07]">
              Do arquivo oficial ao indicador publicado.
            </h2>
          </div>
          <p className="border-l-[3px] border-[var(--art-coral)] pl-5 text-[14px] leading-relaxed text-paper/80">
            Esquema das operações do observatório. A sequência explica o trabalho,
            sem representar um funil quantitativo de candidatas ou atribuir
            valores às etapas.
          </p>
        </div>
        <div className="relative mt-10 md:mt-12">
          <svg
            aria-hidden="true"
            className="absolute left-[calc(12.5%-1rem)] right-[calc(12.5%-1rem)] top-[2.25rem] hidden h-1 w-[calc(75%+2rem)] md:block"
            viewBox="0 0 1000 10"
            preserveAspectRatio="none"
          >
            <path d="M0 5H1000" stroke="var(--art-coral)" strokeWidth="5" />
          </svg>
          <ol className="grid gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-4">
            {PASSOS.map((passo, index) => (
              <li key={passo.n} className="relative min-w-0">
                <div
                  className="relative z-10 flex h-[76px] w-[76px] items-center justify-center rounded-full border-[3px] border-[var(--art-gold)] font-display text-3xl italic"
                  style={{ backgroundColor: index === 3 ? "var(--art-coral)" : index === 2 ? "var(--art-violet)" : "var(--art-plum)", color: index === 3 ? "var(--ink)" : "white" }}
                >
                  {passo.n}
                </div>
                <h3 className="mt-5 font-display text-[clamp(1.35rem,2.25vw,1.85rem)] leading-tight">
                  {passo.titulo}
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-paper/80">
                  {passo.descricao}
                </p>
                <p className="mt-3 font-mono text-[12px] text-[var(--art-gold)]">
                  {passo.n} / {passo.nota}
                </p>
              </li>
            ))}
          </ol>
        </div>
        <p className="mt-12 max-w-4xl border-t border-paper/25 pt-5 text-[13px] leading-relaxed text-paper/70">
          Ilustração esquemática do método descrito nos arquivos do projeto.
          Para repetir os procedimentos completos, consulte as etapas e os
          metadados na parte técnica desta página.
        </p>
      </div>
    </section>
  );
}

export function MetodoFotoContextualizada() {
  return (
    <section aria-labelledby="metodo-representacao-titulo" className="relative left-1/2 -ml-[50vw] w-screen">
      <div className="grid lg:grid-cols-[56fr_44fr]">
        <figure className="min-w-0 bg-[#c53f22] px-5 py-9 text-paper md:px-8 md:py-11 lg:pl-[max(2rem,calc((100vw-80rem)/2))] lg:pr-10">
          <img
            src={FOTO_BANCADA.src}
            alt={FOTO_BANCADA.alt}
            width={1200}
            height={800}
            loading="lazy"
            className="aspect-[3/2] w-full border-[8px] border-paper object-cover md:border-[11px]"
          />
          <figcaption className="mt-3 max-w-2xl text-[13px] leading-relaxed text-paper">
            Fotografia documental: bancada feminina da Câmara, março de 2026.
            Foto: {FOTO_BANCADA.credito}. Esta fotografia é anterior à eleição
            de 2026 e não identifica quais mulheres foram eleitas no pleito.
            {" "}
            <a href={FOTO_BANCADA.licencaUrl} target="_blank" rel="noreferrer" className="font-semibold text-paper underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2">
              Origem e condições de uso ↗
            </a>
          </figcaption>
        </figure>
        <div className="flex flex-col justify-center bg-paper px-5 py-10 text-ink md:px-8 md:py-14 lg:pl-12 lg:pr-[max(2rem,calc((100vw-80rem)/2))]">
          <p className="text-[13px] font-semibold text-plum">Representação · Leitura crítica</p>
          <h2 id="metodo-representacao-titulo" className="mt-4 max-w-xl font-display text-[clamp(2.1rem,3.6vw,3.25rem)] leading-[1.08]">
            Presença e exercício do poder exigem medidas diferentes.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/80">
            A fotografia registra pessoas em um acontecimento institucional.
            O resultado eleitoral permite identificar quem conquistou uma vaga.
            Para investigar comissões, lideranças e votações, precisamos de
            outras fontes e de outro recorte temporal.
          </p>
          <p className="mt-6 max-w-xl border-t-2 border-plum pt-5 text-[15px] leading-relaxed">
            A pergunta do observatório acompanha o caminho entre candidatura
            e poder. Cada etapa exige evidências próprias.
          </p>
        </div>
      </div>
    </section>
  );
}

export function MetodoContaRevista({
  receitaBrancas,
}: {
  receitaBrancas: number;
}) {
  const denominador = financeSnapshot.universes.proporcional.feminineRevenue;
  const percentual = (receitaBrancas / denominador) * 100;
  const percentualExibido = formatPct(percentual);

  return (
    <section id="metodo-exemplo" aria-labelledby="metodo-exemplo-titulo" className="relative left-1/2 -ml-[50vw] w-screen bg-plum text-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[.78fr_1.22fr] lg:gap-14">
        <div>
          <p className="text-[13px] font-semibold text-[var(--art-gold)]">
            Caderno de dados · 2026
          </p>
          <h2 id="metodo-exemplo-titulo" className="mt-4 max-w-xl font-display text-[clamp(2.15rem,4vw,3.45rem)] leading-[1.07]">
            Uma conta aberta, com fonte e limite.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-paper/85">
            Exemplo da prestação de contas. Considera receitas declaradas
            por candidatas a cargos proporcionais, classificadas pelas
            informações de gênero e cor/raça do registro de candidaturas.
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-paper/70">
            O indicador não representa a distribuição de todos os recursos
            eleitorais, nem permite inferir, isoladamente, intenção ou favorecimento.
          </p>
        </div>
        <figure className="min-w-0 bg-ink p-6 md:p-9">
          <p className="font-display text-[clamp(4.3rem,9vw,7.2rem)] font-semibold leading-none tabular-nums text-[var(--art-gold)]">
            {percentualExibido}
          </p>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-paper/90">
            Parcela da receita declarada pelas candidatas proporcionais
            recebida por candidatas autodeclaradas brancas.
          </p>
          <div
            role="img"
            aria-label={`${percentualExibido} da receita declarada por todas as candidatas proporcionais foi recebida por candidatas autodeclaradas brancas.`}
            className="mt-7 flex h-5 w-full overflow-hidden bg-paper/80"
          >
            <span className="h-full bg-[var(--art-gold)]" style={{ width: `${percentual}%` }} />
          </div>
          <dl className="mt-6 grid gap-5 border-t border-paper/25 pt-5 md:grid-cols-2">
            <div className="min-w-0">
              <dt className="text-[12px] leading-snug text-paper/75">
                Numerador · candidatas brancas
              </dt>
              <dd className="mt-2 break-words font-mono text-[clamp(.88rem,1.65vw,1.08rem)] tabular-nums text-paper">
                {REAIS.format(receitaBrancas)}
              </dd>
            </div>
            <div className="min-w-0">
              <dt className="text-[12px] leading-snug text-paper/75">
                Denominador · todas as candidatas proporcionais
              </dt>
              <dd className="mt-2 break-words font-mono text-[clamp(.88rem,1.65vw,1.08rem)] tabular-nums text-paper">
                {REAIS.format(denominador)}
              </dd>
            </div>
          </dl>
          <figcaption className="mt-6 text-[12px] leading-relaxed text-paper/70">
            Cálculo: numerador ÷ denominador × 100; percentual arredondado
            a uma casa decimal, a partir dos valores não arredondados.
            Fonte: TSE, prestação de contas gerada em {FINANCE_BASE_LABEL},
            cruzada com o registro de candidaturas de 15/11/2026.
            Receitas declaradas, sujeitas a complementações, retificações e julgamento.
          </figcaption>
          <a href="#financiamento" className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-paper underline underline-offset-4">
            Consultar critérios do financiamento ↗
          </a>
        </figure>
      </div>
    </section>
  );
}
