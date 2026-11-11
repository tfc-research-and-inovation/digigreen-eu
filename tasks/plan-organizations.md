# Implementation Plan: Organizations Page

Spec: [`docs/SPEC-organizations.md`](../docs/SPEC-organizations.md) · Task list: [`tasks/todo-organizations.md`](todo-organizations.md)

## Overview
A new `/organizations` page that lists published organizations from `public/data/organizations.json`
in an Archive/Tools-style card layout. Data is fetched with `httpResource`, and the page is linked from
the header's "Ecosystem" dropdown, together with Tools. The existing `/members` page is untouched. No unit tests, no commit.

## Architecture Decisions
- **Mirror the Tools page exactly:** `httpResource` in the component with no service. `parse` filters by
  `is_published` and sorts by `order`. The template is external, the error branch is explicit
  (`value()` throws in the error state), and the page uses the shared PageHeader/LoadingState/EmptyState components.
- **Field names follow `partners.json`** (`website`, `logo_url`). These two, plus `description` and `country`,
  are optional and rendered conditionally.
- **Separate plan/todo files** (`*-organizations.md`) so the Tools plan, with its open Task 5,
  stays intact.
- **No unit tests, no commit:** explicit instruction. Verification is the build plus a manual browser check.

## Dependency Graph
```
Organization model ──► organizations.json ──► Organizations component (httpResource + template)
                                                        │
                                                        ▼
                                          route (app.routes.ts) ──► header nav item
```

## Task List

### Phase 1: Foundation
- [x] Task 1: Add the `Organization` model and placeholder `organizations.json`

### Phase 2: Page slice
- [x] Task 2: Organizations component (httpResource, all states, cards)
- [x] Task 3: Route `/organizations` and the "Ecosystem" dropdown (Tools + Organizations)

### Checkpoint: Feature complete
- [x] `npm run build` clean (including SSR/prerender), no new warnings
- [x] Chrome: nav → `/organizations` shows the 2 published placeholders in order, with the unpublished one hidden
- [x] `/members` unchanged (`git diff` shows no members/partners files)
- [x] Review with the user

### Phase 3: Finish
- [ ] Task 4: Real organizations data and subtitle (blocked on content)

## Risks and Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Broken/missing logo URL shows a broken image | Low | Render `<img>` only when `logo_url` is set; placeholders use `null` |
| Nav overflow with one more top-level item | Med | Resolved: Tools + Organizations are grouped under an "Ecosystem" dropdown |
| `/organizations` not prerendered | Low | Build output lists the route; same mechanism as `/tools` |
| Placeholders ship to production | Med | Task 4 tracks replacing them |

## Open Questions
- What are the real organizations and the subtitle text?
