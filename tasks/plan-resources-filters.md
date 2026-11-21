# Implementation Plan: Resources Filters

Spec: `docs/SPEC-resources-filters.md` · Tasks: `tasks/todo-resources-filters.md`

## Overview
Add a project dropdown, a text search, a result count with Clear filters, and a project badge to
`/resources`. All filtering stays client-side. The URL query string (`type`, `project`, `q`) holds the filter
state, so a filtered view can be shared. Only two files change: `src/app/models/index.ts` and
`src/app/pages/resources/resources.component.ts`.

## Architecture Decisions
- **The URL is the source of truth.** The `queryParams` subscription sets every filter signal. UI events call
  `router.navigate([], { queryParams, queryParamsHandling: 'merge', replaceUrl: true })` with the default values
  set to `null`, so they are dropped from the URL. This gives one code path for header/footer links, reloads and
  in-page changes, and the existing `?type=` support is preserved.
- **The signals are still set directly on input**, in addition to navigating, so typing feels instant. The
  navigation that follows sets the same values, which is harmless.
- **`projects` is a `computed` over the loaded data.** An unknown `?project=` value is not validated against the
  list: it simply matches nothing and shows the "No matching resources" state with Clear filters. This is simpler
  than validating after the data loads, and the visitor still sees what happened. *(This differs slightly from the
  spec, which says an unknown project falls back to `'all'`. The spec is updated in Task 1.)*
- **A native `<select>` and `<input type="search">`**: accessible, they work with SSR, and no dependencies.
- **The service is not changed**: the existing `getAll()` already sorts and filters published items.

## Dependency Graph
```
Resource.belongsToProject (model)
   └── URL ⇄ signals plumbing (type + project)
          ├── Project dropdown          (Task 1)
          ├── Search input + q param   (Task 2)
          └── Count / Clear / empty state / badge (Task 3)
```

## Task List

### Phase 1: Project filter end-to-end
- [x] Task 1: Model field, URL-driven filter state and project dropdown (S)

### Checkpoint A
- [x] `npm run build` succeeds; choosing FITTER shows 12 items; `?project=FITTER&type=Deliverable` works on reload; the header "Deliverables" link still works

### Phase 2: Search
- [x] Task 2: Search input with `q` query param (S)

### Phase 3: Polish
- [x] Task 3: Result count, Clear filters, no-match state and project badge (S)

### Checkpoint B: Complete
- [x] All 10 spec Success Criteria are checked in the browser (including at about 400px width and with the keyboard)
- [x] `npm run build` succeeds with no new warnings
- [x] Review with the user before committing

## Risks and Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Navigation loop: signal → navigate → queryParams → signal | Med | The subscription only *sets* signals and never navigates; navigation happens only in UI handlers |
| `navigate` on each keystroke on slow devices | Low | `replaceUrl: true` (no history entries); add a debounce only if it is noticeably slow |
| SSR: `queryParams` on the server | Low | It is already used today; reading params only, with no browser APIs |
| `publish_date` formats are mixed (`09/09/2026` vs ISO) | Low | Out of scope; sorting is unchanged |

## Parallelization
None. All the tasks edit the same component and must be done in order.

## Open Questions
- Hiding or disabling empty types (Better Practice Guide) is deferred (see spec).
