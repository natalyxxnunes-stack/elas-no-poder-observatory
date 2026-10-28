/**
 * votacoes-camara — como votaram as deputadas federais em cinco votações
 * nominais de mérito do plenário da Câmara (2023–2025), cruzado com o
 * resultado de 2026. CRAVADO em código.
 *
 * Fontes:
 *  - API de Dados Abertos da Câmara (dadosabertos.camara.leg.br/api/v2):
 *    /votacoes/{id}, /votacoes/{id}/votos, /deputados?dataInicio&dataFim
 *    (quem estava em exercício na data) e /deputados/{id} (sexo e CPF).
 *    Coleta em 27/10/2026.
 *  - TSE, Candidatos 2022 (cor/raça autodeclarada na eleição que deu o
 *    mandato), SHA-256 do zip
 *    6a3d25e925d6813c42c7e2d572ce1ae372a1cb7c0cdb57bcbf2d7d70a2862acb.
 *  - TSE, Candidatos 2026, base de 27/10/2026 19:30:36 (resultado de 2026).
 *  Junção por CPF. Scripts: scripts/investigacao/1_votacoes.py,
 *  2_deputados.py e 3_cruzamento.py.
 *
 * Critério de seleção (fixado antes do cruzamento com o resultado):
 * votações nominais de plenário sobre o texto (mérito), 2023 a 2026, nos três
 * blocos da pauta do observatório: mulheres, povos indígenas e democracia.
 * Urgências ficam fora porque medem procedimento. Votações simbólicas ficam
 * fora porque não registram voto individual.
 *
 * Regras:
 *  - "ausente" = em exercício na data e sem voto registrado; conta à parte;
 *  - maioria da bancada = lado (Sim ou Não) com mais votos do partido do
 *    deputado naquela votação. A orientação oficial vem por bloco, com
 *    composição histórica indisponível na API; por isso a medida usada é a
 *    posição da maioria da bancada, padrão em estudos de disciplina partidária;
 *  - presidente da sessão (Artigo 17) não vota e fica fora das contagens;
 *  - placar recontado igual ao placar oficial nas cinco votações;
 *  - o cruzamento com 2026 descreve; não mede efeito do voto na eleição.
 */

export const VOTACOES_META = {
  coletaEm: "27/10/2026",
  fonte: "Câmara dos Deputados, Dados Abertos; TSE, Candidatos 2022 e 2026 (base de 27/10/2026)",
  tse2022ZipSha256: "6a3d25e925d6813c42c7e2d572ce1ae372a1cb7c0cdb57bcbf2d7d70a2862acb",
  tse2026CsvSha256: "3a60b9a996590b60b39b3a9cca68d2207b89a2a0cf3b235fd6452459be9c0c3e",
  criterio:
    "Votações nominais de plenário sobre o texto (mérito), 2023 a 2026, nos blocos mulheres, povos indígenas e democracia. Urgências e votações simbólicas ficam fora.",
  foraDaSelecao: [
    "PL 896/2023 (crime de misoginia): só houve votação nominal da urgência.",
    "PL 3874/2023 (armas para agressores de mulheres): só houve votação nominal da urgência.",
    "PL 4381/2023 (atendimento a mulheres indígenas vítimas de violência): só houve votação nominal da urgência.",
    "PL 2162/2023 (anistia do 8 de janeiro): a urgência fica fora; entra o substitutivo da dosimetria.",
    "PL 1904/2024 (aborto): urgência aprovada em votação simbólica, sem voto individual.",
  ],
} as const;

export const DESFECHOS = ["reeleita", "eleita para outro cargo", "suplente", "não eleita", "não concorreu"] as const;
export type Desfecho = (typeof DESFECHOS)[number];

export type VotoTipo = "Sim" | "Não" | "Abstenção" | "Obstrução" | "Ausente" | "Presidência da sessão";

export type VotacaoSexo = {
  total: number;
  votos: Record<string, number>;
  contraBancada: number;
  comBancada: number;
  desfechoPorVoto: Record<string, Record<Desfecho, number>>;
};

export type Votacao = {
  id: string;
  bloco: string;
  titulo: string;
  proposicao: string;
  etapa: string;
  /** o que significa votar Sim, em linguagem comum */
  sim: string;
  data: string;
  descricaoOficial: string;
  placar: { sim: number; nao: number; abstencao: number };
  emExercicio: number;
  porSexo: { F: VotacaoSexo; M: VotacaoSexo };
  /** deputadas por cor/raça (TSE 2022) e voto */
  racaDeputadas: Record<string, Record<string, number>>;
  deputadasContraBancada: { nome: string; partido: string; uf: string; voto: string; maioriaBancada: string }[];
};

export type Deputada = {
  nome: string;
  uf: string;
  raca2022: string;
  desfecho2026: Desfecho;
  cargo2026: string | null;
  votos: Record<string, { voto: VotoTipo; partido: string; bancada: string; alinhamento: string | null }>;
};

export const VOTACOES: Votacao[] = [
 {
  "id": "2351179-51",
  "bloco": "Mulheres",
  "titulo": "Igualdade salarial entre mulheres e homens",
  "proposicao": "PL 1.085/2023",
  "etapa": "texto principal (subemenda substitutiva global)",
  "sim": "a favor da lei de igualdade salarial e remuneratória entre mulheres e homens na mesma função",
  "data": "2023-05-04",
  "descricaoOficial": "Aprovada a Subemenda Substitutiva Global ao Projeto de Lei nº 1.085, de 2023, adotada pela relatora da Comissão de Defesa dos Direitos da Mulher, ressalvados os destaques. Sim: 325; não: 36; abstenção: 3; total: 364.",
  "placar": {
   "sim": 325,
   "nao": 36,
   "abstencao": 3
  },
  "emExercicio": 512,
  "porSexo": {
   "F": {
    "total": 87,
    "votos": {
     "Não": 10,
     "Sim": 60,
     "Ausente": 17
    },
    "contraBancada": 9,
    "comBancada": 61,
    "desfechoPorVoto": {
     "Não": {
      "reeleita": 6,
      "eleita para outro cargo": 2,
      "suplente": 0,
      "não eleita": 0,
      "não concorreu": 2
     },
     "Sim": {
      "reeleita": 42,
      "eleita para outro cargo": 3,
      "suplente": 9,
      "não eleita": 3,
      "não concorreu": 3
     },
     "Ausente": {
      "reeleita": 8,
      "eleita para outro cargo": 1,
      "suplente": 2,
      "não eleita": 5,
      "não concorreu": 1
     }
    }
   },
   "M": {
    "total": 425,
    "votos": {
     "Sim": 265,
     "Ausente": 130,
     "Não": 26,
     "Abstenção": 3,
     "Presidência da sessão": 1
    },
    "contraBancada": 24,
    "comBancada": 267,
    "desfechoPorVoto": {
     "Sim": {
      "reeleita": 151,
      "eleita para outro cargo": 6,
      "suplente": 68,
      "não eleita": 16,
      "não concorreu": 21
     },
     "Ausente": {
      "reeleita": 60,
      "eleita para outro cargo": 11,
      "suplente": 23,
      "não eleita": 24,
      "não concorreu": 11
     },
     "Não": {
      "reeleita": 18,
      "eleita para outro cargo": 3,
      "suplente": 2,
      "não eleita": 1,
      "não concorreu": 1
     }
    }
   }
  },
  "racaDeputadas": {
   "BRANCA": {
    "Não": 9,
    "Sim": 37,
    "Ausente": 10
   },
   "PARDA": {
    "Sim": 11,
    "Ausente": 5
   },
   "PRETA": {
    "Sim": 10,
    "Ausente": 2
   },
   "INDÍGENA": {
    "Sim": 2,
    "Não": 1
   }
  },
  "deputadasContraBancada": [
   {
    "nome": "Any Ortiz",
    "partido": "CIDADANIA",
    "uf": "RS",
    "voto": "Não",
    "maioriaBancada": "Sim"
   },
   {
    "nome": "Bia Kicis",
    "partido": "PL",
    "uf": "DF",
    "voto": "Não",
    "maioriaBancada": "Sim"
   },
   {
    "nome": "Carla Zambelli",
    "partido": "PL",
    "uf": "SP",
    "voto": "Não",
    "maioriaBancada": "Sim"
   },
   {
    "nome": "Caroline de Toni",
    "partido": "PL",
    "uf": "SC",
    "voto": "Não",
    "maioriaBancada": "Sim"
   },
   {
    "nome": "Chris Tonietto",
    "partido": "PL",
    "uf": "RJ",
    "voto": "Não",
    "maioriaBancada": "Sim"
   },
   {
    "nome": "Dani Cunha",
    "partido": "UNIÃO",
    "uf": "RJ",
    "voto": "Não",
    "maioriaBancada": "Sim"
   },
   {
    "nome": "Julia Zanatta",
    "partido": "PL",
    "uf": "SC",
    "voto": "Não",
    "maioriaBancada": "Sim"
   },
   {
    "nome": "Rosangela Moro",
    "partido": "UNIÃO",
    "uf": "SP",
    "voto": "Não",
    "maioriaBancada": "Sim"
   },
   {
    "nome": "Silvia Waiãpi",
    "partido": "PL",
    "uf": "AP",
    "voto": "Não",
    "maioriaBancada": "Sim"
   }
  ]
 },
 {
  "id": "2352476-149",
  "bloco": "Mulheres",
  "titulo": "Anistia aos partidos que descumpriram as cotas",
  "proposicao": "PEC 9/2023",
  "etapa": "1º turno (substitutivo da comissão especial)",
  "sim": "a favor de livrar de punição os partidos que não destinaram o mínimo de recursos a candidaturas de mulheres e de pessoas negras",
  "data": "2024-07-11",
  "descricaoOficial": "Aprovado, em primeiro turno, o Substitutivo adotado pelo Relator da Comissão Especial à Proposta de Emenda à Constituição nº 9, de 2023, ressalvado o destaque. Sim: 344; não: 89; abstenção: 4; total: 437.",
  "placar": {
   "sim": 344,
   "nao": 89,
   "abstencao": 4
  },
  "emExercicio": 513,
  "porSexo": {
   "F": {
    "total": 91,
    "votos": {
     "Não": 23,
     "Sim": 55,
     "Ausente": 12,
     "Abstenção": 1
    },
    "contraBancada": 16,
    "comBancada": 62,
    "desfechoPorVoto": {
     "Não": {
      "reeleita": 14,
      "eleita para outro cargo": 3,
      "suplente": 3,
      "não eleita": 2,
      "não concorreu": 1
     },
     "Sim": {
      "reeleita": 29,
      "eleita para outro cargo": 2,
      "suplente": 15,
      "não eleita": 4,
      "não concorreu": 5
     },
     "Ausente": {
      "reeleita": 8,
      "eleita para outro cargo": 2,
      "suplente": 0,
      "não eleita": 1,
      "não concorreu": 1
     }
    }
   },
   "M": {
    "total": 422,
    "votos": {
     "Ausente": 63,
     "Sim": 289,
     "Não": 66,
     "Presidência da sessão": 1,
     "Abstenção": 3
    },
    "contraBancada": 54,
    "comBancada": 301,
    "desfechoPorVoto": {
     "Ausente": {
      "reeleita": 26,
      "eleita para outro cargo": 8,
      "suplente": 12,
      "não eleita": 2,
      "não concorreu": 14
     },
     "Sim": {
      "reeleita": 163,
      "eleita para outro cargo": 5,
      "suplente": 76,
      "não eleita": 25,
      "não concorreu": 17
     },
     "Não": {
      "reeleita": 36,
      "eleita para outro cargo": 4,
      "suplente": 11,
      "não eleita": 10,
      "não concorreu": 4
     }
    }
   }
  },
  "racaDeputadas": {
   "BRANCA": {
    "Não": 17,
    "Sim": 31,
    "Ausente": 7,
    "Abstenção": 1
   },
   "PARDA": {
    "Sim": 15,
    "Ausente": 3,
    "Não": 1
   },
   "PRETA": {
    "Sim": 7,
    "Não": 4,
    "Ausente": 2
   },
   "INDÍGENA": {
    "Não": 1,
    "Sim": 2
   }
  },
  "deputadasContraBancada": [
   {
    "nome": "Antônia Lúcia",
    "partido": "REPUBLICANOS",
    "uf": "AC",
    "voto": "Não",
    "maioriaBancada": "Sim"
   },
   {
    "nome": "Bia Kicis",
    "partido": "PL",
    "uf": "DF",
    "voto": "Não",
    "maioriaBancada": "Sim"
   },
   {
    "nome": "Carla Zambelli",
    "partido": "PL",
    "uf": "SP",
    "voto": "Não",
    "maioriaBancada": "Sim"
   },
   {
    "nome": "Caroline de Toni",
    "partido": "PL",
    "uf": "SC",
    "voto": "Não",
    "maioriaBancada": "Sim"
   },
   {
    "nome": "Chris Tonietto",
    "partido": "PL",
    "uf": "RJ",
    "voto": "Não",
    "maioriaBancada": "Sim"
   },
   {
    "nome": "Daniela Reinehr",
    "partido": "PL",
    "uf": "SC",
    "voto": "Não",
    "maioriaBancada": "Sim"
   },
   {
    "nome": "Dayany Bittencourt",
    "partido": "UNIÃO",
    "uf": "CE",
    "voto": "Não",
    "maioriaBancada": "Sim"
   },
   {
    "nome": "Dra. Alessandra Haber",
    "partido": "MDB",
    "uf": "PA",
    "voto": "Não",
    "maioriaBancada": "Sim"
   },
   {
    "nome": "Duda Salabert",
    "partido": "PDT",
    "uf": "MG",
    "voto": "Não",
    "maioriaBancada": "Sim"
   },
   {
    "nome": "Erika Kokay",
    "partido": "PT",
    "uf": "DF",
    "voto": "Não",
    "maioriaBancada": "Sim"
   },
   {
    "nome": "Gisela Simona",
    "partido": "UNIÃO",
    "uf": "MT",
    "voto": "Não",
    "maioriaBancada": "Sim"
   },
   {
    "nome": "Julia Zanatta",
    "partido": "PL",
    "uf": "SC",
    "voto": "Não",
    "maioriaBancada": "Sim"
   },
   {
    "nome": "Reginete Bispo",
    "partido": "PT",
    "uf": "RS",
    "voto": "Não",
    "maioriaBancada": "Sim"
   },
   {
    "nome": "Rosana Valle",
    "partido": "PL",
    "uf": "SP",
    "voto": "Não",
    "maioriaBancada": "Sim"
   },
   {
    "nome": "Rosangela Moro",
    "partido": "UNIÃO",
    "uf": "SP",
    "voto": "Não",
    "maioriaBancada": "Sim"
   },
   {
    "nome": "Tabata Amaral",
    "partido": "PSB",
    "uf": "SP",
    "voto": "Não",
    "maioriaBancada": "Sim"
   }
  ]
 },
 {
  "id": "345311-270",
  "bloco": "Povos indígenas",
  "titulo": "Marco temporal das terras indígenas",
  "proposicao": "PL 490/2007",
  "etapa": "texto principal (subemenda substitutiva global)",
  "sim": "a favor de limitar a demarcação às terras ocupadas por povos indígenas em 5 de outubro de 1988",
  "data": "2023-05-30",
  "descricaoOficial": "Aprovada a Subemenda Substitutiva Global ao Projeto de Lei nº 490, de 2007, adotada pelo relator da Comissão de Constituição e Justiça e de Cidadania, ressalvados os destaques. Sim: 283; não: 155; abstenção: 1; total: 439.",
  "placar": {
   "sim": 283,
   "nao": 155,
   "abstencao": 1
  },
  "emExercicio": 514,
  "porSexo": {
   "F": {
    "total": 88,
    "votos": {
     "Sim": 41,
     "Não": 36,
     "Ausente": 11
    },
    "contraBancada": 4,
    "comBancada": 73,
    "desfechoPorVoto": {
     "Sim": {
      "reeleita": 25,
      "eleita para outro cargo": 2,
      "suplente": 6,
      "não eleita": 3,
      "não concorreu": 5
     },
     "Não": {
      "reeleita": 25,
      "eleita para outro cargo": 2,
      "suplente": 5,
      "não eleita": 4,
      "não concorreu": 0
     },
     "Ausente": {
      "reeleita": 6,
      "eleita para outro cargo": 2,
      "suplente": 0,
      "não eleita": 2,
      "não concorreu": 1
     }
    }
   },
   "M": {
    "total": 426,
    "votos": {
     "Sim": 242,
     "Ausente": 63,
     "Não": 119,
     "Presidência da sessão": 1,
     "Abstenção": 1
    },
    "contraBancada": 38,
    "comBancada": 319,
    "desfechoPorVoto": {
     "Sim": {
      "reeleita": 124,
      "eleita para outro cargo": 17,
      "suplente": 50,
      "não eleita": 27,
      "não concorreu": 20
     },
     "Ausente": {
      "reeleita": 39,
      "eleita para outro cargo": 2,
      "suplente": 12,
      "não eleita": 4,
      "não concorreu": 5
     },
     "Não": {
      "reeleita": 67,
      "eleita para outro cargo": 0,
      "suplente": 33,
      "não eleita": 10,
      "não concorreu": 9
     }
    }
   }
  },
  "racaDeputadas": {
   "BRANCA": {
    "Sim": 31,
    "Não": 20,
    "Ausente": 6
   },
   "PARDA": {
    "Não": 4,
    "Ausente": 5,
    "Sim": 7
   },
   "PRETA": {
    "Não": 10,
    "Sim": 2
   },
   "INDÍGENA": {
    "Não": 2,
    "Sim": 1
   }
  },
  "deputadasContraBancada": [
   {
    "nome": "Helena Lima",
    "partido": "MDB",
    "uf": "RR",
    "voto": "Não",
    "maioriaBancada": "Sim"
   },
   {
    "nome": "Iza Arruda",
    "partido": "MDB",
    "uf": "PE",
    "voto": "Não",
    "maioriaBancada": "Sim"
   },
   {
    "nome": "Laura Carneiro",
    "partido": "PSD",
    "uf": "RJ",
    "voto": "Não",
    "maioriaBancada": "Sim"
   },
   {
    "nome": "Socorro Neri",
    "partido": "PP",
    "uf": "AC",
    "voto": "Não",
    "maioriaBancada": "Sim"
   }
  ]
 },
 {
  "id": "2358548-89",
  "bloco": "Democracia",
  "titulo": "Redução de penas do 8 de janeiro (dosimetria)",
  "proposicao": "PL 2.162/2023",
  "etapa": "substitutivo da comissão especial",
  "sim": "a favor do texto que reduz as penas de condenados pelos atos de 8 de janeiro de 2023",
  "data": "2025-12-10",
  "descricaoOficial": "Aprovado o Substitutivo ao Projeto de Lei nº 2.162, de 2023, adotado pelo relator da Comissão Especial, ressalvados os destaques. Sim: 291; Não: 148; Abstenção: 1; Total: 440.",
  "placar": {
   "sim": 291,
   "nao": 148,
   "abstencao": 1
  },
  "emExercicio": 513,
  "porSexo": {
   "F": {
    "total": 87,
    "votos": {
     "Sim": 40,
     "Não": 37,
     "Ausente": 10
    },
    "contraBancada": 7,
    "comBancada": 70,
    "desfechoPorVoto": {
     "Sim": {
      "reeleita": 27,
      "eleita para outro cargo": 3,
      "suplente": 7,
      "não eleita": 2,
      "não concorreu": 1
     },
     "Não": {
      "reeleita": 25,
      "eleita para outro cargo": 3,
      "suplente": 5,
      "não eleita": 3,
      "não concorreu": 1
     },
     "Ausente": {
      "reeleita": 3,
      "eleita para outro cargo": 2,
      "suplente": 2,
      "não eleita": 2,
      "não concorreu": 1
     }
    }
   },
   "M": {
    "total": 426,
    "votos": {
     "Sim": 251,
     "Ausente": 62,
     "Não": 111,
     "Presidência da sessão": 1,
     "Abstenção": 1
    },
    "contraBancada": 26,
    "comBancada": 336,
    "desfechoPorVoto": {
     "Sim": {
      "reeleita": 132,
      "eleita para outro cargo": 16,
      "suplente": 66,
      "não eleita": 24,
      "não concorreu": 10
     },
     "Ausente": {
      "reeleita": 41,
      "eleita para outro cargo": 1,
      "suplente": 7,
      "não eleita": 3,
      "não concorreu": 9
     },
     "Não": {
      "reeleita": 58,
      "eleita para outro cargo": 2,
      "suplente": 33,
      "não eleita": 13,
      "não concorreu": 5
     }
    }
   }
  },
  "racaDeputadas": {
   "BRANCA": {
    "Sim": 30,
    "Não": 19,
    "Ausente": 5
   },
   "PARDA": {
    "Não": 6,
    "Ausente": 5,
    "Sim": 7
   },
   "PRETA": {
    "Não": 10,
    "Sim": 3
   },
   "INDÍGENA": {
    "Não": 2
   }
  },
  "deputadasContraBancada": [
   {
    "nome": "Daniela do Waguinho",
    "partido": "UNIÃO",
    "uf": "RJ",
    "voto": "Não",
    "maioriaBancada": "Sim"
   },
   {
    "nome": "Flávia Morais",
    "partido": "PDT",
    "uf": "GO",
    "voto": "Sim",
    "maioriaBancada": "Não"
   },
   {
    "nome": "Iza Arruda",
    "partido": "MDB",
    "uf": "PE",
    "voto": "Não",
    "maioriaBancada": "Sim"
   },
   {
    "nome": "Laura Carneiro",
    "partido": "PSD",
    "uf": "RJ",
    "voto": "Não",
    "maioriaBancada": "Sim"
   },
   {
    "nome": "Maria Arraes",
    "partido": "SOLIDARIEDADE",
    "uf": "PE",
    "voto": "Não",
    "maioriaBancada": "Sim"
   },
   {
    "nome": "Meire Serafim",
    "partido": "UNIÃO",
    "uf": "AC",
    "voto": "Não",
    "maioriaBancada": "Sim"
   },
   {
    "nome": "Socorro Neri",
    "partido": "PP",
    "uf": "AC",
    "voto": "Não",
    "maioriaBancada": "Sim"
   }
  ]
 },
 {
  "id": "2270800-160",
  "bloco": "Democracia",
  "titulo": "PEC das prerrogativas parlamentares",
  "proposicao": "PEC 3/2021",
  "etapa": "2º turno",
  "sim": "a favor da PEC que amplia a proteção de parlamentares contra processos e prisões",
  "data": "2025-09-16",
  "descricaoOficial": "Aprovada, em segundo turno, a Proposta de Emenda à Constituição n° 3, de 2021, ressalvado os destaques. Sim: 344; Não: 133; Total: 477.",
  "placar": {
   "sim": 344,
   "nao": 133,
   "abstencao": 0
  },
  "emExercicio": 512,
  "porSexo": {
   "F": {
    "total": 88,
    "votos": {
     "Não": 36,
     "Sim": 45,
     "Ausente": 7
    },
    "contraBancada": 11,
    "comBancada": 67,
    "desfechoPorVoto": {
     "Não": {
      "reeleita": 26,
      "eleita para outro cargo": 2,
      "suplente": 5,
      "não eleita": 3,
      "não concorreu": 0
     },
     "Sim": {
      "reeleita": 27,
      "eleita para outro cargo": 5,
      "suplente": 8,
      "não eleita": 3,
      "não concorreu": 2
     },
     "Ausente": {
      "reeleita": 5,
      "eleita para outro cargo": 1,
      "suplente": 0,
      "não eleita": 1,
      "não concorreu": 0
     }
    }
   },
   "M": {
    "total": 424,
    "votos": {
     "Sim": 299,
     "Não": 97,
     "Ausente": 28
    },
    "contraBancada": 44,
    "comBancada": 335,
    "desfechoPorVoto": {
     "Sim": {
      "reeleita": 167,
      "eleita para outro cargo": 17,
      "suplente": 72,
      "não eleita": 25,
      "não concorreu": 13
     },
     "Não": {
      "reeleita": 52,
      "eleita para outro cargo": 1,
      "suplente": 27,
      "não eleita": 12,
      "não concorreu": 5
     },
     "Ausente": {
      "reeleita": 13,
      "eleita para outro cargo": 0,
      "suplente": 7,
      "não eleita": 3,
      "não concorreu": 5
     }
    }
   }
  },
  "racaDeputadas": {
   "BRANCA": {
    "Não": 21,
    "Sim": 28,
    "Ausente": 5
   },
   "PARDA": {
    "Não": 6,
    "Sim": 13
   },
   "PRETA": {
    "Não": 7,
    "Ausente": 2,
    "Sim": 4
   },
   "INDÍGENA": {
    "Não": 2
   }
  },
  "deputadasContraBancada": [
   {
    "nome": "Cristiane Lopes",
    "partido": "UNIÃO",
    "uf": "RO",
    "voto": "Não",
    "maioriaBancada": "Sim"
   },
   {
    "nome": "Daniela do Waguinho",
    "partido": "UNIÃO",
    "uf": "RJ",
    "voto": "Não",
    "maioriaBancada": "Sim"
   },
   {
    "nome": "Delegada Katarina",
    "partido": "PSD",
    "uf": "SE",
    "voto": "Não",
    "maioriaBancada": "Sim"
   },
   {
    "nome": "Dilvanda Faro",
    "partido": "PT",
    "uf": "PA",
    "voto": "Sim",
    "maioriaBancada": "Não"
   },
   {
    "nome": "Duda Salabert",
    "partido": "PDT",
    "uf": "MG",
    "voto": "Não",
    "maioriaBancada": "Sim"
   },
   {
    "nome": "Flávia Morais",
    "partido": "PDT",
    "uf": "GO",
    "voto": "Não",
    "maioriaBancada": "Sim"
   },
   {
    "nome": "Laura Carneiro",
    "partido": "PSD",
    "uf": "RJ",
    "voto": "Não",
    "maioriaBancada": "Sim"
   },
   {
    "nome": "Lídice da Mata",
    "partido": "PSB",
    "uf": "BA",
    "voto": "Não",
    "maioriaBancada": "Sim"
   },
   {
    "nome": "Rosangela Moro",
    "partido": "UNIÃO",
    "uf": "SP",
    "voto": "Não",
    "maioriaBancada": "Sim"
   },
   {
    "nome": "Socorro Neri",
    "partido": "PP",
    "uf": "AC",
    "voto": "Não",
    "maioriaBancada": "Sim"
   },
   {
    "nome": "Tabata Amaral",
    "partido": "PSB",
    "uf": "SP",
    "voto": "Não",
    "maioriaBancada": "Sim"
   }
  ]
 }
] as Votacao[];

export const DEPUTADAS: Deputada[] = [{"nome": "Adriana Ventura", "uf": "SP", "raca2022": "BRANCA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Não", "partido": "NOVO", "bancada": "Não", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Não", "partido": "NOVO", "bancada": "Não", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Sim", "partido": "NOVO", "bancada": "Sim", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Sim", "partido": "NOVO", "bancada": "Sim", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Não", "partido": "NOVO", "bancada": "Não", "alinhamento": "com a bancada"}}}, {"nome": "Alice Portugal", "uf": "BA", "raca2022": "PARDA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "PCdoB", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Sim", "partido": "PCdoB", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Não", "partido": "PCdoB", "bancada": "Não", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Não", "partido": "PCdoB", "bancada": "Não", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Não", "partido": "PCdoB", "bancada": "Não", "alinhamento": "com a bancada"}}}, {"nome": "Aline Gurgel", "uf": "AP", "raca2022": "PARDA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2270800-160": {"voto": "Sim", "partido": "REPUBLICANOS", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Amanda Gentil", "uf": "MA", "raca2022": "PARDA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "PP", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Ausente", "partido": "PP", "bancada": "Sim", "alinhamento": null}, "2358548-89": {"voto": "Ausente", "partido": "PP", "bancada": "Sim", "alinhamento": null}, "2270800-160": {"voto": "Sim", "partido": "PP", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Amália Barros", "uf": "MT", "raca2022": "BRANCA", "desfecho2026": "não concorreu", "cargo2026": null, "votos": {"2351179-51": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Ana Paula Leão", "uf": "MG", "raca2022": "BRANCA", "desfecho2026": "suplente", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Ausente", "partido": "PP", "bancada": "Sim", "alinhamento": null}, "2352476-149": {"voto": "Sim", "partido": "PP", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Sim", "partido": "PP", "bancada": "Sim", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Sim", "partido": "PP", "bancada": "Sim", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Sim", "partido": "PP", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Ana Paula Lima", "uf": "SC", "raca2022": "BRANCA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "PT", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Sim", "partido": "PT", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}}}, {"nome": "Ana Pimentel", "uf": "MG", "raca2022": "BRANCA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "PT", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Sim", "partido": "PT", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}}}, {"nome": "Andreia Siqueira", "uf": "PA", "raca2022": "PARDA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "MDB", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Ausente", "partido": "MDB", "bancada": "Sim", "alinhamento": null}, "345311-270": {"voto": "Ausente", "partido": "MDB", "bancada": "Sim", "alinhamento": null}, "2358548-89": {"voto": "Sim", "partido": "MDB", "bancada": "Sim", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Sim", "partido": "MDB", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Antônia Lúcia", "uf": "AC", "raca2022": "PARDA", "desfecho2026": "não eleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Ausente", "partido": "REPUBLICANOS", "bancada": "Sim", "alinhamento": null}, "2352476-149": {"voto": "Não", "partido": "REPUBLICANOS", "bancada": "Sim", "alinhamento": "contra a bancada"}, "345311-270": {"voto": "Sim", "partido": "REPUBLICANOS", "bancada": "Sim", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Sim", "partido": "REPUBLICANOS", "bancada": "Sim", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Sim", "partido": "REPUBLICANOS", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Any Ortiz", "uf": "RS", "raca2022": "BRANCA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Não", "partido": "CIDADANIA", "bancada": "Sim", "alinhamento": "contra a bancada"}, "2352476-149": {"voto": "Não", "partido": "CIDADANIA", "bancada": "Não", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Sim", "partido": "CIDADANIA", "bancada": "Sim", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Sim", "partido": "CIDADANIA", "bancada": "Sim", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Sim", "partido": "CIDADANIA", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Benedita da Silva", "uf": "RJ", "raca2022": "PRETA", "desfecho2026": "não eleita", "cargo2026": "SENADOR", "votos": {"2351179-51": {"voto": "Sim", "partido": "PT", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Sim", "partido": "PT", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}}}, {"nome": "Bia Kicis", "uf": "DF", "raca2022": "BRANCA", "desfecho2026": "eleita para outro cargo", "cargo2026": "SENADOR", "votos": {"2351179-51": {"voto": "Não", "partido": "PL", "bancada": "Sim", "alinhamento": "contra a bancada"}, "2352476-149": {"voto": "Não", "partido": "PL", "bancada": "Sim", "alinhamento": "contra a bancada"}, "345311-270": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Camila Jara", "uf": "MS", "raca2022": "BRANCA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "PT", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Sim", "partido": "PT", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Ausente", "partido": "PT", "bancada": "Não", "alinhamento": null}}}, {"nome": "Carla Ayres", "uf": "SC", "raca2022": "BRANCA", "desfecho2026": "suplente", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2352476-149": {"voto": "Sim", "partido": "PT", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Carla Dickson", "uf": "RN", "raca2022": "BRANCA", "desfecho2026": "suplente", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2358548-89": {"voto": "Sim", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Sim", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Carla Zambelli", "uf": "SP", "raca2022": "BRANCA", "desfecho2026": "não concorreu", "cargo2026": null, "votos": {"2351179-51": {"voto": "Não", "partido": "PL", "bancada": "Sim", "alinhamento": "contra a bancada"}, "2352476-149": {"voto": "Não", "partido": "PL", "bancada": "Sim", "alinhamento": "contra a bancada"}, "345311-270": {"voto": "Ausente", "partido": "PL", "bancada": "Sim", "alinhamento": null}, "2358548-89": {"voto": "Ausente", "partido": "PL", "bancada": "Sim", "alinhamento": null}}}, {"nome": "Carmen Zanotto", "uf": "SC", "raca2022": "BRANCA", "desfecho2026": "não concorreu", "cargo2026": null, "votos": {"2352476-149": {"voto": "Ausente", "partido": "CIDADANIA", "bancada": "Não", "alinhamento": null}}}, {"nome": "Carol Dartora", "uf": "PR", "raca2022": "PRETA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "PT", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Sim", "partido": "PT", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Ausente", "partido": "PT", "bancada": "Não", "alinhamento": null}}}, {"nome": "Caroline de Toni", "uf": "SC", "raca2022": "BRANCA", "desfecho2026": "eleita para outro cargo", "cargo2026": "SENADOR", "votos": {"2351179-51": {"voto": "Não", "partido": "PL", "bancada": "Sim", "alinhamento": "contra a bancada"}, "2352476-149": {"voto": "Não", "partido": "PL", "bancada": "Sim", "alinhamento": "contra a bancada"}, "345311-270": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Ausente", "partido": "PL", "bancada": "Sim", "alinhamento": null}, "2270800-160": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Chris Tonietto", "uf": "RJ", "raca2022": "BRANCA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Não", "partido": "PL", "bancada": "Sim", "alinhamento": "contra a bancada"}, "2352476-149": {"voto": "Não", "partido": "PL", "bancada": "Sim", "alinhamento": "contra a bancada"}, "345311-270": {"voto": "Ausente", "partido": "PL", "bancada": "Sim", "alinhamento": null}, "2358548-89": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Clarissa Tércio", "uf": "PE", "raca2022": "BRANCA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "PP", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Sim", "partido": "PP", "bancada": "Sim", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Sim", "partido": "PP", "bancada": "Sim", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Sim", "partido": "PP", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Coronel Fernanda", "uf": "MT", "raca2022": "BRANCA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Cristiane Lopes", "uf": "RO", "raca2022": "PARDA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Ausente", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": null}, "2352476-149": {"voto": "Sim", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Sim", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Sim", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Não", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": "contra a bancada"}}}, {"nome": "Célia Xakriabá", "uf": "MG", "raca2022": "INDÍGENA", "desfecho2026": "suplente", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "PSOL", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Não", "partido": "PSOL", "bancada": "Não", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Não", "partido": "PSOL", "bancada": "Não", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Não", "partido": "PSOL", "bancada": "Não", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Não", "partido": "PSOL", "bancada": "Não", "alinhamento": "com a bancada"}}}, {"nome": "Daiana Santos", "uf": "RS", "raca2022": "PRETA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "PCdoB", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Sim", "partido": "PCdoB", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Não", "partido": "PCdoB", "bancada": "Não", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Não", "partido": "PCdoB", "bancada": "Não", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Não", "partido": "PCdoB", "bancada": "Não", "alinhamento": "com a bancada"}}}, {"nome": "Dandara", "uf": "MG", "raca2022": "PRETA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "PT", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Sim", "partido": "PT", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Ausente", "partido": "PT", "bancada": "Não", "alinhamento": null}}}, {"nome": "Dani Cunha", "uf": "RJ", "raca2022": "BRANCA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Não", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": "contra a bancada"}, "2352476-149": {"voto": "Sim", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Sim", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Sim", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Sim", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Daniela Reinehr", "uf": "SC", "raca2022": "BRANCA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Não", "partido": "PL", "bancada": "Sim", "alinhamento": "contra a bancada"}, "345311-270": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Daniela do Waguinho", "uf": "RJ", "raca2022": "BRANCA", "desfecho2026": "suplente", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2352476-149": {"voto": "Sim", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Não", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": "contra a bancada"}, "2270800-160": {"voto": "Não", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": "contra a bancada"}}}, {"nome": "Dayany Bittencourt", "uf": "CE", "raca2022": "PRETA", "desfecho2026": "suplente", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Não", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": "contra a bancada"}, "345311-270": {"voto": "Sim", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Sim", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Sim", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Delegada Adriana Accorsi", "uf": "GO", "raca2022": "BRANCA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "PT", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Ausente", "partido": "PT", "bancada": "Sim", "alinhamento": null}, "345311-270": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Ausente", "partido": "PT", "bancada": "Não", "alinhamento": null}, "2270800-160": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}}}, {"nome": "Delegada Ione", "uf": "MG", "raca2022": "PARDA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "AVANTE", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Sim", "partido": "AVANTE", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Sim", "partido": "AVANTE", "bancada": "Sim", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Sim", "partido": "AVANTE", "bancada": "Sim", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Sim", "partido": "AVANTE", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Delegada Katarina", "uf": "SE", "raca2022": "BRANCA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "PSD", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Ausente", "partido": "PSD", "bancada": "Sim", "alinhamento": null}, "345311-270": {"voto": "Sim", "partido": "PSD", "bancada": "Sim", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Sim", "partido": "PSD", "bancada": "Sim", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Não", "partido": "PSD", "bancada": "Sim", "alinhamento": "contra a bancada"}}}, {"nome": "Denise Pessôa", "uf": "RS", "raca2022": "PRETA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "PT", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Sim", "partido": "PT", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}}}, {"nome": "Detinha", "uf": "MA", "raca2022": "PARDA", "desfecho2026": "eleita para outro cargo", "cargo2026": "DEPUTADO ESTADUAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Ausente", "partido": "PL", "bancada": "Sim", "alinhamento": null}, "345311-270": {"voto": "Ausente", "partido": "PL", "bancada": "Sim", "alinhamento": null}, "2358548-89": {"voto": "Ausente", "partido": "PL", "bancada": "Sim", "alinhamento": null}, "2270800-160": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Dilvanda Faro", "uf": "PA", "raca2022": "PRETA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "PT", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Sim", "partido": "PT", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Sim", "partido": "PT", "bancada": "Não", "alinhamento": "contra a bancada"}}}, {"nome": "Dra. Alessandra Haber", "uf": "PA", "raca2022": "BRANCA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Ausente", "partido": "MDB", "bancada": "Sim", "alinhamento": null}, "2352476-149": {"voto": "Não", "partido": "MDB", "bancada": "Sim", "alinhamento": "contra a bancada"}, "345311-270": {"voto": "Sim", "partido": "MDB", "bancada": "Sim", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Sim", "partido": "MDB", "bancada": "Sim", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Sim", "partido": "MDB", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Duda Salabert", "uf": "MG", "raca2022": "BRANCA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "PDT", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Não", "partido": "PDT", "bancada": "Sim", "alinhamento": "contra a bancada"}, "345311-270": {"voto": "Não", "partido": "PDT", "bancada": "Não", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Não", "partido": "PDT", "bancada": "Não", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Não", "partido": "PDT", "bancada": "Sim", "alinhamento": "contra a bancada"}}}, {"nome": "Elcione Barbalho", "uf": "PA", "raca2022": "BRANCA", "desfecho2026": "não eleita", "cargo2026": "DEPUTADO ESTADUAL", "votos": {"2351179-51": {"voto": "Ausente", "partido": "MDB", "bancada": "Sim", "alinhamento": null}, "2352476-149": {"voto": "Sim", "partido": "MDB", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Ausente", "partido": "MDB", "bancada": "Sim", "alinhamento": null}, "2358548-89": {"voto": "Ausente", "partido": "MDB", "bancada": "Sim", "alinhamento": null}, "2270800-160": {"voto": "Ausente", "partido": "MDB", "bancada": "Sim", "alinhamento": null}}}, {"nome": "Eliza Virgínia", "uf": "PB", "raca2022": "PARDA", "desfecho2026": "suplente", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2352476-149": {"voto": "Sim", "partido": "PP", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Ely Santos", "uf": "SP", "raca2022": "PARDA", "desfecho2026": "eleita para outro cargo", "cargo2026": "DEPUTADO ESTADUAL", "votos": {"2352476-149": {"voto": "Sim", "partido": "REPUBLICANOS", "bancada": "Sim", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Sim", "partido": "REPUBLICANOS", "bancada": "Sim", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Sim", "partido": "REPUBLICANOS", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Enfermeira Ana Paula", "uf": "CE", "raca2022": "BRANCA", "desfecho2026": "suplente", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2358548-89": {"voto": "Ausente", "partido": "PODE", "bancada": "Sim", "alinhamento": null}, "2270800-160": {"voto": "Sim", "partido": "PODE", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Enfermeira Rejane", "uf": "RJ", "raca2022": "PRETA", "desfecho2026": "suplente", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2358548-89": {"voto": "Não", "partido": "PCdoB", "bancada": "Não", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Não", "partido": "PCdoB", "bancada": "Não", "alinhamento": "com a bancada"}}}, {"nome": "Erika Hilton", "uf": "SP", "raca2022": "PRETA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Ausente", "partido": "PSOL", "bancada": "Sim", "alinhamento": null}, "2352476-149": {"voto": "Ausente", "partido": "PSOL", "bancada": "Não", "alinhamento": null}, "345311-270": {"voto": "Não", "partido": "PSOL", "bancada": "Não", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Não", "partido": "PSOL", "bancada": "Não", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Não", "partido": "PSOL", "bancada": "Não", "alinhamento": "com a bancada"}}}, {"nome": "Erika Kokay", "uf": "DF", "raca2022": "BRANCA", "desfecho2026": "não eleita", "cargo2026": "SENADOR", "votos": {"2351179-51": {"voto": "Sim", "partido": "PT", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Não", "partido": "PT", "bancada": "Sim", "alinhamento": "contra a bancada"}, "345311-270": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}}}, {"nome": "Fatima Pelaes", "uf": "AP", "raca2022": "PARDA", "desfecho2026": "suplente", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2358548-89": {"voto": "Ausente", "partido": "REPUBLICANOS", "bancada": "Sim", "alinhamento": null}}}, {"nome": "Fernanda Melchionna", "uf": "RS", "raca2022": "BRANCA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "PSOL", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Não", "partido": "PSOL", "bancada": "Não", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Não", "partido": "PSOL", "bancada": "Não", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Não", "partido": "PSOL", "bancada": "Não", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Não", "partido": "PSOL", "bancada": "Não", "alinhamento": "com a bancada"}}}, {"nome": "Fernanda Pessoa", "uf": "CE", "raca2022": "BRANCA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Sim", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Sim", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Sim", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Flavinha", "uf": "MT", "raca2022": "BRANCA", "desfecho2026": "não eleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"345311-270": {"voto": "Sim", "partido": "MDB", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Flávia Morais", "uf": "GO", "raca2022": "BRANCA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "PDT", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Ausente", "partido": "PDT", "bancada": "Sim", "alinhamento": null}, "345311-270": {"voto": "Não", "partido": "PDT", "bancada": "Não", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Sim", "partido": "PDT", "bancada": "Não", "alinhamento": "contra a bancada"}, "2270800-160": {"voto": "Não", "partido": "PDT", "bancada": "Sim", "alinhamento": "contra a bancada"}}}, {"nome": "Franciane Bayer", "uf": "RS", "raca2022": "BRANCA", "desfecho2026": "suplente", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "REPUBLICANOS", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Sim", "partido": "REPUBLICANOS", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Sim", "partido": "REPUBLICANOS", "bancada": "Sim", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Sim", "partido": "REPUBLICANOS", "bancada": "Sim", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Sim", "partido": "REPUBLICANOS", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Geovania de Sá", "uf": "SC", "raca2022": "BRANCA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "PSDB", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Sim", "partido": "PSDB", "bancada": "Sim", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Sim", "partido": "PSDB", "bancada": "Sim", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Sim", "partido": "PSDB", "bancada": "dividida", "alinhamento": null}}}, {"nome": "Gisela Simona", "uf": "MT", "raca2022": "PRETA", "desfecho2026": "eleita para outro cargo", "cargo2026": "VICE-GOVERNADOR", "votos": {"2352476-149": {"voto": "Não", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": "contra a bancada"}, "2358548-89": {"voto": "Sim", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Sim", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Gleisi Hoffmann", "uf": "PR", "raca2022": "BRANCA", "desfecho2026": "não eleita", "cargo2026": "SENADOR", "votos": {"2351179-51": {"voto": "Ausente", "partido": "PT", "bancada": "Sim", "alinhamento": null}, "2352476-149": {"voto": "Sim", "partido": "PT", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}}}, {"nome": "Gláucia Santiago", "uf": "MG", "raca2022": "BRANCA", "desfecho2026": "suplente", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2352476-149": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Greyce Elias", "uf": "MG", "raca2022": "BRANCA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Ausente", "partido": "AVANTE", "bancada": "Sim", "alinhamento": null}, "2352476-149": {"voto": "Sim", "partido": "AVANTE", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Sim", "partido": "AVANTE", "bancada": "Sim", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Sim", "partido": "AVANTE", "bancada": "Sim", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Sim", "partido": "AVANTE", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Helena Lima", "uf": "RR", "raca2022": "PARDA", "desfecho2026": "não eleita", "cargo2026": "SENADOR", "votos": {"2351179-51": {"voto": "Ausente", "partido": "MDB", "bancada": "Sim", "alinhamento": null}, "2352476-149": {"voto": "Sim", "partido": "MDB", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Não", "partido": "MDB", "bancada": "Sim", "alinhamento": "contra a bancada"}, "2358548-89": {"voto": "Ausente", "partido": "MDB", "bancada": "Sim", "alinhamento": null}, "2270800-160": {"voto": "Sim", "partido": "MDB", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Ivoneide Caetano", "uf": "BA", "raca2022": "PARDA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "PT", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Sim", "partido": "PT", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Ausente", "partido": "PT", "bancada": "Não", "alinhamento": null}, "2358548-89": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}}}, {"nome": "Iza Arruda", "uf": "PE", "raca2022": "BRANCA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "MDB", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Sim", "partido": "MDB", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Não", "partido": "MDB", "bancada": "Sim", "alinhamento": "contra a bancada"}, "2358548-89": {"voto": "Não", "partido": "MDB", "bancada": "Sim", "alinhamento": "contra a bancada"}, "2270800-160": {"voto": "Ausente", "partido": "MDB", "bancada": "Sim", "alinhamento": null}}}, {"nome": "Jack Rocha", "uf": "ES", "raca2022": "PRETA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "PT", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Sim", "partido": "PT", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}}}, {"nome": "Jandira Feghali", "uf": "RJ", "raca2022": "BRANCA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "PCdoB", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Sim", "partido": "PCdoB", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Não", "partido": "PCdoB", "bancada": "Não", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Não", "partido": "PCdoB", "bancada": "Não", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Não", "partido": "PCdoB", "bancada": "Não", "alinhamento": "com a bancada"}}}, {"nome": "Julia Zanatta", "uf": "SC", "raca2022": "BRANCA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Não", "partido": "PL", "bancada": "Sim", "alinhamento": "contra a bancada"}, "2352476-149": {"voto": "Não", "partido": "PL", "bancada": "Sim", "alinhamento": "contra a bancada"}, "345311-270": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Juliana Cardoso", "uf": "SP", "raca2022": "INDÍGENA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "PT", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Sim", "partido": "PT", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}}}, {"nome": "Juliana Kolankiewicz", "uf": "MT", "raca2022": "BRANCA", "desfecho2026": "suplente", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2352476-149": {"voto": "Sim", "partido": "MDB", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Laura Carneiro", "uf": "RJ", "raca2022": "PARDA", "desfecho2026": "suplente", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "PSD", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Sim", "partido": "PSD", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Não", "partido": "PSD", "bancada": "Sim", "alinhamento": "contra a bancada"}, "2358548-89": {"voto": "Não", "partido": "PSD", "bancada": "Sim", "alinhamento": "contra a bancada"}, "2270800-160": {"voto": "Não", "partido": "PSD", "bancada": "Sim", "alinhamento": "contra a bancada"}}}, {"nome": "Lenir de Assis", "uf": "PR", "raca2022": "BRANCA", "desfecho2026": "não eleita", "cargo2026": "DEPUTADO ESTADUAL", "votos": {"2358548-89": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}}}, {"nome": "Loreny", "uf": "SP", "raca2022": "BRANCA", "desfecho2026": "suplente", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2352476-149": {"voto": "Sim", "partido": "SOLIDARIEDADE", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Lucyana Genésio", "uf": "MA", "raca2022": "PARDA", "desfecho2026": "não concorreu", "cargo2026": null, "votos": {"2352476-149": {"voto": "Sim", "partido": "PDT", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Luisa Canziani", "uf": "PR", "raca2022": "BRANCA", "desfecho2026": "suplente", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Ausente", "partido": "PSD", "bancada": "Sim", "alinhamento": null}, "2352476-149": {"voto": "Sim", "partido": "PSD", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Sim", "partido": "PSD", "bancada": "Sim", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Sim", "partido": "PSD", "bancada": "Sim", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Sim", "partido": "PSD", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Luiza Erundina", "uf": "SP", "raca2022": "BRANCA", "desfecho2026": "eleita para outro cargo", "cargo2026": "DEPUTADO ESTADUAL", "votos": {"2351179-51": {"voto": "Ausente", "partido": "PSOL", "bancada": "Sim", "alinhamento": null}, "2352476-149": {"voto": "Ausente", "partido": "PSOL", "bancada": "Não", "alinhamento": null}, "345311-270": {"voto": "Ausente", "partido": "PSOL", "bancada": "Não", "alinhamento": null}, "2358548-89": {"voto": "Não", "partido": "PSOL", "bancada": "Não", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Não", "partido": "PSOL", "bancada": "Não", "alinhamento": "com a bancada"}}}, {"nome": "Luizianne Lins", "uf": "CE", "raca2022": "BRANCA", "desfecho2026": "eleita para outro cargo", "cargo2026": "SENADOR", "votos": {"2351179-51": {"voto": "Sim", "partido": "PT", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Abstenção", "partido": "PT", "bancada": "Sim", "alinhamento": null}, "345311-270": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Ausente", "partido": "PT", "bancada": "Não", "alinhamento": null}}}, {"nome": "Lêda Borges", "uf": "GO", "raca2022": "BRANCA", "desfecho2026": "suplente", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "PSDB", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Sim", "partido": "PSDB", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Sim", "partido": "PSDB", "bancada": "Sim", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Sim", "partido": "PSDB", "bancada": "Sim", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Sim", "partido": "PSDB", "bancada": "dividida", "alinhamento": null}}}, {"nome": "Lídice da Mata", "uf": "BA", "raca2022": "PARDA", "desfecho2026": "suplente", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "PSB", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Sim", "partido": "PSB", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Não", "partido": "PSB", "bancada": "Não", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Não", "partido": "PSB", "bancada": "Não", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Não", "partido": "PSB", "bancada": "Sim", "alinhamento": "contra a bancada"}}}, {"nome": "Magda Mofatto", "uf": "GO", "raca2022": "BRANCA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Ausente", "partido": "PRD", "bancada": "Sim", "alinhamento": null}, "345311-270": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Sim", "partido": "PRD", "bancada": "Sim", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Sim", "partido": "PRD", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Maria Arraes", "uf": "PE", "raca2022": "BRANCA", "desfecho2026": "eleita para outro cargo", "cargo2026": "DEPUTADO ESTADUAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "SOLIDARIEDADE", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Sim", "partido": "SOLIDARIEDADE", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Não", "partido": "SOLIDARIEDADE", "bancada": "Não", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Não", "partido": "SOLIDARIEDADE", "bancada": "Sim", "alinhamento": "contra a bancada"}, "2270800-160": {"voto": "Não", "partido": "SOLIDARIEDADE", "bancada": "dividida", "alinhamento": null}}}, {"nome": "Maria Rosas", "uf": "SP", "raca2022": "PARDA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "REPUBLICANOS", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Sim", "partido": "REPUBLICANOS", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Sim", "partido": "REPUBLICANOS", "bancada": "Sim", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Sim", "partido": "REPUBLICANOS", "bancada": "Sim", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Sim", "partido": "REPUBLICANOS", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Maria do Rosário", "uf": "RS", "raca2022": "BRANCA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "PT", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Sim", "partido": "PT", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}}}, {"nome": "Marussa Boldrin", "uf": "GO", "raca2022": "BRANCA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "MDB", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Sim", "partido": "MDB", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Sim", "partido": "MDB", "bancada": "Sim", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Sim", "partido": "MDB", "bancada": "Sim", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Sim", "partido": "MDB", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Meire Serafim", "uf": "AC", "raca2022": "PARDA", "desfecho2026": "não concorreu", "cargo2026": null, "votos": {"2351179-51": {"voto": "Ausente", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": null}, "2352476-149": {"voto": "Sim", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Sim", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Não", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": "contra a bancada"}, "2270800-160": {"voto": "Sim", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Missionária Michele Collins", "uf": "PE", "raca2022": "PARDA", "desfecho2026": "suplente", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2352476-149": {"voto": "Sim", "partido": "PP", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Natália Bonavides", "uf": "RN", "raca2022": "BRANCA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Ausente", "partido": "PT", "bancada": "Sim", "alinhamento": null}, "2352476-149": {"voto": "Sim", "partido": "PT", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}}}, {"nome": "Nely Aquino", "uf": "MG", "raca2022": "PARDA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "PODE", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Sim", "partido": "PODE", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Sim", "partido": "PODE", "bancada": "Sim", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Sim", "partido": "PODE", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Professora Goreth", "uf": "AP", "raca2022": "BRANCA", "desfecho2026": "suplente", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "PDT", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Sim", "partido": "PDT", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Não", "partido": "PDT", "bancada": "Não", "alinhamento": "com a bancada"}}}, {"nome": "Professora Luciene Cavalcante", "uf": "SP", "raca2022": "BRANCA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "PSOL", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Não", "partido": "PSOL", "bancada": "Não", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Não", "partido": "PSOL", "bancada": "Não", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Não", "partido": "PSOL", "bancada": "Não", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Não", "partido": "PSOL", "bancada": "Não", "alinhamento": "com a bancada"}}}, {"nome": "Professora Marcivania", "uf": "AP", "raca2022": "PARDA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2358548-89": {"voto": "Não", "partido": "PCdoB", "bancada": "Não", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Não", "partido": "PCdoB", "bancada": "Não", "alinhamento": "com a bancada"}}}, {"nome": "Reginete Bispo", "uf": "RS", "raca2022": "PRETA", "desfecho2026": "suplente", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "PT", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Não", "partido": "PT", "bancada": "Sim", "alinhamento": "contra a bancada"}, "345311-270": {"voto": "Não", "partido": "PT", "bancada": "Não", "alinhamento": "com a bancada"}}}, {"nome": "Renata Abreu", "uf": "SP", "raca2022": "BRANCA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Ausente", "partido": "PODE", "bancada": "Sim", "alinhamento": null}, "345311-270": {"voto": "Sim", "partido": "PODE", "bancada": "Sim", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Sim", "partido": "PODE", "bancada": "Sim", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Sim", "partido": "PODE", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Renilce Nicodemos", "uf": "PA", "raca2022": "PARDA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "MDB", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Sim", "partido": "MDB", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Ausente", "partido": "MDB", "bancada": "Sim", "alinhamento": null}, "2358548-89": {"voto": "Ausente", "partido": "MDB", "bancada": "Sim", "alinhamento": null}, "2270800-160": {"voto": "Sim", "partido": "MDB", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Roberta Roma", "uf": "BA", "raca2022": "BRANCA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Ausente", "partido": "PL", "bancada": "Sim", "alinhamento": null}, "345311-270": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Rogéria Santos", "uf": "BA", "raca2022": "BRANCA", "desfecho2026": "suplente", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "REPUBLICANOS", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Sim", "partido": "REPUBLICANOS", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Sim", "partido": "REPUBLICANOS", "bancada": "Sim", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Sim", "partido": "REPUBLICANOS", "bancada": "Sim", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Sim", "partido": "REPUBLICANOS", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Rosana Valle", "uf": "SP", "raca2022": "BRANCA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Não", "partido": "PL", "bancada": "Sim", "alinhamento": "contra a bancada"}, "345311-270": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Rosangela Moro", "uf": "SP", "raca2022": "BRANCA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Não", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": "contra a bancada"}, "2352476-149": {"voto": "Não", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": "contra a bancada"}, "345311-270": {"voto": "Sim", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Sim", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Não", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": "contra a bancada"}}}, {"nome": "Roseana Sarney", "uf": "MA", "raca2022": "BRANCA", "desfecho2026": "não eleita", "cargo2026": "SENADOR", "votos": {"2351179-51": {"voto": "Ausente", "partido": "MDB", "bancada": "Sim", "alinhamento": null}, "345311-270": {"voto": "Ausente", "partido": "MDB", "bancada": "Sim", "alinhamento": null}}}, {"nome": "Rosângela Reis", "uf": "MG", "raca2022": "BRANCA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Silvia Cristina", "uf": "RO", "raca2022": "PRETA", "desfecho2026": "não eleita", "cargo2026": "SENADOR", "votos": {"2351179-51": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Ausente", "partido": "PP", "bancada": "Sim", "alinhamento": null}, "345311-270": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Sim", "partido": "PP", "bancada": "Sim", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Sim", "partido": "PP", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Silvia Waiãpi", "uf": "AP", "raca2022": "INDÍGENA", "desfecho2026": "não concorreu", "cargo2026": null, "votos": {"2351179-51": {"voto": "Não", "partido": "PL", "bancada": "Sim", "alinhamento": "contra a bancada"}, "2352476-149": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Silvye Alves", "uf": "GO", "raca2022": "PARDA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Ausente", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": null}, "2352476-149": {"voto": "Ausente", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": null}, "345311-270": {"voto": "Sim", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Sim", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Sim", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Simone Marquetto", "uf": "SP", "raca2022": "BRANCA", "desfecho2026": "não concorreu", "cargo2026": null, "votos": {"2351179-51": {"voto": "Sim", "partido": "MDB", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Sim", "partido": "MDB", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Sim", "partido": "MDB", "bancada": "Sim", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Sim", "partido": "MDB", "bancada": "Sim", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Sim", "partido": "MDB", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Socorro Neri", "uf": "AC", "raca2022": "BRANCA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "PP", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Sim", "partido": "PP", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Não", "partido": "PP", "bancada": "Sim", "alinhamento": "contra a bancada"}, "2358548-89": {"voto": "Não", "partido": "PP", "bancada": "Sim", "alinhamento": "contra a bancada"}, "2270800-160": {"voto": "Não", "partido": "PP", "bancada": "Sim", "alinhamento": "contra a bancada"}}}, {"nome": "Sonize Barbosa", "uf": "AP", "raca2022": "BRANCA", "desfecho2026": "não concorreu", "cargo2026": null, "votos": {"2351179-51": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Soraya Santos", "uf": "RJ", "raca2022": "BRANCA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Sim", "partido": "PL", "bancada": "Sim", "alinhamento": "com a bancada"}}}, {"nome": "Sâmia Bomfim", "uf": "SP", "raca2022": "BRANCA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "PSOL", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Não", "partido": "PSOL", "bancada": "Não", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Não", "partido": "PSOL", "bancada": "Não", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Não", "partido": "PSOL", "bancada": "Não", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Não", "partido": "PSOL", "bancada": "Não", "alinhamento": "com a bancada"}}}, {"nome": "Tabata Amaral", "uf": "SP", "raca2022": "BRANCA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "PSB", "bancada": "Sim", "alinhamento": "com a bancada"}, "2352476-149": {"voto": "Não", "partido": "PSB", "bancada": "Sim", "alinhamento": "contra a bancada"}, "345311-270": {"voto": "Não", "partido": "PSB", "bancada": "Não", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Não", "partido": "PSB", "bancada": "Não", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Não", "partido": "PSB", "bancada": "Sim", "alinhamento": "contra a bancada"}}}, {"nome": "Talíria Petrone", "uf": "RJ", "raca2022": "PRETA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Ausente", "partido": "PSOL", "bancada": "Sim", "alinhamento": null}, "2352476-149": {"voto": "Não", "partido": "PSOL", "bancada": "Não", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Não", "partido": "PSOL", "bancada": "Não", "alinhamento": "com a bancada"}, "2358548-89": {"voto": "Não", "partido": "PSOL", "bancada": "Não", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Não", "partido": "PSOL", "bancada": "Não", "alinhamento": "com a bancada"}}}, {"nome": "Yandra Moura", "uf": "SE", "raca2022": "BRANCA", "desfecho2026": "reeleita", "cargo2026": "DEPUTADO FEDERAL", "votos": {"2351179-51": {"voto": "Sim", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": "com a bancada"}, "345311-270": {"voto": "Ausente", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": null}, "2358548-89": {"voto": "Sim", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": "com a bancada"}, "2270800-160": {"voto": "Ausente", "partido": "UNIÃO", "bancada": "Sim", "alinhamento": null}}}] as Deputada[];
