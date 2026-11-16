# Quem são elas? — acessibilidade do primeiro lote restante (PR #29)

**Data:** 16/11/2026. **Branch de prévia:** `revista-acessibilidade-lote1-16nov2026`. **Base:** PR #28, sem merge na `main` e sem publicação no site.

## Escopo efetivamente auditado

Sete modelos: Método (`/metodo`), Quem entrou? (`/eleitas`), Funil (`/funil`), Histórico (`/historico`), Dinheiro (`/dinheiro`), Monitor (`/monitor`) e Temas (`/temas`). Duas variações: ficha `/eleitas/perpetua-almeida-ac` e tema `/temas/dinheiro`.

**9 URLs × 3 larguras = 27 verificações**: desktop 1440 × 900, celular 390 × 844 e reflow 320 × 720 CSS px. Workflow `.github/workflows/qa-acessibilidade-lote1-16nov.yml` compila TypeScript e versão HostGator, executa axe-core **4.10.3** nas regras marcadas WCAG 2 A/AA, WCAG 2.1 AA e WCAG 2.2 AA, coleta as 12 primeiras paradas de Tab, erros JavaScript, largura, presença de `main` e `h1`, imagens e legendas. Produz **18 capturas integrais** em desktop e celular.

## Diagnóstico inicial e correções

A primeira tentativa do workflow (execução #43930178877) parou por erro de caminho do arquivo de relatório, corrigido antes da auditoria efetiva. Ela não é usada como evidência sobre as páginas.

**Auditoria inicial válida:** [execução #43930579720](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43930579720), com 27 verificações, sem erro JS, transbordamento ou falha estrutural, e **18 grupos de violações por regra/URL/largura**: 66 ocorrências de nós DOM nos três viewports, muitas repetidas porque a mesma falha aparece nos três. Uma falha de estrutura de `dl` e as demais de contraste.

| Página | Antes (por largura) | Intervenção objetiva |
|---|---|---|
| Funil | 5 elementos com contraste insuficiente no capítulo coral | Texto branco opaco em cinco elementos; fundo preservado |
| Histórico | 4 elementos de contraste insuficiente no capítulo coral | Texto branco opaco; séries, escala e universos preservados |
| Monitor | 6 elementos de contraste insuficiente; 1 `dl` inválida | Texto branco opaco no coral; rótulo sobre dourado reforçado; nota de contagem realocada **dentro de `dd`**, mantendo texto, número e hierarquia |
| Temas | 3 elementos com contraste insuficiente no bloco Memória | Número do tema, descrição e legenda da foto com papel claro opaco; cor coral e foto de Bertha Lutz preservadas |
| Tema Dinheiro | 3 elementos de contraste insuficiente em Lacunas | Notas e lista com papel opaco, inclusive rótulos do componente compartilhado `Secao` |

A intervenção compartilhada em `src/components/editorial/Secao.tsx` usa `text-paper` quando `claro` e aumenta a opacidade de `text-ink` de 65% para 80% quando não claro, suficiente para o rótulo que aparece sobre dourado. Nenhuma cor de fundo, base, fotografia, documento, gráfico ou texto de apuração foi trocado.

**Arquivos de código alterados:** `src/routes/funil.tsx`, `src/routes/historico.tsx`, `src/routes/monitor.tsx`, `src/routes/temas.index.tsx`, `src/routes/temas.$slug.tsx` e `src/components/editorial/Secao.tsx`.

Método, Quem entrou?, Dinheiro e ficha individual examinada não acusaram violações das regras selecionadas neste recorte.

## Validação final e imagens

**Execução final aprovada:** [GitHub Actions #43931907301](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43931907301). Resultado efetivo do `resumo.json`: **27 verificações, zero violações axe selecionadas, zero erros de execução**. As 9 URLs retornaram HTTP 200, cada uma com um `h1` dentro do conteúdo principal, nenhuma imagem quebrada e nenhum transbordamento nas três larguras.

**Capturas e relatórios:** [artefato do GitHub Actions](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43931907301/artifacts/14259721062). O artefato contém `diagnostico.json`, `resumo.json` e 18 PNGs integrais. As capturas antes/depois foram comparadas visualmente e por diferença de pixels; nenhuma altura/largura das páginas mudou. O trabalho preservou a sequência editorial e o repertório gráfico.

**Evidência visual verificada:** Método exibiu captura do portal TSE e fotografia da bancada, Monitor exibiu fotografia do plenário, Temas exibiu fotografia histórica de Bertha Lutz. Todas carregaram e possuíam `figcaption` no DOM. Não se inseriu foto genérica em Funil, Histórico, Dinheiro ou fichas. A pertinência/limitações editoriais seguem a `docs/matriz-fotografias-documentos-graficos-16nov2026.md`. Esta auditoria técnica **não valida direitos de reprodução**, inclusive a captura do portal e a foto histórica, nem substitui a verificação jurídica dos quatro recortes documentais do PR #27.

## Limites e pendências

- A ausência de violações nas regras selecionadas **não certifica conformidade integral WCAG 2.2 AA**.
- As 12 primeiras paradas de Tab foram registradas, mas não há verificação manual de todos os estados e percursos; zoom **real** de 200%, espaçamento personalizado de texto e leitores de tela NVDA/VoiceOver ainda não foram testados.
- A amostra de uma ficha e um tema não cobre todas as variações dinâmicas; outros modelos de conteúdo ainda exigem rodadas próprias.
- A revisão editorial/jurídica da publicação de reproduções no PR #27 e a decisão de integração dos PRs anteriores continuam pendentes.
- **Sem merge, deploy, créditos Lovable, alteração da homepage, logo, dados ou CSS global.**
