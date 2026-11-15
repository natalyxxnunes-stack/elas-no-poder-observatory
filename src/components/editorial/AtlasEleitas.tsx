import { useMemo, useState } from "react";
import { UF_NOME } from "@/data/eleitas-cruzamentos";
import type { CargoEleita } from "@/data/eleitas-2026";
import { formatInt } from "@/lib/format-br";

type Registro = { uf: string; cargo: CargoEleita };
type UfContagem = { uf: string; total: number };

/**
 * Gráfico de consulta editorial: número absoluto de eleitas por UF.
 * A barra usa o maior valor do conjunto de referência como escala visual,
 * NUNCA as vagas disponíveis ou a proporção de mulheres eleitas no estado.
 *
 * Os registros são fornecidos pela página após aplicar todos os filtros
 * EXCETO o filtro de UF. Assim, selecionar uma unidade não apaga as demais.
 */
export function AtlasEleitas({
  registros,
  ufs,
  selecionada,
  selecionar,
  corte,
}: {
  registros: Registro[];
  ufs: string[];
  selecionada: string;
  selecionar: (uf: string) => void;
  corte: string;
}) {
  const [todos, setTodos] = useState(false);
  const distribuicao = useMemo(() => {
    const contagem = new Map<string, number>(ufs.map((uf) => [uf, 0]));
    for (const registro of registros) {
      contagem.set(registro.uf, (contagem.get(registro.uf) ?? 0) + 1);
    }
    return [...contagem].map(([uf, total]): UfContagem => ({ uf, total }))
      .sort((a, b) => b.total - a.total || a.uf.localeCompare(b.uf));
  }, [registros, ufs]);

  const referencia = Math.max(1, ...distribuicao.map((item) => item.total));
  const distribuicaoVisivel = todos ? distribuicao : distribuicao.slice(0, 8);

  return (
    <section
      aria-labelledby="atlas-eleitas-titulo"
      className="relative left-1/2 -ml-[50vw] w-screen bg-ink text-paper"
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:px-8 md:py-16 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-[13px] font-semibold text-[var(--art-gold)]">
            Atlas eleitoral · Consulta interativa
          </p>
          <h2
            id="atlas-eleitas-titulo"
            className="mt-4 max-w-lg font-display text-[clamp(2.1rem,3.5vw,3.55rem)] leading-[1.08]"
          >
            Explore as eleitas pelo território.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-paper/85">
            O gráfico mostra o número de mulheres eleitas registradas em cada
            unidade da Federação no recorte selecionado. Escolha uma UF para
            chegar diretamente às fichas correspondentes.
          </p>
          <div className="mt-7 border-l-4 border-[var(--art-gold)] pl-5">
            <strong className="block font-display text-[clamp(2.7rem,5vw,4rem)] tabular-nums text-[var(--art-gold)]">
              {formatInt(registros.length)}
            </strong>
            <span className="block max-w-xs text-sm leading-relaxed text-paper/80">
              mulheres eleitas no recorte atual, antes da seleção por estado
            </span>
          </div>
          <p className="mt-7 max-w-lg text-[13px] leading-relaxed text-paper/65">
            São números absolutos, não percentuais de cadeiras nem taxas de
            sucesso eleitoral. UFs têm quantidades diferentes de vagas;
            esta ordenação não mede desempenho relativo.
          </p>
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-paper/30 pb-4">
            <h3 className="font-display text-2xl leading-tight">Por unidade da Federação</h3>
            {selecionada && (
              <button
                type="button"
                onClick={() => selecionar("")}
                className="inline-flex min-h-11 items-center text-sm font-semibold text-[var(--art-gold)] underline underline-offset-4"
              >
                Remover seleção: {selecionada}
              </button>
            )}
          </div>
          <ol className="mt-4 space-y-1">
            {distribuicaoVisivel.map(({ uf, total }) => {
              const ativo = selecionada === uf;
              return (
                <li key={uf}>
                  <button
                    type="button"
                    aria-label={`Ver eleitas de ${UF_NOME[uf] ?? uf} (${uf}): ${total} registros`}
                    aria-pressed={ativo}
                    onClick={() => selecionar(ativo ? "" : uf)}
                    className={`group grid w-full grid-cols-[3.25rem_minmax(0,1fr)_3rem] items-center gap-3 py-2.5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--art-gold)] ${ativo ? "bg-plum px-2 -mx-2 w-[calc(100%+1rem)]" : ""}`}
                  >
                    <span className="font-mono text-sm font-semibold text-paper">{uf}</span>
                    <span className="min-w-0">
                      <span className="block truncate text-[13px] text-paper/80 group-hover:text-paper">
                        {UF_NOME[uf] ?? uf}
                      </span>
                      <span className="mt-1 block h-2 w-full bg-paper/20" aria-hidden="true">
                        <span
                          className="block h-full bg-coral"
                          style={{ width: `${total > 0 ? Math.max((total / referencia) * 100, 1) : 0}%` }}
                        />
                      </span>
                    </span>
                    <span className="text-right font-mono text-sm font-semibold tabular-nums text-paper">
                      {formatInt(total)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          <button
            type="button"
            onClick={() => setTodos((atual) => !atual)}
            aria-expanded={todos}
            className="mt-6 inline-flex min-h-11 items-center border border-paper/50 px-5 text-sm font-semibold text-paper hover:border-[var(--art-gold)]"
          >
            {todos ? "Mostrar apenas as oito primeiras" : `Ver todas as ${distribuicao.length} UFs`}
            <span className="ml-3" aria-hidden="true">{todos ? "−" : "+"}</span>
          </button>
          <p className="mt-5 border-t border-paper/20 pt-4 text-[12px] leading-relaxed text-paper/70">
            Fonte: TSE, fichas das mulheres eleitas em 2026, base gerada em {corte}.
            Ordenação pelo número absoluto de registros. Barras relativas à
            UF com o maior número neste recorte; escala reiniciada quando os filtros mudam.
            Ao selecionar uma UF, os filtros e a lista de nomes são atualizados.
          </p>
        </div>
      </div>
    </section>
  );
}
