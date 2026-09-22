import type { ReactNode } from "react";
import { formatInt, formatPct } from "@/lib/format-br";
import type { PublicSnapshot } from "@/lib/tse/snapshot.functions";
import { snapshotRaceCounts } from "@/lib/tse/indicators";
import { RACE_COLORS, RACE_LABELS, type RaceCategory } from "@/data/historical-funnel";

type OpeningBase = {
  kicker: string;
  question: ReactNode;
  lead: ReactNode;
};

type EditorialOpeningProps = OpeningBase &
  (
    | { variant: "funnel"; snapshot: PublicSnapshot | null; baseDate?: string | null }
    | { variant: "race"; snapshot: PublicSnapshot | null }
    | { variant: "timeline"; years: readonly string[] }
    | { variant: "milestones"; milestones: readonly { year: string; title: string }[] }
    | { variant: "process"; steps: readonly string[] }
    | { variant: "financial"; layers: readonly string[]; gap: string }
    | { variant: "representation"; labels: readonly string[]; gap: string }
    | { variant: "power-flow"; levers: readonly { label: string; ready: boolean }[] }
    | { variant: "method"; steps: readonly { number: string; label: string; detail: string }[]; aside?: ReactNode }
    | { variant: "manifesto"; aside?: ReactNode }
    | { variant: "downloads"; documents: readonly { format: string; label: string; available: boolean }[] }
  );

const baseTitle = "font-display text-[clamp(2.7rem,5.2vw,5.5rem)] font-semibold leading-[0.91]";

function OpeningText({ kicker, question, lead, inverse = false }: OpeningBase & { inverse?: boolean }) {
  return (
    <div className="min-w-0">
      <p className={`flex items-center gap-3 font-mono text-[10px] font-medium uppercase tracking-[0.16em] ${inverse ? "text-cream/75" : "text-ink/70"}`}>
        <span className={`h-px w-12 ${inverse ? "bg-cream/55" : "bg-ink/45"}`} aria-hidden="true" />
        {kicker}
      </p>
      <h1 className={`mt-5 max-w-3xl ${baseTitle} ${inverse ? "text-cream" : "text-ink"}`}>{question}</h1>
      <div className={`mt-5 max-w-xl text-sm leading-relaxed md:text-base ${inverse ? "text-cream/80" : "text-ink/75"}`}>{lead}</div>
    </div>
  );
}

function Frame({ children, className }: { children: ReactNode; className: string }) {
  return (
    <section className={`relative left-1/2 -ml-[50vw] w-screen overflow-hidden border-b border-rule ${className}`}>
      {children}
    </section>
  );
}

function FunnelOpening({ snapshot, baseDate, ...text }: OpeningBase & { snapshot: PublicSnapshot | null; baseDate?: string | null }) {
  const prop = snapshot?.universes.proporcional;
  const maj = snapshot?.universes.majoritario;
  const layers = [
    { label: "Proporcionais", value: prop && prop.total > 0 ? (prop.feminine / prop.total) * 100 : null, tone: "bg-plum-bright", width: "w-full" },
    { label: "Majoritárias", value: maj && maj.total > 0 ? (maj.feminine / maj.total) * 100 : null, tone: "bg-coral", width: "w-[78%]" },
    { label: "Eleitas", value: null, tone: "bg-solar", width: "w-[55%]" },
    { label: "Poder", value: null, tone: "bg-ink", width: "w-[34%]" },
  ] as const;
  return (
    <Frame className="bg-plum text-cream">
      <div className="mx-auto grid min-h-[31rem] max-w-6xl items-center gap-10 px-5 py-12 md:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:py-14">
        <OpeningText {...text} inverse />
        <figure aria-label="Funil de 2026 com universos e denominadores próprios" className="min-w-0 border-l border-cream/25 pl-4 md:pl-8">
          <div className="space-y-2">
            {layers.map((layer) => (
              <div key={layer.label} className="grid min-w-0 grid-cols-[minmax(0,1fr)_4.5rem] items-center gap-3">
                <div className={`mx-auto h-16 ${layer.width} ${layer.tone} flex items-center justify-center border border-cream/45 [clip-path:polygon(6%_0,94%_0,84%_100%,16%_100%)]`}>
                  <span className={`font-mono text-[10px] font-semibold uppercase ${layer.tone === "bg-solar" ? "text-ink" : "text-cream"}`}>{layer.label}</span>
                </div>
                <span className="font-mono text-xs font-semibold text-cream">{layer.value === null ? "—" : formatPct(layer.value)}</span>
              </div>
            ))}
          </div>
          <figcaption className="mt-5 border-t border-cream/25 pt-3 font-mono text-[10px] leading-relaxed text-cream/65">
            Cada etapa tem universo próprio · TSE · {baseDate ?? "base em atualização"}
          </figcaption>
        </figure>
      </div>
    </Frame>
  );
}

function RaceOpening({ snapshot, ...text }: OpeningBase & { snapshot: PublicSnapshot | null }) {
  const counts = snapshotRaceCounts(snapshot, "proporcional");
  const denominator = counts ? Object.values(counts).reduce((a, b) => a + b, 0) : null;
  const entries = counts
    ? Object.entries(counts).sort((a, b) => b[1] - a[1])
    : [];
  return (
    <Frame className="bg-plum text-cream">
      <div className="mx-auto grid min-h-[31rem] max-w-6xl items-center gap-10 px-5 py-12 md:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:py-14">
        <OpeningText {...text} inverse />
        <figure aria-label="Distribuição por cor/raça das candidaturas de mulheres no universo proporcional" className="min-w-0 border-l border-cream/25 pl-4 md:pl-8">
          <div className="space-y-3">
            {entries.length === 0
              ? [0, 1, 2, 3].map((index) => (
                  <div key={index} className="grid min-w-0 grid-cols-[7rem_minmax(0,1fr)_4.5rem] items-center gap-3">
                    <span className="truncate font-mono text-[10px] font-semibold uppercase text-cream/70">—</span>
                    <div className="h-4 w-full border border-cream/25 bg-cream/10" />
                    <span className="font-mono text-xs font-semibold text-cream">—</span>
                  </div>
                ))
              : entries.map(([category, value]) => {
                  const key = category as RaceCategory;
                  const pct = denominator ? (value / denominator) * 100 : 0;
                  return (
                    <div key={category} className="grid min-w-0 grid-cols-[7rem_minmax(0,1fr)_4.5rem] items-center gap-3">
                      <span className="truncate font-mono text-[10px] font-semibold uppercase text-cream/85">{RACE_LABELS[key] ?? category}</span>
                      <div className="h-4 w-full border border-cream/25 bg-cream/10">
                        <div className="h-full" style={{ width: `${pct}%`, backgroundColor: RACE_COLORS[key] ?? "var(--coral)" }} />
                      </div>
                      <span className="font-mono text-xs font-semibold text-cream">{formatPct(pct)}</span>
                    </div>
                  );
                })}
          </div>
          <figcaption className="mt-5 border-t border-cream/25 pt-3 font-mono text-[10px] leading-relaxed text-cream/65">
            Candidaturas de mulheres · universo proporcional · categorias originais do TSE
            {denominator ? ` · denominador: ${formatInt(denominator)}` : " · dimensão não gravada nesta fotografia"}
          </figcaption>
        </figure>
      </div>
    </Frame>
  );
}

function TimelineOpening({ years, ...text }: OpeningBase & { years: readonly string[] }) {
  return (
    <Frame className="bg-solar">
      <div className="mx-auto grid min-h-[30rem] max-w-6xl gap-12 px-5 py-12 md:px-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <OpeningText {...text} />
        <figure aria-label={`Linha histórica: ${years.join(", ")}`} className="relative min-w-0 py-12">
          <div className="absolute left-0 right-0 top-1/2 h-px bg-ink" />
          <ol className="relative grid grid-cols-2 gap-y-16 sm:grid-cols-4 sm:gap-0">
            {years.map((year, index) => (
              <li key={year} className={`${index % 2 ? "pt-16" : "pb-16"} relative text-center sm:pt-0 ${index % 2 ? "sm:translate-y-12" : "sm:-translate-y-12"}`}>
                <span className="mx-auto block size-3 rounded-full border-2 border-ink bg-solar" />
                <strong className="mt-3 block font-display text-2xl text-ink">{year}</strong>
                <span className="font-mono text-[9px] uppercase text-ink/65">eleição geral</span>
              </li>
            ))}
          </ol>
        </figure>
      </div>
    </Frame>
  );
}

function MilestonesOpening({ milestones, ...text }: OpeningBase & { milestones: readonly { year: string; title: string }[] }) {
  return (
    <Frame className="bg-coral">
      <div className="absolute inset-y-0 right-[18%] hidden w-px rotate-[14deg] bg-ink/25 md:block" />
      <div className="mx-auto grid min-h-[31rem] max-w-6xl gap-10 px-5 py-12 md:px-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <OpeningText {...text} />
        <ol className="relative border-l border-ink/55 pl-7">
          {milestones.map((milestone, index) => (
            <li key={`${milestone.year}-${milestone.title}`} className="relative grid grid-cols-[4.5rem_minmax(0,1fr)] gap-3 border-b border-ink/25 py-3">
              <span className="absolute -left-[2.05rem] top-5 size-2.5 rounded-full bg-ink" />
              <strong className="font-display text-xl text-ink">{milestone.year}</strong>
              <span className="text-xs leading-snug text-ink/75">{milestone.title}</span>
            </li>
          ))}
        </ol>
      </div>
    </Frame>
  );
}

function ProcessOpening({ steps, ...text }: OpeningBase & { steps: readonly string[] }) {
  return (
    <Frame className="bg-cream">
      <div className="mx-auto grid min-h-[30rem] max-w-6xl lg:grid-cols-[0.92fr_1.08fr]">
        <div className="bg-plum px-5 py-12 text-cream md:px-8 lg:flex lg:items-center lg:px-12"><OpeningText {...text} inverse /></div>
        <ol className="relative px-5 py-9 md:px-10 lg:py-12">
          <div className="absolute bottom-12 left-[2.2rem] top-12 w-px bg-plum/30 md:left-[3.45rem]" aria-hidden="true" />
          {steps.map((step, index) => (
            <li key={step} className="relative grid grid-cols-[2.25rem_minmax(0,1fr)] items-center gap-4 border-b border-rule py-3.5">
              <span className="z-10 grid size-8 place-items-center rounded-full bg-plum font-mono text-[10px] text-cream">{String(index + 1).padStart(2, "0")}</span>
              <span className="text-sm text-ink">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </Frame>
  );
}

function FinancialOpening({ layers, gap, ...text }: OpeningBase & { layers: readonly string[]; gap: string }) {
  return (
    <Frame className="bg-ink text-cream">
      <div className="mx-auto grid min-h-[31rem] max-w-6xl gap-10 px-5 py-12 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <OpeningText {...text} inverse />
        <figure aria-label="Camadas de apuração financeira aguardando a prestação de contas de 2026" className="min-w-0">
          <p className="border-b border-cream/25 pb-3 font-mono text-[10px] uppercase text-cream/60">Distribuição de recursos · 2026</p>
          <div className="mt-5 space-y-4">
            {layers.slice(0, 4).map((layer, index) => (
              <div key={layer} className="grid grid-cols-[7rem_minmax(0,1fr)_2rem] items-center gap-3">
                <span className="truncate font-mono text-[9px] uppercase text-cream/70">{layer}</span>
                <div className="h-8 border border-cream/20 bg-cream/5"><div className={`h-full ${index % 2 ? "w-[38%] bg-solar" : "w-[62%] bg-plum-soft"} opacity-25`} /></div>
                <span className="font-mono text-xs text-cream">—</span>
              </div>
            ))}
          </div>
          <figcaption className="mt-6 border-l-2 border-solar pl-3 font-mono text-[10px] leading-relaxed text-cream/65">{gap}</figcaption>
        </figure>
      </div>
    </Frame>
  );
}

function RepresentationOpening({ labels, gap, ...text }: OpeningBase & { labels: readonly string[]; gap: string }) {
  const seats = Array.from({ length: 72 }, (_, index) => index);
  return (
    <Frame className="bg-forest text-cream">
      <div className="mx-auto grid min-h-[31rem] max-w-6xl gap-10 px-5 py-12 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <OpeningText {...text} inverse />
        <figure aria-label="Matriz de representação aguardando o resultado eleitoral de 2026" className="min-w-0">
          <div className="grid grid-cols-12 gap-2 rounded-t-[8rem] border-x border-t border-cream/30 px-7 pb-5 pt-14 sm:px-12">
            {seats.map((seat) => <span key={seat} className="aspect-square rounded-full border border-cream/55 bg-cream/10" />)}
          </div>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] uppercase text-cream/75">
            {labels.map((label) => <span key={label} className="flex items-center gap-2"><span className="size-2 rounded-full border border-cream" />{label}</span>)}
          </div>
          <figcaption className="mt-4 border-t border-cream/25 pt-3 font-mono text-[10px] text-cream/65">{gap}</figcaption>
        </figure>
      </div>
    </Frame>
  );
}

function PowerFlowOpening({ levers, ...text }: OpeningBase & { levers: readonly { label: string; ready: boolean }[] }) {
  return (
    <Frame className="bg-cream">
      <div className="mx-auto grid min-h-[31rem] max-w-6xl lg:grid-cols-[0.92fr_1.08fr]">
        <div className="bg-plum px-5 py-12 text-cream md:px-8 lg:flex lg:items-center lg:px-12"><OpeningText {...text} inverse /></div>
        <figure aria-label="Fluxo das decisões partidárias que controlam o acesso à disputa" className="flex min-w-0 flex-col justify-center px-5 py-10 md:px-10">
          <div className="mx-auto bg-plum px-6 py-3 font-mono text-[10px] uppercase text-cream">Partidos e federações</div>
          <div className="mx-auto h-7 w-px bg-ink/35" />
          <div className="grid grid-cols-3 gap-2">
            {levers.slice(0, 3).map((lever, index) => <div key={lever.label} className={`${index === 0 ? "bg-coral" : index === 1 ? "bg-paper" : "bg-solar"} border border-ink/30 px-2 py-4 text-center font-mono text-[9px] uppercase text-ink`}>{lever.label}<span className="mt-2 block text-[8px] opacity-60">{lever.ready ? "investigável" : "aguardando fonte"}</span></div>)}
          </div>
          <div className="mx-auto h-7 w-px bg-ink/35" />
          <div className="mx-auto bg-ink px-7 py-3 font-mono text-[10px] uppercase text-cream">Acesso ao poder</div>
        </figure>
      </div>
    </Frame>
  );
}

function MethodOpening({ steps, aside, ...text }: OpeningBase & { steps: readonly { number: string; label: string; detail: string }[]; aside?: ReactNode }) {
  return (
    <Frame className="bg-solar">
      <div className="mx-auto grid min-h-[31rem] max-w-6xl gap-10 px-5 py-10 md:px-8 lg:grid-cols-[1fr_1fr] lg:items-center">
        <OpeningText {...text} />
        <div>
          <ol className="divide-y divide-ink/25 border-y border-ink/25">
            {steps.map((step) => <li key={step.number} className="grid grid-cols-[3.5rem_7rem_minmax(0,1fr)] items-baseline gap-3 py-3"><strong className="font-display text-3xl text-ink">{step.number}</strong><span className="font-mono text-[10px] font-semibold uppercase text-ink">{step.label}</span><span className="text-xs text-ink/65">{step.detail}</span></li>)}
          </ol>
          {aside && <div className="mt-6 border-t border-ink/30 pt-4">{aside}</div>}
        </div>
      </div>
    </Frame>
  );
}

function ManifestoOpening({ aside, ...text }: OpeningBase & { aside?: ReactNode }) {
  return (
    <Frame className="bg-paper">
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[45%] md:block" aria-hidden="true"><span className="absolute bottom-0 right-[4%] h-[70%] w-[42%] rounded-t-full bg-plum" /><span className="absolute bottom-0 right-[30%] h-[58%] w-[38%] rounded-t-full bg-coral/90 mix-blend-multiply" /><span className="absolute -bottom-24 right-[38%] size-64 rounded-full bg-solar mix-blend-multiply" /></div>
      <div className="relative mx-auto grid min-h-[31rem] max-w-6xl items-center px-5 py-12 md:px-8 lg:grid-cols-[0.62fr_0.38fr]">
        <div><OpeningText {...text} />{aside && <div className="mt-7 max-w-sm border-l border-ink pl-4">{aside}</div>}</div>
      </div>
    </Frame>
  );
}

function DownloadsOpening({ documents, ...text }: OpeningBase & { documents: readonly { format: string; label: string; available: boolean }[] }) {
  const tones = ["bg-paper", "bg-coral", "bg-solar", "bg-cream"] as const;
  return (
    <Frame className="bg-forest text-cream">
      <div className="mx-auto grid min-h-[30rem] max-w-6xl gap-10 px-5 py-12 md:px-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-center">
        <OpeningText {...text} inverse />
        <figure aria-label="Formatos dos materiais disponíveis e em preparação" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {documents.map((document, index) => <div key={`${document.format}-${document.label}`} className={`relative min-h-48 border border-ink/25 p-4 pt-10 text-ink ${tones[index % tones.length]} [clip-path:polygon(0_0,78%_0,100%_18%,100%_100%,0_100%)]`}><span className="absolute right-0 top-0 size-10 border-b border-l border-ink/20 bg-cream/40" /><strong className="font-display text-2xl">{document.format}</strong><span className="mt-3 block text-xs leading-snug">{document.label}</span><span className="absolute bottom-4 left-4 font-mono text-[8px] uppercase">{document.available ? "disponível" : "em preparação"}</span></div>)}
        </figure>
      </div>
    </Frame>
  );
}

export function EditorialOpening(props: EditorialOpeningProps) {
  switch (props.variant) {
    case "funnel": return <FunnelOpening {...props} />;
    case "race": return <RaceOpening {...props} />;
    case "timeline": return <TimelineOpening {...props} />;
    case "milestones": return <MilestonesOpening {...props} />;
    case "process": return <ProcessOpening {...props} />;
    case "financial": return <FinancialOpening {...props} />;
    case "representation": return <RepresentationOpening {...props} />;
    case "power-flow": return <PowerFlowOpening {...props} />;
    case "method": return <MethodOpening {...props} />;
    case "manifesto": return <ManifestoOpening {...props} />;
    case "downloads": return <DownloadsOpening {...props} />;
  }
}