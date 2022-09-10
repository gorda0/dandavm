import { Statement } from "./statements.ts";
import { ArithmeticOperator, LogicalOperator } from "./operators.ts";
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
} from "./functions/logical.ts";
import {
  add,
  divide,
  mod,
  multiply,
  subtract,
} from "./functions/arithmetic.ts";
import { Context, createContext } from "./context.ts";
import {
  BooleanDataToken,
  IdentifierDataToken,
  KnownDataTokens,
  NumberDataToken,
  Token,
  TokenSet,
} from "./token.ts";

export type Instruction<T, J> = {
  args: T | KnownDataTokens[];
  machineInstruction: (param: J) => void;
};

export type InstructionFabric<T, J, L> = (instruction: Instruction<T, J>) => L;

export type ArithmeticInstruction = InstructionFabric<
  [NumberDataToken, NumberDataToken],
  number,
  number
>;
export type LogicalInstruction = InstructionFabric<
  [BooleanDataToken, BooleanDataToken],
  boolean,
  boolean
>;

export type ScopeInstruction = InstructionFabric<
  unknown,
  unknown,
  void
>;
export type ContextInstruction = InstructionFabric<
  [IdentifierDataToken],
  Context,
  void
>;

export type InstructionToken = Token<
  | ArithmeticInstruction
  | LogicalInstruction
  | ScopeInstruction
  | ContextInstruction
>;

const arithmeticInstructions: TokenSet<ArithmeticInstruction> = {
  add: {
    symbol: ArithmeticOperator.ADD,
    method: add,
    params: 2,
  },
  sub: {
    symbol: ArithmeticOperator.SUBTRACT,
    method: subtract,
    params: 2,
  },
  mul: {
    symbol: ArithmeticOperator.MULTIPLY,
    method: multiply,
    params: 2,
  },
  div: {
    symbol: ArithmeticOperator.DIVIDE,
    method: divide,
    params: 2,
  },
  mod: {
    symbol: ArithmeticOperator.MOD,
    method: mod,
    params: 2,
  },
};

const logicalInstructions: TokenSet<LogicalInstruction> = {
  and: {
    symbol: LogicalOperator.AND,
    method: and,
    params: 2,
  },
  or: {
    symbol: LogicalOperator.OR,
    method: or,
    params: 2,
  },
  not: {
    symbol: LogicalOperator.NOT,
    method: not,
    params: 2,
  },
  lsst: {
    symbol: LogicalOperator.LESS_THAN,
    method: lsst,
    params: 2,
  },
  grtr: {
    symbol: LogicalOperator.GREATER_THAN,
    method: grtr,
    params: 2,
  },
  diff: {
    symbol: LogicalOperator.NOT_EQUAL,
    method: diff,
    params: 2,
  },
  equal: {
    symbol: LogicalOperator.EQUAL,
    method: equal,
    params: 2,
  },
  greq: {
    symbol: LogicalOperator.GREATER_THAN_OR_EQUAL,
    method: greq,
    params: 2,
  },
  lseq: {
    symbol: LogicalOperator.LESS_THAN_OR_EQUAL,
    method: lseq,
    params: 2,
  },
};

const contextInstructions: TokenSet<ContextInstruction> = {
  context: {
    symbol: Statement.CONTEXT,
    method: createContext,
    machineInstructionId: "pushContext",
    params: 1,
  },
};

const scopeInstructions: TokenSet<ScopeInstruction> = {
  in: {
    symbol: Statement.SCOPE_IN,
    machineInstructionId: "pushScope",
    params: 0,
  },
  end: {
    symbol: Statement.SCOPE_END,
    machineInstructionId: "popScope",
    params: 0,
  },
};

export const instructions = {
  ...contextInstructions,
  ...arithmeticInstructions,
  ...logicalInstructions,
  ...scopeInstructions,
};
