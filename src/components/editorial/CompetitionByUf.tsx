import { useMemo, useState } from "react";
import { GapNote } from "@/components/GapNote";
import { StatusTag } from "./StatusTag";
import { COMPETITION_DEFINITION, UNIVERSE_SHORT } from "@/data/competitividade";
import { VAGAS_SOURCE, vagasOf } from "@/data/vagas-2026";
import type { UniverseId } from "@/lib/tse/compute";
import type { PublicSnapshot } from "@/lib/tse/snapshot.functions";
import { formatInt, formatDecimal } from "@/lib/format-br";

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

type Row = {
  uf: string;
  vagas: number | null;
  total: number;
  feminine: number;
  masculine: number;
};

const n1 = (v: number) =>
  formatDecimal(v);
const int = (v: number) => formatInt(v);

/** Data da fotografia usada no numerador — lida do próprio snapshot exibido. */
function brDate(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? null
    : d.toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

export function CompetitionByUf({ snapshot }: { snapshot: PublicSnapshot | null }) {
  const [universe, setUniverse] = useState<UniverseId>("proporcional");
  const [sortBy, setSortBy] = useState<"uf" | "concorrencia">("uf");
  const [selectedUf, setSelectedUf] = useState("");
  const baseStamp = brDate(snapshot?.baseGeneratedAt ?? snapshot?.collectedAt);
  const universes: UniverseId[] = snapshot?.universes.majoritario.dimensions?.totalByUf
    ? ["proporcional", "majoritario"]
    : ["proporcional"];


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

    const total = rows.reduce((sum, row) => sum + row.total, 0);
    const feminine = rows.reduce((sum, row) => sum + row.feminine, 0);
    const vagasTotal = rows.reduce(
      (sum, row) => sum + (row.vagas ?? 0),
      0,
    );
    return {
      rows,
      vagasTotal,
      total,
      feminine,
      masculine: Math.max(total - feminine, 0),
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

  const selected = sorted.find((r) => r.uf === selectedUf) ?? sorted[0] ?? null;

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
                className={`border border-rule px-3 py-1.5 text-[13px] font-semibold ${
                  universe === u ? "bg-plum text-cream border-plum" : "bg-paper text-ink"
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
              divisão não é feita: nenhum valor é estimado.
            </GapNote>
          </div>
        ) : (
          <>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <p className="border border-rule p-3">
                <span className="poster-eyebrow block text-muted-foreground">
                  Vagas em disputa
                </span>
                <span className="poster-figure text-2xl text-ink">
                  {int(data.vagasTotal)}
                </span>
              </p>
              <p className="border border-rule p-3">
                <span className="poster-eyebrow block text-muted-foreground">
                  Candidaturas registradas
                </span>
                <span className="poster-figure text-2xl text-ink">
                  {int(data.total)}
                </span>
              </p>
              <p className="border border-rule p-3">
                <span className="poster-eyebrow block text-muted-foreground">
                  Candidaturas por vaga
                </span>
                <span className="poster-figure text-2xl text-plum">
                  {n1(data.total / data.vagasTotal)}
                </span>
              </p>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-ink/70">
              No Brasil, no universo {label}, há {int(data.vagasTotal)} vagas em
              disputa e {int(data.total)} candidaturas registradas:{" "}
              {n1(data.total / data.vagasTotal)} candidaturas por vaga. Dessas
              candidaturas, {int(data.feminine)} são de mulheres (
              {n1((data.feminine / data.total) * 100)}%) e{" "}
              {int(data.masculine)} de homens.
              {universe === "majoritario"
                ? " A Presidência (14 candidaturas, 1 vaga) é disputa nacional e fica fora desta tabela."
                : ""}
            </p>

            <section aria-label="Uma unidade eleitoral em foco" className="mt-6 border-t-2 border-plum bg-cream px-5 py-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-[12px] font-semibold uppercase tracking-wide text-plum">
                    Consulta por território · {label}
                  </p>
                  <h3 className="mt-2 font-display text-2xl text-ink">Uma unidade eleitoral de cada vez</h3>
                </div>
                <label className="text-sm font-semibold text-ink">
                  Unidade eleitoral
                  <select value={selected?.uf ?? ""} onChange={(e) => setSelectedUf(e.target.value)}
                    className="mt-1 block min-h-12 min-w-32 border border-ink bg-paper px-3 text-base text-ink">
                    {sorted.map((r) => <option value={r.uf} key={r.uf}>{r.uf}</option>)}
                  </select>
                </label>
              </div>
              {selected ? (
                <div className="mt-5 grid gap-5 border-t border-rule pt-5 sm:grid-cols-2 lg:grid-cols-4" aria-live="polite">
                  <div>
                    <p className="text-sm font-semibold text-ink/75">Vagas do recorte</p>
                    <p className="mt-2 font-display text-4xl text-plum">{selected.vagas === null ? "—" : int(selected.vagas)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink/75">Candidaturas registradas</p>
                    <p className="mt-2 font-display text-4xl text-plum">{int(selected.total)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink/75">Candidaturas por vaga</p>
                    <p className="mt-2 font-display text-4xl text-plum">{selected.vagas ? n1(selected.total / selected.vagas) : "—"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink/75">Mulheres entre candidaturas</p>
                    <p className="mt-2 font-display text-4xl text-plum">
                      {selected.total > 0 ? n1((selected.feminine / selected.total) * 100) + "%" : "—"}
                    </p>
                    <p className="mt-1 font-mono text-[12px] text-ink/75">{int(selected.feminine)} de {int(selected.total)}</p>
                  </div>
                </div>
              ) : null}
              <p className="mt-5 border-t border-rule pt-3 text-[13px] leading-relaxed text-ink/75">
                Esta medida divide candidaturas pelas vagas do mesmo universo e território.
                Não representa uma probabilidade de eleição individual.
              </p>
            </section>

            <details className="group mt-5 border border-plum bg-card px-4 py-3 md:px-5">
              <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-3 font-semibold text-plum">
                Abrir todas as UFs e comparar candidaturas por vaga
                <span aria-hidden="true" className="group-open:rotate-180">↓</span>
              </summary>
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
                  className={`border border-rule px-2.5 py-1 text-[13px] font-semibold ${
                    sortBy === key ? "bg-plum text-cream border-plum" : "bg-paper text-ink"
                  }`}
                >
                  {text}
                </button>
              ))}
            </div>

            <div tabIndex={0} className="mt-4 overflow-x-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-plum">
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
                      "Mulheres (% das candidaturas)",
                    ].map((h) => (
                      <th
                        key={h}
                        scope="col"
                        className="py-2 pr-3 text-[13px] text-muted-foreground font-semibold"
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
                        {r.total > 0 ? (
                          <span className="text-muted-foreground">
                            {" "}
                            ({n1((r.feminine / r.total) * 100)}%)
                          </span>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </details>
          </>
        )}
      </div>

      <div className="space-y-2 text-sm leading-relaxed text-ink/70">
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
        <p>Concorrência mede quantas candidaturas disputam cada vaga. Chance de eleição depende de voto e de quociente eleitoral; o resultado do 1º turno de 4/10 está no histórico, e o cruzamento com esta tabela é a próxima camada.</p>
      </div>
    </div>
  );
}
