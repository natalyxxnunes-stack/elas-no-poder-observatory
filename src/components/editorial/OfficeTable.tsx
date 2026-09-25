import { GapNote } from "@/components/GapNote";
import { formatInt, formatPct } from "@/lib/format-br";
import type { PublicSnapshot } from "@/lib/tse/snapshot.functions";

type OfficeRow = readonly [office: string, total: number, women: number];

function row(office: string, total?: number, women?: number): OfficeRow | null {
  if (total === undefined || women === undefined || total === 0) return null;
  return [office, total, women];
}

function buildRows(snapshot: PublicSnapshot | null): OfficeRow[] | null {
  if (!snapshot) return null;
  const maj = snapshot.universes.majoritario.dimensions;
  const prop = snapshot.universes.proporcional.dimensions;
  const out = snapshot.outOfUniverse;
  if (!maj?.totalByCargo || !maj.feminineByCargo || !prop?.totalByCargo || !prop.feminineByCargo || !out) return null;

  const rows = [
    row("Presidente", maj.totalByCargo["PRESIDENTE"], maj.feminineByCargo["PRESIDENTE"]),
    row("Vice-presidente", out.byCargo["VICE-PRESIDENTE"], out.feminineByCargo["VICE-PRESIDENTE"]),
    row("Governador", maj.totalByCargo["GOVERNADOR"], maj.feminineByCargo["GOVERNADOR"]),
    row("Vice-governador", out.byCargo["VICE-GOVERNADOR"], out.feminineByCargo["VICE-GOVERNADOR"]),
    row("Senador", maj.totalByCargo["SENADOR"], maj.feminineByCargo["SENADOR"]),
    row("1º suplente", out.byCargo["1º SUPLENTE"], out.feminineByCargo["1º SUPLENTE"]),
    row("2º suplente", out.byCargo["2º SUPLENTE"], out.feminineByCargo["2º SUPLENTE"]),
    row("Deputado federal", prop.totalByCargo["DEPUTADO FEDERAL"], prop.feminineByCargo["DEPUTADO FEDERAL"]),
    row("Deputado distrital", prop.totalByCargo["DEPUTADO DISTRITAL"], prop.feminineByCargo["DEPUTADO DISTRITAL"]),
    row("Deputado estadual", prop.totalByCargo["DEPUTADO ESTADUAL"], prop.feminineByCargo["DEPUTADO ESTADUAL"]),
  ];

  if (rows.some((item) => item === null)) return null;
  return rows.filter((item): item is OfficeRow => item !== null);
}

export function OfficeTable({ snapshot }: { snapshot: PublicSnapshot | null }) {
  const rows = buildRows(snapshot);

  if (!rows) {
    return (
      <GapNote label="Dado não disponível">
        A fotografia vigente não trouxe a contagem por cargo individual (Presidente, Governador, Senador e as posições de apoio à chapa) necessária para este gráfico. Nenhum valor é estimado no lugar dela.
      </GapNote>
    );
  }

  const baseDate = snapshot?.baseGeneratedAt
    ? new Date(snapshot.baseGeneratedAt).toLocaleDateString("pt-BR", { timeZone: "UTC" })
    : "—";

  return (
    <div className="overflow-x-auto border-y border-ink">
      <table className="w-full min-w-[34rem] border-collapse text-left">
        <caption className="sr-only">Candidaturas totais e de mulheres por cargo em {baseDate}</caption>
        <thead className="border-b border-ink bg-ink text-cream">
          <tr className="font-mono text-xs uppercase">
            <th scope="col" className="px-4 py-3 font-medium">Cargo</th>
            <th scope="col" className="px-4 py-3 text-right font-medium">Total</th>
            <th scope="col" className="px-4 py-3 text-right font-medium">Mulheres</th>
            <th scope="col" className="px-4 py-3 text-right font-medium">Participação</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([office, total, women], index) => (
            <tr key={office} className={index < rows.length - 1 ? "border-b border-rule" : undefined}>
              <th scope="row" className="px-4 py-3 font-display text-base font-semibold text-ink">{office}</th>
              <td className="px-4 py-3 text-right font-mono text-sm text-muted-foreground">{formatInt(total)}</td>
              <td className="px-4 py-3 text-right font-mono text-sm text-muted-foreground">{formatInt(women)}</td>
              <td className="px-4 py-3 text-right font-display text-lg font-semibold text-plum">{total < 20 ? `${formatInt(women)} de ${formatInt(total)}` : formatPct((women / total) * 100)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}