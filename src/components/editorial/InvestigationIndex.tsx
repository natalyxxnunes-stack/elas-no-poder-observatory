import { Link } from "@tanstack/react-router";
import { AXES, type Axis, type AxisStatus } from "@/data/architecture";
import { FINANCE_BASE_LABEL } from "@/data/tse-finance-snapshot";

/**
 * Índice editorial: a situação de cada frente está em palavras, com as lacunas
 * declaradas. A fotografia financeira vem da mesma base que alimenta o site,
 * para não repetir uma data de extração já substituída.
 */
const STATUS_TONE: Record<AxisStatus, string> = {
  publicado: "border-plum text-plum",
  parcial: "border-ink text-ink",
  "aguardando dado": "border-coral text-coral-ink",
};

const GROUP_LABELS: Record<Axis["group"], string> = {
  investigacao: "Investigação",
  projeto: "Projeto",
  materiais: "Materiais",
};

function notaAtual(item: Axis): string {
  if (item.id === "dinheiro") {
    return `Receitas declaradas na base do TSE gerada em ${FINANCE_BASE_LABEL}; os valores ainda estão sujeitos a complementações, retificações e julgamento das contas.`;
  }
  if (item.id === "sobre") {
    return "Autoria, princípios e compromissos editoriais.";
  }
  return item.statusNote;
}

export function InvestigationIndex() {
  const groups = (["investigacao", "projeto", "materiais"] as const).map((group) => ({
    group,
    items: AXES.filter((axis) => axis.group === group),
  }));

  return (
    <div className="space-y-14">
      {groups.map(({ group, items }) => (
        <section key={group} aria-labelledby={`grupo-${group}`}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-2 border-b border-ink pb-4">
            <h2 id={`grupo-${group}`} className="font-display text-3xl text-ink md:text-4xl">
              {GROUP_LABELS[group]}
            </h2>
            <p className="font-mono text-[13px] text-ink/65">
              {items.length} {items.length === 1 ? "frente" : "frentes"}
            </p>
          </div>
          <ol>
            {items.map((item) => (
              <li
                key={item.id}
                className="grid gap-x-10 gap-y-4 border-b border-rule py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] md:py-8"
              >
                <div>
                  <h3 className="font-display text-2xl leading-tight text-ink">
                    {item.publication === "published" ? (
                      <Link
                        to={item.to}
                        className="hover:text-plum hover:underline hover:underline-offset-4 focus-visible:outline-2"
                      >
                        {item.label}
                      </Link>
                    ) : item.label}
                  </h3>
                  <p className="mt-3">
                    <span className={`inline-block border px-2 py-1 text-[13px] font-semibold ${STATUS_TONE[item.status]}`}>
                      {item.status}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="font-display text-lg leading-snug text-ink">{item.question}</p>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/75">{notaAtual(item)}</p>
                  {item.publication !== "published" && item.unpublishedReason && (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      Motivo da indisponibilidade: {item.unpublishedReason}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
