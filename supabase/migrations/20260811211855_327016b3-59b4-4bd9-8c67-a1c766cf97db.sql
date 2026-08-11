CREATE TABLE public.tse_snapshots (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  collected_at timestamptz NOT NULL DEFAULT now(),
  base_generated_at timestamptz,
  file_name text NOT NULL,
  file_url text NOT NULL,
  record_count integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'ok',
  processing_version text NOT NULL,
  columns_found jsonb NOT NULL DEFAULT '[]'::jsonb,
  filters jsonb NOT NULL DEFAULT '[]'::jsonb,
  situation_values jsonb NOT NULL DEFAULT '{}'::jsonb,
  universes jsonb NOT NULL DEFAULT '{}'::jsonb,
  indicators jsonb NOT NULL DEFAULT '{}'::jsonb,
  anomalies jsonb NOT NULL DEFAULT '[]'::jsonb,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX tse_snapshots_collected_at_idx ON public.tse_snapshots (collected_at DESC);
CREATE INDEX tse_snapshots_status_idx ON public.tse_snapshots (status);

GRANT SELECT ON public.tse_snapshots TO anon;
GRANT SELECT ON public.tse_snapshots TO authenticated;
GRANT ALL ON public.tse_snapshots TO service_role;

ALTER TABLE public.tse_snapshots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Fotografias do TSE sao publicas para leitura"
ON public.tse_snapshots FOR SELECT
TO anon, authenticated
USING (true);