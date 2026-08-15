/**
 * sync-edge-shared — copia os módulos de processamento do TSE para dentro das
 * funções de borda, adaptando os imports ao runtime Deno.
 *
 * Fonte única de verdade continua sendo `src/lib/tse/*`. Esta cópia existe
 * porque a função de borda roda em Deno (imports com extensão explícita e
 * especificadores `npm:`/`node:`). Rode sempre que um desses arquivos mudar:
 *
 *   bun run sync:edge
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ROOT = join(dirname(new URL(import.meta.url).pathname), "..");
const SRC = join(ROOT, "src/lib/tse");
const OUT = join(ROOT, "supabase/functions/_shared/tse");

const FILES = [
  "compute.ts",
  "data-dictionary.ts",
  "parse.ts",
  "ingest.server.ts",
  "historical-compute.ts",
  "historical-data-dictionary.ts",
  "historical-parse.ts",
  "historical-ingest.server.ts",
];

const REWRITES: Array<[RegExp, string]> = [
  [/from "crypto"/g, 'from "node:crypto"'],
  [/from "fflate"/g, 'from "npm:fflate@0.8.3"'],
  // imports relativos precisam de extensão explícita no Deno
  [/from "\.\/([A-Za-z0-9._-]+)"/g, 'from "./$1.ts"'],
];

mkdirSync(OUT, { recursive: true });

for (const file of FILES) {
  let code = readFileSync(join(SRC, file), "utf8");
  for (const [pattern, replacement] of REWRITES) {
    code = code.replace(pattern, replacement);
  }
  code = code.replace(/\.ts\.ts"/g, '.ts"');
  const header =
    `// GERADO POR scripts/sync-edge-shared.ts A PARTIR DE src/lib/tse/${file}\n` +
    `// Não edite aqui: edite o original e rode \`bun run sync:edge\`.\n`;
  writeFileSync(join(OUT, file), header + code);
  console.log(`sincronizado: ${file}`);
}
