import { InstructionToken, instructions } from "../lang/instructions.ts";

function swapReverser(array: Array<InstructionToken | string>) {
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
export const tokenize = (instruction: string): InstructionToken | string =>
  instructions[instruction] || instruction;

export const parse = (line: string): Array<InstructionToken | string> =>
  swapReverser(line.split(" ").map(tokenize));


