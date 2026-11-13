/**
 * votacoes-camara — como votaram as deputadas federais em seis votações
 * nominais de mérito do plenário da Câmara (2023–2025), cruzado com o
 * resultado de 2026. CRAVADO em código.
 *
 * Fontes:
 *  - API de Dados Abertos da Câmara (dadosabertos.camara.leg.br/api/v2):
 *    /votacoes/{id}, /votacoes/{id}/votos, /deputados?dataInicio&dataFim
 *    (quem estava em exercício na data) e /deputados/{id} (sexo e CPF).
 *    Coleta em 27/10/2026; PDL 3/2025 em 28/10/2026.
 *  - TSE, Candidatos 2022 (cor/raça autodeclarada na eleição que deu o
 *    mandato), SHA-256 do zip
 *    6a3d25e925d6813c42c7e2d572ce1ae372a1cb7c0cdb57bcbf2d7d70a2862acb.
 *  - TSE, Candidatos 2026, base de 27/10/2026 19:30:36 (resultado de 2026).
 *  Junção por CPF. Scripts: scripts/investigacao/1_votacoes.py,
 *  2_deputados.py, 3_cruzamento.py e 6_site_votacoes.py.
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
 *  - placar recontado igual ao placar oficial nas seis votações;
 *  - o cruzamento com 2026 descreve; não mede efeito do voto na eleição.
 */

export const VOTACOES_META = {
  coletaEm: "27/10/2026 (PDL 3/2025: 28/10/2026)",
  correcao:
    "Correção em 28/10/2026: a votação do PDL 3/2025, de 05/11/2025, cumpria o critério e não estava na primeira versão desta reportagem. Ela foi incluída. Com isso, uma deputada a mais entra na conta de dinheiro e reeleição: no terço de maior receita, 33 de 39 deputadas se reelegeram (antes, 33 de 38). Em 04/11/2026, com a prestação final do 1º turno, a conta passou a 31 de 37.",
  pdl3Senado:
    "O PDL 3/2025 é a única das seis votações que já passou pelo Senado: foi aprovado em 02/06/2026, no mesmo dia na Comissão de Direitos Humanos e no plenário, sem votação nominal, e seguiu para promulgação. Até 28/10/2026, o decreto legislativo não aparece no Diário Oficial da União nem na base de normas do Senado; pelo próprio texto, a sustação vale a partir da publicação.",
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

export const DESFECHOS = [
  "reeleita",
  "eleita para outro cargo",
  "suplente",
  "não eleita",
  "não concorreu",
] as const;
export type Desfecho = (typeof DESFECHOS)[number];

export type VotoTipo =
  "Sim" | "Não" | "Abstenção" | "Obstrução" | "Ausente" | "Presidência da sessão";

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
  deputadasContraBancada: {
    nome: string;
    partido: string;
    uf: string;
    voto: string;
    maioriaBancada: string;
  }[];
};

export type Deputada = {
  nome: string;
  uf: string;
  raca2022: string;
  desfecho2026: Desfecho;
  cargo2026: string | null;
  votos: Record<
    string,
    { voto: VotoTipo; partido: string; bancada: string; alinhamento: string | null }
  >;
};

export const VOTACOES: Votacao[] = [
  {
    id: "2351179-51",
    bloco: "Mulheres",
    titulo: "Igualdade salarial entre mulheres e homens",
    proposicao: "PL 1.085/2023",
    etapa: "texto principal (subemenda substitutiva global)",
    sim: "a favor da lei de igualdade salarial e remuneratória entre mulheres e homens na mesma função",
    data: "2023-05-04",
    descricaoOficial:
      "Aprovada a Subemenda Substitutiva Global ao Projeto de Lei nº 1.085, de 2023, adotada pela relatora da Comissão de Defesa dos Direitos da Mulher, ressalvados os destaques. Sim: 325; não: 36; abstenção: 3; total: 364.",
    placar: {
      sim: 325,
      nao: 36,
      abstencao: 3,
    },
    emExercicio: 512,
    porSexo: {
      F: {
        total: 87,
        votos: {
          Não: 10,
          Sim: 60,
          Ausente: 17,
        },
        contraBancada: 9,
        comBancada: 61,
        desfechoPorVoto: {
          Não: {
            reeleita: 6,
            "eleita para outro cargo": 2,
            suplente: 0,
            "não eleita": 0,
            "não concorreu": 2,
          },
          Sim: {
            reeleita: 42,
            "eleita para outro cargo": 3,
            suplente: 9,
            "não eleita": 3,
            "não concorreu": 3,
          },
          Ausente: {
            reeleita: 8,
            "eleita para outro cargo": 1,
            suplente: 2,
            "não eleita": 5,
            "não concorreu": 1,
          },
        },
      },
      M: {
        total: 425,
        votos: {
          Sim: 265,
          Ausente: 130,
          Não: 26,
          Abstenção: 3,
          "Presidência da sessão": 1,
        },
        contraBancada: 24,
        comBancada: 267,
        desfechoPorVoto: {
          Sim: {
            reeleita: 151,
            "eleita para outro cargo": 6,
            suplente: 68,
            "não eleita": 16,
            "não concorreu": 21,
          },
          Ausente: {
            reeleita: 60,
            "eleita para outro cargo": 11,
            suplente: 23,
            "não eleita": 24,
            "não concorreu": 11,
          },
          Não: {
            reeleita: 18,
            "eleita para outro cargo": 3,
            suplente: 2,
            "não eleita": 1,
            "não concorreu": 1,
          },
        },
      },
    },
    racaDeputadas: {
      BRANCA: {
        Não: 9,
        Sim: 37,
        Ausente: 10,
      },
      PARDA: {
        Sim: 11,
        Ausente: 5,
      },
      PRETA: {
        Sim: 10,
        Ausente: 2,
      },
      INDÍGENA: {
        Sim: 2,
        Não: 1,
      },
    },
    deputadasContraBancada: [
      {
        nome: "Any Ortiz",
        partido: "CIDADANIA",
        uf: "RS",
        voto: "Não",
        maioriaBancada: "Sim",
      },
      {
        nome: "Bia Kicis",
        partido: "PL",
        uf: "DF",
        voto: "Não",
        maioriaBancada: "Sim",
      },
      {
        nome: "Carla Zambelli",
        partido: "PL",
        uf: "SP",
        voto: "Não",
        maioriaBancada: "Sim",
      },
      {
        nome: "Caroline de Toni",
        partido: "PL",
        uf: "SC",
        voto: "Não",
        maioriaBancada: "Sim",
      },
      {
        nome: "Chris Tonietto",
        partido: "PL",
        uf: "RJ",
        voto: "Não",
        maioriaBancada: "Sim",
      },
      {
        nome: "Dani Cunha",
        partido: "UNIÃO",
        uf: "RJ",
        voto: "Não",
        maioriaBancada: "Sim",
      },
      {
        nome: "Julia Zanatta",
        partido: "PL",
        uf: "SC",
        voto: "Não",
        maioriaBancada: "Sim",
      },
      {
        nome: "Rosangela Moro",
        partido: "UNIÃO",
        uf: "SP",
        voto: "Não",
        maioriaBancada: "Sim",
      },
      {
        nome: "Silvia Waiãpi",
        partido: "PL",
        uf: "AP",
        voto: "Não",
        maioriaBancada: "Sim",
      },
    ],
  },
  {
    id: "2352476-149",
    bloco: "Mulheres",
    titulo: "Anistia aos partidos que descumpriram as cotas",
    proposicao: "PEC 9/2023",
    etapa: "1º turno (substitutivo da comissão especial)",
    sim: "a favor da PEC que livra de punição os partidos que não destinaram o mínimo de recursos a candidaturas de mulheres e de pessoas negras em eleições passadas, abre um programa de regularização de dívidas dos partidos e cria um piso de 30% dos recursos para candidaturas pretas e pardas; o texto virou a Emenda Constitucional 133/2024",
    data: "2024-07-11",
    descricaoOficial:
      "Aprovado, em primeiro turno, o Substitutivo adotado pelo Relator da Comissão Especial à Proposta de Emenda à Constituição nº 9, de 2023, ressalvado o destaque. Sim: 344; não: 89; abstenção: 4; total: 437.",
    placar: {
      sim: 344,
      nao: 89,
      abstencao: 4,
    },
    emExercicio: 513,
    porSexo: {
      F: {
        total: 91,
        votos: {
          Não: 23,
          Sim: 55,
          Ausente: 12,
          Abstenção: 1,
        },
        contraBancada: 16,
        comBancada: 62,
        desfechoPorVoto: {
          Não: {
            reeleita: 14,
            "eleita para outro cargo": 3,
            suplente: 3,
            "não eleita": 2,
            "não concorreu": 1,
          },
          Sim: {
            reeleita: 29,
            "eleita para outro cargo": 2,
            suplente: 15,
            "não eleita": 4,
            "não concorreu": 5,
          },
          Ausente: {
            reeleita: 8,
            "eleita para outro cargo": 2,
            suplente: 0,
            "não eleita": 1,
            "não concorreu": 1,
          },
        },
      },
      M: {
        total: 422,
        votos: {
          Ausente: 63,
          Sim: 289,
          Não: 66,
          "Presidência da sessão": 1,
          Abstenção: 3,
        },
        contraBancada: 54,
        comBancada: 301,
        desfechoPorVoto: {
          Ausente: {
            reeleita: 26,
            "eleita para outro cargo": 8,
            suplente: 12,
            "não eleita": 2,
            "não concorreu": 14,
          },
          Sim: {
            reeleita: 163,
            "eleita para outro cargo": 5,
            suplente: 76,
            "não eleita": 25,
            "não concorreu": 17,
          },
          Não: {
            reeleita: 36,
            "eleita para outro cargo": 4,
            suplente: 11,
            "não eleita": 10,
            "não concorreu": 4,
          },
        },
      },
    },
    racaDeputadas: {
      BRANCA: {
        Não: 17,
        Sim: 31,
        Ausente: 7,
        Abstenção: 1,
      },
      PARDA: {
        Sim: 15,
        Ausente: 3,
        Não: 1,
      },
      PRETA: {
        Sim: 7,
        Não: 4,
        Ausente: 2,
      },
      INDÍGENA: {
        Não: 1,
        Sim: 2,
      },
    },
    deputadasContraBancada: [
      {
        nome: "Antônia Lúcia",
        partido: "REPUBLICANOS",
        uf: "AC",
        voto: "Não",
        maioriaBancada: "Sim",
      },
      {
        nome: "Bia Kicis",
        partido: "PL",
        uf: "DF",
        voto: "Não",
        maioriaBancada: "Sim",
      },
      {
        nome: "Carla Zambelli",
        partido: "PL",
        uf: "SP",
        voto: "Não",
        maioriaBancada: "Sim",
      },
      {
        nome: "Caroline de Toni",
        partido: "PL",
        uf: "SC",
        voto: "Não",
        maioriaBancada: "Sim",
      },
      {
        nome: "Chris Tonietto",
        partido: "PL",
        uf: "RJ",
        voto: "Não",
        maioriaBancada: "Sim",
      },
      {
        nome: "Daniela Reinehr",
        partido: "PL",
        uf: "SC",
        voto: "Não",
        maioriaBancada: "Sim",
      },
      {
        nome: "Dayany Bittencourt",
        partido: "UNIÃO",
        uf: "CE",
        voto: "Não",
        maioriaBancada: "Sim",
      },
      {
        nome: "Dra. Alessandra Haber",
        partido: "MDB",
        uf: "PA",
        voto: "Não",
        maioriaBancada: "Sim",
      },
      {
        nome: "Duda Salabert",
        partido: "PDT",
        uf: "MG",
        voto: "Não",
        maioriaBancada: "Sim",
      },
      {
        nome: "Erika Kokay",
        partido: "PT",
        uf: "DF",
        voto: "Não",
        maioriaBancada: "Sim",
      },
      {
        nome: "Gisela Simona",
        partido: "UNIÃO",
        uf: "MT",
        voto: "Não",
        maioriaBancada: "Sim",
      },
      {
        nome: "Julia Zanatta",
        partido: "PL",
        uf: "SC",
        voto: "Não",
        maioriaBancada: "Sim",
      },
      {
        nome: "Reginete Bispo",
        partido: "PT",
        uf: "RS",
        voto: "Não",
        maioriaBancada: "Sim",
      },
      {
        nome: "Rosana Valle",
        partido: "PL",
        uf: "SP",
        voto: "Não",
        maioriaBancada: "Sim",
      },
      {
        nome: "Rosangela Moro",
        partido: "UNIÃO",
        uf: "SP",
        voto: "Não",
        maioriaBancada: "Sim",
      },
      {
        nome: "Tabata Amaral",
        partido: "PSB",
        uf: "SP",
        voto: "Não",
        maioriaBancada: "Sim",
      },
    ],
  },
  {
    id: "345311-270",
    bloco: "Povos indígenas",
    titulo: "Marco temporal das terras indígenas",
    proposicao: "PL 490/2007",
    etapa: "texto principal (subemenda substitutiva global)",
    sim: "a favor de limitar a demarcação às terras ocupadas por povos indígenas em 5 de outubro de 1988",
    data: "2023-05-30",
    descricaoOficial:
      "Aprovada a Subemenda Substitutiva Global ao Projeto de Lei nº 490, de 2007, adotada pelo relator da Comissão de Constituição e Justiça e de Cidadania, ressalvados os destaques. Sim: 283; não: 155; abstenção: 1; total: 439.",
    placar: {
      sim: 283,
      nao: 155,
      abstencao: 1,
    },
    emExercicio: 514,
    porSexo: {
      F: {
        total: 88,
        votos: {
          Sim: 41,
          Não: 36,
          Ausente: 11,
        },
        contraBancada: 4,
        comBancada: 73,
        desfechoPorVoto: {
          Sim: {
            reeleita: 25,
            "eleita para outro cargo": 2,
            suplente: 6,
            "não eleita": 3,
            "não concorreu": 5,
          },
          Não: {
            reeleita: 25,
            "eleita para outro cargo": 2,
            suplente: 5,
            "não eleita": 4,
            "não concorreu": 0,
          },
          Ausente: {
            reeleita: 6,
            "eleita para outro cargo": 2,
            suplente: 0,
            "não eleita": 2,
            "não concorreu": 1,
          },
        },
      },
      M: {
        total: 426,
        votos: {
          Sim: 242,
          Ausente: 63,
          Não: 119,
          "Presidência da sessão": 1,
          Abstenção: 1,
        },
        contraBancada: 38,
        comBancada: 319,
        desfechoPorVoto: {
          Sim: {
            reeleita: 124,
            "eleita para outro cargo": 17,
            suplente: 50,
            "não eleita": 27,
            "não concorreu": 20,
          },
          Ausente: {
            reeleita: 39,
            "eleita para outro cargo": 2,
            suplente: 12,
            "não eleita": 4,
            "não concorreu": 5,
          },
          Não: {
            reeleita: 67,
            "eleita para outro cargo": 0,
            suplente: 33,
            "não eleita": 10,
            "não concorreu": 9,
          },
        },
      },
    },
    racaDeputadas: {
      BRANCA: {
        Sim: 31,
        Não: 20,
        Ausente: 6,
      },
      PARDA: {
        Não: 4,
        Ausente: 5,
        Sim: 7,
      },
      PRETA: {
        Não: 10,
        Sim: 2,
      },
      INDÍGENA: {
        Não: 2,
        Sim: 1,
      },
    },
    deputadasContraBancada: [
      {
        nome: "Helena Lima",
        partido: "MDB",
        uf: "RR",
        voto: "Não",
        maioriaBancada: "Sim",
      },
      {
        nome: "Iza Arruda",
        partido: "MDB",
        uf: "PE",
        voto: "Não",
        maioriaBancada: "Sim",
      },
      {
        nome: "Laura Carneiro",
        partido: "PSD",
        uf: "RJ",
        voto: "Não",
        maioriaBancada: "Sim",
      },
      {
        nome: "Socorro Neri",
        partido: "PP",
        uf: "AC",
        voto: "Não",
        maioriaBancada: "Sim",
      },
    ],
  },
  {
    id: "2358548-89",
    bloco: "Democracia",
    titulo: "Redução de penas do 8 de janeiro (dosimetria)",
    proposicao: "PL 2.162/2023",
    etapa: "substitutivo da comissão especial",
    sim: "a favor do texto que reduz as penas de condenados pelos atos de 8 de janeiro de 2023",
    data: "2025-12-10",
    descricaoOficial:
      "Aprovado o Substitutivo ao Projeto de Lei nº 2.162, de 2023, adotado pelo relator da Comissão Especial, ressalvados os destaques. Sim: 291; Não: 148; Abstenção: 1; Total: 440.",
    placar: {
      sim: 291,
      nao: 148,
      abstencao: 1,
    },
    emExercicio: 513,
    porSexo: {
      F: {
        total: 87,
        votos: {
          Sim: 40,
          Não: 37,
          Ausente: 10,
        },
        contraBancada: 7,
        comBancada: 70,
        desfechoPorVoto: {
          Sim: {
            reeleita: 27,
            "eleita para outro cargo": 3,
            suplente: 7,
            "não eleita": 2,
            "não concorreu": 1,
          },
          Não: {
            reeleita: 25,
            "eleita para outro cargo": 3,
            suplente: 5,
            "não eleita": 3,
            "não concorreu": 1,
          },
          Ausente: {
            reeleita: 3,
            "eleita para outro cargo": 2,
            suplente: 2,
            "não eleita": 2,
            "não concorreu": 1,
          },
        },
      },
      M: {
        total: 426,
        votos: {
          Sim: 251,
          Ausente: 62,
          Não: 111,
          "Presidência da sessão": 1,
          Abstenção: 1,
        },
        contraBancada: 26,
        comBancada: 336,
        desfechoPorVoto: {
          Sim: {
            reeleita: 132,
            "eleita para outro cargo": 16,
            suplente: 66,
            "não eleita": 24,
            "não concorreu": 10,
          },
          Ausente: {
            reeleita: 41,
            "eleita para outro cargo": 1,
            suplente: 7,
            "não eleita": 3,
            "não concorreu": 9,
          },
          Não: {
            reeleita: 58,
            "eleita para outro cargo": 2,
            suplente: 33,
            "não eleita": 13,
            "não concorreu": 5,
          },
        },
      },
    },
    racaDeputadas: {
      BRANCA: {
        Sim: 30,
        Não: 19,
        Ausente: 5,
      },
      PARDA: {
        Não: 6,
        Ausente: 5,
        Sim: 7,
      },
      PRETA: {
        Não: 10,
        Sim: 3,
      },
      INDÍGENA: {
        Não: 2,
      },
    },
    deputadasContraBancada: [
      {
        nome: "Daniela do Waguinho",
        partido: "UNIÃO",
        uf: "RJ",
        voto: "Não",
        maioriaBancada: "Sim",
      },
      {
        nome: "Flávia Morais",
        partido: "PDT",
        uf: "GO",
        voto: "Sim",
        maioriaBancada: "Não",
      },
      {
        nome: "Iza Arruda",
        partido: "MDB",
        uf: "PE",
        voto: "Não",
        maioriaBancada: "Sim",
      },
      {
        nome: "Laura Carneiro",
        partido: "PSD",
        uf: "RJ",
        voto: "Não",
        maioriaBancada: "Sim",
      },
      {
        nome: "Maria Arraes",
        partido: "SOLIDARIEDADE",
        uf: "PE",
        voto: "Não",
        maioriaBancada: "Sim",
      },
      {
        nome: "Meire Serafim",
        partido: "UNIÃO",
        uf: "AC",
        voto: "Não",
        maioriaBancada: "Sim",
      },
      {
        nome: "Socorro Neri",
        partido: "PP",
        uf: "AC",
        voto: "Não",
        maioriaBancada: "Sim",
      },
    ],
  },
  {
    id: "2270800-160",
    bloco: "Democracia",
    titulo: "PEC das prerrogativas parlamentares",
    proposicao: "PEC 3/2021",
    etapa: "2º turno",
    sim: "a favor da PEC que amplia a proteção de parlamentares contra processos e prisões",
    data: "2025-09-16",
    descricaoOficial:
      "Aprovada, em segundo turno, a Proposta de Emenda à Constituição n° 3, de 2021, ressalvado os destaques. Sim: 344; Não: 133; Total: 477.",
    placar: {
      sim: 344,
      nao: 133,
      abstencao: 0,
    },
    emExercicio: 512,
    porSexo: {
      F: {
        total: 88,
        votos: {
          Não: 36,
          Sim: 45,
          Ausente: 7,
        },
        contraBancada: 11,
        comBancada: 67,
        desfechoPorVoto: {
          Não: {
            reeleita: 26,
            "eleita para outro cargo": 2,
            suplente: 5,
            "não eleita": 3,
            "não concorreu": 0,
          },
          Sim: {
            reeleita: 27,
            "eleita para outro cargo": 5,
            suplente: 8,
            "não eleita": 3,
            "não concorreu": 2,
          },
          Ausente: {
            reeleita: 5,
            "eleita para outro cargo": 1,
            suplente: 0,
            "não eleita": 1,
            "não concorreu": 0,
          },
        },
      },
      M: {
        total: 424,
        votos: {
          Sim: 299,
          Não: 97,
          Ausente: 28,
        },
        contraBancada: 44,
        comBancada: 335,
        desfechoPorVoto: {
          Sim: {
            reeleita: 167,
            "eleita para outro cargo": 17,
            suplente: 72,
            "não eleita": 25,
            "não concorreu": 13,
          },
          Não: {
            reeleita: 52,
            "eleita para outro cargo": 1,
            suplente: 27,
            "não eleita": 12,
            "não concorreu": 5,
          },
          Ausente: {
            reeleita: 13,
            "eleita para outro cargo": 0,
            suplente: 7,
            "não eleita": 3,
            "não concorreu": 5,
          },
        },
      },
    },
    racaDeputadas: {
      BRANCA: {
        Não: 21,
        Sim: 28,
        Ausente: 5,
      },
      PARDA: {
        Não: 6,
        Sim: 13,
      },
      PRETA: {
        Não: 7,
        Ausente: 2,
        Sim: 4,
      },
      INDÍGENA: {
        Não: 2,
      },
    },
    deputadasContraBancada: [
      {
        nome: "Cristiane Lopes",
        partido: "UNIÃO",
        uf: "RO",
        voto: "Não",
        maioriaBancada: "Sim",
      },
      {
        nome: "Daniela do Waguinho",
        partido: "UNIÃO",
        uf: "RJ",
        voto: "Não",
        maioriaBancada: "Sim",
      },
      {
        nome: "Delegada Katarina",
        partido: "PSD",
        uf: "SE",
        voto: "Não",
        maioriaBancada: "Sim",
      },
      {
        nome: "Dilvanda Faro",
        partido: "PT",
        uf: "PA",
        voto: "Sim",
        maioriaBancada: "Não",
      },
      {
        nome: "Duda Salabert",
        partido: "PDT",
        uf: "MG",
        voto: "Não",
        maioriaBancada: "Sim",
      },
      {
        nome: "Flávia Morais",
        partido: "PDT",
        uf: "GO",
        voto: "Não",
        maioriaBancada: "Sim",
      },
      {
        nome: "Laura Carneiro",
        partido: "PSD",
        uf: "RJ",
        voto: "Não",
        maioriaBancada: "Sim",
      },
      {
        nome: "Lídice da Mata",
        partido: "PSB",
        uf: "BA",
        voto: "Não",
        maioriaBancada: "Sim",
      },
      {
        nome: "Rosangela Moro",
        partido: "UNIÃO",
        uf: "SP",
        voto: "Não",
        maioriaBancada: "Sim",
      },
      {
        nome: "Socorro Neri",
        partido: "PP",
        uf: "AC",
        voto: "Não",
        maioriaBancada: "Sim",
      },
      {
        nome: "Tabata Amaral",
        partido: "PSB",
        uf: "SP",
        voto: "Não",
        maioriaBancada: "Sim",
      },
    ],
  },
  {
    id: "2482078-57",
    bloco: "Mulheres",
    titulo: "Derrubada da norma do Conanda sobre vítimas de violência sexual",
    proposicao: "PDL 3/2025",
    etapa: "texto principal",
    sim: "a favor de sustar a Resolução 258/2024 do Conanda, que regulamentava o atendimento a crianças e adolescentes vítimas de violência sexual, inclusive o acesso ao aborto nos casos previstos em lei",
    data: "2025-11-05",
    descricaoOficial:
      "Aprovado o Projeto de Decreto Legislativo nº 3, de 2025. Sim: 317; Não: 111; Abstenção: 1; Total: 429.",
    placar: { sim: 317, nao: 111, abstencao: 1 },
    emExercicio: 513,
    porSexo: {
      F: {
        total: 90,
        votos: { Sim: 39, Não: 34, Ausente: 17 },
        contraBancada: 4,
        comBancada: 69,
        desfechoPorVoto: {
          Sim: {
            reeleita: 25,
            "eleita para outro cargo": 3,
            suplente: 7,
            "não eleita": 3,
            "não concorreu": 1,
          },
          Não: {
            reeleita: 23,
            "eleita para outro cargo": 4,
            suplente: 3,
            "não eleita": 4,
            "não concorreu": 0,
          },
          Ausente: {
            reeleita: 9,
            "eleita para outro cargo": 1,
            suplente: 5,
            "não eleita": 0,
            "não concorreu": 2,
          },
        },
      },
      M: {
        total: 423,
        votos: { Sim: 278, Ausente: 66, Não: 77, Abstenção: 1, "Presidência da sessão": 1 },
        contraBancada: 18,
        comBancada: 337,
        desfechoPorVoto: {
          Sim: {
            reeleita: 155,
            "eleita para outro cargo": 15,
            suplente: 71,
            "não eleita": 22,
            "não concorreu": 11,
          },
          Ausente: {
            reeleita: 33,
            "eleita para outro cargo": 2,
            suplente: 11,
            "não eleita": 11,
            "não concorreu": 9,
          },
          Não: {
            reeleita: 41,
            "eleita para outro cargo": 1,
            suplente: 24,
            "não eleita": 7,
            "não concorreu": 4,
          },
        },
      },
    },
    racaDeputadas: {
      BRANCA: { Sim: 28, Não: 18, Ausente: 9 },
      PARDA: { Não: 3, Ausente: 7, Sim: 9 },
      PRETA: { Não: 11, Sim: 2, Ausente: 1 },
      INDÍGENA: { Não: 2 },
    },
    deputadasContraBancada: [
      { nome: "Duda Salabert", partido: "PDT", uf: "MG", voto: "Não", maioriaBancada: "Sim" },
      { nome: "Elcione Barbalho", partido: "MDB", uf: "PA", voto: "Não", maioriaBancada: "Sim" },
      { nome: "Gisela Simona", partido: "UNIÃO", uf: "MT", voto: "Não", maioriaBancada: "Sim" },
      {
        nome: "Maria Arraes",
        partido: "SOLIDARIEDADE",
        uf: "PE",
        voto: "Não",
        maioriaBancada: "Sim",
      },
    ],
  },
] as Votacao[];

/**
 * Dinheiro de campanha × reeleição (scripts/investigacao/4_dinheiro_reeleicao.py).
 * Universo: quem estava no mandato em alguma das seis datas e se candidatou a
 * deputado federal em 2026 (junção por CPF): 83 mulheres e 389 homens.
 * Receita: prestação final do 1º turno de 2026, base de 04/11/2026.
 * Terços calculados sobre o universo inteiro, mesma régua para os dois grupos.
 * Conferência: sem as candidaturas que ainda só entregaram a prestação parcial
 * (receita até 08/09), o padrão se mantém (mulheres: 3 de 13, 18 de 21 e 23 de 27).
 */
export const DINHEIRO_REELEICAO = {
  /** prestação final do 1º turno, base do TSE de 04/11/2026 (anterior: 27/10/2026, no histórico) */
  base: "04/11/2026",
  universo: 472,
  cortes: { t1: 2210408.24, t2: 2962481.0 },
  faixas: ["terço de menor receita", "terço do meio", "terço de maior receita"] as const,
  F: {
    tentaram: 83,
    reeleitos: 58,
    medianaReeleitos: 2992767.71,
    medianaNaoReeleitos: 2201528.49,
    porFaixa: {
      "terço de menor receita": { total: 17, eleitos: 4 },
      "terço do meio": { total: 29, eleitos: 23 },
      "terço de maior receita": { total: 37, eleitos: 31 },
    },
    prestacao: { FINAL: 83 },
  },
  M: {
    tentaram: 389,
    reeleitos: 245,
    medianaReeleitos: 2778757.49,
    medianaNaoReeleitos: 2238403.51,
    porFaixa: {
      "terço de menor receita": { total: 140, eleitos: 70 },
      "terço do meio": { total: 128, eleitos: 82 },
      "terço de maior receita": { total: 121, eleitos: 93 },
    },
    prestacao: { FINAL: 384, "RELATÓRIO FINANCEIRO": 4, "sem receita declarada": 1 },
  },
} as const;
