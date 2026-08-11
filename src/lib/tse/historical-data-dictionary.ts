/**
 * historical-data-dictionary — dicionário versionado dos conjuntos oficiais
 * "Candidatos" do TSE para as eleições gerais de 2014, 2018, 2022 e 2026.
 *
 * Este arquivo é DOCUMENTAÇÃO EXECUTÁVEL: nenhum indicador é calculado aqui e
 * nada do que já existe para 2026 (Bloco 4) é alterado. Ele registra apenas:
 *   1. os cabeçalhos REAIS lidos dos arquivos oficiais na data da inspeção;
 *   2. o significado, tipo e valores observados de cada campo priorizado;
 *   3. o veredito de comparabilidade histórica campo a campo;
 *   4. a chave da unidade de análise e a regra de deduplicação por ano;
 *   5. a matriz de comparabilidade dos indicadores desejados.
 *
 * MÉTODO DA INSPEÇÃO
 * Os cabeçalhos foram lidos diretamente dos .zip oficiais do CDN do TSE
 * (requisições Range sobre o diretório central do zip + descompactação do
 * início do membro CSV). Nenhuma fonte secundária foi usada. Os "valores
 * observados" vêm de amostras reais dos arquivos inspecionados (indicadas em
 * `sampledFrom`) e NÃO são a enumeração fechada do domínio — são evidência do
 * que aparece na base, não uma recodificação.
 *
 * PRESERVAÇÃO
 * Nenhum valor do TSE é recodificado aqui. Agregações analíticas (por exemplo
 * NEGRA = PRETA + PARDA) são transformação separada e explicitamente
 * documentada na camada de indicadores — nunca no dicionário.
 */

export const HISTORICAL_DICTIONARY_VERSION = "2026.08.11-b5.0";

/** Data/hora (UTC) em que os cabeçalhos reais foram lidos dos arquivos oficiais. */
export const HISTORICAL_INSPECTED_AT = "2026-08-11T23:20:00Z";

export type HistoricalYear = 2014 | 2018 | 2022 | 2026;

export const HISTORICAL_YEARS: HistoricalYear[] = [2014, 2018, 2022, 2026];

/** Conjuntos oficiais consultados, por ano. */
export const OFFICIAL_SOURCES: Array<{
  year: HistoricalYear;
  datasetPage: string;
  resources: Array<{ resource: string; url: string; inspected: boolean }>;
}> = [
  {
    year: 2014,
    datasetPage: "https://dadosabertos.tse.jus.br/dataset/candidatos-2014",
    resources: [
      {
        resource: "Candidatos",
        url: "https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_cand/consulta_cand_2014.zip",
        inspected: true,
      },
      {
        resource: "Candidatos - Informações complementares",
        url: "https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_cand_complementar/consulta_cand_complementar_2014.zip",
        inspected: true,
      },
      {
        resource: "Coligações",
        url: "https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_coligacao/consulta_coligacao_2014.zip",
        inspected: false,
      },
      {
        resource: "Vagas",
        url: "https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_vagas/consulta_vagas_2014.zip",
        inspected: false,
      },
    ],
  },
  {
    year: 2018,
    datasetPage: "https://dadosabertos.tse.jus.br/dataset/candidatos-2018",
    resources: [
      {
        resource: "Candidatos",
        url: "https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_cand/consulta_cand_2018.zip",
        inspected: true,
      },
      {
        resource: "Candidatos - Informações complementares",
        url: "https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_cand_complementar/consulta_cand_complementar_2018.zip",
        inspected: true,
      },
      {
        resource: "Coligações",
        url: "https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_coligacao/consulta_coligacao_2018.zip",
        inspected: false,
      },
      {
        resource: "Vagas",
        url: "https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_vagas/consulta_vagas_2018.zip",
        inspected: false,
      },
    ],
  },
  {
    year: 2022,
    datasetPage: "https://dadosabertos.tse.jus.br/dataset/candidatos-2022",
    resources: [
      {
        resource: "Candidatos",
        url: "https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_cand/consulta_cand_2022.zip",
        inspected: true,
      },
      {
        resource: "Candidatos - Informações complementares",
        url: "https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_cand_complementar/consulta_cand_complementar_2022.zip",
        inspected: true,
      },
      {
        resource: "Coligações",
        url: "https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_coligacao/consulta_coligacao_2022.zip",
        inspected: true,
      },
      {
        resource: "Vagas",
        url: "https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_vagas/consulta_vagas_2022.zip",
        inspected: true,
      },
    ],
  },
  {
    year: 2026,
    datasetPage: "https://dadosabertos.tse.jus.br/dataset/candidatos-2026",
    resources: [
      {
        resource: "Candidatos",
        url: "https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_cand/consulta_cand_2026.zip",
        inspected: true,
      },
    ],
  },
];

/**
 * Cabeçalhos REAIS lidos nos arquivos Candidatos. Amostra: arquivo de SE de
 * cada ano (o cabeçalho é idêntico em todos os membros do pacote do mesmo ano).
 * Resultado da inspeção: 2014, 2018, 2022 e 2026 têm cabeçalho IDÊNTICO no
 * recurso Candidatos — o TSE republicou as séries antigas no layout atual,
 * inclusive com as colunas de federação (preenchidas com nulo antes de 2022).
 */
export const CANDIDATOS_HEADER_BY_YEAR: Record<HistoricalYear, string[]> = {
  2014: [...([] as string[])],
  2018: [],
  2022: [],
  2026: [],
};

const CANDIDATOS_HEADER_COMMON = [
  "DT_GERACAO",
  "HH_GERACAO",
  "ANO_ELEICAO",
  "CD_TIPO_ELEICAO",
  "NM_TIPO_ELEICAO",
  "NR_TURNO",
  "CD_ELEICAO",
  "DS_ELEICAO",
  "DT_ELEICAO",
  "TP_ABRANGENCIA",
  "SG_UF",
  "SG_UE",
  "NM_UE",
  "CD_CARGO",
  "DS_CARGO",
  "SQ_CANDIDATO",
  "NR_CANDIDATO",
  "NM_CANDIDATO",
  "NM_URNA_CANDIDATO",
  "NM_SOCIAL_CANDIDATO",
  "NR_CPF_CANDIDATO",
  "DS_EMAIL",
  "CD_SITUACAO_CANDIDATURA",
  "DS_SITUACAO_CANDIDATURA",
  "TP_AGREMIACAO",
  "NR_PARTIDO",
  "SG_PARTIDO",
  "NM_PARTIDO",
  "NR_FEDERACAO",
  "NM_FEDERACAO",
  "SG_FEDERACAO",
  "DS_COMPOSICAO_FEDERACAO",
  "SQ_COLIGACAO",
  "NM_COLIGACAO",
  "DS_COMPOSICAO_COLIGACAO",
  "SG_UF_NASCIMENTO",
  "DT_NASCIMENTO",
  "NR_TITULO_ELEITORAL_CANDIDATO",
  "CD_GENERO",
  "DS_GENERO",
  "CD_GRAU_INSTRUCAO",
  "DS_GRAU_INSTRUCAO",
  "CD_ESTADO_CIVIL",
  "DS_ESTADO_CIVIL",
  "CD_COR_RACA",
  "DS_COR_RACA",
  "CD_OCUPACAO",
  "DS_OCUPACAO",
  "CD_SIT_TOT_TURNO",
  "DS_SIT_TOT_TURNO",
] as const;

for (const year of HISTORICAL_YEARS) {
  CANDIDATOS_HEADER_BY_YEAR[year] = [...CANDIDATOS_HEADER_COMMON];
}

/**
 * Cabeçalho REAL do recurso "Candidatos - Informações complementares".
 * Diferença estrutural confirmada: 2022 acrescenta ao final quatro colunas
 * (CD_GENERO_FEFC, DS_GENERO_FEFC, CD_COR_RACA_FEFC, DS_COR_RACA_FEFC) que não
 * existem em 2014 nem em 2018.
 */
const COMPLEMENTAR_HEADER_BASE = [
  "DT_GERACAO",
  "HH_GERACAO",
  "ANO_ELEICAO",
  "CD_ELEICAO",
  "SQ_CANDIDATO",
  "CD_DETALHE_SITUACAO_CAND",
  "DS_DETALHE_SITUACAO_CAND",
  "CD_NACIONALIDADE",
  "DS_NACIONALIDADE",
  "CD_MUNICIPIO_NASCIMENTO",
  "NM_MUNICIPIO_NASCIMENTO",
  "NR_IDADE_DATA_POSSE",
  "ST_QUILOMBOLA",
  "CD_ETNIA_INDIGENA",
  "DS_ETNIA_INDIGENA",
  "VR_DESPESA_MAX_CAMPANHA",
  "ST_REELEICAO",
  "ST_DECLARAR_BENS",
  "NR_PROTOCOLO_CANDIDATURA",
  "NR_PROCESSO",
  "CD_SITUACAO_CANDIDATO_PLEITO",
  "DS_SITUACAO_CANDIDATO_PLEITO",
  "CD_SITUACAO_CANDIDATO_URNA",
  "DS_SITUACAO_CANDIDATO_URNA",
  "ST_CANDIDATO_INSERIDO_URNA",
  "NM_TIPO_DESTINACAO_VOTOS",
  "CD_SITUACAO_CANDIDATO_TOT",
  "DS_SITUACAO_CANDIDATO_TOT",
  "ST_PREST_CONTAS",
  "ST_SUBSTITUIDO",
  "SQ_SUBSTITUIDO",
  "SQ_ORDEM_SUPLENCIA",
  "DT_ACEITE_CANDIDATURA",
  "CD_SITUACAO_JULGAMENTO",
  "DS_SITUACAO_JULGAMENTO",
  "CD_SITUACAO_JULGAMENTO_PLEITO",
  "DS_SITUACAO_JULGAMENTO_PLEITO",
  "CD_SITUACAO_JULGAMENTO_URNA",
  "DS_SITUACAO_JULGAMENTO_URNA",
  "CD_SITUACAO_CASSACAO",
  "DS_SITUACAO_CASSACAO",
  "CD_SITUACAO_CASSACAO_MIDIA",
  "DS_SITUACAO_CASSACAO_MIDIA",
  "CD_SITUACAO_DIPLOMA",
  "DS_SITUACAO_DIPLOMA",
];

export const COMPLEMENTAR_HEADER_BY_YEAR: Record<number, string[]> = {
  2014: [...COMPLEMENTAR_HEADER_BASE],
  2018: [...COMPLEMENTAR_HEADER_BASE],
  2022: [
    ...COMPLEMENTAR_HEADER_BASE,
    "CD_GENERO_FEFC",
    "DS_GENERO_FEFC",
    "CD_COR_RACA_FEFC",
    "DS_COR_RACA_FEFC",
  ],
};

/** Cabeçalho REAL do recurso Coligações (inspecionado em 2022). */
export const COLIGACOES_HEADER_2022 = [
  "DT_GERACAO",
  "HH_GERACAO",
  "ANO_ELEICAO",
  "CD_TIPO_ELEICAO",
  "NM_TIPO_ELEICAO",
  "NR_TURNO",
  "CD_ELEICAO",
  "DS_ELEICAO",
  "DT_ELEICAO",
  "SG_UF",
  "SG_UE",
  "NM_UE",
  "CD_CARGO",
  "DS_CARGO",
  "TP_AGREMIACAO",
  "NR_PARTIDO",
  "SG_PARTIDO",
  "NM_PARTIDO",
  "NR_FEDERACAO",
  "NM_FEDERACAO",
  "SG_FEDERACAO",
  "DS_COMPOSICAO_FEDERACAO",
  "SQ_COLIGACAO",
  "NM_COLIGACAO",
  "DS_COMPOSICAO_COLIGACAO",
  "CD_SITUACAO_LEGENDA",
  "DS_SITUACAO",
  "NM_TIPO_DESTINACAO_VOTOS",
];

/** Cabeçalho REAL do recurso Vagas (inspecionado em 2022). */
export const VAGAS_HEADER_2022 = [
  "DT_GERACAO",
  "HH_GERACAO",
  "ANO_ELEICAO",
  "CD_TIPO_ELEICAO",
  "NM_TIPO_ELEICAO",
  "CD_ELEICAO",
  "DS_ELEICAO",
  "DT_ELEICAO",
  "DT_POSSE",
  "SG_UF",
  "SG_UE",
  "NM_UE",
  "CD_CARGO",
  "DS_CARGO",
  "QT_VAGA",
];

export type Comparability =
  | "COMPARAVEL"
  | "COMPARAVEL_COM_RESSALVA"
  | "NAO_COMPARAVEL"
  | "AUSENTE";

export type HistoricalField = {
  /** Nome exato da coluna no arquivo do TSE. */
  column: string;
  /** Recurso/tabela de origem. */
  resource: "Candidatos" | "Informações complementares" | "Coligações" | "Vagas";
  /** Significado segundo o próprio arquivo e o leiame do recurso. */
  meaning: string;
  /** Tipo/formato observado. */
  type: "texto" | "inteiro" | "data" | "hora" | "decimal" | "codigo";
  /** Presença confirmada por ano na inspeção de cabeçalho. */
  presentIn: Record<HistoricalYear, boolean>;
  /** Papel de chave/relacionamento, quando houver. */
  key?: string;
  /** Valores observados em amostras reais (não é domínio fechado). */
  observedValues?: Partial<Record<HistoricalYear, string[]>>;
  /** Amostra usada para os valores observados. */
  sampledFrom?: string;
  /** Veredito de comparabilidade 2014–2026. */
  comparability: Comparability;
  /** Ressalvas e mudanças de contexto que afetam a série. */
  caveat?: string;
  /** Uso possível no Quem São Elas. */
  useInProject: string;
};

const ALL_YEARS_TRUE: Record<HistoricalYear, boolean> = {
  2014: true,
  2018: true,
  2022: true,
  2026: true,
};

const CAND_SAMPLE =
  "consulta_cand_<ano>_SE.csv (e BR/DF de 2022 para cargos nacionais e distritais)";

export const HISTORICAL_FIELDS: HistoricalField[] = [
  {
    column: "ANO_ELEICAO",
    resource: "Candidatos",
    meaning: "Ano do pleito a que a candidatura se refere.",
    type: "inteiro",
    presentIn: { ...ALL_YEARS_TRUE },
    key: "componente da chave histórica",
    observedValues: {
      2014: ["2014"],
      2018: ["2018"],
      2022: ["2022"],
      2026: ["2026"],
    },
    sampledFrom: CAND_SAMPLE,
    comparability: "COMPARAVEL",
    useInProject: "Eixo temporal de toda a série histórica.",
  },
  {
    column: "CD_TIPO_ELEICAO",
    resource: "Candidatos",
    meaning: "Código do tipo de eleição (ordinária, suplementar etc.).",
    type: "codigo",
    presentIn: { ...ALL_YEARS_TRUE },
    observedValues: { 2014: ["2"], 2018: ["2"], 2022: ["2"], 2026: ["2"] },
    sampledFrom: CAND_SAMPLE,
    comparability: "COMPARAVEL",
    caveat:
      "A série histórica deve filtrar tipo ordinário (2) para não misturar eleições suplementares.",
    useInProject: "Filtro obrigatório de recorte da série.",
  },
  {
    column: "NM_TIPO_ELEICAO",
    resource: "Candidatos",
    meaning: "Descrição do tipo de eleição.",
    type: "texto",
    presentIn: { ...ALL_YEARS_TRUE },
    observedValues: {
      2014: ["ELEIÇÃO ORDINÁRIA"],
      2018: ["ELEIÇÃO ORDINÁRIA"],
      2022: ["ELEIÇÃO ORDINÁRIA"],
      2026: ["ELEIÇÃO ORDINÁRIA"],
    },
    sampledFrom: CAND_SAMPLE,
    comparability: "COMPARAVEL",
    useInProject: "Documentação do recorte aplicado.",
  },
  {
    column: "CD_ELEICAO",
    resource: "Candidatos",
    meaning: "Código interno do TSE para cada eleição.",
    type: "codigo",
    presentIn: { ...ALL_YEARS_TRUE },
    key: "chave de junção com Informações complementares (CD_ELEICAO + SQ_CANDIDATO)",
    observedValues: { 2014: ["143"], 2018: ["297"], 2022: ["546"] },
    sampledFrom: CAND_SAMPLE,
    comparability: "COMPARAVEL_COM_RESSALVA",
    caveat:
      "O código muda a cada ano e, em alguns anos, há mais de um CD_ELEICAO no mesmo pleito (nacional e estaduais). Não é comparável como valor; é comparável como chave dentro do ano.",
    useInProject: "Junção interna por ano; nunca eixo de comparação.",
  },
  {
    column: "DS_ELEICAO",
    resource: "Candidatos",
    meaning: "Nome da eleição.",
    type: "texto",
    presentIn: { ...ALL_YEARS_TRUE },
    observedValues: {
      2014: ["Eleições Gerais 2014"],
      2018: ["Eleições Gerais Estaduais 2018"],
      2022: ["Eleições Gerais Estaduais 2022"],
    },
    sampledFrom: CAND_SAMPLE,
    comparability: "COMPARAVEL_COM_RESSALVA",
    caveat:
      "A nomenclatura muda: 2014 usa um único rótulo nacional; 2018 e 2022 separam 'Gerais' (nacional) de 'Gerais Estaduais'. Comparar por ANO_ELEICAO, não por este texto.",
    useInProject: "Rastreabilidade e nota de método.",
  },
  {
    column: "SG_UF",
    resource: "Candidatos",
    meaning: "Sigla da UF do pleito ('BR' para cargos nacionais).",
    type: "texto",
    presentIn: { ...ALL_YEARS_TRUE },
    observedValues: { 2022: ["SE", "DF", "BR"] },
    sampledFrom: CAND_SAMPLE,
    comparability: "COMPARAVEL",
    useInProject: "Distribuição territorial de candidaturas por ano.",
  },
  {
    column: "SG_UE",
    resource: "Candidatos",
    meaning: "Unidade eleitoral do cargo disputado.",
    type: "texto",
    presentIn: { ...ALL_YEARS_TRUE },
    key: "compõe o recorte territorial junto de CD_CARGO",
    comparability: "COMPARAVEL",
    caveat:
      "Em eleições gerais a unidade eleitoral é a UF (ou BR). Em eleições municipais seria o código do município — não aplicável a esta série.",
    useInProject: "Agrupamento territorial.",
  },
  {
    column: "NM_UE",
    resource: "Candidatos",
    meaning: "Nome da unidade eleitoral.",
    type: "texto",
    presentIn: { ...ALL_YEARS_TRUE },
    comparability: "COMPARAVEL",
    useInProject: "Rótulos legíveis de território.",
  },
  {
    column: "CD_CARGO",
    resource: "Candidatos",
    meaning: "Código do cargo disputado.",
    type: "codigo",
    presentIn: { ...ALL_YEARS_TRUE },
    observedValues: {
      2014: ["3", "4", "5", "6", "7", "9", "10"],
      2018: ["3", "4", "5", "6", "7", "9", "10"],
      2022: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      2026: ["3", "4", "5", "6", "7", "9", "10"],
    },
    sampledFrom: CAND_SAMPLE,
    comparability: "COMPARAVEL",
    caveat:
      "Códigos observados estáveis: 1 PRESIDENTE, 2 VICE-PRESIDENTE, 3 GOVERNADOR, 4 VICE-GOVERNADOR, 5 SENADOR, 6 DEPUTADO FEDERAL, 7 DEPUTADO ESTADUAL, 8 DEPUTADO DISTRITAL, 9 1º SUPLENTE, 10 2º SUPLENTE. A ausência de 1/2/8 em uma amostra é efeito do arquivo por UF, não mudança de schema.",
    useInProject:
      "Definição dos universos proporcional (6,7,8) e majoritário (1,3,5) já usados em 2026.",
  },
  {
    column: "DS_CARGO",
    resource: "Candidatos",
    meaning: "Descrição do cargo.",
    type: "texto",
    presentIn: { ...ALL_YEARS_TRUE },
    observedValues: {
      2022: [
        "PRESIDENTE",
        "VICE-PRESIDENTE",
        "GOVERNADOR",
        "VICE-GOVERNADOR",
        "SENADOR",
        "DEPUTADO FEDERAL",
        "DEPUTADO ESTADUAL",
        "DEPUTADO DISTRITAL",
        "1º SUPLENTE",
        "2º SUPLENTE",
      ],
    },
    sampledFrom: CAND_SAMPLE,
    comparability: "COMPARAVEL",
    useInProject: "Rótulo de cargo; universo por cargo.",
  },
  {
    column: "SQ_CANDIDATO",
    resource: "Candidatos",
    meaning: "Sequencial da candidatura atribuído pelo TSE.",
    type: "inteiro",
    presentIn: { ...ALL_YEARS_TRUE },
    key: "chave primária da candidatura DENTRO de um ano/eleição",
    comparability: "COMPARAVEL_COM_RESSALVA",
    caveat:
      "Único por candidatura dentro do ano, mas NÃO é identificador de pessoa nem estável entre anos: a mesma pessoa recebe SQ_CANDIDATO diferente em cada pleito. Não usar sozinho como chave histórica.",
    useInProject:
      "Deduplicação da unidade de análise dentro de cada ano e junção com Informações complementares.",
  },
  {
    column: "NR_CANDIDATO",
    resource: "Candidatos",
    meaning: "Número da candidatura na urna.",
    type: "inteiro",
    presentIn: { ...ALL_YEARS_TRUE },
    comparability: "NAO_COMPARAVEL",
    caveat: "Reaproveitado entre pessoas, anos e cargos.",
    useInProject: "Apenas exibição pontual; nunca chave.",
  },
  {
    column: "NM_CANDIDATO",
    resource: "Candidatos",
    meaning: "Nome completo registrado.",
    type: "texto",
    presentIn: { ...ALL_YEARS_TRUE },
    comparability: "COMPARAVEL_COM_RESSALVA",
    caveat:
      "Homônimos e variações de grafia impedem uso como identificador. Nunca inferir gênero ou raça a partir do nome.",
    useInProject: "Exibição e conferência manual.",
  },
  {
    column: "NM_URNA_CANDIDATO",
    resource: "Candidatos",
    meaning: "Nome de urna.",
    type: "texto",
    presentIn: { ...ALL_YEARS_TRUE },
    comparability: "COMPARAVEL",
    useInProject: "Exibição pública.",
  },
  {
    column: "NM_SOCIAL_CANDIDATO",
    resource: "Candidatos",
    meaning: "Nome social, quando registrado.",
    type: "texto",
    presentIn: { ...ALL_YEARS_TRUE },
    observedValues: {
      2014: ["#NULO#"],
      2018: ["#NULO#"],
      2022: ["#NULO"],
      2026: ["#NULO"],
    },
    sampledFrom: CAND_SAMPLE,
    comparability: "COMPARAVEL_COM_RESSALVA",
    caveat:
      "A coluna existe nos quatro anos, mas o registro de nome social só passou a ser permitido em candidaturas a partir de 2018 (Res. TSE 23.562/2018). Preenchimento em 2014 é nulo. O campo NÃO identifica identidade de gênero: informa apenas que houve nome social registrado. Não usar como proxy de pessoas trans ou travestis.",
    useInProject:
      "Documentação de limite da base; nenhum indicador é derivado deste campo.",
  },
  {
    column: "CD_SITUACAO_CANDIDATURA",
    resource: "Candidatos",
    meaning: "Código da situação do registro da candidatura.",
    type: "codigo",
    presentIn: { ...ALL_YEARS_TRUE },
    observedValues: { 2014: ["12", "3"], 2018: ["12", "3"], 2022: ["12", "3"] },
    sampledFrom: CAND_SAMPLE,
    comparability: "COMPARAVEL_COM_RESSALVA",
    caveat:
      "Anos encerrados trazem a situação final; 2026 está em curso e traz situação ainda não encerrada. Comparar 2026 com anos fechados exige declarar o estágio processual.",
    useInProject: "Filtro de aptidão e nota de estágio da base.",
  },
  {
    column: "DS_SITUACAO_CANDIDATURA",
    resource: "Candidatos",
    meaning: "Descrição da situação do registro.",
    type: "texto",
    presentIn: { ...ALL_YEARS_TRUE },
    observedValues: {
      2014: ["APTO", "INAPTO"],
      2018: ["APTO", "INAPTO"],
      2022: ["APTO", "INAPTO"],
      2026: ["#NE"],
    },
    sampledFrom: CAND_SAMPLE,
    comparability: "COMPARAVEL_COM_RESSALVA",
    caveat:
      "Em 2026 a amostra inspecionada traz '#NE' (não encerrado/não especificado): o julgamento dos registros ainda corre. Isso não é ausência de dado histórico, é estágio do processo.",
    useInProject:
      "Já usado em 2026 como situação declarada; na série histórica exige aviso de estágio.",
  },
  {
    column: "CD_DETALHE_SITUACAO_CAND",
    resource: "Informações complementares",
    meaning: "Código do detalhamento da situação da candidatura.",
    type: "codigo",
    presentIn: { 2014: true, 2018: true, 2022: true, 2026: false },
    comparability: "COMPARAVEL_COM_RESSALVA",
    caveat:
      "Não está no recurso Candidatos: só no complementar, exigindo junção por CD_ELEICAO + SQ_CANDIDATO. Para 2026 o recurso complementar ainda não foi inspecionado nesta rodada.",
    useInProject: "Detalhe processual de indeferimentos e cassações.",
  },
  {
    column: "DS_DETALHE_SITUACAO_CAND",
    resource: "Informações complementares",
    meaning: "Descrição do detalhamento da situação.",
    type: "texto",
    presentIn: { 2014: true, 2018: true, 2022: true, 2026: false },
    comparability: "COMPARAVEL_COM_RESSALVA",
    caveat: "Mesma ressalva de junção e de estágio processual.",
    useInProject: "Explicação do que barrou uma candidatura.",
  },
  {
    column: "TP_AGREMIACAO",
    resource: "Candidatos",
    meaning: "Forma de agremiação da candidatura.",
    type: "texto",
    presentIn: { ...ALL_YEARS_TRUE },
    observedValues: {
      2014: ["COLIGAÇÃO", "PARTIDO ISOLADO"],
      2018: ["COLIGAÇÃO", "PARTIDO ISOLADO"],
      2022: ["FEDERAÇÃO", "PARTIDO ISOLADO", "COLIGAÇÃO"],
      2026: ["PARTIDO ISOLADO", "COLIGAÇÃO"],
    },
    sampledFrom: CAND_SAMPLE,
    comparability: "NAO_COMPARAVEL",
    caveat:
      "Mudança de regra, não de schema. Até 2018 havia coligação em eleições proporcionais; a EC 97/2017 vedou coligação proporcional a partir de 2020, e as federações partidárias surgem em 2022. Comparar a distribuição de TP_AGREMIACAO entre 2014/2018 e 2022/2026 compara regimes jurídicos diferentes. Em 2022 e 2026, 'COLIGAÇÃO' aparece apenas em cargos majoritários.",
    useInProject:
      "Explicação editorial da mudança de regra; não é série comparável.",
  },
  {
    column: "NR_PARTIDO",
    resource: "Candidatos",
    meaning: "Número do partido.",
    type: "inteiro",
    presentIn: { ...ALL_YEARS_TRUE },
    comparability: "COMPARAVEL_COM_RESSALVA",
    caveat: "Números podem ser reatribuídos após fusões e incorporações.",
    useInProject: "Junção com metadados partidários.",
  },
  {
    column: "SG_PARTIDO",
    resource: "Candidatos",
    meaning: "Sigla do partido.",
    type: "texto",
    presentIn: { ...ALL_YEARS_TRUE },
    observedValues: {
      2014: ["DEM", "PR"],
      2018: ["PODE", "PSL"],
      2022: ["REDE", "SOLIDARIEDADE"],
    },
    sampledFrom: CAND_SAMPLE,
    comparability: "COMPARAVEL_COM_RESSALVA",
    caveat:
      "Siglas mudam sem que a organização mude e organizações se fundem (PR→PL, DEM+PSL→UNIÃO, PPS→CIDADANIA, PMDB→MDB). Série por partido exige tabela de equivalência declarada; sem ela, comparar apenas dentro do ano.",
    useInProject: "Recorte por partido dentro de cada ano.",
  },
  {
    column: "NM_PARTIDO",
    resource: "Candidatos",
    meaning: "Nome do partido.",
    type: "texto",
    presentIn: { ...ALL_YEARS_TRUE },
    comparability: "COMPARAVEL_COM_RESSALVA",
    caveat: "Mesma ressalva de SG_PARTIDO.",
    useInProject: "Rótulo legível.",
  },
  {
    column: "SQ_COLIGACAO",
    resource: "Candidatos",
    meaning: "Sequencial da coligação/agremiação da candidatura.",
    type: "inteiro",
    presentIn: { ...ALL_YEARS_TRUE },
    key: "junção com o recurso Coligações dentro do ano",
    comparability: "NAO_COMPARAVEL",
    caveat:
      "Sequencial por ano. Em 2022 e 2026 preenche também candidaturas por federação e por partido isolado, então não representa a mesma entidade jurídica de 2014/2018.",
    useInProject: "Junção interna por ano.",
  },
  {
    column: "NM_COLIGACAO",
    resource: "Candidatos",
    meaning: "Nome da coligação (ou 'PARTIDO ISOLADO'/'FEDERAÇÃO').",
    type: "texto",
    presentIn: { ...ALL_YEARS_TRUE },
    observedValues: {
      2014: ["DIGO SIM A SERGIPE", "SERGIPE MEU AMOR"],
      2018: ["PARA RENOVAR SERGIPE", "PARTIDO ISOLADO"],
      2022: ["FEDERAÇÃO", "PARTIDO ISOLADO"],
    },
    sampledFrom: CAND_SAMPLE,
    comparability: "NAO_COMPARAVEL",
    caveat: "Rótulo livre, muda de semântica entre regimes de coligação.",
    useInProject: "Contexto qualitativo.",
  },
  {
    column: "DS_COMPOSICAO_COLIGACAO",
    resource: "Candidatos",
    meaning: "Partidos que compõem a coligação/federação.",
    type: "texto",
    presentIn: { ...ALL_YEARS_TRUE },
    comparability: "COMPARAVEL_COM_RESSALVA",
    caveat:
      "Existe nos quatro anos, mas descreve objetos jurídicos diferentes: coligação proporcional (até 2018), federação (2022+) e partido isolado.",
    useInProject: "Leitura de alianças por ano.",
  },
  {
    column: "SG_FEDERACAO",
    resource: "Candidatos",
    meaning: "Sigla da federação partidária.",
    type: "texto",
    presentIn: { ...ALL_YEARS_TRUE },
    observedValues: {
      2014: ["#NULO#"],
      2018: ["#NULO#"],
      2022: ["PSOL/REDE", "PSDB/CIDADANIA", "PT/PC do B/PV", "#NULO"],
      2026: ["#NULO"],
    },
    sampledFrom: CAND_SAMPLE,
    comparability: "AUSENTE",
    caveat:
      "A COLUNA existe em 2014 e 2018 (layout republicado), mas o INSTITUTO não existia: os valores são nulos. Tratar como ausente antes de 2022. NR_FEDERACAO, NM_FEDERACAO e DS_COMPOSICAO_FEDERACAO seguem a mesma regra.",
    useInProject: "Só entra em séries a partir de 2022.",
  },
  {
    column: "CD_GENERO",
    resource: "Candidatos",
    meaning: "Código do gênero declarado no registro.",
    type: "codigo",
    presentIn: { ...ALL_YEARS_TRUE },
    observedValues: { 2014: ["2", "4"], 2018: ["2", "4"], 2022: ["2", "4"] },
    sampledFrom: CAND_SAMPLE,
    comparability: "COMPARAVEL",
    caveat: "2 = MASCULINO, 4 = FEMININO em todos os anos inspecionados.",
    useInProject: "Numerador de candidaturas femininas na série histórica.",
  },
  {
    column: "DS_GENERO",
    resource: "Candidatos",
    meaning: "Descrição do gênero declarado.",
    type: "texto",
    presentIn: { ...ALL_YEARS_TRUE },
    observedValues: {
      2014: ["MASCULINO", "FEMININO"],
      2018: ["MASCULINO", "FEMININO"],
      2022: ["MASCULINO", "FEMININO"],
      2026: ["MASCULINO", "FEMININO"],
    },
    sampledFrom: CAND_SAMPLE,
    comparability: "COMPARAVEL",
    caveat:
      "Campo binário em todos os anos. A base NÃO registra identidade de gênero: não há como identificar candidaturas trans ou travestis, e o nome social não supre essa lacuna.",
    useInProject: "% de mulheres candidatas por ano, cargo e UF.",
  },
  {
    column: "CD_COR_RACA",
    resource: "Candidatos",
    meaning: "Código da cor/raça autodeclarada.",
    type: "codigo",
    presentIn: { ...ALL_YEARS_TRUE },
    observedValues: { 2014: ["01", "03"], 2018: ["01", "03"], 2022: ["01", "03"] },
    sampledFrom: CAND_SAMPLE,
    comparability: "COMPARAVEL_COM_RESSALVA",
    caveat: "Ver ressalvas de DS_COR_RACA.",
    useInProject: "Composição racial das candidaturas por ano.",
  },
  {
    column: "DS_COR_RACA",
    resource: "Candidatos",
    meaning: "Cor/raça autodeclarada no registro da candidatura.",
    type: "texto",
    presentIn: { ...ALL_YEARS_TRUE },
    observedValues: {
      2014: ["BRANCA", "PARDA", "PRETA", "AMARELA"],
      2018: ["BRANCA", "PARDA", "PRETA", "AMARELA", "INDÍGENA"],
      2022: ["BRANCA", "PARDA", "PRETA", "AMARELA", "INDÍGENA", "NÃO INFORMADO"],
      2026: ["BRANCA", "PARDA", "PRETA", "AMARELA", "INDÍGENA"],
    },
    sampledFrom: CAND_SAMPLE,
    comparability: "COMPARAVEL_COM_RESSALVA",
    caveat:
      "A autodeclaração de cor/raça passou a ser coletada nas candidaturas em 2014, então a série começa em 2014 e não antes. As categorias seguem o padrão IBGE, mas a amostra de 2022 mostra também 'NÃO INFORMADO', que deve aparecer explicitamente e nunca ser diluído nas demais. Valores originais preservados; NEGRA = PRETA + PARDA é transformação analítica separada e declarada.",
    useInProject: "Composição racial e cruzamento gênero × raça.",
  },
  {
    column: "CD_SIT_TOT_TURNO",
    resource: "Candidatos",
    meaning: "Código do resultado da candidatura no turno.",
    type: "codigo",
    presentIn: { ...ALL_YEARS_TRUE },
    comparability: "COMPARAVEL_COM_RESSALVA",
    caveat: "Ver ressalvas de DS_SIT_TOT_TURNO.",
    useInProject: "Base do indicador candidatas × eleitas.",
  },
  {
    column: "DS_SIT_TOT_TURNO",
    resource: "Candidatos",
    meaning: "Resultado da candidatura no turno (eleita, suplente, não eleita).",
    type: "texto",
    presentIn: { ...ALL_YEARS_TRUE },
    observedValues: {
      2014: [
        "ELEITO",
        "ELEITO POR QP",
        "ELEITO POR MÉDIA",
        "SUPLENTE",
        "NÃO ELEITO",
        "#NULO#",
      ],
      2018: [
        "ELEITO",
        "ELEITO POR QP",
        "ELEITO POR MÉDIA",
        "SUPLENTE",
        "NÃO ELEITO",
        "2º TURNO",
        "#NULO#",
      ],
      2022: [
        "ELEITO",
        "ELEITO POR QP",
        "ELEITO POR MÉDIA",
        "SUPLENTE",
        "NÃO ELEITO",
        "2º TURNO",
        "#NULO",
      ],
      2026: ["#NULO"],
    },
    sampledFrom: CAND_SAMPLE,
    comparability: "COMPARAVEL_COM_RESSALVA",
    caveat:
      "Só existe resultado para pleitos realizados: em 2026 o campo é nulo em toda a amostra, porque a eleição ainda não ocorreu. Somar 'eleitas' exige agregar ELEITO + ELEITO POR QP + ELEITO POR MÉDIA (agregação analítica declarada) e tratar '2º TURNO' como situação de primeiro turno, não como resultado final. O token de nulo muda de '#NULO#' (2014/2018) para '#NULO' (2022/2026).",
    useInProject: "Indicador candidatas × eleitas para 2014, 2018 e 2022.",
  },
  {
    column: "ST_REELEICAO",
    resource: "Informações complementares",
    meaning: "Indica se a candidatura é de reeleição.",
    type: "texto",
    presentIn: { 2014: true, 2018: true, 2022: true, 2026: false },
    comparability: "COMPARAVEL_COM_RESSALVA",
    caveat:
      "Fora do recurso Candidatos (exige junção). Recurso complementar de 2026 não inspecionado nesta rodada.",
    useInProject: "Leitura de incumbência; ainda não implementado.",
  },
  {
    column: "DT_GERACAO",
    resource: "Candidatos",
    meaning: "Data em que o TSE gerou o arquivo.",
    type: "data",
    presentIn: { ...ALL_YEARS_TRUE },
    observedValues: {
      2014: ["23/06/2021"],
      2018: ["13/11/2024"],
      2022: ["28/07/2026"],
    },
    sampledFrom: CAND_SAMPLE,
    comparability: "COMPARAVEL",
    caveat:
      "É a data da FOTOGRAFIA do arquivo, não a data da eleição. Arquivos históricos são reprocessados (o de 2022 foi gerado em 2026), então a data de geração nunca deve ser lida como data do pleito — para isso existe DT_ELEICAO.",
    useInProject:
      "Mesma regra do Bloco 4: DT_GERACAO + HH_GERACAO definem a data da base.",
  },
  {
    column: "HH_GERACAO",
    resource: "Candidatos",
    meaning: "Hora em que o TSE gerou o arquivo.",
    type: "hora",
    presentIn: { ...ALL_YEARS_TRUE },
    comparability: "COMPARAVEL",
    useInProject: "Compõe a data da fotografia junto de DT_GERACAO.",
  },
  {
    column: "QT_VAGA",
    resource: "Vagas",
    meaning: "Quantidade de vagas em disputa por cargo e unidade eleitoral.",
    type: "inteiro",
    presentIn: { 2014: true, 2018: true, 2022: true, 2026: false },
    key: "junção por ANO_ELEICAO + SG_UE + CD_CARGO",
    comparability: "COMPARAVEL",
    caveat:
      "Cabeçalho inspecionado em 2022; os pacotes de 2014 e 2018 existem no mesmo padrão de recurso. Permite calcular candidaturas por vaga, indicador ainda não implementado.",
    useInProject: "Denominador alternativo (competição por vaga).",
  },
];

/** Campos priorizados pelo pedido que NÃO existem no recurso indicado. */
export const NOT_FOUND_FIELDS: Array<{
  column: string;
  status: "AUSENTE" | "EM_OUTRO_RECURSO";
  note: string;
}> = [
  {
    column: "CD_DETALHE_SITUACAO_CAND / DS_DETALHE_SITUACAO_CAND",
    status: "EM_OUTRO_RECURSO",
    note: "Não estão no recurso Candidatos em nenhum dos anos: vivem em Informações complementares e exigem junção por CD_ELEICAO + SQ_CANDIDATO.",
  },
  {
    column: "ST_REELEICAO",
    status: "EM_OUTRO_RECURSO",
    note: "Idem: apenas em Informações complementares.",
  },
  {
    column: "Identidade de gênero (trans/travesti/não binária)",
    status: "AUSENTE",
    note: "Não existe coluna correspondente em nenhum ano. DS_GENERO é binário e NM_SOCIAL_CANDIDATO não é proxy válido. Lacuna estrutural da base.",
  },
  {
    column: "Deficiência / tipo de deficiência",
    status: "AUSENTE",
    note: "Não confirmado em nenhum cabeçalho público de Candidatos ou complementar em 2014, 2018, 2022 ou 2026.",
  },
  {
    column: "ST_QUILOMBOLA / CD_ETNIA_INDIGENA / DS_ETNIA_INDIGENA",
    status: "EM_OUTRO_RECURSO",
    note: "Confirmados no recurso Informações complementares de 2014, 2018 e 2022. Ainda não usados em nenhum indicador.",
  },
  {
    column: "CD_GENERO_FEFC / DS_GENERO_FEFC / CD_COR_RACA_FEFC / DS_COR_RACA_FEFC",
    status: "AUSENTE",
    note: "Só existem no complementar de 2022 (e em 2026, conforme Bloco 4). Ausentes em 2014 e 2018 — nenhuma série de financiamento por gênero/raça pode recuar além de 2022.",
  },
];

/**
 * Chave da unidade de análise por ano e regra de deduplicação.
 * A unidade é a CANDIDATURA, não a pessoa: o TSE não publica identificador
 * de pessoa estável entre anos nos arquivos abertos.
 */
export const ANALYSIS_KEY_BY_YEAR: Record<
  HistoricalYear,
  { key: string[]; dedupe: string; personKey: string }
> = {
  2014: {
    key: ["ANO_ELEICAO", "CD_ELEICAO", "SQ_CANDIDATO"],
    dedupe:
      "Manter a primeira ocorrência de cada SQ_CANDIDATO dentro do ano; descartar as demais linhas antes de qualquer contagem. Filtrar NR_TURNO = 1 para não contar duas vezes candidaturas que foram a segundo turno.",
    personKey:
      "Não há chave de pessoa comparável entre anos nos arquivos públicos. Comparações entre anos são de CANDIDATURAS, nunca de trajetórias individuais.",
  },
  2018: {
    key: ["ANO_ELEICAO", "CD_ELEICAO", "SQ_CANDIDATO"],
    dedupe: "Mesma regra de 2014.",
    personKey: "Mesma limitação de 2014.",
  },
  2022: {
    key: ["ANO_ELEICAO", "CD_ELEICAO", "SQ_CANDIDATO"],
    dedupe:
      "Mesma regra, com atenção extra: o pacote traz arquivos BR e BRASIL além dos arquivos por UF, o que pode duplicar linhas se todos forem lidos sem deduplicar por SQ_CANDIDATO.",
    personKey: "Mesma limitação de 2014.",
  },
  2026: {
    key: ["ANO_ELEICAO", "CD_ELEICAO", "SQ_CANDIDATO"],
    dedupe:
      "Regra já implementada no Bloco 4: deduplicação por SQ_CANDIDATO antes de qualquer incremento, com contagem de linhas brutas e de duplicidades preservada como anomalia informativa.",
    personKey: "Mesma limitação de 2014.",
  },
};

export type IndicatorComparability = {
  indicator: string;
  yearsUsable: HistoricalYear[];
  yearsBlocked: HistoricalYear[];
  fields: string[];
  caveats: string[];
};

/** Matriz de comparabilidade dos indicadores desejados na série histórica. */
export const INDICATOR_COMPARABILITY: IndicatorComparability[] = [
  {
    indicator: "% de mulheres candidatas (por universo, cargo e ano)",
    yearsUsable: [2014, 2018, 2022, 2026],
    yearsBlocked: [],
    fields: ["DS_GENERO", "CD_CARGO", "ANO_ELEICAO", "SQ_CANDIDATO"],
    caveats: [
      "2026 é base em curso: comparar com anos fechados exige declarar o estágio (registros ainda em julgamento).",
      "Manter os mesmos universos já documentados em 2026 (proporcional 6/7/8; majoritário 1/3/5), excluindo vice e suplentes.",
      "Gênero é binário na base em todos os anos.",
    ],
  },
  {
    indicator: "Composição racial das candidaturas",
    yearsUsable: [2014, 2018, 2022, 2026],
    yearsBlocked: [],
    fields: ["DS_COR_RACA", "CD_COR_RACA"],
    caveats: [
      "Série começa em 2014: antes disso o TSE não coletava cor/raça na candidatura.",
      "'NÃO INFORMADO' aparece em 2022 e precisa ser exibido, não diluído.",
      "Categorias originais preservadas; NEGRA = PRETA + PARDA só como transformação declarada.",
    ],
  },
  {
    indicator: "Gênero × raça",
    yearsUsable: [2014, 2018, 2022, 2026],
    yearsBlocked: [],
    fields: ["DS_GENERO", "DS_COR_RACA"],
    caveats: [
      "Mesmas ressalvas dos dois indicadores anteriores, somadas.",
      "Recortes muito pequenos (por exemplo mulheres indígenas em um estado) devem exibir o número absoluto, não só o percentual.",
    ],
  },
  {
    indicator: "Candidatas × eleitas",
    yearsUsable: [2014, 2018, 2022],
    yearsBlocked: [2026],
    fields: ["DS_SIT_TOT_TURNO", "CD_SIT_TOT_TURNO", "DS_GENERO"],
    caveats: [
      "2026 não entra: a eleição ainda não ocorreu e o campo de resultado é nulo.",
      "'Eleitas' = ELEITO + ELEITO POR QP + ELEITO POR MÉDIA (agregação analítica declarada).",
      "Filtrar NR_TURNO para não contar a mesma candidatura em dois turnos.",
    ],
  },
  {
    indicator: "Distribuição por UF e cargo",
    yearsUsable: [2014, 2018, 2022, 2026],
    yearsBlocked: [],
    fields: ["SG_UF", "SG_UE", "CD_CARGO", "DS_CARGO"],
    caveats: [
      "Cargos nacionais ficam em SG_UF = 'BR'; deputado distrital só existe no DF.",
      "O número de vagas por UF muda pouco, mas comparações de disputa por vaga exigem o recurso Vagas.",
    ],
  },
  {
    indicator: "Distribuição por partido / federação",
    yearsUsable: [2022, 2026],
    yearsBlocked: [2014, 2018],
    fields: ["SG_PARTIDO", "SG_FEDERACAO", "TP_AGREMIACAO"],
    caveats: [
      "Federação não existia antes de 2022, ainda que a coluna apareça no layout republicado.",
      "Séries por sigla partidária entre 2014 e 2026 exigem tabela de equivalência de fusões e mudanças de nome, que ainda não existe no projeto.",
      "Coligação proporcional foi vedada a partir de 2020: a comparação de agremiação entre 2018 e 2022 compara regimes jurídicos distintos.",
    ],
  },
  {
    indicator: "Financiamento por gênero/raça (FEFC)",
    yearsUsable: [2022],
    yearsBlocked: [2014, 2018],
    fields: ["DS_GENERO_FEFC", "DS_COR_RACA_FEFC"],
    caveats: [
      "Campos só existem no complementar a partir de 2022; nenhuma série histórica longa é possível.",
      "Ainda não implementado em nenhum indicador do projeto.",
    ],
  },
];

/**
 * Mudanças de regra e de contexto que afetam qualquer leitura da série.
 * Descritivas: registram o que mudou no direito e na base, sem atribuir
 * causalidade a nenhum resultado observado.
 */
export const CONTEXT_CHANGES: Array<{
  year: number;
  change: string;
  effect: string;
}> = [
  {
    year: 2014,
    change:
      "Passa a haver autodeclaração de cor/raça no registro de candidatura.",
    effect: "É o primeiro ano possível da série racial.",
  },
  {
    year: 2018,
    change:
      "Passa a ser possível registrar nome social na candidatura (Res. TSE 23.562/2018).",
    effect:
      "A coluna passa a ter preenchimento, mas não informa identidade de gênero.",
  },
  {
    year: 2020,
    change:
      "EC 97/2017 veda coligações em eleições proporcionais a partir deste pleito.",
    effect:
      "Quebra a comparabilidade de TP_AGREMIACAO, NM_COLIGACAO e SQ_COLIGACAO entre 2014/2018 e 2022/2026.",
  },
  {
    year: 2022,
    change:
      "Entram em cena as federações partidárias e os campos FEFC de gênero e cor/raça no recurso complementar.",
    effect:
      "Novas colunas úteis, mas sem retroatividade: nenhuma série que dependa delas alcança 2014 ou 2018.",
  },
  {
    year: 2026,
    change: "Base em curso, com registros ainda em julgamento.",
    effect:
      "Situação da candidatura e resultado não são finais; comparações com anos fechados devem declarar o estágio.",
  },
];

/** Resumo objetivo do que ficou confirmado e do que não ficou. */
export const HISTORICAL_SUMMARY = {
  inspectedAt: HISTORICAL_INSPECTED_AT,
  version: HISTORICAL_DICTIONARY_VERSION,
  headerIdenticalAcrossYears: true,
  confirmedInAllYears: CANDIDATOS_HEADER_COMMON.length,
  notes: [
    "Os 50 campos do recurso Candidatos são idênticos em 2014, 2018, 2022 e 2026: o TSE republicou as séries antigas no layout atual.",
    "Cabeçalho igual não significa dado comparável: federação e FEFC só têm conteúdo a partir de 2022, e resultado do pleito só existe em anos encerrados.",
    "Nenhum indicador de 2026 foi alterado nesta rodada; este arquivo é apenas dicionário e matriz de comparabilidade.",
  ],
};
