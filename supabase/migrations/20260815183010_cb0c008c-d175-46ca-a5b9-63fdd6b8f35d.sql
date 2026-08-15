SELECT cron.alter_job(
  job_id := 1,
  command := $job$
  SELECT net.http_post(
    url := 'https://project--03e04c2f-432b-4446-a78b-a3aa493e5a15.lovable.app/api/public/tse/ingest',
    headers := '{"Content-Type": "application/json", "apikey": "6415399f0be452cfa5348eac55ed882e00c65488732aa450fadfa00d6c136167"}'::jsonb,
    body := '{}'::jsonb
  ) as request_id;
  $job$
);