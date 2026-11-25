# Todo: Admin Area

Spec: `docs/SPEC-admin.md` · Plan: `tasks/plan-admin.md`

## T1: Rename `sister_projects` → `projects`
**Acceptance:**
- [x] New `supabase/migrations/<ts>_rename_sister_projects.sql`: renames the table, the index
  `sister_projects_sort_order_idx` → `projects_sort_order_idx` and the trigger
  `sister_projects_set_updated_at` → `projects_set_updated_at`
- [x] `supabase/seed.sql` inserts into `public.projects`
- [x] `src/app/types/database.types.ts` key `sister_projects` → `projects`
- [x] `docs/SUPABASE-code-changes.md` refers to `projects`
- [x] The existing migrations are untouched
**Verification:**
- [x] `grep -rn sister_projects src supabase` finds only the old migrations
- [x] `npm run build` passes
- [x] (if the local stack runs) `npm run db:reset` succeeds
**Dependencies:** None · **Files:** 4 · **Scope:** S

## T2: Admin write RLS migration
**Acceptance:**
- [x] New `supabase/migrations/<ts>_admin_write_rls.sql` (timestamp after T1) for `news`,
  `resources`, `projects`: `grant select, update … to authenticated`, a select policy
  `to authenticated using (true)` and an update policy `to authenticated using (true) with check (true)`
- [x] Nothing changes for `anon`
**Verification:**
- [x] SQL review by you. (If the local stack runs: `npm run db:reset` succeeds.)
**Dependencies:** T1 · **Files:** 1 · **Scope:** XS

## T3: Install Font Awesome
**Acceptance:**
- [x] `@fortawesome/fontawesome-free` is in `dependencies`
- [x] `node_modules/@fortawesome/fontawesome-free/css/all.min.css` is added to `styles` in `angular.json`
**Verification:**
- [x] `npm run build` passes, and a `<i class="fa-solid fa-pen">` renders (checked in T4)
**Dependencies:** None · **Files:** package.json, package-lock.json, angular.json · **Scope:** XS

## T4: Routes, layout, login, shell, dashboard
**Acceptance:**
- [x] `src/app/admin/admin.routes.ts` is lazy-loaded at `admin` in `app.routes.ts`, before `'**'`
- [x] `LayoutComponent` hides `<app-header>`/`<app-footer>` on `/admin*`
- [x] `/admin/login`: email + password + Login. It calls `Supabase.login()` and always navigates to `/admin`
- [x] `/admin`: shell with a sidemenu (Resources `fa-file-lines`, News `fa-newspaper`,
  Projects `fa-diagram-project`) and an empty dashboard child
- [x] No link to `/admin` anywhere in the public UI
**Verification:**
- [x] `npm run build` passes. Manual: login flow, sidemenu visible, `/` still has the header and footer
**Dependencies:** T3 · **Files:** app.routes.ts, layout.component.(ts|html), admin.routes.ts, admin-login.ts, admin-shell.ts, admin-dashboard.ts · **Scope:** M

## T5: Data service + helper + News list
**Acceptance:**
- [x] `admin-data.service.ts`: `page(table, page)` (`count: 'exact'`, `created_at desc`, `range`,
  10 per page), `getById(table, id)`, `update(table, id, patch)`. Uses the `PartnersService`
  error style
- [x] `form-utils.ts`: `toModel`, `toPatch` (null ↔ '', tags ↔ comma string)
- [x] `/admin/news`: table title, publish_date, is_published, is_archived. Edit button
  (`fa-pen`, routes to `/admin/news/:id`) and Delete button (`fa-trash`, does nothing).
  `Page X of Y` with Prev/Next, disabled at the first and last pages
**Verification:**
- [x] `npm run build` passes. Manual: rows newest first, paging moves through the pages
**Dependencies:** T4 · **Files:** 3 + route entry · **Scope:** M

## T6: News edit
**Acceptance:**
- [x] `/admin/news/:id` loads the row and builds a `form()` model from `toModel`. Every non-system
  field is shown with the input type from the spec
- [x] Save → `update('news', id, toPatch(...))` → navigate to `/admin/news`. Cancel → navigate back.
  On error: `console.error`, stay on the page
- [x] No validators
**Verification:**
- [x] `npm run build` passes. **Checkpoint B:** an edit is persisted in Supabase (needs the migrations applied and the real user logged in)
**Dependencies:** T5 · **Files:** admin-news-edit.ts + route entry · **Scope:** S

## T7: Resources list + edit
**Acceptance:**
- [x] `/admin/resources` columns: title, resource_type, publish_date, is_published, Actions
- [x] `/admin/resources/:id` has all the resources fields from the spec. Save/Cancel as in T6
**Verification:**
- [x] `npm run build` passes. Manual edit is persisted
**Dependencies:** T6 · **Files:** 2 + route entries · **Scope:** S

## T8: Projects list + edit
**Acceptance:**
- [x] `/admin/projects` columns: name, status, belongs_to_project, Actions (table `projects`)
- [x] `/admin/projects/:id` has all the projects fields from the spec. Save/Cancel as in T6
**Verification:**
- [x] `npm run build` passes. Manual edit is persisted (needs T1 applied remotely)
**Dependencies:** T6, T1 · **Files:** 2 + route entries · **Scope:** S
