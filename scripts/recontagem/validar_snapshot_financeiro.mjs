/**
 * Valida o corte financeiro efetivamente publicado no site.
 * Fontes: TSE 25/11/2026; auditoria independente conciliada ao método original.
 * Os cortes históricos continuam disponíveis em docs/auditorias/.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";

const raiz = path.join(process.cwd(), "docs/auditorias/financiamento-2026-25nov");
const ler = (arquivo) => JSON.parse(readFileSync(path.join(raiz, arquivo), "utf8"));
const receita = ler("receitas-agregadas.json");
const fefc = ler("fefc-proporcional.json");
const fefcTitulares = ler("fefc-titulares.json");
const despesas = ler("despesas-agregadas.json");
const manifest = ler("manifest.json");
const reconciliacao = ler("reconciliacao.json");

assert.equal(receita.baseGeneratedAt, "25/11/2026 04:05:30");
assert.equal(manifest.candidaturas.gerado_em, "25/11/2026 16:30:55");
assert.equal(receita.csvSha256, "7cbbb11fb8004591e42ebb1ec1432585740c5b2436cd5f3ff65765e921247f29");
assert.equal(receita.csvSha256, manifest.contas.receitas.csv_sha256);
assert.equal(despesas.sha256.contratadas, manifest.contas.despesas_contratadas.csv_sha256);
assert.equal(despesas.sha256.pagas, manifest.contas.despesas_pagas.csv_sha256);
assert.equal(despesas.sha256.receitas, receita.csvSha256);
assert.equal(receita.rawRows, receita.rowsProcessed + receita.duplicateRows);
assert.equal(receita.duplicateRows, 978);
assert.equal(receita.candidaciesWithRevenue, 19692);
assert.deepEqual(receita.tiposPrestacao, {
  FINAL: 19454,
  PARCIAL: 164,
  "RELATÓRIO FINANCEIRO": 74,
});
assert.equal(receita.unmatchedCandidacies, 0);
assert.equal(receita.genderMismatchRows, 0);

const prop = receita.universes.proporcional;
const maj = receita.universes.majoritario;
assert.equal(prop.registeredCandidacies, fefc.total.candidaturas);
assert.equal(prop.registeredCandidacies, 19531);
assert.equal(prop.registeredFeminineCandidacies, 6953);
assert.equal(
  prop.registeredCandidacies,
  despesas.proporcional.FEMININO.candidaturas + despesas.proporcional.MASCULINO.candidaturas,
);
const valores = Object.values(prop.feminineRevenueByRace);
assert.ok(Math.abs(valores.reduce((a, b) => a + b.value, 0) - prop.feminineRevenue) < 0.01);
assert.equal(valores.reduce((a, b) => a + b.candidacies, 0), prop.feminineCandidaciesWithRevenue);
assert.equal(Number((100 * prop.feminineRevenueByRace.BRANCA.value / prop.feminineRevenue).toFixed(1)), 56.1);
assert.ok(Math.abs(prop.totalRevenue + maj.totalRevenue - 7026864553.75) < 0.01);
assert.ok(Math.abs(prop.feminineRevenue + maj.feminineRevenue - 2039869234.05) < 0.01);
assert.equal(fefcTitulares.total.candidaturas, 20065);
assert.ok(Math.abs(fefcTitulares.total.fefc - 5035316334.04) < 0.01);
assert.ok(Math.abs(fefcTitulares.total.mulheres.fefc - 1672964894.43) < 0.01);
assert.equal(despesas.auditoria.pagoSemPrestador, 0);
assert.equal(despesas.auditoria.doadorSemReceita, 0);
assert.equal(reconciliacao.status, "CONFERIDO_POR_SCRIPT_ORIGINAL");
assert.equal(Object.keys(reconciliacao.comparacoes).length, 14);
assert.ok(Object.values(reconciliacao.comparacoes).every((v) => v.dif === 0));

assert.equal(manifest.status, "FINANCEIRO_POS_17_11_RESULTADO_ELEITORAL_INCOMPLETO");
assert.equal(manifest.divergencias_totalizacao["DEPUTADO FEDERAL"].encontrado, 505);
assert.equal(manifest.divergencias_totalizacao["DEPUTADO ESTADUAL"].encontrado, 1011);

const achados = readFileSync("src/data/achados.ts", "utf8");
const bloco = achados.split('id: "dinheiro-brancas-peso"')[1]?.split("\n  },")[0];
assert.ok(bloco && bloco.includes('valor: "56,1%"'), "Manchete divergente");
assert.ok(bloco.includes("25/11/2026"), "Achado precisa informar o novo corte");
assert.ok(bloco.includes("valor: 56.1"), "Gráfico divergente");

console.log("OK: receita, FEFC, despesas, gênero, raça, corte, achados e alerta de totalização.");
console.log("56,1% =", prop.feminineRevenueByRace.BRANCA.value, "/", prop.feminineRevenue, "na base de 25/11/2026");
