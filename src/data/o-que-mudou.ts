/**
 * o-que-mudou — comparação entre a primeira fotografia publicada depois do
 * prazo de registro (17/08/2026) e a fotografia vigente de candidaturas
 * (27/10/2026, a mesma do resultado). A fotografia intermediária de 25/09 fica
 * no histórico do repositório. As duas foram recontadas de forma independente a partir do
 * arquivo oficial do TSE e cravadas em código; os números de 17/08 estão no
 * histórico do repositório (src/data/tse-snapshot.ts no commit 687594a).
 *
 * É subtração simples entre duas contagens já verificadas: nenhum número novo
 * é estimado. A causa de cada entrada ou saída de registro não é explicada
 * aqui, porque o arquivo não informa o motivo da mudança.
 */

export type ChangeSnapshot = {
  label: string;
  baseGeneratedAt: string;
  brasilCsvSha256: string;
  proporcional: { total: number; feminine: number; raceFeminine: Record<string, number> };
  majoritario: { total: number; feminine: number; raceFeminine: Record<string, number> };
};

export const CHANGE_FROM: ChangeSnapshot = {
  label: "17/08/2026",
  baseGeneratedAt: "17/08/2026",
  brasilCsvSha256: "021ea104dc491665895e79374e677a4688d877f29e8164f3c446462afe363f91",
  proporcional: {
    total: 19142,
    feminine: 6756,
    raceFeminine: { BRANCA: 3092, PARDA: 2378, PRETA: 1167, "INDÍGENA": 79, AMARELA: 40 },
  },
  majoritario: {
    total: 523,
    feminine: 103,
    raceFeminine: { BRANCA: 64, PARDA: 23, PRETA: 15, AMARELA: 1 },
  },
};

export const CHANGE_TO: ChangeSnapshot = {
  label: "27/10/2026",
  baseGeneratedAt: "27/10/2026 19:30:36",
  brasilCsvSha256: "3a60b9a996590b60b39b3a9cca68d2207b89a2a0cf3b235fd6452459be9c0c3e",
  proporcional: {
    total: 19531,
    feminine: 6953,
    raceFeminine: { BRANCA: 3254, PARDA: 2379, PRETA: 1197, "INDÍGENA": 82, AMARELA: 41 },
  },
  majoritario: {
    total: 534,
    feminine: 107,
    raceFeminine: { BRANCA: 65, PARDA: 24, PRETA: 17, AMARELA: 1 },
  },
};

export const RACE_ORDER = ["BRANCA", "PARDA", "PRETA", "INDÍGENA", "AMARELA"] as const;
