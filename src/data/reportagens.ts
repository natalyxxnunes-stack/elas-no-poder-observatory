/**
 * reportagens — índice das reportagens assinadas do observatório.
 *
 * Separadas das páginas de dados: aqui entram textos com apuração, seleção e
 * leitura editoriais declaradas. Uma reportagem só entra no índice depois de
 * publicada no site; rascunhos ficam fora.
 */

export type Reportagem = {
  to: "/como-votaram";
  titulo: string;
  linhaFina: string;
  data: string;
  autora: string;
  tema: string;
};

export const REPORTAGENS: readonly Reportagem[] = [
  {
    to: "/como-votaram",
    titulo: "Como votaram as deputadas, e quem voltou",
    linhaFina:
      "Cinco votações de mérito na Câmara, de igualdade salarial a anistia às cotas, deputada por deputada, cruzadas com o resultado de 2026 e com o dinheiro de campanha.",
    data: "2026-10-27",
    autora: "Nataly Nunes Pinto",
    tema: "Câmara dos Deputados",
  },
];

export const REPORTAGENS_REGRA =
  "Toda reportagem declara o critério de seleção antes dos resultados, separa fato, interpretação e hipótese, e pede resposta às pessoas citadas pelo nome antes de publicar.";
