import { KnownStatements } from "./statements.ts";
import { KnownOperators } from "./operators.ts";
import { DataTypes } from "./types.ts";

export type Token<T> = {
  symbol: KnownStatements | KnownOperators;
  method?: T;
  machineInstructionId?: string;
  params: number;
};

export type TokenSet<T> = Record<string, Token<T>>;

export type DataToken<T, J> = {
  data: T;
  type: J | DataTypes;
};

export type NumberDataToken = DataToken<number, DataTypes.NUMBER>;
export type StringDataToken = DataToken<string, DataTypes.STRING>;
export type IdentifierDataToken = DataToken<string, DataTypes.IDENTIFIER>;
export type BooleanDataToken = DataToken<boolean, DataTypes.BOOLEAN>;

export type KnownDataTokens =
  | NumberDataToken
  | StringDataToken
  | IdentifierDataToken
  | BooleanDataToken;
