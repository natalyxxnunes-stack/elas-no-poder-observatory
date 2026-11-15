/**
 * FEFC recebido por candidatura em 2026, por partido, gênero e cor/raça.
 * Recontagem do CSV do TSE de 13/11/2026 (15:07:34), combinada com
 * candidaturas registradas em 14/11/2026 (16:31:37).
 *
 * Os objetos vêm das saídas versionadas do script
 * scripts/recontagem/fefc_partidos_2026.py, com linhas integralmente
 * duplicadas removidas: docs/auditorias/financiamento-2026-13nov/.
 *
 * O universo "proporcional" abrange deputado federal, estadual e distrital
 * (incluindo candidaturas sem FEFC); "titulares" acrescenta presidente,
 * governador e senador. Vice e suplentes não entram. Pretas e pardas aparecem
 * separadas; o campo pretasPardasSoma é uma agregação explícita para o uso
 * legal do termo "candidaturas negras".
 *
 * Este quadro NÃO comprova cumprimento legal das cotas; informa os recursos
 * declarados como recebidos pelas candidaturas, distintos dos gastos partidários.
 * Versão provisória, anterior ao prazo final de contas do 2º turno (14/11).
 */
import proporcional from "../../docs/auditorias/financiamento-2026-13nov/fefc-proporcional.json";
import titulares from "../../docs/auditorias/financiamento-2026-13nov/fefc-titulares.json";

export type FefcGrupo = { candidaturas: number; fefc: number };
export type FefcPartido = {
  candidaturas: number;
  comFefc: number;
  fefc: number;
  mulheres: FefcGrupo;
  raca: Record<string, FefcGrupo>;
  mulheresRaca: Record<string, FefcGrupo>;
  pretasPardasSoma: FefcGrupo;
};

export const FEFC_META = {
  baseGeneratedAt: "13/11/2026",
  csvSha256: "722c27a3c71ed4ed2c268b4baae189e1231ae95be2f40bb2bd1edc4e2bc7f35b",
  proximaAtualizacao: "Nova geração da base após o prazo de 14/11/2026 (2º turno); data ainda não confirmada",
} as const;

export const FEFC_TOTAL: FefcPartido = proporcional.total;
export const FEFC_PARTIDOS: Record<string, FefcPartido> = proporcional.partidos;
export const FEFC_PARTIDOS_SEM_FUNDO: readonly string[] = proporcional.partidosSemFefc;

/** Candidaturas titulares dos cargos proporcionais e majoritários. */
export const FEFC_TOTAL_TITULARES: FefcPartido = titulares.total;
