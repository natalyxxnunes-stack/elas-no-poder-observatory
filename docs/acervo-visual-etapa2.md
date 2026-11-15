# Quem são elas? — Acervo visual, etapa 2 (curadoria e pertinência)
**Data da revisão:** 15/11/2026 · **Ambiente:** `redesign-editorial-v3-teste` · **Situação:** testes editoriais, nenhuma publicação.

## O problema visual identificado
A alternância de lilás/branco e o reaproveitamento das mesmas imagens em várias páginas acabavam produzindo uma experiência uniforme, apesar de cada editoria ter uma função diferente. A intervenção busca contraste com **tinta, roxo estrutural, coral do dado eleitoral, creme quente e molduras de arte autoral**, sem fazer blocos coloridos aleatórios nem mudar as cores semânticas dos gráficos.

## Matriz de pertinência e uso (ativos já obtidos)

| ID | Original e procedência | Direito ou condição identificada | Destino na branch de teste | Decisão |
| --- | --- | --- | --- | --- |
| FOTO-PAGU-1920 | `public/fotos/pagu-patricia-galvao-anos-1920.jpg` · [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Patricia_Galvao.jpg) · SHA-1 conferido no download: `987e30e5335b45c9789060efb98d4ccaa01f230a` | Ficha Commons marca como domínio público; fotógrafo desconhecido e origem declarada como *Depois da Cena*, *A Tribuna*, março de 2008. **Data exata e primeira divulgação do retrato não verificadas.** | Perfil `/pioneiras/pagu`, retrato em abertura escura, com crédito e link. | **Incorporado apenas no teste, direitos sujeitos a conferência editorial/jurídica antes da publicação.** Não extrapolar a licença do Commons para fotografias semelhantes em veículos. |
| FOTO-BERTHA-1927 | `public/fotos/bertha-lutz-1927.jpg` · [Arquivo Nacional / Commons](https://commons.wikimedia.org/wiki/File:Bertha_Lutz_e_a_campanha_pelo_voto_feminino.jpg) | Domínio público indicado na ficha e fonte do Arquivo Nacional, imagem preservada localmente | Abertura Memória e chamada histórica na homepage. | **Manter**. Evitar utilização adicional em toda página histórica. |
| FOTO-BANCADA-2026 | `public/fotos/bancada-feminina-camara-marco-2026.jpg` · [Banco da Câmara, 04/03/2026](https://www.camara.leg.br/internet/bancoimagem/default.asp?data=04/03/2026) | CC BY no banco oficial; Vinicius Loures/Câmara dos Deputados | Página temática **Poder**, como registro institucional da bancada existente em março de 2026 | **Retirada da chamada “Quem chega às cadeiras”**: não representa as eleitas de outubro. Manter contexto temporal e não identificar as retratadas como eleitas para 2027. |
| FOTO-PL-1085-2023 | `public/fotos/plenario-igualdade-salarial-2023.jpg` · [Agência Câmara](https://www.camara.leg.br/noticias/957955-camara-pode-votar-nesta-quarta-feira-projeto-que-equipara-salario-entre-homens-e-mulheres/) | Bruno Spada/Câmara dos Deputados; condição CC BY do banco, exigir crédito e não atribuir imagem a votações distintas | Homepage (investigação), reportagem *Como votaram*, índice de reportagens para a mesma pauta | **Manter só nessa investigação**, evitar utilização como ilustração genérica das seis editorias. |
| FOTO-AGENDA-2026 | `public/fotos/plenario-camara-junho-2026.jpg` · [Agência Câmara, 30/06/2026](https://www.camara.leg.br/noticias/1286425-copia-707) e [Banco de Imagens](https://www.camara.leg.br/internet/bancoimagem/default.asp?data=30%2F06%2F2026) | Thiago Cristino/Câmara dos Deputados; CC BY e crédito no banco | Abertura do tema **Agenda**, como registro de sessão legislativa de 30/06/2026 | **Substitui repetição do plenário de 2023**. Não representa todas as propostas ou votações reunidas no tema. |
| VIS-TSE-UF-2026 | `src/components/editorial/MosaicoEleitas2026.tsx` · alimentado por `RESULT_2026_PROPORCIONAL.federalFeminineByUf` e `federalSeatsByUf` | Visualização **original do QSE**, usando dados oficiais recontados; não há foto de terceiros | Chamada **Quem chega às cadeiras**, homepage | **Preferível** à foto pré-eleitoral. Cada uma das 27 UFs tem seu denominador próprio; cor coral indica eleição de 2026, não ornamento. |
| ARTE-VOZ | `src/components/editorial/ComposicaoEditorial.tsx` | Arte gráfica vetorial original; não contém pessoas reconhecíveis ou documento simulado | Chamada de `/na-voz-delas` | **Manter uma** arte autoral entre fotos e dado, sem reproduzi-la em todas as páginas. |

## Novas fontes de documentos para repertório por tema

| Tema | Documento de origem | Situação | Uso proposto |
| --- | --- | --- | --- |
| Presença | [TSE — dados abertos das eleições 2026](https://www.tse.jus.br/hotsites/pesquisas-eleitorais/index.html), recurso Candidatos 2026 | Base já utilizada no projeto, conferir versões e extrações | Miniaturas de bases, mapas e tabelas visuais derivadas de dados. |
| Dinheiro | [TSE — critérios de distribuição do FEFC pelos partidos em 2026](https://www.tse.jus.br/eleicoes/eleicoes-2026-content/prestacao-de-contas/fundo-especial-de-financiamento-de-campanha-fefc) | **Documentos reais identificados**, não há trecho individual selecionado | Selecionar ata/critério de partido quando vinculado a pauta apurada, com página, data e contexto; não fazer colagem genérica de papéis. |
| Dinheiro | [TSE — Portaria 541/2026](https://www.tse.jus.br/legislacao/compilada/prt/2026/portaria-no-541-de-20-de-agosto-de-2026) | Documento legal consultável | Contexto das cotas de financiamento, com transcrição fiel e indicação da publicação. |
| Agenda | [Câmara — PL 1085/2023](https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2351179) | Fonte identificada; texto e histórico disponíveis | Linha do tempo, não fac-símile inventado. |
| Poder | [Câmara — eleição da presidência da Comissão dos Direitos da Mulher, 11/03/2026](https://www.camara.leg.br/noticias/1252619-erika-hilton-e-eleita-presidente-da-comissao-dos-direitos-da-mulher-em-votacao-polemica/) | Registro jornalístico institucional e fotografia da Câmara | Materiais específicos de liderança, presidência e organização do poder. **Não** usar foto ilustrativa em denúncias sem relação direta. |
| Violência | [Lei 14.192/2021](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14192.htm) | Texto oficial identificado | Composição documental distinguindo dispositivo legal de interpretação editorial. |
| Violência | [Comissão da Mulher, 04/11/2026: Pauta, ata e proposições](https://www.camara.leg.br/evento-legislativo/82674) | Documentos de reunião específicos e verificáveis | Quando houver reportagem sobre violência política, usar o PL 690/2025 com tramitação e votação contextualizadas. |
| Memória | [Decreto 21.076/1932 — Código Eleitoral](https://www2.camara.leg.br/legin/fed/decret/1930-1939/decreto-21076-24-fevereiro-1932-507583-publicacaooriginal-1-pe.html) | Fonte legal histórica consultável | Página de arquivo e contextualização do sufrágio feminino; identificar reprodução textual versus fac-símile. |
| Memória | [Wikimedia Commons — Pagu](https://commons.wikimedia.org/wiki/File:Patricia_Galvao.jpg) | Retrato obtido, direitos requerem revisão final da origem | Uso no próprio perfil, não como retrato de todas as pioneiras. |

## Política de design derivada da revisão
1. **Fotografia como documento:** exigir relação factual da imagem com a pauta. Legendas registram o que foi fotografado, quando, por quem e o que **não** se pode inferir da cena.
2. **Dados com representação adequada:** cada cor e cada marca gráfica têm significado específico. Para UF, sempre distinguir numerador e denominador; miniaturas não substituem base e metodologia.
3. **A cor tem repertório:** vermelho-coral, dourado e creme aquecem **molduras de peças editoriais**, sem recolorir fotografias nem trocar a semântica dos dados. O conteúdo mantém fundos de leitura acessíveis e contraste suficiente.
4. **Não repetir tratamento:** ao longo da homepage alternar fotografia histórica, peça autoral e dados do TSE. Nas páginas internas, alternar fotografia, referência documental e visualização conforme conteúdo.
5. **Licenciamento separado da localização:** fonte e crédito encontrados não bastam quando a situação autoral é incerta. No caso da foto de Pagu, a classificação do Commons é um indício importante, mas não há comprovação primária da autoria nem da primeira divulgação.
6. **Sem novas imagens sintéticas de pessoas:** nenhum rosto, imagem de plenário, voto ou documento público será gerado artificialmente.

## Pendências objetivas antes de qualquer merge
- Rever especificamente a situação jurídica e a data de primeira divulgação do retrato de Pagu (autoria não identificada); se não houver respaldo suficiente, buscar autorização de acervo ou substituir por material comprovadamente livre.
- Verificar a apresentação cromática em capturas reais de **homepage, Pagu, Agenda e Poder** após alterações.
- Confirmar acessibilidade e navegação em teclado no teste manual.
- Manter esta curadoria associada ao `docs/acervo-visual-redesign-v3.md` histórico sem eliminar decisões anteriores.

**Esta é uma matriz de curadoria com implementação seletiva na branch. Não há autorização de merge ou publicação.**
