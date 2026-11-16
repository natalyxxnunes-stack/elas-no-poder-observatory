import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { InvestigationIndex } from "@/components/editorial/InvestigationIndex";
import { AXES } from "@/data/architecture";

export const Route = createFileRoute("/investigacoes")({
  head: () => ({ meta: [
    { title: "Índice da investigação · Quem são elas?" },
    { name: "description", content: "Todas as frentes do projeto Quem são elas?, com o andamento editorial e as lacunas declaradas." },
    { property: "og:title", content: "Índice da investigação · Quem são elas?" },
    { property: "og:description", content: "O que está publicado, o que está publicado em parte e o que aguarda dado." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: InvestigacoesPage,
});

function InvestigacoesPage() {
  return (
    <PageShell breadcrumb={[{ label: "Projeto" }, { label: "Índice da investigação" }]}> 
      <header className="relative left-1/2 -ml-[50vw] w-screen bg-[var(--art-plum)] text-paper">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <p className="text-[13px] font-semibold text-[var(--art-gold)]">Transparência editorial · Índice da investigação</p>
          <h1 className="mt-5 max-w-5xl font-display text-[clamp(2.8rem,5.3vw,5.5rem)] leading-[1.04]">
            O que já publicamos e o que ainda está em trabalho
          </h1>
          <div className="mt-7 grid gap-5 border-t border-paper/35 pt-6 md:grid-cols-[12rem_1fr] md:items-start md:gap-9">
            <p className="font-display text-6xl leading-none text-[var(--art-gold)]" aria-label={`${AXES.length} entradas na investigação`}>
              {AXES.length}
            </p>
            <p className="max-w-3xl text-[16px] leading-relaxed text-paper/90">
              Cada frente apresenta sua pergunta, uma situação editorial e o que
              já está disponível. “Publicado”, “parcial” e “aguardando dado”
              descrevem o andamento de uma frente, não a confiabilidade de
              cada afirmação, que deve ser verificada na fonte original.
            </p>
          </div>
        </div>
      </header>
      <InvestigationIndex />
      <p className="py-9 text-[13px] leading-relaxed text-ink/75 md:py-12">
        Atualizações de bases, pendências e correções são documentadas nas páginas
        de origem. O andamento editorial pode mudar sem alterar imediatamente
        o conteúdo publicado.
      </p>

    </PageShell>
  );
}