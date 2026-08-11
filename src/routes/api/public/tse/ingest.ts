/**
 * Endpoint de coleta diária da base do TSE.
 *
 * Chamado por agendamento (pg_cron) com a chave publicável no header `apikey`.
 * Executa a ingestão e grava um novo snapshot. Não devolve dados pessoais.
 */
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/tse/ingest")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const expected =
          process.env["SUPABASE_PUBLISHABLE_KEY"] ??
          process.env["SUPABASE_ANON_KEY"];
        const provided =
          request.headers.get("apikey") ??
          request.headers.get("authorization")?.replace("Bearer ", "");
        if (!expected || !provided || provided !== expected) {
          return new Response(JSON.stringify({ error: "unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
          });
        }

        const { supabaseAdmin } = await import(
          "@/integrations/supabase/client.server"
        );
        const { runIngest } = await import("@/lib/tse/ingest.server");
        const outcome = await runIngest(supabaseAdmin);

        return new Response(JSON.stringify(outcome), {
          status: outcome.ok ? 200 : 202,
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
