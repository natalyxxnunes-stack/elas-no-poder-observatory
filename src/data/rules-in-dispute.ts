/**
 * rules-in-dispute — acompanhamento editorial de regras em tramitação ou em
 * discussão. Conteúdo editorial: nenhum número derivado da base do TSE.
 *
 * Regra editorial absoluta: projeto apresentado não é projeto aprovado. Cada
 * item declara o que propõe, quem seria afetado, a situação, a fonte e a data
 * da última verificação feita pelo observatório.
 */

export type DisputeStatus =
  | "EM TRAMITAÇÃO"
  | "EM VIGOR"
  | "EM DISCUSSÃO";

export type DisputeItem = {
  id: string;
  kind: "Projeto de lei" | "Resolução" | "Decisão judicial" | "Emenda constitucional" | "Súmula";
  title: string;
  /** o que propõe, em linguagem comum */
  proposal: string;
  /** quem seria afetado */
  affects: string;
  status: DisputeStatus;
  /** nota sobre o estágio processual, sem prever resultado */
  statusNote: string;
  sourceLabel: string;
  sourceUrl: string;
  /** data (AAAA-MM-DD) em que o observatório verificou a situação; item sem data não entra na lista */
  checkedAt: string;
};

export const DISPUTE_ITEMS: readonly DisputeItem[] = [
  {
    id: "res-23752-2026",
    kind: "Resolução",
    title: "Resolução TSE nº 23.752/2026",
    proposal:
      "Organiza, para o ciclo de 2026, regras de arrecadação e gastos de campanha, incluindo a destinação de recursos a candidaturas de mulheres, pessoas negras e indígenas.",
    affects:
      "Partidos e federações, na distribuição de recursos públicos de campanha, e as candidaturas beneficiadas por essa destinação.",
    status: "EM VIGOR",
    statusNote:
      "Norma aplicável ao ciclo em curso. A aplicação concreta só poderá ser avaliada com as prestações de contas de 2026.",
    sourceLabel: "TSE — Resolução nº 23.752/2026",
    sourceUrl:
      "https://www.tse.jus.br/legislacao/compilada/res/2026/resolucao-no-23-752-de-26-de-fevereiro-de-2026",
    checkedAt: "2026-09-22",
  },
  {
    id: "ec-111-2021",
    kind: "Emenda constitucional",
    title: "Contagem em dobro de votos para distribuição de recursos (EC 111/2021)",
    proposal:
      "Contagem em dobro dos votos dados a candidaturas de mulheres e de pessoas negras à Câmara dos Deputados, nas eleições de 2022, 2026 e 2030, para fins de distribuição do fundo partidário e do tempo de propaganda entre os partidos.",
    affects:
      "Partidos, na divisão de recursos entre si. Não altera a atribuição de cadeiras nem o resultado da eleição.",
    status: "EM VIGOR",
    statusNote:
      "Regra válida para os ciclos de 2022, 2026 e 2030, restrita aos votos para a Câmara dos Deputados. Os efeitos sobre candidaturas dependem da redistribuição interna feita por cada partido.",
    sourceLabel: "Emenda Constitucional nº 111/2021",
    sourceUrl:
      "https://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc111.htm",
    checkedAt: "2026-09-22",
  },
  {
    id: "sumula-73-tse",
    kind: "Súmula",
    title: "Fraude à cota de gênero (Súmula TSE nº 73/2024)",
    proposal:
      "Define quando uma candidatura de mulher registrada só para cumprir o mínimo de 30% configura fraude: votação zerada ou inexpressiva, prestação de contas zerada ou padronizada e ausência de atos efetivos de campanha. Basta um ou alguns desses elementos.",
    affects:
      "O partido ou federação e toda a chapa. Reconhecida a fraude, o registro da chapa (Drap) e os diplomas são cassados, os votos do partido são anulados, os quocientes eleitoral e partidário são recalculados, e quem praticou ou anuiu com a conduta pode ficar inelegível.",
    status: "EM VIGOR",
    statusNote:
      "Aprovada pelo TSE em 16/05/2024. A fraude é reconhecida em processo judicial, caso a caso, com base nas provas de cada chapa.",
    sourceLabel: "TSE, Súmula nº 73",
    sourceUrl: "https://www.tse.jus.br/legislacao/codigo-eleitoral/sumulas/sumulas-do-tse/sumula-tse-n-73",
    checkedAt: "2026-09-24",
  },
];

/** Itens ainda não incluídos por falta de verificação documental. */
export const DISPUTE_GAP =
  "Projetos de lei em tramitação no Congresso sobre cota, financiamento e violência política ainda não estão listados aqui: cada item só entra com número da proposição, situação verificada na fonte oficial e data da verificação. Até então, a lacuna fica declarada em vez de preenchida.";

export const DISPUTE_RULE =
  "Projeto apresentado não é projeto aprovado. Situação em tramitação não antecipa resultado, e nenhuma proposição é descrita aqui como se já produzisse efeitos.";
