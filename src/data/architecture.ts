/**
 * architecture — arquitetura editorial do observatório "Quem são elas?".
 *
 * Este arquivo NÃO contém dados quantitativos. Ele descreve apenas a estrutura
 * editorial: eixos, perguntas, navegação e o desenho do funil como metáfora
 * jornalística. A fonte de verdade dos números continua sendo a camada TSE
 * (`src/data/election-2026.ts`, `src/lib/tse/*`), que não é alterada aqui.
 */

/** Tese central da investigação. */
export const CENTRAL_THESIS =
  "Como gênero e raça atravessam o caminho entre candidatura, competição eleitoral e poder — e quem controla cada etapa desse caminho?";

/** Pergunta de capa. */
export const COVER_QUESTION =
  "Entre se candidatar e chegar ao poder, onde elas desaparecem?";

export const CENTRAL_PRINCIPLE =
  "Gênero e raça são dimensões estruturantes da investigação, não filtros decorativos. Território, partido, cargo, recursos, votos, resultado e poder são as dimensões pelas quais investigamos essas perguntas.";

/** Estado editorial de um eixo — não é status de indicador. */
export type AxisState =
  | "com dados de candidatura"
  | "arquitetura preparada"
  | "conteúdo editorial";

export type Axis = {
  id: string;
  to: string;
  label: string;
  question: string;
  /** o que o eixo investiga, em linguagem comum */
  summary: string;
  /** dimensões pelas quais o eixo investiga gênero e raça */
  dimensions: readonly string[];
  state: AxisState;
};

export const AXES: readonly Axis[] = [
  {
    id: "dados-2026",
    to: "/",
    label: "Dados 2026",
    question: "O que está acontecendo agora?",
    summary:
      "A fotografia atual das candidaturas registradas: gênero, cor/raça quando disponível, eleições proporcionais e majoritárias, território, data de atualização e fonte.",
    dimensions: ["gênero", "cor/raça", "cargo", "território", "tempo"],
    state: "com dados de candidatura",
  },
  {
    id: "condicoes",
    to: "/condicoes",
    label: "Condições",
    question: "Quem consegue entrar na disputa?",
    summary:
      "As condições anteriores à urna: regras eleitorais, composição de candidaturas, partido ou federação, cargo, território, recursos, posição da candidatura e propaganda.",
    dimensions: [
      "gênero × cor/raça",
      "partido ou federação",
      "cargo",
      "território",
      "regras",
    ],
    state: "com dados de candidatura",
  },
  {
    id: "quem-controla",
    to: "/quem-controla",
    label: "Quem controla?",
    question: "Quem decide quem entra e quem recebe condições para competir?",
    summary:
      "Partidos, federações e diretórios controlam listas, recursos, propaganda e posição estratégica das candidaturas. Investigamos padrões e estruturas, não rankings morais.",
    dimensions: [
      "partido ou federação",
      "diretório",
      "recursos",
      "propaganda",
      "território",
    ],
    state: "arquitetura preparada",
  },
  {
    id: "funil",
    to: "/funil",
    label: "O funil",
    question: "Onde elas desaparecem?",
    summary:
      "O funil é metáfora jornalística, não uma única conta. Cada etapa tem universo, denominador e fonte próprios — e é lida separadamente.",
    dimensions: ["contexto", "competição", "poder"],
    state: "com dados de candidatura",
  },
  {
    id: "quem-sao-elas",
    to: "/quem-sao-elas",
    label: "Quem são elas?",
    question: "Quais mulheres atravessam o caminho?",
    summary:
      "O eixo gênero × cor/raça. Preservamos as categorias originais do TSE e distinguimos categoria de cor/raça de pertencimento étnico indígena.",
    dimensions: [
      "gênero × cor/raça",
      "território",
      "cargo",
      "partido ou federação",
      "deficiência",
    ],
    state: "com dados de candidatura",
  },
  {
    id: "dinheiro",
    to: "/dinheiro",
    label: "Dinheiro",
    question: "Quem recebe condições para competir?",
    summary:
      "O dinheiro chega às mesmas mulheres que aparecem nas candidaturas? Investigamos gênero × cor/raça × recursos, e depois partido, cargo, UF e titularidade.",
    dimensions: [
      "gênero × cor/raça × recursos",
      "partido ou federação",
      "cargo",
      "UF",
      "titularidade/suplência",
    ],
    state: "arquitetura preparada",
  },
  {
    id: "votos",
    to: "/votos",
    label: "Votos",
    question: "Quem consegue transformar candidatura em competição?",
    summary:
      "Candidatura, competitividade, desempenho e resultado são coisas distintas. Definimos os indicadores antes de chamar qualquer coisa de competitividade.",
    dimensions: [
      "gênero × cor/raça × votos",
      "cargo",
      "território",
      "recursos",
    ],
    state: "arquitetura preparada",
  },
  {
    id: "quem-chega",
    to: "/quem-chega",
    label: "Quem chega?",
    question: "Quais mulheres chegam a quais lugares?",
    summary:
      "Resultado eleitoral por gênero, cor/raça, cargo, UF e partido — e, depois, as posições institucionais. Ser eleita não equivale a ocupar posição de poder.",
    dimensions: [
      "gênero × cor/raça × resultado",
      "cargo",
      "UF",
      "partido ou federação",
      "posições institucionais",
    ],
    state: "arquitetura preparada",
  },
  {
    id: "barreiras",
    to: "/barreiras",
    label: "Barreiras",
    question: "O que impede permanecer?",
    summary:
      "Eixo transversal sobre violência política de gênero, racismo, transfobia, ameaças, assédio e ataques digitais. Só entra com fontes comparáveis e método defensável.",
    dimensions: ["gênero", "cor/raça", "identidade de gênero", "território"],
    state: "arquitetura preparada",
  },
  {
    id: "direitos",
    to: "/direitos",
    label: "Direitos",
    question: "Como chegamos até aqui?",
    summary:
      "A linha do tempo jurídica e política, marco por marco: conquista, regra, disputa, implementação e consequência.",
    dimensions: ["legislação", "decisões", "implementação"],
    state: "conteúdo editorial",
  },
  {
    id: "em-disputa",
    to: "/em-disputa",
    label: "Em disputa",
    question: "As regras também estão em disputa?",
    summary:
      "Projetos, resoluções e decisões em tramitação. Projeto apresentado não é projeto aprovado.",
    dimensions: ["projetos de lei", "resoluções", "decisões judiciais"],
    state: "conteúdo editorial",
  },
  {
    id: "metodo",
    to: "/metodo",
    label: "Método",
    question: "Como sabemos?",
    summary:
      "Duas camadas: explicação em linguagem simples e ficha técnica auditável, com fonte, universo, filtros, fórmulas, snapshots e limitações.",
    dimensions: ["fonte", "universo", "fórmula", "limitações"],
    state: "conteúdo editorial",
  },
  {
    id: "sobre",
    to: "/sobre",
    label: "Sobre",
    question: "Quem faz?",
    summary:
      "Proposta, princípios editoriais, compromissos, transparência, contato, como citar e política de correções.",
    dimensions: ["equipe", "princípios", "transparência"],
    state: "conteúdo editorial",
  },
  {
    id: "downloads",
    to: "/downloads",
    label: "Downloads",
    question: "O que posso levar daqui?",
    summary:
      "Cartilhas, materiais educativos, infográficos e PDFs para impressão e compartilhamento.",
    dimensions: ["materiais"],
    state: "arquitetura preparada",
  },
];

export function axis(id: string): Axis {
  const found = AXES.find((a) => a.id === id);
  if (!found) throw new Error(`eixo desconhecido: ${id}`);
  return found;
}

/** Navegação agrupada — o menu principal nunca lista os 14 eixos. */
export type NavGroup = {
  label: string;
  items: readonly { to: string; label: string; question: string }[];
};

const navItem = (id: string) => {
  const a = axis(id);
  return { to: a.to, label: a.label, question: a.question };
};

export const NAV_GROUPS: readonly NavGroup[] = [
  {
    label: "Investigue",
    items: [
      navItem("condicoes"),
      navItem("quem-controla"),
      navItem("funil"),
      navItem("quem-sao-elas"),
      navItem("dinheiro"),
      navItem("votos"),
      navItem("quem-chega"),
      navItem("barreiras"),
    ],
  },
  {
    label: "Entenda",
    items: [navItem("direitos"), navItem("em-disputa"), navItem("metodo")],
  },
];

/** Itens fixos do menu, fora dos agrupamentos. */
export const NAV_DIRECT = [navItem("dados-2026"), navItem("sobre")] as const;
export const NAV_CTA = navItem("downloads");

/**
 * O funil em três camadas narrativas. Cada passagem tem universo e fonte
 * próprios: NUNCA se subtrai o percentual de uma etapa do de outra.
 */
export type FunnelLayerStep = {
  id: string;
  label: string;
  question: string;
  /** universo/denominador daquela etapa, descrito em texto */
  universe: string;
  source: string;
  /** o que ainda falta para calcular, quando falta */
  pending: string | null;
};

export type FunnelLayer = {
  id: "contexto" | "competicao" | "poder";
  label: string;
  lead: string;
  steps: readonly FunnelLayerStep[];
};

export const FUNNEL_LAYERS: readonly FunnelLayer[] = [
  {
    id: "contexto",
    label: "Contexto",
    lead: "Antes da disputa: quem é a população e quem é o eleitorado.",
    steps: [
      {
        id: "populacao",
        label: "População",
        question: "Quantas mulheres existem no país, por cor/raça?",
        universe: "População residente, por sexo e cor/raça",
        source: "IBGE — Censo/PNAD (fonte externa ao pipeline eleitoral)",
        pending:
          "Camada de contexto ainda não integrada. Não é comparável diretamente com candidaturas: universos e unidades de análise são diferentes.",
      },
      {
        id: "eleitorado",
        label: "Eleitorado",
        question: "Quantas mulheres estão aptas a votar?",
        universe: "Eleitorado apto, por sexo e UF",
        source: "TSE — Estatísticas do eleitorado",
        pending:
          "Base de eleitorado ainda não integrada ao processamento do observatório.",
      },
    ],
  },
  {
    id: "competicao",
    label: "Competição",
    lead:
      "A disputa propriamente dita: entrar na lista não é o mesmo que ter condições de competir.",
    steps: [
      {
        id: "candidaturas",
        label: "Candidaturas",
        question: "Quantas candidaturas de mulheres foram registradas?",
        universe:
          "Candidaturas registradas em 2026, separadas por universo proporcional e majoritário, cada um com denominador próprio",
        source: "TSE / Dados Abertos / Candidatos 2026",
        pending: null,
      },
      {
        id: "recursos",
        label: "Recursos",
        question: "Quanto dinheiro e tempo de propaganda chegam a elas?",
        universe:
          "Receitas e despesas declaradas por candidatura; universo próprio, distinto do universo de candidaturas",
        source: "TSE — prestação de contas de campanha",
        pending:
          "Base financeira ainda não disponível para 2026. Nenhum valor é estimado.",
      },
      {
        id: "competitividade",
        label: "Competitividade",
        question: "Quais candidaturas tiveram condições reais de disputar?",
        universe:
          "A definir: exige indicador declarado antes do cálculo (posição na lista, recursos, votação de referência)",
        source: "Definição metodológica própria do observatório",
        pending:
          "Indicador de competitividade ainda não definido publicamente. Sem definição, não usamos a palavra como se fosse um dado.",
      },
      {
        id: "votos",
        label: "Votos",
        question: "Quantos votos foram dirigidos a candidaturas de mulheres?",
        universe: "Votação nominal apurada, por cargo e UF",
        source: "TSE — resultados",
        pending: "Depende da apuração da eleição de 2026.",
      },
      {
        id: "resultado",
        label: "Resultado",
        question: "Quantas foram eleitas?",
        universe: "Cadeiras e cargos atribuídos, por cargo e UF",
        source: "TSE — resultados e diplomação",
        pending: "Depende da apuração e da diplomação de 2026.",
      },
    ],
  },
  {
    id: "poder",
    label: "Poder",
    lead:
      "Ser eleita não é automaticamente ocupar poder institucional. Essa distinção é o coração da investigação.",
    steps: [
      {
        id: "eleitas",
        label: "Eleitas",
        question: "Quem tomou posse?",
        universe: "Parlamentares e chefes de Executivo empossados",
        source: "TSE — diplomação; casas legislativas",
        pending: "Depende da posse, em 2027.",
      },
      {
        id: "posicoes",
        label: "Posições institucionais",
        question: "Quem preside comissões, mesas e lideranças?",
        universe:
          "Cargos de direção efetivamente ocupados, por casa legislativa e Executivo",
        source: "Levantamento próprio em fontes institucionais",
        pending:
          "Levantamento a realizar após a formação das mesas diretoras e comissões.",
      },
      {
        id: "poder",
        label: "Poder de decisão",
        question: "Quem decide orçamento, pauta e nomeações?",
        universe:
          "A definir: exige critério declarado de o que conta como espaço de decisão",
        source: "Levantamento próprio",
        pending:
          "Critério ainda não fixado. Sem critério declarado, não há indicador.",
      },
    ],
  },
];

/** Regra editorial explícita sobre leitura do funil. */
export const FUNNEL_READING_RULE =
  "Cada etapa do funil tem universo, denominador, fórmula, fonte e data próprios. Diferenças entre percentuais de etapas com denominadores diferentes não podem ser lidas como “as mulheres desapareceram X pontos”. O funil organiza perguntas; não é uma subtração.";

/** Cruzamentos previstos no eixo gênero × raça, com o que falta para publicar. */
export const INTERSECTION_PLAN = [
  {
    crossing: "gênero × cor/raça",
    requires: "Campos de gênero e cor/raça no registro de candidatura",
    state: "possível na base de candidaturas de 2026",
  },
  {
    crossing: "gênero × cor/raça × território",
    requires: "UF e município do registro",
    state: "possível na base de candidaturas de 2026",
  },
  {
    crossing: "gênero × cor/raça × partido ou federação",
    requires: "Partido e federação do registro",
    state: "possível na base de candidaturas de 2026",
  },
  {
    crossing: "gênero × cor/raça × cargo",
    requires: "Cargo do registro, com universos separados",
    state: "possível na base de candidaturas de 2026",
  },
  {
    crossing: "gênero × cor/raça × recursos",
    requires: "Base de prestação de contas de 2026",
    state: "aguardando fonte",
  },
  {
    crossing: "gênero × cor/raça × votos",
    requires: "Resultado nominal apurado de 2026",
    state: "aguardando apuração",
  },
  {
    crossing: "gênero × cor/raça × resultado",
    requires: "Eleitas e diplomadas de 2026",
    state: "aguardando apuração",
  },
  {
    crossing: "gênero × cor/raça × poder",
    requires: "Levantamento de posições institucionais",
    state: "aguardando levantamento próprio",
  },
] as const;

export const RACE_CATEGORY_RULE =
  "Preservamos as categorias originais declaradas ao TSE — branca, preta, parda, amarela, indígena e não informado. Categoria de cor/raça não é o mesmo que pertencimento étnico indígena: a base registra uma autodeclaração de cor/raça e não substitui identificação étnica ou vínculo com povo indígena. Quando apresentamos uma leitura agregada, declaramos a agregação (“negra” = preta + parda) e mantemos as categorias originais visíveis.";
