# Spec: Tools Page

## Objective
Add a **Tools** page (`/tools`, already routed and linked in the header) that lists external tools
offered by the DigiGreenTT Cluster. Each tool links out to its own URL. The layout matches the
**Archive** page: a vertical list of white cards.

Success for the visitor: they open `/tools`, see every published tool in the configured order, and
can open any tool in a new tab.

## Tech Stack
Angular 21 (standalone components, signals, new control flow), Tailwind utility classes, SSR +
hydration, `HttpClient` with `withFetch()`. No new dependencies.

## Data: `public/data/tools.json`
Served at `/data/tools.json`, the same as the other data files.

```json
[
  {
    "id": "1",
    "title": "Example Tool",
    "url": "https://example.com",
    "description": "Optional short text shown under the title.",
    "is_published": true,
    "order": 1
  }
]
```

Model (added to `src/app/models/index.ts`):
```ts
export interface Tool {
  id: string;
  title: string;
  url: string;
  description?: string;
  is_published: boolean;
  order: number;
}
```
More fields can be added later. The spec is updated first, then the code.

## Component: `src/app/pages/tools/` (`Tools`)
- Fetches with **`httpResource`** (`@angular/common/http`). It goes through HttpClient, so it works with SSR and the transfer cache. There is no separate service: published-only filtering and `order` sorting happen in its `parse` option.
  ```ts
  protected readonly tools = httpResource<Tool[]>(() => '/data/tools.json', {
    parse: (raw) => (raw as Tool[]).filter(t => t.is_published).sort((a, b) => a.order - b.order),
    defaultValue: [],
  });
  ```
- Keeps the existing `tools.html` and `tools.scss` files (external template).
- Template states, in order:
  1. `tools.isLoading()` → `<app-loading-state message="Loading tools…">`
  2. `tools.error()` → `<app-empty-state>` with an "unable to load tools" message (`value()` throws in
     the error state, so this branch is required)
  3. Empty list → `<app-empty-state title="No tools yet" …>`
  4. Otherwise → Archive-style card list (`space-y-4`, white card, `border-[#E8E4DC]`, hover shadow):
     title, optional description (`line-clamp-2`), and an **"Open tool →"** link to `url` with
     `target="_blank" rel="noopener noreferrer"`.
- `@for … track tool.id`.

## Commands
```
Dev:   npm start
Build: npm run build
```

## Project Structure (files touched)
```
public/data/tools.json                 → new data file
src/app/models/index.ts                → + Tool interface
src/app/pages/tools/tools.ts           → httpResource + imports
src/app/pages/tools/tools.html         → Archive-style layout
src/app/pages/tools/tools.spec.ts      → DELETED (per instruction)
```
Already done (uncommitted): route `tools` in `app.routes.ts`, the "Tools" nav item in `header.ts`, and the
Angular skills in `.claude/skills/` + `skills-lock.json`.

## Code Style
Matches the existing code: Prettier (single quotes, width 100),
Tailwind classes with the site palette (`#2D3436`, `#5A6B5E`, `#7C9082`, `#E8E4DC`), and shared
`PageHeader` / `LoadingState` / `EmptyState` components.

## Testing Strategy
**No unit tests** (explicit instruction). The generated `tools.spec.ts` is deleted. Verification is
`npm run build` passing, plus a manual check in the browser at `/tools` (loading → list, link opens
in a new tab, empty and unpublished cases).

## Boundaries
- Always: follow the existing service/model patterns and keep the Archive visual language.
- Ask first: adding dependencies, changing other pages/services, adding fields to the JSON.
- Never: write unit tests, refactor Archive or other pages to httpResource as a side effect, commit
  without being asked.

## Success Criteria
1. `/tools` renders the page header and a card per published tool, sorted by `order`.
2. Tools with `is_published: false` are not shown.
3. Each card's link opens `url` in a new tab with `rel="noopener noreferrer"`.
4. The loading, error, and empty states each render the shared state components.
5. Data is fetched in `Tools` via `httpResource` (no service).
6. `npm run build` succeeds (including SSR) with no new warnings.

## Decisions
- `httpResource` instead of `rxResource`/service (as recommended by the Angular skill; approved).
- `tools.json` starts with placeholder entries (one unpublished) until the real tools are known.
- The subtitle stays "A subtitle for tools page." for now.
