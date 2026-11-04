import { MONITOR_CAMARA } from "@/data/monitor-camara";

/** mínimo de votações em exercício para entrar em percentual */
export const MIN_VOTACOES = 20;

/** presença das deputadas no registro de votação: soma dos votos ÷ soma das votações em exercício (quem tem 20 ou mais) */
export const PRESENCA_DEPUTADAS = (() => {
  const base = MONITOR_CAMARA.filter((l) => l.votacoesEmExercicio >= MIN_VOTACOES);
  const em = base.reduce((a, l) => a + l.votacoesEmExercicio, 0);
  const voto = base.reduce((a, l) => a + l.votosRegistrados, 0);
  return em ? (100 * voto) / em : 0;
})();
