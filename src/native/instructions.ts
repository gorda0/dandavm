import {
  add,
  subtract,
  multiply,
  divide,
  Operator,
  mod,
} from "./operators";
import { Symbols } from "./types";
import {
  Logical,
  and,
  or,
  not,
  lsst,
  grtr,
  equal,
  diff,
} from "./logical";
import { createContext } from "../context";

export type Instruction<T, J> = {
  symbol: Symbols;
  method?: T;
  instructionCallback?: string;
  params?: J;
};

export interface InstructionSet<T, J> {
  [operator: string]: Instruction<T, J>;
}

const operatorInstructions: InstructionSet<Operator, number> = {
  add: {
    symbol: Symbols.ADD,
    method: add,
    params: 2,
  },
  sub: {
    symbol: Symbols.SUB,
    method: subtract,
  },
  mul: {
    symbol: Symbols.MUL,
    method: multiply,
  },
  div: {
    symbol: Symbols.DIV,
    method: divide,
  },
  mod: {
    symbol: Symbols.MOD,
    method: mod,
  },
};

const logicalInstructions: InstructionSet<Logical, boolean> = {
  and: {
    symbol: Symbols.AND,
    method: and,
  },
  or: {
    symbol: Symbols.OR,
    method: or,
  },
  not: {
    symbol: Symbols.NOT,
    method: not,
  },
  lsst: {
    symbol: Symbols.LESS_THAN,
    method: lsst,
  },
  grtr: {
    symbol: Symbols.GREATER_THAN,
    method: grtr,
  },
  diff: {
    symbol: Symbols.NOT_EQUAL,
    method: diff,
  },
  equal: {
    symbol: Symbols.EQUAL,
    method: equal,
  },
  greq: {
    symbol: Symbols.GREATER_THAN_OR_EQUAL,
    method: grtr,
  },
  lseq: {
    symbol: Symbols.LESS_THAN_OR_EQUAL,
    method: lsst,
  },
};

const generalInstructions: InstructionSet<any, any> = {
  context: {
    symbol: Symbols.CONTEXT,
    method: ({ instructionCallback, args }: any) =>
      createContext({ instructionCallback, args }),
    instructionCallback: "pushContext",
    params: 1,
  },
  data: {
    symbol: Symbols.DATA,
    params: 2,
  },
  in: {
    symbol: Symbols.SCOPE_DEFINITION,
  },
  end: {
    symbol: Symbols.SCOPE_END,
  },
};

export const instructions: any = {
  ...generalInstructions,
  ...operatorInstructions,
  ...logicalInstructions,
};
