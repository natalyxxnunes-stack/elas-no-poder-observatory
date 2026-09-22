# Aberturas editoriais das páginas internas

## Objetivo

Aplicar fielmente a direção visual da referência às dez aberturas internas, sem alterar a home, o conteúdo jornalístico, os cálculos, as fontes, as rotas, os links ou o estado de publicação de cada eixo.

## Escopo visual

- Manter Fraunces, Work Sans e IBM Plex Mono, a paleta editorial existente e a linguagem de linhas, grids, blocos sólidos e dados da home.
- Tornar o cabeçalho interno tão compacto quanto o da home: logo à esquerda, navegação completa centralizada e busca à direita no desktop; menu compacto no mobile.
- Retirar das aberturas as ilustrações geradas por IA, preservando esses arquivos apenas onde já forem necessários para compartilhamento ou conteúdo secundário.
- Não adicionar rabiscos, colagens, post-its, stickers ou ornamentos sem função editorial.

## Sistema compartilhado, composições distintas

Criar um componente de abertura editorial com base comum de semântica, tipografia, espaçamento, acessibilidade e responsividade, mas com dez variantes estruturalmente independentes:

1. **Funil** — fundo roxo, título à esquerda e funil geométrico dominante à direita. Os números virão da fotografia vigente já carregada pela rota; etapas sem resultado continuarão explicitamente indisponíveis.
2. **Histórico** — fundo solar e timeline horizontal como eixo principal, usando anos e marcos já presentes na série histórica.
3. **Direitos** — fundo coral, composição diagonal/vertical de marcos jurídicos extraídos de `RIGHTS_TIMELINE`, sem duplicar o desenho do Histórico.
4. **Condições** — roxo e papel, processo conectado em cinco etapas formado pelo conteúdo real já existente na página, sem grade genérica de cartões.
5. **Dinheiro** — tinta, roxo e solar, com barras editoriais de disponibilidade/camadas; como os valores financeiros de 2026 ainda não existem, a abertura mostrará a lacuna real em vez de percentuais simulados.
6. **Quem chega** — verde e matriz de assentos/representação; como o resultado de 2026 ainda não existe, a matriz comunicará visualmente “aguardando apuração”, sem atribuir proporção fictícia.
7. **Quem controla** — fluxograma responsivo Partidos → listas/recursos/território → acesso ao poder, derivado das cinco alavancas já publicadas.
8. **Método** — solar, papel e roxo, com a sequência 01 Fonte, 02 Universo, 03 Denominador, 04 Cálculo e 05 Atualização, usando formulações já existentes na página.
9. **Sobre** — abertura tipográfica assimétrica sobre papel, com grandes formas geométricas em roxo e coral e sem imagem de pessoas.
10. **Downloads** — verde e sistema documental em CSS/HTML, representando somente os formatos reais do catálogo atual; itens não publicados continuarão marcados como em preparação.

## Integração por página

- Substituir apenas a chamada de abertura em cada uma das dez rotas; todo o conteúdo abaixo dela permanece intacto.
- Passar para cada variante somente dados e textos que já existem na própria rota, em constantes editoriais ou nos loaders atuais.
- Manter `/condicoes`, `/dinheiro` e `/quem-chega` com o estado atual de despublicação. Suas composições serão preparadas no conteúdo preservado, sem transformar esta mudança visual em publicação.
- Preservar SEO e imagens sociais atuais; a remoção vale para a abertura visível, não para Open Graph.
- Não modificar as aberturas de eixos fora das dez páginas pedidas nesta rodada.

## Responsividade e acessibilidade

- Desktop: cabeçalho entre aproximadamente 48–60 px, navegação inteira visível e abertura iniciando sem vazio excessivo.
- Mobile: reorganizar timeline, processo, barras, matriz, fluxograma e documentos verticalmente sem reduzir textos ou dados até ficarem ilegíveis.
- Gráficos e diagramas terão nome acessível, leitura textual equivalente e estados de lacuna explícitos.
- Elementos com texto e widgets usarão grades resilientes, `min-w-0`, truncamento ou quebra controlada onde necessário.

## Validação

- Conferir visualmente as dez páginas em desktop e mobile, comparando diversidade, cor dominante, proporções e hierarquia com a referência.
- Verificar que, sem os títulos, cada abertura continua reconhecível pelo seu sistema visual próprio.
- Confirmar cabeçalho compacto, navegação completa, ausência de ilustrações de IA nos heroes e ausência de estouro horizontal.
- Confirmar que a home não teve mudanças visuais ou estruturais.
- Rodar a verificação de tipos e confirmar resposta 200 nas páginas publicadas; nas despublicadas, confirmar que o comportamento existente foi preservado.
