/**
 * historical-series — série histórica fechada (2014, 2018 e 2022) por
 * universo, gênero e cor/raça, CRAVADA em código.
 *
 * Recontagem independente dos arquivos oficiais do TSE (Candidatos, BRASIL),
 * baixados em 28/10/2026, com scripts/recontagem/historico_series.py. Substitui
 * a leitura do banco: o site passa a exibir os mesmos números no HTML e no
 * navegador, e a série deixa de depender de coleta em servidor.
 *
 * Diferença em relação à coleta anterior do banco: eleições suplementares que
 * vêm no mesmo arquivo (governo do AM e do TO, em 2014, e suplementares de 2018
 * e 2022) ficam fora. O universo proporcional não muda (conferido contra
 * historical-funnel.ts: 25.167/7.930/170, 27.561/8.820/240, 27.977/9.532/281).
 */

export type HistoricalUniverseFixed = {
  total: number;
  feminine: number;
  raceAll: Record<string, number>;
  raceFeminine: Record<string, number>;
  elected: { total: number; feminine: number; raceFeminine: Record<string, number> };
};

export type HistoricalYearFixed = {
  year: 2014 | 2018 | 2022;
  baseGeneratedAt: string;
  fileName: string;
  fileUrl: string;
  zipSha256: string;
  brasilCsvSha256: string;
  recordCount: number;
  anomalies: string[];
  universes: { proporcional: HistoricalUniverseFixed; majoritario: HistoricalUniverseFixed };
};

export const HISTORICAL_SERIES_COLLECTED_AT = "2026-10-28T10:30:00-03:00";

export const HISTORICAL_YEARS_FIXED: HistoricalYearFixed[] = [
  {
    year: 2014,
    baseGeneratedAt: "2021-06-23T12:00:00-03:00",
    fileName: "consulta_cand_2014.zip",
    fileUrl: "https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_cand/consulta_cand_2014.zip",
    zipSha256: "ad31cc36d9a6c89eac3d034533fffe1964aaf038697acaf32320cb9a09151087",
    brasilCsvSha256: "c332429620d24041e7dd8a927fec389bc577c06fcc67bb8d77c33cdd06063a18",
    recordCount: 25540,
    anomalies: [
      "Eleições suplementares de governo do AM e do TO, que vêm no mesmo arquivo, ficam fora: a série compara eleições gerais.",
    ],
    universes: {
      proporcional: {
        total: 25167,
        feminine: 7930,
        raceAll: {
          BRANCA: 13771,
          PARDA: 8880,
          PRETA: 2320,
          INDÍGENA: 79,
          AMARELA: 117,
        },
        raceFeminine: {
          PARDA: 2856,
          BRANCA: 4207,
          PRETA: 804,
          INDÍGENA: 28,
          AMARELA: 35,
        },
        elected: {
          total: 1572,
          feminine: 170,
          raceFeminine: {
            BRANCA: 124,
            PARDA: 37,
            PRETA: 9,
          },
        },
      },
      majoritario: {
        total: 373,
        feminine: 58,
        raceAll: {
          BRANCA: 256,
          PRETA: 33,
          PARDA: 80,
          INDÍGENA: 3,
          AMARELA: 1,
        },
        raceFeminine: {
          BRANCA: 38,
          PRETA: 9,
          PARDA: 11,
        },
        elected: {
          total: 55,
          feminine: 7,
          raceFeminine: {
            BRANCA: 6,
            PARDA: 1,
          },
        },
      },
    },
  },
  {
    year: 2018,
    baseGeneratedAt: "2024-11-13T12:00:00-03:00",
    fileName: "consulta_cand_2018.zip",
    fileUrl: "https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_cand/consulta_cand_2018.zip",
    zipSha256: "57f6881f1aa036142886ae548afd275e7ee6695643a2ab62826f2ee232d3fd44",
    brasilCsvSha256: "5824f5d362eb7f05238a21ea02eee14e1a95b491658b4e5aaa1bf8fb6271f95e",
    recordCount: 28153,
    anomalies: [
      "Senado: uma cadeira de Mato Grosso vem sem resultado no arquivo oficial; por isso o Senado soma 53 eleitos e 6 senadoras (o Senado registra 7).",
      "Eleições suplementares que vêm no mesmo arquivo ficam fora.",
    ],
    universes: {
      proporcional: {
        total: 27561,
        feminine: 8820,
        raceAll: {
          "NÃO DIVULGÁVEL": 51,
          PARDA: 9968,
          PRETA: 3005,
          BRANCA: 14256,
          INDÍGENA: 119,
          AMARELA: 162,
        },
        raceFeminine: {
          PARDA: 3084,
          PRETA: 1173,
          BRANCA: 4460,
          AMARELA: 61,
          INDÍGENA: 42,
        },
        elected: {
          total: 1572,
          feminine: 240,
          raceFeminine: {
            PARDA: 45,
            BRANCA: 175,
            PRETA: 19,
            INDÍGENA: 1,
          },
        },
      },
      majoritario: {
        total: 592,
        feminine: 95,
        raceAll: {
          "NÃO DIVULGÁVEL": 19,
          PARDA: 131,
          BRANCA: 376,
          PRETA: 59,
          AMARELA: 3,
          INDÍGENA: 4,
        },
        raceFeminine: {
          BRANCA: 61,
          PRETA: 20,
          PARDA: 12,
          INDÍGENA: 2,
        },
        elected: {
          total: 81,
          feminine: 7,
          raceFeminine: {
            BRANCA: 5,
            PARDA: 2,
          },
        },
      },
    },
  },
  {
    year: 2022,
    baseGeneratedAt: "2026-10-27T12:00:00-03:00",
    fileName: "consulta_cand_2022.zip",
    fileUrl: "https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_cand/consulta_cand_2022.zip",
    zipSha256: "6a3d25e925d6813c42c7e2d572ce1ae372a1cb7c0cdb57bcbf2d7d70a2862acb",
    brasilCsvSha256: "2f2a7677a77d053ee4b418404825d115b68cc052fb3595e37ef2555b95a4aadb",
    recordCount: 28457,
    anomalies: ["Eleições suplementares que vêm no mesmo arquivo ficam fora."],
    universes: {
      proporcional: {
        total: 27977,
        feminine: 9532,
        raceAll: {
          "NÃO DIVULGÁVEL": 23,
          PRETA: 3961,
          BRANCA: 13351,
          PARDA: 10242,
          AMARELA: 112,
          "NÃO INFORMADO": 116,
          INDÍGENA: 172,
        },
        raceFeminine: {
          BRANCA: 4287,
          PARDA: 3341,
          PRETA: 1745,
          AMARELA: 45,
          "NÃO INFORMADO": 35,
          INDÍGENA: 79,
        },
        elected: {
          total: 1572,
          feminine: 281,
          raceFeminine: {
            PARDA: 68,
            BRANCA: 170,
            PRETA: 37,
            "NÃO INFORMADO": 1,
            INDÍGENA: 4,
            AMARELA: 1,
          },
        },
      },
      majoritario: {
        total: 480,
        feminine: 100,
        raceAll: {
          PRETA: 54,
          BRANCA: 298,
          PARDA: 118,
          INDÍGENA: 6,
          AMARELA: 2,
          "NÃO INFORMADO": 1,
          "NÃO DIVULGÁVEL": 1,
        },
        raceFeminine: {
          PRETA: 17,
          BRANCA: 62,
          PARDA: 21,
        },
        elected: {
          total: 55,
          feminine: 6,
          raceFeminine: {
            BRANCA: 5,
            PARDA: 1,
          },
        },
      },
    },
  },
] as HistoricalYearFixed[];
