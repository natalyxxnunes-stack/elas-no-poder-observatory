import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Secao } from "@/components/editorial/Secao";
import { ComoSabemos } from "@/components/editorial/ComoSabemos";
import { Registro } from "@/components/editorial/Registro";
import { COAUTORIA_LIGACOES, COAUTORIA_META, COAUTORIA_NOS } from "@/data/coautoria-camara";
import { formatInt as n, formatPct } from "@/lib/format-br";

const POR_ID = new Map(COAUTORIA_NOS.map((x) => [x.id, x]));
const SOZINHA = COAUTORIA_NOS.reduce((a, x) => a + x.sozinha, 0);
const PCT_SOZINHA = (100 * SOZINHA) / COAUTORIA_META.proposicoes;
const PEQUENAS = COAUTORIA_LIGACOES.filter((l) => l.pesoAte20 > 0);
const COM_COAUTORA = new Set(PEQUENAS.flatMap((l) => [l.a, l.b])).size;

const titulo = `${formatPct(PCT_SOZINHA)} das proposições das deputadas em 2026 têm uma só autora`;

export const Route = createFileRoute("/coautoria")({
  head: () => ({
    meta: [
      { title: "Quem assina junto | Quem são elas?" },
      {
        name: "description",
        content:
          "A rede documentada de coautoria entre as deputadas federais em 2026: quem assina projeto com quem, dentro e fora do partido, com cada ligação ligada ao documento da Câmara.",
      },
      { property: "og:title", content: titulo },
    ],
  }),
  component: CoautoriaPage,
});

/** matriz partido × partido das ligações em proposições com até 20 autores */
function matriz() {
  const m = new Map<string, number>();
  for (const l of PEQUENAS) {
    const pa = POR_ID.get(l.a)!.partido;
    const pb = POR_ID.get(l.b)!.partido;
    const [x, y] = [pa, pb].sort();
    m.set(`${x}|${y}`, (m.get(`${x}|${y}`) ?? 0) + l.pesoAte20);
  }
  const total = new Map<string, number>();
  for (const [k, v] of m) for (const p of new Set(k.split("|"))) total.set(p, (total.get(p) ?? 0) + v);
  const partidos = [...total.entries()].sort((a, b) => b[1] - a[1]).map(([p]) => p).slice(0, 12);
  return { m, partidos, max: Math.max(...m.values()) };
}

const doc = (e: string) => {
  const [rotulo, id] = e.split("|");
  return { rotulo, url: `https://www.camara.leg.br/propostas-legislativas/${id}` };
};

function CoautoriaPage() {
  const { m, partidos, max } = matriz();
  const pares = [...PEQUENAS].sort((a, b) => b.pesoAte20 - a.pesoAte20).slice(0, 15);
  const entre = PEQUENAS.filter((l) => l.entrePartidos).length;
  return (
    <PageShell breadcrumb={[{ label: "No poder", to: "/como-votaram" }, { label: "Quem assina junto" }]}>
      <header className="py-10 md:py-14">
        <Secao nome="Quem assina junto" tipo="rede documentada" />
        <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-tight text-plum md:text-6xl">{titulo}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
          De {n(COAUTORIA_META.proposicoes)} projetos (PL, PLP, PEC e PDL) apresentados com ao menos uma deputada entre os autores
          em 2026, {n(SOZINHA)} foram assinados por ela sozinha. Só {n(COM_COAUTORA)} das {n(COAUTORIA_META.deputadas)} deputadas
          dividiram a autoria de algum projeto com outra deputada, fora os abaixo-assinados com mais de 20 nomes.
        </p>
      </header>

      <div className="grid max-w-4xl gap-4 border-y border-rule py-5 sm:grid-cols-3">
        <div>
          <p className="font-display text-4xl text-plum">{n(PEQUENAS.length)}</p>
          <p className="text-[14px] text-ink/80">pares de deputadas que assinaram ao menos um projeto juntas</p>
        </div>
        <div>
          <p className="font-display text-4xl text-plum">{n(entre)}</p>
          <p className="text-[14px] text-ink/80">desses pares são de partidos diferentes</p>
        </div>
        <div>
          <p className="font-display text-4xl text-plum">{n(COAUTORIA_META.proposicoesComMaisDe20Autores)}</p>
          <p className="text-[14px] text-ink/80">projetos com mais de 20 autores, contados à parte</p>
        </div>
      </div>

      <section className="py-12" aria-labelledby="matriz">
        <Secao nome="Entre partidos" />
        <h2 id="matriz" className="mt-3 max-w-3xl font-display text-2xl leading-snug text-ink md:text-3xl">
          A coautoria entre deputadas se concentra em poucas siglas
        </h2>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink/80">
          Cada célula soma as vezes que uma deputada de um partido assinou um projeto junto com uma deputada do outro (ou do
          mesmo, na diagonal). Projetos com até 20 autores; partido no cadastro da Câmara em {COAUTORIA_META.coletaEm}.
        </p>
        <div tabIndex={0} role="region" aria-label="Matriz de coautoria entre partidos" className="mt-5 overflow-x-auto">
          <table className="border-collapse text-[13px]">
            <caption className="sr-only">Coautorias entre deputadas, por par de partidos</caption>
            <thead>
              <tr>
                <th scope="col" className="p-1" />
                {partidos.map((p) => (
                  <th key={p} scope="col" className="h-24 w-11 p-1 align-bottom font-mono font-semibold text-ink">
                    <span className="inline-block -rotate-45 whitespace-nowrap">{p}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {partidos.map((pa) => (
                <tr key={pa}>
                  <th scope="row" className="pr-2 text-right font-mono font-semibold text-ink">
                    {pa}
                  </th>
                  {partidos.map((pb) => {
                    const [x, y] = [pa, pb].sort();
                    const v = m.get(`${x}|${y}`) ?? 0;
                    // duas faixas de tom, para o texto sempre ter contraste: claro com tinta, escuro com branco
                    const f = v / max;
                    const a = !v ? 0 : f < 0.4 ? 0.12 + 0.33 * (f / 0.4) : 0.75 + 0.25 * ((f - 0.4) / 0.6);
                    return (
                      <td
                        key={pb}
                        className="size-11 border border-rule text-center font-mono"
                        style={{ background: v ? `color-mix(in srgb, var(--color-plum, #4b1d6b) ${Math.round(a * 100)}%, transparent)` : undefined, color: a >= 0.75 ? "white" : undefined }}
                      >
                        {v || ""}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="pb-12" aria-labelledby="pares">
        <Secao nome="Os pares" />
        <h2 id="pares" className="mt-3 font-display text-2xl leading-snug text-ink md:text-3xl">Quem mais assinou junto</h2>
        <ol className="mt-5 max-w-4xl divide-y divide-rule border-y border-rule">
          {pares.map((l) => {
            const a = POR_ID.get(l.a)!;
            const b = POR_ID.get(l.b)!;
            return (
              <li key={`${l.a}-${l.b}`} className="grid gap-2 py-3 sm:grid-cols-[1fr_auto] sm:gap-6">
                <div>
                  <p className="font-display text-lg text-ink">
                    {a.nome} <span className="text-[14px] text-ink/65">({a.partido}-{a.uf})</span> e {b.nome}{" "}
                    <span className="text-[14px] text-ink/65">({b.partido}-{b.uf})</span>
                  </p>
                  <p className="text-[13px] text-ink/70">
                    Exemplos:{" "}
                    {l.exemplos.map((e, i) => {
                      const d = doc(e);
                      return (
                        <span key={e}>
                          {i > 0 && ", "}
                          <a href={d.url} className="underline underline-offset-4" rel="noopener">
                            {d.rotulo}
                          </a>
                        </span>
                      );
                    })}
                  </p>
                </div>
                <p className="font-mono text-[15px] text-ink sm:text-right">
                  {n(l.pesoAte20)} {l.pesoAte20 === 1 ? "projeto" : "projetos"}
                  {l.entrePartidos && <span className="block text-[13px] text-ink/65">partidos diferentes</span>}
                </p>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="max-w-3xl space-y-4 pb-12">
        <Registro tipo="fato">
          A maior parte da produção legislativa das deputadas em 2026 é individual, e a coautoria entre elas aparece sobretudo
          entre PSOL, Rede e PT.
        </Registro>
        <Registro tipo="interpretacao">
          Autoria compartilhada é uma forma de cooperação entre outras (requerimento, frente parlamentar, voto). O dado mostra
          que, na hora de assinar projeto, as deputadas trabalharam sobretudo sozinhas em 2026; ele não mede a articulação que
          acontece por outros caminhos.
        </Registro>
        <Registro tipo="hipotese" registradaEm="04/11/2026" status="aberta">
          Em ano eleitoral, assinar sozinha rende mais visibilidade individual do que dividir autoria. Para testar: comparar com
          2023, ano sem eleição, com a mesma regra.
        </Registro>
      </section>

      <ComoSabemos
        fonte="Câmara dos Deputados, Dados Abertos (API v2): /proposicoes e /proposicoes/{id}/autores"
        universo={`PL, PLP, PEC e PDL apresentados entre ${COAUTORIA_META.periodo.map((d) => d.split("-").reverse().join("/")).join(" e ")} com ao menos uma deputada entre os autores.`}
        base={`Coleta em ${COAUTORIA_META.coletaEm}.`}
        calculo={
          <>
            Ligação = duas deputadas na lista de autores do mesmo projeto. Projetos com mais de 20 autores (abaixo-assinados,
            frentes) ficam fora da matriz e da lista de pares, e estão no arquivo de dados. Script:
            scripts/monitor/coautoria_camara.py. Os dados também alimentam o{" "}
            <Link to="/monitor" className="underline decoration-plum underline-offset-4">
              monitor de mandato
            </Link>
            .
          </>
        }
        limites={[
          "Mede coautoria, não influência, alinhamento ou amizade.",
          "Coautoria com deputados homens não entra na rede, que olha só para as deputadas; os homens contam para saber o tamanho da lista de autores.",
          "Requerimentos, emendas e assinaturas em frentes parlamentares não entram.",
        ]}
      />
    </PageShell>
  );
}
