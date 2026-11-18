/**
 * FEFC recebido por candidatura em 2026, por partido, gênero e cor/raça.
 * Recontagem do CSV do TSE de 17/11/2026 (09:03:49), combinada com
 * candidaturas registradas em 17/11/2026 (19:31:29).
 *
 * Os objetos vêm das saídas versionadas do script
 * scripts/recontagem/fefc_partidos_2026.py, com linhas integralmente
 * duplicadas removidas: docs/auditorias/financiamento-2026-17nov/.
 *
 * O universo "proporcional" abrange deputado federal, estadual e distrital
 * (incluindo candidaturas sem FEFC); "titulares" acrescenta presidente,
 * governador e senador. Vice e suplentes não entram. Pretas e pardas aparecem
 * separadas; o campo pretasPardasSoma é uma agregação explícita para o uso
 * legal do termo "candidaturas negras".
 *
 * Este quadro NÃO comprova cumprimento legal das cotas; informa os recursos
 * declarados como recebidos pelas candidaturas, distintos dos gastos partidários.
 * Fotografia posterior ao prazo final do 2º turno (16/11), ainda com contas
 * não finais, sujeita a retificações e julgamento.
 */
import proporcional from "../../docs/auditorias/financiamento-2026-17nov/fefc-proporcional.json";
import titulares from "../../docs/auditorias/financiamento-2026-17nov/fefc-titulares.json";

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
  baseGeneratedAt: "17/11/2026",
  csvSha256: "5c9b1e0456a8aa75bdecc5ac7ffc2bb52d4bbaa0099ec675a13b6ab73c0e04ba",
  proximaAtualizacao: "Base de 17/11/2026, posterior ao prazo do 2º turno (16/11); futuras retificações podem alterar os valores",
} as const;

export const FEFC_TOTAL: FefcPartido = proporcional.total;
export const FEFC_PARTIDOS: Record<string, FefcPartido> = proporcional.partidos;
export const FEFC_PARTIDOS_SEM_FUNDO: readonly string[] = proporcional.partidosSemFefc;

/** Candidaturas titulares dos cargos proporcionais e majoritários. */
export const FEFC_TOTAL_TITULARES: FefcPartido = titulares.total;
