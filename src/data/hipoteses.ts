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
    status: "confirmada",
    texto: "Parte da diferença entre candidatas e eleitas acompanha a distribuição de dinheiro de campanha e de votos entre os grupos.",
    teste:
      "Regra fixada em 04/11/2026, antes de rodar, e publicada no repositório (scripts/recontagem/teste_dinheiro_2026.py). Entre as candidatas a deputada, comparar a fatia de brancas, pardas e pretas nas candidaturas, na receita, nos votos e entre as eleitas. Confirma se, nos três grupos, receita e votos se afastam das candidaturas no mesmo sentido que as eleitas.",
    onde: { pagina: "Quem chega", to: "/quem-chega#raca" },
    desfecho:
      "Testada em 04/11/2026: confirmada. Brancas eram 46,7% das candidatas, ficaram com 56,1% da receita, 65,0% dos votos e 65,4% das vagas. Pardas: 34,1% das candidatas, 27,7% da receita, 17,0% dos votos e 20,5% das vagas. Pretas: 17,4% das candidatas, 14,2% da receita, 16,0% dos votos e 12,5% das vagas. Nos três grupos, dinheiro e voto andam no mesmo sentido do resultado. O teste mostra que andam juntos, não que um causa o outro.",
  },
  {
    id: "funil-proporcional",
    registradaEm: "14/10/2026",
    status: "inconclusiva",
    texto:
      "A queda da fatia de mulheres entre as candidaturas e as cadeiras passa pelo voto, pelo quociente partidário e pelo dinheiro de campanha.",
    teste:
      "Regra fixada em 04/11/2026, antes de rodar, e publicada no repositório (scripts/recontagem/teste_dinheiro_2026.py). Três condições: a maior queda é a do voto; o dinheiro já cai antes do voto; e mulheres convertem dinheiro em voto como homens (razão entre 0,85 e 1,15).",
    onde: { pagina: "O funil", to: "/funil#etapas" },
    desfecho:
      "Testada em 04/11/2026: inconclusiva. Duas condições se cumprem: mulheres foram 35,7% das candidaturas, 32,9% da receita, 24,8% dos votos e 20,8% das cadeiras, então a maior queda é a do voto e o dinheiro já cai antes dele. A terceira não: cada mil reais de receita rendeu 29 votos às candidatas e 44 aos candidatos (razão de 0,67). O dinheiro sozinho não explica a queda no voto; falta saber o que pesa no resto. A conta é agregada e puxada pelas campanhas grandes.",
  },
  {
    id: "dinheiro-reeleicao-causa",
    registradaEm: "27/10/2026",
    status: "nao-confirmada",
    texto:
      "Parte da relação entre receita e reeleição corre ao contrário: quem já tinha base e chance de vencer atrai mais dinheiro do partido e de doadores.",
    teste:
      "Regra fixada em 04/11/2026, antes de rodar, e publicada no repositório (scripts/recontagem/teste_dinheiro_2026.py). Universo: as 410 pessoas eleitas deputadas e deputados federais em 2022 que tentaram voltar em 2026. Força prévia = votos de 2022 sobre a menor votação de eleito no estado. Confirma se a força prévia acompanhar o fundo recebido (correlação de 0,30 ou mais) e se a diferença de reeleição entre os terços de maior e menor receita encolher um terço ou mais quando comparada só entre pessoas de força prévia parecida.",
    onde: { pagina: "No plenário", to: "/como-votaram#quem-voltou" },
    desfecho:
      "Testada em 04/11/2026: não confirmada. O fundo que os partidos deram em 2026 quase não acompanhou a votação de 2022 (correlação de 0,05). A diferença de reeleição entre o terço de maior e o de menor receita foi de 17,2 pontos, e continua em 16,1 pontos entre pessoas de força prévia parecida. Ela se concentra em quem tinha a votação mais apertada em 2022 (41,6 pontos). Os dados não mostram que a chance atraiu o dinheiro; também não provam que o dinheiro causou a reeleição.",
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
    status: "nao-confirmada",
    texto: "A posição de uma mulher negra dentro da lista do partido pode pesar tanto quanto o total de votos que ela recebe.",
    teste:
      "Regra fixada em 04/11/2026, antes de rodar: entre as candidaturas a deputado de 2026 com votos iguais ou acima da eleita menos votada da mesma disputa, comparar quantas ficaram de fora em cada grupo. Confirmaria se pretas e pardas ficassem de fora 5 pontos ou mais acima dos homens brancos.",
    onde: { pagina: "Pioneiras: Lélia Gonzalez", to: "/pioneiras/lelia-gonzalez" },
    desfecho:
      "Testada em 04/11/2026: não confirmada. Com votos de eleita, ficaram de fora 26,7% dos homens brancos (320 de 1.199), 29,5% das mulheres pardas (28 de 95) e 12,8% das pretas (6 de 47). A diferença das pardas fica abaixo de 5 pontos, e as pretas ficaram de fora menos que os homens brancos. Em 2026, a barreira apareceu antes, no voto: chegaram a votos de eleita 4,1% das candidatas pretas (47 de 1.152) e 4,2% das pardas (95 de 2.266), contra 19,3% dos homens brancos (1.199 de 6.220), contando só candidaturas com votação válida.",
  },
  {
    id: "coautoria-ano-eleitoral",
    registradaEm: "04/11/2026",
    status: "inconclusiva",
    texto: "Em ano eleitoral, assinar projeto sozinha rende mais visibilidade individual do que dividir a autoria.",
    teste: "Comparar com 2023, ano sem eleição, com a mesma regra de contagem e a mesma janela (1º/01 a 03/11).",
    onde: { pagina: "Quem assina junto", to: "/coautoria" },
    desfecho:
      "Testada em 04/11/2026: inconclusiva. A autoria solo subiu de 75,0% dos projetos com deputada autora em 2023 (802 de 1.070) para 83,7% em 2026 (917 de 1.095), na direção da hipótese. Mas 2023 foi o primeiro ano da legislatura e 2026 é o último, então a comparação não separa ano eleitoral de fim de mandato, e não mede visibilidade. Próximo teste: 2022 (eleição, fim da legislatura anterior) contra 2019 a 2021.",
  },
];
