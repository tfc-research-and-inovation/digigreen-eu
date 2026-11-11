# Todo: Tools Page

Spec: `docs/SPEC-tools.md` · Plan: `tasks/plan.md`

## Task 0: Install Angular skills ✅
**Acceptance:**
- [x] `angular-developer` and `angular-new-app` are in `.claude/skills/`, with `skills-lock.json` at the root
**Verification:**
- [x] Manual check: `ls .claude/skills`
**Dependencies:** None · **Scope:** XS

## Task 1: Tool model and placeholder data ✅
**Acceptance:**
- [x] `Tool` interface (`id`, `title`, `url`, `description?`, `is_published`, `order`) in `src/app/models/index.ts`
- [x] `public/data/tools.json` has 3 placeholders (2 published, 1 unpublished)
**Verification:**
- [x] Build succeeds: `npm run build`
**Dependencies:** None · **Files:** `src/app/models/index.ts`, `public/data/tools.json` · **Scope:** S

## Task 2: Tools component with httpResource ✅
**Acceptance:**
- [x] `httpResource<Tool[]>` fetches `/data/tools.json`; `parse` filters published tools and sorts by `order`
- [x] The template renders the loading, error, empty and list states using the shared components
- [x] Archive-style cards: title, optional description, and an "Open tool →" link (`target="_blank" rel="noopener noreferrer"`)
**Verification:**
- [x] Build succeeds: `npm run build`
- [x] Manual check: `/tools` in Chrome shows Placeholder Tool One and Two in order, and not the unpublished one
**Dependencies:** Task 1 · **Files:** `src/app/pages/tools/tools.ts`, `src/app/pages/tools/tools.html` · **Scope:** S

## Task 3: Remove generated spec ✅
**Acceptance:**
- [x] `src/app/pages/tools/tools.spec.ts` deleted
**Verification:**
- [x] Build succeeds: `npm run build`
**Dependencies:** None · **Scope:** XS

## Checkpoint: Feature complete
- [x] Build clean
- [x] Core flow works in the browser
- [x] Reviewed with the user

## Task 4: Confirm external link attributes ✅
**Description:** The browser tool did not report `target`/`rel` on the links, so inspect the DOM directly.
**Acceptance:**
- [x] Each "Open tool →" anchor has `target="_blank"` and `rel="noopener noreferrer"` in the rendered DOM
**Verification:**
- [x] Manual check: DevTools → inspect an anchor, or click it and confirm it opens in a new tab
**Dependencies:** Task 2 · **Files:** `src/app/pages/tools/tools.html` (only if a fix is needed) · **Scope:** XS

## Task 5: Real tools data ⛔ blocked on content
**Description:** Replace the placeholders with the real tools from the user.
**Acceptance:**
- [ ] `tools.json` contains only real entries, each with a unique `id` and an `order`
- [ ] Every `url` is a valid absolute `https://` link
**Verification:**
- [ ] `node -e "JSON.parse(require('fs').readFileSync('public/data/tools.json'))"` succeeds
- [ ] Manual check: `/tools` lists the real tools in the intended order
**Dependencies:** Task 2 · **Files:** `public/data/tools.json` · **Scope:** XS

## Task 6: Commit (on request only) ✅
**Acceptance:**
- [x] One commit on `dev` that includes the tools page, model, data, route/header changes, spec, plan, `.claude/skills/` and `skills-lock.json`
- [x] `.claude/settings.local.json` is **not** committed
**Verification:**
- [x] `git show --stat HEAD` lists the expected files only
**Dependencies:** Tasks 4 (and 5 if real data is ready) · **Scope:** S

## Checkpoint: Ready to ship
- [ ] All spec success criteria met with real data
- [x] Committed
