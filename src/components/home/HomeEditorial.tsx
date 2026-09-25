import { Link } from "@tanstack/react-router";
import brazil from "@svg-maps/brazil";
import { ArrowRight } from "lucide-react";
import { AXES, CENTRAL_THESIS } from "@/data/architecture";
import { formatPoints } from "@/data/election-2026";
import type { HistoricalSeriesPayload } from "@/lib/tse/historical.functions";
import type { PublicSnapshot } from "@/lib/tse/snapshot.functions";
import { formatInt, formatPct } from "@/lib/format-br";

const UF_ORDER = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA",
  "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
] as const;

const STATE_CODES: Record<string, string> = {
  ac: "AC", al: "AL", ap: "AP", am: "AM", ba: "BA", ce: "CE", df: "DF", es: "ES", go: "GO",
  ma: "MA", mt: "MT", ms: "MS", mg: "MG", pa: "PA", pb: "PB", pr: "PR", pe: "PE", pi: "PI",
  rj: "RJ", rn: "RN", rs: "RS", ro: "RO", rr: "RR", sc: "SC", sp: "SP", se: "SE", to: "TO",
};

const MAP_BINS = [
  { max: 34, label: "abaixo de 34%", tone: "fill-plum/25", swatch: "bg-plum/25" },
  { max: 36, label: "34% a 35,9%", tone: "fill-plum/50", swatch: "bg-plum/50" },
  { max: 38, label: "36% a 37,9%", tone: "fill-plum/75", swatch: "bg-plum/75" },
  { max: Infinity, label: "38% ou mais", tone: "fill-plum", swatch: "bg-plum" },
] as const;

type UfDatum = { uf: string; feminine: number; total: number; share: number };

function getUfData(snapshot: PublicSnapshot | null): UfDatum[] {
  const dimensions = snapshot?.universes.proporcional.dimensions;
  return UF_ORDER.flatMap((uf) => {
    const feminine = dimensions?.feminineByUf?.[uf];
    const total = dimensions?.totalByUf?.[uf];
    if (feminine === undefined || total === undefined || total <= 0) return [];
    return [{ uf, feminine, total, share: (feminine / total) * 100 }];
  });
}

function EditorialBrazilMap({ snapshot }: { snapshot: PublicSnapshot | null }) {
  const data = getUfData(snapshot);
  const byUf = new Map(data.map((item) => [item.uf, item]));
  const shares = data.map((item) => item.share);
  const min = shares.length ? Math.min(...shares) : 0;
  const max = shares.length ? Math.max(...shares) : 0;
  const binCounts = MAP_BINS.map((bin) => ({
    ...bin,
    count: data.filter((item) => {
      const roundedShare = Math.round(item.share * 10) / 10;
      return MAP_BINS.find((candidate) => roundedShare < candidate.max) === bin;
    }).length,
  }));

  return (
    <figure className="grid items-end gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(9rem,auto)]" aria-labelledby="home-map-caption">
      <svg
        viewBox={brazil.viewBox}
        role="img"
        aria-label={
          data.length
            ? `Mapa do Brasil: participação feminina nas candidaturas proporcionais por estado, em faixas fixas de 2 pontos, de ${formatPct(min)} a ${formatPct(max)}`
            : "Mapa do Brasil; dados estaduais em atualização"
        }
        className="mx-auto block h-auto w-full max-w-[22rem] md:max-w-[28rem]"
      >
        {brazil.locations.map((location: { id: string; name: string; path: string }) => {
          const uf = STATE_CODES[location.id];
          const datum = uf ? byUf.get(uf) : undefined;
          const roundedShare = datum ? Math.round(datum.share * 10) / 10 : null;
          const bin = roundedShare === null ? undefined : MAP_BINS.find((candidate) => roundedShare < candidate.max);
          return (
            <path
              key={location.id}
              d={location.path}
              className={`${bin?.tone ?? "fill-muted"} stroke-paper stroke-[1.5] transition-opacity hover:opacity-75`}
            >
              <title>
                {datum
                  ? `${location.name}: ${formatPct(datum.share)} — ${formatInt(datum.feminine)} de ${formatInt(datum.total)} candidaturas`
                  : `${location.name}: em atualização`}
              </title>
            </path>
          );
        })}
      </svg>
      <table className="sr-only">
        <caption>Participação feminina nas candidaturas proporcionais por estado</caption>
        <thead>
          <tr>
            <th scope="col">UF</th>
            <th scope="col">Mulheres</th>
            <th scope="col">Total</th>
            <th scope="col">Participação</th>
          </tr>
        </thead>
        <tbody>
          {[...data].sort((a, b) => a.uf.localeCompare(b.uf)).map((item) => (
            <tr key={item.uf}>
              <th scope="row">{item.uf}</th>
              <td>{formatInt(item.feminine)}</td>
              <td>{formatInt(item.total)}</td>
              <td>{formatPct(item.share)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption id="home-map-caption" className="pb-3 font-mono text-xs leading-relaxed text-muted-foreground">
        <ul className="space-y-2">
          {binCounts.map((bin) => (
            <li key={bin.label} className="flex items-center gap-2">
              <span className={`size-3 shrink-0 ${bin.swatch}`} aria-hidden="true" />
              <span>{bin.label} · {bin.count} UFs</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 border-t border-rule pt-3">
          Diferença entre o maior e o menor estado: {data.length ? formatPoints(max - min) : "—"}
        </p>
      </figcaption>
      <details className="sm:col-span-2 border-t border-rule pt-3">
        <summary className="cursor-pointer font-mono text-xs uppercase text-plum underline underline-offset-4">Ver os 27 estados</summary>
        <ol className="mt-3 grid gap-x-8 gap-y-1 text-sm sm:grid-cols-2 lg:grid-cols-3">
          {[...data].sort((a, b) => b.share - a.share).map((item) => (
            <li key={item.uf} className="flex justify-between gap-3 border-b border-rule/60 py-1">
              <span className="text-ink">{item.uf}</span>
              <span className="font-mono text-xs text-muted-foreground">{formatPct(item.share)} · {formatInt(item.feminine)} de {formatInt(item.total)}</span>
            </li>
          ))}
        </ol>
      </details>
    </figure>
  );
}

export function HomeHeroEditorial({ snapshot, baseDate }: { snapshot: PublicSnapshot | null; baseDate: string | null }) {
  const proportional = snapshot?.universes.proporcional ?? null;
  const share = proportional && proportional.total > 0 ? (proportional.feminine / proportional.total) * 100 : null;

  return (
    <section className="relative left-1/2 -ml-[50vw] w-screen overflow-hidden border-b border-rule bg-paper">
      <div className="grid min-h-[min(50vh,22rem)] lg:grid-cols-[54%_46%] lg:items-center">
        <div className="relative bg-plum px-5 py-6 text-cream md:px-10 md:py-9 lg:pl-[max(2.5rem,calc((100vw-72rem)/2+2rem))] lg:pr-24">
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-cream/80">
            <span className="h-1 w-8 bg-coral" aria-hidden="true" /> Eleições 2026 · Brasil
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.1rem,3.6vw,3.75rem)] leading-[0.93] text-cream">
            Entre se<br />candidatar e<br />chegar ao poder,<br />
            <em className="text-cream">onde elas<br className="sm:hidden" /> desaparecem?</em>
          </h1>
          <p className="mt-4 max-w-xl border-t border-cream/40 pt-3 font-display text-base leading-snug text-cream/85 md:text-lg">
            {CENTRAL_THESIS}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-6">
            <Link to="/funil" className="inline-flex min-h-11 items-center gap-3 bg-coral px-5 py-3 text-xs font-semibold uppercase text-ink transition-colors hover:bg-cream">
              Explorar o funil <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link to="/quem-sao-elas" className="inline-flex items-center gap-2 border-b border-cream/70 pb-1 text-xs font-semibold uppercase text-cream hover:border-cream hover:text-cream">
              Ver os dados <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="relative px-5 py-8 md:px-10 lg:pl-20 lg:pr-[max(2.5rem,calc((100vw-72rem)/2+2rem))]">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Dados parciais do TSE<br />Base de {baseDate ?? "data em atualização"}
          </p>
          <div className="mt-2 border-b border-ink pb-5 pr-20">
            <p className="font-display text-[clamp(4rem,8vw,6.75rem)] font-semibold leading-none text-plum">
              {share !== null ? formatPct(share) : "—"}
            </p>
            <p className="max-w-sm font-display text-xl font-semibold leading-[1.05] text-ink md:text-2xl">das candidaturas proporcionais são de mulheres</p>
            <p className="mt-3 text-sm text-ink">
              {proportional ? `${formatInt(proportional.feminine)} de ${formatInt(proportional.total)} candidaturas` : "Dados em atualização"}
            </p>
            <p className="mt-2 max-w-md text-xs leading-relaxed text-muted-foreground">
              A lei exige no mínimo 30% e no máximo 70% de cada gênero na lista de cada partido ou federação. Em 2022, mulheres eram 34,1% das candidaturas.
            </p>
            <p className="mt-1 font-mono text-xs uppercase text-muted-foreground">TSE · {baseDate ?? "base em atualização"}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeMapSection({ snapshot }: { snapshot: PublicSnapshot | null }) {
  return (
    <section className="relative left-1/2 -ml-[50vw] w-screen border-b border-rule bg-paper">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
        <div>
          <p className="font-mono text-xs font-semibold uppercase leading-tight text-ink">A entrada não é igual<br />em todo o país</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">Proporção de mulheres nas candidaturas proporcionais por estado</p>
          <Link to="/quem-sao-elas" className="mt-5 inline-flex items-center gap-2 border-b border-plum pb-1 font-mono text-xs font-semibold uppercase text-plum">
            Explorar os dados por estado <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
        <EditorialBrazilMap snapshot={snapshot} />
      </div>
    </section>
  );
}

const HISTORY_YEARS = [2014, 2018, 2022, 2026] as const;

export function HomeHistoryHighlight({ historical: _historical }: { historical: HistoricalSeriesPayload | null }) {
  const points = [
    { year: HISTORY_YEARS[0], value: 31.5, candidacies: "7.930" },
    { year: HISTORY_YEARS[1], value: 32.0, candidacies: "8.820" },
    { year: HISTORY_YEARS[2], value: 34.1, candidacies: "9.532" },
    { year: HISTORY_YEARS[3], value: 35.6, candidacies: "6.951" },
  ];
  return (
    <section className="relative left-1/2 -ml-[50vw] w-screen border-b border-rule bg-paper">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-[1.1fr_minmax(0,20rem)] md:px-8 md:py-20">
        <div>
          <p className="flex items-center gap-3 font-mono text-xs uppercase text-muted-foreground">
            <span className="h-1 w-3 bg-plum" aria-hidden="true" /> Como chegamos até aqui
          </p>
          <h2 className="mt-5 font-display text-3xl leading-[1.05] text-ink md:text-4xl">
            2.581 candidatas a menos que em 2022
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Os pedidos de registro para deputada e deputado caíram 30% em relação a 2022, em todos os 27 estados. Entre as mulheres, a queda foi de 27%; entre os homens, de 32%. Por isso a presença feminina subiu de 34,1% para 35,6%, num campo menor.
          </p>
          <p className="mt-3 max-w-md font-mono text-xs leading-relaxed text-muted-foreground">
            Comparação entre pedidos de registro. Em 2022, 9,6% deles terminaram inaptos; o arquivo de 2026 ainda não informa a situação das candidaturas.
          </p>
          <Link to="/historico" className="mt-6 inline-flex items-center gap-2 border-b border-plum pb-1 font-mono text-xs font-semibold uppercase text-plum">
            Ver a série completa <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <div
          className="flex items-end justify-between gap-4"
          role="img"
          aria-label={`Participação feminina nas candidaturas proporcionais por eleição: ${points.map((p) => `${p.year}, ${formatPct(p.value)}, ${p.candidacies} candidatas`).join("; ")}`}
        >
          {points.map(({ year, value, candidacies }) => {
            return (
              <div key={year} className="flex flex-1 flex-col items-center gap-2" aria-hidden="true">
                <span className="font-mono text-xs font-semibold text-ink">{formatPct(value)}</span>
                <div className="flex h-28 w-full items-end">
                  <div
                    className={`w-full ${year === 2026 ? "bg-plum" : "bg-plum/35"}`}
                    style={{ height: `${value}%` }}
                  />
                </div>
                <span className="font-mono text-xs text-muted-foreground">{year}</span>
                <span className="text-center font-mono text-xs text-muted-foreground">{candidacies} candidatas</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function HomeFunnelFeature({ snapshot }: { snapshot: PublicSnapshot | null }) {
  const prop = snapshot?.universes.proporcional;
  const maj = snapshot?.universes.majoritario;
  const propShare = prop && prop.total > 0 ? formatPct((prop.feminine / prop.total) * 100) : "—";
  const majShare = maj && maj.total > 0 ? formatPct((maj.feminine / maj.total) * 100) : "—";
  const steps = [
    { n: "01", label: "Contexto", figure: propShare, note: `das candidaturas a deputada; ${majShare} nas majoritárias`, to: "/quem-sao-elas" as const, link: "Quem são elas?" },
    { n: "02", label: "Competição", figure: "R$", note: "receita declarada até 25/09, por gênero e cor/raça", to: "/dinheiro" as const, link: "Dinheiro" },
    { n: "03", label: "Resultado", figure: "?", note: "a partir de 4/10; resultados de 2014 a 2022 no histórico", to: "/historico" as const, link: "Histórico" },
    { n: "04", label: "Poder", figure: "?", note: "a partir de 2027: comissões, mesas e lideranças", to: null, link: null },
  ];
  return (
    <section className="py-16 md:py-24" aria-labelledby="funil-home-titulo">
      <p className="flex items-center gap-3 font-mono text-xs uppercase text-muted-foreground"><span className="h-1 w-3 bg-coral" aria-hidden="true" /> O funil</p>
      <h2 id="funil-home-titulo" className="mt-4 max-w-3xl font-display text-3xl leading-[1.05] text-ink md:text-4xl">Quatro etapas entre a candidatura e o poder. Hoje, só a primeira tem número.</h2>
      <ol className="mt-10 grid border-t-2 border-ink sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step.n} className={`min-w-0 border-b border-rule py-6 sm:px-5 ${index > 0 ? "lg:border-l" : "sm:pl-0"}`}>
            <p className="font-mono text-xs font-semibold text-plum">{step.n}</p>
            <h3 className="mt-2 font-display text-2xl text-ink">{step.label}</h3>
            <p className={`mt-4 font-display text-5xl font-semibold leading-none ${step.figure === "?" ? "text-muted-foreground" : "text-plum"}`}>{step.figure}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.note}</p>
            {step.to && (
              <Link to={step.to} className="mt-4 inline-flex items-center gap-2 border-b border-plum pb-1 font-mono text-xs font-semibold uppercase text-plum">
                {step.link} <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            )}
          </li>
        ))}
      </ol>
      <p className="mt-4 font-mono text-xs leading-relaxed text-muted-foreground">Cada etapa tem universo, fonte e data próprios. <Link to="/funil" className="text-plum underline underline-offset-4">Entenda o funil</Link></p>
    </section>
  );
}

const INVESTIGATIONS = [
  { id: "historico", title: "Em 2022, 1 em cada 34 candidatas a deputada se elegeu. Entre os homens, 1 em cada 14.", support: "Candidaturas e eleitas em cada eleição geral, de 2014 a 2026.", to: "/historico", link: "Ver a série histórica" },
  { id: "direitos", title: "Treze marcos, de 1932 a 2026", support: "Cada lei, decisão e emenda que mudou o acesso das mulheres às urnas e ao dinheiro de campanha, com o texto oficial.", to: "/direitos", link: "Ver a linha do tempo" },
  { id: "dinheiro", title: "Candidata a deputada branca declarou R$ 130 mil nos maiores partidos. Parda, R$ 87 mil.", support: "Receitas declaradas até 25/09, por gênero, cor/raça, cargo, partido e estado.", to: "/dinheiro", link: "Ver quem recebe" },
] as const;

export function HomeInvestigationGrid({ snapshot: _snapshot }: { snapshot: PublicSnapshot | null }) {
  return (
    <section className="relative left-1/2 -ml-[50vw] w-screen border-y border-rule bg-paper">
      <div className="mx-auto grid max-w-6xl md:grid-cols-3">
        {INVESTIGATIONS.map((item) => {
          const axis = AXES.find((candidate) => candidate.id === item.id);
          return (
            <article key={item.id} className="border-b border-rule px-6 py-12 md:border-b-0 md:border-r md:px-8 md:py-16">
              <p className="flex items-center gap-3 font-mono text-xs uppercase text-muted-foreground"><span className="h-1 w-3 bg-coral" /> {axis?.label}</p>
              <h2 className="mt-5 font-display text-2xl leading-[1.02] text-ink md:text-3xl">{item.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.support}</p>
              <Link to={item.to} className="mt-7 inline-flex items-center gap-2 border-b border-plum pb-1 font-mono text-xs font-semibold uppercase text-plum">{item.link} <ArrowRight className="size-3.5" /></Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function HomeAboutBand() {
  return (
    <section className="relative left-1/2 -ml-[50vw] w-screen bg-ink text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-12 md:px-8 md:py-20">
        <div className="md:col-span-4">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-cream/70">Sobre o projeto</p>
          <h2 className="mt-4 font-display text-4xl leading-[0.95] text-cream md:text-5xl">Da candidatura<br />ao poder, com<br />a conta aberta.</h2>
        </div>
        <div className="border-cream/25 md:col-span-5 md:border-l md:pl-10">
          <p className="max-w-md text-sm leading-relaxed text-cream/80">O Quem são elas? é um observatório independente de dados sobre mulheres, eleições e poder. Transformamos números públicos em perguntas verificáveis, com fonte, denominador e método à vista.</p>
          <Link to="/sobre" className="mt-7 inline-flex items-center gap-2 border-b border-cream/60 pb-1 font-mono text-xs uppercase text-cream hover:text-cream">Saiba mais <ArrowRight className="size-3.5" /></Link>
        </div>
        <nav aria-label="Transparência do projeto" className="border-cream/25 md:col-span-3 md:border-l md:pl-10">
          <ul className="divide-y divide-cream/25 border-y border-cream/25 font-mono text-xs uppercase">
            <li><Link to="/investigacoes" className="block py-3 text-cream/80 hover:text-cream">Índice da investigação</Link></li>
            <li><Link to="/metodo" className="block py-3 text-cream/80 hover:text-cream">Metodologia</Link></li>
          </ul>
        </nav>
      </div>
    </section>
  );
}