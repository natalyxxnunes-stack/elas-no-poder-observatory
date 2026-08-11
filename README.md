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
