/**
 * competitividade — o que este observatório pode e o que NÃO pode chamar de
 * competitividade com a base de 2026, e o registro da verificação dos dados
 * financeiros de campanha.
 *
 * Nada aqui é índice composto, nota, escore ou ranking. A única leitura que a
 * fotografia vigente sustenta é a concorrência declarada: quantas candidaturas
 * registradas existem para cada vaga em disputa, dentro de um mesmo universo.
 * Concorrência descreve o tamanho da disputa; não mede chance individual de
 * eleição, não mede desempenho e não explica desigualdade.
 */

import type { UniverseId } from "@/lib/tse/compute";
import { VAGAS_POSITIONS, VAGAS_SOURCE } from "./vagas-2026";

/** Definição publicada do único indicador de disputa que a base sustenta. */
export const COMPETITION_DEFINITION = {
  id: "concorrencia-por-vaga",
  label: "Concorrência declarada: candidaturas por vaga",
  question: "Quantas candidaturas registradas existem para cada vaga em disputa?",
  formula:
    "candidaturas registradas no universo e na unidade eleitoral ÷ vagas em disputa no mesmo universo e na mesma unidade eleitoral",
  unit: "candidaturas por vaga",
  numeratorSource:
    "Fotografia vigente do recurso Candidatos (consulta_cand_2026), contagem de candidaturas por unidade eleitoral em cada universo",
  denominatorSource: `${VAGAS_SOURCE.name}, arquivo ${VAGAS_SOURCE.fileName} (coluna QT_VAGA)`,
  unitOfAnalysis: "candidatura registrada (não pessoa)",
  positions: VAGAS_POSITIONS,
  /** o que este número mede */
  measures: [
    "o tamanho da disputa: quantas candidaturas foram registradas por vaga",
    "a diferença de escala entre estados e entre os dois universos",
    "quantas candidaturas de mulheres e de homens foram registradas por vaga, como composição descritiva da disputa",
  ],
  /** o que este número NÃO mede — limites que precisam ser lidos junto */
  doesNotMeasure: [
    "chance individual de eleição: candidatura não é probabilidade de vitória",
    "desempenho eleitoral: não há voto na fotografia de registro",
    "quociente eleitoral, que só existe depois da votação, com votos válidos apurados",
    "viabilidade financeira, posição na lista partidária ou apoio de estrutura de campanha",
    "causa de desigualdade: concorrência maior ou menor não explica a ausência de mulheres",
  ],
  limitations: [
    "O registro de 2026 ainda pode mudar (deferimentos, indeferimentos, substituições). Numerador provisório.",
    "As vagas são fixas e não têm gênero: a divisão por gênero está no numerador, nunca no denominador.",
    "Universos nunca são somados: as regras de eleição proporcional e majoritária são diferentes, e cada uma tem seu próprio denominador.",
    "No universo majoritário, Presidência tem unidade eleitoral nacional (BR); as demais são estaduais. Cargos de vice e suplência de Senado ficam fora dos dois universos, como no resto do site.",
    "Segundo turno não entra: a fotografia é de registro de candidaturas para o primeiro turno.",
  ],
} as const;

/** Rótulo curto por universo, reaproveitado nas interfaces. */
export const UNIVERSE_SHORT: Record<UniverseId, string> = {
  proporcional: "proporcional",
  majoritario: "majoritário",
};

/**
 * Verificação de disponibilidade dos dados de financiamento de campanha de
 * 2026, feita nos Dados Abertos do TSE. Registro datado, para que a lacuna
 * publicada no Método possa ser auditada e refeita.
 */
export const FINANCE_AVAILABILITY = {
  checkedAt: "2026-09-24",
  verdict:
    "A prestação de contas eleitorais de 2026 já existe, em base parcial (23/09/2026). Receita por candidatura está publicada em /dinheiro desde 24/09, por gênero, cor/raça, cargo, partido e UF. Despesas contratadas, despesas pagas e doador originário ainda não têm número neste site.",
  checked: [
    {
      id: "contas-eleitorais-2026",
      label: "Prestação de contas eleitorais de 2026",
      url: "https://dadosabertos.tse.jus.br/dataset/prestacao-de-contas-eleitorais-2026",
      status: "receita publicada; despesa e doador originário pendentes",
      note: "O conjunto passou a existir para 2026, em base parcial atualizada até o fim da apuração. Receita por candidatura já foi processada e está publicada em Dinheiro. Despesas contratadas, despesas pagas e o doador originário do financiamento coletivo ainda não entraram no pipeline do observatório.",
    },
    {
      id: "contas-partidarias-2026",
      label: "Prestação de contas partidárias de 2026",
      url: "https://dadosabertos.tse.jus.br/dataset/prestacao-de-contas-partidarias-2026",
      status: "existe, mas não é comparável",
      note: "É contabilidade anual dos partidos, com unidade de análise partido e período próprio. Não traz valor por candidatura, não cobre a campanha de 2026 e não pode ser cruzada com a fotografia de registro sem trocar universo, unidade e período.",
    },
    {
      id: "bens-candidato-2026",
      label: "Bens de candidatos de 2026",
      url: "https://dadosabertos.tse.jus.br/dataset/candidatos-2026",
      status: "existe, mas é outra coisa",
      note: "Patrimônio declarado no registro é riqueza pessoal anterior à campanha, não dinheiro de campanha. Usar um no lugar do outro seria erro factual.",
    },
  ],
  /** o que o observatório ainda vai publicar quando processar o restante da base */
  plannedWhenAvailable: [
    "Despesas contratadas e pagas por candidatura, com o mesmo recorte de gênero, cor/raça, cargo, partido e UF já publicado para receita.",
    "Rastreio de doador originário no financiamento coletivo, hoje ligado só ao prestador de contas, sem chave direta para a candidatura.",
    "Relação entre receita e titularidade ou suplência.",
    "Leitura de competitividade financeira: posição relativa de recursos dentro do próprio universo, não ranking entre candidaturas.",
  ],
} as const;
