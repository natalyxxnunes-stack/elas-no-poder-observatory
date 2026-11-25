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
  semFio = false,
  className = "",
  as: Tag = "p",
}: {
  nome: ReactNode;
  tipo?: string;
  /** sobre fundo roxo ou tinta */
  claro?: boolean;
  /** chamadas menores: fio fino e nome menor */
  pequeno?: boolean;
  /** Permite aberturas sem fio ornamental; mantém o comportamento existente por padrão. */
  semFio?: boolean;
  className?: string;
  as?: "p" | "h2" | "h3";
}) {
  return (
    <Tag
      className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 ${semFio ? "" : pequeno ? "border-t-[3px] pt-2" : "border-t-[5px] pt-3"} ${
        semFio ? "" : claro ? "border-lilac" : "border-plum"
      } ${className}`}
    >
      <span
        className={`font-display font-medium italic ${pequeno ? "text-lg" : "text-[1.35rem] md:text-2xl"} ${
          claro ? "text-paper" : "text-plum"
        }`}
      >
        {nome}
      </span>
      {tipo ? <span className={`text-[14px] ${claro ? "text-paper" : "text-ink/80"}`}>{tipo}</span> : null}
    </Tag>
  );
}
