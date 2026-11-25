import { useState } from "react";
import { ChartFrame } from "@/components/editorial/ChartFrame";
import { HISTORICO_CARGO_UF } from "@/data/historico-cargo-uf";
import { formatInt, formatPct } from "@/lib/format-br";

const YEARS = ["2014", "2018", "2022", "2026"] as const;
const SMALL = 20;
const CARGOS = [
  { key: "DEPUTADO FEDERAL", label: "Câmara dos Deputados" },
  { key: "DEPUTADO ESTADUAL", label: "Assembleias legislativas" },
  { key: "DEPUTADO DISTRITAL", label: "Câmara Legislativa do DF" },
  { key: "SENADOR", label: "Senado" },
  { key: "GOVERNADOR", label: "Governos" },
  { key: "PRESIDENTE", label: "Presidência" },
] as const;
const n = formatInt;
const cell = (num: number, den: number) =>
  den >= SMALL ? formatPct((num / den) * 100) : `${n(num)} de ${n(den)}`;

/** Cargo × ano: candidatas e eleitas, cada uma sobre o próprio total. */
export function HistoryByOffice() {
  return (
    <ChartFrame
      eyebrow="Série histórica por cargo · 2014 a 2026"
      title="Em cada cargo, quantas eram candidatas e quantas se elegeram"
      note="Em cada célula, a fatia de mulheres entre as candidaturas e, embaixo, entre as pessoas eleitas no cargo. Abaixo de 20, só o número absoluto. O Senado renova um terço das cadeiras em 2014 e 2022 e dois terços em 2018 e 2026, por isso o número de eleitos muda."
      source="Fonte: TSE, Candidatos 2014, 2018, 2022 e 2026 (base de 27/10/2026). Só eleições gerais. Recontagem independente."
      ficha={{
        vendo:
          "Para cada cargo e cada eleição, a presença de mulheres entre as candidaturas e entre as pessoas eleitas.",
        contados: "Pedidos de registro titulares e pessoas eleitas, sem vices nem suplentes.",
        denominador:
          "Candidaturas do mesmo cargo e ano (primeiro número) e pessoas eleitas no mesmo cargo e ano (segundo número).",
        data: "Arquivos oficiais do TSE baixados em 27 e 28/10/2026",
        fonte: "TSE, Candidatos 2014, 2018, 2022 e 2026",
        limitacao:
          "Em 2018, uma cadeira de Mato Grosso no Senado vem sem resultado no arquivo oficial. Eleições suplementares que vêm no mesmo arquivo ficam fora.",
      }}
    >
      <div tabIndex={0} className="overflow-x-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-plum">
        <table className="w-full min-w-[36rem] text-sm">
          <caption className="sr-only">Série histórica por cargo e eleição</caption>
          <thead>
            <tr className="text-[13px] text-muted-foreground font-semibold">
              <th className="pb-2 text-left font-normal">Cargo</th>
              {YEARS.map((y) => (
                <th
                  key={y}
                  className={`pb-2 text-right font-normal ${y === "2026" ? "text-coral-ink" : ""}`}
                >
                  {y}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CARGOS.map((c) => (
              <tr key={c.key} className="border-t border-rule align-top">
                <th scope="row" className="py-2 pr-3 text-left font-normal text-ink">
                  {c.label}
                </th>
                {YEARS.map((y) => {
                  const d = HISTORICO_CARGO_UF[y]?.byCargo[c.key];
                  if (!d) return <td key={y} />;
                  return (
                    <td key={y} className="py-2 text-right font-mono text-xs">
                      <span className="block text-muted-foreground">
                        cand. {cell(d.candidatas, d.candidaturas)}
                      </span>
                      <span
                        className={`block ${y === "2026" ? "font-semibold text-coral-ink" : "text-ink"}`}
                      >
                        eleitas {cell(d.eleitas, d.eleitos)}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ChartFrame>
  );
}


/** Deputadas federais eleitas por UF, 2014 a 2026.
 * A seleção orienta a leitura; todas as 27 UFs continuam acessíveis.
 */
export function HistoryByUf() {
  const ufs = Object.keys(HISTORICO_CARGO_UF["2026"]?.deputadoFederalByUf ?? {}).sort((a, b) => {
    const eleitas = (ano: string, sigla: string) =>
      HISTORICO_CARGO_UF[ano]?.deputadoFederalByUf[sigla]?.eleitas ?? 0;
    return eleitas("2026", b) - eleitas("2026", a) || a.localeCompare(b);
  });
  const [uf, setUf] = useState<string>(ufs[0] ?? "");
  const retratos = YEARS.map((ano) => ({
    ano,
    dado: HISTORICO_CARGO_UF[ano]?.deputadoFederalByUf[uf],
  }));
  return (
    <ChartFrame
      eyebrow="Câmara dos Deputados · deputadas eleitas por estado"
      title="Como mudou a representação feminina em cada estado"
      note="Selecione uma UF para comparar as quatro eleições. Cada ano se refere às cadeiras da própria UF; as 27 unidades permanecem na tabela completa."
      source="Fonte: TSE, Candidatos 2014, 2018, 2022 e 2026 (base 2026 de 27/10). Recontagem independente."
      ficha={{
        vendo: "A bancada feminina em cada UF na Câmara, eleição a eleição.",
        contados: "Deputadas e deputados federais eleitos em cada estado.",
        denominador: "Cadeiras da UF na Câmara dos Deputados, iguais nas quatro eleições.",
        data: "Arquivos oficiais do TSE baixados em 27 e 28/10/2026",
        fonte: "TSE, Candidatos 2014, 2018, 2022 e 2026",
        limitacao: "Estados com oito cadeiras mudam muito com uma única eleita. Sem dado é diferente de zero.",
      }}
    >
      <section aria-label="Selecionar estado para comparação histórica" className="bg-cream p-5 md:p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[12px] font-semibold uppercase tracking-wide text-plum">Estados · 2014 a 2026</p>
            <h4 className="mt-2 font-display text-2xl text-ink">Uma UF, quatro eleições</h4>
          </div>
          <label className="text-sm font-semibold text-ink">
            Estado
            <select value={uf} onChange={(e) => setUf(e.target.value)}
              className="mt-1 block min-h-12 min-w-36 border border-ink bg-paper px-3 text-base text-ink">
              {ufs.map((u) => <option key={u} value={u}>{u}</option>)}
            </select>
          </label>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-live="polite">
          {retratos.map(({ano, dado}) => (
            <div key={ano} className={ano === "2026" ? "border-t-2 border-coral pt-3" : "border-t-2 border-plum pt-3"}>
              <p className="font-mono text-[13px] text-ink/75">{ano}</p>
              <p className="mt-2 font-display text-4xl text-plum">{dado ? n(dado.eleitas) : "—"}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-ink/80">
                {dado ? (
                  <>
                    deputadas entre {n(dado.cadeiras)} cadeiras
                    {dado.cadeiras > 0 ? " · " + formatPct((dado.eleitas / dado.cadeiras) * 100) : ""}
                  </>
                ) : "Sem dado neste arquivo"}
              </p>
            </div>
          ))}
        </div>
      </section>
      <details className="mt-5 border border-plum px-4 py-3 md:px-5">
        <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-3 font-semibold text-plum">
          Abrir tabela de todos os estados e eleições
          <span aria-hidden="true" className="group-open:rotate-180">↓</span>
        </summary>
        <div tabIndex={0} className="mt-4 overflow-x-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-plum">
          <table className="w-full min-w-[30rem] text-sm">
            <caption className="sr-only">Série histórica por unidade federativa</caption>
            <thead>
              <tr className="text-[13px] text-muted-foreground font-semibold">
                <th scope="col" className="pb-2 text-left font-normal">UF</th>
                <th scope="col" className="pb-2 text-right font-normal">Cadeiras</th>
                {YEARS.map((ano) => (
                  <th scope="col" key={ano}
                    className={ano === "2026" ? "pb-2 text-right font-normal text-coral-ink" : "pb-2 text-right font-normal"}>
                    {ano}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ufs.map((sigla) => (
                <tr key={sigla} className="border-t border-rule">
                  <th scope="row" className="py-1.5 text-left font-mono text-xs font-semibold text-ink">{sigla}</th>
                  <td className="py-1.5 text-right font-mono text-xs text-muted-foreground">
                    {n(HISTORICO_CARGO_UF["2026"]?.deputadoFederalByUf[sigla]?.cadeiras ?? 0)}
                  </td>
                  {YEARS.map((ano) => {
                    const dado = HISTORICO_CARGO_UF[ano]?.deputadoFederalByUf[sigla];
                    return (
                      <td key={ano} className={ano === "2026"
                        ? "py-1.5 text-right font-mono text-xs font-semibold text-coral-ink"
                        : "py-1.5 text-right font-mono text-xs text-ink"}>
                        {dado ? n(dado.eleitas) : "—"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </ChartFrame>
  );
}
