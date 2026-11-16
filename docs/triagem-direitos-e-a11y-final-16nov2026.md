# Triagem de direitos visuais e acessibilidade — 16/11/2026

**Ambiente:** PR #33, rascunho. **Natureza:** investigação editorial e avaliação preliminar, sem substituir parecer jurídico.

## Fotografias com regra institucional mais clara

A Câmara dos Deputados permite reutilização de fotografias de seu Banco de Imagens sem custo e sem autorização prévia, com o crédito Nome do Fotógrafo/Câmara dos Deputados, sob Creative Commons BY. Conferir a proveniência de cada arquivo: essa regra não se estende automaticamente a anexos de processos nem fotografias de terceiros citadas numa notícia.

Fontes oficiais:
- https://www2.camara.leg.br/comunicacao/assessoria-de-imprensa/guia-para-jornalistas/noticias-e-fotografias
- https://fotos.camara.leg.br/fotoweb/views/terms-and-conditions
- https://www.camara.leg.br/banco-imagens

## Sete itens com decisão individual pendente

| Item | Fonte e estado | Pendência concreta e encaminhamento |
| --- | --- | --- |
| **Pagu** | https://commons.wikimedia.org/wiki/File:Patricia_Galvao.jpg ; autor desconhecido, data atribuída à década de 1920, fonte referida A Tribuna 2008, ficha PD-old | Autoria e publicação inicial não demonstradas suficientemente para uso sem revisão; **manter bloqueio em produção** e localizar registro original ou titular |
| **Lélia Gonzalez** | https://commons.wikimedia.org/wiki/File:L%C3%A9lia_Gonzalez_by_Cezar_Loureiro.jpg ; autor indicado Cezar Loureiro e fonte atribuída revista Cult | A ficha alega domínio público com tese específica de fotografia anterior a 1998 não artística; falta confirmar primeira publicação e enquadramento. **Manter fora de public em produção** |
| **Interface TSE, Candidatos 2026** | Captura da página de disponibilização, já contextualizada como interface, não CSV | A licença aberta dos dados não necessariamente alcança a reprodução gráfica da interface. Avaliar fundamento, proporcionalidade e eventual alternativa texto + link |
| **União Brasil, Resolução CEN 043/2026** | Página 24/33 do PDF FEFC, PJe 0601251-87.2026.6.00.0000 | Ato partidário interno anexado ao TSE não é automaticamente ato oficial isento de proteção. Conferir aplicação dos arts. 8º e 46 da LDA; não reproduzir anexos com CPF e contas |
| **Federação Brasil da Esperança, Resolução 14/2026** | Página 10/64 do PDF anexado ao processo do PT, PJe 0601252-72.2026.6.00.0000 | Ato da federação, não norma exclusiva do PT. Mesmo exame jurídico individual de reprodução proporcional e interesse jornalístico |
| **PL, capa do processo PJe FEFC** | Página 1/34 do PJe 0600974-71.2026.6.00.0000 | Identificação gerada em processo público pode ter situação distinta das resoluções partidárias; conferir dados identificáveis e elementos de interface. Não indica valores repassados a candidaturas |
| **Câmara, linha do índice de discursos SITAQ** | Captura literal de uma linha da busca oficial com Julia Zanatta, fala 10/03/2026, DCD 11/03, p. 163 | Dado catalográfico factual e imagem de interface não são conceitos idênticos. Avaliar citação/informação de uso comum; nunca rotular como fac-símile da página do Diário |

**Parâmetros jurídicos a discutir antes de liberar:** Lei 9.610/1998, art. 8º, IV e V (atos oficiais e informações de uso comum), art. 46, III e VIII (limitações de citação/reprodução). O fato de um processo ser público e de um arquivo estar no Commons não é autorização universal para todos os usos. Fonte legal: https://www2.camara.leg.br/legin/fed/lei/1998/lei-9610-19-fevereiro-1998-365399-normaatualizada-pl.html . Orientações adicionais: https://www12.senado.leg.br/manualdecomunicacao/guia-de-direitos-autorais .

Origem, SHA-256 e triagem de privacidade das quatro reproduções estão em docs/acervo-facsimiles-tse-camara-16nov2026.md. **Todas as sete decisões permanecem abertas; nenhum bloqueio foi retirado.** O repositório é público, mesmo com PR em rascunho.

## Ensaios de reflow e teclado

Novo script: scripts/qa/reflow-teclado-fechamento.py; GitHub Actions: https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43980902610 .

**Resultado verificado:** build TypeScript/HostGator aprovado; **27 cenários** (nove rotas × desktop, viewport de reflow 640 CSS px/DPR2 e espaçamento de texto ampliado em 390 CSS px), sem erro de execução, perda do conteúdo principal ou transbordamento horizontal nos cenários testados. **Três controles** funcionaram pelo teclado (filtro select e abertura de detalhes). Capturas do primeiro viewport de quatro rotas em três modalidades e arquivo JSON guardados como artefato do workflow.

**Limitação importante:** 640 CSS px/DPR2 simula um reflow equivalente a 200% em largura física de 1280 px; **não é o comando nativo de zoom a 200% de um navegador**. O estresse de espaçamento aplica CSS de teste e não substitui leitor de tela, teste humano de teclado, reflow em todas as partes da página ou certificação WCAG.

## Critérios para encerrar

Concluir análise dos sete materiais com decisão editorial e, se necessário, orientação jurídica; inspecionar páginas inteiras com evidências ampliadas; fazer testes manuais de zoom, teclado, filtros e NVDA/VoiceOver; revisar todo o diff e obter autorização expressa antes de merge/deploy. **Não reiniciar identidade, não substituir evidência real por imagem decorativa.**
