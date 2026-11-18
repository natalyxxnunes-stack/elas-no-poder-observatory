/**
 * Valida o corte financeiro efetivamente publicado no site.
 * Fontes: TSE 17/11/2026; auditoria independente conciliada ao método original.
 * Os cortes históricos continuam disponíveis em docs/auditorias/.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";

const raiz = path.join(process.cwd(), "docs/auditorias/financiamento-2026-17nov");
const ler = (arquivo) => JSON.parse(readFileSync(path.join(raiz, arquivo), "utf8"));
const receita = ler("receitas-agregadas.json");
const fefc = ler("fefc-proporcional.json");
const fefcTitulares = ler("fefc-titulares.json");
const despesas = ler("despesas-agregadas.json");
const manifest = ler("manifest.json");
const reconciliacao = ler("reconciliacao.json");

assert.equal(receita.baseGeneratedAt, "17/11/2026 09:03:49");
assert.equal(manifest.candidaturas.gerado_em, "17/11/2026 19:31:29");
assert.equal(receita.csvSha256, "5c9b1e0456a8aa75bdecc5ac7ffc2bb52d4bbaa0099ec675a13b6ab73c0e04ba");
assert.equal(receita.csvSha256, manifest.contas.receitas.csv_sha256);
assert.equal(despesas.sha256.contratadas, manifest.contas.despesas_contratadas.csv_sha256);
assert.equal(despesas.sha256.pagas, manifest.contas.despesas_pagas.csv_sha256);
assert.equal(despesas.sha256.receitas, receita.csvSha256);
assert.equal(receita.rawRows, receita.rowsProcessed + receita.duplicateRows);
assert.equal(receita.duplicateRows, 981);
assert.equal(receita.candidaciesWithRevenue, 19665);
assert.deepEqual(receita.tiposPrestacao, {
  FINAL: 19383,
  PARCIAL: 186,
  "RELATÓRIO FINANCEIRO": 96,
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
assert.ok(Math.abs(prop.totalRevenue + maj.totalRevenue - 7021570001.15) < 0.01);
assert.ok(Math.abs(prop.feminineRevenue + maj.feminineRevenue - 2038564843.63) < 0.01);
assert.equal(fefcTitulares.total.candidaturas, 20065);
assert.ok(Math.abs(fefcTitulares.total.fefc - 5032571764.23) < 0.01);
assert.ok(Math.abs(fefcTitulares.total.mulheres.fefc - 1672271447.53) < 0.01);
assert.equal(despesas.auditoria.pagoSemPrestador, 0);
assert.equal(despesas.auditoria.doadorSemReceita, 0);
assert.equal(reconciliacao.status, "CONFERIDO_POR_SCRIPT_ORIGINAL");
assert.equal(Object.keys(reconciliacao.comparacoes).length, 14);
assert.ok(Object.values(reconciliacao.comparacoes).every((v) => v.dif === 0));

assert.equal(manifest.status, "FINANCEIRO_POS_16_11_RESULTADO_ELEITORAL_INCOMPLETO");
assert.equal(manifest.divergencias_totalizacao["DEPUTADO FEDERAL"].encontrado, 505);
assert.equal(manifest.divergencias_totalizacao["DEPUTADO ESTADUAL"].encontrado, 1011);

const achados = readFileSync("src/data/achados.ts", "utf8");
const bloco = achados.split('id: "dinheiro-brancas-peso"')[1]?.split("\n  },")[0];
assert.ok(bloco && bloco.includes('valor: "56,1%"'), "Manchete divergente");
assert.ok(bloco.includes("17/11/2026"), "Achado precisa informar o novo corte");
assert.ok(bloco.includes("valor: 56.1"), "Gráfico divergente");

console.log("OK: receita, FEFC, despesas, gênero, raça, corte, achados e alerta de Rondônia.");
console.log("56,1% =", prop.feminineRevenueByRace.BRANCA.value, "/", prop.feminineRevenue, "na base de 17/11/2026");
