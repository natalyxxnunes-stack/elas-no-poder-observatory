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

const MAP_TONES = ["fill-plum/25", "fill-plum/40", "fill-plum/55", "fill-plum/70", "fill-plum/85", "fill-plum"];

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
  const span = max - min;

  return (
    <figure className="grid grid-cols-[minmax(0,1fr)_4rem] items-end gap-4" aria-labelledby="home-map-caption">
      <svg
        viewBox={brazil.viewBox}
        role="img"
        aria-label={
          data.length
            ? `Mapa do Brasil: participação feminina nas candidaturas proporcionais por estado, entre ${formatPct(min)} e ${formatPct(max)}`
            : "Mapa do Brasil; dados estaduais em atualização"
        }
        className="mx-auto block h-auto w-full max-w-[22rem] md:max-w-[28rem]"
      >
        {brazil.locations.map((location: { id: string; name: string; path: string }) => {
          const uf = STATE_CODES[location.id];
          const datum = uf ? byUf.get(uf) : undefined;
          const toneIndex = datum && span > 0
            ? Math.min(MAP_TONES.length - 1, Math.floor(((datum.share - min) / span) * MAP_TONES.length))
            : 0;
          return (
            <path
              key={location.id}
              d={location.path}
              className={`${MAP_TONES[toneIndex]} stroke-paper stroke-[1.5] transition-opacity hover:opacity-75`}
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
      <figcaption id="home-map-caption" className="pb-3 font-mono text-[10px] leading-relaxed text-muted-foreground">
        <span className="block border-l-4 border-plum pl-2">Mais mulheres<br />{data.length ? formatPct(max) : "—"}</span>
        <span className="mt-14 block border-l-4 border-plum/25 pl-2">Menos mulheres<br />{data.length ? formatPct(min) : "—"}</span>
      </figcaption>
    </figure>
  );
}

function ArchitecturalCut() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-[54%] z-10 hidden w-40 -translate-x-1/2 overflow-hidden lg:block">
      <div className="absolute inset-y-0 left-8 w-24 bg-cream" />
      <div className="absolute left-0 top-24 size-40 rounded-full bg-coral" />
      <div className="absolute bottom-0 left-4 h-[58%] w-16 border-x border-cream/25 bg-ink [clip-path:polygon(12%_8%,100%_0,100%_100%,0_100%,0_12%)]" />
      <div className="absolute bottom-0 left-20 h-[68%] w-20 border-x border-ink/20 bg-paper [clip-path:polygon(0_10%,72%_0,100%_100%,0_100%)]" />
      <div className="absolute bottom-0 left-7 h-[55%] w-px bg-cream/45" />
      <div className="absolute bottom-0 left-12 h-[58%] w-px bg-cream/25" />
      <div className="absolute bottom-0 left-24 h-[65%] w-px bg-ink/20" />
    </div>
  );
}

export function HomeHeroEditorial({ snapshot, baseDate }: { snapshot: PublicSnapshot | null; baseDate: string | null }) {
  const proportional = snapshot?.universes.proporcional ?? null;
  const share = proportional && proportional.total > 0 ? (proportional.feminine / proportional.total) * 100 : null;

  return (
    <section className="relative left-1/2 -ml-[50vw] w-screen overflow-hidden border-b border-rule bg-paper">
      <div className="grid min-h-[min(50vh,22rem)] lg:grid-cols-[54%_46%] lg:items-center">
        <div className="relative bg-plum px-5 py-6 text-cream md:px-10 md:py-9 lg:pl-[max(2.5rem,calc((100vw-72rem)/2+2rem))] lg:pr-24">
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-cream/80">
            <span className="h-1 w-8 bg-coral" aria-hidden="true" /> Eleições 2026 · Brasil
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.1rem,3.6vw,3.75rem)] leading-[0.93] text-cream">
            Entre se<br />candidatar e<br />chegar ao poder,<br />
            <em className="text-coral">onde elas<br className="sm:hidden" /> desaparecem?</em>
          </h1>
          <p className="mt-4 max-w-xl border-t border-cream/40 pt-3 font-display text-base leading-snug text-cream/85 md:text-lg">
            {CENTRAL_THESIS}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-6">
            <Link to="/funil" className="inline-flex min-h-11 items-center gap-3 bg-coral px-5 py-3 text-xs font-semibold uppercase text-ink transition-colors hover:bg-solar">
              Explorar o funil <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link to="/quem-sao-elas" className="inline-flex items-center gap-2 border-b border-cream/70 pb-1 text-xs font-semibold uppercase text-cream hover:border-solar hover:text-solar">
              Ver os dados <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="relative px-5 py-8 md:px-10 lg:pl-20 lg:pr-[max(2.5rem,calc((100vw-72rem)/2+2rem))]">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            Dados parciais do TSE<br />Base de {baseDate ?? "data em atualização"}
          </p>
          <div className="mt-2 border-b border-ink pb-5 pr-20">
            <p className="font-display text-[clamp(4rem,8vw,6.75rem)] font-semibold leading-none text-plum">
              {share !== null ? formatPct(share) : "—"}
            </p>
            <h2 className="max-w-sm font-display text-xl font-semibold leading-[1.05] text-ink md:text-2xl">
              das candidaturas proporcionais são de mulheres
            </h2>
            <p className="mt-3 text-sm text-ink">
              {proportional ? `${formatInt(proportional.feminine)} de ${formatInt(proportional.total)} candidaturas` : "Dados em atualização"}
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase text-muted-foreground">TSE · {baseDate ?? "base em atualização"}</p>
          </div>
        </div>
      </div>
      <ArchitecturalCut />
    </section>
  );
}

export function HomeMapSection({ snapshot }: { snapshot: PublicSnapshot | null }) {
  return (
    <section className="relative left-1/2 -ml-[50vw] w-screen border-b border-rule bg-paper">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
        <div>
          <p className="font-mono text-[11px] font-semibold uppercase leading-tight text-ink">A entrada não é igual<br />em todo o país</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">Proporção de mulheres nas candidaturas proporcionais por estado</p>
          <Link to="/quem-sao-elas" className="mt-5 inline-flex items-center gap-2 border-b border-plum pb-1 font-mono text-[10px] font-semibold uppercase text-plum">
            Explorar os dados por estado <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
        <EditorialBrazilMap snapshot={snapshot} />
      </div>
    </section>
  );
}

const HISTORY_YEARS = [2014, 2018, 2022, 2026] as const;

export function HomeHistoryHighlight({ historical }: { historical: HistoricalSeriesPayload | null }) {
  const feminine = historical?.series.find((s) => s.id === "serie-mulheres-candidaturas");
  const points = HISTORY_YEARS.map((year) => ({
    year,
    point: feminine?.points.find((p) => p.universe === "proporcional" && p.year === year) ?? null,
  }));
  const first = points[0]?.point;
  const previousElection = points[points.length - 2]?.point;
  const last = points[points.length - 1]?.point;

  if (!previousElection || previousElection.value === null || !last || last.value === null) return null;

  const delta = last.value - previousElection.value;
  const numericValues = points
    .map((p) => p.point?.value ?? null)
    .filter((v): v is number => v !== null);
  const max = numericValues.length ? Math.max(...numericValues) : 0;

  return (
    <section className="relative left-1/2 -ml-[50vw] w-screen border-b border-rule bg-paper">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-[1.1fr_minmax(0,20rem)] md:px-8 md:py-20">
        <div>
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase text-muted-foreground">
            <span className="h-1 w-3 bg-plum" aria-hidden="true" /> Como chegamos até aqui
          </p>
          <h2 className="mt-5 font-display text-3xl leading-[1.05] text-ink md:text-4xl">
            De {formatPct(previousElection.value)} em 2022 para {formatPct(last.value)} na fotografia atual
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            {formatPoints(delta)} de diferença desde a última eleição. Cada eleição é calculada sobre o seu próprio total — os valores não são somados.
          </p>
          {first && first.value !== null && (
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              Olhando mais atrás, era {formatPct(first.value)} em {first.year} — {formatPoints(last.value - first.value)} de diferença ao longo de quatro eleições.
            </p>
          )}
          <Link to="/historico" className="mt-6 inline-flex items-center gap-2 border-b border-plum pb-1 font-mono text-[11px] font-semibold uppercase text-plum">
            Ver a série completa <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <div
          className="flex items-end justify-between gap-4"
          role="img"
          aria-label={`Participação feminina nas candidaturas proporcionais por eleição: ${points.map((p) => `${p.year}, ${p.point?.value !== null && p.point?.value !== undefined ? formatPct(p.point.value) : "sem dado"}`).join("; ")}`}
        >
          {points.map(({ year, point }) => {
            const value = point?.value ?? null;
            const heightPct = value !== null && max > 0 ? Math.max(12, (value / max) * 100) : 0;
            return (
              <div key={year} className="flex flex-1 flex-col items-center gap-2" aria-hidden="true">
                <div className="flex h-28 w-full items-end">
                  <div
                    className={`w-full ${year === last.year ? "bg-plum" : "bg-plum/35"}`}
                    style={{ height: value !== null ? `${heightPct}%` : "2px" }}
                  />
                </div>
                <span className="font-mono text-[10px] text-muted-foreground">{year}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const STAGES = [
  { n: "01", label: "Registros", question: "Quantas conseguem entrar na disputa — e sob qual regra?", to: "/quem-sao-elas", color: "bg-plum" },
  { n: "02", label: "Recursos", question: "Quanto dinheiro e tempo de mídia chegam até elas?", to: "/dinheiro", color: "bg-solar" },
  { n: "03", label: "Votos e eleitas", question: "Quantos votos viram cadeira?", to: "/funil", color: "bg-coral" },
  { n: "04", label: "Poder e decisões", question: "Quem comanda comissões, executivos e orçamento?", to: "/quem-controla", color: "bg-forest" },
] as const;

export function HomeStages() {
  return (
    <nav aria-label="Etapas da investigação" className="relative left-1/2 -ml-[50vw] w-screen border-b border-rule bg-paper">
      <ol className="mx-auto grid max-w-6xl grid-cols-2 px-5 md:grid-cols-4 md:px-8">
        {STAGES.map((stage, index) => (
          <li key={stage.n} className={`min-w-0 py-7 md:px-6 ${index > 0 ? "border-l border-rule" : ""} ${index === 0 ? "md:pl-0" : ""}`}>
            <p className="flex items-center gap-3 font-mono text-xs font-semibold text-plum"><span>{stage.n}</span><span className={`h-px w-10 ${stage.color}`} /></p>
            <h2 className="mt-3 font-display text-xl leading-none text-ink md:text-2xl">{stage.label}</h2>
            <p className="mt-3 max-w-36 text-xs leading-relaxed text-muted-foreground">{stage.question}</p>
            <Link to={stage.to} aria-label={`Explorar ${stage.label}`} className="mt-3 inline-flex text-ink hover:text-plum"><ArrowRight className="size-4" aria-hidden="true" /></Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function HomeFunnelFeature() {
  const layers = [
    { label: "Candidaturas", width: "w-full", tone: "bg-plum" },
    { label: "Recursos", width: "w-[78%]", tone: "bg-plum-soft" },
    { label: "Votos", width: "w-[58%]", tone: "bg-coral" },
    { label: "Cadeiras", width: "w-[38%]", tone: "bg-coral/55" },
    { label: "Poder", width: "w-1/5", tone: "bg-solar" },
  ] as const;

  return (
    <section className="py-20 md:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase text-muted-foreground"><span className="h-1 w-3 bg-coral" /> Em destaque</p>
          <h2 className="mt-5 font-display text-4xl leading-[0.98] text-ink md:text-5xl">O funil da<br />desigualdade</h2>
          <p className="mt-5 max-w-sm leading-relaxed text-muted-foreground">Entre entrar na disputa e chegar ao poder, há um caminho — e ele filtra. Cada etapa tem sua própria fonte e seu próprio universo.</p>
          <Link to="/funil" className="mt-6 inline-flex items-center gap-2 border-b border-plum pb-1 font-mono text-[11px] font-semibold uppercase text-plum">Ver a análise <ArrowRight className="size-4" /></Link>
        </div>
        <figure className="lg:col-span-5" aria-label="Funil editorial das etapas investigadas; as larguras são ilustrativas e não representam uma taxa calculada">
          <div className="space-y-1.5">
            {layers.map((layer) => (
              <div key={layer.label} className="grid grid-cols-[6.5rem_1fr] items-center gap-4">
                <span className="text-right font-mono text-[10px] uppercase text-ink">{layer.label}</span>
                <div className={`mx-auto h-11 ${layer.width} ${layer.tone} [clip-path:polygon(8%_0,92%_0,82%_100%,18%_100%)]`} />
              </div>
            ))}
          </div>
          <figcaption className="mt-4 text-center font-mono text-[10px] leading-relaxed text-muted-foreground">Esquema editorial: cada etapa tem universo, denominador, fonte e data próprios.</figcaption>
        </figure>
        <aside className="border-l border-rule pl-8 lg:col-span-3">
          <p className="font-display text-xl leading-snug text-ink md:text-2xl">Nem todas as etapas têm os mesmos pontos de partida. E nem todas têm as mesmas chances de chegada.</p>
          <Link to="/funil" className="mt-8 inline-flex items-center gap-2 border-b border-plum pb-1 font-mono text-[11px] font-semibold uppercase text-plum">Entenda o funil <ArrowRight className="size-4" /></Link>
        </aside>
      </div>
    </section>
  );
}

const INVESTIGATIONS = [
  { id: "historico", title: "A participação aumentou. Mas a distância permanece.", to: "/historico", link: "Ver a série histórica" },
  { id: "direitos", title: "As regras mudaram. E isso importa.", to: "/direitos", link: "Ver a linha do tempo" },
  { id: "dinheiro", title: "Quem tem recursos para disputar?", to: "/dinheiro", link: "Explorar o eixo" },
] as const;

export function HomeInvestigationGrid() {
  return (
    <section className="relative left-1/2 -ml-[50vw] w-screen border-y border-rule bg-paper">
      <div className="mx-auto grid max-w-6xl md:grid-cols-[repeat(3,minmax(0,1fr))_0.75fr]">
        {INVESTIGATIONS.map((item) => {
          const axis = AXES.find((candidate) => candidate.id === item.id);
          return (
            <article key={item.id} className="border-b border-rule px-6 py-12 md:border-b-0 md:border-r md:px-8 md:py-16">
              <p className="flex items-center gap-3 font-mono text-[10px] uppercase text-muted-foreground"><span className={`h-1 w-3 ${item.id === "dinheiro" ? "bg-solar" : "bg-coral"}`} /> {axis?.label}</p>
              <h2 className="mt-5 font-display text-2xl leading-[1.02] text-ink md:text-3xl">{item.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{axis?.summary}</p>
              {axis?.unpublishedReason && <p className="mt-3 font-mono text-[10px] leading-relaxed text-coral-ink">Lacuna: {axis.unpublishedReason}</p>}
              <Link to={item.to} className="mt-7 inline-flex items-center gap-2 border-b border-plum pb-1 font-mono text-[10px] font-semibold uppercase text-plum">{item.link} <ArrowRight className="size-3.5" /></Link>
            </article>
          );
        })}
        <aside className="flex min-h-64 flex-col justify-center gap-4 bg-solar px-8 py-12 text-ink md:px-8">
          <p className="font-mono text-[10px] uppercase tracking-wide text-ink/70">Achado</p>
          <p className="font-display text-lg font-semibold not-italic leading-snug sm:text-xl md:text-2xl">
            Entre as candidatas à Presidência, mulheres são 14,3%. Entre as candidatas a vice, são 42,9%.
          </p>
        </aside>
      </div>
    </section>
  );
}

export function HomeAboutBand() {
  return (
    <section className="relative left-1/2 -ml-[50vw] w-screen bg-ink text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-12 md:px-8 md:py-20">
        <div className="md:col-span-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cream/70">Sobre o projeto</p>
          <h2 className="mt-4 font-display text-4xl leading-[0.95] text-cream md:text-5xl">Dados para<br />democratizar<br />o poder.</h2>
        </div>
        <div className="border-cream/25 md:col-span-5 md:border-l md:pl-10">
          <p className="max-w-md text-sm leading-relaxed text-cream/80">O Quem são elas? é um observatório independente de dados sobre mulheres, eleições e poder. Transformamos números públicos em perguntas verificáveis, com fonte, denominador e método à vista.</p>
          <Link to="/sobre" className="mt-7 inline-flex items-center gap-2 border-b border-cream/60 pb-1 font-mono text-[10px] uppercase text-cream hover:text-solar">Saiba mais <ArrowRight className="size-3.5" /></Link>
        </div>
        <nav aria-label="Transparência do projeto" className="border-cream/25 md:col-span-3 md:border-l md:pl-10">
          <ul className="divide-y divide-cream/25 border-y border-cream/25 font-mono text-[10px] uppercase">
            <li><Link to="/metodo" className="block py-3 text-cream/80 hover:text-solar">Metodologia</Link></li>
            <li><Link to="/metodo" className="block py-3 text-cream/80 hover:text-solar">Bases de dados</Link></li>
            <li><Link to="/metodo" className="block py-3 text-cream/80 hover:text-solar">Glossário</Link></li>
            <li><Link to="/downloads" className="block py-3 text-cream/80 hover:text-solar">Downloads</Link></li>
          </ul>
        </nav>
      </div>
    </section>
  );
}