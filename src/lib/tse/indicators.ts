/**
 * indicators — projeção de uma fotografia real do TSE sobre os indicadores
 * já definidos (com metadados completos) em `src/data/election-2026.ts`.
 *
 * A definição de cada indicador — universo, cargos, fórmula, filtros, fonte —
 * continua sendo a da camada de metodologia. Aqui apenas se preenchem
 * numerador, denominador, valor, datas e status a partir do snapshot gravado
 * pela coleta. Sem snapshot, os indicadores permanecem sem valor.
 */

import { DATA_STATUS, type Indicator } from "@/data/election-2026";
import type { UniverseId } from "@/lib/tse/compute";
import type { PublicSnapshot } from "@/lib/tse/snapshot.functions";

function universeOf(indicator: Indicator): UniverseId | null {
  if (indicator.id.endsWith("proporcional")) return "proporcional";
  if (indicator.id.endsWith("majoritario")) return "majoritario";
  return null;
}

const provisorio =
  "Registro de candidaturas de 2026 ainda sujeito a alteração pela Justiça Eleitoral (deferimentos, indeferimentos e substituições). Valor provisório.";

/** Preenche os indicadores da fotografia atual com os números do snapshot. */
export function applySnapshot(
  indicators: readonly Indicator[],
  snapshot: PublicSnapshot | null,
): Indicator[] {
  if (!snapshot) return [...indicators];

  const shares: Partial<Record<UniverseId, number>> = {};
  const filled = indicators.map((indicator) => {
    const universe = universeOf(indicator);
    if (!universe || indicator.unit !== "%") return { ...indicator };
    const tally = snapshot.universes[universe];
    if (!tally || tally.total <= 0) return { ...indicator };
    const value = (tally.feminine / tally.total) * 100;
    shares[universe] = value;
    return {
      ...indicator,
      value,
      numerator: tally.feminine,
      denominator: tally.total,
      filters: [...indicator.filters, ...snapshot.filters],
      baseGeneratedAt: snapshot.baseGeneratedAt,
      processedAt: snapshot.collectedAt,
      status: DATA_STATUS.provisorio,
      caveat: provisorio,
    };
  });

  const p = shares.proporcional;
  const m = shares.majoritario;

  return filled.map((indicator) => {
    if (indicator.unit !== "p.p." || p === undefined || m === undefined) {
      return indicator;
    }
    return {
      ...indicator,
      value: p - m,
      baseGeneratedAt: snapshot.baseGeneratedAt,
      processedAt: snapshot.collectedAt,
      status: DATA_STATUS.provisorio,
    };
  });
}

/** Contagem por categoria original de cor/raça na fotografia atual. */
export function snapshotRaceCounts(
  snapshot: PublicSnapshot | null,
  universe: UniverseId,
): Record<string, number> | null {
  const counts = snapshot?.universes[universe]?.raceCounts;
  if (!counts || Object.keys(counts).length === 0) return null;
  return counts;
}
