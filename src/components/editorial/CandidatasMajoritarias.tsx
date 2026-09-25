import { useMemo, useState } from "react";
import { ChartSignature } from "@/components/editorial/ChartFrame";
import {
  CANDIDATAS_BASE,
  CANDIDATAS_MAJORITARIAS_2026,
  type CargoMajoritario,
  type CandidataRow,
} from "@/data/candidatas-majoritarias-2026";
import { formatBRLCompact, formatInt } from "@/lib/format-br";

const CARGO_LABEL: Record<CargoMajoritario, string> = {
  presidencia: "Presidência",
  governo: "Governo",
  senado: "Senado",
};

const RACA_LABEL: Record<CandidataRow[4], string> = {
  branca: "Branca",
  parda: "Parda",
  preta: "Preta",
  indigena: "Indígena",
  amarela: "Amarela",
};

const RACA_DOT: Record<CandidataRow[4], string> = {
  branca: "bg-[var(--race-branca)]",
  parda: "bg-[var(--race-parda)]",
  preta: "bg-plum",
  indigena: "bg-forest",
  amarela: "bg-[var(--race-amarela)]",
};

const FILTERS: { id: "todas" | CargoMajoritario; label: string }[] = [
  { id: "todas", label: "Todas" },
  { id: "presidencia", label: "Presidência" },
  { id: "governo", label: "Governo" },
  { id: "senado", label: "Senado" },
];

function chapa(cargo: CargoMajoritario, code: string): string {
  const who = (c: string) => (c === "m" ? "mulher" : c === "h" ? "homem" : "dois registros no arquivo");
  if (cargo === "senado") return `1ª suplência: ${who(code[0] ?? "")} · 2ª: ${who(code[1] ?? "")}`;
  return `Vice: ${who(code[0] ?? "")}`;
}

function receita(value: number): string {
  return value > 0 ? formatBRLCompact(value) : "R$ 0";
}

export function CandidatasMajoritarias() {
  const [cargo, setCargo] = useState<"todas" | CargoMajoritario>("todas");
  const [uf, setUf] = useState("todas");
  const [busca, setBusca] = useState("");
  const [todas, setTodas] = useState(false);

  const ufs = useMemo(
    () => Array.from(new Set(CANDIDATAS_MAJORITARIAS_2026.map((r) => r[2]).filter((u) => u !== "BR"))).sort(),
    [],
  );

  const rows = useMemo(() => {
    const q = busca.trim().toLocaleLowerCase("pt-BR");
    return CANDIDATAS_MAJORITARIAS_2026.filter((r) =>
      (cargo === "todas" || r[1] === cargo) &&
      (uf === "todas" || r[2] === uf || (uf === "BR" && r[1] === "presidencia")) &&
      (!q || r[0].toLocaleLowerCase("pt-BR").includes(q) || r[3].toLocaleLowerCase("pt-BR").includes(q)),
    );
  }, [cargo, uf, busca]);

  const LIMIT = 12;
  const visible = todas ? rows : rows.slice(0, LIMIT);

  const counts = useMemo(() => {
    const c = { presidencia: 0, governo: 0, senado: 0 };
    for (const r of CANDIDATAS_MAJORITARIAS_2026) c[r[1]] += 1;
    return c;
  }, []);

  return (
    <figure className="border border-rule bg-card">
      <figcaption className="border-b border-ink px-5 pb-4 pt-5 md:px-6">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-plum">Lista de registro · base de {CANDIDATAS_BASE}</p>
        <p className="mt-2 text-sm text-ink">
          {counts.presidencia} à Presidência, {counts.governo} aos governos estaduais e {counts.senado} ao Senado. Nome de urna como registrado no TSE.
        </p>
      </figcaption>

      <div className="flex flex-wrap items-end gap-4 border-b border-rule px-5 py-4 md:px-6">
        <div role="group" aria-label="Filtrar por cargo" className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setCargo(f.id)}
              aria-pressed={cargo === f.id}
              className={`min-h-10 border px-3 py-1.5 font-mono text-xs uppercase tracking-[0.1em] ${cargo === f.id ? "border-plum bg-plum text-cream" : "border-rule text-ink hover:border-plum"}`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          Estado
          <select
            value={uf}
            onChange={(e) => setUf(e.target.value)}
            className="min-h-10 border border-rule bg-card px-2 text-sm text-ink"
          >
            <option value="todas">Todos</option>
            {ufs.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </label>
        <label className="flex min-w-[12rem] flex-1 flex-col gap-1 text-xs text-muted-foreground">
          Nome ou partido
          <input
            type="search"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Ex.: Senado, PT, Maria"
            className="min-h-10 border border-rule bg-card px-3 text-sm text-ink placeholder:text-muted-foreground"
          />
        </label>
      </div>

      <p className="px-5 pt-4 text-sm text-muted-foreground md:px-6" aria-live="polite">
        {rows.length === CANDIDATAS_MAJORITARIAS_2026.length ? "Mostrando todas." : `Mostrando ${formatInt(rows.length)} de ${formatInt(CANDIDATAS_MAJORITARIAS_2026.length)}.`}
      </p>

      {/* Tabela no desktop */}
      <div className="hidden px-5 pb-2 md:block md:px-6">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only">Candidaturas de mulheres à Presidência, aos governos e ao Senado em 2026</caption>
          <thead>
            <tr className="border-b-2 border-ink">
              {["Nome de urna", "Cargo", "UF", "Partido", "Cor/raça declarada", "Chapa", "Receita declarada"].map((h, i) => (
                <th key={h} scope="col" className={`py-2 pr-4 font-mono text-xs font-normal uppercase text-muted-foreground ${i === 6 ? "text-right" : ""}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((r) => (
              <tr key={`${r[1]}-${r[2]}-${r[0]}-${r[3]}`} className="border-b border-rule align-top">
                <th scope="row" className="py-2.5 pr-4 font-display text-base font-semibold text-ink">{r[0]}</th>
                <td className="py-2.5 pr-4 text-ink">{CARGO_LABEL[r[1]]}</td>
                <td className="py-2.5 pr-4 font-mono text-xs text-ink">{r[2]}</td>
                <td className="py-2.5 pr-4 text-ink">{r[3]}</td>
                <td className="py-2.5 pr-4 text-ink"><span className="inline-flex items-center gap-2"><span className={`size-2.5 ${RACA_DOT[r[4]]}`} aria-hidden="true" />{RACA_LABEL[r[4]]}</span></td>
                <td className="py-2.5 pr-4 text-xs text-muted-foreground">{chapa(r[1], r[5])}</td>
                <td className="py-2.5 text-right font-mono text-xs text-ink">{receita(r[6])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Lista no celular */}
      <ul className="divide-y divide-rule px-5 md:hidden">
        {visible.map((r) => (
          <li key={`${r[1]}-${r[2]}-${r[0]}-${r[3]}`} className="py-3">
            <p className="font-display text-lg font-semibold leading-tight text-ink">{r[0]}</p>
            <p className="mt-1 text-sm text-ink">{CARGO_LABEL[r[1]]} · {r[2]} · {r[3]}</p>
            <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><span className={`size-2 ${RACA_DOT[r[4]]}`} aria-hidden="true" />{RACA_LABEL[r[4]]}</span>
              <span>{chapa(r[1], r[5])}</span>
              <span className="font-mono">{receita(r[6])}</span>
            </p>
          </li>
        ))}
      </ul>

      {rows.length > LIMIT && (
        <div className="px-5 pb-5 pt-3 md:px-6">
          <button
            type="button"
            onClick={() => setTodas((v) => !v)}
            aria-expanded={todas}
            className="inline-flex min-h-11 items-center gap-2 border border-plum px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] text-plum hover:bg-lilac"
          >
            {todas ? "Mostrar menos" : `Mostrar todas as ${formatInt(rows.length)}`}
          </button>
        </div>
      )}

      <div className="flex flex-wrap items-end justify-between gap-3 border-t border-rule px-5 py-3 md:px-6">
        <div className="max-w-3xl space-y-1 text-xs leading-relaxed text-muted-foreground">
          <p>
            Pedidos de registro. O arquivo de 2026 ainda não informa a situação de cada candidatura (deferida, indeferida, renúncia).
            Cor/raça é autodeclaração ao TSE. Receita declarada até {CANDIDATAS_BASE}, contas em andamento. Quando vice ou suplente foi substituído, a tabela mostra o registro mais recente.
            A página oficial de cada candidatura está no{" "}
            <a href="https://divulgacandcontas.tse.jus.br/" target="_blank" rel="noreferrer" className="text-plum underline underline-offset-4">DivulgaCandContas, do TSE</a>.
          </p>
          <p className="font-mono">Fonte: TSE, Candidaturas e Prestação de Contas 2026 · base de {CANDIDATAS_BASE}</p>
        </div>
        <ChartSignature />
      </div>
    </figure>
  );
}
