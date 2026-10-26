/** Format a number for metric displays: thousands separators or fixed decimals. */
export function formatNum(value: number, decimals = 0): string {
  if (decimals > 0) return value.toFixed(decimals);
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/** Substring-first fuzzy match for the command palette. Empty query matches all. */
export function fuzzyMatch(query: string, label: string): boolean {
  const q = query.toLowerCase().trim();
  const l = label.toLowerCase();
  if (!q) return true;
  if (l.includes(q)) return true;
  let qi = 0;
  for (let i = 0; i < l.length && qi < q.length; i++) {
    if (l[i] === q[qi]) qi++;
  }
  return qi === q.length;
}
