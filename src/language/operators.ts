export enum ArithmeticOperator {
  ADD = "add",
  SUBTRACT = "sub",
  MULTIPLY = "multiply",
  DIVIDE = "divide",
  MOD = "mod",
}

export enum LogicalOperator {
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

export type KnownOperators = ArithmeticOperator | LogicalOperator;
