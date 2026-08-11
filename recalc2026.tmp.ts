// Auditoria: recálculo da fotografia de 2026 com o MESMO código do projeto
// (parse.ts + compute), a partir do pacote oficial já baixado. Só imprime JSON.
import { unzipSync } from "fflate";
import { readFileSync } from "node:fs";
import {
  createTally,
  ingestCsv,
  computeIndicators,
  resolveBaseGeneratedAt,
  validate,
  PROCESSING_VERSION,
  APPLIED_FILTERS,
} from "./src/lib/tse/parse.ts";

const bytes = new Uint8Array(readFileSync("/tmp/c2026.zip"));
const files = unzipSync(bytes);
const dec = new TextDecoder("latin1");
const acc = createTally();
for (const name of Object.keys(files).filter((n) => /\.csv$/i.test(n))) {
  ingestCsv(dec.decode(files[name]!), acc);
}
const baseGeneratedAt = resolveBaseGeneratedAt(acc).value;
const indicators = computeIndicators(acc);
const validation = validate(acc, indicators, null);
console.log(
  JSON.stringify(
    {
      processing_version: PROCESSING_VERSION,
      base_generated_at: baseGeneratedAt,
      record_count: acc.recordCount,
      rawLineCount: acc.rawLineCount,
      duplicateRows: acc.duplicateRows,
      rowsWithoutKey: acc.rowsWithoutKey,
      outOfScope: acc.outOfScope,
      distinctCandidacies: acc.distinctCandidacies,
      columns_found: acc.headerNames,
      filters: APPLIED_FILTERS,
      situation_values: acc.situationValues,
      universes: acc.universes,
      indicators,
      validation,
    },
    null,
    0,
  ),
);
