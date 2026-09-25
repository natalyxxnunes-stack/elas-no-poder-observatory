/**
 * rights-timeline — cronologia jurídica e política dos direitos políticos de
 * mulheres no Brasil. Conteúdo editorial, sem números derivados da base do TSE.
 *
 * Cada marco é estruturado em conquista → regra → disputa → implementação →
 * consequência. As fontes apontam para o texto normativo ou a decisão
 * específica, e não para páginas iniciais de instituições.
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
};

export const RIGHTS_TIMELINE: readonly RightsMilestone[] = [
  {
    year: "1932",
    title: "Código Eleitoral admite o voto de mulheres",
    achievement:
      "O Código Eleitoral de 1932 (Decreto 21.076) define como eleitor “o cidadão maior de 21 anos, sem distinção de sexo”.",
    rule:
      "O voto passa a ser direito das mulheres, mas facultativo: o art. 121 permitia que mulheres de qualquer idade se isentassem de qualquer obrigação eleitoral, enquanto para os homens a obrigação ia até os 60 anos.",
    dispute:
      "O Código não impôs às mulheres condição de estado civil ou de renda. A exclusão de analfabetos valia para homens e mulheres. A obrigatoriedade igual ficou para as normas seguintes.",
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
    title: "Constituição incorpora o voto feminino, ainda facultativo",
    achievement:
      "A Constituição de 16 de julho de 1934 assentou em bases constitucionais o direito de voto das mulheres, já reconhecido pelo Código de 1932.",
    rule:
      "O art. 108 definiu como eleitores \"os brasileiros de um ou de outro sexo, maiores de 18 anos\". Mas o art. 109 tornava o alistamento e o voto obrigatórios para os homens e, para as mulheres, apenas quando exercessem função pública remunerada — para as demais, o voto seguia facultativo.",
    dispute:
      "A equiparação plena de obrigatoriedade e de condições entre homens e mulheres permaneceu em aberto, refletindo uma lógica que ainda vinculava a participação da mulher à sua situação de trabalho e estado civil.",
    implementation:
      "A experiência constitucional foi interrompida pelo Estado Novo em 1937.",
    consequence:
      "A constitucionalização do direito não significou igualdade de condições: o voto feminino nasceu constitucional, mas assimétrico.",
    sourceLabel: "Constituição de 1934, arts. 108 e 109",
    sourceUrl:
      "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao34.htm",
  },
  {
    year: "1946",
    title: "Voto feminino passa a obrigatório para alfabetizados",
    achievement:
      "A Constituição de 18 de setembro de 1946, na redemocratização, equiparou a obrigatoriedade do voto entre homens e mulheres alfabetizados.",
    rule:
      "O voto, até então facultativo para a maioria das mulheres, tornou-se obrigatório para homens e mulheres alfabetizados de todo o país.",
    dispute:
      "A obrigatoriedade encerrou a assimetria no direito de votar, mas nenhum mecanismo estimulava candidaturas de mulheres — o gargalo se deslocou do voto para a candidatura.",
    implementation:
      "Aplicada sob a estrutura da Justiça Eleitoral reinstalada no novo arranjo democrático.",
    consequence:
      "Votar deixou de ser a questão; candidatar-se e ser eleita passaram a ser o gargalo visível — e assim permaneceriam por décadas.",
    sourceLabel: "Constituição de 1946",
    sourceUrl:
      "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao46.htm",
  },
  {
    year: "1995",
    title: "Primeira reserva de vagas de candidatura",
    achievement:
      "A Lei 9.100/1995 cria a primeira cota de candidaturas de mulheres, para as eleições municipais de 1996.",
    rule:
      "No mínimo 20% das vagas de cada partido ou coligação nas eleições proporcionais municipais deviam ser preenchidas por candidaturas de mulheres (art. 11, §3º).",
    dispute:
      "A mesma lei aumentou o número de candidaturas permitidas por partido. As vagas destinadas a mulheres podiam ficar vazias sem reduzir as demais.",
    implementation:
      "Aplicada nas eleições municipais de 1996, com listas frequentemente incompletas.",
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
      "Na redação original do art. 10, §3º, cada partido ou coligação devia reservar no mínimo 30% e no máximo 70% das candidaturas para cada sexo. Nas eleições de 1998, valeu a faixa de transição de 25% a 75% (art. 80).",
    dispute:
      "A regra alcança o registro de candidaturas, não a distribuição de recursos, propaganda ou posição na lista.",
    implementation:
      "Aplicada a cada partido ou coligação, por circunscrição, nas eleições proporcionais. Federações partidárias só passaram a existir em 2021.",
    consequence:
      "Passou a existir um piso de candidaturas; a competitividade dessas candidaturas continuou fora do alcance da regra.",
    sourceLabel: "Lei nº 9.504/1997, art. 10, §3º (redação original) e art. 80",
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
      "O TSE fixou a regra para as eleições de 2022; o STF, na ADPF 738, determinou a aplicação imediata, já nas eleições municipais de 2020.",
    consequence:
      "Tornou-se possível — e obrigatório — investigar recursos no cruzamento entre gênero e cor/raça.",
    sourceLabel: "TSE, Consulta nº 0600306-47.2019.6.00.0000; STF, ADPF 738",
    sourceUrl:
      "https://www.tse.jus.br/comunicacao/noticias/2020/Agosto/tse-decide-que-recursos-de-campanha-devem-ser-distribuidos-proporcionalmente-a-candidaturas-negras",
  },
  {
    year: "2021",
    title: "Emenda Constitucional 111: voto que vale em dobro na partilha dos fundos",
    achievement:
      "A EC 111/2021 criou um incentivo constitucional às candidaturas de mulheres e pessoas negras na distribuição de recursos públicos de campanha.",
    rule:
      "Para a distribuição, entre os partidos, dos recursos do Fundo Partidário e do FEFC, os votos dados a candidatas mulheres ou a candidatos negros para a Câmara dos Deputados nas eleições de 2022 a 2030 são contados em dobro. A contagem incide sobre a partilha dos fundos entre os partidos — não sobre a atribuição de cadeiras: nenhuma candidata se elege com voto duplicado.",
    dispute:
      "É um incentivo com prazo definido (2022 a 2030), e cada voto é contado em dobro uma única vez. Sua eficácia depende de como cada partido redistribui internamente o que recebe.",
    implementation:
      "Em vigor desde as eleições de 2022, por ter entrado em vigência um ano antes.",
    consequence:
      "Criou incentivo financeiro partidário para investir nessas candidaturas, sem alterar o resultado eleitoral em si.",
    sourceLabel: "Emenda Constitucional nº 111/2021, art. 2º",
    sourceUrl:
      "https://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc111.htm",
  },
  {
    year: "2022",
    title: "EC 117: a cota de recursos e de propaganda entra na Constituição",
    achievement:
      "A Emenda Constitucional 117/2022 leva para a Constituição a destinação mínima de recursos e de tempo de propaganda a candidaturas de mulheres.",
    rule:
      "O FEFC, a parcela do Fundo Partidário usada em campanhas e o tempo de propaganda gratuita no rádio e na TV devem ir, no mínimo em 30%, para candidaturas de mulheres, na proporção das candidatas (art. 17, §8º). Os partidos também devem aplicar no mínimo 5% do Fundo Partidário em programas de participação política das mulheres (art. 17, §7º).",
    dispute:
      "A mesma emenda impediu sanções, inclusive devolução de valores e multas, a partidos que não cumpriram as cotas de recursos por sexo e raça em eleições anteriores à promulgação (art. 3º).",
    implementation:
      "Promulgada em 5 de abril de 2022, antes das eleições gerais daquele ano.",
    consequence:
      "A cota de recursos ganhou status constitucional, e o descumprimento anterior ficou sem punição.",
    sourceLabel: "Emenda Constitucional nº 117/2022",
    sourceUrl: "https://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc117.htm",
  },
  {
    year: "2024",
    title: "Súmula 73 e a punição da fraude à cota de gênero",
    achievement:
      "Consolida-se, com a aprovação da Súmula 73 do TSE em maio de 2024, a jurisprudência sobre apuração e punição da fraude à regra de composição de candidaturas por gênero.",
    rule:
      "A fraude — uso de candidaturas femininas fictícias para o partido atingir o mínimo de 30% e ter o registro deferido — pode ser reconhecida por elementos objetivos (votação ínfima ou zerada, ausência de atos efetivos de campanha, prestação de contas padronizada), sem necessidade de prova de intenção. Confirmada, acarreta anulação dos votos do partido para o cargo, cassação do DRAP e dos diplomas das candidaturas vinculadas, e recálculo dos quocientes eleitoral e partidário.",
    dispute:
      "A caracterização depende dos fatos de cada caso — atos concretos de campanha e movimentação financeira compatível afastam a presunção de candidatura fictícia — e os efeitos sobre cadeiras são decididos após o pleito.",
    implementation:
      "Apuração por ação eleitoral própria (AIJE ou AIME), após a eleição, com produção de prova.",
    consequence:
      "O cumprimento apenas formal da regra deixou de encerrar a discussão: registrar 30% no papel não basta se as candidaturas não forem reais.",
    sourceLabel: "Súmula 73 do TSE; Lei nº 9.504/1997, art. 10, §3º",
    sourceUrl:
      "https://www.tse.jus.br/legislacao/codigo-eleitoral/sumulas/sumulas-do-tse/sumula-tse-n-73",
  },
  {
    year: "2024",
    title: "EC 133: 30% dos recursos para candidaturas negras",
    achievement:
      "A Emenda Constitucional 133/2024, promulgada em 22 de agosto de 2024, leva para a Constituição uma destinação mínima de recursos a candidaturas de pessoas pretas e pardas.",
    rule:
      "Dos recursos do FEFC e do Fundo Partidário destinados às campanhas, os partidos devem aplicar 30% em candidaturas de pessoas pretas e pardas (art. 17, §9º), a partir das eleições de 2024.",
    dispute:
      "A emenda considerou cumpridos os valores já aplicados nessas candidaturas antes da promulgação e criou um programa de regularização de dívidas dos partidos, com perdão de juros e multas.",
    implementation: "Aplicada desde as eleições municipais de 2024.",
    consequence:
      "A regra racial de recursos, antes construída por decisões judiciais, passou a ter base constitucional própria, com percentual fixo de 30%.",
    sourceLabel: "Emenda Constitucional nº 133/2024",
    sourceUrl: "https://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc133.htm",
  },
  {
    year: "2026",
    title: "Regras aplicáveis ao ciclo em curso",
    achievement:
      "As eleições de 2026 são regidas por um conjunto de resoluções do TSE que organizam, em normas separadas, o registro de candidaturas, a arrecadação e a prestação de contas, e a distribuição de recursos públicos de campanha — incorporando as regras de destinação a candidaturas de mulheres, pessoas negras e indígenas construídas ao longo dos ciclos anteriores.",
    rule:
      "A destinação mínima de recursos do FEFC e do Fundo Partidário a essas candidaturas continua regida pela Resolução TSE nº 23.607/2019 (art. 17, §4º, e art. 19), com piso de 30% para candidaturas de mulheres, apoiada na ADI 5.617/DF e na ADPF 738/DF. Para o ciclo de 2026, a Resolução TSE nº 23.752/2026 (arrecadação e prestação de contas) alterou dispositivos da 23.607/2019, e o registro de candidaturas é tratado pela Resolução TSE nº 23.754/2026. A Resolução TSE nº 23.755/2026 alterou as regras de propaganda: o tempo de rádio e TV é distribuído na proporção das candidaturas de mulheres negras e não negras, de homens negros e não negros e de indígenas, com compensação semanal, e os tribunais passam a divulgar o tempo destinado a cada grupo.",
    dispute:
      "É o ciclo em curso: prazos, deferimentos e indeferimentos seguem em andamento e podem alterar o quadro de candidaturas. A eficácia das regras de destinação depende de fiscalização na prestação de contas, verificada apenas após o pleito.",
    implementation:
      "Aplicação corrente, acompanhada pelo calendário eleitoral de 2026.",
    consequence:
      "Os dados que este observatório publica em 2026 são provisórios por natureza, porque a própria aplicação das regras está em curso.",
    sourceLabel: "Resolução TSE nº 23.607/2019; Resoluções TSE nº 23.752/2026, nº 23.754/2026 e nº 23.755/2026",
    sourceUrl:
      "https://www.tse.jus.br/legislacao/compilada/res/2019/resolucao-no-23-607-de-17-de-dezembro-de-2019",
  },
];

/** Regra editorial da cronologia. */
export const RIGHTS_TIMELINE_RULE =
  "Cada marco é apresentado como conquista, regra, disputa, implementação e consequência. Nenhum marco é exibido sem indicação de fonte normativa ou decisão identificável.";
