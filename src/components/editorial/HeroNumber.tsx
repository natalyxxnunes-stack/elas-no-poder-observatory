import { formatPercent, type Indicator } from "@/data/election-2026";

/**
 * HeroNumber — número-herói em quatro camadas visíveis e coladas:
 * (a) etiqueta, (b) percentual grande em roxo, (c) significado em uma frase,
 * (d) ressalva: denominador, data da fotografia e cautela de leitura.
 * Nenhuma camada pode ser omitida. Todos os valores vêm do indicador.
 */
function brDate(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

export function HeroNumber({ indicator }: { indicator: Indicator }) {
  const date = brDate(indicator.baseGeneratedAt);
  const hasValue =
    indicator.value !== null &&
    indicator.numerator !== null &&
    indicator.denominator !== null;

  return (
    <section className="rule-top py-12 md:py-14">
      <div className="editorial-card max-w-3xl border-plum p-6 md:p-9">
        {/* (a) etiqueta */}
        <p className="kicker">Presença nas proporcionais</p>

        {hasValue ? (
          <>
            {/* (b) o número */}
            <p className="data-figure mt-3 text-6xl text-plum md:text-8xl">
              {formatPercent(indicator.value)}
            </p>
            {/* (c) significado */}
            <p className="mt-4 max-w-xl font-display text-xl leading-snug text-ink md:text-2xl">
              das candidaturas proporcionais são de mulheres
            </p>
            {/* (d) ressalva colada: denominador, data e cautela */}
            <div className="mt-5 border-t border-rule pt-4 font-mono text-[11px] leading-relaxed text-muted-foreground">
              <p>
                {indicator.numerator!.toLocaleString("pt-BR")} de{" "}
                {indicator.denominator!.toLocaleString("pt-BR")} candidaturas
              </p>
              {date && <p className="mt-1">Fotografia da base de {date}</p>}
              <p className="mt-1">Fonte: TSE · Candidaturas 2026</p>
              <p className="mt-2 text-ink">
                O agregado nacional não prova que cada lista cumpriu a regra.
              </p>
            </div>
          </>
        ) : (
          <>
            <p className="mt-3 font-display text-3xl leading-snug text-plum md:text-4xl">
              Em atualização
            </p>
            <p className="mt-4 max-w-xl font-display text-xl leading-snug text-ink">
              das candidaturas proporcionais são de mulheres
            </p>
            <div className="mt-5 border-t border-rule pt-4 font-mono text-[11px] leading-relaxed text-muted-foreground">
              <p>
                Aguardando a nova fotografia da base do TSE: sem denominador e
                data, o percentual não é exibido.
              </p>
              <p className="mt-1">Fonte: TSE · Candidaturas 2026</p>
              <p className="mt-2 text-ink">
                O agregado nacional não prova que cada lista cumpriu a regra.
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
