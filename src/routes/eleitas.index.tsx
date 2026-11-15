import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { ELEITAS_2026, ELEITAS_META, type CargoEleita } from "@/data/eleitas-2026";
import { CARGO_PLURAL, CARGO_ROTULO, UF_NOME } from "@/data/eleitas-cruzamentos";
import { TRAJETORIA_ELEITAS } from "@/data/eleitas-trajetoria-2026";
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

const RACAS = ["BRANCA", "PARDA", "PRETA", "INDÍGENA", "AMARELA"] as const;
const TRAJ: Record<string, string> = {
  eleita: "Eleita em 2022",
  suplente: "Suplente em 2022",
  "não eleita": "Não eleita em 2022",
  "nao-disputou": "Sem candidatura em 2022",
};
function resumoTraj(t: string, v: number) {
  const pl = v > 1 ? "s" : "";
  if (t === "nao-disputou") return "sem candidatura";
  return t === "eleita" ? `eleita${pl}` : t === "suplente" ? `suplente${pl}` : `não eleita${pl}`;
}
const em2022 = (slug: string) => TRAJETORIA_ELEITAS[slug]?.em2022?.resultado ?? "nao-disputou";
const semAcento = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const CHAVES = ["cargo", "uf", "partido", "cor", "em2022", "nome"] as const;
type Filtros = Record<(typeof CHAVES)[number], string>;
const VAZIO: Filtros = { cargo: "", uf: "", partido: "", cor: "", em2022: "", nome: "" };

function EleitasPage() {
  const [f, setF] = useState<Filtros>(VAZIO);
  // filtros no endereço: um recorte pode ser compartilhado por link
  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search);
      const lido = { ...VAZIO };
      CHAVES.forEach((k) => (lido[k] = q.get(k) ?? ""));
      setF(lido);
    } catch {
      /* sem endereço legível: segue sem filtro */
    }
  }, []);
  useEffect(() => {
    try {
      const q = new URLSearchParams();
      CHAVES.forEach((k) => f[k] && q.set(k, f[k]));
      const qs = q.toString();
      window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
    } catch {
      /* ignora */
    }
  }, [f]);
  const set = (k: keyof Filtros) => (v: string) => setF((x) => ({ ...x, [k]: v }));
  const { cargo, uf, partido, cor, nome } = f;
  const partidos = useMemo(() => [...new Set(ELEITAS_2026.map((e) => e.partido))].sort(), []);
  const ufs = useMemo(() => [...new Set(ELEITAS_2026.map((e) => e.uf))].sort(), []);
  const busca = semAcento(nome.trim());
  const lista = ELEITAS_2026.filter(
    (e) =>
      (!cargo || e.cargo === cargo) &&
      (!uf || e.uf === uf) &&
      (!partido || e.partido === partido) &&
      (!cor || e.corRaca === cor) &&
      (!f.em2022 || em2022(e.slug) === f.em2022) &&
      (!busca || semAcento(e.nome).includes(busca)),
  );
  const ativos = CHAVES.filter((k) => f[k]).length;
  const porCor = RACAS.map((r) => [r, lista.filter((e) => e.corRaca === r).length] as const).filter(([, v]) => v);
  const porTraj = Object.keys(TRAJ)
    .map((t) => [t, lista.filter((e) => em2022(e.slug) === t).length] as const)
    .filter(([, v]) => v);
  const chip = (ativo: boolean) =>
    `min-h-11 border px-3 py-1 text-[14px] font-semibold ${ativo ? "border-ink bg-ink text-cream" : "border-rule bg-card text-ink hover:border-ink"}`;
  const sel = "min-h-11 border border-rule bg-card px-3 text-[15px] text-ink";

  return (
    <PageShell breadcrumb={[{ label: "Eleições 2026", to: "/quem-chega" }, { label: "Quem entrou" }]}>
      <header className="relative left-1/2 -ml-[50vw] w-screen bg-cream">
        <div className="mx-auto grid max-w-7xl gap-7 px-5 py-11 md:px-8 md:py-15 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-plum">Dados eleitorais · Catálogo de fichas</p>
            <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.45rem,4vw,4rem)] font-semibold leading-[1.05] text-ink">
              As {n(ELEITAS_2026.length)} mulheres eleitas em 2026, uma a uma
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink/85">
              {CARGOS.map((c) => `${n(ELEITAS_META.porCargo[c] ?? 0)} ${CARGO_PLURAL[c].toLowerCase()}`).join(", ")}.
              Cada ficha traz o registro público no TSE e, quando existe, o que o site já levantou sobre ela.
              Quem já é deputada federal tem o registro de 2026 no{" "}
              <a href="/monitor" className="underline decoration-plum underline-offset-4">monitor de mandato</a>;
              a atuação no novo mandato entra depois da posse.
            </p>
          </div>
          <aside className="border-l-4 border-plum bg-paper p-6 text-ink" aria-label="Sobre a consulta">
            <p className="text-xs font-semibold uppercase tracking-wide text-plum">Como usar esta página</p>
            <p className="mt-3 font-display text-xl leading-snug">Escolha o cargo, o estado ou o partido para consultar as fichas.</p>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">
              Os filtros não alteram o universo original; mostram um recorte da base. A cor/raça segue a autodeclaração registrada no TSE.
            </p>
            <a href="#filtros-eleitas" className="mt-4 inline-flex min-h-11 items-center font-semibold text-plum underline underline-offset-4">
              Ir aos filtros ↘
            </a>
          </aside>
        </div>
      </header>

      <section id="filtros-eleitas" aria-label="Filtros" className="scroll-mt-24 space-y-4 border-b border-rule bg-paper py-8">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Cargo">
          <button type="button" className={chip(!cargo)} aria-pressed={!cargo} onClick={() => set("cargo")("")}>
            Todos os cargos
          </button>
          {CARGOS.map((c) => (
            <button key={c} type="button" className={chip(cargo === c)} aria-pressed={cargo === c} onClick={() => set("cargo")(c)}>
              {CARGO_PLURAL[c]} ({n(ELEITAS_META.porCargo[c] ?? 0)})
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-4">
          <label className="flex flex-col gap-1 text-[13px] font-semibold text-ink">
            Estado
            <select value={uf} onChange={(e) => set("uf")(e.target.value)} className={sel}>
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
            <select value={partido} onChange={(e) => set("partido")(e.target.value)} className={sel}>
              <option value="">Todos</option>
              {partidos.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-[13px] font-semibold text-ink">
            Cor/raça declarada
            <select value={cor} onChange={(e) => set("cor")(e.target.value)} className={sel}>
              <option value="">Todas</option>
              {RACAS.map((r) => (
                <option key={r} value={r}>
                  {COR[r]}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-[13px] font-semibold text-ink">
            Em 2022
            <select value={f.em2022} onChange={(e) => set("em2022")(e.target.value)} className={sel}>
              <option value="">Qualquer</option>
              {Object.entries(TRAJ).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-[13px] font-semibold text-ink">
            Nome
            <input
              type="search"
              value={nome}
              onChange={(e) => set("nome")(e.target.value)}
              placeholder="Buscar pelo nome de urna"
              className={`${sel} w-56`}
            />
          </label>
        </div>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1" aria-live="polite">
          <p className="font-display text-2xl text-plum">
            {n(lista.length)} {lista.length === 1 ? "eleita" : "eleitas"}
          </p>
          {ativos > 0 && (
            <button type="button" onClick={() => setF(VAZIO)} className="min-h-11 text-[14px] font-semibold text-ink underline underline-offset-4">
              Limpar {ativos === 1 ? "filtro" : `${ativos} filtros`}
            </button>
          )}
        </div>
        {lista.length > 0 && (
          <dl className="grid max-w-3xl gap-3 border-y border-rule py-3 text-[14px] text-ink/80 sm:grid-cols-2">
            <div>
              <dt className="font-semibold text-ink">Cor/raça declarada</dt>
              <dd>{porCor.map(([r, v]) => `${n(v)} ${COR[r]}${v > 1 ? "s" : ""}`).join(" · ")}</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">Na eleição geral de 2022</dt>
              <dd>{porTraj.map(([t, v]) => `${n(v)} ${resumoTraj(t, v)}`).join(" · ")}</dd>
            </div>
          </dl>
        )}
        {lista.length === 0 && (
          <p className="max-w-2xl border-l-4 border-coral pl-4 text-[16px] text-ink">
            Nenhuma mulher foi eleita em 2026 com esse recorte. A ausência também é dado: confira as candidaturas em{" "}
            <a href="/comparar" className="underline decoration-plum underline-offset-4">Comparador</a>.
          </p>
        )}
        {ativos > 0 && (
          <p className="text-[13px] text-muted-foreground">O endereço desta página guarda os filtros: dá para copiar e mandar o recorte.</p>
        )}
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
