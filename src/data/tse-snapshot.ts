/**
 * tse-snapshot — ponto único de entrada dos números do site.
 *
 * Fotografia CRAVADA: o site estático exibe sempre estes números. Recontagem
 * independente de `consulta_cand_2026_BRASIL.csv` (dedup por SQ_CANDIDATO,
 * latin1, separador `;`), base gerada pelo TSE em 25/09/2026 às 12:31:26,
 * SHA-256 do CSV 0327ca7868179bd780249a3529f5d3b0bbe5218067a159372f2b89c372a5fe54.
 * O arquivo de 2026 traz DS_SITUACAO_CANDIDATURA = "#NE" em todas as linhas:
 * nenhuma candidatura é filtrada por situação.
 *
 * Regra: nada aqui pode ser preenchido à mão. Apenas saída verificável do
 * processamento de TSE / Dados Abertos / Candidatos 2026.
 */

import type { UniverseId } from "@/lib/tse/compute";

export type UniverseSnapshot = {
  feminine: number;
  total: number;
  /** cor/raça das candidaturas de mulheres (categorias originais) */
  raceCounts: Record<string, number>;
  /** cor/raça de TODAS as candidaturas do universo (categorias originais) */
  raceAllCounts: Record<string, number>;
  dimensions?: {
    feminineByUf?: Record<string, number>;
    totalByUf?: Record<string, number>;
    totalByCargo?: Record<string, number>;
    feminineByCargo?: Record<string, number>;
    totalByParty?: Record<string, number>;
    feminineByParty?: Record<string, number>;
    raceByParty?: Record<string, Record<string, number>>;
    raceByUf?: Record<string, Record<string, number>>;
    raceByUfParty?: Record<string, Record<string, number>>;
    totalByUfParty?: Record<string, number>;
    feminineByUfParty?: Record<string, number>;
  };
};

export type TseSnapshot = {
  datasetUrl: string;
  resourceUrl: string;
  baseGeneratedAt: string;
  processedAt: string;
  filters: string[];
  universes: Record<UniverseId, UniverseSnapshot>;
  outOfUniverse?: {
    total: number;
    byCargo: Record<string, number>;
    feminineByCargo: Record<string, number>;
  };
};

export const PINNED_BRASIL_CSV_SHA256 =
  "0327ca7868179bd780249a3529f5d3b0bbe5218067a159372f2b89c372a5fe54";

export const PINNED_FILE_NAME = "consulta_cand_2026.zip";

/** Ordem das categorias originais de DS_COR_RACA nos vetores de PACKED. */
const RACE_ORDER = ["BRANCA", "PARDA", "PRETA", "INDÍGENA", "AMARELA", "NÃO DIVULGÁVEL", "NÃO INFORMADO"] as const;

/**
 * UF → partido → [total de candidaturas, mulheres brancas, pardas, pretas,
 * indígenas, amarelas, não divulgável, não informado] (zeros finais omitidos).
 * Presidência (SG_UF = BR) fica fora dos recortes por UF.
 */
const PACKED: Record<UniverseId, Record<string, Record<string, number[]>>> = {"proporcional":{"AM":{"PT":[21,0,4,4,1],"PODE":[34,5,7],"REPUBLICANOS":[34,6,6],"MOBILIZA":[2,1],"PSB":[18,1,6,1],"MISSÃO":[9,1,2],"AVANTE":[32,3,7],"UP":[2,1],"PL":[34,5,8],"DC":[9,1,2],"MDB":[33,0,9,0,3],"NOVO":[35,3,8],"PSD":[34,4,8],"PSOL":[15,4,1,1],"UNIÃO":[30,4,7],"AGIR":[25,2,6,1],"PDT":[32,2,6,1,2],"PP":[5,0,2],"SOLIDARIEDADE":[8,0,3],"REDE":[10,0,1,1,2],"PCDOB":[7,2,1],"PSTU":[4,0,2]},"RS":{"AGIR":[16,3,2],"AVANTE":[23,6,2,1],"DEMOCRATA":[25,5,1,1,1],"MDB":[84,21,3,3],"PSB":[47,13,0,5],"NOVO":[70,20,1,1],"CIDADANIA":[9,3,0,1],"MISSÃO":[22,5,2],"PSOL":[44,12,1,6],"PT":[61,14,3,5,1],"PCDOB":[8,1,0,2],"PSDB":[68,19,1,2],"PRD":[5,1,0,2],"SOLIDARIEDADE":[12,3,0,1],"PL":[88,28],"PSD":[69,18,2,5,1],"REPUBLICANOS":[88,21,4,2],"DC":[23,5,1,1],"PDT":[79,17,1,7],"PODE":[78,21,2,2],"UNIÃO":[17,7],"PP":[43,13,1,1],"PV":[8,3],"UP":[5,2],"REDE":[4,1,1],"PSTU":[4,2]},"MS":{"PP":[19,5,1],"REPUBLICANOS":[33,5,5,1],"SOLIDARIEDADE":[3,1],"PT":[26,4,2,3],"PRD":[23,4,4,0,0,1],"PSOL":[17,5,2,0,1],"AVANTE":[33,9,4],"PL":[34,3,6,2,1],"NOVO":[31,8,2],"PDT":[25,1,5,3],"UNIÃO":[14,5,2,1],"DC":[27,5,3,0,0,1],"MDB":[28,7,1,1],"PSDB":[31,7,2,1],"PV":[5,0,2],"AGIR":[6,2,1],"PCO":[8,0,0,0,3],"CIDADANIA":[2,1],"MISSÃO":[6,2],"PCDOB":[3,1,0,1],"REDE":[3,1]},"GO":{"PSDB":[57,6,12],"MDB":[60,17,9,2,0,1],"PODE":[57,13,7,2],"PP":[10,3,2],"PL":[61,16,7,2],"PT":[52,8,5,6],"DC":[52,10,7,2],"PDT":[18,2,3,2],"SOLIDARIEDADE":[26,5,4],"PSB":[49,6,7,4],"PRD":[33,5,6,2],"PSD":[29,8,2,0,1],"PSOL":[33,3,6,4],"MISSÃO":[14,1,3,1],"NOVO":[61,9,8,2],"REPUBLICANOS":[48,13,4,3],"MOBILIZA":[41,6,8,1,0,1],"UNIÃO":[52,10,12,5],"AGIR":[41,5,9,2],"DEMOCRATA":[32,4,9],"CIDADANIA":[5,1,1,1],"PV":[5,1,1],"PCDOB":[4,1,1],"REDE":[15,3,2],"UP":[4,0,1,1]},"DF":{"PSD":[34,8,3],"MOBILIZA":[34,4,4,3],"DEMOCRATA":[36,6,4,2],"AVANTE":[35,5,4,2],"PRD":[11,2,1],"SOLIDARIEDADE":[25,2,3,1,0,2],"PSDB":[36,2,10,4,0,1],"PSOL":[22,3,5,3],"MISSÃO":[20,4,1,0,0,1],"DC":[34,5,2,4],"PSB":[26,4,3,2,1],"PDT":[34,4,5,2],"NOVO":[35,9,2,3],"PT":[26,4,4,2,1],"PODE":[35,4,8],"REPUBLICANOS":[34,9,1,1],"UNIÃO":[18,3,2,2],"PP":[17,4,2],"PL":[34,9,1,1],"MDB":[30,7,3],"REDE":[11,2,1,2,1],"PV":[5,1,1],"AGIR":[2,0,1],"UP":[4,1,1],"PCDOB":[2,0,0,1],"PCO":[3,2],"CIDADANIA":[2,1]},"PA":{"PODE":[61,7,9,2,0,1],"SOLIDARIEDADE":[30,3,4,2],"PDT":[57,6,7,6],"NOVO":[38,5,4,4],"AVANTE":[40,4,8,1,1],"DC":[30,2,8,1],"UNIÃO":[39,5,7,2],"PSTU":[5,0,0,2],"PT":[47,2,8,6,1],"PV":[8,0,2,1],"PSB":[18,3,4],"PL":[63,10,12,2,1],"MDB":[44,11,2,1],"PP":[12,3,2],"REPUBLICANOS":[58,5,12,2],"REDE":[16,1,1,4],"PSOL":[24,1,4,5,1],"PSDB":[14,0,6,2],"MISSÃO":[11,2,3],"PSD":[36,4,7,0,1],"MOBILIZA":[6,0,2,1],"UP":[4,1,0,1],"PCDOB":[4,1,1],"PRD":[11,4,3],"CIDADANIA":[9,1,3]},"SP":{"PSD":[163,42,4,5],"DC":[168,42,5,1,1,2],"PP":[74,18,2,3],"MISSÃO":[113,42,3,1],"MDB":[157,32,11,6,2],"DEMOCRATA":[50,13,2,1],"AVANTE":[136,24,8,10],"NOVO":[170,48,11,2],"UP":[8,2,0,2],"PSDB":[139,23,15,6,2],"REPUBLICANOS":[119,24,11,3],"UNIÃO":[82,20,7,2],"MOBILIZA":[67,11,4,3,1],"PT":[126,27,5,12,1],"PDT":[103,18,5,10],"PODE":[149,36,8,6,0,2],"PSOL":[94,12,6,11,2,1],"REDE":[19,3,2,2],"PRD":[69,18,1,3],"SOLIDARIEDADE":[58,13,3,3],"PL":[166,39,5,8,0,2],"CIDADANIA":[26,5,2,2],"PSB":[158,33,8,10,0,1],"PV":[5,2],"PSTU":[8,2,2],"AGIR":[104,12,17,6],"PCO":[23,8,0,2],"PCDOB":[9,1,1,2]},"SC":{"PODE":[57,18,1,2],"PRD":[34,11,2],"NOVO":[54,17,0,3],"DC":[17,5,1],"CIDADANIA":[6,4],"PSOL":[41,7,2,5,2],"PL":[55,17,1],"REPUBLICANOS":[46,13,2,2],"PT":[43,11,1,5,2],"MDB":[44,13,0,2],"AVANTE":[28,5,2,2],"PDT":[43,11,1,2,1],"MISSÃO":[34,10,0,0,0,1],"PSD":[35,11,2],"UNIÃO":[27,6,3,2],"PP":[29,7,1,2],"AGIR":[6,2],"SOLIDARIEDADE":[12,5,0,1],"PSDB":[16,4,1],"REDE":[4,1,1],"UP":[2,0,0,1],"PCDOB":[4,2],"PSB":[2,1],"PCO":[2,1],"PV":[2,0,0,1],"PSTU":[2,1]},"RJ":{"UNIÃO":[51,12,7,3],"PCO":[8,1,1,1],"MISSÃO":[30,6,3,2],"PL":[114,27,4,6,1],"MOBILIZA":[111,13,16,5],"DC":[118,17,14,7],"SOLIDARIEDADE":[91,14,13,7],"DEMOCRATA":[110,13,7,16],"PODE":[96,13,8,9],"PSD":[113,16,8,12,0,1],"PP":[62,13,6,4],"PSDB":[108,21,11,3],"REPUBLICANOS":[118,21,6,10],"AGIR":[71,12,6,4],"PV":[15,1,4,1],"MDB":[97,13,7,14,0,1],"PSOL":[43,6,2,6],"PDT":[114,14,13,12],"PSTU":[4,2],"AVANTE":[117,9,15,13],"NOVO":[119,23,10,5,1],"PT":[81,9,3,11,2,1],"PCDOB":[7,2,0,2],"PSB":[118,13,10,16],"CIDADANIA":[9,4],"UP":[9,3,0,3],"PRD":[30,4,4,2],"REDE":[17,2,1,2,1]},"MA":{"REPUBLICANOS":[41,5,8],"PCB":[3,0,1],"PL":[42,7,7,1],"MDB":[46,6,9,2],"UNIÃO":[32,4,5,1],"PP":[5,0,2],"MOBILIZA":[10,1,2],"NOVO":[37,3,7,2],"PSB":[43,6,7,1],"PODE":[18,1,7],"PDT":[31,4,5,3],"PT":[37,3,10,2,1],"PV":[3,0,1],"PCDOB":[9,1,1,1],"PSD":[34,8,3,1],"CIDADANIA":[8,0,3],"PSDB":[10,1,2,1],"PRD":[30,4,7,1],"PSOL":[41,3,3,8],"REDE":[11,2,1,1],"AVANTE":[48,4,10,3],"DC":[7,2,1],"PSTU":[2,0,0,1],"SOLIDARIEDADE":[11,3,1],"MISSÃO":[6,1,0,1],"UP":[2,1]},"RR":{"PL":[34,3,7,1,1],"PSDB":[38,8,6,1],"DC":[20,2,3,1],"MDB":[31,3,8,1],"NOVO":[22,2,3,2],"PODE":[35,3,8,1,0,1],"CIDADANIA":[2,1],"PV":[12,2,3],"SOLIDARIEDADE":[3,1],"UNIÃO":[27,1,8,1],"REPUBLICANOS":[32,5,6,2],"PDT":[29,1,8,1],"AGIR":[25,1,7,1],"PT":[24,1,2,4,3],"PSOL":[9,1,1,0,2],"MISSÃO":[3,1],"PRD":[3,0,1,1],"PP":[6,1,0,1],"AVANTE":[3,0,1]},"PB":{"PL":[51,11,7],"AVANTE":[12,0,3],"MDB":[33,10,2],"PDT":[33,6,5,1],"PSOL":[10,1,1,2],"REDE":[19,3,3,1],"DEMOCRATA":[9,1,0,2,1],"NOVO":[13,1,3],"MOBILIZA":[6,0,1,1],"SOLIDARIEDADE":[9,3,1],"REPUBLICANOS":[33,4,4,2],"PSB":[32,6,5,4],"UNIÃO":[9,2,3],"PP":[42,7,5],"PSD":[14,3,3,1],"PV":[12,2,2],"PT":[21,3,2,4],"DC":[9,1,2],"PODE":[12,4,1],"PRD":[5,2],"PCDOB":[6,0,0,2],"MISSÃO":[6,2],"PCO":[2,1],"UP":[5,0,1,0,1]},"AL":{"MISSÃO":[10,2,2],"SOLIDARIEDADE":[26,4,5,1],"AVANTE":[7,0,2],"PSDB":[37,6,7,1],"PRD":[24,2,5,2],"PL":[23,2,5],"PT":[20,4,2,1],"PV":[7,2,0,1],"MDB":[37,6,5,1],"PP":[16,3,3,2],"DEMOCRATA":[5,1,1],"UNIÃO":[9,2,1],"NOVO":[6,2,0,1],"DC":[17,2,2,2],"PSD":[10,3,3],"UP":[4,1,1],"PCDOB":[4,0,0,2]},"PR":{"AVANTE":[34,6,1,2,0,1],"PDT":[71,22,4,3],"SOLIDARIEDADE":[19,5,1,1],"DEMOCRATA":[27,7,2,2],"UNIÃO":[41,10,1,1,0,1],"PSDB":[68,14,4,4],"CIDADANIA":[20,6,1],"MDB":[69,18,3,1],"PSOL":[31,9,2,5],"REDE":[35,6,3,2],"MISSÃO":[64,16,2,3],"REPUBLICANOS":[48,13,2],"NOVO":[73,22,1,1],"PP":[48,13,1,1],"PSTU":[2,1],"PL":[87,24,4,1],"PODE":[80,19,5,2],"PT":[67,17,2,10],"MOBILIZA":[15,1,3,1],"PSD":[80,19,3,3,1,1],"PRD":[17,6,1],"PSB":[31,6,3,1],"PCDOB":[5,2,0,1],"UP":[4,0,0,2],"PV":[5,1,0,1],"PCO":[4,1,1]},"ES":{"PL":[45,7,9],"PODE":[43,8,1,5],"MDB":[31,5,5],"DEMOCRATA":[30,7,2,3],"AGIR":[31,4,4,2],"REDE":[10,0,2,1],"PSOL":[17,0,3,4],"REPUBLICANOS":[31,3,4,4],"PSDB":[24,3,2,3],"DC":[40,7,6,1],"PSD":[9,3],"NOVO":[39,5,6,1,1],"SOLIDARIEDADE":[20,0,5,2],"AVANTE":[12,2,2],"PP":[23,5,2,1],"PSB":[42,8,3,3,1],"UNIÃO":[16,1,2,2],"PT":[30,4,3,3],"PV":[5,1,1],"PDT":[24,4,4],"MISSÃO":[13,2,2],"PCDOB":[4,0,1,1],"PRD":[6,0,2,1],"UP":[2,1]},"PI":{"UNIÃO":[7,0,1,2],"PT":[33,4,4,3],"PP":[35,4,5,2],"AVANTE":[21,0,6,2],"DC":[10,1,2],"PODE":[6,2,1],"MDB":[34,5,6,1],"PCDOB":[2,1],"PSDB":[25,0,7,2],"PSD":[32,4,6,1],"PL":[28,5,3,1],"NOVO":[11,1,1,1,0,1],"UP":[2,0,0,1],"PSOL":[13,2,3,3],"MOBILIZA":[11,0,2,2],"PCO":[2,1],"DEMOCRATA":[10,0,2,1],"PV":[5,0,2],"PDT":[7,1,2,1],"REPUBLICANOS":[10,1,2],"MISSÃO":[8,2,1],"REDE":[2,0,0,1],"CIDADANIA":[3,0,1]},"BA":{"PDT":[91,3,21,6,0,1],"MOBILIZA":[50,1,11,5],"DC":[40,1,7,3],"REPUBLICANOS":[107,9,20,6],"SOLIDARIEDADE":[27,0,7,2],"PSOL":[66,4,7,11,2],"NOVO":[35,3,5,4,1],"AGIR":[21,2,3,2],"REDE":[19,0,2,5],"PSD":[41,6,6,4],"UNIÃO":[73,4,14,5],"PP":[26,3,5],"PSB":[57,4,6,7,1],"PSDB":[89,6,12,15],"CIDADANIA":[15,2,4,1],"AVANTE":[84,3,14,14],"MDB":[98,3,19,12,1],"PCDOB":[12,1,0,4],"PT":[50,5,6,4],"PL":[99,10,15,6],"PRD":[13,0,3,1],"PODE":[16,1,4,3],"MISSÃO":[24,2,5,1],"UP":[4,0,2],"PV":[21,3,2,3]},"PE":{"REDE":[25,4,4,0,1],"PCDOB":[9,3,1],"PP":[44,5,11],"DEMOCRATA":[15,2,2,1],"PSD":[62,8,12,5],"MISSÃO":[36,6,5,1],"MDB":[53,7,6,5],"PSDB":[24,0,4,1,0,1],"CIDADANIA":[4,2,1],"PL":[70,4,16,0,0,2],"PODE":[74,10,10,4],"NOVO":[76,6,15,2],"PV":[17,4,4],"SOLIDARIEDADE":[26,3,4,1],"AVANTE":[78,11,12,5],"PSB":[67,10,8,5],"REPUBLICANOS":[59,11,10],"UNIÃO":[29,3,6,2],"PT":[21,3,2,3],"PSOL":[31,4,4,4],"PRD":[9,1,2],"PDT":[21,2,3,3],"MOBILIZA":[40,4,7,1],"UP":[4,0,1,1],"DC":[9,2,1],"PCO":[4,0,0,2],"PSTU":[2,1]},"SE":{"PODE":[34,0,9,3],"PSDB":[7,2,1],"PSB":[30,3,6,4],"MDB":[30,4,5,5],"UNIÃO":[19,4,3],"NOVO":[9,0,2,0,1],"PV":[7,1,2],"PSD":[25,3,6],"MISSÃO":[8,1,2],"AVANTE":[36,5,5,2],"CIDADANIA":[2,0,1],"PL":[37,6,6,2,0,1],"REPUBLICANOS":[34,7,6,1],"PP":[15,3,3],"PT":[20,3,3,1],"SOLIDARIEDADE":[9,1,3],"PSOL":[17,3,1,2],"DC":[6,1,3],"PCDOB":[4,0,2],"PDT":[8,0,2,1],"UP":[4,0,2],"AGIR":[2,1]},"MG":{"AVANTE":[109,13,18,6],"PSDB":[79,12,18,6,1],"PODE":[135,15,19,12],"REDE":[49,4,9,6,0,1],"NOVO":[135,29,10,2],"MOBILIZA":[91,13,10,8,0,1],"PSB":[91,14,8,8],"MDB":[106,21,12,10,1],"PSD":[65,8,9,5],"UP":[5,0,0,2],"PRD":[73,15,7,2],"SOLIDARIEDADE":[43,4,9,1],"PDT":[120,17,10,15],"PSOL":[43,5,2,10,2],"PL":[123,31,9,1],"PSTU":[6,1,1],"MISSÃO":[32,7,2,1],"UNIÃO":[66,9,9,5],"PP":[63,11,11,5],"REPUBLICANOS":[82,11,11,8],"PCDOB":[8,2,0,1],"PT":[82,8,4,17],"PV":[26,8,1],"DC":[11,0,2,1],"DEMOCRATA":[45,4,7,6],"PCB":[3,1],"AGIR":[53,3,7,6],"PCO":[4,1,1],"CIDADANIA":[6,0,2,1]},"RO":{"PSOL":[19,2,4],"REPUBLICANOS":[32,5,6],"PODE":[31,6,6,1],"NOVO":[34,4,5,2],"PRD":[20,2,7,1],"MDB":[35,8,2,3],"MISSÃO":[3,0,1],"PDT":[9,1,1,1],"UNIÃO":[17,5,2],"PL":[30,3,5,1,0,1],"AVANTE":[30,2,7,1],"PSD":[34,6,5,1],"PSB":[17,1,5,1],"PV":[8,1,2,1],"PT":[21,3,2,3],"MOBILIZA":[23,1,1,3,1],"DC":[13,0,2,1],"PP":[10,2,1],"SOLIDARIEDADE":[6,1,1],"PCDOB":[2,1]},"AC":{"PSOL":[8,0,2,1],"MDB":[28,2,6,1],"PRD":[9,0,4],"SOLIDARIEDADE":[19,0,7,0,0,1],"PDT":[24,5,5,1],"UNIÃO":[17,1,5],"PL":[28,3,5,3],"PSDB":[24,3,5,0,0,1],"DEMOCRATA":[3,0,2],"PODE":[31,1,9,0,0,1],"PP":[17,3,5,1],"PT":[17,1,2,3],"PV":[5,0,0,2],"PSD":[21,2,4,1],"NOVO":[31,3,5,2],"CIDADANIA":[9,1,3],"PSB":[12,0,4,0,0,1],"REPUBLICANOS":[30,4,4,1],"AGIR":[6],"AVANTE":[4,0,1,1],"PCDOB":[5,0,2],"REDE":[1,0,1]},"CE":{"PSOL":[31,3,1,7],"REPUBLICANOS":[50,7,10],"NOVO":[30,2,7],"PODE":[24,3,5],"UNIÃO":[49,9,5,3],"PRD":[25,3,6],"REDE":[16,2,4,0,1],"PSB":[46,7,8,1,1],"PSDB":[50,8,9],"CIDADANIA":[5,2],"MDB":[39,7,8,2],"MISSÃO":[9,1,1,1],"PDT":[38,5,4,5,1],"PT":[43,8,2,6],"MOBILIZA":[41,3,7,4],"AVANTE":[6,2],"PL":[56,10,10,0,0,1],"PSD":[41,6,9,0,1],"PP":[16,2,3],"PCDOB":[5,0,0,2],"SOLIDARIEDADE":[24,3,3,3],"PV":[11,1,3,1],"PSTU":[3,1],"DC":[5,0,2],"PCO":[3,0,2],"UP":[5,1,1]},"MT":{"AGIR":[23,3,2,2,1],"PODE":[34,8,3],"DC":[6,1,1],"PL":[34,8,3,1],"PSD":[32,3,7,1],"PT":[19,2,0,3,2],"DEMOCRATA":[5,1,1],"PP":[6,0,1,0,2],"PSDB":[32,4,5,2],"REPUBLICANOS":[32,5,4,1],"NOVO":[34,8,3],"PSB":[6,0,0,2],"SOLIDARIEDADE":[3,0,1],"CIDADANIA":[2,1],"PDT":[32,5,4,1,2],"UNIÃO":[13,2,4],"MDB":[26,3,5],"PSOL":[19,1,4,2],"REDE":[14,3,1,1],"MISSÃO":[6,0,2],"AVANTE":[9,2,1],"PV":[7,2,1],"PCDOB":[5,1,1],"PRD":[7,2]},"RN":{"DC":[7,0,2,0,1],"PSOL":[15,2,2,1,0,1],"PT":[16,4,1,3],"PP":[14,3,2],"CIDADANIA":[4,0,1,1],"PSDB":[31,8,3],"PRD":[19,2,4,1],"PL":[34,9,2],"PDT":[9,2,1],"NOVO":[9,1,1,1],"PV":[9,2,2],"MDB":[23,4,5],"UNIÃO":[14,5,1],"MISSÃO":[11,3,1],"PSB":[8,1,1,1],"PCDOB":[5,2],"REDE":[10,1,2],"PSTU":[2,0,0,1],"UP":[4,1,0,1],"AVANTE":[8,1,2],"SOLIDARIEDADE":[4,1,1],"MOBILIZA":[9,2,2,1]},"AP":{"REPUBLICANOS":[26,3,4,2],"REDE":[20,1,4,1,1],"PT":[13,2,3,1],"UNIÃO":[23,2,7],"PSD":[30,4,6,1],"PCO":[4,1,1],"PODE":[34,5,5,3],"NOVO":[23,2,7,1],"PSOL":[3,0,0,1],"PDT":[23,3,4,4],"DC":[9,0,2,2],"PV":[7,0,2,1],"PL":[33,3,5,3],"PCDOB":[6,0,2,1],"MDB":[22,2,5,2],"MISSÃO":[5,2],"PP":[4,1,0,1]},"TO":{"NOVO":[17,2,2,0,0,1],"PRD":[17,3,1,2],"MISSÃO":[6,0,2],"PL":[27,3,4,2],"PSDB":[34,6,2,3],"PODE":[27,2,5,3],"UNIÃO":[18,1,6,1],"PP":[12,1,3,1],"MDB":[19,2,3,1],"DC":[10,2,2],"PSD":[18,1,3,2],"REPUBLICANOS":[29,2,7,2],"PCDOB":[7,0,0,3],"PDT":[9,1,1,1],"PSB":[8,0,4],"DEMOCRATA":[6,1,1],"PT":[18,0,3,2,1],"PSOL":[8,1,1,1],"PV":[6,2,0,1],"SOLIDARIEDADE":[7,1,1,1],"REDE":[4,1,1,1]}},"majoritario":{"MT":{"REPUBLICANOS":[1],"PSD":[2,1],"MDB":[1,1],"PL":[2],"AGIR":[4],"MISSÃO":[1],"PP":[1,1],"DEMOCRATA":[1],"AVANTE":[1],"MOBILIZA":[1],"PSB":[1],"UNIÃO":[1]},"DF":{"UP":[2,1],"PSD":[2],"PP":[1,1],"AGIR":[2],"PRTB":[1],"NOVO":[2],"PSB":[1],"PL":[2,2],"PSTU":[2],"AVANTE":[1],"PSDB":[2,1],"PDT":[1,1],"PCO":[2],"DEMOCRATA":[1],"PT":[2,1]},"PE":{"UP":[3,1,1],"PT":[1],"DEMOCRATA":[2],"MISSÃO":[1],"PP":[1],"PSOL":[1],"PCO":[2],"REDE":[1],"NOVO":[1],"PDT":[1,1],"PSTU":[2],"PSD":[2,1],"PL":[1],"PSB":[1]},"SP":{"PSB":[1,1],"REDE":[1,0,0,1],"PSTU":[3,1,0,1],"AGIR":[2,1],"PP":[1],"UP":[3,2],"PL":[1],"PODE":[1],"PCB":[2],"CIDADANIA":[1,1],"NOVO":[1],"MISSÃO":[2],"PT":[1],"REPUBLICANOS":[1],"PCO":[2,0,1]},"SC":{"PL":[3,1],"MDB":[1],"PCO":[2,0,0,1],"UP":[3,3],"PT":[1],"PRD":[2],"PSD":[1],"PSB":[1],"PSTU":[3,1],"MISSÃO":[2],"PSOL":[1],"PP":[1]},"RJ":{"DEMOCRATA":[3],"PSOL":[2,1],"REPUBLICANOS":[3],"PCO":[2],"UP":[3,1,0,1],"PSTU":[2,0,1],"NOVO":[1],"PSD":[2],"PT":[1,0,0,1],"MISSÃO":[2],"PL":[3],"PRTB":[1],"PODE":[1]},"GO":{"MDB":[2],"PL":[3],"PRD":[1],"PSDB":[2],"PCO":[1],"CIDADANIA":[1],"PSD":[1],"UP":[2,1],"PSB":[1,1],"PSOL":[1,0,1],"UNIÃO":[1,1],"PT":[1]},"MA":{"PDT":[1],"MDB":[2,1],"MOBILIZA":[1],"PSTU":[2],"PRTB":[1],"PP":[1],"PL":[1],"DC":[1],"NOVO":[1],"PCO":[1],"PT":[2,0,1],"PSD":[1],"PSOL":[1],"PCB":[2],"MISSÃO":[1]},"PI":{"PP":[2],"DC":[3],"AVANTE":[4],"NOVO":[2],"PSTU":[2],"PSD":[1],"PSOL":[3,0,1],"PL":[1],"PSDB":[2,1],"MOBILIZA":[2],"DEMOCRATA":[3,0,2],"PCO":[2,0,1],"MDB":[1],"UP":[2],"PT":[1]},"AP":{"DC":[3,1],"UNIÃO":[2,1],"PCO":[2],"PODE":[1,0,1],"PSD":[2],"PSB":[1],"PT":[1],"PSTU":[1],"MDB":[1]},"BA":{"PCO":[2,1],"DC":[3],"MOBILIZA":[1],"REPUBLICANOS":[1],"PL":[1],"REDE":[1],"PT":[3],"UP":[2],"PSOL":[2,0,1],"UNIÃO":[1]},"AM":{"MDB":[1],"PSDB":[1],"PSTU":[2],"DC":[1],"PSD":[1],"REDE":[2],"MOBILIZA":[2],"UNIÃO":[2],"PL":[2,1],"AVANTE":[1],"PSOL":[1,0,1]},"RN":{"UNIÃO":[2],"PL":[2],"PSOL":[3,1],"AGIR":[3],"PSTU":[3,1,1],"PT":[2,1],"DC":[3],"PSD":[1,1],"UP":[2,0,0,1],"PCO":[1],"PDT":[1],"PODE":[1]},"PB":{"PL":[2],"REPUBLICANOS":[1],"MDB":[3],"UP":[3,0,0,1],"PCO":[2],"DC":[2],"PP":[1],"PSB":[1],"NOVO":[1]},"MG":{"UP":[3,0,0,2],"AVANTE":[1],"DC":[1],"PSD":[2],"PSDB":[2],"PL":[2],"MISSÃO":[1],"PSTU":[3,1],"PDT":[2],"MDB":[3],"PCB":[1],"PT":[2,0,1],"PCO":[2],"NOVO":[1],"PP":[1],"PSOL":[1,0,1],"REPUBLICANOS":[1]},"RR":{"REPUBLICANOS":[1],"DC":[1],"PCO":[1],"PSDB":[1],"PL":[3],"NOVO":[1,1],"PV":[1],"SOLIDARIEDADE":[1],"PSOL":[3,0,0,1],"MDB":[1,1],"PSD":[1,0,1],"PSB":[1],"UNIÃO":[1],"AVANTE":[1]},"PA":{"PSOL":[3,0,1,1],"UP":[2,1,0,1],"SOLIDARIEDADE":[1,0,0,1],"MOBILIZA":[1],"MDB":[2,1],"DEMOCRATA":[3,0,2],"PDT":[1],"PL":[1],"PSTU":[2,0,0,1],"PODE":[2],"DC":[2],"UNIÃO":[1]},"PR":{"MOBILIZA":[1],"PCO":[2],"MISSÃO":[2,1],"PL":[2],"NOVO":[1],"PSD":[2,1],"PDT":[1],"PSTU":[1],"REPUBLICANOS":[1],"UP":[2,0,0,0,0,1],"PT":[2,1]},"TO":{"NOVO":[2],"MDB":[1],"REDE":[1],"PSDB":[1],"DEMOCRATA":[4,0,1],"UNIÃO":[2,1],"PODE":[2],"PL":[1],"PSD":[1],"PT":[1],"PSOL":[2],"DC":[2],"REPUBLICANOS":[1]},"CE":{"NOVO":[3,1],"PSDB":[1],"PSTU":[2],"REDE":[1,1],"PT":[1],"PL":[1],"PCO":[2],"UP":[2,1],"UNIÃO":[1],"MISSÃO":[1],"PSB":[1],"DEMOCRATA":[1]},"AC":{"PSB":[1],"PSOL":[1],"PCB":[1],"AGIR":[1],"REPUBLICANOS":[2,1],"SOLIDARIEDADE":[1],"PT":[1],"PP":[2,1],"DC":[1],"PSD":[1],"PL":[1],"PSDB":[1]},"RS":{"PSOL":[1,1],"PSTU":[3,1,0,1],"UP":[3,2],"NOVO":[1],"CIDADANIA":[1],"PSD":[1],"PCO":[2],"PSDB":[2],"PL":[2],"MDB":[2],"PT":[1],"PDT":[1,1]},"AL":{"PSDB":[2,1],"UP":[2,0,1],"MDB":[3],"DEMOCRATA":[2],"REPUBLICANOS":[1],"PP":[1]},"SE":{"PL":[3],"MDB":[1],"PT":[1],"PSOL":[2],"PSD":[1],"DC":[3,1,1],"REPUBLICANOS":[3],"PSDB":[1],"UNIÃO":[1],"PDT":[1]},"MS":{"PCO":[2],"PRD":[2],"AGIR":[2],"DC":[2],"PL":[2],"PT":[2],"PSOL":[2],"NOVO":[2],"PSB":[1,1],"PP":[1]},"ES":{"PSD":[1],"PT":[2],"REPUBLICANOS":[2],"NOVO":[1],"DC":[1],"MISSÃO":[1],"PSB":[1],"PSOL":[1],"PL":[1,0,1],"AVANTE":[1],"PRTB":[1],"MDB":[2,1],"UP":[1]},"RO":{"PSD":[2],"REPUBLICANOS":[1,1],"UNIÃO":[1],"PL":[3],"PSB":[2,0,1],"MISSÃO":[1],"PDT":[1],"PP":[1,0,0,1],"MDB":[1],"PV":[1],"PT":[2,1]}}};

const BASE = {"proporcional":{"total":19528,"feminine":6951,"raceCounts":{"PRETA":1197,"PARDA":2379,"BRANCA":3252,"INDÍGENA":82,"AMARELA":41},"raceAllCounts":{"PRETA":2666,"BRANCA":9721,"PARDA":6859,"INDÍGENA":181,"AMARELA":101},"totalByCargo":{"DEPUTADO FEDERAL":7802,"DEPUTADO ESTADUAL":11293,"DEPUTADO DISTRITAL":433},"feminineByCargo":{"DEPUTADO FEDERAL":2870,"DEPUTADO DISTRITAL":152,"DEPUTADO ESTADUAL":3929}},"majoritario":{"total":534,"feminine":107,"raceCounts":{"BRANCA":65,"PRETA":17,"PARDA":24,"AMARELA":1},"raceAllCounts":{"BRANCA":321,"PRETA":57,"PARDA":144,"AMARELA":4,"INDÍGENA":7,"NÃO DIVULGÁVEL":1},"totalByCargo":{"GOVERNADOR":201,"SENADOR":319,"PRESIDENTE":14},"feminineByCargo":{"GOVERNADOR":35,"SENADOR":70,"PRESIDENTE":2}}} as const;

const OUT_OF_UNIVERSE = {"total":924,"byCargo":{"1º SUPLENTE":349,"2º SUPLENTE":350,"VICE-GOVERNADOR":211,"VICE-PRESIDENTE":14},"feminineByCargo":{"2º SUPLENTE":107,"VICE-GOVERNADOR":88,"1º SUPLENTE":106,"VICE-PRESIDENTE":6}};

function build(universe: UniverseId): UniverseSnapshot {
  const b = BASE[universe];
  const totalByUf: Record<string, number> = {};
  const feminineByUf: Record<string, number> = {};
  const raceByUf: Record<string, Record<string, number>> = {};
  const raceByUfParty: Record<string, Record<string, number>> = {};
  const totalByUfParty: Record<string, number> = {};
  const feminineByUfParty: Record<string, number> = {};
  for (const [uf, parties] of Object.entries(PACKED[universe])) {
    for (const [party, packed] of Object.entries(parties)) {
      const [total, ...races] = packed;
      if (total === undefined) continue;
      const key = `${uf}|${party}`;
      totalByUfParty[key] = total;
      totalByUf[uf] = (totalByUf[uf] ?? 0) + total;
      const cell: Record<string, number> = {};
      let women = 0;
      races.forEach((n, i) => {
        if (n <= 0) return;
        const race = RACE_ORDER[i];
        if (race === undefined) return;
        cell[race] = n;
        women += n;
        raceByUf[uf] = raceByUf[uf] ?? {};
        raceByUf[uf][race] = (raceByUf[uf][race] ?? 0) + n;
      });
      if (women > 0) raceByUfParty[key] = cell;
      feminineByUfParty[key] = women;
      feminineByUf[uf] = (feminineByUf[uf] ?? 0) + women;
    }
  }
  return {
    total: b.total,
    feminine: b.feminine,
    raceCounts: { ...b.raceCounts },
    raceAllCounts: { ...b.raceAllCounts },
    dimensions: {
      totalByCargo: { ...b.totalByCargo },
      feminineByCargo: { ...b.feminineByCargo },
      totalByUf,
      feminineByUf,
      raceByUf,
      raceByUfParty,
      totalByUfParty,
      feminineByUfParty,
    },
  };
}

/** Fotografia vigente, cravada em código. */
export const snapshot: TseSnapshot | null = {
  datasetUrl: "https://dadosabertos.tse.jus.br/dataset/candidatos-2026",
  resourceUrl: "https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_cand/consulta_cand_2026.zip",
  baseGeneratedAt: "2026-09-25",
  processedAt: "2026-09-25T16:40:00Z",
  filters: [
    "Dedup por SQ_CANDIDATO",
    "Universos proporcional e majoritário separados",
    "Cor/raça em categorias originais DS_COR_RACA, sem agregação",
    "Recortes por UF excluem a Presidência (circunscrição nacional)",
  ],
  universes: { proporcional: build("proporcional"), majoritario: build("majoritario") },
  outOfUniverse: OUT_OF_UNIVERSE,
};

export const LAST_FETCH_ATTEMPT = {
  at: "2026-09-25T16:40:00Z",
  outcome:
    "Fotografia de 25/09/2026 recontada de forma independente a partir do arquivo oficial de candidaturas do TSE (consulta_cand_2026_BRASIL.csv) e cravada em código, sem consulta ao banco em tempo de execução.",
} as const;
