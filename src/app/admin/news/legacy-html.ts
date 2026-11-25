const BLOCK = new Set(['P', 'UL', 'OL', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'BLOCKQUOTE', 'PRE', 'DIV']);

/**
 * Older news `content` is plain text (or loose HTML) where blank lines separate paragraphs.
 * The public page relies on `whitespace-pre-wrap` to show it, but Quill collapses whitespace.
 * This wraps every top-level run of text/inline nodes into a <p>, starting a new <p> at each
 * blank line. Remaining single newlines become spaces. Proper HTML passes through unchanged.
 */
export function legacyToHtml(value: string | null): string {
  if (!value) return '';
  const source = document.createElement('template');
  source.innerHTML = value;
  const out = document.createElement('div');
  let p: HTMLElement | null = null;
  const para = () => (p ??= out.appendChild(document.createElement('p')));

  for (const node of [...source.content.childNodes]) {
    if (node instanceof Element && BLOCK.has(node.tagName)) {
      p = null;
      out.appendChild(node);
    } else if (node.nodeType === Node.TEXT_NODE) {
      node.textContent!.split(/\n\s*\n/).forEach((part, i) => {
        if (i > 0) p = null;
        if (part.trim() || p) para().append(part);
      });
    } else {
      para().append(node);
    }
  }
  return out.innerHTML.replace(/\s*\n\s*/g, ' ');
}
