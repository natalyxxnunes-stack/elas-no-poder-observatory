/**
 * rights-timeline — cronologia jurídica e política dos direitos políticos de
 * mulheres no Brasil. Conteúdo editorial, sem números derivados da base do TSE.
 *
 * Cada marco é estruturado em conquista → regra → disputa → implementação →
 * consequência. As fontes apontam para o texto normativo ou a decisão
 * específica, e não para páginas iniciais de instituições. Marcos cuja redação
 * ainda precisa de conferência contra o texto legal estão sinalizados em
 * `needsReview`.
 */

export type RightsMilestone = {
  year: string;
  title: string;
  /** o que foi conquistado */
  achievement: string;
  /** qual regra passou a existir */
  rule: string;
  /** qual disputa se abriu */
  dispute: string;
  /** como foi implementada */
  implementation: string;
  /** qual consequência é observável hoje */
  consequence: string;
  sourceLabel: string;
  sourceUrl: string;
  /** true quando a redação depende de conferência final contra a fonte */
  needsReview?: boolean;
};

export const RIGHTS_TIMELINE: readonly RightsMilestone[] = [
  {
    year: "1932",
    title: "Código Eleitoral admite o voto de mulheres",
    achievement:
      "O Código Eleitoral de 1932 passa a admitir o alistamento e o voto de mulheres.",
    rule:
      "O alistamento feminino é admitido, mas em condições distintas das aplicadas aos homens: não havia equiparação imediata de obrigatoriedade nem de condições de exercício.",
    dispute:
      "A extensão do direito conviveu com restrições de fato ligadas a situação civil, ocupação e alfabetização, e seguiu sendo objeto de disputa nas normas seguintes.",
    implementation:
      "A aplicação foi gradual e desigual entre estados, dependendo da estrutura de alistamento existente.",
    consequence:
      "1932 marca a admissão do voto, não a igualdade instantânea de participação política.",
    sourceLabel: "Decreto nº 21.076/1932 — Código Eleitoral",
    sourceUrl:
      "https://www2.camara.leg.br/legin/fed/decret/1930-1939/decreto-21076-24-fevereiro-1932-507583-publicacaooriginal-1-pe.html",
  },
  {
    year: "1934",
    title: "Constituição incorpora o voto feminino",
    achievement:
      "A Constituição de 1934 incorpora ao texto constitucional o direito de voto de mulheres.",
    rule:
      "O texto constitucional trata do alistamento eleitoral, mantendo diferenças de obrigatoriedade em relação aos homens.",
    dispute:
      "A obrigatoriedade e a equiparação plena de condições permaneceram em debate legislativo.",
    implementation:
      "A eleição da Assembleia Constituinte e o período seguinte foram interrompidos pelo Estado Novo, em 1937.",
    consequence:
      "A constitucionalização do direito não garantiu continuidade institucional: a experiência eleitoral foi interrompida poucos anos depois.",
    sourceLabel: "Constituição de 1934",
    sourceUrl:
      "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao34.htm",
    needsReview: true,
  },
  {
    year: "1946",
    title: "Redemocratização e retomada do alistamento",
    achievement:
      "Com a Constituição de 1946, o voto volta a organizar a vida política e o alistamento feminino é retomado.",
    rule:
      "O texto de 1946 define eleitores e condições de alistamento no novo arranjo democrático.",
    dispute:
      "A participação de mulheres em candidaturas seguia sem qualquer mecanismo de estímulo ou reserva.",
    implementation:
      "A retomada ocorreu sob a estrutura da Justiça Eleitoral reinstalada.",
    consequence:
      "Votar deixou de ser a questão central; candidatar-se e ser eleita passaram a ser o gargalo visível.",
    sourceLabel: "Constituição de 1946",
    sourceUrl:
      "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao46.htm",
    needsReview: true,
  },
  {
    year: "1995",
    title: "Primeira reserva de vagas de candidatura",
    achievement:
      "A Lei 9.100/1995 estabelece percentual mínimo de vagas de candidatura para mulheres nas eleições municipais.",
    rule:
      "Percentual mínimo de vagas reservadas nas listas partidárias das eleições proporcionais municipais.",
    dispute:
      "Reservar vaga não obrigava o partido a preencher a vaga: a regra podia ser cumprida no papel e ignorada na prática.",
    implementation:
      "Aplicada nas eleições municipais seguintes, com listas frequentemente incompletas.",
    consequence:
      "Ficou evidente a diferença entre reservar espaço e efetivamente lançar candidaturas.",
    sourceLabel: "Lei nº 9.100/1995",
    sourceUrl: "https://www.planalto.gov.br/ccivil_03/leis/l9100.htm",
  },
  {
    year: "1997",
    title: "Lei das Eleições — composição de 30% a 70% por gênero",
    achievement:
      "A Lei 9.504/1997 fixa faixa de composição por gênero nas candidaturas proporcionais.",
    rule:
      "Cada partido ou federação preenche no mínimo 30% e no máximo 70% das candidaturas em eleições proporcionais com cada gênero (art. 10, §3º).",
    dispute:
      "A regra alcança o registro de candidaturas, não a distribuição de recursos, propaganda ou posição na lista.",
    implementation:
      "Aplicada a cada partido ou federação, por circunscrição, nas eleições proporcionais.",
    consequence:
      "Passou a existir um piso de candidaturas; a competitividade dessas candidaturas continuou fora do alcance da regra.",
    sourceLabel: "Lei nº 9.504/1997, art. 10, §3º",
    sourceUrl: "https://www.planalto.gov.br/ccivil_03/leis/l9504.htm",
  },
  {
    year: "2009",
    title: "De reservar para preencher",
    achievement:
      "A Lei 12.034/2009 altera a redação do art. 10, §3º da Lei das Eleições.",
    rule:
      "A regra passa a exigir o preenchimento efetivo dos percentuais de cada gênero, e não apenas a reserva de vagas.",
    dispute:
      "Surgem casos de candidaturas registradas apenas para cumprir o percentual, levando a discussões sobre fraude à regra de composição.",
    implementation:
      "Exigência verificada no momento do registro das candidaturas pela Justiça Eleitoral.",
    consequence:
      "O número de candidaturas de mulheres cresceu; a discussão passou a ser a qualidade e as condições dessas candidaturas.",
    sourceLabel: "Lei nº 12.034/2009",
    sourceUrl:
      "https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2009/lei/l12034.htm",
  },
  {
    year: "2018",
    title: "Recursos públicos e tempo de propaganda para candidaturas de mulheres",
    achievement:
      "STF e TSE fixam destinação mínima de recursos públicos de campanha e de tempo de propaganda a candidaturas de mulheres.",
    rule:
      "O percentual mínimo destinado deve observar a proporção de candidaturas de mulheres, com piso de 30%.",
    dispute:
      "Regra distinta da composição de candidaturas: alcança a distribuição de condições de campanha e pode envolver disputas majoritárias e proporcionais.",
    implementation:
      "Aplicada às distribuições do fundo eleitoral e à divisão do tempo de rádio e TV pelos partidos.",
    consequence:
      "Ter candidatura passou a ser distinguível de ter recursos para competir — e essa distinção passou a ser auditável.",
    sourceLabel: "TSE — Consulta 0600252-18 / ADI 5617 (STF)",
    sourceUrl:
      "https://www.tse.jus.br/comunicacao/noticias/2018/Maio/fundo-eleitoral-e-tempo-de-radio-e-tv-devem-reservar-o-minimo-de-30-para-candidaturas-femininas",
  },
  {
    year: "2020",
    title: "Distribuição proporcional para candidaturas de pessoas negras",
    achievement:
      "O TSE decide que recursos públicos de campanha e tempo de propaganda devem ser distribuídos proporcionalmente também às candidaturas de pessoas negras.",
    rule:
      "A proporcionalidade passa a considerar cor/raça autodeclarada no registro, além do gênero.",
    dispute:
      "A eficácia depende de fiscalização e de dados de cor/raça confiáveis no registro; a série histórica comparável é curta.",
    implementation:
      "Efeitos antecipados para as eleições municipais de 2020, com aplicação nas eleições seguintes.",
    consequence:
      "Tornou-se possível — e obrigatório — investigar recursos no cruzamento entre gênero e cor/raça.",
    sourceLabel: "TSE — Consulta nº 0600306-47.2019.6.00.0000",
    sourceUrl:
      "https://www.tse.jus.br/comunicacao/noticias/2020/Agosto/tse-decide-que-recursos-de-campanha-devem-ser-distribuidos-proporcionalmente-a-candidaturas-negras",
  },
  {
    year: "2021",
    title: "Emenda Constitucional 111 e incentivo por gênero e raça",
    achievement:
      "A EC 111/2021 cria contagem em dobro, por período determinado, de votos dados a mulheres e a pessoas negras para fins de distribuição de fundos e tempo de propaganda.",
    rule:
      "Incide sobre a distribuição de recursos entre partidos, e não sobre a atribuição de cadeiras.",
    dispute:
      "Regra de incentivo com prazo definido; sua eficácia depende de como cada partido redistribui internamente o que recebe.",
    implementation:
      "Aplicada a partir das eleições seguintes à promulgação, nos termos do texto constitucional.",
    consequence:
      "Criou incentivo financeiro partidário, sem alterar o resultado eleitoral em si.",
    sourceLabel: "Emenda Constitucional nº 111/2021",
    sourceUrl:
      "https://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc111.htm",
    needsReview: true,
  },
  {
    year: "2024",
    title: "Fiscalização de fraude à regra de composição",
    achievement:
      "Consolida-se a jurisprudência eleitoral sobre apuração de fraude à regra de composição de candidaturas por gênero.",
    rule:
      "Casos de candidaturas registradas apenas para cumprir percentual podem ser apurados pela Justiça Eleitoral, com análise individual de provas e circunstâncias.",
    dispute:
      "Os efeitos sobre a votação do partido e sobre as cadeiras obtidas seguem sendo objeto de decisões caso a caso.",
    implementation:
      "Apuração por ação eleitoral própria, após o pleito, com produção de prova.",
    consequence:
      "O cumprimento formal da regra deixou de encerrar a discussão sobre a candidatura.",
    sourceLabel: "TSE — jurisprudência sobre fraude à cota de gênero",
    sourceUrl: "https://www.tse.jus.br/jurisprudencia",
    needsReview: true,
  },
  {
    year: "2026",
    title: "Regras aplicáveis ao ciclo em curso",
    achievement:
      "As resoluções do TSE para as eleições de 2026 organizam registro de candidaturas, prestação de contas e distribuição de recursos.",
    rule:
      "A Resolução TSE nº 23.752/2026 trata, entre outros pontos, da destinação de recursos a candidaturas de mulheres, pessoas negras e indígenas.",
    dispute:
      "É o ciclo em curso: prazos, deferimentos e indeferimentos seguem em andamento e podem alterar o quadro de candidaturas.",
    implementation:
      "Aplicação corrente, acompanhada pelo calendário eleitoral de 2026.",
    consequence:
      "Os dados que este observatório publica em 2026 são provisórios por natureza, porque a própria aplicação das regras está em curso.",
    sourceLabel: "Resolução TSE nº 23.752/2026",
    sourceUrl:
      "https://www.tse.jus.br/legislacao/compilada/res/2026/resolucao-no-23-752-de-26-de-fevereiro-de-2026",
  },
];

/** Regra editorial da cronologia. */
export const RIGHTS_TIMELINE_RULE =
  "Cada marco é apresentado como conquista, regra, disputa, implementação e consequência. Nenhum marco é exibido sem indicação de fonte normativa ou decisão identificável, e a redação de itens sinalizados para revisão deve ser conferida contra o texto original antes de circular como definitiva.";
