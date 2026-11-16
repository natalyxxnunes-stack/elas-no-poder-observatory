# Quem são elas? — quarto lote, seis modelos finais e documentação de imagens

**16/11/2026** · PR #32, branch `revista-acessibilidade-lote4-16nov2026`, baseada no PR #31; **não publicada, não mesclada**.

## Universo de teste
Seis modelos de conteúdo antes pendentes: `/pioneiras/lelia-gonzalez`, `/pioneiras/pagu`, `/quem-chega`, `/quem-sao-elas`, `/sobre`, `/votos`. Controles: homepage (`/`), Relatório 2026 e índice Pioneiras. **9 URLs × 3 larguras = 27 verificações** (1440×900, 390×844, 320×720 px CSS) e **18 capturas integrais** (desktop e celular). `.github/workflows/qa-acessibilidade-lote4-16nov.yml` compila TypeScript e HostGator; executa axe-core **4.10.3** com tags WCAG 2 A/AA, 2.1 AA e 2.2 AA; registra status HTTP, `main`, `h1`, transbordamento, erros JS, 12 paradas de Tab, inventário de imagens, alternativas e legendas.

**Resultado inicial verificado:** [GitHub Actions #43942839897](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43942839897): **27 verificações, zero violações automáticas das regras selecionadas, zero erros de execução**. Todas as nove URLs responderam HTTP 200, com `main` e `h1`, sem transbordamento. Imagens documentais presentes carregaram. O artefato inicial com JSON e screenshots é [#14263960943](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43942839897/artifacts/14263960943).

**Teste adicional aprovado:** [GitHub Actions #43944282720](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43944282720): novamente **27 verificações, zero violações automáticas, zero erros de execução**, mais **12 testes funcionais** (seis verificações em desktop e celular):
- Índice por âncoras nos dois perfis, inclusive ausência de retrato com licença pendente;
- Expansão por Enter da **camada externa e do explorador interno** de candidaturas, com abertura e fechamento;
- Expansão por Enter da tabela de voto por raça e gênero;
- Navegação por âncora até a política de correções em Sobre;
- Link para fichas de eleitas, presença da seção de cargos e carregamento da imagem contextual em Quem chega.

Duas versões intermediárias do teste interativo ([#43943521274](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43943521274) e [#43943902222](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43943902222)) falharam por **seletores do próprio teste**: primeiro, `summary` de controles aninhados; depois, tentativa de interagir com o explorador antes da abertura da camada externa. Foram corrigidos somente no workflow; não constituem defeitos confirmados do produto.

## Fotografias e documentos (conferência do DOM, não autorização)
| Modelo | Elementos de imagem | Diretriz |
|---|---|---|
| Lélia Gonzalez | Sem foto renderizada | Retrato sem liberação de direitos. Há **reprodução tipográfica identificada** do registro eleitoral, que não é fac-símile do documento TSE. |
| Pagu | Sem foto renderizada | `FOTOS.pagu.licenca = "verificacao-pendente"` bloqueia a imagem. Ficha tipográfica preservada. |
| Quem chega | Foto real de bancada feminina da Câmara em **março de 2026** | Foto de período anterior à eleição; legenda não a apresenta como retrato de eleitas em outubro/2027. |
| Quem são elas? / candidatas | Captura real do portal do TSE | Foto de página do portal, não do CSV; imagem com `alt`, legenda contextual em `p` adjacente, não `figcaption`; revisar vínculo semântico e direito de reprodução da interface. |
| Sobre | Sem foto | Organização institucional de fontes e método, sem imagem inventada de bastidores. |
| Votos | Sem foto | Séries/diagramas de candidaturas, votos nominais válidos e cadeiras com três denominadores. |

Os controles conservam a homepage fotográfica, a imagem histórica de Bertha Lutz em Pioneiras e a foto contextual do Relatório. **Nenhuma imagem, documento, gráfico, dado oficial ou fundo foi alterado** neste PR. A representação eleitoral é a que estava no repositório; esta rodada **não revalidou números de 2026**.

## Prévia visual e reservas
Seis capturas desktop e seis mobile foram reunidas, em tela inteira, num arquivo ZIP fornecido na conversa, e duas pranchas aproximam a abertura de um trecho interno de cada rota. Essas imagens são do **build da branch**, não do site publicado. O contraste de Lélia (papel/roxo) e Pagu (tinta escura) foi preservado, assim como o roxo de Quem chega e candidatas, a apresentação institucional de Sobre e a hierarquia de dados em Votos.

**Balanço reconciliado:** 35/35 **modelos** da matriz `docs/matriz-fotografias-documentos-graficos-16nov2026.md` receberam ao menos **uma amostra** de auditoria entre PRs #28 e #32. Isso não equivale a todos os URLs ou estados dinâmicos testados. A ausência de violações automáticas não certifica WCAG integral. Permanecem testes humanos com NVDA/VoiceOver, zoom real 200%, reespaçamento, menus móveis, variantes de seis temas e fichas, redesenho de ritmo de manchetes longas no celular e revisão jurídica/editorial das quatro reproduções do PR #27.

**Governança:** conservar PR #32 em rascunho, sem merge, deploy, Lovable ou inserção de fotos bloqueadas; nenhuma licença foi liberada por esta auditoria.