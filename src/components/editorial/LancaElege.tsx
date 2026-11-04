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
  const [hb, , pa, pr] = t.map((g) => g.e / g.c) as [number, number, number, number];
  const vezes = (a: number, b: number) => (a / b).toFixed(1).replace(".", ",");
  const pct = (a: number, b: number) => formatPct((a / b) * 100);
  return (
    <div className="space-y-6">
      <div className="grid max-w-4xl gap-4 sm:grid-cols-4">
        {t.map((g) => (
          <div key={g.k} className="border-t-[3px] border-plum pt-3">
            <p className="font-display text-4xl text-plum">{pct(g.e, g.c)}</p>
            <p className="mt-1 text-[14px] leading-snug text-ink/80">
              das candidaturas de {g.k.toLowerCase()} se elegeram ({n(g.e)} de {n(g.c)})
            </p>
          </div>
        ))}
      </div>
      <p className="max-w-3xl text-[15px] leading-relaxed text-ink/80">
        No país, a taxa de eleição dos homens brancos candidatos a deputado foi {vezes(hb, pr)} vezes a
        das mulheres pretas e {vezes(hb, pa)} vezes a das
        mulheres pardas. A tabela mostra a mesma conta dentro de cada partido com {GRANDES} ou mais cadeiras.
      </p>
      <div tabIndex={0} role="region" aria-label="Tabela de taxa de eleição por partido" className="overflow-x-auto border border-rule bg-card">
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
