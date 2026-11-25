# Todo: News WYSIWYG (Quill)

Spec: `docs/SPEC-news-wysiwyg.md` · Plan: `tasks/plan-news-wysiwyg.md`

## Task 1: Install Quill and replace the content textarea ✅

**Description:** Install `quill@^2.0.3` and `ngx-quill@^30.1.3`. In `admin-news-edit.ts`, replace
the `content` `<textarea>` with `<quill-editor format="html">` using the limited toolbar from the
spec, and load `quill.snow.css` only in this component. Bind it with `[formField]="f.content"`.
If that binding does not work, use the `ngModel` fallback from the plan.

**Acceptance criteria:**
- [x] `/admin/news/:id` shows a Quill editor for `content`, pre-filled with the existing article formatted
- [x] The toolbar has exactly: H2, H3, bold, italic, ordered list, bullet list, link, blockquote, clean
- [x] Save writes HTML (e.g. `<strong>`, `<ul>`) to `news.content`

**Verification:**
- [x] Build succeeds: `npm run build`
- [x] Manual check (local stack, `admin@local.test`): edit a news item → bold a word, add a list → Save → the row in Studio contains `<strong>` / `<ul>`

**Dependencies:** None

**Files likely touched:**
- `package.json`
- `package-lock.json`
- `src/app/admin/news/admin-news-edit.ts`

**Estimated scope:** Small

## Checkpoint: Editor works
- [x] Build clean
- [x] Edit → Save round-trip works in the browser

**Notes (done):**
- Used `<quill-editor-field>` (ngx-quill's signal-forms control), so `[formField]` binds directly and no `ngModel` fallback is needed.
- Quill 2's `getSemanticHTML()` stores every space as `&nbsp;`. A `valueGetter` replaces them with normal spaces.
- `angular.json` `anyComponentStyle` budget raised to 10 kB warning / 30 kB error, approved by the user, because `quill.snow.css` is 24 kB.

## Task 2: Regression check (seed round-trip, empty → null, public page) ✅

**Description:** Confirm that the editor does not damage existing content and that the public site still
renders it. Fix in `admin-news-edit.ts` only if something breaks.

**Acceptance criteria:**
- [x] An untouched seed article (with links + bold + list), opened and saved, keeps all of its links and formatting
- [x] Emptying the editor and saving stores `content = null`
- [x] Public `/news/:id` shows the edited content correctly, with no public code change

**Verification:**
- [x] Tests pass: `npm test -- --watch=false` (5/5)
- [x] Build succeeds: `npm run build`
- [x] Manual check: compare `content` in Studio before and after an untouched save; open `/news/:id`

**Dependencies:** Task 1

**Files touched:**
- `src/app/admin/news/admin-news-edit.ts`
- `src/app/admin/news/legacy-html.ts` + `legacy-html.spec.ts` (new)

**Notes (done):**
- 8 of 10 news items were plain text or loose HTML, with blank lines between paragraphs (shown by
  `whitespace-pre-wrap`). Quill merged them into one paragraph. A `valueSetter` now runs
  `legacyToHtml()` first: blank lines → `<p>`, loose inline nodes (e.g. `<strong>` titles) →
  their own `<p>`, single newlines → spaces (user's choice). The database is unchanged until an article is saved.
- Verified on news 9 (links, bold, list, italic) and news 5 (plain text + links): same links, same
  text, and the public page looks the same as before.
- An empty editor saved `<p></p>`, because the custom `valueGetter` bypasses ngx-quill's empty
  handling. The getter now returns `''` when the editor has no text, so `toPatch` stores `null`.
- An empty editor collapsed to its content width next to the label. Fixed with `w-full`.

**Estimated scope:** XS

## Checkpoint: Complete
- [x] All Success Criteria in `docs/SPEC-news-wysiwyg.md` are met
- [x] Review with the user, who decides whether to commit
