import { add, subtract, multiply, divide, mod } from "./operators";
import { Symbols } from "./types";
import { and, or, not, lsst, grtr, equal, diff, greq, lseq } from "./logical";
import { Context, createContext } from "../context";

export type Identificator = string;

export type CallbackInstruction<T, J> = {
  instructionCallback?: (param: T) => void;
  args: J;
};

export type Token<T> = {
  symbol: Symbols;
  method: T;
  instructionCallbackId?: string;
  params?: number;
};

export interface TokenSet<T> {
  [operator: string]: Token<T>;
}

export type CallbackFabric<T, J, L> = ({
  instructionCallback,
  args,
}: CallbackInstruction<T, J>) => L;

type StraightCallbackFabric<T> = CallbackFabric<T, Array<T>, T>;

export type OperatorInstruction = StraightCallbackFabric<number>;

const operatorInstructions: TokenSet<OperatorInstruction> = {
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

export type LogicalInstruction = StraightCallbackFabric<boolean>;
const logicalInstructions: TokenSet<LogicalInstruction> = {
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
    method: greq,
  },
  lseq: {
    symbol: Symbols.LESS_THAN_OR_EQUAL,
    method: lseq,
  },
};

export type ContextInstruction = CallbackFabric<
  Context,
  Array<Identificator | Symbols>,
  void
>;

const contextInstructions: TokenSet<ContextInstruction> = {
  context: {
    symbol: Symbols.CONTEXT,
    method: createContext,
    instructionCallbackId: "pushContext",
    params: 1,
  },
};

export const instructions: TokenSet<
  LogicalInstruction | OperatorInstruction | ContextInstruction
> = {
  ...contextInstructions,
  ...operatorInstructions,
  ...logicalInstructions,
};
