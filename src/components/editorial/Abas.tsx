import { useId, useState, type ReactNode } from "react";

/**
 * Abas (12/11/2026): um gráfico por vez, no lugar de dois empilhados. Padrão
 * das referências (Elas no Congresso, Gênero e Número) para encurtar páginas
 * de dados no celular. Todo o conteúdo fica no HTML; só um painel aparece.
 */
export function Abas({ abas }: { abas: { rotulo: string; conteudo: ReactNode }[] }) {
  const [ativa, setAtiva] = useState(0);
  const id = useId();
  return (
    <div>
      <div role="tablist" className="flex flex-wrap gap-2 border-b border-rule">
        {abas.map((a, i) => (
          <button
            key={a.rotulo}
            type="button"
            role="tab"
            id={`${id}-t${i}`}
            aria-selected={ativa === i}
            aria-controls={`${id}-p${i}`}
            onClick={() => setAtiva(i)}
            className={`-mb-px min-h-11 border-b-[3px] px-3 text-[15px] font-semibold ${
              ativa === i
                ? "border-plum text-plum"
                : "border-transparent text-ink/65 hover:text-plum"
            }`}
          >
            {a.rotulo}
          </button>
        ))}
      </div>
      {abas.map((a, i) => (
        <div
          key={a.rotulo}
          role="tabpanel"
          id={`${id}-p${i}`}
          aria-labelledby={`${id}-t${i}`}
          hidden={ativa !== i}
          className="pt-5"
        >
          {a.conteudo}
        </div>
      ))}
    </div>
  );
}
