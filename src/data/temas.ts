import type { TemaAchado } from "@/data/achados";

/**
 * temas — páginas de tema (02/11/2026): cada tema junta, num só lugar, os
 * achados, as votações, as reportagens e as páginas do site sobre o mesmo
 * assunto. Só liga conteúdo que já existe; nenhum número é calculado aqui.
 */
export type Tema = {
  slug: "cor-e-raca" | "dinheiro" | "poder" | "direitos" | "democracia" | "violencia";
  nome: string;
  linha: string;
  achados: TemaAchado[];
  /** blocos de votacoes-camara.ts */
  votacoes: string[];
  /** ids de falas.ts (só entram as conferidas) */
  falas: string[];
  paginas: { to: string; hash?: string; label: string; nota: string }[];
};

export const TEMAS: readonly Tema[] = [
  {
    slug: "cor-e-raca",
    nome: "Cor e raça",
    linha: "Quais mulheres chegam, e quais ficam pelo caminho: branca, preta, parda, indígena e amarela, sempre separadas.",
    achados: ["cor-raca"],
    votacoes: [],
    falas: [],
    paginas: [
      { to: "/quem-sao-elas", label: "Quem são elas?", nota: "As candidatas por cor/raça e cargo" },
      { to: "/quem-chega", label: "Quem chega", nota: "As eleitas por cor/raça" },
      { to: "/dinheiro", hash: "cor-raca", label: "Dinheiro por cor/raça", nota: "Para quem foi a receita entre as mulheres" },
      { to: "/historico", label: "Histórico", nota: "A série desde 2014" },
      { to: "/pioneiras/lelia-gonzalez", label: "Lélia Gonzalez", nota: "Perfil" },
    ],
  },
  {
    slug: "dinheiro",
    nome: "Dinheiro de campanha",
    linha: "Quem recebe o fundo eleitoral e a receita declarada, e o que isso tem a ver com quem volta ao mandato.",
    achados: ["dinheiro"],
    votacoes: [],
    falas: [],
    paginas: [
      { to: "/dinheiro", label: "Dinheiro", nota: "Receita, fundo eleitoral, gasto e vaquinhas" },
      { to: "/partidos", label: "Partido por partido", nota: "O fundo dentro de cada sigla" },
      { to: "/como-votaram", label: "Como votaram", nota: "Receita e reeleição das deputadas" },
    ],
  },
  {
    slug: "poder",
    nome: "Quem manda a partir de 2027",
    linha: "As cadeiras, os governos, o Senado e as posições de vice e suplência, onde as mulheres aparecem quando não encabeçam a chapa.",
    achados: ["poder", "vices", "serie"],
    votacoes: [],
    falas: [],
    paginas: [
      { to: "/quem-chega", label: "Quem chega", nota: "As eleitas, casa por casa" },
      { to: "/funil", label: "O funil", nota: "Da candidatura ao poder" },
      { to: "/quem-controla", label: "Quem controla?", nota: "As decisões dos partidos" },
      { to: "/votos", label: "Na urna", nota: "Candidatura, voto e cadeira" },
    ],
  },
  {
    slug: "direitos",
    nome: "Direitos em disputa",
    linha: "As leis e votações que mexem com a vida das mulheres e dos povos indígenas, e o que as deputadas disseram e votaram.",
    achados: [],
    votacoes: ["Mulheres", "Povos indígenas"],
    falas: ["zanatta-2023-03-07", "kicis-2025-07-08", "zambelli-2024-03-05", "tonietto-2023-09-26", "ventura-2023-06-07"],
    paginas: [
      { to: "/direitos", label: "Direitos", nota: "Os marcos de 1932 a 2026" },
      { to: "/em-disputa", label: "Em disputa", nota: "Regras e projetos em tramitação" },
      { to: "/como-votaram", label: "Como votaram", nota: "Seis votações, deputada por deputada" },
      { to: "/na-voz-delas", label: "Na voz delas", nota: "O que disseram, com o dado ao lado" },
    ],
  },
  {
    slug: "democracia",
    nome: "Democracia",
    linha: "Votações sobre o 8 de janeiro e as prerrogativas de parlamentares, deputada por deputada.",
    achados: [],
    votacoes: ["Democracia"],
    falas: [],
    paginas: [{ to: "/como-votaram", label: "Como votaram", nota: "Seis votações, deputada por deputada" }],
  },
  {
    slug: "violencia",
    nome: "Violência política e contra mulheres",
    linha: "Processos de violência política de gênero na Justiça Eleitoral e o que as eleitas disseram sobre feminicídio.",
    achados: [],
    votacoes: [],
    falas: ["zanatta-2026-03-10", "kicis-2023-12-21"],
    paginas: [
      { to: "/barreiras", label: "Barreiras", nota: "Violência política e contra mulheres" },
      { to: "/na-voz-delas", label: "Na voz delas", nota: "O que disseram, com o dado ao lado" },
    ],
  },
];
