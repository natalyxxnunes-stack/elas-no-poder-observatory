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
    achados: ["cor-raca", "vices", "serie"],
    votacoes: [],
    falas: [],
    leituras: [{ to: "/eleitas", label: "Quem entrou", nota: "A ficha de cada eleita de 2026" }],
    paginas: [
      { to: "/votos", label: "Na urna", nota: "Candidatura, voto e cadeira" },
      { to: "/quem-chega", label: "Quem chega", nota: "As eleitas, casa por casa" },
      { to: "/quem-sao-elas", label: "Quem são elas?", nota: "As candidatas por cor/raça e cargo" },
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
      { to: "/dinheiro", label: "Dinheiro", nota: "Receita, fundo eleitoral, gasto e vaquinhas" },
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
    achados: [],
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
    achados: [],
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
    achados: [],
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
