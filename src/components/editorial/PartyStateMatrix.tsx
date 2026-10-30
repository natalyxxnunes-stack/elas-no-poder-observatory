import { ChartFrame } from "@/components/editorial/ChartFrame";
import type { PublicSnapshot } from "@/lib/tse/snapshot.functions";
import { formatInt, formatPct } from "@/lib/format-br";

const SMALL = 20;
const UFS = [
  "AC",
  "AL",
  "AM",
  "AP",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MG",
  "MS",
  "MT",
  "PA",
  "PB",
  "PE",
  "PI",
  "PR",
  "RJ",
  "RN",
  "RO",
  "RR",
  "RS",
  "SC",
  "SE",
  "SP",
  "TO",
];

/** Faixas de cor da fatia de mulheres; a primeira fica abaixo da referência de 30%. */
const BANDS = [
  { max: 30, cls: "bg-paper font-semibold text-ink ring-2 ring-inset ring-coral", label: "abaixo de 30%" },
  { max: 34, cls: "bg-lilac text-ink", label: "30% a 33,9%" },
  { max: 38, cls: "bg-plum/45 text-ink", label: "34% a 37,9%" },
  { max: 42, cls: "bg-plum/75 text-cream", label: "38% a 41,9%" },
  { max: 101, cls: "bg-plum text-cream", label: "42% ou mais" },
];
const band = (v: number) => BANDS.find((b) => v < b.max) ?? BANDS[BANDS.length - 1]!;

/**
 * Mapa partido × estado: fatia de mulheres entre os pedidos de registro para
 * deputada e deputado (federal, estadual e distrital somados) em cada célula.
 */
export function PartyStateMatrix({ snapshot }: { snapshot: PublicSnapshot | null }) {
  const dims = snapshot?.universes.proporcional.dimensions;
  const tot = dims?.totalByUfParty ?? {};
  const fem = dims?.feminineByUfParty ?? {};
  const partyTotal = new Map<string, number>();
  const partyFem = new Map<string, number>();
  for (const [key, t] of Object.entries(tot)) {
    const party = key.split("|")[1] ?? "";
    partyTotal.set(party, (partyTotal.get(party) ?? 0) + t);
    partyFem.set(party, (partyFem.get(party) ?? 0) + (fem[key] ?? 0));
  }
  const parties = [...partyTotal.entries()].sort((a, b) => b[1] - a[1]).map(([p]) => p);
  if (parties.length === 0) return null;
  let below = 0;
  let belowLarge = 0;
  let cells = 0;
  for (const [key, t] of Object.entries(tot)) {
    if (t <= 0) continue;
    cells++;
    if ((fem[key] ?? 0) / t < 0.3) {
      below++;
      if (t >= SMALL) belowLarge++;
    }
  }
  return (
    <ChartFrame
      eyebrow="Mapa partido × estado · deputada e deputado · 2026"
      title="Em cada partido e em cada estado, a fatia de mulheres entre os pedidos de registro"
      legend={
        <div className="flex flex-wrap gap-3">
          {BANDS.map((b) => (
            <span key={b.label} className="flex items-center gap-1.5">
              <span className={`size-3 ${b.cls}`} aria-hidden="true" />
              {b.label}
            </span>
          ))}
        </div>
      }
      note={`Partidos na ordem do total de pedidos. Célula vazia: o partido não registrou candidaturas no estado. Com menos de 20 pedidos na célula, aparece só “mulheres/total”, em cinza. ${formatInt(below)} das ${formatInt(cells)} células ficam abaixo de 30%; ${formatInt(belowLarge)} delas com 20 pedidos ou mais.`}
      source={`Fonte: TSE, Candidaturas 2026, base de ${snapshot?.baseGeneratedAt ? snapshot.baseGeneratedAt.split("-").reverse().join("/") : "27/10/2026"}. Partido do registro. Recontagem independente.`}
      ficha={{
        vendo:
          "Um mapa de calor: cada célula é um partido em um estado, pintada pela fatia de mulheres entre os pedidos de registro.",
        contados:
          "Pedidos de registro para deputada e deputado federal, estadual e distrital, somados por partido e estado.",
        denominador: "Pedidos de registro do mesmo partido no mesmo estado.",
        data: "Base do TSE de 27/10/2026",
        fonte: "TSE, Candidaturas 2026 (SG_PARTIDO, SG_UF, DS_GENERO)",
        limitacao:
          "Os 30% são referência visual. A cota legal se aplica por partido ou federação e por cargo (federal e estadual separados), sobre a lista apresentada; esta célula soma os cargos e conta cada partido da federação em separado. Por isso uma célula abaixo de 30% não prova descumprimento da lei.",
      }}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[60rem] border-separate border-spacing-0.5 text-[10px]">
          <thead>
            <tr className="font-mono uppercase text-muted-foreground">
              <th className="sticky left-0 z-10 bg-card pr-2 text-left font-normal">Partido</th>
              <th className="pr-2 text-right font-normal">Brasil</th>
              {UFS.map((uf) => (
                <th key={uf} className="w-8 text-center font-normal">
                  {uf}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {parties.map((party) => {
              const pt = partyTotal.get(party) ?? 0;
              const pf = partyFem.get(party) ?? 0;
              return (
                <tr key={party}>
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-card pr-2 text-left font-mono text-[11px] font-semibold text-ink"
                  >
                    {party}
                  </th>
                  <td className="pr-2 text-right font-mono text-[11px] text-ink">
                    {pt >= SMALL ? formatPct((pf / pt) * 100) : `${formatInt(pf)}/${formatInt(pt)}`}
                  </td>
                  {UFS.map((uf) => {
                    const key = `${uf}|${party}`;
                    const t = tot[key] ?? 0;
                    const f = fem[key] ?? 0;
                    if (t <= 0)
                      return (
                        <td
                          key={uf}
                          className="h-7 bg-muted/40"
                          aria-label={`${party} em ${uf}: sem candidaturas`}
                        />
                      );
                    const v = (f / t) * 100;
                    if (t < SMALL)
                      return (
                        <td
                          key={uf}
                          className="h-7 bg-secondary text-center font-mono text-[9px] text-muted-foreground"
                          title={`${party} em ${uf}: ${f} mulheres em ${t} pedidos`}
                        >
                          {f}/{t}
                        </td>
                      );
                    const b = band(v);
                    return (
                      <td
                        key={uf}
                        className={`h-7 text-center font-mono ${b.cls}`}
                        title={`${party} em ${uf}: ${f} mulheres em ${t} pedidos (${formatPct(v)})`}
                      >
                        {Math.round(v)}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </ChartFrame>
  );
}
