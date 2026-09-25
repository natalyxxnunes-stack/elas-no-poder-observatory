export type AchadoBarra = { rotulo: string; valor: number };

export type Achado = {
  id: string;
  numero: string;
  data: string;
  titulo: string;
  texto: string;
  barras: AchadoBarra[];
  legenda: string;
  fonte: string;
  to: "/quem-sao-elas" | "/dinheiro" | "/historico";
  linkLabel: string;
};

export const ACHADOS: Achado[] = [
  {
    id: "quanto-mais-alto-mais-brancas",
    numero: "01",
    data: "2026-09-24",
    titulo: "A cor das candidatas muda com o cargo em disputa",
    texto: "Brancas são 46,8% das candidatas a deputada e 60,7% das candidatas a presidente, governadora e senadora. As pardas fazem o caminho inverso: 34,2% das candidatas a deputada e 22,4% nas candidaturas majoritárias. As pretas são 17,2% e 15,9%.",
    barras: [
      { rotulo: "Deputada", valor: 46.8 },
      { rotulo: "Majoritárias", valor: 60.7 },
    ],
    legenda: "Brancas entre as candidatas",
    fonte: "TSE, Candidaturas 2026 · base de 25/09/2026",
    to: "/quem-sao-elas",
    linkLabel: "Ver em Quem são elas",
  },
  {
    id: "vice-nao-titular",
    numero: "04",
    data: "2026-09-24",
    titulo: "Vice, não titular",
    texto: "Nos governos estaduais, mulheres são 35 das 201 candidaturas a governadora (17,4%) e 88 das 211 a vice (41,7%). Na Presidência, são 2 das 14 titulares e 6 das 14 vices.",
    barras: [
      { rotulo: "Governadora", valor: 17.4 },
      { rotulo: "Vice-governadora", valor: 41.7 },
    ],
    legenda: "Mulheres entre as candidaturas",
    fonte: "TSE, Candidaturas 2026 · base de 25/09/2026",
    to: "/quem-sao-elas",
    linkLabel: "Ver em Quem são elas",
  },
  {
    id: "candidatar-se-nao-e-eleger-se",
    numero: "05",
    data: "2026-09-24",
    titulo: "Candidatar-se não é eleger-se",
    texto: "Em 2022, 1 em cada 34 candidatas a deputada se elegeu. Entre os homens, 1 em cada 14.",
    barras: [
      {
        rotulo: "Candidatas eleitas",
        valor: 2.9,
      },
      {
        rotulo: "Candidatos eleitos",
        valor: 7.0,
      },
    ],
    legenda: "Taxa de eleição para deputada e deputado, 2022",
    fonte: "TSE, Candidatos 2022",
    to: "/historico",
    linkLabel: "Ver no Histórico",
  },
];

export const ACHADOS_RECENTES = [...ACHADOS].reverse().slice(0, 3);