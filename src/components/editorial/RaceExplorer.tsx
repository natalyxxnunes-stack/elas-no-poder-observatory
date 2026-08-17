import { useMemo, useState } from "react";
import { GapNote } from "@/components/GapNote";
import { ContextBox } from "./ContextBox";
import type { PublicSnapshot } from "@/lib/tse/snapshot.functions";
import type { UniverseId } from "@/lib/tse/compute";

/**
 * RaceExplorer — explorador interativo da distribuição por cor/raça das
 * candidaturas de mulheres, com filtros combináveis de cargo (universo),
 * UF e partido.
 *
 * Todos os números vêm da tabela conjunta `raceByUfParty` gravada pela coleta
 * (chave `SG_UF|SG_PARTIDO` → categoria original de cor/raça → contagem de
 * candidaturas de mulheres). Nada é estimado aqui: o recálculo ao vivo é uma
 * soma de células já contadas na fotografia.
 *
 * Regra de base mínima: com menos de 20 candidaturas na fatia, nenhum
 * percentual é exibido — apenas contagens absolutas — porque a variação de uma
 * única candidatura moveria o percentual em mais de 5 pontos.
 */

const MIN_BASE = 20;

const UNIVERSE_LABEL: Record<UniverseId, string> = {
  proporcional: "Proporcionais (Câmara, assembleias e Câmara Legislativa do DF)",
  majoritario: "Majoritárias (Presidência, governos e Senado)",
};

type Cell = { uf: string; party: string; races: Record<string, number> };

function readCells(
  snapshot: PublicSnapshot | null,
  universe: UniverseId,
): Cell[] | null {
  const joint = snapshot?.universes[universe]?.dimensions?.raceByUfParty;
  if (!joint || Object.keys(joint).length === 0) return null;
  return Object.entries(joint).map(([key, races]) => {
    const [uf = "NÃO INFORMADO", party = "NÃO INFORMADO"] = key.split("|");
    return { uf, party, races };
  });
}

const sumOf = (races: Record<string, number>) =>
  Object.values(races).reduce((a, b) => a + b, 0);

function Select({
  label,
  value,
  onChange,
  options,
  allLabel,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  allLabel: string;
}) {
  return (
    <label className="block">
      <span className="poster-eyebrow block text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border-2 border-ink bg-paper px-3 py-2 font-mono text-xs text-ink"
      >
        <option value="">{allLabel}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function RaceExplorer({
  snapshot,
}: {
  snapshot: PublicSnapshot | null;
}) {
  const [universe, setUniverse] = useState<UniverseId>("proporcional");
  const [uf, setUf] = useState("");
  const [party, setParty] = useState("");

  const cells = useMemo(() => readCells(snapshot, universe), [snapshot, universe]);

  const ufOptions = useMemo(() => {
    if (!cells) return [];
    const totals = new Map<string, number>();
    for (const c of cells) {
      totals.set(c.uf, (totals.get(c.uf) ?? 0) + sumOf(c.races));
    }
    return [...totals.entries()]
      .sort((a, b) => a[0].localeCompare(b[0], "pt-BR"))
      .map(([v, n]) => ({
        value: v,
        label: `${v} · ${n} ${n === 1 ? "candidatura" : "candidaturas"}`,
      }));
  }, [cells]);

  const partyOptions = useMemo(() => {
    if (!cells) return [];
    const scope = uf ? cells.filter((c) => c.uf === uf) : cells;
    const totals = new Map<string, number>();
    for (const c of scope) {
      totals.set(c.party, (totals.get(c.party) ?? 0) + sumOf(c.races));
    }
    return [...totals.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "pt-BR"))
      .map(([v, n]) => ({
        value: v,
        label: `${v} · ${n} ${n === 1 ? "candidatura" : "candidaturas"}`,
      }));
  }, [cells, uf]);

  const slice = useMemo(() => {
    if (!cells) return null;
    const selected = cells.filter(
      (c) => (!uf || c.uf === uf) && (!party || c.party === party),
    );
    const races: Record<string, number> = {};
    for (const c of selected) {
      for (const [race, n] of Object.entries(c.races)) {
        races[race] = (races[race] ?? 0) + n;
      }
    }
    const base = sumOf(races);
    return { races, base };
  }, [cells, uf, party]);

  if (!cells || !slice) {
    return (
      <GapNote label="Lacuna declarada">
        A fotografia atual do TSE ainda não trouxe os cruzamentos de cor/raça por
        UF e partido para este universo. Sem essas células, o explorador fica sem
        número — nada é estimado no lugar.
      </GapNote>
    );
  }

  const { races, base } = slice;
  const showPercent = base >= MIN_BASE;
  const rows = Object.entries(races).sort((a, b) => b[1] - a[1]);
  const scopeLabel = [
    universe === "proporcional" ? "candidaturas proporcionais" : "candidaturas majoritárias",
    uf ? `em ${uf}` : "no Brasil",
    party ? `pelo ${party}` : "em todos os partidos",
  ].join(" · ");

  return (
    <div className="space-y-6">
      <div className="poster-frame p-5">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="block">
            <span className="poster-eyebrow block text-muted-foreground">
              Cargo
            </span>
            <select
              value={universe}
              onChange={(e) => {
                setUniverse(e.target.value as UniverseId);
                setUf("");
                setParty("");
              }}
              className="mt-2 w-full border-2 border-ink bg-paper px-3 py-2 font-mono text-xs text-ink"
            >
              {(["proporcional", "majoritario"] as UniverseId[]).map((u) => (
                <option key={u} value={u}>
                  {UNIVERSE_LABEL[u]}
                </option>
              ))}
            </select>
          </label>
          <Select
            label="UF"
            value={uf}
            onChange={(v) => setUf(v)}
            options={ufOptions}
            allLabel="Todas as UFs"
          />
          <Select
            label="Partido"
            value={party}
            onChange={setParty}
            options={partyOptions}
            allLabel="Todos os partidos"
          />
        </div>

        {(uf || party) && (
          <button
            type="button"
            onClick={() => {
              setUf("");
              setParty("");
            }}
            className="mt-4 font-mono text-[12px] uppercase tracking-wider text-plum underline underline-offset-4"
          >
            limpar filtros
          </button>
        )}
      </div>

      <div className="poster-frame overflow-hidden">
        <header className="border-b-2 border-ink px-5 py-4">
          <p className="poster-eyebrow text-muted-foreground">Fatia escolhida</p>
          <p className="mt-1 font-display text-lg text-ink">{scopeLabel}</p>
          <p className="mt-2 font-mono text-[12px] text-muted-foreground">
            Base: {formatInt(base)}{" "}
            {base === 1 ? "candidatura" : "candidaturas"} de mulheres
            {showPercent
              ? " — denominador de todos os percentuais abaixo"
              : ` — abaixo de ${MIN_BASE}: só contagens absolutas`}
          </p>
        </header>

        {base === 0 ? (
          <div className="p-5">
            <GapNote label="Sem candidaturas nesta fatia">
              A fotografia atual não registra nenhuma candidatura de mulher nesta
              combinação de cargo, UF e partido. Isso é ausência de candidatura
              no arquivo, não falha de leitura.
            </GapNote>
          </div>
        ) : (
          <dl className="divide-y-2 divide-ink/10">
            {rows.map(([race, n]) => (
              <div key={race} className="flex items-baseline gap-4 px-5 py-3">
                <dt className="w-32 shrink-0 font-mono text-[12px] uppercase tracking-wider text-muted-foreground">
                  {race}
                </dt>
                <dd className="flex-1">
                  <div
                    className="h-2 rounded-full bg-plum"
                    style={{ width: `${(n / base) * 100}%` }}
                    aria-hidden
                  />
                </dd>
                <dd className="w-36 shrink-0 text-right font-mono text-xs text-ink">
                  {formatInt(n)}
                  {showPercent
                    ? ` · ${formatPct((n / base) * 100)}`
                    : ""}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {!showPercent && base > 0 && (
          <div className="border-t-2 border-ink p-5">
            <GapNote label="Base pequena">
              Com {formatInt(base)}{" "}
              {base === 1 ? "candidatura" : "candidaturas"} nesta fatia
              (mínimo de {MIN_BASE}), um percentual daria aparência de precisão a
              um número que uma única candidatura moveria demais. Por isso aqui
              só aparecem contagens absolutas.
            </GapNote>
          </div>
        )}
      </div>

      <ContextBox variant="calculamos">
        <p>
          Somamos as candidaturas de mulheres registradas na fotografia atual do
          TSE, célula por célula (UF × partido), dentro do universo escolhido, e
          dividimos cada categoria original de cor/raça pelo total da própria
          fatia. Universos proporcional e majoritário nunca são somados, nenhum
          partido é excluído da lista de filtros e nenhuma categoria é agregada
          aqui: “negra” = preta + parda só aparece onde a agregação está
          declarada.
        </p>
      </ContextBox>
    </div>
  );
}
