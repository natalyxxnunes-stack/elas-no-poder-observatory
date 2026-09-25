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
  "Como gênero e raça marcam o caminho entre candidatura, competição eleitoral e poder — e quem controla cada etapa desse caminho?";

/** Pergunta de capa. */
export const COVER_QUESTION = "Entre se candidatar e chegar ao poder, onde elas desaparecem?";

export const CENTRAL_PRINCIPLE =
  "Gênero e raça são dimensões estruturantes da investigação, não filtros decorativos. Território, partido, cargo, recursos, votos, resultado e poder são as dimensões pelas quais investigamos essas perguntas.";

/** Estado editorial de um eixo — não é status de indicador. */
export type AxisState = "com dados de candidatura" | "arquitetura preparada" | "conteúdo editorial";
export type AxisPublication = "published" | "unpublished";
export type AxisStatus = "publicado" | "parcial" | "aguardando dado";
export type AxisGroup = "investigacao" | "projeto" | "materiais";

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
  publication: AxisPublication;
  status: AxisStatus;
  statusNote: string;
  group: AxisGroup;
  parentId?: string;
  /** motivo editorial da despublicação; string vazia nos eixos publicados */
  unpublishedReason: string;
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
    unpublishedReason: "",
    state: "com dados de candidatura",
    publication: "published", status: "publicado", statusNote: "Fotografia vigente das candidaturas de 2026.", group: "investigacao",
  },
  {
    id: "quem-controla",
    to: "/quem-controla",
    label: "Quem controla?",
    question: "Quem decide quem entra e quem recebe condições para competir?",
    summary:
      "Partidos, federações e diretórios controlam listas, recursos, propaganda e posição estratégica das candidaturas. Investigamos padrões e estruturas, não rankings morais.",
    dimensions: ["partido ou federação", "diretório", "recursos", "propaganda", "território"],
    unpublishedReason: "",
    state: "arquitetura preparada",
    publication: "published", status: "parcial", statusNote: "2 alavancas com dado, 1 parcial, 2 aguardando fonte", group: "investigacao",
  },
  {
    id: "funil",
    to: "/funil",
    label: "O funil",
    question: "Onde elas desaparecem?",
    summary:
      "O funil é metáfora jornalística, não uma única conta. Cada etapa tem universo, denominador e fonte próprios — e é lida separadamente.",
    dimensions: ["contexto", "competição", "poder"],
    unpublishedReason: "",
    state: "com dados de candidatura",
    publication: "published", status: "publicado", statusNote: "Leitura por etapas, com universos e fontes próprios.", group: "investigacao",
  },
  {
    id: "quem-sao-elas",
    to: "/quem-sao-elas",
    label: "Quem são elas?",
    question: "Quem são as mulheres nesse caminho?",
    summary:
      "O eixo gênero × cor/raça. Preservamos as categorias originais do TSE e distinguimos categoria de cor/raça de pertencimento étnico indígena.",
    dimensions: ["gênero × cor/raça", "território", "cargo", "partido ou federação", "deficiência"],
    unpublishedReason: "",
    state: "com dados de candidatura",
    publication: "published", status: "publicado", statusNote: "Recortes de gênero, cor/raça, território, partido e cargo.", group: "investigacao", parentId: "dados-2026",
  },
  {
    id: "historico",
    to: "/historico",
    label: "Histórico",
    question: "Como isso mudou desde 2014?",
    summary:
      "Série histórica das candidaturas por gênero, 2014–2026, com metodologia declarada em cada ponto.",
    dimensions: ["gênero", "cor/raça", "cargo", "tempo"],
    unpublishedReason: "",
    state: "com dados de candidatura",
    publication: "published", status: "publicado", statusNote: "Série 2014–2026 com metodologia declarada.", group: "investigacao", parentId: "dados-2026",
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
    unpublishedReason: "",
    state: "conteúdo editorial",
    publication: "published", status: "publicado", statusNote: "Receitas declaradas na prestação de contas em andamento, base de 24/09/2026; os valores ainda podem mudar até a prestação final.", group: "investigacao",
  },
  {
    id: "votos",
    to: "/votos",
    label: "Votos",
    question: "Quem consegue transformar candidatura em competição?",
    summary:
      "Candidatura, competitividade, desempenho e resultado são coisas distintas. Definimos os indicadores antes de chamar qualquer coisa de competitividade.",
    dimensions: ["gênero × cor/raça × votos", "cargo", "território", "recursos"],
    unpublishedReason: "Depende da apuração da eleição de 2026.",
    state: "arquitetura preparada",
    publication: "unpublished", status: "aguardando dado", statusNote: "depende da apuração da eleição de 2026", group: "investigacao",
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
    unpublishedReason: "Depende do resultado e da diplomação de 2026.",
    state: "arquitetura preparada",
    publication: "unpublished", status: "aguardando dado", statusNote: "depende do resultado e da diplomação de 2026", group: "investigacao",
  },
  {
    id: "barreiras",
    to: "/barreiras",
    label: "Barreiras",
    question: "O que impede permanecer?",
    summary:
      "Eixo transversal sobre violência política de gênero, racismo, transfobia, ameaças, assédio e ataques digitais. Só entra com fontes comparáveis e método defensável.",
    dimensions: ["gênero", "cor/raça", "identidade de gênero", "território"],
    unpublishedReason:
      "Depende de fontes comparáveis sobre violência política de gênero e raça, com método defensável — ainda não integradas.",
    state: "arquitetura preparada",
    publication: "unpublished", status: "aguardando dado", statusNote: "fontes comparáveis ainda não integradas", group: "investigacao",
  },
  {
    id: "direitos",
    to: "/direitos",
    label: "Direitos",
    question: "Como chegamos até aqui?",
    summary:
      "A linha do tempo jurídica e política, marco por marco: conquista, regra, disputa, implementação e consequência.",
    dimensions: ["legislação", "decisões", "implementação"],
    unpublishedReason: "",
    state: "conteúdo editorial",
    publication: "published", status: "publicado", statusNote: "Linha do tempo jurídica e política publicada.", group: "investigacao",
  },
  {
    id: "em-disputa",
    to: "/em-disputa",
    label: "Em disputa",
    question: "Que regras valem em 2026?",
    summary:
      "As regras em vigor no ciclo de 2026, com fonte e data de verificação. Projetos em tramitação entram só com situação conferida na fonte oficial.",
    dimensions: ["projetos de lei", "resoluções", "decisões judiciais"],
    unpublishedReason: "",
    state: "conteúdo editorial",
    publication: "published", status: "publicado", statusNote: "Regras em vigor em 2026; projetos em tramitação ainda não listados.", group: "investigacao",
  },
  {
    id: "metodo",
    to: "/metodo",
    label: "Método",
    question: "Como sabemos?",
    summary:
      "Duas camadas: explicação em linguagem simples e ficha técnica auditável, com fonte, universo, filtros, fórmulas, snapshots e limitações.",
    dimensions: ["fonte", "universo", "fórmula", "limitações"],
    unpublishedReason: "",
    state: "conteúdo editorial",
    publication: "published", status: "publicado", statusNote: "Fontes, contas e limites documentados.", group: "projeto",
  },
  {
    id: "sobre",
    to: "/sobre",
    label: "Sobre",
    question: "Quem faz?",
    summary:
      "Proposta, princípios editoriais, compromissos, transparência, contato, como citar e política de correções.",
    dimensions: ["equipe", "princípios", "transparência"],
    unpublishedReason: "",
    state: "conteúdo editorial",
    publication: "published", status: "publicado", statusNote: "Princípios, equipe e compromissos editoriais.", group: "projeto",
  },
  {
    id: "downloads",
    to: "/downloads",
    label: "Downloads",
    question: "O que posso levar daqui?",
    summary:
      "Cartilhas, materiais educativos e infográficos para impressão e compartilhamento. A tabela da fotografia vigente já sai pelo Método.",
    dimensions: ["materiais"],
    unpublishedReason: "Cartilhas e infográficos em preparação.",
    state: "arquitetura preparada",
    publication: "published", status: "parcial", statusNote: "catálogo publicado; 1 de 4 materiais disponível", group: "materiais",
  },
];

export function axis(id: string): Axis {
  const found = AXES.find((a) => a.id === id);
  if (!found) throw new Error(`eixo desconhecido: ${id}`);
  return found;
}

/**
 * Navegação principal — cinco entradas; Dados 2026 abre uma segunda camada.
 *
 * Os demais eixos permanecem descritos em `AXES` e seus arquivos de rota
 * seguem preservados no projeto, mas estão despublicados: fora do menu, do
 * rodapé e da navegação entre eixos, prontos para republicação futura.
 */
const navItem = (id: string) => {
  const a = axis(id);
  return { to: a.to, label: a.label, question: a.question };
};

export const NAV_ITEMS = [
  navItem("dados-2026"),
  { to: "/achados", label: "Achados", question: "O que encontramos?" },
  navItem("funil"),
  navItem("quem-sao-elas"),
  navItem("quem-controla"),
  navItem("direitos"),
  { to: "/investigacoes", label: "Investigação", question: "O que está publicado e o que ainda está em apuração?" },
  navItem("metodo"),
] as const;

export const PUBLISHED_AXES = AXES.filter((item) => item.publication === "published").map((item) => item.id);

export const DATA_2026_NAV_ITEMS = [
  { label: "Brasil", to: "/", hash: undefined },
  { label: "Estados", to: "/quem-sao-elas", hash: "estados" },
  { label: "Cargos", to: "/quem-sao-elas", hash: "cargos" },
  { label: "Raça", to: "/quem-sao-elas", hash: "raca" },
  { label: "Dinheiro", to: "/dinheiro", hash: undefined },
  { label: "Histórico", to: "/historico", hash: undefined },
] as const;

export const UTILITY_NAV_ITEMS = [navItem("sobre")] as const;

/** Regra editorial explícita sobre leitura do funil. */
export const FUNNEL_READING_RULE =
  "Cada etapa do funil tem universo, denominador, fórmula, fonte e data próprios: o funil organiza perguntas, não faz uma subtração. Diferenças entre percentuais de etapas com denominadores diferentes mostram contextos distintos — não uma perda direta de pontos entre as mulheres.";

/** Cruzamentos previstos no eixo gênero × raça, com o que falta para publicar. */
export const INTERSECTION_PLAN = [
  {
    crossing: "gênero × cor/raça",
    requires: "Campos de gênero e cor/raça no registro de candidatura",
    status: "disponível",
  },
  {
    crossing: "gênero × cor/raça × território",
    requires: "UF e município do registro",
    status: "disponível",
  },
  {
    crossing: "gênero × cor/raça × partido ou federação",
    requires: "Partido e federação do registro",
    status: "disponível",
  },
  {
    crossing: "gênero × cor/raça × cargo",
    requires: "Cargo do registro, com universos separados",
    status: "disponível",
  },
  {
    crossing: "gênero × cor/raça × recursos",
    requires: "Despesas contratadas/pagas e doador originário da prestação de contas de 2026",
    status: "parcial",
  },
  {
    crossing: "gênero × cor/raça × votos",
    requires: "Resultado nominal apurado de 2026",
    status: "aguardando dado",
  },
  {
    crossing: "gênero × cor/raça × resultado",
    requires: "Eleitas e diplomadas de 2026",
    status: "aguardando dado",
  },
  {
    crossing: "gênero × cor/raça × poder",
    requires: "Levantamento de posições institucionais",
    status: "aguardando dado",
  },
] as const;

export const RACE_CATEGORY_RULE =
  "Preservamos as categorias originais declaradas ao TSE — branca, preta, parda, amarela, indígena e não informado. Categoria de cor/raça não é o mesmo que pertencimento étnico indígena: a base registra uma autodeclaração de cor/raça e não substitui identificação étnica ou vínculo com povo indígena. Quando apresentamos uma leitura agregada, declaramos a agregação (“negra” = preta + parda) e mantemos as categorias originais visíveis.";
