/**
 * Signal forms do not accept null, and the tags (text[]) columns are edited as one comma-separated input.
 * toModel: row -> form model (null -> '', string[] -> 'a, b'), keeping only the keys of `template`.
 * toPatch: form model -> update payload ('' -> null for `nullable` keys, 'a, b' -> ['a', 'b'] for `arrays` keys).
 */
export function toModel<M extends object>(row: object, template: M): M {
  const source = row as Record<string, unknown>;
  const model = { ...template } as Record<string, unknown>;
  for (const key of Object.keys(model)) {
    const value = source[key];
    model[key] = Array.isArray(value) ? value.join(', ') : (value ?? model[key]);
  }
  return model as M;
}

export function toPatch(model: object, nullable: string[], arrays: string[] = []): Record<string, unknown> {
  const patch: Record<string, unknown> = { ...model };
  for (const key of arrays) {
    patch[key] = String(patch[key])
      .split(',')
      .map(s => s.trim())
      .filter(s => s !== '');
  }
  for (const key of nullable) {
    if (patch[key] === '') patch[key] = null;
  }
  return patch;
}
