import { RESULT_2026_META, RESULT_2026_PROPORCIONAL } from "@/data/resultado-2026";
import { formatInt } from "@/lib/format-br";

/**
 * Miniatura editorial derivada dos dados de resultado, nunca fotografia.
 * Cada UF tem uma faixa laranja proporcional à sua parcela de deputadas
 * federais eleitas no total de vagas da UF; o denominador varia por UF.
 * O componente não repete o indicador nacional destacado no bloco abaixo.
 */
export function MosaicoEleitas2026() {
  const vagas = RESULT_2026_PROPORCIONAL.federalSeatsByUf;
  const mulheres = RESULT_2026_PROPORCIONAL.federalFeminineByUf;
  const ufs = Object.keys(vagas).sort((a,b)=>a.localeCompare(b, "pt-BR"));
  return (
    <figure className="flex h-full w-full flex-col justify-between bg-[var(--art-ink)] px-5 py-5 text-[var(--art-cream)] sm:px-7 sm:py-6">
      <div className="flex items-start justify-between gap-3 border-b border-[var(--art-cream)]/25 pb-3">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--art-cream)]">
          Câmara dos Deputados · resultado 2026
        </span>
        <span className="h-2.5 w-9 shrink-0 bg-[var(--art-gold)]" aria-hidden="true"/>
      </div>
      <div className="my-5 grid grid-cols-9 gap-[5px] sm:gap-2"
        role="img" aria-label="Participação de mulheres nas cadeiras de deputado federal, por unidade da Federação. Cada uma das 27 casas contém barra proporcional de mulheres eleitas entre as vagas de sua UF, segundo o TSE em outubro de 2026.">
        {ufs.map((uf) => {
          const numerador = mulheres[uf] ?? 0;
          const denominador = vagas[uf] ?? 0;
          const fracao = denominador ? (numerador / denominador) * 100 : 0;
          return (
            <div key={uf}
              title={`${uf}: ${formatInt(numerador)} de ${formatInt(denominador)} cadeiras federais para mulheres`}
              aria-hidden="true"
              className="min-w-0 bg-[var(--art-cream)]/10 px-1.5 pb-1.5 pt-2">
              <span className="block text-center font-mono text-[10px] font-semibold text-[var(--art-cream)] sm:text-xs">{uf}</span>
              <div className="mt-2 h-[5px] w-full bg-[var(--art-cream)]/30">
                <div className="h-full bg-[var(--art-coral)]" style={{width:`${fracao}%`}}/>
              </div>
            </div>
          );
        })}
      </div>
      <figcaption className="text-[10px] leading-relaxed text-[var(--art-cream)]/85">
        Cada faixa coral representa a proporção de mulheres entre as cadeiras da respectiva UF.
        Fonte: TSE, resultado 2026, base de {RESULT_2026_META.baseGeneratedAt}. Recontagem QSE.
      </figcaption>
    </figure>
  );
}
