/**
 * historical.functions — ponto de entrada histórico dos imports do projeto.
 *
 * A série histórica também é lida direto do banco pelo navegador (RLS de
 * leitura pública). A implementação vive em `historical.reads.ts`; este arquivo
 * apenas reexporta.
 */

export type {
  HistoricalSeriesPayload,
  HistoricalSnapshotMeta,
} from "./historical.reads";

export { getHistoricalSeries } from "./historical.reads";
