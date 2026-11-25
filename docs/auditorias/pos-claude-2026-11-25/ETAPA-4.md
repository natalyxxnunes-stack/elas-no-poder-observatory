# Etapa 4 — tecnologia e acessibilidade

Referência: auditoria independente de 25/11/2026 sobre main fa99f8b; PR 41 em revisão. Não publicar. A etapa 3 foi validada na execução 45707230493.

| ID | Alteração | Verificação e limite |
| --- | --- | --- |
| P2-11 | 11 URLs de tarballs antes apontadas para o cache privado Lovable passam a registry.npmjs.org. Versões, dependências e hashes preservados. | Instalação Bun 1.4.4 com --frozen-lockfile e registry público, git diff --exit-code, build e recontagem de CSVs aprovados na execução 45707758541. Não equivale a remoção do Lovable: configuração, assets e coleta ainda podem depender de serviços. |
| P2-12 | Rodapé com datas dos recortes de resultado eleitoral e financiamento importadas das bases versionadas; sem consulta React Query ao carimbo. | A implementação snapshot.reads.ts já prioriza PINNED; portanto a hipótese de leitura Supabase efetiva dessas fotografias não se confirma pelo código. Fallback e coleta mantidos. Acesso real a serviços e RLS ainda não conferido. |
| P3-01 | Frase truncada em FefcPartidos corrigida. | Sem alteração de valor. |
| P3-02 | Flexão monetária com base no número exibido após arredondamento; singular abaixo de 2. | Teste de 1 milhão, 1,5 milhão, 2 milhões por arredondamento, 1 bilhão e 2 bilhões. |
| P3-06 | Oito tabelas inicialmente nomeadas; varredura de 399 HTMLs encontrou três instâncias sem nome em /metodo e /quem-sao-elas. Ajustados WhatChanged e PartyStateMatrix; os títulos de achados individuais agora são h2. Quatro saltos iniciais restantes em temas levaram a h2 semântico em Secao no template de temas, sem alterar estilo. | Conferir última versão com inventário e axe. A auditoria automatizada não substitui leitor de tela, zoom nativo ou contraste manual. |
| P3-07 | HTTP 404 real via ErrorDocument local, página 404 sem dependências, preservação dos 301 antigos; HTML revalida imediatamente, arquivos não versionados com max-age 3600, JS/CSS/fontes com hash em /assets com max-age 31536000 immutable. | Teste local Apache 2.4.68 com estrutura mínima: /dinheiro sem barra 301 para /dinheiro/, /metodo/ e HTML 200, rota inexistente 404 com texto, redirecionamento de tema 301, CSV max-age 3600, HTML max-age 0, JS de hash immutable. O primeiro teste CI exigia 200 sem considerar DirectorySlash e falhou; corrigido para aceitar apenas 301 com destino correto ou 200, verificar o destino e registrar erros. A execução 45708021208 passou no Apache e prosseguiu para Chromium. A verificação em hospedagem real continua necessária. |

## Evidências
- Primeira execução 45707758541: 399 HTMLs, 28 tabelas (3 ainda sem nome), quatro rotas temáticas com salto inicial; instalação pública, validação financeira, build e CSVs aprovados. Falha em teste HTTP; Chromium não executado nesta rodada. Artefato 15067080290. 
- Execução 45707812284: formatação ajustada, build e exportações aprovados; mesma expectativa HTTP incorreta, antes da correção.
- Execução 45708021208: teste HTTP corrigido, Apache aprovado; auditoria Chromium em curso no momento do registro.
- Últimos commits adicionam os rótulos restantes e títulos semânticos em temas. Homologar o HEAD do PR 41, não apenas revisões anteriores.

## Próximos passos
Revisar axe.json (violations e incomplete), incluindo contraste manual, testar leitor de tela e zoom nativo de 200% quando disponíveis. Não declarar conformidade WCAG integral. Conferir no servidor real 404, redirecionamentos, cache, links e arquivos antigos, sem apagar sem backup. A combinação de PRs 39, 40 e 41 deverá preservar nota AP, aviso de privacidade no rodapé e alterações semânticas. A integração de P1-01/P1-02 (indicadores, gráficos, CSVs, métodos) permanece necessária antes de homologação e Zenodo. P3-04/P3-05 ainda demandam checagem editorial. Sem alterações na main, no site público ou na identidade visual.
