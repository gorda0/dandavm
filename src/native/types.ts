export enum Symbols {
  EXPR = "expr",
  REGISTER = "register",
  INSTRUCTION = "instruction",
  FUNCTION = "function",
  SCOPE_DEFINITION = "scope_definition",
  SCOPE_EXECUTION = "scope_execution",
  SCOPE_END = "scope_end",
  CONTEXT = "context",
  ADD = "add",
  SUB = "sub",
  BODY = "body",
  WATCHER = "watcher",
  DATA = "data",
  SEED = "seed",
  IF_STATEMENT = "if_statement",
  ELSE_STATEMENT = "else_statement",
  MSG = "msg",
  WHILE_STATEMENT = "while_statement",
  FOR_STATEMENT = "for_statement",
  IN_STATEMENT = "in_statement",
  DO_STATEMENT = " do_statement",
  BREAK_STATEMENT = "break_statement",
  CONTINUE_STATEMENT = "continue_statement",
  RETURN_STATEMENT = "return_statement",
  MUL = "mul",
  DIV = "div",
  MOD = "mod",
  EQUAL = "equal",
  NOT_EQUAL = "not_equal",
  GREATER_THAN = "greater_than",
  LESS_THAN = "less_than",
  GREATER_THAN_OR_EQUAL = "greater_than_or_equal",
  LESS_THAN_OR_EQUAL = "less_than_or_equal",
  AND = "and",
  OR = "or",
  NOT = "not",
  MODIFICATION = "modification",
}
//TODO: clean

export type Literal = string | number | boolean | null | undefined;

interface Store {
  [name: string]: Literal | Store;
}

interface Register {
  [name: string]: Literal;
}

interface Method {
  [name: string]: {
    args: Literal[];
    action: (...args: any) => any;
  };
}

interface Watcher {
  [name: string]: Scope;
}

interface Scope {
  name: string;
  variables: Store;
  methods: Method;
  watchers: Watcher;
  registers: Register;
}