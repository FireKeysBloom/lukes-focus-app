-- Enables gen_random_uuid(); idempotent, safe even if Supabase already has it.
create extension if not exists pgcrypto;

-- Shared trigger function: keeps updated_at current on every UPDATE.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
