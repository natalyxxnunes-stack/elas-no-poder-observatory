# Quem são elas? — Auditoria jornalística e visual pré-publicação

**Data:** 15/11/2026. **Escopo:** etapas 2 (jornalística/estatística) e 3 (visual/funcional) da atualização financeira. **Ambiente:** branch `redesign-editorial-v3-teste`, site estático gerado no GitHub Actions, não a edição publicada. **Situação:** verificações concluídas e correções objetivas feitas na branch; sem merge, sem envio à HostGator e sem publicação.

## 1. Bases, universos e verificabilidade

**TSE, Prestação de Contas Eleitorais 2026:** https://dadosabertos.tse.jus.br/pt_BR/dataset/prestacao-de-contas-eleitorais-2026

- CSV de receitas: geração 15/11/2026 04:05:10. SHA-256: `73ec0cd7727edd6ef3f9b69e7158f0e9dbb02a772a47e01e01374d004f4bdd90`.
- Arquivo ZIP financeiro: SHA-256 `9ae80e2e2ea9561c9f9810008b9efad0bba6e7f16d8b56935039cc6fb3cc71bf`.
- Cadastro de candidaturas: geração 15/11/2026 05:30:40. SHA-256: `60843af924b8da04d3f5bbacc0c0b14582dc89eba502e90a0b661c33928f44ce`.
- Universo proporcional: 19.531 candidaturas titulares a deputado federal, estadual ou distrital, sendo 6.953 mulheres no registro; 6.836 candidatas têm receita declarada.
- Universo majoritário: titulares a presidente, governador e senador, com corte e denominador próprios, sem vices ou suplentes.
- Método: agrupar por `SQ_CANDIDATO`, eliminar apenas linhas inteiramente idênticas, somar `VR_RECEITA`, cruzar o cadastro e manter categorias preta e parda separadas. Agregações para candidaturas negras são explicitamente identificadas, apenas quando o critério jurídico exige.

**Resultados centrais confirmados:**

| Medida | Numerador | Denominador | Resultado |
| --- | ---: | ---: | ---: |
| Receita das candidatas brancas, cargos proporcionais | R$ 1.020.920.855,30 | R$ 1.819.706.552,93 de receitas de candidatas proporcionais | **56,1%** |
| FEFC das candidatas brancas, cargos proporcionais | R$ 817.793.472,16 | R$ 1.488.657.197,62 de FEFC de candidatas proporcionais | **54,9%** |
| Presença de candidatas brancas, cargos proporcionais | 3.254 candidatas brancas registradas | 6.953 candidatas proporcionais registradas | **46,8%** |
| Presença de candidatas brancas com receita, cargos proporcionais | 3.203 candidatas brancas com receita | 6.836 candidatas proporcionais com receita | **46,9%** |
| Mulheres no FEFC recebido por candidaturas proporcionais | R$ 1.488.657.197,62 | R$ 3.988.617.748,81 de FEFC proporcional | **37,3%** |

**Atenção:** as porcentagens de 54,9% e 56,1% não são alternativas para um mesmo indicador. A primeira usa apenas recursos do FEFC; a segunda reúne todas as fontes de receitas declaradas por mulheres. Da mesma forma, 46,8% conta registradas e 46,9% conta candidatas com receita.

A base financeira processou 269.003 linhas brutas, excluiu 982 duplicatas integrais e somou 268.021 linhas; zero candidaturas sem correspondência no cadastro e zero divergências de gênero entre linhas cruzadas, pelos critérios usados. Entre as 19.660 candidaturas dos seis cargos com receita, 19.363 constam como FINAL, 195 como PARCIAL e 102 como RELATÓRIO FINANCEIRO. **FINAL indica modalidade de entrega e não aprovação pela Justiça Eleitoral.**

## 2. Cotas, partidos e responsabilidade editorial

Fonte normativa: Portaria TSE n.º 541/2026 (https://www.tse.jus.br/legislacao/compilada/prt/2026/portaria-no-541-de-20-de-agosto-de-2026); Resolução TSE n.º 23.752/2026 (https://www.tse.jus.br/legislacao/compilada/res/2026/resolucao-no-23-752-de-26-de-fevereiro-de-2026). Para distribuição legal, o TSE divulgou percentuais oficiais considerando 20.560 candidaturas: https://www.tse.jus.br/comunicacao/noticias/2026/Agosto/tse-divulga-percentuais-de-candidaturas-de-mulheres-pessoas-negras-e-indigenas-por-partido

O recorte do observatório **não equivale à auditoria do cumprimento constitucional de cotas**. Mede FEFC recebido por candidaturas, não todos os gastos e destinações partidárias; o universo e as regras de aferição oficial são diferentes.

Partidos com participação inferior a 30% do FEFC recebido por candidaturas pretas e pardas, **descrição agregada, sem imputação de irregularidade**:

| Cargos proporcionais | Participação |
| --- | ---: |
| PL | 26,7% |
| NOVO | 25,6% |
| PCO | 24,7% |

| Titulares dos seis cargos | Participação |
| --- | ---: |
| PL | 22,3% |
| NOVO | 26,4% |
| MDB | 28,2% |
| Cidadania | 29,4% |
| PSD | 29,4% |
| PRTB | 14,1% |

O recorte de titulares de seis cargos tem ressalva adicional de atribuição de recursos nas chapas majoritárias. No caso do PRTB, há somente **seis candidaturas titulares**, quatro com FEFC, e por isso a fração é sensível a poucos registros.

No universo proporcional, o PCB possui **seis candidaturas sem FEFC declarado**. A tabela partidária e o CSV de FEFC listam os partidos com recurso declarado; assim, as linhas partidárias do CSV somam 19.525 candidaturas, enquanto o universo proporcional integral do cadastro soma 19.531. A ausência do PCB do arquivo por partido não altera o total de FEFC, que é zero nesse recorte. Não usar 19.525 como se fosse o total de candidaturas proporcionais.

## 3. Correções aplicadas na branch de teste

1. Integração do corte de 15/11 nos módulos de receitas, despesas e FEFC, nas fichas de fontes e no achado de 56,1%.
2. Explicitação dos partidos dos dois recortes e de seus limites: incluídos PCO e PRTB onde correspondiam à extração; ajustada redação de Cidadania e a distinção entre recebimento e cumprimento legal.
3. Corrigidas referências remanescentes que descreviam o corte de 15/11 como mera prestação final do primeiro turno.
4. Tabela partidária: rótulo inequívoco **“Candidaturas negras (pretas + pardas)”**; instrução de rolagem no celular; primeira coluna fixada para preservar a identificação de cada partido enquanto a pessoa percorre as demais.
5. Índice flutuante de seções reduzido no celular, com rótulo acessível de abrir/fechar. Largura observada caiu de aproximadamente 149 px para 58 px.
6. **CSV público de FEFC por partido regenerado** com fonte TSE de 15/11; novo SHA-256 do arquivo de distribuição: `ea33f944be2cf7a8f8bc2e7036489bfa6fd340c49b73bd04caf73da07033ac51`. Manifesto correspondente atualizado. **Os demais oito CSVs não foram modificados.**
7. O script de geração de CSVs teve import corrigido para o módulo onde estão as deputadas. Também foi corrigida a formulação sobre SHA-256 em Downloads: a impressão digital permite conferir identidade e integridade do arquivo, enquanto a procedência precisa ser documentada por fonte, método e datas.

Os dados e as análises de 04/11 e 12/11 preservados em reportagens e projetos históricos **não foram reescritos automaticamente**. Cada produto mantém sua própria data de corte até uma reapuração específica.

## 4. Auditoria funcional e visual

Automação de teste com site estático real construído a partir da branch, navegador Chromium headless via Playwright e resoluções de **1366 × 900** (desktop) e **390 × 844** (celular).

Páginas verificadas, em ambas as resoluções: `/`, `/dinheiro/`, `/achados/`, `/temas/dinheiro/`, `/dados/`, `/como-votaram/`, `/colecoes/antigenero-no-poder/`, `/metodo/` e `/downloads/`.

- **18 visitas**, todas HTTP 200, sem exceções de JavaScript capturadas e sem transbordamento horizontal global do documento.
- As três miniaturas da capa apontadas na verificação inicial estavam com `loading="lazy"`; foram abertas individualmente após rolagem e **carregaram corretamente**, com dimensões válidas em desktop e celular. A sinalização inicial foi falso positivo.
- Tabela FEFC expandida por interação real, 29 linhas de tabela (agregado + linhas dos partidos com FEFC), cabeçalhos presentes, incluindo candidaturas negras, e texto PCO/PRTB renderizado. 
- No celular, largura visível do contêiner: 308 px; largura do conteúdo: 1.024 px; rolagem horizontal efetiva verificada (`scrollLeft=358`); coluna partidária com `position: sticky`, instrução textual de rolagem e botão flutuante com largura de aproximadamente 58 px.
- O índice de páginas longo permanece um controle flutuante. Sua versão compacta reduz a interferência na leitura, mas o comportamento deve ser conferido em aparelho real e com tecnologias assistivas.

**Evidências reproduzíveis:**
- Primeira rodada de páginas: https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43727576113
- Interações e miniaturas: https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43729472453
- Registros estruturados em `docs/auditorias/qa-paginas-15nov/` (`resumo-qa.md`, `auditoria-dom.json`, `interacoes.json`, capturas JPEG).

## 5. Limites e pendências para aprovação editorial

**Nenhuma inconsistência aritmética bloqueante restou identificada nas séries financeiras reprocessadas desta auditoria.** Isso não certifica todas as investigações do observatório.

**Antes de autorizar a publicação:**

- Conferência humana final da tela *Dinheiro* e do CSV em um celular real, especialmente leitura da tabela horizontal, foco por teclado e abertura dos painéis recolhidos;
- Conferência de acessibilidade além dos testes automatizados: contraste, leitura por tecnologia assistiva, foco de teclado e navegação de painéis;
- Revisão da convivência explícita de cortes distintos (base financeira 15/11 versus reportagens/CSV históricos com cortes próprios), sem apresentar todos os dados do observatório como uma atualização única;
- Preparação da etapa 4 **sem mesclar toda a branch de teste**, que contém também alterações de redesign não aprovadas para publicação. Preferir integração seletiva da atualização financeira ou revisão isolada do pacote a publicar.

**Fora de escopo:** auditoria humana completa da homepage e das matérias históricas; novos testes causais; contato com agentes partidários para apuração de eventual descumprimento de cotas; revisão do redesign editorial como um todo; publicação na HostGator.

**Conclusão limitada:** os dados financeiros, os cálculos centrais, os textos essenciais e o funcionamento automatizado da página atualizada estão consistentes no corte de 15/11, sujeitos às ressalvas documentadas. A revisão em dispositivo real e a decisão de publicação continuam pendentes.
