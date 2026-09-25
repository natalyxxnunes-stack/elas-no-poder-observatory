/**
 * Glossário inline do observatório.
 *
 * Definições curtas, em linguagem adulta e jornalística, para os termos
 * técnicos que aparecem no texto público. Nenhuma regra eleitoral nova é
 * criada aqui: as definições resumem o que já está descrito no Método,
 * em /direitos e na camada de dados.
 */
export type GlossaryKey =
  | "proporcional"
  | "majoritaria"
  | "pontos-percentuais"
  | "federacao"
  | "quociente-eleitoral"
  | "cota";

export type GlossaryEntry = {
  /** Título curto exibido no topo da definição. */
  title: string;
  /** Definição em uma ou duas frases curtas. */
  body: string;
  /** Microexemplo opcional, sempre contextual. */
  example?: string;
};

export const GLOSSARY: Record<GlossaryKey, GlossaryEntry> = {
  proporcional: {
    title: "Eleição proporcional",
    body: "Elege vários nomes para um mesmo parlamento — Câmara dos Deputados, assembleias legislativas e Câmara Legislativa do DF. O voto conta para o partido e para a pessoa, e o número de cadeiras depende do total de votos do partido.",
  },
  majoritaria: {
    title: "Eleição majoritária",
    body: "Elege pelo voto majoritário: Presidência, governos estaduais e do DF e Senado. Vence quem tem mais votos; para Presidência e governos, é preciso maioria absoluta dos votos válidos no 1º turno, ou há 2º turno. Em 2026, cada estado elege duas cadeiras no Senado.",
  },
  "pontos-percentuais": {
    title: "p.p. — pontos percentuais",
    body: "É a diferença simples entre dois percentuais, e não um aumento em porcentagem.",
    example: "De 35% para 19% há 16 pontos percentuais de diferença.",
  },
  federacao: {
    title: "Federação partidária",
    body: "União de partidos que passam a atuar como um só bloco nas eleições e por pelo menos quatro anos. Nas contas por sigla, uma federação é tratada como uma unidade.",
  },
  "quociente-eleitoral": {
    title: "Quociente eleitoral",
    body: "Número obtido dividindo os votos válidos da eleição proporcional pelo número de cadeiras em disputa. A votação de cada partido ou federação, comparada a esse quociente, define as cadeiras que o grupo conquista de início; as vagas que sobram são distribuídas pelas regras de sobras. Só depois se define, entre os nomes da lista, quem ocupa as cadeiras.",
  },
  cota: {
    title: "A regra de 30%–70% por gênero",
    body: "Cada partido ou federação precisa registrar no mínimo 30% e no máximo 70% de candidaturas de cada gênero nas eleições proporcionais. É regra de candidatura, não de cadeira.",
  },
};
