export enum Statement {
  CONTEXT = "context",
  SCOPE_IN = "scope_in",
  SCOPE_EXECUTION = "scope_execution",
  SCOPE_END = "scope_end",
  DATA = "data",
  OBJECT = "object",
  FUNCTION = "function",
  RETURN = "return",
}

export enum ConditionStatement {
  IF = "if",
  ELSE = "else",
  ELIF = "elif",
}

export enum LoopStatement {
  WHILE = "while",
  FOR_EACH = "for_each",
  BREAK = "break",
  CONTINUE = "continue",
}

export type KnownStatements = Statement | ConditionStatement | LoopStatement;
