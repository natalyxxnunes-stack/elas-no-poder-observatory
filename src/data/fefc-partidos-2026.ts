/**
 * fefc-partidos-2026 — Fundo Especial de Financiamento de Campanha (FEFC)
 * recebido pelas candidaturas de cada partido em 2026, por gênero e cor/raça.
 * CRAVADO em código.
 *
 * Recontagem de receitas_candidatos_2026_BRASIL.csv (base do TSE de
 * 04/11/2026 04:05:12, prestação final do 1º turno, SHA-256
 * 8695ae1e66a5d4f60bb26ecac5cee70ff4c2a892f19b7292026c13cc6c378e27; anterior: 27/10/2026, 4f149814…),
 * linhas com DS_FONTE_RECEITA = "FUNDO ESPECIAL", cruzadas por SQ_CANDIDATO
 * com consulta_cand_2026_BRASIL.csv de 27/10/2026 19:30:36. Script:
 * scripts/recontagem/fefc_partidos_2026.py.
 *
 * Universo da tabela: candidaturas a deputado federal, estadual e distrital
 * (script com o argumento "proporcional"). Nesse universo não há vice nem
 * suplente, e a conta não depende de como o dinheiro de uma chapa de governo
 * ou Senado com vice ou suplente mulher é atribuído, ponto em que partidos e
 * procuradorias eleitorais divergem. O total de todas as candidaturas
 * titulares fica em FEFC_TOTAL_TITULARES, para a comparação no texto.
 * A soma pretas + pardas aparece em campo próprio, declarada, porque a regra
 * legal de distribuição do fundo usa "candidaturas negras"; as duas categorias
 * aparecem sempre separadas ao lado dela.
 *
 * Não é verificação de cumprimento da lei: mede o fundo que chegou às
 * candidaturas (o partido pode ter gasto parte de outra forma), 343
 * candidaturas ainda constam com prestação parcial e a regra do TSE usa outro
 * universo (20.560 candidaturas com pedido aceito até 18/08/2026).
 */

export type FefcGrupo = { candidaturas: number; fefc: number };
export type FefcPartido = {
  candidaturas: number;
  /** candidaturas que receberam algum FEFC */
  comFefc: number;
  fefc: number;
  mulheres: FefcGrupo;
  raca: Record<string, FefcGrupo>;
  mulheresRaca: Record<string, FefcGrupo>;
  pretasPardasSoma: FefcGrupo;
};

export const FEFC_META = {
  baseGeneratedAt: "04/11/2026",
  csvSha256: "8695ae1e66a5d4f60bb26ecac5cee70ff4c2a892f19b7292026c13cc6c378e27",
  proximaAtualizacao: "prestação de contas do 2º turno, em novembro de 2026",
} as const;

export const FEFC_TOTAL: FefcPartido = {
  candidaturas: 19531,
  comFefc: 14293,
  fefc: 3985816377.72,
  mulheres: { candidaturas: 6953, fefc: 1487641408.2 },
  raca: {
    BRANCA: { candidaturas: 9726, fefc: 2421658744.66 },
    PARDA: { candidaturas: 6858, fefc: 1129134044.29 },
    PRETA: { candidaturas: 2666, fefc: 380003470.66 },
    INDÍGENA: { candidaturas: 180, fefc: 39875963.33 },
    AMARELA: { candidaturas: 101, fefc: 15144154.78 },
  },
  mulheresRaca: {
    BRANCA: { candidaturas: 3254, fefc: 817310878.16 },
    PARDA: { candidaturas: 2379, fefc: 415813233.24 },
    PRETA: { candidaturas: 1197, fefc: 221514504.54 },
    INDÍGENA: { candidaturas: 82, fefc: 26123712.97 },
    AMARELA: { candidaturas: 41, fefc: 6879079.29 },
  },
  pretasPardasSoma: { candidaturas: 9524, fefc: 1509137514.95 },
};

export const FEFC_PARTIDOS: Record<string, FefcPartido> = {
  PL: {
    candidaturas: 1530,
    comFefc: 1397,
    fefc: 665926294.79,
    mulheres: { candidaturas: 524, fefc: 211838755.96 },
    raca: {
      BRANCA: { candidaturas: 938, fefc: 481158283.56 },
      PARDA: { candidaturas: 471, fefc: 152633557.89 },
      PRETA: { candidaturas: 101, fefc: 24896356.08 },
      INDÍGENA: { candidaturas: 8, fefc: 2001227.27 },
      AMARELA: { candidaturas: 12, fefc: 5236869.99 },
    },
    mulheresRaca: {
      BRANCA: { candidaturas: 303, fefc: 157541598.81 },
      PARDA: { candidaturas: 166, fefc: 38084731.16 },
      PRETA: { candidaturas: 44, fefc: 10654698.73 },
      INDÍGENA: { candidaturas: 4, fefc: 1752727.27 },
      AMARELA: { candidaturas: 7, fefc: 3804999.99 },
    },
    pretasPardasSoma: { candidaturas: 572, fefc: 177529913.97 },
  },
  UNIÃO: {
    candidaturas: 809,
    comFefc: 724,
    fefc: 473988251.43,
    mulheres: { candidaturas: 308, fefc: 190950170.8 },
    raca: {
      BRANCA: { candidaturas: 399, fefc: 244617235.61 },
      PARDA: { candidaturas: 335, fefc: 188056568.73 },
      PRETA: { candidaturas: 74, fefc: 41072192.42 },
      INDÍGENA: { candidaturas: 0, fefc: 0.0 },
      AMARELA: { candidaturas: 1, fefc: 242254.67 },
    },
    mulheresRaca: {
      BRANCA: { candidaturas: 137, fefc: 82331114.21 },
      PARDA: { candidaturas: 130, fefc: 84091398.18 },
      PRETA: { candidaturas: 40, fefc: 24285403.74 },
      INDÍGENA: { candidaturas: 0, fefc: 0.0 },
      AMARELA: { candidaturas: 1, fefc: 242254.67 },
    },
    pretasPardasSoma: { candidaturas: 409, fefc: 229128761.15 },
  },
  PT: {
    candidaturas: 1035,
    comFefc: 959,
    fefc: 388957366.2,
    mulheres: { candidaturas: 386, fefc: 202505386.89 },
    raca: {
      BRANCA: { candidaturas: 479, fefc: 211966021.52 },
      PARDA: { candidaturas: 285, fefc: 67310104.75 },
      PRETA: { candidaturas: 228, fefc: 93552004.43 },
      INDÍGENA: { candidaturas: 37, fefc: 15161989.55 },
      AMARELA: { candidaturas: 6, fefc: 967245.95 },
    },
    mulheresRaca: {
      BRANCA: { candidaturas: 154, fefc: 86799109.38 },
      PARDA: { candidaturas: 88, fefc: 33082109.58 },
      PRETA: { candidaturas: 127, fefc: 71818913.91 },
      INDÍGENA: { candidaturas: 16, fefc: 10177214.02 },
      AMARELA: { candidaturas: 1, fefc: 628040.0 },
    },
    pretasPardasSoma: { candidaturas: 513, fefc: 160862109.18 },
  },
  PP: {
    candidaturas: 673,
    comFefc: 597,
    fefc: 373407441.02,
    mulheres: { candidaturas: 242, fefc: 128034592.48 },
    raca: {
      BRANCA: { candidaturas: 399, fefc: 237599950.6 },
      PARDA: { candidaturas: 207, fefc: 110877706.01 },
      PRETA: { candidaturas: 60, fefc: 19841172.81 },
      INDÍGENA: { candidaturas: 3, fefc: 1411250.0 },
      AMARELA: { candidaturas: 4, fefc: 3677361.6 },
    },
    mulheresRaca: {
      BRANCA: { candidaturas: 133, fefc: 76959464.12 },
      PARDA: { candidaturas: 82, fefc: 35448024.07 },
      PRETA: { candidaturas: 25, fefc: 14827104.29 },
      INDÍGENA: { candidaturas: 2, fefc: 800000.0 },
      AMARELA: { candidaturas: 0, fefc: 0.0 },
    },
    pretasPardasSoma: { candidaturas: 267, fefc: 130718878.82 },
  },
  PSD: {
    candidaturas: 1061,
    comFefc: 892,
    fefc: 324311405.89,
    mulheres: { candidaturas: 374, fefc: 113013605.38 },
    raca: {
      BRANCA: { candidaturas: 588, fefc: 208002239.99 },
      PARDA: { candidaturas: 351, fefc: 88250642.15 },
      PRETA: { candidaturas: 112, fefc: 24772988.46 },
      INDÍGENA: { candidaturas: 7, fefc: 2657435.29 },
      AMARELA: { candidaturas: 3, fefc: 628100.0 },
    },
    mulheresRaca: {
      BRANCA: { candidaturas: 197, fefc: 69760695.17 },
      PARDA: { candidaturas: 122, fefc: 32335285.65 },
      PRETA: { candidaturas: 48, fefc: 8936085.09 },
      INDÍGENA: { candidaturas: 5, fefc: 1881439.47 },
      AMARELA: { candidaturas: 2, fefc: 100100.0 },
    },
    pretasPardasSoma: { candidaturas: 463, fefc: 113023630.61 },
  },
  MDB: {
    candidaturas: 1338,
    comFefc: 1064,
    fefc: 312843666.39,
    mulheres: { candidaturas: 482, fefc: 109999181.93 },
    raca: {
      BRANCA: { candidaturas: 736, fefc: 203006438.21 },
      PARDA: { candidaturas: 431, fefc: 87928704.97 },
      PRETA: { candidaturas: 153, fefc: 17222780.03 },
      INDÍGENA: { candidaturas: 13, fefc: 4638847.08 },
      AMARELA: { candidaturas: 5, fefc: 46896.1 },
    },
    mulheresRaca: {
      BRANCA: { candidaturas: 238, fefc: 65024616.15 },
      PARDA: { candidaturas: 159, fefc: 32574218.04 },
      PRETA: { candidaturas: 76, fefc: 8727055.54 },
      INDÍGENA: { candidaturas: 7, fefc: 3630292.2 },
      AMARELA: { candidaturas: 2, fefc: 43000.0 },
    },
    pretasPardasSoma: { candidaturas: 584, fefc: 105151485.0 },
  },
  REPUBLICANOS: {
    candidaturas: 1254,
    comFefc: 990,
    fefc: 305430307.57,
    mulheres: { candidaturas: 424, fefc: 108033035.6 },
    raca: {
      BRANCA: { candidaturas: 648, fefc: 170681505.02 },
      PARDA: { candidaturas: 473, fefc: 108675552.98 },
      PRETA: { candidaturas: 129, fefc: 25484520.57 },
      INDÍGENA: { candidaturas: 1, fefc: 335000.0 },
      AMARELA: { candidaturas: 3, fefc: 253729.0 },
    },
    mulheresRaca: {
      BRANCA: { candidaturas: 212, fefc: 62590630.62 },
      PARDA: { candidaturas: 159, fefc: 35701752.52 },
      PRETA: { candidaturas: 53, fefc: 9740652.46 },
      INDÍGENA: { candidaturas: 0, fefc: 0.0 },
      AMARELA: { candidaturas: 0, fefc: 0.0 },
    },
    pretasPardasSoma: { candidaturas: 602, fefc: 134160073.55 },
  },
  PODE: {
    candidaturas: 1201,
    comFefc: 962,
    fefc: 221652913.36,
    mulheres: { candidaturas: 418, fefc: 75824693.07 },
    raca: {
      BRANCA: { candidaturas: 625, fefc: 142004808.27 },
      PARDA: { candidaturas: 428, fefc: 61468703.21 },
      PRETA: { candidaturas: 139, fefc: 16788911.28 },
      INDÍGENA: { candidaturas: 1, fefc: 499997.0 },
      AMARELA: { candidaturas: 8, fefc: 890493.6 },
    },
    mulheresRaca: {
      BRANCA: { candidaturas: 205, fefc: 42155675.43 },
      PARDA: { candidaturas: 148, fefc: 27580626.19 },
      PRETA: { candidaturas: 60, fefc: 5308391.45 },
      INDÍGENA: { candidaturas: 0, fefc: 0.0 },
      AMARELA: { candidaturas: 5, fefc: 780000.0 },
    },
    pretasPardasSoma: { candidaturas: 567, fefc: 78257614.49 },
  },
  PSB: {
    candidaturas: 926,
    comFefc: 818,
    fefc: 136573415.01,
    mulheres: { candidaturas: 328, fefc: 46644509.02 },
    raca: {
      BRANCA: { candidaturas: 451, fefc: 85125377.4 },
      PARDA: { candidaturas: 296, fefc: 38227154.48 },
      PRETA: { candidaturas: 165, fefc: 12471757.08 },
      INDÍGENA: { candidaturas: 9, fefc: 428715.11 },
      AMARELA: { candidaturas: 5, fefc: 320410.94 },
    },
    mulheresRaca: {
      BRANCA: { candidaturas: 140, fefc: 26370342.21 },
      PARDA: { candidaturas: 106, fefc: 13890541.06 },
      PRETA: { candidaturas: 76, fefc: 5927698.16 },
      INDÍGENA: { candidaturas: 4, fefc: 263927.59 },
      AMARELA: { candidaturas: 2, fefc: 192000.0 },
    },
    pretasPardasSoma: { candidaturas: 461, fefc: 50698911.56 },
  },
  PDT: {
    candidaturas: 1084,
    comFefc: 837,
    fefc: 121639817.25,
    mulheres: { candidaturas: 386, fefc: 36903668.41 },
    raca: {
      BRANCA: { candidaturas: 462, fefc: 69624938.13 },
      PARDA: { candidaturas: 402, fefc: 37994264.81 },
      PRETA: { candidaturas: 194, fefc: 10800614.31 },
      INDÍGENA: { candidaturas: 18, fefc: 2890000.0 },
      AMARELA: { candidaturas: 8, fefc: 330000.0 },
    },
    mulheresRaca: {
      BRANCA: { candidaturas: 157, fefc: 16439457.66 },
      PARDA: { candidaturas: 130, fefc: 14201612.66 },
      PRETA: { candidaturas: 92, fefc: 5269598.09 },
      INDÍGENA: { candidaturas: 6, fefc: 993000.0 },
      AMARELA: { candidaturas: 1, fefc: 0.0 },
    },
    pretasPardasSoma: { candidaturas: 596, fefc: 48794879.12 },
  },
  PSDB: {
    candidaturas: 1042,
    comFefc: 654,
    fefc: 118341046.57,
    mulheres: { candidaturas: 372, fefc: 45232303.81 },
    raca: {
      BRANCA: { candidaturas: 541, fefc: 72752840.67 },
      PARDA: { candidaturas: 373, fefc: 38275578.8 },
      PRETA: { candidaturas: 117, fefc: 6982212.2 },
      INDÍGENA: { candidaturas: 4, fefc: 179148.94 },
      AMARELA: { candidaturas: 7, fefc: 151265.96 },
    },
    mulheresRaca: {
      BRANCA: { candidaturas: 164, fefc: 22992717.93 },
      PARDA: { candidaturas: 145, fefc: 18227744.7 },
      PRETA: { candidaturas: 57, fefc: 3786426.28 },
      INDÍGENA: { candidaturas: 3, fefc: 99148.94 },
      AMARELA: { candidaturas: 3, fefc: 126265.96 },
    },
    pretasPardasSoma: { candidaturas: 490, fefc: 45257791.0 },
  },
  PSOL: {
    candidaturas: 714,
    comFefc: 678,
    fefc: 115891675.71,
    mulheres: { candidaturas: 281, fefc: 62092684.7 },
    raca: {
      BRANCA: { candidaturas: 259, fefc: 55357828.94 },
      PARDA: { candidaturas: 213, fefc: 14259113.79 },
      PRETA: { candidaturas: 218, fefc: 39014429.56 },
      INDÍGENA: { candidaturas: 18, fefc: 6255757.01 },
      AMARELA: { candidaturas: 6, fefc: 1004546.41 },
    },
    mulheresRaca: {
      BRANCA: { candidaturas: 94, fefc: 24491533.59 },
      PARDA: { candidaturas: 70, fefc: 4225853.56 },
      PRETA: { candidaturas: 103, fefc: 26789511.43 },
      INDÍGENA: { candidaturas: 12, fefc: 5729388.24 },
      AMARELA: { candidaturas: 2, fefc: 856397.88 },
    },
    pretasPardasSoma: { candidaturas: 431, fefc: 53273543.35 },
  },
  SOLIDARIEDADE: {
    candidaturas: 521,
    comFefc: 386,
    fefc: 86133297.58,
    mulheres: { candidaturas: 186, fefc: 25297489.75 },
    raca: {
      BRANCA: { candidaturas: 207, fefc: 49437308.78 },
      PARDA: { candidaturas: 234, fefc: 28988949.37 },
      PRETA: { candidaturas: 75, fefc: 7362355.25 },
      INDÍGENA: { candidaturas: 2, fefc: 333755.0 },
      AMARELA: { candidaturas: 3, fefc: 10929.18 },
    },
    mulheresRaca: {
      BRANCA: { candidaturas: 75, fefc: 16207545.29 },
      PARDA: { candidaturas: 81, fefc: 5653090.59 },
      PRETA: { candidaturas: 27, fefc: 3425924.69 },
      INDÍGENA: { candidaturas: 0, fefc: 0.0 },
      AMARELA: { candidaturas: 3, fefc: 10929.18 },
    },
    pretasPardasSoma: { candidaturas: 309, fefc: 36351304.62 },
  },
  PRD: {
    candidaturas: 493,
    comFefc: 311,
    fefc: 67041194.49,
    mulheres: { candidaturas: 184, fefc: 22642755.22 },
    raca: {
      BRANCA: { candidaturas: 246, fefc: 39652631.01 },
      PARDA: { candidaturas: 196, fefc: 23131677.4 },
      PRETA: { candidaturas: 49, fefc: 4156886.08 },
      INDÍGENA: { candidaturas: 0, fefc: 0.0 },
      AMARELA: { candidaturas: 2, fefc: 100000.0 },
    },
    mulheresRaca: {
      BRANCA: { candidaturas: 91, fefc: 13384367.92 },
      PARDA: { candidaturas: 71, fefc: 7589251.55 },
      PRETA: { candidaturas: 21, fefc: 1669135.75 },
      INDÍGENA: { candidaturas: 0, fefc: 0.0 },
      AMARELA: { candidaturas: 1, fefc: 0.0 },
    },
    pretasPardasSoma: { candidaturas: 245, fefc: 27288563.48 },
  },
  PCDOB: {
    candidaturas: 146,
    comFefc: 128,
    fefc: 62345141.49,
    mulheres: { candidaturas: 65, fefc: 27675861.63 },
    raca: {
      BRANCA: { candidaturas: 62, fefc: 31870422.73 },
      PARDA: { candidaturas: 43, fefc: 16336357.27 },
      PRETA: { candidaturas: 41, fefc: 14138361.49 },
      INDÍGENA: { candidaturas: 0, fefc: 0.0 },
      AMARELA: { candidaturas: 0, fefc: 0.0 },
    },
    mulheresRaca: {
      BRANCA: { candidaturas: 25, fefc: 10923505.14 },
      PARDA: { candidaturas: 14, fefc: 6563560.0 },
      PRETA: { candidaturas: 26, fefc: 10188796.49 },
      INDÍGENA: { candidaturas: 0, fefc: 0.0 },
      AMARELA: { candidaturas: 0, fefc: 0.0 },
    },
    pretasPardasSoma: { candidaturas: 84, fefc: 30474718.76 },
  },
  AVANTE: {
    candidaturas: 945,
    comFefc: 525,
    fefc: 60926959.43,
    mulheres: { candidaturas: 318, fefc: 19907848.48 },
    raca: {
      BRANCA: { candidaturas: 385, fefc: 25305600.79 },
      PARDA: { candidaturas: 403, fefc: 24803739.14 },
      PRETA: { candidaturas: 154, fefc: 9587963.0 },
      INDÍGENA: { candidaturas: 1, fefc: 74641.5 },
      AMARELA: { candidaturas: 2, fefc: 1155015.0 },
    },
    mulheresRaca: {
      BRANCA: { candidaturas: 116, fefc: 7950762.66 },
      PARDA: { candidaturas: 135, fefc: 8685112.07 },
      PRETA: { candidaturas: 65, fefc: 3197332.25 },
      INDÍGENA: { candidaturas: 1, fefc: 74641.5 },
      AMARELA: { candidaturas: 1, fefc: 0.0 },
    },
    pretasPardasSoma: { candidaturas: 557, fefc: 34391702.14 },
  },
  PV: {
    candidaturas: 226,
    comFefc: 175,
    fefc: 44821692.87,
    mulheres: { candidaturas: 92, fefc: 18942803.24 },
    raca: {
      BRANCA: { candidaturas: 103, fefc: 28641568.81 },
      PARDA: { candidaturas: 84, fefc: 13644806.12 },
      PRETA: { candidaturas: 35, fefc: 1751746.52 },
      INDÍGENA: { candidaturas: 4, fefc: 783571.42 },
      AMARELA: { candidaturas: 0, fefc: 0.0 },
    },
    mulheresRaca: {
      BRANCA: { candidaturas: 40, fefc: 11024740.43 },
      PARDA: { candidaturas: 38, fefc: 6756728.81 },
      PRETA: { candidaturas: 14, fefc: 1161334.0 },
      INDÍGENA: { candidaturas: 0, fefc: 0.0 },
      AMARELA: { candidaturas: 0, fefc: 0.0 },
    },
    pretasPardasSoma: { candidaturas: 119, fefc: 15396552.64 },
  },
  CIDADANIA: {
    candidaturas: 148,
    comFefc: 124,
    fefc: 35421040.22,
    mulheres: { candidaturas: 65, fefc: 16348623.34 },
    raca: {
      BRANCA: { candidaturas: 69, fefc: 23037771.79 },
      PARDA: { candidaturas: 60, fefc: 9469276.2 },
      PRETA: { candidaturas: 19, fefc: 2913992.23 },
      INDÍGENA: { candidaturas: 0, fefc: 0.0 },
      AMARELA: { candidaturas: 0, fefc: 0.0 },
    },
    mulheresRaca: {
      BRANCA: { candidaturas: 35, fefc: 10534373.43 },
      PARDA: { candidaturas: 23, fefc: 3684316.04 },
      PRETA: { candidaturas: 7, fefc: 2129933.87 },
      INDÍGENA: { candidaturas: 0, fefc: 0.0 },
      AMARELA: { candidaturas: 0, fefc: 0.0 },
    },
    pretasPardasSoma: { candidaturas: 79, fefc: 12383268.43 },
  },
  NOVO: {
    candidaturas: 1247,
    comFefc: 783,
    fefc: 33048050.63,
    mulheres: { candidaturas: 415, fefc: 10829548.12 },
    raca: {
      BRANCA: { candidaturas: 693, fefc: 24404022.76 },
      PARDA: { candidaturas: 435, fefc: 6121134.66 },
      PRETA: { candidaturas: 103, fefc: 2400298.0 },
      INDÍGENA: { candidaturas: 9, fefc: 91500.0 },
      AMARELA: { candidaturas: 7, fefc: 31095.21 },
    },
    mulheresRaca: {
      BRANCA: { candidaturas: 238, fefc: 8154851.75 },
      PARDA: { candidaturas: 129, fefc: 1251886.06 },
      PRETA: { candidaturas: 42, fefc: 1392810.31 },
      INDÍGENA: { candidaturas: 4, fefc: 25500.0 },
      AMARELA: { candidaturas: 2, fefc: 4500.0 },
    },
    pretasPardasSoma: { candidaturas: 538, fefc: 8521432.66 },
  },
  REDE: {
    candidaturas: 334,
    comFefc: 294,
    fefc: 26896853.09,
    mulheres: { candidaturas: 127, fefc: 10356168.53 },
    raca: {
      BRANCA: { candidaturas: 111, fefc: 13289919.68 },
      PARDA: { candidaturas: 131, fefc: 8397975.18 },
      PRETA: { candidaturas: 76, fefc: 3132417.87 },
      INDÍGENA: { candidaturas: 15, fefc: 2021354.88 },
      AMARELA: { candidaturas: 1, fefc: 55185.48 },
    },
    mulheresRaca: {
      BRANCA: { candidaturas: 41, fefc: 3582547.43 },
      PARDA: { candidaturas: 47, fefc: 4590738.68 },
      PRETA: { candidaturas: 31, fefc: 1472954.62 },
      INDÍGENA: { candidaturas: 7, fefc: 654742.32 },
      AMARELA: { candidaturas: 1, fefc: 55185.48 },
    },
    pretasPardasSoma: { candidaturas: 207, fefc: 11530393.05 },
  },
  AGIR: {
    candidaturas: 432,
    comFefc: 129,
    fefc: 2375331.05,
    mulheres: { candidaturas: 144, fefc: 792662.42 },
    raca: {
      BRANCA: { candidaturas: 176, fefc: 793000.0 },
      PARDA: { candidaturas: 190, fefc: 1199956.25 },
      PRETA: { candidaturas: 57, fefc: 345893.5 },
      INDÍGENA: { candidaturas: 5, fefc: 36481.3 },
      AMARELA: { candidaturas: 4, fefc: 0.0 },
    },
    mulheresRaca: {
      BRANCA: { candidaturas: 54, fefc: 325000.0 },
      PARDA: { candidaturas: 63, fefc: 289000.0 },
      PRETA: { candidaturas: 26, fefc: 166502.0 },
      INDÍGENA: { candidaturas: 1, fefc: 12160.42 },
      AMARELA: { candidaturas: 0, fefc: 0.0 },
    },
    pretasPardasSoma: { candidaturas: 247, fefc: 1545849.75 },
  },
  MOBILIZA: {
    candidaturas: 558,
    comFefc: 151,
    fefc: 2340873.0,
    mulheres: { candidaturas: 184, fefc: 1264578.0 },
    raca: {
      BRANCA: { candidaturas: 209, fefc: 1032490.0 },
      PARDA: { candidaturas: 232, fefc: 917249.0 },
      PRETA: { candidaturas: 111, fefc: 371134.0 },
      INDÍGENA: { candidaturas: 4, fefc: 0.0 },
      AMARELA: { candidaturas: 2, fefc: 20000.0 },
    },
    mulheresRaca: {
      BRANCA: { candidaturas: 61, fefc: 486320.0 },
      PARDA: { candidaturas: 80, fefc: 614079.0 },
      PRETA: { candidaturas: 39, fefc: 144179.0 },
      INDÍGENA: { candidaturas: 2, fefc: 0.0 },
      AMARELA: { candidaturas: 2, fefc: 20000.0 },
    },
    pretasPardasSoma: { candidaturas: 343, fefc: 1288383.0 },
  },
  MISSÃO: {
    candidaturas: 509,
    comFefc: 453,
    fefc: 2325427.42,
    mulheres: { candidaturas: 180, fefc: 1172854.01 },
    raca: {
      BRANCA: { candidaturas: 310, fefc: 1449109.53 },
      PARDA: { candidaturas: 154, fefc: 672567.14 },
      PRETA: { candidaturas: 37, fefc: 172995.06 },
      INDÍGENA: { candidaturas: 1, fefc: 8000.0 },
      AMARELA: { candidaturas: 7, fefc: 22755.69 },
    },
    mulheresRaca: {
      BRANCA: { candidaturas: 121, fefc: 785262.02 },
      PARDA: { candidaturas: 45, fefc: 280035.96 },
      PRETA: { candidaturas: 12, fefc: 92149.9 },
      INDÍGENA: { candidaturas: 0, fefc: 0.0 },
      AMARELA: { candidaturas: 2, fefc: 15406.13 },
    },
    pretasPardasSoma: { candidaturas: 191, fefc: 845562.2 },
  },
  DC: {
    candidaturas: 697,
    comFefc: 95,
    fefc: 1708985.82,
    mulheres: { candidaturas: 229, fefc: 432341.9 },
    raca: {
      BRANCA: { candidaturas: 350, fefc: 165249.32 },
      PARDA: { candidaturas: 241, fefc: 1122890.16 },
      PRETA: { candidaturas: 91, fefc: 401013.36 },
      INDÍGENA: { candidaturas: 10, fefc: 19832.98 },
      AMARELA: { candidaturas: 5, fefc: 0.0 },
    },
    mulheresRaca: {
      BRANCA: { candidaturas: 114, fefc: 62277.41 },
      PARDA: { candidaturas: 83, fefc: 146635.11 },
      PRETA: { candidaturas: 27, fefc: 223429.38 },
      INDÍGENA: { candidaturas: 2, fefc: 0.0 },
      AMARELA: { candidaturas: 3, fefc: 0.0 },
    },
    pretasPardasSoma: { candidaturas: 332, fefc: 1523903.52 },
  },
  PSTU: {
    candidaturas: 44,
    comFefc: 36,
    fefc: 707305.0,
    mulheres: { candidaturas: 20, fefc: 475949.5 },
    raca: {
      BRANCA: { candidaturas: 23, fefc: 388577.0 },
      PARDA: { candidaturas: 9, fefc: 223893.0 },
      PRETA: { candidaturas: 12, fefc: 94835.0 },
      INDÍGENA: { candidaturas: 0, fefc: 0.0 },
      AMARELA: { candidaturas: 0, fefc: 0.0 },
    },
    mulheresRaca: {
      BRANCA: { candidaturas: 11, fefc: 273758.5 },
      PARDA: { candidaturas: 5, fefc: 179960.0 },
      PRETA: { candidaturas: 4, fefc: 22231.0 },
      INDÍGENA: { candidaturas: 0, fefc: 0.0 },
      AMARELA: { candidaturas: 0, fefc: 0.0 },
    },
    pretasPardasSoma: { candidaturas: 21, fefc: 318728.0 },
  },
  UP: {
    candidaturas: 83,
    comFefc: 63,
    fefc: 570565.8,
    mulheres: { candidaturas: 41, fefc: 309776.21 },
    raca: {
      BRANCA: { candidaturas: 33, fefc: 189040.12 },
      PARDA: { candidaturas: 21, fefc: 120074.04 },
      PRETA: { candidaturas: 28, fefc: 249848.64 },
      INDÍGENA: { candidaturas: 1, fefc: 11603.0 },
      AMARELA: { candidaturas: 0, fefc: 0.0 },
    },
    mulheresRaca: {
      BRANCA: { candidaturas: 15, fefc: 95449.41 },
      PARDA: { candidaturas: 10, fefc: 67133.0 },
      PRETA: { candidaturas: 15, fefc: 135590.8 },
      INDÍGENA: { candidaturas: 1, fefc: 11603.0 },
      AMARELA: { candidaturas: 0, fefc: 0.0 },
    },
    pretasPardasSoma: { candidaturas: 49, fefc: 369922.68 },
  },
  PCO: {
    candidaturas: 67,
    comFefc: 65,
    fefc: 186245.68,
    mulheres: { candidaturas: 31, fefc: 116559.8 },
    raca: {
      BRANCA: { candidaturas: 33, fefc: 104471.09 },
      PARDA: { candidaturas: 16, fefc: 25846.79 },
      PRETA: { candidaturas: 11, fefc: 20071.8 },
      INDÍGENA: { candidaturas: 7, fefc: 35856.0 },
      AMARELA: { candidaturas: 0, fefc: 0.0 },
    },
    mulheresRaca: {
      BRANCA: { candidaturas: 17, fefc: 63161.49 },
      PARDA: { candidaturas: 6, fefc: 17809.0 },
      PRETA: { candidaturas: 5, fefc: 17661.31 },
      INDÍGENA: { candidaturas: 3, fefc: 17928.0 },
      AMARELA: { candidaturas: 0, fefc: 0.0 },
    },
    pretasPardasSoma: { candidaturas: 27, fefc: 45918.59 },
  },
  DEMOCRATA: {
    candidaturas: 408,
    comFefc: 3,
    fefc: 3812.96,
    mulheres: { candidaturas: 145, fefc: 3000.0 },
    raca: {
      BRANCA: { candidaturas: 189, fefc: 93.33 },
      PARDA: { candidaturas: 143, fefc: 0.0 },
      PRETA: { candidaturas: 74, fefc: 3719.63 },
      INDÍGENA: { candidaturas: 2, fefc: 0.0 },
      AMARELA: { candidaturas: 0, fefc: 0.0 },
    },
    mulheresRaca: {
      BRANCA: { candidaturas: 65, fefc: 0.0 },
      PARDA: { candidaturas: 43, fefc: 0.0 },
      PRETA: { candidaturas: 35, fefc: 3000.0 },
      INDÍGENA: { candidaturas: 2, fefc: 0.0 },
      AMARELA: { candidaturas: 0, fefc: 0.0 },
    },
    pretasPardasSoma: { candidaturas: 217, fefc: 3719.63 },
  },
};

export const FEFC_PARTIDOS_SEM_FUNDO: readonly string[] = ["PCB"];

/** Todas as candidaturas titulares (deputado, governo, Senado e Presidência). */
export const FEFC_TOTAL_TITULARES: FefcPartido = {
  candidaturas: 20065,
  comFefc: 14697,
  fefc: 5026696331.42,
  mulheres: { candidaturas: 7060, fefc: 1671019115.48 },
  raca: {
    BRANCA: { candidaturas: 10047, fefc: 3285739613.72 },
    PARDA: { candidaturas: 7002, fefc: 1267303848.95 },
    PRETA: { candidaturas: 2723, fefc: 411385211.98 },
    INDÍGENA: { candidaturas: 187, fefc: 47103513.02 },
    AMARELA: { candidaturas: 105, fefc: 15164143.75 },
  },
  mulheresRaca: {
    BRANCA: { candidaturas: 3319, fefc: 964641245.46 },
    PARDA: { candidaturas: 2403, fefc: 438261994.79 },
    PRETA: { candidaturas: 1214, fefc: 235094882.46 },
    INDÍGENA: { candidaturas: 82, fefc: 26123712.97 },
    AMARELA: { candidaturas: 42, fefc: 6897279.8 },
  },
  pretasPardasSoma: { candidaturas: 9725, fefc: 1678689060.93 },
};
