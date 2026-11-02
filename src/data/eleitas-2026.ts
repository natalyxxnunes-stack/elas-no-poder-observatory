/**
 * eleitas-2026 — as mulheres eleitas em 2026, uma por linha. GERADO por
 * scripts/recontagem/eleitas_2026.py; não editar à mão.
 * Fonte: TSE, consulta_cand_2026_BRASIL.csv gerado em 02/11/2026 08:30:34,
 * SHA-256 0e44c739c75fe3c6e5fa306de797a8fdba81342ae464abc0e4ac79d07570a83f.
 * Só dado público de registro. Sem CPF, e-mail, data de nascimento ou foto.
 */
export type CargoEleita = "deputada-federal" | "deputada-estadual" | "deputada-distrital" | "senadora" | "governadora";
export type Eleita = { slug: string; nome: string; cargo: CargoEleita; uf: string; partido: string; corRaca: string; situacao: string; turno: number };
export const ELEITAS_META = { baseGeneratedAt: "02/11/2026 08:30:34", csvSha256: "0e44c739c75fe3c6e5fa306de797a8fdba81342ae464abc0e4ac79d07570a83f", porCargo: {"deputada-federal": 109, "deputada-estadual": 213, "deputada-distrital": 5, "senadora": 12, "governadora": 3} } as const;
export const ELEITAS_2026: readonly Eleita[] = [
{
"slug": "perpetua-almeida-ac",
"nome": "Perpétua Almeida",
"cargo": "deputada-federal",
"uf": "AC",
"partido": "PCDOB",
"corRaca": "PARDA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "socorro-neri-ac",
"nome": "Socorro Neri",
"cargo": "deputada-federal",
"uf": "AC",
"partido": "PP",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "julia-nunes-al",
"nome": "Julia Nunes",
"cargo": "deputada-federal",
"uf": "AL",
"partido": "PSD",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "joana-darc-am",
"nome": "Joana Darc",
"cargo": "deputada-federal",
"uf": "AM",
"partido": "UNIÃO",
"corRaca": "PARDA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "aline-gurgel-ap",
"nome": "Aline Gurgel",
"cargo": "deputada-federal",
"uf": "AP",
"partido": "UNIÃO",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "dra-erica-ap",
"nome": "Dra. Erica",
"cargo": "deputada-federal",
"uf": "AP",
"partido": "PODE",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "professora-marcivania-ap",
"nome": "Professora Marcivânia",
"cargo": "deputada-federal",
"uf": "AP",
"partido": "PCDOB",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "alice-portugal-ba",
"nome": "Alice Portugal",
"cargo": "deputada-federal",
"uf": "BA",
"partido": "PCDOB",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "doutora-raissa-soares-ba",
"nome": "Doutora Raissa Soares",
"cargo": "deputada-federal",
"uf": "BA",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "ivoneide-caetano-ba",
"nome": "Ivoneide Caetano",
"cargo": "deputada-federal",
"uf": "BA",
"partido": "PT",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "maria-marighella-ba",
"nome": "Maria Marighella",
"cargo": "deputada-federal",
"uf": "BA",
"partido": "PT",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "olivia-ba",
"nome": "Olivia",
"cargo": "deputada-federal",
"uf": "BA",
"partido": "PCDOB",
"corRaca": "PRETA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "roberta-roma-ba",
"nome": "Roberta Roma",
"cargo": "deputada-federal",
"uf": "BA",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "erika-amorim-ce",
"nome": "Erika Amorim",
"cargo": "deputada-federal",
"uf": "CE",
"partido": "REPUBLICANOS",
"corRaca": "BRANCA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "fernanda-pessoa-ce",
"nome": "Fernanda Pessoa",
"cargo": "deputada-federal",
"uf": "CE",
"partido": "PSD",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "giordanna-mano-ce",
"nome": "Giordanna Mano",
"cargo": "deputada-federal",
"uf": "CE",
"partido": "PRD",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "luisa-cela-ce",
"nome": "Luisa Cela",
"cargo": "deputada-federal",
"uf": "CE",
"partido": "PT",
"corRaca": "PARDA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "tainah-marinho-ce",
"nome": "Tainah Marinho",
"cargo": "deputada-federal",
"uf": "CE",
"partido": "PSB",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "jack-rocha-es",
"nome": "Jack Rocha",
"cargo": "deputada-federal",
"uf": "ES",
"partido": "PT",
"corRaca": "PRETA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "manu-es",
"nome": "Manu",
"cargo": "deputada-federal",
"uf": "ES",
"partido": "PSB",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "delegada-adriana-accorsi-go",
"nome": "Delegada Adriana Accorsi",
"cargo": "deputada-federal",
"uf": "GO",
"partido": "PT",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "flavia-morais-go",
"nome": "Flávia Morais",
"cargo": "deputada-federal",
"uf": "GO",
"partido": "MDB",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "magda-mofatto-go",
"nome": "Magda Mofatto",
"cargo": "deputada-federal",
"uf": "GO",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "marussa-boldrin-go",
"nome": "Marussa Boldrin",
"cargo": "deputada-federal",
"uf": "GO",
"partido": "REPUBLICANOS",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "silvye-alves-go",
"nome": "Silvye Alves",
"cargo": "deputada-federal",
"uf": "GO",
"partido": "UNIÃO",
"corRaca": "PARDA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "amanda-gentil-ma",
"nome": "Amanda Gentil",
"cargo": "deputada-federal",
"uf": "MA",
"partido": "PP",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "fabiana-vilar-ma",
"nome": "Fabiana Vilar",
"cargo": "deputada-federal",
"uf": "MA",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "iracema-vale-ma",
"nome": "Iracema Vale",
"cargo": "deputada-federal",
"uf": "MA",
"partido": "MDB",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "larissa-dp-ma",
"nome": "Larissa Dp",
"cargo": "deputada-federal",
"uf": "MA",
"partido": "MDB",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "mariana-carvalho-ma",
"nome": "Mariana Carvalho",
"cargo": "deputada-federal",
"uf": "MA",
"partido": "PL",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "ana-elisa-mg",
"nome": "Ana Elisa",
"cargo": "deputada-federal",
"uf": "MG",
"partido": "PT",
"corRaca": "PRETA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "ana-pimentel-mg",
"nome": "Ana Pimentel",
"cargo": "deputada-federal",
"uf": "MG",
"partido": "PT",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "bella-goncalves-mg",
"nome": "Bella Gonçalves",
"cargo": "deputada-federal",
"uf": "MG",
"partido": "PT",
"corRaca": "BRANCA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "dandara-mg",
"nome": "Dandara",
"cargo": "deputada-federal",
"uf": "MG",
"partido": "PT",
"corRaca": "PRETA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "delegada-ione-mg",
"nome": "Delegada Ione",
"cargo": "deputada-federal",
"uf": "MG",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "duda-salabert-mg",
"nome": "Duda Salabert",
"cargo": "deputada-federal",
"uf": "MG",
"partido": "PSOL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "gleide-andrade-mg",
"nome": "Gleide Andrade",
"cargo": "deputada-federal",
"uf": "MG",
"partido": "PT",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "greyce-elias-mg",
"nome": "Greyce Elias",
"cargo": "deputada-federal",
"uf": "MG",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "lohanna-mg",
"nome": "Lohanna",
"cargo": "deputada-federal",
"uf": "MG",
"partido": "PV",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "nely-aquino-mg",
"nome": "Nely Aquino",
"cargo": "deputada-federal",
"uf": "MG",
"partido": "PODE",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "rosangela-reis-mg",
"nome": "Rosangela Reis",
"cargo": "deputada-federal",
"uf": "MG",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "camila-jara-ms",
"nome": "Camila Jara",
"cargo": "deputada-federal",
"uf": "MS",
"partido": "PT",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "isa-marcondes-ms",
"nome": "Isa Marcondes",
"cargo": "deputada-federal",
"uf": "MS",
"partido": "REPUBLICANOS",
"corRaca": "BRANCA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "mara-caseiro-ms",
"nome": "Mara Caseiro",
"cargo": "deputada-federal",
"uf": "MS",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "rose-modesto-ms",
"nome": "Rose Modesto",
"cargo": "deputada-federal",
"uf": "MS",
"partido": "UNIÃO",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "coronel-fernanda-mt",
"nome": "Coronel Fernanda",
"cargo": "deputada-federal",
"uf": "MT",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "professora-rosa-neide-mt",
"nome": "Professora Rosa Neide",
"cargo": "deputada-federal",
"uf": "MT",
"partido": "PT",
"corRaca": "BRANCA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "virginia-mendes-mt",
"nome": "Virginia Mendes",
"cargo": "deputada-federal",
"uf": "MT",
"partido": "UNIÃO",
"corRaca": "PARDA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "andreia-siqueira-pa",
"nome": "Andréia Siqueira",
"cargo": "deputada-federal",
"uf": "PA",
"partido": "PSB",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "dilvanda-faro-pa",
"nome": "Dilvanda Faro",
"cargo": "deputada-federal",
"uf": "PA",
"partido": "PT",
"corRaca": "PRETA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "dra-alessandra-haber-pa",
"nome": "Dra. Alessandra Haber",
"cargo": "deputada-federal",
"uf": "PA",
"partido": "PODE",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "renilce-nicodemos-pa",
"nome": "Renilce Nicodemos",
"cargo": "deputada-federal",
"uf": "PA",
"partido": "MDB",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "pollyanna-pb",
"nome": "Pollyanna",
"cargo": "deputada-federal",
"uf": "PB",
"partido": "PP",
"corRaca": "BRANCA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "clarissa-tercio-pe",
"nome": "Clarissa Tércio",
"cargo": "deputada-federal",
"uf": "PE",
"partido": "PP",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "eliane-soares-pe",
"nome": "Eliane Soares",
"cargo": "deputada-federal",
"uf": "PE",
"partido": "PSB",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "iza-arruda-pe",
"nome": "Iza Arruda",
"cargo": "deputada-federal",
"uf": "PE",
"partido": "MDB",
"corRaca": "BRANCA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "juliana-de-chaparral-pe",
"nome": "Juliana de Chaparral",
"cargo": "deputada-federal",
"uf": "PE",
"partido": "UNIÃO",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "liana-cirne-pe",
"nome": "Liana Cirne",
"cargo": "deputada-federal",
"uf": "PE",
"partido": "PT",
"corRaca": "BRANCA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "rosa-amorim-pe",
"nome": "Rosa Amorim",
"cargo": "deputada-federal",
"uf": "PE",
"partido": "PT",
"corRaca": "PRETA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "ana-julia-pr",
"nome": "Ana Júlia",
"cargo": "deputada-federal",
"uf": "PR",
"partido": "PT",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "carol-dartora-pr",
"nome": "Carol Dartora",
"cargo": "deputada-federal",
"uf": "PR",
"partido": "PT",
"corRaca": "PRETA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "leandre-pr",
"nome": "Leandre",
"cargo": "deputada-federal",
"uf": "PR",
"partido": "PSD",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "rosangela-moro-pr",
"nome": "Rosangela Moro",
"cargo": "deputada-federal",
"uf": "PR",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "anielle-franco-rj",
"nome": "Anielle Franco",
"cargo": "deputada-federal",
"uf": "RJ",
"partido": "PT",
"corRaca": "PRETA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "chris-tonietto-rj",
"nome": "Chris Tonietto",
"cargo": "deputada-federal",
"uf": "RJ",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "dani-cunha-rj",
"nome": "Dani Cunha",
"cargo": "deputada-federal",
"uf": "RJ",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "jandira-feghali-rj",
"nome": "Jandira Feghali",
"cargo": "deputada-federal",
"uf": "RJ",
"partido": "PCDOB",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "julia-de-castro-rj",
"nome": "Julia de Castro",
"cargo": "deputada-federal",
"uf": "RJ",
"partido": "PL",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "manoela-peres-rj",
"nome": "Manoela Peres",
"cargo": "deputada-federal",
"uf": "RJ",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "nisia-trindade-rj",
"nome": "Nísia Trindade",
"cargo": "deputada-federal",
"uf": "RJ",
"partido": "PT",
"corRaca": "BRANCA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "soraya-santos-rj",
"nome": "Soraya Santos",
"cargo": "deputada-federal",
"uf": "RJ",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "talita-galhardo-rj",
"nome": "Talita Galhardo",
"cargo": "deputada-federal",
"uf": "RJ",
"partido": "PSDB",
"corRaca": "BRANCA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "taliria-petrone-rj",
"nome": "Talíria Petrone",
"cargo": "deputada-federal",
"uf": "RJ",
"partido": "PSOL",
"corRaca": "PRETA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "natalia-bonavides-rn",
"nome": "Natália Bonavides",
"cargo": "deputada-federal",
"uf": "RN",
"partido": "PT",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "nina-rn",
"nome": "Nina",
"cargo": "deputada-federal",
"uf": "RN",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "thabatta-pimenta-rn",
"nome": "Thabatta Pimenta",
"cargo": "deputada-federal",
"uf": "RN",
"partido": "PV",
"corRaca": "PARDA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "cristiane-lopes-ro",
"nome": "Cristiane Lopes",
"cargo": "deputada-federal",
"uf": "RO",
"partido": "PODE",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "joliane-furia-ro",
"nome": "Joliane Furia",
"cargo": "deputada-federal",
"uf": "RO",
"partido": "PSD",
"corRaca": "BRANCA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "sofia-andrade-ro",
"nome": "Sofia Andrade",
"cargo": "deputada-federal",
"uf": "RO",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "any-ortiz-rs",
"nome": "Any Ortiz",
"cargo": "deputada-federal",
"uf": "RS",
"partido": "PP",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "daiana-santos-rs",
"nome": "Daiana Santos",
"cargo": "deputada-federal",
"uf": "RS",
"partido": "PCDOB",
"corRaca": "PRETA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "denise-pessoa-rs",
"nome": "Denise Pessôa",
"cargo": "deputada-federal",
"uf": "RS",
"partido": "PT",
"corRaca": "PRETA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "fernanda-melchionna-rs",
"nome": "Fernanda Melchionna",
"cargo": "deputada-federal",
"uf": "RS",
"partido": "PSOL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "maria-do-rosario-rs",
"nome": "Maria do Rosario",
"cargo": "deputada-federal",
"uf": "RS",
"partido": "PT",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "ana-paula-lima-sc",
"nome": "Ana Paula Lima",
"cargo": "deputada-federal",
"uf": "SC",
"partido": "PT",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "daniela-reinehr-sc",
"nome": "Daniela Reinehr",
"cargo": "deputada-federal",
"uf": "SC",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "geovania-de-sa-sc",
"nome": "Geovania de Sá",
"cargo": "deputada-federal",
"uf": "SC",
"partido": "REPUBLICANOS",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "giovana-mondardo-sc",
"nome": "Giovana Mondardo",
"cargo": "deputada-federal",
"uf": "SC",
"partido": "PCDOB",
"corRaca": "BRANCA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "julia-zanatta-sc",
"nome": "Julia Zanatta",
"cargo": "deputada-federal",
"uf": "SC",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "paulinha-sc",
"nome": "Paulinha",
"cargo": "deputada-federal",
"uf": "SC",
"partido": "PODE",
"corRaca": "BRANCA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "delegada-katarina-se",
"nome": "Delegada Katarina",
"cargo": "deputada-federal",
"uf": "SE",
"partido": "PSD",
"corRaca": "BRANCA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "yandra-moura-se",
"nome": "Yandra Moura",
"cargo": "deputada-federal",
"uf": "SE",
"partido": "UNIÃO",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "adriana-ventura-sp",
"nome": "Adriana Ventura",
"cargo": "deputada-federal",
"uf": "SP",
"partido": "NOVO",
"corRaca": "BRANCA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "ana-carolina-oliveira-sp",
"nome": "Ana Carolina Oliveira",
"cargo": "deputada-federal",
"uf": "SP",
"partido": "PODE",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "dra-sandra-tadeu-sp",
"nome": "Dra. Sandra Tadeu",
"cargo": "deputada-federal",
"uf": "SP",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "erika-hilton-sp",
"nome": "Erika Hilton",
"cargo": "deputada-federal",
"uf": "SP",
"partido": "PSOL",
"corRaca": "PRETA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "juliana-cardoso-sp",
"nome": "Juliana Cardoso",
"cargo": "deputada-federal",
"uf": "SP",
"partido": "PT",
"corRaca": "INDÍGENA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "luna-zarattini-sp",
"nome": "Luna Zarattini",
"cargo": "deputada-federal",
"uf": "SP",
"partido": "PT",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "maria-rosas-sp",
"nome": "Maria Rosas",
"cargo": "deputada-federal",
"uf": "SP",
"partido": "REPUBLICANOS",
"corRaca": "PARDA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "marina-helena-sp",
"nome": "Marina Helena",
"cargo": "deputada-federal",
"uf": "SP",
"partido": "NOVO",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "natalia-boulos-sp",
"nome": "Natália Boulos",
"cargo": "deputada-federal",
"uf": "SP",
"partido": "PSOL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "professora-luciene-cavalcante-sp",
"nome": "Professora Luciene Cavalcante",
"cargo": "deputada-federal",
"uf": "SP",
"partido": "PSOL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "renata-abreu-sp",
"nome": "Renata Abreu",
"cargo": "deputada-federal",
"uf": "SP",
"partido": "PODE",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "rosana-valle-sp",
"nome": "Rosana Valle",
"cargo": "deputada-federal",
"uf": "SP",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "sirlange-manga-sp",
"nome": "Sirlange Manga",
"cargo": "deputada-federal",
"uf": "SP",
"partido": "UNIÃO",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "samia-bomfim-sp",
"nome": "Sâmia Bomfim",
"cargo": "deputada-federal",
"uf": "SP",
"partido": "PSOL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "sonia-guajajara-sp",
"nome": "Sônia Guajajara",
"cargo": "deputada-federal",
"uf": "SP",
"partido": "PSOL",
"corRaca": "INDÍGENA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "tabata-amaral-sp",
"nome": "Tabata Amaral",
"cargo": "deputada-federal",
"uf": "SP",
"partido": "PSB",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "professora-janad-valcari-to",
"nome": "Professora Janad Valcari",
"cargo": "deputada-federal",
"uf": "TO",
"partido": "PP",
"corRaca": "PRETA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "cibele-moura-al",
"nome": "Cibele Moura",
"cargo": "deputada-estadual",
"uf": "AL",
"partido": "MDB",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "fatima-canuto-al",
"nome": "Fátima Canuto",
"cargo": "deputada-estadual",
"uf": "AL",
"partido": "MDB",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "gabi-goncalves-al",
"nome": "Gabi Gonçalves",
"cargo": "deputada-estadual",
"uf": "AL",
"partido": "MDB",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "rose-davino-al",
"nome": "Rose Davino",
"cargo": "deputada-estadual",
"uf": "AL",
"partido": "PP",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "teca-nelma-al",
"nome": "Teca Nelma",
"cargo": "deputada-estadual",
"uf": "AL",
"partido": "PT",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "debora-menezes-am",
"nome": "Débora Menezes",
"cargo": "deputada-estadual",
"uf": "AM",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "mayra-dias-am",
"nome": "Mayra Dias",
"cargo": "deputada-estadual",
"uf": "AM",
"partido": "PSD",
"corRaca": "PARDA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "aldilene-souza-ap",
"nome": "Aldilene Souza",
"cargo": "deputada-estadual",
"uf": "AP",
"partido": "PDT",
"corRaca": "BRANCA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "aparecida-salomao-ap",
"nome": "Aparecida Salomão",
"cargo": "deputada-estadual",
"uf": "AP",
"partido": "UNIÃO",
"corRaca": "PARDA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "bia-pombo-ap",
"nome": "Bia Pombo",
"cargo": "deputada-estadual",
"uf": "AP",
"partido": "UNIÃO",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "kinovak-ap",
"nome": "Kinovak",
"cargo": "deputada-estadual",
"uf": "AP",
"partido": "REPUBLICANOS",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "socorro-nogueira-ap",
"nome": "Socorro Nogueira",
"cargo": "deputada-estadual",
"uf": "AP",
"partido": "PT",
"corRaca": "PRETA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "telma-nery-ap",
"nome": "Telma Nery",
"cargo": "deputada-estadual",
"uf": "AP",
"partido": "REPUBLICANOS",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "andrea-castro-ba",
"nome": "Andrea Castro",
"cargo": "deputada-estadual",
"uf": "BA",
"partido": "PSD",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "cinthya-maraba-ba",
"nome": "Cinthya Marabá",
"cargo": "deputada-estadual",
"uf": "BA",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "claudia-oliveira-ba",
"nome": "Cláudia Oliveira",
"cargo": "deputada-estadual",
"uf": "BA",
"partido": "PSD",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "denise-menezes-ba",
"nome": "Denise Menezes",
"cargo": "deputada-estadual",
"uf": "BA",
"partido": "PSD",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "fatima-nunes-ba",
"nome": "Fátima Nunes",
"cargo": "deputada-estadual",
"uf": "BA",
"partido": "PT",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "ivana-bastos-ba",
"nome": "Ivana Bastos",
"cargo": "deputada-estadual",
"uf": "BA",
"partido": "PSD",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "ludmilla-fiscina-ba",
"nome": "Ludmilla Fiscina",
"cargo": "deputada-estadual",
"uf": "BA",
"partido": "PSD",
"corRaca": "BRANCA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "neusa-cadore-ba",
"nome": "Neusa Cadore",
"cargo": "deputada-estadual",
"uf": "BA",
"partido": "PT",
"corRaca": "BRANCA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "rowenna-ba",
"nome": "Rowenna",
"cargo": "deputada-estadual",
"uf": "BA",
"partido": "PT",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "vilma-reis-ba",
"nome": "Vilma Reis",
"cargo": "deputada-estadual",
"uf": "BA",
"partido": "PT",
"corRaca": "PRETA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "bella-carmelo-ce",
"nome": "Bella Carmelo",
"cargo": "deputada-estadual",
"uf": "CE",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "dra-mayra-pinheiro-ce",
"nome": "Dra Mayra Pinheiro",
"cargo": "deputada-estadual",
"uf": "CE",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "dra-silvana-ce",
"nome": "Dra Silvana",
"cargo": "deputada-estadual",
"uf": "CE",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "emilia-pessoa-ce",
"nome": "Emilia Pessoa",
"cargo": "deputada-estadual",
"uf": "CE",
"partido": "PSDB",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "fabiola-carneiro-ce",
"nome": "Fabiola Carneiro",
"cargo": "deputada-estadual",
"uf": "CE",
"partido": "PSB",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "georgia-do-marcelao-ce",
"nome": "Georgia do Marcelão",
"cargo": "deputada-estadual",
"uf": "CE",
"partido": "SOLIDARIEDADE",
"corRaca": "BRANCA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "jade-romero-ce",
"nome": "Jade Romero",
"cargo": "deputada-estadual",
"uf": "CE",
"partido": "PT",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "jo-farias-ce",
"nome": "Jô Farias",
"cargo": "deputada-estadual",
"uf": "CE",
"partido": "PT",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "lais-nunes-ce",
"nome": "Lais Nunes",
"cargo": "deputada-estadual",
"uf": "CE",
"partido": "PT",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "lia-gomes-ce",
"nome": "Lia Gomes",
"cargo": "deputada-estadual",
"uf": "CE",
"partido": "PSB",
"corRaca": "BRANCA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "liziany-medeiros-ce",
"nome": "Liziany Medeiros",
"cargo": "deputada-estadual",
"uf": "CE",
"partido": "PT",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "manu-pimenta-ce",
"nome": "Manu Pimenta",
"cargo": "deputada-estadual",
"uf": "CE",
"partido": "PSB",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "marta-goncalves-ce",
"nome": "Marta Gonçalves",
"cargo": "deputada-estadual",
"uf": "CE",
"partido": "PSB",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "paloma-nunes-ce",
"nome": "Paloma Nunes",
"cargo": "deputada-estadual",
"uf": "CE",
"partido": "PSB",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "acucena-es",
"nome": "Açucena",
"cargo": "deputada-estadual",
"uf": "ES",
"partido": "PT",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "camila-valadao-es",
"nome": "Camila Valadão",
"cargo": "deputada-estadual",
"uf": "ES",
"partido": "PSOL",
"corRaca": "PRETA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "janete-de-sa-es",
"nome": "Janete de Sá",
"cargo": "deputada-estadual",
"uf": "ES",
"partido": "PSB",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "jeesala-coutinho-es",
"nome": "Jeesala Coutinho",
"cargo": "deputada-estadual",
"uf": "ES",
"partido": "MDB",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "karla-coser-es",
"nome": "Karla Coser",
"cargo": "deputada-estadual",
"uf": "ES",
"partido": "PT",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "raquel-lessa-es",
"nome": "Raquel Lessa",
"cargo": "deputada-estadual",
"uf": "ES",
"partido": "PP",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "bia-de-lima-go",
"nome": "Bia de Lima",
"cargo": "deputada-estadual",
"uf": "GO",
"partido": "PT",
"corRaca": "BRANCA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "carol-do-amiltinho-go",
"nome": "Carol do Amiltinho",
"cargo": "deputada-estadual",
"uf": "GO",
"partido": "MDB",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "graciele-da-arte-trigo-go",
"nome": "Graciele da Arte Trigo",
"cargo": "deputada-estadual",
"uf": "GO",
"partido": "AGIR",
"corRaca": "BRANCA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "joscilene-do-mangao-go",
"nome": "Joscilene do Mangão",
"cargo": "deputada-estadual",
"uf": "GO",
"partido": "AGIR",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "katia-go",
"nome": "Kátia",
"cargo": "deputada-estadual",
"uf": "GO",
"partido": "PT",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "abigail-cunha-ma",
"nome": "Abigail Cunha",
"cargo": "deputada-estadual",
"uf": "MA",
"partido": "MDB",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "bruna-pessoa-ma",
"nome": "Bruna Pessoa",
"cargo": "deputada-estadual",
"uf": "MA",
"partido": "MDB",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "claudia-coutinho-ma",
"nome": "Claudia Coutinho",
"cargo": "deputada-estadual",
"uf": "MA",
"partido": "MDB",
"corRaca": "PARDA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "cricielle-ma",
"nome": "Cricielle",
"cargo": "deputada-estadual",
"uf": "MA",
"partido": "PT",
"corRaca": "PRETA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "daniella-ma",
"nome": "Daniella",
"cargo": "deputada-estadual",
"uf": "MA",
"partido": "MDB",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "detinha-ma",
"nome": "Detinha",
"cargo": "deputada-estadual",
"uf": "MA",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "luanna-ma",
"nome": "Luanna",
"cargo": "deputada-estadual",
"uf": "MA",
"partido": "PT",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "maedja-campos-ma",
"nome": "Maedja Campos",
"cargo": "deputada-estadual",
"uf": "MA",
"partido": "PDT",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "natalia-do-junior-garimpeiro-ma",
"nome": "Natália do Júnior Garimpeiro",
"cargo": "deputada-estadual",
"uf": "MA",
"partido": "UNIÃO",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "paula-prata-ma",
"nome": "Paula Prata",
"cargo": "deputada-estadual",
"uf": "MA",
"partido": "PSD",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "solange-almeida-ma",
"nome": "Solange Almeida",
"cargo": "deputada-estadual",
"uf": "MA",
"partido": "PL",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "vanessa-marreca-ma",
"nome": "Vanessa Marreca",
"cargo": "deputada-estadual",
"uf": "MA",
"partido": "MDB",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "adriana-souza-mg",
"nome": "Adriana Souza",
"cargo": "deputada-estadual",
"uf": "MG",
"partido": "PT",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "ale-portela-mg",
"nome": "Alê Portela",
"cargo": "deputada-estadual",
"uf": "MG",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "amanda-teixeira-dias-mg",
"nome": "Amanda Teixeira Dias",
"cargo": "deputada-estadual",
"uf": "MG",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "ana-paula-siqueira-mg",
"nome": "Ana Paula Siqueira",
"cargo": "deputada-estadual",
"uf": "MG",
"partido": "PT",
"corRaca": "PRETA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "andreia-de-jesus-mg",
"nome": "Andréia de Jesus",
"cargo": "deputada-estadual",
"uf": "MG",
"partido": "PT",
"corRaca": "PRETA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "beatriz-cerqueira-mg",
"nome": "Beatriz Cerqueira",
"cargo": "deputada-estadual",
"uf": "MG",
"partido": "PT",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "carol-caram-mg",
"nome": "Carol Caram",
"cargo": "deputada-estadual",
"uf": "MG",
"partido": "AVANTE",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "chiara-biondini-mg",
"nome": "Chiara Biondini",
"cargo": "deputada-estadual",
"uf": "MG",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "delegada-sheila-mg",
"nome": "Delegada Sheila",
"cargo": "deputada-estadual",
"uf": "MG",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "dra-lais-santiago-mg",
"nome": "Dra Laís Santiago",
"cargo": "deputada-estadual",
"uf": "MG",
"partido": "PDT",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "flavia-borja-mg",
"nome": "Flávia Borja",
"cargo": "deputada-estadual",
"uf": "MG",
"partido": "PODE",
"corRaca": "BRANCA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "iza-lourenca-mg",
"nome": "Iza Lourença",
"cargo": "deputada-estadual",
"uf": "MG",
"partido": "PSOL",
"corRaca": "PRETA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "leninha-mg",
"nome": "Leninha",
"cargo": "deputada-estadual",
"uf": "MG",
"partido": "PT",
"corRaca": "PRETA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "lud-falcao-mg",
"nome": "Lud Falcão",
"cargo": "deputada-estadual",
"uf": "MG",
"partido": "REPUBLICANOS",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "macae-evaristo-mg",
"nome": "Macaé Evaristo",
"cargo": "deputada-estadual",
"uf": "MG",
"partido": "PT",
"corRaca": "PRETA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "maria-clara-mg",
"nome": "Maria Clara",
"cargo": "deputada-estadual",
"uf": "MG",
"partido": "PSDB",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "marilia-amaral-mg",
"nome": "Marilia Amaral",
"cargo": "deputada-estadual",
"uf": "MG",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "marli-ribeiro-mg",
"nome": "Marli Ribeiro",
"cargo": "deputada-estadual",
"uf": "MG",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "nayara-rocha-mg",
"nome": "Nayara Rocha",
"cargo": "deputada-estadual",
"uf": "MG",
"partido": "PP",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "roberta-lopes-mg",
"nome": "Roberta Lopes",
"cargo": "deputada-estadual",
"uf": "MG",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "gianni-nogueira-ms",
"nome": "Gianni Nogueira",
"cargo": "deputada-estadual",
"uf": "MS",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "professora-gleice-jane-ms",
"nome": "Professora Gleice Jane",
"cargo": "deputada-estadual",
"uf": "MS",
"partido": "PT",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "alessandra-ferreira-mt",
"nome": "Alessandra Ferreira",
"cargo": "deputada-estadual",
"uf": "MT",
"partido": "PODE",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "samantha-do-abilio-mt",
"nome": "Samantha do Abilio",
"cargo": "deputada-estadual",
"uf": "MT",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "ana-cunha-pa",
"nome": "Ana Cunha",
"cargo": "deputada-estadual",
"uf": "PA",
"partido": "MDB",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "andrea-dantas-pa",
"nome": "Andrea Dantas",
"cargo": "deputada-estadual",
"uf": "PA",
"partido": "MDB",
"corRaca": "BRANCA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "andreia-xarao-pa",
"nome": "Andreia Xarão",
"cargo": "deputada-estadual",
"uf": "PA",
"partido": "MDB",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "cilene-couto-pa",
"nome": "Cilene Couto",
"cargo": "deputada-estadual",
"uf": "PA",
"partido": "MDB",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "lanuzia-cunha-pa",
"nome": "Lanuzia Cunha",
"cargo": "deputada-estadual",
"uf": "PA",
"partido": "PL",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "livia-duarte-pa",
"nome": "Lívia Duarte",
"cargo": "deputada-estadual",
"uf": "PA",
"partido": "PSOL",
"corRaca": "PRETA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "maria-pa",
"nome": "Maria",
"cargo": "deputada-estadual",
"uf": "PA",
"partido": "PT",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "mariza-almeida-pa",
"nome": "Mariza Almeida",
"cargo": "deputada-estadual",
"uf": "PA",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "paula-titan-pa",
"nome": "Paula Titan",
"cargo": "deputada-estadual",
"uf": "PA",
"partido": "PP",
"corRaca": "BRANCA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "renata-fonseca-pa",
"nome": "Renata Fonseca",
"cargo": "deputada-estadual",
"uf": "PA",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "tati-barra-pa",
"nome": "Tati Barra",
"cargo": "deputada-estadual",
"uf": "PA",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "camila-toscano-pb",
"nome": "Camila Toscano",
"cargo": "deputada-estadual",
"uf": "PB",
"partido": "MDB",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "cida-ramos-pb",
"nome": "Cida Ramos",
"cargo": "deputada-estadual",
"uf": "PB",
"partido": "PT",
"corRaca": "PRETA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "danielle-do-vale-pb",
"nome": "Danielle do Vale",
"cargo": "deputada-estadual",
"uf": "PB",
"partido": "REPUBLICANOS",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "jo-oliveira-pb",
"nome": "Jô Oliveira",
"cargo": "deputada-estadual",
"uf": "PB",
"partido": "PCDOB",
"corRaca": "PRETA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "lorena-pb",
"nome": "Lorena",
"cargo": "deputada-estadual",
"uf": "PB",
"partido": "PP",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "maria-porto-pb",
"nome": "Maria Porto",
"cargo": "deputada-estadual",
"uf": "PB",
"partido": "UNIÃO",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "nil-mendes-pb",
"nome": "Nil Mendes",
"cargo": "deputada-estadual",
"uf": "PB",
"partido": "PSB",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "olivia-motta-pb",
"nome": "Olívia Motta",
"cargo": "deputada-estadual",
"uf": "PB",
"partido": "REPUBLICANOS",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "andrea-medeiros-pe",
"nome": "Andréa Medeiros",
"cargo": "deputada-estadual",
"uf": "PE",
"partido": "PSD",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "dani-portela-pe",
"nome": "Dani Portela",
"cargo": "deputada-estadual",
"uf": "PE",
"partido": "PT",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "debora-almeida-pe",
"nome": "Débora Almeida",
"cargo": "deputada-estadual",
"uf": "PE",
"partido": "PSD",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "gleide-angelo-pe",
"nome": "Gleide Ângelo",
"cargo": "deputada-estadual",
"uf": "PE",
"partido": "PP",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "lara-santana-pe",
"nome": "Lara Santana",
"cargo": "deputada-estadual",
"uf": "PE",
"partido": "PV",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "maria-arraes-pe",
"nome": "Maria Arraes",
"cargo": "deputada-estadual",
"uf": "PE",
"partido": "PSB",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "professora-ivete-caetano-pe",
"nome": "Professora Ivete Caetano",
"cargo": "deputada-estadual",
"uf": "PE",
"partido": "PT",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "roberta-arraes-pe",
"nome": "Roberta Arraes",
"cargo": "deputada-estadual",
"uf": "PE",
"partido": "PP",
"corRaca": "BRANCA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "ana-paula-pi",
"nome": "Ana Paula",
"cargo": "deputada-estadual",
"uf": "PI",
"partido": "MDB",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "anyara-santos-pi",
"nome": "Anyara Santos",
"cargo": "deputada-estadual",
"uf": "PI",
"partido": "MDB",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "janainna-marques-pi",
"nome": "Janainna Marques",
"cargo": "deputada-estadual",
"uf": "PI",
"partido": "PT",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "simone-pereira-pi",
"nome": "Simone Pereira",
"cargo": "deputada-estadual",
"uf": "PI",
"partido": "PSD",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "delegada-tathiana-guzella-pr",
"nome": "Delegada Tathiana Guzella",
"cargo": "deputada-estadual",
"uf": "PR",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "fabiana-parro-pr",
"nome": "Fabiana Parro",
"cargo": "deputada-estadual",
"uf": "PR",
"partido": "PODE",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "flavia-francischini-pr",
"nome": "Flávia Francischini",
"cargo": "deputada-estadual",
"uf": "PR",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "jessicao-pr",
"nome": "Jessicão",
"cargo": "deputada-estadual",
"uf": "PR",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "lu-bonatto-pr",
"nome": "Lu Bonatto",
"cargo": "deputada-estadual",
"uf": "PR",
"partido": "PODE",
"corRaca": "BRANCA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "mabel-canto-pr",
"nome": "Mabel Canto",
"cargo": "deputada-estadual",
"uf": "PR",
"partido": "PP",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "maria-victoria-pr",
"nome": "Maria Victoria",
"cargo": "deputada-estadual",
"uf": "PR",
"partido": "PP",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "miss-preta-pr",
"nome": "Miss Preta",
"cargo": "deputada-estadual",
"uf": "PR",
"partido": "PT",
"corRaca": "PRETA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "yasmin-hachem-pr",
"nome": "Yasmin Hachem",
"cargo": "deputada-estadual",
"uf": "PR",
"partido": "PT",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "ana-paula-mendes-rj",
"nome": "Ana Paula Mendes",
"cargo": "deputada-estadual",
"uf": "RJ",
"partido": "PSD",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "carla-machado-rj",
"nome": "Carla Machado",
"cargo": "deputada-estadual",
"uf": "RJ",
"partido": "PSD",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "dani-balbi-rj",
"nome": "Dani Balbi",
"cargo": "deputada-estadual",
"uf": "RJ",
"partido": "PCDOB",
"corRaca": "PRETA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "dani-monteiro-rj",
"nome": "Dani Monteiro",
"cargo": "deputada-estadual",
"uf": "RJ",
"partido": "PSOL",
"corRaca": "PRETA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "dra-gabriela-rj",
"nome": "Dra. Gabriela",
"cargo": "deputada-estadual",
"uf": "RJ",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "elika-takimoto-rj",
"nome": "Elika Takimoto",
"cargo": "deputada-estadual",
"uf": "RJ",
"partido": "PT",
"corRaca": "AMARELA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "fernanda-neves-rj",
"nome": "Fernanda Neves",
"cargo": "deputada-estadual",
"uf": "RJ",
"partido": "PDT",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "giselle-monteiro-rj",
"nome": "Giselle Monteiro",
"cargo": "deputada-estadual",
"uf": "RJ",
"partido": "PL",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "joyce-trindade-rj",
"nome": "Joyce Trindade",
"cargo": "deputada-estadual",
"uf": "RJ",
"partido": "PSD",
"corRaca": "PRETA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "luciana-boiteux-rj",
"nome": "Luciana Boiteux",
"cargo": "deputada-estadual",
"uf": "RJ",
"partido": "PSOL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "marina-do-mst-rj",
"nome": "Marina do Mst",
"cargo": "deputada-estadual",
"uf": "RJ",
"partido": "PT",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "renata-souza-rj",
"nome": "Renata Souza",
"cargo": "deputada-estadual",
"uf": "RJ",
"partido": "PSOL",
"corRaca": "PRETA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "tia-ju-rj",
"nome": "Tia Ju",
"cargo": "deputada-estadual",
"uf": "RJ",
"partido": "REPUBLICANOS",
"corRaca": "PARDA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "veronica-lima-rj",
"nome": "Verônica Lima",
"cargo": "deputada-estadual",
"uf": "RJ",
"partido": "PT",
"corRaca": "PRETA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "zeidan-rj",
"nome": "Zeidan",
"cargo": "deputada-estadual",
"uf": "RJ",
"partido": "PT",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "india-armelau-rj",
"nome": "Índia Armelau",
"cargo": "deputada-estadual",
"uf": "RJ",
"partido": "PL",
"corRaca": "INDÍGENA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "camila-araujo-rn",
"nome": "Camila Araújo",
"cargo": "deputada-estadual",
"uf": "RN",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "cinthia-de-allyson-rn",
"nome": "Cinthia de Allyson",
"cargo": "deputada-estadual",
"uf": "RN",
"partido": "UNIÃO",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "cristiane-dantas-rn",
"nome": "Cristiane Dantas",
"cargo": "deputada-estadual",
"uf": "RN",
"partido": "PSDB",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "divaneide-basilio-rn",
"nome": "Divaneide Basílio",
"cargo": "deputada-estadual",
"uf": "RN",
"partido": "PT",
"corRaca": "PRETA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "eudiane-macedo-rn",
"nome": "Eudiane Macedo",
"cargo": "deputada-estadual",
"uf": "RN",
"partido": "PV",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "isolda-dantas-rn",
"nome": "Isolda Dantas",
"cargo": "deputada-estadual",
"uf": "RN",
"partido": "PT",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "kaline-de-dr-bernardo-rn",
"nome": "Kaline de Dr. Bernardo",
"cargo": "deputada-estadual",
"uf": "RN",
"partido": "PV",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "claudia-de-jesus-ro",
"nome": "Cláudia de Jesus",
"cargo": "deputada-estadual",
"uf": "RO",
"partido": "PT",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "dra-taissa-sousa-ro",
"nome": "Dra. Taíssa Sousa",
"cargo": "deputada-estadual",
"uf": "RO",
"partido": "PL",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "fatima-cleide-ro",
"nome": "Fátima Cleide",
"cargo": "deputada-estadual",
"uf": "RO",
"partido": "PT",
"corRaca": "PRETA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "angela-aguida-portella-rr",
"nome": "Angela Águida Portella",
"cargo": "deputada-estadual",
"uf": "RR",
"partido": "PP",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "aurelina-medeiros-rr",
"nome": "Aurelina Medeiros",
"cargo": "deputada-estadual",
"uf": "RR",
"partido": "UNIÃO",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "catarina-guerra-rr",
"nome": "Catarina Guerra",
"cargo": "deputada-estadual",
"uf": "RR",
"partido": "UNIÃO",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "darbi-de-jesus-rr",
"nome": "Darbi de Jesus",
"cargo": "deputada-estadual",
"uf": "RR",
"partido": "REPUBLICANOS",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "joilma-teodora-rr",
"nome": "Joilma Teodora",
"cargo": "deputada-estadual",
"uf": "RR",
"partido": "UNIÃO",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "tayla-peres-rr",
"nome": "Tayla Peres",
"cargo": "deputada-estadual",
"uf": "RR",
"partido": "REPUBLICANOS",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "tenente-roney-rr",
"nome": "Tenente Roney",
"cargo": "deputada-estadual",
"uf": "RR",
"partido": "AGIR",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "adri-cherini-rs",
"nome": "Adri Cherini",
"cargo": "deputada-estadual",
"uf": "RS",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "adriana-lara-rs",
"nome": "Adriana Lara",
"cargo": "deputada-estadual",
"uf": "RS",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "ali-klemt-rs",
"nome": "Ali Klemt",
"cargo": "deputada-estadual",
"uf": "RS",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "bruna-molz-rs",
"nome": "Bruna Molz",
"cargo": "deputada-estadual",
"uf": "RS",
"partido": "PODE",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "comandante-nadia-rs",
"nome": "Comandante Nádia",
"cargo": "deputada-estadual",
"uf": "RS",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "daiane-mello-rs",
"nome": "Daiane Mello",
"cargo": "deputada-estadual",
"uf": "RS",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "delegada-ana-tarouco-rs",
"nome": "Delegada Ana Tarouco",
"cargo": "deputada-estadual",
"uf": "RS",
"partido": "PSD",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "delegada-nadine-rs",
"nome": "Delegada Nadine",
"cargo": "deputada-estadual",
"uf": "RS",
"partido": "PSD",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "karen-santos-rs",
"nome": "Karen Santos",
"cargo": "deputada-estadual",
"uf": "RS",
"partido": "PSOL",
"corRaca": "PRETA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "kelly-moraes-rs",
"nome": "Kelly Moraes",
"cargo": "deputada-estadual",
"uf": "RS",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "luciana-genro-rs",
"nome": "Luciana Genro",
"cargo": "deputada-estadual",
"uf": "RS",
"partido": "PSOL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "natasha-rs",
"nome": "Natasha",
"cargo": "deputada-estadual",
"uf": "RS",
"partido": "PT",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "nicole-weber-covatti-rs",
"nome": "Nicole Weber Covatti",
"cargo": "deputada-estadual",
"uf": "RS",
"partido": "PP",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "ronize-damassini-rs",
"nome": "Ronize Damassini",
"cargo": "deputada-estadual",
"uf": "RS",
"partido": "PP",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "sofia-cavedon-rs",
"nome": "Sofia Cavedon",
"cargo": "deputada-estadual",
"uf": "RS",
"partido": "PT",
"corRaca": "BRANCA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "vanice-de-matos-rs",
"nome": "Vanice de Matos",
"cargo": "deputada-estadual",
"uf": "RS",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "ana-campagnolo-sc",
"nome": "Ana Campagnolo",
"cargo": "deputada-estadual",
"uf": "SC",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "anna-carolina-sc",
"nome": "Anna Carolina",
"cargo": "deputada-estadual",
"uf": "SC",
"partido": "REPUBLICANOS",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "chica-do-eskudlark-sc",
"nome": "Chica do Eskudlark",
"cargo": "deputada-estadual",
"uf": "SC",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "juliana-maciel-sc",
"nome": "Juliana Maciel",
"cargo": "deputada-estadual",
"uf": "SC",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "luciane-carminatti-sc",
"nome": "Luciane Carminatti",
"cargo": "deputada-estadual",
"uf": "SC",
"partido": "PT",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "ana-luiza-se",
"nome": "Ana Luiza",
"cargo": "deputada-estadual",
"uf": "SE",
"partido": "REPUBLICANOS",
"corRaca": "BRANCA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "dra-lidiane-lucena-se",
"nome": "Dra Lidiane Lucena",
"cargo": "deputada-estadual",
"uf": "SE",
"partido": "UNIÃO",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "kitty-lima-se",
"nome": "Kitty Lima",
"cargo": "deputada-estadual",
"uf": "SE",
"partido": "PSB",
"corRaca": "BRANCA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "maisa-mitidieri-se",
"nome": "Maisa Mitidieri",
"cargo": "deputada-estadual",
"uf": "SE",
"partido": "PSD",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "ana-carolina-serra-sp",
"nome": "Ana Carolina Serra",
"cargo": "deputada-estadual",
"uf": "SP",
"partido": "PSDB",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "ana-perugini-sp",
"nome": "Ana Perugini",
"cargo": "deputada-estadual",
"uf": "SP",
"partido": "PT",
"corRaca": "BRANCA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "analice-fernandes-sp",
"nome": "Analice Fernandes",
"cargo": "deputada-estadual",
"uf": "SP",
"partido": "PSD",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "bruna-furlan-sp",
"nome": "Bruna Furlan",
"cargo": "deputada-estadual",
"uf": "SP",
"partido": "REPUBLICANOS",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "camila-godoi-sp",
"nome": "Camila Godoi",
"cargo": "deputada-estadual",
"uf": "SP",
"partido": "UNIÃO",
"corRaca": "BRANCA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "carla-morando-sp",
"nome": "Carla Morando",
"cargo": "deputada-estadual",
"uf": "SP",
"partido": "PSD",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "dani-alonso-sp",
"nome": "Dani Alonso",
"cargo": "deputada-estadual",
"uf": "SP",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "delegada-graciela-sp",
"nome": "Delegada Graciela",
"cargo": "deputada-estadual",
"uf": "SP",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "duda-hidalgo-sp",
"nome": "Duda Hidalgo",
"cargo": "deputada-estadual",
"uf": "SP",
"partido": "PT",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "debora-camilo-sp",
"nome": "Débora Camilo",
"cargo": "deputada-estadual",
"uf": "SP",
"partido": "PSOL",
"corRaca": "PRETA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "ediane-maria-sp",
"nome": "Ediane Maria",
"cargo": "deputada-estadual",
"uf": "SP",
"partido": "PSOL",
"corRaca": "PRETA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "eduarda-campopiano-sp",
"nome": "Eduarda Campopiano",
"cargo": "deputada-estadual",
"uf": "SP",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "ely-santos-sp",
"nome": "Ely Santos",
"cargo": "deputada-estadual",
"uf": "SP",
"partido": "REPUBLICANOS",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "fabiana-bolsonaro-sp",
"nome": "Fabiana Bolsonaro",
"cargo": "deputada-estadual",
"uf": "SP",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "keit-lima-sp",
"nome": "Keit Lima",
"cargo": "deputada-estadual",
"uf": "SP",
"partido": "PSOL",
"corRaca": "PRETA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "leticia-aguiar-sp",
"nome": "Leticia Aguiar",
"cargo": "deputada-estadual",
"uf": "SP",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "luiza-erundina-sp",
"nome": "Luiza Erundina",
"cargo": "deputada-estadual",
"uf": "SP",
"partido": "PSOL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "mariana-conti-sp",
"nome": "Mariana Conti",
"cargo": "deputada-estadual",
"uf": "SP",
"partido": "PSOL",
"corRaca": "AMARELA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "marina-bragante-sp",
"nome": "Marina Bragante",
"cargo": "deputada-estadual",
"uf": "SP",
"partido": "PSB",
"corRaca": "BRANCA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "marta-costa-sp",
"nome": "Marta Costa",
"cargo": "deputada-estadual",
"uf": "SP",
"partido": "PSD",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "monica-das-pretas-sp",
"nome": "Monica das Pretas",
"cargo": "deputada-estadual",
"uf": "SP",
"partido": "PSOL",
"corRaca": "PRETA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "paula-da-bancada-feminista-sp",
"nome": "Paula da Bancada Feminista",
"cargo": "deputada-estadual",
"uf": "SP",
"partido": "PSOL",
"corRaca": "PRETA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "professora-bebel-sp",
"nome": "Professora Bebel",
"cargo": "deputada-estadual",
"uf": "SP",
"partido": "PT",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "regina-nunes-sp",
"nome": "Regina Nunes",
"cargo": "deputada-estadual",
"uf": "SP",
"partido": "MDB",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "renata-sene-sp",
"nome": "Renata Sene",
"cargo": "deputada-estadual",
"uf": "SP",
"partido": "REPUBLICANOS",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "sofia-favero-sp",
"nome": "Sofia Favero",
"cargo": "deputada-estadual",
"uf": "SP",
"partido": "PSOL",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "solange-freitas-sp",
"nome": "Solange Freitas",
"cargo": "deputada-estadual",
"uf": "SP",
"partido": "UNIÃO",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "thainara-faria-sp",
"nome": "Thainara Faria",
"cargo": "deputada-estadual",
"uf": "SP",
"partido": "PT",
"corRaca": "PRETA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "claudia-lelis-to",
"nome": "Claudia Lelis",
"cargo": "deputada-estadual",
"uf": "TO",
"partido": "PV",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "katia-chaves-to",
"nome": "Katia Chaves",
"cargo": "deputada-estadual",
"uf": "TO",
"partido": "REPUBLICANOS",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "vanda-monteiro-to",
"nome": "Vanda Monteiro",
"cargo": "deputada-estadual",
"uf": "TO",
"partido": "UNIÃO",
"corRaca": "PARDA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "dayse-amarilio-df",
"nome": "Dayse Amarilio",
"cargo": "deputada-distrital",
"uf": "DF",
"partido": "PSB",
"corRaca": "BRANCA",
"situacao": "ELEITO POR MÉDIA",
"turno": 1
},
{
"slug": "estefane-sampaio-df",
"nome": "Estefane Sampaio",
"cargo": "deputada-distrital",
"uf": "DF",
"partido": "REPUBLICANOS",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "jaqueline-silva-df",
"nome": "Jaqueline Silva",
"cargo": "deputada-distrital",
"uf": "DF",
"partido": "MDB",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "keka-bagno-df",
"nome": "Keka Bagno",
"cargo": "deputada-distrital",
"uf": "DF",
"partido": "PSOL",
"corRaca": "PRETA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "renata-daguiar-df",
"nome": "Renata Daguiar",
"cargo": "deputada-distrital",
"uf": "DF",
"partido": "REPUBLICANOS",
"corRaca": "BRANCA",
"situacao": "ELEITO POR QP",
"turno": 1
},
{
"slug": "mara-rocha-ac",
"nome": "Mara Rocha",
"cargo": "senadora",
"uf": "AC",
"partido": "REPUBLICANOS",
"corRaca": "BRANCA",
"situacao": "ELEITO",
"turno": 1
},
{
"slug": "marina-jhc-al",
"nome": "Marina Jhc",
"cargo": "senadora",
"uf": "AL",
"partido": "PSDB",
"corRaca": "BRANCA",
"situacao": "ELEITO",
"turno": 1
},
{
"slug": "rayssa-furlan-ap",
"nome": "Rayssa Furlan",
"cargo": "senadora",
"uf": "AP",
"partido": "PODE",
"corRaca": "PARDA",
"situacao": "ELEITO",
"turno": 1
},
{
"slug": "luizianne-ce",
"nome": "Luizianne",
"cargo": "senadora",
"uf": "CE",
"partido": "REDE",
"corRaca": "BRANCA",
"situacao": "ELEITO",
"turno": 1
},
{
"slug": "bia-kicis-df",
"nome": "Bia Kicis",
"cargo": "senadora",
"uf": "DF",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO",
"turno": 1
},
{
"slug": "michelle-bolsonaro-df",
"nome": "Michelle Bolsonaro",
"cargo": "senadora",
"uf": "DF",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO",
"turno": 1
},
{
"slug": "gracinha-caiado-go",
"nome": "Gracinha Caiado",
"cargo": "senadora",
"uf": "GO",
"partido": "UNIÃO",
"corRaca": "BRANCA",
"situacao": "ELEITO",
"turno": 1
},
{
"slug": "marilia-campos-mg",
"nome": "Marília Campos",
"cargo": "senadora",
"uf": "MG",
"partido": "PT",
"corRaca": "PARDA",
"situacao": "ELEITO",
"turno": 1
},
{
"slug": "marilia-arraes-pe",
"nome": "Marília Arraes",
"cargo": "senadora",
"uf": "PE",
"partido": "PDT",
"corRaca": "BRANCA",
"situacao": "ELEITO",
"turno": 1
},
{
"slug": "samanda-de-lula-rn",
"nome": "Samanda de Lula",
"cargo": "senadora",
"uf": "RN",
"partido": "PT",
"corRaca": "BRANCA",
"situacao": "ELEITO",
"turno": 1
},
{
"slug": "teresa-surita-rr",
"nome": "Teresa Surita",
"cargo": "senadora",
"uf": "RR",
"partido": "MDB",
"corRaca": "BRANCA",
"situacao": "ELEITO",
"turno": 1
},
{
"slug": "carol-de-toni-sc",
"nome": "Carol de Toni",
"cargo": "senadora",
"uf": "SC",
"partido": "PL",
"corRaca": "BRANCA",
"situacao": "ELEITO",
"turno": 1
},
{
"slug": "mailza-assis-ac",
"nome": "Mailza Assis",
"cargo": "governadora",
"uf": "AC",
"partido": "PP",
"corRaca": "BRANCA",
"situacao": "ELEITO",
"turno": 2
},
{
"slug": "celina-leao-df",
"nome": "Celina Leão",
"cargo": "governadora",
"uf": "DF",
"partido": "PP",
"corRaca": "BRANCA",
"situacao": "ELEITO",
"turno": 2
},
{
"slug": "raquel-lyra-pe",
"nome": "Raquel Lyra",
"cargo": "governadora",
"uf": "PE",
"partido": "PSD",
"corRaca": "BRANCA",
"situacao": "ELEITO",
"turno": 1
}
];
