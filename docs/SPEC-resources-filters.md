# Spec: Resources Filters

## Objective
Make it quick to find a resource on `/resources`. There are 38 resources, and 32 of them are
Deliverables. The page only has the resource-type buttons, so the list can't be narrowed much today.

Add to the existing type buttons:
1. **Text search**: one input that matches title, description, authors and deliverable number.
2. **Project dropdown**: filters by `belongsToProject`. The options come from the data itself.
3. **Combined, shareable filters**: all filters apply together (AND) and are written to the URL
   query string, so a filtered view can be bookmarked or shared.

Success for the visitor: they open `/resources`, type "D3.2" or pick "FITTER" + "Deliverable", and
immediately see only the matching resources. The URL can be copied to reopen the same view.

## Tech Stack
Angular 21 (standalone components, signals, new control flow), Tailwind, SSR + hydration. No new
dependencies. All filtering is client-side over the already-loaded `/data/resources.json`.

## Data & Model
`public/data/resources.json` already has `belongsToProject` on every item (GreenPaths 19,
FITTER 12, TWINRD 6, ST4TE 1). The data is **not changed**.

`src/app/models/index.ts`: add the missing field to `Resource`:
```ts
belongsToProject?: string;
```
It is optional, so a resource without a project still renders. It is excluded only when a specific
project is selected.

## Component: `src/app/pages/resources/resources.component.ts`
It keeps its current structure (inline template, `ResourcesService`, signals). Changes:

### State (signals)
```ts
selectedType    = signal('all');   // existing
selectedProject = signal('all');
searchTerm      = signal('');

projects = computed(() =>
  [...new Set(this.all().map(r => r.belongsToProject).filter((p): p is string => !!p))].sort()
);

filtered = computed(() => {
  const type = this.selectedType();
  const project = this.selectedProject();
  const q = this.searchTerm().trim().toLowerCase();
  return this.all().filter(r =>
    (type === 'all' || r.resource_type === type) &&
    (project === 'all' || r.belongsToProject === project) &&
    (!q || [r.title, r.description, r.authors, r.deliverable_number]
             .some(f => f?.toLowerCase().includes(q)))
  );
});

hasActiveFilters = computed(() =>
  this.selectedType() !== 'all' || this.selectedProject() !== 'all' || this.searchTerm().trim() !== ''
);
```

### URL sync
- Query params: `type`, `project`, `q`. Default values (`all` / empty) are **omitted** from the URL.
- **Read**: the existing `route.queryParams` subscription is extended. It sets all three signals on every
  emission, so the header links (`?type=Deliverable`) and the footer links keep working, even when the
  visitor is already on the page. An unknown `type` falls back to `'all'`. An unknown `project` is not
  validated: it matches nothing, so the "No matching resources" state (with Clear filters) appears.
- **Write**: when the visitor changes a filter, call `router.navigate([], { queryParams, queryParamsHandling: 'merge', replaceUrl: true })`,
  so that typing in the search box doesn't fill the browser history.

### Layout (one filter bar above the list)
```
[ 🔍 Search by title, author, deliverable…        ] [ All projects ▾ ]
[All Resources] [Deliverable] [Publication] [Better Practice Guide] [Policy Brief]
Showing 12 of 38 resources                                   Clear filters
```
- Search: `<input type="search">` with a visible `<label>` (it can be `sr-only`) and a placeholder. It filters as the visitor types.
- Project: a native `<select>` with a label. The first option is "All projects", followed by `projects()`.
- Type buttons: unchanged.
- The result line shows "Showing X of Y resources". **Clear filters** appears only when `hasActiveFilters()`
  and resets all three filters.
- Styling: the existing palette (`border-[#E8E4DC]`, `text-[#5A6B5E]`, focus ring `#7C9082`, `rounded-lg`).
  On mobile, search and dropdown stack; from `sm:` up they sit in one row.

### Card
- A project badge is added in the existing badge row (next to the type, deliverable number and work package),
  shown only if `belongsToProject` is present. It is neutral, with the same style as the deliverable badge.

### Empty state
- No data at all → the existing "No resources available yet" message.
- Data exists but nothing matches the filters → "No matching resources", with the text "Try a different
  search or clear the filters" and a Clear filters button.

## Commands
```
Dev:   npm start
Build: npm run build
```

## Project Structure (files touched)
```
src/app/models/index.ts                             → + belongsToProject?
src/app/pages/resources/resources.component.ts      → filters, URL sync, badge, empty state
```

## Testing Strategy
No unit tests, the same as the Tools and Organizations specs. Verification is `npm run build` plus a manual check
in the browser (see Success Criteria).

## Boundaries
- Always: keep the site palette, shared state components and the existing type buttons; use
  accessible labels on the inputs.
- Ask first: changing `resources.json`, the header/footer links, or `ResourcesService`; adding a
  dependency; adding more filters (year, work package).
- Never: filter on the server or add a backend; remove the `?type=` support; commit without being asked.

## Success Criteria
1. Typing "kakderi" shows only the ST4TE publication, and "KAKDERI" gives the same result (the search ignores
   case). `deliverable_number` is searched as well, but it is empty in all current data, so it can't be checked
   manually yet.
2. The project dropdown lists exactly GreenPaths, FITTER, ST4TE and TWINRD (sorted, taken from the data). Choosing
   FITTER shows 12 resources.
3. FITTER + Deliverable + a search term all apply together.
4. The URL reflects the filters (e.g. `/resources?project=FITTER&type=Deliverable`). Reloading or opening that
   URL restores the same view. The default values don't appear in the URL.
5. The header link "Deliverables" (`?type=Deliverable`) still works, both from another page and while already on
   `/resources`.
6. "Showing X of Y" is correct. Clear filters resets everything and clears the query string.
7. No matches → the "No matching resources" state with a Clear filters button.
8. Each card shows its project badge.
9. The layout works at about 400px width, and the controls can be used with the keyboard.
10. `npm run build` succeeds with no new warnings.

## Decisions
- **A dropdown for projects, not buttons**: it scales as projects are added and is visually distinct from the
  type buttons.
- **Projects derived from the data**: a new project in the JSON appears automatically, with no code change.
- **Search instead of more dropdowns**: when the visitor knows what they want (a title, an author, a D-number),
  typing is faster than any dropdown.

## Open Questions
- The "Better Practice Guide" type has no resources yet, so that button gives an empty list. It is left as is
  for now, because the header also links to it. Should types with no resources be hidden or disabled later?
