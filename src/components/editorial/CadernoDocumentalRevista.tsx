import { FOTOS } from "@/data/fotos";

/**
 * Peças documentais para uso pontual ao longo de páginas de revista.
 * São fotografias locais já cadastradas e fontes originais, sem geração de imagens.
 * A cor varia por contexto; o conteúdo jornalístico é específico de cada uso.
 */
type Tom = "ink" | "plum" | "coral";
const TONS: Record<Tom, string> = {
  ink: "bg-ink text-paper",
  plum: "bg-plum text-paper",
  coral: "bg-[#c53f22] text-paper",
};

export function FotografiaEmContexto({
  fotoId,
  editoria,
  titulo,
  contexto,
  tom = "ink",
}: {
  fotoId: string;
  editoria: string;
  titulo: string;
  contexto: string;
  tom?: Tom;
}) {
  const foto = FOTOS[fotoId];
  // Direitos ainda não conferidos: a imagem não pode entrar na publicação.
  if (!foto || foto.licenca === "verificacao-pendente") return null;
  return (
    <section aria-label={editoria} className={\`relative left-1/2 -ml-[50vw] w-screen \${TONS[tom]}\`}>
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:px-8 md:py-16 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:gap-12">
        <figure className="min-w-0">
          <img src={foto.src} alt={foto.alt} loading="lazy" className="block aspect-[3/2] w-full object-cover" />
          <figcaption className="mt-3 text-[13px] leading-relaxed text-paper/85">
            {foto.credito} · {foto.acervo}{foto.data ? \` · \${foto.data}\` : ""}.{" "}
            {foto.licencaUrl ? (
              <a href={foto.licencaUrl} target="_blank" rel="noreferrer" className="font-semibold text-paper underline underline-offset-4">
                Crédito, origem e condições de uso ↗
              </a>
            ) : null}
          </figcaption>
        </figure>
        <div>
          <p className="text-[13px] font-semibold text-[var(--art-gold)]">{editoria}</p>
          <h2 className="mt-4 max-w-lg font-display text-[clamp(2rem,3.5vw,3.35rem)] leading-[1.08]">{titulo}</h2>
          <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-paper/90">{contexto}</p>
        </div>
      </div>
    </section>
  );
}

export function PortalTSEEmContexto({ recorte }: { recorte: string }) {
  return (
    <section aria-labelledby="portal-tse-documental" className="relative left-1/2 -ml-[50vw] w-screen bg-[var(--art-gold)] text-ink">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:px-8 md:py-16 lg:grid-cols-[1fr_1fr] lg:gap-12">
        <div className="min-w-0 bg-ink p-3 md:p-5">
          <a href="/documentos/tse-candidatos-2026-portal.png" target="_blank" rel="noreferrer" aria-label="Ampliar captura da página oficial Candidatos 2026 do TSE">
            <img src="/documentos/tse-candidatos-2026-portal.png" alt="Captura documental da página Candidatos — 2026 do portal de Dados Abertos do TSE" loading="lazy" className="aspect-[11/8] w-full object-cover object-top" />
          </a>
          <p className="mt-3 font-mono text-[12px] leading-relaxed text-paper/85">
            Captura do portal do TSE · 15/11/2026 · arquivo de origem identificado. A imagem mostra a página de disponibilização, não o CSV.
          </p>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-[13px] font-semibold">Documento de origem · 2026</p>
          <h2 id="portal-tse-documental" className="mt-4 max-w-lg font-display text-[clamp(2rem,3.6vw,3.55rem)] leading-[1.08]">
            Da página do TSE à nossa base
          </h2>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed">{recorte}</p>
          <p className="mt-3 text-[14px] leading-relaxed text-ink/80">
            A licença do conjunto de dados não se aplica automaticamente à interface capturada. A origem, a data de geração e a metodologia devem ser verificadas separadamente.
          </p>
          <a href="https://dadosabertos.tse.jus.br/dataset/candidatos-2026" target="_blank" rel="noreferrer" className="mt-6 inline-flex min-h-11 items-center self-start border-b-2 border-ink text-[15px] font-semibold text-ink">
            Abrir conjunto Candidatos 2026 no TSE ↗
          </a>
        </div>
      </div>
    </section>
  );
}

export function CadernoDeFontes({
  editoria,
  titulo,
  nota,
  documentos,
}: {
  editoria: string;
  titulo: string;
  nota: string;
  documentos: readonly { rotulo: string; titulo: string; url: string; descricao: string }[];
}) {
  return (
    <section aria-label={editoria} className="relative left-1/2 -ml-[50vw] w-screen bg-[var(--art-gold)] text-ink">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <p className="text-[13px] font-semibold">{editoria}</p>
        <div className="mt-3 grid gap-7 lg:grid-cols-[.9fr_1.1fr] lg:gap-12">
          <div>
            <h2 className="max-w-xl font-display text-[clamp(2rem,3.5vw,3.4rem)] leading-[1.08]">{titulo}</h2>
            <p className="mt-5 max-w-lg text-[16px] leading-relaxed">{nota}</p>
          </div>
          <ol className="divide-y divide-ink/30 border-y border-ink/30">
            {documentos.map((d, i) => (
              <li key={d.url + d.titulo} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 py-5">
                <span className="font-mono text-[13px]">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="text-[13px] font-semibold">{d.rotulo}</p>
                  <a href={d.url} target={d.url.startsWith("http") ? "_blank" : undefined} rel={d.url.startsWith("http") ? "noreferrer" : undefined} className="mt-2 block font-display text-xl font-semibold leading-snug text-ink underline-offset-4 hover:underline focus-visible:outline-2">
                    {d.titulo} ↗
                  </a>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink/85">{d.descricao}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
