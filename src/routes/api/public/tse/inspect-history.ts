/**
 * Endpoint TEMPORÁRIO de inspeção de cabeçalho dos pacotes históricos do TSE.
 *
 * Lê o diretório central do .zip oficial por Range e, opcionalmente, apenas o
 * início de um membro específico, devolvendo o cabeçalho REAL do CSV e poucas
 * linhas de amostra. Não grava nada. Usado para montar o dicionário histórico.
 */
import { createFileRoute } from "@tanstack/react-router";
import { Inflate } from "fflate";

const SOURCES: Record<string, string> = {
  "cand-2014":
    "https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_cand/consulta_cand_2014.zip",
  "cand-2018":
    "https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_cand/consulta_cand_2018.zip",
  "cand-2022":
    "https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_cand/consulta_cand_2022.zip",
  "cand-2026":
    "https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_cand/consulta_cand_2026.zip",
  "compl-2014":
    "https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_cand_complementar/consulta_cand_complementar_2014.zip",
  "compl-2018":
    "https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_cand_complementar/consulta_cand_complementar_2018.zip",
  "compl-2022":
    "https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_cand_complementar/consulta_cand_complementar_2022.zip",
  "colig-2014":
    "https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_coligacao/consulta_coligacao_2014.zip",
  "colig-2018":
    "https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_coligacao/consulta_coligacao_2018.zip",
  "colig-2022":
    "https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_coligacao/consulta_coligacao_2022.zip",
  "vagas-2014":
    "https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_vagas/consulta_vagas_2014.zip",
  "vagas-2018":
    "https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_vagas/consulta_vagas_2018.zip",
  "vagas-2022":
    "https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_vagas/consulta_vagas_2022.zip",
};

function decodeLatin1(bytes: Uint8Array): string {
  let out = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    out += String.fromCharCode(
      ...(bytes.subarray(i, i + chunk) as unknown as number[]),
    );
  }
  return out;
}

const u16 = (b: Uint8Array, o: number) => b[o]! | (b[o + 1]! << 8);
const u32 = (b: Uint8Array, o: number) =>
  (b[o]! | (b[o + 1]! << 8) | (b[o + 2]! << 16)) + b[o + 3]! * 16777216;

async function range(url: string, header: string): Promise<Uint8Array> {
  const res = await fetch(url, {
    headers: {
      Accept: "application/zip,application/octet-stream,*/*",
      Range: header,
      Referer: "https://dadosabertos.tse.jus.br/dataset/candidatos-2022",
      "User-Agent":
        "quem-sao-elas-observatorio/1.0 (inspecao de cabecalho de dados abertos do TSE)",
    },
  });
  if (!res.ok && res.status !== 206) throw new Error(`HTTP ${res.status}`);
  return new Uint8Array(await res.arrayBuffer());
}

type Entry = { name: string; offset: number; csize: number; method: number };

function parseCentralDirectory(tail: Uint8Array): Entry[] {
  const entries: Entry[] = [];
  for (let i = 0; i < tail.length - 46; i++) {
    if (u32(tail, i) !== 0x02014b50) continue;
    const method = u16(tail, i + 10);
    const csize = u32(tail, i + 20);
    const nameLen = u16(tail, i + 28);
    const extraLen = u16(tail, i + 30);
    const commentLen = u16(tail, i + 32);
    const offset = u32(tail, i + 42);
    const name = decodeLatin1(tail.subarray(i + 46, i + 46 + nameLen));
    entries.push({ name, offset, csize, method });
    i += 45 + nameLen + extraLen + commentLen;
  }
  return entries;
}

function inflatePrefix(raw: Uint8Array, method: number): string {
  if (method === 0) return decodeLatin1(raw);
  const chunks: Uint8Array[] = [];
  const inflate = new Inflate((d) => chunks.push(d));
  try {
    inflate.push(raw, false);
  } catch {
    /* prefixo truncado */
  }
  let size = 0;
  for (const c of chunks) size += c.length;
  const merged = new Uint8Array(size);
  let off = 0;
  for (const c of chunks) {
    merged.set(c, off);
    off += c.length;
  }
  return decodeLatin1(merged);
}

export const Route = createFileRoute("/api/public/tse/inspect-history")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const key = url.searchParams.get("src") ?? "cand-2022";
        const file = url.searchParams.get("file");
        const target = SOURCES[key];
        const json = (body: unknown, status = 200) =>
          new Response(JSON.stringify(body), {
            status,
            headers: { "Content-Type": "application/json" },
          });
        if (!target) return json({ error: "src desconhecido" }, 400);

        try {
          const tail = await range(target, "bytes=-200000");
          const entries = parseCentralDirectory(tail);
          if (!file) {
            return json({
              url: target,
              members: entries.map((e) => ({ name: e.name, csize: e.csize })),
            });
          }
          const entry = entries.find((e) => e.name === file);
          if (!entry) return json({ error: "membro não encontrado" }, 404);
          const want = Math.min(entry.csize + 200, 1_500_000);
          const head = await range(
            target,
            `bytes=${entry.offset}-${entry.offset + want}`,
          );
          const nameLen = u16(head, 26);
          const extraLen = u16(head, 28);
          const dataStart = 30 + nameLen + extraLen;
          const text = inflatePrefix(head.subarray(dataStart), entry.method);
          const lines = text.split(/\r?\n/);
          const cols = (url.searchParams.get("cols") ?? "").split(",").filter(Boolean);
          const distinct: Record<string, Record<string, number>> = {};
          if (cols.length) {
            const headerCols = (lines[0] ?? "")
              .split(";")
              .map((c) => c.replace(/^"|"$/g, ""));
            for (const c of cols) distinct[c] = {};
            for (const line of lines.slice(1, lines.length - 1)) {
              const parts = line.split(";").map((c) => c.replace(/^"|"$/g, ""));
              for (const c of cols) {
                const idx = headerCols.indexOf(c);
                if (idx < 0) continue;
                const v = parts[idx] ?? "";
                distinct[c]![v] = (distinct[c]![v] ?? 0) + 1;
              }
            }
          }
          return json({
            distinct,
            url: target,
            member: entry.name,
            header: lines[0] ?? null,
            sample: lines.slice(1, 3),
            linesInPrefix: lines.length,
          });
        } catch (e) {
          return json(
            { error: e instanceof Error ? e.message : String(e), url: target },
            502,
          );
        }
      },
    },
  },
});
