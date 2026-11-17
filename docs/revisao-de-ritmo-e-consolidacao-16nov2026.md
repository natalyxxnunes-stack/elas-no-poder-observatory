# Quem são elas? — recuperação de identidade e consolidação da revista

**Data:** 16 de novembro de 2026. **Ambiente:** `revista-consolidada-ajustes-de-ritmo-16nov2026`, PR #33, rascunho baseado diretamente em `main`. **Situação:** não publicado e sem merge; a cadeia anterior de PRs permanece intacta.

## Por que este PR existe

A avaliação editorial detectou uma regressão de processo: as rodadas dos PRs #28–#32 fizeram controle automatizado de acessibilidade, mas não resolveram os trechos internos extensos de páginas claras e a ausência das fotografias históricas planejadas. As correções isoladas ficaram distribuídas em PRs sucessivos, todos em rascunho. A editoria exige continuar uma única identidade já definida, sem reiniciar a direção visual em cada conversa.

**PR #33 é a fotografia consolidada da ponta do PR #32, comparada diretamente com `main`, com correções restritas ao ritmo de páginas inteiras.** Ele não reinicia nem substitui o sistema: resgata a âncora `docs/design/ANCORA-EDITORIAL-PILOTOS-16NOV2026.md` e este manual. Logo e homepage, roxo estrutural, tinta, coral profundo apenas com texto claro, dourado e creme de leitura, Fraunces e a semântica cromática dos dados seguem intactos. **Não introduzir vinho como cor estrutural nem fotografia sintética.**

## Diagnóstico documental e visual

O arquivo de referência dos pilotos define, para **Quem entrou?, Método e Reportagens**, a alternância de massa cromática, fotografia com procedência, documentos e gráficos em **páginas inteiras**. A matriz `docs/matriz-fotografias-documentos-graficos-16nov2026.md` separa lugares onde a fotografia agrega informação dos lugares em que documentar/visualizar dados é melhor. A análise dos screenshots completos dos PRs #29–#32 identificou longos trechos visualmente pálidos: mais relevantes em Direitos, Quem chega, Lélia Gonzalez, Pagu, Downloads, Votos e Sobre.

**Checagem indicativa, não avaliação estética automática:** para cada captura desktop 1440 px, entre y=150 e o final, foram amostradas linhas a cada 25 CSS px, em seis posições horizontais (8%, 20%, 38%, 60%, 80%, 92%). Uma linha foi marcada como predominantemente clara quando quatro dessas seis amostras tinham RGB mínimo acima de 206 e diferença entre canais abaixo de 48. O percentual da tabela expressa **linhas amostradas claras**, não porcentagem de pixels brancos, qualidade artística ou certificação. As capturas vêm dos artefatos dos PRs #29–#32, comparadas com a prévia do PR #33 validada em [GitHub Actions #43949426177](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43949426177).

| Página | Antes | Nova prévia | Intervenção editorial localizada |
| --- | ---: | ---: | --- |
| Lélia Gonzalez | 80% | 64% | Abertura roxa, capítulo documental em dourado, biografia como leitura em papel sobre tinta, intervalo de dados das duas candidaturas |
| Pagu | 71% | 59% | Foto em modo exclusivo de prévia, moldura coral, biografia em página de tinta e intervalo coral baseado nos 171 votos |
| Direitos | 91% | 83% | Linha do tempo em creme quente com coluna roxa para o ano; capítulo Pioneiras em tinta; caderno de regras preservado |
| Quem chega | 83% | 73% | Senado tratado como capítulo de tinta com área de leitura em papel; Cor/raça, estados, partidos e camada de poder alternam superfícies |
| Votos | 76% | 72% | Território com título em tinta e tabela sobre papel; quatro conceitos em creme quente |
| Materiais | 77% | 73% | Catálogo quente, arquivos em capítulo de tinta com área documental em papel, encerramento contextual |
| Sobre | 73% | 69% | Fundo editorial para princípios, leitura do projeto, acervo e correções; sem fotografia institucional inventada |

**Não converter os percentuais em metas cromáticas fixas.** Algumas páginas precisam de campos claros para tabelas extensas e documentos. A medida ajuda a localizar monótonos blocos, mas o juízo de edição continua humano. Os nomes de cargos, dados, contagens, denominadores e documentos originais não foram alterados por esta intervenção.

## Resgate das fotografias de Lélia e Pagu

**Pagu:** o arquivo `public/fotos/pagu-patricia-galvao-anos-1920.jpg` já existe em `main`. A ficha em `src/data/fotos.ts` registra Commons, autoria desconhecida, atribuição de data nos anos 1920 e licença `verificacao-pendente`. A composição já havia sido proposta e implementada em branch de teste: **retrato na abertura de tinta com moldura coral e legenda**, segundo `docs/acervo-visual-etapa2.md`. O código posterior bloqueava completamente essa exibição, mostrando apenas a ficha tipográfica. No PR #33, a foto volta **exclusivamente quando a variável de compilação `VITE_QSE_PREVIEW_PAGU_FOTO=true` é definida**, com aviso visível de que os direitos ainda estão pendentes. O build normal continua a mostrar a ficha tipográfica e não a foto.

**Lélia Gonzalez:** houve localização de referências fotográficas, mas nenhum retrato foi incorporado ao registro local `src/data/fotos.ts`. O [arquivo do Wikimedia Commons atribuído a Cezar Loureiro](https://commons.wikimedia.org/wiki/File:L%C3%A9lia_Gonzalez_by_Cezar_Loureiro.jpg) informa autoria, origem na revista *Cult* e indicação de domínio público baseada em enquadramento específico da legislação brasileira. Essa classificação exige verificação antes de reprodução, sem presumir que qualquer retrato com autoria identificada esteja liberado. **Não se inseriu foto de Lélia na versão publicada ou na branch**; a abertura recebeu projeto cromático forte e manteve o registro eleitoral com rótulo explícito de reprodução tipográfica. A ausência de licença continua como pendência individual de apuração, não como decisão estética de banir fotografias.

**Licenciamento:** a descrição do [retrato de Pagu no Commons](https://commons.wikimedia.org/wiki/File:Patricia_Galvao.jpg) indica domínio público, autoria desconhecida e fonte de publicação de 2008, mas não estabelece com segurança data de primeira divulgação nem cadeia completa de direitos. Não converter unilateralmente `verificacao-pendente` em domínio público. A prévia não autoriza deploy, comercialização ou publicação.

## Testes e reversibilidade

- O PR mantém **todas as decisões/arquivos da cadeia de PRs anterior** por ser criado do head do PR #32. Referência aprovada para direção de arte: `docs/design/ANCORA-EDITORIAL-PILOTOS-16NOV2026.md`. Os outros PRs não foram fechados nem deletados.
- Código modificado no PR #33 em Pioneiras (componente de cabeçalho), Lélia, Pagu, Direitos, Quem chega, Votos, Downloads e Sobre; sem alterar texto de apuração, dados oficiais, gráficos semânticos, a logo, a homepage, o CSS global ou imagens da publicação.
- [Execução de prova cromática e de conteúdo #43949426177](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43949426177): TypeScript/build, 9 URLs × 3 larguras = 27 verificações, sem violações detectadas pelas regras axe selecionadas, nem erro JS ou de execução, com capturas completas desktop/mobile.
- [Execução com duplo build, normal e com foto em prévia #43950227435](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43950227435): **sucesso**. Confirmado no navegador que **Pagu e Lélia não renderizam retratos pendentes no build normal**, mantendo as fichas; o build separado com variável explícita mostra a foto de Pagu com alternativa e legenda; 27 verificações axe sem violações selecionadas.
- A aprovação automática não equivale a aprovação estética ou WCAG 2.2 AA integral. Capturas em 320 px não equivalem a zoom real de 200%, NVDA/VoiceOver ou avaliação de uso por pessoas.

## O que falta para o encerramento editorial

1. **Revisão visual conjunta em páginas completas** das áreas muito extensas e das variantes dinâmicas, com as capturas do PR #33 como referência, sem inventar novos layouts. Avaliar primeiro Hierarquia das manchetes no celular, Direitos e Quem chega; em seguida Achados/Barreiras/Histórico, que possuem longas seções de dados em campo claro, para distinguir legibilidade de monotonia.
2. **Direitos e fontes das imagens:** encaminhar decisão individual para Pagu, Lélia, captura do portal TSE e quatro recortes documentais do PR #27. Autorizações não inferidas de repositório público ou de licença de datasets.
3. **Controle manual de acesso:** teclado integral, menus mobile, zoom 200%, reespaçamento e leitores de tela.
4. **Aceite editorial:** depois das avaliações, conferir o diff total da PR #33 contra `main`; nenhuma publicação automática, nenhum merge ou HostGator sem autorização da editora. Manter o projeto em um único PR consolidado até o aceite, em vez de criar outra cadeia de redesign.

**Estado da direção:** preservada. **Estado de entrega:** prévia consolidada recuperada, tecnicamente verificada; liberação editorial e jurídica ainda pendentes.