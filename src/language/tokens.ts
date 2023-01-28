import Opcode from "./domain/opcode.ts";
import { ArithmeticSymbol, LogicalSymbol, ContextStatement, ScopeStatement } from "./domain/symbol.ts";
import { InstructionMap } from "./domain/token.ts";

const arithmeticInstructions: InstructionMap = {
  add: {
    symbol: ArithmeticSymbol.ADD,
    opcode: Opcode.ADD,
    params: 2,
  },
  sub: {
    symbol: ArithmeticSymbol.SUBTRACT,
    opcode: Opcode.SUBTRACT,
    params: 2,
  },
  mul: {
    symbol: ArithmeticSymbol.MULTIPLY,
    opcode: Opcode.MULTIPLY,
    params: 2,
  },
  div: {
    symbol: ArithmeticSymbol.DIVIDE,
    opcode: Opcode.DIVIDE,
    params: 2,
  },
  mod: {
    symbol: ArithmeticSymbol.MOD,
    opcode: Opcode.MOD,
    params: 2,
  },
};

const logicalInstructions: InstructionMap = {
  and: {
    symbol: LogicalSymbol.AND,
    opcode: Opcode.AND,
    params: 2,
  },
  or: {
    symbol: LogicalSymbol.OR,
    opcode: Opcode.OR,
    params: 2,
  },
  not: {
    symbol: LogicalSymbol.NOT,
    opcode: Opcode.NOT,
    params: 2,
  },
  lsst: {
    symbol: LogicalSymbol.LESS_THAN,
    opcode: Opcode.LESS_THAN,
    params: 2,
  },
  grtr: {
    symbol: LogicalSymbol.GREATER_THAN,
    opcode: Opcode.GREATER_THAN,
    params: 2,
  },
  diff: {
    symbol: LogicalSymbol.NOT_EQUAL,
    opcode: Opcode.NOT_EQUAL,
    params: 2,
  },
  equal: {
    symbol: LogicalSymbol.EQUAL,
    opcode: Opcode.EQUAL,
    params: 2,
  },
  greq: {
    symbol: LogicalSymbol.GREATER_THAN_OR_EQUAL,
    opcode: Opcode.GREATER_THAN_OR_EQUAL,
    params: 2,
  },
  lseq: {
    symbol: LogicalSymbol.LESS_THAN_OR_EQUAL,
    opcode: Opcode.LESS_THAN_OR_EQUAL,
    params: 2,
  },
};

const contextInstructions: InstructionMap = {
  context: {
    symbol: ContextStatement.CREATE_CONTEXT,
    opcode: Opcode.CREATE_CONTEXT,
    machineInstructionId: "pushContext",
    params: 1,
  },
};

const scopeInstructions: InstructionMap = {
  in: {
    symbol: ScopeStatement.SCOPE_IN,
    opcode: Opcode.SCOPE_IN,
    machineInstructionId: "pushScope",
    params: 0,
  },
  end: {
    symbol: ScopeStatement.SCOPE_END,
    opcode: Opcode.SCOPE_END,
    machineInstructionId: "popScope",
    params: 0,
  },
};

export default {
  ...contextInstructions,
  ...arithmeticInstructions,
  ...logicalInstructions,
  ...scopeInstructions,
};
