# Implementation Plan: Admin Area

Spec: [`docs/SPEC-admin.md`](../docs/SPEC-admin.md) · Task list: [`tasks/todo-admin.md`](todo-admin.md)

## Overview
A hidden `/admin` area: a login page, a shell with a sidemenu (Resources, News, Projects), a paginated
list per table and an edit page per table with a signal form that updates Supabase. The table
`sister_projects` is renamed to `projects`. Auth is wired but not enforced. No delete, create,
filters, validation or guard.

## Architecture Decisions
- **One data service, per-section components.** `AdminDataService` has `page()`, `getById()` and
  `update()`, generic over the table name, in the same `from(...).pipe(map(...))` style as
  `PartnersService`. List and edit components are written out per section (explicit columns and
  fields). There is no dynamic form or table generator.
- **Null and tags handling in one small helper** (`admin/form-utils.ts`):
  - `toModel(row)`: `null` → `''`, `tags[]` → `'a, b'`
  - `toPatch(model, nullable)`: `''` → `null` for the listed nullable keys, `'a, b'` → `['a','b']`

  Each edit component declares its own nullable keys. The helper is shared because all three edit
  pages need the same conversion.
- **Admin layout is separate.** `LayoutComponent` hides the header and footer when the URL starts
  with `/admin`. Admin routes are lazy-loaded from `admin.routes.ts`, declared before `'**'`.
- **News first, as the end-to-end slice.** News proves read, paging, edit and update. Resources and
  Projects then copy the same pattern.
- **Migrations are files only.** You apply them (`db push`). The existing migrations are not edited.
- **No unit tests** (spec: build + manual check), **no commits** unless you ask.

## Dependency Graph
```
T1 rename migration + seed/types/docs ─┐
T2 admin write RLS migration ──────────┤ (DB files, no app dependency)
                                       │
T3 Font Awesome ──► T4 routes + layout + login + shell + dashboard
                                       │
                          T5 AdminDataService + form-utils + News list
                                       │
                          T6 News edit (signal form, Save/Cancel)   ← first write to Supabase
                                       │
                          ┌────────────┴────────────┐
                 T7 Resources list + edit    T8 Projects list + edit
```
T1/T2 are independent of T3–T8. T7 and T8 are independent of each other.

## Task List
### Phase 1: Database files
- [x] T1: Rename `sister_projects` → `projects` (migration, seed, types, docs)
- [x] T2: Admin write RLS migration (`news`, `resources`, `projects`)

### Phase 2: Shell
- [x] T3: Install Font Awesome
- [x] T4: Admin routes, layout without header/footer, login, shell with sidemenu, empty dashboard

### Checkpoint A
- [x] `npm run build` passes. `/admin/login` → Login → `/admin` with the sidemenu. Public pages unchanged.

### Phase 3: News slice
- [x] T5: `AdminDataService` + `form-utils` + News list with server-side paging
- [x] T6: News edit page (signal form, Save → update → back to the list)

### Checkpoint B (proves the goal of this iteration)
- [x] After you apply the migrations and log in with the real user: edit a News row → the change is
  visible in the Supabase Table Editor and in the list. *(Verified on the local stack, 2026-11-25.
  Remote is still pending your `db push`.)*

### Phase 4: Remaining sections
- [x] T7: Resources list + edit
- [x] T8: Projects list + edit

### Checkpoint C (feature complete)
- [x] All spec Success Criteria pass. `npm run build` passes.
- [ ] Review with you

## Risks and Mitigations
| Risk | Impact | Mitigation |
|---|---|---|
| Rename migration not applied remotely while code queries `projects` | High | Apply T1 + T2 together with `db push` before testing. Order is noted in the spec |
| Signal forms API is new (`[formField]`, Angular 21.2) | Med | Follow the local `.claude/skills/angular-developer/references/signal-forms.md`. Build after T6 |
| Signups still open when the RLS migration goes live | High | `docs/supabase-disable-signups.md`. Do it before `db push` |
| SSR tries to fetch admin data on the server | Low | Data is loaded in the browser only. Verify in Checkpoint A that the page renders with no server errors |
| Save fails silently with wrong credentials | Low | Expected (spec Risk 1). `console.error` shows the RLS error |

## Open Questions
None. All questions are resolved in the spec.
