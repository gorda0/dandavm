export const writeFile = <T>(path: string, tokens: Array<T>) =>
  Deno.writeTextFileSync(path, JSON.stringify({ tokens }));