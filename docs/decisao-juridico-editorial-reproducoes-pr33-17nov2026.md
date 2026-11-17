# Deliberação técnico-editorial para liberação do PR #33 — 17/11/2026

**Objeto:** quatro reproduções documentais no observatório *Quem são elas?* e restrições das fotografias históricas. **Natureza:** avaliação editorial de risco apoiada em documentos oficiais, não parecer de advogado, licença ou afirmação de direitos cedidos. **Estado:** decisão técnica e recomendação de uso; o aceite autoral e a autorização efetiva de publicar permanecem com a editora.

## Base normativa consultada

- [Lei nº 9.610/1998, Câmara, texto consolidado](https://www2.camara.leg.br/legin/fed/lei/1998/lei-9610-19-fevereiro-1998-365399-normaatualizada-pl.html), arts. 7º, 8º IV–V, 28–29, 44 e 46 III e VIII. O texto de atos oficiais e as informações de uso comum não se submetem, por si, à proteção autoral nos termos do art. 8º; a obra fotográfica é em regra protegida. A lei prevê hipóteses de citação contextualizada de passagens e reprodução justificada de pequenos trechos; **não isenta automaticamente a página visual inteira de um documento particular**. Proporcionalidade, finalidade crítica, atribuição e minimização importam.
- [TSE, critérios do FEFC 2026](https://www.tse.jus.br/eleicoes/eleicoes-2026-content/prestacao-de-contas/fundo-especial-de-financiamento-de-campanha-fefc). A norma eleitoral exige divulgação ampla dos critérios de distribuição; as decisões partidárias são descritas pelo TSE como `interna corporis`, sem análise geral de mérito pelo tribunal. O portal hospeda o inteiro teor de PL, PT/Federação e União Brasil. A divulgação pelo TSE confirma origem e publicidade da informação, não transfere automaticamente direitos sobre todos os elementos gráficos.
- Inventário de origem, páginas, número PJe, hashes e privacidade: `docs/acervo-facsimiles-tse-camara-16nov2026.md`. Este parecer **não** substitui os testes de integridade visual realizados antes nem declara nova inspeção integral dos PDFs maiores nesta data.

## Decisão por item

| Material | Decisão editorial proposta | Justificativa | Restrições |
| --- | --- | --- | --- |
| Pagu, retrato histórico | **EXCLUIR** do site e do pacote; não utilizar em prévia | Procedência/autoria/licença brasileira não demonstradas com segurança | Não inferir domínio público pela ficha do Commons; manter somente referência metadocumental |
| Lélia Gonzalez, retrato histórico | **EXCLUIR** do site e do pacote; não utilizar em prévia | Atribuição de autoria não é autorização de uso | Preservar somente referência/creditação de origem, sem o binário na árvore ativa |
| Interface de Dados Abertos do TSE | **SUBSTITUIR por título de fonte + link** | Dado público não implica licença de reprodução do layout da página | PNG retirado do HEAD e bloqueado nos testes |
| União Brasil — Resolução CEN 043/2026, p. 24/33 | **MANTER uma página como citação documental contextualizada**, com risco residual registrado | Demonstra critério declarado, indispensável ao cotejamento com repasses; TSE exige ampla divulgação; invocar finalidade de crítica do art. 46, III/VIII, sem afirmar isenção automática | Sem anexos ou páginas adicionais, sem redistribuir PDF; crédito União Brasil/TSE, data, numeração de processo e página, link para original; distinguir critério e execução |
| Federação Brasil da Esperança — Resolução 14/2026, p. 10/64 | **MANTER uma página como citação documental contextualizada**, com risco residual registrado | Documenta competências da Federação e pisos legais; recorte limitado tem finalidade probatória direta | Não atribuir a norma exclusivamente ao PT; crédito Federação/TSE; um recorte sem CPF/contas, link oficial e contexto; mesma ressalva do art. 46 |
| PL — capa PJe, p. 1/34 | **MANTER a capa identificadora** | Página administrativa de registro processual, objeto e lista de anexos. O conteúdo factual/oficial tem argumento de enquadramento no art. 8º, IV–V; interesse em mostrar fonte e limite da capa | Não afirmar que a capa prova cumprimento dos critérios; ocultar anexos bancários/pessoais; autoria/sistema TSE/partido, link original |
| Câmara — linha SITAQ, 10/03/2026 | **MANTER uma linha do índice institucional** | Metadados oficiais de data, oradora, edição e página; referência identificável para verificação da fala. Art. 8º, V, é pertinente ao conteúdo factual | Não chamar de transcrição da fala nem imagem da página do Diário; crédito Câmara, tamanho 1109×64, link à pesquisa |

### Fundamento editorial e condicionantes

Os quatro recortes são **fonte primária localizada e contextualizada**, não decoração; reproduzir uma página de cada resolução (de documentos de 33/64 páginas) e uma capa/linha reduz a extensão, mas não elimina totalmente controvérsia jurídica. A decisão proposta é **manter as quatro peças com créditos e links já implementados**, observando a finalidade crítica e não comercializando os documentos separadamente. Não existe licença de redistribuição expressa que possamos registrar como obtida. Se surgir impugnação fundamentada, retirar rapidamente a reprodução e substituí-la por transcrição factual própria + link, preservando transparência da alteração.

**Revisão de privacidade:** o inventário indica que as páginas selecionadas não exibem CPF ou contas bancárias de terceiros; os PDFs integrais podem conter esses dados e **não devem ser espelhados** no site. A situação de PL/PT foi previamente verificada por página e hash no inventário; esta decisão não relata nova verificação visual integral desses PDFs.

## Repositório e exposição residual

- A branch do PR #33 e o build HostGator **não contêm** os dois retratos, as duas colagens recusadas nem a captura da interface TSE.
- **A `main` atual ainda contém a fotografia antiga de Pagu; commits históricos públicos podem conter imagens removidas mesmo após merge.** O procedimento seguro para o futuro envolve: cópia privada do inventário de procedência, cópia de segurança técnica do repositório e avaliação específica de reescrita de histórico e invalidação de caches com o suporte do GitHub. **Não executar `force-push`, apagar provas de apuração ou alterar `main` à margem do processo aprovado.**
- Integrar o PR poderá retirar esses arquivos do HEAD da `main`, mas **não garante eliminação do histórico**. Essa pendência é distinta da publicação estática da HostGator, que exclui essas imagens e cujo pacote foi auditado.

## Critério de liberação

**Decisão técnico-editorial proposta: manter os quatro recortes, com restrições, e não publicar nenhum retrato de Pagu/Lélia.** As ressalvas de direitos são assumidas como **risco residual identificado**, não tratadas como licença obtida.

O código está preparado para aceite, mas a liberação final exige registrar: (a) inspeção em navegador real comum com zoom 200%, sobretudo rolagem; (b) avaliação humana de teclado e NVDA/VoiceOver, que não pode ser substituída por teste automatizado; (c) decisão autoral da editora sobre o risco residual e autorização para o commit específico; (d) plano de backup/rollback antes do deploy. **Este arquivo não autoriza merge ou publicação por si só.**
