/**
 * election-2026 — módulo de dados do observatório "Quem são elas?".
 *
 * PROCEDÊNCIA DOS DADOS
 * ---------------------
 * O snapshot publicado em
 *   https://quem-sao-elas-2026.natalyxxnunes.chatgpt.site/direitos
 * está atrás de um login ("Continue with ChatGPT") e NÃO pôde ser lido nesta
 * reconstrução. Portanto:
 *
 *  - `recovered: true`  => número explicitamente presente nos artefatos
 *                          recuperados da conversa.
 *  - `recovered: false` => LACUNA. Estrutura preservada, valor ausente.
 *                          NÃO preencher com estimativa: só com fonte TSE.
 *
 * Nunca substituir uma lacuna por um número plausível. A ausência é o dado.
 */

export type Sourced<T> = {
  value: T | null;
  recovered: boolean;
  /** de onde veio, ou o que falta para preencher */
  source: string;
};

export const rec = <T>(value: T, source: string): Sourced<T> => ({
  value,
  recovered: true,
  source,
});

export const gap = <T>(source: string): Sourced<T> => ({
  value: null,
  recovered: false,
  source,
});

/** Tese editorial do observatório. */
export const THESIS =
  "Entre se candidatar e chegar ao poder, onde elas desaparecem?";

export const SITE = {
  name: "Quem são elas?",
  tagline: "Mulheres, eleições e poder",
  cycle: "Eleições gerais de 2026 — Brasil",
} as const;

/** O ciclo analítico que organiza todo o site. */
export const CYCLE_STAGES = [
  {
    id: "registros",
    label: "Registros",
    question: "Quantas conseguem entrar na disputa — e sob qual regra?",
  },
  {
    id: "recursos",
    label: "Recursos",
    question: "Quanto dinheiro e tempo de mídia chegam até elas?",
  },
  {
    id: "votos-eleitas",
    label: "Votos e eleitas",
    question: "Quantos votos viram cadeira?",
  },
  {
    id: "poder-decisoes",
    label: "Poder e decisões",
    question: "Quem comanda comissões, executivos e orçamento?",
  },
] as const;

export type CycleStageId = (typeof CYCLE_STAGES)[number]["id"];

/**
 * Funil candidatura → poder.
 * Só o primeiro degrau tem valor recuperado (share de candidaturas por tipo de
 * disputa). Os degraus posteriores — votos → eleitas → poder — ficam abertos.
 */
export type FunnelStep = {
  id: string;
  stage: CycleStageId;
  label: string;
  description: string;
  /** participação feminina em % naquele degrau */
  share: Sourced<number>;
  /** universo absoluto observado no degrau, quando conhecido */
  universe: Sourced<number>;
};

export const FUNNEL_STEPS: FunnelStep[] = [
  {
    id: "candidaturas-proporcionais",
    stage: "registros",
    label: "Candidaturas · proporcionais",
    description:
      "Câmara, assembleias e câmaras distritais — disputas de lista, onde incide a cota de gênero de 30%.",
    share: rec(35.2, "Artefato recuperado da conversa (share de candidaturas)"),
    universe: gap("Total de registros deferidos — requer extração TSE"),
  },
  {
    id: "candidaturas-majoritarias",
    stage: "registros",
    label: "Candidaturas · majoritárias",
    description:
      "Governo, Senado e chapas majoritárias — disputas de cargo único, sem incidência de cota.",
    share: rec(16.9, "Artefato recuperado da conversa (share de candidaturas)"),
    universe: rec(
      33,
      "Artefato recuperado: universo de apenas 33 mulheres nas majoritárias",
    ),
  },
  {
    id: "recursos",
    stage: "recursos",
    label: "Recursos de campanha",
    description:
      "Fatia do fundo eleitoral e do fundo partidário efetivamente transferida a candidaturas de mulheres.",
    share: gap("Prestação de contas TSE — não recuperada no snapshot"),
    universe: gap("Prestação de contas TSE — não recuperada no snapshot"),
  },
  {
    id: "votos",
    stage: "votos-eleitas",
    label: "Votos recebidos",
    description: "Fatia da votação nominal válida dirigida a mulheres.",
    share: gap("Resultado da eleição de 2026 — ainda não apurado"),
    universe: gap("Resultado da eleição de 2026 — ainda não apurado"),
  },
  {
    id: "eleitas",
    stage: "votos-eleitas",
    label: "Eleitas",
    description: "Cadeiras efetivamente ocupadas por mulheres.",
    share: gap("Resultado da eleição de 2026 — ainda não apurado"),
    universe: gap("Resultado da eleição de 2026 — ainda não apurado"),
  },
  {
    id: "poder",
    stage: "poder-decisoes",
    label: "Poder e decisões",
    description:
      "Presidências de comissão, lideranças partidárias, mesas diretoras e secretarias.",
    share: gap("Composição pós-posse — a levantar após a diplomação"),
    universe: gap("Composição pós-posse — a levantar após a diplomação"),
  },
];

/**
 * Contraste central do site: 35,2% nas proporcionais × 16,9% nas majoritárias,
 * e o papel da cota de gênero nessa diferença.
 */
export const REPRESENTATION_CONTRAST = {
  proportional: {
    label: "Proporcionais",
    share: 35.2,
    quotaApplies: true,
    note: "Acima do piso legal de 30%. A cota funciona como chão de entrada em disputas de lista.",
  },
  majoritarian: {
    label: "Majoritárias",
    share: 16.9,
    quotaApplies: false,
    note: "Sem cota. A escolha da candidatura é decisão interna do partido, e cai para menos da metade.",
  },
  quotaFloor: 30,
  /** diferença em pontos percentuais */
  gapPoints: 18.3,
  caution:
    "As majoritárias descrevem um universo de apenas 33 mulheres. Cada nome desloca o percentual em cerca de meio ponto: leia a direção, não a casa decimal.",
} as const;

/**
 * Eixo raça × nível de poder. Este é o eixo central do observatório e é
 * justamente o que o snapshot não entregou em números.
 */
export const RACE_BY_POWER_LEVEL: {
  level: string;
  note: string;
  breakdown: Sourced<Record<string, number>>;
}[] = [
  {
    level: "Candidaturas proporcionais",
    note: "Autodeclaração de cor/raça no registro de candidatura (TSE).",
    breakdown: gap("Cruzamento raça × cargo — não recuperado do snapshot"),
  },
  {
    level: "Candidaturas majoritárias",
    note: "Universo de 33 mulheres: desagregar por raça reduz células a poucas unidades.",
    breakdown: gap("Cruzamento raça × cargo — não recuperado do snapshot"),
  },
  {
    level: "Eleitas",
    note: "Só disponível após a apuração de 2026.",
    breakdown: gap("Resultado da eleição de 2026 — ainda não apurado"),
  },
  {
    level: "Poder e decisões",
    note: "Presidências, lideranças e mesas diretoras.",
    breakdown: gap("Composição pós-posse — a levantar após a diplomação"),
  },
];

/** Direitos: marcos legais. Datas são fato público verificável. */
export const RIGHTS_MILESTONES = [
  {
    year: "1932",
    title: "Voto feminino no Código Eleitoral",
    body: "O Brasil reconhece o direito de voto às mulheres — inicialmente restrito, e universalizado em 1934/1946.",
  },
  {
    year: "1995",
    title: "Primeira cota de candidaturas",
    body: "A Lei 9.100 reserva um mínimo de 20% das vagas de candidatura nas eleições municipais para mulheres.",
  },
  {
    year: "1997",
    title: "Lei 9.504 — o piso de 30%",
    body: "Cada partido ou coligação passa a preencher no mínimo 30% e no máximo 70% das candidaturas proporcionais com cada sexo.",
  },
  {
    year: "2009",
    title: "De 'deverá reservar' para 'preencherá'",
    body: "A reforma torna o piso de 30% uma obrigação de preenchimento efetivo, não apenas de reserva de vagas.",
  },
  {
    year: "2018",
    title: "30% do fundo eleitoral e do tempo de mídia",
    body: "O STF e o TSE fixam que recursos de campanha e propaganda devem ser distribuídos na mesma proporção mínima das candidaturas femininas.",
  },
  {
    year: "2021",
    title: "Distribuição proporcional por raça",
    body: "O TSE estende a lógica de distribuição proporcional de fundo e tempo de mídia às candidaturas de pessoas negras.",
  },
] as const;

export const RIGHTS_OPEN_QUESTIONS = [
  "A cota alcança o registro, não a competitividade: quem entra na lista não necessariamente recebe recurso.",
  "Nenhuma regra de cota incide sobre disputas majoritárias — é exatamente ali que a participação cai.",
  "Fiscalização de candidaturas fictícias segue reativa: depende de denúncia e de decisão caso a caso.",
  "A distribuição por raça é recente e a série histórica comparável ainda é curta.",
] as const;

/** Notas metodológicas — o que sustenta e o que limita cada leitura. */
export const METHOD_NOTES = [
  {
    title: "Unidade de análise",
    body: "Candidatura registrada, não pessoa. Uma mesma pessoa pode aparecer em ciclos distintos; não há deduplicação longitudinal.",
  },
  {
    title: "Sexo e raça são autodeclarados",
    body: "Ambos vêm do registro de candidatura no TSE. Mudanças de autodeclaração entre ciclos afetam comparações históricas.",
  },
  {
    title: "Universos pequenos",
    body: "Nas majoritárias há 33 mulheres. Percentuais sobre universos assim são instáveis: uma entrada ou saída move o indicador em cerca de 0,5 ponto.",
  },
  {
    title: "Proporcional × majoritária não é comparação pareada",
    body: "São regras eleitorais diferentes (lista versus cargo único). O contraste 35,2% × 16,9% descreve dois regimes, não uma perda dentro de um mesmo processo.",
  },
  {
    title: "Etapas em aberto",
    body: "Votos, eleitas e poder só se fecham após a apuração e a posse. Até então esses degraus do funil permanecem vazios por decisão editorial.",
  },
] as const;

/** Rotas do observatório, na ordem editorial. */
export const SECTIONS = [
  { to: "/", label: "Dados 2026" },
  { to: "/condicoes", label: "Condições" },
  { to: "/em-disputa", label: "Em disputa" },
  { to: "/direitos", label: "Direitos" },
  { to: "/metodo", label: "Método" },
] as const;
