/**
 * election-2026 — camada de dados e metodologia do observatório "Quem são elas?".
 *
 * FONTE ÚNICA DOS INDICADORES
 * ---------------------------
 * TSE / Dados Abertos / Candidatos 2026. Nenhum número exibido no site pode vir
 * de outra origem, e nenhum indicador é apresentado sem denominador.
 *
 * Os valores da fotografia anterior (09/08/2026) foram retirados da camada de
 * apresentação: eram provisórios, sem denominador e sem metadados auditáveis.
 * Enquanto o snapshot da base não for processado, os indicadores existem com
 * estrutura completa e valor nulo.
 */

import {
  MAJORITARIAN_POSITIONS,
  PROPORTIONAL_POSITIONS,
  type UniverseId,
} from "@/lib/tse/compute";
import {
  LAST_FETCH_ATTEMPT,
  snapshot,
  type UniverseSnapshot,
} from "./tse-snapshot";

/** Status padronizado de qualquer indicador do observatório. */
export const DATA_STATUS = {
  validado: "DISPONÍVEL E VALIDADO",
  provisorio: "PROVISÓRIO / SUJEITO A ATUALIZAÇÃO",
  apuracao: "EM APURAÇÃO",
  indisponivel: "AINDA NÃO DISPONÍVEL",
  limitacao: "LIMITAÇÃO DA BASE",
} as const;

export type DataStatus = (typeof DATA_STATUS)[keyof typeof DATA_STATUS];

/** Metadados da fonte oficial. */
export const TSE_SOURCE = {
  name: "TSE / Dados Abertos / Candidatos 2026",
  datasetUrl: "https://dadosabertos.tse.jus.br/dataset/candidatos-2026",
  resourceName: "Candidatos (consulta_cand_2026)",
  resourceUrl:
    "https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_cand/consulta_cand_2026.zip",
  /** data de geração do recurso informada pelo TSE nos metadados do dataset */
  baseGeneratedAt: snapshot?.baseGeneratedAt ?? "2026-07-22T16:35:13Z",
  /** última modificação de metadados do dataset informada pelo TSE */
  datasetMetadataModified: "2026-08-03T16:53:04Z",
  /** data/hora em que a base foi efetivamente processada */
  processedAt: snapshot?.processedAt ?? null,
  /** registro da última tentativa de obtenção do arquivo */
  lastFetchAttempt: LAST_FETCH_ATTEMPT,
  legalUrl:
    "https://www.tse.jus.br/legislacao/codigo-eleitoral/lei-das-eleicoes/lei-das-eleicoes-lei-nb0-9.504-de-30-de-setembro-de-1997/",
} as const;

/** Metadados auditáveis de um indicador. */
export type Indicator = {
  id: string;
  label: string;
  /** valor bruto, sem arredondamento. Arredondar só na apresentação. */
  value: number | null;
  unit: "%" | "candidaturas" | "p.p.";
  numerator: number | null;
  denominator: number | null;
  universe: string;
  /** cargos incluídos no cálculo */
  positions: readonly string[];
  /** filtros aplicados na leitura da base */
  filters: readonly string[];
  source: string;
  sourceUrl: string | null;
  /** data de geração da base informada pelo TSE */
  baseGeneratedAt: string | null;
  /** data/hora de processamento */
  processedAt: string | null;
  formula: string;
  status: DataStatus;
  /** observação ou limitação */
  caveat: string;
};

const UNIVERSE_LABEL: Record<UniverseId, string> = {
  proporcional:
    "Candidaturas registradas em eleições proporcionais (Câmara dos Deputados, assembleias legislativas e Câmara Legislativa do Distrito Federal)",
  majoritario:
    "Candidaturas registradas em eleições majoritárias, de cargo único (Presidência, governos estaduais e do Distrito Federal, Senado)",
};

const UNIVERSE_POSITIONS: Record<UniverseId, readonly string[]> = {
  proporcional: PROPORTIONAL_POSITIONS,
  majoritario: MAJORITARIAN_POSITIONS,
};

const BASE_FILTERS = [
  "Unidade de análise: candidatura registrada (não pessoa)",
  "Gênero conforme categoria DS_GENERO da base, autodeclarado no registro",
  "Cargos filtrados por DS_CARGO; universos calculados separadamente e nunca somados",
  "Nenhum filtro por situação de candidatura aplicado — o registro pode mudar até a decisão final da Justiça Eleitoral",
];

function feminineShareIndicator(universe: UniverseId): Indicator {
  const u: UniverseSnapshot | undefined = snapshot?.universes[universe];
  const has = !!u && u.total > 0;
  return {
    id: `participacao-feminina-${universe}`,
    label:
      universe === "proporcional"
        ? "Participação feminina · candidaturas proporcionais"
        : "Participação feminina · candidaturas majoritárias",
    value: has ? (u!.feminine / u!.total) * 100 : null,
    unit: "%",
    numerator: has ? u!.feminine : null,
    denominator: has ? u!.total : null,
    universe: UNIVERSE_LABEL[universe],
    positions: UNIVERSE_POSITIONS[universe],
    filters: [...BASE_FILTERS, ...(snapshot?.filters ?? [])],
    source: TSE_SOURCE.name,
    sourceUrl: TSE_SOURCE.datasetUrl,
    baseGeneratedAt: has ? TSE_SOURCE.baseGeneratedAt : null,
    processedAt: TSE_SOURCE.processedAt,
    formula:
      "(candidaturas de gênero feminino no universo ÷ total de candidaturas no universo) × 100",
    status: has ? DATA_STATUS.provisorio : DATA_STATUS.indisponivel,
    caveat: has
      ? "Registro de candidaturas de 2026 ainda sujeito a alteração pelo TSE (deferimentos, indeferimentos e substituições). Valor provisório."
      : `Indicador aguardando processamento da base oficial. ${LAST_FETCH_ATTEMPT.outcome}`,
  };
}

export const PROPORTIONAL_SHARE = feminineShareIndicator("proporcional");
export const MAJORITARIAN_SHARE = feminineShareIndicator("majoritario");

/** Diferença entre os dois universos, em pontos percentuais. Descritiva. */
export const UNIVERSE_DIFFERENCE: Indicator = {
  id: "diferenca-universos",
  label: "Diferença entre os universos",
  value:
    PROPORTIONAL_SHARE.value !== null && MAJORITARIAN_SHARE.value !== null
      ? PROPORTIONAL_SHARE.value - MAJORITARIAN_SHARE.value
      : null,
  unit: "p.p.",
  numerator: null,
  denominator: null,
  universe:
    "Comparação descritiva entre dois universos distintos, com denominadores próprios",
  positions: [...PROPORTIONAL_POSITIONS, ...MAJORITARIAN_POSITIONS],
  filters: BASE_FILTERS,
  source: TSE_SOURCE.name,
  sourceUrl: TSE_SOURCE.datasetUrl,
  baseGeneratedAt: PROPORTIONAL_SHARE.baseGeneratedAt,
  processedAt: TSE_SOURCE.processedAt,
  formula:
    "participação feminina proporcional − participação feminina majoritária, em pontos percentuais (p.p.)",
  status:
    PROPORTIONAL_SHARE.value !== null && MAJORITARIAN_SHARE.value !== null
      ? DATA_STATUS.provisorio
      : DATA_STATUS.indisponivel,
  caveat:
    "Os dois universos seguem regras eleitorais diferentes e têm denominadores próprios. A diferença é descritiva: não mede efeito de nenhuma regra e não autoriza conclusão causal.",
};

export const CURRENT_INDICATORS = [
  PROPORTIONAL_SHARE,
  MAJORITARIAN_SHARE,
  UNIVERSE_DIFFERENCE,
] as const;

/** Indicadores de raça: categorias originais da base, sem substituição. */
export const RACE_INDICATORS: Indicator[] = (
  ["proporcional", "majoritario"] as UniverseId[]
).map((universe) => {
  const u = snapshot?.universes[universe];
  const denominator = u
    ? Object.values(u.raceCounts).reduce((a, b) => a + b, 0)
    : null;
  return {
    id: `raca-${universe}`,
    label:
      universe === "proporcional"
        ? "Cor/raça das candidaturas de mulheres · proporcionais"
        : "Cor/raça das candidaturas de mulheres · majoritárias",
    value: null,
    unit: "candidaturas",
    numerator: null,
    denominator: denominator && denominator > 0 ? denominator : null,
    universe: UNIVERSE_LABEL[universe],
    positions: UNIVERSE_POSITIONS[universe],
    filters: [
      ...BASE_FILTERS,
      "Cor/raça conforme categoria original DS_COR_RACA (branca, preta, parda, amarela, indígena, não informado), sem agregação",
    ],
    source: TSE_SOURCE.name,
    sourceUrl: TSE_SOURCE.datasetUrl,
    baseGeneratedAt: u ? TSE_SOURCE.baseGeneratedAt : null,
    processedAt: TSE_SOURCE.processedAt,
    formula:
      "contagem de candidaturas de mulheres por categoria original de cor/raça; percentuais sempre sobre o total de candidaturas de mulheres no mesmo universo",
    status: u ? DATA_STATUS.provisorio : DATA_STATUS.indisponivel,
    caveat:
      "Cor/raça é autodeclarada no registro. Quando houver leitura agregada, 'negra' = preta + parda, declarado explicitamente, e as categorias originais permanecem visíveis. A base não capta de forma confiável identidade trans ou travesti.",
  };
});

/** Contagem por categoria original, quando houver snapshot. */
export function raceCounts(universe: UniverseId): Record<string, number> | null {
  const u = snapshot?.universes[universe];
  if (!u) return null;
  return u.raceCounts;
}

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

/** Regra de composição de candidaturas por gênero. */
export const QUOTA_RULE = {
  /** faixa legal */
  floor: 30,
  ceiling: 70,
  shortName: "regra de composição de candidaturas de 30%–70% por gênero",
  scope:
    "Aplica-se às eleições proporcionais: cada partido ou federação preenche no mínimo 30% e no máximo 70% das candidaturas com cada gênero (Lei 9.504/1997, art. 10, §3º).",
  outOfScope:
    "As eleições majoritárias, de cargo único, não estão submetidas à regra de composição de candidaturas de 30%–70% por gênero.",
  descriptiveReading:
    "Os dois universos apresentam participação feminina diferente e estão submetidos a regras eleitorais diferentes. A comparação é ponto de partida para investigação, não prova de causalidade: a diferença observada não permite afirmar que a regra de composição explique o resultado.",
  financingNote:
    "As regras de destinação mínima de recursos públicos de campanha e de tempo de propaganda a candidaturas de mulheres são distintas da regra de composição de candidaturas e podem alcançar disputas majoritárias e proporcionais.",
  sourceUrl: TSE_SOURCE.legalUrl,
} as const;

/**
 * Funil candidatura → poder. Os degraus posteriores ao registro não têm valor
 * e não recebem estimativa.
 */
export type FunnelStep = {
  id: string;
  stage: CycleStageId;
  label: string;
  description: string;
  indicator: Indicator | null;
  /** status do degrau quando não há indicador calculável */
  status: DataStatus;
  /** o que falta, quando falta */
  pending: string | null;
};

export const FUNNEL_STEPS: FunnelStep[] = [
  {
    id: "candidaturas-proporcionais",
    stage: "registros",
    label: "Candidaturas · proporcionais",
    description:
      "Câmara dos Deputados, assembleias legislativas e Câmara Legislativa do Distrito Federal — eleições proporcionais, submetidas à regra de composição de candidaturas de 30%–70% por gênero.",
    indicator: PROPORTIONAL_SHARE,
    status: PROPORTIONAL_SHARE.status,
    pending:
      PROPORTIONAL_SHARE.value === null
        ? "Aguardando processamento da base oficial de Candidatos 2026."
        : null,
  },
  {
    id: "candidaturas-majoritarias",
    stage: "registros",
    label: "Candidaturas · majoritárias",
    description:
      "Presidência, governos estaduais e do Distrito Federal e Senado — disputas de cargo único, sem a regra de composição de candidaturas de 30%–70% por gênero.",
    indicator: MAJORITARIAN_SHARE,
    status: MAJORITARIAN_SHARE.status,
    pending:
      MAJORITARIAN_SHARE.value === null
        ? "Aguardando processamento da base oficial de Candidatos 2026."
        : null,
  },
  {
    id: "recursos",
    stage: "recursos",
    label: "Recursos de campanha",
    description:
      "Recursos públicos de campanha e tempo de propaganda efetivamente destinados a candidaturas de mulheres.",
    indicator: null,
    status: DATA_STATUS.indisponivel,
    pending:
      "Ainda não disponível: será integrado em módulo próprio, a partir das bases de prestação de contas do TSE.",
  },
  {
    id: "votos",
    stage: "votos-eleitas",
    label: "Votos recebidos",
    description: "Votação nominal válida dirigida a candidaturas de mulheres.",
    indicator: null,
    status: DATA_STATUS.indisponivel,
    pending: "Ainda não disponível antes da eleição de 2026.",
  },
  {
    id: "eleitas",
    stage: "votos-eleitas",
    label: "Eleitas",
    description: "Cadeiras efetivamente ocupadas por mulheres.",
    indicator: null,
    status: DATA_STATUS.indisponivel,
    pending: "Ainda não disponível antes da apuração da eleição de 2026.",
  },
  {
    id: "poder",
    stage: "poder-decisoes",
    label: "Poder e decisões",
    description:
      "Presidências de comissão, lideranças partidárias, mesas diretoras e secretarias.",
    indicator: null,
    status: DATA_STATUS.indisponivel,
    pending: "Módulo posterior, a levantar após a diplomação e a posse.",
  },
];

/** Raça × nível de poder — eixo central do observatório. */
export const RACE_BY_POWER_LEVEL: {
  level: string;
  note: string;
  indicator: Indicator | null;
  status: DataStatus;
  pending: string | null;
}[] = [
  {
    level: "Candidaturas proporcionais",
    note: "Cor/raça autodeclarada no registro de candidatura, nas categorias originais do TSE.",
    indicator: RACE_INDICATORS[0] ?? null,
    status: RACE_INDICATORS[0]?.status ?? DATA_STATUS.indisponivel,
    pending:
      RACE_INDICATORS[0]?.denominator === null
        ? "Aguardando processamento da base oficial de Candidatos 2026."
        : null,
  },
  {
    level: "Candidaturas majoritárias",
    note: "Universo pequeno: desagregar por cor/raça reduz as células a poucas unidades, o que exige leitura em contagens absolutas.",
    indicator: RACE_INDICATORS[1] ?? null,
    status: RACE_INDICATORS[1]?.status ?? DATA_STATUS.indisponivel,
    pending:
      RACE_INDICATORS[1]?.denominator === null
        ? "Aguardando processamento da base oficial de Candidatos 2026."
        : null,
  },
  {
    level: "Eleitas",
    note: "Depende da apuração de 2026.",
    indicator: null,
    status: DATA_STATUS.indisponivel,
    pending: "Ainda não disponível antes da apuração da eleição de 2026.",
  },
  {
    level: "Poder e decisões",
    note: "Presidências, lideranças e mesas diretoras.",
    indicator: null,
    status: DATA_STATUS.indisponivel,
    pending: "Módulo posterior, a levantar após a diplomação e a posse.",
  },
];

/** Direitos: marcos legais. */
export const RIGHTS_MILESTONES = [
  {
    year: "1932",
    title: "Código Eleitoral reconhece o voto feminino",
    body: "O Código Eleitoral de 1932 admite o voto de mulheres, mas de forma restrita: o alistamento era facultativo e, na prática, condicionado à situação civil e ocupacional. A obrigatoriedade e a equiparação de condições vieram nas normas eleitorais posteriores, ao longo das décadas seguintes.",
    sourceUrl: "https://www.tse.jus.br/",
  },
  {
    year: "1995",
    title: "Primeira reserva de candidaturas",
    body: "A Lei 9.100/1995 estabelece percentual mínimo de vagas de candidatura para mulheres nas eleições municipais.",
    sourceUrl:
      "https://www.planalto.gov.br/ccivil_03/leis/l9100.htm",
  },
  {
    year: "1997",
    title: "Lei 9.504 — composição de 30% a 70% por gênero",
    body: "Cada partido ou federação preenche no mínimo 30% e no máximo 70% das candidaturas em eleições proporcionais com cada gênero (art. 10, §3º).",
    sourceUrl: TSE_SOURCE.legalUrl,
  },
  {
    year: "2009",
    title: "De reservar para preencher",
    body: "A Lei 12.034/2009 altera a redação do art. 10, §3º: a regra passa a exigir preenchimento efetivo dos percentuais, e não apenas reserva de vagas.",
    sourceUrl: TSE_SOURCE.legalUrl,
  },
  {
    year: "2018",
    title: "Recursos públicos e tempo de propaganda",
    body: "STF e TSE fixam que recursos públicos de campanha e tempo de propaganda devem observar percentual mínimo destinado a candidaturas de mulheres, proporcional ao número dessas candidaturas.",
    sourceUrl:
      "https://www.tse.jus.br/comunicacao/noticias/2018/Maio/fundo-eleitoral-e-tempo-de-radio-e-tv-devem-reservar-o-minimo-de-30-para-candidaturas-femininas",
  },
  {
    year: "2020",
    title: "Distribuição proporcional para candidaturas negras",
    body: "O TSE decide que recursos públicos de campanha e tempo de propaganda devem ser distribuídos proporcionalmente também às candidaturas de pessoas negras, com efeitos antecipados para as eleições municipais de 2020.",
    sourceUrl: "https://www.tse.jus.br/",
  },
] as const;

export const RIGHTS_OPEN_QUESTIONS = [
  "A regra de composição de candidaturas incide sobre o registro, não sobre a competitividade: constar da lista não implica receber recursos ou tempo de propaganda.",
  "A regra de composição de 30%–70% por gênero não se aplica às disputas majoritárias, de cargo único.",
  "Casos de fraude à regra de composição de candidaturas por gênero podem ser apurados pela Justiça Eleitoral e são analisados individualmente, conforme as circunstâncias e as provas de cada processo.",
  "A distribuição proporcional de recursos por cor/raça é recente e a série histórica comparável ainda é curta.",
] as const;

/** Notas metodológicas. */
export const METHOD_NOTES = [
  {
    title: "Fonte e data",
    body: `Fonte única dos indicadores: ${TSE_SOURCE.name}. Data de geração da base informada pelo TSE: ${TSE_SOURCE.baseGeneratedAt}. Data/hora de processamento: ${TSE_SOURCE.processedAt ?? "ainda não processada"}. Última tentativa de obtenção do arquivo: ${TSE_SOURCE.lastFetchAttempt.at} — ${TSE_SOURCE.lastFetchAttempt.outcome}`,
  },
  {
    title: "Unidade de análise",
    body: "Candidatura registrada, não pessoa. Uma mesma pessoa pode aparecer em ciclos distintos; não há deduplicação longitudinal.",
  },
  {
    title: "Dois universos, calculados separadamente",
    body: "Proporcional: deputado federal, deputado estadual e deputado distrital. Majoritário: presidente, governador e senador. Cada universo tem denominador próprio e os universos nunca são somados em um único cálculo.",
  },
  {
    title: "Gênero e cor/raça são autodeclarados",
    body: "Ambos vêm do registro de candidatura no TSE, nas categorias originais da base. Não há substituição das categorias originais por agregações; quando uma leitura agregada for apresentada, a agregação é declarada ('negra' = preta + parda). A base não capta de forma confiável identidade trans ou travesti.",
  },
  {
    title: "Comparação entre universos é descritiva",
    body: QUOTA_RULE.descriptiveReading,
  },
  {
    title: "Precisão e arredondamento",
    body: "O valor bruto é preservado na camada de dados; o arredondamento ocorre apenas na apresentação. Diferenças entre percentuais são expressas em pontos percentuais (p.p.). Nenhum percentual é exibido sem denominador.",
  },
  {
    title: "Dados provisórios",
    body: "O registro de candidaturas de 2026 segue sujeito a alteração pelo TSE — deferimentos, indeferimentos, substituições e recursos. Indicadores derivados dessa base são marcados como provisórios.",
  },
  {
    title: "Etapas em aberto",
    body: "Recursos de campanha entram em módulo próprio; votos e eleitas dependem da apuração; poder e decisões dependem da posse. Até então, esses degraus permanecem vazios por decisão editorial.",
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

/** Formatação: valor bruto → apresentação em pt-BR, uma casa decimal. */
export function formatPercent(value: number | null, digits = 1): string {
  if (value === null) return "—";
  return `${value.toLocaleString("pt-BR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })}%`;
}

export function formatPoints(value: number | null, digits = 1): string {
  if (value === null) return "—";
  return `${value.toLocaleString("pt-BR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })} p.p.`;
}

/** Denominador legível: "n de N candidaturas". */
export function formatRatio(i: Indicator): string | null {
  if (i.numerator === null || i.denominator === null) return null;
  return `${i.numerator.toLocaleString("pt-BR")} de ${i.denominator.toLocaleString("pt-BR")} candidaturas`;
}
