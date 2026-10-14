/**
 * votos-2026 — votos nominais válidos do 1º turno de 2026 para deputado
 * federal, estadual e distrital, por gênero e cor/raça, CRAVADOS em código.
 *
 * Recontagem independente de votacao_candidato_munzona_2026_BRASIL.csv
 * (dentro de votacao_candidato_munzona_2026.zip, base gerada pelo TSE em
 * 14/10/2026 12:31:41; SHA-256 do zip
 * c804814482640c102b57ebc646d2db0a2294ae1c289e4f8d07169d35a6ed35c5),
 * cruzada com gênero e cor/raça de consulta_cand_2026_BRASIL.csv (base de
 * 14/10/2026 12:30:43). Script: scripts/recontagem/votos_2026.py.
 *
 * Regras:
 *  - só voto nominal válido (QT_VOTOS_NOMINAIS_VALIDOS); voto de legenda não
 *    tem gênero e fica fora; votos anulados, inclusive sub judice, ficam fora;
 *  - candidaturas, votos e cadeiras usam o mesmo recorte (sem Rondônia), para
 *    que as três etapas sejam comparáveis; cada uma com o próprio denominador;
 *  - Rondônia fica fora: os arquivos de 14/10 não trazem votação nem situação
 *    de totalização de deputado no estado.
 */

export const VOTOS_2026_META = {
  zipSha256: "c804814482640c102b57ebc646d2db0a2294ae1c289e4f8d07169d35a6ed35c5",
  baseGeneratedAt: "14/10/2026 12:31:41",
  candBaseGeneratedAt: "14/10/2026 12:30:43",
  excludedUfs: ["RO"],
} as const;

export type VotosCargo = {
  candidacies: Record<string, Record<string, number>>;
  elected: Record<string, Record<string, number>>;
  votes: Record<string, Record<string, number>>;
  votesTotal: number;
  votesByUf: Record<string, { FEMININO: number; MASCULINO: number }>;
};

export const VOTOS_2026: Record<"federal" | "estadual" | "distrital", VotosCargo> = {"federal": {"candidacies": {"FEMININO": {"PARDA": 911, "BRANCA": 1387, "PRETA": 477, "AMARELA": 15, "INDÍGENA": 34}, "MASCULINO": {"BRANCA": 2599, "PARDA": 1626, "PRETA": 554, "INDÍGENA": 37, "AMARELA": 29}}, "elected": {"MASCULINO": {"BRANCA": 297, "PARDA": 84, "PRETA": 16, "AMARELA": 1, "INDÍGENA": 1}, "FEMININO": {"BRANCA": 71, "PARDA": 20, "PRETA": 13, "INDÍGENA": 2}}, "votes": {"FEMININO": {"PRETA": 4794067, "PARDA": 4303286, "BRANCA": 16731467, "AMARELA": 62265, "INDÍGENA": 340595}, "MASCULINO": {"PARDA": 16421868, "BRANCA": 61765902, "PRETA": 4008746, "AMARELA": 701690, "INDÍGENA": 212325}}, "votesTotal": 109342211, "votesByUf": {"AC": {"FEMININO": 100934, "MASCULINO": 347388}, "AL": {"FEMININO": 262427, "MASCULINO": 1482217}, "AM": {"FEMININO": 356202, "MASCULINO": 1707698}, "AP": {"FEMININO": 151684, "MASCULINO": 296266}, "BA": {"FEMININO": 1412567, "MASCULINO": 6588703}, "CE": {"FEMININO": 1288301, "MASCULINO": 4067388}, "DF": {"FEMININO": 281827, "MASCULINO": 1320979}, "ES": {"FEMININO": 376498, "MASCULINO": 1698400}, "GO": {"FEMININO": 1082255, "MASCULINO": 2401867}, "MA": {"FEMININO": 1100309, "MASCULINO": 2756754}, "MG": {"FEMININO": 2075973, "MASCULINO": 8973097}, "MS": {"FEMININO": 631216, "MASCULINO": 736778}, "MT": {"FEMININO": 667060, "MASCULINO": 1175976}, "PA": {"FEMININO": 1495933, "MASCULINO": 3208870}, "PB": {"FEMININO": 247727, "MASCULINO": 2082694}, "PE": {"FEMININO": 1099789, "MASCULINO": 4001277}, "PI": {"FEMININO": 159063, "MASCULINO": 1867561}, "PR": {"FEMININO": 1112189, "MASCULINO": 4922089}, "RJ": {"FEMININO": 2011055, "MASCULINO": 6455999}, "RN": {"FEMININO": 644430, "MASCULINO": 1262448}, "RR": {"FEMININO": 69962, "MASCULINO": 240656}, "RS": {"FEMININO": 1368820, "MASCULINO": 4536247}, "SC": {"FEMININO": 1586418, "MASCULINO": 2522977}, "SE": {"FEMININO": 317542, "MASCULINO": 924990}, "SP": {"FEMININO": 6144209, "MASCULINO": 16844099}, "TO": {"FEMININO": 187290, "MASCULINO": 687113}}}, "estadual": {"candidacies": {"FEMININO": {"PRETA": 673, "BRANCA": 1745, "PARDA": 1352, "AMARELA": 22, "INDÍGENA": 44}, "MASCULINO": {"PARDA": 2583, "PRETA": 855, "BRANCA": 3676, "INDÍGENA": 55, "AMARELA": 30}}, "elected": {"MASCULINO": {"PARDA": 210, "BRANCA": 556, "AMARELA": 2, "PRETA": 30, "INDÍGENA": 3}, "FEMININO": {"PARDA": 45, "BRANCA": 136, "AMARELA": 2, "PRETA": 26, "INDÍGENA": 1}}, "votes": {"MASCULINO": {"PARDA": 18263118, "BRANCA": 53919302, "PRETA": 3700706, "AMARELA": 498860, "INDÍGENA": 203849}, "FEMININO": {"BRANCA": 17506363, "PARDA": 4565968, "PRETA": 3640996, "INDÍGENA": 339167, "AMARELA": 306556}}, "votesTotal": 102944885, "votesByUf": {"AC": {"FEMININO": 49540, "MASCULINO": 394081}, "AL": {"FEMININO": 312842, "MASCULINO": 1375983}, "AM": {"FEMININO": 270665, "MASCULINO": 1762546}, "AP": {"FEMININO": 136564, "MASCULINO": 295937}, "BA": {"FEMININO": 1498189, "MASCULINO": 5885025}, "CE": {"FEMININO": 1283956, "MASCULINO": 3796941}, "ES": {"FEMININO": 402120, "MASCULINO": 1625769}, "GO": {"FEMININO": 564095, "MASCULINO": 2849415}, "MA": {"FEMININO": 1146151, "MASCULINO": 2504640}, "MG": {"FEMININO": 2632990, "MASCULINO": 7894885}, "MS": {"FEMININO": 230182, "MASCULINO": 1074080}, "MT": {"FEMININO": 261817, "MASCULINO": 1560456}, "PA": {"FEMININO": 1199685, "MASCULINO": 3315308}, "PB": {"FEMININO": 576790, "MASCULINO": 1673199}, "PE": {"FEMININO": 980197, "MASCULINO": 3907751}, "PI": {"FEMININO": 292009, "MASCULINO": 1651617}, "PR": {"FEMININO": 1257263, "MASCULINO": 4537291}, "RJ": {"FEMININO": 1991204, "MASCULINO": 5952199}, "RN": {"FEMININO": 450154, "MASCULINO": 1399633}, "RR": {"FEMININO": 80157, "MASCULINO": 231118}, "RS": {"FEMININO": 1612077, "MASCULINO": 4160753}, "SC": {"FEMININO": 949553, "MASCULINO": 3105234}, "SE": {"FEMININO": 215310, "MASCULINO": 949905}, "SP": {"FEMININO": 7841296, "MASCULINO": 13954085}, "TO": {"FEMININO": 124244, "MASCULINO": 727984}}}, "distrital": {"candidacies": {"FEMININO": {"BRANCA": 66, "PARDA": 53, "PRETA": 27, "INDÍGENA": 3, "AMARELA": 3}, "MASCULINO": {"PARDA": 130, "PRETA": 32, "BRANCA": 117, "AMARELA": 1, "INDÍGENA": 1}}, "elected": {"MASCULINO": {"BRANCA": 11, "PARDA": 6, "PRETA": 2}, "FEMININO": {"BRANCA": 4, "PRETA": 1}}, "votes": {"MASCULINO": {"BRANCA": 693138, "PRETA": 129629, "PARDA": 427716, "INDÍGENA": 164, "AMARELA": 312}, "FEMININO": {"PARDA": 74326, "BRANCA": 228210, "PRETA": 71278, "INDÍGENA": 1895, "AMARELA": 310}}, "votesTotal": 1626978, "votesByUf": {"DF": {"FEMININO": 376019, "MASCULINO": 1250959}}}};
