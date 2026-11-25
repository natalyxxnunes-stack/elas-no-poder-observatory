import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { GapNote } from "@/components/GapNote";
import { FotoDocumental } from "@/components/editorial/FotoDocumental";
import { CadernoDeFontes } from "@/components/editorial/CadernoDocumentalRevista";
import { FOTOS } from "@/data/fotos";
import { Secao } from "@/components/editorial/Secao";
import { ELEITAS_2026, ELEITAS_META } from "@/data/eleitas-2026";
import {
  CARGO_PLURAL,
  CARGO_ROTULO,
  SITUACAO,
  UF_NOME,
  falasDe,
  mandatoAnterior,
  porUF,
  receitaMajoritaria,
} from "@/data/eleitas-cruzamentos";
import { VOTACOES } from "@/data/votacoes-camara";
import { TRAJETORIA_ELEITAS, TRAJETORIA_META, type Trajetoria2022 } from "@/data/eleitas-trajetoria-2026";
import { MONITOR_CAMARA, MONITOR_META } from "@/data/monitor-camara";
import { formatInt as n, formatPct } from "@/lib/format-br";

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
      ? `${e.nome} (${e.partido}) foi eleita ${CARGO_ROTULO[e.cargo]} ${porUF(e.uf)} em 2026. Ficha com o registro no TSE.`
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
const SITE_URL = "https://quemsaoelas.com.br";

function local(uf: string): string {
  if (uf === "Brasil") return "";
  return ` ${porUF(uf)}`;
}

/** frase sobre 2022, no registro do TSE; partido atual entra quando mudou */
function frase2022(t: Trajetoria2022 | null, partidoAtual: string, exerceuNaCamara: boolean): string {
  if (!t) return "Não disputou a eleição geral de 2022.";
  const onde = `${t.cargo}${local(t.uf)} (${t.partido})`;
  const mudou = t.partido !== partidoAtual ? ` Em 2026, concorreu pelo ${partidoAtual}.` : "";
  if (t.resultado === "eleita") return `Eleita ${onde} em 2022.${mudou}`;
  if (t.resultado === "suplente" && exerceuNaCamara && t.cargo === "deputada federal")
    return `Candidata a ${onde} em 2022; ficou como suplente e assumiu a cadeira durante o mandato, segundo a Câmara.${mudou}`;
  if (t.resultado === "suplente") return `Candidata a ${onde} em 2022; ficou como suplente.${mudou}`;
  if (t.resultado === "não eleita") return `Candidata a ${onde} em 2022; não se elegeu.${mudou}`;
  return `Registrou candidatura a ${onde} em 2022, sem votação válida (registro indeferido, cancelado ou com renúncia).${mudou}`;
}

const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

function EleitaPage() {
  const { slug } = Route.useLoaderData();
  const e = achar(slug)!;
  const anterior = mandatoAnterior(e);
  const monitor = MONITOR_CAMARA.find((m) => m.ficha === e.slug) ?? null;
  const falas = falasDe(e);
  const receita = receitaMajoritaria(e);
  const naOutraPonta = ELEITAS_2026.filter((x) => x.uf === e.uf && x.cargo === e.cargo && x.slug !== e.slug);
  const lugar = porUF(e.uf);
  const traj = TRAJETORIA_ELEITAS[e.slug];

  return (
    <PageShell breadcrumb={[{ label: "Quem entrou", to: "/eleitas" }, { label: e.nome }]}>
      <header className="relative left-1/2 -ml-[50vw] w-screen bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-11 md:px-8 md:py-16 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:gap-12">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--art-gold)]">
              Quem entrou · Ficha eleitoral · {CARGO_ROTULO[e.cargo]}
            </p>
            <h1 className="mt-4 max-w-2xl break-words font-display text-[clamp(2.4rem,4.5vw,4.5rem)] font-semibold leading-[1.04] text-paper">
              {e.nome}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/85">
              Eleita {CARGO_ROTULO[e.cargo]} {lugar} em 2026
              {e.cargo === "governadora" ? (e.turno === 2 ? ", no 2º turno" : ", no 1º turno") : ""} ({e.partido}).
            </p>
            <p className="mt-5 text-xs text-paper/70">
              Ficha baseada no resultado eleitoral de 2026. Exercício do mandato é registrado separadamente,
              quando houver confirmação da posse.
            </p>
          </div>
          <div className="min-w-0">
            {FOTOS[`eleita-${e.slug}`] && FOTOS[`eleita-${e.slug}`]?.licenca !== "verificacao-pendente" ? (
              <FotoDocumental id={`eleita-${e.slug}`} />
            ) : (
              <aside className="border border-rule bg-paper p-6 md:p-8" aria-label="Identificação do registro eleitoral">
                <p className="text-xs font-semibold uppercase tracking-wide text-plum">Registro público · TSE · 2026</p>
                <p className="mt-6 font-display text-2xl font-semibold leading-snug text-ink">{CARGO_ROTULO[e.cargo]}</p>
                <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-rule pt-5">
                  <div>
                    <dt className="text-xs text-ink/65">Unidade federativa</dt>
                    <dd className="mt-1 text-lg font-semibold text-plum">{e.uf}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-ink/65">Partido</dt>
                    <dd className="mt-1 text-lg font-semibold text-plum">{e.partido}</dd>
                  </div>
                </dl>
                <p className="mt-6 text-xs leading-relaxed text-ink/70">
                  Identificação recomposta a partir da base eleitoral.
                  Fotografia individual ainda não disponível com direitos verificados.
                </p>
              </aside>
            )}
          </div>
        </div>
      </header>

      {e.uf === "AP" && (e.cargo === "deputada-federal" || e.cargo === "deputada-estadual") && (
        <section className="py-5" aria-label="Nota de atualização eleitoral do Amapá">
          <GapNote label="Resultado preservado — Amapá">
            A situação eleitoral desta ficha permanece na base do TSE de 02/11/2026, às 08h30min34s.
            Na extração de 25/11/2026, a situação de totalização das candidaturas proporcionais do Amapá
            veio sem informação (#NULO). Isso não comprova alteração do resultado. O TRE-AP confirmou
            a totalização de oito cadeiras federais e 24 estaduais; a conferência nominal nos relatórios
            oficiais permanece pendente. Consulte os{" "}
            <a className="underline underline-offset-4" href="https://www.tre-ap.jus.br/eleicoes/eleicoes-2026/resultados-eleicoes-geirais-2026-amapa">relatórios de totalização do TRE-AP</a>.
          </GapNote>
        </section>
      )}

      <section id="registro-eleita" className="border-b border-rule py-9 md:py-12">
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
          {receita !== null ? " · receita: prestação final do 1º turno, base de 04/11/2026" : ""}
        </p>
      </section>

      {traj ? (
        <section className="my-8 border-l-[5px] border-plum bg-cream px-5 py-9 md:px-8">
          <Secao nome="Trajetória" tipo="no registro do TSE" />
          <dl className="mt-4 grid max-w-3xl gap-x-8 sm:grid-cols-2">
            {[
              ["Ocupação declarada", traj.ocupacao ?? "não informada"],
              ["Escolaridade declarada", traj.instrucao ?? "não informada"],
            ].map(([k, v]) => (
              <div key={k} className="border-b border-rule py-3">
                <dt className="text-[13px] font-semibold text-ink/65">{k}</dt>
                <dd className="mt-0.5 text-[17px] text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 max-w-2xl font-display text-xl leading-snug text-ink">{frase2022(traj.em2022, e.partido, anterior !== null && anterior !== undefined)}</p>
          <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-ink/65">
            Ocupação e escolaridade como ela declarou ao TSE em 2026. A eleição de 2022 é a geral (deputados, Senado,
            governos e Presidência); mandatos municipais não entram nesta base.
          </p>
        </section>
      ) : null}

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

      {monitor ? (
        <section className="my-8 border-l-[5px] border-[var(--art-coral)] bg-cream px-5 py-9 md:px-8">
          <Secao nome="Na Câmara em 2026" tipo="monitor de mandato" />
          <dl className="mt-4 grid max-w-3xl gap-4 sm:grid-cols-3">
            <div className="border-t-[3px] border-plum pt-2">
              <dt className="text-[14px] text-ink/75">Votos registrados</dt>
              <dd className="font-display text-2xl text-ink">
                {n(monitor.votosRegistrados)} de {n(monitor.votacoesEmExercicio)}
                {monitor.votacoesEmExercicio >= 20 && (
                  <span className="ml-2 text-base text-ink/70">
                    {formatPct((100 * monitor.votosRegistrados) / monitor.votacoesEmExercicio)}
                  </span>
                )}
              </dd>
            </div>
            <div className="border-t-[3px] border-plum pt-2">
              <dt className="text-[14px] text-ink/75">Proposições assinadas</dt>
              <dd className="font-display text-2xl text-ink">{n(monitor.proposicoes)}</dd>
            </div>
            <div className="border-t-[3px] border-plum pt-2">
              <dt className="text-[14px] text-ink/75">Discursos</dt>
              <dd className="font-display text-2xl text-ink">{n(monitor.discursos)}</dd>
            </div>
          </dl>
          <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-ink/65">
            Votações nominais do plenário em que estava em exercício; proposições como autora ou coautora; de{" "}
            {MONITOR_META.periodo[0].split("-").reverse().join("/")} a {MONITOR_META.periodo[1].split("-").reverse().join("/")}. A
            Câmara inteira registrou voto em {formatPct(MONITOR_META.casaPresencaPct ?? 0)} das votações em que estava em exercício.
          </p>
          <a href="/monitor" className="mt-2 inline-flex min-h-11 items-center text-[15px] font-semibold text-plum">
            Ver todas as deputadas no monitor →
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
          Atuação no mandato, comissões, relatorias e votações a partir de 2027 entram nesta ficha depois da posse, cada
          informação com fonte e data.
        </GapNote>
      </section>

      <section className="border-t border-rule py-10">
        <Secao nome="Sobre esta ficha" pequeno />
        <dl className="mt-3 grid max-w-3xl gap-x-8 gap-y-3 text-[14px] leading-relaxed text-ink/80 sm:grid-cols-[10rem_1fr]">
          <dt className="font-semibold text-ink">Endereço permanente</dt>
          <dd className="break-all font-mono text-[13px]">{SITE_URL}/eleitas/{e.slug}</dd>
          <dt className="font-semibold text-ink">Atualizada com</dt>
          <dd>
            TSE, Candidatos 2026, base de {ELEITAS_META.baseGeneratedAt}; TSE, Candidatos 2022, base de{" "}
            {TRAJETORIA_META.base2022}
            {anterior ? "; Câmara dos Deputados, Dados Abertos, coleta de 27/10/2026" : ""}
            {receita !== null ? "; TSE, prestação de contas até 27/10/2026" : ""}.
          </dd>
          <dt className="font-semibold text-ink">Como foi feita</dt>
          <dd>
            Dados públicos de registro, recontados pelo observatório a partir dos arquivos oficiais. A trajetória de 2022
            liga os dois anos pelo CPF, que não é publicado.{" "}
            <a href="/metodo#fichas" className="text-plum underline underline-offset-2">
              Método das fichas
            </a>
          </dd>
          <dt className="font-semibold text-ink">Correções</dt>
          <dd>
            Erro ou informação faltando: contato@quemsaoelas.com.br. Cada correção fica registrada no{" "}
            <a href="/metodo#correcoes" className="text-plum underline underline-offset-2">
              Método
            </a>
            .
          </dd>
        </dl>
      </section>


      <CadernoDeFontes
        editoria="Identidade e documentos · Ficha individual"
        titulo="Registro de eleita e exercício do cargo são etapas diferentes."
        nota="As informações desta ficha derivam de registros eleitorais, sem fotos geradas por IA nem dados pessoais privados publicados. A eleição é verificável no TSE; atuação institucional depende de registros posteriores da Câmara, do Senado ou do governo correspondente."
        documentos={[
          { rotulo: "TSE · Base eleitoral", titulo: "Candidatos 2026", url: "https://dadosabertos.tse.jus.br/dataset/candidatos-2026", descricao: `Universo da ficha: ${CARGO_ROTULO[e.cargo]}, ${e.uf}, ${e.partido}. Arquivo gerado em ${ELEITAS_META.baseGeneratedAt}.` },
          { rotulo: "Quem são elas? · Fichas", titulo: "Método de cruzamento e proteção dos dados", url: "/metodo#fichas", descricao: "Definição de situação eleitoral, vínculo entre séries e critérios de publicação." },
        ]}
      />

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
