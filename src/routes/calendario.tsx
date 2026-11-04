import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { Secao } from "@/components/editorial/Secao";
import { CALENDARIO, CALENDARIO_META, type TipoData } from "@/data/calendario";

const description =
  "As datas da política que importam para as mulheres eleitas em 2026, da prestação de contas à posse, e o que o Quem são elas? publica em cada uma.";

export const Route = createFileRoute("/calendario")({
  head: () => ({
    meta: [
      { title: "Calendário | Quem são elas?" },
      { name: "description", content: description },
      { property: "og:title", content: "Da urna à posse: o calendário do Quem são elas?" },
      { property: "og:description", content: description },
    ],
  }),
  component: CalendarioPage,
});

const MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
const TIPO: Record<TipoData, string> = { eleitoral: "Justiça Eleitoral", institucional: "Posse e Congresso", memória: "Data de memória" };
const COR_TIPO: Record<TipoData, string> = {
  eleitoral: "border-plum",
  institucional: "border-ink",
  memória: "border-coral",
};

function CalendarioPage() {
  // "hoje" só no navegador: a página é gerada antes e não pode congelar a data do build
  const [hoje, setHoje] = useState<string | null>(null);
  useEffect(() => {
    const d = new Date();
    setHoje(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`);
  }, []);
  const porMes = new Map<string, typeof CALENDARIO[number][]>();
  for (const c of CALENDARIO) {
    const k = c.data.slice(0, 7);
    porMes.set(k, [...(porMes.get(k) ?? []), c]);
  }
  const proxima = hoje ? CALENDARIO.find((c) => c.data >= hoje) : null;

  return (
    <PageShell breadcrumb={[{ label: "Calendário" }]}>
      <header className="py-10 md:py-14">
        <Secao nome="Calendário" tipo="da urna à posse" />
        <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-tight text-plum md:text-6xl">
          Da urna à posse: as datas que decidem quem chega ao poder
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
          A eleição acabou em outubro, os mandatos começam em janeiro e fevereiro, e no meio as contas são julgadas e os diplomas,
          entregues. Cada data traz a fonte e, quando há, o que o observatório publica nela.
        </p>
        {proxima && (
          <p className="mt-6 inline-block border-l-4 border-coral bg-card px-4 py-3 text-[15px] text-ink" aria-live="polite">
            Próxima data:{" "}
            <a href={`#${proxima.data}`} className="font-semibold underline decoration-plum underline-offset-4">
              {Number(proxima.data.slice(8))} de {MESES[Number(proxima.data.slice(5, 7)) - 1]}, {proxima.titulo.toLowerCase()}
            </a>
          </p>
        )}
      </header>

      <ul aria-label="Legenda" className="mb-6 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-ink/80">
        {(Object.keys(TIPO) as TipoData[]).map((t) => (
          <li key={t} className="inline-flex items-center gap-2">
            <span className={`h-4 border-l-4 ${COR_TIPO[t]}`} aria-hidden="true" />
            {TIPO[t]}
          </li>
        ))}
      </ul>

      <div className="space-y-12 pb-12">
        {[...porMes.entries()].map(([mes, itens]) => (
          <section key={mes} aria-labelledby={`m-${mes}`}>
            <h2 id={`m-${mes}`} className="border-b-[3px] border-plum pb-2 font-display text-2xl italic text-plum">
              {MESES[Number(mes.slice(5)) - 1]} de {mes.slice(0, 4)}
            </h2>
            <ol className="mt-2 divide-y divide-rule">
              {itens.map((c) => {
                const passou = hoje !== null && c.data < hoje;
                return (
                  <li key={c.data + c.titulo} id={c.data} className={`grid scroll-mt-24 gap-3 py-5 md:grid-cols-[7rem_1fr_1fr] md:gap-8`}>
                    <p className={`border-l-4 pl-3 ${COR_TIPO[c.tipo]}`}>
                      <span className="block font-display text-4xl leading-none text-ink">{Number(c.data.slice(8))}</span>
                      <span className="mt-1 block text-[13px] text-ink/70">{TIPO[c.tipo]}</span>
                      {passou && <span className="mt-1 block text-[13px] font-semibold text-ink/70">já passou</span>}
                    </p>
                    <div>
                      <h3 className="font-display text-xl leading-snug text-ink">{c.titulo}</h3>
                      <p className="mt-1 text-[15px] leading-relaxed text-ink/80">{c.explica}</p>
                      <a href={c.fonte.url} className="mt-1 inline-block text-[13px] text-ink/70 underline underline-offset-4" rel="noopener">
                        Fonte: {c.fonte.nome}
                      </a>
                    </div>
                    {c.pauta ? (
                      <div className="border-t-[3px] border-plum bg-card p-4 md:border-l-0">
                        <p className="text-[13px] font-semibold text-plum">O que o observatório publica</p>
                        <p className="mt-1 text-[15px] leading-relaxed text-ink">{c.pauta}</p>
                      </div>
                    ) : (
                      <div aria-hidden="true" />
                    )}
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </div>
      <p className="pb-14 text-[13px] text-muted-foreground">
        Datas conferidas em {CALENDARIO_META.conferidoEm}. Prazo eleitoral pode mudar por resolução do TSE; quando mudar, a
        data é corrigida aqui com registro no Método.
      </p>
    </PageShell>
  );
}
