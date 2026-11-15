/**
 * Duas imagens editoriais originais, desenhadas em SVG, inspiradas na
 * RELAÇÃO CROMÁTICA (não na iconografia) da prancha de seis painéis aprovada.
 *
 * Sem dados numéricos, pessoas reconhecíveis, documentos simulados ou arte de IA.
 * Não usar como fotografia, fac-símile ou representação de votação real.
 * As cores --art-* só existem nas peças interpretativas, nunca em gráficos.
 */
export function ComposicaoEditorial({ tipo }: { tipo: "voz" | "poder" }) {
  if (tipo === "voz") {
    return (
      <svg viewBox="0 0 500 300" className="block h-full w-full" role="img"
        aria-label="Arte editorial original: microfone e formas de diálogo em ameixa, violeta, creme, dourado e coral">
        <rect width="500" height="300" fill="var(--art-ink)" />
        <rect width="235" height="300" fill="var(--art-plum)" />
        <rect x="33" y="28" width="197" height="240" fill="none" stroke="var(--art-violet)" strokeWidth="5" />
        <rect x="53" y="46" width="170" height="205" fill="var(--art-cream)" />
        <circle cx="140" cy="144" r="72" fill="var(--art-coral)" />
        <rect x="121" y="86" width="39" height="101" rx="19" fill="var(--art-ink)" />
        <g stroke="var(--art-cream)" strokeWidth="3" opacity=".95">
          <path d="M132 102h17 M132 117h17 M132 132h17 M132 147h17 M132 162h17" />
        </g>
        <path d="M103 150v15c0 21 17 38 37 38s37-17 37-38v-15M140 203v23M111 226h58"
          fill="none" stroke="var(--art-ink)" strokeWidth="7" strokeLinecap="square" />
        <path d="M267 44h205v99H321l-30 24v-24h-24z" fill="var(--art-violet)" />
        <path d="M301 73h135M301 96h106" stroke="var(--art-cream)" strokeWidth="9" />
        <path d="M242 180h213v75H280l-27 21v-21h-11z" fill="var(--art-gold)" />
        <path d="M273 206h148M273 228h104" stroke="var(--art-ink)" strokeWidth="8" />
        <rect x="461" y="180" width="11" height="75" fill="var(--art-coral)" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 500 300" className="block h-full w-full" role="img"
      aria-label="Arte editorial original: tribuna e arquitetura parlamentar estilizadas em creme, ameixa, dourado, coral e violeta; não é um gráfico de cadeiras">
      <rect width="500" height="300" fill="var(--art-gold)" />
      <rect x="0" y="0" width="104" height="300" fill="var(--art-violet)" />
      <rect x="0" y="0" width="500" height="30" fill="var(--art-ink)" />
      <rect x="363" y="30" width="137" height="270" fill="var(--art-coral)" />
      <path d="M111 270V148C111 77 181 37 257 37s147 40 147 111v122z" fill="var(--art-cream)" />
      <path d="M141 251V151C141 96 186 72 257 72s117 24 117 79v100z"
        fill="none" stroke="var(--art-plum)" strokeWidth="7" />
      <rect x="0" y="265" width="500" height="35" fill="var(--art-ink)" />
      <rect x="181" y="209" width="165" height="65" fill="var(--art-plum)" />
      <rect x="181" y="209" width="165" height="10" fill="var(--art-violet)" />
      <path d="M223 211v-40c0-9-5-16-14-18M301 211v-40c0-9 5-16 14-18"
        fill="none" stroke="var(--art-ink)" strokeWidth="6" />
      <rect x="198" y="145" width="23" height="12" rx="5" transform="rotate(-22 198 145)" fill="var(--art-ink)" />
      <rect x="303" y="145" width="23" height="12" rx="5" transform="rotate(22 303 145)" fill="var(--art-ink)" />
      <rect x="203" y="239" width="121" height="8" fill="var(--art-cream)" />
      <rect x="24" y="71" width="56" height="7" fill="var(--art-cream)" />
      <rect x="24" y="90" width="56" height="7" fill="var(--art-cream)" />
      <rect x="24" y="109" width="56" height="7" fill="var(--art-cream)" />
      <rect x="429" y="68" width="45" height="128" fill="var(--art-ink)" />
      <rect x="439" y="78" width="25" height="106" fill="var(--art-violet)" />
    </svg>
  );
}
