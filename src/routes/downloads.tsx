import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Faixa } from "@/components/editorial/Faixa";
import { SectionBlock } from "@/components/editorial/SectionBlock";
import { ContextBox } from "@/components/editorial/ContextBox";
import { NextAxes } from "@/components/editorial/NextAxes";
import { BASE_PUBLICA, BASE_PUBLICA_GERADA_EM } from "@/data/base-publica";
import { formatInt } from "@/lib/format-br";

/**
 * ROTA PUBLICADA. Catálogo completo desde 28/10/2026; fontes dos materiais em scripts/materiais.
 * O catálogo de materiais está visível e identifica o tipo, público, formato e
 * status de cada item. Nenhum link falso é exibido: arquivos ainda não
 * publicados aparecem como "em preparação".
 */
export const Route = createFileRoute("/downloads")({
  head: () => ({
    meta: [
      { title: "Downloads · Quem são elas? | Cartilhas e materiais" },
      {
        name: "description",
        content:
          "Cartilhas, infográficos e materiais educativos do observatório Quem são elas? para leitura, impressão e compartilhamento.",
      },
      { property: "og:title", content: "Downloads · Quem são elas?" },
      {
        property: "og:description",
        content: "Materiais educativos sobre mulheres, eleições e poder, prontos para circular.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DownloadsPage,
});

/* Catálogo de materiais existentes; miniaturas usam os próprios arquivos, sem inventar capas. */

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
    title: "O que a cota de gênero faz e o que ela não faz",
    description:
      "Explicação em linguagem simples da regra de composição de candidaturas de 30% a 70% por gênero, do que ela alcança e do que fica com o partido.",
    audience: "Coletivos, escolas e formação política",
    format: "PDF A4, 4 páginas, para impressão",
    file: "/materiais/cartilha-cota.pdf",
  },
  {
    id: "infografico-universos",
    kind: "Infográfico",
    title: "Dois universos: proporcional e majoritária",
    description:
      "Peça visual sobre por que os dois universos eleitorais têm denominadores próprios e não podem ser somados.",
    audience: "Redes sociais e imprensa",
    format: "PNG quadrado (1080 × 1080); vertical em /materiais/infografico-universos-vertical.png",
    file: "/materiais/infografico-universos-quadrado.png",
  },
  {
    id: "cartilha-funil",
    kind: "Material educativo",
    title: "O funil: candidatura, competição e poder",
    description: "Roteiro de oficina de 90 minutos com o funil de 2026 (registro, voto, cadeira e poder), perguntas para os grupos e folha de atividade.",
    audience: "Formação e sala de aula",
    format: "PDF A4, 2 páginas, com atividades",
    file: "/materiais/oficina-funil.pdf",
  },
  {
    id: "base-candidaturas",
    kind: "Base de dados",
    title: "Fotografia das candidaturas de 2026 (CSV)",
    description:
      "Contagens por universo, gênero e categoria de cor/raça. O arquivo é gerado na hora a partir da fotografia vigente e traz, no cabeçalho, a data de geração da base pelo TSE, a data da coleta, os filtros e o código de procedência do arquivo processado. Já publicado no Método. A tabela fica só lá, para que nenhuma versão antiga circule como atual.",
    audience: "Jornalistas e pesquisadoras",
    format: "CSV, download no Método",
    file: "/metodo",
  },
];

/** Prévia fiel, quando o navegador conseguir renderizar o arquivo original.
 * Miniaturas derivadas dos próprios PDFs, geradas no pipeline verificado.
 */
function MiniaturaMaterial({ material }: { material: Material }) {
  if (!material.file || material.file === "/metodo") {
    return (
      <div className="flex aspect-[5/3] items-center justify-center bg-cream p-5 text-center text-sm text-ink/70">
        Base de consulta · arquivo e metodologia disponíveis no Método
      </div>
    );
  }
  if (material.file.endsWith(".png")) {
    return (
      <div className="flex aspect-[5/3] items-center justify-center overflow-hidden bg-cream">
        <img src={material.file} loading="lazy" className="h-full w-full object-contain"
          alt="Prévia do infográfico original, sem alterações editoriais" />
      </div>
    );
  }
  if (material.file.endsWith(".pdf")) {
    const miniatura = material.id === "cartilha-cota"
      ? "/materiais/cartilha-cota-miniatura.png"
      : material.id === "cartilha-funil"
        ? "/materiais/oficina-funil-miniatura.png"
        : null;
    return miniatura ? (
      <div className="flex aspect-[5/3] items-center justify-center overflow-hidden bg-cream">
        <img src={miniatura} alt={"Prévia da primeira página do material: " + material.title}
          loading="lazy" className="h-full w-full object-contain" />
      </div>
    ) : (
      <div className="flex aspect-[5/3] items-center justify-center bg-cream p-5 text-sm text-ink/70">
        Arquivo PDF para download · prévia indisponível
      </div>
    );
  }
  return null;
}

function DownloadsPage() {
  return (
    <PageShell breadcrumb={[{ label: "Projeto" }, { label: "Downloads" }]}>
      <Faixa fundo="bg-plum-deep text-paper">
        <header className="grid items-center gap-8 py-12 md:grid-cols-[1.1fr_.9fr] md:gap-14 md:py-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-lilac">
              Biblioteca do observatório
            </p>
            <h1 className="mt-4 max-w-xl font-display text-[2.5rem] font-semibold leading-[1.08] md:text-[3.5rem]">
              Materiais para consultar e compartilhar
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-paper/85">
              Cartilhas, infográficos, oficinas e bases de dados para usar em pesquisas,
              aulas e reportagens. Os materiais identificam as fontes e o período analisado.
            </p>
            <a href="#catalogo"
              className="mt-6 inline-flex min-h-11 items-center font-semibold text-paper underline decoration-lilac decoration-2 underline-offset-4">
              Explorar os materiais <span aria-hidden="true" className="ml-2">↘</span>
            </a>
          </div>
          <div className="grid min-w-0 grid-cols-2 items-end gap-3" aria-label="Prévia dos arquivos publicados do observatório">
            <figure className="col-span-2 grid min-w-0 grid-cols-[.9fr_1.1fr] items-center gap-4 bg-[var(--art-plum)] p-4 text-paper md:p-5">
              <img
                src="/materiais/infografico-universos-vertical.png"
                alt="Infográfico original do Quem são elas? sobre os dois universos eleitorais: proporcional e majoritário"
                loading="eager"
                className="max-h-[320px] w-full object-contain"
              />
              <figcaption className="text-[13px] leading-relaxed text-paper/90">
                <strong className="block font-display text-xl leading-tight text-paper">
                  Dados desenhados para circular
                </strong>
                <span className="mt-2 block">
                  Infográfico vertical original, disponível também em formato
                  quadrado. Não é uma imagem gerada para preencher o layout.
                </span>
                <a
                  href="/materiais/infografico-universos-vertical.png"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex min-h-11 items-center font-semibold text-paper underline underline-offset-4"
                >
                  Ver peça completa ↗
                </a>
              </figcaption>
            </figure>
            <figure className="min-w-0">
              <img src="/materiais/cartilha-cota-miniatura.png"
                alt="Primeira página da cartilha original sobre cotas de gênero"
                loading="eager" className="aspect-[3/4] w-full bg-paper/10 object-contain"/>
              <figcaption className="mt-2 text-[13px] text-paper/85">Cartilha · PDF original</figcaption>
            </figure>
            <figure className="min-w-0">
              <img src="/materiais/oficina-funil-miniatura.png"
                alt="Primeira página original do roteiro de oficina sobre o funil eleitoral"
                loading="eager" className="aspect-[3/4] w-full bg-paper/10 object-contain"/>
              <figcaption className="mt-2 text-[13px] text-paper/85">Oficina · PDF original</figcaption>
            </figure>
          </div>
        </header>
      </Faixa>

      <SectionBlock
        id="catalogo"
        kicker="Catálogo"
        question="Materiais para baixar e circular"
        align="wide"
        lead={
          <p>
            Cartilha, infográfico, roteiro de oficina e base de dados, com os números da base do TSE
            de 27/10/2026. Uso livre, com crédito ao Quem são elas?.
          </p>
        }
      >
        <ul className="grid gap-5 md:grid-cols-2">
          {MATERIALS.map((m) => (
            <li
              key={m.id}
              className={`flex min-w-0 h-full flex-col border border-rule bg-paper p-5 md:p-7 ${m.id === "cartilha-cota" ? "md:row-span-2" : ""}`}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-[13px] text-plum font-semibold">
                  {m.kind}
                </p>
              </div>
              <div className="mb-4"><MiniaturaMaterial material={m} /></div>
              <h3 className="mt-2 font-display text-xl leading-snug text-ink">{m.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.description}</p>
              <dl className="mt-4 space-y-1 font-mono text-[13px] text-muted-foreground">
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
                {m.file === "/metodo" ? (
                  <Link
                    to="/metodo"
                    className="inline-flex rounded-md bg-plum px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-plum-soft"
                  >
                    Baixar no Método
                  </Link>
                ) : m.file ? (
                  <a
                    href={m.file}
                    download
                    className="inline-flex rounded-md bg-plum px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-plum-soft"
                  >
                    Baixar
                  </a>
                ) : (
                  <span className="font-mono text-[13px] text-muted-foreground">
                    Arquivo ainda não publicado.
                  </span>
                )}
              </div>

            </li>
          ))}
        </ul>
      </SectionBlock>

      <div className="min-w-0 [overflow-wrap:anywhere]">
      <SectionBlock
        id="dados"
        kicker="Base aberta"
        question="Os dados do observatório, em planilha"
        align="wide"
        lead={
          <p>
            Os arquivos CSV preservam fotografias identificadas dos dados do observatório, em formato
            que abre no Excel ou no Google Planilhas. Cada planilha informa a fonte e a data da base,
            que pode ser diferente da utilizada em gráficos atualizados. O SHA-256 permite conferir
            se o arquivo corresponde ao publicado aqui; as fontes e o método de cálculo estão
            documentados nos scripts do repositório e no Método.
          </p>
        }
      >
        <ul className="min-w-0 divide-y divide-rule border-y border-rule">
          {BASE_PUBLICA.map((b) => (
            <li key={b.arquivo} className="grid min-w-0 gap-3 py-5 md:grid-cols-[minmax(0,1fr)_auto] md:gap-8">
              <div className="min-w-0">
                <h3 className="font-display text-xl leading-snug text-ink">{b.titulo}</h3>
                <p className="mt-1 max-w-3xl text-[15px] leading-relaxed text-ink/80">{b.descricao}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-ink/70">
                  {formatInt(b.linhas)} linhas · Fonte: {b.fonte}
                </p>
                <details className="mt-2 min-w-0 text-[13px] text-ink/75">
                  <summary className="min-h-11 cursor-pointer py-2 font-semibold text-ink">Colunas e SHA-256</summary>
                  <p className="break-words [overflow-wrap:anywhere] font-mono">{b.colunas.join(", ")}</p>
                  <p className="mt-1 break-all font-mono">SHA-256 {b.sha256}</p>
                </details>
              </div>
              <a
                href={`/dados/${b.arquivo}`}
                download
                className="inline-flex h-11 items-center self-start bg-plum px-4 text-sm font-semibold text-primary-foreground hover:bg-plum-soft"
              >
                Baixar CSV<span className="sr-only">: {b.titulo}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[13px] text-muted-foreground">
          Arquivos gerados em {BASE_PUBLICA_GERADA_EM} por scripts/base-publica/gerar.ts. Sem CPF, e-mail, data de nascimento ou
          foto. Cor/raça sempre nas cinco categorias do TSE. O significado de cada campo está no{" "}
          <Link to="/metodo" hash="dicionario" className="text-plum underline underline-offset-4">
            dicionário do Método
          </Link>
          . Uso livre, com crédito ao Quem são elas? e à data da base.
        </p>
      </SectionBlock>

      </div>

      <SectionBlock kicker="Uso" question="Como usar e como creditar">
        <div className="grid gap-4 md:grid-cols-2">
          <ContextBox variant="importa">
            <p>
              Os materiais são feitos para circular em oficinas, escolas, coletivos e redações. Cada
              peça carrega a data da fotografia da base para evitar que um número antigo circule
              como atual.
            </p>
          </ContextBox>
          <ContextBox variant="significa">
            <p>
              Ao republicar, cite o observatório, o indicador e a data da base. A forma de citação
              está em{" "}
              <Link to="/sobre" className="text-plum underline underline-offset-4">
                Sobre
              </Link>
              .
            </p>
          </ContextBox>
        </div>
      </SectionBlock>

      <NextAxes ids={["metodo", "sobre", "dados-2026"]} />
    </PageShell>
  );
}
