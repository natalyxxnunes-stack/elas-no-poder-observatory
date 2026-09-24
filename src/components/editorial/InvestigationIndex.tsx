import { Link } from "@tanstack/react-router";
import { AXES, type Axis, type AxisStatus } from "@/data/architecture";

const STATUS_TONE: Record<AxisStatus, string> = {
  publicado: "border-forest text-forest",
  parcial: "border-ink text-ink",
  "aguardando dado": "border-coral text-coral-ink",
};

const GROUP_LABELS: Record<Axis["group"], string> = {
  investigacao: "Investigação",
  projeto: "Projeto",
  materiais: "Materiais",
};

export function InvestigationIndex() {
  const groups = (["investigacao", "projeto", "materiais"] as const).map((group) => ({
    group,
    items: AXES.filter((axis) => axis.group === group),
  }));

  return (
    <div className="space-y-12">
      {groups.map(({ group, items }) => (
        <section key={group} aria-labelledby={`grupo-${group}`}>
          <h2 id={`grupo-${group}`} className="font-display text-3xl text-ink">{GROUP_LABELS[group]}</h2>
          <ul className="mt-5 grid gap-px border border-rule bg-rule md:grid-cols-2">
            {items.map((item) => (
              <li key={item.id} className="bg-paper p-5 md:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="font-display text-xl text-ink">
                    {item.publication === "published" ? (
                      <Link to={item.to} className="underline decoration-rule underline-offset-4 hover:decoration-plum">{item.label}</Link>
                    ) : item.label}
                  </h3>
                  <span className={`border px-2 py-1 font-mono text-[10px] uppercase ${STATUS_TONE[item.status]}`}>{item.status}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.question}</p>
                <p className="mt-4 border-l-2 border-rule pl-3 font-mono text-[11px] leading-relaxed text-ink/75">{item.statusNote}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}