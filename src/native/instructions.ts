import { add, divide, mod, multiply, subtract } from "./operators.ts";
import { Symbols } from "./types.ts";
import {
  and,
  diff,
  equal,
  greq,
  grtr,
  lseq,
  lsst,
  not,
  or,
} from "./logical.ts";
import { Context, createContext } from "../context.ts";
import { ScopeBody } from "./scope.ts";
export type Identificator = string;

export type Instruction<T, J> = {
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


export type InstructionFabric<T, J, L> = ({
  instructionCallback,
  args,
}: Instruction<T, J>) => L;

type StraightCallbackFabric<T> = InstructionFabric<T, Array<T>, T>;

export type OperatorInstruction = StraightCallbackFabric<number>;
export type LogicalInstruction = StraightCallbackFabric<boolean>;
export type ScopeInstruction = InstructionFabric<
  unknown,
  unknown,
  void
>;
export type ContextInstruction = InstructionFabric<
  [Context, Token<ScopeInstruction>],
  [Identificator, Token<ScopeInstruction>],
  void
>;

export type GenericToken = Token<
  | OperatorInstruction
  | LogicalInstruction
  | ScopeInstruction
  | ContextInstruction
>;

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

const contextInstructions: TokenSet<ContextInstruction> = {
  context: {
    symbol: Symbols.CONTEXT,
    method: createContext,
    instructionCallbackId: "pushContext",
    params: 2,
  },
};

const scopeInstructions: TokenSet<ScopeInstruction> = {
  in: {
    symbol: Symbols.SCOPE_DEFINITION,
    method: console.log,
    instructionCallbackId: "pushScope",
  },
  end: {
    symbol: Symbols.SCOPE_END,
    method: ({instructionCallback, args}) => instructionCallback?.(args),
    instructionCallbackId: "popScope"
  },
};

export const instructions = {
  ...contextInstructions,
  ...operatorInstructions,
  ...logicalInstructions,
  ...scopeInstructions,
};
