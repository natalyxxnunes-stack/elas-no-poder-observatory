/**
 * rules-in-dispute — acompanhamento editorial de regras em tramitação ou em
 * discussão. Conteúdo editorial: nenhum número derivado da base do TSE.
 *
 * Regra editorial absoluta: projeto apresentado não é projeto aprovado. Cada
 * item declara o que propõe, quem seria afetado, a situação, a fonte e a data
 * da última verificação feita pelo observatório.
 */

export type DisputeStatus = "EM TRAMITAÇÃO" | "EM VIGOR" | "EM DISCUSSÃO";

export type DisputeItem = {
  id: string;
  kind: "Projeto de lei" | "Resolução" | "Decisão judicial" | "Emenda constitucional" | "Súmula";
  title: string;
  /** o que propõe, em linguagem comum */
  proposal: string;
  /** quem seria afetado */
  affects: string;
  status: DisputeStatus;
  /** nota sobre o estágio processual, sem prever resultado */
  statusNote: string;
  sourceLabel: string;
  sourceUrl: string;
  /** data (AAAA-MM-DD) em que o observatório verificou a situação; item sem data não entra na lista */
  checkedAt: string;
};

export const DISPUTE_ITEMS: readonly DisputeItem[] = [
  {
    id: "res-23752-2026",
    kind: "Resolução",
    title: "Resolução TSE nº 23.752/2026",
    proposal:
      "Organiza, para o ciclo de 2026, regras de arrecadação e gastos de campanha, incluindo a destinação de recursos a candidaturas de mulheres, pessoas negras e indígenas.",
    affects:
      "Partidos e federações, na distribuição de recursos públicos de campanha, e as candidaturas beneficiadas por essa destinação.",
    status: "EM VIGOR",
    statusNote:
      "Norma aplicável ao ciclo em curso. A aplicação concreta só poderá ser avaliada com as prestações de contas de 2026.",
    sourceLabel: "TSE, Resolução nº 23.752/2026",
    sourceUrl:
      "https://www.tse.jus.br/legislacao/compilada/res/2026/resolucao-no-23-752-de-26-de-fevereiro-de-2026",
    checkedAt: "2026-09-22",
  },
  {
    id: "ec-111-2021",
    kind: "Emenda constitucional",
    title: "Contagem em dobro de votos para distribuição de recursos (EC 111/2021)",
    proposal:
      "Os votos dados a candidatas mulheres ou a candidatos negros para a Câmara dos Deputados nas eleições de 2022 a 2030 são contados em dobro, uma única vez, para fins de distribuição entre os partidos dos recursos do Fundo Partidário e do FEFC.",
    affects:
      "Partidos, na divisão de recursos entre si. Não altera a atribuição de cadeiras nem o resultado da eleição.",
    status: "EM VIGOR",
    statusNote:
      "Regra válida para os ciclos de 2022, 2026 e 2030, restrita aos votos para a Câmara dos Deputados. Os efeitos sobre candidaturas dependem da redistribuição interna feita por cada partido.",
    sourceLabel: "Emenda Constitucional nº 111/2021",
    sourceUrl: "https://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc111.htm",
    checkedAt: "2026-09-24",
  },
  {
    id: "sumula-73-tse",
    kind: "Súmula",
    title: "Fraude à cota de gênero (Súmula TSE nº 73/2024)",
    proposal:
      "Define quando uma candidatura de mulher registrada só para cumprir o mínimo de 30% configura fraude: votação zerada ou inexpressiva, prestação de contas zerada ou padronizada e ausência de atos efetivos de campanha. Basta um ou alguns desses elementos.",
    affects:
      "O partido ou federação e toda a chapa. Reconhecida a fraude, o registro da chapa (Drap) e os diplomas são cassados, os votos do partido são anulados, os quocientes eleitoral e partidário são recalculados, e quem praticou ou anuiu com a conduta pode ficar inelegível.",
    status: "EM VIGOR",
    statusNote:
      "Aprovada pelo TSE em 16/05/2024. A fraude é reconhecida em processo judicial, caso a caso, com base nas provas de cada chapa.",
    sourceLabel: "TSE, Súmula nº 73",
    sourceUrl:
      "https://www.tse.jus.br/legislacao/codigo-eleitoral/sumulas/sumulas-do-tse/sumula-tse-n-73",
    checkedAt: "2026-09-24",
  },
  {
    id: "ec-133-2024",
    kind: "Emenda constitucional",
    title: "Emenda Constitucional nº 133/2024 (origem: PEC 9/2023)",
    proposal:
      "Obriga os partidos a aplicar recursos em candidaturas de pessoas pretas e pardas e estabelece condições para a regularização e o refinanciamento de débitos dos partidos, alcançando as sanções por não destinar os valores mínimos por sexo e raça em eleições e prestações de contas anteriores.",
    affects:
      "Partidos e federações, nas contas de eleições passadas e na distribuição de recursos; candidaturas de mulheres e de pessoas pretas e pardas.",
    status: "EM VIGOR",
    statusNote:
      "Promulgada e publicada no DOU de 23/08/2024. Na Câmara, a PEC foi aprovada em 1º turno em 11/07/2024 por 344 a 89; o voto de cada deputada está em Como votaram.",
    sourceLabel: "Câmara dos Deputados, ficha de tramitação da PEC 9/2023",
    sourceUrl: "https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2352476",
    checkedAt: "2026-10-28",
  },
  {
    id: "pl-68-2025",
    kind: "Projeto de lei",
    title: "PL 68/2025: proteção a mulheres em espaços de poder vítimas de violência política",
    proposal:
      "Altera a Lei nº 14.192/2021 e o Código Eleitoral para incluir medidas específicas de proteção e apoio a mulheres em espaços de poder que sofram violência política de gênero. O PL 1440/2026, sobre violência política de gênero e raça inclusive em meios digitais, tramita junto.",
    affects: "Mulheres eleitas e em cargos de poder; Justiça Eleitoral e partidos.",
    status: "EM TRAMITAÇÃO",
    statusNote:
      "Com urgência aprovada, aguarda deliberação no Plenário da Câmara. Na sessão de 27/10/2026, não foi apreciado por encerramento da sessão.",
    sourceLabel: "Câmara dos Deputados, ficha de tramitação do PL 68/2025",
    sourceUrl: "https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2482275",
    checkedAt: "2026-10-28",
  },
  {
    id: "pl-896-2023",
    kind: "Projeto de lei",
    title: "PL 896/2023: crimes praticados em razão de misoginia",
    proposal:
      "Altera a Lei nº 7.716/1989 e o Código Penal para dispor sobre crimes praticados em razão de misoginia. O projeto veio do Senado.",
    affects: "Toda a população; inclui ataques a mulheres na política.",
    status: "EM TRAMITAÇÃO",
    statusNote:
      "Pronto para pauta no Plenário da Câmara. A urgência foi aprovada em 01/07/2026 por 293 a 158.",
    sourceLabel: "Câmara dos Deputados, ficha de tramitação do PL 896/2023",
    sourceUrl: "https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2612930",
    checkedAt: "2026-10-28",
  },
  {
    id: "pl-4069-2023",
    kind: "Projeto de lei",
    title: "PL 4069/2023: prevenção e combate à violência política contra a mulher",
    proposal:
      "Institui mecanismos, ações e procedimentos para a prevenção, a repressão e o combate à violência política contra a mulher.",
    affects: "Mulheres candidatas e eleitas; partidos e Justiça Eleitoral.",
    status: "EM TRAMITAÇÃO",
    statusNote: "Pronto para pauta, com requerimento de urgência apresentado em fevereiro de 2026.",
    sourceLabel: "Câmara dos Deputados, ficha de tramitação do PL 4069/2023",
    sourceUrl: "https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2381655",
    checkedAt: "2026-10-28",
  },
  {
    id: "pl-6661-2025",
    kind: "Projeto de lei",
    title:
      "PL 6661/2025: transparência e equidade no financiamento de candidaturas de mulheres negras",
    proposal:
      "Altera a Lei das Eleições para instituir regras de transparência e equidade no financiamento de campanhas de candidaturas de mulheres negras.",
    affects: "Partidos, na distribuição de recursos; candidatas pretas e pardas.",
    status: "EM TRAMITAÇÃO",
    statusNote:
      "Parecer aprovado na Comissão de Direitos Humanos em 02/09/2026; segue para as próximas comissões.",
    sourceLabel: "Câmara dos Deputados, ficha de tramitação do PL 6661/2025",
    sourceUrl: "https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2599038",
    checkedAt: "2026-10-28",
  },
  {
    id: "pl-4252-2026",
    kind: "Projeto de lei",
    title: "PL 4252/2026: raça, cor ou etnia na violência política contra a mulher",
    proposal:
      "Altera a Lei nº 14.192/2021 e o Código Eleitoral para explicitar a motivação de raça, cor ou etnia na violência política contra a mulher, qualificar o crime de violência política eleitoral e prever medidas de urgência e acolhimento na Justiça Eleitoral.",
    affects: "Mulheres pretas, pardas e indígenas na política; Justiça Eleitoral.",
    status: "EM TRAMITAÇÃO",
    statusNote: "Apresentado em julho de 2026; aguarda despacho da Mesa da Câmara.",
    sourceLabel: "Câmara dos Deputados, ficha de tramitação do PL 4252/2026",
    sourceUrl: "https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2640932",
    checkedAt: "2026-10-28",
  },
  {
    id: "pl-3191-2026",
    kind: "Projeto de lei",
    title: "PL 3191/2026: violência política contra a mulher por meios digitais",
    proposal:
      "Altera a Lei nº 14.192/2021 e o Código Eleitoral para aperfeiçoar a prevenção e a repressão à violência política contra a mulher praticada por meios digitais.",
    affects: "Mulheres candidatas e eleitas; plataformas digitais e Justiça Eleitoral.",
    status: "EM TRAMITAÇÃO",
    statusNote:
      "Na Comissão de Defesa dos Direitos da Mulher desde agosto de 2026, aguardando relatora ou relator.",
    sourceLabel: "Câmara dos Deputados, ficha de tramitação do PL 3191/2026",
    sourceUrl: "https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2633648",
    checkedAt: "2026-10-28",
  },
  {
    id: "plp-112-2021",
    kind: "Projeto de lei",
    title: "PLP 112/2021: novo Código Eleitoral",
    proposal:
      "Reúne em um único código as normas eleitorais e processuais eleitorais, incluindo regras sobre candidaturas, financiamento e propaganda.",
    affects: "Todo o sistema eleitoral, inclusive as regras de cota e de destinação de recursos.",
    status: "EM TRAMITAÇÃO",
    statusNote:
      "Aprovado pela Câmara em 2021; aguarda apreciação pelo Senado Federal. O texto pode mudar no Senado e, se mudar, volta à Câmara.",
    sourceLabel: "Câmara dos Deputados, ficha de tramitação do PLP 112/2021",
    sourceUrl: "https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2292163",
    checkedAt: "2026-10-28",
  },
];

/** Itens ainda não incluídos por falta de verificação documental. */
export const DISPUTE_GAP =
  "Projetos em tramitação entram só com número da proposição, situação verificada na fonte oficial e data da verificação. O levantamento de 28/10/2026 cobre as proposições que passaram pela Câmara dos Deputados; projetos que tramitam só no Senado ainda não foram levantados, e essa lacuna fica declarada.";

export const DISPUTE_RULE =
  "Projeto apresentado não é projeto aprovado. Situação em tramitação não antecipa resultado, e nenhuma proposição é descrita aqui como se já produzisse efeitos.";
