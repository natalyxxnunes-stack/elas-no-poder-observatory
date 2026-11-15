# Quem são elas? — fotografia, documentos e limites de uso de composições vetoriais

**Data:** 15/11/2026 · **Situação:** registro de continuidade editorial e prévia do PR #6, não publicado.

## Decisão editorial preservada

A composição fotográfica da **homepage, em `CapaEditorialV3.tsx`, está aprovada** e não deve ser redesenhada nesta etapa. Fotografias e documentos reais são estruturantes da linguagem jornalística. **SVGs editoriais não podem virar um template repetido para todos os assuntos.** A escolha da forma acompanha a evidência da pauta.

Três tratamentos possíveis, com funções distintas:

1. **Fotografia documental:** registro verificável de acontecimentos, pessoas e instituições; legenda informativa, crédito, origem, contexto e direitos.
2. **Documento real ou índice documental:** lei, registro eleitoral, voto nominal, diário parlamentar, prestação de contas ou ficha de fonte, com link e indicação precisa de quando se trata apenas de uma transcrição ou referência bibliográfica. Sem fabricar imagens que pareçam um documento original.
3. **Gráfico ou composição vetorial:** representar relações, processos e dados que não ganham clareza com fotografias; evitar iconografia automática, módulos genéricos e repetição de uma mesma peça em várias páginas. Gráficos trazem fontes, universo, denominador e corte temporal.

## Inventário das fotografias registradas no código

Registro em `src/data/fotos.ts`. **A classificação em código não substitui a conferência de licenças e de direitos na fonte original.**

| ID | Assunto e uso potencial | Crédito registrado | Direitos no código | Situação editorial |
|---|---|---|---|---|
| `plenario-igualdade-salarial-2023` | Homepage aprovada; reportagem sobre votações | Bruno Spada / Câmara | CC-BY | **Preservar na capa**, com legenda que informa que a foto não documenta as seis votações |
| `plenario-camara-junho-2026` | Instituições e processo legislativo | Thiago Cristino / Câmara | CC-BY | Disponível; usar apenas quando for pertinente ao evento retratado |
| `bancada-feminina-camara-marco-2026` | Bancada feminina / participação institucional | Vinicius Loures / Câmara | CC-BY | Disponível; não atribuir presença/adesão a pautas sem identificação |
| `bertha-lutz-1927` | Perfis históricos e Memória; usada em Temas e na capa | Arquivo Nacional | Domínio público | Disponível; não usá-la como ilustração universal de todas as mulheres na política |
| `pagu` | Perfil histórico de Patrícia Galvão | Autoria desconhecida / Commons | **Verificação pendente** | Manter pendência de procedência/termos; legenda agora declara explicitamente a incerteza na branch de revisão |

## Intervenção pontual realizada no PR #6

**Índice de Reportagens**: o cartão de `Na voz delas` repetia o mesmo SVG de microfone da homepage. Foi substituído, **apenas na branch de revisão**, por um índice textual de três referências reais extraídas exclusivamente dos registros com `publicar: true` em `src/data/falas.ts`. Cada entrada informa pessoa, data e referência do Diário da Câmara. A legenda explica que **não é uma reprodução fotográfica do documento**. O cartão da investigação `Como votaram` continua usando a fotografia existente do plenário.

O componente SVG original continua preservado na homepage. Nenhuma nova imagem foi criada; nenhuma fotografia foi importada sem direitos conferidos.

**Pioneiras / Pagu:** retificada, somente na prévia, a ressalva sobre direitos autorais do retrato. Ainda exige verificação documental.

## Lacunas que não devem ser preenchidas com ilustrações genéricas

| Página/família | Melhor recurso | Pendência |
|---|---|---|
| `/eleitas/` e fichas | Cartografia eleitoral, tabelas de exploração e retratos oficiais **somente com licença e identidade verificadas** | Não existe foto registrada de cada eleita na biblioteca local; não criar galeria de retratos artificiais |
| `/metodo/` | Conta aberta, esquema de tratamento da base e arquivos com hash e link | O diagrama deve explicar um procedimento real; não simular documentos do TSE |
| `/reportagens/` e `/na-voz-delas/` | Fotografias pertinentes e referências documentais do Diário da Câmara | Não usar a mesma ilustração em todas as matérias |
| `/pioneiras/` e perfis | Retratos históricos, arquivo eleitoral, fotografia de acervo | Confirmar licenças e custódia, especialmente Pagu e Lélia Gonzalez |
| `/direitos/` | Texto legal e decisões primárias; linha do tempo | `Facsimile.tsx` é **reprodução tipográfica**, não fotografia do documento. Manter o aviso explícito |
| `/dados/`, `/downloads/`, `/comparar/` | Tabela, visualização de resultado e arquivos reais | Não forçar fotografia para seções que funcionam como ferramenta |

### Pista de apuração para Lélia Gonzalez

- [Memória Feminista Antirracista / REDEH — acervo Lélia Gonzalez](https://memoriafeminista.com.br/lelia-gonzalez-acervo-textual/acervo-lelia-gonzalez/): há registros de fotografias do acervo; acesso público **não é sinônimo de autorização de reprodução**.
- [Itaú Cultural — retrato de Lélia Gonzalez](https://www.itaucultural.org.br/secoes/series/lelia-gonzalez-um-simbolo-da-luta-feminista-e-antirracista-brasileira): imagem contextualizada no acervo, sem licença de reutilização confirmada nesta revisão.
- [Capire — fotografias de Lélia](https://capiremov.org/en/analysis/lelia-gonzalez-a-brazilian-thinker/): imagens publicadas em reportagem. **Não reutilizar sem confirmar titularidade e permissão**.

Esses endereços são caminhos de pesquisa, não fontes de imagens autorizadas para publicação.

## Validação / limites

Alterações no PR #6 preservam a capa e os dados; adicionar verificação do índice documental no teste automatizado. Conferir apresentação em navegador desktop/celular e acessibilidade antes de merge. A atualização da branch **não** publica na HostGator nem altera a `main`.

## Segunda rodada — Direitos e Pioneiras (prévia no PR #6)

- **Direitos**: 13 marcos permanecem íntegros. A linha do tempo foi transformada de uma sequência uniforme de cartões em uma cronologia tipográfica, com índice de saltos e links para as fontes primárias já cadastradas. Os **dois marcos de 2024** ganharam identificadores independentes; o uso de `key={m.year}` era duplicado e foi corrigido. Sem imagens fabricadas de leis ou decisões.
- **Pioneiras**: inventário recolhível com os três arquivos TSE usados nas recontagens de Pagu e Lélia Gonzalez: São Paulo 1950, Rio de Janeiro 1982 e 1986. Nomes dos arquivos e seus SHA-256 vêm exclusivamente de `src/data/perfis-pioneiras.ts`. São metadados de arquivos oficiais, não fac-símiles. Não se adicionaram fotografias sem direitos autorizados.
- **Dados**: a rota foi examinada, mas sua grade de consultas **não foi redesenhada** nesta rodada; qualquer mudança substancial de composição precisa ser comparada à identidade aprovada.
- **Validação prevista:** verificar em navegador a unicidade das 13 âncoras, os dois registros de 2024 e a abertura do inventário documental. Os testes constam do workflow da branch, mas sua execução ainda depende de confirmação.
- Todas as mudanças seguem isoladas na branch de revisão. Homepage, fotos e paleta continuam protegidas, sem merge ou publicação.

## Terceira rodada — Dados como instrumento de consulta

**Arquivo de interface:** `src/routes/dados.tsx`. Na versão publicada, as seis áreas apareciam em cartões uniformes e as sete ferramentas gerais vinham ao final. O conjunto dificulta identificar o primeiro caminho de exploração.

**Prévia no PR #6:** mantém a apresentação tipográfica adulta e o repertório da capa sem replicar seu cabeçalho fotográfico. O novo percurso abre com três questões práticas, ligadas diretamente às ferramentas existentes: candidaturas (`/quem-sao-elas`), eleitas (`/eleitas`) e comparador (`/comparar`). Depois, os seis temas são listados como índice editorial de linhas e seus links de consulta são preservados, a partir de `TEMAS`. Os demais serviços continuam acessíveis em uma seção de verificação e reuso.

**Restrições respeitadas:** sem gráficos inventados, indicadores numéricos decorativos, cartões ilustrativos ou novas fotografias apenas para preencher o espaço; sem novas cores, sem alterar a homepage, marca ou dados. É uma intervenção de hierarquia, não uma nova direção de arte.

**Antes da aprovação:** executar o workflow de QA e conferir capturas em desktop e celular, inclusive links, contraste, tabulação e legibilidade dos temas longos. O teste automatizado da rota /dados/ foi incluído, mas sua aprovação ainda não foi observada.

## Quarta rodada — Sobre, Investigações e transparência editorial

**Sobre (`src/routes/sobre.tsx`):** mantidos a apresentação em primeira pessoa, a autoria, as afirmações sobre independência e todo o texto dos seis compromissos. Os seis compromissos deixaram de ser cartões repetidos e passaram a constituir uma lista tipográfica. A ficha do projeto passou a ser seguida de três ligações diretas: `/metodo#dicionario`, `/metodo#correcoes` e `/downloads`. Foram preservados os meios de contato e correção.

**Investigações (`src/routes/investigacoes.tsx` e `src/components/editorial/InvestigationIndex.tsx`):** a sequência de cartões foi substituída por um índice editorial de linhas. Cada frente continua mostrando nome, pergunta, estado editorial e nota de andamento. Foi retirada a numeração puramente decorativa. A introdução esclarece a diferença entre conteúdo publicado e apuração concluída e oferece links ao Método e às correções.

**Dois problemas de consistência identificados no catálogo `src/data/architecture.ts`:**
- `dinheiro.statusNote` ainda apontava para uma fotografia financeira de **04/11/2026**, enquanto `src/data/tse-finance-snapshot.ts` já adota a base de **15/11/2026**. No componente de apresentação, o status agora lê a data de `FINANCE_BASE_LABEL` e declara que as contas podem receber complementações, retificações e julgamento.
- `sobre.statusNote` dizia “Princípios, equipe e compromissos editoriais”, formulação incompatível com a apresentação do observatório como projeto de autoria individual. O índice exibe “Autoria, princípios e compromissos editoriais”.

O arquivo `architecture.ts` não foi alterado, pois integra a camada `src/data` protegida no QA desta rodada. **Pendência de manutenção:** reconciliar futuramente essas duas notas na camada de metadados, sem mudar os números nem reabrir a identidade aprovada.

**Validação registrada:** a execução [GitHub Actions #43758237880](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43758237880) terminou com sucesso (build, verificação numérica, TypeScript, 21 rotas em desktop e celular, verificações funcionais e captação de imagens da primeira dobra). As imagens foram examinadas para a homepage, Sobre e Investigações. A aprovação do QA não substitui testes de acessibilidade aprofundados, revisão de conteúdo integral ou inspeção visual de todas as alturas de página.

Nenhuma imagem sintética, fotografia não licenciada, cor nova ou mudança da homepage foi introduzida. O conjunto continua em rascunho no PR #6; sem publicação.
