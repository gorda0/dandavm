export enum ArithmeticSymbol {
  ADD = "add",
  SUBTRACT = "sub",
  MULTIPLY = "multiply",
  DIVIDE = "divide",
  MOD = "mod",
}

export enum LogicalSymbol {
  AND = "and",
  OR = "or",
  NOT = "not",
  EQUAL = "equal",
  NOT_EQUAL = "not_equal",
  GREATER_THAN = "greater_than",
  LESS_THAN = "less_than",
  GREATER_THAN_OR_EQUAL = "greater_than_or_equal",
  LESS_THAN_OR_EQUAL = "less_than_or_equal",
}
export enum FunctionStatement {
  FUNCTION = "function",
  RETURN = "return",
}

export enum DataStatement {
  DATA = "data",
  OBJECT = "object",
  SET = "set",
  DELETE = "delete",
}

export enum ContextStatement {
  CREATE_CONTEXT = "create_context",
}

export enum ConditionStatement {
  IF = "if",
  ELSE = "else",
  ELSE_IF = "else_if",
}

export enum LoopStatement {
  WHILE = "while",
  FOR_EACH = "for_each",
  BREAK = "break",
  CONTINUE = "continue",
}

export enum ScopeStatement {
  SCOPE_IN = "scope_in",
  SCOPE_EXECUTION = "scope_execution",
  SCOPE_END = "scope_end",
}

export type StatementSymbol =
  | FunctionStatement
  | ContextStatement
  | ScopeStatement
  | ConditionStatement
  | LoopStatement;

export type OperatorSymbol = ArithmeticSymbol | LogicalSymbol;
export type Symbol = OperatorSymbol | StatementSymbol;