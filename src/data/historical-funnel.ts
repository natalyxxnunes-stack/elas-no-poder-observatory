/**
 * historical-funnel — dados curados e conferidos contra os arquivos oficiais do
 * TSE para o funil candidatura → eleição no universo proporcional (deputado
 * federal + estadual + distrital).
 *
 * Não entram por banco nem pipeline: são bases fechadas e imutáveis, mantidas
 * como constante auditável no código. Cada ano tem denominador próprio; os
 * percentuais não se somam entre anos.
 *
 * Eleitas = DS_SIT_TOT_TURNO iniciando em "ELEITO" no 1º turno. Candidatas =
 * DS_GENERO = FEMININO. Cor/raça = categorias autodeclaradas originais do TSE,
 * todas exibidas: branca, parda, preta, indígena, amarela, não informado.
 * Nenhuma categoria é omitida ou agregada.
 */

/** ordem fixa de exibição das categorias de cor/raça em todos os anos */
export const RACE_CATEGORIES = [
  "branca",
  "parda",
  "preta",
  "indigena",
  "amarela",
  "nao_informado",
] as const;

export type RaceCategory = (typeof RACE_CATEGORIES)[number];

export const RACE_LABELS: Record<RaceCategory, string> = {
  branca: "Branca",
  parda: "Parda",
  preta: "Preta",
  indigena: "Indígena",
  amarela: "Amarela",
  nao_informado: "Não informado",
};

/** cores da paleta do projeto, uma por categoria, na ordem fixa. Laranja fica reservado ao dado de 2026. */
export const RACE_COLORS: Record<RaceCategory, string> = {
  branca: "var(--race-branca)",
  parda: "var(--race-parda)",
  preta: "var(--plum)",
  indigena: "var(--forest)",
  amarela: "var(--race-amarela)",
  nao_informado: "var(--race-na)",
};

export type RaceBreakdown = Record<RaceCategory, { count: number; percent: number }>;

export type FunnelStage = {
  total: number;
  feminine: number;
  femininePercent: number;
  /** distribuição de cor/raça dentro do universo feminino; null quando indisponível */
  race: RaceBreakdown | null;
};

export type HistoricalFunnelYear = {
  year: 2014 | 2018 | 2022 | 2026;
  /** estágio da base: fechada (eleição encerrada) ou em curso (2026) */
  stage: "fechada" | "em_curso";
  candidacy: FunnelStage;
  /** null quando a eleição ainda não ocorreu */
  elected: FunnelStage | null;
};

export const HISTORICAL_FUNNEL: HistoricalFunnelYear[] = [
  {
    year: 2014,
    stage: "fechada",
    candidacy: {
      total: 25_167,
      feminine: 7_930,
      femininePercent: 31.5,
      race: {
        branca: { count: 4_207, percent: 53.1 },
        parda: { count: 2_856, percent: 36.0 },
        preta: { count: 804, percent: 10.1 },
        indigena: { count: 28, percent: 0.4 },
        amarela: { count: 35, percent: 0.4 },
        nao_informado: { count: 0, percent: 0 },
      },
    },
    elected: {
      total: 1_572,
      feminine: 170,
      femininePercent: 10.8,
      race: {
        branca: { count: 124, percent: 72.9 },
        parda: { count: 37, percent: 21.8 },
        preta: { count: 9, percent: 5.3 },
        indigena: { count: 0, percent: 0 },
        amarela: { count: 0, percent: 0 },
        nao_informado: { count: 0, percent: 0 },
      },
    },
  },
  {
    year: 2018,
    stage: "fechada",
    candidacy: {
      total: 27_561,
      feminine: 8_820,
      femininePercent: 32.0,
      race: {
        branca: { count: 4_460, percent: 50.6 },
        parda: { count: 3_084, percent: 35.0 },
        preta: { count: 1_173, percent: 13.3 },
        indigena: { count: 42, percent: 0.5 },
        amarela: { count: 61, percent: 0.7 },
        nao_informado: { count: 0, percent: 0 },
      },
    },
    elected: {
      total: 1_572,
      feminine: 240,
      femininePercent: 15.3,
      race: {
        branca: { count: 175, percent: 72.9 },
        parda: { count: 45, percent: 18.8 },
        preta: { count: 19, percent: 7.9 },
        indigena: { count: 1, percent: 0.4 },
        amarela: { count: 0, percent: 0 },
        nao_informado: { count: 0, percent: 0 },
      },
    },
  },
  {
    year: 2022,
    stage: "fechada",
    candidacy: {
      total: 27_977,
      feminine: 9_532,
      femininePercent: 34.1,
      race: {
        branca: { count: 4_287, percent: 45.0 },
        parda: { count: 3_341, percent: 35.1 },
        preta: { count: 1_745, percent: 18.3 },
        indigena: { count: 79, percent: 0.8 },
        amarela: { count: 45, percent: 0.5 },
        nao_informado: { count: 35, percent: 0.4 },
      },
    },
    elected: {
      total: 1_572,
      feminine: 281,
      femininePercent: 17.9,
      race: {
        branca: { count: 170, percent: 60.5 },
        parda: { count: 68, percent: 24.2 },
        preta: { count: 37, percent: 13.2 },
        indigena: { count: 4, percent: 1.4 },
        amarela: { count: 1, percent: 0.4 },
        nao_informado: { count: 1, percent: 0.4 },
      },
    },

  },
  {
    year: 2026,
    stage: "em_curso",
    candidacy: {
      total: 19_528,
      feminine: 6_951,
      femininePercent: 35.6,
      race: null,
    },
    elected: null,
  },
] as const;

export const HISTORICAL_FUNNEL_SOURCE =
  "TSE, candidatos e resultados 2014/2018/2022/2026";

/* ------------------------------------------------------------------ *
 * Taxa de eleição por gênero — indicador descritivo
 *
 * Numerador e denominador vêm das MESMAS fotografias históricas já gravadas
 * pelo projeto (arquivos oficiais do TSE, 1º turno, eleições proporcionais:
 * Câmara dos Deputados, assembleias legislativas e Câmara Legislativa do DF).
 * Gênero é lido de DS_GENERO; resultado, de DS_SIT_TOT_TURNO.
 *
 * Cada taxa divide as pessoas eleitas de um gênero pelas candidaturas do MESMO
 * gênero, ano e universo. Registros com gênero "não divulgável" (2018 e 2022)
 * ficam fora das duas taxas e por isso a soma dos dois grupos não reconstitui o
 * total do ano.
 * ------------------------------------------------------------------ */

export type ElectionRateRow = {
  year: 2014 | 2018 | 2022;
  /** candidaturas e eleitas de mulheres */
  feminine: { candidacies: number; elected: number };
  /** candidaturas e eleitos de homens */
  masculine: { candidacies: number; elected: number };
  /** ressalva específica do ano, quando existir */
  caveat: string | null;
};

export const ELECTION_RATE_BY_GENDER: readonly ElectionRateRow[] = [
  {
    year: 2014,
    feminine: { candidacies: 7930, elected: 170 },
    masculine: { candidacies: 17237, elected: 1402 },
    caveat: null,
  },
  {
    year: 2018,
    feminine: { candidacies: 8820, elected: 240 },
    masculine: { candidacies: 18690, elected: 1332 },
    caveat: null,
  },
  {
    year: 2022,
    feminine: { candidacies: 9532, elected: 281 },
    masculine: { candidacies: 18422, elected: 1291 },
    caveat: null,
  },
] as const;

export const ELECTION_RATE_FORMULA =
  "eleitas de um gênero ÷ candidaturas do mesmo gênero, no mesmo ano e universo × 100";
