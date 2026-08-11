/**
 * Marcador explícito de lacuna. Usado onde o snapshot publicado não permitiu
 * recuperar o conteúdo integral. Nunca trocar por dado inventado.
 */
export function GapNote({
  children,
  label = "Lacuna de fonte",
}: {
  children: React.ReactNode;
  label?: string;
}) {
  return (
    <p className="gap-note" data-gap="true">
      <span className="font-semibold uppercase tracking-wider text-coral">
        {label} ·{" "}
      </span>
      {children}
    </p>
  );
}
