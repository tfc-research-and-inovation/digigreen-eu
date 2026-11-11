# Implementation Plan: Tools Page

Spec: [`docs/SPEC-tools.md`](../docs/SPEC-tools.md) · Task list: [`tasks/todo.md`](todo.md)

## Overview
A `/tools` page that lists published external tools from `public/data/tools.json` in an
Archive-style card layout. Data is fetched with `httpResource`. There are no unit tests.

## Architecture Decisions
- **`httpResource` without a service:** this is a read-only fetch of a static JSON file. `parse` handles
  filtering (`is_published`) and sorting (`order`). It still uses HttpClient, so SSR, hydration and the transfer cache
  are unaffected. A service would only be needed if another page reuses the tools data.
- **Explicit error branch:** `value()` throws in the error state, so the template checks
  `error()` before reading `value()`.
- **External template:** keeps the scaffolded `tools.html` / `tools.scss`, unlike Archive's inline
  template.
- **No unit tests:** an explicit instruction. Verification is the build plus a manual browser check.

## Dependency Graph
```
Tool model ──► tools.json (shape) ──► Tools component (httpResource + parse) ──► tools.html
                                                       ▲
route + header nav (already in place) ─────────────────┘
```

## Task List

### Phase 1: Foundation
- [x] Task 0: Install the Angular skills (`angular/skills`, project level)
- [x] Task 1: Add the `Tool` model and the placeholder `tools.json`

### Phase 2: Page slice
- [x] Task 2: Tools component with `httpResource` and an Archive-style template (all states)
- [x] Task 3: Remove the generated `tools.spec.ts`

### Checkpoint: Feature complete
- [x] `npm run build` clean
- [x] `/tools` shows 2 published placeholders in order, with the unpublished one hidden (Chrome check)
- [ ] Review with the user before proceeding

### Phase 3: Finish
- [ ] Task 4: Confirm the external link attributes in the DOM
- [ ] Task 5: Replace the placeholder data with real tools (blocked on content)
- [ ] Task 6: Commit the work (on request)

### Checkpoint: Ready to ship
- [ ] All spec success criteria met with real data
- [ ] Committed on `dev`

## Risks and Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Placeholder data ships to production | Med | Task 5 blocks the "Ready to ship" checkpoint |
| Malformed JSON entry (e.g. missing `order`) breaks the sort | Low | The JSON is hand-edited; validate it when real data lands (Task 5) |
| `.claude/settings.local.json` committed by accident | Low | Task 6 stages only `.claude/skills/` |

## Open Questions
- What are the real tools (titles, URLs, descriptions)?
- Will the subtitle be updated later? (It stays "A subtitle for tools page." for now.)
