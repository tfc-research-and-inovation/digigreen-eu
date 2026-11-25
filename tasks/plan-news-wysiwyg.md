# Implementation Plan: News WYSIWYG (Quill)

Spec: [`docs/SPEC-news-wysiwyg.md`](../docs/SPEC-news-wysiwyg.md) · Task list: [`tasks/todo-news-wysiwyg.md`](todo-news-wysiwyg.md)

## Overview
Replace the `content` `<textarea>` in `src/app/admin/news/admin-news-edit.ts` with a Quill editor
(`ngx-quill@30` for Angular 21). The editor reads and writes HTML, so the database, `AdminDataService`,
`form-utils.ts` and the public news page stay unchanged.

## Dependency graph
```
npm install quill + ngx-quill@30
    │
    └── admin-news-edit.ts: <quill-editor> bound to f.content + toolbar + Quill CSS
            │
            └── Save → toPatch (unchanged) → news.content (HTML)
                    │
                    └── public /news/:id renders it via [innerHTML] (unchanged)
```
This is one vertical slice. The only real unknown is the binding between signal forms and
ngx-quill, so that comes first (fail fast).

## Architecture Decisions
- **Store HTML, not Quill Delta.** The column is already `text` with HTML, and the public page
  already renders HTML. No migration is needed.
- **`ngx-quill@^30.1.3`, not `latest` (31).** Version 31 has a peer dependency on `@angular/core ^22`.
- **Limited toolbar** (H2, H3, bold, italic, lists, link, blockquote, clean). Formats outside
  this list create `ql-*` classes that the public site does not style.
- **Quill CSS only in the edit component** (`styleUrl` on `quill.snow.css`,
  `ViewEncapsulation.None`), not in global `angular.json` styles. This keeps it out of the public bundle.
- **`<quill-editor-field>` with `[formField]`.** ngx-quill 30 ships a signal-forms control, so no `ngModel` fallback or wrapper is needed.
- **`valueGetter` strips `&nbsp;`** (Quill 2's `getSemanticHTML()` turns every space into `&nbsp;`) and returns `''` for an empty editor.
- **`valueSetter` runs `legacyToHtml()`.** Existing content is plain text with blank-line paragraphs. It is converted into `<p>` blocks before loading, and the database stays untouched until save. Chosen over a data migration.
- **`anyComponentStyle` budget raised to 10 kB / 30 kB.** `quill.snow.css` is 24 kB. Approved by the user instead of loading it globally.

## Task List

### Phase 1: Editor in the form
- [x] Task 1: Install Quill and replace the textarea with `<quill-editor>` (S, 3 files)

### Checkpoint: Editor works
- [x] `npm run build` is clean
- [x] Edit → Save writes HTML to `news.content` (checked in Studio)

### Phase 2: Regression
- [x] Task 2: Verify the round-trip on seed data, the empty → `null` case, and the public page (XS, 0–1 files)

### Checkpoint: Complete
- [x] All Success Criteria in the spec are met
- [x] `npm test -- --watch=false` passes (9/9, including 4 new `legacyToHtml` tests)
- [ ] Review with the user, who decides whether to commit

## Risks and Mitigations
| Risk | Impact | Mitigation |
|---|---|---|
| `[formField]` does not bind to the CVA of `<quill-editor>` | Med | Fallback: `[ngModel]` + `(ngModelChange)` updating `model`. One line, no abstraction |
| ngx-quill emits `null` for empty content, while signal forms expect a string | Low | `toPatch` already passes `null` through. If the form rejects it, map `null` → `''` in the change handler |
| Quill drops unknown HTML tags on save | Med | The seed uses only `p/a/strong/em/ul/li/br`. Task 2 opens and saves a real seed article and compares the result |
| Quill CSS with `ViewEncapsulation.None` leaks into other admin pages | Low | The selectors are `.ql-*` only. Acceptable |
| ngx-quill touches `document` under SSR | Low | `prerender: false`, the admin area is client-only, and ngx-quill skips rendering on the server |

## Open Questions
- None blocking.
