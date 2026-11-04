import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { Secao } from "@/components/editorial/Secao";
import { ComoSabemos } from "@/components/editorial/ComoSabemos";
import { RECORTE_META, RECORTE_PARTIDOS, RECORTE_TOTAL, RECORTE_UFS, type Recorte } from "@/data/partido-uf-2026";
import { FEFC_META, FEFC_PARTIDOS, FEFC_TOTAL, type FefcPartido } from "@/data/fefc-partidos-2026";
import { UF_NOME } from "@/data/eleitas-cruzamentos";
import { formatInt as n, formatPct } from "@/lib/format-br";

const description =
  "Compare partidos ou estados lado a lado: quantas mulheres se candidataram e se elegeram, quem são por cor/raça, quem se elege dentro de cada um e como o fundo eleitoral foi dividido.";

export const Route = createFileRoute("/comparar")({
  head: () => ({
    meta: [
      { title: "Comparador: partidos e estados | Quem são elas?" },
      { name: "description", content: description },
      { property: "og:title", content: "Compare partidos e estados, lado a lado" },
      { property: "og:description", content: description },
    ],
  }),
  component: CompararPage,
});

type Tipo = "partido" | "uf";
const SMALL = 20;
const RACAS = [
  ["BRANCA", "brancas"],
  ["PARDA", "pardas"],
  ["PRETA", "pretas"],
  ["INDÍGENA", "indígenas"],
  ["AMARELA", "amarelas"],
] as const;

const pct = (a: number, b: number) => (b ? formatPct((a / b) * 100) : "—");
const taxa = (a: number, b: number) => (!b ? "—" : b >= SMALL ? formatPct((a / b) * 100) : `${n(a)} de ${n(b)}`);
const parte = (a: number, b: number) => (b >= SMALL ? formatPct((a / b) * 100) : `${n(a)} de ${n(b)}`);
const g = (r: Record<string, number>, k: string) => r[k] ?? 0;

const PARTIDOS = Object.entries(RECORTE_PARTIDOS)
  .filter(([, r]) => r.eleitos > 0)
  .sort((a, b) => b[1].eleitos - a[1].eleitos)
  .map(([p]) => p);
const UFS = Object.keys(RECORTE_UFS).sort((a, b) => (UF_NOME[a] ?? a).localeCompare(UF_NOME[b] ?? b));
const PADRAO: Record<Tipo, string[]> = { partido: ["PL", "PT", "MDB"], uf: ["SP", "BA", "RS"] };

type Linha = { rotulo: string; valor: (r: Recorte, f: FefcPartido | undefined) => string; so?: Tipo; nota?: string };
type Bloco = { titulo: string; linhas: Linha[] };

const BLOCOS: Bloco[] = [
  {
    titulo: "Candidatura e cadeira",
    linhas: [
      { rotulo: "Cadeiras de deputado preenchidas", valor: (r) => n(r.eleitos) },
      { rotulo: "Mulheres eleitas", valor: (r) => n(r.eleitas) },
      { rotulo: "Mulheres nas candidaturas", valor: (r) => pct(r.candidatas, r.candidaturas) },
      { rotulo: "Mulheres nas cadeiras", valor: (r) => parte(r.eleitas, r.eleitos) },
    ],
  },
  {
    titulo: "Quem são as eleitas (cor/raça declarada)",
    linhas: RACAS.map(([k, l]) => ({ rotulo: `Eleitas ${l}`, valor: (r: Recorte) => n(g(r.eleitasRaca, k)) })),
  },
  {
    titulo: "Quem se elege: taxa de eleição",
    linhas: [
      {
        rotulo: "Homens brancos",
        valor: (r) =>
          taxa(g(r.eleitosRaca, "BRANCA") - g(r.eleitasRaca, "BRANCA"), g(r.candidaturasRaca, "BRANCA") - g(r.candidatasRaca, "BRANCA")),
      },
      { rotulo: "Mulheres brancas", valor: (r) => taxa(g(r.eleitasRaca, "BRANCA"), g(r.candidatasRaca, "BRANCA")) },
      { rotulo: "Mulheres pardas", valor: (r) => taxa(g(r.eleitasRaca, "PARDA"), g(r.candidatasRaca, "PARDA")) },
      { rotulo: "Mulheres pretas", valor: (r) => taxa(g(r.eleitasRaca, "PRETA"), g(r.candidatasRaca, "PRETA")) },
    ],
  },
  {
    titulo: "Fundo eleitoral a deputado",
    linhas: [
      { rotulo: "Mulheres: parte do fundo", so: "partido", valor: (_, f) => (f ? pct(f.mulheres.fefc, f.fefc) : "sem fundo") },
      { rotulo: "Mulheres: parte das candidaturas", so: "partido", valor: (_, f) => (f ? pct(f.mulheres.candidaturas, f.candidaturas) : "—") },
      { rotulo: "Candidaturas pardas: parte do fundo", so: "partido", valor: (_, f) => (f ? pct(f.raca["PARDA"]?.fefc ?? 0, f.fefc) : "—") },
      { rotulo: "Candidaturas pretas: parte do fundo", so: "partido", valor: (_, f) => (f ? pct(f.raca["PRETA"]?.fefc ?? 0, f.fefc) : "—") },
      {
        rotulo: "Pretas e pardas somadas (régua da lei)",
        so: "partido",
        valor: (_, f) => (f ? pct(f.pretasPardasSoma.fefc, f.fefc) : "—"),
      },
    ],
  },
];

function lerEndereco(): { tipo: Tipo; sel: string[] } | null {
  try {
    const q = new URLSearchParams(window.location.search);
    const tipo: Tipo = q.get("tipo") === "uf" ? "uf" : "partido";
    const lista = tipo === "uf" ? UFS : PARTIDOS;
    const sel = ["a", "b", "c"].map((k) => q.get(k) ?? "").filter((v) => lista.includes(v));
    return q.has("tipo") ? { tipo, sel } : null;
  } catch {
    return null;
  }
}

function CompararPage() {
  const [tipo, setTipo] = useState<Tipo>("partido");
  const [sel, setSel] = useState<string[]>(PADRAO.partido);
  useEffect(() => {
    const e = lerEndereco();
    if (e) {
      setTipo(e.tipo);
      setSel(e.sel.length ? e.sel : PADRAO[e.tipo]);
    }
  }, []);
  useEffect(() => {
    try {
      const q = new URLSearchParams({ tipo });
      sel.forEach((v, i) => v && q.set(["a", "b", "c"][i]!, v));
      window.history.replaceState(null, "", `?${q.toString()}`);
    } catch {
      /* ignora */
    }
  }, [tipo, sel]);

  const lista = tipo === "uf" ? UFS : PARTIDOS;
  const nome = (v: string) => (tipo === "uf" ? (UF_NOME[v] ?? v) : v);
  const dados = (v: string) => (tipo === "uf" ? RECORTE_UFS[v] : RECORTE_PARTIDOS[v]);
  const colunas = sel.filter(Boolean);
  const trocar = (t: Tipo) => {
    setTipo(t);
    setSel(PADRAO[t]);
  };
  const chip = (ativo: boolean) =>
    `min-h-11 border px-4 py-1 text-[15px] font-semibold ${ativo ? "border-ink bg-ink text-cream" : "border-rule bg-card text-ink hover:border-ink"}`;
  const selCls = "min-h-11 border border-rule bg-card px-3 text-[15px] text-ink";

  return (
    <PageShell breadcrumb={[{ label: "Eleições 2026", to: "/quem-chega" }, { label: "Comparador" }]}>
      <header className="py-10 md:py-14">
        <Secao nome="Comparador" tipo="ferramenta" />
        <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-plum md:text-6xl">
          Compare partidos ou estados, lado a lado
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
          Escolha até três. A última coluna é sempre o Brasil, para dar a régua. Os números são do universo de deputado
          federal, estadual e distrital em 2026, recontados do arquivo do TSE.
        </p>
      </header>

      <section aria-label="Escolha o que comparar" className="space-y-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Comparar">
          <button type="button" className={chip(tipo === "partido")} aria-pressed={tipo === "partido"} onClick={() => trocar("partido")}>
            Partidos
          </button>
          <button type="button" className={chip(tipo === "uf")} aria-pressed={tipo === "uf"} onClick={() => trocar("uf")}>
            Estados
          </button>
        </div>
        <div className="flex flex-wrap gap-4">
          {[0, 1, 2].map((i) => (
            <label key={i} className="flex flex-col gap-1 text-[13px] font-semibold text-ink">
              {tipo === "uf" ? "Estado" : "Partido"} {i + 1}
              <select
                value={sel[i] ?? ""}
                onChange={(e) => setSel((s) => Object.assign([...s, "", "", ""].slice(0, 3), { [i]: e.target.value }))}
                className={selCls}
              >
                <option value="">{i === 0 ? "Escolha" : "Nenhum"}</option>
                {lista.map((v) => (
                  <option key={v} value={v}>
                    {nome(v)}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
        <p className="text-[13px] text-muted-foreground">O endereço desta página guarda a escolha: dá para copiar e mandar a comparação.</p>
      </section>

      <div tabIndex={0} role="region" aria-label="Tabela de comparação" className="mt-8 overflow-x-auto border border-rule bg-card">
        <table className="w-full min-w-[36rem] border-collapse">
          <caption className="sr-only">Comparação entre {colunas.map(nome).join(", ")} e o Brasil</caption>
          <thead>
            <tr className="border-b-2 border-ink">
              <th scope="col" className="px-3 py-3 text-left text-[13px] font-semibold text-ink">
                Deputado, 2026
              </th>
              {colunas.map((v) => (
                <th key={v} scope="col" className="px-3 py-3 text-right font-display text-lg text-plum">
                  {nome(v)}
                </th>
              ))}
              <th scope="col" className="bg-muted px-3 py-3 text-right font-display text-lg text-ink">
                Brasil
              </th>
            </tr>
          </thead>
          {BLOCOS.map((b) => {
            const linhas = b.linhas.filter((l) => !l.so || l.so === tipo);
            if (!linhas.length) return null;
            return (
              <tbody key={b.titulo}>
                <tr>
                  <th colSpan={colunas.length + 2} scope="colgroup" className="border-t border-rule px-3 pb-1 pt-5 text-left font-display text-base italic text-plum">
                    {b.titulo}
                  </th>
                </tr>
                {linhas.map((l) => (
                  <tr key={l.rotulo} className="border-t border-rule/60">
                    <th scope="row" className="px-3 py-2 text-left text-[14px] font-normal text-ink/85">
                      {l.rotulo}
                    </th>
                    {colunas.map((v) => {
                      const r = dados(v);
                      return (
                        <td key={v} className="px-3 py-2 text-right font-mono text-[14px] text-ink">
                          {r ? l.valor(r, tipo === "partido" ? FEFC_PARTIDOS[v] : undefined) : "—"}
                        </td>
                      );
                    })}
                    <td className="bg-muted px-3 py-2 text-right font-mono text-[14px] text-ink">
                      {l.valor(RECORTE_TOTAL, FEFC_TOTAL)}
                    </td>
                  </tr>
                ))}
              </tbody>
            );
          })}
        </table>
      </div>
      <p className="mt-3 max-w-3xl text-[13px] leading-relaxed text-muted-foreground">
        Taxa de eleição = eleitas ou eleitos do grupo ÷ candidaturas do grupo. Percentual só com base de {SMALL} ou mais;
        abaixo disso, “X de Y”. Pretas e pardas aparecem sempre separadas; a soma aparece só no fundo, porque é a régua que a
        lei usa. O fundo é o que chegou às candidaturas a deputado; a tabela não verifica cumprimento da lei.{" "}
        <Link to="/partidos" className="underline decoration-plum underline-offset-4">
          Partido por partido
        </Link>{" "}
        e{" "}
        <Link to="/dinheiro" className="underline decoration-plum underline-offset-4">
          Dinheiro
        </Link>{" "}
        trazem o contexto.
      </p>

      <div className="mt-10">
        <ComoSabemos
          fonte="TSE, Candidatos 2026 e Prestação de Contas 2026"
          universo="Candidaturas e eleitos para deputado federal, estadual e distrital em 2026, 1º turno."
          base={`Candidaturas e resultado: base do TSE de ${RECORTE_META.baseGeneratedAt} (SHA-256 ${RECORTE_META.csvSha256.slice(0, 12)}…); fundo: base de ${FEFC_META.baseGeneratedAt}`}
          calculo={<>Contagens próprias, sem estimativa (scripts/recontagem/partido_uf_2026.py e fefc_partidos_2026.py).</>}
          limites={[
            "Partido é a sigla do registro em 2026; quem trocou de partido aparece na sigla nova.",
            "Senado, governo e Presidência ficam fora: são poucas vagas por estado e partido, e a taxa de eleição não se compara com a de deputado.",
            "Cor/raça é autodeclarada ao TSE.",
          ]}
        />
      </div>
    </PageShell>
  );
}
