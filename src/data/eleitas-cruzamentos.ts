/**
 * Cruzamentos das fichas das eleitas com o que o site já publicou: votos na
 * Câmara (votacoes-camara.ts), falas conferidas (falas.ts) e receita das
 * candidatas majoritárias. Junção por nome normalizado + UF; quando o nome de
 * urna não bate com o nome usado pela Câmara, a ficha simplesmente não mostra o
 * bloco (nunca chuta a correspondência).
 */
import { CANDIDATAS_MAJORITARIAS_2026 } from "@/data/candidatas-majoritarias-2026";
import { ELEITAS_2026, type CargoEleita, type Eleita } from "@/data/eleitas-2026";
import { FALAS } from "@/data/falas";
import { DEPUTADAS } from "@/data/votacoes-camara";

export const norm = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

export const CARGO_ROTULO: Record<CargoEleita, string> = {
  "deputada-federal": "deputada federal",
  "deputada-estadual": "deputada estadual",
  "deputada-distrital": "deputada distrital",
  senadora: "senadora",
  governadora: "governadora",
};

export const CARGO_PLURAL: Record<CargoEleita, string> = {
  "deputada-federal": "Deputadas federais",
  "deputada-estadual": "Deputadas estaduais",
  "deputada-distrital": "Deputadas distritais",
  senadora: "Senadoras",
  governadora: "Governadoras",
};

export const SITUACAO: Record<string, string> = {
  ELEITO: "eleita",
  "ELEITO POR QP": "eleita por quociente partidário",
  "ELEITO POR MÉDIA": "eleita pela média (sobras)",
};

export const UF_NOME: Record<string, string> = {
  AC: "Acre", AL: "Alagoas", AP: "Amapá", AM: "Amazonas", BA: "Bahia", CE: "Ceará", DF: "Distrito Federal",
  ES: "Espírito Santo", GO: "Goiás", MA: "Maranhão", MT: "Mato Grosso", MS: "Mato Grosso do Sul",
  MG: "Minas Gerais", PA: "Pará", PB: "Paraíba", PR: "Paraná", PE: "Pernambuco", PI: "Piauí",
  RJ: "Rio de Janeiro", RN: "Rio Grande do Norte", RS: "Rio Grande do Sul", RO: "Rondônia", RR: "Roraima",
  SC: "Santa Catarina", SP: "São Paulo", SE: "Sergipe", TO: "Tocantins",
};

const chave = (nome: string, uf: string) => `${norm(nome)}|${uf}`;
const DEP = new Map(DEPUTADAS.map((d) => [chave(d.nome, d.uf), d]));
const MAJ = new Map(CANDIDATAS_MAJORITARIAS_2026.map((c) => [chave(c[0], c[2]), c]));

export function mandatoAnterior(e: Eleita) {
  return DEP.get(chave(e.nome, e.uf)) ?? null;
}
export function receitaMajoritaria(e: Eleita) {
  if (e.cargo !== "senadora" && e.cargo !== "governadora") return null;
  return MAJ.get(chave(e.nome, e.uf))?.[6] ?? null;
}
export function falasDe(e: Eleita) {
  const n = norm(e.nome);
  return FALAS.filter((f) => f.publicar && norm(f.pessoa) === n && f.partido.endsWith(`-${e.uf}`));
}
export const ELEITA_POR_CHAVE = new Map(ELEITAS_2026.map((e) => [chave(e.nome, e.uf), e]));
export const chaveEleita = chave;
