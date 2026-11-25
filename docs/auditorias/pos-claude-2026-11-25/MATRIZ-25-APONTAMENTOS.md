# Matriz de homologação pós-auditoria independente

Referência: relatório Claude “Auditoria independente 360°: Quem são elas?”, 25/11/2026, sobre main fa99f8b. Matriz de resolução; não republica o relatório integral. PR 42 consolida alterações dos PRs 38–41. Não integrar main nem publicar enquanto a versão consolidada não estiver homologada e a responsável editorial não aprovar. Sem P0 no parecer original, o que não equivale a certificação.

| ID | Tratamento / evidência | Estado |
| --- | --- | --- |
| P1-01 | Recontagens 45705574795 e 45709028417; receitas e FEFC brutos rotulados como soma de recebimentos; recorte sem repasses e FEFC de origem partidária por partido da receptora; método, manchetes, tabelas e CSVs distintos. Não pressupõe cadeia de transferências conciliada. | Implementado, recontagem validada; homologação integrada pendente |
| P1-02 | 19.692 no arquivo, 17.887 positivas, 1.805 zeros, 373 ausentes; medianas com e sem zeros por gênero e raça; achado preserva denominador 6.845 e explicita 6.300 positivas. CSVs novos e validação 45709676737. | Implementado e recontado |
| P1-03 | Temas, Achados e Barreiras distinguem registros processuais e violência, ano completo/parcial. | Implementado |
| P1-04 | Arquitetura da página Investigações atualizada para corte financeiro de 25/11 e recorte legislativo. | Implementado |
| P1-05 | Notas nas nove fichas de deputadas AP e Quem chega; preservados resultados nacionais 27/10 e fichas 02/11; nomes e partidos das nove conferem em CNN Brasil 04/10, baseada em TSE. Relatórios primários não legíveis; confirmação atual pelo TRE-AP pendente. | Mitigado, verificação nominal primária pendente |
| P2-01 | Receita inclui bens e serviços estimáveis; R$ 357.336.951,88 no total de recebimentos. | Implementado |
| P2-02 | Manchete, title e OG de Dinheiro usam 46,9% de presença no arquivo e 56,1% da receita declarada de mulheres proporcionais; FEFC em camada própria; denominadores explícitos. | Implementado |
| P2-03 | Fora do FEFC não equivale a privado; Fundo Partidário identificado. | Implementado |
| P2-04 | Retirada generalização sobre quem já tem mandato em tema de dinheiro. | Implementado |
| P2-05 | Terços da reeleição calculados conjuntamente por gênero, base 04/11 explícita; não atualizar série sem recontagem própria. | Implementado |
| P2-06 | Corrigida alegação de comparabilidade e escopo do painel; processos anteriores à lei não classificados. | Implementado |
| P2-07 | Retificação da atribuição a Rondônia em 17/11; diagnóstico AP exclusivo de 25/11. | Implementado |
| P2-08 | Inventário de cortes no Método, incluindo fichas, votação, governos 12/11, raça, Câmara e violência. Não é inventário exaustivo de cada documento. | Implementado, complementar quando necessário |
| P2-09 | Índice preliminar NT13 localizado fora da main em branch pública; proibição de replicação no AGENTS.md. Transferência privada e exposição histórica não resolvidas. | Pendente de decisão e operação autorizada |
| P2-10 | Aviso de privacidade e link no rodapé, DNT/GPC, serviços externos explicitados; testes PR 40 aprovados. Configurações reais de retenção, contratos e transferências não acessíveis. | Implementado, ressalvas operacionais |
| P2-11 | 11 URLs do lockfile migradas ao registro público, preservados hashes e versões; Bun --frozen-lockfile aprovado. Dependências do Lovable não eliminadas integralmente. | Implementado e validado |
| P2-12 | Rodapé sem consulta assíncrona, dois cortes fixos; leituras de snapshots já priorizam versão em código. | Implementado e validado |
| P3-01 | Frase truncada de FEFC corrigida. | Implementado |
| P3-02 | Flexão de milhão/bilhão conforme valor arredondado. | Implementado e testado |
| P3-03 | Paráfrase do art. 326-B inclui “por qualquer meio”, “menosprezo” e demais elementos legais. | Implementado |
| P3-04 | Checagem de fala distingue publicação posterior do Anuário, 23/07/2026. | Implementado |
| P3-05 | PL 1440/2026 atribuído a Erika Hilton e outras deputadas, conforme Câmara. API de autoria não acessível nesta consulta; não declarar quantidade sem confirmação própria. | Implementado com atribuição coletiva |
| P3-06 | Etapa 4: 399 HTMLs sem tabelas sem identificação nem salto inicial h1→h3; 20 rotas a 320px, sem overflow/JS/violações axe; itens inconclusivos de contraste/ARIA permanecem. Nova composição integrada exige nova verificação. | Parcial: revisão manual e teste integrado pendentes |
| P3-07 | 404 real, redirecionamentos e cache testados em Apache local; conferir HostGator após autorização. | Implementado e validado localmente |
| P3-08 | Recomendada configuração noreply; sem reescrever commits ou alterar conta; contagem do auditor não reproduzida. | Pendente de ação da autora |

## Evidências

- Recontagem independente original: run 45705574795, artifact 15064109761, SHA-256 f6188869f9bf325299a1559c1aad70c09e70ee7eb9ea66e4e58d0a2675d97998.
- Recontagem partidária adicional: run 45709028417, artifact 15066048614, SHA-256 50698befa54079c5d7e1c69d3c5d9700e9074651da22ddfdc3511cb7b241924a; todos os ZIPs/CSVs verificados contra manifesto. Total proporcional de origem partidária R$ 3.882.667.958,34, mulheres R$ 1.459.107.812,53. 29 siglas, incluindo sem fundo. PL 26,3%, NOVO 26,2%, PCO 24,7% da origem partidária declarada por pretas e pardas somadas. Não é teste de cota.
- Run 45709676737: conciliou recortes públicos e totais partidários com artefato independente, conferiu identidade byte a byte do agregado de origem partidária, gerou três CSVs e preservou os anteriores. Manifesto inclui hashes; data de versão fixada para reprodução. Commit automatizado 9c87e23de2b158981d23e0a0eb1999fb4bf07458. Workflows temporários retirados após êxito. Run de compilação 45709676686 passou instalação/validador/build, mas falhou na comparação dos CSVs por rodar antes do commit gerado. Não é homologação final.
- Etapa 4, run 45708383891: 399 HTMLs, zero tabelas sem nome, zero saltos iniciais; 20 rotas mobile, HTTP 200, zero erro JS/overflow, zero violações axe; itens inconclusivos, sobretudo contraste, não foram resolvidos por teste manual.
- Amapá: TRE-AP https://www.tre-ap.jus.br/eleicoes/eleicoes-2026/resultados-eleicoes-geirais-2026-amapa ; confirmação secundária, não fonte primária: https://www.cnnbrasil.com.br/eleicoes/veja-os-8-deputados-federais-eleitos-pelo-amapa/ e https://www.cnnbrasil.com.br/eleicoes/conheca-os-24-deputados-estaduais-eleitos-pelo-amapa-em-2026/ ; nomes e siglas de todas as 9 conferidos. A extração de 25/11 permanece incompleta. Diplomação ainda futura.
- P3-04: https://fontesegura.forumseguranca.org.br/20a-edicao-do-anuario-brasileiro-de-seguranca-publica-aponta-que-os-lares-se-tornaram-ambientes-mais-violentos-para-mulheres-criancas-e-adolescentes-homicidios-caem-82-na-comparacao-com-2024/ ; P3-05: https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2612399 .

## Antes do depósito/publicação

Validar a versão integrada, revisar contraste e teclado/leitor de tela, confirmar fonte primária AP quando disponível, deliberar sobre material de investigação e licenças, configurações de privacidade e noreply. Manter direitos e minimização no Zenodo; não depositar o repositório integral. A main permanece fa99f8b; nenhuma publicação HostGator, nem DOI reservado. Não há outro redesign.
