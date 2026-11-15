/**
 * fotos — registro das fotografias documentais do site.
 *
 * Regra do projeto (AGENTS.md): nenhuma imagem gerada por IA; fotografia só
 * entra se for documental, com licença e crédito e com cópia local em
 * /public/fotos. As origens devem ser preservadas nos metadados.
 * Enquanto uma página não tiver foto registrada, o lugar mostra a peça gráfica
 * da própria página.
 */
export type Licenca = "CC-BY" | "CC-BY-4.0" | "CC-BY-SA-4.0" | "CC0" | "dominio-publico" | "cessao-autorizada";

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
  fornecidaPor: "editora" | "acervo-verificado";
};

export const FOTOS: Record<string, Foto> = {
  "pagu": {
    src: "/fotos/pagu-patricia-galvao-anos-1920.jpg",
    alt: "Retrato histórico de Patrícia Galvão, Pagu, olhando para a esquerda, com cabelo escuro e casaco de pele.",
    credito: "Autor não identificado / Wikimedia Commons",
    acervo: "Reproduzido em Depois da Cena, A Tribuna, março de 2008 (origem declarada no Commons)",
    licenca: "dominio-publico",
    licencaUrl: "https://commons.wikimedia.org/wiki/File:Patricia_Galvao.jpg",
    data: "Data atribuída ao fim da década de 1920; não confirmada",
    proporcao: "4/5",
    fornecidaPor: "acervo-verificado",
  },
  "bancada-feminina-camara-marco-2026": {
    src: "/fotos/bancada-feminina-camara-marco-2026.jpg",
    alt: "Integrantes da bancada feminina da Câmara posam em frente ao Congresso Nacional em março de 2026.",
    credito: "Vinicius Loures/Câmara dos Deputados",
    acervo: "Banco de Imagens da Câmara dos Deputados",
    licenca: "CC-BY",
    licencaUrl: "https://www.camara.leg.br/internet/bancoimagem/default.asp?data=04/03/2026",
    data: "04/03/2026",
    proporcao: "3/2",
    fornecidaPor: "acervo-verificado",
  },
  "plenario-igualdade-salarial-2023": {
    src: "/fotos/plenario-igualdade-salarial-2023.jpg",
    alt: "Vista ampla do Plenário da Câmara dos Deputados, com parlamentares reunidos entre as bancadas.",
    credito: "Bruno Spada/Câmara dos Deputados",
    acervo: "Agência Câmara de Notícias",
    licenca: "CC-BY",
    licencaUrl: "https://www.camara.leg.br/banco-imagens",
    data: "maio de 2023",
    proporcao: "3/2",
    fornecidaPor: "acervo-verificado",
  },
  "bertha-lutz-1927": {
    src: "/fotos/bertha-lutz-1927.jpg",
    alt: "Bertha Lutz ao lado de um avião usado na campanha pelo voto feminino, em 1927.",
    credito: "Domínio público / Acervo Arquivo Nacional",
    acervo: "Fundo Federação Brasileira pelo Progresso Feminino",
    licenca: "dominio-publico",
    licencaUrl: "https://commons.wikimedia.org/wiki/File:Bertha_Lutz_e_a_campanha_pelo_voto_feminino.jpg",
    data: "1927",
    proporcao: "3/2",
    fornecidaPor: "acervo-verificado",
  },
  // "lelia-gonzalez": { src: "/fotos/...", alt: "...", credito: "...", acervo: "...", licenca: "...", proporcao: "4/5", fornecidaPor: "editora" },
};

export const LICENCA_ROTULO: Record<Licenca, string> = {
  "CC-BY": "Creative Commons BY (ver condições da fonte)",
  "CC-BY-4.0": "CC BY 4.0",
  "CC-BY-SA-4.0": "CC BY-SA 4.0",
  CC0: "CC0",
  "dominio-publico": "domínio público",
  "cessao-autorizada": "uso autorizado",
};
