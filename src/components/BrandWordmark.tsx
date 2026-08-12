/**
 * BrandWordmark — a marca "Quem são elas?" com a palavra "elas" em itálico e
 * roxo. Só "elas" muda; o resto segue a cor herdada do contexto.
 */
export function BrandWordmark({
  className = "",
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "cream";
}) {
  return (
    <span className={className}>
      Quem são{" "}
      <em className={tone === "cream" ? "italic text-plum-soft" : "italic text-plum"}>
        elas
      </em>
      ?
    </span>
  );
}
