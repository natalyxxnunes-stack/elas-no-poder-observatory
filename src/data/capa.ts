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
 *
 * 09/11/2026: a reportagem "Na voz delas" saiu da capa até chegarem as
 * respostas aos pedidos de posicionamento (FALAS_PEDIDO_ENVIADO_EM, em
 * falas.ts, ainda está vazio). A página /na-voz-delas segue no ar. Para
 * voltar com ela, restaurar secao, titulo, linhaFina, to e falas
 * ["zanatta-2023-03-07", "kicis-2025-07-08"] a partir do histórico do git.
 * Sem falas, o bloco de citação da capa não aparece.
 */
import { M_VOTOS } from "@/data/manchetes";

export const CAPA_MANCHETE = {
  secao: "Na urna",
  tipo: "achados",
  titulo: `${M_VOTOS.texto}.`,
  linhaFina:
    "Da candidatura à cadeira, a fatia de mulheres na disputa pela Câmara encolhe a cada etapa. A conta sai dos arquivos do TSE de 2026, recontados candidatura por candidatura.",
  to: "/votos" as const,
  /** foto documental registrada em fotos.ts; sem registro, a capa abre sem imagem */
  fotoId: "capa-manchete",
  /** a primeira fala é a citação grande; as demais entram menores */
  falas: [] as string[],
};
