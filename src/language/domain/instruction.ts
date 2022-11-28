import { Context } from "./context.ts";
import {
  BooleanToken,
  IdentifierToken,
  NumberToken,
} from "./token.ts";

export type Instruction<T , J> = (
  instruction: {
    args: T;
    machineInstruction: (parameter: J) => void;
  },
) => void;

export type ArithmeticInstruction = Instruction<
  [NumberToken, NumberToken],
  number
>;

export type LogicalInstruction = Instruction<
  [BooleanToken, BooleanToken],
  boolean
>;

export type ScopeInstruction = Instruction<
  null,
  null
>;

export type ContextInstruction = Instruction<
  [IdentifierToken],
  Context
>;
