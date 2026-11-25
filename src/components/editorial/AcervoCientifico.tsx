import { ACERVO_CIENTIFICO as a } from "@/data/acervo-cientifico";
import { SectionBlock } from "@/components/editorial/SectionBlock";

/** Mesmo registro e citação em todas as páginas; nenhuma base individual é replicada. */
export function AcervoCientifico() {
  return (
    <SectionBlock id="acervo-cientifico" kicker="Preservação e citação" question="Pesquisa depositada no Zenodo" align="wide">
      <div className="grid min-w-0 gap-6 border-y border-rule py-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,.7fr)] md:gap-10">
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-plum">Conjunto de dados · Versão {a.versao} · {a.publicadoEm}</p>
          <h3 className="mt-3 font-display text-2xl leading-tight text-ink">{a.titulo}</h3>
          <p className="mt-3 text-sm leading-relaxed text-ink/85">
            O primeiro depósito reúne indicadores nacionais de financiamento, medianas proporcionais arredondadas,
            documentação metodológica e um script de seleção dos agregados. Fonte original: TSE, extrações de 25/11/2026.
            É uma seleção da pesquisa, sem microdados, fichas nominais ou documentos de terceiros.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink/85">
            As medianas do depósito têm critérios próprios de minimização; não substituem os valores exatos
            das análises do site. O registro com DOI facilita preservação e citação, sem equivaler a revisão por pares.
          </p>
          <a href={a.doiUrl} className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-plum underline underline-offset-4 focus-visible:outline-2">
            Acessar a versão {a.versao} no Zenodo <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="min-w-0 border-l-4 border-plum pl-4">
          <h4 className="font-display text-lg text-ink">Como citar esta versão</h4>
          <p className="mt-2 text-sm leading-relaxed text-ink/85">
            NUNES PINTO, Nataly. <cite>{a.titulo}</cite>. Versão {a.versao}. Zenodo, 2026.
          </p>
          <p className="mt-3 break-all font-mono text-[13px]"><a href={a.doiUrl} className="text-plum underline underline-offset-4">DOI: {a.doi}</a></p>
          <p className="mt-3 break-all text-[13px]"><a href={a.doiTodasVersoesUrl} className="text-plum underline underline-offset-4">Todas as versões: {a.doiTodasVersoes}</a></p>
          <p className="mt-3 break-all text-[13px]"><a href={a.orcidUrl} className="text-plum underline underline-offset-4">ORCID da autora: {a.orcid}</a></p>
          <p className="mt-3 text-xs leading-relaxed text-ink/80">CC BY 4.0 para documentação e agregados, MIT para o script, conforme os termos do depósito. Essas licenças não se estendem ao restante do site.</p>
        </div>
      </div>
    </SectionBlock>
  );
}
