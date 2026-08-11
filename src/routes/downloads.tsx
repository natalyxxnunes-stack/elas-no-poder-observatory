import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/editorial/PageHero";
import { SectionBlock } from "@/components/editorial/SectionBlock";
import { StatusTag } from "@/components/editorial/StatusTag";
import { ContextBox } from "@/components/editorial/ContextBox";
import { NextAxes } from "@/components/editorial/NextAxes";
import { GapNote } from "@/components/GapNote";
import timelineImage from "@/assets/timeline-editorial.png";

export const Route = createFileRoute("/downloads")({
  head: () => ({
    meta: [
      { title: "Downloads — Quem são elas? | Cartilhas e materiais" },
      {
        name: "description",
        content:
          "Cartilhas, infográficos e materiais educativos do observatório Quem são elas? para leitura, impressão e compartilhamento.",
      },
      { property: "og:title", content: "Downloads — Quem são elas?" },
      {
        property: "og:description",
        content:
          "Materiais educativos sobre mulheres, eleições e poder, prontos para circular.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DownloadsPage,
});

/**
 * Catálogo de materiais. Estrutura preparada para gestão futura por CMS:
 * cada item tem tipo, formato, público, descrição e arquivo. Enquanto não
 * houver arquivo publicado, `file` permanece nulo e o item é exibido como
 * material em preparação — sem link falso.
 */
type Material = {
  id: string;
  kind: "Cartilha" | "Infográfico" | "Material educativo" | "Base de dados";
  title: string;
  description: string;
  audience: string;
  format: string;
  file: string | null;
};

const MATERIALS: readonly Material[] = [
  {
    id: "cartilha-cota",
    kind: "Cartilha",
    title: "O que a cota de gênero faz — e o que ela não faz",
    description:
      "Explicação em linguagem simples da regra de composição de candidaturas de 30% a 70% por gênero, do que ela alcança e do que fica com o partido.",
    audience: "Coletivos, escolas e formação política",
    format: "PDF A4, para impressão",
    file: null,
  },
  {
    id: "infografico-universos",
    kind: "Infográfico",
    title: "Dois universos: proporcional e majoritária",
    description:
      "Peça visual sobre por que os dois universos eleitorais têm denominadores próprios e não podem ser somados.",
    audience: "Redes sociais e imprensa",
    format: "PNG quadrado e vertical",
    file: null,
  },
  {
    id: "cartilha-funil",
    kind: "Material educativo",
    title: "O funil: candidatura, competição e poder",
    description:
      "Roteiro de oficina com as três camadas do funil e as perguntas de cada etapa.",
    audience: "Formação e sala de aula",
    format: "PDF com atividades",
    file: null,
  },
  {
    id: "base-candidaturas",
    kind: "Base de dados",
    title: "Fotografia das candidaturas de 2026",
    description:
      "Tabela com as contagens por universo, gênero e categoria de cor/raça, com data de geração da base e filtros aplicados.",
    audience: "Jornalistas e pesquisadoras",
    format: "CSV com dicionário de variáveis",
    file: null,
  },
];

function DownloadsPage() {
  return (
    <PageShell>
      <PageHero
        kicker="Downloads"
        question="O que posso levar daqui?"
        lead={
          <p>
            Materiais para circular fora do site: cartilhas, infográficos,
            roteiros de oficina e tabelas com dicionário de variáveis. Tudo com
            fonte e data da base impressas na própria peça.
          </p>
        }
        image={timelineImage}
        imageAlt=""
      />

      <SectionBlock
        kicker="Catálogo"
        question="Materiais em preparação"
        align="wide"
        lead={
          <p>
            A estrutura do catálogo já está publicada para que cada material entre
            com tipo, público, formato e arquivo identificados. Nenhum link é
            exibido antes de o arquivo existir.
          </p>
        }
      >
        <ul className="grid gap-4 md:grid-cols-2">
          {MATERIALS.map((m) => (
            <li key={m.id} className="editorial-card flex h-full flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  {m.kind}
                </p>
                <StatusTag tone={m.file ? "ok" : "pending"}>
                  {m.file ? "disponível" : "em preparação"}
                </StatusTag>
              </div>
              <h3 className="mt-2 font-display text-xl leading-snug text-ink">
                {m.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {m.description}
              </p>
              <dl className="mt-4 space-y-1 font-mono text-[11px] text-muted-foreground">
                <div>
                  <dt className="inline uppercase tracking-wider">Público: </dt>
                  <dd className="inline">{m.audience}</dd>
                </div>
                <div>
                  <dt className="inline uppercase tracking-wider">Formato: </dt>
                  <dd className="inline">{m.format}</dd>
                </div>
              </dl>
              <div className="mt-auto pt-4">
                {m.file ? (
                  <a
                    href={m.file}
                    className="inline-flex rounded-md bg-plum px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-plum-soft"
                  >
                    Baixar
                  </a>
                ) : (
                  <span className="font-mono text-[11px] text-muted-foreground">
                    Arquivo ainda não publicado.
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </SectionBlock>

      <SectionBlock
        kicker="Uso"
        question="Como usar e como creditar"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <ContextBox variant="importa">
            <p>
              Os materiais são feitos para circular em oficinas, escolas,
              coletivos e redações. Cada peça carrega a data da fotografia da base
              para evitar que um número antigo circule como atual.
            </p>
          </ContextBox>
          <ContextBox variant="significa">
            <p>
              Ao republicar, cite o observatório, o indicador e a data da base. A
              forma de citação está em{" "}
              <Link to="/sobre" className="text-plum underline underline-offset-4">
                Sobre
              </Link>
              .
            </p>
          </ContextBox>
        </div>
        <div className="mt-6">
          <GapNote label="Estrutura preparada">
            Este catálogo será gerenciado por CMS: tipo, título, descrição,
            público, formato, arquivo e data de publicação já são os campos
            previstos.
          </GapNote>
        </div>
      </SectionBlock>

      <NextAxes ids={["metodo", "sobre", "dados-2026"]} />
    </PageShell>
  );
}
