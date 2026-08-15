import { Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { GapNote } from "@/components/GapNote";
import { axis } from "@/data/architecture";

/**
 * UnpublishedAxis — tela curta e honesta para eixos ainda não publicados.
 * O motivo vem de `unpublishedReason` em architecture.ts: nada é escrito aqui.
 */
export function UnpublishedAxis({ axisId }: { axisId: string }) {
  const a = axis(axisId);
  return (
    <PageShell>
      <section className="py-14 md:py-20">
        <p className="kicker">{a.label}</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.03] text-ink md:text-6xl">
          {a.question}
        </h1>

        <p className="mt-6 font-display text-2xl leading-snug text-plum md:text-3xl">
          Este eixo ainda não está publicado.
        </p>

        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {a.summary} {a.unpublishedReason}
        </p>

        <div className="mt-8 max-w-2xl">
          <GapNote label="Lacuna declarada">Dado não disponível não é zero.</GapNote>
        </div>

        <nav className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-rule pt-6 font-mono text-[11px] uppercase tracking-[0.14em]">
          <Link to="/" className="text-plum underline underline-offset-4">
            Dados 2026
          </Link>
          <Link to="/quem-sao-elas" className="text-plum underline underline-offset-4">
            Quem são elas?
          </Link>
          <Link to="/metodo" className="text-plum underline underline-offset-4">
            O método
          </Link>
        </nav>
      </section>
    </PageShell>
  );
}
