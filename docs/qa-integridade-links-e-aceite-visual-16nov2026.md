# Fechamento técnico: links, pré-renderização e provas visuais — 16/11/2026

**Branch:** revista-consolidada-ajustes-de-ritmo-16nov2026 · **PR #33:** draft, não publicado, base main.

## Auditoria do HTML gerado

Scripts: scripts/qa/integridade-links-pacote.py e workflow .github/workflows/qa-integridade-links-16nov.yml. O teste percorre todos os diretórios com index.html dentro de dist/client, lê links internos e mídia local em tags HTML, confere existência do destino e fragmentos de âncora que já fazem parte do HTML pré-renderizado, e exige ausência de duas fotografias em revisão autoral.

**Executado:** [Actions #43985935626](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43985935626) e [Actions #43986261537](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43986261537), sucesso.

| Medida | Resultado e universo |
| --- | --- |
| Páginas HTML do pacote | 399 |
| Ocorrências de links internos | 19.845, todas com destino local existente |
| Destinos internos ausentes | zero |
| Fragmentos de âncora ausentes no HTML | zero |
| Ocorrências de links externos | 596, não foi verificado status HTTP |
| Mídias locais em tags do HTML | 37 referências válidas; não inclui mídia importada pelo JavaScript |
| Fotos Pagu/Lélia distribuídas no pacote normal | zero, ambas bloqueadas |
| Placeholder de link detectado | zero |

O diagnóstico inicial não apontou falso positivo; por isso o teste posterior passou a bloquear o workflow quando encontrar erros ou avisos de integridade ou redução excessiva da contagem de HTML. **Não tratar os números acima como número de links únicos, cobertura de imagens dinâmicas ou garantia do destino externo.**

## Escopo do diff comparado à main

No momento da análise havia **120 arquivos modificados ou adicionados**. A alteração documental relevante em src/data/temas.ts registra que **critérios formais FEFC estão publicados no TSE**, sem inferir execução dos repasses; material oficial e arquivo de fotografias foram acrescentados. As bases centrais de candidaturas, resultados, votação e finanças, a homepage, os componentes de logo e o CSS global não apareceram entre os arquivos modificados. O foco do PR é visual e editorial; os ajustes de build e auditoria ficam restritos ao pacote de pré-publicação.

## Páginas inteiras preparadas para apreciação

Foi reunida a imagem integral em desktop e celular de quatro modelos que exigem juízo humano sobre ritmo e provas: **Direitos, Quem chega, Sobre e Votos**. As capturas originais são do [artefato de QA do PR #33](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43981679297). Nenhuma fotografia sem direitos foi acrescentada aos materiais e não houve redesign nesta etapa.

- Direitos: cronologia e **reproduções tipográficas** de textos legais, descritas como tal, sem alterar sua natureza para fac-símile do Diário Oficial.
- Quem chega: foto contextual de bancada anterior à eleição, gráficos de composição, narrativa do Senado e comparações territoriais/partidárias, sem equiparar pessoas eleitas a ocupantes efetivas.
- Sobre: tipografia e informação institucional em blocos, sem criar foto artificial de bastidores.
- Votos: gráfico e tabelas com denominadores separados, sem usar imagem genérica de plenário como evidência do voto de parlamentares.

**Ainda pendentes:** aceite editorial de página inteira, solução de direitos dos sete itens individuais catalogados no capítulo 31, zoom nativo/leitores de tela/controle humano da navegação, revisão final do diff e autorização para integrar/deploy. PR draft, sem merge.
