import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { Secao } from "@/components/editorial/Secao";
import { ComoSabemos } from "@/components/editorial/ComoSabemos";
import { PILOT_CORAL } from "@/lib/editorial-pilot-colors";
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
        rotulo: "Candidaturas pretas e pardas somadas: parte do FEFC",
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
  const colunas = [...new Set(sel.filter(Boolean))];
  const trocar = (t: Tipo) => {
    setTipo(t);
    setSel(PADRAO[t]);
  };
  const chip = (ativo: boolean) =>
    `min-h-11 border px-4 py-1 text-[15px] font-semibold ${ativo ? "border-ink bg-ink text-cream" : "border-rule bg-card text-ink hover:border-ink"}`;
  const selCls = "min-h-11 border border-rule bg-card px-3 text-[15px] text-ink";

  return (
    <PageShell breadcrumb={[{ label: "Eleições 2026", to: "/quem-chega" }, { label: "Comparador" }]}>
      <header className="relative left-1/2 -ml-[50vw] w-screen bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <p className="text-[13px] font-semibold text-[var(--art-gold)]">Eleições 2026 · Consulta comparativa</p>
          <h1 className="mt-5 max-w-5xl font-display text-[clamp(3rem,6.1vw,6rem)] leading-[1.02]">
            Compare partidos ou estados, lado a lado
          </h1>
          <div className="mt-8 grid items-end gap-7 border-t border-paper/35 pt-6 md:grid-cols-[1.15fr_.85fr]">
            <p className="max-w-2xl text-lg leading-relaxed text-paper/90">
              Quem se candidata, quem se elege e como os recursos chegam às candidaturas: escolha até três recortes.
              O Brasil permanece como referência. Todos os indicadores de eleição nesta ferramenta tratam de
              deputados federais, estaduais e distritais em 2026.
            </p>
            <div className="md:text-right">
              <a href="#escolhas-comparar" className="inline-flex min-h-11 items-center border-b-2 border-[var(--art-gold)] font-semibold text-paper focus-visible:outline-2 focus-visible:outline-offset-4">
                Montar comparação <span className="ml-3" aria-hidden="true">↓</span>
              </a>
              <p className="mt-3 font-mono text-[12px] leading-relaxed text-paper/75">
                TSE · base eleitoral: {RECORTE_META.baseGeneratedAt}
              </p>
            </div>
          </div>
        </div>
      </header>

      <nav aria-label="Etapas da comparação" className="flex flex-wrap gap-x-8 gap-y-2 border-b border-rule py-5 text-[14px] font-semibold text-plum">
        <a href="#escolhas-comparar" className="min-h-9 underline-offset-4 hover:underline">01 · Escolher</a>
        <a href="#leitura-comparativa" className="min-h-9 underline-offset-4 hover:underline">02 · Ler proporções</a>
        <a href="#tabela-comparativa" className="min-h-9 underline-offset-4 hover:underline">03 · Conferir todos os indicadores</a>
        <a href="#documentos-comparar" className="min-h-9 underline-offset-4 hover:underline">04 · Ver fontes</a>
      </nav>

      <section id="escolhas-comparar" aria-label="Escolha o que comparar" className="scroll-mt-24 space-y-5 bg-paper py-9">
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
                onChange={(e) => setSel((s) => {
                  const proxima = [...s, "", "", ""].slice(0, 3);
                  proxima[i] = e.target.value;
                  if (e.target.value) {
                    proxima.forEach((valor, pos) => {
                      if (pos !== i && valor === e.target.value) proxima[pos] = "";
                    });
                  }
                  return proxima;
                })}
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
        <p className="text-[13px] leading-relaxed text-ink/70">
          A URL guarda a sua seleção e pode ser compartilhada. Cada partido ou estado aparece apenas uma vez.
        </p>
      </section>

      <section id="leitura-comparativa" aria-labelledby="comparar-proporcoes-titulo" className="scroll-mt-24 relative left-1/2 -ml-[50vw] w-screen bg-[var(--art-plum)] text-paper">
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
          <p className="text-[13px] font-semibold text-[var(--art-gold)]">Leitura comparativa · Vagas de deputado</p>
          <h2 id="comparar-proporcoes-titulo" className="mt-3 max-w-4xl font-display text-[clamp(2rem,3.8vw,3.8rem)] leading-tight">
            Qual é a participação das mulheres entre as pessoas eleitas?
          </h2>
          <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-paper/80">
            Cada barra usa mulheres eleitas ÷ total de pessoas eleitas no mesmo recorte de deputado em 2026.
            A escala vai de 0% a 100%. Uma proporção maior não mede, sozinha, as condições de disputa.
          </p>
          <ol className="mt-8 grid gap-6 border-t border-paper/30 pt-7 md:grid-cols-2">
            {[...colunas.map((v) => ({ id: v, nome: nome(v), recorte: dados(v) })), { id: "brasil", nome: "Brasil", recorte: RECORTE_TOTAL }].map(({ id, nome: rotulo, recorte }) => {
              if (!recorte) return null;
              const proporcao = recorte.eleitos > 0 ? (100 * recorte.eleitas) / recorte.eleitos : 0;
              return (
                <li key={id} className="min-w-0 border-b border-paper/25 pb-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-2">
                    <h3 className="font-display text-2xl">{rotulo}</h3>
                    <strong className="font-display text-4xl tabular-nums text-[var(--art-gold)]">{pct(recorte.eleitas, recorte.eleitos)}</strong>
                  </div>
                  <div className="mt-4 h-3 w-full bg-paper/25" role="img" aria-label={`${rotulo}: ${n(recorte.eleitas)} mulheres eleitas em ${n(recorte.eleitos)} cadeiras preenchidas`}>
                    <div className="h-full bg-[var(--art-gold)]" style={{ width: `${proporcao}%` }} />
                  </div>
                  <p className="mt-2 font-mono text-[13px] tabular-nums text-paper/85">{n(recorte.eleitas)} mulheres / {n(recorte.eleitos)} eleitos</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section aria-label="Limite jurídico da comparação do financiamento" className="relative left-1/2 -ml-[50vw] w-screen text-paper" style={{ background: PILOT_CORAL }}>
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-7 md:grid-cols-[.38fr_.62fr] md:items-start md:gap-10 md:px-8">
          <h2 className="font-display text-2xl leading-snug md:text-3xl">O que estes números não comprovam</h2>
          <p className="text-[15px] leading-relaxed text-paper">
            O FEFC mostrado abaixo corresponde aos recursos declarados por candidaturas a deputado.
            Esse subconjunto não permite concluir, isoladamente, se uma sigla cumpriu ou descumpriu as
            regras legais de destinação. Pretas e pardas continuam separadas nas linhas de origem,
            com a soma identificada quando apresentada.
          </p>
        </div>
      </section>

      <section id="tabela-comparativa" aria-labelledby="comparar-tabela-titulo" className="scroll-mt-24 py-10 md:py-14">
        <p className="text-[13px] font-semibold text-plum">Consulta detalhada · Mesmo recorte, bases explícitas</p>
        <h2 id="comparar-tabela-titulo" className="mt-2 font-display text-3xl text-ink md:text-4xl">Todos os indicadores</h2>
        <p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-ink/75">
          A tabela mantém os grupos raciais separados e a coluna Brasil fixa. No celular, deslize horizontalmente
          dentro da tabela para conferir as colunas, sem perder as informações originais.
        </p>
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

      </section>

      <section id="documentos-comparar" aria-labelledby="comparar-documentos-titulo" className="relative left-1/2 -ml-[50vw] w-screen bg-[var(--art-gold)] text-ink">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[.75fr_1.25fr] md:px-8 md:py-14">
          <div>
            <p className="text-[13px] font-semibold">Caderno documental · Fontes primárias</p>
            <h2 id="comparar-documentos-titulo" className="mt-3 font-display text-3xl leading-tight md:text-4xl">De onde vêm os recortes</h2>
            <p className="mt-4 text-[14px] leading-relaxed">As barras e a tabela usam recortes reprocessados de bases eleitorais públicas. A fonte original pode ser consultada independentemente do observatório.</p>
          </div>
          <div className="divide-y divide-ink/25 border-y border-ink/25">
            <div className="py-5">
              <h3 className="font-display text-xl">Candidaturas e resultados de 2026</h3>
              <p className="mt-2 text-[14px] leading-relaxed">TSE · base do recorte: {RECORTE_META.baseGeneratedAt}. Fonte das candidaturas, eleitas e eleitos.</p>
              <a href="https://dadosabertos.tse.jus.br/dataset/candidatos-2026" target="_blank" rel="noreferrer" className="mt-3 inline-flex min-h-11 items-center font-semibold text-ink underline underline-offset-4">Consultar Candidatos 2026 no TSE ↗</a>
            </div>
            <div className="py-5">
              <h3 className="font-display text-xl">Recursos declarados pelas candidaturas</h3>
              <p className="mt-2 text-[14px] leading-relaxed">Prestação de Contas 2026 · recorte FEFC de candidaturas a deputado, base de {FEFC_META.baseGeneratedAt}. Os critérios formais de distribuição publicados pelas siglas são documentos diferentes destes recebimentos.</p>
              <a href="https://www.tse.jus.br/eleicoes/eleicoes-2026-content/prestacao-de-contas/fundo-especial-de-financiamento-de-campanha-fefc" target="_blank" rel="noreferrer" className="mt-3 inline-flex min-h-11 items-center font-semibold text-ink underline underline-offset-4">Consultar critérios formais do FEFC no TSE ↗</a>
            </div>
          </div>
        </div>
      </section>

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
