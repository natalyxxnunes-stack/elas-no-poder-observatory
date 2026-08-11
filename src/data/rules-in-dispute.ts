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
  | "EM DISCUSSÃO"
  | "A VERIFICAR";

export type DisputeItem = {
  id: string;
  kind: "Projeto de lei" | "Resolução" | "Decisão judicial" | "Emenda constitucional";
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
  /** data em que o observatório verificou a situação */
  checkedAt: string | null;
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
    checkedAt: null,
  },
  {
    id: "ec-111-2021",
    kind: "Emenda constitucional",
    title: "Contagem em dobro de votos para distribuição de recursos (EC 111/2021)",
    proposal:
      "Contagem em dobro, por período determinado, de votos dados a mulheres e a pessoas negras para fins de distribuição do fundo partidário e do tempo de propaganda.",
    affects:
      "Partidos, na divisão de recursos entre si. Não altera a atribuição de cadeiras nem o resultado da eleição.",
    status: "EM VIGOR",
    statusNote:
      "Regra com prazo definido no texto constitucional. Os efeitos sobre candidaturas dependem da redistribuição interna feita por cada partido.",
    sourceLabel: "Emenda Constitucional nº 111/2021",
    sourceUrl:
      "https://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc111.htm",
    checkedAt: null,
  },
  {
    id: "fraude-cota",
    kind: "Decisão judicial",
    title: "Apuração de fraude à regra de composição por gênero",
    proposal:
      "Candidaturas registradas apenas para cumprir o percentual mínimo por gênero podem ser apuradas pela Justiça Eleitoral.",
    affects:
      "Partidos, federações e candidaturas envolvidas no caso concreto examinado.",
    status: "EM DISCUSSÃO",
    statusNote:
      "Cada caso é analisado individualmente, conforme as circunstâncias e as provas. Não há efeito automático sobre o resultado de uma eleição.",
    sourceLabel: "TSE — jurisprudência eleitoral",
    sourceUrl: "https://www.tse.jus.br/jurisprudencia",
    checkedAt: null,
  },
];

/** Itens ainda não incluídos por falta de verificação documental. */
export const DISPUTE_GAP =
  "Projetos de lei em tramitação no Congresso sobre cota, financiamento e violência política ainda não estão listados aqui: cada item só entra com número da proposição, situação verificada na fonte oficial e data da verificação. Até então, a lacuna fica declarada em vez de preenchida.";

export const DISPUTE_RULE =
  "Projeto apresentado não é projeto aprovado. Situação em tramitação não antecipa resultado, e nenhuma proposição é descrita aqui como se já produzisse efeitos.";
