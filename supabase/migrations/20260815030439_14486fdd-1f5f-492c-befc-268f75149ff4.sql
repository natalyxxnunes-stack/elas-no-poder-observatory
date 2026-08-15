ALTER TABLE public.tse_snapshots ADD COLUMN IF NOT EXISTS zip_sha256 text;
ALTER TABLE public.tse_snapshots ADD COLUMN IF NOT EXISTS brasil_csv_sha256 text;