# Todo: Organizations Page

Spec: `docs/SPEC-organizations.md` · Plan: `tasks/plan-organizations.md`

## Task 1: Organization model and placeholder data ✅
**Description:** Add the `Organization` type and a data file with 3 placeholders that exercise the optional fields.
**Acceptance:**
- [x] `Organization` interface (`id`, `name`, `website?`, `description?`, `logo_url?`, `country?`, `is_published`, `order`) in `src/app/models/index.ts`
- [x] `public/data/organizations.json` has 3 placeholders: 2 published (one without `website`, to exercise the optional link) and 1 unpublished
**Verification:**
- [x] `node -e "JSON.parse(require('fs').readFileSync('public/data/organizations.json'))"` succeeds
- [x] Build succeeds: `npm run build`
**Dependencies:** None · **Files:** `src/app/models/index.ts`, `public/data/organizations.json` · **Scope:** S

## Task 2: Organizations component with httpResource ✅
**Description:** Create the page component following the Tools pattern.
**Acceptance:**
- [x] `httpResource<Organization[]>` fetches `/data/organizations.json`; `parse` filters published orgs and sorts by `order`
- [x] Loading, error, empty and list states use the shared components; the header shows "Organizations" with a placeholder subtitle
- [x] Cards show the logo, country, description and "Visit website →" link (`target="_blank" rel="noopener noreferrer"`), each only when present
**Verification:**
- [x] Build succeeds: `npm run build`
- [x] No `.spec.ts` created
**Dependencies:** Task 1 · **Files:** `src/app/pages/organizations/organizations.{ts,html,scss}` · **Scope:** S

## Task 3: Route and header nav ✅
**Description:** Make the page reachable.
**Acceptance:**
- [x] `organizations` route lazy-loads `Organizations` (after `tools` in `app.routes.ts`)
- [x] `header.ts`: "Ecosystem" dropdown (replacing the top-level Tools item) with Tools and Organizations
**Verification:**
- [x] Build succeeds: `npm run build`
- [x] Manual check: Ecosystem → Organizations in the header opens the page (desktop and mobile menu)
**Dependencies:** Task 2 · **Files:** `src/app/app.routes.ts`, `src/app/components/header/header.ts` · **Scope:** XS

## Checkpoint: Feature complete
- [x] Build clean, no new warnings
- [x] `/organizations` shows the 2 published placeholders in order; the unpublished one is hidden; the card without a website has no link
- [x] `/members` page and `partners.json` / `PartnersService` untouched
- [x] Reviewed with the user

## Task 4: Real organizations data ⛔ blocked on content
**Description:** Replace the placeholders and subtitle with real content from the user.
**Acceptance:**
- [ ] `organizations.json` contains only real entries with unique `id`s and `order`s; every `website`/`logo_url` is a valid absolute URL
- [ ] The subtitle has its final text
**Verification:**
- [ ] JSON parse check (see Task 1) succeeds
- [ ] Manual check: `/organizations` lists the real organizations in the intended order
**Dependencies:** Task 3 · **Files:** `public/data/organizations.json`, `src/app/pages/organizations/organizations.html` · **Scope:** XS

## Checkpoint: Ready to ship
- [ ] All spec success criteria met with real data
- [ ] Committed (only when the user asks)
