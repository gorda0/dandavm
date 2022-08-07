import { instructions } from "../lang/instructions.ts";
import { swapReverser } from "../utils/list.ts";

// TODO: handle literals and identifiers
export const matchToken = (instruction: string) =>
  instructions[instruction] || instruction;

export const scan = (data: string) =>
  swapReverser(data.split(" ").map(matchToken));


