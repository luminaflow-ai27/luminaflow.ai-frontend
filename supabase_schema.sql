-- Users
create table if not exists users (
  id uuid primary key,
  email text unique not null,
  role text default 'user' check (role in ('user','admin')),
  status text default 'active',
  whop_user_id text,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Plans
create table if not exists plans (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  price integer not null,
  quotas jsonb not null, -- e.g. {"api_calls":10000,"team_members":5,"integrations":3}
  created_at timestamp default now()
);

-- Subscriptions
create table if not exists subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id) on delete cascade,
  plan_id uuid references plans(id),
  status text not null check (status in ('active','canceled','past_due')),
  start_date timestamp not null default now(),
  cancel_date timestamp,
  custom_quotas jsonb,
  created_at timestamp default now()
);

-- Usage logs
create table if not exists usage_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id) on delete cascade,
  action text not null,
  resource_type text,
  count integer not null default 1,
  metadata jsonb,
  created_at timestamp default now()
);

-- Helpful index
create index if not exists usage_logs_user_period_idx
  on usage_logs (user_id, created_at);

-- Seed plans (optional)
insert into plans (name, price, quotas)
values
  ('Basic', 79, '{"api_calls":10000,"team_members":5,"integrations":3}'),
  ('Pro', 229, '{"api_calls":100000,"team_members":20,"integrations":10}')
on conflict do nothing;