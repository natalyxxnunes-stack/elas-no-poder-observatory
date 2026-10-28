/**
 * despesas-2026 — Dinheiro, fase 2: despesas contratadas, despesas pagas por
 * fonte do recurso e financiamento coletivo (vaquinhas) com doador originário,
 * por gênero e cor/raça. CRAVADO em código.
 *
 * Recontagem dos arquivos de prestacao_de_contas_eleitorais_candidatos_2026.zip
 * (base do TSE de 27/10/2026; SHA-256 do zip
 * 2ae14ad0a63e58c63cde024ad9f14a543af7156d9314c9ba2ce32a8909844e83):
 *  - despesas_contratadas: 8850af26700b320366108df008496f290d39b48b3aa1295d2f1914e9f2aace41
 *  - despesas_pagas: 635f148a50aefc564b91182af6e52d7915de02a48a5dfb217632abcb7c1fee16
 *  - receitas_doador_originario: c4e196cf933f2c2a1c940f39edeb5c4121b343599b5fa2e40becc84db54c84e9
 * cruzados com consulta_cand_2026_BRASIL.csv de 27/10/2026. Script:
 * scripts/recontagem/despesas_doadores_2026.py.
 *
 * Auditoria: todas as despesas pagas foram ligadas a uma candidatura pelo
 * SQ_PRESTADOR_CONTAS; todos os doadores originários foram ligados a uma
 * receita pelo SQ_RECEITA. Contas em andamento até a prestação final.
 */

export const DESPESAS_META = {
  baseGeneratedAt: "27/10/2026",
  fefcLabel: "Fundo Especial de Financiamento de Campanha",
} as const;

export type DespesaRaca = {
  candidaturas: number;
  pagoPorFonte: Record<string, number>;
  comVaquinha: number;
  vaquinhaTotal: number;
  vaquinhaMediana: number;
  doadoresMediana: number;
};
export type DespesaGrupo = {
  candidaturas: number;
  contratadoTotal: number;
  contratadoPorTipo: Record<string, number>;
  pagoPorFonte: Record<string, number>;
  comVaquinha: number;
  vaquinhaTotal: number;
  vaquinhaMediana: number;
  doadoresMediana: number;
  doadoresDistintos: number;
  porRaca: Record<string, DespesaRaca>;
};

export const DESPESAS_2026: Record<
  "proporcional" | "majoritario",
  { FEMININO: DespesaGrupo; MASCULINO: DespesaGrupo }
> = {
  proporcional: {
    FEMININO: {
      candidaturas: 6953,
      contratadoTotal: 1165617710.81,
      contratadoPorTipo: {
        "Publicidade por materiais impressos": 217410579.84,
        "Atividades de militância e mobilização de rua": 191032563.08,
        "Serviços prestados por terceiros": 153971018.33,
        "Despesas com pessoal": 153786198.58,
        "Despesa com Impulsionamento de Conteúdos": 82643560.9,
        "Serviços advocatícios": 60272530.51,
        "Publicidade por adesivos": 54131482.7,
        "Cessão ou locação de veículos": 44960361.47,
        "Serviços contábeis": 37280949.55,
        "Diversas a especificar": 34396101.06,
      },
      pagoPorFonte: {
        "Fundo Especial de Financiamento de Campanha": 758653974.41,
        "Outros Recursos": 68671123.19,
        "Fundo Partidário": 53694408.09,
      },
      comVaquinha: 504,
      vaquinhaTotal: 3054009.83,
      vaquinhaMediana: 2026.57,
      doadoresMediana: 17.5,
      doadoresDistintos: 29661,
      porRaca: {
        BRANCA: {
          candidaturas: 3254,
          pagoPorFonte: {
            "Fundo Especial de Financiamento de Campanha": 440829179.84,
            "Outros Recursos": 50303743.27,
            "Fundo Partidário": 33041491.87,
          },
          comVaquinha: 297,
          vaquinhaTotal: 1916559.81,
          vaquinhaMediana: 2053.0,
          doadoresMediana: 18,
        },
        PARDA: {
          candidaturas: 2379,
          pagoPorFonte: {
            "Fundo Especial de Financiamento de Campanha": 197331638.47,
            "Fundo Partidário": 14785676.58,
            "Outros Recursos": 13634421.42,
          },
          comVaquinha: 90,
          vaquinhaTotal: 329582.07,
          vaquinhaMediana: 1277.5,
          doadoresMediana: 11.5,
        },
        PRETA: {
          candidaturas: 1197,
          pagoPorFonte: {
            "Fundo Especial de Financiamento de Campanha": 107705937.53,
            "Fundo Partidário": 5740317.45,
            "Outros Recursos": 4200563.68,
          },
          comVaquinha: 94,
          vaquinhaTotal: 689582.22,
          vaquinhaMediana: 2500.5,
          doadoresMediana: 21.0,
        },
        INDÍGENA: {
          candidaturas: 82,
          pagoPorFonte: {
            "Fundo Especial de Financiamento de Campanha": 8207042.09,
            "Outros Recursos": 273615.04,
            "Fundo Partidário": 88146.32,
          },
          comVaquinha: 18,
          vaquinhaTotal: 76440.73,
          vaquinhaMediana: 2802.5,
          doadoresMediana: 19.0,
        },
        AMARELA: {
          candidaturas: 41,
          pagoPorFonte: {
            "Outros Recursos": 258779.78,
            "Fundo Especial de Financiamento de Campanha": 4580176.48,
            "Fundo Partidário": 38775.87,
          },
          comVaquinha: 5,
          vaquinhaTotal: 41845.0,
          vaquinhaMediana: 770.0,
          doadoresMediana: 11,
        },
      },
    },
    MASCULINO: {
      candidaturas: 12578,
      contratadoTotal: 2560596623.22,
      contratadoPorTipo: {
        "Publicidade por materiais impressos": 546000326.33,
        "Atividades de militância e mobilização de rua": 371078410.98,
        "Despesas com pessoal": 317850006.06,
        "Serviços prestados por terceiros": 255046440.02,
        "Despesa com Impulsionamento de Conteúdos": 241795766.44,
        "Publicidade por adesivos": 153775214.18,
        "Serviços advocatícios": 109006393.92,
        "Cessão ou locação de veículos": 97321466.17,
        "Serviços contábeis": 70977680.15,
        "Produção de programas de rádio, televisão ou vídeo": 53232950.53,
      },
      pagoPorFonte: {
        "Fundo Especial de Financiamento de Campanha": 1464003699.13,
        "Outros Recursos": 396703024.82,
        "Fundo Partidário": 131309820.57,
      },
      comVaquinha: 846,
      vaquinhaTotal: 9695862.63,
      vaquinhaMediana: 2203.51,
      doadoresMediana: 17.0,
      doadoresDistintos: 88396,
      porRaca: {
        BRANCA: {
          candidaturas: 6472,
          pagoPorFonte: {
            "Fundo Especial de Financiamento de Campanha": 961696971.22,
            "Outros Recursos": 298678493.68,
            "Fundo Partidário": 96084588.36,
          },
          comVaquinha: 557,
          vaquinhaTotal: 6965955.68,
          vaquinhaMediana: 3099.0,
          doadoresMediana: 19,
        },
        PARDA: {
          candidaturas: 4479,
          pagoPorFonte: {
            "Fundo Partidário": 24410669.49,
            "Fundo Especial de Financiamento de Campanha": 403690349.61,
            "Outros Recursos": 79673273.99,
          },
          comVaquinha: 194,
          vaquinhaTotal: 941229.98,
          vaquinhaMediana: 1245.0,
          doadoresMediana: 13.5,
        },
        PRETA: {
          candidaturas: 1469,
          pagoPorFonte: {
            "Fundo Especial de Financiamento de Campanha": 88246061.58,
            "Outros Recursos": 15611158.03,
            "Fundo Partidário": 8963007.35,
          },
          comVaquinha: 80,
          vaquinhaTotal: 1180071.38,
          vaquinhaMediana: 1202.5,
          doadoresMediana: 11.5,
        },
        INDÍGENA: {
          candidaturas: 98,
          pagoPorFonte: {
            "Fundo Especial de Financiamento de Campanha": 6906282.61,
            "Outros Recursos": 659478.74,
          },
          comVaquinha: 6,
          vaquinhaTotal: 45369.74,
          vaquinhaMediana: 2041.66,
          doadoresMediana: 14.0,
        },
        AMARELA: {
          candidaturas: 60,
          pagoPorFonte: {
            "Outros Recursos": 2080620.38,
            "Fundo Especial de Financiamento de Campanha": 3464034.11,
            "Fundo Partidário": 1851555.37,
          },
          comVaquinha: 9,
          vaquinhaTotal: 563235.85,
          vaquinhaMediana: 7490.0,
          doadoresMediana: 26,
        },
      },
    },
  },
  majoritario: {
    FEMININO: {
      candidaturas: 107,
      contratadoTotal: 165456032.45,
      contratadoPorTipo: {
        "Serviços prestados por terceiros": 43153236.1,
        "Despesa com Impulsionamento de Conteúdos": 20927446.34,
        "Publicidade por materiais impressos": 20281271.05,
        "Atividades de militância e mobilização de rua": 17789979.63,
        "Produção de programas de rádio, televisão ou vídeo": 16330930.45,
        "Serviços advocatícios": 9482411.01,
        "Publicidade por adesivos": 6772113.21,
        "Despesas com pessoal": 5850332.52,
        "Serviços contábeis": 4250350.5,
        "Cessão ou locação de veículos": 3921971.92,
      },
      pagoPorFonte: {
        "Fundo Especial de Financiamento de Campanha": 117204592.96,
        "Outros Recursos": 7108103.11,
        "Fundo Partidário": 6046254.48,
      },
      comVaquinha: 24,
      vaquinhaTotal: 588713.91,
      vaquinhaMediana: 6564.5,
      doadoresMediana: 85.5,
      doadoresDistintos: 6427,
      porRaca: {
        BRANCA: {
          candidaturas: 65,
          pagoPorFonte: {
            "Fundo Especial de Financiamento de Campanha": 89976687.4,
            "Outros Recursos": 6091050.38,
            "Fundo Partidário": 5564157.25,
          },
          comVaquinha: 13,
          vaquinhaTotal: 170806.19,
          vaquinhaMediana: 7915.0,
          doadoresMediana: 74,
        },
        PARDA: {
          candidaturas: 24,
          pagoPorFonte: {
            "Outros Recursos": 532167.78,
            "Fundo Especial de Financiamento de Campanha": 16263186.05,
          },
          comVaquinha: 5,
          vaquinhaTotal: 43592.72,
          vaquinhaMediana: 5605.0,
          doadoresMediana: 13,
        },
        PRETA: {
          candidaturas: 17,
          pagoPorFonte: {
            "Fundo Especial de Financiamento de Campanha": 10946519.0,
            "Outros Recursos": 471090.38,
            "Fundo Partidário": 482097.23,
          },
          comVaquinha: 5,
          vaquinhaTotal: 368355.0,
          vaquinhaMediana: 15359.0,
          doadoresMediana: 214,
        },
        INDÍGENA: {
          candidaturas: 0,
          pagoPorFonte: {},
          comVaquinha: 0,
          vaquinhaTotal: 0,
          vaquinhaMediana: 0,
          doadoresMediana: 0,
        },
        AMARELA: {
          candidaturas: 1,
          pagoPorFonte: {
            "Outros Recursos": 13794.57,
            "Fundo Especial de Financiamento de Campanha": 18200.51,
          },
          comVaquinha: 1,
          vaquinhaTotal: 5960.0,
          vaquinhaMediana: 5960.0,
          doadoresMediana: 97,
        },
      },
    },
    MASCULINO: {
      candidaturas: 426,
      contratadoTotal: 982250064.89,
      contratadoPorTipo: {
        "Serviços prestados por terceiros": 278805125.1,
        "Produção de programas de rádio, televisão ou vídeo": 133505309.78,
        "Despesa com Impulsionamento de Conteúdos": 112496563.0,
        "Publicidade por materiais impressos": 83890213.09,
        "Serviços advocatícios": 69442837.28,
        "Atividades de militância e mobilização de rua": 49343313.69,
        "Publicidade por adesivos": 44851990.87,
        "Despesas com transporte ou deslocamento": 35904827.51,
        "Despesas com pessoal": 32633866.97,
        "Serviços contábeis": 23396104.0,
      },
      pagoPorFonte: {
        "Fundo Especial de Financiamento de Campanha": 558993896.86,
        "Outros Recursos": 158612458.34,
        "Fundo Partidário": 57825717.43,
      },
      comVaquinha: 62,
      vaquinhaTotal: 6526605.48,
      vaquinhaMediana: 6262.0,
      doadoresMediana: 43.5,
      doadoresDistintos: 79284,
      porRaca: {
        BRANCA: {
          candidaturas: 256,
          pagoPorFonte: {
            "Fundo Especial de Financiamento de Campanha": 467077788.81,
            "Outros Recursos": 136385431.54,
            "Fundo Partidário": 51223365.71,
          },
          comVaquinha: 41,
          vaquinhaTotal: 6345749.09,
          vaquinhaMediana: 6409.0,
          doadoresMediana: 44,
        },
        PARDA: {
          candidaturas: 120,
          pagoPorFonte: {
            "Fundo Especial de Financiamento de Campanha": 74594376.02,
            "Outros Recursos": 21962773.27,
            "Fundo Partidário": 4341783.47,
          },
          comVaquinha: 12,
          vaquinhaTotal: 120859.39,
          vaquinhaMediana: 7852.0,
          doadoresMediana: 64.0,
        },
        PRETA: {
          candidaturas: 40,
          pagoPorFonte: {
            "Fundo Especial de Financiamento de Campanha": 10831855.1,
            "Outros Recursos": 155173.67,
            "Fundo Partidário": 2210568.25,
          },
          comVaquinha: 8,
          vaquinhaTotal: 56882.0,
          vaquinhaMediana: 5198.5,
          doadoresMediana: 28.5,
        },
        INDÍGENA: {
          candidaturas: 7,
          pagoPorFonte: {
            "Fundo Especial de Financiamento de Campanha": 6489876.93,
            "Outros Recursos": 20000.5,
            "Fundo Partidário": 50000.0,
          },
          comVaquinha: 0,
          vaquinhaTotal: 0,
          vaquinhaMediana: 0,
          doadoresMediana: 0,
        },
        AMARELA: {
          candidaturas: 3,
          pagoPorFonte: { "Outros Recursos": 89079.36 },
          comVaquinha: 1,
          vaquinhaTotal: 3115.0,
          vaquinhaMediana: 3115.0,
          doadoresMediana: 24,
        },
      },
    },
  },
};
