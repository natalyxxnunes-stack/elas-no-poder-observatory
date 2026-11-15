import { VOTACOES, type Deputada, type VotoTipo } from "@/data/votacoes-camara";

/**
 * colecoes — séries editoriais que cruzam temas (12/11/2026).
 *
 * Uma coleção junta, num lugar só, peças de vários temas sobre a mesma
 * pergunta. A primeira acompanha a agenda contrária aos direitos das mulheres
 * no poder: quem votou, quem voltou, o que disse e com que dinheiro.
 *
 * Regras (pauta de 27/10/2026):
 *  - recorte por conduta documentada, nunca por rótulo de pessoa: entra quem
 *    votou de determinado jeito em votação nominal, com o registro da Câmara;
 *  - "antifeminista" só para quem se declarou assim, em fala datada com fonte
 *    primária;
 *  - o nome da coleção descreve a agenda, não as pessoas;
 *  - números que ainda não passaram pela recontagem da editora ficam em
 *    "em apuração", sem valor.
 */

/** votações da coleção e o voto que contraria o direito em jogo */
export const ANTIGENERO_VOTOS: { id: string; contra: VotoTipo; rotulo: string; porque: string }[] =
  [
    {
      id: "2351179-51",
      contra: "Não",
      rotulo: "votou Não à lei de igualdade salarial (04/05/2023)",
      porque:
        "O voto Não rejeitava a lei que obriga salário igual para mulheres e homens na mesma função.",
    },
    {
      id: "2482078-57",
      contra: "Sim",
      rotulo: "votou Sim ao PDL 3/2025, que sustou a norma do Conanda (05/11/2025)",
      porque:
        "O voto Sim sustava a resolução que regulamentava o atendimento a crianças e adolescentes vítimas de violência sexual, inclusive o acesso ao aborto nos casos previstos em lei.",
    },
  ];

export const ANTIGENERO_CRITERIO = {
  fato: "Entram as deputadas federais que votaram Não ao texto da lei de igualdade salarial (PL 1.085/2023, 04/05/2023) ou Sim ao PDL 3/2025 (05/11/2025), que sustou a Resolução 258/2024 do Conanda sobre o atendimento a crianças e adolescentes vítimas de violência sexual. Os votos são os registrados pela Câmara dos Deputados. O aborto nos casos previstos em lei continua no Código Penal; o PDL derrubou a regulamentação do atendimento.",
  interpretacao:
    "Para o observatório, as duas votações fazem parte da agenda antigênero: propostas que restringem direitos ligados a gênero. Essa é uma leitura editorial nossa. O nome descreve a agenda; nenhuma deputada é rotulada por ele, e cada uma aparece com o voto que deu.",
  fora: "A PEC que anistiou partidos por descumprir as cotas (EC 133/2024) ficou fora: o mesmo texto criou um piso de recursos para candidaturas pretas e pardas, e o voto não tem um sentido único.",
};

export type DeputadaColecao = {
  nome: string;
  uf: string;
  partido: string;
  votos: string[];
  desfecho: Deputada["desfecho2026"];
  cargo2026: string | null;
};

/**
 * as deputadas que entram pelo critério. Lista gerada de votacoes-deputadas.ts
 * em 12/11/2026 (mesmo critério de ANTIGENERO_VOTOS) e gravada aqui sem a
 * cor/raça individual, para a capa e a coleção não carregarem esse campo.
 * Se os votos ou os desfechos mudarem, gerar de novo.
 */
export const ANTIGENERO_DEPUTADAS: DeputadaColecao[] = [
  {
    nome: "Adriana Ventura",
    uf: "SP",
    partido: "NOVO",
    votos: [
      "votou Não à lei de igualdade salarial (04/05/2023)",
      "votou Sim ao PDL 3/2025, que sustou a norma do Conanda (05/11/2025)",
    ],
    desfecho: "reeleita",
    cargo2026: "DEPUTADO FEDERAL",
  },
  {
    nome: "Ana Paula Leão",
    uf: "MG",
    partido: "PP",
    votos: ["votou Sim ao PDL 3/2025, que sustou a norma do Conanda (05/11/2025)"],
    desfecho: "suplente",
    cargo2026: "DEPUTADO FEDERAL",
  },
  {
    nome: "Antônia Lúcia",
    uf: "AC",
    partido: "REPUBLICANOS",
    votos: ["votou Sim ao PDL 3/2025, que sustou a norma do Conanda (05/11/2025)"],
    desfecho: "não eleita",
    cargo2026: "DEPUTADO FEDERAL",
  },
  {
    nome: "Any Ortiz",
    uf: "RS",
    partido: "CIDADANIA",
    votos: [
      "votou Não à lei de igualdade salarial (04/05/2023)",
      "votou Sim ao PDL 3/2025, que sustou a norma do Conanda (05/11/2025)",
    ],
    desfecho: "reeleita",
    cargo2026: "DEPUTADO FEDERAL",
  },
  {
    nome: "Bia Kicis",
    uf: "DF",
    partido: "PL",
    votos: [
      "votou Não à lei de igualdade salarial (04/05/2023)",
      "votou Sim ao PDL 3/2025, que sustou a norma do Conanda (05/11/2025)",
    ],
    desfecho: "eleita para outro cargo",
    cargo2026: "SENADOR",
  },
  {
    nome: "Carla Dickson",
    uf: "RN",
    partido: "UNIÃO",
    votos: ["votou Sim ao PDL 3/2025, que sustou a norma do Conanda (05/11/2025)"],
    desfecho: "suplente",
    cargo2026: "DEPUTADO FEDERAL",
  },
  {
    nome: "Carla Zambelli",
    uf: "SP",
    partido: "PL",
    votos: ["votou Não à lei de igualdade salarial (04/05/2023)"],
    desfecho: "não concorreu",
    cargo2026: null,
  },
  {
    nome: "Caroline de Toni",
    uf: "SC",
    partido: "PL",
    votos: [
      "votou Não à lei de igualdade salarial (04/05/2023)",
      "votou Sim ao PDL 3/2025, que sustou a norma do Conanda (05/11/2025)",
    ],
    desfecho: "eleita para outro cargo",
    cargo2026: "SENADOR",
  },
  {
    nome: "Chris Tonietto",
    uf: "RJ",
    partido: "PL",
    votos: [
      "votou Não à lei de igualdade salarial (04/05/2023)",
      "votou Sim ao PDL 3/2025, que sustou a norma do Conanda (05/11/2025)",
    ],
    desfecho: "reeleita",
    cargo2026: "DEPUTADO FEDERAL",
  },
  {
    nome: "Clarissa Tércio",
    uf: "PE",
    partido: "PP",
    votos: ["votou Sim ao PDL 3/2025, que sustou a norma do Conanda (05/11/2025)"],
    desfecho: "reeleita",
    cargo2026: "DEPUTADO FEDERAL",
  },
  {
    nome: "Cristiane Lopes",
    uf: "RO",
    partido: "UNIÃO",
    votos: ["votou Sim ao PDL 3/2025, que sustou a norma do Conanda (05/11/2025)"],
    desfecho: "reeleita",
    cargo2026: "DEPUTADO FEDERAL",
  },
  {
    nome: "Dani Cunha",
    uf: "RJ",
    partido: "UNIÃO",
    votos: [
      "votou Não à lei de igualdade salarial (04/05/2023)",
      "votou Sim ao PDL 3/2025, que sustou a norma do Conanda (05/11/2025)",
    ],
    desfecho: "reeleita",
    cargo2026: "DEPUTADO FEDERAL",
  },
  {
    nome: "Dayany Bittencourt",
    uf: "CE",
    partido: "UNIÃO",
    votos: ["votou Sim ao PDL 3/2025, que sustou a norma do Conanda (05/11/2025)"],
    desfecho: "suplente",
    cargo2026: "DEPUTADO FEDERAL",
  },
  {
    nome: "Delegada Ione",
    uf: "MG",
    partido: "AVANTE",
    votos: ["votou Sim ao PDL 3/2025, que sustou a norma do Conanda (05/11/2025)"],
    desfecho: "reeleita",
    cargo2026: "DEPUTADO FEDERAL",
  },
  {
    nome: "Delegada Katarina",
    uf: "SE",
    partido: "PSD",
    votos: ["votou Sim ao PDL 3/2025, que sustou a norma do Conanda (05/11/2025)"],
    desfecho: "reeleita",
    cargo2026: "DEPUTADO FEDERAL",
  },
  {
    nome: "Dra. Alessandra Haber",
    uf: "PA",
    partido: "MDB",
    votos: ["votou Sim ao PDL 3/2025, que sustou a norma do Conanda (05/11/2025)"],
    desfecho: "reeleita",
    cargo2026: "DEPUTADO FEDERAL",
  },
  {
    nome: "Ely Santos",
    uf: "SP",
    partido: "REPUBLICANOS",
    votos: ["votou Sim ao PDL 3/2025, que sustou a norma do Conanda (05/11/2025)"],
    desfecho: "eleita para outro cargo",
    cargo2026: "DEPUTADO ESTADUAL",
  },
  {
    nome: "Fatima Pelaes",
    uf: "AP",
    partido: "REPUBLICANOS",
    votos: ["votou Sim ao PDL 3/2025, que sustou a norma do Conanda (05/11/2025)"],
    desfecho: "suplente",
    cargo2026: "DEPUTADO FEDERAL",
  },
  {
    nome: "Fernanda Pessoa",
    uf: "CE",
    partido: "UNIÃO",
    votos: ["votou Sim ao PDL 3/2025, que sustou a norma do Conanda (05/11/2025)"],
    desfecho: "reeleita",
    cargo2026: "DEPUTADO FEDERAL",
  },
  {
    nome: "Franciane Bayer",
    uf: "RS",
    partido: "REPUBLICANOS",
    votos: ["votou Sim ao PDL 3/2025, que sustou a norma do Conanda (05/11/2025)"],
    desfecho: "suplente",
    cargo2026: "DEPUTADO FEDERAL",
  },
  {
    nome: "Geovania de Sá",
    uf: "SC",
    partido: "PSDB",
    votos: ["votou Sim ao PDL 3/2025, que sustou a norma do Conanda (05/11/2025)"],
    desfecho: "reeleita",
    cargo2026: "DEPUTADO FEDERAL",
  },
  {
    nome: "Greyce Elias",
    uf: "MG",
    partido: "AVANTE",
    votos: ["votou Sim ao PDL 3/2025, que sustou a norma do Conanda (05/11/2025)"],
    desfecho: "reeleita",
    cargo2026: "DEPUTADO FEDERAL",
  },
  {
    nome: "Helena Lima",
    uf: "RR",
    partido: "MDB",
    votos: ["votou Sim ao PDL 3/2025, que sustou a norma do Conanda (05/11/2025)"],
    desfecho: "não eleita",
    cargo2026: "SENADOR",
  },
  {
    nome: "Iza Arruda",
    uf: "PE",
    partido: "MDB",
    votos: ["votou Sim ao PDL 3/2025, que sustou a norma do Conanda (05/11/2025)"],
    desfecho: "reeleita",
    cargo2026: "DEPUTADO FEDERAL",
  },
  {
    nome: "Julia Zanatta",
    uf: "SC",
    partido: "PL",
    votos: [
      "votou Não à lei de igualdade salarial (04/05/2023)",
      "votou Sim ao PDL 3/2025, que sustou a norma do Conanda (05/11/2025)",
    ],
    desfecho: "reeleita",
    cargo2026: "DEPUTADO FEDERAL",
  },
  {
    nome: "Luisa Canziani",
    uf: "PR",
    partido: "PSD",
    votos: ["votou Sim ao PDL 3/2025, que sustou a norma do Conanda (05/11/2025)"],
    desfecho: "suplente",
    cargo2026: "DEPUTADO FEDERAL",
  },
  {
    nome: "Magda Mofatto",
    uf: "GO",
    partido: "PRD",
    votos: ["votou Sim ao PDL 3/2025, que sustou a norma do Conanda (05/11/2025)"],
    desfecho: "reeleita",
    cargo2026: "DEPUTADO FEDERAL",
  },
  {
    nome: "Maria Rosas",
    uf: "SP",
    partido: "REPUBLICANOS",
    votos: ["votou Sim ao PDL 3/2025, que sustou a norma do Conanda (05/11/2025)"],
    desfecho: "reeleita",
    cargo2026: "DEPUTADO FEDERAL",
  },
  {
    nome: "Marussa Boldrin",
    uf: "GO",
    partido: "MDB",
    votos: ["votou Sim ao PDL 3/2025, que sustou a norma do Conanda (05/11/2025)"],
    desfecho: "reeleita",
    cargo2026: "DEPUTADO FEDERAL",
  },
  {
    nome: "Nely Aquino",
    uf: "MG",
    partido: "PODE",
    votos: ["votou Sim ao PDL 3/2025, que sustou a norma do Conanda (05/11/2025)"],
    desfecho: "reeleita",
    cargo2026: "DEPUTADO FEDERAL",
  },
  {
    nome: "Renata Abreu",
    uf: "SP",
    partido: "PODE",
    votos: ["votou Sim ao PDL 3/2025, que sustou a norma do Conanda (05/11/2025)"],
    desfecho: "reeleita",
    cargo2026: "DEPUTADO FEDERAL",
  },
  {
    nome: "Roberta Roma",
    uf: "BA",
    partido: "PL",
    votos: ["votou Sim ao PDL 3/2025, que sustou a norma do Conanda (05/11/2025)"],
    desfecho: "reeleita",
    cargo2026: "DEPUTADO FEDERAL",
  },
  {
    nome: "Rogéria Santos",
    uf: "BA",
    partido: "REPUBLICANOS",
    votos: ["votou Sim ao PDL 3/2025, que sustou a norma do Conanda (05/11/2025)"],
    desfecho: "suplente",
    cargo2026: "DEPUTADO FEDERAL",
  },
  {
    nome: "Rosana Valle",
    uf: "SP",
    partido: "PL",
    votos: ["votou Sim ao PDL 3/2025, que sustou a norma do Conanda (05/11/2025)"],
    desfecho: "reeleita",
    cargo2026: "DEPUTADO FEDERAL",
  },
  {
    nome: "Rosangela Moro",
    uf: "SP",
    partido: "UNIÃO",
    votos: ["votou Não à lei de igualdade salarial (04/05/2023)"],
    desfecho: "reeleita",
    cargo2026: "DEPUTADO FEDERAL",
  },
  {
    nome: "Rosângela Reis",
    uf: "MG",
    partido: "PL",
    votos: ["votou Sim ao PDL 3/2025, que sustou a norma do Conanda (05/11/2025)"],
    desfecho: "reeleita",
    cargo2026: "DEPUTADO FEDERAL",
  },
  {
    nome: "Silvia Cristina",
    uf: "RO",
    partido: "PP",
    votos: ["votou Sim ao PDL 3/2025, que sustou a norma do Conanda (05/11/2025)"],
    desfecho: "não eleita",
    cargo2026: "SENADOR",
  },
  {
    nome: "Silvia Waiãpi",
    uf: "AP",
    partido: "PL",
    votos: ["votou Não à lei de igualdade salarial (04/05/2023)"],
    desfecho: "não concorreu",
    cargo2026: null,
  },
  {
    nome: "Silvye Alves",
    uf: "GO",
    partido: "UNIÃO",
    votos: ["votou Sim ao PDL 3/2025, que sustou a norma do Conanda (05/11/2025)"],
    desfecho: "reeleita",
    cargo2026: "DEPUTADO FEDERAL",
  },
  {
    nome: "Simone Marquetto",
    uf: "SP",
    partido: "MDB",
    votos: ["votou Sim ao PDL 3/2025, que sustou a norma do Conanda (05/11/2025)"],
    desfecho: "não concorreu",
    cargo2026: null,
  },
  {
    nome: "Soraya Santos",
    uf: "RJ",
    partido: "PL",
    votos: ["votou Sim ao PDL 3/2025, que sustou a norma do Conanda (05/11/2025)"],
    desfecho: "reeleita",
    cargo2026: "DEPUTADO FEDERAL",
  },
  {
    nome: "Yandra Moura",
    uf: "SE",
    partido: "UNIÃO",
    votos: ["votou Sim ao PDL 3/2025, que sustou a norma do Conanda (05/11/2025)"],
    desfecho: "reeleita",
    cargo2026: "DEPUTADO FEDERAL",
  },
];

export const ANTIGENERO_VOTACOES = ANTIGENERO_VOTOS.map((v) => ({
  ...v,
  votacao: VOTACOES.find((x) => x.id === v.id)!,
}));

/**
 * Dinheiro (recontagem de 12/11/2026). TSE, prestação de contas final do 1º
 * turno, receitas_candidatos_2026_BRASIL.csv do pacote gerado em 12/11/2026
 * (zip SHA-256 01c1225e…, CSV SHA-256 b7865338…); candidaturas pelo
 * consulta_cand_2026_BRASIL.csv (SHA-256 f129bbf0…). Junção por CPF (Câmara,
 * /deputados/{id}). Linhas idênticas contadas uma vez. Fundo eleitoral =
 * fonte "FUNDO ESPECIAL". Script: scripts/investigacao/9_antigenero_dinheiro.py.
 * Conferência da editora pendente antes de ir para a main.
 */
export const ANTIGENERO_DINHEIRO = {
  base: "12/11/2026",
  concorreram: 39,
  naoConcorreram: 3,
  receita: 114283228.61,
  fefc: 97963671.65,
  pct: 85.7,
  /** comparação: todas as candidaturas eleitas a deputado federal na mesma base */
  eleitasDeputadaPct: 85.8,
  eleitosDeputadoPct: 75.9,
  semFefc: 2,
  /**
   * Conferência independente (12/11/2026): os números acima conferem. Recorte
   * mais justo para a comparação: só as 34 que concorreram a deputada federal,
   * 86,8% de fundo (R$ 97,28 mi de receita). A base de 12/11 está sem a
   * totalização dos deputados do Amapá; com as 3 eleitas do AP, as mulheres
   * eleitas vão a 85,9%.
   */
  deputadaFederal: { candidatas: 34, pct: 86.8 },
};

/**
 * Falas em plenário (levantamento de 12/11/2026): discursos das 42 deputadas
 * de fev/2023 a 12/11/2026 na API de Dados Abertos da Câmara, com a palavra
 * feminismo, feminista ou antifeminista. Fonte primária: notas taquigráficas.
 * Os trechos com nome só entram depois dos pedidos de posicionamento
 * (ANTIGENERO_PEDIDO_ENVIADO_EM); até lá, a página mostra a contagem.
 */
export const ANTIGENERO_FALAS = {
  periodo: "fevereiro de 2023 a 12/11/2026",
  discursos: 30,
  deputadas: 8,
  seDeclararamAntifeministas: 0,
  /**
   * Só Carla Zambelli se declarou não feminista em primeira pessoa
   * ("Eu não sou feminista", 05/03/2024). Clarissa Tércio falou da filha
   * adolescente ("feminina, não feminista", 01/07/2025) e não entra na conta
   * (conferência independente de 12/11/2026). O nome da filha não vai ao site.
   */
  disseramNaoSerFeministas: 1,
};
/** data de envio dos pedidos de posicionamento (lista com nomes e trechos dependem dela) */
export const ANTIGENERO_PEDIDO_ENVIADO_EM: string | null = null;
/** prazo de resposta; a lista com nomes só aparece depois dele */
export const ANTIGENERO_PRAZO_RESPOSTA: string | null = null;
export const ANTIGENERO_LISTA_LIBERADA = false;
