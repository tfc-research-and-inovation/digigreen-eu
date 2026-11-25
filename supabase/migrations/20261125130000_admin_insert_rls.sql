-- Admin area: logged-in users can create news, resources, projects.
-- Requires public signups to be disabled (docs/supabase-disable-signups.md).
-- anon is unchanged: read-only, published rows only.

grant insert on public.news, public.resources, public.projects to authenticated;

create policy "Admin insert news"      on public.news      for insert to authenticated with check (true);
create policy "Admin insert resources" on public.resources for insert to authenticated with check (true);
create policy "Admin insert projects"  on public.projects  for insert to authenticated with check (true);
