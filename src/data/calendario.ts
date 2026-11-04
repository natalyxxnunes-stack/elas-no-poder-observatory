/**
 * calendario — datas públicas da política que o observatório acompanha, e o
 * que publica em cada uma. Datas eleitorais conferidas em 04/11/2026 no
 * calendário do TSE resumido pela Agência Senado (12/03/2026) e na notícia do
 * TSE de março de 2026; datas de lei, no texto da lei.
 *
 * `pauta` é o compromisso editorial do Quem são elas? para aquela data. Uma
 * pauta que muda ou sai entra no registro de correções do Método.
 */
export type TipoData = "eleitoral" | "institucional" | "memória";
export type DataCalendario = {
  data: string; // AAAA-MM-DD
  ate?: string;
  tipo: TipoData;
  titulo: string;
  explica: string;
  fonte: { nome: string; url: string };
  pauta?: string;
};

const SENADO = {
  nome: "Agência Senado, calendário eleitoral de 2026",
  url: "https://www12.senado.leg.br/noticias/infomaterias/2026/03/confira-datas-e-prazos-do-calendario-eleitoral-de-2026",
};
const TSE = {
  nome: "TSE, principais datas do calendário eleitoral de 2026",
  url: "https://www.tse.jus.br/comunicacao/noticias/2026/Marco/eleicoes-2026-confira-as-principais-datas-do-calendario-eleitoral",
};
const CF = { nome: "Constituição Federal", url: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm" };

export const CALENDARIO_META = { conferidoEm: "04/11/2026" } as const;

export const CALENDARIO: readonly DataCalendario[] = [
  {
    data: "2026-11-03",
    tipo: "eleitoral",
    titulo: "Prestação de contas final do 1º turno",
    explica: "Último dia para candidaturas do 1º turno entregarem as contas finais de campanha.",
    fonte: SENADO,
    pauta: "Dinheiro refeito com a prestação final: receita, fundo por partido, gênero e cor/raça.",
  },
  {
    data: "2026-11-14",
    tipo: "eleitoral",
    titulo: "Prestação de contas final do 2º turno",
    explica: "Prazo das contas de quem disputou o 2º turno e da devolução de sobras de campanha.",
    fonte: SENADO,
    pauta: "Receita das candidatas a governo que foram ao 2º turno, com a conta final.",
  },
  {
    data: "2026-11-20",
    tipo: "memória",
    titulo: "Dia Nacional de Zumbi e da Consciência Negra",
    explica: "Feriado nacional desde a Lei 14.759/2023.",
    fonte: { nome: "Lei 14.759/2023", url: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14759.htm" },
    pauta: "Quem o partido lança e quem ele elege: a taxa de eleição de mulheres pretas e pardas, partido por partido.",
  },
  {
    data: "2026-11-25",
    tipo: "memória",
    titulo: "Dia Internacional pela Eliminação da Violência contra as Mulheres",
    explica: "Data da ONU; abre os 16 dias de ativismo, que vão até 10 de dezembro.",
    fonte: { nome: "ONU Mulheres", url: "https://www.onumulheres.org.br/" },
    pauta: "Barreiras atualizada com os processos de violência política de gênero do painel do TSE e do MPF.",
  },
  {
    data: "2026-12-15",
    tipo: "eleitoral",
    titulo: "Julgamento das contas de quem se elegeu",
    explica: "Prazo para a Justiça Eleitoral publicar as decisões sobre as contas das candidaturas eleitas.",
    fonte: SENADO,
    pauta: "Contas das eleitas: aprovadas, aprovadas com ressalvas ou desaprovadas, uma a uma nas fichas.",
  },
  {
    data: "2026-12-18",
    tipo: "eleitoral",
    titulo: "Diplomação de quem se elegeu",
    explica: "Último dia para a Justiça Eleitoral entregar os diplomas. Sem diploma, não há posse.",
    fonte: TSE,
    pauta: "Relatório 2026 do observatório, com a lista de eleitas conferida contra a diplomação.",
  },
  {
    data: "2027-01-05",
    tipo: "institucional",
    titulo: "Posse da Presidência",
    explica: "Primeira posse presidencial em 5 de janeiro, regra da Emenda Constitucional 111/2021.",
    fonte: TSE,
  },
  {
    data: "2027-01-06",
    tipo: "institucional",
    titulo: "Posse das governadoras e governadores",
    explica: "Mesma emenda: governos estaduais tomam posse em 6 de janeiro.",
    fonte: TSE,
    pauta: "As três governadoras eleitas: quem são, quem as financiou e quem compõe o primeiro escalão.",
  },
  {
    data: "2027-02-01",
    tipo: "institucional",
    titulo: "Posse no Congresso e eleição das Mesas",
    explica:
      "Deputados federais e senadores tomam posse; a partir de 1º de fevereiro, cada Casa elege sua Mesa em sessões preparatórias (Constituição, art. 57, § 4º).",
    fonte: CF,
    pauta: "Começa o monitor de mandato 2027–2031, com os indicadores do pré-registro. Quem ocupa a Mesa da Câmara e a do Senado.",
  },
  {
    data: "2027-02-24",
    tipo: "memória",
    titulo: "Dia da Conquista do Voto Feminino",
    explica: "O Código Eleitoral de 24 de fevereiro de 1932 garantiu o voto às mulheres. A data é lei desde 2015 (Lei 13.086).",
    fonte: { nome: "Lei 13.086/2015", url: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13086.htm" },
    pauta: "Pioneiras: 95 anos do voto feminino, com a série histórica de eleitas.",
  },
  {
    data: "2027-03-08",
    tipo: "memória",
    titulo: "Dia Internacional da Mulher",
    explica: "Data da ONU desde 1975.",
    fonte: { nome: "ONU Mulheres", url: "https://www.onumulheres.org.br/" },
    pauta: "Quem controla: mulheres em comissões, Mesas e lideranças no primeiro mês da legislatura.",
  },
] as const;
