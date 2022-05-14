import { instructions } from "../native/instructions";

// TODO: handle literals and identificators
export const matchSymbols = (literal: string): any =>
instructions[literal] !== undefined ? instructions[literal] : literal;

export const parse = (line: string) => line.split(" ").map(matchSymbols);
