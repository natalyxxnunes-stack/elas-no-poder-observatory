/**
 * capa — a manchete e a ordem da página inicial (direção B, aprovada em 02/11/2026).
 *
 * A capa funciona como capa de revista: uma manchete principal, chamadas de
 * tamanhos diferentes, no máximo quatro números de 2026 (sem repetir valor),
 * Pioneiras e o caminho para explorar os dados.
 *
 * Regras:
 *  - só entram falas com `publicar: true` em falas.ts;
 *  - a foto só aparece quando estiver registrada em fotos.ts (licença e crédito);
 *  - números saem das mesmas variáveis das páginas de origem.
 */
export const CAPA_MANCHETE = {
  kicker: "Reportagem · Na voz delas",
  titulo:
    "Elas separaram a bancada feminina do feminismo no plenário. As duas seguem no Congresso em 2027.",
  linhaFina:
    "O que deputadas e eleitas disseram em público sobre feminismo, direitos e violência contra mulheres, com data, fonte primária e o dado oficial ao lado.",
  to: "/na-voz-delas" as const,
  /** foto documental registrada em fotos.ts; sem registro, a capa abre sem imagem */
  fotoId: "capa-manchete",
  /** a primeira fala é a citação grande; as demais entram menores */
  falas: ["zanatta-2023-03-07", "kicis-2025-07-08"],
};
