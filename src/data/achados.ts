export type AchadoBarra = { rotulo: string; valor: number };

export type Achado = {
  id: string;
  numero: string;
  /** data em que o achado foi publicado */
  data: string;
  /** data em que os números foram refeitos com base mais nova, quando houve */
  atualizadoEm?: string;
  titulo: string;
  texto: string;
  barras: AchadoBarra[];
  legenda: string;
  fonte: string;
  to:
    | "/quem-sao-elas"
    | "/dinheiro"
    | "/historico"
    | "/quem-chega"
    | "/como-votaram"
    | "/barreiras"
    | "/direitos";
  linkLabel: string;
  /** número em destaque e o que ele conta (30/10/2026, redesenho de Achados) */
  ancora?: { valor: string; rotulo: string };
  /** rótulo da única barra que leva laranja; as demais ficam em roxo */
  foco?: string;
  /** fim da escala das barras, em %, quando 0–100 esmaga a diferença */
  escala?: number;
  /** barras em número absoluto (contagem), e não em % (13/11/2026) */
  contagem?: boolean;
  tema?: TemaAchado;
};

export type TemaAchado =
  | "poder"
  | "dinheiro"
  | "cor-raca"
  | "vices"
  | "serie"
  | "agenda"
  | "violencia"
  | "memoria";

export const TEMAS_ACHADOS: { id: TemaAchado; titulo: string; linha: string }[] = [
  {
    id: "poder",
    titulo: "Quem manda a partir de 2027",
    linha: "Senado, governos e as cadeiras que viraram poder.",
  },
  {
    id: "dinheiro",
    titulo: "O dinheiro da campanha",
    linha: "Para quem foi o fundo eleitoral e o que ele comprou.",
  },
  {
    id: "cor-raca",
    titulo: "Cor e raça",
    linha: "Quais mulheres chegam, e quais ficam pelo caminho.",
  },
  {
    id: "vices",
    titulo: "Vice e suplência",
    linha: "Onde as mulheres aparecem quando não encabeçam a chapa.",
  },
  {
    id: "serie",
    titulo: "A série desde 2014",
    linha: "O que mudou em relação às eleições anteriores.",
  },
  {
    id: "agenda",
    titulo: "O que fazem com o mandato",
    linha: "Como as deputadas votaram, e com quem.",
  },
  {
    id: "violencia",
    titulo: "Violência política",
    linha: "O que barra o caminho, nos processos da Justiça Eleitoral.",
  },
  {
    id: "memoria",
    titulo: "Memória",
    linha: "Quanto tempo cada direito levou para chegar.",
  },
];

export const ACHADOS: Achado[] = [
  {
    id: "quanto-mais-alto-mais-brancas",
    ancora: {
      valor: "60,7%",
      rotulo:
        "das candidatas a presidente, governadora e senadora são brancas; entre as candidatas a deputada, 46,8%",
    },
    tema: "cor-raca",
    foco: "Majoritárias",
    numero: "01",
    data: "2026-09-25",
    titulo: "A cor das candidatas muda com o cargo em disputa",
    texto:
      "Brancas são 46,8% das candidatas a deputada e 60,7% das candidatas a presidente, governadora e senadora. As pardas fazem o caminho inverso: 34,2% das candidatas a deputada e 22,4% nas candidaturas majoritárias. As pretas são 17,2% e 15,9%.",
    barras: [
      { rotulo: "Deputada", valor: 46.8 },
      { rotulo: "Majoritárias", valor: 60.7 },
    ],
    legenda: "Brancas entre as candidatas",
    fonte: "TSE, Candidaturas 2026 · base de 27/10/2026 (números iguais aos de 25/09)",
    atualizadoEm: "2026-10-28",
    to: "/quem-sao-elas",
    linkLabel: "Ver em Quem são elas",
  },
  {
    id: "dinheiro-brancas-peso",
    ancora: {
      valor: "56,2%",
      rotulo: "do dinheiro das candidatas a deputada foi para as brancas, que eram 46,9% delas",
    },
    tema: "dinheiro",
    foco: "Brancas · receita",
    numero: "02",
    data: "2026-09-25",
    titulo: "No dinheiro, as candidatas brancas ficam com mais do que o seu peso",
    texto:
      "Nas listas para deputada, brancas são 46,9% das candidatas com receita declarada e ficam com 56,1% do dinheiro das mulheres. Pardas são 34,1% e ficam com 27,7%; pretas, 17,3% e 14,2%. Em 25/09, eram 47,0% e 55,7%: a distância cresceu na reta final da campanha e se manteve na prestação final.",
    barras: [
      { rotulo: "Brancas · candidatas", valor: 46.9 },
      { rotulo: "Brancas · receita", valor: 56.1 },
      { rotulo: "Pardas · candidatas", valor: 34.1 },
      { rotulo: "Pardas · receita", valor: 27.7 },
      { rotulo: "Pretas · candidatas", valor: 17.3 },
      { rotulo: "Pretas · receita", valor: 14.2 },
    ],
    legenda: "Candidatas a deputada com receita declarada",
    fonte:
      "TSE, Candidaturas e Prestação de Contas 2026 · prestação final do 1º turno, base de 04/11/2026",
    atualizadoEm: "2026-11-04",
    to: "/dinheiro",
    linkLabel: "Ver em Dinheiro",
  },
  {
    id: "vice-desde-2014",
    ancora: {
      valor: "41,7%",
      rotulo: "das candidaturas a vice-governadora são de mulheres; a governadora, 17,4%",
    },
    tema: "vices",
    foco: "Vice 2026",
    numero: "03",
    data: "2026-09-25",
    titulo: "Desde 2014, mulheres aparecem mais entre as vices do que entre as titulares",
    texto:
      "Em 2014, mulheres eram 11,4% das candidaturas a governadora e 25,3% das candidaturas a vice. Em 2026, são 17,4% e 41,7%. A distância entre titular e vice cresceu de 14 para 24 pontos percentuais. Correção em 28/10/2026: a versão anterior incluía as eleições suplementares de 2014 e dizia 12,0%, 24,0% e que a distância tinha dobrado.",
    barras: [
      { rotulo: "Governadora 2014", valor: 11.4 },
      { rotulo: "Vice 2014", valor: 25.3 },
      { rotulo: "Governadora 2026", valor: 17.4 },
      { rotulo: "Vice 2026", valor: 41.7 },
    ],
    legenda: "Mulheres entre as candidaturas a governo",
    fonte: "TSE, Candidatos 2014 e 2026 · só eleições gerais",
    atualizadoEm: "2026-10-28",
    to: "/quem-sao-elas",
    linkLabel: "Ver em Quem são elas",
  },
  {
    id: "vice-nao-titular",
    ancora: {
      valor: "6 de 14",
      rotulo: "candidaturas a vice-presidente eram de mulheres; a presidente, 2 de 14",
    },
    tema: "vices",
    foco: "Vice-governadora",
    numero: "04",
    data: "2026-09-25",
    titulo: "Vice, não titular",
    texto:
      "Nos governos estaduais, mulheres são 35 das 201 candidaturas a governadora (17,4%) e 88 das 211 a vice (41,7%). Na Presidência, são 2 das 14 titulares e 6 das 14 vices.",
    barras: [
      { rotulo: "Governadora", valor: 17.4 },
      { rotulo: "Vice-governadora", valor: 41.7 },
    ],
    legenda: "Mulheres entre as candidaturas",
    fonte: "TSE, Candidaturas 2026 · base de 27/10/2026 (números iguais aos de 25/09)",
    atualizadoEm: "2026-10-28",
    to: "/quem-sao-elas",
    linkLabel: "Ver em Quem são elas",
  },
  {
    id: "candidatar-se-nao-e-eleger-se",
    ancora: {
      valor: "1 em 21",
      rotulo: "candidatas a deputada se elegeu em 2026; entre os homens, 1 em 10",
    },
    tema: "serie",
    foco: "Candidatas 2026",
    escala: 12,
    numero: "05",
    data: "2026-09-25",
    titulo: "Candidatar-se não é eleger-se",
    texto:
      "Em 2026, 1 em cada 21 candidatas a deputada se elegeu. Entre os homens, 1 em cada 10. Em 2022, eram 1 em 34 e 1 em 14. As duas taxas subiram, em parte porque houve menos candidaturas para as mesmas 1.572 cadeiras. A distância entre mulheres e homens continua: eles se elegem duas vezes mais.",
    barras: [
      { rotulo: "Candidatas 2022", valor: 2.9 },
      { rotulo: "Candidatos 2022", valor: 7.0 },
      { rotulo: "Candidatas 2026", valor: 4.7 },
      { rotulo: "Candidatos 2026", valor: 9.9 },
    ],
    legenda: "Taxa de eleição para deputada e deputado (eleitas ÷ candidaturas do mesmo gênero)",
    fonte: "TSE, Candidatos 2022 e 2026 · base de 27/10/2026",
    atualizadoEm: "2026-10-28",
    to: "/historico",
    linkLabel: "Ver no Histórico",
  },
  {
    id: "menos-candidatas-que-2022",
    ancora: { valor: "2.579", rotulo: "candidaturas de mulheres a deputada a menos que em 2022" },
    tema: "serie",
    foco: "Queda nas candidaturas de mulheres",
    escala: 40,
    numero: "06",
    data: "2026-09-25",
    titulo: "2.579 candidatas a menos que em 2022",
    texto:
      "Os registros de candidaturas para deputada e deputado caíram 30% em relação a 2022, em todos os estados. As candidaturas de mulheres caíram 27%, e as de homens, 32%. A participação feminina subiu porque as candidaturas de homens caíram mais.",
    barras: [
      { rotulo: "Queda nas candidaturas de mulheres", valor: 27.1 },
      { rotulo: "Queda nas candidaturas de homens", valor: 31.7 },
    ],
    legenda: "Pedidos de registro para deputada e deputado, 2022 × 2026",
    fonte:
      "TSE, Candidatos 2022 e 2026 (base de 27/10/2026) · pedidos de registro. Em 2022, 9,6% terminaram inaptos; em 2026, 7,1% saíram por indeferimento, cancelamento ou renúncia",
    atualizadoEm: "2026-10-28",
    to: "/historico",
    linkLabel: "Ver no Histórico",
  },
  {
    id: "vice-de-quem",
    ancora: {
      valor: "30,4%",
      rotulo: "das primeiras suplências ao Senado são de mulheres; a senadora, 22,4%",
    },
    tema: "vices",
    foco: "Vice-governadora",
    numero: "07",
    data: "2026-09-25",
    titulo: "Vice e suplência concentram mais mulheres do que as chapas titulares",
    texto:
      "Na base de 27/10, igual à de 25/09 nesse recorte, mulheres são 41,7% das candidaturas a vice-governadora e 17,4% das candidaturas a governadora. No Senado, são 30,4% das primeiras suplências e 22,4% das candidaturas a senadora. O snapshot atual não registra o sexo da cabeça da chapa, então não afirmamos aqui quantas vices ou suplentes estão em chapas encabeçadas por homens.",
    barras: [
      { rotulo: "Vice-governadora", valor: 41.7 },
      { rotulo: "Governadora", valor: 17.4 },
    ],
    legenda: "Mulheres entre as candidaturas a governo e vice-governo",
    fonte:
      "TSE, Candidaturas 2026 · base de 27/10/2026. Com substituição, vale o registro mais recente",
    atualizadoEm: "2026-10-28",
    to: "/quem-sao-elas",
    linkLabel: "Ver em Quem são elas",
  },
  {
    id: "pretas-sozinhas",
    ancora: {
      valor: "0",
      rotulo:
        "eleitas entre as 17 mulheres pretas candidatas a presidente, governadora ou senadora",
    },
    tema: "cor-raca",
    numero: "08",
    data: "2026-09-25",
    titulo: "Candidatas pretas ao comando: um recorte que pede contexto",
    texto:
      "Foram 17 mulheres pretas candidatas a presidente, governadora ou senadora em 2026, todas com registro deferido. Nenhuma se elegeu: as 3 governadoras e as 12 senadoras eleitas são brancas ou pardas. A base não traz, de forma auditável, os campos necessários para atribuir diferenças entre essas candidaturas a partido, federação ou coligação.",
    barras: [],
    legenda: "Base de 17 candidaturas: só números absolutos",
    fonte: "TSE, Candidaturas 2026 e resultado final · base de 27/10/2026",
    atualizadoEm: "2026-10-28",
    to: "/quem-chega",
    linkLabel: "Ver em Quem chega",
  },
  {
    id: "governadoras-brancas",
    ancora: {
      valor: "3 de 27",
      rotulo: "estados terão governadora a partir de 2027, e as três são brancas",
    },
    tema: "poder",
    numero: "09",
    data: "2026-10-28",
    titulo: "Três governadoras em 27 estados, as três brancas",
    texto:
      "Depois do 2º turno, mulheres governam 3 das 27 unidades da federação: Pernambuco, Acre e Distrito Federal. As três se declaram brancas. Quatro mulheres chegaram ao 2º turno; duas venceram. A Presidência segue sem mulher eleita.",
    barras: [],
    legenda: "Base de 27 governos: só números absolutos",
    fonte: "TSE, Candidatos 2026, resultado final · base de 27/10/2026",
    to: "/quem-chega",
    linkLabel: "Ver em Quem chega",
  },
  {
    id: "fundo-eleitoral-cor",
    ancora: {
      valor: "65,4%",
      rotulo: "do fundo eleitoral foi para candidaturas brancas, que eram 50,1% das titulares",
    },
    tema: "dinheiro",
    foco: "Brancas · fundo",
    numero: "10",
    data: "2026-10-28",
    titulo: "O fundo eleitoral foi mais para candidaturas brancas",
    texto:
      "Candidaturas brancas são 50,1% das candidaturas titulares de 2026 e ficaram com 65,4% do fundo eleitoral que chegou às campanhas. Pardas são 34,9% e ficaram com 25,2%; pretas, 13,6% e 8,2%. Para as mulheres, o fundo ficou perto da presença: 35,2% das candidaturas, 33,2% do dinheiro.",
    barras: [
      { rotulo: "Brancas · candidaturas", valor: 50.1 },
      { rotulo: "Brancas · fundo", valor: 65.4 },
      { rotulo: "Pardas · candidaturas", valor: 34.9 },
      { rotulo: "Pardas · fundo", valor: 25.2 },
      { rotulo: "Pretas · candidaturas", valor: 13.6 },
      { rotulo: "Pretas · fundo", valor: 8.2 },
    ],
    legenda:
      "Todas as candidaturas titulares, de deputado à Presidência, e o Fundo Especial que chegou a elas. Só deputado, a fatia branca é 60,8% (ver Dinheiro)",
    fonte:
      "TSE, Candidaturas e Prestação de Contas 2026 · prestação final do 1º turno, base de 04/11/2026",
    to: "/dinheiro",
    linkLabel: "Ver em Dinheiro",
  },
  {
    id: "dinheiro-reeleicao",
    ancora: {
      valor: "31 de 37",
      rotulo:
        "deputadas do terço de maior receita se reelegeram; no terço de menor receita, 4 de 17",
    },
    tema: "dinheiro",
    foco: "Mulheres · mais receita",
    numero: "11",
    data: "2026-10-28",
    titulo: "Entre as deputadas que tentaram voltar, as de maior receita voltaram mais",
    texto:
      "No terço de maior receita de campanha, 31 de 37 deputadas se reelegeram. No terço de menor receita, 4 de 17. Entre os homens, a diferença é menor: 76,9% e 50,0%. O voto em seis pautas da Câmara separou bem menos: a reeleição das deputadas variou entre 52,7% e 72,2%. A relação pode correr nos dois sentidos: quem já tinha chance de vencer também atrai mais dinheiro.",
    barras: [
      { rotulo: "Mulheres · mais receita", valor: 83.8 },
      { rotulo: "Mulheres · menos receita", valor: 23.5 },
      { rotulo: "Homens · mais receita", valor: 76.9 },
      { rotulo: "Homens · menos receita", valor: 50.0 },
    ],
    legenda: "Reeleição à Câmara por terço de receita, 2026",
    fonte:
      "Câmara dos Deputados; TSE, Candidatos e Prestação de Contas 2026 · prestação final do 1º turno, base de 04/11/2026",
    to: "/como-votaram",
    linkLabel: "Ver em Como votaram",
  },
  {
    id: "senado-pl-um-terco",
    ancora: {
      valor: "28 de 81",
      rotulo: "cadeiras do Senado serão do PL a partir de 2027, contra 15 hoje",
    },
    tema: "poder",
    foco: "PL 2027",
    numero: "12",
    data: "2026-10-28",
    atualizadoEm: "2026-11-13",
    titulo: "O PL terá mais de um terço do Senado a partir de 2027",
    texto:
      "O PL ganhou 19 das 54 vagas do Senado em 2026. Com as 9 cadeiras que terá até 2031, contando o suplente que assume a vaga de Cleitinho, eleito governador de MG, deve começar 2027 com 28 das 81, contra 15 hoje. Um terço do Senado (27) é o número de assinaturas que a Constituição exige para criar uma CPI ou apresentar uma emenda constitucional: o PL passa dessa marca sozinho. As senadoras passam de 15 para 19; 3 delas são do PL. Correção em 13/11/2026: a primeira versão dizia 27.",
    barras: [
      { rotulo: "PL hoje", valor: 18.5 },
      { rotulo: "PL 2027", valor: 34.6 },
      { rotulo: "Mulheres hoje", valor: 18.5 },
      { rotulo: "Mulheres 2027", valor: 23.5 },
    ],
    legenda: "Fatia das 81 cadeiras do Senado",
    fonte:
      "TSE, Candidatos 2026 · base de 27/10/2026 (governadores: base de 12/11/2026); Senado Federal, Dados Abertos, consulta de 28/10/2026",
    to: "/quem-chega",
    linkLabel: "Ver em Quem chega",
  },
  {
    id: "pretas-eleitas-tres-partidos",
    ancora: {
      valor: "39 de 41",
      rotulo: "deputadas pretas eleitas em 2026 são do PT, do PSOL ou do PCdoB",
    },
    tema: "cor-raca",
    numero: "13",
    data: "2026-11-13",
    titulo: "As deputadas pretas eleitas vêm de três partidos",
    texto:
      "Em 2026, 41 mulheres pretas foram eleitas deputadas federais, estaduais ou distritais: 21 pelo PT, 14 pelo PSOL e 4 pelo PCdoB. As outras 2 são do PP e do PSD. O PL, segundo partido que mais elegeu deputadas (65, atrás das 70 do PT), não elegeu nenhuma preta: são 58 brancas, 6 pardas e 1 indígena. Quem monta a lista e divide o fundo de cada campanha é a direção de cada partido; o dado mostra em quais legendas a candidatura preta virou cadeira.",
    barras: [
      { rotulo: "PT", valor: 21 },
      { rotulo: "PSOL", valor: 14 },
      { rotulo: "PCdoB", valor: 4 },
      { rotulo: "Outros partidos", valor: 2 },
    ],
    contagem: true,
    escala: 25,
    legenda: "Deputadas pretas eleitas por partido, 2026",
    fonte:
      "TSE, Candidatos 2026 · base de 27/10/2026, resultado das 1.572 cadeiras de deputado federal, estadual e distrital",
    to: "/quem-chega",
    linkLabel: "Ver em Quem chega",
  },
  {
    id: "anistia-cotas-deputadas",
    ancora: {
      valor: "55 de 91",
      rotulo:
        "deputadas votaram a favor da PEC que livrou de punição os partidos que não cumpriram a cota de recursos",
    },
    tema: "agenda",
    foco: "Mulheres",
    numero: "14",
    data: "2026-11-13",
    titulo: "A maioria das deputadas votou pelo perdão aos partidos que descumpriram a cota",
    texto:
      "Em 11/07/2024, a Câmara votou em 1º turno a PEC 9/2023. O texto livrou de punição os partidos que não destinaram o mínimo de recursos a candidaturas de mulheres e de pessoas negras em eleições passadas e, junto, criou um piso de 30% do fundo para candidaturas pretas e pardas. Das 91 deputadas em exercício, 55 votaram Sim, 23 Não, 12 não votaram e 1 se absteve. Entre quem votou Sim ou Não, 70,5% das deputadas e 81,4% dos deputados disseram Sim. Foi a votação, entre as seis acompanhadas, em que mais deputadas contrariaram a maioria do próprio partido: 16. O texto virou a Emenda Constitucional 133/2024.",
    barras: [
      { rotulo: "Mulheres", valor: 70.5 },
      { rotulo: "Homens", valor: 81.4 },
    ],
    legenda: "Votos Sim na PEC 9/2023, entre quem votou Sim ou Não",
    fonte: "Câmara dos Deputados, Dados Abertos, votação 2352476-149 · coleta de 27/10/2026",
    to: "/como-votaram",
    linkLabel: "Ver em No plenário",
  },
  {
    id: "deputadas-votam-com-o-partido",
    ancora: {
      valor: "4 de 73",
      rotulo: "deputadas votaram contra a maioria do próprio partido na derrubada da norma do Conanda",
    },
    tema: "agenda",
    foco: "Conanda (2025)",
    numero: "15",
    data: "2026-11-13",
    titulo: "As deputadas votam diferente dos homens, e igual aos seus partidos",
    texto:
      "Nas seis votações acompanhadas pelo observatório, a fatia de Sim entre as deputadas foi sempre menor que entre os deputados. Na votação que sustou a norma do Conanda sobre o atendimento a crianças e adolescentes vítimas de violência sexual (05/11/2025), foram 53,4% contra 78,3%. A diferença vem de onde elas estão: das 73 deputadas que votaram, só 4 contrariaram a maioria do próprio partido. Nas seis votações, esse número ficou entre 4 e 16. Mais mulheres eleitas muda o plenário na medida em que muda a composição dos partidos.",
    barras: [
      { rotulo: "Igualdade salarial (2023)", valor: 12.9 },
      { rotulo: "Anistia às cotas (2024)", valor: 20.5 },
      { rotulo: "Marco temporal (2023)", valor: 5.2 },
      { rotulo: "Penas do 8 de janeiro (2025)", valor: 9.1 },
      { rotulo: "PEC das prerrogativas (2025)", valor: 14.1 },
      { rotulo: "Conanda (2025)", valor: 5.5 },
    ],
    escala: 25,
    legenda:
      "Deputadas que votaram contra a maioria do próprio partido, entre as que votaram e tinham maioria definida na bancada",
    fonte: "Câmara dos Deputados, Dados Abertos, seis votações nominais de mérito · coleta de 27 e 28/10/2026",
    to: "/como-votaram",
    linkLabel: "Ver em No plenário",
  },
  {
    id: "violencia-politica-processos",
    ancora: {
      valor: "224",
      rotulo: "processos de violência política de gênero autuados na Justiça Eleitoral em 2026, até 23/10",
    },
    tema: "violencia",
    foco: "2026",
    numero: "16",
    data: "2026-11-13",
    titulo: "Os processos de violência política de gênero quase dobraram em 2026",
    texto:
      "A violência política de gênero virou crime eleitoral em 2021 (Lei 14.192). Os processos autuados na Justiça Eleitoral foram 15 em 2022, 23 em 2023, 78 em 2024, 118 em 2025 e 224 em 2026, até a extração de 23/10. O painel registra 2 em 2019 e não mostra 2020 nem 2021. Processo é diferente de caso: um mesmo episódio pode gerar inquérito, representação e ação penal. O crescimento pode vir de mais violência, de mais denúncia ou das duas coisas; o painel não separa.",
    barras: [
      { rotulo: "2019", valor: 2 },
      { rotulo: "2022", valor: 15 },
      { rotulo: "2023", valor: 23 },
      { rotulo: "2024", valor: 78 },
      { rotulo: "2025", valor: 118 },
      { rotulo: "2026", valor: 224 },
    ],
    contagem: true,
    escala: 250,
    legenda: "Processos autuados por ano (2020 e 2021 não aparecem no painel)",
    fonte:
      "TSE e MPF, painel Violência Política de Gênero, aba Justiça Eleitoral, todas as instâncias · dados extraídos em 23/10/2026, lidos em 28/10/2026",
    to: "/barreiras",
    linkLabel: "Ver em Barreiras",
  },
  {
    id: "memoria-49-anos",
    ancora: {
      valor: "49 anos",
      rotulo: "sem nenhum marco nos direitos políticos das mulheres, de 1946 a 1995",
    },
    tema: "memoria",
    foco: "1946 a 1995",
    numero: "17",
    data: "2026-11-13",
    titulo: "Entre o voto obrigatório e a primeira cota, 49 anos",
    texto:
      "A linha do tempo do observatório tem 13 marcos dos direitos políticos das mulheres desde 1932. A Constituição de 1946 igualou a obrigação de votar entre homens e mulheres alfabetizados. O marco seguinte só veio em 1995, com a primeira cota de candidaturas de mulheres (Lei 9.100, para as eleições municipais de 1996). Depois de 1995, o intervalo mais longo foi de 12 anos (1997 a 2009); desde 2018, houve marco quase todo ano.",
    barras: [
      { rotulo: "1932 a 1934", valor: 2 },
      { rotulo: "1934 a 1946", valor: 12 },
      { rotulo: "1946 a 1995", valor: 49 },
      { rotulo: "1995 a 1997", valor: 2 },
      { rotulo: "1997 a 2009", valor: 12 },
      { rotulo: "2009 a 2018", valor: 9 },
    ],
    contagem: true,
    escala: 50,
    legenda: "Anos entre um marco e o seguinte",
    fonte: "Quem são elas?, linha do tempo de direitos (leis e decisões, com o documento de cada uma)",
    to: "/direitos",
    linkLabel: "Ver a linha do tempo",
  },
  {
    id: "df-senado-so-mulheres",
    ancora: {
      valor: "3 de 3",
      rotulo: "cadeiras do Distrito Federal no Senado serão de mulheres a partir de 2027",
    },
    tema: "poder",
    foco: "Mulheres 2027",
    numero: "18",
    data: "2026-11-13",
    titulo: "O Distrito Federal terá só senadoras",
    texto:
      "A partir de 2027, as três cadeiras do DF no Senado serão de mulheres: Damares Alves (Republicanos), com mandato até 2031, e Michelle Bolsonaro e Bia Kicis (PL), eleitas em 2026. Nenhuma outra unidade da Federação terá bancada só de mulheres. No Senado inteiro, as senadoras passam de 15 para 19 das 81 cadeiras; 3 das 19 são do PL, partido que terá 28 cadeiras.",
    barras: [
      { rotulo: "Mulheres hoje", valor: 18.5 },
      { rotulo: "Mulheres 2027", valor: 23.5 },
    ],
    legenda: "Fatia das 81 cadeiras do Senado ocupada por mulheres",
    fonte:
      "TSE, Candidatos 2026 · base de 27/10/2026; Senado Federal, Dados Abertos, consulta de 28/10/2026",
    to: "/quem-chega",
    linkLabel: "Ver em Quem chega",
  },
];

export const ACHADOS_RECENTES = [...ACHADOS].reverse().slice(0, 3);
