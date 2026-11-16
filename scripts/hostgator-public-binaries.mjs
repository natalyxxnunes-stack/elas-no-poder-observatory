/**
 * Restaura e valida arquivos públicos (imagens, PDFs e CSVs) após a exportação estática.
 * O Vite já reencodou um PNG de 1080px de 89 50 4e 47 para ef bf bd 50.
 * Arquivos originais em public/ devem sair idênticos em dist/client/, inclusive CSVs financeiros.
 * Não interfere em HTML, JS, CSS, SVG nem arquivos criados no build.
 */
import { readdir, mkdir, readFile, copyFile, rm } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

const PUBLIC = path.join(process.cwd(), "public");
const DIST = path.join(process.cwd(), "dist/client");
const BINARIOS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".ico", ".pdf", ".csv"]);

// Prévia editorial ≠ pacote público: o código oculta Pagu em produção, mas o
// arquivo em public/ era copiado pelo Vite e continuava acessível pela URL.
// A exclusão é deliberadamente explícita; só retirar após decisão de direitos.
// Na build de revisão autorizada pelo workflow, a imagem pode ser examinada.
const FOTOS_BLOQUEADAS = new Map([
  ["fotos/pagu-patricia-galvao-anos-1920.jpg", "VITE_QSE_PREVIEW_PAGU_FOTO"],
  ["fotos/lelia-gonzalez-cezar-loureiro-referencia.jpg", "VITE_QSE_PREVIEW_LELIA_FOTO"],
]);

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
let excluidos = 0;

for await (const source of percorrer(PUBLIC)) {
  if (!BINARIOS.has(path.extname(source).toLowerCase())) continue;
  const rel = path.relative(PUBLIC, source);
  const urlRel = rel.split(path.sep).join("/");
  const target = path.join(DIST, rel);
  const autorizacaoPrevia = FOTOS_BLOQUEADAS.get(urlRel);
  if (autorizacaoPrevia && process.env[autorizacaoPrevia] !== "true") {
    // O Vite pode ter copiado a imagem antes: remover mesmo quando já existe.
    await rm(target, { force: true });
    excluidos++;
    console.log("[hostgator-public] arquivo de acervo em revisão excluído do pacote: " + urlRel);
    continue;
  }
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
console.log("[hostgator-public] " + verificados + " arquivos verificados, " + restaurados + " restaurados, " + excluidos + " bloqueados.");
