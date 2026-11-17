# Quem são elas? — revisão integral de Achados, Barreiras e Histórico

**Data:** 16/11/2026. **Branch:** `revista-consolidada-ajustes-de-ritmo-16nov2026` · [PR consolidado #33](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/pull/33), **rascunho**, base `main` · **sem merge/deploy**.

## Âncora, método e escopo

A direção já acordada segue a [âncora editorial dos três pilotos](design/ANCORA-EDITORIAL-PILOTOS-16NOV2026.md), o manual visual e a matriz `docs/matriz-fotografias-documentos-graficos-16nov2026.md`: **roxo estrutural, tinta, coral profundo com texto claro, creme quente de leitura e dourado**. Fotografia documental, gráfico ou reprodução fiel de documento entram apenas quando acrescentam evidência pertinente. Alternância de superfícies e escala deve valer para a **página inteira**, não só a primeira dobra; sem voltar ao padrão uniforme branco/lilás, sem trocar logo ou homepage e sem criar outra paleta.

Esta rodada retomou três rotas: **Achados** (`/achados`), **Barreiras** (`/barreiras`) e **Histórico** (`/historico`), mais **homepage** e **Método** como controles de referência visual. Antes de alterar, foram conferidos os componentes e capturas integrais de rodadas anteriores. Depois, executaram-se capturas novas da mesma versão consolidada.

### Decisões e estado de implementação

| Página | Estado encontrado | Intervenção no PR #33 | Justificativa |
| --- | --- | --- | --- |
| **Achados** | Abertura em tinta, destaques em roxo, capítulos por tema alternados entre papel/tinta/ameixa, fichas com número, barras, fonte e link individual. | **Nenhuma mudança de composição.** | A página já atende à direção existente. Adicionar fotografia sem relação com achado ou impor outro padrão cromático seria regressão. |
| **Barreiras** | Capa editorial e três documentos oficiais em coral; depois, sequência de áreas pálidas com séries, dados do Anuário e classificação de lacunas. | Capítulo de **processos autuados** em tinta com os dois gráficos originais intactos, legendas claras e link preservado; **feminicídio** em creme quente; **formas documentadas** em roxo estrutural com leitura sobre papel; **critérios** em creme quente. | Diferenciar **lei, registro processual, indicador de feminicídio, classificações e método** no próprio percurso. Não representar casos e vítimas por imagens genéricas. |
| **Histórico** | Capa roxa com quatro eleições; visualizações longas, material de origem TSE, interlúdio coral e capítulos de tinta, ainda com uma sequência analítica visualmente homogênea. | Primeira série **Gênero** em creme quente; capítulo por cargo/UF conservado em creme quente, com uma **pausa editorial em tinta entre tabela por cargo e comparação territorial** (quatro eleições, denominador de cadeiras da própria UF). | Manter a estabilidade das cores **2014–2022** versus **2026** dentro dos gráficos e orientar a mudança de universo de cargo para território sem reestruturar séries ou inventar dados. |

**Preservado:** número e data dos achados, suas barras e origens, série de processos do TSE/MPF, distinção entre processo, caso e vítima, referência à Lei 14.192/2021 e ao MPF, dados do Anuário Brasileiro de Segurança Pública e sua agregação explícita de pretas+pardas, dados TSE 2014–2026, universos eleitoral proporcional/majoritário, denominadores, códigos e métodos de cálculo, arquivos, legendas, decisões anteriores, logo, homepage, fotos existentes, CSS global e o componente geral `SectionBlock`.

## Evidência de construção e navegação

[GitHub Actions #43956945141](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43956945141) — **aprovada**, no commit `c881d502421b03184fdd2c730cb6277c3978bc6f`.

- Compilação TypeScript e build HostGator passaram.
- **5 URLs × 3 larguras CSS (1440 × 900, 390 × 844, 320 × 720) = 15 verificações**, zero violações automáticas detectadas pelas regras selecionadas do axe-core 4.10.3 (tags WCAG 2 A/AA, 2.1 AA, 2.2 AA), zero erros de execução e ausência de transbordamento horizontal de página.
- **Seis interações aprovadas**: em desktop e celular, menu de âncoras e fichas de Achados; presença de três links originais da seção documental, dois gráficos de processos e seção de feminicídio em Barreiras; navegação por âncora e troca efetiva de UF no seletor de Histórico.
- **10 capturas integrais** (cinco páginas em desktop e celular), além de logs JSON e amostras das primeiras 12 paradas de Tab. [Artefato do GitHub Actions](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43956945141/artifacts/14271283123), sujeito ao período de retenção do GitHub.
- O [QA consolidado com a prévia fotográfica de Pagu #43956944953](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43956944953) também passou no mesmo head: build normal protege retratos pendentes e build especial de prévia mostra foto de Pagu apenas mediante flag de revisão.

**Capturas integrais dimensionadas:** Achados, desktop 1440 × 11149 e celular 390 × 19168; Barreiras, desktop 1440 × 5872 e celular 390 × 9500; Histórico, desktop 1440 × 12479 e celular 390 × 19513. São alturas do **estado inicial de consulta** e da viewport/captura, não metas de comprimento. Os trechos foram organizados em pranchas para aprovação editorial; o pacote entregue contém todos os PNGs, não apenas recortes.

## Fotografias e documentos

**Achados:** cada cartão traz gráfico próprio e caminho para a ficha citável. Sem imagens de pessoas ou fotos institucionais avulsas na indexação, por falta de nexo com os números; essa ausência não caracteriza falha visual.

**Barreiras:** índice coral reúne **Lei nº 14.192/2021** (texto oficial no Planalto), **painel TSE/MPF** (processos agregados) e **arquivo de representações do MPF** (atuações específicas), com links originais. Não converter a lista em falso fac-símile nem sugerir que uma representação prova crime. Não usar fotografia de vítima ou acusada apenas para preencher espaço. Os dados do Anuário têm metodologia própria e não se somam a processos eleitorais.

**Histórico:** as quatro bases eleitorais TSE já são encaminhadas no caderno documental, com datas e lacunas. Fotografias de personagens de outras épocas não devem ilustrar estatísticas 2014–2026 como se fossem registro dessas eleições. As visualizações já são o material jornalístico pertinente, sem a necessidade de imagem sintética.

A falta de imagem quebrada ou violação automatizada **não comprova direitos de publicação**: Pagu e Lélia permanecem sob controle de licença; quatro fac-símiles do PR #27 e a captura da interface do portal TSE continuam na fila individual de decisão editorial/jurídica. Nenhuma dessas pendências foi alterada neste lote.

## Limites e próximo critério de aceite

A auditoria cobre os **modelos e estados iniciais testados**; não certifica WCAG 2.2 AA, não testa leitor de tela real (NVDA/VoiceOver), zoom de 200% no navegador, reespaçamento arbitrário nem todas as combinações de consultas. A leitura de tabelas longas no celular, sobretudo Cargo × ano e demais séries do Histórico, precisa de conferência editorial e funcional detalhada, incluindo affordance de rolagem e foco.

O **PR #33 é o único PR de consolidação** para inspeção final comparada à `main`. Não alterar conteúdo eleitoral, legal ou jornalístico por uma demanda de cor. Aprovar separadamente a composição, as imagens pendentes e a publicação. **Sem merge, deploy, atualização HostGator ou créditos Lovable até decisão expressa da editora.**
