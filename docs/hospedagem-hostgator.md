# Hospedagem do site na HostGator (Plano M)

Este documento descreve como o **Quem são elas?** é publicado em hospedagem
Apache compartilhada, sem servidor Node, e o que continua rodando fora dela.

## O que roda onde

| Camada | Onde roda | Observação |
| --- | --- | --- |
| Site (HTML, CSS, JS, gráficos, glossário, rotas) | HostGator, arquivos estáticos | Pré-renderizado rota por rota |
| Leitura das fotografias e da série histórica | Dados versionados e fallback de banco | A fotografia atual é fixada em código; se ausente, leitura pública por RLS |
| CSV da fotografia vigente | Navegador | Montado a partir da fotografia já carregada na página |
| Coleta diária da base do TSE | Aplicação de servidor do observatório (`/api/public/tse/ingest`) | Acionada por agendamento com `CRON_SECRET` |
| Coleta histórica (2014, 2018, 2022) | Mesmo endpoint, sob demanda (`/api/public/tse/ingest-history`) | Eleições encerradas; só repetir se o TSE republicar |
| Conferência e liberação de fotografia | Banco (`conferido = true`) | Regra inalterada: `status = ok` sozinho não publica |

### Por que a coleta não virou Edge Function

A coleta baixa o pacote oficial do TSE, descompacta e percorre linha a linha o
CSV com os mesmos dicionários e regras de contagem usados pelo site (cerca de
3.000 linhas em `src/lib/tse/`). Levar isso para uma Edge Function exigiria
duplicar esse código em outro runtime, criando duas versões da metodologia que
podem divergir — exatamente o que o Método promete que não acontece. Por isso a
coleta permanece no ambiente de servidor já existente do projeto, que continua
sendo o único lugar com a credencial de serviço.

A coleta **não** vai para a HostGator: ela baixa e descompacta o pacote oficial
do TSE, o que exige um servidor. Ela permanece no ambiente de servidor já
existente do projeto, chamada pelo agendamento com o segredo `CRON_SECRET`. A
credencial de serviço nunca entra no pacote enviado à HostGator.

## Gerar o pacote

```bash
bun install --frozen-lockfile --registry https://registry.npmjs.org
bun run build:hostgator
```

O lockfile utiliza o registro público npm para as dependências antes apontadas para o cache privado. A instalação deve preservar versões e hashes; a validação pós-auditoria registra a evidência. A coleta e as ferramentas de configuração do Lovable permanecem no projeto.

A saída fica em `dist/client/`. Suba **todo** o conteúdo dessa pasta (incluindo
o `.htaccess`, que é um arquivo oculto) para `public_html` no gerenciador de
arquivos ou por FTP.

Arquivos gerados:

- `index.html` e uma pasta por rota (`/metodo/index.html`, `/funil/index.html`, …)
  com o `head()` completo de cada página: título, descrição, `og:*`, `twitter:*`;
- `assets/` com JS e CSS versionados por hash;
- `ilustracoes/` (pasta simples na raiz do pacote) com as ilustrações editoriais: o script
  `scripts/hostgator-assets.mjs` roda ao final do build, baixa o binário de cada
  `src/assets/*.asset.json` (com cache em `.hostgator-assets/`) e reescreve todas
  as referências `/__l5e/assets-v1/...` para `/ilustracoes/...`, deixando o pacote
  autocontido. Se algum binário não puder ser baixado, o build falha e nomeia o
  asset — nenhum substituto é usado;
- `.htaccess` com HTTPS forçado, resolução das rotas, resposta HTTP 404 real,
  compressão e cache;
- `sitemap.xml` gerado a partir das páginas que o pré-render produziu (todas as
  rotas publicadas, inclusive as fichas de `/eleitas/*`, `/temas/*` e
  `/pioneiras/*`; `/busca` fica de fora) e `<link rel="canonical">` em cada
  página, ambos pelo script `scripts/hostgator-seo.mjs`, que roda por último.

## Quando republicar

O HTML e a navegação usam a fotografia fixada em código quando disponível. A leitura de banco é um fallback, não substitui automaticamente os recortes versionados. O rodapé identifica separadamente os cortes eleitoral e financeiro; outras análises têm datas próprias.

A cada nova fotografia homologada, atualizar os dados versionados, rodar `bun run build:hostgator` e subir o pacote aprovado.

## Limitações conhecidas desta hospedagem

- Sem servidor não existe redirecionamento 301 nem cabeçalho HTTP dinâmico:
  tudo isso passa a viver no `.htaccess`.
- Endereços inexistentes devem retornar HTTP 404 com `/404.html`. O teste em Apache local não substitui a conferência na HostGator. Arquivos de versões antigas que ainda existam no servidor devem ser inventariados antes de publicar; não apagar arquivos sem backup.
- `/historico` voltou a ser publicada (série 2014–2026) e é pré-renderizada como
  qualquer outra rota. Os redirecionamentos fixos incluem `/condicoes` → `/quem-controla` (301) e três URLs antigas de temas; preservar essas regras.
- A chave publicável fica visível no pacote JavaScript. É o comportamento
  previsto: a proteção real são as políticas de acesso do banco, que permitem
  apenas leitura para visitantes anônimos.
- O acesso ao banco depende das configurações do ambiente quando o fallback é necessário; o texto editorial aparece imediatamente. Verificar a experiência no navegador após publicação.

## Segurança do banco

As tabelas `tse_snapshots` e `tse_historical_snapshots` têm, para visitantes
anônimos, **apenas leitura** — a permissão de escrita foi revogada. A gravação
de fotografias acontece somente na coleta, com credencial de serviço.

## Reversibilidade

Nada do build padrão foi removido: `vite.config.ts`, os endpoints de coleta e a
publicação atual continuam funcionando como antes. A hospedagem estática vive
em arquivos separados — `vite.config.static.ts`, `public/.htaccess`, o script
`build:hostgator` (com `scripts/hostgator-assets.mjs` e `scripts/hostgator-seo.mjs`)
e este documento. Apagar esses itens devolve o projeto ao estado anterior.
