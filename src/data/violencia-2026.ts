/**
 * violencia-2026 — números agregados de violência contra mulheres usados em
 * Barreiras e em Na voz delas. CRAVADO em código, com fonte e data.
 *
 * 1) Violência política de gênero (art. 326-B do Código Eleitoral, incluído
 *    pela Lei 14.192/2021): painel "Violência Política de Gênero" do TSE com o
 *    MPF (Power BI), aba Justiça Eleitoral, todas as instâncias, "dados
 *    extraídos em 23/10/2026". Lido em 28/10/2026; captura de tela arquivada.
 *    Contam processos autuados, não casos nem vítimas: um mesmo episódio pode
 *    gerar inquérito, representação e ação penal.
 *    Inconsistência do próprio painel: a soma dos processos por ano de
 *    autuação (460) difere do acervo total (436). A soma por região confere
 *    com o acervo. Pergunta incluída no pedido via LAI.
 *
 * 2) Feminicídio: 20º Anuário Brasileiro de Segurança Pública (Fórum
 *    Brasileiro de Segurança Pública), publicado em 23/07/2026; pp. 16, 32 e 160.
 */

export const VPG_META = {
  fonte:
    "TSE e MPF, painel Violência Política de Gênero (Power BI), aba Justiça Eleitoral, todas as instâncias",
  extraidoEm: "23/10/2026",
  lidoEm: "28/10/2026",
  url: "https://app.powerbi.com/view?r=eyJrIjoiZDc1MjU5MGYtNGZmZi00ZGVhLWJkMDAtZjZiZmIwM2QzNTcyIiwidCI6ImFiNzcyYzYzLWViMzgtNGIxZS1iZWY3LTdiNjBlZDhhY2RmMSJ9",
} as const;

export const VPG = {
  acervo: 436,
  tramitando: 240,
  ufs: 23,
  municipios: 236,
  /** processos por ano de autuação, como o painel mostra (2020 e 2021 não aparecem no gráfico) */
  porAno: [
    { ano: "2019", processos: 2 },
    { ano: "2022", processos: 15 },
    { ano: "2023", processos: 23 },
    { ano: "2024", processos: 78 },
    { ano: "2025", processos: 118 },
    { ano: "2026", processos: 224 },
  ],
  porRegiao: [
    { regiao: "Sudeste", processos: 160 },
    { regiao: "Nordeste", processos: 91 },
    { regiao: "Sul", processos: 88 },
    { regiao: "Norte", processos: 50 },
    { regiao: "Centro-Oeste", processos: 47 },
  ],
  porClasse: [
    { classe: "Inquérito policial", processos: 182 },
    { classe: "Representação criminal / notícia de crime", processos: 74 },
    { classe: "Ação penal eleitoral", processos: 52 },
    { classe: "Recurso criminal eleitoral", processos: 34 },
    { classe: "Petição criminal", processos: 23 },
  ],
} as const;

export const FEMINICIDIO_META = {
  fonte:
    "Fórum Brasileiro de Segurança Pública, 20º Anuário Brasileiro de Segurança Pública (2026)",
  publicadoEm: "23/07/2026",
  url: "https://forumseguranca.org.br/wp-content/uploads/2026/07/anuario-2026.pdf",
} as const;

export const FEMINICIDIO_2025 = {
  vitimas: 1571,
  variacao: "+4% em relação a 2024",
  taxa: "1,4 por 100 mil mulheres",
  negrasPct: 65.1,
  /** fatia das mulheres assassinadas mortas por razões de gênero, maior desde 2015 */
  razoesDeGeneroPct: 44.4,
} as const;
