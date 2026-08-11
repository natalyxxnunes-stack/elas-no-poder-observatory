/**
 * data-dictionary — dicionário de dados auditável dos arquivos públicos do
 * conjunto oficial TSE / Dados Abertos / "Candidatos - 2026".
 *
 * Fonte de verdade: https://dadosabertos.tse.jus.br/dataset/candidatos-2026
 * (conjunto com atualização diária declarada pelo TSE).
 *
 * Este dicionário NÃO presume nomes de colunas: cada campo marcado como
 * `confirmado` foi lido diretamente do cabeçalho real dos arquivos .csv
 * publicados no recurso indicado, na data registrada em `INSPECTED_AT`.
 * Campos citados no projeto que NÃO existem nos arquivos públicos ficam em
 * `NOT_CONFIRMED_FIELDS`, sem invenção de coluna.
 *
 * Regra editorial: nenhuma agregação silenciosa. Cor/raça permanece nas
 * categorias originais do TSE; `preta + parda = negra` é transformação
 * analítica declarada (ver `aggregateBlack` em `compute.ts`).
 * Identidade de gênero não é inferida por nome, nome social ou qualquer proxy.
 */

/** Versão do dicionário. Muda quando um campo é confirmado, alterado ou removido. */
export const DICTIONARY_VERSION = "2026.08.11-dic1";

/** Data/hora (UTC) da inspeção dos cabeçalhos reais que originou este dicionário. */
export const INSPECTED_AT = "2026-08-11T23:00:00Z";

/** Página oficial do conjunto. */
export const DATASET_URL =
  "https://dadosabertos.tse.jus.br/dataset/candidatos-2026";

/** Recursos do conjunto 2026 relevantes para o projeto. */
export const RESOURCES = {
  candidatos: {
    id: "candidatos",
    tseName: "Candidatos",
    url: "https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_cand/consulta_cand_2026.zip",
    filePattern: "consulta_cand_2026_<UF|BRASIL>.csv",
    encoding: "ISO-8859-1",
    delimiter: ";",
    /** um arquivo por UF + BRASIL */
    used: true,
    note: "Recurso principal: uma linha por candidatura registrada.",
  },
  complementar: {
    id: "complementar",
    tseName: "Candidatos - Informações complementares",
    url: "https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_cand_complementar/consulta_cand_complementar_2026.zip",
    filePattern: "consulta_cand_complementar_2026_<UF|BRASIL>.csv",
    encoding: "ISO-8859-1",
    delimiter: ";",
    used: false,
    note: "Relaciona-se a Candidatos por SQ_CANDIDATO. Traz detalhe da situação, quilombola e etnia indígena. Infraestrutura preparada; ainda não ingerido.",
  },
  coligacoes: {
    id: "coligacoes",
    tseName: "Coligações",
    url: "https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_coligacao/consulta_coligacao_2026.zip",
    filePattern: "consulta_coligacao_2026_<UF|BRASIL>.csv",
    encoding: "ISO-8859-1",
    delimiter: ";",
    used: false,
    note: "Relaciona-se por SQ_COLIGACAO (e por SG_UE + CD_CARGO). Composição de federações e coligações por cargo.",
  },
  vagas: {
    id: "vagas",
    tseName: "Vagas",
    url: "https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_vagas/consulta_vagas_2026.zip",
    filePattern: "consulta_vagas_2026_<UF|BRASIL>.csv",
    encoding: "ISO-8859-1",
    delimiter: ";",
    used: false,
    note: "Relaciona-se por SG_UE + CD_CARGO. QT_VAGA permite futuramente comparar candidaturas por vaga disponível.",
  },
  bens: {
    id: "bens",
    tseName: "Bens de candidatos",
    url: "https://cdn.tse.jus.br/estatistica/sead/odsele/bem_candidato/bem_candidato_2026.zip",
    filePattern: "bem_candidato_2026_<UF|BRASIL>.csv",
    encoding: "ISO-8859-1",
    delimiter: ";",
    used: false,
    note: "Relaciona-se por SQ_CANDIDATO. Não inspecionado nesta rodada; campos não confirmados.",
  },
} as const;

export type ResourceId = keyof typeof RESOURCES;

export type FieldStatus = "confirmado" | "nao_confirmado";

export type DictionaryField = {
  /** nome exato da coluna no arquivo do TSE */
  column: string;
  /** recurso de origem */
  resource: ResourceId;
  status: FieldStatus;
  /** descrição e uso analítico no projeto */
  description: string;
  /** chave ou relacionamento */
  key?: "primaria" | "relacionamento";
  /** obrigatório para os indicadores atuais */
  required: boolean;
  /** estrutural: se desaparecer, a publicação do snapshot é bloqueada */
  structural?: boolean;
  /** valores observados na inspeção, quando confirmáveis */
  observedValues?: string[];
  /** indicadores do projeto que dependem do campo */
  usedBy: string[];
  note?: string;
};

/**
 * Campos CONFIRMADOS no cabeçalho real dos arquivos públicos 2026.
 * Valores observados vêm da leitura completa do recurso `Candidatos`
 * (26.678 linhas na fotografia inspecionada).
 */
export const FIELDS: readonly DictionaryField[] = [
  {
    column: "SQ_CANDIDATO",
    resource: "candidatos",
    status: "confirmado",
    key: "primaria",
    required: true,
    structural: true,
    description:
      "Identificador único da candidatura no TSE. Chave para relacionar Candidatos com Informações complementares e Bens de candidatos. Unidade de análise do projeto é a candidatura, não a pessoa.",
    usedBy: ["contagem de candidaturas (deduplicação)"],
  },
  {
    column: "DS_CARGO",
    resource: "candidatos",
    status: "confirmado",
    required: true,
    structural: true,
    description:
      "Descrição do cargo. Define o universo: proporcional (deputado federal, estadual, distrital) e majoritário (presidente, governador, senador). Vice e suplente ficam fora dos dois denominadores.",
    observedValues: [
      "DEPUTADO FEDERAL",
      "DEPUTADO ESTADUAL",
      "DEPUTADO DISTRITAL",
      "PRESIDENTE",
      "VICE-PRESIDENTE",
      "GOVERNADOR",
      "VICE-GOVERNADOR",
      "SENADOR",
      "1º SUPLENTE",
      "2º SUPLENTE",
    ],
    usedBy: [
      "participacao-feminina-proporcional",
      "participacao-feminina-majoritario",
      "diferenca-pp",
    ],
    note: "Em Vagas e Coligações o mesmo cargo aparece com capitalização diferente (ex.: 'Governador'); a comparação é normalizada.",
  },
  {
    column: "CD_CARGO",
    resource: "candidatos",
    status: "confirmado",
    key: "relacionamento",
    required: false,
    description:
      "Código do cargo. Relaciona candidaturas com Vagas (SG_UE + CD_CARGO) e com Coligações.",
    usedBy: ["infraestrutura: candidaturas por vaga (futuro)"],
  },
  {
    column: "DS_GENERO",
    resource: "candidatos",
    status: "confirmado",
    required: true,
    structural: true,
    description:
      "Gênero conforme registro no TSE. Base binária: o numerador dos indicadores é a categoria FEMININO. Não há inferência por nome.",
    observedValues: ["FEMININO", "MASCULINO"],
    usedBy: [
      "participacao-feminina-proporcional",
      "participacao-feminina-majoritario",
      "recorte raça × cargo",
    ],
  },
  {
    column: "CD_GENERO",
    resource: "candidatos",
    status: "confirmado",
    required: false,
    description: "Código do gênero, espelho de DS_GENERO.",
    usedBy: [],
  },
  {
    column: "DS_COR_RACA",
    resource: "candidatos",
    status: "confirmado",
    required: false,
    structural: true,
    description:
      "Cor/raça autodeclarada, mantida nas categorias originais. A agregação preta + parda = negra é transformação analítica declarada, nunca substituição das categorias.",
    observedValues: ["BRANCA", "PARDA", "PRETA", "INDÍGENA", "AMARELA"],
    usedBy: ["recorte raça × nível de poder"],
    note: "Na fotografia inspecionada não apareceram linhas com 'NÃO INFORMADO' nesta coluna.",
  },
  {
    column: "CD_COR_RACA",
    resource: "candidatos",
    status: "confirmado",
    required: false,
    description: "Código de cor/raça, espelho de DS_COR_RACA.",
    usedBy: [],
  },
  {
    column: "SG_UF",
    resource: "candidatos",
    status: "confirmado",
    required: false,
    structural: true,
    description:
      "Unidade federativa da candidatura. Território no cruzamento gênero × raça × território.",
    usedBy: ["recorte territorial (infraestrutura)"],
  },
  {
    column: "SG_UE",
    resource: "candidatos",
    status: "confirmado",
    key: "relacionamento",
    required: false,
    description:
      "Sigla da unidade eleitoral. Nas eleições gerais equivale à UF (ou BR para presidente). Relaciona com Vagas e Coligações.",
    usedBy: ["infraestrutura: candidaturas por vaga (futuro)"],
  },
  {
    column: "NM_UE",
    resource: "candidatos",
    status: "confirmado",
    required: false,
    description: "Nome da unidade eleitoral (ex.: ACRE, BRASIL).",
    usedBy: [],
  },
  {
    column: "SG_PARTIDO",
    resource: "candidatos",
    status: "confirmado",
    required: false,
    structural: true,
    description:
      "Sigla do partido da candidatura. Base do eixo 'quem controla' (quem lança mulheres e em que cargos).",
    usedBy: ["recorte partido × gênero (infraestrutura)"],
  },
  {
    column: "NM_PARTIDO",
    resource: "candidatos",
    status: "confirmado",
    required: false,
    description: "Nome do partido.",
    usedBy: [],
  },
  {
    column: "NR_PARTIDO",
    resource: "candidatos",
    status: "confirmado",
    required: false,
    description: "Número do partido.",
    usedBy: [],
  },
  {
    column: "TP_AGREMIACAO",
    resource: "candidatos",
    status: "confirmado",
    required: false,
    description:
      "Forma de agremiação da candidatura. Distingue partido isolado, federação e coligação — necessário porque em 2026 a candidatura proporcional é por partido ou federação.",
    observedValues: ["PARTIDO ISOLADO", "FEDERAÇÃO", "COLIGAÇÃO"],
    usedBy: ["recorte agremiação × gênero (infraestrutura)"],
  },
  {
    column: "SG_FEDERACAO",
    resource: "candidatos",
    status: "confirmado",
    required: false,
    description:
      "Sigla da federação partidária, quando houver. '#NULO' quando não se aplica.",
    usedBy: ["recorte federação × gênero (infraestrutura)"],
  },
  {
    column: "NM_FEDERACAO",
    resource: "candidatos",
    status: "confirmado",
    required: false,
    description: "Nome da federação.",
    usedBy: [],
  },
  {
    column: "DS_COMPOSICAO_FEDERACAO",
    resource: "candidatos",
    status: "confirmado",
    required: false,
    description: "Partidos que compõem a federação.",
    usedBy: [],
  },
  {
    column: "SQ_COLIGACAO",
    resource: "candidatos",
    status: "confirmado",
    key: "relacionamento",
    required: false,
    description:
      "Identificador da coligação/legenda. Relaciona com o recurso Coligações.",
    usedBy: ["infraestrutura: composição de chapas (futuro)"],
  },
  {
    column: "NM_COLIGACAO",
    resource: "candidatos",
    status: "confirmado",
    required: false,
    description:
      "Nome da coligação. Vem como 'PARTIDO ISOLADO' quando a candidatura não integra coligação.",
    usedBy: [],
  },
  {
    column: "DS_COMPOSICAO_COLIGACAO",
    resource: "candidatos",
    status: "confirmado",
    required: false,
    description: "Partidos que compõem a coligação.",
    usedBy: [],
  },
  {
    column: "DS_SITUACAO_CANDIDATURA",
    resource: "candidatos",
    status: "confirmado",
    required: false,
    structural: true,
    description:
      "Situação da candidatura. Na fotografia inspecionada aparece integralmente como '#NE' (não especificada), refletindo o estágio processual do registro. Por isso NÃO é usada como filtro dos denominadores; sua distribuição é gravada no snapshot.",
    observedValues: ["#NE"],
    usedBy: ["transparência de estágio processual (não é filtro)"],
  },
  {
    column: "DS_SIT_TOT_TURNO",
    resource: "candidatos",
    status: "confirmado",
    required: false,
    description:
      "Situação de totalização do turno. Vazia/'#NULO' antes da eleição; será o campo de eleitas depois da apuração.",
    observedValues: ["#NULO"],
    usedBy: ["infraestrutura: eleitas (futuro)"],
  },
  {
    column: "DT_GERACAO",
    resource: "candidatos",
    status: "confirmado",
    required: false,
    description:
      "Data de geração do arquivo informada pelo TSE — data da fotografia.",
    usedBy: ["datação de toda fotografia"],
  },
  {
    column: "HH_GERACAO",
    resource: "candidatos",
    status: "confirmado",
    required: false,
    description: "Hora de geração do arquivo informada pelo TSE.",
    usedBy: ["datação de toda fotografia"],
  },
  {
    column: "DS_DETALHE_SITUACAO_CAND",
    resource: "complementar",
    status: "confirmado",
    required: false,
    description:
      "Detalhe do estágio processual do registro (ex.: aguardando julgamento). Existe apenas no recurso complementar, ligado por SQ_CANDIDATO — não está no recurso Candidatos.",
    observedValues: ["#NE"],
    usedBy: ["explicação do estágio da base (futuro)"],
  },
  {
    column: "DS_SITUACAO_JULGAMENTO",
    resource: "complementar",
    status: "confirmado",
    required: false,
    description: "Situação de julgamento do registro de candidatura.",
    observedValues: ["AGUARDANDO JULGAMENTO"],
    usedBy: ["funil de deferimento (futuro)"],
  },
  {
    column: "ST_QUILOMBOLA",
    resource: "complementar",
    status: "confirmado",
    required: false,
    description:
      "Marcador de pertencimento quilombola declarado (S/N). Existe apenas no recurso complementar.",
    observedValues: ["S", "N"],
    usedBy: ["recorte quilombola (futuro, requer ingestão do complementar)"],
  },
  {
    column: "DS_ETNIA_INDIGENA",
    resource: "complementar",
    status: "confirmado",
    required: false,
    description:
      "Etnia indígena declarada. '#NULO' quando não se aplica. Existe apenas no recurso complementar.",
    usedBy: ["recorte indígena (futuro, requer ingestão do complementar)"],
  },
  {
    column: "DS_GENERO_FEFC",
    resource: "complementar",
    status: "confirmado",
    required: false,
    description:
      "Gênero considerado para fins do Fundo Especial de Financiamento de Campanha. Campo próprio das regras de financiamento — não confundir com a cota de candidaturas.",
    usedBy: ["eixo dinheiro (futuro)"],
  },
  {
    column: "DS_COR_RACA_FEFC",
    resource: "complementar",
    status: "confirmado",
    required: false,
    description:
      "Cor/raça considerada para fins do FEFC. Regras de financiamento, distintas da cota de candidaturas.",
    usedBy: ["eixo dinheiro (futuro)"],
  },
  {
    column: "VR_DESPESA_MAX_CAMPANHA",
    resource: "complementar",
    status: "confirmado",
    required: false,
    description: "Limite de despesa de campanha declarado por candidatura.",
    usedBy: ["eixo dinheiro (futuro)"],
  },
  {
    column: "QT_VAGA",
    resource: "vagas",
    status: "confirmado",
    required: false,
    description:
      "Quantidade de vagas por unidade eleitoral e cargo. Permite futuramente relacionar candidaturas de mulheres por vaga disponível.",
    usedBy: ["infraestrutura: candidaturas por vaga (futuro)"],
  },
  {
    column: "DS_SITUACAO",
    resource: "coligacoes",
    status: "confirmado",
    required: false,
    description: "Situação da legenda/coligação registrada.",
    observedValues: ["AGUARDANDO JULGAMENTO"],
    usedBy: [],
  },
];

/**
 * Campos que o projeto gostaria de usar e que NÃO estão publicados nos
 * arquivos públicos 2026 inspecionados. Registrados aqui para impedir invenção.
 */
export const NOT_CONFIRMED_FIELDS: readonly {
  wanted: string;
  searchedIn: ResourceId[];
  finding: string;
}[] = [
  {
    wanted: "Identidade de gênero (trans, travesti, cisgênero)",
    searchedIn: ["candidatos", "complementar"],
    finding:
      "Não confirmado/disponível no arquivo público. Existe apenas DS_GENERO (binário: FEMININO/MASCULINO) e NM_SOCIAL_CANDIDATO, que é nome social e não pode ser lido como identidade. Nenhuma inferência é feita.",
  },
  {
    wanted: "Deficiência e tipo de deficiência",
    searchedIn: ["candidatos", "complementar"],
    finding:
      "Não confirmado/disponível no arquivo público: nenhuma coluna de deficiência no cabeçalho de Candidatos nem de Informações complementares em 2026.",
  },
  {
    wanted: "Município da candidatura",
    searchedIn: ["candidatos"],
    finding:
      "Não aplicável em eleições gerais: a unidade eleitoral é a UF (SG_UE/NM_UE) ou BR. O recurso complementar traz apenas CD_MUNICIPIO_NASCIMENTO/NM_MUNICIPIO_NASCIMENTO, que é local de nascimento, não território da disputa.",
  },
  {
    wanted: "Votos recebidos e eleitas",
    searchedIn: ["candidatos"],
    finding:
      "Coluna DS_SIT_TOT_TURNO existe, mas vem '#NULO' antes da apuração. Votação nominal está em outro conjunto do TSE, não neste.",
  },
  {
    wanted: "Recursos financeiros efetivamente recebidos",
    searchedIn: ["candidatos", "complementar"],
    finding:
      "Não pertence a este conjunto. Só há VR_DESPESA_MAX_CAMPANHA (limite de gasto). Prestação de contas é conjunto separado.",
  },
  {
    wanted: "Campos do recurso Bens de candidatos",
    searchedIn: ["bens"],
    finding:
      "Recurso não inspecionado nesta rodada; nenhum campo declarado como confirmado.",
  },
];

/**
 * Colunas estruturais do recurso `Candidatos`: se qualquer uma desaparecer do
 * cabeçalho real, o snapshot NÃO pode ser publicado silenciosamente.
 */
export const STRUCTURAL_COLUMNS: readonly string[] = FIELDS.filter(
  (f) => f.resource === "candidatos" && f.structural,
).map((f) => f.column);

/** Colunas cujo desaparecimento inviabiliza qualquer indicador atual. */
export const CRITICAL_COLUMNS: readonly string[] = FIELDS.filter(
  (f) => f.resource === "candidatos" && f.required,
).map((f) => f.column);

/** Cabeçalho completo do recurso `Candidatos` observado na inspeção. */
export const CANDIDATOS_HEADER_BASELINE: readonly string[] = [
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
];

export type HeaderAudit = {
  /** colunas estruturais ausentes no arquivo lido */
  missingStructural: string[];
  /** colunas obrigatórias ausentes: bloqueiam publicação */
  missingCritical: string[];
  /** colunas novas, não previstas no dicionário vigente */
  newColumns: string[];
  /** colunas do baseline que deixaram de existir */
  removedColumns: string[];
  /** se a estrutura permanece compatível com o dicionário vigente */
  compatible: boolean;
};

/**
 * Compara o cabeçalho real lido na coleta com o dicionário vigente.
 * Coluna estrutural ausente => incompatível => snapshot não publicável.
 * Coluna nova => sinalizada como anomalia para revisão do dicionário.
 */
export function auditHeader(headerNames: readonly string[]): HeaderAudit {
  const found = new Set(headerNames.map((h) => h.trim().toUpperCase()));
  const missingStructural = STRUCTURAL_COLUMNS.filter((c) => !found.has(c));
  const missingCritical = CRITICAL_COLUMNS.filter((c) => !found.has(c));
  const baseline = new Set(CANDIDATOS_HEADER_BASELINE);
  const newColumns = [...found].filter((c) => c && !baseline.has(c));
  const removedColumns = CANDIDATOS_HEADER_BASELINE.filter(
    (c) => !found.has(c),
  );
  return {
    missingStructural,
    missingCritical,
    newColumns,
    removedColumns,
    compatible: missingStructural.length === 0 && missingCritical.length === 0,
  };
}
