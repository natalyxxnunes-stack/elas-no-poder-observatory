import type { ReactNode } from "react";

/**
 * Abertura de seção em formato de revista (escolhida em 02/11/2026): fio grosso
 * em cima, nome da seção em Fraunces itálico e, opcional, o tipo de matéria.
 * Substitui as etiquetas em mono caixa-alta. A letra mono fica reservada para
 * fontes e datas.
 */
export function Secao({
  nome,
  tipo,
  claro = false,
  pequeno = false,
  className = "",
}: {
  nome: ReactNode;
  tipo?: string;
  /** sobre fundo roxo ou tinta */
  claro?: boolean;
  /** chamadas menores: fio fino e nome menor */
  pequeno?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 ${pequeno ? "border-t-[3px] pt-2" : "border-t-[5px] pt-3"} ${
        claro ? "border-lilac" : "border-plum"
      } ${className}`}
    >
      <span
        className={`font-display font-medium italic ${pequeno ? "text-lg" : "text-[1.35rem] md:text-2xl"} ${
          claro ? "text-paper" : "text-plum"
        }`}
      >
        {nome}
      </span>
      {tipo ? <span className={`text-[14px] ${claro ? "text-paper/80" : "text-ink/65"}`}>{tipo}</span> : null}
    </p>
  );
}
