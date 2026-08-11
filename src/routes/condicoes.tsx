import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CycleStrip } from "@/components/CycleStrip";
import { GapNote } from "@/components/GapNote";
import { REPRESENTATION_CONTRAST } from "@/data/election-2026";
import spotStrength from "@/assets/spot-strength.png";
import spotQuota from "@/assets/spot-quota.png";

export const Route = createFileRoute("/condicoes")({
  head: () => ({
    meta: [
      { title: "Condições — Quem são elas? | Cota, recursos e mídia" },
      {
        name: "description",
        content:
          "As condições materiais da disputa: cota de gênero de 30%, fundo eleitoral, tempo de mídia e estrutura partidária das candidaturas de mulheres em 2026.",
      },
      { property: "og:title", content: "Condições da disputa — Quem são elas?" },
      {
        property: "og:description",
        content:
          "Cota de gênero, fundo eleitoral e tempo de mídia: o que sustenta ou trava uma candidatura de mulher.",
      },
    ],
  }),
  component: CondicoesPage,
});

const CONDITIONS = [
  {
    title: "Cota de gênero de 30%",
    body: "Incide sobre o total de candidaturas proporcionais de cada partido ou coligação. É um piso de entrada, não uma garantia de competitividade: define quem consta na lista, não quem recebe estrutura.",
    status: "recuperado" as const,
    note: "É essa regra que explica a distância entre 35,2% e 16,9%.",
  },
  {
    title: "Fundo eleitoral e fundo partidário",
    body: "Desde 2018, os recursos devem ser distribuídos na mesma proporção mínima das candidaturas femininas. A regra vale para o volume; a distribuição interna entre candidatas segue sendo decisão do partido.",
    status: "lacuna" as const,
    note: "Valores por partido e por candidatura exigem extração da prestação de contas do TSE — não recuperada do snapshot publicado.",
  },
  {
    title: "Tempo de propaganda",
    body: "Rádio e televisão seguem a mesma lógica proporcional dos recursos, com inserções distribuídas pelo partido.",
    status: "lacuna" as const,
    note: "Distribuição efetiva de inserções por candidatura não recuperada.",
  },
  {
    title: "Estrutura partidária e posição na chapa",
    body: "Suplência, ordem de chapa majoritária e acesso a diretórios locais definem se a candidatura é competitiva ou apenas formal.",
    status: "lacuna" as const,
    note: "Requer classificação manual das chapas de 2026.",
  },
  {
    title: "Violência política de gênero",
    body: "Condição de disputa que não aparece nos registros: ataques, assédio e ameaças moldam quem permanece na campanha até o fim.",
    status: "lacuna" as const,
    note: "Sem série de dados pública consolidada para 2026 no material recuperado.",
  },
];

function CondicoesPage() {
  return (
    <div className="paper-grain min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 md:px-8">
        <header className="grid gap-8 py-14 md:grid-cols-[1.3fr_auto] md:items-center">
          <div>
            <p className="kicker">Condições</p>
            <h1 className="mt-4 max-w-2xl font-display text-4xl leading-[1.08] text-ink md:text-5xl">
              A regra do jogo antes do primeiro voto
            </h1>
            <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
              Uma candidatura não nasce igual à outra. Cota, dinheiro, tempo de
              mídia e posição na chapa definem quem entra para disputar e quem
              entra para completar a lista.
            </p>
          </div>
          <img
            src={spotStrength}
            alt=""
            aria-hidden
            loading="lazy"
            width={640}
            height={640}
            className="h-32 w-32 justify-self-start md:h-44 md:w-44"
          />
        </header>

        <section aria-label="Condições da disputa" className="space-y-4 pb-14">
          {CONDITIONS.map((c) => (
            <article key={c.title} className="editorial-card p-5 md:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="font-display text-xl text-ink">{c.title}</h2>
                <span
                  className={`font-mono text-[11px] uppercase tracking-wider ${
                    c.status === "recuperado" ? "text-plum" : "text-coral"
                  }`}
                >
                  {c.status === "recuperado" ? "com dado" : "sem fonte"}
                </span>
              </div>
              <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
                {c.body}
              </p>
              <div className="mt-4">
                {c.status === "recuperado" ? (
                  <p className="border-l-[3px] border-plum bg-secondary px-4 py-3 text-sm text-ink">
                    {c.note}
                  </p>
                ) : (
                  <GapNote>{c.note}</GapNote>
                )}
              </div>
            </article>
          ))}
        </section>

        <section className="rule-top grid gap-8 pt-10 pb-14 md:grid-cols-[auto_1fr] md:items-center">
          <img
            src={spotQuota}
            alt=""
            aria-hidden
            loading="lazy"
            width={640}
            height={640}
            className="h-28 w-28 md:h-36 md:w-36"
          />
          <div>
            <h2 className="kicker">O que a cota faz e o que não faz</h2>
            <p className="mt-3 max-w-2xl font-display text-2xl leading-snug text-ink">
              Onde a cota incide, a participação passa de{" "}
              {REPRESENTATION_CONTRAST.quotaFloor}%. Onde não incide, cai para{" "}
              {REPRESENTATION_CONTRAST.majoritarian.share
                .toString()
                .replace(".", ",")}
              %.
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              A cota garante presença na lista. Não garante recurso, tempo de
              mídia, apoio de diretório nem lugar em chapa majoritária — e é aí
              que o funil se estreita.
            </p>
          </div>
        </section>

        <div className="pb-10">
          <CycleStrip activeId="recursos" />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
