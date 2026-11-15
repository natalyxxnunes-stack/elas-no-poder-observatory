# Quem são elas? — continuidade visual a partir da capa aprovada

**Registrado em:** 15/11/2026  
**Estado:** decisão editorial preservada; revisão de páginas internas em rascunho, sem publicação.  
**Referência de implementação:** `src/components/home/CapaEditorialV3.tsx` e `src/routes/index.tsx`, na `main` após a integração do PR #3.

## O que está aprovado e não será redesenhado nesta rodada

- A abertura da homepage utiliza **fotografia documental real** do plenário da Câmara, associada à manchete da investigação sobre votações; texto, fotografia e legenda formam uma composição editorial conjunta.
- A fotografia tem legenda que **não a apresenta como registro das seis votações analisadas**. Crédito documentado em `src/data/fotos.ts`.
- Manter a marca original do observatório: `BrandLogo.tsx` e `BrandWordmark.tsx`.
- Manter a composição da capa: `CapaEditorialV3.tsx`, `Faixa.tsx`, hierarquia e percurso editorial. Não substituir a fotografia por arte genérica ou imagem sintética.
- Manter os tokens de cor e tipografia em `src/styles.css` (roxo estrutural, tinta, papel e acentos de função definida). Nenhuma nova paleta está aprovada.
- Preservar a distinção entre **candidatas, eleitas, diplomadas e ocupantes**, assim como as diferentes datas e universos das bases TSE.

## Critérios para cada página interna

A capa é **referência de qualidade e linguagem**, não um cabeçalho para ser copiado em todas as rotas. Usar:
1. **Fotografia documental** quando o documento visual tem relação demonstrável com a narrativa, crédito, procedência e direitos verificados.
2. **Gráficos e documentos** quando a informação central é uma medição, cálculo, contraste de universos ou fonte primária.
3. **Composição tipográfica** quando o conteúdo é um índice ou instrumento de consulta, sem fabricar imagens.

Aberturas diferentes devem resultar dessas funções. Evitar repetir tarjas roxas e painéis claros como um template indistinto; não voltar à predominância de branco/lilás pastel.

## Primeira intervenção em prévia: PR #6

**Quem entrou?** (`src/routes/eleitas.index.tsx`): manter fichas, busca e filtros; mudança pontual no gráfico de abertura para mostrar a fração de vagas conquistadas por mulheres em cada cargo, com o total de vagas do mesmo cargo:
- Câmara Federal: **109/513**, 21,2%;
- Assembleias estaduais: **213/1.035**, 20,6%;
- Câmara Legislativa do DF: **5/24**, 20,8%;
- Senado: **12/54**, 22,2% **das vagas renovadas em 2026**;
- Governos estaduais e do DF: **3/27**, 11,1%.

**Proveniência:** os numeradores exibidos nas fichas vêm de `ELEITAS_META` (Candidatos 2026, arquivo gerado em **02/11/2026 08:30:34**); os denominadores do resultado eleitoral vêm de `RESULT_2026_*` (TSE, Candidatos 2026, arquivo gerado em **27/10/2026 19:30:36**). As contagens devem continuar conciliadas; nenhuma dessas fotografias substitui automaticamente a outra.

**Método:** o exemplo financeiro no PR #6 usa a base de receitas de **15/11/2026** e apresenta numerador, denominador e conta. Sua arquitetura visual continua sujeita à revisão editorial, sem criar uma estética independente da capa.

**Proteção técnica:** o QA do PR #6 agora proíbe modificações em `src/routes/index.tsx`, `src/components/home/CapaEditorialV3.tsx`, `src/components/editorial/Faixa.tsx`, logomarca, paleta, fotografias locais e arquivos de dados. O teste de navegador verifica numeradores e denominadores do gráfico.

## O que ainda precisa de aprovação editorial

- Aberturas internas, principalmente **Quem entrou?** e **Método**: a composição deve ser comparada à linguagem real da capa, sem reabrir o projeto gráfico.
- Fichas individuais, Pagu, Direitos, Achados, Reportagens, Temas, Dados e serviços: revisão por função e evidência, sem criar um template único.
- Licenças e procedência das imagens; em `src/data/fotos.ts`, o retrato de Pagu permanece com `licenca: "verificacao-pendente"`.
- Conferência real em desktop/celular e acessibilidade, além de testes automatizados.

**Governança:** esta documentação e o PR #6 não alteram a `main`, o deploy manual da HostGator ou a homepage aprovada. Um merge exige revisão visual e decisão editorial específica.
