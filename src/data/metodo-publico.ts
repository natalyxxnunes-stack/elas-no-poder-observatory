/**
 * metodo-publico — o que o Método publica além da ficha técnica (P1 da
 * auditoria 360°, novembro/2026): dicionário dos campos usados nos números de
 * hoje, registro único de correções, método das fichas das eleitas e método de
 * leitura da atuação parlamentar.
 *
 * O dicionário lista só os campos que os scripts de `scripts/recontagem/` e
 * `scripts/investigacao/` leem de fato (conferido em 02/11/2026). O dicionário
 * técnico do pipeline de agosto continua em `src/lib/tse/data-dictionary.ts`.
 */

export type CampoDicionario = {
  campo: string;
  arquivo: string;
  oQueE: string;
  comoUsamos: string;
  /** o valor do campo aparece no site? */
  publicado: boolean;
};

const CAND = "TSE, Candidatos";
const COMPL = "TSE, Candidatos, informações complementares";
const RECEITAS = "TSE, Prestação de contas (receitas)";
const DESPESAS = "TSE, Prestação de contas (despesas)";
const VOTACAO = "TSE, Votação por candidato";
const CAMARA = "Câmara dos Deputados, Dados Abertos";

export const DICIONARIO: readonly CampoDicionario[] = [
  {
    campo: "SQ_CANDIDATO",
    arquivo: CAND,
    oQueE: "Número que identifica cada pedido de registro de candidatura.",
    comoUsamos:
      "Conta cada candidatura uma vez e liga o registro às receitas, despesas e votos. A unidade de análise é a candidatura, e a mesma pessoa pode ter mais de um registro.",
    publicado: false,
  },
  {
    campo: "DS_CARGO",
    arquivo: CAND,
    oQueE: "Cargo disputado.",
    comoUsamos:
      "Separa os dois universos: proporcional (deputado federal, estadual e distrital) e majoritário (presidente, governador e senador). Vices e suplentes compõem chapas e são contados à parte.",
    publicado: true,
  },
  {
    campo: "NR_TURNO",
    arquivo: CAND,
    oQueE: "Turno da eleição.",
    comoUsamos:
      "Registro e cadeiras de deputada e senadora saem do 1º turno; governadora conta o turno em que a eleição se decidiu.",
    publicado: true,
  },
  {
    campo: "DS_GENERO",
    arquivo: CAND,
    oQueE: "Gênero no registro do TSE (feminino ou masculino).",
    comoUsamos:
      "“Mulheres” são os registros FEMININO. O campo é binário e não informa identidade de gênero: candidaturas trans e travestis ficam invisíveis nesta base.",
    publicado: true,
  },
  {
    campo: "DS_COR_RACA",
    arquivo: CAND,
    oQueE: "Cor/raça autodeclarada pela candidata.",
    comoUsamos:
      "Categorias originais do TSE (branca, parda, preta, indígena, amarela). Pretas e pardas aparecem sempre separadas; quando somadas como população negra, a soma é declarada.",
    publicado: true,
  },
  {
    campo: "SG_UF e SG_PARTIDO",
    arquivo: CAND,
    oQueE: "Estado e partido do registro.",
    comoUsamos:
      "Recortes por estado e por partido. O partido é o do registro de 2026, não o atual.",
    publicado: true,
  },
  {
    campo: "DS_SIT_TOT_TURNO",
    arquivo: CAND,
    oQueE: "Resultado da candidatura no turno.",
    comoUsamos:
      "Eleita = qualquer valor que comece com ELEITO (ELEITO, ELEITO POR QP, ELEITO POR MÉDIA). SUPLENTE e NÃO ELEITO contam como não eleita.",
    publicado: true,
  },
  {
    campo: "DS_ELEICAO",
    arquivo: CAND,
    oQueE: "Nome da eleição a que o registro pertence.",
    comoUsamos:
      "Tira da série histórica as eleições suplementares que o TSE publica no mesmo arquivo da eleição geral.",
    publicado: false,
  },
  {
    campo: "NM_URNA_CANDIDATO",
    arquivo: CAND,
    oQueE: "Nome de urna.",
    comoUsamos: "Nome usado nas fichas de Quem entrou.",
    publicado: true,
  },
  {
    campo: "DS_OCUPACAO e DS_GRAU_INSTRUCAO",
    arquivo: CAND,
    oQueE: "Ocupação e escolaridade declaradas no registro.",
    comoUsamos:
      "Trajetória nas fichas das eleitas. A ocupação aparece na forma feminina do próprio rótulo do TSE, que grava o par (“Advogada/advogado”).",
    publicado: true,
  },
  {
    campo: "NR_CPF_CANDIDATO",
    arquivo: CAND,
    oQueE: "CPF da candidata.",
    comoUsamos:
      "Só para ligar a mesma pessoa entre 2022 e 2026, e entre o TSE e a Câmara. A junção é feita em memória; o CPF não é gravado nem publicado.",
    publicado: false,
  },
  {
    campo: "DT_GERACAO e HH_GERACAO",
    arquivo: CAND,
    oQueE: "Data e hora em que o TSE gerou o arquivo.",
    comoUsamos: "Data da fotografia citada junto de cada número.",
    publicado: true,
  },
  {
    campo: "DS_SITUACAO_JULGAMENTO",
    arquivo: COMPL,
    oQueE: "Estágio do julgamento do pedido de registro.",
    comoUsamos:
      "Agrupado em apta, indeferida com recurso, renúncia, indeferida ou cancelada e pendente.",
    publicado: true,
  },
  {
    campo: "VR_RECEITA, DS_FONTE_RECEITA e DS_ORIGEM_RECEITA",
    arquivo: RECEITAS,
    oQueE:
      "Valor, fonte (fundo eleitoral, fundo partidário, outros recursos) e origem de cada receita declarada.",
    comoUsamos:
      "Receita por candidatura, fundo eleitoral por partido e por cor/raça. Prestação final do 1º turno (base de 04/11/2026); o 2º turno entrega contas depois.",
    publicado: true,
  },
  {
    campo: "NR_CPF_CNPJ_DOADOR_ORIGINARIO",
    arquivo: RECEITAS,
    oQueE: "Documento de quem doou pelo financiamento coletivo.",
    comoUsamos: "Só para contar quantas pessoas diferentes doaram. Não é gravado nem publicado.",
    publicado: false,
  },
  {
    campo: "VR_DESPESA_CONTRATADA e VR_PAGTO_DESPESA",
    arquivo: DESPESAS,
    oQueE: "Despesas contratadas e pagas.",
    comoUsamos: "Gasto de campanha por gênero e cor/raça.",
    publicado: true,
  },
  {
    campo: "QT_VOTOS_NOMINAIS_VALIDOS",
    arquivo: VOTACAO,
    oQueE: "Votos nominais válidos de cada candidatura, por município e zona.",
    comoUsamos:
      "Somados por candidatura no 1º turno. Voto de legenda fica fora, porque não tem gênero.",
    publicado: true,
  },
  {
    campo: "Voto nominal, sexo e período de exercício",
    arquivo: CAMARA,
    oQueE:
      "Voto de cada deputada e deputado em cada votação, sexo registrado na Câmara e quem estava em exercício na data.",
    comoUsamos:
      "Matriz de votação de No plenário e o bloco “No mandato anterior” das fichas. A ligação com o TSE é pelo CPF, sem publicar o número.",
    publicado: true,
  },
];

export type Correcao = {
  data: string;
  pagina: string;
  to: string;
  tipo: "dado" | "método" | "apuração";
  oQueMudou: string;
};

/**
 * Registro único das correções publicadas no site, da mais recente para a mais
 * antiga. Cada correção continua anotada também no ponto em que o erro
 * apareceu. Toda nova correção entra aqui e no lugar do erro, no mesmo commit.
 */
export const CORRECOES: readonly Correcao[] = [
  {
    data: "04/11/2026",
    pagina: "Dinheiro, Partido por partido, No plenário e Achados",
    to: "/dinheiro",
    tipo: "dado",
    oQueMudou:
      "Atualização com a prestação final do 1º turno (base do TSE de 04/11/2026). Mudaram, entre outros: mulheres a deputado com 32,9% da receita (antes 33,2%); mediana das candidatas brancas, pardas e pretas nos 12 maiores partidos de R$ 151 mil, R$ 100 mil e R$ 81 mil (antes R$ 144 mil, R$ 98 mil e R$ 79 mil); PL e NOVO seguem abaixo de 30% do fundo para candidaturas pretas e pardas a deputado (26,7% e 25,8%); na conta com todos os cargos, MDB, Cidadania e PSD também ficam abaixo; reeleição das deputadas no terço de maior receita passou de 33 de 39 para 31 de 37.",
  },
  {
    data: "28/10/2026",
    pagina: "No plenário",
    to: "/como-votaram",
    tipo: "apuração",
    oQueMudou:
      "A votação do PDL 3/2025 cumpria o critério de seleção e ficou fora da primeira versão. Entrou; no terço de maior receita, a conta de reeleição passou de 33 de 38 para 33 de 39 deputadas.",
  },
  {
    data: "28/10/2026",
    pagina: "Quem são elas? e Achado 03",
    to: "/quem-sao-elas",
    tipo: "dado",
    oQueMudou:
      "A série histórica por cargo incluía eleições suplementares publicadas no mesmo arquivo da eleição geral (AM e TO em 2014, Senado em MT em 2018, RR em 2022). Saíram. Governadora em 2014 passou de 12,0% para 11,4%, e vice de 24,0% para 25,3%; outros valores de 2014, 2018 e 2022 mudaram menos de um ponto. 2026 ficou igual.",
  },
  {
    data: "28/10/2026",
    pagina: "Achados",
    to: "/achados",
    tipo: "dado",
    oQueMudou:
      "Pelo mesmo motivo, o achado sobre titulares e vices dizia 12,0% e 24,0% para 2014 e que a distância tinha dobrado. Os valores corretos são 11,4% e 25,3%, e a distância passou de 14 para 24 pontos.",
  },
];

/** método das fichas de Quem entrou */
export const METODO_FICHAS = [
  "Quem entra: as mulheres eleitas em 2026 para deputada federal, estadual e distrital, senadora e governadora, segundo o resultado do TSE. Vices e suplentes ficam fora, porque não foram eleitas para o cargo titular.",
  "O registro: cargo, estado, partido, cor/raça e situação vêm do arquivo de candidaturas do TSE, recontado pelo observatório (scripts/recontagem/eleitas_2026.py).",
  "A trajetória: ocupação e escolaridade são as declaradas no registro de 2026. O resultado de 2022 vem do arquivo de candidaturas de 2022, ligado pelo CPF em memória; quando a mesma pessoa tem dois registros no mesmo turno, vale o de resultado válido. Eleições municipais não entram (scripts/recontagem/eleitas_trajetoria_2026.py).",
  "O mandato anterior: votos nas seis votações de No plenário, para quem foi deputada federal. A ligação é por nome e estado; quando o nome de urna ou o estado mudaram, a correspondência foi conferida pelo CPF e registrada no código.",
  "As falas: só as conferidas na fonte primária (áudio, vídeo ou Diário da Câmara), com data e link.",
  "Cada ficha tem endereço permanente (quemsaoelas.com.br/eleitas/nome-uf) e informa a data de cada base usada. Atuação no mandato, comissões e votações a partir de 2027 entram depois da posse.",
] as const;

/** método de leitura da atuação parlamentar (P1.5) */
export const METODO_ATUACAO = {
  principio:
    "Mulheres eleitas não formam um bloco. O observatório descreve o que cada parlamentar fez, com documento, e não deduz posição política do gênero, do partido ou de uma fala isolada.",
  oQueConta: [
    {
      tipo: "Voto nominal",
      regra:
        "Sim, Não, abstenção, obstrução ou ausente, como registrado pela Câmara ou pelo Senado. Ausente é quem estava em exercício e não votou; conta à parte, sem ser lido como posição.",
    },
    {
      tipo: "Autoria e coautoria",
      regra:
        "Separadas: primeira signatária, coautora e quem apenas apoiou um requerimento são registros diferentes. Assinar um projeto não é o mesmo que votar nele.",
    },
    {
      tipo: "Relatoria",
      regra: "Relatora é quem dá parecer; o parecer é citado pelo documento, com data e comissão.",
    },
    {
      tipo: "Fala",
      regra:
        "Só fala conferida na fonte primária, com data, lugar e link. A fala é publicada como fala, sem virar rótulo da pessoa.",
    },
    {
      tipo: "Alinhamento com a bancada",
      regra:
        "Comparado com a maioria do partido naquela votação (a orientação oficial vem por bloco e a API não guarda a composição histórica). É medida de disciplina, não de convicção.",
    },
  ],
  selecao:
    "Votações escolhidas por critério fixado antes de cruzar com qualquer resultado: votações nominais de mérito no plenário, nos blocos da pauta do observatório (mulheres, povos indígenas, democracia). Urgências e votações simbólicas ficam fora. Quando uma votação que cumpria o critério fica de fora, a falha é corrigida e registrada.",
  rotulos:
    "Nenhum rótulo resumido (“feminista”, “antifeminista”, “progressista”, “conservadora”) é atribuído a uma pessoa pelo observatório. Quando a própria parlamentar se define em público (“eu não sou feminista”), a frase é publicada como fala dela, com a fonte.",
  respostas:
    "Quando uma reportagem atribui conduta ou faz crítica factual a uma parlamentar, ela é procurada antes da publicação, com prazo, e a resposta, ou a falta dela, é publicada.",
  limites:
    "Voto e assinatura mostram o que a pessoa fez, não por que fez nem o efeito da decisão. Efeito exige outra apuração, com outra fonte.",
} as const;
