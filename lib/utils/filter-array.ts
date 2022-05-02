// https://stackoverflow.com/a/59726888
export function filterTruthyArray<T>(array: (T | null | undefined)[]): T[] {
  return array.flatMap((f) => (f ? [f] : []));
}
