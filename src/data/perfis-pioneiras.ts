/**
 * perfis-pioneiras — perfis longos da seção Pioneiras (/pioneiras).
 *
 * Critério da seção (decisão editorial de 29/10/2026): mulheres cuja
 * trajetória ajuda a entender a participação política das brasileiras.
 * Entram brasileiras e estrangeiras, desde que a ponte com o Brasil esteja
 * escrita no próprio perfil.
 *
 * Os cards curtos da linha do tempo de Direitos ficam em `pioneiras.ts`.
 * Aqui ficam só os perfis longos e os números eleitorais de cada uma, lidos
 * da votação nominal oficial do TSE e recontados (script em
 * scripts/pioneiras/votacao_historica.py).
 */

export const PIONEIRAS_CRITERIO =
  "Perfis de mulheres cuja trajetória ajuda a entender a participação política das brasileiras: quem abriu caminho, quem foi barrada e quem pensou o poder a partir das mulheres.";

export type PerfilPioneira = {
  id: string;
  name: string;
  years: string;
  linhaFina: string;
  /** rota do perfil publicado; ausente quando o perfil ainda está em apuração */
  to?: "/pioneiras/pagu" | "/pioneiras/lelia-gonzalez";
};

export const PERFIS_PIONEIRAS: readonly PerfilPioneira[] = [
  {
    id: "pagu",
    name: "Patrícia Galvão, a Pagu",
    years: "1910–1962",
    linhaFina:
      "Presa aos 21 anos num comício em Santos, candidata a deputada estadual em 1950. Teve 171 votos; a eleita com menos votos precisou de 1.909.",
    to: "/pioneiras/pagu",
  },
  {
    id: "lelia-gonzalez",
    name: "Lélia Gonzalez",
    years: "1935–1994",
    linhaFina:
      "Intelectual do movimento negro, teve 14.909 votos para deputada federal em 1982 e 8.286 para deputada estadual em 1986, no Rio. Ficou suplente nas duas.",
    to: "/pioneiras/lelia-gonzalez",
  },
  {
    id: "rosa-luxemburgo",
    name: "Rosa Luxemburgo",
    years: "1871–1919",
    linhaFina:
      "Teórica socialista que defendeu o voto das trabalhadoras e foi assassinada dias antes de as alemãs votarem pela primeira vez.",
  },
];

/**
 * Eleição de 1950 para a Assembleia Legislativa de São Paulo.
 * Fonte: TSE, Dados Abertos, Resultados 1950, Votação nominal por UF.
 * Arquivo votacao_candidato_uf_1950.zip, baixado em 29/10/2026.
 */
export const SP_1950 = {
  data: "03/10/1950",
  baixadoEm: "29/10/2026",
  zipSha256: "4fe19009197860e92411322eedc15d244947e6e3d5e0ad4d2ccab50210498e8a",
  arquivoSp: "VOTACAO_CANDIDATO_UF_1950_SP.txt",
  arquivoSpSha256: "c9d2f23c2baa53f6c93a524a139e5fc1255a8bc9e48e94179ea7e1b55959fee8",
  cadeiras: 75,
  candidaturas: 833,
  partidos: 13,
  menorVotacaoEleita: 1909,
  medianaGeral: 934,
  pagu: { votos: 171, partido: "PSB", situacao: "suplente" },
  psb: {
    candidaturas: 68,
    eleitos: 2,
    mediana: 171,
    mulheres: 3,
    homensAbaixoDe200: 36,
    homens: 65,
  },
  /** identificadas pelo prenome, conferidas uma a uma; a base de 1950 não registra sexo */
  mulheresCandidatasMinimo: 18,
  prenomesAmbiguosFora: ["Ely", "Keize", "Oyama"],
  mulheresEleitas: [
    { nome: "Conceição da Costa Neves", registro: "Maria da Conceição Neves Santamaria", partido: "PTB", votos: 10905 },
    { nome: "Tereza Delta", registro: "Tereza Delta", partido: "PSP", votos: 5390 },
  ],
} as const;

/**
 * Eleições de Lélia Gonzalez no Rio de Janeiro.
 * Fonte: TSE, Dados Abertos, Resultados 1982 e 1986, Votação nominal por UF.
 * Recontagem independente com scripts/pioneiras/votacao_historica.py,
 * conferida de novo em 30/10/2026. As bases de 1982 e 1986 não registram
 * sexo nem cor/raça.
 */
export const RJ_1982 = {
  data: "15/11/1982",
  cargo: "deputada federal",
  zipSha256: "4f17001ac0cd190c2774003dc6809bfd6fe4e015a4b806e6fb6a87813c575173",
  arquivo: "VOTACAO_CANDIDATO_UF_1982_RJ.txt",
  arquivoSha256: "53102287dea7b653dc7040b54097bbbcd0e39691b533b6cf8a63ad0789fb43eb",
  registro: "LELIA DE ALMEIDA GONZALES",
  candidaturas: 261,
  cadeiras: 46,
  menorVotacaoEleita: 17708,
  medianaGeral: 6500,
  posicaoGeral: 74,
  lelia: { votos: 14909, partido: "PT", situacao: "suplente" },
  partido: {
    sigla: "PT",
    candidaturas: 30,
    eleitos: 1,
    posicaoLelia: 2,
    eleito: { nome: "José Eudes Freitas", votos: 36014 },
  },
} as const;

export const RJ_1986 = {
  data: "15/11/1986",
  cargo: "deputada estadual",
  zipSha256: "c2e3201a0f58e4e77ee951322d47b0a88fddcbfb94d553777f598ad5c83ddeee",
  arquivo: "VOTACAO_CANDIDATO_UF_1986_RJ.txt",
  arquivoSha256: "4a808a38cb566022a2663d7d5a90f504388739b5f3387e1ed08212642ed96091",
  registro: "LELIA DE ALMEIDA GONZALEZ",
  candidaturas: 1711,
  cadeiras: 70,
  menorVotacaoEleita: 2837,
  medianaGeral: 911,
  posicaoGeral: 140,
  lelia: { votos: 8286, partido: "PDT", situacao: "suplente" },
  partido: { sigla: "PDT", candidaturas: 105, eleitos: 17, posicaoLelia: 36 },
  /** a cadeira dependia da votação da coligação, não só do partido */
  coligacao: {
    nome: "Pacto Democrático Trabalhista (PDT, PMB, PRN, PCN)",
    candidaturas: 166,
    eleitos: 17,
    menorVotacaoEleita: 12260,
  },
} as const;
