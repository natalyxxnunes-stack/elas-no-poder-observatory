/**
 * snapshot-csv — serialização da fotografia vigente em CSV.
 *
 * Função pura: recebe a fotografia já lida do banco e devolve nome de arquivo
 * e conteúdo. Nenhum cálculo novo, nenhum segredo, nenhuma dependência de
 * servidor — roda igual no navegador e no pré-render.
 */

import type {
  PublicSnapshot,
  PublicUniverseTally,
} from "./snapshot.reads";

/** Escapa um campo para CSV com delimitador vírgula. */
function csvField(value: string | number): string {
  const s = String(value);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function buildSnapshotCsv(snap: PublicSnapshot): {
  fileName: string;
  content: string;
} {
  const lines: string[] = [
    "# Fonte: TSE / Dados Abertos / Candidatos 2026",
    `# Geracao da base (TSE): ${snap.baseGeneratedAt ?? "nao informada"}`,
    `# Coleta pelo observatorio: ${snap.collectedAt}`,
    `# Arquivo processado: ${snap.fileName}`,
    `# SHA-256 do arquivo processado (procedencia, nao validacao de calculo): ${snap.brasilCsvSha256 ?? snap.zipSha256 ?? "nao registrado nesta fotografia"}`,
    `# Conferencia manual da fotografia: ${snap.conferido ? "sim" : "nao"}`,
    `# Filtros aplicados: ${snap.filters.length > 0 ? snap.filters.join(" | ") : "nenhum"}`,
    "# Unidade de analise: candidatura registrada (nao pessoa)",
    "universo,categoria,quantidade,total_mulheres_universo,total_candidaturas_universo",
  ];

  const universes: Array<[string, PublicUniverseTally]> = [
    ["proporcional", snap.universes.proporcional],
    ["majoritario", snap.universes.majoritario],
  ];

  for (const [name, tally] of universes) {
    lines.push(
      [name, "TOTAL", tally.feminine, tally.feminine, tally.total]
        .map(csvField)
        .join(","),
    );
    for (const [category, count] of Object.entries(
      tally.raceCounts ?? {},
    ).sort((a, b) => b[1] - a[1])) {
      lines.push(
        [name, category, count, tally.feminine, tally.total]
          .map(csvField)
          .join(","),
      );
    }
  }

  const base = (snap.baseGeneratedAt ?? snap.collectedAt).slice(0, 10);
  return {
    fileName: `quem-sao-elas-fotografia-tse-${base}.csv`,
    content: `\uFEFF${lines.join("\n")}\n`,
  };
}
