/**
 * Hemiciclo — plenário desenhado em SVG, uma cadeira por ponto. As cadeiras
 * de mulheres vêm primeiro, da esquerda para a direita, para formarem um
 * bloco que se lê de relance. É dado, não ilustração: o número de pontos é
 * o número de cadeiras.
 */
type Props = {
  total: number;
  destaque: number;
  /** classes de preenchimento (fill-*) */
  corDestaque?: string;
  corResto?: string;
  linhas?: number;
  className?: string;
  titulo: string;
};

function layout(total: number, linhas: number) {
  const r0 = 0.42;
  const radii = Array.from({ length: linhas }, (_, i) => r0 + (i * (1 - r0)) / (linhas - 1));
  const somaR = radii.reduce((a, b) => a + b, 0);
  let restantes = total;
  const porLinha = radii.map((r, i) => {
    const n = i === linhas - 1 ? restantes : Math.round((total * r) / somaR);
    restantes -= n;
    return n;
  });
  const seats: { x: number; y: number; a: number }[] = [];
  radii.forEach((r, i) => {
    const n = porLinha[i] ?? 0;
    for (let k = 0; k < n; k++) {
      const a = Math.PI - (n === 1 ? Math.PI / 2 : (k * Math.PI) / (n - 1));
      seats.push({ x: Math.cos(a) * r, y: Math.sin(a) * r, a });
    }
  });
  seats.sort((p, q) => q.a - p.a);
  const raio = (1 - r0) / (linhas - 1) / 2.6;
  return { seats, raio };
}

export function Hemiciclo({
  total,
  destaque,
  corDestaque = "fill-cream",
  corResto = "fill-cream/20",
  linhas = 12,
  className = "",
  titulo,
}: Props) {
  const { seats, raio } = layout(total, linhas);
  const pad = raio * 1.5;
  return (
    <svg
      role="img"
      aria-label={titulo}
      viewBox={`${-1 - pad} ${-1 - pad} ${2 + pad * 2} ${1 + pad * 2}`}
      className={`block h-auto w-full ${className}`}
    >
      <title>{titulo}</title>
      <g transform="scale(1,-1)">
        {seats.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={raio} className={i < destaque ? corDestaque : corResto} />
        ))}
      </g>
    </svg>
  );
}
