import { useMemo, useState } from "react";
import { GapNote } from "@/components/GapNote";
import { ContextBox } from "./ContextBox";
import { StatusTag } from "./StatusTag";
import { RACE_LABELS } from "@/data/historical-funnel";
import type { PublicSnapshot } from "@/lib/tse/snapshot.functions";
import type { UniverseId } from "@/lib/tse/compute";

/**
 * StateExplorer — leitura por estado da fotografia vigente do TSE.
 *
 * Não recalcula nada: soma células já contadas na coleta
 * (`feminineByUf`, `totalByUf`, `raceByUf`, `raceByUfParty` e, quando a
 * fotografia foi gravada com a versão de processamento que as inclui,
 * `feminineByUfParty` / `totalByUfParty`).
 *
 * Regras herdadas do resto do site: cada universo tem denominador próprio e
 * nunca é somado ao outro; abaixo de 20 candidaturas na fatia o percentual não
 * aparece e ficam só os absolutos; preta e parda não são agregadas aqui.
 */

const MIN_BASE = 20;

const UNIVERSE_LABEL: Record<UniverseId, string> = {
  proporcional: "Proporcional",
  majoritario: "Majoritário",
};

const UNIVERSE_SCOPE: Record<UniverseId, string> = {
  proporcional:
    "Deputada e deputado federal, estadual e distrital, contados dentro do estado",
  majoritario:
    "Presidência, governos estaduais e Senado, contados dentro do estado",
};

const nf = (n: number) => n.toLocaleString("pt-BR");
const pf = (n: number) =>
  n.toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

function normalizeRaceLabel(raw: string) {
  const k = raw
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
  const hit = (
    ["branca", "parda", "preta", "indigena", "amarela"] as const
  ).find((c) => c === k);
  return hit ? RACE_LABELS[hit] : raw.toLowerCase();
}

type PartyRow = {
  party: string;
  feminine: number;
  total: number | null;
  races: Record<string, number>;
};

export function StateExplorer({ snapshot }: { snapshot: PublicSnapshot | null }) {
  const [universe, setUniverse] = useState<UniverseId>("proporcional");
  const [uf, setUf] = useState("");

  const dims = snapshot?.universes[universe]?.dimensions;

  const ufOptions = useMemo(() => {
    const tot = dims?.totalByUf ?? {};
    return Object.keys(tot)
      .filter((k) => /^[A-Z]{2}$/.test(k))
      .sort((a, b) => a.localeCompare(b, "pt-BR"));
  }, [dims]);

  const national = snapshot?.universes[universe];
  const nationalShare =
    national && national.total > 0
      ? (national.feminine / national.total) * 100
      : null;

  const stateTotal = uf ? (dims?.totalByUf?.[uf] ?? null) : null;
  const stateFeminine = uf ? (dims?.feminineByUf?.[uf] ?? null) : null;
  const stateShare =
    stateTotal && stateTotal > 0 && stateFeminine !== null
      ? (stateFeminine / stateTotal) * 100
      : null;
  const diff =
    stateShare !== null && nationalShare !== null
      ? stateShare - nationalShare
      : null;

  const stateRaces = uf ? (dims?.raceByUf?.[uf] ?? null) : null;
  const raceBase = stateRaces
    ? Object.values(stateRaces).reduce((a, b) => a + b, 0)
    : 0;

  const parties = useMemo<PartyRow[]>(() => {
    if (!uf) return [];
    const joint = dims?.raceByUfParty ?? {};
    const femJoint = dims?.feminineByUfParty;
    const totJoint = dims?.totalByUfParty;
    const rows = new Map<string, PartyRow>();
    for (const [key, races] of Object.entries(joint)) {
      const [cellUf, party = "NÃO INFORMADO"] = key.split("|");
      if (cellUf !== uf) continue;
      const feminine =
        femJoint?.[key] ??
        Object.values(races).reduce((a, b) => a + b, 0);
      rows.set(party, {
        party,
        feminine,
        total: totJoint?.[key] ?? null,
        races,
      });
    }
    // Partidos com candidaturas no estado, mas nenhuma mulher registrada, só
    // aparecem quando a fotografia trouxer o denominador por UF × partido.
    if (totJoint) {
      for (const [key, total] of Object.entries(totJoint)) {
        const [cellUf, party = "NÃO INFORMADO"] = key.split("|");
        if (cellUf !== uf || rows.has(party)) continue;
        rows.set(party, { party, feminine: 0, total, races: {} });
      }
    }
    return [...rows.values()].sort(
      (a, b) =>
        (b.total ?? b.feminine) - (a.total ?? a.feminine) ||
        a.party.localeCompare(b.party, "pt-BR"),
    );
  }, [dims, uf]);

  const hasGenderDenominatorByParty = parties.some((p) => p.total !== null);

  if (ufOptions.length === 0) {
    return (
      <GapNote label="Dado não disponível">
        A fotografia atual do TSE não trouxe as contagens por unidade da
        federação neste universo. Sem essas células o estado fica sem número —
        nada é estimado no lugar.
      </GapNote>
    );
  }

  const btn = (active: boolean) =>
    `border-2 border-ink px-2.5 py-1 font-mono text-[12px] uppercase tracking-wider focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum ${
      active ? "bg-ink text-paper" : "bg-paper text-ink"
    }`;

  return (
    <div className="space-y-6">
      <div className="poster-frame p-4 md:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="poster-eyebrow text-muted-foreground">Universo</span>
          {(["proporcional", "majoritario"] as UniverseId[]).map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => setUniverse(u)}
              aria-pressed={universe === u}
              className={btn(universe === u)}
            >
              {UNIVERSE_LABEL[u]}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
          <label className="block w-full sm:max-w-xs">
            <span className="poster-eyebrow block text-muted-foreground">
              Estado
            </span>
            <select
              value={uf}
              onChange={(e) => setUf(e.target.value)}
              className="mt-2 w-full border-2 border-ink bg-paper px-3 py-2 font-mono text-xs text-ink"
            >
              <option value="">Brasil (todos os estados)</option>
              {ufOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </label>
          {uf && (
            <button
              type="button"
              onClick={() => setUf("")}
              className="self-start font-mono text-[12px] uppercase tracking-wider text-plum underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum sm:self-auto"
            >
              voltar ao Brasil
            </button>
          )}
        </div>

        <p className="mt-3 font-mono text-[12px] leading-relaxed text-ink/70">
          {UNIVERSE_SCOPE[universe]}. Trocar o universo troca todos os números
          desta seção: eles não se somam.
        </p>
      </div>

      {/* Retrato do recorte escolhido */}
      <div className="poster-frame p-5 md:p-7">
        <p className="poster-eyebrow text-ink">
          {uf ? `${uf} · ` : "Brasil · "}
          {UNIVERSE_LABEL[universe]}
        </p>

        {!uf ? (
          <>
            <h3 className="mt-3 font-display text-[clamp(1.2rem,3vw,1.7rem)] leading-tight text-ink">
              Escolha um estado para ver a realidade daquela região
            </h3>
            {nationalShare !== null && national ? (
              <p className="mt-4 font-mono text-sm leading-relaxed text-ink">
                Referência nacional: {nf(national.feminine)} candidaturas de
                mulheres em {nf(national.total)} candidaturas registradas neste
                universo — {pf(nationalShare)}%.
              </p>
            ) : (
              <p className="mt-4 font-mono text-sm text-muted-foreground">
                Dados em atualização.
              </p>
            )}
          </>
        ) : stateTotal === null || stateShare === null ? (
          <GapNote label="Dado não disponível">
            A fotografia atual não registra candidaturas deste universo em {uf}.
            Ausência de registro no arquivo não é zero calculado nem falha de
            leitura.
          </GapNote>
        ) : (
          <>
            <dl className="mt-4 grid gap-4 sm:grid-cols-3">
              <div>
                <dt className="poster-eyebrow text-muted-foreground">
                  Candidaturas registradas
                </dt>
                <dd className="poster-figure mt-1 text-2xl text-ink">
                  {nf(stateTotal)}
                </dd>
              </div>
              <div>
                <dt className="poster-eyebrow text-muted-foreground">
                  Candidaturas de mulheres
                </dt>
                <dd className="poster-figure mt-1 text-2xl text-ink">
                  {nf(stateFeminine ?? 0)}
                </dd>
              </div>
              <div>
                <dt className="poster-eyebrow text-muted-foreground">
                  Participação feminina
                </dt>
                <dd className="poster-figure mt-1 text-2xl text-plum">
                  {stateTotal >= MIN_BASE ? (
                    `${pf(stateShare)}%`
                  ) : (
                    <StatusTag tone="limit">base pequena</StatusTag>
                  )}
                </dd>
              </div>
            </dl>

            <p className="mt-5 text-sm leading-relaxed text-ink">
              {stateTotal >= MIN_BASE && diff !== null && nationalShare !== null
                ? `Comparação com o Brasil no mesmo universo: ${pf(
                    nationalShare,
                  )}% no país e ${pf(stateShare)}% em ${uf} — diferença de ${pf(
                    Math.abs(diff),
                  )} ponto${Math.abs(diff) === 1 ? "" : "s"} percentual${
                    Math.abs(diff) === 1 ? "" : "is"
                  } (p.p.) ${
                    diff >= 0 ? "acima" : "abaixo"
                  } da média nacional. É uma diferença descritiva de composição das candidaturas: não explica por que ela existe.`
                : `Com ${nf(
                    stateTotal,
                  )} candidaturas neste universo em ${uf}, o percentual não é exibido (mínimo declarado: ${MIN_BASE}). Os absolutos continuam à vista.`}
            </p>
          </>
        )}
      </div>

      {/* Cor/raça no estado */}
      {uf && (
        <div className="poster-frame p-5 md:p-7">
          <p className="poster-eyebrow text-ink">
            Quais mulheres · {uf} · {UNIVERSE_LABEL[universe]}
          </p>
          {!stateRaces || raceBase === 0 ? (
            <div className="mt-4">
              <GapNote label="Dado não disponível">
                A fotografia atual não trouxe cor/raça das candidaturas de
                mulheres deste universo em {uf}.
              </GapNote>
            </div>
          ) : (
            <>
              <table className="mt-4 w-full border-collapse text-left">
                <caption className="sr-only">
                  Cor/raça declarada ao TSE entre as {raceBase} candidaturas de
                  mulheres do universo {UNIVERSE_LABEL[universe]} em {uf}.
                </caption>
                <thead>
                  <tr className="border-b-2 border-ink">
                    <th
                      scope="col"
                      className="py-2 pr-3 font-mono text-[12px] uppercase tracking-wider text-muted-foreground"
                    >
                      Cor/raça declarada
                    </th>
                    <th
                      scope="col"
                      className="py-2 pr-3 font-mono text-[12px] uppercase tracking-wider text-muted-foreground"
                    >
                      Candidaturas
                    </th>
                    <th
                      scope="col"
                      className="py-2 font-mono text-[12px] uppercase tracking-wider text-muted-foreground"
                    >
                      % das mulheres em {uf}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(stateRaces)
                    .sort((a, b) => b[1] - a[1])
                    .map(([race, n]) => (
                      <tr key={race} className="border-b border-ink/20">
                        <th
                          scope="row"
                          className="py-2 pr-3 font-mono text-sm font-bold text-ink"
                        >
                          {normalizeRaceLabel(race)}
                        </th>
                        <td className="py-2 pr-3 font-mono text-sm text-ink">
                          {nf(n)}
                        </td>
                        <td className="py-2 font-mono text-sm text-ink">
                          {raceBase >= MIN_BASE ? (
                            `${pf((n / raceBase) * 100)}%`
                          ) : (
                            <span className="text-muted-foreground">
                              base pequena
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <p className="mt-4 font-mono text-[12px] leading-relaxed text-ink/70">
                Denominador: {nf(raceBase)} candidaturas de mulheres neste
                universo em {uf}. Categorias como declaradas ao TSE — preta e
                parda não são somadas nesta tabela.
              </p>
            </>
          )}
        </div>
      )}

      {/* Partido × gênero × raça dentro do estado */}
      {uf && (
        <div className="poster-frame p-4 md:p-5">
          <p className="poster-eyebrow text-ink">
            Partidos em {uf} · {UNIVERSE_LABEL[universe]}
          </p>
          {parties.length === 0 ? (
            <div className="mt-4">
              <GapNote label="Dado não disponível">
                Nenhuma célula de partido foi gravada para {uf} neste universo
                nesta fotografia.
              </GapNote>
            </div>
          ) : (
            <>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-left">
                  <caption className="sr-only">
                    Composição das candidaturas por partido em {uf}, universo{" "}
                    {UNIVERSE_LABEL[universe]}: candidaturas de mulheres,
                    {hasGenderDenominatorByParty
                      ? " total do partido no estado, percentual"
                      : ""}{" "}
                    e cor/raça declarada.
                  </caption>
                  <thead>
                    <tr className="border-b-2 border-ink">
                      <th
                        scope="col"
                        className="py-2 pr-3 font-mono text-[12px] uppercase tracking-wider text-muted-foreground"
                      >
                        Partido
                      </th>
                      <th
                        scope="col"
                        className="py-2 pr-3 font-mono text-[12px] uppercase tracking-wider text-muted-foreground"
                      >
                        {hasGenderDenominatorByParty
                          ? "Mulheres / total no estado"
                          : "Candidaturas de mulheres"}
                      </th>
                      {hasGenderDenominatorByParty && (
                        <th
                          scope="col"
                          className="py-2 pr-3 font-mono text-[12px] uppercase tracking-wider text-muted-foreground"
                        >
                          % de mulheres na lista
                        </th>
                      )}
                      <th
                        scope="col"
                        className="py-2 font-mono text-[12px] uppercase tracking-wider text-muted-foreground"
                      >
                        Cor/raça entre essas candidaturas
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {parties.map((p) => {
                      const raceSum = Object.values(p.races).reduce(
                        (a, b) => a + b,
                        0,
                      );
                      return (
                        <tr
                          key={p.party}
                          className="border-b border-ink/20 align-top"
                        >
                          <th
                            scope="row"
                            className="py-3 pr-3 font-mono text-sm font-bold text-ink"
                          >
                            {p.party}
                          </th>
                          <td className="py-3 pr-3 font-mono text-sm text-ink">
                            {p.total !== null
                              ? `${nf(p.feminine)} / ${nf(p.total)}`
                              : nf(p.feminine)}
                          </td>
                          {hasGenderDenominatorByParty && (
                            <td className="py-3 pr-3 font-mono text-sm text-ink">
                              {p.total !== null && p.total >= MIN_BASE ? (
                                `${pf((p.feminine / p.total) * 100)}%`
                              ) : (
                                <StatusTag tone="limit">base pequena</StatusTag>
                              )}
                            </td>
                          )}
                          <td className="py-3 font-mono text-[12px] text-muted-foreground">
                            {raceSum === 0 ? (
                              "sem candidatura de mulher registrada"
                            ) : (
                              <span className="flex flex-wrap gap-x-3 gap-y-1">
                                {Object.entries(p.races)
                                  .sort((a, b) => b[1] - a[1])
                                  .map(([race, n]) => (
                                    <span key={race}>
                                      {normalizeRaceLabel(race)}:{" "}
                                      <span className="text-ink">{nf(n)}</span>
                                      {raceSum >= MIN_BASE
                                        ? ` (${pf((n / raceSum) * 100)}%)`
                                        : ""}
                                    </span>
                                  ))}
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <p className="mt-4 font-mono text-[12px] leading-relaxed text-ink/70">
                Ordem descritiva, por tamanho da lista no estado — não é
                classificação de mérito nem ranking de partidos. Limiar
                declarado: abaixo de {MIN_BASE} candidaturas na célula o
                percentual não aparece e ficam só os absolutos.
                {!hasGenderDenominatorByParty && (
                  <>
                    {" "}
                    Nesta fotografia, o total de candidaturas por estado ×
                    partido (o denominador de gênero dessa combinação) não foi
                    gravado: por isso aqui aparecem apenas as candidaturas de
                    mulheres, sem percentual. O percentual de mulheres por
                    partido no país inteiro está na tabela nacional acima.
                  </>
                )}
              </p>
            </>
          )}
        </div>
      )}

      <ContextBox variant="calculamos" title="Como este recorte é montado">
        <p>
          Somamos as células já contadas na fotografia vigente do TSE dentro do
          estado escolhido: candidaturas registradas, candidaturas de mulheres,
          cor/raça declarada e partido. O estado é a unidade eleitoral do
          registro (SG_UF); nada é redistribuído entre estados e nenhum estado é
          comparado com um universo diferente do seu.
        </p>
      </ContextBox>
    </div>
  );
}
