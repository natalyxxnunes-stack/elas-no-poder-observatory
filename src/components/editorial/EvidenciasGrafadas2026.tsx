import { FOTOS } from "@/data/fotos";
import { RECORTE_META, RECORTE_TOTAL, type Recorte } from "@/data/partido-uf-2026";
import { FINANCE_BASE_LABEL, financeSnapshot, DUPLICATE_ROWS_REMOVED } from "@/data/tse-finance-snapshot";
import { formatInt, formatPct } from "@/lib/format-br";

/**
 * Figuras de apuração editorial para páginas em que os próprios registros
 * devem ganhar presença visual. Não são fac-símiles nem fotografias artificiais.
 */

type LinhaComparada = { id: string; titulo: string; registro: Recorte | undefined };

export function DuasEtapasComparador({ linhas }: { linhas: readonly LinhaComparada[] }) {
  const minimo = 20;
  return (
    <section id="comparar-distancia" aria-labelledby="comparar-distancia-titulo"
      className="relative left-1/2 -ml-[50vw] w-screen bg-cream text-ink">
      <div className="mx-auto max-w-7xl px-5 py-11 md:px-8 md:py-16">
        <div className="grid gap-6 md:grid-cols-[.82fr_1.18fr] md:items-end">
          <div>
            <p className="text-[13px] font-semibold text-plum">Infografia de dados · Recorte selecionado</p>
            <h2 id="comparar-distancia-titulo"
              className="mt-3 font-display text-[clamp(2rem,3.8vw,3.6rem)] leading-[1.08]">
              Da lista às cadeiras: a distância nas proporções
            </h2>
          </div>
          <p className="max-w-2xl text-[15px] leading-relaxed text-ink/80">
            Mulheres entre todas as candidaturas e entre as pessoas eleitas a deputado:
            duas medidas, cada uma com o próprio denominador. A diferença é em pontos
            percentuais. Nenhuma barra representa a trajetória individual das candidatas.
          </p>
        </div>
        <ol className="mt-8 grid gap-4 md:grid-cols-2">
          {linhas.map(({ id, titulo, registro }) => {
            if (!registro) return null;
            const suficiente = registro.candidaturas >= minimo && registro.eleitos >= minimo;
            const candidatura = registro.candidaturas ? 100 * registro.candidatas / registro.candidaturas : 0;
            const cadeira = registro.eleitos ? 100 * registro.eleitas / registro.eleitos : 0;
            const dif = cadeira - candidatura;
            return (
              <li key={id} className={id === "brasil"
                ? "min-w-0 border-t-[5px] border-ink bg-[var(--art-gold)] p-5 md:p-7"
                : "min-w-0 border-t-[5px] border-plum bg-paper p-5 md:p-7"}>
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="font-display text-2xl text-ink">{titulo}</h3>
                  <span className="font-mono text-[12px] text-ink/75">
                    {formatInt(registro.candidaturas)} candidaturas · {formatInt(registro.eleitos)} eleitos
                  </span>
                </div>
                {suficiente ? (
                  <figure className="mt-6" aria-label={titulo + ": comparação da presença de mulheres em dois universos"}>
                    <div className="space-y-4">
                      {[
                        { rotulo: "Candidaturas", valor: candidatura, parte: registro.candidatas, todo: registro.candidaturas, cor: "bg-plum" },
                        { rotulo: "Cadeiras", valor: cadeira, parte: registro.eleitas, todo: registro.eleitos, cor: "bg-[#c53f22]" },
                      ].map((d) => (
                        <div key={d.rotulo}>
                          <div className="flex flex-wrap items-baseline justify-between gap-2 text-[14px]">
                            <span className="font-semibold">{d.rotulo}</span>
                            <strong className="font-mono text-[14px] tabular-nums">
                              {formatPct(d.valor)} · {formatInt(d.parte)} de {formatInt(d.todo)}
                            </strong>
                          </div>
                          <div className="mt-2 h-3 w-full bg-ink/15" aria-hidden="true">
                            <div className={"h-full " + d.cor}
                              style={{ width: String(Math.max(0, Math.min(100, d.valor))) + "%" }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <figcaption className="mt-5 border-t border-ink/20 pt-3 text-[13px] leading-relaxed text-ink/80">
                      Cadeiras menos candidaturas: <strong>{dif > 0 ? "+" : ""}{formatPct(dif)} p.p.</strong>.
                      A proporção não é taxa de eleição.
                    </figcaption>
                  </figure>
                ) : (
                  <p className="mt-5 border-t border-rule pt-5 text-[14px] leading-relaxed text-ink/80">
                    Base pequena. Sem barras percentuais: {formatInt(registro.candidatas)} de
                    {" "}{formatInt(registro.candidaturas)} candidaturas e {formatInt(registro.eleitas)} de
                    {" "}{formatInt(registro.eleitos)} pessoas eleitas são mulheres.
                  </p>
                )}
              </li>
            );
          })}
        </ol>
        <p className="mt-5 text-[13px] leading-relaxed text-ink/75">
          TSE · candidaturas e resultados de 2026 · base de {RECORTE_META.baseGeneratedAt}.
          Universo: deputado federal, estadual e distrital; Senado, governos e Presidência excluídos.
        </p>
      </div>
    </section>
  );
}

export function CapturaPortalDados() {
  return (
    <figure className="mt-7 max-w-xl border-2 border-ink bg-paper p-3 md:p-4">
      <a href="/documentos/tse-candidatos-2026-portal.png" target="_blank" rel="noreferrer"
        aria-label="Ampliar captura da página Candidatos 2026 do portal do TSE">
        <img src="/documentos/tse-candidatos-2026-portal.png"
          alt="Captura da página Candidatos 2026 no portal de Dados Abertos do TSE"
          loading="lazy" className="block aspect-[11/8] w-full object-cover object-top" />
      </a>
      <figcaption className="mt-3 font-mono text-[12px] leading-relaxed text-ink/80">
        Captura da interface em 15/11/2026 · TSE, Dados Abertos. Mostra a página
        de disponibilização, não o arquivo CSV, nem a prestação de contas.
        A licença da base de dados não se aplica automaticamente à interface.
        <a href="https://dadosabertos.tse.jus.br/dataset/candidatos-2026"
          target="_blank" rel="noreferrer"
          className="mt-2 block font-semibold text-plum underline underline-offset-4">
          Abrir a página original ↗
        </a>
      </figcaption>
    </figure>
  );
}

export function FichaArquivoFinanceiro() {
  return (
    <figure aria-label="Metadados da base financeira efetivamente processada"
      className="mt-8 border-2 border-ink bg-paper p-5 text-ink md:p-6">
      <figcaption className="border-b border-ink/35 pb-3">
        <span className="font-mono text-[12px] font-semibold uppercase tracking-wide">
          Cadastro de proveniência · Prestação de Contas 2026
        </span>
        <strong className="mt-2 block font-display text-xl leading-tight">
          Metadados da extração, não fac-símile do TSE
        </strong>
      </figcaption>
      <dl className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-[12px] font-semibold text-ink/75">Fotografia da base</dt>
          <dd className="mt-1 font-mono text-[15px] font-semibold">{FINANCE_BASE_LABEL}</dd>
        </div>
        <div>
          <dt className="text-[12px] font-semibold text-ink/75">Linhas de receita processadas</dt>
          <dd className="mt-1 font-display text-2xl">{formatInt(financeSnapshot.revenueRowsProcessed)}</dd>
        </div>
        <div className="border-t border-rule pt-3 sm:col-span-2">
          <dt className="text-[12px] font-semibold text-ink/75">Linhas duplicadas integralmente removidas</dt>
          <dd className="mt-1 font-display text-2xl">{formatInt(DUPLICATE_ROWS_REMOVED)}</dd>
        </div>
      </dl>
      <a href={financeSnapshot.datasetUrl} target="_blank" rel="noreferrer"
        className="mt-5 inline-flex min-h-11 items-center border-t border-ink/30 pt-3 text-[14px] font-semibold text-plum underline underline-offset-4">
        Conferir conjunto original de contas eleitorais no TSE ↗
      </a>
    </figure>
  );
}

export function ProporcaoCadeirasRelatorio() {
  const parte = RECORTE_TOTAL.eleitas;
  const todo = RECORTE_TOTAL.eleitos;
  const valor = todo ? 100 * parte / todo : 0;
  return (
    <figure aria-label="Cadeiras de deputado ocupadas por mulheres na eleição de 2026"
      className="mt-8 border-y border-paper/30 py-6">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-[13px] font-semibold text-[var(--art-gold)]">
            Gráfico de síntese · Deputados em 2026
          </p>
          <h3 className="mt-2 font-display text-2xl leading-tight text-paper md:text-3xl">
            A participação feminina nas cadeiras eleitas
          </h3>
        </div>
        <strong className="font-display text-[clamp(2.8rem,5vw,4.8rem)] leading-none text-[var(--art-gold)]">
          {formatPct(valor)}
        </strong>
      </div>
      <div role="img" aria-label={formatInt(parte) + " mulheres eleitas entre " + formatInt(todo) + " cadeiras de deputado"}
        className="mt-5 flex h-6 w-full overflow-hidden bg-paper/25">
        <span className="h-full bg-[var(--art-gold)]" style={{ width: String(valor) + "%" }} />
        <span className="h-full flex-1 bg-paper/25" />
      </div>
      <figcaption className="mt-3 max-w-3xl font-mono text-[12px] leading-relaxed text-paper/85">
        {formatInt(parte)} mulheres de {formatInt(todo)} eleitos para Câmara, assembleias e Câmara
        Legislativa do DF, somados apenas por serem cadeiras de deputado.
        TSE · 2026 · base de {RECORTE_META.baseGeneratedAt}.
        Não inclui Senado, governos, Presidência nem cargos de direção após a posse.
      </figcaption>
    </figure>
  );
}

export function FotoPlenarioRelatorio() {
  const foto = FOTOS["plenario-camara-junho-2026"];
  if (!foto || foto.licenca === "verificacao-pendente") return null;
  return (
    <figure className="mt-9 grid gap-6 border-t border-paper/25 pt-8 md:grid-cols-[1.05fr_.95fr] md:items-center">
      <div className="min-w-0">
        <img src={foto.src} alt={foto.alt} loading="lazy"
          className="block aspect-[3/2] w-full object-cover" />
        <figcaption className="mt-3 text-[12px] leading-relaxed text-paper/85">
          {foto.credito} · {foto.acervo} · {foto.data}.{" "}
          <a href={foto.licencaUrl} target="_blank" rel="noreferrer"
            className="font-semibold text-paper underline underline-offset-4">
            Origem e condições de uso ↗
          </a>
        </figcaption>
      </div>
      <div>
        <p className="text-[13px] font-semibold text-[var(--art-gold)]">
          Fotografia contextual · Legislatura em curso
        </p>
        <p className="mt-3 font-display text-2xl leading-snug text-paper md:text-3xl">
          A fotografia é anterior à eleição de outubro.
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-paper/90">
          Registro de sessão da Câmara em junho de 2026. A imagem ilustra o ambiente
          institucional em que os atos parlamentares ocorreram; não identifica os
          votos individuais aqui recontados nem o conjunto das mulheres eleitas para 2027.
        </p>
      </div>
    </figure>
  );
}