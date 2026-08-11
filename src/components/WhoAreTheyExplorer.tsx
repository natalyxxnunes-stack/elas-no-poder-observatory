import { useState } from "react";
import {
  RACE_BY_POWER_LEVEL,
  raceCounts,
} from "@/data/election-2026";
import { GapNote } from "./GapNote";

/**
 * WhoAreTheyExplorer — eixo central do observatório: cor/raça × nível de poder.
 * Categorias sempre nas classes originais da base do TSE, com denominador
 * explícito. Sem snapshot processado, cada célula permanece vazia e declarada.
 */
export function WhoAreTheyExplorer() {
  const [openLevel, setOpenLevel] = useState<string>(
    RACE_BY_POWER_LEVEL[0]!.level,
  );

  return (
    <section aria-labelledby="who-title" className="rule-top pt-8">
      <h2 className="kicker">Quem são elas?</h2>
      <h3
        id="who-title"
        className="mt-3 max-w-3xl font-display text-2xl leading-snug text-ink md:text-3xl"
      >
        Cor/raça × nível de poder
      </h3>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Contar mulheres não basta. O observatório acompanha a distribuição por
        cor/raça em cada nível, nas categorias originais declaradas ao TSE
        (branca, preta, parda, amarela, indígena, não informado). Quando houver
        leitura agregada, a agregação é declarada: “negra” = preta + parda.
      </p>

      <div className="mt-8 divide-y divide-rule border-y border-rule">
        {RACE_BY_POWER_LEVEL.map((row) => {
          const open = openLevel === row.level;
          const counts =
            row.level === "Candidaturas proporcionais"
              ? raceCounts("proporcional")
              : row.level === "Candidaturas majoritárias"
                ? raceCounts("majoritario")
                : null;
          const denominator = row.indicator?.denominator ?? null;
          return (
            <div key={row.level}>
              <button
                type="button"
                onClick={() => setOpenLevel(open ? "" : row.level)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-4 py-4 text-left"
              >
                <span className="font-display text-lg text-ink">{row.level}</span>
                <span
                  className={`font-mono text-[11px] uppercase tracking-wider ${
                    counts ? "text-plum" : "text-coral"
                  }`}
                >
                  {row.status}
                </span>
              </button>
              {open && (
                <div className="pb-5">
                  <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                    {row.note}
                  </p>
                  {counts && denominator ? (
                    <>
                      <p className="mb-3 font-mono text-[11px] text-muted-foreground">
                        Denominador: {denominator.toLocaleString("pt-BR")}{" "}
                        candidaturas de mulheres neste universo.
                      </p>
                      <dl className="grid gap-3 sm:grid-cols-3">
                        {Object.entries(counts).map(([k, v]) => (
                          <div key={k} className="editorial-card p-3">
                            <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                              {k}
                            </dt>
                            <dd className="data-figure mt-1 text-2xl text-plum">
                              {v.toLocaleString("pt-BR")}
                              <span className="ml-2 font-mono text-xs text-muted-foreground">
                                {((v / denominator) * 100).toLocaleString(
                                  "pt-BR",
                                  {
                                    minimumFractionDigits: 1,
                                    maximumFractionDigits: 1,
                                  },
                                )}
                                % de {denominator.toLocaleString("pt-BR")}
                              </span>
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </>
                  ) : (
                    <GapNote label="Lacuna declarada">
                      {row.pending ??
                        row.indicator?.caveat ??
                        "Indicador ainda não disponível."}
                    </GapNote>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
