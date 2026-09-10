-- Tech Hause groups + messaging
-- Run in the Supabase SQL editor. Then add
-- NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null,
  bio text,
  plan_id text not null default 'member',
  subscription_status text not null default 'none',
  created_at timestamptz not null default now()
);

create table if not exists public.groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  plan_id text not null default 'member',
  created_at timestamptz not null default now()
);

create table if not exists public.group_members (
  group_id uuid not null references public.groups (id) on delete cascade,
  profile_id uuid not null references public.profiles (id) on delete cascade,
  primary key (group_id, profile_id)
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.groups (id) on delete cascade,
  profile_id uuid not null references public.profiles (id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists messages_group_created_idx
  on public.messages (group_id, created_at);

alter table public.profiles enable row level security;
alter table public.groups enable row level security;
alter table public.group_members enable row level security;
alter table public.messages enable row level security;

create or replace function public.has_plan(needed text)
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and (
        needed = 'member'
        or plan_id = 'circle'
        or subscription_status = 'active'
      )
  );
$$;

create policy "profiles are readable by members"
  on public.profiles for select
  using (auth.uid() is not null);

create policy "you can edit your profile"
  on public.profiles for update
  using (id = auth.uid());

create policy "groups visible when the plan matches"
  on public.groups for select
  using (public.has_plan(plan_id));

create policy "members can see their rooms"
  on public.group_members for select
  using (profile_id = auth.uid() or public.has_plan('member'));

create policy "members can join open rooms"
  on public.group_members for insert
  with check (profile_id = auth.uid() and public.has_plan('member'));

create policy "read messages in rooms you can access"
  on public.messages for select
  using (
    exists (
      select 1 from public.groups g
      where g.id = messages.group_id and public.has_plan(g.plan_id)
    )
  );

create policy "send messages in rooms you can access"
  on public.messages for insert
  with check (
    profile_id = auth.uid()
    and exists (
      select 1 from public.groups g
      where g.id = messages.group_id and public.has_plan(g.plan_id)
    )
  );

alter publication supabase_realtime add table public.messages;

insert into public.groups (name, description, plan_id)
values
  ('The House', 'The open room for Tech Hause members.', 'member'),
  ('After the Night', 'What stayed after Tech After Dark.', 'member'),
  ('Circle', 'A closer room. Circle plan.', 'circle')
on conflict do nothing;
