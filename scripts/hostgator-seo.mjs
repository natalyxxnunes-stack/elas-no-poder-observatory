// Gera o sitemap e o endereço canônico de cada página do pacote da HostGator.
//
// Roda DEPOIS do `vite build --config vite.config.static.ts`. Lê as páginas que
// o pré-render de fato gerou em `dist/client/` (cada pasta com index.html é uma
// rota publicada) e:
//  1. reescreve `dist/client/sitemap.xml` com todas elas, para o sitemap nunca
//     ficar atrás das rotas novas (fichas das eleitas, temas, Pioneiras);
//  2. insere <link rel="canonical"> no <head> de cada página que ainda não tem.
//
// Rotas despublicadas não geram HTML, então também não entram no sitemap.
// O `public/sitemap.xml` do repositório segue servindo o build padrão.
import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";

const DIST = path.join(process.cwd(), "dist/client");
const ORIGIN = (process.env.SITE_ORIGIN || "https://quemsaoelas.com.br").replace(/\/$/, "");
/** Páginas utilitárias que existem, mas não precisam ser indexadas. */
const NOINDEX = new Set(["/busca"]);

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function findPages(dir, base = "") {
  const out = [];
  if (await exists(path.join(dir, "index.html"))) out.push(base || "/");
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name === "assets") continue;
    out.push(...(await findPages(path.join(dir, entry.name), `${base}/${entry.name}`)));
  }
  return out;
}

const escapeXml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

async function main() {
  if (!(await exists(DIST)))
    throw new Error(`Pacote não encontrado em ${DIST}. Rode o build antes.`);

  const pages = (await findPages(DIST)).sort((a, b) =>
    a === "/" ? -1 : b === "/" ? 1 : a.localeCompare(b, "pt-BR"),
  );

  let canonicals = 0;
  for (const route of pages) {
    const file = path.join(DIST, route, "index.html");
    const html = await readFile(file, "utf8");
    if (/rel="canonical"/.test(html)) continue;
    const href = `${ORIGIN}${route === "/" ? "/" : route}`;
    const next = html.replace(
      "</head>",
      `<link rel="canonical" href="${escapeXml(href)}"/></head>`,
    );
    if (next !== html) {
      await writeFile(file, next, "utf8");
      canonicals += 1;
    }
  }

  const today = new Date().toISOString().slice(0, 10);
  const urls = pages
    .filter((r) => !NOINDEX.has(r))
    .map((r) => `  <url><loc>${escapeXml(`${ORIGIN}${r}`)}</loc><lastmod>${today}</lastmod></url>`);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
  await writeFile(path.join(DIST, "sitemap.xml"), xml, "utf8");

  console.log(
    `[hostgator-seo] sitemap com ${urls.length} endereços; canônico inserido em ${canonicals} páginas.`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
