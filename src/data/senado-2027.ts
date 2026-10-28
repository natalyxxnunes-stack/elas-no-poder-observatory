/**
 * senado-2027 — composição prevista do Senado a partir de 1º/02/2027, CRAVADA
 * em código.
 *
 * 54 cadeiras: eleitas e eleitos em 2026 (TSE, Candidatos 2026, base de
 * 27/10/2026), pelo partido do registro.
 * 27 cadeiras: mandatos de 2023 a 2031, pela lista de quem está em exercício
 * (API de Dados Abertos do Senado, /senador/lista/atual, consulta de
 * 28/10/2026), com o partido atual. Dois desses senadores foram eleitos
 * governadores em 2026 (Omar Aziz, AM, e Sergio Moro, PR); no lugar deles entra
 * o 1º suplente. A API não informa o partido do 1º suplente de Sergio Moro.
 *
 * Previsão: a composição muda com trocas de partido, licenças e retorno de
 * titulares (Ana Paula Lobato e Jussara Lima exercem hoje o mandato como
 * suplentes). Comparação: hoje (28/10/2026), PL 15 cadeiras e 15 mulheres.
 */

export type CadeiraSenado = {
  nome: string;
  partido: string;
  uf: string;
  genero: "F" | "M";
  origem: string;
  raca: string | null;
};

export const SENADO_2027_META = {
  consultaSenado: "28/10/2026",
  baseTse: "27/10/2026 19:30:36",
  hoje: { pl: 15, mulheres: 15 },
} as const;

export const SENADO_2027: CadeiraSenado[] = [
 {
  "nome": "Rogerio Carvalho",
  "partido": "PT",
  "uf": "SE",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "BRANCA"
 },
 {
  "nome": "Carlos Portinho",
  "partido": "PL",
  "uf": "RJ",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "BRANCA"
 },
 {
  "nome": "Nicoletti",
  "partido": "PL",
  "uf": "RR",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "BRANCA"
 },
 {
  "nome": "Gracinha Caiado",
  "partido": "UNIÃO",
  "uf": "GO",
  "genero": "F",
  "origem": "eleito em 2026",
  "raca": "BRANCA"
 },
 {
  "nome": "Marcio Bittar",
  "partido": "PL",
  "uf": "AC",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "PARDA"
 },
 {
  "nome": "Humberto Costa",
  "partido": "PT",
  "uf": "PE",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "PARDA"
 },
 {
  "nome": "Marília Arraes",
  "partido": "PDT",
  "uf": "PE",
  "genero": "F",
  "origem": "eleito em 2026",
  "raca": "BRANCA"
 },
 {
  "nome": "Rui Costa",
  "partido": "PT",
  "uf": "BA",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "PARDA"
 },
 {
  "nome": "Fufuca",
  "partido": "PP",
  "uf": "MA",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "PARDA"
 },
 {
  "nome": "Carlos Jordy",
  "partido": "PL",
  "uf": "RJ",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "BRANCA"
 },
 {
  "nome": "Marcelo Castro",
  "partido": "MDB",
  "uf": "PI",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "BRANCA"
 },
 {
  "nome": "Júlio César O Julim Do Lula",
  "partido": "PSD",
  "uf": "PI",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "BRANCA"
 },
 {
  "nome": "Rayssa Furlan",
  "partido": "PODE",
  "uf": "AP",
  "genero": "F",
  "origem": "eleito em 2026",
  "raca": "PARDA"
 },
 {
  "nome": "Teresa Surita",
  "partido": "MDB",
  "uf": "RR",
  "genero": "F",
  "origem": "eleito em 2026",
  "raca": "BRANCA"
 },
 {
  "nome": "Veneziano",
  "partido": "MDB",
  "uf": "PB",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "BRANCA"
 },
 {
  "nome": "Cid Gomes",
  "partido": "PSB",
  "uf": "CE",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "BRANCA"
 },
 {
  "nome": "Michelle Bolsonaro",
  "partido": "PL",
  "uf": "DF",
  "genero": "F",
  "origem": "eleito em 2026",
  "raca": "BRANCA"
 },
 {
  "nome": "Bia Kicis",
  "partido": "PL",
  "uf": "DF",
  "genero": "F",
  "origem": "eleito em 2026",
  "raca": "BRANCA"
 },
 {
  "nome": "Guilherme Derrite",
  "partido": "PP",
  "uf": "SP",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "BRANCA"
 },
 {
  "nome": "Reinaldo Azambuja",
  "partido": "PL",
  "uf": "MS",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "BRANCA"
 },
 {
  "nome": "Plinio Valério",
  "partido": "PSDB",
  "uf": "AM",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "PARDA"
 },
 {
  "nome": "Evair de Melo",
  "partido": "REPUBLICANOS",
  "uf": "ES",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "PARDA"
 },
 {
  "nome": "Samanda de Lula",
  "partido": "PT",
  "uf": "RN",
  "genero": "F",
  "origem": "eleito em 2026",
  "raca": "BRANCA"
 },
 {
  "nome": "Marcel Van Hattem",
  "partido": "NOVO",
  "uf": "RS",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "BRANCA"
 },
 {
  "nome": "Mara Rocha",
  "partido": "REPUBLICANOS",
  "uf": "AC",
  "genero": "F",
  "origem": "eleito em 2026",
  "raca": "BRANCA"
 },
 {
  "nome": "Marina JHC",
  "partido": "PSDB",
  "uf": "AL",
  "genero": "F",
  "origem": "eleito em 2026",
  "raca": "BRANCA"
 },
 {
  "nome": "Delegado Alessandro",
  "partido": "MDB",
  "uf": "SE",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "PARDA"
 },
 {
  "nome": "Dr. Fernando Máximo",
  "partido": "PL",
  "uf": "RO",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "PARDA"
 },
 {
  "nome": "Capitão Contar",
  "partido": "PL",
  "uf": "MS",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "BRANCA"
 },
 {
  "nome": "Filipe Barros",
  "partido": "PL",
  "uf": "PR",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "BRANCA"
 },
 {
  "nome": "Mauro Mendes",
  "partido": "UNIÃO",
  "uf": "MT",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "BRANCA"
 },
 {
  "nome": "Bruno Scheid",
  "partido": "PL",
  "uf": "RO",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "PARDA"
 },
 {
  "nome": "Domingos Sávio",
  "partido": "PL",
  "uf": "MG",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "BRANCA"
 },
 {
  "nome": "Alexandre Guimarães",
  "partido": "MDB",
  "uf": "TO",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "BRANCA"
 },
 {
  "nome": "Eduardo Gomes",
  "partido": "PL",
  "uf": "TO",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "BRANCA"
 },
 {
  "nome": "Gustavo Gayer",
  "partido": "PL",
  "uf": "GO",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "BRANCA"
 },
 {
  "nome": "Luizianne",
  "partido": "REDE",
  "uf": "CE",
  "genero": "F",
  "origem": "eleito em 2026",
  "raca": "BRANCA"
 },
 {
  "nome": "Zé Medeiros",
  "partido": "PL",
  "uf": "MT",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "BRANCA"
 },
 {
  "nome": "Carol de Toni",
  "partido": "PL",
  "uf": "SC",
  "genero": "F",
  "origem": "eleito em 2026",
  "raca": "BRANCA"
 },
 {
  "nome": "Carlos Bolsonaro",
  "partido": "PL",
  "uf": "SC",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "BRANCA"
 },
 {
  "nome": "Lahesio Bonfim",
  "partido": "NOVO",
  "uf": "MA",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "PARDA"
 },
 {
  "nome": "Chicão",
  "partido": "UNIÃO",
  "uf": "PA",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "PARDA"
 },
 {
  "nome": "Marília Campos",
  "partido": "PT",
  "uf": "MG",
  "genero": "F",
  "origem": "eleito em 2026",
  "raca": "PARDA"
 },
 {
  "nome": "Lucas Barreto",
  "partido": "PSD",
  "uf": "AP",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "BRANCA"
 },
 {
  "nome": "Styvenson Valentim",
  "partido": "PODE",
  "uf": "RN",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "PARDA"
 },
 {
  "nome": "Sanderson",
  "partido": "PL",
  "uf": "RS",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "BRANCA"
 },
 {
  "nome": "Joao Azevêdo",
  "partido": "PSB",
  "uf": "PB",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "BRANCA"
 },
 {
  "nome": "Helder",
  "partido": "MDB",
  "uf": "PA",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "BRANCA"
 },
 {
  "nome": "André Do Prado",
  "partido": "PL",
  "uf": "SP",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "BRANCA"
 },
 {
  "nome": "Deltan Dallagnol",
  "partido": "NOVO",
  "uf": "PR",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "BRANCA"
 },
 {
  "nome": "Jaques Wagner",
  "partido": "PT",
  "uf": "BA",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "BRANCA"
 },
 {
  "nome": "Eduardo Braga",
  "partido": "MDB",
  "uf": "AM",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "PARDA"
 },
 {
  "nome": "Renato Casagrande",
  "partido": "PSB",
  "uf": "ES",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "BRANCA"
 },
 {
  "nome": "Arthur Lira",
  "partido": "PP",
  "uf": "AL",
  "genero": "M",
  "origem": "eleito em 2026",
  "raca": "PARDA"
 },
 {
  "nome": "Alan Rick",
  "partido": "REPUBLICANOS",
  "uf": "AC",
  "genero": "M",
  "origem": "mandato até 2031",
  "raca": null
 },
 {
  "nome": "Ana Paula Lobato",
  "partido": "PSB",
  "uf": "MA",
  "genero": "F",
  "origem": "mandato até 2031 (1º Suplente)",
  "raca": null
 },
 {
  "nome": "Astronauta Marcos Pontes",
  "partido": "PL",
  "uf": "SP",
  "genero": "M",
  "origem": "mandato até 2031",
  "raca": null
 },
 {
  "nome": "Beto Faro",
  "partido": "PT",
  "uf": "PA",
  "genero": "M",
  "origem": "mandato até 2031",
  "raca": null
 },
 {
  "nome": "Camilo Santana",
  "partido": "PT",
  "uf": "CE",
  "genero": "M",
  "origem": "mandato até 2031",
  "raca": null
 },
 {
  "nome": "Cleitinho",
  "partido": "REPUBLICANOS",
  "uf": "MG",
  "genero": "M",
  "origem": "mandato até 2031",
  "raca": null
 },
 {
  "nome": "Damares Alves",
  "partido": "REPUBLICANOS",
  "uf": "DF",
  "genero": "F",
  "origem": "mandato até 2031",
  "raca": null
 },
 {
  "nome": "Davi Alcolumbre",
  "partido": "UNIÃO",
  "uf": "AP",
  "genero": "M",
  "origem": "mandato até 2031",
  "raca": null
 },
 {
  "nome": "Dr. Hiran",
  "partido": "PP",
  "uf": "RR",
  "genero": "M",
  "origem": "mandato até 2031",
  "raca": null
 },
 {
  "nome": "Efraim Filho",
  "partido": "PL",
  "uf": "PB",
  "genero": "M",
  "origem": "mandato até 2031",
  "raca": null
 },
 {
  "nome": "Hamilton Mourão",
  "partido": "REPUBLICANOS",
  "uf": "RS",
  "genero": "M",
  "origem": "mandato até 2031",
  "raca": null
 },
 {
  "nome": "Jaime Bagattoli",
  "partido": "PL",
  "uf": "RO",
  "genero": "M",
  "origem": "mandato até 2031",
  "raca": null
 },
 {
  "nome": "Jorge Seif",
  "partido": "PL",
  "uf": "SC",
  "genero": "M",
  "origem": "mandato até 2031",
  "raca": null
 },
 {
  "nome": "Jussara Lima",
  "partido": "PSD",
  "uf": "PI",
  "genero": "F",
  "origem": "mandato até 2031 (1º Suplente)",
  "raca": null
 },
 {
  "nome": "Laércio Oliveira",
  "partido": "PP",
  "uf": "SE",
  "genero": "M",
  "origem": "mandato até 2031",
  "raca": null
 },
 {
  "nome": "Magno Malta",
  "partido": "PL",
  "uf": "ES",
  "genero": "M",
  "origem": "mandato até 2031",
  "raca": null
 },
 {
  "nome": "Cheila Moreira",
  "partido": "PT",
  "uf": "AM",
  "genero": "F",
  "origem": "mandato até 2031 (1ª suplente de Omar Aziz, eleito governador do AM)",
  "raca": null
 },
 {
  "nome": "Otto Alencar",
  "partido": "PSD",
  "uf": "BA",
  "genero": "M",
  "origem": "mandato até 2031",
  "raca": null
 },
 {
  "nome": "Professora Dorinha Seabra",
  "partido": "UNIÃO",
  "uf": "TO",
  "genero": "F",
  "origem": "mandato até 2031",
  "raca": null
 },
 {
  "nome": "Renan Filho",
  "partido": "MDB",
  "uf": "AL",
  "genero": "M",
  "origem": "mandato até 2031",
  "raca": null
 },
 {
  "nome": "Rogerio Marinho",
  "partido": "PL",
  "uf": "RN",
  "genero": "M",
  "origem": "mandato até 2031",
  "raca": null
 },
 {
  "nome": "Romário",
  "partido": "S/Partido",
  "uf": "RJ",
  "genero": "M",
  "origem": "mandato até 2031",
  "raca": null
 },
 {
  "nome": "Luis Felipe Cunha",
  "partido": "sem partido informado",
  "uf": "PR",
  "genero": "M",
  "origem": "mandato até 2031 (1º suplente de Sergio Moro, eleito governador do PR)",
  "raca": null
 },
 {
  "nome": "Teresa Leitão",
  "partido": "PT",
  "uf": "PE",
  "genero": "F",
  "origem": "mandato até 2031",
  "raca": null
 },
 {
  "nome": "Tereza Cristina",
  "partido": "PP",
  "uf": "MS",
  "genero": "F",
  "origem": "mandato até 2031",
  "raca": null
 },
 {
  "nome": "Wellington Fagundes",
  "partido": "PL",
  "uf": "MT",
  "genero": "M",
  "origem": "mandato até 2031",
  "raca": null
 },
 {
  "nome": "Wilder Morais",
  "partido": "PL",
  "uf": "GO",
  "genero": "M",
  "origem": "mandato até 2031",
  "raca": null
 }
] as CadeiraSenado[];
