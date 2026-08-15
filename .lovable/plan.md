# Hospedagem na HostGator (Plano M) — análise de viabilidade e plano

## Resumo da viabilidade

É viável, com uma ressalva de SEO. O Plano M da HostGator é hospedagem compartilhada Apache/PHP: serve arquivos estáticos, mas **não executa Node/SSR**. Hoje o site depende de servidor em três pontos:

1. leituras de dados via `createServerFn` (fotografia vigente, série histórica, carimbo do rodapé, CSV);
2. os dois endpoints de coleta (`/api/public/tse/ingest`, `/api/public/tse/ingest-history`);
3. renderização SSR das páginas.

Os itens 1 e 3 têm solução limpa: a tabela `tse_snapshots` e `tse_historical_snapshots` já têm RLS com **leitura pública para `anon`** (verificado), e cada fotografia pesa ~13 KB. Ou seja, o navegador pode ler os dados direto do banco com a chave publicável — sem servidor, sem service role. O item 2 vai para o Supabase (função de borda), acionada pelo cron que já existe.

Visual, conteúdo editorial, rotas, gráficos, interações, glossário, limiares de base mínima e a regra de vigência (`conferido = true` + status publicável) permanecem exatamente como estão.

## Arquitetura proposta

```text
HostGator (Apache, estático)          Supabase (banco + borda)
┌──────────────────────────┐          ┌───────────────────────────────┐
│ HTML pré-renderizado por │  fetch   │ tse_snapshots (RLS: anon read)│
│ rota + JS/CSS/imagens    │ ───────► │ tse_historical_snapshots      │
│ .htaccess (fallback SPA) │  anon    ├───────────────────────────────┤
└──────────────────────────┘          │ Edge Function ingest-tse      │
                                      │ Edge Function ingest-history  │
                                      │ pg_cron + CRON_SECRET         │
                                      └───────────────────────────────┘
```

## O que muda no código

**Nova camada de leitura no navegador (isomórfica, sem segredo)**
- Criar `src/lib/tse/snapshot.reads.ts` e `src/lib/tse/historical.reads.ts` com as mesmas consultas, tipos e regra de vigência de hoje, usando o cliente publicável de `@/integrations/supabase/client`. Nada de `process.env`.
- Reescrever `src/lib/tse/snapshot.functions.ts` e `src/lib/tse/historical.functions.ts` como reexportações finas dessas funções (ou remover os arquivos e ajustar imports). O `createServerFn` sai.
- `getLatestTseSnapshotCsv` passa a ser função pura em `src/lib/tse/snapshot-csv.ts`: recebe o snapshot já carregado e devolve `{ fileName, content }`. O texto do CSV, os comentários de cabeçalho e o carimbo continuam idênticos.

**Rotas e componentes (ajuste mecânico, sem mudança de conteúdo)**
- `src/routes/index.tsx`, `quem-sao-elas.tsx`, `funil.tsx`, `historico.tsx`, `metodo.tsx`: os `loader` continuam existindo, apenas chamam as funções de leitura novas (funcionam tanto no pré-render quanto no navegador).
- `src/components/SiteFooter.tsx`: troca `useServerFn(getSnapshotStamp)` por leitura direta em `useQuery`.
- `src/routes/metodo.tsx`: o botão de CSV monta o arquivo no navegador a partir do snapshot já em mãos — mesmo nome de arquivo, mesmo conteúdo, mesma nota de conferência.

**Build estático**
- Configurar pré-renderização de todas as rotas no build e saída estática (`dist/`), com fallback SPA. Cada rota gera seu próprio HTML com `head()` completo — títulos, descrições, `og:*` e `twitter:image` continuam servidos no HTML.
- Adicionar `public/.htaccess`: `RewriteRule` para `index.html` nas rotas sem arquivo correspondente, mais compressão e cache de assets com hash.

**Coleta (o que exige servidor de verdade)**
- Criar Edge Function `ingest-tse` no Supabase reaproveitando `src/lib/tse/parse.ts`, `compute.ts`, `data-dictionary.ts` e a lógica de `ingest.server.ts` (baixa o ZIP do TSE, descompacta com `fflate`, conta, calcula SHA-256, grava a fotografia com `status`/`conferido = false`).
- Criar `ingest-history` equivalente para 2014/2018/2022, mantida sob demanda.
- Atualizar o job `ingest-tse-candidatos-2026-diario` no `pg_cron` para chamar a função de borda, seguindo com `CRON_SECRET` no header. A service role permanece dentro do Supabase; nada dela entra no bundle.
- Remover `src/routes/api/public/tse/ingest.ts` e `ingest-history.ts` e mover `ingest.server.ts` / `historical-ingest.server.ts` para a pasta da função de borda (`supabase/functions/...`), preservando os textos de nota e a lógica de anomalias.

## O que permanece igual

Todo `src/components/**` editorial e de gráficos, `src/data/**`, `src/lib/tse/compute.ts`, `indicators.ts`, `parse.ts`, os dicionários de dados, `src/styles.css`, `__root.tsx` (metas incluídas) e o texto de todas as rotas. A lógica de conferência/publicação de fotografias não muda: continua exigindo `conferido = true`, e a liberação segue sendo feita nos dados.

## Limitações do SPA/pré-render (honestas)

- **Dado no HTML congela no build.** O HTML pré-renderizado carrega os números do momento do build; ao abrir, o navegador relê o banco e mostra a fotografia vigente. Efeito prático: um crawler que não executa JS pode ler números de uma fotografia anterior. Mitigação: republicar o build quando uma nova fotografia for liberada (o mesmo momento em que hoje você confere e libera), ou pré-renderizar as páginas com o dado buscado só no cliente e o texto metodológico fixo. Recomendo a primeira, que preserva o SEO com números.
- **Sem servidor não há redirect 301, header HTTP dinâmico nem rota de API própria** — o que houver disso passa a ser `.htaccess`.
- **A chave publicável fica visível no bundle** (já é assim hoje no navegador; é o comportamento previsto pelo Supabase e a proteção real é a RLS).
- **Coleta na borda tem limite de CPU/tempo.** A base de 2026 (19 mil linhas) passa com folga; os pacotes históricos são muito maiores e podem estourar o limite. Como 2014/2018/2022 já estão gravados e são eleições encerradas, o caminho seguro é manter `ingest-history` como execução pontual e, se estourar, rodar o script localmente gravando pelo banco.
- **404 real:** o Apache devolverá 200 com o HTML do app na rota inexistente (fallback SPA), e o app mostra a página 404. É o comportamento padrão de SPA estática.

## Riscos apontados

1. **Grants amplos em `public`** (verificado): `anon` tem `INSERT/UPDATE/DELETE` concedidos em `tse_snapshots` e `tse_historical_snapshots`; só a RLS impede a escrita. Com o site 100% no navegador, isso passa a ser a única barreira. Recomendo revogar tudo menos `SELECT` de `anon` na mesma etapa.
2. **Migração da coleta é o ponto de maior risco funcional** — se a função de borda falhar silenciosamente, a fotografia para de atualizar. Manter as gravações de `falha_coleta` que já existem e conferir o histórico do Método após a primeira execução agendada.
3. **CORS/rede da HostGator** não afeta chamadas do navegador ao Supabase, mas domínio próprio precisa estar com HTTPS ativo para o `fetch` não ser bloqueado por conteúdo misto.
4. **Perda de SSR** significa primeira pintura com estado de carregamento nos blocos de dados; o texto editorial aparece imediatamente.

## Ordem de execução sugerida

1. Camada de leitura no navegador + CSV puro; rotas apontando para ela.
2. Build estático com pré-render + `.htaccess`; conferência visual de todas as rotas.
3. Funções de borda de coleta + troca do cron + revogação dos grants excedentes.
4. Remoção das rotas `api/public/tse/*` e dos `*.server.ts` já migrados.
5. Verificação final: fotografia vigente de 14/08 (coletada 15/08, 19.050 registros) exibida igual, histórico intacto, CSV baixando com o mesmo conteúdo.
