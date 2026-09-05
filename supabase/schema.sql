create extension if not exists pgcrypto;

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  team_code text not null unique,
  district_name text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.assessment_cycles (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  opens_at timestamptz,
  closes_at timestamptz,
  status text not null default 'draft' check (status in ('draft','open','closed')),
  created_at timestamptz not null default now()
);

create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  cycle_id uuid references public.assessment_cycles(id) on delete set null,
  stakeholder_group text not null check (stakeholder_group in ('leader','staff','student','family','community','design_team')),
  responses jsonb not null,
  domain_scores jsonb not null,
  evidence_confidence jsonb not null,
  reflections jsonb not null default '{}'::jsonb,
  top_priority_domain text,
  created_at timestamptz not null default now(),
  constraint valid_response_count check (jsonb_array_length(responses) = 25)
);

create table public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  url text,
  domain_id text not null,
  indicator_id integer,
  readiness_level text,
  audience text,
  resource_type text,
  time_required text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.action_plans (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  cycle_id uuid references public.assessment_cycles(id) on delete set null,
  domain_id text not null,
  condition_id integer,
  rationale text,
  action text not null,
  owner text,
  evidence text,
  check_in_date date,
  status text not null default 'planned' check (status in ('planned','in_progress','complete')),
  created_at timestamptz not null default now()
);

create index submissions_org_cycle_idx on public.submissions(organization_id,cycle_id);
create index submissions_group_idx on public.submissions(stakeholder_group);
create index resources_domain_idx on public.resources(domain_id,indicator_id);

alter table public.organizations enable row level security;
alter table public.assessment_cycles enable row level security;
alter table public.submissions enable row level security;
alter table public.resources enable row level security;
alter table public.action_plans enable row level security;

-- The included server routes use the service-role key and enforce access there.
-- Do not expose the service-role key in browser code.
