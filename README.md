# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS

## Dicionário de dados do TSE (Bloco 4)

Fonte de verdade: <https://dadosabertos.tse.jus.br/dataset/candidatos-2026>
(conjunto "Candidatos - 2026", atualização diária declarada pelo TSE).

O dicionário versionado vive em `src/lib/tse/data-dictionary.ts`
(`DICTIONARY_VERSION`, `INSPECTED_AT`). Todos os campos abaixo foram lidos do
**cabeçalho real** dos arquivos `.csv` publicados — nenhum nome de coluna foi
suposto.

**CONFIRMADOS — recurso `Candidatos`** (`consulta_cand_2026.zip`, ISO-8859-1, `;`):
`SQ_CANDIDATO` (chave da candidatura), `DS_CARGO`, `CD_CARGO`, `DS_GENERO`,
`CD_GENERO`, `DS_COR_RACA`, `CD_COR_RACA`, `SG_UF`, `SG_UE`, `NM_UE`,
`SG_PARTIDO`, `NM_PARTIDO`, `NR_PARTIDO`, `TP_AGREMIACAO`, `SG_FEDERACAO`,
`NM_FEDERACAO`, `DS_COMPOSICAO_FEDERACAO`, `SQ_COLIGACAO`, `NM_COLIGACAO`,
`DS_COMPOSICAO_COLIGACAO`, `DS_SITUACAO_CANDIDATURA`, `DS_SIT_TOT_TURNO`,
`DT_GERACAO`, `HH_GERACAO`.

**CONFIRMADOS — outros recursos** (relacionados, ainda não ingeridos):
`Candidatos - Informações complementares` (por `SQ_CANDIDATO`):
`DS_DETALHE_SITUACAO_CAND`, `DS_SITUACAO_JULGAMENTO`, `ST_QUILOMBOLA`,
`DS_ETNIA_INDIGENA`, `DS_GENERO_FEFC`, `DS_COR_RACA_FEFC`,
`VR_DESPESA_MAX_CAMPANHA`. `Vagas` (por `SG_UE` + `CD_CARGO`): `QT_VAGA`.
`Coligações` (por `SQ_COLIGACAO`): `DS_SITUACAO` e composição.

**NÃO CONFIRMADOS/NÃO DISPONÍVEIS no arquivo público 2026:**
identidade de gênero (existe só `DS_GENERO` binário e `NM_SOCIAL_CANDIDATO`,
que é nome social e não identidade — nada é inferido); deficiência e tipo de
deficiência; município da candidatura (em eleição geral a unidade eleitoral é a
UF ou BR); votos e eleitas (`DS_SIT_TOT_TURNO` vem `#NULO` antes da apuração);
recursos financeiros efetivamente recebidos; campos do recurso
`Bens de candidatos` (não inspecionado).

**Garantias do processamento**
- `DS_SITUACAO_CANDIDATURA` aparece integralmente como `#NE` na fotografia
  inspecionada e por isso **não** é usada como filtro; a distribuição é gravada.
- Cor/raça permanece nas categorias originais (`BRANCA`, `PARDA`, `PRETA`,
  `INDÍGENA`, `AMARELA`). `preta + parda = negra` é transformação analítica
  declarada, nunca substituição.
- Numeradores, denominadores e filtros dos indicadores atuais não mudaram; as
  novas dimensões (UF, partido, agremiação) são contagens brutas, sem indicador
  derivado.
- `auditHeader()` compara o cabeçalho real com o dicionário: coluna estrutural
  ausente **bloqueia** a publicação do snapshot; coluna nova ou removida é
  registrada como anomalia para revisão do dicionário.
- Cada fotografia grava data de geração informada pelo TSE, data da coleta e
  `processing_version` com a versão do dicionário.

## Dicionário histórico — Candidatos 2014, 2018, 2022 e 2026 (Bloco 5)

Arquivo: `src/lib/tse/historical-data-dictionary.ts`
Versão: `2026.08.11-b5.0` · Inspeção dos cabeçalhos reais: `2026-08-11`

**Fontes oficiais consultadas** (CDN/dados abertos do TSE, sem intermediários)
- Datasets: `dadosabertos.tse.jus.br/dataset/candidatos-2014`, `-2018`, `-2022`, `-2026`
- Candidatos: `cdn.tse.jus.br/estatistica/sead/odsele/consulta_cand/consulta_cand_<ano>.zip`
- Informações complementares: `.../consulta_cand_complementar/consulta_cand_complementar_<ano>.zip` (2014, 2018, 2022)
- Coligações: `.../consulta_coligacao/consulta_coligacao_2022.zip`
- Vagas: `.../consulta_vagas/consulta_vagas_2022.zip`

**Resultado central da inspeção**
Os **50 campos** do recurso Candidatos são **idênticos** em 2014, 2018, 2022 e
2026 — o TSE republicou as séries antigas no layout atual, inclusive as colunas
de federação. Cabeçalho igual **não** significa dado comparável.

**Confirmados nos quatro anos (Candidatos)**
`DT_GERACAO`, `HH_GERACAO`, `ANO_ELEICAO`, `CD_TIPO_ELEICAO`, `NM_TIPO_ELEICAO`,
`NR_TURNO`, `CD_ELEICAO`, `DS_ELEICAO`, `DT_ELEICAO`, `TP_ABRANGENCIA`, `SG_UF`,
`SG_UE`, `NM_UE`, `CD_CARGO`, `DS_CARGO`, `SQ_CANDIDATO`, `NR_CANDIDATO`,
`NM_CANDIDATO`, `NM_URNA_CANDIDATO`, `NM_SOCIAL_CANDIDATO`, `NR_CPF_CANDIDATO`,
`DS_EMAIL`, `CD_SITUACAO_CANDIDATURA`, `DS_SITUACAO_CANDIDATURA`,
`TP_AGREMIACAO`, `NR_PARTIDO`, `SG_PARTIDO`, `NM_PARTIDO`, `NR_FEDERACAO`,
`NM_FEDERACAO`, `SG_FEDERACAO`, `DS_COMPOSICAO_FEDERACAO`, `SQ_COLIGACAO`,
`NM_COLIGACAO`, `DS_COMPOSICAO_COLIGACAO`, `SG_UF_NASCIMENTO`, `DT_NASCIMENTO`,
`NR_TITULO_ELEITORAL_CANDIDATO`, `CD_GENERO`, `DS_GENERO`, `CD_GRAU_INSTRUCAO`,
`DS_GRAU_INSTRUCAO`, `CD_ESTADO_CIVIL`, `DS_ESTADO_CIVIL`, `CD_COR_RACA`,
`DS_COR_RACA`, `CD_OCUPACAO`, `DS_OCUPACAO`, `CD_SIT_TOT_TURNO`,
`DS_SIT_TOT_TURNO`.

**Em outro recurso (exigem junção `CD_ELEICAO` + `SQ_CANDIDATO`)**
`CD_DETALHE_SITUACAO_CAND`, `DS_DETALHE_SITUACAO_CAND`, `ST_REELEICAO`,
`ST_QUILOMBOLA`, `CD_ETNIA_INDIGENA`, `DS_ETNIA_INDIGENA` — confirmados em 2014,
2018 e 2022. Os campos FEFC (`CD_GENERO_FEFC`, `DS_GENERO_FEFC`,
`CD_COR_RACA_FEFC`, `DS_COR_RACA_FEFC`) existem **apenas de 2022 em diante**.

**Não confirmados em nenhum ano**
Identidade de gênero (trans/travesti/não binária) e deficiência/tipo de
deficiência. `DS_GENERO` é binário e `NM_SOCIAL_CANDIDATO` não é proxy válido.

**Comparabilidade — resumo**
- COMPARÁVEL: ano, tipo de eleição, território (`SG_UF`, `SG_UE`, `NM_UE`),
  cargo (`CD_CARGO`/`DS_CARGO`, códigos estáveis 1–10), gênero, datas de geração.
- COMPARÁVEL COM RESSALVA: cor/raça (série começa em 2014; `NÃO INFORMADO`
  aparece em 2022), situação da candidatura (2026 em curso, valor `#NE`),
  resultado do turno (agregação de `ELEITO`+`POR QP`+`POR MÉDIA`; token de nulo
  muda de `#NULO#` para `#NULO`), `SQ_CANDIDATO` (único no ano, não entre anos),
  partido (fusões e mudanças de sigla).
- NÃO COMPARÁVEL: `TP_AGREMIACAO`, `SQ_COLIGACAO`, `NM_COLIGACAO` (EC 97/2017
  vedou coligação proporcional a partir de 2020), `NR_CANDIDATO`.
- AUSENTE na prática: federação antes de 2022 (coluna presente, conteúdo nulo).

**Limitações que impedem séries**
Candidatas × eleitas não inclui 2026 (pleito não realizado). Financiamento por
gênero/raça e recortes por federação não recuam além de 2022. Não há chave de
pessoa estável entre anos: a unidade de análise é a **candidatura**
(`ANO_ELEICAO` + `CD_ELEICAO` + `SQ_CANDIDATO`), deduplicada por
`SQ_CANDIDATO` dentro do ano e filtrada por turno.

Nenhum indicador, filtro, rota, texto ou visual de 2026 foi alterado nesta
rodada — o Bloco 5 aqui é dicionário e matriz de comparabilidade.

## Auditoria dos denominadores (2014 · 2018 · 2022 · 2026)

`docs/auditoria-denominadores.md` traz a tabela completa: por ano e universo,
filtro aplicado, linhas brutas, linhas após deduplicação, número exibido e a
explicação de cada diferença.

Três pontos estruturais que ficam registrados aqui:

- **os pacotes do TSE repetem todas as linhas das UFs no arquivo `..._BRASIL`**,
  então as linhas brutas são ~2× as candidaturas. A deduplicação pela chave da
  candidatura é obrigatória, não opcional;
- **candidaturas e eleitos são universos diferentes**, assim como proporcional e
  majoritário, e 2026 (base em curso) e os anos fechados. Nada é somado entre
  universos para "fechar" um total;
- **eleitos são contados apenas no 1º turno**: quem venceu no 2º turno não entra
  no total de eleitos majoritários. Identificado e documentado, ainda não
  corrigido.
