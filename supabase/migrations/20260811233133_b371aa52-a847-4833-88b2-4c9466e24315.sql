CREATE TABLE public.tse_historical_snapshots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  election_year INTEGER NOT NULL,
  collected_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  base_generated_at TIMESTAMP WITH TIME ZONE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'ok',
  processing_version TEXT NOT NULL,
  dictionary_version TEXT NOT NULL,
  raw_line_count INTEGER NOT NULL DEFAULT 0,
  record_count INTEGER NOT NULL DEFAULT 0,
  duplicate_rows INTEGER NOT NULL DEFAULT 0,
  rows_without_key INTEGER NOT NULL DEFAULT 0,
  out_of_scope INTEGER NOT NULL DEFAULT 0,
  columns_found JSONB NOT NULL DEFAULT '[]'::jsonb,
  filters JSONB NOT NULL DEFAULT '[]'::jsonb,
  aggregates JSONB NOT NULL DEFAULT '{}'::jsonb,
  anomalies JSONB NOT NULL DEFAULT '[]'::jsonb,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX tse_historical_snapshots_year_idx
  ON public.tse_historical_snapshots (election_year, collected_at DESC);

GRANT SELECT ON public.tse_historical_snapshots TO anon;
GRANT SELECT ON public.tse_historical_snapshots TO authenticated;
GRANT ALL ON public.tse_historical_snapshots TO service_role;

ALTER TABLE public.tse_historical_snapshots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Fotografias historicas sao publicas para leitura"
  ON public.tse_historical_snapshots
  FOR SELECT
  USING (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_tse_historical_snapshots_updated_at
  BEFORE UPDATE ON public.tse_historical_snapshots
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();