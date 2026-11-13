import type { TemaAchado } from "@/data/achados";

/**
 * temas — a espinha do site (12/11/2026).
 *
 * O site se organiza pelas camadas da representação política: quem chega
 * (presença), com que dinheiro, o que faz com o mandato (agenda), quem
 * controla as decisões (poder), a violência que barra o caminho e a memória
 * de quem abriu as portas. Cor/raça atravessa todos os temas como recorte
 * fixo, sempre com pretas e pardas separadas; por isso não é um tema à parte.
 *
 * Cada tema abre com um número-objeto (um dado desenhado como coisa: cadeiras,
 * pessoas, pilhas de processos) e reúne achados, votações, falas, reportagens
 * e as páginas de dados sobre o assunto. Este arquivo só liga conteúdo que já
 * existe; nenhum número é calculado aqui. Os números dos objetos saem dos
 * arquivos de dados, dentro de ObjetoTema.tsx.
 */
export type TemaSlug = "presenca" | "dinheiro" | "agenda" | "poder" | "violencia" | "memoria";

export type Tema = {
  slug: TemaSlug;
  /** número de ordem na revista */
  ordem: string;
  nome: string;
  /** a pergunta que o tema responde, em linguagem comum */
  pergunta: string;
  linha: string;
  /** a tese do tema em uma ou duas frases, com número (13/11/2026) */
  tese: string;
  /** atores e relações: quem decide o que o tema mede */
  quemDecide: { ator: string; decide: string }[];
  /** lacunas declaradas */
  naoSabemos: string[];
  achados: TemaAchado[];
  /** blocos de votacoes-camara.ts */
  votacoes: string[];
  /** ids de falas.ts (só entram as conferidas) */
  falas: string[];
  /** páginas de reportagem ou perfil que aprofundam o tema */
  leituras: { to: string; label: string; nota: string }[];
  /** páginas de dados para consulta */
  paginas: { to: string; hash?: string; label: string; nota: string }[];
};

export const TEMAS: readonly Tema[] = [
  {
    slug: "presenca",
    ordem: "01",
    nome: "Presença",
    pergunta: "Quem chega?",
    linha:
      "Da candidatura à cadeira: quantas mulheres disputam, quantas são eleitas e quais mulheres são, por cor/raça, cargo, partido e estado.",
    tese:
      "Mulheres chegam às listas pela cota e encolhem a cada etapa: são 36,8% das candidaturas à Câmara, 24,0% dos votos e 21,2% das cadeiras. E quanto mais alto o cargo, mais brancas elas são.",
    quemDecide: [
      { ator: "A direção de cada partido", decide: "quem entra na lista e quem recebe estrutura de campanha" },
      { ator: "A lei eleitoral e o TSE", decide: "o mínimo de 30% de candidaturas de cada gênero por partido e a punição quando ele é fraudado" },
      { ator: "O voto e o quociente eleitoral", decide: "quem, dentro de cada lista, vira cadeira" },
    ],
    naoSabemos: [
      "Quantas candidaturas de mulheres existiram só para cumprir a cota: isso depende de julgamento caso a caso na Justiça Eleitoral.",
      "Como cada partido montou a lista por dentro: critérios e atas internas não são públicos.",
    ],
    achados: ["cor-raca", "vices", "serie"],
    votacoes: [],
    falas: [],
    leituras: [{ to: "/eleitas", label: "Quem entrou", nota: "A ficha de cada eleita de 2026" }],
    paginas: [
      { to: "/votos", label: "Na urna", nota: "Candidatura, voto e cadeira" },
      { to: "/quem-chega", label: "Quem chega", nota: "As eleitas, casa por casa" },
      { to: "/quem-sao-elas", label: "Consultar candidatas", nota: "As candidatas por cor/raça, cargo e estado" },
      { to: "/funil", label: "O funil", nota: "Da candidatura ao poder" },
      { to: "/partidos", label: "Partido por partido", nota: "Candidatas e eleitas por sigla" },
      {
        to: "/historico",
        label: "A série desde 2014",
        nota: "O que mudou em relação às eleições anteriores",
      },
    ],
  },
  {
    slug: "dinheiro",
    ordem: "02",
    nome: "Dinheiro",
    pergunta: "Com que dinheiro?",
    linha:
      "Quem recebe o fundo eleitoral e a receita de campanha dentro do universo de mulheres, e o que isso tem a ver com quem volta ao mandato.",
    tese:
      "O dinheiro chega às mulheres e se concentra nas brancas e em quem já tem mandato: nas listas para deputada, brancas são 46,9% das candidatas com receita e ficam com 56,1% do dinheiro das mulheres.",
    quemDecide: [
      { ator: "A direção nacional de cada partido", decide: "como o fundo eleitoral é dividido entre as candidaturas" },
      { ator: "A Constituição e o TSE", decide: "os pisos de 30% do fundo para mulheres e de 30% para candidaturas pretas e pardas" },
      { ator: "A Justiça Eleitoral", decide: "o julgamento das contas e as sanções, depois da eleição" },
    ],
    naoSabemos: [
      "Por que cada partido dividiu o fundo como dividiu: os critérios internos não são públicos.",
      "Se o dinheiro elege ou se quem já ia ganhar atrai o dinheiro: o teste do observatório (04/11) não confirmou a segunda hipótese, e a pergunta segue aberta.",
    ],
    achados: ["dinheiro"],
    votacoes: [],
    falas: [],
    leituras: [
      {
        to: "/como-votaram",
        label: "Como votaram as deputadas, e quem voltou",
        nota: "Reportagem",
      },
    ],
    paginas: [
      { to: "/dinheiro", label: "Consultar o dinheiro", nota: "Receita, fundo eleitoral, gasto e vaquinhas" },
      {
        to: "/dinheiro",
        hash: "cor-raca",
        label: "Dinheiro por cor/raça",
        nota: "Para quem foi a receita entre as mulheres",
      },
      { to: "/partidos", label: "Partido por partido", nota: "O fundo dentro de cada sigla" },
    ],
  },
  {
    slug: "agenda",
    ordem: "03",
    nome: "Agenda",
    pergunta: "O que fazem com o mandato?",
    linha:
      "Como as deputadas votaram, o que assinaram juntas e o que disseram em público sobre os direitos das mulheres, deputada por deputada.",
    tese:
      "As deputadas votam diferente dos deputados e igual aos seus partidos: em seis votações, a fatia de Sim entre elas foi sempre menor, e no máximo 16 contrariaram a própria bancada. Mais mulheres mudam o plenário na medida em que mudam os partidos.",
    quemDecide: [
      { ator: "A Presidência da Câmara e o Colégio de Líderes", decide: "o que entra na pauta do plenário e quando" },
      { ator: "Os líderes de cada bancada", decide: "a orientação de voto do partido" },
      { ator: "A bancada feminina", decide: "tem assento no Colégio de Líderes para propor pauta" },
    ],
    naoSabemos: [
      "Por que cada deputada votou como votou: o motivo só entra quando ela mesma explica em público.",
      "O que acontece nas comissões: o observatório acompanha as votações nominais do plenário.",
    ],
    achados: ["agenda"],
    votacoes: ["Mulheres", "Povos indígenas", "Democracia"],
    falas: [
      "zanatta-2023-03-07",
      "kicis-2025-07-08",
      "zambelli-2024-03-05",
      "tonietto-2023-09-26",
      "ventura-2023-06-07",
    ],
    leituras: [
      {
        to: "/como-votaram",
        label: "Como votaram as deputadas, e quem voltou",
        nota: "Reportagem",
      },
      { to: "/na-voz-delas", label: "Na voz delas", nota: "Reportagem" },
    ],
    paginas: [
      {
        to: "/monitor",
        label: "Monitor de mandato",
        nota: "O que cada deputada registrou na Câmara",
      },
      { to: "/coautoria", label: "Quem assina junto", nota: "A rede de coautoria das deputadas" },
      { to: "/em-disputa", label: "Em disputa", nota: "As regras que valem e o que pode mudá-las" },
    ],
  },
  {
    slug: "poder",
    ordem: "04",
    nome: "Poder",
    pergunta: "Quem decide?",
    linha:
      "Ser eleita é diferente de controlar a pauta: governos, Senado, vice e suplência, e as decisões dos partidos. Mesas, comissões e lideranças entram depois da posse, em 2027.",
    tese:
      "Chegar é diferente de mandar: as senadoras passam de 15 para 19 das 81 cadeiras em 2027, num Senado em que o PL sozinho terá 28, mais do que todas as senadoras juntas.",
    quemDecide: [
      { ator: "A Mesa Diretora de cada Casa", decide: "a pauta do plenário e a administração" },
      { ator: "Os partidos, pelo tamanho da bancada", decide: "a divisão das presidências e das vagas nas comissões" },
      { ator: "Governos estaduais e Presidência", decide: "o primeiro escalão: quem vira secretária ou ministra" },
    ],
    naoSabemos: [
      "Quem vai presidir mesas, comissões e lideranças em 2027: a escolha começa em 01/02/2027, junto com o monitor do observatório.",
      "Quantas ministras terá o novo governo: os nomes saem a partir da segunda quinzena de novembro.",
    ],
    achados: ["poder"],
    votacoes: [],
    falas: [],
    leituras: [],
    paginas: [
      { to: "/quem-controla", label: "Quem controla?", nota: "As decisões dos partidos" },
      {
        to: "/quem-chega",
        hash: "senado",
        label: "O Senado de 2027",
        nota: "As cadeiras, uma a uma",
      },
      { to: "/funil", label: "O funil", nota: "Da candidatura ao poder" },
    ],
  },
  {
    slug: "violencia",
    ordem: "05",
    nome: "Violência política",
    pergunta: "O que barra o caminho?",
    linha:
      "Processos de violência política de gênero na Justiça Eleitoral, feminicídio e o que as eleitas disseram sobre o assunto.",
    tese:
      "O preço de participar subiu: os processos de violência política de gênero na Justiça Eleitoral foram de 15 em 2022 para 224 em 2026, até 23/10.",
    quemDecide: [
      { ator: "O Ministério Público Eleitoral", decide: "a denúncia pelo crime de violência política de gênero" },
      { ator: "A Polícia Federal", decide: "os inquéritos de crime eleitoral" },
      { ator: "A Justiça Eleitoral", decide: "o julgamento de cada processo" },
    ],
    naoSabemos: [
      "Quantos casos e quantas vítimas: o painel conta processos, e um mesmo episódio pode gerar vários.",
      "Como terminou cada processo: o painel não traz o desfecho.",
    ],
    achados: ["violencia"],
    votacoes: [],
    falas: ["zanatta-2026-03-10", "kicis-2023-12-21"],
    leituras: [{ to: "/na-voz-delas", label: "Na voz delas", nota: "Reportagem" }],
    paginas: [
      { to: "/barreiras", label: "Barreiras", nota: "Violência política e contra mulheres" },
    ],
  },
  {
    slug: "memoria",
    ordem: "06",
    nome: "Memória",
    pergunta: "Quem abriu o caminho?",
    linha:
      "As leis e decisões que mudaram o acesso das mulheres às urnas, de 1932 a 2026, e os perfis das pioneiras, sempre com o documento ao lado.",
    tese:
      "Nenhum direito político das mulheres veio de uma vez: do voto, em 1932, à primeira cota, em 1995, passaram 63 anos, 49 deles sem nenhum marco.",
    quemDecide: [
      { ator: "O Congresso Nacional", decide: "as leis: voto, cotas, punição da violência política" },
      { ator: "O TSE e o STF", decide: "a interpretação das regras, como a punição por fraude à cota" },
      { ator: "Os movimentos de mulheres", decide: "a pressão por cada marco, contada nos perfis de Pioneiras" },
    ],
    naoSabemos: [
      "A série do observatório com dados do TSE começa em 2014; antes disso, a contagem depende de outras fontes.",
    ],
    achados: ["memoria"],
    votacoes: [],
    falas: [],
    leituras: [
      { to: "/pioneiras/pagu", label: "Patrícia Galvão, a Pagu", nota: "Perfil" },
      { to: "/pioneiras/lelia-gonzalez", label: "Lélia Gonzalez", nota: "Perfil" },
    ],
    paginas: [
      { to: "/direitos", label: "Direitos", nota: "Os marcos, de 1932 a 2026" },
      { to: "/pioneiras", label: "Pioneiras", nota: "Todos os perfis" },
    ],
  },
];

/** endereços antigos de tema (antes de 12/11/2026) e para onde vão agora */
export const TEMAS_ANTIGOS: Record<string, TemaSlug> = {
  "cor-e-raca": "presenca",
  direitos: "agenda",
  democracia: "agenda",
};
