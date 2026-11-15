/**
 * Despesas contratadas e pagas, financiamento coletivo e doadores originários,
 * recontados de arquivos oficiais do TSE gerados em 15/11/2026 (04:05:10),
 * cruzados com Candidatos 2026 de 15/11/2026 (05:30:40).
 *
 * Script original: scripts/recontagem/despesas_doadores_2026.py.
 * Saída integral agregada, hashes e auditoria:
 * docs/auditorias/financiamento-2026-15nov/despesas-agregadas.json.
 *
 * As linhas integralmente repetidas contam uma vez. Gastos contratados,
 * pagamentos por fonte e doações recebidas são conceitos distintos e não
 * devem ser somados nem tratados como equivalentes.
 *
 * Referência anterior preservada no histórico Git (04/11/2026). Esta base
 * sucede o prazo final do segundo turno (14/11), mas inclui contas ainda
 * não finais e não representa contas julgadas definitivamente.
 */
import despesas from "../../docs/auditorias/financiamento-2026-15nov/despesas-agregadas.json";

export const DESPESAS_META = {
  baseGeneratedAt: "15/11/2026",
  candidateGeneratedAt: "15/11/2026",
  fefcLabel: "Fundo Especial de Financiamento de Campanha",
} as const;

export type DespesaRaca = {
  candidaturas: number;
  pagoPorFonte: Record<string, number>;
  comVaquinha: number;
  vaquinhaTotal: number;
  vaquinhaMediana: number;
  doadoresMediana: number;
};
export type DespesaGrupo = {
  candidaturas: number;
  contratadoTotal: number;
  contratadoPorTipo: Record<string, number>;
  pagoPorFonte: Record<string, number>;
  comVaquinha: number;
  vaquinhaTotal: number;
  vaquinhaMediana: number;
  doadoresMediana: number;
  doadoresDistintos: number;
  porRaca: Record<string, DespesaRaca>;
};

export const DESPESAS_2026: Record<
  "proporcional" | "majoritario",
  { FEMININO: DespesaGrupo; MASCULINO: DespesaGrupo }
> = {
  proporcional: despesas.proporcional,
  majoritario: despesas.majoritario,
};
