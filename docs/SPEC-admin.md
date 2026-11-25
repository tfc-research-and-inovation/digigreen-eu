# Spec: Admin Area (login + content tables + edit)

## Objective
A hidden admin area where one content manager edits News, Resources and Projects directly in
Supabase. No link to it exists in the public UI; the URL is shared privately.

**Goal of this iteration:** prove the app can read **and update** Supabase rows from the browser.
Auth is wired (real `signInWithPassword`) but **not enforced**: a failed login still navigates to
the dashboard. Route guards, delete, create, filters and validation come later.

### User stories
- As the admin I open `/admin/login`, enter email + password, press **Login** → I land on
  `/admin` (empty dashboard) whether or not the credentials were correct.
- In the sidemenu I click **Resources / News / Projects** → I see a table of all rows of that
  table, newest first (`created_at desc`), 10 per page, with Prev / Next.
- Each row has **Edit** and **Delete** buttons. Delete does nothing.
- Edit opens `/admin/<section>/:id` with a signal form containing every column of that row.
  **Save** updates the row in Supabase and returns to the list. **Cancel** returns without saving.

## Tech Stack
Angular 21.2 (standalone, signals, `@angular/forms/signals`), Tailwind 4, `@supabase/supabase-js`
2.119, **new dependency:** `@fortawesome/fontawesome-free` (CSS classes, e.g. `fa-solid fa-pen`).

## Commands
```bash
npm install @fortawesome/fontawesome-free
npm start                       # ng serve → http://localhost:4200/admin/login
npm run build
npm test
```

## Routes
| Path | Component | Notes |
|---|---|---|
| `/admin/login` | `AdminLogin` | centred card: email, password, Login button |
| `/admin` | `AdminShell` (sidemenu + `<router-outlet>`) | parent of the routes below |
| `/admin` (child `''`) | `AdminDashboard` | empty placeholder |
| `/admin/resources` · `/admin/resources/:id` | `AdminResources` · `AdminResourceEdit` | table `resources` |
| `/admin/news` · `/admin/news/:id` | `AdminNews` · `AdminNewsEdit` | table `news` |
| `/admin/projects` · `/admin/projects/:id` | `AdminProjects` · `AdminProjectEdit` | table `projects` (renamed from `sister_projects`) |

All admin routes are declared before `'**'`. `LayoutComponent` hides `<app-header>`/`<app-footer>`
when the URL starts with `/admin`. No guard in this iteration.

## Project Structure
```
src/app/admin/
  admin.routes.ts                 → child routes, lazy-loaded from app.routes.ts
  login/admin-login.ts
  shell/admin-shell.ts            → sidemenu (Resources, News, Projects) + outlet
  dashboard/admin-dashboard.ts    → empty
  news/admin-news.ts              → list table
  news/admin-news-edit.ts         → signal form
  resources/admin-resources.ts / admin-resource-edit.ts
  projects/admin-projects.ts / admin-project-edit.ts
  admin-data.service.ts           → page(table, page) / getById(table, id) / update(table, id, patch)
supabase/migrations/<ts>_rename_sister_projects.sql
supabase/migrations/<ts>_admin_write_rls.sql
```
One generic data service (3 methods, typed by table name) instead of three copies. List and edit
components stay per-section (explicit columns and fields, no dynamic form generation).

## Supabase calls (same style as `PartnersService`)
```ts
page(table, page) → from(client.from(table).select('*', { count: 'exact' })
                       .order('created_at', { ascending: false })
                       .range(page * 10, page * 10 + 9))
getById(table, id) → client.from(table).select('*').eq('id', id).single()
update(table, id, patch) → client.from(table).update(patch).eq('id', id)
```
Errors: `console.error(error)` + `throw`, the same way `PartnersService` handles them.

## List columns
| Section | Columns |
|---|---|
| News | title, publish_date, is_published, is_archived, Actions |
| Resources | title, resource_type, publish_date, is_published, Actions |
| Projects | name, status, belongs_to_project, Actions |

Actions: `fa-solid fa-pen` (Edit → router link) and `fa-solid fa-trash` (Delete → no-op handler).
Pagination text: `Page X of Y`, with Prev/Next disabled at the first and last pages.

## Edit form fields (all columns except `id`, `created_at`, `updated_at`)
- **news:** title, excerpt, content, image_url, image_alt, publish_date, tags, is_archived, is_published
- **resources:** title, resource_type, description, file_url, publish_date, authors, work_package,
  deliverable_number, belongs_to_project, is_published, hide_publish_day
- **projects:** name, description, website, logo_url, status, tags, contact_name,
  contact_email, is_featured, featured_only, is_coordinator, belongs_to_project, sort_order

Input types: text → `<input>`; long text (content, description, excerpt) → `<textarea>`;
date → `<input type="date">`; boolean → checkbox; number → `<input type="number">`;
`tags` (text[]) → one text input, comma-separated (`split(',')` + `trim` + drop empties on save);
check-constrained text (resource_type, status) → plain `<input>` (no validation, as requested).

**Nulls:** signal forms do not accept `null`. On load, `null` becomes `''`. On save, `''` becomes
`null` for nullable columns. *(Approved.)*

```ts
// style sketch
protected readonly model = signal({ title: '', excerpt: '', tags: '', is_published: false /* … */ });
protected readonly f = form(this.model);
// template: <input [formField]="f.title" />
```

## Database migrations (files only, not applied by me)
**1. `<ts>_rename_sister_projects.sql`.** Renames the table `sister_projects` to `projects`, along with its index
(`projects_sort_order_idx`) and its trigger (`projects_set_updated_at`). The RLS policy and grants
follow the table automatically. The existing migrations are **not** edited, because they may
already be applied remotely. In the same change:
- `supabase/seed.sql`: `insert into public.sister_projects` → `public.projects` (seed runs after migrations)
- `src/app/types/database.types.ts`: key `sister_projects` → `projects` (or regenerate with `npm run db:types`)
- `docs/SUPABASE-code-changes.md`: the `SisterProjectsService` row → table `projects`
- The public "Sister Projects" page and service names stay the same. They read JSON today.

**2. `<ts>_admin_write_rls.sql`**, for `news`, `resources`, `projects`:
- `grant select, update on … to authenticated;`
- policy `for select to authenticated using (true)` → the admin sees unpublished rows too
- policy `for update to authenticated using (true) with check (true)`
- `anon` is unchanged (read-only, published only).

You run `npx supabase db push` and set up auth by following `docs/supabase-auth-setup.md` and
`docs/supabase-disable-signups.md`.

## Testing Strategy
Matches the repo today (vitest via `ng test`, few unit tests). This iteration:
- `npm run build` passes.
- Manual check against a DB where the migration is applied: log in with the real user → open each
  table → paging works → edit a row → Save → value changed in Supabase (Table Editor).
- No new unit tests unless you want them.

## Boundaries
- **Always:** keep the existing Supabase call style; Font Awesome classes for icons; Tailwind for styling.
- **Ask first:** any other dependency; touching public pages or services; applying migrations to any DB.
- **Never:** commit secrets / service-role key; `db push` to remote; add validation, filters,
  create, delete or guards in this iteration.

## Success Criteria
1. `/admin/login` renders with no public header/footer, and no public page links to it.
2. Login with any credentials navigates to `/admin`. With correct credentials a Supabase session exists.
3. The sidemenu shows Resources, News, Projects with Font Awesome icons and navigates between them.
4. Each list shows all rows (including unpublished, once logged in), sorted `created_at desc`,
   10 per page, server-side paging.
5. Delete does nothing. Edit opens `/admin/<section>/:id` with every non-system field prefilled.
6. Save updates the row in Supabase and returns to the list, which shows the new value.
7. `npm run build` passes.

## Risks / Notes
1. **Updates only work with a real session.** With wrong credentials you reach the dashboard, but
   the list shows only published rows and Save fails, because RLS blocks anonymous updates. Expected.
2. **Signups must be off** in the remote project, or anyone who signs up can edit content
   (see `docs/supabase-disable-signups.md`).
3. **Side effect on the public site:** while the admin is logged in, the `authenticated` select
   policy also returns unpublished rows in that browser. The public services filter `is_published`
   client-side, so nothing leaks today.
4. **SSR:** the session lives in `localStorage`. Admin pages fetch their data in the browser only.
5. **Rename order:** the rename migration must reach the remote before (or together with) any code
   that queries `projects`.
