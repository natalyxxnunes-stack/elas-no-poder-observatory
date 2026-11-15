import type { ReactElement } from "react";
import type { TemaSlug } from "@/data/temas";

/**
 * Recorte — imagem de respiro feita em código (12/11/2026).
 *
 * Colagem de papel rasgado nas cores do projeto, com retícula de pontos e o
 * motivo gráfico de cada tema (cadeiras, notas, quadrados de votos, colunas,
 * pilhas de folhas, linha do tempo). Nada aqui é gerado por IA e nada
 * representa uma pessoa: é decoração do sistema visual, sem dado. O desenho
 * é determinístico (a mesma semente gera a mesma imagem em todo build).
 */

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** polígono de borda rasgada a partir de um retângulo */
function rasgado(x: number, y: number, w: number, h: number, r: () => number, dente = 6) {
  const pts: [number, number][] = [];
  const passo = 14;
  for (let i = 0; i <= w; i += passo) pts.push([x + i, y + (r() - 0.5) * dente]);
  for (let i = 0; i <= h; i += passo) pts.push([x + w + (r() - 0.5) * dente, y + i]);
  for (let i = w; i >= 0; i -= passo) pts.push([x + i, y + h + (r() - 0.5) * dente]);
  for (let i = h; i >= 0; i -= passo) pts.push([x + (r() - 0.5) * dente, y + i]);
  return pts.map((p) => p.map((v) => v.toFixed(1)).join(",")).join(" ");
}

const SEMENTE: Record<TemaSlug, number> = {
  presenca: 11,
  dinheiro: 23,
  agenda: 37,
  poder: 41,
  violencia: 53,
  memoria: 67,
};

function Motivo({ slug, r }: { slug: TemaSlug; r: () => number }) {
  switch (slug) {
    case "presenca": {
      // meia-lua de cadeiras
      const pts: ReactElement[] = [];
      [70, 92, 114].forEach((raio, li) => {
        const n = 9 + li * 3;
        for (let k = 0; k < n; k++) {
          const a = Math.PI - (k * Math.PI) / (n - 1);
          pts.push(
            <circle
              key={`${li}-${k}`}
              cx={250 + Math.cos(a) * raio}
              cy={200 - Math.sin(a) * raio}
              r={6}
              className={k < n * 0.22 ? "fill-coral" : "fill-paper"}
            />,
          );
        }
      });
      return <g>{pts}</g>;
    }
    case "dinheiro":
      return (
        <g>
          {[0, 1, 2, 3, 4].map((i) => (
            <rect
              key={i}
              x={180 + i * 6}
              y={70 + i * 18}
              width={150}
              height={64}
              transform={`rotate(${-8 + i * 4} 255 130)`}
              className={i === 4 ? "fill-coral" : "fill-paper stroke-plum-deep"}
              strokeWidth={2}
            />
          ))}
          <circle cx={255} cy={150} r={18} className="fill-none stroke-plum-deep" strokeWidth={3} />
        </g>
      );
    case "agenda":
      return (
        <g>
          {Array.from({ length: 48 }, (_, i) => (
            <rect
              key={i}
              x={170 + (i % 8) * 21}
              y={60 + Math.floor(i / 8) * 21}
              width={16}
              height={16}
              className={
                r() < 0.15 ? "fill-coral" : r() < 0.55 ? "fill-paper" : "fill-none stroke-paper"
              }
              strokeWidth={1.5}
            />
          ))}
        </g>
      );
    case "poder":
      return (
        <g>
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={175 + i * 34} y={70} width={20} height={130} className="fill-paper" />
          ))}
          <polygon points="160,70 350,70 255,30" className="fill-coral" />
          <rect x={160} y={200} width={190} height={14} className="fill-paper" />
        </g>
      );
    case "violencia":
      return (
        <g>
          {[30, 52, 90, 130].map((h, i) => (
            <g key={i}>
              {Array.from({ length: Math.round(h / 5) }, (_, k) => (
                <rect
                  key={k}
                  x={180 + i * 42 + (r() - 0.5) * 3}
                  y={210 - k * 5}
                  width={32}
                  height={3}
                  className={i === 3 ? "fill-coral" : "fill-paper"}
                />
              ))}
            </g>
          ))}
        </g>
      );
    case "memoria":
      return (
        <g>
          <line x1={150} y1={140} x2={360} y2={140} className="stroke-paper" strokeWidth={3} />
          {[160, 172, 190, 262, 270, 292, 314, 322, 330, 338, 350].map((x, i) => (
            <circle
              key={i}
              cx={x}
              cy={140}
              r={7}
              className={i === 10 ? "fill-coral" : "fill-paper"}
            />
          ))}
          <rect
            x={198}
            y={118}
            width={56}
            height={44}
            className="fill-none stroke-paper"
            strokeDasharray="4 4"
            strokeWidth={2}
          />
        </g>
      );
  }
}

export function Recorte({ slug, className = "" }: { slug: TemaSlug; className?: string }) {
  const r = rng(SEMENTE[slug]);
  const papel1 = rasgado(30 + r() * 30, 30 + r() * 20, 230, 150, r);
  const papel2 = rasgado(260 + r() * 20, 120 + r() * 20, 200, 120, r, 8);
  const faixa = rasgado(-10, 190 + r() * 20, 520, 26, r, 5);
  const id = `ret-${slug}`;
  return (
    <svg
      viewBox="0 0 500 260"
      aria-hidden="true"
      className={`block h-auto w-full ${className}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id={id} width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.4" className="fill-plum-bright" />
        </pattern>
      </defs>
      <rect width="500" height="260" className="fill-plum-deep" />
      <polygon points={papel1} className="fill-plum" />
      <polygon points={papel1} fill={`url(#${id})`} opacity={0.5} />
      <polygon points={papel2} className="fill-lilac" opacity={0.9} />
      <polygon points={faixa} className="fill-coral" opacity={0.85} />
      <Motivo slug={slug} r={r} />
    </svg>
  );
}
