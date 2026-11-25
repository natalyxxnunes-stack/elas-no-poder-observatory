# Etapa 3 — integridade jurídica e ética

Revisão de 25/11/2026, a partir do parecer independente (commit fa99f8b). Diagnóstico editorial e técnico, não parecer jurídico. Nenhuma publicação, depósito ou mudança de visibilidade autorizada nesta etapa.

## Privacidade (P2-10, elevada a P1 interno)
- Código inspecionado: src/routes/__root.tsx (Google Fonts e contagem de página), src/lib/analytics.ts (GoatCounter, restrito ao domínio público), src/components/SiteFooter.tsx e src/lib/tse/snapshot.functions.ts (leitura do banco Supabase), src/integrations/supabase/client.ts (chave publicável).
- O fornecedor GoatCounter descreve estatísticas agregadas e uso de IP para localização aproximada: https://www.goatcounter.com/help/privacy. Sem cookies de rastreamento não é sinônimo de inexistência de tratamento de informações técnicas. Removida afirmação jurídica categórica de dispensa de consentimento no comentário do código.
- Seção /sobre#privacidade, link no rodapé; contagem não carrega nem envia quando navigator.doNotTrack é 1/yes ou navigator.globalPrivacyControl é true. Não equivale a desativar todas as conexões de terceiros.
- LGPD: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm ; art. 4º, II, distingue finalidades exclusivamente jornalísticas e acadêmicas (nesta última, arts. 7º e 11 aplicáveis). Não presumir dispensa para analytics, atendimento ou administração.
- Pendência da responsável: conferir prazo de retenção, base aplicável, contratos, transferência internacional e registros efetivos dos fornecedores, inclusive e-mail. Política da Newfold exclui dados de clientes que ela trata como operadora: https://newfold.com/privacy-center/privacy. O aviso não inventa prazos. Confirmar configurações antes de publicar e avaliar auto-hospedagem de fontes na etapa técnica.
- Não houve acesso ao painel de hospedagem, Supabase ou GoatCounter; não declarar ausência de logs ou conformidade integral.

## Dossiê (P2-09, elevada a P1 interno)
A inspeção confirmou que o índice preliminar dos 20 casos da NT13 existe na branch pública do PR 36 (não na main). Não repetir identificadores nem replicar o conteúdo em outros arquivos públicos, artefatos ou no Zenodo. A fonte ser pública não torna automaticamente necessária a amplificação de todos os identificadores em um índice próprio. Preservar a pesquisa de modo restrito e separar triagem de publicação.
- Proposta: manter cópia privada autorizada; retirar o índice da árvore ativa da branch após confirmar cópia; avaliar exposição nos commits, PR, forks e caches com responsável e suporte GitHub. Não reescrever histórico sem aprovação e plano de recuperação (AGENTS.md, integração Lovable). Exclusão de arquivo, fechamento de PR ou exclusão de branch não garantem remoção de cópias históricas. Documentação: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository
- Não há ferramenta conectada de criação/alteração de visibilidade de repositório nesta sessão. Não foi removido nem migrado o índice. Não é lista de condenados. Antes de divulgação individual: conferir autos, decisão vigente, situação processual, segredo de justiça, risco de identificação de vítima e necessidade de contraditório.
- Não incluir índice ou dados brutos em depósito público. Não disponibilizar relatório completo do Claude que amplifique exposição sem revisão.
- P3-08: relato do auditor de e-mail pessoal no histórico não foi reproduzido nesta etapa. Configurar Keep my email address private e endereço noreply para commits futuros, verificar também Lovable e automações; não publicar o endereço pessoal. https://docs.github.com/pt/account-and-profile/how-tos/email-preferences/setting-your-commit-email-address

## Direitos de reprodução
- Portal TSE, conjuntos Candidatos 2026 e Prestação de Contas 2026: licença Creative Commons Atribuição indicada nas páginas oficiais, sem afirmar versão específica não verificada. https://dadosabertos.tse.jus.br/dataset/candidatos-2026 ; https://dadosabertos.tse.jus.br/dataset/prestacao-de-contas-eleitorais-2026 . Creditar TSE, indicar origem e transformações; licença aberta não é permissão para republicar identificadores pessoais desnecessários.
- Guia da Câmara autoriza uso das fotografias disponíveis com crédito fotógrafo/Câmara dos Deputados: https://www2.camara.leg.br/comunicacao/assessoria-de-imprensa/guia-para-jornalistas/noticias-e-fotografias . Ajustados três registros que declaravam CC-BY sem prova de licença individual (plenário jun/2026, bancada feminina mar/2026 e plenário 2023). O guia não estabelece CC-BY específica. Preservados créditos e acervos; não foi refeita a verificação de cada binário.
- Imagem de votação da Agência Senado: registro existente CC BY-SA 4.0, conferir ficha e condições caso reutilizada. Duas fotos de Bertha Lutz: registros existentes de domínio público, confirmar proveniência e direitos antes de qualquer redistribuição. Pagu e Lélia: pendentes; continuar sem imagens. Não restaurar binários.
- Recortes/documentos, fotografias e ilustrações: conferir licença individual e pertinência jornalística antes de depósito; por padrão excluir todos os binários de terceiros. Referenciar fonte e link, sem presumir autorização para nova distribuição. Lei 9.610/1998: https://www.planalto.gov.br/ccivil_03/leis/l9610.htm .
- LICENSE na raiz não localizado. Repositório público não equivale a licença aberta para todo o conteúdo. Não escolher licença pela autora. Revisão do código e dependências, textos autorais, licenças da Câmara/IBGE e demais bases antes de depósito. O aviso "Como citar" distingue citação de redistribuição.

## Zenodo: regra de seleção de arquivos
Política oficial: https://about.zenodo.org/policies/ ; depósito exige direitos adequados e licença dos arquivos públicos. A lista a seguir é preliminar, não uma autorização de depósito.

| Material | Decisão preliminar |
| --- | --- |
| CSVs agregados, séries históricas e agregados financeiros corrigidos | Candidatos a inclusão, após conciliação P1-01/P1-02, revisão de células pequenas e atribuição por fonte |
| Fichas eleitorais nominais / CSV de eleitas | Avaliar necessidade científica e minimização separadamente; não incluir automaticamente |
| Dicionário, README, metodologia, manifesto, histórico de correções, CITATION.cff | Incluir versão final revisada, sem dados privados |
| Scripts de processamento | Incluir somente rotinas necessárias e reproduzíveis, sem credenciais, dependências privadas ou saídas individuais; licença própria aprovada |
| Dados brutos TSE, doadores, CPF, contatos, documentos judiciais, índice preliminar | Excluir do depósito; indicar fontes e instruções de acesso quando apropriado |
| Fotos, recortes, PDFs de terceiros, relatórios de auditoria não revisados | Excluir por padrão; substituir por referências |
| Histórico .git, .env, logs, artefatos de CI, configurações de serviço | Excluir; não depositar ZIP integral do GitHub |

Licenças a deliberar: CC BY 4.0 para documentação e dados tratados na medida dos direitos disponíveis, licença de software própria (ex.: MIT) para scripts autorais, preservando termos de terceiros. Registrar termos por arquivo e não atribuir licença autoral a dados originários do TSE. Zenodo somente após fechamento da auditoria, reprodutibilidade e revisão final.

## Situação
P2-10: aviso e proteção implementados, teste e conferências de configuração pendentes. P2-09: risco confirmado e procedimento definido; migração privada não realizada. P3-08: recomendação e instruções, não alteração de conta. Direitos: três rótulos corrigidos, revisão integral dos acervos e escolha de licenças pendentes. A main e HostGator permanecem intocadas.
