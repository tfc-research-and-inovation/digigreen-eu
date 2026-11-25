# Spec: WYSIWYG editor for News `content`

## Objective
The content manager edits the `content` of a news item in the admin area
(`/admin/news/:id`). Today that field is a plain `<textarea>` where the manager has to type raw HTML.
We replace it with a free WYSIWYG editor (Quill) so the manager can format text without writing HTML.

### User stories
- As the admin, I open a news item → the `content` field shows the existing article already
  formatted (paragraphs, bold, links, lists), not as raw HTML.
- I format text from a toolbar: H2/H3, bold, italic, bulleted/numbered list, link, blockquote,
  clear formatting.
- **Save** stores the content as HTML in `news.content`. The public page `/news/:id` shows it
  exactly as before. No change is needed on the public site.
- If I empty the editor and press Save, `content` is stored as `null` (same as today).

### Out of scope
- Resources and Projects fields (only News `content`).
- Uploading images inside the text. The article image stays in `image_url`.
- Alignment, colors, fonts, font sizes. Quill writes these as its own CSS classes
  (`ql-align-center`, …), and the public site does not load those classes.
- Sanitizing on save. The public page already uses `[innerHTML]`, which Angular sanitizes.

## Tech Stack
Angular 21.2, `@angular/forms/signals`, Tailwind 4.
**New dependencies (free):**
| Package | Version | License | Why |
|---|---|---|---|
| `quill` | `^2.0.3` | BSD-3-Clause | the editor |
| `ngx-quill` | `^30.1.3` | MIT | Angular wrapper (`<quill-editor>`), peer `@angular/core ^21` |

`ngx-quill@31` requires Angular 22, so **do not** install `latest`.

## Commands
```bash
npm install quill@^2.0.3 ngx-quill@^30.1.3
npm start        # → http://localhost:4200/admin/news, then Edit
npm run build
npm test -- --watch=false
```

## Project Structure
| File | Change |
|---|---|
| `package.json` / `package-lock.json` | the two dependencies |
| `angular.json` | `anyComponentStyle` budget 4/8 kB → 10/30 kB (Quill CSS is 24 kB) |
| `src/app/admin/news/admin-news-edit.ts` | `<textarea [formField]="f.content">` → `<quill-editor>` with a limited toolbar; loads the Quill "snow" CSS |
| `src/app/admin/news/legacy-html.ts` (+ spec) | converts legacy plain-text content (blank-line paragraphs) into `<p>` blocks before Quill loads it |
| `docs/SPEC-news-wysiwyg.md` | this spec |

No database, migration, service or public-page change. The `content` column is already
`text` and already contains HTML (`p`, `a`, `strong`, `em`, `ul/li`, `br` in the seed). Quill
supports all of these.

## Code Style
Same as the other admin forms: inline template, Tailwind classes, Font Awesome icons, signals.
Target shape (to be confirmed in Task 1):
```ts
imports: [FormField, RouterLink, QuillEditorComponent],
// ...
<div class="block">
  <span class="text-sm text-gray-600">content</span>
  <quill-editor [formField]="f.content" [modules]="modules" format="html" class="mt-1 block" />
</div>
// ...
protected readonly modules = {
  toolbar: [
    [{ header: 2 }, { header: 3 }],
    ['bold', 'italic'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'blockquote'],
    ['clean'],
  ],
};
```
The Quill CSS is loaded **only by the admin edit component**, not globally in `angular.json`,
so the public bundle does not grow.

## Risks
1. **Signal forms + ngx-quill.** `<quill-editor>` is a classic `ControlValueAccessor`. Task 1
   checks whether `[formField]` binds to it in Angular 21. If it does not, the fallback is
   `[ngModel]="model().content" (ngModelChange)="…update model…"`. That is one line, with no
   extra abstraction.
2. **Empty editor.** ngx-quill emits `null` for empty content. `toPatch` already turns
   `content` into `null` when it is empty (`NULLABLE`), so the result is the same either way.
3. **HTML normalisation.** Quill rewrites HTML into its own model. Tags it does not know are
   dropped on save. The current content uses only supported tags. Check this on a real seed row
   (see the Success Criteria).
4. **SSR.** The build has `prerender: false` and the admin area is client-only, and ngx-quill
   does not render on the server. No extra handling is needed.

## Testing Strategy
- `npm run build` must be clean. `npm test -- --watch=false`: the existing 5 tests keep passing.
  No unit test is added for a third-party editor. Its value is checked in the browser.
- Manual browser check against the local stack (`admin@local.test`), listed below.

## Boundaries
- **Always:** keep the limited toolbar; build and test before calling it done; commit only when asked.
- **Ask first:** extending the editor to Resources or Projects, image upload, any extra toolbar
  format, any public-site CSS change.
- **Never:** add a paid editor or one that needs an API key or license key (TinyMCE cloud,
  CKEditor 5); store Quill Delta JSON instead of HTML; remove Angular sanitization on the
  public page.

## Tasks
See `tasks/plan-news-wysiwyg.md` and `tasks/todo-news-wysiwyg.md`.

## Success Criteria
1. `/admin/news/:id` shows a Quill editor for `content`, pre-filled with the existing formatted HTML.
2. The toolbar contains only: H2, H3, bold, italic, ordered list, bullet list, link, blockquote, clean.
3. Save stores HTML in `news.content`. An empty editor stores `null`.
4. An untouched seed article, opened and saved, keeps all its links and its bold/list formatting.
5. The public news page shows the content with no change to public code.
6. Build is clean, the 5 existing tests pass, and only `quill` + `ngx-quill@30` are added as dependencies.

## Open Questions
- None blocking. Extending the editor to Resources and Projects can be decided after this lands.
