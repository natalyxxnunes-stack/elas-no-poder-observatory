// Torna o pacote da HostGator autocontido nas ilustrações.
//
// O projeto guarda as imagens fora do repositório: cada `src/assets/*.asset.json`
// aponta para `/__l5e/assets-v1/<id>/<arquivo>`, caminho que só existe na
// infraestrutura da Lovable. Na HostGator esse endereço não responde e as
// ilustrações desaparecem.
//
// Este passo roda DEPOIS do `vite build --config vite.config.static.ts`:
//  1. baixa (com cache local) o binário de cada asset;
//  2. copia para `dist/client/assets/l5e/<arquivo>`;
//  3. reescreve toda ocorrência de `/__l5e/assets-v1/<id>/<arquivo>` nos
//     arquivos de texto do pacote (HTML, JS, CSS, JSON) para `/assets/l5e/<arquivo>`.
//
// O build padrão da Lovable não é afetado: ele continua servindo `/__l5e/...`.
import { readdir, readFile, writeFile, mkdir, copyFile, stat } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const ASSETS_DIR = path.join(ROOT, "src/assets");
const DIST = path.join(ROOT, "dist/client");
const OUT_DIR = path.join(DIST, "ilustracoes");
const CACHE_DIR = path.join(ROOT, ".hostgator-assets");
// Host que serve os binários originais. Pode ser sobrescrito com
// HOSTGATOR_ASSET_ORIGIN se o endereço do projeto mudar.
const ORIGIN = (
  process.env.HOSTGATOR_ASSET_ORIGIN || "https://quemsaoelas.lovable.app"
).replace(/\/$/, "");

const TEXT_EXT = new Set([".html", ".js", ".mjs", ".css", ".json", ".txt", ".xml", ".csv", ".map"]);

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function listFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await listFiles(full)));
    else out.push(full);
  }
  return out;
}

async function main() {
  if (!(await exists(DIST))) {
    throw new Error(`Pacote não encontrado em ${DIST}. Rode o build antes.`);
  }

  const pointers = (await readdir(ASSETS_DIR)).filter((f) => f.endsWith(".asset.json"));
  if (pointers.length === 0) {
    console.log("[hostgator-assets] nenhum .asset.json encontrado; nada a fazer.");
    return;
  }

  await mkdir(OUT_DIR, { recursive: true });
  await mkdir(CACHE_DIR, { recursive: true });

  const rewrites = [];
  const missing = [];

  for (const pointer of pointers) {
    const meta = JSON.parse(await readFile(path.join(ASSETS_DIR, pointer), "utf8"));
    const filename = path.basename(meta.url);
    const cached = path.join(CACHE_DIR, `${meta.asset_id}-${filename}`);

    if (!(await exists(cached))) {
      const url = `${ORIGIN}${meta.url}`;
      const res = await fetch(url);
      if (!res.ok) {
        missing.push({ pointer, url, status: res.status });
        continue;
      }
      await writeFile(cached, Buffer.from(await res.arrayBuffer()));
    }

    await copyFile(cached, path.join(OUT_DIR, filename));
    rewrites.push({ from: meta.url, to: `/ilustracoes/${filename}` });
  }

  if (missing.length > 0) {
    console.error("[hostgator-assets] binários originais não recuperados:");
    for (const m of missing) console.error(`  - ${m.pointer} (${m.status}) ${m.url}`);
    throw new Error(
      "Assets faltando: o pacote não foi reescrito. Nenhum substituto foi usado.",
    );
  }

  let touched = 0;
  for (const file of await listFiles(DIST)) {
    if (!TEXT_EXT.has(path.extname(file))) continue;
    // latin1 preserva byte a byte: nenhum arquivo é reencodado ao ser reescrito.
    const original = (await readFile(file)).toString("latin1");
    let next = original;
    for (const { from, to } of rewrites) next = next.split(from).join(to);
    if (next !== original) {
      await writeFile(file, Buffer.from(next, "latin1"));
      touched += 1;
    }
  }

  const leftovers = [];
  for (const file of await listFiles(DIST)) {
    if (!TEXT_EXT.has(path.extname(file))) continue;
    if ((await readFile(file)).toString("latin1").includes("/__l5e/")) leftovers.push(file);
  }
  if (leftovers.length > 0) {
    throw new Error(`Ainda há referências a /__l5e/ em: ${leftovers.join(", ")}`);
  }

  console.log(
    `[hostgator-assets] ${rewrites.length} assets copiados para ilustracoes/, ${touched} arquivos reescritos.`,
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
