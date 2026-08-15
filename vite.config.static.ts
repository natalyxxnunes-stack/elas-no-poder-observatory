// Build estático para hospedagem Apache (HostGator Plano M).
//
// Não substitui o build padrão (`vite.config.ts`), usado pela publicação atual.
// Aqui o site é pré-renderizado rota por rota e sai como arquivos estáticos,
// com fallback de SPA para navegação no cliente. Nenhum código de servidor é
// necessário: as leituras de dados vão direto ao banco com a chave publicável.
//
// Uso: `bun run build:hostgator` → suba o conteúdo de `.output/public/` para a
// pasta `public_html` da HostGator.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: { preset: "static" },
  tanstackStart: {
    // Mesma entrada de servidor do build padrão (src/server.ts): ela é usada
    // apenas durante o pré-render, e não vai para a hospedagem.
    server: { entry: "server" },
    // Fallback de SPA: qualquer rota não pré-renderizada ainda abre no cliente.

    spa: { enabled: true },
    prerender: {
      enabled: true,
      crawlLinks: true,
      // Rotas com dados: o HTML sai com a fotografia vigente no momento do
      // build; ao abrir, o navegador relê o banco e mostra a fotografia atual.
      filter: ({ path }: { path: string }) => !path.startsWith("/api"),
    },
  },
});
