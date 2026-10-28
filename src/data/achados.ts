export type AchadoBarra = { rotulo: string; valor: number };

export type Achado = {
  id: string;
  numero: string;
  /** data em que o achado foi publicado */
  data: string;
  /** data em que os números foram refeitos com base mais nova, quando houve */
  atualizadoEm?: string;
  titulo: string;
  texto: string;
  barras: AchadoBarra[];
  legenda: string;
  fonte: string;
  to: "/quem-sao-elas" | "/dinheiro" | "/historico" | "/quem-chega" | "/como-votaram";
  linkLabel: string;
};

export const ACHADOS: Achado[] = [
  {
    id: "quanto-mais-alto-mais-brancas",
    numero: "01",
    data: "2026-09-25",
    titulo: "A cor das candidatas muda com o cargo em disputa",
    texto:
      "Brancas são 46,8% das candidatas a deputada e 60,7% das candidatas a presidente, governadora e senadora. As pardas fazem o caminho inverso: 34,2% das candidatas a deputada e 22,4% nas candidaturas majoritárias. As pretas são 17,2% e 15,9%.",
    barras: [
      { rotulo: "Deputada", valor: 46.8 },
      { rotulo: "Majoritárias", valor: 60.7 },
    ],
    legenda: "Brancas entre as candidatas",
    fonte: "TSE, Candidaturas 2026 · base de 27/10/2026 (números iguais aos de 25/09)",
    atualizadoEm: "2026-10-28",
    to: "/quem-sao-elas",
    linkLabel: "Ver em Quem são elas",
  },
  {
    id: "dinheiro-brancas-peso",
    numero: "02",
    data: "2026-09-25",
    titulo: "No dinheiro, as candidatas brancas ficam com mais do que o seu peso",
    texto:
      "Nas listas para deputada, brancas são 46,9% das candidatas com receita declarada e ficam com 56,2% do dinheiro das mulheres. Pardas são 34,0% e ficam com 27,6%; pretas, 17,3% e 14,2%. Em 25/09, eram 47,0% e 55,7%: a distância cresceu na reta final da campanha.",
    barras: [
      { rotulo: "Brancas · candidatas", valor: 46.9 },
      { rotulo: "Brancas · receita", valor: 56.2 },
      { rotulo: "Pardas · candidatas", valor: 34.0 },
      { rotulo: "Pardas · receita", valor: 27.6 },
      { rotulo: "Pretas · candidatas", valor: 17.3 },
      { rotulo: "Pretas · receita", valor: 14.2 },
    ],
    legenda: "Candidatas a deputada com receita declarada",
    fonte: "TSE, Candidaturas e Prestação de Contas 2026 · base de 27/10/2026, contas em andamento",
    atualizadoEm: "2026-10-28",
    to: "/dinheiro",
    linkLabel: "Ver em Dinheiro",
  },
  {
    id: "vice-desde-2014",
    numero: "03",
    data: "2026-09-25",
    titulo: "Desde 2014, mulheres aparecem mais entre as vices do que entre as titulares",
    texto:
      "Em 2014, mulheres eram 11,4% das candidaturas a governadora e 25,3% das candidaturas a vice. Em 2026, são 17,4% e 41,7%. A distância entre titular e vice cresceu de 14 para 24 pontos percentuais. Correção em 28/10/2026: a versão anterior incluía as eleições suplementares de 2014 e dizia 12,0%, 24,0% e que a distância tinha dobrado.",
    barras: [
      { rotulo: "Governadora 2014", valor: 11.4 },
      { rotulo: "Vice 2014", valor: 25.3 },
      { rotulo: "Governadora 2026", valor: 17.4 },
      { rotulo: "Vice 2026", valor: 41.7 },
    ],
    legenda: "Mulheres entre as candidaturas a governo",
    fonte: "TSE, Candidatos 2014 e 2026 · só eleições gerais",
    atualizadoEm: "2026-10-28",
    to: "/quem-sao-elas",
    linkLabel: "Ver em Quem são elas",
  },
  {
    id: "vice-nao-titular",
    numero: "04",
    data: "2026-09-25",
    titulo: "Vice, não titular",
    texto:
      "Nos governos estaduais, mulheres são 35 das 201 candidaturas a governadora (17,4%) e 88 das 211 a vice (41,7%). Na Presidência, são 2 das 14 titulares e 6 das 14 vices.",
    barras: [
      { rotulo: "Governadora", valor: 17.4 },
      { rotulo: "Vice-governadora", valor: 41.7 },
    ],
    legenda: "Mulheres entre as candidaturas",
    fonte: "TSE, Candidaturas 2026 · base de 27/10/2026 (números iguais aos de 25/09)",
    atualizadoEm: "2026-10-28",
    to: "/quem-sao-elas",
    linkLabel: "Ver em Quem são elas",
  },
  {
    id: "candidatar-se-nao-e-eleger-se",
    numero: "05",
    data: "2026-09-25",
    titulo: "Candidatar-se não é eleger-se",
    texto: "Em 2026, 1 em cada 21 candidatas a deputada se elegeu. Entre os homens, 1 em cada 10. Em 2022, eram 1 em 34 e 1 em 14. As duas taxas subiram porque houve menos candidaturas para as mesmas 1.572 cadeiras, e a distância entre mulheres e homens continua: eles se elegem duas vezes mais.",
    barras: [
      { rotulo: "Candidatas 2022", valor: 2.9 },
      { rotulo: "Candidatos 2022", valor: 7.0 },
      { rotulo: "Candidatas 2026", valor: 4.7 },
      { rotulo: "Candidatos 2026", valor: 9.9 },
    ],
    legenda: "Taxa de eleição para deputada e deputado (eleitas ÷ candidaturas do mesmo gênero)",
    fonte: "TSE, Candidatos 2022 e 2026 · base de 27/10/2026",
    atualizadoEm: "2026-10-28",
    to: "/historico",
    linkLabel: "Ver no Histórico",
  },
  {
    id: "menos-candidatas-que-2022",
    numero: "06",
    data: "2026-09-25",
    titulo: "2.579 candidatas a menos que em 2022",
    texto:
      "Os registros de candidaturas para deputada e deputado caíram 30% em relação a 2022, em todos os estados. As candidaturas de mulheres caíram 27%, e as de homens, 32%. A participação feminina subiu porque as candidaturas de homens caíram mais.",
    barras: [
      { rotulo: "Queda nas candidaturas de mulheres", valor: 27.1 },
      { rotulo: "Queda nas candidaturas de homens", valor: 31.7 },
    ],
    legenda: "Pedidos de registro para deputada e deputado, 2022 × 2026",
    fonte:
      "TSE, Candidatos 2022 e 2026 (base de 27/10/2026) · pedidos de registro. Em 2022, 9,6% terminaram inaptos; em 2026, 7,1% saíram por indeferimento, cancelamento ou renúncia",
    atualizadoEm: "2026-10-28",
    to: "/historico",
    linkLabel: "Ver no Histórico",
  },
  {
    id: "vice-de-quem",
    numero: "07",
    data: "2026-09-25",
    titulo: "Vice e suplência concentram mais mulheres do que as chapas titulares",
    texto:
      "Na base de 27/10, igual à de 25/09 nesse recorte, mulheres são 41,7% das candidaturas a vice-governadora e 17,4% das candidaturas a governadora. No Senado, são 30,4% das primeiras suplências e 22,4% das candidaturas a senadora. O snapshot atual não registra o sexo da cabeça da chapa, então não afirmamos aqui quantas vices ou suplentes estão em chapas encabeçadas por homens.",
    barras: [
      { rotulo: "Vice-governadora", valor: 41.7 },
      { rotulo: "Governadora", valor: 17.4 },
    ],
    legenda: "Mulheres entre as candidaturas a governo e vice-governo",
    fonte:
      "TSE, Candidaturas 2026 · base de 27/10/2026. Com substituição, vale o registro mais recente",
    atualizadoEm: "2026-10-28",
    to: "/quem-sao-elas",
    linkLabel: "Ver em Quem são elas",
  },
  {
    id: "pretas-sozinhas",
    numero: "08",
    data: "2026-09-25",
    titulo: "Candidatas pretas ao comando: um recorte que pede contexto",
    texto:
      "Foram 17 mulheres pretas candidatas a presidente, governadora ou senadora em 2026, todas com registro deferido. Nenhuma se elegeu: as 3 governadoras e as 12 senadoras eleitas são brancas ou pardas. A base não traz, de forma auditável, os campos necessários para atribuir diferenças entre essas candidaturas a partido, federação ou coligação.",
    barras: [],
    legenda: "Base de 17 candidaturas: só números absolutos",
    fonte: "TSE, Candidaturas 2026 e resultado final · base de 27/10/2026",
    atualizadoEm: "2026-10-28",
    to: "/quem-chega",
    linkLabel: "Ver em Quem chega",
  },
  {
    id: "governadoras-brancas",
    numero: "09",
    data: "2026-10-28",
    titulo: "Três governadoras em 27 estados, as três brancas",
    texto:
      "Depois do 2º turno, mulheres governam 3 das 27 unidades da federação: Pernambuco, Acre e Distrito Federal. As três se declaram brancas. Quatro mulheres chegaram ao 2º turno; duas venceram. A Presidência segue sem mulher eleita.",
    barras: [],
    legenda: "Base de 27 governos: só números absolutos",
    fonte: "TSE, Candidatos 2026, resultado final · base de 27/10/2026",
    to: "/quem-chega",
    linkLabel: "Ver em Quem chega",
  },
  {
    id: "fundo-eleitoral-cor",
    numero: "10",
    data: "2026-10-28",
    titulo: "O fundo eleitoral foi mais para candidaturas brancas",
    texto:
      "Candidaturas brancas são 50,1% das candidaturas titulares de 2026 e ficaram com 65,4% do fundo eleitoral que chegou às campanhas. Pardas são 34,9% e ficaram com 25,3%; pretas, 13,6% e 8,1%. Para as mulheres, o fundo ficou perto da presença: 35,2% das candidaturas, 33,3% do dinheiro.",
    barras: [
      { rotulo: "Brancas · candidaturas", valor: 50.1 },
      { rotulo: "Brancas · fundo", valor: 65.4 },
      { rotulo: "Pardas · candidaturas", valor: 34.9 },
      { rotulo: "Pardas · fundo", valor: 25.3 },
      { rotulo: "Pretas · candidaturas", valor: 13.6 },
      { rotulo: "Pretas · fundo", valor: 8.1 },
    ],
    legenda: "Candidaturas titulares e Fundo Especial de Financiamento de Campanha",
    fonte: "TSE, Candidaturas e Prestação de Contas 2026 · base de 27/10/2026, contas em andamento",
    to: "/dinheiro",
    linkLabel: "Ver em Dinheiro",
  },
  {
    id: "dinheiro-reeleicao",
    numero: "11",
    data: "2026-10-28",
    titulo: "Entre as deputadas que tentaram voltar, o dinheiro separou quem voltou",
    texto:
      "No terço de maior receita de campanha, 33 de 39 deputadas se reelegeram. No terço de menor receita, 4 de 17. Entre os homens, a diferença é menor: 76,5% e 47,9%. O voto em seis pautas da Câmara separou bem menos: a reeleição das deputadas variou entre 52,7% e 72,2%.",
    barras: [
      { rotulo: "Mulheres · mais receita", valor: 84.6 },
      { rotulo: "Mulheres · menos receita", valor: 23.5 },
      { rotulo: "Homens · mais receita", valor: 76.5 },
      { rotulo: "Homens · menos receita", valor: 47.9 },
    ],
    legenda: "Reeleição à Câmara por terço de receita, 2026",
    fonte: "Câmara dos Deputados; TSE, Candidatos e Prestação de Contas 2026 · base de 27/10/2026",
    to: "/como-votaram",
    linkLabel: "Ver em Como votaram",
  },
  {
    id: "senado-pl-um-terco",
    numero: "12",
    data: "2026-10-28",
    titulo: "O PL terá um terço do Senado a partir de 2027",
    texto: "O PL ganhou 19 das 54 vagas do Senado em 2026. Com as 8 cadeiras que já tem até 2031, deve começar 2027 com 27 das 81, contra 15 hoje: o número de assinaturas que a Constituição exige para criar uma CPI ou apresentar uma emenda constitucional no Senado. As senadoras passam de 15 para 19; 3 delas são do PL.",
    barras: [
      { rotulo: "PL hoje", valor: 18.5 },
      { rotulo: "PL 2027", valor: 33.3 },
      { rotulo: "Mulheres hoje", valor: 18.5 },
      { rotulo: "Mulheres 2027", valor: 23.5 },
    ],
    legenda: "Fatia das 81 cadeiras do Senado",
    fonte: "TSE, Candidatos 2026 · base de 27/10/2026; Senado Federal, Dados Abertos, consulta de 28/10/2026",
    to: "/quem-chega",
    linkLabel: "Ver em Quem chega",
  },
];

export const ACHADOS_RECENTES = [...ACHADOS].reverse().slice(0, 3);
