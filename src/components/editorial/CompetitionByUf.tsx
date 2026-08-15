import { useMemo, useState } from "react";
import { GapNote } from "@/components/GapNote";
import { StatusTag } from "./StatusTag";
import { COMPETITION_DEFINITION, UNIVERSE_SHORT } from "@/data/competitividade";
import { VAGAS_SOURCE, totalVagas, vagasOf } from "@/data/vagas-2026";
import type { UniverseId } from "@/lib/tse/compute";
import type { PublicSnapshot } from "@/lib/tse/snapshot.functions";

/**
 * CompetitionByUf — concorrência declarada: candidaturas registradas por vaga
 * em disputa, por unidade eleitoral, dentro de um único universo.
 *
 * Numerador: fotografia vigente do TSE (candidaturas por UF em cada universo,
 * células já contadas no processamento — nada é recontado aqui).
 * Denominador: recurso oficial "Vagas" de 2026 (`src/data/vagas-2026.ts`).
 *
 * Não é índice, não é escore, não é ranking: é uma divisão com as duas pontas
 * declaradas. A ordenação é descritiva. Vagas não têm gênero: a separação por
 * gênero está apenas no numerador.
 */

const universes: UniverseId[] = ["proporcional", "majoritario"];

type Row = {
  uf: string;
  vagas: number | null;
  total: number;
  feminine: number;
  masculine: number;
};

const n1 = (v: number) =>
  v.toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
const int = (v: number) => v.toLocaleString("pt-BR");

export function CompetitionByUf({ snapshot }: { snapshot: PublicSnapshot | null }) {
  const [universe, setUniverse] = useState<UniverseId>("proporcional");
  const [sortBy, setSortBy] = useState<"uf" | "concorrencia">("uf");

  const data = useMemo(() => {
    const dims = snapshot?.universes[universe]?.dimensions;
    const totalByUf = dims?.totalByUf;
    const feminineByUf = dims?.feminineByUf;
    if (!totalByUf || Object.keys(totalByUf).length === 0) return null;

    const rows: Row[] = Object.entries(totalByUf).map(([rawUf, total]) => {
      const uf = rawUf || "NÃO INFORMADO";
      const feminine = feminineByUf?.[rawUf] ?? 0;
      return {
        uf,
        vagas: vagasOf(universe, uf),
        total,
        feminine,
        masculine: Math.max(total - feminine, 0),
      };
    });

    const tally = snapshot!.universes[universe];
    return {
      rows,
      vagasTotal: totalVagas(universe),
      total: tally.total,
      feminine: tally.feminine,
      masculine: Math.max(tally.total - tally.feminine, 0),
    };
  }, [snapshot, universe]);

  const label = UNIVERSE_SHORT[universe];

  const sorted = useMemo(() => {
    if (!data) return [];
    return [...data.rows].sort((a, b) => {
      if (sortBy === "uf") return a.uf.localeCompare(b.uf, "pt-BR");
      const ra = a.vagas ? a.total / a.vagas : -1;
      const rb = b.vagas ? b.total / b.vagas : -1;
      return rb - ra || a.uf.localeCompare(b.uf, "pt-BR");
    });
  }, [data, sortBy]);

  return (
    <div className="space-y-4">
      <div className="poster-frame p-4 md:p-5">
        <fieldset className="border-0 p-0">
          <legend className="poster-eyebrow text-muted-foreground">
            Universo eleitoral
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {universes.map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => setUniverse(u)}
                aria-pressed={universe === u}
                className={`border-2 border-ink px-3 py-1.5 font-mono text-[12px] uppercase tracking-wider ${
                  universe === u ? "bg-ink text-paper" : "bg-paper text-ink"
                }`}
              >
                {UNIVERSE_SHORT[u]}
              </button>
            ))}
          </div>
        </fieldset>

        {!data ? (
          <div className="mt-5">
            <GapNote label="Dado não disponível">
              A fotografia vigente não trouxe a contagem de candidaturas por
              unidade eleitoral neste universo. Sem numerador por estado, a
              divisão não é feita — nenhum valor é estimado.
            </GapNote>
          </div>
        ) : (
          <>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <p className="border-2 border-ink p-3">
                <span className="poster-eyebrow block text-muted-foreground">
                  Vagas em disputa
                </span>
                <span className="poster-figure text-2xl text-ink">
                  {int(data.vagasTotal)}
                </span>
              </p>
              <p className="border-2 border-ink p-3">
                <span className="poster-eyebrow block text-muted-foreground">
                  Candidaturas registradas
                </span>
                <span className="poster-figure text-2xl text-ink">
                  {int(data.total)}
                </span>
              </p>
              <p className="border-2 border-ink p-3">
                <span className="poster-eyebrow block text-muted-foreground">
                  Candidaturas por vaga
                </span>
                <span className="poster-figure text-2xl text-plum">
                  {n1(data.total / data.vagasTotal)}
                </span>
              </p>
            </div>

            <p className="mt-3 font-mono text-[12px] leading-relaxed text-ink/70">
              No Brasil, no universo {label}, há {int(data.vagasTotal)} vagas em
              disputa e {int(data.total)} candidaturas registradas:{" "}
              {n1(data.total / data.vagasTotal)} candidaturas por vaga. Dessas
              candidaturas, {int(data.feminine)} são de mulheres (
              {n1(data.feminine / data.vagasTotal)} por vaga) e{" "}
              {int(data.masculine)} de homens (
              {n1(data.masculine / data.vagasTotal)} por vaga). As vagas não têm
              gênero: a separação está apenas nas candidaturas.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="poster-eyebrow text-muted-foreground">
                Ordenar por
              </span>
              {(
                [
                  ["uf", "UF"],
                  ["concorrencia", "candidaturas por vaga"],
                ] as const
              ).map(([key, text]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSortBy(key)}
                  aria-pressed={sortBy === key}
                  className={`border-2 border-ink px-2.5 py-1 font-mono text-[12px] uppercase tracking-wider ${
                    sortBy === key ? "bg-ink text-paper" : "bg-paper text-ink"
                  }`}
                >
                  {text}
                </button>
              ))}
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <caption className="sr-only">
                  Vagas em disputa, candidaturas registradas e candidaturas por
                  vaga em cada unidade eleitoral, no universo {label} das
                  eleições de 2026. A ordenação é descritiva e não classifica
                  mérito.
                </caption>
                <thead>
                  <tr className="border-b-2 border-ink">
                    {[
                      "UF",
                      "Vagas",
                      "Candidaturas",
                      "Por vaga",
                      "Mulheres (por vaga)",
                    ].map((h) => (
                      <th
                        key={h}
                        scope="col"
                        className="py-2 pr-3 font-mono text-[12px] uppercase tracking-wider text-muted-foreground"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((r) => (
                    <tr key={r.uf} className="border-b border-ink/20 align-top">
                      <th
                        scope="row"
                        className="py-3 pr-3 font-mono text-sm font-bold text-ink"
                      >
                        {r.uf}
                      </th>
                      <td className="py-3 pr-3 font-mono text-sm text-ink">
                        {r.vagas === null ? "—" : int(r.vagas)}
                      </td>
                      <td className="py-3 pr-3 font-mono text-sm text-ink">
                        {int(r.total)}
                      </td>
                      <td className="py-3 pr-3 font-mono text-sm text-ink">
                        {r.vagas ? (
                          n1(r.total / r.vagas)
                        ) : (
                          <StatusTag tone="limit">sem denominador</StatusTag>
                        )}
                      </td>
                      <td className="py-3 pr-3 font-mono text-sm text-ink">
                        {int(r.feminine)}
                        {r.vagas ? (
                          <span className="text-muted-foreground">
                            {" "}
                            ({n1(r.feminine / r.vagas)})
                          </span>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      <div className="space-y-2 font-mono text-[12px] leading-relaxed text-ink/70">
        <p>
          Fórmula: {COMPETITION_DEFINITION.formula}. Unidade de análise:{" "}
          {COMPETITION_DEFINITION.unitOfAnalysis}.
        </p>
        <p>
          Numerador: fotografia vigente do recurso Candidatos
          {baseStamp ? `, base gerada em ${baseStamp}` : ""}. Denominador:{" "}
          {VAGAS_SOURCE.name}, arquivo {VAGAS_SOURCE.fileName}, gerado em
          15/08/2026. Primeiro turno em 4/10/2026.
        </p>
        <p>
          Concorrência descreve o tamanho da disputa. Não é chance de eleição,
          não é desempenho, não é quociente eleitoral — e não explica a ausência
          de mulheres.
        </p>
      </div>
    </div>
  );
}
