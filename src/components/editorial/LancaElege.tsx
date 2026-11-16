import { useState } from "react";
import { RECORTE_META, RECORTE_PARTIDOS, RECORTE_TOTAL, type Recorte } from "@/data/partido-uf-2026";
import { formatInt as n, formatPct } from "@/lib/format-br";

/**
 * Quem o partido lança e quem ele elege: taxa de eleição por gênero e
 * cor/raça dentro de cada partido, no universo proporcional de 2026.
 * Pretas e pardas sempre separadas. Percentual só com base de 20 ou mais;
 * abaixo disso, "X de Y".
 */
const SMALL = 20;
const GRANDES = 10;

function taxa(eleitos: number, base: number) {
  if (!base) return "—";
  return base >= SMALL ? formatPct((eleitos / base) * 100) : `${n(eleitos)} de ${n(base)}`;
}

function grupos(r: Recorte) {
  const hb = (r.candidaturasRaca["BRANCA"] ?? 0) - (r.candidatasRaca["BRANCA"] ?? 0);
  const hbE = (r.eleitosRaca["BRANCA"] ?? 0) - (r.eleitasRaca["BRANCA"] ?? 0);
  return [
    { k: "Homens brancos", e: hbE, c: hb },
    { k: "Mulheres brancas", e: r.eleitasRaca["BRANCA"] ?? 0, c: r.candidatasRaca["BRANCA"] ?? 0 },
    { k: "Mulheres pardas", e: r.eleitasRaca["PARDA"] ?? 0, c: r.candidatasRaca["PARDA"] ?? 0 },
    { k: "Mulheres pretas", e: r.eleitasRaca["PRETA"] ?? 0, c: r.candidatasRaca["PRETA"] ?? 0 },
  ];
}

const th = "px-3 pb-2 pt-3 text-right text-[13px] font-semibold text-ink";
const td = "px-3 py-2 text-right font-mono text-[13px] text-ink";

export function LancaElege() {
  const linhas = Object.entries(RECORTE_PARTIDOS)
    .filter(([, r]) => r.eleitos >= GRANDES)
    .sort((a, b) => b[1].eleitos - a[1].eleitos);
  const t = grupos(RECORTE_TOTAL);
  const [partido, setPartido] = useState(linhas[0]?.[0] ?? "");
  const selecionado = linhas.find(([sigla]) => sigla === partido);
  const [hb, , pa, pr] = t.map((g) => g.e / g.c) as [number, number, number, number];
  const vezes = (a: number, b: number) => (a / b).toFixed(1).replace(".", ",");
  const pct = (a: number, b: number) => formatPct((a / b) * 100);
  return (
    <div className="space-y-6">
      <div className="bg-plum px-5 py-7 text-cream md:px-8">
        <p className="font-mono text-[12px] font-semibold uppercase tracking-wide text-cream/75">
          Brasil · taxa de eleição, dentro de cada grupo de candidaturas
        </p>
        <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.map((g) => (
            <div key={g.k} className="border-t border-cream/35 pt-3">
              <p className="font-display text-4xl text-cream">{pct(g.e, g.c)}</p>
              <p className="mt-2 text-[14px] leading-snug text-cream/85">
                das candidaturas de {g.k.toLowerCase()} se elegeram ({n(g.e)} de {n(g.c)})
              </p>
            </div>
          ))}
        </div>
      </div>
      <p className="max-w-3xl text-[15px] leading-relaxed text-ink/80">
        No país, a taxa de eleição dos homens brancos candidatos a deputado foi {vezes(hb, pr)} vezes a
        das mulheres pretas e {vezes(hb, pa)} vezes a das
        mulheres pardas. A tabela mostra a mesma conta dentro de cada partido com {GRANDES} ou mais cadeiras.
      </p>
      <section aria-label="Consultar taxa de eleição por partido" className="border border-rule bg-cream px-5 py-6 md:px-7">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wide text-plum">Comparação entre candidaturas e eleição</p>
            <h3 className="mt-2 font-display text-2xl text-ink">Escolha um partido para ler suas taxas</h3>
          </div>
          <label className="text-sm font-semibold text-ink">
            Partido
            <select value={partido} onChange={(e) => setPartido(e.target.value)}
              className="mt-1 block min-h-12 min-w-52 border border-ink bg-paper px-3 text-base text-ink">
              {linhas.map(([p]) => <option key={p} value={p}>{p}</option>)}
            </select>
          </label>
        </div>
        {selecionado && (
          <div className="mt-6 grid gap-x-6 gap-y-4 border-t border-rule pt-5 sm:grid-cols-2">
            {grupos(selecionado[1]).map((g) => (
              <div key={g.k} className="flex items-baseline justify-between gap-3 border-b border-rule pb-3">
                <div>
                  <p className="font-semibold text-ink">{g.k}</p>
                  <p className="mt-1 font-mono text-[12px] text-ink/70">{n(g.e)} eleitas(os) de {n(g.c)} candidaturas</p>
                </div>
                <strong className="shrink-0 font-display text-2xl text-plum">{taxa(g.e, g.c)}</strong>
              </div>
            ))}
          </div>
        )}
        <p className="mt-4 text-[13px] leading-relaxed text-ink/75">
          Exibidos partidos com {GRANDES} ou mais cadeiras. Bases menores que {SMALL}
          candidaturas aparecem como contagem absoluta, sem percentual.
        </p>
      </section>

      <details className="group border border-plum bg-card px-4 py-3 md:px-5">
        <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-3 text-base font-semibold text-plum">
          Abrir tabela integral de taxas por partido
          <span aria-hidden="true" className="group-open:rotate-180">↓</span>
        </summary>
      <div tabIndex={0} role="region" aria-label="Tabela de taxa de eleição por partido" className="mt-4 overflow-x-auto border border-rule bg-card">
        <table className="w-full min-w-[46rem] border-collapse">
          <caption className="sr-only">Taxa de eleição por gênero e cor/raça dentro de cada partido, deputados 2026</caption>
          <thead>
            <tr className="border-b border-rule">
              <th scope="col" className={`${th} text-left`}>Partido</th>
              <th scope="col" className={th}>Mulheres nas candidaturas</th>
              <th scope="col" className={th}>Mulheres nas cadeiras</th>
              <th scope="col" className={th}>Taxa: homens brancos</th>
              <th scope="col" className={th}>Mulheres brancas</th>
              <th scope="col" className={th}>Mulheres pardas</th>
              <th scope="col" className={th}>Mulheres pretas</th>
            </tr>
          </thead>
          <tbody>
            {linhas.map(([p, r]) => {
              const g = grupos(r);
              return (
                <tr key={p} className="border-t border-rule">
                  <th scope="row" className="px-3 py-2 text-left font-mono text-[13px] font-semibold text-ink">{p}</th>
                  <td className={td}>{pct(r.candidatas, r.candidaturas)}</td>
                  <td className={td}>
                    {r.eleitos >= SMALL ? pct(r.eleitas, r.eleitos) : `${n(r.eleitas)} de ${n(r.eleitos)}`}
                  </td>
                  {g.map((x) => (
                    <td key={x.k} className={td}>
                      {taxa(x.e, x.c)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      </details>
      <p className="max-w-3xl text-[13px] leading-relaxed text-muted-foreground">
        Taxa de eleição = eleitas ou eleitos do grupo ÷ candidaturas do grupo, no mesmo partido. Deputado federal, estadual e
        distrital, 1º turno. Percentual só com base de {SMALL} ou mais; abaixo disso, “X de Y”. Pretas e pardas aparecem
        separadas. Mulheres indígenas ({n(RECORTE_TOTAL.eleitasRaca["INDÍGENA"] ?? 0)} eleitas) e amarelas ({n(RECORTE_TOTAL.eleitasRaca["AMARELA"] ?? 0)}) ficam fora das colunas pela base pequena e estão nos totais. A taxa descreve o resultado; o motivo (dinheiro, posição na lista, tempo de mandato) pede outra apuração.
        Fonte: TSE, Candidatos 2026, base de {RECORTE_META.baseGeneratedAt}, SHA-256 {RECORTE_META.csvSha256.slice(0, 12)}…
        (scripts/recontagem/partido_uf_2026.py).
      </p>
    </div>
  );
}
