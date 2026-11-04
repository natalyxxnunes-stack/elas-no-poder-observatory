/**
 * hipoteses — registro público das hipóteses do observatório: explicações
 * possíveis que os dados publicados ainda não testam. Cada uma aparece na
 * página de origem (componente Registro) e aqui, com a data em que foi
 * registrada e o status. Ao testar, o status muda aqui e na página, com o
 * desfecho e a data, e a mudança entra no registro de correções.
 */
import type { StatusHipotese } from "@/components/editorial/Registro";

export type Hipotese = {
  id: string;
  registradaEm: string;
  status: StatusHipotese;
  texto: string;
  /** o que falta para testar */
  teste: string;
  /** quando o teste fica possível, se depende de dado ou data */
  testavel?: string;
  onde: { pagina: string; to: string };
  desfecho?: string;
};

export const HIPOTESES: readonly Hipotese[] = [
  {
    id: "parda-abaixo-do-censo",
    registradaEm: "15/08/2026",
    status: "aberta",
    texto:
      "A candidatura parda fica abaixo do peso da população parda por causa da declaração de cor/raça, da seleção dos partidos ou da composição das listas.",
    teste: "Cruzar a autodeclaração das mesmas pessoas entre eleições e comparar as listas partido a partido.",
    onde: { pagina: "Quem são elas?", to: "/quem-sao-elas#censo" },
  },
  {
    id: "vice-sem-cabeca",
    registradaEm: "02/11/2026",
    status: "aberta",
    texto: "Os partidos usam a vaga de vice para incluir mulheres na chapa sem ceder a cabeça dela.",
    teste: "Registrar o sexo de quem encabeça cada chapa e comparar com o sexo de quem ocupa a vice.",
    onde: { pagina: "Quem são elas?", to: "/quem-sao-elas#cargos" },
  },
  {
    id: "dinheiro-votos-diferenca",
    registradaEm: "14/10/2026",
    status: "aberta",
    texto: "Parte da diferença entre candidatas e eleitas acompanha a distribuição de dinheiro de campanha e de votos entre os grupos.",
    teste: "Cruzar receita, voto e resultado por candidatura, por gênero e cor/raça.",
    testavel: "Testável com a prestação final do 1º turno, entregue em 03/11/2026.",
    onde: { pagina: "Quem chega", to: "/quem-chega#raca" },
  },
  {
    id: "funil-proporcional",
    registradaEm: "14/10/2026",
    status: "aberta",
    texto:
      "A queda da fatia de mulheres entre as candidaturas e as cadeiras passa pelo voto, pelo quociente partidário e pelo dinheiro de campanha.",
    teste: "Separar o peso de cada etapa: voto recebido, posição na lista do partido e receita.",
    testavel: "Testável com a prestação final do 1º turno.",
    onde: { pagina: "O funil", to: "/funil#etapas" },
  },
  {
    id: "dinheiro-reeleicao-causa",
    registradaEm: "27/10/2026",
    status: "aberta",
    texto:
      "Parte da relação entre receita e reeleição corre ao contrário: quem já tinha base e chance de vencer atrai mais dinheiro do partido e de doadores.",
    teste: "Saber quanto veio do partido e em que momento da campanha, antes ou depois das pesquisas.",
    testavel: "Testável com a prestação final do 1º turno, que traz a data de cada receita.",
    onde: { pagina: "No plenário", to: "/como-votaram#quem-voltou" },
  },
  {
    id: "pagu-psb",
    registradaEm: "29/10/2026",
    status: "aberta",
    texto: "A votação baixa de Pagu em 1950 tem mais a ver com o tamanho do PSB em São Paulo do que com o fato de ela ser mulher.",
    teste: "Comparar com outras eleições e partidos da época.",
    onde: { pagina: "Pioneiras: Pagu", to: "/pioneiras/pagu" },
  },
  {
    id: "lelia-lista",
    registradaEm: "30/10/2026",
    status: "aberta",
    texto: "A posição de uma mulher negra dentro da lista do partido pode pesar tanto quanto o total de votos que ela recebe.",
    teste: "Comparar a posição de candidatas e candidatos negros nas listas das grandes legendas em 2026.",
    testavel: "Já testável: o arquivo de 2026 registra cor/raça e votação de cada candidatura.",
    onde: { pagina: "Pioneiras: Lélia Gonzalez", to: "/pioneiras/lelia-gonzalez" },
  },
  {
    id: "coautoria-ano-eleitoral",
    registradaEm: "04/11/2026",
    status: "aberta",
    texto: "Em ano eleitoral, assinar projeto sozinha rende mais visibilidade individual do que dividir a autoria.",
    teste: "Comparar com 2023, ano sem eleição, com a mesma regra de contagem.",
    testavel: "Já testável: os dados abertos da Câmara cobrem 2023.",
    onde: { pagina: "Quem assina junto", to: "/coautoria" },
  },
];
