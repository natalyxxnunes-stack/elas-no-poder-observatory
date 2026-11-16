import { FEFC_DOCUMENTOS_OFICIAIS } from "@/data/documentos-eleitorais-2026";

/**
 * Reproduções LITERAIS de páginas selecionadas de PDFs oficiais do TSE,
 * baixados e conferidos por SHA-256 contra os documentos originais.
 * Ao contrário dos cadernos tipográficos, estas imagens provêm de páginas
 * dos documentos; a legenda indica a natureza e a página exatas.
 * Apenas três páginas auditadas foram incorporadas, sem anexos sensíveis.
 */
const paginaUniao = {
  src: "/documentos/tse-uniao-brasil-resolucao-cen043-2026.png",
  href: FEFC_DOCUMENTOS_OFICIAIS[2].href,
  alt: "Primeira página da Resolução CEN 043/2026 do União Brasil, com critérios declarados para o FEFC, anexada ao PJe do TSE",
  rotulo: "União Brasil · Resolução CEN 043/2026",
  local: "Documento de comprovação · página 24 de 33 do PDF reunido no PJe",
  leitura: "O artigo 1º registra a distribuição planejada de 20% do fundo a candidaturas majoritárias e 80% a proporcionais, com possibilidade de ajustes pela direção nacional. É regra declarada, não demonstração dos valores efetivamente transferidos.",
};
const paginaFederacao = {
  src: "/documentos/tse-fe-brasil-resolucao-14-2026.png",
  href: FEFC_DOCUMENTOS_OFICIAIS[1].href,
  alt: "Primeira página da Resolução 14/2026 da Federação Brasil da Esperança sobre critérios de distribuição do FEFC",
  rotulo: "Federação Brasil da Esperança · Resolução 14/2026",
  local: "Anexo do processo apresentado pelo PT · página 10 de 64 do PDF",
  leitura: "O texto distingue a competência de cada partido associado para fixar seus critérios e determina a observância dos pisos para candidaturas de mulheres, pessoas negras e indígenas. Não deve ser descrito como a regra exclusiva do PT.",
};

function DocumentoReproduzido({ item }: { item: { src: string; href: string; alt: string; rotulo: string; local: string; leitura: string } }) {
  return (
    <figure className="min-w-0 border-t-[5px] border-[var(--art-gold)] bg-paper p-4 text-ink md:p-6">
      <p className="font-mono text-[12px] font-semibold uppercase tracking-wide text-plum">
        Reprodução documental · TSE · 2026
      </p>
      <a href={item.src} target="_blank" rel="noreferrer"
        className="mt-4 block border border-ink/20 bg-white p-2 focus-visible:outline-2 focus-visible:outline-offset-4"
        aria-label={"Abrir reprodução integral da página: " + item.rotulo}>
        <img src={item.src} alt={item.alt} loading="lazy"
          className="mx-auto block h-auto max-h-[590px] w-full object-contain object-top" />
      </a>
      <figcaption className="mt-5">
        <strong className="block font-display text-xl leading-tight md:text-2xl">{item.rotulo}</strong>
        <p className="mt-2 font-mono text-[12px] leading-relaxed text-ink/70">{item.local}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-ink/85">{item.leitura}</p>
        <a href={item.href} target="_blank" rel="noreferrer"
          className="mt-4 inline-flex min-h-11 items-center font-semibold text-plum underline underline-offset-4">
          Consultar a íntegra do documento no TSE ↗
        </a>
      </figcaption>
    </figure>
  );
}

export function DuasResolucoesFEFC() {
  return (
    <section id="resolucoes-fefc-originais" aria-labelledby="resolucoes-fefc-titulo"
      className="relative left-1/2 -ml-[50vw] w-screen bg-plum text-paper">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <div className="grid gap-7 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-[13px] font-semibold text-[var(--art-gold)]">
              Dentro do arquivo · Páginas originais do TSE
            </p>
            <h2 id="resolucoes-fefc-titulo"
              className="mt-3 font-display text-[clamp(2.1rem,4vw,3.8rem)] leading-[1.07]">
              O que as resoluções dizem
            </h2>
          </div>
          <p className="max-w-2xl text-[16px] leading-relaxed text-paper/85">
            Duas páginas autênticas de documentos apresentados à Justiça Eleitoral:
            uma resolução da direção do União Brasil e outra da Federação Brasil da Esperança,
            anexada ao processo do PT. Elas mostram escolhas de redação e competências
            diferentes. Para investigar a execução, é preciso cruzar estes documentos
            com os registros de receita e despesas de 2026.
          </p>
        </div>
        <div className="mt-9 grid gap-5 lg:grid-cols-2">
          <DocumentoReproduzido item={paginaUniao} />
          <DocumentoReproduzido item={paginaFederacao} />
        </div>
        <p className="mt-7 max-w-4xl border-t border-paper/25 pt-5 text-[13px] leading-relaxed text-paper/85">
          Páginas selecionadas de PDFs completos disponibilizados pelo TSE (não são
          transcrições nem documentos recriados). O PDF do União Brasil tem 33 páginas
          e o processo vinculado ao PT tem 64. Outros anexos contêm informações pessoais
          e bancárias; não foram reproduzidos aqui. Consultas e arquivos de origem em
          16/11/2026. A publicação dos critérios pelo TSE não implica aprovação de mérito
          de cada regra nem comprova a aplicação concreta dos recursos.
        </p>
      </div>
    </section>
  );
}

export function CapaProcessoPLFEFC() {
  return (
    <section id="capa-original-pje" aria-labelledby="capa-original-pje-titulo"
      className="relative left-1/2 -ml-[50vw] w-screen bg-[#c53f22] text-paper">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:px-8 md:py-16 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-[13px] font-semibold text-paper/90">
            Reprodução documental · Tribunal Superior Eleitoral
          </p>
          <h2 id="capa-original-pje-titulo"
            className="mt-4 font-display text-[clamp(2rem,4vw,3.8rem)] leading-[1.07]">
            A capa identifica o processo. A regra está nos anexos.
          </h2>
          <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-paper/90">
            Esta é a primeira página do conjunto de 34 páginas do processo
            PJe nº 0600974-71.2026.6.00.0000, apresentado pelo Partido Liberal.
            Ela traz o objeto da petição e a relação dos documentos juntados,
            incluindo a ata, a divulgação de critérios e as informações bancárias
            solicitadas pela Justiça Eleitoral.
          </p>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-paper/85">
            A capa, isoladamente, não diz que percentuais chegaram às candidaturas,
            que os critérios foram integralmente cumpridos ou que houve análise de
            mérito pelo TSE. Os anexos e as contas devem ser examinados separadamente.
          </p>
          <a href={FEFC_DOCUMENTOS_OFICIAIS[0].href} target="_blank" rel="noreferrer"
            className="mt-6 inline-flex min-h-11 items-center font-semibold text-paper underline underline-offset-4">
            Abrir o processo original no TSE ↗
          </a>
        </div>
        <figure className="min-w-0 bg-paper p-3 text-ink md:p-5">
          <a href="/documentos/tse-pl-processo-fefc-capa-2026.png"
            target="_blank" rel="noreferrer"
            aria-label="Abrir a reprodução integral da primeira página do PJe do PL"
            className="block border border-ink/15 bg-white p-1">
            <img src="/documentos/tse-pl-processo-fefc-capa-2026.png"
              alt="Capa original do processo PJe 0600974-71.2026.6.00.0000 do Partido Liberal no TSE"
              loading="lazy" className="mx-auto block h-auto max-h-[650px] w-full object-contain object-top" />
          </a>
          <figcaption className="mt-3 font-mono text-[12px] leading-relaxed text-ink/80">
            PDF do TSE · página 1 de 34 · arquivo gerado em 22/08/2026.
            O documento mostra nomes de representantes e títulos de anexos;
            números de contas bancárias e CPF de outros anexos não foram reproduzidos.
            <a href={FEFC_DOCUMENTOS_OFICIAIS[0].href} target="_blank" rel="noreferrer"
              className="mt-2 block font-semibold text-plum underline underline-offset-4">
              Fonte oficial ↗
            </a>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
