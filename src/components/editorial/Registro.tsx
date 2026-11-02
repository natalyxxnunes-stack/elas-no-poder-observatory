import type { ReactNode } from "react";

/**
 * Cartão de registro editorial: fato, interpretação ou hipótese.
 *
 * Visual aprovado em 02/11/2026:
 *  - fato: borda roxa cheia
 *  - interpretação: borda tinta cheia (laranja fica reservado ao dado de 2026)
 *  - hipótese: borda tracejada
 *
 * Regras editoriais (ver /metodo#como-ler):
 *  - fato é o padrão do site e vem com fonte e data na ficha do gráfico;
 *  - interpretação declara em que se apoia; sem base, vira hipótese;
 *  - hipótese leva data de registro e, quando testada, o desfecho.
 */

export type TipoRegistro = "fato" | "interpretacao" | "hipotese";

const ROTULO: Record<TipoRegistro, string> = {
  fato: "Fato",
  interpretacao: "Interpretação editorial",
  hipotese: "Hipótese em investigação",
};

const BORDA: Record<TipoRegistro, string> = {
  fato: "border-l-4 border-solid border-plum",
  interpretacao: "border-l-4 border-solid border-ink",
  hipotese: "border-l-4 border-dashed border-ink/60",
};

const COR_ROTULO: Record<TipoRegistro, string> = {
  fato: "text-plum",
  interpretacao: "text-ink",
  hipotese: "text-ink/75",
};

export type StatusHipotese = "aberta" | "confirmada" | "nao-confirmada" | "inconclusiva";

const STATUS: Record<StatusHipotese, string> = {
  aberta: "ainda não testada",
  confirmada: "confirmada",
  "nao-confirmada": "não confirmada",
  inconclusiva: "inconclusiva",
};

export function Registro({
  tipo,
  rotulo,
  titulo,
  registradaEm,
  status,
  testadaEm,
  className = "",
  children,
}: {
  tipo: TipoRegistro;
  /** troca o rótulo padrão, ex.: "Fato, em série" */
  rotulo?: string;
  titulo?: ReactNode;
  /** só para hipótese: data de registro, dd/mm/aaaa */
  registradaEm?: string;
  status?: StatusHipotese;
  testadaEm?: string;
  className?: string;
  children: ReactNode;
}) {
  const linhaHipotese =
    tipo === "hipotese" && (registradaEm || status)
      ? [
          registradaEm ? `registrada em ${registradaEm}` : null,
          status ? STATUS[status] : null,
          testadaEm ? `testada em ${testadaEm}` : null,
        ]
          .filter(Boolean)
          .join(" · ")
      : null;

  return (
    <article className={`${BORDA[tipo]} rounded-none py-1 pl-4 ${className}`}>
      <p className={`font-mono text-[13px] font-medium uppercase tracking-[0.08em] ${COR_ROTULO[tipo]}`}>
        {rotulo ?? ROTULO[tipo]}
      </p>
      {linhaHipotese ? <p className="mt-1 text-[13px] text-muted-foreground">{linhaHipotese}</p> : null}
      {titulo ? <h3 className="mt-2 font-display text-xl leading-snug text-ink">{titulo}</h3> : null}
      <div className="mt-2 space-y-3 leading-relaxed text-ink/80">{children}</div>
    </article>
  );
}
