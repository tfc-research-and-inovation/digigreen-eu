-- Rename sister_projects -> projects (admin menu shows "Projects").
-- RLS policies and grants follow the table automatically.

alter table public.sister_projects rename to projects;
alter index public.sister_projects_sort_order_idx rename to projects_sort_order_idx;
alter trigger sister_projects_set_updated_at on public.projects rename to projects_set_updated_at;
