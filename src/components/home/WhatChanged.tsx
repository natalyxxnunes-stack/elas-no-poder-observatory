/**
 * WhatChanged — "O que mudou" na home: diferença entre duas fotografias de
 * candidaturas já recontadas. Mostra os dois números e a diferença, nunca só
 * a diferença, para o leitor ver de onde ela sai.
 */
import { Link } from "@tanstack/react-router";
import { CHANGE_FROM, CHANGE_TO, RACE_ORDER } from "@/data/o-que-mudou";
import { formatInt, formatPct } from "@/lib/format-br";

const signed = (v: number) => (v > 0 ? `+${formatInt(v)}` : v < 0 ? `−${formatInt(Math.abs(v))}` : "0");
const signedPp = (v: number) => {
  const s = formatPct(Math.abs(v)).replace("%", "");
  return v > 0 ? `+${s} p.p.` : v < 0 ? `−${s} p.p.` : "0 p.p.";
};

function Row({ label, from, to }: { label: string; from: number; to: number }) {
  return (
    <tr className="border-t border-rule">
      <th scope="row" className="py-2 pr-3 text-left font-normal text-ink">{label}</th>
      <td className="py-2 pr-3 text-right font-mono text-xs text-muted-foreground">{formatInt(from)}</td>
      <td className="py-2 pr-3 text-right font-mono text-xs text-ink">{formatInt(to)}</td>
      <td className="py-2 text-right font-mono text-xs font-semibold text-plum">{signed(to - from)}</td>
    </tr>
  );
}

function UniverseTable({ title, k }: { title: string; k: "proporcional" | "majoritario" }) {
  const a = CHANGE_FROM[k];
  const b = CHANGE_TO[k];
  const shareA = (a.feminine / a.total) * 100;
  const shareB = (b.feminine / b.total) * 100;
  return (
    <div className="poster-frame p-5">
      <h3 className="font-display text-xl text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Mulheres eram {formatPct(shareA)} em {CHANGE_FROM.label} e são {formatPct(shareB)} em{" "}
        {CHANGE_TO.label} ({signedPp(shareB - shareA)}).
      </p>
      <table className="mt-4 w-full text-sm">
        <thead>
          <tr className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            <th className="pb-2 text-left font-normal">Candidaturas</th>
            <th className="pb-2 pr-3 text-right font-normal">{CHANGE_FROM.label.slice(0, 5)}</th>
            <th className="pb-2 pr-3 text-right font-normal">{CHANGE_TO.label.slice(0, 5)}</th>
            <th className="pb-2 text-right font-normal">diferença</th>
          </tr>
        </thead>
        <tbody>
          <Row label="Todas" from={a.total} to={b.total} />
          <Row label="De mulheres" from={a.feminine} to={b.feminine} />
          {RACE_ORDER.filter((r) => (a.raceFeminine[r] ?? 0) + (b.raceFeminine[r] ?? 0) > 0).map((r) => (
            <Row
              key={r}
              label={`· mulheres ${r.toLowerCase()}s`}
              from={a.raceFeminine[r] ?? 0}
              to={b.raceFeminine[r] ?? 0}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function WhatChanged() {
  return (
    <section className="border-t border-rule py-14 md:py-16">
      <p className="kicker">O que mudou · {CHANGE_FROM.label.slice(0, 5)} → {CHANGE_TO.label.slice(0, 5)}</p>
      <h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight text-ink md:text-4xl">
        A base de candidaturas mudou depois do prazo de registro
      </h2>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
        O TSE atualiza o arquivo de candidaturas ao longo da campanha: registros entram, saem e são
        corrigidos. Aqui comparamos a primeira fotografia publicada depois do prazo de registro com a
        fotografia que o site usa hoje. As duas foram recontadas por nós a partir do arquivo oficial.
        O arquivo não informa o motivo de cada mudança, então mostramos a contagem e não a causa.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <UniverseTable title="Deputadas e deputados (proporcional)" k="proporcional" />
        <UniverseTable title="Presidência, governos e Senado (majoritário)" k="majoritario" />
      </div>
      <p className="mt-5 font-mono text-[12px] leading-relaxed text-muted-foreground">
        Fonte: TSE, Candidatos 2026, arquivo consulta_cand_2026_BRASIL.csv. SHA-256 de {CHANGE_FROM.label}:{" "}
        <span className="break-all">{CHANGE_FROM.brasilCsvSha256}</span>. SHA-256 de {CHANGE_TO.label}:{" "}
        <span className="break-all">{CHANGE_TO.brasilCsvSha256}</span>.{" "}
        <Link to="/metodo" className="text-plum underline underline-offset-4">Ver o método</Link>
      </p>
    </section>
  );
}
