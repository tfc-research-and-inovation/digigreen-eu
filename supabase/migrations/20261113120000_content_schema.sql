-- Content tables replacing public/data/*.json

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.events (
  id               text primary key default gen_random_uuid()::text,
  title            text not null,
  description      text,
  event_date       date not null,
  event_time       text,
  location         text,
  event_type       text check (event_type in ('Roundtable','Workshop','Hackathon','Conference','Webinar','Other')),
  registration_url text,
  is_upcoming      boolean not null default false,
  url              text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);
create index events_event_date_idx on public.events (event_date);

create table public.news (
  id           text primary key default gen_random_uuid()::text,
  title        text not null,
  excerpt      text not null,
  content      text,
  image_url    text,
  image_alt    text,
  publish_date date not null,
  tags         text[] not null default '{}',
  is_archived  boolean not null default false,
  is_published boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index news_publish_date_idx on public.news (publish_date desc);

create table public.partners (
  id             text primary key default gen_random_uuid()::text,
  name           text not null,
  acronym        text not null,
  country        text not null,
  logo_url       text,
  website        text,
  is_coordinator boolean not null default false,
  description    text,
  sort_order     integer not null default 0,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
create index partners_sort_order_idx on public.partners (sort_order);

create table public.sister_projects (
  id                 text primary key default gen_random_uuid()::text,
  name               text not null,
  description        text not null,
  website            text,
  logo_url           text,
  status             text not null check (status in ('Onboard','Collaborator')),
  tags               text[] not null default '{}',
  contact_name       text,
  contact_email      text,
  is_featured        boolean not null default false,
  featured_only      boolean not null default false,
  is_coordinator     boolean not null default false,
  belongs_to_project text,
  sort_order         integer not null default 0,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);
create index sister_projects_sort_order_idx on public.sister_projects (sort_order);

create table public.resources (
  id                 text primary key default gen_random_uuid()::text,
  title              text not null,
  resource_type      text not null check (resource_type in ('Deliverable','Publication','Better Practice Guide','Policy Brief','Data & DMP')),
  description        text,
  file_url           text not null,
  publish_date       date,
  authors            text,
  work_package       text,
  deliverable_number text,
  belongs_to_project text,
  is_published       boolean not null default false,
  hide_publish_day   boolean not null default false,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);
create index resources_publish_date_idx on public.resources (publish_date desc);

create table public.tools (
  id           text primary key default gen_random_uuid()::text,
  title        text not null,
  url          text not null,
  description  text,
  is_published boolean not null default false,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index tools_sort_order_idx on public.tools (sort_order);

create table public.organizations (
  id           text primary key default gen_random_uuid()::text,
  name         text not null,
  website      text,
  description  text,
  logo_url     text,
  country      text,
  is_published boolean not null default false,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index organizations_sort_order_idx on public.organizations (sort_order);

do $$
declare t text;
begin
  foreach t in array array['events','news','partners','sister_projects','resources','tools','organizations'] loop
    execute format(
      'create trigger %I before update on public.%I for each row execute function public.set_updated_at()',
      t || '_set_updated_at', t);
  end loop;
end;
$$;
