/**
 * Restaura e valida arquivos públicos (imagens, PDFs e CSVs) após a exportação estática.
 * O Vite já reencodou um PNG de 1080px de 89 50 4e 47 para ef bf bd 50.
 * Arquivos originais em public/ devem sair idênticos em dist/client/, inclusive CSVs financeiros.
 * Não interfere em HTML, JS, CSS, SVG nem arquivos criados no build.
 */
import { readdir, mkdir, readFile, copyFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

const PUBLIC = path.join(process.cwd(), "public");
const DIST = path.join(process.cwd(), "dist/client");
const BINARIOS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".ico", ".pdf", ".csv"]);

async function* percorrer(dir) {
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const filename = path.join(dir, item.name);
    if (item.isDirectory()) yield* percorrer(filename);
    else if (item.isFile()) yield filename;
  }
}

function bytesValidos(name, bytes) {
  const ext = path.extname(name).toLowerCase();
  if (ext === ".png") return bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
  if (ext === ".jpg" || ext === ".jpeg") return bytes[0] === 255 && bytes[1] === 216 && bytes.at(-2) === 255 && bytes.at(-1) === 217;
  if (ext === ".webp") return bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP";
  if (ext === ".gif") return ["GIF87a", "GIF89a"].includes(bytes.toString("ascii", 0, 6));
  if (ext === ".ico") return bytes[0] === 0 && bytes[1] === 0 && (bytes[2] === 1 || bytes[2] === 2) && bytes[3] === 0;
  if (ext === ".pdf") return bytes.toString("ascii", 0, 5) === "%PDF-";
  return true;
}

const sha = (bytes) => createHash("sha256").update(bytes).digest("hex");
let verificados = 0;
let restaurados = 0;

for await (const source of percorrer(PUBLIC)) {
  if (!BINARIOS.has(path.extname(source).toLowerCase())) continue;
  const rel = path.relative(PUBLIC, source);
  const target = path.join(DIST, rel);
  const original = await readFile(source);
  if (!bytesValidos(source, original)) throw new Error("Binário original inválido: " + rel);
  let atual = null;
  try { atual = await readFile(target); } catch { /* arquivo não copiado pelo build */ }
  if (!atual || sha(original) !== sha(atual)) {
    await mkdir(path.dirname(target), { recursive: true });
    await copyFile(source, target);
    restaurados++;
    console.log("[hostgator-public] restaurado byte a byte: " + rel);
  }
  const final = await readFile(target);
  if (!bytesValidos(target, final) || sha(original) !== sha(final)) {
    throw new Error("Binário não preservado no pacote: " + rel);
  }
  verificados++;
}
console.log("[hostgator-public] " + verificados + " arquivos verificados, " + restaurados + " restaurados.");
