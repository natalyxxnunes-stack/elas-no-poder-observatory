/**
 * Teste do snapshot financeiro estático de 2026.
 * Recontagens completas estão em docs/auditorias/financiamento-2026-15nov.
 * Valida universos, arredondamento da manchete, somas por raça e metadados;
 * não baixa dados nem substitui a auditoria da fonte oficial.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";

const raiz = path.join(process.cwd(), "docs/auditorias/financiamento-2026-15nov");
const ler = (arquivo) => JSON.parse(readFileSync(path.join(raiz, arquivo), "utf8"));
const receita = ler("receitas-agregadas.json");
const registro = ler("registro-agregado.json");
const fefc = ler("fefc-proporcional.json");
const fefcTitulares = ler("fefc-titulares.json");
const despesas = ler("despesas-agregadas.json");
const prov = ler("proveniencia.json");
const fonte = prov["receitas.csv"];
const cand = prov["candidaturas.csv"];
assert.equal(fonte.csvsha256, "73ec0cd7727edd6ef3f9b69e7158f0e9dbb02a772a47e01e01374d004f4bdd90");
assert.equal(cand.csvsha256, "60843af924b8da04d3f5bbacc0c0b14582dc89eba502e90a0b661c33928f44ce");
assert.equal(fonte.geracao, "15/11/2026 04:05:10");
assert.equal(cand.geracao, "15/11/2026 05:30:40");
assert.equal(receita.csvSha256, fonte.csvsha256);
assert.equal(registro.sha256, cand.csvsha256);
assert.equal(receita.rawRows, receita.rowsProcessed + receita.duplicateRows);
assert.equal(receita.duplicateRows, 982);
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
assert.ok(bloco.includes("15/11/2026"), "Data de corte não declarada no achado");

console.log("OK: receitas, FEFC, despesas, universo, raça, fonte e achado coerentes.");
console.log("56,1% =", brancas, "/", prop.feminineRevenue, "(dados gerados em 15/11/2026)");
