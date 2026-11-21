# Todo: Resources Filters

Spec: `docs/SPEC-resources-filters.md` · Plan: `tasks/plan-resources-filters.md`

## Task 1: Model field, URL-driven filter state and project dropdown ✅
**Description:** Add `belongsToProject?` to `Resource`. Change the component so the query params (`type`, `project`)
drive the filter signals, and the type buttons navigate instead of setting the signal directly. Add the
"All projects" `<select>` with options from `projects()`. Update the spec's URL-sync bullet (an unknown project
shows the no-match state; it doesn't fall back to `'all'`).
**Acceptance:**
- [x] The dropdown lists FITTER, GreenPaths, ST4TE, TWINRD (sorted) after "All projects"; choosing FITTER shows 12 resources
- [x] Type and project combine (AND); the URL updates with `replaceUrl`; the default values are omitted from the URL
- [x] Opening or reloading `/resources?project=FITTER&type=Deliverable` restores both controls; the header "Deliverables" link works from another page and while already on `/resources`
**Verification:**
- [x] Build succeeds: `npm run build`
- [x] Manual check in the browser (`npm start`)
**Dependencies:** None · **Files:** `src/app/models/index.ts`, `src/app/pages/resources/resources.component.ts`, `docs/SPEC-resources-filters.md` · **Scope:** S

## Checkpoint A
- [x] Build passes, the project filter works end-to-end, and the `?type=` links are not broken

## Task 2: Search input with `q` query param ✅
**Description:** Add a labelled `<input type="search">` that filters title, description, authors and deliverable number,
ignoring case, as the visitor types. It is stored as `q` in the URL. On mobile it stacks with the dropdown; from `sm:`
up they sit in one row.
**Acceptance:**
- [x] "kakderi" and "KAKDERI" both show only the ST4TE publication
- [x] The search combines with project and type; `?q=...` survives a reload; an empty search removes `q` from the URL
- [x] The input has an accessible label (it can be `sr-only`) and a visible focus ring in `#7C9082`
**Verification:**
- [x] Build succeeds: `npm run build`
- [x] Manual check in the browser, including at about 400px width
**Dependencies:** Task 1 · **Files:** `src/app/pages/resources/resources.component.ts` · **Scope:** S

## Task 3: Result count, Clear filters, no-match state and project badge ✅
**Description:** Add "Showing X of Y resources", a Clear filters button shown only when `hasActiveFilters()`, a separate
"No matching resources" empty state (with Clear filters) when data exists but nothing matches, and a neutral project
badge in the card's badge row.
**Acceptance:**
- [x] The count is correct for every combination; Clear filters resets all three filters and clears the query string
- [x] No matches → "No matching resources" + a Clear filters button; no data at all → the existing "No resources available yet"
- [x] Each card shows its project badge, in the same style as the deliverable badge
**Verification:**
- [x] Build succeeds: `npm run build`
- [x] Manual check in the browser: keyboard-only pass through search → select → type buttons → Clear filters
**Dependencies:** Task 2 · **Files:** `src/app/pages/resources/resources.component.ts` · **Scope:** S

## Checkpoint B: Complete
- [x] All 10 Success Criteria in the spec are checked
- [x] `npm run build` succeeds with no new warnings
- [x] Review with the user before committing
