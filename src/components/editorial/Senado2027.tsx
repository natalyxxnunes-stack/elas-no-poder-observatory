import { ChartBar, ChartFrame, LegendSwatch } from "@/components/editorial/ChartFrame";
import { SENADO_2027, SENADO_2027_META } from "@/data/senado-2027";
import { formatInt } from "@/lib/format-br";

const n = formatInt;

function byParty() {
  const m = new Map<string, { total: number; mulheres: number; novas: number }>();
  for (const c of SENADO_2027) {
    const p = m.get(c.partido) ?? { total: 0, mulheres: 0, novas: 0 };
    p.total++;
    if (c.genero === "F") p.mulheres++;
    if (c.origem === "eleito em 2026") p.novas++;
    m.set(c.partido, p);
  }
  return [...m.entries()].sort((a, b) => b[1].total - a[1].total || a[0].localeCompare(b[0]));
}

/** Senado de 2027 por partido: cadeiras e mulheres em cada bancada. */
export function Senado2027Chart() {
  const rows = byParty();
  const mulheres = SENADO_2027.filter((c) => c.genero === "F");
  return (
    <ChartFrame
      eyebrow="Senado a partir de 2027 · composição prevista"
      title="Quantas das 81 cadeiras cada partido terá, e quantas delas são de mulheres"
      legend={
        <>
          <LegendSwatch className="bg-plum">cadeiras do partido</LegendSwatch>
          <LegendSwatch className="bg-coral">mulheres</LegendSwatch>
        </>
      }
      note={`Régua de 0 a 30 cadeiras. ${n(mulheres.length)} mulheres em 81 cadeiras. Hoje, em ${SENADO_2027_META.consultaSenado}, o PL tem ${n(SENADO_2027_META.hoje.pl)} cadeiras e o Senado tem ${n(SENADO_2027_META.hoje.mulheres)} mulheres.`}
      source={`Fonte: TSE, Candidatos 2026 (base de ${SENADO_2027_META.baseTse}), para as 54 vagas de 2026; Senado Federal, Dados Abertos (consulta de ${SENADO_2027_META.consultaSenado}), para os 27 mandatos até 2031.`}
      ficha={{
        vendo: "A bancada prevista de cada partido no Senado em 2027 e quantas mulheres há nela.",
        contados:
          "As 54 pessoas eleitas em 2026, pelo partido do registro, e as 27 que exercem mandato até 2031, pelo partido atual. Nas cadeiras de Omar Aziz e Sergio Moro, eleitos governadores, entra o 1º suplente.",
        denominador: "As 81 cadeiras do Senado.",
        data: `Resultado do TSE de 27/10/2026; lista do Senado de ${SENADO_2027_META.consultaSenado}`,
        fonte: "TSE, Candidatos 2026; Senado Federal, Dados Abertos",
        limitacao:
          "É uma previsão: senadores podem trocar de partido, e titulares licenciados podem voltar (Ana Paula Lobato e Jussara Lima exercem hoje o mandato como suplentes). A API do Senado não informa o partido do suplente de Sergio Moro.",
      }}
    >
      <div className="space-y-3">
        {rows.map(([party, d]) => (
          <div key={party} className="space-y-1">
            <ChartBar
              label={party}
              base={`${n(d.total)} ${d.total === 1 ? "cadeira" : "cadeiras"} · ${n(d.novas)} das vagas de 2026 · ${n(d.mulheres)} ${d.mulheres === 1 ? "mulher" : "mulheres"}`}
              value={(d.total / 30) * 100}
              display={n(d.total)}
              barClass="bg-plum"
            />
            {d.mulheres > 0 && (
              <ChartBar label="" base="" value={(d.mulheres / 30) * 100} display={n(d.mulheres)} barClass="bg-coral" />
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-[minmax(0,1fr)_4.25rem] gap-3 font-mono text-xs text-muted-foreground sm:grid-cols-[10rem_minmax(0,1fr)_4.5rem]" aria-hidden="true"><span className="hidden sm:block" /><span className="flex justify-between border-t border-rule pt-1"><span>0</span><span>30 cadeiras</span></span><span /></div>
    </ChartFrame>
  );
}

/** As 19 senadoras previstas para 2027. */
export function Senadoras2027() {
  const mulheres = SENADO_2027.filter((c) => c.genero === "F").sort(
    (a, b) => a.partido.localeCompare(b.partido) || a.nome.localeCompare(b.nome),
  );
  return (
    <div className="overflow-x-auto border border-rule bg-card">
      <table className="w-full min-w-[34rem] text-sm">
        <caption className="sr-only">Senadoras previstas para 2027</caption>
        <thead>
          <tr className="font-mono text-[13px] uppercase tracking-wider text-muted-foreground">
            <th className="px-3 pb-2 pt-3 text-left font-normal">Senadora</th>
            <th className="px-3 pb-2 pt-3 text-left font-normal">Partido</th>
            <th className="px-3 pb-2 pt-3 text-left font-normal">UF</th>
            <th className="px-3 pb-2 pt-3 text-left font-normal">Origem da cadeira</th>
          </tr>
        </thead>
        <tbody>
          {mulheres.map((c) => (
            <tr key={c.nome} className="border-t border-rule">
              <th scope="row" className="px-3 py-2 text-left font-normal text-ink">
                {c.nome}
              </th>
              <td className="px-3 py-2 font-mono text-xs text-ink">{c.partido}</td>
              <td className="px-3 py-2 font-mono text-xs text-ink">{c.uf}</td>
              <td className="px-3 py-2 text-xs text-muted-foreground">{c.origem === "eleito em 2026" ? "eleita em 2026" : c.origem}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
