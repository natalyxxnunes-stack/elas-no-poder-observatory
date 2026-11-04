import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { Secao } from "@/components/editorial/Secao";
import { ComoSabemos } from "@/components/editorial/ComoSabemos";
import { MONITOR_CAMARA, MONITOR_META, type LinhaMonitor } from "@/data/monitor-camara";
import { UF_NOME } from "@/data/eleitas-cruzamentos";
import { formatInt as n, formatPct } from "@/lib/format-br";

const MIN_VOTACOES = 20;
const presenca = (l: LinhaMonitor) => (l.votacoesEmExercicio ? l.votosRegistrados / l.votacoesEmExercicio : null);
const comBase = MONITOR_CAMARA.filter((l) => l.votacoesEmExercicio >= MIN_VOTACOES);
const somaEm = comBase.reduce((a, l) => a + l.votacoesEmExercicio, 0);
const somaVoto = comBase.reduce((a, l) => a + l.votosRegistrados, 0);
const PRESENCA_DEPUTADAS = somaEm ? (100 * somaVoto) / somaEm : 0;
const data = (iso: string) => iso.split("-").reverse().join("/");

const titulo = `As deputadas registraram voto em ${formatPct(PRESENCA_DEPUTADAS)} das votações nominais de 2026 em que estavam em exercício; a Câmara inteira, em ${formatPct(MONITOR_META.casaPresencaPct ?? 0)}`;

export const Route = createFileRoute("/monitor")({
  head: () => ({
    meta: [
      { title: "Monitor de mandato | Quem são elas?" },
      {
        name: "description",
        content:
          "O que cada deputada federal registrou na Câmara em 2026: votos nas votações nominais do plenário, proposições assinadas e discursos, com os dados abertos da Câmara.",
      },
      { property: "og:title", content: titulo },
    ],
  }),
  component: MonitorPage,
});

type Ordem = "nome" | "presenca" | "proposicoes" | "discursos";
const ORDENS: [Ordem, string][] = [
  ["nome", "Nome"],
  ["presenca", "Votos registrados"],
  ["proposicoes", "Proposições"],
  ["discursos", "Discursos"],
];

/** indicadores do mandato 2027–2031, fixados antes de qualquer dado existir */
const PRE_REGISTRO = [
  ["Voto nominal", "Votos registrados sobre votações em que estava em exercício; Sim, Não, abstenção e obstrução contadas à parte."],
  ["Autoria", "Proposições como primeira signatária separadas das de coautoria; tipo (PL, PLP, PEC, PDL) e tema pela ementa."],
  ["Relatoria", "Pareceres dados como relatora, por comissão e por tema."],
  ["Postos de poder", "Presidência e vice de comissão, Mesa, liderança e vice-liderança, com data de entrada e saída."],
  ["Fala", "Discursos em plenário, por fase da sessão; as falas citadas no site seguem conferidas na fonte primária."],
  ["Alinhamento", "Voto comparado à maioria do próprio partido em cada votação nominal."],
] as const;

function MonitorPage() {
  const [ordem, setOrdem] = useState<Ordem>("nome");
  const [partido, setPartido] = useState("");
  const [uf, setUf] = useState("");
  const [so2026, setSo2026] = useState("");
  const partidos = useMemo(() => [...new Set(MONITOR_CAMARA.map((l) => l.partido))].sort(), []);
  const ufs = useMemo(() => [...new Set(MONITOR_CAMARA.map((l) => l.uf))].sort(), []);
  const resultado = (l: LinhaMonitor) => l.em2026?.resultado ?? "não concorreu";
  const lista = MONITOR_CAMARA.filter(
    (l) => (!partido || l.partido === partido) && (!uf || l.uf === uf) && (!so2026 || resultado(l) === so2026),
  ).sort((a, b) => {
    if (ordem === "nome") return a.nome.localeCompare(b.nome);
    if (ordem === "presenca") return (presenca(b) ?? -1) - (presenca(a) ?? -1);
    return b[ordem] - a[ordem];
  });
  const sel = "min-h-11 border border-rule bg-card px-3 text-[15px] text-ink";
  const chip = (ativo: boolean) =>
    `min-h-11 border px-3 py-1 text-[14px] font-semibold ${ativo ? "border-ink bg-ink text-cream" : "border-rule bg-card text-ink hover:border-ink"}`;
  const totalProps = MONITOR_CAMARA.reduce((a, l) => a + l.proposicoes, 0);
  const totalDisc = MONITOR_CAMARA.reduce((a, l) => a + l.discursos, 0);
  const res2026 = ["eleita", "suplente", "não eleita", "não concorreu"].map(
    (r) => [r, MONITOR_CAMARA.filter((l) => resultado(l) === r).length] as const,
  );

  return (
    <PageShell breadcrumb={[{ label: "No poder", to: "/como-votaram" }, { label: "Monitor de mandato" }]}>
      <header className="py-10 md:py-14">
        <Secao nome="Monitor de mandato" tipo="Câmara dos Deputados" />
        <h1 className="mt-4 max-w-5xl font-display text-3xl font-semibold leading-tight text-plum md:text-5xl">{titulo}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
          O que cada uma das {n(MONITOR_META.deputadasNoPeriodo)} deputadas federais que passaram pela Câmara em 2026 registrou,
          de {data(MONITOR_META.periodo[0])} a {data(MONITOR_META.periodo[1])}: votos nas {n(MONITOR_META.votacoesNominais)}{" "}
          votações nominais do plenário, {n(totalProps)} assinaturas em proposições (uma proposição com várias autoras conta uma vez para cada) e {n(totalDisc)} discursos. Os números
          descrevem o registro; qualidade, motivo e efeito ficam para a reportagem.
        </p>
      </header>

      <section aria-label="Em 2026" className="grid max-w-4xl gap-4 border-y border-rule py-5 sm:grid-cols-4">
        {res2026.map(([r, v]) => (
          <div key={r}>
            <p className="font-display text-3xl text-plum">{n(v)}</p>
            <p className="text-[14px] text-ink/80">{r === "não concorreu" ? "não concorreram em 2026" : `${r}${v > 1 ? "s" : ""} em 2026`}</p>
          </div>
        ))}
      </section>

      <section aria-label="Filtros e ordem" className="mt-8 space-y-4">
        <div className="flex flex-wrap gap-4">
          <label className="flex flex-col gap-1 text-[13px] font-semibold text-ink">
            Partido
            <select value={partido} onChange={(e) => setPartido(e.target.value)} className={sel}>
              <option value="">Todos</option>
              {partidos.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-[13px] font-semibold text-ink">
            Estado
            <select value={uf} onChange={(e) => setUf(e.target.value)} className={sel}>
              <option value="">Todos</option>
              {ufs.map((u) => (
                <option key={u} value={u}>
                  {UF_NOME[u] ?? u}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-[13px] font-semibold text-ink">
            Em 2026
            <select value={so2026} onChange={(e) => setSo2026(e.target.value)} className={sel}>
              <option value="">Qualquer resultado</option>
              {res2026.map(([r]) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Ordenar por">
          <span className="text-[13px] font-semibold text-ink">Ordenar por</span>
          {ORDENS.map(([k, l]) => (
            <button key={k} type="button" className={chip(ordem === k)} aria-pressed={ordem === k} onClick={() => setOrdem(k)}>
              {l}
            </button>
          ))}
        </div>
        <p className="font-display text-2xl text-plum" aria-live="polite">
          {n(lista.length)} {lista.length === 1 ? "deputada" : "deputadas"}
        </p>
      </section>

      <div tabIndex={0} role="region" aria-label="Tabela do monitor de mandato" className="mt-4 overflow-x-auto border border-rule bg-card">
        <table className="w-full min-w-[44rem] border-collapse">
          <caption className="sr-only">Registro de cada deputada na Câmara em 2026</caption>
          <thead>
            <tr className="border-b-2 border-ink text-[13px] text-ink">
              <th scope="col" className="px-3 py-3 text-left font-semibold">Deputada</th>
              <th scope="col" className="px-3 py-3 text-right font-semibold">Votos registrados</th>
              <th scope="col" className="px-3 py-3 text-right font-semibold">Proposições</th>
              <th scope="col" className="px-3 py-3 text-right font-semibold">Discursos</th>
              <th scope="col" className="px-3 py-3 text-left font-semibold">Em 2026</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((l) => {
              const p = presenca(l);
              return (
                <tr key={l.id} className="border-t border-rule/70">
                  <th scope="row" className="px-3 py-2 text-left font-normal">
                    <span className="font-display text-[17px] text-ink">{l.nome}</span>
                    <span className="block text-[13px] text-ink/70">
                      {l.partido}-{l.uf}
                      {!l.emExercicioHoje && " · fora do exercício hoje"}
                    </span>
                  </th>
                  <td className="px-3 py-2 text-right font-mono text-[14px] text-ink">
                    {l.votacoesEmExercicio ? (
                      <>
                        {n(l.votosRegistrados)} de {n(l.votacoesEmExercicio)}
                        {l.votacoesEmExercicio >= MIN_VOTACOES && p !== null && (
                          <span className="block text-[13px] text-ink/70">{formatPct(p * 100)}</span>
                        )}
                      </>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-3 py-2 text-right font-mono text-[14px] text-ink">{n(l.proposicoes)}</td>
                  <td className="px-3 py-2 text-right font-mono text-[14px] text-ink">{n(l.discursos)}</td>
                  <td className="px-3 py-2 text-[14px] text-ink/85">
                    {l.em2026 ? (
                      l.ficha ? (
                        <a href={`/eleitas/${l.ficha}`} className="underline decoration-plum underline-offset-4">
                          {l.em2026.cargo}, eleita
                        </a>
                      ) : (
                        `${l.em2026.cargo}, ${l.em2026.resultado}`
                      )
                    ) : (
                      "não concorreu"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-3 max-w-3xl text-[13px] leading-relaxed text-muted-foreground">
        Votos registrados = votações nominais do plenário em que ela votou (Sim, Não, abstenção ou obstrução) ou presidiu a sessão ÷ votações em
        que estava em exercício. Percentual só com {MIN_VOTACOES} ou mais votações; abaixo disso, “X de Y”. O registro não diz
        se uma ausência foi justificada. Proposições = PL, PLP, PEC e PDL apresentados no período com ela entre os autores,
        como primeira signatária ou coautora. Discursos = todos os registrados pela Câmara, em qualquer fase da sessão.
      </p>

      <section className="mt-14 max-w-4xl" aria-labelledby="pre-registro">
        <Secao nome="Pré-registro" tipo="mandato 2027–2031" />
        <h2 id="pre-registro" className="mt-3 font-display text-2xl leading-snug text-ink md:text-3xl">
          O que vai ser medido a partir da posse, fixado antes de existir qualquer dado
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-ink/80">
          Registrado em 04/11/2026. Fixar os indicadores antes evita escolher a régua depois de ver o resultado. Mudança aqui
          entra no registro de correções do Método, com data e motivo. O Senado entra no monitor na posse, com os dados
          abertos do Senado; esta versão cobre só a Câmara.
        </p>
        <dl className="mt-5 divide-y divide-rule border-y border-rule">
          {PRE_REGISTRO.map(([t, d]) => (
            <div key={t} className="grid gap-1 py-3 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <dt className="font-display text-lg text-ink">{t}</dt>
              <dd className="text-[15px] leading-relaxed text-ink/80">{d}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-[14px] text-ink/75">
          A leitura de cada indicador segue o{" "}
          <Link to="/metodo" hash="atuacao" className="underline decoration-plum underline-offset-4">
            método de atuação parlamentar
          </Link>
          : nenhum rótulo resumido, e quem é citada recebe pedido de posicionamento.
        </p>
      </section>

      <div className="mt-12">
        <ComoSabemos
          fonte="Câmara dos Deputados, Dados Abertos (API v2): /votacoes, /votacoes/{id}/votos, /deputados, /proposicoes, /deputados/{id}/discursos; TSE, Candidatos 2026"
          universo={`Deputadas federais que estiveram em exercício em algum dia entre ${data(MONITOR_META.periodo[0])} e ${data(MONITOR_META.periodo[1])}.`}
          base={`Coleta em ${MONITOR_META.coletaEm}. ${n(MONITOR_META.votacoesPlenario)} votações do plenário no período, ${n(MONITOR_META.votacoesNominais)} nominais.`}
          calculo={
            <>
              Em exercício = consta na lista da Câmara no dia da votação. A referência da Câmara inteira usa a mesma conta para
              todas as pessoas em exercício. Resultado de 2026 ligado pelo CPF, que não é gravado. Scripts:
              scripts/monitor/mandato_camara.py e cruzar_2026.py.
            </>
          }
          limites={[
            "Votar não mede qualidade do mandato, e não votar pode ter motivo justificado que o dado não mostra.",
            "Proposições somam primeira signatária e coautoria; o pré-registro de 2027 separa as duas.",
            "Comissões, relatorias e postos de poder ainda não entram nesta versão.",
            MONITOR_META.votacoesSemListaNaApi
              ? `${n(MONITOR_META.votacoesSemListaNaApi)} votação(ões) do plenário sem lista de votos na API ficaram fora da conta.`
              : "Todas as votações do plenário no período tinham lista de votos consultável ou eram simbólicas.",
          ]}
        />
      </div>
    </PageShell>
  );
}
