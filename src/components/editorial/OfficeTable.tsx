const ROWS = [
  ["Presidente", "14", "2", "14,3%"],
  ["Vice-presidente", "14", "6", "42,9%"],
  ["Governador", "201", "35", "17,4%"],
  ["Vice-governador", "211", "88", "41,7%"],
  ["Senador", "319", "70", "21,9%"],
  ["1º suplente", "349", "106", "30,4%"],
  ["2º suplente", "350", "107", "30,6%"],
  ["Deputado federal", "7.801", "2.869", "36,8%"],
  ["Deputado distrital", "433", "152", "35,1%"],
  ["Deputado estadual", "11.293", "3.929", "34,8%"],
] as const;

export function OfficeTable() {
  return (
    <div className="overflow-x-auto border-y border-ink">
      <table className="w-full min-w-[34rem] border-collapse text-left">
        <caption className="sr-only">Candidaturas totais e de mulheres por cargo em 22 de setembro de 2026</caption>
        <thead className="border-b border-ink bg-ink text-cream">
          <tr className="font-mono text-[10px] uppercase">
            <th scope="col" className="px-4 py-3 font-medium">Cargo</th>
            <th scope="col" className="px-4 py-3 text-right font-medium">Total</th>
            <th scope="col" className="px-4 py-3 text-right font-medium">Mulheres</th>
            <th scope="col" className="px-4 py-3 text-right font-medium">Participação</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map(([office, total, women, share], index) => (
            <tr key={office} className={index < ROWS.length - 1 ? "border-b border-rule" : undefined}>
              <th scope="row" className="px-4 py-3 font-display text-base font-semibold text-ink">{office}</th>
              <td className="px-4 py-3 text-right font-mono text-sm text-muted-foreground">{total}</td>
              <td className="px-4 py-3 text-right font-mono text-sm text-muted-foreground">{women}</td>
              <td className="px-4 py-3 text-right font-display text-lg font-semibold text-plum">{share}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}