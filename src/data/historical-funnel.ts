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
 * DS_GENERO = FEMININO. Cor/raça = categorias autodeclaradas originais do TSE
 * (branca, preta, parda, amarela, indígena, não informado).
 */

export type HistoricalFunnelYear = {
  year: 2014 | 2018 | 2022 | 2026;
  /** estágio da base: fechada (eleição encerrada) ou em curso (2026) */
  stage: "fechada" | "em_curso";
  /** candidaturas de mulheres no universo proporcional */
  candidacy: {
    total: number;
    feminine: number;
    femininePercent: number;
    race: {
      parda: { percent: number; count: number };
      branca: { percent: number; count: number };
    };
  };
  /** mulheres eleitas no universo proporcional; null quando a eleição ainda não ocorreu */
  elected: {
    total: number;
    feminine: number;
    femininePercent: number;
    race: {
      parda: { percent: number; count: number };
      branca: { percent: number; count: number };
    };
  } | null;
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
        parda: { percent: 36.0, count: 2_855 },
        branca: { percent: 53.1, count: 4_211 },
      },
    },
    elected: {
      total: 1_572,
      feminine: 170,
      femininePercent: 10.8,
      race: {
        parda: { percent: 21.8, count: 37 },
        branca: { percent: 72.9, count: 124 },
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
        parda: { percent: 35.0, count: 3_087 },
        branca: { percent: 50.6, count: 4_463 },
      },
    },
    elected: {
      total: 1_572,
      feminine: 240,
      femininePercent: 15.3,
      race: {
        parda: { percent: 18.8, count: 45 },
        branca: { percent: 72.9, count: 175 },
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
        parda: { percent: 35.1, count: 3_346 },
        branca: { percent: 45.0, count: 4_289 },
      },
    },
    elected: {
      total: 1_572,
      feminine: 282,
      femininePercent: 17.9,
      race: {
        parda: { percent: 23.4, count: 66 },
        branca: { percent: 61.0, count: 172 },
      },
    },
  },
  {
    year: 2026,
    stage: "em_curso",
    candidacy: {
      total: 17_299,
      feminine: 6_109,
      femininePercent: 35.3,
      race: {
        parda: { percent: 0, count: 0 },
        branca: { percent: 0, count: 0 },
      },
    },
    elected: null,
  },
] as const;

export const HISTORICAL_FUNNEL_SOURCE =
  "TSE — candidatos e resultados 2014/2018/2022/2026";
