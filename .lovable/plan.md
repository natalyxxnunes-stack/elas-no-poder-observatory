# Plano conjunto: navegação secundária, breadcrumb e índice da investigação

## Diagnóstico confirmado

### 1. Submenu de “Dados 2026”

Nenhuma das seis entradas existe hoje como subrota de Dados 2026. O conteúdo está distribuído assim:

| Entrada proposta | O que já existe | Situação arquitetural |
|---|---|---|
| **Brasil** | A home (`/`) já mostra a fotografia nacional: total, participação feminina nos universos proporcional e majoritário e fonte/data. | Conteúdo pronto; pode continuar canônico em `/`. Não exige página nova. |
| **Estados** | Mapa na home e, em `/quem-sao-elas`, panorama por UF, tabela de cor/raça por estado e explorador estadual. | Conteúdo publicado, mas espalhado. Um destino autônomo exigiria nova rota; sem nova rota, pode apontar para a seção existente. |
| **Partidos** | A seção “Quem lança mulheres?” em `/quem-sao-elas` já usa a tabela por partido/federação e explicita seus limites. | Conteúdo publicado como bloco. Um destino autônomo exigiria nova rota; sem nova rota, pode apontar para a seção existente. |
| **Cargos** | O explorador racial permite trocar o universo eleitoral, e há textos/metadados sobre cargos, mas não existe uma análise ou visualização dedicada cargo a cargo. | É a única entrada sem conteúdo equivalente pronto. Exige página/conteúdo novo e processamento por cargo antes de ser apresentada como seção disponível. |
| **Raça** | `/quem-sao-elas` é a investigação completa: achado, categorias originais, recortes territoriais, partidos, exploradores e limites da fonte. | Conteúdo e rota prontos; o submenu pode apontar para `/quem-sao-elas`. |
| **Histórico** | `/historico` é uma rota publicada com séries 2014–2026, funil histórico, linha temporal e documentação das lacunas. | Conteúdo e rota prontos; o submenu pode apontar diretamente para `/historico`. |

**Limites importantes já visíveis no código:** o snapshot fixo atual contém apenas totais nacionais e contagens por UF; não contém as dimensões por partido, por cor/raça × UF ou por UF × partido que alguns componentes sabem consumir. Esses componentes exibem lacuna quando as células não existem. Portanto, “Estados” hoje tem o recorte de gênero por UF, mas as leituras raciais estaduais permanecem sem números; “Partidos” também pode aparecer sem linhas na fotografia vigente. “Cargos” não tem uma decomposição pronta no snapshot publicado.

### 2. Breadcrumb

- `PageShell` é o ponto compartilhado por todas as páginas: header, conteúdo e footer.
- As aberturas não usam um único componente em todas as rotas; inserir breadcrumb dentro de `EditorialOpening` deixaria páginas de fora.
- Já existe um componente acessível de breadcrumb no projeto, mas ele ainda não é usado.
- As rotas atuais são rasas. Sem novas subrotas, a maioria das trilhas seria apenas `Dados 2026 → Página`; um terceiro nível só será verdadeiro em páginas ou seções com hierarquia editorial declarada.

### 3. Estados das frentes

`architecture.ts` já concentra nome, rota, pergunta, resumo, dimensões, um estado editorial e motivo de despublicação. Porém, não há hoje uma fonte confiável para os cinco status solicitados:

- `state` descreve maturidade editorial, não publicação;
- `PUBLISHED_AXES` é uma lista separada e não é usada pela interface;
- cada rota decide manualmente se mostra conteúdo ou `UnpublishedAxis`;
- `NextAxes` trata o estado editorial como se fosse um status visual.

Há divergências factuais com a lista do pedido:

- **Quem controla** está publicado, embora não esteja no menu principal.
- **Downloads** está publicado como catálogo em construção; um item já encaminha ao CSV disponível no Método.
- **Histórico** e **Em disputa** também estão publicados, mas não aparecem na lista fornecida para a matriz.
- De fato despublicados: **Condições, Dinheiro, Votos, Quem chega e Barreiras**.

Logo, os rótulos `publicado / em apuração / aguardando dado / pesquisa / estrutura` precisam ser definidos editorialmente por frente; não podem ser inferidos com segurança do campo atual.

## Arquitetura recomendada

### A. Navegação em duas camadas, sem duplicar investigações

Manter como navegação principal:

`Dados 2026 | O funil | Quem são elas? | Direitos | Método`

Mover **Sobre** para uma faixa utilitária discreta do header e mantê-lo no rodapé. Em desktop, “Dados 2026” abre um submenu acessível; em telas pequenas, expande a lista dentro do menu móvel.

Destinos iniciais recomendados:

- Brasil → `/`
- Estados → seção nomeada de `/quem-sao-elas`
- Partidos → seção nomeada de `/quem-sao-elas`
- Cargos → exibido como indisponível com status “estrutura” até existir conteúdo publicável; não criar link vazio
- Raça → `/quem-sao-elas`
- Histórico → `/historico`

Esta opção preserva URLs e conteúdo canônico, evita copiar a mesma análise em várias páginas e permite testar a nova hierarquia antes de abrir uma família inteira de rotas. Os links internos de Estados e Partidos devem usar âncoras estáveis nas seções já existentes.

**Alternativa de expansão futura:** criar `/dados-2026/estados`, `/dados-2026/partidos` e `/dados-2026/cargos` quando cada recorte tiver pergunta, achado, visualização, contexto e método próprios. Não recomendo criar agora páginas que apenas dupliquem blocos de `/quem-sao-elas`.

### B. Breadcrumb global com trilhas editoriais explícitas

Criar um componente único de breadcrumb e renderizá-lo pelo `PageShell`, logo abaixo do header e antes da abertura. A home não recebe breadcrumb.

O `PageShell` recebe uma trilha opcional por página; não tenta deduzir pais apenas pela URL. Isso evita hierarquias falsas, especialmente porque Raça e Histórico aparecem no submenu de Dados 2026, mas continuam investigações canônicas próprias.

Exemplos:

```text
Dados 2026 → Estados
Dados 2026 → Partidos
Dados 2026 → Histórico
Investigação → O funil
Projeto → Método
Projeto → Sobre
```

- O último item é texto com `aria-current="page"`.
- Itens anteriores são links do roteador.
- Em telas pequenas, a trilha quebra linha sem sobrepor a abertura.
- As âncoras de Estados e Partidos podem atualizar a trilha para três níveis somente quando houver estado de seção confiável; inicialmente, a trilha da rota permanece `Dados 2026 → Quem são elas?` para não fingir uma subrota.

### C. Uma única matriz reutilizável e uma única fonte de verdade

Evoluir cada registro de `AXES` para separar conceitos hoje misturados:

- `publication`: `published | unpublished`
- `status`: `publicado | em apuração | aguardando dado | pesquisa | estrutura`
- `statusNote`: justificativa curta e pública
- `group`: `investigacao | projeto | materiais`
- `parentId` opcional, para relações como Histórico dentro da navegação secundária de Dados 2026

A matriz lê somente essa estrutura. `PUBLISHED_AXES`, `NAV_ITEMS`, o rodapé, `NextAxes` e as telas despublicadas passam a ser derivados dela, eliminando listas divergentes.

Criar um componente único, por exemplo `InvestigationIndex`, com modos de apresentação — mesma informação e mesma lógica, sem dois componentes:

- **compacto:** resumo na home, se a proteção atual da home for explicitamente suspensa;
- **completo:** página própria com todas as frentes, pergunta, status e justificativa.

Recomendação: lançar primeiro a página própria, em uma rota como `/investigacoes`, e ligar a ela pelo header utilitário e pelo rodapé. A inclusão de uma versão compacta na home fica como decisão separada, porque a home continua sendo zona protegida.

## Lista editorial que precisa de confirmação

A matriz deve representar a realidade do site, portanto a recomendação é incluir os **15 eixos já declarados em `AXES`**, não apenas os 13 do pedido:

- Publicados hoje: Dados 2026, Quem são elas?, O funil, Histórico, Quem controla?, Direitos, Em disputa, Método, Sobre e Downloads.
- Despublicados hoje: Condições, Dinheiro, Votos, Quem chega? e Barreiras.

Os cinco status não devem ser inferidos automaticamente. Proposta inicial para revisão editorial:

| Frente | Status proposto |
|---|---|
| Dados 2026, Quem são elas?, O funil, Histórico, Direitos, Em disputa, Método, Sobre | publicado |
| Quem controla? | em apuração — página publicada, 2 de 5 alavancas investigáveis agora |
| Downloads | estrutura — catálogo publicado, materiais majoritariamente em preparação |
| Condições | em apuração — parte das fontes existe, cruzamentos ainda em fechamento |
| Dinheiro | aguardando dado |
| Votos | aguardando dado |
| Quem chega? | aguardando dado |
| Barreiras | pesquisa — fontes comparáveis ainda não integradas |

Aqui, “publicado” descreve uma frente editorial concluída para a versão atual; uma rota pode estar acessível e ainda receber “em apuração” ou “estrutura”. Se “publicado” tiver de significar apenas “URL acessível”, serão necessários dois selos separados — publicação e andamento — em vez de um único status.

## Sequência técnica após aprovação

1. Consolidar em `architecture.ts` os campos de publicação, status, grupo, parentesco e justificativa; remover a dependência de listas paralelas.
2. Derivar menu principal, submenu de Dados 2026, links utilitários e rodapé dessa estrutura.
3. Adicionar âncoras estáveis às seções existentes de Estados e Partidos; manter Raça e Histórico em suas rotas canônicas; deixar Cargos sem link até haver conteúdo.
4. Criar o breadcrumb compartilhado no `PageShell`, com trilhas explícitas por rota e sem breadcrumb na home.
5. Criar a página `/investigacoes` e o componente único da matriz; manter o modo compacto preparado, mas não inserir na home sem nova autorização.
6. Atualizar `NextAxes` e `UnpublishedAxis` para consumir os novos campos sem confundir maturidade, publicação e andamento.
7. Atualizar metadados e sitemap da nova página; testar menu por teclado, submenu móvel, trilhas, links, estados, telas pequenas e todas as rotas publicadas/despublicadas.

## Fora desta implementação

- Criar ou preencher a página de Cargos.
- Recalcular o snapshot ou adicionar dimensões ausentes.
- Duplicar Estados, Partidos, Raça ou Histórico em novas páginas.
- Inserir a matriz na home sem autorização específica.
- Alterar texto jornalístico, números, fontes, cálculos ou metodologia.
