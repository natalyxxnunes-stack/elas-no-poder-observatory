/**
 * fotos — registro das fotografias documentais do site.
 *
 * Regra do projeto (AGENTS.md): nenhuma imagem gerada por IA; fotografia só
 * entra se for documental, com licença e crédito, e com o arquivo fornecido
 * pela editora (salvo em /public/fotos). Nada de link para imagem de terceiros.
 * Enquanto uma página não tiver foto registrada, o lugar mostra a peça gráfica
 * da própria página.
 */
export type Licenca = "CC-BY-4.0" | "CC-BY-SA-4.0" | "CC0" | "dominio-publico" | "cessao-autorizada";

export type Foto = {
  /** caminho em /public, por exemplo "/fotos/lelia-gonzalez-1983.jpg" */
  src: string;
  /** o que se vê na imagem */
  alt: string;
  credito: string;
  acervo: string;
  licenca: Licenca;
  licencaUrl?: string;
  data?: string;
  proporcao: "4/5" | "3/2" | "1/1" | "16/9";
  fornecidaPor: "editora";
};

export const FOTOS: Record<string, Foto> = {
  // "lelia-gonzalez": { src: "/fotos/...", alt: "...", credito: "...", acervo: "...", licenca: "...", proporcao: "4/5", fornecidaPor: "editora" },
};

export const LICENCA_ROTULO: Record<Licenca, string> = {
  "CC-BY-4.0": "CC BY 4.0",
  "CC-BY-SA-4.0": "CC BY-SA 4.0",
  CC0: "CC0",
  "dominio-publico": "domínio público",
  "cessao-autorizada": "uso autorizado",
};
