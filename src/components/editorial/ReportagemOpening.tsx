import type { ReactNode } from "react";
import { FOTOS } from "@/data/fotos";

/**
 * Abertura de reportagem: imagem documental, título, texto de apresentação
 * e ficha editorial em áreas próprias. Não impõe esse modelo às páginas de
 * dados nem altera as fontes ou o conteúdo da apuração.
 */
export function ReportagemOpening({
  kicker,
  title,
  lead,
  photoId,
  photoContext,
  photoSourceUrl,
  credits,
}: {
  kicker: string;
  title: ReactNode;
  lead: ReactNode;
  photoId: string;
  photoContext: string;
  photoSourceUrl: string;
  credits: ReactNode;
}) {
  const candidate = FOTOS[photoId];
  const photo = candidate?.licenca === "verificacao-pendente" ? undefined : candidate;
  return (
    <section
      aria-label="Abertura da reportagem"
      className="relative left-1/2 -ml-[50vw] w-screen bg-cream"
    >
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14 lg:py-16">
        <div className="grid items-start gap-7 lg:grid-cols-[1.06fr_.94fr] lg:gap-x-12 lg:gap-y-0">
          <div className="min-w-0 lg:col-start-1 lg:row-start-1">
            <p className="text-[13px] font-semibold tracking-wide text-plum">{kicker}</p>
            <h1 className="mt-4 max-w-[16ch] font-display text-[clamp(2.45rem,4.2vw,4.2rem)] font-semibold leading-[1.06] text-ink">
              {title}
            </h1>
          </div>
          {photo ? (
            <figure className="min-w-0 bg-paper lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <img
                src={photo.src}
                alt={photo.alt}
                loading="eager"
                fetchPriority="high"
                className="block aspect-[4/3] w-full object-cover object-center"
              />
              <figcaption className="px-3 py-3 text-[13px] leading-relaxed text-ink/75 sm:px-4">
                {photoContext}{" "}
                <a
                  href={photoSourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-plum underline underline-offset-2"
                >
                  {photo.credito}
                </a>
              </figcaption>
            </figure>
          ) : (
            <p className="border border-rule bg-paper p-6 text-sm text-ink/75">
              Fotografia documental indisponível nesta versão.
            </p>
          )}
          <div className="min-w-0 lg:col-start-1 lg:row-start-2">
            <div className="max-w-[64ch] text-base leading-relaxed text-ink/85 md:text-lg">
              {lead}
            </div>
            <div className="mt-7 border-t border-rule pt-5 text-sm leading-relaxed text-ink/85">
              {credits}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
