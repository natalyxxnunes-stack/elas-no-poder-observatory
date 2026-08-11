import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CycleStrip } from "@/components/CycleStrip";
import { GapNote } from "@/components/GapNote";
import {
  QUOTA_RULE,
  RIGHTS_MILESTONES,
  RIGHTS_OPEN_QUESTIONS,
  THESIS,
  UNIVERSE_DIFFERENCE,
  formatPoints,
} from "@/data/election-2026";
import timelineImage from "@/assets/timeline-editorial.png";
import spotQuota from "@/assets/spot-quota.png";

export const Route = createFileRoute("/direitos")({
  head: () => ({
    meta: [
      { title: "Direitos — Quem são elas? | Cota de gênero e marcos legais" },
      {
        name: "description",
        content:
          "Do voto de 1932 ao piso de 30% e à distribuição proporcional por raça: os direitos que sustentam a presença de mulheres na disputa eleitoral brasileira.",
      },
      { property: "og:title", content: "Direitos — Quem são elas?" },
      {
        property: "og:description",
        content:
          "A linha do tempo das regras que abriram a disputa às mulheres — e o que essas regras ainda não alcançam.",
      },
    ],
  }),
  component: DireitosPage,
});

function DireitosPage() {
  return (
    <div className="paper-grain min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 md:px-8">
        <header className="py-14">
          <p className="kicker">Direitos</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.08] text-ink md:text-5xl">
            As regras que abriram a disputa — e o que elas ainda não alcançam
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
            A presença de mulheres nas eleições brasileiras não é um movimento
            espontâneo: é resultado de normas específicas, conquistadas em
            momentos distintos. Entender essas regras é entender por que a
            participação muda tanto de um tipo de disputa para outro.
          </p>
        </header>

        <figure className="editorial-card overflow-hidden">
          <img
            src={timelineImage}
            alt="Ilustração editorial: linha do tempo dos direitos políticos das mulheres"
            loading="lazy"
            width={1600}
            height={560}
            className="w-full"
          />
          <figcaption className="border-t border-rule px-4 py-3 font-mono text-[11px] text-muted-foreground">
            timeline-editorial · ilustração do projeto
          </figcaption>
        </figure>

        <section aria-labelledby="marcos" className="rule-top mt-16 pt-8">
          <h2 id="marcos" className="kicker">
            Marcos legais
          </h2>
          <ol className="mt-8 space-y-0 border-l-2 border-plum pl-6">
            {RIGHTS_MILESTONES.map((m) => (
              <li key={m.year} className="relative pb-9 last:pb-0">
                <span
                  aria-hidden
                  className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-plum bg-paper"
                />
                <p className="data-figure text-2xl text-plum">
                  {m.year}
                </p>
                <h3 className="mt-1 font-display text-xl text-ink">{m.title}</h3>
                <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
                  {m.body}
                </p>
                <p className="mt-2 font-mono text-[11px] text-muted-foreground">
                  Fonte:{" "}
                  <a
                    href={m.sourceUrl}
                    className="underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {m.sourceUrl}
                  </a>
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="rule-top mt-16 grid gap-8 pt-8 md:grid-cols-[1fr_auto] md:items-start">
          <div>
            <h2 className="kicker">Da regra ao resultado</h2>
            <p className="mt-3 max-w-2xl font-display text-2xl leading-snug text-ink md:text-3xl">
              “{THESIS}”
            </p>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
              A regra de composição de candidaturas de {QUOTA_RULE.floor}% a{" "}
              {QUOTA_RULE.ceiling}% por gênero se aplica às eleições
              proporcionais, por partido ou federação. As disputas majoritárias,
              de cargo único, não estão submetidas a ela. Cada universo tem
              participação feminina própria, calculada sobre seu próprio
              denominador; a diferença entre os dois, quando disponível, é
              apresentada em pontos percentuais:{" "}
              <span className="font-mono">
                {formatPoints(UNIVERSE_DIFFERENCE.value)}
              </span>{" "}
              ({UNIVERSE_DIFFERENCE.status}).
            </p>
            <div className="mt-5 space-y-3">
              <GapNote label="Leitura descritiva">
                {QUOTA_RULE.descriptiveReading}
              </GapNote>
              <GapNote label="Cuidado metodológico">
                {UNIVERSE_DIFFERENCE.caveat}
              </GapNote>
            </div>
          </div>
          <img
            src={spotQuota}
            alt=""
            aria-hidden
            loading="lazy"
            width={640}
            height={640}
            className="h-28 w-28 md:h-40 md:w-40"
          />
        </section>

        <section className="rule-top mt-16 pt-8">
          <h2 className="kicker">Limites em aberto</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {RIGHTS_OPEN_QUESTIONS.map((q) => (
              <li key={q} className="editorial-card p-5 leading-relaxed text-muted-foreground">
                {q}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <GapNote label="Limite desta versão">
              A cronologia lista apenas marcos com base normativa ou decisão
              identificável, com link de fonte. Marcos sem fonte verificável não
              são exibidos, e a redação de cada item deve ser reconferida contra o
              texto legal antes da publicação.
            </GapNote>
          </div>
        </section>

        <div className="mt-16 pb-10">
          <CycleStrip activeId="registros" />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
