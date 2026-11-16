/**
 * fotos — registro das fotografias documentais do site.
 *
 * Regra do projeto (AGENTS.md): nenhuma imagem gerada por IA; fotografia só
 * entra se for documental, com licença e crédito e com cópia local em
 * /public/fotos. As origens devem ser preservadas nos metadados.
 * Enquanto uma página não tiver foto registrada, o lugar mostra a peça gráfica
 * da própria página.
 */
export type Licenca = "CC-BY" | "CC-BY-4.0" | "CC-BY-SA-4.0" | "CC0" | "dominio-publico" | "uso-livre-com-credito" | "cessao-autorizada" | "verificacao-pendente";

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
  "posse-bertha-lutz-1936": {
    src: "/fotos/posse-bertha-lutz-camara-1936.jpg",
    alt: "Grupo de familiares, feministas e outras pessoas nas escadarias da Câmara dos Deputados, no Rio de Janeiro, após a posse de Bertha Lutz em 28 de julho de 1936.",
    credito: "Domínio público / Acervo Arquivo Nacional",
    acervo: "Fundo Federação Brasileira pelo Progresso Feminino, BR_RJANRIO_Q0_BLZ_DEU_CLE_FOT_0001",
    licenca: "dominio-publico",
    licencaUrl: "https://commons.wikimedia.org/wiki/File:Posse_de_Bertha_Lutz_como_Deputada_na_C%C3%A2mara_Federal.jpg",
    data: "28/07/1936",
    proporcao: "3/2",
    fornecidaPor: "acervo-verificado",
  },
  "plenario-camara-junho-2026": {
    src: "/fotos/plenario-camara-junho-2026.jpg",
    alt: "Vista ampla do plenário da Câmara dos Deputados durante sessão deliberativa, em 30 de junho de 2026.",
    credito: "Thiago Cristino/Câmara dos Deputados",
    acervo: "Agência Câmara de Notícias; sessão deliberativa de 30/06/2026",
    licenca: "CC-BY",
    licencaUrl: "https://www.camara.leg.br/internet/bancoimagem/default.asp?data=30%2F06%2F2026",
    data: "30/06/2026",
    proporcao: "3/2",
    fornecidaPor: "acervo-verificado",
  },
  "pl1446-protecao-pre-candidatura": {
    src: "/fotos/renilce-nicodemos-pl1446-camara.jpg",
    alt: "Deputada Renilce Nicodemos fala ao microfone na Câmara dos Deputados, diante da bandeira brasileira.",
    credito: "Kayo Magalhães/Câmara dos Deputados",
    acervo: "Agência Câmara, reportagem sobre o PL 1446/2025 publicada em 01/07/2026; fotografia de arquivo, data original não confirmada",
    licenca: "uso-livre-com-credito",
    licencaUrl: "https://www2.camara.leg.br/comunicacao/assessoria-de-imprensa/guia-para-jornalistas/noticias-e-fotografias",
    data: "Fotografia de arquivo (data não confirmada)",
    proporcao: "3/2",
    fornecidaPor: "acervo-verificado",
  },
  "local-votacao-primeiro-turno-2026": {
    src: "/fotos/local-votacao-2026-agencia-senado.jpg",
    alt: "Duas pessoas caminham diante de painel de informações na entrada do local de votação do UniCEUB Asa Norte, em Brasília, no primeiro turno de 2026.",
    credito: "Saulo Cruz/Agência Senado",
    acervo: "Flickr da Agência Senado, fotografia de 04/10/2026, arquivo verificado no Wikimedia Commons",
    licenca: "CC-BY-SA-4.0",
    licencaUrl: "https://commons.wikimedia.org/wiki/File:Elei%C3%A7%C3%B5es_2026_-_Primeiro_turno_(55567948757).jpg",
    data: "04/10/2026",
    proporcao: "3/2",
    fornecidaPor: "acervo-verificado",
  },
  "lelia-gonzalez": {
    src: "/fotos/lelia-gonzalez-cezar-loureiro-referencia.jpg",
    alt: "Retrato histórico de Lélia Gonzalez atribuído ao fotógrafo Cezar Loureiro, em imagem horizontal.",
    credito: "Cezar Loureiro / Wikimedia Commons (origem informada: revista Cult)",
    acervo: "Cópia armazenada somente em docs/acervo-em-revisao para avaliação editorial e jurídica; versão pública bloqueada",
    licenca: "verificacao-pendente",
    licencaUrl: "https://commons.wikimedia.org/wiki/File:L%C3%A9lia_Gonzalez_by_Cezar_Loureiro.jpg",
    data: "Anterior a 1994, segundo a ficha do Commons; primeira publicação por verificar",
    proporcao: "3/2",
    fornecidaPor: "acervo-verificado",
  },
  "pagu": {
    src: "/fotos/pagu-patricia-galvao-anos-1920.jpg",
    alt: "Retrato histórico de Patrícia Galvão, Pagu, olhando para a esquerda, com cabelo escuro e casaco de pele.",
    credito: "Autor não identificado / Wikimedia Commons",
    acervo: "Reproduzido em Depois da Cena, A Tribuna, março de 2008 (origem declarada no Commons)",
    licenca: "verificacao-pendente",
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
};

export const LICENCA_ROTULO: Record<Licenca, string> = {
  "CC-BY": "Creative Commons BY (ver condições da fonte)",
  "uso-livre-com-credito": "Livre utilização com crédito conforme regras da Câmara dos Deputados (sem licença CC individual indicada)",
  "CC-BY-4.0": "CC BY 4.0",
  "CC-BY-SA-4.0": "CC BY-SA 4.0",
  CC0: "CC0",
  "dominio-publico": "domínio público",
  "cessao-autorizada": "uso autorizado",
  "verificacao-pendente": "Wikimedia Commons indica domínio público; validação documental pendente",
};
