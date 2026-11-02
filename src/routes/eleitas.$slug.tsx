import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { GapNote } from "@/components/GapNote";
import { FotoDocumental } from "@/components/editorial/FotoDocumental";
import { Secao } from "@/components/editorial/Secao";
import { ELEITAS_2026, ELEITAS_META } from "@/data/eleitas-2026";
import {
  CARGO_PLURAL,
  CARGO_ROTULO,
  SITUACAO,
  UF_NOME,
  falasDe,
  mandatoAnterior,
  receitaMajoritaria,
} from "@/data/eleitas-cruzamentos";
import { VOTACOES } from "@/data/votacoes-camara";
import { formatInt as n } from "@/lib/format-br";

const achar = (slug: string) => ELEITAS_2026.find((e) => e.slug === slug);

export const Route = createFileRoute("/eleitas/$slug")({
  loader: ({ params }) => {
    if (!achar(params.slug)) throw notFound();
    return { slug: params.slug };
  },
  head: ({ params }) => {
    const e = achar(params.slug);
    const title = e ? `${e.nome}, ${CARGO_ROTULO[e.cargo]} (${e.partido}-${e.uf}) | Quem são elas?` : "Eleita | Quem são elas?";
    const desc = e
      ? `${e.nome} (${e.partido}) foi eleita ${CARGO_ROTULO[e.cargo]} por ${UF_NOME[e.uf] ?? e.uf} em 2026. Ficha com o registro no TSE.`
      : "";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: EleitaPage,
});

const COR: Record<string, string> = { BRANCA: "branca", PARDA: "parda", PRETA: "preta", "INDÍGENA": "indígena", AMARELA: "amarela" };
const dataBR = (iso: string) => iso.split("-").reverse().join("/");
const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

function EleitaPage() {
  const { slug } = Route.useLoaderData();
  const e = achar(slug)!;
  const anterior = mandatoAnterior(e);
  const falas = falasDe(e);
  const receita = receitaMajoritaria(e);
  const naOutraPonta = ELEITAS_2026.filter((x) => x.uf === e.uf && x.cargo === e.cargo && x.slug !== e.slug);
  const lugar = e.uf === "DF" ? "pelo Distrito Federal" : `por ${UF_NOME[e.uf] ?? e.uf}`;

  return (
    <PageShell breadcrumb={[{ label: "Quem entrou", to: "/eleitas" }, { label: e.nome }]}>
      <header className="grid gap-8 py-10 md:grid-cols-[1.4fr_1fr] md:items-end md:py-14">
        <div>
          <Secao nome="Quem entrou" tipo={CARGO_ROTULO[e.cargo]} />
          <h1 className="mt-4 font-display text-[2.6rem] font-semibold leading-[1.02] text-plum md:text-7xl">{e.nome}</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/85">
            Eleita {CARGO_ROTULO[e.cargo]} {lugar} em 2026
            {e.cargo === "governadora" ? (e.turno === 2 ? ", no 2º turno" : ", no 1º turno") : ""} ({e.partido}).
          </p>
        </div>
        <FotoDocumental id={`eleita-${e.slug}`} />
      </header>

      <section className="py-6">
        <Secao nome="O registro" tipo="TSE" />
        <dl className="mt-4 grid max-w-3xl gap-x-8 sm:grid-cols-2">
          {[
            ["Cargo", CARGO_ROTULO[e.cargo]],
            ["Estado", UF_NOME[e.uf] ?? e.uf],
            ["Partido", e.partido],
            ["Cor/raça declarada", COR[e.corRaca] ?? e.corRaca.toLowerCase()],
            ["Situação no TSE", SITUACAO[e.situacao] ?? e.situacao.toLowerCase()],
            ...(receita !== null ? [["Receita declarada na campanha", brl(receita)]] : []),
          ].map(([k, v]) => (
            <div key={k} className="border-b border-rule py-3">
              <dt className="text-[13px] font-semibold text-ink/65">{k}</dt>
              <dd className="mt-0.5 text-[17px] text-ink">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 font-mono text-[13px] text-muted-foreground">
          TSE, Candidatos 2026, base de {ELEITAS_META.baseGeneratedAt}
          {receita !== null ? " · receita: prestação de contas até 27/10/2026, contas em andamento" : ""}
        </p>
      </section>

      {anterior ? (
        <section className="py-8">
          <Secao nome="No mandato anterior" tipo="Câmara, seis votações" />
          <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-ink/80">
            Como deputada federal, ela estava em exercício em ao menos uma das seis votações de mérito que o observatório
            acompanha. Em 2026: {anterior.desfecho2026}.
          </p>
          <ul className="mt-4 max-w-3xl divide-y divide-rule border-y border-rule">
            {VOTACOES.map((v) => {
              const x = anterior.votos[v.id];
              return (
                <li key={v.id} className="grid gap-1 py-3 sm:grid-cols-[1fr_auto] sm:gap-6">
                  <div>
                    <p className="font-display text-lg leading-snug text-ink">{v.titulo}</p>
                    <p className="text-[13px] leading-snug text-ink/65">
                      {dataBR(v.data)} · Sim = {v.sim}
                    </p>
                  </div>
                  <p className="font-mono text-[15px] text-ink sm:text-right">
                    {x ? x.voto : "fora do mandato"}
                    {x?.alinhamento === "contra a bancada" ? (
                      <span className="block text-[13px] text-ink/65">contra a maioria do {x.partido}</span>
                    ) : null}
                  </p>
                </li>
              );
            })}
          </ul>
          <a href="/como-votaram" className="mt-3 inline-flex min-h-11 items-center text-[15px] font-semibold text-plum">
            Ver a matriz de votação →
          </a>
        </section>
      ) : null}

      {falas.length ? (
        <section className="py-8">
          <Secao nome="Na voz delas" tipo="falas conferidas" />
          <ul className="mt-4 grid max-w-4xl gap-5">
            {falas.map((f) => (
              <li key={f.id} className="bg-cream p-5">
                <blockquote>
                  <p className="font-display text-xl italic leading-snug text-ink">“{f.fala.split(" [...]")[0]}”</p>
                  <footer className="mt-3 text-[14px] leading-relaxed text-ink/75">
                    {f.onde}, {f.data} ·{" "}
                    <a href={f.fonteUrl} target="_blank" rel="noreferrer" className="text-plum underline underline-offset-2">
                      {f.fonteRotulo}
                    </a>
                  </footer>
                </blockquote>
                <a href={`/na-voz-delas#${f.id}`} className="mt-2 inline-flex min-h-11 items-center text-[14px] font-semibold text-plum">
                  Contexto e dado oficial →
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="py-8">
        <GapNote label="Em apuração">
          Trajetória, atuação no mandato, comissões e votações a partir de 2027 entram nesta ficha depois da posse, cada
          informação com fonte. Correções e acréscimos: contato@quemsaoelas.com.br.
        </GapNote>
      </section>

      {naOutraPonta.length ? (
        <section className="py-8 pb-16">
          <Secao nome={`${CARGO_PLURAL[e.cargo]} eleitas ${lugar}`} pequeno />
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
            {naOutraPonta.map((x) => (
              <li key={x.slug}>
                <a href={`/eleitas/${x.slug}`} className="inline-flex min-h-11 items-center text-[15px] text-plum underline underline-offset-4">
                  {x.nome} ({x.partido})
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6">
            <a href="/eleitas" className="text-[15px] font-semibold text-plum">
              Todas as {n(ELEITAS_2026.length)} eleitas →
            </a>
          </p>
        </section>
      ) : (
        <p className="pb-16">
          <a href="/eleitas" className="text-[15px] font-semibold text-plum">
            Todas as {n(ELEITAS_2026.length)} eleitas →
          </a>
        </p>
      )}
    </PageShell>
  );
}
