import {
  FEFC_DOCUMENTOS_OFICIAIS, TSE_FEFC_CONTAS_URL, TSE_FEFC_COTAS_URL,
  TSE_FEFC_CRITERIOS_URL,
} from "@/data/documentos-eleitorais-2026";

/**
 * Identificadores institucionais autênticos, não reprodução estilizada de
 * página do PJe. Os arquivos originais só são apresentados nos links do TSE.
 */
export function ArquivoDocumentalFEFC({
  id = "arquivo-pje-fefc",
  variante = "ouro",
}: {
  id?: string;
  variante?: "ouro" | "tinta";
}) {
  const escuro = variante === "tinta";
  return (
    <section aria-labelledby={id}
      className={"relative left-1/2 -ml-[50vw] w-screen " +
        (escuro ? "bg-ink text-paper" : "bg-[var(--art-gold)] text-ink")}>
      <div className="mx-auto max-w-7xl px-5 py-11 md:px-8 md:py-16">
        <div className="grid gap-7 lg:grid-cols-[.8fr_1.2fr] lg:gap-12">
          <div>
            <p className={"text-[13px] font-semibold " + (escuro ? "text-[var(--art-gold)]" : "text-ink")}>
              Documento primário · FEFC · TSE 2026
            </p>
            <h2 id={id} className="mt-3 max-w-xl font-display text-[clamp(2rem,3.7vw,3.65rem)] leading-[1.07]">
              Os critérios estão num processo. O dinheiro, em outro registro.
            </h2>
            <p className={"mt-5 max-w-lg text-[15px] leading-relaxed " + (escuro ? "text-paper/90" : "text-ink/85")}>
              A tabela oficial identifica o Processo Judicial Eletrônico (PJe)
              em que a direção nacional encaminhou seus critérios de distribuição
              do Fundo Eleitoral. Os números e as datas abaixo reproduzem
              identificadores publicados pelo TSE. A relação é uma amostra de
              acesso e não um ranking dos partidos.
            </p>
            <p className={"mt-4 max-w-lg text-[13px] leading-relaxed " + (escuro ? "text-paper/75" : "text-ink/75")}>
              Fichas de identificação produzidas pelo observatório.
              Não são fac-símiles dos processos e não significam que o TSE
              examinou o mérito de todas as regras apresentadas.
            </p>
          </div>
          <ol className={"grid gap-3 " + (escuro ? "text-ink" : "text-paper")}>
            {FEFC_DOCUMENTOS_OFICIAIS.map((doc, i) => (
              <li key={doc.pje}
                className={"grid min-w-0 gap-4 p-5 sm:grid-cols-[5.5rem_minmax(0,1fr)] md:p-6 " +
                  (escuro
                    ? i === 1 ? "bg-cream text-ink" : "bg-paper text-ink"
                    : i === 1 ? "bg-plum text-paper" : "bg-ink text-paper")}>
                <div>
                  <span className={"font-mono text-[12px] font-semibold " +
                    (!escuro && i === 1 ? "text-[var(--art-gold)]" : escuro ? "text-plum" : "text-[var(--art-gold)]")}>
                    {String(i+1).padStart(2,"0")} · PJe
                  </span>
                  <strong className="mt-3 block break-words font-display text-2xl leading-tight">{doc.sigla}</strong>
                </div>
                <div className="min-w-0">
                  <p className="break-all font-mono text-[13px] font-semibold tabular-nums">{doc.pje}</p>
                  <p className="mt-2 text-[14px] leading-relaxed">{doc.tipo}</p>
                  <p className="mt-2 text-[13px] leading-relaxed">
                    FEFC liberado para a legenda em <strong>{doc.liberado}</strong>,
                    conforme a tabela do TSE.
                  </p>
                  <a href={doc.href} target="_blank" rel="noreferrer"
                    className="mt-3 inline-flex min-h-11 items-center font-semibold underline underline-offset-4 focus-visible:outline-2">
                    Acessar o documento do TSE ↗
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className={"mt-10 grid gap-px border-y py-1 md:grid-cols-3 " +
          (escuro ? "border-paper/30 bg-paper/30" : "border-ink/30 bg-ink/30")}>
          {[
            {indice: "01", label: "Critério", nota: "Documento e processo da regra declarada pela sigla", href: TSE_FEFC_CRITERIOS_URL, botao: "Índice de critérios TSE"},
            {indice: "02", label: "Cota", nota: "Montante de FEFC atribuído à legenda pelo TSE", href: TSE_FEFC_COTAS_URL, botao: "Cálculo de cotas TSE"},
            {indice: "03", label: "Recebimento", nota: "Receitas declaradas por candidaturas nos arquivos de contas", href: TSE_FEFC_CONTAS_URL, botao: "Contas de campanha TSE"},
          ].map((etapa) => (
            <div key={etapa.indice} className={"min-w-0 p-5 " +
              (escuro ? "bg-ink text-paper" : "bg-[var(--art-gold)] text-ink")}>
              <p className={"font-mono text-[13px] font-semibold " +
                (escuro ? "text-[var(--art-gold)]" : "text-plum")}>{etapa.indice} · {etapa.label}</p>
              <p className="mt-3 max-w-xs font-display text-xl leading-tight">{etapa.nota}</p>
              <a href={etapa.href} target="_blank" rel="noreferrer"
                className="mt-4 inline-flex min-h-11 items-center text-[14px] font-semibold underline underline-offset-4">
                {etapa.botao} ↗
              </a>
            </div>
          ))}
        </div>
        <p className={"mt-5 max-w-4xl text-[13px] leading-relaxed " +
          (escuro ? "text-paper/80" : "text-ink/80")}>
          São registros de natureza e universos distintos. O critério aprovado
          internamente e a liberação de recursos ao partido não comprovam,
          sozinhos, como cada candidatura foi financiada, nem infração às cotas
          legais. Fonte: TSE, página FEFC 2026, conferida em 16/11/2026.
        </p>
      </div>
    </section>
  );
}
