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
      "Receita por candidatura, fundo eleitoral por partido e por cor/raça. Declarações da base financeira de 25/11/2026, posterior ao prazo de 16/11, cruzadas com cadastro de candidaturas de 25/11. Contas ainda sujeitas a retificações e julgamento. A base eleitoral de resultados mantém o corte íntegro de 27/10.",
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
    data: "25/11/2026",
    pagina: "Barreiras e Calendário",
    to: "/barreiras",
    tipo: "apuração",
    oQueMudou:
      "Ampliação do eixo de violência política com o monitoramento de episódios da Terra de Direitos e Justiça Global (16/08 a 04/10 e 05/10 a 31/10), a Nota Técnica nº 13 da Câmara dos Deputados e a tramitação legislativa consultada em 25/11. Os universos não são somados. O painel TSE/MPF permanece no corte de 23/10, inclusive a divergência entre a soma anual (460) e o acervo (436). A pauta do calendário de 25/11 foi ajustada a esse limite.",
  },
  {
    data: "25/11/2026",
    pagina: "Dinheiro, Partido por partido, Achados e Método",
    to: "/dinheiro",
    tipo: "dado",
    oQueMudou:
      "Receitas, FEFC e despesas recontados com a base financeira de 25/11/2026 (receitas às 04h05min30s, despesas às 04h05min12s) e cadastro do mesmo dia às 16h30min55s. 19.692 candidaturas titulares com receita: 19.454 FINAL, 164 PARCIAL e 74 RELATÓRIO FINANCEIRO. Receitas totais: R$ 7.026.864.553,75; mulheres: R$ 2.039.869.234,05. FEFC total: R$ 5.035.316.334,04; mulheres: R$ 1.672.964.894,43. A fatia das brancas na receita feminina proporcional segue em 56,1%. A totalização nacional de 25/11 permanece incompleta; a contagem específica de Rondônia não confirma que o déficit esteja ali. Resultados eleitorais de 27/10 mantidos. Artefatos e hashes em financiamento-2026-25nov. Tipo de prestação não significa contas aprovadas.",
  },
  {
    data: "17/11/2026",
    pagina: "Dinheiro, Partido por partido, Achados, Método e Calendário",
    to: "/dinheiro",
    tipo: "dado",
    oQueMudou:
      "A receita, o FEFC e as despesas foram reprocessados com a prestação de contas de 17/11/2026 (receitas às 09h03, despesas contratadas às 04h05 e pagas às 04h05) e cadastro de candidaturas do mesmo dia (19h31). Candidaturas titulares com receita: 19.665; FINAL: 19.383; PARCIAL: 186; RELATÓRIO FINANCEIRO: 96. Receitas de todas as candidaturas titulares: R$ 7.021.570.001,15; recebidas pelas mulheres: R$ 2.038.564.843,63. FEFC das titulares: R$ 5.032.571.764,23; mulheres: R$ 1.672.271.447,53. Os percentuais financeiros mudaram pontualmente, mas o arredondamento da participação das brancas na receita feminina proporcional segue em 56,1%. O TSE prorrogou o prazo das contas do 2º turno de 14 para 16/11. A fotografia dos resultados de 17/11 estava incompleta, com déficit de 32 cadeiras proporcionais; a atribuição a Rondônia não foi comprovada e fica retificada. Não substituiu os números eleitorais validados de 27/10. Métodos, hashes, arquivos e conciliação no repositório, pasta financiamento-2026-17nov. Tipo de prestação não equivale a contas aprovadas.",
  },
  {
    data: "15/11/2026",
    pagina: "Quem chega, Achado 12, Poder e capa",
    to: "/quem-chega#senado",
    tipo: "dado",
    oQueMudou:
      "A projeção de cadeiras do PL no Senado em 2027 passa de 28 para 29. O primeiro suplente de Sergio Moro no Paraná, Luis Felipe Cunha, deixou o União Brasil e se filiou ao PL em 08/10/2026. A Agência Senado, em 25/10/2026, confirma a filiação e projeta 29 das 81 cadeiras para o PL, incluindo os suplentes que substituirão senadores eleitos governadores. É uma projeção, não uma composição já empossada. Fonte: https://www12.senado.leg.br/noticias/materias/2026/10/25/fim-da-eleicao-define-composicao-do-senado-em-2027-com-13-partidos",
  },
  {
    data: "15/11/2026",
    pagina: "Dinheiro, Achados e base pública de FEFC",
    to: "/dinheiro",
    tipo: "dado",
    oQueMudou:
      "Atualização dos indicadores de receitas, FEFC e despesas com base financeira do TSE de 15/11/2026 (04h05), cruzada com cadastro gerado em 15/11 (05h30). A participação das brancas na receita das candidatas proporcionais permanece em 56,1%; no FEFC recebido pelas mulheres, é 54,9%. Entre 19.660 candidaturas com receita, 195 ainda constam com prestação parcial e 102 com relatório financeiro. A base segue sujeita a retificações e julgamento; recontagens históricas de outras reportagens preservam seus próprios cortes.",
  },
  {
    data: "13/11/2026",
    pagina: "Quem chega, Achado 12 e capa",
    to: "/quem-chega#senado",
    tipo: "dado",
    oQueMudou:
      "O PL deve começar 2027 com 28 das 81 cadeiras do Senado, e não 27. A primeira versão manteve Cleitinho (Republicanos) na vaga de MG, embora ele tenha sido eleito governador no 1º turno; quem assume é o suplente Alex Diniz (PL). O Republicanos passa de 6 para 5. A projeção da Agência Senado fala em 29 para o PL: a diferença está no partido do suplente de Sergio Moro (PR), que os dados abertos do Senado não informam.",
  },
  {
    data: "13/11/2026",
    pagina: "Método e Na voz delas",
    to: "/metodo",
    tipo: "método",
    oQueMudou:
      "Regra de posicionamento reescrita. Antes: toda reportagem com nome pedia posicionamento antes de publicar. Agora: registro público descrito ao pé da letra (voto, assinatura, discurso em plenário, dado do TSE), com data e link, sai sem pedido prévio; texto que interpreta a conduta ou a intenção de uma pessoa nomeada pede posicionamento antes. Toda pessoa citada pode pedir correção ou resposta, que entra com data. Na voz delas publica só falas literais com data e link, por isso segue no ar pela regra nova.",
  },
  {
    data: "04/11/2026",
    pagina: "Quem chega, O funil e No plenário",
    to: "/metodo#hipoteses",
    tipo: "apuração",
    oQueMudou:
      "Três hipóteses testadas com a prestação final, com regras fixadas e publicadas no repositório antes de rodar. Dinheiro e votos acompanham a diferença entre candidatas e eleitas por cor/raça: confirmada. A queda das mulheres no funil passa pelo voto, pelo quociente e pelo dinheiro: inconclusiva (o dinheiro cai antes do voto, mas não explica sozinho a queda). Quem tinha chance atraiu mais dinheiro: não confirmada.",
  },
  {
    data: "04/11/2026",
    pagina: "Pioneiras: Lélia Gonzalez e Quem assina junto",
    to: "/metodo#hipoteses",
    tipo: "apuração",
    oQueMudou:
      "Duas hipóteses testadas. A da posição na lista (registrada em 30/10) não se confirmou em 2026, com regra fixada antes de rodar e publicada no repositório. A da autoria solo em ano eleitoral (registrada em 04/11) ficou inconclusiva: a comparação com 2023 vai na direção prevista, mas não separa ano eleitoral de fim de legislatura.",
  },
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
  "A trajetória: ocupação e escolaridade são as declaradas no registro de 2026. O resultado de 2022 vem do arquivo de candidaturas de 2022, ligado pelo CPF, que é usado só durante o processamento e não é publicado nem guardado; quando a mesma pessoa tem dois registros no mesmo turno, vale o de resultado válido. Eleições municipais não entram (scripts/recontagem/eleitas_trajetoria_2026.py).",
  "O mandato anterior: votos nas seis votações de No plenário (/como-votaram), para quem foi deputada federal. A ligação é por nome e estado; quando o nome de urna ou o estado mudaram, a correspondência foi conferida pelo CPF, caso a caso.",
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
        "Sim, Não, abstenção, obstrução ou ausente, como registrado pela Câmara ou pelo Senado. Ausente é quem estava em exercício e não votou; conta à parte, sem ser lido como posição. O dado da votação não diz se a ausência foi justificada (licença, missão oficial), por isso a palavra usada é sempre “não votou”, nunca “faltou”.",
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
        "Comparado com o voto da maioria do partido naquela votação. A orientação oficial é dada por bloco, e os dados abertos da Câmara não guardam quem estava em cada bloco na data, por isso a régua é a maioria. Mede disciplina partidária; convicção a medida não alcança.",
    },
  ],
  selecao:
    "Votações escolhidas por critério fixado antes de cruzar com qualquer resultado: votações nominais de mérito no plenário, nos blocos da pauta do observatório (mulheres, povos indígenas, democracia). Urgências e votações simbólicas ficam fora. Quando uma votação que cumpria o critério fica de fora, a falha é corrigida e registrada.",
  rotulos:
    "Nenhum rótulo resumido (“feminista”, “antifeminista”, “progressista”, “conservadora”) é atribuído a uma pessoa pelo observatório. Quando a própria parlamentar se define em público (“eu não sou feminista”), a frase é publicada como fala dela, com a fonte.",
  respostas:
    "Registro público descrito ao pé da letra, com data e link para a fonte, é publicado sem pedido prévio, em qualquer página: voto nominal, assinatura de projeto, discurso em plenário, dado do TSE. Quando o texto vai além do registro e interpreta a conduta, a intenção ou a posição de uma pessoa nomeada, ela recebe pedido de posicionamento por escrito, com prazo, antes da publicação. Dado agregado por partido ou por grupo não pede posicionamento; ouvir os partidos é escolha de apuração. Em qualquer caso, quem é citado pode pedir correção ou resposta pelo contato@quemsaoelas.com.br; a resposta entra com data, no lugar onde a pessoa aparece. Regra reescrita em 13/11/2026 (antes: pedido antes de toda reportagem com nome).",
  limites:
    "Voto e assinatura mostram o que a pessoa fez. O motivo só entra quando ela mesma o explica em público, e o efeito da decisão exige outra apuração, com outra fonte.",
} as const;
