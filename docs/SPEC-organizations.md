# Spec: Organizations Page

## Objective
Add an **Organizations** page (`/organizations`) that lists organizations from a new
`public/data/organizations.json` file. It follows the same pattern as the Tools page: the JSON file is fetched
with `httpResource` in the component, and the layout is an Archive-style card list. The header gets an
"Ecosystem" dropdown (after Collaborate) containing Tools and Organizations.

The existing `/members` page (Consortium Members, `partners.json`, `PartnersService`) is **not
touched**.

Success for the visitor: they pick Ecosystem → Organizations in the header, see every published organization in
the configured order, and can open an organization's website in a new tab.

## Tech Stack
Angular 21 (standalone components, signals, new control flow), Tailwind, SSR + hydration,
`HttpClient` with `withFetch()`. No new dependencies.

## Data: `public/data/organizations.json`
Served at `/data/organizations.json`. It starts with 3 placeholders: 2 published and 1 unpublished.

```json
[
  {
    "id": "1",
    "name": "Placeholder Organization One",
    "website": "https://example.com/org-one",
    "description": "Placeholder description. Replace with real content.",
    "logo_url": null,
    "country": "Greece",
    "is_published": true,
    "order": 1
  }
]
```

Model (added to `src/app/models/index.ts`):
```ts
export interface Organization {
  id: string;
  name: string;
  website?: string | null;
  description?: string;
  logo_url?: string | null;
  country?: string;
  is_published: boolean;
  order: number;
}
```
`website`/`logo_url` follow the naming in `partners.json`. Both are optional, so organizations without
a site or logo still render.

## Component: `src/app/pages/organizations/` (`Organizations`)
- External template, the same as Tools: `organizations.ts`, `organizations.html`, `organizations.scss` (empty).
- **`httpResource`** with no service:
  ```ts
  protected readonly organizations = httpResource<Organization[]>(() => '/data/organizations.json', {
    parse: (raw) =>
      (raw as Organization[]).filter((o) => o.is_published).sort((a, b) => a.order - b.order),
    defaultValue: [],
  });
  ```
- Page header: title "Organizations", subtitle "A subtitle for organizations page." (placeholder),
  breadcrumb "Organizations".
- Template states, in order: loading → error → empty → list (the same shared components as Tools).
- The card is the Archive/Tools-style white card (`border-[#E8E4DC]`, hover shadow). Each card has:
  - The logo (`logo_url`), shown only if present: a small fixed-size image with `alt` = name.
  - The name, plus the country as a small muted line, shown if present.
  - The description, shown if present (`line-clamp-2`).
  - A **"Visit website →"** link, shown only if `website` is present.
    It uses `target="_blank" rel="noopener noreferrer"`.
- `@for … track org.id`.

## Routing & Nav
- `app.routes.ts`: `{ path: 'organizations', loadComponent: () => import('./pages/organizations/organizations').then(m => m.Organizations) }`,
  placed after `tools`.
- `header.ts`: the top-level Tools item is replaced by an **Ecosystem** dropdown with `Tools` (`/tools`) and
  `Organizations` (`/organizations`), keeping the header within the `lg` (1024px) breakpoint.

## Commands
```
Dev:   npm start
Build: npm run build
```

## Project Structure (files touched)
```
public/data/organizations.json                  → new
src/app/models/index.ts                         → + Organization
src/app/pages/organizations/organizations.ts    → new (httpResource)
src/app/pages/organizations/organizations.html  → new
src/app/pages/organizations/organizations.scss  → new (empty)
src/app/app.routes.ts                           → + route
src/app/components/header/header.ts             → + nav item
```

## Testing Strategy
**No unit tests** (explicit instruction), and no `.spec.ts` is created. Verification is `npm run build` plus a
manual check of `/organizations` in the browser.

## Boundaries
- Always: mirror the Tools pattern and keep the site palette and shared state components.
- Ask first: adding fields, changing the layout away from Archive-style.
- Never: modify the `/members` page, `partners.json` or `PartnersService`; write unit tests; commit.

## Success Criteria
1. The header's Ecosystem dropdown (desktop and mobile) lists Tools and Organizations; Organizations navigates to `/organizations`.
2. Published organizations are listed, sorted by `order`. Unpublished ones are hidden.
3. Logo, country, description and website link render only when present. The link opens in a new tab with
   `rel="noopener noreferrer"`.
4. The loading, error and empty states use the shared components.
5. Data is fetched via `httpResource` in the component (no service).
6. `npm run build` succeeds with no new warnings, and `/members` is unchanged.

## Decisions
- Nav: Tools and Organizations are grouped under an "Ecosystem" dropdown, because a 10th top-level item made the
  desktop nav wrap at ~1024–1070px.
- Header breakpoint: the full desktop nav shows from **1080px** (`min-[67.5rem]:`); below that, the burger menu.
  The "Twin Transition" tagline is hidden between 1080px and 1280px (`xl`) so the nav fits on one line.
  The breakpoint is written in `rem` because Tailwind v4 sorts an arbitrary `px` breakpoint before `sm:`
  (rem), which made `sm:inline` override the hide rule.

## Open Questions
- Real organization data and subtitle (placeholders for now).
