import { legacyToHtml } from './legacy-html';

describe('legacyToHtml', () => {
  it('turns blank-line separated plain text into paragraphs, single newlines into spaces', () => {
    expect(legacyToHtml('First line\nsame paragraph.\n\nSecond paragraph.')).toBe(
      '<p>First line same paragraph.</p><p>Second paragraph.</p>',
    );
  });

  it('wraps loose inline elements and keeps the spaces between them', () => {
    expect(legacyToHtml('See <a href="x">A</a> and <a href="y">B</a>.\n\n<strong>Title</strong>')).toBe(
      '<p>See <a href="x">A</a> and <a href="y">B</a>.</p><p><strong>Title</strong></p>',
    );
  });

  it('puts a loose <strong> between blocks in its own paragraph', () => {
    expect(legacyToHtml('<p>One.</p>\n<strong>Title</strong>\n\n<p>Two.</p>')).toBe(
      '<p>One.</p><p><strong>Title</strong></p><p>Two.</p>',
    );
  });

  it('leaves proper HTML unchanged and handles empty values', () => {
    expect(legacyToHtml('<p>A</p><ul><li>B</li></ul>')).toBe('<p>A</p><ul><li>B</li></ul>');
    expect(legacyToHtml(null)).toBe('');
  });
});
