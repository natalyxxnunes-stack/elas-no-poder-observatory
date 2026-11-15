import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PerfilCard } from "@/components/editorial/Pioneiras";
import {
  EM_APURACAO,
  PERFIS_PIONEIRAS,
  PIONEIRAS_CRITERIO,
  SP_1950,
  RJ_1982,
  RJ_1986,
} from "@/data/perfis-pioneiras";
import { PIONEIRAS } from "@/data/pioneiras";

export const Route = createFileRoute("/pioneiras/")({
  head: () => ({
    meta: [
      { title: "Pioneiras · Quem são elas?" },
      { name: "description", content: PIONEIRAS_CRITERIO },
      { property: "og:title", content: "Pioneiras · Quem são elas?" },
      { property: "og:description", content: PIONEIRAS_CRITERIO },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PioneirasPage,
});

/** Arquivos oficiais utilizados nos dois perfis publicados; não são fac-símiles. */
const REGISTROS_ELEITORAIS = [
  { ano: "1950", uf: "SP", nome: "Pagu · Assembleia de São Paulo", arquivo: SP_1950.arquivoSp, sha: SP_1950.arquivoSpSha256 },
  { ano: "1982", uf: "RJ", nome: "Lélia Gonzalez · Câmara Federal", arquivo: RJ_1982.arquivo, sha: RJ_1982.arquivoSha256 },
  { ano: "1986", uf: "RJ", nome: "Lélia Gonzalez · Assembleia do Rio de Janeiro", arquivo: RJ_1986.arquivo, sha: RJ_1986.arquivoSha256 },
] as const;

function PioneirasPage() {
  const publicados = PERFIS_PIONEIRAS.filter((p) => p.to);
  const emApuracao = PERFIS_PIONEIRAS.filter((p) => !p.to);
  const comPerfil = new Set(PERFIS_PIONEIRAS.map((p) => p.id));
  const naLinha = PIONEIRAS.filter((p) => !comPerfil.has(p.id));

  return (
    <PageShell breadcrumb={[{ label: "Pioneiras" }]}>
      <header className="relative left-1/2 -ml-[50vw] w-screen bg-plum-deep text-paper">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-wide text-lilac">
            Série · {publicados.length} perfis publicados
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.8rem,5.5vw,4.7rem)] font-semibold leading-[1.02]">
            Quem abriu o caminho
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/85">
            {PIONEIRAS_CRITERIO} Quando ela disputou uma eleição, o perfil traz a votação oficial,
            recontada, e separa o que tem documento do que é reputação.
          </p>
          <a href="#perfis" className="mt-6 inline-flex min-h-11 items-center font-semibold text-paper underline decoration-lilac decoration-2 underline-offset-4">
            Conhecer as trajetórias ↘
          </a>
        </div>
      </header>

      <section aria-labelledby="perfis" className="relative left-1/2 -ml-[50vw] w-screen bg-cream">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <h2 id="perfis" className="sr-only">
            Perfis publicados
          </h2>
          <ul className="grid gap-5 md:grid-cols-2">
            {publicados.map((p, i) => (
              <PerfilCard key={p.id} p={p} n={i + 1} />
            ))}
          </ul>

          <details className="group mt-8 border-y border-rule">
            <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 font-semibold text-plum focus-visible:outline-2 [&::-webkit-details-marker]:hidden">
              <span className="font-display text-xl leading-snug">Consultar os arquivos eleitorais que sustentam os perfis</span>
              <span className="shrink-0 text-sm"><span className="group-open:hidden">Abrir +</span><span className="hidden group-open:inline">Fechar −</span></span>
            </summary>
            <div className="pb-6">
              <p className="mb-5 max-w-3xl text-sm leading-relaxed text-ink/75">
                Inventário dos arquivos de votação nominal por UF utilizados na recontagem dos perfis
                de Pagu e Lélia Gonzalez. Os nomes e códigos de integridade identificam os dados
                consultados; esta listagem não é uma reprodução visual dos documentos do TSE.
              </p>
              <dl className="space-y-5">
                {REGISTROS_ELEITORAIS.map((registro) => (
                  <div key={registro.arquivo} className="grid gap-2 border-l-2 border-plum pl-4 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-5">
                    <dt className="font-mono text-sm font-semibold text-plum">{registro.ano} · {registro.uf}</dt>
                    <dd className="min-w-0">
                      <p className="font-semibold text-ink">{registro.nome}</p>
                      <p className="mt-1 break-all font-mono text-[12px] leading-relaxed text-ink/75">{registro.arquivo}</p>
                      <p className="mt-1 break-all font-mono text-[12px] leading-relaxed text-ink/65">SHA-256 do arquivo por UF: {registro.sha}</p>
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-[13px] leading-relaxed text-ink/70">
                Fonte: TSE, Dados Abertos, resultados eleitorais de 1950, 1982 e 1986.
                Procedimentos e limites da recontagem são explicados nos perfis.
              </p>
            </div>
          </details>

          {emApuracao.map((p) => (
            <div key={p.id} className="mt-5 border border-dashed border-plum/40 p-5 md:p-6">
              <p className="inline-block border border-muted-foreground/60 px-2 py-0.5 text-[13px] text-muted-foreground font-semibold">
                Próximo perfil · em apuração
              </p>
              <p className="mt-3 font-display text-2xl leading-tight text-ink/75">
                {p.name} <span className="text-base text-muted-foreground">· {p.years}</span>
              </p>
              <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                {p.linhaFina} {EM_APURACAO[p.id]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {naLinha.length > 0 && (
        <section aria-labelledby="linha" className="relative left-1/2 -ml-[50vw] w-screen bg-muted">
          <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
            <p className="text-[13px] text-plum font-semibold">Na linha do tempo dos direitos</p>
            <h2 id="linha" className="mt-3 max-w-3xl font-display text-3xl leading-tight text-ink">
              Outras mulheres que aparecem na história do voto
            </h2>
            <ul className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {naLinha.map((p) => (
                <li key={p.id} className="border-t border-plum/30 pt-3">
                  <p className="text-[13px] text-muted-foreground font-semibold">
                    {p.milestoneYear ?? p.years ?? ""}
                  </p>
                  <p className="mt-1 font-display text-xl leading-tight text-ink">{p.name}</p>
                  <p className="mt-1 text-[15px] leading-snug text-ink/80">{p.mark}</p>
                </li>
              ))}
            </ul>
            <Link
              to="/direitos"
              hash="pioneiras"
              className="mt-8 inline-flex min-h-11 items-center font-medium text-plum underline decoration-plum underline-offset-4"
            >
              Ver os cards na linha do tempo de Direitos →
            </Link>
          </div>
        </section>
      )}
    </PageShell>
  );
}
