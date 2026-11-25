/**
 * Fontes externas de violência política. Universos NÃO intercambiáveis.
 * Consulta: 25/11/2026. A pesquisa de episódios não é o painel processual.
 */
export const MONITOR_VIOLENCIA = {
  fonte: "Terra de Direitos e Justiça Global, Violência Política e Eleitoral no Brasil, 4ª edição",
  primeiro: {
    inicio: "16/08/2026",
    fim: "04/10/2026",
    publicado: "07/10/2026",
    episodiosCandidaturas: 102,
    episodiosMulheresCandidatas: 60,
    episodiosTotal: 134,
    episodiosMulheres: 70,
    url: "https://terradedireitos.org.br/noticias/noticias/mulheres-candidatas-sao-quase-60-das-vitimas-de-violencia-politica-no-1-turno-mais-de-13-das-candidaturas/24371",
  },
  segundo: {
    inicio: "05/10/2026",
    fim: "31/10/2026",
    publicado: "11/11/2026",
    episodiosSeriePrincipal: 29,
    episodiosMulheres: 14,
    marcadoresGenero: 7,
    url: "https://terradedireitos.org.br/noticias/noticias/violencia-politica-atinge-eleitores-deixa-18-mortos-e-gera-onda-de-retaliacoes-apos-eleicoes-aponta-pesquisa/24383",
  },
} as const;

export const JURISPRUDENCIA_VPG = {
  fonte: "Observatório Nacional da Mulher na Política, Câmara dos Deputados, Nota Técnica nº 13",
  autores: "Maurício Augusto Chiaramonte Vieira e Fernanda Antunes Tofani Lopes",
  corte: "31/10/2026",
  casos: 20,
  url: "https://www2.camara.leg.br/a-camara/estruturaadm/secretarias/secretaria-da-mulher/observatorio-nacional-da-mulher-na-politica/nt-13-colecao-principal",
} as const;

export const LEGISLACAO_VPG = {
  consulta: "25/11/2026",
  principal: {
    projeto: "PL 68/2025",
    autoria: "Daiana Santos (PCdoB-RS)",
    objeto: "Medidas de proteção e apoio a mulheres em espaços de poder.",
    situacao: "Pronto para pauta no Plenário, em regime de urgência.",
    url: "https://www.camara.leg.br/proposicoesWeb/fichadetramitacao/?idProposicao=2482275",
  },
  apensados: [
    { projeto: "PL 1015/2025", autoria: "Alexandre Guimarães", objeto: "Programa nacional de enfrentamento à violência política de gênero." },
    { projeto: "PL 1446/2025", autoria: "Renilce Nicodemos", objeto: "Proteção na pré-candidatura." },
    { projeto: "PL 1440/2026", autoria: "Erika Hilton", objeto: "Violência política de gênero e raça, inclusive nos meios digitais." },
  ],
} as const;
