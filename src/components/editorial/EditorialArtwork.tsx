type ArtworkVariant = "home" | "territory" | "archive" | "method";

/**
 * Colagem abstrata do projeto. Usa apenas formas geométricas e tokens da
 * identidade existente; não representa pessoas nem substitui a marca.
 */
export function EditorialArtwork({
  variant = "home",
  className = "",
}: {
  variant?: ArtworkVariant;
  className?: string;
}) {
  return (
    <div
      className={`editorial-artwork editorial-artwork-${variant} ${className}`}
      role="img"
      aria-label="Composição editorial abstrata inspirada em instituições, caminhos, barreiras e dados"
    >
      <div className="art-sun" />
      <div className="art-dome" />
      <div className="art-column art-column-a" />
      <div className="art-column art-column-b" />
      <div className="art-column art-column-c" />
      <div className="art-path" />
      <div className="art-gate" />
      <div className="art-orbit art-orbit-a" />
      <div className="art-orbit art-orbit-b" />
      <span className="art-note art-note-a">entrada</span>
      <span className="art-note art-note-b">poder</span>
      <span className="art-index">01—05</span>
    </div>
  );
}