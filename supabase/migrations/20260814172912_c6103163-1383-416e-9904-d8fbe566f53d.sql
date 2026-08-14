ALTER TABLE public.tse_snapshots
  ADD COLUMN IF NOT EXISTS conferido boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS conferido_em timestamptz NULL,
  ADD COLUMN IF NOT EXISTS conferido_nota text NULL;

UPDATE public.tse_snapshots
SET conferido = true,
    conferido_em = now(),
    conferido_nota = 'Recontagem independente 14/08: total 18.343 distintas na fotografia das 22:34, proporcional feminino 35,3%, bate com o banco. Aprovado.'
WHERE id = (
  SELECT id FROM public.tse_snapshots
  WHERE status IN ('ok','anomalia')
  ORDER BY collected_at DESC
  LIMIT 1
);