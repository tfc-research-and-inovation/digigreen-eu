-- Public read-only access. Writes only via Dashboard / service role (bypasses RLS).

alter table public.events          enable row level security;
alter table public.news            enable row level security;
alter table public.partners        enable row level security;
alter table public.sister_projects enable row level security;
alter table public.resources       enable row level security;
alter table public.tools           enable row level security;
alter table public.organizations   enable row level security;

create policy "Public read events"          on public.events          for select to anon, authenticated using (true);
create policy "Public read partners"        on public.partners        for select to anon, authenticated using (true);
create policy "Public read sister projects" on public.sister_projects for select to anon, authenticated using (true);

create policy "Public read published news"          on public.news          for select to anon, authenticated using (is_published);
create policy "Public read published resources"     on public.resources     for select to anon, authenticated using (is_published);
create policy "Public read published tools"         on public.tools         for select to anon, authenticated using (is_published);
create policy "Public read published organizations" on public.organizations for select to anon, authenticated using (is_published);

-- Defence in depth: clients can only read.
revoke insert, update, delete, truncate on
  public.events, public.news, public.partners, public.sister_projects,
  public.resources, public.tools, public.organizations
from anon, authenticated;
