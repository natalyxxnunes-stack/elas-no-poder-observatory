# Fechamento do redesign — controle das etapas 2, 3, 4 e 5 (PR #33)
**Registro:** 16/11/2026. **PR:** https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/pull/33 · **base:** main. **Estado verificado nesta rodada:** draft, sem merge. **Natureza:** relatório de progresso e bloqueios de liberação; não representa aceite final.

## 2. Imagens, direitos e documentos
- **Sete decisões individuais**: `docs/etapa2-matriz-definitiva-direitos-imagens-16nov2026.md`. Retratos de Pagu e Lélia continuam com `verificacao-pendente`, ocultos no build normal; prévias especiais com fotografia não implicam direito de publicação. Interface TSE substituída por referência ao dataset e link oficial, com exclusão da captura do pacote de publicação. Duas resoluções partidárias, capa processual PJe e linha SITAQ continuam com reprodução proporcional e legendas individualizadas, sujeitas às ressalvas jurídicas da matriz.
- **Alternativa autoral para Pagu e Lélia:** novas composições SVG em `public/arte-editorial/pagu-colagem-tipografica.svg` e `.../lelia-colagem-tipografica.svg`. São peças tipográficas com formas e cores estruturais existentes, sem retratos, gráficos numéricos inventados, jornal histórico inventado ou simulação de fac-símile. Legenda explícita de ilustração editorial. As fichas eleitorais permanecem abaixo das peças. Não houve mudança nos resultados e denominadores.
- **Aceite artístico da editora:** PENDENTE de visualizar as duas novas peças *nas páginas completas*, em desktop e celular. A etapa 2 está resolvida como **classificação editorial de usos**, não como concessão de direitos ausentes; não declarar licença das fotografias.

## 3. Testes finais de experiência e acessibilidade
| Verificação | Evidência / estado real | Encaminhamento |
| --- | --- | --- |
| Testes automáticos anteriores (axe, reflow simulado, navegação amostral) | Relatórios já citados em `docs/triagem-direitos-e-a11y-final-16nov2026.md` e `docs/parecer-editorial-visual-etapa1-16nov2026.md`; executados em commits anteriores, não nas novas peças | Não reutilizar como aprovação do HEAD atual |
| Captura integral das 43 rotas em 1440 e 390 px | Script `scripts/qa/aceite-visual-integral-pr33.py` já contempla Pagu e Lélia; workflow agora observa alterações de imagens e componente | **Ainda não há resultado confirmado para este novo HEAD.** Baixar e examinar imagens integrais do próximo run |
| Bloqueio de imagens restritas, integridade das duas artes SVG | Novo passo no workflow de captura, testando XML e ausência das três mídias restritas no build; script de links também exige ausência da captura TSE | **Código de teste registrado, execução ainda não comprovada** |
| Teclado real: menu, busca, filtros, tabelas e foco visível | **Não executado nesta rodada em navegador real** | Percorrer ações sem mouse em desktop e celular com teclado físico; testar Escape, Enter, setas, Tab e Shift+Tab |
| Zoom nativo 200% / reflow em navegador | **Não executado nesta rodada**. Testes anteriores simularam largura, não zoom nativo | Teste real 200% em Chrome/Firefox, sem cortes/rolagem lateral indevida |
| NVDA ou VoiceOver: títulos, imagens, gráficos, tabelas, controles e mensagens de erro | **Não executado nesta rodada** | Leitura assistiva humana, registrar dispositivo, versão, rota e falha |
| Links externos | Auditoria anterior verificou URLs internas, não respostas HTTP de destinos externos | Conferir destinos primários TSE/Câmara/Senado e atualidade dos identificadores |
| Contraste, escala, documentação visual | QA prévio em outros commits; novas artes têm legendas e `alt`, mas contraste perceptivo e leitura no celular precisam de inspeção | Conferir escala original e legibilidade |

**Não declarar etapa 3 aprovada ou concluir que não há falhas.** Correção efetiva encontrada nesta rodada: o QA de variantes ainda procurava screenshot de interface TSE; a condição foi atualizada para exigir referência oficial e ausência do PNG. Nenhum problema de uso real foi afirmado sem teste.

## 4. Revisão contra main
**Comparação concreta nesta rodada:** `main...revista-consolidada-ajustes-de-ritmo-16nov2026`, branch à frente da main, sem commits faltantes no momento da consulta; **129 arquivos diferentes**, abrangendo documentação, workflows, componentes, rotas, fotos, documentos e configuração estática. Uma diferença no arquivo `src/data/temas.ts` e a inclusão de `src/data/documentos-eleitorais-2026.ts` são documentais/editoriais; `src/data/fotos.ts` controla licenças. Na comparação por nomes, não constam substituições dos datasets centrais de candidaturas, eleitas, votos e finanças, nem `src/routes/index.tsx`, logo ou stylesheet global. **A conferência por nome não substitui leitura linha a linha** de todas as mudanças e testes sobre dados.
- **Correção transversal desta rodada:** desatualização dos testes após retirar o screenshot TSE; ajustados workflow de variantes, QA de integridade de links e workflow de capturas para novos arquivos.
- **Pendências para liberar PR:** build TypeScript e HostGator no HEAD mais recente; verificação estrutural dos SVG e arquivos proibidos; capturas integrais legíveis; testes manuais da etapa 3; verificação final de créditos e ausência de dados pessoais sensíveis nos PNGs; validação humana de páginas e diff; aprovação explícita da editora.
- **Não usar “PR pronto” antes de satisfazer esses itens.** Documentar problemas e correções reais com commit e resultado dos testes, sem nova revisão estética global.

## 5. Publicação na HostGator
**NÃO AUTORIZADA / NÃO EXECUTADA.** Após aceite expresso: integrar apenas a versão examinada, publicar no ambiente contratado, verificar domínio público, navegação, 342 fichas individuais, seis variantes de temas, documentos, SVGs, fotografias autorizadas, desempenho e celular. Guardar evidência de versão publicada, diferenças contra a prévia e quaisquer correções posteriores. Nenhuma ação deste relatório implica merge ou deploy.

## Governança e memória visual
O redesign continua guiado pela âncora `docs/design/ANCORA-EDITORIAL-PILOTOS-16NOV2026.md`: roxo estrutural, tinta, coral profundo com texto claro, dourado e creme apenas onde a leitura pede. Logo e home preservadas. Fotografias documentais com direitos comprovados, documentos originais e gráficos de dados mantêm precedência jornalística sobre colagens. A colagem autoral serve a páginas específicas e não vira template universal.


## Complemento da revisão de acessibilidade e regressão

- No roteiro `scripts/qa/reflow-teclado-fechamento.py`, Pagu e Lélia passaram a integrar as rotas cobertas nas três configurações simuladas (desktop, reflow equivalente e espaçamento ampliado). Foram incorporadas verificações de carregamento dos SVGs, texto alternativo, legenda com identificação de ilustração e ausência dos retratos bloqueados na interface normal. **Essas verificações foram programadas, não há resultado de execução certificado neste registro.**
- O teste de variantes foi atualizado porque a antiga asserção exigia a captura do TSE que a decisão de direitos retirou da interface. O controle atual requer link ao conjunto de dados e ausência da imagem restrita.
- **Limitação da consulta à automação:** a ação conectada ao GitHub para listar execuções por commit retorna somente workflows associados a evento de pull request; os workflows existentes usam `push` e `workflow_dispatch`. Assim, resposta vazia não prova que não rodaram; tampouco autoriza afirmar aprovação. Conferir a aba Actions e anexar IDs dos runs antes de encerrar a etapa 3.


## Complemento de QA efetivamente executado no fechamento (16/11, horário de Brasília; Actions em UTC)
**Correções objetivas identificadas nos logs e aplicadas no PR #33:**
1. O workflow de fotografias interpretava qualquer `main header figure img` como retrato sem autorização. Após as colagens SVG, a asserção era falsa: revisão em `.github/workflows/qa-ritmo-revista-integrada-16nov.yml` distingue `/arte-editorial/` de `/fotos/`, verifica alt, legenda e ficha. **Run #44005143797: sucesso** (https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/44005143797).
2. A auditoria integral no run #44002544824 exibiu **43 rotas, 86 capturas e duas falhas objetivas em `/dados` (desktop e celular)** por imagem de interface TSE já retirada do pacote. O componente `CapturaPortalDados` em `EvidenciasGrafadas2026.tsx` agora entrega **ficha gráfica de fonte e link ao TSE**, sem imagem de interface. O script `scripts/qa/aceite-visual-integral-pr33.py` passou a reprovar por falhas objetivas em vez de só relatá-las. **Run #44005467522: 43 rotas, 86 capturas, zero falhas** (https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/44005467522; artefato 14293499272).
3. O run #44005446491 do teste de teclado falhou intermitentemente porque o `select` controlado de UF era acionado logo após `domcontentloaded`, enquanto o H1 já existia por SSR. O roteiro agora espera inicialização de rede/hidratação, valida foco e testa ArrowDown; o componente da interface permaneceu intacto. **Run #44005716725: 33 cenários, três verificações de teclado, zero falhas** (https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/44005716725).

**Limite de aceitação:** QA automatizado não é homologação estética, nem teste humano de teclado completo, zoom nativo 200% ou leitor de tela. A editora ainda deve examinar as páginas inteiras de Pagu/Lélia e os demais modelos antes de autorizar integração. Sem merge ou publicação.


## Rodada de conferência visual após acesso às capturas — 17/11/2026
- **Arquivo verificado**: artefato da [auditoria completa #44005467522](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/44005467522) e da [nova auditoria #44007766912](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/44007766912), ambos produzidos pelo GitHub Actions do PR #33. Avaliadas as aberturas desktop e celular e percursos integrais de Pagu e Lélia.
- **Falha visual constatada**: colagem e ficha do TSE empilhadas na mesma coluna direita, com vazio lateral relevante em telas de 1440 px. **Correção aplicada**: separação da ficha em faixa de duas colunas abaixo do conjunto ilustrativo; seu conteúdo foi preservado, com distinção explícita de reprodução tipográfica. Evidência no componente `src/components/editorial/Pioneiras.tsx`.
- **Execução posterior confirmada**: #44007766912, 43 rotas, 86 capturas, zero falhas objetivas; perfis históricos #44007766932, reflow/teclado #44007766851, variantes #44007766974 e outros cadernos #44007766854 e #44007766880 com conclusão de sucesso.
- **Não encerrado:** aceite artístico das peças tipográficas; as referências gráficas apresentadas pela editora são mais texturizadas e figurativas do que os SVGs atuais. Permanecem os testes humanos de teclado integral, zoom nativo e leitor de tela, além de revisão jurídica do uso limitado de documentos e autorização expressa de publicação. As capturas de Actions têm retenção limitada; conservar a documentação deste achado mesmo após expirar o artefato.


## Decisão editorial superveniente: duas pioneiras sem imagem (17/11/2026)
A editora rejeitou todas as colagens propostas para Pagu e Lélia e determinou **deixar as páginas sem imagens por ora**. Esta decisão prevalece sobre qualquer menção anterior neste relatório a candidatas gráficas em teste. As duas rotas agora apresentam apenas texto, números, fichas tipográficas e fontes oficiais, sem colagens ou retratos, inclusive sem modo especial de prévia. Os dois SVGs rejeitados e os dois binários fotográficos sob direitos pendentes foram excluídos da árvore atual do PR. Fotos e ilustrações não fazem parte do escopo de encerramento.

**QA a confirmar no commit correspondente:** TypeScript, pacote HostGator, integridade de links, 43 rotas/86 capturas e teste de reflow com ausência de imagens e presença de fichas. **Não reaproveitar o resultado de um commit anterior como validação desta alteração**.

**Risco residual de distribuição:** o repositório é público; históricos anteriores, e o arquivo da fotografia de Pagu ainda acessível em main até eventual integração, não são apagados pela remoção na branch. Não há autorização para reescrever histórico ou fazer merge, e não se deve declarar que a pendência legal foi totalmente resolvida.

**Continuam necessários para liberação final:** resultados dos workflows do HEAD, revisão de crédito/legendas/links das quatro reproduções documentais fundamentadas, teste humano com zoom nativo 200%, teclado integral e leitor de tela, aceite editorial do design sem imagens e autorização expressa para publicação.
