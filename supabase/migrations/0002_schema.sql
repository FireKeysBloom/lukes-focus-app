-- =========================================================
-- goals: persistent objects representing ongoing projects
-- =========================================================
create table if not exists public.goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  title text not null check (char_length(trim(title)) > 0),
  description text,
  status text not null default 'active' check (status in ('active','paused','completed','archived')),
  color text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_goals_user_status on public.goals (user_id, status);

create trigger trg_goals_updated_at
  before update on public.goals
  for each row execute function public.set_updated_at();

alter table public.goals enable row level security;

create policy "goals_select_own" on public.goals
  for select to authenticated using (auth.uid() = user_id);
create policy "goals_insert_own" on public.goals
  for insert to authenticated with check (auth.uid() = user_id);
create policy "goals_update_own" on public.goals
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "goals_delete_own" on public.goals
  for delete to authenticated using (auth.uid() = user_id);

-- =========================================================
-- sessions: full ritual->block->reflection sessions AND
-- quick struggle logs, in one table (entry_mode discriminates)
-- =========================================================
create table if not exists public.sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  goal_id uuid references public.goals(id) on delete set null,

  entry_mode text not null default 'full' check (entry_mode in ('full','quick_log')),
  status text not null default 'planned' check (status in ('planned','active','completed','abandoned')),
  category text check (category in ('pilot','plane','engineer')),

  -- Step 1: startup ritual (all nullable; quick_log rows leave these null)
  goal_statement text,              -- the session-specific intention, distinct from goal_id
  resources_needed text,
  playlist_url text,
  checklist_no_clash boolean not null default false,
  checklist_notified_others boolean not null default false,
  checklist_freedom_enabled boolean not null default false,
  checklist_notifications_off boolean not null default false,
  planned_duration_minutes integer not null default 50 check (planned_duration_minutes > 0),

  -- Step 2: the focus block
  started_at timestamptz,
  ended_at timestamptz,
  ended_early boolean not null default false,
  end_reason text,
  actual_duration_minutes numeric generated always as (
    round(extract(epoch from (ended_at - started_at)) / 60.0, 1)
  ) stored,                          -- null unless both timestamps are set
  estimated_duration_minutes numeric check (estimated_duration_minutes >= 0), -- quick_log fallback, no precise timer

  -- Step 3: reflection & log
  focus_quality_rating smallint check (focus_quality_rating between 1 and 5),
  flow_rating smallint check (flow_rating between 1 and 5),
  what_worked text,
  what_got_in_the_way text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint sessions_end_after_start check (
    ended_at is null or started_at is null or ended_at >= started_at
  )
);

create index if not exists idx_sessions_user_started  on public.sessions (user_id, started_at desc);
create index if not exists idx_sessions_user_created  on public.sessions (user_id, created_at desc);
create index if not exists idx_sessions_user_goal     on public.sessions (user_id, goal_id);
create index if not exists idx_sessions_user_category on public.sessions (user_id, category);

create trigger trg_sessions_updated_at
  before update on public.sessions
  for each row execute function public.set_updated_at();

alter table public.sessions enable row level security;

create policy "sessions_select_own" on public.sessions
  for select to authenticated using (auth.uid() = user_id);
create policy "sessions_insert_own" on public.sessions
  for insert to authenticated with check (auth.uid() = user_id);
create policy "sessions_update_own" on public.sessions
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "sessions_delete_own" on public.sessions
  for delete to authenticated using (auth.uid() = user_id);

-- =========================================================
-- user_settings: one row per user (singleton via PK on user_id)
-- =========================================================
create table if not exists public.user_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  daily_ceiling_minutes integer not null default 210 check (daily_ceiling_minutes > 0), -- 3.5h default
  accountability_partner_name text,
  accountability_partner_phone text,
  default_playlist_url text,
  ios_shortcut_name text,           -- exact Shortcuts.app shortcut name; null = show fallback checklist
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger trg_user_settings_updated_at
  before update on public.user_settings
  for each row execute function public.set_updated_at();

alter table public.user_settings enable row level security;

create policy "user_settings_select_own" on public.user_settings
  for select to authenticated using (auth.uid() = user_id);
create policy "user_settings_insert_own" on public.user_settings
  for insert to authenticated with check (auth.uid() = user_id);
create policy "user_settings_update_own" on public.user_settings
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "user_settings_delete_own" on public.user_settings
  for delete to authenticated using (auth.uid() = user_id);
