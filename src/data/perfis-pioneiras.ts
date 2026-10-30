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
  to?: "/pioneiras/pagu";
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
      "Intelectual e militante do movimento negro, candidata a deputada federal em 1982 e a deputada estadual em 1986, no Rio de Janeiro.",
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
