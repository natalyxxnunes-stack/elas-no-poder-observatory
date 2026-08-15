/**
 * snapshot.functions — ponto de entrada histórico dos imports do projeto.
 *
 * A leitura da fotografia deixou de exigir servidor: a tabela de fotografias
 * tem leitura pública por RLS e cada fotografia pesa poucos kilobytes, então o
 * próprio navegador lê o banco com a chave publicável. A implementação vive em
 * `snapshot.reads.ts`; este arquivo apenas reexporta, para não quebrar os
 * imports existentes.
 */

export type {
  PublicSnapshot,
  PublicUniverseTally,
} from "./snapshot.reads";

export {
  getLatestTseSnapshot,
  getLatestTseSnapshotCsv,
  getPendingReviewBaseDate,
  getSnapshotStamp,
  listTseSnapshots,
} from "./snapshot.reads";
