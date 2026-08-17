/**
 * ElectionRateByGender — taxa de eleição de mulheres e de homens nas eleições
 * proporcionais já encerradas (1º turno).
 *
 * Indicador descritivo: divide as pessoas eleitas de um gênero pelas
 * candidaturas do mesmo gênero, ano e universo. Não explica causa e não é
 * comparação de desempenho individual. Renderizado como tabela, com os
 * absolutos sempre visíveis: as barras são decoração e ficam fora da leitura de
 * leitores de tela.
 */

import {
import { formatInt, formatPct } from "@/lib/format-br";
  ELECTION_RATE_BY_GENDER,
  ELECTION_RATE_FORMULA,
} from "@/data/historical-funnel";

const n = formatInt;
const pct = formatPct;

const rate = (elected: number, candidacies: number) =>
  candidacies > 0 ? (elected / candidacies) * 100 : null;

const ROWS = ELECTION_RATE_BY_GENDER.map((r) => ({
  ...r,
  feminineRate: rate(r.feminine.elected, r.feminine.candidacies),
  masculineRate: rate(r.masculine.elected, r.masculine.candidacies),
}));

const MAX = Math.max(
  ...ROWS.flatMap((r) => [r.feminineRate ?? 0, r.masculineRate ?? 0]),
  1,
);

function Cell({
  label,
  value,
  elected,
  candidacies,
  filled,
}: {
  label: string;
  value: number | null;
  elected: number;
  candidacies: number;
  filled: boolean;
}) {
  return (
    <td className="py-3 pr-4 align-top">
      <p className="font-mono text-[12px] uppercase tracking-wider text-muted-foreground md:hidden">
        {label}
      </p>
      <p className="poster-figure text-2xl text-ink">
        {value === null ? "—" : pct(value)}
      </p>
      <p className="mt-1 font-mono text-[12px] leading-relaxed text-muted-foreground">
        {n(elected)} eleitas de {n(candidacies)} candidaturas
      </p>
      <div
        className="mt-2 h-2 w-full max-w-[10rem] overflow-hidden rounded-sm bg-secondary"
        aria-hidden
      >
        <div
          className={`h-full rounded-sm ${filled ? "bg-plum" : "bg-ink"}`}
          style={{
            width: `${((value ?? 0) / MAX) * 100}%`,
            minWidth: value ? "2px" : "0",
          }}
        />
      </div>
    </td>
  );
}

export function ElectionRateByGender() {
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-left">
          <caption className="sr-only">
            Taxa de eleição nas eleições proporcionais de 1º turno, por gênero e
            por ano: percentual de candidaturas que resultaram em cadeira, com
            número de eleitas e de candidaturas em cada célula.
          </caption>
          <thead>
            <tr className="border-b-2 border-ink">
              <th
                scope="col"
                className="py-3 pr-4 font-mono text-[12px] uppercase tracking-wider text-muted-foreground"
              >
                Ano
              </th>
              <th
                scope="col"
                className="py-3 pr-4 font-mono text-[12px] uppercase tracking-wider text-muted-foreground"
              >
                Taxa de eleição · mulheres
              </th>
              <th
                scope="col"
                className="py-3 pr-4 font-mono text-[12px] uppercase tracking-wider text-muted-foreground"
              >
                Taxa de eleição · homens
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.year} className="border-b border-rule">
                <th
                  scope="row"
                  className="py-3 pr-4 align-top font-display text-xl text-ink"
                >
                  {r.year}
                </th>
                <Cell
                  label="Mulheres"
                  value={r.feminineRate}
                  elected={r.feminine.elected}
                  candidacies={r.feminine.candidacies}
                  filled
                />
                <Cell
                  label="Homens"
                  value={r.masculineRate}
                  elected={r.masculine.elected}
                  candidacies={r.masculine.candidacies}
                  filled={false}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="font-mono text-[12px] leading-relaxed text-ink/70">
        Fórmula: {ELECTION_RATE_FORMULA}. Recorte: eleições proporcionais
        (Câmara dos Deputados, assembleias legislativas e Câmara Legislativa do
        DF), resultado de 1º turno. Registros com gênero “não divulgável” (2018 e
        2022) ficam fora das duas taxas, então os dois grupos não somam o total
        do ano. Cargos majoritários não entram: o universo é pequeno e parte
        deles é decidida em 2º turno.
        {ROWS.some((r) => r.caveat) ? " " : ""}
        {ROWS.filter((r) => r.caveat).map((r) => r.caveat)}
      </p>
    </div>
  );
}
