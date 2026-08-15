// Build estático para hospedagem Apache (HostGator Plano M).
//
// Não substitui o build padrão (`vite.config.ts`), usado pela publicação atual.
// Aqui o site é pré-renderizado rota por rota e sai como arquivos estáticos,
// com fallback de SPA para navegação no cliente. Nenhum código de servidor é
// necessário: as leituras de dados vão direto ao banco com a chave publicável.
//
// Uso: `bun run build:hostgator` → suba o conteúdo de `dist/client/` para a
// pasta `public_html` da HostGator.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

/** Rotas despublicadas: existem no código, mas redirecionam para a home. */
const UNPUBLISHED = ["/historico"];

export default defineConfig({
  // Sem nitro: o alvo é Apache estático, não um runtime de servidor.
  nitro: false,
  tanstackStart: {
    // Mesma entrada de servidor do build padrão (src/server.ts): ela é usada
    // apenas durante o pré-render, e não vai para a hospedagem.
    server: { entry: "server" },
    // Sem shell de SPA: o shell é gerado a partir de "/" e ocuparia o lugar do
    // HTML da home. Como todas as rotas do site são pré-renderizadas, o
    // fallback do .htaccess é o próprio /index.html, e o roteador assume no
    // cliente (inclusive para mostrar a página 404 em endereços inexistentes).
    spa: { enabled: false },
    prerender: {
      enabled: true,
      crawlLinks: true,
      // Rotas com dados: o HTML sai com a fotografia vigente no momento do
      // build; ao abrir, o navegador relê o banco e mostra a fotografia atual.
      // Rotas despublicadas não geram HTML: o redirecionamento fica no
      // .htaccess, para não servir uma página que o site não publica.
      filter: ({ path }: { path: string }) =>
        !path.startsWith("/api") && !UNPUBLISHED.includes(path),
    },
  },
});

