/**
 * manchetes — as frases de abertura do site, calculadas a partir dos mesmos
 * dados que as páginas publicam. Cada manchete é um fato com número,
 * denominador e fonte; quando há responsável identificável (partido), o nome
 * entra. Usadas no topo de cada página e na capa da página inicial.
 *
 * Regras: nenhuma soma de cor/raça sem declarar; dado parcial marcado como
 * parcial; Presidência sempre em número absoluto.
 */
import { FEFC_META, FEFC_PARTIDOS, FEFC_TOTAL } from "@/data/fefc-partidos-2026";
import {
  RESULT_2026_GOVERNO,
  RESULT_2026_PARTIDOS,
  RESULT_2026_PRESIDENCIA,
  RESULT_2026_PROPORCIONAL,
} from "@/data/resultado-2026";
import { VOTOS_2026 } from "@/data/votos-2026";
import { FEMINICIDIO_2025, FEMINICIDIO_META, VPG, VPG_META } from "@/data/violencia-2026";
import { formatDecimal, formatInt, formatPct } from "@/lib/format-br";

const n = formatInt;
const pct = (a: number, b: number) => formatPct(b > 0 ? (a / b) * 100 : 0);
const sum = (o: Record<string, number> | undefined) =>
  Object.values(o ?? {}).reduce((a, b) => a + b, 0);

export type Manchete = {
  id: string;
  /** a manchete, uma frase */
  texto: string;
  /** página que prova a manchete */
  to: string;
  /** rótulo curto da página */
  pagina: string;
  fonte: string;
  /** marcado quando o dado ainda pode mudar */
  parcial?: boolean;
  /** versão em card: número-âncora, rótulo, tensão e mini-gráfico (capa e faixas) */
  ancora?: Ancora;
  /** fonte em uma linha, para o rodapé do card; a completa fica em `fonte` */
  fonteCurta?: string;
};

export type Visual =
  | {
      tipo: "barras";
      dados: { rotulo: string; valor: number; atual?: boolean }[];
      /** linha de referência, em % */
      piso?: number;
      /** "pct" = escala de 0 a 100%; "contagem" = escala até o maior valor */
      escala?: "pct" | "contagem";
    }
  | { tipo: "pontos"; total: number; cheios: number; legendaCheios: string; legendaVazios: string; atual?: boolean }
  | { tipo: "waffle"; partes: { raca: string; rotulo: string; n: number }[]; colunas?: number; titulo?: string };

export type Ancora = {
  /** o número em destaque, já formatado */
  valor: string;
  /** o que o número conta, em uma frase curta */
  rotulo: string;
  /** a comparação que dá sentido ao número, com denominador */
  tensao: string;
  visual?: Visual;
  /** segundo gráfico, só no card de destaque */
  visualExtra?: Visual;
};

const R = RESULT_2026_PROPORCIONAL;
const TSE = "TSE, Candidatos 2026, base de 27/10/2026";

/* ---------- Início ---------- */
export const M_CADEIRAS: Manchete = {
  id: "cadeiras",
  texto: `Mulheres foram ${pct(R.candidacies.feminine, R.candidacies.total)} das candidaturas a deputada e ficaram com ${pct(R.elected.feminine, R.seats)} das cadeiras: ${n(R.elected.feminine)} de ${n(R.seats)}`,
  to: "/quem-chega",
  pagina: "Quem chega",
  fonte: TSE,
};

/* ---------- Quem são elas ---------- */
const brancasCand = R.candidacyRaceFeminine["BRANCA"] ?? 0;
const brancasEleitas = R.electedRaceFeminine["BRANCA"] ?? 0;
export const M_BRANCAS: Manchete = {
  id: "brancas",
  texto: `Brancas eram ${pct(brancasCand, R.candidacies.feminine)} das candidatas a deputada e são ${pct(brancasEleitas, R.elected.feminine)} das eleitas: ${n(brancasEleitas)} de ${n(R.elected.feminine)}`,
  to: "/quem-sao-elas",
  pagina: "Quem são elas",
  fonte: `${TSE}. Deputadas federais, estaduais e distritais; cor/raça declarada ao TSE`,
};

/* ---------- Quem chega: partidos ---------- */
const plRace = RESULT_2026_PARTIDOS.electedRaceFeminineByParty["PL"] as Record<string, number>;
const plF = (RESULT_2026_PARTIDOS.electedFeminineByParty as Record<string, number>)["PL"] ?? 0;
export const M_PL_PRETAS: Manchete = {
  id: "pl-pretas",
  texto: `O PL, partido com mais cadeiras, elegeu ${n(plF)} deputadas: ${n(plRace["BRANCA"] ?? 0)} brancas e ${(plRace["PRETA"] ?? 0) === 0 ? "nenhuma preta" : `${n(plRace["PRETA"] ?? 0)} pretas`}`,
  to: "/partidos",
  pagina: "Partido por partido",
  fonte: `${TSE}. Deputadas federais, estaduais e distritais`,
};

const pretasTotal = R.electedRaceFeminine["PRETA"] ?? 0;
const pretasPorPartido = Object.entries(RESULT_2026_PARTIDOS.electedRaceFeminineByParty)
  .map(([p, r]) => [p, (r as Record<string, number>)["PRETA"] ?? 0] as const)
  .filter(([, v]) => v > 0)
  .sort((a, b) => b[1] - a[1]);
const [top1, top2] = pretasPorPartido;
export const M_PRETAS_PARTIDOS: Manchete = {
  id: "pretas-partidos",
  texto: `${n((top1?.[1] ?? 0) + (top2?.[1] ?? 0))} das ${n(pretasTotal)} deputadas pretas eleitas são de dois partidos: ${top1?.[0]} (${n(top1?.[1] ?? 0)}) e ${top2?.[0]} (${n(top2?.[1] ?? 0)})`,
  to: "/partidos",
  pagina: "Partido por partido",
  fonte: `${TSE}. Deputadas federais, estaduais e distritais`,
};

/* ---------- Dinheiro ---------- */
const fb = FEFC_TOTAL.mulheresRaca["BRANCA"] ?? { candidaturas: 0, fefc: 0 };
export const M_FUNDO_BRANCAS: Manchete = {
  id: "fundo-brancas",
  texto: `Brancas eram ${pct(fb.candidaturas, FEFC_TOTAL.mulheres.candidaturas)} das candidatas a deputada e receberam ${pct(fb.fefc, FEFC_TOTAL.mulheres.fefc)} do fundo eleitoral que foi para mulheres`,
  to: "/dinheiro",
  pagina: "Dinheiro",
  fonte: `TSE, Prestação de Contas 2026, base de ${FEFC_META.baseGeneratedAt}`,
  parcial: true,
};

/** partidos com fundo relevante abaixo do piso constitucional de 30% para candidaturas pretas e pardas */
export const ABAIXO_PISO_PP = Object.entries(FEFC_PARTIDOS)
  .filter(([, d]) => d.fefc >= 10_000_000)
  .map(([p, d]) => ({
    partido: p,
    fundo: d.fefc,
    fatia: (d.pretasPardasSoma.fefc / d.fefc) * 100,
    cand: (d.pretasPardasSoma.candidaturas / d.candidaturas) * 100,
  }))
  .filter((x) => x.fatia < 30)
  .sort((a, b) => b.fundo - a.fundo);

export const M_PISO: Manchete = {
  id: "piso",
  texto:
    ABAIXO_PISO_PP.length === 0
      ? "Nenhum dos partidos com mais fundo eleitoral ficou abaixo do piso de 30% para candidaturas pretas e pardas"
      : `${ABAIXO_PISO_PP.map((x) => x.partido).join(" e ")} deram menos de 30% do fundo eleitoral a candidaturas pretas e pardas a deputado, o piso da Constituição: ${ABAIXO_PISO_PP.map((x) => `${x.partido} ${formatPct(x.fatia)}`).join(", ")}`,
  to: "/dinheiro",
  pagina: "Dinheiro",
  fonte: `TSE, Prestação de Contas 2026, base de ${FEFC_META.baseGeneratedAt}. Pretas e pardas somadas, como na EC 133/2024`,
  parcial: true,
};

/* ---------- Votos ---------- */
const vf = VOTOS_2026.federal;
const candF = sum(vf.candidacies["FEMININO"]);
const candAll = candF + sum(vf.candidacies["MASCULINO"]);
const votF = sum(vf.votes["FEMININO"]);
export const M_VOTOS: Manchete = {
  id: "votos",
  texto: `Elas eram ${pct(candF, candAll)} das candidaturas à Câmara, tiveram ${pct(votF, vf.votesTotal)} dos votos e ficaram com ${pct(R.byCargo.federal.feminine, R.byCargo.federal.seats)} das cadeiras`,
  to: "/votos",
  pagina: "Votos",
  fonte: `${TSE}; TSE, Votação por candidato 2026`,
};

/* ---------- Funil / majoritárias ---------- */
const P = RESULT_2026_PRESIDENCIA;
export const M_GOVERNOS: Manchete = {
  id: "governos",
  texto: `${n(RESULT_2026_GOVERNO.electedFeminine)} governadoras em ${n(RESULT_2026_GOVERNO.totalUfs)} estados, e ${P.mulheresEleitas === 0 ? "nenhuma mulher eleita para a Presidência" : `${n(P.mulheresEleitas)} presidenta eleita`}: ${n(P.mulheres)} das ${n(P.registros)} candidaturas presidenciais eram de mulheres, e nenhuma chegou ao 2º turno`,
  to: "/funil",
  pagina: "O funil",
  fonte: TSE,
};

/* ---------- Senado ---------- */
export const M_SENADO: Manchete = {
  id: "senado",
  texto:
    "O PL terá 27 das 81 cadeiras do Senado em 2027, um terço da Casa, e os projetos que reservam cadeiras para mulheres esperam relatoria há anos",
  to: "/quem-chega#senado",
  pagina: "Quem chega",
  fonte: "TSE, Candidatos 2026; Senado Federal, Dados Abertos (28/10/2026)",
};

/* ---------- Como votaram ---------- */
export const M_IGUALDADE: Manchete = {
  id: "igualdade",
  texto:
    "10 deputadas votaram contra a lei de igualdade salarial; as 8 que concorreram em 2026 se elegeram",
  to: "/como-votaram",
  pagina: "Como votaram",
  fonte: "Câmara dos Deputados, Dados Abertos; TSE, Candidatos 2026",
};

/** capa da página inicial, na ordem de leitura */
export const CAPA: Manchete[] = [M_CADEIRAS, M_IGUALDADE, M_SENADO, M_PISO, M_BRANCAS, M_PL_PRETAS];
/* M_VPG entra na capa depois da definição, abaixo */

/* ---------- Quem controla ---------- */
const plFundo = ABAIXO_PISO_PP.find((x) => x.partido === "PL");
export const M_CONTROLA: Manchete = {
  id: "controla",
  texto: plFundo
    ? `O partido decide quem recebe o dinheiro: no PL, candidaturas pretas e pardas eram ${formatPct(plFundo.cand)} das candidaturas a deputado e ficaram com ${formatPct(plFundo.fatia)} do fundo eleitoral`
    : "O partido decide quem recebe o dinheiro da campanha",
  to: "/partidos",
  pagina: "Partido por partido",
  fonte: `TSE, Prestação de Contas 2026, base de ${FEFC_META.baseGeneratedAt}. Pretas e pardas somadas, como na EC 133/2024`,
  parcial: true,
};

/* ---------- Regras ---------- */
export const M_REGRAS: Manchete = {
  id: "regras",
  texto:
    "Os projetos que reservam cadeiras para mulheres esperam relatoria no Senado desde 2023 e 2024, um deles de um senador do PL",
  to: "/em-disputa",
  pagina: "Regras de 2026",
  fonte: "Senado Federal, Dados Abertos, consulta de 28/10/2026",
};

/* ---------- Barreiras ---------- */
const vpg22 = VPG.porAno.find((a) => a.ano === "2022")?.processos ?? 0;
const vpg26 = VPG.porAno.find((a) => a.ano === "2026")?.processos ?? 0;
export const M_VPG: Manchete = {
  id: "vpg",
  texto: `A Justiça Eleitoral registrou ${n(vpg26)} processos de violência política de gênero em 2026, contra ${n(vpg22)} em 2022`,
  to: "/barreiras",
  pagina: "Barreiras",
  fonte: `${VPG_META.fonte}; dados extraídos em ${VPG_META.extraidoEm}`,
};

export const M_FEMINICIDIO: Manchete = {
  id: "feminicidio",
  texto: `Em 2025, ${formatDecimal(FEMINICIDIO_2025.razoesDeGeneroPct)}% das mulheres assassinadas no Brasil foram mortas por razões de gênero, o maior percentual desde 2015: ${n(FEMINICIDIO_2025.vitimas)} vítimas de feminicídio`,
  to: "/barreiras#feminicidio",
  pagina: "Barreiras",
  fonte: `${FEMINICIDIO_META.fonte}, publicado em ${FEMINICIDIO_META.publicadoEm}`,
};

CAPA.push(M_VPG);

/* ---------- Versão em card das manchetes da capa ----------
 * Todos os números saem das mesmas variáveis que montam o `texto`. */
const pctN = (a: number, b: number) => (b > 0 ? (a / b) * 100 : 0);

M_CADEIRAS.ancora = {
  valor: pct(R.elected.feminine, R.seats),
  rotulo: "das cadeiras de deputada ficaram com mulheres",
  tensao: `Eram ${pct(R.candidacies.feminine, R.candidacies.total)} das candidaturas. ${n(R.elected.feminine)} de ${n(R.seats)} cadeiras.`,
  visual: {
    tipo: "barras",
    dados: [
      { rotulo: "Candidaturas", valor: pctN(R.candidacies.feminine, R.candidacies.total) },
      { rotulo: "Cadeiras", valor: pctN(R.elected.feminine, R.seats), atual: true },
    ],
  },
};
M_CADEIRAS.fonteCurta = "TSE · base de 27/10/2026";

M_BRANCAS.ancora = {
  valor: pct(brancasEleitas, R.elected.feminine),
  rotulo: "das deputadas eleitas em 2026 são brancas",
  tensao: `Eram ${pct(brancasCand, R.candidacies.feminine)} das candidatas. ${n(brancasEleitas)} das ${n(R.elected.feminine)} eleitas.`,
  visual: {
    tipo: "barras",
    dados: [
      { rotulo: "Candidatas", valor: pctN(brancasCand, R.candidacies.feminine) },
      { rotulo: "Eleitas", valor: pctN(brancasEleitas, R.elected.feminine), atual: true },
    ],
  },
  visualExtra: {
    tipo: "waffle",
    titulo: `As ${n(R.elected.feminine)} deputadas eleitas, uma por quadrado`,
    colunas: 27,
    partes: (["BRANCA", "PARDA", "PRETA", "INDÍGENA", "AMARELA"] as const).map((raca) => ({
      raca,
      rotulo: { BRANCA: "brancas", PARDA: "pardas", PRETA: "pretas", "INDÍGENA": "indígenas", AMARELA: "amarelas" }[raca],
      n: R.electedRaceFeminine[raca] ?? 0,
    })),
  },
};
M_BRANCAS.fonteCurta = "TSE · base de 27/10/2026 · cor/raça declarada";

const plPretas = plRace["PRETA"] ?? 0;
M_PL_PRETAS.ancora = {
  valor: n(plPretas),
  rotulo: `deputadas pretas entre as ${n(plF)} eleitas pelo PL`,
  tensao: `${n(plRace["BRANCA"] ?? 0)} são brancas. O PL é o partido com mais cadeiras.`,
  visual: {
    tipo: "waffle",
    partes: (["BRANCA", "PARDA", "PRETA", "INDÍGENA", "AMARELA"] as const).map((raca) => ({
      raca,
      rotulo: { BRANCA: "brancas", PARDA: "pardas", PRETA: "pretas", "INDÍGENA": "indígenas", AMARELA: "amarelas" }[raca],
      n: plRace[raca] ?? 0,
    })),
  },
};
M_PL_PRETAS.fonteCurta = "TSE · base de 27/10/2026 · cor/raça declarada";

M_IGUALDADE.ancora = {
  valor: "8 de 8",
  rotulo: "deputadas que votaram contra a igualdade salarial e tentaram voltar se elegeram",
  tensao: "10 votaram Não em 2023; 8 concorreram em 2026.",
  visual: { tipo: "pontos", total: 10, cheios: 8, legendaCheios: "concorreram e se elegeram", legendaVazios: "não concorreram", atual: true },
};
M_IGUALDADE.fonteCurta = "Câmara dos Deputados; TSE";

M_SENADO.ancora = {
  valor: "27 de 81",
  rotulo: "cadeiras do Senado serão do PL em 2027",
  tensao: "Um terço da Casa. Os projetos que reservam cadeiras para mulheres esperam relatoria há anos.",
  visual: { tipo: "pontos", total: 81, cheios: 27, legendaCheios: "PL", legendaVazios: "outros partidos" },
};
M_SENADO.fonteCurta = "TSE; Senado Federal · 28/10/2026";

const piso0 = ABAIXO_PISO_PP[0];
if (piso0) {
  M_PISO.ancora = {
    valor: formatPct(piso0.fatia),
    rotulo: `do fundo eleitoral do ${piso0.partido} para deputado foi para candidaturas pretas e pardas`,
    tensao: `O piso da Constituição é 30%. ${ABAIXO_PISO_PP.slice(1).map((x) => `${x.partido}: ${formatPct(x.fatia)}`).join("; ")}. Pretas e pardas somadas, como na EC 133/2024.`,
    visual: {
      tipo: "barras",
      piso: 30,
      dados: ABAIXO_PISO_PP.map((x) => ({ rotulo: x.partido, valor: x.fatia, atual: true })),
    },
  };
}
M_PISO.fonteCurta = `TSE · contas de ${FEFC_META.baseGeneratedAt}`;

M_VPG.ancora = {
  valor: n(vpg26),
  rotulo: "processos de violência política de gênero na Justiça Eleitoral em 2026",
  tensao: `Em 2022 foram ${n(vpg22)}. Dados até ${VPG_META.extraidoEm}.`,
  visual: {
    tipo: "barras",
    dados: [
      { rotulo: "2022", valor: vpg22 },
      { rotulo: "2026", valor: vpg26, atual: true },
    ],
    escala: "contagem",
  },
};
M_VPG.fonteCurta = `TSE e MPF · ${VPG_META.extraidoEm}`;

M_PRETAS_PARTIDOS.fonteCurta = "TSE · base de 27/10/2026 · cor/raça declarada";
M_CONTROLA.fonteCurta = `TSE · contas de ${FEFC_META.baseGeneratedAt} · pretas e pardas somadas, como na EC 133/2024`;
M_FEMINICIDIO.fonteCurta = `${FEMINICIDIO_META.fonte} · ${FEMINICIDIO_META.publicadoEm}`;

/**
 * Cards da capa (decisão de 30/10/2026, a partir de avaliação de design e UX):
 * o primeiro é o destaque; a manchete das cadeiras sai da capa porque o
 * número dela já abre a página no topo.
 */
export const CAPA_CARDS: Manchete[] = [M_BRANCAS, M_PL_PRETAS, M_IGUALDADE, M_SENADO, M_PISO, M_VPG];
