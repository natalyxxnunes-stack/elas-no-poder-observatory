# Recuperação editorial: fotos, contraste e ritmo nas páginas inteiras

**16/11/2026** · PR #33 (branch `revista-consolidada-ajustes-de-ritmo-16nov2026`) · proposta em rascunho, baseada na `main`; **sem publicação**.

## Motivo da correção

A editora apontou repetição de creme frio/branco, excesso de texto corrido e ausência das fotografias históricas discutidas. Inspecionados o [manual normativo](manual-visual.md), a [âncora de três pilotos](design/ANCORA-EDITORIAL-PILOTOS-16NOV2026.md), a [matriz de imagens](matriz-fotografias-documentos-graficos-16nov2026.md), `src/data/fotos.ts` e as capturas completas dos PRs #31–#33. A interpretação anterior do manual era incorreta: creme `--art-cream` funciona como **um** componente, não um fundo universal. Os retoques foram executados no **mesmo PR #33**, sem reiniciar o projeto.

## Proveniência e condições de uso

| Uso | Local | Procedência e metadados | Crédito / condição | SHA-256 da cópia |
| --- | --- | --- | --- | --- |
| Barreiras · imagem legislativa de arquivo | `public/fotos/renilce-nicodemos-pl1446-camara.jpg` | [Agência Câmara, notícia 01/07/2026 sobre PL 1446/25](https://www.camara.leg.br/noticias/1286346-PROJETO-AMPLIA-PROTECAO-CONTRA-VIOLENCIA-POLITICA-DE-GENERO-NA-PRE-CANDIDATURA), 768 × 473, data da foto **não confirmada** | Kayo Magalhães/Câmara, [regra de uso livre com crédito](https://www2.camara.leg.br/comunicacao/assessoria-de-imprensa/guia-para-jornalistas/noticias-e-fotografias) (não supor CC-BY) | `f7ff20dafb80bc86f5a00c3da1eb8f6e07d5cdb520cdf645b630e32ed82328cb` |
| Histórico · local de votação em 2026 | `public/fotos/local-votacao-2026-agencia-senado.jpg` | [Commons / Agência Senado, 04/10/2026, 11h09, UniCEUB Asa Norte, Brasília](https://commons.wikimedia.org/wiki/File:Elei%C3%A7%C3%B5es_2026_-_Primeiro_turno_(55567948757).jpg), 1280 × 853 | Saulo Cruz/Agência Senado, CC BY-SA 4.0, indicada na ficha e confirmada por FlickreviewR (05/10/2026) | `fba51641d92412a0c1cfb7b0c6d37dfaadf366be23f965b585f79d4e478d87ba` |
| Lélia Gonzalez · somente avaliação visual | `docs/acervo-em-revisao/lelia-gonzalez-cezar-loureiro-referencia.jpg` (**fora de public**) | [Commons](https://commons.wikimedia.org/wiki/File:L%C3%A9lia_Gonzalez_by_Cezar_Loureiro.jpg), atribuição Cezar Loureiro, origem indicada *Cult*, 943 × 640 | **Direitos pendentes**, não assumir domínio público sem conferir a tese jurídica, primeira publicação e titularidade | `690eba06cfbb8f4dfea6f2115fa27075d793ecf80fc7ef57ef6e9c1147a3ff31` |
| Pagu · somente avaliação visual | `public/fotos/pagu-patricia-galvao-anos-1920.jpg` (já existente) | [Commons](https://commons.wikimedia.org/wiki/File:Patricia_Galvao.jpg), retrato atribuído à década de 1920 | **Direitos pendentes**, autoria desconhecida, primeira divulgação não esclarecida. Ativação proibida no build normal | Ver `docs/acervo-visual-etapa2.md` e `src/data/fotos.ts` |

**O que as fotografias realmente mostram:** a foto de Barreiras integra a cobertura do **debate legislativo sobre pré-candidatura**; não é imagem de vítima, processo ou julgamento. A de Histórico documenta a eleição **de 2026**, sem ilustrar fotograficamente eleições de 2014 a 2022. As legendas indicam essa distinção. As fotografias em Pioneiras mostram pessoas identificadas, com autoria ou condições de circulação a investigar; não entram no site público sem decisão específica.

## Alterações efetivas no código

- `src/routes/barreiras.tsx`: nova seção fotográfica em tinta, com legenda e link da fonte, inserida entre a faixa de documentos em coral e a série visual; feminicídio e critérios deixaram de usar `tone="warm"` e ganharam capítulos roxo/tinta com leitura nos painéis internos de papel. Dados do TSE/MPF e Anuário, fórmulas, datas, três links documentais e ressalvas permanecem intactos.
- `src/routes/historico.tsx`: seção fotográfica com primeiro turno de 2026 e legenda CC BY-SA; série Gênero sem creme contínuo, Gênero × cor/raça em tinta e Cargo × UF em roxo. `ContextBox` recebeu painel de leitura claro **apenas dentro** do capítulo escuro, para manter contraste WCAG. Nenhum gráfico, rótulo de raça ou denominador modificado.
- `src/routes/achados.index.tsx`: alternância de capítulos em tinta, ameixa profunda e papel; mantidos AchadoCard, gráficos, datas, legendas e fontes. Teste intermediário com `--art-violet` revelou contraste insuficiente (3 larguras); foi descartado e substituído pelo `--art-plum` do sistema aprovado.
- `src/components/editorial/Pioneiras.tsx`: fotografias Lélia/Pagu na abertura somente em **build especial**. O build normal conserva as fichas tipográficas eleitorais e não renderiza esses dois retratos sem direitos comprovados.
- `src/data/fotos.ts`: inventário atualizado. A Câmara agora está classificada corretamente como `uso-livre-com-credito`, não sob licença individual CC-BY presumida. A licença do Senado foi registrada `CC-BY-SA-4.0`; os retratos continuam `verificacao-pendente`.

**Nenhuma alteração** na homepage, logo original, CSS global, dados TSE, métodos ou universo, números publicados, conteúdo factual, imagens existentes ou fontes originais anteriores. Arquivos baixados pelo workflow [.github/workflows/incorporar-fotos-documentais-revista-16nov.yml](../.github/workflows/incorporar-fotos-documentais-revista-16nov.yml) com origem e hashes guardados no [Actions #43959698093](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43959698093).

## Validação do funcionamento e do direito de exibição

- [GitHub Actions #43962425567](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43962425567), sucesso: primeiro **build normal**, em que ambos retratos de Pagu e Lélia ficam bloqueados; depois **build especial de revisão** com cópia temporária da foto de Lélia para `public` e variáveis `VITE_QSE_PREVIEW_LELIA_FOTO=true`, `VITE_QSE_PREVIEW_PAGU_FOTO=true`, com fotos e legendas em desktop/celular; sete páginas alteradas e dois controles × 3 larguras = 27 execuções axe selecionadas, zero violações e zero erros estruturais no resultado dessa execução.
- Testes de Achados, Barreiras, Histórico + homepage/Método em 1440, 390 e 320 CSS px: status, imagens carregadas, alt e legenda, pontos de navegação e mudança de UF, contraste das regras axe selecionadas; primeira tentativa após mudança de Achados falhou no violeta claro e foi corrigida para ameixa, sem modificar dado. Resultados finais devem ser consultados no workflow [QA ritmo editorial](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/workflows/qa-ritmo-achados-barreiras-historico-16nov.yml).
- Capturas originais armazenadas nos artefatos Actions e pranchas de comparação entregue na conversa. Evidência visual da branch **não se confunde com o site já publicado**.

## Fechamento pendente

**Ainda não há aceite visual da editora**; é necessário examinar páginas inteiras, em especial os longos blocos de fichas em Achados e a densidade das tabelas no celular. Revisar condições autorais de Lélia e Pagu e os recortes documentais anteriores; testar uso real com leitores de tela/zoom 200%. Não mesclar, não publicar nem reconstruir a estética em outra branch. **Prosseguir no mesmo PR #33.**
