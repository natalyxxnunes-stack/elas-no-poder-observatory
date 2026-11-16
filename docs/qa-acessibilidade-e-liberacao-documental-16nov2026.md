# Quem são elas? — auditoria de acessibilidade e controle de publicação do acervo

**Data:** 16/11/2026 · **Branch de prévia:** `revista-acessibilidade-e-licencas-16nov2026` · **Base:** PR #27, sem merge/deploy.  
**Escopo técnico efetivamente testado:** homepage de controle, Partidos, Quem controla, Na voz delas, Como votaram, Reportagens e Dados. Três larguras de janela: 1440 × 900, 390 × 844 e 320 × 720. As demais páginas da revista **não** foram reavaliadas nesta rodada.

## 1. Diagnóstico antes das correções

Executou-se axe-core 4.10.3 com regras etiquetadas WCAG 2 A/AA, WCAG 2.1 AA e WCAG 2.2 AA, sobre a versão compilada HostGator.

| Página | Falha identificada | Causa precisa | Correção implementada |
|---|---|---|---|
| Partidos | Cor e contraste (4 elementos por viewport) | Branco com 90% de opacidade sobre coral; ouro sobre violeta claro; branco a 90% sobre violeta claro | Textos sobre coral e violeta passaram a branco opaco; número decorativo `04` ganhou branco |
| Partidos | Lista de definição inválida (1 ocorrência por viewport) | `dd` recebeu `role="img"`, anulando semântica do termo/definição | `dt` representa a descrição; `dd` traz percentual como texto; barra visual é decorativa |
| Partidos | Item de lista sem pai em celular (1 ocorrência) | Ficha individual `<li>` era inserida diretamente em `<div>` | Ficha envolvida por `<ul>`, mantendo a lista de todas as siglas |
| Quem controla | Cor e contraste (3 elementos por viewport) | Opacidade 85–90% do creme sobre coral profundo | Parágrafos e metadados passaram a `text-paper` opaco |
| Dados | Cor e contraste (2 elementos por viewport) | Opacidade de texto sobre o caderno coral | Textos dos capítulos passaram a `text-paper` opaco |

**Total no diagnóstico inicial:** 18 ocorrências de contraste (somando desktop e celular), 2 de estrutura de lista de definição e 1 de item sem lista; não representam número de páginas distintas nem pessoas afetadas.

## 2. Verificação após as correções

**Resultado da execução GitHub Actions [#43925782716](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43925782716):** 21 verificações (7 rotas × 3 larguras), **zero violações automáticas das regras WCAG selecionadas**, zero erros de execução, sem rolagem horizontal decorrente do layout nos três tamanhos.

O workflow `.github/workflows/qa-acessibilidade-documentos-16nov.yml`:

- compila TypeScript e o alvo HostGator;
- carrega e decodifica as imagens antes da varredura;
- executa axe-core sobre o DOM de cada página;
- registra os 12 primeiros elementos alcançáveis com Tab, com estilos de foco;
- registra textos alternativos, associação com `figure` / `figcaption` e dimensões das imagens documentais;
- mede largura de conteúdo em 1440, 390 e **320 pixels CSS**;
- **falha** se qualquer violação das regras selecionadas ou erro estrutural for registrado.

**O que o resultado não prova:** a totalidade da WCAG 2.2 AA; qualidade editorial das alternativas textuais; leitura por NVDA/VoiceOver; funcionamento de todos os filtros pelo teclado; compatibilidade com zoom de 200% real ou espaçamento de texto personalizado; teste com pessoas com deficiência; revisão de todo o site. O reflow a 320 px é um ensaio pertinente, mas não substitui testes de ampliação.

Fontes normativas:
- W3C, WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WCAG, 1.4.3 (contraste mínimo), 1.4.11 (contraste de elementos não textuais), 2.4.7 (foco visível) e 1.3.1 (informação e relações).

## 3. Liberação editorial e jurídica: quatro imagens documentais

**Alerta de governança:** o repositório `natalyxxnunes-stack/elas-no-poder-observatory` é **público**. Um PR `draft` impede a integração automática ao site, **mas não transforma os arquivos daquela branch em privados**. As imagens anexadas ao PR #27 podem ser encontradas por terceiros no GitHub. **Nunca descrever essas imagens como inacessíveis ao público apenas por não haver deploy.**

| Imagem documental | Origem/SHA/Página | Triagem de dados pessoais | Direito de reprodução | Estado de publicação |
|---|---|---|---|---|
| União Brasil — Resolução CEN 043/2026 | Fonte TSE, PJe 0601251-87.2026.6.00.0000, p. 24/33 | Página selecionada inspecionada; outros anexos contêm dados sensíveis e não foram copiadas | **Pendente:** ato interno de partido não é automaticamente texto oficial do Estado | Prévia em repositório público; **não liberar deploy** |
| Federação Brasil da Esperança — Resolução 14/2026 | Anexada ao PJe do PT, p. 10/64 | Página selecionada inspecionada | **Pendente:** resolução de federação, não pressupor licença da interface ou do processo | Prévia em repositório público; **não liberar deploy** |
| PL — capa PJe 0600974-71.2026.6.00.0000 | Fonte TSE, p. 1/34 | Capa inspecionada; não reproduz contas/CPF presentes em anexos | **Pendente:** avaliar situação autoral dos elementos, tratamento de nomes e finalidade jornalística | Prévia em repositório público; **não liberar deploy** |
| Câmara — linha do índice de discursos, Julia Zanatta | Sistema de pesquisa SITAQ, 10/03/2026, DCD 11/03 p. 163 | Linha mostra dados parlamentares públicos, sem CPF/conta bancária | **Pendente:** captura da interface do catálogo institucional não equivale à licença dos dados | Prévia em repositório público; **não liberar deploy** |

As três primeiras páginas são reproduções literais e inteiras de páginas escolhidas dos PDFs oficiais; a quarta imagem é recorte literal de uma **linha da pesquisa**, e não a página do Diário da Câmara. Proveniência, SHA e links íntegros: `docs/acervo-facsimiles-tse-camara-16nov2026.md`.

### Enquadramento jurídico preliminar — sem parecer conclusivo

A Lei nº 9.610/1998, **art. 8º, IV**, exclui da proteção autoral os textos de leis, decisões judiciais e demais atos oficiais. Isso **não permite concluir automaticamente** que resoluções internas de partidos ou federações, anexadas a um processo eletrônico, tenham o mesmo enquadramento, nem que elementos gráficos e capturas de interfaces institucionais sejam livremente reutilizáveis.

A LGPD (Lei nº 13.709/2018), **art. 4º, II, a**, prevê regra específica para tratamentos exclusivamente jornalísticos; o art. 7º, §3º, também exige considerar finalidade, boa-fé e interesse público em dados de acesso público. O projeto adota minimização e evita reproduzir dados residenciais, CPFs ou contas bancárias sem necessidade jornalística. A situação concreta deve ser avaliada considerando a atividade e as informações efetivamente divulgadas.

Textos oficiais:
- Lei de Direitos Autorais: https://www.planalto.gov.br/ccivil_03/leis/l9610.htm
- Lei Geral de Proteção de Dados: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/L13709compilado.htm

### Decisão pendente antes da integração à main

1. Verificar juridicamente o enquadramento de cada imagem e a proporcionalidade da reprodução; optar por link/índice caso a imagem não seja defensável.
2. Revisar pessoalmente as quatro imagens em tamanho integral, suas legendas, o contexto da afirmação e as eventuais informações identificáveis.
3. Conferir a continuidade e os links dos PDFs originais, a fidelidade dos artigos mencionados e a situação processual na data de publicação.
4. Concluir testes de foco no miolo da página, leitor de tela, zoom de 200%, imagens com espaçamento de texto personalizado e auditoria do restante do observatório.
5. Registrar decisão editorial: **aprovado para publicação / aprovado com restrições / não publicar**, com data e responsável. Até essa decisão, **não mesclar PRs #27–#28 nem executar deploy**.

**Correção de linguagem feita no código:** a frase em Na voz delas que sugeria declarações “autorizadas à publicação” foi corrigida para “selecionadas para publicação”. O campo `publicar: true` é um critério interno e **não significa consentimento da parlamentar**.

**Governança de arquivos:** nenhuma base eleitoral, imagem, logo, homepage ou arquivo documental foi reescrito nesta rodada; foram feitas correções de estilo e semântica de HTML nos componentes e a auditoria técnica.
