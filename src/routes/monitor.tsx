import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { FOTOS } from "@/data/fotos";
import { PILOT_CORAL } from "@/lib/editorial-pilot-colors";
import { Secao } from "@/components/editorial/Secao";
import { ComoSabemos } from "@/components/editorial/ComoSabemos";
import { MONITOR_CAMARA, MONITOR_META, type LinhaMonitor } from "@/data/monitor-camara";
import { UF_NOME } from "@/data/eleitas-cruzamentos";
import { formatInt as n, formatPct } from "@/lib/format-br";
import { MIN_VOTACOES, PRESENCA_DEPUTADAS } from "@/lib/monitor";

const presenca = (l: LinhaMonitor) => (l.votacoesEmExercicio ? l.votosRegistrados / l.votacoesEmExercicio : null);
const data = (iso: string) => iso.split("-").reverse().join("/");

const titulo = `Em 2026, deputadas tiveram registro de voto ou presidência em ${formatPct(PRESENCA_DEPUTADAS)} das votações nominais em que estavam em exercício; na Câmara inteira, ${formatPct(MONITOR_META.casaPresencaPct ?? 0)}`;
const manchete = `Deputadas tiveram registro em ${formatPct(PRESENCA_DEPUTADAS)} das votações nominais em que estavam em exercício`;
const FOTO_PLENARIO = FOTOS["plenario-camara-junho-2026"]!;


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
  ["presenca", "Registro em votações"],
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
  const [busca, setBusca] = useState("");
  const [selecionada, setSelecionada] = useState<number | null>(null);
  const partidos = useMemo(() => [...new Set(MONITOR_CAMARA.map((l) => l.partido))].sort(), []);
  const ufs = useMemo(() => [...new Set(MONITOR_CAMARA.map((l) => l.uf))].sort(), []);
  const resultado = (l: LinhaMonitor) => l.em2026?.resultado ?? "não concorreu";
  const lista = MONITOR_CAMARA.filter(
    (l) =>
      (!partido || l.partido === partido) &&
      (!uf || l.uf === uf) &&
      (!so2026 || resultado(l) === so2026) &&
      (!busca.trim() || l.nome.toLocaleLowerCase("pt-BR").includes(busca.trim().toLocaleLowerCase("pt-BR"))),
  ).sort((a, b) => {
    if (ordem === "nome") return a.nome.localeCompare(b.nome);
    if (ordem === "presenca") return (presenca(b) ?? -1) - (presenca(a) ?? -1);
    return b[ordem] - a[ordem];
  });
  const destaque = lista.find((l) => l.id === selecionada) ?? lista[0] ?? null;
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
      <header className="relative left-1/2 -ml-[50vw] w-screen bg-plum text-cream">
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
        <Secao nome="Monitor de mandato" tipo="Câmara dos Deputados" claro semFio />
        <h1 className="mt-4 max-w-5xl font-display text-3xl font-semibold leading-tight text-cream md:text-5xl">{manchete}</h1>
        <p className="mt-4 max-w-3xl font-display text-xl leading-relaxed text-cream md:text-2xl">
          O indicador reúne votos registrados e presidência da sessão. Na Câmara inteira,
          pelo mesmo critério, a proporção foi de {formatPct(MONITOR_META.casaPresencaPct ?? 0)}.
        </p>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-cream/85">
          A consulta reúne {n(MONITOR_META.deputadasNoPeriodo)} deputadas que estiveram em exercício
          na Câmara em algum momento do período. Contabiliza registros nas
          { " "}{n(MONITOR_META.votacoesNominais)} votações nominais do plenário,{" "}
          {n(totalProps)} assinaturas de proposições, incluindo coautorias, e {n(totalDisc)} discursos.
          Esses números descrevem atividade registrada, sem avaliar a qualidade de um mandato.
        </p>
        <nav aria-label="Navegar no Monitor de mandato" className="mt-6 flex flex-wrap gap-x-7 gap-y-3 border-t border-cream/30 pt-5 text-sm font-semibold">
          <a href="#consultar-deputada" className="text-cream underline decoration-cream/50 underline-offset-4">Consultar uma deputada</a>
          <a href="#registros-completos" className="text-cream underline decoration-cream/50 underline-offset-4">Tabela completa</a>
          <a href="#pre-registro" className="text-cream underline decoration-cream/50 underline-offset-4">Compromisso metodológico 2027</a>
        </nav>
        <p className="mt-6 border-t border-cream/30 pt-4 font-mono text-[12px] leading-relaxed text-cream/80">
          Período observado: {data(MONITOR_META.periodo[0])} a {data(MONITOR_META.periodo[1])} ·
          Coleta: {MONITOR_META.coletaEm} · Câmara dos Deputados
        </p>
        </div>
      </header>

      <section aria-label="Situação eleitoral das deputadas observadas em 2026" className="relative left-1/2 -ml-[50vw] w-screen bg-coral-ink text-white" style={{ backgroundColor: PILOT_CORAL }}>
        <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
          <h2 className="font-display text-2xl leading-snug text-white md:text-3xl">
            O que aconteceu na eleição de 2026
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white">
            Situação eleitoral das deputadas que passaram pela Câmara durante o período observado.
            A classificação descreve o resultado eleitoral, não a atuação parlamentar.
          </p>
          <dl className="mt-6 grid gap-px bg-white/25 sm:grid-cols-2 lg:grid-cols-4">
            {res2026.map(([r, v]) => (
              <div key={r} className="bg-coral-ink px-4 py-4" style={{ backgroundColor: PILOT_CORAL }}> 
                <dd className="font-display text-5xl leading-none text-white">{n(v)}</dd>
                <dt className="mt-2 text-[14px] leading-relaxed text-white">
                  {r === "não concorreu" ? "não concorreram em 2026" : `${r}${v > 1 ? "s" : ""} em 2026`}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <figure className="relative left-1/2 -ml-[50vw] mt-10 w-screen bg-cream text-ink">
        <div className="mx-auto grid max-w-7xl gap-0 md:grid-cols-[1.05fr_.95fr]">
          <img
            src={FOTO_PLENARIO.src}
            alt={FOTO_PLENARIO.alt}
            loading="lazy"
            className="h-[260px] w-full object-cover sm:h-[340px] md:h-[410px]"
          />
          <figcaption className="flex flex-col justify-center px-5 py-7 md:px-9">
            <p className="font-mono text-xs font-semibold uppercase tracking-wide text-plum">
              Registro institucional · Câmara dos Deputados · 30/06/2026
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-ink md:text-4xl">
              A atividade registrada tem contexto
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/85">
              A fotografia mostra uma sessão deliberativa de junho de 2026.
              Ela não representa o conjunto de votações nominais contabilizadas
              neste monitor, que cobre o período de 1º de janeiro a 3 de novembro.
              Os números abaixo vêm dos registros administrativos da Câmara.
            </p>
            <p className="mt-5 border-t border-ink/20 pt-3 text-[13px] leading-relaxed text-ink/70">
              {FOTO_PLENARIO.credito} · {FOTO_PLENARIO.data} ·{" "}
              <a href={FOTO_PLENARIO.licencaUrl} target="_blank" rel="noreferrer"
                className="font-semibold text-plum underline underline-offset-4">
                Acervo e licença CC BY
              </a>.
            </p>
          </figcaption>
        </div>
      </figure>

      <section id="consultar-deputada" aria-label="Filtros e ordem" className="mt-10 scroll-mt-20 space-y-4 border-t-4 border-plum bg-cream px-5 py-7 md:px-8">
        <div className="grid gap-4 border-t-2 border-plum pt-5 sm:grid-cols-2 lg:grid-cols-4">
          <label className="flex flex-col gap-1 text-[13px] font-semibold text-ink">
            Buscar pelo nome
            <input type="search" value={busca} onChange={(e) => setBusca(e.target.value)}
              placeholder="Nome da deputada" className={sel} />
          </label>
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

      <section aria-label="Ficha individual da deputada selecionada" className="mt-7 bg-[var(--art-ink)] px-5 py-7 text-cream md:px-8 md:py-9">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wide text-cream/75">
              Câmara dos Deputados · dados de 2026
            </p>
            <h2 className="mt-3 font-display text-2xl text-cream md:text-3xl">
              Registro individual
            </h2>
          </div>
          <label className="text-sm font-semibold text-cream">
            Deputada exibida
            <select value={destaque?.id ?? ""} onChange={(e) => setSelecionada(Number(e.target.value))}
              className="mt-1 block min-h-12 w-full min-w-52 border border-cream bg-paper px-3 text-base text-ink"
              disabled={!lista.length}>
              {lista.length===0 && <option value="">Nenhum resultado</option>}
              {lista.map((l) => <option key={l.id} value={l.id}>{l.nome}</option>)}
            </select>
          </label>
        </div>
        {destaque ? (
          <article className="mt-7 border-t border-cream/35 pt-5" aria-live="polite">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <h3 className="font-display text-3xl text-cream">{destaque.nome}</h3>
                <p className="mt-1 font-mono text-[13px] text-cream/80">
                  {destaque.partido} · {destaque.uf} · mandato observado até {data(MONITOR_META.periodo[1])}
                </p>
              </div>
              <a href={`https://dadosabertos.camara.leg.br/api/v2/deputados/${destaque.id}`}
                target="_blank" rel="noreferrer"
                className="inline-flex min-h-11 items-center text-sm font-semibold text-cream underline underline-offset-4">
                Registro individual na API da Câmara ↗
              </a>
            </div>
            <dl className="mt-7 grid gap-4 sm:grid-cols-3">
              <div className="border-t border-cream/30 pt-3">
                <dt className="text-[13px] leading-snug text-cream/75">Registro de voto ou presidência de sessão</dt>
                <dd className="mt-2 text-cream">
                  <span className="block font-display text-4xl">
                  {destaque.votacoesEmExercicio > 0 && presenca(destaque) !== null
                    ? destaque.votacoesEmExercicio >= MIN_VOTACOES
                      ? formatPct((presenca(destaque) ?? 0) * 100)
                      : `${n(destaque.votosRegistrados)} de ${n(destaque.votacoesEmExercicio)}`
                    : "—"}
                </span>
                  <p className="mt-2 font-mono text-[12px] text-cream/75">
                    {n(destaque.votosRegistrados)} de {n(destaque.votacoesEmExercicio)} votações em exercício
                  </p>
                </dd>
              </div>
              <div className="border-t border-cream/30 pt-3">
                <dt className="text-[13px] leading-snug text-cream/75">Assinaturas em proposições (inclui coautoria)</dt>
                <dd className="mt-2 font-display text-4xl text-cream">{n(destaque.proposicoes)}</dd>
              </div>
              <div className="border-t border-cream/30 pt-3">
                <dt className="text-[13px] leading-snug text-cream/75">Discursos registrados</dt>
                <dd className="mt-2 font-display text-4xl text-cream">{n(destaque.discursos)}</dd>
              </div>
            </dl>
            <p className="mt-6 border-t border-cream/30 pt-4 text-sm leading-relaxed text-cream/85">
              Eleição de 2026: {destaque.em2026
                ? `${destaque.em2026.cargo}, ${destaque.em2026.resultado}`
                : "não concorreu"}.{" "}
              {destaque.emExercicioHoje
                ? "Em exercício na data da coleta."
                : "Fora do exercício na data da coleta."}
              {" "}Contagens administrativas não informam o mérito nem o motivo de eventuais ausências.
            </p>
            {destaque.ficha && (
              <Link to="/eleitas/$slug" params={{slug:destaque.ficha}} className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-cream underline underline-offset-4">
                Consultar a ficha eleitoral de 2026 ↗
              </Link>
            )}
          </article>
        ) : (
          <p className="mt-5 text-sm leading-relaxed text-cream/85">Nenhuma deputada corresponde aos filtros. Ajuste a busca para consultar os registros.</p>
        )}
      </section>

      <section id="registros-completos" className="mt-7 scroll-mt-20" aria-label="Tabela completa de registros">
        <details className="group border border-plum bg-card px-4 py-3 md:px-5">
          <summary className="flex min-h-12 cursor-pointer items-center justify-between gap-4 font-semibold text-plum">
            Abrir tabela integral de registros das {n(lista.length)} deputadas filtradas
            <span aria-hidden="true" className="group-open:rotate-180">↓</span>
          </summary>
      <div tabIndex={0} role="region" aria-label="Tabela do monitor de mandato" className="mt-4 overflow-x-auto border border-rule bg-card">
        <table className="w-full min-w-[44rem] border-collapse">
          <caption className="sr-only">Registro de cada deputada na Câmara em 2026</caption>
          <thead>
            <tr className="border-b-2 border-ink text-[13px] text-ink">
              <th scope="col" className="px-3 py-3 text-left font-semibold">Deputada</th>
              <th scope="col" className="px-3 py-3 text-right font-semibold">Registro em votações</th>
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
                      {!l.emExercicioHoje && ` · fora do exercício na coleta de ${MONITOR_META.coletaEm}`}
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
        </details>
      </section>
      <p className="mt-3 max-w-3xl text-[13px] leading-relaxed text-muted-foreground">
        Registro em votações = votações nominais do plenário em que ela votou (Sim, Não, abstenção ou obstrução) ou presidiu a sessão ÷ votações em
        que estava em exercício. Percentual só com {MIN_VOTACOES} ou mais votações; abaixo disso, “X de Y”. O registro não diz
        se uma ausência foi justificada. Proposições = PL, PLP, PEC e PDL apresentados no período com ela entre os autores,
        como primeira signatária ou coautora. Discursos = todos os registrados pela Câmara, em qualquer fase da sessão.
      </p>

      <section className="relative left-1/2 -ml-[50vw] mt-14 w-screen scroll-mt-20 bg-[var(--art-gold)] text-ink" aria-labelledby="pre-registro">
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
        <Secao nome="Pré-registro" tipo="mandato 2027–2031" semFio />
        <p className="mt-4 font-mono text-xs font-semibold uppercase tracking-wide text-ink/75">
          Documento metodológico · registrado em 04/11/2026
        </p>
        <h2 id="pre-registro" className="mt-3 max-w-4xl font-display text-2xl leading-snug text-ink md:text-4xl">
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
        </div>
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
