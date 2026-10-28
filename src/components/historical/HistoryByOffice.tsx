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
      <div className="overflow-x-auto">
        <table className="w-full min-w-[36rem] text-sm">
          <thead>
            <tr className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
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

/** Deputadas federais eleitas por UF, 2014 a 2026. */
export function HistoryByUf() {
  const ufs = Object.keys(HISTORICO_CARGO_UF["2026"]?.deputadoFederalByUf ?? {}).sort((a, b) => {
    const e = (y: string, uf: string) =>
      HISTORICO_CARGO_UF[y]?.deputadoFederalByUf[uf]?.eleitas ?? 0;
    return e("2026", b) - e("2026", a) || a.localeCompare(b);
  });
  return (
    <ChartFrame
      eyebrow="Câmara dos Deputados · deputadas eleitas por estado"
      title="Quantas deputadas federais cada estado elegeu, de 2014 a 2026"
      note="Número de deputadas eleitas sobre as cadeiras do estado, que são as mesmas nas quatro eleições. Ordem: mais deputadas em 2026 primeiro. Em laranja, 2026."
      source="Fonte: TSE, Candidatos 2014, 2018, 2022 e 2026 (base de 27/10/2026). Recontagem independente."
      ficha={{
        vendo: "A bancada feminina de cada estado na Câmara, eleição a eleição.",
        contados: "Deputadas e deputados federais eleitos em cada estado.",
        denominador: "Cadeiras do estado na Câmara (de 8 a 70), iguais nas quatro eleições.",
        data: "Arquivos oficiais do TSE baixados em 27 e 28/10/2026",
        fonte: "TSE, Candidatos 2014, 2018, 2022 e 2026",
        limitacao:
          "Estados com 8 cadeiras mudam muito com uma única eleita: leia pelo número absoluto.",
      }}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[30rem] text-sm">
          <thead>
            <tr className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              <th className="pb-2 text-left font-normal">UF</th>
              <th className="pb-2 text-right font-normal">Cadeiras</th>
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
            {ufs.map((uf) => (
              <tr key={uf} className="border-t border-rule">
                <th
                  scope="row"
                  className="py-1.5 text-left font-mono text-xs font-semibold text-ink"
                >
                  {uf}
                </th>
                <td className="py-1.5 text-right font-mono text-xs text-muted-foreground">
                  {n(HISTORICO_CARGO_UF["2026"]?.deputadoFederalByUf[uf]?.cadeiras ?? 0)}
                </td>
                {YEARS.map((y) => (
                  <td
                    key={y}
                    className={`py-1.5 text-right font-mono text-xs ${y === "2026" ? "font-semibold text-coral-ink" : "text-ink"}`}
                  >
                    {n(HISTORICO_CARGO_UF[y]?.deputadoFederalByUf[uf]?.eleitas ?? 0)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ChartFrame>
  );
}
