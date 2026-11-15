/**
 * Teste do snapshot financeiro estático de 2026.
 * Recontagens completas estão em docs/auditorias/financiamento-2026-13nov.
 * Valida universos, arredondamento da manchete, somas por raça e metadados;
 * não baixa dados nem substitui a auditoria da fonte oficial.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";

const raiz = path.join(process.cwd(), "docs/auditorias/financiamento-2026-13nov");
const ler = (arquivo) => JSON.parse(readFileSync(path.join(raiz, arquivo), "utf8"));
const receita = ler("receitas-agregadas.json");
const registro = ler("registro-agregado.json");
const fefc = ler("fefc-proporcional.json");
const fefcTitulares = ler("fefc-titulares.json");
const despesas = ler("despesas-agregadas.json");
const prov = ler("proveniencia.json");
const fonte = prov["receitas.csv"];
const cand = prov["candidaturas.csv"];
assert.equal(fonte.csvsha256, "722c27a3c71ed4ed2c268b4baae189e1231ae95be2f40bb2bd1edc4e2bc7f35b");
assert.equal(cand.csvsha256, "29029414bed2708555af68545a63af6a765eed563e4b1274873ea8145f2a203b");
assert.equal(fonte.geracao, "13/11/2026 15:07:34");
assert.equal(cand.geracao, "14/11/2026 16:31:37");
assert.equal(receita.csvSha256, fonte.csvsha256);
assert.equal(registro.sha256, cand.csvsha256);
assert.equal(receita.rawRows, receita.rowsProcessed + receita.duplicateRows);
assert.equal(receita.duplicateRows, 977);
assert.equal(receita.unmatchedCandidacies, 0);
assert.equal(receita.genderMismatchRows, 0);

const prop = receita.universes.proporcional;
assert.equal(prop.registeredCandidacies, fefc.total.candidaturas);
assert.equal(prop.registeredCandidacies, registro.BASE.proporcional.total);
assert.equal(prop.registeredFeminineCandidacies, registro.BASE.proporcional.feminine);
assert.equal(prop.registeredCandidacies, despesas.proporcional.FEMININO.candidaturas + despesas.proporcional.MASCULINO.candidaturas);
const valores = Object.values(prop.feminineRevenueByRace);
const soma = valores.reduce((a, b) => a + b.value, 0);
const candidatas = valores.reduce((a, b) => a + b.candidacies, 0);
assert.ok(Math.abs(soma - prop.feminineRevenue) < 0.01);
assert.equal(candidatas, prop.feminineCandidaciesWithRevenue);
const brancas = prop.feminineRevenueByRace.BRANCA.value;
const percentual = Number((100 * brancas / prop.feminineRevenue).toFixed(1));
assert.equal(percentual, 56.1);
assert.equal(registro.BASE.proporcional.raceCounts.PRETA, 1196);
assert.equal(registro.BASE.proporcional.raceCounts.PARDA, 2380);
assert.equal(fefcTitulares.total.candidaturas, 20065);
assert.equal(despesas.auditoria.pagoSemPrestador, 0);
assert.equal(despesas.auditoria.doadorSemReceita, 0);

const achados = readFileSync("src/data/achados.ts", "utf8");
const bloco = achados.split('id: "dinheiro-brancas-peso"')[1]?.split('\n  },')[0];
assert.ok(bloco && bloco.includes('valor: "56,1%"'), "Manchete divergente: achado de financiamento");
assert.ok(bloco.includes('valor: 56.1'), "Gráfico divergente: achado de financiamento");
assert.ok(bloco.includes("13/11/2026"), "Data de corte não declarada no achado");

console.log("OK: receitas, FEFC, despesas, universo, raça, fonte e achado coerentes.");
console.log("56,1% =", brancas, "/", prop.feminineRevenue, "(dados gerados em 13/11/2026)");
