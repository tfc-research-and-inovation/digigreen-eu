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

## Task 2: Regression check (seed round-trip, empty → null, public page)

**Description:** Confirm that the editor does not damage existing content and that the public site still
renders it. Fix in `admin-news-edit.ts` only if something breaks.

**Acceptance criteria:**
- [ ] An untouched seed article (with links + bold + list), opened and saved, keeps all of its links and formatting
- [ ] Emptying the editor and saving stores `content = null`
- [ ] Public `/news/:id` shows the edited content correctly, with no public code change

**Verification:**
- [ ] Tests pass: `npm test -- --watch=false` (5/5)
- [ ] Build succeeds: `npm run build`
- [ ] Manual check: compare `content` in Studio before and after an untouched save; open `/news/:id`

**Dependencies:** Task 1

**Files likely touched:**
- `src/app/admin/news/admin-news-edit.ts` (only if a fix is needed)

**Estimated scope:** XS

## Checkpoint: Complete
- [ ] All Success Criteria in `docs/SPEC-news-wysiwyg.md` are met
- [ ] Review with the user, who decides whether to commit
