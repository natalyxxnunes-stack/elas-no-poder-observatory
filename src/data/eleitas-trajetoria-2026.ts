/**
 * eleitas-trajetoria-2026 — trajetória registrada no TSE de cada eleita de
 * 2026: ocupação e escolaridade declaradas em 2026 e o resultado na eleição
 * geral de 2022. GERADO por scripts/recontagem/eleitas_trajetoria_2026.py;
 * não editar à mão.
 * Fontes: TSE, consulta_cand_2026_BRASIL.csv gerado em 02/11/2026 08:30:34, SHA-256 0e44c739c75fe3c6e5fa306de797a8fdba81342ae464abc0e4ac79d07570a83f;
 * TSE, consulta_cand_2022_BRASIL.csv gerado em 01/11/2026 03:16:07, SHA-256 f945a3a542e138ecd3e1ebbaba6605a157d91608cd5a6ae170f58011b5f8de76.
 * Junção por CPF feita só em memória; o CPF não é gravado. `em2022: null` =
 * não aparece entre as candidaturas da eleição geral de 2022 (eleições
 * municipais não estão nesta base).
 */
export type Trajetoria2022 = { cargo: string; uf: string; partido: string; resultado: string };
export type TrajetoriaEleita = { ocupacao: string | null; instrucao: string | null; em2022: Trajetoria2022 | null };
export const TRAJETORIA_META = { base2026: "02/11/2026 08:30:34", sha2026: "0e44c739c75fe3c6e5fa306de797a8fdba81342ae464abc0e4ac79d07570a83f", base2022: "01/11/2026 03:16:07", sha2022: "f945a3a542e138ecd3e1ebbaba6605a157d91608cd5a6ae170f58011b5f8de76", contagem2022: {"eleita": 186, "suplente": 40, "não eleita": 19, "foi ao 2º turno": 0, "candidatura sem votação válida": 0, "não disputou": 97} } as const;
export const TRAJETORIA_ELEITAS: Readonly<Record<string, TrajetoriaEleita>> = {
"perpetua-almeida-ac": {
"ocupacao": "Servidor público estadual",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "AC",
"partido": "PC do B",
"resultado": "não eleita"
}
},
"socorro-neri-ac": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "AC",
"partido": "PP",
"resultado": "eleita"
}
},
"julia-nunes-al": {
"ocupacao": "Advogada",
"instrucao": "Superior completo",
"em2022": null
},
"joana-darc-am": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "AM",
"partido": "UNIÃO",
"resultado": "eleita"
}
},
"aline-gurgel-ap": {
"ocupacao": "Empresária",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "AP",
"partido": "REPUBLICANOS",
"resultado": "eleita"
}
},
"dra-erica-ap": {
"ocupacao": "Médica",
"instrucao": "Superior completo",
"em2022": null
},
"professora-marcivania-ap": {
"ocupacao": "Professora",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "AP",
"partido": "PC do B",
"resultado": "eleita"
}
},
"alice-portugal-ba": {
"ocupacao": "Farmacêutica",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "BA",
"partido": "PC do B",
"resultado": "eleita"
}
},
"doutora-raissa-soares-ba": {
"ocupacao": "Médica",
"instrucao": "Superior completo",
"em2022": {
"cargo": "senadora",
"uf": "BA",
"partido": "PL",
"resultado": "não eleita"
}
},
"ivoneide-caetano-ba": {
"ocupacao": "Advogada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "BA",
"partido": "PT",
"resultado": "eleita"
}
},
"maria-marighella-ba": {
"ocupacao": "Outros",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "BA",
"partido": "PT",
"resultado": "suplente"
}
},
"olivia-ba": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "BA",
"partido": "PC do B",
"resultado": "eleita"
}
},
"roberta-roma-ba": {
"ocupacao": "Servidor público federal",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "BA",
"partido": "PL",
"resultado": "eleita"
}
},
"erika-amorim-ce": {
"ocupacao": "Administradora",
"instrucao": "Superior completo",
"em2022": {
"cargo": "senadora",
"uf": "CE",
"partido": "PSD",
"resultado": "não eleita"
}
},
"fernanda-pessoa-ce": {
"ocupacao": "Administradora",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "CE",
"partido": "UNIÃO",
"resultado": "eleita"
}
},
"giordanna-mano-ce": {
"ocupacao": "Advogada",
"instrucao": "Superior completo",
"em2022": null
},
"luisa-cela-ce": {
"ocupacao": "Psicóloga",
"instrucao": "Superior completo",
"em2022": null
},
"tainah-marinho-ce": {
"ocupacao": "Engenheira",
"instrucao": "Superior completo",
"em2022": null
},
"jack-rocha-es": {
"ocupacao": "Deputada",
"instrucao": "Superior incompleto",
"em2022": {
"cargo": "deputada federal",
"uf": "ES",
"partido": "PT",
"resultado": "eleita"
}
},
"manu-es": {
"ocupacao": "Advogada",
"instrucao": "Superior completo",
"em2022": null
},
"delegada-adriana-accorsi-go": {
"ocupacao": "Advogada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "GO",
"partido": "PT",
"resultado": "eleita"
}
},
"flavia-morais-go": {
"ocupacao": "Professora",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "GO",
"partido": "PDT",
"resultado": "eleita"
}
},
"magda-mofatto-go": {
"ocupacao": "Empresária",
"instrucao": "Superior incompleto",
"em2022": {
"cargo": "deputada federal",
"uf": "GO",
"partido": "PL",
"resultado": "eleita"
}
},
"marussa-boldrin-go": {
"ocupacao": "Agricultora",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "GO",
"partido": "MDB",
"resultado": "eleita"
}
},
"silvye-alves-go": {
"ocupacao": "Jornalista e redatora",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "GO",
"partido": "UNIÃO",
"resultado": "eleita"
}
},
"amanda-gentil-ma": {
"ocupacao": "Estudante, bolsista, estagiária",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "MA",
"partido": "PP",
"resultado": "eleita"
}
},
"fabiana-vilar-ma": {
"ocupacao": "Advogada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "MA",
"partido": "PL",
"resultado": "eleita"
}
},
"iracema-vale-ma": {
"ocupacao": "Enfermeira",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "MA",
"partido": "PSB",
"resultado": "eleita"
}
},
"larissa-dp-ma": {
"ocupacao": "Advogada",
"instrucao": "Superior completo",
"em2022": null
},
"mariana-carvalho-ma": {
"ocupacao": "Advogada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "MA",
"partido": "PSC",
"resultado": "suplente"
}
},
"ana-elisa-mg": {
"ocupacao": "Estudante, bolsista, estagiária",
"instrucao": "Superior incompleto",
"em2022": null
},
"ana-pimentel-mg": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "MG",
"partido": "PT",
"resultado": "eleita"
}
},
"bella-goncalves-mg": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "MG",
"partido": "PSOL",
"resultado": "eleita"
}
},
"dandara-mg": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "MG",
"partido": "PT",
"resultado": "eleita"
}
},
"delegada-ione-mg": {
"ocupacao": "Outros",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "MG",
"partido": "AVANTE",
"resultado": "eleita"
}
},
"duda-salabert-mg": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "MG",
"partido": "PDT",
"resultado": "eleita"
}
},
"gleide-andrade-mg": {
"ocupacao": "Outros",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "MG",
"partido": "PT",
"resultado": "suplente"
}
},
"greyce-elias-mg": {
"ocupacao": "Advogada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "MG",
"partido": "AVANTE",
"resultado": "eleita"
}
},
"lohanna-mg": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "MG",
"partido": "PV",
"resultado": "eleita"
}
},
"nely-aquino-mg": {
"ocupacao": "Deputada",
"instrucao": "Superior incompleto",
"em2022": {
"cargo": "deputada federal",
"uf": "MG",
"partido": "PODE",
"resultado": "eleita"
}
},
"rosangela-reis-mg": {
"ocupacao": "Professora",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "MG",
"partido": "PL",
"resultado": "eleita"
}
},
"camila-jara-ms": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "MS",
"partido": "PT",
"resultado": "eleita"
}
},
"isa-marcondes-ms": {
"ocupacao": "Vereadora",
"instrucao": "Ensino fundamental incompleto",
"em2022": null
},
"mara-caseiro-ms": {
"ocupacao": "Odontóloga",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "MS",
"partido": "PSDB",
"resultado": "eleita"
}
},
"rose-modesto-ms": {
"ocupacao": "Professora",
"instrucao": "Superior completo",
"em2022": {
"cargo": "governadora",
"uf": "MS",
"partido": "UNIÃO",
"resultado": "não eleita"
}
},
"coronel-fernanda-mt": {
"ocupacao": "Policial militar",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "MT",
"partido": "PL",
"resultado": "eleita"
}
},
"professora-rosa-neide-mt": {
"ocupacao": "Professora",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "MT",
"partido": "PT",
"resultado": "não eleita"
}
},
"virginia-mendes-mt": {
"ocupacao": "Empresária",
"instrucao": "Superior completo",
"em2022": null
},
"andreia-siqueira-pa": {
"ocupacao": "Empresária",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "PA",
"partido": "MDB",
"resultado": "eleita"
}
},
"dilvanda-faro-pa": {
"ocupacao": "Deputada",
"instrucao": "Ensino médio completo",
"em2022": {
"cargo": "deputada federal",
"uf": "PA",
"partido": "PT",
"resultado": "eleita"
}
},
"dra-alessandra-haber-pa": {
"ocupacao": "Médica",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "PA",
"partido": "MDB",
"resultado": "eleita"
}
},
"renilce-nicodemos-pa": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "PA",
"partido": "MDB",
"resultado": "eleita"
}
},
"pollyanna-pb": {
"ocupacao": "Veterinária",
"instrucao": "Superior completo",
"em2022": {
"cargo": "senadora",
"uf": "PB",
"partido": "PSB",
"resultado": "não eleita"
}
},
"clarissa-tercio-pe": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "PE",
"partido": "PP",
"resultado": "eleita"
}
},
"eliane-soares-pe": {
"ocupacao": "Empresária",
"instrucao": "Ensino médio completo",
"em2022": null
},
"iza-arruda-pe": {
"ocupacao": "Fisioterapeuta e terapeuta ocupacional",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "PE",
"partido": "MDB",
"resultado": "eleita"
}
},
"juliana-de-chaparral-pe": {
"ocupacao": "Professora",
"instrucao": "Superior completo",
"em2022": null
},
"liana-cirne-pe": {
"ocupacao": "Professora",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "PE",
"partido": "PT",
"resultado": "suplente"
}
},
"rosa-amorim-pe": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "PE",
"partido": "PT",
"resultado": "eleita"
}
},
"ana-julia-pr": {
"ocupacao": "Advogada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "PR",
"partido": "PT",
"resultado": "eleita"
}
},
"carol-dartora-pr": {
"ocupacao": "Professora",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "PR",
"partido": "PT",
"resultado": "eleita"
}
},
"leandre-pr": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "PR",
"partido": "PSD",
"resultado": "eleita"
}
},
"rosangela-moro-pr": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "SP",
"partido": "UNIÃO",
"resultado": "eleita"
}
},
"anielle-franco-rj": {
"ocupacao": "Ministra",
"instrucao": "Superior completo",
"em2022": null
},
"chris-tonietto-rj": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "RJ",
"partido": "PL",
"resultado": "eleita"
}
},
"dani-cunha-rj": {
"ocupacao": "Deputada",
"instrucao": "Ensino médio completo",
"em2022": {
"cargo": "deputada federal",
"uf": "RJ",
"partido": "UNIÃO",
"resultado": "eleita"
}
},
"jandira-feghali-rj": {
"ocupacao": "Médica",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "RJ",
"partido": "PC do B",
"resultado": "eleita"
}
},
"julia-de-castro-rj": {
"ocupacao": "Historiadora",
"instrucao": "Superior completo",
"em2022": null
},
"manoela-peres-rj": {
"ocupacao": "Odontóloga",
"instrucao": "Superior completo",
"em2022": null
},
"nisia-trindade-rj": {
"ocupacao": "Outros",
"instrucao": "Superior completo",
"em2022": null
},
"soraya-santos-rj": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "RJ",
"partido": "PL",
"resultado": "eleita"
}
},
"talita-galhardo-rj": {
"ocupacao": "Jornalista e redatora",
"instrucao": "Superior completo",
"em2022": null
},
"taliria-petrone-rj": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "RJ",
"partido": "PSOL",
"resultado": "eleita"
}
},
"natalia-bonavides-rn": {
"ocupacao": "Advogada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "RN",
"partido": "PT",
"resultado": "eleita"
}
},
"nina-rn": {
"ocupacao": "Vereadora",
"instrucao": "Superior completo",
"em2022": null
},
"thabatta-pimenta-rn": {
"ocupacao": "Vereadora",
"instrucao": "Ensino médio completo",
"em2022": {
"cargo": "deputada federal",
"uf": "RN",
"partido": "PSB",
"resultado": "não eleita"
}
},
"cristiane-lopes-ro": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "RO",
"partido": "UNIÃO",
"resultado": "eleita"
}
},
"joliane-furia-ro": {
"ocupacao": "Enfermeira",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "RO",
"partido": "PSD",
"resultado": "não eleita"
}
},
"sofia-andrade-ro": {
"ocupacao": "Dona",
"instrucao": "Ensino médio incompleto",
"em2022": {
"cargo": "deputada federal",
"uf": "RO",
"partido": "PL",
"resultado": "suplente"
}
},
"any-ortiz-rs": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "RS",
"partido": "CIDADANIA",
"resultado": "eleita"
}
},
"daiana-santos-rs": {
"ocupacao": "Agente de saúde e sanitarista",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "RS",
"partido": "PC do B",
"resultado": "eleita"
}
},
"denise-pessoa-rs": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "RS",
"partido": "PT",
"resultado": "eleita"
}
},
"fernanda-melchionna-rs": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "RS",
"partido": "PSOL",
"resultado": "eleita"
}
},
"maria-do-rosario-rs": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "RS",
"partido": "PT",
"resultado": "eleita"
}
},
"ana-paula-lima-sc": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "SC",
"partido": "PT",
"resultado": "eleita"
}
},
"daniela-reinehr-sc": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "SC",
"partido": "PL",
"resultado": "eleita"
}
},
"geovania-de-sa-sc": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "SC",
"partido": "PSDB",
"resultado": "suplente"
}
},
"giovana-mondardo-sc": {
"ocupacao": "Odontóloga",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "SC",
"partido": "PC do B",
"resultado": "suplente"
}
},
"julia-zanatta-sc": {
"ocupacao": "Advogada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "SC",
"partido": "PL",
"resultado": "eleita"
}
},
"paulinha-sc": {
"ocupacao": "Deputada",
"instrucao": "Superior incompleto",
"em2022": {
"cargo": "deputada estadual",
"uf": "SC",
"partido": "PODE",
"resultado": "eleita"
}
},
"delegada-katarina-se": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "SE",
"partido": "PSD",
"resultado": "eleita"
}
},
"yandra-moura-se": {
"ocupacao": "Advogada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "SE",
"partido": "UNIÃO",
"resultado": "eleita"
}
},
"adriana-ventura-sp": {
"ocupacao": "Professora",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "SP",
"partido": "NOVO",
"resultado": "eleita"
}
},
"ana-carolina-oliveira-sp": {
"ocupacao": "Vereadora",
"instrucao": "Superior completo",
"em2022": null
},
"dra-sandra-tadeu-sp": {
"ocupacao": "Médica",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "SP",
"partido": "UNIÃO",
"resultado": "suplente"
}
},
"erika-hilton-sp": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "SP",
"partido": "PSOL",
"resultado": "eleita"
}
},
"juliana-cardoso-sp": {
"ocupacao": "Outros",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "SP",
"partido": "PT",
"resultado": "eleita"
}
},
"luna-zarattini-sp": {
"ocupacao": "Vereadora",
"instrucao": "Superior completo",
"em2022": null
},
"maria-rosas-sp": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "SP",
"partido": "REPUBLICANOS",
"resultado": "eleita"
}
},
"marina-helena-sp": {
"ocupacao": "Economista",
"instrucao": "Superior completo",
"em2022": null
},
"natalia-boulos-sp": {
"ocupacao": "Advogada",
"instrucao": "Superior completo",
"em2022": null
},
"professora-luciene-cavalcante-sp": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "SP",
"partido": "PSOL",
"resultado": "suplente"
}
},
"renata-abreu-sp": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "SP",
"partido": "PODE",
"resultado": "eleita"
}
},
"rosana-valle-sp": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "SP",
"partido": "PL",
"resultado": "eleita"
}
},
"sirlange-manga-sp": {
"ocupacao": "Empresária",
"instrucao": "Superior completo",
"em2022": {
"cargo": "2ª suplente de senador",
"uf": "SP",
"partido": "PL",
"resultado": "eleita"
}
},
"samia-bomfim-sp": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "SP",
"partido": "PSOL",
"resultado": "eleita"
}
},
"sonia-guajajara-sp": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "SP",
"partido": "PSOL",
"resultado": "eleita"
}
},
"tabata-amaral-sp": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "SP",
"partido": "PSB",
"resultado": "eleita"
}
},
"professora-janad-valcari-to": {
"ocupacao": "Empresária",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "TO",
"partido": "PL",
"resultado": "eleita"
}
},
"cibele-moura-al": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "AL",
"partido": "MDB",
"resultado": "eleita"
}
},
"fatima-canuto-al": {
"ocupacao": "Advogada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "AL",
"partido": "MDB",
"resultado": "eleita"
}
},
"gabi-goncalves-al": {
"ocupacao": "Advogada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "AL",
"partido": "PP",
"resultado": "eleita"
}
},
"rose-davino-al": {
"ocupacao": "Empresária",
"instrucao": "Superior incompleto",
"em2022": {
"cargo": "deputada estadual",
"uf": "AL",
"partido": "PP",
"resultado": "eleita"
}
},
"teca-nelma-al": {
"ocupacao": "Outros",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "AL",
"partido": "PSD",
"resultado": "não eleita"
}
},
"debora-menezes-am": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "AM",
"partido": "PL",
"resultado": "eleita"
}
},
"mayra-dias-am": {
"ocupacao": "Jornalista e redatora",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "AM",
"partido": "AVANTE",
"resultado": "eleita"
}
},
"aldilene-souza-ap": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "AP",
"partido": "PDT",
"resultado": "eleita"
}
},
"aparecida-salomao-ap": {
"ocupacao": "Advogada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "AP",
"partido": "AVANTE",
"resultado": "não eleita"
}
},
"bia-pombo-ap": {
"ocupacao": "Assistente social",
"instrucao": "Superior completo",
"em2022": null
},
"kinovak-ap": {
"ocupacao": "Administradora",
"instrucao": "Superior completo",
"em2022": null
},
"socorro-nogueira-ap": {
"ocupacao": "Outros",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "AP",
"partido": "PT",
"resultado": "suplente"
}
},
"telma-nery-ap": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "AP",
"partido": "CIDADANIA",
"resultado": "eleita"
}
},
"andrea-castro-ba": {
"ocupacao": "Empresária",
"instrucao": "Superior completo",
"em2022": null
},
"cinthya-maraba-ba": {
"ocupacao": "Outros",
"instrucao": "Superior completo",
"em2022": null
},
"claudia-oliveira-ba": {
"ocupacao": "Empresária",
"instrucao": "Ensino médio completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "BA",
"partido": "PSD",
"resultado": "eleita"
}
},
"denise-menezes-ba": {
"ocupacao": "Administradora",
"instrucao": "Superior completo",
"em2022": null
},
"fatima-nunes-ba": {
"ocupacao": "Deputada",
"instrucao": "Ensino médio completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "BA",
"partido": "PT",
"resultado": "eleita"
}
},
"ivana-bastos-ba": {
"ocupacao": "Administradora",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "BA",
"partido": "PSD",
"resultado": "eleita"
}
},
"ludmilla-fiscina-ba": {
"ocupacao": "Professora",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "BA",
"partido": "PV",
"resultado": "eleita"
}
},
"neusa-cadore-ba": {
"ocupacao": "Deputada",
"instrucao": "Ensino médio completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "BA",
"partido": "PT",
"resultado": "suplente"
}
},
"rowenna-ba": {
"ocupacao": "Professora",
"instrucao": "Superior completo",
"em2022": null
},
"vilma-reis-ba": {
"ocupacao": "Professora",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "BA",
"partido": "PT",
"resultado": "suplente"
}
},
"bella-carmelo-ce": {
"ocupacao": "Vereadora",
"instrucao": "Superior incompleto",
"em2022": null
},
"dra-mayra-pinheiro-ce": {
"ocupacao": "Médica",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "CE",
"partido": "PL",
"resultado": "suplente"
}
},
"dra-silvana-ce": {
"ocupacao": "Médica",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "CE",
"partido": "PL",
"resultado": "eleita"
}
},
"emilia-pessoa-ce": {
"ocupacao": "Professora",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "CE",
"partido": "PSDB",
"resultado": "eleita"
}
},
"fabiola-carneiro-ce": {
"ocupacao": "Professora",
"instrucao": "Superior completo",
"em2022": null
},
"georgia-do-marcelao-ce": {
"ocupacao": "Professora",
"instrucao": "Superior completo",
"em2022": null
},
"jade-romero-ce": {
"ocupacao": "Outros",
"instrucao": "Superior completo",
"em2022": {
"cargo": "vice-governadora",
"uf": "CE",
"partido": "MDB",
"resultado": "eleita"
}
},
"jo-farias-ce": {
"ocupacao": "Outros",
"instrucao": "Ensino médio completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "CE",
"partido": "PT",
"resultado": "eleita"
}
},
"lais-nunes-ce": {
"ocupacao": "Administradora",
"instrucao": "Superior completo",
"em2022": null
},
"lia-gomes-ce": {
"ocupacao": "Médica",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "CE",
"partido": "PDT",
"resultado": "eleita"
}
},
"liziany-medeiros-ce": {
"ocupacao": "Professora",
"instrucao": "Superior completo",
"em2022": null
},
"manu-pimenta-ce": {
"ocupacao": "Odontóloga",
"instrucao": "Superior completo",
"em2022": null
},
"marta-goncalves-ce": {
"ocupacao": "Aposentada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "CE",
"partido": "PL",
"resultado": "eleita"
}
},
"paloma-nunes-ce": {
"ocupacao": "Odontóloga",
"instrucao": "Superior completo",
"em2022": null
},
"acucena-es": {
"ocupacao": "Enfermeira",
"instrucao": "Superior completo",
"em2022": null
},
"camila-valadao-es": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "ES",
"partido": "PSOL",
"resultado": "eleita"
}
},
"janete-de-sa-es": {
"ocupacao": "Enfermeira",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "ES",
"partido": "PSB",
"resultado": "eleita"
}
},
"jeesala-coutinho-es": {
"ocupacao": "Advogada",
"instrucao": "Superior completo",
"em2022": null
},
"karla-coser-es": {
"ocupacao": "Vereadora",
"instrucao": "Superior completo",
"em2022": null
},
"raquel-lessa-es": {
"ocupacao": "Outros",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "ES",
"partido": "PP",
"resultado": "eleita"
}
},
"bia-de-lima-go": {
"ocupacao": "Professora",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "GO",
"partido": "PT",
"resultado": "eleita"
}
},
"carol-do-amiltinho-go": {
"ocupacao": "Empresária",
"instrucao": "Superior completo",
"em2022": null
},
"graciele-da-arte-trigo-go": {
"ocupacao": "Empresária",
"instrucao": "Superior completo",
"em2022": null
},
"joscilene-do-mangao-go": {
"ocupacao": "Dona",
"instrucao": "Superior incompleto",
"em2022": null
},
"katia-go": {
"ocupacao": "Pedagoga",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "GO",
"partido": "PT",
"resultado": "suplente"
}
},
"abigail-cunha-ma": {
"ocupacao": "Empresária",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "MA",
"partido": "PL",
"resultado": "eleita"
}
},
"bruna-pessoa-ma": {
"ocupacao": "Advogada",
"instrucao": "Superior completo",
"em2022": null
},
"claudia-coutinho-ma": {
"ocupacao": "Enfermeira",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "MA",
"partido": "PDT",
"resultado": "eleita"
}
},
"cricielle-ma": {
"ocupacao": "Outros",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "MA",
"partido": "PT",
"resultado": "suplente"
}
},
"daniella-ma": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "MA",
"partido": "PSB",
"resultado": "eleita"
}
},
"detinha-ma": {
"ocupacao": "Assistente social",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "MA",
"partido": "PL",
"resultado": "eleita"
}
},
"luanna-ma": {
"ocupacao": "Médica",
"instrucao": "Superior completo",
"em2022": null
},
"maedja-campos-ma": {
"ocupacao": "Jornalista e redatora",
"instrucao": "Superior completo",
"em2022": null
},
"natalia-do-junior-garimpeiro-ma": {
"ocupacao": "Empresária",
"instrucao": "Superior incompleto",
"em2022": null
},
"paula-prata-ma": {
"ocupacao": "Servidor público municipal",
"instrucao": "Superior completo",
"em2022": null
},
"solange-almeida-ma": {
"ocupacao": "Empresária",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "MA",
"partido": "PL",
"resultado": "eleita"
}
},
"vanessa-marreca-ma": {
"ocupacao": "Fisioterapeuta e terapeuta ocupacional",
"instrucao": "Superior completo",
"em2022": null
},
"adriana-souza-mg": {
"ocupacao": "Vereadora",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "MG",
"partido": "PT",
"resultado": "suplente"
}
},
"ale-portela-mg": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "MG",
"partido": "PL",
"resultado": "eleita"
}
},
"amanda-teixeira-dias-mg": {
"ocupacao": "Deputada",
"instrucao": "Superior incompleto",
"em2022": {
"cargo": "deputada estadual",
"uf": "MG",
"partido": "PL",
"resultado": "suplente"
}
},
"ana-paula-siqueira-mg": {
"ocupacao": "Assistente social",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "MG",
"partido": "REDE",
"resultado": "eleita"
}
},
"andreia-de-jesus-mg": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "MG",
"partido": "PT",
"resultado": "eleita"
}
},
"beatriz-cerqueira-mg": {
"ocupacao": "Professora",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "MG",
"partido": "PT",
"resultado": "eleita"
}
},
"carol-caram-mg": {
"ocupacao": "Advogada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "MG",
"partido": "AVANTE",
"resultado": "suplente"
}
},
"chiara-biondini-mg": {
"ocupacao": "Deputada",
"instrucao": "Superior incompleto",
"em2022": {
"cargo": "deputada estadual",
"uf": "MG",
"partido": "PP",
"resultado": "eleita"
}
},
"delegada-sheila-mg": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "MG",
"partido": "PL",
"resultado": "eleita"
}
},
"dra-lais-santiago-mg": {
"ocupacao": "Médica",
"instrucao": "Superior completo",
"em2022": null
},
"flavia-borja-mg": {
"ocupacao": "Vereadora",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "MG",
"partido": "PP",
"resultado": "suplente"
}
},
"iza-lourenca-mg": {
"ocupacao": "Vereadora",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "MG",
"partido": "PSOL",
"resultado": "suplente"
}
},
"leninha-mg": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "MG",
"partido": "PT",
"resultado": "eleita"
}
},
"lud-falcao-mg": {
"ocupacao": "Advogada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "MG",
"partido": "PODE",
"resultado": "eleita"
}
},
"macae-evaristo-mg": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "MG",
"partido": "PT",
"resultado": "eleita"
}
},
"maria-clara-mg": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "MG",
"partido": "DC",
"resultado": "eleita"
}
},
"marilia-amaral-mg": {
"ocupacao": "Advogada",
"instrucao": "Superior completo",
"em2022": null
},
"marli-ribeiro-mg": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "MG",
"partido": "PSC",
"resultado": "eleita"
}
},
"nayara-rocha-mg": {
"ocupacao": "Advogada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "MG",
"partido": "PP",
"resultado": "eleita"
}
},
"roberta-lopes-mg": {
"ocupacao": "Vereadora",
"instrucao": "Superior incompleto",
"em2022": null
},
"gianni-nogueira-ms": {
"ocupacao": "Advogada",
"instrucao": "Superior completo",
"em2022": null
},
"professora-gleice-jane-ms": {
"ocupacao": "Professora",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "MS",
"partido": "PT",
"resultado": "suplente"
}
},
"alessandra-ferreira-mt": {
"ocupacao": "Empresária",
"instrucao": "Superior completo",
"em2022": null
},
"samantha-do-abilio-mt": {
"ocupacao": "Vereadora",
"instrucao": "Superior completo",
"em2022": null
},
"ana-cunha-pa": {
"ocupacao": "Médica",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "PA",
"partido": "PSDB",
"resultado": "eleita"
}
},
"andrea-dantas-pa": {
"ocupacao": "Empresária",
"instrucao": "Superior completo",
"em2022": null
},
"andreia-xarao-pa": {
"ocupacao": "Contadora",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "PA",
"partido": "MDB",
"resultado": "eleita"
}
},
"cilene-couto-pa": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "PA",
"partido": "PSDB",
"resultado": "eleita"
}
},
"lanuzia-cunha-pa": {
"ocupacao": "Psicóloga",
"instrucao": "Superior completo",
"em2022": null
},
"livia-duarte-pa": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "PA",
"partido": "PSOL",
"resultado": "eleita"
}
},
"maria-pa": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "PA",
"partido": "PT",
"resultado": "eleita"
}
},
"mariza-almeida-pa": {
"ocupacao": "Vereadora",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "PA",
"partido": "PL",
"resultado": "suplente"
}
},
"paula-titan-pa": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "PA",
"partido": "MDB",
"resultado": "eleita"
}
},
"renata-fonseca-pa": {
"ocupacao": "Servidor público estadual",
"instrucao": "Superior completo",
"em2022": {
"cargo": "senadora",
"uf": "PA",
"partido": "PRTB",
"resultado": "não eleita"
}
},
"tati-barra-pa": {
"ocupacao": "Médica",
"instrucao": "Superior completo",
"em2022": null
},
"camila-toscano-pb": {
"ocupacao": "Advogada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "PB",
"partido": "PSDB",
"resultado": "eleita"
}
},
"cida-ramos-pb": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "PB",
"partido": "PT",
"resultado": "eleita"
}
},
"danielle-do-vale-pb": {
"ocupacao": "Contadora",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "PB",
"partido": "REPUBLICANOS",
"resultado": "eleita"
}
},
"jo-oliveira-pb": {
"ocupacao": "Vereadora",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "PB",
"partido": "PC do B",
"resultado": "suplente"
}
},
"lorena-pb": {
"ocupacao": "Advogada",
"instrucao": "Superior completo",
"em2022": null
},
"maria-porto-pb": {
"ocupacao": "Advogada",
"instrucao": "Superior completo",
"em2022": null
},
"nil-mendes-pb": {
"ocupacao": "Empresária",
"instrucao": "Ensino médio incompleto",
"em2022": null
},
"olivia-motta-pb": {
"ocupacao": "Médica",
"instrucao": "Superior completo",
"em2022": null
},
"andrea-medeiros-pe": {
"ocupacao": "Outros",
"instrucao": "Superior completo",
"em2022": null
},
"dani-portela-pe": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "PE",
"partido": "PSOL",
"resultado": "eleita"
}
},
"debora-almeida-pe": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "PE",
"partido": "PSDB",
"resultado": "eleita"
}
},
"gleide-angelo-pe": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "PE",
"partido": "PSB",
"resultado": "eleita"
}
},
"lara-santana-pe": {
"ocupacao": "Engenheira",
"instrucao": "Superior completo",
"em2022": null
},
"maria-arraes-pe": {
"ocupacao": "Advogada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "PE",
"partido": "SOLIDARIEDADE",
"resultado": "eleita"
}
},
"professora-ivete-caetano-pe": {
"ocupacao": "Professora",
"instrucao": "Superior completo",
"em2022": null
},
"roberta-arraes-pe": {
"ocupacao": "Administradora",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "PE",
"partido": "PP",
"resultado": "suplente"
}
},
"ana-paula-pi": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "PI",
"partido": "MDB",
"resultado": "eleita"
}
},
"anyara-santos-pi": {
"ocupacao": "Odontóloga",
"instrucao": "Superior completo",
"em2022": null
},
"janainna-marques-pi": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "PI",
"partido": "PT",
"resultado": "eleita"
}
},
"simone-pereira-pi": {
"ocupacao": "Assistente social",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "PI",
"partido": "MDB",
"resultado": "suplente"
}
},
"delegada-tathiana-guzella-pr": {
"ocupacao": "Policial civil",
"instrucao": "Superior completo",
"em2022": null
},
"fabiana-parro-pr": {
"ocupacao": "Fonoaudióloga",
"instrucao": "Superior completo",
"em2022": null
},
"flavia-francischini-pr": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "PR",
"partido": "UNIÃO",
"resultado": "eleita"
}
},
"jessicao-pr": {
"ocupacao": "Vereadora",
"instrucao": "Ensino médio completo",
"em2022": {
"cargo": "deputada federal",
"uf": "PR",
"partido": "PP",
"resultado": "suplente"
}
},
"lu-bonatto-pr": {
"ocupacao": "Outros",
"instrucao": "Superior completo",
"em2022": null
},
"mabel-canto-pr": {
"ocupacao": "Advogada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "PR",
"partido": "PSDB",
"resultado": "eleita"
}
},
"maria-victoria-pr": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "PR",
"partido": "PP",
"resultado": "eleita"
}
},
"miss-preta-pr": {
"ocupacao": "Vereadora",
"instrucao": "Superior completo",
"em2022": null
},
"yasmin-hachem-pr": {
"ocupacao": "Vereadora",
"instrucao": "Superior completo",
"em2022": null
},
"ana-paula-mendes-rj": {
"ocupacao": "Jornalista e redatora",
"instrucao": "Superior completo",
"em2022": null
},
"carla-machado-rj": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "RJ",
"partido": "PT",
"resultado": "eleita"
}
},
"dani-balbi-rj": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "RJ",
"partido": "PC do B",
"resultado": "eleita"
}
},
"dani-monteiro-rj": {
"ocupacao": "Deputada",
"instrucao": "Superior incompleto",
"em2022": {
"cargo": "deputada estadual",
"uf": "RJ",
"partido": "PSOL",
"resultado": "eleita"
}
},
"dra-gabriela-rj": {
"ocupacao": "Médica",
"instrucao": "Superior completo",
"em2022": null
},
"elika-takimoto-rj": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "RJ",
"partido": "PT",
"resultado": "eleita"
}
},
"fernanda-neves-rj": {
"ocupacao": "Servidor público municipal",
"instrucao": "Superior completo",
"em2022": null
},
"giselle-monteiro-rj": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "RJ",
"partido": "PL",
"resultado": "eleita"
}
},
"joyce-trindade-rj": {
"ocupacao": "Vereadora",
"instrucao": "Superior completo",
"em2022": null
},
"luciana-boiteux-rj": {
"ocupacao": "Professora",
"instrucao": "Superior completo",
"em2022": null
},
"marina-do-mst-rj": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "RJ",
"partido": "PT",
"resultado": "eleita"
}
},
"renata-souza-rj": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "RJ",
"partido": "PSOL",
"resultado": "eleita"
}
},
"tia-ju-rj": {
"ocupacao": "Pedagoga",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "RJ",
"partido": "REPUBLICANOS",
"resultado": "eleita"
}
},
"veronica-lima-rj": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "RJ",
"partido": "PT",
"resultado": "eleita"
}
},
"zeidan-rj": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "RJ",
"partido": "PT",
"resultado": "eleita"
}
},
"india-armelau-rj": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "RJ",
"partido": "PL",
"resultado": "eleita"
}
},
"camila-araujo-rn": {
"ocupacao": "Outros",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "RN",
"partido": "UNIÃO",
"resultado": "suplente"
}
},
"cinthia-de-allyson-rn": {
"ocupacao": "Pedagoga",
"instrucao": "Superior completo",
"em2022": null
},
"cristiane-dantas-rn": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "RN",
"partido": "SOLIDARIEDADE",
"resultado": "eleita"
}
},
"divaneide-basilio-rn": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "RN",
"partido": "PT",
"resultado": "eleita"
}
},
"eudiane-macedo-rn": {
"ocupacao": "Deputada",
"instrucao": "Ensino médio completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "RN",
"partido": "PV",
"resultado": "eleita"
}
},
"isolda-dantas-rn": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "RN",
"partido": "PT",
"resultado": "eleita"
}
},
"kaline-de-dr-bernardo-rn": {
"ocupacao": "Advogada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "RN",
"partido": "MDB",
"resultado": "não eleita"
}
},
"claudia-de-jesus-ro": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "RO",
"partido": "PT",
"resultado": "eleita"
}
},
"dra-taissa-sousa-ro": {
"ocupacao": "Advogada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "RO",
"partido": "PSC",
"resultado": "eleita"
}
},
"fatima-cleide-ro": {
"ocupacao": "Servidor público federal",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "RO",
"partido": "PT",
"resultado": "não eleita"
}
},
"angela-aguida-portella-rr": {
"ocupacao": "Servidor público estadual",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "RR",
"partido": "PP",
"resultado": "eleita"
}
},
"aurelina-medeiros-rr": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "RR",
"partido": "PP",
"resultado": "eleita"
}
},
"catarina-guerra-rr": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "RR",
"partido": "UNIÃO",
"resultado": "eleita"
}
},
"darbi-de-jesus-rr": {
"ocupacao": "Outros",
"instrucao": "Superior completo",
"em2022": null
},
"joilma-teodora-rr": {
"ocupacao": "Deputada",
"instrucao": "Ensino médio completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "RR",
"partido": "PODE",
"resultado": "eleita"
}
},
"tayla-peres-rr": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "RR",
"partido": "REPUBLICANOS",
"resultado": "eleita"
}
},
"tenente-roney-rr": {
"ocupacao": "Policial militar",
"instrucao": "Superior completo",
"em2022": null
},
"adri-cherini-rs": {
"ocupacao": "Relações-públicas",
"instrucao": "Superior completo",
"em2022": null
},
"adriana-lara-rs": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "RS",
"partido": "PL",
"resultado": "eleita"
}
},
"ali-klemt-rs": {
"ocupacao": "Empresária",
"instrucao": "Superior completo",
"em2022": null
},
"bruna-molz-rs": {
"ocupacao": "Vereadora",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "RS",
"partido": "REPUBLICANOS",
"resultado": "suplente"
}
},
"comandante-nadia-rs": {
"ocupacao": "Vereadora",
"instrucao": "Superior completo",
"em2022": {
"cargo": "senadora",
"uf": "RS",
"partido": "PP",
"resultado": "não eleita"
}
},
"daiane-mello-rs": {
"ocupacao": "Relações-públicas",
"instrucao": "Superior completo",
"em2022": null
},
"delegada-ana-tarouco-rs": {
"ocupacao": "Servidor público estadual",
"instrucao": "Superior completo",
"em2022": null
},
"delegada-nadine-rs": {
"ocupacao": "Policial civil",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "RS",
"partido": "PSDB",
"resultado": "eleita"
}
},
"karen-santos-rs": {
"ocupacao": "Vereadora",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "RS",
"partido": "PSOL",
"resultado": "suplente"
}
},
"kelly-moraes-rs": {
"ocupacao": "Deputada",
"instrucao": "Ensino médio completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "RS",
"partido": "PL",
"resultado": "eleita"
}
},
"luciana-genro-rs": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "RS",
"partido": "PSOL",
"resultado": "eleita"
}
},
"natasha-rs": {
"ocupacao": "Vereadora",
"instrucao": "Ensino médio completo",
"em2022": {
"cargo": "deputada federal",
"uf": "RS",
"partido": "PSOL",
"resultado": "suplente"
}
},
"nicole-weber-covatti-rs": {
"ocupacao": "Vereadora",
"instrucao": "Superior completo",
"em2022": null
},
"ronize-damassini-rs": {
"ocupacao": "Advogada",
"instrucao": "Superior completo",
"em2022": null
},
"sofia-cavedon-rs": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "RS",
"partido": "PT",
"resultado": "eleita"
}
},
"vanice-de-matos-rs": {
"ocupacao": "Servidor público municipal",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "RS",
"partido": "MDB",
"resultado": "suplente"
}
},
"ana-campagnolo-sc": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "SC",
"partido": "PL",
"resultado": "eleita"
}
},
"anna-carolina-sc": {
"ocupacao": "Advogada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "SC",
"partido": "PSDB",
"resultado": "suplente"
}
},
"chica-do-eskudlark-sc": {
"ocupacao": "Empresária",
"instrucao": "Ensino médio completo",
"em2022": null
},
"juliana-maciel-sc": {
"ocupacao": "Advogada",
"instrucao": "Superior completo",
"em2022": null
},
"luciane-carminatti-sc": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "SC",
"partido": "PT",
"resultado": "eleita"
}
},
"ana-luiza-se": {
"ocupacao": "Advogada",
"instrucao": "Superior completo",
"em2022": null
},
"dra-lidiane-lucena-se": {
"ocupacao": "Médica",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "SE",
"partido": "REPUBLICANOS",
"resultado": "eleita"
}
},
"kitty-lima-se": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "SE",
"partido": "CIDADANIA",
"resultado": "suplente"
}
},
"maisa-mitidieri-se": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "SE",
"partido": "PSD",
"resultado": "eleita"
}
},
"ana-carolina-serra-sp": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "SP",
"partido": "CIDADANIA",
"resultado": "eleita"
}
},
"ana-perugini-sp": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "SP",
"partido": "PT",
"resultado": "eleita"
}
},
"analice-fernandes-sp": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "SP",
"partido": "PSDB",
"resultado": "eleita"
}
},
"bruna-furlan-sp": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "SP",
"partido": "PSDB",
"resultado": "eleita"
}
},
"camila-godoi-sp": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "SP",
"partido": "PSB",
"resultado": "eleita"
}
},
"carla-morando-sp": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "SP",
"partido": "PSDB",
"resultado": "eleita"
}
},
"dani-alonso-sp": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "SP",
"partido": "PL",
"resultado": "eleita"
}
},
"delegada-graciela-sp": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "SP",
"partido": "PL",
"resultado": "eleita"
}
},
"duda-hidalgo-sp": {
"ocupacao": "Advogada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "SP",
"partido": "PT",
"resultado": "suplente"
}
},
"debora-camilo-sp": {
"ocupacao": "Vereadora",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "SP",
"partido": "PSOL",
"resultado": "suplente"
}
},
"ediane-maria-sp": {
"ocupacao": "Deputada",
"instrucao": "Ensino médio completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "SP",
"partido": "PSOL",
"resultado": "eleita"
}
},
"eduarda-campopiano-sp": {
"ocupacao": "Vereadora",
"instrucao": "Ensino médio completo",
"em2022": null
},
"ely-santos-sp": {
"ocupacao": "Outros",
"instrucao": "Ensino médio completo",
"em2022": {
"cargo": "deputada federal",
"uf": "SP",
"partido": "REPUBLICANOS",
"resultado": "suplente"
}
},
"fabiana-bolsonaro-sp": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "SP",
"partido": "PL",
"resultado": "eleita"
}
},
"keit-lima-sp": {
"ocupacao": "Vereadora",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "SP",
"partido": "PSOL",
"resultado": "suplente"
}
},
"leticia-aguiar-sp": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "SP",
"partido": "PP",
"resultado": "eleita"
}
},
"luiza-erundina-sp": {
"ocupacao": "Assistente social",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "SP",
"partido": "PSOL",
"resultado": "eleita"
}
},
"mariana-conti-sp": {
"ocupacao": "Vereadora",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "SP",
"partido": "PSOL",
"resultado": "suplente"
}
},
"marina-bragante-sp": {
"ocupacao": "Psicóloga",
"instrucao": "Superior completo",
"em2022": null
},
"marta-costa-sp": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "SP",
"partido": "PSD",
"resultado": "eleita"
}
},
"monica-das-pretas-sp": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "SP",
"partido": "PSOL",
"resultado": "eleita"
}
},
"paula-da-bancada-feminista-sp": {
"ocupacao": "Advogada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "SP",
"partido": "PSOL",
"resultado": "eleita"
}
},
"professora-bebel-sp": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "SP",
"partido": "PT",
"resultado": "eleita"
}
},
"regina-nunes-sp": {
"ocupacao": "Dona",
"instrucao": "Superior completo",
"em2022": null
},
"renata-sene-sp": {
"ocupacao": "Assistente social",
"instrucao": "Superior completo",
"em2022": null
},
"sofia-favero-sp": {
"ocupacao": "Psicóloga",
"instrucao": "Superior completo",
"em2022": null
},
"solange-freitas-sp": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "SP",
"partido": "UNIÃO",
"resultado": "eleita"
}
},
"thainara-faria-sp": {
"ocupacao": "Deputada",
"instrucao": "Superior incompleto",
"em2022": {
"cargo": "deputada estadual",
"uf": "SP",
"partido": "PT",
"resultado": "eleita"
}
},
"claudia-lelis-to": {
"ocupacao": "Publicitária",
"instrucao": "Superior incompleto",
"em2022": {
"cargo": "deputada estadual",
"uf": "TO",
"partido": "PV",
"resultado": "eleita"
}
},
"katia-chaves-to": {
"ocupacao": "Administradora",
"instrucao": "Superior completo",
"em2022": null
},
"vanda-monteiro-to": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada estadual",
"uf": "TO",
"partido": "UNIÃO",
"resultado": "eleita"
}
},
"dayse-amarilio-df": {
"ocupacao": "Enfermeira",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada distrital",
"uf": "DF",
"partido": "PSB",
"resultado": "eleita"
}
},
"estefane-sampaio-df": {
"ocupacao": "Outros",
"instrucao": "Superior completo",
"em2022": null
},
"jaqueline-silva-df": {
"ocupacao": "Comerciante",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada distrital",
"uf": "DF",
"partido": "AGIR",
"resultado": "eleita"
}
},
"keka-bagno-df": {
"ocupacao": "Assistente social",
"instrucao": "Superior completo",
"em2022": {
"cargo": "governadora",
"uf": "DF",
"partido": "PSOL",
"resultado": "não eleita"
}
},
"renata-daguiar-df": {
"ocupacao": "Servidor público federal",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada distrital",
"uf": "DF",
"partido": "PMN",
"resultado": "suplente"
}
},
"mara-rocha-ac": {
"ocupacao": "Jornalista e redatora",
"instrucao": "Superior completo",
"em2022": {
"cargo": "governadora",
"uf": "AC",
"partido": "MDB",
"resultado": "não eleita"
}
},
"marina-jhc-al": {
"ocupacao": "Empresária",
"instrucao": "Superior completo",
"em2022": null
},
"rayssa-furlan-ap": {
"ocupacao": "Médica",
"instrucao": "Superior completo",
"em2022": {
"cargo": "senadora",
"uf": "AP",
"partido": "MDB",
"resultado": "não eleita"
}
},
"luizianne-ce": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "CE",
"partido": "PT",
"resultado": "eleita"
}
},
"bia-kicis-df": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "DF",
"partido": "PL",
"resultado": "eleita"
}
},
"michelle-bolsonaro-df": {
"ocupacao": "Empresária",
"instrucao": "Superior incompleto",
"em2022": null
},
"gracinha-caiado-go": {
"ocupacao": "Advogada",
"instrucao": "Superior completo",
"em2022": null
},
"marilia-campos-mg": {
"ocupacao": "Aposentada",
"instrucao": "Superior completo",
"em2022": null
},
"marilia-arraes-pe": {
"ocupacao": "Advogada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "governadora",
"uf": "PE",
"partido": "SOLIDARIEDADE",
"resultado": "não eleita"
}
},
"samanda-de-lula-rn": {
"ocupacao": "Vereadora",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "RN",
"partido": "PT",
"resultado": "suplente"
}
},
"teresa-surita-rr": {
"ocupacao": "Publicitária",
"instrucao": "Superior completo",
"em2022": {
"cargo": "governadora",
"uf": "RR",
"partido": "MDB",
"resultado": "não eleita"
}
},
"carol-de-toni-sc": {
"ocupacao": "Deputada",
"instrucao": "Superior completo",
"em2022": {
"cargo": "deputada federal",
"uf": "SC",
"partido": "PL",
"resultado": "eleita"
}
},
"mailza-assis-ac": {
"ocupacao": "Governadora",
"instrucao": "Superior completo",
"em2022": {
"cargo": "vice-governadora",
"uf": "AC",
"partido": "PP",
"resultado": "eleita"
}
},
"celina-leao-df": {
"ocupacao": "Governadora",
"instrucao": "Superior completo",
"em2022": {
"cargo": "vice-governadora",
"uf": "DF",
"partido": "PP",
"resultado": "eleita"
}
},
"raquel-lyra-pe": {
"ocupacao": "Governadora",
"instrucao": "Superior completo",
"em2022": {
"cargo": "governadora",
"uf": "PE",
"partido": "PSDB",
"resultado": "eleita"
}
}
};
