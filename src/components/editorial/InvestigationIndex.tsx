import { Link } from "@tanstack/react-router";
import { AXES, type Axis, type AxisStatus } from "@/data/architecture";

const STATUS_TONE: Record<AxisStatus, string> = {
  publicado: "text-plum",
  parcial: "text-ink",
  "aguardando dado": "text-coral-ink",
};

const GROUP_LABELS: Record<Axis["group"], string> = {
  investigacao: "Frentes de investigação",
  projeto: "O projeto",
  materiais: "Materiais para consulta",
};

const GROUP_SURFACE: Record<Axis["group"], string> = {
  investigacao: "bg-ink text-paper",
  projeto: "bg-[var(--art-plum)] text-paper",
  materiais: "bg-[#c53f22] text-paper",
};

/** Índice de transparência editorial: estados são texto, não um score de risco. */
export function InvestigationIndex() {
  const groups = (["investigacao", "projeto", "materiais"] as const).map((group) => ({
    group,
    items: AXES.filter((axis) => axis.group === group),
  }));

  return (
    <div className="space-y-0">
      {groups.map(({ group, items }) => (
        <section key={group} aria-labelledby={`grupo-${group}`} className="relative left-1/2 -ml-[50vw] w-screen">
          <header className={GROUP_SURFACE[group]}>
            <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-x-8 gap-y-3 px-5 py-8 md:px-8 md:py-10">
              <h2 id={`grupo-${group}`} className="font-display text-[clamp(2rem,3.6vw,3.4rem)] leading-tight">
                {GROUP_LABELS[group]}
              </h2>
              <p className="font-mono text-[13px] opacity-85">
                {items.length} {items.length === 1 ? "entrada" : "entradas"}
              </p>
            </div>
          </header>
          <ol className="bg-paper">
            {items.map((item, index) => (
              <li key={item.id} className="border-b border-rule">
                <div className="mx-auto grid max-w-7xl gap-x-10 gap-y-3 px-5 py-6 md:grid-cols-[4.5rem_minmax(0,1.3fr)_minmax(0,.7fr)] md:items-start md:px-8 md:py-8">
                  <span className="font-mono text-[13px] font-semibold text-plum" aria-label={`Entrada ${index + 1}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-[clamp(1.45rem,2.35vw,2rem)] leading-snug text-ink">
                      {item.publication === "published" ? (
                        <Link to={item.to} className="underline-offset-4 hover:text-plum hover:underline focus-visible:outline-2">
                          {item.label} <span className="text-plum" aria-hidden="true">↗</span>
                        </Link>
                      ) : item.label}
                    </h3>
                    <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink/85">
                      {item.question}
                    </p>
                  </div>
                  <div className="min-w-0 md:border-l md:border-rule md:pl-5">
                    <p className={`text-[13px] font-semibold ${STATUS_TONE[item.status]}`}>
                      Situação: {item.status}
                    </p>
                    <p className="mt-2 text-[13px] leading-relaxed text-ink/75">
                      {item.statusNote}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
