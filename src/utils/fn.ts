export function defer(fn: () => void) {
  return setTimeout(fn, 0);
}