/**
 * situacao-candidaturas-2026 — situação de julgamento dos pedidos de registro
 * de 2026, CRAVADA em código.
 *
 * Recontagem de consulta_cand_complementar_2026_BRASIL.csv (zip SHA-256
 * 9e57df8d5eb8d08d5cef4732db082a82a2b0d3aac2192676783306497f3a3af0, base
 * gerada pelo TSE em 27/10/2026 19:30:36), cruzada por SQ_CANDIDATO com
 * consulta_cand_2026_BRASIL.csv da mesma data (20.989 registros, todos com
 * par). Campo: DS_SITUACAO_JULGAMENTO. Script:
 * scripts/recontagem/situacao_2026.py.
 *
 * Grupos:
 *  - apta: deferida (com ou sem recurso pendente);
 *  - indeferida com recurso: ainda sub judice;
 *  - renúncia;
 *  - indeferida ou cancelada: indeferida, cancelada, falecimento ou pedido
 *    não conhecido;
 *  - pendente: sem julgamento.
 *
 * Comparação com 2022: o arquivo de 2022 traz a classificação final APTO /
 * INAPTO (9,6% inaptos no proporcional: 9,1% entre mulheres e 9,7% entre
 * homens). Em 2026 parte dos indeferimentos ainda está em recurso; por isso a
 * comparação é aproximada e mostra as duas parcelas separadas.
 */

export const SITUACAO_META = {
  baseGeneratedAt: "27/10/2026 19:30:36",
  zipSha256: "9e57df8d5eb8d08d5cef4732db082a82a2b0d3aac2192676783306497f3a3af0",
  inaptos2022: { proporcional: 9.6, feminino: 9.1, masculino: 9.7 },
} as const;

export const SITUACOES = ["apta", "indeferida com recurso", "renúncia", "indeferida ou cancelada", "pendente"] as const;
export type Situacao = (typeof SITUACOES)[number];
export type SituacaoCount = { total: number } & Partial<Record<Situacao, number>>;
export type SituacaoUniverso = {
  FEMININO: SituacaoCount;
  MASCULINO: SituacaoCount;
  FEMININO_raca: Record<string, SituacaoCount>;
  MASCULINO_raca: Record<string, SituacaoCount>;
};

export const SITUACAO_2026: { proporcional: SituacaoUniverso; majoritario: SituacaoUniverso } = {"proporcional": {"FEMININO": {"total": 6953, "indeferida ou cancelada": 204, "apta": 6429, "renúncia": 264, "indeferida com recurso": 56}, "FEMININO_raca": {"BRANCA": {"total": 3254, "indeferida ou cancelada": 95, "apta": 3013, "renúncia": 120, "indeferida com recurso": 26}, "PARDA": {"total": 2379, "indeferida ou cancelada": 74, "apta": 2187, "renúncia": 99, "indeferida com recurso": 19}, "INDÍGENA": {"total": 82, "apta": 76, "indeferida ou cancelada": 3, "renúncia": 3}, "PRETA": {"total": 1197, "apta": 1116, "renúncia": 39, "indeferida ou cancelada": 32, "indeferida com recurso": 10}, "AMARELA": {"total": 41, "renúncia": 3, "apta": 37, "indeferida com recurso": 1}}, "MASCULINO": {"total": 12578, "indeferida ou cancelada": 426, "apta": 11463, "pendente": 4, "renúncia": 485, "indeferida com recurso": 200}, "MASCULINO_raca": {"BRANCA": {"total": 6472, "indeferida ou cancelada": 161, "apta": 5985, "pendente": 4, "renúncia": 210, "indeferida com recurso": 112}, "PARDA": {"total": 4479, "indeferida ou cancelada": 200, "apta": 4025, "renúncia": 196, "indeferida com recurso": 58}, "PRETA": {"total": 1469, "indeferida ou cancelada": 62, "renúncia": 71, "apta": 1307, "indeferida com recurso": 29}, "INDÍGENA": {"total": 98, "apta": 93, "renúncia": 2, "indeferida ou cancelada": 2, "indeferida com recurso": 1}, "AMARELA": {"total": 60, "apta": 53, "indeferida ou cancelada": 1, "renúncia": 6}}}, "majoritario": {"FEMININO": {"total": 107, "apta": 99, "indeferida ou cancelada": 6, "indeferida com recurso": 2}, "FEMININO_raca": {"BRANCA": {"total": 65, "apta": 64, "indeferida ou cancelada": 1}, "PRETA": {"total": 17, "apta": 17}, "PARDA": {"total": 24, "apta": 17, "indeferida ou cancelada": 5, "indeferida com recurso": 2}, "AMARELA": {"total": 1, "apta": 1}}, "MASCULINO": {"total": 426, "apta": 363, "renúncia": 16, "indeferida ou cancelada": 32, "indeferida com recurso": 15}, "MASCULINO_raca": {"BRANCA": {"total": 256, "apta": 224, "renúncia": 9, "indeferida ou cancelada": 18, "indeferida com recurso": 5}, "PARDA": {"total": 120, "apta": 97, "renúncia": 6, "indeferida ou cancelada": 10, "indeferida com recurso": 7}, "AMARELA": {"total": 3, "apta": 1, "indeferida com recurso": 1, "indeferida ou cancelada": 1}, "PRETA": {"total": 40, "apta": 34, "renúncia": 1, "indeferida ou cancelada": 3, "indeferida com recurso": 2}, "INDÍGENA": {"total": 7, "apta": 7}}}};

/** Situação de julgamento de cada candidata à Presidência, aos governos e ao Senado (chave: nome de urna|cargo|UF). */
export const SITUACAO_CANDIDATAS_MAJ: Record<string, string> = {"PAULA BELMONTE|GOVERNADOR|DF": "DEFERIDO", "SIMONE TEBET|SENADOR|SP": "DEFERIDO", "ANA LUCIA DA SILVEIRA MACHADO|SENADOR|SC": "DEFERIDO", "JOANINHA DE OLIVEIRA|SENADOR|SC": "DEFERIDO", "PROFESSORA MARIA DO CARMO|GOVERNADOR|AM": "DEFERIDO", "VERA LÚCIA|GOVERNADOR|SP": "DEFERIDO", "DRA. LÚCIA SANTOS|GOVERNADOR|PI": "DEFERIDO", "KAREN GUERREIRO|SENADOR|PR": "DEFERIDO", "GRACINHA CAIADO|SENADOR|GO": "DEFERIDO", "OSVANY LUZ|SENADOR|TO": "DEFERIDO EM PRAZO RECURSAL OU COM RECURSO", "CAROL|SENADOR|SC": "DEFERIDO", "JARDENYA BEZERRA|SENADOR|PI": "INDEFERIDO", "PROFESSORA EVANY|SENADOR|AM": "DEFERIDO", "LIVIA NORONHA|SENADOR|PA": "DEFERIDO", "FERNANDA LOPES|SENADOR|PA": "DEFERIDO", "ROSE DE FREITAS|SENADOR|ES": "DEFERIDO", "ANA LUIZA DO MLB|SENADOR|MG": "DEFERIDO", "LENILDA LUNA|GOVERNADOR|AL": "DEFERIDO", "JUÍZA JÔ|SENADOR|AP": "DEFERIDO", "LUCIANA MANDU|SENADOR|RN": "DEFERIDO", "HELENA DA ASATUR|SENADOR|RR": "DEFERIDO", "REGINA TIO IVO|SENADOR|RR": "DEFERIDO", "MARGARETH BUZETTI|SENADOR|MT": "DEFERIDO", "MARÍLIA ARRAES|SENADOR|PE": "DEFERIDO", "SÍLVIA CRISTINA|SENADOR|RO": "DEFERIDO", "VIVIAN MENDES|GOVERNADOR|SP": "DEFERIDO", "ROSI AIRES|GOVERNADOR|RR": "DEFERIDO", "LAÍS CHAUD|GOVERNADOR|SC": "DEFERIDO", "RAYSSA FURLAN|SENADOR|AP": "DEFERIDO", "TAYNÁ MIESSA|GOVERNADOR|PR": "DEFERIDO", "HANA GHASSAN|GOVERNADOR|PA": "DEFERIDO", "ARACELI|GOVERNADOR|PA": "DEFERIDO", "PROFESSORA DORINHA|GOVERNADOR|TO": "DEFERIDO", "CRISTINA GRAEML|SENADOR|PR": "DEFERIDO", "TERESA SURITA|SENADOR|RR": "DEFERIDO", "TANIA PERES|SENADOR|RS": "DEFERIDO", "ISAURA LEMOS|SENADOR|GO": "DEFERIDO", "VERA LÚCIA|GOVERNADOR|CE": "DEFERIDO", "CATARINA MATOS|SENADOR|CE": "DEFERIDO", "NEIDINHA|SENADOR|RO": "INDEFERIDO EM PRAZO RECURSAL OU COM RECURSO", "RENATINHA|SENADOR|SE": "DEFERIDO", "MICHELLE BOLSONARO|SENADOR|DF": "DEFERIDO", "BIA KICIS|SENADOR|DF": "DEFERIDO", "SONINHA FRANCINE|SENADOR|SP": "DEFERIDO", "CELINA LEÃO|GOVERNADOR|DF": "DEFERIDO", "ÁUREA CAROLINA|SENADOR|MG": "DEFERIDO", "JULIANA BRIZOLA|GOVERNADOR|RS": "DEFERIDO", "BENEDITA DA SILVA|SENADOR|RJ": "DEFERIDO", "GAL LEITE|GOVERNADOR|PA": "DEFERIDO", "SAMANDA DE LULA|SENADOR|RN": "DEFERIDO", "MAILZA ASSIS|GOVERNADOR|AC": "DEFERIDO", "PROFESSORA CAMILA|GOVERNADOR|PE": "DEFERIDO", "MARA ROCHA|SENADOR|AC": "DEFERIDO", "MARINA JHC|SENADOR|AL": "DEFERIDO", "PROFESSORA SAMARA MINEIRO|GOVERNADOR|DF": "DEFERIDO", "LEILA DO VÔLEI|SENADOR|DF": "DEFERIDO", "MARINA SILVA|SENADOR|SP": "DEFERIDO", "RAVENNA DA INCLUSÃO|GOVERNADOR|PI": "INDEFERIDO", "POLICIAL EDJANE|GOVERNADOR|SP": "INDEFERIDO", "LUCIANA OLIVEIRA|SENADOR|RO": "DEFERIDO", "LUCIANA AMORIM|GOVERNADOR|GO": "DEFERIDO", "ELIZIANE GAMA|SENADOR|MA": "DEFERIDO", "GIZELLE FREITAS|SENADOR|PA": "DEFERIDO", "REJANE DE OLIVEIRA|GOVERNADOR|RS": "DEFERIDO", "PRISCILA VOIGT|GOVERNADOR|RS": "DEFERIDO", "MICHELLY XAVIER|SENADOR|RJ": "DEFERIDO", "WELL MACEDO|GOVERNADOR|PA": "DEFERIDO", "GLEISI|SENADOR|PR": "DEFERIDO", "ROSILENE SANTANA|SENADOR|PB": "DEFERIDO", "RUTH REIS|GOVERNADOR|PA": "INDEFERIDO EM PRAZO RECURSAL OU COM RECURSO", "ERIKA KOKAY|SENADOR|DF": "DEFERIDO", "MARIANA CARVALHO|SENADOR|RO": "DEFERIDO", "SORAYA|SENADOR|MS": "DEFERIDO", "MARIA MADALENA NUNES|SENADOR|PI": "DEFERIDO", "MANUELA D ÁVILA|SENADOR|RS": "DEFERIDO", "DANIELA MULHERES SOCIALISTAS|SENADOR|RS": "DEFERIDO", "LUIZIANNE|SENADOR|CE": "DEFERIDO", "GORETT BITU|SENADOR|PE": "DEFERIDO", "MAÍRA DE SOUZA|SENADOR|SP": "DEFERIDO", "CAROL DE TONI|SENADOR|SC": "DEFERIDO", "LOURDES MELO|GOVERNADOR|PI": "INDEFERIDO", "TATY CRISTINA DE JESUS|GOVERNADOR|SE": "DEFERIDO", "VICTÓRIA MELLO VIC|SENADOR|MG": "DEFERIDO", "MARÍLIA CAMPOS|SENADOR|MG": "DEFERIDO", "MONICA BENICIO|SENADOR|RJ": "DEFERIDO", "PAULA FALCÃO|SENADOR|RJ": "DEFERIDO", "ZENAIDE MAIA|SENADOR|RN": "DEFERIDO", "SONIA GODEIRO|SENADOR|RN": "DEFERIDO", "INDIRA XAVIER|GOVERNADOR|MG": "DEFERIDO", "MARIA BONA|GOVERNADOR|BA": "DEFERIDO", "RAQUEL LYRA|GOVERNADOR|PE": "DEFERIDO", "JANAINA RIVA|SENADOR|MT": "DEFERIDO", "DOUTORA NATASHA|GOVERNADOR|MT": "DEFERIDO", "IZADORA DIAS|GOVERNADOR|SP": "INDEFERIDO", "DRA ELIANA FERREIRA|SENADOR|SP": "DEFERIDO", "MARLENE SOCCAS|SENADOR|SC": "DEFERIDO", "PROFESSORA DELLIANA|SENADOR|BA": "DEFERIDO", "JULIETE|GOVERNADOR|RJ": "DEFERIDO", "ROSEANA SARNEY|SENADOR|MA": "DEFERIDO", "MAGUINHA MALTA|SENADOR|ES": "DEFERIDO", "ALLINY SERRÃO|SENADOR|AP": "DEFERIDO", "ROSÁLIA FERNANDES|SENADOR|RN": "DEFERIDO", "SAMARA|PRESIDENTE|BR": "DEFERIDO", "CLARIANA BARAO|PRESIDENTE|BR": "DEFERIDO", "CINTIA DIAS|SENADOR|GO": "DEFERIDO", "ARINALDA DO MLB|GOVERNADOR|RN": "DEFERIDO", "EDLAINE RODRIGUES|SENADOR|PA": "INDEFERIDO"};

/** saída definitiva da disputa = indeferida ou cancelada + renúncia */
export const saiu = (c: SituacaoCount) => (c["indeferida ou cancelada"] ?? 0) + (c["renúncia"] ?? 0);
