# Hospedagem do site na HostGator (Plano M)

Este documento descreve como o **Quem são elas?** é publicado em hospedagem
Apache compartilhada, sem servidor Node, e o que continua rodando fora dela.

## O que roda onde

| Camada | Onde roda | Observação |
| --- | --- | --- |
| Site (HTML, CSS, JS, gráficos, glossário, rotas) | HostGator, arquivos estáticos | Pré-renderizado rota por rota |
| Leitura das fotografias e da série histórica | Navegador → banco do projeto | Chave publicável + RLS de leitura pública |
| CSV da fotografia vigente | Navegador | Montado a partir da fotografia já carregada na página |
| Coleta diária da base do TSE | Aplicação de servidor do observatório (`/api/public/tse/ingest`) | Acionada por agendamento com `CRON_SECRET` |
| Coleta histórica (2014, 2018, 2022) | Mesmo endpoint, sob demanda (`/api/public/tse/ingest-history`) | Eleições encerradas; só repetir se o TSE republicar |
| Conferência e liberação de fotografia | Banco (`conferido = true`) | Regra inalterada: `status = ok` sozinho não publica |

A coleta **não** vai para a HostGator: ela baixa e descompacta o pacote oficial
do TSE, o que exige um servidor. Ela permanece no ambiente de servidor já
existente do projeto, chamada pelo agendamento com o segredo `CRON_SECRET`. A
credencial de serviço nunca entra no pacote enviado à HostGator.

## Gerar o pacote

```bash
bun install
bun run build:hostgator
```

A saída fica em `dist/client/`. Suba **todo** o conteúdo dessa pasta (incluindo
o `.htaccess`, que é um arquivo oculto) para `public_html` no gerenciador de
arquivos ou por FTP.

Arquivos gerados:

- `index.html` e uma pasta por rota (`/metodo/index.html`, `/funil/index.html`, …)
  com o `head()` completo de cada página: título, descrição, `og:*`, `twitter:*`;
- `_shell.html`, usado como fallback para qualquer endereço sem HTML próprio;
- `assets/` com JS e CSS versionados por hash;
- `.htaccess` com HTTPS forçado, resolução das rotas, fallback de SPA,
  compressão e cache.

## Quando republicar

O HTML carrega os números da fotografia vigente **no momento do build**. Ao
abrir a página, o navegador relê o banco e mostra a fotografia vigente de fato,
então o público sempre vê o dado atual. O HTML fica defasado apenas para
leitores que não executam JavaScript (rastreadores antigos, pré-visualizações
de link).

Por isso: **a cada fotografia conferida e liberada, rode `bun run build:hostgator`
novamente e suba o pacote.** É a mesma etapa em que hoje a fotografia é
liberada no banco.

## Limitações conhecidas desta hospedagem

- Sem servidor não existe redirecionamento 301 nem cabeçalho HTTP dinâmico:
  tudo isso passa a viver no `.htaccess`.
- Endereços inexistentes respondem HTTP 200 com o app, que então mostra a
  página 404 — comportamento padrão de site estático.
- A chave publicável fica visível no pacote JavaScript. É o comportamento
  previsto: a proteção real são as políticas de acesso do banco, que permitem
  apenas leitura para visitantes anônimos.
- Os blocos de dados aparecem com estado de carregamento na primeira abertura
  de uma rota navegada no cliente; o texto editorial aparece imediatamente.

## Segurança do banco

As tabelas `tse_snapshots` e `tse_historical_snapshots` têm, para visitantes
anônimos, **apenas leitura** — a permissão de escrita foi revogada. A gravação
de fotografias acontece somente na coleta, com credencial de serviço.
