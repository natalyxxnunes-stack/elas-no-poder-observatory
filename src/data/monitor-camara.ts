/**
 * monitor-camara — o que cada deputada federal registrou no período, pelos
 * dados abertos da Câmara. GERADO por scripts/monitor/mandato_camara.py;
 * não editar à mão. Indicadores e limites descritos no script e no Método.
 */
export type LinhaMonitor = { id: number; nome: string; partido: string; uf: string; emExercicioHoje: boolean; votacoesEmExercicio: number; votosRegistrados: number; proposicoes: number; proposicoesPorTipo: Record<string, number>; discursos: number; em2026: { cargo: string; uf: string; partido: string; resultado: string } | null; ficha: string | null };
export const MONITOR_META = {"periodo": ["2026-01-01", "2026-11-03"], "coletaEm": "04/11/2026", "votacoesPlenario": 1336, "votacoesNominais": 126, "votacoesSemListaNaApi": 19, "casaPresencaPct": 80.3, "deputadasNoPeriodo": 99, "deputadasHoje": 89} as const;
export const MONITOR_CAMARA: readonly LinhaMonitor[] = [
{
"id": 204528,
"nome": "Adriana Ventura",
"partido": "NOVO",
"uf": "SP",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 116,
"proposicoes": 41,
"proposicoesPorTipo": {
"PDL": 9,
"PEC": 2,
"PL": 27,
"PLP": 3
},
"discursos": 144,
"em2026": {
"cargo": "deputada federal",
"uf": "SP",
"partido": "NOVO",
"resultado": "eleita"
},
"ficha": "adriana-ventura-sp"
},
{
"id": 74057,
"nome": "Alice Portugal",
"partido": "PCdoB",
"uf": "BA",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 111,
"proposicoes": 14,
"proposicoesPorTipo": {
"PDL": 1,
"PEC": 1,
"PL": 11,
"PLP": 1
},
"discursos": 29,
"em2026": {
"cargo": "deputada federal",
"uf": "BA",
"partido": "PCDOB",
"resultado": "eleita"
},
"ficha": "alice-portugal-ba"
},
{
"id": 204353,
"nome": "Aline Gurgel",
"partido": "UNIÃO",
"uf": "AP",
"emExercicioHoje": true,
"votacoesEmExercicio": 67,
"votosRegistrados": 35,
"proposicoes": 7,
"proposicoesPorTipo": {
"PL": 7
},
"discursos": 1,
"em2026": {
"cargo": "deputada federal",
"uf": "AP",
"partido": "UNIÃO",
"resultado": "eleita"
},
"ficha": "aline-gurgel-ap"
},
{
"id": 220707,
"nome": "Amanda Gentil",
"partido": "PP",
"uf": "MA",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 81,
"proposicoes": 8,
"proposicoesPorTipo": {
"PEC": 1,
"PL": 7
},
"discursos": 9,
"em2026": {
"cargo": "deputada federal",
"uf": "MA",
"partido": "PP",
"resultado": "eleita"
},
"ficha": "amanda-gentil-ma"
},
{
"id": 107970,
"nome": "Ana Paula Leão",
"partido": "PP",
"uf": "MG",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 97,
"proposicoes": 10,
"proposicoesPorTipo": {
"PEC": 5,
"PL": 4,
"PLP": 1
},
"discursos": 0,
"em2026": {
"cargo": "deputada federal",
"uf": "MG",
"partido": "PP",
"resultado": "suplente"
},
"ficha": null
},
{
"id": 220556,
"nome": "Ana Paula Lima",
"partido": "PT",
"uf": "SC",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 115,
"proposicoes": 49,
"proposicoesPorTipo": {
"PEC": 1,
"PL": 48
},
"discursos": 11,
"em2026": {
"cargo": "deputada federal",
"uf": "SC",
"partido": "PT",
"resultado": "eleita"
},
"ficha": "ana-paula-lima-sc"
},
{
"id": 220632,
"nome": "Ana Pimentel",
"partido": "PT",
"uf": "MG",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 114,
"proposicoes": 25,
"proposicoesPorTipo": {
"PEC": 1,
"PL": 23,
"PLP": 1
},
"discursos": 23,
"em2026": {
"cargo": "deputada federal",
"uf": "MG",
"partido": "PT",
"resultado": "eleita"
},
"ficha": "ana-pimentel-mg"
},
{
"id": 220676,
"nome": "Andreia Siqueira",
"partido": "PSB",
"uf": "PA",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 86,
"proposicoes": 4,
"proposicoesPorTipo": {
"PEC": 2,
"PL": 1,
"PLP": 1
},
"discursos": 0,
"em2026": {
"cargo": "deputada federal",
"uf": "PA",
"partido": "PSB",
"resultado": "eleita"
},
"ficha": "andreia-siqueira-pa"
},
{
"id": 123756,
"nome": "Antônia Lúcia",
"partido": "MDB",
"uf": "AC",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 114,
"proposicoes": 3,
"proposicoesPorTipo": {
"PEC": 2,
"PL": 1
},
"discursos": 1,
"em2026": {
"cargo": "deputada federal",
"uf": "AC",
"partido": "MDB",
"resultado": "não eleita"
},
"ficha": null
},
{
"id": 220549,
"nome": "Any Ortiz",
"partido": "PP",
"uf": "RS",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 112,
"proposicoes": 16,
"proposicoesPorTipo": {
"PDL": 1,
"PEC": 5,
"PL": 9,
"PLP": 1
},
"discursos": 11,
"em2026": {
"cargo": "deputada federal",
"uf": "RS",
"partido": "PP",
"resultado": "eleita"
},
"ficha": "any-ortiz-rs"
},
{
"id": 73701,
"nome": "Benedita da Silva",
"partido": "PT",
"uf": "RJ",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 116,
"proposicoes": 26,
"proposicoesPorTipo": {
"PEC": 1,
"PL": 24,
"PLP": 1
},
"discursos": 77,
"em2026": {
"cargo": "senadora",
"uf": "RJ",
"partido": "PT",
"resultado": "não eleita"
},
"ficha": null
},
{
"id": 204374,
"nome": "Bia Kicis",
"partido": "PL",
"uf": "DF",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 120,
"proposicoes": 20,
"proposicoesPorTipo": {
"PDL": 5,
"PEC": 4,
"PL": 10,
"PLP": 1
},
"discursos": 34,
"em2026": {
"cargo": "senadora",
"uf": "DF",
"partido": "PL",
"resultado": "eleita"
},
"ficha": "bia-kicis-df"
},
{
"id": 220548,
"nome": "Camila Jara",
"partido": "PT",
"uf": "MS",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 120,
"proposicoes": 35,
"proposicoesPorTipo": {
"PEC": 2,
"PL": 32,
"PLP": 1
},
"discursos": 3,
"em2026": {
"cargo": "deputada federal",
"uf": "MS",
"partido": "PT",
"resultado": "eleita"
},
"ficha": "camila-jara-ms"
},
{
"id": 213762,
"nome": "Carla Dickson",
"partido": "PL",
"uf": "RN",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 111,
"proposicoes": 39,
"proposicoesPorTipo": {
"PEC": 3,
"PL": 35,
"PLP": 1
},
"discursos": 16,
"em2026": {
"cargo": "deputada federal",
"uf": "RN",
"partido": "PL",
"resultado": "suplente"
},
"ficha": null
},
{
"id": 220704,
"nome": "Carol Dartora",
"partido": "PT",
"uf": "PR",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 87,
"proposicoes": 26,
"proposicoesPorTipo": {
"PEC": 1,
"PL": 24,
"PLP": 1
},
"discursos": 11,
"em2026": {
"cargo": "deputada federal",
"uf": "PR",
"partido": "PT",
"resultado": "eleita"
},
"ficha": "carol-dartora-pr"
},
{
"id": 204369,
"nome": "Caroline de Toni",
"partido": "PL",
"uf": "SC",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 61,
"proposicoes": 26,
"proposicoesPorTipo": {
"PDL": 8,
"PEC": 4,
"PL": 13,
"PLP": 1
},
"discursos": 0,
"em2026": {
"cargo": "senadora",
"uf": "SC",
"partido": "PL",
"resultado": "eleita"
},
"ficha": "carol-de-toni-sc"
},
{
"id": 204462,
"nome": "Chris Tonietto",
"partido": "PL",
"uf": "RJ",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 117,
"proposicoes": 7,
"proposicoesPorTipo": {
"PDL": 1,
"PEC": 3,
"PL": 2,
"PLP": 1
},
"discursos": 4,
"em2026": {
"cargo": "deputada federal",
"uf": "RJ",
"partido": "PL",
"resultado": "eleita"
},
"ficha": "chris-tonietto-rj"
},
{
"id": 220665,
"nome": "Clarissa Tércio",
"partido": "PP",
"uf": "PE",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 116,
"proposicoes": 10,
"proposicoesPorTipo": {
"PDL": 1,
"PEC": 4,
"PL": 5
},
"discursos": 13,
"em2026": {
"cargo": "deputada federal",
"uf": "PE",
"partido": "PP",
"resultado": "eleita"
},
"ficha": "clarissa-tercio-pe"
},
{
"id": 220595,
"nome": "Coronel Fernanda",
"partido": "PL",
"uf": "MT",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 115,
"proposicoes": 11,
"proposicoesPorTipo": {
"PDL": 3,
"PEC": 4,
"PL": 4
},
"discursos": 10,
"em2026": {
"cargo": "deputada federal",
"uf": "MT",
"partido": "PL",
"resultado": "eleita"
},
"ficha": "coronel-fernanda-mt"
},
{
"id": 220608,
"nome": "Cristiane Lopes",
"partido": "PODE",
"uf": "RO",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 108,
"proposicoes": 4,
"proposicoesPorTipo": {
"PEC": 3,
"PL": 1
},
"discursos": 3,
"em2026": {
"cargo": "deputada federal",
"uf": "RO",
"partido": "PODE",
"resultado": "eleita"
},
"ficha": "cristiane-lopes-ro"
},
{
"id": 206018,
"nome": "Célia Xakriabá",
"partido": "PSOL",
"uf": "MG",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 113,
"proposicoes": 26,
"proposicoesPorTipo": {
"PEC": 1,
"PL": 23,
"PLP": 2
},
"discursos": 28,
"em2026": {
"cargo": "deputada federal",
"uf": "MG",
"partido": "PSOL",
"resultado": "suplente"
},
"ficha": null
},
{
"id": 220555,
"nome": "Daiana Santos",
"partido": "PCdoB",
"uf": "RS",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 118,
"proposicoes": 15,
"proposicoesPorTipo": {
"PEC": 1,
"PL": 13,
"PLP": 1
},
"discursos": 16,
"em2026": {
"cargo": "deputada federal",
"uf": "RS",
"partido": "PCDOB",
"resultado": "eleita"
},
"ficha": "daiana-santos-rs"
},
{
"id": 220629,
"nome": "Dandara",
"partido": "PT",
"uf": "MG",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 69,
"proposicoes": 35,
"proposicoesPorTipo": {
"PEC": 1,
"PL": 33,
"PLP": 1
},
"discursos": 14,
"em2026": {
"cargo": "deputada federal",
"uf": "MG",
"partido": "PT",
"resultado": "eleita"
},
"ficha": "dandara-mg"
},
{
"id": 220603,
"nome": "Dani Cunha",
"partido": "PL",
"uf": "RJ",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 113,
"proposicoes": 12,
"proposicoesPorTipo": {
"PEC": 1,
"PL": 11
},
"discursos": 0,
"em2026": {
"cargo": "deputada federal",
"uf": "RJ",
"partido": "PL",
"resultado": "eleita"
},
"ficha": "dani-cunha-rj"
},
{
"id": 220557,
"nome": "Daniela Reinehr",
"partido": "PL",
"uf": "SC",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 101,
"proposicoes": 14,
"proposicoesPorTipo": {
"PDL": 2,
"PEC": 4,
"PL": 8
},
"discursos": 0,
"em2026": {
"cargo": "deputada federal",
"uf": "SC",
"partido": "PL",
"resultado": "eleita"
},
"ficha": "daniela-reinehr-sc"
},
{
"id": 204459,
"nome": "Daniela do Waguinho",
"partido": "REPUBLICANOS",
"uf": "RJ",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 117,
"proposicoes": 12,
"proposicoesPorTipo": {
"PEC": 2,
"PL": 9,
"PLP": 1
},
"discursos": 5,
"em2026": {
"cargo": "deputada federal",
"uf": "RJ",
"partido": "REPUBLICANOS",
"resultado": "suplente"
},
"ficha": null
},
{
"id": 220659,
"nome": "Dayany Bittencourt",
"partido": "UNIÃO",
"uf": "CE",
"emExercicioHoje": false,
"votacoesEmExercicio": 14,
"votosRegistrados": 11,
"proposicoes": 9,
"proposicoesPorTipo": {
"PL": 9
},
"discursos": 1,
"em2026": {
"cargo": "deputada federal",
"uf": "CE",
"partido": "UNIÃO",
"resultado": "suplente"
},
"ficha": null
},
{
"id": 220565,
"nome": "Delegada Adriana Accorsi",
"partido": "PT",
"uf": "GO",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 80,
"proposicoes": 11,
"proposicoesPorTipo": {
"PEC": 1,
"PL": 10
},
"discursos": 0,
"em2026": {
"cargo": "deputada federal",
"uf": "GO",
"partido": "PT",
"resultado": "eleita"
},
"ficha": "delegada-adriana-accorsi-go"
},
{
"id": 220625,
"nome": "Delegada Ione",
"partido": "PL",
"uf": "MG",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 117,
"proposicoes": 9,
"proposicoesPorTipo": {
"PEC": 3,
"PL": 6
},
"discursos": 4,
"em2026": {
"cargo": "deputada federal",
"uf": "MG",
"partido": "PL",
"resultado": "eleita"
},
"ficha": "delegada-ione-mg"
},
{
"id": 220561,
"nome": "Delegada Katarina",
"partido": "PSD",
"uf": "SE",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 97,
"proposicoes": 9,
"proposicoesPorTipo": {
"PEC": 2,
"PL": 7
},
"discursos": 1,
"em2026": {
"cargo": "deputada federal",
"uf": "SE",
"partido": "PSD",
"resultado": "eleita"
},
"ficha": "delegada-katarina-se"
},
{
"id": 220553,
"nome": "Denise Pessôa",
"partido": "PT",
"uf": "RS",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 113,
"proposicoes": 34,
"proposicoesPorTipo": {
"PEC": 1,
"PL": 31,
"PLP": 2
},
"discursos": 7,
"em2026": {
"cargo": "deputada federal",
"uf": "RS",
"partido": "PT",
"resultado": "eleita"
},
"ficha": "denise-pessoa-rs"
},
{
"id": 220689,
"nome": "Detinha",
"partido": "PL",
"uf": "MA",
"emExercicioHoje": true,
"votacoesEmExercicio": 26,
"votosRegistrados": 22,
"proposicoes": 2,
"proposicoesPorTipo": {
"PEC": 1,
"PL": 1
},
"discursos": 0,
"em2026": {
"cargo": "deputada estadual",
"uf": "MA",
"partido": "PL",
"resultado": "eleita"
},
"ficha": "detinha-ma"
},
{
"id": 220671,
"nome": "Dilvanda Faro",
"partido": "PT",
"uf": "PA",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 110,
"proposicoes": 13,
"proposicoesPorTipo": {
"PEC": 1,
"PL": 11,
"PLP": 1
},
"discursos": 0,
"em2026": {
"cargo": "deputada federal",
"uf": "PA",
"partido": "PT",
"resultado": "eleita"
},
"ficha": "dilvanda-faro-pa"
},
{
"id": 220674,
"nome": "Dra. Alessandra Haber",
"partido": "PODE",
"uf": "PA",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 87,
"proposicoes": 8,
"proposicoesPorTipo": {
"PDL": 1,
"PL": 7
},
"discursos": 0,
"em2026": {
"cargo": "deputada federal",
"uf": "PA",
"partido": "PODE",
"resultado": "eleita"
},
"ficha": "dra-alessandra-haber-pa"
},
{
"id": 220623,
"nome": "Duda Salabert",
"partido": "PSOL",
"uf": "MG",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 116,
"proposicoes": 48,
"proposicoesPorTipo": {
"PEC": 1,
"PL": 46,
"PLP": 1
},
"discursos": 15,
"em2026": {
"cargo": "deputada federal",
"uf": "MG",
"partido": "PSOL",
"resultado": "eleita"
},
"ficha": "duda-salabert-mg"
},
{
"id": 74075,
"nome": "Elcione Barbalho",
"partido": "MDB",
"uf": "PA",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 45,
"proposicoes": 5,
"proposicoesPorTipo": {
"PEC": 2,
"PL": 2,
"PLP": 1
},
"discursos": 0,
"em2026": {
"cargo": "deputada estadual",
"uf": "PA",
"partido": "MDB",
"resultado": "suplente"
},
"ficha": null
},
{
"id": 229585,
"nome": "Elisangela Araujo",
"partido": "PT",
"uf": "BA",
"emExercicioHoje": false,
"votacoesEmExercicio": 59,
"votosRegistrados": 51,
"proposicoes": 11,
"proposicoesPorTipo": {
"PL": 11
},
"discursos": 4,
"em2026": {
"cargo": "deputada federal",
"uf": "BA",
"partido": "PSB",
"resultado": "suplente"
},
"ficha": null
},
{
"id": 218086,
"nome": "Ely Santos",
"partido": "REPUBLICANOS",
"uf": "SP",
"emExercicioHoje": false,
"votacoesEmExercicio": 59,
"votosRegistrados": 56,
"proposicoes": 6,
"proposicoesPorTipo": {
"PEC": 1,
"PL": 4,
"PLP": 1
},
"discursos": 0,
"em2026": {
"cargo": "deputada estadual",
"uf": "SP",
"partido": "REPUBLICANOS",
"resultado": "eleita"
},
"ficha": "ely-santos-sp"
},
{
"id": 225730,
"nome": "Enfermeira Ana Paula",
"partido": "PODE",
"uf": "CE",
"emExercicioHoje": false,
"votacoesEmExercicio": 59,
"votosRegistrados": 28,
"proposicoes": 3,
"proposicoesPorTipo": {
"PL": 3
},
"discursos": 0,
"em2026": {
"cargo": "deputada federal",
"uf": "CE",
"partido": "SOLIDARIEDADE",
"resultado": "suplente"
},
"ficha": null
},
{
"id": 230765,
"nome": "Enfermeira Rejane",
"partido": "PCdoB",
"uf": "RJ",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 110,
"proposicoes": 25,
"proposicoesPorTipo": {
"PEC": 1,
"PL": 23,
"PLP": 1
},
"discursos": 14,
"em2026": {
"cargo": "deputada federal",
"uf": "RJ",
"partido": "PCDOB",
"resultado": "suplente"
},
"ficha": null
},
{
"id": 220645,
"nome": "Erika Hilton",
"partido": "PSOL",
"uf": "SP",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 105,
"proposicoes": 25,
"proposicoesPorTipo": {
"PDL": 1,
"PEC": 1,
"PL": 21,
"PLP": 2
},
"discursos": 5,
"em2026": {
"cargo": "deputada federal",
"uf": "SP",
"partido": "PSOL",
"resultado": "eleita"
},
"ficha": "erika-hilton-sp"
},
{
"id": 160575,
"nome": "Erika Kokay",
"partido": "PT",
"uf": "DF",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 124,
"proposicoes": 24,
"proposicoesPorTipo": {
"PDL": 1,
"PEC": 1,
"PL": 20,
"PLP": 2
},
"discursos": 220,
"em2026": {
"cargo": "senadora",
"uf": "DF",
"partido": "PT",
"resultado": "não eleita"
},
"ficha": null
},
{
"id": 74065,
"nome": "Fatima Pelaes",
"partido": "REPUBLICANOS",
"uf": "AP",
"emExercicioHoje": false,
"votacoesEmExercicio": 59,
"votosRegistrados": 50,
"proposicoes": 0,
"proposicoesPorTipo": {},
"discursos": 0,
"em2026": {
"cargo": "deputada federal",
"uf": "AP",
"partido": "UNIÃO",
"resultado": "suplente"
},
"ficha": null
},
{
"id": 204407,
"nome": "Fernanda Melchionna",
"partido": "PSOL",
"uf": "RS",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 120,
"proposicoes": 47,
"proposicoesPorTipo": {
"PDL": 1,
"PEC": 1,
"PL": 45
},
"discursos": 47,
"em2026": {
"cargo": "deputada federal",
"uf": "RS",
"partido": "PSOL",
"resultado": "eleita"
},
"ficha": "fernanda-melchionna-rs"
},
{
"id": 220656,
"nome": "Fernanda Pessoa",
"partido": "PSD",
"uf": "CE",
"emExercicioHoje": true,
"votacoesEmExercicio": 67,
"votosRegistrados": 60,
"proposicoes": 9,
"proposicoesPorTipo": {
"PL": 9
},
"discursos": 3,
"em2026": {
"cargo": "deputada federal",
"uf": "CE",
"partido": "PSD",
"resultado": "eleita"
},
"ficha": "fernanda-pessoa-ce"
},
{
"id": 160598,
"nome": "Flávia Morais",
"partido": "MDB",
"uf": "GO",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 101,
"proposicoes": 25,
"proposicoesPorTipo": {
"PEC": 3,
"PL": 21,
"PLP": 1
},
"discursos": 4,
"em2026": {
"cargo": "deputada federal",
"uf": "GO",
"partido": "MDB",
"resultado": "eleita"
},
"ficha": "flavia-morais-go"
},
{
"id": 220551,
"nome": "Franciane Bayer",
"partido": "REPUBLICANOS",
"uf": "RS",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 93,
"proposicoes": 5,
"proposicoesPorTipo": {
"PEC": 4,
"PL": 1
},
"discursos": 2,
"em2026": {
"cargo": "deputada federal",
"uf": "RS",
"partido": "REPUBLICANOS",
"resultado": "suplente"
},
"ficha": null
},
{
"id": 178966,
"nome": "Geovania de Sá",
"partido": "REPUBLICANOS",
"uf": "SC",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 105,
"proposicoes": 10,
"proposicoesPorTipo": {
"PEC": 4,
"PL": 6
},
"discursos": 7,
"em2026": {
"cargo": "deputada federal",
"uf": "SC",
"partido": "REPUBLICANOS",
"resultado": "eleita"
},
"ficha": "geovania-de-sa-sc"
},
{
"id": 226179,
"nome": "Gisela Simona",
"partido": "UNIÃO",
"uf": "MT",
"emExercicioHoje": false,
"votacoesEmExercicio": 59,
"votosRegistrados": 59,
"proposicoes": 11,
"proposicoesPorTipo": {
"PEC": 1,
"PL": 10
},
"discursos": 15,
"em2026": {
"cargo": "vice-governadora",
"uf": "MT",
"partido": "UNIÃO",
"resultado": "eleita"
},
"ficha": null
},
{
"id": 107283,
"nome": "Gleisi Hoffmann",
"partido": "PT",
"uf": "PR",
"emExercicioHoje": true,
"votacoesEmExercicio": 67,
"votosRegistrados": 51,
"proposicoes": 14,
"proposicoesPorTipo": {
"PDL": 1,
"PEC": 1,
"PL": 12
},
"discursos": 3,
"em2026": {
"cargo": "senadora",
"uf": "PR",
"partido": "PT",
"resultado": "não eleita"
},
"ficha": null
},
{
"id": 129618,
"nome": "Gorete Pereira",
"partido": "MDB",
"uf": "CE",
"emExercicioHoje": false,
"votacoesEmExercicio": 78,
"votosRegistrados": 29,
"proposicoes": 2,
"proposicoesPorTipo": {
"PL": 2
},
"discursos": 0,
"em2026": {
"cargo": "deputada federal",
"uf": "CE",
"partido": "MDB",
"resultado": "suplente"
},
"ficha": null
},
{
"id": 198197,
"nome": "Greyce Elias",
"partido": "PL",
"uf": "MG",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 86,
"proposicoes": 13,
"proposicoesPorTipo": {
"PDL": 1,
"PEC": 4,
"PL": 7,
"PLP": 1
},
"discursos": 4,
"em2026": {
"cargo": "deputada federal",
"uf": "MG",
"partido": "PL",
"resultado": "eleita"
},
"ficha": "greyce-elias-mg"
},
{
"id": 220537,
"nome": "Helena Lima",
"partido": "PSD",
"uf": "RR",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 95,
"proposicoes": 4,
"proposicoesPorTipo": {
"PEC": 2,
"PL": 2
},
"discursos": 0,
"em2026": {
"cargo": "senadora",
"uf": "RR",
"partido": "PSD",
"resultado": "não eleita"
},
"ficha": null
},
{
"id": 234788,
"nome": "Heloísa Helena",
"partido": "REDE",
"uf": "RJ",
"emExercicioHoje": false,
"votacoesEmExercicio": 103,
"votosRegistrados": 87,
"proposicoes": 78,
"proposicoesPorTipo": {
"PDL": 2,
"PL": 74,
"PLP": 2
},
"discursos": 61,
"em2026": {
"cargo": "deputada federal",
"uf": "RJ",
"partido": "REDE",
"resultado": "suplente"
},
"ficha": null
},
{
"id": 220696,
"nome": "Ivoneide Caetano",
"partido": "PT",
"uf": "BA",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 114,
"proposicoes": 21,
"proposicoesPorTipo": {
"PEC": 1,
"PL": 20
},
"discursos": 5,
"em2026": {
"cargo": "deputada federal",
"uf": "BA",
"partido": "PT",
"resultado": "eleita"
},
"ficha": "ivoneide-caetano-ba"
},
{
"id": 220670,
"nome": "Iza Arruda",
"partido": "MDB",
"uf": "PE",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 117,
"proposicoes": 2,
"proposicoesPorTipo": {
"PL": 1,
"PLP": 1
},
"discursos": 2,
"em2026": {
"cargo": "deputada federal",
"uf": "PE",
"partido": "MDB",
"resultado": "eleita"
},
"ficha": "iza-arruda-pe"
},
{
"id": 220527,
"nome": "Jack Rocha",
"partido": "PT",
"uf": "ES",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 116,
"proposicoes": 17,
"proposicoesPorTipo": {
"PEC": 1,
"PL": 15,
"PLP": 1
},
"discursos": 37,
"em2026": {
"cargo": "deputada federal",
"uf": "ES",
"partido": "PT",
"resultado": "eleita"
},
"ficha": "jack-rocha-es"
},
{
"id": 74848,
"nome": "Jandira Feghali",
"partido": "PCdoB",
"uf": "RJ",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 126,
"proposicoes": 17,
"proposicoesPorTipo": {
"PEC": 1,
"PL": 16
},
"discursos": 89,
"em2026": {
"cargo": "deputada federal",
"uf": "RJ",
"partido": "PCDOB",
"resultado": "eleita"
},
"ficha": "jandira-feghali-rj"
},
{
"id": 220559,
"nome": "Julia Zanatta",
"partido": "PL",
"uf": "SC",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 114,
"proposicoes": 41,
"proposicoesPorTipo": {
"PDL": 14,
"PEC": 3,
"PL": 22,
"PLP": 2
},
"discursos": 57,
"em2026": {
"cargo": "deputada federal",
"uf": "SC",
"partido": "PL",
"resultado": "eleita"
},
"ficha": "julia-zanatta-sc"
},
{
"id": 220640,
"nome": "Juliana Cardoso",
"partido": "PT",
"uf": "SP",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 116,
"proposicoes": 28,
"proposicoesPorTipo": {
"PEC": 1,
"PL": 26,
"PLP": 1
},
"discursos": 15,
"em2026": {
"cargo": "deputada federal",
"uf": "SP",
"partido": "PT",
"resultado": "eleita"
},
"ficha": "juliana-cardoso-sp"
},
{
"id": 74856,
"nome": "Laura Carneiro",
"partido": "PSD",
"uf": "RJ",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 108,
"proposicoes": 130,
"proposicoesPorTipo": {
"PEC": 3,
"PL": 123,
"PLP": 4
},
"discursos": 114,
"em2026": {
"cargo": "deputada federal",
"uf": "RJ",
"partido": "PSD",
"resultado": "suplente"
},
"ficha": null
},
{
"id": 178832,
"nome": "Leandre",
"partido": "PSD",
"uf": "PR",
"emExercicioHoje": true,
"votacoesEmExercicio": 67,
"votosRegistrados": 50,
"proposicoes": 4,
"proposicoesPorTipo": {
"PEC": 2,
"PL": 2
},
"discursos": 1,
"em2026": {
"cargo": "deputada federal",
"uf": "PR",
"partido": "PSD",
"resultado": "eleita"
},
"ficha": "leandre-pr"
},
{
"id": 231911,
"nome": "Lenir de Assis",
"partido": "PT",
"uf": "PR",
"emExercicioHoje": false,
"votacoesEmExercicio": 59,
"votosRegistrados": 47,
"proposicoes": 17,
"proposicoesPorTipo": {
"PL": 17
},
"discursos": 6,
"em2026": {
"cargo": "deputada estadual",
"uf": "PR",
"partido": "PT",
"resultado": "suplente"
},
"ficha": null
},
{
"id": 204410,
"nome": "Luisa Canziani",
"partido": "UNIÃO",
"uf": "PR",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 73,
"proposicoes": 14,
"proposicoesPorTipo": {
"PEC": 6,
"PL": 7,
"PLP": 1
},
"discursos": 9,
"em2026": {
"cargo": "deputada federal",
"uf": "PR",
"partido": "UNIÃO",
"resultado": "suplente"
},
"ficha": null
},
{
"id": 74784,
"nome": "Luiza Erundina",
"partido": "PSOL",
"uf": "SP",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 122,
"proposicoes": 12,
"proposicoesPorTipo": {
"PEC": 1,
"PL": 9,
"PLP": 2
},
"discursos": 0,
"em2026": {
"cargo": "deputada estadual",
"uf": "SP",
"partido": "PSOL",
"resultado": "eleita"
},
"ficha": "luiza-erundina-sp"
},
{
"id": 178866,
"nome": "Luizianne Lins",
"partido": "REDE",
"uf": "CE",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 119,
"proposicoes": 71,
"proposicoesPorTipo": {
"PL": 71
},
"discursos": 0,
"em2026": {
"cargo": "senadora",
"uf": "CE",
"partido": "REDE",
"resultado": "eleita"
},
"ficha": "luizianne-ce"
},
{
"id": 220566,
"nome": "Lêda Borges",
"partido": "REPUBLICANOS",
"uf": "GO",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 85,
"proposicoes": 9,
"proposicoesPorTipo": {
"PL": 8,
"PLP": 1
},
"discursos": 8,
"em2026": {
"cargo": "deputada federal",
"uf": "GO",
"partido": "REPUBLICANOS",
"resultado": "suplente"
},
"ficha": null
},
{
"id": 139285,
"nome": "Lídice da Mata",
"partido": "PSB",
"uf": "BA",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 104,
"proposicoes": 11,
"proposicoesPorTipo": {
"PEC": 1,
"PL": 8,
"PLP": 2
},
"discursos": 30,
"em2026": {
"cargo": "deputada federal",
"uf": "BA",
"partido": "PSB",
"resultado": "suplente"
},
"ficha": null
},
{
"id": 166402,
"nome": "Magda Mofatto",
"partido": "PL",
"uf": "GO",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 100,
"proposicoes": 2,
"proposicoesPorTipo": {
"PEC": 2
},
"discursos": 2,
"em2026": {
"cargo": "deputada federal",
"uf": "GO",
"partido": "PL",
"resultado": "eleita"
},
"ficha": "magda-mofatto-go"
},
{
"id": 220668,
"nome": "Maria Arraes",
"partido": "PSB",
"uf": "PE",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 120,
"proposicoes": 12,
"proposicoesPorTipo": {
"PEC": 1,
"PL": 9,
"PLP": 2
},
"discursos": 5,
"em2026": {
"cargo": "deputada estadual",
"uf": "PE",
"partido": "PSB",
"resultado": "eleita"
},
"ficha": "maria-arraes-pe"
},
{
"id": 204540,
"nome": "Maria Rosas",
"partido": "REPUBLICANOS",
"uf": "SP",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 116,
"proposicoes": 7,
"proposicoesPorTipo": {
"PEC": 1,
"PL": 6
},
"discursos": 11,
"em2026": {
"cargo": "deputada federal",
"uf": "SP",
"partido": "REPUBLICANOS",
"resultado": "eleita"
},
"ficha": "maria-rosas-sp"
},
{
"id": 74398,
"nome": "Maria do Rosário",
"partido": "PT",
"uf": "RS",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 109,
"proposicoes": 30,
"proposicoesPorTipo": {
"PEC": 1,
"PL": 29
},
"discursos": 58,
"em2026": {
"cargo": "deputada federal",
"uf": "RS",
"partido": "PT",
"resultado": "eleita"
},
"ficha": "maria-do-rosario-rs"
},
{
"id": 220637,
"nome": "Marina Silva",
"partido": "REDE",
"uf": "SP",
"emExercicioHoje": true,
"votacoesEmExercicio": 67,
"votosRegistrados": 54,
"proposicoes": 2,
"proposicoesPorTipo": {
"PEC": 1,
"PL": 1
},
"discursos": 17,
"em2026": {
"cargo": "senadora",
"uf": "SP",
"partido": "REDE",
"resultado": "não eleita"
},
"ficha": null
},
{
"id": 220572,
"nome": "Marussa Boldrin",
"partido": "REPUBLICANOS",
"uf": "GO",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 56,
"proposicoes": 7,
"proposicoesPorTipo": {
"PDL": 1,
"PEC": 4,
"PL": 1,
"PLP": 1
},
"discursos": 7,
"em2026": {
"cargo": "deputada federal",
"uf": "GO",
"partido": "REPUBLICANOS",
"resultado": "eleita"
},
"ficha": "marussa-boldrin-go"
},
{
"id": 220591,
"nome": "Meire Serafim",
"partido": "UNIÃO",
"uf": "AC",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 117,
"proposicoes": 2,
"proposicoesPorTipo": {
"PL": 1,
"PLP": 1
},
"discursos": 5,
"em2026": null,
"ficha": null
},
{
"id": 204453,
"nome": "Natália Bonavides",
"partido": "PT",
"uf": "RN",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 102,
"proposicoes": 19,
"proposicoesPorTipo": {
"PEC": 1,
"PL": 18
},
"discursos": 7,
"em2026": {
"cargo": "deputada federal",
"uf": "RN",
"partido": "PT",
"resultado": "eleita"
},
"ficha": "natalia-bonavides-rn"
},
{
"id": 220622,
"nome": "Nely Aquino",
"partido": "PODE",
"uf": "MG",
"emExercicioHoje": true,
"votacoesEmExercicio": 74,
"votosRegistrados": 70,
"proposicoes": 8,
"proposicoesPorTipo": {
"PEC": 2,
"PL": 6
},
"discursos": 0,
"em2026": {
"cargo": "deputada federal",
"uf": "MG",
"partido": "PODE",
"resultado": "eleita"
},
"ficha": "nely-aquino-mg"
},
{
"id": 226075,
"nome": "Priscila Costa",
"partido": "PL",
"uf": "CE",
"emExercicioHoje": true,
"votacoesEmExercicio": 11,
"votosRegistrados": 3,
"proposicoes": 0,
"proposicoesPorTipo": {},
"discursos": 3,
"em2026": {
"cargo": "deputada federal",
"uf": "CE",
"partido": "PL",
"resultado": "suplente"
},
"ficha": null
},
{
"id": 221338,
"nome": "Professora Luciene Cavalcante",
"partido": "PSOL",
"uf": "SP",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 104,
"proposicoes": 11,
"proposicoesPorTipo": {
"PEC": 1,
"PL": 9,
"PLP": 1
},
"discursos": 16,
"em2026": {
"cargo": "deputada federal",
"uf": "SP",
"partido": "PSOL",
"resultado": "eleita"
},
"ficha": "professora-luciene-cavalcante-sp"
},
{
"id": 160641,
"nome": "Professora Marcivania",
"partido": "PCdoB",
"uf": "AP",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 120,
"proposicoes": 13,
"proposicoesPorTipo": {
"PEC": 1,
"PL": 10,
"PLP": 2
},
"discursos": 2,
"em2026": {
"cargo": "deputada federal",
"uf": "AP",
"partido": "PCDOB",
"resultado": "eleita"
},
"ficha": "professora-marcivania-ap"
},
{
"id": 178989,
"nome": "Renata Abreu",
"partido": "PODE",
"uf": "SP",
"emExercicioHoje": true,
"votacoesEmExercicio": 104,
"votosRegistrados": 82,
"proposicoes": 65,
"proposicoesPorTipo": {
"PL": 60,
"PLP": 5
},
"discursos": 0,
"em2026": {
"cargo": "deputada federal",
"uf": "SP",
"partido": "PODE",
"resultado": "eleita"
},
"ficha": "renata-abreu-sp"
},
{
"id": 153423,
"nome": "Renilce Nicodemos",
"partido": "MDB",
"uf": "PA",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 76,
"proposicoes": 9,
"proposicoesPorTipo": {
"PEC": 1,
"PL": 7,
"PLP": 1
},
"discursos": 1,
"em2026": {
"cargo": "deputada federal",
"uf": "PA",
"partido": "MDB",
"resultado": "eleita"
},
"ficha": "renilce-nicodemos-pa"
},
{
"id": 220693,
"nome": "Roberta Roma",
"partido": "PL",
"uf": "BA",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 73,
"proposicoes": 6,
"proposicoesPorTipo": {
"PEC": 4,
"PL": 2
},
"discursos": 2,
"em2026": {
"cargo": "deputada federal",
"uf": "BA",
"partido": "PL",
"resultado": "eleita"
},
"ficha": "roberta-roma-ba"
},
{
"id": 220695,
"nome": "Rogéria Santos",
"partido": "REPUBLICANOS",
"uf": "BA",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 111,
"proposicoes": 18,
"proposicoesPorTipo": {
"PDL": 1,
"PEC": 2,
"PL": 14,
"PLP": 1
},
"discursos": 5,
"em2026": {
"cargo": "deputada federal",
"uf": "BA",
"partido": "REPUBLICANOS",
"resultado": "suplente"
},
"ficha": null
},
{
"id": 204525,
"nome": "Rosana Valle",
"partido": "PL",
"uf": "SP",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 123,
"proposicoes": 8,
"proposicoesPorTipo": {
"PEC": 4,
"PL": 4
},
"discursos": 3,
"em2026": {
"cargo": "deputada federal",
"uf": "SP",
"partido": "PL",
"resultado": "eleita"
},
"ficha": "rosana-valle-sp"
},
{
"id": 178945,
"nome": "Rosangela Gomes",
"partido": "REPUBLICANOS",
"uf": "RJ",
"emExercicioHoje": true,
"votacoesEmExercicio": 67,
"votosRegistrados": 54,
"proposicoes": 5,
"proposicoesPorTipo": {
"PEC": 1,
"PL": 4
},
"discursos": 8,
"em2026": {
"cargo": "deputada federal",
"uf": "RJ",
"partido": "REPUBLICANOS",
"resultado": "suplente"
},
"ficha": null
},
{
"id": 220644,
"nome": "Rosangela Moro",
"partido": "PL",
"uf": "SP",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 107,
"proposicoes": 25,
"proposicoesPorTipo": {
"PDL": 3,
"PEC": 3,
"PL": 18,
"PLP": 1
},
"discursos": 10,
"em2026": {
"cargo": "deputada federal",
"uf": "PR",
"partido": "PL",
"resultado": "eleita"
},
"ficha": "rosangela-moro-pr"
},
{
"id": 73806,
"nome": "Roseana Sarney",
"partido": "MDB",
"uf": "MA",
"emExercicioHoje": false,
"votacoesEmExercicio": 5,
"votosRegistrados": 3,
"proposicoes": 2,
"proposicoesPorTipo": {
"PEC": 1,
"PL": 1
},
"discursos": 1,
"em2026": {
"cargo": "senadora",
"uf": "MA",
"partido": "MDB",
"resultado": "não eleita"
},
"ficha": null
},
{
"id": 220620,
"nome": "Rosângela Reis",
"partido": "PL",
"uf": "MG",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 107,
"proposicoes": 10,
"proposicoesPorTipo": {
"PEC": 3,
"PL": 7
},
"discursos": 2,
"em2026": {
"cargo": "deputada federal",
"uf": "MG",
"partido": "PL",
"resultado": "eleita"
},
"ficha": "rosangela-reis-mg"
},
{
"id": 204360,
"nome": "Silvia Cristina",
"partido": "PP",
"uf": "RO",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 104,
"proposicoes": 12,
"proposicoesPorTipo": {
"PDL": 1,
"PEC": 3,
"PL": 8
},
"discursos": 8,
"em2026": {
"cargo": "senadora",
"uf": "RO",
"partido": "PP",
"resultado": "não eleita"
},
"ficha": null
},
{
"id": 220569,
"nome": "Silvye Alves",
"partido": "UNIÃO",
"uf": "GO",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 89,
"proposicoes": 21,
"proposicoesPorTipo": {
"PEC": 3,
"PL": 18
},
"discursos": 4,
"em2026": {
"cargo": "deputada federal",
"uf": "GO",
"partido": "UNIÃO",
"resultado": "eleita"
},
"ficha": "silvye-alves-go"
},
{
"id": 220651,
"nome": "Simone Marquetto",
"partido": "PP",
"uf": "SP",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 78,
"proposicoes": 7,
"proposicoesPorTipo": {
"PEC": 5,
"PL": 2
},
"discursos": 1,
"em2026": null,
"ficha": null
},
{
"id": 104552,
"nome": "Socorro Neri",
"partido": "PP",
"uf": "AC",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 100,
"proposicoes": 24,
"proposicoesPorTipo": {
"PEC": 2,
"PL": 22
},
"discursos": 7,
"em2026": {
"cargo": "deputada federal",
"uf": "AC",
"partido": "PP",
"resultado": "eleita"
},
"ficha": "socorro-neri-ac"
},
{
"id": 178946,
"nome": "Soraya Santos",
"partido": "PL",
"uf": "RJ",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 75,
"proposicoes": 11,
"proposicoesPorTipo": {
"PEC": 4,
"PL": 7
},
"discursos": 75,
"em2026": {
"cargo": "deputada federal",
"uf": "RJ",
"partido": "PL",
"resultado": "eleita"
},
"ficha": "soraya-santos-rj"
},
{
"id": 204535,
"nome": "Sâmia Bomfim",
"partido": "PSOL",
"uf": "SP",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 95,
"proposicoes": 27,
"proposicoesPorTipo": {
"PDL": 1,
"PEC": 1,
"PL": 22,
"PLP": 3
},
"discursos": 17,
"em2026": {
"cargo": "deputada federal",
"uf": "SP",
"partido": "PSOL",
"resultado": "eleita"
},
"ficha": "samia-bomfim-sp"
},
{
"id": 220643,
"nome": "Sônia Guajajara",
"partido": "PSOL",
"uf": "SP",
"emExercicioHoje": true,
"votacoesEmExercicio": 67,
"votosRegistrados": 62,
"proposicoes": 4,
"proposicoesPorTipo": {
"PEC": 1,
"PL": 3
},
"discursos": 5,
"em2026": {
"cargo": "deputada federal",
"uf": "SP",
"partido": "PSOL",
"resultado": "eleita"
},
"ficha": "sonia-guajajara-sp"
},
{
"id": 204534,
"nome": "Tabata Amaral",
"partido": "PSB",
"uf": "SP",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 118,
"proposicoes": 21,
"proposicoesPorTipo": {
"PEC": 1,
"PL": 18,
"PLP": 2
},
"discursos": 7,
"em2026": {
"cargo": "deputada federal",
"uf": "SP",
"partido": "PSB",
"resultado": "eleita"
},
"ficha": "tabata-amaral-sp"
},
{
"id": 204464,
"nome": "Talíria Petrone",
"partido": "PSOL",
"uf": "RJ",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 89,
"proposicoes": 17,
"proposicoesPorTipo": {
"PDL": 1,
"PEC": 1,
"PL": 14,
"PLP": 1
},
"discursos": 20,
"em2026": {
"cargo": "deputada federal",
"uf": "RJ",
"partido": "PSOL",
"resultado": "eleita"
},
"ficha": "taliria-petrone-rj"
},
{
"id": 220564,
"nome": "Yandra Moura",
"partido": "UNIÃO",
"uf": "SE",
"emExercicioHoje": true,
"votacoesEmExercicio": 126,
"votosRegistrados": 25,
"proposicoes": 25,
"proposicoesPorTipo": {
"PEC": 2,
"PL": 23
},
"discursos": 0,
"em2026": {
"cargo": "deputada federal",
"uf": "SE",
"partido": "UNIÃO",
"resultado": "eleita"
},
"ficha": "yandra-moura-se"
}
];
