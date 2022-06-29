import { GenericToken, instructions } from "./native/instructions.ts";

function swapReverser(array: Array<GenericToken | string>) {
  const length = array.length;
  let left = null;
  let right = null;

  for (left = 0, right = length - 1; left < right; left += 1, right -= 1) {
    const temporary = array[left];

    array[left] = array[right];
    array[right] = temporary;
  }

  return array;
}

// TODO: handle literals and identifiers
export const matchSymbols = (literal: string): GenericToken | string =>
  instructions[literal] || literal;

export const parse = (line: string): Array<GenericToken | string> =>
  swapReverser(line.split(" ").map(matchSymbols));

export const printFile = (path: string, tokens: Array<GenericToken | string>) =>
  Deno.writeTextFileSync(path, JSON.stringify({ tokens }));
