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
    body: "Elege uma pessoa por cargo: Presidência, governos estaduais e do DF e Senado. Ganha quem tem mais votos.",
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
    body: "O cálculo que define quantas cadeiras cada partido conquista na proporcional, a partir da soma dos votos do partido. Só depois se define, entre os nomes da lista, quem ocupa essas cadeiras.",
  },
  cota: {
    title: "A regra de 30%–70% por gênero",
    body: "Cada partido ou federação precisa registrar no mínimo 30% e no máximo 70% de candidaturas de cada gênero nas eleições proporcionais. É regra de candidatura, não de cadeira.",
  },
};
