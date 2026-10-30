/**
 * pioneiras — mulheres cujos nomes acompanham a linha do tempo de direitos.
 *
 * Conteúdo editorial, sem número derivado da base do TSE (exceto a linha
 * `em2026`, lida do arquivo oficial de candidaturas de 2026, e a votação de
 * Pagu em 1950, recontada em `perfis-pioneiras.ts`). Cada perfil
 * aponta para uma fonte específica. Quando um fato é reputação histórica e
 * não registro documental, o texto diz isso.
 *
 * Sem ilustração: os cards são tipográficos, conforme a regra de imagens do
 * projeto (AGENTS.md).
 */

export type Pioneira = {
  id: string;
  name: string;
  years: string;
  /** o "primeiro" que a torna referência, em uma linha */
  mark: string;
  text: string;
  /** ano do marco da linha do tempo ao qual o perfil se liga, quando houver */
  milestoneYear?: string;
  /** situação na eleição de 2026, lida do arquivo oficial do TSE */
  em2026?: string;
  /** rota do perfil longo na seção Pioneiras, quando publicado */
  perfil?: "/pioneiras/pagu";
  sourceLabel: string;
  sourceUrl: string;
};

export const PIONEIRAS: readonly Pioneira[] = [
  {
    id: "nisia-floresta",
    name: "Nísia Floresta",
    years: "1810–1885",
    mark: "Escreveu sobre direitos das mulheres um século antes do voto",
    text:
      "Educadora nascida no Rio Grande do Norte, publicou em 1832, no Recife, Direitos das mulheres e injustiça dos homens. Partiu de autoras europeias, como Mary Wollstonecraft, e escreveu um texto novo sobre os preconceitos contra as mulheres no Brasil.",
    sourceLabel: "Constância Lima Duarte, Revista da FARN, 2006",
    sourceUrl: "https://revistas.unirn.edu.br/index.php/revistaunirn/article/download/10/158/420",
  },
  {
    id: "bertha-lutz",
    name: "Bertha Lutz",
    years: "1894–1976",
    mark: "Liderou a campanha pelo voto das mulheres",
    text:
      "Bióloga, fundou em 1919 a Liga para a Emancipação Intelectual da Mulher, que depois virou a Federação Brasileira pelo Progresso Feminino. Foi uma das principais articuladoras do voto feminino, conquistado em 1932, e assumiu uma cadeira de deputada federal em 1936.",
    milestoneYear: "1932",
    sourceLabel: "Agência Senado, Entenda o assunto: Bertha Lutz",
    sourceUrl: "https://www12.senado.leg.br/noticias/entenda-o-assunto/bertha-lutz",
  },
  {
    id: "pagu",
    name: "Patrícia Galvão, a Pagu",
    years: "1910–1962",
    mark: "Presa num comício em Santos em 1931, candidata a deputada estadual em 1950",
    text:
      "Escritora e jornalista, foi presa em 23 de agosto de 1931, em Santos, num comício reprimido pela polícia em que o ensacador de café Herculano de Souza foi morto. Outra militante, Guiomar Gonçalves, foi presa com ela. O título de primeira presa política do país, que acompanha o nome de Pagu, é reputação sem documento que o comprove. Em 1950, disputou uma vaga na Assembleia de São Paulo pelo PSB e teve 171 votos (TSE, recontagem independente).",
    perfil: "/pioneiras/pagu",
    sourceLabel: "Fundação Perseu Abramo, 23 de agosto de 1931; TSE, Resultados 1950",
    sourceUrl: "https://fpabramo.org.br/a-semana-na-historia-21-a-27-de-agosto/",
  },
  {
    id: "carlota-pereira-de-queiros",
    name: "Carlota Pereira de Queirós",
    years: "1892–1982",
    mark: "Primeira deputada federal do Brasil",
    text:
      "Médica e educadora, foi eleita por São Paulo em 1933 para a Assembleia Constituinte. Era a única mulher entre 253 deputados. Ficou na Câmara até 1937, quando o Estado Novo fechou o Legislativo.",
    milestoneYear: "1934",
    sourceLabel: "Câmara dos Deputados, Mulheres no Parlamento Brasileiro: Carlota Pereira de Queirós",
    sourceUrl:
      "https://www2.camara.leg.br/a-camara/documentos-e-pesquisa/arquivo/sites-tematicos/mulheres-no-parlamento/publicacoes/mulheres-no-parlamento-brasileiro-carlota-pereira-de-queiros/view",
  },
  {
    id: "antonieta-de-barros",
    name: "Antonieta de Barros",
    years: "1901–1952",
    mark: "Primeira mulher negra deputada no Brasil",
    text:
      "Professora e jornalista em Florianópolis, concorreu em 1934, primeira eleição aberta às mulheres, e assumiu como suplente na Assembleia de Santa Catarina em 1935. Em 1937, foi a primeira mulher a presidir uma assembleia estadual. Está inscrita no Livro dos Heróis e Heroínas da Pátria desde 2023.",
    milestoneYear: "1934",
    sourceLabel: "Exame, 5 jan. 2023",
    sourceUrl: "https://exame.com/brasil/antonieta-de-barros-e-inscrita-no-livro-de-herois-e-heroinas-da-patria/",
  },
  {
    id: "benedita-da-silva",
    name: "Benedita da Silva",
    years: "",
    mark: "Primeira mulher negra eleita senadora",
    text:
      "Foi a única mulher negra da Assembleia Constituinte que escreveu a Constituição de 1988. Em 1994, elegeu-se senadora pelo Rio de Janeiro. Em 2002, tornou-se a primeira mulher negra a governar o estado.",
    em2026: "Candidata ao Senado pelo RJ (PT), não foi eleita.",
    sourceLabel: "CNN Brasil, Quem é Benedita da Silva",
    sourceUrl: "https://www.cnnbrasil.com.br/eleicoes/quem-e-benedita-da-silva-candidata-ao-senado-pelo-rio-de-janeiro/",
  },
  {
    id: "joenia-wapichana",
    name: "Joênia Wapichana",
    years: "",
    mark: "Primeira mulher indígena eleita deputada federal",
    text:
      "Primeira mulher indígena a se formar em Direito, em 1997, pela Universidade Federal de Roraima, elegeu-se deputada federal pelo estado em 2018, pela Rede.",
    milestoneYear: "2018",
    em2026: "Candidata a deputada federal por RR (PT), não foi eleita.",
    sourceLabel: "Exame, Primeira mulher indígena é eleita para a Câmara dos Deputados",
    sourceUrl: "https://exame.com/brasil/primeira-mulher-indigena-e-eleita-para-a-camara-dos-deputados/",
  },
] as const;
