import { GenericToken, instructions } from "./native/instructions.ts";

// TODO: handle literals and identificators
export const matchSymbols = (literal: string): GenericToken | string =>
  instructions[literal] || literal;

export const parse = (line: string): Array<GenericToken | string> =>
  line.split(" ").map(matchSymbols);
