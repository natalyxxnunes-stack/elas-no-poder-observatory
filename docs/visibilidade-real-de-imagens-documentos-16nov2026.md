# Visibilidade real de fotografias, documentos e fontes — PR #33

**Data:** 16/11/2026. **Estado:** prévia na branch `revista-consolidada-ajustes-de-ritmo-16nov2026`; nenhum merge/deploy.

## Problema e constatação

A editora observou corretamente que **não era possível ver imagens** na prancha de quatro páginas apresentada. O material entregue comprimira integralmente quatro screenshots longos numa única grade de cerca de 1760 × 1472 px, impossibilitando examinar as fotografias, páginas do TSE, índices da Câmara ou visualizações. Isso não é um modo satisfatório de prestar contas de uma direção de arte. Abrimos os screenshots originais e os dividimos em janelas de leitura com mais de mil pixels de largura.

| Página | Comprovação visual real | Local no percurso | Natureza/limitação |
|---|---|---|---|
| `/quem-controla` | `/documentos/tse-pl-processo-fefc-capa-2026.png` | Capítulo coral, após o índice FEFC em tinta | **Capa do processo PJe PL**, não a resolução nem prova de execução financeira |
| `/dinheiro` | `/documentos/tse-uniao-brasil-resolucao-cen043-2026.png` e `/documentos/tse-fe-brasil-resolucao-14-2026.png` | Capítulo roxo após a seção de critérios | Duas **páginas originais de resoluções** anexadas a processos do TSE. A Federação está anexa ao processo do PT, sem ser resolução exclusiva do partido |
| `/reportagens` | `/fotos/plenario-igualdade-salarial-2023.jpg` | Depois do painel de seis votações | **Fotografia real do plenário em maio de 2023**, não retrata nem comprova as seis votações |
| `/na-voz-delas` | `/documentos/camara-sitaq-julia-zanatta-2026-03-10-p163.png` | Agora **imediatamente após a abertura**, em interlúdio de revista roxo, com imagem original ampliável | **Uma linha da pesquisa de discursos**, documento de localização e não imagem da página 163 do Diário da Câmara |

## Intervenção no código

`src/routes/na-voz-delas.tsx`: novo `EvidenciaCatalogoCamara` ao lado do tratamento tipográfico da página **163**, com fundo roxo, painel de papel e recorte fiel; link ao sistema da Câmara, identificação do documento e ressalva sobre o que não comprova. Mantidas as falas e respectivas fontes. `src/components/editorial/IndicesDocumentaisCamara.tsx`: aceita `incluirRecorte` com padrão `true`; a rota passa `false` no índice final e evita reproduzir a mesma captura duas vezes.

## Verificação

[GitHub Actions #43973899797](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43973899797), sucesso: TS/build e axe selecionado de cinco rotas × três larguras (1440/390/320); seis verificações de navegação e documentação em desktop/celular, inclusive leitura real da imagem original na página de falas, legenda e link. Capturas originais no artefato `qse-investigacoes-capturas` desse workflow. A verificação não confere toda a qualidade visual nem liberação de reprodução: aprovação editorial e eventuais pendências de direitos continuam separadas.

**Nova regra de apresentação:** sempre manter a página inteira arquivada; apresentar à editora **também** janelas ampliadas dos materiais efetivamente inseridos, com legenda precisa. Uma montagem geral não permite verificar presença, tamanho, qualidade, autoria ou legibilidade da evidência. Não declarar concluída a identidade só porque o componente existe no código ou não tem erros de carregamento. A versão publicada não mudou; PR #33 ainda em rascunho.
