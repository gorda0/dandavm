import { KnownStatements } from "./statements.ts";
import { KnownOperators } from "./operators.ts";

export type Token<T> = {
    symbol: KnownStatements | KnownOperators;
    method?: T;
    instructionCallbackId?: string;
    params: number;
};

export type TokenSet<T> = Record<string, Token<T>>;