export type AchadoBarra = { rotulo: string; valor: number };

export type Achado = {
  id: string;
  numero: string;
  data: string;
  titulo: string;
  texto: string;
  barras: AchadoBarra[];
  legenda: string;
  fonte: string;
  to: "/quem-sao-elas" | "/dinheiro" | "/historico";
  linkLabel: string;
};

export const ACHADOS: Achado[] = [
  {
    id: "quanto-mais-alto-mais-brancas",
    numero: "01",
    data: "2026-09-25",
    titulo: "A cor das candidatas muda com o cargo em disputa",
    texto: "Brancas são 46,8% das candidatas a deputada e 60,7% das candidatas a presidente, governadora e senadora. As pardas fazem o caminho inverso: 34,2% das candidatas a deputada e 22,4% nas candidaturas majoritárias. As pretas são 17,2% e 15,9%.",
    barras: [
      { rotulo: "Deputada", valor: 46.8 },
      { rotulo: "Majoritárias", valor: 60.7 },
    ],
    legenda: "Brancas entre as candidatas",
    fonte: "TSE, Candidaturas 2026 · base de 25/09/2026",
    to: "/quem-sao-elas",
    linkLabel: "Ver em Quem são elas",
  },
  {
    id: "dinheiro-brancas-peso",
    numero: "02",
    data: "2026-09-25",
    titulo: "No dinheiro, as candidatas brancas ficam com mais do que o seu peso",
    texto: "Nas listas para deputada, brancas são 47,0% das candidatas com receita declarada e ficam com 55,7% do dinheiro das mulheres. Pardas são 33,9% e ficam com 27,8%; pretas, 17,3% e 14,5%.",
    barras: [
      { rotulo: "Brancas · candidatas", valor: 47.0 },
      { rotulo: "Brancas · receita", valor: 55.7 },
      { rotulo: "Pardas · candidatas", valor: 33.9 },
      { rotulo: "Pardas · receita", valor: 27.8 },
      { rotulo: "Pretas · candidatas", valor: 17.3 },
      { rotulo: "Pretas · receita", valor: 14.5 },
    ],
    legenda: "Candidatas a deputada com receita declarada",
    fonte: "TSE, Candidaturas e Prestação de Contas 2026 · base de 25/09/2026, contas em andamento",
    to: "/dinheiro",
    linkLabel: "Ver em Dinheiro",
  },
  {
    id: "vice-desde-2014",
    numero: "03",
    data: "2026-09-25",
    titulo: "Vice, desde 2014, e cada vez mais",
    texto: "Em 2014, mulheres eram 12,0% das candidaturas a governadora e 24,0% das candidaturas a vice. Em 2026, são 17,4% e 41,7%. A distância entre titular e vice dobrou: de 12 para 24 pontos percentuais.",
    barras: [
      { rotulo: "Governadora 2014", valor: 12.0 },
      { rotulo: "Vice 2014", valor: 24.0 },
      { rotulo: "Governadora 2026", valor: 17.4 },
      { rotulo: "Vice 2026", valor: 41.7 },
    ],
    legenda: "Mulheres entre as candidaturas a governo",
    fonte: "TSE, Candidatos 2014 e 2026",
    to: "/quem-sao-elas",
    linkLabel: "Ver em Quem são elas",
  },
  {
    id: "vice-nao-titular",
    numero: "04",
    data: "2026-09-25",
    titulo: "Vice, não titular",
    texto: "Nos governos estaduais, mulheres são 35 das 201 candidaturas a governadora (17,4%) e 88 das 211 a vice (41,7%). Na Presidência, são 2 das 14 titulares e 6 das 14 vices.",
    barras: [
      { rotulo: "Governadora", valor: 17.4 },
      { rotulo: "Vice-governadora", valor: 41.7 },
    ],
    legenda: "Mulheres entre as candidaturas",
    fonte: "TSE, Candidaturas 2026 · base de 25/09/2026",
    to: "/quem-sao-elas",
    linkLabel: "Ver em Quem são elas",
  },
  {
    id: "candidatar-se-nao-e-eleger-se",
    numero: "05",
    data: "2026-09-25",
    titulo: "Candidatar-se não é eleger-se",
    texto: "Em 2022, 1 em cada 34 candidatas a deputada se elegeu. Entre os homens, 1 em cada 14.",
    barras: [
      {
        rotulo: "Candidatas eleitas",
        valor: 2.9,
      },
      {
        rotulo: "Candidatos eleitos",
        valor: 7.0,
      },
    ],
    legenda: "Taxa de eleição para deputada e deputado, 2022",
    fonte: "TSE, Candidatos 2022",
    to: "/historico",
    linkLabel: "Ver no Histórico",
  },
  {
    id: "menos-candidatas-que-2022",
    numero: "06",
    data: "2026-09-25",
    titulo: "2.581 candidatas a menos que em 2022",
    texto: "Os pedidos de registro para deputada e deputado caíram 30% em relação a 2022, em todos os estados. As candidaturas de mulheres caíram 27%, e as de homens, 32%. A presença feminina subiu porque as candidaturas de homens caíram mais.",
    barras: [
      { rotulo: "Queda nas candidaturas de mulheres", valor: 27.1 },
      { rotulo: "Queda nas candidaturas de homens", valor: 31.7 },
    ],
    legenda: "Pedidos de registro para deputada e deputado, 2022 × 2026",
    fonte: "TSE, Candidatos 2022 e 2026 · pedidos de registro. Em 2022, 9,6% terminaram inaptos; 2026 ainda sem situação informada",
    to: "/historico",
    linkLabel: "Ver no Histórico",
  },
  {
    id: "vice-de-quem",
    numero: "07",
    data: "2026-09-25",
    titulo: "Vice e suplência concentram mais mulheres do que as chapas titulares",
    texto: "Na fotografia de 25/09, mulheres são 41,7% das candidaturas a vice-governadora e 17,4% das candidaturas a governadora. No Senado, são 31,6% das primeiras suplências e 22,4% das candidaturas a senadora. O snapshot atual não registra o sexo da cabeça da chapa, então não afirmamos aqui quantas vices ou suplentes estão em chapas encabeçadas por homens.",
    barras: [
      { rotulo: "Vice-governadora", valor: 41.7 },
      { rotulo: "Governadora", valor: 17.4 },
    ],
    legenda: "Mulheres entre as candidaturas a governo e vice-governo",
    fonte: "TSE, Candidaturas 2026 · base de 25/09/2026. Com substituição, vale o registro mais recente",
    to: "/quem-sao-elas",
    linkLabel: "Ver em Quem são elas",
  },
  {
    id: "pretas-sozinhas",
    numero: "08",
    data: "2026-09-25",
    titulo: "Candidatas pretas ao comando: um recorte que pede contexto",
    texto: "Na fotografia de 25/09, há 17 mulheres pretas candidatas a presidente, governadora ou senadora. No recorte financeiro, elas declararam receita de campanha em valores que variam amplamente entre as candidaturas. Esta peça não atribui a diferença a partido, federação ou coligação porque o snapshot atual do observatório não traz esse campo de forma auditável.",
    barras: [],
    legenda: "Base de 17 candidaturas: só números absolutos",
    fonte: "TSE, Candidaturas e Prestação de Contas 2026 · base de 25/09/2026, contas em andamento",
    to: "/dinheiro",
    linkLabel: "Ver em Dinheiro",
  },
];

export const ACHADOS_RECENTES = [...ACHADOS].reverse().slice(0, 3);