/**
 * Fonte: tabela "Critérios fixados pelos partidos" do Tribunal Superior
 * Eleitoral. Conferida em 16/11/2026; registros, datas e links literais
 * da página oficial. Amostra de consulta, não seleção por desempenho.
 * Atenção: a liberação do FEFC para a legenda não comprova repasse às
 * candidaturas, aprovação de contas ou mérito dos critérios.
 */
export const TSE_FEFC_CRITERIOS_URL =
  "https://www.tse.jus.br/eleicoes/eleicoes-2026-content/prestacao-de-contas/fundo-especial-de-financiamento-de-campanha-fefc";
export const TSE_FEFC_COTAS_URL =
  "https://www.tse.jus.br/eleicoes/eleicoes-2026-content/prestacao-de-contas/distribuicao-dos-recursos-do-fundo-especial-de-financiamento-de-campanha-fefc-eleicoes-2026";
export const TSE_FEFC_CONTAS_URL =
  "https://dadosabertos.tse.jus.br/pt_BR/dataset/prestacao-de-contas-eleitorais-2026";

export const FEFC_DOCUMENTOS_OFICIAIS = [
  {
    sigla: "PL",
    pje: "0600974-71.2026.6.00.0000",
    liberado: "20/08/2026",
    tipo: "Critérios apresentados pela direção nacional",
    href: "https://www.tse.jus.br/eleicoes/eleicoes-2026-content/prestacao-de-contas/arquivos/petciv_0600974_71-2026-6-00-0000___pl_nacional___criterios_fefc",
  },
  {
    sigla: "PT",
    pje: "0601252-72.2026.6.00.0000",
    liberado: "21/08/2026",
    tipo: "Critérios apresentados pela direção nacional",
    href: "https://www.tse.jus.br/eleicoes/eleicoes-2026-content/prestacao-de-contas/arquivos/petciv_0601252_72-2026-6-00-0000___pt_nacional___criterios_fefc",
  },
  {
    sigla: "União Brasil",
    pje: "0601251-87.2026.6.00.0000",
    liberado: "21/08/2026",
    tipo: "Critérios apresentados pela direção nacional",
    href: "https://www.tse.jus.br/eleicoes/eleicoes-2026-content/prestacao-de-contas/arquivos/petciv_0601251_87-2026-6-00-0000___uniao_brasil_nacional___criterios_fefc",
  },
] as const;
