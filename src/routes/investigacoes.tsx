import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { InvestigationIndex } from "@/components/editorial/InvestigationIndex";

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
      <header className="border-b border-ink py-12 md:py-16">
        <p className="kicker">Índice da investigação</p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl leading-none text-ink md:text-6xl">O que já publicamos e o que ainda está em trabalho</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Este índice identifica as frentes publicadas e as lacunas ainda abertas em cada investigação.
          O status descreve o estágio editorial do conteúdo, não a conclusão definitiva da apuração.
        </p>
        <nav aria-label="Fontes e transparência da investigação" className="mt-6 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-plum">
          <a href="/metodo" className="underline underline-offset-4">Conferir fontes e método</a>
          <a href="/metodo#correcoes" className="underline underline-offset-4">Histórico de correções</a>
          <a href="/sobre#correcoes" className="underline underline-offset-4">Solicitar correção</a>
        </nav>
      </header>
      <div className="py-12 md:py-16"><InvestigationIndex /></div>
    </PageShell>
  );
}