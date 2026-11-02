import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { Secao } from "@/components/editorial/Secao";
import { ELEITAS_2026, ELEITAS_META, type CargoEleita } from "@/data/eleitas-2026";
import { CARGO_PLURAL, CARGO_ROTULO, UF_NOME } from "@/data/eleitas-cruzamentos";
import { formatInt as n } from "@/lib/format-br";

const description = `As ${ELEITAS_2026.length} mulheres eleitas em 2026, uma a uma: cargo, estado, partido e cor/raça declarada, com fonte.`;

export const Route = createFileRoute("/eleitas/")({
  head: () => ({
    meta: [
      { title: "Quem entrou: as eleitas de 2026 | Quem são elas?" },
      { name: "description", content: description },
      { property: "og:title", content: "Quem entrou: as eleitas de 2026" },
      { property: "og:description", content: description },
    ],
  }),
  component: EleitasPage,
});

const CARGOS = Object.keys(CARGO_PLURAL) as CargoEleita[];
const COR: Record<string, string> = { BRANCA: "branca", PARDA: "parda", PRETA: "preta", "INDÍGENA": "indígena", AMARELA: "amarela" };

function EleitasPage() {
  const [cargo, setCargo] = useState<CargoEleita | "">("");
  const [uf, setUf] = useState("");
  const [partido, setPartido] = useState("");
  const partidos = useMemo(() => [...new Set(ELEITAS_2026.map((e) => e.partido))].sort(), []);
  const ufs = useMemo(() => [...new Set(ELEITAS_2026.map((e) => e.uf))].sort(), []);
  const lista = ELEITAS_2026.filter((e) => (!cargo || e.cargo === cargo) && (!uf || e.uf === uf) && (!partido || e.partido === partido));
  const chip = (ativo: boolean) =>
    `min-h-11 border px-3 py-1 text-[14px] font-semibold ${ativo ? "border-ink bg-ink text-cream" : "border-rule bg-card text-ink hover:border-ink"}`;
  const sel = "min-h-11 border border-rule bg-card px-3 text-[15px] text-ink";

  return (
    <PageShell breadcrumb={[{ label: "Dados 2026", to: "/quem-chega" }, { label: "Quem entrou" }]}>
      <header className="py-10 md:py-14">
        <Secao nome="Quem entrou" tipo="fichas" />
        <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-plum md:text-6xl">
          As {n(ELEITAS_2026.length)} mulheres eleitas em 2026, uma a uma
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
          {CARGOS.map((c) => `${n(ELEITAS_META.porCargo[c] ?? 0)} ${CARGO_PLURAL[c].toLowerCase()}`).join(", ")}. Cada ficha traz o
          registro público no TSE e, quando existe, o que o site já levantou sobre ela. Trajetória e atuação no mandato entram
          depois da posse.
        </p>
      </header>

      <section aria-label="Filtros" className="space-y-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Cargo">
          <button type="button" className={chip(!cargo)} aria-pressed={!cargo} onClick={() => setCargo("")}>
            Todos os cargos
          </button>
          {CARGOS.map((c) => (
            <button key={c} type="button" className={chip(cargo === c)} aria-pressed={cargo === c} onClick={() => setCargo(c)}>
              {CARGO_PLURAL[c]} ({n(ELEITAS_META.porCargo[c] ?? 0)})
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-4">
          <label className="flex flex-col gap-1 text-[13px] font-semibold text-ink">
            Estado
            <select value={uf} onChange={(e) => setUf(e.target.value)} className={sel}>
              <option value="">Todos</option>
              {ufs.map((u) => (
                <option key={u} value={u}>
                  {UF_NOME[u] ?? u}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-[13px] font-semibold text-ink">
            Partido
            <select value={partido} onChange={(e) => setPartido(e.target.value)} className={sel}>
              <option value="">Todos</option>
              {partidos.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>
        </div>
        <p className="text-[14px] text-ink/70" aria-live="polite">
          {n(lista.length)} {lista.length === 1 ? "eleita" : "eleitas"}
        </p>
      </section>

      <ul className="mt-6 grid gap-x-8 pb-16 sm:grid-cols-2 lg:grid-cols-3">
        {lista.map((e) => (
          <li key={e.slug} className="border-b border-rule">
            <a href={`/eleitas/${e.slug}`} className="group block py-3">
              <span className="font-display text-lg leading-snug text-ink group-hover:underline group-hover:underline-offset-4">
                {e.nome}
              </span>
              <span className="mt-0.5 block text-[14px] text-ink/70">
                {CARGO_ROTULO[e.cargo]} · {e.partido}-{e.uf} · {COR[e.corRaca] ?? e.corRaca.toLowerCase()}
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="pb-12 font-mono text-[13px] text-muted-foreground">
        Fonte: TSE, Candidatos 2026, base de {ELEITAS_META.baseGeneratedAt} · SHA-256 {ELEITAS_META.csvSha256.slice(0, 16)}…
      </p>
    </PageShell>
  );
}
