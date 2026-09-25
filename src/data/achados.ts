import { ELECTION_RATE_BY_GENDER } from "@/data/historical-funnel";
import { financeSnapshot } from "@/data/tse-finance-snapshot";
import { snapshot } from "@/data/tse-snapshot";
import { formatInt, formatPct, formatUmEmCada } from "@/lib/format-br";

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

if (!snapshot) {
  throw new Error("A fotografia de candidaturas de 2026 não está disponível.");
}

const P = snapshot.universes.proporcional;
const M = snapshot.universes.majoritario;
const O = snapshot.outOfUniverse;
const FP = financeSnapshot.universes.proporcional;
const FM = financeSnapshot.universes.majoritario;
const r = ELECTION_RATE_BY_GENDER.at(-1);

if (!O || !P.dimensions || !M.dimensions || !r) {
  throw new Error("Os recortes necessários para publicar os achados não estão disponíveis.");
}

const share = (a: number, b: number) => (b > 0 ? (a / b) * 100 : 0);
const pct = (value: number) => formatPct(value);
const raceTotal = (counts: Record<string, number>) =>
  Object.values(counts).reduce((total, value) => total + value, 0);

const somaP = raceTotal(P.raceCounts);
const somaM = raceTotal(M.raceCounts);

const brancaProporcional = share(P.raceCounts["BRANCA"] ?? 0, somaP);
const brancaMajoritaria = share(M.raceCounts["BRANCA"] ?? 0, somaM);
const pardaProporcional = share(P.raceCounts["PARDA"] ?? 0, somaP);
const pardaMajoritaria = share(M.raceCounts["PARDA"] ?? 0, somaM);

const estadual = share(
  FP.byOffice["DEPUTADO ESTADUAL"]?.feminine ?? 0,
  FP.byOffice["DEPUTADO ESTADUAL"]?.total ?? 0,
);
const federal = share(
  FP.byOffice["DEPUTADO FEDERAL"]?.feminine ?? 0,
  FP.byOffice["DEPUTADO FEDERAL"]?.total ?? 0,
);
const distrital = share(
  FP.byOffice["DEPUTADO DISTRITAL"]?.feminine ?? 0,
  FP.byOffice["DEPUTADO DISTRITAL"]?.total ?? 0,
);
const senado = share(
  FM.byOffice["SENADOR"]?.feminine ?? 0,
  FM.byOffice["SENADOR"]?.total ?? 0,
);
const governo = share(
  FM.byOffice["GOVERNADOR"]?.feminine ?? 0,
  FM.byOffice["GOVERNADOR"]?.total ?? 0,
);
const presidencia = share(
  FM.byOffice["PRESIDENTE"]?.feminine ?? 0,
  FM.byOffice["PRESIDENTE"]?.total ?? 0,
);

const brancasDinheiro = share(
  FM.feminineRevenueByRace["BRANCA"]?.value ?? 0,
  FM.feminineRevenue,
);
const negrasCandidatas = (M.raceCounts["PARDA"] ?? 0) + (M.raceCounts["PRETA"] ?? 0);
const negrasDinheiro = share(
  (FM.feminineRevenueByRace["PARDA"]?.value ?? 0) +
    (FM.feminineRevenueByRace["PRETA"]?.value ?? 0),
  FM.feminineRevenue,
);

const governadora = share(
  M.dimensions.feminineByCargo?.["GOVERNADOR"] ?? 0,
  M.dimensions.totalByCargo?.["GOVERNADOR"] ?? 0,
);
const viceGovernadora = share(
  O.feminineByCargo["VICE-GOVERNADOR"] ?? 0,
  O.byCargo["VICE-GOVERNADOR"] ?? 0,
);
const presidenta = share(
  M.dimensions.feminineByCargo?.["PRESIDENTE"] ?? 0,
  M.dimensions.totalByCargo?.["PRESIDENTE"] ?? 0,
);
const vicePresidenta = share(
  O.feminineByCargo["VICE-PRESIDENTE"] ?? 0,
  O.byCargo["VICE-PRESIDENTE"] ?? 0,
);

export const ACHADOS: Achado[] = [
  {
    id: "quanto-mais-alto-mais-brancas",
    numero: "01",
    data: "2026-09-24",
    titulo: "Quanto mais alto o cargo, mais brancas",
    texto: `Brancas são ${pct(brancaProporcional)} das candidatas a deputada e ${pct(brancaMajoritaria)} das candidatas a presidente, governadora e senadora. As pardas fazem o caminho inverso: são ${formatUmEmCada(pardaProporcional)} candidatas a deputada e ${formatUmEmCada(pardaMajoritaria)} nas candidaturas majoritárias.`,
    barras: [
      { rotulo: "Deputada", valor: brancaProporcional },
      { rotulo: "Majoritárias", valor: brancaMajoritaria },
    ],
    legenda: "Brancas entre as candidatas",
    fonte: "TSE, Candidaturas 2026 · base de 22/09/2026",
    to: "/quem-sao-elas",
    linkLabel: "Ver em Quem são elas",
  },
  {
    id: "presidencia-dinheiro",
    numero: "02",
    data: "2026-09-24",
    titulo: "Na Presidência, quase nada da receita declarada",
    texto: `Mulheres são ${formatInt(M.dimensions.feminineByCargo?.["PRESIDENTE"] ?? 0)} das ${formatInt(M.dimensions.totalByCargo?.["PRESIDENTE"] ?? 0)} candidaturas à Presidência e receberam ${pct(presidencia)} da receita declarada até agora. Por cargo, a fatia das mulheres na receita declarada é de ${pct(estadual)} nas assembleias, ${pct(federal)} na Câmara dos Deputados, ${pct(distrital)} na Câmara Legislativa do DF, ${pct(senado)} no Senado e ${pct(governo)} nos governos.`,
    barras: [
      { rotulo: "Assembleias", valor: estadual },
      { rotulo: "Câmara", valor: federal },
      { rotulo: "Câmara Legislativa DF", valor: distrital },
      { rotulo: "Senado", valor: senado },
      { rotulo: "Governos", valor: governo },
      { rotulo: "Presidência", valor: presidencia },
    ],
    legenda: "Parcela da receita declarada que foi para mulheres",
    fonte:
      "TSE, Prestação de Contas Eleitorais 2026 · base de 23/09/2026, em andamento",
    to: "/dinheiro",
    linkLabel: "Ver em Dinheiro",
  },
  {
    id: "dinheiro-chega-mais-as-brancas",
    numero: "03",
    data: "2026-09-24",
    titulo: "Entre as mulheres, o dinheiro chega mais às brancas",
    texto: `Nas disputas por Presidência, governos e Senado, brancas são ${formatInt(M.raceCounts["BRANCA"] ?? 0)} das ${formatInt(somaM)} candidatas e ficaram com ${pct(brancasDinheiro)} da receita declarada por mulheres até agora. Negras, somando pretas e pardas, são ${formatInt(negrasCandidatas)} e ficaram com ${pct(negrasDinheiro)}.`,
    barras: [
      { rotulo: "Brancas · candidatas", valor: brancaMajoritaria },
      { rotulo: "Brancas · dinheiro", valor: brancasDinheiro },
      { rotulo: "Negras · candidatas", valor: share(negrasCandidatas, somaM) },
      { rotulo: "Negras · dinheiro", valor: negrasDinheiro },
    ],
    legenda: "Presidência, governos e Senado",
    fonte:
      "TSE, Candidaturas 2026 e Prestação de Contas Eleitorais 2026 · receita em andamento",
    to: "/dinheiro",
    linkLabel: "Ver em Dinheiro",
  },
  {
    id: "vice-nao-titular",
    numero: "04",
    data: "2026-09-24",
    titulo: "Vice, não titular",
    texto: `Nos governos estaduais, mulheres são ${formatInt(M.dimensions.feminineByCargo?.["GOVERNADOR"] ?? 0)} das ${formatInt(M.dimensions.totalByCargo?.["GOVERNADOR"] ?? 0)} candidaturas a governadora e ${formatInt(O.feminineByCargo["VICE-GOVERNADOR"] ?? 0)} das ${formatInt(O.byCargo["VICE-GOVERNADOR"] ?? 0)} a vice. Na Presidência, são ${formatInt(M.dimensions.feminineByCargo?.["PRESIDENTE"] ?? 0)} das ${formatInt(M.dimensions.totalByCargo?.["PRESIDENTE"] ?? 0)} titulares e ${formatInt(O.feminineByCargo["VICE-PRESIDENTE"] ?? 0)} das ${formatInt(O.byCargo["VICE-PRESIDENTE"] ?? 0)} vices.`,
    barras: [
      { rotulo: "Governadora", valor: governadora },
      { rotulo: "Vice-governadora", valor: viceGovernadora },
      { rotulo: "Presidenta", valor: presidenta },
      { rotulo: "Vice-presidenta", valor: vicePresidenta },
    ],
    legenda: "Mulheres entre as candidaturas",
    fonte: "TSE, Candidaturas 2026 · base de 22/09/2026",
    to: "/quem-sao-elas",
    linkLabel: "Ver em Quem são elas",
  },
  {
    id: "candidatar-se-nao-e-eleger-se",
    numero: "05",
    data: "2026-09-24",
    titulo: "Candidatar-se não é eleger-se",
    texto: `Em ${r.year}, 1 em cada ${Math.round(r.feminine.candidacies / r.feminine.elected)} candidatas a deputada se elegeu. Entre os homens, 1 em cada ${Math.round(r.masculine.candidacies / r.masculine.elected)}.`,
    barras: [
      {
        rotulo: "Candidatas eleitas",
        valor: share(r.feminine.elected, r.feminine.candidacies),
      },
      {
        rotulo: "Candidatos eleitos",
        valor: share(r.masculine.elected, r.masculine.candidacies),
      },
    ],
    legenda: `Taxa de eleição para deputada e deputado, ${r.year}`,
    fonte: `TSE, Candidatos ${r.year}`,
    to: "/historico",
    linkLabel: "Ver no Histórico",
  },
];

export const ACHADOS_RECENTES = [...ACHADOS].reverse().slice(0, 3);