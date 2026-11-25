/**
 * Recortes pós-auditoria independente, TSE 25/11/2026.
 * Extraídos do agregado recontagem-financeira.json, run 45705574795,
 * artifact 15064109761, SHA-256 ZIP f6188869f9bf325299a1559c1aad70c09e70ee7eb9ea66e4e58d0a2675d97998.
 * Valores declarados, não julgamento de contas. Ausência não equivale a zero.
 */
export const FINANCE_AUDIT_SOURCE = {
  receitas: "25/11/2026, 04h05min30s",
  candidaturas: "25/11/2026, 16h30min55s",
  csvSha256: "7cbbb11fb8004591e42ebb1ec1432585740c5b2436cd5f3ff65765e921247f29",
  run: 45705574795,
} as const;

export const FINANCE_AUDIT_TOTAL = {
  titulares: 20065, noArquivo: 19692, positivas: 17887, zeros: 1805, ausentes: 373,
  receitaBruta: 7026864553.75, repasses: 154258397.80, semRepasses: 6872606155.95,
  estimaveis: 357336951.88, financeiras: 6669527601.87,
  fefcBruto: 5035316334.04, fefcRepasses: 116980477.59, fefcPartidos: 4918335856.45,
  fefcEstimaveis: 103098965.02,
} as const;

export const FINANCE_AUDIT_UNIVERSES = {
  proporcional: {
    titulares: 19531, noArquivo: 19165, positivas: 17385, zeros: 1780, ausentes: 366,
    receitaBruta: 5543250248.58, repasses: 143738170.40, semRepasses: 5399512078.18,
    fefcBruto: 3991469172.38, fefcPartidos: 3882667958.34,
    mulheres: { titulares: 6953, noArquivo: 6845, positivas: 6300, zeros: 545, ausentes: 108, medianaArquivo: 64000, medianaPositivas: 79298.76, receitaBruta: 1821259985.61, fefcPartidos: 1459107812.53 },
    homens: { titulares: 12578, noArquivo: 12320, positivas: 11085, zeros: 1235, ausentes: 258, medianaArquivo: 57032.76, medianaPositivas: 82472, receitaBruta: 3721990262.97, fefcPartidos: 2423560145.81 },
  },
  majoritario: {
    titulares: 534, noArquivo: 527, positivas: 502, zeros: 25, ausentes: 7,
    receitaBruta: 1483614305.17, repasses: 10520227.40, semRepasses: 1473094077.77,
    fefcBruto: 1043847161.66, fefcPartidos: 1035667898.11,
    mulheres: { titulares: 107, noArquivo: 107, positivas: 104, zeros: 3, ausentes: 0, medianaArquivo: 207500, medianaPositivas: 312829.56, receitaBruta: 218609248.44, fefcPartidos: 182030538.47 },
    homens: { titulares: 426, noArquivo: 420, positivas: 398, zeros: 22, ausentes: 6, medianaArquivo: 418301.30, medianaPositivas: 669431.16, receitaBruta: 1265005056.73, fefcPartidos: 853637359.64 },
  },
} as const;

/** Mesma fotografia, população feminina proporcional; não usar como classificação individual. */
export const FINANCE_AUDIT_RACE = {
  BRANCA: { titulares: 3254, noArquivo: 3209, positivas: 2981, medianaArquivo: 83476.86, medianaPositivas: 101897 },
  PARDA: { titulares: 2380, noArquivo: 2334, positivas: 2128, medianaArquivo: 52033.44, medianaPositivas: 63805.43 },
  PRETA: { titulares: 1196, noArquivo: 1181, positivas: 1078, medianaArquivo: 52804, medianaPositivas: 64611.01 },
  "INDÍGENA": { titulares: 82, noArquivo: 81, positivas: 77, medianaArquivo: 113500, medianaPositivas: 122166.46 },
  AMARELA: { titulares: 41, noArquivo: 40, positivas: 36, medianaArquivo: 32755.74, medianaPositivas: 36340 },
} as const;
