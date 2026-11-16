# Quem são elas? — acessibilidade e prévia visual, terceiro lote (PR #31)

**Data:** 16/11/2026 · **branch de prévia:** `revista-acessibilidade-lote3-16nov2026` · **base:** PR #30 (`revista-acessibilidade-lote2-16nov2026`) · **situação:** sem merge e sem deploy.

## Escopo auditado
Sete modelos novos: **Coautoria** (`/coautoria`), **Comparar** (`/comparar`), **Direitos** (`/direitos`), **Materiais/Downloads** (`/downloads`), **Em disputa** (`/em-disputa`), **Pioneiras** (`/pioneiras`) e **Relatório 2026** (`/relatorio-2026`). Foram incluídas **homepage** (`/`) e **Método** (`/metodo`) como controles da linguagem visual e regressões.

São **9 URLs em 1440×900, 390×844 e 320×720 CSS px = 27 verificações**, com 18 capturas integrais (desktop e celular), axe-core 4.10.3 para regras com tags WCAG 2 A/AA, 2.1 AA e 2.2 AA, testes de HTTP, erros de JS, título principal, existência do conteúdo principal, transbordamento horizontal, 12 primeiras paradas de Tab e inventário de imagens com `alt`, carregamento e legenda. Rotina: `.github/workflows/qa-acessibilidade-lote3-16nov.yml`.

## Falha comprovada e intervenção mínima
**Antes:** [GitHub Actions #43939874034](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43939874034) executou 27 verificações. Detectou **uma falha de contraste na página Relatório 2026, repetida nos três tamanhos** (três grupos na saída do axe, cada um com quatro nós). Os quatro textos pequenos sobre coral `#c53f22` usavam `text-paper/80`, gerando contraste calculado de **3,72:1** (mínimo de 4,5:1 para texto comum). Eram: o rótulo “Violência e participação”, a nota introdutória e duas referências das fontes TSE/MPF e FBSP.

**Correção:** em `src/routes/relatorio-2026.tsx`, valor de `secundario` dos capítulos `claro` de `text-paper/80` para `text-paper`. Fundo coral, roxo, dourado, demais cores, dados, texto, tamanho e disposição dos capítulos, fotografias, fontes e documentos preservados. Nenhuma alteração de CSS global.

**Depois:** [GitHub Actions #43940312286](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43940312286) registrou **27 verificações, zero violações automáticas das regras selecionadas e zero erros de execução**.

## Testes complementares de uso
[Execução #43941258951](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43941258951) **aprovada**: novamente 27 verificações, zero violações automáticas e zero erros de execução, mais **oito testes funcionais** (quatro operações em desktop e celular):
1. **Comparar:** botão Estados habilita o modo territorial, os três seletores são exibidos, o primeiro estado selecionado permanece.
2. **Downloads:** o resumo “Colunas e SHA-256” recebe foco e abre com Enter, e existem links para baixar CSVs locais.
3. **Relatório:** índice contém cinco capítulos e a âncora leva ao capítulo correspondente.
4. **Pioneiras:** a fotografia histórica carrega e possui texto alternativo e legenda.

A primeira versão do teste de interação [#43940969447](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43940969447) parou por um seletor de teste excessivamente estrito para o rótulo que contém `select`. A asserção foi corrigida no **workflow**, não no código do site. Não apresentar esse erro do teste como defeito editorial ou funcional.

**Evidências de página inteira:** [artefato de capturas do PR #31 na execução aprovada #43940312286](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43940312286/artifacts/14263146225). Os arquivos exibem a versão do site com o ajuste de contraste, antes da alteração posterior exclusiva no workflow de teste. As páginas, fotografias e composição são as mesmas. Capturas adicionais do teste final podem ser consultadas no último workflow.

## Direção visual e acervo: observação do estado, sem redesign novo
A homepage fotográfica aprovada continua como controle. Em **Método**, uma captura fiel do portal de dados do TSE aparece com fotografia contextual da bancada; em **Pioneiras**, fotografia histórica de Bertha Lutz; em **Coautoria** e **Relatório**, foto de plenário identificada; em **Materiais**, miniaturas de PDFs e infografias distinguem objetos editoriais dos próprios documentos. **Direitos, Em disputa e Comparar** têm papel principal documental ou analítico, sem introdução de foto decorativa.

Todas as imagens do conjunto auditado carregaram nos três viewports. Há miniaturas sem `figcaption` autônomo, mas isso não significa falha automática: avaliar caso a caso se funcionam como navegação, peça gráfica ou imagem documental, com legenda/crédito acessível no contexto. O CI não aprova juridicamente licenças; imagens/fac-símiles pendentes no PR #27 **continuam sem autorização editorial/jurídica** para publicação.

Foram preparadas **duas pranchas de demonstração** com recortes de capturas reais de desktop e celular (não são simulações nem telas do site publicado), e um arquivo ZIP com 12 capturas integrais de homepage, Método, Pioneiras, Relatório, Coautoria e Materiais. A entrega visual foi feita na conversa; as capturas técnicas integrais do CI seguem no artefato acima, sujeito à retenção de 14 dias.

### Ponto de atenção visual
Na leitura mobile, títulos longos do **Relatório 2026** ocupam grande parte da primeira tela. A intervenção não alterou tipografia porque requer comparação visual e decisão editorial; evitar redução automática que banalize a hierarquia. Também avaliar ritmo das páginas longas e densidade das legendas sem remover documentação e sem retornar a superfícies brancas/lilases genéricas.

## Balanço corrigido dos 35 modelos de conteúdo
A matriz editorial `docs/matriz-fotografias-documentos-graficos-16nov2026.md` contém **35 modelos**. O balanço anterior de 20 auditados/15 pendentes subcontou **Ficha individual de eleita** e **Tema individual**, ambos já testados como variações no PR #29 (`/eleitas/perpetua-almeida-ac` e `/temas/dinheiro`). Portanto:
- PR #28: **6** modelos de conteúdo (homepage foi controle);
- PR #29: **9** modelos (7 modelos de entrada + 2 modelos dinâmicos representados por amostras);
- PR #30: **7** modelos;
- PR #31: **7** modelos;
- **Total: 29 de 35 modelos com ao menos uma amostra de auditoria. Restam 6 modelos:** Lélia Gonzalez, Pagu, Quem chega, Quem são elas? / candidatas, Sobre e Votos.

**Ressalva metodológica:** testar um exemplar da ficha e um dos seis temas não cobre automaticamente todas as pessoas, temas e estados. O número 29 é de modelos **amostrados**, não de páginas individualmente certificadas.

## Limites e liberação
Zero violações detectadas pela seleção de regras do axe não declara conformidade WCAG 2.2 AA. Faltam NVDA/VoiceOver, zoom efetivo de 200%, texto ampliado e reespaçado, uso de filtros em todos os estados e avaliação humana com diferentes perfis de leitores. Direitos e privacidade do acervo documental seguem pendentes. **Não mesclar este PR nem executar deploy sem decisão editorial.**