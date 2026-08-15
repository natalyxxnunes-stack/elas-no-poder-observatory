/**
 * Endpoint de coleta das fotografias históricas (2014, 2018, 2022).
 *
 * Chamado manualmente/por agendamento com a chave publicável no header
 * `apikey`. Eleições encerradas: a coleta só precisa ser repetida se o TSE
 * republicar o pacote. Não devolve dados pessoais.
 */
import { createFileRoute } from "@tanstack/react-router";

const ALLOWED_YEARS = [2014, 2018, 2022] as const;

export const Route = createFileRoute("/api/public/tse/ingest-history")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const expected = process.env["CRON_SECRET"];
        const provided =
          request.headers.get("apikey") ??
          request.headers.get("authorization")?.replace("Bearer ", "");
        if (!expected || !provided || provided !== expected) {
          return new Response(JSON.stringify({ error: "unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
          });
        }

        const url = new URL(request.url);
        const requested = url.searchParams.get("year");
        let years = [...ALLOWED_YEARS] as unknown as Array<
          (typeof ALLOWED_YEARS)[number]
        >;
        if (requested) {
          const parsed = Number(requested);
          const match = ALLOWED_YEARS.find((y) => y === parsed);
          if (!match) {
            return new Response(
              JSON.stringify({ error: "ano fora da série histórica" }),
              { status: 400, headers: { "Content-Type": "application/json" } },
            );
          }
          years = [match];
        }

        const { supabaseAdmin } = await import(
          "@/integrations/supabase/client.server"
        );
        const { runHistoricalIngestAll } = await import(
          "@/lib/tse/historical-ingest.server"
        );
        const outcomes = await runHistoricalIngestAll(supabaseAdmin, years);

        return new Response(JSON.stringify({ outcomes }), {
          status: outcomes.every((o) => o.ok) ? 200 : 202,
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
