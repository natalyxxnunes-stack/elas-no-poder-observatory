# Quem são elas? — controle editorial do redesign

**Data de referência:** 15 de novembro de 2026  
**Natureza:** documento de governança do projeto gráfico e da auditoria, sem alteração de interface ou conteúdo publicado.  
**Fonte normativa única para a direção visual:** [Manual visual v3](../manual-visual.md). Este controle registra **andamento, evidência e pendências**, sem criar outra identidade.

## 1. Estado de referência

| Objeto | Evidência confirmada em 15/11/2026 | Encaminhamento |
| --- | --- | --- |
| Homepage atual na `main` | Abertura de investigação com fotografia documental da Câmara em `src/components/home/CapaEditorialV3.tsx` | **Aprovada; proteger logo, fotografia, crédito, manchete e composição.** Refinamento posterior do ritmo da capa exige escopo próprio. |
| PR [#1](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/pull/1) | Branch `redesign-editorial-v3-teste`, **12 commits atrás da `main`, nenhum à frente**; permanece aberto em rascunho | **Histórico visual**, com manual v2 e [acervo visual da etapa 2](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/blob/redesign-editorial-v3-teste/docs/acervo-visual-etapa2.md). Não usar como base de publicação. |
| PR [#6](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/pull/6) | `ajustes-editoriais-identidade-aprovada-15nov`, **19 arquivos alterados** em relação à `main`, misturando componentes, rotas, QA e documentação | **Em revisão; bloquear integração como pacote.** Recortar e validar modificações por natureza e por página. |
| Manual visual v3 | Decisões consolidadas e agora propostas em branch exclusivamente documental | Poderá ser incorporado à `main` **sem levar o código visual do PR #6**. |
| Site na HostGator | Publicação feita por procedimento próprio | **Conferir contra `main` na auditoria**. Não presumir sincronização automática. |

## 2. Decisões fechadas

- Conceito: **revista jornalística contemporânea, independente, feminista, de dados e investigação política**, organizada em torno do percurso **candidatura → financiamento → eleição → exercício efetivo do poder**.
- **Logo original** e **abertura fotográfica da homepage preservadas**. A capa é referência de linguagem e rigor, não cabeçalho reutilizável em todas as páginas.
- Família tipográfica: **Fraunces** em manchetes e títulos; **Work Sans** em texto/interface; **IBM Plex Mono** em fonte, data, hash e dados tabulados.
- **Roxo estrutural**. Nas composições e chamadas, repertório complementar **tinta, ameixa, violeta, creme quente, coral e dourado**. O **vinho não entra como nova cor estrutural**.
- Gráficos conservam **cores metodológicas próprias**, rótulos, universo, denominador, fonte e data de corte. Cor/raça: **preta e parda separadas**.
- Fotografia e documento **reais, pertinentes, contextualizados, creditados e com direitos verificados**. Reprodução tipográfica de texto legal não deve ser apresentada como fac-símile real.
- **Diversidade de tratamentos por pauta**: fotografia documental, documento, visualização de dados ou arte autoral original segundo a evidência disponível. Não repetir o mesmo vetor ou a mesma capa.
- Composição **adulta, alinhada, com respiro e hierarquia**. Recusados: predominância de branco/lilás e bege; dashboard corporativo; vinho estrutural; vetores em série; ilustrações artificiais; colagem desalinhada; números e decorações falsos; fios ornamentais grossos sistemáticos.
- **A decisão editorial final é humana.** QA técnico, aprovação de acessibilidade e testes de build não equivalem a aprovação visual.

## 3. O que há no PR #6 e o que fazer

**Documentação e testes (extrair ou reconciliar separadamente)**
- `docs/manual-visual.md`: **isolado em PR documental próprio**; evitar manter versões divergentes nos dois PRs.
- `docs/design/CAPA-APROVADA-CONTINUIDADE-EDITORIAL-15NOV2026.md` e `docs/design/REPERTORIO-DOCUMENTAL-E-USO-DE-VETORES-15NOV2026.md`: material de rastreabilidade da branch de teste, não documentação normativa concorrente.
- `.github/workflows/qa-ajustes-editoriais-15nov.yml`: testes para o PR #6; **não considerar capturas da primeira dobra como inspeção de página completa**.

**Correções funcionais ou documentais potencialmente aproveitáveis, com revisão isolada**
- `src/routes/eleitas.index.tsx`: denominadores próprios por cargo, sobretudo **12 de 54** cadeiras renovadas do Senado, sem confundir com **81** cadeiras totais. Verificar datas distintas dos numeradores e denominadores.
- `src/routes/direitos.tsx`: IDs únicos para os **dois acontecimentos distintos de 2024**, preservando 13 marcos e fontes primárias.
- `src/components/editorial/Pioneiras.tsx`: ressalva expressa de direitos de reprodução ainda pendentes para o retrato de Pagu.
- `src/routes/pioneiras.index.tsx`: índice auditável dos arquivos de 1950, 1982 e 1986, derivado dos metadados existentes; sua composição visual **não é automaticamente aprovada**.
- `src/components/editorial/InvestigationIndex.tsx`: apresentação da data financeira vigente pela constante `FINANCE_BASE_LABEL`; corrigir em momento oportuno os textos antigos presentes em `src/data/architecture.ts` com controle de versão da fonte. O redesenho do índice está **pendente**.
- `src/routes/reportagens.tsx`: remover repetição do SVG de microfone e citar referências textuais do Diário da Câmara; forma final do cartão ainda exige avaliação visual.

**Intervenções de composição que NÃO estão aprovadas**
- `src/routes/dados.tsx`, `src/routes/investigacoes.tsx`, `src/routes/sobre.tsx`: capturas mostraram excesso de superfícies quase brancas e aparência institucional; **não integrar a composição atual**.
- `src/routes/eleitas.index.tsx` e `src/routes/metodo.tsx`: funções e contas aproveitáveis, mas aberturas cromáticas e ritmo ainda precisam de avaliação de revista.
- `src/routes/achados.index.tsx`, `src/components/editorial/AchadoCard.tsx`, `src/routes/colecoes.antigenero-no-poder.tsx`, `src/components/editorial/EditorialOpening.tsx`, `src/components/editorial/Secao.tsx`: alterações misturam estrutura e aparência; aprovar por página, não por pacote.

**Regra:** não copiar cegamente a branch de teste para produção. Preservar melhorias técnicas comprovadas, reconstruindo a apresentação apenas onde a comparação visual e o manual exigirem.

## 4. Ordem de trabalho a seguir

| Fase | Entrega observável | Critério de saída |
| --- | --- | --- |
| **1. Governança** | Manual v3 e este registro isolados do redesign; PR #1 identificado como histórico e PR #6 como proposta mista | Comparação GitHub confirma PR de diretrizes **somente documental**, sem mudança em `src/`, `public/` ou workflow |
| **2. Auditoria do conjunto** | Capturas **integrais** do site publicado e da prévia em **desktop e celular**, inventário de imagem/documento por página, matriz de problemas P0/P1/P2 | Diagnóstico por família de página, evidência, decisão recomendada; sem alterações visuais nessa etapa |
| **3. Páginas-piloto** | `Quem entrou?`, `Método`, `Reportagens` com diferentes soluções de consulta, documentação e narrativa | Cada página avaliada por pertinência, ritmo cromático, fontes, legibilidade e versão móvel; **aprovação explícita** |
| **4. Aplicação** | Demais famílias integradas de modo coerente, sem impor uma fórmula comum | Revisão de página completa, navegação e contraste de todos os estados |
| **5. Auditoria e publicação** | Reconciliação das bases e créditos/licenças; testes técnicos, acessibilidade, QA editorial, publicação separada | Só integrar o código aprovado à `main` e publicar na HostGator após decisão editorial |

### Prioridades verificáveis para a fase 2

- **P0:** não integrar PR #6 integral; evitar regressão da homepage; não publicar imagem de Pagu como licença resolvida; não misturar versões de bases do TSE sem conciliação.
- **P1:** recuperar cromatismo e ritmo editorial de páginas internas; hierarquizar consultas em `Quem entrou?` e a explicação do `Método`; verificar experiência móvel real.
- **P2:** pequenos ajustes de espaçamento, ornamentos, índices e microtipografia, apenas depois de resolvida a composição.

## 5. Protocolo de mudanças

Para cada página: **problema documentado → proposta justificada → prévia real → testes → decisão editorial (aprovado / ajustar / rejeitado) → integração**.

Toda intervenção deve registrar: arquivo alterado, efeito no conteúdo, efeito no design, fontes/corte dos dados afetados, evidências em desktop e celular e decisão. Alterações em `src/data/`, logo, capa fotográfica e arquivos de fotografia exigem escopo e conferência específicos.

A revisão de conteúdo jurídico/político não pode ser subsumida a uma decisão estética. Separar expressamente **correção de fato**, **mudança de dados**, **melhoria funcional** e **preferência de apresentação**.

**Última decisão consolidada:** recuperar a riqueza de uma revista sem perder respiro nem copiar a Gênero e Número. A capa aprovada é referência. O PR #6, enquanto mistura alterações aprováveis com composições rejeitadas, não é publicável.
