import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { AtlasEleitas } from "@/components/editorial/AtlasEleitas";
import { ELEITAS_2026, ELEITAS_META, type CargoEleita } from "@/data/eleitas-2026";
import { CARGO_PLURAL, CARGO_ROTULO, UF_NOME } from "@/data/eleitas-cruzamentos";
import { TRAJETORIA_ELEITAS } from "@/data/eleitas-trajetoria-2026";
import { formatInt as n, formatPct } from "@/lib/format-br";
import {
  RESULT_2026_PROPORCIONAL,
  RESULT_2026_SENADO,
  RESULT_2026_GOVERNO,
  RESULT_2026_META,
} from "@/data/resultado-2026";

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
/** Vagas disputadas em 2026, nunca a composição integral de uma Casa não renovada por inteiro. */
const VAGAS_2026: Record<CargoEleita, number> = {
  "deputada-federal": RESULT_2026_PROPORCIONAL.byCargo.federal.seats,
  "deputada-estadual": RESULT_2026_PROPORCIONAL.byCargo.estadual.seats,
  "deputada-distrital": RESULT_2026_PROPORCIONAL.byCargo.distrital.seats,
  senadora: RESULT_2026_SENADO.seats,
  governadora: RESULT_2026_GOVERNO.totalUfs,
};
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
const LOTE = 18;

function EleitasPage() {
  const [f, setF] = useState<Filtros>(VAZIO);
  const [visiveis, setVisiveis] = useState(LOTE);
  const [filtrosProntos, setFiltrosProntos] = useState(false);
  // filtros no endereço: um recorte pode ser compartilhado por link
  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search);
      const lido = { ...VAZIO };
      CHAVES.forEach((k) => (lido[k] = q.get(k) ?? ""));
      setF(lido);
    } catch {
      /* sem endereço legível: segue sem filtro */
    } finally {
      setFiltrosProntos(true);
    }
  }, []);
  useEffect(() => {
    if (!filtrosProntos) return;
    try {
      const q = new URLSearchParams();
      CHAVES.forEach((k) => f[k] && q.set(k, f[k]));
      const qs = q.toString();
      window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
    } catch {
      /* ignora */
    }
  }, [f, filtrosProntos]);
  useEffect(() => setVisiveis(LOTE), [f.cargo, f.uf, f.partido, f.cor, f.em2022, f.nome]);
  const set = (k: keyof Filtros) => (v: string) => setF((x) => ({ ...x, [k]: v }));
  const { cargo, uf, partido, cor, nome } = f;
  const partidos = useMemo(() => [...new Set(ELEITAS_2026.map((e) => e.partido))].sort(), []);
  const ufs = useMemo(() => [...new Set(ELEITAS_2026.map((e) => e.uf))].sort(), []);
  const busca = semAcento(nome.trim());
  // Atlas preserva a comparação territorial depois dos demais filtros, mas
  // antes da UF escolhida. A lista nominal aplica também a UF selecionada.
  const listaSemUF = ELEITAS_2026.filter(
    (e) =>
      (!cargo || e.cargo === cargo) &&
      (!partido || e.partido === partido) &&
      (!cor || e.corRaca === cor) &&
      (!f.em2022 || em2022(e.slug) === f.em2022) &&
      (!busca || semAcento(e.nome).includes(busca)),
  );
  const lista = listaSemUF.filter((e) => !uf || e.uf === uf);
  const ativos = CHAVES.filter((k) => f[k]).length;
  const exibidas = lista.slice(0, visiveis);
  const porCor = RACAS.map((r) => [r, lista.filter((e) => e.corRaca === r).length] as const).filter(([, v]) => v);
  const porTraj = Object.keys(TRAJ)
    .map((t) => [t, lista.filter((e) => em2022(e.slug) === t).length] as const)
    .filter(([, v]) => v);
  const chip = (ativo: boolean) =>
    `min-h-11 border px-3 py-1 text-[14px] font-semibold ${ativo ? "border-ink bg-ink text-cream" : "border-rule bg-card text-ink hover:border-ink"}`;
  const sel = "min-h-11 border border-rule bg-card px-3 text-[15px] text-ink";

  return (
    <PageShell breadcrumb={[{ label: "Eleições 2026", to: "/quem-chega" }, { label: "Quem entrou" }]}>
      <header className="relative left-1/2 -ml-[50vw] w-screen bg-plum-deep text-paper">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-[.95fr_1.05fr]">
          <div className="flex flex-col justify-center px-5 py-10 md:px-8 md:py-14 lg:py-16 lg:pr-12">
            <p className="text-[13px] font-semibold text-paper/80">Eleições 2026 · Resultado</p>
            <h1 className="mt-5 font-display text-[clamp(2.65rem,5.4vw,5.4rem)] font-semibold leading-[1.02] text-paper">
              Quem <em className="font-normal text-plum-bright">entrou?</em>
            </h1>
            <p className="mt-5 font-display text-[clamp(5rem,9.2vw,8rem)] font-semibold leading-none tabular-nums text-[var(--art-gold)]">
              {n(ELEITAS_2026.length)}
            </p>
            <p className="mt-5 max-w-md text-base leading-relaxed text-paper/90">
              mulheres eleitas em 2026. Cada ficha permite consultar o resultado por
              cargo, estado, partido e cor/raça declarada ao TSE.
            </p>
            <p className="mt-6 max-w-lg text-[13px] leading-relaxed text-paper/75">
              TSE: fichas geradas em {ELEITAS_META.baseGeneratedAt}. Os resultados podem
              receber atualizações. Eleição, diplomação e exercício do mandato são situações distintas.
            </p>
            <a href="#filtros-eleitas" className="mt-6 inline-flex min-h-11 items-center self-start font-semibold text-paper underline underline-offset-4">
              Consultar as fichas <span className="ml-2" aria-hidden="true">↓</span>
            </a>
          </div>
          <figure className="min-w-0 bg-ink px-5 py-9 text-paper md:px-8 md:py-12 lg:py-16 lg:pl-12">
            <figcaption>
              <p className="text-[13px] font-semibold text-[var(--art-gold)]">Da urna à cadeira</p>
              <h2 className="mt-3 max-w-lg font-display text-3xl leading-tight md:text-4xl">
                Quantas vagas foram conquistadas por mulheres?
              </h2>
            </figcaption>
            <ol className="mt-7 space-y-5">
              {CARGOS.map((c) => {
                const eleitas = ELEITAS_META.porCargo[c] ?? 0;
                const vagas = VAGAS_2026[c];
                const percentual = (eleitas / vagas) * 100;
                return (
                  <li key={c}>
                    <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 text-[13px]">
                      <span className="text-paper/90">{CARGO_PLURAL[c]}</span>
                      <strong className="font-mono text-paper tabular-nums">
                        {n(eleitas)} / {n(vagas)} · {formatPct(percentual)}
                      </strong>
                    </div>
                    <div className="h-2 bg-paper/25" aria-hidden="true">
                      <div className="h-full bg-coral" style={{ width: `${percentual}%` }} />
                    </div>
                  </li>
                );
              })}
            </ol>
            <p className="mt-7 max-w-lg border-t border-paper/25 pt-4 text-[13px] leading-relaxed text-paper/75">
              Percentual de vagas disputadas em cada cargo. Senado: somente as 54 vagas
              renovadas em 2026, não as 81 cadeiras da Casa. Fontes: TSE,
              resultado gerado em {RESULT_2026_META.baseGeneratedAt} (vagas);
              fichas das eleitas geradas em {ELEITAS_META.baseGeneratedAt}.
              Bases com cortes distintos, sujeitas à conciliação.
            </p>
          </figure>
        </div>
      </header>
      <section id="filtros-eleitas" aria-label="Filtros" className="scroll-mt-24 space-y-5 border-b border-rule bg-paper py-10">
        <div className="grid items-end gap-5 md:grid-cols-[.75fr_1.25fr] md:gap-12">
          <div>
            <p className="text-[13px] font-semibold text-plum">Arquivo eleitoral · Pesquisa</p>
            <h2 className="mt-2 font-display text-3xl leading-tight text-ink md:text-4xl">
              Encontre uma eleita.
            </h2>
          </div>
          <p className="max-w-2xl text-[15px] leading-relaxed text-ink/80">
            Consulte cargo, estado, partido, cor/raça autodeclarada e trajetória
            registrada. Cada filtro atualiza a lista de fichas e o atlas territorial;
            selecionar uma UF permite comparar o recorte com as demais.
          </p>
        </div>
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

      <AtlasEleitas
        registros={listaSemUF}
        ufs={ufs}
        selecionada={uf}
        selecionar={(selecionada) => {
          set("uf")(selecionada);
          document.getElementById("lista-eleitas")?.scrollIntoView({ block: "start" });
        }}
        corte={ELEITAS_META.baseGeneratedAt}
      />

      <section
        aria-labelledby="lista-eleitas"
        className="relative left-1/2 -ml-[50vw] w-screen bg-plum-deep text-paper"
      >
        <div className="mx-auto grid max-w-7xl lg:grid-cols-[.28fr_.72fr]">
          <div className="px-5 py-10 md:px-8 md:py-14 lg:sticky lg:top-20 lg:self-start lg:pr-10">
            <p className="text-[13px] font-semibold text-[var(--art-gold)]">
              Arquivo nominal · TSE 2026
            </p>
            <h2 id="lista-eleitas" className="mt-3 scroll-mt-24 font-display text-3xl leading-tight md:text-4xl">
              Nomes e fichas
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-paper/80" aria-live="polite">
              Exibindo {n(exibidas.length)} de {n(lista.length)} {lista.length === 1 ? "eleita" : "eleitas"}
              {uf ? ` · ${UF_NOME[uf] ?? uf}` : ""}.
            </p>
            <p className="mt-4 text-[13px] leading-relaxed text-paper/70">
              Cada nome abre sua ficha individual. O carregamento progressivo
              conserva a consulta sem transformar a página em um mural de registros.
            </p>
            <p className="mt-6 border-t border-paper/25 pt-4 text-[12px] leading-relaxed text-paper/70">
              Fonte: TSE, base de eleitas gerada em {ELEITAS_META.baseGeneratedAt}.
              Os registros documentam a eleição, não a posse ou o exercício efetivo do mandato.
            </p>
          </div>
          <div className="min-w-0 bg-paper px-5 py-8 text-ink md:px-8 md:py-12 lg:pl-10">
            {exibidas.length > 0 ? (
              <ol className="grid gap-x-9 sm:grid-cols-2">
                {exibidas.map((e) => (
                  <li key={e.slug} className="min-w-0 border-b border-rule">
                    <a href={`/eleitas/${e.slug}`} className="group block py-4 focus-visible:outline-2">
                      <span className="block font-display text-xl leading-snug text-ink group-hover:text-plum group-hover:underline group-hover:underline-offset-4">
                        {e.nome}
                      </span>
                      <span className="mt-1.5 block text-[14px] leading-snug text-ink/75">
                        {CARGO_ROTULO[e.cargo]} · {e.partido}-{e.uf} · {COR[e.corRaca] ?? e.corRaca.toLowerCase()}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="border-l-4 border-coral py-2 pl-4 text-base leading-relaxed">
                Não há fichas de eleitas para este recorte. Remova um filtro ou
                consulte as candidaturas no <a href="/comparar" className="font-semibold text-plum underline underline-offset-4">Comparador</a>.
              </p>
            )}
            {exibidas.length < lista.length && (
              <button
                type="button"
                onClick={() => setVisiveis((v) => Math.min(v + LOTE, lista.length))}
                className="mt-8 inline-flex min-h-12 items-center border-2 border-plum px-6 py-3 text-sm font-semibold text-plum hover:bg-plum hover:text-paper"
              >
                Mostrar mais fichas
              </button>
            )}
          </div>
        </div>
      </section>
      <p className="pb-12 font-mono text-[13px] text-muted-foreground">
        Fonte: TSE, Candidatos 2026, base de {ELEITAS_META.baseGeneratedAt} · SHA-256 {ELEITAS_META.csvSha256.slice(0, 16)}…
      </p>
    </PageShell>
  );
}
