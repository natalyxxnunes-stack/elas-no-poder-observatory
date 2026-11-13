import { DEPUTADAS, VOTACOES, type Deputada, type VotoTipo } from "@/data/votacoes-camara";

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
      rotulo: "votou contra a igualdade salarial",
      porque:
        "O voto Não rejeitava a lei que obriga salário igual para mulheres e homens na mesma função.",
    },
    {
      id: "2482078-57",
      contra: "Sim",
      rotulo: "votou para derrubar a norma do Conanda",
      porque:
        "O voto Sim sustava a resolução que regulamentava o atendimento a crianças e adolescentes vítimas de violência sexual, inclusive o acesso ao aborto nos casos previstos em lei.",
    },
  ];

export const ANTIGENERO_CRITERIO = {
  fato: "Entram as deputadas federais que, em pelo menos uma das duas votações nominais abaixo, votaram no sentido contrário ao direito em jogo. Os votos são os registrados pela Câmara dos Deputados.",
  interpretacao:
    "Chamamos de agenda antigênero o conjunto de propostas que restringe direitos ligados a gênero, como igualdade de salário e o atendimento a vítimas de violência sexual. O nome descreve a agenda; nenhuma deputada é rotulada por ele.",
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

/** as deputadas que entram pelo critério, lidas de votacoes-camara.ts */
export const ANTIGENERO_DEPUTADAS: DeputadaColecao[] = DEPUTADAS.filter((d) =>
  ANTIGENERO_VOTOS.some((v) => d.votos[v.id]?.voto === v.contra),
)
  .map((d) => {
    const ultimo = [...ANTIGENERO_VOTOS].reverse().find((v) => d.votos[v.id]);
    return {
      nome: d.nome,
      uf: d.uf,
      partido: ultimo ? d.votos[ultimo.id]!.partido : "",
      votos: ANTIGENERO_VOTOS.filter((v) => d.votos[v.id]?.voto === v.contra).map((v) => v.rotulo),
      desfecho: d.desfecho2026,
      cargo2026: d.cargo2026,
    };
  })
  .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));

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
  disseramNaoSerFeministas: 2,
};
export const ANTIGENERO_PEDIDO_ENVIADO_EM: string | null = null;
