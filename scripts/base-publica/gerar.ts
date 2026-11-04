/**
 * Base pública do Quem são elas?: gera os CSVs de public/dados a partir dos
 * mesmos arquivos de dados que o site publica (src/data), mais um manifesto
 * com SHA-256 de cada CSV em src/data/base-publica.ts.
 *
 * Uso (na raiz do repositório):  bun scripts/base-publica/gerar.ts
 *
 * Regras:
 * - nenhum dado que o site não publica entra aqui (sem CPF, e-mail, data de
 *   nascimento ou foto);
 * - UTF-8 com BOM (abre direto no Excel), separador vírgula, decimal com ponto;
 * - cor/raça sempre nas cinco categorias do TSE, nunca somadas;
 * - rodar de novo sempre que um dos arquivos de origem mudar.
 */
import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { ELEITAS_2026, ELEITAS_META } from "../../src/data/eleitas-2026";
import { TRAJETORIA_ELEITAS, TRAJETORIA_META } from "../../src/data/eleitas-trajetoria-2026";
import { RECORTE_META, RECORTE_PARTIDOS, RECORTE_TOTAL, RECORTE_UFS, type Recorte } from "../../src/data/partido-uf-2026";
import { HISTORICO_CARGO_UF } from "../../src/data/historico-cargo-uf";
import { DEPUTADAS, VOTACOES, VOTACOES_META } from "../../src/data/votacoes-camara";
import { MONITOR_CAMARA, MONITOR_META } from "../../src/data/monitor-camara";
import { FEFC_META, FEFC_PARTIDOS } from "../../src/data/fefc-partidos-2026";
import { COAUTORIA_LIGACOES, COAUTORIA_META, COAUTORIA_NOS } from "../../src/data/coautoria-camara";

const RACAS = ["BRANCA", "PARDA", "PRETA", "INDÍGENA", "AMARELA"];
const esc = (v: unknown) => {
  const s = v === null || v === undefined ? "" : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const csv = (cab: string[], linhas: unknown[][]) =>
  "﻿" + [cab, ...linhas].map((l) => l.map(esc).join(",")).join("\n") + "\n";

type Arquivo = { arquivo: string; titulo: string; descricao: string; fonte: string; linhas: number; colunas: string[]; conteudo: string };
const arquivos: Arquivo[] = [];
function add(arquivo: string, titulo: string, descricao: string, fonte: string, cab: string[], linhas: unknown[][]) {
  arquivos.push({ arquivo, titulo, descricao, fonte, linhas: linhas.length, colunas: cab, conteudo: csv(cab, linhas) });
}

// 1. eleitas
add(
  "eleitas-2026.csv",
  "As eleitas de 2026",
  "Uma linha por mulher eleita em 2026 (deputada federal, estadual e distrital, senadora e governadora), com o registro no TSE e a trajetória declarada.",
  `TSE, Candidatos 2026, base de ${ELEITAS_META.baseGeneratedAt} (SHA-256 ${ELEITAS_META.csvSha256}); TSE, Candidatos 2022, base de ${TRAJETORIA_META.base2022}`,
  ["slug", "nome_urna", "cargo", "uf", "partido", "cor_raca", "situacao", "turno", "ocupacao_2026", "escolaridade_2026", "cargo_2022", "resultado_2022", "ficha"],
  ELEITAS_2026.map((e) => {
    const t = TRAJETORIA_ELEITAS[e.slug];
    return [e.slug, e.nome, e.cargo, e.uf, e.partido, e.corRaca, e.situacao, e.turno, t?.ocupacao ?? "", t?.instrucao ?? "", t?.em2022?.cargo ?? "", t?.em2022?.resultado ?? "sem candidatura", `https://quemsaoelas.com.br/eleitas/${e.slug}`];
  }),
);

// 2 e 3. recortes por partido e por estado (formato longo por cor/raça)
const longo = (chave: string, r: Recorte) =>
  [...RACAS, "outra"].map((k) => [
    chave,
    k,
    r.candidaturasRaca[k] ?? 0,
    r.candidatasRaca[k] ?? 0,
    (r.eleitosRaca[k] ?? 0) - (r.eleitasRaca[k] ?? 0),
    r.eleitasRaca[k] ?? 0,
  ]);
const cabRecorte = (c: string) => [c, "cor_raca", "candidaturas", "candidatas", "eleitos_homens", "eleitas"];
add(
  "deputado-2026-por-partido.csv",
  "Deputado 2026, por partido, gênero e cor/raça",
  "Candidaturas e eleitos a deputado federal, estadual e distrital, 1º turno, por partido e cor/raça declarada. Uma linha por partido e categoria.",
  `TSE, Candidatos 2026, base de ${RECORTE_META.baseGeneratedAt} (SHA-256 ${RECORTE_META.csvSha256})`,
  cabRecorte("partido"),
  [...Object.entries(RECORTE_PARTIDOS).flatMap(([p, r]) => longo(p, r)), ...longo("BRASIL", RECORTE_TOTAL)],
);
add(
  "deputado-2026-por-estado.csv",
  "Deputado 2026, por estado, gênero e cor/raça",
  "O mesmo recorte, por unidade da federação.",
  `TSE, Candidatos 2026, base de ${RECORTE_META.baseGeneratedAt} (SHA-256 ${RECORTE_META.csvSha256})`,
  cabRecorte("uf"),
  [...Object.entries(RECORTE_UFS).flatMap(([u, r]) => longo(u, r)), ...longo("BRASIL", RECORTE_TOTAL)],
);

// 4 e 5. série histórica
add(
  "serie-historica-por-cargo.csv",
  "Série histórica 2014 a 2026, por cargo",
  "Candidaturas, candidatas, eleitos e eleitas em cada cargo nas eleições gerais de 2014, 2018, 2022 e 2026, com as eleitas por cor/raça.",
  "TSE, Candidatos 2014, 2018, 2022 e 2026 (scripts/recontagem/historico_cargo_uf.py)",
  ["ano", "cargo", "candidaturas", "candidatas", "eleitos", "eleitas", ...RACAS.map((r) => `eleitas_${r.toLowerCase()}`)],
  Object.entries(HISTORICO_CARGO_UF).flatMap(([ano, x]) =>
    Object.entries(x.byCargo).map(([cargo, c]) => [ano, cargo, c.candidaturas, c.candidatas, c.eleitos, c.eleitas, ...RACAS.map((r) => c.eleitasRaca[r] ?? 0)]),
  ),
);
add(
  "serie-historica-deputado-federal-por-estado.csv",
  "Série histórica de deputado federal, por estado",
  "Candidaturas, candidatas, cadeiras e eleitas a deputado federal por estado, 2014 a 2026.",
  "TSE, Candidatos 2014, 2018, 2022 e 2026 (scripts/recontagem/historico_cargo_uf.py)",
  ["ano", "uf", "candidaturas", "candidatas", "cadeiras", "eleitas"],
  Object.entries(HISTORICO_CARGO_UF).flatMap(([ano, x]) =>
    Object.entries(x.deputadoFederalByUf).map(([uf, u]) => [ano, uf, u.candidaturas, u.candidatas, u.cadeiras, u.eleitas]),
  ),
);

// 6. votações da Câmara
add(
  "camara-seis-votacoes.csv",
  "Como votaram as deputadas: seis votações",
  "Uma linha por deputada e votação nominal de mérito acompanhada pelo observatório, com o voto, o partido na data e o alinhamento com a maioria da bancada.",
  `${VOTACOES_META.fonte}; coleta em ${VOTACOES_META.coletaEm}`,
  ["deputada", "uf", "cor_raca_2022", "resultado_2026", "votacao_id", "proposicao", "data", "voto", "partido_na_data", "alinhamento"],
  DEPUTADAS.flatMap((d) =>
    VOTACOES.filter((v) => d.votos[v.id]).map((v) => {
      const x = d.votos[v.id]!;
      return [d.nome, d.uf, d.raca2022, d.desfecho2026, v.id, v.proposicao, v.data, x.voto, x.partido, x.alinhamento ?? ""];
    }),
  ),
);

// 7. monitor
add(
  "camara-monitor-2026.csv",
  "Monitor de mandato, Câmara, 2026",
  "Uma linha por deputada federal que passou pela Câmara no período: votos registrados nas votações nominais do plenário, proposições assinadas (autora ou coautora) e discursos.",
  `Câmara dos Deputados, Dados Abertos; coleta em ${MONITOR_META.coletaEm}; período ${MONITOR_META.periodo.join(" a ")}`,
  ["id_camara", "nome", "partido", "uf", "em_exercicio_na_coleta", "votacoes_em_exercicio", "votos_registrados", "proposicoes", "discursos", "cargo_2026", "resultado_2026"],
  MONITOR_CAMARA.map((m) => [m.id, m.nome, m.partido, m.uf, m.emExercicioHoje ? "sim" : "não", m.votacoesEmExercicio, m.votosRegistrados, m.proposicoes, m.discursos, m.em2026?.cargo ?? "", m.em2026?.resultado ?? "sem candidatura"]),
);

// 7b. coautoria
const NO = new Map(COAUTORIA_NOS.map((x) => [x.id, x]));
add(
  "camara-coautoria-2026.csv",
  "Quem assina junto: coautoria entre deputadas, 2026",
  "Uma linha por par de deputadas que assinaram ao menos um projeto juntas, com o número de projetos (todos e só os com até 20 autores) e até três exemplos.",
  `Câmara dos Deputados, Dados Abertos; coleta em ${COAUTORIA_META.coletaEm}; período ${COAUTORIA_META.periodo.join(" a ")}`,
  ["deputada_a", "partido_a", "uf_a", "deputada_b", "partido_b", "uf_b", "projetos", "projetos_ate_20_autores", "partidos_diferentes", "exemplos"],
  COAUTORIA_LIGACOES.map((l) => {
    const a = NO.get(l.a)!, b = NO.get(l.b)!;
    return [a.nome, a.partido, a.uf, b.nome, b.partido, b.uf, l.peso, l.pesoAte20, l.entrePartidos ? "sim" : "não", l.exemplos.map((e) => e.split("|")[0]).join("; ")];
  }),
);

// 8. fundo
add(
  "fundo-eleitoral-deputado-por-partido.csv",
  "Fundo eleitoral a deputado, por partido",
  "Fundo Especial de Financiamento de Campanha que chegou às candidaturas a deputado de cada partido, por gênero e cor/raça, em reais.",
  `TSE, Prestação de Contas 2026, base de ${FEFC_META.baseGeneratedAt} (SHA-256 ${FEFC_META.csvSha256})`,
  ["partido", "grupo", "candidaturas", "fefc_reais"],
  Object.entries(FEFC_PARTIDOS).flatMap(([p, f]) => [
    [p, "todas", f.candidaturas, f.fefc.toFixed(2)],
    [p, "mulheres", f.mulheres.candidaturas, f.mulheres.fefc.toFixed(2)],
    ...RACAS.map((r) => [p, `cor_raca_${r.toLowerCase()}`, f.raca[r]?.candidaturas ?? 0, (f.raca[r]?.fefc ?? 0).toFixed(2)]),
    ...RACAS.map((r) => [p, `mulheres_${r.toLowerCase()}`, f.mulheresRaca[r]?.candidaturas ?? 0, (f.mulheresRaca[r]?.fefc ?? 0).toFixed(2)]),
  ]),
);

mkdirSync("public/dados", { recursive: true });
const manifesto = arquivos.map(({ conteudo, ...a }) => {
  writeFileSync(`public/dados/${a.arquivo}`, conteudo);
  return { ...a, bytes: Buffer.byteLength(conteudo), sha256: createHash("sha256").update(conteudo).digest("hex") };
});
const geradoEm = new Date().toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });
writeFileSync(
  "src/data/base-publica.ts",
  `/** base-publica — manifesto dos CSVs de public/dados. GERADO por scripts/base-publica/gerar.ts; não editar à mão. */\n` +
    `export type ArquivoBase = { arquivo: string; titulo: string; descricao: string; fonte: string; linhas: number; colunas: string[]; bytes: number; sha256: string };\n` +
    `export const BASE_PUBLICA_GERADA_EM = ${JSON.stringify(geradoEm)};\n` +
    `export const BASE_PUBLICA: readonly ArquivoBase[] = ${JSON.stringify(manifesto, null, 1)};\n`,
);
console.log(manifesto.map((m) => `${m.arquivo} ${m.linhas} linhas ${m.sha256.slice(0, 12)}`).join("\n"));
