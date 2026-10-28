/**
 * votos-2026 — votos nominais válidos do 1º turno de 2026 para deputado
 * federal, estadual e distrital, por gênero e cor/raça, CRAVADOS em código.
 *
 * Recontagem independente de votacao_candidato_munzona_2026_BRASIL.csv
 * (dentro de votacao_candidato_munzona_2026.zip, base gerada pelo TSE em
 * 27/10/2026 19:32:16; SHA-256 do zip
 * def8e84a06559d118612cbd889f9daa336ef0416b2179868e1057cfcb4eb278b),
 * cruzada com gênero e cor/raça de consulta_cand_2026_BRASIL.csv (base de
 * 27/10/2026 19:30:36). Script: scripts/recontagem/votos_2026.py.
 *
 * Regras:
 *  - só voto nominal válido (QT_VOTOS_NOMINAIS_VALIDOS); voto de legenda não
 *    tem gênero e fica fora; votos anulados, inclusive sub judice, ficam fora;
 *  - candidaturas, votos e cadeiras usam o mesmo recorte, para que as três
 *    etapas sejam comparáveis; cada uma com o próprio denominador;
 *  - os 27 estados: Rondônia, fora entre 14/10 e 27/10 por falta de votação
 *    no arquivo do TSE, voltou na base de 27/10.
 *
 * Revisões do TSE entre 14/10 e 27/10, fora de Rondônia (conferidas):
 * -16.884 votos de homens para deputado estadual no MS, -16 votos de mulheres
 * para deputado estadual no RN e a cor/raça de 3 candidaturas (1 federal e 2
 * estaduais) passou de parda para branca.
 */

export const VOTOS_2026_META = {
  zipSha256: "def8e84a06559d118612cbd889f9daa336ef0416b2179868e1057cfcb4eb278b",
  baseGeneratedAt: "27/10/2026 19:32:16",
  candBaseGeneratedAt: "27/10/2026 19:30:36",
  excludedUfs: [] as string[],
} as const;

export type VotosCargo = {
  candidacies: Record<string, Record<string, number>>;
  elected: Record<string, Record<string, number>>;
  votes: Record<string, Record<string, number>>;
  votesTotal: number;
  votesByUf: Record<string, { FEMININO: number; MASCULINO: number }>;
};

export const VOTOS_2026: Record<"federal" | "estadual" | "distrital", VotosCargo> = {"federal": {"candidacies": {"MASCULINO": {"BRANCA": 2631, "PARDA": 1668, "PRETA": 564, "INDÍGENA": 40, "AMARELA": 29}, "FEMININO": {"BRANCA": 1403, "PARDA": 932, "INDÍGENA": 34, "PRETA": 487, "AMARELA": 15}}, "elected": {"MASCULINO": {"BRANCA": 301, "PRETA": 16, "PARDA": 85, "AMARELA": 1, "INDÍGENA": 1}, "FEMININO": {"BRANCA": 73, "PARDA": 21, "PRETA": 13, "INDÍGENA": 2}}, "votes": {"FEMININO": {"BRANCA": 16868408, "PARDA": 4397581, "PRETA": 4813530, "INDÍGENA": 340595, "AMARELA": 62265}, "MASCULINO": {"BRANCA": 62182046, "PRETA": 4056486, "PARDA": 16604526, "INDÍGENA": 219102, "AMARELA": 701690}}, "votesTotal": 110246229, "votesByUf": {"AC": {"FEMININO": 100934, "MASCULINO": 347388}, "AL": {"FEMININO": 262427, "MASCULINO": 1482217}, "AM": {"FEMININO": 356202, "MASCULINO": 1707698}, "AP": {"FEMININO": 151684, "MASCULINO": 296266}, "BA": {"FEMININO": 1412567, "MASCULINO": 6588703}, "CE": {"FEMININO": 1288301, "MASCULINO": 4067388}, "DF": {"FEMININO": 281827, "MASCULINO": 1320979}, "ES": {"FEMININO": 376498, "MASCULINO": 1698400}, "GO": {"FEMININO": 1082255, "MASCULINO": 2401867}, "MA": {"FEMININO": 1100309, "MASCULINO": 2756754}, "MG": {"FEMININO": 2075973, "MASCULINO": 8973097}, "MS": {"FEMININO": 631216, "MASCULINO": 736778}, "MT": {"FEMININO": 667060, "MASCULINO": 1175976}, "PA": {"FEMININO": 1495933, "MASCULINO": 3208870}, "PB": {"FEMININO": 247727, "MASCULINO": 2082694}, "PE": {"FEMININO": 1099789, "MASCULINO": 4001277}, "PI": {"FEMININO": 159063, "MASCULINO": 1867561}, "PR": {"FEMININO": 1112189, "MASCULINO": 4922089}, "RJ": {"FEMININO": 2011055, "MASCULINO": 6455999}, "RN": {"FEMININO": 644430, "MASCULINO": 1262448}, "RO": {"FEMININO": 250699, "MASCULINO": 653319}, "RR": {"FEMININO": 69962, "MASCULINO": 240656}, "RS": {"FEMININO": 1368820, "MASCULINO": 4536247}, "SC": {"FEMININO": 1586418, "MASCULINO": 2522977}, "SE": {"FEMININO": 317542, "MASCULINO": 924990}, "SP": {"FEMININO": 6144209, "MASCULINO": 16844099}, "TO": {"FEMININO": 187290, "MASCULINO": 687113}}}, "estadual": {"candidacies": {"MASCULINO": {"BRANCA": 3724, "PARDA": 2681, "PRETA": 873, "AMARELA": 30, "INDÍGENA": 57}, "FEMININO": {"PRETA": 683, "PARDA": 1394, "BRANCA": 1785, "INDÍGENA": 45, "AMARELA": 23}}, "elected": {"MASCULINO": {"BRANCA": 567, "PARDA": 219, "PRETA": 31, "AMARELA": 2, "INDÍGENA": 3}, "FEMININO": {"PRETA": 27, "PARDA": 46, "BRANCA": 137, "AMARELA": 2, "INDÍGENA": 1}}, "votes": {"FEMININO": {"PARDA": 4620955, "BRANCA": 17600155, "PRETA": 3664181, "AMARELA": 318288, "INDÍGENA": 339167}, "MASCULINO": {"BRANCA": 54232633, "PARDA": 18616871, "PRETA": 3728065, "INDÍGENA": 205411, "AMARELA": 498860}}, "votesTotal": 103824586, "votesByUf": {"AC": {"FEMININO": 49540, "MASCULINO": 394081}, "AL": {"FEMININO": 312842, "MASCULINO": 1375983}, "AM": {"FEMININO": 270665, "MASCULINO": 1762546}, "AP": {"FEMININO": 136564, "MASCULINO": 295937}, "BA": {"FEMININO": 1498189, "MASCULINO": 5885025}, "CE": {"FEMININO": 1283956, "MASCULINO": 3796941}, "ES": {"FEMININO": 402120, "MASCULINO": 1625769}, "GO": {"FEMININO": 564095, "MASCULINO": 2849415}, "MA": {"FEMININO": 1146151, "MASCULINO": 2504640}, "MG": {"FEMININO": 2632990, "MASCULINO": 7894885}, "MS": {"FEMININO": 230182, "MASCULINO": 1057196}, "MT": {"FEMININO": 261817, "MASCULINO": 1560456}, "PA": {"FEMININO": 1199685, "MASCULINO": 3315308}, "PB": {"FEMININO": 576790, "MASCULINO": 1673199}, "PE": {"FEMININO": 980197, "MASCULINO": 3907751}, "PI": {"FEMININO": 292009, "MASCULINO": 1651617}, "PR": {"FEMININO": 1257263, "MASCULINO": 4537291}, "RJ": {"FEMININO": 1991204, "MASCULINO": 5952199}, "RN": {"FEMININO": 450138, "MASCULINO": 1399633}, "RO": {"FEMININO": 183712, "MASCULINO": 712889}, "RR": {"FEMININO": 80157, "MASCULINO": 231118}, "RS": {"FEMININO": 1612077, "MASCULINO": 4160753}, "SC": {"FEMININO": 949553, "MASCULINO": 3105234}, "SE": {"FEMININO": 215310, "MASCULINO": 949905}, "SP": {"FEMININO": 7841296, "MASCULINO": 13954085}, "TO": {"FEMININO": 124244, "MASCULINO": 727984}}}, "distrital": {"candidacies": {"MASCULINO": {"PARDA": 130, "PRETA": 32, "BRANCA": 117, "AMARELA": 1, "INDÍGENA": 1}, "FEMININO": {"PARDA": 53, "BRANCA": 66, "INDÍGENA": 3, "PRETA": 27, "AMARELA": 3}}, "elected": {"MASCULINO": {"BRANCA": 11, "PRETA": 2, "PARDA": 6}, "FEMININO": {"BRANCA": 4, "PRETA": 1}}, "votes": {"MASCULINO": {"BRANCA": 693138, "PARDA": 427716, "PRETA": 129629, "AMARELA": 312, "INDÍGENA": 164}, "FEMININO": {"BRANCA": 228210, "PRETA": 71278, "PARDA": 74326, "INDÍGENA": 1895, "AMARELA": 310}}, "votesTotal": 1626978, "votesByUf": {"DF": {"FEMININO": 376019, "MASCULINO": 1250959}}}};
