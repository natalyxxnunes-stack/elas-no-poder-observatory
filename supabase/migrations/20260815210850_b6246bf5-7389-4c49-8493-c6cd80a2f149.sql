REVOKE INSERT, UPDATE, DELETE ON public.tse_snapshots FROM anon;
REVOKE INSERT, UPDATE, DELETE ON public.tse_historical_snapshots FROM anon;
GRANT SELECT ON public.tse_snapshots TO anon;
GRANT SELECT ON public.tse_historical_snapshots TO anon;
GRANT ALL ON public.tse_snapshots TO service_role;
GRANT ALL ON public.tse_historical_snapshots TO service_role;