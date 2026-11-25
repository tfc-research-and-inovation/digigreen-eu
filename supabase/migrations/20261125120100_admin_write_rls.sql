-- Admin area: logged-in users can read all rows and update news, resources, projects.
-- Requires public signups to be disabled (docs/supabase-disable-signups.md).
-- anon is unchanged: read-only, published rows only.

grant select, update on public.news, public.resources, public.projects to authenticated;

create policy "Admin read all news"      on public.news      for select to authenticated using (true);
create policy "Admin read all resources" on public.resources for select to authenticated using (true);
create policy "Admin read all projects"  on public.projects  for select to authenticated using (true);

create policy "Admin update news"      on public.news      for update to authenticated using (true) with check (true);
create policy "Admin update resources" on public.resources for update to authenticated using (true) with check (true);
create policy "Admin update projects"  on public.projects  for update to authenticated using (true) with check (true);
